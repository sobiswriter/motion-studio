import { AbsoluteFill, useCurrentFrame } from "remotion";
import type {
  ArtworkLayer,
  AssetManifest,
  Camera2DState,
  Keyframe,
} from "../types";
import { Artwork } from "../layers/LayeredArtwork";
import { sample } from "../timeline/keyframes";
import { parallaxCamera } from "./Camera2D";

export const ParallaxScene = ({
  layers,
  assets,
  camera,
}: {
  layers: ArtworkLayer[];
  assets: AssetManifest;
  camera: Keyframe<Camera2DState>[];
}) => {
  const state = sample(camera, useCurrentFrame());
  return (
    <AbsoluteFill>
      {layers.map((layer) => {
        const c = parallaxCamera(
          state,
          layer.parallax ?? 1,
          layer.cameraFollow,
        );
        return (
          <AbsoluteFill
            key={layer.id}
            style={{
              transformOrigin: `${c.pivotX}px ${c.pivotY}px`,
              transform: `scale(${c.zoom}) translate(${-c.x}px, ${-c.y}px)`,
            }}
          >
            <Artwork layer={layer} assets={assets} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
