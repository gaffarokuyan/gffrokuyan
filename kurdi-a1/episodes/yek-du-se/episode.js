// "Yek, du, sê!" — Hejmar (sayılar 1–10)
// tts metni Türkçe seslere göre yazılır: Kürtçe i → ı, î → i, ê → e, û → u, x → h, q → k
(function () {
  const NAMES = ['yek', 'du', 'sê', 'çar', 'pênc', 'şeş', 'heft', 'heşt', 'neh', 'deh'];
  const TR = ['bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on'];
  // her sayının söylendiği an: [replik, replik içi oran]
  const AT = [['l03', .31], ['l03', .46], ['l03', .6], ['l04', .03], ['l04', .3], ['l04', .52], ['l04', .77], ['l05', .03], ['l05', .33], ['l05', .62]];
  // sabah odayı dolduran koyunlar: [x, y, ölçek, sola bakıyor mu, öndeki katman mı]
  const CROWD = [[150, 1150, .9, 0, 0], [320, 1158, 1, 1, 0], [650, 1152, 1.1, 0, 0], [945, 1158, 1, 1, 0], [240, 985, .75, 0, 0], [90, 1206, 1.1, 0, 1], [640, 1210, 1.15, 1, 1], [985, 1204, 1.05, 1, 1]];

  function sheep(x, y, k, flip, label, H) {
    const S = H.S;
    let s = `<g transform="translate(${x} ${y}) scale(${flip ? -k : k} ${k})">`;
    s += `<path d="M-34 -30V0M-14 -30V0M14 -30V0M34 -30V0" ${S} stroke-width="8"/>`;
    [[-40, -62], [-18, -84], [12, -86], [38, -70], [44, -46], [20, -30], [-12, -28], [-40, -40]].forEach(([a, b]) => { s += `<circle cx="${a}" cy="${b}" r="24" fill="#fff" ${S} stroke-width="7"/>`; });
    s += `<ellipse cx="0" cy="-56" rx="46" ry="30" fill="#fff"/>`;
    s += `<ellipse cx="62" cy="-74" rx="22" ry="26" fill="#3b352d" ${S} stroke-width="6"/><ellipse cx="44" cy="-92" rx="12" ry="7" fill="#3b352d" transform="rotate(-30 44 -92)"/><circle cx="68" cy="-80" r="5" fill="#fff"/></g>`;
    if (label) s += `<text x="${x}" y="${y - 42 * k}" text-anchor="middle" font-size="${44 * k}" font-weight="800" fill="#E0407B">${label}</text>`;
    return s;
  }
  const morning = (t, H) => t >= H.T('c1', .5);
  const leave = (k, t, H) => { const te = H.T('l11', .1) + k * .42; return t > te ? (t - te) * 520 : 0; };
  function crowd(t, H, front) {
    let s = '';
    CROWD.forEach(([x, y, k, flip, fr], i) => {
      if (!!fr !== front) return;
      const dx = leave(i, t, H), bob = dx ? Math.abs(Math.sin(t * 12 + i)) * 12 : Math.abs(Math.sin(t * 2 + i * 1.7)) * 3;
      if (x + dx < 1250) s += sheep(x + dx, y - bob, k, dx ? 0 : flip, '', H);
    });
    return s;
  }

  window.EP = {
    title: 'YEK, DU, SÊ!',
    tag: 'Kurdî A1 · Hejmar',
    vocabScale: .72,
    mode: (t, H) => (morning(t, H) ? 'morning' : 'night'),
    clock: (t, H) => (morning(t, H) ? 7 : 23),
    table: () => ({ teapot: true, glass: 'empty' }),
    seq: [
      { id: 'l01', who: 'R', ku: 'Berfîn, ez *nikarim razêm*!', tr: 'Berfîn, uyuyamıyorum!', tts: '[tired] Berfin, ez nıkarım razem!',
        s: { pose: 'up', expr: 'sad' }, l: { pose: 'idle', expr: 'normal' } },
      { id: 'l02', who: 'B', ku: '*Pezan bijmêre*, Ronî.', tr: 'Koyun say, Ronî.', tts: '[warmly] Pezan bıjmere, Roni.',
        s: { pose: 'point', expr: 'happy' }, l: { pose: 'think', expr: 'normal' } },
      { id: 'l03', who: 'R', ku: 'Baş e! *Yek… du… sê…*', tr: 'Tamam! Bir… iki… üç…', tts: '[happy] Baş e! [slowly] Yek… du… se…',
        s: { pose: 'cheer', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } },
      { id: 'l04', who: 'R', gap: .2, ku: '*Çar… pênc… şeş… heft…*', tr: 'Dört… beş… altı… yedi…', tts: '[slowly] Çar… penc… şeş… heft…',
        s: { pose: 'cheer', expr: 'happy' }, l: { pose: 'idle', expr: 'sleep', tilt: 8 } },
      { id: 'l05', who: 'R', gap: .2, ku: '*Heşt… neh… deh!*', tr: 'Sekiz… dokuz… on!', tts: '[excited] Heşt… neh… DEH!',
        s: { pose: 'up', expr: 'happy' }, then: [{ f: .62, s: { pose: 'up', expr: 'happy', hop: 40 } }] },
      { id: 'l06', who: 'B', ku: 'Aferîn… *şev baş*…', tr: 'Aferin… iyi geceler…', tts: '[tired] [softly] Aferin… şev baş…',
        s: { pose: 'idle', expr: 'sleep', tilt: 14, rot: -3 }, l: { pose: 'cheer', expr: 'happy' } },
      { id: 'w0', wait: 1.4 },
      { id: 'c1', card: { ku: 'Sibeh…', tr: 'Sabah oldu…' } },
      { id: 'l07', who: 'R', gap: .5, ku: 'Nehsed û nod û neh… *HEZAR!*', tr: 'Dokuz yüz doksan dokuz… BİN!', tts: '[tired] Nehsed u nod u neh… [shouting] HEZAR!',
        s: { pose: 'idle', expr: 'sleep', tilt: 12, rot: 4 }, then: [{ f: .69, s: { pose: 'up', expr: 'wide', red: .4, tilt: 0, rot: 0 } }] },
      { id: 'l08', who: 'B', ku: 'Rojbaş! Tu hîn *şiyar* î?!', tr: 'Günaydın! Sen hâlâ uyanık mısın?!', tts: '[happy] Rojbaş! [surprised] Tu hin şıyar i?!',
        s: { pose: 'wave', expr: 'happy', hop: 46 }, then: [{ f: .4, s: { pose: 'up', expr: 'wide' } }], l: { pose: 'idle', expr: 'sleep', tilt: 10 } },
      { id: 'l09', who: 'R', ku: 'Na… pez *neqediyan*!', tr: 'Hayır… koyunlar bitmedi!', tts: '[crying] Na… pez nekedıyan!',
        s: { pose: 'shrug', expr: 'sad', tear: true }, l: { pose: 'hips', expr: 'wide' } },
      { id: 'l10', who: 'B', ku: 'Niha jî wan derxe derve! *Yek bi yek!*', tr: 'Şimdi de onları dışarı çıkar! Teker teker!', tts: '[angry] Nıha ji… van derhe derve! Yek bı yek!',
        s: { pose: 'point', expr: 'angry', red: .5 }, l: { pose: 'idle', expr: 'wide', sweat: true } },
      { id: 'l11', who: 'R', gap: .5, ku: '*Yek… du… sê…*', tr: 'Bir… iki… üç…', tts: '[crying] [slowly] Yek… du… se…',
        s: { pose: 'down', expr: 'sad', tear: true }, l: { pose: 'hips', expr: 'smug' } },
    ],
    tail: 2.2,
    bubbles: [
      ...AT.map(([line, f], i) => ({ line, f, to: (AT[i + 1] || [line])[0], tf: (AT[i + 1] || [0, 1])[1], hold: i === 9 ? .4 : 0, who: 'R', icon: 'txt:' + (i + 1), label: NAMES[i] })),
      { line: 'l07', f: .69, who: 'R', icon: 'txt:1000', label: 'hezar' },
    ],
    vocab: NAMES.map((n, i) => [n, `${i + 1} · ${TR[i]}`]),
    sfx(H) {
      const out = AT.map(([id, f]) => ({ type: 'boing', at: H.T(id, f) }));
      out.push({ type: 'boing', at: H.T('w0', .1) }, { type: 'boing', at: H.T('w0', .6) }, { type: 'rise', at: H.T('l08', 0) });
      CROWD.forEach((_, i) => out.push({ type: 'pop', at: H.T('l11', .1) + i * .42 }));
      return out;
    },
    tweak(t, P, H) {
      if (morning(t, H) && t < H.T('l08', 0)) { P.B.expr = 'sleep'; P.B.tilt = 14; }
      if (t > H.T('l11', 1)) { P.B.expr = 'smug'; }
    },
    // gece: sayılan koyunlar odanın içinden atlar · sabah: oda koyun dolu
    back(t, P, H) {
      let s = '';
      if (!morning(t, H)) {
        const fly = AT.map(([id, f], i) => [H.T(id, f), i + 1]).concat([[H.T('w0', .1), 11], [H.T('w0', .6), 12]]);
        for (const [a, n] of fly) { const u = H.seg(t, a, a + 1.7); if (u > 0 && u < 1) s += `<g opacity="${Math.min(1, u * 6, (1 - u) * 6)}" transform="rotate(${(u - .5) * -24} ${H.lerp(1180, -120, u)} ${940 - Math.sin(u * Math.PI) * 330})">${sheep(H.lerp(1180, -120, u), 940 - Math.sin(u * Math.PI) * 330, 1, 1, n, H)}</g>`; }
      } else {
        s += `<g transform="translate(900 430) rotate(8)"><rect x="-110" y="-46" width="220" height="92" rx="22" fill="#E0407B" ${H.S} stroke-width="7"/><text y="-6" text-anchor="middle" font-size="46" font-weight="800" fill="#fff">1000</text><text y="32" text-anchor="middle" font-size="30" font-weight="800" fill="#FFD23F">pez</text></g>`;
        s += crowd(t, H, false);
      }
      return s;
    },
    front(t, P, H) {
      let s = '';
      if (t > H.T('l06', .8) && t < H.T('l08', 0) && !H.TL.cards.some(c => t >= c.a && t < c.b)) {
        for (let i = 0; i < 3; i++) { const p = ((t * .55 + i / 3) % 1); s += `<text x="${H.BX + 70 + p * 70 + Math.sin(p * 8) * 8}" y="${760 - p * 130}" font-size="${34 + p * 40}" font-weight="800" fill="#5C6BC0" opacity="${1 - p}">Z</text>`; }
      }
      if (morning(t, H)) {
        const dx = leave(8, t, H);
        if (!dx && t > H.T('l08', 0)) s += sheep(P.R.x + (P.R.dx || 0) - 6, H.FLOOR - 10 + (P.R.dy || 0) - 462, .6, 1, '', H);
        s += crowd(t, H, true);
      }
      return s;
    },
  };
})();
