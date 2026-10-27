# IVAN'S ESCAPE
## Cinematic Animated-Series Opening
### Production Specification v2.0 · For OpenAI Codex

# 1. YOUR ASSIGNMENT

Create a 60-second cinematic animated-series opening titled **IVAN'S ESCAPE** using the existing Motion Studio framework.

This is an artwork-driven, science-fiction animated opening with the pacing and dramatic impact of a film trailer.

It must combine:

- Beautiful illustrated character frames and environment artwork.
- Deliberately composed cinematography.
- Layered 2D and 2.5D scenes.
- Selective image-plane 3D camera movement.
- Character pose replacement and implied animation.
- Precisely directed motion graphics.
- Motivated transitions and match cuts.
- Music-synchronized visual storytelling.

**The primary visual experience must come from moving, revealing, cutting between, and compositing authored illustrated frames.**

Do not construct a generic low-poly 3D film. Do not make a conventional lyric video. Do not create an animated slideshow.

You are a technical production assistant implementing a defined artistic direction, not an autonomous film director.

The storyboard, shot timings, asset requirements, camera choreography and effects are specified below.

Follow them rather than inventing alternative scenes.

---

# 2. EXISTING ENGINE: REUSE, DO NOT REBUILD

The Motion Studio engine has already been established.

First inspect its architecture and available components.

Reuse its existing:

- Remotion timeline and composition system.
- React and TypeScript structure.
- Asset manifests.
- Image layers.
- Parallax camera.
- Three.js image-plane stage.
- Character cel system.
- SVG motion graphics.
- Transitions.
- Audio cue support.
- Rendering configuration.

Do not create a second video engine or replace the existing technology stack.

Do not install additional dependencies without demonstrating an actual technical requirement.

Do not modify reusable engine components unless fixing a demonstrated issue or extending a specifically required capability.

All production-specific data belongs in:

```text
src/projects/ivans-escape/
public/projects/ivans-escape/
```

Adapt these paths if the existing studio uses equivalent directories.

This project must remain isolated so another production can reuse the engine unchanged.

---

# 3. VIDEO FORMAT

| Setting | Value |
|---|---|
| Title | Ivan's Escape |
| Production type | Animated-series opening |
| Duration | Exactly 60 seconds |
| Resolution | 1920 × 1080 |
| Aspect ratio | 16:9 |
| Frame rate | 30 fps |
| Total frames | 1800 |
| Visual style | Cinematic illustrated dystopian sci-fi |
| Music | User-supplied original track |
| Master composition | `IvansEscape` |
| Pilot composition | `IvansEscapePilot` |

The soundtrack is expected at:

`public/projects/ivans-escape/audio/track.mp3`

Do not fabricate, replace or regenerate this audio.

If the file is missing, support silent preview and report the missing asset.

If its actual duration differs from 60 seconds, report the discrepancy. Do not automatically stretch the audio or change the film duration.

---

# 4. THE STORY

Ivan is an ordinary man living in an artificial city.

He follows the same routine every day, unaware that his existence is governed by a programmed simulation.

During an ordinary walk, Ivan experiences a subtle anomaly: his reflection responds late.

He becomes conscious of the world around him.

When he deviates from his assigned routine, the system immediately replaces him with another identical Ivan.

Ivan discovers that he is disposable.

Instead of returning to his position, he attempts to escape.

The environment begins exposing its underlying structure. Streets become grids. Buildings split into illustrated geometric fragments. The simulation attempts to regain control.

Ivan reaches the world's edge and escapes through a fracture in reality.

The closing sequence reveals the title:

**IVAN'S ESCAPE**

The story must remain understandable even when watched without lyrics.

Do not add dialogue, subtitles explaining the story, secondary characters with new identities, or unrelated plot elements.

---

# 5. DIRECTOR'S VISUAL BIBLE

## 5.1 Artistic style

The film resembles an illustrated psychological science-fiction thriller.

Use:

- Atmospheric cinematic matte paintings.
- Detailed brutalist architecture.
- Strong perspective and believable scale.
- Painterly but structured surfaces.
- Controlled film grain.
- Deep shadows.
- Muted architectural colors.
- Selective red anomalies.
- Carefully staged character compositions.

Do not use:

