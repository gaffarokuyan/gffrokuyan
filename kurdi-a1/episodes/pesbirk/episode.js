// "Pêşbirk!" — A1 tevlihev (karışık tekrar: renk, gün, sayı, saat)
// tts metni Türkçe seslere göre yazılır: Kürtçe i → ı, î → i, ê → e, û → u, x → h, q → k
(function () {
  // puan tablosu: [an, doğru mu]
  const SCORE = [['l04', .7, 1], ['l06', .95, 1], ['l08', 1, 1], ['l11', .3, 0]];

  window.EP = {
    title: 'PÊŞBIRK!',
    tag: 'Kurdî A1 · Tevlihev',
    clockH: 12,
    vocabScale: .8,
    seq: [
      { id: 'l01', who: 'B', ku: 'Ronî, îro *pêşbirk* heye! Tu amade yî?', tr: 'Ronî, bugün yarışma var! Hazır mısın?', tts: '[excited] Roni, iro peşbırk heye! [curious] Tu amade yi?',
        s: { pose: 'wave', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } },
      { id: 'l02', who: 'R', ku: 'Erê! Ez *amade* me!', tr: 'Evet! Hazırım!', tts: '[excited] Ere! Ez amade me!',
        s: { pose: 'cheer', expr: 'happy', hop: 34 } },
      { id: 'l03', who: 'B', ku: 'Pirsa yekem: *Ev çi reng e?*', tr: 'Birinci soru: Bu ne renk?', tts: '[happy] Pırsa yekem. [curious] Ev çı reng e?',
        s: { pose: 'point', expr: 'happy' }, l: { pose: 'think', expr: 'normal' } },
      { id: 'l04', who: 'R', ku: '*Sor* e!', tr: 'Kırmızı!', tts: '[confident] Sor e!',
        s: { pose: 'cheer', expr: 'happy', hop: 30 } },
      { id: 'l05', who: 'B', ku: 'Aferîn! Pirsa duyem: *Îro çi roj e?*', tr: 'Aferin! İkinci soru: Bugün günlerden ne?', tts: '[happy] Aferin! Pırsa duyem. [curious] İro çı roj e?',
        s: { pose: 'point', expr: 'happy' }, l: { pose: 'think', expr: 'normal' } },
      { id: 'l06', who: 'R', ku: 'Îro… *yekşem* e!', tr: 'Bugün… pazar!', tts: '[curious] İro… [happy] yekşem e!',
        s: { pose: 'think', expr: 'normal', tilt: -8 }, then: [{ f: .55, s: { pose: 'cheer', expr: 'happy', hop: 30, tilt: 0 } }] },
      { id: 'l07', who: 'B', ku: 'Pir baş! Pirsa sêyem: *Du û sê dike çend?*', tr: 'Çok iyi! Üçüncü soru: İki artı üç kaç eder?', tts: '[happy] Pır baş! Pırsa seyem. [curious] Du u se dıke çend?',
        s: { pose: 'point', expr: 'happy' }, l: { pose: 'think', expr: 'normal' } },
      { id: 'l08', who: 'R', ku: 'Du û sê… *pênc*! Na… şeş! Na… *pênc*!', tr: 'İki artı üç… beş! Yok… altı! Yok… beş!', tts: '[nervous] Du u se… penc! Na… şeş! [happy] Na… penc!',
        s: { pose: 'think', expr: 'normal', tilt: -8 }, then: [{ f: .45, s: { pose: 'up', expr: 'wide', sweat: true, tilt: 0 }, l: { pose: 'hips', expr: 'wide' } }, { f: .82, s: { pose: 'cheer', expr: 'happy', hop: 34, sweat: false }, l: { pose: 'idle', expr: 'happy' } }] },
      { id: 'l09', who: 'B', ku: 'Rast e! Pirsa dawî: *Saet çend e?*', tr: 'Doğru! Son soru: Saat kaç?', tts: '[happy] Rast e! Pırsa dawi. [curious] Saet çend e?',
        s: { pose: 'point', expr: 'happy' }, l: { pose: 'think', expr: 'normal', tilt: -10 } },
      { id: 'l10', who: 'R', gap: .6, ku: 'Saet… *dema xwarinê* ye!', tr: 'Saat… yemek vakti!', tts: '[curious] Saet… [tired] dema hwarıne ye!',
        s: { pose: 'think', expr: 'normal', tilt: -12 }, then: [{ f: .4, s: { pose: 'down', expr: 'sad', tilt: 6 }, l: { pose: 'hips', expr: 'wide' } }] },
      { id: 'l11', who: 'B', ku: 'Na! Saet *diwanzdeh* e!', tr: 'Hayır! Saat on iki!', tts: '[frustrated] Na! Saet dıwanzdeh e!',
        s: { pose: 'up', expr: 'angry', red: .45, shake: 1 }, l: { pose: 'idle', expr: 'wide' } },
      { id: 'l12', who: 'R', ku: 'Erê… diwanzdeh… dema xwarinê! *Xatirê te!*', tr: 'Evet… on iki… yemek vakti! Hoşça kal!', tts: '[happy] Ere… dıwanzdeh… dema hwarıne! [excited] Hatıre te!',
        s: { pose: 'shrug', expr: 'happy' }, then: [{ f: .7, s: { pose: 'wave', expr: 'happy' } }], l: { pose: 'hips', expr: 'angry', red: .4 } },
      { id: 'l13', who: 'B', ku: 'Ronî! Pêşbirk *neqediya*!', tr: 'Ronî! Yarışma bitmedi!', tts: '[angry] [shouting] Roni! Peşbırk nekedıya!',
        s: { pose: 'up', expr: 'angry', red: .85, shake: 1 } },
    ],
    tail: 1.4,
    bubbles: [
      { line: 'l03', f: .45, who: 'B', icon: 'sw:#E53935', label: 'çi reng?' },
      { line: 'l04', f: .1, who: 'R', icon: 'sw:#E53935', label: 'sor' },
      { line: 'l05', f: .5, who: 'B', icon: 'txt:7?', label: 'çi roj?' },
      { line: 'l06', f: .55, who: 'R', icon: 'txt:7/7', label: 'yekşem' },
      { line: 'l07', f: .55, who: 'B', icon: 'txt:2+3', label: 'du û sê?' },
      { line: 'l08', f: .25, tf: .45, hold: 0, who: 'R', icon: 'txt:5', label: 'pênc' },
      { line: 'l08', f: .5, tf: .8, hold: 0, who: 'R', icon: 'txt:6?', label: 'şeş?' },
      { line: 'l08', f: .85, who: 'R', icon: 'txt:5', label: 'pênc!' },
      { line: 'l09', f: .5, who: 'B', icon: 'clock', label: 'saet çend e?' },
      { line: 'l10', f: .45, who: 'R', icon: 'food', label: 'dema xwarinê' },
      { line: 'l11', f: .3, who: 'B', icon: 'txt:12', label: 'diwanzdeh' },
    ],
    icons: {
      clock: H => H.clockFace(0, 0, 44, 12, 6),
      food: H => `<ellipse cy="18" rx="50" ry="13" fill="#fff" ${H.S} stroke-width="5"/><path d="M-34 14a34 28 0 0 1 68 0z" fill="#D9531E" ${H.S} stroke-width="5"/><path d="M-10 -24q-8 -10 0 -20M10 -24q-8 -10 0 -20" fill="none" stroke="#999" stroke-width="5" stroke-linecap="round"/>`,
    },
    vocab: [
      ['pêşbirk', 'yarışma'],
      ['pirs', 'soru'],
      ['rast e', 'doğru'],
      ['ev çi reng e?', 'bu ne renk?'],
      ['îro çi roj e?', 'bugün ne?'],
      ['saet çend e?', 'saat kaç?'],
      ['dema xwarinê', 'yemek vakti'],
    ],
    sfx(H) {
      const out = SCORE.map(([id, f, ok]) => ({ type: ok ? 'ding' : 'cross', at: H.T(id, f) }));
      out.push({ type: 'whoosh', at: H.T('l12', .9) });
      return out;
    },
    tweak(t, P, H) {
      const a = H.T('l12', .9);
      if (t > a) { // Ronî kapıdan kaçar
        const u = H.seg(t, a, a + .9);
        P.R.x = H.lerp(H.RX, 1260, H.eio(u)); P.R.look = 1; P.R.walk = t * 3.2; P.R.dy = -Math.abs(Math.sin(t * 3.2 * Math.PI * 2)) * 10; P.R.expr = 'happy';
        if (u >= 1) P.R.show = false;
      }
    },
    // puan tablosu (4 yıldız)
    back(t, P, H) {
      const { S, T, seg, back } = H;
      let s = `<g transform="translate(905 430) rotate(6)"><rect x="-128" y="-52" width="256" height="104" rx="22" fill="#1f1b16"/><text y="-18" text-anchor="middle" font-size="28" font-weight="800" fill="#FFC83D">PÊŞBIRK</text>`;
      SCORE.forEach(([id, f, ok], i) => {
        const at = T(id, f), on = t >= at, p = on ? back(seg(t, at, at + .3)) : 1, x = -84 + i * 56;
        let st = ''; for (let k = 0; k < 10; k++) { const a = H.rad(k * 36 - 90), r = k % 2 ? 9 : 21; st += `${k ? 'L' : 'M'}${Math.cos(a) * r} ${Math.sin(a) * r}`; }
        s += `<g transform="translate(${x} 22) scale(${p})"><path d="${st}Z" fill="${on && ok ? '#FFD23F' : '#4a4338'}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>${on && !ok ? `<path d="M-14 -14L14 14M14 -14L-14 14" stroke="#E53935" stroke-width="8" stroke-linecap="round"/>` : ''}</g>`;
      });
      return s + `</g>`;
    },
    // mide gurultusu
    front(t, P, H) {
      const a = H.T('l10', .4), b = H.T('l10', 1) + .3;
      if (t < a || t > b) return '';
      let s = '';
      for (let i = 0; i < 3; i++) { const p = ((t - a) * 1.6 + i / 3) % 1; s += `<path d="M${H.RX - 60 - p * 50} ${H.FLOOR - 250 + i * 26}q-10 -10 0 -18q10 -8 0 -18" fill="none" stroke="#E0407B" stroke-width="6" stroke-linecap="round" opacity="${1 - p}"/>`; }
      return s + `<text x="${H.RX - 150}" y="${H.FLOOR - 286}" font-size="40" font-weight="800" fill="#E0407B" transform="rotate(-10 ${H.RX - 150} ${H.FLOOR - 286})">gurr…</text>`;
    },
  };
})();
