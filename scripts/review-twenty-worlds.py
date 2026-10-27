"""Save half-second/native boundary evidence; optional fourth argument selects another film's scene JSON."""
import json, math, subprocess, sys
import numpy as np
from fractions import Fraction
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root=Path(__file__).resolve().parent.parent
video=(root/sys.argv[1]).resolve();dest=(root/sys.argv[2]).resolve();dest.mkdir(parents=True,exist_ok=True)
proposal_path=root/sys.argv[3] if len(sys.argv)>3 else root/'docs/storyboards/20-styles-remake.json'
proposal=json.loads(proposal_path.read_text());duration=float(proposal.get('duration',proposal['scenes'][-1]['end']));sample_count=round(duration*2)
ff=Path.home()/'AppData/Local/Microsoft/WinGet/Links'
probe=json.loads(subprocess.run([str(ff/'ffprobe.exe'),'-v','error','-show_streams','-show_format','-of','json',str(video)],capture_output=True,text=True,check=True).stdout)
vs=next(x for x in probe['streams'] if x['codec_type']=='video');fps=float(Fraction(vs['avg_frame_rate']))
assert vs['width']==1920 and vs['height']==1080
assert abs(float(probe['format']['duration'])-duration)<.1
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18)
def sheets(images,prefix,cols=4,rows=5):
 result=[]
 for page in range(math.ceil(len(images)/(cols*rows))):
  canvas=Image.new('RGB',(cols*480,rows*296),'#171717');draw=ImageDraw.Draw(canvas)
  for j,(im,label) in enumerate(images[page*cols*rows:(page+1)*cols*rows]):
   x=j%cols*480;y=j//cols*296;canvas.paste(im,(x,y));draw.text((x+8,y+273),label,fill='white',font=font)
  target=dest/f'{prefix}-{page+1:02d}.jpg';canvas.save(target,quality=90);result.append(target.relative_to(root).as_posix())
 return result
assert fps in (20,60)
assert int(vs['nb_frames'])==round(fps*duration)
assert any(s['codec_type']=='audio' and int(s['sample_rate'])==48000 and s['channels']==2 for s in probe['streams'])
raw=subprocess.run([str(ff/'ffmpeg.exe'),'-v','error','-i',str(video),'-an','-vf',f'select=not(mod(n\\,{round(fps/2)})),scale=480:270','-fps_mode','passthrough','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],capture_output=True,check=True).stdout
size=480*270*3;assert len(raw)==sample_count*size
samples=[(Image.frombytes('RGB',(480,270),raw[j*size:(j+1)*size]),f'{j/2:05.2f}s') for j in range(sample_count)]
paths=sheets(samples,'half-second')
seams=[]
for s in proposal['scenes'][1:]:
 start=s['start']-2/fps
 raw=subprocess.run([str(ff/'ffmpeg.exe'),'-v','error','-ss',str(start),'-i',str(video),'-an','-frames:v','5','-vf','scale=480:270','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],capture_output=True,check=True).stdout
 assert len(raw)==size*5
 for j in range(5):seams.append((Image.frombytes('RGB',(480,270),raw[j*size:(j+1)*size]),f"{s.get('style',s.get('id'))} / {start+j/fps:.3f}s"))
paths+=sheets(seams,'boundaries',5,4)
proc=subprocess.Popen([str(ff/'ffmpeg.exe'),'-v','error','-i',str(video),'-an','-vf','scale=160:90','-f','rawvideo','-pix_fmt','gray','pipe:1'],stdout=subprocess.PIPE)
changes=[];levels=[];previous=None
while True:
 data=proc.stdout.read(160*90)
 if not data:break
 assert len(data)==160*90
 pixels=np.frombuffer(data,dtype=np.uint8).astype(np.float32)
 levels.append(float(pixels.mean()))
 if previous is not None:changes.append(float(np.sqrt(np.mean((pixels-previous)**2))))
 previous=pixels
assert proc.wait()==0 and len(levels)==round(fps*duration)
longest=run=0
for delta in changes:
 run=run+1 if delta==0 else 0;longest=max(longest,run)
(dest/'pixel-motion.json').write_text(json.dumps({'framesDecoded':len(levels),'fps':fps,'longestIdenticalRunSeconds':longest/fps,'rmsMean':float(np.mean(changes)),'rmsMedian':float(np.median(changes)),'minFrameMean':min(levels),'maxFrameMean':max(levels),'adjacentFrameRms':changes,'note':'160x90 luma comparison of every decoded frame; reading holds may have little change. This checks pixels, not subjective energy.'},indent=2)+'\n')
(dest/'coverage.json').write_text(json.dumps({'video':str(video),'fps':fps,'frames':int(vs.get('nb_frames',0)),'halfSecondSamples':sample_count,'boundarySamples':len(seams),'sheets':paths,'probe':probe},indent=2)+'\n')
print(f'{len(samples)} half-second samples + {len(seams)} boundary frames / {len(paths)} sheets saved to {dest}')