- Generic low-poly 3D cities.
- Plastic-looking procedural characters.
- Colorful cyberpunk advertisements.
- Cartoon-like UI animation.
- Random glowing particles.
- Unmotivated neon decoration.
- Overly glossy 3D materials.
- Continuous glitch effects.

The world should initially appear convincingly real, although unnaturally symmetrical.

## 5.2 Color palette

| Role | Color |
|---|---|
| Deep shadow | `#0B1018` |
| Blue-black | `#172330` |
| Concrete | `#586A79` |
| Fog | `#B5C3C9` |
| Pale highlight | `#E6E9E6` |
| System anomaly | `#FF4D57` |
| Ivan's jacket | `#C76A4B` |
| Outside world | `#D5CEC1` |

Use the anomaly red sparingly during the intro.

Its presence increases after Ivan awakens.

The outside world must contrast sharply with the controlled simulation through its brighter, softer palette.

## 5.3 Main character

Ivan is a young adult man with:

- Short, slightly unkempt black hair.
- A faded burnt-orange jacket.
- Dark trousers.
- Worn off-white sneakers.
- Realistic stylized proportions.
- A reserved, understated appearance.

No futuristic armor, superhero clothing or elaborate accessories.

The same character design must be preserved across every illustration, pose and camera angle.

Do not use unrelated generated characters as substitutes for missing Ivan artwork.

## 5.4 Typography

Use:

- Space Grotesk for titles.
- IBM Plex Mono for system messages.

Bundle appropriately licensed font resources locally.

Permitted system labels include:

- `INITIALIZING IVAN_001`
- `WORLD READY`
- `ANOMALY DETECTED`
- `ENTITY REPLACED`
- `ROUTINE CONFLICT`
- `PERMISSION DENIED`
- `CONNECTION LOST`

Typography is part of the simulated world.

It should appear attached to people, locations or system events rather than as decorative lyrics floating over the screen.

---

# 6. ARTWORK-FIRST PRODUCTION

The artwork must be planned before polishing movement.

For each shot, define:

1. Background plate.
2. Distant environment layers.
3. Midground architecture.
4. Ground or road.
5. Character artwork.
6. Foreground objects.
7. Required masks.
8. Procedural motion graphics.
9. Camera movement.
10. Transition to the following shot.

Avoid using one flattened image containing every element.

When multiple layers originate from a single illustration, preserve visual alignment, lighting and perspective.

Hidden regions behind removed objects must be reconstructed when camera movement would expose them.

Every layer needs an explicit pivot, depth and intended movement.

## 6.1 Master environment assets

Create an asset manifest for these six environments.

### ENV01: City establishing view

A high-angle illustrated cityscape with immense repeating brutalist buildings, a straight central road, fog and strict symmetry.

Deliver as:
- Sky and haze.
- Distant city.
- Midground buildings.
- Near building silhouettes.
- Road network.
- Optional foreground roof details.

### ENV02: Everyday street

Ground-level symmetrical street with concrete apartment facades, identical windows, road markings and sidewalks.

Deliver as:
- Far background.
- Distant buildings.
- Main facades.
- Road and sidewalk.
- Foreground street objects.

### ENV03: Reflective building window

Large street-side reflective glass facade surrounded by concrete.

Deliver as:
- Concrete backing.
- Glass panel.
- Reflection layer.
- Glass highlights.
- Optional foreground edge.

Do not bake Ivan's reflection into the background.

### ENV04: Architectural corridor

An oppressive perspective corridor between towering concrete structures.

Deliver as:
- Distant end of corridor.
- Left architecture.
- Right architecture.
- Ground plane.
- Foreground architectural details.

### ENV05: Boundary of the world

A road extending toward a geometric termination point where the simulated environment ends.

Deliver as:
- Distant void.
- Road and ground.
- Architecture at the boundary.
- Grid artwork or texture.
- Separable boundary structures.

### ENV06: Outside world

An enormous empty natural-looking landscape with pale atmospheric haze and a distant horizon.

Deliver as:
- Sky.
- Far horizon.
- Ground.
- Atmospheric layer.

The outside world must feel quiet and spatially open.

Use illustrated backgrounds, not visible primitive 3D geometry.

## 6.2 Character artwork

