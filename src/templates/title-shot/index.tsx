import { GraphicOverlay } from "../../engine/compositing/GraphicOverlay";
import { FlatShot } from "../flat-shot";
import type { ShotProps } from "../flat-shot";

export const TitleShot = (props: ShotProps) => (
  <>
    <FlatShot {...props} />
    <GraphicOverlay graphics={props.shot.graphics} />
  </>
);
