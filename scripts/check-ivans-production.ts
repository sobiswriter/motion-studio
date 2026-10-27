import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import {
  ivansEscape,
  ivansEscapePilot,
  ivansEscapePacket,
} from "../src/projects/ivans-escape/legacy-film";
import {
  filmShots,
  montageCuts,
} from "../src/projects/ivans-escape/film-shots";
import { productionShots } from "../src/projects/ivans-escape/shots";
import { roadTiles } from "../src/projects/ivans-escape/production-assets";
import { validateProject } from "../src/engine/validation/project";
import { validateAssets } from "./validate-assets";
import { poseAt, sample } from "../src/engine/timeline/keyframes";
import { planeTransform } from "../src/engine/camera/plane-transform";

async function main() {
  assert.equal(validateProject(ivansEscape), 1800);
  assert.equal(validateProject(ivansEscapePilot), 540);
  assert.equal(validateProject(ivansEscapePacket), 180);
  assert.equal(filmShots.length, 19);
  filmShots.forEach((shot, i) =>
    assert.deepEqual(
      [shot.id, shot.startFrame, shot.duration],
      [
        productionShots[i].id,
        productionShots[i].startFrame,
        productionShots[i].duration,
      ],
    ),
  );
  assert.deepEqual([...new Set(filmShots.map((s) => s.mode))].sort(), [
    "flat-2d",
    "image-plane-3d",
    "multiplane-2d",
  ]);
  const reflection = filmShots[4].layers.find((l) => l.id === "reflection")!;
  const hero = filmShots[4].layers.find((l) => l.id === "real-ivan")!;
  assert.equal(poseAt(hero.cels, 37, hero.assetId), "ch03-rear");
  assert.equal(poseAt(hero.cels, 38, hero.assetId), "ch04-turn");
  assert.equal(
    poseAt(reflection.cels, 45, reflection.assetId),
    "ch03-r-reflection",
  );
  assert.equal(
    poseAt(reflection.cels, 46, reflection.assetId),
    "ch04-r-reflection",
  );
  const routine = filmShots[2],
    duplicate = filmShots[6];
  assert.deepEqual(routine.camera[0], duplicate.camera[0]);
  const a = routine.layers.find((l) => l.id === "ivan-walking")!,
    b = duplicate.layers.find((l) => l.id === "ivan-walking")!;
  assert.deepEqual({ ...a, motion: undefined }, { ...b, motion: undefined });
  assert.equal(sample(b.motion!, 0).x, 0);
  assert.equal(roadTiles.length, 54);
  assert.equal(new Set(roadTiles.map((t) => `${t.row}:${t.col}`)).size, 54);
  assert.equal(
    filmShots[12].layers.filter((l) => l.id.startsWith("road-")).length,
    54,
  );
  const p = filmShots[16].layers[2];
  const repeated = [89, 0, 35, 89].map((f) => planeTransform(p, f, 1920, 1080));
  assert.deepEqual(repeated[0], repeated[3]);
  assert.notDeepEqual(repeated[0], repeated[1]);
  assert.deepEqual(montageCuts, [0, 26, 42, 70, 90]);
  const missing = structuredClone(ivansEscape);
  missing.assets["ch01-walk-a"].src = "projects/ivans-escape/images/absent.png";
  await assert.rejects(() => validateAssets(missing), /missing asset/);
  for (const id of [
    "ch01-walk-a",
    "ch02-walk-b",
    "ch03-rear",
    "ch04-turn",
    "ch03-r-reflection",
    "ch04-r-reflection",
    "ch07-run",
  ]) {
    const asset = ivansEscape.assets[id];
    const { data, info } = await sharp(`public/${asset.src}`)
      .raw()
      .toBuffer({ resolveWithObject: true });
    assert.equal(info.width, 1200);
    assert.equal(info.height, 1800);
    assert.equal(info.channels, 4);
    let bottom = 0;
    for (let y = 0; y < info.height; y++)
      for (let x = 0; x < info.width; x++)
        if (data[(y * info.width + x) * 4 + 3] > 64) bottom = y;
    assert.ok(Math.abs(bottom - 1679) <= 2, `${id}: foot register ${bottom}`);
  }
  for (const font of [
    "SpaceGrotesk.ttf",
    "IBMPlexMono-Regular.ttf",
    "SpaceGrotesk-OFL.txt",
    "IBMPlexMono-OFL.txt",
  ])
    await access(`public/projects/ivans-escape/fonts/${font}`);
  const hash = async (path: string) =>
    createHash("sha256")
      .update(await readFile(path))
      .digest("hex");
  assert.equal(
    await hash("assets/Music/Ivan_Is_Loading.mp3"),
    await hash("public/projects/ivans-escape/audio/track.mp3"),
  );
  assert.equal(
    await hash("Ivan_ESCAPE_MASTER.md"),
    await hash("docs/projects/ivans-escape/IVANS_ESCAPE_MASTER.md"),
  );
  const city = filmShots[1];
  assert.ok(city.mode !== "image-plane-3d");
  assert.equal(sample(city.camera, 119).zoom, 1.25);
  const foot = filmShots[5].layers.find((l) => l.id === "foot")!;
  const pixels = await sharp(`public/${ivansEscape.assets[foot.assetId].src}`)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let toe = 0;
  for (let y = 0; y < pixels.info.height; y++)
    for (let x = 0; x < pixels.info.width; x++)
      if (pixels.data[(y * pixels.info.width + x) * 4 + 3] > 64)
        toe = Math.max(toe, x);
  const toeAt = (frame: number) =>
    foot.x +
    sample(foot.motion!, frame).x -
    foot.width * 0.5 +
    (toe / pixels.info.width) * foot.width;
  assert.ok(toeAt(0) < 1150, "Shoe must begin fully inside its path");
  assert.ok(
    toeAt(59) > 1320,
    "Toe must visibly cross the pavement line by frame509",
  );
  assert.equal(sample(foot.motion!, 59).y, 0, "Shoe lands after crossing");
  assert.ok(
    filmShots[5].layers.findIndex((l) => l.assetId === "path-boundary") <
      filmShots[5].layers.indexOf(foot),
    "Road paint must stay behind the shoe",
  );
  await validateAssets(ivansEscape);
  console.log(
    "Ivan production passed: 19 shots / 1800f; pilot 540f; all three modes; 54 illustrated road planes; exact 8-frame reflection delay; reused duplicate artwork; foot registers; spatial scrubbing; local licensed fonts; missing-asset failure; source/master hashes.",
  );
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
