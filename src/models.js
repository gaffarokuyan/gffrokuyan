// Procedural 3D models: heroes, soldiers, towers, cores, monsters.
import * as THREE from 'three';

const G = {
  sphere: new THREE.SphereGeometry(1, 20, 14),
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 14),
  cone: new THREE.ConeGeometry(1, 1, 12),
  cap: new THREE.CapsuleGeometry(1, 1, 6, 12),
  octa: new THREE.OctahedronGeometry(1, 0),
  ico: new THREE.IcosahedronGeometry(1, 0),
  torus: new THREE.TorusGeometry(1, 0.08, 6, 20, Math.PI),
  ring: new THREE.RingGeometry(0.82, 1, 40),
  disc: new THREE.CircleGeometry(1, 32),
};
export const GEO = G;

const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.15, ...o });
export const glowMat = (color, k = 1.6) => {
  const c = new THREE.Color(color).multiplyScalar(k);
  return new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
};

function m(geo, mat, sx, sy, sz, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(sx, sy, sz);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  return mesh;
}
function pivot(x, y, z) { const g = new THREE.Group(); g.position.set(x, y, z); return g; }

export const TEAM_COLOR = [0x3aa0ff, 0xff4a4a, 0xc9a04a];

export function teamRing(team, r) {
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(TEAM_COLOR[team]).multiplyScalar(1.3), transparent: true, opacity: 0.75, depthWrite: false, toneMapped: false });
  const ring = new THREE.Mesh(G.ring, mat);
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; ring.scale.setScalar(r);
  return ring;
}

function makeWeapon(kind, pal) {
  const g = new THREE.Group();
  const steel = std(0xd8e0ea, { metalness: 0.8, roughness: 0.25 });
  const wood = std(0x6b4526);
  const glow = glowMat(pal.fx, 1.8);
  if (kind === 'sword') {
    g.add(m(G.box, steel, 0.13, 1.5, 0.04, 0, -0.95, 0));
    g.add(m(G.box, glow, 0.04, 1.4, 0.05, 0, -0.95, 0));
    g.add(m(G.box, std(pal.accent, { metalness: 0.7 }), 0.5, 0.08, 0.12, 0, -0.2, 0));
  } else if (kind === 'staff' || kind === 'wand') {
    const L = kind === 'staff' ? 2.3 : 1.3;
    g.add(m(G.cyl, wood, 0.05, L, 0.05, 0, 0.2 - L * 0.2, 0));
    const orb = m(kind === 'staff' ? G.ico : G.octa, glow, 0.22, 0.22, 0.22, 0, 0.2 + L * 0.33, 0);
    orb.userData.spin = true; g.add(orb); g.userData.orb = orb;
    g.rotation.x = 0.2;
  } else if (kind === 'bow') {
    const arc = m(G.torus, std(pal.accent, { metalness: 0.5 }), 0.8, 0.8, 1.6, 0, 0, 0);
    arc.rotation.z = -Math.PI / 2; g.add(arc);
    g.add(m(G.box, glow, 0.02, 1.6, 0.02, 0, 0, 0));
    g.position.z = 0.25;
  } else if (kind === 'hammer') {
    g.add(m(G.cyl, wood, 0.07, 1.8, 0.07, 0, -0.7, 0));
    g.add(m(G.box, std(0x8a8a94, { metalness: 0.7, roughness: 0.35 }), 0.75, 0.5, 0.5, 0, -1.6, 0));
    g.add(m(G.box, glow, 0.8, 0.1, 0.55, 0, -1.6, 0));
  } else if (kind === 'daggers') {
    g.add(m(G.cone, steel, 0.07, 0.8, 0.03, 0, -0.55, 0).rotateX(Math.PI));
    g.add(m(G.cone, glow, 0.03, 0.75, 0.04, 0, -0.55, 0).rotateX(Math.PI));
  } else if (kind === 'spear') {
    g.add(m(G.cyl, wood, 0.04, 1.8, 0.04, 0, -0.5, 0));
    g.add(m(G.cone, steel, 0.09, 0.35, 0.09, 0, -1.5, 0).rotateX(Math.PI));
  }
  return g;
}

