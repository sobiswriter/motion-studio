import {clamp} from './sequence.mjs';
export const INK='#030812',PAPER='#E8F4FF',BLUE='#74DCFF';
const W=1920,H=1080,TAU=Math.PI*2;
const hash=n=>{const v=Math.sin(n*127.1+53.7)*43758.5453;return v-Math.floor(v)};
function cover(c,img,x,y,w,h,zoom=1){const scale=Math.max(w/img.width,h/img.height)*zoom,iw=img.width*scale,ih=img.height*scale;c.drawImage(img,x+(w-iw)/2,y+(h-ih)/2,iw,ih)}
export function createArtKit(images){
  const soft=new Map(),feathered=new Map(),starData=Array.from({length:260},(_,i)=>({x:hash(i+1)*W,y:hash(i+300)*H,z:.15+hash(i+600),r:.5+hash(i+900)*1.4}));
  for(const [name,img]of images){
    if(!name.startsWith('frame-'))continue;
    const a=document.createElement('canvas');a.width=960;a.height=540;const c=a.getContext('2d');c.filter='blur(18px)';cover(c,img,-45,-45,1050,630,1.04);soft.set(name,a);
  }
  function feather(key,source){
    if(feathered.has(key))return feathered.get(key);
    const a=document.createElement('canvas');a.width=source.width;a.height=source.height;const ctx=a.getContext('2d');ctx.drawImage(source,0,0);
    ctx.globalCompositeOperation='destination-in';
    for(const vertical of [false,true]){const g=ctx.createLinearGradient(0,0,vertical?0:a.width,vertical?a.height:0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.17,'white');g.addColorStop(.83,'white');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,a.width,a.height)}
    feathered.set(key,a);return a;
  }
  const text=(c,s,x,y,size=32,color=PAPER,font='Display',weight=500,align='left')=>{c.fillStyle=color;c.font=`${font==='Editorial'?'italic ':''}${weight} ${size}px ${font}`;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(s,x,y)};
  const line=(c,x,y,xx,yy,color=BLUE,width=2)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke()};
  const dot=(c,x,y,r,color=BLUE)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,Math.max(.01,r),0,TAU);c.fill()};
  const orbit=(c,x,y,rx,ry,rotation=0,color=BLUE,width=1.5)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),rotation,0,TAU);c.stroke()};
  function bg(c,key,t,{zoom=1.08,shade=.15,panX=0,panY=0,blur=true}={}){
    const original=images.get(key);if(!original)throw new Error(`Missing portfolio background: ${key}`);
    const img=blur?(soft.get(key)??original):original;
    c.fillStyle=INK;c.fillRect(0,0,W,H);c.save();c.translate(W/2+panX+Math.sin(t*.2)*15,H/2+panY+Math.cos(t*.17)*10);c.rotate(Math.sin(t*.075)*.012);
    const s=zoom+.018*Math.sin(t*.21);cover(c,img,-W*s/2,-H*s/2,W*s,H*s);c.restore();
    c.fillStyle=`rgba(3,8,18,${clamp(shade)})`;c.fillRect(0,0,W,H);
    const g=c.createRadialGradient(W/2,H/2,280,W/2,H/2,1120);g.addColorStop(0,'rgba(3,8,18,0)');g.addColorStop(.6,'rgba(3,8,18,0)');g.addColorStop(1,'rgba(3,8,18,.68)');c.fillStyle=g;c.fillRect(0,0,W,H);
  }
  function image(c,key,x,y,w,h,{alpha=1,zoom=1,rotation=0,stroke=false,fit='cover',edge=false}={}){
    let img=images.get(key);if(!img)throw new Error(`Missing portfolio image: ${key}`);if(edge)img=feather(key,img);
    if(![x,y,w,h,alpha,zoom,rotation].every(Number.isFinite)||w<=0||h<=0||zoom<=0)throw new RangeError('Invalid image geometry');
    c.save();c.translate(x+w/2,y+h/2);c.rotate(rotation);c.globalAlpha*=clamp(alpha);c.beginPath();c.rect(-w/2,-h/2,w,h);c.clip();
    if(fit==='contain'){const s=Math.min(w/img.width,h/img.height)*zoom;c.drawImage(img,-img.width*s/2,-img.height*s/2,img.width*s,img.height*s)}else cover(c,img,-w/2,-h/2,w,h,zoom);
    c.restore();if(stroke){c.save();c.translate(x+w/2,y+h/2);c.rotate(rotation);c.strokeStyle=BLUE;c.lineWidth=1.5;c.strokeRect(-w/2,-h/2,w,h);c.restore()}
  }
  function stars(c,t,intensity=1){
    c.save();c.globalCompositeOperation='screen';
    for(let i=0;i<starData.length;i++){const s=starData[i],x=(s.x+t*12*s.z)%W,y=(s.y+t*5*s.z)%H;c.globalAlpha=(.18+.5*s.z)*intensity;dot(c,x,y,s.r,i%9?PAPER:BLUE)}c.restore();
  }
  function hud(c,label,t){
    c.save();text(c,'SOBIVERSE',74,67,25,PAPER,'Mono',400);text(c,label,1846,67,24,PAPER,'Mono',400,'right');line(c,74,91,1846,91,'rgba(116,220,255,.28)',1);
    text(c,'SOURADIP BISWAS  /  A UNIVERSE IN MOTION',74,1028,23,PAPER,'Mono',400);orbit(c,1815,1017,19,7,t*.3,BLUE,1.4);dot(c,1815+19*Math.cos(t*.3),1017+7*Math.sin(t*.3),2.5);c.restore();
  }
  return {bg,image,text,line,dot,orbit,stars,hud,INK,PAPER,BLUE};
}
