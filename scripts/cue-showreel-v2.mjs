import { copyFile, mkdir, writeFile, readFile } from "node:fs/promises";
import { shots } from "../src/projects/style-showreel-v2/sequence.mjs";
const project = "src/projects/style-showreel-v2",
  effects = `${project}/assets/audio/effects`;
await mkdir(effects, { recursive: true });
const files = [
  "whoosh-short_1.wav",
  "whoosh-short_2.wav",
  "whoosh-short_3.wav",
  "whoosh-long_1.wav",
  "land-light_1.wav",
  "land-light_2.wav",
  "hit_1.wav",
  "pop_1.wav",
  "pop_2.wav",
  "tock_1.wav",
  "tock_2.wav",
  "tock_3.wav",
  "bell_E5.wav",
  ...Array.from({ length: 7 }, (_, i) => `key_${i + 1}.wav`),
];
for (const file of files)
  await copyFile(
    `src/projects/style-showreel/assets/audio/kit/${file}`,
    `${effects}/${file}`,
  );
for (const [from, to] of [
  ["sfx_001.mp3", "keyboard.mp3"],
  ["sfx_002.mp3", "paper.mp3"],
  ["sfx_003.mp3", "wood.mp3"],
])
  await copyFile(`assets/sfx/.media/audio/sfx/${from}`, `${effects}/${to}`);
