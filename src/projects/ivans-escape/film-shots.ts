import type {
  ArtworkLayer,
  Camera2DState,
  Camera3DState,
  Keyframe,
  ShotDefinition,
  Transform2D,
} from "../../engine/types";
import { productionAssets, roadTiles } from "./production-assets";
import { productionShots, packet01CameraPlans } from "./shots";
export const montageCuts = [0, 26, 42, 70, 90];

export const transform = (v: Partial<Transform2D> = {}): Transform2D => ({
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  opacity: 1,
  ...v,
});
export const motion = (
  end: number,
  to: Partial<Transform2D>,
  from: Partial<Transform2D> = {},
  start = 0,
): Keyframe<Transform2D>[] => [
  { frame: start, value: transform(from) },
  { frame: end, value: transform(to), easing: "smooth" },
];
const cam = (
  end = 89,
  to: Partial<Camera2DState> = {},
  from: Partial<Camera2DState> = {},
): Keyframe<Camera2DState>[] => [
  {
    frame: 0,
    value: { x: 0, y: 0, zoom: 1, pivotX: 960, pivotY: 540, ...from },
  },
  {
    frame: end,
    value: { x: 0, y: 0, zoom: 1, pivotX: 960, pivotY: 540, ...from, ...to },
    easing: "smooth",
  },
];
const layer = (
  assetId: string,
  extra: Partial<ArtworkLayer> = {},
): ArtworkLayer => ({
  id: assetId,
  assetId,
  type: "environment",
  x: -480,
  y: -270,
  width: 2880,
  height: 1620,
  ...extra,
});
const character = (
  id: string,
  assetId: string,
  x = 960,
  y = 960,
  height = 710,
  extra: Partial<ArtworkLayer> = {},
): ArtworkLayer =>
  layer(assetId, {
    id,
    type: "character",
    x,
    y,
    width: (height * 2) / 3,
    height,
    anchor: [0.5, 1680 / 1800],
    parallax: 0,
    ...extra,
  });
const walk = Array.from({ length: 8 }, (_, i) => ({
  frame: i * 12,
  assetId: i % 2 ? "ch02-walk-b" : "ch01-walk-a",
})).filter((c) => c.frame < 90);
const shadow = (
  id: string,
  x: number,
  y: number,
  width: number,
  extra: Partial<ArtworkLayer> = {},
): ArtworkLayer =>
  layer("contact-shadow", {
    id,
    x,
    y,
    width,
    height: width / 8,
    anchor: [0.5, 0.5],
    opacity: 0.55,
    parallax: 0,
    ...extra,
  });
const commuters = (suffix = ""): ArtworkLayer[] =>
  [
    [270, 820, 480, 100],
    [1420, 790, 420, 100],
    [520, 680, 300, 70],
    [1190, 650, 245, 70],
  ].map(([x, y, height, dx], i) =>
    character(`commuter-${suffix}${i}`, `commuter-${i + 1}`, x, y, height, {
      opacity: 0.7 + i * 0.04,
      parallax: 0.7,
      motion: motion(89, { x: i % 2 ? -dx : dx }),
    }),
  );
