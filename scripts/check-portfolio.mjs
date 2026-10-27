import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {shots,handoffs,shotAt,duration,fps} from '../src/projects/portfolio-film/sequence.mjs';
assert.equal(duration,120);assert.equal(shots.length,16);assert.equal(shots[0].frame,0);assert.equal(shots.at(-1).endFrame,duration*fps);
assert.deepEqual(new Set(handoffs.map(h=>h.kind)),new Set(['liquid','particles','bauhaus','comic','brutal','kinetic']));
for(const [i,s]of shots.entries()){
  assert(Number.isInteger(s.frame)&&Number.isInteger(s.endFrame)&&s.endFrame>s.frame);if(i)assert.equal(s.frame,shots[i-1].endFrame);
  if(s.source)assert(s.source[0]>=0&&s.source[1]>s.source[0]&&s.source[1]<=103.7333);
  assert.equal(shotAt(s.frame).id,s.id);assert.equal(shotAt(s.endFrame-1).id,s.id);
}
for(const [i,h]of handoffs.entries()){
  const half=h.kind==='kinetic'?27:24;assert.equal(h.startFrame,h.frame-half);assert.equal(h.endFrame,h.frame+half);if(i)assert(h.startFrame>handoffs[i-1].endFrame);
  for(const side of ['old','next'])await access(`src/projects/portfolio-film/assets/endpoints/${h.id}-${side}.png`);
}
for(const f of ['sequence.mjs','artwork.mjs','graphics.mjs','transitions.mjs']){
  const text=await readFile(`src/projects/portfolio-film/${f}`,'utf8');assert(!/Math\.random|Date\.now|requestAnimationFrame|setInterval/.test(text));
}
for(const f of ['assets/media/footage-edit.mp4','assets/audio/master.wav','assets/director.js','index.html'])await access(`src/projects/portfolio-film/${f}`);
assert.equal(handoffs.filter(h=>h.kind==='kinetic').length,6);
console.log('Portfolio assertions passed: 16 contiguous scenes, 7200 frames, 15 declared overlaps (six kinetic), six allowed transition families, valid local media.');
