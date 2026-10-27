import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  openBrowser,
  renderMedia,
  renderStill,
} from "@remotion/renderer";
import sharp from "sharp";
import {
  vocalPages,
  captionPhrases,
} from "../src/projects/ivans-escape/vocal-pages";

async function main() {
  for (const phrase of captionPhrases)
    assert.deepEqual(
      vocalPages
        .filter((p) => p.phraseId === phrase.id)
        .flatMap((p) => p.words),
      phrase.words,
      "Caption pagination dropped words",
    );
  for (let i = 0; i < vocalPages.length; i++) {
    assert.ok(vocalPages[i].toMs > vocalPages[i].fromMs);
    if (i) assert.ok(vocalPages[i].fromMs >= vocalPages[i - 1].toMs);
  }
  const out = "out/ivans-escape/pass02",
    errors: string[] = [];
  await mkdir(out, { recursive: true });
  const serveUrl = await bundle({ entryPoint: resolve("src/index.ts") }),
    chromiumOptions = { gl: "angle" as const };
  let browser = await openBrowser("chrome", { chromiumOptions });
  const report: {
    id: string;
    globalStart: number;
    exclusiveEnd: number;
    frames: number[];
    deterministicFrame: number;
    clipRendered: boolean;
  }[] = [];
  try {
    const comps = await getCompositions(serveUrl, {
      puppeteerInstance: browser,
      chromiumOptions,
      port: 3101,
    });
    for (let i = 0; i < 6; i++) {
      const requested = process.argv.find((a) => a.startsWith("--sections="));
      if (
        requested &&
        !requested
          .slice(11)
          .split(",")
          .map(Number)
          .includes(i + 1)
      )
        continue;
      await browser.close({ silent: true });
      browser = await openBrowser("chrome", { chromiumOptions });
      const composition = comps.find((c) => c.id === `IvansEscape-S0${i + 1}`)!;
      assert.ok(composition);
      assert.equal(composition.durationInFrames, 300);
      const folder = `${out}/S0${i + 1}`;
      await mkdir(folder, { recursive: true });
      const common = {
        serveUrl,
        composition,
        puppeteerInstance: browser,
        chromiumOptions,
        port: 3101,
        timeoutInMilliseconds: 120000,
        onBrowserLog: (l: { type: string; text: string }) => {
          if (l.type === "error") errors.push(l.text);
        },
      };
      const frames = [
        0, 20, 45, 70, 95, 120, 145, 170, 195, 220, 245, 270, 299,
      ];
      for (const frame of [...frames].reverse())
        await renderStill({
          ...common,
          frame,
          scale: 1 / 3,
          imageFormat: "png",
          output: `${folder}/${frame}.png`,
        });
      await renderStill({
        ...common,
        frame: 145,
        scale: 1 / 3,
        imageFormat: "png",
        output: `${folder}/repeat.png`,
      });
      assert.deepEqual(
        await readFile(`${folder}/145.png`),
        await readFile(`${folder}/repeat.png`),
      );
      for (const f of i === 4 ? [70, 95, 120, 145] : [20, 145]) {
        const master = comps.find((c) => c.id === "IvansEscape")!;
        await renderStill({
          ...common,
          composition: master,
          frame: i * 300 + f,
          scale: 1 / 3,
          imageFormat: "png",
          output: `${folder}/master-${f}.png`,
        });
        const section = frames.includes(f)
          ? `${folder}/${f}.png`
          : `${folder}/compare-${f}.png`;
        if (!frames.includes(f))
          await renderStill({
            ...common,
            frame: f,
            scale: 1 / 3,
            imageFormat: "png",
            output: section,
          });
        assert.deepEqual(
          await readFile(section),
          await readFile(`${folder}/master-${f}.png`),
          `Section differs from master at ${i * 300 + f}`,
        );
      }
      const tiles = [];
      for (const [j, f] of frames.entries()) {
        const input = await sharp(`${folder}/${f}.png`)
          .extend({ bottom: 30, background: "#13212F" })
          .composite([
            {
              input: Buffer.from(
                `<svg width="640" height="390"><text x="15" y="381" font-size="19" fill="white">S0${i + 1} / global ${i * 300 + f}f</text></svg>`,
              ),
            },
          ])
          .png()
          .toBuffer();
        tiles.push({
          input,
          left: (j % 3) * 640,
          top: Math.floor(j / 3) * 390,
        });
      }
      await sharp({
        create: {
          width: 1920,
          height: Math.ceil(frames.length / 3) * 390,
          channels: 3,
          background: "#0B1018",
        },
      })
        .composite(tiles)
        .png()
        .toFile(`${out}/S0${i + 1}.png`);
      if (process.argv.includes("--clips")) {
        await browser.close({ silent: true });
        browser = await openBrowser("chrome", { chromiumOptions });
        let milestone = -1;
        if (
          !(
            process.argv.includes("--reuse-clips") &&
            (await readFile(`${out}/S0${i + 1}.mp4`).then(
              () => true,
              () => false,
            ))
          )
        )
          await renderMedia({
            ...common,
            puppeteerInstance: browser,
            onProgress: ({ progress }) => {
              const n = Math.floor(progress * 4);
              if (n !== milestone) {
                milestone = n;
                console.log(`S0${i + 1} ${n * 25}%`);
              }
            },
            codec: "h264",
            scale: 1 / 3,
            crf: 24,
            concurrency: 1,
            outputLocation: `${out}/S0${i + 1}.mp4`,
          });
        await mkdir(`${folder}/motion`, { recursive: true });
        execFileSync(
          resolve(
            "node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe",
          ),
          [
            "-v",
            "error",
            "-y",
            "-i",
            resolve(`${out}/S0${i + 1}.mp4`),
            "-an",
            "-vf",
            "scale=320:180",
            resolve(`${folder}/motion/%03d.png`),
          ],
          { stdio: "ignore" },
        );
        for (let sheet = 0; sheet < 3; sheet++) {
          const tiles = [];
          let labels = "";
          for (let n = 0; n < 100; n++) {
            const f = sheet * 100 + n,
              path = `${folder}/motion/${String(f + 1).padStart(3, "0")}.png`;
            const raw = await sharp(path).stats();
            assert.ok(
              raw.channels.slice(0, 3).some((c) => c.mean > 3),
              `Unintended empty frame ${i * 300 + f}`,
            );
            tiles.push({
              input: await sharp(path).resize(160, 90).png().toBuffer(),
              left: (n % 10) * 160,
              top: Math.floor(n / 10) * 90,
            });
            labels += `<text x="${(n % 10) * 160 + 3}" y="${Math.floor(n / 10) * 90 + 12}" fill="white" stroke="#07101A" stroke-width=".5" paint-order="stroke" font-size="11">${i * 300 + f}f</text>`;
          }
          await sharp({
            create: {
              width: 1600,
              height: 900,
              channels: 3,
              background: "#0B1018",
            },
          })
            .composite([
              ...tiles,
              {
                input: Buffer.from(
                  `<svg width="1600" height="900">${labels}</svg>`,
                ),
              },
            ])
            .png()
            .toFile(`${out}/S0${i + 1}-motion-${sheet + 1}.png`);
        }
      }
      report.push({
        id: composition.id,
        globalStart: i * 300,
        exclusiveEnd: (i + 1) * 300,
        frames,
        deterministicFrame: i * 300 + 145,
        clipRendered: process.argv.includes("--clips"),
      });
      console.log(`Reviewed render evidence S0${i + 1}`);
    }
    assert.deepEqual(errors, []);
    const reportPath =
      "docs/projects/ivans-escape/redirection/pass02/RENDER_CHECKS.json";
    const previous = await readFile(reportPath, "utf8").then(
      (t) => JSON.parse(t).sections as typeof report,
      () => [],
    );
    const sections = [
      ...previous.filter((p) => !report.some((r) => r.id === p.id)),
      ...report,
    ].sort((a, b) => a.globalStart - b.globalStart);
    await writeFile(
      reportPath,
      JSON.stringify(
        {
          graphics: "ANGLE",
          sections,
          browserErrors: errors,
          captionPages: vocalPages.length,
          fullResolutionExport: false,
          renderCondition:
            "Fresh Chromium before each still group and clip, one video worker; a reused multi-worker session previously crashed the GPU process.",
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close({ silent: true });
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
