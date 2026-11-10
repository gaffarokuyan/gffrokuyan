// In-match HUD: bars, ability buttons, joystick, shop, feed.
import { ITEMS } from './data.js';
import { t, loc, abilDesc } from './i18n.js';
import { UNLOCK, xpNeed } from './game.js';

const $ = (id) => document.getElementById(id);
const ICON = { proj: '➶', aoe: '✺', dash: '➤', buff: '▲', heal: '✚' };
const hex = (n) => '#' + n.toString(16).padStart(6, '0');

export class Hud {
  constructor(audio) {
    this.audio = audio; this.game = null; this.tick = 0;
    this.mm = $('minimap').getContext('2d');
    $('atkBtn').addEventListener('pointerdown', (e) => { e.preventDefault(); this.game?.attackNearest(); });
    $('recallBtn').addEventListener('pointerdown', (e) => { e.preventDefault(); this.game?.recall(); });
    $('shopBtn').addEventListener('click', () => this.toggleShop());
    $('shopClose').addEventListener('click', () => this.toggleShop(false));
    $('shop').addEventListener('pointerdown', (e) => { if (e.target.id === 'shop') this.toggleShop(false); });
    this.bindJoystick();
  }

  bindJoystick() {
    const zone = $('joyZone'), base = $('joyBase'), knob = $('joyKnob');
    let id = null, cx = 0, cy = 0;
    const R = 48;
    const set = (x, y) => { knob.style.transform = `translate(${x}px,${y}px)`; if (this.game) { this.game.input.joy.x = x / R; this.game.input.joy.y = y / R; this.game.input.mouseActive = false; } };
    zone.addEventListener('pointerdown', (e) => {
      if (id !== null) return; id = e.pointerId; zone.setPointerCapture(id);
      const zr = zone.getBoundingClientRect();
      base.style.left = (e.clientX - zr.left - base.offsetWidth / 2) + 'px'; base.style.bottom = (zr.bottom - e.clientY - base.offsetHeight / 2) + 'px';
      cx = e.clientX; cy = e.clientY; set(0, 0); this.audio.unlock();
    });
    zone.addEventListener('pointermove', (e) => {
      if (e.pointerId !== id) return;
      let dx = e.clientX - cx, dy = e.clientY - cy; const d = Math.hypot(dx, dy);
      if (d > R) { dx *= R / d; dy *= R / d; }
      set(dx, dy);
    });
    const up = (e) => { if (e.pointerId !== id) return; id = null; set(0, 0); base.style.left = ''; base.style.bottom = ''; };
    zone.addEventListener('pointerup', up); zone.addEventListener('pointercancel', up);
  }

