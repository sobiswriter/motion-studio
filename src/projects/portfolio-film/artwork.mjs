import {drawOpening,drawClosing,drawChapter} from './graphics.mjs';
import {createTransitions} from './transitions.mjs';
import {shots,handoffs,shotAt,clamp,fps,duration,ease} from './sequence.mjs';
const W=1920,H=1080,INK='#080D12',PAPER='#F1F0E8',BLUE='#A7D4ED';
export async function createFilm(canvas){
  const c=canvas.getContext('2d'),transit=createTransitions(),images=new Map();
  await Promise.all(handoffs.flatMap(h=>['old','next'].map(async side=>{const img=new Image();img.src=`assets/endpoints/${h.id}-${side}.png`;await img.decode();images.set(`${h.id}-${side}`,img)})));
  const make=()=>{const a=document.createElement('canvas');a.width=W;a.height=H;return a};
  const outgoing=make(),incoming=make();
  function text(ctx,str,x,y,size=30,col=PAPER,font='Display',weight=500,align='left'){
    ctx.fillStyle=col;ctx.font=`${weight} ${size}px ${font}`;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(str,x,y);
  }
  function overlay(ctx,s,f){
    if(s.id==='project-detail'){
      text(ctx,'LAUNCHSILO LABS  /  INSIDE THE PROJECT',96,82,28,BLUE,'Mono',400);
      const labels=['SCOPE BUILDER','AI ASSISTED ESTIMATES','CMS & INVOICING'],local=f/fps-s.start;
      for(let j=0;j<3;j++){
        if(local<2+j*1.4)continue;const p=ease((local-2-j*1.4)/.3),x=70+j*595,y=760+(1-p)*100;
        ctx.fillStyle=INK;ctx.fillRect(x+10,y+10,570,142);ctx.fillStyle=j===1?BLUE:PAPER;ctx.fillRect(x,y,570,142);
        ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.strokeRect(x,y,570,142);text(ctx,`0${j+1} / CAPABILITY`,x+22,y+39,19,INK,'Mono',400);text(ctx,labels[j],x+22,y+100,30,INK);
      }
    }
    if(s.id==='contact'){
      // Cover the recording's small phone/email line with the portfolio's deliberate URL invitation.
      ctx.fillStyle=INK;ctx.fillRect(259,763,838,178);ctx.fillStyle=BLUE;ctx.fillRect(240,744,838,178);
      ctx.strokeStyle=INK;ctx.lineWidth=7;ctx.strokeRect(240,744,838,178);
      text(ctx,'EXPLORE THE FULL PORTFOLIO',278,793,22,INK,'Mono',400);
      text(ctx,'sobi.codes',278,879,72,INK);text(ctx,'↗',971,879,64,INK);
    }
    ctx.fillStyle=INK;ctx.fillRect(0,954,W,126);
    ctx.fillStyle=BLUE;ctx.fillRect(80,1045,1760*clamp(f/(duration*fps)),2);
    text(ctx,s.label??'',106,1014,36);
    text(ctx,'SOBI / 2026',1810,1010,23,BLUE,'Mono',400,'right');
    ctx.fillStyle=BLUE;ctx.beginPath();ctx.arc(80,1002,5,0,Math.PI*2);ctx.fill();
  }
  function complete(ctx,s,f,img){
    ctx.clearRect(0,0,W,H);
    if(s.id==='opening')drawOpening(ctx,f/fps);
    else if(s.id==='closing')drawClosing(ctx,f/fps-s.start);
    else if(!s.source)drawChapter(ctx,s.id==='ai-chapter'?'ai':s.id,f/fps-s.start);
    else{ctx.drawImage(img,0,0,W,H);overlay(ctx,s,f);}
  }
  return time=>{
    const f=Math.min(duration*fps-1,Math.max(0,Math.round(time*fps))),s=shotAt(f);
    c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.clearRect(0,0,W,H);
    const h=handoffs.find(h=>f>=h.startFrame&&f<h.endFrame);
    if(h){
      complete(outgoing.getContext('2d'),shots.find(s=>s.id===h.old),h.startFrame,images.get(`${h.id}-old`));
      complete(incoming.getContext('2d'),shots.find(s=>s.id===h.next),h.endFrame,images.get(`${h.id}-next`));
      transit(c,outgoing,incoming,h.kind,(f-h.startFrame)/(h.endFrame-h.startFrame),h.options);
    }else if(s.id==='opening')drawOpening(c,f/fps);
    else if(s.id==='closing')drawClosing(c,f/fps-s.start);
    else if(!s.source)drawChapter(c,s.id==='ai-chapter'?'ai':s.id,f/fps-s.start);
    else overlay(c,s,f);
  };
}
