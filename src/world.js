// Map layout and environment: painted terrain, river, forest, lighting.
import * as THREE from 'three';

export const MAP = { W: 200, H: 116, minX: -96, maxX: 96, minZ: -54, maxZ: 54 };
export const LANE_NAMES = ['top', 'mid', 'bot'];
// Paths for team 0 (left -> right). Team 1 mirrors x.
export const LANES = {
  top: [[-72, -12], [-62, -36], [62, -36], [72, -12], [78, 0]],
  mid: [[-66, 0], [78, 0]],
  bot: [[-72, 12], [-62, 36], [62, 36], [72, 12], [78, 0]],
};
export const SPAWN = [{ x: -90, z: 0 }, { x: 90, z: 0 }];
export const CORE = [{ x: -78, z: 0 }, { x: 78, z: 0 }];
// Towers sit beside the road so soldiers march past them. [lane, tier(0 outer,1 inner), x, z]
export const TOWERS = [
  ['top', 0, 24, -40], ['top', 1, 54, -40],
  ['mid', 0, 24, 4.2], ['mid', 1, 52, 4.2],
  ['bot', 0, 24, 40], ['bot', 1, 54, 40],
];
export const CAMPS = [
  { x: -30, z: -18, big: false }, { x: 30, z: -18, big: false },
  { x: -30, z: 18, big: false }, { x: 30, z: 18, big: false },
  { x: 0, z: -19, big: true },
  { x: 0, z: 19, big: true, spirit: true },
];
// Tall grass: units inside are hidden from enemies outside it
export const BUSHES = [];
for (const sx of [-1, 1]) BUSHES.push({ x: 13 * sx, z: -29.5, r: 3.2 }, { x: 40 * sx, z: -29.5, r: 3.2 }, { x: 13 * sx, z: 29.5, r: 3.2 }, { x: 40 * sx, z: 29.5, r: 3.2 }, { x: 12 * sx, z: 7 * sx, r: 3 }, { x: 38 * sx, z: -7 * sx, r: 3 }, { x: 5 * sx, z: -9 * sx, r: 2.8 });
export const GROVES = [];
for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
  GROVES.push({ x: 15 * sx, z: 17 * sz, r: 4.2 }, { x: 47 * sx, z: 19 * sz, r: 4.6 }, { x: 70 * sx, z: 30 * sz, r: 4 });
}

export const riverX = (z) => Math.sin(z * 0.09) * 4;

function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

function distToLanes(x, z) {
  let best = 1e9;
  for (const name of LANE_NAMES) {
    const p = LANES[name];
    for (const mir of [1, -1]) for (let i = 0; i < p.length - 1; i++) {
      const ax = p[i][0] * mir, az = p[i][1], bx = p[i + 1][0] * mir, bz = p[i + 1][1];
      const dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz;
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2));
      best = Math.min(best, Math.hypot(x - ax - dx * t, z - az - dz * t));
    }
  }
  return best;
}

