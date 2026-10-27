# Beyond the Frame

60 seconds, 1920×1080, 60 fps. Current revision of the twenty-style Motion Studio reel. The earlier project and MP4 remain intact.

- `sequence.mjs`: the 22 shots, including opening and closing; integer frame boundaries and palettes.
- `stage3d.mjs`: one shared Three.js renderer, physical materials, marching-cubes liquid, particle field and time-sampled geometry/cameras.
- `artwork.mjs`: authored print, type, terminal, comic, split-flap, VHS, pixel and full-frame handoff design.
- `SPEC.md`, `STORYBOARD.md`, `REVIEW.md`: direction, edit and recorded quality checks.
- `music-edit.json`, `music-boundaries.json`, `sound-cues.json`: source arrangement, measured attacks and 74 effects. The Golden Hour Rise is the only music bed. Ivan Is Loading is excluded.

From the repository root:

```powershell
npm.cmd run showreel:v2:build
npm.cmd run showreel:v2:check
npm.cmd run showreel:v2:preview
npm.cmd run showreel:v2:render
```

The persistent editable preview uses http://localhost:3018/#project/style-showreel-v2. Source changes belong in the three `.mjs` files, then run the build; composition HTML and assets/director.js are generated. The existing installed esbuild bundles the pinned Three.js dependency. No new package was installed.

To rebuild audio, run the following before rendering. The prepare step resets master.wav to the music-only edit; always complete the mix/copy steps afterward:

```powershell
node scripts/prepare-showreel-v2-audio.mjs
.cache/audio-venv/Scripts/python.exe scripts/render-showreel-v2-accents.py
node scripts/cue-showreel-v2.mjs
npm.cmd run real-sfx -- mix src/projects/style-showreel-v2/sound-cues.json --out out/showreel-v2/soundtrack.wav --target-lufs -14.5 --ceiling-db -1.5
Copy-Item -LiteralPath out/showreel-v2/soundtrack_mix.wav -Destination src/projects/style-showreel-v2/assets/audio/master.wav -Force
```

Final video: `out/showreel-v2/Motion-Studio-Beyond-the-Frame.mp4`. Separate effects stems, resolved cues and the mix report sit beside it. Read CREDITS.md before distribution, including the paper-turn attribution and the supplied music's unverified publishing rights.

Canvas illustrations and the shared WebGL stage are edited in source rather than as individual Studio objects. Timing is seek-derived; no physics simulation or wall clock runs during capture. HyperFrames audits canvas boxes rather than text inside the painted image, so the visual/phone review is necessary alongside its numeric checks.
