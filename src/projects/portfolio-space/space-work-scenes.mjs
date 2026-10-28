const W=1920,TAU=Math.PI*2;
const INK='#030812',PAPER='#E8F4FF',BLUE='#74DCFF';
const durations={project:7,'project-detail':7,ai:8,research:9,skills:9,experience:10};
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>1-(1-clamp(v))**4;
const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
function type(k,c,s,x,y,size=32,color=PAPER,font='Display',weight=500,align='left'){
  k.text(c,s,x,y,size,color,font,weight,align);
}
function field(c,key,t,k,shade=.16){
  const focus=key==='frame-project.png'?{zoom:6.25,panX:5000}:{zoom:3.55,panX:-2380};
  // The image-only side of each native world keeps baked headlines outside the new composition.
  k.bg(c,key,t,{...focus,shade,panY:(key==='frame-ai.png'?650:0)+Math.cos(t*.12)*24,blur:false});
  c.save();c.globalCompositeOperation='screen';
  k.image(c,'space-nebula.jpg',-155,-87,2230,1254,{alpha:.44,zoom:1.12,rotation:Math.sin(t*.17)*.005});c.restore();
  const veil=c.createLinearGradient(0,0,0,440);veil.addColorStop(0,'rgba(3,8,18,.64)');veil.addColorStop(1,'rgba(3,8,18,0)');
  c.fillStyle=veil;c.fillRect(0,0,W,440);k.stars(c,t,.5);
}
function glow(c,k,x,y,r,strength=1){
  c.save();c.globalAlpha=strength;const g=c.createRadialGradient(x,y,0,x,y,Math.max(1,r));g.addColorStop(0,'rgba(116,220,255,.4)');g.addColorStop(.3,'rgba(116,220,255,.13)');g.addColorStop(1,'rgba(116,220,255,0)');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);k.dot(c,x,y,3,BLUE);c.restore();
}
function path(c,points,color=BLUE,width=2,dash=[]){
  c.strokeStyle=color;c.lineWidth=width;c.setLineDash(dash);c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();c.setLineDash([]);
}
function portal(c,k,key,x,y,rx,ry,t,{alpha=1,zoom=1.02,rotation=0}={}){
  c.save();c.translate(x,y);c.rotate(rotation);c.beginPath();c.ellipse(0,0,rx,ry,0,0,TAU);c.clip();
  k.image(c,key,-rx,-ry,rx*2,ry*2,{alpha,zoom,rotation:0});c.restore();
  k.orbit(c,x,y,rx+3,ry+3,rotation,BLUE,2);
  c.save();c.globalAlpha=.25;k.orbit(c,x,y,rx+17,ry+17,rotation,PAPER,1);c.restore();
  const angle=t*.23-.8,kx=x+Math.cos(angle)*(rx+17),ky=y+Math.sin(angle)*(ry+17);glow(c,k,kx,ky,44,.7);
}
function heading(c,k,s,y,t,delay=0,size=115){
  const q=ease((t-delay)/.6);c.save();c.beginPath();c.rect(74,y-size*1.1,1772,size*1.4);c.clip();type(k,c,s,960,y+(1-q)*size*1.4,size,PAPER,'Display',550,'center');c.restore();
}
function haloLabel(c,k,s,x,y,size=34,color=PAPER,align='left'){
  c.save();c.shadowColor=INK;c.shadowBlur=18;type(k,c,s,x,y,size,color,'Display',500,align);c.restore();
}

