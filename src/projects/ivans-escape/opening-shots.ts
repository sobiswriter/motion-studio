import type {
  ArtworkLayer,
  Camera2DState,
  Keyframe,
  ShotDefinition,
  Transform2D,
} from "../../engine/types";
import { sample, poseAt } from "../../engine/timeline/keyframes";

export const architecturalWipe = {
  from: 297,
  duration: 24,
  width: 3600,
  height: 1350,
  fromX: 3600,
  step: 360,
  y: -135,
};
export const openingCuts = [
  0, 22, 73, 96, 138, 180, 225, 270, 309, 341, 390, 430, 480, 540, 583, 616,
  649, 688, 731, 781, 825, 868, 918, 962, 1012, 1062, 1110, 1160, 1214, 1260,
  1288, 1302, 1330, 1350, 1410, 1483, 1530, 1620, 1722, 1779, 1800,
];
export const reflectionPose = (frame: number, reflected = false) =>
  frame >= (reflected ? 27 : 19) ? "portrait-3" : "portrait-2";
export const openingTitles = [
  "Identifier / eye",
  "The assigned place",
  "Scheduled footfall",
  "Identity assigned",
  "World handed over",
  "Programmed stride",
  "Mechanical time",
  "Everyone moves correctly",
  "Reflection agrees",
  "The lag",
  "Tension becomes choice",
  "Look against the flow",
  "First disobedience",
  "Duplicate taking my place",
  "Untroubled copy",
  "Against the current",
  "Awakening",
  "System conflict",
  "Run",
  "Push off",
  "Escape from code",
  "Construction exposed",
  "World edge",
  "Another Ivan",
  "Refusal",
  "Reject bracket",
  "Grid disintegration",
  "Reach through fracture",
  "Edge becomes exit",
  "Memory: routine",
  "Memory: reflection",
  "Memory: replacement",
  "Memory: self",
  "Infinite Ivans",
  "Architectural collapse",
  "Leap into opening",
  "Exit",
  "Outside",
  "IVAN'S ESCAPE",
  "Connection lost",
];
const t = (
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  opacity = 1,
): Transform2D => ({ x, y, rotation, scale, opacity });
export const motion = (
  keys: [number, number, number, number?, number?, number?][],
): Keyframe<Transform2D>[] =>
  keys.map(([frame, x, y, rotation = 0, scale = 1, opacity = 1]) => ({
    frame,
    value: t(x, y, rotation, scale, opacity),
    easing: "smooth",
  }));
const image = (
  assetId: string,
  x: number,
  y: number,
  width: number,
  height: number,
  extra: Partial<ArtworkLayer> = {},
): ArtworkLayer => ({
  id: assetId,
  assetId,
  type: "environment",
  x,
  y,
  width,
  height,
  ...extra,
});
const plate = (name: string, extra: Partial<ArtworkLayer> = {}) =>
  image(name, -320, -180, 2560, 1440, { parallax: 0.3, ...extra });
const person = (
  id: string,
  x = 1260,
  y = 950,
  h = 760,
  extra: Partial<ArtworkLayer> = {},
) =>
  image(id, x, y, h * 0.6, h, {
    type: "character",
    anchor: [0.5, 0.95],
    parallax: 1,
    ...extra,
  });
const portrait = (
  id: string,
  x = 1270,
  y = 1080,
  size = 1000,
  extra: Partial<ArtworkLayer> = {},
) =>
  image(id, x, y + 230, size + 230, size + 230, {
    type: "character",
    anchor: [0.5, 1],
    parallax: 1,
    ...extra,
  });
const near = (x = -150, extra: Partial<ArtworkLayer> = {}) =>
  image("foreground", x, -180, 650, 1440, {
    type: "foreground",
    parallax: 1.45,
    ...extra,
  });
const poses = (prefix: string, frames: number[]) =>
  frames.map((frame, i) => ({ frame, assetId: `${prefix}-${i % 4}` }));
const walking = (duration: number, x = 1110, y = 970) =>
  person("walk-0", x, y, 830, {
    id: "routine-ivan",
    width: 498,
    cels: poses(
      "walk",
      [0, 12, 24, 36].filter((f) => f < duration),
    ),
    cameraFollow: true,
  });
