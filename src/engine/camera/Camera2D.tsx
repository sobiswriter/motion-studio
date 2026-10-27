import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { Camera2DState, Keyframe } from "../types";
import { sample } from "../timeline/keyframes";

export const Camera2D = ({
  camera,
  children,
}: {
  camera: Keyframe<Camera2DState>[];
  children: ReactNode;
}) => {
  const state = sample(camera, useCurrentFrame());
  return (
    <AbsoluteFill
      style={{
        transformOrigin: `${state.pivotX}px ${state.pivotY}px`,
        transform: `scale(${state.zoom}) translate(${-state.x}px, ${-state.y}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const parallaxCamera = (
  state: Camera2DState,
  factor: number,
  follow = false,
): Camera2DState =>
  follow
    ? { ...state, x: 0, y: 0, zoom: 1 }
    : {
        ...state,
        x: state.x * factor,
        y: state.y * factor,
        zoom: 1 + (state.zoom - 1) * factor,
      };
