# Prioritized artwork and reuse requirements

**No new illustrated source has been approved or created in this pass.** These are planning IDs, not registered runtime files. Priorities:0 identity/resources;1 first 18 seconds;2 chorus;3 collapse/outside;4 optional salvage. First-six-second details: FIRST_06_SECONDS_BRIEFS.md. Conditional salvages do not block the new pilot art.

## Four categories

1. New required art: one consistent illustrated Ivan, performances, native street/glass/corridor/boundary plates, foregrounds and atmosphere.
2. Existing reusable material: original music, local fonts/title identity; pale outside is a conditional low-detail underpainting, not approved final art.
3. Existing art needing separation: optional old glass/city salvage, with exact source paths and style/hidden-pixel limits. It does not replace required new pilot paintings.
4. Code-only graphics: text, clock, brackets, masks, grounding and title. No primitive world substitutes.

## MODEL · priority 0 · new-art-required

One original Ivan identity: front, true side, rear; short tousled black hair, orange jacket, charcoal shirt, dark trousers, worn off-white sneakers. Angular drawn planes, controlled line weight, two to three shadow values, retained human proportions; no imported reference character traits.

- **Scope / status:** foundation / missing-new-illustrated-art.
- **Deliverables:** front/side/rear: each 2400x3600 RGBA, feet (1200,3360); face/color/seam sheet: 2400x2400; pose registration metadata.
- **Dependencies:** None.
- **angle:** Orthographic-like eye-level character study; same focal length across views.
- **expression:** Neutral, observant; no exaggerated anime eyes.
- **lighting:** Neutral cool upper-left key with separately documented cold back-rim variant.
- **garment:** Jacket hem, pockets, cuffs and sneaker wear locked once.
- **alpha:** No ground or sky; transparent body plus registered forelock/front-panel/hem pieces.
- **anchor:** Standing feet (1200,3360); hair hinge (1200,520); panel (1260,1180); hem (1200,2360).
- **approval:** Approve the model before other character art. Existing photographic Ivan is identity/proportion reference only..

## HERO · priority 1 · new-art-required

Single Ivan in front three-quarter controlled stance, shoulders quiet, weight planted. Cold raking edge identifies short hair, jacket collar and hands; retained orange on a narrow lit jacket plane. Not a cast lineup or copied hero pose.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** 2400x3600 registered body; same-canvas forelock, front jacket panel, hem, contact matte; cool rim-light matte.
- **Dependencies:** MODEL.
- **angle:** Slight low angle, front three-quarter; 50mm-like restrained perspective.
- **expression:** Composed, emotionally withheld.
- **lighting:** Cold slot back-left; restrained upper-left face fill; no crimson yet.
- **garment:** Still hem, relaxed cuffs; no cape-like billowing.
- **alpha:** No street, cast shadow, UI or reflected figures.
- **anchor:** Feet (1200,3360); group holds same root for wide and medium crop.

## EYE · priority 1 · new-art-required

Original Ivan's neutral eye/temple as a deliberately drawn insert; closed and open eyelid cels from the same viewpoint. Leave left third as transparent negative space for initialization copy.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** 2 registered 2400x1350 RGBA cels; pupil/light registration matte.
- **Dependencies:** MODEL.
- **angle:** Tight front three-quarter eye insert, no lens distortion.
- **expression:** Neutral awakening, not realization or anger.
- **lighting:** One narrow cool-white catchlight; shadow mass controls the rest.
- **garment:** None visible.
- **alpha:** No background, words, glowing iris or UI baked in.
- **anchor:** Pupil (1440,620) in both cels.

## SHOE · priority 1 · new-art-required

Ivan's exact worn off-white sneaker and dark cuff: planted, lifted heel/toe travel, landed past boundary. Ground belongs to the separate environment.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** 3 registered 2400x1350 RGBA cels; ankle/contact metadata.
- **Dependencies:** MODEL.
- **angle:** Low side view pointing screen right; complete shoe and cuff.
- **expression:** Intentional controlled step.
- **lighting:** Cool upper-left; optional crimson edge matte for C13 only.
- **garment:** Small cuff compression authored in cels, not stretched.
- **alpha:** Exclude pavement, road paint, shadow and fracture.
- **anchor:** Ankle hinge (840,650); planted sole guide y1100; contact marks per cel.

