import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  openBrowser,
  renderMedia,
  renderStill,
} from "@remotion/renderer";
import sharp from "sharp";
import { ivansEscape } from "../src/projects/ivans-escape/film";
import { openingCuts } from "../src/projects/ivans-escape/opening-shots";
import { validateAssets } from "./validate-assets";

async function main() {
  await validateAssets(ivansEscape);
  const out = "out/ivans-escape/illustrated";
  await mkdir(`${out}/frames`, { recursive: true });
  const serveUrl = await bundle({ entryPoint: resolve("src/index.ts") });
  const chromiumOptions = { gl: "angle" as const };
  const browser = await openBrowser("chrome", { chromiumOptions });
  const errors: string[] = [];
  try {
    const comps = await getCompositions(serveUrl, {
      puppeteerInstance: browser,
      chromiumOptions,
      port: 3100,
    });
    const composition = comps.find((c) => c.id === "IvansEscape")!;
    assert.equal(composition.durationInFrames, 1800);
    const common = {
      serveUrl,
      composition,
      puppeteerInstance: browser,
      chromiumOptions,
      port: 3100,
      timeoutInMilliseconds: 120000,
      onBrowserLog: (log: { type: string; text: string }) => {
        if (log.type === "error") errors.push(log.text);
      },
    };
    if (process.argv.includes("--draft") || process.argv.includes("--final")) {
      const final = process.argv.includes("--final");
      await renderMedia({
        ...common,
        codec: "h264",
        outputLocation: `${out}/IvansEscape-illustrated-${final ? "1080p" : "review"}.mp4`,
        scale: final ? 1 : 0.5,
        crf: final ? 18 : 24,
        concurrency: 2,
        onProgress: ({ progress }) => {
          if (Math.round(progress * 100) % 10 === 0) process.stdout.write(".");
        },
      });
    } else {
      const selected = process.argv.find((a) => a.startsWith("--frames="));
      const mids = openingCuts
        .slice(0, -1)
        .map((from, i) => Math.floor((from + openingCuts[i + 1] - 1) / 2));
      const boundaries = [
        0, 73, 180, 308, 309, 310, 359, 360, 367, 368, 480, 509, 510, 539, 540,
        1110, 1159, 1530, 1619, 1620, 1722, 1779, 1799,
      ];
      const frames = selected
        ? selected.slice(9).split(",").map(Number)
        : [...new Set([...mids, ...boundaries])];
      frames.forEach((f) =>
        assert.ok(Number.isSafeInteger(f) && f >= 0 && f < 1800),
      );
      for (const frame of [...frames].reverse()) {
        await renderStill({
          ...common,
          frame,
          output: `${out}/frames/${frame}.png`,
          imageFormat: "png",
          scale: 1 / 3,
        });
        const stats = await sharp(`${out}/frames/${frame}.png`).stats();
        assert.ok(
          stats.channels.slice(0, 3).some((c) => c.mean > 3),
          `Empty frame ${frame}`,
        );
        console.log(`Inspected ${frame}`);
      }
      const repeat = frames.includes(1134) ? 1134 : frames[0];
      await renderStill({
        ...common,
        frame: repeat,
        output: `${out}/repeat.png`,
        imageFormat: "png",
        scale: 1 / 3,
      });
      assert.deepEqual(
        await readFile(`${out}/frames/${repeat}.png`),
        await readFile(`${out}/repeat.png`),
        `Non-deterministic frame ${repeat}`,
      );
      if (!selected || process.argv.includes("--refresh-sheets"))
        for (const [name, start, end] of [
          ["intro", 0, 5],
          ["verse", 5, 13],
          ["chorus", 13, 29],
          ["bridge", 29, 37],
          ["outro", 37, 40],
        ] as const) {
          const selectedFrames = mids.slice(start, end),
            tiles = [];
          for (const [i, f] of selectedFrames.entries()) {
            const input = await sharp(`${out}/frames/${f}.png`)
              .extend({ bottom: 40, background: "#172330" })
              .composite([
                {
                  input: Buffer.from(
                    `<svg width="640" height="400"><text x="16" y="386" font-size="21" fill="#E6E9E6" font-family="Arial">C${String(start + i + 1).padStart(2, "0")} | ${f}f / ${(f / 30).toFixed(2)}s</text></svg>`,
                  ),
                },
              ])
              .png()
              .toBuffer();
            tiles.push({
              input,
              left: (i % 3) * 640,
              top: Math.floor(i / 3) * 400,
            });
          }
          await sharp({
            create: {
              width: 1920,
              height: Math.ceil(tiles.length / 3) * 400,
              channels: 3,
              background: "#0B1018",
            },
          })
            .composite(tiles)
            .png()
            .toFile(`${out}/${name}-contact-sheet.png`);
        }
      await writeFile(
        `docs/projects/ivans-escape/redirection/production/RENDER_${selected ? "PATCH_" : ""}CHECKS.json`,
        JSON.stringify(
          {
            composition: "IvansEscape",
            frames,
            scale: 1 / 3,
            graphics: "ANGLE",
            backwardSampling: true,
            deterministicFrame: repeat,
            browserErrors: errors,
            fullVideoExported: false,
          },
          null,
          2,
        ),
      );
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close({ silent: true });
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
