// In-match HUD: bars, ability buttons, joystick, shop, feed.
import { ITEMS, ITEM } from './data.js';
import { t, loc, abilDesc } from './i18n.js';
import { UNLOCK, MAX_RANK, SPELLS, xpNeed } from './game.js';
import { HEROES } from './data.js';

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
    $('scoreBtn').addEventListener('click', () => this.toggleBoard());
    $('boardClose').addEventListener('click', () => this.toggleBoard(false));
    $('board').addEventListener('pointerdown', (e) => { if (e.target.id === 'board') this.toggleBoard(false); });
    $('minimap').addEventListener('pointerdown', (e) => {
      const g = this.game; if (!g || g.paused || g.player.dead) return;
      const r = e.currentTarget.getBoundingClientRect(), p = g.player;
      p.attackTarget = null; p.recallT = 0; p.moveTo = { x: Math.max(-96, Math.min(96, ((e.clientX - r.left) / r.width - 0.5) * 200)), z: Math.max(-54, Math.min(54, ((e.clientY - r.top) / r.height - 0.5) * 116)) };
    });
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
      const slot = document.createElement('div'); slot.className = 'slot';
      const plus = document.createElement('button'); plus.type = 'button'; plus.className = 'plus-btn'; plus.textContent = '+'; plus.hidden = true;
      plus.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); game.rankUp(p, i); });
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'act' + (a.ult ? ' ult' : ''); b.style.setProperty('--c', hex(p.pal.fx));
      b.innerHTML = `${ICON[a.type]}<span class="rk">${'<i></i>'.repeat(MAX_RANK[i])}</span><span class="cd"></span><span class="key">${a.key.toUpperCase()}</span>`;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); this.audio.unlock(); if (!p.ranks[i] && game.canRank(p, i)) game.rankUp(p, i); else game.playerCast(i); });
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') this.tip(a, i); });
      b.addEventListener('pointerleave', () => { $('tooltip').hidden = true; });
      slot.append(plus, b); row.appendChild(slot);
      return { b, plus, cd: b.querySelector('.cd'), pips: [...b.querySelectorAll('.rk i')], state: '', rank: -1 };
    });
    const srow = $('spellRow'); srow.innerHTML = '';
    this.sbtns = SPELLS.map((sp, k) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'act spell';
      b.innerHTML = `${sp.icon}<span class="cd"></span><span class="key">${'DF'[k]}</span>`;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); game.playerSpell(k); });
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { const el = $('tooltip'); el.innerHTML = `<h3>${t('sp_' + sp.id)} · ${'DF'[k]}</h3><p>${t('sp_' + sp.id + '_d')}</p><small>${t('cd')} ${sp.cd}s</small>`; el.hidden = false; } });
      b.addEventListener('pointerleave', () => { $('tooltip').hidden = true; });
      srow.appendChild(b);
      return { b, cd: b.querySelector('.cd') };
    });
    const wb = document.createElement('button'); wb.type = 'button'; wb.className = 'act spell'; wb.style.setProperty('--c', '#7dffb0');
    wb.innerHTML = '👁<span class="cd"></span><span class="key">4</span>';
    wb.addEventListener('pointerdown', (e) => { e.preventDefault(); game.playerWard(); });
    wb.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { const el = $('tooltip'); el.innerHTML = `<h3>${t('ward')} · 4</h3><p>${t('ward_d')}</p>`; el.hidden = false; } });
    wb.addEventListener('pointerleave', () => { $('tooltip').hidden = true; });
    srow.appendChild(wb); this.wardBtn = wb; this.wardN = -1;
    this.spHint = false; $('board').hidden = true;
    $('rotate').textContent = t('rotate');
    $('announce').innerHTML = ''; $('feed').innerHTML = ''; $('respawn').hidden = true;
    document.body.classList.remove('dead');
    this.itemsKey = null;
  }

  tip(a, i) {
    const p = this.game.player, el = $('tooltip');
    el.innerHTML = `<h3>${loc(a.name)} · ${a.key.toUpperCase()}</h3><p>${abilDesc(a, this.game.abL(p, i), p.atk)}</p><small>${t('rank')} ${p.ranks[i]}/${MAX_RANK[i]} · ${t('cd')} ${a.cd}s · ${t('mana')} ${a.mana}${p.level < UNLOCK[i] ? ' · ' + t('unlockAt', { n: UNLOCK[i] }) : ''}</small>`;
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
      const owned = p.items.includes(it.id), price = g.price(p, it), afford = p.gold >= price;
      const st = [];
      if (it.atk) st.push(`+${it.atk} ${t('atk')}`); if (it.hp) st.push(`+${it.hp} ${t('hp')}`); if (it.def) st.push(`+${it.def} ${t('def')}`);
      if (it.spd) st.push(`+${it.spd} ${t('spd')}`); if (it.as) st.push(`+${it.as * 100}% ⚡`); if (it.ap) st.push(`+${Math.round(it.ap * 100)}% ✺`);
      if (it.cdr) st.push(`-${it.cdr * 100}% ${t('cd')}`); if (it.mp) st.push(`+${it.mp} ${t('mana')}`); if (it.ls) st.push(`${Math.round(it.ls * 100)}% ♥`); if (it.crit) st.push(`${Math.round(it.crit * 100)}% ${t('crit')}`);
      const from = it.from ? `<p class="fr">${t('builds')}: ${it.from.map((c) => `<span class="${p.items.includes(c) ? 'have' : ''}">${ITEM[c].icon}</span>`).join(' + ')}</p>` : '';
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'item' + (it.from ? ' adv' : '') + (owned ? ' owned' : !afford || !can ? ' no' : '');
      b.innerHTML = `<span class="ic">${it.icon}</span><span><h3>${loc(it.name)}</h3><p>${st.join(' · ')}</p>${from}</span><span class="c">${owned ? '✓' : `<i class="coin"></i>${price}`}</span>`;
      b.addEventListener('click', () => {
        if (owned) return;
        if (p.items.filter((x) => !(it.from || []).includes(x)).length >= 6) return this.toast(t('full'));
        if (!g.buy(p, it.id)) { this.audio.play('error'); if (!can) this.toast(t('shopHint')); else this.toast(t('notEnough') + ' — ' + t('coins')); }
        this.renderShop();
      });
      grid.appendChild(b);
    }
  }
  toggleBoard(on) { const el = $('board'); const show = on ?? el.hidden; el.hidden = !show; if (show) this.renderBoard(); }
  boardHTML(mvpOf) {
    const g = this.game;
    const score = (u) => u.k * 3 + u.a * 1.5 - u.d + u.dmg / 900;
    const mvp = mvpOf === undefined ? null : g.heroes.filter((u) => u.team === mvpOf).sort((a, b) => score(b) - score(a))[0];
    let h = `<span class="th"></span><span class="th">${t('lv')}</span><span class="th">K / D / A</span><span class="th">${t('minions')}</span><span class="th">${t('dmgCol')}</span><span class="th"></span>`;
    for (const team of [0, 1]) {
      h += '<span class="sep"></span>';
      for (const u of g.heroes.filter((x) => x.team === team)) {
        const c = (u.isPlayer ? 'me' : 't' + team) + (u.dead && !g.over ? ' dead' : '');
        h += `<span class="nm ${c}">${u.name} <small>${t(HEROES[u.heroId].role)}</small>${u === mvp ? `<span class="mvp">${t('mvp')}</span>` : ''}</span><span>${u.level}</span><span>${u.k} / ${u.d} / ${u.a}</span><span>${u.cs}</span><span>${Math.round(u.dmg)}</span><span>${u.items.map((id) => ITEM[id].icon).join(' ')}</span>`;
      }
    }
    return h;
  }
  renderBoard() {
    const g = this.game; if (!g) return;
    $('boardTitle').textContent = `${t('board')}  ·  ${g.kills[0]} – ${g.kills[1]}`;
    $('boardBody').innerHTML = this.boardHTML();
  }
  toast(msg) { const el = $('toast'); el.textContent = msg; el.hidden = false; clearTimeout(this._tt); this._tt = setTimeout(() => (el.hidden = true), 2200); }

  update() {
    const g = this.game; if (!g) return; const p = g.player;
    this.tick++;
    $('hpFill').style.transform = `scaleX(${Math.max(0, p.hp / p.maxHp)})`; $('mpFill').style.transform = `scaleX(${p.mp / p.maxMp})`;
    $('xpFill').style.transform = `scaleX(${p.level >= 15 ? 1 : p.xp / xpNeed(p.level)})`;
    for (let i = 0; i < 4; i++) {
      const a = p.data.abil[i], o = this.btns[i], cd = p.cds[i];
      const locked = !p.ranks[i];
      if (o.rank !== p.ranks[i]) { o.rank = p.ranks[i]; o.pips.forEach((el, n) => el.classList.toggle('on', n < o.rank)); }
      const cr = g.canRank(p, i) && !p.dead; if (o.plus.hidden === cr) o.plus.hidden = !cr;
      const state = locked ? 'off' : cd > 0 ? 'cd' : p.mp < a.mana ? 'nomana' : 'ready';
      if (state !== o.state) { o.state = state; o.b.classList.toggle('off', locked); o.b.classList.toggle('nomana', state === 'nomana'); o.b.classList.toggle('ready', state === 'ready'); if (locked) { o.cd.textContent = '🔒'; o.cd.style.setProperty('--p', '0%'); } else if (state !== 'cd') { o.cd.textContent = ''; o.cd.style.setProperty('--p', '0%'); } }
      if (state === 'cd') { o.cd.style.setProperty('--p', (cd / p.cdMax[i] * 100).toFixed(1) + '%'); o.cd.textContent = cd > 1 ? Math.ceil(cd) : cd.toFixed(1); }
    }
    this.sbtns.forEach((o, k) => { const q = p.spells[k]; if (q.cd > 0) { o.cd.style.setProperty('--p', (q.cd / q.max * 100).toFixed(1) + '%'); o.cd.textContent = Math.ceil(q.cd); } else if (o.cd.textContent) { o.cd.textContent = ''; o.cd.style.setProperty('--p', '0%'); } });
    if (p.sp > 0 && !this.spHint && g.time > 1) { this.spHint = true; this.toast(t('skillPoint')); }
    if (this.tick % 6 === 0) {
      if (!$('board').hidden && this.tick % 30 === 0) this.renderBoard();
      $('hpTxt').textContent = `${Math.ceil(Math.max(0, p.hp))} / ${Math.round(p.maxHp)}`; $('mpTxt').textContent = `${Math.floor(p.mp)} / ${Math.round(p.maxMp)}`;
      if (this.wardN !== p.wardN) { this.wardN = p.wardN; this.wardBtn.querySelector('.cd').textContent = p.wardN; this.wardBtn.classList.toggle('off', !p.wardN); }
      const bk = g.playerBuffs().map((b) => `<span>${b[0]} ${b[1]}</span>`).join(''); if (bk !== this.buffKey) { this.buffKey = bk; $('buffs').innerHTML = bk; }
      $('lvl').textContent = p.level; $('gold').textContent = Math.floor(p.gold);
      $('scBlue').textContent = g.kills[0]; $('scRed').textContent = g.kills[1];
      const s = Math.floor(g.time); $('clock').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      const can = g.canShop() && ITEMS.some((it) => !p.items.includes(it.id) && g.price(p, it) <= p.gold && p.items.filter((x) => !(it.from || []).includes(x)).length < 6);
      $('shopBtn').classList.toggle('can', can);
      const key = p.items.join(',');
      if (key !== this.itemsKey) { this.itemsKey = key; $('items').innerHTML = Array.from({ length: 6 }, (_, i) => `<span>${ITEM[p.items[i]]?.icon || ''}</span>`).join(''); }
      document.body.classList.toggle('dead', p.dead && !g.over);
      const rs = $('respawn'); rs.hidden = !p.dead || !!g.over; if (p.dead) rs.textContent = t('respawn', { n: Math.max(0, Math.ceil(p.respawnT)) });
      if (!$('shop').hidden) $('shopGold').textContent = Math.floor(p.gold);
      g.drawMinimap(this.mm, 200, 116);
    }
  }
}