const running = (duration: number, x = 1150, y = 1000, h = 900) =>
  person("run-0", x, y, h, {
    width: (h * 800) / 1100,
    id: "running-ivan",
    cels: poses(
      "run",
      [0, 7, 14, 21, 28, 35, 42, 49, 56, 63].filter((f) => f < duration),
    ),
    motion: motion([
      [0, -35, 0],
      [duration - 1, 55, -12],
    ]),
  });
const crowd = (duration: number) =>
  [0, 1, 2, 3].map((i) =>
    person("commuter", 800 + i * 65, 770 + i * 35, 150 + i * 30, {
      id: `commuter-${i}`,
      opacity: 0.7 + i * 0.06,
      parallax: 0.45 + i * 0.1,
      motion: motion([
        [0, 0, 0],
        [duration - 1, 38, 0],
      ]),
    }),
  );
const camera2 = (
  duration: number,
  x = 0,
  y = 0,
  zoom = 1,
  pivotX = 960,
  pivotY = 440,
): Keyframe<Camera2DState>[] => [
  {
    frame: 0,
    value: { x: 0, y: 0, zoom: 1, pivotX, pivotY },
    easing: "smooth",
  },
  { frame: duration - 1, value: { x, y, zoom, pivotX, pivotY } },
];
const spatial = (layer: ArtworkLayer, z: number): ArtworkLayer => {
  const k = (1158 - z) / 1158;
  return {
    ...layer,
    x: 960 + (layer.x - 960) * k,
    y: 540 + (layer.y - 540) * k,
    width: layer.width * k,
    height: layer.height * k,
    depth: z,
  };
};

const grounded = (layers: ArtworkLayer[]) =>
  layers.flatMap((layer) => {
    if (!/^(front|rear|walk-\d|run-\d|commuter)$/.test(layer.assetId))
      return [layer];
    const foot =
      layer.assetId.startsWith("run") || layer.assetId.startsWith("walk")
        ? 0.03
        : 0;
    return [
      image(
        "contact-shadow",
        layer.x,
        layer.y + layer.height * foot,
        layer.width * 0.85,
        layer.height * 0.055,
        {
          id: `${layer.id}-contact`,
          anchor: [0.5, 0.5],
          parallax: layer.parallax,
          cameraFollow: layer.cameraFollow,
          opacity: layer.opacity,
          motion: layer.motion,
          depth: layer.depth === undefined ? undefined : layer.depth - 0.01,
        },
      ),
      layer,
    ];
  });

const keyArt = (name: string) =>
  image(`key-${name}`, -32, -18, 1984, 1116, { parallax: 0.2 });

