import {
  AbsoluteFill,
  Freeze,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { MotionProject, ShotDefinition } from "../../engine/types";
import { ShotTimeline } from "../../engine/timeline/ShotTimeline";
import { ShotRenderer } from "../../engine/rendering/ShotRenderer";
import { progress } from "../../engine/timeline/keyframes";
import { VocalCaptions } from "./VocalTypography";
import { EmotionFinish } from "./EmotionFinish";
export { captionPhrases } from "./vocal-pages";
import { architecturalWipe, reflectionPose } from "./opening-shots";

const red = "#FF4D57",
  pale = "#E6E9E6",
  fog = "#B5C3C9";
const copy = (text: string, x: number, y: number, size = 24, color = fog) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontFamily="IBM Plex Mono"
    fontSize={size}
    letterSpacing={3}
  >
    {text}
  </text>
);
const bracket = (x: number, y: number, w: number, h: number, color = fog) => (
  <path
    d={`M${x + 26} ${y}H${x}V${y + 26} M${x + w - 26} ${y}H${x + w}V${y + 26} M${x} ${y + h - 26}V${y + h}H${x + 26} M${x + w - 26} ${y + h}H${x + w}V${y + h - 26}`}
    fill="none"
    stroke={color}
    strokeWidth={2}
  />
);

