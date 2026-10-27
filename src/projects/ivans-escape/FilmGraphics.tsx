import type { ReactNode } from "react";
import { AbsoluteFill, Freeze, useCurrentFrame } from "remotion";
import type { MotionProject, ShotDefinition } from "../../engine/types";
import { progress, sample } from "../../engine/timeline/keyframes";
import { Camera2D } from "../../engine/camera/Camera2D";
import { ShotRenderer } from "../../engine/rendering/ShotRenderer";
import { montageCuts } from "./film-shots";

const red = "#FF4D57",
  pale = "#E6E9E6",
  fog = "#B5C3C9";
const label = (text: string, x: number, y: number, size = 22, color = fog) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontSize={size}
    fontFamily="IBM Plex Mono"
    letterSpacing="2"
  >
    {text}
  </text>
);
const bracket = (
  x: number,
  y: number,
  w: number,
  h: number,
  color = fog,
  opacity = 0.7,
) => (
  <path
    d={`M ${x + 24} ${y} H ${x} V ${y + 24} M ${x + w - 24} ${y} H ${x + w} V ${y + 24} M ${x} ${y + h - 24} V ${y + h} H ${x + 24} M ${x + w - 24} ${y + h} H ${x + w} V ${y + h - 24}`}
    fill="none"
    stroke={color}
    strokeWidth="2"
    opacity={opacity}
  />
);
const svg = (content: ReactNode) => (
  <svg
    viewBox="0 0 1920 1080"
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0 }}
  >
    {content}
  </svg>
);