function layersFor(cut: number, duration: number): ArtworkLayer[] {
  switch (cut) {
    case 1:
      return [image("eye", 0, 0, 1920, 1080, { parallax: 0 })];
    case 2:
      return [keyArt("assigned"), near(-490)];
    case 3:
      return [
        plate("pavement"),
        image("route", 0, 0, 1920, 1080),
        image("shoe-1", -300, -70, 1886, 1100, {
          type: "character",
          cels: [
            { frame: 0, assetId: "shoe-1" },
            { frame: 8, assetId: "shoe-0" },
          ],
        }),
      ];
    case 4:
      return [
        plate("glass"),
        portrait("portrait-0", 1340, 1110, 1010),
        near(-420),
      ];
    case 5:
      return [
        plate("street"),
        ...crowd(duration),
        person("rear", 470, 1060, 1000),
        near(1720),
      ];
    case 6:
      return [
        plate("street"),
        ...crowd(duration),
        walking(duration),
        near(-350),
      ];
    case 7:
      return [
        plate("glass"),
        portrait("portrait-0", 1820, 1390, 1440, { opacity: 0.28 }),
      ];
    case 8:
      return [
        plate("street"),
        ...crowd(duration),
        person("rear", 1170, 930, 670),
        near(1720),
      ];
    // Scene-sized clipping of reflections is provided by OpeningScene, never an image-sized matte.
    case 9:
      return [plate("glass")];
    case 10:
      return [plate("glass")];
    case 11:
      return [
        plate("glass"),
        image("hand", -480, 120, 2200, 1375, {
          type: "character",
          motion: motion([
            [0, 0, 30],
            [20, 28, 0],
            [duration - 1, 28, 0],
          ]),
        }),
      ];
    case 12:
      return [
        image("key-awakening", -967, -223, 3264, 1836, {
          id: "emotion-focus",
          parallax: 1,
        }),
      ];
    case 13:
      return [
        plate("pavement"),
        image("route", 0, 0, 1920, 1080),
        image("shoe-0", -300, -70, 1886, 1100, {
          id: "boundary-foot",
          type: "character",
          motion: motion([
            [0, 0, 0],
            [12, 140, -36],
            [29, 340, 0],
            [59, 340, 0],
          ]),
          cels: [
            { frame: 0, assetId: "shoe-0" },
            { frame: 12, assetId: "shoe-1" },
            { frame: 29, assetId: "shoe-2" },
          ],
        }),
      ];
    case 14:
      return [
        plate("street"),
        ...crowd(duration),
        walking(duration),
        person("rear", 360, 1290, 1360, { id: "displaced-original" }),
        near(-350),
      ];
    case 15:
      return [image("eye", -96, -54, 2112, 1188, { id: "emotion-focus" })];
    case 16:
      return [
        plate("street"),
        ...crowd(duration),
        person("front", 1230, 960, 800),
        near(-310),
      ];
    case 17:
      return [
        image("key-awakening", -1550, -300, 4032, 2268, {
          id: "emotion-focus",
          parallax: 1,
        }),
      ];
    case 18:
      return [
        plate("glass"),
        portrait("portrait-1", 1450, 1110, 1070),
        near(-300),
      ];
    case 19:
      return [keyArt("sprint"), near(-490)];
    case 20:
      return [
        plate("pavement"),
        image("shoe-0", -160, -70, 1886, 1100, {
          type: "character",
          cels: [
            { frame: 0, assetId: "shoe-0" },
            { frame: 7, assetId: "shoe-1" },
            { frame: 16, assetId: "shoe-2" },
          ],
          motion: motion([
            [0, 0, 0],
            [duration - 1, 410, -80],
          ]),
        }),
      ];
    case 21:
      return [
        plate("corridor"),
        running(duration, 1080, 1020, 1000),
        image("streaks", -80, -30, 2100, 1181, {
          opacity: 0.45,
          type: "foreground",
          motion: motion([
            [0, 120, 0],
            [duration - 1, -200, 0],
          ]),
        }),
      ];
    case 22:
      return [
        spatial(plate("corridor-ground"), -600),
        ...Array.from({ length: 12 }, (_, i) =>
          spatial(
            plate(`facade-${i}`, {
              id: `peel-${i}`,
              motion: motion([
                [0, 0, 0],
                [
                  duration - 1,
                  (i < 6 ? -1 : 1) * (20 + (i % 6) * 14),
                  -(i % 3) * 12,
                  ((i % 3) - 1) * 2,
                ],
              ]),
            }),
            -450 + i * 12,
          ),
        ),
        spatial(running(duration, 1200, 1000, 850), 0),
      ];
    case 23:
      return [keyArt("edge")];
    case 24:
      return [
        plate("glass"),
        portrait("portrait-0", 710, 1110, 1080),
        portrait("portrait-0", 1370, 1110, 1080, {
          id: "exact-copy",
          motion: motion([
            [0, 0, 0],
            [duration - 1, 90, 0],
          ]),
        }),
      ];
    case 25:
      return [
        plate("boundary"),
        portrait("portrait-3", 1180, 1140, 1200, {
          cels: [
            { frame: 0, assetId: "portrait-1" },
            { frame: 18, assetId: "portrait-3" },
          ],
        }),
      ];
    case 26:
      return [
        plate("boundary"),
        image("hand", -480, 120, 2200, 1375, {
          type: "character",
          motion: motion([
            [0, 0, 0],
            [14, 36, -22],
            [16, 33, -24],
            [18, 38, -23],
            [20, 36, -22],
            [duration - 1, 120, -80],
          ]),
        }),
      ];
    case 27:
      return [
        plate("boundary-shell"),
        ...Array.from({ length: 54 }, (_, i) => {
          const row = Math.floor(i / 6),
            col = i % 6,
            keep = col === 2 || col === 3,
            delay = Math.min(duration - 4, row * 2);
          return plate(`road-${row}-${col}`, {
            id: `road-${i}`,
            parallax: 0.3,
            motion: motion([
              [0, 0, 0],
              [delay + 1, 0, 0],
              [
                duration - 1,
                keep ? 0 : (col < 3 ? -1 : 1) * (35 + row * 7),
                keep ? 0 : 50 + row * 10,
                keep ? 0 : col < 3 ? -2 : 2,
                1,
                keep ? 1 : 0.12,
              ],
            ]),
          });
        }),
        running(duration, 1110, 1000, 760),
      ];
    case 28:
      return [
        keyArt("leap-hero"),
        image("streaks", -150, 0, 2300, 1294, { opacity: 0.25, parallax: 1.4 }),
      ];
    case 29:
      return [
        plate("boundary"),
        image("hand", -480, 60, 2200, 1375, {
          type: "character",
          motion: motion([
            [0, 0, 0],
            [duration - 1, 85, -25],
          ]),
        }),
      ];
    // Memory cuts are real earlier compositions sampled in OpeningScene.
    case 30:
    case 31:
    case 32:
    case 33:
      return [];
    case 34:
      return [
        plate("corridor"),
        ...Array.from({ length: 18 }, (_, i) => {
          const row = Math.floor(i / 6),
            col = i % 6,
            h = 190 + row * 120;
          return person(
            "rear",
            960 + (col - 2.5) * (150 + row * 65),
            780 + row * 130,
            h,
            {
              id: `ivan-copy-${i}`,
              parallax: 0.45 + row * 0.3,
              motion: motion([
                [0, 0, 0, 0, 1, i < 3 ? 1 : 0],
                [Math.min(38, 4 + i * 2), 0, 0, 0, 1, 1],
                [duration - 1, 0, 0, 0, 1, 0.3 + row * 0.25],
              ]),
            },
          );
        }),
        near(-410),
      ];
    case 35:
      return [
        spatial(plate("corridor-ground"), -700),
        ...(["left", "right"] as const).map((side, i) => ({
          ...spatial(plate(`corridor-${side}`), -300),
          motion: motion([
            [0, 0, 0],
            [duration - 1, i ? 520 : -520, 140, i ? 7 : -7],
          ]),
          depthMotion: [
            { frame: 0, value: { z: 0 } },
            { frame: duration - 1, value: { z: -500 } },
          ],
          rotation3D: [
            { frame: 0, value: { x: 0, y: 0, z: 0 } },
            { frame: duration - 1, value: { x: 2, y: i ? 7 : -7, z: 0 } },
          ],
        })),
        spatial(running(duration, 1130, 1030, 970), 50),
      ];
    case 36:
      return [
        plate("boundary"),
        person("leap-0", 610, 1050, 920, {
          width: (920 * 800) / 1100,
          cels: [
            { frame: 0, assetId: "leap-0" },
            { frame: 12, assetId: "leap-1" },
            { frame: 35, assetId: "leap-2" },
          ],
          motion: motion([
            [0, 0, 0],
            [25, 470, -210],
            [duration - 1, 870, -30],
          ]),
        }),
        image("streaks", -100, 70, 2300, 1294, { opacity: 0.35 }),
      ];
    case 37:
      return [
        spatial(plate("outside", { parallax: 0 }), -1200),
        ...(["left", "right"] as const).map((side, i) => ({
          ...spatial(plate(`boundary-${side}`), -200),
          motion: motion([
            [0, 0, 0],
            [duration - 1, i ? 1450 : -1450, 10, i ? 4 : -4],
          ]),
        })),
        spatial(
          person("rear", 1030, 1000, 650, {
            motion: motion([
              [0, 0, 0],
              [duration - 1, 0, -70, 0, 0.62],
            ]),
          }),
          0,
        ),
      ];
    case 38:
      return [keyArt("outside-hero")];
    case 39:
    case 40:
      return [];
    default:
      throw new Error(`Undefined opening cut ${cut}`);
  }
}

