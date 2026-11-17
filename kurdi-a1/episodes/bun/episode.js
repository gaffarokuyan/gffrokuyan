// "Bûn" — Dersa 20 (tahta dersi): Berfîn tahtaya tebeşirle yazarak "bûn" (olmak) fiilini anlatır: Ez … im/me, Tu … î/yî, Ew … e/ye, Em·Hûn·Ew … in/ne.
// Ronî karıştırır ("Ez Berfîn im!", "Ez xwarin im!"), Berfîn gülüp düzeltir.
// Sesler: ElevenLabs API (eleven_v4). Örnek cümleler Latin yazımla (ek fiil ayrı kelime olarak net okunsun diye), diğerleri Arap harfli yazımla verilir.
(function () {
  const INKC = '#1f1b16';
  const LAND = /[?&]land=1/.test(location.search);
  const TEACH = { pose: 'show', expr: 'happy' }, OK = { pose: 'cheer', expr: 'happy', hop: 24 }, LAUGH = { pose: 'face', expr: 'happy' };
  const B = (id, ku, tr, tts, o = {}) => ({ id, who: 'B', ku, tr, tts, gap: .5, s: TEACH, ...o });
  const R = (id, ku, tr, tts, o = {}) => ({ id, who: 'R', ku, tr, tts, gap: .5, s: { pose: 'point', expr: 'happy' }, ...o });
  const HA = (id, ku, tr, tts, o = {}) => B(id, ku, tr, tts, { laugh: true, s: LAUGH, then: [{ f: .35, s: { pose: 'point', expr: 'happy' } }], l: { pose: 'idle', expr: 'wide' }, ...o });
  const G = { gap: .35 };

  const SEQ = [
    // ---------- giriş ----------
    B('a01', 'Ronî, îro *rêziman*! Em lêkera "*bûn*" hîn dibin.', 'Ronî, bugün dilbilgisi! "Olmak" fiilini öğreniyoruz.', '[cheerful] رۆنی، ئیرۆ رێزمان! ئەم لێکەرا بوون هین دبن.', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Rêziman? Ez *westiyayî me*…', 'Dilbilgisi mi? Ben yorgunum…', '[tired] رێزمان؟ ئەز وەستیایی مە…', { s: { pose: 'down', expr: 'sad' } }),
    HA('a03', 'Binêre! Te niha *rast* got: "ez westiyayî *me*"!', 'Bak! Şimdi doğru söyledin: "ez westiyayî me"!', '[laughs] بنێرە! تە نها راست گۆت: Ez westiyayî me!'),
    R('a04', 'Min got? Ez pir *jîr* im!', 'Söyledim mi? Ben çok zekiyim!', '[proud] من گۆت؟ ئەز پر ژیرم!', { s: { pose: 'hips', expr: 'smug' } }),

    // ---------- ez ----------
    B('b01', '"Ez" — "*im*". Ez Berfîn *im*.', '"Ben" — "-im". Ben Berfîn\'im.', '[clearly] Ez… im. Ez Berfîn im.', { write: 1 }),
    R('b02', 'Ez Berfîn im!', 'Ben Berfîn\'im!', '[confident] Ez Berfîn im!', { s: OK }),
    HA('b03', 'Na! Tu Ronî yî! Bibêje: Ez Ronî *me*.', 'Hayır! Sen Ronî\'sin! Söyle: Ben Ronî\'yim.', '[laughs] نا! Tu Ronî yî! ببێژە: Ez Ronî me.', { write: 1 }),
    R('b04', 'Ez Ronî me. Çima "*me*"?', 'Ben Ronî\'yim. Neden "me"?', '[curious] Ez Ronî me. چما… me?', { s: { pose: 'think', expr: 'normal' } }),
    B('b05', 'Piştî *dengdêran* "me" tê.', 'Ünlülerden sonra "me" gelir.', '[patiently] پشتی دەنگدێران… me… تێ.', { write: 1 }),

    // ---------- tu ----------
    B('c01', '"Tu" — "*î*". Tu xwendekar *î*.', '"Sen" — "-sin". Sen öğrencisin.', '[clearly] Tu… î. Tu xwendekar î.', { write: 1 }),
    R('c02', 'Tu xwendekar î!', 'Sen öğrencisin!', '[confident] Tu xwendekar î!', { s: { pose: 'point', expr: 'smug' } }),
    HA('c03', 'Na, na! *Ez* mamoste me. *Tu* xwendekar î!', 'Hayır, hayır! Ben öğretmenim. Sen öğrencisin!', '[laughs] نا، نا! Ez mamoste me. Tu xwendekar î!', { write: 1 }),
    R('c04', 'Erê! Ez mamoste me, tu xwendekar î!', 'Evet! Ben öğretmenim, sen öğrencisin!', '[proud] ئەرێ! Ez mamoste me, tu xwendekar î!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('c05', 'Ay Ronî! Tu min *dîn* dikî!', 'Ay Ronî! Beni delirtiyorsun!', '[laughing] ئای رۆنی! تو من دین دکی!', { s: { pose: 'up', expr: 'happy' } }),

    // ---------- ew ----------
    B('d01', '"Ew" — "*e*". Ew pisîk *e*.', '"O" — "-dir". O bir kedi.', '[clearly] Ew… e. Ew pisîk e.', { write: 1 }),
    R('d02', 'Ew pisîk e. Ew pisîk… *birçî ye*?', 'O bir kedi. O kedi… aç mı?', '[curious] Ew pisîk e. Ew pisîk… birçî ye?', { s: { pose: 'think', expr: 'happy' } }),
    B('d03', 'Aferîn! "Birçî *ye*" — piştî dengdêrê "ye"!', 'Aferin! "Birçî ye" — ünlüden sonra "ye"!', '[happy] ئافەرین! Birçî ye! پشتی دەنگدێرێ… ye!', { write: 1, s: OK }),
    R('d04', 'Ez jî birçî *me*!', 'Ben de açım!', '[happy] Ez jî birçî me!', { s: OK }),
    HA('d05', 'Rast e! Rêzimana te *baş* e, lê zikê te *vala* ye!', 'Doğru! Dilbilgin iyi ama karnın boş!', '[laughs] راستە! رێزمانا تە باشە، لێ زکێ تە ڤالا یە!'),

    // ---------- em / hûn ----------
    B('e01', '"Em, hûn, ew" — "*in*". Em heval *in*.', '"Biz, siz, onlar" — "-iz". Biz arkadaşız.', '[clearly] Em, hûn, ew… in. Em heval in.', { write: 1 }),
    R('e02', 'Em heval in! Û… *hûn* kî ne?', 'Biz arkadaşız! Peki… siz kimsiniz?', '[curious] Em heval in! ئوو… hûn kî ne?', { s: { pose: 'think', expr: 'wide', look: 0 } }),
    B('e03', 'Hûn *temaşevan* in! Silav, temaşevanno!', 'Siz izleyicisiniz! Merhaba izleyiciler!', '[cheerful] Hûn temaşevan in! سلاڤ، تەماشەڤاننۆ!', { write: 1, s: { pose: 'wave', expr: 'happy', look: 0 } }),
    R('e04', 'Silav! Hûn pir *xweşik* in!', 'Merhaba! Çok güzelsiniz!', '[charming] سلاڤ! Hûn pir xweşik in!', { s: { pose: 'wave', expr: 'happy', look: 0 } }),

    // ---------- Ronî tahtada ----------
    B('f01', 'Niha *tu* binivîse, Ronî!', 'Şimdi sen yaz Ronî!', '[encouraging] نها تو بنڤیسە، رۆنی!', { s: { pose: 'point', expr: 'happy' } }),
    { id: 'fw', wait: 3 },
    R('f02', 'Ez *xwarin* im!', 'Ben yemeğim!', '[proud] Ez xwarin im!', { gap: .1, s: { pose: 'hips', expr: 'smug' } }),
    HA('f03', 'Tu xwarin î?! Na! "Ez *birçî* me"!', 'Sen yemek misin?! Hayır! "Ben açım"!', '[laughing] Tu xwarin î?! نا! Ez birçî me!', { write: 1 }),
    R('f04', 'Lê ez pir ji xwarinê *hez dikim*…', 'Ama ben yemeği çok seviyorum…', '[dreamy] لێ ئەز پر ژ خوارنێ هەز دکم…', { s: { pose: 'down', expr: 'sad' } }),
    HA('f05', 'Ew *hevokeke din* e!', 'O başka bir cümle!', '[giggles] ئەو هەڤۆکەکە دنە!'),

    // ---------- neyînî ----------
    B('g01', 'Û neyînî: "*ne*". Ez *ne* westiyayî me.', 'Ve olumsuz: "ne". Ben yorgun değilim.', '[clearly] ئوو نەیینی: ne. Ez ne westiyayî me.', { write: 1 }),
    R('g02', 'Ez ne westiyayî me… Na! Ev *derew* e! Ez westiyayî me!', 'Ben yorgun değilim… Hayır! Bu yalan! Ben yorgunum!', '[reading, then protesting] Ez ne westiyayî me… نا! ئەڤ دەرەوە! Ez westiyayî me!', { s: { pose: 'think', expr: 'normal' }, then: [{ f: .4, s: { pose: 'up', expr: 'wide' } }] }),
    HA('g03', 'Ronî! Ew tenê *mînak* e!', 'Ronî! O sadece örnek!', '[laughs] رۆنی! ئەو تەنێ میناکە!'),

    // ---------- dirêj / kurt ----------
    B('h01', 'Mînakeke din: Ez *dirêj* im, tu *kurt* î.', 'Bir örnek daha: Ben uzunum, sen kısasın.', '[teasing] میناکەکە دن: Ez dirêj im, tu kurt î.', { write: 1, s: { pose: 'show', expr: 'smug' } }),
    R('h02', 'Ez kurt im?! Na! Ez *dirêj* im! Binêre!', 'Ben kısa mıyım?! Hayır! Ben uzunum! Bak!', '[offended] Ez kurt im?! نا! Ez dirêj im! بنێرە!', { s: { pose: 'up', expr: 'angry', red: .3 } }),
    { id: 'hw', wait: 2 },
    HA('h03', 'Baş e, baş e! Em herdu jî dirêj *in*!', 'Tamam, tamam! İkimiz de uzunuz!', '[laughing] باشە، باشە! Em herdu jî dirêj in!', { gap: .1, write: 1 }),

    // ---------- ezmûn ----------
    B('i01', 'Niha *ezmûn*! Ez Ronî…?', 'Şimdi sınav! Ez Ronî…?', '[energetic] نها ئەزموون! Ez Ronî…?', { write: 1 }),
    R('i02', 'Ez Ronî *me*!', 'Ben Ronî\'yim!', '[confident] Ez Ronî me!', { ...G, s: OK }),
    B('i03', 'Tu Berfîn…?', 'Tu Berfîn…?', '[curious] Tu Berfîn…?', G),
    R('i04', 'Tu Berfîn… yî? Na — *î*!', 'Tu Berfîn… yî? Yok — î!', '[careful] Tu Berfîn… yî? نا — Tu Berfîn î!', { ...G, s: { pose: 'think', expr: 'wide' }, then: [{ f: .6, s: OK }] }),
    B('i05', 'Ew pisîk…?', 'Ew pisîk…?', '[curious] Ew pisîk…?', G),
    R('i06', 'Ew pisîk *e*!', 'O bir kedi!', '[confident] Ew pisîk e!', { ...G, s: OK }),
    B('i07', 'Em heval…?', 'Em heval…?', '[curious] Em heval…?', G),
    R('i08', 'Em heval *in*!', 'Biz arkadaşız!', '[confident] Em heval in!', { ...G, s: OK }),
    HA('i09', 'Aferîn! *Sed ji sedî*!', 'Aferin! Yüzde yüz!', '[giggles] ئافەرین! سەد ژ سەدی!', { l: { pose: 'cheer', expr: 'happy', hop: 24 } }),

    // ---------- final ----------
    R('j01', 'Berfîn, tu mamosteya *herî baş* î!', 'Berfîn, sen en iyi öğretmensin!', '[warmly] بەرفین، تو مامۆستایا هەری باشی!', { s: { pose: 'show', expr: 'happy' } }),
    B('j02', 'Û tu xwendekarê herî *şîrîn* î!', 'Sen de en tatlı öğrencisin!', '[warmly] ئوو تو خوەندەکارێ هەری شیرینی!', { s: { pose: 'show', expr: 'happy' } }),
    R('j03', 'Em tîmeke baş *in*!', 'Biz iyi bir takımız!', '[happy] Em tîmeke baş in!', { s: OK }),
    { id: 'zw', wait: 2.2 },
    B('j04', 'Ay… Ronî!', 'Ay… Ronî!', '[shy giggle] ئای… رۆنی!', { gap: .1, s: { pose: 'face', expr: 'happy', red: .7 } }),
  ];

  // ---------- tahta sayfaları: [sayfanın başladığı replik, [[yazıldığı replik, oran, metin, renk?, yazan?], ...]] ----------
  const W_ = '#fff', Y_ = '#FFE14D', P_ = '#FF9EC4', G_ = '#9BE59B';
  const PAGES = [
    ['a01', 'BÛN = olmak', [['a03', .55, 'Ez westiyayî *me*.', G_]]],
    ['b01', 'EZ … im / me', [['b01', .35, 'Ez Berfîn *im*.'], ['b03', .5, 'Ez Ronî *me*.'], ['b05', .2, 'î, a, e, û …  +  *me*', P_]]],
    ['c01', 'TU … î / yî', [['c01', .35, 'Tu xwendekar *î*.'], ['c03', .3, 'Ez mamoste *me*.'], ['c03', .75, 'Tu Ronî *yî*.', P_]]],
    ['d01', 'EW … e / ye', [['d01', .35, 'Ew pisîk *e*.'], ['d03', .3, 'Ew birçî *ye*.']], 'cat'],
    ['e01', 'EM · HÛN · EW … in', [['e01', .45, 'Em heval *in*.'], ['e03', .15, 'Hûn temaşevan *in*.']]],
    ['f01', 'RONÎ DINIVÎSE', [['fw', .1, 'Ez xwarin *im*.', Y_, 'R'], ['f03', .55, 'Ez birçî *me*.  ✓', G_]]],
    ['g01', 'NEYÎNÎ: ne', [['g01', .45, 'Ez *ne* westiyayî me.']]],
    ['h01', 'MÎNAK', [['h01', .35, 'Ez dirêj *im*.'], ['h01', .7, 'Tu kurt *î*.'], ['h03', .5, 'Em dirêj *in*!', G_]]],
    ['i01', 'EZMÛN', [['i01', .5, 'Ez Ronî …  →  *me*', W_, 0, 'i02'], ['i03', .2, 'Tu Berfîn …  →  *î*', W_, 0, 'i04'], ['i05', .2, 'Ew pisîk …  →  *e*', W_, 0, 'i06'], ['i07', .2, 'Em heval …  →  *in*', W_, 0, 'i08']]],
    ['j01', '♥', [['j03', .3, 'Em tîmeke baş *in*!', P_]]],
  ];
  // tahta geometrisi
  const BD = LAND ? { x: -140, y: 425, w: 570, h: 520 } : { x: 46, y: 318, w: 988, h: 392 };
  const FS = LAND ? 48 : 58, LH = LAND ? 96 : 76, TOP = LAND ? 150 : 124;
  const WD = .9; // bir satırı yazma süresi (sn)

  function curPage(t, H) { let k = 0; PAGES.forEach((p, i) => { if (t >= H.T(p[0], 0)) k = i; }); return k; }
  function writing(t, H) { // şu an yazılan satır: {who}
    const pg = PAGES[curPage(t, H)];
    for (const L of pg[2]) { const a = H.T(L[0], L[1]); if (t >= a && t < a + WD) return { who: L[4] || 'B', u: (t - a) / WD }; }
    return null;
  }

  window.EP = {
    title: 'LÊKERA "BÛN"',
    tag: 'Kurdî A1 · Dersa 20',
    noClock: true,
    noTable: true,
    seq: SEQ,
    tail: 2.2,
    bubbles: [],
    icons: {
      tu: H => `<circle cy="-14" r="18" fill="#2F7DE1" ${H.S} stroke-width="5"/><path d="M-30 36q0 -34 30 -34t30 34z" fill="#2F7DE1" ${H.S} stroke-width="5"/>`,
      ez: H => `<circle cy="-14" r="18" fill="#F06A9B" ${H.S} stroke-width="5"/><path d="M-30 36q0 -34 30 -34t30 34z" fill="#F06A9B" ${H.S} stroke-width="5"/>`,
      em: H => `<circle cx="-18" cy="-14" r="15" fill="#F06A9B" ${H.S} stroke-width="5"/><circle cx="18" cy="-14" r="15" fill="#2F7DE1" ${H.S} stroke-width="5"/><path d="M-42 36q0 -30 24 -30q12 0 18 10q6 -10 18 -10q24 0 24 30z" fill="#C9A24D" ${H.S} stroke-width="5"/>`,
      pisik: H => `<ellipse cy="18" rx="30" ry="22" fill="#FF9F43" ${H.S} stroke-width="5"/><circle cy="-16" r="24" fill="#FF9F43" ${H.S} stroke-width="5"/><path d="M-20 -30l-4 -24l16 12zM20 -30l4 -24l-16 12z" fill="#FF9F43" ${H.S} stroke-width="5"/><circle cx="-9" cy="-18" r="4" fill="${INKC}"/><circle cx="9" cy="-18" r="4" fill="${INKC}"/>`,
      book: H => `<path d="M-44 -30q22 -10 44 0q22 -10 44 0v60q-22 -10 -44 0q-22 -10 -44 0z" fill="#fff" ${H.S} stroke-width="5"/><path d="M0 -30v60" ${H.S} stroke-width="4"/>`,
    },
    vocab: [
      ['Ez mamoste me.', 'Ben öğretmenim.'],
      ['Tu xwendekar î.', 'Sen öğrencisin.'],
      ['Ew pisîk e.', 'O bir kedi.'],
      ['Em heval in.', 'Biz arkadaşız.'],
      ['Hûn temaşevan in.', 'Siz izleyicisiniz.'],
      ['Ez ne westiyayî me.', 'Ben yorgun değilim.'],
      ['mamoste', 'öğretmen'],
      ['xwendekar', 'öğrenci'],
      ['heval', 'arkadaş'],
      ['rêziman', 'dilbilgisi'],
    ],
    vocabIcons: ['ez', 'tu', 'pisik', 'em', 'em', 'no', 'ez', 'tu', 'em', 'book'],
    vocabTts: {
      ku: ['Ez mamoste me', 'Tu xwendekar î', 'Ew pisîk e', 'Em heval in', 'Hûn temaşevan in', 'Ez ne westiyayî me', 'Mamoste', 'Xwendekar', 'Heval', 'Rêziman'],
      tr: ['Ben öğretmenim', 'Sen öğrencisin', 'O bir kedi', 'Biz arkadaşız', 'Siz izleyicisiniz', 'Ben yorgun değilim', 'öğretmen', 'öğrenci', 'arkadaş', 'dilbilgisi'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const p of PAGES) { if (p[0] !== 'a01') out.push({ type: 'sweep', at: T(p[0], 0) - .25 }); for (const L of p[2]) { const a = T(L[0], L[1]); for (let k = 0; k < 6; k++) out.push({ type: 'tek', at: a + k * .14 }); } }
      for (const id of ['i02', 'i04', 'i06', 'i08']) out.push({ type: 'ding', at: T(id, .85) });
      out.push({ type: 'cross', at: T('f03', .1) }, { type: 'boing', at: T('hw', .3) }, { type: 'boing', at: T('zw', .2) }, { type: 'chime', at: T('j04', .2) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // Ronî tahtaya gelir (f sahnesi), Berfîn kenara çekilir
      const f0 = T('fw', 0), f1 = T('fw', .2), f2 = T('f02', 1), f3 = T('f03', .4);
      if (t > f0 && t < f3) { const u = t < f1 ? H.eio(H.seg(t, f0, f1)) : t < f2 ? 1 : 1 - H.eio(H.seg(t, f2, f3)); Rr.x = H.lerp(H.RX, LAND ? 440 : 560, u); Bb.x = H.lerp(H.BX, LAND ? 660 : 300, u); if (u > 0 && u < 1) { Rr.walk = t * 3.4; Bb.walk = t * 3.4; } }
      // yazma pozu
      const w = writing(t, H);
      if (w) { const O = w.who === 'R' ? Rr : Bb, wob = Math.sin(t * 30) * 8;
        if (LAND) { O.look = -1; O.la = [96 + wob * .5, 100 + wob]; }
        else { O.la = [150 + wob * .4, 172 + wob]; }
        if (w.who === 'R') O.expr = 'smug'; }
      // tahtayı gösterirken (yazmıyorken) Berfîn tahtaya dönük işaret eder
      // "Ez dirêj im!": Ronî parmak ucunda uzar
      const h0 = T('h02', .7), h1 = T('hw', .5), h2 = T('h03', .6), h3 = T('h03', 1);
      if (t > h0 && t < h3) { const u = t < h1 ? H.eio(H.seg(t, h0, h1)) : t < h2 ? 1 : 1 - H.eio(H.seg(t, h2, h3)); Rr.sc = 1 + .28 * u; Rr.la = [150, 176]; Rr.ra = [150, 176]; Rr.expr = 'smug'; if (t > T('hw', .3) && t < h2) Bb.expr = 'wide'; }
      // izleyiciye bakış
      if (t > T('e02', .5) && t < T('e04', 1)) { Rr.look = 0; if (t > T('e03', 0)) Bb.look = 0; }
      // parmak kalbi
      if (t > T('zw', .1)) { Rr.la = [95, 120]; Rr.look = -1; Rr.expr = 'happy'; Bb.red = Math.max(Bb.red || 0, .7 * H.seg(t, T('zw', .3), T('zw', .7))); if (t < T('j04', 0)) { Bb.expr = 'wide'; Bb.look = 1; } }
      // gülme
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
    },
    back(t, P, H) {
      const S = H.S, T = H.T;
      let s = '';
      // pencereyi duvarla kapat (dikeyde tahtanın altında kalmasın)
      if (!LAND) s += `<rect x="6" y="490" width="408" height="400" fill="#F6ECD6"/>`;
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
        const u = H.seg(t, a, a + WD), ly = y + TOP + i * LH + FS * .8, lx = x + 60, col = L[3] || W_;
        let txt = L[2], ans = '';
        if (L[5]) { const k = txt.indexOf('→'); if (t < T(L[5], .5)) txt = txt.slice(0, k + 1) + '  ?'; }
        const html = txt.replace(/\*(.+?)\*/g, `<tspan fill="#FFE14D">$1</tspan>`);
        const rot = L[4] === 'R' ? -4 : 0;
        s += `<clipPath id="wl${pi}_${i}"><rect x="${lx - 10}" y="${ly - FS}" width="${(w - 100) * u}" height="${FS * 1.5}"/></clipPath><g clip-path="url(#wl${pi}_${i})"><text x="${lx}" y="${ly}" font-size="${L[4] === 'R' ? FS * 1.05 : FS}" font-weight="800" fill="${col}" transform="rotate(${rot} ${lx} ${ly})">${html}</text></g>`;
        if (L[4] === 'R' && t > T('f03', .1)) s += `<path d="M${lx - 6} ${ly - FS * .35}l${FS * 7.4} ${-FS * .5}" stroke="#FF5A5A" stroke-width="8" stroke-linecap="round"/>`;
      });
      s += `</g>`;
      if (wipe > 0 && wipe < 1) s += `<rect x="${x + 18 + (w - 150) * wipe}" y="${y + 30}" width="110" height="${h - 70}" rx="10" fill="#B0BEC5" ${S} stroke-width="5" opacity=".9"/>`;
      return s;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R, S = H.S;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${P.B.x - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${P.B.x - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // yazarken eldeki tebeşir + toz
      const w = writing(t, H);
      if (w) { const O = w.who === 'R' ? Rr : P.B, [hx, hy] = H.hand(O, -1); s += `<rect x="${hx - 6}" y="${hy - 26}" width="12" height="30" rx="4" fill="#fff" ${S} stroke-width="3" transform="rotate(${LAND ? -60 : -20} ${hx} ${hy})"/>`; for (let k = 0; k < 3; k++) { const p = ((t * 3 + k / 3) % 1); s += `<circle cx="${hx - 10 + k * 12}" cy="${hy + p * 50}" r="${4 - p * 3}" fill="#fff" opacity="${.8 - p * .8}"/>`; } }
      // Berfîn'in elindeki işaret çubuğu (yazmadığı zamanlar, öğretirken)
      // parmak kalbi
      if (t > T('zw', .1)) {
        const [hx, hy] = H.hand(Rr, -1), p = H.back(H.seg(t, T('zw', .1), T('zw', .4)));
        s += `<g transform="translate(${hx - 4} ${hy - 14}) rotate(-12) scale(${1.15 * p})"><path d="M-20 10q-6 -26 8 -34q10 -6 14 6l6 -18q8 -14 16 -2l-2 18q14 2 14 16v20q0 22 -26 24q-30 0 -30 -30z" fill="#FFC1C1" stroke="#5B2BD6" stroke-width="5" stroke-linejoin="round"/><path d="M0 4q10 -6 22 -4M2 16q10 -4 20 -2M4 28q8 -2 16 0" fill="none" stroke="#5B2BD6" stroke-width="4" stroke-linecap="round"/></g>`;
        if (t > T('zw', .3)) { const q = H.back(H.seg(t, T('zw', .3), T('zw', .6))), b = 1 + Math.sin(t * 8) * .08; s += `<g transform="translate(${hx - 8} ${hy - 80}) scale(${q * b})"><path d="M0 18C-30 -4 -18 -28 0 -14C18 -28 30 -4 0 18Z" fill="#F0569B" stroke="#5B2BD6" stroke-width="5"/><path d="M-34 -24l-14 -6M-36 -6l-16 4M34 -24l14 -6M36 -6l16 4" stroke="#5B2BD6" stroke-width="6" stroke-linecap="round"/></g>`; }
        for (let k = 0; k < 7; k++) { const pp = ((t * .45 + k / 7) % 1), xx = H.lerp(hx, P.B.x - 20, pp) + Math.sin(t * 3 + k) * 30, yy = hy - 100 - pp * 200 - k * 6, r = 14 + (k % 3) * 6; if (t > T('zw', .5)) s += `<path d="M${xx} ${yy + r * .55}C${xx - r * 1.5} ${yy - r * .2} ${xx - r * .9} ${yy - r * 1.4} ${xx} ${yy - r * .7}C${xx + r * .9} ${yy - r * 1.4} ${xx + r * 1.5} ${yy - r * .2} ${xx} ${yy + r * .55}Z" fill="${k % 2 ? '#F0569B' : '#E53935'}" opacity="${1 - pp * .7}"/>`; }
      }
      return s;
    },
  };
})();
