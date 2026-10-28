import {ease,smooth} from './sequence.mjs';
const W=1920,TAU=Math.PI*2,P='#E8F4FF',B='#74DCFF';
const hash=n=>{const x=Math.sin(n*127.1+31.7)*43758.5453;return x-Math.floor(x)};
function reveal(c,k,s,x,y,size,t,color=P,font='Display',weight=600,align='left',width=1760){const p=ease(t);c.save();c.beginPath();c.rect(align==='center'?x-width/2:x-3,y-size*1.1,width+6,size*1.4);c.clip();k.text(c,s,x,y+(1-p)*size*1.4,size,color,font,weight,align);c.restore()}
function quiet(c,x,y,w,h,alpha=.68){c.fillStyle=`rgba(3,8,18,${alpha})`;c.fillRect(x,y,w,h)}
function warp(c,k,t,amount=1){
  c.save();c.globalCompositeOperation='screen';
  for(let i=0;i<140;i++){
    const a=hash(i+10)*TAU,z=(hash(i+400)+t*.12)%1,r=60+z*z*1200,x=960+Math.cos(a)*r,y=540+Math.sin(a)*r*.63;
    const length=(5+z*z*70)*amount;c.globalAlpha=(.13+z*.5)*amount;k.line(c,x,y,x+Math.cos(a)*length,y+Math.sin(a)*length*.63,i%7?P:B,.7+z*1.7);
  }c.restore();
}
function planet(c,k,key,x,y,r,t,{flatten=1,alpha=1,zoom=1.05,roll=0}={}){
  c.save();c.globalAlpha=alpha;c.translate(x,y);c.rotate(roll);c.beginPath();c.ellipse(0,0,r,r*flatten,0,0,TAU);c.clip();k.image(c,key,-r,-r*flatten,r*2,r*flatten*2,{zoom,edge:true});c.restore();
  c.save();c.globalAlpha=alpha;k.orbit(c,x,y,r+4,(r+4)*flatten,roll,'rgba(116,220,255,.7)',1.5);k.orbit(c,x,y,r+20,(r+20)*flatten,roll,'rgba(116,220,255,.18)',1);
  k.dot(c,x+(r+20)*Math.cos(t*.35),y+(r+20)*flatten*Math.sin(t*.35),3,B);c.restore();
}

function opening(c,t,im,k){
  const dive=ease((t-5.27)/.85);k.bg(c,'space-galaxy.jpg',t,{zoom:1.04+dive*.85,shade:.02,panY:55});k.stars(c,t,.6);warp(c,k,t,.18+dive*.8);
  k.hud(c,'00 / ENTER THE SOBIVERSE',t);
  if(t<5.27)k.text(c,'A PERSONAL UNIVERSE OF IDEAS.',960,219,27,B,'Mono',400,'center');
  c.save();c.translate(960,0);c.scale(1+dive*.3,1+dive*.3);
  reveal(c,k,'SOBIVERSE',0,460-dive*210,245,(t-(49/60-.65))/.65,P,'Display',650,'center',1840);c.restore();
  k.orbit(c,960,590,650+90*Math.sin(t*.12),220,.09*Math.sin(t*.2),'rgba(116,220,255,.34)',1.2);
  const p=(t-(166/60-.5))/.5;reveal(c,k,'Souradip Biswas',960,886,75,p,P,'Display',500,'center');
  reveal(c,k,'Bound by curiosity. Limitless by nature.',960,947,37,(t-3)/.5,B,'Editorial',500,'center');
}

