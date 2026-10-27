# First 18 seconds — written animatic plan

Proposed only; not an animatic export. There are 13 shots /12 internal cuts in[0,540), with intro180 and chorus540 fixed. Complete fields: EDITORIAL_SHOTLIST.md. Exact local camera keys and scene coordinates: PILOT_LAYOUT.json.

| Cut                          | Exclusive frames | Seconds       | Framing  | Source requirements                                               |
| ---------------------------- | ---------------- | ------------- | -------- | ----------------------------------------------------------------- |
| C01 Identifier / eye         | [0,22)           | 0.000–0.733   | insert   | EYE, GRAPHICS                                                     |
| C02 The assigned place       | [22,73)          | 0.733–2.433   | wide     | HERO, ENV_STREET, FOREGROUND, ATMOSPHERE, SHADOWS                 |
| C03 Scheduled footfall       | [73,96)          | 2.433–3.200   | insert   | SHOE, ENV_STREET, GRAPHICS, SHADOWS                               |
| C04 Identity assigned        | [96,138)         | 3.200–4.600   | medium   | HERO, ENV_STREET, ATMOSPHERE, GRAPHICS                            |
| C05 World handed over        | [138,180)        | 4.600–6.000   | wide     | REAR, ENV_STREET, FOREGROUND, ATMOSPHERE                          |
| C06 Programmed stride        | [180,225)        | 6.000–7.500   | medium   | WALK, ENV_STREET, FOREGROUND, ATMOSPHERE, SHADOWS                 |
| C07 Mechanical time          | [225,270)        | 7.500–9.000   | insert   | GRAPHICS, ENV_GLASS, HERO                                         |
| C08 Everyone moves correctly | [270,309)        | 9.000–10.300  | wide     | REAR, ENV_STREET, FOREGROUND, ATMOSPHERE                          |
| C09 Reflection agrees        | [309,341)        | 10.300–11.367 | medium   | LOOKBACK, REFLECTION, ENV_GLASS, ATMOSPHERE, PILOT_MASKS, SHADOWS |
| C10 The lag                  | [341,390)        | 11.367–13.000 | close-up | LOOKBACK, REFLECTION, ENV_GLASS, PILOT_MASKS, GRAPHICS            |
| C11 Tension becomes choice   | [390,430)        | 13.000–14.333 | insert   | HAND, ENV_GLASS, ATMOSPHERE                                       |
| C12 Look against the flow    | [430,480)        | 14.333–16.000 | medium   | LOOKBACK, ENV_STREET, FOREGROUND, ATMOSPHERE, GRAPHICS            |
| C13 First disobedience       | [480,540)        | 16.000–18.000 | insert   | SHOE, ENV_STREET, GRAPHICS, PILOT_MASKS, SHADOWS                  |

## Narrative construction

Eye→hero→scheduled footfall→face→deep street establishes a person before routine. Walk→clock→repetition→correct reflection establishes a rule. Lag→hand tension→look-back→crossing breaks it. Replacement then repeats C06's exact source/framing.

Selected measured RMS rises support22/73/309/341/430. Weaker timings remain authored holds. These are not confirmed beats or vocal onsets. Real turn 360/local 19, reflection368/local 27. Foot lands509 and fracture begins510.

## Dependency order

1. Preserve AUDIO and FONTS, already present. Reuse clock/label/reticle implementations after composition approval.
2. Approve MODEL front/side/rear, face/wardrobe and registration. This unlocks HERO, EYE, SHOE and REAR.
3. Paint ENV_STREET, FOREGROUND and ATMOSPHERE with fixed VP, scale, cold slot light and hidden backing.
4. Review C01–C05 static compositions against FIRST_06_SECONDS_BRIEFS.md before expanding the art set.
5. Complete WALK4, LOOKBACK2, REFLECTION2 and HAND2. Reflection also depends on approved ENV_GLASS geometry.
6. Prepare glass parent clip, scenery wipe, route/fracture and contact mattes. These are code/alpha geometry around approved art.
7. Only after review: implement the 13 shots, test one 51-frame C02 hero shot, inspect stills/alpha, then preview the pilot. No automatic full-film rewrite.

These are future production steps, not implementation authorization during this pass. No first 18 dependency pulls in later RUN/LEAP/CORRIDOR/BOUNDARY or optional salvage.

## Precise blockers

New first-six-second sources: MODEL, HERO, EYE, SHOE, REAR, ENV_STREET, FOREGROUND, ATMOSPHERE. For the rest of the pilot add WALK, LOOKBACK, REFLECTION, HAND and ENV_GLASS. All are missing in the proposed illustrated finish, even where photographic working counterparts exist.

Code graphics are GRAPHICS, SHADOWS and PILOT_MASKS; font/audio files already exist. No primitive or stock substitute is proposed.

## Conditional hero demonstration

No suitable illustrated hero source is documented as approved. Existing20 generated sources are photographic-painterly and the prior report explicitly withheld artistic approval. Therefore no short hero demonstration is built now.

The first future test is C02 [22,73),51 frames: approved HERO body/forelock/hem/front panel; street backing/middle/ground; near pier; haze; same music. It reuses Camera2D/ParallaxScene, CharacterCel and a project-only React container. No engine rebuild or new package.
