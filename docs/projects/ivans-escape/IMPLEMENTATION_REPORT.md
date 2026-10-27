# Implementation and verification report

Date: 24 October 2026. Status: all 19 shots implemented; full film, pilot, contact sheets and 1080p master exported. The user's continuation request superseded the initial preproduction/pilot stop.

## Completed production

- Preserved the original master and soundtrack bytes. Picture remains the specified19-shot /1800-frame structural edit; pilot is exactly 540 frames.
- Reused ShotTimeline, rendering templates, LayeredArtwork, Camera2D, ParallaxScene, CharacterCel and Camera3DStage. Production-specific art direction, camera paths, authored SVG and memory cuts remain under src/projects/ivans-escape.
- Created20 necessary source images with built-in imagegen:6 environments,3 clean plates,9 matched Ivan poses/details,1 supporting figure and 1 foreground bollard. Preserved source images and exact prompts locally. No automatic image-generation service is invoked by preview/export.
- Prepared115 runtime image assets, including12 facade regions,54 perspective road tiles, four anonymous silhouettes, the exact rear-alpha outline and native SVG boundary/masks. All required active media is present; no placeholder or unrelated stock substitution is used.
- Bundled local Space Grotesk and IBM Plex Mono TTFs with OFL notices. Waited for fonts before capture.
- Implemented all narrative events: initialization; city push; synchronized routine; single-rotation clock; exact8-frame reflection delay; visible foot crossing and pavement fracture; duplicate; conflict; exposed wireframe; terminated road; independent second portrait; refusal; road fragmentation; reality fracture; actual-shot memory;3→18 Ivans; architectural collapse; exit; quiet outside/title/message.
- Corrected the foreground/reflection ordering after visual inspection, added contact shadows/foreground occlusion, removed commuter facial identity and corrected the fracture to the pavement. Final review copies derive from the corrected master.

## Small engine changes

ArtworkLayer adds optional depthMotion and rotation3D tracks because SH13 requires keyed road-plane depth and SH17 requires separately rotating image planes. A pure plane transform preserves the authored pivot in three dimensions. Validation checks finite/in-shot keys, 3D-only use and animated near/far bounds. Transparent plane order follows current depth.

ShotTimeline memoizes structural validation for unchanged project props instead of redoing every spatial sweep each frame. Root uses a project component registry for authored overlays; normal productions retain the standard renderer. No engine file imports an Ivan story, palette, asset or timing. No new npm dependency was installed.

## Verified results

| Check                                 | Result                                                                                                      |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| TypeScript and ESLint                 | Passed npm run lint                                                                                         |
| Generic self-check / asset validation | Passed npm test;16 invalid configurations rejected                                                          |
| Original planning/master/audio checks | Passed npm run check:ivans                                                                                  |
| Production timing/assets/event checks | Passed npm run check:ivans-production                                                                       |
| Composition registration              | 4 compositions resolved; film1800f, pilot540f, packet180f, preflight120f                                    |
| Local media/dimensions/alpha          | All registered assets exist and match metadata                                                              |
| Camera/crop bounds                    | Every frame of declared crop-safe layers validated                                                          |
| Reflection                            | Real turn398, reflected406; matched canonical views                                                         |
| Replacement reuse                     | Identical walking source/cels and initial camera layout in SH03/SH07                                        |
| Shoe crossing                         | Pixel-alpha toe bounds begin inside the path and end visibly beyond it by 509; road paint stays behind shoe |
| Spatial motion                        | Keyed depth/rotation, pivots and clipping tested; no independent timing loop                                |
| Reverse scrubbing                     | Nonmonotonic still renders across cuts and modes passed                                                     |
| Repeat determinism                    | PNG-identical frames405,1140,1490, plus revised539                                                          |
| StudioPreflight regression            | New frame 100 is pixel-identical to the original Phase0 frame 100                                           |
| Renderer errors                       | Zero browser errors in still and full-master captures                                                       |
| Encoded output                        | All frames decoded in all three deliverables; H.264 video, stereo AAC                                       |
| Black frames                          | Only deliberately authored898/899 in full film; none in pilot                                               |
| Source copies                         | Original MP3 and archived master hashes unchanged                                                           |

Rendering conditions: Windows, Node 22.14.0, npm 11.7.0, Remotion 4.0.538, headless Chrome, chromiumOptions.gl=angle, renderer port3100, concurrency2, H.264/yuv420p. Studio stays on port3000.

Upstream nonfatal warnings: Three.js 0.186.1 reports deprecated THREE.Clock inside the R3F dependency; Node tooling reports deprecated Three CommonJS import because the existing tools compile to CommonJS. Neither produced missing artwork or render errors. No stack substitution was made.

## Exports

| Output under out/ivans-escape | Measured picture          | Dimensions |
| ----------------------------- | ------------------------- | ---------- |
| IvansEscape-1080p.mp4         | 1800 frames,60.000s,30fps | 1920×1080  |
| IvansEscape-rough.mp4         | 1800 frames,60.000s,30fps | 960×540    |
| IvansEscape-pilot.mp4         | 540 frames,18.000s,30fps  | 960×540    |

One corrected full-resolution master was rendered. Reduced full/pilot files were then derived using Remotion's bundled FFmpeg, preserving the master edit/audio. Earlier low-resolution development captures are not the delivered review copies.

Pilot sheet samples1,4,7.5,10.5,13.5,16.5s. Story sheet includes every principal shot plus title/final-message panels. Machine evidence: out/ivans-escape/initial-still-results.json, composition-still-results.json, still-results.json, final-results.json and video-qa.json. Frame stills and an unchanged-engine regression image are retained.

## Exact stack

No production dependency changes: Remotion and all @remotion packages4.0.538; React/React DOM 19.2.3; TypeScript5.9.3; Three.js 0.186.1; React Three Fiber 9.8.2; Sharp 0.35.5. Existing package-lock.json is preserved. See docs/TECH_STACK.md for the complete approved dependency inventory.

## Remaining limits

Technical implementation and delivery are complete. Human artistic review remains: generated matched poses can have subtle anatomical/wardrobe variation, and the detailed photographic-painterly sources may need a more stylized redraw if that is the director's preferred finish. Source environment images are generally 1672×941, so processed overscan and 1080p output involve upsampling; this is not native high-resolution source artwork.

Exact vocal phrase onsets were not manually verified. The film uses supplied structural music windows and measured RMS rises for montage edits; it does not claim word-level synchronization. The measured extra source tail after 60s is zero at five-decimal RMS precision, so fixed picture playback excludes no measurable programme at that precision.

Some closely related backing/highlight layers are intentionally consolidated; optional ENV01 roof is omitted. All53 briefs resolve in ASSET_MANIFEST.md, with no required active asset missing. Optional camera roll and a full character rig were not added.

No publishing, cloud upload, new production, unrelated refactor or git commit was performed. The earlier preproduction report remains archived in production/PREPRODUCTION_REPORT.md.
