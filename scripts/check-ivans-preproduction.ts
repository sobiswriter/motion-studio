import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, access } from "node:fs/promises";
import {
  ivansEscapeReview,
  ivansEscapePacket01,
} from "../src/projects/ivans-escape/project";
import {
  artworkBriefs,
  fontRequirements,
} from "../src/projects/ivans-escape/assets";
import {
  productionShots,
  packet01CameraPlans,
  shot02LayerPlan,
} from "../src/projects/ivans-escape/shots";
import { summarizeAudio } from "../src/projects/ivans-escape/audio-analysis";
import { validateProject } from "../src/engine/validation/project";
import { sample } from "../src/engine/timeline/keyframes";
import { validateAssets } from "./validate-assets";
import type { AssetManifest, MotionProject } from "../src/engine/types";

async function main() {
  const starts = [
    0, 60, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1170, 1260,
    1350, 1440, 1530, 1620,
  ];
  assert.equal(productionShots.length, 19);
  assert.deepEqual(
    productionShots.map((s) => s.startFrame),
    starts,
  );
  assert.deepEqual(
    productionShots.map((s) => s.duration),
    [60, 120, ...Array(16).fill(90), 180],
  );
  for (let i = 0; i < 19; i++) {
    const shot = productionShots[i];
    assert.equal(shot.id, `SH${String(i + 1).padStart(2, "0")}`);
    assert.equal(shot.startFrame + shot.duration, starts[i + 1] ?? 1800);
    shot.assets.forEach((id) =>
      assert.ok(
        artworkBriefs.some((a) => a.id === id || a.group === id),
        `No brief for ${shot.id}/${id}`,
      ),
    );
  }
  assert.equal(validateProject(ivansEscapeReview), 1800);
  assert.equal(validateProject(ivansEscapePacket01), 180);
  assert.equal(
    new Set(artworkBriefs.map((a) => a.id)).size,
    artworkBriefs.length,
  );
  artworkBriefs.forEach((a) => {
    for (const field of [
      "subject",
      "viewpoint",
      "composition",
      "lighting",
      "perspective",
      "palette",
      "exclude",
      "separation",
      "pivot",
      "depth",
      "movement",
    ] as const)
      assert.ok(a[field].length > 10, `${a.id}: ${field}`);
    assert.ok(a.width > 0 && a.height > 0);
  });
  assert.deepEqual(
    fontRequirements.map((f) => f.family),
    ["IBM Plex Mono", "Space Grotesk"],
  );
  ivansEscapeReview.shots.forEach((s) => {
    assert.equal(
      s.mode,
      "flat-2d",
      "Review board must not activate production renderers",
    );
    assert.equal(s.camera.length, 1, "Review camera stays static");
    assert.ok(
      s.layers.every((l) =>
        ivansEscapeReview.assets[l.assetId].src.includes("/references/"),
      ),
      "Only labeled references are visible",
    );
  });
  assert.deepEqual(
    packet01CameraPlans.SH01[0].value,
    packet01CameraPlans.SH01[1].value,
  );
  assert.equal(sample(packet01CameraPlans.SH02, 0).zoom, 1);
  assert.equal(sample(packet01CameraPlans.SH02, 119).zoom, 1.25);
  assert.equal(sample(packet01CameraPlans.SH02, 60).pivotX, 960);
  assert.equal(sample(packet01CameraPlans.SH02, 60).pivotY, 300);
  const plannedAssets: AssetManifest = Object.fromEntries(
    artworkBriefs.map((a) => [
      a.id,
      {
        id: a.id,
        src: `projects/ivans-escape/${a.filename}`,
        kind: "image",
        width: a.width,
        height: a.height,
        alpha: a.alpha,
      },
    ]),
  );
  const cameraProof: MotionProject = {
    ...ivansEscapeReview,
    id: "IvansEscapeCameraPlanProof",
    assets: plannedAssets,
    audio: undefined,
    shots: [
      {
        id: "SH02-plan",
        startFrame: 0,
        duration: 120,
        mode: "multiplane-2d",
        layers: shot02LayerPlan,
        camera: packet01CameraPlans.SH02,
      },
    ],
  };
  assert.equal(
    validateProject(cameraProof),
    120,
    "Planned camera/opaque overscan bounds must pass structurally without claiming files exist",
  );
  const hash = async (path: string) =>
    createHash("sha256")
      .update(await readFile(path))
      .digest("hex");
  assert.equal(
    await hash("Ivan_ESCAPE_MASTER.md"),
    await hash("docs/projects/ivans-escape/IVANS_ESCAPE_MASTER.md"),
  );
  assert.equal(
    await hash("assets/Music/Ivan_Is_Loading.mp3"),
    await hash("public/projects/ivans-escape/audio/track.mp3"),
  );
  assert.equal(
    await hash("assets/Music/Ivan_Is_Loading.mp3"),
    "bd039dc8b6d650c129d94627ea15d227ef579ca00f37927f3b788fb12622fca4",
  );
  const constant = summarizeAudio({
    channelWaveforms: [new Float32Array(100).fill(0.5)],
    sampleRate: 100,
    durationInSeconds: 1,
    numberOfChannels: 1,
  });
  assert.equal(constant.rms.length, 50);
  assert.ok(constant.rms.every((v) => v === 0.5));
  assert.throws(
    () =>
      summarizeAudio({
        channelWaveforms: [],
        sampleRate: 0,
        durationInSeconds: 0,
        numberOfChannels: 0,
      }),
    /sampled channels/,
  );
  assert.throws(
    () =>
      summarizeAudio({
        channelWaveforms: [new Float32Array(3), new Float32Array(4)],
        sampleRate: 100,
        durationInSeconds: 0.03,
        numberOfChannels: 2,
      }),
    /inconsistent/,
  );
  const docs = [
    "IVANS_ESCAPE_MASTER.md",
    "PRODUCTION_BIBLE.md",
    "SHOTLIST.md",
    "ASSET_MANIFEST.md",
    "ARTWORK_BRIEFS.md",
    "AUDIO_CUES.md",
    "PRODUCTION_PACKETS.md",
    "IMPLEMENTATION_REPORT.md",
    "packets/P01_SHOTS_01_02.md",
  ];
  await Promise.all(
    docs.map((path) => access(`docs/projects/ivans-escape/${path}`)),
  );
  await validateAssets(ivansEscapeReview);
  await validateAssets(ivansEscapePacket01);
  console.log(
    `Ivan preproduction passed: 19 exact shots/1800 frames, 180-frame review packet, ${artworkBriefs.length} complete briefs, camera plan coverage, isolated references, original audio/master copies and RMS checks.`,
  );
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