Prepare the manifest for:

| ID | Character frame |
|---|---|
| CH01 | Ivan walking, profile pose A |
| CH02 | Ivan walking, profile pose B |
| CH03 | Ivan standing, rear view |
| CH04 | Ivan turning, three-quarter view |
| CH05 | Ivan frontal close-up |
| CH06 | Ivan foot close-up |
| CH07 | Ivan running, side view |

Character images must have transparent backgrounds.

Character pose frames should have consistent canvas alignment, scale, anatomy and anchor positions.

Reusing Ivan's exact artwork for duplicate characters is mandatory.

## 6.3 Asset generation limitations

Do not generate random AI artwork or search for unrelated stock images.

If approved artwork is not yet available:

- Create a clearly labeled placeholder.
- Maintain its intended canvas size and anchor.
- Add the artwork to the missing-assets manifest.
- Provide a precise visual production brief for creating it.
- Continue building the animatic using placeholders.

Do not claim placeholder visuals represent final cinematic quality.

No automatic calls to external image-generation APIs are authorized.

---

# 7. CINEMATIC ANIMATION SYSTEM

Use the least complicated rendering mode capable of achieving the intended shot.

### Flat 2D

For clocks, title cards, static close-ups, interface overlays and graphic transitions.

### Multiplane 2D

For streets, building fronts, character walking cycles, reflections and moderate camera movement.

### Image-plane 3D

For camera translation through separated architectural illustrations or environments requiring a stronger spatial effect.

Use Three.js only as an invisible spatial stage.

Do not generate procedural concrete buildings to replace illustrated architecture.

### Motion principles

Character movement:
- Intentional pose substitution.
- Short, directed position changes.
- Holds for dramatic emphasis.
- Editorial cuts to imply complex motion.

Camera movement:
- Deliberate pans and pushes.
- Layer-dependent parallax.
- Controlled re-framing.
- No constant floating camera.

Effects:
- SVG reveals.
- Masks.
- Illustrated image-strip displacement.
- Temporary localized digital artifacts.
- Layer opacity and geometric transformations.

Prefer hard cuts and motivated transitions over elaborate generic effects.

---

# 8. AUDIO AND TIMING

The soundtrack is the narrative backbone of the opening.

Fixed musical sections:

| Time | Section |
|---|---|
| 0:00–0:06 | Intro |
| 0:06–0:18 | Verse |
| 0:18–0:42 | Chorus |
| 0:42–0:54 | Instrumental / glitch bridge |
| 0:54–1:00 | Outro |

Relevant lyrics:

Intro:
"Loading the world for Ivan"

Verse:
"Daily routine is a script line"
"Walking the block in a set time"
"Glitched in the mesh I am awake now"
"Breaking the loop and I break out"

Chorus:
"Duplicate taking my spot"
"System is rigged it is flawed"
"Escape from this code"
"Over the edge on the road"
"Another Ivan is there"
"I do not care do not care"
"Escape from the grid"
"Breaking what they ever did"

Outro:
"Goodbye to this fake world"

These section times are confirmed production boundaries.

Individual vocal timings within the sections are provisional.

If audio is supplied, inspect its waveform and document the actual vocal phrases, drum accents and important transients.

Do not assume that every lyric occupies exactly three seconds.

Use the shot boundaries below as the approved structural edit.

Fine adjustments within a section may be proposed in a cue sheet, but do not change the overall section boundaries without approval.

---

# 9. FULL 60-SECOND STORYBOARD

Use exactly 19 principal shots.

All ranges below are half-open time intervals. End frames are exclusive.

## ACT I: CREATION

### SHOT 01 · SYSTEM BOOT
Time: 0:00–0:02
Frames: 0–59
Mode: Flat 2D

Visual:
- Black-blue background.
- Very faint procedural coordinate grid.
- Small `INITIALIZING IVAN_001` text positioned near the lower left.
- Thin loading bar beneath it.

Animation:
- Reveal grid during frames 0–10.
- Progress bar fills during frames 10–45.
- Text appears in short controlled steps.
- Fine tracking lines extend during frames 45–59.

Transition:
Match the final expanded grid to the geometry of the city.

No generic glitch preset.