function universe(c,t,im,k){
  k.bg(c,'space-deep.jpg',t,{zoom:1.08+.12*smooth(t/10),shade:.06,panY:75});k.stars(c,t+6,.7);k.hud(c,'01 / A MAP OF WORLDS',t+6);
  reveal(c,k,'ONE MIND.',960,259,153,t/.65,P,'Display',650,'center');
  const spread=ease((t-1.2)/1.6),travel=smooth((t-6.6)/2.8),keys=['frame-project.png','frame-ai.png','frame-research.png'],names=['BUILD','THINK','EXPLORE'];
  const xs=[445,960,1475];
  k.orbit(c,960,627,750,167,-.08,'rgba(116,220,255,.38)',1.5);
  for(let j=0;j<3;j++){
    const p=ease((t-.45-j*.3)/.75),x=960+(xs[j]-960)*spread,y=611+Math.sin(t*.35+j*2)*36;
    const r=(177+45*(j===1?travel:0))*p;
    if(r>.1)planet(c,k,keys[j],x,y,r,t+j,{flatten:.87,zoom:1.06+travel*.2,roll:(j-1)*.045});
    if(spread>.8&&p>.9)k.text(c,names[j],x,866+Math.sin(t*.35+j*2)*18,31,B,'Mono',400,'center');
  }
  reveal(c,k,'MANY WORLDS.',960,395,132,(t-3.6)/.65,P,'Display',600,'center');
  if(t>7.1){const q=ease((t-7.1)/.5);k.line(c,390,939,390+1140*q,939,B,2);k.text(c,'Projects. Experiments. Questions worth following.',960,990,31,P,'Display',400,'center')}
}

function overview(c,t,im,k){
  k.bg(c,'space-nebula.jpg',t,{zoom:1.19+.18*smooth(t/9),shade:.03,panY:75});k.stars(c,t+16,.8);k.hud(c,'02 / BOUND BY CURIOSITY',t+16);
  const turn=ease((t-3.75)/.7);
  c.save();c.translate(-turn*W,0);
  reveal(c,k,'BOUND BY',960,425,203,t/.65,P,'Display',600,'center');
  reveal(c,k,'curiosity.',960,675,243,(t-.4)/.7,P,'Editorial',500,'center');
  c.save();c.shadowColor='#030812';c.shadowBlur=18;k.text(c,'Code. AI. Interactive worlds.',960,820,44,B,'Display',400,'center');c.restore();c.restore();
  if(turn>0){
    c.save();c.translate(W*(1-turn),0);
    planet(c,k,'frame-galaxy.png',960,560,315,t,{flatten:.8,zoom:1.25,alpha:.47});quiet(c,150,260,1620,600,.37);
    reveal(c,k,'AI / ML DEVELOPER',960,457,111,(t-3.9)/.6,P,'Display',650,'center');
    k.line(c,280,540,1640,540,'rgba(116,220,255,.65)',1.5);
    reveal(c,k,'FULL-STACK ENGINEER',960,702,111,(t-5.25)/.65,P,'Display',650,'center');
    reveal(c,k,'Ideas, built into useful systems.',960,864,48,(t-6.6)/.6,B,'Editorial',500,'center');c.restore();
  }
}

function work(c,t,im,k){
  k.bg(c,'space-galaxy.jpg',t,{zoom:1.48+t*.09,shade:.03,panY:210});warp(c,k,t+25,.35+.45*smooth(t/4));k.hud(c,'03 / SELECTED WORK',t+25);
  c.save();c.translate(960,540);c.rotate(-.035*Math.cos(t*.7));
  reveal(c,k,'WORK',0,-10,356,(t-(37/60-.45))/.45,P,'Display',700,'center');
  reveal(c,k,'in orbit.',0,259,212,(t-1.5)/.5,B,'Editorial',500,'center');c.restore();
  k.line(c,80,920,1840,920,'rgba(116,220,255,.45)',1.5);
  k.text(c,'A QUESTION → A SYSTEM → SOMETHING REAL',960,973,30,P,'Mono',400,'center');
}

function aiChapter(c,t,im,k){
  k.bg(c,'frame-ai.png',t,{zoom:3.55,panX:-2200,panY:650,shade:.15,blur:false});k.stars(c,t+43,.5);k.hud(c,'04 / APPLIED INTELLIGENCE',t+43);
  const words=['THINK.','TEST.','BUILD.'],starts=[61/60,106/60,151/60];
  for(let j=0;j<3;j++){
    const y=170+j*250,p=ease((t-(starts[j]-.35))/.35),x=(1-p)*W*(j%2?1:-1);
    c.save();c.beginPath();c.rect(70,y,1780,236);c.clip();
    quiet(c,70,y,1780,236,.38);k.text(c,words[j],100+x+(1-p)*75,y+194,216,j===1?B:P,'Display',650);
    k.orbit(c,1690+x,y+111,76+45*p,27+15*p,-.15+t*.03,B,2);k.dot(c,1690+x+90*Math.cos(t*.5+j),y+111+32*Math.sin(t*.5+j),5);c.restore();
    k.line(c,80,y+237,1840,y+237,'rgba(116,220,255,.38)',1);
  }
  k.text(c,'FOLLOW THE QUESTION.',960,984,30,P,'Mono',400,'center');
}

