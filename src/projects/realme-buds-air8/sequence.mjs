export const fps=60,duration=45;
export const shots=[
 {id:'signal',start:0,end:4,title:'Your sound. In focus.'},
 {id:'hero',start:4,end:8,title:'realme Buds Air8',kind:'liquid'},
 {id:'anc',start:8,end:15,title:'Up to 55dB ANC',kind:'kinetic',word:'FOCUS'},
 {id:'drivers',start:15,end:22,title:'11mm + 6mm dual drivers',kind:'bauhaus'},
 {id:'battery',start:22,end:29,title:'Up to 58h total playback',kind:'liquid'},
 {id:'resistance',start:29,end:34,title:'IP55 earbuds',kind:'comic'},
 {id:'connection',start:34,end:39,title:'3-device connection',kind:'brutal',words:['ONE','PAIR.','3 DEVICES.']},
 {id:'signature',start:39,end:45,title:'Find your frequency.',kind:'kinetic',word:'YOUR.'},
].map(s=>({...s,frame:s.start*fps,endFrame:s.end*fps}));
export const handoffs=shots.slice(1).map((s,i)=>{const half=[18,21,24,18,21,21,24][i];return {id:`handoff-${i+1}`,old:shots[i].id,next:s.id,kind:s.kind,frame:s.frame,startFrame:s.frame-half,endFrame:s.frame+half,options:{word:s.word,words:s.words}}});
export const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
export const ease=x=>1-(1-clamp(x))**4;
export const shotAt=f=>shots.find(s=>f>=s.frame&&f<s.endFrame)??shots.at(-1);
