import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { studioPreflight } from "../src/projects/_demo/project";
import { validateAssets } from "./validate-assets";

async function main() {
  const project = structuredClone(studioPreflight);
  project.audio = undefined;
  project.shots = [{ ...project.shots[0], duration: 120 }];
  project.cues = {
    test: {
      frame: 30,
      label: "SFX timing calibration",
      sound: { assetId: "tone", duration: 2, trimBefore: 40, volumeDb: -12 },
    },
  };
  await validateAssets(project);
  await mkdir("out/audio-smoke", { recursive: true });
  const entryPoint = resolve(".cache/sfx-check-entry.tsx");
  await writeFile(
    entryPoint,
    `
    import {Composition, registerRoot} from 'remotion';
    import {ShotTimeline} from '../src/engine/timeline/ShotTimeline';
    const project = ${JSON.stringify(project)};
    registerRoot(() => <Composition id="SfxCheck" component={ShotTimeline}
      width={1920} height={1080} fps={30} durationInFrames={120}
      defaultProps={{project}} />);
  `,
  );
  const serveUrl = await bundle({ entryPoint });
  const chromiumOptions = { gl: "angle" as const };
  const composition = await selectComposition({
    serveUrl,
    id: "SfxCheck",
    chromiumOptions,
  });
  const outputLocation = resolve("out/audio-smoke/timeline-cue.wav");
  await renderMedia({
    serveUrl,
    composition,
    codec: "wav",
    outputLocation,
    chromiumOptions,
  });
  const decode = (path: string) => {
    const bytes = execFileSync(
      "ffmpeg",
      [
        "-v",
        "error",
        "-i",
        path,
        "-af",
        "pan=mono|c0=c0",
        "-ar",
        "48000",
        "-f",
        "f32le",
        "-",
      ],
      { maxBuffer: 10_000_000 },
    );
    return Array.from({ length: bytes.length / 4 }, (_, i) =>
      bytes.readFloatLE(i * 4),
    );
  };
  const rendered = decode(outputLocation);
  const source = decode(resolve("public", project.assets.tone.src));
  const rms = (samples: number[]) =>
    Math.sqrt(samples.reduce((sum, v) => sum + v * v, 0) / samples.length);
  assert.equal(rendered.length, 4 * 48000);
  assert.ok(
    rms(rendered.slice(0, 48000)) < 0.00001,
    "sound must not precede frame 30",
  );
  assert.ok(
    rms(rendered.slice(51200)) < 0.00001,
    "sound must end at exclusive frame 32",
  );
  const sourceRms = rms(source.slice(64000, 67200));
  assert.ok(
    sourceRms > 0.001,
    "the source trim must contain the calibration pulse",
  );
  const gain = rms(rendered.slice(48000, 51200)) / sourceRms;
  assert.ok(
    Math.abs(gain - 10 ** (-12 / 20)) < 0.002,
    `expected -12 dB gain, got ${gain}`,
  );
  console.log(
    "SFX render passed: frame 30 start, frame 32 exclusive end, source trim and -12 dB gain.",
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
