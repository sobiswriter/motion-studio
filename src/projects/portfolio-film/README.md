# Bound by curiosity / Souradip Biswas

Two-minute personal portfolio film: 1920×1080, 60fps, no voiceover. The supplied screen recording is the content; A Pale Blue Stillness is the only score. Six authored transition families are used, with six kinetic handoffs and four kinetic chapter beats: Particles, Liquid Morph, Bauhaus, Comic Book, Neo-Brutalism and Kinetic Typography.

The film moves through the galaxy, mindset, LaunchSILO Labs, AI, research, technical skills, experience, the person and the invitation. The project close-up includes three capabilities already visible in the supplied recording: scope builder, AI assisted estimates, CMS and invoicing. It does not invent project results or metrics.

## Edit and preview

From the repository root:

```powershell
npm.cmd run portfolio:prepare
node scripts/sound-portfolio.mjs
npm.cmd run portfolio:build
npm.cmd run portfolio:check
npm.cmd run portfolio:preview
npm.cmd run portfolio:render
```

Persistent preview: http://localhost:3022/#project/portfolio-film. The final MP4 is out/portfolio-film/Souradip-Biswas-Bound-by-Curiosity.mp4. Earlier reels stay intact.

- sequence.mjs: sixteen contiguous shots, source ranges, crops and fifteen explicit transition windows; exclusive ends total 7,200 frames.
- graphics.mjs: six-second opening, four four-second kinetic chapters and ten-second closing.
- transitions.mjs: six material families and three kinetic variants; endpoints return exactly to the adjacent scene.
- artwork.mjs: overlay/endpoint compositing, capability captions and portfolio invitation.
- project.md / REVIEW.md: brief, reference intent, actual findings and verification.
- music-edit.json / sound-cues.json / CREDITS.md: source timing, one sound-mix path and credits.

FFmpeg prepares the native video plane, with source colours retained and 30fps interaction preserved. Playback never drops below 0.6x; longer case-study shots use an intentional read hold with 60fps reframing. The raw capture is preserved in assets/Portfolio. New Canvas typography and shapes are edited in source; they are not individually editable Studio objects. The native video and audio retain independent Studio media tracks.

For rendered review, reuse the existing evidence helper with this film's scene file:

```powershell
.cache/audio-venv/Scripts/python.exe scripts/review-twenty-worlds.py out/portfolio-film/Souradip-Biswas-Bound-by-Curiosity.mp4 out/portfolio-film/delivery-review src/projects/portfolio-film/edit.json
```

This asserts runtime, frame count, dimensions and audio format, saves all half-second/boundary sheets and compares every decoded frame. Automated sound scores and onset detection do not establish human listening. See REVIEW.md for measured results and CREDITS.md for source and rights records.
