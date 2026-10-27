import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import {
  installWhisperCpp,
  downloadWhisperModel,
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

async function main() {
  const folder = resolve(".cache/ivan-whisper");
  const destination = "docs/projects/ivans-escape/redirection/production";
  await mkdir(destination, { recursive: true });
  await installWhisperCpp({ to: folder, version: "1.5.5", printOutput: false });
  await downloadWhisperModel({ model: "small.en", folder, printOutput: false });
  const inputPath = resolve(".cache/ivan-vocals.wav");
  execFileSync(
    resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"),
    [
      "-y",
      "-i",
      resolve("assets/Music/Ivan_Is_Loading.mp3"),
      "-ar",
      "16000",
      "-ac",
      "1",
      "-c:a",
      "pcm_s16le",
      inputPath,
    ],
    { stdio: "ignore" },
  );
  console.log(
    "Transcribing original 60-second song locally (small.en / token timestamps)...",
  );
  const output = await transcribe({
    inputPath,
    whisperPath: folder,
    whisperCppVersion: "1.5.5",
    model: "small.en",
    tokenLevelTimestamps: true,
    language: "en",
    printOutput: false,
  });
  const { captions } = toCaptions({ whisperCppOutput: output });
  await writeFile(
    `${destination}/WHISPER_RAW.json`,
    JSON.stringify(output, null, 2),
  );
  await writeFile(
    `${destination}/WHISPER_CAPTIONS.json`,
    JSON.stringify(captions, null, 2),
  );
  console.log(JSON.stringify(captions));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
