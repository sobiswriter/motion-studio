# SOBIVERSE / A universe in motion

Current space-themed portfolio film: 120 seconds, 1920×1080 at 60 fps, **A Pale Blue Stillness**, six approved transition families, and fifteen direct portfolio assets. The website's native galaxy supplies the main artwork. Real portfolio frames become backgrounds and image planets, while the original profile cards turn in space. No moving screen-recording clips are embedded.

Preview: http://localhost:3026/#project/portfolio-space

Delivery: out/portfolio-space/Souradip-Biswas-Sobiverse-Space.mp4

```powershell
npm.cmd run portfolio:space:build
npm.cmd run portfolio:space:check
npm.cmd run portfolio:space:preview
npm.cmd run portfolio:space:render
```

`capture-source-images.mjs` reproduces the fifteen local source images from the recording, native portfolio files, website GalaxyEngine, and the previous clean LaunchSILO capture. See [source records](docs/SOURCES.md) and [image inventory](source-images.json) for exact paths, dimensions, crops, hashes, camera views and limitations. No stock/reference footage or cloud artwork is substituted.

The audio reproduction command is `node scripts/sound-portfolio-space.mjs`. It copies the recovered prepared soundtrack and licensed effects from the previous edition and measures the master using full FFmpeg. Use assets/audio/master.wav exactly once; it already includes the music and all forty effects. Python audio models are unnecessary for preview/export.

The source composition lives in sequence.mjs, space-identity.mjs, space-work-scenes.mjs, space-kit.mjs and space-transitions.mjs. Shared image treatment caches background softness and true alpha-feathered edges before reuse. All motion is sampled from integer frames; glyph apertures draw the incoming image directly and work on opaque production canvases. Scene overlap windows are explicit.

The existing proof helper accepts this project as its optional fourth argument:

```powershell
node scripts/proof-portfolio-designed.mjs .cache/portfolio-space/proof '' src/projects/portfolio-space
```

It captures half-second samples and cut-boundary frames, records browser errors/GPU evidence and checks backward-scrub determinism. HyperFrames performs actual video rendering. The separate transition checker covers finite geometry, context balance and exact endpoints; native pixel checks include both transparent and opaque Canvas modes.

See [blueprint/storyboard](project.md), [review evidence](REVIEW.md), [audio notes](AUDIO.md) and [credits](CREDITS.md). The original recording-based and paper-led editions remain separate under ../portfolio-film and ../portfolio-designed. No central Remotion engine defaults or dependency versions changed.
