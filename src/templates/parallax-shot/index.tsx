import { ParallaxScene } from "../../engine/camera/ParallaxScene";
import type { ShotProps } from "../flat-shot";

export const ParallaxShot = ({ shot, project }: ShotProps) => {
  if (shot.mode === "image-plane-3d")
    throw new Error("ParallaxShot needs a 2D camera");
  return (
    <ParallaxScene
      layers={shot.layers}
      camera={shot.camera}
      assets={project.assets}
    />
  );
};
