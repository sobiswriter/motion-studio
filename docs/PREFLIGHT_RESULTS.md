# Phase 0 preflight results

Verified on 24 October 2026 in motion-studio, Windows x64, Node 22.14.0 LTS, npm 11.7.0. This is a technical fixture only. No film, identity, narrative or real production was created.

## Verified results

| Check                        | Result / evidence                                                                                                                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Official scaffold and skills | Pass. create-video 4.0.538; official remotion-best-practices installed locally with skills-lock.json.                                                                                                                                                            |
| TypeScript / lint            | Pass. npm run typecheck and npm run lint; zero errors/warnings after a targeted lint explanation for timeline data.                                                                                                                                              |
| Project/shot validation      | Pass. npm test: 13 malformed configurations rejected, plus positive assertions for sampling, masks, cels, parallax, cues, settings and actual file errors.                                                                                                       |
| Registration                 | Pass. Renderer composition IDs match the independent project registry. StudioPreflight is 1920×1080, 30 fps, 120 frames.                                                                                                                                         |
| Independent metadata         | Pass. Changed input props to 720×1280 at 24 fps; renderer metadata matched, and a quarter-scale still measured 180×320. No engine edits.                                                                                                                         |
| Flat mode                    | Pass. Background PNG, masked RGBA subject, foreground, zoom, moving title and SVG path reveal at frames 0 and 20.                                                                                                                                                |
| Multiplane mode              | Pass. Four image layers, different parallax factors, camera translation, independent subject motion and foreground occlusion. Pose A at frame 40 changes to B at 60.                                                                                             |
| Image-plane mode             | Pass. Four textures on planes at distinct depths, perspective camera motion, transparency and a 2D title above ThreeCanvas. No visible modeling primitives.                                                                                                      |
| Transition timing            | Pass. Cut at 40; incoming wipe at 80..87 over the declared outgoing tail. Total remains 120 picture frames. Frame 80 intentionally still shows the outgoing shot.                                                                                                |
| Alpha/order                  | Pass. Transparent subject/foreground preserve alpha; source metadata checked and contact sheet visually inspected.                                                                                                                                               |
| Determinism                  | Pass. Captured stills in order 119,100,80,60,40,20,0,100. Repeated frame 100 PNGs are byte-identical.                                                                                                                                                            |
| Backward Studio scrubbing    | Pass. Visited frame 100, scrubbed backward to 60 then 40 and visually confirmed the earlier pose was restored.                                                                                                                                                   |
| Asset errors                 | Pass. Missing references, missing files, changed dimensions and expected alpha produce clear errors. Non-local/traversing paths fail.                                                                                                                            |
| Desktop WebGL                | Pass. Explicit angle in CLI config and rendering API; actual textures inspected and no browser errors recorded.                                                                                                                                                  |
| MP4                          | Pass. out/StudioPreflight.mp4: H.264, 1920×1080, 30/1 fps, exactly 120 decoded picture frames, 4.000-second video, AAC 48 kHz audio.                                                                                                                             |
| All video frames             | Pass. Decoded all 120 frames to 160×90 PNGs with Remotion's FFmpeg. No black frames; minimum RGB mean 68.88/255. After the wipe every 3D frame's artwork-region standard deviation is >=34.41, above the missing-artwork threshold of 15. See out/video-qa.json. |
| Contact sheet                | Pass. out/contact-sheet.png contains 0,20,40,60,80,100,119 in order with labels. Sampled PNGs are in out/frames/.                                                                                                                                                |
| Audit/lock                   | Pass. npm audit: zero vulnerabilities after patching existing transitive Zod through a pinned override. All Remotion versions match 4.0.538.                                                                                                                     |
| Isolation                    | Pass. Engine/templates do not import project modules; assets/colors/timings are supplied as production data.                                                                                                                                                     |

## Rendering conditions and resolved failures

A targeted mutation check disabled the compiled timeline gap/overlap guard: the self-check failed with the expected missing-exception assertion. The compiled file was restored immediately; source and final render artifacts were unchanged.

Remotion's downloaded Chrome Headless Shell used ANGLE, two concurrent render tabs and port 3100 while Studio ran on 3000. No alternate renderer or backend was substituted. All test artwork/masks were generated locally with Sharp; the calibration WAV is also local.

The first API registration attempt reached Studio's startup page due to a local port collision; a separate Remotion-managed render port resolved it. Initial still exports also found a ThreeCanvas synchronization defect: asynchronous texture state arrived after the export frame was drawn. Live preview showed the scene, but fresh stills were empty apart from the overlay. The shared loader was replaced with R3F useLoader/Suspense, which ThreeCanvas waits for. A pixel-variation regression check now rejects missing 3D artwork. Small stills passed before the corrected MP4 was exported; the earlier artifact was replaced.

Bundled FFmpeg lacks generic null/rawvideo output used by some QA commands, so verification used supported PNG decoding. FFprobe verified codec, size, frame rate, duration and count; see out/video-metadata.json. AAC padding makes audio/container duration about 4.011 seconds; picture duration is exactly 120 frames / 4.000 seconds.

## Remaining limits

- Crop-safe validation handles unrotated 2D plates. Perspective framing, transparent holes, rotated art and text bounds need artist review. This fixture's sampled images show no unintended clipping; foreground occlusion is deliberate.
- 3D planes accept still textures and grayscale image masks. Videos, camera-follow layers and geometric per-layer masks use 2D modes. Whole-shot geometric transitions work around 3D.
- R3F emits an upstream Three.Clock deprecation warning with Three.js 0.186.1. No engine useFrame timing is involved; rendering passes. Review during a future compatible dependency update.
- Studio may show "Can't save default props" for programmatic registrations. Preview/input props/scrubbing work; save changes in typed project files. Custom source-writeback/editor work is outside scope.
- Manual AudioCueMap data is tested. Automatic beat detection, time stretching and production audio analysis are absent; official helpers are available for explicit later requirements.
- Orthographic cameras, circle reveals and optional source-video paths are implemented but were not separately rendered as creative demos or tested across every codec/GPU. No long-form export, other OS/GPU or production artwork was tested.

No asset issue or technical blocker requires a human decision for Phase 0. The next production needs creative direction, supplied artwork and shot specifications. Stop onboarding here.

## Commands

```sh
npm ci
npm run dev
npm test
npm run lint
npm run validate
npm run preflight:stills
npm run preflight
```

Use npm run assets:demo only to regenerate calibration assets. Preflight writes a 1080p MP4; do not repeat it for documentation-only edits. For another production follow ADD_NEW_PROJECT.md and use `npm run export -- CompositionId out/CompositionId.mp4 --gl=angle --concurrency=2`.
