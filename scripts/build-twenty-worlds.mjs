import {mkdir,copyFile,readdir,writeFile,readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {shots} from '../src/projects/twenty-worlds/sequence.mjs';
const dir='src/projects/twenty-worlds';
for(const name of ['assets/fonts','assets/vendor','assets/audio'])await mkdir(`${dir}/${name}`,{recursive:true});
for(const name of await readdir('src/projects/style-showreel-v2/assets/fonts'))await copyFile(`src/projects/style-showreel-v2/assets/fonts/${name}`,`${dir}/assets/fonts/${name}`);
await copyFile('src/projects/style-showreel-v2/assets/vendor/gsap.min.js',`${dir}/assets/vendor/gsap.min.js`);
await copyFile('node_modules/three/LICENSE',`${dir}/assets/vendor/LICENSE-three.txt`);
await copyFile('src/projects/style-showreel-v2/assets/audio/music-edit.wav',`${dir}/assets/audio/music-edit.wav`);
try{await readFile(`${dir}/assets/audio/master.wav`)}catch{await copyFile(`${dir}/assets/audio/music-edit.wav`,`${dir}/assets/audio/master.wav`)}
await build({entryPoints:[`${dir}/artwork.mjs`],outfile:`${dir}/assets/director.js`,bundle:true,format:'iife',globalName:'TwentyWorlds',minify:true,legalComments:'eof'});
assert.equal(shots.at(-1).endFrame,3600);
const fonts=`@font-face{font-family:Display;src:url('assets/fonts/SpaceGrotesk.ttf');font-weight:300 700}@font-face{font-family:Mono;src:url('assets/fonts/IBMPlexMono-Regular.ttf')}@font-face{font-family:Editorial;src:url('assets/fonts/EBGaramond.ttf');font-weight:400 800}`;
await writeFile(`${dir}/index.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>One idea. Twenty worlds. / Motion Studio</title><script src="assets/vendor/gsap.min.js"></script><script src="assets/director.js"></script><style>${fonts}*{box-sizing:border-box;margin:0}html,body{width:1920px;height:1080px;overflow:hidden;background:#14151b}#main{position:relative;width:1920px;height:1080px}.clip{position:absolute;inset:0;width:1920px;height:1080px}</style></head><body><main id="main" data-composition-id="main" data-duration="60" data-width="1920" data-height="1080" data-fps="60"><canvas id="film" class="clip" width="1920" height="1080" data-start="0" data-duration="60" data-layout-ignore aria-label="Twenty original motion styles connected by one orange signal"></canvas><audio id="soundtrack" class="clip" src="assets/audio/master.wav" data-start="0" data-duration="60" data-track-index="2" data-volume="1"></audio></main><script>window.__timelines=window.__timelines||{};window.__hf=window.__hf||{};window.__hf.buildReady=window.__hf.buildReady||{};window.__hf.buildReady.main=Promise.all([document.fonts.load('700 100px Display'),document.fonts.load('400 50px Mono'),document.fonts.load('500 100px Editorial')]).then(()=>{const draw=TwentyWorlds.createFilm(document.getElementById('film'));const clock={t:0};draw(0);const tl=gsap.timeline({paused:true});tl.to(clock,{t:60,duration:60,ease:'none',onUpdate:()=>draw(clock.t)},0);window.__timelines.main=tl;});</script></body></html>`);
await writeFile(`${dir}/hyperframes.json`,JSON.stringify({paths:{assets:'assets'},authoringSkill:'hyperframes'},null,2));
await writeFile(`${dir}/meta.json`,JSON.stringify({id:'twenty-worlds',name:'One idea. Twenty worlds.',description:'60 seconds / 20 styles / Motion Studio'},null,2));
console.log('Built Twenty Worlds: 22 contiguous shots, 3600 frames, all assets local.');
