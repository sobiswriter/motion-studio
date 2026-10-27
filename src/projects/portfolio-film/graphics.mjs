const W=1920,H=1080,TAU=Math.PI*2;
const ink='#080D12',paper='#F1F0E8',blue='#A7D4ED';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>1-(1-clamp(x))**4;
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const hash=n=>{const s=Math.sin(n*127.1+19.43)*43758.5453;return s-Math.floor(s)};

function begin(c,t,duration,bg){
  if(!Number.isFinite(t))throw new TypeError('Graphic time must be finite.');
  c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);
  c.fillStyle=bg;c.fillRect(0,0,W,H);return Math.max(0,Math.min(duration,t));
}
function label(c,str,x,y,size=25,col=paper){
  c.fillStyle=col;c.font=`400 ${size}px Mono`;c.textAlign='left';c.textBaseline='alphabetic';c.fillText(str,x,y);
}
function line(c,x1,y1,x2,y2,col=blue,width=2){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineWidth=width;c.strokeStyle=col;c.stroke();}
function dot(c,x,y,r,col=blue){c.beginPath();c.arc(x,y,Math.max(.01,r),0,TAU);c.fillStyle=col;c.fill();}
function face(c,size,font='Display',weight=600){c.font=`${font==='Editorial'?'italic ':''}${weight} ${size}px ${font}`;c.textAlign='left';c.textBaseline='alphabetic';}
function reveal(c,str,x,y,size,t,start,col=paper,font='Display',weight=600,width=1700){
  if(t<=start)return;
  const p=ease((t-start)/.55);
  c.save();c.beginPath();c.rect(x-5,y-size*1.1,width+10,size*1.3);c.clip();
  face(c,size,font,weight);const measured=c.measureText(str).width;const fit=Math.min(1,width/Math.max(1,measured));
  c.translate(x,y+(1-p)*size*1.18);c.scale(fit,1);c.fillStyle=col;c.fillText(str,0,0);c.restore();
}
function pointFlight(c,t){
  const gather=smooth(t/1.45),release=smooth((t-3.35)/2.65);
  for(let j=0;j<220;j++){
    const q=j/219,a=q*TAU*2.3+hash(j+4)*.4;
    const r=120+hash(j+2)*300,dx=Math.cos(a)*r,dy=Math.sin(a)*r*.53;
    const lag=smooth((t-hash(j+17)*.3)/1.35);
    const x=1520+dx*(1-lag)+(q-.5)*470*release;
    const y=460+dy*(1-lag)+Math.sin(q*TAU+1.5)*45*release;
    c.globalAlpha=(.18+.65*hash(j+1))*(1-gather*.8)*(1-release*.4);
    dot(c,x,y,.7+hash(j+11)*2.1);
  }
  c.globalAlpha=1;
  const x=1520+190*Math.sin(release*Math.PI*.8),y=460-165*release;
  dot(c,x,y,9+5*ease(t/.4));
  line(c,1520,460,x,y,blue,1.5);
  return {x,y};
}

export const graphicTimings={
  opening:{duration:6,contacts:[.27,.66,1.98,2.22,2.78,4.43,4.72],lands:[.82,1.21,2.53,2.77,3.33,4.98,5.27],proof:[.7,1.4,2.35,3.3,4.4,5.5]},
  closing:{duration:10,contacts:[.2,.64,4.1,4.42,5.62,6.5],lands:[.75,1.19,4.65,4.97,6.12,7.1],proof:[.8,2.8,4.1,4.3,5.5,7.2,9.8]},
  chapters:{
    work:{duration:4,contacts:[.12,.82,1.45],lands:[.62,1.32,2],proof:[.4,1.2,2.4,3.8]},
    ai:{duration:4,contacts:[.16,.91,1.66],lands:[1.01,1.76,2.51],proof:[.5,1.25,2.1,3.8]},
    tools:{duration:4,contacts:[.12,.46,1.55,2.03],lands:[.67,1.01,2.05,2.58],proof:[.6,1.4,2.5,3.8]},
    human:{duration:4,contacts:[.15,.84],lands:[.65,1.95],proof:[.5,1.3,2.4,3.8]},
  },
};

