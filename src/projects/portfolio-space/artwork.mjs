import {drawSpaceIdentity} from './space-identity.mjs';
import {drawSpaceWork} from './space-work-scenes.mjs';
import {createArtKit} from './space-kit.mjs';
import {createSpaceTransitions} from './space-transitions.mjs';
import {shots,handoffs,shotAt,fps,duration,clamp} from './sequence.mjs';
export async function createFilm(canvas,imageNames){
  const images=new Map();await Promise.all(imageNames.map(async name=>{const img=new Image();img.src=`assets/images/${name}`;await img.decode();images.set(name,img)}));
  const kit=createArtKit(images),transition=createSpaceTransitions(),create=()=>{const a=document.createElement('canvas');a.width=1920;a.height=1080;return a};
  const outgoing=create(),incoming=create(),c=canvas.getContext('2d',{alpha:false}),byId=new Map(shots.map(s=>[s.id,s]));
  function scene(ctx,s,frame){const t=clamp((frame-s.frame)/(s.endFrame-s.frame))*(s.end-s.start);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.filter='none';ctx.shadowBlur=0;if(!drawSpaceIdentity(ctx,s.id,t,images,kit)&&!drawSpaceWork(ctx,s.id,t,images,kit))throw new Error(`Unknown scene ${s.id}`)}
  return time=>{
    if(!Number.isFinite(time))throw new RangeError('Film time must be finite');
    const f=Math.max(0,Math.min(duration*fps-1,Math.round(time*fps))),h=handoffs.find(h=>f>=h.startFrame&&f<h.endFrame);c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';
    if(h){scene(outgoing.getContext('2d'),byId.get(h.old),f);scene(incoming.getContext('2d'),byId.get(h.next),f);transition(c,outgoing,incoming,h.kind,(f-h.startFrame)/(h.endFrame-h.startFrame),h.options)}else scene(c,shotAt(f),f);
  };
}
