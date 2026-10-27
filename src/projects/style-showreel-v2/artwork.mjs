import { getStage, clamp, ease, hash, outline } from "./stage3d.mjs";

const W = 1920,
  H = 1080,
  TAU = Math.PI * 2;
export function createArtwork(canvas, shot, next) {
  const surface = document.createElement("canvas");
  surface.width = W;
  surface.height = H;
  const c = surface.getContext("2d"),
    out = canvas.getContext("2d"),
    stage = getStage();
  const sample = document.createElement("canvas");
  sample.width = 144;
  sample.height = 81;
  const sx = sample.getContext("2d", { willReadFrequently: true });
  const { id, bg, ink, accent } = shot,
    duration = shot.end - shot.start;
  const rect = (x, y, w, h, col, r = 0) => {
    c.fillStyle = col;
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    c.fill();
  };
  const circle = (x, y, r, col) => {
    c.fillStyle = col;
    c.beginPath();
    c.arc(x, y, Math.max(0.01, r), 0, TAU);
    c.fill();
  };
  const line = (pts, col, width = 2, close = false, fill = false) => {
    c.beginPath();
    pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    if (close) c.closePath();
    c.strokeStyle = col;
    c.lineWidth = width;
    if (fill) {
      c.fillStyle = col;
      c.fill();
    } else c.stroke();
  };
  const text = (
    str,
    x,
    y,
    size,
    col = ink,
    font = "Space Grotesk",
    weight = 700,
    align = "left",
    stroke = false,
  ) => {
    c.font = `${weight} ${size}px "${font}"`;
    c.textAlign = align;
    c.textBaseline = "alphabetic";
    c.fillStyle = col;
    c.strokeStyle = col;
    c.lineWidth = 2;
    if (stroke) c.strokeText(str, x, y);
    else c.fillText(str, x, y);
  };
  const monogram = (x, y, scale, col) =>
    line(
      outline.map(([a, b]) => [x + a * scale, y - b * scale]),
      col,
      2,
      true,
      true,
    );
  const crop = (x, y, w, h, fn) => {
    c.save();
    c.beginPath();
    c.rect(x, y, w, h);
    c.clip();
    fn();
    c.restore();
  };
  function printTexture(t, alpha = 0.025) {
    c.save();
    c.globalAlpha = alpha;
    for (let i = 0; i < 1800; i++) {
      const x = hash(i + 311) * W,
        y = hash(i + 719) * H;
      c.fillStyle = i % 2 ? ink : "#ffffff";
      c.fillRect(x, y, 1 + hash(i) * 2, 1);
    }
    c.restore();
  }
  function draftGrid() {
    c.save();
    c.globalAlpha = 0.13;
    for (let x = 0; x < W; x += 48)
      line(
        [
          [x, 0],
          [x, H],
        ],
        ink,
        1,
      );
    for (let y = 0; y < H; y += 48)
      line(
        [
          [0, y],
          [W, y],
        ],
        ink,
        1,
      );
    c.restore();
  }
  function paint(t) {
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalAlpha = 1;
    c.globalCompositeOperation = "source-over";
    rect(0, 0, W, H, bg);
    const bitmap = stage.render(id, t, duration, shot);
    if (bitmap && id !== "ascii" && id !== "halftone")
      c.drawImage(bitmap, 0, 0);
    c.save();
    if (id === "intro") {
      const first = ease((t - 0.75) / 0.5),
        second = ease((t - 2.8) / 0.52);
      c.save();
      c.shadowColor = bg;
      c.shadowBlur = 18;
      c.shadowOffsetY = 4;
      crop(192, 160, 1536, 330, () =>
        text(
          "BEYOND",
          960,
          410 + (1 - first) * 350,
          263,
          ink,
          "Space Grotesk",
          700,
          "center",
        ),
      );
      crop(192, 480, 1536, 300, () =>
        text(
          "THE FRAME.",
          960,
          700 + (1 - second) * 340,
          209,
          ink,
          "Space Grotesk",
          700,
          "center",
        ),
      );
      c.restore();
      line(
        [
          [192, 865],
          [192 + 1536 * ease(t / 1.3), 865],
        ],
        accent,
        3,
      );
      text("MOTION STUDIO", 192, 155, 36, accent, "IBM Plex Mono", 400);
      text(
        "DESIGN IN EVERY DIMENSION",
        192,
        928,
        35,
        ink,
        "IBM Plex Mono",
        400,
      );
      text("20 / 60", 1728, 928, 35, ink, "IBM Plex Mono", 400, "right");
    } else if (id === "particles") {
      text(
        "An idea takes form.",
        960,
        210,
        68,
        ink,
        "EB Garamond",
        500,
        "center",
      );
      for (let i = 0; i < 3; i++) {
        const a = t * 0.6 + i * 2.1;
        line(
          [
            [960 + Math.cos(a) * 510, 540 + Math.sin(a) * 260],
            [960 + Math.cos(a + 0.15) * 570, 540 + Math.sin(a + 0.15) * 290],
          ],
          accent,
          1.5,
        );
      }
    } else if (id === "liquid") {
      text("fluid.", 960, 805, 266, ink, "EB Garamond", 500, "center");
      text("NO FIXED FORM", 960, 216, 36, ink, "IBM Plex Mono", 400, "center");
    } else if (id === "hologram") {
      c.globalAlpha = 0.25;
      for (let y = 175; y < 850; y += 5) rect(300, y, 1320, 1, "#a2d6ff");
      c.globalAlpha = 1;
      text(
        "SPECTRUM",
        960,
        864,
        144,
        ink,
        "Space Grotesk",
        700,
        "center",
        true,
      );
      line(
        [
          [300, 265],
          [460, 265],
          [520, 325],
        ],
        accent,
        2,
      );
      text("λ / 380—700", 300, 240, 32, ink, "IBM Plex Mono", 400);
    } else if (id === "neon") {
      for (let i = 0; i < 9; i++) {
        c.globalAlpha = 0.07;
        line(
          [
            [200 + i * 190, 120],
            [200 + i * 190, 960],
          ],
          accent,
          1,
        );
      }
      c.globalAlpha = 1;
      const flicker = Math.floor(t * 14) % 13 === 2 ? 0.65 : 1;
      c.globalAlpha = flicker;
      text("AFTER", 1460, 480, 126, ink, "Space Grotesk", 700, "center");
      text("HOURS", 1460, 610, 126, ink, "Space Grotesk", 700, "center");
      c.globalAlpha = 1;
      text(
        "FOLLOW THE CURRENT",
        1450,
        720,
        30,
        accent,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "wire") {
      draftGrid();
      line(
        [
          [1250, 400],
          [1470, 300],
          [1670, 300],
        ],
        accent,
        2,
      );
      text("FORM / 001", 1460, 275, 32, ink, "IBM Plex Mono", 400);
      line(
        [
          [650, 710],
          [480, 810],
          [245, 810],
        ],
        accent,
        2,
      );
      text("3 AXES. NO LIMIT.", 245, 860, 35, ink, "IBM Plex Mono", 400);
      text(
        "STRUCTURE",
        960,
        220,
        115,
        ink,
        "Space Grotesk",
        700,
        "center",
        true,
      );
    } else if (id === "glass") {
      text(
        "Nothing to hide.",
        960,
        225,
        117,
        ink,
        "EB Garamond",
        500,
        "center",
      );
      text(
        "LIGHT / LAYERS / DEPTH",
        960,
        858,
        38,
        ink,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "kinetic") {
      const beats = [
        ["MAKE", 0.02, 307, 310],
        ["IT", 0.48, 282, 592],
        ["MOVE.", 0.95, 282, 865],
      ];
      beats.forEach(([word, start, size, y], i) => {
        const p = 1 - Math.pow(1 - clamp((t - start) / 0.38), 4);
        c.save();
        c.translate(960 + (1 - p) * (i % 2 ? -1550 : 1550), y);
        c.rotate((1 - p) * (i % 2 ? 0.16 : -0.16));
        if (i === 1) rect(-230, -215, 460, 265, ink);
        text(
          word,
          0,
          0,
          size,
          i === 1 ? accent : ink,
          "Space Grotesk",
          700,
          "center",
        );
        c.restore();
      });
      rect(192, 506, 210 * ease((t - 0.5) / 0.2), 18, ink);
      rect(1518, 540, 210 * ease((t - 0.5) / 0.2), 18, ink);
    } else if (id === "iso") {
      text(
        "A world in motion.",
        960,
        218,
        99,
        ink,
        "EB Garamond",
        500,
        "center",
      );
      text(
        "SMALL SCALE. BIG POSSIBILITIES.",
        960,
        860,
        34,
        ink,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "clay") {
      text("a softer side.", 960, 216, 120, ink, "EB Garamond", 500, "center");
      printTexture(t, 0.035);
      text("PRESS / PLAY", 960, 860, 39, ink, "IBM Plex Mono", 400, "center");
    } else if (id === "ascii") {
      sx.drawImage(bitmap, 0, 0, 144, 81);
      const data = sx.getImageData(0, 0, 144, 81).data,
        chars = " .·:+*oO#@";
      c.font = '17px "IBM Plex Mono"';
      c.textAlign = "center";
      c.textBaseline = "middle";
      for (let y = 8; y < 71; y++)
        for (let x = 10; x < 134; x++) {
          const p = (y * 144 + x) * 4,
            l = (data[p] + data[p + 1] + data[p + 2]) / 765;
          const ch = chars[Math.min(9, Math.floor(l * 10))];
          if (x > 144 * ease(t / 0.65)) continue;
          if (ch === " ") continue;
          c.fillStyle = hash(x + y * 144) > 0.94 ? accent : ink;
          c.fillText(ch, x * 12.4 + 73, y * 10.3 + 121);
        }
      text(
        "> compile imagination_",
        960,
        230,
        50,
        accent,
        "IBM Plex Mono",
        400,
        "center",
      );
      text(
        "CREATIVE CODE / NO LIMITS",
        960,
        855,
        38,
        ink,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "mesh") {
      const grad = c.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#eff1cb");
      grad.addColorStop(0.48, "#b8d7bd");
      grad.addColorStop(1, "#e99d7b");
      rect(0, 0, W, H, grad);
      c.save();
      c.filter = "blur(110px)";
      const cols = ["#e69269", "#b3cbc0", "#f2dbc4", "#769b86"];
      for (let i = 0; i < 6; i++) {
        c.save();
        c.translate(
          960 + Math.cos(t * 0.25 + i * 1.9) * 720,
          540 + Math.sin(t * 0.35 + i * 2.2) * 500,
        );
        c.rotate(i + t * 0.15);
        c.scale(1.4, 0.7);
        circle(0, 0, 410, cols[i % 4]);
        c.restore();
      }
      c.restore();
      printTexture(t, 0.055);
      text("Make them", 960, 453, 226, ink, "EB Garamond", 500, "center");
      text("feel something.", 960, 668, 226, ink, "EB Garamond", 500, "center");
      text(
        "MORE THAN A MOVING PICTURE.",
        960,
        816,
        34,
        ink,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "comic") {
      const x = 840 + ease(t / 0.8) * 60;
      rect(180, 157, 510, 657, ink);
      rect(196, 173, 478, 625, "#ec5c34");
      crop(196, 173, 478, 625, () => {
        for (let i = 0; i < 90; i++) {
          const a = i * 0.08 + t * 0.06;
          line(
            [
              [435, 500],
              [435 + Math.cos(a) * 900, 500 + Math.sin(a) * 900],
            ],
            ink,
            2,
          );
        }
        monogram(435, 490, 100, "#f5cc46");
      });
      rect(718, 157, 1010, 657, ink);
      rect(734, 173, 978, 625, bg);
      crop(734, 173, 978, 625, () => {
        for (let a = 0; a < 50; a++) {
          const ang = (a / 50) * TAU + t * 0.025;
          line(
            [
              [1250, 500],
              [1250 + Math.cos(ang) * 1400, 500 + Math.sin(ang) * 900],
            ],
            accent,
            a % 2 ? 3 : 12,
          );
        }
        for (let y = 184; y < 800; y += 18)
          for (let xx = 750; xx < 1710; xx += 18) circle(xx, y, 2.2, ink);
      });
      const burst = Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * TAU,
          r = i % 2 ? 235 : 315;
        return [1250 + Math.cos(a) * r, 500 + Math.sin(a) * r * 0.7];
      });
      line(burst, ink, 11, true, true);
      c.save();
      c.translate(x + 325, 540);
      c.rotate(-0.09);
      text("POW!", 0, 0, 220, bg, "Space Grotesk", 700, "center");
      c.restore();
      text("A LITTLE MORE IMPACT.", 192, 905, 55, ink, "Space Grotesk", 700);
      printTexture(t, 0.04);
    } else if (id === "flap") {
      rect(170, 170, 1580, 675, "#15241c", 22);
      rect(190, 190, 1540, 635, "#263329", 15);
      const rows = ["MAKE IT ", "MATTER. "];
      for (let row = 0; row < 2; row++)
        for (let col = 0; col < 8; col++) {
          const x = 230 + col * 183,
            y = 240 + row * 264,
            phase = clamp((t - col * 0.025 - row * 0.06) / 0.55),
            cycling = phase < 1;
          const char = cycling
            ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
                Math.floor(phase * 25 + col * 3 + row * 7) % 36
              ]
            : rows[row][col];
          rect(x + 3, y + 8, 165, 234, "#0c1510", 8);
          rect(x, y, 165, 230, "#39473a", 8);
          crop(x, y, 165, 114, () =>
            text(
              char,
              x + 82,
              y + 178,
              166,
              "#f1e8cc",
              "IBM Plex Mono",
              400,
              "center",
            ),
          );
          crop(x, y + 117, 165, 114, () =>
            text(
              char,
              x + 82,
              y + 178,
              166,
              "#d8dbc5",
              "IBM Plex Mono",
              400,
              "center",
            ),
          );
          const flip = cycling ? Math.abs(Math.cos(phase * 25 * Math.PI)) : 1;
          if (cycling) {
            c.save();
            c.translate(x, y + 115);
            c.scale(1, flip);
            rect(0, -115, 165, 115, "#4b5949", 6);
            crop(0, -115, 165, 115, () =>
              text(
                char,
                82,
                63,
                166,
                "#e3dfc7",
                "IBM Plex Mono",
                400,
                "center",
              ),
            );
            c.restore();
          }
          rect(x, y + 114, 165, 3, "#111a12");
          circle(x + 7, y + 115, 4, "#bac5a1");
          circle(x + 157, y + 115, 4, "#bac5a1");
        }
      text(
        "EVERY DETAIL COUNTS.",
        960,
        920,
        45,
        ink,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "vhs") {
      const grad = c.createLinearGradient(0, 250, 0, 750);
      grad.addColorStop(0, "#f7eddd");
      grad.addColorStop(0.3, "#a0a6ac");
      grad.addColorStop(0.48, "#fff9ed");
      grad.addColorStop(0.5, "#484452");
      grad.addColorStop(0.75, "#a68d8c");
      grad.addColorStop(1, "#fae7d3");
      c.save();
      c.translate(960, 530);
      c.transform(1, 0, -0.12, 1, 0, 0);
      text("ALL", -8, -70, 250, "#d75e6c", "Space Grotesk", 700, "center");
      text("SIGNAL.", 10, 190, 250, "#71a39b", "Space Grotesk", 700, "center");
      text("ALL", 0, -78, 250, grad, "Space Grotesk", 700, "center");
      text("SIGNAL.", 0, 182, 250, grad, "Space Grotesk", 700, "center");
      c.restore();
      c.save();
      c.globalAlpha = 0.2;
      for (let i = 0; i < 15; i++)
        line(
          [
            [960, 710],
            [i * 160 - 160, 1080],
          ],
          accent,
          2,
        );
      for (let i = 0; i < 8; i++) {
        const y = 720 + ((i * 45 + Math.floor(t * 30) * 2) % 360);
        line(
          [
            [0, y],
            [W, y],
          ],
          accent,
          2,
        );
      }
      c.restore();
      for (let y = 0; y < H; y += 4) {
        c.globalAlpha = 0.16;
        rect(0, y, W, 1, "#000000");
      }
      c.globalAlpha = 1;
      const band = 280 + Math.sin(Math.floor(t * 30) * 0.71) * 300;
      crop(0, band, W, 24, () => {
        c.drawImage(surface, 25, 0);
      });
      text("PLAY ▷", 220, 220, 39, ink, "IBM Plex Mono", 400);
      text(
        "REC  00:00:0" + Math.floor(t),
        1690,
        880,
        35,
        ink,
        "IBM Plex Mono",
        400,
        "right",
      );
      printTexture(t, 0.1);
    } else if (id === "halftone") {
      sx.drawImage(bitmap, 0, 0, 144, 81);
      const data = sx.getImageData(0, 0, 144, 81).data;
      crop(850, 170, 850, 680, () => {
        for (let y = 0; y < 81; y++)
          for (let x = 0; x < 144; x++) {
            const p = (y * 144 + x) * 4,
              l = (data[p] + data[p + 1] + data[p + 2]) / 765;
            const xx = 1290 + (x - 72) * 12,
              yy = 510 + (y - 40) * 12;
            circle(xx + 3, yy + 3, Math.sqrt(l) * 4.8, accent);
            circle(xx, yy, Math.sqrt(l) * 4.6, ink);
          }
      });
      text("Make", 192, 370, 183, ink, "EB Garamond", 500);
      text("your", 192, 550, 183, ink, "EB Garamond", 500);
      text("mark.", 192, 730, 183, ink, "EB Garamond", 500);
      line(
        [
          [192, 850],
          [1728, 850],
        ],
        ink,
        3,
      );
      text("INK. PAPER. POSSIBILITY.", 192, 915, 37, ink, "IBM Plex Mono", 400);
      printTexture(t, 0.06);
    } else if (id === "bauhaus") {
      const colors = [accent, "#e9bb36", "#274d69", ink];
      for (let y = 0; y < 3; y++)
        for (let x = 0; x < 5; x++) {
          const n = y * 5 + x,
            p = ease((t - n * 0.035) / 0.55),
            cx = 390 + x * 280,
            cy = 295 + y * 235;
          c.save();
          c.translate(cx, cy + (1 - p) * 320);
          c.rotate(
            (1 - p) * Math.PI * 0.8 + (x === 2 ? Math.sin(t * 0.5) * 0.07 : 0),
          );
          c.scale(p, p);
          if (n % 4 === 0) circle(0, 0, 104, colors[n % 4]);
          else if (n % 4 === 1) {
            rect(-104, -104, 208, 208, colors[n % 4]);
            circle(0, 0, 59, bg);
          } else if (n % 4 === 2)
            line(
              [
                [-110, 103],
                [110, 103],
                [0, -104],
              ],
              colors[n % 4],
              2,
              true,
              true,
            );
          else {
            rect(-104, -104, 208, 208, colors[n % 4]);
            circle(0, 0, 104, bg);
          }
          c.restore();
        }
      text(
        "FORM FOLLOWS RHYTHM.",
        960,
        940,
        57,
        ink,
        "Space Grotesk",
        700,
        "center",
      );
      printTexture(t, 0.03);
    } else if (id === "pixel") {
      const unit = 8,
        scroll = Math.floor((t * 85) / unit) * unit;
      for (let layer = 0; layer < 3; layer++)
        for (let i = -1; i < 13; i++) {
          const x = i * 176 - ((scroll * (layer + 1) * 0.3) % 176),
            h = 80 + Math.floor(hash(i + layer * 41) * 12) * 16;
          rect(
            x,
            680 - h + layer * 45,
            152,
            h,
            ["#203d31", "#2d4d39", "#3d6548"][layer],
          );
          for (let j = 0; j < 3; j++)
            rect(x + 24 + j * 40, 720 - h + layer * 45, 16, 16, "#b0cc79");
        }
      for (let x = 0; x < W; x += 32) {
        rect(x, 784, 32, 16, "#c4d887");
        rect(x, 800, 30, 128, "#577149");
        rect(x, 818, 32, 6, bg);
      }
      const player = [
        "00011000011000",
        "00111100111100",
        "01111111111110",
        "11111111111111",
        "11100111100111",
        "11100111100111",
        "11111111111111",
        "01111111111110",
        "00111111111100",
        "00111000011100",
        "00111000011100",
        "01110000001110",
      ];
      const jump = Math.max(0, Math.sin(t * 3.5)) ** 0.8 * 145,
        px = 470 + t * 185,
        py = 778 - jump - player.length * 21;
      player.forEach((row, y) =>
        [...row].forEach((v, x) => {
          if (v === "1")
            rect(
              Math.floor(px / 8) * 8 + x * 21,
              Math.floor(py / 8) * 8 + y * 21,
              21,
              21,
              accent,
            );
        }),
      );
      for (let i = 0; i < 4; i++) {
        const x = 950 + i * 170 - scroll * 0.25,
          y = 520 + Math.sin(i) * 70;
        const collected = px + 260 > x - 10;
        if (!collected) {
          rect(x, y, 32, 48, "#e6ef97");
          rect(x + 8, y - 8, 16, 64, accent);
        } else {
          text("+100", x, y - 30, 32, accent, "IBM Plex Mono", 400);
        }
      }
      text("LEVEL UP", 960, 270, 156, ink, "IBM Plex Mono", 700, "center");
      text(
        "CREATIVITY × INFINITY",
        960,
        390,
        40,
        accent,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "blueprint") {
      draftGrid();
      line(
        [
          [480, 345],
          [300, 260],
          [220, 260],
        ],
        ink,
        2,
      );
      text("APERTURE / EXPLODED", 220, 224, 33, ink, "IBM Plex Mono", 400);
      line(
        [
          [1370, 650],
          [1490, 760],
          [1700, 760],
        ],
        ink,
        2,
      );
      text("7 LAYERS / ONE VISION", 1260, 819, 31, ink, "IBM Plex Mono", 400);
      line(
        [
          [580, 875],
          [1350, 875],
        ],
        accent,
        2,
      );
      line(
        [
          [580, 855],
          [580, 895],
        ],
        accent,
        2,
      );
      line(
        [
          [1350, 855],
          [1350, 895],
        ],
        accent,
        2,
      );
      text(
        "PRECISION, IN PERSPECTIVE.",
        960,
        940,
        43,
        ink,
        "Space Grotesk",
        700,
        "center",
      );
    } else if (id === "deco") {
      for (let k = 0; k < 3; k++) {
        const x = 210 + k * 22,
          y = 175 + k * 20,
          w = 1500 - k * 44,
          h = 670 - k * 40,
          p = ease((t - k * 0.13) / 0.7);
        line(
          [
            [x, y + h],
            [x, y],
            [x + w * p, y],
          ],
          accent,
          2,
        );
        line(
          [
            [x + w, y],
            [x + w, y + h],
            [x + w * (1 - p), y + h],
          ],
          accent,
          2,
        );
      }
      rect(405, 683, 1110, 123, bg);
      text("BEYOND ORDINARY", 960, 774, 99, ink, "EB Garamond", 500, "center");
      text(
        "A SIGNATURE WORTH REMEMBERING",
        960,
        910,
        33,
        ink,
        "IBM Plex Mono",
        400,
        "center",
      );
    } else if (id === "brutal") {
      const items = [
        ["BOLD", 270, 245, -0.035],
        ["BY", 540, 225, 0.025],
        ["DESIGN.", 815, 205, -0.025],
      ];
      items.forEach(([word, y, size, angle], i) => {
        const p = 1 - Math.exp(-clamp(t - i * 0.33) * 11),
          x = 960 + (1 - p) * (i % 2 ? -1850 : 1850);
        c.save();
        c.translate(x, y);
        c.rotate(angle);
        rect(-700 + 15, -size + 35, 1400, size + 35, ink);
        rect(-700, -size + 20, 1400, size + 35, i === 1 ? ink : accent);
        c.strokeStyle = ink;
        c.lineWidth = 8;
        c.strokeRect(-700, -size + 20, 1400, size + 35);
        text(
          word,
          0,
          15,
          size,
          i === 1 ? accent : ink,
          "Space Grotesk",
          700,
          "center",
        );
        c.restore();
      });
    } else if (id === "outro") {
      const p = ease((t - 2.25) / 0.65);
      crop(192, 600, 1536, 165, () =>
        text(
          "MOTION STUDIO",
          960,
          735 + (1 - p) * 180,
          135,
          ink,
          "Space Grotesk",
          700,
          "center",
        ),
      );
      crop(192, 765, 1536, 82 * ease((t - 2.7) / 0.4), () =>
        text(
          "Ideas, given motion.",
          960,
          830,
          61,
          ink,
          "EB Garamond",
          500,
          "center",
        ),
      );
      line(
        [
          [740, 890],
          [740 + 440 * ease((t - 3) / 0.6), 890],
        ],
        accent,
        3,
      );
      crop(192, 905, 1536, 60 * ease((t - 3.1) / 0.4), () =>
        text(
          "DESIGN  /  ANIMATION  /  DIRECTION",
          960,
          950,
          32,
          accent,
          "IBM Plex Mono",
          400,
          "center",
        ),
      );
      const threads = clamp(1 - t / 1.25);
      if (threads > 0)
        for (let i = 0; i < 20; i++) {
          const a = (i / 20) * TAU + t * 0.8;
          circle(
            960 + Math.cos(a) * (200 + threads * 900),
            420 + Math.sin(a) * (100 + threads * 420),
            4 + threads * 6,
            i % 2 ? accent : ink,
          );
        }
    }
    c.restore();
  }
  function incomingMask(p, kind, t) {
    const q = ease(p);
    out.beginPath();
    if (kind === "portal")
      out.arc(
        960,
        540,
        Math.max(0.01, Math.hypot(960, 540) * q * 1.05),
        0,
        TAU,
      );
    else if (kind === "liquid") {
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * TAU,
          r = (1.1 + 0.1 * Math.sin(a * 5 + t * 2)) * 1100 * q;
        const x = 960 + Math.cos(a) * r,
          y = 540 + Math.sin(a) * r;
        if (i) out.lineTo(x, y);
        else out.moveTo(x, y);
      }
      out.closePath();
    } else if (kind === "shutter") {
      for (let i = 0; i < 8; i++) {
        const k = ease(clamp(p * 1.45 - i * 0.055));
        out.rect(0, i * 135, 1920 * k, 136);
      }
    } else out.rect(0, 0, W, H);
    out.clip();
  }
  return function draw(local) {
    const t = local - (shot.index ? 0.3 : 0),
      ip = clamp((t + 0.3) / 0.6),
      ep = clamp((t - duration + 0.3) / 0.6);
    paint(Math.max(0, t));
    out.setTransform(1, 0, 0, 1, 0, 0);
    out.globalAlpha = 1;
    out.clearRect(0, 0, W, H);
    out.save();
    if (shot.index && !["whip", "fold"].includes(shot.transition))
      incomingMask(ip, shot.transition, t);
    let dx = 0,
      angle = 0,
      scale = 1;
    if (shot.index && ["whip", "fold"].includes(shot.transition)) {
      dx = W * (1 - ease(ip));
      angle = shot.transition === "fold" ? (1 - ease(ip)) * 0.08 : 0;
      if (shot.transition === "fold") scale += 0.12 * Math.sin(Math.PI * ip);
    }
    if (next && ["whip", "fold"].includes(next.transition)) {
      dx -= W * ease(ep);
      angle -= next.transition === "fold" ? ease(ep) * 0.08 : 0;
      if (next.transition === "fold") scale += 0.12 * Math.sin(Math.PI * ep);
    }
    if (next?.transition === "portal") scale += 0.32 * ease(ep);
    out.translate(960 + dx, 540);
    out.rotate(angle);
    out.scale(scale, scale);
    if (Math.abs(dx) > 3 && Math.abs(dx) < W - 3) {
      for (const offset of [-30, -15, 15, 30]) {
        out.globalAlpha = 0.07;
        out.drawImage(surface, -960 + offset, -540);
      }
      out.globalAlpha = 1;
    }
    out.drawImage(surface, -960, -540);
    out.restore();
  };
}
