// "Heye û tune" — SHORTS (dikey, ~1 dk, sıfırdan kurgu): var / yok. Ronî bilerek saçmalar; Berfîn'in sopası HAYDAR eline iner, bir de tekme yer.
// Sesler: ElevenLabs API (eleven_v4). Örnek cümleler Latin yazımla, diğerleri Arap harfli yazımla verilir.
(function () {
  const SAFE = H => (id, f = 0) => (H.TL.marks[id] ? H.T(id, f) : NaN);
  const INKC = '#1f1b16';
  const LAND = /[?&]land=1/.test(location.search);
  const TEACH = { pose: 'show', expr: 'happy' }, OK = { pose: 'cheer', expr: 'happy', hop: 24 }, LAUGH = { pose: 'face', expr: 'happy' };
  const B = (id, ku, tr, tts, o = {}) => ({ id, who: 'B', ku, tr, tts, gap: .5, s: TEACH, ...o });
  const R = (id, ku, tr, tts, o = {}) => ({ id, who: 'R', ku, tr, tts, gap: .5, s: { pose: 'point', expr: 'happy' }, ...o });
  const HA = (id, ku, tr, tts, o = {}) => B(id, ku, tr, tts, { laugh: true, s: LAUGH, then: [{ f: .35, s: { pose: 'point', expr: 'happy' } }], l: { pose: 'idle', expr: 'wide' }, ...o });
  const G = { gap: .35 };
  const WH = ['bx', 'cx', 'ex'];
  const TEA = `<ellipse cy="30" rx="34" ry="8" fill="#fff" stroke="#1f1b16" stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" stroke="#1f1b16" stroke-width="5"/>`;

  const SEQ = [
    B('a02', 'Ev *Haydar* e. Haydar ji henekan hez *nake*.', 'Bu Haydar. Haydar şakaları sevmez.', '', { gap: .2, write: 1, s: { pose: 'show', expr: 'smug' }, l: { pose: 'idle', expr: 'wide' } }),

    B('b01', 'Pirtûka min *heye*.', 'Kitabım var.', '', { gap: .3, write: 1 }),
    R('b02', 'Pirtûka min tune… min *xwar*!', 'Kitabım yok… yedim!', '', { gap: .25, s: { pose: 'hips', expr: 'smug' } }),
    B('b03', '*Haydar*!', 'Haydar!', '', { gap: .2, s: { pose: 'hips', expr: 'angry', red: .4 } }),
    { id: 'bx', wait: 1.5 },
    R('b04', 'Ay! Destê min! Baş e: pirtûka min *heye*.', 'Ay! Elim! Tamam: kitabım var.', '', { gap: .05, s: { pose: 'face', expr: 'sad', tear: true }, l: { pose: 'hips', expr: 'smug' } }),

    B('c01', 'Pereyê min *tune*.', 'Param yok.', '', { gap: .3, write: 1 }),
    R('c02', 'Pereyê min heye! *Mîlyonek*!', 'Benim param var! Bir milyon!', '', { gap: .25, s: { pose: 'cheer', expr: 'smug' } }),
    B('c05', '*Haydar*!', 'Haydar!', '', { gap: .2, s: { pose: 'hips', expr: 'angry', red: .4 } }),
    { id: 'cx', wait: 1.5 },
    R('c06', 'Ay! Pereyê min *tune*! Tune!', 'Ay! Param yok! Yok!', '', { gap: .05, s: { pose: 'up', expr: 'sad', tear: true }, l: { pose: 'hips', expr: 'smug' } }),

    B('d01', 'Pirs: Çaya te *heye*?', 'Soru: Çayın var mı?', '', { gap: .3, write: 1 }),
    R('d02', 'Çaya min tune… lê çaya *te* heye!', 'Benim çayım yok… ama senin çayın var!', '', { gap: .25, s: { pose: 'point', expr: 'smug', look: -1 } }),
    B('d04', 'Niha ne Haydar… *ling*!', 'Şimdi Haydar değil… tekme!', '', { gap: .3, s: { pose: 'hips', expr: 'angry', red: .6 }, l: { pose: 'idle', expr: 'wide', sweat: true } }),
    { id: 'dx', wait: 2.8 },
    R('d05', 'Ling ji Haydar *xirabtir* e…', 'Tekme Haydar\'dan beter…', '', { gap: .05, s: { pose: 'down', expr: 'dizzy' }, l: { pose: 'hips', expr: 'smug' } }),

    B('q03', '*Dora te*! Sê pisîkên min… ___ ?', 'Sıra sende! Üç kedim… ?', '[cheerful, inviting] Dora te! Sê pisîkên min… çi?', { gap: .3, s: { pose: 'show', expr: 'happy' } }),
    { id: 'qb', wait: 3.4 },
    R('q04', 'Ez dizanim! Lê *nabêjim*! Bersiva xwe di *şîroveyan* de binivîse!', 'Biliyorum! Ama söylemem! Cevabını yorumlara yaz!', '', { gap: .15, s: { pose: 'point', expr: 'smug' } }),
    { id: 'qz', wait: .3 },
  ];

  // ---------- tahta sayfaları: [sayfanın başladığı replik, [[yazıldığı replik, oran, metin, renk?, yazan?], ...]] ----------
  const W_ = '#fff', Y_ = '#FFE14D', P_ = '#FF9EC4', G_ = '#9BE59B';
  const PAGES = [
    ['a02', 'HEYE = var  ·  TUNE = yok', [['a02', .3, 'Ev *Haydar* e.  →', P_]]],
    ['b01', 'HEYE  ✓', [['b01', .1, 'Pirtûka min *heye*.'], ['b04', .6, 'Kitabım *var*.', G_]]],
    ['c01', 'TUNE  ✗', [['c01', .1, 'Pereyê min *tune*.'], ['c06', .4, 'Param *yok*.', G_]]],
    ['d01', 'PIRS  ?', [['d01', .3, 'Çaya te *heye*?'], ['d02', .2, 'Erê, *heye*.  /  Na, *tune*.', P_]]],
  ];
  // tahta geometrisi
  const BD = LAND ? { x: -105, y: 600, w: 540, h: 440 } : { x: 46, y: 372, w: 988, h: 392 };
  const FS = LAND ? 46 : 58, LH = LAND ? 84 : 76, TOP = LAND ? 140 : 124;
  const CPS = 15; // tebeşir hızı: saniyede harf
  const plain = x => x.replace(/\*/g, '');
  const WDL = L => Math.max(.45, plain(L[2]).replace(/\s+/g, ' ').length / CPS); // satırın yazılma süresi
  // ilk n harfi göster (*vurgu* korunur)
  function partial(txt, n) { let o = '', k = 0, hl = false; for (const ch of txt) { if (ch === '*') { o += hl ? '</tspan>' : '<tspan fill="#FFE14D">'; hl = !hl; continue; } if (k >= n) break; o += ch.replace('&', '&amp;').replace('<', '&lt;'); k++; } if (hl) o += '</tspan>'; return o; }

  function curPage(t, H) { let k = 0; PAGES.forEach((p, i) => { if (t >= SAFE(H)(p[0], 0)) k = i; }); return k; }
  function writing(t, H) { // şu an yazılan satır: {who}
    const pg = PAGES[curPage(t, H)];
    for (const L of pg[2]) { const a = H.T(L[0], L[1]); const d = WDL(L); if (t >= a && t < a + d) return { who: L[4] || 'B', u: (t - a) / d }; }
    return null;
  }

  window.EP = {
    title: 'HEYE Û TUNE',
    tag: 'Kurdî A1 · Shorts',
    noClock: true,
    noTable: true,
    seq: SEQ,
    tail: .3,
    intro: 1.0,
    noVocab: true,
    bubbles: [],
    icons: {
      tu: H => `<circle cy="-14" r="18" fill="#2F7DE1" ${H.S} stroke-width="5"/><path d="M-30 36q0 -34 30 -34t30 34z" fill="#2F7DE1" ${H.S} stroke-width="5"/>`,
      ez: H => `<circle cy="-14" r="18" fill="#F06A9B" ${H.S} stroke-width="5"/><path d="M-30 36q0 -34 30 -34t30 34z" fill="#F06A9B" ${H.S} stroke-width="5"/>`,
      em: H => `<circle cx="-18" cy="-14" r="15" fill="#F06A9B" ${H.S} stroke-width="5"/><circle cx="18" cy="-14" r="15" fill="#2F7DE1" ${H.S} stroke-width="5"/><path d="M-42 36q0 -30 24 -30q12 0 18 10q6 -10 18 -10q24 0 24 30z" fill="#C9A24D" ${H.S} stroke-width="5"/>`,
      pisik: H => `<ellipse cy="18" rx="30" ry="22" fill="#FF9F43" ${H.S} stroke-width="5"/><circle cy="-16" r="24" fill="#FF9F43" ${H.S} stroke-width="5"/><path d="M-20 -30l-4 -24l16 12zM20 -30l4 -24l-16 12z" fill="#FF9F43" ${H.S} stroke-width="5"/><circle cx="-9" cy="-18" r="4" fill="${INKC}"/><circle cx="9" cy="-18" r="4" fill="${INKC}"/>`,
      pere: H => `<rect x="-46" y="-24" width="92" height="48" rx="6" fill="#A5D6A7" ${H.S} stroke-width="5"/><circle r="14" fill="#fff" ${H.S} stroke-width="4"/>`,
      tea: H => TEA,
      book: H => `<path d="M-44 -30q22 -10 44 0q22 -10 44 0v60q-22 -10 -44 0q-22 -10 -44 0z" fill="#fff" ${H.S} stroke-width="5"/><path d="M0 -30v60" ${H.S} stroke-width="4"/>`,
    },
    outro: { id: 'zz', laugh: 'zl', ku: 'Gundîno, xatirê we hemiyan!', tr: '' },
    coverWords: [['heye', 'var'], ['tune', 'yok'], ['hene', 'var (çoğul)'], ['pirtûk', 'kitap'], ['pere', 'para'], ['henek', 'şaka'], ['aqil', 'akıl']],
    vocab: [
      ['Pirtûka min heye.', 'Kitabım var.'],
      ['Pereyê min tune.', 'Param yok.'],
      ['Çaya te heye?', 'Çayın var mı?'],
      ['Birayên min hene.', 'Kardeşlerim var.'],
      ['heye · hene', 'var (tekil · çoğul)'],
      ['tune', 'yok'],
      ['pirtûk', 'kitap'],
      ['pere', 'para'],
      ['aqil', 'akıl'],
      ['henek', 'şaka'],
    ],
    vocabIcons: ['book', 'pere', 'tea', 'em', 'ok', 'no', 'book', 'pere', 'q', 'smile'],
    vocabTts: {
      ku: ['Pirtûka min heye', 'Pereyê min tune', 'Çaya te heye?', 'Birayên min hene', 'Heye, hene', 'Tune', 'Pirtûk', 'Pere', 'Aqil', 'Henek'],
      tr: ['Kitabım var', 'Param yok', 'Çayın var mı?', 'Kardeşlerim var', 'var', 'yok', 'kitap', 'para', 'akıl', 'şaka'],
    },
    sfx(H) {
      const T = SAFE(H), out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const p of PAGES) { if (p[0] !== 'a01') out.push({ type: 'sweep', at: T(p[0], 0) - .25 }); for (const L of p[2]) { const a = T(L[0], L[1]), d = WDL(L); for (let k = 0; k * .13 < d; k++) out.push({ type: 'tek', at: a + k * .13 }); } }
      for (const id of WH) out.push({ type: 'whoosh', at: T(id, .35) }, { type: 'bonk', at: T(id, .45) }, { type: 'boing', at: T(id, .5) });
      out.push({ type: 'whoosh', at: T('dx', .25) }, { type: 'bonk', at: T('dx', .33) }, { type: 'rise', at: T('dx', .36) }, { type: 'thud', at: T('dx', .62) });
      for (const id of ['f03', 'f05', 'f07']) out.push({ type: 'ding', at: T(id, .9) });
      out.push({ type: 'pop', at: T('d02', .6) }, { type: 'boing', at: T('g02', .5) }, { type: 'whoosh', at: T('g03', .1) }, { type: 'whoosh', at: T('g04', .1) });
      for (const q of ['qa', 'qb']) { for (let k = 0; k < 3; k++) out.push({ type: 'tek', at: T(q, 0) + .3 + k * 1.1 }); }
      out.push({ type: 'whoosh', at: T('q01', 0) }, { type: 'ding', at: T('q02', 0) }, { type: 'rise', at: T('q02', .05) }, { type: 'whoosh', at: T('q03', 0) - .3 }, { type: 'pop', at: T('q04', .5) });
      return out;
    },
    tweak(t, P, H) {
      // Shorts vedası: önce ikisi sahneden sağa koşarak çıkar, sonra köşeden kafalarını uzatırlar
      { const O = H.TL.outro, Rr = P.R, Bb = P.B; if (O) {
        const r = H.eio(H.seg(t, O.a0 - .7, O.a0 - .05)), b = H.eio(H.seg(t, O.b - .8, O.b - .2));
        if (r > 0) { Rr.x = H.lerp(H.RX, 1450, r); Rr.look = 1; Rr.walk = t * 4.5; Rr.expr = 'happy'; if (r >= 1) Rr.show = false; }
        if (b > 0) { Bb.x = H.lerp(H.BX, 1450, b); Bb.look = 1; Bb.walk = t * 4.5; Bb.expr = 'happy'; if (b >= 1) Bb.show = false; }
        if (r > 0 || b > 0) return; } }
      const T = SAFE(H), Rr = P.R, Bb = P.B;
      // yazma pozu
      const w = writing(t, H);
      if (w) { const wob = Math.sin(t * 30) * 8, W = w.who === 'R' ? Rr : Bb; if (LAND) { W.look = -1; W.la = [96 + wob * .5, 100 + wob]; } else { W.la = [150 + wob * .4, 172 + wob]; } }
      // Ronî tahtaya gider (j sahnesi), sonra geri döner
      { const go = H.eio(H.seg(t, T('j01', .5), T('j02', .3))), back = H.eio(H.seg(t, T('j05', 0), T('j05', .6))), k = go * (1 - back), RXw = LAND ? 470 : 260;
        if (k > 0) { Rr.x = H.lerp(H.RX, RXw, k); if (k < 1) { Rr.walk = t * 4; Rr.look = go < 1 ? -1 : 1; } Bb.x = H.lerp(H.BX, LAND ? 780 : 700, k); if (k < 1) Bb.walk = t * 4; if (k >= 1) Bb.look = -1; } }
      // Haydar tehdidi: Ronî titrer
      if (t > T('i02', .3) && t < T('i03', 1)) { Rr.dx = Math.sin(t * 45) * 3; }
      // Haydar darbeleri: Berfîn yaklaşır, vurur, döner; Ronî zıplar
      for (const id of WH) { const a = T(id, 0), b = T(id, 1); if (t > a && t < b) { const u = (t - a) / (b - a), near = u < .3 ? H.eio(u / .3) : u < .7 ? 1 : 1 - H.eio((u - .7) / .3);
        Bb.x = H.lerp(H.BX, H.RX - 285, near); if (near > 0 && near < 1) Bb.walk = t * 4; Bb.look = 1; Bb.expr = 'angry';
        const sw = u < .35 ? 0 : u < .45 ? (u - .35) / .1 : 1; Bb.ra = [H.lerp(150, 80, sw), H.lerp(170, 95, sw)];
        Rr.la = [58, 62]; Rr.look = -1;
        if (u > .45) { const v = (u - .45) / .55; Rr.dy = -Math.abs(Math.sin(v * Math.PI * 2)) * 90 * (1 - v); Rr.expr = 'wide'; Rr.tear = true; Rr.la = [58 + Math.sin(t * 40) * 25, 62]; } else Rr.expr = 'wide'; } }
      // çayı kapar
      if (t > T('d02', .6) && t < T('d04', 1)) { Rr.la = [110, 200]; Rr.expr = 'happy'; Rr.mouth = Rr.mouth || .3; }
      // tekme: Ronî uçar
      { const a = T('dx', 0), b = T('dx', 1); if (t > a && t < b) { const u = (t - a) / (b - a);
        const near = u < .25 ? H.eio(u / .25) : u < .5 ? 1 : 1 - H.eio(H.seg(u, .5, .7));
        Bb.x = H.lerp(H.BX, H.RX - 150, near); Bb.look = 1; Bb.expr = u < .5 ? 'angry' : 'smug'; if (u < .25) Bb.walk = t * 4;
        Bb.legUp = u > .25 && u < .45 ? Math.sin(H.seg(u, .25, .45) * Math.PI) : 0;
        if (u < .33) { Rr.expr = 'wide'; Rr.sweat = true; }
        else if (u < .62) { const v = H.seg(u, .33, .62); Rr.x = H.lerp(H.RX, 1500, v); Rr.dy = -Math.sin(v * Math.PI * .8) * 420; Rr.rot = v * 720; Rr.expr = 'wide'; if (v > .9) Rr.show = false; }
        else if (u < .72) Rr.show = false;
        else { const v = H.seg(u, .72, 1); Rr.x = H.lerp(1300, H.RX, v); Rr.look = -1; Rr.walk = t * 1.6; Rr.expr = 'dizzy'; Rr.tilt = 14; Rr.rot = Math.sin(t * 5) * 6; } } }
      // sınavda Haydar izliyor: Ronî titrer
      if (t > T('f01', .6) && t < T('f08', 0)) { Rr.dx = Math.sin(t * 40) * 2; }
      // final: Haydar'ı kapıp kaçar, Berfîn kovalar
      { const g2 = T('g02', .5), r0 = T('g02', 1), r1 = T('g04', 0), c0 = T('g04', 0), c1 = T('gx', 1);
        if (t > g2 && t < r0) { Rr.la = [110, 150]; Rr.expr = 'smug'; }
        if (t >= r0 && t < r1) { const v = H.eio(H.seg(t, r0, r1 - .2)); Rr.x = H.lerp(H.RX, 1300, v); Rr.look = 1; Rr.walk = t * 4.5; Rr.expr = 'happy'; if (v >= 1) Rr.show = false; Bb.look = 1; if (t > T('g03', .5)) { Bb.x = H.lerp(H.BX, 1300, H.eio(H.seg(t, T('g03', .5), r1))); Bb.walk = t * 4.5; } }
        if (t >= c0 && t < c1) { const v = H.seg(t, c0, c1); Rr.x = H.lerp(1350, -420, v); Rr.look = -1; Rr.walk = t * 4.5; Rr.expr = 'happy'; Rr.show = Rr.x > -300 && Rr.x < 1300; Rr.la = [150, 176]; Rr.dy = -Math.abs(Math.sin(t * 14)) * 14;
          Bb.x = Rr.x + 330; Bb.look = -1; Bb.walk = t * 4.5 + .5; Bb.expr = 'angry'; Bb.show = Bb.x > -300 && Bb.x < 1300; Bb.ra = [120, 150]; Bb.la = [120, 150]; Bb.dy = -Math.abs(Math.sin(t * 14 + 1)) * 14; } }
      // gülme
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
    },
    back(t, P, H) {
      const S = H.S, T = H.T;
      let s = '';
      // pencereyi duvarla kapat (dikeyde tahtanın altında kalmasın)
      if (!LAND) s += `<rect x="6" y="490" width="408" height="400" fill="#F6ECD6"/>`; else s += `<rect x="-10" y="440" width="450" height="170" fill="#F6ECD6"/>`;
      const { x, y, w, h } = BD, pi = curPage(t, H), pg = PAGES[pi], p0 = T(pg[0], 0);
      // tahta
      if (LAND) s += `<path d="M${x + 90} ${y + h}l-50 ${H.FLOOR - y - h - 10}M${x + w - 90} ${y + h}l50 ${H.FLOOR - y - h - 10}" ${S} stroke-width="14"/>`;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#8D5A2B" ${S} stroke-width="8"/><rect x="${x + 18}" y="${y + 18}" width="${w - 36}" height="${h - 36}" rx="6" fill="#1F4D3A" ${S} stroke-width="5"/>`;
      s += `<rect x="${x + 30}" y="${y + h - 16}" width="${w - 60}" height="16" rx="6" fill="#A56F38" ${S} stroke-width="5"/><rect x="${x + w - 190}" y="${y + h - 30}" width="60" height="16" rx="4" fill="#fff" ${S} stroke-width="3"/><rect x="${x + w - 110}" y="${y + h - 34}" width="70" height="22" rx="5" fill="#B0BEC5" ${S} stroke-width="3"/>`;
      // içerik (sayfa değişiminde silgi geçişi)
      const wipe = pi > 0 ? H.seg(t, p0 - .3, p0 + .15) : 1, fade = pi > 0 ? H.seg(t, p0, p0 + .3) : 1;
      s += `<g opacity="${fade}" font-family="Baloo,sans-serif">`;
      s += `<text x="${x + w / 2}" y="${y + (LAND ? 92 : 78)}" text-anchor="middle" font-size="${LAND ? 50 : 44}" font-weight="800" fill="#FFE14D" letter-spacing="2">${pg[1]}</text><path d="M${x + 60} ${y + (LAND ? 112 : 94)}h${w - 120}" stroke="#ffffff55" stroke-width="4" stroke-dasharray="14 10"/>`;
      if (pg[3] === 'cat') s += `<g transform="translate(${x + w - 130} ${y + (LAND ? 250 : 210)}) scale(1.5)" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><ellipse cy="18" rx="30" ry="22"/><circle cy="-16" r="24"/><path d="M-20 -30l-4 -24l16 12M20 -30l4 -24l-16 12M-9 -18v2M9 -18v2M24 26q30 -4 26 -34"/></g>`;
      pg[2].forEach((L, i) => {
        const a = T(L[0], L[1]); if (t < a) return;
        const ly = y + TOP + i * LH + FS * .8, lx = x + 60, col = L[3] || W_;
        let txt = L[2];
        if (L[5]) { const k = txt.indexOf('→'); if (t < T(L[5], .5)) txt = txt.slice(0, k + 1) + '  ?'; }
        const d = WDL(L), N = plain(txt).length, u = H.seg(t, a, a + d);
        // ease: başta biraz yavaş, sonra hızlanır
        const n = u >= 1 ? N : Math.floor(N * (u * u * .35 + u * .65));
        const rot = L[4] === 'R' ? -4 : 0;
        s += `<text x="${lx}" y="${ly}" font-size="${L[4] === 'R' ? FS * 1.05 : FS}" font-weight="800" fill="${col}" transform="rotate(${rot} ${lx} ${ly})" xml:space="preserve">${partial(txt, n)}${u < 1 ? `<tspan dx="3" dy="${Math.sin(t * 40) * 4}" fill="#fff" opacity=".8" font-size="${FS * .5}">●</tspan>` : ''}</text>`;
        if (L[4] === 'R' && t > T('j03', .3)) s += `<path d="M${lx - 6} ${ly - FS * .35}l${plain(txt).length * FS * .5} ${-FS * .4}" stroke="#FF5A5A" stroke-width="8" stroke-linecap="round"/>`;
      });
      s += `</g>`;
      if (wipe > 0 && wipe < 1) s += `<rect x="${x + 18 + (w - 150) * wipe}" y="${y + 30}" width="110" height="${h - 70}" rx="10" fill="#B0BEC5" ${S} stroke-width="5" opacity=".9"/>`;
      return s;
    },
    front(t, P, H) {
      const T = SAFE(H), Rr = P.R, Bb = P.B, S = H.S;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${Bb.x - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${Bb.x - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // tebeşir
      const w = writing(t, H);
      if (w) { const [hx, hy] = H.hand(w.who === 'R' ? P.R : Bb, -1); s += `<rect x="${hx - 6}" y="${hy - 26}" width="12" height="30" rx="4" fill="#fff" ${S} stroke-width="3" transform="rotate(${LAND ? -60 : -20} ${hx} ${hy})"/>`; }
      // HAYDAR (sopa): a02'den itibaren Berfîn'in sağ elinde; finalde Ronî'de
      const stolen = t > T('g02', .5), holder = stolen ? Rr : Bb;
      if (t > T('a02', .15) && holder.show !== false) {
        const [hx, hy] = H.hand(holder, stolen ? -1 : 1);
        let ang = stolen ? -20 + Math.sin(t * 14) * 25 : 28 + Math.sin(t * 2) * 3;
        for (const id of WH) { const a = T(id, 0), b = T(id, 1); if (t > a && t < b) { const u = (t - a) / (b - a); ang = u < .35 ? H.lerp(28, -50, u / .35) : u < .45 ? H.lerp(-50, 100, (u - .35) / .1) : H.lerp(100, 28, H.seg(u, .6, 1)); } }
        if (!stolen && t > T('f01', .5) && t < T('f08', 0)) ang = 60 + Math.sin(t * 3) * 4;
        if (!stolen && t > T('i02', .25) && t < T('i03', 1)) ang = -15 + Math.sin(t * 9) * 12; // havada sallanır // sınavda Ronî'ye doğrultulmuş
        const p = H.back(H.seg(t, T('a02', .15), T('a02', .45)));
        s += `<g transform="translate(${hx} ${hy}) rotate(${ang}) scale(${p})"><rect x="-9" y="-210" width="18" height="250" rx="9" fill="#A56F38" ${S} stroke-width="5"/><rect x="-11" y="-212" width="22" height="26" rx="8" fill="#5D4037" ${S} stroke-width="4"/><circle cx="-4" cy="-150" r="3.5" fill="${INKC}"/><circle cx="5" cy="-150" r="3.5" fill="${INKC}"/><path d="M-9 -160l6 4M10 -160l-6 4" ${S} stroke-width="3"/><path d="M-4 -138q4 -4 9 0" fill="none" ${S} stroke-width="3"/></g>`;
        if (t > T('a02', .3) && t < T('a03', 1)) s += `<g transform="translate(${hx + 120} ${hy - 200})"><rect x="-84" y="-28" width="168" height="56" rx="12" fill="#1f1b16"/><text y="13" text-anchor="middle" font-size="38" font-weight="800" fill="#FFD23F">HAYDAR</text></g>`;
      }
      // darbe efektleri
      for (const id of WH) { const a = T(id, .45), b = T(id, 1); if (t > a && t < b) { const [hx, hy] = H.hand(Rr, -1), u = (t - a) / .5; if (u < 1) s += `<g transform="translate(${hx} ${hy}) scale(${1 + u * .6})" opacity="${1 - u}"><path d="M0 -60L16 -20L58 -30L30 4L56 40L14 28L0 66L-14 28L-56 40L-30 4L-58 -30L-16 -20Z" fill="#FFD23F" ${S} stroke-width="5"/></g><text x="${hx - 150}" y="${hy - 90}" font-size="68" font-weight="800" fill="#E53935" opacity="${1 - u}" transform="rotate(-10 ${hx - 150} ${hy - 90})">ÇAT!</text>`; s += `<circle cx="${hx}" cy="${hy}" r="${16 + Math.sin(t * 20) * 6}" fill="#E53935" opacity=".7"/>`; } }
      // tekme efektleri
      { const a = T('dx', .33), u = (t - a) / .6; if (u > 0 && u < 1) s += `<text x="${H.RX - 60}" y="${H.FLOOR - 420}" font-size="84" font-weight="800" fill="#E53935" opacity="${1 - u}" transform="rotate(8 ${H.RX - 60} ${H.FLOOR - 420})">GUMM!</text>`; if (t > T('dx', .72) && t < T('d05', 1)) for (let k = 0; k < 3; k++) { const b = t * 4 + k * 2.1, x = Rr.x + Math.cos(b) * 70, y = H.FLOOR - 480 + Math.sin(b) * 16, r = 13; s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${S} stroke-width="3"/>`; } }
      // çay: Berfîn'in elinde, sonra Ronî kapar
      if (t > T('d01', 0) && t < T('d04', 1)) { const taken = t > T('d02', .6), [hx, hy] = H.hand(taken ? Rr : Bb, -1); s += `<g transform="translate(${hx} ${hy - 28}) scale(.7)">${TEA}</g>`; if (taken && t < T('d04', 0)) s += `<text x="${Rr.x + 70}" y="${H.FLOOR - 480}" font-size="42" font-weight="800" fill="#D9531E">hûrp!</text>`; }
      // fil balonu (Ronî'nin hayali)
      if (t > T('h02', .55) && t < T('h05', .2)) { const p = H.back(H.seg(t, T('h02', .55), T('h02', .85))), bx = Rr.x + (LAND ? 200 : 40), by = H.FLOOR - (LAND ? 640 : 760);
        s += `<g transform="translate(${bx} ${by}) scale(${p})"><circle cx="-40" cy="150" r="10" fill="#fff" ${S} stroke-width="4"/><circle cx="-20" cy="118" r="16" fill="#fff" ${S} stroke-width="4"/><ellipse rx="150" ry="100" fill="#fff" ${S} stroke-width="5"/>
        <rect x="-110" y="-5" width="220" height="80" rx="10" fill="#E3F2FD" ${S} stroke-width="5"/><path d="M-110 15h220M10 -5v80" ${S} stroke-width="3"/><circle cx="90" cy="35" r="5" fill="${INKC}"/>
        <g transform="translate(-40 ${-20 + Math.sin(t * 6) * 4})"><ellipse cx="0" cy="10" rx="58" ry="40" fill="#B0BEC5" ${S} stroke-width="5"/><circle cx="48" cy="-12" r="30" fill="#B0BEC5" ${S} stroke-width="5"/><path d="M70 -2q22 30 4 52" fill="none" ${S} stroke-width="9"/><path d="M70 -2q22 30 4 52" fill="none" stroke="#B0BEC5" stroke-width="3"/><ellipse cx="34" cy="-14" rx="16" ry="22" fill="#90A4AE" ${S} stroke-width="4"/><circle cx="58" cy="-20" r="4" fill="${INKC}"/><path d="M-36 44v14M-12 46v14M16 46v14M38 42v14" ${S} stroke-width="8"/></g>
        <text x="-30" y="-40" font-size="30" font-weight="800" fill="#4FC3F7">brrr</text></g>`; }
      // milyon balonu
      if (t > T('c02', .4) && t < T('c05', .1)) s += `<g transform="translate(${H.RX + 60} ${H.FLOOR - 500}) rotate(6)"><rect x="-110" y="-32" width="220" height="64" rx="12" fill="#A5D6A7" ${S} stroke-width="5"/><text y="14" text-anchor="middle" font-size="38" font-weight="800" fill="${INKC}">1.000.000 ₺</text></g>`;
      // ---------- DORA TE kartı ----------
      { const a1 = T('q01', 0), e1 = T('q03', 0) - .35, a2 = T('q03', 0) - .2, e2 = T('qz', 1);
        const Q = t >= a1 && t < e1 ? 1 : t >= a2 && t < e2 ? 2 : 0;
        if (Q) {
          const a = Q === 1 ? a1 : a2, e = Q === 1 ? e1 : e2, p = H.back(H.seg(t, a, a + .4)) * (1 - H.eio(H.seg(t, e - .3, e)));
          const CX = LAND ? 600 : 540, CY = LAND ? 830 : 760, CW = LAND ? 1100 : 980, CH = 640, sent = Q === 1 ? ['Pereyê min', 'tune', 'Param yok.'] : ['Sê pisîkên min', 'hene', 'Üç kedim var.'];
          const qc = Q === 1 ? 'qa' : 'qb', qa0 = T(qc, 0), qa1 = T(qc, 1), rev = Q === 1 && t >= T('q02', 0);
          s += `<rect x="-600" y="0" width="3200" height="2400" fill="#0b2318" opacity="${.45 * Math.min(1, p)}"/>`;
          s += `<g transform="translate(${CX} ${CY}) scale(${p})" font-family="Baloo,sans-serif" text-anchor="middle">`;
          s += `<rect x="${-CW / 2}" y="${-CH / 2}" width="${CW}" height="${CH}" rx="28" fill="#FBF5E6" stroke="#173D2A" stroke-width="10"/><rect x="${-CW / 2 + 16}" y="${-CH / 2 + 16}" width="${CW - 32}" height="${CH - 32}" rx="18" fill="none" stroke="#C9A227" stroke-width="4"/>`;
          s += `<rect x="-200" y="${-CH / 2 - 36}" width="400" height="72" rx="36" fill="#173D2A"/><text y="${-CH / 2 + 14}" font-size="40" font-weight="800" fill="#FFD23F" letter-spacing="2">DORA TE! ✎</text>`;
          s += `<text y="${-CH / 2 + 92}" font-size="30" font-weight="700" fill="#8A6D1E">SIRA SENDE · BOŞLUĞU DOLDUR</text>`;
          // cümle + boşluk
          const fs = LAND ? 76 : 70;
          const r = rev ? H.back(H.seg(t, T('q02', 0), T('q02', .15))) : 0;
          const blank = rev ? `<tspan fill="#2E7D32" text-decoration="underline" font-size="${fs * (.6 + .4 * r)}">${sent[1]}</tspan>` : `<tspan fill="#C9A227">_____</tspan>`;
          s += `<text y="-10" font-size="${fs}" font-weight="800" fill="#173D2A" xml:space="preserve">${sent[0]} ${blank} .</text>`;
          s += `<text y="62" font-size="40" font-weight="700" fill="#5B4A1E">${sent[2]}</text>`;
          // seçenekler
          ['heye', 'hene', 'tune'].forEach((o, i) => { const ox = (i - 1) * 250, ok = rev && o === sent[1], dim = rev && !ok;
            s += `<g transform="translate(${ox} 150)" opacity="${dim ? .35 : 1}"><rect x="-105" y="-44" width="210" height="80" rx="40" fill="${ok ? '#2E7D32' : '#fff'}" stroke="#173D2A" stroke-width="5"/><text y="12" font-size="44" font-weight="800" fill="${ok ? '#fff' : '#173D2A'}">${ok ? '✓ ' : ''}${o}</text></g>`; });
          // geri sayım
          if (t >= qa0 && t < qa1) { const k = Math.max(1, 3 - Math.floor((t - qa0 - .3) / 1.1)), f = ((t - qa0 - .3) % 1.1) / 1.1, sc = 1 + (1 - Math.min(1, f * 3)) * .4;
            s += `<g transform="translate(${CW / 2 - 70} ${-CH / 2 + 70}) scale(${sc})"><circle r="52" fill="#E53935" stroke="#173D2A" stroke-width="6"/><text y="20" font-size="60" font-weight="800" fill="#fff">${k}</text></g>`; }
          // açıklama / ipucu
          if (rev) s += `<text y="${CH / 2 - 52}" font-size="38" font-weight="800" fill="#2E7D32">tune = yok  →  Param YOK = Pereyê min tune</text>`;
          if (Q === 2 && t >= qa1) { s += `<text y="${CH / 2 - 92}" font-size="34" font-weight="700" fill="#8A6D1E">İpucu: 3 kedi = çoğul</text><g transform="translate(0 ${CH / 2 - 42})"><rect x="-330" y="-34" width="660" height="60" rx="30" fill="#E53935"/><text y="9" font-size="34" font-weight="800" fill="#fff">Cevabını yorumlara yaz!</text></g>`; }
          s += `</g>`;
        } }
      return s;
    },
  };
})();
