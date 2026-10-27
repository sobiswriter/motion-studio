import type { MotionProject } from "../../engine/types";
import { filmShots } from "./film-shots";
import { productionAssets } from "./production-assets";
import { availableAssets } from "./assets";
import { filmSettings } from "./project";

export const ivansEscape: MotionProject = {
  id: "IvansEscape",
  title: "Ivan's Escape",
  ...filmSettings,
  backgroundColor: "#0B1018",
  assets: { ...productionAssets, music: availableAssets.music },
  shots: filmShots,
  audio: { src: availableAssets.music.src },
};
export const ivansEscapePilot: MotionProject = {
  ...ivansEscape,
  id: "IvansEscapePilot",
  title: "Ivan's Escape — 18-second pilot",
  shots: filmShots.slice(0, 6),
};
export const ivansEscapePacket: MotionProject = {
  ...ivansEscape,
  id: "IvansEscapePacket01",
  title: "Ivan's Escape — opening",
  shots: filmShots.slice(0, 2),
};
