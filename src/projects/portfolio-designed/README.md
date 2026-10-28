# SOBIVERSE / Curiosity, made tangible

The revised personal portfolio film for Souradip Biswas: 120 seconds, 1920×1080 at 60 fps, A Pale Blue Stillness, and six approved motion styles. Original typography, diagrams and print constructions replace the earlier screen-recording edit. The composition contains no video element. Only the native portrait and a clean LaunchSILO homepage still are loaded as image artwork; the remaining extracted source frames are reference evidence.

Preview: http://localhost:3024/#project/portfolio-designed

Delivery: out/portfolio-designed/Souradip-Biswas-Sobiverse.mp4

```powershell
npm.cmd ci
node scripts/sound-portfolio-designed.mjs
npm.cmd run portfolio:designed:build
npm.cmd run portfolio:designed:check
npm.cmd run portfolio:designed:preview
npm.cmd run portfolio:designed:render
```

The audio reproduction command reuses the recovered portfolio-film master and local effects; it needs those local assets and full FFmpeg. Python sound models are unnecessary for playback/export. Use master.wav once; it already includes the music and effects. Do not add a second music/SFX stem.

Sequence, authored identities and original work scenes live in sequence.mjs, identity-scenes.mjs and work-scenes.mjs. artwork.mjs samples complete scenes and the existing six-family transitions from the earlier isolated project. The build script copies local fonts/GSAP and bundles the composition. No central Remotion engine defaults were changed.

Local proofs can be regenerated with `node scripts/proof-portfolio-designed.mjs`: native browser samples every half second plus five frames around each cut, error capture, ANGLE renderer evidence and a backward-scrub equality check. The proof script inspects stills; HyperFrames performs the actual video rendering. Extra target times may follow the destination argument as a comma-separated list.

See [creative blueprint](project.md), [source facts and still provenance](docs/SOURCES.md), [review](REVIEW.md), [sound evidence](AUDIO.md) and [credits](CREDITS.md). Site and source-repository statements supply the owner's portfolio copy; this film does not independently certify employment, patent status or performance claims. No invented benchmarks were added.

The previous recording-based portfolio project remains under ../portfolio-film.
