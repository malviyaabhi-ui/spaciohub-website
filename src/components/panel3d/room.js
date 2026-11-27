// Procedural meeting room behind the glass wall (1 unit = 10 cm). Glass at z = 0, panel centre at 1.5 m.
import * as THREE from 'three';

const FLOOR = -15, CEIL = 13, BACK = -80, LEFT = -26, RIGHT = 44;

function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

export function buildRoom(scene) {
  const room = new THREE.Group(); scene.add(room); room.position.set(4, 0, -26);
  const R = rng(7);

  // ---- materials
  const woodTex = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#a8743f'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) { g.strokeStyle = `rgba(${90 + R() * 60 | 0},${50 + R() * 30 | 0},${20 + R() * 20 | 0},${0.15 + R() * 0.25})`;
      g.lineWidth = 1 + R() * 3; const y = R() * h; g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(w * .3, y + R() * 20 - 10, w * .7, y + R() * 20 - 10, w, y + R() * 10 - 5); g.stroke(); }
  });
  const wood = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.45, metalness: 0 });
  const slatMat = new THREE.MeshStandardMaterial({ color: 0xc08a55, roughness: 0.6 });
  const floorTex = canvasTex(1024, 1024, (g, w, h) => {
    g.fillStyle = '#8a7f73'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 3000; i++) { g.fillStyle = `rgba(${R() < .5 ? 255 : 60},${R() < .5 ? 250 : 55},${R() < .5 ? 240 : 50},0.04)`; g.fillRect(R() * w, R() * h, 2 + R() * 30, 2 + R() * 30); }
    g.strokeStyle = 'rgba(80,70,60,0.18)'; g.lineWidth = 2; for (let x = 0; x <= w; x += 256) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); g.beginPath(); g.moveTo(0, x); g.lineTo(w, x); g.stroke(); }
  });
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(5, 5);
  const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.25, metalness: 0.0 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xd9cdbb, roughness: 0.9 });
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0xcfc6b8, roughness: 0.95 });
  const lightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.78, 0.45).multiplyScalar(3.0), toneMapped: true });
  const chairMat = new THREE.MeshStandardMaterial({ color: 0xcdbfa9, roughness: 0.45 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcfd3d8, metalness: 1, roughness: 0.18 });
  const blackGloss = new THREE.MeshStandardMaterial({ color: 0x0b0c0e, roughness: 0.12, metalness: 0.2 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3f8a3a, roughness: 0.7, side: THREE.DoubleSide });
  const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x5aa548, roughness: 0.7, side: THREE.DoubleSide });
  const potMat = new THREE.MeshStandardMaterial({ color: 0xd8d2c8, roughness: 0.5 });

  const W = RIGHT - LEFT, D = -BACK, H = CEIL - FLOOR, cx = (LEFT + RIGHT) / 2, cz = BACK / 2;
  // floor / ceiling / walls
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W + 40, D + 30), floorMat); floor.rotation.x = -Math.PI / 2; floor.position.set(cx, FLOOR, cz + 12); room.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W + 40, D + 30), ceilMat); ceil.rotation.x = Math.PI / 2; ceil.position.set(cx, CEIL, cz + 12); room.add(ceil);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat); back.position.set(cx, (FLOOR + CEIL) / 2, BACK); room.add(back);
  const right = new THREE.Mesh(new THREE.PlaneGeometry(D + 30, H), wallMat); right.rotation.y = -Math.PI / 2; right.position.set(RIGHT, (FLOOR + CEIL) / 2, cz + 12); room.add(right);

  // left wall = floor-to-ceiling window with city view
  const city = canvasTex(2048, 1024, (g, w, h) => {
    const sky = g.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#8fc3ec'); sky.addColorStop(0.6, '#d6e9f5'); sky.addColorStop(1, '#f3efe6');
    g.fillStyle = sky; g.fillRect(0, 0, w, h);
    const r = rng(11);
    for (let layer = 0; layer < 3; layer++) {
      const base = [0.55, 0.68, 0.82][layer], col = ['#a9bccd', '#7f96ab', '#5d7187'][layer];
      for (let x = -20; x < w; x += 40 + r() * 90) {
        const bw = 50 + r() * 120, bh = h * (0.18 + r() * (0.55 - layer * 0.12)); const top = h * base - bh + layer * 40;
        g.fillStyle = col; g.fillRect(x, top, bw, h - top);
        g.fillStyle = `rgba(255,255,255,${0.18 + layer * 0.06})`;
        for (let yy = top + 8; yy < h; yy += 14) for (let xx = x + 6; xx < x + bw - 6; xx += 12) if (r() < 0.55) g.fillRect(xx, yy, 6, 7);
      }
    }
  });
  const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(D + 30, H + 4), new THREE.MeshBasicMaterial({ map: city }));
  windowMesh.material.color.setScalar(1.05);
  windowMesh.rotation.y = Math.PI / 2; windowMesh.position.set(LEFT - 0.5, (FLOOR + CEIL) / 2, cz + 12); room.add(windowMesh);
  for (let z = 10; z > BACK; z -= 14) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.6, H, 0.6), new THREE.MeshStandardMaterial({ color: 0x2b2e33, metalness: .6, roughness: .4 })); m.position.set(LEFT, (FLOOR + CEIL) / 2, z); room.add(m); }

  // back wall: vertical oak slats + TV
  const slat = new THREE.BoxGeometry(0.7, H, 0.8); const slats = new THREE.InstancedMesh(slat, slatMat, 60); const m4 = new THREE.Matrix4(); let k = 0;
  for (let x = LEFT + 4; k < 60; x += 1.25) { m4.makeTranslation(x, (FLOOR + CEIL) / 2, BACK + 0.5); slats.setMatrixAt(k++, m4); }
  room.add(slats);
  const tv = new THREE.Mesh(new THREE.BoxGeometry(22, 12.5, 0.6), blackGloss); tv.position.set(22, -0.5, BACK + 0.6); room.add(tv);
  const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(21.2, 11.8), new THREE.MeshBasicMaterial({ map: canvasTex(512, 288, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#0d2b6b'); gr.addColorStop(1, '#0cb8b6'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(40, 110, 200, 14); g.fillRect(40, 140, 140, 10); g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(300, 60, 170, 170);
  }) }));
  tvScreen.material.color.setScalar(0.55); tvScreen.position.set(22, -0.5, BACK + 0.95); room.add(tvScreen);
  // right wall slats band
  const slats2 = new THREE.InstancedMesh(slat, slatMat, 72); k = 0;
  for (let z = 10; k < 72; z -= 1.25) { m4.makeRotationY(Math.PI / 2).setPosition(RIGHT - 0.5, (FLOOR + CEIL) / 2, z); slats2.setMatrixAt(k++, m4); }
  room.add(slats2);

  // ceiling: linear LED strips + ring pendant
  [-12, 2, 16, 30].forEach((x) => { const s = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 58), lightMat); s.position.set(x, CEIL - 0.1, -36); room.add(s); });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(7, 0.35, 12, 96), lightMat); ring.rotation.x = Math.PI / 2; ring.position.set(9, CEIL - 3, -34); room.add(ring);
  [[-12, -12], [30, -12]].forEach(([x, z]) => { const dl = new THREE.Mesh(new THREE.CircleGeometry(0.9, 24), lightMat); dl.rotation.x = Math.PI / 2; dl.position.set(x, CEIL - 0.05, z); room.add(dl); });

  // table
  const tShape = new THREE.Shape(); const TL = 34, TW = 12, tr = 6;
  tShape.absarc(-TL / 2 + tr, 0, tr, Math.PI / 2, 3 * Math.PI / 2); tShape.lineTo(TL / 2 - tr, -tr); tShape.absarc(TL / 2 - tr, 0, tr, -Math.PI / 2, Math.PI / 2); tShape.lineTo(-TL / 2 + tr, tr);
  const top = new THREE.Mesh(new THREE.ExtrudeGeometry(tShape, { depth: 0.5, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, curveSegments: 32 }), wood);
  top.rotation.x = -Math.PI / 2; top.position.set(9, -7.8, -34); room.add(top);
  [[-8], [8]].forEach(([dx]) => { const leg = new THREE.Mesh(new THREE.BoxGeometry(1.2, 7, 6), new THREE.MeshStandardMaterial({ color: 0x2a2a2c, roughness: .4, metalness: .5 })); leg.position.set(9 + dx, -11.5, -34); room.add(leg); });

  // chairs
  function chair(x, z, rotY) {
    const c = new THREE.Group(); c.position.set(x, FLOOR, z); c.rotation.y = rotY;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.9, 4.4), chairMat); seat.position.y = 4.6; c.add(seat);
    const backR = new THREE.Mesh(new THREE.BoxGeometry(4.6, 6.2, 0.7), chairMat); backR.position.set(0, 8.2, 2.1); backR.rotation.x = -0.12; c.add(backR);
    [-2.2, 2.2].forEach((ax) => { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 3.6), chromeMat); arm.position.set(ax, 6.6, 0.3); c.add(arm);
      const ap = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), chromeMat); ap.position.set(ax, 5.6, 1.6); c.add(ap); });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 3.6, 12), chromeMat); stem.position.y = 2.4; c.add(stem);
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const l = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 2.6), chromeMat); l.position.set(Math.sin(a) * 1.3, 0.5, Math.cos(a) * 1.3); l.rotation.y = a; c.add(l); }
    room.add(c);
  }
  for (let i = 0; i < 4; i++) { const x = 9 - 12 + i * 8; chair(x + R() * 0.8, -34 + 9.5, R() * 0.3 - 0.15); chair(x + R() * 0.8, -34 - 9.5, Math.PI + R() * 0.3 - 0.15); }
  chair(9 - 22, -34, Math.PI / 2 * -1 + 0.2); chair(9 + 22, -34, Math.PI / 2);

  // plants
  function plant(x, z, s) {
    const p = new THREE.Group(); p.position.set(x, FLOOR, z); p.scale.setScalar(s);
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 1.7, 4.5, 24), potMat); pot.position.y = 2.25; p.add(pot);
    const leaf = new THREE.SphereGeometry(1, 10, 8); leaf.scale(0.45, 0.08, 1.6);
    for (let i = 0; i < 70; i++) {
      const l = new THREE.Mesh(leaf, R() < .5 ? leafMat : leafMat2); const h = 4.5 + R() * 11, a = R() * Math.PI * 2, rad = 0.4 + R() * (2.2 + h * 0.12);
      l.position.set(Math.cos(a) * rad, h, Math.sin(a) * rad); l.rotation.set(R() * 1.2 - 0.6, a, R() * 1.4 - 0.7); l.scale.setScalar(0.9 + R() * 1.1); p.add(l);
    }
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 10, 6), new THREE.MeshStandardMaterial({ color: 0x5b4a33 })); stem.position.y = 9; p.add(stem);
    room.add(p);
  }
  plant(LEFT + 6, -14, 1.15); plant(RIGHT - 6, -58, 1.0); plant(LEFT + 5, -62, 0.9); plant(RIGHT - 7, -4, 1.2);

  // lights for the room
  scene.add(new THREE.HemisphereLight(0xffdcae, 0x4a3a2a, 0.7));
  const win = new THREE.DirectionalLight(0xeaf4ff, 0.9); win.position.set(-40, 10, -20); win.target.position.set(10, -10, -30); scene.add(win, win.target);
  const warm = new THREE.DirectionalLight(0xffc98a, 0.9); warm.position.set(10, 30, -30); warm.target.position.set(10, -15, -34); scene.add(warm, warm.target);
  return room;
}
