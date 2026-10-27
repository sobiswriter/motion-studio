export const fps=60,duration=120;
export const shots=[
  {id:'opening',start:0,end:6},
  {id:'universe',start:6,end:16,source:[.6,7.6],zoom:1.6,anchor:[1000,650],label:'A personal universe',kind:'particles'},
  {id:'overview',start:16,end:25,source:[12.2,16.8],label:'A restless mind',kind:'liquid'},
  {id:'work',start:25,end:29,kind:'kinetic',word:'WORK'},
  {id:'project',start:29,end:36,source:[23.45,26.15],label:'Selected work / LaunchSILO Labs',kind:'bauhaus'},
  {id:'project-detail',start:36,end:43,source:[27.8,29],crop:[650,785,940,293],fit:'proof',label:'LaunchSILO Labs / how it works',kind:'kinetic',word:'SYSTEMS'},
  {id:'ai-chapter',start:43,end:47,kind:'kinetic',word:'THINK'},
  {id:'ai',start:47,end:55,source:[37.6,41],label:'AI & experiments',kind:'brutal',words:['QUESTIONS.','SYSTEMS.','POSSIBILITIES.']},
  {id:'research',start:55,end:64,source:[45.1,50.3],label:'Research & publications',kind:'comic'},
  {id:'tools',start:64,end:68,kind:'kinetic',word:'BEYOND'},
  {id:'skills',start:68,end:77,source:[54.2,58.5],label:'Know the tools. Build beyond them.',kind:'bauhaus'},
  {id:'experience',start:77,end:87,source:[62.7,68.5],label:'Experience & recognition',kind:'particles'},
  {id:'person',start:87,end:97,source:[76,82.5],label:'The person behind the work',kind:'liquid'},
  {id:'human',start:97,end:101,kind:'kinetic',word:'STILL'},
  {id:'contact',start:101,end:110,source:[87.4,91.2],label:'Let’s build what’s next.',kind:'brutal',words:['CURIOUS?','LET’S','BUILD.']},
  {id:'closing',start:110,end:120,kind:'kinetic',word:'NEXT.'},
].map(s=>({...s,frame:Math.round(s.start*fps),endFrame:Math.round(s.end*fps)}));
export const handoffs=shots.slice(1).map((s,i)=>{const half=s.kind==='kinetic'?27:24;return{id:`handoff-${i+1}`,old:shots[i].id,next:s.id,kind:s.kind,frame:s.frame,startFrame:s.frame-half,endFrame:s.frame+half,options:{word:s.word,words:s.words}}});
export const clamp=x=>Math.max(0,Math.min(1,x));
export const ease=x=>1-(1-clamp(x))**4;
export const shotAt=f=>shots.find(s=>f>=s.frame&&f<s.endFrame)??shots.at(-1);
