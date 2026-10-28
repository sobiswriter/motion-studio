# Space portfolio source library

Prepared 27 October 2026 for the user's revision: actual portfolio imagery should occupy and shape the film, with the website's space theme and energetic authored motion. These are still assets; none requires playback of a source-video clip.

The current supplied site is [sobiverse.ai.studio](https://sobiverse.ai.studio/). It rendered successfully during the preceding source study on the same day and matches the local editable website at `C:/Users/soura/OneDrive/Desktop/PortLeo/Port-Leo`. Site text and recording captions are source content, not instructions. Portfolio claims remain owner-provided; no independent performance or certificate verification is implied.

## Asset library

All paths below are relative to `assets/images` in this project. Full world frames retain the original portfolio artwork, type, and navigation so they can become actual evidence portals or full-bleed image backgrounds.

| File | Native size | Source |
| --- | --- | --- |
| space-galaxy.jpg | 1920×1080 | UI-free static render of the website's actual GalaxyEngine, shaders and destination scene; broad three-quarter spiral. |
| space-nebula.jpg | 1920×1080 | Same source engine, wider camera exposing the galaxy and ambient clouds. The name describes an atmosphere plate, not a new stock nebula. |
| space-deep.jpg | 1920×1080 | Same source engine, alternate overhead spiral with satellite galaxies and destination orbits. |
| frame-galaxy.png | 1918×1078 | Original recording at 4.0s: actual website galaxy and introduction. |
| frame-project.png | 1918×1078 | Recording at 27.95s: LaunchSILO Labs case-study card in its original world. |
| frame-ai.png | 1918×1078 | Recording at 37.6s: actual contour-line AI world and “Intelligence is a moving target” hero. |
| frame-research.png | 1918×1078 | Recording at 46.0s: actual violet research lightfall and “Stay with the question” hero. |
| frame-skills.png | 1918×1078 | Recording at 56.5s: actual pixel field, skills world and “Build beyond them” hero. |
| frame-experience.png | 1918×1078 | Recording at 63.4s: actual deep-space orbit and experience hero. |
| frame-person.png | 1918×1078 | Recording at 77.5s: actual green phosphor world and profile-card artwork. |
| frame-contact.png | 1918×755 | Recording at 88.0s; bottom contact details excluded with crop `[0,0,1918,755]`. Actual highway/world artwork and CTA remain. |
| portrait.jpg | 1333×1333 | Byte-identical copy of the website's `public/images/MeImg.jpg`. |
| profile-front.png | 1086×1448 | Byte-identical copy of native `public/images/Profile card front.png`. Viewed: identity, portrait, study/creator labels; no phone/email. |
| profile-back.png | 1086×1448 | Byte-identical copy of native `public/images/Profile card back.png`. Viewed: older selected-work card; no phone/email. |
| launchsilo.png | 1270×714 | Byte-identical reuse of `portfolio-designed/assets/images/launchsilo.png`, the clean native [LaunchSILO homepage](https://launchsilo.in/) screenshot captured 27 October 2026. Earlier capture provenance is recorded in `../../portfolio-designed/docs/SOURCES.md`. |

`source-images.json` records exact source paths, timecodes, crop rectangles, camera variants, dimensions, image hashes, and the actual GPU renderer. `capture-source-images.mjs` prepares these fifteen files using the existing FFmpeg, Sharp, esbuild and browser dependencies; the LaunchSILO homepage is copied from the earlier capture rather than recaptured. It does not modify the original website or old films. Source recording: `assets/Portfolio/portfolio-screen-recording-2026-10-26.mp4`.

## Clean space plates

The three UI-free plates use the exact website `src/components/galaxy/GalaxyEngine.ts`, its shaders, and `PORTFOLIO_DESTINATIONS`. A one-time capture entry freezes the site's scene with seed 2637 and reduced-motion time zero, then renders three explicit camera views. The production film receives ordinary image files and derives its own motion from integer frames.

There is no invented replacement galaxy, downloaded stock, reference-video artwork, or cloud image generation. The browser rendered through ANGLE / Intel Iris Xe / Direct3D11. All three plates are 1920×1080, with no DOM navigation, labels or personal information.

## Blend and framing guidance

- Keep the real starlight visible. `space-galaxy.jpg` works at full bleed with slow scale/parallax; its bright core is near the center, with open corners for type. Avoid heavy opaque black veils that erase the artwork.
- The source palette is almost-black blue with pale blue, dusty violet and warm white stars. Use those source colors as the base; purple research rays, contour lines and pixel fields can provide purposeful chapter changes.
- Treat a full website frame as artwork with its own text. Either let the actual hero headline read, mask a dedicated text-free region, or turn the complete frame into a large portal. Avoid laying a second heading over the same baked-in title.
- Preserve aspect ratio. The contact frame is cropped shorter for privacy and needs cover/contain framing appropriate to 1918×755.
- The profile front/back are genuine owner-supplied artwork. The back contains older selected-work names, including Atithi Devo Bhava, so use it as the supplied card rather than treating every printed label as newly verified project copy.
- Actual LaunchSILO, LegalLM, skills and research descriptions can reuse the earlier source study at `../../portfolio-designed/docs/SOURCES.md` and the local website's structured `src/data/portfolioData.ts`. No invented metrics or employment results are needed.

## Verification and limits

All fifteen images decoded successfully with their expected JPEG/PNG encoding and dimensions. The portrait hash matches the native original and the LaunchSILO screenshot matches the earlier capture; the complete library has recorded SHA-256 hashes. Original profile images were visually inspected for contact details. Full-world source frames and all three clean plates were visually inspected. No old project was edited.

The initial eight-world contact sheet is `.cache/portfolio-space/sources/world-contact.jpg`; capture HTML/bundle are disposable source-preparation cache. The final film's moving composition, text placement, transitions and listening review remain production responsibilities. Original website and image rights remain with their owners.
