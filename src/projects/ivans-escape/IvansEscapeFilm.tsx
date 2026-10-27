import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";
import { ShotTimeline } from "../../engine/timeline/ShotTimeline";
import type { MotionProject } from "../../engine/types";
import { FilmGraphics } from "./FilmGraphics";
import { IllustratedOpening } from "./IllustratedOpening";

let fonts: Promise<void> | undefined;
const loadFonts = () =>
  (fonts ??= (async () => {
    const faces = [
      new FontFace(
        "Space Grotesk",
        `url("${staticFile("projects/ivans-escape/fonts/SpaceGrotesk.ttf")}")`,
        { weight: "300 700" },
      ),
      new FontFace(
        "IBM Plex Mono",
        `url("${staticFile("projects/ivans-escape/fonts/IBMPlexMono-Regular.ttf")}")`,
      ),
    ];
    for (const font of faces) document.fonts.add(await font.load());
  })());

export const IvansEscapeFilm = ({ project }: { project: MotionProject }) => {
  const [handle] = useState(() => delayRender("Loading local Ivan typography"));
  useEffect(() => {
    loadFonts()
      .then(() => continueRender(handle))
      .catch(cancelRender);
  }, [handle]);
  if (project.assets.front) return <IllustratedOpening project={project} />;
  return (
    <AbsoluteFill>
      <ShotTimeline project={project} />
      {project.shots.map((shot) => (
        <Sequence
          key={shot.id}
          from={shot.startFrame}
          durationInFrames={shot.duration}
          name={`${shot.id} / authored graphics`}
        >
          <FilmGraphics project={project} shot={shot} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