## REAR · priority 1 · new-art-required

Registered runtime separation of the approved rear master. Preserve hair/jacket construction; do not invent a second model.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** 2400x3600 body/hair/hem RGBA plates.
- **Dependencies:** MODEL.
- **angle:** Eye-level rear, neutral camera.
- **expression:** Face unseen, controlled stance.
- **lighting:** Cool upper-left and clean narrow edge.
- **garment:** Quiet folds, hem split with filled backing.
- **alpha:** No environment or floor.
- **anchor:** Feet (1200,3360).

## WALK · priority 1 · new-art-required

Four complementary side-walking cels: left contact, passing, right contact, opposite passing. Same body length and identity; duplicates reuse these exact files.

- **Scope / status:** first-18 / missing-new-illustrated-art.
- **Deliverables:** 4 x 2400x3600 RGBA registered body cels; per-cel forelock and hem pieces, sole contact markers.
- **Dependencies:** MODEL, SHOE.
- **angle:** Strict right-facing side view; no camera drift between cels.
- **expression:** Unnaturally neutral.
- **lighting:** Cool upper-left key, gentle dark fill.
- **garment:** Small sleeve/hem offsets painted per phase.
- **alpha:** No ground, cast shadow, route line or background.
- **anchor:** Pelvis (1200,1900); per-cel foot positions documented rather than force-normalizing an airborne shoe.

## LOOKBACK · priority 1 · new-art-required

Two rear three-quarter poses: head neutral then a decisive look over left shoulder. Keep planted body/root identical; head silhouette changes through authored cel substitution.

- **Scope / status:** first-18 / missing-new-illustrated-art.
- **Deliverables:** 2 x 2400x3600 RGBA body/head cels; matching forelock/front-panel/hem pieces.
- **Dependencies:** MODEL.
- **angle:** Rear three-quarter, face revealed toward camera left.
- **expression:** Suspicion held in eyes and brow, closed mouth.
- **lighting:** Cold upper-left; separate narrow crimson bounce after awakening.
- **garment:** Torso/jacket stay planted during head turn; hem settles once.
- **alpha:** No glass, reflection, scenery or UI.
- **anchor:** Feet (1200,3360), body root and neck attachment invariant.

## REFLECTION · priority 1 · new-art-required

Two physically matched mirror-camera views of LOOKBACK poses for a planar glass surface; separate from glass and actual Ivan. Use exact approved identity, not an independently designed face.

- **Scope / status:** first-18 / missing-new-illustrated-art.
- **Deliverables:** 2 x 2400x3600 RGBA mirror-view cels; pair correspondence sheet.
- **Dependencies:** MODEL, LOOKBACK, ENV_GLASS.
- **angle:** Opposing camera derived from glass normal; frontal-to-three-quarter response.
- **expression:** Corresponds to real pose, delayed eight frames.
- **lighting:** Same scene key with darker cool glass response, not unrelated lighting.
- **garment:** Same cuffs, pocket layout, hem and planted feet.
- **alpha:** No painted glass or duplicated crowd.
- **anchor:** Feet (1200,3360); glass-space contact metadata.

## HAND · priority 1 · new-art-required

Two expressive hand/cuff inserts: restrained half-clench then reaching fingers. Anatomy remains human and understated; later reach is towards an existing world fracture, not a new control device.

- **Scope / status:** first-18 / missing-new-illustrated-art.
- **Deliverables:** 2 x 2400x1350 RGBA cels; registered jacket cuff piece.
- **Dependencies:** MODEL.
- **angle:** Wrist enters lower left, fingers foreshorten toward upper right.
- **expression:** Tension releases into deliberate choice.
- **lighting:** Cool key; separate crimson bounce region usable after realization.
- **garment:** Orange cuff bends through authored second cel.
- **alpha:** No pavement, button, weapon, interface or fracture.
- **anchor:** Wrist (360,1060); palm center (1120,760); fingertip region around (1900,540).

## REALIZE · priority 2 · new-art-required

Three chest/head cels of Ivan recognizing replacement: neutral attention, narrowed eyes, settled resolve. Draw emotion through brow, mouth tension and jaw, not character morphing.

