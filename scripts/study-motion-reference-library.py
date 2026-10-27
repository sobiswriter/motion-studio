"""Index every native video frame and build a chronological private reference atlas."""
import csv
import hashlib
import json
import math
import subprocess
import zlib
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / 'assets/Reference Vid/catalog.json'
OUT = ROOT / 'docs/reference-library/evidence'
TOOLS = Path.home() / 'AppData/Local/Microsoft/WinGet/Links'
FONT = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 22)
SMALL = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 10)


def study(record):
    path = ROOT / record['path']
    assert path.is_file(), path
    assert hashlib.sha256(path.read_bytes()).hexdigest() == record['sha256'], 'Reference changed'
    dest = OUT / record['id']
    sheets = dest / 'all-frames'
    sheets.mkdir(parents=True, exist_ok=True)
    pts_result = subprocess.run([
        str(TOOLS / 'ffprobe.exe'), '-v', 'error', '-select_streams', 'v:0',
        '-show_frames', '-show_entries', 'frame=best_effort_timestamp_time,pkt_duration_time',
        '-of', 'json', str(path),
    ], capture_output=True, text=True, check=True)
    frames = json.loads(pts_result.stdout)['frames']
    assert frames and all('best_effort_timestamp_time' in f for f in frames), 'Missing native PTS'
    pts = [float(f['best_effort_timestamp_time']) for f in frames]
    assert all(b > a for a, b in zip(pts, pts[1:])), 'Non-monotonic native PTS'
    ratio = record['width'] / record['height']
    if ratio < .8:
        width, height, tw, th, cols, rows = 90, 160, 68, 120, 16, 8
    elif ratio < 1.4:
        width, height, tw, th, cols, rows = 160, round(160 / ratio), 120, round(120 / ratio), 16, 10
    else:
        width, height, tw, th, cols, rows = 160, round(160 / ratio), 120, round(120 / ratio), 16, 15
    header, label_height = 44, 13
    page_frames = cols * rows
    sheet_size = (cols * tw, header + rows * (th + label_height))
    metrics, sheet_paths, palette = [], [], np.zeros(512, dtype=np.int64)
    previous = previous_hist = None
    count, duplicates = 0, 0
    vf = f'scale={width}:{height}:flags=area'
    log = dest / 'decode.log'
    with log.open('wb') as errors, (dest / 'frames.csv').open('w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['frame', 'pts_seconds', 'mean_rgb_delta', 'histogram_tv', 'luma', 'edge_energy', 'crc32'])
        proc = subprocess.Popen([
            str(TOOLS / 'ffmpeg.exe'), '-v', 'error', '-i', str(path), '-an',
            '-vf', vf, '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', '-f', 'rawvideo', 'pipe:1',
        ], stdout=subprocess.PIPE, stderr=errors)
        while True:
            data = proc.stdout.read(width * height * 3)
            if not data:
                break
            assert len(data) == width * height * 3, 'Incomplete decoded frame'
            assert count < len(pts), 'Decoder produced extra frames'
            rgb = np.frombuffer(data, dtype=np.uint8).reshape(height, width, 3)
            f = rgb.astype(np.float32)
            delta = float(np.abs(f - previous).mean()) if previous is not None else 0
            gray = f @ np.array([.2126, .7152, .0722], dtype=np.float32)
            edge = float((np.abs(np.diff(gray, axis=0)).mean() + np.abs(np.diff(gray, axis=1)).mean()) / 2)
            bins = (rgb[..., 0] // 32).astype(np.int32) * 64 + (rgb[..., 1] // 32) * 8 + rgb[..., 2] // 32
            hist = np.bincount(bins.ravel(), minlength=512)
            palette += hist
            norm = hist / hist.sum()
            tv = float(np.abs(norm - previous_hist).sum() / 2) if previous_hist is not None else 0
            metrics.append({'frame': count, 't': pts[count], 'delta': round(delta, 4), 'histTV': round(tv, 5), 'score': round(delta + 40 * tv, 4)})
            writer.writerow([count, pts[count], round(delta, 4), round(tv, 5), round(float(gray.mean()), 3), round(edge, 4), f'{zlib.crc32(data):08x}'])
            duplicates += int(previous is not None and delta == 0)
            previous, previous_hist = f, norm
            local = count % page_frames
            if local == 0:
                sheet = Image.new('RGB', sheet_size, '#141414')
                draw = ImageDraw.Draw(sheet)
                draw.text((10, 9), f"{record['id']} / native frames {count} onward / {record['fps']} fps / every decoded frame", font=FONT, fill='white')
            x, y = local % cols * tw, header + local // cols * (th + label_height)
            thumb = Image.fromarray(rgb).resize((tw, th), Image.Resampling.BILINEAR)
            sheet.paste(thumb, (x, y))
            draw.text((x+2, y+th), f'{count} / {pts[count]:.3f}s', font=SMALL, fill='white')
            count += 1
            if local == page_frames - 1 or count == len(pts):
                target = sheets / f'page-{len(sheet_paths)+1:03d}.jpg'
                sheet.save(target, quality=90, subsampling=0)
                sheet_paths.append(target.relative_to(ROOT).as_posix())
        code = proc.wait()
    assert code == 0, log.read_text(errors='replace')
    assert count == len(pts) > 0, (count, len(pts))
    if record.get('declaredFrames'):
        assert count == int(record['declaredFrames']), 'Native frame coverage mismatch'
    candidates = []
    for candidate in sorted(metrics[1:], key=lambda m: -m['score']):
        if all(abs(candidate['t'] - c['t']) >= .35 for c in candidates):
            candidates.append(candidate)
        if len(candidates) >= min(24, max(8, math.ceil(pts[-1] / 1.5))):
            break
    swatches = []
    for index in np.argsort(palette)[-8:][::-1]:
        rgb = [int(index // 64 * 32 + 16), int(index // 8 % 8 * 32 + 16), int(index % 8 * 32 + 16)]
        swatches.append({'approxRgb': rgb, 'fraction': round(float(palette[index] / palette.sum()), 4)})
    summary = {
        'id': record['id'], 'sha256': record['sha256'], 'decodedFrames': count,
        'firstPts': pts[0], 'lastPts': pts[-1], 'nativePtsIndexed': True,
        'fullDecodePassed': True, 'chronologicalSheets': sheet_paths,
        'frameMetrics': (dest / 'frames.csv').relative_to(ROOT).as_posix(),
        'thumbnail': {'width': tw, 'height': th, 'framesPerSheet': page_frames},
        'exactScaledFrameRepeats': duplicates, 'approxPalette': swatches,
        'changePeaksNotConfirmedCuts': sorted(candidates, key=lambda m: m['t']),
        'visualReview': 'pending; thumbnail coverage is not a full-resolution inspection claim',
    }
    (dest / 'study.json').write_text(json.dumps(summary, indent=2), encoding='utf-8')
    print(f"{record['id']}: {count} native frames, {len(sheet_paths)} sheets, {duplicates} repeated scaled frames", flush=True)
    return summary


if __name__ == '__main__':
    records = json.loads(CATALOG.read_text(encoding='utf-8'))['references']
    assert records and len({r['id'] for r in records}) == len(records)
    results = [study(record) for record in records]
    assert all(r['fullDecodePassed'] for r in results)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    (OUT.parent / 'FRAME_COVERAGE.json').write_text(json.dumps({
        'references': len(results), 'decodedFrames': sum(r['decodedFrames'] for r in results),
        'allFrameSheets': sum(len(r['chronologicalSheets']) for r in results), 'studies': results,
    }, indent=2), encoding='utf-8')
