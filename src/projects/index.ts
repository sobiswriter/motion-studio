import { studioPreflight } from "./_demo/project";
import type { MotionProject } from "../engine/types";
import {
  ivansEscape,
  ivansEscapePilot,
  ivansEscapePacket,
} from "./ivans-escape/film";

export const projects: MotionProject[] = [
  studioPreflight,
  ivansEscape,
  ivansEscapePilot,
  ivansEscapePacket,
];
