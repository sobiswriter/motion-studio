# Ivan's Escape — Visual Redirection / Production Pass 01

**Review milestone only.** Prepared 24 October 2026 from the locally supplied reference and existing Motion Studio. No replacement art, revised animation or new film export was created. The current engine, 19-shot source and existing MP4s are preserved; this packet proposes a separate revision.

## Start review here

| Document                                                      | Purpose                                                                                                                          |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Reference analysis](REFERENCE_ANALYSIS.md)                   | Timestamp-grounded observations across all five requested reference windows; original Ivan applications and copyright exclusions |
| [Illustrated visual bible](VISUAL_BIBLE.md)                   | Drawing, identity, cool→crimson→warm progression, performance, scale and editorial language                                      |
| [First 18-second plan](FIRST_18_SECONDS.md)                   | 13 proposed pilot shots with dependencies and review order                                                                       |
| [First-six-second artwork briefs](FIRST_06_SECONDS_BRIEFS.md) | Exact source dimensions, view/expression/light, exclusions, alpha pieces, anchors and first-five-cut staging                     |
| [Layer/camera specification](LAYER_CAMERA_SPEC.md)            | Existing component mapping, part grouping, glass clip, scenery wipe, foot crossing and later justified 3D                        |
| [Prioritized requirements](ASSET_REQUIREMENTS.md)             | New art, reuse, required separation and code graphics; explicit source paths and blockers                                        |
| [Full editorial shot list](EDITORIAL_SHOTLIST.md)             | All 40 proposed shots, with every requested field                                                                                |
| [Numeric pilot layout](PILOT_LAYOUT.json)                     | Proposed local camera keys, group coordinates, pose cues and wipe coverage; deliberately not runtime input                       |
| [Editorial manifest](EDITORIAL_MANIFEST.json)                 | Machine-readable contiguous 1800-frame proposal and cue confidence                                                               |
| [Asset manifest](ASSET_MANIFEST.json)                         | Requirement dependencies, native deliverables, priorities and approval status                                                    |
| [Verification](VERIFICATION.json)                             | Planning checks and hashes showing current implementation/exports unchanged                                                      |

## Proposed edit

40 shots / 39 internal cuts, still 60 seconds at 30 fps and 1920×1080. Sections remain Intro[0,180), Verse[180,540), Chorus[540,1260), Instrumental[1260,1620), Outro[1620,1800). Title1722 and final message 1779 remain.

Counts by section:5/8/16/8/3. First 18 seconds contain 13 shots. Cuts follow selected nearby measured 20ms RMS rises or explicit performance holds; no exact vocal synchronization is claimed. The system's control is expressed through silhouettes, repetition and strict movement; awakening breaks that order; escape uses new action drawings and purposeful depth; outside is quiet and warm.

## What is missing

No approved source matches the new illustrated hero direction. First-six-second blocking groups: MODEL, HERO, EYE, SHOE, REAR, ENV_STREET, FOREGROUND and ATMOSPHERE. First 18 seconds additionally need WALK, LOOKBACK, REFLECTION, HAND and ENV_GLASS. The detailed manifests identify every deliverable, including native pavement detail and physically matched reflection views.

Original audio/local fonts are ready. Labels, clock, reticles, masks, contact mattes and title are code. Existing outside art is a conditional reuse candidate. Old glass/city may be salvaged only after separation/style approval, never silently treated as new illustrated art.

The conditional hero demo is not made because suitable art is not documented as approved. Its concrete future test is C02's 51-frame layered hero shot. No low-poly scenery or placeholder film is substituted.

## Review decisions

Review the original MODEL identity/drawing style; C01–C05 silhouette/framing/light;13-shot pilot cadence; the glass lag/grounded crossing; and whether proposed native asset dimensions/part separation meet the intended production quality. Then approve a limited source-art packet and the short hero composition before implementation. No full-film rewrite starts from completion of these documents.

The new direction supersedes the earlier19-shot restriction for **proposals only**. Old master/source/render files remain archival authority for story and identity; the latest user redirection governs the proposed editorial language and this stopping point. No generic-engine or dependency change is required.

## Verification and study limits

Run `npm run compile:tools`, then `node .cache/scripts/verify-ivans-redirection.js`. This checks timing, all required cut fields, dependencies, camera key ranges, signal evidence, 8f reflection gap, proposed wipe geometry and protected source/export hashes. It does not pretend absent art has passed visual or render validation.

57 local reference samples were inspected; one isolated H.264 seek warning is recorded in SOURCE_AUDIT.json. Private reference sheets stay under .cache/redirection-reference and are not distributed as Ivan artwork. Original reference implementation and exact vocal onsets remain unverified.
