> PRODUCTION STATUS: Required active-film art has now been created through built-in imagegen and registered locally. The briefs below preserve the preproduction requirements, including their original proposed filenames/statuses. Use [ASSET_MANIFEST.md](ASSET_MANIFEST.md) and [production/ASSET_RESOLUTION.json](production/ASSET_RESOLUTION.json) for current files, consolidation decisions and remaining optional items.

# Detailed per-asset artwork briefs

Every entry below is a requirement, not a claim of completion. No missing asset is filled by unrelated stock or placeholder scenery. Lighting/perspective/canvas instructions are proposals for artist approval consistent with the master. Only Packet 01 is next for review. Character model approval precedes pose production; no character illustration is needed for Shots 01–02.

## IVAN_MODEL — missing-artwork

- **Used by:** Design dependency / code support
- **Destination / output:** references/ivan-model-approved.png; 4096×2048; opaque PNG; local source.
- **Subject / environment:** Single approved Ivan design across front, profile, three-quarter and rear views; neutral expression and clothing detail inset.
- **Camera viewpoint:** Consistent orthographic-like character reference, four views of one person; not four independent interpretations.
- **Composition:** Young adult, slightly unkempt short black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers, understated proportions.
- **Lighting direction:** Neutral soft light, clear colors and seam details; final shot lighting applied consistently in derived art.
- **Perspective / vanishing point:** Same height and anatomy across views; no perspective distortion.
- **Palette:** #C76A4B jacket with muted wear; dark trousers; off-white sneakers. Facial features, skin tone and exact jacket pattern require approval, not invention in later poses.
- **Exclude:** Scenery, texturing presets, armor, accessories, alternative identities, dramatic pose effects and final-film compositing.
- **Layer separation / transparency:** Review sheet only; pose PNGs are separate transparent deliverables after approval.
- **Anchor / registration:** View baselines aligned; guides define consistent head, shoulder, waist and foot landmarks.
- **Depth / parallax:** Not an onscreen film asset.
- **Intended movement:** None; identity reference locks all subsequent illustrations.

## ENV01_SKY — missing-artwork

- **Used by:** SH02, SH17
- **Destination / output:** images/env01-sky.png; 2880×1620; opaque PNG; local source.
- **Subject / environment:** Sky and continuous haze behind the entire city, with reconstructed sky under every removed building.
- **Camera viewpoint:** High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.
- **Composition:** Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Opaque uninterrupted overscan plate.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** -1200 / parallax .08
- **Intended movement:** Exact Packet 01 zoom/parallax plan; no independently drifting architecture.

## ENV01_DISTANT — missing-artwork

- **Used by:** SH02, SH17
- **Destination / output:** images/env01-distant.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Small-scale distant city masses fading into haze; no central-road obstruction.
- **Camera viewpoint:** High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.
- **Composition:** Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA skyline with feathered atmospheric edges.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** -900 / parallax .30
- **Intended movement:** Exact Packet 01 zoom/parallax plan; no independently drifting architecture.

## ENV01_ROAD — missing-artwork

- **Used by:** SH02, SH17
- **Destination / output:** images/env01-road.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Central road network, pavements and aligned lane markings; center seam at source x=1440.
- **Camera viewpoint:** High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.
- **Composition:** Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA ground plane; paint hidden road behind removed masses.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** -600 / parallax 1.00
- **Intended movement:** Exact Packet 01 zoom/parallax plan; no independently drifting architecture.

## ENV01_MID — missing-artwork

- **Used by:** SH02, SH17
- **Destination / output:** images/env01-mid.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Main repeating concrete building masses; align all building bases and perspective to the road.
- **Camera viewpoint:** High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.
- **Composition:** Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA building group, reconstructed behind near buildings.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** -350 / parallax .65
- **Intended movement:** Exact Packet 01 zoom/parallax plan; no independently drifting architecture.

## ENV01_NEAR — missing-artwork

