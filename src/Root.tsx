import { Composition } from "remotion";
import { projects } from "./projects";
import { projectComponents } from "./projects/components";
import { ShotTimeline } from "./engine/timeline/ShotTimeline";
import { validateProject } from "./engine/validation/project";
import { ReviewSections } from "./projects/ivans-escape/ReviewSections";

export const RemotionRoot = () => (
  <>
    <ReviewSections />
    {projects.map((project) => (
      <Composition
        key={project.id}
        id={project.id}
        component={projectComponents[project.id] ?? ShotTimeline}
        width={project.width}
        height={project.height}
        fps={project.fps}
        durationInFrames={validateProject(project)}
        defaultProps={{ project }}
        calculateMetadata={({ props }) => ({
          width: props.project.width,
          height: props.project.height,
          fps: props.project.fps,
          durationInFrames: validateProject(props.project),
        })}
      />
    ))}
  </>
);
