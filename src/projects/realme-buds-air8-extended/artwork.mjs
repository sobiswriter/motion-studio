import {drawScene} from './scenes.mjs';
import {createTransitions} from './transitions.mjs';
import {createKit} from './kit.mjs';
import {shots,handoffs,shotAt,fps,duration} from './sequence.mjs';
export async function createFilm(canvas,imageNames){
 const images=new Map();await Promise.all(imageNames.map(async name=>{const image=new Image();image.src=`assets/images/${name}`;await image.decode();images.set(name,image)}));
 const make=()=>{const a=document.createElement('canvas');a.width=1920;a.height=1080;return a},old=make(),next=make(),c=canvas.getContext('2d',{alpha:false}),transition=createTransitions(),byId=new Map(shots.map(s=>[s.id,s]));
 const kit=createKit(images);
 const draw=(ctx,s,f)=>drawScene(ctx,s.id,Math.max(0,Math.min(s.end-s.start,(f-s.frame)/fps)),images,kit);
 return time=>{if(!Number.isFinite(time))throw new RangeError('Film time must be finite');const f=Math.max(0,Math.min(duration*fps-1,Math.round(time*fps))),h=handoffs.find(h=>f>=h.startFrame&&f<h.endFrame);if(h){draw(old.getContext('2d'),byId.get(h.old),f);draw(next.getContext('2d'),byId.get(h.next),f);transition(c,old,next,h.kind,(f-h.startFrame)/(h.endFrame-h.startFrame),h.options)}else draw(c,shotAt(f),f)};
}
