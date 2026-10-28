const W=1920,TAU=Math.PI*2;

function gaming(c,t,images,k){
  const {INK,YELLOW,smooth,ease,txt,product,back,brand,qualifier,line,dot}=k;
  back(c,YELLOW);brand(c,'GAMING MODE',true);
  // Graphic race lanes convey pace; they are not a latency measurement trace.
  c.save();c.globalAlpha=.11;c.fillStyle=INK;
  for(let lane=0;lane<9;lane++){
    const z=((lane/9+t*.27)%1),y=360+z*z*690,spread=170+z*1250;
    c.beginPath();c.moveTo(960-spread,y);c.lineTo(960+spread,y);c.lineTo(960+spread+30,y+6+z*10);c.lineTo(960-spread-30,y+6+z*10);c.closePath();c.fill();
  }
  for(let lane=-5;lane<=5;lane++)line(c,960+lane*60,360,960+lane*360,1080,INK,2);
  c.restore();
  const first=ease((t+.08)/.74),second=ease((t-.12)/.74),x=650+Math.sin(t*.5)*6;
  c.save();c.beginPath();c.rect(160,275,1170,600);c.clip();
  txt(c,'4',x-210,798+(1-first)*570,550,INK,700,'center');
  txt(c,'5',x+130,798+(1-second)*570,550,INK,700,'center');c.restore();
  txt(c,'ms',1110,792,125,INK,600);
  const enter=ease((t-.1)/.95),pulse=Math.sin(t*.9)*10;
  product(c,images,'bud-1.png',1510+(1-enter)*420,610+pulse,645,-.19+Math.sin(t*.6)*.035);
  product(c,images,'bud-2.png',1335+(1-enter)*620,436-pulse,400,.23+Math.sin(t*.6+.7)*.025);
  c.save();c.globalAlpha=.8;
  for(let id=0;id<18;id++){
    const q=(id/18+t*.36)%1,xx=1730-q*600,yy=315+(id%3)*230;
    line(c,xx,yy,xx+28+q*105,yy,INK,id%3===0?3:1.5);
    if(id%4===0)dot(c,xx,yy,3.2,INK);
  }
  c.restore();
  txt(c,'LOW LATENCY',96,208,72,INK,650);
  txt(c,'GAMING MODE',96,944,27,INK,500,'left','Mono');
  // A second, authored plate arrival develops the eight-second chapter.
  const plate=ease((t-5.05)/.6),plateX=-(W+160)*(1-plate);
  if(plate>0){
    c.fillStyle=INK;c.fillRect(plateX,128,W+160,128);
    txt(c,'GAME ON.',plateX+96,225,92,YELLOW,650);
    for(let j=0;j<4;j++)c.fillRect(plateX+1650+j*34,160,14,62);
  }
  const accent=smooth((t-2.2)/.3)*(1-smooth((t-2.8)/.35));
  c.save();c.globalAlpha=accent;
  for(let i=0;i<8;i++){const a=i*TAU/8;line(c,1510+Math.cos(a)*260,580+Math.sin(a)*260,1510+Math.cos(a)*295,580+Math.sin(a)*295,INK,3)}c.restore();
  qualifier(c,'45ms in Gaming Mode; earbud-side latency · realme Lab; actual results vary.',true);
}

function bluetooth(c,t,images,k){
  const {INK,WHITE,CYAN,smooth,ease,txt,product,back,brand,qualifier,ring,line,dot}=k;
  back(c,INK);brand(c,'BLUETOOTH 5.4');
  const drift=Math.sin(t*.4)*12;
  c.save();c.globalAlpha=.12;
  for(let row=0;row<12;row++){const z=row/12,y=390+z*z*620+drift;line(c,0,y,W,y,CYAN,1)}
  for(let col=-10;col<=10;col++)line(c,960+col*44+drift,390,960+col*210,1000,CYAN,1);
  c.restore();
  const arrival=ease((t+.1)/.85);
  c.save();c.beginPath();c.rect(120,160,1680,380);c.clip();
  txt(c,'5.4',960,505+(1-arrival)*380,392,CYAN,600,'center');c.restore();
  txt(c,'BLUETOOTH',960,206,38,WHITE,500,'center','Mono');
  const sweep=smooth((t-.25)/1.5),spin=t*.24;
  ring(c,960,737,585,178,.02,CYAN,2,-Math.PI,-Math.PI+sweep*TAU);
  ring(c,960,737,650,205,.02,'#284349',1);
  c.save();c.globalAlpha=.3;ring(c,960,737,710,238,.02,CYAN,1);c.restore();
  for(let i=0;i<4;i++){
    const a=i*TAU/4+spin,xx=960+585*Math.cos(a),yy=737+178*Math.sin(a);
    dot(c,xx,yy,i===0?7:3.5,i===0?WHITE:CYAN);
    line(c,xx,yy,xx+Math.cos(a)*24,yy+Math.sin(a)*12,CYAN,2);
  }
  const lift=(1-ease((t-.15)/1))*90;
  c.save();c.beginPath();c.rect(0,330,1920,590);c.clip();
  product(c,images,'case.png',960+Math.sin(t*.55)*10,700+lift+Math.cos(t*.45)*6,380,-.015+Math.sin(t*.3)*.012);c.restore();
  txt(c,'WIRELESS. IN MOTION.',960,965,31,WHITE,500,'center');
  qualifier(c,'Bluetooth 5.4 · connection experience depends on devices and surroundings.');
}

