// Kurdî A1 çöp adam serisi — ortak sahne motoru.
// Bölüm verisi window.EP (episodes/<ad>/episode.js), replik süreleri window.DUR, dudak zarfı window.ENV.
// renderAt(t) verilen saniyedeki kareyi çizer (deterministik).
(function () {
  const EP = window.EP, DUR = window.DUR || {}, ENV = window.ENV || {};
  const W = 1080, HH = 1920, FLOOR = 1180;
  const INK = '#1f1b16', PINK = '#F48FB1', BLUE = '#2F7DE1';
  const BX = 500, RX = 800;

  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const eio = u => (u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
  const eout = u => 1 - Math.pow(1 - u, 3);
  const back = u => { const c = 1.9; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
  const rad = a => a * Math.PI / 180;
  const mixA = (p, q, u) => [lerp(p[0], q[0], u), lerp(p[1], q[1], u)];
  const S = `stroke="${INK}" stroke-linecap="round" stroke-linejoin="round"`;

  // ---------- Zaman çizelgesi (replik sürelerinden otomatik) ----------
  const TL = { fps: 30, lines: [], cards: [], marks: {} };
  {
    let t = EP.intro ?? 1.6;
    for (const it of EP.seq) {
      if (it.card) { const a = t + .3; TL.cards.push({ a, b: a + 1.8, ...it.card }); if (it.id) TL.marks[it.id] = { a, b: a + 1.8 }; t = a + 2.0; }
      else if (it.wait) { TL.marks[it.id] = { a: t, b: t + it.wait }; t += it.wait; }
      else { const start = t + (it.gap ?? .35), dur = DUR[it.id] ?? 2.5; TL.lines.push({ ...it, start, dur }); TL.marks[it.id] = { a: start, b: start + dur }; t = start + dur; }
    }
    TL.endAt = t + (EP.tail ?? 1.3);
    TL.dur = Math.ceil((TL.endAt + .6 + EP.vocab.length * .4 + 2.2) * 2) / 2;
  }
  const T = (id, f = 0) => { const m = TL.marks[id]; return m.a + f * (m.b - m.a); };
  const amp = (id, t) => { const m = TL.marks[id], e = ENV[id]; if (!e) return 0; const i = Math.floor((t - m.a) * TL.fps); return i >= 0 && i < e.length ? e[i] : 0; };
  TL.bubbles = (EP.bubbles || []).map(b => ({ ...b, a: T(b.line, b.f ?? 0), b: T(b.to ?? b.line, b.tf ?? 1) + (b.hold ?? .3) }));
  window.TL = TL;

  // Poz anahtar kareleri
  const KEYS = [{ t: -1, B: { pose: 'idle', expr: 'happy' }, R: { pose: 'idle', expr: 'happy' } }];
  const carry = p => { const q = { ...p }; delete q.hop; delete q.shake; if (['wave', 'up', 'cheer'].includes(q.pose)) q.pose = 'idle'; return q; };
  for (const L of TL.lines) {
    const sp = L.who, ls = sp === 'B' ? 'R' : 'B';
    const push = (t, s, l) => { const prev = KEYS[KEYS.length - 1]; KEYS.push({ t, [sp]: s ? { pose: 'point', expr: 'normal', ...s } : carry(prev[sp]), [ls]: l ? { pose: 'idle', expr: 'normal', ...l } : carry(prev[ls]) }); };
    push(L.start, L.s || {}, L.l);
    for (const th of L.then || []) push(L.start + th.f * L.dur, th.s ? { ...(L.s || {}), ...th.s } : null, th.l);
  }

  const H = { W, H: HH, FLOOR, BX, RX, INK, PINK, BLUE, S, clamp, lerp, seg, eio, eout, back, rad, mixA, T, amp, TL };
  window.H = H;

  // ---------- Saat ----------
  function clockFace(cx, cy, r, h, sw = 7) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" ${S} stroke-width="${sw}"/>`;
    for (let i = 0; i < 12; i++) { const a = rad(i * 30), r1 = r * (i % 3 ? .84 : .76), r2 = r * .92; s += `<path d="M${cx + Math.sin(a) * r1} ${cy - Math.cos(a) * r1}L${cx + Math.sin(a) * r2} ${cy - Math.cos(a) * r2}" ${S} stroke-width="${i % 3 ? 3 : 5}"/>`; }
    const ha = rad((h % 12) * 30), ma = rad((h % 1) * 360);
    s += `<path d="M${cx} ${cy}L${cx + Math.sin(ha) * r * .5} ${cy - Math.cos(ha) * r * .5}" ${S} stroke-width="${sw + 2}"/>`;
    s += `<path d="M${cx} ${cy}L${cx + Math.sin(ma) * r * .74} ${cy - Math.cos(ma) * r * .74}" ${S} stroke-width="${sw - 2}"/>`;
    return s + `<circle cx="${cx}" cy="${cy}" r="${r * .08}" fill="#E0407B"/>`;
  }
  H.clockFace = clockFace;

  // ---------- Oda ----------
  function room(t) {
    const mode = EP.mode ? EP.mode(t, H) : 'day';
    let s = `<rect width="${W}" height="${FLOOR}" fill="#F6ECD6"/>`;
    for (let y = 60; y < FLOOR; y += 90) for (let x = 45 + ((y / 90) % 2) * 45; x < W; x += 90) s += `<circle cx="${x}" cy="${y}" r="4" fill="#E9DCBF"/>`;
    s += `<rect y="${FLOOR}" width="${W}" height="${HH - FLOOR}" fill="#DDB680"/>`;
    for (let i = 0; i < 9; i++) s += `<path d="M0 ${FLOOR + 30 + i * 84}H${W}" stroke="#C99E66" stroke-width="4"/>`;
    for (let i = 0; i < 9; i++) for (let x = (i % 2) * 200 + 120; x < W; x += 400) s += `<path d="M${x} ${FLOOR + 30 + (i - 1) * 84}v84" stroke="#C99E66" stroke-width="4"/>`;
    s += `<rect y="${FLOOR - 26}" width="${W}" height="26" fill="#fff" ${S} stroke-width="6"/>`;
    const wx = 70, wy = 520, ww = 290, wh = 330;
    const sky = mode === 'day' ? '#9FD8FF' : mode === 'morning' ? '#FFE0B0' : '#1D2A52';
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="${sky}" ${S} stroke-width="9"/>`;
    if (mode === 'day') {
      s += `<circle cx="${wx + 215}" cy="${wy + 80}" r="36" fill="#FFD23F"/>`;
      const cxo = Math.sin(t * .25) * 14;
      s += `<path d="M${wx + 50 + cxo} ${wy + 190}a26 26 0 0 1 44 -22a34 34 0 0 1 62 14a22 22 0 0 1 -6 44h-90a24 24 0 0 1 -10 -36z" fill="#fff"/>`;
    } else if (mode === 'morning') {
      s += `<circle cx="${wx + 150}" cy="${wy + 170}" r="52" fill="#FF9F43"/>`;
      for (let i = 0; i < 8; i++) { const a = rad(i * 45 + t * 12); s += `<path d="M${wx + 150 + Math.cos(a) * 66} ${wy + 170 + Math.sin(a) * 66}L${wx + 150 + Math.cos(a) * 86} ${wy + 170 + Math.sin(a) * 86}" stroke="#FF9F43" stroke-width="8" stroke-linecap="round"/>`; }
    } else {
      s += `<circle cx="${wx + 200}" cy="${wy + 95}" r="44" fill="#FFF2B0"/><circle cx="${wx + 222}" cy="${wy + 80}" r="40" fill="${sky}"/>`;
      [[50, 60], [110, 150], [70, 240], [230, 230], [150, 50], [250, 170]].forEach(([a, b], i) => { const tw = .5 + .5 * Math.sin(t * 3 + i * 2); s += `<circle cx="${wx + a}" cy="${wy + b}" r="${3 + tw * 3}" fill="#fff" opacity="${.5 + tw * .5}"/>`; });
    }
    s += `<path d="M${wx + ww / 2} ${wy}v${wh}M${wx} ${wy + wh / 2}h${ww}" ${S} stroke-width="7"/>`;
    s += `<rect x="${wx - 14}" y="${wy + wh}" width="${ww + 28}" height="22" fill="#fff" ${S} stroke-width="6"/>`;
    s += `<path d="M${wx - 14} ${wy - 10}q70 30 80 150q-10 110 -70 200l-10 -10z" fill="${PINK}" ${S} stroke-width="7"/>`;
    s += `<path d="M${wx + ww + 14} ${wy - 10}q-70 30 -80 150q10 110 70 200l10 -10z" fill="${PINK}" ${S} stroke-width="7"/>`;
    s += `<path d="M${wx - 40} ${wy - 14}h${ww + 80}" ${S} stroke-width="12"/>`;
    s += `<rect x="905" y="600" width="230" height="${FLOOR - 626}" fill="#C98B4E" ${S} stroke-width="9"/>`;
    s += `<rect x="935" y="640" width="170" height="210" rx="8" fill="none" stroke="#A56F38" stroke-width="7"/><rect x="935" y="890" width="170" height="210" rx="8" fill="none" stroke="#A56F38" stroke-width="7"/>`;
    s += `<circle cx="938" cy="880" r="13" fill="#FFD23F" ${S} stroke-width="5"/>`;
    if (!EP.noClock) s += clockFace(640, 420, 78, EP.clock ? EP.clock(t, H) : (EP.clockH ?? 10.17), 8);
    if (mode === 'night') s += `<rect width="${W}" height="${HH}" fill="#18204a" opacity=".2"/>`;
    return s;
  }

  // ---------- Masa ----------
  function table(t) {
    if (EP.noTable) return '';
    const ty = 985, it = EP.table ? EP.table(t, H) : { teapot: true, glass: 'hot' };
    let s = `<path d="M105 ${ty + 26}V${FLOOR - 14}M385 ${ty + 26}V${FLOOR - 14}" ${S} stroke-width="14"/>`;
    s += `<rect x="60" y="${ty}" width="370" height="30" rx="8" fill="#C98B4E" ${S} stroke-width="8"/>`;
    if (it.teapot) s += `<g transform="translate(140 ${ty})"><path d="M-48 -8q-10 -62 48 -62q58 0 48 62z" fill="#3FB8AF" ${S} stroke-width="7"/><path d="M48 -44q34 -6 38 -30" fill="none" ${S} stroke-width="7"/><path d="M-48 -52q-34 4 -30 26q4 16 30 10" fill="none" ${S} stroke-width="7"/><rect x="-20" y="-80" width="40" height="12" rx="5" fill="#2b8f88" ${S} stroke-width="6"/><circle cy="-88" r="8" fill="#FFD23F" ${S} stroke-width="5"/></g>`;
    if (it.glass) {
      s += `<g transform="translate(248 ${ty})"><ellipse cy="-3" rx="34" ry="8" fill="#fff" ${S} stroke-width="5"/>`;
      if (it.glass !== 'empty') s += `<path d="M-15 -52q8 22 -2 44h34q-10 -22 -2 -44z" fill="#D9531E"/>`;
      s += `<path d="M-17 -64q12 30 -3 56h40q-15 -26 -3 -56z" fill="none" ${S} stroke-width="5"/></g>`;
      if (it.glass === 'hot') for (let i = 0; i < 3; i++) { const p = ((t * .7 + i / 3) % 1), x = 236 + i * 12 + Math.sin(p * 6 + i) * 8; s += `<path d="M${x} ${ty - 76 - p * 60}q10 -12 0 -24" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${(1 - p) * .95}"/>`; }
    }
    return s;
  }

  // ---------- Karakter ----------
  function armPts(side, a, shY) {
    const L = 84, ex = side * Math.sin(rad(a[0])) * L, ey = shY + Math.cos(rad(a[0])) * L;
    return [ex, ey, ex + side * Math.sin(rad(a[1])) * L, ey + Math.cos(rad(a[1])) * L];
  }
  H.hand = (o, side) => { const a = armPts(side, side < 0 ? o.la : o.ra, -314); return [o.x + (o.dx || 0) + a[2], FLOOR - 10 + (o.dy || 0) + a[3]]; };
  function person(o, t) {
    const who = o.who, look = o.look ?? (who === 'B' ? 1 : -1);
    const { x, expr = 'normal', mouth = 0, tilt = 0, rot = 0, dy = 0, dx = 0, la = [14, 6], ra = [14, 6], walk = null, red = 0 } = o;
    const hipY = -172, shY = -314, neckY = -334, hY = -394, R = 62;
    let s = `<g transform="translate(${x + dx} ${FLOOR - 10 + dy}) rotate(${rot})">`;
    s += `<ellipse cx="0" cy="6" rx="${70 - Math.abs(dy) * .6}" ry="12" fill="#000" opacity=".12"/>`;
    let lf = [-36, 0], rf = [36, 0];
    if (walk != null) { const p = walk * Math.PI * 2; lf = [Math.sin(p) * 48, -Math.max(0, Math.cos(p)) * 26]; rf = [-Math.sin(p) * 48, -Math.max(0, -Math.cos(p)) * 26]; }
    s += `<path d="M0 ${hipY}L${lf[0]} ${lf[1]}M0 ${hipY}L${rf[0]} ${rf[1]}" fill="none" ${S} stroke-width="10"/>`;
    s += `<path d="M0 ${hipY}L0 ${neckY}" fill="none" ${S} stroke-width="10"/>`;
    if (who === 'B') {
      s += `<path d="M-20 ${shY - 6}L20 ${shY - 6}L82 ${hipY + 58}Q0 ${hipY + 80} -82 ${hipY + 58}Z" fill="${PINK}" ${S} stroke-width="8"/>`;
      s += `<path d="M-50 ${hipY + 20}Q0 ${hipY + 36} 50 ${hipY + 20}" fill="none" stroke="#E0407B" stroke-width="6" stroke-linecap="round"/>`;
    } else s += `<path d="M-30 ${shY - 6}L30 ${shY - 6}L34 ${hipY + 4}L-34 ${hipY + 4}Z" fill="#FFD23F" ${S} stroke-width="8"/>`;
    const A = armPts(-1, la, shY), B = armPts(1, ra, shY);
    s += `<path d="M0 ${shY}L${A[0]} ${A[1]}L${A[2]} ${A[3]}M0 ${shY}L${B[0]} ${B[1]}L${B[2]} ${B[3]}" fill="none" ${S} stroke-width="10"/>`;
    const face = `rgb(255,${Math.round(lerp(255, 150, red))},${Math.round(lerp(255, 130, red))})`;
    s += `<g transform="translate(0 ${hY}) rotate(${tilt})">`;
    if (who === 'B') s += `<g transform="scale(${look >= 0 ? 1 : -1} 1)"><path d="M-48 -34C-112 -30 -122 56 -86 86C-82 46 -66 22 -48 8Z" fill="${INK}"/></g>`;
    s += `<circle r="${R}" fill="${face}" ${S} stroke-width="8"/>`;
    const ey = who === 'B' ? 2 : 6, ex0 = look * 12;
    if (who === 'B') {
      s += `<path d="M-${R} -6A${R} ${R} 0 0 1 ${R} -6Q34 -36 0 -28Q-34 -36 -${R} -6Z" fill="${INK}" ${S} stroke-width="4"/>`;
      s += `<g transform="translate(${-look * 26} -62) rotate(${-look * 14})"><path d="M0 0L-30 -18L-30 18ZM0 0L30 -18L30 18Z" fill="#E0407B" ${S} stroke-width="5"/><circle r="8" fill="#E0407B" ${S} stroke-width="5"/></g>`;
      s += `<circle cx="${ex0 - 36}" cy="22" r="11" fill="#FF8FB0" opacity=".55"/><circle cx="${ex0 + 36}" cy="22" r="11" fill="#FF8FB0" opacity=".55"/>`;
    } else {
      s += `<path d="M${look * 26} -12L${look * 112} -8" stroke="#1E5FBF" stroke-width="18" stroke-linecap="round"/>`;
      s += `<path d="M-${R + 2} -12A${R + 2} ${R + 2} 0 0 1 ${R + 2} -12Z" fill="${BLUE}" ${S} stroke-width="7"/><circle cy="-76" r="8" fill="#1E5FBF" ${S} stroke-width="4"/>`;
    }
    const blink = ((t + (who === 'B' ? 0 : 1.3)) % 3.4) < 0.12;
    const E = blink && !['sleep', 'wide', 'dizzy'].includes(expr) ? 'sleep' : expr;
    for (const sd of [-1, 1]) {
      let e;
      if (E === 'happy' || E === 'smug') e = `<path d="M-10 4Q0 -10 10 4" fill="none" ${S} stroke-width="6"/>`;
      else if (E === 'sleep') e = `<path d="M-10 -1Q0 8 10 -1" fill="none" ${S} stroke-width="6"/>`;
      else if (E === 'wide') e = `<circle r="15" fill="#fff" ${S} stroke-width="5"/><circle cx="${look * 3}" r="6" fill="${INK}"/>`;
      else if (E === 'dizzy') e = `<path d="M-10 -10L10 10M10 -10L-10 10" fill="none" ${S} stroke-width="6"/>`;
      else e = `<ellipse rx="7" ry="10" fill="${INK}"/>`;
      if (E === 'angry') e += `<path d="M${sd * 14} -26L${-sd * 12} -13" fill="none" ${S} stroke-width="7"/>`;
      if (E === 'sad') e += `<path d="M${sd * 14} -14L${-sd * 10} -24" fill="none" ${S} stroke-width="6"/>`;
      s += `<g transform="translate(${ex0 + sd * 23} ${ey})">${e}</g>`;
    }
    const mx = look * 10, my = 32;
    if (mouth > 0.1) {
      const rx = 11 + 5 * mouth, ry = 5 + 17 * mouth;
      s += `<ellipse cx="${mx}" cy="${my}" rx="${rx}" ry="${ry}" fill="#6b1d1d" ${S} stroke-width="5"/>`;
      if (mouth > .45) s += `<ellipse cx="${mx}" cy="${my + ry * .45}" rx="${rx * .6}" ry="${ry * .35}" fill="#E76A6A"/>`;
    } else {
      let m;
      if (E === 'angry' || E === 'sad') m = `<path d="M-14 8Q0 -6 14 8" fill="none" ${S} stroke-width="6"/>`;
      else if (expr === 'sleep') m = `<path d="M-12 4H12" fill="none" ${S} stroke-width="6"/>`;
      else if (E === 'wide') m = `<ellipse rx="8" ry="10" fill="#6b1d1d" ${S} stroke-width="4"/>`;
      else if (E === 'dizzy') m = `<path d="M-18 2q6 -9 12 0t12 0t12 0" fill="none" ${S} stroke-width="5"/>`;
      else if (E === 'smug') m = `<path d="M-14 0Q4 12 16 -6" fill="none" ${S} stroke-width="6"/>`;
      else m = `<path d="M-14 -3Q0 12 14 -3" fill="none" ${S} stroke-width="6"/>`;
      s += `<g transform="translate(${mx} ${my})">${m}</g>`;
    }
    if (expr === 'angry' && red > .5) s += `<g transform="translate(${look * 46} -70) rotate(${Math.sin(t * 20) * 6})" stroke="#E53935" stroke-width="7" stroke-linecap="round" fill="none"><path d="M-14 -4q10 0 10 -10M4 -14q0 10 10 10M14 4q-10 0 -10 10M-4 14q0 -10 -10 -10"/></g>`;
    if (o.tear) s += `<path d="M${ex0 - 23} 16q-8 14 0 20q8 -6 0 -20z" fill="#6EC6FF" transform="translate(0 ${((t * 40) % 30)})" opacity="${1 - ((t * 40) % 30) / 30}"/><path d="M${ex0 + 23} 16q-8 14 0 20q8 -6 0 -20z" fill="#6EC6FF" transform="translate(0 ${((t * 40 + 15) % 30)})" opacity="${1 - ((t * 40 + 15) % 30) / 30}"/>`;
    if (o.sweat) s += `<path d="M${-look * 50} -30q-10 16 0 24q10 -8 0 -24z" fill="#6EC6FF" ${S} stroke-width="3" transform="translate(0 ${((t * 30) % 24)})"/>`;
    return s + `</g></g>`;
  }

  // ---------- Pozlar ----------
  const POSE = {
    idle: () => [[14, 6], [14, 6]],
    point: t => [[85 + Math.sin(t * 9) * 5, 93 + Math.sin(t * 9) * 9], [30, -20]],
    wave: t => [[14, 6], [150, 176 + Math.sin(t * 12) * 22]],
    hips: () => [[48, -44], [48, -44]],
    up: t => [[140 + Math.sin(t * 26) * 6, 172], [140 - Math.sin(t * 26) * 6, 172]],
    shrug: () => [[62, 150], [62, 150]],
    think: () => [[112, 212], [30, 10]],
    face: () => [[116, 206], [14, 6]],
    cheer: () => [[20, 10], [158, 178]],
    show: () => [[20, 6], [82, 98]],
    down: () => [[40, 30], [20, 6]],
  };
  function poses(t) {
    let i = 0; while (i + 1 < KEYS.length && KEYS[i + 1].t <= t) i++;
    const K = KEYS[i], K0 = KEYS[Math.max(0, i - 1)], u = eio(seg(t, K.t, K.t + .22));
    const out = {};
    for (const who of ['B', 'R']) {
      const c = K[who], p = K0[who];
      const [n1, f1] = POSE[c.pose](t), [n0, f0] = POSE[p.pose](t);
      const near = mixA(n0, n1, u), far = mixA(f0, f1, u);
      const o = { who, x: who === 'B' ? BX : RX, show: true, dy: Math.sin(t * 2.2 + (who === 'B' ? 0 : 1)) * 2 };
      if (who === 'B') { o.ra = near; o.la = far; } else { o.la = near; o.ra = far; }
      const e = u > .5 ? c : p;
      o.expr = e.expr; o.tear = e.tear; o.sweat = e.sweat;
      o.red = lerp(p.red || 0, c.red || 0, u); o.tilt = lerp(p.tilt || 0, c.tilt || 0, u); o.rot = lerp(p.rot || 0, c.rot || 0, u);
      if (c.look != null) o.look = c.look;
      if (c.shake) o.dx = Math.sin(t * 44) * 4;
      if (c.hop) { const h = seg(t, K.t + .05, K.t + .5); if (h > 0 && h < 1) o.dy -= Math.sin(h * Math.PI) * c.hop; }
      out[who] = o;
    }
    out.B.dy -= Math.sin(seg(t, .5, .95) * Math.PI) * 34; out.R.dy -= Math.sin(seg(t, .75, 1.2) * Math.PI) * 34;
    const L = TL.lines.find(l => t >= l.start - .05 && t < l.start + l.dur + .05);
    if (L) out[L.who].mouth = amp(L.id, t);
    if (EP.tweak) EP.tweak(t, out, H);
    return out;
  }

  // ---------- İkonlar / balonlar ----------
  const at = (x, y, sc, inner) => `<g transform="translate(${x} ${y}) scale(${sc})">${inner}</g>`;
  const ICON = {
    sun: `<circle r="20" fill="#FFB300" ${S} stroke-width="5"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = rad(i * 45); return `<path d="M${Math.cos(a) * 29} ${Math.sin(a) * 29}L${Math.cos(a) * 40} ${Math.sin(a) * 40}" stroke="#FFB300" stroke-width="7" stroke-linecap="round"/>`; }).join(''),
    moon: `<path d="M10 -32a32 32 0 1 0 22 44a26 26 0 0 1 -22 -44z" fill="#5C6BC0" ${S} stroke-width="5"/>`,
    ok: `<path d="M-22 2l16 18l30 -38" fill="none" stroke="#2EAD4B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`,
    no: `<path d="M-20 -20L20 20M20 -20L-20 20" fill="none" stroke="#E53935" stroke-width="13" stroke-linecap="round"/>`,
    q: `<text y="26" text-anchor="middle" font-size="76" font-weight="800" fill="#E53935">?</text>`,
    smile: `<circle r="40" fill="#FFD23F" ${S} stroke-width="6"/><path d="M-22 -10Q-14 -22 -6 -10M6 -10Q14 -22 22 -10" fill="none" ${S} stroke-width="6"/><path d="M-20 8Q0 30 20 8" fill="none" ${S} stroke-width="6"/>`,
    name: `<rect x="-50" y="-34" width="100" height="68" rx="10" fill="#fff" ${S} stroke-width="6"/><rect x="-50" y="-34" width="100" height="24" rx="10" fill="#E53935" ${S} stroke-width="6"/><path d="M-30 6H30M-20 22H20" ${S} stroke-width="6"/>`,
    cake: `<rect x="-40" y="-6" width="80" height="40" rx="8" fill="#F8BBD0" ${S} stroke-width="6"/><path d="M-40 10q13 12 26 0t26 0t28 0" fill="none" stroke="#fff" stroke-width="6"/><path d="M0 -6V-28" ${S} stroke-width="6"/><path d="M0 -44q-9 10 0 16q9 -6 0 -16z" fill="#FF9F43" ${S} stroke-width="4"/>`,
    heart: `<path d="M0 30C-50 -4 -30 -40 0 -16C30 -40 50 -4 0 30Z" fill="#E53935" ${S} stroke-width="6"/>`,
    battery: `<rect x="-44" y="-22" width="80" height="44" rx="8" fill="#fff" ${S} stroke-width="6"/><rect x="36" y="-9" width="10" height="18" rx="3" fill="${INK}"/><rect x="-36" y="-14" width="14" height="28" rx="3" fill="#E53935"/>`,
    thermo: `<g transform="rotate(35)"><rect x="-9" y="-44" width="18" height="60" rx="9" fill="#fff" ${S} stroke-width="6"/><circle cy="24" r="18" fill="#E53935" ${S} stroke-width="6"/><path d="M0 20V-20" stroke="#E53935" stroke-width="8" stroke-linecap="round"/></g>`,
    ball: `<circle r="38" fill="#fff" ${S} stroke-width="6"/><path d="M0 -15L14 -5L9 12L-9 12L-14 -5Z" fill="${INK}"/><path d="M0 -15V-38M14 -5L36 -12M9 12L22 31M-9 12L-22 31M-14 -5L-36 -12" ${S} stroke-width="5"/>`,
    zzz: `<text x="-34" y="26" font-size="50" font-weight="800" fill="#5C6BC0">Z</text><text x="-2" y="6" font-size="38" font-weight="800" fill="#5C6BC0">z</text><text x="22" y="-14" font-size="28" font-weight="800" fill="#5C6BC0">z</text>`,
    beach: `<path d="M-44 30Q0 14 44 30Z" fill="#FFE27A" ${S} stroke-width="5"/><path d="M0 22V-24" ${S} stroke-width="6"/><path d="M-40 -18Q0 -62 40 -18Q20 -30 0 -22Q-20 -30 -40 -18Z" fill="#E53935" ${S} stroke-width="5"/>`,
    rainbow: ['#E53935', '#FF9F43', '#FFD23F', '#2EAD4B', '#2F7DE1', '#8E44AD'].map((c, i) => `<path d="M${-46 + i * 6} 26A${46 - i * 6} ${46 - i * 6} 0 0 1 ${46 - i * 6} 26" fill="none" stroke="${c}" stroke-width="7"/>`).join(''),
  };
  H.ICON = ICON; H.at = at;
  function iconArt(name) {
    if (EP.icons && EP.icons[name]) return typeof EP.icons[name] === 'function' ? EP.icons[name](H) : EP.icons[name];
    if (name.startsWith('sw:')) return `<path d="M-40 -6C-44 -40 -8 -46 4 -34C22 -48 52 -28 40 -4C52 18 24 40 2 28C-18 42 -50 22 -40 -6Z" fill="${name.slice(3)}" ${S} stroke-width="6"/><circle cx="-14" cy="-14" r="8" fill="#fff" opacity=".6"/>`;
    if (name.startsWith('txt:')) return `<text y="24" text-anchor="middle" font-size="${name.length > 7 ? 54 : 70}" font-weight="800" fill="${INK}">${name.slice(4)}</text>`;
    if (name.includes('+')) { const [a, b] = name.split('+'); return at(-28, 0, .78, iconArt(a)) + at(36, 2, .72, iconArt(b)); }
    return ICON[name] || '';
  }
  function bubbles(t) {
    let s = '';
    for (const b of TL.bubbles) {
      if (t < b.a || t > b.b) continue;
      const p = back(seg(t, b.a, b.a + .28)) * (1 - eio(seg(t, b.b - .18, b.b)));
      const base = b.who === 'B' ? BX : RX, dir = b.who === 'B' ? -1 : 1, slot = b.slot || 0;
      const pair = TL.bubbles.some(o => o !== b && o.who === b.who && (o.slot || 0) !== slot && Math.abs(o.b - b.b) < .01);
      const cx = clamp(pair ? base + (slot === 0 ? -92 : 92) + dir * 20 : base + dir * 10, 110, W - 110);
      const cy = 640 + Math.sin(t * 3 + slot) * 4;
      s += `<g transform="translate(${cx} ${cy}) scale(${p})">`;
      if (slot === 0) s += `<path d="M${(base - cx) * .5 - 16} 66L${(base - cx) * .7} 104L${(base - cx) * .5 + 18} 66Z" fill="#fff" ${S} stroke-width="6"/>`;
      s += `<rect x="-86" y="-88" width="172" height="160" rx="24" fill="#fff" ${S} stroke-width="7"/>`;
      if (slot === 0) s += `<path d="M${(base - cx) * .5 - 12} 68L${(base - cx) * .5 + 14} 68" stroke="#fff" stroke-width="9"/>`;
      s += `<g transform="translate(0 -26)">${iconArt(b.icon)}</g>`;
      s += `<text y="56" text-anchor="middle" font-size="${b.label.length > 12 ? 23 : b.label.length > 9 ? 27 : 34}" font-weight="800" fill="${INK}">${b.label}</text></g>`;
    }
    return s;
  }

  // ---------- HTML katmanları ----------
  const hl = s => s.replace(/\*(.+?)\*/g, '<b>$1</b>');
  function overlays(t) {
    const pop = back(seg(t, .1, .7));
    let h = `<div class="title" style="font-size:${Math.min(118, Math.round(1230 / EP.title.length))}px;transform:rotate(-3deg) scale(${pop})">${EP.title}</div>`;
    h += `<div class="tag" style="opacity:${seg(t, .6, 1)}"><span>${EP.tag}</span></div>`;
    const card = TL.cards.find(c => t >= c.a && t < c.b), end = t >= TL.endAt;
    if (!card && !end) {
      const L = TL.lines.find(l => t >= l.start - .08 && t < l.start + l.dur + .3);
      if (L) { const p = eout(seg(t, L.start - .08, L.start + .12)); h += `<div class="sub ${L.who}" style="transform:translateY(${(1 - p) * 24}px);opacity:${p}"><span class="who">${L.who === 'B' ? 'BERFÎN' : 'RONÎ'}</span><div class="ku">${hl(L.ku)}</div><div class="tr">${L.tr}</div></div>`; }
    }
    if (card) {
      const f = Math.min(seg(t, card.a, card.a + .25), 1 - seg(t, card.b - .25, card.b));
      h += `<div style="position:absolute;inset:0;background:#15131c;opacity:${f * .82}"></div>`;
      h += `<div class="card" style="opacity:${f};transform:rotate(-4deg) scale(${.6 + .4 * back(seg(t, card.a + .05, card.a + .4))})"><div><div class="ku">${card.ku}</div><div class="tr">${card.tr}</div></div></div>`;
    }
    if (end) {
      const f = eout(seg(t, TL.endAt, TL.endAt + .45)), k = EP.vocabScale ?? 1;
      h += `<div style="position:absolute;inset:0;background:#15131c;opacity:${f * .7}"></div>`;
      let rows = '';
      EP.vocab.forEach(([a, b, c], i) => { const p = back(seg(t, TL.endAt + .5 + i * .4, TL.endAt + .78 + i * .4)); rows += `<div class="row" style="opacity:${Math.min(1, p * 1.5)};transform:translateX(${(1 - p) * -40}px)"><span class="k" style="font-size:${66 * k}px${c ? `;color:${c};-webkit-text-stroke:${c === '#fff' ? '7px #1f1b16;paint-order:stroke fill' : '0'}` : ''}">${a}</span><span class="t" style="font-size:${46 * k}px">${b}</span></div>`; });
      h += `<div class="end" style="transform:translateY(${(1 - f) * 900}px)"><h2>Peyvên îro</h2><h3>Bugünün kelimeleri</h3>${rows}</div>`;
    }
    return h;
  }

  // ---------- Ses efektleri listesi (build.mjs okur) ----------
  TL.sfx = [{ type: 'title', at: .15 }];
  for (const c of TL.cards) TL.sfx.push({ type: 'chime', at: c.a + .05 });
  for (const b of TL.bubbles) TL.sfx.push({ type: 'pop', at: b.a });
  EP.vocab.forEach((_, i) => TL.sfx.push({ type: 'row', at: TL.endAt + .5 + i * .4, i }));
  if (EP.sfx) TL.sfx.push(...EP.sfx(H));

  // ---------- Kapak ----------
  // renderCover({ title, words: [[kurdî, türkçe], ...] }) — verilmezse bölümün kendi verisi kullanılır
  window.renderCover = function (o = {}) {
    const title = o.title || EP.title, words = (o.words || EP.vocab).slice(0, 7);
    const cx = 540, cy = 1180;
    let s = `<svg width="${W}" height="${HH}" viewBox="0 0 ${W} ${HH}"><rect width="${W}" height="${HH}" fill="#FFC83D"/>`;
    for (let i = 0; i < 24; i += 2) { const a = rad(i * 15 - 7), b = rad(i * 15 + 8); s += `<path d="M${cx} ${cy}L${cx + Math.cos(a) * 2400} ${cy + Math.sin(a) * 2400}L${cx + Math.cos(b) * 2400} ${cy + Math.sin(b) * 2400}Z" fill="#FFD666"/>`; }
    s += `<ellipse cx="${cx}" cy="1600" rx="470" ry="70" fill="#fff" opacity=".85"/>`;
    const k = 1.5, gy = 1590;
    const [nb, fb] = POSE.wave(.35), [nr, fr] = POSE.cheer(0);
    const B = { who: 'B', x: 0, expr: 'happy', ra: [30, -20], la: fb, mouth: .7 }, R = { who: 'R', x: 0, expr: 'happy', la: nr, ra: fr, mouth: .5 };
    s += `<g transform="translate(700 ${gy}) scale(${k}) translate(0 ${-(FLOOR - 10)})">${person(R, 1)}</g>`;
    s += `<g transform="translate(380 ${gy}) scale(${k}) translate(0 ${-(FLOOR - 10)})">${person(B, 1)}</g>`;
    s += `</svg>`;
    const cols = ['#E0407B', '#2468D8'];
    const spots = [['left:26px', 800, -8], ['right:26px', 790, 7], ['left:26px', 1130, 6], ['right:26px', 1140, -6], ['left:40px', 1690, -4], ['right:40px', 1690, 5], ['left:50%', 1806, 2]];
    let h = `<div class="cv-top"><span>KURDÎ · KURMANCÎ</span></div>`;
    h += `<div class="cv-a1"><b>A1</b> PRATİK</div>`;
    h += `<div class="cv-title"><div style="font-size:${Math.min(112, Math.round(1050 / title.length))}px">${title}</div></div>`;
    words.forEach(([a, b], i) => { const [x, y, r] = spots[i]; h += `<div class="cv-chip" style="${x};top:${y}px;transform:translate(${x === 'left:50%' ? '-50%' : '0'},-50%) rotate(${r}deg)"><div class="k" style="color:${cols[i % 2]};font-size:${a.length > 9 ? 42 : 58}px">${a}</div><div class="t">${b}</div></div>`; });
    document.getElementById('stage').innerHTML = s + h;
  };

  // ---------- Kare ----------
  const layer = (name, t, P) => (EP[name] ? EP[name](t, P, H) : '');
  window.renderAt = function (t) {
    const P = poses(t);
    let s = `<svg width="${W}" height="${HH}" viewBox="0 0 ${W} ${HH}">`;
    s += room(t) + layer('back', t, P) + table(t) + layer('mid', t, P);
    if (P.R.show) s += person(P.R, t);
    if (P.B.show) s += person(P.B, t);
    s += bubbles(t) + layer('front', t, P) + `</svg>` + overlays(t);
    document.getElementById('stage').innerHTML = s;
  };

  if (!navigator.webdriver) { // tarayıcıda önizleme
    const st = document.getElementById('stage');
    const fit = () => { st.style.transform = `scale(${Math.min(innerWidth / W, innerHeight / HH)})`; };
    fit(); addEventListener('resize', fit);
    const t0 = performance.now(), played = new Set();
    (function loop() {
      const t = ((performance.now() - t0) / 1000) % TL.dur;
      if (t < .1) played.clear();
      for (const l of TL.lines) if (t >= l.start && !played.has(l.id)) { played.add(l.id); new Audio(`episodes/${window.EPNAME}/audio/${l.id}.mp3`).play().catch(() => { }); }
      window.renderAt(t); requestAnimationFrame(loop);
    })();
  } else window.renderAt(0);
})();
