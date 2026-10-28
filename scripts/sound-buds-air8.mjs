import {mkdir,copyFile,readFile,writeFile,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {basename} from 'node:path';
import assert from 'node:assert/strict';

const project='src/projects/realme-buds-air8',audio=`${project}/assets/audio`,work='.cache/realme-buds-air8/audio';
const source='assets/Music/Glass_and_Alloy.mp3',bank='src/projects/style-showreel-v2/assets/audio/effects';
const run=(file,args)=>{const r=spawnSync(file,args,{encoding:'utf8',maxBuffer:8e6});assert.equal(r.status,0,r.stderr||r.stdout);return r;};
const json=async(path,value)=>writeFile(path,JSON.stringify(value,null,2)+'\n');
for(const folder of [audio,`${audio}/effects`,`${audio}/effects/slices`,work])await mkdir(folder,{recursive:true});
await access(source);
run('ffmpeg',['-hide_banner','-v','error','-nostdin','-y','-i',source,'-af','atrim=15:60,asetpts=PTS-STARTPTS,aresample=48000,volume=-5.5dB,afade=t=in:d=0.01,afade=t=out:st=44.5:d=0.5,apad=whole_dur=45,atrim=0:45','-ac','2','-ar','48000','-c:a','pcm_s24le',`${audio}/music.wav`]);

const cues=[];
function cue(t,label,file,role,gain,extra={}){const frame=Math.round(t*60);cues.push({t:frame/60,frame,label,file:`${audio}/effects/${file}`,role,gain_db:gain,anchor:'peak',...extra});}
const knock={slice:[0,.18],highpass:150,fade_out:.045};
const key={slice:[.004,.081],fade_out:.008};
const shutter={slice:[.464,.051],highpass:200,fade_out:.008};
cue(.8,'Opening / light contour finds the product','shutter.mp3','camera',-8,shutter);
cue(2,'Opening / IN FOCUS lands','wood.mp3','hit',-9,knock);
cue(3.65,'Case contour expands into the hero','mesh-swell.wav','whoosh',-5);
cue(4.25,'Real product and identity settle','hit_1.wav','hit',-10);
cue(7.65,'Registered earbud crop enters the ANC field','whoosh-short_1.wav','whoosh',-7);
cue(8.15,'Up to55dB claim locks','keyboard.mp3','click',-2,key);
cue(14.65,'ANC field becomes the first driver field','particle-breath.wav','whoosh',-6);
cue(15.4,'11mm+6mm paired fields resolve','tock_1.wav','hit',-11);
cue(17,'Driver fields acquire depth','wood.mp3','hit',-12,{...knock,pitch:-2});
cue(21.65,'Driver contour becomes the playback arc','whoosh-short_2.wav','whoosh',-6);
cue(22.25,'Up to58 hours numeral locks','block-punch.wav','hit',-9);
cue(28.65,'Typography curtain clears upward','type-flick.wav','whoosh',-5);
cue(29.25,'Resistance graphic ripple forms','liquid-bubble.wav','water',-1);
cue(32.9,'Ripple contracts into a connection path','flap-curtain.wav','whoosh',-8);
cue(33.65,'Product connection world opens','mesh-swell.wav','whoosh',-6);
cue(34.25,'First device path activates','keyboard.mp3','ui',-3,key);
cue(36,'Next device path activates','keyboard.mp3','ui',-4,{...key,pitch:1});
cue(38.65,'Connection paths gather into the product contour','aperture-servo.wav','whoosh',-5);
cue(39.5,'Final hero returns from the macro recap','shutter.mp3','camera',-10,shutter);
cue(41.5,'Find your frequency / final product lockup','signature-swell.wav','whoosh',-7);
assert.equal(cues.length,20);
assert(cues.every((c,i)=>Number.isInteger(c.frame)&&c.frame>=0&&c.frame<2700&&c.t===c.frame/60&&(!i||c.frame>cues[i-1].frame)&&c.gain_db<=0));
const recordings={'wood.mp3':'sfx_003.mp3','keyboard.mp3':'sfx_001.mp3','shutter.mp3':'sfx_004.mp3'};
for(const name of new Set(cues.map(c=>c.file.split('/').at(-1))))await copyFile(recordings[name]?`assets/sfx/.media/audio/sfx/${recordings[name]}`:`${bank}/${name}`,`${audio}/effects/${name}`);
const sheet={duration:45,keep_audio:'yes',base_audio:[`${audio}/music.wav`],music_ref:`${audio}/music.wav`,cues};
await json(`${audio}/cues.json`,sheet);
const mix=run(process.execPath,['scripts/audio-tool.mjs','real-sfx','mix',`${audio}/cues.json`,'--out',`${work}/mix.wav`,'--no-loudnorm','--no-tonal-fit','--no-level-roles','--no-match-layer','--ceiling-db','-2']);
await writeFile(`${work}/mix.log`,mix.stdout+'\n'+mix.stderr);
await copyFile(`${work}/mix_mix.wav`,`${audio}/master.wav`);
await copyFile(`${work}/mix_sfx_track.wav`,`${audio}/effects.wav`);
const resolved=JSON.parse(await readFile(`${work}/mix_resolved_cues.json`,'utf8'));
assert.equal(resolved.cues.length,cues.length);
assert(resolved.cues.every(c=>c.file&&!c.uisfx));
for(const c of resolved.cues){
 c.frame=Math.round(c.t*60);assert.equal(c.t,c.frame/60);assert(c.start>=0&&c.start+c.seg<=45);
 if(c.file.includes('_slices')){const stable=`${audio}/effects/slices/${basename(c.file)}`;await copyFile(c.file,stable);c.file=stable;}
}
resolved.delivery_audio=`${audio}/master.wav`;
resolved.delivery_note='Master already includes all20 cues. Do not layer these cues or music.wav over it.';
await json(`${audio}/resolved-cues.json`,resolved);
await copyFile(`${work}/mix_cue_report.md`,`${audio}/cue-report.md`);
const critique=run(process.execPath,['scripts/audio-tool.mjs','real-sfx','critique',`${work}/mix_resolved_cues.json`,`${work}/mix_sfx_track.wav`,'--out',`${audio}/critique.md`]);
await writeFile(`${work}/critique.log`,critique.stdout+'\n'+critique.stderr);
const measurement={tool:'FFmpeg loudnorm input measurements',date:'2026-10-27',duration:45,cues:cues.length};
for(const name of ['music','effects','master']){
 const path=`${audio}/${name}.wav`,p=JSON.parse(run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',path]).stdout);
 assert.equal(Number(p.format.duration),45);assert.equal(p.streams[0].sample_rate,'48000');assert.equal(p.streams[0].channels,2);
 const meter=run('ffmpeg',['-hide_banner','-nostdin','-i',path,'-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-']);
 const m=meter.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);assert(m);measurement[name]=JSON.parse(m[0]);
 measurement[name].sha256=createHash('sha256').update(await readFile(path)).digest('hex');
}
assert(Number(measurement.master.input_tp)<-1.5);assert(Number(measurement.master.input_i)>-20&&Number(measurement.master.input_i)<-12);
run('ffmpeg',['-v','error','-nostdin','-y','-i',`${audio}/master.wav`,'-c:a','aac','-b:a','256k',`${work}/aac-check.m4a`]);
const encoded=run('ffmpeg',['-hide_banner','-nostdin','-i',`${work}/aac-check.m4a`,'-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-']).stderr.match(/\{\s*"input_i"[\s\S]*?\}/);assert(encoded);
measurement.aac256kCheck=JSON.parse(encoded[0]);assert(Number(measurement.aac256kCheck.input_tp)<-1.5);
await json(`${audio}/measurement.json`,measurement);
const manifest=(await readFile('assets/sfx/.media/manifest.jsonl','utf8')).trim().split(/\r?\n/).map(x=>JSON.parse(x)).filter(x=>['sfx_001','sfx_003','sfx_004'].includes(x.id));
const material=JSON.parse(await readFile('src/projects/style-showreel-v2/material-accents.json','utf8')).filter(x=>cues.some(c=>c.file.endsWith(`/${x.name}.wav`)));
await json(`${audio}/provenance.json`,{music:{source,sourceInterval:[15,60],outputInterval:[0,45],gainDb:-5.5,fadeInSeconds:.01,fadeOut:[44.5,45],originalUnchanged:true,authorshipAndDistributionRights:'User-supplied; not independently established'},recordings:manifest,procedural:{sourceBank:bank,lock:`${bank}/source-kit.lock.json`,materialEffects:material,note:'Existing local earshot effects reused; no new synthesis or music generation. Historical model/recipe checks are not fresh listening.'},placement:'Real SFX explicit-file audio-only mix; no uisfx or automatic source selection; no beat snapping. Master contains music and all20 effects exactly once.',toolStatus:{realSfx:'Four-file recorded index rebuilt; explicit-file mix and critique completed.',earshot:'Doctor failed: No module named earshot. A cached source checkout exists, but the deleted scientific Python/model environment was not restored; fresh FFmpeg measurement is the fallback.'},meaning:'Editorial sound design, not recordings of actual product mechanics or an ANC performance test.',measurement});
console.log(`Buds Air8 master ready:45s stereo48kHz,20 cues,${measurement.master.input_i}LUFS,${measurement.master.input_tp}dBTP,LRA${measurement.master.input_lra}.`);
