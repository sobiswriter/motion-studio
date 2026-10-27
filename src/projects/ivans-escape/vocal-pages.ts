import type { Caption } from "@remotion/captions";
import data from "./vocals.json";

export const captionPhrases = data.phrases;
const breaks = [
  [3, 2],
  [2, 4],
  [3, 5],
  [4, 4],
  [3, 4],
  [1, 3],
  [3, 4],
  [4],
  [3, 4],
  [3, 1],
  [4, 3],
  [4],
  [3, 2],
  [3, 2],
];
export const vocalPages = captionPhrases.flatMap((phrase, i) => {
  let offset = 0;
  return breaks[i].map((count, page) => {
    const words: Caption[] = phrase.words.slice(offset, offset + count);
    offset += count;
    if (!words.length) throw new Error(`Empty vocal page ${phrase.id}`);
    return {
      id: `${phrase.id}-${page}`,
      phraseId: phrase.id,
      words,
      fromMs: page === 0 ? phrase.fromMs : words[0].startMs,
      toMs:
        offset >= phrase.words.length
          ? phrase.toMs
          : phrase.words[offset].startMs,
      emphasis: phrase.emphasis,
    };
  });
});
