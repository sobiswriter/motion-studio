import {clamp,smooth,ease} from './sequence.mjs';
export const INK='#101214',WHITE='#FFFFFF',YELLOW='#FFC915',CYAN='#80E9FF';
export const TAU=Math.PI*2;
export const hash=i=>{const n=Math.sin(i*127.1+41.7)*43758.5453;return n-Math.floor(n)};
export function txt(c,s,x,y,size=48,color=WHITE,weight=500,align='left',font='Display'){c.font=`${font==='Editorial'?'italic ':''}${weight} ${size}px ${font}`;c.fillStyle=color;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(s,x,y)}
export function product(c,images,key,x,y,height,angle=0,alpha=1){const image=images.get(key);if(!image)throw new Error(`Missing genuine product image ${key}`);if(![x,y,height,angle,alpha].every(Number.isFinite)||height<=0)throw new RangeError('Invalid photo geometry');const w=height*image.width/image.height;c.save();c.translate(x,y);c.rotate(angle);c.globalAlpha*=clamp(alpha);c.drawImage(image,-w/2,-height/2,w,height);c.restore()}
export function back(c,color=INK){c.fillStyle=color;c.fillRect(0,0,1920,1080)}
export function brand(c,label,light=false){const color=light?INK:WHITE;txt(c,'realme',76,79,36,color,600);txt(c,label,1844,77,22,color,400,'right','Mono')}
export function qualifier(c,s,light=false){txt(c,s,76,1028,24,light?INK:WHITE,400,'left','Mono')}
export function ring(c,x,y,rx,ry=rx,rotation=0,color=YELLOW,width=2,start=0,end=TAU){if(rx<=0||ry<=0)return;c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.ellipse(x,y,rx,ry,rotation,start,end);c.stroke()}
export function line(c,x,y,xx,yy,color=YELLOW,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke()}
export function dot(c,x,y,r,color=YELLOW){if(r<=0)return;c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()}
export function rise(c,s,x,y,size,t,delay=0,color=WHITE,align='left',font='Display'){const q=ease((t-delay+.25)/.8);c.save();c.beginPath();c.rect(0,y-size-25,1920,size+45);c.clip();txt(c,s,x,y+(1-q)*(size+50),size,color,650,align,font);c.restore()}
export function floor(c,x,y,w,alpha=.4){c.save();c.translate(x,y);c.scale(1,.13);const g=c.createRadialGradient(0,0,0,0,0,w);g.addColorStop(0,`rgba(0,0,0,${alpha})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(-w,-w,w*2,w*2);c.restore()}
export function createKit(images){
 const a=document.createElement('canvas');a.width=256;a.height=256;const ac=a.getContext('2d',{willReadFrequently:true});ac.drawImage(images.get('hero.png'),0,0,256,256);const mask=ac.getImageData(0,0,256,256).data,targets=[];
 for(let y=0;y<256;y+=3)for(let x=0;x<256;x+=3)if(mask[(y*256+x)*4+3]>160)targets.push({x:(x/256-.5)*790,y:(y/256-.5)*790});
 if(targets.length<500)throw new Error('Product silhouette has insufficient alpha samples');
 const b=document.createElement('canvas');b.width=400;b.height=120;const bc=b.getContext('2d',{willReadFrequently:true});bc.drawImage(images.get('realme-wordmark.svg'),0,0,400,120);const logo=bc.getImageData(0,0,400,120).data,brandPoints=[];
 for(let y=0;y<120;y+=2)for(let x=0;x<400;x+=2)if(logo[(y*400+x)*4+3]>160)brandPoints.push({x:(x/400-.5)*1200,y:(y/120-.5)*360});
 if(brandPoints.length<500)throw new Error('Official realme wordmark has insufficient alpha samples');
 const points=Array.from({length:1100},(_,i)=>({target:targets[Math.floor(hash(i+8)*targets.length)],a:i*2.399963,z:hash(i+55),r:.8+hash(i+240)*2.1}));
 function flow(c,t,{mode='ribbon',progress=0,color=CYAN,alpha=1,count=900,cx=960,cy=510,scale=1}={}){
  c.save();c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=1.3;c.beginPath();
  for(let i=0;i<Math.min(count,points.length);i++){
   const p=points[i],a=p.a+t*.6,z=Math.sin(a)*280,depth=1100/(1100+z);
   let x,y;
   if(mode==='hero'){const target=p.target,q=clamp(progress),sx=Math.sin(a*.43)*1030+(p.z-.5)*540,sy=Math.sin(a)*210+Math.cos(a*.31+t)*160;x=sx*(1-q)+target.x*q;y=sy*(1-q)+target.y*q}
   else if(mode==='sphere'||mode==='spatial'){const theta=p.a+t*.32,phi=Math.acos(1-2*p.z),r=420+Math.sin(t*.9+i*.04)*35,q=mode==='spatial'?clamp(progress):0,orbitR=370+(i%4)*56;x=Math.cos(theta)*Math.sin(phi)*r*(1-q)+Math.cos(a)*orbitR*depth*q;y=Math.cos(phi)*r*.74*(1-q)+(Math.sin(a)*orbitR*.28*depth+Math.sin(a*.35+t)*55)*q}
   else if(mode==='orbit'){const r=370+(i%4)*56;x=Math.cos(a)*r*depth;y=Math.sin(a)*r*.28*depth+Math.sin(a*.35+t)*55}
   else {x=(p.z-.5)*2400;y=Math.sin(p.z*TAU*1.7+t*1.2)*150+Math.cos(p.a)*55;x+=Math.sin(a)*45}
   const xx=cx+x*scale,yy=cy+y*scale,size=p.r*depth;
   c.moveTo(xx-size*2,yy+size);c.lineTo(xx+size,yy-size*.5);
  }c.stroke();
  c.globalAlpha=alpha*.55;c.fillStyle=WHITE;c.beginPath();for(let i=0;i<points.length;i+=41){const p=points[i],a=p.a+t*.6,r=390+(i%4)*45;const x=cx+Math.cos(a)*r*scale,y=cy+Math.sin(a)*r*.28*scale;c.moveTo(x+p.r*2,y);c.arc(x,y,p.r*2,0,TAU)}c.fill();c.restore();
 }
 function texture(c,t,color=CYAN,alpha=.09){c.save();c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=1;c.beginPath();for(let y=110;y<960;y+=14){c.moveTo(0,y+(t*18)%14);c.lineTo(1920,y+(t*18)%14)}c.stroke();c.restore()}
 return {txt,product,back,brand,qualifier,ring,line,dot,rise,floor,flow,texture,INK,WHITE,YELLOW,CYAN,clamp,smooth,ease,points,brandPoints};
}
