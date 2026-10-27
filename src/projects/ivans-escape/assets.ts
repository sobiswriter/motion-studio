import type { AssetManifest } from "../../engine/types";

// Only files that actually exist belong in the runtime manifest. Missing final art stays below.
export const availableAssets: AssetManifest = {
  music: {
    id: "music",
    src: "projects/ivans-escape/audio/track.mp3",
    kind: "audio",
  },
  bootLayout: {
    id: "bootLayout",
    src: "projects/ivans-escape/references/sh01-layout.svg",
    kind: "image",
    width: 1920,
    height: 1080,
  },
  cityReference: {
    id: "cityReference",
    src: "projects/ivans-escape/references/sh02-city-style-v01.png",
    kind: "image",
    width: 1672,
    height: 941,
  },
};

export type ArtworkBrief = {
  id: string;
  group: string;
  filename: string;
  width: number;
  height: number;
  alpha: boolean;
  status: "missing-artwork" | "optional-artwork" | "planned-code";
  subject: string;
  viewpoint: string;
  composition: string;
  lighting: string;
  perspective: string;
  palette: string;
  exclude: string;
  separation: string;
  pivot: string;
  depth: string;
  movement: string;
};

const cityPalette =
  "#0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery";
const environmentGroups = [
  {
    id: "ENV01",
    viewpoint:
      "High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.",
    perspective:
      "Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).",
    composition:
      "Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.",
    layers: [
      [
        "SKY",
        "Sky and continuous haze behind the entire city, with reconstructed sky under every removed building.",
        "Opaque uninterrupted overscan plate.",
        "-1200 / parallax .08",
      ],
      [
        "DISTANT",
        "Small-scale distant city masses fading into haze; no central-road obstruction.",
        "RGBA skyline with feathered atmospheric edges.",
        "-900 / parallax .30",
      ],
      [
        "ROAD",
        "Central road network, pavements and aligned lane markings; center seam at source x=1440.",
        "RGBA ground plane; paint hidden road behind removed masses.",
        "-600 / parallax 1.00",
      ],
      [
        "MID",
        "Main repeating concrete building masses; align all building bases and perspective to the road.",
        "RGBA building group, reconstructed behind near buildings.",
        "-350 / parallax .65",
      ],
      [
        "NEAR",
        "Nearest architectural silhouettes framing lower outer margins without covering the road-axis focus.",
        "RGBA foreground masses; reconstruct hidden edges.",
        "-100 / parallax 1.10",
      ],
      [
        "ROOF",
        "Sparse near-roof parapets/details, only if necessary for occlusion; omit rather than overdecorate.",
        "Optional RGBA accents aligned to the master plate.",
        "+50 / parallax 1.20",
      ],
    ],
  },
  {
    id: "ENV02",
    viewpoint:
      "Ground-level street, modest perspective; normal human eye height, not a wide-angle fisheye.",
    perspective:
      "2880×1620 aligned source; VP (1440,650), projecting to (960,380) in viewport.",
    composition:
      "Symmetrical concrete apartment facades, identical windows, road markings and sidewalks; preserve SH03 layout for SH07.",
    layers: [
      [
        "FAR",
        "Far atmospheric backing at the street endpoint.",
        "Opaque overscan plate.",
        "far / factor .15",
      ],
      [
        "DISTANT",
        "Distant buildings and repeated window rhythm.",
        "RGBA distant mass, behind all main facades.",
        "far-mid / factor .35",
      ],
      [
        "FACADES",
        "Main facades with clear vertical edges and enough detail for one isolated strip displacement.",
        "RGBA architecture, recover behind street objects; keep reusable clean original.",
        "mid / factor .65",
      ],
      [
        "GROUND",
        "Road, white route line, curb and sidewalk, with painted pavement texture suitable for CH06 close-up.",
        "RGBA ground; provide high-detail road crop from original art, not an upscale.",
        "ground / factor 1.00",
      ],
      [
        "OBJECTS",
        "One restrained street object such as a plain concrete bollard; no new narrative prop.",
        "RGBA isolated object; extra objects only if composition needs them.",
        "near / factor 1.25",
      ],
    ],
  },
  {
    id: "ENV03",
    viewpoint:
      "Street-side concrete/glass facade at a shallow three-quarter angle, enough to read Ivan and his reflected view.",
    perspective:
      "2880×1620 registered canvas; pane corners and reflection homography supplied as artist landmarks; provisional VP (1440,600).",
    composition:
      "Large readable glass panel, concrete border and space for Ivan plus background reflected commuters.",
    layers: [
      [
        "BACKING",
        "Concrete wall and intact backing under the glass opening.",
        "Opaque backing with clean empty glass region.",
        "back / factor .25",
      ],
      [
        "GLASS",
        "Glass tone and surface; absolutely no baked-in Ivan or commuter reflection.",
        "RGBA pane surface, independent of reflected figures.",
        "mid / factor .60",
      ],
      [
        "REFLECTION",
        "Reflected street/environment only; reflection geography must match the actual glass viewpoint.",
        "RGBA reflection plate; all people excluded and composited separately.",
        "reflection / factor .60",
      ],
      [
        "HIGHLIGHTS",
        "Restrained broad specular streaks and glass edge highlights.",
        "RGBA, sparse enough to preserve face/silhouette readability.",
        "front-glass / factor .60",
      ],
      [
        "EDGE",
        "A narrow concrete/window-frame foreground edge for physical occlusion.",
        "RGBA edge, same pane geometry as glass mask.",
        "near / factor 1.00",
      ],
    ],
  },
  {
    id: "ENV04",
    viewpoint:
      "Eye-level oppressive corridor between towering concrete structures, viewed along its long axis.",
    perspective:
      "2880×1620 master, VP (1440,570). Vertical architecture edges must remain straight and align to a 12-strip extraction plan.",
    composition:
      "Narrow central route with a readable running silhouette; stable architecture left/right and deep end.",
    layers: [
      [
        "END",
        "Distant corridor endpoint, reconstructed behind all architecture.",
        "Opaque backing.",
        "far / factor .20",
      ],
      [
        "LEFT",
        "Left corridor facade, textured concrete with separable large masses.",
        "RGBA complete left architecture; no baked wires/grid.",
        "left-mid / factor .75",
      ],
      [
        "RIGHT",
        "Right corridor facade from exactly the same painted perspective and light setup.",
        "RGBA complete right architecture.",
        "right-mid / factor .75",
      ],
      [
        "GROUND",
        "Ground route and aligned perspective seams.",
        "RGBA ground with continuous hidden pavement.",
        "ground / factor 1.00",
      ],
      [
        "DETAIL",
        "Near concrete edge/pillar details, sufficient for structural occlusion.",
        "RGBA accents, retained as texture source for SH14/17.",
        "near / factor 1.20",
      ],
    ],
  },
  {
    id: "ENV05",
    viewpoint:
      "Road-axis approach to impossible world boundary; believable perspective until the geometric termination.",
    perspective:
      "2880×1620 master, VP (1440,570); preserve road center across SH10/12/13/14/18.",
    composition:
      "Road toward a clean impossible edge, architecture framing left/right; no fall, debris explosion or new destination.",
    layers: [
      [
        "VOID",
        "Distant void/backing revealed when road or architecture detaches.",
        "Opaque backing; no grid baked into color.",
        "far / factor .10",
      ],
      [
        "ROAD",
        "Continuous illustrated road and ground before fragmentation, with visible path toward termination.",
        "RGBA clean master; high enough detail for a 6×9 region split.",
        "ground / factor 1.00",
      ],
      [
        "LEFT",
        "Left boundary architecture that can move away as a complete image plane.",
        "RGBA separable left mass.",
        "mid-left / factor .75",
      ],
      [
        "RIGHT",
        "Right boundary architecture, paired to left geometry and lighting.",
        "RGBA separable right mass.",
        "mid-right / factor .75",
      ],
      [
        "STRUCTURES",
        "Geometric termination structures, individually extractable and fully painted behind occluding parts.",
        "RGBA structure atlas plus registered positions; no colored primitive replacements.",
        "near / factor 1.10",
      ],
    ],
  },
  {
    id: "ENV06",
    viewpoint:
      "Very wide, quiet, level view of an enormous empty natural-looking landscape; no new story objects.",
    perspective:
      "2880×1620 aligned canvas; horizon around source y=600, corresponding to viewport y=330; no distorted horizon.",
    composition:
      "Broad negative space and pale atmosphere; small rear Ivan emphasizes openness.",
    layers: [
      [
        "SKY",
        "Continuous pale sky and soft atmospheric illumination.",
        "Opaque overscan plate.",
        "far / factor .05",
      ],
      [
        "HORIZON",
        "Very distant soft horizon, natural-looking without a recognizable new landmark.",
        "RGBA horizon strip.",
        "far-mid / factor .20",
      ],
      [
        "GROUND",
        "Quiet open ground extending through the frame; no road-code graphics.",
        "RGBA terrain, filled under character.",
        "ground / factor 1.00",
      ],
      [
        "ATMOSPHERE",
        "Very subtle diffuse haze, separable for restrained movement only.",
        "RGBA soft atmosphere, no decorative particle field.",
        "front / factor .25",
      ],
    ],
  },
] as const;

