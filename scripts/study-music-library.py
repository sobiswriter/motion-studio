"""Local music inventory: earshot meters, full-track structure and audition windows.

Run with .cache/audio-venv/Scripts/python.exe. No models, uploads or source edits.
"""
import hashlib
import json
import os
from pathlib import Path
import subprocess

import numpy as np
from scipy import signal, ndimage
from earshot import api, audio, features

ROOT = Path(__file__).resolve().parents[1]
os.chdir(ROOT)
TOOLS = Path(os.environ['LOCALAPPDATA']) / 'Microsoft/WinGet/Links'
os.environ['PATH'] = str(TOOLS) + os.pathsep + os.environ['PATH']
os.environ.setdefault('EARSHOT_HOME', str(ROOT / '.cache/earshot'))
OUT = ROOT / 'docs/music-library'
SOURCE = ROOT / 'assets/music'
VERSION = 1


def run(tool, args):
    return subprocess.run([str(TOOLS / (tool + '.exe')), *map(str, args)],
                          capture_output=True, check=True).stdout


def dump(path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False, allow_nan=False) + '\n', encoding='utf-8')


def windows(levels, counts, length, duration):
    """One-second candidate starts; never suggest an incomplete/source-overrun window."""
    result = []
    for start in range(0, int(duration - length) + 1):
        a = levels[start:start + length]
        if len(a) != length or np.mean(a) < np.median(levels) - 10:
            continue
        result.append({'start': start, 'end': start + length,
                       'meanRmsDbfs': round(float(np.mean(a)), 2),
                       'levelSpreadDb': round(float(np.std(a)), 2),
                       'riseDb': round(float(np.mean(a[-3:]) - np.mean(a[:3])), 2),
                       'attacksPerSecond': round(float(np.sum(counts[start:start + length]) / length), 3)})
    return result


def structure(x):
    mono = x.mean(axis=1)
    duration = len(x) / 48000
    rms = features.frame_rms(mono, 48000)
    levels = 20 * np.log10(np.maximum(rms, 1e-7))
    y = signal.resample_poly(mono, 1, 6)
    # Spectral-flux peaks are attack candidates, not certified beats or semantic events.
    _, times, spec = signal.stft(y, 8000, nperseg=1024, noverlap=896, boundary=None)
    mag = np.log1p(np.abs(spec) * 100)
    flux = np.r_[0, np.maximum(np.diff(mag, axis=1), 0).mean(axis=0)]
    local = ndimage.median_filter(flux, size=63, mode='nearest')
    excess = np.maximum(flux - local, 0)
    threshold = np.median(excess) + 1.5 * np.mean(excess)
    peaks, _ = signal.find_peaks(excess, height=max(threshold, 1e-6), distance=10,
                                 prominence=max(float(np.mean(excess)) * .5, 1e-7))
    attacks = times[peaks]
    counts, _ = np.histogram(attacks, bins=np.arange(len(levels) + 1))
    power = np.abs(spec) ** 2
    freqs = np.linspace(0, 4000, power.shape[0])
    brightness = (power * freqs[:, None]).sum(axis=0) / np.maximum(power.sum(axis=0), 1e-15)
    ac = signal.correlate(excess, excess, mode='full', method='fft')[len(excess) - 1:]
    lo, hi = round(60 / 180 / .016), round(60 / 60 / .016)
    lag = lo + int(np.argmax(ac[lo:hi + 1]))
    pulse = {'bpm': round(60 / (lag * .016), 1),
             'autocorrelation': round(float(ac[lag] / max(ac[0], 1e-15)), 3),
             'usableBeatGrid': False,
             'note': 'Model-free 60–180BPM autocorrelation candidate; half/double-time and sync not validated.'}
    choices = []
    for role, length, key, reverse in [('rise', 12, 'riseDb', True),
                                      ('steady', 30, 'levelSpreadDb', False),
                                      ('montage', 30, 'attacksPerSecond', True),
                                      ('long-passage', 60, 'levelSpreadDb', False)]:
        candidates = windows(levels, counts, length, duration)
        if candidates:
            selected = sorted(candidates, key=lambda c: (c[key], c['meanRmsDbfs']), reverse=reverse)[0]
            choices.append({'role': role, **selected})
    sections = []
    # Regular 15s measurement blocks deliberately avoid invented verse/chorus labels.
    for start in range(0, int(np.ceil(duration)), 15):
        end = min(start + 15, duration)
        l = levels[start:min(start + 15, len(levels))]
        if not len(l):
            continue
        sel = (times >= start) & (times < end)
        sections.append({'start': start, 'end': round(end, 3),
                         'meanRmsDbfs': round(float(l.mean()), 2),
                         'levelSpreadDb': round(float(l.std()), 2),
                         'attacksPerSecond': round(float(np.sum((attacks >= start) & (attacks < end)) / (end - start)), 3),
                         'powerCentroidHz8k': round(float(np.median(brightness[sel]))) if sel.any() else 0})
    assert all(0 <= w['start'] < w['end'] <= duration for w in choices)
    return {'secondsRmsDbfs': np.round(levels, 2).tolist(),
            'attackTimesSeconds': np.round(attacks, 3).tolist(),
            'attacksPerSecond': round(float(len(attacks) / duration), 3),
            'pulseCandidate': pulse, 'sections': sections, 'auditionWindows': choices}


