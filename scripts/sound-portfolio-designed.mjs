import {mkdir,copyFile,readFile,writeFile,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const previous='src/projects/portfolio-film',project='src/projects/portfolio-designed';
const audio=`${project}/assets/audio`,scratch='.cache/portfolio-designed/audio';
const ffmpeg='C:/Users/soura/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe';
for(const path of [`${audio}/effects`,scratch])await mkdir(path,{recursive:true});
const sheet=JSON.parse(await readFile(`${previous}/sound-cues.json`,'utf8'));
assert.equal(sheet.duration,120);assert.equal(sheet.cues.length,40);
const labels=[
 'Opening / first constructed word locks',
 'Opening / Souradip Biswas identity lands',
 'Opening / curiosity signal expands',
 'Particles / the authored universe opens',
 'Liquid / the curiosity signal becomes the overview',
 'Kinetic / WORK fills the frame',
 'Ideas / first phrase settles',
 'Built for the real world / final phrase lands',
 'Bauhaus / LaunchSILO composition locks',
 'LaunchSILO / project evidence print settles',
 'Kinetic / SYSTEMS opens the architecture',
 'Project detail / scope resolves',
 'Project detail / estimate resolves',
 'Project detail / invoice resolves',
 'Kinetic / THINK begins the test-build passage',
 'AI / THINK becomes a row',
 'AI / TEST becomes a row',
 'AI / BUILD completes the stack',
 'Brutal / questions become AI experiments',
 'AI / the experiment artifact settles',
 'Comic / research dossier unfolds',
 'Research / evidence notes settle',
 'Kinetic / BEYOND fills the frame',
 'Tools / know the tools phrase resolves',
 'Tools / build beyond them lands',
 'Bauhaus / skill structure locks',
 'Skills / language and tool structure resolves',
 'Particles / the experience ledger opens',
 'Experience / first ledger entry settles',
 'Experience / next ledger entry settles',
 'Liquid / the work becomes a person',
 'Person / portrait print settles',
 'Person / curiosity artifact turns',
 'Kinetic / STILL opens the human chapter',
 'Human / STILL BECOMING settles',
 'Brutal / the authored invitation opens',
 'Kinetic / NEXT becomes an invitation',
 'Closing / let us build what is next resolves',
 'Closing / Souradip Biswas identity settles',
 'Closing / sobiverse.ai.studio resolves',
];
assert.equal(labels.length,sheet.cues.length);
const copied=new Set();
for(const [i,cue]of sheet.cues.entries()){
 assert.equal(cue.t,cue.frame/60);assert(Number.isInteger(cue.frame)&&cue.frame>=0&&cue.frame<7200);
 await access(cue.file);
 const filename=cue.file.split('/').at(-1);
 if(!copied.has(filename)){await copyFile(cue.file,`${audio}/effects/${filename}`);copied.add(filename);}
 cue.file=`${audio}/effects/${filename}`;cue.label=labels[i];
}
for(const file of ['master.wav','music-edit.wav']){
 await copyFile(`${previous}/assets/audio/${file}`,`${audio}/${file}`);
 const digest=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
 assert.equal(await digest(`${audio}/${file}`),await digest(`${previous}/assets/audio/${file}`));
}
const run=(file,args)=>{const r=spawnSync(file,args,{encoding:'utf8',maxBuffer:4e6});assert.equal(r.status,0,r.stderr||r.stdout);return r;};
const probe=JSON.parse(run(ffmpeg.replace('ffmpeg.exe','ffprobe.exe'),['-v','error','-show_format','-show_streams','-of','json',`${audio}/master.wav`]).stdout);
assert.equal(Number(probe.format.duration),120);assert.equal(probe.streams[0].sample_rate,'48000');assert.equal(probe.streams[0].channels,2);
const meter=run(ffmpeg,['-hide_banner','-nostdin','-i',`${audio}/master.wav`,'-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-']);
await writeFile(`${scratch}/loudnorm.log`,meter.stderr);
const match=meter.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);assert(match,'FFmpeg loudness measurement missing');
const measured=JSON.parse(match[0]);assert(Number(measured.input_tp)<-1);assert(Number(measured.input_i)>-18&&Number(measured.input_i)<-12);
const music=JSON.parse(await readFile(`${previous}/music-edit.json`,'utf8'));
music.rawFootageAudio='No source-video clips or their audio are used. The recording is an information/still-frame source only; no narration.';
sheet.music_ref=`${audio}/music-edit.wav`;sheet.base_audio=[sheet.music_ref];
sheet.delivery_audio=`${audio}/master.wav`;
sheet.delivery_note='The delivery master already includes these40 effects. Attach only master.wav; never layer this cue sheet or music-edit.wav over it.';
const provenance=JSON.parse(await readFile(`${previous}/audio-provenance.json`,'utf8'));
provenance.music=music;provenance.sourceAudio=music.rawFootageAudio;
provenance.revision={project:'portfolio-designed',strategy:'Reused the original PCM music/effects mix byte-for-byte. New authored visual actions retain all40 cue anchors.',sourceMaster:`${previous}/assets/audio/master.wav`,sha256:createHash('sha256').update(await readFile(`${audio}/master.wav`)).digest('hex'),unchangedAudio:true,measurement:{tool:'FFmpeg loudnorm input measurement',date:'2026-10-27',...measured},historicalEvidence:'candidateReview and materialEffects retain prior model/recipe readings; those model checks were not repeated for this revision.'};
provenance.mix='One previously completed Real SFX placement/mix, reused as the delivery master. No second effects layer or uisfx selection.';
for(const [file,value]of [['music-edit.json',music],['sound-cues.json',sheet],['audio-provenance.json',provenance],['audio-measurement.json',{duration:120,sampleRate:48000,channels:2,codec:probe.streams[0].codec_name,cues:sheet.cues.length,uniqueEffects:copied.size,...measured,sourceMasterUnchanged:true}]])await writeFile(`${project}/${file}`,JSON.stringify(value,null,2)+'\n');
console.log(`Portfolio-designed audio ready:120s stereo48kHz,40 cues,${copied.size} files; ${measured.input_i}LUFS,${measured.input_tp}dBTP,LRA${measured.input_lra}.`);
