import {build} from 'esbuild';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import {mkdirSync,writeFileSync,copyFileSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const dir='src/projects/portfolio-space',images=`${dir}/assets/images`,scratch='.cache/portfolio-space/sources';
const website='C:/Users/soura/OneDrive/Desktop/PortLeo/Port-Leo';
const recording='assets/Portfolio/portfolio-screen-recording-2026-10-26.mp4';
mkdirSync(images,{recursive:true});mkdirSync(scratch,{recursive:true});mkdirSync(`${dir}/docs`,{recursive:true});
const records=[];
for(const [name,time] of [['frame-galaxy',4],['frame-project',27.95],['frame-ai',37.6],['frame-research',46],['frame-skills',56.5],['frame-experience',63.4],['frame-person',77.5],['frame-contact',88]]){
  const destination=`${images}/${name}.png`,temporary=`${scratch}/${name}.png`;
  const result=spawnSync('ffmpeg',['-v','error','-ss',String(time),'-i',recording,'-frames:v','1','-y',temporary],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  const crop=name==='frame-contact'?[0,0,1918,755]:[0,0,1918,1078];
  if(name==='frame-contact')await sharp(temporary).extract({left:0,top:0,width:1918,height:755}).png().toFile(destination);
  else copyFileSync(temporary,destination);
  records.push({file:`${name}.png`,source:recording,type:'single-recording-frame',time,crop,note:name==='frame-contact'?'Bottom contact details excluded.':'Actual complete portfolio world still; no video playback.'});
}
for(const [source,file] of [['MeImg.jpg','portrait.jpg'],['Profile card front.png','profile-front.png'],['Profile card back.png','profile-back.png']]){
  const path=`${website}/public/images/${source}`;copyFileSync(path,`${images}/${file}`);
  records.push({file,source:path,type:'native-website-image',note:'Byte-identical copy of owner website artwork.'});
}
const launchStill='src/projects/portfolio-designed/assets/images/launchsilo.png';
copyFileSync(launchStill,`${images}/launchsilo.png`);
records.push({file:'launchsilo.png',source:launchStill,url:'https://launchsilo.in/',type:'native-website-screenshot',captureDate:'2026-10-27',provenance:'src/projects/portfolio-designed/docs/SOURCES.md',note:'Byte-identical reuse of the clean native homepage screenshot; no website recapture or generated UI.'});

// shortcut: source-engine private render fields support this one-time plate capture; revisit if the website engine changes.
const contents=`import {GalaxyEngine} from ${JSON.stringify(website+'/src/components/galaxy/GalaxyEngine.ts')};
import {PORTFOLIO_DESTINATIONS} from ${JSON.stringify(website+'/src/components/galaxy/portfolioDestinations.ts')};
let seed=2637;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};window.requestAnimationFrame=()=>0;
const e=new GalaxyEngine({canvas:document.getElementById('plate'),destinations:PORTFOLIO_DESTINATIONS,onProjectedPositionsUpdate:()=>{},onTravelComplete:()=>{},onReturnHomeComplete:()=>{},reducedMotion:true});
e.setEnabled(false);e.renderer.setPixelRatio(1);e.renderer.setSize(1920,1080,false);
window.capturePlate=kind=>{e.camera.clearViewOffset();e.camera.fov=44;e.camera.position.set(0,17.5,23);e.camera.lookAt(0,0,0);
if(kind==='nebula'){e.camera.fov=63;e.camera.position.set(28,10,28);e.camera.lookAt(-10,2,-20)}
if(kind==='deep'){e.camera.fov=48;e.camera.position.set(-18,23,-17);e.camera.lookAt(2,1,0)}
e.camera.updateProjectionMatrix();e.galaxyMaterial.uniforms.uCameraPos.value.copy(e.camera.position);e.renderer.render(e.scene,e.camera);return{width:e.renderer.domElement.width,height:e.renderer.domElement.height}};
window.capturePlate('galaxy');window.plateReady=true;`;
await build({stdin:{contents,resolveDir:process.cwd(),sourcefile:'capture-source-plates-entry.js'},bundle:true,format:'iife',outfile:`${scratch}/plate-bundle.js`,loader:{'.css':'empty'},logLevel:'silent'});
writeFileSync(`${scratch}/plate.html`,'<!doctype html><html><style>*{margin:0}html,body,#stage{width:1920px;height:1080px;overflow:hidden;background:#020306}#stage{position:relative}canvas{width:100%;height:100%;display:block}</style><div id="stage"><canvas id="plate"></canvas></div><script src="plate-bundle.js"></script></html>');
const browser=await puppeteer.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--use-gl=angle','--use-angle=d3d11']});
let gpu;
try{
  const page=await browser.newPage();await page.setViewport({width:1920,height:1080,deviceScaleFactor:1});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(pathToFileURL(resolve(`${scratch}/plate.html`)).href);await page.waitForFunction(()=>window.plateReady===true,{timeout:30000});
  for(const [kind,file] of [['galaxy','space-galaxy.jpg'],['nebula','space-nebula.jpg'],['deep','space-deep.jpg']]){
    const size=await page.evaluate(k=>window.capturePlate(k),kind);assert.deepEqual(size,{width:1920,height:1080});
    await page.screenshot({path:`${images}/${file}`,type:'jpeg',quality:97});
    records.push({file,type:'website-engine-still',source:`${website}/src/components/galaxy/GalaxyEngine.ts`,seed:2637,camera:kind,note:'UI-free static render of the actual website galaxy, shaders and destination scene. No stock or cloud artwork.'});
  }
  gpu=await page.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return{vendor:gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),renderer:gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)}});
  assert.equal(errors.length,0,errors.join('\n'));
}finally{await browser.close()}
assert.equal(records.length,15);
for(const record of records){
  const path=`${images}/${record.file}`,metadata=await sharp(path).metadata();
  assert(metadata.width>=1000&&metadata.height>=700,record.file);
  assert.equal(metadata.format,record.file.endsWith('.jpg')?'jpeg':'png',record.file);
  record.width=metadata.width;record.height=metadata.height;record.sha256=createHash('sha256').update(readFileSync(path)).digest('hex');
}
const sha=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
assert.equal(sha(`${images}/portrait.jpg`),sha(`${website}/public/images/MeImg.jpg`));
assert.equal(sha(`${images}/launchsilo.png`),sha(launchStill));
writeFileSync(`${dir}/source-images.json`,JSON.stringify({date:'2026-10-27',website:'https://sobiverse.ai.studio',recording,sourceFrameSize:[1918,1078],cropOrder:['x','y','width','height'],gpu,records},null,2)+'\n');
console.log(`Prepared ${records.length} local source images; native formats, dimensions and portrait hash validated.`);
