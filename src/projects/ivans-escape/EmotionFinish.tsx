import { AbsoluteFill } from "remotion";

export const EmotionFinish = ({
  cut,
  frame,
}: {
  cut: number;
  frame: number;
}) => {
  if (![10, 12, 15, 17, 25, 26, 29].includes(cut)) return null;
  const close = [12, 15, 17, 25].includes(cut),
    resolve = cut >= 25;
  const settle = Math.min(1, Math.max(0, frame / 7));
  const pulse =
    cut === 10
      ? Math.max(0, 1 - Math.abs(frame - 28) / 7)
      : cut === 17
        ? Math.max(0, 1 - frame / 10)
        : 0;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {close ? (
        <AbsoluteFill
          style={{
            backdropFilter: "blur(3px)",
            maskImage:
              "radial-gradient(ellipse 36% 45% at 65% 42%,transparent 65%,black 100%)",
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${close ? "65% 42%" : "55% 48%"},transparent 26%,#07101A${close ? "A0" : "58"} 100%)`,
          opacity: 0.75 * settle,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(100deg,#EE334D,transparent 22%,transparent 80%,#EE334D)",
          opacity: pulse * 0.16,
        }}
      />
      {close ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 38 * settle,
              background: "#07101A",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 38 * settle,
              background: "#07101A",
            }}
          />
        </>
      ) : null}
      {resolve ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(110deg,transparent 45%,#FFE4BD 72%,transparent 90%)",
            opacity: Math.min(0.09, frame / 400),
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
