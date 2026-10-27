import { ThreeCanvas } from "@remotion/three";
import { useLoader, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { DoubleSide, SRGBColorSpace, TextureLoader } from "three";
import type {
  ArtworkLayer,
  AssetManifest,
  Camera3DState,
  ShotDefinition,
} from "../types";
import { poseAt, sample } from "../timeline/keyframes";
import { planeTransform } from "./plane-transform";

const Camera = ({ state }: { state: Camera3DState }) => {
  const camera = useThree((s) => s.camera);
  useLayoutEffect(() => {
    camera.position.set(state.x, state.y, state.z);
    camera.lookAt(state.targetX, state.targetY, state.targetZ);
    camera.zoom = state.zoom;
    camera.updateProjectionMatrix();
  }, [camera, state]);
  return null;
};

const ImagePlane = ({
  layer,
  assets,
  order,
}: {
  layer: ArtworkLayer;
  assets: AssetManifest;
  order: number;
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const id = poseAt(layer.cels, frame, layer.assetId);
  const src = assets[id].src;
  const maskSrc =
    layer.mask && "assetId" in layer.mask
      ? assets[layer.mask.assetId].src
      : undefined;
  // Suspense keeps ThreeCanvas's frame capture pending until the complete scene mounts.
  const [map, alpha] = useLoader(TextureLoader, [
    staticFile(src),
    ...(maskSrc ? [staticFile(maskSrc)] : []),
  ]);
  map.colorSpace = SRGBColorSpace;
  const transform = planeTransform(layer, frame, width, height);
  return (
    <mesh
      renderOrder={order}
      position={transform.position}
      rotation={transform.rotation}
      scale={[transform.scale, transform.scale, 1]}
    >
      <planeGeometry args={[layer.width, layer.height]} />
      <meshBasicMaterial
        map={map}
        alphaMap={alpha}
        transparent
        opacity={transform.opacity}
        depthWrite={false}
        side={DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
};

export const Camera3DStage = ({
  shot,
  assets,
}: {
  shot: Extract<ShotDefinition, { mode: "image-plane-3d" }>;
  assets: AssetManifest;
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const state = sample(shot.camera, frame);
  const layers = [...shot.layers].sort(
    (a, b) =>
      planeTransform(a, frame, width, height).position[2] -
      planeTransform(b, frame, width, height).position[2],
  );
  return (
    <ThreeCanvas
      width={width}
      height={height}
      orthographic={shot.projection === "orthographic"}
      camera={{
        position: [state.x, state.y, state.z],
        fov: shot.fov ?? 50,
        near: 1,
        far: 20000,
        zoom: state.zoom,
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <Camera state={state} />
      {layers.map((layer, i) => (
        <ImagePlane key={layer.id} layer={layer} assets={assets} order={i} />
      ))}
    </ThreeCanvas>
  );
};
