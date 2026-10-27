import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
import {clamp,smooth,out,hash,P} from './sequence.mjs';

export function createStage(){
  const renderer=new T.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  renderer.setSize(1920,1080);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.91;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  const scene=new T.Scene(),eye=new T.PerspectiveCamera(35,16/9,.1,120);
  const pm=new T.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pm.fromScene(room,.06).texture;room.dispose();pm.dispose();
  scene.add(new T.HemisphereLight('#fff0da','#48536d',.8));
  const key=new T.DirectionalLight('#fff0d9',3.6);key.position.set(-4,8,7);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-9;key.shadow.camera.right=9;key.shadow.camera.top=9;key.shadow.camera.bottom=-9;key.shadow.bias=-.001;key.shadow.normalBias=.025;key.shadow.radius=3;scene.add(key);
  const rim=new T.DirectionalLight('#c1d6ff',2.2);rim.position.set(7,2,-4);scene.add(rim);
  const groups={};
  const group=id=>{const g=new T.Group();groups[id]=g;scene.add(g);return g};
  const material=(color,roughness=.5,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
  const bumpData=new Uint8Array(256*256*4);
  for(let y=0;y<256;y++)for(let x=0;x<256;x++){const i=(y*256+x)*4,v=128+Math.round((hash(i)*2-1)*22+Math.sin(Math.hypot(x-100,y-120)*.42)*9);bumpData[i]=bumpData[i+1]=bumpData[i+2]=v;bumpData[i+3]=255;}
  const bump=new T.DataTexture(bumpData,256,256);bump.wrapS=bump.wrapT=T.RepeatWrapping;bump.needsUpdate=true;
  const clay=material('#e97c4a',.76);clay.bumpMap=bump;clay.bumpScale=.04;
  const cream=material('#eacdb0',.84),dark=material('#252633',.45),metal=material('#b6c1cb',.2,.9);
  const lensMat=new T.MeshPhysicalMaterial({color:'#1c334b',metalness:.58,roughness:.08,clearcoat:1,iridescence:.6,iridescenceThicknessRange:[180,500]});
  const bodyShape=new T.Shape();bodyShape.moveTo(-1.45,-.77);bodyShape.lineTo(1.25,-.77);bodyShape.quadraticCurveTo(1.45,-.77,1.45,-.57);bodyShape.lineTo(1.45,.57);bodyShape.quadraticCurveTo(1.45,.77,1.25,.77);bodyShape.lineTo(-1.25,.77);bodyShape.quadraticCurveTo(-1.45,.77,-1.45,.57);bodyShape.lineTo(-1.45,-.77);
  const bodyGeo=new T.ExtrudeGeometry(bodyShape,{depth:.73,bevelEnabled:true,bevelSegments:5,bevelSize:.13,bevelThickness:.13,steps:1,curveSegments:12});bodyGeo.translate(0,0,-.365);
  function mesh(g,geo,mat,x=0,y=0,z=0){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
  function box(g,w,h,d,x,y,z,mat){return mesh(g,new T.BoxGeometry(w,h,d),mat,x,y,z)}
  function cylinder(g,r,d,x,y,z,mat){const m=mesh(g,new T.CylinderGeometry(r,r,d,48),mat,x,y,z);m.rotation.x=Math.PI/2;return m;}
  function cameraModel(id,mode){
    const root=group(id),parts=[];
    const add=(object,layer)=>{parts.push({o:object,home:object.position.clone(),layer});return object;};
    add(mesh(root,bodyGeo,clay),0);
    add(box(root,2.2,.1,.82,0,-.94,0,cream),0);
    for(const x of [-.83,.77]){
      const reel=new T.Group();reel.position.set(x,1.24,0);root.add(reel);add(reel,.4);
      cylinder(reel,.82,.29,0,0,0,cream);cylinder(reel,.13,.32,0,0,.06,dark);
      for(let j=0;j<6;j++){const a=j*Math.PI/3;cylinder(reel,.15,.035,Math.cos(a)*.47,Math.sin(a)*.47,.17,dark);}
      reel.userData.reel=true;
    }
    add(box(root,.35,.28,.24,-1.25,.37,.55,cream),.5);
    add(box(root,.36,.09,.26,.83,.89,0,dark),0);
    const optical=new T.Group();optical.position.set(.68,-.03,.63);root.add(optical);add(optical,1);
    cylinder(optical,.59,.6,0,0,0,dark);cylinder(optical,.67,.16,0,0,.36,cream);cylinder(optical,.49,.045,0,0,.46,lensMat);
    for(let j=0;j<22;j++){const a=j*Math.PI/11;const screw=box(optical,.035,.045,.12,Math.cos(a)*.59,Math.sin(a)*.59,.36,metal);screw.rotation.z=a;}
    const bead=mesh(optical,new T.SphereGeometry(.11,24,16),material(P.orange,.23,.3),0,0,.52);bead.userData.bead=true;
    const plaque=box(root,.82,.38,.035,-.65,.02,.51,dark);add(plaque,.6);
    if(mode){
      root.traverse(o=>{if(!o.isMesh)return;
        if(mode==='blueprint'){o.material=new T.MeshBasicMaterial({visible:false});o.add(new T.LineSegments(new T.EdgesGeometry(o.geometry,24),new T.LineBasicMaterial({color:'#c7e5f6',transparent:true,opacity:.85})));}
        else o.material=new T.MeshBasicMaterial({color:o.userData.bead?P.orange:'#8bdfdf',wireframe:true,transparent:true,opacity:.86});
        o.castShadow=false;o.receiveShadow=false;
      });
    }
    return {root,parts,bead};
  }
  const cams={clay:cameraModel('clay'),blueprint:cameraModel('blueprint','blueprint'),wire:cameraModel('wire','wire')};
  const floor=mesh(scene,new T.PlaneGeometry(200,200),material('#e4d8c5',.95),0,-1.1,0);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;
  const grid=new T.GridHelper(30,40,'#77afce','#315078');grid.position.y=-1.09;scene.add(grid);
  const particles=group('particles'),pg=new T.BufferGeometry(),pa=new Float32Array(6500*3),colors=new Float32Array(6500*3);
  for(let j=0;j<6500;j++){const col=new T.Color(j%7===0?'#fff0da':j%3===0?'#ffbc74':P.orange);col.toArray(colors,j*3);}
  pg.setAttribute('position',new T.BufferAttribute(pa,3));pg.setAttribute('color',new T.BufferAttribute(colors,3));
  const points=new T.Points(pg,new T.PointsMaterial({size:.027,vertexColors:true,transparent:true,opacity:.95,blending:T.AdditiveBlending,depthWrite:false}));particles.add(points);
  const liquid=group('liquid'),lm=new MarchingCubes(40,new T.MeshPhysicalMaterial({color:'#eb6a38',metalness:.43,roughness:.13,clearcoat:1,envMapIntensity:1.5}),false,false,12000);lm.scale.setScalar(3.4);lm.isolation=48;liquid.add(lm);
  const city=group('iso'),holo=group('holo');
  const matteBlue=material('#66838c',.65),matteWhite=material('#e8e6df',.7),warm=material('#d7b095',.65),asphalt=material('#556875',.9);
  const cityItems=[];
  function cityBox(w,h,d,x,z,mat){const part=box(city,w,h,d,x,h/2-1.1,z,mat);cityItems.push({o:part,y:part.position.y,h});return part;}
  cityBox(10,.15,7,0,0,matteWhite);
  cityBox(7,.025,.65,0,.9,asphalt);cityBox(.65,.025,5,1.1,0,asphalt);
  for(let j=0;j<12;j++)box(city,.2,.012,.035,-3+j*.55,-.92,.9,matteWhite);
  const buildings=[[-2,-1.6,2.5,1.5,1.7],[1.4,-1.7,2.1,2,1.4],[-2.5,2.1,2,1,1.1],[3,1.9,1.3,1.5,1.2]];
  for(const [i,[x,z,w,h,d]] of buildings.entries()){
    cityBox(w,h,d,x,z,i%2?warm:matteBlue);const roof=cityBox(w+.1,.12,d+.1,x,z,matteWhite);roof.position.y=h-1.04;cityItems.at(-1).y=roof.position.y;
    for(let j=0;j<3;j++)for(let k=0;k<2;k++)box(city,.22,.26,.028,x-w*.3+j*w*.28,-.5+k*.52,z+d/2+.02,material(i%2?'#fff1c4':'#d2e6ed',.2));
    box(city,.8,.45,.03,x,-.65,z+d/2+.05,dark);
    for(let j=0;j<3;j++)box(city,.3,.15,.5,x-.7+j*.6,h-.9,z,metal);
  }
  for(const x of [-4,3.7]){
    box(city,.06,3,.06,x,.4,-.2,dark);box(city,1.1,.08,.08,x,1.94,-.2,dark);
    for(let j=0;j<3;j++)box(city,.22,.22,.2,x-.38+j*.38,1.9,-.1,cream);
  }
  const signCanvas=document.createElement('canvas');signCanvas.width=1024;signCanvas.height=512;const sc=signCanvas.getContext('2d');sc.fillStyle=P.ink;sc.fillRect(0,0,1024,512);sc.fillStyle=P.paper;sc.font='700 145px Display';sc.textAlign='center';sc.fillText('CREATE.',512,300);sc.fillStyle=P.orange;sc.fillRect(80,380,864,8);
  const signMap=new T.CanvasTexture(signCanvas);signMap.colorSpace=T.SRGBColorSpace;
  box(city,.08,3,.08,3.2,.4,-2.9,dark);box(city,2.4,1.2,.12,3.2,2,-2.9,dark);
  mesh(city,new T.PlaneGeometry(2.3,1.15),new T.MeshBasicMaterial({map:signMap}),3.2,2,-2.82);
  const route=new T.CatmullRomCurve3([[-4,-.91,.9],[-2,-.91,.9],[1.1,-.91,.9],[1.1,-.91,-1.8],[2.5,-.91,-2.9],[3.2,2,-2.65]].map(p=>new T.Vector3(...p)));
  mesh(city,new T.TubeGeometry(route,120,.025,7,false),new T.MeshBasicMaterial({color:P.orange}));
  const signal=mesh(city,new T.SphereGeometry(.13,24,16),new T.MeshStandardMaterial({color:P.orange,emissive:P.orange,emissiveIntensity:1.2}));
  const hologramCity=city.clone(true),holoMaterials=[];holo.add(hologramCity);hologramCity.traverse(o=>{if(o.isMesh){o.material=new T.MeshPhysicalMaterial({color:'#88dce5',roughness:.14,metalness:.72,transparent:true,opacity:.66,iridescence:1,iridescenceIOR:1.5,iridescenceThicknessRange:[130,620],side:T.DoubleSide,depthWrite:false});holoMaterials.push(o.material);}});
  const sheets=[];
  for(let j=0;j<4;j++){const sheet=mesh(holo,new T.PlaneGeometry(10,6),new T.MeshBasicMaterial({color:j%2?P.pink:P.cyan,transparent:true,opacity:.06,side:T.DoubleSide,depthWrite:false}),0,1,j*.7-1);sheet.rotation.y=.5; sheets.push(sheet);}
  const flap=group('flap'),tiles=[],texCache=new Map();
  function glyph(ch,half){const id=ch+half;if(texCache.has(id))return texCache.get(id);const cc=document.createElement('canvas');cc.width=256;cc.height=180;const cx=cc.getContext('2d');cx.fillStyle='#15171c';cx.fillRect(0,0,256,180);cx.fillStyle=P.paper;cx.font='700 300px Display';cx.textAlign='center';cx.fillText(ch,128,half==='top'?285:105);const tex=new T.CanvasTexture(cc);tex.colorSpace=T.SRGBColorSpace;texCache.set(id,tex);return tex;}
  for(const [row,word] of ['20','STYLES'].entries())for(const [j,ch] of [...word].entries()){
    const tile=new T.Group();tile.position.set((j-(word.length-1)/2)*.96,row===0?1.05:-.7,0);flap.add(tile);
    box(tile,.87,1.3,.16,0,0,-.1,dark);
    const top=mesh(tile,new T.PlaneGeometry(.84,.61),new T.MeshBasicMaterial({map:glyph(ch,'top')}),0,.32,.01);
    const bottom=mesh(tile,new T.PlaneGeometry(.84,.61),new T.MeshBasicMaterial({map:glyph(ch,'bottom')}),0,-.32,.015);
    const pivot=new T.Group();tile.add(pivot);const face=mesh(pivot,new T.PlaneGeometry(.84,.61),new T.MeshBasicMaterial({map:glyph(ch,'top'),side:T.DoubleSide}),0,.32,.025);
    box(tile,.89,.025,.05,0,0,.07,metal);tiles.push({tile,top,bottom,pivot,face,ch,j, row});
  }
  let anchor={x:1180,y:580};
  function render(id,t=0,duration=3){
    for(const g of Object.values(groups))g.visible=false;
    grid.visible=false;floor.visible=false;scene.fog=null;eye.fov=35;eye.position.set(0,1,10);eye.lookAt(0,.2,0);scene.background=new T.Color(P.ink);
    const u=clamp(t/duration);
    if(id==='particles'){
      particles.visible=true;eye.position.set(Math.sin(t*.25)*.4,0,7.2-u*1.6);eye.lookAt(0,0,0);
      const gather=smooth((u-.72)/.28);
      for(let j=0;j<6500;j++){const a=hash(j*7)*Math.PI*2+t*.7,r=1.8+.45*Math.sin(a*3+t)+(hash(j*11)-.5)*.35;pa[j*3]=(Math.cos(a)*r*1.2+Math.sin(a*3+t)*.17)*(1-gather);pa[j*3+1]=(Math.sin(a)*r*.77+Math.sin(a*2+t)*.24)*(1-gather);pa[j*3+2]=(hash(j*13)-.5)*1.3*(1-gather)+Math.sin(a*2+t)*.5;}
      pg.attributes.position.needsUpdate=true;points.rotation.z=-.22-t*.08;
    }else if(id==='liquid'){
      liquid.visible=true;eye.position.set(.5+Math.sin(t*.7)*.6,.4,9-u*.8);eye.lookAt(0,0,0);lm.reset();
      for(let j=0;j<60;j++){const a=j/60*Math.PI*2,shape=smooth((u-.1)/.7),co=Math.cos(a),si=Math.sin(a);const r=.055+shape*.28,exponent=1-shape*.45;lm.addBall(.5+Math.sign(co)*Math.abs(co)**exponent*r*1.05,.5+Math.sign(si)*Math.abs(si)**exponent*r*.65,.5+Math.sin(a*3+t*2)*.025,.3,12);}
      lm.update();lm.rotation.set(.2*Math.sin(t),t*.18,-.25+.1*Math.sin(t));
    }else if(cams[id]){
      const model=cams[id];model.root.visible=true;
      const angle=id==='wire'?-.35+t*.65:id==='clay'?-.8+.45*out(t/1.1):-.35;
      model.root.rotation.set(-.04,angle,.015);
      let scale=1;
      if(id==='clay')scale=.9+.1*out(t/.7);model.root.scale.setScalar(scale);
      const contact=Math.exp(-Math.max(0,t-.75)*5)*Math.sin(Math.max(0,t-.75)*17);
      if(id==='clay')model.root.scale.set(scale*(1+contact*.05),scale*(1-contact*.075),scale);
      const explode=id==='blueprint'?smooth((t-.35)/.7)*(1-smooth((t-2.05)/.8)):0;
      for(const p of model.parts){p.o.position.copy(p.home);p.o.position.z+=p.layer*(explode*2+(id==='clay'?(1-out(t/.65))*1.5:0));p.o.position.x+=p.layer*explode*.6;if(p.o.userData.reel)p.o.rotation.z=t*(id==='clay'?-.7:.2);}
      if(id==='clay'){floor.visible=true;floor.material.color.set('#d7c8ae');scene.background=new T.Color('#d9cdb9');scene.fog=new T.Fog('#d9cdb9',11,28);eye.position.set(2.1-.3*u,2,8.8-.3*u);eye.lookAt(0,.45,0);}
      else if(id==='blueprint'){scene.background=new T.Color('#143357');grid.visible=true;eye.position.set(1.9,2,8.5);eye.lookAt(.2,.45,.5);}
      else{grid.visible=true;scene.background=new T.Color('#0b1726');eye.position.set(1.9-1.4*u,1.7-.5*u,10-3.4*smooth((u-.5)/.5));eye.lookAt(.4,.2,.5);}
    }else if(id==='iso'||id==='holo'){
      const isHolo=id==='holo',g=isHolo?holo:city;g.visible=true;g.rotation.set(0,0,0);grid.visible=isHolo;floor.visible=!isHolo;
      scene.background=new T.Color(isHolo?'#111526':'#e4e3dc');floor.material.color.set('#e4e3dc');
      if(!isHolo){for(const p of cityItems){const reveal=out((t-hash(p.h*91+p.y)*.65)/.7);p.o.scale.y=Math.max(.001,reveal);p.o.position.y=-1.1+(p.y+1.1)*reveal;}}
      signal.position.copy(route.getPoint(clamp((t-.25)/2.2)));
      const dive=isHolo?0:smooth((t-2.15)/.85);
      eye.position.set(8.6*(1-dive)+3.2*dive,6.3*(1-dive)+2*dive,10*(1-dive)-1.8*dive);eye.lookAt(3.2*dive,.2+1.8*dive,-2.82*dive);
      if(isHolo){eye.position.set(8*Math.cos(t*.16),5.5,10);eye.lookAt(0,.3,0);for(const [j,s]of sheets.entries())s.position.z=(t*1.5+j*.8)%4-2;for(const [j,m]of holoMaterials.entries())m.color.setHSL(.5+.18*Math.sin(j*.7+t*1.5),.62,.57);}
    }else if(id==='flap'){
      flap.visible=true;scene.background=new T.Color('#26272b');eye.position.set(.22*Math.sin(t),.15,8.8);eye.lookAt(0,.1,0);
      for(const tile of tiles){const elapsed=t-.06*tile.j-.1*tile.row,stop=.65+.04*tile.j;const cycle=Math.max(0,elapsed)*11,part=cycle%1;const final=elapsed>stop;const ch=final?tile.ch:'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[(Math.floor(cycle)+tile.j*7)%36];tile.top.material.map=glyph(ch,'top');tile.bottom.material.map=glyph(ch,'bottom');tile.face.material.map=glyph(ch,'top');tile.pivot.rotation.x=final?0:-part*Math.PI;tile.face.visible=!final;}
    }else return null;
    eye.updateProjectionMatrix();renderer.render(scene,eye);if(cams[id]){const v=cams[id].bead.getWorldPosition(new T.Vector3()).project(eye);anchor={x:(v.x+1)*960,y:(1-v.y)*540};}return renderer.domElement;
  }
  const gl=renderer.getContext(),info=gl.getExtension('WEBGL_debug_renderer_info');
  return {render,get anchor(){return anchor},renderer:info?gl.getParameter(info.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)};
}
