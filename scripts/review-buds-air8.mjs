import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const project=process.argv[4]??'src/projects/realme-buds-air8';
const {duration,handoffs}=await import(pathToFileURL(resolve(project,'sequence.mjs')).href);
const video=resolve(process.argv[2]),dir=process.argv[3];assert(dir,'Expected video and evidence directory');await mkdir(dir,{recursive:true});
const run=(tool,args)=>execFileSync(tool,args,{maxBuffer:128*1024*1024,windowsHide:true});
const probe=JSON.parse(run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',video]).toString());
const v=probe.streams.find(s=>s.codec_type==='video'),a=probe.streams.find(s=>s.codec_type==='audio');
const [num,den]=v.avg_frame_rate.split('/').map(Number),fps=num/den;
assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(Number(v.nb_frames),duration*fps);assert(Math.abs(Number(probe.format.duration)-duration)<.05);assert(a&&Number(a.sample_rate)===48000&&a.channels===2);
const sampleFrames=Array.from({length:duration*2},(_,i)=>Math.round(i*fps/2));
const select=`eq(n\\,round(round(n*2/${fps})*${fps}/2))`;
const size=480*270*3,raw=run('ffmpeg',['-v','error','-i',video,'-an','-vf',`select=${select},scale=480:270`,'-fps_mode','passthrough','-f','rawvideo','-pix_fmt','rgb24','pipe:1']);assert.equal(raw.length,size*duration*2);
const samples=sampleFrames.map((f,i)=>({input:raw.subarray(i*size,(i+1)*size),label:`${(f/fps).toFixed(3)} s / f${f}`}));
async function sheets(items,prefix){const paths=[];for(let start=0;start<items.length;start+=20){const batch=items.slice(start,start+20),parts=[];for(let i=0;i<batch.length;i++){parts.push({input:await sharp(batch[i].input,{raw:{width:480,height:270,channels:3}}).png().toBuffer(),left:i%4*480,top:Math.floor(i/4)*300});parts.push({input:Buffer.from(`<svg width="480" height="30"><rect width="480" height="30" fill="#101214"/><text x="12" y="22" fill="white" font-family="Arial" font-size="18">${batch[i].label}</text></svg>`),left:i%4*480,top:Math.floor(i/4)*300+270})}const file=`${dir}/${prefix}-${String(start/20+1).padStart(2,'0')}.jpg`;await sharp({create:{width:1920,height:Math.ceil(batch.length/4)*300,channels:3,background:'#101214'}}).composite(parts).jpeg({quality:88}).toFile(file);paths.push(file)}return paths}
const sheetPaths=await sheets(samples,'half-second'),boundaries=[];
for(const h of handoffs){const start=h.frame/60-2/fps,b=run('ffmpeg',['-v','error','-ss',String(start),'-i',video,'-an','-frames:v','5','-vf','scale=480:270','-f','rawvideo','-pix_fmt','rgb24','pipe:1']);assert.equal(b.length,size*5);for(let i=0;i<5;i++)boundaries.push({input:b.subarray(i*size,(i+1)*size),label:`${h.kind} / ${(start+i/fps).toFixed(3)} s`})}
sheetPaths.push(...await sheets(boundaries,'boundaries'));
const luma=run('ffmpeg',['-v','error','-i',video,'-an','-vf','scale=160:90','-f','rawvideo','-pix_fmt','gray','pipe:1']),pixels=160*90;assert.equal(luma.length,pixels*duration*fps);
let longest=0,identical=0,minMean=255,maxMean=0;const changes=[];
for(let frame=0;frame<duration*fps;frame++){let sum=0,squares=0;for(let i=0;i<pixels;i++){const at=frame*pixels+i;sum+=luma[at];if(frame)squares+=(luma[at]-luma[at-pixels])**2}const mean=sum/pixels;minMean=Math.min(minMean,mean);maxMean=Math.max(maxMean,mean);if(frame){const rms=Math.sqrt(squares/pixels);changes.push(rms);identical=rms===0?identical+1:0;longest=Math.max(longest,identical)}}
assert(minMean>1,'Black/dead encoded frame');
await writeFile(`${dir}/coverage.json`,JSON.stringify({video,fps,frames:Number(v.nb_frames),duration,halfSecondSamples:samples.length,sampleFrames,boundarySamples:boundaries.length,sheets:sheetPaths,probe},null,2));
await writeFile(`${dir}/pixel-motion.json`,JSON.stringify({framesDecoded:duration*fps,longestIdenticalRunSeconds:longest/fps,minFrameMean:minMean,maxFrameMean:maxMean,rmsMean:changes.reduce((a,b)=>a+b,0)/changes.length,adjacentFrameRms:changes,note:'Every decoded frame compared at160x90 luma; pixel motion is not a subjective energy or listening judgement.'},null,2));
assert(longest/fps<.5,`Unexpected frozen encoded interval: ${longest/fps}s; see pixel-motion.json`);
console.log(`${samples.length} half-second + ${boundaries.length} boundary samples / ${sheetPaths.length} sheets; ${duration*fps} decoded frames, longest identical run ${longest/fps}s.`);
