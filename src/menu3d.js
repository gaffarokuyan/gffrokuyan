// Hero showcase rendered into the menu's stage rectangle.
import * as THREE from 'three';
import { HEROES, skinPalette } from './data.js';
import { makeHero, animateUnit, glowMat, GEO } from './models.js';
import { FX } from './fx.js';

export class MenuScene {
  constructor(renderer) {
    this.renderer = renderer;
    const s = this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    s.add(new THREE.HemisphereLight(0xcfe4ff, 0x2a3040, 1.3));
    const key = new THREE.DirectionalLight(0xffe6bf, 3); key.position.set(4, 8, 6); s.add(key);
    const rim = new THREE.DirectionalLight(0x6ab8ff, 2.2); rim.position.set(-5, 4, -6); s.add(rim);
    const stone = new THREE.MeshStandardMaterial({ color: 0x55586a, roughness: 0.85 });
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.5, 0.5, 8), stone); ped.position.y = -0.25; s.add(ped);
    const ped2 = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 3.2, 0.4, 8), stone); ped2.position.y = -0.7; s.add(ped2);
    this.ring = new THREE.Mesh(GEO.ring, glowMat(0xffffff, 1)); this.ring.rotation.x = -Math.PI / 2; this.ring.position.y = 0.02; this.ring.scale.setScalar(1.9); s.add(this.ring);
    this.fx = new FX(s);
    this.t = 0; this.next = 2;
  }
  setHero(id, skin) {
    if (this.hero) this.scene.remove(this.hero);
    this.pal = skinPalette(id, skin);
    this.hero = makeHero(HEROES[id], this.pal);
    this.hero.rotation.y = 0.4;
    this.scene.add(this.hero);
    this.ring.material = glowMat(this.pal.fx, 1.8);
    this.fx.burst(0, 1.5, 0, this.pal.fx, 50, 5, 0.3, 0.9);
  }
  frame(dt, rect, W, H) {
    const r = this.renderer;
    r.setScissorTest(false); r.setClearColor(0x000000, 0); r.clear();
    if (!this.hero || !rect || rect.width < 10) return;
    this.t += dt;
    this.hero.rotation.y = 0.35 + Math.sin(this.t * 0.5) * 0.5;
    if ((this.next -= dt) <= 0) { this.next = 2.5 + Math.random() * 2; const a = this.hero.userData.anim; if (Math.random() < 0.5) a.atk = 1; else { a.cast = 1; this.fx.pillar(0, 0, this.pal.fx, 1.6, 30, 5); } }
    animateUnit(this.hero, dt, false);
    if (Math.random() < 0.6) { const an = Math.random() * 6.28; this.fx.spawn(Math.cos(an) * 1.9, 0.1, Math.sin(an) * 1.9, 0, 1.2 + Math.random(), 0, this.pal.fx, 0.22, 1.6, 0, 0.3); }
    this.fx.update(dt);
    this.fx.mat.uniforms.scale.value = rect.height * r.getPixelRatio() * 1.1;
    this.camera.aspect = rect.width / rect.height; this.camera.updateProjectionMatrix();
    const d = 11 * Math.max(1, 0.75 / this.camera.aspect);
    this.camera.position.set(0, 3.4, d); this.camera.lookAt(0, 2.1, 0);
    const y = H - rect.bottom;
    r.setViewport(rect.left, y, rect.width, rect.height); r.setScissor(rect.left, y, rect.width, rect.height); r.setScissorTest(true);
    r.render(this.scene, this.camera);
    r.setScissorTest(false); r.setViewport(0, 0, W, H);
  }
}