- **Used by:** SH02, SH17
- **Destination / output:** images/env01-near.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Nearest architectural silhouettes framing lower outer margins without covering the road-axis focus.
- **Camera viewpoint:** High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.
- **Composition:** Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA foreground masses; reconstruct hidden edges.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** -100 / parallax 1.10
- **Intended movement:** Exact Packet 01 zoom/parallax plan; no independently drifting architecture.

## ENV01_ROOF — optional-artwork

- **Used by:** SH02, SH17
- **Destination / output:** images/env01-roof.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Sparse near-roof parapets/details, only if necessary for occlusion; omit rather than overdecorate.
- **Camera viewpoint:** High-angle oblique aerial, looking along a single central road; fixed orientation, no top-down orbit.
- **Composition:** Bilateral repeating brutalist city, straight center road widening toward bottom; deep atmospheric recession.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** Final aligned 2880×1620 source: vanishing point (1440,570); visible viewport (480,270,1920,1080) maps VP to (960,300).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Optional RGBA accents aligned to the master plate.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** +50 / parallax 1.20
- **Intended movement:** Exact Packet 01 zoom/parallax plan; no independently drifting architecture.

## ENV02_FAR — missing-artwork

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** images/env02-far.png; 2880×1620; opaque PNG; local source.
- **Subject / environment:** Far atmospheric backing at the street endpoint.
- **Camera viewpoint:** Ground-level street, modest perspective; normal human eye height, not a wide-angle fisheye.
- **Composition:** Symmetrical concrete apartment facades, identical windows, road markings and sidewalks; preserve SH03 layout for SH07.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 aligned source; VP (1440,650), projecting to (960,380) in viewport.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Opaque overscan plate.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** far / factor .15
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV02_DISTANT — missing-artwork

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** images/env02-distant.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Distant buildings and repeated window rhythm.
- **Camera viewpoint:** Ground-level street, modest perspective; normal human eye height, not a wide-angle fisheye.
- **Composition:** Symmetrical concrete apartment facades, identical windows, road markings and sidewalks; preserve SH03 layout for SH07.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 aligned source; VP (1440,650), projecting to (960,380) in viewport.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA distant mass, behind all main facades.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** far-mid / factor .35
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV02_FACADES — missing-artwork

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** images/env02-facades.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Main facades with clear vertical edges and enough detail for one isolated strip displacement.
- **Camera viewpoint:** Ground-level street, modest perspective; normal human eye height, not a wide-angle fisheye.
- **Composition:** Symmetrical concrete apartment facades, identical windows, road markings and sidewalks; preserve SH03 layout for SH07.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 aligned source; VP (1440,650), projecting to (960,380) in viewport.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA architecture, recover behind street objects; keep reusable clean original.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** mid / factor .65
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV02_GROUND — missing-artwork

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** images/env02-ground.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Road, white route line, curb and sidewalk, with painted pavement texture suitable for CH06 close-up.
- **Camera viewpoint:** Ground-level street, modest perspective; normal human eye height, not a wide-angle fisheye.
- **Composition:** Symmetrical concrete apartment facades, identical windows, road markings and sidewalks; preserve SH03 layout for SH07.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 aligned source; VP (1440,650), projecting to (960,380) in viewport.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA ground; provide high-detail road crop from original art, not an upscale.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** ground / factor 1.00
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV02_OBJECTS — missing-artwork

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** images/env02-objects.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** One restrained street object such as a plain concrete bollard; no new narrative prop.
- **Camera viewpoint:** Ground-level street, modest perspective; normal human eye height, not a wide-angle fisheye.
- **Composition:** Symmetrical concrete apartment facades, identical windows, road markings and sidewalks; preserve SH03 layout for SH07.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 aligned source; VP (1440,650), projecting to (960,380) in viewport.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA isolated object; extra objects only if composition needs them.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** near / factor 1.25
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV03_BACKING — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** images/env03-backing.png; 2880×1620; opaque PNG; local source.
- **Subject / environment:** Concrete wall and intact backing under the glass opening.
- **Camera viewpoint:** Street-side concrete/glass facade at a shallow three-quarter angle, enough to read Ivan and his reflected view.
- **Composition:** Large readable glass panel, concrete border and space for Ivan plus background reflected commuters.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 registered canvas; pane corners and reflection homography supplied as artist landmarks; provisional VP (1440,600).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Opaque backing with clean empty glass region.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** back / factor .25
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV03_GLASS — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** images/env03-glass.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Glass tone and surface; absolutely no baked-in Ivan or commuter reflection.
- **Camera viewpoint:** Street-side concrete/glass facade at a shallow three-quarter angle, enough to read Ivan and his reflected view.
- **Composition:** Large readable glass panel, concrete border and space for Ivan plus background reflected commuters.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 registered canvas; pane corners and reflection homography supplied as artist landmarks; provisional VP (1440,600).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA pane surface, independent of reflected figures.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** mid / factor .60
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV03_REFLECTION — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** images/env03-reflection.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Reflected street/environment only; reflection geography must match the actual glass viewpoint.
- **Camera viewpoint:** Street-side concrete/glass facade at a shallow three-quarter angle, enough to read Ivan and his reflected view.
- **Composition:** Large readable glass panel, concrete border and space for Ivan plus background reflected commuters.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 registered canvas; pane corners and reflection homography supplied as artist landmarks; provisional VP (1440,600).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA reflection plate; all people excluded and composited separately.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** reflection / factor .60
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV03_HIGHLIGHTS — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** images/env03-highlights.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Restrained broad specular streaks and glass edge highlights.
- **Camera viewpoint:** Street-side concrete/glass facade at a shallow three-quarter angle, enough to read Ivan and his reflected view.
- **Composition:** Large readable glass panel, concrete border and space for Ivan plus background reflected commuters.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 registered canvas; pane corners and reflection homography supplied as artist landmarks; provisional VP (1440,600).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA, sparse enough to preserve face/silhouette readability.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** front-glass / factor .60
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV03_EDGE — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** images/env03-edge.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** A narrow concrete/window-frame foreground edge for physical occlusion.
- **Camera viewpoint:** Street-side concrete/glass facade at a shallow three-quarter angle, enough to read Ivan and his reflected view.
- **Composition:** Large readable glass panel, concrete border and space for Ivan plus background reflected commuters.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 registered canvas; pane corners and reflection homography supplied as artist landmarks; provisional VP (1440,600).
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA edge, same pane geometry as glass mask.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** near / factor 1.00
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV04_END — missing-artwork

