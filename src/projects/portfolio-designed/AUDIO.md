# Audio handoff

Use **assets/audio/master.wav** once, at time zero, volume 1. It already contains the requested music and all 40 effects. Do not layer music-edit.wav or sound-cues.json over this delivery master.

The 120-second music arrangement and effects mix were reused byte-for-byte from the recovered portfolio-film master. Visual scene boundaries and internal action anchors are deliberately retained; descriptions and the closing URL were updated for the new authored graphics. The original A Pale Blue Stillness MP3 is unmodified. No new score, voiceover, source-video audio, or effects synthesis was generated for this revision.

## Current evidence

- Duration: 120.000 seconds; stereo PCM, 24-bit, 48 kHz.
- Fresh FFmpeg loudnorm input measurement: **−14.86 LUFS**, **−2.91 dBTP**, **9.70 LU LRA**. See [audio-measurement.json](audio-measurement.json).
- SHA-256 equality with the source master and music stem is asserted by `node scripts/sound-portfolio-designed.mjs`.
- All 40 cue frames are integers in the 7,200-frame timeline; their files exist. Twenty-three distinct effects files are copied locally.
- Historical earshot candidate readings and material recipes are retained, clearly identified as historical in audio-provenance.json. New model inference was not claimed.

The initial earshot doctor and Real SFX setup checks both reported the deleted audio environment. An offline recovery recreated the pinned Python 3.12.11 interpreter, but dependency sync stopped because a colorama wheel was absent from the local cache. No model download was started. Full FFmpeg was used as the documented local measurement fallback; the inherited Real SFX mix was not processed a second time.

## Authored anchors

| Global time | Intended action |
| --- | --- |
| 0.82 / 2.77 / 5.27 | Opening constructed word, identity, expanding curiosity signal |
| 6 / 16 / 25 / 29 | Particles, liquid, kinetic WORK, Bauhaus project handoffs |
| 25.62 / 27 | Work phrases settle |
| 33.60 / 36 | Project evidence print; SYSTEMS transition |
| 38 / 39.40 / 40.80 | Scope, estimate, invoice architecture resolves |
| 43 / 44.0167 / 44.7667 / 45.5167 | THINK passage; THINK, TEST, BUILD rows |
| 47 / 50 / 55 / 59 | AI handoff/artifact; research handoff/notes |
| 64 / 65.0167 / 66.5833 / 68 / 73.50 | BEYOND transition, tools phrases, skill structure |
| 77 / 79.25 / 83.40 | Experience opens; ledger entries settle |
| 87 / 88.30 / 95.90 | Liquid person handoff; portrait print; artifact turn |
| 97 / 98.95 / 101 | STILL passage, becoming, authored invitation |
| 110 / 111.1833 / 114.9667 / 117.10 | NEXT, closing phrase, Souradip Biswas, sobiverse.ai.studio |

Reading spaces remain music-led rather than filled with arbitrary effects. The cue sheet is an intended synchronization contract; final picture sync and taste remain separate from the unchanged waveform's measurement. Full new earshot/Real SFX critique, encoded-MP4 loudness, and a human listening pass have not been performed here. The user previously requested that remaining full verification be left to them.
