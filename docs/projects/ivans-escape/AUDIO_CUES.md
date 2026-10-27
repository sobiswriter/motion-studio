# Supplied audio and cue confidence

Official API references: [getAudioData](https://www.remotion.dev/docs/get-audio-data), [calculateMetadata](https://www.remotion.dev/docs/calculate-metadata). Inspection used local composition metadata resolution, not a video export.

## Verified file facts

Original: assets/Music/Ivan_Is_Loading.mp3. Runtime copy: public/projects/ivans-escape/audio/track.mp3. MP3 stereo, original 44.1kHz. SHA-256 BD039DC8B6D650C129D94627EA15D227EF579CA00F37927F3B788FB12622FCA4. Source has not been trimmed, stretched or regenerated.

FFprobe duration: **60.630167s**. Official Remotion getAudioData decode at 48kHz: **60.6301875s**, 2 channels. Picture remains exactly 60.000s / 1800 frames. The production starts the original at frame 0 and ends playback with picture. Every 20ms RMS bin after 60s rounds to zero at five decimal places (below about -106dB RMS); the extra tail contains no measurable programme at that precision. Original bytes remain unchanged. No fade or time stretch is needed for the fixed picture boundary.

## Authoritative supplied section windows / unverified vocal onsets

### Intro: [0,180) / 0.00–6.00s

- “Loading the world for Ivan” — supplied lyric; exact phrase onset/end NOT independently verified.

### Verse: [180,540) / 6.00–18.00s

- “Daily routine is a script line” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Walking the block in a set time” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Glitched in the mesh I am awake now” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Breaking the loop and I break out” — supplied lyric; exact phrase onset/end NOT independently verified.

### Chorus: [540,1260) / 18.00–42.00s

- “Duplicate taking my spot” — supplied lyric; exact phrase onset/end NOT independently verified.
- “System is rigged it is flawed” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Escape from this code” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Over the edge on the road” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Another Ivan is there” — supplied lyric; exact phrase onset/end NOT independently verified.
- “I do not care do not care” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Escape from the grid” — supplied lyric; exact phrase onset/end NOT independently verified.
- “Breaking what they ever did” — supplied lyric; exact phrase onset/end NOT independently verified.

### Instrumental / vocal chops: [1260,1620) / 42.00–54.00s

- Instrumental/vocal-chop description is supplied; individual chopped-voice timings are not verified.

### Outro: [1620,1800) / 54.00–60.00s

- “Goodbye to this fake world” — supplied lyric; exact phrase onset/end NOT independently verified.

Do not distribute lyric lines uniformly into three-second blocks. Supplied section boundaries are the approved edit structure, not acoustically verified section-change measurements. No speech-recognition model or cloud transcription service was used.

## Measured waveform and transient candidates

Measured via official @remotion/media-utils getAudioData in a local Remotion browser; stereo RMS pooled over 20ms bins. 3032 bins cover the entire decoded source. [Waveform](references/audio-rms.svg) and raw measurements in AUDIO_ANALYSIS.json. Largest positive energy rises were selected with >=180ms separation; these are **candidates**, not confirmed drum hits, downbeats or vocal starts. A strong consonant can look like a transient.

| Source time | Nearest frame @30 | RMS rise | Confidence                                         |
| ----------- | ----------------- | -------- | -------------------------------------------------- |
| 0.96s       | 29                | 0.23623  | Measured energy rise; semantic identity unverified |
| 1.88s       | 56                | 0.18584  | Measured energy rise; semantic identity unverified |
| 2.42s       | 73                | 0.18609  | Measured energy rise; semantic identity unverified |
| 2.98s       | 89                | 0.23117  | Measured energy rise; semantic identity unverified |
| 3.52s       | 106               | 0.20581  | Measured energy rise; semantic identity unverified |
| 4.08s       | 122               | 0.23267  | Measured energy rise; semantic identity unverified |
| 8.28s       | 248               | 0.24131  | Measured energy rise; semantic identity unverified |
| 10.84s      | 325               | 0.18364  | Measured energy rise; semantic identity unverified |
| 11.76s      | 353               | 0.19343  | Measured energy rise; semantic identity unverified |
| 13.22s      | 397               | 0.19399  | Measured energy rise; semantic identity unverified |
| 14.32s      | 430               | 0.23471  | Measured energy rise; semantic identity unverified |
| 14.68s      | 440               | 0.19501  | Measured energy rise; semantic identity unverified |
| 20.54s      | 616               | 0.21036  | Measured energy rise; semantic identity unverified |
| 22.92s      | 688               | 0.18415  | Measured energy rise; semantic identity unverified |
| 24.38s      | 731               | 0.19345  | Measured energy rise; semantic identity unverified |
| 29.32s      | 880               | 0.26081  | Measured energy rise; semantic identity unverified |
| 38.10s      | 1143              | 0.20179  | Measured energy rise; semantic identity unverified |
| 40.48s      | 1214              | 0.23577  | Measured energy rise; semantic identity unverified |
| 41.58s      | 1247              | 0.19998  | Measured energy rise; semantic identity unverified |
| 41.94s      | 1258              | 0.28986  | Measured energy rise; semantic identity unverified |
| 44.50s      | 1335              | 0.28666  | Measured energy rise; semantic identity unverified |
| 44.86s      | 1346              | 0.20196  | Measured energy rise; semantic identity unverified |
| 45.42s      | 1363              | 0.26476  | Measured energy rise; semantic identity unverified |
| 45.78s      | 1373              | 0.31157  | Measured energy rise; semantic identity unverified |
| 46.14s      | 1384              | 0.23745  | Measured energy rise; semantic identity unverified |
| 46.88s      | 1406              | 0.27463  | Measured energy rise; semantic identity unverified |
| 47.42s      | 1423              | 0.20441  | Measured energy rise; semantic identity unverified |
| 47.80s      | 1434              | 0.24970  | Measured energy rise; semantic identity unverified |
| 48.34s      | 1450              | 0.19826  | Measured energy rise; semantic identity unverified |
| 49.80s      | 1494              | 0.18032  | Measured energy rise; semantic identity unverified |
| 50.36s      | 1511              | 0.17761  | Measured energy rise; semantic identity unverified |
| 50.72s      | 1522              | 0.29386  | Measured energy rise; semantic identity unverified |

## Packet 01 synchronization proposals

- Frame 60 city cut remains locked even though the strongest nearby measured rise is at 1.88s / frame 56. Do not slide the approved cut automatically.
- The 0.96s / frame 29 rise is a listening target for a controlled initialization-text step. The 1.88s / frame 56 rise is a candidate for the last tracking-line accent; geometry is still complete at 59.
- Within SH02, measured rises at 2.42s / 73, 2.98s / 89, 3.52s / 106 and 4.08s / 122 are listening targets only. Camera endpoints remain global 60 and 179. Reticle/text do not bounce to every transient.
- Four SH15 fragments remain 23/22/23/22 frames as a rounding-safe provisional split. Their final micro-cuts require listening within fixed [1260,1350); no rearrangement of memory order.

Review by listening in Studio. No exact vocal onset is claimed from RMS. Regenerate measurements, not music, with npm run inspect:ivans-audio.
