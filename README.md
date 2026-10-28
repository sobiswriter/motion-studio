# Motion Studio

Local motion-design studio for artwork-first films, product ads and portfolios. Uses Remotion/React/TypeScript and a separate HyperFrames workflow, with FFmpeg and local sound tools. This repository contains the source, configuration, lockfiles, master design documentation, reference studies and music catalogue. Large media and runtime caches stay local or in the user’s Drive.

## Start here — humans and agents

1. Read [AGENTS.md](AGENTS.md), then [master rules](<Master Design Documentation/Rules.md>), [workflow](<Master Design Documentation/Workflow.md>) and [design philosophy](<Master Design Documentation/Design Philosophy.md>). Reuse the user’s existing brief and storyboard decision.
2. Read the [motion reference library](docs/reference-library/README.md) and [music guide](docs/music-library/README.md). Select concrete reference intervals and exact music source ranges; follow the evidence limits.
3. Check [external asset recovery](docs/github/ASSETS_FROM_DRIVE.md) before running a production. **If a required large file is missing, ask the user to retrieve it from their Drive and restore it to its recorded path. Never invent a Drive link, fabricate a replacement or silently omit it.**
4. Install Node matching package.json engines, run npm ci, npm test and npm run lint. Use package.json for the current project-specific preview/build/check/render commands.
5. Read [new-project guidance](docs/ADD_NEW_PROJECT.md), [asset preparation](docs/ASSET_PREPARATION.md) and [sound setup](docs/SOUND_TOOLS.md). Existing productions are examples; keep changes isolated in the selected project.

## Repository and media boundaries

- Include source, scripts, package-lock.json, skills-lock.json, requirements-audio.lock.txt, configuration, all Markdown/JSON documentation and small documentation evidence images. Documentation screenshots/plots are explicitly allowed by .gitignore.
- Keep assets/, public/, project assets/, out/, .cache/, node_modules/, models, binaries and original audio/video outside Git. Their absence in a clone is expected. See the [external inventory](docs/github/EXTERNAL_ASSETS.json).
- No credentials, private keys or environment files belong in commits. The repository is UNLICENSED; supplied product/reference/music rights are not newly granted by making source available.
- This preparation does not delete local files, rewrite Git history, commit or push. Existing local recovery history must remain intact.

## Current work

The latest realme film is src/projects/realme-buds-air8-extended:120s/1080p60, yellow REF-20 opening, Make it real copy and Architects of Motion music. Its README, FACTS, AUDIO, CREDITS, REVIEW and delivery-check record the actual implementation and limits. Earlier films remain separate.

The music library has25full-track analyses and a local audition page. Reference and music pages need the original user media to play; their written studies and small evidence images remain in Git.

## Earlier project notes and command reference

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

## realme Buds Air8 / product films

The **extended edition**, now titled **Make it real**, opens on realme yellow with a REF-20 brand reveal and is two minutes at1080p60: 16 chapters, meaningful particle fields, seven transition families, additional verified features and the supplied **Architects of Motion** track. Use `npm run buds:extended:preview`, `npm run buds:extended:check` or `npm run buds:extended:render`. See [extended source](src/projects/realme-buds-air8-extended/README.md), [review](src/projects/realme-buds-air8-extended/REVIEW.md) and [credits](src/projects/realme-buds-air8-extended/CREDITS.md).

A 45-second, 1080p60 Master Grey product concept using genuine product photos, qualified manufacturer claims and the supplied **Glass and Alloy** track. Liquid Morph, Bauhaus, Comic Book, Neo-Brutalism and Kinetic transitions connect eight scenes. Use `npm run buds:preview`, `npm run buds:check` or `npm run buds:render`. See [source and reproduction](src/projects/realme-buds-air8/README.md), [verified product facts](src/projects/realme-buds-air8/FACTS.md), [review](src/projects/realme-buds-air8/REVIEW.md) and [credits](src/projects/realme-buds-air8/CREDITS.md).

## Personal portfolio / SOBIVERSE

The current edition is **SOBIVERSE / A universe in motion**: two minutes at 1080p60 using **A Pale Blue Stillness**, the site's actual galaxy, direct portfolio frames, native portrait and original profile cards. Images become blended space backgrounds, orbital artwork and kinetic transition destinations. Use `npm run portfolio:space:preview`, `npm run portfolio:space:check` or `npm run portfolio:space:render`. See [source and reproduction](src/projects/portfolio-space/README.md), [review evidence](src/projects/portfolio-space/REVIEW.md) and [credits](src/projects/portfolio-space/CREDITS.md).

The earlier [recording-based edit](src/projects/portfolio-film/README.md) and [paper-led original-graphics edition](src/projects/portfolio-designed/README.md) are preserved with their existing commands.

## Motion Studio / 20 Styles

**Current revision: One idea. Twenty worlds.** The approved reference-led remake connects all 20 styles through an orange signal, an original movie camera and a miniature studio. A dedicated opening, material changes, mechanical/digital passages and a contact-sheet-to-identity ending fill exactly 60 seconds at 1080p60. The supplied **The Golden Hour Rise** remains the score, with 55 authored effects mixed through Real SFX. Use `npm run twenty-worlds:preview`, `npm run twenty-worlds:check`, or `npm run twenty-worlds:render`. See [editable source and reproduction](src/projects/twenty-worlds/README.md), [review evidence](src/projects/twenty-worlds/REVIEW.md) and [credits](src/projects/twenty-worlds/CREDITS.md).

The previous Beyond the Frame revision remains at [style-showreel-v2](src/projects/style-showreel-v2/README.md), with its original commands and exports preserved.

The 60-second showreel is a separate editable HyperFrames production at `src/projects/style-showreel`: all 20 styles from the master design philosophy, 1920×1080 at 60 fps, with an original earshot-based score and Openverse recordings mixed through Real SFX. Use `npm run showreel:preview`, `npm run showreel:check`, or `npm run showreel:render`. See its [production notes](src/projects/style-showreel/README.md) and [required sound credits](src/projects/style-showreel/CREDITS.md).

## Ivan's Escape

Open http://localhost:3000/IvansEscape with `npm run dev` running. See [production documentation](docs/projects/ivans-escape/README.md) for assets, the complete edit, pilot and validation.

Use `npm run check:ivans-production`, `npm run ivans:stills`, `npm run ivans:draft` or `npm run ivans:final`. Current outputs are under `out/ivans-escape/illustrated`; earlier MP4s remain archived. The official caption format and local transcription helper are pinned to Remotion4.0.538. See the [current handoff and artwork provenance](docs/projects/ivans-escape/redirection/production/README.md).

## Supplied music guide

[Music library](docs/music-library/README.md):25tracks with measured full-track profiles, timed audition ranges, editing suggestions and reference pairings. [Local audition page](docs/music-library/index.html) keeps original names and allows passage previews. See [method and limits](docs/music-library/PLAYBOOK.md); vocal absence/genre are not inferred from filenames.
