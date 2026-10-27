import { Video } from "@remotion/media";
import type { CSSProperties } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import type { ArtworkLayer, AssetManifest, Transform2D } from "../types";
import { sample } from "../timeline/keyframes";
import { CharacterCel } from "../characters/CharacterCel";
import { maskStyle } from "../compositing/MaskReveal";

export const layerMotion = (layer: ArtworkLayer, frame: number): Transform2D =>
  layer.motion
    ? sample(layer.motion, frame)
    : { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 };

export const Artwork = ({
  layer,
  assets,
}: {
  layer: ArtworkLayer;
  assets: AssetManifest;
}) => {
  const frame = useCurrentFrame();
  const motion = layerMotion(layer, frame);
  const [ax, ay] = layer.anchor ?? [0, 0];
  const style: CSSProperties = {
    position: "absolute",
    left: layer.x + motion.x - ax * layer.width,
    top: layer.y + motion.y - ay * layer.height,
    width: layer.width,
    height: layer.height,
    objectFit: "fill",
    transformOrigin: `${ax * 100}% ${ay * 100}%`,
    transform: `rotate(${(layer.rotation ?? 0) + motion.rotation}deg) scale(${(layer.scale ?? 1) * motion.scale})`,
    opacity: (layer.opacity ?? 1) * motion.opacity,
  };
  if (layer.mask && "assetId" in layer.mask) {
    style.maskImage = `url("${staticFile(assets[layer.mask.assetId].src)}")`;
    style.maskSize = "100% 100%";
    style.maskMode = "alpha";
  } else if (layer.mask) Object.assign(style, maskStyle(layer.mask, frame));
  return layer.type === "video" ? (
    <Video src={staticFile(assets[layer.assetId].src)} style={style} muted />
  ) : (
    <CharacterCel
      assetId={layer.assetId}
      cels={layer.cels}
      assets={assets}
      style={style}
    />
  );
};

export const LayeredArtwork = ({
  layers,
  assets,
}: {
  layers: ArtworkLayer[];
  assets: AssetManifest;
}) => (
  <AbsoluteFill>
    {layers.map((layer) => (
      <Artwork key={layer.id} layer={layer} assets={assets} />
    ))}
  </AbsoluteFill>
);