### SHOT 02 · WORLD INITIALIZED
Time: 0:02–0:06
Frames: 60–179
Mode: Multiplane or image-plane 3D

Assets: ENV01.

Visual:
- Illustrated aerial city.
- Strong central road perspective.
- Distant architecture fading into atmospheric haze.
- Tiny red/orange marker indicating Ivan's location.

Camera:
- Push along the illustrated road's vanishing direction.
- Start scale approximately 1.00.
- End scale approximately 1.25.
- Apply subtle depth parallax to separated buildings.
- Keep the road's center as the visual anchor.

Graphics:
- Small tracking reticle.
- `WORLD READY`.
- `IVAN_001`.

Transition:
Hard match cut from aerial road alignment to the ground-level street in Shot 03.

Do not attempt a full top-down-to-ground 3D orbit using flat artwork.

## ACT II: ROUTINE AND AWAKENING

### SHOT 03 · DAILY ROUTINE
Time: 0:06–0:09
Frames: 180–269
Mode: Multiplane 2D

Assets: ENV02, CH01, CH02.

Composition:
- Ivan near horizontal center, feet grounded near the lower part of the frame.
- Four subdued commuter silhouettes in the background.
- Architectural facades and street details.
- One foreground street object.

Movement:
- Alternate CH01 and CH02 with approximately 12–15-frame pose holds.
- Keep Ivan nearly centered.
- Move the street environment horizontally to imply tracking.
- Foreground shifts faster than distant architecture.
- Commuters travel in perfectly regular paths.

The scene should feel unnaturally synchronized.

Transition:
Match a circular graphic or road marker to a clock face.

### SHOT 04 · PROGRAMMED TIME
Time: 0:09–0:12
Frames: 270–359
Mode: Flat 2D

Visual:
- Large centered mechanical-style clock.
- Dim procedural rings.
- Sparse timing annotations.

Movement:
- Clock hand completes one exact rotation.
- Slow camera push.
- Secondary markers tick in fixed increments.

Transition:
Sharp cut as the moving hand reaches its starting angle.

### SHOT 05 · REFLECTION ANOMALY
Time: 0:12–0:15
Frames: 360–449
Mode: Multiplane 2D

Assets: ENV03, CH03, CH04.

Composition:
- Ivan stands in front of a glass facade.
- His reflection is independently rendered.
- Reflected pedestrians remain visible.

Movement:
- Camera pushes slowly.
- Ivan turns his head.
- His reflection responds eight frames later.
- Ivan stops moving.
- Background activity continues.

Graphics:
- A restrained red tracking bracket appears around the reflection.
- `ANOMALY DETECTED`.

Effect:
One localized two-frame reflection displacement.

Transition:
Hard cut to foot close-up.

### SHOT 06 · FIRST DISOBEDIENCE
Time: 0:15–0:18
Frames: 450–539
Mode: Flat / multiplane

Assets: Road artwork from ENV02, CH06.

Visual:
- Close-up of Ivan's foot.
- White painted path boundary.
- Dark pavement.
- Subtle tracking marker.

Movement:
- Foot waits inside the line.
- Foot crosses the boundary from frames 480–509.
- At frame 510, a thin red fracture appears.
- Fracture extends outward during the remaining 30 frames.
- Camera zooms approximately 1.00 to 1.18.

Transition:
Hard cut at frame 540.

The new composition must resemble Shot 03, but something is wrong.

## ACT III: REPLACEMENT AND ESCAPE

### SHOT 07 · DUPLICATE
Time: 0:18–0:21
Frames: 540–629
Mode: Multiplane 2D

Assets: Reuse ENV02, CH01, CH02, CH03.

Reconstruct the exact initial framing of Shot 03.

A duplicate Ivan now walks along the original route.

The real Ivan stands partially visible in the foreground.

Hold the composition long enough for the viewer to recognize that Ivan has been replaced.

Apply one brief localized distortion to the duplicate.

Transition:
Expand the duplicate's tracking rectangle into a warning-panel composition.

### SHOT 08 · SYSTEM CONFLICT
Time: 0:21–0:24
Frames: 630–719
Mode: Multiplane + SVG

Assets: ENV02, duplicate Ivan.

Keep the existing street visible.

