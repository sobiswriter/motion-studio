import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {shots,handoffs,duration,fps,shotAt} from '../src/projects/portfolio-space/sequence.mjs';
import {createArtKit} from '../src/projects/portfolio-space/space-kit.mjs';
import {drawSpaceIdentity,identityTimings} from '../src/projects/portfolio-space/space-identity.mjs';
const root='src/projects/portfolio-space';
assert.equal(duration,120);assert.equal(fps,60);assert.equal(shots.length,16);assert.equal(shots.at(-1).endFrame,7200);
for(const[i,s]of shots.entries()){assert.equal(s.frame,i?shots[i-1].endFrame:0);assert(Number.isInteger(s.frame)&&Number.isInteger(s.endFrame));assert(!s.source);assert.equal(shotAt(s.frame).id,s.id)}
assert.equal(handoffs.length,15);assert.equal(handoffs.filter(h=>h.kind==='kinetic').length,6);
assert.deepEqual(new Set(handoffs.map(h=>h.kind)),new Set(['kinetic','particles','liquid','bauhaus','comic','brutal']));
for(const[i,h]of handoffs.entries()){assert(h.startFrame<h.frame&&h.frame<h.endFrame);if(i)assert(h.startFrame>handoffs[i-1].endFrame)}
const html=await readFile(`${root}/index.html`,'utf8');assert(!/<video\b/.test(html));assert(!/footage-edit\.mp4/.test(html));assert.equal((html.match(/<audio\b/g)||[]).length,1);
const names=JSON.parse(await readFile(`${root}/image-manifest.json`,'utf8'));assert.equal(names.length,15);
for(const key of names)await access(`${root}/assets/images/${key}`);await access(`${root}/assets/audio/master.wav`);
function context(){
 let depth=0,paints=0;const stack=[],words=[],positions=[],alphas=[];
 const c={globalAlpha:1,save(){depth++;stack.push(this.globalAlpha)},restore(){assert(depth>0);depth--;this.globalAlpha=stack.pop()},fillText(s,...n){assert(n.every(Number.isFinite));words.push(s);positions.push({s,x:n[0],y:n[1]});paints++},drawImage(_,...n){assert(n.every(Number.isFinite));alphas.push(this.globalAlpha);paints++}};
 for(const name of ['setTransform','fillRect','strokeRect','beginPath','moveTo','lineTo','stroke','arc','ellipse','fill','rect','clip','translate','scale','rotate','closePath','bezierCurveTo','setLineDash'])c[name]=(...args)=>{for(const n of args)if(typeof n==='number')assert(Number.isFinite(n),name);if(name==='arc'||name==='ellipse')assert(args[2]>=0);if(name==='fillRect'||name==='fill')paints++};
 c.createLinearGradient=c.createRadialGradient=(...args)=>{assert(args.every(Number.isFinite));return{addColorStop(p){assert(p>=0&&p<=1)}}};
 return{c,words,positions,alphas,check(){assert.equal(depth,0);assert(paints>0)}};
}
const oldDocument=globalThis.document;globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>context().c})};
try{
 const images=new Map(names.map(n=>[n,{width:n==='portrait.jpg'?1333:1920,height:n==='portrait.jpg'?1333:1080}])),kit=createArtKit(images);
 const alpha=context();alpha.c.globalAlpha=.4;kit.image(alpha.c,'portrait.jpg',0,0,100,100,{alpha:.5});assert(Math.abs(alpha.alphas[0]-.2)<1e-9,'Image opacity must multiply inherited opacity');assert.equal(alpha.c.globalAlpha,.4);alpha.check();
 assert.throws(()=>kit.bg(context().c,'missing',0),/Missing/);assert.throws(()=>kit.image(context().c,'portrait.jpg',0,0,0,100),/geometry/);
 let samples=0;
 for(const id of Object.keys(identityTimings)){const s=shots.find(s=>s.id===id);for(let f=0;f<(s.end-s.start)*fps;f+=3){const q=context();assert(drawSpaceIdentity(q.c,id,f/fps,images,kit));q.check();samples++}}
 const end=context();drawSpaceIdentity(end.c,'closing',9.9,images,kit);for(const s of ['Souradip','Biswas','sobiverse.ai.studio'])assert(end.words.includes(s));
 const entering=context();drawSpaceIdentity(entering.c,'closing',4.5,images,kit);assert(!entering.words.includes('AI / ML DEVELOPER  ·  FULL-STACK ENGINEER'));
 const locks=[['opening','SOBIVERSE',49/60],['opening','Souradip Biswas',166/60],['work','WORK',37/60],['work','in orbit.',2],['ai-chapter','THINK.',61/60],['ai-chapter','TEST.',106/60],['ai-chapter','BUILD.',151/60],['tools','BEYOND',61/60],['tools','the toolkit.',155/60],['human','curious.',1.95],['closing','Bound by curiosity.',71/60],['closing','sobiverse.ai.studio',7.1]];
 for(const[id,word,time]of locks){const at=t=>{const q=context();drawSpaceIdentity(q.c,id,t,images,kit);return q.positions.findLast(p=>p.s===word)};assert.deepEqual(at(time),at(time+1/60),`${word} must settle on its sound anchor`);assert.notDeepEqual(at(time-1/60),at(time),`${word} must still be approaching on the previous frame`)}
 assert.throws(()=>drawSpaceIdentity(context().c,'opening',NaN,images,kit),/finite/);assert.equal(drawSpaceIdentity(context().c,'unknown',0,images,kit),false);
 console.log(`Space portfolio: ${samples} identity samples, 12 sound-locked text landings, shared opacity guard, 15 native portfolio assets, 7200 contiguous frames, no moving source clips.`);
}finally{globalThis.document=oldDocument}
for(const file of ['space-kit.mjs','space-identity.mjs','space-work-scenes.mjs','space-transitions.mjs','artwork.mjs','sequence.mjs']){const s=await readFile(`${root}/${file}`,'utf8');assert(!/Math\.random|Date\.now|requestAnimationFrame|setInterval/.test(s),file)}
