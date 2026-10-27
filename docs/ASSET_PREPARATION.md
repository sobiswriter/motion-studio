# Local artwork workflow

Copy artwork into `public/projects/<project-id>/`. Keep original sources elsewhere and import export-ready copies. Rendering uses only local files. There is no image generation, stock-art substitution or cloud asset dependency.

From the repository root, inspect a file with the installed Sharp library:

```sh
node -e "require('sharp')('public/projects/my-production/images/plate.png').metadata().then(console.log)"
```

Record `width`, `height` and whether alpha is needed in assets.ts. The validator compares those values with the file. To normalize orientation and preserve transparency as PNG:

```sh
node -e "require('sharp')('original.png').autoOrient().png().toFile('public/projects/my-production/images/plate.png')"
```

Use separate input/output paths. Never flatten a character onto a background or save it as JPEG. Source dimensions describe pixels in the actual file; layer width/height describe its displayed size. Match their aspect ratio unless deliberate stretching is intended. There is no automatic filename-based positioning or automatic fitting.

## Add each asset type

1. **Background plate:** Export a full plate, including overscan beyond the frame wherever camera motion reveals new content. Copy to images/. Add an image manifest entry with actual dimensions. Add it first in `shot.layers`, set type background, x/y, width/height and (for 2D) `cropSafe: {inset: 0}`. Pan, zoom and layer motion all affect required coverage. Increase overscan or reduce camera travel until validation passes. A 1920×1080 file has no spare pixels for a 1920×1080 lateral pan at scale 1.
2. **Transparent subject:** Export an RGBA PNG with clean semitransparent edges. Add `alpha: true` to its manifest entry. Give the character layer an explicit pivot; `[0.5, 1]` places its bottom center at x/y. Its transparent bounding box determines the pose's alignment.
3. **Multiple poses:** Export every pose using the same transparent canvas dimensions and registration point. Register each image independently, then add `cels: [{frame: 0, assetId: 'poseA'}, {frame: 20, assetId: 'poseB'}]`. These are shot-local cut frames. The previous pose holds until the next cue; scrubbing backward restores it. Different source sizes can be used, but display size stays fixed and the artist must preserve alignment.
4. **Foreground:** Export foreground artwork separately with alpha. Put it after the subject in the layer array. Assign a larger parallax factor (multiplane) or nearer z depth (3D). Supply transparent margins/overscan where needed. Occlusion is intentional layer coverage, not an automatic cutout effect.
5. **Mask:** Place the mask in masks/ and register it as an image. 2D image masks use the PNG's alpha channel, stretched to the layer's displayed rectangle. Geometric masks use `shape`, `from` and `duration`. Three.js alpha maps instead use grayscale RGB (green channel): black hides, white reveals; the mask's own alpha is ignored. Export a separate opaque grayscale image for this case. Native texture alpha remains intact and multiplies with the map. For a consistent reusable matte across both modes, bake it into the artwork's alpha using Sharp and omit the layer mask.
6. **Audio:** Copy a local WAV/MP3 into audio/, register it with kind audio and set `project.audio.src` to that manifest entry's src. `offsetFrames` delays playback on the project timeline and must be nonnegative. Manual cue frames are global; audio is not analyzed automatically. Keep audio at least as long as the required picture, or accept silence after the track ends.
7. **A shot:** Add a shot object to shots.ts with a unique ID, mode, explicit start/duration, layers and camera track. Add graphics/cels/masks only where needed. Follow SHOT_CONFIGURATION.md, then run `npm run validate`.
8. **A project:** Follow ADD_NEW_PROJECT.md and add its export to the projects registry. All assets, timing, identity and audio stay in that production's files.

## Replacing artwork

Replace the file at the existing path with the same pixel dimensions, alpha and registration point. Run `npm run validate`; camera logic and shot data stay unchanged. If dimensions change intentionally, update the asset manifest and review the layer display size/pivot and framing. A replacement never triggers an automatic camera rewrite. A missing file or invalid manifest fails clearly.

## Image-plane limits

Planes remain flat illustrations: perspective does not create unseen artwork, character rigging or volumetric depth. Split foreground/mid/background elements before using the 3D mode. Art x/y is in project pixels, while camera x/y/z is in centered Three.js world units (one unit equals one authored pixel). Larger positive depth is nearer a camera looking toward negative z. Keep planes in increasing depth order and in front of the camera near/far range (1..20000).

Perspective coverage needs manual review at the beginning, end and transition boundaries. 2D crop-safe bounds are deliberately limited to unrotated plates; 3D coverage is not automatically solved. 3D planes accept stills and grayscale image masks. Use screen-space graphics for overlays; source video clips and geometric layer masks use the 2D renderers. More elaborate 3D compositing should be added only when a production requires it.

## Sources

- [Sharp metadata](https://sharp.pixelplumbing.com/api-input/), [PNG export](https://sharp.pixelplumbing.com/api-output/), [compositing](https://sharp.pixelplumbing.com/api-composite/).
- [Remotion local assets and layers](https://www.remotion.dev/docs/layers).
- [Three.js alpha-map channel semantics](https://threejs.org/docs/pages/MeshBasicMaterial.html).
