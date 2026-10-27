# Production asset manifest

All film media is local. No stock substitution, procedural city or missing-art placeholder is used in the active film. Original preproduction briefs are design requirements; this document resolves them to the actual production assets. Closely related backing/highlight layers are consolidated where independent motion is unnecessary. Human artistic approval has not been claimed.

Source artwork: 20 built-in imagegen calls (six environment masters, three clean plates, nine Ivan cels, one anonymous supporting figure and one foreground bollard). Exact prompts are under production/. Source PNGs remain in public/projects/ivans-escape/source; Sharp produces the registered layers, masks, anonymous silhouettes, outline and tiles.

## Requirement resolution

| Brief                | Production resolution                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| IVAN_MODEL           | ch01-walk-a; ch03-rear; ch04-turn; ch03-r-reflection; ch05-closeup     |
| ENV01_SKY            | city-sky                                                               |
| ENV01_DISTANT        | city-distant; env01-clean                                              |
| ENV01_ROAD           | city-road                                                              |
| ENV01_MID            | city-mid                                                               |
| ENV01_NEAR           | city-near                                                              |
| ENV01_ROOF           | Optional; omitted because near towers supply the foreground occlusion  |
| ENV02_FAR            | env02-clean                                                            |
| ENV02_DISTANT        | env02-clean (consolidated continuous backing)                          |
| ENV02_FACADES        | env02-clean; street-near; street-strip                                 |
| ENV02_GROUND         | street-ground                                                          |
| ENV02_OBJECTS        | street-bollard                                                         |
| ENV03_BACKING        | env03-glass                                                            |
| ENV03_GLASS          | env03-glass; glass-frame                                               |
| ENV03_REFLECTION     | ch03-r-reflection; ch04-r-reflection (separate cels)                   |
| ENV03_HIGHLIGHTS     | Retained in glass painting; frame/characters remain separate           |
| ENV03_EDGE           | glass-frame                                                            |
| ENV04_END            | corridor-far                                                           |
| ENV04_LEFT           | corridor-left; facade-0 through facade-5                               |
| ENV04_RIGHT          | corridor-right; facade-6 through facade-11                             |
| ENV04_GROUND         | corridor-ground                                                        |
| ENV04_DETAIL         | corridor-left; corridor-right (shared illustrated near piers)          |
| ENV05_VOID           | env05-void                                                             |
| ENV05_ROAD           | boundary-road; road-0-0 through road-5-8                               |
| ENV05_LEFT           | boundary-left                                                          |
| ENV05_RIGHT          | boundary-right                                                         |
| ENV05_STRUCTURES     | boundary-left; boundary-right (shared termination architecture)        |
| ENV06_SKY            | outside-sky                                                            |
| ENV06_HORIZON        | env06-outside (continuous backing)                                     |
| ENV06_GROUND         | outside-ground                                                         |
| ENV06_ATMOSPHERE     | outside-sky (separate restrained translation)                          |
| CH01                 | ch01-walk-a                                                            |
| CH02                 | ch02-walk-b                                                            |
| CH03                 | ch03-rear                                                              |
| CH04                 | ch04-turn                                                              |
| CH05                 | ch05-closeup                                                           |
| CH06                 | ch06-foot                                                              |
| CH07                 | ch07-run                                                               |
| CH03-R               | ch03-r-reflection                                                      |
| CH04-R               | ch04-r-reflection                                                      |
| CROWD_1              | commuter-1                                                             |
| CROWD_2              | commuter-2                                                             |
| CROWD_3              | commuter-3                                                             |
| CROWD_4              | commuter-4                                                             |
| MSK03_GLASS          | masks/glass.svg; glass-frame alpha occludes reflected cels             |
| MSK06_PATH           | Native SVG path-boundary.svg behind the shoe; fracture in FilmGraphics |
| MSK08_STRIP          | masks/street-strip.svg                                                 |
| MSK09_STRIPS         | masks/facade-0.svg through masks/facade-11.svg                         |
| MSK10_ROAD           | masks/boundary-road.svg                                                |
| MSK13_TILES          | 54 authored perspective polygons baked into the road-tile alpha        |
| MSK14_FRACTURE       | masks/corridor-left.svg; masks/corridor-right.svg                      |
| MSK18_SEAM           | masks/exit-left.svg; masks/exit-right.svg                              |
| DERIVED_IVAN_OUTLINE | ch03-outline (edge derived from exact CH03 alpha)                      |

