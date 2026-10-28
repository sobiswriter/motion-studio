# Production review — Find your frequency

Delivered 28 October 2026. These are four visual/composite review passes, not four unnecessary full-resolution MP4 exports. Reference study and the three audio iterations are recorded separately.

## Reference comparison before delivery

- REF-09: keep the actual product recognisable through changes of scale; align the liquid contour to the shared `[960,540]` case/acoustic-ring anchor; resolve back to the original hero. Our imagery is photographic, not its UI/artwork.
- REF-06: the driver fields retain their centres when their circular form becomes elliptical depth. A real Grey earbud stays visible throughout this chapter; two abstract circles alone were too weak as product evidence.
- REF-20: use strong covering plates and directional carry between scenes, with readable holds afterward. Initial uniform 0.9s handoffs were shortened/varied to 0.6–0.8s during the reference check. Comic margins add print texture; the product itself stays unwarped.

## Round 1 — authored opening, transitions and ending

38 native canvas samples, three sheets; no page errors. Backward sampling reproduced the same image. The first proof exposed the right earbud crowding the ANC claim and the IP55 headline. Raised/reduced those product cutouts, including the left ANC bud, to leave clear claim space. Native driver labels were checked: the slanted “1” glyph was readable, despite misleading small thumbnails. Opening, difficult Bauhaus handoff and ending were compared with the selected reference strips.

Evidence: `.cache/realme-buds-air8/round-1`.

## Round 2 — full half-second and boundary sweep

118 native samples / eight sheets, including every half-second and neighbouring edit-boundary frames. No page errors; backward sampling passed. The previous headline collisions were gone. Review found that the floor shadow darkened the active Tablet endpoint; moved the shadow draw before the endpoint markers. The three endpoints now have matching activation contrast, with only one active at a time. Qualifiers were inspected at native resolution and remain readable.

Evidence: `.cache/realme-buds-air8/round-2` and `round-3-fixes` (15 targeted samples).

## Round 3 — encoded draft and sound handoff

Rendered a complete 45s / 15fps draft. Inspected 90 half-second samples and 35 boundary samples; compared all 675 decoded frames at 160×90 luma. No identical adjacent-frame run was found. Review exposed an offset in the review tool's `fps=2` sampling labels, not in the film: replaced that sampler with explicit native frame indices and regenerated correctly timed evidence. The draft contained the already identified dim Tablet node; corrected source was separately reproofed before final export.

The sound handoff includes three genuine iterations: repeated contact/air accents were varied; double shutter and keyboard contacts were isolated to single measured attacks. The final Real SFX report has no trim warnings or uisfx fallback. Its sync score describes authored cue anchors, not an independent perceptual sync verdict. There is one audio master in the composition, with no doubled stems.

Evidence: `.cache/realme-buds-air8/round-3-corrected`, `round-3-fixes`, [AUDIO.md](AUDIO.md) and assets/audio/critique*.md.

## Round 4 — actual 60fps delivery

The final H.264 MP4 is exactly **1920×1080, 60/1 fps, 2,700 frames, 45.000s**, with **AAC stereo 48kHz** audio. Inspected 90 exact half-second samples plus 35 native boundary samples across seven contact sheets. All 2,700 decoded frames were compared at 160×90 luma; the longest identical run is 0.0667s, with no black/dead frame. This numerical check does not measure subjective energy.

Independent later-film/native-frame review confirmed the Tablet activation fix in the actual encoded 37.5s frame, the IP55 text gap, case exclusion, truthful battery qualification, full transition coverage and a readable held ending. No further defect was identified. Browser Studio also played to 45/45s and displayed the resolved hero/CTA. This is not a claim of human listening.

Actual final-file audio: **−16.45 LUFS integrated, −4.19dBTP, 4.60LU LRA**. No normalization was applied by this measurement. Final file: **20,348,340 bytes**, SHA-256 `84165c645798950f49d30530bbf158d95eeb5a9faf02c3432cbcd221d8441113`.

Evidence: `.cache/realme-buds-air8/round-4-delivery` (coverage, pixel-motion, seven sheets and native Tablet frame), delivery-audio.log, render-delivery.log and delivery-check.json.

## Validation and limits

Passed `npm test`, `npm run lint`, `npm run validate`, `npm run buds:check`; transition tests cover 605 structural samples and 110 native alpha-enabled/disabled pixel samples. 2,708 scene samples check finite geometry/state, local asset dimensions/alpha, qualified copy and the absence of the case from IP55 imagery. Renderer: ANGLE / Intel Iris Xe / Direct3D11. Final capture: hardware GPU, drawElement, one worker selected by HyperFrames; 134.4s render time.

HyperFrames' DOM craft checker reports a 42s dead-stretch warning because the animation is painted inside one canvas; it does not inspect those pixel changes. The full decoded-frame evidence above addresses the visual condition. It was not hidden with a false hold annotation. Existing Three.js CommonJS deprecation warnings remain unrelated to this isolated production.

Earshot inference was unavailable after the earlier environment deletion. Real SFX and fresh FFmpeg measurements ran; no new semantic/vocal/timbre model check or human listening pass is claimed. The user should audition the final mix. See [credits](CREDITS.md) for product-image and supplied-music provenance and publication limitations.