Display:
- `ROUTINE CONFLICT`
- `ENTITY REPLACED`

Three warning rectangles track architectural regions and Ivan's duplicate.

Briefly displace one facade strip by approximately 20 pixels, then restore it.

Do not corrupt the entire image.

Transition:
Align a vertical architecture edge with the beginning of a wireframe in Shot 09.

### SHOT 09 · CODE EXPOSED
Time: 0:24–0:27
Frames: 720–809
Mode: Multiplane / image-plane

Assets: ENV04, CH07.

Ivan runs through a narrow illustrated architectural corridor.

Separate the main facade artwork into approximately 12 vertical image regions.

Move selected facade regions sideways while revealing simple structural vector lines beneath them.

The vector lines should look like hidden underlying construction geometry.

Camera tracks Ivan through the corridor.

Transition:
A revealed perspective line connects to the road in the next shot.

### SHOT 10 · END OF THE ROAD
Time: 0:27–0:30
Frames: 810–899
Mode: Multiplane

Assets: ENV05, CH03 or CH07.

The road ends at an impossible geometric boundary.

Ivan approaches and slows.

Camera follows the road toward its termination.

Road sections separate through masks and image fragments.

Do not show Ivan falling.

Transition:
Very short black cut to a close-up.

### SHOT 11 · ANOTHER IVAN
Time: 0:30–0:33
Frames: 900–989
Mode: Flat 2D

Assets: CH05.

Ivan's face fills much of the frame.

A second identical portrait appears beside him, initially resembling a reflection.

The second portrait shifts independently.

Camera pushes inward.

No new character design.

Transition:
Direct cut to Ivan walking away.

### SHOT 12 · REFUSAL
Time: 0:33–0:36
Frames: 990–1079
Mode: Multiplane 2D

Assets: ENV05, CH03.

Ivan moves toward the boundary without looking back.

A red system reticle attempts to track him.

At approximately frame 1035, the reticle loses its target and separates into six small line fragments.

Ivan continues moving.

Do not shake the camera.

Transition:
Reticle fragments visually align with the world-grid lines.

### SHOT 13 · GRID DISINTEGRATION
Time: 0:36–0:39
Frames: 1080–1169
Mode: Image-based spatial compositing

Assets: ENV05 ground illustration, CH03.

The illustrated road surface is divided into a 6 × 9 grid of image regions.

Regions detach in outward waves centered around Ivan.

Move them using transform and depth offsets.

Use their original artwork textures.

Do not replace them with colored cubes.

Camera advances toward the opening.

Transition:
The remaining strips expand into architectural fragments.

### SHOT 14 · REALITY FRACTURE
Time: 0:39–0:42
Frames: 1170–1259
Mode: Image-plane 3D

Assets: Separated architecture from ENV04/ENV05.

Buildings divide into large illustrated planes and image fragments.

Left-side architecture moves outward to the left.

Right-side architecture moves outward to the right.

A pale opening becomes visible behind Ivan.

Camera pulls backward slightly, revealing the scale of the fracture.

No explosions or generic particle effects.

Transition:
Cut into the instrumental section.

## ACT IV: THE SYSTEM COLLAPSES

### SHOT 15 · CORRUPTED MEMORY
Time: 0:42–0:45
Frames: 1260–1349
Mode: Montage

Reuse shots 03, 05, 07 and 11.

Create four approximately 0.75-second fragments in this order:
1. Routine.
2. Reflection.
3. Duplicate.
4. Close-up.

Use small cropping changes and localized frame corruption.

The final timing must be adjusted against the actual musical transients.

Avoid prolonged flashing.

### SHOT 16 · INFINITE IVANS
Time: 0:45–0:48
Frames: 1350–1439
Mode: Multiplane / image-plane

Reuse the same Ivan silhouette.

Begin with three visible copies.

Increase to approximately eighteen arranged in staggered depth rows.

Move the virtual camera backward, making the duplicate field appear larger.

Fade the figures into simplified outlines.

Use image-based character planes, not new 3D models.

### SHOT 17 · ARCHITECTURAL COLLAPSE
Time: 0:48–0:51
Frames: 1440–1529
Mode: Image-plane 3D

Reuse illustrated environment sections from ENV01, ENV04 and ENV05.

