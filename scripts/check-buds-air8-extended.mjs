import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import sharp from 'sharp';
import {createKit} from '../src/projects/realme-buds-air8-extended/kit.mjs';
import {drawScene} from '../src/projects/realme-buds-air8-extended/scenes.mjs';
import {shots,handoffs,duration,fps,shotAt} from '../src/projects/realme-buds-air8-extended/sequence.mjs';
const root='src/projects/realme-buds-air8-extended';
assert.equal(duration,120);assert.equal(fps,60);assert.equal(shots.at(-1).endFrame,7200);
for(let i=0;i<shots.length;i++){assert.equal(shots[i].frame,i?shots[i-1].endFrame:0);assert.equal(shotAt(shots[i].frame).id,shots[i].id)}
assert.deepEqual(new Set(handoffs.map(h=>h.kind)),new Set(['liquid','kinetic','bauhaus','comic','brutal','particles','scan']));
assert(new Set(handoffs.map(h=>h.endFrame-h.startFrame)).size>1);
for(let i=0;i<handoffs.length;i++){const h=handoffs[i];assert(h.startFrame<h.frame&&h.frame<h.endFrame);if(i)assert(h.startFrame>handoffs[i-1].endFrame)}
const names=JSON.parse(await readFile(`${root}/image-manifest.json`,'utf8')),images=new Map();
for(const name of names){const m=await sharp(`${root}/assets/images/${name}`).metadata();if(name==='realme-wordmark.svg'){assert.equal(m.width,80);assert.equal(m.height,24)}else assert(m.width>500&&m.height>500);images.set(name,{width:m.width,height:m.height,name});if(name!=='macro.jpg')assert(m.hasAlpha)}
function context(){
 let depth=0,paints=0;const words=[],used=[],stack=[];const c={globalAlpha:1,save(){depth++;stack.push(this.globalAlpha)},restore(){assert(depth>0);depth--;this.globalAlpha=stack.pop()},fillText(s,...n){assert(n.every(Number.isFinite));words.push(s);paints++},drawImage(img,...n){assert(n.every(Number.isFinite));assert(this.globalAlpha>=0&&this.globalAlpha<=1);used.push(img.name);paints++}};
 for(const name of ['setTransform','fillRect','strokeRect','beginPath','moveTo','lineTo','stroke','arc','ellipse','fill','rect','clip','translate','scale','rotate','closePath','bezierCurveTo','setLineDash'])c[name]=(...args)=>{for(const n of args)if(typeof n==='number')assert(Number.isFinite(n),name);if(name==='arc'||name==='ellipse')assert(args[2]>=0);if(name==='fill'||name==='fillRect')paints++};
 c.createLinearGradient=c.createRadialGradient=(...a)=>{assert(a.every(Number.isFinite));return {addColorStop(p,s){assert(p>=0&&p<=1);assert.equal(typeof s,'string')}}};
 return {c,words,used,check(){assert.equal(depth,0);assert(paints>0)}};
}
const before=globalThis.document;globalThis.document={createElement(){return {width:256,height:256,getContext(){return {drawImage(){},getImageData(){return {data:new Uint8Array(256*256*4).fill(255)}}}}}}};
const kit=createKit(images);globalThis.document=before;assert.equal(kit.points.length,1100);
let samples=0;
for(const shot of shots)for(let f=0;f<=shot.endFrame-shot.frame;f++){const q=context();drawScene(q.c,shot.id,f/fps,images,kit);q.check();if(shot.id==='resistance'){assert(q.used.length===2);assert(q.used.every(n=>n.startsWith('bud-')))}if(shot.id==='drivers')assert(q.used.includes('bud-1.png'));samples++}
const expected={anc:['UP TO 55dB ANC'],battery:['UP TO','58','HOURS WITH THE CHARGING CASE','ANC off / AAC · 50% volume, normal mode, full charge · realme Lab; actual life varies.'],resistance:['Earbuds only · case has no dust/water resistance · do not charge wet.'],connection:['Enable in realme Link · pause current audio before switching devices.'],gaming:['45ms in Gaming Mode; earbud-side latency · realme Lab; actual results vary.'],translation:['Enable in realme Link · feature availability and compatible device required.'],spatial:['Enable 3D Spatial / Dynamic Audio in realme Link · illustrative sound field.'],calls:['SIX MICROPHONES.','Three per earbud.'],signature:['Make it real.','realme Buds Air8','EXPLORE BUDS AIR8']};
for(const[id,copy]of Object.entries(expected)){const q=context();drawScene(q.c,id,id==='battery'?6:3,images,kit);for(const text of copy)assert(q.words.includes(text),text)}
for(const t of [0,.6,1.8,2.45,4.2,6]){const q=context();let firstColor;const fill=q.c.fillRect;q.c.fillRect=(...a)=>{firstColor??=q.c.fillStyle;fill(...a)};q.c.arc=q.c.ellipse=()=>{throw new Error('Circular motif returned to opening')};drawScene(q.c,'origin',t,images,kit);q.check();assert.equal(firstColor,'#FFC915');assert(q.used.includes('realme-wordmark.svg'));assert(!q.words.some(s=>/frequency/i.test(s)))}
assert.throws(()=>drawScene(context().c,'anc',NaN,images,kit),/finite/);assert.throws(()=>drawScene(context().c,'missing',0,images,kit),/Unknown/);
const html=await readFile(`${root}/index.html`,'utf8');assert.equal((html.match(/<audio\b/g)||[]).length,1);assert(!/<video\b/.test(html));await access(`${root}/assets/audio/master.wav`);
for(const name of ['scenes.mjs','kit.mjs','detail-scenes.mjs','sequence.mjs','artwork.mjs','transitions.mjs'])assert(!/Math\.random|Date\.now|requestAnimationFrame|setInterval/.test(await readFile(`${root}/${name}`,'utf8')),name);
console.log(`Buds Air8: ${samples} scene samples; 7200 contiguous frames; 7 transition families; 1100 stable particles; native-photo dimensions/alpha; qualified copy and IP55 case exclusion passed.`);
