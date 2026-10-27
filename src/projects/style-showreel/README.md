# Motion Studio / One idea. Twenty ways to move.

60 seconds, 1920×1080, 60 fps. All 20 styles from the master design philosophy appear in its original order, three seconds per style. The user approved landscape studio defaults, no voiceover, a blended soundtrack and autonomous completion.

Run from the repository root:

```powershell
npm run showreel:preview
npm run showreel:check
npm run showreel:render
```

The editable preview is at http://localhost:3017/#project/style-showreel. The master is written to `out/style-showreel/Motion-Studio-20-Styles.mp4`. Existing Ivan productions are separate.

`scenes.mjs` holds palettes, style names and copy. `artwork.mjs` draws deterministic material studies from timeline time. `scripts/build-showreel.mjs` writes the 20 editable sub-compositions and the main HyperFrames timeline; regenerate after editing those sources. Text stays in the DOM. Particle, isometric and other artwork stays in canvas. Frames can be sampled in either direction without simulation state. Each scene has a 0.3-second geometric reveal over the preceding scene's explicit tail.

The original 120 BPM score was sequenced from earshot's locally generated launch kit. `scripts/score-showreel.py` rebuilds its music and procedural-effects stems. Real SFX mixes the recorded effects from `recorded-cues.json` with those two stems:

```powershell
.cache/audio-venv/Scripts/python.exe scripts/score-showreel.py
npm.cmd run real-sfx -- mix src/projects/style-showreel/recorded-cues.json --out out/style-showreel/soundtrack.wav --target-lufs -14 --ceiling-db -1.5
Copy-Item out/style-showreel/soundtrack_mix.wav src/projects/style-showreel/assets/audio/score.wav
```

The final score uses that mixed file once; recorded effects are not added a second time during video export. See [CREDITS.md](CREDITS.md) for the CC BY paper-turn attribution that must accompany publication. The keyboard recording is CC0. The earshot sources are identified as generated, with the original kit settings and measured lock retained.

See [SPEC.md](SPEC.md) for the frame plan, [STORYLINES.md](STORYLINES.md) for the creative choice and [REVIEW.md](REVIEW.md) for review findings and verification. Canvas projection and shading are authored graphic approximations; the reel does not depend on a live physics simulation or external rendered artwork.
