const W=1920,H=1080,TAU=Math.PI*2;
const INK='#080D12',PAPER='#F1F0E8',BLUE='#A7D4ED';
const lengths={project:7,'project-detail':7,ai:8,research:9,skills:9,experience:10};
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>1-(1-clamp(v))**4;
const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
function text(c,s,x,y,size=32,color=INK,font='Display',weight=500,align='left'){
  c.fillStyle=color;c.font=`${font==='Editorial'?'italic ':''}${weight} ${size}px ${font}`;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(s,x,y);
}
function rule(c,x,y,w,color=INK,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x+w,y);c.stroke();}
function dot(c,x,y,r,color=INK){c.beginPath();c.arc(x,y,Math.max(.01,r),0,TAU);c.fillStyle=color;c.fill();}
function box(c,x,y,w,h,fill,stroke=INK,width=3){c.fillStyle=fill;c.fillRect(x,y,w,h);if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.strokeRect(x,y,w,h)}}
function reveal(c,s,x,y,size,t,start,color=INK,font='Display',weight=500,width=1700,align='left'){
  const q=ease((t-start)/.55);if(q<=0)return;c.save();c.beginPath();c.rect((align==='center'?x-width/2:x)-3,y-size*1.12,width+6,size*1.4);c.clip();
  c.translate(0,(1-q)*size*1.3);text(c,s,x,y,size,color,font,weight,align);c.restore();
}
function plate(c,x,y,w,h,angle,fill,draw){
  c.save();c.translate(x,y);c.rotate(angle);box(c,-w/2+14,-h/2+17,w,h,INK,null);box(c,-w/2,-h/2,w,h,fill);draw(-w/2,-h/2);c.restore();
}
function header(c,number,label,color=INK){
  text(c,number,76,82,25,color,'Mono',400);text(c,label,160,82,25,color,'Mono',400);rule(c,76,109,1768,color,1.5);
}
function cover(c,img,x,y,w,h){
  const ratio=Math.max(w/img.width,h/img.height),iw=img.width*ratio,ih=img.height*ratio;
  c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.drawImage(img,x+(w-iw)/2,y+(h-ih)/2,iw,ih);c.restore();
}

function project(c,t,images){
  c.fillStyle=PAPER;c.fillRect(0,0,W,H);header(c,'01','SELECTED WORK / AGENCY PLATFORM');
  const drift=Math.sin(t*.4)*5;
  c.save();c.translate(0,drift);
  reveal(c,'LaunchSILO',960,291,177,t,-.2,INK,'Display',600,1700,'center');
  c.restore();
  text(c,'LABS',1644,291,35,INK,'Mono',400);
  const expand=ease((t-.25)/1.1),cardY=630+(1-expand)*420;
  c.save();c.translate(960,cardY+drift);c.rotate((1-expand)*.11-.012);
  box(c,-576+18,-248+20,1152,496,INK,null);box(c,-576,-248,1152,496,BLUE);
  const image=images.get('launchsilo.png');if(!image)throw new Error('Missing LaunchSILO proof still');
  cover(c,image,-548,-218,1096,378);
  rule(c,-548,176,1096);text(c,'BUILT TO BRING AMBITIOUS IDEAS TO LIFE.',-545,218,26,INK,'Mono',400);
  c.restore();
  const lock=ease((t-4.12)/.48);
  for(let i=0;i<3;i++){
    const angle=[-.075,.042,-.038][i],x=[255,1630,1520][i],y=[574,490,822][i]+(1-lock)*190;
    if(t<4.12)continue;
    plate(c,x,y,i===2?480:390,136,angle,i===1?INK:BLUE,(px,py)=>{
      const col=i===1?PAPER:INK;text(c,['SCOPE BUILDER','AI ESTIMATES','CMS / INVOICES'][i],px+25,py+83,31,col,'Display',600);
    });
  }
  text(c,'AGENCY OWNER & DEVELOPER',76,1008,27,INK,'Mono',400);text(c,'launchsilo.in',1844,1008,28,INK,'Mono',400,'right');
}

