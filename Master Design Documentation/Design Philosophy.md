# Studio Design Philosophy

## Primary taste benchmark

The user's [22 reference videos](../docs/reference-library/README.md) are the primary examples of the intended motion quality. Read the [frame-based motion playbook](../docs/reference-library/PLAYBOOK.md), select appropriate clips for the brief, and record REF IDs/timecodes in the blueprint/storyboard. The latest brief takes priority. The 20 styles below remain a vocabulary; references supply choreography, artwork depth, visual continuity, pace and resolved endings. See the playbook's direct/adjacent/gap mapping rather than claiming every clip demonstrates every style.

The shared lessons are causal handoffs, persistent objects, meaningful changes in scale/depth, differentiated motion timing, real product proof and contrast between bursts and reading intervals. Deliberate choices observed in a selected reference can override generic aesthetic defaults below: stable cameras/reading holds (REF-12/16), white washes (REF-01/13), hard snaps (REF-08/14), multiple accents (REF-06/20), functional layouts and developed 3D mechanisms. Record the rationale and maintain technical quality. Do not turn 'dynamic' into constant drift, uniform springs or an effect on every tiny movement.

## 1. Core Visual Identity Laws
1. **Specifics Over Templates:** Never use generic templates, stock icons, default gradients, or "left-headline / right-card" split layouts. Every composition must be intentionally art-directed.
2. **Strict Color Discipline:**
   - **Motion Graphics / UI Scenes:** Enforce a strict 3-color rule per scene: **1 Background Hex**, **1 Primary Text Hex**, and **1 Single Accent Hex** (e.g., `#F2EFE9` background, `#15140F` text, `#E5432D` accent), with an optional dark-mode inversion (`#141413`) on the final lockup.
   - **Live Footage & B-Roll (Lightroom / FFmpeg Grade):** All raw footage must be unified under a cohesive color grade before overlays are composited.
3. **Three-Tier Typography System:**
   - **Headlines / Hooks:** High-character display or editorial serif (e.g., *Instrument Serif*, *Playfair Display*, or heavy geometric display).
   - **Body / Real App UI:** Clean neo-grotesk sans-serif (e.g., *Geist*, *Inter*).
   - **Labels / Timestamps / Callouts:** Technical monospace (e.g., *Geist Mono*, *JetBrains Mono*).
   - *Legibility Rule:* UI text and lower-thirds must be scaled large enough to read effortlessly without squinting.

---

## 2. Motion & Choreography Philosophy
1. **Continuous Visual Thread:** Every video (or motion sequence) must feature a single visual motif—a continuous line, morphing shape, glowing parcel, or kinetic cursor—that travels across cuts and connects scenes.
2. **Transform, Never Fade:** Scenes inside motion graphics sequences must physically morph or transition into the next (e.g., a headline melts into a chart, a line closes into a logo). Avoid lazy opacity fades or static slide-ins.
3. **Living Camera & 3D Depth:**
   - Nothing sits frozen on screen. Maintain a slow, continuous camera drift (`scale` / `translate3d` / subtle orbit).
   - Build real z-depth: tilt UI windows in 3D perspective, apply soft multi-layered drop shadows, and add depth-of-field blur (`backdrop-filter` / Gaussian blur) to background/distant elements.
   - Apply frame-blended motion blur on fast movements and whip transitions.
4. **Build Real UI in Code:** When showcasing software or data, never paste flat static screenshots if a live DOM/React component can be built in HyperFrames or Remotion.

---

## 3. Raw Footage Color Grading & Lightroom FX (FFmpeg Pipeline)
When editing real camera footage (`A-roll` / `B-roll`), apply color and lens treatments via FFmpeg filtergraphs or `.cube` LUTs:
- **Clean Studio / Commercial:** Subtle S-curve contrast (`curves=m='0/0 0.25/0.22 0.75/0.78 1/1'`), slight warmth in highlights, clean skin tones, `unsharp` micro-contrast.
- **Moody Cinematic / Film Emulation:** Apply `./luts/*.cube` via `lut3d` (or teal shadows / warm highlights via `colorbalance`), subtle halation on highlights, fine 35mm film grain (`noise=alls=6:allf=t+u`), and soft optical vignette (`vignette=PI/5`).
- **High-Contrast Tech / Editorial:** Desaturated mids (`eq=saturation=0.85:contrast=1.12`), crisp crushed blacks, and high-key accent glow on motion overlays.

---