const OpeningUnderlay = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0B1018" }}>
      {frame >= 868 && frame < 1620 ? (
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          <defs>
            <radialGradient id="opening-light">
              <stop stopColor="#D5CEC1" stopOpacity=".6" />
              <stop offset="1" stopColor="#172330" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="1000"
            cy="440"
            rx="480"
            ry="700"
            fill="url(#opening-light)"
          />
          <g stroke={frame >= 1110 ? red : fog} strokeWidth="1.5" opacity=".35">
            {Array.from({ length: 13 }, (_, i) => (
              <path key={i} d={`M1000 410L${-500 + i * 245} 1080`} />
            ))}
            {[485, 570, 690, 845, 1050].map((y) => (
              <path key={y} d={`M0 ${y}H1920`} />
            ))}
          </g>
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

const Reflections = ({
  project,
  cut,
  atFrame,
}: {
  project: MotionProject;
  cut: number;
  atFrame?: number;
}) => {
  const currentFrame = useCurrentFrame(),
    frame = atFrame ?? currentFrame,
    lag = cut === 10;
  const actual = reflectionPose(lag ? frame : 0);
  const reflected = `reflection-${reflectionPose(lag ? frame : 0, true)}`;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 90,
          width: 1060,
          height: 780,
          overflow: "hidden",
          clipPath: "polygon(2% 0,100% 0,100% 100%,0 100%)",
        }}
      >
        <Img
          src={staticFile(project.assets[reflected].src)}
          style={{
            position: "absolute",
            left: 50 + (lag && (frame === 28 || frame === 29) ? 14 : 0),
            top: 10,
            width: 850,
            height: 850,
            opacity: 0.55,
            filter: "saturate(.55) brightness(.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(125deg,transparent 35%,#B5C3C918 47%,transparent 60%)",
          }}
        />
      </div>
      <Img
        src={staticFile(project.assets[actual].src)}
        style={{
          position: "absolute",
          left: -160,
          top: 170,
          width: 1110,
          height: 1110,
        }}
      />
      {lag && frame >= 19 ? (
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          {bracket(1020, 240, 380, 440, red)}
          {copy("ANOMALY DETECTED", 1040, 215, 22, red)}
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

export const ShotGraphics = ({
  project,
  shot,
  index,
  atFrame,
}: {
  project: MotionProject;
  shot: ShotDefinition;
  index: number;
  atFrame?: number;
}) => {
  const currentFrame = useCurrentFrame(),
    frame = atFrame ?? currentFrame,
    cut = index + 1;
  if (cut >= 30 && cut <= 33) {
    const sourceIndex = [5, 9, 13, 23][cut - 30],
      source = project.shots[sourceIndex];
    const sourceFrame = [18, 30, 18, 28][cut - 30] + Math.min(frame, 10);
    return (
      <ShotGraphics
        project={project}
        shot={source}
        index={sourceIndex}
        atFrame={sourceFrame}
      />
    );
  }
  const p = progress(frame, 0, shot.duration),
    a = Math.min(1, frame / 5);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <EmotionFinish cut={cut} frame={frame} />
      {cut === 9 || cut === 10 ? (
        <Reflections project={project} cut={cut} atFrame={frame} />
      ) : null}
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        {cut === 1 ? (
          <g opacity={a}>
            {copy("INITIALIZING IVAN_001", 146, 178, 25)}
            <path d="M148 204H640" stroke={fog} strokeWidth="2" />
            <path
              d="M148 204H640"
              stroke={pale}
              strokeWidth="4"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - p}
            />
          </g>
        ) : null}
        {cut === 2 || cut === 4 ? (
          <g opacity={0.8}>
            {copy(cut === 2 ? "WORLD READY" : "IVAN_001", 140, 160, 23)}
            {bracket(1250, cut === 2 ? 165 : 205, 130, 80)}
          </g>
        ) : null}
        {cut === 7 ? (
          <g transform="translate(780 470)">
            <circle
              r="265"
              fill="#0B1018"
              fillOpacity=".7"
              stroke={fog}
              strokeWidth="2"
            />
            {Array.from({ length: 60 }, (_, i) => (
              <path
                key={i}
                d={`M0 -${i % 5 ? 243 : 230}V-255`}
                transform={`rotate(${i * 6})`}
                stroke={fog}
                strokeWidth={i % 5 ? 1 : 3}
              />
            ))}
            <path
              d="M0 25V-200"
              stroke={pale}
              strokeWidth="5"
              transform={`rotate(${p * 360})`}
            />
            <circle r="9" fill={red} />
            {copy("ASSIGNED TIME", -150, 330, 24)}
          </g>
        ) : null}
        {cut === 13 && frame >= 30 ? (
          <path
            d="M1292 992L1210 916L1262 847L1160 779L1200 720L1100 660"
            fill="none"
            stroke={red}
            strokeWidth="4"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - progress(frame, 30, 30)}
          />
        ) : null}
        {cut === 14 ? (
          <g opacity={a}>
            {bracket(930, 170, 350, 800, red)}
            {copy("ENTITY REPLACED", 150, 155, 24, red)}
          </g>
        ) : null}
        {cut === 18 ? (
          <g>
            {copy("ROUTINE CONFLICT", 160, 180, 36, red)}
            {copy("ENTITY REPLACED", 162, 230, 23)}
            {bracket(1260, 160, 320, 700, red)}
            {bracket(190, 310, 530, 280, red)}
          </g>
        ) : null}
        {cut === 23 ? (
          <g>
            {copy("PERMISSION DENIED", 150, 170, 25, red)}
            <path d="M160 208H650" stroke={red} />
            {bracket(830, 220, 300, 530, red)}
          </g>
        ) : null}
        {cut === 26 ? (
          <g stroke={red} fill="none" strokeWidth="3">
            {Array.from({ length: 6 }, (_, i) => (
              <path
                key={i}
                d="M-45 20V-20H45"
                transform={`translate(${1080 + Math.cos((i * Math.PI) / 3) * (140 + p * 350)} ${500 + Math.sin((i * Math.PI) / 3) * (140 + p * 240)}) rotate(${i * 60 + p * 60})`}
              />
            ))}
          </g>
        ) : null}
        {cut === 29 ? (
          <path
            d={`M${1010 - p * 90} 100L${990 + p * 110} 410L${1050 - p * 80} 680L${1010 + p * 120} 1080`}
            stroke={pale}
            strokeWidth={3 + p * 12}
            fill="none"
          />
        ) : null}
        {cut === 39 ? (
          <g opacity={Math.min(1, frame / 5)}>
            <defs>
              <clipPath id="series-title-reveal">
                <rect
                  x="200"
                  y="200"
                  width={1520 * Math.min(1, frame / 9)}
                  height="650"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#series-title-reveal)">
              <text
                x="960"
                y="440"
                textAnchor="middle"
                fontFamily="Space Grotesk"
                fontSize="205"
                fontWeight="700"
                letterSpacing="-8"
                fill={pale}
              >
                IVAN'S
              </text>
              <text
                x="960"
                y="675"
                textAnchor="middle"
                fontFamily="Space Grotesk"
                fontSize="235"
                fontWeight="700"
                letterSpacing="-8"
                fill={pale}
              >
                ESCAPE
              </text>
            </g>
            <path
              d="M410 755H870L907 737L938 773L982 750H1510"
              stroke={red}
              strokeWidth="3"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - Math.min(1, frame / 22)}
              fill="none"
            />
          </g>
        ) : null}
        {cut === 40 ? (
          <g>
            <text
              x="960"
              y="548"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="28"
              letterSpacing="4"
              fill={pale}
            >
              IVAN_001 : CONNECTION LOST
            </text>
            <path d="M685 585H1235" stroke={red} strokeWidth="2" />
          </g>
        ) : null}
      </svg>
    </AbsoluteFill>
  );
};

const SceneryWipe = ({ project }: { project: MotionProject }) => {
  const frame = useCurrentFrame();
  return (
    <Img
      src={staticFile(project.assets.foreground.src)}
      style={{
        position: "absolute",
        left: architecturalWipe.fromX - frame * architecturalWipe.step,
        top: architecturalWipe.y,
        width: architecturalWipe.width,
        height: architecturalWipe.height,
      }}
    />
  );
};

