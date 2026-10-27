import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";

async function main() {
  const folder = ".cache/reference-frame-study";
  await mkdir(`${folder}/frames`, { recursive: true });
  const ffmpeg = resolve(
      "node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe",
    ),
    input = resolve("assets/Reference Vid/reference vid.mp4");
  execFileSync(
    ffmpeg,
    [
      "-v",
      "error",
      "-y",
      "-i",
      input,
      "-an",
      "-vf",
      "scale=160:90",
      "-fps_mode",
      "passthrough",
      resolve(`${folder}/frames/%06d.png`),
    ],
    { stdio: "ignore" },
  );
  const files = (await readdir(`${folder}/frames`))
    .filter((f) => f.endsWith(".png"))
    .sort();
  const pixels = 96 * 54,
    count = files.length,
    fps = 24000 / 1001;
  assert.ok(Number.isInteger(count) && count > 7800);
  const changes = [];
  let previous: Buffer | undefined;
  const sheetCount = Math.ceil(count / 144);
  for (let i = 0; i < sheetCount; i++) {
    const batch = files.slice(i * 144, (i + 1) * 144),
      tiles = [];
    for (const [j, file] of batch.entries()) {
      const input = await readFile(`${folder}/frames/${file}`),
        raw = await sharp(input).resize(96, 54).grayscale().raw().toBuffer();
      let difference = 0,
        mean = 0;
      for (let p = 0; p < pixels; p++) {
        difference += previous ? Math.abs(raw[p] - previous[p]) : 0;
        mean += raw[p];
      }
      const frame = i * 144 + j;
      changes.push({
        frame,
        seconds: Number((frame / fps).toFixed(4)),
        mean: Number((mean / pixels).toFixed(2)),
        difference: Number((difference / pixels).toFixed(2)),
      });
      previous = raw;
      tiles.push({ input, left: (j % 12) * 160, top: Math.floor(j / 12) * 90 });
    }
    const labels = Array.from({ length: 144 }, (_, j) => {
      const frame = i * 144 + j;
      if (frame >= count) return "";
      return `<text x="${(j % 12) * 160 + 3}" y="${Math.floor(j / 12) * 90 + 13}" font-size="12" font-family="Arial" fill="white" stroke="black" stroke-width=".5" paint-order="stroke">${frame} / ${(frame / fps).toFixed(2)}</text>`;
    }).join("");
    const buffer = await sharp({
      create: { width: 1920, height: 1080, channels: 3, background: "black" },
    })
      .composite([
        ...tiles,
        {
          input: Buffer.from(`<svg width="1920" height="1080">${labels}</svg>`),
        },
      ])
      .png()
      .toBuffer();
    await writeFile(
      `${folder}/sheet-${String(i + 1).padStart(3, "0")}.png`,
      buffer,
    );
  }
  const report = {
    source: "assets/Reference Vid/reference vid.mp4",
    fps,
    decodedFrames: count,
    visualSheets: sheetCount,
    layout:
      "12 columns x12 rows; every decoded frame in order,160x90 thumbnails; enlarged cut studies are separate",
    cutCandidates: changes.filter((c) => c.difference > 21),
    allFrameMetrics: changes,
  };
  await writeFile(
    `${folder}/FRAME_STUDY.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify({
      decodedFrames: count,
      sheets: sheetCount,
      cutCandidates: report.cutCandidates.length,
    }),
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
