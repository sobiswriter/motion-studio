# Selecting local music

## Evidence and limits

All25audio sources were decoded completely at48kHz stereo and measured with local earshot0.4.0 light mode. No sampled listening was substituted for whole-track metering. Decode arrays stayed in memory; no extra full-size PCM cache or source duplication. Original SHA256 hashes were checked before/after. Raw container tags were retained. FFmpeg produced full-track waveform and log-frequency spectrogram images.

The second analysis pass uses SciPy spectral flux at8kHz (1024sample STFT,128sample hop), local median background and separated peaks. These are attack candidates, not labelled beats, instruments or SFX. One-second RMS levels and regular15-second blocks map level shape. Window starts step1second; rise12s, steady30s, dense30s, long60s; windows below global median−10dB are excluded. Candidates rank by level rise, RMS standard deviation or detected attack density. These are within-track extrema, not automatic editorial cut points or quality scores. Audition phrase starts and tails before cutting.

Pulse candidates search60–180BPM autocorrelation. No phase grid, musical metre or half/double-time check is certified. usableBeatGrid remains false for every entry. Do not turn a high autocorrelation value into sync confidence.

Brightness uses earshot’s magnitude-weighted centroid of active frames; power-weighted centroid is a different field. Side/mid ratio indicates width, not surround sound or guaranteed mono compatibility. LRA indicates dynamic contrast, not energy/quality. Lossy MP3 decoding can overshoot0dBTP; reduce source gain, retain headroom, then measure the actual AAC/export. Near-full-scale sample counts alone do not prove audible distortion.

CLAP/AST semantic models and their heavy runtime are absent. No new1.1GBmodel download, cloud upload, genre classifier, vocal classifier or human audition was performed. Exact instruments, key, emotional mood, vocal absence, phrase/cadence boundaries, clean loop points and subjective fit remain unverified. Ivan vocals/lyric structure are from the user’s notes; other files stay vocal-unverified. Names inform proposed visual direction only where stated.

## Practical routing

- Start with the README brief table and the existing user choices. Latest explicit selection always wins. A track’s title alone must not decide the score.
- Product/kinetic: compare MUS-02/03/08/14/19. REF-20 supplies type/curtain behaviour; REF-09 gives product continuity. Test dense music against a sparse SFX plan, not an effect on every detected peak.
- Space/portfolio: compare MUS-01/05/18/20/22/23. REF-01/17 favour scale/camera continuity, REF-18 meaningful particles. Use local level growth for reveals, not a generic beat grid.
- Editorial/material: compare MUS-04/12/13/25 with REF-09/13/15/19. A subdued spectrum can coexist with a very loud climax; choose a bounded passage.
- Background/narration: audition MUS-16/22 and the steady MUS-12 window first. No file is voiceover-safe until its selected range is checked for vocals/masking.
- Dramatic contrast: compare MUS-07/11/15/24. Refusing a flat constant bed is a compositional choice; do not normalize away every intentional pause/rise.
- Vocal story: MUS-10 only when explicitly appropriate. The user’s notes put lyric-led intro0–6s, verse6–18s, chorus18–42s, instrumental/vocal-chop bridge42–54s and vocal outro54–60s. Those are supplied annotations, not a fresh transcription; the bridge is not certified vocal-free.

## Future use and maintenance

Register the original name, stable MUS ID, source SHA, selected range and editorial reason in the project blueprint. Use the user library first and keep source files unchanged. Recheck source hashes/new files before reuse. Keep personal/public distribution rights as a separate provenance question; none were newly established here. This library study does not trigger new-production onboarding or video-render review rounds.

See [review record](REVIEW.md) for the completed checks.
