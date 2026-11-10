// GPU point-sprite particles plus pooled ring / beam / telegraph effects.
import * as THREE from 'three';
import { GEO } from './models.js';

const MAX = 3500;
const tmpC = new THREE.Color();

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.n = 0;
    this.pos = new Float32Array(MAX * 3); this.col = new Float32Array(MAX * 3);
    this.size = new Float32Array(MAX); this.alpha = new Float32Array(MAX);
    this.vel = new Float32Array(MAX * 3); this.life = new Float32Array(MAX); this.maxLife = new Float32Array(MAX);
    this.grav = new Float32Array(MAX); this.size0 = new Float32Array(MAX); this.drag = new Float32Array(MAX);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    const mat = new THREE.ShaderMaterial({
      uniforms: { scale: { value: 500 } },
      vertexShader: `attribute float size; attribute float alpha; attribute vec3 color; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vC=color; vA=alpha; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=size*scale/-mv.z; gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `varying vec3 vC; varying float vA;
        void main(){ float d=length(gl_PointCoord-0.5)*2.0; float a=smoothstep(1.0,0.0,d); a*=a; gl_FragColor=vec4(vC*(1.0+a),a*vA); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.mat = mat;
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false; this.points.renderOrder = 10;
    scene.add(this.points);
    this.fxs = []; // mesh effects
    this.ringMatBase = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
  }

  spawn(x, y, z, vx, vy, vz, color, size, life, grav = 0, drag = 0) {
    let i = this.n;
    if (i >= MAX) i = (Math.random() * MAX) | 0; else this.n++;
    const j = i * 3;
    this.pos[j] = x; this.pos[j + 1] = y; this.pos[j + 2] = z;
    this.vel[j] = vx; this.vel[j + 1] = vy; this.vel[j + 2] = vz;
    tmpC.set(color);
    this.col[j] = tmpC.r; this.col[j + 1] = tmpC.g; this.col[j + 2] = tmpC.b;
    this.size0[i] = size; this.life[i] = life; this.maxLife[i] = life; this.grav[i] = grav; this.drag[i] = drag;
  }

  burst(x, y, z, color, count = 20, speed = 6, size = 0.5, life = 0.6, opts = {}) {
    const up = opts.up ?? 0.5, grav = opts.grav ?? 6, flat = opts.flat ?? false;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, e = flat ? 0 : (Math.random() - 0.2) * Math.PI * 0.5;
      const s = speed * (0.4 + Math.random() * 0.8);
      this.spawn(x, y, z, Math.cos(a) * Math.cos(e) * s, Math.sin(e) * s + up * speed, Math.sin(a) * Math.cos(e) * s,
        color, size * (0.6 + Math.random() * 0.8), life * (0.6 + Math.random() * 0.7), grav, opts.drag ?? 1.5);
    }
  }

  trail(x, y, z, color, size = 0.5, life = 0.35, jitter = 0.15) {
    this.spawn(x + (Math.random() - 0.5) * jitter, y + (Math.random() - 0.5) * jitter, z + (Math.random() - 0.5) * jitter,
      (Math.random() - 0.5), Math.random() * 0.8, (Math.random() - 0.5), color, size, life, -0.5, 1);
  }

  pillar(x, z, color, r = 1.2, count = 24, h = 5) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, d = Math.random() * r;
      this.spawn(x + Math.cos(a) * d, 0.2, z + Math.sin(a) * d, 0, h * (0.5 + Math.random()), 0, color, 0.45, 0.9 + Math.random() * 0.4, 0, 0.5);
    }
  }

  ring(x, z, radius, color, dur = 0.5, opts = {}) {
    const mat = this.ringMatBase.clone(); mat.color.set(color).multiplyScalar(opts.k ?? 1.6); mat.opacity = 1;
    const mesh = new THREE.Mesh(opts.fill ? GEO.disc : GEO.ring, mat);
    mesh.rotation.x = -Math.PI / 2; mesh.position.set(x, opts.y ?? 0.12, z);
    this.scene.add(mesh);
    this.fxs.push({ mesh, t: 0, dur, kind: 'ring', r0: opts.from ?? 0.3, r1: radius, o: opts.opacity ?? 0.9 });
  }

  // quick blade arc in front of a melee attacker
  slash(x, z, face, radius, color) {
    this.arcGeo ||= new THREE.RingGeometry(0.62, 1, 20, 1, -1.0, 2.0);
    const mat = this.ringMatBase.clone(); mat.color.set(color).multiplyScalar(2); mat.opacity = 1;
    const mesh = new THREE.Mesh(this.arcGeo, mat);
    mesh.rotation.set(-Math.PI / 2, 0, Math.atan2(-Math.cos(face), Math.sin(face))); mesh.position.set(x, 1.3, z);
    this.scene.add(mesh);
    this.fxs.push({ mesh, t: 0, dur: 0.22, kind: 'ring', r0: radius * 0.75, r1: radius, o: 0.95 });
  }

  // Ground warning circle that fills while an area ability winds up
  telegraph(x, z, radius, color, dur) {
    const mat = this.ringMatBase.clone(); mat.color.set(color); mat.opacity = 0.9;
    const edge = new THREE.Mesh(GEO.ring, mat);
    edge.rotation.x = -Math.PI / 2; edge.position.set(x, 0.1, z); edge.scale.setScalar(radius);
    const mat2 = this.ringMatBase.clone(); mat2.color.set(color); mat2.opacity = 0.3;
    const fill = new THREE.Mesh(GEO.disc, mat2);
    fill.rotation.x = -Math.PI / 2; fill.position.set(x, 0.09, z);
    this.scene.add(edge, fill);
    this.fxs.push({ mesh: fill, extra: edge, t: 0, dur, kind: 'tele', r1: radius });
  }

  beam(ax, ay, az, bx, by, bz, color, dur = 0.2, w = 0.15) {
    const mat = this.ringMatBase.clone(); mat.color.set(color).multiplyScalar(2);
    const mesh = new THREE.Mesh(GEO.cyl, mat);
    const dx = bx - ax, dy = by - ay, dz = bz - az, len = Math.hypot(dx, dy, dz) || 1;
    mesh.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    mesh.scale.set(w, len, w);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / len, dy / len, dz / len));
    this.scene.add(mesh);
    this.fxs.push({ mesh, t: 0, dur, kind: 'beam', w });
  }

  update(dt) {
    // particles
    const { pos, vel, life, maxLife, size, size0, alpha, grav, drag } = this;
    let n = this.n;
    for (let i = 0; i < n; i++) {
      life[i] -= dt;
      if (life[i] <= 0) {
        // swap-remove
        n--;
        if (i !== n) {
          const a = i * 3, b = n * 3;
          pos[a] = pos[b]; pos[a + 1] = pos[b + 1]; pos[a + 2] = pos[b + 2];
          vel[a] = vel[b]; vel[a + 1] = vel[b + 1]; vel[a + 2] = vel[b + 2];
          this.col[a] = this.col[b]; this.col[a + 1] = this.col[b + 1]; this.col[a + 2] = this.col[b + 2];
          life[i] = life[n]; maxLife[i] = maxLife[n]; size0[i] = size0[n]; grav[i] = grav[n]; drag[i] = drag[n];
          i--;
        }
        continue;
      }
      const j = i * 3, d = Math.max(0, 1 - drag[i] * dt);
      vel[j] *= d; vel[j + 1] = vel[j + 1] * d - grav[i] * dt; vel[j + 2] *= d;
      pos[j] += vel[j] * dt; pos[j + 1] += vel[j + 1] * dt; pos[j + 2] += vel[j + 2] * dt;
      if (pos[j + 1] < 0.05) { pos[j + 1] = 0.05; vel[j + 1] *= -0.3; }
      const k = life[i] / maxLife[i];
      alpha[i] = Math.min(1, k * 2.2); size[i] = size0[i] * (0.4 + 0.6 * k);
    }
    this.n = n;
    const g = this.points.geometry;
    g.setDrawRange(0, n);
    g.attributes.position.needsUpdate = true; g.attributes.color.needsUpdate = true;
    g.attributes.size.needsUpdate = true; g.attributes.alpha.needsUpdate = true;

    // mesh effects
    for (let i = this.fxs.length - 1; i >= 0; i--) {
      const f = this.fxs[i]; f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      if (f.kind === 'ring') {
        const e = 1 - (1 - k) * (1 - k);
        f.mesh.scale.setScalar(f.r0 + (f.r1 - f.r0) * e); f.mesh.material.opacity = f.o * (1 - k);
      } else if (f.kind === 'tele') {
        f.mesh.scale.setScalar(Math.max(0.01, f.r1 * k));
        f.extra.material.opacity = 0.6 + Math.sin(f.t * 20) * 0.3;
      } else if (f.kind === 'beam') {
        f.mesh.scale.x = f.mesh.scale.z = f.w * (1 - k); f.mesh.material.opacity = 1 - k;
      }
      if (k >= 1) {
        this.scene.remove(f.mesh); f.mesh.material.dispose();
        if (f.extra) { this.scene.remove(f.extra); f.extra.material.dispose(); }
        this.fxs.splice(i, 1);
      }
    }
  }
}