const environmentBriefs: ArtworkBrief[] = environmentGroups.flatMap((group) =>
  group.layers.map(([suffix, subject, separation, depth]) => ({
    id: `${group.id}_${suffix}`,
    group: group.id,
    filename: `images/${group.id.toLowerCase()}-${suffix.toLowerCase()}.png`,
    width: 2880,
    height: 1620,
    alpha: !["SKY", "FAR", "BACKING", "END", "VOID"].includes(suffix),
    status:
      group.id === "ENV01" && suffix === "ROOF"
        ? ("optional-artwork" as const)
        : ("missing-artwork" as const),
    subject,
    viewpoint: group.viewpoint,
    composition: group.composition,
    lighting:
      group.id === "ENV06"
        ? "Soft pale diffuse illumination; gentle contact shadows; no hard simulated-world contrast."
        : "Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.",
    perspective: group.perspective,
    palette:
      group.id === "ENV06"
        ? "#D5CEC1 / #E6E9E6 with low-contrast #B5C3C9 atmosphere"
        : cityPalette,
    exclude:
      "Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.",
    separation,
    pivot:
      "Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.",
    depth,
    movement:
      group.id === "ENV01"
        ? "Exact Packet 01 zoom/parallax plan; no independently drifting architecture."
        : "Directed shot-specific movement only; no baked motion blur or autonomous animation.",
  })),
);