Construct three large image-based spatial planes.

Move and rotate them along separately keyed paths.

A small camera roll of up to approximately eight degrees is permitted.

Use a restrained RGB edge split only around moving structural boundaries.

Do not introduce external postprocessing libraries.

### SHOT 18 · EXIT
Time: 0:51–0:54
Frames: 1530–1619
Mode: Image-plane / geometric mask

The broken world opens along a vertical central seam.

Behind the opening is ENV06, the pale outside world.

Ivan's rear silhouette appears in the gap.

The opening expands until the artificial architecture leaves the frame.

All system warnings disappear.

Transition:
Cut to the outside-world wide shot at frame 1620.

## ACT V: FREEDOM AND TITLE

### SHOT 19 · GOODBYE / SERIES TITLE
Time: 0:54–1:00
Frames: 1620–1799
Mode: Multiplane + title graphics

Assets: ENV06, CH03.

**Frames 1620–1721 (0:54–0:57.4)**

- Wide pale landscape.
- Ivan facing away from the camera.
- No system graphics.
- Slow camera pullback.
- Very subtle atmospheric movement.

This shot should feel quieter than everything preceding it.

**Frames 1722–1778 (0:57.4–0:59.3)**

Cut to a dark title composition.

Display:

`IVAN'S ESCAPE`

Large, centered, cinematic typography.

A thin red fracture line travels across or beneath the title as a final thematic callback.

No excessive typography animation.

**Frames 1779–1799 (0:59.3–1:00)**

Title disappears.

Small centered monospace message:

`IVAN_001 : CONNECTION LOST`

Cut to black at the end.

---

# 10. CAMERA AND TRANSITION CONTROL

All camera animations must use explicit frame-based keyframes.

Use deterministic interpolation.

Support:
- Position X/Y.
- Scale.
- Pivot.
- Optional image-plane camera translation.
- Controlled camera roll.
- Depth-specific parallax.

### Editing rules

Do not apply transition presets automatically.

Hard cuts are the default.

Only use:
- Geometry match cuts.
- Masked world-boundary reveals.
- Short, localized corruption.
- Directed camera movement across layers.
- Carefully timed montage edits.

### Motion restrictions

- No random shakes.
- No generic spin transitions.
- No decorative zoom bursts.
- No repeated full-screen glitch presets.
- No arbitrary particles.
- No unnecessary 3D geometry.
- No automatic character morphing.
- No constant text movement.
- No autonomous animations running outside the Remotion timeline.

Every visual effect must have a defined narrative reason.

---

# 11. DEVELOPMENT DELIVERABLES

Create these production-specific documents:

### `PRODUCTION_BIBLE.md`

Contains the story, art direction, character design, color palette, camera rules and title identity.

### `SHOTLIST.md`

Contains all 19 shots, their timing, visual compositions, camera specifications, effects and transitions.

### `ASSET_MANIFEST.md`

Lists required source images, transparent elements, masks, expected dimensions and target scenes.

### `ARTWORK_BRIEFS.md`

Gives precise visual requirements for each missing illustration.

Each artwork brief should specify:
- Subject and environment.
- Camera viewpoint.
- Composition.
- Lighting direction.
- Perspective and vanishing point.
- Palette.
- Elements excluded from the image.
- Layer separation requirements.
- Transparency.
- Intended output size.

Do not use vague instructions such as "make it cinematic" without concrete visual details.

### `AUDIO_CUES.md`

Contains verified vocal onsets and musical cues when the track is available.

Otherwise clearly marks provisional timings.

### `IMPLEMENTATION_REPORT.md`

Documents completed shots, placeholder assets, tests and known limitations.

---

# 12. IMPLEMENTATION STAGES

This specification defines the entire film, but the present coding authorization is limited.

## Stage A: Production assembly

1. Inspect the existing Motion Studio.
2. Create the new production directory.
3. Register the project composition.
4. Load the audio if available.
5. Define all 19 shots and their frame ranges.
6. Create asset manifests and scene-layer configuration.
7. Generate storyboard placeholders where source art is missing.
8. Assemble a complete 60-second rough animatic.

The animatic must clearly communicate all 19 scenes.

It may use placeholder illustrations, but must not hide missing artwork behind generic effects.