function project(c,t,images,k){
  field(c,'frame-project.png',t,k,.16);k.hud(c,'01 / LAUNCHSILO LABS',t);
  heading(c,k,'Ideas into orbit.',267,t,-.1,123);
  const emerge=ease((t-.15)/1.1),z=.78+.22*emerge;
  c.save();c.translate(960,651);c.scale(z,z);c.translate(-960,-651);
  glow(c,k,960,650,590,.38);
  portal(c,k,'launchsilo.png',960,650+(1-emerge)*360,610,271,t,{zoom:1.03,rotation:-.025+Math.sin(t*.24)*.006});
  k.orbit(c,960,650,742,315,-.13,BLUE,1.5);c.restore();
  type(k,c,'LaunchSILO Labs',960,350,64,PAPER,'Display',600,'center');
  const lock=ease((t-4.12)/.48);
  if(lock>0){
    const labels=[['SCOPE BUILDER',106,535,409,583],['AI ESTIMATES',1515,369,1534,586],['CMS / INVOICING',1370,913,1428,824]];
    for(const [s,x,y,ex,ey]of labels){
      c.save();c.globalAlpha=lock;path(c,[[x,y+13],[x+150,y+13],[ex,ey]],BLUE,2);haloLabel(c,k,s,x,y,29,BLUE);glow(c,k,ex,ey,24,.8*lock);c.restore();
    }
  }
  type(k,c,'AGENCY OWNER & DEVELOPER',106,966,27,PAPER,'Mono',400);type(k,c,'launchsilo.in',1814,966,27,BLUE,'Mono',400,'right');
}

function detail(c,t,images,k){
  field(c,'frame-project.png',t+.9,k,.16);k.hud(c,'02 / SYSTEMS BEHIND THE EXPERIENCE',t);
  heading(c,k,'From idea to operation.',259,t,-.1,110);
  const points=[[376,637],[960,523],[1544,637]];
  k.orbit(c,960,630,748,174,-.06,BLUE,1.5);
  path(c,[[170,734],[376,637],[960,523],[1544,637],[1783,742]],BLUE,2,[6,11]);
  for(let i=0;i<3;i++){
    const [x,y]=points[i],land=[2,3.4,4.8][i],p=ease((t-(land-.5))/.5),r=48+58*p;
    glow(c,k,x,y,195,.45+.55*p);
    c.save();c.globalAlpha=.4+.6*p;
    portal(c,k,'frame-project.png',x,y,r,r,t+i,{alpha:.8,zoom:2.6,rotation:i*.3});
    k.orbit(c,x,y,r+23,22,-.28+i*.14,BLUE,2);c.restore();
    type(k,c,`0${i+1}`,x,y+13,36,INK,'Mono',400,'center');
    haloLabel(c,k,['SCOPE','ESTIMATE','INVOICE'][i],x,y+191,49,PAPER,'center');
    type(k,c,['Requirements & deliverables','AI-assisted qualification','CMS, inquiries & PDF export'][i],x,y+242,26,BLUE,'Mono',400,'center');
    if(p>0){k.line(c,x,y+r+28,x,y+145,BLUE,2);k.dot(c,x,y+r+28,5,BLUE);}
  }
  type(k,c,'A connected agency workflow.',960,956,38,PAPER,'Editorial',500,'center');
}

