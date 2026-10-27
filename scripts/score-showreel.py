"""Original 120 BPM score sequenced from earshot's locally rendered sound kit."""
import json
from pathlib import Path
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

ROOT = Path(__file__).resolve().parent.parent
PROJECT = ROOT / "src/projects/style-showreel"
OUT = PROJECT / "assets/audio"
RATE = 48000
N = RATE * 60
music = np.zeros((N, 2), dtype=np.float64)
effects = np.zeros_like(music)
cache = {}
events = []

def sample(name, slow=1):
    key = (name, slow)
    if key not in cache:
        path = OUT / "kit" / name
        data, sr = sf.read(path, always_2d=True)
        assert sr == RATE
        if data.shape[1] == 1:
            data = np.repeat(data, 2, axis=1)
        data = data[:, :2]
        if slow != 1:
            data = resample_poly(data, slow, 1)
        cache[key] = data
    return cache[key]

def place(dest, name, t, db, pan=0, slow=1, record=False):
    x = sample(name, slow).copy()
    x *= 10 ** (db / 20)
    x[:, 0] *= np.sqrt(1 - max(0, pan))
    x[:, 1] *= np.sqrt(1 + min(0, pan))
    start = round(t * RATE)
    if start < 0:
        x = x[-start:]
        start = 0
    length = min(len(x), N - start)
    if length > 0:
        dest[start:start + length] += x[:length]
    if record:
        events.append({"t": round(t, 4), "frame": round(t * 60), "file": name, "gain_db": db})

roots = ["A4", "G4", "E4", "D4"]
phrases = [["A4", "C5", "E5", "G5", "E5", "C5"],
           ["G4", "C5", "D5", "E5", "D5", "C5"],
           ["E4", "G4", "C5", "E5", "G4", "C5"],
           ["D4", "G4", "A4", "D5", "A4", "G4"]]

for scene in range(20):
    start = scene * 3
    chord = scene % 4
    for beat in range(6):
        t = start + beat * .5
        note = phrases[chord][beat]
        if beat in (0, 3):
            place(music, f"text_{roots[chord]}.wav", t, -22, slow=4)
        place(music, f"text_{note if note.endswith('4') else note.replace('5','4')}.wav", t, -16 + (beat % 3 == 0) * 2, pan=(-.25 if beat % 2 else .25))
        if beat in (0, 2, 3, 5):
            place(music, "drop_1.wav", t, -17 if beat in (0, 3) else -21)
        if beat in (1, 4):
            place(music, "snap_1.wav", t, -23)
        place(music, "tick_1.wav", t + .25, -25, pan=.2)
        if scene >= 4 and scene not in (8, 10, 18):
            high = note.replace("4", "5")
            if high in ("A5", "C5", "D5", "E5", "G5"):
                place(music, f"bell_{high}.wav", t + .25, -27, pan=-.3)
    if scene:
        role = "whoosh-short_1.wav" if scene % 3 else "whoosh-long_1.wav"
        # A whoosh's measured peak, rather than its file start, lands on the scene cut.
        lock = json.loads((OUT / "kit/kit.lock.json").read_text())
        kind = "whoosh.short" if "short" in role else "whoosh.long"
        peak = lock["roles"][kind]["takes"][0]["peak_s"]
        place(effects, role, start - peak, -18, record=True)
    place(effects, ["hit_1.wav", "land_1.wav", "pop_1.wav"][scene % 3], start + .2, -13, record=True)
    if scene in (1, 5, 8, 15, 16):
        for j in range(3):
            place(effects, "pop_2.wav" if scene != 16 else "bell_E5.wav", start + 1 + j * .5, -21, pan=(j - 1) * .3, record=True)
    if scene == 12:
        for j in range(14):
            place(effects, "tock_1.wav", start + j / 18, -24, record=True)
            place(effects, "tock_2.wav", start + 1.6 + j / 18, -24, record=True)
    if scene == 6:
        for t in (.7, 1.15):
            place(effects, "land_2.wav", start + t, -17, record=True)
    if scene == 9:
        for j in range(12):
            place(effects, f"key_{j + 1}.wav", start + .2 + j * .11, -27, record=True)

# Tight stereo delay gives the mallet score a room without washing out the transients.
for seconds, gain in [(.125, .12), (.375, .07)]:
    d = round(seconds * RATE)
    music[d:] += music[:-d, ::-1] * gain
fade = np.ones(N)
fade[-RATE * 2:] = np.linspace(1, 0, RATE * 2) ** 1.4
music *= fade[:, None]
effects[-RATE:] *= np.linspace(1, 0, RATE)[:, None]
combined = music + effects
peak = np.max(np.abs(combined))
assert np.isfinite(combined).all() and peak > .01
combined *= min(1, .85 / peak)
OUT.mkdir(parents=True, exist_ok=True)
sf.write(OUT / "music.wav", music, RATE, subtype="PCM_24")
sf.write(OUT / "procedural-effects.wav", effects, RATE, subtype="PCM_24")
sf.write(OUT / "score.wav", combined, RATE, subtype="PCM_24")
(PROJECT / "sound-cues.json").write_text(json.dumps(events, indent=2))
print(f"Original score: 60 s / 120 BPM / {len(events)} designed effects / peak {peak:.3f}")
