// "Çep û rast" — Dersa 17 pratiği (yönler): Berfîn tarif eder, Ronî yanlış yöne gider ("rast" = hem sağ hem doğru), Berfîn gülüp düzeltir.
// Sesler: ElevenLabs API (eleven_v4); Kürtçe metin sese ARAP HARFLİ yazımla verilir (tts alanı). Cümle sonundaki "…e" ەه ile yazılır.
// Her sahne + konuşmacı tek uzun kayıt, Scribe kelime zamanlarıyla bölünür. Yönler ekrana göredir: çep ←, rast →.
(function () {
  const INKC = '#1f1b16';
  const LAND = /[?&]land=1/.test(location.search);
  const TEACH = { pose: 'show', expr: 'happy' }, OK = { pose: 'cheer', expr: 'happy', hop: 24 }, LAUGH = { pose: 'face', expr: 'happy' };
  const B = (id, ku, tr, tts, o = {}) => ({ id, who: 'B', ku, tr, tts, gap: .5, s: TEACH, ...o });
  const R = (id, ku, tr, tts, o = {}) => ({ id, who: 'R', ku, tr, tts, gap: .5, s: { pose: 'point', expr: 'happy' }, ...o });
  const HA = (id, ku, tr, tts, o = {}) => B(id, ku, tr, tts, { laugh: true, s: LAUGH, then: [{ f: .35, s: { pose: 'point', expr: 'happy' } }], l: { pose: 'idle', expr: 'wide' }, ...o });
  const G = { gap: .3 };

  const SEQ = [
    // ---------- giriş ----------
    B('a01', 'Ronî, îro em *rê* hîn dibin: çep, rast, pêş, paş!', 'Ronî, bugün yönleri öğreniyoruz: sol, sağ, ileri, geri!', '[cheerful] رۆنی، ئیرۆ ئەم رێ هین دبن: چەپ، راست، پێش، پاش!', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Ez rê baş dizanim! Ez *qet* winda nabim!', 'Ben yolu iyi bilirim! Asla kaybolmam!', '[confident] ئەز رێ باش دزانم! ئەز قەت ونda نابم!'.replace('ونda', 'وندا'), { s: { pose: 'hips', expr: 'smug' } }),
    HA('a03', 'Em ê *bibînin*!', 'Göreceğiz!', '[giggles] ئەم ێ ببینن!'),

    // ---------- çep ----------
    B('b01', 'Ev *çep* e. Here *çepê*!', 'Bu sol. Sola git!', '[clearly] ئەڤ چەپەه. هەرە چەپێ!', { s: { pose: 'point', expr: 'happy' } }),
    { id: 'bw', wait: 2 },
    HA('b02', 'Ronî! Ew *rast* e! Çep li vir e!', 'Ronî! O sağ! Sol burada!', '[laughs] رۆنی! ئەو راستەه! چەپ ل ڤرەه!', { gap: .1 }),
    R('b03', 'Ax… çepê min *li ku* ye?', 'Ah… benim solum nerede?', '[confused] ئاخ… چەپێ من ل کو یە؟', { s: { pose: 'shrug', expr: 'wide' } }),
    B('b04', 'Destê xwe yê *çepê* bilind bike.', 'Sol elini kaldır.', '[patiently] دەستێ خوە یێ چەپێ بلند بکە.'),
    { id: 'bw2', wait: 1.4 },
    HA('b05', 'Ne ew! Ya *din*!', 'O değil! Öbürü!', '[laughing] نە ئەو! یا دن!', { gap: .1 }),

    // ---------- rast ----------
    B('c01', 'Ev *rast* e. Here *rastê*!', 'Bu sağ. Sağa git!', '[clearly] ئەڤ راستەه. هەرە راستێ!', { s: { pose: 'point', expr: 'happy' } }),
    { id: 'cw', wait: 1.6 },
    B('c02', '*Rast* e! Aferîn!', 'Doğru! Aferin!', '[happy] راستەه! ئافەرین!', { gap: .1, s: OK }),
    R('c03', 'Rast? Baş e! Rast!', 'Sağ mı? Tamam! Sağa!', '[eager] راست؟ باشە! راست!', { s: { pose: 'cheer', expr: 'happy' } }),
    { id: 'cw2', wait: 1.6 },
    HA('c04', 'Na, na! "Rast e" yanî *"baş e"*!', 'Hayır, hayır! "Rast e" yani "doğru"!', '[laughs] نا، نا! راستە، یانی باشە!', { gap: .1 }),
    R('c05', 'Rast û rast? Kurdî *zehmet* e!', 'Sağ ve doğru mu? Kürtçe zor!', '[dizzy] راست ئوو راست؟ کوردی زەحمەتە!', { s: { pose: 'think', expr: 'dizzy' } }),

    // ---------- pêş / paş ----------
    B('d01', 'Niha here *pêş*!', 'Şimdi ileri git!', '[energetic] نها هەرە پێش!'),
    { id: 'dw', wait: 2 },
    HA('d02', 'Ne *ewqas* nêzîk!', 'O kadar yakın değil!', '[laughing] نە ئەوقاس نێزیک!', { gap: .1 }),
    B('d03', 'Niha here *paş*!', 'Şimdi geri git!', '[energetic] نها هەرە پاش!', { s: { pose: 'point', expr: 'happy' } }),
    { id: 'dw2', wait: 1.8 },
    R('d04', 'Ay! Paş… *dîwar*!', 'Ay! Geri… duvar!', '[hurt] ئای! پاش… دیوار!', { gap: .1, s: { pose: 'face', expr: 'dizzy' } }),
    HA('d05', 'Hi hi! *Hêdî* here!', 'Hi hi! Yavaş git!', '[giggles] هێدی هەرە!'),

    // ---------- raweste / vegere ----------
    B('e01', 'Here… û *raweste*!', 'Git… ve dur!', '[clearly] هەرە… ئوو راوەستە!'),
    { id: 'ew', wait: 1.8 },
    B('e02', 'RAWESTE!', 'DUR!', '[shouting] راوەستە!', { gap: .1, s: { pose: 'up', expr: 'angry', red: .4, shake: 1 } }),
    R('e03', 'Çi?!', 'Ne?!', '[distant shout] چ؟!', { gap: .3 }),
    HA('e04', '*Vegere*!', 'Geri dön!', '[laughs] ڤەگەرە!'),
    { id: 'ew2', wait: 1.6 },
    R('e05', 'Ez *winda* bûm!', 'Kayboldum!', '[panting] ئەز وندا بووم!', { gap: .1, s: { pose: 'down', expr: 'sad', sweat: true } }),
    HA('e06', 'Te got: ez *qet* winda nabim!', 'Sen "asla kaybolmam" demiştin!', '[laughing] تە گۆت: ئەز قەت وندا نابم!'),

    // ---------- harita ----------
    B('f01', 'Dibistan li *çepê* ye, dikan li *rastê* ye, park li *pêş* e.', 'Okul solda, dükkân sağda, park ileride.', '[clearly] دبستان ل چەپێ یە، دکان ل راستێ یە، پارک ل پێشەه.', { s: { pose: 'show', expr: 'happy' } }),
    R('f02', 'Û *xwarin* li ku ye?', 'Peki yemek nerede?', '[curious] ئوو خوارن ل کو یە؟', { s: { pose: 'think', expr: 'happy' } }),
    HA('f03', 'Her tim *xwarin*!', 'Hep yemek!', '[laughs] هەر تم خوارن!'),
    R('f04', 'Dikan! Dikan li *rastê* ye!', 'Dükkân! Dükkân sağda!', '[excited] دکان! دکان ل راستێ یە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    { id: 'fw', wait: 1.4 },
    HA('f05', 'Aferîn! Vê carê *rast* e!', 'Aferin! Bu sefer doğru!', '[giggles] ئافەرین! ڤێ جارێ راستەه!', { gap: .1 }),

    // ---------- li ser / li bin ----------
    B('g01', 'Niha: *li ser*, *li bin*. Pisîk li ku ye?', 'Şimdi: üstünde, altında. Kedi nerede?', '[curious] نها: ل سەر، ل بن. پسیک ل کو یە؟', { s: { pose: 'think', expr: 'smug' } }),
    R('g02', 'Li *bin* masê?… Na.', 'Masanın altında mı?… Hayır.', '[searching] ل بن ماسێ؟… نا.', { s: { pose: 'down', expr: 'normal' } }),
    R('g03', 'Li *ser* masê?… Na.', 'Masanın üstünde mi?… Hayır.', '[searching] ل سەر ماسێ؟… نا.', { gap: .4, s: { pose: 'think', expr: 'normal' } }),
    HA('g04', 'Ronî! Pisîk li ser *serê te* ye!', 'Ronî! Kedi senin başının üstünde!', '[laughs] رۆنی! پسیک ل سەر سەرێ تە یە!'),
    { id: 'gw', wait: 1.4 },
    R('g05', 'Pisîk, *were xwarê*!', 'Kedi, aşağı in!', '[pleading] پسیک، وەرە خوارێ!', { gap: .1, s: { pose: 'up', expr: 'wide' } }),
    HA('g06', 'Hi hi! Pisîk ji te *hez* dike!', 'Hi hi! Kedi seni seviyor!', '[giggles] پسیک ژ تە هەز دکە!'),

    // ---------- jor / jêr ----------
    B('h01', 'Niha li *jor* binêre!', 'Şimdi yukarı bak!', '[energetic] نها ل ژۆر بنێرە!', { s: { pose: 'up', expr: 'happy' } }),
    { id: 'hw', wait: 1.2 },
    HA('h02', 'Na, ew *jêr* e! Jor li wir e!', 'Hayır, o aşağı! Yukarı orada!', '[laughs] نا، ئەو ژێرەه! ژۆر ل وێرێ یە!', { gap: .1 }),
    R('h03', 'Aaa, jor! Ez *ezmên* dibînim… çûk jî!', 'Haa, yukarı! Gökyüzünü görüyorum… kuş da!', '[amazed] ئا، ژۆر! ئەز ئەزمێن دبینم… چووک ژی!', { s: { pose: 'cheer', expr: 'wide', tilt: -20 } }),
    { id: 'hw2', wait: 1.4 },
    R('h04', 'Ay! *Pişta* min!', 'Ay! Sırtım!', '[hurt] ئای! پشتا من!', { gap: .1, s: { pose: 'up', expr: 'dizzy' } }),
    HA('h05', 'Hi hi! Ne ewqas *jor*!', 'Hi hi! O kadar yukarı değil!', '[giggles] نە ئەوقاس ژۆر!'),

    // ---------- saklambaç ----------
    B('k01', 'Were em bilîzin: ez xwe *vedişêrim*, tu min bibîne!', 'Hadi oynayalım: ben saklanırım, sen beni bul!', '[excited] وەرە ئەم بلیزن: ئەز خوە ڤەدشێرم، تو من ببینە!', { s: { pose: 'cheer', expr: 'happy' } }),
    R('k02', 'Yek, du, sê, çar, pênc… *ez hatim*!', 'Bir, iki, üç, dört, beş… geliyorum!', '[counting] یەک، دو، سێ، چار، پێنج… ئەز هاتم!', { s: { pose: 'face', expr: 'sleep' }, then: [{ f: .8, s: { pose: 'cheer', expr: 'happy' } }] }),
    R('k03', 'Berfîn li ku ye? Li *pişt* derî?… Na.', 'Berfîn nerede? Kapının arkasında mı?… Hayır.', '[searching] بەرفین ل کو یە؟ ل پشت دەری؟… نا.', { s: { pose: 'think', expr: 'normal' } }),
    R('k04', 'Li *bin* masê?… Erê! Ez te dibînim!', 'Masanın altında mı?… Evet! Seni görüyorum!', '[triumphant] ل بن ماسێ؟… ئەرێ! ئەز تە دبینم!', { s: { pose: 'point', expr: 'happy', look: -1 } }),
    HA('k05', 'Hi hi! *Çawa*?', 'Hi hi! Nasıl?', '[giggles] چاوا؟'),
    R('k06', 'Girêka te li *ser* masê xuya dike!', 'Fiyongun masanın üstünden görünüyor!', '[smug] گرێکا تە ل سەر ماسێ خویا دکە!', { s: { pose: 'hips', expr: 'smug' } }),

    // ---------- dûr / nêzîk ----------
    B('l01', 'Niha ez *dûr* im!', 'Şimdi ben uzaktayım!', '[calling] نها ئەز دوورم!', { s: { pose: 'wave', expr: 'happy' } }),
    R('l02', 'Çi? Ez te *nabihîzim*!', 'Ne? Seni duyamıyorum!', '[shouting] چ؟ ئەز تە نابهیزم!', { s: { pose: 'think', expr: 'smug' } }),
    B('l03', 'Were *nêzîk*!', 'Yakına gel!', '[shouting] وەرە نێزیک!', { s: { pose: 'up', expr: 'happy' } }),
    { id: 'lw', wait: 1.4 },
    HA('l04', 'Ne *ewqas* nêzîk, Ronî!', 'O kadar yakın değil Ronî!', '[laughing] نە ئەوقاس نێزیک، رۆنی!', { gap: .1 }),
    R('l05', 'Te got *nêzîk*!', 'Yakın dedin ama!', '[innocent] تە گۆت نێزیک!', { s: { pose: 'shrug', expr: 'smug' } }),

    // ---------- oyun ----------
    B('i01', 'Niha *lîstik*! Ez dibêjim, tu here.', 'Şimdi oyun! Ben söylerim, sen gidersin.', '[energetic] نها لیستک! ئەز دبێژم، تو هەرە.'),
    B('i02', '*Çep*!', 'Sol!', '[energetic] چەپ!', G),
    B('i03', '*Rast*!', 'Sağ!', '[energetic] راست!', { gap: .9 }),
    B('i04', '*Pêş*!', 'İleri!', '[energetic] پێش!', { gap: .9 }),
    B('i05', '*Paş*!', 'Geri!', '[energetic] پاش!', { gap: .9 }),
    B('i06', '*Raweste*!', 'Dur!', '[energetic] راوەستە!', { gap: .9 }),
    { id: 'iw', wait: 1.2 },
    HA('i07', 'Aferîn! *Sed ji sedî*!', 'Aferin! Yüzde yüz!', '[giggles] ئافەرین! سەد ژ سەدی!', { gap: .1, l: { pose: 'up', expr: 'happy' } }),

    // ---------- final ----------
    R('j01', 'Berfîn, mala te *li ku* ye?', 'Berfîn, senin evin nerede?', '[curious] بەرفین، مالا تە ل کو یە؟', { s: { pose: 'show', expr: 'happy' } }),
    B('j02', '*Rasterast* here, paşê *çepê*, paşê *rastê*.', 'Dümdüz git, sonra sola, sonra sağa.', '[clearly] راستەراست هەرە، پاشێ چەپێ، پاشێ راستێ.', { s: { pose: 'point', expr: 'happy' } }),
    R('j03', 'Rasterast… çep… rast…', 'Dümdüz… sol… sağ…', '[confused] راستەراست… چەپ… راست…', { s: { pose: 'think', expr: 'dizzy' } }),
    { id: 'jw', wait: 1.6 },
    HA('j04', 'Ez ê *bi te re* bêm!', 'Seninle gelirim!', '[laughs] ئەز ێ ب تە رە بێم!', { gap: .1 }),
    R('j05', 'Spas! Lê pêşî… *xwarin*!', 'Sağ ol! Ama önce… yemek!', '[happy] سپاس! لێ پێشی… خوارن!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
  ];

  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const arrow = (rot, col) => `<g transform="rotate(${rot})"><path d="M-40 -14h40v-20l40 34l-40 34v-20h-40z" fill="${col}" ${S0} stroke-width="5"/></g>`;
  const ART = {
    cep: arrow(180, '#2F7DE1'), rast: arrow(0, '#E53935'), pes: `<g transform="scale(1.3)"><circle r="28" fill="#2EAD4B" ${S0} stroke-width="5"/><path d="M-12 -6l12 -12l12 12M0 -18v32" fill="none" stroke="#fff" stroke-width="6"/></g>`,
    pas: `<g transform="scale(1.3)"><circle r="28" fill="#FF9F43" ${S0} stroke-width="5"/><path d="M-12 6l12 12l12 -12M0 18v-32" fill="none" stroke="#fff" stroke-width="6"/></g>`,
    stop: `<path d="M-20 -48h40l28 28v40l-28 28h-40l-28 -28v-40z" fill="#E53935" ${S0} stroke-width="5"/><text y="10" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">STOP</text>`,
    map: `<rect x="-50" y="-40" width="100" height="80" rx="6" fill="#E8F5E9" ${S0} stroke-width="5"/><path d="M-50 4h100M0 -40v80" stroke="#BDBDBD" stroke-width="10"/><rect x="-44" y="-34" width="30" height="24" fill="#FFE0B2" ${S0} stroke-width="3"/><rect x="14" y="-34" width="30" height="24" fill="#E53935" ${S0} stroke-width="3"/><circle cx="-26" cy="24" r="10" fill="#2EAD4B" ${S0} stroke-width="3"/>`,
    pisik: `<path d="M24 26q36 -2 30 -36" fill="none" ${S0} stroke-width="7"/><ellipse cy="18" rx="30" ry="22" fill="#FF9F43" ${S0} stroke-width="5"/><circle cy="-16" r="24" fill="#FF9F43" ${S0} stroke-width="5"/><path d="M-20 -30l-4 -24l16 12zM20 -30l4 -24l-16 12z" fill="#FF9F43" ${S0} stroke-width="5"/><circle cx="-9" cy="-18" r="4" fill="${INKC}"/><circle cx="9" cy="-18" r="4" fill="${INKC}"/><path d="M-4 -9h8l-4 5z" fill="#FF8FB0"/>`,
    food: `<ellipse cy="18" rx="50" ry="13" fill="#fff" ${S0} stroke-width="5"/><path d="M-34 14a34 28 0 0 1 68 0z" fill="#D9531E" ${S0} stroke-width="5"/><path d="M-10 -24q-8 -10 0 -20M10 -24q-8 -10 0 -20" fill="none" stroke="#999" stroke-width="5" stroke-linecap="round"/>`,
  };
  const CARD = [['a01', 'map', 'rê'], ['b01', 'cep', 'çep'], ['c01', 'rast', 'rast'], ['d01', 'pes', 'pêş'], ['d03', 'pas', 'paş'], ['e01', 'stop', 'raweste'], ['f01', 'map', 'nexşe'], ['g01', 'pisik', 'li ku?'], ['h01', 'pes', 'jor'], ['k01', null, '?'], ['l01', 'pas', 'dûr · nêzîk'],
    ['i02', 'cep', 'çep'], ['i03', 'rast', 'rast'], ['i04', 'pes', 'pêş'], ['i05', 'pas', 'paş'], ['i06', 'stop', 'raweste'], ['j02', 'map', 'mal']];
  const PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455;
  const curCard = (t, H) => { let c = null; for (const x of CARD) if (t >= H.T(x[0], 0)) c = x; return c; };

  // Ronî'nin konumu: [an, x, ölçek] anahtar kareleri (yürüme otomatik)
  function path(H) {
    const T = H.T, RX = H.RX;
    return [
      [0, RX, 1],
      [T('bw', .05), RX, 1], [T('bw', .6), 1010, 1],            // sola git → sağa gider
      [T('b02', .4), 1010, 1], [T('b03', 0), RX, 1],
      [T('cw', .05), RX, 1], [T('cw', .6), 960, 1],             // sağa doğru
      [T('cw2', .05), 960, 1], [T('cw2', .5), 1060, 1],         // "rast e" → daha sağa, kapıya çarpar
      [T('c04', .6), 1060, 1], [T('c05', 0), RX, 1],
      [T('dw', .05), RX, 1], [T('dw', .6), 640, 2.1],            // ileri: kameraya gelir
      [T('d02', .8), 640, 2.1], [T('d03', .2), RX, 1],
      [T('dw2', .05), RX, 1], [T('dw2', .5), RX, .62],           // geri: duvara
      [T('d05', .2), RX, .62], [T('d05', 1), RX, 1],
      [T('ew', .05), RX, 1], [T('ew', .9), 1350, 1],             // durmaz, ekrandan çıkar
      [T('ew2', .1), 1350, 1], [T('ew2', .9), RX, 1],
      [T('fw', .05), RX, 1], [T('fw', .6), 1000, 1], [T('f05', .9), 1000, 1], [T('i01', .2), RX, 1],
      [T('i02', .1), RX, 1], [T('i02', .7), 640, 1],             // oyun
      [T('i03', .1), 640, 1], [T('i03', .9), 980, 1],
      [T('i04', .1), 980, 1], [T('i04', .9), 800, 1.8],
      [T('i05', .1), 800, 1.8], [T('i05', .9), RX, .7],
      [T('i06', .1), RX, .7], [T('i06', .7), RX, 1],
    ];
  }
  function where(t, H) {
    const P = path(H);
    for (let i = 1; i < P.length; i++) if (t < P[i][0]) { const [a, x0, s0] = P[i - 1], [b, x1, s1] = P[i], u = H.eio(H.seg(t, a, b)); return { x: H.lerp(x0, x1, u), sc: H.lerp(s0, s1, u), moving: (x0 !== x1 || s0 !== s1) && u > 0 && u < 1, dir: Math.sign(x1 - x0) }; }
    const L = P[P.length - 1]; return { x: L[1], sc: L[2], moving: false, dir: 0 };
  }

  window.EP = {
    title: 'ÇEP Û RAST',
    tag: 'Kurdî A1 · Dersa 17',
    noClock: true,
    table: () => ({}),
    vocabScale: .84,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'b03', f: .5, who: 'R', icon: 'q', label: 'çep?' },
      { line: 'c04', f: .4, who: 'B', icon: 'ok', label: 'rast e = baş e' },
      { line: 'f02', f: .3, who: 'R', icon: 'food', label: 'xwarin?' },
      { line: 'j05', f: .5, who: 'R', icon: 'food', label: 'pêşî xwarin!' },
    ],
    icons: Object.fromEntries(Object.keys(ART).map(k => [k, () => ART[k]])),
    vocab: [
      ['rê', 'yol · yön'],
      ['çep', 'sol'],
      ['rast', 'sağ · doğru'],
      ['pêş', 'ön · ileri'],
      ['paş', 'arka · geri'],
      ['rasterast', 'dümdüz'],
      ['here', 'git'],
      ['raweste', 'dur'],
      ['vegere', 'geri dön'],
      ['li ser · li bin', 'üstünde · altında'],
      ['li ku ye?', 'nerede?'],
    ],
    vocabTts: {
      ku: ['رێ', 'چەپ', 'راست', 'پێش', 'پاش', 'راستەراست', 'هەرە', 'راوەستە', 'ڤەگەرە', 'ل سەر، ل بن', 'ل کو یە؟'],
      tr: ['yol, yön', 'sol', 'sağ, doğru', 'ön, ileri', 'arka, geri', 'dümdüz', 'git', 'dur', 'geri dön', 'üstünde, altında', 'nerede?'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const x of CARD) out.push({ type: 'pop', at: T(x[0], 0) });
      out.push({ type: 'cross', at: T('bw', .7) }, { type: 'ding', at: T('cw', .7) }, { type: 'bonk', at: T('cw2', .5) }, { type: 'boing', at: T('dw', .55) }, { type: 'bonk', at: T('dw2', .5) });
      out.push({ type: 'whoosh', at: T('ew', .4) }, { type: 'whoosh', at: T('ew2', .4) }, { type: 'ding', at: T('fw', .6) });
      for (const id of ['i02', 'i03', 'i04', 'i05', 'i06']) out.push({ type: 'ding', at: T(id, .9) });
      out.push({ type: 'boing', at: T('lw', .7) });
      out.push({ type: 'thud', at: T('hw2', .7) }, { type: 'pop', at: T('k04', .4) });
      out.push({ type: 'thud', at: T('jw', .7) }, { type: 'boing', at: T('g06', .7) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B, w = where(t, H);
      Rr.x = w.x; Rr.sc = w.sc;
      if (w.moving) { Rr.walk = t * 3.4; if (w.dir) Rr.look = w.dir; }
      if (Rr.x > 1240) Rr.show = false;
      // yanlış eli kaldırır
      if (t > T('bw2', .1) && t < T('b05', 1)) { Rr.la = [150, 176]; Rr.expr = 'smug'; }
      // kapıya / duvara çarpınca
      if (t > T('cw2', .5) && t < T('c05', 0)) { Rr.expr = 'dizzy'; Rr.rot = Math.sin(t * 3) * 4; }
      if (t > T('dw2', .5) && t < T('d05', 1)) { Rr.expr = 'dizzy'; }
      // ileri gelince kocaman yüz
      if (t > T('dw', .5) && t < T('d02', 1)) { Rr.expr = 'happy'; Rr.mouth = Rr.mouth || .2; Bb.expr = 'wide'; }
      // oyunda donar
      if (t > T('i06', .5) && t < T('i07', .5)) { Rr.la = [140, 172]; Rr.ra = [60, 20]; Rr.legUp = .6; Rr.expr = 'wide'; }
      // finalde başı döner, düşer
      const j0 = T('j03', .2), j1 = T('jw', .5), j2 = T('j04', .8), j3 = T('j05', 0);
      if (t > j0 && t < j3) { if (t < j1) { Rr.look = Math.sin(t * 10) > 0 ? 1 : -1; Rr.rot = Math.sin(t * 8) * 10; Rr.expr = 'dizzy'; } else { const u = t < j2 ? H.eio(H.seg(t, j1, j1 + .3)) : 1 - H.eio(H.seg(t, j2, j3)); Rr.rot = 85 * u; Rr.dx = -220 * u; Rr.expr = 'dizzy'; } }
      // jor/jêr: önce aşağı bakar, sonra fazla yukarı bakıp sırtüstü düşer
      if (t > T('hw', 0) && t < T('h02', .5)) { Rr.tilt = 30; Rr.la = [20, 6]; Rr.ra = [20, 6]; Rr.expr = 'normal'; }
      const q0 = T('hw2', 0), q1 = T('hw2', .7), q2 = T('h05', .5), q3 = T('h05', 1);
      if (t > T('h03', 0) && t < q0) Rr.tilt = -25;
      if (t > q0 && t < q3) { const u = t < q1 ? H.eio(H.seg(t, q0, q1)) : t < q2 ? 1 : 1 - H.eio(H.seg(t, q2, q3)); Rr.tilt = -25; Rr.rot = 85 * u; Rr.dx = -220 * u; if (u > .5) Rr.expr = 'dizzy'; }
      // saklambaç: Berfîn masanın altına saklanır
      const s0 = T('k02', .1), s1 = T('k02', .5), s2 = T('k05', .2), s3 = T('k06', 1);
      if (t > s0 && t < s3) { const u = t < s1 ? H.eio(H.seg(t, s0, s1)) : t < s2 ? 1 : 1 - H.eio(H.seg(t, s2, s3)); Bb.x = H.lerp(H.BX, 250, u); Bb.sc = H.lerp(1, .45, Math.min(1, u * 1.3)); if (u > 0 && u < 1 && t < s1) Bb.walk = t * 3.4; Bb.look = 1; }
      if (t > T('k03', 0) && t < T('k04', 0)) { Rr.x = H.lerp(H.RX, 980, H.eio(H.seg(t, T('k03', 0), T('k03', .5)))); Rr.look = 1; }
      if (t > T('k04', 0) && t < T('k06', 1)) { Rr.x = H.lerp(980, 560, H.eio(H.seg(t, T('k04', 0), T('k04', .4)))); Rr.look = -1; }
      // dûr/nêzîk: Berfîn uzaklaşır, Ronî burnuna kadar gelir
      const n0 = T('l01', 0), n1 = T('l01', .7), n2 = T('l05', 1), n3 = T('l05', 1) + .6;
      if (t > n0 && t < n3) { const u = t < n1 ? H.eio(H.seg(t, n0, n1)) : t < n2 ? 1 : 1 - H.eio(H.seg(t, n2, n3)); Bb.x = H.lerp(H.BX, 985, u); if (u > 0 && u < 1) Bb.walk = t * 3.4; Bb.look = t < n1 ? 1 : -1; }
      const m0 = T('lw', 0), m1 = T('lw', .7);
      if (t > n0 && t < n3) { const v = t < m0 ? 0 : t < m1 ? H.eio(H.seg(t, m0, m1)) : t < n2 ? 1 : 1 - H.eio(H.seg(t, n2, n3)); Rr.x = H.lerp(H.RX, 890, v) - (t < m0 ? 300 * H.eio(H.seg(t, n0, n1)) : 300 * (1 - v)); if (t > m0 && t < m1) { Rr.walk = t * 4; } Rr.look = 1; if (v >= 1 && t < n2) { Rr.expr = 'happy'; Rr.tilt = 12; } }
      // kediyi arar
      if (t > T('g02', 0) && t < T('g03', 0)) { Rr.x = H.lerp(H.RX, 430, H.eio(H.seg(t, T('g02', 0), T('g02', .4)))); Rr.rot = -20 * H.seg(t, T('g02', .3), T('g02', .6)); Rr.look = -1; }
      if (t > T('g03', 0) && t < T('g04', 0)) { Rr.x = 430; Rr.look = -1; Rr.dy = -20; }
      if (t > T('g04', 0) && t < T('g06', 1)) { Rr.x = H.lerp(430, H.RX, H.eio(H.seg(t, T('g04', 0), T('g04', .5)))); }
      if (t > T('gw', 0) && t < T('g05', 1)) { Rr.tilt = -14; Rr.expr = 'wide'; }
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
      if (!(t > T('k02', .1) && t < T('k06', 1)) && !(t > T('l01', 0) && t < T('l05', 1) + .6)) Bb.look = Rr.x < H.BX ? -1 : 1;
    },
    back(t, P, H) {
      const S = H.S, T = H.T, c = curCard(t, H);
      let s = `<g transform="translate(${PX} ${PY})"><path d="M-70 120l20 -40M70 120l-20 -40" ${S} stroke-width="8"/><rect x="-120" y="-130" width="240" height="220" rx="16" fill="#2E5E4E" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="188" rx="8" fill="#fff"/>`;
      if (c) { const a = T(c[0], 0), p = H.back(H.seg(t, a, a + .35)); s += c[1] ? `<g transform="translate(0 -26) scale(${1.5 * p})">${ART[c[1]]}</g>` : `<text y="10" text-anchor="middle" font-size="110" font-weight="800" fill="#E53935" transform="scale(${p})">?</text>`; s += `<text y="62" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">${c[2]}</text>`; }
      s += `</g>`;
      // yerde ok işaretleri: çep (sol) / rast (sağ)
      const ok = (x, k, txt, a, b) => { if (t < a || t > b) return ''; const p = H.back(H.seg(t, a, a + .3)); return `<g transform="translate(${x} ${H.FLOOR + 70}) scale(${p})">${ART[k]}<text y="72" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">${txt}</text></g>`; };
      s += ok(200, 'cep', 'çep', T('b01', 0), T('c01', 0)) + ok(1000, 'rast', 'rast', T('b02', 0), T('d01', 0));
      return s;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      const stars = (x, y) => { let o = ''; for (let k = 0; k < 3; k++) { const b = t * 4 + k * 2.1, xx = x + Math.cos(b) * 70, yy = y + Math.sin(b) * 16, r = 13; o += `<path d="M${xx} ${yy - r}L${xx + r * .3} ${yy - r * .3}L${xx + r} ${yy}L${xx + r * .3} ${yy + r * .3}L${xx} ${yy + r}L${xx - r * .3} ${yy + r * .3}L${xx - r} ${yy}L${xx - r * .3} ${yy - r * .3}Z" fill="#FFD23F" ${H.S} stroke-width="3"/>`; } return o; };
      if (t > T('cw2', .5) && t < T('c05', 0)) s += stars(Rr.x, H.FLOOR - 470);
      if (t > T('dw2', .5) && t < T('d05', .6)) s += stars(Rr.x, H.FLOOR - 300) + `<text x="${Rr.x + 60}" y="${H.FLOOR - 330}" font-size="40" font-weight="800" fill="#E53935">BONK!</text>`;
      if (t > T('j04', 0) && t < T('j05', 0)) s += stars(H.RX - 120, H.FLOOR - 60);
      // kafadaki kedi (g01'den g06 sonuna)
      const k0 = T('g01', 0), k1 = T('g06', .7);
      if (t > k0 && t < T('g06', 1) + 1.2 && Rr.show !== false) {
        const cx = Rr.x + (Rr.dx || 0), cy = H.FLOOR - 10 + (Rr.dy || 0) - 470;
        if (t < k1) s += `<g transform="rotate(${Rr.rot || 0} ${cx} ${H.FLOOR - 10 + (Rr.dy || 0)}) translate(${cx} ${cy}) scale(.9)">${ART.pisik}</g>`;
        else { const u = H.eio(H.seg(t, k1, k1 + .6)); s += `<g transform="translate(${H.lerp(cx, cx + 300, u)} ${H.lerp(cy, H.FLOOR - 30, u) - Math.sin(u * Math.PI) * 120}) scale(.9)">${ART.pisik}</g>`; }
        if (t > T('gw', 0) && t < T('gw', 1)) s += `<text x="${cx + 60}" y="${cy - 40}" font-size="40" font-weight="800" fill="#FF9F43">miyaw!</text>`;
      }
      // gökyüzü bakışında uçan kuş
      if (t > T('h03', .3) && t < T('hw2', .6)) { const u = H.seg(t, T('h03', .3), T('hw2', .6)), x = H.lerp(1150, 200, u), y = 380 + Math.sin(u * 10) * 20; s += `<path d="M${x - 30} ${y}q15 -18 30 0q15 -18 30 0" fill="none" stroke="${INKC}" stroke-width="6" stroke-linecap="round"/>`; }
      if (t > T('hw2', .7) && t < T('h05', .6)) s += stars(H.RX - 140, H.FLOOR - 60);
      // saklambaçta masa önde: Berfîn'in fiyonku görünür
      if (t > T('k02', .45) && t < T('k05', .25)) { s += `<path d="M48 985h394l-8 ${H.FLOOR - 995}h-378z" fill="#E53935" ${H.S} stroke-width="7"/>`; for (let x = 70; x < 430; x += 60) s += `<path d="M${x} 1000v${H.FLOOR - 1020}" stroke="#fff" stroke-width="12" opacity=".5"/>`; s += `<g transform="translate(250 ${960 + Math.sin(t * 3) * 3}) rotate(-8)"><path d="M0 0L-30 -18L-30 18ZM0 0L30 -18L30 18Z" fill="#E0407B" ${H.S} stroke-width="5"/><circle r="8" fill="#E0407B" ${H.S} stroke-width="5"/></g>`; s += `<rect x="40" y="975" width="410" height="26" rx="8" fill="#C98B4E" ${H.S} stroke-width="7"/>`; }
      // dışarıdan ses
      if (t > T('e03', 0) && t < T('e03', 1) + .4) s += `<text x="1000" y="${H.FLOOR - 400}" text-anchor="middle" font-size="44" font-weight="800" fill="#2F7DE1">…çi?!</text>`;
      // donma: buz gibi çizgi
      if (t > T('i06', .5) && t < T('i07', .5)) s += `<text x="${Rr.x + 60}" y="${H.FLOOR - 470}" font-size="42" font-weight="800" fill="#2F7DE1">❚❚</text>`;
      return s;
    },
  };
})();
