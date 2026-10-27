# Shot configuration

The schema is `src/engine/types.ts`. Assets belong to the project manifest and are referenced by ID. Every time value is an integer frame except fps, which may be a positive fractional rate. All keyframe/cel/graphic/mask frames are shot-local; shot starts and AudioCueMap frames are project-global.

## Minimal 2D shot

```ts
import type { ShotDefinition } from "../../engine/types";

const shot: ShotDefinition = {
  id: "shot-01",
  startFrame: 0,
  duration: 48,
  mode: "flat-2d",
  layers: [
    {
      id: "background",
      assetId: "plate",
      type: "background",
      x: -200,
      y: -100,
      width: 2320,
      height: 1280,
      cropSafe: { inset: 0 },
    },
  ],
  camera: [
    {
      frame: 0,
      value: { x: 0, y: 0, zoom: 1, pivotX: 960, pivotY: 540 },
      easing: "smooth",
    },
    { frame: 47, value: { x: 80, y: 0, zoom: 1.05, pivotX: 960, pivotY: 540 } },
  ],
};
```

This example assumes a 1920×1080 project and an appropriately sized plate; change the framing numbers for your production. Engine defaults impose no production resolution. Camera x/y describe camera translation, so layers move in the opposite direction. Zoom is positive. Pivot is in project pixels. Easing belongs to the outgoing keyframe: linear is default; smooth uses a deterministic cubic smoothstep. Tracks clamp before the first key and after the last, and must be strictly ordered with no duplicate frames.

## Layer placement and movement

`layers` is back-to-front paint order. Each layer has a unique id, assetId, type, x/y and display width/height. Position denotes its anchor, whose default is `[0,0]` (top left). `[0.5,0.5]` is center; `[0.5,1]` is bottom center. Scale defaults to 1, rotation to 0 degrees, opacity to 1. Rotations use the authored anchor. A motion track contains complete `{x,y,scale,rotation,opacity}` values: x/y offset the base position, scale/opacity multiply base values and rotation adds to base rotation.

`cropSafe: {inset: N}` reserves N pixels around the plate's displayed boundary; the remaining image must cover the entire project at every local frame. This is an explicit safeguard, not automatic scaling. Only unrotated 2D plates are supported. Transparent artwork or image masks can still expose holes; artists must inspect those pixels.

`cameraFollow: true` makes a 2D layer stay in screen coordinates while preserving layer order. Screen-space graphics also stay above the camera without this flag. Every layer may have a separate motion track, including characters.

## Multiplane

Select `mode: 'multiplane-2d'`. Supply the same 2D camera track. Each layer's `parallax` multiplies camera translation and its zoom delta: 0 stays fixed, 1 follows the full camera, values above 1 emphasize foreground movement. There is no inferred depth or random drifting. Order foreground layers after subjects for occlusion.

## Character cels and montage

On any image layer add `cels: [{frame: 0, assetId: 'poseA'}, {frame: 20, assetId: 'poseB'}]`. The new cel owns frame 20 onward; the base asset is used before the first cue. Cues must be ordered and inside the shot. `CharacterCel` selects from the current frame without playback history.

`template: 'montage'` with `mode: 'flat-2d'` uses the same cel mechanism for full-frame image cuts. Use one full-frame layer, list each still as a cel and hold the camera. MontageShot deliberately shares FlatShot's rendering behavior. It does not invent transition effects or timings.

## Graphics, titles and reveals

`graphics` holds screen-space SVG objects. Every entry has id, kind, from, duration, x/y and color. Kinds:

| Kind           | Additional values                         |
| -------------- | ----------------------------------------- |
| text           | text, fontSize, optional fontFamily       |
| rect / ellipse | width, height                             |
| path           | path (native SVG d), optional strokeWidth |

Use a local/system font family available on the rendering machine; remote font loading is absent. Graphics may have the same complete motion track as layers. An SVG path reveals over its explicit active window using normalized pathLength/strokeDashoffset. `reveal: {shape: 'wipe-left' | 'circle', from: 0, duration: 12}` adds a geometric clip. Image layers accept that geometric mask directly as `mask`, or `mask: {assetId: 'matte'}` for an image mask.

`template: 'title'` uses FlatShot plus the supplied GraphicOverlay. Typography, color, scale, timing and layout all come from project data. TitleShot has no brand identity or built-in title text.

## True image-plane 3D