  attach(game) {
    this.game = game;
    const p = game.player, row = $('abilRow');
    row.innerHTML = '';
    this.btns = p.data.abil.map((a, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'act' + (a.ult ? ' ult' : ''); b.style.setProperty('--c', hex(p.pal.fx));
      b.innerHTML = `${ICON[a.type]}<span class="cd"></span><span class="key">${a.key.toUpperCase()}</span>`;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); this.audio.unlock(); game.playerCast(i); });
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') this.tip(a, i); });
      b.addEventListener('pointerleave', () => { $('tooltip').hidden = true; });
      row.appendChild(b);
      return { b, cd: b.querySelector('.cd'), state: '' };
    });
    $('announce').innerHTML = ''; $('feed').innerHTML = ''; $('respawn').hidden = true;
    document.body.classList.remove('dead');
    this.itemsKey = null;
  }

  tip(a, i) {
    const p = this.game.player, el = $('tooltip');
    el.innerHTML = `<h3>${loc(a.name)} · ${a.key.toUpperCase()}</h3><p>${abilDesc(a, p.level, p.atk)}</p><small>${t('cd')} ${a.cd}s · ${t('mana')} ${a.mana}${p.level < UNLOCK[i] ? ' · ' + t('unlockAt', { n: UNLOCK[i] }) : ''}</small>`;
    el.hidden = false;
  }

  announce(text, cls = '') {
    const box = $('announce'); const d = document.createElement('div');
    d.textContent = text; d.className = cls; box.innerHTML = ''; box.appendChild(d);
    setTimeout(() => d.remove(), 3200);
  }
  feed(a, b, team) {
    const box = $('feed'); const d = document.createElement('div');
    d.style.setProperty('--c', team === 0 ? 'var(--ally)' : 'var(--foe)');
    d.textContent = `${a}  ⚔  ${b}`; box.appendChild(d);
    while (box.children.length > 4) box.firstChild.remove();
    setTimeout(() => d.remove(), 5000);
  }

  toggleShop(on) {
    const el = $('shop'); const show = on ?? el.hidden;
    el.hidden = !show; if (show) { this.audio.play('click'); this.renderShop(); }
  }
  renderShop() {
    const g = this.game; if (!g) return; const p = g.player, can = g.canShop();
    $('shopTitle').textContent = t('shop'); $('shopHint').textContent = t('shopHint'); $('shopHint').hidden = can;
    $('shopGold').textContent = Math.floor(p.gold);
    const grid = $('itemGrid'); grid.innerHTML = '';
    for (const it of ITEMS) {
      const owned = p.items.includes(it.id), afford = p.gold >= it.cost;
      const st = [];
      if (it.atk) st.push(`+${it.atk} ${t('atk')}`); if (it.hp) st.push(`+${it.hp} ${t('hp')}`); if (it.def) st.push(`+${it.def} ${t('def')}`);
      if (it.spd) st.push(`+${it.spd} ${t('spd')}`); if (it.as) st.push(`+${it.as * 100}% ⚡`); if (it.ap) st.push(`+${Math.round(it.ap * 100)}% ✺`);
      if (it.cdr) st.push(`-${it.cdr * 100}% ${t('cd')}`); if (it.mp) st.push(`+${it.mp} ${t('mana')}`); if (it.ls) st.push(`${Math.round(it.ls * 100)}% ♥`);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'item' + (owned ? ' owned' : !afford || !can ? ' no' : '');
      b.innerHTML = `<span class="ic">${it.icon}</span><span><h3>${loc(it.name)}</h3><p>${st.join(' · ')}</p></span><span class="c">${owned ? '✓' : `<i class="coin"></i>${it.cost}`}</span>`;
      b.addEventListener('click', () => {
        if (owned) return;
        if (p.items.length >= 6) return this.toast(t('full'));
        if (!g.buy(p, it.id)) { this.audio.play('error'); if (!can) this.toast(t('shopHint')); else this.toast(t('notEnough') + ' — ' + t('coins')); }
        this.renderShop();
      });
      grid.appendChild(b);
    }
  }
  toast(msg) { const el = $('toast'); el.textContent = msg; el.hidden = false; clearTimeout(this._tt); this._tt = setTimeout(() => (el.hidden = true), 2200); }

  update() {
    const g = this.game; if (!g) return; const p = g.player;
    this.tick++;
    $('hpFill').style.transform = `scaleX(${Math.max(0, p.hp / p.maxHp)})`; $('mpFill').style.transform = `scaleX(${p.mp / p.maxMp})`;
    $('xpFill').style.transform = `scaleX(${p.level >= 15 ? 1 : p.xp / xpNeed(p.level)})`;
    for (let i = 0; i < 4; i++) {
      const a = p.data.abil[i], o = this.btns[i], cd = p.cds[i];
      const locked = p.level < UNLOCK[i];
      const state = locked ? 'off' : cd > 0 ? 'cd' : p.mp < a.mana ? 'nomana' : 'ready';
      if (state !== o.state) { o.state = state; o.b.classList.toggle('off', locked); o.b.classList.toggle('nomana', state === 'nomana'); o.b.classList.toggle('ready', state === 'ready'); if (locked) { o.cd.textContent = '🔒'; o.cd.style.setProperty('--p', '0%'); } else if (state !== 'cd') { o.cd.textContent = ''; o.cd.style.setProperty('--p', '0%'); } }
      if (state === 'cd') { o.cd.style.setProperty('--p', (cd / p.cdMax[i] * 100).toFixed(1) + '%'); o.cd.textContent = cd > 1 ? Math.ceil(cd) : cd.toFixed(1); }
    }
    if (this.tick % 6 === 0) {
      $('hpTxt').textContent = `${Math.ceil(Math.max(0, p.hp))} / ${Math.round(p.maxHp)}`; $('mpTxt').textContent = `${Math.floor(p.mp)} / ${Math.round(p.maxMp)}`;
      $('lvl').textContent = p.level; $('gold').textContent = Math.floor(p.gold);
      $('scBlue').textContent = g.kills[0]; $('scRed').textContent = g.kills[1];
      const s = Math.floor(g.time); $('clock').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      const can = g.canShop() && p.items.length < 6 && ITEMS.some((it) => !p.items.includes(it.id) && it.cost <= p.gold);
      $('shopBtn').classList.toggle('can', can);
      const key = p.items.join(',');
      if (key !== this.itemsKey) { this.itemsKey = key; $('items').innerHTML = Array.from({ length: 6 }, (_, i) => `<span>${ITEMS.find((x) => x.id === p.items[i])?.icon || ''}</span>`).join(''); }
      document.body.classList.toggle('dead', p.dead && !g.over);
      const rs = $('respawn'); rs.hidden = !p.dead || !!g.over; if (p.dead) rs.textContent = t('respawn', { n: Math.max(0, Math.ceil(p.respawnT)) });
      if (!$('shop').hidden) $('shopGold').textContent = Math.floor(p.gold);
      g.drawMinimap(this.mm, 200, 116);
    }
  }
}
