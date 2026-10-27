import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
const dir = "src/projects/style-showreel-v2/assets/audio";
await mkdir(dir, { recursive: true });
const ffmpeg = resolve(
  process.env.LOCALAPPDATA,
  "Microsoft/WinGet/Links/ffmpeg.exe",
);
const source = "assets/Music/The_Golden_Hour_Rise.mp3";
// Forty millisecond equal-power joins preserve musical attacks without clicks.
const filters =
  "[0:a]asplit=3[a][b][c];[a]atrim=start=0.45:end=6.49,asetpts=PTS-STARTPTS[a1];[b]atrim=start=18.03:end=67.07,asetpts=PTS-STARTPTS[b1];[c]atrim=start=81.036:end=86.036,asetpts=PTS-STARTPTS[c1];[a1][b1]acrossfade=d=0.04:c1=qsin:c2=qsin[ab];[ab][c1]acrossfade=d=0.04:c1=qsin:c2=qsin,afade=t=in:d=0.04,afade=t=out:st=58.8:d=1.2,volume=-4dB,apad,atrim=duration=60[out]";
const run = spawnSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    source,
    "-filter_complex",
    filters,
    "-map",
    "[out]",
    "-ar",
    "48000",
    "-ac",
    "2",
    "-c:a",
    "pcm_s24le",
    `${dir}/music-edit.wav`,
  ],
  { stdio: "inherit" },
);
if (run.status !== 0) throw new Error("Music edit failed");
await copyFile(`${dir}/music-edit.wav`, `${dir}/master.wav`);
await writeFile(
  "src/projects/style-showreel-v2/music-edit.json",
  JSON.stringify(
    {
      source,
      output: "assets/audio/music-edit.wav",
      fps: 60,
      duration: 60,
      crossfadeSeconds: 0.04,
      gainDb: -4,
      sections: [
        { sourceIn: 0.45, sourceOut: 6.49, outputIn: 0 },
        { sourceIn: 18.03, sourceOut: 67.07, outputIn: 6 },
        { sourceIn: 81.036, sourceOut: 86.036, outputIn: 55 },
      ],
      excludedSource: "Ivan_Is_Loading.mp3",
    },
    null,
    2,
  ),
);
console.log(
  "Prepared a 60-second edit of The Golden Hour Rise; original file preserved.",
);
