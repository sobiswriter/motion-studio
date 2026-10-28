import {clamp,ease,smooth} from './sequence.mjs';
export const INK='#101214',WHITE='#FFFFFF',YELLOW='#FFC915';
const W=1920,H=1080,TAU=Math.PI*2;
const hash=i=>{const n=Math.sin(i*127.1+41.7)*43758.5453;return n-Math.floor(n)};
const droplets=Array.from({length:9},(_,i)=>({x:350+hash(i+4)*1240,y:230+hash(i+25)*530,r:10+hash(i+72)*16,phase:hash(i+53)*TAU}));
function txt(c,s,x,y,size=48,color=WHITE,weight=500,align='left',font='Display'){
 c.font=`${weight} ${size}px ${font}`;c.fillStyle=color;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(s,x,y);
}
function line(c,x,y,xx,yy,color=YELLOW,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke()}
function ring(c,x,y,rx,ry=rx,rotation=0,color=YELLOW,width=2,start=0,end=TAU){if(rx<=0||ry<=0)return;c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.ellipse(x,y,rx,ry,rotation,start,end);c.stroke()}
function dot(c,x,y,r,color=YELLOW){if(r<=0)return;c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()}
function product(c,images,key,x,y,height,angle=0,alpha=1){const image=images.get(key);if(!image)throw new Error(`Missing product photograph: ${key}`);if(![x,y,height,angle,alpha].every(Number.isFinite)||height<=0)throw new RangeError('Invalid product transform');const width=height*image.width/image.height;c.save();c.translate(x,y);c.rotate(angle);c.globalAlpha*=clamp(alpha);c.drawImage(image,-width/2,-height/2,width,height);c.restore()}
function back(c,color){c.fillStyle=color;c.fillRect(0,0,W,H)}
function brand(c,label,light=false){const color=light?INK:WHITE;txt(c,'realme',76,79,36,color,600);txt(c,label,1844,77,22,color,400,'right','Mono')}
function qualifier(c,s,light=false){txt(c,s,76,1026,25,light?INK:WHITE,400,'left','Mono')}
function floor(c,x,y,w,alpha=.18){c.save();c.translate(x,y);c.scale(1,.12);const g=c.createRadialGradient(0,0,0,0,0,w);g.addColorStop(0,`rgba(0,0,0,${alpha})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(-w,-w,w*2,w*2);c.restore()}
function rise(c,s,x,y,size,t,delay=0,color=WHITE,align='left'){
 const q=ease((t-delay+.18)/.7);c.save();c.beginPath();c.rect(0,y-size-8,W,size+28);c.clip();txt(c,s,x,y+(1-q)*(size+42),size,color,650,align);c.restore();
}
function materialSweep(c,t,x=960,y=540,w=1450,h=720){
 const px=x-w*.6+smooth(t/2.8)*w*1.2;c.save();c.globalCompositeOperation='screen';c.translate(px,y);c.rotate(-.42);const g=c.createLinearGradient(-160,0,160,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.14)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(-160,-h,320,h*2);c.restore();
}
function signal(c,t,images){
 back(c,INK);c.save();c.translate(W/2+Math.sin(t*.8)*14,H/2+Math.cos(t*.6)*9);c.scale(1.03+t*.012,1.03+t*.012);c.drawImage(images.get('macro.jpg'),-W/2,-H/2,W,H);c.restore();
 c.fillStyle='rgba(16,18,20,.62)';c.fillRect(0,0,W,H);materialSweep(c,t,960,540,1800,1080);brand(c,'BUDS AIR8');
 rise(c,'YOUR SOUND.',95,488,184,t,.35);rise(c,'IN FOCUS.',95,680,184,t,1.05,YELLOW);
 const q=smooth((t-.5)/2.8);ring(c,1450,530,280,280,-.4,YELLOW,4,-1.4,-1.4+q*4.4);dot(c,1450+280*Math.cos(-1.4+q*4.4),530+280*Math.sin(-1.4+q*4.4),6,YELLOW);
 txt(c,'FIND YOUR FREQUENCY',96,949,25,WHITE,400,'left','Mono');
}
function hero(c,t,images){
 back(c,INK);brand(c,'MASTER GREY');const q=ease((t+.2)/1.25),lift=(1-q)*100;
 c.save();c.globalAlpha=.32;txt(c,'Buds Air8',960,310,270,WHITE,650,'center');c.restore();
 ring(c,960,540,437+Math.sin(t*.5)*10,437,0,'#36383A',2);ring(c,960,540,443,126,t*.08,'#3D3F41',1);
 floor(c,960,968,500,.5);product(c,images,'hero.png',960+Math.sin(t*.6)*13,580+lift+Math.cos(t*.7)*9,825+q*20,-.025+Math.sin(t*.6)*.015);
 c.save();c.globalAlpha=ease((t-.5)/.6);txt(c,'realme Buds Air8',960,966,53,WHITE,600,'center');c.restore();
}
function anc(c,t,images){
 back(c,WHITE);brand(c,'ACTIVE NOISE CANCELLATION',true);const settle=smooth((t-.7)/1.8);
 txt(c,'55',960,862,940,'#EAEAE7',650,'center');
 c.save();c.globalAlpha=.7-settle*.48;
 for(let i=0;i<160;i++){const x=15+i*12,focus=Math.abs(x-960)/960;const h=(32+120*Math.abs(Math.sin(i*.93+t*7))+65*Math.sin(i*.27+t*2)**2)*(1-settle*.92)*(focus*.7+.3);line(c,x,510-h,x,510+h,YELLOW,i%5?2:3)}c.restore();
 const q=ease((t+.3)/1.15),sway=Math.sin(t*.6)*16;
 product(c,images,'bud-1.png',850+(1-q)*360+sway,450+Math.cos(t*.55)*13,645+settle*35,-.12+Math.sin(t*.4)*.02);
 product(c,images,'bud-2.png',1200+(1-q)*420,565+Math.sin(t*.55)*13,470,-.05+Math.cos(t*.4)*.02,.94);
 rise(c,'UP TO 55dB ANC',960,923,82,t,.7,INK,'center');
 qualifier(c,'Up to 55dB · realme Lab; performance varies with fit and surroundings.',true);
}
function driverField(c,x,y,r,t,phase){
 const tilt=.28+Math.sin(t*.55+phase)*.12;c.save();c.translate(x,y);c.rotate(Math.sin(t*.3+phase)*.15);
 for(let i=11;i>=0;i--){const rr=r*(.42+i*.052),depth=i*3;c.globalAlpha=.12+i*.047;ring(c,0,depth,rr,rr*tilt,0,i%3===0?WHITE:YELLOW,i%3===0?2:3)}
 c.globalAlpha=1;const a=t*1.2+phase;dot(c,Math.cos(a)*r,Math.sin(a)*r*tilt,7,YELLOW);c.restore();
}
function drivers(c,t,images){
 back(c,INK);brand(c,'11mm + 6mm / DUAL DRIVERS');const q=ease((t+.3)/1.2);
 c.save();c.globalAlpha=.16;txt(c,'11 + 6',960,545,420,WHITE,650,'center');c.restore();
 driverField(c,520,550,330*q,t,0);driverField(c,1435,465,185*q,t,2);
 product(c,images,'bud-1.png',985+Math.sin(t*.45)*23,495+Math.cos(t*.6)*16,638+q*30,.16+Math.sin(t*.35)*.025);
 line(c,500,710,670,710,'#777A7C',1.5);line(c,1370,630,1530,630,'#777A7C',1.5);
 rise(c,'11mm',520,815,100,t,.3,WHITE,'center');rise(c,'6mm',1435,755,85,t,.55,WHITE,'center');
 rise(c,'TWO FIELDS. ONE SOUND.',960,944,65,t,1.0,WHITE,'center');
 qualifier(c,'Dual drivers · abstract acoustic visualisation');
}
function battery(c,t,images){
 back(c,YELLOW);brand(c,'TOTAL PLAYBACK',true);const q=ease((t+.2)/.9),s=1+.008*Math.sin(t*.55);
 txt(c,'UP TO',105,219,45,INK,500);
 c.save();c.translate(960,550+(1-q)*260);c.scale(s,s);txt(c,'58',0,300,980,INK,650,'center');c.restore();
 c.save();c.globalAlpha=.35;ring(c,960,560,532,398,-.08,INK,2,-Math.PI/2,-Math.PI/2+smooth(t/5.4)*TAU);c.restore();
 product(c,images,'hero.png',1045+Math.sin(t*.55)*12,665+Math.cos(t*.75)*12,450,-.07+Math.sin(t*.45)*.015);
 rise(c,'HOURS WITH CHARGING CASE',960,963,51,t,.75,INK,'center');
 qualifier(c,'Buds + case, fully charged · 50% volume, normal mode · actual life varies.',true);
}
function drop(c,x,y,r,t){
 c.save();c.translate(x,y);c.rotate(.22+Math.sin(t*.4)*.1);const g=c.createRadialGradient(-r*.2,-r*.3,1,0,0,r);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.55,'rgba(240,241,238,.1)');g.addColorStop(1,'rgba(16,18,20,.23)');c.fillStyle=g;c.beginPath();c.ellipse(0,0,r*.8,r,0,0,TAU);c.fill();ring(c,0,0,r*.8,r,0,'rgba(16,18,20,.22)',1.2);ring(c,-r*.15,-r*.2,r*.45,r*.6,-.2,'rgba(255,255,255,.9)',1.7,-2,-.6);c.restore();
}
function resistance(c,t,images){
 back(c,WHITE);brand(c,'DUST & WATER RESISTANCE',true);const q=ease((t+.2)/.9);
 txt(c,'IP55',960,670,510,'#EAEAE7',650,'center');
 product(c,images,'bud-1.png',775-(1-q)*240+Math.sin(t*.6)*15,460+Math.cos(t*.7)*18,630,-.18+Math.sin(t*.45)*.02);
 product(c,images,'bud-2.png',1180+(1-q)*240+Math.cos(t*.55)*17,555+Math.sin(t*.6)*18,520,.18+Math.sin(t*.4)*.02);
 for(const d of droplets){const enter=ease((t-.3)/.8),travel=(1-enter)*180;drop(c,d.x+Math.sin(t*.6+d.phase)*6,d.y-travel+Math.cos(t*.5+d.phase)*6,d.r*enter,t)}
 rise(c,'IP55. READY FOR THE EVERYDAY.',960,942,65,t,.8,INK,'center');
 qualifier(c,'Earbuds only · case has no dust/water resistance · do not charge wet.',true);
}
function connection(c,t,images){
 back(c,INK);brand(c,'3-DEVICE CONNECTION');const points=[[440,460,'PHONE'],[1440,460,'LAPTOP'],[960,855,'TABLET']],active=Math.min(2,Math.floor(Math.max(0,t-.4)/1.2));
 rise(c,'ONE PAIR. THREE DEVICES.',960,260,90,t,.15,WHITE,'center');
 floor(c,960,864,310,.8);
 for(let i=0;i<points.length;i++){const [x,y,label]=points[i],q=ease((t+.2-i*.16)/.7),is=i===active;
  line(c,960,600,960+(x-960)*q,600+(y-600)*q,is?YELLOW:'#515355',is?4:2);ring(c,x,y,30+q*9,30+q*9,0,is?YELLOW:'#76787A',2);if(is)dot(c,x,y,25,YELLOW);txt(c,label,x,y+(i===2?85:-75),27,WHITE,400,'center','Mono');
 }
 product(c,images,'hero.png',960+Math.sin(t*.4)*7,575,425,-.02+Math.sin(t*.4)*.015);
 qualifier(c,'Enable in realme Link · pause current audio before switching devices.');
}
function signature(c,t,images){
 back(c,INK);brand(c,'FIND YOUR FREQUENCY');const q=ease((t+.3)/1.5),drift=Math.sin(t*.45)*10;
 ring(c,960,470,354+q*12,354+q*12,0,'#434547',2);ring(c,960,470,366,98,t*.04,'#2F3133',1);
 floor(c,960,815,420,.65);product(c,images,'hero.png',960+drift,450+(1-q)*100+Math.cos(t*.5)*8,640+q*25,-.015+Math.sin(t*.4)*.008);
 rise(c,'Find your frequency.',960,875,112,t,.7,WHITE,'center');
 rise(c,'realme Buds Air8',960,960,53,t,1.2,YELLOW,'center');
 txt(c,'EXPLORE BUDS AIR8',960,1031,25,WHITE,400,'center','Mono');
}
const renderers={signal,hero,anc,drivers,battery,resistance,connection,signature};
export function drawScene(c,id,t,images){if(!renderers[id])throw new TypeError(`Unknown product scene: ${id}`);if(!Number.isFinite(t))throw new RangeError('Scene time must be finite');c.save();try{c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);renderers[id](c,Math.max(0,t),images)}finally{c.restore()}}
