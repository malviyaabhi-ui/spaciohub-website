import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { buildRoom } from './room.js';


// SpacioHub One on a clear glass meeting-room wall — interactive 3D (three.js).
// mountPanel(canvas, opts) builds the scene inside canvas.parentElement and returns controls for the page.
// Ported from the product-render scene; the screen texture is a photo of the real panel UI.
export async function mountPanel(canvas, { screenUrl, zoom = true, reducedMotion = false, onInteract } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 200);

  const loader = new THREE.TextureLoader();
  const load = (u) => new Promise((r) => loader.load(u, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; r(t); }));

  // ---------- helpers ----------
  function rrShape(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
  }
  function rrPath(w, h, r) { const s = rrShape(w, h, r); return new THREE.Path(s.getPoints(48)); }
  function radialTex(stops, size = 512) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const g = c.getContext('2d'), gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    stops.forEach(([o, col]) => gr.addColorStop(o, col)); g.fillStyle = gr; g.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  function rectGlowTex(w, h, blur, color) {
    const c = document.createElement('canvas'); c.width = 1024; c.height = Math.round(1024 * h / w);
    const g = c.getContext('2d'); g.filter = `blur(${blur}px)`; g.fillStyle = color;
    const m = blur * 2.2; g.beginPath(); g.roundRect(m, m, c.width - 2 * m, c.height - 2 * m, 40); g.fill();
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }

  // ---------- dimensions (scene unit = 10 cm) ----------
  const DW = 2.6, DH = 1.71, DD = 0.22, R = 0.13;   // 260 × 171 × 22 mm (1 unit = 10 cm)
  const SW = 2.387, SH = 1.488;
  const GREEN = new THREE.Color('#1fe84e');

  const screenTex = await load(screenUrl);

  // ---------- meeting room behind the glass ----------
  buildRoom(scene).traverse((o) => { if (o.material && 'envMapIntensity' in o.material) o.material.envMapIntensity = 0.18; });

  // ---------- glass wall ----------
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f4f1, metalness: 0, roughness: 0.02, transparent: true, opacity: 0.035,
    envMapIntensity: 0.2, side: THREE.DoubleSide, depthWrite: false,
  });
  const glass = new THREE.Mesh(new THREE.BoxGeometry(14, 30, 0.025), glassMat);
  glass.position.set(0.5, -1, -0.013); scene.add(glass);

  // sheen streaks on the glass
  {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 768; const g = c.getContext('2d');
    const streak = (x, w, a) => { const gr = g.createLinearGradient(x - w, 0, x + w, 0);
      gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.5, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.save(); g.translate(0, 0); g.transform(1, 0, -0.35, 1, 0, 0); g.fillStyle = gr; g.fillRect(x - w, -200, 2 * w, 1300); g.restore(); };
    streak(260, 90, .10); streak(380, 22, .14); streak(820, 140, .07); streak(960, 30, .1);
    const t = new THREE.CanvasTexture(c);
    const sheen = new THREE.Mesh(new THREE.PlaneGeometry(14, 12), new THREE.MeshBasicMaterial({ map: t, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .22 }));
    sheen.position.set(0.5, 0.3, 0.002); scene.add(sheen);
  }
  // frameless glass joints: thin bright edges + slim steel posts
  const edgeMat = new THREE.MeshPhysicalMaterial({ color: 0xbfe6d8, roughness: 0.05, transparent: true, opacity: 0.55, envMapIntensity: 1.5 });
  const postMat = new THREE.MeshStandardMaterial({ color: 0x8c949c, metalness: 0.9, roughness: 0.25 });
  [[-3.9, 0], [4.9, 0], [-13.5, 0]].forEach(([x]) => {
    const e = new THREE.Mesh(new THREE.BoxGeometry(0.035, 30, 0.12), edgeMat); e.position.set(x, -1, -0.02); scene.add(e);
  });
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 30, 0.07), postMat); post.position.set(-3.85, -1, -0.12); scene.add(post);
  // sill & head track
  [-15.05, 13.05].forEach((y) => { const t = new THREE.Mesh(new THREE.BoxGeometry(60, 0.18, 0.3), postMat); t.position.set(0, y, -0.02); scene.add(t); });

  // green light spill on the glass + soft contact shadow
  const spill = new THREE.Mesh(new THREE.PlaneGeometry(DW * 1.75, DH * 1.9),
    new THREE.MeshBasicMaterial({ map: rectGlowTex(DW * 1.5, DH * 1.6, 60, 'rgba(35,230,80,0.15)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  spill.position.set(0, -0.05, 0.004); scene.add(spill);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(DW * 1.35, DH * 1.45),
    new THREE.MeshBasicMaterial({ map: rectGlowTex(DW * 1.2, DH * 1.3, 40, 'rgba(0,0,0,0.28)'), transparent: true, depthWrite: false }));
  shadow.position.set(0.05, -0.08, 0.003); scene.add(shadow);

  // ---------- device ----------
  const device = new THREE.Group(); scene.add(device);
  const body = new THREE.Mesh(
    new THREE.ExtrudeGeometry(rrShape(DW - 0.04, DH - 0.04, R), { depth: DD - 0.06, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 6, curveSegments: 32 }),
    new THREE.MeshPhysicalMaterial({ color: 0x1c1f25, metalness: 0.1, roughness: 0.62, clearcoat: 0.15 }));
  body.position.z = 0.03; device.add(body);

  // speaker perforations on the sides (instanced dots)
  {
    const dot = new THREE.CylinderGeometry(0.012, 0.012, 0.02, 10); dot.rotateZ(Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0x050607 });
    const rows = 4, cols = 34, n = rows * cols * 2; const inst = new THREE.InstancedMesh(dot, mat, n); let k = 0; const m4 = new THREE.Matrix4();
    for (const side of [-1, 1]) for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      m4.makeTranslation(side * (DW / 2 + 0.0), -DH / 2 + 0.22 + i * 0.038, 0.07 + j * 0.045); inst.setMatrixAt(k++, m4);
    }
    device.add(inst);
  }
  // front black glass
  const front = new THREE.Mesh(new THREE.ShapeGeometry(rrShape(DW - 0.07, DH - 0.07, R - 0.03), 32),
    new THREE.MeshPhysicalMaterial({ color: 0x07080a, roughness: 0.05, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.6 }));
  front.position.z = DD + 0.004; device.add(front);
  // screen
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false });
  screenMat.color.setScalar(0.97);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), screenMat);
  screen.position.set(0, 0, DD + 0.006); device.add(screen);
  // glossy reflection over screen
  const refl = new THREE.Mesh(new THREE.ShapeGeometry(rrShape(DW - 0.07, DH - 0.07, R - 0.03), 32),
    new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.02, transparent: true, opacity: 0.10, clearcoat: 1, envMapIntensity: 1.0, depthWrite: false }));
  refl.position.z = DD + 0.008; device.add(refl);
  { // diagonal glass sheen across the cover glass
    const c = document.createElement('canvas'); c.width = 1024; c.height = 672; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 1024, 672);
    gr.addColorStop(0, 'rgba(255,255,255,0.10)'); gr.addColorStop(0.32, 'rgba(255,255,255,0.03)');
    gr.addColorStop(0.33, 'rgba(255,255,255,0.0)'); gr.addColorStop(0.55, 'rgba(255,255,255,0.0)');
    gr.addColorStop(0.56, 'rgba(255,255,255,0.05)'); gr.addColorStop(0.66, 'rgba(255,255,255,0.0)');
    g.fillStyle = gr; g.fillRect(0, 0, 1024, 672);
    const t = new THREE.CanvasTexture(c);
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(DW - 0.08, DH - 0.08), new THREE.MeshBasicMaterial({ map: t, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    sh.position.z = DD + 0.014; device.add(sh);
  }
  // LED status rim (front perimeter, wraps slightly onto the sides)
  const rimShape = rrShape(DW + 0.012, DH + 0.012, R + 0.006); rimShape.holes.push(rrPath(DW - 0.05, DH - 0.05, R - 0.025));
  const rimMat = new THREE.MeshBasicMaterial({ color: GREEN.clone(), toneMapped: false });
  const rim = new THREE.Mesh(new THREE.ExtrudeGeometry(rimShape, { depth: 0.085, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 4, curveSegments: 40 }), rimMat);
  rim.position.z = DD - 0.08; device.add(rim);
  // soft LED halo (controlled glow instead of full-frame bloom)
  function ringGlowTex(col) {
    const c = document.createElement('canvas'), S = 1400; c.width = S; c.height = Math.round(S * (DH + 0.5) / (DW + 0.5));
    const g = c.getContext('2d'), sx = S / (DW + 0.5), pad = 0.25 * sx;
    const draw = (blur, lw, a) => { g.filter = `blur(${blur}px)`; g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = lw; g.beginPath();
      g.roundRect(pad, pad, c.width - 2 * pad, c.height - 2 * pad, R * sx); g.stroke(); };
    draw(30, 30, 0.42); draw(12, 14, 0.5); draw(4, 7, 0.55);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  const rimGlow = new THREE.Mesh(new THREE.PlaneGeometry(DW + 0.5, DH + 0.5),
    new THREE.MeshBasicMaterial({ map: ringGlowTex('#19e04a'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  rimGlow.position.z = DD + 0.012; device.add(rimGlow);
  // power button on right side
  const btn = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.12), new THREE.MeshStandardMaterial({ color: 0x15171b, roughness: .5 }));
  btn.position.set(DW / 2 + 0.005, -DH / 2 + 0.32, 0.16); device.add(btn);

  // lights
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x30343c, 0.6));
  const key = new THREE.DirectionalLight(0xfff1dd, 1.4); key.position.set(4, 6, 8); scene.add(key);
  const greenL = new THREE.PointLight(0x2dff5f, 2.2, 3.5, 2); greenL.position.set(0, 0, 0.2); scene.add(greenL);

  // ---------- post ----------
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bokeh = new BokehPass(scene, camera, { focus: 5, aperture: 0.0024, maxblur: 0.018 });
  composer.addPass(bokeh); composer.addPass(new OutputPass());
  // depth-of-field must see through glass and glow planes: hide transparent meshes during the depth pass
  let _transp = null; const _bokehRender = bokeh.render.bind(bokeh);
  bokeh.render = (...args) => {
    if (!_transp) { _transp = []; scene.traverse((o) => { if (o.isMesh && o.material && o.material.transparent) _transp.push(o); }); }
    const vis = _transp.map((o) => o.visible); _transp.forEach((o) => (o.visible = false));
    _bokehRender(...args); _transp.forEach((o, i) => (o.visible = vis[i]));
  };
  const _fp = new THREE.Vector3();
  const focusOnPanel = () => { camera.updateMatrixWorld(); _fp.set(0, 0, DD).applyMatrix4(camera.matrixWorldInverse); bokeh.uniforms.focus.value = -_fp.z; };

  function resize(w, h) {
    renderer.setSize(w, h, false); composer.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }

  // status colour (interactive only)
  const setStatus = (hex) => { const c = new THREE.Color(hex); rimMat.color.copy(c); rimGlow.material.map = ringGlowTex(hex); rimGlow.material.needsUpdate = true; greenL.color.copy(c);
    spill.material.map = rectGlowTex(DW * 1.5, DH * 1.6, 70, `rgba(${c.r * 255 | 0},${c.g * 255 | 0},${c.b * 255 | 0},0.55)`); spill.material.needsUpdate = true; };

  // camera presets: [position, target, fov]
  const PRESETS = {
    hero: [[-2.7, 0.5, 5.3], [0.45, 0.0, 0], 31],
    heroWide: [[-1.0, 0.3, 6.2], [-1.9, 0.05, 0], 30],
    front: [[0, 0.02, 5.0], [0, 0, 0], 28],
    right: [[2.7, 0.35, 4.3], [-0.15, 0, 0], 30],
    side: [[4.9, 0.3, 3.6], [0.15, 0, 0.15], 30],
  };
  function setCam(name) { const [p, t, f] = PRESETS[name]; camera.position.set(...p); camera.fov = f; camera.updateProjectionMatrix(); camera.lookAt(...t); return t; }

  // video path: smooth orbit from left 3/4 → front → right 3/4 → side, push-in
  const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);
  function videoCam(t) { // t in [0,1]
    const a = THREE.MathUtils.lerp(-0.66, 0.70, ease(t));     // azimuth (rad)
    const r = THREE.MathUtils.lerp(7.2, 5.6, ease(Math.min(1, t * 1.2)));
    const y = 0.55 - 0.3 * Math.sin(Math.PI * t);
    camera.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
    camera.fov = 29; camera.updateProjectionMatrix(); camera.lookAt(0.05, 0, 0);
  }

  const host = canvas.parentElement;
  const fit = () => { const w = host.clientWidth, h = host.clientHeight; if (w && h) resize(w, h); };
  fit();
  const ro = new ResizeObserver(fit); ro.observe(host);
  const target = setCam('hero');
  const controls = new OrbitControls(camera, canvas); controls.target.set(...target);
  controls.enableDamping = true; controls.minDistance = 3; controls.maxDistance = 9; controls.enablePan = false; controls.enableZoom = zoom;
  controls.minAzimuthAngle = -0.78; controls.maxAzimuthAngle = 0.78; controls.minPolarAngle = 1.1; controls.maxPolarAngle = 1.95;
  controls.autoRotate = !reducedMotion; controls.autoRotateSpeed = 0.6;
  let dir = 1; controls.addEventListener('start', () => { controls.autoRotate = false; onInteract?.(); });
  const goPreset = (n) => { const [p, t] = PRESETS[n]; controls.autoRotate = false; const from = camera.position.clone(), to = new THREE.Vector3(...p), ft = controls.target.clone(), tt = new THREE.Vector3(...t); let s = 0;
    const step = () => { s = Math.min(1, s + 0.025); const e = ease(s); camera.position.lerpVectors(from, to, e); controls.target.lerpVectors(ft, tt, e); if (s < 1) requestAnimationFrame(step); }; step(); };
  const setSpin = (on) => { controls.autoRotate = !!on; return controls.autoRotate; };
  let active = true;
  const frame = () => {
    if (!active) return;
    if (controls.autoRotate) { const az = controls.getAzimuthalAngle(); if (az > 0.7) dir = -1; if (az < -0.7) dir = 1; controls.autoRotateSpeed = 0.6 * dir; }
    controls.update(); focusOnPanel(); composer.render();
  };
  renderer.setAnimationLoop(frame);
  return {
    goPreset, setStatus, setSpin,
    setActive: (on) => { active = !!on; renderer.setAnimationLoop(on ? frame : null); },   // pause when scrolled away
    dispose: () => { renderer.setAnimationLoop(null); ro.disconnect(); controls.dispose(); composer.dispose?.(); pmrem.dispose(); renderer.dispose(); },
  };
  }
