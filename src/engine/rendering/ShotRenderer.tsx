import { AbsoluteFill } from "remotion";
import { GraphicOverlay } from "../compositing/GraphicOverlay";
import { FlatShot } from "../../templates/flat-shot";
import type { ShotProps } from "../../templates/flat-shot";
import { ParallaxShot } from "../../templates/parallax-shot";
import { ImagePlaneShot } from "../../templates/image-plane-shot";
import { TitleShot } from "../../templates/title-shot";
import { MontageShot } from "../../templates/montage-shot";

export const ShotRenderer = (props: ShotProps) => {
  const { shot, project } = props;
  const Scene =
    shot.template === "title"
      ? TitleShot
      : shot.template === "montage"
        ? MontageShot
        : shot.mode === "flat-2d"
          ? FlatShot
          : shot.mode === "multiplane-2d"
            ? ParallaxShot
            : ImagePlaneShot;
  return (
    <AbsoluteFill
      style={{ backgroundColor: project.backgroundColor, overflow: "hidden" }}
    >
      <Scene {...props} />
      {shot.template !== "title" && <GraphicOverlay graphics={shot.graphics} />}
    </AbsoluteFill>
  );
};
