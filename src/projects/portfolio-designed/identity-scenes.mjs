import {ease,smooth} from './sequence.mjs';
const W=1920,H=1080,I='#080D12',P='#F1F0E8',B='#A7D4ED',TAU=Math.PI*2;
const txt=(c,s,x,y,size=32,color=P,font='Display',weight=600,align='left')=>{c.fillStyle=color;c.font=`${weight} ${size}px ${font}`;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(s,x,y)};
const box=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
const dot=(c,x,y,r,color=B)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()};
const line=(c,x,y,xx,yy,color=B,width=2)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke()};
function ring(c,x,y,rx,ry,rot=0,color=B,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);c.stroke()}
function head(c,section,dark=true){const col=dark?P:I;txt(c,'SOBIVERSE',80,70,25,col,'Mono',400);txt(c,section,1840,70,23,col,'Mono',400,'right');line(c,80,94,1840,94,col,1)}
function foot(c,copy,dark=true){txt(c,copy,80,1012,24,dark?P:I,'Mono',400);dot(c,1828,1003,7,dark?B:I)}
function reveal(c,s,x,y,size,t,color=P,font='Display',weight=650,width=1760){const q=ease(t);c.save();c.beginPath();c.rect(x-4,y-size-15,width,size*1.28+20);c.clip();txt(c,s,x,y+(1-q)*size*1.3,size,color,font,weight);c.restore()}
function arrow(c,x,y,size=70,color=I){line(c,x-size,y+size,x,y,color,9);line(c,x-size*.75,y,x,y,color,9);line(c,x,y,x,y+size*.75,color,9)}
function letterword(c,word,y,size,spread,color=P){c.font=`700 ${size}px Display`;const widths=[...word].map(x=>c.measureText(x).width),total=widths.reduce((a,b)=>a+b,0)+spread*(word.length-1);let x=(W-total)/2;for(let i=0;i<word.length;i++){txt(c,word[i],x,y,size,color,'Display',700);x+=widths[i]+spread}}

function opening(c,t){
  box(c,0,0,W,H,P);head(c,'A PERSONAL PORTFOLIO / 2026',false);
  const turn=ease((t-2.77)/.7);
  c.save();c.translate(0,-turn*H);
  txt(c,'A RESTLESS MIND.',102,280,30,I,'Mono',400);
  reveal(c,'curiosity',95,620,350,t/.65+.2,I,'Editorial',500);
  dot(c,1595-90*smooth(t/2.7),570,92+8*Math.sin(t*2),B);
  const ink=ease((t-.82)/.7);line(c,105,693,105+1690*ink,693,I,5);
  txt(c,'Ideas are only the beginning.',110,819,59,I,'Display',500);
  foot(c,'AI / ML  +  FULL-STACK ENGINEERING',false);c.restore();
  if(t>=2.77){
    box(c,0,H*(1-turn),W,H,B);c.save();c.beginPath();c.rect(0,H*(1-turn),W,H);c.clip();
    txt(c,'MEET THE MIND BEHIND THE SYSTEMS',960,249,29,I,'Mono',400,'center');
    letterword(c,'SOBI',755+100*(1-turn),600,60*(1-turn)+65*ease((t-5.27)/.7),I);
    txt(c,'SOURADIP BISWAS',960,915,38,I,'Mono',400,'center');
    ring(c,960,559,798,365,Math.sin(t)*.012,I,2);c.restore();
  }
}

