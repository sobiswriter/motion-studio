# Ivan's Escape — production bible

[IVANS_ESCAPE_MASTER.md](IVANS_ESCAPE_MASTER.md) is the unchanged authoritative reference. The user's continuation instruction authorized the complete production after the earlier preproduction stop. Picture is exactly 60 seconds, 1800 integer frames, 1920×1080, 30fps.

## Narrative

1. Creation [0,180): the system initializes Ivan and a tightly controlled city.
2. Routine and awakening [180,540): synchronized walking, mechanical time, a delayed reflection, then deliberate disobedience.
3. Replacement and escape [540,1260): an exact duplicate occupies Ivan's role. He recognizes the system, refuses its path and reaches its structural boundary.
4. Collapse [1260,1620): remembered images, multiplying Ivans and separating illustrated architecture lead to the central exit.
5. Freedom/title [1620,1800): a quiet pale world, title, final connection-lost message.

The story must read visually without explanatory subtitles. No new dialogue, named characters, alternate plot or falling sequence is introduced. Repetition is established before replacement. Disintegration removes illustrated surfaces; it does not generate cubes, explosions or particles.

## Art direction and palette

Weathered brutalist matte paintings, strong scale, controlled symmetry, cold overcast upper-left light and atmospheric distance. Source art uses detailed photographic-painterly surface texture. The outside becomes pale, quiet and spacious. No glossy modeled world, neon advertising, arbitrary effects or unrelated stock imagery.

| Role           | Color   |
| -------------- | ------- |
| Deep shadow    | #0B1018 |
| Blue-black     | #172330 |
| Concrete       | #586A79 |
| Fog            | #B5C3C9 |
| Pale highlight | #E6E9E6 |
| Anomaly        | #FF4D57 |
| Ivan jacket    | #C76A4B |
| Outside        | #D5CEC1 |

Red stays sparse during creation and grows only with narrative conflict. The opening's small location dot is burnt orange. The outside hold has no system graphics. No continuous grain/glitch/shake loop is added.

## One working Ivan identity

Canonical source: public/projects/ivans-escape/source/ch01-walk-a.png. A lean young adult man, short slightly unkempt black hair, faded burnt-orange jacket, charcoal shirt, dark straight trousers and worn off-white sneakers. No armor, backpack or accessories. Nine matched full-body/detail images were created with the built-in imagegen tool using the canonical source as identity reference.

This is a working production model; no human artistic approval is claimed. Compare facial landmarks, hair shape, shoulders, jacket seams/cuffs/hem, trouser proportions and sneaker wear before commissioning replacement poses. Do not independently regenerate new people for duplicates.

| Asset                                        | Registered canvas / anchor                                                                         |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| CH01/02 walk, CH03 rear, CH04 turn, CH07 run | 1200×1800 RGBA; foot register (600,1680); anchor [0.5,1680/1800]                                   |
| CH03-R/CH04-R reflection                     | Same full-body register; matched frontal/head-turn views from canonical identity                   |
| CH05 close-up                                | 1600×1600 RGBA; one exact file reused for the second portrait                                      |
| CH06 shoe                                    | 1600×900 RGBA; actual sole register y800, anchor [0.5,800/900]                                     |
| Four commuters                               | Anonymous dark silhouette derivatives from a separate supporting figure; no recognizable Ivan face |
| Duplicate outlines                           | Derived from CH03 alpha, not a different illustration                                              |

Duplicates use the exact original character files. Reflection uses matched opposite-camera views, not a flipped rear image. The real head-turn occurs at 398 and its reflection at 406. Walking cels hold12 frames. A single running cel uses directed translation and editing; there is no full rig or interpolated body morph.

## Environments and separation

Six families only: ENV01 aerial city, ENV02 everyday street, ENV03 reflective glass facade, ENV04 corridor, ENV05 terminated road/void, ENV06 pale outside.

Original paintings and clean plates remain in source/. Sharp creates registered2880×1620 image layers, authored SVG alpha masks, twelve facade regions and 54 perspective road fragments. ENV01 has a reconstructed backing behind the nearest towers; ENV02 has a clean backing behind near piers; ENV05 has a road-free void behind detached road pixels.

Actual layer origins are shot-specific. ENV01 uses(-480,-44) to place this new painting's vanishing point near(960,300). ENV02 uses y=-480 to frame the street horizon. Other overscan layers commonly use(-480,-270). Exact dimensions/positions are in production/SHOT_CONFIGURATION.json. The earlier city-style-v01 reference is unused.

Source environment images are generally 1672×941 and are resampled into the processed overscan canvases. Output at 1080p therefore includes upsampling; higher native illustration detail would require replacement art. Related distant backing/highlight layers are consolidated where separate animation is unnecessary. Their resolution against all 53 original briefs is explicit in ASSET_MANIFEST.md.

Glass reflections and Ivan remain separate. The glass-frame alpha occludes reflections while the foreground Ivan renders above it. Road fragments retain original road pixels. The near bollard provides street occlusion. Native SVG provides geometry and masks without replacing illustrated environments.

## Camera, editing and motion

Flat2D handles boot, clock, close-ups, memory and titles. Multiplane2D handles image-depth tracking, street/reflection, routine/duplicate and the outside. True image-plane perspective is confined to SH13/14/17/18.

Every animation uses explicit integer-frame keys or declared cues and deterministic interpolation. No useFrame, CSS animation, wall clock, random shake or physics simulation. Plane textures load through Suspense-aware useLoader; each material remains unlit and preserves alpha.

The first aerial push is zoom1→1.25, pivot(960,300), with depth-specific parallax. SH03 and SH07 share their initial camera and hero layout. SH04 completes exactly one hand rotation. SH06 crosses the path during[480,510), lands by 509, and starts a pavement fracture at 510. The image-plane camera starts at(0,0,1158), fov50; plane size compensates initial depth. Modest keyed plane rotation avoids unacceptable edge-on views; optional camera roll is omitted.

Cuts own their timing and never add frames. Geometry match cuts, local corruption and the internal seam are deliberate. The black punctuation[898,900) is authored. The exit opens inside[1530,1620), followed by the quiet outside shot. The precise montage edit uses measured audio rises while preserving its assigned90 frames.

## Typography and sound

Local Space Grotesk for the title; IBM Plex Mono for system text. TTF files and OFL notices are bundled. Rendering waits for both fonts. System text is attached to events or tracked entities, never floating lyrics or baked into artwork.

Title: IVAN'S ESCAPE during[1722,1779), with a thin red fracture. Final message: IVAN_001 : CONNECTION LOST during[1779,1800). All system warnings disappear before the outside hold.

The supplied MP3 starts at frame 0 and is preserved byte-for-byte. The extra0.630-second source tail measures zero RMS after 60s at the documented precision. There is no time stretching, source regeneration or new music. Supplied section windows guide the edit; measured RMS rises guide memory cuts. Exact vocal phrase onsets remain unverified.

## Review standard

All19 shots are technically implemented and exported. Technical readiness means valid assets, correct timing, deterministic frames, successful decode and working render modes. Human artistic acceptance still covers generated character consistency, painterly finish, emotional rhythm and whether the narrative reads on a first viewing. Do not present technical checks as director approval.