- **Scope / status:** chorus / missing-new-illustrated-art.
- **Deliverables:** 3 x 2400x2400 RGBA close-ups; forelock and collar tips separated.
- **Dependencies:** MODEL, LOOKBACK.
- **angle:** Three-quarter front, slightly below eye line; pupils share guide.
- **expression:** Recognition then resolve, no scream.
- **lighting:** Hard cool key with growing crimson rim from scene right.
- **garment:** One collar tip lifts and settles on declared cue.
- **alpha:** No backdrop or graphic text.
- **anchor:** Neck base (1200,1980); eye-line y900; pupil marks in metadata.

## RUN · priority 2 · new-art-required

Four expressive running drawings: compression, drive, extended stride, reach-forward recovery. One clear diagonal line of action; hands/knees overlap in depth without duplicating limbs.

- **Scope / status:** chorus / missing-new-illustrated-art.
- **Deliverables:** 4 x 2400x3600 RGBA three-quarter drive cels; 4 x 2400x3600 RGBA matched side-run cels (separate camera sequence); per-cel forelock/front-panel/hem/sleeve pieces; later C20 native 2400x1350 run push-off inserts: plant/compression/release.
- **Dependencies:** MODEL, WALK.
- **angle:** Low three-quarter drive; a registered side-view subset for C21.
- **expression:** Determined; eyes lead travel.
- **lighting:** Directional cool key and crimson trailing rim.
- **garment:** Jacket tails lag movement, never become a cape.
- **alpha:** No speed lines, scenery or foot shadows.
- **anchor:** Pelvis (1200,1900); head and foot trajectory marks per cel.

## LEAP · priority 3 · new-art-required

Three original silhouettes: launch, suspended forward reach, arrival. Ivan clears the broken road into the opening; never a fall into the abyss.

- **Scope / status:** instrumental / missing-new-illustrated-art.
- **Deliverables:** 3 x 2400x3600 RGBA silhouettes with narrow jacket identity plane.
- **Dependencies:** MODEL, RUN.
- **angle:** Low side three-quarter, diagonal forward/upward travel.
- **expression:** Readable through line of action, face largely shadowed.
- **lighting:** Pale exit backlight and restrained crimson trailing edge.
- **garment:** Hem/short hair lag the leap with no extra accessories.
- **alpha:** No gap, rocks, road, streaks or background.
- **anchor:** Pelvis (1200,1800); takeoff sole and reach-hand guides.

## FINAL_HERO · priority 3 · new-art-required

One memorable rear three-quarter Ivan stance, weight relaxed after escape. Quiet negative space and warm edge light; no borrowed costume, weapon or sunset battlefield composition.

- **Scope / status:** outro / missing-new-illustrated-art.
- **Deliverables:** 2400x3600 RGBA body/forelock/hem; warm edge-light matte.
- **Dependencies:** MODEL, REAR, OUTSIDE.
- **angle:** Slight low wide camera; Ivan faces open space.
- **expression:** Calm posture, face barely visible.
- **lighting:** Warm diffuse left/back key; soft cool shadow.
- **garment:** Single gentle settle, no autonomous wind loop.
- **alpha:** No horizon, sun disk, sky or system graphics.
- **anchor:** Feet (1200,3360).

## ENV_STREET · priority 1 · new-art-required

Illustrated controlled street replacing photographic surface treatment. Asymmetric light but repeated brutalist masses. One-point perspective supports deep foreground Ivan and regular commuter recession.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** 7 co-registered 3200x1800 plates: continuous backing, sky, distant architecture, middle facades, ground, near pier, light/haze; artist overlap/vanishing-point guide; native 2400x1350 pavement detail for C03/C13 (not enlarged from full scene).
- **Dependencies:** None.
- **angle:** Low pedestrian viewpoint, VP (1600,780), level horizon; central 1920x1080 crop at (640,360).
- **lighting:** Cold upper-left raking key; pale vertical light slot behind hero; no orange sky.
- **separation:** Paint hidden background behind every moving edge; no people, UI, shadows or highlights fixed to characters.

## ENV_GLASS · priority 1 · new-art-required

Illustrated glass/concrete facade matched to street scale. Reflection backing is empty of people. Clean mullions and controlled reflections give the delayed face a readable stage.