- **Used by:** SH09, SH14, SH17, SH18
- **Destination / output:** images/env04-end.png; 2880×1620; opaque PNG; local source.
- **Subject / environment:** Distant corridor endpoint, reconstructed behind all architecture.
- **Camera viewpoint:** Eye-level oppressive corridor between towering concrete structures, viewed along its long axis.
- **Composition:** Narrow central route with a readable running silhouette; stable architecture left/right and deep end.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570). Vertical architecture edges must remain straight and align to a 12-strip extraction plan.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Opaque backing.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** far / factor .20
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV04_LEFT — missing-artwork

- **Used by:** SH09, SH14, SH17, SH18
- **Destination / output:** images/env04-left.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Left corridor facade, textured concrete with separable large masses.
- **Camera viewpoint:** Eye-level oppressive corridor between towering concrete structures, viewed along its long axis.
- **Composition:** Narrow central route with a readable running silhouette; stable architecture left/right and deep end.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570). Vertical architecture edges must remain straight and align to a 12-strip extraction plan.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA complete left architecture; no baked wires/grid.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** left-mid / factor .75
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV04_RIGHT — missing-artwork

- **Used by:** SH09, SH14, SH17, SH18
- **Destination / output:** images/env04-right.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Right corridor facade from exactly the same painted perspective and light setup.
- **Camera viewpoint:** Eye-level oppressive corridor between towering concrete structures, viewed along its long axis.
- **Composition:** Narrow central route with a readable running silhouette; stable architecture left/right and deep end.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570). Vertical architecture edges must remain straight and align to a 12-strip extraction plan.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA complete right architecture.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** right-mid / factor .75
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV04_GROUND — missing-artwork