function universe(c,t){
  box(c,0,0,W,H,I);head(c,'01 / THE MULTIVERSE');
  const mode=smooth((t-3.3)/1.3),last=smooth((t-7.1)/.8),rot=t*.12;
  c.save();c.translate(960,575);c.rotate(rot);
  for(let j=0;j<3;j++)ring(c,0,0,410,130+j*32,j*Math.PI/3,B,1.5);
  for(let n=0;n<240;n++){
    const a=n*2.399963+t*.08,r=190+210*((n*47%239)/239),z=Math.sin(n*1.79+t*.18);
    const x=Math.cos(a)*r,y=Math.sin(a)*r*.68;
    c.globalAlpha=.12+.38*((z+1)/2);dot(c,x*(1+mode*.8),y*(1+mode*.8),1.1+(n%4)*.4,n%9===0?P:B);
  }c.globalAlpha=1;c.restore();
  if(mode<1){
    c.save();c.translate(0,-mode*500);reveal(c,'ONE MIND.',960-472,290,166,t/.8,P);c.restore();
    const names=[['CODE',490,621],['AI',1180,410],['INTERACTION',1135,816]];
    for(let i=0;i<names.length;i++){const[s,x,y]=names[i],p=ease((t-.8-i*.22)/.5);box(c,x-20,y-48+(1-p)*70, s.length*25+40,70,I);txt(c,s,x,y+(1-p)*70,37,B,'Mono',400)}
  }
  if(mode>0){
    c.save();c.beginPath();c.rect(70,165,1780,730);c.clip();
    const y=415+(1-mode)*650-last*850;
    txt(c,'MANY',960,y,268,P,'Display',700,'center');txt(c,'WORLDS.',960,y+254,268,P,'Display',700,'center');c.restore();
  }
  if(last>0){
    const words=['CODE','AI','INTERACTION'];
    for(let i=0;i<3;i++){const p=ease((t-7.1-i*.14)/.65),x=80+(i===1?-1:1)*(1-p)*1800;box(c,x,231+i*227,1760,207,i===1?B:P);txt(c,words[i],x+35,390+i*227,i===2?151:186,I,'Display',700);txt(c,`0${i+1}`,x+1690,286+i*227,25,I,'Mono',400,'right')}
  }
  foot(c,'ONE CONTINUOUS THREAD: CURIOSITY.');
}

function overview(c,t){
  box(c,0,0,W,H,B);head(c,'02 / HOW I THINK',false);
  const turn=ease((t-3.8)/.8);
  c.save();c.translate(-turn*W,0);
  reveal(c,'CODE',105,478,360,t/.65,I);txt(c,'with',1260,480,180,I,'Editorial',500);
  reveal(c,'curiosity.',90,825,320,(t-.4)/.8,I,'Editorial',500);
  dot(c,1695,236,65,I);ring(c,1695,236,104,104,t*.2,I);c.restore();
  if(t>=3.8){
    const x=W*(1-turn);box(c,x,115,W,H-230,I);
    c.save();c.translate(x,0);txt(c,'SOURADIP BISWAS',100,206,26,B,'Mono',400);
    reveal(c,'AI / ML',100,420,189,(t-3.9)/.6);reveal(c,'developer.',100,597,189,(t-4.1)/.6);
    line(c,105,654,1815,654,B,3);
    reveal(c,'Full-stack engineer.',105,821,137,(t-5.25)/.7);
    const p=ease((t-6.6)/.65);dot(c,1770,532,42,B);line(c,1770,576,1770,576+315*p,B,4);txt(c,'IDEAS, BUILT INTO SYSTEMS.',105,909,30,B,'Mono',400);
    c.restore();
  }
  foot(c,'APPLIED AI  /  SOFTWARE  /  INTERACTIVE WORLDS',false);
}

function work(c,t){
  box(c,0,0,W,H,I);head(c,'03 / SELECTED WORK');
  const p=ease((t-.62)/.45),q=ease((t-2)/.5);
  c.save();c.translate(960,420);c.rotate(-.025);box(c,-1000,-180,2000,275,P);txt(c,'LESS TALK.',0,35,223,I,'Display',700,'center');c.restore();
  c.save();c.translate(960+(1-p)*2100,735);c.rotate(.028*(1-q));box(c,-1000,-150,2000,277,B);txt(c,'MORE BUILD.',0,60,218,I,'Display',700,'center');c.restore();
  line(c,90,913,90+1740*q,913,B,8);foot(c,'FROM A QUESTION TO SOMETHING PEOPLE CAN USE.');
}

