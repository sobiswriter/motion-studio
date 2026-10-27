import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  openBrowser,
  renderStill,
  renderMedia,
} from "@remotion/renderer";
import sharp from "sharp";
import { ivansEscape } from "../src/projects/ivans-escape/film";
import { validateAssets } from "./validate-assets";

async function sheet(frames: number[], name: string, columns: number) {
  const tiles = [];
  for (const [i, frame] of frames.entries()) {
    const text = `${frame}f / ${(frame / 30).toFixed(2)}s`;
    const input = await sharp(`out/ivans-escape/frames/${frame}.png`)
      .resize(640, 360)
      .extend({ bottom: 36, background: "#172330" })
      .composite([
        {
          input: Buffer.from(
            `<svg width="640" height="396"><text x="18" y="384" fill="#E6E9E6" font-size="20" font-family="Arial">${text}</text></svg>`,
          ),
        },
      ])
      .png()
      .toBuffer();
    tiles.push({
      input,
      left: (i % columns) * 640,
      top: Math.floor(i / columns) * 396,
    });
  }
  await sharp({
    create: {
      width: columns * 640,
      height: Math.ceil(frames.length / columns) * 396,
      channels: 3,
      background: "#0B1018",
    },
  })
    .composite(tiles)
    .png()
    .toFile(`out/ivans-escape/${name}.png`);
}
async function main() {
  await validateAssets(ivansEscape);
  await mkdir("out/ivans-escape/frames", { recursive: true });
  console.log("Bundling Ivan local artwork and fonts...");
  const serveUrl = await bundle({ entryPoint: resolve("src/index.ts") });
  const chromiumOptions = { gl: "angle" as const };
  const browser = await openBrowser("chrome", { chromiumOptions });
  const errors: string[] = [];
  const onBrowserLog = (log: { type: string; text: string }) => {
    if (log.type === "error") errors.push(log.text);
  };
  try {
    const compositions = await getCompositions(serveUrl, {
      puppeteerInstance: browser,
      chromiumOptions,
      port: 3100,
    });
    const film = compositions.find((c) => c.id === "IvansEscape")!;
    const pilot = compositions.find((c) => c.id === "IvansEscapePilot")!;
    assert.equal(film.durationInFrames, 1800);
    assert.equal(pilot.durationInFrames, 540);
    const common = {
      serveUrl,
      composition: film,
      puppeteerInstance: browser,
      chromiumOptions,
      port: 3100,
      onBrowserLog,
      timeoutInMilliseconds: 90000,
    };
    if (
      !process.argv.includes("--draft") &&
      !process.argv.includes("--final")
    ) {
      const story = [
        30, 120, 225, 315, 405, 495, 585, 675, 765, 855, 945, 1035, 1140, 1220,
        1300, 1425, 1490, 1580, 1680, 1750, 1790,
      ];
      const boundaries = [
        59, 60, 179, 180, 359, 360, 397, 398, 405, 406, 509, 510, 539, 540,
        1079, 1080, 1169, 1170, 1259, 1260, 1349, 1350, 1529, 1530, 1619, 1620,
        1721, 1722, 1778, 1779, 1799,
      ];
      const selected = process.argv.find((a) => a.startsWith("--frames="));
      const frames = selected
        ? selected.slice(9).split(",").map(Number)
        : process.argv.includes("--affected")
          ? [
              120, 225, 397, 398, 405, 406, 495, 509, 510, 539, 540, 585, 675,
              1260, 1286, 1300, 1302, 1330, 1680,
            ]
          : [...new Set([...story, ...boundaries])];
      frames.forEach((f) =>
        assert.ok(
          Number.isSafeInteger(f) && f >= 0 && f < 1800,
          "Invalid requested still frame",
        ),
      );
      const repeats = selected
        ? [frames[frames.length - 1]]
        : process.argv.includes("--affected")
          ? [405]
          : [405, 1140, 1490];
      for (const frame of [...frames].reverse()) {
        await renderStill({
          ...common,
          frame,
          output: `out/ivans-escape/frames/${frame}.png`,
          imageFormat: "png",
          scale: 1 / 3,
        });
        const stats = await sharp(
          `out/ivans-escape/frames/${frame}.png`,
        ).stats();
        assert.ok(
          stats.channels.slice(0, 3).some((c) => c.mean > 3),
          `Unexpected empty image ${frame}`,
        );
        console.log(`Checked frame ${frame} / ${film.durationInFrames}`);
      }
      for (const frame of repeats) {
        await renderStill({
          ...common,
          frame,
          output: `out/ivans-escape/frames/${frame}-repeat.png`,
          imageFormat: "png",
          scale: 1 / 3,
        });
        assert.deepEqual(
          await readFile(`out/ivans-escape/frames/${frame}.png`),
          await readFile(`out/ivans-escape/frames/${frame}-repeat.png`),
          `Non-deterministic frame ${frame}`,
        );
      }
      await sheet(story, "story-contact-sheet", 3);
      await sheet([30, 120, 225, 315, 405, 495], "pilot-contact-sheet", 2);
      const preflight = compositions.find((c) => c.id === "StudioPreflight")!;
      await renderStill({
        ...common,
        composition: preflight,
        frame: 100,
        output: "out/ivans-escape/engine-regression.png",
        imageFormat: "png",
        scale: 1 / 3,
      });
      assert.equal(errors.length, 0, errors.join("\n"));
      await writeFile(
        "out/ivans-escape/still-results.json",
        JSON.stringify(
          {
            frames,
            repeatFrames: repeats,
            repeatIdentical: true,
            browserErrors: errors,
            gl: "angle",
            film: {
              width: film.width,
              height: film.height,
              fps: film.fps,
              durationInFrames: film.durationInFrames,
            },
            pilotFrames: pilot.durationInFrames,
          },
          null,
          2,
        ),
      );
      console.log(
        "All stills, backward scrubbing and engine regression passed.",
      );
    } else {
      const final = process.argv.includes("--final");
      for (const composition of final ? [film] : [film, pilot]) {
        const name = final
          ? "IvansEscape-1080p"
          : composition.id === "IvansEscape"
            ? "IvansEscape-rough"
            : "IvansEscape-pilot";
        let step = -1;
        await renderMedia({
          ...common,
          composition,
          outputLocation: `out/ivans-escape/${name}.mp4`,
          codec: "h264",
          pixelFormat: "yuv420p",
          crf: final ? 17 : 21,
          scale: final ? 1 : 0.5,
          concurrency: 2,
          onProgress: ({ renderedFrames }) => {
            const current = Math.floor(renderedFrames / 90);
            if (current !== step) {
              step = current;
              console.log(
                `${name}: ${renderedFrames}/${composition.durationInFrames} frames`,
              );
            }
          },
        });
        console.log(`Complete: ${name}.mp4`);
      }
      assert.equal(errors.length, 0, errors.join("\n"));
      await writeFile(
        `out/ivans-escape/${final ? "final" : "draft"}-results.json`,
        JSON.stringify(
          {
            gl: "angle",
            browserErrors: errors,
            filmFrames: 1800,
            pilotFrames: final ? undefined : 540,
            scale: final ? 1 : 0.5,
          },
          null,
          2,
        ),
      );
    }
  } finally {
    await browser.close({ silent: true });
  }
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
