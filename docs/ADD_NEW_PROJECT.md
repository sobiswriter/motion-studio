# Add a production

Start in the motion-studio directory. Install the locked environment with `npm ci`. The initial browser download happens during first render; keep that browser cache for offline work. Runtime artwork and audio never require cloud hosting.

1. Create `src/projects/my-production/` containing `assets.ts`, `shots.ts` and `project.ts`. Create matching `public/projects/my-production/images/`, `masks/` and `audio/` folders. Leave `_demo` intact as the technical regression fixture.
2. Copy authored files into those public folders. Register each file in a typed `AssetManifest`; use paths such as `projects/my-production/images/plate.png`, without `public/` or an initial slash. Record actual source width/height and `alpha: true` when required. Read metadata with Sharp (see ASSET_PREPARATION.md).
3. Define a typed `ShotDefinition[]` using the examples in SHOT_CONFIGURATION.md. Starts, durations, cels, graphic windows and keyframes use integer frames. The first shot starts at zero; ordinary shots are contiguous. Explicit transition overlaps are the only permitted overlaps.
4. Export a `MotionProject` from project.ts:

```ts
import type { MotionProject } from "../../engine/types";
import { assets } from "./assets";
import { shots } from "./shots";

export const project: MotionProject = {
  id: "MyProduction", // Unique Remotion ID: letters, numbers and hyphens.
  title: "My Production",
  width: 1080,
  height: 1920,
  fps: 24,
  backgroundColor: "#ffffff",
  assets,
  shots,
  // audio: {src: assets.music.src, offsetFrames: 0},
};
```

5. Import it in `src/projects/index.ts` and append it to `projects`. This is the only shared registration file to edit. Root registers each entry independently and derives duration from its validated timeline. No renderer or template changes are needed for a different resolution, aspect ratio, fps or shot order.
6. Run `npm test` and `npm run lint`. Missing files, mismatched dimensions, missing alpha, unsafe crops and timing mistakes must be fixed before export.
7. Run `npm run dev`, select MyProduction in Remotion Studio and scrub the boundaries in both directions. Review moving plate edges, transparency, occlusion, text clipping and image-plane framing. Edit the typed project files to save changes; programmatic composition registration does not support Studio's source writeback of inferred default props.
8. Export only the requested project:

```sh
npm run export -- MyProduction out/MyProduction.mp4 --gl=angle --concurrency=2
```

For a cheap test use `npx remotion still MyProduction out/test.png --frame=0 --scale=0.333 --gl=angle --port=3100`. For a short motion check add `--frames=0-23` to a render command; CLI frame ranges are inclusive even though shot data uses exclusive ends.

StudioPreflight commands are intentionally fixed to the technical fixture: `npm run preflight` exports its MP4/contact sheet, while `npm run preflight:stills` checks its small stills without exporting a video. Do not change the fixture into a film. Real production data lives in a new project.
