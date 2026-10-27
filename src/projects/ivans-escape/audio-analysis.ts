import type { MediaUtilsAudioData } from "@remotion/media-utils";

export function summarizeAudio(
  audio: Pick<
    MediaUtilsAudioData,
    "channelWaveforms" | "sampleRate" | "durationInSeconds" | "numberOfChannels"
  >,
) {
  if (!audio.channelWaveforms.length || audio.sampleRate <= 0)
    throw new Error("Audio data must contain sampled channels");
  const binSeconds = 0.02;
  const binSize = Math.max(1, Math.round(audio.sampleRate * binSeconds));
  const samples = audio.channelWaveforms[0].length;
  const rms: number[] = [];
  for (let start = 0; start < samples; start += binSize) {
    const end = Math.min(samples, start + binSize);
    let energy = 0;
    for (const channel of audio.channelWaveforms) {
      if (channel.length !== samples)
        throw new Error("Audio channels have inconsistent sample counts");
      for (let i = start; i < end; i++) energy += channel[i] * channel[i];
    }
    rms.push(
      Number(
        Math.sqrt(
          energy / ((end - start) * audio.channelWaveforms.length),
        ).toFixed(5),
      ),
    );
  }
  const candidates = rms
    .map((value, i) => ({
      seconds: Number((i * binSeconds).toFixed(2)),
      frame: Math.round(i * binSeconds * 30),
      rise: Number((value - (rms[i - 1] ?? 0)).toFixed(5)),
    }))
    .filter((cue) => cue.rise > 0.015 && cue.seconds < 60)
    .sort((a, b) => b.rise - a.rise);
  const transients: typeof candidates = [];
  for (const cue of candidates) {
    if (
      transients.every(
        (chosen) => Math.abs(chosen.seconds - cue.seconds) >= 0.18,
      )
    )
      transients.push(cue);
    if (transients.length === 32) break;
  }
  return {
    durationSeconds: audio.durationInSeconds,
    sampleRate: audio.sampleRate,
    channels: audio.numberOfChannels,
    binSeconds,
    rms,
    transientCandidates: transients.sort((a, b) => a.seconds - b.seconds),
    cueStatus:
      "Energy-rise candidates only; not verified beats, drum hits or vocal onsets.",
  };
}
