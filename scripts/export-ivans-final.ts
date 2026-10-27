import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { bundle } from "@remotion/bundler";
import { getCompositions, openBrowser, renderMedia, renderStill } from "@remotion/renderer";
import sharp from "sharp";
import { ivansEscape } from "../src/projects/ivans-escape/film";
import { validateAssets } from "./validate-assets";

async function main(){
  await validateAssets(ivansEscape);
  const folder="out/ivans-escape/final-pass03",output="out/ivans-escape/IvansEscape-Final-1080p.mp4";
  await mkdir(`${folder}/stills`,{recursive:true});
  const inspect=process.argv.includes("--inspect");
  if(!inspect)assert.equal(await access(output).then(()=>true,()=>false),false,"Final already exists; preserve it before another export");
  const serveUrl=await bundle({entryPoint:resolve("src/index.ts")}),chromiumOptions={gl:"angle" as const};
  let browser=await openBrowser("chrome",{chromiumOptions});
  const errors:string[]=[];
  try{
    const comps=await getCompositions(serveUrl,{puppeteerInstance:browser,chromiumOptions,port:3102});
    const composition=comps.find(c=>c.id==="IvansEscape")!;
    assert.equal(composition.durationInFrames,1800);assert.equal(composition.fps,30);
    const common={serveUrl,composition,chromiumOptions,port:3102,timeoutInMilliseconds:120000,onBrowserLog:(l:{type:string;text:string})=>{if(l.type==="error")errors.push(l.text);}};
    if(inspect){
      const frames=[359,360,367,368,430,437,454,479,583,599,649,654,668,687,1012,1029,1030,1045,1062,1076,1078,1080,1082,1109,1214,1236,1259,1273,1294,1345];
      for(const frame of [...frames].reverse())await renderStill({...common,puppeteerInstance:browser,frame,scale:1/3,imageFormat:"png",output:`${folder}/stills/${frame}.png`});
      await renderStill({...common,puppeteerInstance:browser,frame:668,scale:1/3,imageFormat:"png",output:`${folder}/repeat.png`});
      assert.deepEqual(await readFile(`${folder}/stills/668.png`),await readFile(`${folder}/repeat.png`));
      for(let sheet=0;sheet<5;sheet++){
        const tiles=[];
        for(const [i,f]of frames.slice(sheet*6,sheet*6+6).entries()){
          const input=await sharp(`${folder}/stills/${f}.png`).extend({bottom:30,background:"#14202B"}).composite([{input:Buffer.from(`<svg width="640" height="390"><text x="15" y="381" font-size="20" fill="white">${f}f / ${(f/30).toFixed(2)}s</text></svg>`)}]).png().toBuffer();
          tiles.push({input,left:i%3*640,top:Math.floor(i/3)*390});
        }
        await sharp({create:{width:1920,height:780,channels:3,background:"#0B1018"}}).composite(tiles).png().toFile(`${folder}/emotion-${sheet+1}.png`);
      }
      assert.deepEqual(errors,[]);
      await writeFile(`${folder}/STILL_CHECKS.json`,JSON.stringify({frames,deterministicFrame:668,browserErrors:errors,graphics:"ANGLE"},null,2));
      console.log("Emotion stills and backward repeat passed.");return;
    }
    const partNames=[];
    for(let i=0;i<6;i++){
      await browser.close({silent:true});browser=await openBrowser("chrome",{chromiumOptions});
      let milestone=-1;
      const name=`S0${i+1}-1080p.mp4`;partNames.push(name);
      await renderMedia({...common,puppeteerInstance:browser,frameRange:[i*300,(i+1)*300-1],codec:"h264",muted:true,crf:18,scale:1,concurrency:1,outputLocation:`${folder}/${name}`,
        onProgress:({progress})=>{const m=Math.floor(progress*4);if(m!==milestone){milestone=m;console.log(`Final section ${i+1}/6: ${m*25}%`);}}});
    }
    assert.deepEqual(errors,[]);
    await browser.close({silent:true});
    const ffmpeg=resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"),ffprobe=resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe");
    await writeFile(`${folder}/parts.txt`,partNames.map(n=>`file '${n}'`).join("\n"));
    // Concatenate picture only; mux the uncut song once to avoid AAC priming gaps at section joins.
    execFileSync(ffmpeg,["-v","error","-n","-f","concat","-safe","0","-i",resolve(`${folder}/parts.txt`),"-i",resolve("public/projects/ivans-escape/audio/track.mp3"),"-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","aac","-b:a","320k","-t","60","-movflags","+faststart",resolve(output)],{stdio:"pipe"});
    const metadata=JSON.parse(execFileSync(ffprobe,["-v","error","-show_format","-show_streams","-of","json",resolve(output)],{encoding:"utf8"}));
    const video=metadata.streams.find((s:{codec_type:string})=>s.codec_type==="video"),audio=metadata.streams.find((s:{codec_type:string})=>s.codec_type==="audio");
    assert.equal(video.width,1920);assert.equal(video.height,1080);assert.equal(video.r_frame_rate,"30/1");assert.equal(Number(video.nb_frames),1800);assert.ok(audio);assert.ok(Math.abs(Number(metadata.format.duration)-60)<0.05);
    await mkdir(`${folder}/decoded`,{recursive:true});
    execFileSync(ffmpeg,["-v","error","-y","-i",resolve(output),"-an","-vf","scale=160:90",resolve(`${folder}/decoded/%04d.png`)],{stdio:"pipe"});
    const frames=(await readdir(`${folder}/decoded`)).filter(f=>f.endsWith(".png")).sort();assert.equal(frames.length,1800);
    for(const [i,file]of frames.entries()){
      const stats=await sharp(`${folder}/decoded/${file}`).stats();
      assert.ok(stats.channels.slice(0,3).some(c=>c.mean>3),`Unexpected black frame ${i}`);
    }
    const report={output,width:1920,height:1080,fps:30,frames:1800,durationSeconds:Number(metadata.format.duration),videoCodec:video.codec_name,audioCodec:audio.codec_name,sha256:createHash("sha256").update(await readFile(output)).digest("hex"),graphics:"ANGLE",concurrency:1,sections:6,decodedFrames:frames.length,browserErrors:errors,audio:"Original uncut local track, encoded once to AAC; no time stretch"};
    await writeFile(`${folder}/EXPORT_RESULTS.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
  }finally{await browser.close({silent:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