- **Used by:** SH09, SH14, SH17, SH18
- **Destination / output:** images/env04-ground.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Ground route and aligned perspective seams.
- **Camera viewpoint:** Eye-level oppressive corridor between towering concrete structures, viewed along its long axis.
- **Composition:** Narrow central route with a readable running silhouette; stable architecture left/right and deep end.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570). Vertical architecture edges must remain straight and align to a 12-strip extraction plan.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA ground with continuous hidden pavement.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** ground / factor 1.00
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV04_DETAIL — missing-artwork

- **Used by:** SH09, SH14, SH17, SH18
- **Destination / output:** images/env04-detail.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Near concrete edge/pillar details, sufficient for structural occlusion.
- **Camera viewpoint:** Eye-level oppressive corridor between towering concrete structures, viewed along its long axis.
- **Composition:** Narrow central route with a readable running silhouette; stable architecture left/right and deep end.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570). Vertical architecture edges must remain straight and align to a 12-strip extraction plan.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA accents, retained as texture source for SH14/17.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** near / factor 1.20
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV05_VOID — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** images/env05-void.png; 2880×1620; opaque PNG; local source.
- **Subject / environment:** Distant void/backing revealed when road or architecture detaches.
- **Camera viewpoint:** Road-axis approach to impossible world boundary; believable perspective until the geometric termination.
- **Composition:** Road toward a clean impossible edge, architecture framing left/right; no fall, debris explosion or new destination.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570); preserve road center across SH10/12/13/14/18.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Opaque backing; no grid baked into color.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** far / factor .10
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV05_ROAD — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** images/env05-road.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Continuous illustrated road and ground before fragmentation, with visible path toward termination.
- **Camera viewpoint:** Road-axis approach to impossible world boundary; believable perspective until the geometric termination.
- **Composition:** Road toward a clean impossible edge, architecture framing left/right; no fall, debris explosion or new destination.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570); preserve road center across SH10/12/13/14/18.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA clean master; high enough detail for a 6×9 region split.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** ground / factor 1.00
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV05_LEFT — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** images/env05-left.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Left boundary architecture that can move away as a complete image plane.
- **Camera viewpoint:** Road-axis approach to impossible world boundary; believable perspective until the geometric termination.
- **Composition:** Road toward a clean impossible edge, architecture framing left/right; no fall, debris explosion or new destination.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570); preserve road center across SH10/12/13/14/18.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA separable left mass.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** mid-left / factor .75
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV05_RIGHT — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** images/env05-right.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Right boundary architecture, paired to left geometry and lighting.
- **Camera viewpoint:** Road-axis approach to impossible world boundary; believable perspective until the geometric termination.
- **Composition:** Road toward a clean impossible edge, architecture framing left/right; no fall, debris explosion or new destination.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570); preserve road center across SH10/12/13/14/18.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA separable right mass.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** mid-right / factor .75
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV05_STRUCTURES — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** images/env05-structures.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Geometric termination structures, individually extractable and fully painted behind occluding parts.
- **Camera viewpoint:** Road-axis approach to impossible world boundary; believable perspective until the geometric termination.
- **Composition:** Road toward a clean impossible edge, architecture framing left/right; no fall, debris explosion or new destination.
- **Lighting direction:** Soft overcast upper-left key; shadow planes toward lower-right; maintain identical light direction across registered layers.
- **Perspective / vanishing point:** 2880×1620 master, VP (1440,570); preserve road center across SH10/12/13/14/18.
- **Palette:** #0B1018 / #172330 / #586A79 / #B5C3C9 / #E6E9E6; anomaly red belongs to code overlays, not painted scenery
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA structure atlas plus registered positions; no colored primitive replacements.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** near / factor 1.10
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV06_SKY — missing-artwork

