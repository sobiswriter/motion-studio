# Studio Production Workflow

## Reference selection throughout production

Use the [primary reference library](../docs/reference-library/README.md) and [playbook](../docs/reference-library/PLAYBOOK.md) on every motion brief. In Phase 1, route the brief to one relevant primary REF ID and up to two supporting IDs; inspect their source intervals and frame studies. In Phase 3, add `Reference intent` to `project.md`/the storyboard: IDs, timecodes, composition, motion handoffs, pace/reading intervals, opening/ending, and the original adaptation. Follow the existing storyboard preference and reuse prior onboarding answers.

In Phase 4, compare an early opening, a difficult transition and an ending proof against those intervals before extending the full film. In Phase 5, retain those comparisons and the concrete gaps/fixes in the production review. For sound, use the user's selected local music first and consult the measured reference evidence; do not copy reference audio or assume detected onsets are a creative sync pass. The latest user brief and Rules' reference-backed aesthetic precedence apply. Studying/renaming/documenting references alone is supporting work, not a new production.

Whenever a new project begins or raw assets are uploaded, follow these 5 phases in strict order. **Never skip Phase 1 or Phase 2.**

---

## Phase 1: Automatic Asset Inventory (Silent Prep)
Before asking the user any questions, scan the project workspace automatically:
1. Inspect `./raw_footage/`, `./audio/`, `./brand_assets/`, `./luts/`, or the root directory.
2. Run `ffprobe` on all video/audio files to log duration, resolution, frame rate, and audio channels.
3. Notice what is present (e.g., talking-head A-roll, screen recordings, voiceover `.wav`, music track, SVG logos, `.cube` LUTs) and what is missing (e.g., no voiceover, no B-roll, or zero raw files = Pure Motion Graphics mode).
4. Inventory existing audio stems, cue lists, `assets/sfx`, and license/provenance records. Reuse suitable sounds. At the start of sound work or after a tool failure, check the installed environment with `npm.cmd run real-sfx -- setup check` and `npm.cmd run earshot -- doctor`; follow [Sound Tools](../docs/SOUND_TOOLS.md) for recovery.
5. Include `assets/Music/` and newly added tracks in every revised inventory. Consult the [music library](../docs/music-library/README.md) and its [selection playbook](../docs/music-library/PLAYBOOK.md), compare the exact audition ranges and check source hashes. Record the MUS ID/source in/out in the blueprint. Supplied music is the first choice for the primary bed. Keep procedural tools for missing accents or gaps unless original music was specifically requested; retain any track the user excluded in the project's exclusion record. Unverified vocals are not certified instrumental.

---

## Phase 2: The Mandatory Director Onboarding Gate
Present a concise **Asset Summary** of what you found on disk, and then **STOP and ask the user the Onboarding Questionnaire** below. Tailor the questions so you don't ask what is already obvious from the files.

### The Onboarding Questionnaire (Ask Before Building)
1. **Production Mode:** Which type of video are we making today?
   - **Mode A — Full Hybrid Video Edit:** Raw footage/voiceover edited via `video-use` + Lightroom/FFmpeg color grading + HyperFrames/Remotion motion graphics overlays & transitions.
   - **Mode B — Pure Motion Graphics Film:** 100% programmatic video (Launch film, Explainer, Reel, or Logo Sting) built entirely in **HyperFrames** (default) or **Remotion**.
   - **Mode C — Audio-Driven / Voiceover Visualizer:** You provided the voiceover/music track; I build a full-length visual narrative and motion graphics timeline synced to your audio.
2. **Core Goal & Story Arc:**
   - What is this video about in one sentence, and what is the **single promise/takeaway** the viewer must remember?
   - What are the **key points/features** to cover in order, and how should it end (CTA, logo lockup, loop)?
3. **Target Format & Pacing:**
   - Aspect Ratio & Resolution: `1920x1080 (16:9 Landscape)` or `1080x1920 (9:16 Vertical Reel/Short)`? (Default: `60 fps`).
   - Target Duration: Exact seconds (e.g., `15s`, `30s`, `60s`) or "Natural cut based on the uploaded voiceover/A-roll"?
4. **Visual Direction, Style & Color Grade:**
   - **Motion Style:** Pick one (or a blend) of the **20 Studio Styles** in [Design Philosophy](<Design Philosophy.md>) (e.g., *Glassmorphism*, *Kinetic Typography*, *Wireframe 3D*, *Neo-Brutalism*, *Editorial Serif*), or say **"Surprise me with studio defaults"**.
   - **Palette & Fonts:** Any specific Brand Hex codes (Background, Text, 1 Accent) or fonts? (If not, I will invent an opinionated studio palette).
   - **Color Grade (if raw footage is used):** *Clean Commercial*, *Moody Film/LUT*, *Warm Editorial*, or a specific `.cube` file in `./luts/`?
5. **Audio & Captions:**
   - Use uploaded/licensed recordings with Openverse for missing effects, earshot procedural audio/SFX, or blend both? Reuse an already stated preference; honor recorded-only and silent briefs.
   - Should I burn in animated captions/subtitles on dialogue sections?