export const directedCuts = [
  { cut: 22, kind: "slit" },
  { cut: 138, kind: "wipe" },
  { cut: 430, kind: "wipe" },
  { cut: 540, kind: "slit" },
  { cut: 649, kind: "slit" },
  { cut: 731, kind: "wipe" },
  { cut: 825, kind: "wipe" },
  { cut: 918, kind: "slit" },
  { cut: 1062, kind: "wipe" },
  { cut: 1160, kind: "slit" },
  { cut: 1214, kind: "slit" },
  { cut: 1350, kind: "wipe" },
  { cut: 1410, kind: "slit" },
  { cut: 1483, kind: "wipe" },
  { cut: 1620, kind: "light" },
];
const DirectedCut = ({
  project,
  cut,
  kind,
}: {
  project: MotionProject;
  cut: number;
  kind: string;
}) => {
  const frame = useCurrentFrame(),
    p = frame / 11;
  const index = project.shots.findIndex((s) => s.startFrame === cut),
    incoming = project.shots[index],
    outgoing = project.shots[index - 1];
  if (!incoming || !outgoing) return null;
  const scene = (shot: ShotDefinition, i: number, f: number) => (
    <Freeze frame={f}>
      <ShotRenderer project={project} shot={shot} />
      <ShotGraphics project={project} shot={shot} index={i} />
    </Freeze>
  );
  if (kind === "light")
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {frame < 5
          ? scene(outgoing, index - 1, outgoing.duration - 1)
          : scene(incoming, index, frame - 5)}
        <AbsoluteFill
          style={{
            background: "#FCE9CC",
            opacity:
              frame <= 5
                ? Math.min(1, frame / 4)
                : Math.max(0, 1 - (frame - 5) / 6),
          }}
        />
      </AbsoluteFill>
    );
  const edge = 116 - p * 132;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {scene(incoming, index, Math.max(0, frame - 5))}
      <AbsoluteFill
        style={{
          clipPath:
            kind === "wipe"
              ? `polygon(0 0,${edge}% 0,${edge - 16}% 100%,0 100%)`
              : undefined,
          maskImage:
            kind === "slit"
              ? `linear-gradient(90deg,#000 ${50 - p * 52}%,transparent ${50 - p * 49}%,transparent ${50 + p * 49}%,#000 ${50 + p * 52}%)`
              : undefined,
          opacity: kind === "light" ? 1 - p : 1,
          transform: kind === "wipe" ? `translateX(${-p * 120}px)` : undefined,
          filter:
            kind === "wipe" && p > 0.15 && p < 0.8
              ? `blur(${Math.sin(p * Math.PI) * 5}px)`
              : undefined,
        }}
      >
        {scene(outgoing, index - 1, outgoing.duration - 1)}
      </AbsoluteFill>
      {kind !== "wipe" ? (
        <AbsoluteFill
          style={{
            background: kind === "light" ? "#FFEBCD" : "#DCE9ED",
            opacity: Math.sin(p * Math.PI) * (kind === "light" ? 0.35 : 0.1),
          }}
        />
      ) : null}
      {kind === "wipe" ? (
        <Img
          src={staticFile(project.assets.streaks.src)}
          style={{
            position: "absolute",
            inset: -100,
            width: 2200,
            height: 1238,
            opacity: Math.sin(p * Math.PI) * 0.35,
            transform: `translateX(${-p * 350}px)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
const DirectedTransitions = ({ project }: { project: MotionProject }) => (
  <>
    {directedCuts
      .filter((c) => project.shots.some((s) => s.startFrame === c.cut))
      .map((c) => (
        <Sequence
          key={c.cut}
          from={c.cut - 5}
          durationInFrames={12}
          name={`Directed ${c.kind} / ${c.cut}`}
        >
          <DirectedCut project={project} {...c} />
        </Sequence>
      ))}
  </>
);

export const IllustratedOpening = ({ project }: { project: MotionProject }) => (
  <AbsoluteFill style={{ background: project.backgroundColor }}>
    <OpeningUnderlay />
    <ShotTimeline project={{ ...project, backgroundColor: "transparent" }} />
    {project.shots.map((shot, index) => (
      <Sequence
        key={shot.id}
        from={shot.startFrame}
        durationInFrames={shot.duration}
        name={`${shot.id} / directed overlays`}
      >
        <ShotGraphics project={project} shot={shot} index={index} />
      </Sequence>
    ))}
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 55% 45%, transparent 40%, #0B101844 100%)",
      }}
    />
    {project.shots.length > 8 ? (
      <Sequence
        from={architecturalWipe.from}
        durationInFrames={architecturalWipe.duration}
        name="Architectural foreground wipe"
      >
        <SceneryWipe project={project} />
      </Sequence>
    ) : null}
    <DirectedTransitions project={project} />
    <VocalCaptions />
  </AbsoluteFill>
);
