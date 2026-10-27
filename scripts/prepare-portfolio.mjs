import {mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import {shots,handoffs,fps,duration} from '../src/projects/portfolio-film/sequence.mjs';
const ff='C:/Users/soura/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe',probe=ff.replace('ffmpeg.exe','ffprobe.exe');
const project='src/projects/portfolio-film',cache='.cache/portfolio-film',source='assets/Portfolio/portfolio-screen-recording-2026-10-26.mp4';
for(const d of [cache,`${project}/assets/media`,`${project}/assets/audio`,`${project}/assets/endpoints`,'out/portfolio-film'])await mkdir(d,{recursive:true});
function run(cmd,args){const r=spawnSync(cmd,args,{encoding:'utf8',maxBuffer:4e6});if(r.status!==0)throw new Error(r.stderr||r.stdout||`Failed ${cmd}`);return r.stdout;}
assert.equal(shots.at(-1).endFrame,duration*fps);
const only=process.argv[2];assert(!only||shots.some(s=>s.id===only),'Unknown source segment');
for(const [i,s]of shots.entries()){
  assert.equal(s.frame,i?shots[i-1].endFrame:0);const frames=s.endFrame-s.frame;assert(frames>0);
  if(only&&s.id!==only)continue;
  const target=`${cache}/${String(i).padStart(2,'0')}-${s.id}.mp4`;
  const input=s.source?['-ss',String(s.source[0]),'-t',String(s.source[1]-s.source[0]),'-i',source]:['-f','lavfi','-i','color=c=0x080d12:s=1920x1080:r=60'];
  // shortcut: screen-capture motion plays at no less than 0.6x; longer proof shots use a deliberate moving read hold.
  const speed=s.source?Math.max(.6,(s.source[1]-s.source[0])/(s.end-s.start)):1;
  let crop='';if(s.crop){const[x,y,w,h]=s.crop;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=1918&&y+h<=1078);crop=`crop=${w}:${h}:${x}:${y},`;}
  const fit=s.fit==='proof'?'scale=1728:700:flags=lanczos:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:110:color=0x080d12':'scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080';
  const [cx,cy]=s.anchor??[960,540],zoom=s.zoom??1.055;
  const filter=`${crop}setpts=(PTS-STARTPTS)/${speed},${fit},setsar=1,fps=60,tpad=stop_mode=clone:stop_duration=${s.end-s.start},zoompan=z='1.015+${zoom-1.015}*(0.5-0.5*cos(PI*min(1,on/${frames})))':d=1:x='min(max(${cx}-iw/zoom/2,0),iw-iw/zoom)':y='min(max(${cy}-ih/zoom/2,0),ih-ih/zoom)':s=1920x1080:fps=60`;
  run(ff,['-v','error',...input,'-an','-vf',filter,'-frames:v',String(frames),'-c:v','libx264','-preset','veryfast','-crf','14','-threads','2','-pix_fmt','yuv420p','-video_track_timescale','60000','-y',target]);
  console.log(`Prepared ${s.id}: ${frames} frames, source ${s.source??'authored graphic'}, speed ${speed.toFixed(3)}x`);
}
const list=shots.map((s,i)=>`file '${resolve(`${cache}/${String(i).padStart(2,'0')}-${s.id}.mp4`).replaceAll('\\','/')}'`).join('\n');
await writeFile(`${cache}/concat.txt`,list+'\n');
run(ff,['-v','error','-f','concat','-safe','0','-i',`${cache}/concat.txt`,'-c','copy','-movflags','+faststart','-y',`${project}/assets/media/footage-edit.mp4`]);
const info=JSON.parse(run(probe,['-v','error','-show_streams','-show_format','-of','json',`${project}/assets/media/footage-edit.mp4`]));
assert.equal(Number(info.streams[0].nb_frames),duration*fps);assert.equal(Number(info.format.duration),duration);
for(const h of handoffs){
  for(const [side,frame]of [['old',h.startFrame],['next',h.endFrame]])run(ff,['-v','error','-ss',String(frame/fps),'-i',`${project}/assets/media/footage-edit.mp4`,'-frames:v','1','-y',`${project}/assets/endpoints/${h.id}-${side}.png`]);
}
await writeFile('out/portfolio-film/source-edit-probe.json',JSON.stringify(info,null,2));
console.log(`Prepared ${duration}-second footage edit and ${handoffs.length*2} exact handoff endpoint images.`);
