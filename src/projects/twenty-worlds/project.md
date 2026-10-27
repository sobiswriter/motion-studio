# One idea. Twenty worlds.

Approved direction: the user accepted the reference-led storyboard on 26 October 2026 and asked for the same energy as the references. Existing studio defaults remain: pure motion graphics, 60 seconds, 1920×1080, 60fps, Motion Studio identity, no voiceover. The complete approved proposal remains in docs/storyboards/20-styles-remake.md; sequence.mjs derives the 22 contiguous slots from its JSON.

## Visual direction

A warm orange signal takes form, becomes a movie camera, builds a miniature studio, changes physical/digital media and resolves into an identity. Five chapters have distinct energy: form, world, medium, disruption and resolution. Each of the 20 styles demonstrates a material or mechanism. Opening and ending have their own time; the identity settles by 57 seconds.

Palette: ink #14151B, paper #F4EEE3, orange #F06535; cobalt #244EE9, yellow #EFC843, cyan #86E2DF and rose #E67CAE identify the relevant graphic/material chapters. Gold #D7B774 is reserved for Art Deco. Multiple accents and intentional reading holds follow the approved reference-backed aesthetic precedence. Fonts are local OFL Space Grotesk (display), EB Garamond (editorial, including synthetic italic) and IBM Plex Mono (technical details).

## Reference intent

- Primary REF-06: dimensional progression; retain registration between clay, blueprint and wireframe. Reopened f325–360 / 5.417–6.000s.
- Supporting REF-15: original developed graphic assets, registered shapes and selective glyph changes; camera cutout and print/comic passage. Reopened f310–345 / 5.167–5.750s.
- Supporting REF-21: container/content overlap and causal playback state in the glass player. Reopened f98–133 / 1.633–2.217s.

The sources are taste references only; their imagery, brands and audio are not production assets. The new camera geometry, studio set, print/cel illustration, pixel sprites and identity are authored locally.

## Sound plan

The supplied The Golden Hour Rise remains the only music bed. Its existing source-preserving 60-second arrangement is retained in music-edit.json; original MP3 unchanged. Ivan Is Loading is excluded. Earshot measured the music edit at -15.1 LUFS / -3.7dBTP with pulse clarity 0.38 and an estimated 80/160BPM grid. Five detected sections place the more energetic passage under the editorial run and retain a quieter musical tail for the identity; genre labels are model hints.

55 authored cues in sound-cues.json align material contacts, camera/scene moves, glyph groups, picks and identity landings to integer frames. Four Openverse recordings supplement reused measured earshot effects. Real SFX performs one final placement/mix path; effects remain a separate stem. The shutter candidate's short 98ms earshot trim was flagged tail-cut, so use the full recording with peak anchoring and its release. Final loudness, clipping and timing are measured again after mixing. No generated score or uploaded audio service.

## Execution and checks

Existing HyperFrames 0.8.200 + pinned Three.js 0.186.1, local Canvas artwork, GSAP seek clock. Rendering derives from a quantised integer frame; no random/wall-clock animation. A single authored composition keeps full-frame transitions continuous; scene/motion sources are edited in three local modules. Three.js uses ANGLE on the Intel Iris Xe / D3D11 path measured during actual exports.

Keep the existing engine and older productions intact. Review small proofs first, full 20fps drafts for iteration, then 1080p60 delivery. Review evidence includes half-second native samples, five frames around every boundary, changed close-ups, pixel-change checks and audio measurements. HyperFrames' DOM motion audit does not inspect canvas internals; its dead-stretch warning must be assessed against pixel evidence rather than concealed with fake DOM movement.
