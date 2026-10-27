# Illustrated opening: production pass 02

Preserved: original sixty-second story, 40 cuts, 1800 frames at30fps, musical boundaries0/180/540/1260/1620/1800, title1722 and message1779, original song bytes, local fonts, engine/templates, legacy source artwork and movies. No packages added or upgraded.

## Concrete changes

- Six new original key illustrations: assigned place, awakening, sprint, world edge, reaching leap and peaceful outside hero. Four painted environment replacements: street, corridor, boundary and outside. Identity uses the existing Ivan model, not the reference characters. Source/provenance: IMAGE_PROMPTS.json and SOURCE_ART.json.
- 83 pass02 prepared assets (including registered architectural/floor masks and a contact shadow), merged after the existing manifest. Full compositions coexist with separate cels, foregrounds and genuine3D camera shots. Native image sizes are recorded; normalization to2560×1440 does not add source detail.
- Fifteen explicit12-frame scene transitions. Architecture wipes carry drawn streaks; the world fracture opens as a central slit; the outside transition uses a warm exposure bridge with one visible Ivan. The actual foreground-pier wipe at309 remains. Hard cuts retain their narrative role.
- Vocal typography paginates the14 existing phrases into short readable groups. Local Space Grotesk and IBM Plex Mono, ivory type, active crimson accents, outlined emphasis, margin rules and shot-specific safe positions. Existing machine-aligned word anchors remain unchanged; this is not human-verified syllable precision.
- Reframed truncated portrait shoulders outside the canvas. Repositioned the reaching cuff to enter from offscreen. Added figure contact shadows. Replaced overlapping copy rows with eighteen staggered figures grounded in perspective.
- Floor destruction uses54 registered painted regions beginning at the actual floor horizon. Their outward detachment preserves an intact central contact strip. It uses2D compositing to avoid the earlier incoherent triangular3D floor. True3D remains for C22 architecture peeling, C35 collapse and C37 opening to the outside.
- Memory shots now carry sampled layers, cels and camera values from the actual earlier shots. The negative-offset section preview exposed a nested Freeze problem; explicit local shot data removes that discrepancy. Section/master pixel comparisons cover all four memory shots.
- Centered title, short masked reveal and a restrained travelling fracture underline. Small centered final connection message.

## Six independent review compositions

| Composition | Time | Global frames |
|---|---|---|
| IvansEscape-S01 |00–10s|0–299|
| IvansEscape-S02 |10–20s|300–599|
| IvansEscape-S03 |20–30s|600–899|
| IvansEscape-S04 |30–40s|900–1199|
| IvansEscape-S05 |40–50s|1200–1499|
| IvansEscape-S06 |50–60s|1500–1799|

Each wraps the same production with its correct global clock/audio position; no reindexed creative shot list. Root.tsx only adds their project-local registration. The protected-file audit allows this registry change while retaining engine/template/archive checks. No engine behavior was changed.

## Review commands

`npm run dev` opens Studio. Full composition: http://localhost:3000/IvansEscape. Six sections are in the sidebar; replace the URL composition ID to open one directly.

`npm run compile:tools` then `node .cache/scripts/prepare-ivans-pass02.js` prepares the new local art. Compile again after generating a TypeScript manifest before running compiled tools. `npm run assets:ivans` prepares the preserved pass01 source set; pass02 overrides remain separate.

`npm test`, `npm run lint`, `npm run check:ivans-production` validate the current production. `node .cache/scripts/review-ivans-sections.js --clips` creates six640×360 review MP4s, selected PNGs and every-frame thumbnail sheets in out/ivans-escape/pass02. `--sections=5` limits a repair check to that section; `--reuse-clips` regenerates inspection evidence without encoding unchanged clips. Use reuse only when the relevant clip matches current source.

The review renderer uses ANGLE, one video worker, and a fresh Chromium before each clip. Reusing one browser with multiple workers caused three GPU-process crashes and a stalled fourth-section encode; it was stopped, then successfully rerun under the stated conditions. Do not treat generic renderer warnings as proof of success; RENDER_CHECKS.json records completed sections.

No new full-resolution full-film export. Existing old MP4s remain historical; the current film is the Studio composition and these six review clips.

## Limits

This remains selective cel animation and illustrated camera work. It does not have continuous in-between animation or a full character rig. Held key illustrations intentionally alternate with separated moving layers. Old hair/hem overlays were removed because retained base pixels could produce seams; larger articulation needs reconstructed backing artwork.

The portrait/hand/foot inserts retain their previous source design; new hero paintings strengthen the wide/medium/action rhythm. Final taste and tiny vocal timing adjustments remain human review items. Director scores in SECTION_REVIEW.md are subjective and do not establish equivalence to the reference.

Remotion still reports the existing patched Zod4.6.7 override instead of its expected4.5.4, and Three emits deprecation warnings. Versions were preserved; current compilation and actual ANGLE output are checked separately.

Clock/reference guidance consulted: [official Freeze documentation](https://www.remotion.dev/docs/freeze) and [Sequence documentation](https://www.remotion.dev/docs/sequence). Reference observations are local visual analysis, not claims derived from those API pages.