function ai(c,t,images,k){
  field(c,'frame-ai.png',t,k,.18);k.hud(c,'03 / LegalLM / DOCUMENT INTELLIGENCE',t);
  heading(c,k,'Intelligence. With evidence.',252,t,-.1,105);
  const cx=960,cy=637;
  for(let j=0;j<3;j++)k.orbit(c,cx,cy,150+j*28,100+j*38,-.45+j*.45+t*.025,BLUE,j?1:2);
  glow(c,k,cx,cy,246,.6);type(k,c,'LegalLM',cx,cy+23,62,PAPER,'Display',600,'center');
  const gather=ease(t/1.1),docx=371-(1-gather)*490;
  c.save();c.translate(docx,cy);c.rotate(-.06);
  c.strokeStyle=BLUE;c.lineWidth=2;c.beginPath();c.moveTo(-142,-178);c.lineTo(96,-178);c.lineTo(142,-129);c.lineTo(142,178);c.lineTo(-142,178);c.closePath();c.stroke();
  c.beginPath();c.moveTo(96,-178);c.lineTo(96,-129);c.lineTo(142,-129);c.stroke();
  for(let j=0;j<7;j++){const yy=-91+j*31; k.line(c,-109,yy,[101,65,91,16,84,101,42][j],yy,j===3?PAPER:BLUE,j===3?10:3);}
  c.restore();
  type(k,c,'PDF / DOCX / TEXT',docx,914,28,BLUE,'Mono',400,'center');
  const names=['Structured summaries','Clause & risk analysis','Source-cited Q&A'];
  for(let i=0;i<3;i++){
    const y=519+i*112;glow(c,k,1378,y-11,37,.7);k.dot(c,1378,y-11,6,BLUE);haloLabel(c,k,names[i],1412,y,35);
    k.line(c,1148,cy,1341,y-11,BLUE,1.5);
  }
  k.line(c,docx+170,cy,764,cy,BLUE,2);
  const cite=ease((t-2.5)/.5);
  if(cite>0){
    c.save();c.globalAlpha=cite;c.strokeStyle=PAPER;c.lineWidth=3;c.beginPath();c.moveTo(1460,810);c.bezierCurveTo(1305,1014,421,1032,368,819);c.stroke();
    glow(c,k,368,819,70,cite);type(k,c,'RETURN TO SOURCE',960,959,28,BLUE,'Mono',400,'center');c.restore();
  }
  for(let j=0;j<70;j++){
    const q=(j/70+t*.06)%1,x=docx+170+(764-docx-170)*q,y=cy+Math.sin(q*TAU*2+j*.8)*14;
    c.save();c.globalAlpha=.18+.5*Math.sin(q*Math.PI);k.dot(c,x,y,1+j%2,BLUE);c.restore();
  }
}

function research(c,t,images,k){
  k.bg(c,'frame-research.png',t,{zoom:1.19,shade:.16,panX:Math.sin(t*.15)*20,panY:32,blur:false});k.stars(c,t,.38);
  const top=c.createLinearGradient(0,0,0,340);top.addColorStop(0,'rgba(3,8,18,.9)');top.addColorStop(1,'rgba(3,8,18,0)');c.fillStyle=top;c.fillRect(0,0,W,340);
  k.hud(c,'04 / RESEARCH / APPLIED AI & ML',t);
  const angle=t*.16;k.orbit(c,960,594,687,302,-.24,BLUE,1);
  glow(c,k,960+Math.cos(angle)*687,594+Math.sin(angle)*302,61,.5);
  const topics=['Document intelligence','Personas & memory','Creative tooling'];
  for(let j=0;j<3;j++){
    const y=770+j*68;k.dot(c,112,y-11,5,BLUE);haloLabel(c,k,topics[j],139,y,30);
  }
  const publish=ease((t-3.5)/.5),moonY=477-(1-publish)*36;
  glow(c,k,1554,moonY,150,.2+.6*publish);
  portal(c,k,'space-nebula.jpg',1554,moonY,83+16*publish,83+16*publish,t,{zoom:2.2,alpha:.85});
  c.save();c.globalAlpha=.65+.35*publish;
  k.line(c,1554,moonY+122,1554,717,BLUE,2);
  haloLabel(c,k,'Patent publication',1703,780,40,PAPER,'right');
  type(k,c,'OCTOBER 2025',1703,834,28,BLUE,'Mono',400,'right');
  type(k,c,'Portfolio research record',1703,889,26,PAPER,'Mono',400,'right');c.restore();
}

