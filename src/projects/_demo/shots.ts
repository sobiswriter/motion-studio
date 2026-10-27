import type {
  ArtworkLayer,
  Camera2DState,
  Graphic,
  Keyframe,
  ShotDefinition,
} from "../../engine/types";

const camera = (x = 0, zoom = 1): Camera2DState => ({
  x,
  y: 0,
  zoom,
  pivotX: 960,
  pivotY: 540,
});
const track = (endX: number, zoom: number): Keyframe<Camera2DState>[] => [
  { frame: 0, value: camera(), easing: "smooth" },
  { frame: 39, value: camera(endX, zoom) },
];
const plate: ArtworkLayer = {
  id: "plate",
  assetId: "plate",
  type: "background",
  x: -320,
  y: -180,
  width: 2560,
  height: 1440,
  parallax: 0.15,
  depth: -600,
  cropSafe: { inset: 10 },
};
const mid: ArtworkLayer = {
  id: "mid",
  assetId: "mid",
  type: "environment",
  x: -320,
  y: -180,
  width: 2560,
  height: 1440,
  parallax: 0.45,
  depth: -300,
};
const subject: ArtworkLayer = {
  id: "subject",
  assetId: "poseA",
  type: "character",
  x: 1100,
  y: 880,
  width: 400,
  height: 600,
  anchor: [0.5, 1],
  parallax: 0.8,
  depth: 0,
};
const front: ArtworkLayer = {
  id: "foreground",
  assetId: "foreground",
  type: "foreground",
  x: -320,
  y: -180,
  width: 2560,
  height: 1440,
  parallax: 1.35,
  depth: 250,
};
const label = (text: string, duration = 40): Graphic => ({
  id: "mode-label",
  kind: "text",
  from: 0,
  duration,
  x: 120,
  y: 110,
  color: "#f2f4f6",
  fontSize: 68,
  text,
  motion: [
    {
      frame: 0,
      value: { x: -24, y: 0, scale: 1, rotation: 0, opacity: 1 },
      easing: "smooth",
    },
    { frame: 20, value: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 } },
  ],
});

export const shots: ShotDefinition[] = [
  {
    id: "flat",
    mode: "flat-2d",
    template: "title",
    startFrame: 0,
    duration: 40,
    camera: track(0, 1.06),
    layers: [plate, { ...subject, mask: { assetId: "mask" } }, front],
    graphics: [
      label("01 / FLAT COMPOSITING"),
      {
        id: "path",
        kind: "path",
        from: 0,
        duration: 40,
        x: 120,
        y: 215,
        color: "#a7beca",
        strokeWidth: 5,
        path: "M0 0 H900",
      },
    ],
  },
  {
    id: "multiplane",
    mode: "multiplane-2d",
    startFrame: 40,
    duration: 48,
    camera: track(150, 1.03),
    layers: [
      plate,
      mid,
      {
        ...subject,
        cels: [
          { frame: 0, assetId: "poseA" },
          { frame: 20, assetId: "poseB" },
        ],
        motion: [
          {
            frame: 0,
            value: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
          },
          {
            frame: 39,
            value: { x: 55, y: 0, scale: 1, rotation: 0, opacity: 1 },
          },
        ],
      },
      front,
    ],
    graphics: [label("02 / MULTIPLANE", 48)],
    audioCueRefs: ["pose-change"],
  },
  {
    id: "image-planes",
    mode: "image-plane-3d",
    startFrame: 80,
    duration: 40,
    // eslint-disable-next-line @remotion/non-pure-animation -- Timeline data sampled by MaskReveal, not a CSS transition.
    transition: { kind: "wipe-left", duration: 8 },
    projection: "perspective",
    fov: 50,
    camera: [
      {
        frame: 0,
        value: {
          x: -65,
          y: 0,
          z: 1450,
          targetX: -20,
          targetY: 0,
          targetZ: 0,
          zoom: 1,
        },
        easing: "smooth",
      },
      {
        frame: 39,
        value: {
          x: 80,
          y: 20,
          z: 1310,
          targetX: 20,
          targetY: 0,
          targetZ: 0,
          zoom: 1,
        },
      },
    ],
    layers: [
      {
        ...plate,
        cropSafe: undefined,
        width: 4096,
        height: 2304,
        x: -1088,
        y: -612,
      },
      mid,
      { ...subject, assetId: "poseB" },
      front,
    ],
    graphics: [label("03 / IMAGE-PLANE 3D")],
  },
];
