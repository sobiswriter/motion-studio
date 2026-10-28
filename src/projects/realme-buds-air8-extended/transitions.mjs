const W=1920,H=1080,TAU=Math.PI*2;
const INK='#101214',WHITE='#FFFFFF',YELLOW='#FFC915';
const CYAN='#80E9FF';
const kinds=new Set(['liquid','bauhaus','comic','brutal','kinetic','particles','scan']);
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const out=x=>1-(1-clamp(x))**4;
const image=(c,img)=>c.drawImage(img,0,0,W,H);
const polygon=(c,points)=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath()};
const hash=i=>{const n=Math.sin(i*127.1+81.7)*43758.5453;return n-Math.floor(n)};
const accent=options=>options.accent===CYAN?CYAN:YELLOW;

export function createTransitions(){
  const grains=Array.from({length:900},(_,id)=>({id,u:(id+.5)/900,z:hash(id+79),a:id*2.3999632297}));
  function blob(c,x,y,r,p){
    c.beginPath();
    for(let j=0;j<=144;j++){
      const a=j/144*TAU,envelope=Math.sin(Math.PI*p);
      const radius=r*(1+envelope*(.115*Math.sin(a*3-p*5)+.055*Math.cos(a*5+p*7)));
      const xx=x+Math.cos(a)*radius*(1+.09*envelope),yy=y+Math.sin(a)*radius*(1-.07*envelope);
      if(j)c.lineTo(xx,yy);else c.moveTo(xx,yy);
    }
    c.closePath();
  }
  function liquid(c,old,next,p){
    image(c,old);
    const q=smooth((p-.025)/.95),x=960,y=540,r=q*1850;
    c.save();blob(c,x,y,r,q);c.clip();
    const scale=1+.08*(1-q);c.translate(x,y);c.scale(scale,scale);c.translate(-x,-y);image(c,next);c.restore();
    if(r>0){
      c.save();blob(c,x,y,r,q);c.strokeStyle=INK;c.lineWidth=22+58*Math.sin(Math.PI*q);c.stroke();
      blob(c,x,y,r+9,q);c.strokeStyle=YELLOW;c.lineWidth=3;c.stroke();
      blob(c,x,y,r+29,q);c.strokeStyle=WHITE;c.lineWidth=1;c.globalAlpha=.35*Math.sin(Math.PI*q);c.stroke();c.restore();
    }
  }
  function bauhaus(c,old,next,p){
    // Switch the underlying scene only while all radial sectors cover the stage.
    image(c,p<.5?old:next);
    c.save();c.translate(960,540);c.rotate(Math.sin(Math.PI*p)*.19);
    for(let j=0;j<8;j++){
      const outer=2300*out((p-j*.012)/.29),inner=2300*out((p-.59-j*.01)/.29);
      if(outer<=inner)continue;
      const a=j*TAU/8-.005,b=(j+1)*TAU/8+.005;
      c.beginPath();c.arc(0,0,outer,a,b);c.arc(0,0,inner,b,a,true);c.closePath();
      c.fillStyle=j%4===0?YELLOW:j%4===1?WHITE:INK;c.fill();
      c.strokeStyle=INK;c.lineWidth=2;c.stroke();
    }
    if(p>.16&&p<.87){
      const q=Math.sin(Math.PI*p),r=90+q*260;
      c.strokeStyle=INK;c.lineWidth=16*q;c.beginPath();c.arc(0,0,r,-.3,Math.PI*1.15);c.stroke();
      c.strokeStyle=YELLOW;c.lineWidth=3;c.beginPath();c.arc(0,0,r+25,Math.PI*.2,Math.PI*1.7);c.stroke();
    }
    c.restore();
  }
  function comic(c,old,next,p){
    image(c,next);
    const ink=smooth(p/.1)*(1-smooth((p-.76)/.2));
    for(let j=3;j>=0;j--){
      const q=smooth((p-j*.03)/.86),x=j*W/4,skew=80,dir=j%2?-1:1;
      const left=j?x-skew:-260,right=j===3?W+260:x+W/4+skew;
      const vertices=[[left,-180],[right,-180],[right+skew,H+180],[left+skew,H+180]];
      c.save();c.translate((j-1.5)*q*220,dir*q*(H+780));c.translate(x+W/8,H/2);c.rotate((j-1.5)*q*.115);c.translate(-x-W/8,-H/2);
      c.save();polygon(c,vertices);c.clip();image(c,old);
      // Halftone lives on the moving panel margin, leaving product photography intact.
      c.fillStyle=YELLOW;c.globalAlpha=ink*.65;
      for(let row=0;row<16;row++)for(let col=0;col<3;col++){
        const xx=left+24+col*22+row*skew/16,yy=100+row*58;
        c.beginPath();c.arc(xx,yy,2.2+col*.9,0,TAU);c.fill();
      }
      c.globalAlpha=1;c.restore();
      polygon(c,vertices);c.strokeStyle=INK;c.lineWidth=18*ink;c.stroke();
      c.strokeStyle=YELLOW;c.lineWidth=3*ink;c.stroke();c.restore();
    }
    c.save();c.globalAlpha=Math.sin(Math.PI*p)**2*.7;c.strokeStyle=INK;c.lineWidth=3;
    for(let j=0;j<5;j++){const y=105+j*22;c.beginPath();c.moveTo(W+150-950*p,y);c.lineTo(W+220-1550*p,y+22);c.stroke()}
    c.restore();
  }
  function brutal(c,old,next,p,options){
    image(c,p<.5?old:next);
    const words=Array.isArray(options.words)?options.words:['YOUR','SOUND.','IN FOCUS.'];
    for(let j=0;j<3;j++){
      const enter=out((p-j*.038)/.28),leave=out((p-.59-j*.032)/.28);
      const x=-(W+210)*(1-enter)+(W+240)*leave,y=j*H/3-12,h=H/3+24;
      c.fillStyle=INK;c.fillRect(x+24,y+20,W+210,h+12);
      c.fillStyle=j===1?YELLOW:j===0?WHITE:INK;c.fillRect(x,y,W+210,h);
      c.strokeStyle=j===2?YELLOW:INK;c.lineWidth=6;c.strokeRect(x,y,W+210,h);
      c.save();c.beginPath();c.rect(x+44,y+18,W-20,h-36);c.clip();
      c.font='700 233px Display';c.textAlign='left';c.textBaseline='middle';c.fillStyle=j===2?WHITE:INK;
      c.fillText(String(words[j]??''),x+96,y+h/2+2,W-180);c.restore();
      c.fillStyle=j===2?YELLOW:INK;for(let k=0;k<3;k++)c.fillRect(x+W-48-k*24,y+34,10,33);
    }
  }
  function kinetic(c,old,next,p,options){
    image(c,old);
    const word=typeof options.word==='string'&&options.word.trim()?options.word:'FOCUS';
    const direction=options.direction===-1?-1:1,x=960+direction*110*Math.sin(Math.PI*p),y=540;
    const scale=.14+smooth(p/.72)**2*8.5;
    c.fillStyle=INK;c.beginPath();c.arc(x,y,smooth(p/.27)*1800,0,TAU);c.fill();
    c.save();c.globalAlpha=smooth(p/.1);c.translate(x,y);c.rotate(-direction*.045*Math.sin(Math.PI*p));c.scale(scale,scale);
    c.font='700 440px Display';c.textAlign='center';c.textBaseline='middle';c.fillStyle=YELLOW;c.fillText(word,0,0,W*.96);c.restore();
    // Clip directly on the delivery canvas: destination-in would fail with alpha:false.
    const r=smooth((p-.43)/.48)*1800;
    c.save();c.beginPath();c.arc(x,y,r,0,TAU);c.clip();image(c,next);c.restore();
    if(p<.8){
      c.save();c.translate(x,y);c.rotate(-direction*.045*Math.sin(Math.PI*p));c.scale(scale,scale);
      c.font='700 440px Display';c.textAlign='center';c.textBaseline='middle';c.strokeStyle=YELLOW;c.lineWidth=2.4/scale;c.globalAlpha=Math.sin(Math.PI*clamp(p/.8));c.strokeText(word,0,0,W*.96);c.restore();
    }
  }
  function particles(c,old,next,p,options){
    // REF-18: stable ribbon identities converge on a meaningful acoustic ring.
    image(c,p<.5?old:next);
    const outer=1850*smooth(p/.48),inner=1850*smooth((p-.54)/.44),color=accent(options);
    c.beginPath();c.arc(960,540,outer,0,TAU);c.arc(960,540,inner,TAU,0,true);c.closePath();c.fillStyle=INK;c.fill();
    const morph=smooth(p/.38),radius=300+Math.sin(Math.PI*p)*630,envelope=smooth(p/.1)*(1-smooth((p-.8)/.2));
    const point=(grain,offset=0)=>{
      const a=grain.a+p*2.8+offset,spread=(grain.z-.5)*100;
      const flowX=-140+grain.u*2200,flowY=540+Math.sin(grain.u*TAU*1.4+p*3+offset)*150+spread;
      const ringX=960+Math.cos(a)*(radius+spread),ringY=540+Math.sin(a)*(radius+spread)*.68;
      return[flowX*(1-morph)+ringX*morph,flowY*(1-morph)+ringY*morph];
    };
    c.save();
    for(let layer=0;layer<3;layer++){
      c.strokeStyle=layer===2?WHITE:color;c.lineWidth=layer===0?1.5:layer===1?2.6:3.6;c.globalAlpha=envelope*(layer===0?.45:.9);c.beginPath();
      for(let id=layer;id<grains.length;id+=3){const [x,y]=point(grains[id]),[xx,yy]=point(grains[id],-.025-.02*grains[id].z);c.moveTo(xx,yy);c.lineTo(x,y)}
      c.stroke();
    }
    c.globalAlpha=envelope*.65;c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.ellipse(960,540,radius,radius*.68,p*.03,0,TAU);c.stroke();c.restore();
  }
  function scan(c,old,next,p,options){
    // REF-20: full-coverage strips keep moving upward as their edges release dust.
    image(c,p<.5?old:next);
    const color=accent(options),envelope=smooth(p/.12)*(1-smooth((p-.86)/.14));
    c.save();
    for(let col=0;col<12;col++){
      const enter=smooth((p-col*.006)/.3),leave=smooth((p-.58-col*.005)/.32),x=col*160;
      const y=H-(H+100)*enter-(H+240)*leave,h=(H+120)*enter;
      c.fillStyle=col%4===0?color:col%4===1?WHITE:INK;c.fillRect(x-1,y,162,h);
      c.fillStyle=col%4===1?INK:color;c.fillRect(x+12,y+12,3,Math.max(0,h-24));
      c.fillStyle=color;c.globalAlpha=envelope*(.35+.65*leave);
      for(let j=0;j<26;j++){
        const id=col*26+j,g=grains[id],release=smooth((p-.48-j*.0015)/.5);
        const xx=x+8+g.z*145+Math.sin(g.a+p*4)*40*release;
        const yy=y+h+24+(j%7)*22-520*release;
        const size=1.8+(j%3)*1.4;
        c.fillRect(xx,yy,size,size*(1+release*4));
      }
      c.globalAlpha=1;
    }
    c.restore();
  }
  return(c,old,next,kind,p,options={})=>{
    if(!kinds.has(kind))throw new TypeError(`Unknown Buds transition: ${kind}`);
    if(!Number.isFinite(p))throw new TypeError('Transition progress must be finite');
    if(!c||!old||!next)throw new TypeError('Transition needs a context and both scene canvases');
    p=clamp(p);c.save();
    try{
      c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);
      if(p===0){image(c,old);return}if(p===1){image(c,next);return}
      if(kind==='liquid')liquid(c,old,next,p);else if(kind==='bauhaus')bauhaus(c,old,next,p);else if(kind==='comic')comic(c,old,next,p);else if(kind==='brutal')brutal(c,old,next,p,options);else if(kind==='kinetic')kinetic(c,old,next,p,options);else if(kind==='particles')particles(c,old,next,p,options);else scan(c,old,next,p,options);
    }finally{c.restore()}
  };
}
