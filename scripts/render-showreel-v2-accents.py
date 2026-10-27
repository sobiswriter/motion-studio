"""Render material-specific effect accents from the installed earshot bank; no music."""
import json
from pathlib import Path
from earshot.forge.sfx import sfx_render

root = Path(__file__).resolve().parent.parent / 'src/projects/style-showreel-v2'
out = root / 'assets/audio/effects'
choices = {
    'particle-breath': 'reverse_swell/breath', 'liquid-bubble': 'drip/bubble',
    'holo-shimmer': 'pro_shimmer/m0', 'neon-chirp': 'glitch/chirp',
    'wire-latch': 'shutter/quick', 'glass-touch': 'tap/glass',
    'type-flick': 'swish/flick', 'clay-contact': 'knock/plastic',
    'ascii-data': 'pro_glitch/data', 'mesh-swell': 'reverse_swell/dark',
    'flap-curtain': 'shutter/film', 'tape-burst': 'glitch/burst',
    'shape-swish': 'swish/soft', 'pixel-rise': 'pro_zip/up',
    'aperture-servo': 'pro_riser/roll', 'deco-shimmer': 'shimmer/m3',
    'block-punch': 'cut_hit/punch', 'signature-swell': 'reverse_swell/ring',
}
results = []
for i, (name, sound) in enumerate(choices.items()):
    result = sfx_render(sound, str(out / f'{name}.wav'), seed=261026+i, sr=48000)
    assert Path(result['file']).stat().st_size > 100
    assert result['meta']['peak_db'] <= 0
    results.append({'name':name, **result})
    print(result['summary'])
(root / 'material-accents.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print(f'{len(results)} measured effects rendered; no new music generated.')
