# One idea. Twenty worlds.

60-second, 1920×1080, 60fps Motion Studio reel, following the approved reference-led storyboard. All 20 master styles are connected by an orange signal and the same authored movie camera. Soundtrack: the supplied The Golden Hour Rise, plus 55 effects placed through Real SFX.

- sequence.mjs: approved 22 slots, integer frame boundaries and handoff types.
- stage3d.mjs: deterministic camera/set geometry, dimensional materials, particles, liquid and hinged split-flap mechanism.
- artwork.mjs: original graphic/cel/print/sprite work, typography, player states, transitions and recap.
- project.md / REVIEW.md: direction, source-reference decisions and actual review evidence.
- sound-cues.json / music-edit.json / CREDITS.md: sound timing, provenance and required credits.

From the repository root:

```powershell
npm.cmd run twenty-worlds:build
npm.cmd run twenty-worlds:check
npm.cmd run twenty-worlds:preview
npm.cmd run twenty-worlds:render
```

The persistent Studio preview is http://localhost:3020/#project/twenty-worlds. Source edits rebuild assets/director.js through the existing esbuild installation. No new dependency is installed. Canvas/Three artwork is edited in source; individual drawn elements are not separate Studio objects.

To rebuild effects, run these from the repository root, then rebuild the visual bundle. The mix is one path; separate stems and reports remain in out/twenty-worlds. Rebuilding visuals preserves the finished audio master.

```powershell
node scripts/sound-twenty-worlds.mjs
npm.cmd run real-sfx -- mix src/projects/twenty-worlds/sound-cues.json --out out/twenty-worlds/soundtrack.wav --no-match-layer --target-lufs -14.5 --ceiling-db -1.5 --export-clips out/twenty-worlds/audio-clips
Copy-Item -LiteralPath out/twenty-worlds/soundtrack_mix.wav -Destination src/projects/twenty-worlds/assets/audio/master.wav
```

Review the export with `.cache/audio-venv/Scripts/python.exe scripts/review-twenty-worlds.py out/twenty-worlds/Motion-Studio-One-Idea-Twenty-Worlds.mp4 out/twenty-worlds/delivery-review`. This asserts format/runtime/frame count, saves half-second and native boundary sheets, and compares every decoded frame's pixels. HyperFrames' DOM motion warning cannot inspect the canvas artwork; see REVIEW.md for its evidence and the audio scoring limitation.

Final output: out/twenty-worlds/Motion-Studio-One-Idea-Twenty-Worlds.mp4. See CREDITS.md before distribution. Automated audio measurements do not establish a human audition or music reuse rights.
