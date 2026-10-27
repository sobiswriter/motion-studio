import type { MotionProject, ShotDefinition } from "../../engine/types";
import { Camera2D } from "../../engine/camera/Camera2D";
import { LayeredArtwork } from "../../engine/layers/LayeredArtwork";

export type ShotProps = { shot: ShotDefinition; project: MotionProject };
export const FlatShot = ({ shot, project }: ShotProps) => {
  if (shot.mode === "image-plane-3d")
    throw new Error("FlatShot needs a 2D camera");
  return (
    <>
      {shot.layers.map((layer) =>
        layer.cameraFollow ? (
          <LayeredArtwork
            key={layer.id}
            layers={[layer]}
            assets={project.assets}
          />
        ) : (
          <Camera2D key={layer.id} camera={shot.camera}>
            <LayeredArtwork layers={[layer]} assets={project.assets} />
          </Camera2D>
        ),
      )}
    </>
  );
};
