import * as T from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js";

export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const ease = (x) => {
  x = clamp(x);
  return x * x * (3 - 2 * x);
};
export const hash = (n) => {
  const x = Math.sin(n * 127.1 + 31.7) * 43758.5453;
  return x - Math.floor(x);
};
export const outline = [
  [-1.65, -1.3],
  [-1.65, 1.3],
  [-0.98, 1.3],
  [0, -0.08],
  [0.98, 1.3],
  [1.65, 1.3],
  [1.65, -1.3],
  [0.91, -1.3],
  [0.91, -0.05],
  [0, -1.23],
  [-0.91, -0.05],
  [-0.91, -1.3],
];
export function insideM(x, y) {
  let inside = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [a, b] = outline[i],
      [c, d] = outline[j];
    if (b > y !== d > y && x < ((c - a) * (y - b)) / (d - b) + a)
      inside = !inside;
  }
  return inside;
}

let shared;
export function getStage() {
  if (shared) return shared;
  const renderer = new T.WebGLRenderer({
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(1920, 1080);
  renderer.setPixelRatio(1);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.outputColorSpace = T.SRGBColorSpace;
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(37, 1920 / 1080, 0.1, 120);
  const pmrem = new T.PMREMGenerator(renderer),
    room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new T.HemisphereLight("#fff7e7", "#314237", 0.65));
  const key = new T.DirectionalLight("#fff4df", 1.8);
  key.position.set(-4, 6, 7);
  scene.add(key);
  const rim = new T.DirectionalLight("#d7e7ff", 1.2);
  rim.position.set(5, 2, -2);
  scene.add(rim);
  const groups = {};
  const group = (id) => {
    const g = new T.Group();
    groups[id] = g;
    scene.add(g);
    return g;
  };
  const standard = (color, roughness = 0.45, metalness = 0) =>
    new T.MeshStandardMaterial({ color, roughness, metalness });
  const physical = (opts) =>
    new T.MeshPhysicalMaterial({ envMapIntensity: 1.2, ...opts });
  const shape = new T.Shape(outline.map(([x, y]) => new T.Vector2(x, y)));
  const mg = new T.ExtrudeGeometry(shape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelSegments: 7,
    steps: 1,
    bevelSize: 0.16,
    bevelThickness: 0.16,
    curveSegments: 20,
  });
  mg.center();
  const m = (g, mat, scale = 1) => {
    const o = new T.Mesh(mg, mat);
    o.scale.setScalar(scale);
    g.add(o);
    return o;
  };
  const box = (g, x, y, z, w, h, d, mat) => {
    const o = new T.Mesh(new T.BoxGeometry(w, h, d), mat);
    o.position.set(x, y, z);
    g.add(o);
    return o;
  };
  const sphere = (g, x, y, z, r, mat) => {
    const o = new T.Mesh(new T.SphereGeometry(r, 48, 32), mat);
    o.position.set(x, y, z);
    g.add(o);
    return o;
  };
  const chrome = physical({
    color: "#d9e5d6",
    metalness: 1,
    roughness: 0.19,
    clearcoat: 1,
  });
  const gold = physical({ color: "#e3bc71", metalness: 1, roughness: 0.28 });
  const intro = group("intro"),
    im = m(intro, chrome);
  im.rotation.set(0.08, -0.4, -0.11);
  const ring = new T.Mesh(
    new T.TorusGeometry(2.8, 0.025, 12, 128),
    standard("#d7ff3f", 0.4, 0.4),
  );
  intro.add(ring);
  ring.rotation.x = 0.2;
  const outro = group("outro"),
    om = m(outro, chrome, 0.9),
    fragments = [];
  for (let x = -1.5; x < 1.6; x += 0.3)
    for (let y = -1.2; y < 1.3; y += 0.3) {
      if (insideM(x, y)) {
        const o = box(outro, x * 0.9, y * 0.9, 0, 0.29, 0.29, 0.5, chrome);
        fragments.push({ o, x: x * 0.9, y: y * 0.9, seed: fragments.length });
      }
    }
  const holo = group("hologram");
  const hm = new T.Mesh(
    mg,
    physical({
      color: "#bcd7e5",
      metalness: 0.92,
      roughness: 0.17,
      iridescence: 1,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [180, 600],
      clearcoat: 1,
    }),
  );
  holo.add(hm);
  const liquid = group("liquid");
  const lm = new MarchingCubes(
    56,
    physical({
      color: "#f09259",
      metalness: 0.64,
      roughness: 0.14,
      clearcoat: 1,
    }),
    false,
    false,
    24000,
  );
  lm.isolation = 50;
  lm.scale.setScalar(3);
  const liquidPath = [
    [-1.2, -1],
    [-1.2, 1],
    [0, -0.45],
    [1.2, 1],
    [1.2, -1],
  ];
  liquid.add(lm);
  const droplets = Array.from({ length: 5 }, (_, i) =>
    sphere(
      liquid,
      0,
      0,
      0,
      0.12 + i * 0.025,
      physical({
        color: "#ffb489",
        metalness: 0.5,
        roughness: 0.16,
        clearcoat: 1,
      }),
    ),
  );
  const wire = group("wire");
  const wg = new T.EdgesGeometry(mg, 10),
    wl = new T.LineSegments(
      wg,
      new T.LineBasicMaterial({
        color: "#d5f8d8",
        transparent: true,
        opacity: 0.85,
      }),
    );
  wire.add(wl);
  const wireParts = Array.from({ length: 5 }, (_, i) => {
    const b = box(
      wire,
      (i - 2) * 0.75,
      0,
      0,
      0.5,
      2.7,
      0.6,
      new T.MeshBasicMaterial({
        color: "#ed7c47",
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    );
    b.rotation.z = i % 2 ? 0.65 : -0.65;
    return b;
  });
  const neon = group("neon"),
    neonLines = [];
  const path = new T.CatmullRomCurve3(
    outline.map(([x, y]) => new T.Vector3(x, y, 0)),
    true,
    "catmullrom",
    0.07,
  );
  for (const [r, opacity] of [
    [0.035, 1],
    [0.07, 0.15],
    [0.15, 0.035],
  ]) {
    const geo = new T.TubeGeometry(path, 360, r, 8, true);
    const tube = new T.Mesh(
      geo,
      new T.MeshBasicMaterial({
        color: "#b8ff53",
        transparent: opacity < 1,
        opacity,
        blending: opacity < 1 ? T.AdditiveBlending : T.NormalBlending,
        depthWrite: opacity === 1,
      }),
    );
    neon.add(tube);
    neonLines.push(tube);
  }
  const glass = group("glass"),
    glassCards = [];
  const glassMat = physical({
    color: "#e2f4e9",
    metalness: 0,
    roughness: 0.23,
    transmission: 0.96,
    thickness: 0.6,
    ior: 1.45,
    clearcoat: 1,
  });
  for (let i = 0; i < 3; i++) {
    const g = new T.Group();
    glass.add(g);
    box(g, 0, 0, 0, 2.8, 3.5, 0.2, glassMat);
    const edge = new T.LineSegments(
      new T.EdgesGeometry(new T.BoxGeometry(2.8, 3.5, 0.22)),
      new T.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.7,
      }),
    );
    g.add(edge);
    const mark = m(
      g,
      standard(i === 1 ? "#d7ff3f" : "#315d49", 0.3, 0.25),
      0.42,
    );
    mark.position.set(0, 0.1, 0.2);
    glassCards.push(g);
  }
  const glassBall = sphere(glass, 1, -0.3, -2, 1.9, standard("#ae391b", 0.32));
  const iso = group("iso"),
    tiles = [],
    buildings = [];
  const greens = [
    standard("#2f6c53"),
    standard("#80a888"),
    standard("#d2c5a2"),
    standard("#cf5a24"),
  ];
  for (let x = -3; x <= 3; x++)
    for (let z = -2; z <= 2; z++) {
      const tile = box(
        iso,
        x * 1.05,
        -0.8,
        z * 1.05,
        1,
        0.17,
        1,
        greens[x === 0 || z === 0 ? 0 : 1],
      );
      tiles.push(tile);
      if ((x + z + 9) % 3 === 0 && !(x === 0 && z === 0)) {
        const h = 0.6 + hash(x * 19 + z * 3) * 1.9;
        const b = box(
          iso,
          x * 1.05,
          h / 2 - 0.7,
          z * 1.05,
          0.6,
          h,
          0.62,
          greens[(Math.abs(x) * 5 + Math.abs(z) * 3) % 3],
        );
        buildings.push(b);
        box(iso, x * 1.05, h - 0.65, z * 1.05, 0.7, 0.1, 0.7, greens[2]);
        for (let j = 0; j < 3; j++)
          box(
            iso,
            x * 1.05 - 0.315,
            -0.35 + j * 0.42,
            z * 1.05,
            0.02,
            0.12,
            0.38,
            greens[2],
          );
      }
    }
  const isoHero = sphere(
    iso,
    0,
    -0.2,
    0,
    0.25,
    physical({ color: "#ff9b4e", metalness: 0.3, roughness: 0.2 }),
  );
  const tower = m(iso, greens[0], 0.35);
  tower.position.set(0, 0.2, 0);
  tower.rotation.y = -0.4;
  const bump = document.createElement("canvas");
  bump.width = 256;
  bump.height = 256;
  const bc = bump.getContext("2d"),
    bd = bc.createImageData(256, 256);
  for (let i = 0; i < 256 * 256; i++) {
    const v = 120 + Math.floor(hash(i) * 22);
    bd.data.set([v, v, v, 255], i * 4);
  }
  bc.putImageData(bd, 0, 0);
  const clay = group("clay"),
    clayMat = physical({
      color: "#ad4e44",
      roughness: 0.88,
      metalness: 0,
      bumpMap: new T.CanvasTexture(bump),
      bumpScale: 0.045,
    });
  const cm = m(clay, clayMat, 1);
  cm.position.y = 0.15;
  cm.geometry = new T.ExtrudeGeometry(shape, {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 10,
    steps: 1,
    bevelSize: 0.22,
    bevelThickness: 0.22,
  });
  cm.geometry.center();
  const clayBalls = Array.from({ length: 5 }, (_, i) =>
    sphere(
      clay,
      (i - 2) * 1.1,
      -1.5,
      -0.5,
      0.22 + hash(i) * 0.25,
      physical({ color: i % 2 ? "#8f6456" : "#e4a079", roughness: 0.9 }),
    ),
  );
  const floorMat = standard("#b99a86", 0.95);
  const floor = new T.Mesh(new T.PlaneGeometry(200, 200), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.8;
  clay.add(floor);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sc = shadowCanvas.getContext("2d"),
    sg = sc.createRadialGradient(128, 128, 10, 128, 128, 125);
  sg.addColorStop(0, "#2a0a0055");
  sg.addColorStop(1, "#2a0a0000");
  sc.fillStyle = sg;
  sc.fillRect(0, 0, 256, 256);
  const shadow = new T.Mesh(
    new T.PlaneGeometry(6, 4),
    new T.MeshBasicMaterial({
      map: new T.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.79;
  clay.add(shadow);
  const ascii = group("ascii");
  const am = m(ascii, standard("#d7ff3f", 0.5, 0.1));
  const half = group("halftone");
  const halfM = m(half, standard("#ffffff", 0.45, 0.1));
  const blueprint = group("blueprint"),
    parts = [];
  const lineMat = new T.LineBasicMaterial({ color: "#d6f5ed" });
  for (let i = 0; i < 7; i++) {
    const geo =
      i % 2 === 0
        ? new T.CylinderGeometry(1.2 - i * 0.08, 1.2 - i * 0.08, 0.18, 48)
        : new T.TorusGeometry(1.2 - i * 0.08, 0.1, 8, 48);
    const o = new T.LineSegments(new T.EdgesGeometry(geo, 10), lineMat);
    if (i % 2 === 0) o.rotation.x = Math.PI / 2;
    blueprint.add(o);
    parts.push(o);
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2,
      points = [
        new T.Vector3(Math.cos(a) * 0.48, Math.sin(a) * 0.48, 1.8),
        new T.Vector3(Math.cos(a + 0.35) * 1.1, Math.sin(a + 0.35) * 1.1, 1.8),
        new T.Vector3(Math.cos(a + 0.7) * 1.1, Math.sin(a + 0.7) * 1.1, 1.8),
      ];
    const blade = new T.LineLoop(
      new T.BufferGeometry().setFromPoints(points),
      lineMat,
    );
    blueprint.add(blade);
    const screw = new T.LineSegments(
      new T.EdgesGeometry(new T.CylinderGeometry(0.08, 0.08, 0.25, 8)),
      lineMat,
    );
    screw.position.set(Math.cos(a) * 1.5, Math.sin(a) * 1.5, -1.8);
    screw.rotation.x = Math.PI / 2;
    blueprint.add(screw);
  }
  const deco = group("deco"),
    dm = m(deco, gold, 0.8);
  const decoRays = [];
  for (let i = 0; i < 27; i++) {
    const a = (i / 26) * Math.PI,
      points = [
        new T.Vector3(Math.cos(a) * 2.1, Math.sin(a) * 2.1 - 0.4, -0.5),
        new T.Vector3(Math.cos(a) * 5, Math.sin(a) * 5 - 0.4, -0.5),
      ];
    const line = new T.Line(
      new T.BufferGeometry().setFromPoints(points),
      new T.LineBasicMaterial({ color: "#a78043" }),
    );
    deco.add(line);
    decoRays.push(line);
  }
  const particleGroup = group("particles"),
    count = 12000,
    positions = new Float32Array(count * 3),
    targets = new Float32Array(count * 3),
    seeds = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let k = i * 7,
      x = 0,
      y = 0;
    do {
      x = (hash(k++) * 2 - 1) * 1.65;
      y = (hash(k++) * 2 - 1) * 1.3;
    } while (!insideM(x, y));
    targets.set([x, y, (hash(i + 129) * 2 - 1) * 0.34], i * 3);
    seeds.set([hash(i + 433), hash(i + 988), hash(i + 1662)], i * 3);
  }
  const pg = new T.BufferGeometry();
  pg.setAttribute("position", new T.BufferAttribute(positions, 3));
  const pp = new T.Points(
    pg,
    new T.PointsMaterial({
      color: "#e2ff61",
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      blending: T.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  particleGroup.add(pp);
  const debug = renderer.getContext().getExtension("WEBGL_debug_renderer_info");
  window.__reelGPU = debug
    ? renderer.getContext().getParameter(debug.UNMASKED_RENDERER_WEBGL)
    : "WebGL2";
  function render(id, t, duration, palette) {
    Object.values(groups).forEach((g) => {
      g.visible = false;
      g.position.set(0, 0, 0);
      g.rotation.set(0, 0, 0);
      g.scale.setScalar(1);
    });
    const g = groups[id];
    if (!g) return null;
    g.visible = true;
    scene.background = new T.Color(palette.bg);
    scene.environmentIntensity = 1;
    camera.fov = 37;
    camera.position.set(0.25 + Math.sin(t * 0.3) * 0.15, 0.1, 8.5);
    camera.lookAt(0, 0, 0);
    const u = clamp(t / duration),
      settle = 1 - Math.exp(-Math.max(0, t) * 5);
    if (id === "intro") {
      camera.position.set(
        0.2,
        0.15,
        4.1 + ease(t / 2) * 5.4 - ease((t - 3.2) / 1) * 6.5,
      );
      camera.lookAt(0, 0, 0);
      im.rotation.set(0.15 + t * 0.05, -0.65 + t * 0.24, -0.12);
      ring.rotation.z = t * 0.25;
      g.position.x = 0.45;
    } else if (id === "outro") {
      camera.position.set(0, 0.1, 8.5 + ease(t / 2.8) * 1.2);
      camera.lookAt(0, 0, 0);
      g.position.set(0, 0.8, 0);
      const land = ease((t - 0.2) / 2.1),
        seal = ease((t - 2.1) / 0.45);
      om.rotation.set(0, Math.sin(t * 0.2) * 0.03, 0);
      om.scale.set(0.9, 0.9, 0.9 * Math.max(0.001, seal));
      om.visible = seal > 0;
      fragments.forEach(({ o, x, y, seed }) => {
        const a = seed * 2.399 + t * 0.7,
          r = 3 + hash(seed) * 4;
        o.position.set(
          x + (1 - land) * Math.cos(a) * r,
          y + (1 - land) * Math.sin(a) * r * 0.65,
          (1 - land) * (hash(seed + 30) * 8 - 4),
        );
        o.rotation.set(
          (1 - land) * seed * 0.3,
          (1 - land) * seed * 0.5,
          (1 - land) * seed * 0.2,
        );
        o.scale.setScalar(1 - seal);
      });
    } else if (id === "particles") {
      const form = ease(t / 0.95) * (1 - ease((t - duration + 0.5) / 0.5));
      for (let i = 0; i < count; i++) {
        const a = seeds[i * 3] * Math.PI * 6 + t * 0.7,
          r = 2 + seeds[i * 3 + 1] * 5;
        positions[i * 3] = targets[i * 3] * form + Math.cos(a) * r * (1 - form);
        positions[i * 3 + 1] =
          targets[i * 3 + 1] * form + Math.sin(a) * r * 0.6 * (1 - form);
        positions[i * 3 + 2] =
          targets[i * 3 + 2] * form + (seeds[i * 3 + 2] * 12 - 6) * (1 - form);
      }
      pg.attributes.position.needsUpdate = true;
      g.rotation.y = -0.35 + t * 0.26;
      camera.position.z = 7.2 - u;
    } else if (id === "liquid") {
      const form = ease((t - 0.05) / 1.05);
      lm.reset();
      for (let part = 0; part < 4; part++)
        for (let j = 0; j < 8; j++) {
          const p = j / 7,
            a = liquidPath[part],
            b = liquidPath[part + 1],
            i = part * 8 + j;
          const tx = 0.5 + (a[0] + (b[0] - a[0]) * p) / 5,
            ty = 0.5 + (a[1] + (b[1] - a[1]) * p) / 5;
          const x =
            (0.5 + Math.cos(i * 2.4 + t) * 0.065) * (1 - form) + tx * form;
          const y =
            (0.5 + Math.sin(i * 2.4 + t) * 0.065) * (1 - form) + ty * form;
          lm.addBall(
            x + 0.007 * Math.sin(i + t * 2),
            y + 0.008 * Math.sin(i * 0.4 + t * 2),
            0.5 + 0.009 * Math.cos(i + t),
            0.12,
            12,
          );
        }
      lm.update();
      lm.rotation.set(0.12, -0.4 + t * 0.2, -0.06);
      camera.position.z = 7.7;
      droplets.forEach((o, i) => {
        const a = i * 1.26 + t * 0.8;
        o.position.set(
          Math.cos(a) * (2.4 + i * 0.1),
          Math.sin(a) * 1.6,
          Math.sin(a) * 0.6,
        );
      });
    } else if (id === "hologram") {
      hm.rotation.set(0.15, -0.65 + t * 0.42, -0.15);
      camera.position.z = 7.3 - u * 0.5;
      scene.environmentRotation.set(0, t * 0.6, 0);
    } else if (id === "wire") {
      g.rotation.set(0.2, -0.55 + t * 0.3, -0.08);
      wl.scale.setScalar(0.88 + 0.12 * settle);
      wireParts.forEach((o, i) => {
        o.position.z = (1 - settle) * (i - 2) * 2.5;
        o.position.x = (i - 2) * 1.22;
        o.position.y = i % 2 ? 0.45 : -0.45;
      });
      camera.position.z = 8.5;
    } else if (id === "neon") {
      g.rotation.set(0.12, -0.25 + t * 0.17, -0.06);
      g.position.x = -1.5;
      neonLines.forEach((o) =>
        o.geometry.setDrawRange(
          0,
          Math.floor((o.geometry.index.count * ease(t / 0.9)) / 3) * 3,
        ),
      );
      camera.position.z = 5.5;
    } else if (id === "glass") {
      glassCards.forEach((o, i) => {
        o.position.set(
          (i - 1) * 2.1,
          (i - 1) * 0.25,
          Math.sin(i * 1.2 + t * 0.2) * 0.4,
        );
        o.rotation.set(
          -0.1,
          (i - 1) * 0.3 - 0.32 + Math.sin(t * 0.3) * 0.1,
          (i - 1) * -0.08,
        );
        o.scale.setScalar(0.65 + 0.35 * ease((t - i * 0.1) / 0.65));
      });
      glassBall.position.x = Math.sin(t * 0.9) * 1.5;
      camera.position.z = 11.8;
    } else if (id === "iso") {
      camera.position.set(9.3 - u, 9.6, 10.5);
      camera.lookAt(0, 0, 0);
      camera.fov = 34;
      g.scale.setScalar(0.94);
      tiles.forEach((o, i) => {
        o.position.y = -0.8 - (1 - ease((t - hash(i) * 0.25) / 0.65)) * 3;
      });
      const a = clamp(t / duration) * Math.PI * 2;
      isoHero.position.set(
        Math.sin(a) * 2.15,
        -0.22 + Math.abs(Math.sin(t * 7)) * 0.15,
        Math.cos(a) * 1.5,
      );
      buildings.forEach(
        (o, i) => (o.scale.y = 0.3 + 0.7 * ease((t - i * 0.035) / 0.6)),
      );
    } else if (id === "clay") {
      const bounce = Math.abs(Math.sin(t * 4.1)) * Math.exp(-t * 0.4),
        squash = Math.exp(-Math.pow((t % 0.78) / 0.1, 2)) * 0.14;
      cm.position.y = -0.05 + bounce * 0.7;
      cm.scale.set(1 + squash, 1 - squash, 1);
      cm.rotation.set(0.08, -0.35 + t * 0.2, -0.03 + Math.sin(t * 4) * 0.04);
      clayBalls.forEach(
        (o, i) => (o.position.y = -1.5 + Math.abs(Math.sin(t * 3 + i)) * 0.35),
      );
      camera.position.set(0.5, 4.3, 9.5);
      camera.lookAt(0, -0.15, 0);
    } else if (id === "ascii") {
      am.rotation.set(0.1, -0.4 + t * 0.45, 0);
      camera.position.z = 7.5;
      scene.background = new T.Color("#000000");
    } else if (id === "halftone") {
      halfM.rotation.set(0.16, -0.55 + t * 0.26, -0.08);
      camera.position.z = 6.9;
      scene.background = new T.Color("#101010");
    } else if (id === "blueprint") {
      g.rotation.set(-0.25, -0.65 + t * 0.2, -0.2);
      parts.forEach((o, i) => {
        o.position.z = (i - 3) * (0.28 + ease(t / 1.1) * 0.58);
        o.rotation.z = t * 0.15 * (i % 2 ? 1 : -1);
      });
      camera.position.set(2.2, 1.4, 7.1);
      camera.lookAt(0, 0, 0);
    } else if (id === "deco") {
      dm.rotation.y = -0.2 + u * 0.35;
      decoRays.forEach((o, i) =>
        o.scale.setScalar(ease((t - i * 0.025) / 0.6)),
      );
      camera.position.z = 10.5;
    }
    if (id !== "hologram")
      scene.environmentRotation.set(0, 0.2 + Math.sin(t * 0.2) * 0.1, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    return renderer.domElement;
  }
  shared = { render, renderer };
  return shared;
}
