import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import sharp, { type Sharp } from "sharp";
import type { AssetManifest } from "../src/engine/types";

const root = "public/projects/ivans-escape/illustrated";
const assets: AssetManifest = {};
async function save(id: string, pipeline: Sharp, alpha = true) {
  const path = `${root}/layers/${id}.png`;
  await pipeline.png().toFile(path);
  const meta = await sharp(path).metadata();
  assert.ok(meta.width && meta.height);
  assets[id] = {
    id,
    src: path.slice(7),
    kind: "image",
    width: meta.width,
    height: meta.height,
    alpha,
  };
}
async function atlas(
  name: string,
  boxes: number[][],
  ids: string[],
  width = 600,
  height = 1000,
) {
  for (const [i, box] of boxes.entries()) {
    const [left, top, w, h] = box;
    const crop = await sharp(`${root}/source/${name}.png`)
      .extract({ left, top, width: w, height: h })
      .png()
      .toBuffer();
    // Shared cell dimensions and a common baseline prevent scale pumping between exposures.
    await save(
      ids[i],
      sharp(crop).resize(width, height, {
        fit: "contain",
        position: "bottom",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      }),
    );
  }
}
const mask = (path: string, width = 2560, height = 1440) =>
  Buffer.from(
    `<svg width="${width}" height="${height}"><path d="${path}" fill="white"/></svg>`,
  );
