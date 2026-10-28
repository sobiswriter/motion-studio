export const fps=60,duration=120;
export const shots=[
 {id:'origin',start:0,end:7,title:'Make it real — realme reveal'},
 {id:'design',start:7,end:14,title:'Master design',kind:'scan'},
 {id:'tune',start:14,end:19,title:'Tune in',kind:'kinetic',word:'TUNE IN'},
 {id:'drivers',start:19,end:29,title:'11mm + 6mm dual drivers',kind:'bauhaus'},
 {id:'codec',start:29,end:37,title:'Hi-Res / LHDC 5.0',kind:'scan',accent:'#80E9FF'},
 {id:'anc',start:37,end:46,title:'Up to 55dB ANC',kind:'liquid'},
 {id:'calls',start:46,end:53,title:'Six microphones',kind:'comic'},
 {id:'spatial',start:53,end:61,title:'3D Spatial & Dynamic Audio',kind:'particles',accent:'#80E9FF'},
 {id:'gaming',start:61,end:69,title:'45ms Gaming Mode',kind:'brutal',words:['READY.','SET.','PLAY.']},
 {id:'bluetooth',start:69,end:74,title:'Bluetooth 5.4',kind:'scan',accent:'#80E9FF'},
 {id:'connection',start:74,end:83,title:'3-device connection',kind:'bauhaus'},
 {id:'battery',start:83,end:94,title:'Up to 58 hours with case',kind:'kinetic',word:'KEEP GOING'},
 {id:'resistance',start:94,end:101,title:'IP55 earbuds',kind:'liquid'},
 {id:'translation',start:101,end:108,title:'AI translation',kind:'comic'},
 {id:'remix',start:108,end:114,title:'Listen. Move. Repeat.',kind:'scan'},
 {id:'signature',start:114,end:120,title:'Make it real',kind:'particles'},
].map(s=>({...s,frame:s.start*fps,endFrame:s.end*fps}));
export const handoffs=shots.slice(1).map((s,i)=>{const half=[27,21,24,24,24,21,27,21,21,24,24,24,21,24,27][i];return {id:`handoff-${i+1}`,old:shots[i].id,next:s.id,kind:s.kind,frame:s.frame,startFrame:s.frame-half,endFrame:s.frame+half,options:{word:s.word,words:s.words,accent:s.accent}}});
export const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
export const ease=x=>1-(1-clamp(x))**4;
export const shotAt=f=>shots.find(s=>f>=s.frame&&f<s.endFrame)??shots.at(-1);
