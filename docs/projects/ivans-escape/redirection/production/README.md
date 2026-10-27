> Current visual revision and six-section review: [pass02/IMPLEMENTATION.md](../pass02/IMPLEMENTATION.md) and [SECTION_REVIEW.md](../pass02/SECTION_REVIEW.md). This document preserves the preceding implementation history.

# Ivan's Escape — illustrated opening

The complete 40-shot revision is implemented in the existing `IvansEscape` composition: 1800 frames, 1920×1080, 30 fps, original soundtrack. The user's continuation request superseded the earlier document-review stop and authorized the required image generation and styled vocal captions. No new full-film MP4 was exported in this pass. The earlier MP4s and 19-shot artwork/source remain archival, not previews of this revision.

Open [the full opening](http://localhost:3000/IvansEscape), [the identical first 18 seconds](http://localhost:3000/IvansEscapePilot), or [the first six seconds](http://localhost:3000/IvansEscapePacket01). Press Play in Studio. If the server is closed, run `npm run dev` from motion-studio.

## What changed

16 new original illustration sources provide Ivan's consistent turnaround, four walking drawings, four running drawings, three leap drawings, four portraits, a dedicated full-frame eye insert, a reaching hand, three shoe exposures, six environment/detail plates, architectural foreground and painted streaks. Their exact prompts are in [IMAGE_PROMPTS.json](IMAGE_PROMPTS.json). All are local in public/projects/ivans-escape/illustrated/source. No reference-video artwork enters the composition or image prompts.

Sharp derives 114 registered runtime layers, including complete alpha-isolated poses, reflected views, small hair/hem pieces, 12 facade strips and 54 perspective road regions. Source images are preserved. [ASSET_DIMENSIONS.json](ASSET_DIMENSIONS.json) records actual runtime dimensions; [SOURCE_ART.json](SOURCE_ART.json) records original native dimensions and hashes. Generated native resolution is lower than the aspirational 2400/3200px briefs; normalized output dimensions do not imply extra painted detail.

The edit uses the proposed 40 contiguous cuts and original section boundaries 0/180/540/1260/1620/1800. Flat and multiplane shots dominate. Only C22/27/28/34/35/37 use ThreeCanvas for genuine plane separation and camera movement. Camera2D, ParallaxScene, CharacterCel, ShotRenderer and ShotTimeline remain the existing engine. Project-only overlays handle reflection clipping, the real foreground wipe, controlled secondary pieces, system labels and title. [IMPLEMENTED_SHOTS.json](IMPLEMENTED_SHOTS.json) contains the exact layers, cameras, cels and transforms actually used.

The replacement reuses the same walking files and initial framing. The reflection turns at global360/368, an exact eight-frame discrepancy. The shoe crosses the route before the fracture appears at510. Memory cuts reuse actual earlier compositions. Ivan leaps forward/upward into the opening; he never falls into the void. The final outside hold is warm and spacious, followed by title1722 and message1779.

## Vocal captions

14 styled phrases follow the song's detected vocals, with restrained uppercase Space Grotesk, a current-word underline, crimson emphasis during awakening/escape, and warmer treatment outside. Lyrics stay out of the instrumental. Foot inserts move captions to the upper safe area. The supplied words are retained; obvious recognition errors such as "Floating" and "Tooth blanket" are corrected to "Loading" and "Duplicate."

The actual recording does not place lyric onsets exactly on the supplied section boundaries: the first phrase is detected around6.26s, the routine line around9.26s, and the final phrase around53.72s. Picture boundaries remain unchanged. Timing comes from local Whisper small.en token DTW anchors, corrected against supplied lyric notes. It is machine alignment, not a claim of human-verified syllable precision. [WHISPER_RAW.json](WHISPER_RAW.json) and [WHISPER_CAPTIONS.json](WHISPER_CAPTIONS.json) preserve the unedited recognition result. The editable corrected source is src/projects/ivans-escape/vocals.json; timestamps remain relative to the untouched song at frame0. Caption confidence is null rather than borrowed from incorrect recognized words.

The new official packages are @remotion/captions 4.0.538 for the timestamped caption format and @remotion/install-whisper-cpp 4.0.538 for [local transcription](https://www.remotion.dev/docs/install-whisper-cpp/). All Remotion packages stay version matched. Whisper.cpp 1.5.5 and small.en live only in ignored .cache; no model is needed to play or export the opening. No cloud transcription service or new rendering framework was added. The pre-existing patched Zod 4.6.7 override is preserved despite Remotion's advisory version warning.

## Verification and commands

- `npm test` — reusable engine assertions and every registered composition's assets.
- `npm run lint` — ESLint and TypeScript.
- `npm run check:ivans-production` — current40-cut edit, alpha, reflection delay, shoe crossing, deterministic spatial sampling, captions, original audio and protected archive checks.
- `npm run assets:ivans` — repeatable Sharp preparation from the saved illustration sources; no generation service calls.
- `npm run ivans:stills` — reduced stills and five section contact sheets in out/ivans-escape/illustrated; includes boundary/backward/repeated sampling through ANGLE.
- `npm run ivans:draft` / `npm run ivans:final` — optional future H.264/AAC exports to new illustrated filenames. Neither was run in this pass.
- `npm run check:ivans-legacy` — checks the preserved original19-shot source separately.

[TECHNICAL_CHECKS.json](TECHNICAL_CHECKS.json) records logic/assets; [RENDER_CHECKS.json](RENDER_CHECKS.json) records the all-cut still sample set and renderer; [RENDER_PATCH_CHECKS.json](RENDER_PATCH_CHECKS.json) records the final affected-frame refresh. All 40 cuts and critical events have reduced still checks, with byte-identical repeated sampling and no browser errors. A pixel check confirms the pier is fully opaque over the entire canvas at frame 309. Protected engine/template/archive hashes and the legacy film configuration match the saved audit. Selected stills do not verify every one of the 1800 final video frames. Studio playback was exercised from 202 through 1336. Final artistic/vocal timing acceptance remains human review. Hair/hem overlays support only sub-degree settles over existing body pixels; larger articulation would require reconstructed hidden backing. This is selective cel animation, not full character animation.

## Editing the next iteration

Use src/projects/ivans-escape/opening-shots.ts for cut data/cameras; IllustratedOpening.tsx for project-specific graphics and caption treatment; vocals.json for words/times. Source replacements belong in the illustrated/source folder and should preserve their intended poses/registration. Run assets:ivans, checks, then inspect affected stills. Engine code does not need to change. Historical pass01 documents remain the design record; implemented shot JSON and current source are the runtime truth.