async function isolatedPoses(
  name: string,
  count: number,
  prefix: string,
  width: number,
  height: number,
) {
  const { data, info } = await sharp(`${root}/source/${name}.png`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info,
    labels = new Int32Array(w * h),
    queue = new Int32Array(w * h);
  const components: {
    label: number;
    area: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  }[] = [];
  let label = 0;
  for (let start = 0; start < w * h; start++) {
    if (labels[start] || data[start * 4 + 3] < 64) continue;
    label++;
    let head = 0,
      tail = 1,
      left = w,
      right = 0,
      top = h,
      bottom = 0;
    queue[0] = start;
    labels[start] = label;
    while (head < tail) {
      const p = queue[head++],
        x = p % w,
        y = Math.floor(p / w);
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ]) {
        const nx = x + dx,
          ny = y + dy,
          n = ny * w + nx;
        if (
          nx >= 0 &&
          nx < w &&
          ny >= 0 &&
          ny < h &&
          !labels[n] &&
          data[n * 4 + 3] >= 64
        ) {
          labels[n] = label;
          queue[tail++] = n;
        }
      }
    }
    components.push({ label, area: tail, left, right, top, bottom });
  }
  const figures = components
    .sort((a, b) => b.area - a.area)
    .slice(0, count)
    .sort((a, b) => a.left + a.right - (b.left + b.right));
  assert.equal(figures.length, count);
  assert.ok(
    figures.every((c) => c.area > 10000),
    `${name}: incomplete figure segmentation`,
  );
  const scale = Math.min(
    (width - 32) / Math.max(...figures.map((f) => f.right - f.left + 7)),
    (height - 60) / Math.max(...figures.map((f) => f.bottom - f.top + 7)),
  );
  for (const [i, c] of figures.entries()) {
    const left = Math.max(0, c.left - 3),
      top = Math.max(0, c.top - 3),
      cw = Math.min(w - left, c.right - c.left + 7),
      ch = Math.min(h - top, c.bottom - c.top + 7);
    const matte = Buffer.alloc(w * h * 4);
    for (let p = 0; p < w * h; p++)
      if (labels[p] === c.label) matte.fill(255, p * 4, p * 4 + 4);
    const soft = await sharp(matte, {
      raw: { width: w, height: h, channels: 4 },
    })
      .blur(0.7)
      .png()
      .toBuffer();
    const crop = await sharp(data, { raw: info })
      .composite([{ input: soft, blend: "dest-in" }])
      .png()
      .toBuffer();
    const dw = Math.round(cw * scale),
      dh = Math.round(ch * scale);
    const sprite = await sharp(crop)
      .extract({ left, top, width: cw, height: ch })
      .resize(dw, dh)
      .png()
      .toBuffer();
    const x = Math.round((width - dw) / 2);
    const y = height - dh - 20;
    assert.ok(
      x >= 0 && y >= 0 && x + dw <= width && y + dh <= height,
      `${name} pose ${i}: register exceeds canvas`,
    );
    await save(
      `${prefix}-${i}`,
      sharp({
        create: {
          width,
          height,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      }).composite([{ input: sprite, left: x, top: y }]),
    );
  }
}
async function environment(name: string) {
  const plate = await sharp(`${root}/source/${name}.png`)
    .resize(2560, 1440, { fit: "cover" })
    .png()
    .toBuffer();
  await save(name, sharp(plate), false);
  if (name === "corridor" || name === "boundary") {
    const parts = {
      left: "M0 0H1140L1280 600L680 1440H0Z",
      right: "M1420 0H2560V1440H1880L1280 600Z",
      ground: "M1280 600L1880 1440H680Z",
    };
    for (const [id, path] of Object.entries(parts))
      await save(
        `${name}-${id}`,
        sharp(plate)
          .ensureAlpha()
          .composite([{ input: mask(path), blend: "dest-in" }]),
      );
    if (name === "corridor")
      for (let i = 0; i < 12; i++) {
        const x0 = (i * 2560) / 12,
          x1 = ((i + 1) * 2560) / 12 + 1;
        await save(
          `facade-${i}`,
          sharp(plate)
            .ensureAlpha()
            .composite([
              { input: mask(`M${x0} 0H${x1}V1440H${x0}Z`), blend: "dest-in" },
            ]),
        );
      }
    if (name === "boundary") {
      for (let row = 0; row < 9; row++)
        for (let col = 0; col < 6; col++) {
          const y0 = 600 + (row * 840) / 9,
            y1 = 600 + ((row + 1) * 840) / 9;
          const x = (y: number, edge: number) =>
            1280 + ((y - 600) / 840) * (-600 + edge * 200);
          const p = `M${x(y0, col)} ${y0}L${x(y0, col + 1)} ${y0}L${x(y1, col + 1)} ${y1}L${x(y1, col)} ${y1}Z`;
          await save(
            `road-${row}-${col}`,
            sharp(plate)
              .ensureAlpha()
              .composite([{ input: mask(p), blend: "dest-in" }]),
          );
        }
    }
  }
}
async function main() {
  await mkdir(`${root}/layers`, { recursive: true });
  const m = await sharp(`${root}/source/ivan-model.png`).metadata();
  assert.equal(m.width, 1536);
  assert.equal(m.height, 1024);
  await atlas(
    "ivan-model",
    [
      [0, 0, 512, 1024],
      [512, 0, 512, 1024],
      [1024, 0, 512, 1024],
    ],
    ["front", "side", "rear"],
  );
  await isolatedPoses("ivan-walk", 4, "walk", 600, 1000);
  const portraits = await sharp(`${root}/source/ivan-portraits.png`).metadata();
  const pw = Math.floor(portraits.width! / 2),
    ph = Math.floor(portraits.height! / 2);
  await atlas(
    "ivan-portraits",
    [
      [0, 0, pw, ph],
      [pw, 0, pw, ph],
      [0, ph, pw, ph],
      [pw, ph, pw, ph],
    ],
    ["portrait-0", "portrait-1", "portrait-2", "portrait-3"],
    900,
    900,
  );
  await isolatedPoses("ivan-run", 4, "run", 800, 1100);
  await isolatedPoses("ivan-leap", 3, "leap", 800, 1100);
  await isolatedPoses("ivan-shoe", 3, "shoe", 1200, 700);
  await save(
    "commuter",
    sharp(`${root}/layers/side.png`).modulate({
      brightness: 0.28,
      saturation: 0,
    }),
  );
  await save(
    "hand",
    sharp(`${root}/source/ivan-hand.png`).resize(1600, 1000, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    }),
  );
  const foreground = await sharp(`${root}/source/foreground.png`)
    .resize(900, 1440, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer();
  // Generated solid interiors can be 251/255 alpha; the architectural wipe needs a truly opaque core.
  for (let i = 3; i < foreground.length; i += 4)
    if (foreground[i] >= 245) foreground[i] = 255;
  await save(
    "foreground",
    sharp(foreground, { raw: { width: 900, height: 1440, channels: 4 } }),
  );
  await save(
    "streaks",
    sharp(`${root}/source/streaks.png`).resize(2400, 1350, { fit: "fill" }),
  );
  for (const name of ["street", "glass", "corridor", "boundary", "outside"])
    await environment(name);
  await save(
    "pavement",
    sharp(`${root}/source/pavement.png`).resize(2560, 1440, { fit: "cover" }),
    false,
  );
  await save(
    "final-hero",
    sharp(`${root}/layers/rear.png`).modulate({
      brightness: 0.45,
      saturation: 0.55,
    }),
  );
  for (const id of ["portrait-2", "portrait-3"])
    await save(`reflection-${id}`, sharp(`${root}/layers/${id}.png`).flop());
  await save(
    "route",
    sharp(
      Buffer.from(
        '<svg width="1920" height="1080"><path d="M1280 540L1310 1080" stroke="#D5DCD8" stroke-width="18" opacity=".8"/></svg>',
      ),
    ),
  );
  await save("eye",sharp(`${root}/source/eye-insert.png`).resize(1920,1080,{fit:"cover"}),false);
  for (const id of ["front", "rear", "portrait-0", "portrait-1"]) {
    const meta = await sharp(`${root}/layers/${id}.png`).metadata();
    const w = meta.width!,
      h = meta.height!;
    const edge = id.startsWith("portrait") ? 0.22 : 0.105;
    await save(
      `${id}-hair`,
      sharp(`${root}/layers/${id}.png`)
        .ensureAlpha()
        .composite([
          {
            input: mask(
              `M0 0H${w}V${h * edge}L${w * 0.8} ${h * (edge + 0.025)}L${w * 0.2} ${h * (edge + 0.025)}L0 ${h * edge}Z`,
              w,
              h,
            ),
            blend: "dest-in",
          },
        ]),
    );
    if (!id.startsWith("portrait"))
      await save(
        `${id}-hem`,
        sharp(`${root}/layers/${id}.png`)
          .ensureAlpha()
          .composite([
            {
              input: mask(
                `M${w * 0.12} ${h * 0.43}H${w * 0.88}V${h * 0.5}H${w * 0.12}Z`,
                w,
                h,
              ),
              blend: "dest-in",
            },
          ]),
      );
  }
  await writeFile(
    "src/projects/ivans-escape/illustrated-assets.ts",
    `// Generated by scripts/prepare-ivans-opening.ts; original sources remain intact.\nimport type { AssetManifest } from '../../engine/types';\nexport const illustratedAssets: AssetManifest = ${JSON.stringify(assets, null, 2)};\n`,
  );
  await writeFile(
    "docs/projects/ivans-escape/redirection/production/ASSET_DIMENSIONS.json",
    JSON.stringify(assets, null, 2),
  );
  console.log(
    `Prepared ${Object.keys(assets).length} local illustrated layers.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
