# Beyond the Frame — revision review

The user rejected the first cut's generated music, specimen layout, weak style craft and lack of opening/closing. This revision is a separate production. It uses the newly supplied **The Golden Hour Rise** as the sole music bed; Ivan Is Loading is excluded. The chosen film is a studio M passing through materials and graphic worlds, framed by a macro opening and a fragment-to-signature ending. Other concepts are retained in STORYLINES.md.

## Round 1 — material and image checks

Captured every scene midpoint. Found washed-out diffuse materials, faint particles, font loading that depended on incidental browser loading, and an unsettled split-flap result. Changes: explicit font readiness before canvas drawing, lower light/exposure, stronger particles, rounded/bumped matte clay with a floor shadow, and earlier mechanical character settling. The shared stage uses real Three.js geometry and physical materials rather than the previous projected 2D approximations.

## Round 2 — independent composition review

A fresh visual reviewer inspected the storyboard and all midpoint sheets. Its main finding was that repeated numbers and category labels still made a specimen. Removed them from the film. The liquid and holographic shots now retain the M silhouette; neon fills/crops the left edge, the mechanism gets a closer perspective, halftone dots are larger, the pixel actor is 40% larger against darker buildings, and the closing uses visible chrome fragments converging into the mark. Also fixed an isometric material-selection pattern that assigned every building the same pale material.

## Round 3 — complete motion and seams

Rendered the complete 60-second 1080p30 draft and decoded it successfully. Extracted and inspected all 120 exact half-second samples. Captured 44 scene beat images and 42 five-frame seam strips; inspected their six aggregate seam sheets and phone sheets. Found a faceted liquid interpolation and small uncovered wedges during rotated paper handoffs. Replaced the liquid with a 56³ marching-cubes surface driven by 32 metaballs and inspected twelve new samples through its whole morph. Added overscan during paper turns, removed a distracting inverted color bar from the opening, improved title separation, and gave the comic rays their own motion.

Sound review found quiet keyboard slices and too many identical transition sweeps. The final cue plan uses a clean recorded keyboard attack plus varied key takes, three mechanical contact takes, the recorded paper/wood families, and eighteen material-specific earshot accents. Real SFX mixes the 74 authored cues once over the supplied music. Its measured mix is -14.5 LUFS, -2.3 dBTP. The wood knock matched at z +3.7; the suggested 11 ms trim cut its attack, so the selected slice starts at the file beginning and retains its decay.

## Round 4 — source and delivery checks

Root lint, tests and asset validation pass. The revision self-check proves all 20 master styles in order, intro/outro, integer frame timing, local assets, valid cue frames and Golden Hour as the only music stem. The final HyperFrames check passes with zero errors. Its 3 retained warnings are described below. A 5.5s → 59.983s → 5.5s seek comparison produced identical pixels: 0 differing components out of 6,220,800.

Final export metadata, full decode, decoded image samples and encoded-audio measurements are recorded alongside the MP4 in out/showreel-v2/MASTER_QA.json. The persistent editable preview runs at http://localhost:3018/#project/style-showreel-v2.

Delivery verified: exactly 60.000 seconds and 3600 H.264 frames at 1920×1080/60 fps; 48 kHz stereo AAC; 65,187,406 bytes. The entire final file decodes without errors. All 120 half-second final-frame samples and the full-size last frame were inspected. Encoded audio measures -14.5 LUFS, -2.6 dBTP, LRA 8.2 LU and zero clipped samples. Decoded audio correlates 0.999362 with the intended mixed master and 0.996947 with the supplied music bed, confirming the intended soundtrack reached the MP4. The export used hardware-GPU drawElement capture.

## What the checks do and do not establish

- HyperFrames reports a GPU shader constant-precision warning from the physical-material/environment compilation. It produces no runtime error or observed image defect and was retained.
- Its DOM craft detector reports “dead stretches” over the opening camera move and closing assembly because the animated pixels live inside canvases. Those windows visibly change in the decoded frames. They are not waived by pretending the whole shot is an intentional still. The final name/identity hold is deliberate.
- Canvas text is painted source, so DOM box/contrast checks cannot prove its readability. Full-resolution and 360px sheets were inspected separately. The 3D stage and illustrated elements remain editable in their source modules rather than as individual draggable Studio objects.
- Real SFX reports 44/45 checked anchors on their frame, plus strong numeric headroom, loudness, hierarchy and mono compatibility. This is not a claim of perfect perceptual sync for every action. Its variety score still fails: it counts the repeated type landings, toy contacts and mechanical fragments as repeated recordings. Those recurring families are retained for their consistent material identity after replacing the broad transition repetition. No overall all-axis audio pass is claimed.
- Earshot's whole encoded mix finds 46% of the 74 cues within one frame (chance 16%), 92% within 100 ms (chance 77%), median absolute onset offset 18 ms, with one cue at 39.317s not matched to an attack. Other gestures are met by swell/level peaks. This broader detector is not the isolated-effect anchor test above. Its low-detail pass labels 12 events; one weak “breath” guess (z 1.88, not exposed) overlaps the designed opening sweep. That is not evidence of lyrics. No speech-recognition or lyric-free certification is claimed.
- The isolated effects stem is intentionally much quieter than the music over the full minute. The supplied song carries the film; isolated-stem LUFS is not the final soundtrack loudness.
- Earshot's pixel-rise preset reports a steep pitch climb. It is retained only at the 8-bit world entrance, where a chiptune rise is part of the requested style. It is not used as a generic sweep across the film.
- The glass section is the quietest material study: three transmissive, roughened panes and a moving object behind them. Its refraction is more subtle at phone size than the larger neon and print scenes. No photorealistic-world or fluid-physics claim is made: the liquid is a deterministic field, not a fluid simulation.
- Audio was measured and reviewed through local model evidence; no human headphone/speaker audition occurred. The optional Real SFX voice classifier is not installed, and no external audio service was used. No narration was added.

Read CREDITS.md before distribution, including the paper-turn attribution and the user-supplied music's publishing rights. The master documentation now explicitly prioritizes supplied music over generated scores and preserves user track exclusions.
