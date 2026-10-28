import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    ignores: [
      "src/projects/style-showreel/assets/gsap.min.js",
      "src/projects/style-showreel-v2/assets/**/*.js",
      "src/projects/twenty-worlds/assets/**/*.js",
      "src/projects/portfolio-film/assets/**/*.js",
      "src/projects/portfolio-designed/assets/**/*.js",
      "src/projects/portfolio-space/assets/**/*.js",
      "src/projects/realme-buds-air8/assets/**/*.js",
      "src/projects/realme-buds-air8-extended/assets/**/*.js",
    ],
  },
  {
    files: ["src/projects/portfolio-space/capture-source-images.mjs"],
    languageOptions: { globals: { process: "readonly", console: "readonly" } },
  },
  {
    files: ["src/projects/style-showreel-v2/*.mjs", "src/projects/twenty-worlds/*.mjs", "src/projects/portfolio-film/*.mjs", "src/projects/portfolio-designed/*.mjs", "src/projects/portfolio-space/*.mjs", "src/projects/realme-buds-air8/*.mjs", "src/projects/realme-buds-air8-extended/*.mjs"],
    languageOptions: { globals: { document: "readonly", window: "readonly", Image: "readonly" } },
    // HyperFrames samples its authored timeline; Remotion's hook rule does not apply.
    rules: { "@remotion/non-pure-animation": "off" },
  },
];
