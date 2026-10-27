import type {
  ArtworkLayer,
  Camera2DState,
  Keyframe,
  ShotDefinition,
} from "../../engine/types";

export type ProductionShot = {
  id: string;
  title: string;
  startFrame: number;
  duration: number;
  mode: ShotDefinition["mode"];
  packet: string;
  assets: string[];
  composition: string;
  camera: string;
  effects: string;
  transitionOut: string;
};

export const productionShots: ProductionShot[] = [
  {
    id: "SH01",
    title: "SYSTEM BOOT",
    startFrame: 0,
    duration: 60,
    mode: "flat-2d",
    packet: "P01",
    assets: [],
    composition:
      "Black-blue field; faint coordinate grid; lower-left initialization and loading bar.",
    camera: "Locked 2D, x=0 y=0 zoom=1; pivot 960,540.",
    effects:
      "Grid 0–10; controlled text steps; bar 10–45; tracking lines 45–59.",
    transitionOut:
      "Geometry match cut at 60: grid road guides align to ENV01; no overlap.",
  },
  {
    id: "SH02",
    title: "WORLD INITIALIZED",
    startFrame: 60,
    duration: 120,
    mode: "multiplane-2d",
    packet: "P01",
    assets: ["ENV01"],
    composition:
      "High oblique aerial city; symmetrical masses; straight central road, haze; tiny Ivan marker.",
    camera:
      "2D road-axis push: local 0→119, zoom 1→1.25, x=y=0, pivot 960,300; layer-specific parallax.",
    effects: "Anchored tracking reticle, WORLD READY, IVAN_001. No orbit.",
    transitionOut:
      "Hard road-axis match cut at 180 to ground-level ENV02; preserve center x=960.",
  },
  {
    id: "SH03",
    title: "DAILY ROUTINE",
    startFrame: 180,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P02",
    assets: ["ENV02", "CH01", "CH02", "CROWD"],
    composition:
      "Ivan centered with grounded feet; four subdued synchronized commuters; foreground object.",
    camera:
      "Lateral tracking; Ivan nearly held at center, environment moves; foreground faster.",
    effects:
      "Walking cels hold 12–15 frames; perfectly regular commuter paths.",
    transitionOut: "Circular road/graphic marker matches clock face at 270.",
  },
  {
    id: "SH04",
    title: "PROGRAMMED TIME",
    startFrame: 270,
    duration: 90,
    mode: "flat-2d",
    packet: "P02",
    assets: [],
    composition:
      "Large centered mechanical-style vector clock, dim rings, sparse timing annotations.",
    camera: "Slow controlled push; no drift.",
    effects:
      "Clock hand completes exactly one rotation; secondary markers tick in fixed increments.",
    transitionOut: "Sharp cut at 360 when hand returns to starting angle.",
  },
  {
    id: "SH05",
    title: "REFLECTION ANOMALY",
    startFrame: 360,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P03",
    assets: [
      "ENV03",
      "CH03",
      "CH04",
      "CH03-R",
      "CH04-R",
      "CROWD",
      "MSK03_GLASS",
    ],
    composition:
      "Ivan before glass; independently staged reflection and reflected commuters.",
    camera: "Slow push toward reflection; maintain shared glass perspective.",
    effects:
      "Head turn reflection delayed exactly 8 frames; one local 2-frame displacement; restrained ANOMALY DETECTED bracket.",
    transitionOut: "Hard cut at 450 to foot close-up.",
  },
  {
    id: "SH06",
    title: "FIRST DISOBEDIENCE",
    startFrame: 450,
    duration: 90,
    mode: "flat-2d",
    packet: "P03",
    assets: ["ENV02", "CH06", "MSK06_PATH"],
    composition:
      "Worn sneaker, white path boundary, dark pavement and subtle marker.",
    camera: "Zoom 1→1.18; hold foot/line focal relationship.",
    effects:
      "Cross boundary at global 480–509; red fracture begins at 510 and extends to 539.",
    transitionOut: "Hard cut at 540; SH07 must reproduce SH03 initial framing.",
  },
  {
    id: "SH07",
    title: "DUPLICATE",
    startFrame: 540,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P04",
    assets: ["ENV02", "CH01", "CH02", "CH03"],
    composition:
      "Exact SH03 initial framing. Same Ivan walking artwork now belongs to duplicate; real Ivan partly in foreground.",
    camera: "Start from saved SH03 frame-180 layout, hold recognition beat.",
    effects: "One brief local duplicate distortion; tracking rectangle.",
    transitionOut:
      "Tracking rectangle geometrically expands into SH08 warning composition at 630; no timing overlap.",
  },
  {
    id: "SH08",
    title: "SYSTEM CONFLICT",
    startFrame: 630,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P04",
    assets: ["ENV02", "CH01", "CH02", "MSK08_STRIP"],
    composition:
      "Existing street stays visible; three architectural/duplicate warning rectangles.",
    camera: "Restrained continuation of street setup; no screen shake.",
    effects:
      "ROUTINE CONFLICT, ENTITY REPLACED; one facade strip displaces ~20px then restores.",
    transitionOut:
      "Vertical architecture edge matches start of SH09 wireframe at 720.",
  },
  {
    id: "SH09",
    title: "CODE EXPOSED",
    startFrame: 720,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P05",
    assets: ["ENV04", "CH07", "MSK09_STRIPS"],
    composition:
      "Ivan runs in narrow corridor; ~12 facade regions reveal underlying perspective lines.",
    camera:
      "Track Ivan down the authored corridor; choose 2D before adding true spatial camera.",
    effects:
      "Selected image strips shift sideways, revealing sparse native SVG structure.",
    transitionOut: "A revealed perspective line connects to SH10 road at 810.",
  },
  {
    id: "SH10",
    title: "END OF THE ROAD",
    startFrame: 810,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P05",
    assets: ["ENV05", "CH03", "CH07", "MSK10_ROAD"],
    composition:
      "Road reaches impossible geometric termination; Ivan approaches and slows; no falling.",
    camera: "Advance toward termination along road axis.",
    effects:
      "Road separates through authored masks and original image fragments.",
    transitionOut:
      "Proposed 2-frame motivated black cut inside SH10 at [898,900), then close-up; approval pending.",
  },
  {
    id: "SH11",
    title: "ANOTHER IVAN",
    startFrame: 900,
    duration: 90,
    mode: "flat-2d",
    packet: "P06",
    assets: ["CH05"],
    composition:
      "Large portrait; second exact copy initially reads as reflection then shifts independently.",
    camera: "Controlled inward push.",
    effects: "Duplicate is the exact same approved portrait; no new identity.",
    transitionOut: "Direct cut at 990 to Ivan walking away.",
  },
  {
    id: "SH12",
    title: "REFUSAL",
    startFrame: 990,
    duration: 90,
    mode: "multiplane-2d",
    packet: "P06",
    assets: ["ENV05", "CH03"],
    composition: "Rear Ivan continues toward boundary without looking back.",
    camera: "Steady follow; explicitly no shake.",
    effects:
      "Reticle loses target at ~1035 and separates into six line fragments.",
    transitionOut: "Fragments align with SH13 world-grid lines at 1080.",
  },
  {
    id: "SH13",
    title: "GRID DISINTEGRATION",
    startFrame: 1080,
    duration: 90,
    mode: "image-plane-3d",
    packet: "P07",
    assets: ["ENV05", "CH03", "MSK13_TILES"],
    composition:
      "Road texture divided into 6 rows × 9 columns; original artwork retained on all 54 pieces.",
    camera:
      "Advance toward opening. Per-fragment depth offsets need a later targeted engine capability.",
    effects: "Outward detachment waves centered on Ivan; no colored cubes.",
    transitionOut:
      "Remaining strips connect to SH14 architectural fragments at 1170.",
  },
  {
    id: "SH14",
    title: "REALITY FRACTURE",
    startFrame: 1170,
    duration: 90,
    mode: "image-plane-3d",
    packet: "P07",
    assets: ["ENV04", "ENV05", "CH03", "MSK14_FRACTURE"],
    composition:
      "Large illustrated architectural planes split left/right; pale opening behind Ivan.",
    camera: "Slight pullback to reveal fracture scale.",
    effects:
      "Left architecture outward left; right outward right; no particles/explosions.",
    transitionOut: "Cut at 1260 into instrumental section.",
  },
  {
    id: "SH15",
    title: "CORRUPTED MEMORY",
    startFrame: 1260,
    duration: 90,
    mode: "flat-2d",
    packet: "P08",
    assets: ["ENV02", "ENV03", "CH01", "CH02", "CH03", "CH04", "CH05"],
    composition:
      "Reuse approved SH03, SH05, SH07, SH11 compositions, in that order.",
    camera: "Small recrops only; reuse source composition states.",
    effects:
      "Four planned fragments 23/22/23/22 frames: [1260,1283),[1283,1305),[1305,1328),[1328,1350). Refine within section after listening.",
    transitionOut: "Direct cut at 1350; no prolonged flashing.",
  },
  {
    id: "SH16",
    title: "INFINITE IVANS",
    startFrame: 1350,
    duration: 90,
    mode: "image-plane-3d",
    packet: "P08",
    assets: ["CH03", "DERIVED_IVAN_OUTLINE"],
    composition:
      "Same rear silhouette repeated: 3 copies growing to ~18 in staggered depth rows.",
    camera: "Pull back to reveal larger duplicate field.",
    effects:
      "Fade matching silhouettes toward source-alpha-derived outlines; no new 3D characters.",
    transitionOut: "Cut at 1440 into collapsing architecture.",
  },
  {
    id: "SH17",
    title: "ARCHITECTURAL COLLAPSE",
    startFrame: 1440,
    duration: 90,
    mode: "image-plane-3d",
    packet: "P08",
    assets: ["ENV01", "ENV04", "ENV05"],
    composition:
      "Three large textured spatial planes, reused environment sections.",
    camera:
      "Separate keyed paths. Optional roll <=8 degrees is deferred; current schema has no roll.",
    effects:
      "Localized RGB edge split at moving structural boundaries; no postprocessing package.",
    transitionOut:
      "Architectural fragments frame central seam in SH18 at 1530.",
  },
  {
    id: "SH18",
    title: "EXIT",
    startFrame: 1530,
    duration: 90,
    mode: "image-plane-3d",
    packet: "P09",
    assets: ["ENV04", "ENV05", "ENV06", "CH03", "MSK18_SEAM"],
    composition:
      "Central vertical seam opens onto pale outside; rear Ivan in gap.",
    camera: "Controlled frontal relationship to seam; no flat-plane orbit.",
    effects:
      "Opening expands until artificial architecture clears frame; all warnings disappear.",
    transitionOut: "Cut at 1620 to outside-world wide shot.",
  },
  {
    id: "SH19",
    title: "GOODBYE / SERIES TITLE",
    startFrame: 1620,
    duration: 180,
    mode: "multiplane-2d",
    packet: "P09",
    assets: ["ENV06", "CH03"],
    composition:
      "[1620,1722): open landscape/rear Ivan. [1722,1779): dark title. [1779,1800): final message.",
    camera: "Landscape slow pullback, then locked title and message.",
    effects:
      "No system graphics in landscape. IVAN'S ESCAPE with thin red fracture; then IVAN_001 : CONNECTION LOST. End at black boundary 1800.",
    transitionOut: "Film ends at exclusive frame 1800; no extra frames.",
  },
];

