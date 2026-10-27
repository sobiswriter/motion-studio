# Twenty Worlds / production review

## Round 1 — dimensional proof

Inspected six native 1080p ANGLE snapshots at 13.4, 16.2, 19.3, 21.8, 26.5 and 48.7 seconds in out/twenty-worlds/proof-stage. Actual renderer: ANGLE / Intel Iris Xe / D3D11; no software fallback.

Findings and changes: camera and eye yaw cancelled, making the clay object too frontal; changed the shared camera pose to reveal its side. Excessive hemisphere/exposure flattened the material; reduced ambient fill/exposure and added a fogged floor. The studio roof helper placed roof slabs at ground level; restored their roof elevation. Canvas labels used an unloaded family alias; switched the textures to loaded Display. Split-flap columns settled too late to read; shortened their stagger so the final phrase has over a second. Holographic materials were pale and uniform; added a coherent cyan/rose spectral change.

## Round 2 — complete choreography

Inspected all three still sheets in out/twenty-worlds/round-2, then all six half-second sheets and six native boundary sheets from the 60-second 20fps round-2-draft.mp4. The first version of the half-second extractor sampled 0.25 seconds later than its labels; the boundary times were correct. Corrected the extractor to select actual frame indices for subsequent reviews.

Weaknesses: particles read as diffuse noise; liquid had too little shape change; blueprint resembled dense wireframe; comic panels repeated the same camera; the final collapsed thumbnails left tiny marks between identity words. Changes: formed particles into a rotating three-lobed ring that contracts into the liquid drop; increased liquid deformation and sampling; used clean component edges for the exploded CAD drawing and retained the dense topology for the orbit; replaced the middle comic panel with an aperture close-up; removed fully collapsed thumbnails.

The opening, clay-to-blueprint scan and closing were compared again with the recorded REF-06 dimensional registration, REF-15 authored graphic/print progression and REF-21 container/content handoff intent. Adaptation is original artwork; the reference pictures are not pasted into the film.

## Round 3 — readability and sound

Inspected the full updated 60-second 20fps round-3-draft.mp4 through all 120 exact half-second samples and 105 native frames at its 21 boundaries. Inspected six native close-ups in round-3-closeups at 8.7, 15.2, 23.4, 36.6, 56.8 and 58.8 seconds.

Weaknesses: the first stronger liquid formed disconnected lobes; words waiting to enter left a flattened glyph at the screen edge; serif passages lacked their intended italic; the glass control changed position without changing playback state. Changes: increased the connected liquid field from 26 to 60 samples; suppressed stamps before their start; applied the local editorial font's synthetic italic deliberately; made the control change from play to pause and updated progress. Close-ups confirm the liquid is connected and the identity is clean. Replaced deprecated shadow mode with the current PCF mode.

Three actual audio mixes/critiques were made. Round 1 reused the same pop family for studio contacts and game pickups and left the VHS cue too quiet in the automated listen list. Round 2 gave the pixel passage its own rising arcade cue, changed MAKE/MATTER to type-flick/block-punch, and raised hologram/VHS/neon accents. Round 3 reduced repeated generic swipes: particle breath, scan swish, flowing-mesh swell and folding-curtain effects now serve those specific mechanisms. Retained the full 339ms pixel release instead of the earlier 190ms cap and reduced its pitch steps to 0–1.5 semitones. This intentionally synthetic arcade gesture is the documented exception to its bank's rising-glide warning; it is not used as a realistic recording. The new Openverse shutter uses the full release rather than earshot's tail-cut 98ms candidate.

Final WAV mix: 55 explicit-file cues, 31 files, four Openverse recordings and existing earshot effects; zero uisfx fallbacks. Real SFX measures -14.5 LUFS, -2.2 dBTP, SFX stem -31.3 LUFS, mono loss 0.2 dB. Critique round 3 scores hook, file-anchor sync, pacing, hierarchy, headroom, loudness and mono 10/10; coverage is unmeasured. These are mechanical measurements, not a human audition or independent proof of visual sync.

