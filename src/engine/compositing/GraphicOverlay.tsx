import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Graphic } from "../types";
import { progress, sample } from "../timeline/keyframes";
import { maskStyle } from "./MaskReveal";

export const GraphicOverlay = ({ graphics = [] }: { graphics?: Graphic[] }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {graphics.map((g) => {
        if (frame < g.from || frame >= g.from + g.duration) return null;
        const m = g.motion
          ? sample(g.motion, frame)
          : { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };
        return (
          <svg
            key={g.id}
            width={width}
            height={height}
            style={{
              position: "absolute",
              overflow: "visible",
              opacity: m.opacity,
              ...(g.reveal ? maskStyle(g.reveal, frame) : {}),
            }}
          >
            <g
              transform={`translate(${g.x + m.x} ${g.y + m.y}) rotate(${m.rotation}) scale(${m.scale})`}
            >
              {g.kind === "text" && (
                <text
                  fill={g.color}
                  fontSize={g.fontSize}
                  fontFamily={g.fontFamily ?? "Arial, sans-serif"}
                  dominantBaseline="hanging"
                >
                  {g.text}
                </text>
              )}
              {g.kind === "rect" && (
                <rect width={g.width} height={g.height} fill={g.color} />
              )}
              {g.kind === "ellipse" && (
                <ellipse
                  cx={(g.width ?? 0) / 2}
                  cy={(g.height ?? 0) / 2}
                  rx={(g.width ?? 0) / 2}
                  ry={(g.height ?? 0) / 2}
                  fill={g.color}
                />
              )}
              {g.kind === "path" && (
                <path
                  d={g.path}
                  fill="none"
                  stroke={g.color}
                  strokeWidth={g.strokeWidth ?? 2}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - progress(frame, g.from, g.duration)}
                />
              )}
            </g>
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};
