# realme Buds Air8 — sound plan

Planning only, 27 October 2026. Proposed film: 45 seconds, 1920×1080, 60 fps, no voiceover. No audio export, source cut, mix or new sound generation has been made.

## Supplied music inventory

FFprobe confirms stereo, 44.1 kHz MP3 throughout. Originals remain unchanged.

| File in assets/Music | Duration |
| --- | ---: |
| Apex_Horizon.mp3 | 63.138 s |
| A_Pale_Blue_Stillness.mp3 | 163.370 s |
| From_a_Silent_Vantage_Point.mp3 | 174.968 s |
| Glass_and_Alloy.mp3 | 62.772 s |
| Iron_Anatomy.mp3 | 163.892 s |
| Ivan_Is_Loading.mp3 | 60.630 s — excluded; known vocals |
| Point_of_Impact.mp3 | 178.782 s |
| Tactile_Precision.mp3 | 68.885 s |
| The_Golden_Hour_Rise.mp3 | 90.566 s |

## Proposed selection and timing

Use **Glass_and_Alloy.mp3, source 15.0–60.0 s**, as one contiguous 45-second bed. This recommendation uses its measured level contour, not a claimed listening or genre judgment. Add a 10 ms entry fade and a 0.5-second closing fade; verify the ending at playback before locking. Do not generate replacement music.

One-second mono RMS measurements show an initial level around −16.5 dBFS, a rise near source 17 s (film 2 s), a stronger passage near source 32 s (film 17 s), and a late rise near source 48 s (film 33 s). The source approaches silence at 60 s. These are broad energy landmarks, not a validated beat grid.

FFmpeg loudnorm input measurements for the proposed, unmodified crop: **−10.87 LUFS integrated, +1.07 dBTP, 4.70 LU LRA**. Start the bed at **−5.5 dB**: approximately −16.37 LUFS / −4.43 dBTP before effects. Remeasure the actual combined and AAC-encoded mix; these figures do not certify a final master. A true peak above 0 dBTP is present in the decoded source.

Alternatives measured over 45 seconds: Tactile_Precision source 20–65 s, −11.67 LUFS / +1.90 dBTP / 6.30 LU LRA; Apex_Horizon source 15–60 s, −11.68 LUFS / +0.31 dBTP / 4.30 LU LRA. Glass_and_Alloy offers the proposed progression without source splices. All supplied music authorship and distribution rights remain unverified; retain the user's music-rights context when publishing.

## Small recorded-effects palette

Use effects as editorial accents, never as recordings of the actual earbuds. Provisional anchor times below may move with the storyboard; keep their final frame numbers authoritative. No trims or gains have been auditioned or approved yet.

| Film time / frame | Proposed action | Existing recorded source | Initial gain |
| --- | --- | --- | ---: |
| 0.8 s / 48 | First product silhouette resolves | assets/sfx/.media/audio/sfx/sfx_004.mp3 — Kodak Brownie shutter | −17 dB |
| 2.0 s / 120 | Product-name landing | assets/sfx/.media/audio/sfx/sfx_003.mp3 — Wood Knock | −18 dB |
| 17.0 s / 1020 | Major feature numeral lands | Same Wood Knock, select another clean single contact | −16 dB |
| 33.5 s / 2010 | Late feature montage opens | Same shutter, one clean contact | −18 dB |
| 41.25 s / 2475 | Closing identity settles | Same Wood Knock, lower and shorter if the release allows | −20 dB |

Source credits: [Kodak Brownie Shutter Sound](https://freesound.org/people/caculo/sounds/368177/) by caculo, CC0; [Wood Knock](https://freesound.org/people/Mrguff/sounds/369710/) by Mrguff, CC0. Provenance is retained in assets/sfx/.media/manifest.jsonl. Inspect attacks and natural tails before placing these files; a file start is not necessarily its audible onset.

If a broad air move needs an accent, first source a suitable licensed recording through Openverse. Do not force the keyboard or paper recording into that role. A fallback already exists at src/projects/style-showreel-v2/assets/audio/effects/mesh-swell.wav, but it is **procedural**, not recorded; its historical earshot match was z +3.17 for a smooth soft air whoosh. Use only with that provenance explicit, and recheck against this ad. Keep music as the main source of momentum; avoid adding an effect to every glyph.

ANC graphics must not imply measured noise cancellation through a fabricated before/after audio test. Use abstract visual wave suppression with accurate qualified copy; the music bed remains an editorial soundtrack.

## Tool status and production checks

- `npm.cmd run earshot -- doctor` failed: the recovered Python environment has **No module named earshot**. No fresh semantic match, realness, vocal detection, timbre assessment or earshot listening result is claimed.
- `npm.cmd run real-sfx -- setup check` found FFmpeg 9.0.2, ffprobe, Node 22.14.0, Python 3.12.11, four recorded library files and uisfx. The library index is missing. Rebuild it before authoring and inspect explicit source routes so uisfx cannot silently replace recordings.
- FFmpeg/ffprobe were used read-only for duration, RMS contour and loudness measurements. No dependency installation or model download was attempted during planning.
- After production approval: inspect candidate trims; use one effects placement path; align onset/apex to authored frames; preserve natural tails; measure clipping/true peak, masking and final audio presence; retain separate effects stem and cue report. Restore earshot and use its timeline/sheet where available, or record the precise fallback limitation. Final real-time listening remains a separate check.
