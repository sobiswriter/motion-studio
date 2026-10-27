# Sound tools

Use these tools proactively wherever they fit approved video and audio work. The standing requirements live in the [master Rules](<../Master Design Documentation/Rules.md>), [Workflow](<../Master Design Documentation/Workflow.md>), and [agent instructions](<../Master Design Documentation/Agents.md>); commands and implementation details live here. Reuse existing user direction, suitable local assets, and intentional silence.

Verified on Windows x64, 26 October 2026. The studio is a local, artwork-first Remotion engine; the master design documents describe the broader directing and editing workflow. This update adds sound authoring tools and optional HyperFrames authoring while preserving the existing productions and neutral StudioPreflight fixture.

## Installed

| Tool | Installed version/location | Purpose |
| --- | --- | --- |
| Remotion | 4.0.538, existing npm dependencies | Studio, integer-frame timeline and export |
| HyperFrames | 0.8.200, exact dev dependency | Separate HTML video authoring; Openverse media resolution |
| FFmpeg / ffprobe | 9.0.2, user-scoped WinGet Gyan.FFmpeg | Full audio analysis, mixing and muxing |
| whisper.cpp | Existing 1.5.5, `.cache/ivan-whisper/main.exe` | Local transcription; small.en model already present |
| yt-dlp | Existing 2026.03.17, user WinGet install | Reference/media download CLI |
| Openverse | HTTPS API via HyperFrames media-use | Search and download CC0/CC BY effects, keeping provenance |
| Real SFX | Clipwing/skills commit `edbefcbc3474869e6cc1e8a7ca583b0efd0dab7e`, `.agents/skills/real-sfx` | Moment detection, recording selection, timing, mixing and measured critique |
| earshot | 0.4.0, commit `591fa3e028032e6dce56620a20e932e35667e8d8` | Local audio matching, analysis, procedural sounds and coherent kits |

Python 3.12.11 and CPU-only torch are isolated in `.cache/audio-venv`. The Python dependencies are pinned in `requirements-audio.lock.txt`. earshot's CLAP and AST models are downloaded in `.cache/earshot`; both loaded and completed inference. Its bank contains 252 sounds. No API key is needed for anonymous Openverse search or local earshot operation. Openverse availability/rate limits and source licenses still apply.

The two project skills are available to agents on the next turn; AGENTS.md also links them directly. Their bundled scripts are used without modifying their implementation. Real SFX's optional uisfx dependency is pinned to 0.4.0: 78 CC0 interface cues. A separate recorded starter asset and provenance live in `assets/sfx`.

## Commands

Run from the motion-studio directory. On Windows PowerShell, use `npm.cmd` when forwarding flags: npm.ps1 in this environment can consume them.

```powershell
npm.cmd run hyperframes -- --version
npm.cmd run earshot -- doctor
npm.cmd run real-sfx -- setup check
npm.cmd run sfx:fetch -- --intent "mechanical keyboard click" --project assets/sfx --json
npm.cmd run real-sfx -- build_index
npm.cmd run real-sfx -- search --role click --limit 5
```

`sfx:fetch` reuses HyperFrames' Openverse resolver. The returned path is relative to `--project`, currently under `.media/audio/sfx/`. `.media/manifest.jsonl` retains license, source URL, creator credit, query and Openverse ID; CC BY also produces credits. Inspect `provenance.provider` to confirm the actual source. Keep these records with downloaded sounds and carry required credits into publication. Add descriptive role entries to `assets/sfx/catalog.json` for Real SFX: generic cache names cannot convey what a sound is. Source licenses must be checked at their landing pages.

The launcher sets Real SFX's configuration/index under `.cache` and indexes `assets/sfx`. It sets earshot's cache directory and defaults to two CPU threads. HyperFrames also uses this launcher. On Windows it includes WinGet's command links so a fresh FFmpeg install works immediately. It inherits explicit environment overrides. Use the **full** FFmpeg build: Remotion's bundled stripped binary cannot decode the raw PCM used by these tools.

## Sound workflow

1. Read the project's creative direction, cues, shot boundaries and existing audio. Prefer authored action frames; Real SFX can also analyze the picture or read a HyperFrames timeline. Automatic candidates need inspection, particularly subtle animation.
2. Search/download licensed recordings with Openverse, index them, and use earshot `rank`, `find` or `match` to check candidates and source trims. Retain provenance. The included keyboard recording received a strong keyboard match, z +4.0; that is model evidence, not a human audition.
3. If suitable recordings are unavailable, use earshot's sound bank or kit. Keep generated assets labeled as generated. Real SFX's recorded-library path and earshot generation are separate choices.
4. Place cues on the intended action frame and choose source-relative dB gain. For whooshes or risers, align the measured apex/end with the action; the start of a file may precede its audible impact.
5. Inspect levels, clipping, cue sync, masking and the voice/music balance in the combined render. Real SFX can duck effects under speech with `--voice-safe`. Human listening still decides taste and intelligibility.

### Frame-locked Remotion tracks

Copy the chosen file under `public/projects/<id>/audio/`, and register it in the project asset manifest. For example:

```ts
assets: {
  impact: { id: "impact", kind: "audio", src: "projects/example/audio/impact.wav" },
  // Existing artwork and soundtrack assets...
},
cues: {
  landing: {
    frame: 72,
    label: "Card landing",
    sound: { assetId: "impact", duration: 18, volumeDb: -12, trimBefore: 0 },
  },
},
```