- **Scope / status:** first-18 / missing-new-illustrated-art.
- **Deliverables:** 3200x1800 continuous concrete/glass backing; glass-only interior, highlight pass, frame occluder; registered opening matte guide.
- **Dependencies:** ENV_STREET.
- **angle:** Near-frontal glass, opening rectangle source (940,500)-(2340,1320).
- **lighting:** Same cold key; crimson anomaly reflected only on explicit later cue.
- **separation:** No baked Ivan/crowd reflections; frame must render above reflection and below actual Ivan.

## ENV_CORRIDOR · priority 2 · new-art-required

Illustrated strong-perspective corridor with large negative-space route and surfaces that can peel away.

- **Scope / status:** chorus / missing-new-illustrated-art.
- **Deliverables:** 3200x1800 far end, left wall, right wall, ground, near pier, filled backing; 12 facade-region guide masks.
- **Dependencies:** ENV_STREET.
- **angle:** One-point perspective at source (1600,760); modest tilt only through authored composition.
- **lighting:** Cold directional key; crimson intrusion at exposed structures.
- **separation:** No characters or wireframe baked in; complete occluded surfaces.

## ENV_BOUNDARY · priority 2 · new-art-required

Terminated illustrated road and system void with separate architecture. Scale and geometry connect the route to the exit; no fall scene.

- **Scope / status:** chorus / missing-new-illustrated-art.
- **Deliverables:** 3200x1800 road-free void, intact road, left/right structural slabs; 54 perspective road texture regions derived later.
- **Dependencies:** ENV_CORRIDOR.
- **angle:** VP (1600,760); termination edge and hero contact strip marked.
- **lighting:** Pale slot behind structure; increasing crimson edge.
- **separation:** Void reconstructed behind the full removed road; no generic 3D rubble.

## FOREGROUND · priority 1 · new-art-required

Actual street scenery used as occluders and wipes: near concrete pier, narrow railing edge, low bollard; four anonymous commuter silhouettes in receding single-file depth.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** separate 3200x1800 registered architecture alpha plates; 4 x 1200x1800 anonymous commuter RGBA cutouts; contact and overlap guide; lens-near pier face: 2400x1350 RGBA with opaque core x24..2376, y24..1326; painted scenery, not a black card.
- **Dependencies:** ENV_STREET.
- **angle:** Matches street camera; no ornamental props or reference costume detail.
- **lighting:** Shadowed foreground planes plus consistent cold rim.
- **separation:** No sky baked into edges; build enough offscreen extension for whole-frame wipe.

## ATMOSPHERE · priority 1 · new-art-required

Painted cold haze ribbons and light diffusion, predominantly transparent, subtle tone variation rather than particles.

- **Scope / status:** first-6 / missing-new-illustrated-art.
- **Deliverables:** 3200x1800 far haze, middle haze, near light veil RGBA; later warm veil matched to OUTSIDE; not needed before pilot art review.
- **Dependencies:** ENV_STREET.
- **angle:** Same horizon registration; no perspective-breaking cloud wall.
- **lighting:** Desaturated cold light, no orange glow.
- **separation:** No scenery, characters, hard black edges or baked film grain.

## STREAKS · priority 2 · new-art-required

Few purposeful hand-painted tapered motion streaks following the run/leap direction; ink/brush texture consistent with the new drawings.

- **Scope / status:** chorus / missing-new-illustrated-art.
- **Deliverables:** 2400x1350 RGBA forward/trailing variants.
- **Dependencies:** RUN.
- **angle:** Authored direction matches limb/scene diagonals.
- **lighting:** Muted pale/cool strokes and one limited crimson variant.
- **separation:** No full-frame glitch, sparks, lightning motifs or random particle field.

## OUTSIDE · priority 3 · reuse-existing

Existing pale outside painting can be retained as a low-detail underpainting, subject to style approval. Preserve warm spacious atmosphere, no copied fiery reference backdrop.

- **Scope / status:** instrumental-outro / file-present-approval-as-noted.
- **Deliverables:** public/projects/ivans-escape/source/env06-outside.png; existing outside-sky/ground layers.
- **Dependencies:** None.
- **separation:** Existing layers need overlap/hidden-pixel review before additional camera travel.
- **approval:** Candidate, not claimed approved. If retained texture fails the illustrated model/style test, redraw matched 3200x1800 sky/horizon/ground rather than enlarging it again..
- **sourceNativeSize:** 1672x941.

