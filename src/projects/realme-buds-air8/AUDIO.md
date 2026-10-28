# Audio handoff — Find your frequency

Attach **assets/audio/master.wav** once, at time zero, volume 1. It contains the selected music and all 20 effects. Do not layer music.wav, effects.wav or cues.json over that master.

The three delivered stems are exactly **45.000 seconds, stereo, 48 kHz, PCM 24-bit**. Rebuild from the repository root with `node scripts/sound-buds-air8.mjs`. The script asserts duration, channel count, cue frame ordering, bounded tails, explicit source routes and master headroom.

## Music and measurements

The only music is the user's **Glass and Alloy**, source 15–60 seconds, reduced 5.5 dB with a 10 ms entry fade and 0.5-second ending fade. The original MP3 is unchanged. No narration, replacement score or new synthesis was added.

Fresh FFmpeg loudnorm **input** measurements:

| File | Integrated loudness | True peak | LRA |
| --- | ---: | ---: | ---: |
| music.wav | −16.36 LUFS | −4.41 dBTP | 4.70 LU |
| effects.wav | −31.32 LUFS | −13.00 dBTP | 12.10 LU |
| master.wav | **−16.33 LUFS** | **−4.05 dBTP** | **4.60 LU** |
| Representative 256 kbps AAC encode | −16.42 LUFS | −3.97 dBTP | 4.50 LU |

See assets/audio/measurement.json for exact measurements and SHA-256 hashes. The AAC check is a separate audio-only encode; recheck the actual final video. Master SHA-256: `fe4f36f677cf85af5161e30b7d292296cd857ffff892aa83c68f2c3ccec552b1`.

## Placement and iteration

Real SFX mixed explicit local files with no automatic source selection, uisfx fallback, beat snapping or second effects layer. Twenty authored event frames are stored in assets/audio/cues.json; resolved-cues.json retains the actual source trims, processing, starts and anchors. Sliced source files are also copied under assets/audio/effects/slices so the handoff survives cache cleanup. Real SFX labels explicit-file sources “library”; procedural versus recorded provenance is distinguished in provenance.json and CREDITS.md.

- **Audio pass 1:** repeated wood and air effects reduced the variety score to 1.0. A selected camera recording also contained two contacts. Replaced repetitive accents with related existing contact, breath, shutter and air assets; isolated the camera's first 51 ms contact with an 8 ms release fade.
- **Audio pass 2:** variety reached 8.3, but the mix log identified two keyboard contacts within the device cues. Used the measured first 81 ms keyboard event with an 8 ms release fade.
- **Audio pass 3:** the mix completed with no source-trim warnings. Real SFX measured hook 9.0, authored-anchor sync 10.0, pacing 8.9, variety 8.3, hierarchy 10.0, headroom 10.0, loudness 10.0 and mono compatibility 10.0. SFX mono fold loses 0.3 dB. Coverage remains unmeasured because no final picture moments were supplied. Reports are retained as critique-round1.md, critique-round2.md and critique.md under assets/audio; the tool's per-invocation heading defaults to “round 1”.

The sync score verifies sound placement against the authored cue anchors; it does not independently verify the finished picture. The final swell peaks at 41.5 s and its tail ends before 45 s. Effects are editorial accents, not recordings of the product's own mechanics or a measured ANC before/after test.

## Tool limits and remaining review

Real SFX's four-recording index, explicit-file mixer and critique ran successfully. Earshot doctor failed with **No module named earshot**. A cached source checkout was found, but its deleted scientific Python dependencies and models were not restored; no large model download or shared-runtime change was made. Existing earshot bank assets retain their original kit/recipe provenance and historical checks. Fresh FFmpeg measurements were used for this mix.

No fresh semantic audio, vocal-detection, realness or earshot timeline/sheet result is claimed. No human listening pass has taken place. Audition the opening, final swell and transitions against the final picture, then verify the actual encoded video's sound and levels. The supplied track's distribution rights remain unverified.
