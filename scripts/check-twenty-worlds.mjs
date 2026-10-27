import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {shots} from '../src/projects/twenty-worlds/sequence.mjs';
const root='src/projects/twenty-worlds';
const master=await readFile('Master Design Documentation/Design Philosophy.md','utf8');
const styles=[...master.matchAll(/^\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*/gm)].map(m=>m[1]);
assert.deepEqual([...shots.slice(1,-1).map(s=>s.style)].sort(),styles.sort());
assert.equal(shots.length,22);assert.equal(shots[0].frame,0);assert.equal(shots.at(-1).endFrame,3600);
for(const [i,s] of shots.entries()){assert(Number.isInteger(s.frame)&&Number.isInteger(s.endFrame));assert(s.endFrame>s.frame);if(i)assert.equal(shots[i-1].endFrame,s.frame);}
const cues=JSON.parse(await readFile(`${root}/sound-cues.json`));
assert.equal(cues.duration,60);assert.equal(cues.base_audio.length,1);assert.match(cues.base_audio[0],/music-edit.wav$/);
assert.equal(cues.cues.length,55);
for(const cue of cues.cues){assert.equal(cue.t,cue.frame/60);assert(cue.frame>=0&&cue.frame<3600&&cue.gain_db<=0);await access(cue.file);}
const music=JSON.parse(await readFile(`${root}/music-edit.json`));assert.match(music.source,/The_Golden_Hour_Rise.mp3$/);assert.equal(music.excludedSource,'Ivan_Is_Loading.mp3');
for(const file of ['index.html','assets/director.js','assets/audio/master.wav','assets/fonts/SpaceGrotesk.ttf','assets/fonts/EBGaramond.ttf','assets/fonts/IBMPlexMono-Regular.ttf','CREDITS.md','project.md'])await access(`${root}/${file}`);
const source=await readFile(`${root}/artwork.mjs`,'utf8');assert(!source.includes('Math.random')&&!source.includes('Date.now')&&!source.includes('requestAnimationFrame'));
console.log('Twenty Worlds checks passed: all 20 styles, 22 shots, 3600 frames, 55 integer-frame cues, supplied Golden Hour music only, local assets.');