// A stylised humanoid with jointed limbs. Animated by animateUnit().
export function makeHumanoid(pal, opts = {}) {
  const { weapon = 'sword', role = 'fighter', scale = 1.25, simple = false } = opts;
  const root = new THREE.Group();
  const rig = new THREE.Group(); root.add(rig);
  const main = std(pal.color);
  const dark = std(new THREE.Color(pal.color).multiplyScalar(0.45));
  const acc = std(pal.accent, { metalness: 0.55, roughness: 0.35 });
  const skin = std(0xe9b98c, { roughness: 0.8 });
  const bulk = role === 'tank' ? 1.3 : role === 'mage' || role === 'support' ? 0.9 : role === 'assassin' ? 0.88 : 1;

  const body = pivot(0, 1.05, 0); rig.add(body);
  body.add(m(G.cap, main, 0.42 * bulk, 0.42, 0.32 * bulk, 0, 0.55, 0));
  body.add(m(G.box, acc, 0.62 * bulk, 0.12, 0.5 * bulk, 0, 0.12, 0)); // belt
  const head = pivot(0, 1.32, 0); body.add(head);
  head.add(m(G.sphere, skin, 0.3, 0.32, 0.3));

  const legL = pivot(-0.2 * bulk, 1.05, 0), legR = pivot(0.2 * bulk, 1.05, 0);
  for (const l of [legL, legR]) {
    l.add(m(G.cap, dark, 0.15 * bulk, 0.55, 0.15 * bulk, 0, -0.45, 0));
    l.add(m(G.box, acc, 0.24 * bulk, 0.16, 0.42, 0, -0.97, 0.08));
    rig.add(l);
  }
  const armL = pivot(-0.56 * bulk, 0.98, 0), armR = pivot(0.56 * bulk, 0.98, 0);
  for (const a of [armL, armR]) {
    a.add(m(G.cap, main, 0.13 * bulk, 0.5, 0.13 * bulk, 0, -0.38, 0));
    a.add(m(G.sphere, skin, 0.13, 0.13, 0.13, 0, -0.8, 0));
    body.add(a);
  }
  const wp = makeWeapon(weapon, pal);
  const hand = pivot(0, -0.8, 0); hand.add(wp); armR.add(hand);
  if (weapon === 'bow') { armL.add(hand); }
  if (weapon === 'daggers') { const h2 = pivot(0, -0.8, 0); h2.add(makeWeapon('daggers', pal)); armL.add(h2); }

  if (!simple) {
    // shoulder pads
    body.add(m(G.sphere, acc, 0.24 * bulk, 0.18, 0.24 * bulk, -0.56 * bulk, 1.02, 0));
    body.add(m(G.sphere, acc, 0.24 * bulk, 0.18, 0.24 * bulk, 0.56 * bulk, 1.02, 0));
    // chest gem
    body.add(m(G.octa, glowMat(pal.fx, 1.6), 0.1, 0.13, 0.06, 0, 0.72, 0.31 * bulk));
    // cape
    const capeMat = std(new THREE.Color(pal.color).multiplyScalar(0.7), { side: THREE.DoubleSide, roughness: 0.9 });
    const cape = pivot(0, 1.0, -0.3 * bulk);
    const cm = m(G.box, capeMat, 0.8 * bulk, 1.25, 0.04, 0, -0.62, 0); cape.add(cm);
    cape.rotation.x = 0.18; body.add(cape); root.userData.cape = cape;
    if (role === 'assassin') cape.scale.set(0.7, 0.7, 1);
    // headgear by role
    if (role === 'mage') {
      const hat = m(G.cone, main, 0.42, 0.75, 0.42, 0, 0.5, 0); hat.rotation.z = 0.12; head.add(hat);
      head.add(m(G.cyl, acc, 0.52, 0.05, 0.52, 0, 0.16, 0));
    } else if (role === 'tank') {
      head.add(m(G.sphere, acc, 0.34, 0.3, 0.34, 0, 0.08, 0));
      const h1 = m(G.cone, std(0xf0e6d0), 0.08, 0.4, 0.08, -0.3, 0.34, 0); h1.rotation.z = 0.5; head.add(h1);
      const h2 = m(G.cone, std(0xf0e6d0), 0.08, 0.4, 0.08, 0.3, 0.34, 0); h2.rotation.z = -0.5; head.add(h2);
    } else if (role === 'support') {
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 6, 24), glowMat(pal.fx, 2));
      halo.rotation.x = Math.PI / 2; halo.position.y = 0.52; head.add(halo);
      head.add(m(G.sphere, std(0x5a3a1e), 0.31, 0.3, 0.31, 0, 0.06, -0.05));
    } else if (role === 'assassin') {
      head.add(m(G.sphere, dark, 0.33, 0.33, 0.33, 0, 0.04, -0.04));
      head.add(m(G.box, glowMat(pal.fx, 2), 0.36, 0.05, 0.05, 0, 0.03, 0.27));
    } else if (role === 'marksman') {
      head.add(m(G.sphere, dark, 0.33, 0.3, 0.34, 0, 0.08, -0.05));
      const f = m(G.cone, acc, 0.05, 0.5, 0.02, 0.2, 0.45, -0.1); f.rotation.z = -0.4; head.add(f);
      const q = m(G.cyl, std(0x6b4526), 0.1, 0.7, 0.1, 0.15, 0.7, -0.36); q.rotation.z = 0.4; body.add(q);
    } else {
      head.add(m(G.sphere, acc, 0.33, 0.24, 0.33, 0, 0.14, 0));
      head.add(m(G.box, glowMat(pal.fx, 1.6), 0.05, 0.35, 0.2, 0, 0.38, -0.05));
    }
  } else {
    head.add(m(G.sphere, main, 0.33, 0.26, 0.33, 0, 0.12, 0));
  }
  rig.scale.setScalar(scale);
  root.userData.parts = { rig, body, head, legL, legR, armL, armR, weapon: wp };
  root.userData.anim = { phase: Math.random() * 6, move: 0, atk: 0, cast: 0, dead: 0, bow: weapon === 'bow' };
  root.userData.baseScale = scale;
  return root;
}

