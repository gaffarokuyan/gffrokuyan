// Match simulation + rendering.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { HEROES, HERO_IDS, ITEMS, ITEM, PASSIVES, skinPalette } from './data.js';
import { t } from './i18n.js';
import { FX } from './fx.js';
import { makeHero, makeMinion, makeTower, makeCore, makeMonster, animateUnit, glowMat, GEO, TEAM_COLOR } from './models.js';
import { buildWorld, MAP, LANES, LANE_NAMES, SPAWN, CORE, TOWERS, CAMPS, GROVES, BUSHES } from './world.js';

export const UNLOCK = [1, 1, 1, 6];
export const MAX_RANK = [5, 5, 5, 3];
export const SPELLS = [{ id: 'blink', icon: '✦', cd: 75 }, { id: 'mend', icon: '❤', cd: 60 }];
const MAX_LEVEL = 15;
const BUILD = {
  fighter: ['boots', 'fang', 'reaver', 'plate', 'great'], mage: ['boots', 'staff', 'storm', 'warden', 'plate'],
  support: ['boots', 'staff', 'warden', 'plate', 'storm'], marksman: ['boots', 'great', 'fang', 'storm', 'reaver'],
  tank: ['boots', 'plate', 'warden', 'fang', 'reaver'], assassin: ['boots', 'reaver', 'great', 'fang', 'plate'],
};
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
export const xpNeed = (lvl) => 90 + lvl * 70;
const v3 = new THREE.Vector3();

export class Game {
  constructor(o) {
    Object.assign(this, { renderer: o.renderer, overlay: o.overlay, ui: o.ui, audio: o.audio, onEnd: o.onEnd, quality: o.quality });
    this.ctx2d = this.overlay.getContext('2d');
    this.time = 0; this.units = []; this.heroes = []; this.projs = []; this.pending = []; this.floats = [];
    this.kills = [0, 0]; this.bossBuff = [0, 0]; this.spirit = [0, 0]; this.visT = 0; this.fogT = 0; this.firstBlood = false; this.over = null; this.paused = false;
    this.waveT = 4; this.waveN = 0; this.shake = 0; this.zoom = 1; this.uid = 1; this.glow = {};
    this.input = { joy: { x: 0, y: 0 }, keys: {}, mouse: null, mouseActive: false };

    const scene = this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 1, 400);
    this.env = buildWorld(scene, this.quality);
    this.fx = new FX(scene);
    this.raycaster = new THREE.Raycaster(); this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const r = this.renderer;
    r.shadowMap.enabled = this.quality === 'high'; r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.15;
    if (this.quality === 'high') {
      this.composer = new EffectComposer(r);
      this.composer.addPass(new RenderPass(scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.55, 0.6, 0.92);
      this.composer.addPass(this.bloom); this.composer.addPass(new OutputPass());
    }

    this.buildStructures();
    this.buildHeroes(o.heroId, o.skin);
    this.spawnCamps();
    this.bind();
    this.camT = { x: this.player.x, z: this.player.z };
    this.ui.announce(t('welcome'));
  }

  // ---------- setup ----------
  add(u) {
    u.id = this.uid++; u.atkCd = 0; u.target = null; u.dead = false; u.face = u.team === 1 ? -Math.PI / 2 : Math.PI / 2;
    u.slowT = 0; u.slowAmt = 0; u.stunT = 0; u.shield = 0; u.shieldT = 0; u.moving = false; u.scanT = Math.random() * 0.3;
    u.seen = [true, true]; u.bush = -1;
    u.hp = u.maxHp; u.obj.position.set(u.x, 0, u.z); u.obj.rotation.y = u.face;
    this.scene.add(u.obj); this.units.push(u);
    return u;
  }

  buildStructures() {
    this.towers = [];
    for (const team of [0, 1]) {
      const sx = team === 0 ? -1 : 1;
      for (const [lane, tier, x, z] of TOWERS) {
        const tw = this.add({ kind: 'tower', team, lane, tier, x: x * sx, z, r: 1.9, maxHp: 3800, atk: 175, arm: 42, range: 10.5, as: 0.85, ranged: true, h: 9.6, obj: makeTower(team), struct: true });
        this.towers.push(tw);
      }
      const core = this.add({ kind: 'core', team, x: CORE[team].x, z: 0, r: 4.6, maxHp: 6500, atk: 210, arm: 42, range: 11.5, as: 1, ranged: true, h: 9, obj: makeCore(team), struct: true });
      (this.cores ||= [])[team] = core;
    }
    this.updateProtection();
  }

  updateProtection() {
    for (const tw of this.towers) {
      tw.prot = tw.tier === 1 && this.towers.some((o) => o.team === tw.team && o.lane === tw.lane && o.tier === 0 && !o.dead);
    }
    for (const team of [0, 1]) {
      const was = this.cores[team].prot;
      this.cores[team].prot = !this.towers.some((o) => o.team === team && o.tier === 1 && o.dead);
      if (was && !this.cores[team].prot && this.player) this.ui.announce(t(team === 1 ? 'coreExposed' : 'coreDanger'), team === 1 ? 'good' : 'bad');
    }
  }

  buildHeroes(heroId, skin) {
    const rest = HERO_IDS.filter((h) => h !== heroId).sort(() => Math.random() - 0.5);
    const mk = (id, team, slot, isPlayer, lane, roam) => {
      const data = HEROES[id];
      const pal = skinPalette(id, isPlayer ? skin : 'default');
      const sp = SPAWN[team];
      const h = this.add({
        kind: 'hero', team, heroId: id, data, pal, name: data.name, isPlayer, x: sp.x, z: sp.z + (slot - 2) * 2.6, r: 0.9, h: 4.2,
        maxHp: data.hp, atk: data.atk, arm: data.def, spd: data.spd, range: data.range, as: data.as, ranged: !data.melee,
        level: 1, xp: 0, gold: 500, items: [], cds: [0, 0, 0, 0], cdMax: [1, 1, 1, 1], ranks: [0, 0, 0, 0], sp: 1, mp: data.mp, maxMp: data.mp, buffs: [],
        spells: SPELLS.map((q) => ({ cd: 0, max: q.cd })), hitBy: {}, multi: 0, lastKillT: -99,
        passive: PASSIVES[id], hits: 0, crit: 0, k: 0, d: 0, a: 0, cs: 0, respawnT: 0, recallT: 0, ap: 0, cdr: 0, ls: 0, moveTo: null, attackTarget: null, dash: null, slot,
        obj: makeHero(data, pal, team),
        bot: isPlayer ? null : { lane, roam, roamT: 40, think: Math.random() * 0.3, retreat: false, castT: 1 + Math.random() * 2 },
      });
      if (h.bot) this.autoRank(h);
      this.heroes.push(h);
      return h;
    };
    this.player = mk(heroId, 0, 2, true, 'mid');
    ['top', 'mid', 'bot', 'bot'].forEach((lane, i) => mk(rest[i], 0, i < 2 ? i : i + 1, false, lane));
    ['top', 'mid', 'bot', 'bot', 'top'].forEach((lane, i) => mk(rest[4 + i], 1, i, false, lane, i === 4));
    // "you are here" marker
    const mark = new THREE.Mesh(GEO.cone, glowMat(0xffe27a, 1.8)); mark.scale.set(0.28, 0.55, 0.28); mark.rotation.x = Math.PI; mark.position.y = 5.2;
    this.player.obj.add(mark); this.playerMark = mark;
  }

  // ---------- ability ranks ----------
  rankCap(h, i) { return i === 3 ? (h.level >= 15 ? 3 : h.level >= 11 ? 2 : h.level >= 6 ? 1 : 0) : Math.min(5, Math.ceil(h.level / 2)); }
  canRank(h, i) { return h.sp > 0 && h.ranks[i] < this.rankCap(h, i); }
  rankUp(h, i) {
    if (!this.canRank(h, i)) return false;
    h.ranks[i]++; h.sp--;
    if (h.isPlayer) { this.audio.play('click'); this.fx.ring(h.x, h.z, 2.2, h.pal.fx, 0.4); }
    return true;
  }
  autoRank(h) { for (let n = 0; n < 6 && h.sp > 0; n++) if (![3, 0, 2, 1].some((i) => this.rankUp(h, i))) break; }
  // effective scaling level of an ability from its rank
  abL(h, i) { const r = Math.max(1, h.ranks[i]); return i === 3 ? [6, 11, 15][r - 1] : r * 3 - 2; }
  sees(team, o) { return team > 1 || o.team === team || o.struct || o.seen[team]; }

  vision() {
    const us = this.units;
    for (const u of us) {
      if (u.dead) continue;
      u.bush = -1;
      if (!u.struct) for (let i = 0; i < BUSHES.length; i++) { const b = BUSHES[i]; if (Math.hypot(u.x - b.x, u.z - b.z) < b.r) { u.bush = i; break; } }
      u.seen[0] = u.team === 0; u.seen[1] = u.team === 1;
    }
    for (const v of us) {
      if (v.dead || v.team > 1) continue;
      const sight = v.kind === 'hero' ? 17 : v.kind === 'minion' ? 11 : 15;
      for (const o of us) {
        if (o.dead || o.team === v.team || o.seen[v.team]) continue;
        const d = dist(v, o); if (d > sight + o.r) continue;
        if (o.bush >= 0 && o.bush !== v.bush && d > 2.6) continue;
        o.seen[v.team] = true;
      }
    }
  }

