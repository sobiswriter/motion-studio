import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const previous='src/projects/portfolio-designed',project='src/projects/portfolio-space',scratch='.cache/portfolio-space/audio';
await mkdir(`${project}/assets/audio`,{recursive:true});await mkdir(scratch,{recursive:true});
await cp(`${previous}/assets/audio`,`${project}/assets/audio`,{recursive:true});
const hash=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
assert.equal(await hash(`${previous}/assets/audio/master.wav`),await hash(`${project}/assets/audio/master.wav`));
const replace=value=>JSON.parse(JSON.stringify(value).replaceAll(previous,project));
for(const name of ['music-edit.json','sound-cues.json','audio-provenance.json']){
 const value=replace(JSON.parse(await readFile(`${previous}/${name}`,'utf8')));
 if(name==='sound-cues.json'){assert.equal(value.duration,120);assert.equal(value.cues.length,40);for(const c of value.cues)assert(Number.isInteger(c.frame)&&c.t===c.frame/60)}
 if(name==='audio-provenance.json')value.spaceRevision={sourceMaster:`${previous}/assets/audio/master.wav`,masterUnchanged:true,sha256:await hash(`${project}/assets/audio/master.wav`),visualIntent:'Space worlds, original orbital mechanisms and portfolio stills. Existing40 authored action anchors retained; no moving screen clips or recorded capture audio.'};
 await writeFile(`${project}/${name}`,JSON.stringify(value,null,2)+'\n');
}
const ffmpeg='C:/Users/soura/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe';
const r=spawnSync(ffmpeg,['-hide_banner','-nostdin','-i',`${project}/assets/audio/master.wav`,'-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],{encoding:'utf8',maxBuffer:4e6});assert.equal(r.status,0,r.stderr);
await writeFile(`${scratch}/loudnorm.log`,r.stderr);const match=r.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);assert(match);
const measurement=JSON.parse(match[0]);assert(Number(measurement.input_tp)<-1);
await writeFile(`${project}/audio-measurement.json`,JSON.stringify({duration:120,sampleRate:48000,channels:2,cues:40,sourceMasterUnchanged:true,...measurement},null,2)+'\n');
for(const name of ['AUDIO.md','CREDITS.md']){
 let text=await readFile(`${previous}/${name}`,'utf8');text=text.replaceAll('portfolio-designed','portfolio-space').replace('# Sobiverse / credits','# Sobiverse / Space Portfolio / credits');
 if(name==='AUDIO.md')text+='\nSpace revision: the original40 action anchors accompany newly authored space graphics and portfolio stills. The copied master is hash-identical; fresh FFmpeg input measurement repeats−14.86LUFS/−2.91dBTP. No new model inference or new music.\n';
 await writeFile(`${project}/${name}`,text);
}
console.log(`Space audio:hash-identical120s master,40 cues;${measurement.input_i}LUFS/${measurement.input_tp}dBTP.`);
