# Locked technology stack

The additional Openverse, Real SFX, earshot, HyperFrames and full FFmpeg tooling installed on 26 October 2026 is recorded in [SOUND_TOOLS.md](SOUND_TOOLS.md). The Remotion runtime versions below remain pinned.

Verified locally on 24 October 2026, Windows x64, Node v22.14.0 LTS and npm 11.7.0. Use `npm ci` with the committed package-lock.json to reproduce. All direct dependencies use exact versions.

| Package                      | Version | Responsibility                                            |
| ---------------------------- | ------- | --------------------------------------------------------- |
| remotion                     | 4.0.538 | React composition, frames, images, sequencing             |
| @remotion/cli                | 4.0.538 | Studio and CLI export                                     |
| @remotion/three              | 4.0.538 | Synchronized ThreeCanvas                                  |
| @remotion/media              | 4.0.538 | Audio and optional 2D video playback                      |
| @remotion/media-utils        | 4.0.538 | Optional audio decoding/analysis                          |
| @remotion/captions           | 4.0.538 | Timestamped vocal captions for Ivan's Escape              |
| @remotion/install-whisper-cpp | 4.0.538 | Local offline transcription tooling; no render-time model |
| @remotion/bundler            | 4.0.538 | Local preflight bundle (development tool)                 |
| @remotion/renderer           | 4.0.538 | Preflight still/video rendering (development tool)        |
| @remotion/eslint-config-flat | 4.0.538 | Official lint rules                                       |
| react / react-dom            | 19.2.3  | Components/rendering                                      |
| three                        | 0.186.1 | Image-plane geometry, textures and cameras                |
| @react-three/fiber           | 9.8.2   | React Three.js renderer                                   |
| sharp                        | 0.35.5  | Local placeholder assets, image validation, contact sheet |
| typescript                   | 5.9.3   | Strict type checking and tool compilation                 |
| eslint                       | 10.12.0 | Linting                                                   |
| prettier                     | 3.8.1   | Formatting (from official blank scaffold)                 |
| @types/node                  | 22.20.5 | Node LTS types                                            |
| @types/react                 | 19.2.7  | React types                                               |
| @types/three                 | 0.186.0 | Three.js types                                            |
| @types/web                   | 0.0.166 | Browser types (from blank scaffold)                       |

The official blank template was created using create-video 4.0.538. R3F 9.8.2 declares React >=19 <19.4 and Three >=0.156; these installed versions satisfy those peers. @remotion/three declares remotion 4.0.538 and R3F >=8. npm reports no invalid peers. Every transitive remotion/@remotion package is also checked against 4.0.538 in the lockfile.

The template's transitive Zod 4.5.4 had a high-severity oversized-collection validation advisory (GHSA-mrhx-c7xc-m3w5). The package.json override pins the existing dependency to patched 4.6.7; it is not a new application library. npm audit then reported zero vulnerabilities, and compilation, Studio and actual media renders passed with that override. Review the override when upgrading Remotion rather than silently removing it.

No paid add-on, animation library, postprocessing package, physics engine or alternate rendering framework was installed. Remotion's own CLI transitively includes packages unrelated to this engine; they are not imported or used for generation. FFmpeg/FFprobe and Chrome Headless Shell are provided/downloaded by Remotion, with no separate system installation.

## Official Agent Skills

Installed locally using the [currently documented supported method](https://www.remotion.dev/docs/ai/skills):

```sh
npx skills add remotion-dev/skills --yes --agent codex --skill remotion-best-practices
```

The skill is in `.agents/skills/remotion-best-practices/`, version 4.0.538, with skills-lock.json preserved. Its references cover creation, markup, compositions, ThreeCanvas and rendering. The onboarding's suggested `remotion skills add` command was not needed because the official documentation now specifies the skills installer.

## Rendering conditions

Three.js is selected per shot. Flat/multiplane shots use Remotion/CSS and native SVG. The 3D stage uses ThreeCanvas with fixed project dimensions, frame-driven camera updates, useLoader/Suspense textures and unlit transparent plane materials. There is no useFrame loop or visible primitive environment.

Desktop WebGL is explicitly `angle` in remotion.config.ts and Node rendering calls. The latter do not inherit CLI config. Preflight uses two concurrent render tabs and a separate Remotion-managed render port, 3100, to avoid Studio's 3000 on this Windows environment. No application backend was created.

References: [ThreeCanvas](https://www.remotion.dev/docs/three-canvas), [integration setup and desktop renderer](https://www.remotion.dev/docs/three), [GL configuration](https://www.remotion.dev/docs/gl-options), [R3F loading](https://r3f.docs.pmnd.rs/api/hooks#useloader), [Three.js materials](https://threejs.org/docs/pages/MeshBasicMaterial.html), [Remotion audio](https://www.remotion.dev/docs/media/audio), [Sharp](https://sharp.pixelplumbing.com/).