const Memory = ({
  project,
  frame,
}: {
  project: MotionProject;
  frame: number;
}) => {
  const index = montageCuts.findIndex((end, i) => i > 0 && frame < end) - 1;
  const source = [2, 4, 6, 10][Math.max(0, index)];
  const shot = project.shots[source];
  const local = frame - montageCuts[Math.max(0, index)];
  const sourceFrame =
    [24, 48, 39, 65][Math.max(0, index)] + Math.min(local, 16);
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${1.035 + index * 0.015}) translate(${index % 2 ? 8 : -8}px,0)`,
      }}
    >
      <Freeze frame={sourceFrame}>
        <ShotRenderer project={project} shot={shot} />
        <FilmGraphics project={project} shot={shot} />
      </Freeze>
      {local === 7 || local === 8
        ? svg(
            <>
              <rect
                x="0"
                y={350 + index * 70}
                width="1920"
                height="8"
                fill={red}
                opacity=".2"
              />
              <path
                d={`M 300 ${360 + index * 70} H 1500`}
                stroke={fog}
                opacity=".3"
              />
            </>,
          )
        : null}
    </AbsoluteFill>
  );
};

export const FilmGraphics = ({
  project,
  shot,
}: {
  project: MotionProject;
  shot: ShotDefinition;
}) => {
  const f = useCurrentFrame();
  if (shot.id === "SH01") {
    const loading = progress(f, 10, 36),
      line = progress(f, 45, 15);
    const text =
      f < 12
        ? "INITIALIZING"
        : f < 24
          ? "INITIALIZING IVAN"
          : "INITIALIZING IVAN_001";
    return svg(
      <>
        <g stroke={fog} strokeWidth="1" opacity={0.075 * progress(f, 0, 11)}>
          {Array.from({ length: 21 }, (_, i) => (
            <path key={`v${i}`} d={`M ${i * 96} 0 V 1080`} />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <path key={`h${i}`} d={`M 0 ${i * 90} H 1920`} />
          ))}
        </g>
        <g opacity={progress(f, 4, 9)}>
          {label(text, 150, 835, 25, pale)}
          <path d="M 150 876 H 670" stroke={fog} opacity=".3" />
          <path
            d={`M 150 876 H ${150 + 520 * loading}`}
            stroke={pale}
            strokeWidth="3"
          />
        </g>
        <g opacity={line * 0.32} stroke={fog} fill="none">
          <path
            d={`M 960 300 L ${960 - 700 * line} ${300 + 780 * line} M 960 300 L ${960 + 700 * line} ${300 + 780 * line}`}
          />
          <path d={`M ${960 - 600 * line} 300 H ${960 + 600 * line}`} />
        </g>
      </>,
    );
  }
  if (shot.id === "SH02") {
    const zoom =
        shot.mode === "image-plane-3d" ? 1 : sample(shot.camera, f).zoom,
      y = 300 + 390 * zoom;
    return svg(
      <g opacity={progress(f, 8, 18)}>
        <circle cx="960" cy={y} r="3" fill="#C76A4B" />
        {bracket(943, y - 17, 34, 34, pale, 0.6)}
        <path
          d={`M 977 ${y} H 1080 L 1120 ${y - 40} H 1370`}
          stroke={pale}
          fill="none"
          opacity=".55"
        />
        {label("IVAN_001", 1130, y - 54, 22, pale)}
        {label("WORLD READY", 145, 145, 25, "#172330")}
      </g>,
    );
  }
  if (shot.id === "SH03")
    return svg(
      <g opacity={0.4 * progress(f, 65, 20)}>
        <circle
          cx="960"
          cy="540"
          r={28 + 300 * progress(f, 75, 15)}
          stroke={fog}
          fill="none"
          strokeWidth="1"
        />
      </g>,
    );
  if (shot.id === "SH04") {
    const angle = (360 * f) / 89;
    const clock = svg(
      <>
        <g fill="none" stroke={fog}>
          <circle cx="960" cy="540" r="348" opacity=".16" />
          <circle cx="960" cy="540" r="326" opacity=".7" strokeWidth="1.5" />
          <circle cx="960" cy="540" r="298" opacity=".2" />
          {Array.from({ length: 60 }, (_, i) => (
            <path
              key={i}
              d={`M 960 ${i % 5 ? 222 : 214} V ${i % 5 ? 229 : 242}`}
              transform={`rotate(${i * 6} 960 540)`}
              opacity={i % 5 ? 0.28 : 0.8}
              strokeWidth={i % 5 ? 1 : 2}
            />
          ))}
          <path
            d="M 960 540 V 258"
            transform={`rotate(${angle} 960 540)`}
            stroke={pale}
            strokeWidth="3"
          />
          <path
            d="M 960 540 V 322"
            transform={`rotate(${Math.floor(f / 9) * 36} 960 540)`}
            opacity=".24"
            strokeWidth="8"
          />
          <circle cx="960" cy="540" r="8" fill={pale} />
        </g>
        {label("12", 944, 190, 20)}
        {label("06", 944, 920, 20)}
        {label("03", 1335, 548, 20)}
        {label("09", 545, 548, 20)}
        {label("CYCLE 001", 1390, 520, 18)}
        {label("SYNC : LOCKED", 1390, 558, 18)}
      </>,
    );
    return shot.mode === "image-plane-3d" ? (
      clock
    ) : (
      <Camera2D camera={shot.camera}>{clock}</Camera2D>
    );
  }
  if (shot.id === "SH05")
    return f < 46
      ? null
      : svg(
          <g opacity={progress(f, 46, 8)}>
            {bracket(880, 160, 540, 700, red, 0.65)}
            {label("ANOMALY DETECTED", 900, 130, 23, red)}
            <path d="M 1410 160 H 1590" stroke={red} opacity=".4" />
          </g>,
        );
  if (shot.id === "SH06") {
    const crack = progress(f, 60, 30);
    const graphic = svg(
      <>
        <path
          d="M 1240 885 L 1170 871 L 1100 887 L 1055 855 L 998 900 L 938 930 L 870 914 L 810 960"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - crack}
          stroke={red}
          strokeWidth="3"
          fill="none"
        />
        {f >= 60 ? (
          <path
            d="M 1100 887 L 1110 935 L 1070 982"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - crack}
            stroke={red}
            strokeWidth="2"
            fill="none"
          />
        ) : null}
      </>,
    );
    return shot.mode === "image-plane-3d" ? (
      graphic
    ) : (
      <Camera2D camera={shot.camera}>{graphic}</Camera2D>
    );
  }
  if (shot.id === "SH07") {
    const t = progress(f, 66, 24),
      w = 460 + 1100 * t,
      h = 720 + 100 * t;
    return svg(
      <g opacity={progress(f, 18, 10)}>
        {bracket(960 - w / 2, 220 - h * t * 0.1, w, h, red, 0.6)}
        <path d="M 920 205 H 1000" stroke={red} />
      </g>,
    );
  }
  if (shot.id === "SH08")
    return svg(
      <g opacity={progress(f, 0, 8)}>
        {bracket(730, 195, 460, 745, red, 0.75)}
        {bracket(250, 230, 330, 380, red, 0.45)}
        {bracket(1390, 145, 280, 480, red, 0.4)}
        {label("ROUTINE CONFLICT", 128, 165, 30, red)}
        {label("ENTITY REPLACED", 128, 210, 21, pale)}
      </g>,
    );
  if (shot.id === "SH09")
    return svg(
      <g opacity={0.35 * progress(f, 12, 45)}>
        <path
          d="M 960 350 V 1080 M 960 670 H 1190"
          stroke={red}
          strokeWidth="1"
          fill="none"
        />
        {label("STRUCTURE / EXPOSED", 1375, 140, 18, red)}
      </g>,
    );
  if (shot.id === "SH10")
    return f >= 88 ? <AbsoluteFill style={{ background: "#000" }} /> : null;
  if (shot.id === "SH11") return null;
  if (shot.id === "SH12") {
    const t = progress(f, 45, 35);
    const segments = [
      [800, 260, 1120, 260],
      [1120, 260, 1120, 520],
      [1120, 520, 1120, 790],
      [800, 790, 1120, 790],
      [800, 520, 800, 790],
      [800, 260, 800, 520],
    ];
    return svg(
      <g opacity={1 - t}>
        {f < 45
          ? bracket(800, 260, 320, 530, fog, 0.65)
          : segments.map(([x1, y1, x2, y2], i) => (
              <path
                key={i}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                transform={`translate(${(i % 2 ? 1 : -1) * t * 150} ${(i - 2.5) * t * 30})`}
                stroke={fog}
                fill="none"
              />
            ))}
        {f < 45 ? label("IVAN_001", 805, 235, 18) : null}
      </g>,
    );
  }
  if (shot.id === "SH13")
    return svg(
      <g opacity={0.3 * (1 - progress(f, 50, 35))} stroke={fog} fill="none">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M ${830 + i * 29} 605 L ${i * 214} 1080`} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={`r${i}`}
            d={`M ${830 - i * 166} ${605 + i * 90} H ${1090 + i * 166}`}
          />
        ))}
      </g>,
    );
  if (shot.id === "SH14") return null;
  if (shot.id === "SH15") return <Memory project={project} frame={f} />;
  if (shot.id === "SH16") return null;
  if (shot.id === "SH17")
    return svg(
      <g fill="none" strokeWidth="2" opacity={0.18 * progress(f, 10, 25)}>
        <path d={`M ${390 - f * 4} 0 L ${700 - f * 3} 690`} stroke={red} />
        <path d={`M ${394 - f * 4} 0 L ${704 - f * 3} 690`} stroke="#6D9AAD" />
        <path d={`M ${1570 + f * 2} 0 L ${1310 + f * 2} 720`} stroke={red} />
      </g>,
    );
  if (shot.id === "SH18") return null;
  if (shot.id === "SH19" && f >= 102)
    return (
      <AbsoluteFill style={{ background: "#0B1018" }}>
        {svg(
          f < 159 ? (
            <>
              <text
                x="960"
                y="560"
                textAnchor="middle"
                fill={pale}
                fontSize="136"
                fontWeight="500"
                letterSpacing="10"
                fontFamily="Space Grotesk"
              >
                IVAN'S ESCAPE
              </text>
              <path
                d="M 420 630 L 825 630 L 850 620 L 870 636 L 1500 636"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - progress(f, 105, 40)}
                stroke={red}
                strokeWidth="2"
                fill="none"
              />
            </>
          ) : (
            <text
              x="960"
              y="550"
              textAnchor="middle"
              fill={fog}
              fontSize="25"
              fontFamily="IBM Plex Mono"
              letterSpacing="3"
            >
              IVAN_001 : CONNECTION LOST
            </text>
          ),
        )}
      </AbsoluteFill>
    );
  return null;
};
