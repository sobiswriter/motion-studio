# Beyond the Frame / Motion Studio

Music: **The Golden Hour Rise**, supplied by the user in `assets/Music/The_Golden_Hour_Rise.mp3`. A 60-second arrangement of that track is used; source intervals, crossfades and gain are retained in music-edit.json. No replacement music was generated. Ivan Is Loading is excluded. The supplied track's authorship and distribution license were not supplied or independently verified; preserve the user's music rights when publishing.

Recorded effects sourced through Openverse:

- **MECH-KEYBOARD-01.wav**, newagesoup, CC0 1.0. [Source](https://freesound.org/people/newagesoup/sounds/348239/).
- **Page Turn — Please Turn Over (PTO) — paper_turn_over.wav**, flag2, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). [Source](https://freesound.org/people/flag2/sounds/63318/). Trimmed, filtered and mixed. Credit flag2 and retain the license/source link when publishing.
- **Wood Knock**, Mrguff, CC0 1.0. [Source](https://freesound.org/people/Mrguff/sounds/369710/). Earshot finds a strong wood-knock match (z +3.7); the proposed 11 ms trim cut the attack, so the used slice starts at the beginning and retains its decay.

Designed effects: selected takes from the existing **earshot 0.4.0 launch kit**, plus 18 newly rendered material accents from the installed `forge_v2r6+forge04r1+fit1+pluck1` bank. These are procedural effects, not recordings or a new music bed. Exact recipes, seeds and measurements remain in assets/audio/effects/source-kit.lock.json and material-accents.json. Real SFX 2026-10 pinned studio installation handles placement, headroom and the single final effects mix. Source attribution records are retained in audio-provenance.json and the workspace Openverse manifest.

Visual design, M geometry, choreography, canvas illustration and editable animation source authored for this project. Three.js 0.186.1, MIT, license in assets/vendor/LICENSE-three.txt. GSAP 3.14.2, standard license in the vendored distribution header.

Fonts: Space Grotesk, IBM Plex Mono and EB Garamond, SIL Open Font License. Font files and OFL texts are bundled in assets/fonts. Font loading is explicit before canvas rendering.