  spell(h, k, tx, tz) {
    const sp = h.spells[k];
    if (h.dead || h.stunT > 0 || h.dash || sp.cd > 0 || this.over) return false;
    sp.cd = sp.max; h.recallT = 0;
    if (k === 0) {
      let dx = tx - h.x, dz = tz - h.z; const d = Math.hypot(dx, dz) || 1, r = Math.min(d, 7.5);
      this.fx.burst(h.x, 1.5, h.z, 0xffe27a, 34, 6, 0.5, 0.5);
      h.x = Math.max(MAP.minX, Math.min(MAP.maxX, h.x + dx / d * r)); h.z = Math.max(MAP.minZ, Math.min(MAP.maxZ, h.z + dz / d * r)); h.moveTo = null;
      this.fx.burst(h.x, 1.5, h.z, 0xffe27a, 34, 6, 0.5, 0.5); this.fx.ring(h.x, h.z, 2.5, 0xffe27a, 0.4); this.sfx('cast', h.x, h.z, 1);
    } else {
      const amt = 90 + h.level * 18 + h.maxHp * 0.1;
      for (const o of this.heroes) if (o.team === h.team && !o.dead && dist(o, h) < 8) { this.heal(o, o === h ? amt : amt * 0.5); this.fx.pillar(o.x, o.z, 0x6dff8a, 1, 24, 6); }
      this.fx.ring(h.x, h.z, 8, 0x6dff8a, 0.6); this.sfx('heal', h.x, h.z, 1);
    }
    return true;
  }
  playerSpell(k) {
    const p = this.player, inp = this.input;
    if (inp.mouseActive && inp.mouse) return this.spell(p, k, inp.mouse.x, inp.mouse.z);
    const joy = Math.hypot(inp.joy.x, inp.joy.y) > 0.2, fx = joy ? inp.joy.x : Math.sin(p.face), fz = joy ? inp.joy.y : Math.cos(p.face);
    return this.spell(p, k, p.x + fx * 8, p.z + fz * 8);
  }

  spawnCamps() {
    this.camps = CAMPS.map((c) => ({ ...c, unit: null, respawn: c.big ? 60 : 20 }));
  }
  spawnMonster(c) {
    const big = c.big;
    c.unit = this.add({ kind: 'monster', team: 2, big, spirit: c.spirit, camp: c, x: c.x, z: c.z, r: big ? 2.2 : 1.2, h: big ? 6 : 3.4, maxHp: big ? 3200 + this.time * 3 : 900 + this.time * 1.5, atk: big ? 95 : 42, arm: big ? 30 : 12, spd: 6.5, range: big ? 3.6 : 2.4, as: big ? 0.7 : 0.9, obj: makeMonster(big, c.spirit) });
    this.fx.pillar(c.x, c.z, c.spirit ? 0x60f0ff : big ? 0xc070ff : 0xb0ff60, 2, 20);
  }

  spawnWave() {
    this.waveN++;
    const scale = 1 + this.time / 60 * 0.07;
    for (const team of [0, 1]) for (const lane of LANE_NAMES) {
      const sx = team === 0 ? 1 : -1;
      const path = LANES[lane].map(([x, z]) => ({ x: x * sx, z }));
      for (let i = 0; i < 4; i++) {
        const ranged = i === 3;
        this.add({
          kind: 'minion', team, lane, path, wp: 0, ranged, x: path[0].x - sx * (i * 1.8 + 2), z: path[0].z + (i % 2 ? 0.8 : -0.8), r: 0.6, h: 2.5,
          maxHp: (ranged ? 250 : 400) * scale, atk: (ranged ? 27 : 19) * scale, arm: 4, spd: 5.4, range: ranged ? 7.5 : 1.7, as: 0.8, obj: makeMinion(team, ranged),
        });
      }
      const extra = (o) => this.add({ kind: 'minion', team, lane, path, wp: 0, x: path[0].x - sx * 10, z: path[0].z, arm: 12, spd: 5.4, as: 0.75, ...o });
      // every third wave brings a siege caster that hits structures at full strength
      if (this.waveN % 3 === 0) extra({ ranged: true, siege: true, r: 0.8, h: 3.4, maxHp: 760 * scale, atk: 52 * scale, range: 9.5, obj: makeMinion(team, true, 1.2) });
      // a fallen inner tower lets the attackers field a champion soldier in that lane
      if (this.towers.some((o) => o.team !== team && o.lane === lane && o.tier === 1 && o.dead)) extra({ ranged: false, siege: true, r: 0.95, h: 4, maxHp: 1700 * scale, atk: 64 * scale, range: 2.2, obj: makeMinion(team, false, 1.45) });
    }
  }

  // ---------- helpers ----------
  targetable(u) { return !u.dead && !u.prot; }
  hostile(a, b) { return a.team !== b.team; }
  nearest(u, range, filter) {
    let best = null, bd = range;
    for (const o of this.units) {
      if (o.team === u.team || !this.targetable(o) || !this.sees(u.team, o) || (filter && !filter(o))) continue;
      const d = dist(u, o) - o.r; if (d < bd) { bd = d; best = o; }
    }
    return best;
  }
  glowM(color) { return this.glow[color] ||= glowMat(color, 2); }
  sfx(name, x, z, base = 1) {
    const d = Math.hypot(x - this.camT.x, z - this.camT.z);
    this.audio.play(name, base * Math.max(0, 1 - d / 34));
  }
  floatText(u, text, color, big) {
    if (this.floats.length > 60) this.floats.shift();
    this.floats.push({ x: u.x + (Math.random() - 0.5), y: u.h * 0.8, z: u.z, text, color, t: 0, big });
  }

  recalc(h) {
    const d = h.data, L = h.level - 1;
    let hp = d.hp + d.hpG * L, atk = d.atk + d.atkG * L, arm = d.def + 1.6 * L, spd = d.spd, as = 1 + 0.02 * L, mp = d.mp + 25 * L, ap = 0, cdr = 0, ls = 0, crit = 0;
    for (const id of h.items) { const it = ITEM[id]; crit += it.crit || 0; hp += it.hp || 0; atk += it.atk || 0; arm += it.def || 0; spd += it.spd || 0; as += it.as || 0; mp += it.mp || 0; ap += it.ap || 0; cdr += it.cdr || 0; ls += it.ls || 0; }
    let sm = 1, am = 1;
    for (const b of h.buffs) { if (b.spd) sm = Math.max(sm, b.spd); if (b.as) am = Math.max(am, b.as); atk += b.atk || 0; arm += b.arm || 0; }
    if (this.bossBuff[h.team] > this.time) atk *= 1.18;
    const st = this.spirit[h.team]; atk *= 1 + 0.05 * st; spd += 0.15 * st; hp *= 1 + 0.04 * st; hp = Math.round(hp);
    if (hp !== h.maxHp) { h.hp += Math.max(0, hp - h.maxHp); h.maxHp = hp; }
    h.maxMp = mp; h.atk = atk; h.arm = arm; h.spd = spd * sm; h.as = d.as * as * am; h.ap = ap; h.cdr = Math.min(0.4, cdr); h.ls = ls; h.crit = crit;
  }

  // ---------- combat ----------
  damage(src, tgt, amt, o = {}) {
    if (tgt.dead || tgt.prot || this.over) return;
    if (src.passive === 'execute' && tgt.hp < tgt.maxHp * 0.35) amt *= 1.25;
    if (!o.pure) amt *= 100 / (100 + tgt.arm);
    if (src.kind === 'minion' && tgt.struct && !src.siege) amt *= 0.5;
    if (src.kind === 'minion' && tgt.kind === 'hero') amt *= 0.7;
    if (tgt.shield > 0) { const a = Math.min(tgt.shield, amt); tgt.shield -= a; amt -= a; }
    tgt.hp -= amt; tgt.lastHit = src; tgt.hitT = this.time;
    if (src.kind === 'hero') { tgt.lastHero = src; tgt.lastHeroT = this.time; if (o.basic && src.ls) src.hp = Math.min(src.maxHp, src.hp + amt * src.ls); if (!o.basic && !o.pure && src.passive === 'spellheal' && !src.dead) src.hp = Math.min(src.maxHp, src.hp + amt * 0.12); }
    if (tgt.kind === 'hero') { tgt.recallT = 0; tgt.combatT = this.time; if (src.kind === 'hero') { src.combatT = this.time; tgt.hitBy[src.id] = this.time; } }
    if (tgt.kind === 'monster' && src.kind === 'hero' && !tgt.target) tgt.target = src;
    if (amt >= 1 && (src === this.player || tgt === this.player)) this.floatText(tgt, Math.round(amt) + (o.crit ? '!' : ''), tgt === this.player ? '#ff6a5a' : o.crit ? '#ff9a3c' : o.basic ? '#ffffff' : '#ffd24a', !o.basic || o.crit);
    if (tgt.hp <= 0) this.kill(tgt, src);
  }

