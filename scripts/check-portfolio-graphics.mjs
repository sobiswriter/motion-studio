import assert from 'node:assert/strict';
import {drawOpening,drawClosing,drawChapter,graphicTimings} from '../src/projects/portfolio-film/graphics.mjs';

function context(){
  let depth=0,paints=0;const text=[],rectangles=[];
  const c={font:'',save:()=>depth++,restore:()=>{depth--;assert(depth>=0)},setLineDash:()=>{},measureText:s=>({width:s.length*105})};
  for(const name of ['setTransform','fillRect','beginPath','moveTo','lineTo','stroke','arc','fill','rect','clip','translate','scale','rotate'])c[name]=(...args)=>{assert(args.every(a=>typeof a!=='number'||Number.isFinite(a)),`${name} received non-finite geometry`);if(name==='fill'||name==='fillRect')paints++;if(name==='rect')rectangles.push(args)};
  c.fillText=(s,...args)=>{assert(args.every(Number.isFinite));text.push(s);paints++};
  return {c,check:()=>{assert.equal(depth,0);assert(paints>0)},text,rectangles};
}
let sampled=0;
for(const [draw,d]of [[drawOpening,6],[drawClosing,10]]){
  for(let frame=0;frame<=d*60;frame++){
    const q=context();draw(q.c,frame/60);q.check();sampled++;
  }
  assert.throws(()=>draw(context().c,NaN),/finite/);
  const q=context();draw(q.c,d);q.check();
  assert(q.text.some(s=>s.includes('Souradip')||s.includes('SOURADIP')||s.includes('A PERSONAL')));
}
for(const id of ['work','ai','tools','human']){
  for(let frame=0;frame<=240;frame++){const q=context();drawChapter(q.c,id,frame/60);q.check();sampled++;}
  assert(graphicTimings.chapters[id].lands.at(-1)<3);
}
assert.throws(()=>drawChapter(context().c,'unknown',0),/Unknown chapter/);
const ai=context();drawChapter(ai.c,'ai',2);assert.equal(ai.rectangles.length,3);
const rows=ai.rectangles.sort((a,b)=>a[1]-b[1]);
for(let j=1;j<rows.length;j++)assert(rows[j-1][1]+rows[j-1][3]<=rows[j][1],'AI word clip rows must not overlap');
const closure=context();drawClosing(closure.c,4.25);assert(closure.text.includes('Souradip'));
const close=context();drawClosing(close.c,10);assert(close.text.includes('sobi.codes'));
assert.equal(graphicTimings.opening.duration,6);assert.equal(graphicTimings.closing.duration,10);
console.log(`Portfolio graphics: ${sampled} sampled frames have finite geometry, balanced state and nonempty paint; four chapters and final identity/URL present.`);
