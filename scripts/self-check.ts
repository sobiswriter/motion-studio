import assert from "node:assert/strict";
import { studioPreflight } from "../src/projects/_demo/project";
import { validateProject } from "../src/engine/validation/project";
import { poseAt, progress, sample } from "../src/engine/timeline/keyframes";
import { parallaxCamera } from "../src/engine/camera/Camera2D";
import { maskStyle } from "../src/engine/compositing/MaskReveal";
import { cueFrame } from "../src/engine/audio/AudioCueMap";
import { validateAssets } from "./validate-assets";
import type { MotionProject } from "../src/engine/types";
import { planeTransform } from "../src/engine/camera/plane-transform";

async function main() {
  let checks = 0;
  const rejects = (change: (p: MotionProject) => void, pattern: RegExp) => {
    const project = structuredClone(studioPreflight);
    change(project);
    assert.throws(() => validateProject(project), pattern);
    checks++;
  };
  assert.equal(validateProject(studioPreflight), 120);
  const sound = () => ({ assetId: "tone", duration: 12, volumeDb: -12 });
  const withSound = structuredClone(studioPreflight);
  withSound.cues!["pose-change"].sound = sound();
  assert.equal(validateProject(withSound), 120);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), assetId: "missing" };
  }, /Missing audio/);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), assetId: "plate" };
  }, /Missing audio/);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), duration: 1.5 };
  }, /integer/);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), duration: 61 };
  }, /sound extends beyond/);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), volumeDb: Number.NaN };
  }, /finite/);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), volumeDb: 1 };
  }, /volumeDb/);
  rejects((p) => {
    p.cues!["pose-change"].sound = { ...sound(), trimBefore: -1 };
  }, /integer/);
  const spatial = studioPreflight.shots[2].layers[0];
  const moved = {
    ...spatial,
    anchor: [0.5, 0.5] as [number, number],
    depthMotion: [
      { frame: 0, value: { z: 0 } },
      { frame: 10, value: { z: 100 } },
    ],
    rotation3D: [
      { frame: 0, value: { x: 0, y: 0, z: 0 } },
      { frame: 10, value: { x: 0, y: 30, z: 0 } },
    ],
  };
  assert.equal(
    planeTransform(moved, 10, 1920, 1080).position[2],
    (spatial.depth ?? 0) + 100,
  );
  assert.ok(
    Math.abs(planeTransform(moved, 10, 1920, 1080).rotation[1] - Math.PI / 6) <
      1e-12,
  );
  assert.deepEqual(
    planeTransform(moved, 10, 1920, 1080),
    planeTransform(moved, 10, 1920, 1080),
  );
  rejects((p) => {
    p.shots[0].layers[0].depthMotion = [{ frame: 0, value: { z: 1 } }];
  }, /spatial tracks/);
  rejects((p) => {
    p.shots[2].layers[0].depthMotion = [{ frame: 0, value: { z: 50000 } }];
  }, /clipping range/);
  rejects((p) => {
    p.shots[2].layers[0].rotation3D = [
      { frame: 0, value: { x: 0, y: Number.NaN, z: 0 } },
    ];
  }, /finite/);
  rejects((p) => {
    p.shots[1].startFrame++;
  }, /gap|overlap/);
  rejects((p) => {
    p.shots[1].startFrame--;
  }, /gap|overlap/);
  rejects((p) => {
    p.shots[2].transition = undefined;
  }, /overlap/);
  rejects((p) => {
    p.shots[0].duration = 39.5;
  }, /integer/);
  rejects((p) => {
    p.shots[1].id = p.shots[0].id;
  }, /Duplicate/);
  rejects((p) => {
    p.shots[0].layers[0].assetId = "missing";
  }, /Missing image/);
  rejects((p) => {
    p.shots[0].layers[0].x = 100;
  }, /crop-safe/);
  rejects((p) => {
    p.shots[0].camera[0].frame = 999;
  }, /inside/);
  rejects((p) => {
    p.assets.plate.src = "../escape.png";
  }, /local/);
  rejects((p) => {
    p.assets.plate.src = "https://example.com/a.png";
  }, /local/);
  rejects((p) => {
    p.shots[0].layers[0].scale = 0;
  }, /expected/);
  rejects((p) => {
    p.shots[0].audioCueRefs = ["missing"];
  }, /audio cue/);
  rejects((p) => {
    p.shots[2].layers[2].depth = -999;
  }, /increasing depth/);
  const keys = [
    { frame: 0, value: { x: 0 } },
    { frame: 20, value: { x: 100 } },
  ];
  assert.equal(sample(keys, -1).x, 0);
  assert.equal(sample(keys, 10).x, 50);
  assert.equal(sample(keys, 99).x, 100);
  const shuffled = [20, 0, 10, 0, 20, 10].map((frame) => sample(keys, frame).x);
  assert.deepEqual(shuffled, [100, 0, 50, 0, 100, 50]);
  const cels = [
    { frame: 0, assetId: "a" },
    { frame: 20, assetId: "b" },
  ];
  assert.equal(poseAt(cels, 19, "a"), "a");
  assert.equal(poseAt(cels, 20, "a"), "b");
  assert.equal(poseAt(cels, 0, "a"), "a");
  assert.equal(progress(7, 0, 8), 1);
  assert.equal(progress(0, 0, 8), 0);
  assert.equal(
    maskStyle({ shape: "wipe-left", from: 0, duration: 8 }, 7).clipPath,
    "inset(0 0% 0 0)",
  );
  const c = { x: 100, y: 20, zoom: 1.2, pivotX: 0, pivotY: 0 };
  assert.equal(parallaxCamera(c, 0.5).x, 50);
  assert.equal(parallaxCamera(c, 1, true).zoom, 1);
  assert.equal(cueFrame(studioPreflight.cues!, "pose-change"), 60);
  const portrait = structuredClone(studioPreflight);
  portrait.width = 720;
  portrait.height = 1280;
  portrait.fps = 24;
  portrait.shots.forEach((shot) =>
    shot.layers.forEach((layer) => {
      layer.cropSafe = undefined;
    }),
  );
  assert.equal(validateProject(portrait), 120);
  assert.equal(portrait.fps, 24);
  const missing = structuredClone(studioPreflight);
  missing.assets.plate.src = "projects/_demo/images/missing.png";
  await assert.rejects(() => validateAssets(missing), /missing asset plate/);
  const dimensions = structuredClone(studioPreflight);
  dimensions.assets.plate.width = 1;
  await assert.rejects(
    () => validateAssets(dimensions),
    /source dimensions changed/,
  );
  console.log(
    `Self-check passed: ${checks} invalid configurations rejected; timeline, keyframes, backward sampling, cels, masks, cues, parallax, independent settings and asset errors verified.`,
  );
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