function aiChapter(c,t){
  box(c,0,0,W,H,P);head(c,'04 / APPLIED INTELLIGENCE',false);
  const words=['THINK.','TEST.','BUILD.'],starts=[1.0167,1.7667,2.5167];
  for(let j=0;j<3;j++){
    const y=141+j*276,p=ease((t-starts[j])/.35),initial=ease((t-.2-j*.12)/.5),x=(1-initial)*W*(j%2?1:-1);
    c.save();c.beginPath();c.rect(0,y,W,265);c.clip();box(c,x,y,W,265,j===1?I:P);
    txt(c,words[j],100+x+(1-p)*80,y+218,242,j===1?P:I,'Display',700);
    dot(c,1760+x,y+129,28+44*p,j===1?B:I);c.restore();
    line(c,80,y+267,1840,y+267,I,2);
  }
  foot(c,'ASK BETTER QUESTIONS. BUILD BETTER SYSTEMS.',false);
}

function tools(c,t){
  box(c,0,0,W,H,I);head(c,'06 / CRAFT');
  const phase=ease((t-2.5833)/.4);
  c.save();c.translate(0,-phase*1000);reveal(c,'THE TOOL',90,415,220,t/.5);reveal(c,'IS ONLY',90,653,220,(t-.3)/.5);reveal(c,'THE START.',90,891,220,(t-.55)/.5);c.restore();
  const p=ease((t-1.0167)/.45);c.save();c.translate(1590+400*(1-p),440-phase*1000);c.rotate(-.1+.025*Math.sin(t));box(c,-200,-185,400,390,B);txt(c,'LEARN.',0,6,73,I,'Display',700,'center');arrow(c,92,90,78,I);c.restore();
  if(phase>0){box(c,0,H*(1-phase),W,H,B);c.save();c.beginPath();c.rect(0,H*(1-phase),W,H);c.clip();txt(c,'BUILD.',960,725,430,I,'Display',700,'center');txt(c,'BEYOND THE TOOLKIT.',960,891,32,I,'Mono',400,'center');c.restore()}
  foot(c,'TOOLS CHANGE. THE WILL TO MAKE THINGS STAYS.',phase<.5);
}

function person(c,t,images){
  box(c,0,0,W,H,P);head(c,'08 / THE HUMAN',false);
  const photo=images.get('portrait.jpg');if(!photo)throw new Error('Missing original portrait');
  txt(c,'human',960,690,520,I,'Editorial',500,'center');
  const p=ease((t-.1)/1.2),leave=ease((t-8.9)/.55),r=292*p;
  c.save();c.translate(960,546);c.rotate(-.035+Math.sin(t*.42)*.015);
  box(c,-326+19,-362+21,652,762,I);box(c,-326,-362,652,762,B);
  c.beginPath();c.arc(0,-30,Math.max(.01,r),0,TAU);c.clip();
  const s=620+120*smooth((t-3.2)/4.7);c.drawImage(photo,-s/2,-s/2-30,s,s);c.restore();
  ring(c,960,516,305,305,0,I,2);
  txt(c,'Souradip Biswas',960,933,83,I,'Display',600,'center');
  txt(c,'A PERSON. A PRACTICE. A WORK IN PROGRESS.',960,150,24,I,'Mono',400,'center');
  c.save();c.translate(1414,255);c.rotate(.12+Math.sin(t*.2)*.03);box(c,-150,-54,300,108,I);txt(c,'CALL ME SOBI.',0,10,28,B,'Mono',400,'center');c.restore();
  c.save();c.translate(322,804);c.rotate(-.08);box(c,-198,-53,396,106,I);txt(c,'ALWAYS LEARNING.',0,8,28,P,'Mono',400,'center');c.restore();
  if(leave>0){c.save();c.translate(0,H*(1-leave));box(c,0,0,W,H,B);txt(c,'KEEP',100,460,290,I,'Display',700);txt(c,'BECOMING.',100,758,260,I,'Display',700);c.restore()}
  foot(c,'BEHIND THE PROJECTS, A RESTLESS MIND.',false);
}

function human(c,t){
  box(c,0,0,W,H,B);head(c,'09 / STILL BECOMING',false);
  const p=ease((t-1.95)/.5);
  c.save();c.translate(960,490);c.rotate(-.025);txt(c,'STILL',0,30,360,I,'Display',700,'center');c.restore();
  c.save();c.beginPath();c.rect(65,565,1790,290);c.clip();txt(c,'CURIOUS.',960+(1-p)*1900,825,270,I,'Display',700,'center');c.restore();
  ring(c,1694,266,87,87,t*.2,I,5);line(c,1666,266,1722,266,I,5);line(c,1694,238,1694,294,I,5);foot(c,'THE NEXT IDEA STARTS WITH A QUESTION.',false);
}

