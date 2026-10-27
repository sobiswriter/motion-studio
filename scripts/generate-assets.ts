import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";

async function main() {
  const root = "public/projects/_demo";
  for (const folder of ["images", "masks", "audio"])
    await mkdir(join(root, folder), { recursive: true });
  const svg = async (file: string, w: number, h: number, body: string) => {
    const buffer = await sharp(
      Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${body}</svg>`,
      ),
    )
      .png()
      .toBuffer();
    const meta = await sharp(buffer).metadata();
    assert.equal(meta.width, w);
    assert.equal(meta.height, h);
    await writeFile(join(root, file), buffer);
  };
  // Neutral separable calibration plates, never production artwork.
  await svg(
    "images/plate.png",
    2560,
    1440,
    '<rect width="2560" height="1440" fill="#334957"/><path d="M0 360H2560M0 720H2560M0 1080H2560M640 0V1440M1280 0V1440M1920 0V1440" stroke="#536a78" stroke-width="3"/><circle cx="1280" cy="720" r="340" fill="none" stroke="#6c8390" stroke-width="3"/>',
  );
  await svg(
    "images/mid.png",
    2560,
    1440,
    '<path d="M180 1140V500H560V1140M1750 1140V420H2140V1140" fill="#718892"/><path d="M0 1140H2560" stroke="#b0bec6" stroke-width="18"/>',
  );
  await svg(
    "images/foreground.png",
    2560,
    1440,
    '<path d="M0 0H420V1440H0ZM2290 0H2560V1440H2290ZM0 1000H2560V1440H0Z" fill="#1a2832"/><path d="M420 0V1440M2290 0V1440M0 1000H2560" stroke="#a2b1ba" stroke-width="6"/>',
  );
  for (const [name, arm] of [
    ["a", "M145 225L85 360"],
    ["b", "M145 225L50 130"],
  ]) {
    await svg(
      `images/pose-${name}.png`,
      400,
      600,
      `<circle cx="200" cy="105" r="65" fill="#d4dce0"/><path d="M200 185V395M200 215L145 225M255 225L310 345M200 215L255 225M200 395L125 560M200 395L275 560${arm}" fill="none" stroke="#d4dce0" stroke-width="55" stroke-linecap="round"/><circle cx="180" cy="95" r="7" fill="#334957"/><circle cx="220" cy="95" r="7" fill="#334957"/>`,
    );
  }
  await svg(
    "masks/soft-window.png",
    400,
    600,
    '<rect width="400" height="600" rx="20" fill="white"/>',
  );
  const rate = 48000;
  const samples = rate * 4;
  const wave = Buffer.alloc(44 + samples * 2);
  wave.write("RIFF");
  wave.writeUInt32LE(wave.length - 8, 4);
  wave.write("WAVEfmt ", 8);
  wave.writeUInt32LE(16, 16);
  wave.writeUInt16LE(1, 20);
  wave.writeUInt16LE(1, 22);
  wave.writeUInt32LE(rate, 24);
  wave.writeUInt32LE(rate * 2, 28);
  wave.writeUInt16LE(2, 32);
  wave.writeUInt16LE(16, 34);
  wave.write("data", 36);
  wave.writeUInt32LE(samples * 2, 40);
  for (let n = 0; n < samples; n++) {
    const t = n / rate;
    const pulse = t % (40 / 30);
    const envelope = pulse < 0.08 ? Math.sin((Math.PI * pulse) / 0.08) : 0;
    wave.writeInt16LE(
      Math.round(Math.sin(t * Math.PI * 2 * 440) * envelope * 2500),
      44 + n * 2,
    );
  }
  assert.equal(wave.readUInt32LE(40), samples * 2);
  await writeFile(join(root, "audio/preflight.wav"), wave);
  console.log(
    "Generated six local PNG plates/masks and a four-second calibration WAV.",
  );
}
main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
