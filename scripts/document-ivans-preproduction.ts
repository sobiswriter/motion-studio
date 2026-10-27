import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import {
  artworkBriefs,
  codeGraphics,
  fontRequirements,
} from "../src/projects/ivans-escape/assets";
import { productionShots } from "../src/projects/ivans-escape/shots";
import type { summarizeAudio } from "../src/projects/ivans-escape/audio-analysis";

const root = "docs/projects/ivans-escape";
const time = (frame: number) => (frame / 30).toFixed(2);
const usage = (id: string, group: string) =>
  productionShots
    .filter((s) => s.assets.includes(id) || s.assets.includes(group))
    .map((s) => s.id)
    .join(", ") || "Design dependency / code support";

async function main() {
  assert.equal(productionShots.length, 19);
  const summary = JSON.parse(
    await readFile(`${root}/AUDIO_ANALYSIS.json`, "utf8"),
  ) as ReturnType<typeof summarizeAudio>;
  const shotTable = productionShots
    .map(
      (s) =>
        `| ${s.id} ${s.title} | [${s.startFrame}, ${s.startFrame + s.duration}) | ${time(s.startFrame)}–${time(s.startFrame + s.duration)}s | ${s.mode} | ${s.packet} |`,
    )
    .join("\n");
  await writeFile(
    `${root}/SHOTLIST.md`,
    `# Complete 19-shot production manifest\n\nAuthoritative creative source: IVANS_ESCAPE_MASTER.md. This is a briefed plan, not implemented film shots. All ends are exclusive. Main picture remains 1920×1080 / 30fps / [0,1800).\n\n| Shot | Frames | Time | Planned mode | Packet |\n|---|---|---|---|---|\n${shotTable}\n\nSection boundaries: Intro [0,180), Verse [180,540), Chorus [540,1260), Bridge [1260,1620), Outro [1620,1800). None changed to match guessed lyric lengths.\n\n${productionShots.map((s) => `## ${s.id} · ${s.title}\n\n- **Placement:** [${s.startFrame},${s.startFrame + s.duration}), ${s.duration} frames.\n- **Composition/focal action:** ${s.composition}\n- **Camera:** ${s.camera}\n- **Artwork families:** ${s.assets.join(", ") || "None; native code graphics."}\n- **Effects / pose cues:** ${s.effects}\n- **Transition out:** ${s.transitionOut}\n- **State:** briefed; not implemented; final artwork absent.\n`).join("\n")}\nThe first two shots have exact numerical camera/layer/transition plans in packets/P01_SHOTS_01_02.md. Camera wording for later packets is a production brief, not a claim that their keyframes are approved or implemented.\n`,
  );

  const table = artworkBriefs
    .map(
      (a) =>
        `| ${a.id} | ${a.width}×${a.height} | ${a.alpha ? "RGBA" : "opaque"} | ${a.status} | ${usage(a.id, a.group)} | ${a.filename} |`,
    )
    .join("\n");
  const missing = artworkBriefs.filter((a) => a.status === "missing-artwork");
  const optional = artworkBriefs.filter((a) => a.status === "optional-artwork");
  const coded = artworkBriefs.filter((a) => a.status === "planned-code");
  await writeFile(
    `${root}/ASSET_MANIFEST.md`,
    `# Asset requirements and availability\n\n## Supplied and review-only files\n\n- Supplied music: assets/Music/Ivan_Is_Loading.mp3, copied byte-for-byte to public/projects/ivans-escape/audio/track.mp3.\n- Supplied vocal notes: VOCAL_NOTES_SUPPLIED.txt, copied unchanged. They give section windows, not individual phrase onset times.\n- SH01 static native-SVG layout: public/projects/ivans-escape/references/sh01-layout.svg (1920×1080). Code layout only, not animated.\n- SH02 imagegen style-v01: public/projects/ivans-escape/references/sh02-city-style-v01.png (1672×941). Unapproved flattened reference; not final ENV01 layers.\n- No approved production illustration, character model, pose, matte or local font was supplied.\n\n## Required/derived inventory\n\n${missing.length} missing authored items; ${optional.length} optional artwork item; ${coded.length} planned code-derived matte/region items. Code-derived items do not require AI image generation. Final-art destinations below are relative to public/projects/ivans-escape/; model sheets are references. Runtime availableAssets contains only real existing files; missing items are not silently substituted.\n\n| ID | Source size | Coverage | Status | Shots/dependencies | Planned file |\n|---|---|---|---|---|---|\n${table}\n\n## Fonts\n\n${fontRequirements.map((f) => `- **${f.id}:** ${f.family} ${f.weight}; ${f.path}; ${f.status}; first needed ${f.packet}. ${f.license}`).join("\n")}\n\n## Code-native motion graphics, not missing illustrations\n\n| Shots | Elements | Method |\n|---|---|---|\n${codeGraphics.map(([shots, elements, method]) => `| ${shots} | ${elements} | ${method} |`).join("\n")}\n\nAll raster layers preserve registration, local storage and intended alpha. Do not flatten characters/reflections/labels into environments. Original illustrated textures remain on fragments. See ARTWORK_BRIEFS.md for every item's full requirements.\n`,
  );
  await writeFile(
    `${root}/MISSING_ASSETS.json`,
    JSON.stringify(
      {
        scope: "preproduction; final assets have not been created",
        missingArtwork: missing,
        optionalArtwork: optional,
        plannedCodeDerived: coded,
        missingFonts: fontRequirements,
      },
      null,
      2,
    ) + "\n",
  );
  await writeFile(
    `${root}/ARTWORK_BRIEFS.md`,
    `# Detailed per-asset artwork briefs\n\nEvery entry below is a requirement, not a claim of completion. No missing asset is filled by unrelated stock or placeholder scenery. Lighting/perspective/canvas instructions are proposals for artist approval consistent with the master. Only Packet 01 is next for review. Character model approval precedes pose production; no character illustration is needed for Shots 01–02.\n\n${artworkBriefs.map((a) => `## ${a.id} — ${a.status}\n\n- **Used by:** ${usage(a.id, a.group)}\n- **Destination / output:** ${a.filename}; ${a.width}×${a.height}; ${a.alpha ? "transparent RGBA PNG" : "opaque PNG"}; local source.\n- **Subject / environment:** ${a.subject}\n- **Camera viewpoint:** ${a.viewpoint}\n- **Composition:** ${a.composition}\n- **Lighting direction:** ${a.lighting}\n- **Perspective / vanishing point:** ${a.perspective}\n- **Palette:** ${a.palette}\n- **Exclude:** ${a.exclude}\n- **Layer separation / transparency:** ${a.separation}\n- **Anchor / registration:** ${a.pivot}\n- **Depth / parallax:** ${a.depth}\n- **Intended movement:** ${a.movement}\n`).join("\n")}\nNo production text is painted into an image. The film's title, warnings, grids, clock and reticles are authored in code. planned-code mask paths are specifications, not extra missing paintings; generate them only from approved geometry/source alpha.\n`,
  );

  const vocalSections = [
    ["Intro", 0, 180, ["Loading the world for Ivan"]],
    [
      "Verse",
      180,
      540,
      [
        "Daily routine is a script line",
        "Walking the block in a set time",
        "Glitched in the mesh I am awake now",
        "Breaking the loop and I break out",
      ],
    ],
    [
      "Chorus",
      540,
      1260,
      [
        "Duplicate taking my spot",
        "System is rigged it is flawed",
        "Escape from this code",
        "Over the edge on the road",
        "Another Ivan is there",
        "I do not care do not care",
        "Escape from the grid",
        "Breaking what they ever did",
      ],
    ],
    ["Instrumental / vocal chops", 1260, 1620, []],
    ["Outro", 1620, 1800, ["Goodbye to this fake world"]],
  ] as const;
  await writeFile(
    `${root}/AUDIO_CUES.md`,
    `# Supplied audio and cue confidence\n\n## Verified file facts\n\nOriginal: assets/Music/Ivan_Is_Loading.mp3. Runtime copy: public/projects/ivans-escape/audio/track.mp3. MP3 stereo, original 44.1kHz. SHA-256 BD039DC8B6D650C129D94627EA15D227EF579CA00F37927F3B788FB12622FCA4. Source has not been trimmed, stretched or regenerated.\n\nFFprobe duration: **60.630167s**. Official Remotion getAudioData decode at a fixed 48kHz: **${summary.durationSeconds.toFixed(7)}s**, ${summary.channels} channels. Picture remains exactly 60.000s / 1800 frames: the source is about **0.630s longer**. The review timeline starts original audio at 0 and stops with the composition, leaving its tail unheard; this is not an approved final audio edit. Tail-cut/fade or an explicitly approved alternative must be decided before final delivery.\n\n## Authoritative supplied section windows / unverified vocal onsets\n\n${vocalSections.map(([name, start, end, lyrics]) => `### ${name}: [${start},${end}) / ${time(start)}–${time(end)}s\n\n${lyrics.length ? lyrics.map((lyric) => `- “${lyric}” — supplied lyric; exact phrase onset/end NOT independently verified.`).join("\n") : "- Instrumental/vocal-chop description is supplied; individual chopped-voice timings are not verified."}\n`).join("\n")}\nDo not distribute lyric lines uniformly into three-second blocks. Supplied section boundaries are the approved edit structure, not acoustically verified section-change measurements. No speech-recognition model or cloud transcription service was used.\n\n## Measured waveform and transient candidates\n\nMeasured via official @remotion/media-utils getAudioData in a local Remotion browser; stereo RMS pooled over 20ms bins. ${summary.rms.length} bins cover the entire decoded source. [Waveform](references/audio-rms.svg) and raw measurements in AUDIO_ANALYSIS.json. Largest positive energy rises were selected with >=180ms separation; these are **candidates**, not confirmed drum hits, downbeats or vocal starts. A strong consonant can look like a transient.\n\n| Source time | Nearest frame @30 | RMS rise | Confidence |\n|---|---|---|---|\n${summary.transientCandidates.map((c) => `| ${c.seconds.toFixed(2)}s | ${c.frame} | ${c.rise.toFixed(5)} | Measured energy rise; semantic identity unverified |`).join("\n")}\n\n## Packet 01 synchronization proposals\n\n- Frame 60 city cut remains locked even though the strongest nearby measured rise is at 1.88s / frame 56. Do not slide the approved cut automatically.\n- The 0.96s / frame 29 rise is a listening target for a controlled initialization-text step. The 1.88s / frame 56 rise is a candidate for the last tracking-line accent; geometry is still complete at 59.\n- Within SH02, measured rises at 2.42s / 73, 2.98s / 89, 3.52s / 106 and 4.08s / 122 are listening targets only. Camera endpoints remain global 60 and 179. Reticle/text do not bounce to every transient.\n- Four SH15 fragments remain 23/22/23/22 frames as a rounding-safe provisional split. Their final micro-cuts require listening within fixed [1260,1350); no rearrangement of memory order.\n\nReview by listening in Studio. No exact vocal onset is claimed from RMS. Regenerate measurements, not music, with npm run inspect:ivans-audio.\n`,
  );
  console.log(
    `Documented ${productionShots.length} shots and ${artworkBriefs.length} detailed asset/derived-item briefs. Missing authored items: ${missing.length}; optional: ${optional.length}; code-derived: ${coded.length}.`,
  );
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
