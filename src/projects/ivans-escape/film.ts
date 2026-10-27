import type { MotionProject } from "../../engine/types";
import { openingShots } from "./opening-shots";
import { illustratedAssets } from "./illustrated-assets";
import { availableAssets } from "./assets";
import { filmSettings } from "./project";
import { pass02Assets } from "./pass02-assets";

export const ivansEscape: MotionProject = {
  id: "IvansEscape",
  title: "Ivan's Escape",
  ...filmSettings,
  backgroundColor: "#0B1018",
  assets: {
    ...illustratedAssets,
    ...pass02Assets,
    music: availableAssets.music,
  },
  shots: openingShots,
  audio: { src: availableAssets.music.src },
};
export const ivansEscapePilot: MotionProject = {
  ...ivansEscape,
  id: "IvansEscapePilot",
  title: "Ivan's Escape — 18-second pilot",
  shots: openingShots.filter((shot) => shot.startFrame < 540),
};
export const ivansEscapePacket: MotionProject = {
  ...ivansEscape,
  id: "IvansEscapePacket01",
  title: "Ivan's Escape — opening",
  shots: openingShots.filter((shot) => shot.startFrame < 180),
};
