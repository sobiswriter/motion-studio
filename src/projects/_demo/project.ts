import type { MotionProject } from "../../engine/types";
import { assets } from "./assets";
import { shots } from "./shots";

export const studioPreflight: MotionProject = {
  id: "StudioPreflight",
  title: "Studio Preflight",
  width: 1920,
  height: 1080,
  fps: 30,
  backgroundColor: "#26333e",
  assets,
  shots,
  audio: { src: assets.tone.src },
  cues: { "pose-change": { frame: 60, label: "Subject pose substitution" } },
};
