// "Kengî?!" — Rojên hefteyê (haftanın günleri)
(function () {
  const DAYS = ['duşem', 'sêşem', 'çarşem', 'pêncşem', 'în', 'şemî', 'yekşem'];
  // [gün açılır, gün elenir] — replik içi oranlarla
  const ON = [['l02', 0], ['l03', .1], ['l05', 0], ['l05', .5], ['l07', 0], ['l07', .5], ['l09', .5]];
  const OFF = [['l02', .5], ['l04', .35], ['l06', .2], ['l06', .65], ['l08', .3], ['l08', .5], null];

  window.EP = {
    title: 'KENGÎ?!',
    tag: 'Kurdî A1 · Rojên hefteyê',
    noClock: true,
    mode: () => 'morning',
    table: () => ({ teapot: true, glass: 'empty' }),
    seq: [
      { id: 'l01', who: 'B', ku: 'Ronî! Mal pir *qirêj* e! Em *kengî* paqij bikin?', tr: 'Ronî! Ev çok kirli! Ne zaman temizleyelim?', tts: '[angry] Ronî! Mal pir qirêj e! [curious] Em kengî paqij bikin?',
        s: { pose: 'show', expr: 'angry', red: .3 }, l: { pose: 'idle', expr: 'wide' } },
      { id: 'l02', who: 'R', ku: '*Duşem?* Na… Duşemê ez westiyayî me.', tr: 'Pazartesi mi? Yok… Pazartesi yorgunum.', tts: '[curious] Duşem? [tired] Na… Duşemê ez westiyayî me.',
        s: { pose: 'think', expr: 'normal', tilt: -8 }, then: [{ f: .45, s: { pose: 'idle', expr: 'sleep', tilt: 12 } }], l: { pose: 'hips', expr: 'normal' } },
      { id: 'l03', who: 'B', ku: '*Sêşem?*', tr: 'Salı?', tts: '[curious] Sêşem?', s: { pose: 'point', expr: 'normal' } },
      { id: 'l04', who: 'R', ku: 'Sêşemê ez *nexweş* im.', tr: 'Salı hastayım.', tts: '[sad] Sêşemê… ez nexweş im.',
        s: { pose: 'face', expr: 'sad', tilt: 10 } },
      { id: 'l05', who: 'B', ku: '*Çarşem? Pêncşem?*', tr: 'Çarşamba? Perşembe?', tts: '[frustrated] Çarşem? Pêncşem?',
        s: { pose: 'point', expr: 'angry', red: .35 } },
      { id: 'l06', who: 'R', ku: 'Çarşemê *futbol* heye! Pêncşemê… ez di *xew* de me.', tr: 'Çarşamba maç var! Perşembe… uykudayım.', tts: '[excited] Çarşemê futbol heye! [tired] Pêncşemê… ez di xew de me.',
        s: { pose: 'cheer', expr: 'happy', hop: 34 }, then: [{ f: .55, s: { pose: 'idle', expr: 'sleep', tilt: 14 } }] },
      { id: 'l07', who: 'B', ku: '*În? Şemî?!*', tr: 'Cuma? Cumartesi?!', tts: '[angry] În? Şemî?!',
        s: { pose: 'up', expr: 'angry', red: .75, shake: 1 } },
      { id: 'l08', who: 'R', ku: 'În û şemî *betlane* ne!', tr: 'Cuma ve cumartesi tatil!', tts: '[happy] În û şemî betlane ne!',
        s: { pose: 'shrug', expr: 'smug' }, l: { pose: 'hips', expr: 'angry', red: .6 } },
      { id: 'l09', who: 'B', gap: .6, ku: 'Baş e. *Yekşem!*', tr: 'Tamam. Pazar!', tts: '[sighs] Baş e. [confident] Yekşem!',
        s: { pose: 'hips', expr: 'sleep' }, then: [{ f: .5, s: { pose: 'point', expr: 'angry', red: .3 } }] },
      { id: 'l10', who: 'R', ku: 'Erê! Yekşem *pir baş* e!', tr: 'Evet! Pazar çok iyi!', tts: '[excited] Erê! Yekşem pir baş e!',
        s: { pose: 'cheer', expr: 'happy', hop: 44 }, l: { pose: 'hips', expr: 'smug' } },
      { id: 'l11', who: 'B', gap: .7, ku: 'Ronî… *îro* yekşem e.', tr: 'Ronî… bugün pazar.', tts: '[mischievously] Ronî… îro yekşem e.',
        s: { pose: 'hips', expr: 'smug' }, then: [{ f: .5, l: { pose: 'idle', expr: 'wide', sweat: true, rot: 5 } }] },
      { id: 'l12', who: 'R', gap: .7, ku: 'Eee… Yekşema *din*!', tr: 'Eee… Gelecek pazar!', tts: '[nervous] Eee… [happy] Yekşema din!',
        s: { pose: 'think', expr: 'sad', sweat: true }, then: [{ f: .5, s: { pose: 'shrug', expr: 'smug', sweat: false }, l: { pose: 'hips', expr: 'angry', red: .8 } }] },
      { id: 'l13', who: 'B', ku: 'RONÎ!!!', tr: 'RONÎ!!!', tts: '[angry] [shouting] RONÎ!',
        s: { pose: 'up', expr: 'angry', red: 1, shake: 1 }, l: { pose: 'idle', expr: 'wide' } },
      { id: 'w1', wait: 3.0 },
    ],
    tail: .2,
    bubbles: [
      { line: 'l02', f: .5, who: 'R', icon: 'battery', label: 'westiyayî' },
      { line: 'l04', f: .35, who: 'R', icon: 'thermo', label: 'nexweş' },
      { line: 'l06', f: .1, tf: .5, hold: 0, who: 'R', icon: 'ball', label: 'futbol' },
      { line: 'l06', f: .65, who: 'R', icon: 'zzz', label: 'xew' },
      { line: 'l08', f: .3, who: 'R', icon: 'beach', label: 'betlane' },
    ],
    vocab: [
      ['duşem', 'pazartesi'], ['sêşem', 'salı'], ['çarşem', 'çarşamba'], ['pêncşem', 'perşembe'], ['în', 'cuma'], ['şemî', 'cumartesi'], ['yekşem', 'pazar'],
    ],
    sfx(H) {
      const out = [];
      ON.forEach(([id, f]) => out.push({ type: 'pop', at: H.T(id, f) }));
      OFF.forEach(o => o && out.push({ type: 'cross', at: H.T(o[0], o[1]) }));
      out.push({ type: 'ding', at: H.T('l10', .2) }, { type: 'rise', at: H.T('l11', .55) });
      out.push({ type: 'whoosh', at: H.T('l13', .6) }, { type: 'thud', at: H.T('l13', 1) + .1 });
      for (let i = 0; i < 6; i++) out.push({ type: 'sweep', at: H.T('w1', .25) + i * .42 });
      return out;
    },
    tweak(t, P, H) {
      const c = H.T('l13', 1) + .1;
      if (t > c) {
        const sw = Math.sin((t - c) * 7.5);
        P.R.expr = 'sad'; P.R.tear = true; P.R.sweat = false; P.R.rot = 4; P.R.tilt = 8;
        P.R.la = [48 + sw * 8, 66 + sw * 10]; P.R.ra = [-22 + sw * 8, -58 + sw * 8];
        const u = H.seg(t, c + .3, c + .7);
        if (u > 0) { P.B.expr = 'smug'; P.B.red = 0; P.B.la = [48, -44]; P.B.ra = [48, -44]; P.B.dx = 0; }
      }
    },
    // duvardaki takvim + dağınıklık
    back(t, P, H) {
      const { S, INK, T, seg, back, FLOOR } = H;
      let s = `<rect x="372" y="336" width="664" height="200" rx="22" fill="#fff" ${S} stroke-width="8"/><path d="M372 372h664" stroke="#E53935" stroke-width="26"/><rect x="372" y="336" width="664" height="200" rx="22" fill="none" ${S} stroke-width="8"/>`;
      s += `<circle cx="470" cy="340" r="10" fill="${INK}"/><circle cx="938" cy="340" r="10" fill="${INK}"/>`;
      DAYS.forEach((d, i) => {
        const row = i < 4 ? 0 : 1, col = i < 4 ? i : i - 4;
        const x = (row ? 472 : 393) + col * 158 + 75, y = 392 + row * 70 + 30;
        const on = T(ON[i][0], ON[i][1]), off = OFF[i] ? T(OFF[i][0], OFF[i][1]) : Infinity;
        const ok = i === 6 && t >= T('l10', .2), today = i === 6 && t >= T('l11', .55);
        const act = t >= on && t < off, dead = t >= off;
        const sc = act ? 1 + .1 * back(seg(t, on, on + .25)) + (ok ? 0 : Math.sin(t * 8) * .015) : 1;
        const fill = ok ? '#7BD88F' : act ? '#FFD23F' : dead ? '#E3DED3' : '#F6ECD6';
        s += `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-71" y="-28" width="142" height="56" rx="14" fill="${fill}" ${S} stroke-width="6"/><text y="12" text-anchor="middle" font-size="${d.length > 6 ? 31 : 35}" font-weight="800" fill="${dead ? '#9b9488' : INK}">${d}</text>`;
        if (dead) { const p = seg(t, off, off + .18); s += `<path d="M-58 -20L${-58 + 116 * p} ${-20 + 40 * p}" stroke="#E53935" stroke-width="9" stroke-linecap="round"/>` + (p >= 1 ? `<path d="M58 -20L-58 20" stroke="#E53935" stroke-width="9" stroke-linecap="round"/>` : ''); }
        if (today) { const p = back(seg(t, T('l11', .55), T('l11', .55) + .3)); s += `<g transform="translate(66 -34) rotate(12) scale(${p})"><rect x="-46" y="-22" width="92" height="44" rx="12" fill="#E53935" ${S} stroke-width="5"/><text y="11" text-anchor="middle" font-size="30" font-weight="800" fill="#fff">ÎRO!</text></g>`; }
        s += `</g>`;
      });
      // süpürge (duvara yaslı)
      if (t < T('l13', .6)) s += broom(1052, FLOOR - 16, 1030, FLOOR - 380, H);
      return s;
    },
    mid(t, P, H) {
      const { S, T, seg, FLOOR } = H;
      const clean = seg(t, T('w1', .3), T('w1', .95)), o = 1 - clean, dx = -clean * 120;
      let s = `<g opacity="${o}" transform="translate(${dx} 0)">`;
      s += `<path d="M600 ${FLOOR - 14}q4 -34 26 -34q10 0 8 12q-2 12 14 14q22 2 22 14q0 8 -12 8h-50q-8 0 -8 -14z" fill="#8ED1FC" ${S} stroke-width="6"/><path d="M604 ${FLOOR - 36}h24" stroke="#fff" stroke-width="5"/>`;
      s += `<circle cx="700" cy="${FLOOR - 24}" r="18" fill="#fff" ${S} stroke-width="6"/><path d="M690 ${FLOOR - 30}l10 8l8 -10" fill="none" ${S} stroke-width="4"/>`;
      s += `<circle cx="640" cy="${FLOOR + 34}" r="15" fill="#fff" ${S} stroke-width="6"/>`;
      s += `<path d="M560 ${FLOOR + 40}q20 -36 44 0q-10 -8 -20 0q-10 -8 -24 0z" fill="#FFD23F" ${S} stroke-width="5"/>`;
      for (let i = 0; i < 3; i++) { const p = (t * .6 + i / 3) % 1; s += `<path d="M${612 + i * 34} ${FLOOR - 60 - p * 50}q10 -10 0 -20q-10 -10 0 -20" fill="none" stroke="#9BC53D" stroke-width="5" stroke-linecap="round" opacity="${1 - p}"/>`; }
      for (let i = 0; i < 2; i++) { const a = t * (3 + i) + i * 2, x = 660 + Math.cos(a) * 60, y = FLOOR - 130 + Math.sin(a * 1.7) * 30; s += `<circle cx="${x}" cy="${y}" r="5" fill="#333"/><path d="M${x - 8} ${y - 6}l8 4l8 -4" fill="none" stroke="#888" stroke-width="3"/>`; }
      return s + `</g>`;
    },
    front(t, P, H) {
      const { T, seg, eout, FLOOR, RX } = H, a = T('l13', .6), c = T('l13', 1) + .1;
      let s = '';
      if (t >= a && t < c) { const u = eout(seg(t, a, c)); const x = 1040 + (RX - 110 - 1040) * u, y = FLOOR - 200 - Math.sin(u * Math.PI) * 120; s += `<g transform="rotate(${u * 340} ${x} ${y})">${broom(x + 10, y + 180, x - 10, y - 180, H)}</g>`; }
      else if (t >= c) {
        const sw = Math.sin((t - c) * 7.5) * 34;
        s += broom(RX - 230 + sw, FLOOR - 8, RX - 40, FLOOR - 300, H);
        for (let i = 0; i < 3; i++) { const p = ((t - c) * 1.4 + i / 3) % 1; s += `<circle cx="${RX - 260 + sw - p * 60 - i * 10}" cy="${FLOOR - 20 - p * 46}" r="${10 + p * 16}" fill="#d8cbb0" opacity="${(1 - p) * .7}"/>`; }
      }
      return s;
    },
  };
  // süpürge: (x1,y1) fırça ucu, (x2,y2) sap ucu
  function broom(x1, y1, x2, y2, H) {
    const ang = Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI - 90;
    return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#A56F38" stroke-width="12" stroke-linecap="round"/><g transform="translate(${x1} ${y1}) rotate(${ang})"><path d="M-34 -34h68l12 50h-92z" fill="#FFD23F" ${H.S} stroke-width="6"/><path d="M-18 -30v40M0 -30v44M18 -30v40" stroke="#C99E66" stroke-width="4"/><rect x="-36" y="-42" width="72" height="14" rx="5" fill="#E53935" ${H.S} stroke-width="5"/></g>`;
  }
})();
