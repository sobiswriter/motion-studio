import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createSpaceTransitions} from '../src/projects/portfolio-space/space-transitions.mjs';
const kinds=['liquid','particles','bauhaus','comic','brutal','kinetic'];
const old={width:1920,height:1080,id:'old'},next={width:1920,height:1080,id:'next'};
const calls=[],stack=[];let state={globalAlpha:1,globalCompositeOperation:'source-over'};
const finite=args=>{for(const arg of args)if(typeof arg==='number')assert(Number.isFinite(arg),'Non-finite canvas coordinate')};
const c=new Proxy({}, {get:(_,name)=>{
 if(name in state)return state[name];
 return(...args)=>{finite(args);if(name==='save')stack.push({...state});if(name==='restore'){assert(stack.length,'Unbalanced restore');state=stack.pop()};calls.push([name,...args,{...state}])};
},set:(_,name,value)=>{finite([value]);state[name]=value;return true}});
const draw=createSpaceTransitions();
for(const kind of kinds)for(let frame=0;frame<=120;frame++){
 const p=frame/120;calls.length=0;const before={...state};draw(c,old,next,kind,p,{word:'SYSTEMS',words:['IDEAS','INTO','ORBIT.']});
 assert.equal(stack.length,0);assert.deepEqual(state,before);
 const images=calls.filter(x=>x[0]==='drawImage');assert(images.length>0);
 assert.equal(images[0].at(-1).globalAlpha,1,'Every transition needs an opaque image base');
 if(p===0||p===1){assert.equal(images.length,1);assert.equal(images[0][1],p===0?old:next);assert.deepEqual(images[0].slice(2,6),[0,0,1920,1080])}
 if(kind==='kinetic'&&p>0&&p<1){assert.equal(images.at(-1)[1],next);assert.equal(images.at(-1).at(-1).globalCompositeOperation,'source-over','The incoming aperture must draw directly on opaque delivery canvases');assert(calls.some(x=>x[0]==='clip'))}
 if(kind==='particles')assert(calls.filter(x=>x[0]==='lineTo').length<800,'Particle draw budget exceeded');
}
for(const word of ['WORK','SYSTEMS','THINK','BEYOND','STILL','NEXT.'])for(const p of [.001,.25,.49,.5,.51,.75,.999]){draw(c,old,next,'kinetic',p,{word});assert.equal(stack.length,0)}
for(const p of [NaN,Infinity,-Infinity])assert.throws(()=>draw(c,old,next,'liquid',p),/finite/);
assert.throws(()=>draw(c,old,next,'vhs',.5),/Unknown/);assert.throws(()=>draw(c,null,next,'liquid',.5),/both scene canvases/);
const source=await readFile('src/projects/portfolio-space/space-transitions.mjs','utf8');assert(!/Math\.random|Date\.now|requestAnimationFrame|setInterval/.test(source));
console.log('Space transitions:6 families×121 frames, exact endpoints, opaque base/direct-clip invariants, finite geometry, balanced context, deterministic motion and particle budget passed.');
if(process.argv.includes('--pixels')){
 const {default:puppeteer}=await import('puppeteer-core');
 const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=d3d11']});
 try{
  const page=await browser.newPage();await page.setViewport({width:1920,height:1080});
  await page.setContent('<!doctype html><canvas id="film" width="1920" height="1080"></canvas>');
  const font=(await readFile('src/projects/portfolio-designed/assets/fonts/SpaceGrotesk.ttf')).toString('base64');
  await page.evaluate(async data=>{const face=new FontFace('Display',`url(data:font/ttf;base64,${data})`,{weight:'300 700'});await face.load();document.fonts.add(face)},font);
  await page.addScriptTag({content:source.replace('export function createSpaceTransitions','window.createSpaceTransitions=function createSpaceTransitions')});
  const result=await page.evaluate(()=>{
   const make=(bg,accent,label)=>{const a=document.createElement('canvas');a.width=1920;a.height=1080;const c=a.getContext('2d');c.fillStyle=bg;c.fillRect(0,0,1920,1080);c.strokeStyle=accent;c.lineWidth=8;c.beginPath();c.arc(960,540,330,0,Math.PI*2);c.stroke();c.fillStyle=accent;c.font='bold 130px sans-serif';c.textAlign='center';c.fillText(label,960,580);return a};
   const old=make('#030812','#74DCFF','OUTGOING ORBIT'),next=make('#071927','#E8F4FF','INCOMING WORLD'),draw=window.createSpaceTransitions(),checks=[],proofs=[];
   const expected=[old,next].map(a=>a.getContext('2d').getImageData(0,0,1920,1080).data);
   for(const alpha of [true,false]){
    const canvas=document.createElement('canvas');canvas.width=1920;canvas.height=1080;const ctx=canvas.getContext('2d',{alpha,willReadFrequently:true});
    for(const kind of ['liquid','particles','bauhaus','comic','brutal','kinetic'])for(const p of [0,.001,.1,.25,.49,.5,.51,.75,.9,.999,1]){
    ctx.clearRect(0,0,1920,1080);draw(ctx,old,next,kind,p,{word:'SYSTEMS',words:['IDEAS','INTO','ORBIT.']});
    const pixels=ctx.getImageData(0,0,1920,1080).data;let alphaFailure=0,endFailure=0;
    for(let i=3;i<pixels.length;i+=4)if(pixels[i]!==255)alphaFailure++;
    if(p===0||p===1||(kind==='kinetic'&&p===.999)){const target=expected[p===0?0:1];for(let i=0;i<pixels.length;i++)if(pixels[i]!==target[i])endFailure++}
    checks.push({kind,p,alpha,alphaFailure,endFailure});if(p===.5&&!alpha)proofs.push({kind,png:canvas.toDataURL('image/png').split(',')[1]});
    }
   }
   return{checks,proofs};
  });
  await mkdir('.cache/portfolio-space/transition-proof',{recursive:true});
  for(const proof of result.proofs)await writeFile(`.cache/portfolio-space/transition-proof/${proof.kind}.png`,Buffer.from(proof.png,'base64'));
  await writeFile('.cache/portfolio-space/transition-proof/pixel-check.json',JSON.stringify(result.checks,null,2));
  assert(result.checks.every(x=>x.alphaFailure===0&&x.endFailure===0),'Native Canvas alpha or exact endpoint failure');
  console.log(`Native Chrome Canvas:${result.checks.length} full-resolution frames opaque; all endpoints pixel-identical.`);
 }finally{await browser.close()}
}
