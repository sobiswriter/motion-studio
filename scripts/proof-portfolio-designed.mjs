import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
const project=process.argv[4]??'src/projects/portfolio-designed';
const {handoffs,duration=120}=await import(pathToFileURL(resolve(project,'sequence.mjs')).href);
const folder=process.argv[2]??'.cache/portfolio-designed/proof';
const times=process.argv[3]?process.argv[3].split(',').map(Number):Array.from({length:Math.ceil(duration*2)},(_,i)=>i/2);
assert(times.length>0&&times.every(t=>Number.isFinite(t)&&t>=0&&t<duration));
const samples=process.argv[3]?times:[...new Set([...times,...handoffs.flatMap(h=>[-2,-1,0,1,2].map(f=>(h.frame+f)/60))])].sort((a,b)=>a-b);
await mkdir(folder,{recursive:true});
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--allow-file-access-from-files','--use-angle=d3d11'],defaultViewport:{width:1920,height:1080,deviceScaleFactor:1}});
const errors=[],files=[];
try{
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(resolve(project,'index.html')).href);await page.evaluate(async()=>await window.__hf.buildReady.main);
  for(let i=0;i<samples.length;i++){
    const time=samples[i];await page.evaluate(t=>window.__drawFilm(t),time);
    const file=`${folder}/frame-${String(i).padStart(3,'0')}.jpg`;
    await page.screenshot({path:file,type:'jpeg',quality:84});files.push({file,time,frame:Math.round(time*60)});
  }
  const hashes=[];
  for(const t of [duration*.267,duration*.775,duration*.267]){await page.evaluate(t=>window.__drawFilm(t),t);hashes.push(createHash('sha256').update(await page.screenshot({type:'png'})).digest('hex'))}
  assert.equal(hashes[0],hashes[2],'Backward scrub changed a deterministic frame');assert.equal(errors.length,0,errors.join('\n'));
  const gpu=await page.evaluate(()=>{const c=document.createElement('canvas'),gl=c.getContext('webgl2'),ext=gl?.getExtension('WEBGL_debug_renderer_info');return ext?{vendor:gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),renderer:gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)}:null});
  for(let start=0;start<files.length;start+=16){const batch=files.slice(start,start+16),parts=[];
    for(let j=0;j<batch.length;j++){
      const item=batch[j],thumb=await sharp(item.file).resize(480,270).toBuffer(),label=Buffer.from(`<svg width="480" height="34"><rect width="480" height="34" fill="#080D12"/><text x="15" y="25" font-family="monospace" font-size="19" fill="#F1F0E8">${item.time.toFixed(3)} s / f${item.frame}</text></svg>`);
      parts.push({input:thumb,left:j%4*480,top:Math.floor(j/4)*304},{input:label,left:j%4*480,top:Math.floor(j/4)*304+270});
    }
    await sharp({create:{width:1920,height:Math.ceil(batch.length/4)*304,channels:3,background:'#080D12'}}).composite(parts).jpeg({quality:88}).toFile(`${folder}/sheet-${String(start/16+1).padStart(2,'0')}.jpg`);
  }
  await writeFile(`${folder}/index.json`,JSON.stringify({samples:files,errors,backwardScrub:true,gpu},null,2));
  console.log(JSON.stringify({samples:files.length,sheets:Math.ceil(files.length/16),folder,errors,gpu,backwardScrub:true}));
}finally{await browser.close()}