- **Used by:** SH18, SH19
- **Destination / output:** images/env06-sky.png; 2880×1620; opaque PNG; local source.
- **Subject / environment:** Continuous pale sky and soft atmospheric illumination.
- **Camera viewpoint:** Very wide, quiet, level view of an enormous empty natural-looking landscape; no new story objects.
- **Composition:** Broad negative space and pale atmosphere; small rear Ivan emphasizes openness.
- **Lighting direction:** Soft pale diffuse illumination; gentle contact shadows; no hard simulated-world contrast.
- **Perspective / vanishing point:** 2880×1620 aligned canvas; horizon around source y=600, corresponding to viewport y=330; no distorted horizon.
- **Palette:** #D5CEC1 / #E6E9E6 with low-contrast #B5C3C9 atmosphere
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** Opaque overscan plate.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** far / factor .05
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV06_HORIZON — missing-artwork

- **Used by:** SH18, SH19
- **Destination / output:** images/env06-horizon.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Very distant soft horizon, natural-looking without a recognizable new landmark.
- **Camera viewpoint:** Very wide, quiet, level view of an enormous empty natural-looking landscape; no new story objects.
- **Composition:** Broad negative space and pale atmosphere; small rear Ivan emphasizes openness.
- **Lighting direction:** Soft pale diffuse illumination; gentle contact shadows; no hard simulated-world contrast.
- **Perspective / vanishing point:** 2880×1620 aligned canvas; horizon around source y=600, corresponding to viewport y=330; no distorted horizon.
- **Palette:** #D5CEC1 / #E6E9E6 with low-contrast #B5C3C9 atmosphere
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA horizon strip.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** far-mid / factor .20
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV06_GROUND — missing-artwork

- **Used by:** SH18, SH19
- **Destination / output:** images/env06-ground.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Quiet open ground extending through the frame; no road-code graphics.
- **Camera viewpoint:** Very wide, quiet, level view of an enormous empty natural-looking landscape; no new story objects.
- **Composition:** Broad negative space and pale atmosphere; small rear Ivan emphasizes openness.
- **Lighting direction:** Soft pale diffuse illumination; gentle contact shadows; no hard simulated-world contrast.
- **Perspective / vanishing point:** 2880×1620 aligned canvas; horizon around source y=600, corresponding to viewport y=330; no distorted horizon.
- **Palette:** #D5CEC1 / #E6E9E6 with low-contrast #B5C3C9 atmosphere
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA terrain, filled under character.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** ground / factor 1.00
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## ENV06_ATMOSPHERE — missing-artwork

- **Used by:** SH18, SH19
- **Destination / output:** images/env06-atmosphere.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Very subtle diffuse haze, separable for restrained movement only.
- **Camera viewpoint:** Very wide, quiet, level view of an enormous empty natural-looking landscape; no new story objects.
- **Composition:** Broad negative space and pale atmosphere; small rear Ivan emphasizes openness.
- **Lighting direction:** Soft pale diffuse illumination; gentle contact shadows; no hard simulated-world contrast.
- **Perspective / vanishing point:** 2880×1620 aligned canvas; horizon around source y=600, corresponding to viewport y=330; no distorted horizon.
- **Palette:** #D5CEC1 / #E6E9E6 with low-contrast #B5C3C9 atmosphere
- **Exclude:** Ivan, commuters, text, reticles, warnings, neon advertisements, glitches, code grids, fracture effects, random particles and watermarks.
- **Layer separation / transparency:** RGBA soft atmosphere, no decorative particle field.
- **Anchor / registration:** Top-left [0,0]; complete source remains registered at x=-480,y=-270 in 1920×1080 space.
- **Depth / parallax:** front / factor .25
- **Intended movement:** Directed shot-specific movement only; no baked motion blur or autonomous animation.

## CH01 — missing-artwork

- **Used by:** SH03, SH07, SH08, SH15
- **Destination / output:** images/ch01.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Walking profile A: one support leg planted, quiet purposeful stride.
- **Camera viewpoint:** Full body profile; source walk direction screen-right; feet baseline y=1680.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH02 — missing-artwork

- **Used by:** SH03, SH07, SH08, SH15
- **Destination / output:** images/ch02.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Walking profile B: complementary leg support, same body size/jacket/hair.
- **Camera viewpoint:** Same orthogonal profile, facing, head height and baseline as CH01.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH03 — missing-artwork

