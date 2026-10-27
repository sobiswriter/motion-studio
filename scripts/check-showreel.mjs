import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { scenes } from "../src/projects/style-showreel/scenes.mjs";

const project = "src/projects/style-showreel";
const philosophy = await readFile(
  "Master Design Documentation/Design Philosophy.md",
  "utf8",
);
const required = [
  ...philosophy.matchAll(/^\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*/gm),
].map((m) => m[1]);
assert.deepEqual(
  scenes.map((s) => s.name),
  required,
  "the reel must cover all 20 master styles in order",
);
const index = await readFile(`${project}/index.html`, "utf8");
assert.match(index, /data-duration="60"/);
assert.match(index, /data-fps="60"/);
const hosts = [
  ...index.matchAll(
    /data-composition-src="([^"]+)" data-start="([\d.]+)" data-duration="([\d.]+)"/g,
  ),
];
assert.equal(hosts.length, 20);
for (const [i, host] of hosts.entries()) {
  assert.equal(
    Number(host[2]),
    i * 3,
    "scene starts must remain on the six-beat grid",
  );
  assert.equal(
    Number(host[3]),
    i === 19 ? 3 : 3.3,
    "each reveal must retain its outgoing scene",
  );
  await access(`${project}/${host[1]}`);
}
for (const file of [
  "assets/audio/score.wav",
  "assets/gsap.min.js",
  "assets/fonts/SpaceGrotesk.ttf",
  "assets/fonts/IBMPlexMono-Regular.ttf",
  "CREDITS.md",
])
  await access(`${project}/${file}`);
const cues = JSON.parse(await readFile(`${project}/sound-cues.json`, "utf8"));
assert.ok(
  cues.length >= 60,
  "the sound design must include per-scene accents and material gestures",
);
assert.ok(
  cues.every(
    (c) => Number.isInteger(c.frame) && c.frame >= 0 && c.frame < 3600,
  ),
);
console.log(
  `Showreel checks passed: ${required.length} required styles, 3600 frames, declared overlaps, local assets, ${cues.length} procedural cues and source credits.`,
);
