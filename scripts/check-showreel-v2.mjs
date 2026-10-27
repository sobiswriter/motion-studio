import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { shots } from "../src/projects/style-showreel-v2/sequence.mjs";
import { insideM } from "../src/projects/style-showreel-v2/stage3d.mjs";
const root = "src/projects/style-showreel-v2";
const philosophy = await readFile(
  "Master Design Documentation/Design Philosophy.md",
  "utf8",
);
const names = [
  ...philosophy.matchAll(/^\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*/gm),
].map((m) => m[1]);
assert.deepEqual(
  shots.slice(1, -1).map((s) => s.name),
  names,
);
assert.equal(shots[0].frame, 0);
assert.equal(shots.at(-1).end, 60);
assert.equal(new Set(shots.map((s) => s.id)).size, 22);
for (const [i, s] of shots.entries()) {
  assert.ok(Number.isInteger(s.frame));
  assert.ok(s.end > s.start + 1.8);
  if (i) assert.equal(shots[i - 1].end, s.start);
  await access(`${root}/compositions/${s.id}.html`);
}
assert.equal(insideM(-1.3, 0), true);
assert.equal(insideM(0, 1.2), false);
assert.equal(insideM(3, 0), false);
const audio = JSON.parse(await readFile(`${root}/music-edit.json`, "utf8"));
assert.match(audio.source, /The_Golden_Hour_Rise\.mp3$/);
assert.equal(audio.duration, 60);
const mix = JSON.parse(await readFile(`${root}/sound-cues.json`, "utf8"));
assert.equal(mix.base_audio.length, 1);
assert.match(mix.base_audio[0], /music-edit\.wav$/);
assert.ok(mix.cues.length >= 40);
for (const c of mix.cues) {
  assert.ok(Number.isInteger(c.frame) && c.frame >= 0 && c.frame < 3600);
  assert.equal(c.t, c.frame / 60);
  assert.ok(c.gain_db <= 0);
  await access(c.file);
}
const index = await readFile(`${root}/index.html`, "utf8");
assert.match(index, /data-duration="60"/);
assert.match(index, /data-fps="60"/);
for (const f of [
  "assets/audio/master.wav",
  "assets/director.js",
  "assets/fonts/EBGaramond.ttf",
  "CREDITS.md",
])
  await access(`${root}/${f}`);
console.log(
  `Revision checks passed: all 20 required styles, intro/outro, 3600 frames, integer action cues, Golden Hour music only, ${mix.cues.length} sourced effects.`,
);