- **Used by:** SH05, SH07, SH10, SH12, SH13, SH14, SH15, SH16, SH18, SH19
- **Destination / output:** images/ch03.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Standing rear Ivan, reserved posture, suitable for foreground and distant silhouette.
- **Camera viewpoint:** Full rear view; no face newly invented; baseline y=1680.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH04 — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** images/ch04.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Ivan turning in a three-quarter head/upper-body pose.
- **Camera viewpoint:** Full-body canvas registered to CH03 turning stance; avoid stretching limbs or changing jacket.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH05 — missing-artwork

- **Used by:** SH11, SH15
- **Destination / output:** images/ch05.png; 1600×1600; transparent RGBA PNG; local source.
- **Subject / environment:** Frontal close-up, reserved face; duplicate must reuse this exact image.
- **Camera viewpoint:** Head and shoulders; both eyes readable; approved identity only.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.5], face center (800,800); eye-line guide around y=600.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH06 — missing-artwork

- **Used by:** SH06
- **Destination / output:** images/ch06.png; 1600×900; transparent RGBA PNG; local source.
- **Subject / environment:** Close-up worn off-white sneaker and lower dark trouser leg crossing a white path.
- **Camera viewpoint:** Low close-up with clean sole silhouette; no pavement or line baked in.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.8], sole baseline y=720 on 1600×900 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH07 — missing-artwork

- **Used by:** SH09, SH10
- **Destination / output:** images/ch07.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Running side-view Ivan, deliberate forward lean; no superhero gesture.
- **Camera viewpoint:** Full body profile in the same screen-right direction as walk poses.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH03-R — missing-artwork

- **Used by:** SH05
- **Destination / output:** images/ch03-r.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Matched reflection view for CH03 from the approved Ivan model.
- **Camera viewpoint:** Mirror-camera view, physically consistent with glass; not a new character or a naive flipped rear view.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CH04-R — missing-artwork

- **Used by:** SH05
- **Destination / output:** images/ch04-r.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Matched turned reflection view, responding 8 frames after CH04.
- **Camera viewpoint:** Same mirror-camera setup as CH03-R; align feet/head/turn registration.
- **Composition:** Young adult man; short slightly unkempt black hair, faded burnt-orange jacket, dark trousers, worn off-white sneakers; realistic stylized proportions. Identity sheet approval precedes every pose.
- **Lighting direction:** Soft upper-left key and restrained lower-right shadow; do not bake a ground shadow into character alpha. Reflection plates inherit reflected lighting geometry.
- **Perspective / vanishing point:** Match the approved model sheet and assigned environment camera. No changes of anatomy, face, clothing, handedness or lens exaggeration between poses.
- **Palette:** #C76A4B jacket; muted dark trousers; off-white sneakers; neutral skin colors require model-sheet approval.
- **Exclude:** Background, pavement, scenery, type, UI, armor, accessories, identity variations and watermark.
- **Layer separation / transparency:** RGBA PNG with clean unpremultiplied-looking edges; retain hair/cloth alpha. Contact shadows are separate masks/compositing data.
- **Anchor / registration:** [0.5,0.9333333333], grounded registration (600,1680) on 1200×1800 canvas.
- **Depth / parallax:** Assigned per shot, never inferred from filename; duplicates reuse exact source bytes.
- **Intended movement:** Pose holds/cuts and short keyed placement changes; no morphing or unapproved rigging.

## CROWD_1 — missing-artwork

