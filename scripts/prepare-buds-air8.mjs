import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import assert from 'node:assert/strict';
const source='assets/Products/realme-buds-air8',dest='src/projects/realme-buds-air8/assets/images';
await mkdir(dest,{recursive:true});
const manifest=JSON.parse(await readFile(`${source}/source-manifest.json`,'utf8'));
for(const a of manifest.assets){const b=await readFile(`${source}/${a.path}`);assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256)}
await copyFile(`${source}/master-grey-open-case.png`,`${dest}/hero.png`);
async function keyed(name){const {data,info}=await sharp(`${source}/${name}`).ensureAlpha().raw().toBuffer({resolveWithObject:true});for(let i=0;i<data.length;i+=4)if(Math.min(data[i],data[i+1],data[i+2])>=248)data[i+3]=0;return {data,info}}
const closed=await keyed('master-grey-gallery-02.jpg');await sharp(closed.data,{raw:closed.info}).trim({background:'#00000000'}).png().toFile(`${dest}/case.png`);
const pair=await keyed('master-grey-gallery-04.jpg');const {width:w,height:h}=pair.info,labels=new Int32Array(w*h),queue=new Int32Array(w*h),parts=[];let label=0;
for(let pos=0;pos<w*h;pos++){
 if(labels[pos]||!pair.data[pos*4+3])continue;
 label++;let head=0,tail=1,minX=w,minY=h,maxX=0,maxY=0;queue[0]=pos;labels[pos]=label;
 while(head<tail){const n=queue[head++],x=n%w,y=Math.floor(n/w);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);for(const next of [x>0?n-1:-1,x<w-1?n+1:-1,y>0?n-w:-1,y<h-1?n+w:-1])if(next>=0&&!labels[next]&&pair.data[next*4+3]){labels[next]=label;queue[tail++]=next}}
 if(tail>10000)parts.push({label,pixels:tail,left:minX,top:minY,width:maxX-minX+1,height:maxY-minY+1});
}
parts.sort((a,b)=>b.pixels-a.pixels);assert(parts.length>=2,'Expected two separate photographed earbuds');
const buds=parts.slice(0,2).sort((a,b)=>a.left-b.left);
for(let i=0;i<buds.length;i++){const part=buds[i],out=Buffer.alloc(part.width*part.height*4);for(let y=0;y<part.height;y++)for(let x=0;x<part.width;x++){const n=(part.top+y)*w+part.left+x;if(labels[n]===part.label)pair.data.copy(out,(y*part.width+x)*4,n*4,n*4+4)}await sharp(out,{raw:{width:part.width,height:part.height,channels:4}}).png().toFile(`${dest}/bud-${i+1}.png`)}
await sharp(`${source}/master-grey-gallery-02.jpg`).extract({left:160,top:350,width:1280,height:660}).resize(1920,1080).jpeg({quality:94}).toFile(`${dest}/macro.jpg`);
await writeFile(`${dest}/preparation.json`,JSON.stringify({sourceManifest:`${source}/source-manifest.json`,method:'Near-white backdrop key >=248 RGB; two largest connected components become buds; original product RGB, silhouette and aspect ratios retained.',buds,files:['hero.png','case.png','bud-1.png','bud-2.png','macro.jpg']},null,2));
console.log('Verified original hashes; prepared five local photographic assets, including two separate real earbuds.');