function paintGround() {
  const cw = 2048, ch = Math.round(2048 * MAP.H / MAP.W);
  const c = document.createElement('canvas'); c.width = cw; c.height = ch;
  const g = c.getContext('2d');
  const px = (x) => (x + MAP.W / 2) / MAP.W * cw, pz = (z) => (z + MAP.H / 2) / MAP.H * ch, s = cw / MAP.W;
  const R = rng(7);
  const grd = g.createLinearGradient(0, 0, cw, 0);
  grd.addColorStop(0, '#2c5a4a'); grd.addColorStop(0.5, '#3a6a35'); grd.addColorStop(1, '#5a5a30');
  g.fillStyle = grd; g.fillRect(0, 0, cw, ch);
  // grass mottling
  const greens = ['#24502c', '#3f7a3a', '#2f6432', '#4d8540', '#335c2a', '#5c8a3c'];
  for (let i = 0; i < 9000; i++) {
    g.globalAlpha = 0.05 + R() * 0.1; g.fillStyle = greens[(R() * greens.length) | 0];
    g.beginPath(); g.ellipse(R() * cw, R() * ch, 4 + R() * 30, 3 + R() * 18, R() * 3, 0, 7); g.fill();
  }
  // river bed
  g.globalAlpha = 1; g.lineCap = 'round'; g.lineJoin = 'round';
  const river = (w, col, a) => {
    g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = w * s; g.beginPath();
    for (let z = -MAP.H / 2; z <= MAP.H / 2; z += 2) g.lineTo(px(riverX(z)), pz(z));
    g.stroke();
  };
  river(13, '#6b6a48', 0.7); river(10, '#1d5066', 1); river(6, '#17607a', 0.9);
  // lanes
  const lane = (w, col, a) => {
    g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = w * s;
    for (const name of LANE_NAMES) {
      const p = LANES[name]; g.beginPath();
      g.moveTo(px(-78), pz(0));
      for (const q of [...p].reverse()) g.lineTo(px(-q[0]), pz(q[1]));
      for (const q of p) g.lineTo(px(q[0]), pz(q[1]));
      g.stroke();
    }
  };
  lane(12, '#4a4a30', 0.5); lane(9.5, '#8d774f', 0.95); lane(7, '#a38a5c', 0.7); lane(3, '#b39a6a', 0.35);
  // road speckle
  for (let i = 0; i < 16000; i++) {
    const x = (R() - 0.5) * MAP.W, z = (R() - 0.5) * MAP.H;
    if (distToLanes(x, z) > 4.6) continue;
    g.globalAlpha = 0.12 + R() * 0.2; g.fillStyle = R() > 0.5 ? '#6a583a' : '#c4ad7c';
    g.beginPath(); g.arc(px(x), pz(z), 1 + R() * 3.5, 0, 7); g.fill();
  }
  // bridges where roads cross the river
  g.globalAlpha = 1;
  for (const z of [-36, 0, 36]) {
    g.fillStyle = '#6e5a3c'; g.fillRect(px(riverX(z) - 6.5), pz(z - 5), 13 * s, 10 * s);
    g.strokeStyle = '#4a3a24'; g.lineWidth = 2;
    for (let i = 0; i < 9; i++) { const x = px(riverX(z) - 6.5 + i * 1.6); g.beginPath(); g.moveTo(x, pz(z - 5)); g.lineTo(x, pz(z + 5)); g.stroke(); }
  }
  // camps
  for (const cp of CAMPS) {
    const r = (cp.big ? 9 : 6) * s; const rg = g.createRadialGradient(px(cp.x), pz(cp.z), 0, px(cp.x), pz(cp.z), r);
    rg.addColorStop(0, cp.spirit ? 'rgba(20,80,95,0.85)' : cp.big ? 'rgba(70,40,90,0.85)' : 'rgba(60,50,30,0.8)'); rg.addColorStop(1, 'rgba(40,40,30,0)');
    g.fillStyle = rg; g.beginPath(); g.arc(px(cp.x), pz(cp.z), r, 0, 7); g.fill();
  }
  // bases
  [['#3aa0ff', -1], ['#ff4a4a', 1]].forEach(([col, sx]) => {
    const cx = px(82 * sx), cz = pz(0), r = 19 * s;
    const rg = g.createRadialGradient(cx, cz, 0, cx, cz, r);
    rg.addColorStop(0, '#8c8ea0'); rg.addColorStop(0.75, '#5c5e70'); rg.addColorStop(1, 'rgba(60,62,80,0)');
    g.fillStyle = rg; g.beginPath(); g.arc(cx, cz, r, 0, 7); g.fill();
    g.strokeStyle = 'rgba(30,30,40,0.35)'; g.lineWidth = 2;
    for (let i = 1; i < 6; i++) { g.beginPath(); g.arc(cx, cz, r * i / 6.5, 0, 7); g.stroke(); }
    for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; g.beginPath(); g.moveTo(cx, cz); g.lineTo(cx + Math.cos(a) * r * 0.9, cz + Math.sin(a) * r * 0.9); g.stroke(); }
    g.strokeStyle = col; g.globalAlpha = 0.8; g.lineWidth = 6;
    g.beginPath(); g.arc(px(90 * sx), cz, 8 * s, 0, 7); g.stroke();
    g.globalAlpha = 0.25; g.fillStyle = col; g.fill(); g.globalAlpha = 1;
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return tex;
}

export function buildWorld(scene, quality) {
  const R = rng(1234);
  scene.background = new THREE.Color(0x0a1418);
  scene.fog = new THREE.Fog(0x0e1c22, 55, 135);

  const hemi = new THREE.HemisphereLight(0xcfe4ff, 0x33402a, 1.15); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe6bf, 2.4);
  sun.position.set(-25, 48, 22);
  if (quality === 'high') {
    sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera; sc.left = -46; sc.right = 46; sc.top = 40; sc.bottom = -40; sc.near = 1; sc.far = 140;
    sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04;
  }
  scene.add(sun, sun.target);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(MAP.W, MAP.H), new THREE.MeshStandardMaterial({ map: paintGround(), roughness: 0.95 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  // tiling grain multiplied over the painted map so the ground holds up close to the camera
  const nc = document.createElement('canvas'); nc.width = nc.height = 256; const ng = nc.getContext('2d');
  ng.fillStyle = '#d8d8d8'; ng.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) { const v = 150 + ((R() * 105) | 0); ng.fillStyle = `rgba(${v},${v},${v},0.5)`; const x = R() * 256, y = R() * 256, w = 1 + R() * 3.5; ng.fillRect(x, y, w, w * (0.6 + R())); ng.fillRect(x - 256, y, w, w); ng.fillRect(x, y - 256, w, w); }
  const ntex = new THREE.CanvasTexture(nc); ntex.wrapS = ntex.wrapT = THREE.RepeatWrapping; ntex.repeat.set(MAP.W / 7, MAP.H / 7); ntex.anisotropy = 4;
  const grain = new THREE.Mesh(new THREE.PlaneGeometry(MAP.W, MAP.H), new THREE.MeshBasicMaterial({ map: ntex, blending: THREE.MultiplyBlending, transparent: true, depthWrite: false, toneMapped: false, premultipliedAlpha: true }));
  grain.rotation.x = -Math.PI / 2; grain.position.y = 0.02; grain.renderOrder = 1; scene.add(grain);
  const outer = new THREE.Mesh(new THREE.PlaneGeometry(600, 500), new THREE.MeshStandardMaterial({ color: 0x1c3a26, roughness: 1 }));
  outer.rotation.x = -Math.PI / 2; outer.position.y = -0.05; scene.add(outer);

  // river surface
  const wg = new THREE.PlaneGeometry(9, MAP.H, 4, 60); wg.rotateX(-Math.PI / 2);
  const wp = wg.attributes.position;
  for (let i = 0; i < wp.count; i++) wp.setX(i, wp.getX(i) + riverX(wp.getZ(i)));
  const water = new THREE.Mesh(wg, new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 } }, transparent: true, depthWrite: false,
    vertexShader: 'varying vec2 vU; varying vec3 vP; void main(){vU=uv; vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: `uniform float t; varying vec2 vU; varying vec3 vP;
      void main(){ float e=smoothstep(0.0,0.25,vU.x)*smoothstep(1.0,0.75,vU.x);
        float w=sin(vP.z*1.3+t*2.0+sin(vP.x*1.7+t)*1.5)*0.5+0.5; float w2=sin(vP.z*3.1-t*3.0+vP.x*2.0)*0.5+0.5;
        float spark=pow(w*w2,3.0);
        vec3 c=mix(vec3(0.05,0.32,0.45),vec3(0.2,0.7,0.85),w*0.5)+spark*vec3(0.9,1.0,1.0);
        gl_FragColor=vec4(c,e*0.62); }`,
  }));
  water.position.y = 0.06; scene.add(water);

  // forest: trunks + two foliage tiers, instanced
  const spots = [];
  const blocked = (x, z, pad) => distToLanes(x, z) < 8 + pad || Math.abs(x - riverX(z)) < 7 || Math.hypot(Math.abs(x) - 82, z) < 22;
  for (const gv of GROVES) for (let i = 0; i < 9; i++) {
    const a = R() * 6.283, d = Math.sqrt(R()) * (gv.r - 0.8);
    spots.push([gv.x + Math.cos(a) * d, gv.z + Math.sin(a) * d, 0.55 + R() * 0.4]);
  }
  for (let i = 0; i < 520; i++) {
    const x = (R() - 0.5) * 290, z = (R() - 0.5) * 200;
    if (Math.abs(x) < MAP.maxX + 5 && z > -MAP.maxZ - 4 && z < MAP.maxZ + 9) continue;
    spots.push([x, z, 0.6 + R() * 0.7]);
  }
  const n = spots.length;
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.28, 0.42, 2.4, 6), new THREE.MeshStandardMaterial({ color: 0x4a3220, roughness: 1 }), n);
  const cone = new THREE.ConeGeometry(1.9, 3.6, 7);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
  const f1 = new THREE.InstancedMesh(cone, leafMat, n), f2 = new THREE.InstancedMesh(cone, leafMat, n);
  const d = new THREE.Object3D(), col = new THREE.Color();
  spots.forEach(([x, z, sc], i) => {
    d.position.set(x, 1.2 * sc, z); d.scale.setScalar(sc); d.rotation.set(0, R() * 6, 0); d.updateMatrix(); trunk.setMatrixAt(i, d.matrix);
    d.position.y = 3.6 * sc; d.updateMatrix(); f1.setMatrixAt(i, d.matrix);
    d.position.y = 5.3 * sc; d.scale.setScalar(sc * 0.72); d.updateMatrix(); f2.setMatrixAt(i, d.matrix);
    col.setHSL(0.3 + R() * 0.12, 0.45 + R() * 0.2, 0.2 + R() * 0.12); f1.setColorAt(i, col);
    col.offsetHSL(0, 0, 0.05); f2.setColorAt(i, col);
  });
  for (const im of [trunk, f1, f2]) { im.castShadow = true; im.receiveShadow = true; scene.add(im); }

  // rocks & flowers scattered through the jungle
  const rocks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0x7c8088, roughness: 0.95, flatShading: true }), 150);
  const flowers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.16, 6, 5), new THREE.MeshBasicMaterial({ color: 0xffffff }), 420);
  let ri = 0, fi = 0;
  for (let i = 0; i < 4000 && (ri < 150 || fi < 420); i++) {
    const x = (R() - 0.5) * MAP.W, z = (R() - 0.5) * MAP.H;
    if (blocked(x, z, -3)) continue;
    if (ri < 150 && R() < 0.3) {
      const s = 0.3 + R() * 0.9; d.position.set(x, s * 0.3, z); d.scale.set(s, s * 0.7, s * (0.7 + R() * 0.6)); d.rotation.set(R(), R() * 6, R()); d.updateMatrix(); rocks.setMatrixAt(ri++, d.matrix);
    } else if (fi < 420) {
      d.position.set(x, 0.25, z); d.scale.setScalar(0.6 + R()); d.rotation.set(0, 0, 0); d.updateMatrix(); flowers.setMatrixAt(fi, d.matrix);
      col.setHSL([0.0, 0.14, 0.8, 0.55, 0.95][(R() * 5) | 0], 0.8, 0.68); flowers.setColorAt(fi++, col);
    }
  }
  rocks.count = ri; flowers.count = fi; rocks.castShadow = true; rocks.receiveShadow = true;
  scene.add(rocks, flowers);

  // tall grass blades
  const blades = new THREE.InstancedMesh(new THREE.ConeGeometry(0.13, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }), BUSHES.length * 130);
  let bi = 0;
  for (const b of BUSHES) for (let i = 0; i < 130; i++) {
    const a = R() * 6.283, dd = Math.sqrt(R()) * b.r, sc = 0.6 + R() * 0.6;
    d.position.set(b.x + Math.cos(a) * dd, 0.72 * sc, b.z + Math.sin(a) * dd); d.scale.set(1 + R(), sc, 1 + R()); d.rotation.set((R() - 0.5) * 0.4, R() * 6, (R() - 0.5) * 0.4); d.updateMatrix(); blades.setMatrixAt(bi, d.matrix);
    col.setHSL(0.24 + R() * 0.08, 0.6, 0.3 + R() * 0.14); blades.setColorAt(bi++, col);
  }
  blades.receiveShadow = true; scene.add(blades);

  // fog of war: a low-res light map multiplied over the battlefield
  const fc = document.createElement('canvas'); fc.width = 200; fc.height = 116;
  const fogCtx = fc.getContext('2d'); fogCtx.fillStyle = '#fff'; fogCtx.fillRect(0, 0, 200, 116);
  const fogTex = new THREE.CanvasTexture(fc); fogTex.minFilter = fogTex.magFilter = THREE.LinearFilter; fogTex.generateMipmaps = false;
  const fogMesh = new THREE.Mesh(new THREE.PlaneGeometry(MAP.W, MAP.H), new THREE.MeshBasicMaterial({ map: fogTex, blending: THREE.MultiplyBlending, transparent: true, depthWrite: false, toneMapped: false, premultipliedAlpha: true }));
  fogMesh.rotation.x = -Math.PI / 2; fogMesh.position.y = 0.04; fogMesh.renderOrder = 2; scene.add(fogMesh);

  return { sun, water, fogCtx, fogTex };
}
