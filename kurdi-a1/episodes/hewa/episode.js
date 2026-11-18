// "Hewa çawa ye?" — Hewa (hava durumu)
// Sesler: Kürtçe metin sese ARAP HARFLİ Kürtçe yazımla verilir; her konuşmacı tek uzun kayıt, sonra sessizliklerden bölünür.
//   Ronî  : بەرفین، ئیرۆ هەوا چاوایە؟ [long pause] رۆژ هەیە! هەوا پر خوەشە! ئەم هەرن پیکنیکێ! [long pause] باران دبارە! پر سارە! [long pause] لێ ل پەنجەرەیێ… رۆژ هەیە؟! [long pause] وێنە؟! ئوو پەنجەرە ل کو یە؟ [long pause] سپاس… لێ ئێدی دەرەنگە!
//   Berfîn: ل پەنجەرەیێ بنێرە! [long pause] رۆنی… ئەو نە پەنجەرەیە. ئەو وێنەیە! [long pause] پەنجەرە تونە. لێ سیوان هەیە!
(function () {
  const DX = 912, DY = 608, DW = 168; // kapı boşluğu
  const UMB = `<path d="M-46 0a46 40 0 0 1 92 0q-12 -10 -23 0q-11 -10 -23 0q-11 -10 -23 0q-11 -10 -23 0z" fill="#E53935" stroke="#1f1b16" stroke-width="5" stroke-linejoin="round"/><path d="M0 0v40q0 12 -12 10" fill="none" stroke="#1f1b16" stroke-width="6" stroke-linecap="round"/>`;
  const open = (t, H) => { const a = H.T('w1', .45), c = H.T('w2', .3); return t < a ? 0 : t < c ? H.eout(H.seg(t, a, a + .18)) : 1 - H.seg(t, c, c + .15); };

  window.EP = {
    title: 'HEWA ÇAWA YE?',
    tag: 'Kurdî A1 · Hewa',
    noClock: true,
    vocabScale: .82,
    seq: [
      { id: 'l01', who: 'R', ku: 'Berfîn, îro *hewa* çawa ye?', tr: 'Berfîn, bugün hava nasıl?', tts: 'بەرفین، ئیرۆ هەوا چاوایە؟',
        s: { pose: 'think', expr: 'normal' }, l: { pose: 'idle', expr: 'happy' } },
      { id: 'l02', who: 'B', ku: 'Li *pencereyê* binêre!', tr: 'Pencereye bak!', tts: 'ل پەنجەرەیێ بنێرە!',
        s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'normal' } },
      { id: 'l03', who: 'R', ku: '*Roj* heye! Hewa pir *xweş* e! Em herin pîknîkê!', tr: 'Güneş var! Hava çok güzel! Pikniğe gidelim!', tts: 'رۆژ هەیە! هەوا پر خوەشە! ئەم هەرن پیکنیکێ!',
        s: { pose: 'point', expr: 'happy' }, then: [{ f: .6, s: { pose: 'cheer', expr: 'happy', hop: 34 } }], l: { pose: 'idle', expr: 'smug' } },
      { id: 'w1', wait: 1.7 },
      { id: 'l04', who: 'R', ku: '*Baran* dibare! Pir *sar* e!', tr: 'Yağmur yağıyor! Çok soğuk!', tts: 'باران دبارە! پر سارە!',
        s: { pose: 'up', expr: 'wide', look: 1, shake: 1 }, l: { pose: 'face', expr: 'happy' } },
      { id: 'w2', wait: 1 },
      { id: 'l05', who: 'R', ku: 'Lê li pencereyê… *roj* heye?!', tr: 'Ama pencerede… güneş var?!', tts: 'لێ ل پەنجەرەیێ… رۆژ هەیە؟!',
        s: { pose: 'point', expr: 'wide' }, l: { pose: 'idle', expr: 'smug' } },
      { id: 'l06', who: 'B', gap: .45, ku: 'Ronî… ew ne pencere ye. Ew *wêne* ye!', tr: 'Ronî… o pencere değil. O resim!', tts: 'رۆنی… ئەو نە پەنجەرەیە. ئەو وێنەیە!',
        s: { pose: 'hips', expr: 'smug' }, then: [{ f: .55, s: { pose: 'show', expr: 'happy' } }], l: { pose: 'idle', expr: 'wide' } },
      { id: 'l07', who: 'R', ku: '*Wêne*?! Û pencere *li ku* ye?', tr: 'Resim mi?! Peki pencere nerede?', tts: 'وێنە؟! ئوو پەنجەرە ل کو یە؟',
        s: { pose: 'up', expr: 'wide' }, then: [{ f: .45, s: { pose: 'shrug', expr: 'sad' } }], l: { pose: 'idle', expr: 'happy' } },
      { id: 'l08', who: 'B', ku: 'Pencere *tune*. Lê *sîwan* heye!', tr: 'Pencere yok. Ama şemsiye var!', tts: 'پەنجەرە تونە. لێ سیوان هەیە!',
        s: { pose: 'shrug', expr: 'happy' }, then: [{ f: .5, s: { pose: 'point', expr: 'happy' } }], l: { pose: 'idle', expr: 'sad' } },
      { id: 'l09', who: 'R', gap: .5, ku: 'Spas… lê êdî *dereng* e!', tr: 'Sağ ol… ama artık çok geç!', tts: 'سپاس… لێ ئێدی دەرەنگە!',
        s: { pose: 'down', expr: 'sad' }, l: { pose: 'hips', expr: 'happy' } },
    ],
    tail: 1.4,
    bubbles: [
      { line: 'l01', f: .4, who: 'R', icon: 'q', label: 'hewa?' },
      { line: 'l03', f: .05, tf: .55, hold: 0, who: 'R', icon: 'sun', label: 'roj' },
      { line: 'l03', f: .6, who: 'R', icon: 'beach', label: 'pîknîk!' },
      { line: 'l04', f: .05, tf: .5, hold: 0, who: 'R', icon: 'rain', label: 'baran' },
      { line: 'l04', f: .55, who: 'R', icon: 'thermo', label: 'sar' },
      { line: 'l08', f: .5, who: 'B', icon: 'umb', label: 'sîwan' },
    ],
    icons: {
      rain: H => `<path d="M-40 -6a20 20 0 0 1 30 -22a28 28 0 0 1 52 8a18 18 0 0 1 -4 36h-66a18 18 0 0 1 -12 -22z" fill="#90A4AE" ${H.S} stroke-width="5"/><path d="M-26 26l-8 18M-4 26l-8 18M18 26l-8 18" stroke="#2F7DE1" stroke-width="6" stroke-linecap="round"/>`,
      umb: () => `<g transform="translate(0 -6) scale(1.05)">${UMB}</g>`,
    },
    vocab: [
      ['hewa', 'hava'],
      ['roj', 'güneş · gün'],
      ['baran', 'yağmur'],
      ['sar', 'soğuk'],
      ['xweş', 'güzel · hoş'],
      ['pencere', 'pencere'],
      ['wêne', 'resim'],
      ['sîwan', 'şemsiye'],
      ['hewa çawa ye?', 'hava nasıl?'],
    ],
    sfx(H) {
      const a = H.T('w1', .45), out = [{ type: 'whoosh', at: a }, { type: 'thud', at: a + .3 }, { type: 'splash', at: a + .45 }, { type: 'splash', at: H.T('l04', .5) },
        { type: 'bonk', at: H.T('w2', .42) }, { type: 'ding', at: H.T('l06', .6) }, { type: 'boing', at: H.T('l08', .75) }];
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, a0 = T('w1', 0), a1 = T('w1', .4), c0 = T('w2', .45), c1 = T('w2', 1);
      if (t > a0 && t < c1) {
        const u = t < a1 ? H.eio(H.seg(t, a0, a1)) : 1 - H.eio(H.seg(t, c0, c1));
        P.R.x = H.lerp(H.RX, 852, u); P.R.look = t < c0 ? 1 : -1;
        if (t < a1 || t > c0) { P.R.walk = t * 3; P.R.expr = t < a1 ? 'happy' : 'wide'; }
        if (t >= a1 && t < T('l04', 0)) { P.R.expr = 'wide'; P.R.dx = Math.sin(t * 50) * 4; }
        if (t >= T('l04', 1)) P.R.expr = 'dizzy';
      }
      if (t > T('w1', .45) && t < T('l04', 0)) { P.B.expr = 'wide'; P.B.look = 1; }
      if (t > T('l09', 1)) P.R.expr = 'sad';
    },
    back(t, P, H) {
      const { S, T, seg, back } = H;
      let s = '';
      // açık kapı: fırtına
      const o = open(t, H);
      if (o > 0) {
        const h = H.FLOOR - 26 - DY, w = DW * o;
        s += `<clipPath id="dc"><rect x="${DX}" y="${DY}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#dc)">`;
        const fl = ((t - T('w1', .45)) % 1.3) < .09;
        s += `<rect x="${DX}" y="${DY}" width="${DW}" height="${h}" fill="${fl ? '#EEF3FF' : '#4A5878'}"/>`;
        s += `<path d="M${DX - 10} ${DY + 70}a40 40 0 0 1 56 -44a52 52 0 0 1 96 16a34 34 0 0 1 6 66h-150z" fill="#2F3A52"/>`;
        s += `<path d="M${DX + 96} ${DY + 110}l-26 60h22l-20 62l56 -84h-24l22 -38z" fill="#FFD23F" ${S} stroke-width="4" opacity="${fl ? 1 : .0}"/>`;
        for (let k = 0; k < 26; k++) { const p = ((t * 2.6 + k * .37) % 1), x = DX + ((k * 53) % (DW + 80)) - p * 70, y = DY + p * h; s += `<path d="M${x} ${y}l-14 34" stroke="#9FD8FF" stroke-width="5" stroke-linecap="round"/>`; }
        s += `</g><path d="M${DX + w} ${DY}v${h}" ${S} stroke-width="9"/>`;
      }
      // "pencere" aslında resim: bantlar + kıvrılan köşe + etiket
      const r = T('l06', .6);
      if (t >= r) {
        const p = back(seg(t, r, r + .35));
        for (const [x, y, a] of [[52, 512, -40], [378, 512, 40], [52, 868, 40]]) s += `<g transform="translate(${x} ${y}) rotate(${a}) scale(${p})"><rect x="-34" y="-13" width="68" height="26" fill="#FFE9A8" stroke="#D9B45A" stroke-width="3" opacity=".95"/></g>`;
        const c = 70 * p;
        s += `<path d="M${378 - c} 876L378 ${876 - c}L378 876Z" fill="#F6ECD6"/><path d="M${378 - c} 876L378 ${876 - c}L${378 - c * .85} ${876 - c * .85}Z" fill="#fff" ${S} stroke-width="5" stroke-linejoin="round"/>`;
        s += `<g transform="translate(215 462) scale(${p})"><rect x="-74" y="-29" width="148" height="58" rx="29" fill="#1f1b16"/><text y="13" text-anchor="middle" font-size="38" font-weight="800" fill="#FFD23F">wêne</text></g>`;
      }
      return s;
    },
    front(t, P, H) {
      const { S, T, seg, back } = H;
      let s = '';
      const a = T('w1', .45), o = open(t, H), rx = P.R.x + (P.R.dx || 0);
      // içeri savrulan yağmur
      if (o > 0) for (let k = 0; k < 16; k++) { const p = ((t * 2.2 + k * .29) % 1), x = 1000 - p * 260 - (k % 4) * 14, y = 640 + ((k * 97) % 380) + p * 120; s += `<path d="M${x} ${y}l-30 18" stroke="#6EC6FF" stroke-width="6" stroke-linecap="round" opacity="${(1 - p) * o}"/>`; }
      // ıslak Ronî: damlalar + su birikintisi
      if (t > a + .25) {
        const w = Math.min(1, (t - a - .25) / 1.2);
        s += `<ellipse cx="${rx}" cy="${H.FLOOR + 2}" rx="${96 * w}" ry="${15 * w}" fill="#6EC6FF" opacity=".7" ${S} stroke-width="4"/>`;
        for (let k = 0; k < 6; k++) { const p = ((t * 1.3 + k / 6) % 1), x = rx + [-58, 40, -20, 62, -44, 14][k], y0 = H.FLOOR - [400, 420, 300, 330, 250, 200][k]; s += `<path d="M${x} ${y0 + p * 150}q-7 12 0 18q7 -6 0 -18z" fill="#6EC6FF" ${S} stroke-width="3" opacity="${1 - p}"/>`; }
      }
      // şemsiye (çok geç…)
      const u = T('l08', .75);
      if (t >= u) { const p = back(seg(t, u, u + .3)); s += `<g transform="translate(${rx + 4} ${H.FLOOR - 560}) scale(${2.6 * p})">${UMB}</g>`; }
      return s;
    },
  };
})();
