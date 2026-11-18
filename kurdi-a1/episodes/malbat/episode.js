// "Ev kî ye?" — Malbat (aile)
// Sesler: Kürtçe metin sese ARAP HARFLİ Kürtçe yazımla verilir; her konuşmacı tek uzun kayıt, sonra sessizliklerden bölünür.
//   Berfîn: رۆنی، ئەڤ مالباتا منە! [long pause] نا! ئەڤ دیا منە! [long pause] نا! ئەڤ باپیرێ منە! [long pause] نا! ئەڤ برایێ منە! ئەو یەک سالییە! [long pause] رۆنی… ئەو نەینکە. ئەو تویی! [long pause] ئای خوەدێ…
//   Ronî  : ئەڤ کییە؟ خوشکا تەیە؟ [long pause] ئوو ئەڤ؟ برایێ تەیە؟ [long pause] ئوو ئەڤ؟ باڤێ تەیە؟ [long pause] ئوو ئەڤ کییە؟ پر بەدەوە! [long pause] ئەزم؟! ئەز پر بەدەوم!
(function () {
  const INKC = '#1f1b16';
  // duvardaki çerçeveler: [x, sorulduğu an, cevaplandığı an, etiket]
  const FR = [
    { x: 455, ask: ['l02', 0], ans: ['l03', .45], ku: 'dê', tr: 'anne' },
    { x: 625, ask: ['l04', 0], ans: ['l05', .45], ku: 'bapîr', tr: 'dede' },
    { x: 795, ask: ['l06', 0], ans: ['l07', .3], ku: 'bira', tr: 'erkek kardeş' },
    { x: 975, ask: ['l08', 0], ans: ['l09', .35], ku: 'neynik', tr: 'ayna', mirror: true },
  ];
  const FY = 434, FW = 142, FH = 176;

  function portrait(i, t, H) {
    const S = H.S;
    if (i === 0) // dê: topuzlu saç, küpe
      return `<circle cy="-52" r="20" fill="${INKC}"/><circle r="40" fill="#fff" ${S} stroke-width="6"/><path d="M-40 -4A40 40 0 0 1 40 -4Q20 -26 0 -20Q-20 -26 -40 -4Z" fill="${INKC}"/>`
        + `<path d="M-20 4q6 -8 12 0M8 4q6 -8 12 0" fill="none" ${S} stroke-width="5"/><path d="M-12 18q12 12 24 0" fill="none" stroke="#E0407B" stroke-width="6" stroke-linecap="round"/>`
        + `<circle cx="-42" cy="16" r="6" fill="#FFD23F" ${S} stroke-width="3"/><circle cx="42" cy="16" r="6" fill="#FFD23F" ${S} stroke-width="3"/><path d="M-34 62q34 -30 68 0v10h-68z" fill="#3FB8AF" ${S} stroke-width="6"/>`;
    if (i === 1) // bapîr: kel, gözlük, beyaz bıyık + sakal
      return `<circle r="40" fill="#fff" ${S} stroke-width="6"/><path d="M-40 -6q-10 -4 -8 10M40 -6q10 -4 8 10" fill="none" stroke="#bbb" stroke-width="8" stroke-linecap="round"/>`
        + `<circle cx="-15" cy="-2" r="11" fill="#EAF6FF" ${S} stroke-width="4"/><circle cx="15" cy="-2" r="11" fill="#EAF6FF" ${S} stroke-width="4"/><path d="M-4 -2h8" ${S} stroke-width="4"/><circle cx="-15" cy="-2" r="3" fill="${INKC}"/><circle cx="15" cy="-2" r="3" fill="${INKC}"/>`
        + `<path d="M-26 22q26 -16 52 0q-4 34 -26 36q-22 -2 -26 -36z" fill="#E6E6E6" ${S} stroke-width="5"/><path d="M-24 18q12 -12 24 -2q12 -10 24 2q-12 8 -24 2q-12 6 -24 -2z" fill="#fff" ${S} stroke-width="4"/>`
        + `<path d="M-34 66q34 -22 68 0v6h-68z" fill="#8D6E63" ${S} stroke-width="6"/>`;
    if (i === 2) // bira: bebek, emzik, tek tutam saç
      return `<path d="M0 -44q-4 -18 12 -18q-10 6 -4 18" fill="none" ${S} stroke-width="6"/><circle cy="4" r="44" fill="#fff" ${S} stroke-width="6"/>`
        + `<circle cx="-16" cy="-4" r="6" fill="${INKC}"/><circle cx="16" cy="-4" r="6" fill="${INKC}"/><circle cx="-28" cy="14" r="8" fill="#FF8FB0" opacity=".6"/><circle cx="28" cy="14" r="8" fill="#FF8FB0" opacity=".6"/>`
        + `<circle cy="22" r="13" fill="#6EC6FF" ${S} stroke-width="5"/><circle cy="22" r="5" fill="#FFD23F" ${S} stroke-width="3"/>`
        + `<path d="M-26 66q26 -22 52 0v6h-52z" fill="#fff" ${S} stroke-width="6"/>`;
    // neynik: Ronî'nin yansıması
    const happy = t > H.T('l08', .5), wink = t > H.T('l10', .35);
    let s = `<path d="M-26 62q26 -24 52 0v10h-52z" fill="#FFD23F" ${S} stroke-width="6"/><circle r="38" fill="#fff" ${S} stroke-width="6"/>`;
    s += `<path d="M-16 -8L-64 -6" stroke="#1E5FBF" stroke-width="12" stroke-linecap="round"/><path d="M-39 -8A39 39 0 0 1 39 -8Z" fill="${H.BLUE}" ${S} stroke-width="5"/><circle cy="-48" r="5" fill="#1E5FBF" ${S} stroke-width="3"/>`;
    s += happy ? `<path d="M-22 6q6 -9 12 0" fill="none" ${S} stroke-width="5"/>` + (wink ? `<path d="M4 4h14" ${S} stroke-width="5"/>` : `<path d="M4 6q6 -9 12 0" fill="none" ${S} stroke-width="5"/>`)
      : `<ellipse cx="-16" cy="4" rx="5" ry="7" fill="${INKC}"/><ellipse cx="10" cy="4" rx="5" ry="7" fill="${INKC}"/>`;
    s += `<path d="M-14 18Q-3 ${happy ? 30 : 24} 8 18" fill="none" ${S} stroke-width="5"/>`;
    return s;
  }

  window.EP = {
    title: 'EV KÎ YE?',
    tag: 'Kurdî A1 · Malbat',
    noClock: true,
    vocabScale: .82,
    seq: [
      { id: 'l01', who: 'B', ku: 'Ronî, ev *malbata* min e!', tr: 'Ronî, bu benim ailem!', tts: 'رۆنی، ئەڤ مالباتا منە!',
        s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } },
      { id: 'l02', who: 'R', ku: 'Ev *kî* ye? *Xwişka* te ye?', tr: 'Bu kim? Kız kardeşin mi?', tts: 'ئەڤ کییە؟ خوشکا تەیە؟',
        s: { pose: 'point', expr: 'normal' }, l: { pose: 'idle', expr: 'happy' } },
      { id: 'l03', who: 'B', ku: 'Na! Ev *diya* min e!', tr: 'Hayır! Bu benim annem!', tts: 'نا! ئەڤ دیا منە!',
        s: { pose: 'hips', expr: 'happy' }, l: { pose: 'think', expr: 'wide' } },
      { id: 'l04', who: 'R', ku: 'Û ev? *Birayê* te ye?', tr: 'Ya bu? Erkek kardeşin mi?', tts: 'ئوو ئەڤ؟ برایێ تەیە؟',
        s: { pose: 'point', expr: 'happy' }, l: { pose: 'hips', expr: 'normal' } },
      { id: 'l05', who: 'B', ku: 'Na! Ev *bapîrê* min e!', tr: 'Hayır! Bu benim dedem!', tts: 'نا! ئەڤ باپیرێ منە!',
        s: { pose: 'up', expr: 'angry', red: .3 }, l: { pose: 'think', expr: 'wide', sweat: true } },
      { id: 'l06', who: 'R', ku: 'Û ev? *Bavê* te ye?', tr: 'Ya bu? Baban mı?', tts: 'ئوو ئەڤ؟ باڤێ تەیە؟',
        s: { pose: 'point', expr: 'normal', sweat: true }, l: { pose: 'hips', expr: 'angry', red: .3 } },
      { id: 'l07', who: 'B', ku: 'Na! Ev *birayê* min e! Ew *yek salî* ye!', tr: 'Hayır! Bu erkek kardeşim! O bir yaşında!', tts: 'نا! ئەڤ برایێ منە! ئەو یەک سالییە!',
        s: { pose: 'up', expr: 'angry', red: .7, shake: 1 }, l: { pose: 'face', expr: 'wide', sweat: true } },
      { id: 'w1', wait: .5 },
      { id: 'l08', who: 'R', ku: 'Û ev kî ye? Pir *bedew* e!', tr: 'Ya bu kim? Çok yakışıklı!', tts: 'ئوو ئەڤ کییە؟ پر بەدەوە!',
        s: { pose: 'point', expr: 'normal', look: 1 }, then: [{ f: .5, s: { pose: 'cheer', expr: 'happy', look: 1 } }], l: { pose: 'idle', expr: 'normal', red: 0 } },
      { id: 'l09', who: 'B', gap: .5, ku: 'Ronî… ew *neynik* e. Ew *tu* yî!', tr: 'Ronî… o ayna. O sensin!', tts: 'رۆنی… ئەو نەینکە. ئەو تویی!',
        s: { pose: 'face', expr: 'sleep' }, then: [{ f: .55, s: { pose: 'point', expr: 'normal' } }], l: { pose: 'idle', expr: 'happy', look: 1 } },
      { id: 'l10', who: 'R', ku: '*Ez* im?! Ez pir *bedew* im!', tr: 'Ben miyim?! Çok yakışıklıyım!', tts: 'ئەزم؟! ئەز پر بەدەوم!',
        s: { pose: 'up', expr: 'wide', look: 1 }, then: [{ f: .35, s: { pose: 'hips', expr: 'smug', hop: 30, look: 1 } }], l: { pose: 'idle', expr: 'sleep' } },
      { id: 'l11', who: 'B', ku: 'Ay *Xwedê*…', tr: 'Aman Allah\'ım…', tts: 'ئای خوەدێ…',
        s: { pose: 'face', expr: 'sleep' }, l: { pose: 'hips', expr: 'smug', look: 1 } },
    ],
    tail: 1.4,
    bubbles: [
      { line: 'l02', f: .45, who: 'R', icon: 'q', label: 'xwişk?' },
      { line: 'l04', f: .45, who: 'R', icon: 'q', label: 'bira?' },
      { line: 'l06', f: .45, who: 'R', icon: 'q', label: 'bav?' },
      { line: 'l07', f: .55, who: 'B', icon: 'txt:1', label: 'yek salî' },
      { line: 'l08', f: .5, who: 'R', icon: 'heart', label: 'pir bedew!' },
      { line: 'l10', f: .35, who: 'R', icon: 'heart', label: 'ez!' },
    ],
    vocab: [
      ['malbat', 'aile'],
      ['dê', 'anne'],
      ['bav', 'baba'],
      ['bira', 'erkek kardeş'],
      ['xwişk', 'kız kardeş'],
      ['bapîr', 'dede'],
      ['neynik', 'ayna'],
      ['bedew', 'güzel · yakışıklı'],
      ['ev kî ye?', 'bu kim?'],
    ],
    sfx(H) {
      const out = [];
      for (const id of ['l03', 'l05', 'l07']) out.push({ type: 'cross', at: H.T(id, .05) });
      FR.forEach(f => out.push({ type: 'ding', at: H.T(...f.ans) }));
      out.push({ type: 'boing', at: H.T('l10', .35) });
      out.push({ type: 'bonk', at: H.T('l11', .1) });
      return out;
    },
    back(t, P, H) {
      const { S, T, seg, back } = H;
      let s = '';
      FR.forEach((f, i) => {
        const a = T(...f.ask), b = T(...f.ans), next = FR[i + 1] ? T(...FR[i + 1].ask) : Infinity;
        const hot = t >= a && t < next, wob = hot && t < b ? Math.sin((t - a) * 9) * 2.5 : 0;
        const h = f.mirror ? FH + 26 : FH;
        s += `<path d="M${f.x - 22} ${FY - h / 2}L${f.x} ${FY - h / 2 - 34}L${f.x + 22} ${FY - h / 2}" fill="none" ${S} stroke-width="5"/><circle cx="${f.x}" cy="${FY - h / 2 - 36}" r="6" fill="${INKC}"/>`;
        s += `<g transform="translate(${f.x} ${FY}) rotate(${wob})">`;
        if (hot) s += `<rect x="${-FW / 2 - 14}" y="${-h / 2 - 14}" width="${FW + 28}" height="${h + 28}" rx="${f.mirror ? 80 : 20}" fill="#FFD23F" opacity="${.45 + .25 * Math.sin(t * 8)}"/>`;
        s += `<rect x="${-FW / 2}" y="${-h / 2}" width="${FW}" height="${h}" rx="${f.mirror ? 70 : 10}" fill="${f.mirror ? '#B0BEC5' : '#C98B4E'}" ${S} stroke-width="7"/>`;
        s += `<rect x="${-FW / 2 + 14}" y="${-h / 2 + 14}" width="${FW - 28}" height="${h - 28}" rx="${f.mirror ? 58 : 4}" fill="${f.mirror ? '#D8F1FF' : ['#FFE3EC', '#E6F4E1', '#FFF3C4'][i]}" ${S} stroke-width="4"/>`;
        s += `<clipPath id="fc${i}"><rect x="${-FW / 2 + 16}" y="${-h / 2 + 16}" width="${FW - 32}" height="${h - 32}" rx="${f.mirror ? 56 : 3}"/></clipPath>`;
        s += `<g clip-path="url(#fc${i})"><g transform="translate(0 ${f.mirror ? 4 : 2}) scale(${f.mirror ? 1.05 : 1})">${portrait(i, t, H)}</g>`;
        if (f.mirror) s += `<path d="M-40 -90L-10 -90L-50 30L-80 30Z" fill="#fff" opacity=".45"/>`;
        s += `</g></g>`;
        if (t >= b) { // etiket
          const p = back(seg(t, b, b + .3)), w = Math.max(104, f.ku.length * 25 + 30);
          s += `<g transform="translate(${f.x} ${FY + h / 2 + 2}) scale(${p})"><rect x="${-w / 2}" y="-27" width="${w}" height="54" rx="27" fill="#1f1b16"/><text y="12" text-anchor="middle" font-size="36" font-weight="800" fill="#FFD23F">${f.ku}</text></g>`;
        }
      });
      // aynanın parıltıları
      const a = T('l08', .5);
      if (t > a) for (let k = 0; k < 4; k++) { const m = FR[3], ph = t * 2.4 + k * 1.6, x = m.x + Math.cos(ph) * 96, y = FY + Math.sin(ph * 1.2) * 110, r = 8 + 5 * Math.sin(t * 6 + k); s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${S} stroke-width="3" opacity="${Math.min(1, (t - a) * 3)}"/>`; }
      return s;
    },
  };
})();