export function drawOpening(c,seconds){
  const t=begin(c,seconds,6,ink);
  const point=pointFlight(c,t);
  label(c,'SOBI  /  SELECTED WORK',120,135,25);
  label(c,'A PERSONAL UNIVERSE',120,985,24,'#A7D4ED');
  label(c,'2026',1680,985,24,'#A7D4ED');
  line(c,120,181,120+1680*ease(t/.85),181,'#A7D4ED',1);

  const shift=ease((t-1.58)/.55);
  c.save();c.beginPath();c.rect(110,250,1700,470);c.clip();c.translate(-shift*1950,0);
  reveal(c,'BOUND BY',120,421,148,t,.27,paper,'Display',500,1380);
  reveal(c,'curiosity.',113,662,250,t,.66,blue,'Editorial',500,1450);
  c.restore();

  const turn=ease((t-4.25)/.6);
  c.save();c.beginPath();c.rect(108,235,1700,690);c.clip();c.translate((1-ease((t-1.9)/.55))*110,-turn*900);
  reveal(c,'SOURADIP',120,437,176,t,1.98,paper,'Display',500,1330);
  reveal(c,'Biswas.',110,675,258,t,2.22,paper,'Editorial',500,1330);
  if(t>2.78){
    const p=ease((t-2.78)/.55);c.save();c.beginPath();c.rect(120,745,1450*p,62);c.clip();label(c,'AI/ML DEVELOPER  ·  FULL-STACK ENGINEER',120,785,31);c.restore();
  }
  const p=ease((t-2.8)/.7);line(c,120,858,120+1130*p,858,blue,3);
  if(t>3.1){
    c.save();c.globalAlpha=ease((t-3.1)/.4);label(c,'BOUND BY CURIOSITY. LIMITLESS BY NATURE.',120,919,23,blue);c.restore();
  }
  c.restore();
  reveal(c,'A PERSONAL',120,442,154,t,4.43,paper,'Display',500,1600);
  reveal(c,'universe.',110,702,264,t,4.72,blue,'Editorial',500,1570);
  if(t>5.05){const p=ease((t-5.05)/.5);line(c,120,815,120+1430*p,815,blue,2);label(c,'PROJECTS  /  AI  /  RESEARCH  /  PEOPLE',120,884,27,paper);}
  line(c,point.x,point.y,point.x+42,point.y,blue,1.5);
  c.restore();
}

function arrow(c,x,y,p,col=ink){
  const s=36*ease(p);line(c,x,y,x+s,y-s,col,3);line(c,x+s,y-s,x+s,y-s+22,col,3);line(c,x+s,y-s,x+s-22,y-s,col,3);
}

export function drawClosing(c,seconds){
  const t=begin(c,seconds,10,paper);
  label(c,'SOBI  /  A PERSONAL UNIVERSE',120,135,25,ink);
  line(c,120,181,1800,181,ink,1);
  const move=smooth((t-3.8)/.7);
  c.save();c.beginPath();c.rect(108,255,1700,535);c.clip();c.translate(0,-move*790);
  reveal(c,'LET’S BUILD',120,450,155,t,.2,ink,'Display',500,1640);
  reveal(c,'what’s next.',108,703,252,t,.64,ink,'Editorial',500,1680);
  c.restore();

  const settle=ease((t-4.35)/1.2);
  for(let j=0;j<120;j++){
    const q=j/119,a=q*TAU*1.8;
    const px=1500+Math.cos(a)*(250+hash(j)*120),py=580+Math.sin(a)*195;
    c.globalAlpha=(.2+hash(j+5)*.65)*(1-settle);
    dot(c,px+(1650-px)*settle,py+(826-py)*settle,1+hash(j+7)*2.3,ink);
  }
  c.globalAlpha=1;
  reveal(c,'Souradip',120,437,162,t,4.1,ink,'Display',500,1550);
  reveal(c,'Biswas.',112,650,242,t,4.42,ink,'Editorial',500,1530);
  if(t>5.62){
    const p=ease((t-5.62)/.5);c.save();c.beginPath();c.rect(120,701,1590*p,65);c.clip();label(c,'AI/ML DEVELOPER  ·  FULL-STACK ENGINEER',120,745,31,ink);c.restore();
  }
  if(t>6.5){
    const p=ease((t-6.5)/.6);c.save();c.beginPath();c.rect(120,800,690*p,120);c.clip();face(c,62,'Display',500);c.fillStyle=ink;c.fillText('sobi.codes',120,866);arrow(c,491,863,p);c.restore();
    line(c,120,892,120+430*p,892,ink,2);
  }
  const travel=smooth(t/9.6),px=1530+190*travel,py=330+496*travel;
  dot(c,px,py,8+6*settle,blue);
  line(c,1530,330,px,py,blue,1.5);
  label(c,'LET’S BUILD WHAT’S NEXT.',120,985,25,ink);
  label(c,'2026',1680,985,24,ink);
  c.restore();
}

