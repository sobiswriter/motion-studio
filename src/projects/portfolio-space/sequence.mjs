export const fps=60,duration=120;
export const shots=[
  {id:'opening',start:0,end:6,title:'Enter the Sobiverse'},
  {id:'universe',start:6,end:16,title:'A map of worlds',kind:'particles'},
  {id:'overview',start:16,end:25,title:'Bound by curiosity',kind:'liquid'},
  {id:'work',start:25,end:29,title:'Work in orbit',kind:'kinetic',word:'WORK'},
  {id:'project',start:29,end:36,title:'LaunchSILO Labs',kind:'bauhaus'},
  {id:'project-detail',start:36,end:43,title:'From scope to system',kind:'kinetic',word:'SYSTEMS'},
  {id:'ai-chapter',start:43,end:47,title:'Think. Test. Build.',kind:'kinetic',word:'THINK'},
  {id:'ai',start:47,end:55,title:'LegalLM / document intelligence',kind:'brutal',words:['ASK.','TRACE.','BUILD.']},
  {id:'research',start:55,end:64,title:'A research constellation',kind:'comic'},
  {id:'tools',start:64,end:68,title:'Beyond the toolkit',kind:'kinetic',word:'BEYOND'},
  {id:'skills',start:68,end:77,title:'Technical craft',kind:'bauhaus'},
  {id:'experience',start:77,end:87,title:'A nonlinear trajectory',kind:'particles'},
  {id:'person',start:87,end:97,title:'The human in the universe',kind:'liquid'},
  {id:'human',start:97,end:101,title:'Still curious',kind:'kinetic',word:'STILL'},
  {id:'contact',start:101,end:110,title:'The next coordinate',kind:'brutal',words:['WHAT IF?','LET’S','BUILD.']},
  {id:'closing',start:110,end:120,title:'Souradip Biswas / Sobiverse',kind:'kinetic',word:'NEXT.'},
].map(s=>({...s,frame:s.start*fps,endFrame:s.end*fps}));
export const handoffs=shots.slice(1).map((s,i)=>{const half=s.kind==='kinetic'?27:24;return{id:`handoff-${i+1}`,old:shots[i].id,next:s.id,kind:s.kind,frame:s.frame,startFrame:s.frame-half,endFrame:s.frame+half,options:{word:s.word,words:s.words}}});
export const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
export const ease=x=>1-(1-clamp(x))**4;
export const shotAt=f=>shots.find(s=>f>=s.frame&&f<s.endFrame)??shots.at(-1);