function form(c,kind,x,y,t){
  const land=[2,3.4,4.8][kind],q=ease((t-(land-.52))/.52),w=512,h=552;
  const rot=[-.04,.022,-.025][kind]+Math.sin(t*.35+kind)*.002;
  plate(c,x,y+(1-q)*780,w,h,rot,kind===1?BLUE:PAPER,(px,py)=>{
    text(c,`0${kind+1}`,px+30,py+55,27,INK,'Mono',400);
    text(c,['SCOPE','ESTIMATE','INVOICE'][kind],px+30,py+132,63,INK,'Display',600);rule(c,px+30,py+163,w-60);
    const rows=[['Service','Requirements','Deliverables'],['AI assisted','Budget context','Timeline'],['Client inquiry','Status tracking','PDF export']][kind];
    for(let j=0;j<3;j++){
      const yy=py+226+j*90;text(c,rows[j],px+30,yy,32);rule(c,px+30,yy+24,w-60,INK,1);
      if(kind===0){box(c,px+w-66,yy-22,23,23,BLUE,INK,2);}
      else if(kind===1){const ww=[95,168,124][j];box(c,px+w-202,yy+9,ww,10,INK,null);}
      else {c.beginPath();c.moveTo(px+w-74,yy-15);c.lineTo(px+w-65,yy-4);c.lineTo(px+w-45,yy-30);c.strokeStyle=INK;c.lineWidth=4;c.stroke();}
    }
    text(c,['DEFINE THE WORK','QUALIFY THE INQUIRY','MOVE IT FORWARD'][kind],px+30,py+h-28,24,INK,'Mono',400);
  });
}
function detail(c,t){
  c.fillStyle=INK;c.fillRect(0,0,W,H);header(c,'02','LAUNCHSILO / FROM INQUIRY TO DELIVERY',PAPER);
  reveal(c,'An idea needs a system.',960,258,100,t,-.1,PAPER,'Display',500,1700,'center');
  for(let i=0;i<3;i++){
    const x=[387,960,1533][i],q=ease((t-.12-i*.04)/.32),left=x-256,top=347;
    c.save();c.globalAlpha=.48*q;c.strokeStyle=BLUE;c.lineWidth=2;
    for(const [xx,yy,sx,sy]of [[left,top,1,1],[left+512,top,-1,1],[left,top+552,1,-1],[left+512,top+552,-1,-1]]){
      c.beginPath();c.moveTo(xx,yy+sy*42);c.lineTo(xx,yy);c.lineTo(xx+sx*42,yy);c.stroke();
    }
    text(c,`0${i+1} / ${['DEFINE','QUALIFY','DELIVER'][i]}`,left+28,top+57,25,BLUE,'Mono',400);
    text(c,['SCOPE','ESTIMATE','INVOICE'][i],x,top+139,39,BLUE,'Display',500,'center');
    c.beginPath();c.arc(x,623,31,0,TAU);c.moveTo(x-47,623);c.lineTo(x+47,623);c.moveTo(x,576);c.lineTo(x,670);c.stroke();
    rule(c,left,932,512,BLUE,1);
    c.beginPath();c.moveTo(left,919);c.lineTo(left,944);c.moveTo(left+512,919);c.lineTo(left+512,944);c.stroke();
    c.restore();
  }
  c.save();c.globalAlpha=.38*ease((t-.16)/.35);c.setLineDash([8,12]);rule(c,387,623,1146,BLUE,2);c.setLineDash([]);c.restore();
  for(let j=0;j<25;j++)dot(c,76+j*74,965,2,BLUE);
  const link=smooth((t-2)/2.8);rule(c,420,588,1080*link,BLUE,4);
  for(let j=0;j<3;j++)form(c,j,[387,960,1533][j],623,t);
  text(c,'SCOPE',312,983,25,BLUE,'Mono',400);text(c,'AI-ASSISTED ESTIMATES',960,983,25,BLUE,'Mono',400,'center');text(c,'CMS & INVOICING',1633,983,25,BLUE,'Mono',400,'right');
}