The variety score remains 1/10 and is not represented as a pass. Its remaining named complaint is the four related studio contacts at 20.90, 21.20, 21.53 and 21.88 seconds. The formula also penalizes consecutive uses within coherent shape contacts, pixel pickups and matching typography. Kept those material/interface families intentionally rather than inserting unrelated sounds to raise a score. Their suitability, the quiet VHS accent at 42.70, the busy split-flap at 47.70, the punctuation at 53.53 and the identity swell at 57.95 still need human listening.

## Round 4 — delivery and pixel verification

Exported the completed 1080p60 film through HyperFrames hardware GPU capture in 3m21s. Inspected all six exact half-second sheets and all six native boundary sheets from the actual delivery MP4, not just the authoring preview. No further visual defect found in those samples. The identity remains readable through the final frame range; intentional transition crops and brief reading holds remain.

The remaining verification gap was the DOM craft audit's 57-second dead-stretch warning: it observes a stationary canvas element, not its internal artwork. Added an all-frame pixel check to the review helper rather than adding artificial DOM motion. All 3,600 frames decode; 160×90 luma comparison finds a longest exactly identical run of 0.85 seconds, mean adjacent-frame RMS 6.02 and median 1.06 on the 0–255 scale. This resolves the claimed 57-second freeze, without treating pixel change as proof of artistic energy. Checked backward seeking 58.8 → 8.7 → 36.6 seconds; all three snapshots are pixel-identical to the earlier forward snapshots (RMS 0, max difference 0).

`npm test`, `npm run lint`, pre-export `npm run validate`, the 20-style/frame/cue assertions and final HyperFrames check pass. HyperFrames reports zero lint/layout/runtime errors, with the canvas craft warning and an Intel shader-precision compiler warning retained explicitly. No software renderer fallback. Full FFmpeg audio/video decode produces zero errors.

Final artifact: H.264 High / yuv420p, 1920×1080, 60/1 fps, 3,600 frames, 60.000 seconds; AAC stereo 48kHz, 60.000 seconds; 52,255,550 bytes. See [delivery.json](../../../out/twenty-worlds/delivery.json) for probe/hash/evidence. SHA256: f803bdbc695c3be3fbd6543659dd04da0e9eb1fea2cfba10acddda7e16388ec6.

Earshot measured the actual AAC delivery at -14.5 LUFS / -2.2 dBTP / LRA 8.2 LU and generated [the audio sheet](../../../out/twenty-worlds/final-audio-sheet.png). In the combined music/SFX signal, 42% of authored cues have a detected onset within one frame, 96% within 100ms, median offset 20ms; one flap cue at 47.87 lacks a detected onset. Automatic picture analysis reports 38 change candidates rather than the 21 authored scene boundaries, so that cut score is not an exact shot-sync audit. Source peak anchoring and independent combined-signal onset detection measure different things. The 0.7-second quiet tail is the deliberate musical release beneath the held identity. No human audition was performed.

Five full-mix listening excerpts are in [listening-checks.wav](../../../out/twenty-worlds/listening-checks.wav), with the questions in [final-sound-review.md](../../../out/twenty-worlds/final-sound-review.md): 0.37 opening contact (present under the bed?), 42.70 VHS (audible?), 47.70 flaps (distinct?), 53.53 punctuation (comfortable?), 57.95 identity swell (clean?). No extra effects were added merely to improve a score.

The finished MP4 is [Motion-Studio-One-Idea-Twenty-Worlds.mp4](../../../out/twenty-worlds/Motion-Studio-One-Idea-Twenty-Worlds.mp4). Editable preview remains on port 3020; artwork is source-edited Canvas/Three rather than individual Studio objects. Previous reels and original media are preserved. Required source credits and unverified supplied-music rights remain in CREDITS.md.