await copyFile(
  "src/projects/style-showreel/assets/audio/kit/kit.lock.json",
  `${effects}/source-kit.lock.json`,
);
const cues = [];
const material = {
  particles: ["particle-breath", "whoosh"],
  liquid: ["liquid-bubble", "water"],
  hologram: ["holo-shimmer", "glass"],
  neon: ["neon-chirp", "glitch"],
  wire: ["wire-latch", "camera"],
  glass: ["glass-touch", "glass"],
  kinetic: ["type-flick", "whoosh"],
  clay: ["clay-contact", "foley"],
  ascii: ["ascii-data", "glitch"],
  mesh: ["mesh-swell", "whoosh"],
  flap: ["flap-curtain", "camera"],
  vhs: ["tape-burst", "glitch"],
  bauhaus: ["shape-swish", "whoosh"],
  pixel: ["pixel-rise", "coin"],
  blueprint: ["aperture-servo", "riser"],
  deco: ["deco-shimmer", "glass"],
  brutal: ["block-punch", "hit"],
  outro: ["signature-swell", "whoosh"],
};
function cue(t, label, file, role, gain = -10, extra = {}) {
  const frame = Math.round(t * 60);
  cues.push({
    t: frame / 60,
    frame,
    label,
    file: `${effects}/${file}`,
    role,
    gain_db: gain,
    anchor: "start",
    ...extra,
  });
}
for (const [i, s] of shots.slice(1).entries()) {
  if (s.transition === "fold")
    cue(s.start, `${s.id} / paper handoff`, "paper.mp3", "paper", -8, {
      slice: [0, 0.55],
      max_dur: 0.55,
      highpass: 180,
    });
  else {
    const [file, role] = material[s.id];
    cue(s.start, `${s.id} / ${s.transition} handoff`, `${file}.wav`, role, -7, {
      anchor: "peak",
      max_dur: 1.5,
    });
  }
}
cue(0.8, "Opening / camera sweep", "whoosh-long_1.wav", "whoosh", -13, {
  anchor: "peak",
  max_dur: 1.2,
});
cue(1.25, "BEYOND / title lands", "land-light_1.wav", "hit", -10);
cue(3.32, "THE FRAME / title lands", "land-light_2.wav", "hit", -10);
for (const s of shots) {
  if (s.id === "glass")
    cue(s.start + 0.5, "Glass / pane settles", "tock_1.wav", "glass", -10);
  if (s.id === "kinetic")
    for (const [i, t] of [0.4, 0.86, 1.33].entries())
      cue(s.start + t, `Type / word ${i + 1}`, "land-light_1.wav", "hit", -12);
  if (s.id === "iso")
    for (let i = 0; i < 4; i++)
      cue(
        s.start + 0.45 * (i + 1),
        "City / path contact",
        "pop_1.wav",
        "click",
        -8,
      );
  if (s.id === "clay")
    for (const t of [0.766, 1.532])
      cue(s.start + t, "Clay / floor contact", "wood.mp3", "thump", -9, {
        slice: [0, 0.45],
        fade_in: 0.002,
        fade_out: 0.04,
        highpass: 150,
      });
  if (s.id === "ascii")
    for (let i = 0; i < 7; i++)
      cue(
        s.start + 0.05 + i * 0.09,
        "ASCII / characters compile",
        i === 0 ? "keyboard.mp3" : `key_${i + 1}.wav`,
        "typing",
        -7,
        i === 0 ? { slice: [0, 0.14], max_dur: 0.14 } : { max_dur: 0.14 },
      );
  if (s.id === "comic")
    cue(s.start + 0.32, "Comic / burst punches", "hit_1.wav", "hit", -9);
  if (s.id === "flap")
    for (let i = 0; i < 11; i++)
      cue(
        s.start + 0.02 + i * 0.065,
        "Split flap / mechanical plate",
        `tock_${(i % 3) + 1}.wav`,
        "click",
        -7,
        { max_dur: 0.08 },
      );
  if (s.id === "bauhaus")
    for (const t of [0.12, 0.3, 0.48, 0.67])
      cue(s.start + t, "Bauhaus / shape lands", "wood.mp3", "click", -7, {
        slice: [0, 0.4],
        highpass: 200,
        max_dur: 0.2,
      });
  if (s.id === "pixel")
    for (const t of [1.067, 1.89])
      cue(s.start + t, "Pixel / coin pickup", "pop_2.wav", "coin", -8, {
        max_dur: 0.3,
      });
  if (s.id === "blueprint")
    cue(
      s.start + 0.9,
      "Blueprint / aperture opens",
      "tock_2.wav",
      "click",
      -11,
    );
  if (s.id === "brutal")
    for (const t of [0.12, 0.45, 0.78])
      cue(s.start + t, "Brutal / block slam", "hit_1.wav", "hit", -13, {
        max_dur: 0.35,
      });
  if (s.id === "outro") {
    for (let i = 0; i < 8; i++)
      cue(
        s.start + 0.35 + i * 0.22,
        "Closing / chrome fragments",
        `tock_${(i % 3) + 1}.wav`,
        "click",
        -7,
        { max_dur: 0.12 },
      );
    cue(
      s.start + 2.35,
      "Closing / monogram seals",
      "land-light_2.wav",
      "hit",
      -10,
    );
    cue(
      s.start + 2.35,
      "Closing / signature shimmer",
      "bell_E5.wav",
      "glass",
      -17,
      { max_dur: 1.5 },
    );
    cue(
      s.start + 2.9,
      "Closing / name settles",
      "land-light_1.wav",
      "hit",
      -14,
    );
  }
}
cues.sort((a, b) => a.frame - b.frame);
await writeFile(
  `${project}/sound-cues.json`,
  JSON.stringify(
    {
      duration: 60,
      keep_audio: false,
      music_ref: `${project}/assets/audio/music-edit.wav`,
      base_audio: [`${project}/assets/audio/music-edit.wav`],
      cues,
    },
    null,
    2,
  ),
);
await writeFile(
  `${project}/visual-cues.json`,
  JSON.stringify(
    { fps: 60, cues: cues.map((c) => ({ frame: c.frame, label: c.label })) },
    null,
    2,
  ),
);
const meta = JSON.parse(
  await readFile("assets/sfx/.media/manifest.jsonl", "utf8").then(
    (s) => "[" + s.trim().split("\n").join(",") + "]",
  ),
);
await writeFile(
  `${project}/audio-provenance.json`,
  JSON.stringify(
    {
      music:
        "User-supplied The_Golden_Hour_Rise.mp3; arrangement in music-edit.json. No new music generated.",
      recordings: meta.filter((x) =>
        ["sfx_001", "sfx_002", "sfx_003"].includes(x.id),
      ),
      generated:
        "Selected effect files reused from the earshot 0.4.0 launch kit, plus 18 newly rendered material accents. source-kit.lock.json and material-accents.json preserve recipes, seeds and measurements.",
    },
    null,
    2,
  ),
);
console.log(
  `Prepared ${cues.length} deliberate effects over the supplied music, with source provenance.`,
);