const characterRows = [
  [
    "CH01",
    "Walking profile A: one support leg planted, quiet purposeful stride.",
    "Full body profile; source walk direction screen-right; feet baseline y=1680.",
  ],
  [
    "CH02",
    "Walking profile B: complementary leg support, same body size/jacket/hair.",
    "Same orthogonal profile, facing, head height and baseline as CH01.",
  ],
  [
    "CH03",
    "Standing rear Ivan, reserved posture, suitable for foreground and distant silhouette.",
    "Full rear view; no face newly invented; baseline y=1680.",
  ],
  [
    "CH04",
    "Ivan turning in a three-quarter head/upper-body pose.",
    "Full-body canvas registered to CH03 turning stance; avoid stretching limbs or changing jacket.",
  ],
  [
    "CH05",
    "Frontal close-up, reserved face; duplicate must reuse this exact image.",
    "Head and shoulders; both eyes readable; approved identity only.",
  ],
  [
    "CH06",
    "Close-up worn off-white sneaker and lower dark trouser leg crossing a white path.",
    "Low close-up with clean sole silhouette; no pavement or line baked in.",
  ],
  [
    "CH07",
    "Running side-view Ivan, deliberate forward lean; no superhero gesture.",
    "Full body profile in the same screen-right direction as walk poses.",
  ],
  [
    "CH03-R",
    "Matched reflection view for CH03 from the approved Ivan model.",
    "Mirror-camera view, physically consistent with glass; not a new character or a naive flipped rear view.",
  ],
  [
    "CH04-R",
    "Matched turned reflection view, responding 8 frames after CH04.",
    "Same mirror-camera setup as CH03-R; align feet/head/turn registration.",
  ],
] as const;

const characterBriefs: ArtworkBrief[] = characterRows.map(
  ([id, subject, viewpoint]) => {
    const close = id === "CH05";
    const foot = id === "CH06";
    return {
      id,
      group: id,
      filename: `images/${id.toLowerCase()}.png`,
      width: close || foot ? 1600 : 1200,
      height: close ? 1600 : foot ? 900 : 1800,
      alpha: true,
      status: "missing-artwork",
      subject,
      viewpoint,
      composition:
        "Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.",
      lighting:
        "Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.",
      perspective:
        "Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.",
      palette:
        "#C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.",
      exclude:
        "Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.",
      separation:
        "RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.",
      pivot: close
        ? "[0.5,0.5], face center (800,800); eye-line guide around y=600."
        : foot
          ? "[0.5,0.8], sole baseline y=720 on 1600×900 canvas."
          : "[0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.",
      depth:
        "Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.",
      movement:
        "Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.",
    };
  },
);

