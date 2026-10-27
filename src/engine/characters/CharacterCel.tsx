import type { CSSProperties } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import type { AssetManifest, PoseCue } from "../types";
import { poseAt } from "../timeline/keyframes";

export const CharacterCel = ({
  assetId,
  cels,
  assets,
  style,
}: {
  assetId: string;
  cels?: PoseCue[];
  assets: AssetManifest;
  style: CSSProperties;
}) => {
  const id = poseAt(cels, useCurrentFrame(), assetId);
  const asset = assets[id];
  if (!asset) throw new Error(`Missing character asset: ${id}`);
  return <Img src={staticFile(asset.src)} style={style} />;
};
