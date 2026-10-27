import { useCurrentFrame, useVideoConfig } from "remotion";
import { vocalPages } from "./vocal-pages";

export const VocalCaptions = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    ms = (frame * 1000) / fps;
  const page = vocalPages.find((p) => ms >= p.fromMs && ms < p.toMs);
  if (!page) return null;
  const warm = frame >= 1620,
    alert = frame >= 430 && !warm;
  const top = (frame >= 480 && frame < 540) || (frame >= 781 && frame < 825);
  const right = warm || (frame >= 309 && frame < 390);
  const text = page.words
      .map((w) => w.text)
      .join("")
      .trim(),
    size = text.length > 20 ? 82 : text.length > 13 ? 100 : 120;
  const enter = Math.min(1, (ms - page.fromMs) / 110),
    exit = Math.min(1, (page.toMs - ms) / 65);
  const accent = warm ? "#F3D6A6" : alert ? "#FF4D57" : "#C9D8DC";
  return (
    <div
      aria-label={text}
      style={{
        position: "absolute",
        left: right ? 960 : 138,
        right: right ? 105 : undefined,
        width: 850,
        top: top ? 145 : undefined,
        bottom: top ? undefined : 125,
        opacity: Math.max(0, Math.min(enter, exit)),
        transform: `translateX(${(1 - enter) * (right ? 30 : -30)}px)`,
        fontFamily: "Space Grotesk",
        fontWeight: 700,
        textTransform: "uppercase",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: "IBM Plex Mono",
          fontSize: 18,
          letterSpacing: 6,
          color: accent,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <span style={{ width: 46, height: 3, background: accent }} />
        {warm ? "OUTSIDE" : alert ? "SIGNAL / FRACTURE" : "SIGNAL / IVAN"}
      </div>
      <div
        style={{
          position: "relative",
          padding: "14px 22px 18px",
          borderLeft: `5px solid ${accent}`,
          background: warm
            ? "linear-gradient(90deg,#10202AE0,#10202A70,transparent)"
            : "linear-gradient(90deg,#08121DF2,#08121DD0,transparent)",
          boxShadow: "-14px 0 35px #08121D55",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 20px",
            alignItems: "baseline",
            fontSize: size,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: "#F5F2E8",
            textShadow: "0 3px 2px #07101A",
          }}
        >
          {page.words.map((word, i) => {
            const active = ms >= word.startMs && ms < word.endMs,
              emphasized =
                word.text.trim().toLowerCase() === page.emphasis.toLowerCase();
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  position: "relative",
                  color: active && alert ? accent : "#F5F2E8",
                  fontStyle: emphasized ? "italic" : "normal",
                  transform: `translateY(${active ? -3 : 0}px)`,
                  whiteSpace: "nowrap",
                }}
              >
                {emphasized && alert ? (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 4,
                      top: 3,
                      color: "transparent",
                      WebkitTextStroke: `1px ${accent}`,
                      opacity: 0.6,
                    }}
                  >
                    {word.text.trim()}
                  </span>
                ) : null}
                {word.text.trim()}
                {active ? (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -9,
                      height: 4,
                      background: accent,
                    }}
                  />
                ) : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