const commuterBriefs: ArtworkBrief[] = [1, 2, 3, 4].map((n) => ({
  id: `CROWD_${n}`,
  group: "CROWD",
  filename: `images/commuter-${n}.png`,
  width: 600,
  height: 1200,
  alpha: true,
  status: "missing-artwork",
  subject: `Anonymous subdued commuter silhouette ${n}; no distinct secondary identity.`,
  viewpoint:
    "Ground-level profile matching ENV02; usable in independently moving distant layers.",
  composition:
    "Simple believable adult proportions and understated clothing. Four readable but subordinate silhouettes; no orange jacket matching Ivan.",
  lighting: "Same overcast upper-left as ENV02; reduce contrast for depth.",
  perspective:
    "Match street eye height and baseline; reflection placement follows ENV03 pane geometry.",
  palette: "Desaturated #172330/#586A79; no anomaly red.",
  exclude:
    "Face detail, distinctive props, names, futuristic costumes, background and baked shadows.",
  separation: "Individual RGBA figures, not one baked crowd plate.",
  pivot: "[0.5,0.95], foot registration (300,1140).",
  depth:
    "Behind hero, different regular paths; never obscure key reflection anomaly.",
  movement:
    "Simple perfectly regular translations; no new character animation system.",
}));

const maskRows = [
  [
    "MSK03_GLASS",
    "ENV03",
    "missing-artwork",
    "Glass-pane matte tracing all mullions and concrete occluders.",
    "Artist trace from final GLASS/EDGE layers; alpha white/opaque inside reflective opening, transparent outside.",
  ],
  [
    "MSK06_PATH",
    "ENV02",
    "planned-code",
    "Foot-crossing/route boundary matte registered to approved road line.",
    "Native SVG path from artist-supplied road landmarks; export alpha only if image masking is needed.",
  ],
  [
    "MSK08_STRIP",
    "ENV02",
    "planned-code",
    "One facade strip selection, keeping the rest of the street intact.",
    "Rectangular source-region crop from final FACADES; no new painted damage.",
  ],
  [
    "MSK09_STRIPS",
    "ENV04",
    "planned-code",
    "Twelve vertical image-region selections across approved corridor facades.",
    "Twelve registered rectangular crops; preserve source pixels and underlying clean backing.",
  ],
  [
    "MSK10_ROAD",
    "ENV05",
    "missing-artwork",
    "Controlled road separation regions without implying that Ivan falls.",
    "Artist traces 3–5 motivated fracture boundaries in road perspective; clean-road source remains untouched.",
  ],
  [
    "MSK13_TILES",
    "ENV05",
    "planned-code",
    "6 rows × 9 columns, fifty-four road image regions.",
    "Deterministic source crops plus road alpha intersection; no random fracture artwork or colored replacement tiles.",
  ],
  [
    "MSK14_FRACTURE",
    "ENV05",
    "missing-artwork",
    "Separable left/right architectural silhouette masks around a pale central opening.",
    "Trace final architecture edges; irregularity restrained and tied to concrete planes, not an electrical bolt.",
  ],
  [
    "MSK18_SEAM",
    "ENV06",
    "planned-code",
    "Vertical central world-boundary reveal; outside layer opens to fill frame.",
    "Native SVG/geometric seam, expanding on explicit cues; reuse approved MSK14 edge profile where needed.",
  ],
  [
    "DERIVED_IVAN_OUTLINE",
    "CH03",
    "planned-code",
    "Exact source-alpha-derived outline for duplicate field.",
    "Derive from approved CH03 alpha; no redraw, no new identity or body proportions.",
  ],
] as const;