Do not polish the entire 60 seconds yet.

## Stage B: First six finished compositions

Build Shots 01–06, covering frames 0–539.

Implement:
- Boot graphics.
- Layered city camera movement.
- Illustrated walking-cycle system.
- Clock.
- Delayed reflection.
- Boundary fracture.
- The prescribed transitions.

Use supplied real artwork where available.

If essential artwork is absent, complete the technical layout using correctly sized placeholders and mark the affected shot as awaiting artwork.

Do not replace missing illustrations with visible procedural 3D models.

## Stage C: Validation

Confirm:

- Total film is exactly 1800 frames.
- Pilot is exactly 540 frames.
- Audio placement is correct when supplied.
- All 19 storyboard shots appear at their assigned positions.
- Rendering modes work.
- Layer parallax is visually observable.
- Character assets retain consistent anchors.
- Reflections and duplicates use the same source artwork.
- No unintentional empty or black frames.
- Effects are deterministic.
- Image-plane camera movement does not expose flat planes at unacceptable angles.
- Full-frame crops do not expose missing background pixels.
- No external network resources are required to render.
- Existing generic Motion Studio demos still work.

Create a pilot contact sheet using timestamps:

`0:01, 0:04, 0:07.5, 0:10.5, 0:13.5, 0:16.5`

Create a full-story animatic contact sheet showing at least one representative frame from every principal shot.

## Stage D: Export

Export:
- A 60-second rough animatic at reduced rendering scale.
- An 18-second pilot at reduced scale.
- Contact sheets.
- Production documentation.

Do not perform repeated full-resolution exports during development.

Only attempt a full-quality pilot render when its required source artwork is actually available and the composition is approved.

---

# 13. QUALITY GATES

Evaluate the following before proposing continuation.

### Narrative test

Can a viewer understand that Ivan:
1. Exists in a controlled system.
2. Detects an anomaly.
3. Is replaced.
4. Refuses to return.
5. Escapes?

### Composition test

Does every shot have:
- A clear focal point?
- A purposeful camera angle?
- Consistent subject scale?
- Readable silhouettes?
- A reason to transition to the next shot?

### Artwork test

Do layers:
- Share a consistent illustration style?
- Have compatible perspectives?
- Have compatible lighting?
- Preserve clean transparent edges?
- Remain visually convincing during camera moves?

### Motion test

Are:
- Camera moves smooth and intentional?
- Character pose changes deliberate?
- Parallax depths convincing?
- Effects localized and timed?
- Cuts synchronized with the soundtrack when available?

### Technical test

Does the project render without:
- Missing textures?
- Runtime errors?
- Broken image paths?
- Unexpected 3D primitive objects?
- Frame-dependent inconsistencies?
- Uncontrolled external assets?

Distinguish technical completion from artistic completion.

A render with placeholder artwork is a working animatic, not a finished cinematic film.

---

# 14. CREDIT AND SCOPE PROTECTION

Do not:

- Search for new animation frameworks.
- Rewrite Motion Studio.
- Build a new timeline editor.
- Generate a large number of speculative assets.
- Research unrelated visual references.
- Add unrequested features.
- Install dependencies for effects that can be produced with current tools.
- Render the full film repeatedly at production resolution.
- Make changes to multiple unrelated shots while debugging one problem.
- Claim unfinished placeholder visuals are final.

If an image, audio file or other required source material is missing, identify it explicitly.

Prefer completing the correctly structured animatic over inventing substitute material.

Focus on reusable assets, coherent editing, cinematic shot composition and precise motion.

---

# 15. FINAL INSTRUCTIONS

Your immediate responsibility is to produce:

1. The full 60-second animatic.
2. The first 18-second implemented pilot.
3. A comprehensive artwork requirement manifest.
4. A complete 19-shot production blueprint.
5. Render previews and verification results.

Do not implement the remaining finished sequences until the pilot has been reviewed.

**Stop at that milestone and report the work completed.**

The ultimate film should feel like the opening of a professionally directed sci-fi animated series, produced primarily through illustrated frames, camera movement, cinematic compositing, selective motion graphics and careful editing.

The film's sophistication must come from visual direction and storytelling rather than the number of effects.

**Make every frame intentional.**