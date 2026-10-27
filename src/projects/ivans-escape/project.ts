import type {
  Graphic,
  MotionProject,
  ShotDefinition,
} from "../../engine/types";
import { availableAssets } from "./assets";
import { productionShots } from "./shots";
import type { ProductionShot } from "./shots";

export const filmSettings = { width: 1920, height: 1080, fps: 30 };

const lines = (text: string, length = 48) => {
  const result: string[] = [];
  for (const word of text.split(/\s+/)) {
    if (
      !result.length ||
      `${result[result.length - 1]} ${word}`.length > length
    )
      result.push(word);
    else result[result.length - 1] += ` ${word}`;
  }
  return result;
};

const reviewCard = (shot: ProductionShot): ShotDefinition => {
  const text = (
    id: string,
    content: string,
    x: number,
    y: number,
    size: number,
    color = "#E6E9E6",
  ): Graphic => ({
    id,
    kind: "text",
    text: content,
    x,
    y,
    fontSize: size,
    color,
    from: 0,
    duration: shot.duration,
  });
  const notes = [
    `PLANNED MODE: ${shot.mode}`,
    `FRAMES [${shot.startFrame}, ${shot.startFrame + shot.duration}) / ${shot.duration}f`,
    "",
    ...lines(shot.composition),
    "",
    ...lines(`CAMERA PLAN: ${shot.camera}`),
    "",
    `ASSETS: ${shot.assets.join(", ") || "Code graphics only"}`,
  ];
  const graphics = [
    text(
      "review-header",
      "IVAN'S ESCAPE / PREPRODUCTION TIMING BOARD",
      90,
      60,
      28,
      "#B5C3C9",
    ),
    text("shot-title", `${shot.id} / ${shot.title}`, 90, 125, 54),
    text(
      "approval-state",
      `${shot.packet} / BRIEFED · NOT IMPLEMENTED`,
      90,
      220,
      26,
      "#C76A4B",
    ),
    ...notes.map((line, i) =>
      text(`note-${i}`, line || " ", 90, 310 + i * 35, 27),
    ),
    text(
      "footer",
      "STATIC REVIEW ONLY · No finished motion · No full-film animatic · Artwork awaiting approval",
      90,
      1005,
      24,
      "#B5C3C9",
    ),
  ];
  const assetId =
    shot.id === "SH01"
      ? "bootLayout"
      : shot.id === "SH02"
        ? "cityReference"
        : null;
  if (assetId)
    graphics.push(
      text(
        "reference-caption",
        shot.id === "SH01"
          ? "CODE LAYOUT / NOT ANIMATED"
          : "GENERATED STYLE REFERENCE / UNAPPROVED",
        920,
        875,
        23,
        "#C76A4B",
      ),
    );
  else
    graphics.push(
      text(
        "missing-art-caption",
        "FINAL ARTWORK NOT CREATED",
        1060,
        500,
        31,
        "#586A79",
      ),
    );
  return {
    id: shot.id,
    startFrame: shot.startFrame,
    duration: shot.duration,
    mode: "flat-2d",
    camera: [
      { frame: 0, value: { x: 0, y: 0, zoom: 1, pivotX: 960, pivotY: 540 } },
    ],
    layers: assetId
      ? [
          {
            id: "reference-only",
            assetId,
            type: "overlay",
            x: 920,
            y: 310,
            width: 910,
            height: 512,
            anchor: [0, 0],
          },
        ]
      : [],
    graphics,
  };
};

// Camera/layer plans in shots.ts are not activated here: this is a timing/document review.
export const ivansEscapeReview: MotionProject = {
  id: "IvansEscape",
  title: "Ivan's Escape — preproduction timing board",
  ...filmSettings,
  backgroundColor: "#0B1018",
  assets: availableAssets,
  shots: productionShots.map(reviewCard),
  audio: { src: availableAssets.music.src },
};
export const ivansEscapePacket01: MotionProject = {
  ...ivansEscapeReview,
  id: "IvansEscapePacket01",
  title: "Ivan's Escape — Packet 01 review only",
  shots: ivansEscapeReview.shots.slice(0, 2),
};