function contact(c,t){
  box(c,0,0,W,H,P);head(c,'10 / AN OPEN INVITATION',false);
  const p=ease((t-.4)/.5),q=ease((t-3)/.55),r=ease((t-5.5)/.65);
  c.save();c.translate(960,370);c.rotate(-.016);box(c,-864,-168,1728,304,I);txt(c,'WHAT SHOULD',0,52,190,P,'Display',700,'center');c.restore();
  c.save();c.translate(960+(1-p)*1950,711);c.rotate(.018);box(c,-864,-180,1728,327,B);txt(c,'WE BUILD?',-60,54,233,I,'Display',700,'center');arrow(c,741,-25,84,I);c.restore();
  if(q>0){
    c.save();c.translate(1460,174+310*(1-q));c.rotate(-.09);box(c,-225+12,-55+12,450,110,I);box(c,-225,-55,450,110,B);c.strokeStyle=I;c.lineWidth=5;c.strokeRect(-225,-55,450,110);txt(c,'LET’S FIND OUT.',0,14,46,I,'Display',700,'center');c.restore();
  }
  line(c,95,916,95+1725*r,916,I,5);txt(c,'A NEW SYSTEM. A STRANGE IDEA. A BETTER QUESTION.',100,980,26,I,'Mono',400);
}

function closing(c,t){
  box(c,0,0,W,H,I);head(c,'SOBIVERSE / SELECTED WORK');
  const portal=ease((t-1.1833)/.7),name=ease((t-4.3167)/.65),url=ease((t-7.1)/.5);
  c.save();c.beginPath();c.rect(70,150,1780,740);c.clip();
  reveal(c,'CURIOSITY,',85,430,205,t/.6);reveal(c,'made tangible.',85,735,237,(t-.35)/.6,P,'Editorial',500);
  dot(c,1760,799,38+20*portal,B);line(c,100,844,100+1615*portal,844,B,3);c.restore();
  if(name>0){
    const panelX=W*(1-name);box(c,panelX,115,W,750,I);
    c.save();c.translate(panelX,0);
    c.save();c.beginPath();c.rect(65,155,1790,325);c.clip();
    txt(c,'Souradip',960,433,254,P,'Display',650,'center');
    c.restore();c.save();c.beginPath();c.rect(65,490,1790,255);c.clip();
    txt(c,'Biswas',960,690,298,P,'Display',650,'center');
    c.restore();c.restore();
    if(t>=4.9667){reveal(c,'AI / ML DEVELOPER  ·  FULL-STACK ENGINEER',960-397,805,32,(t-4.9667)/.35,B,'Mono',400,1000);dot(c,1662,686,28,B)}
  }
  if(t>=7.1){
    c.save();c.beginPath();c.rect(340,869,1240,130);c.clip();box(c,340,869+(1-url)*160,1240,130,B);
    txt(c,'sobiverse.ai.studio',960,955+(1-url)*160,61,I,'Display',600,'center');arrow(c,1511,917+(1-url)*160,34,I);c.restore();
  }
  txt(c,'A RESTLESS MIND. AN OPEN INVITATION.',80,1035,22,P,'Mono',400);txt(c,'LET’S BUILD.',1840,1035,22,B,'Mono',400,'right');
}

export const identityTimings={opening:[.82,2.77,5.27],universe:[.8,3.3,7.1],overview:[.8,3.8,5.25,6.6],work:[.62,2], 'ai-chapter':[1.0167,1.7667,2.5167],tools:[1.0167,2.5833],person:[1.3,8.9],human:[1.95],contact:[.4,3,5.5],closing:[1.1833,4.9667,7.1]};
export function drawIdentityScene(c,id,t,images){
  if(!Number.isFinite(t))throw new RangeError('Scene time must be finite');
  const draw={opening,universe,overview,work,'ai-chapter':aiChapter,tools,person,human,contact,closing}[id];
  if(!draw)return false;c.save();draw(c,Math.max(0,t),images);c.restore();return true;
}
