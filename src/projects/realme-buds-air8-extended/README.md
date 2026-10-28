# Make it real — extended film

Two-minute **1920×1080 / 60fps** product concept for **realme Buds Air8, Master Grey**. Six genuine photographic assets plus the authentic official realme wordmark, 16 chapters, seven transition families and the supplied **Architects of Motion** soundtrack. The original 45-second film is retained separately and unchanged.

From the repository root:

```sh
npm run buds:extended:sound
npm run buds:extended:build
npm run buds:extended:check
npm run buds:extended:preview
npm run buds:extended:render
```

Preview: http://localhost:3030/#project/realme-buds-air8-extended . Final target: `out/realme-buds-air8-extended/realme-Buds-Air8-Make-It-Real-Architects-of-Motion.mp4`.

The local product/music/font/effect assets must be present, as with the other studio productions. Assets and exports remain Git-ignored. Original photographs and official qualification panels are preserved in `assets/Products/realme-buds-air8/`; original and extended source manifests retain URLs, dimensions and SHA-256 hashes. No cloud generation or fake product geometry is used.

Edit the integer frame timeline in `sequence.mjs`; new chapters in `scenes.mjs` and `detail-scenes.mjs`; stable particle destinations and graphic helpers in `kit.mjs`; full-scene handoffs in `transitions.mjs`. `product-scenes.mjs` is the locally copied product-art foundation from the short cut. The central engine and old project are not imported or changed. Rebuild after edits.

The extra chapters cover design, LHDC/Hi-Res, six microphones, spatial/dynamic audio, Gaming Mode, Bluetooth and app-assisted translation. The 14-to-58-hour battery handoff explains the charging case through an internal covering wipe. Manufacturer conditions stay visible; see [FACTS.md](FACTS.md).

Apply assets/audio/master.wav once at time zero, volume 1. Its 46 effects are already included; separate pre-bus music/effects stems are for editing. See [AUDIO.md](AUDIO.md), [credits](CREDITS.md), [blueprint](project.md), [review](REVIEW.md) and delivery-check.json for evidence and limitations.

Reuse the existing proof helpers with the explicit project argument:

```sh
node scripts/proof-portfolio-designed.mjs .cache/realme-buds-air8-extended/proof "" src/projects/realme-buds-air8-extended
node scripts/review-buds-air8.mjs out/realme-buds-air8-extended/realme-Buds-Air8-Make-It-Real-Architects-of-Motion.mp4 .cache/realme-buds-air8-extended/encoded src/projects/realme-buds-air8-extended
```

Native canvas/backward sampling and decoded-video comparisons assess pixel motion. DOM-only craft inspection cannot measure animation painted inside one canvas; do not suppress such warnings using false hold annotations.

Latest revision: realme yellow from frame0, REF-20 wordmark assembly and rising curtain, official “Make it real.” copy in opening/closing, and Architects of Motion source0–120s. The prior extended export is retained separately.
