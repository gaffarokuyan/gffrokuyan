import './style.css';
import * as THREE from 'three';
import { HEROES, HERO_IDS, SKINS, GEM_PACKS, PASSIVES, skinPalette } from './data.js';
import { t, loc, setLang, getLang, LANGS, abilDesc } from './i18n.js';
import { audio } from './audio.js';
import { Game, UNLOCK, TALENTS } from './game.js';
import { MenuScene } from './menu3d.js';
import { Hud } from './hud.js';

const $ = (id) => document.getElementById(id);
const hex = (n) => '#' + n.toString(16).padStart(6, '0');
const KEY = 'sterk-arena-v1';

// ---------- persistent profile ----------
const fresh = () => ({ lang: null, quality: 'high', sound: true, coins: 500, gems: 50, xp: 0, level: 1, owned: ['rubar', 'zerya', 'bahoz'], skins: {}, equipped: {}, hero: 'rubar', talent: 'fury', diff: 'normal', rp: 0 });
let save = fresh();
try { const raw = localStorage.getItem(KEY); if (raw) save = { ...save, ...JSON.parse(raw) }; } catch (e) { /* storage unavailable */ }
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* ignore */ } };
const ownsSkin = (h, s) => s === 'default' || (save.skins[h] || []).includes(s);
const skinOf = (h) => save.equipped[h] || 'default';
const acctNeed = (lv) => 100 + lv * 60;

// ---------- renderer / loop ----------
const canvas = $('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
const menu3d = new MenuScene(renderer);
const hud = new Hud(audio);
let game = null, W = 1, H = 1, prCap = 2, last = performance.now(), slowT = 0, frames = 0, acc = 0;

if (matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) document.body.classList.add('touch');

function resize() {
  W = window.innerWidth; H = window.innerHeight;
  const pr = Math.min(window.devicePixelRatio || 1, save.quality === 'high' ? prCap : 1);
  renderer.setPixelRatio(pr); renderer.setSize(W, H, false);
  game?.resize(W, H, pr);
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 200));

function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (game) {
    game.frame(dt); hud.update();
    // adaptive quality: step resolution down, then drop bloom, if the device struggles
    if (!game.paused) { acc += dt; frames++; }
    if (acc >= 3) {
      const fps = frames / acc; acc = 0; frames = 0;
      if (fps < 26 && ++slowT >= 2) {
        slowT = 0;
        if (prCap > 1) { prCap = Math.max(1, prCap - 0.5); resize(); }
        else if (game.composer) { game.composer = null; renderer.shadowMap.enabled = false; game.scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; }); }
      }
    }
  } else if (!$('tab-play').hidden) menu3d.frame(dt, $('stage').getBoundingClientRect(), W, H);
  else menu3d.frame(dt, null, W, H);
}

// ---------- menu ----------
let tab = 'play';
function toast(msg) { hud.toast(msg); }

function renderWallet() {
  $('coins').textContent = save.coins; $('gems').textContent = save.gems; $('acctLv').textContent = save.level;
  const tier = Math.min(5, Math.floor(save.rp / 100));
  $('rankBox').innerHTML = `<b>${t('rank' + tier)}</b><span>${save.rp} ${t('rankPts')}</span>`;
  $('acctXp').style.width = Math.min(100, save.xp / acctNeed(save.level) * 100) + '%';
}

