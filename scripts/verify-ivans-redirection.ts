import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const root = "docs/projects/ivans-escape/redirection/pass01";
type Cut = {
  id: string;
  startFrame: number;
  endFrame: number;
  durationFrames: number;
  section: string;
  requiredAssetIds: string[];
  timingBasis: {
    kind: string;
    seconds?: number;
    rise?: number;
    vocalSynchronizationVerified?: boolean;
  };
  [key: string]: unknown;
};
type Asset = {
  id: string;
  category: string;
  priority: number;
  dependencies: string[];
};
const json = async (path: string) =>
  JSON.parse((await readFile(path, "utf8")).replace(/^\uFEFF/, ""));
async function main() {
  const plan = (await json(`${root}/EDITORIAL_MANIFEST.json`)) as {
    cuts: Cut[];
    sectionBoundaries: number[];
    durationInFrames: number;
    fps: number;
    artApproved: boolean;
  };
  const assets = (await json(`${root}/ASSET_MANIFEST.json`)).assets as Asset[];
  const pilot = (await json(`${root}/PILOT_LAYOUT.json`)) as {
    cuts: {
      id: string;
      startFrame: number;
      endFrame: number;
      implemented: boolean;
      camera: { frame: number; value: Record<string, number> }[];
      poseCues: { frame: number; variant: string }[];
      layers: {
        requirement: string;
        part: string;
        translationKeys?: { frame: number; x: number }[];
        globalSequence?: number[];
        fullCoverInterval?: number[];
      }[];
    }[];
  };
  const audit = (await json(`${root}/SOURCE_AUDIT.json`)) as {
    reference: { path: string; sha256: string; sampleTimesSeconds: number[] };
    protectedFiles: Record<string, string>;
  };
  assert.equal(plan.cuts.length, 40);
  assert.equal(plan.durationInFrames, 1800);
  assert.equal(plan.fps, 30);
  assert.equal(plan.artApproved, false);
  assert.deepEqual(plan.sectionBoundaries, [0, 180, 540, 1260, 1620, 1800]);
  assert.equal(new Set(plan.cuts.map((c) => c.id)).size, 40);
  assert.equal(new Set(assets.map((a) => a.id)).size, assets.length);
  const ids = new Map(assets.map((a) => [a.id, a]));
  const required = [
    "focalPoint",
    "pose",
    "layerSeparation",
    "cameraPath",
    "secondaryMotion",
    "transition",
    "narrativePurpose",
  ];
  for (const [i, cut] of plan.cuts.entries()) {
    assert.equal(cut.startFrame, i ? plan.cuts[i - 1].endFrame : 0);
    assert.ok(
      Number.isInteger(cut.startFrame) && Number.isInteger(cut.endFrame),
    );
    assert.equal(cut.durationFrames, cut.endFrame - cut.startFrame);
    assert.ok(cut.durationFrames >= 12);
    required.forEach((k) =>
      assert.ok(
        typeof cut[k] === "string" && (cut[k] as string).length > 5,
        `${cut.id}: missing ${k}`,
      ),
    );
    assert.ok(
      ["wide", "medium", "close-up", "insert"].includes(
        cut.composition as string,
      ),
      `${cut.id}: invalid framing`,
    );
    cut.requiredAssetIds.forEach((id) =>
      assert.ok(ids.has(id), `${cut.id}: missing asset brief ${id}`),
    );
    assert.notEqual(cut.timingBasis.vocalSynchronizationVerified, true);
  }
  assert.equal(plan.cuts.at(-1)!.endFrame, 1800);
  const sections = [
    [0, 180, "Intro", 5],
    [180, 540, "Verse", 8],
    [540, 1260, "Chorus", 16],
    [1260, 1620, "Instrumental", 8],
    [1620, 1800, "Outro", 3],
  ] as const;
  for (const [from, to, name, count] of sections) {
    const cuts = plan.cuts.filter((c) => c.section === name);
    assert.equal(cuts.length, count);
    assert.equal(cuts[0].startFrame, from);
    assert.equal(cuts.at(-1)!.endFrame, to);
  }
  assert.equal(plan.cuts[38].startFrame, 1722);
  assert.equal(plan.cuts[39].startFrame, 1779);
  const closure = new Set<string>();
  const visit = (id: string, stack: string[] = []) => {
    assert.ok(!stack.includes(id), `Asset dependency cycle: ${id}`);
    const asset = ids.get(id);
    assert.ok(asset, `Missing dependency ${id}`);
    closure.add(id);
    asset.dependencies.forEach((d) => visit(d, [...stack, id]));
  };
  assets.forEach((a) => visit(a.id));
  closure.clear();
  plan.cuts
    .filter((c) => c.endFrame <= 540)
    .forEach((c) => c.requiredAssetIds.forEach((id) => visit(id)));
  visit("AUDIO");
  assert.ok(
    [...closure].every((id) => ids.get(id)!.priority <= 1),
    "Pilot unexpectedly depends on later artwork",
  );
  assert.equal(pilot.cuts.length, 13);
  for (const [i, c] of pilot.cuts.entries()) {
    assert.equal(c.id, plan.cuts[i].id);
    assert.equal(c.startFrame, plan.cuts[i].startFrame);
    assert.equal(c.endFrame, plan.cuts[i].endFrame);
    assert.equal(c.implemented, false);
    let prev = -1;
    for (const key of c.camera) {
      assert.ok(
        Number.isInteger(key.frame) &&
          key.frame > prev &&
          key.frame < c.endFrame - c.startFrame,
      );
      prev = key.frame;
      for (const k of ["x", "y", "zoom", "pivotX", "pivotY"])
        assert.ok(Number.isFinite(key.value[k]));
      assert.ok(key.value.zoom > 0);
    }
    c.poseCues.forEach((k) =>
      assert.ok(
        Number.isInteger(k.frame) &&
          k.frame >= 0 &&
          k.frame < c.endFrame - c.startFrame,
      ),
    );
    c.layers.forEach((l) => assert.ok(ids.has(l.requirement)));
  }
  const lag = pilot.cuts[9].poseCues;
  assert.equal(
    lag.find((k) => k.variant === "LOOKBACK:turn")!.frame + 341,
    360,
  );
  assert.equal(
    lag.find((k) => k.variant === "REFLECTION:turn")!.frame + 341,
    368,
  );
  const wipe = pilot.cuts[7].layers.find(
    (l) => l.part === "persistent-pier-wipe",
  )!;
  assert.deepEqual(wipe.globalSequence, [297, 321]);
  assert.deepEqual(wipe.fullCoverInterval, [309, 310]);
  const cover = wipe.translationKeys!.find((k) => k.frame === 12)!.x;
  assert.ok(cover + 24 <= 0 && cover + 2376 >= 1920);
  const audio = (await json(
    "docs/projects/ivans-escape/AUDIO_ANALYSIS.json",
  )) as { rms: number[]; binSeconds: number };
  for (const cut of plan.cuts) {
    if (cut.timingBasis.seconds !== undefined) {
      const index = Math.round(cut.timingBasis.seconds / audio.binSeconds);
      assert.equal(Math.round(cut.timingBasis.seconds * 30), cut.startFrame);
      assert.ok(
        Math.abs(
          audio.rms[index] - audio.rms[index - 1] - cut.timingBasis.rise!,
        ) < 0.00002,
        `${cut.id}: RMS evidence mismatch`,
      );
    }
  }
  const hash = async (path: string) =>
    createHash("sha256")
      .update(await readFile(path))
      .digest("hex");
  for (const [path, expected] of Object.entries(audit.protectedFiles))
    assert.equal(
      await hash(path),
      expected,
      `Protected current production changed: ${path}`,
    );
  assert.equal(await hash(audit.reference.path), audit.reference.sha256);
  assert.equal(audit.reference.sampleTimesSeconds.length, 57);
  for (const file of [
    "README.md",
    "REFERENCE_ANALYSIS.md",
    "VISUAL_BIBLE.md",
    "EDITORIAL_SHOTLIST.md",
    "FIRST_18_SECONDS.md",
    "FIRST_06_SECONDS_BRIEFS.md",
    "ASSET_REQUIREMENTS.md",
    "LAYER_CAMERA_SPEC.md",
  ]) {
    const doc = await readFile(`${root}/${file}`, "utf8");
    assert.ok(doc.length > 500, file);
  }
  const result = {
    status: "planning-verified-not-rendered",
    shots: 40,
    internalCuts: 39,
    pilotShots: 13,
    pilotFrames: 540,
    filmFrames: 1800,
    sectionShotCounts: [5, 8, 16, 8, 3],
    artRequirementGroups: assets.length,
    pilotDependencyClosure: [...closure].sort(),
    referenceSamples: 57,
    sourceFilesUnchanged: Object.keys(audit.protectedFiles).length,
    referenceUnchanged: true,
    exactVocalSynchronizationVerified: false,
    newArtCreated: false,
    heroDemoCreated: false,
    newDependencies: false,
  };
  await writeFile(`${root}/VERIFICATION.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
