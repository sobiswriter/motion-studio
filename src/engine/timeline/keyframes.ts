import type { Keyframe, PoseCue } from "../types";

export const progress = (frame: number, from: number, duration: number) =>
  Math.max(0, Math.min(1, (frame - from) / Math.max(1, duration - 1)));

export function sample<T extends object>(
  keys: Keyframe<T>[],
  frame: number,
): T {
  if (!keys.length) throw new Error("A keyframe track must not be empty");
  if (frame <= keys[0].frame) return keys[0].value;
  const next = keys.findIndex((key) => key.frame > frame);
  if (next === -1) return keys[keys.length - 1].value;
  const a = keys[next - 1];
  const b = keys[next];
  let t = (frame - a.frame) / (b.frame - a.frame);
  if (a.easing === "smooth") t = t * t * (3 - 2 * t);
  return Object.fromEntries(
    Object.keys(a.value).map((key) => {
      const k = key as keyof T;
      return [
        key,
        Number(a.value[k]) + (Number(b.value[k]) - Number(a.value[k])) * t,
      ];
    }),
  ) as T;
}

export const poseAt = (
  cels: PoseCue[] | undefined,
  frame: number,
  fallback: string,
) => cels?.filter((cel) => cel.frame <= frame).at(-1)?.assetId ?? fallback;
