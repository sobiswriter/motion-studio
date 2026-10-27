import assert from "node:assert/strict";
import { mkdir, copyFile, readFile, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import { shots } from "../src/projects/style-showreel-v2/sequence.mjs";

const project = resolve("src/projects/style-showreel-v2");
for (const dir of [
  "compositions",
  "assets/fonts",
  "assets/audio",
  "assets/vendor",
])
  await mkdir(`${project}/${dir}`, { recursive: true });
for (const f of [
  "SpaceGrotesk.ttf",
  "IBMPlexMono-Regular.ttf",
  "SpaceGrotesk-OFL.txt",
  "IBMPlexMono-OFL.txt",
])
  await copyFile(
    resolve("public/projects/ivans-escape/fonts", f),
    `${project}/assets/fonts/${f}`,
  );
for (const [name, url] of [
  [
    "EBGaramond.ttf",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf",
  ],
  [
    "EBGaramond-OFL.txt",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/OFL.txt",
  ],
]) {
  try {
    await access(`${project}/assets/fonts/${name}`);
  } catch {
    const response = await fetch(url);
    assert.ok(response.ok, `font ${name}`);
    await writeFile(
      `${project}/assets/fonts/${name}`,
      Buffer.from(await response.arrayBuffer()),
    );
  }
}
await copyFile(
  resolve("src/projects/style-showreel/assets/gsap.min.js"),
  `${project}/assets/vendor/gsap.min.js`,
);
await writeFile(
  `${project}/assets/vendor/LICENSE-three.txt`,
  await readFile("node_modules/three/LICENSE"),
);
await build({
  entryPoints: [`${project}/artwork.mjs`],
  outfile: `${project}/assets/director.js`,
  bundle: true,
  format: "iife",
  globalName: "MotionReel",
  minify: true,
  legalComments: "eof",
  banner: {
    js: "/* eslint-disable */\n// Generated from artwork.mjs + stage3d.mjs; includes Three.js. Do not edit this bundle.",
  },
});
const fonts = `@font-face{font-family:'Space Grotesk';src:url('assets/fonts/SpaceGrotesk.ttf');font-weight:300 700}@font-face{font-family:'IBM Plex Mono';src:url('assets/fonts/IBMPlexMono-Regular.ttf')}@font-face{font-family:'EB Garamond';src:url('assets/fonts/EBGaramond.ttf');font-weight:400 800}`;
const hosts = [];
for (const [i, s] of shots.entries()) {
  const pre = i ? 0.3 : 0,
    start = s.start - pre,
    end = Math.min(60, s.end + 0.3),
    duration = end - start;
  const html = `<template>
<style>${fonts}#root{position:absolute;inset:0;overflow:hidden}.art{position:absolute;inset:0;width:1920px;height:1080px}</style>
<div id="root" data-composition-id="${s.id}" data-width="1920" data-height="1080" data-duration="${duration}" data-layout-allow-overlap><canvas id="${s.id}-art" class="art" width="1920" height="1080" data-layout-ignore aria-label="${s.name}"></canvas></div>
<script>(()=>{const ready=Promise.all([document.fonts.load('700 48px "Space Grotesk"'),document.fonts.load('400 48px "IBM Plex Mono"'),document.fonts.load('500 48px "EB Garamond"')]).then(()=>{const draw=MotionReel.createArtwork(document.getElementById('${s.id}-art'),${JSON.stringify(s)},${JSON.stringify(shots[i + 1] ?? null)});const clock={t:0};draw(0);const tl=gsap.timeline({paused:true});tl.to(clock,{t:${duration},duration:${duration},ease:'none',onUpdate:()=>draw(clock.t)},0);window.__timelines['${s.id}']=tl;});window.__hf=window.__hf||{};window.__hf.buildReady=window.__hf.buildReady||{};window.__hf.buildReady['${s.id}']=ready;})();</script>
</template>`;
  await writeFile(`${project}/compositions/${s.id}.html`, html);
  hosts.push(
    `<div id="${s.id}" class="clip" data-composition-id="${s.id}" data-composition-src="compositions/${s.id}.html" data-start="${start}" data-duration="${duration}" data-track-index="${(i % 2) + 1}" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:${i + 1}"></div>`,
  );
}
await writeFile(
  `${project}/index.html`,
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1920,height=1080"><title>Beyond the Frame / Motion Studio</title><script src="assets/vendor/gsap.min.js"></script><script src="assets/director.js"></script><style>${fonts}*{box-sizing:border-box;margin:0}html,body{width:1920px;height:1080px;overflow:hidden;background:#101211}#root{position:relative;width:1920px;height:1080px}.clip{position:absolute;inset:0}</style></head><body><div id="root" data-composition-id="main" data-start="0" data-duration="60" data-width="1920" data-height="1080" data-fps="60">${hosts.join("\n")}<audio id="soundtrack" class="clip" src="assets/audio/master.wav" data-start="0" data-duration="60" data-track-index="3" data-volume="1"></audio></div><script>const clock={t:0};const tl=gsap.timeline({paused:true});tl.to(clock,{t:60,duration:60,ease:'none'});window.__timelines['main']=tl;</script></body></html>`,
);
await writeFile(
  `${project}/STORYBOARD.md`,
  `# Beyond the Frame / shot plan\n\nSource of truth: sequence.mjs. The M is continuous; each material motivates the handoff.\n\n| Frame range | Scene | Handoff into scene |\n|---|---|---|\n${shots.map((s) => `| ${s.frame}–${Math.round(s.end * 60) - 1} | ${s.name} | ${s.transition} |`).join("\n")}\n\nOpening: macro chrome becomes two typographic statements, then a particle dive. Ending: material fragments converge into chrome, the studio name lands, and the identity holds. All scene starts have 18 frames of pre-roll and 18 frames of overlap after the boundary; the boundary is the centre of the physical handoff.\n`,
);
console.log(
  `Built ${shots.length} scenes with shared physical 3D stage and five transition families.`,
);
