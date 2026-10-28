import {drawScene as baseScene} from './product-scenes.mjs';
import {drawDetail} from './detail-scenes.mjs';
import {ease,smooth} from './sequence.mjs';
import {txt,product,back,brand,qualifier,ring,line,dot,rise,floor,INK,WHITE,YELLOW,CYAN,hash} from './kit.mjs';

function origin(c,t,images,k){
 back(c,YELLOW);const logo=images.get('realme-wordmark.svg');
 if(t<3.7){
  txt(c,'realme Buds Air8',76,82,25,INK,500,'left','Mono');txt(c,'MASTER GREY',1844,82,25,INK,400,'right','Mono');
  const form=ease((t+.05)/1.6),solid=smooth((t-1.05)/.75),drift=Math.sin(t*.55)*5;
  c.save();c.globalAlpha=1-solid;c.fillStyle=INK;
  for(let i=0;i<1100;i++){const p=k.brandPoints[Math.floor(hash(i+19)*k.brandPoints.length)],x=960+p.x+(1-form)*(hash(i+61)-.5)*2100,y=430+p.y+drift+(1-form)*(hash(i+91)-.5)*1100;c.fillRect(x,y,2+(1-form)*20,1.5+hash(i+31)*2)}c.restore();
  for(let i=0;i<6;i++){const q=ease((t-.08-i*.065)/1.18);c.save();c.beginPath();c.rect(360+i*200-1,0,202,1080);c.clip();c.globalAlpha=solid;c.translate((1-q)*(i-2.5)*75,(1-q)*(i%2?650:-650));c.drawImage(logo,360,250+drift,1200,360);c.restore()}
  for(const [word,x,delay]of [['Make',608,1.75],['it',952,1.98],['real.',1064,2.2]])rise(c,word,x,790+drift,120,t,delay,INK);
  c.fillStyle=INK;c.fillRect(608,840+drift,704*ease((t-2.25)/.7),3);
 }else{
  c.drawImage(logo,76,35,160,48);txt(c,'BUDS AIR8 / MASTER GREY',1844,77,22,INK,400,'right','Mono');
  const q=ease((t-3.7)/1.1);floor(c,960,780,440,.24);product(c,images,'hero.png',960+Math.sin(t*.4)*9,430+(1-q)*150,650,-.025+Math.sin(t*.35)*.012);
  c.save();c.globalAlpha=.28;c.fillStyle=INK;for(let i=0;i<150;i++){const x=((hash(i+20)*2200+t*85)%2200)-140,y=760+hash(i+55)*80;c.fillRect(x,y,2+hash(i+87)*9,1)}c.restore();
  rise(c,'realme Buds Air8',960,903,96,t,3.85,INK,'center');rise(c,'Make it real.',960,986,54,t,4.1,INK,'center');
 }
 if(t>=3.2&&t<4.2){const p=t-3.2;for(let i=0;i<12;i++){const enter=smooth((p-i*.011)/.31),leave=smooth((p-.58-i*.009)/.31);c.fillStyle=[INK,WHITE,YELLOW][i%3];c.fillRect(i*160-1,1080*(1-enter)-1200*leave,162,1200)}}
}
function design(c,t,images){
 back(c,WHITE);brand(c,'MASTER DESIGN',true);const q=ease((t+.2)/1.1);
 c.save();c.globalAlpha=.09;txt(c,'DESIGN',960,615,440,INK,650,'center');c.restore();
 floor(c,1110,865,600,.23);product(c,images,'case.png',1160+Math.sin(t*.35)*14,515+(1-q)*100,570,-.12+Math.sin(t*.3)*.025);
 product(c,images,'bud-1.png',430+Math.cos(t*.4)*14,410+Math.sin(t*.4)*22,430,-.28);
 line(c,175,735,705,735,INK,1);rise(c,'Quietly',120,876,112,t,.3,INK,'left','Editorial');rise(c,'distinctive.',120,973,100,t,.6,INK,'left','Editorial');
 txt(c,'Master design by',1500,890,28,INK,400,'right','Mono');txt(c,'Naoto Fukasawa',1500,938,42,INK,500,'right');
 if(t<1.1){c.save();const x=1920*ease((t+.2)/1.3);c.beginPath();c.rect(x,0,1920-x,1080);c.clip();c.drawImage(images.get('macro.jpg'),0,0,1920,1080);c.restore()}
}
function tune(c,t,images){
 back(c,YELLOW);const word=t<1.6?'TUNE':t<2.9?'IN.':'FEEL IT.';const phase=t<1.6?t:t<2.9?t-1.6:t-2.9,q=ease((phase+.15)/.55);
 c.save();c.translate(960,560);c.rotate((1-q)*-.19+Math.sin(t*.6)*.018);c.scale(.7+.3*q,.7+.3*q);txt(c,word,0,160,word==='FEEL IT.'?360:500,INK,650,'center');c.restore();
 c.save();c.globalAlpha=.2;for(let i=0;i<16;i++){const x=(i*170+t*280)%2400-200;line(c,x,-100,x-220,1200,INK,1)}c.restore();
 product(c,images,'bud-2.png',1540+(1-q)*240,810,360,.65,.96);brand(c,'YOUR SOUND / IN MOTION',true);
}
function drivers(c,t,images,k){
 baseScene(c,'drivers',t,images);k.flow(c,t,{mode:'orbit',color:YELLOW,alpha:.3,count:700,scale:.84,cy:570});
 if(t>4.0){const q=smooth((t-4)/1.1);c.save();c.globalAlpha=q;txt(c,'NEXTBASS',420,250,33,YELLOW,500,'center','Mono');c.restore()}
}
function codec(c,t,images,k){
 back(c,INK);brand(c,'HI-RES AUDIO / LHDC 5.0');k.texture(c,t,CYAN,.055);
 const q=ease((t+.3)/1.3);c.save();c.globalAlpha=.16;txt(c,'LHDC',960,485,460,CYAN,650,'center');c.restore();
 for(let i=0;i<56;i++){const x=150+i*30,h=(80+Math.sin(i*.14+t)*55+Math.cos(i*.3+t*.7)*70)*q;line(c,x,560-h,x,560+h,i%7?CYAN:WHITE,i%7?1.5:3)}
 product(c,images,'bud-2.png',970+Math.sin(t*.4)*30,430,580,-.22+Math.sin(t*.35)*.06);
 rise(c,'HI-RES AUDIO',960,860,75,t,.45,WHITE,'center');rise(c,'LHDC 5.0',960,950,83,t,.8,CYAN,'center');
 qualifier(c,'Compatible LHDC source required · graphic visualisation, not a frequency-response test.');
}
function anc(c,t,images){
 back(c,WHITE);brand(c,'ACTIVE NOISE CANCELLATION',true);const focus=smooth((t-.5)/2.8);
 txt(c,'55',960,810,930,'#E8E8E5',650,'center');
 c.save();c.globalAlpha=.8-focus*.55;c.strokeStyle=YELLOW;c.lineWidth=1.6;c.beginPath();for(let i=0;i<650;i++){const a=i*2.399963+t*.24,r=270+hash(i)*420*(1-focus*.94),x=960+Math.cos(a)*r*1.85,y=450+Math.sin(a)*r*.65;c.moveTo(x,y);c.lineTo(x+Math.cos(a)*7,y+Math.sin(a)*7)}c.stroke();c.restore();
 product(c,images,'bud-1.png',850+Math.sin(t*.4)*18,470,660,-.1);product(c,images,'bud-2.png',1210+Math.cos(t*.45)*16,580,450,.04);
 rise(c,'UP TO 55dB ANC',960,930,87,t,.7,INK,'center');qualifier(c,'Up to 55dB · realme Lab; performance varies with fit and surroundings.',true);
}
function calls(c,t,images){
 back(c,WHITE);brand(c,'CALL NOISE CANCELLATION',true);
 c.save();c.globalAlpha=.07;txt(c,'6',960,890,1050,INK,650,'center');c.restore();
 product(c,images,'bud-1.png',690,440+Math.sin(t*.5)*13,565,-.15);product(c,images,'bud-2.png',1250,480+Math.cos(t*.5)*13,520,.15);
 for(let group=0;group<2;group++)for(let i=0;i<3;i++){const x=group?1520:345,y=340+i*145,e=ease((t+.2-i*.22-group*.12)/.65);dot(c,x,y,18*e,INK);ring(c,x,y,30+Math.sin(t*2-i)*3,30,0,YELLOW,3);line(c,x+(group?-40:40),y,group?1370:530,y+(i-1)*20,YELLOW,2)}
 rise(c,'SIX MICROPHONES.',960,865,87,t,.4,INK,'center');rise(c,'Three per earbud.',960,941,52,t,.7,INK,'center');
 c.save();c.globalAlpha=.08;for(let x=0;x<1920;x+=18)for(let y=140;y<210;y+=18)dot(c,x,y,2.5,INK);c.restore();qualifier(c,'6-mic call noise cancellation · abstract signal graphic, not a recorded call test.',true);
}
function spatial(c,t,images,k){
 back(c,INK);brand(c,'3D SPATIAL + DYNAMIC AUDIO');k.flow(c,t,{mode:'spatial',progress:smooth((t-2.2)/1.6),color:CYAN,alpha:.8,count:1100,scale:1.16,cy:480});
 for(let i=0;i<4;i++)ring(c,960,480,400+i*22,120+i*18,Math.sin(t*.2+i*.4)*.35,CYAN,1.5);
 product(c,images,'bud-2.png',960+Math.sin(t*.4)*20,420+Math.cos(t*.4)*18,590,.18+Math.sin(t*.3)*.035);
 rise(c,'SOUND, ALL AROUND.',960,918,98,t,.5,WHITE,'center');qualifier(c,'Enable 3D Spatial / Dynamic Audio in realme Link · illustrative sound field.');
}
function connection(c,t,images){
 baseScene(c,'connection',Math.min(4.5,t*.65),images);
 c.save();c.globalAlpha=.25;for(let i=0;i<90;i++){const a=i*2.39996+t*.5,r=330+hash(i)*250;dot(c,960+Math.cos(a)*r,570+Math.sin(a)*r*.48,1+hash(i+4)*2,YELLOW)}c.restore();
 if(t>5.4){c.save();c.globalAlpha=smooth((t-5.4)/1.2);txt(c,'PAUSE. SWITCH. PLAY.',960,340,35,YELLOW,500,'center','Mono');c.restore()}
}
function battery(c,t,images){
 back(c,YELLOW);brand(c,'PLAYBACK / ENDURANCE',true);const withCase=t>=4,local=withCase?t-4:t,q=ease((local+.2)/.8);
 txt(c,'UP TO',90,220,43,INK,500);c.save();c.translate(960,540+(1-q)*180);txt(c,withCase?'58':'14',0,300,980,INK,650,'center');c.restore();
 if(withCase)product(c,images,'hero.png',1040+Math.sin(t*.4)*12,645,430,-.06);
 else {product(c,images,'bud-1.png',850+Math.sin(t*.7)*12,595+Math.cos(t*.6)*11,420,-.2+Math.sin(t*.4)*.012);product(c,images,'bud-2.png',1080+Math.cos(t*.65)*12,635+Math.sin(t*.7)*11,370,.12+Math.sin(t*.4)*.012)}
 rise(c,withCase?'HOURS WITH THE CHARGING CASE':'HOURS FROM THE EARBUDS',960,955,55,local,.4,INK,'center');
 qualifier(c,'ANC off / AAC · 50% volume, normal mode, full charge · realme Lab; actual life varies.',true);
 if(withCase)txt(c,'Earbuds + case',1730,260,28,INK,400,'right','Mono');
 if(t>=3.65&&t<=4.45){const p=(t-3.65)/.8;for(let i=0;i<8;i++){const enter=ease((p-i*.012)/.32),leave=ease((p-.58-i*.008)/.32),x=-2000*(1-enter)+2000*leave;c.fillStyle=INK;c.fillRect(x,i*135-2,2000,140)}if(p>.42&&p<.59)txt(c,'WITH THE CASE',960,600,110,YELLOW,650,'center')}
}
function resistance(c,t,images){baseScene(c,'resistance',t,images);c.save();c.globalAlpha=.18;ring(c,960,540,565+Math.sin(t*.5)*13,280,t*.025,YELLOW,2,.2,2.9);c.restore()}
function remix(c,t,images,k){
 back(c,t<2?INK:t<4?YELLOW:WHITE);const dark=t>=2,word=t<2?'LISTEN.':t<4?'MOVE.':'REPEAT.',local=t%2,q=ease((local+.2)/.5);
 txt(c,word,960,630,word==='REPEAT.'?370:430,dark?INK:WHITE,650,'center');
 if(t<2)k.flow(c,t,{mode:'ribbon',color:CYAN,alpha:.7,count:800,cy:760,scale:.8});
 else if(t<4){for(let i=0;i<9;i++){const x=-250+i*280+q*200+(t-2)*80;c.save();c.translate(x,810);c.rotate(-.4);c.fillStyle=INK;c.fillRect(-25,-40,50,260);c.restore()}}
 else product(c,images,'angled.png',960+(1-q)*420,520,760,-.12+Math.sin(t*.4)*.025);
 brand(c,'LISTEN / MOVE / REPEAT',dark);
}
function signature(c,t,images,k){
 baseScene(c,'signature',t,images);const fade=1-smooth((t-1)/2.5);k.flow(c,t+8,{mode:'hero',progress:1,color:CYAN,alpha:fade*.8,count:1100,cy:450,scale:.84});
}
const scenes={origin,design,tune,drivers,codec,anc,calls,spatial,connection,battery,resistance,remix,signature};
export function drawScene(c,id,t,images,kit){if(!Number.isFinite(t))throw new RangeError('Scene time must be finite');c.save();try{c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);if(drawDetail(c,id,Math.max(0,t),images,kit))return;if(!scenes[id])throw new TypeError(`Unknown extended scene ${id}`);scenes[id](c,Math.max(0,t),images,kit)}finally{c.restore()}}
