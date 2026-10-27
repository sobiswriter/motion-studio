import type { ComponentType } from "react";
import type { MotionProject } from "../engine/types";
import { IvansEscapeFilm } from "./ivans-escape/IvansEscapeFilm";

export const projectComponents: Record<
  string,
  ComponentType<{ project: MotionProject }>
> = {
  IvansEscape: IvansEscapeFilm,
  IvansEscapePilot: IvansEscapeFilm,
  IvansEscapePacket01: IvansEscapeFilm,
};
