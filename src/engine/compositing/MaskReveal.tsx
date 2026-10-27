import type { CSSProperties, ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import type { GeometricMask } from "../types";
import { progress } from "../timeline/keyframes";

export const maskStyle = (
  mask: GeometricMask,
  frame: number,
): CSSProperties => {
  const p = progress(frame, mask.from, mask.duration);
  return {
    clipPath:
      mask.shape === "wipe-left"
        ? `inset(0 ${(1 - p) * 100}% 0 0)`
        : `circle(${p * 150}% at 50% 50%)`,
  };
};

export const MaskReveal = ({
  mask,
  children,
  style,
}: {
  mask?: GeometricMask;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        ...style,
        ...(mask ? maskStyle(mask, frame) : {}),
      }}
    >
      {children}
    </div>
  );
};
