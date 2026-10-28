const W=1920,H=1080,TAU=Math.PI*2,R=2300;
const INK='#030812',PAPER='#E8F4FF',BLUE='#74DCFF';
const kinds=new Set(['liquid','particles','bauhaus','comic','brutal','kinetic']);
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const out=x=>1-(1-clamp(x))**4;
const hash=i=>{const n=Math.sin(i*127.1+81.7)*43758.5453;return n-Math.floor(n)};

export function createSpaceTransitions(){
  const stars=Array.from({length:620},(_,i)=>({a:i*2.399963,r:hash(i+8),s:1+hash(i+62)*2.6}));
  const image=(c,img)=>c.drawImage(img,0,0,W,H);
  function poly(c,points){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath()}
  function ring(c,x,y,r,width=3,alpha=1){if(r<=0)return;c.globalAlpha=alpha;c.lineWidth=width;c.strokeStyle=BLUE;c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();c.globalAlpha=1}
  function liquid(c,old,next,p){
    image(c,old);
    const q=smooth((p-.045)/.91),x=850+230*q,y=H/2+Math.sin(p*TAU)*42,r=q*1600;
    c.save();c.beginPath();c.arc(x,y,r,0,TAU);c.clip();
    const magnify=1+.13*(1-q);c.translate(x,y);c.scale(magnify,magnify);c.translate(-x,-y);image(c,next);c.restore();
    if(r>0){
      c.save();c.strokeStyle=INK;c.lineWidth=38+50*Math.sin(p*Math.PI);c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();
      ring(c,x,y,r+10,2.4,.8);ring(c,x,y,r+25,1,.3);
      c.lineWidth=6;c.strokeStyle=PAPER;c.globalAlpha=.75*Math.sin(p*Math.PI);c.beginPath();c.arc(x,y,r+5,-.8+p,.3+p);c.stroke();c.restore();
    }
  }
  function particles(c,old,next,p){
    image(c,old);
    const q=smooth(p),front=-510+(W+1020)*q,cy=540+Math.sin(q*TAU)*170;
    c.save();c.beginPath();c.moveTo(-100,-100);c.lineTo(front+90,-100);
    for(let y=0;y<=H+100;y+=24)c.lineTo(front+Math.sin(y/H*TAU+q*5)*85,y);
    c.lineTo(-100,H+100);c.closePath();c.clip();image(c,next);c.restore();
    c.save();c.fillStyle=INK;c.beginPath();
    for(let y=-24;y<=H+24;y+=24){const x=front-150+Math.sin(y/H*TAU+q*5)*85;if(y===-24)c.moveTo(x,y);else c.lineTo(x,y)}
    for(let y=H+24;y>=-24;y-=24)c.lineTo(front+150+Math.sin(y/H*TAU+q*5)*85,y);
    c.closePath();c.fill();c.restore();
    const e=Math.sin(Math.PI*p),spread=65+e*380;
    c.save();
    for(let i=0;i<stars.length;i++){
      const s=stars[i],a=s.a+q*8,r=Math.sqrt(s.r)*spread;
      const x=front+Math.cos(a)*r,y=cy+Math.sin(a)*r*.78+(s.r-.5)*300;
      c.globalAlpha=(.3+s.r*.65)*e;c.strokeStyle=i%7?BLUE:PAPER;c.lineWidth=s.s;
      c.beginPath();c.moveTo(x-(12+s.r*95)*e,y-4*e);c.lineTo(x,y);c.stroke();
    }
    c.globalAlpha=e;c.fillStyle=PAPER;c.beginPath();c.arc(front+12,cy,6+e*8,0,TAU);c.fill();c.restore();
  }
  function bauhaus(c,old,next,p){
    image(c,p<.5?old:next);
    c.save();c.translate(W/2,H/2);c.rotate(.22*Math.sin(p*Math.PI));
    for(let j=0;j<8;j++){
      const enter=out((p-j*.011)/.29),leave=out((p-.59-j*.009)/.3),outer=R*enter,inner=R*leave;
      if(outer<=inner)continue;
      const a=j*TAU/8-.004,b=(j+1)*TAU/8+.004;
      c.beginPath();c.arc(0,0,outer,a,b);c.arc(0,0,inner,b,a,true);c.closePath();
      c.fillStyle=j%4===0?BLUE:INK;c.fill();c.strokeStyle=BLUE;c.lineWidth=2;c.stroke();
    }
    const e=Math.sin(Math.PI*p);
    if(p>.15&&p<.87){ring(c,0,0,185+e*245,2,e*.8);ring(c,0,0,235+e*330,1,e*.4)}
    c.restore();
  }
  function comic(c,old,next,p){
    image(c,next);
    for(let j=3;j>=0;j--){
      const q=out((p-j*.045)/.76),x=j*W/4,skew=85,dir=j%2?-1:1;
      const left=j?x-skew:-250,right=j===3?W+250:x+W/4+skew;
      const vertices=[[left,-160],[right,-160],[right+skew,H+160],[left+skew,H+160]];
      c.save();c.translate((j-1.5)*q*260,dir*q*(H+700));c.translate(x+W/8,H/2);c.rotate((j-1.5)*q*.12);c.translate(-x-W/8,-H/2);
      c.save();poly(c,vertices);c.clip();image(c,old);c.restore();
      poly(c,vertices);c.strokeStyle=INK;c.lineWidth=16;c.stroke();c.strokeStyle=BLUE;c.lineWidth=3;c.stroke();
      c.restore();
    }
  }
  function brutal(c,old,next,p,options){
    image(c,p<.5?old:next);
    const words=Array.isArray(options.words)?options.words:['READY','FOR','LIFTOFF.'];
    for(let j=0;j<3;j++){
      const enter=out((p-j*.04)/.27),leave=out((p-.59-j*.035)/.27);
      const x=-(W+180)*(1-enter)+(W+200)*leave,y=j*H/3-8;
      c.fillStyle=INK;c.fillRect(x+22,y+18,W+180,H/3+30);
      c.fillStyle=j===1?BLUE:INK;c.fillRect(x,y,W+180,H/3+18);
      c.strokeStyle=BLUE;c.lineWidth=5;c.strokeRect(x,y,W+180,H/3+18);
      c.save();c.beginPath();c.rect(x+40,y+18,W-20,H/3-20);c.clip();
      c.font='700 235px Display';c.textAlign='left';c.textBaseline='middle';c.fillStyle=j===1?INK:PAPER;
      c.fillText(String(words[j]??''),x+100,y+H/6+4,W-180);c.restore();
      c.fillStyle=j===1?INK:BLUE;for(let k=0;k<4;k++)c.fillRect(x+W-60-k*24,y+34,12,36);
    }
  }
  function kinetic(c,old,next,p,options){
    image(c,old);
    const word=typeof options.word==='string'&&options.word.trim()?options.word:'BUILD';
    const direction=/NEXT/i.test(word)?-1:1,q=smooth(p),scale=.13+smooth(p/.72)**2*8;
    const x=W/2+direction*150*Math.sin(p*Math.PI),y=H/2;
    // An expanding dark event horizon prevents old and new headlines from overprinting inside the glyph portal.
    c.fillStyle=INK;c.beginPath();c.arc(x,y,smooth(p/.28)*1700,0,TAU);c.fill();
    c.save();c.translate(x,y);c.rotate(direction*-.05*Math.sin(p*Math.PI));c.scale(scale,scale);
    c.font='700 440px Display';c.textAlign='center';c.textBaseline='middle';
    c.fillStyle=BLUE;c.fillText(word,0,0,W*.96);c.restore();
    const aperture=smooth((p-.43)/.49)*1700;
    // Direct clipping also works on the delivery canvas, whose alpha channel is disabled.
    c.save();c.beginPath();c.arc(x,y,aperture,0,TAU);c.clip();image(c,next);c.restore();
    if(p<.81){
      c.save();c.translate(x,y);c.rotate(direction*-.05*Math.sin(p*Math.PI));c.scale(scale,scale);
      c.font='700 440px Display';c.textAlign='center';c.textBaseline='middle';c.strokeStyle=BLUE;c.lineWidth=2.6/scale;c.globalAlpha=Math.sin(Math.PI*clamp(p/.81));c.strokeText(word,0,0,W*.96);c.restore();
    }
    if(aperture>0&&p<.94)ring(c,x,y,aperture+6,2.5,Math.sin(Math.PI*q)*.75);
  }
  return(c,old,next,kind,p,options={})=>{
    if(!kinds.has(kind))throw new TypeError(`Unknown space transition: ${kind}`);
    if(!Number.isFinite(p))throw new TypeError('Transition progress must be finite');
    if(!c||!old||!next)throw new TypeError('Transition needs a context and both scene canvases');
    p=clamp(p);c.save();
    try{
      c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);
      if(p===0){image(c,old);return}if(p===1){image(c,next);return}
      if(kind==='liquid')liquid(c,old,next,p);
      else if(kind==='particles')particles(c,old,next,p);
      else if(kind==='bauhaus')bauhaus(c,old,next,p);
      else if(kind==='comic')comic(c,old,next,p);
      else if(kind==='brutal')brutal(c,old,next,p,options);
      else kinetic(c,old,next,p,options);
    }finally{c.restore()}
  };
}
