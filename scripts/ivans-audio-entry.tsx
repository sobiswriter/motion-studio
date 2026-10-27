import { Composition, registerRoot, staticFile } from "remotion";
import { getAudioData } from "@remotion/media-utils";
import { summarizeAudio } from "../src/projects/ivans-escape/audio-analysis";

type Props = { summary: ReturnType<typeof summarizeAudio> | null };
const Inspection = (_props: Props) => null;
// Used only by getCompositions for local audio analysis; no frames or movie are rendered.
registerRoot(() => (
  <Composition
    id="IvansAudioInspection"
    component={Inspection}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={1800}
    defaultProps={{ summary: null }}
    calculateMetadata={async () => ({
      props: {
        summary: summarizeAudio(
          await getAudioData(
            staticFile("projects/ivans-escape/audio/track.mp3"),
            { sampleRate: 48000 },
          ),
        ),
      },
    })}
  />
));