function skills(c,t,images,k){
  field(c,'frame-skills.png',t,k,.16);k.hud(c,'05 / THE TOOLKIT / CONNECTED BY PRACTICE',t);
  heading(c,k,'A connected toolkit.',247,t,-.1,115);
  const lock=ease((t-4.97)/.53),cx=960,cy=615;
  k.orbit(c,cx,cy,526,274,-.08,BLUE,1);k.orbit(c,cx,cy,350,300,.12,BLUE,1);
  glow(c,k,cx,cy,327,.26+.3*lock);
  const names=['Python','TypeScript','React','Next.js','Gemini','Firebase'];
  const nodes=[];
  for(let i=0;i<6;i++){
    const a=-Math.PI*.83+i*TAU/6,outer=1-lock,rx=320+178*outer,ry=224+49*outer;
    const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;nodes.push([x,y]);
    const left=x<cx,reveal=ease((t-.1-i*.08)/.55);
    k.line(c,cx,cy,x,y,BLUE,1.5);glow(c,k,x,y,50,.35+.55*lock);
    c.save();c.globalAlpha=reveal;k.dot(c,x,y,9,BLUE);k.orbit(c,x,y,22,22,0,BLUE,1.5);
    haloLabel(c,k,names[i],x+(left?-37:37),y+13,44,PAPER,left?'right':'left');c.restore();
  }
  path(c,[...nodes,nodes[0]],BLUE,2);
  for(let i=0;i<110;i++){
    const q=i/110,a=i*2.39996+t*.08,r=(1-lock)*(90+q*160)+lock*74;
    c.save();c.globalAlpha=.18+.5*q;k.dot(c,cx+Math.cos(a)*r,cy+Math.sin(a)*r*.7,1.5,BLUE);c.restore();
  }
  type(k,c,lock>.85?'BUILD':'CONNECT',cx,cy+18,lock>.85?58:36,PAPER,'Display',600,'center');
  type(k,c,'Languages → interfaces → intelligent systems',960,960,31,BLUE,'Mono',400,'center');
}

function experience(c,t,images,k){
  field(c,'frame-experience.png',t,k,.16);k.hud(c,'06 / EXPERIENCE / THE LONG WAY HERE',t);
  heading(c,k,'Never a straight line.',253,t,-.1,115);
  const next=ease((t-5.88)/.52),shift=-92*next;
  c.save();c.translate(shift,0);
  const points=[[354,661],[819,441],[1275,697],[1646,460]];
  c.strokeStyle=BLUE;c.lineWidth=2.5;c.beginPath();c.moveTo(-80,831);c.bezierCurveTo(295,915,322,365,819,441);c.bezierCurveTo(1039,471,983,857,1275,697);c.bezierCurveTo(1421,617,1457,270,2080,490);c.stroke();
  const labels=[['OpenXAI','Blockseblock Labs',2.25],['LegalLM','HacktoSkill',2.25],['Team Vortiq','Bhudrishty / SIH 2026',6.4],['Advitiya','IIT Ropar / technical events',6.4]];
  for(let i=0;i<4;i++){
    const [x,y]=points[i],[name,sub,land]=labels[i],active=ease((t-(land-.52))/.52);
    glow(c,k,x,y,100,.25+.75*active);k.orbit(c,x,y,24+active*28,24+active*28,.3,BLUE,2);k.dot(c,x,y,5+5*active,BLUE);
    const below=i%2===0,yy=y+(below?114:-107);
    haloLabel(c,k,name,x,yy,49,PAPER,'center');type(k,c,sub,x,yy+53,26,BLUE,'Mono',400,'center');
  }
  type(k,c,'2025',267,414,82,PAPER,'Display',500,'center');type(k,c,'2026',1700,897,82,PAPER,'Display',500,'center');
  const q=smooth(t/10),shipX=-80+2160*q,shipY=710-199*Math.sin(q*TAU*1.2);
  glow(c,k,shipX,shipY,63,.9);c.restore();
  type(k,c,'Collaboration. Experimentation. Forward motion.',960,966,32,PAPER,'Editorial',500,'center');
}

export const spaceWorkTimings={project:[4.6],'project-detail':[2,3.4,4.8],ai:[3],research:[4],skills:[5.5],experience:[2.25,6.4]};
export function drawSpaceWork(c,id,seconds,images,kit){
  if(!(id in durations))return false;
  if(!Number.isFinite(seconds))throw new TypeError('Space scene time must be finite');
  const t=Math.max(0,Math.min(durations[id],seconds));
  c.save();c.globalAlpha=1;c.globalCompositeOperation='source-over';c.shadowBlur=0;c.filter='none';c.setLineDash([]);
  ({project,'project-detail':detail,ai,research,skills,experience}[id])(c,t,images,kit);
  c.restore();return true;
}