> **Gate Rule:** Wait for the user's answers. If the user replies *"Use your best judgment / studio defaults"*, immediately fill in every missing detail with opinionated, studio-grade choices (never leave placeholders) and proceed to Phase 3.

---

## Phase 3: Master Production Blueprint (`project.md`)
Once the user answers the onboarding questions, generate `project.md` containing:
1. **Locked Creative Spec:** Mode, Resolution, FPS, Exact Hex Palette (Background, Text, 1 Accent), Font Trio, Continuous Visual Thread, and FFmpeg Color Grade recipe.
2. **Transcript & Beat Map** (if audio/video files exist): Word-level timestamps (`transcribe-batch` / Whisper) with filler words and dead air marked for removal.
3. **Scene-by-Scene Edit Decision List (EDL):**
   - Exact timestamps (`00:00.0 - 00:03.5`), source clip or motion scene, camera movement, audio/SFX cues, and designated **Motion Graphic Slots** (`edit/animations/slot_01/`, etc.) specifying whether each slot uses **HyperFrames** or **Remotion**.
4. **Sound Cue Plan:** Record meaningful actions, integer cue frames, sound roles, source choices, source trims, durations/tails, initial dB gains, and attribution. Include the Real SFX placement/mix path and earshot checks; identify where Openverse sourcing or earshot generation is needed. Keep intentional silence explicit.

*(If the user requested full autonomy in Phase 2, proceed directly to Phase 4 without stopping again. Otherwise, do a quick blueprint check if requested.)*

---

## Phase 4: Autonomous Execution & Rendering
Execute the build without asking for mid-process hand-holding:
- **Sound authoring (all modes):** Apply the [Real SFX](../.agents/skills/real-sfx/SKILL.md) and [earshot](../.agents/skills/earshot/SKILL.md) skills wherever relevant, following [the installed sound workflow](../docs/SOUND_TOOLS.md). This is part of approved execution after onboarding and the blueprint:
  1. Reuse suitable licensed local audio; fill recording gaps with Openverse and retain provenance. Rebuild the Real SFX library index when recordings change.
  2. Use authored cue frames first, then Real SFX timeline/picture analysis for missing moments. Inspect automatic candidates and keep deliberate silence.
  3. Use earshot to compare candidates and find usable source trims. Where recordings do not fit or the brief calls for synthesis, create sounds with earshot's bank/forge or a shared kit; keep generated sources identified.
  4. Place effects once: use local, manifest-registered Remotion `sound` cues or the Real SFX post-render mix. Align audible onsets/peaks/ends, preserve tails and existing music/voice, and inspect resolved source choices.
  5. Measure the combined mix with earshot and apply Real SFX's critique to its mixes. Fix clipping, masking, poor levels, and timing errors; save cue reports, credits, and effects stems with the project outputs.
- **If Mode A or C (Full Video / Hybrid Edit):**
  1. Cut raw clips with 30ms audio crossfades (`video-use`).
  2. Apply the FFmpeg Lightroom grade (`lut3d`, `curves`, `eq`, `noise` grain, `vignette`).
  3. Spawn parallel sub-agents for every motion-graphics slot (`edit/animations/slot_X/`) using **HyperFrames** (default) or **Remotion**, passing the exact prompt architecture from [Design Philosophy](<Design Philosophy.md>) (PRODUCT, STORY, FORMAT, LOOK, MOTION, SOUND, QUALITY CHECK).
  4. Composite overlays, lower-thirds, speed-ramps, and captions onto the master timeline and mix audio levels.
- **If Mode B (Pure Motion Graphics / Logo Sting):**
  1. Build the entire multi-scene composition in **HyperFrames** (or **Remotion** if requested).
  2. Enforce the continuous visual thread, 3D camera drift, real code-built UI screens, and frame-exact recorded or procedural SFX chosen through the sound workflow above.
  3. If building a Logo Sting, export both the master MP4 and a second transparent-background (`ProRes 4444` / `WebM alpha`) version.

---

## Phase 5: Multi-Round Senior Designer Quality Check
Never deliver a first-draft render. Run the mandatory self-critique loop defined in [Rules](Rules.md):
1. Render the video and extract inspection frames every **0.5 seconds** (or every **0.25 seconds** for logo animations) plus composite filmstrips at every cut boundary.
2. Critique as a Senior Motion Designer & Lead Editor across 8 axes:
   - Story & Pacing | Layout & Whitespace | Typography & Readability | Timing & Easing | 3D Depth & Motion Blur | Color Grade Consistency | Cut-Boundary Continuity (no jump cuts) | Audio/SFX Frame Sync.
   - For changed audio, use earshot's measurements and timeline/sheet evidence where applicable, plus Real SFX's critique for its mixes. Review action-frame sync, clipping, voice masking, tails, and source compliance. Record measured findings and any human audition still needed.
3. Fix every flaw found, re-render, and re-inspect for **at least 3 to 4 full critique rounds**.
4. Deliver the final MP4 path, confirm audio presence with `ffprobe`, and present a clean **Round-by-Round Critique Changelog** with sound checks, remaining limitations, source credits, and the separate SFX stem/cue report when produced.