export function makeHero(def, pal, team) {
  const g = makeHumanoid(pal, { weapon: def.weapon, role: def.role, scale: 1.3 });
  if (team !== undefined) g.add(teamRing(team, 1.25));
  return g;
}

export function makeMinion(team, ranged) {
  const c = TEAM_COLOR[team];
  const pal = { color: c, accent: team === 0 ? 0xcfe8ff : 0xffd0c0, fx: c };
  return makeHumanoid(pal, { weapon: ranged ? 'wand' : 'spear', role: ranged ? 'mage' : 'fighter', scale: 0.8, simple: true });
}

export function makeTower(team) {
  const g = new THREE.Group();
  const stone = std(0x8d8f9c, { roughness: 0.9 });
  const stone2 = std(0x5e6070, { roughness: 0.9 });
  const tc = TEAM_COLOR[team];
  g.add(m(G.cyl, stone2, 2.2, 0.6, 2.2, 0, 0.3, 0));
  const shaft = m(new THREE.CylinderGeometry(1.0, 1.5, 5, 8), stone, 1, 1, 1, 0, 3.1, 0); g.add(shaft);
  g.add(m(new THREE.CylinderGeometry(1.5, 1.1, 0.7, 8), stone2, 1, 1, 1, 0, 5.9, 0));
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    g.add(m(G.box, stone, 0.45, 0.6, 0.45, Math.cos(a) * 1.3, 6.5, Math.sin(a) * 1.3));
  }
  g.add(m(G.box, std(tc, { metalness: 0.4 }), 0.15, 2.4, 1.1, 0, 3.4, 1.22)); // banner
  const crystal = m(G.octa, glowMat(tc, 2.2), 0.7, 1.2, 0.7, 0, 8.2, 0);
  crystal.castShadow = false; g.add(crystal);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 6, 32), glowMat(tc, 1.6));
  halo.rotation.x = Math.PI / 2; halo.position.y = 8.2; g.add(halo);
  g.userData.crystal = crystal; g.userData.halo = halo;
  return g;
}

export function makeCore(team) {
  const g = new THREE.Group();
  const tc = TEAM_COLOR[team];
  const stone = std(0x6c6e80, { roughness: 0.9 });
  g.add(m(G.cyl, stone, 5, 0.8, 5, 0, 0.4, 0));
  g.add(m(G.cyl, std(0x8d8f9c), 3.6, 0.8, 3.6, 0, 1.2, 0));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const p = m(G.cone, stone, 0.6, 4.5, 0.6, Math.cos(a) * 3.6, 3, Math.sin(a) * 3.6);
    p.rotation.z = Math.cos(a) * 0.25; p.rotation.x = -Math.sin(a) * 0.25; g.add(p);
  }
  const star = m(G.ico, glowMat(tc, 2.4), 1.8, 2.4, 1.8, 0, 5.2, 0); star.castShadow = false; g.add(star);
  const inner = m(G.octa, glowMat(0xffffff, 2), 0.9, 1.3, 0.9, 0, 5.2, 0); inner.castShadow = false; g.add(inner);
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.07, 6, 48), glowMat(tc, 1.6)); r1.position.y = 5.2; g.add(r1);
  const r2 = r1.clone(); r2.rotation.x = Math.PI / 2; g.add(r2);
  g.userData.crystal = star; g.userData.rings = [r1, r2]; g.userData.inner = inner;
  return g;
}

