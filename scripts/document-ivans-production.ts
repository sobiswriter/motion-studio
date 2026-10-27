import { mkdir, readFile, writeFile } from "node:fs/promises";
import { productionAssets } from "../src/projects/ivans-escape/production-assets";
import { artworkBriefs } from "../src/projects/ivans-escape/assets";
import {
  filmShots,
  montageCuts,
} from "../src/projects/ivans-escape/film-shots";
import { productionShots } from "../src/projects/ivans-escape/shots";

const root = "docs/projects/ivans-escape";
const resolved: Record<string, string> = {
  IVAN_MODEL:
    "ch01-walk-a; ch03-rear; ch04-turn; ch03-r-reflection; ch05-closeup",
  ENV01_SKY: "city-sky",
  ENV01_DISTANT: "city-distant; env01-clean",
  ENV01_ROAD: "city-road",
  ENV01_MID: "city-mid",
  ENV01_NEAR: "city-near",
  ENV01_ROOF:
    "Optional; omitted because near towers supply the foreground occlusion",
  ENV02_FAR: "env02-clean",
  ENV02_DISTANT: "env02-clean (consolidated continuous backing)",
  ENV02_FACADES: "env02-clean; street-near; street-strip",
  ENV02_GROUND: "street-ground",
  ENV02_OBJECTS: "street-bollard",
  ENV03_BACKING: "env03-glass",
  ENV03_GLASS: "env03-glass; glass-frame",
  ENV03_REFLECTION: "ch03-r-reflection; ch04-r-reflection (separate cels)",
  ENV03_HIGHLIGHTS:
    "Retained in glass painting; frame/characters remain separate",
  ENV03_EDGE: "glass-frame",
  ENV04_END: "corridor-far",
  ENV04_LEFT: "corridor-left; facade-0 through facade-5",
  ENV04_RIGHT: "corridor-right; facade-6 through facade-11",
  ENV04_GROUND: "corridor-ground",
  ENV04_DETAIL: "corridor-left; corridor-right (shared illustrated near piers)",
  ENV05_VOID: "env05-void",
  ENV05_ROAD: "boundary-road; road-0-0 through road-5-8",
  ENV05_LEFT: "boundary-left",
  ENV05_RIGHT: "boundary-right",
  ENV05_STRUCTURES:
    "boundary-left; boundary-right (shared termination architecture)",
  ENV06_SKY: "outside-sky",
  ENV06_HORIZON: "env06-outside (continuous backing)",
  ENV06_GROUND: "outside-ground",
  ENV06_ATMOSPHERE: "outside-sky (separate restrained translation)",
  CH01: "ch01-walk-a",
  CH02: "ch02-walk-b",
  CH03: "ch03-rear",
  CH04: "ch04-turn",
  CH05: "ch05-closeup",
  CH06: "ch06-foot",
  CH07: "ch07-run",
  "CH03-R": "ch03-r-reflection",
  "CH04-R": "ch04-r-reflection",
  CROWD_1: "commuter-1",
  CROWD_2: "commuter-2",
  CROWD_3: "commuter-3",
  CROWD_4: "commuter-4",
  MSK03_GLASS: "masks/glass.svg; glass-frame alpha occludes reflected cels",
  MSK06_PATH:
    "Native SVG path-boundary.svg behind the shoe; fracture in FilmGraphics",
  MSK08_STRIP: "masks/street-strip.svg",
  MSK09_STRIPS: "masks/facade-0.svg through masks/facade-11.svg",
  MSK10_ROAD: "masks/boundary-road.svg",
  MSK13_TILES:
    "54 authored perspective polygons baked into the road-tile alpha",
  MSK14_FRACTURE: "masks/corridor-left.svg; masks/corridor-right.svg",
  MSK18_SEAM: "masks/exit-left.svg; masks/exit-right.svg",
  DERIVED_IVAN_OUTLINE: "ch03-outline (edge derived from exact CH03 alpha)",
};
async function main() {
  await mkdir(`${root}/production`, { recursive: true });
  const assets = Object.values(productionAssets);
  const manifest = `# Production asset manifest\n\nAll film media is local. No stock substitution, procedural city or missing-art placeholder is used in the active film. Original preproduction briefs are design requirements; this document resolves them to the actual production assets. Closely related backing/highlight layers are consolidated where independent motion is unnecessary. Human artistic approval has not been claimed.\n\nSource artwork: 20 built-in imagegen calls (six environment masters, three clean plates, nine Ivan cels, one anonymous supporting figure and one foreground bollard). Exact prompts are under production/. Source PNGs remain in public/projects/ivans-escape/source; Sharp produces the registered layers, masks, anonymous silhouettes, outline and tiles.\n\n## Requirement resolution\n\n| Brief | Production resolution |\n|---|---|\n${artworkBriefs.map((a) => `| ${a.id} | ${resolved[a.id] ?? "UNRESOLVED"} |`).join("\n")}\n\n## Registered files\n\n${assets.length} runtime image assets, plus the original audio and two licensed local font files. Asset dimensions below describe the processed canvases; source art is usually 1672×941 (environment) or 1024×1536 (full body), so the 1080p output includes upsampling.\n\n| ID | Path relative to public/ | Dimensions | Alpha |\n|---|---|---|---|\n${assets.map((a) => `| ${a.id} | ${a.src} | ${a.width}×${a.height} | ${a.alpha ? "RGBA" : "opaque"} |`).join("\n")}\n\n## Replacement\n\nReplace a source PNG with art matching its existing viewpoint, identity, lighting and registered shapes; preserve the source filename. Run npm run assets:ivans, then npm run check:ivans-production and npm run ivans:stills. If architectural silhouettes change, revise the explicit SVG polygon masks in scripts/prepare-ivans-art.ts before reprocessing. An asset filename alone never controls positioning. Do not hand-edit the generated production-assets.ts. Character cels use a common (600,1680) foot register on 1200×1800. The shoe detail's actual registered sole is y=800 on 1600×900; its layer uses anchor [0.5,800/900].\n`;
  await writeFile(`${root}/ASSET_MANIFEST.md`, manifest);
  await writeFile(
    `${root}/MISSING_ASSETS.json`,
    JSON.stringify(
      {
        status:
          "All required active-film imagery, fonts, masks and original audio are present",
        missing: [],
        optionalOmitted: ["ENV01_ROOF"],
        artisticReview:
          "Generated art and edit are technically implemented; director acceptance remains a human judgement",
        resolution: resolved,
      },
      null,
      2,
    ),
  );
  await writeFile(
    `${root}/production/SHOT_CONFIGURATION.json`,
    JSON.stringify(filmShots, null, 2),
  );
  await writeFile(
    `${root}/production/ASSET_RESOLUTION.json`,
    JSON.stringify(resolved, null, 2),
  );
  const shotlist = `# Ivan's Escape — implemented shot list\n\nExactly 1800 frames / 60 seconds at 30 fps, 1920×1080. Ranges are exclusive at the end. Every shot is active in the IvansEscape composition; the pilot uses the identical first six definitions. No transition adds runtime. Full numeric layer placement and all camera/spatial keys: [production/SHOT_CONFIGURATION.json](production/SHOT_CONFIGURATION.json), generated from film-shots.ts.\n\n| Shot | Frames | Mode | Action / transition |\n|---|---|---|---|\n${filmShots.map((s, i) => `| ${s.id} — ${productionShots[i].title} | [${s.startFrame},${s.startFrame + s.duration}) | ${s.mode} | ${productionShots[i].composition} ${productionShots[i].transitionOut} |`).join("\n")}\n\n## Authored internal events\n\n- SH01 grid [0,11), loading [10,46), stepped initialization text at 12/24; tracking [45,60). Locked camera.\n- SH02 camera local 0→119, zoom 1→1.25, pivot (960,300), translation zero, smoothstep. Layers share 2880×1620 source coordinates, position (-480,-44) to register this production painting's high vanishing point. Clean backing/sky .08, distant .30, road 1, middle .65, near 1.10 parallax. Reticle at x960, y300+390×zoom. City style-v01 remains an unused earlier reference.\n- SH03 environment track 50px, hero camera-follow, 12-frame cels, four regular silhouette paths, near layer factor1.4, bollard1.7. SH07 begins from precisely the same camera and walking-cel layout.\n- SH04 hand 0→360 degrees over local0→89; fixed9-frame secondary steps; camera zoom1→1.08.\n- SH05 real head-turn global398; reflected turn406: exactly8 frames later. Reflection shift global407–408 then restore409. Glass-frame alpha sits above reflected layers and below foreground Ivan.\n- SH06 shoe translation local30→59/global480→509; fracture begins global510; camera1→1.18. Sole baseline matches processed shoe y800.\n- SH07 duplicate displacement12px at local41–42; SH08 selected facade strip20px local31–33, then restored.\n- SH09 twelve facade strips expose the supplied perspective wireframe. SH10 black punctuation is exactly [898,900), deliberately inside its own duration. Ivan never falls.\n- SH11 two uses of the identical portrait source; second develops an independent105px translation. SH12 reticle loses tracking at1035 and separates into six segments.\n- SH13 6×9 illustrated road regions, individually keyed in x/y and z; same central Ivan image remains. SH14 illustrated walls separate to expose the pale plate. No cubes, physics or particles.\n- SH15 memory cuts global1260/1286/1302/1330/1350: fragments26/16/28/20 frames, selected near measured positive RMS rises at42.86/43.40/44.32s. Reuses actual SH03/05/07/11 at declared source frames, not a replacement scene. These are signal-derived edit cues, not verified lyric onsets.\n- SH16 three initial images increase to eighteen, then fade into an outline derived from the exact same rear alpha. SH17 three structural image planes have distinct translation and rotation keys; roll is omitted (optional).\n- SH18 the two illustrated halves leave along a central vertical seam; all system graphics stop. SH19 outside [1620,1722), title [1722,1779), final message [1779,1800).\n\n## Rendering semantics\n\n2D layers use native CSS transforms/Remotion cels. ThreeCanvas runs only for SH13/14/17/18. Camera starts at (0,0,1158), fov50; spatial() compensates plane dimensions for initial authored depth. Pose, camera, opacity, masks, depth and rotations depend solely on the requested frame. A plane may rotate modestly but never present an unfinished reverse side or an edge-on empty world.\n`;
  await writeFile(`${root}/SHOTLIST.md`, shotlist);
  const currentBriefs = await readFile(`${root}/ARTWORK_BRIEFS.md`, "utf8");
  if (!currentBriefs.startsWith("> PRODUCTION STATUS"))
    await writeFile(
      `${root}/ARTWORK_BRIEFS.md`,
      `> PRODUCTION STATUS: Required active-film art has now been created through built-in imagegen and registered locally. The briefs below preserve the preproduction requirements, including their original proposed filenames/statuses. Use [ASSET_MANIFEST.md](ASSET_MANIFEST.md) and [production/ASSET_RESOLUTION.json](production/ASSET_RESOLUTION.json) for current files, consolidation decisions and remaining optional items.\n\n${currentBriefs}`,
    );
  await writeFile(
    `${root}/production/MONTAGE_CUES.json`,
    JSON.stringify(
      {
        source: "Original supplied audio, pooled stereo RMS20ms bins",
        cuts: montageCuts.map((frame) => frame + 1260),
        measuredRisesSeconds: [42.86, 43.4, 44.32],
        lyricOnsetsVerified: false,
      },
      null,
      2,
    ),
  );
  console.log(
    "Production asset resolution, exact shots/cameras and montage-cue documents updated.",
  );
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