const locked = (pivotX: number, pivotY: number, zoom = 1): Camera2DState => ({
  x: 0,
  y: 0,
  zoom,
  pivotX,
  pivotY,
});
export const packet01CameraPlans: Record<string, Keyframe<Camera2DState>[]> = {
  SH01: [
    { frame: 0, value: locked(960, 540) },
    { frame: 59, value: locked(960, 540) },
  ],
  SH02: [
    { frame: 0, value: locked(960, 300), easing: "smooth" },
    { frame: 119, value: locked(960, 300, 1.25) },
  ],
};

// These reference missing final artwork and are deliberately not passed to a renderer yet.
export const shot02LayerPlan: ArtworkLayer[] = [
  {
    id: "sky-haze",
    assetId: "ENV01_SKY",
    type: "background",
    x: -480,
    y: -270,
    width: 2880,
    height: 1620,
    anchor: [0, 0],
    depth: -1200,
    parallax: 0.08,
    cropSafe: { inset: 24 },
  },
  {
    id: "distant-city",
    assetId: "ENV01_DISTANT",
    type: "environment",
    x: -480,
    y: -270,
    width: 2880,
    height: 1620,
    anchor: [0, 0],
    depth: -900,
    parallax: 0.3,
  },
  {
    id: "road",
    assetId: "ENV01_ROAD",
    type: "environment",
    x: -480,
    y: -270,
    width: 2880,
    height: 1620,
    anchor: [0, 0],
    depth: -600,
    parallax: 1,
  },
  {
    id: "mid-buildings",
    assetId: "ENV01_MID",
    type: "environment",
    x: -480,
    y: -270,
    width: 2880,
    height: 1620,
    anchor: [0, 0],
    depth: -350,
    parallax: 0.65,
  },
  {
    id: "near-buildings",
    assetId: "ENV01_NEAR",
    type: "foreground",
    x: -480,
    y: -270,
    width: 2880,
    height: 1620,
    anchor: [0, 0],
    depth: -100,
    parallax: 1.1,
  },
  {
    id: "roof-details",
    assetId: "ENV01_ROOF",
    type: "foreground",
    x: -480,
    y: -270,
    width: 2880,
    height: 1620,
    anchor: [0, 0],
    depth: 50,
    parallax: 1.2,
  },
];