export function makeMonster(big) {
  const g = new THREE.Group();
  const rig = new THREE.Group(); g.add(rig);
  const col = big ? 0x5a3f7a : 0x4f6a3a;
  const hide = std(col, { roughness: 0.95 });
  const bone = std(0xe8e0c8);
  const glow = glowMat(big ? 0xc070ff : 0xb0ff60, 2);
  const body = pivot(0, 1.2, 0); rig.add(body);
  body.add(m(G.sphere, hide, 1.1, 0.95, 1.4));
  const head = pivot(0, 0.5, 1.2); body.add(head);
  head.add(m(G.sphere, hide, 0.6, 0.55, 0.65));
  head.add(m(G.sphere, glow, 0.1, 0.1, 0.1, -0.25, 0.15, 0.5));
  head.add(m(G.sphere, glow, 0.1, 0.1, 0.1, 0.25, 0.15, 0.5));
  const h1 = m(G.cone, bone, 0.14, 0.8, 0.14, -0.4, 0.55, 0.1); h1.rotation.z = 0.6; head.add(h1);
  const h2 = m(G.cone, bone, 0.14, 0.8, 0.14, 0.4, 0.55, 0.1); h2.rotation.z = -0.6; head.add(h2);
  for (let i = 0; i < 5; i++) { const s = m(G.cone, big ? glow : bone, 0.14, 0.6, 0.14, 0, 0.95 - i * 0.04, 0.7 - i * 0.4); s.rotation.x = -0.3; body.add(s); }
  const legs = [];
  for (const [x, z] of [[-0.7, 0.7], [0.7, 0.7], [-0.7, -0.7], [0.7, -0.7]]) {
    const l = pivot(x, 0.9, z); l.add(m(G.cap, hide, 0.26, 0.5, 0.26, 0, -0.45, 0)); rig.add(l); legs.push(l);
  }
  const sc = big ? 2.1 : 1.15; rig.scale.setScalar(sc);
  g.userData.parts = { rig, body, head, legL: legs[0], legR: legs[1], armL: legs[3], armR: legs[2], quad: true };
  g.userData.anim = { phase: Math.random() * 6, move: 0, atk: 0, cast: 0, dead: 0 };
  g.userData.baseScale = sc;
  return g;
}

// Drive limb animation from a tiny state object.
export function animateUnit(obj, dt, moving, speed = 7) {
  const a = obj.userData.anim, p = obj.userData.parts;
  if (!a || !p) return;
  a.move += ((moving ? 1 : 0) - a.move) * Math.min(1, dt * 10);
  a.phase += dt * (moving ? speed * 1.45 : 2.2);
  a.atk = Math.max(0, a.atk - dt * 3.2);
  a.cast = Math.max(0, a.cast - dt * 2.2);
  const s = Math.sin(a.phase), mv = a.move;
  p.legL.rotation.x = s * 0.9 * mv; p.legR.rotation.x = -s * 0.9 * mv;
  if (p.quad) {
    p.armL.rotation.x = s * 0.9 * mv; p.armR.rotation.x = -s * 0.9 * mv;
    p.body.position.y = 1.2 + Math.abs(s) * 0.1 * mv + Math.sin(a.phase * 0.5) * 0.04;
    p.head.rotation.x = a.atk > 0 ? -Math.sin(a.atk * Math.PI) * 0.9 : Math.sin(a.phase * 0.4) * 0.08;
    p.body.rotation.x = a.atk > 0 ? Math.sin(a.atk * Math.PI) * 0.35 : 0;
  } else {
    p.body.position.y = 1.05 + Math.abs(Math.cos(a.phase)) * 0.09 * mv + Math.sin(a.phase * 0.5) * 0.025 * (1 - mv);
    p.body.rotation.x = 0.16 * mv;
    let lx = -s * 0.7 * mv, rx = s * 0.7 * mv, rz = 0, lz = 0;
    if (a.bow) { lx = -1.35 + mv * 0.1; if (a.atk > 0) rx = -1.3 + (1 - a.atk) * 0.9; }
    else if (a.atk > 0) {
      const k = Math.sin((1 - a.atk) * Math.PI);
      rx = -2.3 * k + 0.4 * (1 - a.atk); p.body.rotation.y = 0.5 * k - 0.2;
    } else p.body.rotation.y *= 0.8;
    if (a.cast > 0) { const k = Math.sin(a.cast * Math.PI); lx = -2.6 * k; rx = Math.min(rx, -2.4 * k); lz = 0.4 * k; rz = -0.4 * k; }
    p.armL.rotation.x = lx; p.armR.rotation.x = rx; p.armL.rotation.z = lz; p.armR.rotation.z = rz;
    p.head.rotation.y = Math.sin(a.phase * 0.3) * 0.15 * (1 - mv);
    const cape = obj.userData.cape;
    if (cape) cape.rotation.x = 0.15 + mv * 0.55 + Math.sin(a.phase * 0.8) * 0.08;
    const orb = p.weapon.userData.orb; if (orb) { orb.rotation.y += dt * 3; orb.rotation.x += dt * 2; }
  }
  // death: topple and sink
  if (a.dead > 0) {
    const k = Math.min(1, a.dead);
    p.rig.rotation.x = -k * 1.5; p.rig.position.y = -Math.max(0, a.dead - 1.2) * 1.5;
  } else { p.rig.rotation.x = 0; p.rig.position.y = 0; }
}
