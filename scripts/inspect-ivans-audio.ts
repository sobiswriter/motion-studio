import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { bundle } from "@remotion/bundler";
import { getCompositions, openBrowser } from "@remotion/renderer";
import type { summarizeAudio } from "../src/projects/ivans-escape/audio-analysis";

async function main() {
  const serveUrl = await bundle({
    entryPoint: resolve("scripts/ivans-audio-entry.tsx"),
  });
  const browser = await openBrowser("chrome", {
    chromiumOptions: { gl: "angle" },
  });
  try {
    const [composition] = await getCompositions(serveUrl, {
      puppeteerInstance: browser,
      chromiumOptions: { gl: "angle" },
      port: 3100,
    });
    const summary = composition.props.summary as ReturnType<
      typeof summarizeAudio
    >;
    assert.ok(summary.durationSeconds > 0);
    assert.ok(summary.rms.length > 0);
    const root = "docs/projects/ivans-escape";
    await writeFile(
      `${root}/AUDIO_ANALYSIS.json`,
      JSON.stringify(summary, null, 2) + "\n",
    );
    const max = Math.max(...summary.rms, 0.00001);
    const points = summary.rms
      .map(
        (value, i) =>
          `${60 + ((i * summary.binSeconds) / 60) * 1380},${325 - (value / max) * 220}`,
      )
      .join(" ");
    const markers = [0, 6, 18, 42, 54, 60]
      .map(
        (s) =>
          `<path d="M${60 + (s / 60) * 1380} 70V360" stroke="#586A79"/><text x="${60 + (s / 60) * 1380}" y="395" fill="#E6E9E6" font-size="20">${s}s</text>`,
      )
      .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="430"><rect width="1500" height="430" fill="#0B1018"/><text x="60" y="42" fill="#E6E9E6" font-size="24">IVAN — measured 20ms RMS / section marks are supplied edit boundaries</text>${markers}<polyline points="${points}" fill="none" stroke="#B5C3C9" stroke-width="1.4"/></svg>`;
    await writeFile(`${root}/references/audio-rms.svg`, svg);
    console.log(
      JSON.stringify(
        {
          durationSeconds: summary.durationSeconds,
          binCount: summary.rms.length,
          transientCandidates: summary.transientCandidates,
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close({ silent: true });
  }
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