function tools(c,t,im,k){
  k.bg(c,'frame-skills.png',t,{zoom:3.55+.2*smooth(t/4),panX:-2200,shade:.12,blur:false});k.stars(c,t+64,.6);k.hud(c,'06 / BUILD BEYOND',t+64);
  const p=(t-(61/60-.4))/.4,q=(t-(155/60-.4))/.4;
  reveal(c,k,'BEYOND',960,465,287,p,P,'Display',650,'center');
  reveal(c,k,'the toolkit.',960,742,222,q,B,'Editorial',500,'center');
  k.orbit(c,960,560,790,299,-.045+t*.012,'rgba(116,220,255,.35)',1.5);warp(c,k,t+64,.18+ease(q)*.3);
  k.text(c,'THE INSTINCT TO BUILD COMES FIRST.',960,928,31,P,'Mono',400,'center');
}

function person(c,t,im,k){
  k.bg(c,'frame-person.png',t,{zoom:6.25+.11*smooth(t/10),panX:5000,shade:.12,blur:false});
  c.save();c.globalCompositeOperation='screen';k.image(c,'space-nebula.jpg',-170,-90,2260,1270,{alpha:.5,zoom:1.1});c.restore();
  k.stars(c,t+87,.5);k.hud(c,'08 / THE HUMAN IN THE UNIVERSE',t+87);
  const arrival=ease((t-.45)/.85),flip=smooth((t-4.1)/1.15),returning=smooth((t-6.9)/1.1),phase=Math.PI*flip+Math.PI*returning,front=Math.cos(phase)>=0;
  const sx=Math.max(.025,Math.abs(Math.cos(phase))),depart=ease((t-8.9)/.7),size=1+depart*.4;
  k.orbit(c,960,570,630,206,-.1+t*.018,'rgba(116,220,255,.6)',1.5);
  c.save();c.translate(960,552+(1-arrival)*720);c.rotate(-.055+Math.sin(t*.23)*.018);c.scale(sx*size,size);
  c.shadowColor='rgba(116,220,255,.28)';c.shadowBlur=34;k.image(c,front?'profile-front.png':'profile-back.png',-271,-366,542,732,{fit:'contain',stroke:true});c.restore();
  k.text(c,'BEHIND IT ALL,',95,305,37,B,'Mono',400);reveal(c,k,'a human.',95,448,105,(t-.7)/.6,P,'Editorial',500,'left',740);
  if(t<8.9){reveal(c,k,'A restless mind.',1435,805,48,(t-2.3)/.6,P,'Editorial',500,'center',770);k.text(c,'ALWAYS LEARNING.',1435,857,25,B,'Mono',400,'center')}
  if(t>8.9)warp(c,k,t+87,.8*depart);
}

function human(c,t,im,k){
  k.bg(c,'space-deep.jpg',t,{zoom:1.18+t*.05,shade:.04});
  c.save();c.globalCompositeOperation='screen';k.image(c,'portrait.jpg',1100,130,740,820,{alpha:.21,zoom:1.1,edge:true});c.restore();
  k.stars(c,t+97,.65);k.hud(c,'09 / STILL CURIOUS',t+97);
  const p=(t-1.55)/.4;
  reveal(c,k,'STILL',110,469,315,t/.5,P,'Display',700);
  reveal(c,k,'curious.',110,795,273,p,P,'Editorial',500);
  k.orbit(c,1500,585,229,407,.16+t*.025,'rgba(116,220,255,.4)',1.5);k.text(c,'THERE IS ALWAYS ANOTHER WORLD TO BUILD.',110,948,28,B,'Mono',400);
}

