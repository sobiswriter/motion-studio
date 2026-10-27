import {createStage} from './stage3d.mjs';
import {shots,P,clamp,smooth,out,inout,hash} from './sequence.mjs';
const W=1920,H=1080,TAU=Math.PI*2;
const light=new Set(['bauhaus','clay','iso','glass','mesh','halftone','comic','brutal','outro']);
export function createFilm(canvas){
  let c=canvas.getContext('2d');const output=c,stage=createStage();canvas.dataset.renderer=stage.renderer;
  const make=(w=W,h=H)=>{const a=document.createElement('canvas');a.width=w;a.height=h;return a};
  const incoming=make(),previous=make(),plate=make(),sample=make(160,90),tiny=make(96,54),thumbs=[];
  plate.getContext('2d').drawImage(stage.render('clay',1.8,3),0,0);
  const pc=sample.getContext('2d',{willReadFrequently:true});pc.drawImage(plate,0,0,160,90);const platePixels=pc.getImageData(0,0,160,90).data;
  function rect(x,y,w,h,col,r=0,stroke=null,lw=2){c.beginPath();c.roundRect(x,y,w,h,Math.max(0,r));if(col){c.fillStyle=col;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
  function circle(x,y,r,col,stroke=null,lw=2){c.beginPath();c.arc(x,y,Math.max(.001,r),0,TAU);if(col){c.fillStyle=col;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
  function line(points,col,width=2,close=false,fill=false){c.beginPath();points.forEach(([x,y],i)=>{if(i)c.lineTo(x,y);else c.moveTo(x,y)});if(close)c.closePath();c.lineWidth=width;c.strokeStyle=col;c.fillStyle=col;if(fill)c.fill();else c.stroke();}
  function text(str,x,y,size,col=P.ink,font='Display',weight=700,align='left',maxWidth=1800){c.font=`${font==='Editorial'?'italic ':''}${weight} ${size}px ${font}`;c.textAlign=align;c.textBaseline='alphabetic';c.fillStyle=col;c.fillText(str,x,y,maxWidth);}
  function clip(x,y,w,h,fn,r=0){c.save();c.beginPath();c.roundRect(x,y,w,h,r);c.clip();fn();c.restore();}
  function bead(x,y,r=22){const g=c.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'#ffd2a0');g.addColorStop(.4,P.orange);g.addColorStop(1,'#bc402b');circle(x,y,r,g);}
  function grid(col='#ffffff15',step=72){for(let x=0;x<W;x+=step)line([[x,0],[x,H]],col,1);for(let y=0;y<H;y+=step)line([[0,y],[W,y]],col,1);}
  function texture(alpha=.045){c.save();c.globalAlpha=alpha;for(let j=0;j<1100;j++){c.fillStyle=j%3?P.ink:P.paper;c.fillRect(hash(j)*W,hash(j+3)*H,1+hash(j+11)*3,1);}c.restore();}
  function stamp(word,x,y,size,t,delay,col=P.ink,angle=0,font='Display'){
    if(t<delay)return;
    const p=out((t-delay)/.38);c.save();c.translate(x,y+(1-p)*150);c.rotate(angle*(1-p));c.scale(1+.13*Math.sin(clamp((t-delay)/.5)*Math.PI)*(1-p),Math.max(.01,p));text(word,0,0,size,col,font);c.restore();
  }
  function mark(x,y,s,col=P.ink,progress=1){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=col;c.lineWidth=.075;c.lineCap='round';c.lineJoin='round';c.setLineDash([progress*9,10]);c.beginPath();c.roundRect(-.8,-.8,1.6,1.6,.2);c.stroke();c.setLineDash([]);line([[-.5,.4],[-.38,-.4],[0,.12],[.38,-.4],[.5,.4]],P.orange,.085);c.restore();}
  function inkCamera(x,y,s,angle=0){
    c.save();c.translate(x,y);c.rotate(angle);c.scale(s,s);c.lineJoin='round';
    rect(-170,-50,310,180,P.orange,24,P.ink,7);
    for(const rx of [-90,70]){circle(rx,-85,77,P.paper,P.ink,6);circle(rx,-85,13,P.ink);for(let j=0;j<6;j++){const a=j*TAU/6;circle(rx+44*Math.cos(a),-85+44*Math.sin(a),13,P.ink);}}
    line([[140,-10],[222,-44],[222,120],[140,88]],P.ink,6,true);line([[140,-10],[222,-44],[222,120],[140,88]],P.yellow,0,true,true);
    for(let j=0;j<19;j++)line([[-155+j*15,75],[-141+j*15,107]],'#763f33',1.5);
    rect(-135,-12,92,42,P.ink,3);circle(215,36,30,P.ink);circle(215,36,11,P.orange);rect(-80,132,130,12,P.ink,2);
    c.restore();
  }
  function pixel(t,screen=false){
    rect(0,0,W,H,'#19263e');const k=12,scroll=Math.floor(t*18)*k;
    for(let j=0;j<18;j++){
      const x=((j*156-scroll)%(W+300)+W+300)%(W+300)-100,h=120+(j%5)*36;
      rect(x,650-h,120,h,['#2d455e','#355268','#273c54'][j%3]);for(let y=670-h;y<630;y+=32)rect(x+16,y,12,12,P.cyan);
    }
    for(let j=0;j<42;j++)rect((j*60-scroll*.5+W*3)%(W+80),880,48,200,j%2?'#476e6b':'#355b61');
    const gapX=1230-scroll*.2;rect(gapX,880,180,200,'#19263e');
    const px=280+Math.floor(clamp(t/1.8)*80)*12,jump=-Math.sin(clamp((t-.25)/1.5)*Math.PI)*220;
    const sprite=['000111111000111111000','001122221101122221100','012200002211220000221','012200002211220000221','001122221101122221100','000111111000111111000','000033333333333330000','000034444433333330000','000034444433335333550','000033333333335333550','000033333333333330000','000000066666660000000'];
    sprite.forEach((row,y)=>[...row].forEach((v,x)=>{if(v!=='0')rect(px+x*k,665+jump+y*k,k,k,[null,P.ink,P.paper,P.orange,'#a9513c',P.yellow,'#8c644e'][+v]);}));
    for(let j=0;j<4;j++){
      const hit=t>.35+j*.32,x=830+j*180,y=320+(hit?-30*out((t-.35-j*.32)/.2):0);rect(x+12,y+12,132,132,P.ink);rect(x,y,132,132,hit?P.orange:P.yellow);text(hit?'MOVE'[j]:'?',x+66,y+103,100,P.ink,'Mono',400,'center',125);
      if(hit)for(let q=0;q<5;q++){const a=q*TAU/5;rect(x+64+Math.cos(a)*100,y+64+Math.sin(a)*95,9,9,P.yellow);}
    }
    if(!screen){text('PLAY THE IMPOSSIBLE.',100,180,96,P.paper);texture(.1);}
  }
  function shot(s,t,ctx,mini=false){
    const before=c;c=ctx;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.setLineDash([]);
    const d=s.end-s.start,id=s.id,ink=light.has(id)?P.ink:P.paper;
    rect(0,0,W,H,light.has(id)?P.paper:P.ink);
    const img=stage.render(id,t,d);if(img)c.drawImage(img,0,0);
    if(id==='intro'){
      const draw=smooth(t/.65);line([[120,910],[120,170],[120+1560*draw,170],[1680,170+140*draw]],'#817c72',2);
      bead(1680,170+140*draw,20);for(let j=0;j<6;j++)circle(1680,310,40+j*35+t*4,null,'#f0653518',2);
      const shift=inout((t-1.8)/.35);c.save();c.translate(-shift*2150,0);stamp('ONE',150,490,335,t,.18,P.paper,-.08);stamp('IDEA.',150,805,335,t,.6,P.paper,.1);c.restore();
      c.save();c.translate((1-shift)*2100,0);stamp('TWENTY',135,485,310,t,1.9,P.paper,-.05);stamp('WORLDS.',135,805,310,t,2.15,P.paper,.1);c.restore();
      line([[135,895],[135+1540*out((t-2.4)/.7),895]],P.orange,8);
      text('MOTION STUDIO  /  2026',140,1000,30,P.paper,'Mono',400);texture(.06);
    }else if(id==='particles'){
      const p=1-smooth((t-1.25)/.5);c.save();c.globalAlpha=p;text('IT STARTS',120,230,110,P.paper);text('WITH A SPARK.',120,340,110,P.paper);c.restore();
      line([[1500,740],[1620,860],[1740,860]],P.orange,2);text('ONE SIGNAL',1430,920,28,P.paper,'Mono',400);
    }else if(id==='liquid'){
      c.save();c.globalAlpha=.85;stamp('TAKE',130,280,154,t,.15,P.paper,-.08);stamp('SHAPE.',1180,900,154,t,.48,P.paper,.08);c.restore();
      for(let j=0;j<3;j++)bead(340+j*600,700+Math.sin(t*2+j)*120,10+j*4);
    }else if(id==='bauhaus'){
      rect(0,0,W,H,P.paper);texture(.13);
      const p=out(t/.7);line([[110,90],[1810,90],[1810,940],[110,940],[110,90]],P.ink,3);line([[960,90],[960,940]],P.ink,3);line([[110,520],[1810,520]],P.ink,3);
      c.save();c.translate(530,315);c.rotate((1-p)*Math.PI+Math.sin(t*.7)*.08);circle(0,0,190*p,P.blue);line([[-190,0],[190,0]],P.paper,2);c.restore();
      rect(1040+(1-out((t-.12)/.5))*1000,165,660,290,P.orange);
      c.save();c.translate(1380,755);c.rotate((1-out((t-.35)/.6))*-Math.PI*.5);line([[-260,140],[0,-180],[260,140]],P.yellow,2,true,true);c.restore();
      clip(150,565,730,340,()=>{text('FORM',150,805+(1-out((t-.6)/.55))*340,220,P.ink);});
      if(t>1.45){const q=smooth((t-1.45)/.65);rect(110,90,850*q,430,P.blue);text('FOLLOWS',150,290,130,P.paper);text('FEELING.',150,430,130,P.paper);}
    }else if(id==='clay'){
      text('FEEL THE',120,200,108,P.ink,'Editorial',500);text('FRAME.',120,315,108,P.ink,'Editorial',500);
      const anchor=stage.anchor,p=clamp(t/.75);if(t<.8)bead(anchor.x+(1-p)*300,anchor.y-(1-p)**2*950,27);
      line([[1460,370],[1580,250],[1780,250]],'#725f4b',2);text('PRESSED, NOT PERFECT.',1390,200,28,P.ink,'Mono',400,undefined,430);texture(.08);
    }else if(id==='blueprint'){
      text('Anatomy',115,190,116,P.paper,'Editorial',500);text('of an idea.',115,305,116,P.paper,'Editorial',500);
      const reveal=out((t-.4)/.7);c.save();c.globalAlpha=reveal;
      line([[1220,580],[1510,450],[1760,450]],P.orange,3);text('OPTICS / FOCUS',1480,405,32,P.paper,'Mono',400);
      line([[600,700],[360,855],[135,855]],P.cyan,2);text('KEEP THE SAME SILHOUETTE',135,915,30,P.paper,'Mono',400);c.restore();
      line([[650,940],[1300,940]],P.paper,2);for(const x of [650,1300])line([[x,920],[x,958]],P.paper,2);text('ONE OBJECT / MORE DEPTH',975,995,25,P.paper,'Mono',400,'center');
    }else if(id==='wire'){
      c.save();c.globalAlpha=.16;text('STRUCTURE.',960,265,248,P.paper,'Display',700,'center');c.restore();
      text('DRAWING → DIMENSION',120,145,38,P.cyan,'Mono',400);line([[1480,690],[1640,840],[1770,840]],P.orange,2);text('FOLLOW THE LIGHT',1440,915,28,P.paper,'Mono',400);
    }else if(id==='iso'){
      stamp('BUILD A WORLD.',110,215,146,t,.08,P.ink,-.04);text('THE SIGNAL BRINGS THE SET TO LIFE.',115,295,28,P.ink,'Mono',400);texture(.035);
    }else if(id==='glass'){
      const world=stage.render('iso',.8+Math.min(t,1.7)*.55,3);
      rect(0,0,W,H,'#bacad2');c.save();c.filter='blur(52px)';circle(250+Math.sin(t)*100,250,390,P.orange);circle(1600,750,440,P.blue);c.restore();
      const p=out(t/.5),w=440+960*p,h=100+660*p,x=(W-w)/2,y=(H-h)/2;
      c.save();c.shadowColor='#14263445';c.shadowBlur=60;c.shadowOffsetY=30;rect(x,y,w,h,'#f5eee9a8',48,'#ffffffc8',2);c.restore();
      clip(x+22,y+22,w-44,h-44,()=>{c.save();c.filter='blur(20px)';c.drawImage(world,0,0);c.restore();rect(x,y,w,h,'#eff4f390');},32);
      if(p>.6){const q=out((t-.2)/.45);c.save();c.globalAlpha=q;clip(315,255,1290,510,()=>c.drawImage(world,315,180,1290,725),22);text('A DIFFERENT PERSPECTIVE',350,220,31,P.ink,'Mono',400);
        line([[375,830],[1545,830]],'#64737f55',7);const progress=clamp((t-.5)/1.2);line([[375,830],[375+1170*progress,830]],P.ink,7);circle(375+1170*progress,830,13,P.orange);text('01:20 / 02:00',1545,897,25,P.ink,'Mono',400,'right');if(t<1.2)line([[905,885],[905,918],[940,902]],P.ink,2,true,true);else{rect(905,885,10,33,P.ink);rect(927,885,10,33,P.ink);}c.restore();
        const cx=375+1170*progress,cy=860+Math.sin(t*2)*45;line([[cx,cy],[cx,cy+41],[cx+11,cy+29],[cx+27,cy+32]],P.ink,3,true,true);
      }
    }else if(id==='holo'){
      text('CHANGE THE LIGHT.',120,180,110,P.paper);text('KEEP THE IDEA.',120,280,62,P.cyan,'Editorial',500);
      for(let j=0;j<7;j++){const y=(j*190+t*140)%H;line([[100,y],[1820,y]],'#a1ecf31a',1);}texture(.055);
    }else if(id==='mesh'){
      rect(0,0,W,H,'#e8b3ab');
      for(const [j,[baseX,baseY,col]]of [[300,700,'#efc16d'],[1100,60,'#df6d9f'],[1900,950,'#455ec6'],[100,100,'#f2d7ae']].entries()){
        const x=baseX+Math.sin(t*.8+j)*200,y=baseY+Math.cos(t*.7+j)*180,g=c.createRadialGradient(x,y,10,x,y,1150);g.addColorStop(0,col);g.addColorStop(1,col+'00');c.fillStyle=g;c.fillRect(0,0,W,H);
      }
      for(let j=0;j<7;j++){c.beginPath();c.moveTo(-100,800+j*45);c.bezierCurveTo(500,200+Math.sin(t+j)*180,900,1200,2050,300+j*50);c.strokeStyle=j%2?'#fae1bc20':'#365d9720';c.lineWidth=80;c.stroke();}
      c.save();c.translate(0,18*Math.sin(t*.5));stamp('Feel',205,470,225,t,.15,P.ink,.03,'Editorial');stamp('something.',465,705,225,t,.4,P.ink,-.03,'Editorial');c.restore();texture(.065);
    }else if(id==='deco'){
      rect(0,0,W,H,'#111c1d');const p=out(t/.85);
      for(let j=0;j<6;j++){const inset=110+j*27;line([[inset,H-inset],[inset,100+j*26],[W-inset,100+j*26],[W-inset,H-inset]],P.gold,2);}
      for(let j=0;j<25;j++){const a=-Math.PI+(j/24)*Math.PI;line([[960,810],[960+Math.cos(a)*870*p,810+Math.sin(a)*700*p]],P.gold,2);}
      rect(365,365,1190,310,'#111c1d');stamp('FRAME THE',500,480,120,t,.35,P.gold);stamp('MOMENT',455,640,180,t,.6,P.gold);bead(960,870,16);texture(.06);
    }else if(id==='halftone'){
      rect(0,0,W,H,P.paper);text('PRINTED IN MOTION.',100,180,130,P.ink);line([[100,225],[1820,225]],P.ink,3);
      c.save();c.translate(960,660);c.rotate(-.035);const shift=(1-out(t/.7))*32;
      for(const [layer,col]of [P.cyan,P.pink,P.ink].entries())for(let y=23;y<82;y++)for(let x=28;x<132;x++){
        const i=(y*160+x)*4,lum=(platePixels[i]*.21+platePixels[i+1]*.72+platePixels[i+2]*.07)/255;
        const radius=Math.max(.25,(1-lum)*7.7);circle((x-80)*13+(layer-1)*shift,(y-50)*13, radius,col);
      }c.restore();
      text('FRAME',165,890,170,P.ink);text('THE FEELING.',1040,945,94,P.ink,'Editorial',500);circle(1708,360,75,P.orange);text('20',1708,390,75,P.paper,'Display',700,'center');texture(.19);
    }else if(id==='comic'){
      rect(0,0,W,H,P.paper);const poses=[-.06,.03,-.03];
      for(let j=0;j<3;j++){
        const x=65+j*600,q=out((t-j*.16)/.45);c.save();c.translate((1-q)*2100,0);
        const corners=[[x,80],[x+565,80],[x+510,950],[x-35,950]];line(corners,P.ink,12,true);line(corners,[P.orange,'#97b2bb',P.yellow][j],0,true,true);
        clip(x+4,86,530,850,()=>{
          if(j===0)inkCamera(x+260,520,1.08,poses[j]);
          else if(j===1){c.save();c.translate(x+265,525);c.rotate(t*.8);circle(0,0,255,P.paper,P.ink,9);circle(0,0,210,P.ink);for(let k=0;k<6;k++){c.save();c.rotate(k*TAU/6);line([[28,-38],[190,-95],[150,140],[0,76]],P.orange,0,true,true);c.restore();}circle(0,0,60+25*Math.sin(t*4),P.ink);c.restore();}
          else{for(let k=0;k<22;k++)line([[x+60+k*27,160],[x-80+k*31,850]],P.ink,2);}
        });c.restore();
      }
      const impact=out((t-.9)/.2);c.save();c.translate(1510,520);c.scale(impact,impact);const burst=Array.from({length:22},(_,j)=>{const a=j*TAU/22,r=j%2?130:245;return[Math.cos(a)*r,Math.sin(a)*r]});line(burst,P.paper,0,true,true);line(burst,P.ink,9,true);text('SNAP!',0,35,100,P.ink,'Display',700,'center');c.restore();bead(1640+220*smooth((t-1.4)/1),780-190*Math.sin(clamp((t-1.4)/1)*Math.PI),45);texture(.1);
    }else if(id==='brutal'){
      rect(0,0,W,H,P.paper);const words=['MAKE','YOUR','MARK'];
      for(let j=0;j<3;j++){const p=out((t-j*.22)/.3),x=130+(j%2)*140,y=100+j*275+(1-p)*1000;c.save();c.translate(x,y);c.rotate((1-p)*.14);rect(28,28,1510,240,P.ink);rect(0,0,1510,240,[P.blue,P.orange,P.yellow][j],0,P.ink,8);text(words[j],60,190,215,j===0?P.paper:P.ink);c.restore();}
      const q=clamp((t-1.15)/.8);bead(1750-300*q,200+690*q*q,48);texture(.07);
    }else if(id==='pixel')pixel(t);
    else if(id==='vhs'){
      rect(0,0,W,H,'#24212c');rect(150,65,1620,905,'#777174',100);rect(195,100,1530,820,'#101620',85);
      clip(215,115,1490,785,()=>{c.save();c.translate(215,115);c.scale(1490/W,785/H);pixel(1.7+t*.2,true);c.restore();
        text('MOVE',975,660,360,'#ff288378','Display',700,'center');text('MOVE',985,655,360,'#46fcff99','Display',700,'center');text('MOVE',980,654,360,P.paper,'Display',700,'center');
        for(let y=115;y<900;y+=7)line([[215,y],[1705,y]],'#15102055',3);
        const yy=115+(t*440)%785;rect(215,yy,1490,15,'#dff9f73f');for(let j=0;j<80;j++)rect(215+hash(j+Math.floor(t*30))*1490,yy+hash(j+10)*44,30+hash(j)*170,2,'#b8d3db40');
      },65);circle(1660,944,8,P.orange);text('PLAY',280,200,42,P.paper,'Mono',400);texture(.16);
    }else if(id==='ascii'){
      rect(0,0,W,H,'#101b18');grid('#9cbf9b08',32);const chars=' .:-=+*#%@',rows=45,cols=100,appear=out(t/.9);
      for(let y=7;y<rows-3;y++)for(let x=6;x<cols-6;x++){
        if(hash(x*17+y*311)>appear)continue;
        const sx=Math.round(x/cols*159),sy=Math.round(y/rows*89),i=(sy*160+sx)*4,lum=(platePixels[i]+platePixels[i+1]+platePixels[i+2])/765;
        const ch=chars[Math.floor(clamp(1-lum)*9)];if(ch===' ')continue;text(ch,120+x*16.6,125+y*18,19,x%11===0?P.orange:'#a9c7af','Mono',400);
      }
      const x=200+1400*clamp(t/2),y=500+180*Math.sin(t*2);text('@',x,y,55,P.orange,'Mono',400);text('ONE IDEA / DRAWN WITH CHARACTERS',120,140,31,P.paper,'Mono',400);text('> imagination has many languages_',120,925,38,P.paper,'Mono',400);texture(.09);
    }else if(id==='flap'){
      text('COUNT THE POSSIBILITIES.',120,175,86,P.paper);line([[125,900],[1790,900]],'#65686f',2);text('ONE CONTINUOUS IDEA',960,960,33,P.paper,'Mono',400,'center');
    }else if(id==='neon'){
      rect(0,0,W,H,'#11171c');grid('#ffffff04',70);texture(.16);
      const p=clamp(t/.95);c.textAlign='center';c.textBaseline='alphabetic';c.font='500 246px Display';
      for(const [word,y,col,delay]of [['MAKE IT',470,P.orange,0],['MOVE',760,P.cyan,.22]]){
        const q=out((t-delay)/.7);clip(120,150,1680*q,700,()=>{
          c.save();c.shadowColor=col;c.shadowBlur=70;c.strokeStyle=col;c.lineWidth=12;c.strokeText(word,960,y,1680);c.shadowBlur=22;c.lineWidth=5;c.strokeStyle=P.paper;c.strokeText(word,960,y,1680);c.restore();
        });
      }
      bead(260+1390*p,810-75*Math.sin(p*Math.PI),15);
      text('FOLLOW THE CURRENT.',120,190,30,P.paper,'Mono',400);
    }else if(id==='kinetic'){
      rect(0,0,W,H,t<1.22?P.orange:P.paper);
      if(t<.7){c.save();c.translate(70,220);c.rotate(-.055);stamp('MAKE.',0,400,425,t,.03,P.ink,.22);c.restore();}
      else if(t<1.22){rect(0,0,W,H,P.ink);c.save();c.translate(320,210);c.rotate(.09);stamp('IT.',0,650,760,t,.7,P.paper,-.15);c.restore();}
      else{const p=out((t-1.22)/.25);c.save();c.translate(110,650+(1-p)*220);c.scale(1,Math.max(.05,p));text('MATTER',0,0,375,P.ink,'Display',700,'left',1630);c.restore();bead(1740,625+Math.sin(clamp((t-1.4)/.5)*Math.PI)*-110*(1-out((t-1.4)/.9)),31);text('WITH EVERY FRAME.',120,790,61,P.ink,'Editorial',500);}
      texture(.065);
    }else if(id==='outro'){
      rect(0,0,W,H,P.paper);
      if(!thumbs.length){const save=c;for(const ref of shots.slice(1,-1)){const full=make();shot(ref,(ref.end-ref.start)*.62,full.getContext('2d'),true);const th=make(320,180);th.getContext('2d').drawImage(full,0,0,320,180);thumbs.push(th);}c=save;}
      for(let j=0;j<20;j++){
        const col=j%5,row=Math.floor(j/5),x=110+col*344,y=130+row*190,fold=out((t-1.05-j*.018)/.85);
        if(fold<.985){c.save();c.translate(x+(960-x)*fold,y+(500-y)*fold);c.rotate((col-2)*fold*.18);c.scale(1-fold,1-fold*.8);c.drawImage(thumbs[j],0,0);c.restore();}
      }
      if(t>1.2){c.save();c.globalAlpha=smooth((t-1.2)/.5);mark(420,470,175,P.ink,out((t-1.2)/.9));c.restore();}
      clip(690,260,1110,225,()=>stamp('MOTION',700,455,205,t,2.35,P.ink,.04));
      clip(690,475,1110,230,()=>stamp('STUDIO',700,665,205,t,2.55,P.ink,-.04));
      c.save();c.globalAlpha=smooth((t-3.1)/.6);text('Make every frame matter.',960,870,82,P.ink,'Editorial',500,'center');c.restore();
      line([[110,960],[110,110],[110+1570*smooth((t-3.4)/1),110]],'#b5ad9f',2);
      if(t>3.4)bead(1680,110,18);texture(.045);
    }
    if(s.index>0&&s.index<21&&!mini){const p=out(t/.35)*(1-smooth((t-d+.23)/.23));c.save();c.globalAlpha=p;rect(105,992,52,3,P.orange);text(`${String(s.index).padStart(2,'0')} / 20   ${s.style.toUpperCase()}`,178,1010,27,ink,'Mono',400);c.restore();}
    c=before;
  }
  function transition(s,t){
    const dur=['scan','dots','fold','fan','crt'].includes(s.transition)?.46:.34,q=clamp(t/dur),p=inout(q),ctx=output;
    const last=shots[s.index-1];shot(last,last.end-last.start-.001,previous.getContext('2d'));shot(s,t,incoming.getContext('2d'));
    c=ctx;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.drawImage(previous,0,0);c.save();
    const kind=s.transition;
    if(kind==='scan'){c.beginPath();c.rect(0,0,W*p,H);c.clip();c.drawImage(incoming,0,0);c.restore();rect(W*p-5,0,9,H,P.orange);return;}
    if(kind==='dots'){c.beginPath();for(let y=0;y<H+80;y+=72)for(let x=0;x<W+80;x+=72){c.moveTo(x+65*p,y);c.arc(x,y,65*p,0,TAU);}c.clip();c.drawImage(incoming,0,0);c.restore();return;}
    if(kind==='fan'){c.translate(960,870);c.beginPath();c.moveTo(0,0);c.arc(0,0,2400,-Math.PI, -Math.PI+TAU*p);c.closePath();c.clip();c.drawImage(incoming,-960,-870);c.restore();return;}
    if(kind==='fold'||kind==='panel'){c.restore();c.drawImage(incoming,0,0);const x=W*(1-p);clip(0,0,Math.max(0,x+170),H,()=>{c.save();c.beginPath();c.moveTo(0,0);c.lineTo(x,0);c.lineTo(x+170,H);c.lineTo(0,H);c.clip();c.drawImage(previous,0,0);c.restore();});line([[x,0],[x+170,H],[x+260,H],[x+70,0]],'#d7c9ae',0,true,true);return;}
    if(kind==='bars'||kind==='panes'||kind==='cells'){
      c.restore();for(let j=0;j<10;j++){const move=out((q-j*.025)/.78);clip(j*192,0,192,H,()=>{c.drawImage(incoming,0,H*(1-move));});}return;
    }
    if(kind==='pixels'){
      c.restore();const tc=tiny.getContext('2d');tc.clearRect(0,0,96,54);tc.drawImage(q<.5?previous:incoming,0,0,96,54);c.save();c.imageSmoothingEnabled=false;const scale=1+Math.sin(q*Math.PI)*7,ww=Math.round(96/scale),hh=Math.round(54/scale);tc.drawImage(q<.5?previous:incoming,0,0,ww,hh);c.drawImage(tiny,0,0,ww,hh,0,0,W,H);c.restore();return;
    }
    if(kind==='crt'){
      c.restore();c.drawImage(incoming,0,0);c.drawImage(previous,215*p,115*p,W-(W-1490)*p,H-(H-785)*p);return;
    }
    if(kind==='tracking'){
      c.beginPath();c.rect(0,0,W,H*p);c.clip();c.drawImage(incoming,0,0);c.restore();rect(0,H*p-10,W,20,P.paper);for(let j=0;j<35;j++)rect(hash(j+Math.round(t*60))*W,H*p-20+hash(j)*40,40+hash(j+8)*220,3,P.orange);return;
    }
    if(kind==='ribbon'||kind==='stroke'){
      c.restore();const x=-500+(W+1000)*p;line([[x-400,0],[x+400,0],[x+180,H],[x-600,H]],kind==='ribbon'?P.pink:P.orange,0,true,true);c.save();c.beginPath();c.moveTo(0,0);c.lineTo(x-400,0);c.lineTo(x-600,H);c.lineTo(0,H);c.clip();c.drawImage(incoming,0,0);c.restore();return;
    }
    const center=kind==='period'?[1740,625]:kind==='billboard'?[1320,430]:kind==='iris'?[1680,310]:[960,540];
    c.beginPath();c.arc(center[0],center[1],Math.max(.001,2400*p),0,TAU);c.clip();c.drawImage(incoming,0,0);c.restore();
    if(kind==='seams')for(let j=0;j<6;j++)line([[0,j*180],[W*p,j*180]],P.orange,3);
  }
  return seconds=>{
    const frame=Math.min(3599,Math.max(0,Math.round(seconds*60))),t=frame/60,s=shots.find(s=>frame>=s.frame&&frame<s.endFrame)??shots.at(-1),local=t-s.start;
    const td=['scan','dots','fold','fan','crt'].includes(s.transition)?.46:.34;
    if(s.index&&local<td)transition(s,local);else shot(s,local,output);
  };
}
