import type { AudioCueMap } from "../types";

export const cueFrame = (map: AudioCueMap, id: string): number => {
  if (!map[id]) throw new Error(`Unknown audio cue: ${id}`);
  return map[id].frame;
};

// Audio analysis remains opt-in; manual cues need no decoding or network access.
export { getAudioData, visualizeAudio } from "@remotion/media-utils";
export type { AudioCueMap } from "../types";
