import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import type { MotionProject } from "../types";
import { validateProject } from "../validation/project";
import { ShotRenderer } from "../rendering/ShotRenderer";
import { TransitionLayer } from "../transitions/TransitionLayer";
import { useMemo } from "react";

export const ShotTimeline = ({ project }: { project: MotionProject }) => {
  useMemo(() => validateProject(project), [project]);
  return (
    <AbsoluteFill
      style={{ backgroundColor: project.backgroundColor, overflow: "hidden" }}
    >
      {project.shots.map((shot) => (
        <Sequence
          key={shot.id}
          name={shot.id}
          from={shot.startFrame}
          durationInFrames={shot.duration}
        >
          <TransitionLayer transition={shot.transition}>
            <ShotRenderer project={project} shot={shot} />
          </TransitionLayer>
        </Sequence>
      ))}
      {project.audio && (
        <Audio
          src={staticFile(project.audio.src)}
          from={project.audio.offsetFrames ?? 0}
        />
      )}
      {Object.entries(project.cues ?? {}).map(([id, cue]) =>
        cue.sound ? (
          <Sequence
            key={id}
            name={`SFX / ${cue.label}`}
            from={cue.frame}
            durationInFrames={cue.sound.duration}
            layout="none"
          >
            <Audio
              src={staticFile(project.assets[cue.sound.assetId].src)}
              trimBefore={cue.sound.trimBefore ?? 0}
              volume={10 ** (cue.sound.volumeDb / 20)}
            />
          </Sequence>
        ) : null,
      )}
    </AbsoluteFill>
  );
};
