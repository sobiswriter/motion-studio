# Layer, camera and transition specification

Shoe register clarification: initial ankle root is(280,680), not920px. Source ankle(840,650) and planted toe(2100,1040) map the toe to x1120 at rest and1460 after340px travel, crossing the route near1220. This numerical guide is checked separately from the future actual-art alpha test.

PILOT_LAYOUT.json is **planning data**, not MotionProject input. It is intentionally unimported. Missing sources are requirements, never fake runtime files. Numeric positions are proposed art registers and require visual calibration after approved drawings exist.

## Coordinate convention

Film 1920×1080 at 30 fps. Environment3200×1800 at(-640,-360); source VP(1600,780) becomes(960,420). Source backing must be filled under movers, with 48 px useful inset. Only opaque continuous plates can receive cropSafe. Alpha scenery is not a full-frame safeguard.

All first 13 cuts use flat 2D/multiplane 2D. depthGuide records staging intent only; actual 2D layer order is explicit order. Positive camera x/y moves art negative, exactly as current Camera2D. Keys are local integer frames, complete x/y/zoom/pivot values and deterministic smoothstep. The cross-cut pier pass is explicitly linear.

C02 exact far-to-near factors: backing.05, distant.2, mid.45, ground.8, hero1, near1.4; camera(0,0,1,1280,440) at 0 and(18,0,1,1280,440) at 50. Hero root(1300,940),480×720, foot anchor[.5,3360/3600]. Full cut-by-cut keys, pose cues and coordinates are in PILOT_LAYOUT.json.

## Articulated pieces, without engine rebuilding

The engine has no parentId/bone-rig API. Use a project-only React container under existing Camera2D/coordinated parallax. Its origin is root minus(anchor×display dimensions). Reuse Artwork/CharacterCel for body and full-canvas registered forelock/panel/hem images.

Scale source hinge positions into the display rectangle: hair(1200,520), front panel(1260,1180), hem(1200,2360) on 2400×3600. Body and part cels switch together. Parts inherit parent root movement once; their small keyed offset/rotation is local. Do not independently trim PNGs or double-add camera motion.

Walk/run use pelvis(1200,1900); per-pose foot and hinge metadata handles attachment changes. Keep an entire character cel held in a spatial shot when independent articulation adds no useful performance. No new general rig, physics engine or dependency is needed.

## Glass parent clip

Proposed ENV_GLASS opening source(940,500)-(2340,1320) maps to screen(300,140)-(1700,960). The artist supplies exact matte and frame alpha.

Reflections live inside a registered 3200×1800 glass parent with a native CSS/SVG mask. Reflection, highlights and frame share camera/parallax registration. Frame is above reflections; actual Ivan remains outside the mask and above frame.

Do **not** assign a full-scene window mask directly to an individual character image: current ArtworkLayer.mask scales its mask to the image dimensions, distorting the scene-space clip. A small project React group applies the mask in the correct coordinate space using existing platform features.

C10: real neutral 0→turn 19/global 360; reflected neutral 0→turn 27/global 368. Camera holds to18, reaches x-24 at 28, settles-20 at 36. Crimson enters after visible mismatch. These are planned performance cues, not a verified vocal onset.

## Physical foreground wipe across309

Use project-level native Sequence[297,321) above both adjacent scenes. Its actual painted pier face is 2400×1350 at y=-135, with opaque core x24..2376/y24..1326. Screen-space linear x keys: local 0=2640,12=-240,23=-2880.

At global 309 the core spans x-216..2136 and fully covers1920 px. Conceal the exact hard cut there. Full coverage is specified only for[309,310), not an invented multi-frame opaque hold. Inspect actual art alpha at 308/309/310 before accepting the wipe. No black-card/primitive substitute.

The pass remains continuous across the cut and adds no frames. Do not set ShotDefinition.transition unless its required overlap is intentionally declared; the proposed editorial spans are contiguous.

## Shoe crossing

C13 shoe cels global 480/492/509, local 0/12/29. Root x offsets0/140/340, lift-36 at 12, landed y0 by 29; ankle anchor(840,650) on 2400×1350. The route stripe is drawn before shoe; contact matte follows the actual sole guide.

Fracture starts510/local 30 and reveals30f over pavement below the landed sole, never over shoe pixels. Check actual alpha-derived toe bounds after delivery: start clearly inside, land visibly beyond the line. C03 uses the same source set to establish the earlier programmed step.

## Existing components used later

Use Camera3DStage only for C22/C27/C28/C34/C35/C37, where perspective travel, real plane separation or depth rows justify it. Existing depthMotion/rotation3D and unlit transparent artwork planes suffice. Keep proposed visible rotations about 8° or less and inspect for flat backs/edge-on exposure. No physics or postprocessing.

SVG wireframe sits behind illustrated facade regions. Road pieces keep approved texture pixels, a reconstructed void behind them and a stable hero contact strip. Three planes use preauthored alpha; the engine's2D geometric per-layer masks are not supported on 3D. Exit uses registered illustrated halves/whole-world mask above warm layers.

## Future verification after review

Inspect native crop resolution, common light, hidden backing, hinge attachments, grounding, glass boundaries, actual wipe coverage, exact 8f lag, deliberate cel exposures and repeated/nonmonotonic frame sampling. None of these new-art visual tests is claimed passed before the required art exists.
