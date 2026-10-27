import type { ArtworkLayer, Keyframe, MotionProject } from "../types";
import { sample } from "../timeline/keyframes";
import { parallaxCamera } from "../camera/Camera2D";
import { planeTransform } from "../camera/plane-transform";

const fail = (message: string): never => {
  throw new Error(message);
};
const finite = (n: number, label: string) => {
  if (!Number.isFinite(n)) fail(`${label}: expected a finite number`);
};
const integer = (n: number, label: string, min = 0) => {
  if (!Number.isSafeInteger(n) || n < min)
    fail(`${label}: expected an integer >= ${min}`);
};
const positive = (n: number, label: string) => {
  finite(n, label);
  if (n <= 0) fail(`${label}: expected > 0`);
};
const unit = (n: number, label: string) => {
  finite(n, label);
  if (n < 0 || n > 1) fail(`${label}: expected 0..1`);
};
export const localPath = (src: string) => {
  if (
    !src ||
    /^(\/|\\|[a-z]+:)/i.test(src) ||
    src.split(/[\\/]/).includes("..") ||
    /[?#]/.test(src)
  )
    fail(`Asset path must be local, relative to public/: ${src}`);
};
const track = <T extends object>(
  keys: Keyframe<T>[],
  duration: number,
  label: string,
  fields: string[],
) => {
  if (!keys.length) fail(`${label}: keyframes required`);
  let previous = -1;
  keys.forEach((key) => {
    integer(key.frame, `${label} frame`);
    if (key.frame <= previous || key.frame >= duration)
      fail(`${label}: frames must increase and stay inside the shot`);
    previous = key.frame;
    if (key.easing && !["linear", "smooth"].includes(key.easing))
      fail(`${label}: unsupported easing`);
    const values = key.value as Record<string, number>;
    fields.forEach((field) => finite(values[field], `${label}.${field}`));
    if ("zoom" in values) positive(values.zoom, `${label}.zoom`);
    if ("scale" in values) positive(values.scale, `${label}.scale`);
    if ("opacity" in values) unit(values.opacity, `${label}.opacity`);
  });
};

export function validateProject(project: MotionProject): number {
  const { shots, assets } = project;
  if (!/^[a-zA-Z0-9-]+$/.test(project.id))
    fail(`Invalid composition id: ${project.id}`);
  if (!project.title || !project.backgroundColor)
    fail("Project title and backgroundColor are required");
  integer(project.width, "width", 1);
  integer(project.height, "height", 1);
  positive(project.fps, "fps");
  if (!shots.length) fail("Project needs at least one shot");
  Object.entries(assets).forEach(([id, asset]) => {
    if (id !== asset.id) fail(`Asset manifest key differs from id: ${id}`);
    localPath(asset.src);
    if (!["image", "audio", "video"].includes(asset.kind))
      fail(`Invalid asset kind: ${id}`);
    if (asset.kind === "image") {
      integer(asset.width!, `${id} source width`, 1);
      integer(asset.height!, `${id} source height`, 1);
    }
  });
  const image = (id: string) => {
    if (assets[id]?.kind !== "image") fail(`Missing image asset: ${id}`);
  };
  Object.entries(project.cues ?? {}).forEach(([id, cue]) => {
    integer(cue.frame, `Cue ${id}`);
    if (cue.analysis?.rms !== undefined)
      unit(cue.analysis.rms, `Cue ${id} RMS`);
    if (cue.sound) {
      if (assets[cue.sound.assetId]?.kind !== "audio")
        fail(`Missing audio asset for cue ${id}: ${cue.sound.assetId}`);
      integer(cue.sound.duration, `Cue ${id} sound duration`, 1);
      integer(cue.sound.trimBefore ?? 0, `Cue ${id} sound trimBefore`);
      finite(cue.sound.volumeDb, `Cue ${id} volumeDb`);
      if (cue.sound.volumeDb < -60 || cue.sound.volumeDb > 0)
        fail(`Cue ${id}: volumeDb must be between -60 and 0`);
    }
  });
  if (project.audio) {
    localPath(project.audio.src);
    if (
      !Object.values(assets).some(
        (a) => a.src === project.audio!.src && a.kind === "audio",
      )
    )
      fail("Project audio must be registered in the asset manifest");
    integer(project.audio.offsetFrames ?? 0, "audio.offsetFrames");
  }
  const ids = new Set<string>();
  let end = 0;
  shots.forEach((shot, index) => {
    if (!shot.id || ids.has(shot.id))
      fail(`Duplicate or empty shot id: ${shot.id}`);
    ids.add(shot.id);
    integer(shot.startFrame, `${shot.id} start`);
    integer(shot.duration, `${shot.id} duration`, 1);
    if (!["flat-2d", "multiplane-2d", "image-plane-3d"].includes(shot.mode))
      fail(`Unknown shot mode: ${shot.mode}`);
    if (shot.transition) {
      integer(shot.transition.duration, `${shot.id} transition duration`, 2);
      if (!["wipe-left", "circle"].includes(shot.transition.kind))
        fail(`${shot.id}: invalid transition`);
      if (
        !index ||
        shot.transition.duration >= shot.duration ||
        shot.transition.duration >= shots[index - 1].duration
      )
        fail(`${shot.id}: transition must be shorter than both adjacent shots`);
      if (
        index > 1 &&
        shot.startFrame <
          shots[index - 2].startFrame + shots[index - 2].duration
      )
        fail(`${shot.id}: triple overlap is unsupported`);
    }
    const expected = end - (shot.transition?.duration ?? 0);
    if (shot.startFrame !== expected)
      fail(
        `${shot.id}: timeline gap or undeclared overlap; expected start ${expected}, received ${shot.startFrame}`,
      );
    end = shot.startFrame + shot.duration;
    if (
      shot.template &&
      (!["title", "montage"].includes(shot.template) || shot.mode !== "flat-2d")
    )
      fail(`${shot.id}: title/montage templates require flat-2d`);
    if (shot.mode === "image-plane-3d") {
      track(shot.camera, shot.duration, shot.id, [
        "x",
        "y",
        "z",
        "targetX",
        "targetY",
        "targetZ",
        "zoom",
      ]);
      const fov = shot.fov ?? 50;
      if (!(fov > 0 && fov < 180))
        fail(`${shot.id}: fov must be 0..180 exclusive`);
      if (
        shot.projection &&
        !["perspective", "orthographic"].includes(shot.projection)
      )
        fail(`${shot.id}: invalid projection`);
      shot.camera.forEach(({ value: c }) => {
        if (c.x === c.targetX && c.y === c.targetY && c.z === c.targetZ)
          fail(`${shot.id}: camera cannot look at itself`);
      });
    } else
      track(shot.camera, shot.duration, shot.id, [
        "x",
        "y",
        "zoom",
        "pivotX",
        "pivotY",
      ]);
    const layerIds = new Set<string>();
    shot.layers.forEach((layer: ArtworkLayer, order) => {
      if (!layer.id || layerIds.has(layer.id))
        fail(`${shot.id}: duplicate/empty layer id ${layer.id}`);
      layerIds.add(layer.id);
      if (
        ![
          "background",
          "environment",
          "character",
          "foreground",
          "overlay",
          "video",
        ].includes(layer.type)
      )
        fail(`${layer.id}: invalid layer type`);
      if (layer.type === "video") {
        if (assets[layer.assetId]?.kind !== "video")
          fail(`Missing video: ${layer.assetId}`);
      } else image(layer.assetId);
      finite(layer.x, `${layer.id}.x`);
      finite(layer.y, `${layer.id}.y`);
      positive(layer.width, `${layer.id}.width`);
      positive(layer.height, `${layer.id}.height`);
      positive(layer.scale ?? 1, `${layer.id}.scale`);
      finite(layer.rotation ?? 0, `${layer.id}.rotation`);
      unit(layer.opacity ?? 1, `${layer.id}.opacity`);
      finite(layer.depth ?? 0, `${layer.id}.depth`);
      if (layer.depthMotion)
        track(layer.depthMotion, shot.duration, `${layer.id} depth`, ["z"]);
      if (layer.rotation3D)
        track(layer.rotation3D, shot.duration, `${layer.id} rotation3D`, [
          "x",
          "y",
          "z",
        ]);
      if (
        shot.mode !== "image-plane-3d" &&
        (layer.depthMotion || layer.rotation3D)
      )
        fail(`${layer.id}: spatial tracks require image-plane-3d`);
      finite(layer.parallax ?? 1, `${layer.id}.parallax`);
      (layer.anchor ?? [0, 0]).forEach((n) => unit(n, `${layer.id}.anchor`));
      if (layer.motion)
        track(layer.motion, shot.duration, layer.id, [
          "x",
          "y",
          "scale",
          "rotation",
          "opacity",
        ]);
      let celFrame = -1;
      layer.cels?.forEach((cel) => {
        image(cel.assetId);
        integer(cel.frame, `${layer.id} cel`);
        if (cel.frame <= celFrame || cel.frame >= shot.duration)
          fail(`${layer.id}: cel frames must increase inside shot`);
        celFrame = cel.frame;
      });
      if (layer.mask && "assetId" in layer.mask) image(layer.mask.assetId);
      else if (layer.mask) {
        integer(layer.mask.from, `${layer.id} mask start`);
        integer(layer.mask.duration, `${layer.id} mask duration`, 2);
        if (
          !["wipe-left", "circle"].includes(layer.mask.shape) ||
          layer.mask.from + layer.mask.duration > shot.duration
        )
          fail(`${layer.id}: invalid geometric mask`);
      }
      if (shot.mode === "image-plane-3d") {
        if (
          layer.type === "video" ||
          layer.cameraFollow ||
          layer.cropSafe ||
          (layer.mask && !("assetId" in layer.mask))
        )
          fail(
            `${layer.id}: 3D planes support still textures and image masks; screen-space elements belong in graphics`,
          );
        if (order && (layer.depth ?? 0) < (shot.layers[order - 1].depth ?? 0))
          fail(
            `${layer.id}: 3D layers must be ordered from far to near (increasing depth)`,
          );
        for (let f = 0; f < shot.duration; f++) {
          const camera = sample(shot.camera, f);
          const p = planeTransform(layer, f, project.width, project.height);
          const rotation = layer.rotation3D
            ? sample(layer.rotation3D, f)
            : { x: 0, y: 0 };
          const radius =
            ((Math.abs(Math.sin((rotation.x * Math.PI) / 180)) * layer.height +
              Math.abs(Math.sin((rotation.y * Math.PI) / 180)) * layer.width) *
              p.scale) /
            2;
          if (
            camera.z - p.position[2] - radius <= 1 ||
            camera.z - p.position[2] + radius >= 20000
          )
            fail(`${layer.id}: plane crosses camera near/far clipping range`);
        }
      }
      if (layer.cropSafe && shot.mode !== "image-plane-3d") {
        integer(layer.cropSafe.inset, `${layer.id} crop inset`);
        // shortcut: axis-aligned coverage only; add polygon coverage when rotating crop-safe plates is required.
        if (layer.rotation || layer.motion?.some((k) => k.value.rotation !== 0))
          fail(`${layer.id}: cropSafe currently requires an unrotated plate`);
        for (let f = 0; f < shot.duration; f++) {
          const c = parallaxCamera(
            sample(shot.camera, f),
            shot.mode === "flat-2d" ? 1 : (layer.parallax ?? 1),
            layer.cameraFollow,
          );
          const m = layer.motion
            ? sample(layer.motion, f)
            : { x: 0, y: 0, scale: 1 };
          const scale = (layer.scale ?? 1) * m.scale;
          const inset = layer.cropSafe.inset;
          const [ax, ay] = layer.anchor ?? [0, 0];
          const left =
            c.pivotX +
            (layer.x +
              m.x +
              (inset - ax * layer.width) * scale -
              c.x -
              c.pivotX) *
              c.zoom;
          const top =
            c.pivotY +
            (layer.y +
              m.y +
              (inset - ay * layer.height) * scale -
              c.y -
              c.pivotY) *
              c.zoom;
          const right = left + (layer.width - inset * 2) * scale * c.zoom;
          const bottom = top + (layer.height - inset * 2) * scale * c.zoom;
          if (
            left > 0.01 ||
            top > 0.01 ||
            right < project.width - 0.01 ||
            bottom < project.height - 0.01
          )
            fail(
              `${shot.id}/${layer.id}: crop-safe coverage fails at local frame ${f}`,
            );
        }
      }
    });
    shot.graphics?.forEach((g) => {
      integer(g.from, `${g.id} start`);
      integer(g.duration, `${g.id} duration`, 1);
      if (g.from + g.duration > shot.duration)
        fail(`${g.id}: graphic extends beyond shot`);
      if (!["text", "rect", "ellipse", "path"].includes(g.kind))
        fail(`${g.id}: unknown graphic kind`);
      finite(g.x, `${g.id}.x`);
      finite(g.y, `${g.id}.y`);
      if (g.kind === "text" && (!g.text || !g.fontSize))
        fail(`${g.id}: text and fontSize required`);
      if (g.kind === "path" && !g.path) fail(`${g.id}: SVG path required`);
      if (g.kind === "rect" || g.kind === "ellipse") {
        positive(g.width!, `${g.id}.width`);
        positive(g.height!, `${g.id}.height`);
      }
      if (g.motion)
        track(g.motion, shot.duration, g.id, [
          "x",
          "y",
          "scale",
          "rotation",
          "opacity",
        ]);
      if (g.reveal) {
        integer(g.reveal.from, `${g.id} reveal`);
        integer(g.reveal.duration, `${g.id} reveal duration`, 2);
      }
    });
    shot.audioCueRefs?.forEach((id) => {
      if (!project.cues?.[id]) fail(`${shot.id}: missing audio cue ${id}`);
    });
  });
  Object.values(project.cues ?? {}).forEach((cue) => {
    if (cue.frame >= end) fail(`Audio cue outside project: ${cue.label}`);
    if (cue.sound && cue.frame + cue.sound.duration > end)
      fail(`Cue sound extends beyond project: ${cue.label}`);
  });
  if (project.audio && (project.audio.offsetFrames ?? 0) >= end)
    fail("Audio starts beyond project end");
  return end;
}