function renderStatic() {
  document.documentElement.lang = getLang();
  const tabs = $('tabs').children; tabs[0].textContent = t('play'); tabs[1].textContent = t('store'); tabs[2].textContent = t('settings');
  $('tagline').textContent = t('tagline'); $('storeNote').textContent = t('storeNote');
  $('packsTitle').textContent = t('gemPacks'); $('skinsTitle').textContent = t('skins');
  $('lblLang').textContent = t('language'); $('lblQuality').textContent = t('quality'); $('lblSound').textContent = t('sound');
  $('resetBtn').textContent = t('resetData');
  $('controlsTip').textContent = t('tipDesktop') + '  —  ' + t('tipTouch');
  $('pauseTitle').textContent = t('pause'); $('resumeBtn').textContent = t('resume'); $('leaveBtn').textContent = t('surrender');
  $('pauseTip').textContent = document.body.classList.contains('touch') ? t('tipTouch') : t('tipDesktop');
  $('loadTxt').textContent = t('loading'); $('endBtn').textContent = t('continue');
  $('lblTalent').textContent = t('talent'); $('lblDiff').textContent = t('difficulty');
  const tb = $('talents'); tb.innerHTML = '';
  for (const id of TALENTS) {
    const b = document.createElement('button'); b.type = 'button'; if (save.talent === id) b.className = 'on';
    b.innerHTML = `${t('tal_' + id)}<small>${t('tal_' + id + '_d')}</small>`;
    b.addEventListener('click', () => { audio.play('click'); save.talent = id; persist(); renderStatic(); }); tb.appendChild(b);
  }
  seg('segDiff', [['easy', t('easy')], ['normal', t('normal')], ['hard', t('hard')]], save.diff, (v) => { save.diff = v; persist(); renderStatic(); });
  seg('segLang', LANGS, getLang(), (v) => { save.lang = v; setLang(v); persist(); renderAll(); });
  seg('segQuality', [['high', t('high')], ['low', t('low')]], save.quality, (v) => { save.quality = v; prCap = 2; persist(); resize(); renderStatic(); });
  seg('segSound', [[true, t('on')], [false, t('off')]], save.sound, (v) => { save.sound = v; audio.setEnabled(v); persist(); renderStatic(); });
}
function seg(id, opts, cur, fn) {
  const el = $(id); el.innerHTML = '';
  for (const [v, label] of opts) {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = label; if (v === cur) b.className = 'on';
    b.addEventListener('click', () => { audio.unlock(); audio.play('click'); fn(v); }); el.appendChild(b);
  }
}

function renderRoster() {
  const box = $('roster'); box.innerHTML = '';
  for (const id of HERO_IDS) {
    const h = HEROES[id], owned = save.owned.includes(id), pal = skinPalette(id, skinOf(id));
    const b = document.createElement('button'); b.type = 'button'; b.className = 'hcard' + (id === save.hero ? ' on' : '');
    b.style.setProperty('--c', hex(pal.color)); b.style.setProperty('--c2', hex(pal.accent));
    b.innerHTML = `<span class="dot"></span><span><span class="nm">${h.name}</span><br><span class="rl">${t(h.role)}</span></span>${owned ? '' : `<span class="lock"><i class="coin"></i>${h.cost}</span>`}`;
    b.addEventListener('click', () => { audio.unlock(); audio.play('click'); save.hero = id; persist(); renderRoster(); renderHero(); });
    box.appendChild(b);
  }
}

function renderHero() {
  const id = save.hero, h = HEROES[id], owned = save.owned.includes(id), pal = skinPalette(id, skinOf(id));
  menu3d.setHero(id, skinOf(id));
  $('heroName').textContent = h.name; $('heroRole').textContent = t(h.role);
  const stat = (k, v, max) => `<span>${t(k)}</span><div class="trk"><div style="width:${Math.min(100, v / max * 100)}%"></div></div>`;
  $('heroStats').innerHTML = stat('hp', h.hp, 950) + stat('atk', h.atk, 72) + stat('def', h.def, 44) + stat('spd', h.spd - 6, 2.1) + stat('rangeS', h.range, 11);
  $('heroAbils').innerHTML = `<div class="ab pas" style="--c:${hex(pal.fx)}"><span class="k">✦</span><div><h3>${t('passive')}</h3><p>${t('p_' + PASSIVES[id])}</p></div></div>` + h.abil.map((a, i) => `<div class="ab${a.ult ? ' ult' : ''}" style="--c:${hex(pal.fx)}"><span class="k">${a.key.toUpperCase()}</span><div><h3>${loc(a.name)}</h3><p>${abilDesc(a, 1, h.atk)}</p><small>${t('cd')} ${a.cd}s · ${t('mana')} ${a.mana}${UNLOCK[i] > 1 ? ' · ' + t('unlockAt', { n: UNLOCK[i] }) : ''}</small></div></div>`).join('');
  const row = $('skinRow'); row.innerHTML = '';
  for (const s of SKINS[id]) {
    if (!ownsSkin(id, s.id)) continue;
    const sp = skinPalette(id, s.id);
    const b = document.createElement('button'); b.type = 'button'; b.className = 'skin' + (skinOf(id) === s.id ? ' on' : '');
    b.style.setProperty('--c', hex(sp.color)); b.style.setProperty('--c2', hex(sp.accent));
    b.innerHTML = `<i></i>${t('skin_' + s.id)}`;
    b.addEventListener('click', () => { audio.play('click'); save.equipped[id] = s.id; persist(); renderRoster(); renderHero(); });
    row.appendChild(b);
  }
  const cta = $('startBtn');
  cta.classList.toggle('locked', !owned);
  cta.innerHTML = owned ? t('start') : `${t('unlock')} · ${h.cost} <i class="coin"></i>`;
}

