# Revised full-film editorial plan

**Proposed only.** 40 shots / 39 internal cuts, [0,1800) at 30 fps. Music section and final title/message boundaries remain fixed. The current 19-shot implementation is untouched. Exact fields and signal confidence are in [EDITORIAL_MANIFEST.json](EDITORIAL_MANIFEST.json).

Each cut identifies framing, focal point, required source art, pose, separation, camera, secondary motion, transition and narrative purpose. This is a written animatic plan, not a rendered animatic.

## C01 — Identifier / eye · [0,22) · 0.000–0.733s

- **Section / framing:** Intro / insert.
- **Focal point:** Pupil right third; dark left for initialization.
- **Artwork:** EYE, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Closed to open neutral eye.
- **Layers:** Eye/skin strip, lid, light matte, code.
- **Camera:** Locked Camera2D.
- **Secondary motion:** Open at local 8; text6/14; no loop.
- **Next cut:** Hard catchlight-to-light-slot cut.
- **Purpose:** Initialize a person rather than a UI screen.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.

## C02 — The assigned place · [22,73) · 0.733–2.433s

- **Section / framing:** Intro / wide.
- **Focal point:** Single rim-lit Ivan right third; anonymous figures recede diagonally.
- **Artwork:** HERO, ENV_STREET, FOREGROUND, ATMOSPHERE, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Planted front three-quarter silhouette.
- **Layers:** Far light, city, ground, commuters, body/hair/hem, near pier.
- **Camera:** Camera2D x0→18, zoom1, pivot 1280/440; parallax .05/.2/.45/1/1.4.
- **Secondary motion:** Hold 12f; one hem settle≤1.2 degrees.
- **Next cut:** Hard foot detail cut at 2.42s signal candidate.
- **Purpose:** Establish control through character scale and silhouette.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 0.74s; RMS rise 0.0702. Exact vocal synchronization unverified.

## C03 — Scheduled footfall · [73,96) · 2.433–3.200s

- **Section / framing:** Intro / insert.
- **Focal point:** Off-white sole meets a route mark.
- **Artwork:** SHOE, ENV_STREET, GRAPHICS, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Lifted to planted shoe cels.
- **Layers:** Pavement, route paint, shadow, shoe/cuff.
- **Camera:** Locked approved detail crop.
- **Secondary motion:** One cel change at local 8, cuff settles4f.
- **Next cut:** Route vertical matches jacket seam.
- **Purpose:** Set up routine before later disobedience.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 2.42s; RMS rise 0.18609. Exact vocal synchronization unverified.

## C04 — Identity assigned · [96,138) · 3.200–4.600s

- **Section / framing:** Intro / medium.
- **Focal point:** Ivan face and orange collar on right.
- **Artwork:** HERO, ENV_STREET, ATMOSPHERE, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Same hero stance cropped from approved master.
- **Layers:** Backing/haze, body, forelock, front panel, code.
- **Camera:** Camera2D x0→-12, zoom1.
- **Secondary motion:** Forelock settles2 px/1.2 degrees after local 18.
- **Next cut:** Eyeline hard cut into street depth.
- **Purpose:** Register the face without generic zooming.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C05 — World handed over · [138,180) · 4.600–6.000s

