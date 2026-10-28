import assert from 'node:assert/strict';
import {drawWorkScene,workSceneTimings} from '../src/projects/portfolio-designed/work-scenes.mjs';

function context(){
  let depth=0,paints=0;const strings=[];
  const c={save(){depth++},restore(){assert(depth>0);depth--},setLineDash(){}};
  for(const name of ['setTransform','fillRect','strokeRect','beginPath','moveTo','lineTo','bezierCurveTo','stroke','arc','fill','rect','clip','translate','rotate'])c[name]=(...args)=>{
    assert(args.every(a=>typeof a!=='number'||Number.isFinite(a)),`${name}: non-finite geometry`);
    if(name==='arc')assert(args[2]>=0,'Negative arc radius');
    if(name==='fillRect'||name==='fill')paints++;
  };
  c.fillText=(s,...args)=>{assert(args.every(Number.isFinite));strings.push(s);paints++};
  c.drawImage=(_image,...args)=>{assert(args.every(Number.isFinite));paints++};
  return{c,strings,check(){assert.equal(depth,0);assert(paints>0)}};
}
const images=new Map([['launchsilo.png',{width:1270,height:714}]]);
const durations={project:7,'project-detail':7,ai:8,research:9,skills:9,experience:10};
let samples=0;
for(const[id,duration]of Object.entries(durations)){
  for(let frame=0;frame<=duration*60;frame++){
    const q=context();assert.equal(drawWorkScene(q.c,id,frame/60,images),true);q.check();samples++;
  }
  for(const t of workSceneTimings[id])assert(t>=0&&t<duration);
  assert.throws(()=>drawWorkScene(context().c,id,NaN,images),/finite/);
}
assert.equal(drawWorkScene(context().c,'opening',0,images),false);
assert.throws(()=>drawWorkScene(context().c,'project',4.6,new Map()),/Missing LaunchSILO/);
const details=context();drawWorkScene(details.c,'project-detail',5.3,images);for(const s of ['SCOPE','ESTIMATE','INVOICE','CMS & INVOICING'])assert(details.strings.includes(s));
const ai=context();drawWorkScene(ai.c,'ai',3.5,images);for(const s of ['LegalLM','Document Q&A','RETURN TO SOURCE'])assert(ai.strings.includes(s));
const experience=context();drawWorkScene(experience.c,'experience',9,images);for(const s of ['Team Vortiq','Advitiya'])assert(experience.strings.includes(s));
console.log(`Designed work scenes: ${samples} deterministic samples; finite geometry, balanced state, source facts and exact cue landmarks checked.`);