function ai(c,t){
  c.fillStyle=BLUE;c.fillRect(0,0,W,H);header(c,'03','LegalLM / DOCUMENT INTELLIGENCE');
  const float=Math.sin(t*.45)*5;
  c.save();c.translate(0,float);
  text(c,'LegalLM',960,275,157,INK,'Display',600,'center');
  text(c,'Read the answer. Keep the source.',960,350,47,INK,'Editorial',500,'center');
  const gather=ease((t-.1)/1.1),sourceX=420-(1-gather)*710,answerX=1490+(1-gather)*710;
  plate(c,sourceX,651,506,460,-.04,PAPER,(x,y)=>{
    text(c,'SOURCE DOCUMENT',x+28,y+53,25,INK,'Mono',400);rule(c,x+28,y+79,450);
    for(let j=0;j<7;j++){
      const yy=y+135+j*38,ww=[392,340,412,280,386,420,310][j];
      if(j===3){c.fillStyle=BLUE;c.fillRect(x+23,yy-18,ww+18,30);}
      box(c,x+28,yy-8,ww,5,INK,null);
    }
    text(c,'PDF / DOCX / TEXT',x+28,y+425,25,INK,'Mono',400);
  });
  const pulse=ease((t-2.5)/.5);
  c.save();c.translate(960,635);c.rotate(Math.sin(t*.45)*.03);
  for(let i=0;i<70;i++){
    const a=i*2.39996+t*.12,r=40+Math.sqrt(i/69)*125;dot(c,Math.cos(a)*r,Math.sin(a)*r,2+(i%4),INK);
  }
  c.lineWidth=2;c.strokeStyle=INK;c.beginPath();c.arc(0,0,158,-Math.PI*.5,-Math.PI*.5+TAU*ease(t/2));c.stroke();
  box(c,-53,-53,106,106,INK,null);text(c,'AI',0,21,55,PAPER,'Display',500,'center');c.restore();
  plate(c,answerX,651,534,460,.035,INK,(x,y)=>{
    text(c,'STRUCTURED VIEW',x+28,y+53,25,PAPER,'Mono',400);rule(c,x+28,y+79,478,PAPER);
    text(c,'Summary',x+28,y+145,42,PAPER);text(c,'Clauses & risks',x+28,y+224,42,PAPER);text(c,'Document Q&A',x+28,y+303,42,PAPER);
    c.save();c.beginPath();c.rect(x+28,y+339,478*pulse,66);c.clip();box(c,x+28,y+339,478,66,BLUE,null);text(c,'RETURN TO SOURCE',x+46,y+383,27,INK,'Mono',400);c.restore();
  });
  c.strokeStyle=INK;c.lineWidth=3;c.setLineDash([7,9]);c.beginPath();c.moveTo(681,651);c.lineTo(785,651);c.moveTo(1131,651);c.lineTo(1210,651);c.stroke();c.setLineDash([]);
  if(pulse>0){
    c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(1450,894);c.bezierCurveTo(1390,1005,450,1010,425,864);c.stroke();
    dot(c,425,864,9*pulse,INK);
  }
  c.restore();
  text(c,'SUMMARIES / CLAUSE ANALYSIS / SOURCE-CITED ANSWERS',960,1033,25,INK,'Mono',400,'center');
}

function research(c,t){
  c.fillStyle=PAPER;c.fillRect(0,0,W,H);header(c,'04','RESEARCH / A PRACTICE OF ASKING');
  c.save();c.translate(960,615);c.rotate(-.022+Math.sin(t*.25)*.003);
  for(let j=3;j>=0;j--)box(c,-686+j*18,-286-j*15,1372,608,j%2?BLUE:PAPER,INK,2);
  box(c,-686,-286,1372,608,PAPER,INK,3);
  text(c,'RESEARCH NOTES',-641,-226,26,INK,'Mono',400);text(c,'S. BISWAS',641,-226,26,INK,'Mono',400,'right');rule(c,-641,-200,1282);
  text(c,'AI × ML',-641,-30,149,INK,'Display',600);
  text(c,'Questions worth pursuing.',-633,47,52,INK,'Editorial',500);
  rule(c,-641,92,1282);
  for(let j=0;j<3;j++){
    text(c,`0${j+1}`,-633,146+j*56,24,INK,'Mono',400);
    text(c,['Document intelligence','Personas & memory','Creative tooling'] [j],-544,146+j*56,35,INK);
  }
  const mark=ease((t-3.52)/.48);
  if(mark>0){
    c.save();c.translate(396,67+(1-mark)*-400);c.rotate(.09);
    box(c,-244,-166,488,332,BLUE,INK,4);text(c,'PUBLICATION RECORD',-214,-110,24,INK,'Mono',400);rule(c,-214,-85,428);
    text(c,'Patent',-214,5,66,INK,'Display',500);text(c,'publication',-214,80,66,INK,'Display',500);
    text(c,'OCTOBER 2025',-214,139,27,INK,'Mono',400);c.restore();
  }
  c.restore();
  reveal(c,'Keep asking.',960,230,112,t,.15,INK,'Editorial',500,1700,'center');
  text(c,'DOCUMENTS. PEOPLE. CREATIVE TOOLS.',960,1005,26,INK,'Mono',400,'center');
}

