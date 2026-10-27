# Motion Studio

Reusable local, artwork-first cinematic motion graphics engine. StudioPreflight remains the neutral 120-frame technical fixture. Ivan's Escape is the first implemented production: 40 illustrated shots, 60 seconds, styled vocal captions and an 18-second pilot.

```sh
npm ci
npm run dev
npm test
npm run lint
npm run preflight:stills
npm run preflight
```

Studio is normally at http://localhost:3000/StudioPreflight. Preflight exports out/StudioPreflight.mp4, out/contact-sheet.png and sampled frames using ANGLE. The first render downloads Remotion's browser; subsequent renders use that cache. Artwork and audio are local.

```text
src/
  engine/        # Timeline, cameras, artwork/cels, SVG, masks, audio, validation
  templates/     # FlatShot, ParallaxShot, ImagePlaneShot, TitleShot, MontageShot
  projects/      # Independent typed productions and registry
    _demo/       # StudioPreflight settings, shots, manifest
  Root.tsx       # Registry-driven Remotion compositions
public/projects/_demo/{images,masks,audio}/
scripts/         # Sharp fixture generation, validation, assertions, render checks
docs/            # Authoring guides, versions and measured results
out/             # Local exports (Git-ignored)
AGENTS.md        # Persistent coding and rendering rules
```

- [Start the next production](docs/ADD_NEW_PROJECT.md)
- [Prepare and replace artwork](docs/ASSET_PREPARATION.md)
- [Configure shots, cameras, cels and transitions](docs/SHOT_CONFIGURATION.md)
- [Exact versions and official references](docs/TECH_STACK.md)
- [Preflight results and limitations](docs/PREFLIGHT_RESULTS.md)
- [Sound tools, frame-locked SFX and installation checks](docs/SOUND_TOOLS.md)
- [Primary user-selected motion references: 22 timecoded studies](docs/reference-library/README.md)
- [Motion recipes, taste rules and reference-to-style routing](docs/reference-library/PLAYBOOK.md)

Edit typed project files and add an entry to src/projects/index.ts; the central engine stays unchanged. Studio supports preview/scrubbing, while generated composition registrations do not support saving inferred default props back to source.

Remotion's license terms apply: https://www.remotion.dev/license. No paid add-on was installed.

## Personal portfolio / Bound by curiosity

The current personal portfolio production is a two-minute 1080p60 edit of Souradip Biswas's supplied recording, using **A Pale Blue Stillness**. Six selected transition styles connect actual project, AI, research, skills and profile footage, with kinetic typography emphasized. Use `npm run portfolio:preview`, `npm run portfolio:check` or `npm run portfolio:render`. See [source and reproduction](src/projects/portfolio-film/README.md), [review evidence](src/projects/portfolio-film/REVIEW.md) and [credits](src/projects/portfolio-film/CREDITS.md).

## Motion Studio / 20 Styles

**Current revision: One idea. Twenty worlds.** The approved reference-led remake connects all 20 styles through an orange signal, an original movie camera and a miniature studio. A dedicated opening, material changes, mechanical/digital passages and a contact-sheet-to-identity ending fill exactly 60 seconds at 1080p60. The supplied **The Golden Hour Rise** remains the score, with 55 authored effects mixed through Real SFX. Use `npm run twenty-worlds:preview`, `npm run twenty-worlds:check`, or `npm run twenty-worlds:render`. See [editable source and reproduction](src/projects/twenty-worlds/README.md), [review evidence](src/projects/twenty-worlds/REVIEW.md) and [credits](src/projects/twenty-worlds/CREDITS.md).

The previous Beyond the Frame revision remains at [style-showreel-v2](src/projects/style-showreel-v2/README.md), with its original commands and exports preserved.

The 60-second showreel is a separate editable HyperFrames production at `src/projects/style-showreel`: all 20 styles from the master design philosophy, 1920×1080 at 60 fps, with an original earshot-based score and Openverse recordings mixed through Real SFX. Use `npm run showreel:preview`, `npm run showreel:check`, or `npm run showreel:render`. See its [production notes](src/projects/style-showreel/README.md) and [required sound credits](src/projects/style-showreel/CREDITS.md).

## Ivan's Escape

Open http://localhost:3000/IvansEscape with `npm run dev` running. See [production documentation](docs/projects/ivans-escape/README.md) for assets, the complete edit, pilot and validation.

Use `npm run check:ivans-production`, `npm run ivans:stills`, `npm run ivans:draft` or `npm run ivans:final`. Current outputs are under `out/ivans-escape/illustrated`; earlier MP4s remain archived. The official caption format and local transcription helper are pinned to Remotion4.0.538. See the [current handoff and artwork provenance](docs/projects/ivans-escape/redirection/production/README.md).