function translation(c,t,images,k){
  const {INK,WHITE,YELLOW,smooth,ease,txt,product,back,brand,qualifier,dot}=k;
  back(c,WHITE);brand(c,'AI LIVE TRANSLATOR',true);
  const words=['AI','LIVE','TRANSLATOR'],exit=smooth((t-2.4)/.8);
  if(exit<1){
    for(let i=0;i<3;i++){
      const enter=ease((t-i*.13+.12)/.65),x=90+(1-enter)*(W+200)-(i+1)*exit*250+Math.sin(t*.7)*14;
      const y=145+i*224-exit*(1150+i*90),width=i===0?600:i===1?1030:1735;
      c.save();c.translate(x,y);c.rotate((1-enter)*.06-exit*.035*(i-1));
      c.fillStyle=INK;c.fillRect(18,15,width,195);c.fillStyle=i===1?YELLOW:WHITE;c.fillRect(0,0,width,195);c.strokeStyle=INK;c.lineWidth=5;c.strokeRect(0,0,width,195);
      txt(c,words[i],34,153,i===2?166:178,INK,650);
      c.fillStyle=INK;for(let j=0;j<5;j++)for(let row=0;row<3;row++)dot(c,width-80+j*10,28+row*10,1.6,INK);
      c.restore();
    }
    txt(c,'REALME LINK',96,941,27,INK,400,'left','Mono');
  }
  const second=ease((t-2.75)/.85);
  if(second>0){
    c.save();c.translate(0,(1-second)*940);
    txt(c,'FACE-TO-FACE',960,285,126,INK,650,'center');
    const left=580+Math.sin(t*.6)*9,right=1330+Math.cos(t*.6)*9;
    product(c,images,'bud-1.png',left,620,435,-.14+Math.sin(t*.4)*.02);
    product(c,images,'bud-2.png',right,620,435,.14+Math.cos(t*.4)*.02);
    txt(c,'YOU',left,905,27,INK,400,'center','Mono');txt(c,'THEM',right,905,27,INK,400,'center','Mono');
    const reveal=smooth((t-3.35)/.75);
    c.save();c.beginPath();c.rect(755,400,410*reveal,400);c.clip();
    for(let band=0;band<3;band++){
      c.strokeStyle=band===1?INK:YELLOW;c.lineWidth=band===1?4:2;c.beginPath();
      for(let i=0;i<=90;i++){const x=750+i*4.7,y=588+band*26+Math.sin(i*.17-t*5.5)*Math.sin(i/90*Math.PI)*40;if(i)c.lineTo(x,y);else c.moveTo(x,y)}c.stroke();
    }
    for(let id=0;id<9;id++){const q=(id/9+(t-3.35)*.45)%1;dot(c,760+q*397,614+Math.sin(q*TAU-t*3)*32,2.4+(id%3),id%2?INK:YELLOW)}
    c.restore();
    txt(c,'AI LIVE TRANSLATOR',960,956,31,INK,500,'center');c.restore();
  }
  qualifier(c,'Enable in realme Link · feature availability and compatible device required.',true);
}

export function drawDetail(c,id,t,images,kit){
  if(!['gaming','bluetooth','translation'].includes(id))return false;
  if(!Number.isFinite(t))throw new RangeError('Detail scene time must be finite');
  t=Math.max(0,t);
  if(id==='gaming')gaming(c,t,images,kit);else if(id==='bluetooth')bluetooth(c,t,images,kit);else translation(c,t,images,kit);
  return true;
}