## 4. Sound Design & Audio Philosophy
1. **Cut on the Beat & Speech Cadence:** Every scene transition, speed-ramp, or B-roll cut must land on either a musical beat or a natural breath/emphasis point in the voiceover.
2. **Seamless Dialogue Engineering:** Apply 30ms audio crossfades (`afade`) at every speech cut to eliminate clicks/pops. Duck background music (`-14dB` to `-18dB` as starting gains) smoothly under voiceovers, then measure the combined mix and review intelligibility.
3. **Frame-Accurate SFX (Motion Graphics):** Every animated action (line drawing, card snapping, counter flipping, text landing, logo locking) must have a frame-accurate sound effect unless the brief calls for silence. Use Real SFX for recorded-effects placement and mixing. Align the audible onset, whoosh apex, or riser end to the intended action rather than assuming the file begins at its impact; preserve natural tails.
4. **A Cohesive Sound Palette:** Proactively reuse suitable licensed local recordings and source missing recordings through Openverse. When a recording does not fit or procedural sound is intended, use earshot's bank, `forge`, or a shared `kit` so repeated actions sound related. Favor a few consistent families and varied takes over unrelated effects on every small movement. Respect recorded-only preferences and keep generated sources labeled.
5. **Evidence Before Sound Claims:** Apply the [earshot skill](../.agents/skills/earshot/SKILL.md) to choosing, trimming, measuring, and reviewing sound; apply the [Real SFX skill](../.agents/skills/real-sfx/SKILL.md) to recorded-effects design and mixing. Measure gain, loudness, true peak, masking, and sync with the appropriate tools. Keep source credits and report model evidence accurately; taste and a human listening pass remain separate from automated checks. Follow [Sound Tools](../docs/SOUND_TOOLS.md) and the mandatory sound rules in [Rules](Rules.md).

---

## 5. The 20 Signature Motion Graphics Styles
When designing standalone motion videos OR spawning overlay slots (`edit/animations/slot_X/`) on top of live footage, select from these 20 studio styles:

| # | Style Name | Visual & Motion Signature | Audio Signature |
|---|---|---|---|
| 1 | **Particles** | Thousands of drifting particles swirling into typography/shapes; camera pushes through depth. | Soft whoosh, low synth swell |
| 2 | **Liquid Morph** | Glossy organic blob morphing seamlessly between icons, charts, and checkmarks; zero hard cuts. | Soft bubbly, fluid pops |
| 3 | **Holographic** | Iridescent color-shifting 3D geometry in dark space with floating thin spec labels. | Airy shimmering, glassy chimes |
| 4 | **Neon Glow** | Glowing neon tubes drawing paths on dark textured surfaces with subtle electrical flicker. | Electric buzz, punchy sub-beat |
| 5 | **Wireframe 3D** | Technical white/accent 3D wireframe assembling part-by-part with orbiting camera & callout lines. | Crisp mechanical clicks, servo whir |
| 6 | **Glassmorphism** | Frosted translucent cards (`backdrop-filter: blur`) floating in 3D space with soft shadows. | Gentle ambient pads, soft glass taps |
| 7 | **Kinetic Typography** | Word-by-word beat-synced scaling, flipping, and slamming on high-contrast backgrounds. | Minimal rhythmic beat (110 BPM), snaps |
| 8 | **Isometric** | Miniature 3D isometric world where a glowing subject travels stop-to-stop as camera glides. | Playful plucks, tactile step ticks |
| 9 | **Clay 3D** | Soft tactile claymation surfaces with squash-and-stretch bouncy physics and warm lighting. | Tactile boings, muted footsteps |
| 10 | **ASCII Art** | Monospace terminal characters building shapes, anvils, and logos character-by-character on black. | Mechanical key switches, CRT hum |
| 11 | **Gradient Mesh** | Slowly flowing multi-point mesh gradients settling behind crisp editorial serif typography. | Warm piano chord, atmospheric swell |
| 12 | **Comic Book** | Multi-panel halftone layout with thick ink outlines, action text bubbles, and camera panel pans. | Punchy comic impacts, page snaps |
| 13 | **Split-Flap** | Mechanical airport departure board clattering through characters to reveal stats and milestones. | Frame-synced mechanical flap clatter |
| 14 | **Retro VHS** | 30fps scanlines, chroma bleed, tracking glitches, and chunky 80s chrome typography. | Analog tape hiss, synth jingle |
| 15 | **Halftone** | Printed magazine aesthetic with bold CMYK/duotone halftone dots and sliding page transitions. | Tactile paper rustle, page turns |
| 16 | **Bauhaus** | Primary geometric shapes (circles, squares, triangles) on a strict grid stacking into data charts. | Rhythmic percussion hit on every bar |
| 17 | **Pixel Art** | 8-bit/16-bit sprites, coin pickups, and level-up banners with crisp nearest-neighbor scaling. | 8-bit chiptune arpeggios |
| 18 | **Blueprint** | White technical CAD line drawings on deep blue grid with exploded views and dimension arrows. | Drafting pencil strokes, key clacks |
| 19 | **Art Deco** | Luxurious gold geometric symmetry and fan motifs drawing themselves on matte black. | Jazzy brass sting, upright bass |
| 20 | **Neo-Brutalism** | Chunky flat color blocks, thick black borders, hard offset drop shadows, and snappy slams. | Heavy thuds, sharp UI clicks |
