import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    ignores: [
      "src/projects/style-showreel/assets/gsap.min.js",
      "src/projects/style-showreel-v2/assets/**/*.js",
      "src/projects/twenty-worlds/assets/**/*.js",
      "src/projects/portfolio-film/assets/**/*.js",
    ],
  },
  {
    files: ["src/projects/style-showreel-v2/*.mjs", "src/projects/twenty-worlds/*.mjs", "src/projects/portfolio-film/*.mjs"],
    languageOptions: { globals: { document: "readonly", window: "readonly", Image: "readonly" } },
    // HyperFrames samples its authored timeline; Remotion's hook rule does not apply.
    rules: { "@remotion/non-pure-animation": "off" },
  },
];
