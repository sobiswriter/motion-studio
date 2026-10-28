import {drawIdentityScene} from './identity-scenes.mjs';
import {drawWorkScene} from './work-scenes.mjs';
import {createTransitions} from '../portfolio-film/transitions.mjs';
import {shots,handoffs,shotAt,fps,duration,clamp} from './sequence.mjs';

export async function createFilm(canvas,imageNames){
  const images=new Map();
  await Promise.all(imageNames.map(async name=>{const img=new Image();img.src=`assets/images/${name}`;await img.decode();images.set(name,img)}));
  if(!images.has('portrait.jpg')||!images.has('launchsilo.png'))throw new Error('Missing source artwork');
  const create=()=>{const a=document.createElement('canvas');a.width=1920;a.height=1080;return a};
  const outgoing=create(),incoming=create(),c=canvas.getContext('2d',{alpha:false}),transition=createTransitions();
  const byId=new Map(shots.map(s=>[s.id,s]));
  function scene(ctx,s,frame){
    const t=clamp((frame-s.frame)/(s.endFrame-s.frame))*(s.end-s.start);
    ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    if(!drawIdentityScene(ctx,s.id,t,images)&&!drawWorkScene(ctx,s.id,t,images))throw new Error(`Unknown scene ${s.id}`);
  }
  return time=>{
    if(!Number.isFinite(time))throw new RangeError('Film time must be finite');
    const frame=Math.max(0,Math.min(duration*fps-1,Math.round(time*fps))),h=handoffs.find(h=>frame>=h.startFrame&&frame<h.endFrame);
    c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';
    if(h){scene(outgoing.getContext('2d'),byId.get(h.old),frame);scene(incoming.getContext('2d'),byId.get(h.next),frame);transition(c,outgoing,incoming,h.kind,(frame-h.startFrame)/(h.endFrame-h.startFrame),h.options)}
    else scene(c,shotAt(frame),frame);
  };
}
