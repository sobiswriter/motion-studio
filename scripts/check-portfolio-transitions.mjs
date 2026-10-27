import assert from 'node:assert/strict';
import {createTransitions} from '../src/projects/portfolio-film/transitions.mjs';
const kinds=['liquid','particles','bauhaus','comic','brutal','kinetic'];
const old={width:1920,height:1080,id:'old'},next={width:1920,height:1080,id:'next'};
const calls=[];let depth=0;
const finite=args=>{for(const arg of args)if(typeof arg==='number')assert(Number.isFinite(arg),'Non-finite canvas coordinate')};
const c=new Proxy({}, {get:(_,name)=>{
 if(name==='createLinearGradient')return(...args)=>{finite(args);return{addColorStop:(...values)=>finite(values)}};
 return(...args)=>{finite(args);if(name==='save')depth++;if(name==='restore')depth--;assert(depth>=0);calls.push([name,...args])};
},set:(_,name,value)=>{if(typeof value==='number')assert(Number.isFinite(value),`Non-finite ${String(name)}`);return true}});
const draw=createTransitions();
for(const kind of kinds){
 for(const p of [0,.001,.12,.28,.44,.5,.57,.7,.88,.999,1]){
  calls.length=0;draw(c,old,next,kind,p,{word:'CURIOUS',words:['IDEAS','INTO','REALITY.']});assert.equal(depth,0);
  const images=calls.filter(call=>call[0]==='drawImage');assert(images.length>0);
  if(p===0||p===1){assert.equal(images.length,1);assert.equal(images[0][1],p===0?old:next);assert.deepEqual(images[0].slice(2),[0,0,1920,1080]);}
 }
}
for(const p of [NaN,Infinity,-Infinity])assert.throws(()=>draw(c,old,next,'liquid',p),/finite/);
for(const word of ['WORK','THINK','BEYOND','STILL','NEXT'])for(const variant of [undefined,'plate','lines','wordwipe'])for(const p of [.001,.25,.49,.5,.51,.75,.999]){
 draw(c,old,next,'kinetic',p,{word,variant});assert.equal(depth,0);
}
for(const p of [.49,.51]){
 calls.length=0;draw(c,old,next,'liquid',p);
 const band=calls.find(call=>call[0]==='rect'&&call[3]===480);assert(band);
 assert(band[1]>=1920||band[1]+band[3]<=0,'Reflection must leave the canvas during the full-cover source swap');
}
for(const word of ['NEXT','NEXT.','NEXT?!']){
 calls.length=0;draw(c,old,next,'kinetic',.5,{word});
 assert.equal(calls.filter(call=>call[0]==='drawImage').length,2,'NEXT punctuation must retain the glyph portal');
 assert(calls.find(call=>call[0]==='fillRect')[1]>0,'NEXT punctuation must retain the right-to-left direction');
 assert(calls.some(call=>call[0]==='fillText'&&call[1]===word),'Display punctuation must be preserved');
}
calls.length=0;draw(c,old,next,'kinetic',.5,{word:'SYSTEMS'});
assert.equal(calls.find(call=>call[0]==='fillText')[4],1920*.96,'Long plate words must fit inside the frame');
assert.throws(()=>draw(c,old,next,'kinetic',.5,{variant:'vhs'}),/Unknown kinetic/);
assert.throws(()=>draw(c,old,next,'vhs',.5),/Unknown/);
assert.throws(()=>draw(c,null,next,'liquid',.5),/both scene canvases/);
console.log('Six portfolio transition paths: exact endpoints, finite coordinates, balanced canvas state, invalid-input guards.');
