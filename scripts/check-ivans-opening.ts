import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile, readdir } from "node:fs/promises";
import sharp from "sharp";
import {
  ivansEscape,
  ivansEscapePilot,
  ivansEscapePacket,
} from "../src/projects/ivans-escape/film";
import {
  openingCuts,
  reflectionPose,
  architecturalWipe,
} from "../src/projects/ivans-escape/opening-shots";
import vocals from "../src/projects/ivans-escape/vocals.json";
import { validateProject } from "../src/engine/validation/project";
import { planeTransform } from "../src/engine/camera/plane-transform";
import { sample } from "../src/engine/timeline/keyframes";
import { validateAssets } from "./validate-assets";

async function bounds(id: string) {
  const { data, info } = await sharp(`public/${ivansEscape.assets[id].src}`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let left = info.width,
    right = 0,
    top = info.height,
    bottom = 0,
    transparent = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) {
      const a = data[(y * info.width + x) * 4 + 3];
      if (a < 5) transparent++;
      if (a > 80) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
  assert.ok(
    right > left &&
      bottom > top &&
      transparent > info.width * info.height * 0.1,
    `${id}: alpha not preserved`,
  );
  return { left, right, top, bottom, width: info.width, height: info.height };
}
async function main() {
  assert.equal(validateProject(ivansEscape), 1800);
  assert.equal(validateProject(ivansEscapePilot), 540);
  assert.equal(validateProject(ivansEscapePacket), 180);
  assert.equal(ivansEscape.shots.length, 40);
  for (const index of [11, 14, 16]) {
    const focus = ivansEscape.shots[index].layers.find(
      (l) => l.id === "emotion-focus",
    )!;
    assert.ok(
      focus &&
        focus.x <= 0 &&
        focus.y <= 0 &&
        focus.x + focus.width >= 1920 &&
        focus.y + focus.height >= 1080,
      "Emotion crop must cover the canvas",
    );
  }
  const refusal = ivansEscape.shots[24].layers.find((l) => l.cels)!;
  assert.deepEqual(refusal.cels, [
    { frame: 0, assetId: "portrait-1" },
    { frame: 18, assetId: "portrait-3" },
  ]);
  for (let i = 29; i < 33; i++) {
    const memory = ivansEscape.shots[i],
      source = ivansEscape.shots[[5, 9, 13, 23][i - 29]];
    assert.equal(
      memory.layers.length,
      source.layers.length,
      "Memory must carry its source artwork",
    );
    assert.deepEqual(
      memory.layers.map((l) => l.assetId),
      source.layers.map((l) => l.assetId),
    );
    assert.ok(memory.layers.some((l) => l.type === "environment"));
  }
  for (const shot of ivansEscape.shots.filter(
    (s) => s.mode !== "image-plane-3d",
  ))
    for (const [i, layer] of shot.layers.entries())
      if (layer.assetId === "contact-shadow") {
        assert.ok(i > 0, "Contact shadow must be above the opaque environment");
        assert.equal(shot.layers[i + 1].id, layer.id.replace(/-contact$/, ""));
      }
  for (const f of [0, 180, 540, 1260, 1620, 1800])
    assert.ok(openingCuts.includes(f));
  assert.equal(reflectionPose(18), "portrait-2");
  assert.equal(reflectionPose(19), "portrait-3");
  assert.equal(reflectionPose(26, true), "portrait-2");
  assert.equal(reflectionPose(27, true), "portrait-3");
  const routine = ivansEscape.shots[5],
    duplicate = ivansEscape.shots[13];
  assert.deepEqual(
    routine.layers.find((l) => l.id === "routine-ivan")?.cels,
    duplicate.layers.find((l) => l.id === "routine-ivan")?.cels,
  );
  assert.deepEqual(routine.camera[0], duplicate.camera[0]);
  assert.equal(
    ivansEscape.shots[26].layers.filter((l) => l.id.startsWith("road-")).length,
    54,
  );
  for (const shot of ivansEscape.shots.filter(
    (s) => s.mode === "image-plane-3d",
  ))
    for (const l of shot.layers) {
      const frames = [
        shot.duration - 1,
        0,
        Math.floor(shot.duration / 2),
        shot.duration - 1,
      ];
      const transforms = frames.map((f) => planeTransform(l, f, 1920, 1080));
      assert.deepEqual(transforms[0], transforms[3]);
    }
  for (const prefix of ["walk", "run", "leap", "shoe"])
    for (let i = 0; i < (prefix === "walk" || prefix === "run" ? 4 : 3); i++)
      await bounds(`${prefix}-${i}`);
  const foot = ivansEscape.shots[12].layers.find(
    (l) => l.id === "boundary-foot",
  )!;
  const before = await bounds("shoe-0"),
    after = await bounds("shoe-2");
  const toeBefore = foot.x + (before.right * foot.width) / before.width;
  const toeAfter =
    foot.x +
    sample(foot.motion!, 29).x +
    (after.right * foot.width) / after.width;
  assert.ok(
    toeBefore < 1260 && toeAfter > 1380,
    `Shoe must visibly cross route: ${toeBefore}/${toeAfter}`,
  );
  assert.ok(
    ivansEscape.shots[12].layers.findIndex((l) => l.assetId === "route") <
      ivansEscape.shots[12].layers.indexOf(foot),
  );
  assert.equal(vocals.phrases.length, 14);
  const foreground = await sharp(`public/${ivansEscape.assets.foreground.src}`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const cutX =
    architecturalWipe.fromX -
    (309 - architecturalWipe.from) * architecturalWipe.step;
  for (let y = 0; y < 1080; y++)
    for (let x = 0; x < 1920; x++) {
      const sx = Math.floor(
          ((x - cutX) * foreground.info.width) / architecturalWipe.width,
        ),
        sy = Math.floor(
          ((y - architecturalWipe.y) * foreground.info.height) /
            architecturalWipe.height,
        );
      assert.equal(
        foreground.data[(sy * foreground.info.width + sx) * 4 + 3],
        255,
        "Pier must completely conceal the hard cut at309",
      );
    }
  let end = 0;
  for (const phrase of vocals.phrases) {
    assert.ok(
      phrase.fromMs >= end &&
        phrase.toMs <= 60000 &&
        phrase.toMs > phrase.fromMs,
    );
    let previous = phrase.fromMs;
    for (const word of phrase.words) {
      assert.ok(
        word.startMs >= previous &&
          word.endMs > word.startMs &&
          word.endMs <= phrase.toMs,
      );
      previous = word.endMs;
    }
    end = phrase.toMs;
  }
  const digest = async (path: string) =>
    createHash("sha256")
      .update(await readFile(path))
      .digest("hex");
  assert.equal(
    await digest("assets/Music/Ivan_Is_Loading.mp3"),
    await digest("public/projects/ivans-escape/audio/track.mp3"),
  );
  for (const asset of Object.values(ivansEscape.assets))
    assert.ok(!/references|Reference Vid|https?:/.test(asset.src));
  const missing = structuredClone(ivansEscape);
  missing.assets.front.src = "projects/ivans-escape/illustrated/absent.png";
  await assert.rejects(() => validateAssets(missing), /missing asset front/);
  await validateAssets(ivansEscape);
  const audit = JSON.parse(
    await readFile(
      "docs/projects/ivans-escape/redirection/pass01/SOURCE_AUDIT.json",
      "utf8",
    ),
  ) as { protectedFiles: Record<string, string> };
  const protectedFiles = Object.entries(audit.protectedFiles).filter(
    ([path]) =>
      path.startsWith("src/engine/") ||
      path.startsWith("src/templates/") ||
      path.startsWith("out/") ||
      path.endsWith("MASTER.md") ||
      path.endsWith("film-shots.ts") ||
      path.endsWith("production-assets.ts") ||
      path === "src/projects/index.ts" ||
      path === "src/projects/components.ts",
  );
  for (const [path, expected] of protectedFiles)
    assert.equal(
      await digest(path),
      expected,
      `Protected archive/engine changed: ${path}`,
    );
  assert.equal(
    await digest("src/projects/ivans-escape/legacy-film.ts"),
    audit.protectedFiles["src/projects/ivans-escape/film.ts"],
  );
  const art = [];
  for (const name of await readdir(
    "public/projects/ivans-escape/illustrated/source",
  ))
    if (name.endsWith(".png")) {
      const path = `public/projects/ivans-escape/illustrated/source/${name}`,
        meta = await sharp(path).metadata();
      art.push({
        path,
        nativeWidth: meta.width,
        nativeHeight: meta.height,
        hasAlpha: meta.hasAlpha,
        sha256: await digest(path),
        method: "built-in imagegen; see IMAGE_PROMPTS.json",
      });
    }
  assert.equal(art.length, 16);
  await writeFile(
    "docs/projects/ivans-escape/redirection/production/SOURCE_ART.json",
    JSON.stringify(art, null, 2),
  );
  await writeFile(
    "docs/projects/ivans-escape/redirection/production/IMPLEMENTED_SHOTS.json",
    JSON.stringify(ivansEscape.shots, null, 2),
  );
  await writeFile(
    "docs/projects/ivans-escape/redirection/production/TECHNICAL_CHECKS.json",
    JSON.stringify(
      {
        shots: 40,
        internalCuts: 39,
        durationInFrames: 1800,
        fps: 30,
        pilotFrames: 540,
        packetFrames: 180,
        modes: [...new Set(ivansEscape.shots.map((s) => s.mode))],
        reflectionLagFrames: 8,
        roadRegions: 54,
        captionPhrases: 14,
        captionAlignment:
          "local small.en token DTW; wording corrected from supplied lyric notes; human timing review pending",
        shoeToeBefore: toeBefore,
        shoeToeAfter: toeAfter,
        originalAudioSha256: await digest("assets/Music/Ivan_Is_Loading.mp3"),
        engineChanged: false,
        opaqueWipeVerifiedAtFrame: 309,
        protectedEngineTemplateArchiveFiles: protectedFiles.length,
      },
      null,
      2,
    ),
  );
  console.log(
    "Illustrated opening checks passed: timeline, cels, reflection, depth, alpha, shoe crossing, captions, local assets and original audio.",
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
