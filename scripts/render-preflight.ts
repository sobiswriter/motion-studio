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
import { projects } from "../src/projects";
import { validateAssets } from "./validate-assets";

async function main() {
  for (const project of projects) await validateAssets(project);
  await mkdir("out/frames", { recursive: true });
  console.log("Bundling local source and assets...");
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
    assert.deepEqual(
      compositions.map((c) => c.id),
      [
        "IvansEscape-S01",
        "IvansEscape-S02",
        "IvansEscape-S03",
        "IvansEscape-S04",
        "IvansEscape-S05",
        "IvansEscape-S06",
        ...projects.map((p) => p.id),
      ],
    );
    const composition = compositions.find((c) => c.id === "StudioPreflight");
    assert.ok(composition);
    assert.equal(composition.durationInFrames, 120);
    assert.equal(composition.width, 1920);
    assert.equal(composition.height, 1080);
    assert.equal(composition.fps, 30);
    const common = {
      serveUrl,
      composition,
      puppeteerInstance: browser,
      chromiumOptions,
      onBrowserLog,
      port: 3100,
    };
    const frames = [0, 20, 40, 60, 80, 100, 119];
    // A deliberately nonmonotonic render order also checks frame-independent texture/cel loading.
    for (const frame of [...frames].reverse()) {
      await renderStill({
        ...common,
        frame,
        output: `out/frames/${frame}.png`,
        imageFormat: "png",
        scale: 1 / 3,
      });
      const stats = await sharp(`out/frames/${frame}.png`).stats();
      assert.ok(
        stats.channels.slice(0, 3).some((c) => c.mean > 15),
        `Unexpected black image at ${frame}`,
      );
      if (frame >= 100) {
        const artwork = await sharp(`out/frames/${frame}.png`)
          .extract({ left: 160, top: 90, width: 320, height: 240 })
          .stats();
        assert.ok(
          artwork.channels[0].stdev > 15,
          `Image-plane artwork is missing at frame ${frame}`,
        );
      }
      console.log(`Verified still ${frame}`);
    }
    await renderStill({
      ...common,
      frame: 100,
      output: "out/frames/100-repeat.png",
      imageFormat: "png",
      scale: 1 / 3,
    });
    assert.deepEqual(
      await readFile("out/frames/100.png"),
      await readFile("out/frames/100-repeat.png"),
      "Repeated 3D frame differs",
    );
    const tiles = await Promise.all(
      frames.map(async (frame, i) => ({
        input: await sharp(`out/frames/${frame}.png`)
          .extend({ bottom: 36, background: "#18212a" })
          .composite([
            {
              input: Buffer.from(
                `<svg width="640" height="396"><text x="16" y="384" font-size="20" font-family="Arial" fill="white">FRAME ${frame}</text></svg>`,
              ),
              left: 0,
              top: 0,
            },
          ])
          .png()
          .toBuffer(),
        left: (i % 2) * 640,
        top: Math.floor(i / 2) * 396,
      })),
    );
    await sharp({
      create: { width: 1280, height: 1584, channels: 3, background: "#18212a" },
    })
      .composite(tiles)
      .png()
      .toFile("out/contact-sheet.png");
    const alternate = structuredClone(projects[0]);
    alternate.width = 720;
    alternate.height = 1280;
    alternate.fps = 24;
    alternate.shots.forEach((shot) =>
      shot.layers.forEach((layer) => {
        layer.cropSafe = undefined;
      }),
    );
    const alternateCompositions = await getCompositions(serveUrl, {
      puppeteerInstance: browser,
      chromiumOptions,
      port: 3100,
      inputProps: { project: alternate },
    });
    const portrait = alternateCompositions.find((c) => c.id === alternate.id);
    assert.ok(portrait);
    assert.equal(portrait.width, 720);
    assert.equal(portrait.height, 1280);
    assert.equal(portrait.fps, 24);
    await renderStill({
      ...common,
      composition: portrait,
      inputProps: { project: alternate },
      frame: 0,
      scale: 0.25,
      output: "out/frames/settings-check.png",
      imageFormat: "png",
    });
    const metadata = await sharp("out/frames/settings-check.png").metadata();
    assert.equal(metadata.width, 180);
    assert.equal(metadata.height, 320);
    assert.equal(errors.length, 0, errors.join("\n"));
    if (process.argv.includes("--stills-only")) {
      console.log(
        "Stills, 3D regression and independent project settings passed.",
      );
      return;
    }
    console.log("Rendering one 1920x1080 / 120-frame MP4 with ANGLE...");
    let last = -1;
    await renderMedia({
      ...common,
      outputLocation: "out/StudioPreflight.mp4",
      codec: "h264",
      pixelFormat: "yuv420p",
      concurrency: 2,
      onProgress: ({ renderedFrames }) => {
        const step = Math.floor(renderedFrames / 30);
        if (step !== last) {
          last = step;
          console.log(`Rendered ${renderedFrames}/120 frames`);
        }
      },
    });
    assert.equal(errors.length, 0, errors.join("\n"));
    await writeFile(
      "out/render-results.json",
      JSON.stringify(
        {
          composition: {
            id: composition.id,
            width: composition.width,
            height: composition.height,
            fps: composition.fps,
            durationInFrames: composition.durationInFrames,
          },
          gl: "angle",
          frames,
          repeatedFrame100Identical: true,
          browserErrors: errors,
        },
        null,
        2,
      ),
    );
    console.log("Preflight MP4 and contact sheet complete.");
  } finally {
    await browser.close({ silent: true });
  }
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