- **Section / framing:** Intro / wide.
- **Focal point:** Large rear shoulder left; route remains readable.
- **Artwork:** REAR, ENV_STREET, FOREGROUND, ATMOSPHERE (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Neutral rear silhouette, foreground crop.
- **Layers:** Sky, distant/mid city, ground, near hero, pier.
- **Camera:** Camera2D x0→48, zoom1→1.04, pivot 960/420; depth-separated layers.
- **Secondary motion:** Hem lags2 px once then holds.
- **Next cut:** Hard shoulder/stride match at 180.
- **Purpose:** Introduce city through character-centred depth.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C06 — Programmed stride · [180,225) · 6.000–7.500s

- **Section / framing:** Verse / medium.
- **Focal point:** Side-profile Ivan nearly fixed at centre.
- **Artwork:** WALK, ENV_STREET, FOREGROUND, ATMOSPHERE, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Four-cel walk: contact/pass/contact/pass.
- **Layers:** Far/mid street, shadow, body and matching pieces, near edge.
- **Camera:** Camera2D x0→42; hero held near1000/650.
- **Secondary motion:** Exposures12/12/12/9f; parts change with cels.
- **Next cut:** Route ring matches clock circle.
- **Purpose:** Establish perfectly regular bodily movement.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.

## C07 — Mechanical time · [225,270) · 7.500–9.000s

- **Section / framing:** Verse / insert.
- **Focal point:** SVG clock behind illustrated shoulder edge.
- **Artwork:** GRAPHICS, ENV_GLASS, HERO (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Static shoulder crop.
- **Layers:** Glass backing, clock face/hands, near jacket crop.
- **Camera:** Locked framing.
- **Secondary motion:** One full hand rotation over 44f; secondary ticks9f.
- **Next cut:** Circle-to-street-point hard cut.
- **Purpose:** Condense the clock motif into a decisive detail.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C08 — Everyone moves correctly · [270,309) · 9.000–10.300s

- **Section / framing:** Verse / wide.
- **Focal point:** Ivan and commuters recede along long street axis.
- **Artwork:** REAR, ENV_STREET, FOREGROUND, ATMOSPHERE (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Rear stance held; regular commuter poses.
- **Layers:** Street, repeated figures, near physical pier.
- **Camera:** Camera2D x0→-32; pier crosses right-to-left independently.
- **Secondary motion:** Commuter paths exact; Ivan unnaturally held.
- **Next cut:** Scenery pass [297,321) hides hard cut 309.
- **Purpose:** Show repetition and motivate move to glass.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C09 — Reflection agrees · [309,341) · 10.300–11.367s

- **Section / framing:** Verse / medium.
- **Focal point:** Real Ivan foreground-left; reflection inside glass-right.
- **Artwork:** LOOKBACK, REFLECTION, ENV_GLASS, ATMOSPHERE, PILOT_MASKS, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Real/reflected neutral cels agree.
- **Layers:** Empty reflected architecture, clipped reflection group, highlights/frame, real figure.
- **Camera:** Camera2D x0→20, zoom1, pivot 960/440.
- **Secondary motion:** Head/body held; highlight shifts with registered glass.
- **Next cut:** Hard matched crop on same glass axis.
- **Purpose:** Establish correct reflection before it fails.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 10.3s; RMS rise 0.15483. Exact vocal synchronization unverified.

## C10 — The lag · [341,390) · 11.367–13.000s

- **Section / framing:** Verse / close-up.
- **Focal point:** Real cheek/eye and reflected face share frame.
- **Artwork:** LOOKBACK, REFLECTION, ENV_GLASS, PILOT_MASKS, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Real turns360; reflection368; recognition hold.
- **Layers:** Near head/forelock, glass-space reflected head, frame and narrow highlight.
- **Camera:** Hold to local 18; x0→-24 local 19–28; settle-20 by 36; zoom1.
- **Secondary motion:** Paired cel change19/27; crimson after mismatch.
- **Next cut:** Hard face-to-hand gesture cut.
- **Purpose:** Show awakening through exactly8f delay and performance.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 11.38s; RMS rise 0.08346. Exact vocal synchronization unverified.

## C11 — Tension becomes choice · [390,430) · 13.000–14.333s

- **Section / framing:** Verse / insert.
- **Focal point:** Fingertips and orange cuff from lower left.
- **Artwork:** HAND, ENV_GLASS, ATMOSPHERE (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Half-clench releases into reach.
- **Layers:** Dark glass crop, cuff, hand, crimson bounce matte.
- **Camera:** Locked detail crop.
- **Secondary motion:** Two cels at 0/18; cuff settles6f then holds.
- **Next cut:** Gesture direction matches look-back.
- **Purpose:** Externalize choice without captions.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C12 — Look against the flow · [430,480) · 14.333–16.000s

- **Section / framing:** Verse / medium.
- **Focal point:** Ivan right third; foreground cuts left.
- **Artwork:** LOOKBACK, ENV_STREET, FOREGROUND, ATMOSPHERE, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Head turn with planted feet.
- **Layers:** Mid facades, body/cel-bound pieces, far commuters, near pier.
- **Camera:** Camera2D x0→-36 local 8–16, settle-30 by 28; no shake.
- **Secondary motion:** Forelock≤3 degrees; hem≤4 px; hold last 12f.
- **Next cut:** Hard cut down to shoe retaining screen-right intent.
- **Purpose:** Break symmetry through motivated reaction.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 14.32s; RMS rise 0.23471. Exact vocal synchronization unverified.

## C13 — First disobedience · [480,540) · 16.000–18.000s

- **Section / framing:** Verse / insert.
- **Focal point:** Sole crosses route; fracture stays on pavement.
- **Artwork:** SHOE, ENV_STREET, GRAPHICS, PILOT_MASKS, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Inside/lift/land at 480/492/509.
- **Layers:** Ground, paint below foot, shadow, shoe/cuff, pavement fracture.
- **Camera:** Camera2D x0→36, zoom1.02, pivot 1200/820.
- **Secondary motion:** Land509; fracture510–539; final 6f dramatic hold.
- **Next cut:** Hard foot/stride cut at 540 to replacement.
- **Purpose:** Make deliberate refusal visible.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C14 — Replacement · [540,583) · 18.000–19.433s

- **Section / framing:** Chorus / medium.
- **Focal point:** Same C06 walking position; stopped real Ivan occludes edge.
- **Artwork:** WALK, REAR, ENV_STREET, FOREGROUND, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Exact C06 walking files plus held rear figure.
- **Layers:** C06 layers plus closer real Ivan and bracket.
- **Camera:** Exact C06 initial camera/root; hold 12f then 20 px track.
- **Secondary motion:** Same walk cels; one 2f local offset.
- **Next cut:** Hard neutral-eye insert at 583.
- **Purpose:** Reveal replacement through identical source and framing.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.

## C15 — Duplicate remains calm · [583,616) · 19.433–20.533s

- **Section / framing:** Chorus / insert.
- **Focal point:** Neutral eye source from C01 now unresponsive.
- **Artwork:** EYE, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Open eye held.
- **Layers:** Exact same eye image, light matte, local red bracket.
- **Camera:** Locked extreme crop.
- **Secondary motion:** Bracket closes once; eyelid held.
- **Next cut:** Hard face-direction cut at 616.
- **Purpose:** Contrast replacement calm with real reaction.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 19.44s; RMS rise 0.0854. Exact vocal synchronization unverified.

## C16 — Refuse the route · [616,649) · 20.533–21.633s

- **Section / framing:** Chorus / wide.
- **Focal point:** Real Ivan left of route while duplicate continues.
- **Artwork:** LOOKBACK, WALK, ENV_STREET, FOREGROUND, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Real look-back held; duplicate walking.
- **Layers:** Street, exact duplicate, stopped nearer Ivan, pier.
- **Camera:** Camera2D lateral60 px; far.15/near1.5.
- **Secondary motion:** Only duplicate/crowd move.
- **Next cut:** Pier occlusion cuts to close-up.
- **Purpose:** System proceeds without the real Ivan.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 20.54s; RMS rise 0.21036. Exact vocal synchronization unverified.

## C17 — Realization · [649,688) · 21.633–22.933s

- **Section / framing:** Chorus / close-up.
- **Focal point:** Eyes/jaw against crimson-lit architecture.
- **Artwork:** REALIZE, ENV_GLASS, ATMOSPHERE (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Attention→recognition→resolve, 3 cels.
- **Layers:** Face, forelock, collar, backing, narrow light matte.
- **Camera:** Deliberate24 px recoil and settle.
- **Secondary motion:** Collar3 degrees after change; final 8f hold.
- **Next cut:** Hard edge match to system label.
- **Purpose:** Turn story through expressive drawing.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 21.64s; RMS rise 0.06719. Exact vocal synchronization unverified.

## C18 — System verdict · [688,731) · 22.933–24.367s

- **Section / framing:** Chorus / insert.
- **Focal point:** ENTITY REPLACED attached to actual glass.
- **Artwork:** GRAPHICS, ENV_GLASS, HAND (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Static cuff edge optional.
- **Layers:** Facade texture, clipped labels, sleeve edge.
- **Camera:** Locked architectural axis.
- **Secondary motion:** One20 px local strip shift2f then restore.
- **Next cut:** Vertical frame edge matches corridor.
- **Purpose:** Communicate response without a full-screen UI.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 22.92s; RMS rise 0.18415. Exact vocal synchronization unverified.

## C19 — Break into a run · [731,781) · 24.367–26.033s

- **Section / framing:** Chorus / wide.
- **Focal point:** Low-angle diagonal drive across deep route.
- **Artwork:** RUN, ENV_CORRIDOR, FOREGROUND, ATMOSPHERE, STREAKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Compression/drive/extended-stride cels.
- **Layers:** Ground/far wall, piers, action body/pieces, painted streaks, near pier.
- **Camera:** Camera2D lead120 px; far.15/mid.55/near1.4.
- **Secondary motion:** 3–4 cels; jacket lag3–5f with explicit damping.
- **Next cut:** Physical pier wipe cuts to push-off.
- **Purpose:** Increase intensity through pose and viewpoint.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 24.38s; RMS rise 0.19345. Exact vocal synchronization unverified.

## C20 — Push-off · [781,825) · 26.033–27.500s

- **Section / framing:** Chorus / insert.
- **Focal point:** Sneaker compresses then leaves ground.
- **Artwork:** SHOE, RUN, ENV_CORRIDOR, STREAKS, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Plant/compression/release details.
- **Layers:** Ground, contact shadow, shoe/cuff, painted trailing stroke.
- **Camera:** Short40 px lead, scale locked.
- **Secondary motion:** 3 cels; shadow follows lift/contact.
- **Next cut:** Shoe trajectory matches side run.
- **Purpose:** Make acceleration tactile.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 26.02s; RMS rise 0.11114. Exact vocal synchronization unverified.

## C21 — Run through architecture · [825,868) · 27.500–28.933s

- **Section / framing:** Chorus / medium.
- **Focal point:** Torso and forward hand dominate.
- **Artwork:** RUN, ENV_CORRIDOR, FOREGROUND, STREAKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Four-pose registered side-run subset.
- **Layers:** Far corridor, ground, body/pieces, near pillar.
- **Camera:** Camera2D lateral160 px; body at lead third.
- **Secondary motion:** One sequence; final 4f held; no endless motion.
- **Next cut:** Real-scenery occlusion to exposed structure.
- **Purpose:** Sustain energy without full deformation.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 27.5s; RMS rise 0.08928. Exact vocal synchronization unverified.

## C22 — Code behind world · [868,918) · 28.933–30.600s

- **Section / framing:** Chorus / wide.
- **Focal point:** Oversized shoulder foreground; facades uncover structure.
- **Artwork:** RUN, ENV_CORRIDOR, DESTRUCTION_MASKS, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Drive/reach action crop.
- **Layers:** Shoulder, 12 illustrated facade regions, ground, wireframe underlay, far end.
- **Camera:** Camera3DStage z1180→1080, x-70→20; modest plane angles.
- **Secondary motion:** Hair/hem one keyed reaction; facade waves deterministic.
- **Next cut:** Road-line match to termination insert.
- **Purpose:** Expose the system while retaining a character anchor.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 28.94s; RMS rise 0.10911. Exact vocal synchronization unverified.

## C23 — Road ends · [918,962) · 30.600–32.067s

- **Section / framing:** Chorus / insert.
- **Focal point:** Illustrated road edge above painted void.
- **Artwork:** ENV_BOUNDARY, DESTRUCTION_MASKS, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** No figure in insert; no falling pose.
- **Layers:** Road-edge texture, void backing, matte.
- **Camera:** Controlled50 px crop advance, no plunge.
- **Secondary motion:** Edge separates20 px then holds.
- **Next cut:** Hard cut to doubled portrait.
- **Purpose:** Present obstacle and pause momentum.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 30.6s; RMS rise 0.09982. Exact vocal synchronization unverified.

## C24 — Another Ivan · [962,1012) · 32.067–33.733s

- **Section / framing:** Chorus / close-up.
- **Focal point:** Exact approved portrait used twice.
- **Artwork:** REALIZE, ENV_GLASS, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Same resolve image duplicated.
- **Layers:** PortraitA, identicalB, backing, bracket fragments.
- **Camera:** Camera2D zoom1→1.03 and 36 px lateral reframe.
- **Secondary motion:** Second drifts after 18; exact file identity retained.
- **Next cut:** Eyeline cut to turn away.
- **Purpose:** Complete replacement realization without a new lookalike.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 32.08s; RMS rise 0.09214. Exact vocal synchronization unverified.

## C25 — Refusal · [1012,1062) · 33.733–35.400s

- **Section / framing:** Chorus / medium.
- **Focal point:** Ivan turns away and faces boundary.
- **Artwork:** REAR, LOOKBACK, ENV_BOUNDARY, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Look-back→rear; no later backward glance.
- **Layers:** Hero/pieces, road, structures, void, reticle.
- **Camera:** Steady50 px lead; no recoil.
- **Secondary motion:** Hem settles once; reticle loses tracking at declared cue.
- **Next cut:** Hand-direction match.
- **Purpose:** Make choice calm inside increasing intensity.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 33.72s; RMS rise 0.12784. Exact vocal synchronization unverified.

## C26 — Reject bracket · [1062,1110) · 35.400–37.000s

- **Section / framing:** Chorus / insert.
- **Focal point:** Hand passes tracking geometry without pressing a device.
- **Artwork:** HAND, GRAPHICS, ENV_BOUNDARY (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Two reaching-hand cels.
- **Layers:** Void crop, hand/cuff, 6 reticle fragments.
- **Camera:** Locked scale;24 px lead.
- **Secondary motion:** Six authored fragments; cuff follow-through6f.
- **Next cut:** Line fragments match perspective grid.
- **Purpose:** Give agency without inventing a mechanism.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C27 — Grid disintegration · [1110,1160) · 37.000–38.667s

- **Section / framing:** Chorus / wide.
- **Focal point:** Ivan grounded on contact strip as road separates.
- **Artwork:** REAR, ENV_BOUNDARY, DESTRUCTION_MASKS, GRAPHICS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Rear held/weight-shift stance, not falling.
- **Layers:** Void, 54 road texture regions, hero/contact strip, edge masks.
- **Camera:** Camera3DStage z1160→1040, x0→40.
- **Secondary motion:** Deterministic wave offsets; contact region preserved.
- **Next cut:** Negative-space cut to closer action pose.
- **Purpose:** Turn environment failure into escape pressure.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 37s; RMS rise 0.10968. Exact vocal synchronization unverified.

## C28 — Reach through fracture · [1160,1214) · 38.667–40.467s

- **Section / framing:** Chorus / medium.
- **Focal point:** Foreshortened reaching Ivan before separating slabs.
- **Artwork:** RUN, ENV_BOUNDARY, STREAKS, DESTRUCTION_MASKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Reach-forward running drawing.
- **Layers:** Near arm/body, architecture, pale slot, painted streaks.
- **Camera:** Camera3DStage x-40→70, z1200→1100; rotations≤8 degrees.
- **Secondary motion:** Hair/hem lag3–5f; final 8f pose hold.
- **Next cut:** Hand match-cut into fracture detail.
- **Purpose:** Keep action character-led.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 38.66s; RMS rise 0.12735. Exact vocal synchronization unverified.

## C29 — Edge becomes exit · [1214,1260) · 40.467–42.000s

- **Section / framing:** Chorus / insert.
- **Focal point:** Fingertips approach pale vertical seam.
- **Artwork:** HAND, ENV_BOUNDARY, DESTRUCTION_MASKS, ATMOSPHERE (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Same reach source recropped.
- **Layers:** Fingers/cuff, illustrated torn edge, pale backing, veil.
- **Camera:** Locked then 16 px advance.
- **Secondary motion:** Hand held8f; seam widens by cue.
- **Next cut:** Crimson line cuts to memory at 1260.
- **Purpose:** Connect escape and personal memory.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 40.48s; RMS rise 0.23577. Exact vocal synchronization unverified.

## C30 — Memory routine · [1260,1288) · 42.000–42.933s

- **Section / framing:** Instrumental / medium.
- **Focal point:** Actual C06 composition.
- **Artwork:** WALK, ENV_STREET, FOREGROUND (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Exact source walk pose.
- **Layers:** Actual approved C06 layers.
- **Camera:** Frozen source state, 6 px crop offset.
- **Secondary motion:** One localized2f displacement.
- **Next cut:** Exact hard cut 1288.
- **Purpose:** Recall assigned role.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.

## C31 — Memory reflection · [1288,1302) · 42.933–43.400s

- **Section / framing:** Instrumental / close-up.
- **Focal point:** Actual C10 glass detail.
- **Artwork:** LOOKBACK, REFLECTION, ENV_GLASS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Exact paired turn cels.
- **Layers:** Actual glass-group mask/layers.
- **Camera:** Reframe crop, no new drawing.
- **Secondary motion:** Held source state, one local edge offset.
- **Next cut:** Exact hard cut 1302.
- **Purpose:** Recall first failure.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 42.92s; RMS rise 0.04537. Exact vocal synchronization unverified.

## C32 — Memory replacement · [1302,1330) · 43.400–44.333s

- **Section / framing:** Instrumental / medium.
- **Focal point:** Actual C14 original screen position.
- **Artwork:** WALK, REAR, ENV_STREET (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Exact replacement image.
- **Layers:** Actual C14 layers.
- **Camera:** Small tighter crop.
- **Secondary motion:** Held real figure against walking source pose.
- **Next cut:** Exact hard cut 1330.
- **Purpose:** Recall disposability.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 43.4s; RMS rise 0.10631. Exact vocal synchronization unverified.

## C33 — Memory self · [1330,1350) · 44.333–45.000s

- **Section / framing:** Instrumental / close-up.
- **Focal point:** Actual C24 doubled portrait.
- **Artwork:** REALIZE, ENV_GLASS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Exact approved portrait twice.
- **Layers:** Same portrait alphas/backing.
- **Camera:** Locked asymmetric crop.
- **Secondary motion:** Dramatic hold, no flashing.
- **Next cut:** Hard cut to repeated rear silhouettes.
- **Purpose:** Turn memory into multiplication.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 44.32s; RMS rise 0.18842. Exact vocal synchronization unverified.

## C34 — Infinite Ivans · [1350,1410) · 45.000–47.000s

- **Section / framing:** Instrumental / wide.
- **Focal point:** Copies stagger in depth, not horizontal cast lineup.
- **Artwork:** REAR, ENV_BOUNDARY, DESTRUCTION_MASKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Exact rear source 3→18 copies.
- **Layers:** Depth rows, same alpha-derived outline, void, road fragments.
- **Camera:** Camera3DStage z1100→1400.
- **Secondary motion:** Bodies fade into their own outline at declared frames.
- **Next cut:** Foreground silhouette edge wipe.
- **Purpose:** Show interchangeability through the same design.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C35 — Architectural collapse · [1410,1483) · 47.000–49.433s

- **Section / framing:** Instrumental / medium.
- **Focal point:** Large Ivan with 3 independently moving structural masses.
- **Artwork:** RUN, ENV_CORRIDOR, ENV_BOUNDARY, STREAKS, DESTRUCTION_MASKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Held drive/reach pose.
- **Layers:** Foreground hero, 3 texture planes, void, local edge strokes.
- **Camera:** Camera3DStage x-40→80, z1200→1280; separate modest rotations.
- **Secondary motion:** One hair/hem reaction; restrained local RGB boundary split.
- **Next cut:** Slab occludes cut into launch.
- **Purpose:** Keep hero dominant as world fails.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C36 — Leap into opening · [1483,1530) · 49.433–51.000s

- **Section / framing:** Instrumental / wide.
- **Focal point:** Clear forward/upward silhouette toward pale seam.
- **Artwork:** LEAP, ENV_BOUNDARY, STREAKS, DESTRUCTION_MASKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Launch/suspended-reach/arrival; never an abyss fall.
- **Layers:** Silhouette/pieces, road edge, void, pale slit, streak.
- **Camera:** Camera2D lead100 px; authored root arc, no physics.
- **Secondary motion:** 3 cel holds; jacket follow-through; final 4f held.
- **Next cut:** Silhouette crosses seam on mask match.
- **Purpose:** Earn action peak with a readable destination.
- **Timing evidence:** measured-RMS-rise-edit-candidate at 49.44s; RMS rise 0.1329. Exact vocal synchronization unverified.

## C37 — Exit · [1530,1620) · 51.000–54.000s

- **Section / framing:** Instrumental / wide.
- **Focal point:** World halves leave Ivan in warm opening.
- **Artwork:** LEAP, FINAL_HERO, ENV_BOUNDARY, OUTSIDE, DESTRUCTION_MASKS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Arrival→planted final stance.
- **Layers:** Illustrated halves, warm sky/horizon/ground, silhouette, mild veil.
- **Camera:** Camera3DStage z1180→1120, central axis.
- **Secondary motion:** One settle; no warnings or white-flash loop.
- **Next cut:** Clean cut 1620 to expanded negative space.
- **Purpose:** Release pressure and clarify escape.
- **Timing evidence:** authored-performance-or-composition-hold. Exact vocal synchronization unverified.

## C38 — Outside hero hold · [1620,1722) · 54.000–57.400s

- **Section / framing:** Outro / wide.
- **Focal point:** Ivan left third faces warm expansive right-hand space.
- **Artwork:** FINAL_HERO, OUTSIDE, ATMOSPHERE, SHADOWS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** Planted rear three-quarter stance.
- **Layers:** Sky, horizon, ground, atmosphere, hero/pieces, shadow.
- **Camera:** Almost locked48 px pullback/reframe; no UI.
- **Secondary motion:** One gentle settle then stillness for 102f.
- **Next cut:** Hard title cut 1722.
- **Purpose:** Leave a memorable peaceful silhouette.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.

## C39 — Title · [1722,1779) · 57.400–59.300s

- **Section / framing:** Outro / close-up.
- **Focal point:** IVAN'S ESCAPE centred in quiet negative space.
- **Artwork:** TITLE, FONTS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** No character.
- **Layers:** Dark field, local type, thin crimson fracture.
- **Camera:** Locked.
- **Secondary motion:** Fracture reveals once 24f.
- **Next cut:** Replace with message 1779.
- **Purpose:** Keep series identity clear.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.

## C40 — Connection lost · [1779,1800) · 59.300–60.000s

- **Section / framing:** Outro / insert.
- **Focal point:** Small centred IVAN_001 : CONNECTION LOST.
- **Artwork:** TITLE, FONTS (see [asset requirements](ASSET_REQUIREMENTS.md)).
- **Pose:** No character.
- **Layers:** Dark field and local monospace.
- **Camera:** Locked.
- **Secondary motion:** No motion.
- **Next cut:** Cut to black1800; no added frames.
- **Purpose:** Close the system story.
- **Timing evidence:** locked-structural-or-title-boundary. Exact vocal synchronization unverified.
