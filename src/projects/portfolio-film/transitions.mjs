const W=1920,H=1080,TAU=Math.PI*2;
const INK='#080D12',PAPER='#F1F0E8',BLUE='#A7D4ED';
const kinds=new Set(['liquid','particles','bauhaus','comic','brutal','kinetic']);
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const out=x=>1-(1-clamp(x))**4;
const hash=i=>{const a=Math.sin(i*127.1+81.7)*43758.5453;return a-Math.floor(a)};

export function createTransitions(){
  const points=Array.from({length:940},(_,i)=>({a:i*2.399963,r:hash(i+8),s:1.4+hash(i+62)*4.2}));
  function image(c,img){c.drawImage(img,0,0,W,H)}
  function polygon(c,vertices,fill,stroke=null,width=1){
    c.beginPath();vertices.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();
    if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}
  }
  function wave(c,x,p,side,offset=0,edgeOnly=false){
    const edge=y=>x+Math.sin(y/H*TAU+p*3)*100+Math.sin(y/H*TAU*2-p*2)*38+offset;
    c.beginPath();if(edgeOnly)c.moveTo(edge(-30),-30);else{c.moveTo(side==='left'?0:W,-30);c.lineTo(edge(-30),-30)}
    for(let y=0;y<=H+30;y+=30)c.lineTo(edge(y),y);
    if(!edgeOnly){c.lineTo(side==='left'?0:W,H+30);c.closePath()}
  }
  function liquid(c,old,next,p){
    const cover=p<.5,q=smooth(cover?p/.46:(p-.54)/.46),x=-280+(W+560)*q;
    image(c,cover?old:next);
    c.save();wave(c,x,p,cover?'left':'right');c.clip();
    c.fillStyle=BLUE;c.fillRect(0,0,W,H);
    // Keep full coverage identical on both sides of the hidden source swap.
    c.save();c.beginPath();c.rect(x-240,0,480,H);c.clip();
    const g=c.createLinearGradient(x-240,0,x+240,0);
    g.addColorStop(0,BLUE);g.addColorStop(.25,'#8FC1DC');g.addColorStop(.5,'#C8E5F3');g.addColorStop(.78,BLUE);g.addColorStop(1,BLUE);
    c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
    c.strokeStyle='#EAF5F8';c.lineWidth=13;c.globalAlpha=.65;
    wave(c,x,p,cover?'left':'right',cover?-27:27,true);c.stroke();
    c.globalAlpha=.28;c.lineWidth=4;wave(c,x,p,cover?'left':'right',cover?-58:58,true);c.stroke();c.restore();
  }
  function particles(c,old,next,p){
    const q=smooth(p),front=-520+(W+1040)*q,cy=H*.5+Math.sin(q*TAU)*105;
    image(c,old);
    c.save();wave(c,front-145,p,'left');c.clip();image(c,next);c.restore();
    // A single travelling spiral carries the reveal, rather than random pixels dissolving.
    const envelope=Math.sin(Math.PI*p),radius=65+envelope*330;
    for(let i=0;i<points.length;i++){
      const v=points[i],a=v.a+q*6,r=Math.sqrt(v.r)*radius;
      const x=front-80+Math.cos(a)*r,y=cy+Math.sin(a)*r*.75+(v.r-.5)*300;
      c.fillStyle=i%7?BLUE:PAPER;c.globalAlpha=.35+v.r*.6;c.beginPath();c.arc(x,y,v.s*(.7+envelope*.6),0,TAU);c.fill();
    }
    c.globalAlpha=1;c.fillStyle=PAPER;c.beginPath();c.arc(front-64,cy,5+envelope*8,0,TAU);c.fill();
  }
  function bauhaus(c,old,next,p){
    image(c,p<.5?old:next);
    for(let j=0;j<4;j++){
      const col=j%2,row=Math.floor(j/2),x=col*W/2,y=row*H/2;
      const enter=out((p-j*.035)/.31),leave=out((p-.57-j*.025)/.3),dy=(1-enter-leave)*H/2;
      c.save();c.beginPath();c.rect(x,y,W/2,H/2);c.clip();c.translate(x,y+dy);
      c.fillStyle=j%2?PAPER:BLUE;c.fillRect(0,0,W/2,H/2);
      c.strokeStyle=INK;c.lineWidth=5;c.strokeRect(0,0,W/2,H/2);
      c.translate(W/4,H/4);c.rotate((1-enter)*Math.PI*.6+leave*Math.PI*.2);
      if(j===0){c.fillStyle=INK;c.beginPath();c.arc(0,0,166,0,TAU);c.fill();c.fillStyle=BLUE;c.fillRect(-184,0,368,190)}
      else if(j===1){polygon(c,[[-170,145],[0,-164],[170,145]],INK)}
      else if(j===2){c.fillStyle=PAPER;c.fillRect(-184,-115,368,230);c.strokeStyle=INK;c.lineWidth=6;c.strokeRect(-184,-115,368,230)}
      else{c.fillStyle=BLUE;c.fillRect(-180,-150,360,300);c.fillStyle=INK;c.fillRect(-180,-150,178,300)}
      c.restore();
    }
  }
  function comic(c,old,next,p){
    image(c,next);
    for(let j=2;j>=0;j--){
      const q=out((p-j*.075)/.76),x=j*W/3,skew=95;
      c.save();c.translate(0,(j%2?-1:1)*q*(H+230));c.translate(x+W/6,H/2);c.rotate((j-1)*q*.105);c.translate(-x-W/6,-H/2);
      const left=j?x-skew:-180,right=j===2?W+180:x+W/3+skew;
      c.save();polygon(c,[[left,-100],[right,-100],[right+skew,H+100],[left+skew,H+100]]);c.clip();image(c,old);c.restore();
      polygon(c,[[right-35,-100],[right,-100],[right+skew,H+100],[right+skew-35,H+100]],PAPER,INK,7);
      c.strokeStyle=INK;c.lineWidth=8;c.beginPath();c.moveTo(left,-100);c.lineTo(left+skew,H+100);c.stroke();
      if(q>.04&&q<.96){c.strokeStyle=BLUE;c.lineWidth=3;for(let k=0;k<8;k++){c.beginPath();c.moveTo(x+60+k*54,270);c.lineTo(x+95+k*54,400+q*380);c.stroke()}}
      c.restore();
    }
  }
  function brutal(c,old,next,p,options){
    image(c,p<.5?old:next);
    const words=options.words??['IDEAS','INTO','REALITY.'];
    for(let j=0;j<3;j++){
      const enter=out((p-j*.055)/.28),leave=out((p-.57-j*.04)/.27),x=-W-150+(W+100)*enter+(W+200)*leave,y=j*H/3-6;
      c.fillStyle=INK;c.fillRect(x+23,y+23,W+120,H/3+18);
      c.fillStyle=j===1?PAPER:BLUE;c.fillRect(x,y,W+120,H/3+18);c.strokeStyle=INK;c.lineWidth=12;c.strokeRect(x,y,W+120,H/3+18);
      c.save();c.beginPath();c.rect(x+30,y+25,W+35,H/3-32);c.clip();c.fillStyle=INK;c.font='700 232px Display';c.textAlign='left';c.textBaseline='middle';c.fillText(String(words[j]??''),x+100,y+H/6+6,W-80);c.restore();
    }
  }
  function kinetic(c,old,next,p,options){
    const word=typeof options.word==='string'?options.word:'BUILD';
    const wordKey=word.toUpperCase().replace(/[^A-Z0-9]/g,'');
    const variant=options.variant??(['THINK','STILL'].includes(wordKey)?'lines':['BEYOND','NEXT'].includes(wordKey)?'wordwipe':'plate');
    if(!['plate','lines','wordwipe'].includes(variant))throw new TypeError(`Unknown kinetic variant: ${variant}`);
    if(variant==='wordwipe'){
      image(c,old);
      const direction=wordKey==='NEXT'?-1:1,scale=.13+smooth(p/.69)*2.2,x=W/2+direction*W*.18*Math.sin(p*Math.PI);
      c.save();c.translate(x,H/2);c.rotate(direction*-.065*Math.sin(p*Math.PI));c.scale(scale,scale);
      c.font='700 460px Display';c.textAlign='center';c.textBaseline='middle';
      c.globalCompositeOperation='destination-out';c.fillStyle=INK;c.fillText(word,0,0,W*1.12);c.restore();
      const sweep=smooth((p-.42)/.56)*W;c.globalCompositeOperation='destination-out';c.fillRect(direction>0?0:W-sweep,0,sweep,H);
      c.globalCompositeOperation='destination-over';image(c,next);c.globalCompositeOperation='source-over';
      if(p<.86){c.save();c.translate(x,H/2);c.rotate(direction*-.065*Math.sin(p*Math.PI));c.scale(scale,scale);c.font='700 460px Display';c.textAlign='center';c.textBaseline='middle';c.strokeStyle=BLUE;c.lineWidth=2.2/scale;c.globalAlpha=Math.sin(Math.PI*clamp(p/.86));c.strokeText(word,0,0,W*1.12);c.restore()}
      return;
    }
    if(variant==='lines'){
      image(c,p<.5?old:next);
      for(let j=0;j<3;j++){
        const direction=j%2?-1:1,enter=out((p-j*.035)/.3),leave=out((p-.57-j*.025)/.3),x=direction*((1-enter)-leave)*(W+260),y=j*H/3;
        c.save();c.beginPath();c.rect(0,y,W,H/3);c.clip();c.translate(W/2+x,y+H/6);c.rotate((j-1)*.035*(1-enter+leave));
        c.fillStyle=j===1?PAPER:BLUE;c.fillRect(-W*.7,-H/3,W*1.4,H*2/3);
        c.textAlign='center';c.textBaseline='middle';c.font='700 355px Display';c.lineWidth=5;
        if(j===1){c.strokeStyle=INK;c.strokeText(word,0,3,W*1.03)}else{c.fillStyle=INK;c.fillText(word,0,3,W*1.03)}c.restore();
      }
      return;
    }
    image(c,p<.5?old:next);
    const enter=out(p/.31),leave=out((p-.59)/.35),y=(1-enter-leave)*H*1.4;
    c.save();c.translate(W/2,H/2+y);c.rotate(-.025*Math.sin(p*Math.PI));
    c.fillStyle=BLUE;c.fillRect(-W*.75,-H*.7,W*1.5,H*1.4);
    c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';c.font='700 530px Display';
    const scale=1+.22*(1-enter)+.7*leave;c.scale(scale,scale);c.fillText(word,0,-5,W*(wordKey.length>6?.96:1.1));
    c.restore();
  }
  return(c,outgoing,incoming,kind,p,options={})=>{
    if(!kinds.has(kind))throw new TypeError(`Unknown portfolio transition: ${kind}`);
    if(!Number.isFinite(p))throw new TypeError('Transition progress must be finite');
    if(!c||!outgoing||!incoming)throw new TypeError('Transition needs a context and both scene canvases');
    p=clamp(p);c.save();
    try{
      c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);
      if(p===0){image(c,outgoing);return}if(p===1){image(c,incoming);return}
      if(kind==='liquid')liquid(c,outgoing,incoming,p);
      else if(kind==='particles')particles(c,outgoing,incoming,p);
      else if(kind==='bauhaus')bauhaus(c,outgoing,incoming,p);
      else if(kind==='comic')comic(c,outgoing,incoming,p);
      else if(kind==='brutal')brutal(c,outgoing,incoming,p,options);
      else kinetic(c,outgoing,incoming,p,options);
    }finally{c.restore()}
  };
}