## LEGACY_GLASS_SEPARATION · priority 4 · needs-layer-separation

Legacy glass may supply limited desaturated texture/geometry reference after highlights, pane, reflected architecture and concrete are separated. Not a required first 18 source.

- **Scope / status:** optional-salvage / candidate-only-unseparated-for-new-use.
- **Deliverables:** public/projects/ivans-escape/source/env03-glass.png.
- **Dependencies:** None.
- **approval:** Optional candidate only; separation does not turn photographic art into approved illustrated art. ENV_GLASS redraw remains the planned pilot dependency..

## LEGACY_CITY_SEPARATION · priority 4 · needs-layer-separation

Legacy city architecture may supply a tiny distant texture crop in collapse only after isolated facade edge/matte and hidden backing are repaired.

- **Scope / status:** optional-salvage / candidate-only-unseparated-for-new-use.
- **Deliverables:** public/projects/ivans-escape/source/env01-city.png.
- **Dependencies:** None.
- **approval:** Not a new camera-ready panorama. Reject if styling, resolution or perspective conflicts; new corridor/boundary art already covers required narrative..

## AUDIO · priority 0 · reuse-existing

Preserve supplied music bytes and frame-zero placement; structural windows authoritative, phrase onsets unverified.

- **Scope / status:** all / file-present-approval-as-noted.
- **Deliverables:** public/projects/ivans-escape/audio/track.mp3; assets/Music/Ivan Is Loading vocal.txt.
- **Dependencies:** None.
- **approval:** Supplied source, technically available. 60.6301875s decoded; picture remains 1800f..

## FONTS · priority 0 · reuse-existing

Existing local Space Grotesk/IBM Plex Mono and OFL notices are ready for the same title/system identity.

- **Scope / status:** all / file-present-approval-as-noted.
- **Deliverables:** public/projects/ivans-escape/fonts/SpaceGrotesk.ttf; public/projects/ivans-escape/fonts/IBMPlexMono-Regular.ttf; local OFL notices.
- **Dependencies:** None.
- **approval:** Existing functional local typography; no network font dependency..

## GRAPHICS · priority 1 · code-graphics

Editable initialization text, sparse coordinate guide, mechanical clock, tracking bracket, warning labels. No lyric captions.

- **Scope / status:** first-6 / planned-code-no-new-package.
- **Deliverables:** Native SVG/React through project-specific FilmGraphics and existing GraphicOverlay.
- **Dependencies:** FONTS.

## PILOT_MASKS · priority 1 · code-graphics

Registered glass-window clip, scenery-wipe alpha, route paint and one pavement fracture. Boundaries follow approved illustrated landmarks, not guessed old masks.

- **Scope / status:** first-18 / planned-code-no-new-package.
- **Deliverables:** Native SVG/CSS masks in scene coordinates.
- **Dependencies:** ENV_STREET, ENV_GLASS, FOREGROUND.

## DESTRUCTION_MASKS · priority 2 · code-graphics

Vector region boundaries and opacity/depth cues reveal original illustrated road/architecture pixels, plus exit seam.

- **Scope / status:** chorus-instrumental / planned-code-no-new-package.
- **Deliverables:** 12 facade/54 road-region SVG boundaries; whole-world seam mask; outline derived from approved REAR alpha for C34.
- **Dependencies:** ENV_CORRIDOR, ENV_BOUNDARY, REAR.

## SHADOWS · priority 1 · code-graphics

Restrained contact shadow mattes bound to supplied foot contact guides. Secondary grounding only; not substitute artwork.

- **Scope / status:** first-6 / planned-code-no-new-package.
- **Deliverables:** Native SVG soft elliptical contact masks.
- **Dependencies:** MODEL, ENV_STREET.

## TITLE · priority 3 · code-graphics

IVAN'S ESCAPE and restrained crimson fracture followed by IVAN_001 : CONNECTION LOST; preserve final message boundary.

- **Scope / status:** outro / planned-code-no-new-package.
- **Deliverables:** Native SVG/text using existing local fonts.
- **Dependencies:** FONTS.