function renderStore() {
  const packs = $('packs'); packs.innerHTML = '';
  for (const p of GEM_PACKS) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'pack';
    b.innerHTML = `<span class="demo-badge">${t('demoBadge')}</span><span class="big"><i class="gem"></i>${p.gems}</span><span class="bn">${p.bonus ? `+${p.bonus} ${t('bonus')}` : ''}</span><span class="price">${p.price}</span>`;
    b.addEventListener('click', () => {
      const n = p.gems + (p.bonus || 0);
      dialog(t('demoTitle'), t('demoBody', { n, p: p.price }), () => { save.gems += n; persist(); renderWallet(); audio.play('coin'); toast(t('purchased', { n })); }, true);
    });
    packs.appendChild(b);
  }
  const grid = $('skinGrid'); grid.innerHTML = '';
  for (const id of HERO_IDS) for (const s of SKINS[id]) {
    if (s.id === 'default') continue;
    const own = ownsSkin(id, s.id), on = skinOf(id) === s.id;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'scard';
    b.style.setProperty('--c', hex(s.color)); b.style.setProperty('--c2', hex(s.accent));
    b.innerHTML = `<span class="sw"></span><span class="hn">${HEROES[id].name}</span><span class="sn">${t('skin_' + s.id)}</span><span class="price${own ? ' on' : ''}">${own ? (on ? t('equipped') : t('equip')) : `<i class="gem"></i>${s.cost}`}</span>`;
    b.addEventListener('click', () => {
      audio.play('click');
      if (own) { save.equipped[id] = on ? 'default' : s.id; persist(); renderAll(); return; }
      if (save.gems < s.cost) { audio.play('error'); return toast(`${t('notEnough')} — ${t('gems')}`); }
      save.gems -= s.cost; (save.skins[id] ||= []).push(s.id); save.equipped[id] = s.id; persist(); audio.play('level'); toast(t('unlocked')); renderAll();
    });
    grid.appendChild(b);
  }
}

function showTab(name) {
  tab = name;
  for (const b of $('tabs').children) b.classList.toggle('on', b.dataset.tab === name);
  for (const n of ['play', 'store', 'settings']) $('tab-' + n).hidden = n !== name;
}
function renderAll() { renderStatic(); renderWallet(); renderRoster(); renderHero(); renderStore(); }

function dialog(title, body, onOk, demo) {
  $('dlgTitle').textContent = title; $('dlgBody').textContent = body; $('dlgBadge').hidden = !demo; $('dlgBadge').textContent = t('demoBadge');
  $('dlgOk').textContent = t('confirm'); $('dlgCancel').textContent = t('cancel');
  $('dialog').hidden = false;
  $('dlgOk').onclick = () => { $('dialog').hidden = true; onOk(); };
  $('dlgCancel').onclick = () => { $('dialog').hidden = true; };
}

// ---------- match flow ----------
function startMatch() {
  $('loading').hidden = false; $('menu').hidden = true;
  audio.unlock(); audio.music(true);
  setTimeout(() => {
    game = new Game({
      renderer, overlay: $('overlay'), heroId: save.hero, skin: skinOf(save.hero), quality: save.quality, talent: save.talent, diff: save.diff, audio,
      ui: { announce: (a, b) => hud.announce(a, b), feed: (a, b, c) => hud.feed(a, b, c), pause: () => togglePause(), shop: () => hud.toggleShop(), board: () => hud.toggleBoard() },
      onEnd: endMatch,
    });
    window.__game = game;
    renderer.setScissorTest(false);
    resize(); hud.attach(game);
    // short line-up card before the gates open
    const g0 = game, row = (u) => `<span class="t${u.team}${u.isPlayer ? ' me' : ''}">${u.name} <small>${t(HEROES[u.heroId].role)}</small></span>`;
    const A = g0.heroes.filter((u) => u.team === 0), B = g0.heroes.filter((u) => u.team === 1);
    $('lineup').innerHTML = A.map((u, i) => row(u) + (i === 0 ? `<span class="vs">${t('vs')}</span>` : '') + row(B[i])).join('');
    g0.paused = true; $('hud').hidden = false; acc = 0; frames = 0; slowT = 0;
    setTimeout(() => { $('loading').hidden = true; $('lineup').innerHTML = ''; if (game === g0 && $('pause').hidden) g0.paused = false; }, 2400);
  }, 60);
}