function skills(c,t){
  c.fillStyle=INK;c.fillRect(0,0,W,H);header(c,'05','THE TOOLKIT / APPLIED TO REAL WORK',PAPER);
  text(c,'Different tools.',960,267,112,PAPER,'Display',500,'center');
  text(c,'One building instinct.',960,360,87,BLUE,'Editorial',500,'center');
  const settle=ease((t-4.97)/.53);
  const labels=['Python','TypeScript','React','Next.js','Gemini','Firebase'];
  const kinds=['LANGUAGE','LANGUAGE','INTERFACE','APPLICATION','AI','PLATFORM'];
  for(let i=0;i<6;i++){
    const col=i%3,row=Math.floor(i/3),x=422+col*538,y=558+row*245;
    const entrance=ease((t-.3-i*.12)/.7),shift=(1-settle)*(i%2?66:-66),rot=(1-settle)*(i%2?.07:-.07);
    const lift=(1-settle)*[24,-32,18,-18,30,-20][i];
    c.save();c.translate(x+shift,y+lift+(1-entrance)*570+Math.sin(t*.32+i)*2);c.rotate(rot);
    box(c,-242+10,-97+12,484,194,BLUE,null);box(c,-242,-97,484,194,i===4?BLUE:PAPER,INK,3);
    text(c,kinds[i],-215,-55,24,INK,'Mono',400);text(c,labels[i],-215,38,i===1?61:69,INK,'Display',500);
    c.save();c.translate(205,65);c.rotate(t*.18+i);c.beginPath();c.arc(0,0,13,0,TAU);c.strokeStyle=INK;c.lineWidth=2;c.stroke();c.restore();
    c.restore();
  }
  const width=1768*settle;rule(c,76,966,width,BLUE,4);
  if(settle>0)text(c,'LANGUAGES → INTERFACES → INTELLIGENT SYSTEMS',960,1020,26,BLUE,'Mono',400,'center');
}

function experiencePage(c,year,t){
  const first=year==='2025',rows=first?[
    ['OpenXAI','Blockseblock Labs / collaboration'],
    ['LegalLM','HacktoSkill / collaborative project'],
  ]:[
    ['Team Vortiq','Bhudrishty / SIH 2026 college nomination'],
    ['Advitiya','IIT Ropar / technical events'],
  ];
  box(c,126,160,1668,768,PAPER,INK,4);
  text(c,year,186,397,230,INK,'Display',500);text(c,'FIELD NOTES',1716,220,25,INK,'Mono',400,'right');
  rule(c,186,432,1548);
  for(let i=0;i<2;i++){
    const q=ease((t-(first?1.73:.12)-i*.13)/.52);
    c.save();c.beginPath();c.rect(181,461+i*197,1555,180);c.clip();c.translate((1-q)*-1650,0);
    text(c,rows[i][0],188,540+i*197,68,INK,'Display',500);text(c,rows[i][1],190,599+i*197,31,INK,'Mono',400);c.restore();
    rule(c,186,637+i*197,1548,INK,1.5);
  }
  text(c,'BUILD / LEARN / REPEAT',188,891,27,INK,'Mono',400);dot(c,1709,877,13,BLUE);
}
function experience(c,t){
  c.fillStyle=BLUE;c.fillRect(0,0,W,H);header(c,'06','EXPERIENCE / COLLABORATION IN MOTION');
  const turn=ease((t-5.88)/.52),drift=Math.sin(t*.31)*4;
  c.save();c.translate(-turn*(W+80),drift);experiencePage(c,'2025',t);c.restore();
  if(t>=5.88){c.save();c.translate((1-turn)*(W+80),drift);experiencePage(c,'2026',t-5.88);c.restore();}
  rule(c,126,984,1668,INK,2);dot(c,126+1668*(.12+.76*smooth(t/10)),984,10,INK);
  text(c,'2025',126,1041,27,INK,'Mono',400);text(c,'2026',1794,1041,27,INK,'Mono',400,'right');
}

export const workSceneTimings={project:[4.6],'project-detail':[2,3.4,4.8],ai:[3],research:[4],skills:[5.5],experience:[2.25,6.4]};
export function drawWorkScene(c,id,seconds,images){
  if(!(id in lengths))return false;
  if(!Number.isFinite(seconds))throw new TypeError('Work scene time must be finite');
  const t=Math.min(lengths[id],Math.max(0,seconds));
  c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.shadowBlur=0;c.filter='none';c.setLineDash([]);
  if(id==='project')project(c,t,images);
  else if(id==='project-detail')detail(c,t);
  else if(id==='ai')ai(c,t);
  else if(id==='research')research(c,t);
  else if(id==='skills')skills(c,t);
  else experience(c,t);
  c.restore();return true;
}