- **Used by:** SH03, SH05
- **Destination / output:** images/commuter-1.png; 600×1200; transparent RGBA PNG; local source.
- **Subject / environment:** Anonymous subdued commuter silhouette 1; no distinct secondary identity.
- **Camera viewpoint:** Ground-level profile matching ENV02; usable in independently moving distant layers.
- **Composition:** Simple believable adult proportions and understated clothing. Four readable but subordinate silhouettes; no orange jacket matching Ivan.
- **Lighting direction:** Same overcast upper-left as ENV02; reduce contrast for depth.
- **Perspective / vanishing point:** Match street eye height and baseline; reflection placement follows ENV03 pane geometry.
- **Palette:** Desaturated #172330/#586A79; no anomaly red.
- **Exclude:** Face detail, distinctive props, names, futuristic costumes, background and baked shadows.
- **Layer separation / transparency:** Individual RGBA figures, not one baked crowd plate.
- **Anchor / registration:** [0.5,0.95], foot registration (300,1140).
- **Depth / parallax:** Behind hero, different regular paths; never obscure key reflection anomaly.
- **Intended movement:** Simple perfectly regular translations; no new character animation system.

## CROWD_2 — missing-artwork

- **Used by:** SH03, SH05
- **Destination / output:** images/commuter-2.png; 600×1200; transparent RGBA PNG; local source.
- **Subject / environment:** Anonymous subdued commuter silhouette 2; no distinct secondary identity.
- **Camera viewpoint:** Ground-level profile matching ENV02; usable in independently moving distant layers.
- **Composition:** Simple believable adult proportions and understated clothing. Four readable but subordinate silhouettes; no orange jacket matching Ivan.
- **Lighting direction:** Same overcast upper-left as ENV02; reduce contrast for depth.
- **Perspective / vanishing point:** Match street eye height and baseline; reflection placement follows ENV03 pane geometry.
- **Palette:** Desaturated #172330/#586A79; no anomaly red.
- **Exclude:** Face detail, distinctive props, names, futuristic costumes, background and baked shadows.
- **Layer separation / transparency:** Individual RGBA figures, not one baked crowd plate.
- **Anchor / registration:** [0.5,0.95], foot registration (300,1140).
- **Depth / parallax:** Behind hero, different regular paths; never obscure key reflection anomaly.
- **Intended movement:** Simple perfectly regular translations; no new character animation system.

## CROWD_3 — missing-artwork

- **Used by:** SH03, SH05
- **Destination / output:** images/commuter-3.png; 600×1200; transparent RGBA PNG; local source.
- **Subject / environment:** Anonymous subdued commuter silhouette 3; no distinct secondary identity.
- **Camera viewpoint:** Ground-level profile matching ENV02; usable in independently moving distant layers.
- **Composition:** Simple believable adult proportions and understated clothing. Four readable but subordinate silhouettes; no orange jacket matching Ivan.
- **Lighting direction:** Same overcast upper-left as ENV02; reduce contrast for depth.
- **Perspective / vanishing point:** Match street eye height and baseline; reflection placement follows ENV03 pane geometry.
- **Palette:** Desaturated #172330/#586A79; no anomaly red.
- **Exclude:** Face detail, distinctive props, names, futuristic costumes, background and baked shadows.
- **Layer separation / transparency:** Individual RGBA figures, not one baked crowd plate.
- **Anchor / registration:** [0.5,0.95], foot registration (300,1140).
- **Depth / parallax:** Behind hero, different regular paths; never obscure key reflection anomaly.
- **Intended movement:** Simple perfectly regular translations; no new character animation system.

## CROWD_4 — missing-artwork

- **Used by:** SH03, SH05
- **Destination / output:** images/commuter-4.png; 600×1200; transparent RGBA PNG; local source.
- **Subject / environment:** Anonymous subdued commuter silhouette 4; no distinct secondary identity.
- **Camera viewpoint:** Ground-level profile matching ENV02; usable in independently moving distant layers.
- **Composition:** Simple believable adult proportions and understated clothing. Four readable but subordinate silhouettes; no orange jacket matching Ivan.
- **Lighting direction:** Same overcast upper-left as ENV02; reduce contrast for depth.
- **Perspective / vanishing point:** Match street eye height and baseline; reflection placement follows ENV03 pane geometry.
- **Palette:** Desaturated #172330/#586A79; no anomaly red.
- **Exclude:** Face detail, distinctive props, names, futuristic costumes, background and baked shadows.
- **Layer separation / transparency:** Individual RGBA figures, not one baked crowd plate.
- **Anchor / registration:** [0.5,0.95], foot registration (300,1140).
- **Depth / parallax:** Behind hero, different regular paths; never obscure key reflection anomaly.
- **Intended movement:** Simple perfectly regular translations; no new character animation system.

