// "Pisîka keskesor" — Reng (renkler)
(function () {
  const BXS = [370, 280, 190, 100], COL = ['#E53935', '#FFD23F', '#2F7DE1', '#2EAD4B'], NAME = ['sor', 'zer', 'şîn', 'kesk'];
  const TY = 985, RIM = TY - 78, HOME = 648;

  // Kedinin atlayışları: [başlangıç, bitiş, nereden, nereye]  (-1 = yer)
  function jumps(H) {
    const T = H.T;
    return [
      [T('j1', .1), T('j1', .7), -1, 0],
      [T('j2', .1), T('j2', .75), 0, 1],
      [T('l08', .26), T('l08', .42), 1, 2],
      [T('l08', .6), T('l08', .76), 2, 3],
      [T('l09', .35), T('l09', .95), 3, -1],
    ];
  }
  const spot = (i, H) => (i < 0 ? [HOME, H.FLOOR - 10] : [BXS[i], TY - 8]);
  function catState(t, H) {
    const J = jumps(H), pops = [H.T('l07', 0) - .1, H.T('l08', 0) - .1, J[2][1] + .05, J[3][1] + .05];
    let st = { where: -1, color: '#fff', x: HOME, y: H.FLOOR - 10, air: 0, rot: 0, sub: 0 };
    for (let k = 0; k < J.length; k++) {
      const [a, b, from, to] = J[k];
      if (t < a) break;
      const col = from < 0 ? '#fff' : COL[from];
      if (t < b) { const u = H.eio(H.seg(t, a, b)), [x0, y0] = spot(from, H), [x1, y1] = spot(to, H); const hgt = k === 0 || k === 4 ? 300 : 150; return { where: 'air', color: col, x: H.lerp(x0, x1, u), y: H.lerp(y0, y1, u) - Math.sin(u * Math.PI) * hgt, air: 1, rot: (x1 < x0 ? -1 : 1) * Math.sin(u * Math.PI) * 18, sub: 0, land: to }; }
      const [x, y] = spot(to, H);
      if (to >= 0) { const p = pops[to], up = H.back(H.seg(t, p, p + .25)); st = { where: to, color: t >= p ? COL[to] : col, x, y: y + (1 - (t >= p ? up : 0)) * 74, air: 0, rot: 0, sub: t >= p ? 0 : 1 }; }
      else st = { where: -1, color: 'url(#rb)', x, y, air: 0, rot: 0, sub: 0, rainbow: true };
    }
    return st;
  }
  function cat(st, t, H, mood) {
    const { S } = H, f = st.color, sq = st.air ? 1.08 : 1 + Math.sin(t * 3) * .015;
    let s = `<g transform="translate(${st.x} ${st.y}) rotate(${st.rot}) scale(${.86 / sq} ${.86 * sq})">`;
    s += `<path d="M34 -14q46 -6 40 -52q-2 -14 -12 -10" fill="none" stroke="${INKC}" stroke-width="20" stroke-linecap="round"/><path d="M34 -14q46 -6 40 -52q-2 -14 -12 -10" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round"/>`;
    s += `<ellipse cy="-38" rx="42" ry="40" fill="${f}" ${S} stroke-width="7"/>`;
    s += `<path d="M-30 -116L-34 -150L-8 -130ZM30 -116L34 -150L8 -130Z" fill="${f}" ${S} stroke-width="7"/>`;
    s += `<circle cy="-100" r="36" fill="${f}" ${S} stroke-width="7"/>`;
    if (mood === 'happy') s += `<path d="M-22 -104q8 -10 16 0M6 -104q8 -10 16 0" fill="none" ${S} stroke-width="5"/>`;
    else s += `<ellipse cx="-14" cy="-106" rx="5" ry="8" fill="${INKC}"/><ellipse cx="14" cy="-106" rx="5" ry="8" fill="${INKC}"/>`;
    s += `<path d="M-5 -93h10l-5 6z" fill="#FF8FB0" ${S} stroke-width="3"/><path d="M0 -87q-6 8 -12 2M0 -87q6 8 12 2" fill="none" ${S} stroke-width="4"/>`;
    s += `<path d="M-22 -92h-26M-22 -86l-24 6M22 -92h26M22 -86l24 6" ${S} stroke-width="3"/>`;
    return s + `</g>`;
  }
  const INKC = '#1f1b16';
  const DEFS = `<defs><linearGradient id="rb" x1="0" y1="0" x2="1" y2="0">${['#E53935', '#FF9F43', '#FFD23F', '#2EAD4B', '#2F7DE1', '#8E44AD'].map((c, i) => `<stop offset="${i / 6}" stop-color="${c}"/><stop offset="${(i + 1) / 6}" stop-color="${c}"/>`).join('')}</linearGradient><clipPath id="abv"><rect x="0" y="0" width="1080" height="${TY}"/></clipPath></defs>`;

  window.EP = {
    title: 'PISÎKA KESKESOR',
    tag: 'Kurdî A1 · Reng',
    clockH: 14.5,
    table: () => ({}),
    seq: [
      { id: 'l01', who: 'B', ku: 'Ronî, em *rengan* hîn bibin! Ev çi reng e?', tr: 'Ronî, renkleri öğrenelim! Bu ne renk?', tts: '[happy] Ronî, em rengan hîn bibin! [curious] Ev çi reng e?',
        s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } },
      { id: 'l02', who: 'R', ku: '*Sor* e!', tr: 'Kırmızı!', tts: '[excited] Sor e!', s: { pose: 'cheer', expr: 'happy', hop: 30 } },
      { id: 'l03', who: 'B', ku: 'Aferîn! Û ev?', tr: 'Aferin! Ya bu?', tts: '[happy] Aferîn! [curious] Û ev?', s: { pose: 'show', expr: 'happy' } },
      { id: 'l04', who: 'R', ku: '*Zer* e!', tr: 'Sarı!', tts: '[excited] Zer e!', s: { pose: 'cheer', expr: 'happy', hop: 30 } },
      { id: 'l05', who: 'B', ku: 'Û *pisîka* min çi reng e?', tr: 'Ya kedim ne renk?', tts: '[curious] Û pisîka min çi reng e?', s: { pose: 'down', expr: 'happy' } },
      { id: 'l06', who: 'R', ku: 'Pisîka te *spî* ye!', tr: 'Kedin beyaz!', tts: '[confident] Pisîka te spî ye!', s: { pose: 'down', expr: 'happy' } },
      { id: 'j1', wait: 1.6 },
      { id: 'l07', who: 'R', gap: .25, ku: 'Na… *sor* e!', tr: 'Yok… kırmızı!', tts: '[surprised] Na… sor e!', s: { pose: 'think', expr: 'wide' }, l: { pose: 'idle', expr: 'wide' } },
      { id: 'j2', wait: 1.3 },
      { id: 'l08', who: 'R', gap: .2, ku: '*Zer* e! Na, *şîn* e! Na, *kesk* e!', tr: 'Sarı! Yok, mavi! Yok, yeşil!', tts: '[surprised] Zer e! [nervous] Na, şîn e! [shouting] Na, kesk e!',
        s: { pose: 'up', expr: 'wide', sweat: true }, l: { pose: 'face', expr: 'wide' } },
      { id: 'l09', who: 'B', ku: 'Pisîkê! *Raweste!*', tr: 'Kedi! Dur!', tts: '[shouting] Pisîkê! Raweste!', s: { pose: 'up', expr: 'angry', red: .5, shake: 1 }, l: { pose: 'idle', expr: 'wide' } },
      { id: 'l10', who: 'R', gap: .6, ku: 'Berfîn… pisîka te *keskesor* e!', tr: 'Berfîn… kedin gökkuşağı olmuş!', tts: '[mischievously] Berfîn… pisîka te keskesor e!',
        s: { pose: 'down', expr: 'smug' }, l: { pose: 'idle', expr: 'wide' } },
      { id: 'l11', who: 'B', ku: 'Pisîka min a *spî*!', tr: 'Benim beyaz kedim!', tts: '[crying] Pisîka min a spî!', s: { pose: 'up', expr: 'sad', tear: true } },
      { id: 'l12', who: 'R', ku: 'Ne xem e. Niha ew pir *xweşik* e!', tr: 'Dert değil. Şimdi çok güzel oldu!', tts: '[warmly] Ne hem e. [happy] Nıha ew pır hweşık e!',
        s: { pose: 'shrug', expr: 'happy' }, l: { pose: 'idle', expr: 'sad', tear: true }, then: [{ f: .7, l: { pose: 'idle', expr: 'happy' } }] },
    ],
    tail: 1.5,
    bubbles: [
      { line: 'l01', f: .6, to: 'l02', who: 'B', icon: 'sw:#E53935', label: 'çi reng?' },
      { line: 'l03', f: .5, to: 'l04', who: 'B', icon: 'sw:#FFD23F', label: 'û ev?' },
      { line: 'l06', f: .4, who: 'R', icon: 'sw:#ffffff', label: 'spî' },
      { line: 'l07', f: .4, who: 'R', icon: 'sw:#E53935', label: 'sor' },
      { line: 'l08', f: 0, tf: .26, hold: 0, who: 'R', icon: 'sw:#FFD23F', label: 'zer' },
      { line: 'l08', f: .42, tf: .62, hold: 0, who: 'R', icon: 'sw:#2F7DE1', label: 'şîn' },
      { line: 'l08', f: .76, who: 'R', icon: 'sw:#2EAD4B', label: 'kesk' },
      { line: 'l10', f: .45, who: 'R', icon: 'rainbow', label: 'keskesor' },
    ],
    vocab: [
      ['reng', 'renk'], ['sor', 'kırmızı', '#E53935'], ['zer', 'sarı', '#E0A800'], ['şîn', 'mavi', '#2F7DE1'], ['kesk', 'yeşil', '#2EAD4B'], ['spî', 'beyaz', '#fff'], ['keskesor', 'gökkuşağı', '#8E44AD'],
    ],
    sfx(H) {
      const out = [];
      jumps(H).forEach(([a, b, , to]) => { out.push({ type: 'boing', at: a }); out.push({ type: to >= 0 ? 'splash' : 'thud', at: b }); });
      out.push({ type: 'ding', at: H.T('l09', .95) + .1 });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T;
      if (t > T('j1', 0) && t < T('l07', 0)) { P.B.expr = 'wide'; P.R.expr = 'wide'; P.B.look = -.6; }
      if (t > T('j2', 0) && t < T('l08', 0)) { P.B.expr = 'wide'; P.R.expr = 'wide'; P.B.look = -.6; }
      if (t > T('l07', 0) && t < T('l09', .3)) P.B.look = -.6;
      if (t > T('l12', 1)) { P.B.expr = 'happy'; P.R.expr = 'happy'; }
    },
    // masadaki boya kovaları + kovadaki kedi
    mid(t, P, H) {
      const { S } = H, st = catState(t, H);
      let s = DEFS;
      BXS.forEach((x, i) => { s += `<ellipse cx="${x}" cy="${RIM}" rx="40" ry="11" fill="${COL[i]}" ${S} stroke-width="6"/>`; });
      if (st.where >= 0) s += `<g clip-path="url(#abv)">${cat(st, t, H)}</g>`;
      BXS.forEach((x, i) => {
        s += `<path d="M${x - 40} ${RIM}q40 16 80 0l-8 ${TY - RIM}h-64z" fill="#ECEFF1" ${S} stroke-width="6"/>`;
        s += `<path d="M${x - 36} ${RIM + 14}q36 14 72 0l-2 16q-34 12 -68 0z" fill="${COL[i]}"/>`;
        s += `<text x="${x}" y="${TY - 16}" text-anchor="middle" font-size="27" font-weight="800" fill="${INKC}">${NAME[i]}</text>`;
      });
      // sıçrayan boya
      for (const [, b, , to] of jumps(H)) if (to >= 0 && t >= b && t < b + .55) { const u = (t - b) / .55; for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * .32, v = 150 + (k % 3) * 40; s += `<circle cx="${BXS[to] + Math.cos(a) * v * u}" cy="${RIM + Math.sin(a) * v * u + 260 * u * u}" r="${9 - u * 5}" fill="${COL[to]}" ${S} stroke-width="3" opacity="${1 - u * .6}"/>`; } }
      return s;
    },
    front(t, P, H) {
      const st = catState(t, H);
      if (st.where >= 0) return '';
      let s = '';
      const end = t > H.T('l12', 0);
      if (st.rainbow && end) st.y -= Math.abs(Math.sin((t - H.T('l12', 0)) * 6)) * 26;
      s += `<ellipse cx="${st.x}" cy="${H.FLOOR - 4}" rx="44" ry="9" fill="#000" opacity=".12"/>` + cat(st, t, H, st.rainbow && end ? 'happy' : '');
      if (st.rainbow) { const a = H.T('l09', .95); for (let k = 0; k < 5; k++) { const ph = t * 2 + k * 1.3, x = st.x + Math.cos(ph) * (70 + k * 6), y = H.FLOOR - 90 + Math.sin(ph * 1.3) * 60, r = 9 + 5 * Math.sin(t * 6 + k); s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${H.S} stroke-width="3" opacity="${Math.min(1, (t - a) * 3)}"/>`; } }
      return s;
    },
  };
})();
