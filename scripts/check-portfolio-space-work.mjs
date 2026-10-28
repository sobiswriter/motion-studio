import assert from 'node:assert/strict';
import {drawSpaceWork,spaceWorkTimings} from '../src/projects/portfolio-space/space-work-scenes.mjs';

const assets=new Map(['space-nebula.jpg','frame-project.png','launchsilo.png','frame-ai.png','frame-research.png','frame-skills.png','frame-experience.png'].map(key=>[key,{width:1920,height:1080}]));
function context(){
  let depth=0,paints=0;const words=[],backgrounds=[];
  const c={save(){depth++},restore(){assert(depth>0,'Unbalanced Canvas state');depth--},setLineDash(){}};
  for(const name of ['setTransform','fillRect','strokeRect','beginPath','moveTo','lineTo','bezierCurveTo','closePath','stroke','arc','ellipse','fill','rect','clip','translate','rotate','scale'])c[name]=(...args)=>{
    assert(args.every(a=>typeof a!=='number'||Number.isFinite(a)),`${name}: non-finite geometry`);
    if(name==='arc'||name==='ellipse')assert(args[2]>=0,'Negative curve radius');
    if(name==='fillRect'||name==='fill')paints++;
  };
  c.fillText=(s,...args)=>{assert(args.every(Number.isFinite));words.push(s);paints++};
  c.createLinearGradient=c.createRadialGradient=(...args)=>{
    assert(args.every(Number.isFinite));return{addColorStop(at,color){assert(at>=0&&at<=1);assert.equal(typeof color,'string')}};
  };
  const same=ctx=>assert.equal(ctx,c,'Canvas context contract was replaced');
  const kit={
    bg(ctx,key,t){same(ctx);assert(assets.has(key),key);assert(Number.isFinite(t));backgrounds.push(key);ctx.fillRect(0,0,1920,1080)},
    image(ctx,key,x,y,w,h){same(ctx);assert(assets.has(key),key);assert([x,y,w,h].every(Number.isFinite));assert(w>0&&h>0);paints++},
    text(ctx,s,x,y,size){same(ctx);assert(size>0);ctx.fillText(s,x,y)},
    line(ctx,x,y,x2,y2){same(ctx);ctx.moveTo(x,y);ctx.lineTo(x2,y2)},
    dot(ctx,x,y,r){same(ctx);ctx.arc(x,y,r,0,Math.PI*2)},
    orbit(ctx,x,y,rx,ry,a){same(ctx);assert(ry>=0);ctx.ellipse(x,y,rx,ry,a,0,Math.PI*2)},
    stars(ctx,t){same(ctx);assert(Number.isFinite(t))},
    hud(ctx,s,t){same(ctx);assert(Number.isFinite(t));words.push(s)},
  };
  return{c,kit,words,backgrounds,check(){assert.equal(depth,0);assert(paints>0);assert(backgrounds.some(key=>key.startsWith('frame-')),'Each scene needs an actual portfolio frame world')}};
}
const lengths={project:7,'project-detail':7,ai:8,research:9,skills:9,experience:10};
let samples=0;
for(const[id,length]of Object.entries(lengths)){
  for(let frame=0;frame<=length*60;frame++){
    const q=context();assert.equal(drawSpaceWork(q.c,id,frame/60,assets,q.kit),true);q.check();samples++;
  }
  for(const t of spaceWorkTimings[id])assert(t>0&&t<length);
  const q=context();assert.throws(()=>drawSpaceWork(q.c,id,NaN,assets,q.kit),/finite/);
}
const unknown=context();assert.equal(drawSpaceWork(unknown.c,'opening',0,assets,unknown.kit),false);
const system=context();drawSpaceWork(system.c,'project-detail',6,assets,system.kit);for(const word of ['SCOPE','ESTIMATE','INVOICE'])assert(system.words.includes(word));
const ai=context();drawSpaceWork(ai.c,'ai',4,assets,ai.kit);assert(ai.words.includes('Source-cited Q&A'));assert(ai.words.includes('RETURN TO SOURCE'));
const research=context();drawSpaceWork(research.c,'research',5,assets,research.kit);assert(research.words.includes('Patent publication'));assert(research.words.includes('OCTOBER 2025'));
console.log(`Space work scenes: ${samples} finite deterministic samples; six actual frame worlds, shared kit contract, balanced state and cue landmarks checked.`);
