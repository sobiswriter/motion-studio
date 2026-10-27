import assert from "node:assert/strict";
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
import { scenes } from "../src/projects/style-showreel/scenes.mjs";
import { artwork } from "../src/projects/style-showreel/artwork.mjs";

const project = resolve("src/projects/style-showreel");
assert.equal(scenes.length, 20);
assert.equal(new Set(scenes.map((s) => s.name)).size, 20);
await mkdir(`${project}/compositions`, { recursive: true });
await mkdir(`${project}/assets/fonts`, { recursive: true });
await mkdir(`${project}/assets/audio`, { recursive: true });
for (const file of [
  "SpaceGrotesk.ttf",
  "IBMPlexMono-Regular.ttf",
  "SpaceGrotesk-OFL.txt",
  "IBMPlexMono-OFL.txt",
])
  await copyFile(
    resolve("public/projects/ivans-escape/fonts", file),
    `${project}/assets/fonts/${file}`,
  );
const gsap = await fetch(
  "https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js",
);
assert.ok(gsap.ok);
await writeFile(`${project}/assets/gsap.min.js`, await gsap.text());
const hosts = [];
for (const [i, s] of scenes.entries()) {
  const id = `style${String(i + 1).padStart(2, "0")}`,
    duration = i === 19 ? 3 : 3.3;
  const reveal =
    i % 3 === 0
      ? "circle(0% at 65% 50%)"
      : i % 3 === 1
        ? "polygon(0% 0%,0% 0%,0% 100%,0% 100%)"
        : "polygon(0% 0%,0% 0%,0% 100%,0% 100%)";
  const open =
    i % 3 === 0
      ? "circle(150% at 65% 50%)"
      : "polygon(0% 0%,100% 0%,100% 100%,0% 100%)";
  const html = `<template>
<style>@font-face{font-family:"Space Grotesk";src:url("assets/fonts/SpaceGrotesk.ttf");font-weight:300 700}
@font-face{font-family:"IBM Plex Mono";src:url("assets/fonts/IBMPlexMono-Regular.ttf");font-weight:400}
#root{position:absolute;inset:0;overflow:hidden;color:${s.ink};font-family:"Space Grotesk"}
.stage{position:absolute;inset:0;background:${s.bg};overflow:hidden}
.art{position:absolute;inset:0;width:100%;height:100%}
.label{position:absolute;left:192px;top:112px;font:500 34px "IBM Plex Mono";letter-spacing:2px;${i === 11 || i === 18 ? `background:${s.bg};padding:14px 20px;left:172px;top:98px` : ""}}
.copy{position:absolute;left:192px;top:250px;max-width:1536px}
.copy h1{margin:0;font-size:${s.size}px;font-weight:700;line-height:.91;letter-spacing:-8px;font-family:${s.font === "serif" ? '"EB Garamond"' : s.font === "mono" ? '"IBM Plex Mono"' : '"Space Grotesk"'}}
.copy h1 em{font-weight:400}.copy.bottom{left:192px;top:auto;bottom:170px}.copy.bottom h1{letter-spacing:-3px}
.copy.center{left:192px;right:192px;top:370px;text-align:center}.copy.center h1{letter-spacing:-4px;font-weight:500;line-height:1}
.copy.comic{left:490px;top:335px}.copy.comic h1{font-style:italic;letter-spacing:-18px;transform:rotate(-8deg)}
.copy.kinetic{top:215px}.copy.kinetic .word{display:block}.copy.kinetic .word:nth-child(2){margin-left:300px}.copy.kinetic .word:nth-child(3){margin-left:590px}
.copy.bauhaus{left:1110px;top:280px;max-width:620px}.copy.pixel{top:210px}.copy.final{top:255px}.signature{position:absolute;left:200px;top:790px;font:700 91px "Space Grotesk";letter-spacing:-3px}
.footer{position:absolute;left:200px;top:915px;font:28px "IBM Plex Mono";letter-spacing:1px}
</style>
<div id="root" data-composition-id="${id}" data-width="1920" data-height="1080">
 <div id="${id}-stage" class="stage" data-layout-allow-occlusion>
  <canvas id="${id}-art" class="art" width="1920" height="1080" data-layout-ignore></canvas>
  <div class="label">${String(i + 1).padStart(2, "0")} / ${s.name.toUpperCase()}</div>
  ${
    s.title
      ? `<div id="${id}-copy" class="copy ${s.layout}"><h1>${
          i === 6
            ? s.title
                .split("<br>")
                .map((w) => `<span class="word">${w}</span>`)
                .join("")
            : s.title
        }</h1></div>`
      : ""
  }
  ${i === 0 ? '<div class="footer">20 STYLES / 60 SECONDS / ONE CONTINUOUS IDEA</div>' : ""}
  ${i === 19 ? '<div class="signature">MOTION STUDIO</div><div class="footer">20 STYLES. ONE DESIGN LANGUAGE.</div>' : ""}
 </div>
</div>
<script>
(()=>{const draw=(${artwork.toString()})(document.getElementById("${id}-art"),${i},${JSON.stringify(s)});
const clock={t:0};draw(0);const tl=gsap.timeline({paused:true});
tl.to(clock,{t:${duration},duration:${duration},ease:"none",onUpdate:()=>draw(clock.t)},0);
${i ? `tl.fromTo("#${id}-stage",{clipPath:${JSON.stringify(reveal)}},{clipPath:${JSON.stringify(open)},duration:.32,ease:"power3.inOut"},0);` : ""}
${s.title ? `tl.fromTo("#${id}-copy",{y:${i === 6 ? 150 : 80},scale:${i === 6 ? 1.16 : 0.98},rotation:${i === 6 ? -5 : 0}},{y:0,scale:1,rotation:0,duration:.56,ease:"expo.out"},${i ? ".18" : "0"});` : ""}
${i === 6 ? `tl.fromTo("#${id}-copy .word",{x:-220,rotation:-4},{x:0,rotation:0,duration:.42,stagger:.45,ease:"power4.out"},.2);` : ""}
${i === 11 ? `tl.to("#${id}-copy",{scale:1.08,duration:.08,ease:"power2.out",repeat:1,yoyo:true},1);tl.to("#${id}-copy",{scale:1.06,duration:.08,ease:"power2.out",repeat:1,yoyo:true},2);` : ""}
window.__timelines["${id}"]=tl;})();
</script></template>`;
  await writeFile(`${project}/compositions/${id}.html`, html);
  hosts.push(
    `<div id="${id}" class="clip" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${i * 3}" data-duration="${duration}" data-track-index="${(i % 2) + 1}" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:${i + 1}"></div>`,
  );
}
await writeFile(
  `${project}/index.html`,
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1920,height=1080">
<script src="assets/gsap.min.js"></script><style>
@font-face{font-family:"Space Grotesk";src:url("assets/fonts/SpaceGrotesk.ttf");font-weight:300 700}
@font-face{font-family:"IBM Plex Mono";src:url("assets/fonts/IBMPlexMono-Regular.ttf");font-weight:400}
*{box-sizing:border-box;margin:0}html,body{width:1920px;height:1080px;overflow:hidden;background:#121714}#root{position:relative;width:100%;height:100%}.clip{position:absolute;inset:0}
</style></head><body><div id="root" data-composition-id="main" data-start="0" data-duration="60" data-width="1920" data-height="1080" data-fps="60">
${hosts.join("\n")}
<audio id="score" class="clip" src="assets/audio/score.wav" data-start="0" data-duration="60" data-track-index="3" data-volume="1"></audio>
</div><script>const clock={t:0};const tl=gsap.timeline({paused:true});tl.to(clock,{t:60,duration:60,ease:"none"});window.__timelines["main"]=tl;</script></body></html>`,
);
await writeFile(
  `${project}/STORYLINES.md`,
  `# Storylines\n\nChosen: **One idea. Twenty ways to move.** A single form changes material and motion language through all 20 styles, ending as the Motion Studio signature. The six-beat phrases keep the reel moving as one film.\n\nAlternatives: **The impossible machine** — twenty connected mechanisms assemble a studio mark. **The type specimen** — one typographic sentence is reinterpreted twenty times.\n\nThe user approved studio defaults and autonomous completion; the chosen concept combines a material journey with readable typography.\n`,
);
await writeFile(
  `${project}/SPEC.md`,
  `# Motion Studio / One idea. Twenty ways to move.\n\n60 seconds, 1920×1080, 60 fps, 3600 frames. 120 BPM, 30 frames per beat, six beats per style. No voiceover. The hero is a form whose material changes, with brief full-frame geometric reveals connecting scenes. Headlines use Space Grotesk, editorial styles EB Garamond, technical styles IBM Plex Mono. Primary type is 86–310 px; style identifiers 34 px. Copy settles within 0.74 s; action continues in the material.\n\nPalette: one ground, one ink, one accent per scene, with the explicit style exceptions required for holography, gradient mesh and Bauhaus. Readable text stays inside 192 px horizontal margins. Materials fill at least 40% of the frame. All animation is sampled from scene time; particles and texture use deterministic index hashes.\n\nBanned: generic feature cards, slide-deck cuts, unattended loops, unseeded randomness, external runtime assets, tiny slogans, generic gradient backgrounds outside the requested mesh/holographic styles. Glass, neon, particles, halftone and labels are intentional demonstrations of the user's requested styles.\n\nSound: original 120 BPM score from earshot-rendered tuned/percussion sources, with coherent procedural accents and licensed tactile recordings placed through Real SFX. Final mix target approximately -14 LUFS, ≤-1 dBTP.\n\n| Frames | Style | Hero / copy |\n|---|---|---|\n${scenes.map((s, i) => `| ${i * 180}–${i * 180 + 179} | ${s.name} | ${s.title.replaceAll("<br>", " / ").replace(/<[^>]+>/g, "") || "Mechanical MOTION / STUDIO board"} |`).join("\n")}\n\nQA: review all 20 scene midpoints, 0.5-second sampling, cut boundaries ±0.2 seconds, first/final frames, phone-scale typography, backward seeks, audio presence, cue positions, tails, levels and provenance. Four review passes recorded in REVIEW.md.\n`,
);
console.log(
  "Built 20 deterministic style scenes, 3600-frame composition and production spec.",
);