## Registered files

115 runtime image assets, plus the original audio and two licensed local font files. Asset dimensions below describe the processed canvases; source art is usually 1672×941 (environment) or 1024×1536 (full body), so the 1080p output includes upsampling.

| ID                | Path relative to public/                           | Dimensions | Alpha  |
| ----------------- | -------------------------------------------------- | ---------- | ------ |
| env01-city        | projects/ivans-escape/images/env01-city.png        | 2880×1620  | opaque |
| env01-clean       | projects/ivans-escape/images/env01-clean.png       | 2880×1620  | opaque |
| env02-street      | projects/ivans-escape/images/env02-street.png      | 2880×1620  | opaque |
| env02-clean       | projects/ivans-escape/images/env02-clean.png       | 2880×1620  | opaque |
| env03-glass       | projects/ivans-escape/images/env03-glass.png       | 2880×1620  | opaque |
| env04-corridor    | projects/ivans-escape/images/env04-corridor.png    | 2880×1620  | opaque |
| env05-boundary    | projects/ivans-escape/images/env05-boundary.png    | 2880×1620  | opaque |
| env05-void        | projects/ivans-escape/images/env05-void.png        | 2880×1620  | opaque |
| env06-outside     | projects/ivans-escape/images/env06-outside.png     | 2880×1620  | opaque |
| city-sky          | projects/ivans-escape/images/city-sky.png          | 2880×1620  | RGBA   |
| city-distant      | projects/ivans-escape/images/city-distant.png      | 2880×1620  | RGBA   |
| city-road         | projects/ivans-escape/images/city-road.png         | 2880×1620  | RGBA   |
| city-mid          | projects/ivans-escape/images/city-mid.png          | 2880×1620  | RGBA   |
| city-near         | projects/ivans-escape/images/city-near.png         | 2880×1620  | RGBA   |
| street-ground     | projects/ivans-escape/images/street-ground.png     | 2880×1620  | RGBA   |
| street-near       | projects/ivans-escape/images/street-near.png       | 2880×1620  | RGBA   |
| street-strip      | projects/ivans-escape/images/street-strip.png      | 2880×1620  | RGBA   |
| glass-frame       | projects/ivans-escape/images/glass-frame.png       | 2880×1620  | RGBA   |
| corridor-left     | projects/ivans-escape/images/corridor-left.png     | 2880×1620  | RGBA   |
| corridor-right    | projects/ivans-escape/images/corridor-right.png    | 2880×1620  | RGBA   |
| corridor-ground   | projects/ivans-escape/images/corridor-ground.png   | 2880×1620  | RGBA   |
| corridor-far      | projects/ivans-escape/images/corridor-far.png      | 2880×1620  | RGBA   |
| facade-0          | projects/ivans-escape/images/facade-0.png          | 2880×1620  | RGBA   |
| facade-1          | projects/ivans-escape/images/facade-1.png          | 2880×1620  | RGBA   |
| facade-2          | projects/ivans-escape/images/facade-2.png          | 2880×1620  | RGBA   |
| facade-3          | projects/ivans-escape/images/facade-3.png          | 2880×1620  | RGBA   |
| facade-4          | projects/ivans-escape/images/facade-4.png          | 2880×1620  | RGBA   |
| facade-5          | projects/ivans-escape/images/facade-5.png          | 2880×1620  | RGBA   |
| facade-6          | projects/ivans-escape/images/facade-6.png          | 2880×1620  | RGBA   |
| facade-7          | projects/ivans-escape/images/facade-7.png          | 2880×1620  | RGBA   |
| facade-8          | projects/ivans-escape/images/facade-8.png          | 2880×1620  | RGBA   |
| facade-9          | projects/ivans-escape/images/facade-9.png          | 2880×1620  | RGBA   |
| facade-10         | projects/ivans-escape/images/facade-10.png         | 2880×1620  | RGBA   |
| facade-11         | projects/ivans-escape/images/facade-11.png         | 2880×1620  | RGBA   |
| wireframe         | projects/ivans-escape/images/wireframe.png         | 2880×1620  | opaque |
| boundary-road     | projects/ivans-escape/images/boundary-road.png     | 2880×1620  | RGBA   |
| boundary-left     | projects/ivans-escape/images/boundary-left.png     | 2880×1620  | RGBA   |
| boundary-right    | projects/ivans-escape/images/boundary-right.png    | 2880×1620  | RGBA   |
| exit-left         | projects/ivans-escape/images/exit-left.png         | 2880×1620  | RGBA   |
| exit-right        | projects/ivans-escape/images/exit-right.png        | 2880×1620  | RGBA   |
| outside-sky       | projects/ivans-escape/images/outside-sky.png       | 2880×1620  | RGBA   |
| outside-ground    | projects/ivans-escape/images/outside-ground.png    | 2880×1620  | RGBA   |
| glass-mask        | projects/ivans-escape/masks/glass.svg              | 2880×1620  | RGBA   |
| ch01-walk-a       | projects/ivans-escape/images/ch01-walk-a.png       | 1200×1800  | RGBA   |
| ch02-walk-b       | projects/ivans-escape/images/ch02-walk-b.png       | 1200×1800  | RGBA   |
| ch03-rear         | projects/ivans-escape/images/ch03-rear.png         | 1200×1800  | RGBA   |
| ch04-turn         | projects/ivans-escape/images/ch04-turn.png         | 1200×1800  | RGBA   |
| ch03-r-reflection | projects/ivans-escape/images/ch03-r-reflection.png | 1200×1800  | RGBA   |
| ch04-r-reflection | projects/ivans-escape/images/ch04-r-reflection.png | 1200×1800  | RGBA   |
| ch05-closeup      | projects/ivans-escape/images/ch05-closeup.png      | 1600×1600  | RGBA   |
| ch06-foot         | projects/ivans-escape/images/ch06-foot.png         | 1600×900   | RGBA   |
| ch07-run          | projects/ivans-escape/images/ch07-run.png          | 1200×1800  | RGBA   |
| crowd             | projects/ivans-escape/images/crowd.png             | 1200×1800  | RGBA   |
| street-bollard    | projects/ivans-escape/images/street-bollard.png    | 1200×1800  | RGBA   |
| ch03-outline      | projects/ivans-escape/images/ch03-outline.png      | 1200×1800  | RGBA   |
| contact-shadow    | projects/ivans-escape/images/contact-shadow.png    | 800×100    | RGBA   |
| path-boundary     | projects/ivans-escape/masks/path-boundary.svg      | 1920×1080  | RGBA   |
| commuter-1        | projects/ivans-escape/images/commuter-1.png        | 1200×1800  | RGBA   |
| commuter-2        | projects/ivans-escape/images/commuter-2.png        | 1200×1800  | RGBA   |
| commuter-3        | projects/ivans-escape/images/commuter-3.png        | 1200×1800  | RGBA   |
| commuter-4        | projects/ivans-escape/images/commuter-4.png        | 1200×1800  | RGBA   |
| road-0-0          | projects/ivans-escape/images/road-0-0.png          | 304×125    | RGBA   |
| road-0-1          | projects/ivans-escape/images/road-0-1.png          | 251×125    | RGBA   |
| road-0-2          | projects/ivans-escape/images/road-0-2.png          | 197×125    | RGBA   |
| road-0-3          | projects/ivans-escape/images/road-0-3.png          | 144×125    | RGBA   |
| road-0-4          | projects/ivans-escape/images/road-0-4.png          | 118×125    | RGBA   |
| road-0-5          | projects/ivans-escape/images/road-0-5.png          | 144×125    | RGBA   |
| road-0-6          | projects/ivans-escape/images/road-0-6.png          | 197×125    | RGBA   |
| road-0-7          | projects/ivans-escape/images/road-0-7.png          | 251×125    | RGBA   |
| road-0-8          | projects/ivans-escape/images/road-0-8.png          | 304×125    | RGBA   |
| road-1-0          | projects/ivans-escape/images/road-1-0.png          | 357×125    | RGBA   |
| road-1-1          | projects/ivans-escape/images/road-1-1.png          | 303×125    | RGBA   |
| road-1-2          | projects/ivans-escape/images/road-1-2.png          | 250×125    | RGBA   |
| road-1-3          | projects/ivans-escape/images/road-1-3.png          | 197×125    | RGBA   |
| road-1-4          | projects/ivans-escape/images/road-1-4.png          | 170×125    | RGBA   |
| road-1-5          | projects/ivans-escape/images/road-1-5.png          | 197×125    | RGBA   |
| road-1-6          | projects/ivans-escape/images/road-1-6.png          | 250×125    | RGBA   |
| road-1-7          | projects/ivans-escape/images/road-1-7.png          | 303×125    | RGBA   |
| road-1-8          | projects/ivans-escape/images/road-1-8.png          | 357×125    | RGBA   |
| road-2-0          | projects/ivans-escape/images/road-2-0.png          | 411×125    | RGBA   |
| road-2-1          | projects/ivans-escape/images/road-2-1.png          | 357×125    | RGBA   |
| road-2-2          | projects/ivans-escape/images/road-2-2.png          | 303×125    | RGBA   |
| road-2-3          | projects/ivans-escape/images/road-2-3.png          | 251×125    | RGBA   |
| road-2-4          | projects/ivans-escape/images/road-2-4.png          | 224×125    | RGBA   |
| road-2-5          | projects/ivans-escape/images/road-2-5.png          | 251×125    | RGBA   |
| road-2-6          | projects/ivans-escape/images/road-2-6.png          | 303×125    | RGBA   |
| road-2-7          | projects/ivans-escape/images/road-2-7.png          | 357×125    | RGBA   |
| road-2-8          | projects/ivans-escape/images/road-2-8.png          | 411×125    | RGBA   |
| road-3-0          | projects/ivans-escape/images/road-3-0.png          | 464×125    | RGBA   |
| road-3-1          | projects/ivans-escape/images/road-3-1.png          | 411×125    | RGBA   |
| road-3-2          | projects/ivans-escape/images/road-3-2.png          | 357×125    | RGBA   |
| road-3-3          | projects/ivans-escape/images/road-3-3.png          | 304×125    | RGBA   |
| road-3-4          | projects/ivans-escape/images/road-3-4.png          | 278×125    | RGBA   |
| road-3-5          | projects/ivans-escape/images/road-3-5.png          | 304×125    | RGBA   |
| road-3-6          | projects/ivans-escape/images/road-3-6.png          | 357×125    | RGBA   |
| road-3-7          | projects/ivans-escape/images/road-3-7.png          | 411×125    | RGBA   |
| road-3-8          | projects/ivans-escape/images/road-3-8.png          | 464×125    | RGBA   |
| road-4-0          | projects/ivans-escape/images/road-4-0.png          | 474×125    | RGBA   |
| road-4-1          | projects/ivans-escape/images/road-4-1.png          | 463×125    | RGBA   |
| road-4-2          | projects/ivans-escape/images/road-4-2.png          | 410×125    | RGBA   |
| road-4-3          | projects/ivans-escape/images/road-4-3.png          | 357×125    | RGBA   |
| road-4-4          | projects/ivans-escape/images/road-4-4.png          | 330×125    | RGBA   |
| road-4-5          | projects/ivans-escape/images/road-4-5.png          | 357×125    | RGBA   |
| road-4-6          | projects/ivans-escape/images/road-4-6.png          | 410×125    | RGBA   |
| road-4-7          | projects/ivans-escape/images/road-4-7.png          | 463×125    | RGBA   |
| road-4-8          | projects/ivans-escape/images/road-4-8.png          | 474×125    | RGBA   |
| road-5-0          | projects/ivans-escape/images/road-5-0.png          | 288×125    | RGBA   |
| road-5-1          | projects/ivans-escape/images/road-5-1.png          | 517×125    | RGBA   |
| road-5-2          | projects/ivans-escape/images/road-5-2.png          | 463×125    | RGBA   |
| road-5-3          | projects/ivans-escape/images/road-5-3.png          | 411×125    | RGBA   |
| road-5-4          | projects/ivans-escape/images/road-5-4.png          | 384×125    | RGBA   |
| road-5-5          | projects/ivans-escape/images/road-5-5.png          | 411×125    | RGBA   |
| road-5-6          | projects/ivans-escape/images/road-5-6.png          | 463×125    | RGBA   |
| road-5-7          | projects/ivans-escape/images/road-5-7.png          | 517×125    | RGBA   |
| road-5-8          | projects/ivans-escape/images/road-5-8.png          | 288×125    | RGBA   |

## Replacement

Replace a source PNG with art matching its existing viewpoint, identity, lighting and registered shapes; preserve the source filename. Run npm run assets:ivans, then npm run check:ivans-production and npm run ivans:stills. If architectural silhouettes change, revise the explicit SVG polygon masks in scripts/prepare-ivans-art.ts before reprocessing. An asset filename alone never controls positioning. Do not hand-edit the generated production-assets.ts. Character cels use a common (600,1680) foot register on 1200×1800. The shoe detail's actual registered sole is y=800 on 1600×900; its layer uses anchor [0.5,800/900].