function togglePause(force) {
  if (!game || game.over) return;
  if (!$('shop').hidden && force === undefined) return hud.toggleShop(false);
  game.paused = force ?? !game.paused; $('pause').hidden = !game.paused;
}

function leaveMatch() {
  game?.dispose(); game = null; window.__game = null;
  for (const id of ['hud', 'pause', 'shop', 'end', 'board']) $(id).hidden = true;
  document.body.classList.remove('dead');
  renderer.shadowMap.enabled = false; audio.music(false);
  $('menu').hidden = false; renderAll(); showTab('play');
}

function endMatch(r) {
  const coins = (r.win ? 120 : 50) + r.k * 6 + r.a * 3 + Math.floor(r.cs / 4), xp = (r.win ? 100 : 45) + r.k * 3 + r.a;
  const rpD = r.win ? Math.round(25 * { easy: 0.5, normal: 1, hard: 1.5 }[r.diff]) : -(r.diff === 'easy' ? 5 : 15);
  save.rp = Math.max(0, save.rp + rpD);
  save.coins += coins; save.xp += xp;
  let up = false;
  while (save.xp >= acctNeed(save.level)) { save.xp -= acctNeed(save.level); save.level++; save.gems += 10; up = true; }
  persist();
  $('endBoard').innerHTML = hud.boardHTML(r.win ? 0 : 1);
  $('end').firstElementChild.className = 'sheet end ' + (r.win ? 'win' : 'lose');
  $('endTitle').textContent = t(r.win ? 'victory' : 'defeat');
  $('endStats').innerHTML = `<div><b>${r.k}</b>${t('kills')}</div><div><b>${r.d}</b>${t('deaths')}</div><div><b>${r.a}</b>${t('assists')}</div><div><b>${r.cs}</b>${t('minions')}</div><div><b>${r.level}</b>${t('level')}</div>`;
  $('endRewards').innerHTML = `<span><i class="coin"></i>+${coins}</span><span>✦ +${xp} ${t('xp')}</span><span>${rpD > 0 ? '+' : ''}${rpD} ${t('rankPts')}</span>${up ? `<span><i class="gem"></i>+10 · ${t('accountLevelUp', { n: save.level })}</span>` : ''}`;
  $('shop').hidden = true; $('pause').hidden = true; $('board').hidden = true; $('end').hidden = false;
}

// ---------- wiring ----------
$('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { audio.unlock(); audio.play('click'); showTab(b.dataset.tab); } });
$('gemBtn').addEventListener('click', () => { audio.play('click'); showTab('store'); });
$('startBtn').addEventListener('click', () => {
  audio.unlock();
  const id = save.hero, h = HEROES[id];
  if (save.owned.includes(id)) return startMatch();
  if (save.coins < h.cost) { audio.play('error'); return toast(`${t('notEnough')} — ${t('coins')}`); }
  save.coins -= h.cost; save.owned.push(id); persist(); audio.play('level'); toast(t('unlocked')); renderAll();
});
$('resetBtn').addEventListener('click', () => dialog(t('resetData'), '', () => { const lang = save.lang; save = fresh(); save.lang = lang; persist(); renderAll(); toast(t('resetDone')); }));
$('pauseBtn').addEventListener('click', () => togglePause(true));
$('resumeBtn').addEventListener('click', () => togglePause(false));
$('leaveBtn').addEventListener('click', leaveMatch);
$('endBtn').addEventListener('click', leaveMatch);
document.addEventListener('visibilitychange', () => { if (document.hidden && game && !game.over) togglePause(true); });
document.addEventListener('contextmenu', (e) => e.preventDefault());

// first run: pick a language
function boot() {
  audio.setEnabled(save.sound);
  if (save.lang) { setLang(save.lang); }
  else {
    const nav = (navigator.language || 'tr').slice(0, 2);
    setLang(['ku', 'tr', 'en'].includes(nav) ? nav : 'tr');
    const list = $('langList');
    for (const [code, label] of LANGS) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = label;
      b.addEventListener('click', () => { audio.unlock(); audio.play('click'); save.lang = code; setLang(code); persist(); $('langPick').hidden = true; renderAll(); });
      list.appendChild(b);
    }
    $('langPick').hidden = false;
  }
  resize(); renderAll(); showTab('play');
  requestAnimationFrame(loop);
}
boot();