`ShotTimeline` plays a named SFX sequence on frames 72..89 while retaining the existing soundtrack. `trimBefore` trims the source in frames. Choose a duration that includes the tail and fits inside the project. Markers without `sound` continue working as before. Asset existence and path validation remain part of `npm test`/`npm run validate`. Source duration and the perceptual quality of the trim require audio inspection. Gain -12 dB means multiply by approximately 0.251; multiple sources can still clip when summed.

### Real SFX post-render

Use an authored event list with seconds derived from integer frames (`t = frame / fps`), for example `[{"t": 2, "type": "click"}]`. Or discover candidates from an existing render:

```powershell
npm.cmd run real-sfx -- find_moments out/film.mp4 --out out/sound/moments --fine
npm.cmd run real-sfx -- suggest_cues out/sound/moments/moments.json --out out/sound/cues.json
npm.cmd run real-sfx -- from_cues out/sound/events.json --video out/film.mp4 --out out/sound/cues.json --ui library
npm.cmd run real-sfx -- mix out/sound/cues.json --out out/sound/film.mp4 --plan
npm.cmd run real-sfx -- mix out/sound/cues.json --out out/sound/film.mp4 --voice-safe
npm.cmd run real-sfx -- critique out/sound/film_resolved_cues.json out/sound/film_sfx_track.wav
```

The discovered and authored lists are alternatives; inspect the draft before mixing. Real SFX writes a new video, a separate effects WAV and a cue report. Do not apply the same effects both in Remotion and in post. Upstream can fall back to uisfx **even with `--ui library`** when a candidate fails its filters. Inspect `routes` and resolved cues for recorded-only work. An explicit `--kind "click=slices:0"` selects slices from library ID 0; IDs come from the current index and must be checked before reuse. This was verified with the downloaded keyboard sample.

### earshot fallback and review

```powershell
npm.cmd run earshot -- sfx list --kind hit
npm.cmd run earshot -- kit init --preset calm -o out/sound/kit.json
npm.cmd run earshot -- kit render out/sound/kit.json --out out/sound/kit
npm.cmd run earshot -- kit check out/sound/kit.json --out out/sound/kit
npm.cmd run earshot -- measure out/sound/film_sfx_track.wav
npm.cmd run earshot -- timeline out/sound/film.mp4
npm.cmd run earshot -- sheet out/sound/film.mp4 -o out/sound/sheet.png
```

For original recipes and iterative synthesis, follow `.agents/skills/earshot/SKILL.md` (`forge`). Optional cloud audio critique is outside this local workflow. The installed MCP entry point is available through `node scripts/audio-tool.mjs earshot mcp`; it has not been registered as a global Codex server.

## Reproduce the local environment

```powershell
npm ci
winget install --id Gyan.FFmpeg --exact --source winget --scope user
uv venv --python 3.12.11 .cache/audio-venv
uv pip sync --python .cache/audio-venv/Scripts/python.exe requirements-audio.lock.txt --extra-index-url https://download.pytorch.org/whl/cpu --index-strategy unsafe-best-match
npm.cmd ci --prefix .agents/skills/real-sfx/vendor
npm.cmd run real-sfx -- build_index
npm.cmd run earshot -- doctor --fetch --load
```

The skill source versions above identify the installed snapshots. Model downloads are roughly 1.4 GB and subsequent inference is local. Whisper's existing `npm run inspect:ivans-vocals` helper reinstalls its pinned runtime/model if the ignored cache is missing. yt-dlp was already installed; a new machine can install it with `winget install --id yt-dlp.yt-dlp --exact --source winget`.

## Verification performed

- Existing project assertions and asset validation pass, including rejection of missing/wrong-kind SFX assets, fractional or overflowing durations, invalid dB gain and negative source trims.
- `npm run lint` passes. `npm run check:audio-tools` checks both launch paths and rejects script path traversal. `npm run check:sfx-render` exports a four-second calibration WAV and checks silence before frame 30, silence from exclusive frame 32, source trimming and -12 dB gain. The render check needs full FFmpeg on PATH.
- Openverse returned and downloaded a CC0 recording; Real SFX indexed it, selected slices and produced a new MP4, effects WAV and report under `out/audio-smoke`. The deliberately sparse calibration fixture is not a creative mix and does not pass Real SFX's launch-film loudness/pacing score.
- earshot loaded both models, matched the recording, measured a generated effect, and rendered a 64-take calm kit with clean built-in checks.
- Existing films were not sound-designed again. A real project's final mix still needs human audition and project-specific level/sync review.
- `remotion versions` reports the existing deliberate Zod 4.6.7 security override against its expected 4.5.4. [TECH_STACK.md](TECH_STACK.md) records the reason; this update preserves it. Every Remotion package remains 4.0.538.
- The preflight's stale registry assertion was updated to include the existing six Ivan review sections; it still checks the complete composition ID list exactly. Its alternate-settings test now selects the intended composition by ID instead of assuming it is first.
- HyperFrames' required Node, Chrome, FFmpeg and ffprobe checks pass. Its doctor also lists optional Docker, Kokoro and MusicGen as absent, and does not detect the existing project-local whisper.cpp. Use the pinned Remotion transcription helper for that runtime; those optional providers were not installed.

Official sources: [Remotion](https://github.com/remotion-dev/remotion), [HyperFrames](https://github.com/heygen-com/hyperframes), [FFmpeg](https://ffmpeg.org/download.html), [whisper.cpp](https://github.com/ggml-org/whisper.cpp), [yt-dlp](https://github.com/yt-dlp/yt-dlp), [Openverse API](https://docs.openverse.org/api/), [Real SFX](https://github.com/Clipwing/skills/tree/edbefcbc3474869e6cc1e8a7ca583b0efd0dab7e/skills/real-sfx), [earshot](https://github.com/Leonxlnx/earshot).