const street = (withIvan = true): ArtworkLayer[] => [
  layer("env02-clean", { y: -480, parallax: 0.35, cropSafe: { inset: 24 } }),
  layer("street-ground", { y: -480, parallax: 0.8 }),
  ...commuters(),
  shadow("ivan-contact", 960, 962, 330, { cameraFollow: true }),
  ...(withIvan
    ? [
        character("ivan-walking", "ch01-walk-a", 960, 960, 710, {
          cels: walk,
          cameraFollow: true,
        }),
      ]
    : []),
  layer("street-near", { x: -350, y: -480, parallax: 1.4, type: "foreground" }),
  character("street-object", "street-bollard", 120, 1140, 610, {
    parallax: 1.7,
    type: "foreground",
  }),
];
const boundary = (): ArtworkLayer[] => [
  layer("env05-void", { parallax: 0.25, cropSafe: { inset: 24 } }),
  layer("boundary-road", { parallax: 1 }),
  layer("boundary-left", { parallax: 1.2 }),
  layer("boundary-right", { parallax: 1.2 }),
];
export const spatial = (l: ArtworkLayer, depth: number): ArtworkLayer => {
  const factor = (1158 - depth) / 1158;
  return {
    ...l,
    x: 960 + (l.x - 960) * factor,
    y: 540 + (l.y - 540) * factor,
    width: l.width * factor,
    height: l.height * factor,
    depth,
    parallax: undefined,
    cameraFollow: undefined,
    cropSafe: undefined,
  };
};
const cam3 = (
  to: Partial<Camera3DState> = {},
  from: Partial<Camera3DState> = {},
): Keyframe<Camera3DState>[] => [
  {
    frame: 0,
    value: {
      x: 0,
      y: 0,
      z: 1158,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      zoom: 1,
      ...from,
    },
  },
  {
    frame: 89,
    value: {
      x: 0,
      y: 0,
      z: 1158,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      zoom: 1,
      ...from,
      ...to,
    },
    easing: "smooth",
  },
];
const reflection: ArtworkLayer[] = [
  layer("env03-glass", {
    x: -192,
    y: -108,
    width: 2304,
    height: 1296,
    parallax: 0.4,
    cropSafe: { inset: 24 },
  }),
  character("reflection", "ch03-r-reflection", 1150, 825, 590, {
    opacity: 0.44,
    parallax: 0.7,
    cels: [
      { frame: 0, assetId: "ch03-r-reflection" },
      { frame: 46, assetId: "ch04-r-reflection" },
    ],
    motion: [
      { frame: 0, value: transform() },
      { frame: 46, value: transform() },
      { frame: 47, value: transform({ x: 16 }) },
      { frame: 49, value: transform() },
    ],
  }),
  ...commuters("glass").map((c, i) => ({
    ...c,
    x: 1380 - i * 80,
    y: 790 - i * 60,
    width: c.width * 0.6,
    height: c.height * 0.6,
    opacity: 0.2,
    parallax: 0.6,
  })),
  layer("glass-frame", {
    x: -192,
    y: -108,
    width: 2304,
    height: 1296,
    type: "foreground",
    parallax: 0.4,
  }),
  shadow("ivan-glass-contact", 740, 1060, 350, { parallax: 0.9 }),
  character("real-ivan", "ch03-rear", 740, 1060, 850, {
    parallax: 0.9,
    cels: [
      { frame: 0, assetId: "ch03-rear" },
      { frame: 38, assetId: "ch04-turn" },
    ],
  }),
];

// The union is kept on the complete shot so each camera remains checked against its renderer.
const shot = (
  i: number,
  definition:
    | Omit<
        Extract<ShotDefinition, { mode: "flat-2d" | "multiplane-2d" }>,
        "id" | "startFrame" | "duration"
      >
    | Omit<
        Extract<ShotDefinition, { mode: "image-plane-3d" }>,
        "id" | "startFrame" | "duration"
      >,
): ShotDefinition =>
  ({
    id: productionShots[i].id,
    startFrame: productionShots[i].startFrame,
    duration: productionShots[i].duration,
    ...definition,
  }) as ShotDefinition;
