import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import sharp from "sharp";
import type { AssetManifest } from "../src/engine/types";

const root = "public/projects/ivans-escape";
const W = 2880,
  H = 1620;
const assets: AssetManifest = {};
const register = async (id: string, file: string, alpha: boolean) => {
  const meta = await sharp(`${root}/${file}`).metadata();
  assert.equal(Boolean(meta.hasAlpha), alpha, `${id}: alpha`);
  assets[id] = {
    id,
    src: `projects/ivans-escape/${file}`,
    kind: "image",
    width: meta.width!,
    height: meta.height!,
    alpha,
  };
};
const svg = (content: string) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 1 1" preserveAspectRatio="none">${content}</svg>`,
  );
const polygon = (points: number[][]) =>
  `<polygon points="${points.map((p) => p.join(",")).join(" ")}" fill="white"/>`;
const rect = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="white"/>`;
const paints = new Map<string, Buffer>();
const part = async (id: string, source: string, shape: string) => {
  const mask = svg(shape);
  await writeFile(`${root}/masks/${id}.svg`, mask);
  await sharp(paints.get(source)!)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(`${root}/images/${id}.png`);
  await register(id, `images/${id}.png`, true);
};

async function main() {
  await Promise.all([
    mkdir(`${root}/images`, { recursive: true }),
    mkdir(`${root}/masks`, { recursive: true }),
  ]);
  const sources = [
    "env01-city",
    "env01-clean",
    "env02-street",
    "env02-clean",
    "env03-glass",
    "env04-corridor",
    "env05-boundary",
    "env05-void",
    "env06-outside",
  ];
  for (const source of sources) {
    const buffer = await sharp(`${root}/source/${source}.png`)
      .resize(W, H, { fit: "fill" })
      .removeAlpha()
      .png()
      .toBuffer();
    paints.set(source, buffer);
    await writeFile(`${root}/images/${source}.png`, buffer);
    await register(source, `images/${source}.png`, false);
  }
  await part("city-sky", "env01-clean", rect(0, 0, 1, 0.24));
  await part("city-distant", "env01-clean", rect(0, 0.18, 1, 0.22));
  await part(
    "city-road",
    "env01-city",
    polygon([
      [0.5, 0.23],
      [0.535, 0.23],
      [0.77, 1],
      [0.23, 1],
    ]),
  );
  await part(
    "city-mid",
    "env01-city",
    polygon([
      [0.24, 0.3],
      [0.39, 0.22],
      [0.44, 0.26],
      [0.35, 0.65],
      [0.25, 0.83],
    ]) +
      polygon([
        [0.76, 0.3],
        [0.61, 0.22],
        [0.56, 0.26],
        [0.65, 0.65],
        [0.75, 0.83],
      ]),
  );
  await part(
    "city-near",
    "env01-city",
    polygon([
      [0, 0.32],
      [0.055, 0.32],
      [0.055, 0.2],
      [0.117, 0.2],
      [0.117, 0.29],
      [0.247, 0.3],
      [0.255, 0.88],
      [0, 1],
    ]) +
      polygon([
        [1, 0.32],
        [0.945, 0.32],
        [0.945, 0.2],
        [0.883, 0.2],
        [0.883, 0.29],
        [0.753, 0.3],
        [0.745, 0.88],
        [1, 1],
      ]),
  );
  await part(
    "street-ground",
    "env02-street",
    polygon([
      [0, 0.67],
      [0.5, 0.535],
      [1, 0.67],
      [1, 1],
      [0, 1],
    ]),
  );
  await part(
    "street-near",
    "env02-street",
    rect(0, 0, 0.18, 0.59) + rect(0.82, 0, 0.18, 0.59),
  );
  await part("street-strip", "env02-street", rect(0.25, 0.04, 0.045, 0.65));
  await part(
    "glass-frame",
    "env03-glass",
    rect(0, 0, 1, 0.075) +
      rect(0, 0.744, 1, 0.256) +
      rect(0, 0, 0.166, 1) +
      rect(0.833, 0, 0.167, 1),
  );
  await part(
    "corridor-left",
    "env04-corridor",
    polygon([
      [0, 0],
      [0.4, 0],
      [0.424, 0.605],
      [0, 0.755],
    ]),
  );
  await part(
    "corridor-right",
    "env04-corridor",
    polygon([
      [1, 0],
      [0.6, 0],
      [0.576, 0.605],
      [1, 0.755],
    ]),
  );
  await part(
    "corridor-ground",
    "env04-corridor",
    polygon([
      [0.424, 0.605],
      [0.576, 0.605],
      [1, 0.755],
      [1, 1],
      [0, 1],
      [0, 0.755],
    ]),
  );
  await part("corridor-far", "env04-corridor", rect(0.424, 0, 0.152, 0.605));
  for (let i = 0; i < 12; i++) {
    const left = i < 6,
      x = left ? (i * 0.424) / 6 : 0.576 + ((i - 6) * 0.424) / 6;
    const silhouette = left
      ? polygon([
          [0, 0],
          [0.4, 0],
          [0.424, 0.605],
          [0, 0.755],
        ])
      : polygon([
          [1, 0],
          [0.6, 0],
          [0.576, 0.605],
          [1, 0.755],
        ]);
    await part(
      `facade-${i}`,
      "env04-corridor",
      `<defs><clipPath id="column">${rect(x, 0, 0.424 / 6 + 0.001, 1)}</clipPath></defs><g clip-path="url(#column)">${silhouette}</g>`,
    );
  }
  const wireLines =
    Array.from(
      { length: 17 },
      (_, i) => `<path d="M .5 .605 L ${i / 16} 1"/>`,
    ).join("") +
    Array.from(
      { length: 11 },
      (_, i) => `<path d="M 0 ${0.605 + Math.pow(i / 10, 2) * 0.395} H 1"/>`,
    ).join("") +
    Array.from(
      { length: 9 },
      (_, i) =>
        `<path d="M ${i * 0.06} 0 L .424 .605 M ${1 - i * 0.06} 0 L .576 .605"/>`,
    ).join("");
  await sharp(
    svg(
      `<rect width="1" height="1" fill="#0B1018"/><g fill="none" stroke="#B5C3C9" stroke-width=".0008" opacity=".6">${wireLines}</g>`,
    ),
  )
    .removeAlpha()
    .png()
    .toFile(`${root}/images/wireframe.png`);
  await register("wireframe", "images/wireframe.png", false);
  await part(
    "boundary-road",
    "env05-boundary",
    polygon([
      [0.402, 0.54],
      [0.598, 0.54],
      [1, 0.85],
      [1, 1],
      [0, 1],
      [0, 0.85],
    ]),
  );
  await part("boundary-left", "env05-boundary", rect(0, 0, 0.19, 0.85));
  await part("boundary-right", "env05-boundary", rect(0.81, 0, 0.19, 0.85));
  await part("exit-left", "env04-corridor", rect(0, 0, 0.5, 1));
  await part("exit-right", "env04-corridor", rect(0.5, 0, 0.5, 1));
  await part("outside-sky", "env06-outside", rect(0, 0, 1, 0.61));
  await part("outside-ground", "env06-outside", rect(0, 0.6, 1, 0.4));
  await writeFile(
    `${root}/masks/glass.svg`,
    svg(rect(0.167, 0.079, 0.665, 0.662)),
  );
  await register("glass-mask", "masks/glass.svg", true);

  const characters = [
    "ch01-walk-a",
    "ch02-walk-b",
    "ch03-rear",
    "ch04-turn",
    "ch03-r-reflection",
    "ch04-r-reflection",
    "ch05-closeup",
    "ch06-foot",
    "ch07-run",
    "crowd",
    "street-bollard",
  ];
  for (const id of characters) {
    const { data, info } = await sharp(`${root}/source/${id}.png`)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let left = info.width,
      top = info.height,
      right = 0,
      bottom = 0;
    for (let y = 0; y < info.height; y++)
      for (let x = 0; x < info.width; x++)
        if (data[(y * info.width + x) * 4 + 3] > 64) {
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
    assert.ok(right > left && bottom > top, `${id}: empty character`);
    const portrait = id === "ch05-closeup",
      foot = id === "ch06-foot";
    const width = portrait ? 1600 : foot ? 1600 : 1200,
      height = portrait ? 1600 : foot ? 900 : 1800;
    const maxW = portrait ? 1600 : foot ? 1400 : 1080,
      maxH = portrait ? 1600 : foot ? 780 : 1560;
    const body = await sharp(`${root}/source/${id}.png`)
      .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
      .resize(maxW, maxH, { fit: "inside" })
      .png()
      .toBuffer();
    const meta = await sharp(body).metadata();
    const floor = portrait ? 1600 : foot ? 800 : 1680;
    await sharp({
      create: { width, height, channels: 4, background: "#00000000" },
    })
      .composite([
        {
          input: body,
          left: Math.round((width - meta.width!) / 2),
          top: floor - meta.height!,
        },
      ])
      .png()
      .toFile(`${root}/images/${id}.png`);
    await register(id, `images/${id}.png`, true);
  }
  // Derive the outline from the same rear-view alpha; duplicates never acquire a new identity.
  const { data, info } = await sharp(`${root}/images/ch03-rear.png`)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const outline = Buffer.alloc(data.length);
  for (let y = 5; y < info.height - 5; y++)
    for (let x = 5; x < info.width - 5; x++) {
      const i = (y * info.width + x) * 4;
      if (
        data[i + 3] > 100 &&
        [
          [-5, 0],
          [5, 0],
          [0, -5],
          [0, 5],
        ].some(
          ([dx, dy]) => data[((y + dy) * info.width + x + dx) * 4 + 3] < 80,
        )
      ) {
        outline[i] = 181;
        outline[i + 1] = 195;
        outline[i + 2] = 201;
        outline[i + 3] = 170;
      }
    }
  await sharp(outline, { raw: info })
    .png()
    .toFile(`${root}/images/ch03-outline.png`);
  await register("ch03-outline", "images/ch03-outline.png", true);
  const shadow = Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="100"><defs><radialGradient id="s"><stop stop-color="#0B1018" stop-opacity=".65"/><stop offset="1" stop-color="#0B1018" stop-opacity="0"/></radialGradient></defs><ellipse cx="400" cy="50" rx="400" ry="50" fill="url(#s)"/></svg>',
  );
  await sharp(shadow).png().toFile(`${root}/images/contact-shadow.png`);
  await register("contact-shadow", "images/contact-shadow.png", true);
  await writeFile(
    `${root}/masks/path-boundary.svg`,
    '<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><path d="M1195 450 L1260 1060" stroke="#E6E9E6" stroke-width="7" opacity=".68"/></svg>',
  );
  await register("path-boundary", "masks/path-boundary.svg", true);
  for (let i = 0; i < 4; i++) {
    const source = sharp(`${root}/images/crowd.png`);
    if (i % 2) source.flop();
    const { data: body, info: bodyInfo } = await source
      .raw()
      .toBuffer({ resolveWithObject: true });
    for (let p = 0; p < body.length; p += 4) {
      body[p] = 20 + i * 3;
      body[p + 1] = 29 + i * 3;
      body[p + 2] = 39 + i * 3;
    }
    const id = `commuter-${i + 1}`;
    await sharp(body, { raw: bodyInfo })
      .png()
      .toFile(`${root}/images/${id}.png`);
    await register(id, `images/${id}.png`, true);
  }
  const tiles = [];
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 9; col++) {
      const t0 = row / 6,
        t1 = (row + 1) / 6,
        y0 = 0.54 + 0.46 * t0,
        y1 = 0.54 + 0.46 * t1;
      const half0 = 0.098 + 0.5 * t0,
        half1 = 0.098 + 0.5 * t1;
      const x = (t: number, half: number) => 0.5 - half + (2 * half * t) / 9;
      const points = [
        [x(col, half0), y0],
        [x(col + 1, half0), y0],
        [x(col + 1, half1), y1],
        [x(col, half1), y1],
      ].map(([a, b]) => [Math.max(0, Math.min(1, a)), b]);
      const id = `road-${row}-${col}`;
      const l = Math.max(
        0,
        Math.floor(Math.min(...points.map((p) => p[0])) * W),
      );
      const r = Math.min(
        W,
        Math.ceil(Math.max(...points.map((p) => p[0])) * W),
      );
      const t = Math.floor(y0 * H),
        b = Math.min(H, Math.ceil(y1 * H));
      const full = await sharp(paints.get("env05-boundary")!)
        .composite([{ input: svg(polygon(points)), blend: "dest-in" }])
        .png()
        .toBuffer();
      await sharp(full)
        .extract({ left: l, top: t, width: r - l, height: b - t })
        .png()
        .toFile(`${root}/images/${id}.png`);
      await register(id, `images/${id}.png`, true);
      tiles.push({ id, row, col, x: l, y: t, width: r - l, height: b - t });
    }
  await writeFile(
    "src/projects/ivans-escape/production-assets.ts",
    `// Generated by scripts/prepare-ivans-art.ts from local imagegen source paintings.\nimport type {AssetManifest} from '../../engine/types';\nexport const productionAssets: AssetManifest = ${JSON.stringify(assets, null, 2)};\nexport const roadTiles = ${JSON.stringify(tiles, null, 2)};\n`,
  );
  await writeFile(
    "docs/projects/ivans-escape/production/ASSET_PROCESSING.json",
    JSON.stringify(
      {
        method:
          "Built-in imagegen source assets; Sharp alpha-preserving registration and authored SVG cut masks",
        dimensions: {
          environment: [W, H],
          fullBody: [1200, 1800],
          footAnchor: [600, 1680],
        },
        assets,
        roadTiles: tiles,
      },
      null,
      2,
    ),
  );
  const prompts = JSON.parse(
    await readFile(
      "docs/projects/ivans-escape/production/GENERATION_PROMPTS.json",
      "utf8",
    ),
  ) as { id: string }[];
  for (const p of prompts)
    assert.ok(await sharp(`${root}/source/${p.id}.png`).metadata());
  console.log(
    `Prepared ${Object.keys(assets).length} image assets, 54 perspective road tiles and registered character cels.`,
  );
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