## MSK03_GLASS — missing-artwork

- **Used by:** SH05, SH15
- **Destination / output:** masks/msk03_glass.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Glass-pane matte tracing all mullions and concrete occluders.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Artist trace from final GLASS/EDGE layers; alpha white/opaque inside reflective opening, transparent outside.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK06_PATH — planned-code

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** masks/msk06_path.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Foot-crossing/route boundary matte registered to approved road line.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Native SVG path from artist-supplied road landmarks; export alpha only if image masking is needed.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK08_STRIP — planned-code

- **Used by:** SH03, SH06, SH07, SH08, SH15
- **Destination / output:** masks/msk08_strip.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** One facade strip selection, keeping the rest of the street intact.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Rectangular source-region crop from final FACADES; no new painted damage.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK09_STRIPS — planned-code

- **Used by:** SH09, SH14, SH17, SH18
- **Destination / output:** masks/msk09_strips.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Twelve vertical image-region selections across approved corridor facades.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Twelve registered rectangular crops; preserve source pixels and underlying clean backing.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK10_ROAD — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** masks/msk10_road.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Controlled road separation regions without implying that Ivan falls.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Artist traces 3–5 motivated fracture boundaries in road perspective; clean-road source remains untouched.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK13_TILES — planned-code

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** masks/msk13_tiles.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** 6 rows × 9 columns, fifty-four road image regions.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Deterministic source crops plus road alpha intersection; no random fracture artwork or colored replacement tiles.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK14_FRACTURE — missing-artwork

- **Used by:** SH10, SH12, SH13, SH14, SH17, SH18
- **Destination / output:** masks/msk14_fracture.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Separable left/right architectural silhouette masks around a pale central opening.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Trace final architecture edges; irregularity restrained and tied to concrete planes, not an electrical bolt.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## MSK18_SEAM — planned-code

- **Used by:** SH18, SH19
- **Destination / output:** masks/msk18_seam.png; 2880×1620; transparent RGBA PNG; local source.
- **Subject / environment:** Vertical central world-boundary reveal; outside layer opens to fill frame.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Native SVG/geometric seam, expanding on explicit cues; reuse approved MSK14 edge profile where needed.
- **Anchor / registration:** Top-left [0,0], identical full canvas as parent.
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

## DERIVED_IVAN_OUTLINE — planned-code

- **Used by:** SH05, SH07, SH10, SH12, SH13, SH14, SH15, SH16, SH18, SH19
- **Destination / output:** masks/derived_ivan_outline.png; 1200×1800; transparent RGBA PNG; local source.
- **Subject / environment:** Exact source-alpha-derived outline for duplicate field.
- **Camera viewpoint:** Exactly the camera and registration of the parent artwork; this is a matte/region map, not a separate painting.
- **Composition:** Preserve intended subject occlusion and all source alignment landmarks.
- **Lighting direction:** None: masks contain coverage values, never painted lighting.
- **Perspective / vanishing point:** Inherit parent perspective and vanishing point with zero offset.
- **Palette:** 2D alpha matte; for a Three.js alpha-map export opaque grayscale RGB separately, since Three.js reads the green channel.
- **Exclude:** Color scenery, baked characters, type, decorative noise and random edges.
- **Layer separation / transparency:** Derive from approved CH03 alpha; no redraw, no new identity or body proportions.
- **Anchor / registration:** Same CH03 pivot [0.5,0.9333333333].
- **Depth / parallax:** Inherits parent; mask itself is not an independently visible object.
- **Intended movement:** Coverage follows declared local cue frames only. planned-code entries do not require separate AI artwork.

No production text is painted into an image. The film's title, warnings, grids, clock and reticles are authored in code. planned-code mask paths are specifications, not extra missing paintings; generate them only from approved geometry/source alpha.