function kineticWord(c,str,x,y,size,t,start,col=paper,width=1680){
  if(t<=start)return;
  const p=ease((t-start)/.5);face(c,size);const fit=Math.min(1,width/Math.max(1,c.measureText(str).width));
  c.save();c.beginPath();c.rect(110,215,1700,730);c.clip();c.translate(x,y);c.scale(fit*(2.35-1.35*p),1);c.fillStyle=col;c.fillText(str,0,0);c.restore();
}
function trackingWord(c,str,x,y,size,t,start,col=ink,width=1680){
  if(t<=start)return;
  const p=ease((t-start)/.5);face(c,size,'Display',500);
  const track=45*(1-p),letters=[...str],length=letters.reduce((n,ch)=>n+c.measureText(ch).width,0)+track*(letters.length-1);
  c.save();c.translate(x,y);c.scale(Math.min(1,width/Math.max(1,length)),1);c.fillStyle=col;let cursor=0;
  for(const ch of letters){c.fillText(ch,cursor,0);cursor+=c.measureText(ch).width+track;}
  c.restore();
}
function dockWord(c,str,t,start,row,col){
  if(t<=start)return;
  const arrive=ease((t-start)/.28),dock=smooth((t-start-.33)/.52),size=350-168*dock;
  face(c,size);const fit=Math.min(1,1680/Math.max(1,c.measureText(str).width));
  c.save();c.beginPath();c.rect(110,row-195,1700,225);c.clip();c.translate(120+120*(1-arrive),row+90*(1-arrive));c.scale(fit,1);c.fillStyle=col;c.fillText(str,0,0);c.restore();
}
function humanWord(c,t){
  const str='BECOMING.',size=228,start=.84;face(c,size,'Editorial',500);
  const letters=[...str],length=letters.reduce((n,ch)=>n+c.measureText(ch).width,0),fit=Math.min(1,1640/Math.max(1,length));
  c.save();c.beginPath();c.rect(110,480,1700,345);c.clip();c.translate(112,742);c.scale(fit,1);let cursor=0;
  for(const [j,ch]of letters.entries()){
    const local=t-start-j*.065;
    if(local>0){const p=ease(local/.5);c.save();c.translate(cursor,(1-p)*280);c.rotate((1-p)*.12);c.fillStyle=ink;c.fillText(ch,0,0);c.restore();}
    cursor+=c.measureText(ch).width;
  }
  c.restore();
}

export function drawChapter(c,id,seconds){
  if(!Object.hasOwn(graphicTimings.chapters,id))throw new RangeError(`Unknown chapter: ${id}`);
  const bg=id==='tools'?blue:id==='ai'?ink:paper,col=id==='ai'?paper:ink;
  const t=begin(c,seconds,4,bg),q=smooth(t/4);
  label(c,({work:'01  /  SELECTED WORK',ai:'02  /  AI & EXPERIMENTS',tools:'03  /  TECHNICAL PRACTICE',human:'04  /  THE PERSON'})[id],120,135,25,col);
  line(c,120,181,1800,181,col,1);
  if(id==='work'){
    kineticWord(c,'IDEAS.',120,405,266,t,.12,ink);
    trackingWord(c,'BUILT FOR',126,594,139,t,.82,ink);
    reveal(c,'THE REAL WORLD.',120,838,190,t,1.45,ink,'Display',600,1670);
    line(c,1690,300,1690,300+590*q,ink,2);dot(c,1690,300+590*q,13,blue);
  }else if(id==='ai'){
    dockWord(c,'THINK.',t,.16,350,paper);dockWord(c,'TEST.',t,.91,575,paper);dockWord(c,'BUILD.',t,1.66,800,blue);
    const y=310+510*q;dot(c,1670,y,14,blue);line(c,1640,y,1700,y,blue,2);
  }else if(id==='tools'){
    const dock=smooth((t-1.25)/.7);c.save();c.translate(120,410-135*dock);c.scale(1-.72*dock,1-.72*dock);
    reveal(c,'KNOW THE',0,0,154,t,.12,ink,'Display',600,1640);reveal(c,'TOOLS.',0,330,310,t,.46,ink,'Display',600,1640);c.restore();
    kineticWord(c,'BUILD',120,620,260,t,1.55,ink);
    trackingWord(c,'BEYOND THEM.',126,846,173,t,2.03,ink,1670);
    dot(c,1700,275+90*q,18,paper);line(c,1700,275,1700,275+90*q,paper,2);
  }else{
    kineticWord(c,'STILL',120,440,214,t,.15,ink,1550);humanWord(c,t);
    line(c,125,852,125+1440*q,852,ink,1.5);dot(c,125+1440*q,852,12,blue);
  }
  label(c,'SOURADIP BISWAS  /  SOBI.CODES',120,985,24,col);
  c.restore();
}