def main():
    # Small regression checks for the window selector and duration boundary.
    levels = np.r_[np.full(15, -30.), np.linspace(-25, -10, 15), np.full(15, -10.)]
    selected = max(windows(levels, np.zeros(45), 12, 45), key=lambda w: w['riseDb'])
    assert selected['riseDb'] > 8 and selected['end'] <= 45
    assert windows(levels, np.zeros(45), 60, 45) == []
    OUT.mkdir(parents=True, exist_ok=True)
    old = json.loads((OUT / 'catalog.json').read_text(encoding='utf-8')) if (OUT / 'catalog.json').exists() else []
    ids = {t['filename']: t['id'] for t in old}
    next_id = 1 + max([int(t['id'].split('-')[1]) for t in old], default=0)
    tracks = []
    for path in sorted(SOURCE.rglob('*'), key=lambda p: p.name.lower()):
        if path.suffix.lower() not in {'.mp3', '.wav', '.m4a', '.flac', '.ogg'}:
            continue
        filename = path.relative_to(SOURCE).as_posix()
        if filename not in ids:
            ids[filename] = f'MUS-{next_id:02d}'
            next_id += 1
        ident = ids[filename]
        dest = OUT / 'evidence' / ident
        dest.mkdir(parents=True, exist_ok=True)
        sha = hashlib.sha256(path.read_bytes()).hexdigest()
        report_path = dest / 'analysis.json'
        cached = json.loads(report_path.read_text(encoding='utf-8')) if report_path.exists() else None
        if cached and cached.get('sha256') == sha and cached.get('analysisVersion') == VERSION:
            record = cached
            print(f'{ident} cached {path.name}', flush=True)
        else:
            probe = json.loads(run('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', path]))
            x = audio.load(str(path), cache=False)
            measurement = api.measure(x, light=True)
            timeline = structure(x)
            del x
            run('ffmpeg', ['-v', 'error', '-nostdin', '-y', '-i', path, '-lavfi',
                          'showwavespic=s=1200x220:split_channels=0:colors=0x395CEA:scale=sqrt',
                          '-frames:v', 1, dest / 'waveform.png'])
            run('ffmpeg', ['-v', 'error', '-nostdin', '-y', '-i', path, '-lavfi',
                          'showspectrumpic=s=1200x300:legend=1:scale=log:fscale=log:color=viridis',
                          '-frames:v', 1, dest / 'spectrum.png'])
            stream = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
            record = {'id': ident, 'title': path.stem.replace('_', ' '), 'filename': filename,
                      'path': path.relative_to(ROOT).as_posix(), 'sha256': sha,
                      'bytes': path.stat().st_size, 'analysisVersion': VERSION,
                      'duration': measurement['duration'], 'codec': stream['codec_name'],
                      'sampleRate': int(stream['sample_rate']), 'channels': stream['channels'],
                      'embeddedTags': probe['format'].get('tags', {}),
                      'measurement': measurement, 'timeline': timeline,
                      'vocals': 'confirmed vocals; user notes' if path.stem == 'Ivan_Is_Loading' else 'unverified',
                      'licence': 'User-supplied; distribution rights not established',
                      'humanListening': False, 'semanticModelAnalysis': False}
            dump(report_path, record)
            dump(dest / 'probe.json', probe)
            print(f"{ident} {path.name}: {record['duration']:.1f}s, {measurement['lufs']}LUFS, {timeline['attacksPerSecond']}attacks/s", flush=True)
        assert hashlib.sha256(path.read_bytes()).hexdigest() == sha, 'Source changed during analysis'
        tracks.append(record)
    assert len(tracks) == len({t['id'] for t in tracks}) == len({t['sha256'] for t in tracks})
    dump(OUT / 'catalog.json', tracks)
    dump(OUT / 'VALIDATION.json', {'tracks': len(tracks), 'durationSeconds': round(sum(t['duration'] for t in tracks), 3),
                                 'sourceHashesPreserved': True, 'originalNamesPreserved': True,
                                 'completeTrackDecode': True, 'audioCachesCreated': False,
                                 'windowSelectorSelfChecks': 'passed', 'semanticModels': 'unavailable',
                                 'humanListening': False, 'analysisVersion': VERSION})
    print(f'Complete: {len(tracks)} unchanged tracks.', flush=True)


if __name__ == '__main__':
    main()
