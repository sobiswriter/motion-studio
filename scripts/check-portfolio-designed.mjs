import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {shots,handoffs,duration,fps,shotAt} from '../src/projects/portfolio-designed/sequence.mjs';
import {drawIdentityScene,identityTimings} from '../src/projects/portfolio-designed/identity-scenes.mjs';
assert.equal(duration,120);assert.equal(fps,60);assert.equal(shots.length,16);assert.equal(shots.at(-1).endFrame,7200);
for(const [i,s] of shots.entries()){
  assert.equal(s.frame,i?shots[i-1].endFrame:0);assert(Number.isInteger(s.frame)&&Number.isInteger(s.endFrame));assert(!s.source,'Moving source clips must not return');assert.equal(shotAt(s.frame).id,s.id);
}
assert.equal(handoffs.length,15);assert.equal(handoffs.filter(h=>h.kind==='kinetic').length,6);
assert.deepEqual(new Set(handoffs.map(h=>h.kind)),new Set(['liquid','particles','bauhaus','comic','brutal','kinetic']));
for(const [i,h] of handoffs.entries()){assert(h.startFrame<h.frame&&h.frame<h.endFrame);if(i)assert(h.startFrame>handoffs[i-1].endFrame)}
const html=await readFile('src/projects/portfolio-designed/index.html','utf8');assert(!/<video\b/i.test(html),'Source footage is prohibited');assert(!/footage-edit\.mp4/.test(html));assert.equal((html.match(/<audio\b/g)||[]).length,1);
for(const path of ['assets/audio/master.wav','assets/images/portrait.jpg','assets/images/launchsilo.png','assets/fonts/SpaceGrotesk.ttf','assets/fonts/EBGaramond.ttf','assets/fonts/IBMPlexMono-Regular.ttf','assets/vendor/gsap.min.js','assets/director.js'])await access(`src/projects/portfolio-designed/${path}`);
function mock(){let depth=0,paint=0;const words=[];const c={font:'',save(){depth++},restore(){assert(--depth>=0)},measureText(s){const size=Number(/([\d.]+)px/.exec(this.font)?.[1]??32);return{width:s.length*size*.57}},fillText(s,...n){assert(n.every(Number.isFinite));words.push(s);paint++},drawImage(_,...n){assert(n.every(Number.isFinite));paint++}};
for(const fn of ['setTransform','translate','scale','rotate','beginPath','arc','ellipse','rect','clip','fill','stroke','fillRect','strokeRect','moveTo','lineTo','bezierCurveTo','setLineDash'])c[fn]=(...n)=>{for(const v of n)if(typeof v==='number')assert(Number.isFinite(v),fn);if(fn==='fillRect'||fn==='fill')paint++};return{c,words,check(){assert.equal(depth,0);assert(paint>0)}}}
const images=new Map([['portrait.jpg',{width:1333,height:1333}]]);let frames=0;
for(const [id]of Object.entries(identityTimings)){const s=shots.find(s=>s.id===id);for(let f=0;f<(s.end-s.start)*fps;f+=3){const q=mock();assert(drawIdentityScene(q.c,id,f/fps,images));q.check();frames++}}
assert.throws(()=>drawIdentityScene(mock().c,'opening',NaN,images),/finite/);
const end=mock();drawIdentityScene(end.c,'closing',9.9,images);assert(end.words.includes('sobiverse.ai.studio'));assert(end.words.includes('Souradip'));assert(end.words.includes('Biswas'));
const entering=mock();drawIdentityScene(entering.c,'closing',4.5,images);assert(!entering.words.includes('AI / ML DEVELOPER  ·  FULL-STACK ENGINEER'),'Role caption must wait until the moving name lands');
assert.equal(drawIdentityScene(mock().c,'missing',0,images),false);
for(const file of ['identity-scenes.mjs','work-scenes.mjs','artwork.mjs','sequence.mjs']){const s=await readFile(`src/projects/portfolio-designed/${file}`,'utf8');assert(!/Math\.random|Date\.now|requestAnimationFrame|setInterval/.test(s),file)}
console.log(`SOBIVERSE checks passed: ${frames} identity samples; 7200 contiguous frames; six style families; one audio master; no video clips.`);
