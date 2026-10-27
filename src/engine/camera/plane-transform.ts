import { Euler, Vector3 } from "three";
import type { ArtworkLayer } from "../types";
import { sample } from "../timeline/keyframes";

export const planeTransform = (
  layer: ArtworkLayer,
  frame: number,
  width: number,
  height: number,
) => {
  const m = layer.motion
    ? sample(layer.motion, frame)
    : { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 };
  const r = layer.rotation3D
    ? sample(layer.rotation3D, frame)
    : { x: 0, y: 0, z: 0 };
  const rotation = new Euler(
    (r.x * Math.PI) / 180,
    (r.y * Math.PI) / 180,
    ((r.z - (layer.rotation ?? 0) - m.rotation) * Math.PI) / 180,
  );
  const scale = (layer.scale ?? 1) * m.scale;
  const [ax, ay] = layer.anchor ?? [0, 0];
  const pivot = new Vector3(
    (0.5 - ax) * layer.width * scale,
    -(0.5 - ay) * layer.height * scale,
    0,
  ).applyEuler(rotation);
  return {
    position: [
      layer.x + m.x - width / 2 + pivot.x,
      height / 2 - layer.y - m.y + pivot.y,
      (layer.depth ?? 0) +
        (layer.depthMotion ? sample(layer.depthMotion, frame).z : 0) +
        pivot.z,
    ] as [number, number, number],
    rotation: [rotation.x, rotation.y, rotation.z] as [number, number, number],
    scale,
    opacity: (layer.opacity ?? 1) * m.opacity,
  };
};
