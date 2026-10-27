import type { AssetManifest } from "../../engine/types";

export const assets: AssetManifest = {
  plate: {
    id: "plate",
    src: "projects/_demo/images/plate.png",
    kind: "image",
    width: 2560,
    height: 1440,
  },
  mid: {
    id: "mid",
    src: "projects/_demo/images/mid.png",
    kind: "image",
    width: 2560,
    height: 1440,
    alpha: true,
  },
  foreground: {
    id: "foreground",
    src: "projects/_demo/images/foreground.png",
    kind: "image",
    width: 2560,
    height: 1440,
    alpha: true,
  },
  poseA: {
    id: "poseA",
    src: "projects/_demo/images/pose-a.png",
    kind: "image",
    width: 400,
    height: 600,
    alpha: true,
  },
  poseB: {
    id: "poseB",
    src: "projects/_demo/images/pose-b.png",
    kind: "image",
    width: 400,
    height: 600,
    alpha: true,
  },
  mask: {
    id: "mask",
    src: "projects/_demo/masks/soft-window.png",
    kind: "image",
    width: 400,
    height: 600,
    alpha: true,
  },
  tone: {
    id: "tone",
    src: "projects/_demo/audio/preflight.wav",
    kind: "audio",
  },
};