  heal(u, amt) {
    const a = Math.min(amt, u.maxHp - u.hp); if (a <= 0) return;
    u.hp += a;
    if (a > 5 && (u === this.player || u.kind === 'hero' && dist(u, this.player) < 20)) this.floatText(u, '+' + Math.round(a), '#6dff8a');
  }

  addXp(h, n) {
    if (h.level >= MAX_LEVEL) return;
    h.xp += n;
    while (h.level < MAX_LEVEL && h.xp >= xpNeed(h.level)) {
      h.xp -= xpNeed(h.level); h.level++; h.sp++; if (h.bot) this.autoRank(h);
      this.recalc(h); h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.2); h.mp = Math.min(h.maxMp, h.mp + h.maxMp * 0.3);
      this.fx.pillar(h.x, h.z, 0xffe27a, 1.4, 34, 7); this.fx.ring(h.x, h.z, 4, 0xffe27a, 0.6);
      if (h.isPlayer) { this.audio.play('level'); this.floatText(h, t('levelUp'), '#ffe27a', true); }
    }
  }

  kill(tgt, src) {
    tgt.dead = true; tgt.hp = 0; tgt.target = null;
    const a = tgt.obj.userData.anim; if (a) a.dead = 0.001;
    const killer = src.kind === 'hero' ? src : (tgt.lastHero && this.time - tgt.lastHeroT < 8 ? tgt.lastHero : null);
    const share = (xp, range = 17) => {
      const near = this.heroes.filter((h) => h.team !== tgt.team && !h.dead && dist(h, tgt) < range);
      for (const h of near) this.addXp(h, xp / Math.sqrt(near.length));
      return near;
    };
    const col = TEAM_COLOR[tgt.team];
    if (tgt.kind === 'minion') {
      const near = share(30);
      if (killer) { killer.gold += 22; killer.cs++; if (killer.isPlayer) { this.floatText(tgt, '+22', '#ffd24a'); this.audio.play('coin'); } }
      else for (const h of near) h.gold += 7;
      this.fx.burst(tgt.x, 1, tgt.z, col, 10, 4, 0.4, 0.5);
      tgt.removeT = 2.2;
    } else if (tgt.kind === 'monster') {
      share(tgt.big ? 220 : 70, 20);
      const team = killer ? killer.team : -1;
      if (killer) { killer.gold += tgt.big ? 120 : 60; if (killer.isPlayer) this.audio.play('coin'); }
      if (tgt.spirit && team >= 0) {
        this.spirit[team]++;
        for (const h of this.heroes) if (h.team === team) { h.gold += 80; this.fx.pillar(h.x, h.z, 0x60f0ff, 1.5, 30, 8); }
        this.ui.announce(t(team === 0 ? 'spiritDown' : 'spiritDownEnemy'), team === 0 ? 'good' : 'bad');
        this.sfx('boom', tgt.x, tgt.z, 1.2);
      } else if (tgt.big && team >= 0) {
        this.bossBuff[team] = this.time + 90;
        for (const h of this.heroes) if (h.team === team) { h.gold += 100; this.fx.pillar(h.x, h.z, 0xc070ff, 1.5, 30, 8); }
        this.ui.announce(t(team === 0 ? 'bossDown' : 'bossDownEnemy'), team === 0 ? 'good' : 'bad');
        this.sfx('boom', tgt.x, tgt.z, 1.2);
      }
      this.fx.burst(tgt.x, 1.5, tgt.z, tgt.spirit ? 0x60f0ff : tgt.big ? 0xc070ff : 0xb0ff60, tgt.big ? 80 : 24, 8, 0.6, 0.9);
      tgt.camp.unit = null; tgt.camp.respawn = tgt.spirit ? 150 : tgt.big ? 110 : 55; tgt.removeT = 2.5;
    } else if (tgt.kind === 'hero') {
      tgt.d++; tgt.respawnT = 6 + tgt.level * 1.5; tgt.moveTo = null; tgt.attackTarget = null; tgt.dash = null; tgt.buffs.length = 0; tgt.shield = 0;
      this.kills[1 - tgt.team]++;
      share(110 + tgt.level * 22, 20);
      if (killer) {
        killer.k++; killer.gold += 200;
        killer.multi = this.time - killer.lastKillT < 10 ? killer.multi + 1 : 1; killer.lastKillT = this.time;
        if (killer.multi >= 2) setTimeout(() => this.ui.announce(`${killer.name} — ${t('multi' + Math.min(5, killer.multi))}`, killer.team === 0 ? 'good' : 'bad'), 900);
      }
      for (const o of this.heroes) if (o.team !== tgt.team && o !== killer && this.time - (tgt.hitBy[o.id] ?? -99) < 10) { o.a++; o.gold += 80; if (o.isPlayer) this.floatText(tgt, '+80', '#ffd24a'); }
      tgt.hitBy = {};
      this.fx.burst(tgt.x, 1.5, tgt.z, tgt.pal.fx, 60, 9, 0.6, 1); this.fx.ring(tgt.x, tgt.z, 6, tgt.pal.fx, 0.7);
      this.ui.feed(killer ? killer.name : (src.struct ? '🏰' : '⚔️'), tgt.name, killer ? killer.team : 1 - tgt.team);
      if (!this.firstBlood) { this.firstBlood = true; this.ui.announce(t('firstBlood'), killer && killer.team === 0 ? 'good' : 'bad'); }
      if (tgt.isPlayer) { this.audio.play('death'); this.ui.announce(t('youSlain'), 'bad'); }
      else if (killer && killer.isPlayer) { this.audio.play('level'); this.floatText(tgt, '+200', '#ffd24a', true); }
    } else if (tgt.kind === 'tower') {
      for (const h of this.heroes) if (h.team !== tgt.team) { h.gold += 130; this.addXp(h, 90); }
      this.wreck(tgt, 70);
      this.ui.announce(t(tgt.team === 1 ? 'towerDown' : 'allyTowerDown'), tgt.team === 1 ? 'good' : 'bad');
      this.updateProtection();
    } else if (tgt.kind === 'core') {
      this.wreck(tgt, 220);
      const win = tgt.team === 1;
      this.over = { win, t: 0 };
      this.camFocus = tgt;
      this.audio.play(win ? 'win' : 'lose');
    }
  }

  wreck(s, n) {
    this.fx.burst(s.x, 4, s.z, TEAM_COLOR[s.team], n, 14, 0.9, 1.4);
    this.fx.burst(s.x, 2, s.z, 0xffc070, n, 9, 0.7, 1.2);
    this.fx.ring(s.x, s.z, s.r * 5, 0xffffff, 0.8); this.fx.ring(s.x, s.z, s.r * 3.5, TEAM_COLOR[s.team], 1.1);
    this.sfx('tower', s.x, s.z, 1.5); this.shake = 1;
    s.wreckT = 0.001;
  }

  basicAttack(u, tgt) {
    u.atkCd = 1 / u.as;
    const a = u.obj.userData.anim; if (a) a.atk = 1;
    const col = u.kind === 'hero' ? u.pal.fx : u.kind === 'monster' ? 0xb0ff60 : TEAM_COLOR[u.team];
    let dmg = u.atk, crit = false;
    if (u.kind === 'hero') {
      if (u.passive === 'third' && ++u.hits % 3 === 0) { dmg *= 1.6; this.fx.ring(tgt.x, tgt.z, 2, col, 0.3); }
      if (u.crit && !tgt.struct && Math.random() < u.crit) { dmg *= 1.75; crit = true; }
    }
    if (u.struct) { if (tgt.kind === 'hero') { u.ramp = u.rampT === tgt ? Math.min(2.5, u.ramp + 0.3) : 1; u.rampT = tgt; dmg *= u.ramp; } this.sfx('shot', u.x, u.z, 0.9); }
    if (u.ranged) {
      const y = u.kind === 'tower' ? 8.2 : u.kind === 'core' ? 5.2 : 1.9;
      this.projs.push(this.mkProj({ x: u.x, y, z: u.z, homing: tgt, speed: u.struct ? 34 : 30, dmg, crit, src: u, color: col, basic: true, size: u.struct ? 0.45 : u.kind === 'hero' ? 0.28 : 0.2 }));
      if (u.kind === 'hero') this.sfx('shot', u.x, u.z, 0.6);
    } else {
      this.damage(u, tgt, dmg, { basic: true, crit });
      if (u.kind !== 'minion') this.fx.slash(u.x, u.z, Math.atan2(tgt.x - u.x, tgt.z - u.z), u.range + tgt.r * 0.5 + 0.6, col);
      this.fx.burst(tgt.x, 1.4, tgt.z, col, u.kind === 'hero' ? 8 : 3, 4, 0.35, 0.3);
      if (u.kind !== 'minion') this.sfx('hit', u.x, u.z, 0.7);
    }
  }

  mkProj(p) {
    p.mesh = new THREE.Mesh(GEO.sphere, this.glowM(p.color)); p.mesh.scale.setScalar(p.size || 0.3);
    p.mesh.position.set(p.x, p.y, p.z); this.scene.add(p.mesh); p.team = p.src.team;
    return p;
  }

  // walk toward and hit a target; returns false if target invalid
  engage(u, tgt, dt) {
    if (!tgt || !this.targetable(tgt) || !this.sees(u.team, tgt)) return false;
    const d = dist(u, tgt) - tgt.r;
    if (d <= u.range) {
      u.face = Math.atan2(tgt.x - u.x, tgt.z - u.z); u.moving = false;
      if (u.atkCd <= 0) this.basicAttack(u, tgt);
    } else this.step(u, tgt.x, tgt.z, dt);
    return true;
  }

  step(u, tx, tz, dt) {
    const dx = tx - u.x, dz = tz - u.z, d = Math.hypot(dx, dz);
    if (d < 0.15) { u.moving = false; return true; }
    const sp = u.spd * (u.slowT > 0 ? 1 - u.slowAmt : 1) * dt, k = Math.min(1, sp / d);
    u.x += dx * k; u.z += dz * k; u.face = Math.atan2(dx, dz); u.moving = true;
    return false;
  }

  areaHit(src, x, z, r, dmg, a) {
    let n = 0;
    for (const o of this.units) {
      if (o.team === src.team || o.struct || !this.targetable(o) || Math.hypot(o.x - x, o.z - z) > r + o.r) continue;
      this.damage(src, o, dmg); this.applyCC(o, a); n++;
    }
    return n;
  }
  applyCC(o, a) {
    if (o.dead) return;
    if (a.slow) { o.slowT = 2; o.slowAmt = a.slow; }
    if (a.stun) { o.stunT = Math.max(o.stunT, o.kind === 'monster' && o.big ? a.stun * 0.4 : a.stun); }
  }

  cast(h, i, tx, tz) {
    const a = h.data.abil[i];
    if (h.dead || h.stunT > 0 || h.dash || this.over || !h.ranks[i] || h.cds[i] > 0) return false;
    const L = this.abL(h, i);
    if (h.mp < a.mana) { if (h.isPlayer) this.audio.play('error'); return false; }
    let dx = tx - h.x, dz = tz - h.z, d = Math.hypot(dx, dz);
    if (d < 0.05) { dx = Math.sin(h.face); dz = Math.cos(h.face); d = 0.05; }
    const nx = dx / d, nz = dz / d, col = h.pal.fx;
    h.mp -= a.mana; h.cds[i] = h.cdMax[i] = a.cd * (1 - h.cdr) * (1 - 0.04 * (h.ranks[i] - 1)); h.recallT = 0; h.obj.userData.anim.cast = 1;
    if (a.type !== 'buff' && a.type !== 'heal') h.face = Math.atan2(nx, nz);
    const dmg = a.dmg ? (a.dmg[0] + a.dmg[1] * L + a.dmg[2] * h.atk) * (1 + h.ap) : 0;
    this.sfx(a.type === 'heal' ? 'heal' : 'cast', h.x, h.z, a.ult ? 1.2 : 0.8);
    this.fx.ring(h.x, h.z, a.ult ? 3.5 : 2, col, 0.4);
    if (a.ult) this.fx.pillar(h.x, h.z, col, 1.6, 40, 9);
    if (a.type === 'proj') {
      this.projs.push(this.mkProj({ x: h.x + nx, y: 1.7, z: h.z + nz, vx: nx * a.speed, vz: nz * a.speed, left: a.range, width: a.width, pierce: a.pierce, dmg, src: h, color: col, a, hit: new Set(), size: a.ult ? 0.75 : 0.45 }));
    } else if (a.type === 'aoe') {
      const r = Math.min(d, a.range);
      const x = a.range ? h.x + nx * r : h.x, z = a.range ? h.z + nz * r : h.z;
      this.pending.push({ x, z, t: a.delay, a, dmg, src: h, color: col });
      this.fx.telegraph(x, z, a.radius, col, a.delay);
    } else if (a.type === 'dash') {
      const r = Math.max(2, Math.min(d, a.range));
      const tx2 = Math.max(MAP.minX, Math.min(MAP.maxX, h.x + nx * r)), tz2 = Math.max(MAP.minZ, Math.min(MAP.maxZ, h.z + nz * r));
      h.moveTo = null;
      if (a.blink) {
        this.fx.burst(h.x, 1.5, h.z, col, 30, 6, 0.5, 0.5);
        h.x = tx2; h.z = tz2; this.dashArrive(h, a, dmg);
      } else h.dash = { x: tx2, z: tz2, a, dmg, total: r, y: 0 };
    } else if (a.type === 'buff') {
      const who = a.team ? this.heroes.filter((o) => o.team === h.team && !o.dead && dist(o, h) <= a.team) : [h];
      for (const o of who) {
        o.buffs.push({ t: a.dur, spd: a.spd, as: a.as, atk: a.atk, arm: a.def });
        if (a.shield) { o.shield = Math.max(o.shield, (a.shield[0] + a.shield[1] * L) * (1 + h.ap)); o.shieldT = a.dur; }
        this.fx.pillar(o.x, o.z, col, 1.2, 20, 5); this.fx.ring(o.x, o.z, 2.6, col, 0.6);
      }
    } else if (a.type === 'heal') {
      const amt = (a.heal[0] + a.heal[1] * L) * (1 + h.ap) * (h.passive === 'healboost' ? 1.25 : 1);
      this.fx.ring(h.x, h.z, a.radius, col, 0.7); this.fx.ring(h.x, h.z, a.radius, 0xffffff, 0.5, { fill: true, opacity: 0.25 });
      for (const o of this.units) {
        if (o.team !== h.team || o.dead || o.struct || dist(o, h) > a.radius) continue;
        this.heal(o, o.kind === 'hero' ? amt : amt * 0.5);
        if (a.shield && o.kind === 'hero') { o.shield = Math.max(o.shield, a.shield[0] + a.shield[1] * L); o.shieldT = 5; }
        this.fx.pillar(o.x, o.z, col, 0.8, o.kind === 'hero' ? 22 : 6, 5);
      }
    }
    return true;
  }

  dashArrive(h, a, dmg) {
    const col = h.pal.fx;
    this.fx.burst(h.x, 1, h.z, col, a.ult ? 70 : 26, a.ult ? 12 : 7, 0.55, 0.6, { flat: true, up: 0.15 });
    if (a.radius && dmg) {
      this.areaHit(h, h.x, h.z, a.radius, dmg, a);
      this.fx.ring(h.x, h.z, a.radius, col, 0.45); this.fx.ring(h.x, h.z, a.radius, col, 0.3, { fill: true, opacity: 0.35 });
      this.sfx(a.ult ? 'boom' : 'hit', h.x, h.z, 1);
      if (a.ult && dist(h, this.player) < 25) this.shake = Math.max(this.shake, 0.6);
    }
  }

  // ---------- player commands ----------
  aimFor(a) {
    const p = this.player, inp = this.input;
    if (inp.mouseActive && inp.mouse) return inp.mouse;
    const joy = Math.hypot(inp.joy.x, inp.joy.y) > 0.2;
    const noDmg = a.type === 'dash' && !a.dmg[0];
    if (noDmg) { const fx = joy ? inp.joy.x : Math.sin(p.face), fz = joy ? inp.joy.y : Math.cos(p.face); return { x: p.x + fx * a.range, z: p.z + fz * a.range }; }
    const reach = (a.range || a.radius || 6) + (a.type === 'dash' ? a.radius * 0.6 : 1);
    const tg = this.nearest(p, reach, (o) => o.kind === 'hero') || this.nearest(p, reach, (o) => !o.struct);
    if (tg) return { x: tg.x, z: tg.z };
    return { x: p.x + Math.sin(p.face) * (a.range || 1), z: p.z + Math.cos(p.face) * (a.range || 1) };
  }
  playerCast(i) { const a = this.player.data.abil[i], p = this.aimFor(a); return this.cast(this.player, i, p.x, p.z); }
  attackNearest() {
    const p = this.player; if (p.dead) return;
    const tg = this.nearest(p, 14, (o) => o.kind === 'hero') || this.nearest(p, 14, (o) => o.kind !== 'monster') || this.nearest(p, 9);
    if (tg) { p.attackTarget = tg; p.moveTo = null; p.recallT = 0; }
  }
  recall() { const p = this.player; if (!p.dead && !p.dash && p.recallT <= 0) { p.recallT = 4; p.moveTo = null; p.attackTarget = null; } }
  canShop(h = this.player) { return h.dead || dist(h, SPAWN[h.team]) < 16; }
  // price after trading in any components the hero already holds
  price(h, it) { return it.cost - (it.from || []).reduce((n, c) => n + (h.items.includes(c) ? ITEM[c].cost : 0), 0); }
  buy(h, id) {
    const it = ITEM[id];
    if (!it || h.items.includes(id)) return false;
    const keep = h.items.filter((x) => !(it.from || []).includes(x)), cost = this.price(h, it);
    if (keep.length >= 6 || h.gold < cost) return false;
    if (h.isPlayer && !this.canShop(h)) return false;
    h.gold -= cost; h.items = keep; h.items.push(id); this.recalc(h);
    if (h.isPlayer) this.audio.play('coin');
    return true;
  }
  command(x, z) {
    const p = this.player; if (p.dead) return;
    let best = null, bd = 2.6;
    for (const o of this.units) { if (o.team === p.team || !this.targetable(o) || !this.sees(0, o)) continue; const d = Math.hypot(o.x - x, o.z - z) - o.r; if (d < bd) { bd = d; best = o; } }
    p.recallT = 0;
    if (best) { p.attackTarget = best; p.moveTo = null; this.fx.ring(best.x, best.z, best.r + 1, 0xff5a4a, 0.35, { from: best.r + 2 }); }
    else { p.attackTarget = null; p.moveTo = { x: Math.max(MAP.minX, Math.min(MAP.maxX, x)), z: Math.max(MAP.minZ, Math.min(MAP.maxZ, z)) }; this.fx.ring(x, z, 0.3, 0x7dffb0, 0.4, { from: 1.6 }); }
  }

  groundAt(cx, cy) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    v3.set(((cx - rect.left) / rect.width) * 2 - 1, -((cy - rect.top) / rect.height) * 2 + 1, 0.5);
    this.raycaster.setFromCamera(v3, this.camera);
    const hit = this.raycaster.ray.intersectPlane(this.plane, new THREE.Vector3());
    return hit ? { x: hit.x, z: hit.z } : null;
  }

  bind() {
    const el = this.renderer.domElement, inp = this.input;
    this._h = {
      down: (e) => {
        this.audio.unlock();
        const g = this.groundAt(e.clientX, e.clientY); if (!g || this.paused) return;
        inp.mouseActive = e.pointerType === 'mouse'; if (inp.mouseActive) inp.mouse = g;
        this.command(g.x, g.z);
      },
      move: (e) => { if (e.pointerType === 'mouse') { inp.mouseActive = true; inp.mouse = this.groundAt(e.clientX, e.clientY) || inp.mouse; inp.mc = [e.clientX, e.clientY]; } },
      ctx: (e) => e.preventDefault(),
      wheel: (e) => { this.zoom = Math.max(0.7, Math.min(1.35, this.zoom + Math.sign(e.deltaY) * 0.06)); },
      key: (e) => {
        const k = e.key.toLowerCase(); inp.keys[k] = e.type === 'keydown';
        if (e.type !== 'keydown' || e.repeat) return;
        const i = 'qwer'.indexOf(k);
        if (k === 'tab') { e.preventDefault(); this.ui.board(); }
        else if (k === 'escape') this.ui.pause();
        else if (this.paused) return;
        else if (i >= 0 && k.length === 1) { if (e.ctrlKey || e.shiftKey || e.altKey) { this.rankUp(this.player, i); e.preventDefault(); } else this.playerCast(i); }
        else if (k === 'd') this.playerSpell(0);
        else if (k === 'f') this.playerSpell(1);
        else if (k === 'b') this.recall();
        else if (k === 'p') this.ui.shop();
        else if (k === ' ') { this.attackNearest(); e.preventDefault(); }
      },
    };
    el.addEventListener('pointerdown', this._h.down); el.addEventListener('pointermove', this._h.move);
    el.addEventListener('contextmenu', this._h.ctx); el.addEventListener('wheel', this._h.wheel, { passive: true });
    window.addEventListener('keydown', this._h.key); window.addEventListener('keyup', this._h.key);
  }
  dispose() {
    const el = this.renderer.domElement;
    el.removeEventListener('pointerdown', this._h.down); el.removeEventListener('pointermove', this._h.move);
    el.removeEventListener('contextmenu', this._h.ctx); el.removeEventListener('wheel', this._h.wheel);
    window.removeEventListener('keydown', this._h.key); window.removeEventListener('keyup', this._h.key);
    this.scene.traverse((o) => { if (o.geometry && !Object.values(GEO).includes(o.geometry)) o.geometry.dispose(); if (o.material) { o.material.map?.dispose(); o.material.dispose?.(); } });
    this.composer?.dispose?.();
    this.ctx2d.clearRect(0, 0, this.overlay.width, this.overlay.height);
  }

  // ---------- AI ----------
  botBuy(h) {
    const next = ITEM[BUILD[h.data.role].find((id) => !h.items.includes(id))];
    if (!next) return;
    if (this.buy(h, next.id)) return;
    for (const c of next.from || []) if (!h.items.includes(c) && this.buy(h, c)) return;
  }

  botCast(h, tg, minionOnly) {
    const b = h.bot; if (b.castT > 0) return;
    const d = dist(h, tg), hpR = h.hp / h.maxHp;
    for (const i of [3, 0, 2, 1]) {
      const a = h.data.abil[i];
      if (!h.ranks[i] || h.cds[i] > 0 || h.mp < a.mana) continue;
      if (minionOnly && (a.ult || h.mp < h.maxMp * 0.55 || Math.random() > 0.25 || (a.type !== 'proj' && a.type !== 'aoe'))) continue;
      let ok = false;
      if (a.type === 'proj') ok = d < a.range * 0.85;
      else if (a.type === 'aoe') ok = a.range ? d < a.range + a.radius * 0.4 : d < a.radius * 0.85;
      else if (a.type === 'dash') ok = a.dmg[0] > 0 && d < a.range + a.radius * 0.5 && hpR > 0.4 && (!a.ult || tg.hp / tg.maxHp < 0.75);
      else if (a.type === 'buff') ok = d < 9;
      else if (a.type === 'heal') ok = this.heroes.some((o) => o.team === h.team && !o.dead && dist(o, h) < a.radius && o.hp / o.maxHp < (a.ult ? 0.45 : 0.65));
      if (ok && this.cast(h, i, tg.x + (Math.random() - 0.5) * 1.5, tg.z + (Math.random() - 0.5) * 1.5)) { b.castT = 0.6 + Math.random() * 0.9; return; }
    }
  }

  botThink(h) {
    const b = h.bot, mine = h.team, dir = mine === 0 ? 1 : -1, home = SPAWN[mine], hpR = h.hp / h.maxHp;
    this.botBuy(h);
    if (b.roam && (b.roamT -= 0.22) <= 0) { b.roamT = 35 + Math.random() * 25; b.lane = LANE_NAMES[(Math.random() * 3) | 0]; }
    const flee = () => { h.attackTarget = null; h.moveTo = { x: home.x, z: home.z + (h.slot - 2) * 2.4 }; };
    if (b.retreat) {
      if (hpR > 0.88) b.retreat = false;
      else {
        flee();
        const hi = h.data.abil.findIndex((a, i) => a.type === 'heal' && h.ranks[i] && h.cds[i] <= 0);
        if (hpR < 0.4) this.spell(h, 1, h.x, h.z);
        const foeNear = this.nearest(h, 7, (o) => o.kind === 'hero');
        if (foeNear && hpR < 0.25) this.spell(h, 0, home.x, home.z);
        if (hi >= 0) this.cast(h, hi, h.x, h.z);
        const esc = h.data.abil.findIndex((a, i) => a.type === 'dash' && !a.ult && h.ranks[i] && h.cds[i] <= 0);
        if (esc >= 0 && foeNear) this.cast(h, esc, home.x, home.z);
        return;
      }
    }
    if (hpR < 0.3) { b.retreat = true; flee(); return; }
    let eh = null, ehD = 13, em = null, emS = 1e9, es = null, esD = 14, tw = null, twD = 12.5;
    for (const u of this.units) {
      if (u.team === mine || u.dead || !this.sees(mine, u)) continue;
      const d = dist(h, u) - u.r;
      if (u.struct && d < twD + (u.kind === 'core' ? 1 : 0)) { tw = u; twD = d; }
      if (u.prot) continue;
      if (u.kind === 'hero') { if (d < ehD) { eh = u; ehD = d; } }
      else if (u.kind === 'minion') { if (d < 12) { const s = d + (u.hp / u.maxHp) * 5; if (s < emS) { em = u; emS = s; } } }
      else if (u.struct) { if (d < esD) { es = u; esD = d; } }
      else if (u.kind === 'monster' && u.target === h && d < 8) { em = u; emS = -1; }
    }
    const tanked = (t2) => this.units.some((u) => u.kind === 'minion' && u.team === mine && !u.dead && dist(u, t2) < t2.range);
    if (tw && (!tanked(tw) || tw.target === h)) { h.attackTarget = null; h.moveTo = { x: h.x - dir * 9, z: h.z }; return; }
    if (eh) {
      const etw = this.towers.find((o) => o.team !== mine && !o.dead && dist(o, eh) < o.range);
      const want = !(etw && !tanked(etw)) && eh.hp / eh.maxHp < hpR + 0.3;
      if (want) { h.attackTarget = eh; h.moveTo = null; this.botCast(h, eh); return; }
      this.botCast(h, eh);
      if (ehD < 6 && hpR < 0.55) { h.attackTarget = null; h.moveTo = { x: h.x - dir * 7, z: h.z }; return; }
    }
    if (em) { h.attackTarget = em; h.moveTo = null; this.botCast(h, em, true); return; }
    if (es) { h.attackTarget = es; h.moveTo = null; return; }
    // advance with the lane's front soldier, or hold at the outermost friendly tower
    let front = null, fv = -1e9;
    for (const u of this.units) if (u.kind === 'minion' && u.team === mine && !u.dead && u.lane === b.lane && u.x * dir > fv) { fv = u.x * dir; front = u; }
    h.attackTarget = null;
    if (front) h.moveTo = { x: front.x - dir * 3.5, z: front.z + (h.slot - 2) * 0.8 };
    else {
      const hold = this.towers.filter((o) => o.team === mine && o.lane === b.lane && !o.dead).sort((p, q) => q.x * dir - p.x * dir)[0];
      const lz = b.lane === 'top' ? -36 : b.lane === 'bot' ? 36 : 0;
      h.moveTo = hold ? { x: hold.x - dir * 2, z: lz } : { x: CORE[mine].x + dir * 8, z: lz * 0.2 };
    }
  }

  // ---------- frame ----------
  update(dt) {
    this.time += dt;
    const p = this.player, inp = this.input;
    if (this.over) { this.over.t += dt; if (this.over.t > 4.5 && !this.over.sent) { this.over.sent = true; this.onEnd({ win: this.over.win, k: p.k, d: p.d, a: p.a, cs: p.cs, level: p.level, time: this.time }); } }

    this.waveT -= dt;
    if (this.waveT <= 0 && !this.over) { this.waveT = 24; this.spawnWave(); if (this.waveN === 1) this.ui.announce(t('waveSpawn')); }
    if ((this.visT -= dt) <= 0) { this.visT = 0.12; this.vision(); }
    for (const c of this.camps) if (!c.unit) { c.respawn -= dt; if (c.respawn <= 0) this.spawnMonster(c); }

    // heroes
    for (const h of this.heroes) {
      if (h.dead) {
        h.respawnT -= dt;
        if (h.respawnT <= 0 && !this.over) {
          const sp = SPAWN[h.team]; h.dead = false; h.x = sp.x; h.z = sp.z + (h.slot - 2) * 2.6; h.hp = h.maxHp; h.mp = h.maxMp;
          h.obj.userData.anim.dead = 0; h.stunT = 0; h.slowT = 0; if (h.bot) h.bot.retreat = false;
          this.fx.pillar(h.x, h.z, h.pal.fx, 1.5, 40, 9);
        }
        continue;
      }
      this.recalc(h);
      h.gold += dt * 2;
      for (let i = 0; i < 4; i++) h.cds[i] = Math.max(0, h.cds[i] - dt);
      for (const q of h.spells) q.cd = Math.max(0, q.cd - dt);
      for (let i = h.buffs.length - 1; i >= 0; i--) if ((h.buffs[i].t -= dt) <= 0) h.buffs.splice(i, 1);
      if (h.shieldT > 0 && (h.shieldT -= dt) <= 0) h.shield = 0;
      h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (h.passive === 'regen' && this.time - (h.combatT ?? -9) > 5 ? 0.02 : 0.006) * dt); h.mp = Math.min(h.maxMp, h.mp + h.maxMp * 0.016 * dt);
      const fd = dist(h, SPAWN[h.team]);
      if (fd < 9) { h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.16 * dt); h.mp = Math.min(h.maxMp, h.mp + h.maxMp * 0.2 * dt); }
      if (dist(h, SPAWN[1 - h.team]) < 9) this.damage(this.cores[1 - h.team], h, 320 * dt, { pure: true });
      if (h.dead) continue;

      if (h.stunT > 0) { h.moving = false; continue; }
      if (h.dash) {
        const D = h.dash, d = Math.hypot(D.x - h.x, D.z - h.z), sp = 42 * dt;
        this.fx.trail(h.x, 1.4, h.z, h.pal.fx, 0.8, 0.4, 0.8);
        if (d <= sp) { h.x = D.x; h.z = D.z; h.dash = null; h.obj.position.y = 0; this.dashArrive(h, D.a, D.dmg); }
        else { h.x += (D.x - h.x) / d * sp; h.z += (D.z - h.z) / d * sp; h.obj.position.y = Math.sin((1 - d / D.total) * Math.PI) * (D.a.ult ? 4 : 1.2); }
        h.moving = true; continue;
      }
      if (h.bot) {
        h.bot.castT -= dt;
        if ((h.bot.think -= dt) <= 0) { h.bot.think = 0.22; this.botThink(h); }
      } else {
        let mx = inp.joy.x, mz = inp.joy.y;
        const K = inp.keys;
        if (K.arrowleft) mx -= 1; if (K.arrowright) mx += 1; if (K.arrowup) mz -= 1; if (K.arrowdown) mz += 1;
        const ml = Math.hypot(mx, mz);
        if (ml > 0.15) {
          h.moveTo = null; h.attackTarget = null; h.autoT = null; h.recallT = 0;
          this.step(h, h.x + mx / ml * 3, h.z + mz / ml * 3, dt);
          continue;
        }
        if (h.recallT > 0) {
          h.moving = false; h.recallT -= dt;
          if (Math.random() < 0.6) this.fx.pillar(h.x, h.z, 0x7ad8ff, 1.3, 2, 6);
          if (h.recallT <= 0) { const sp = SPAWN[0]; h.x = sp.x; h.z = sp.z; this.fx.pillar(h.x, h.z, 0x7ad8ff, 2, 50, 10); this.audio.play('heal'); }
          continue;
        }
        if (!h.attackTarget && !h.moveTo) {
          if (!h.autoT || !this.targetable(h.autoT) || dist(h, h.autoT) - h.autoT.r > h.range + 4)
            h.autoT = this.nearest(h, h.range + 2.5, (o) => o.kind !== 'monster' || o.target === h);
          if (h.autoT) { this.engage(h, h.autoT, dt); continue; }
        }
      }
      if (h.attackTarget) { if (!this.engage(h, h.attackTarget, dt)) { h.attackTarget = null; h.moving = false; } }
      else if (h.moveTo) { if (this.step(h, h.moveTo.x, h.moveTo.z, dt)) h.moveTo = null; }
      else h.moving = false;
    }

    // soldiers, towers, monsters
    for (const u of this.units) {
      u.atkCd -= dt; if (u.slowT > 0) u.slowT -= dt;
      if (u.dead || u.kind === 'hero') continue;
      if (u.stunT > 0) { u.stunT -= dt; u.moving = false; continue; }
      u.scanT -= dt;
      if (u.kind === 'minion') {
        if (u.scanT <= 0) { u.scanT = 0.3; if (!u.target || !this.targetable(u.target) || dist(u, u.target) > 11) u.target = this.nearest(u, 8.5, (o) => o.kind !== 'monster'); }
        if (u.target && this.engage(u, u.target, dt)) continue;
        u.target = null;
        const w = u.path[Math.min(u.wp, u.path.length - 1)];
        if (this.step(u, w.x, w.z, dt) || Math.hypot(w.x - u.x, w.z - u.z) < 2.5) u.wp = Math.min(u.wp + 1, u.path.length - 1);
      } else if (u.struct) {
        if (u.scanT <= 0) {
          u.scanT = 0.25;
          if (!u.target || !this.targetable(u.target) || dist(u, u.target) - u.target.r > u.range)
            u.target = this.nearest(u, u.range, (o) => o.kind === 'minion') || this.nearest(u, u.range, (o) => o.kind === 'hero');
        }
        if (u.target && u.atkCd <= 0 && this.targetable(u.target)) this.basicAttack(u, u.target);
      } else if (u.kind === 'monster') {
        const home = Math.hypot(u.x - u.camp.x, u.z - u.camp.z);
        if (u.target && (!this.targetable(u.target) || home > 13 || dist(u, u.target) > 15)) u.target = null;
        if (u.target) this.engage(u, u.target, dt);
        else { if (home > 0.5) this.step(u, u.camp.x, u.camp.z, dt); else u.moving = false; u.hp = Math.min(u.maxHp, u.hp + u.maxHp * 0.1 * dt); }
      }
    }
    for (const h of this.heroes) if (h.stunT > 0) h.stunT -= dt;

    // projectiles
    for (let i = this.projs.length - 1; i >= 0; i--) {
      const q = this.projs[i]; let done = false;
      if (q.homing) {
        const tg = q.homing, ty = Math.min(2, tg.h * 0.45);
        const dx = tg.x - q.x, dy = ty - q.y, dz = tg.z - q.z, d = Math.hypot(dx, dy, dz), sp = q.speed * dt;
        if (tg.dead) done = true;
        else if (d <= sp + tg.r * 0.6) { this.damage(q.src, tg, q.dmg, { basic: true, crit: q.crit }); this.fx.burst(tg.x, ty, tg.z, q.color, 6, 4, 0.35, 0.3); if (q.src.struct) this.sfx('hit', tg.x, tg.z, 0.8); done = true; }
        else { q.x += dx / d * sp; q.y += dy / d * sp; q.z += dz / d * sp; }
        if (Math.random() < 0.7) this.fx.trail(q.x, q.y, q.z, q.color, q.size * 1.6, 0.22, 0.1);
      } else {
        const sx = q.vx * dt, sz = q.vz * dt; q.x += sx; q.z += sz; q.left -= Math.hypot(sx, sz);
        this.fx.trail(q.x, q.y, q.z, q.color, q.size * 2.2, 0.4, 0.3); this.fx.trail(q.x, q.y, q.z, 0xffffff, q.size, 0.2, 0.2);
        for (const o of this.units) {
          if (o.team === q.team || o.struct || !this.targetable(o) || q.hit.has(o.id) || Math.hypot(o.x - q.x, o.z - q.z) > q.width + o.r) continue;
          q.hit.add(o.id); this.damage(q.src, o, q.dmg); this.applyCC(o, q.a);
          this.fx.burst(o.x, 1.5, o.z, q.color, 18, 7, 0.5, 0.45); this.fx.ring(o.x, o.z, 2.2, q.color, 0.3); this.sfx('hit', o.x, o.z, 1);
          if (!q.pierce) { done = true; break; }
        }
        if (q.left <= 0) done = true;
      }
      q.mesh.position.set(q.x, q.y, q.z);
      if (done) { this.scene.remove(q.mesh); this.projs.splice(i, 1); }
    }

    // delayed area strikes
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const s = this.pending[i]; s.t -= dt;
      if (s.a.meteor && s.t < 0.5 && s.t > 0) { const k = s.t / 0.5; for (let j = 0; j < 4; j++) this.fx.trail(s.x - k * 8, 1 + k * 26, s.z - k * 5, j % 2 ? 0xffffff : s.color, 1.6, 0.5, 1.2); }
      if (s.t <= 0) {
        this.areaHit(s.src, s.x, s.z, s.a.radius, s.dmg, s.a);
        const big = s.a.ult;
        this.fx.ring(s.x, s.z, s.a.radius, s.color, 0.5); this.fx.ring(s.x, s.z, s.a.radius, 0xffffff, 0.3, { fill: true, opacity: 0.5 });
        this.fx.burst(s.x, 0.6, s.z, s.color, big ? 110 : 40, big ? 13 : 8, 0.65, big ? 1 : 0.6);
        if (big) { this.fx.burst(s.x, 0.6, s.z, 0xffffff, 40, 16, 0.5, 0.5, { flat: true, up: 0.05 }); this.fx.ring(s.x, s.z, s.a.radius * 1.6, s.color, 0.8); if (dist(s, p) < 28) this.shake = Math.max(this.shake, 0.8); }
        this.sfx('boom', s.x, s.z, big ? 1.3 : 0.8);
        this.pending.splice(i, 1);
      }
    }

    this.collide();
    this.cleanup(dt);
  }

  collide() {
    const us = this.units, n = us.length;
    for (let i = 0; i < n; i++) {
      const a = us[i]; if (a.dead || a.struct) continue;
      for (let j = i + 1; j < n; j++) {
        const b = us[j]; if (b.dead || b.struct) continue;
        const dx = b.x - a.x, dz = b.z - a.z, rr = (a.r + b.r) * 0.85, d2 = dx * dx + dz * dz;
        if (d2 >= rr * rr || d2 < 1e-6) continue;
        const d = Math.sqrt(d2), push = (rr - d) * 0.5, wa = a.dash ? 0 : b.kind === 'hero' && a.kind !== 'hero' ? 0.8 : 0.5;
        a.x -= dx / d * push * wa * 2; a.z -= dz / d * push * wa * 2;
        if (!b.dash) { b.x += dx / d * push * (1 - wa) * 2; b.z += dz / d * push * (1 - wa) * 2; }
      }
      if (a.dash) continue;
      const solid = (ox, oz, or) => {
        const dx = a.x - ox, dz = a.z - oz, rr = or + a.r * 0.6, d2 = dx * dx + dz * dz;
        if (d2 < rr * rr) {
          const d = Math.sqrt(d2) || 0.01, nx = dx / d, nz = dz / d; a.x = ox + nx * rr; a.z = oz + nz * rr;
          // slide around the obstacle toward wherever the unit is heading
          if (a.moving) { const sg = (-nz * Math.sin(a.face) + nx * Math.cos(a.face)) >= 0 ? 1 : -1; a.x += -nz * sg * 0.09; a.z += nx * sg * 0.09; }
        }
      };
      for (const s of this.towers) if (!s.dead) solid(s.x, s.z, s.r);
      for (const s of this.cores) if (!s.dead) solid(s.x, s.z, s.r);
      if (a.kind !== 'minion') for (const g of GROVES) solid(g.x, g.z, g.r);
      a.x = Math.max(MAP.minX, Math.min(MAP.maxX, a.x)); a.z = Math.max(MAP.minZ, Math.min(MAP.maxZ, a.z));
    }
  }

  cleanup(dt) {
    for (let i = this.units.length - 1; i >= 0; i--) {
      const u = this.units[i];
      if (u.removeT !== undefined && u.dead && (u.removeT -= dt) <= 0) { this.scene.remove(u.obj); this.units.splice(i, 1); }
    }
  }

  // visuals that run even while paused-free; called every frame after update
  animate(dt) {
    const p = this.player, T = this.time;
    for (const u of this.units) {
      const o = u.obj;
      if (u.struct) {
        const c = o.userData.crystal;
        if (u.wreckT) { u.wreckT += dt; const k = Math.min(1, u.wreckT / 1.2); o.scale.y = 1 - k * 0.82; o.rotation.z = k * 0.12; c.visible = false; if (o.userData.halo) o.userData.halo.visible = false; o.userData.rings?.forEach((r) => (r.visible = false)); if (o.userData.inner) o.userData.inner.visible = false; continue; }
        c.rotation.y += dt * 1.2; c.position.y = (u.kind === 'core' ? 5.2 : 8.2) + Math.sin(T * 2 + u.id) * 0.25;
        if (o.userData.halo) { o.userData.halo.position.y = c.position.y; o.userData.halo.rotation.z += dt; }
        if (o.userData.rings) { o.userData.rings[0].rotation.y += dt * 0.9; o.userData.rings[1].rotation.z += dt * 0.7; o.userData.inner.rotation.y -= dt * 2; }
        continue;
      }
      o.position.x = u.x; o.position.z = u.z; if (!u.dash) o.position.y = 0;
      let df = u.face - o.rotation.y; df = Math.atan2(Math.sin(df), Math.cos(df)); o.rotation.y += df * Math.min(1, dt * 14);
      const a = o.userData.anim;
      if (u.dead) a.dead += dt;
      o.visible = this.sees(0, u) && !(u.kind === 'hero' && u.dead && a.dead > 3);
      animateUnit(o, dt, u.moving && !u.dead && u.stunT <= 0, u.spd);
      if (u.kind === 'hero' && !u.dead) {
        if (u.shield > 0 && Math.random() < 0.5) { const an = Math.random() * 6.28; this.fx.spawn(u.x + Math.cos(an) * 1.3, 0.5 + Math.random() * 2.5, u.z + Math.sin(an) * 1.3, 0, 1, 0, 0x9fe8ff, 0.35, 0.4); }
        if (u.stunT > 0 && Math.random() < 0.4) { const an = T * 8; this.fx.spawn(u.x + Math.cos(an) * 0.7, 3.8, u.z + Math.sin(an) * 0.7, 0, 0, 0, 0xffe27a, 0.4, 0.3); }
        if (u.buffs.length && Math.random() < 0.4) this.fx.trail(u.x, 0.3, u.z, u.pal.fx, 0.4, 0.5, 1.2);
        if (this.bossBuff[u.team] > T && Math.random() < 0.25) this.fx.trail(u.x, 0.4, u.z, 0xc070ff, 0.4, 0.6, 1.4);
      }
    }
    this.playerMark.position.y = 5.2 + Math.sin(T * 4) * 0.2; this.playerMark.rotation.y += dt * 3;
    // ambient fireflies around the camera
    if (Math.random() < 0.5) this.fx.spawn(this.camT.x + (Math.random() - 0.5) * 60, 0.5 + Math.random() * 4, this.camT.z + (Math.random() - 0.5) * 40, (Math.random() - 0.5), 0.3, (Math.random() - 0.5), 0xd8ff9a, 0.22, 2.5, 0, 0.2);
    this.fx.update(dt);
    this.env.water.material.uniforms.t.value = T;
    if ((this.fogT -= dt) <= 0) {
      this.fogT = 0.1;
      const g = this.env.fogCtx;
      g.globalCompositeOperation = 'source-over'; g.fillStyle = 'rgb(88,96,118)'; g.fillRect(0, 0, 200, 116);
      g.globalCompositeOperation = 'lighter';
      for (const u of this.units) {
        if (u.team !== 0 || u.dead) continue;
        const r = (u.kind === 'hero' ? 17 : u.kind === 'minion' ? 11 : 15) + 1, x = u.x + 100, y = u.z + 58;
        const gr = g.createRadialGradient(x, y, r * 0.55, x, y, r); gr.addColorStop(0, 'rgb(170,162,140)'); gr.addColorStop(1, 'rgba(170,162,140,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      }
      this.env.fogTex.needsUpdate = true;
    }

    // camera
    const f = this.camFocus || p;
    const k = Math.min(1, dt * (this.camFocus ? 2 : 7));
    this.camT.x += (f.x - this.camT.x) * k; this.camT.z += (f.z - this.camT.z) * k;
    const asp = this.camera.aspect, z = this.zoom * Math.max(1, 1.25 / asp);
    this.shake = Math.max(0, this.shake - dt * 2.2);
    const sx = (Math.random() - 0.5) * this.shake * 1.2, sz = (Math.random() - 0.5) * this.shake * 1.2;
    this.camera.position.set(this.camT.x + sx, 27 * z, this.camT.z + 18.5 * z + sz);
    this.camera.lookAt(this.camT.x + sx, 0, this.camT.z - 2.5 + sz);
    const sun = this.env.sun; sun.position.set(this.camT.x - 25, 48, this.camT.z + 22); sun.target.position.set(this.camT.x, 0, this.camT.z - 4);
  }

  frame(dt) {
    if (!this.paused) {
      const slow = this.over ? 0.45 : 1;
      this.update(dt * slow); this.animate(dt * slow);
    }
    if (this.composer) this.composer.render(); else this.renderer.render(this.scene, this.camera);
    this.drawOverlay(dt);
  }

  resize(w, h, pr) {
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.composer?.setPixelRatio(pr); this.composer?.setSize(w, h);
    this.fx.mat.uniforms.scale.value = h * pr * 0.75;
    this.overlay.width = Math.round(w * pr); this.overlay.height = Math.round(h * pr);
    this.vw = w; this.vh = h; this.pr = pr;
  }

  // ---------- 2D overlay: health bars, floating numbers ----------
  drawOverlay(dt) {
    const g = this.ctx2d, W = this.overlay.width, H = this.overlay.height, pr = this.pr || 1;
    g.clearRect(0, 0, W, H);
    const s = Math.max(0.75, Math.min(1.25, this.vh / 760)) * pr;
    const proj = (x, y, z) => { v3.set(x, y, z).project(this.camera); return v3.z > 1 ? null : [(v3.x * 0.5 + 0.5) * W, (-v3.y * 0.5 + 0.5) * H]; };
    const p = this.player;
    g.textAlign = 'center'; g.lineJoin = 'round';
    for (const u of this.units) {
      if (u.dead || !this.sees(0, u)) continue;
      if (Math.abs(u.x - this.camT.x) > 55 || Math.abs(u.z - this.camT.z) > 42) continue;
      if (u.kind === 'monster' && u.hp >= u.maxHp && !u.big) continue;
      const q = proj(u.x, u.h + (u.dash ? u.obj.position.y : 0), u.z); if (!q) continue;
      const hero = u.kind === 'hero';
      const w = (hero ? 78 : u.struct ? 96 : u.kind === 'monster' ? (u.big ? 110 : 56) : 36) * s, h = (hero ? 9 : u.struct ? 8 : 5) * s;
      const x = q[0] - w / 2, y = q[1] - h;
      const ally = u.team === p.team;
      g.fillStyle = 'rgba(8,12,18,0.85)'; g.fillRect(x - 1.5 * s, y - 1.5 * s, w + 3 * s, h + 3 * s + (hero ? 4 * s : 0));
      const r = Math.max(0, u.hp / u.maxHp);
      g.fillStyle = u === p ? '#4ade80' : u.team === 2 ? '#e0b060' : ally ? '#38bdf8' : '#f0524a';
      g.fillRect(x, y, w * r, h);
      if (u.shield > 0) { g.fillStyle = 'rgba(255,255,255,0.85)'; g.fillRect(x + w * r, y, Math.min(w * (1 - r), w * u.shield / u.maxHp), h); }
      if (hero) {
        g.fillStyle = 'rgba(0,0,0,0.35)'; const seg = 250 / u.maxHp * w; for (let sx = seg; sx < w * r; sx += seg) g.fillRect(x + sx, y, 1 * s, h);
        g.fillStyle = '#5b8cff'; g.fillRect(x, y + h + 1 * s, w * (u.mp / u.maxMp), 3 * s);
        g.font = `700 ${11 * s}px system-ui,sans-serif`; g.lineWidth = 3 * s; g.strokeStyle = 'rgba(0,0,0,0.8)';
        const label = u.name; g.strokeText(label, q[0], y - 5 * s); g.fillStyle = u === p ? '#ffe27a' : ally ? '#cfe8ff' : '#ffc9c4'; g.fillText(label, q[0], y - 5 * s);
        // level badge
        g.fillStyle = '#10161f'; g.beginPath(); g.arc(x - 9 * s, y + h / 2 + 1 * s, 9 * s, 0, 7); g.fill();
        g.strokeStyle = ally ? '#38bdf8' : '#f0524a'; g.lineWidth = 1.5 * s; g.stroke();
        g.fillStyle = '#fff'; g.font = `700 ${10 * s}px system-ui,sans-serif`; g.fillText(u.level, x - 9 * s, y + h / 2 + 4.5 * s);
        if (u.stunT > 0) { g.font = `${14 * s}px system-ui`; g.fillText('💫', q[0], y - 20 * s); }
      }
      if (u.prot) { g.font = `${13 * s}px system-ui`; g.fillText('🔒', q[0], y - 6 * s); }
    }
    // floating combat text
    for (let i = this.floats.length - 1; i >= 0; i--) {
      const f = this.floats[i]; f.t += dt;
      if (f.t > 1) { this.floats.splice(i, 1); continue; }
      const q = proj(f.x, f.y + f.t * 2.4, f.z); if (!q) continue;
      const sc = (f.big ? 19 : 14) * s * (f.t < 0.12 ? 0.6 + f.t / 0.12 * 0.6 : 1.2 - Math.min(0.2, (f.t - 0.12)));
      g.globalAlpha = Math.min(1, (1 - f.t) * 2.5); g.font = `800 ${sc}px system-ui,sans-serif`;
      g.lineWidth = 3.5 * s; g.strokeStyle = 'rgba(0,0,0,0.85)'; g.strokeText(f.text, q[0], q[1]); g.fillStyle = f.color; g.fillText(f.text, q[0], q[1]);
    }
    g.globalAlpha = 1;
    // recall bar
    if (p.recallT > 0) {
      const w = 220 * s, x = W / 2 - w / 2, y = H * 0.68;
      g.fillStyle = 'rgba(8,12,18,0.85)'; g.fillRect(x - 2, y - 2, w + 4, 12 * s + 4); g.fillStyle = '#7ad8ff'; g.fillRect(x, y, w * (1 - p.recallT / 4), 12 * s);
      g.font = `700 ${13 * s}px system-ui`; g.fillStyle = '#fff'; g.fillText(t('recalling'), W / 2, y - 8 * s);
    }
  }

  drawMinimap(g, w, h) {
    g.clearRect(0, 0, w, h);
    const X = (x) => (x + MAP.W / 2) / MAP.W * w, Z = (z) => (z + MAP.H / 2) / MAP.H * h;
    g.fillStyle = 'rgba(18,34,28,0.92)'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(190,165,110,0.55)'; g.lineWidth = w * 0.035; g.lineCap = 'round'; g.lineJoin = 'round';
    for (const name of LANE_NAMES) { g.beginPath(); g.moveTo(X(-78), Z(0)); for (const q of [...LANES[name]].reverse()) g.lineTo(X(-q[0]), Z(q[1])); for (const q of LANES[name]) g.lineTo(X(q[0]), Z(q[1])); g.stroke(); }
    g.strokeStyle = 'rgba(60,160,200,0.6)'; g.lineWidth = w * 0.03; g.beginPath(); g.moveTo(X(0), 0); g.lineTo(X(0), h); g.stroke();
    const col = ['#38bdf8', '#f0524a', '#e0b060'];
    for (const u of this.units) {
      if (u.dead || !this.sees(0, u)) continue;
      g.fillStyle = col[u.team];
      const x = X(u.x), z = Z(u.z);
      if (u.kind === 'minion') g.fillRect(x - 1, z - 1, 2.2, 2.2);
      else if (u.kind === 'tower') g.fillRect(x - 3, z - 3, 6, 6);
      else if (u.kind === 'core') { g.beginPath(); g.arc(x, z, 6, 0, 7); g.fill(); }
      else if (u.kind === 'monster') { g.beginPath(); g.arc(x, z, u.big ? 3.5 : 2, 0, 7); g.fill(); }
    }
    for (const u of this.heroes) {
      if (u.dead || !this.sees(0, u)) continue;
      g.beginPath(); g.arc(X(u.x), Z(u.z), u.isPlayer ? 5 : 4, 0, 7); g.fillStyle = u.isPlayer ? '#ffe27a' : col[u.team]; g.fill();
      g.lineWidth = 1.5; g.strokeStyle = u.isPlayer ? '#fff' : '#0b1016'; g.stroke();
    }
    g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 1;
    g.strokeRect(X(this.camT.x - 26), Z(this.camT.z - 20), X(26) - X(-26), Z(16) - Z(-20));
  }
}
