import { Camera3DStage } from "../../engine/camera/Camera3DStage";
import type { ShotProps } from "../flat-shot";

export const ImagePlaneShot = ({ shot, project }: ShotProps) => {
  if (shot.mode !== "image-plane-3d")
    throw new Error("ImagePlaneShot needs a 3D camera");
  return <Camera3DStage shot={shot} assets={project.assets} />;
};