function contact(c,t,im,k){
  k.bg(c,'space-nebula.jpg',t,{zoom:1.12,shade:.04});
  const drive=smooth((t-1)/6),exit=ease((t-4.8)/1.2);
  k.image(c,'frame-contact.png',-120*drive,149-145*drive,1920*(1+drive*.12),755*(1+drive*.12),{alpha:1,zoom:1,edge:true});
  if(exit>0){
    c.save();c.beginPath();c.ellipse(1080,590,Math.max(.01,exit*2200),Math.max(.01,exit*1500),0,0,TAU);c.clip();
    k.bg(c,'frame-contact.png',t,{zoom:3.3+exit*.3,panX:-1100,panY:-380,shade:.24,blur:false});c.restore();warp(c,k,t+101,.25+exit*.7);
    c.save();c.beginPath();c.rect(70,175,1780,680);c.clip();
    k.text(c,'LET’S BUILD',960,437+(1-exit)*780,200,P,'Display',650,'center');
    k.text(c,'what’s next.',960,712+(1-exit)*780,220,P,'Editorial',500,'center');c.restore();
  }
  k.hud(c,'10 / THE NEXT COORDINATE',t+101);k.text(c,'AN IDEA. A COLLABORATION. A NEW TRAJECTORY.',960,954,29,B,'Mono',400,'center');
}

function closing(c,t,im,k){
  k.bg(c,'space-galaxy.jpg',t,{zoom:1.5-.18*smooth(t/10),shade:.04,panY:40});k.stars(c,t+110,.65);k.hud(c,'SOBIVERSE / A UNIVERSE IN MOTION',t+110);
  const name=ease((t-4.3167)/.65),url=ease((t-6.6)/.5);
  c.save();c.beginPath();c.rect(70,155,1780,750);c.clip();
  reveal(c,k,'SOBIVERSE',960,423,211,t/.7,P,'Display',650,'center');reveal(c,k,'Bound by curiosity.',960,690,150,(t-(71/60-.6))/.6,P,'Editorial',500,'center');c.restore();
  if(name>0){
    const x=W*(1-name);c.save();c.beginPath();c.rect(x,145,W,755);c.clip();k.bg(c,'space-deep.jpg',t,{zoom:1.25,shade:.08});k.stars(c,t+110,.6);
    k.text(c,'Souradip',960+x,430,245,P,'Display',600,'center');k.text(c,'Biswas',960+x,691,285,P,'Display',600,'center');
    if(t>=4.9667)reveal(c,k,'AI / ML DEVELOPER  ·  FULL-STACK ENGINEER',960,791,31,(t-4.9667)/.4,B,'Mono',400,'center');c.restore();
  }
  if(t>=6.6){c.save();c.beginPath();c.rect(310,850,1300,125);c.clip();k.line(c,360,868,1560,868,B,1.5);k.text(c,'sobiverse.ai.studio',960,953+(1-url)*155,67,P,'Display',500,'center');c.restore();}
  k.orbit(c,960,560,816,367,.025*Math.sin(t*.3),'rgba(116,220,255,.3)',1);k.dot(c,960+816*Math.cos(t*.15),560+367*Math.sin(t*.15),5);
}

export const identityTimings={opening:[.82,2.77,5.27],universe:[1.2,3.6,7.1],overview:[.5,3.75,5.25,6.6],work:[.62,2],'ai-chapter':[1.0167,1.7667,2.5167],tools:[1.0167,2.5833],person:[1.3,4.1,6.9,8.9],human:[1.95],contact:[1,4.8,6],closing:[1.1833,4.9667,7.1]};
export function drawSpaceIdentity(c,id,t,images,kit){
  if(!Number.isFinite(t))throw new RangeError('Scene time must be finite');
  const draw={opening,universe,overview,work,'ai-chapter':aiChapter,tools,person,human,contact,closing}[id];if(!draw)return false;
  c.save();draw(c,Math.max(0,t),images,kit);c.restore();return true;
}