const maskBriefs: ArtworkBrief[] = maskRows.map(
  ([id, group, status, subject, separation]) => ({
    id,
    group,
    filename: `masks/${id.toLowerCase()}.png`,
    width: id === "DERIVED_IVAN_OUTLINE" ? 1200 : 2880,
    height: id === "DERIVED_IVAN_OUTLINE" ? 1800 : 1620,
    alpha: true,
    status,
    subject,
    viewpoint:
      "Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.",
    composition:
      "Preserve intended subject occlusion and all source alignment landmarks.",
    lighting: "None: masks contain coverage values, never painted lighting.",
    perspective:
      "Inherit parent perspective and vanishing point with zero offset.",
    palette:
      "2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.",
    exclude:
      "Color scenery, baked characters, type, decorative noise and random edges.",
    separation,
    pivot:
      id === "DERIVED_IVAN_OUTLINE"
        ? "Same CH03 pivot [0.5,0.9333333333]."
        : "Top-left [0,0], identical full canvas as parent.",
    depth:
      "Inherits parent; mask itself is not an independently visible object.",
    movement:
      "Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.",
  }),
);

const modelBrief: ArtworkBrief = {
  id: "IVAN_MODEL",
  group: "MODEL",
  filename: "references/ivan-model-approved.png",
  width: 4096,
  height: 2048,
  alpha: false,
  status: "missing-artwork",
  subject:
    "Single approved Ivan design across front, profile, three-quarter and rear views; neutral expression and clothing detail inset.",
  viewpoint:
    "Consistent orthographic-like character reference, four views of one person; not four independent interpretations.",
  composition:
    "Young adult, slightly unkempt short black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers, understated proportions.",
  lighting:
    "Neutral soft light, clear colors and seam details; final shot lighting applied consistently in derived art.",
  perspective:
    "Same height and anatomy across views; no perspective distortion.",
  palette:
    "#C76A4B jacket with muted wear; dark trousers; off-white sneakers. Facial features, skin tone and exact jacket pattern require approval, not invention in later poses.",
  exclude:
    "Scenery, texturing presets, armor, accessories, alternative identities, dramatic pose effects and final-film compositing.",
  separation:
    "Review sheet only; pose PNGs are separate transparent deliverables after approval.",
  pivot:
    "View baselines aligned; guides define consistent head, shoulder, waist and foot landmarks.",
  depth: "Not an onscreen film asset.",
  movement: "None; identity reference locks all subsequent illustrations.",
};
export const artworkBriefs: ArtworkBrief[] = [
  modelBrief,
  ...environmentBriefs,
  ...characterBriefs,
  ...commuterBriefs,
  ...maskBriefs,
];

export const fontRequirements = [
  {
    id: "FONT_SYSTEM",
    family: "IBM Plex Mono",
    weight: "Regular / 400",
    path: "fonts/IBMPlexMono-Regular.woff2",
    status: "missing-local-font",
    packet: "P01",
    license:
      "Bundle actual font license/notice with the local resource; verify provenance before use.",
  },
  {
    id: "FONT_TITLE",
    family: "Space Grotesk",
    weight: "Medium / 500 (proposal)",
    path: "fonts/SpaceGrotesk-Medium.woff2",
    status: "missing-local-font",
    packet: "P09",
    license:
      "Bundle actual font license/notice; final weight/tracking remains title-design review.",
  },
];

export const codeGraphics = [
  [
    "SH01",
    "Coordinate grid, INITIALIZING IVAN_001, loading bar, tracking lines",
    "Native SVG, text and frame-keyed reveals; no illustration needed.",
  ],
  [
    "SH02",
    "Road-anchored marker/reticle, WORLD READY, IVAN_001",
    "Code overlay with projected road coordinates; not painted into ENV01.",
  ],
  [
    "SH03,04",
    "Route/clock circle, complete clock/rings/annotations",
    "Native SVG, exact one-rotation key; no clock painting needed.",
  ],
  [
    "SH05,06",
    "Anomaly bracket and thin path fracture",
    "Native SVG/masks; one local 2-frame displacement and exact eight-frame reflection delay.",
  ],
  [
    "SH07,08",
    "Tracking rectangles and permitted warnings",
    "Exact duplicated image references; isolated strip displacement, no global glitch.",
  ],
  [
    "SH09,10,13,14",
    "Structural lines, source crops, tile-wave transforms",
    "Use original artwork; required new depth-offset support is deferred until those packets.",
  ],
  [
    "SH12,16,17,18",
    "Six reticle fragments, source-alpha outlines, edge split, central seam",
    "Project-level code/matte planning only; no new effect dependencies.",
  ],
  [
    "SH19",
    "IVAN'S ESCAPE, thin fracture line, IVAN_001 : CONNECTION LOST",
    "Local fonts and native SVG/text; no generated text bitmap.",
  ],
] as const;