Select `mode: 'image-plane-3d'`, with `projection: 'perspective'` (default) or `'orthographic'`. Optional fov defaults to 50 degrees and affects perspective only. Every camera key contains `{x,y,z,targetX,targetY,targetZ,zoom}`. A typical camera starts at `{x: 0,y: 0,z: 1500,targetX: 0,targetY: 0,targetZ: 0,zoom: 1}`.

Camera units are world units; layer placement stays in canvas pixels and is converted to a centered, positive-y-up coordinate system. `depth` is the plane's world z. Author layers from far to near, with increasing depth. Stills preserve RGBA transparency; image masks follow Three.js grayscale alpha-map rules. Materials are unlit, keeping illustration colors. No independent useFrame timing or visible modeling geometry is used.

Graphics render in 2D above ThreeCanvas. Camera-follow layers, videos, geometric per-layer masks and automatic crop bounds belong to the 2D modes; validation rejects them on 3D planes. Use a whole-shot transition to reveal a 3D scene geometrically. Check perspective framing yourself and provide enough overscan.

For authored spatial separation, a plane may declare `depthMotion: [{frame: 0, value: {z: 0}}, {frame: 89, value: {z: -200}}]`. This is an additive offset to its base `depth`. Optional `rotation3D` keys contain `{x,y,z}` angles in degrees around the authored anchor, in Three.js world axes. These tracks are supported only in `image-plane-3d`, require increasing integer frames inside the shot, and participate in animated near/far validation. Transparent planes are ordered by their current depth. No physics or independent clock is involved. Keep rotations modest enough to preserve the illustrated camera illusion.

Projects needing authored screen graphics can register a component in `src/projects/components.ts`; it can wrap the existing ShotTimeline and reuse the same project/shot data. Generic projects still use ShotTimeline directly. Keep story-specific overlays in their project directory.

## Timeline and transitions

A shot at 40 with duration 20 owns frames 40..59; its exclusive end is 60. Without a transition, the next start must equal that end. Shots must be supplied in timeline order starting at zero. The engine never silently fills a gap, sorts a malformed list or changes duration.

For a transition, add `transition: {kind: 'wipe-left' | 'circle', duration: 8}` to the **incoming** shot. Set its start to `previous.startFrame + previous.duration - 8`. The transition reveals the incoming scene over the previous scene's explicit tail and reaches full coverage on local frame 7. Both shots must be longer than the overlap; triple overlaps fail. The transition never adds extra frames. An authored cut simply has no transition.

StudioPreflight uses flat 0..39, multiplane 40..87, and image planes 80..119. Frames 80..87 are the declared wipe overlap; frame 80 begins fully on the outgoing shot. Duration is `max(startFrame + duration) = 120`, not the sum 128. Camera/cels hold after their last key during the outgoing tail.

## Audio cues

`project.cues` is an AudioCueMap: `{impact: {frame: 72, label: 'Impact', analysis: {rms: 0.4}}}`. RMS analysis data is optional. `shot.audioCueRefs: ['impact']` validates associations. Use cueFrame to author an explicit key/cut. A cue plays audio when it has `sound: {assetId: 'impact-wav', duration: 18, volumeDb: -12, trimBefore: 0}`. Register that local audio asset in `project.assets`. Studio shows a named SFX sequence at the cue's global frame; duration and trimBefore are integer frames, and the end is exclusive. Volume is dB gain applied to the source, restricted to -60..0; it is not a loudness target. Include the sound's natural tail, check the source trim, and measure overlapping effects in the final mix. Cues without sound remain timing markers. See [sound tools](SOUND_TOOLS.md) for recording search, moment detection, generation, mixing and QA. The preflight remains unchanged.

## Validation and preview

Run `npm run validate` before export and `npm test` after engine changes. Studio runtime validates structure; Img/useLoader report actual load failures, while the CLI preflight also checks file existence, real paths, dimensions and expected alpha. Programmatic composition registration is data-driven: save project edits in TypeScript. Studio preview/scrubbing works; inferred-prop source writeback is not provided.

Official references: [layers](https://www.remotion.dev/docs/layers), [ThreeCanvas and frame synchronization](https://www.remotion.dev/docs/three-canvas), [metadata and props](https://www.remotion.dev/docs/parameterized-rendering), [audio](https://www.remotion.dev/docs/media/audio), [R3F useLoader](https://r3f.docs.pmnd.rs/api/hooks#useloader).