export const filmShots: ShotDefinition[] = [
  shot(0, { mode: "flat-2d", layers: [], camera: packet01CameraPlans.SH01 }),
  shot(1, {
    mode: "multiplane-2d",
    camera: packet01CameraPlans.SH02,
    layers: [
      layer("env01-clean", { y: -44, parallax: 0.08, cropSafe: { inset: 24 } }),
      layer("city-sky", { y: -44, parallax: 0.08 }),
      layer("city-distant", { y: -44, parallax: 0.3 }),
      layer("city-road", { y: -44, parallax: 1 }),
      layer("city-mid", { y: -44, parallax: 0.65 }),
      layer("city-near", { y: -44, parallax: 1.1, type: "foreground" }),
    ],
  }),
  shot(2, {
    mode: "multiplane-2d",
    camera: cam(89, { x: 50 }, { pivotY: 380 }),
    layers: street(),
  }),
  shot(3, { mode: "flat-2d", camera: cam(89, { zoom: 1.08 }), layers: [] }),
  shot(4, {
    mode: "multiplane-2d",
    camera: cam(89, { zoom: 1.08 }, { pivotY: 440 }),
    layers: reflection,
  }),
  shot(5, {
    mode: "flat-2d",
    camera: cam(89, { zoom: 1.18 }, { pivotX: 1200, pivotY: 800 }),
    layers: [
      layer("env02-street", {
        x: -3200,
        y: -3450,
        width: 8320,
        height: 4680,
        cropSafe: { inset: 24 },
      }),
      shadow("foot-contact", 650, 846, 820, {
        motion: [
          { frame: 0, value: transform() },
          { frame: 30, value: transform() },
          {
            frame: 44,
            value: transform({ x: 200, scale: 0.9, opacity: 0.65 }),
          },
          { frame: 59, value: transform({ x: 400 }) },
          { frame: 89, value: transform({ x: 400 }) },
        ],
      }),
      layer("path-boundary", {
        id: "white-path-on-pavement",
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
      }),
      layer("ch06-foot", {
        id: "foot",
        type: "character",
        x: 650,
        y: 840,
        width: 1000,
        height: 562.5,
        anchor: [0.5, 800 / 900],
        motion: [
          { frame: 0, value: transform() },
          { frame: 30, value: transform() },
          { frame: 44, value: transform({ x: 200, y: -30 }) },
          { frame: 59, value: transform({ x: 400 }) },
          { frame: 89, value: transform({ x: 400 }) },
        ],
      }),
    ],
  }),
  shot(6, {
    mode: "multiplane-2d",
    camera: cam(89, { x: 22 }, { pivotY: 380 }),
    layers: [
      ...street().map((l) =>
        l.id === "ivan-walking"
          ? {
              ...l,
              motion: [
                { frame: 0, value: transform() },
                { frame: 40, value: transform() },
                { frame: 41, value: transform({ x: 12 }) },
                { frame: 43, value: transform() },
              ],
            }
          : l,
      ),
      character("real-ivan-foreground", "ch03-rear", 1580, 1180, 1050, {
        cameraFollow: true,
        opacity: 0.94,
      }),
    ],
  }),
  shot(7, {
    mode: "multiplane-2d",
    camera: cam(89, { x: 40, zoom: 1.02 }, { pivotY: 380 }),
    layers: [
      ...street(),
      layer("street-strip", {
        id: "localized-facade-shift",
        y: -480,
        parallax: 0.35,
        motion: [
          { frame: 0, value: transform() },
          { frame: 30, value: transform() },
          { frame: 31, value: transform({ x: 20 }) },
          { frame: 33, value: transform({ x: 20 }) },
          { frame: 34, value: transform() },
        ],
      }),
    ],
  }),
  shot(8, {
    mode: "multiplane-2d",
    camera: cam(89, { x: 95, zoom: 1.1 }, { pivotY: 450 }),
    layers: [
      layer("wireframe", { parallax: 0.5, cropSafe: { inset: 24 } }),
      layer("corridor-ground", { parallax: 1 }),
      layer("corridor-far", { parallax: 0.2 }),
      ...Array.from({ length: 12 }, (_, i) =>
        layer(`facade-${i}`, {
          id: `facade-peel-${i}`,
          parallax: 0.7,
          motion: motion(
            Math.min(89, 45 + i * 3),
            {
              x: (i < 6 ? -1 : 1) * (100 + (i % 6) * 24),
              y: -(i % 3) * 10,
              opacity: 0.85,
            },
            {},
            i * 3,
          ),
        }),
      ),
      character("running-ivan", "ch07-run", 650, 960, 680, {
        cameraFollow: true,
        motion: motion(89, { x: 440, y: -45, scale: 0.88 }),
      }),
    ],
  }),
  shot(9, {
    mode: "multiplane-2d",
    camera: cam(89, { zoom: 1.1 }, { pivotY: 605 }),
    layers: [
      ...boundary(),
      character("ivan-approach", "ch03-rear", 960, 1000, 680, {
        motion: motion(70, { y: -170, scale: 0.65 }),
      }),
    ],
  }),
  shot(10, {
    mode: "flat-2d",
    camera: cam(89, { zoom: 1.07 }, { pivotY: 440 }),
    layers: [
      layer("env03-glass", { opacity: 0.3, cropSafe: { inset: 24 } }),
      layer("ch05-closeup", {
        id: "portrait-real",
        type: "character",
        x: 250,
        y: 100,
        width: 930,
        height: 930,
        anchor: [0, 0],
      }),
      layer("ch05-closeup", {
        id: "portrait-double",
        type: "character",
        x: 930,
        y: 100,
        width: 930,
        height: 930,
        anchor: [0, 0],
        opacity: 0.52,
        motion: [
          { frame: 0, value: transform() },
          { frame: 36, value: transform() },
          { frame: 89, value: transform({ x: 105, y: -15, opacity: 1 }) },
        ],
      }),
    ],
  }),
  shot(11, {
    mode: "multiplane-2d",
    camera: cam(89, { zoom: 1.08, y: -20 }, { pivotY: 550 }),
    layers: [
      ...boundary(),
      character("ivan-refuses", "ch03-rear", 960, 840, 460, {
        motion: motion(89, { y: -105, scale: 0.8 }),
      }),
    ],
  }),
  shot(12, {
    mode: "image-plane-3d",
    projection: "perspective",
    camera: cam3({ z: 1030, y: 24, targetY: 12 }),
    layers: [
      spatial(layer("env05-void"), -1600),
      ...roadTiles.map<ArtworkLayer>(
        ({ id, row, col, x, y, width, height }) => ({
          ...spatial(
            layer(id, {
              x: x - 480,
              y: y - 270,
              width,
              height,
              anchor: [0.5, 0.5],
            }),
            0,
          ),
          x: x - 480 + width / 2,
          y: y - 270 + height / 2,
          motion: motion(
            89,
            {
              x: (col - 4) * 42,
              y: (row - 2) * 38,
              rotation: (col - 4) * 2.5,
              scale: 0.94,
            },
            {},
            Math.min(50, row * 5 + Math.abs(col - 4) * 4),
          ),
          depthMotion: [
            { frame: 0, value: { z: 0 } },
            {
              frame: Math.min(50, row * 5 + Math.abs(col - 4) * 4) + 1,
              value: { z: 0 },
            },
            {
              frame: 89,
              value: { z: col === 4 ? -90 : -350 - Math.abs(col - 4) * 90 },
              easing: "smooth",
            },
          ],
        }),
      ),
      spatial(character("ivan-grid", "ch03-rear", 960, 800, 450), 140),
    ],
  }),
  shot(13, {
    mode: "image-plane-3d",
    camera: cam3({ z: 1250, x: 35, targetX: 12 }),
    layers: [
      spatial(layer("env06-outside"), -1600),
      {
        ...spatial(layer("corridor-left", { id: "fracture-left" }), -150),
        motion: motion(89, { x: -670, rotation: -8 }),
        rotation3D: [
          { frame: 0, value: { x: 0, y: 0, z: 0 } },
          { frame: 89, value: { x: 0, y: -16, z: 0 } },
        ],
      },
      {
        ...spatial(layer("corridor-right", { id: "fracture-right" }), -100),
        motion: motion(89, { x: 670, rotation: 8 }),
        rotation3D: [
          { frame: 0, value: { x: 0, y: 0, z: 0 } },
          { frame: 89, value: { x: 0, y: 16, z: 0 } },
        ],
      },
      spatial(character("ivan-fracture", "ch03-rear", 960, 930, 620), 140),
    ],
  }),
  shot(14, { mode: "flat-2d", template: "montage", camera: cam(), layers: [] }),
  shot(15, {
    mode: "multiplane-2d",
    camera: cam(89, { zoom: 0.84 }, { zoom: 1.12, pivotY: 480 }),
    layers: [
      layer("env05-void", {
        x: -720,
        y: -405,
        width: 3360,
        height: 1890,
        parallax: 0.2,
        cropSafe: { inset: 24 },
      }),
      ...Array.from({ length: 18 }, (_, i) => {
        const row = Math.floor(i / 6),
          col = i % 6,
          h = 290 + row * 180;
        const x = 350 + col * 244 + (row % 2) * 60,
          y = 650 + row * 185;
        const onset = i < 3 ? 0 : Math.floor((i - 2) * 3);
        return character(`infinite-${i}`, "ch03-rear", x, y, h, {
          parallax: 0.25 + row * 0.3,
          opacity: i < 3 ? 1 : 0,
          motion: [
            { frame: 0, value: transform({ opacity: i < 3 ? 1 : 0 }) },
            ...(onset > 0
              ? [{ frame: onset, value: transform({ opacity: 0 }) }]
              : []),
            {
              frame: Math.max(onset + 6, 54),
              value: transform({ opacity: 1 }),
            },
            { frame: 89, value: transform({ opacity: 0.06 }) },
          ],
        });
      }).map((c) => ({ ...c, opacity: 1 })),
      ...Array.from({ length: 18 }, (_, i) => {
        const row = Math.floor(i / 6),
          h = 290 + row * 180;
        return character(
          `outline-${i}`,
          "ch03-outline",
          350 + (i % 6) * 244 + (row % 2) * 60,
          650 + row * 185,
          h,
          {
            parallax: 0.25 + row * 0.3,
            motion: motion(89, { opacity: 1 }, { opacity: 0 }, 54),
          },
        );
      }),
    ],
  }),
  shot(16, {
    mode: "image-plane-3d",
    camera: cam3({ x: 75, y: 20, z: 1250, targetX: 10 }),
    layers: [
      spatial(layer("env05-void"), -1800),
      {
        ...spatial(
          layer("city-near", {
            id: "collapse-city",
            x: -330,
            y: -170,
            width: 2304,
            height: 1296,
          }),
          -300,
        ),
        motion: motion(89, { x: -480, y: -120 }),
        rotation3D: [
          { frame: 0, value: { x: 0, y: 0, z: 0 } },
          { frame: 89, value: { x: 7, y: -22, z: 5 } },
        ],
      },
      {
        ...spatial(
          layer("corridor-left", { id: "collapse-corridor", x: 180, y: -270 }),
          -100,
        ),
        motion: motion(89, { x: -460, y: 140 }),
        rotation3D: [
          { frame: 0, value: { x: 0, y: 0, z: 0 } },
          { frame: 89, value: { x: -8, y: 24, z: -8 } },
        ],
      },
      {
        ...spatial(
          layer("boundary-right", {
            id: "collapse-boundary",
            x: -500,
            y: -200,
          }),
          80,
        ),
        motion: motion(89, { x: 340, y: -90 }),
        rotation3D: [
          { frame: 0, value: { x: 0, y: 0, z: 0 } },
          { frame: 89, value: { x: 12, y: -16, z: 6 } },
        ],
      },
      spatial(character("ivan-collapse", "ch03-rear", 990, 960, 620), 180),
    ],
  }),
  shot(17, {
    mode: "image-plane-3d",
    camera: cam3({ z: 1120 }),
    layers: [
      spatial(layer("env06-outside"), -1400),
      spatial(character("ivan-exit", "ch03-rear", 960, 920, 600), 0),
      {
        ...spatial(layer("exit-left", { id: "opening-left" }), 150),
        motion: motion(82, { x: -1850 }),
      },
      {
        ...spatial(layer("exit-right", { id: "opening-right" }), 160),
        motion: motion(82, { x: 1850 }),
      },
    ],
  }),
  shot(18, {
    mode: "multiplane-2d",
    camera: cam(179, { zoom: 1 }, { zoom: 1.1, pivotY: 580 }),
    layers: [
      layer("env06-outside", { parallax: 0.1, cropSafe: { inset: 24 } }),
      layer("outside-sky", { parallax: 0.08, motion: motion(179, { x: 8 }) }),
      layer("outside-ground", { parallax: 0.3 }),
      shadow("outside-contact", 960, 852, 170, { parallax: 1, opacity: 0.22 }),
      character("ivan-outside", "ch03-rear", 960, 850, 410, { parallax: 1 }),
    ],
  }),
];

export const productionImageCount = Object.keys(productionAssets).length;