const baseShots: ShotDefinition[] = openingCuts
  .slice(0, -1)
  .map((startFrame, i) => {
    const duration = openingCuts[i + 1] - startFrame,
      cut = i + 1;
    const base = {
      id: `C${String(cut).padStart(2, "0")} / ${openingTitles[i]}`,
      startFrame,
      duration,
      layers: grounded(layersFor(cut, duration)).sort(
        (a, b) => (a.depth ?? 0) - (b.depth ?? 0),
      ),
    };
    if ([22, 35, 37].includes(cut))
      return {
        ...base,
        mode: "image-plane-3d",
        projection: "perspective",
        fov: 50,
        camera: [
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
            },
            easing: "smooth",
          },
          {
            frame: duration - 1,
            value: {
              x: cut === 34 ? 55 : 28,
              y: cut === 35 ? 18 : 0,
              z: cut === 37 ? 1030 : 1098,
              targetX: 0,
              targetY: 0,
              targetZ: 0,
              zoom: 1,
            },
          },
        ],
      };
    if (cut === 12 || cut === 17) {
      const camera = camera2(
        duration,
        0,
        0,
        cut === 17 ? 1.04 : 1.035,
        1220,
        430,
      );
      return {
        ...base,
        mode: "multiplane-2d",
        camera: [
          camera[0],
          { ...camera[1], frame: cut === 17 ? 5 : 7 },
          camera[1],
        ],
      };
    }
    const travel: Record<number, [number, number, number]> = {
      2: [18, 0, 1],
      4: [0, 0, 1.025],
      5: [48, 0, 1.035],
      6: [50, 0, 1],
      8: [38, 0, 1],
      10: [-24, 0, 1.025],
      11: [0, 0, 1.025],
      12: [-35, 0, 1],
      13: [0, 0, 1.08],
      14: [50, 0, 1],
      16: [-24, 0, 1],
      17: [0, 0, 1.035],
      19: [60, -12, 1.02],
      21: [75, 0, 1],
      23: [14, 0, 1],
      27: [0, 0, 1],
      28: [-18, -5, 1],
      34: [0, 0, 1],
      24: [0, 0, 1.02],
      25: [-18, 0, 1],
      26: [0, 0, 1.025],
      29: [0, 0, 1.035],
      36: [45, -18, 1],
      38: [0, 0, 1],
    };
    const [x, y, z] = travel[cut] ?? [0, 0, 1];
    return {
      ...base,
      mode: [1, 3, 7, 13, 15, 20, 39, 40].includes(cut)
        ? "flat-2d"
        : "multiplane-2d",
      camera: camera2(duration, x, y, z, cut === 2 ? 1280 : 960, 440),
    };
  });

// Sample actual earlier shots into local time so trimmed review compositions need no nested Freeze clock.
export const openingShots: ShotDefinition[] = baseShots.map((shot, index) => {
  if (index < 29 || index > 32) return shot;
  const source = baseShots[[5, 9, 13, 23][index - 29]],
    offset = [18, 30, 18, 28][index - 29];
  if (source.mode === "image-plane-3d")
    throw new Error("Memory sources must be illustrated 2D shots");
  const frames = Array.from({ length: shot.duration }, (_, frame) => ({
    frame,
    source: offset + Math.min(frame, 10),
  }));
  return {
    ...shot,
    mode: source.mode,
    camera: frames.map((f) => ({
      frame: f.frame,
      value: sample(source.camera, f.source),
    })),
    layers: source.layers.map((layer) => ({
      ...layer,
      motion: frames.map((f) => ({
        frame: f.frame,
        value: layer.motion ? sample(layer.motion, f.source) : t(),
      })),
      cels: layer.cels
        ? frames.map((f) => ({
            frame: f.frame,
            assetId: poseAt(layer.cels, f.source, layer.assetId),
          }))
        : undefined,
    })),
  };
});
