import { Composition, Sequence } from "remotion";
import { IvansEscapeFilm } from "./IvansEscapeFilm";
import { ivansEscape } from "./film";

const ReviewSection = ({ startFrame }: { startFrame: number }) => (
  <Sequence from={-startFrame}>
    <IvansEscapeFilm project={ivansEscape} />
  </Sequence>
);
export const ReviewSections = () => (
  <>
    {Array.from({ length: 6 }, (_, i) => (
      <Composition
        key={i}
        id={`IvansEscape-S0${i + 1}`}
        component={ReviewSection}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={300}
        defaultProps={{ startFrame: i * 300 }}
      />
    ))}
  </>
);
