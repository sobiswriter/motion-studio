import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const ffmpeg = resolve(
  "node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe",
);
const ffprobe = resolve(
  "node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe",
);
const output = "out/ivans-escape";
const run = (exe: string, args: string[]) =>
  execFileSync(exe, args, { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
async function main() {
  if (process.argv.includes("--derive-previews")) {
    for (const [name, seconds] of [
      ["IvansEscape-rough", 60],
      ["IvansEscape-pilot", 18],
    ] as const) {
      run(ffmpeg, [
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        `${output}/IvansEscape-1080p.mp4`,
        "-t",
        String(seconds),
        "-vf",
        "scale=960:540",
        "-c:v",
        "libx264",
        "-crf",
        "21",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "copy",
        "-movflags",
        "+faststart",
        "-y",
        `${output}/${name}.mp4`,
      ]);
      console.log(
        `Derived ${name} from the verified 1080p master, ${seconds}s.`,
      );
    }
  }
  const names = process.argv.includes("--draft")
    ? ["IvansEscape-rough", "IvansEscape-pilot"]
    : ["IvansEscape-1080p", "IvansEscape-rough", "IvansEscape-pilot"];
  const results = [];
  for (const name of names) {
    const filename = `${output}/${name}.mp4`;
    const data = JSON.parse(
      run(ffprobe, [
        "-v",
        "error",
        "-count_frames",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        filename,
      ]),
    ) as {
      streams: {
        codec_type: string;
        codec_name: string;
        width: number;
        height: number;
        nb_read_frames: string;
        r_frame_rate: string;
        duration: string;
        channels: number;
      }[];
      format: { duration: string };
    };
    const video = data.streams.find((s) => s.codec_type === "video")!,
      audio = data.streams.find((s) => s.codec_type === "audio")!;
    const expected = name.endsWith("pilot") ? 540 : 1800,
      full = name.endsWith("1080p");
    assert.equal(Number(video.nb_read_frames), expected);
    assert.equal(video.r_frame_rate, "30/1");
    assert.equal(video.width, full ? 1920 : 960);
    assert.equal(video.height, full ? 1080 : 540);
    assert.equal(video.codec_name, "h264");
    assert.equal(audio.codec_name, "aac");
    assert.equal(audio.channels, 2);
    assert.ok(Number(audio.nb_read_frames) > 100);
    assert.ok(Math.abs(Number(video.duration) - expected / 30) < 0.001);
    assert.ok(Math.abs(Number(data.format.duration) - expected / 30) < 0.1);
    const directory = `.cache/ivans-video-qa/${name}`;
    await mkdir(directory, { recursive: true });
    run(ffmpeg, [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      filename,
      "-an",
      "-vf",
      "scale=96:54",
      "-c:v",
      "png",
      "-y",
      `${directory}/%04d.png`,
    ]);
    const files = (await readdir(directory))
      .filter((f) => f.endsWith(".png"))
      .sort();
    assert.equal(files.length, expected);
    const black: number[] = [];
    for (let i = 0; i < files.length; i++) {
      const stats = await sharp(`${directory}/${files[i]}`).stats();
      if (stats.channels.slice(0, 3).every((c) => c.mean < 1)) black.push(i);
    }
    assert.deepEqual(
      black,
      expected === 1800 ? [898, 899] : [],
      "Unexpected black frames",
    );
    results.push({
      filename,
      width: video.width,
      height: video.height,
      frames: expected,
      fps: 30,
      durationSeconds: Number(video.duration),
      audio: {
        codec: audio.codec_name,
        channels: audio.channels,
        packets: Number(audio.nb_read_frames),
      },
      everyFrameDecoded: true,
      blackFrames: black,
      intentionalBlack:
        "SH10 authored punctuation [898,900); absent from pilot",
    });
    console.log(
      `Verified ${name}: ${expected} frames, ${video.width}x${video.height}, stereo AAC, only authored black frames.`,
    );
  }
  await writeFile(
    `${output}/${process.argv.includes("--draft") ? "draft-video-qa" : "video-qa"}.json`,
    JSON.stringify(results, null, 2),
  );
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
