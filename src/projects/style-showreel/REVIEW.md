# Showreel review

Creative choice: **One idea. Twenty ways to move.** All 20 master styles in the documented order, six beats per style, no voiceover. Alternative films considered were an impossible mechanism and a typography specimen; the material journey gives this brief broader visual range.

## Round 1 — style and composition

Inspected all 20 scene midpoints and commissioned a separate visual review from the HyperFrames review workflow. Findings: too many left-title/right-object layouts, a hologram that read as wireframe, glossy clay, a small pixel hero, a blueprint repeating the wireframe subject, and a generic closing checkmark. Changes: added centered, full-type, lower-title and reversed compositions; a filled iridescent surface; matte clay shading; a larger pixel coin; an exploded mechanical drawing; a Motion Studio monogram and a larger signature.

## Round 2 — seams, hierarchy and phone readability

Inspected 230 preview frames across scene starts/midpoints and cut strips, plus phone-sized sheets. Findings: city cropping, rays behind the comic label/caption, crowded wireframe/halftone headlines and a deco identifier crossing its frame. Changes: resized/repositioned the isometric world, reserved clean caption areas, reduced the two crowded headlines, protected the deco identifier and strengthened kinetic word-by-word motion. HyperFrames reported zero lint, runtime, layout, contrast or craft errors.

## Round 3 — complete moving draft

Rendered the complete 60-second 1080p/30fps draft, decoded it fully, and extracted/inspected 120 frames at half-second intervals. Findings: the pixel coin could intersect the platform, and the measured score was bass-heavy. Changes: tied the coin's jump to the sampled terrain height, gave the title more clearance, reduced bass/kick gain and brought the mallet line forward. Repeated flap changes now have matching accents. The revised PCM score measures -14.6 LUFS and -2.2 dBTP, with zero clipped samples. A backward seek from 59.983s to 1.5s visually matched the original particle frame; 12 of 6,220,800 color components differed, consistent with edge rasterization rather than accumulated simulation state.

## Round 4 — delivery verification

Completed the 1920×1080/60fps master: exactly 60.000 seconds, 3600 H.264 frames, 48 kHz stereo AAC, 46,024,342 bytes. FFmpeg decoded the entire file without errors, and the last frame was inspected. The encoded soundtrack measures -14.6 LUFS and -2.0 dBTP, with 0 clipped samples. earshot found the clear ~120 BPM pulse. Against 40 authored picture cues, 70% have an onset within one 60fps frame and 100% within 100 ms; median absolute offset 12 ms. These measurements do not establish perfect perceptual sync for every gesture. Gradual geometric wipes are detected at their visual midpoint, rather than at their authored start, so the separate cut-detector figure is not treated as frame-accurate cut timing.

The final source check reports zero errors; root tests and lint pass. HyperFrames emits 20 source-size warnings because the generated HTML embeds the time sampler in each self-contained scene. These are retained: artwork.mjs is the single authored source and build-showreel.mjs regenerates the scenes. No runtime/layout/contrast warnings are being hidden. The export used screenshot capture with hardware GPU; the runtime probe reported ANGLE on Intel Iris Xe. The editable preview remains available at http://localhost:3017/#project/style-showreel.

## Limits and retained choices

- The visual styles are authored graphic studies. Isometric depth, wireframe projection, holography and clay shading are computed in canvas; they are not a photorealistic 3D production. Glassmorphism is the most restrained scene; a richer refractive study would be the next craft improvement.
- Numeric audio measurements and model evidence were checked. Nobody performed a human listening test; subjective taste and speaker translation remain unverified.
- The sparse recorded-effects stem contains only keyboard and paper accents. Real SFX's standalone stem critique warns about its density and repeated families; that stem intentionally supplements the original music and 96 generated accents. Its pacing score is not a score of the complete soundtrack. Both source families remain consistent within their material/typing runs.
- The explicit style brief permits neon, particles, holographic color, glass, gradient mesh, primary-color Bauhaus shapes and art-deco ornament. They are the requested subjects, not generic decoration added to unrelated footage.
- Existing Ivan artwork, source music and final exports were preserved. This production shares only the local OFL fonts.

See CREDITS.md for the CC BY paper-turn attribution required when publishing. Source stems, authored cues, kit settings and the measured kit lock are retained with the editable project.
