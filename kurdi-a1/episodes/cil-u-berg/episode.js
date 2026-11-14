// "Cil û berg" — Ders 12 pratiği (kıyafetler): Berfîn anlatır, Ronî komik hatalar yapar, Berfîn gülüp düzeltir.
// Sesler: Kürtçe metin sese ARAP HARFLİ Kürtçe yazımla verilir (tts alanı); her sahne + konuşmacı tek uzun kayıt
// ([long pause] ile ayrılmış), sonra sessizliklerden bölünür → audio/<id>.mp3
// "Û ev?" (i03) klibi i05, i09, i11 için de kopyalanır.
(function () {
  const INKC = '#1f1b16';
  const TEACH = { pose: 'show', expr: 'happy' }, OK = { pose: 'cheer', expr: 'happy', hop: 24 }, LAUGH = { pose: 'face', expr: 'happy' };
  const B = (id, ku, tr, tts, o = {}) => ({ id, who: 'B', ku, tr, tts, gap: .5, s: TEACH, ...o });
  const R = (id, ku, tr, tts, o = {}) => ({ id, who: 'R', ku, tr, tts, gap: .5, s: { pose: 'point', expr: 'happy' }, ...o });
  const HA = (id, ku, tr, tts, o = {}) => B(id, ku, tr, tts, { laugh: true, s: LAUGH, then: [{ f: .35, s: { pose: 'point', expr: 'happy' } }], l: { pose: 'idle', expr: 'wide' }, ...o });

  const SEQ = [
    // ---------- giriş ----------
    B('a01', 'Ronî, îro dersa me *cil û berg* e!', 'Ronî, bugünkü dersimiz kıyafetler!', '[cheerful] رۆنی، ئیرۆ دەرسا مە جل و بەرگە!', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Cil û berg? *Hêsan* e! Ez her roj cilan li xwe dikim!', 'Kıyafetler mi? Kolay! Ben her gün giyiniyorum!', '[confident] جل و بەرگ؟ هێسانە! ئەز هەر رۆژ جلان ل خوە دکم!', { s: { pose: 'hips', expr: 'smug' } }),
    B('a03', 'Baş e. Em *dest pê bikin*!', 'Tamam. Başlayalım!', '[warmly] باشە. ئەم دەست پێ بکن!'),

    // ---------- kum ----------
    B('b01', 'Ev *kum* e. Dubare bike: kum.', 'Bu şapka. Tekrar et: kum.', '[clearly] ئەڤ کومە. دوبارە بکە: کوم.'),
    R('b02', '*Kum*! Ev kumê min e!', 'Şapka! Bu benim şapkam!', '[happy] کوم! ئەڤ کومێ منە!', { s: OK }),
    B('b03', 'Kum *çi reng* e?', 'Şapka ne renk?', '[curious] کوم چ رەنگە؟', { s: { pose: 'think', expr: 'happy' } }),
    R('b04', '*Sor* e!', 'Kırmızı!', '[confident] سۆرە!', { s: OK }),
    B('b05', 'Aferîn! Niha kum *li xwe bike*.', 'Aferin! Şimdi şapkayı giy.', '[happy] ئافەرین! نها کوم ل خوە بکە.'),
    { id: 'bw', wait: 2.2 },
    HA('b06', 'Na, Ronî! Kum li ser *serî* ye, ne li ling!', 'Hayır Ronî! Şapka başa takılır, ayağa değil!', '[giggles] نا، رۆنی! کوم ل سەر سەرییە، نە ل لنگ!', { gap: .1 }),
    R('b07', 'Lê lingê min *sar* e!', 'Ama ayağım üşüyor!', '[whining] لێ لنگێ من سارە!', { s: { pose: 'shrug', expr: 'sad' } }),
    B('b08', 'Ji bo lingan *gore* hene!', 'Ayaklar için çorap var!', '[amused] ژ بۆ لنگان گۆرە هەنە!'),

    // ---------- gore ----------
    B('c01', 'Ev *gore* ne. Dubare bike: gore.', 'Bunlar çorap. Tekrar et: gore.', '[clearly] ئەڤ گۆرە نە. دوبارە بکە: گۆرە.'),
    R('c02', '*Gur*?! Gur li ku ye?!', 'Kurt mu?! Kurt nerede?!', '[panicked] گور؟! گور ل کو یە؟!', { s: { pose: 'up', expr: 'wide', shake: 1, sweat: true } }),
    HA('c03', 'Na, na! Ne *gur* — *gore*!', 'Hayır, hayır! Kurt değil — çorap!', '[laughs] نا، نا! نە گور — گۆرە!'),
    R('c04', 'Aaa… gore! Ez *tirsiyam*!', 'Haa… çorap! Korktum!', '[relieved] ئا… گۆرە! ئەز ترسیام!', { s: { pose: 'face', expr: 'sad', sweat: true } }),
    B('c05', 'Gore *çend* in?', 'Çoraplar kaç tane?', '[curious] گۆرە چەندن؟', { s: { pose: 'think', expr: 'happy' } }),
    R('c06', 'Yek, du! *Du* gore!', 'Bir, iki! İki çorap!', '[happy] یەک، دو! دو گۆرە!', { s: OK }),
    B('c07', 'Pir baş! Niha wan *li xwe bike*.', 'Çok iyi! Şimdi onları giy.', '[happy] پر باش! نها وان ل خوە بکە.'),
    { id: 'cw', wait: 2.2 },
    R('c08', 'Binêre! Destên min *germ* in!', 'Bak! Ellerim sıcacık!', '[proud] بنێرە! دەستێن من گەرمن!', { gap: .1, s: { pose: 'up', expr: 'happy' } }),
    HA('c09', 'Ronî! Gore ji bo *lingan* in! Ji bo destan *lepik* hene!', 'Ronî! Çorap ayaklar için! Eller için eldiven var!', '[giggles] رۆنی! گۆرە ژ بۆ لنگانن! ژ بۆ دەستان لەپک هەنە!'),
    R('c10', 'Lepik… gore… ez *tevlihev* bûm!', 'Eldiven… çorap… kafam karıştı!', '[confused] لەپک… گۆرە… ئەز تەڤلهەڤ بووم!', { s: { pose: 'face', expr: 'dizzy' } }),

    // ---------- pêlav ----------
    B('d01', 'Ev *pêlav* in. Dubare bike: pêlav.', 'Bunlar ayakkabı. Tekrar et: pêlav.', '[clearly] ئەڤ پێلاڤن. دوبارە بکە: پێلاڤ.'),
    R('d02', '*Pîlav*?! Ez pir *birçî* me!', 'Pilav mı?! Çok açım!', '[excited] پیلاڤ؟! ئەز پر برچی مە!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    HA('d03', 'Na! Ne pîlav — *pêlav*!', 'Hayır! Pilav değil — ayakkabı!', '[laughs] نا! نە پیلاڤ — پێلاڤ!'),
    R('d04', 'Pêlav *nayên xwarin*?', 'Ayakkabı yenmez mi?', '[disappointed] پێلاڤ نایێن خوارن؟', { s: { pose: 'think', expr: 'sad' } }),
    B('d05', 'Na! Pêlav ji bo *lingan* in!', 'Hayır! Ayakkabı ayaklar için!', '[amused] نا! پێلاڤ ژ بۆ لنگانن!', { s: { pose: 'hips', expr: 'happy' } }),
    R('d06', '*Heyf*… Ez hîn jî birçî me.', 'Yazık… Ben hâlâ açım.', '[sad] هەیف… ئەز هین ژی برچی مە.', { s: { pose: 'down', expr: 'sad' } }),

    // ---------- kiras + pantol ----------
    B('e01', 'Ev *kiras* e. Dubare bike: kiras.', 'Bu gömlek. Tekrar et: kiras.', '[clearly] ئەڤ کراسە. دوبارە بکە: کراس.'),
    R('e02', '*Kiras*! Kiras *şîn* e!', 'Gömlek! Gömlek mavi!', '[happy] کراس! کراس شینە!', { s: OK }),
    B('e03', 'Aferîn, Ronî! Pir baş!', 'Aferin Ronî! Çok iyi!', '[proud] ئافەرین، رۆنی! پر باش!', { s: { pose: 'cheer', expr: 'happy', hop: 20 } }),
    R('e04', 'Ez pir *jîr* im! Binêre!', 'Ben çok zekiyim! Bak!', '[proud] ئەز پر ژیرم! بنێرە!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'ew', wait: 2.4 },
    HA('e05', 'Ronî! Ew kiras e, ne *pantol* e!', 'Ronî! O gömlek, pantolon değil!', '[laughing] رۆنی! ئەو کراسە، نە پانتۆلە!', { gap: .1 }),
    R('e06', 'Pantol? Pantol *çi* ye?', 'Pantolon mu? Pantolon ne?', '[confused] پانتۆل؟ پانتۆل چ یە؟', { s: { pose: 'shrug', expr: 'wide' } }),
    B('e07', 'Ev *pantol* e. Pantol ji bo lingan e, kiras ji bo *laş* e.', 'Bu pantolon. Pantolon bacaklar için, gömlek gövde için.', '[patiently] ئەڤ پانتۆلە. پانتۆل ژ بۆ لنگانە، کراس ژ بۆ لاشە.'),
    R('e08', 'Aaa! Niha ez *fêm dikim*!', 'Haa! Şimdi anlıyorum!', '[realizing] ئا! نها ئەز فێم دکم!', { s: OK }),

    // ---------- berçavk ----------
    B('f01', 'Ev *berçavk* e. Dubare bike: berçavk.', 'Bu gözlük. Tekrar et: berçavk.', '[clearly] ئەڤ بەرچاڤکە. دوبارە بکە: بەرچاڤک.'),
    R('f02', '*Berçavk*! Ez berçavkê li xwe dikim!', 'Gözlük! Gözlüğü takıyorum!', '[happy] بەرچاڤک! ئەز بەرچاڤکێ ل خوە دکم!', { s: OK }),
    { id: 'fw', wait: 2 },
    R('f03', 'Berfîn! Ez tiştekî *nabînim*!', 'Berfîn! Hiçbir şey göremiyorum!', '[worried] بەرفین! ئەز تشتەکی نابینم!', { gap: .1, s: { pose: 'up', expr: 'sleep', shake: 1 } }),
    HA('f04', 'Ji ber ku berçavk li *pişt* serê te ye!', 'Çünkü gözlük başının arkasında!', '[giggles] ژ بەر کو بەرچاڤک ل پشت سەرێ تەیە!'),
    R('f05', 'Û *niha*?', 'Ya şimdi?', '[curious] ئوو نها؟', { s: { pose: 'think', expr: 'normal' } }),
    B('f06', 'Niha baş e! Tu pir *bedew* î!', 'Şimdi oldu! Çok yakışıklısın!', '[warmly] نها باشە! تو پر بەدەوی!', { s: { pose: 'cheer', expr: 'happy', hop: 20 }, l: { pose: 'hips', expr: 'smug' } }),

    // ---------- qapût ----------
    B('g01', 'Derve pir *sar* e. *Qapûtê* xwe li xwe bike!', 'Dışarısı çok soğuk. Montunu giy!', '[caring] دەرڤە پر سارە. قاپووتێ خوە ل خوە بکە!'),
    R('g02', '*Kartol*?! Erê! Ez kartolan dixwazim!', 'Patates mi?! Evet! Patates istiyorum!', '[excited] کارتۆل؟! ئەرێ! ئەز کارتۆلان دخوازم!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    HA('g03', 'Ronî! Tu *her tim* birçî yî! Ne kartol — *qapût*!', 'Ronî! Sen hep açsın! Patates değil — mont!', '[laughs] رۆنی! تو هەر تم برچی یی! نە کارتۆل — قاپووت!'),
    R('g04', 'Baş e, baş e… *qapût*.', 'Tamam, tamam… mont.', '[reluctant] باشە، باشە… قاپووت.', { s: { pose: 'down', expr: 'sad' } }),

    // ---------- dubare ----------
    B('i01', 'Niha em *dubare* bikin! Ev çi ye?', 'Şimdi tekrar edelim! Bu ne?', '[energetic] نها ئەم دوبارە بکن! ئەڤ چ یە؟'),
    R('i02', '*Kum* e!', 'Şapka!', '[confident] کومە!', { gap: .35, s: OK }),
    B('i03', 'Û ev?', 'Ya bu?', '[curious] ئوو ئەڤ؟', { gap: .35 }),
    R('i04', '*Gore* ne!', 'Çorap!', '[confident] گۆرە نە!', { gap: .35, s: OK }),
    B('i05', 'Û ev?', 'Ya bu?', '', { gap: .35 }),
    R('i06', '*Pêlav* in… ne pîlav!', 'Ayakkabı… pilav değil!', '[careful] پێلاڤن… نە پیلاڤ!', { gap: .35, s: { pose: 'think', expr: 'normal' } }),
    HA('i07', 'Aferîn! Û ev?', 'Aferin! Ya bu?', '[laughs] ئافەرین! ئوو ئەڤ؟', { gap: .35 }),
    R('i08', '*Kiras* e!', 'Gömlek!', '[confident] کراسە!', { gap: .35, s: OK }),
    B('i09', 'Û ev?', 'Ya bu?', '', { gap: .35 }),
    R('i10', '*Pantol* e!', 'Pantolon!', '[confident] پانتۆلە!', { gap: .35, s: OK }),
    B('i11', 'Û ev?', 'Ya bu?', '', { gap: .35 }),
    R('i12', '*Berçavk* e!', 'Gözlük!', '[confident] بەرچاڤکە!', { gap: .35, s: OK }),
    B('i13', 'Û ya *dawî*?', 'Ya sonuncusu?', '[suspenseful] ئوو یا داوی؟', { gap: .35 }),
    R('i14', 'Kartol!… Na, na! *Qapût* e!', 'Patates!… Yok, yok! Mont!', '[excited] کارتۆل!… [nervous] نا، نا! قاپووتە!', { s: { pose: 'cheer', expr: 'happy' }, then: [{ f: .4, s: { pose: 'up', expr: 'wide' } }] }),
    HA('i15', 'Aferîn! *Sed ji sedî*!', 'Aferin! Yüzde yüz!', '[giggles] ئافەرین! سەد ژ سەدی!', { l: { pose: 'cheer', expr: 'happy' } }),

    // ---------- ezmûn ----------
    B('h01', 'Niha *ezmûn*! Hemû cilan li xwe bike!', 'Şimdi sınav! Bütün kıyafetleri giy!', '[energetic] نها ئەزموون! هەموو جلان ل خوە بکە!', { s: { pose: 'point', expr: 'happy' } }),
    R('h02', 'Hêsan e! Li min *binêre*!', 'Kolay! Bana bak!', '[confident] هێسانە! ل من بنێرە!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'hw', wait: 3.4 },
    R('h03', 'Ez *amade* me!', 'Hazırım!', '[proud] ئەز ئامادە مە!', { gap: .1, s: { pose: 'up', expr: 'happy' } }),
    HA('h04', 'Ay Xwedê! Kum *li ku* ye?', 'Aman Allah\'ım! Şapka nerede?', '[laughing] ئای خوەدێ! کوم ل کو یە؟', { l: { pose: 'hips', expr: 'smug' } }),
    R('h05', 'Li *lingê* min e!', 'Ayağımda!', '[proud] ل لنگێ منە!', { s: { pose: 'down', expr: 'happy' } }),
    B('h06', 'Û gore li ku ne?', 'Ya çoraplar nerede?', '[giggling] ئوو گۆرە ل کو نە؟', { s: LAUGH }),
    R('h07', 'Li *destên* min in!', 'Ellerimde!', '[proud] ل دەستێن منن!', { s: { pose: 'up', expr: 'happy' } }),
    B('h08', 'Û pêlav li ku ne?!', 'Ya ayakkabılar nerede?!', '[giggling] ئوو پێلاڤ ل کو نە؟!', { s: LAUGH }),
    R('h09', 'Li ser *serê* min in!', 'Başımın üstünde!', '[proud] ل سەر سەرێ منن!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('h10', 'Ronî, ev hemû *şaş* e! Lê tu pir *şîrîn* î!', 'Ronî, bunların hepsi yanlış! Ama çok tatlısın!', '[laughs] رۆنی، ئەڤ هەموو شاشە! لێ تو پر شیرینی!', { l: { pose: 'hips', expr: 'smug' } }),
    R('h11', 'Spas! Niha… *pîlav* heye?', 'Sağ ol! Şimdi… pilav var mı?', '[hopeful] سپاس! نها… پیلاڤ هەیە؟', { s: { pose: 'think', expr: 'happy' } }),
    B('h12', 'Erê, *were*! Pîlav heye!', 'Evet, gel! Pilav var!', '[giggles] ئەرێ، وەرە! پیلاڤ هەیە!', { s: { pose: 'wave', expr: 'happy' } }),
    R('h13', '*Bijî* pîlav!', 'Yaşasın pilav!', '[shouting] بژی پیلاڤ!', { s: { pose: 'cheer', expr: 'happy', hop: 44 }, l: { pose: 'cheer', expr: 'happy', hop: 30 } }),
  ];

  // ---------- kıyafet çizimleri (merkez 0,0) ----------
  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const ART = {
    kum: `<path d="M-40 16a40 44 0 0 1 80 0z" fill="#E53935" ${S0} stroke-width="6"/><rect x="-46" y="10" width="92" height="20" rx="10" fill="#fff" ${S0} stroke-width="6"/><circle cy="-32" r="11" fill="#fff" ${S0} stroke-width="5"/>`,
    gore: `<path d="M-16 -40h30v44q0 10 10 12l14 4q12 6 4 18h-52q-8 -2 -6 -14z" fill="#2EAD4B" ${S0} stroke-width="6"/><path d="M-16 -26h30M-16 -12h30" stroke="#fff" stroke-width="6"/>`,
    pelav: `<path d="M-44 20v-34q16 2 24 -10l26 20q30 2 36 24z" fill="#FF9F43" ${S0} stroke-width="6"/><path d="M-46 20h90" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M-46 24h90" ${S0} stroke-width="5"/><path d="M-12 -14l10 8M-2 -8l10 8" stroke="#fff" stroke-width="4"/>`,
    kiras: `<path d="M-22 -40q22 14 44 0l30 18l-14 24l-14 -8v46h-48v-46l-14 8l-14 -24z" fill="#2F7DE1" ${S0} stroke-width="6"/><path d="M0 -30v68" stroke="#fff" stroke-width="3" stroke-dasharray="4 8"/>`,
    pantol: `<path d="M-30 -42h60l6 84h-28l-8 -54l-8 54h-28z" fill="#8E44AD" ${S0} stroke-width="6"/><path d="M-30 -30h60" stroke="#fff" stroke-width="4"/>`,
    bercavk: `<circle cx="-22" r="18" fill="#EAF6FF" ${S0} stroke-width="6"/><circle cx="22" r="18" fill="#EAF6FF" ${S0} stroke-width="6"/><path d="M-4 0h8M-40 -4l-12 -8M40 -4l12 -8" ${S0} stroke-width="5"/>`,
    qaput: `<path d="M-24 -44q24 12 48 0l32 22l-12 46l-16 -6v30h-56v-30l-16 6l-12 -46z" fill="#8D6E63" ${S0} stroke-width="6"/><path d="M0 -34v82" ${S0} stroke-width="4"/><circle cx="10" cy="-8" r="4" fill="#FFD23F"/><circle cx="10" cy="14" r="4" fill="#FFD23F"/>`,
    lepik: `<path d="M-22 34v-40q0 -30 22 -30t22 30v40z" fill="#E0407B" ${S0} stroke-width="6"/><path d="M22 -2q18 -14 22 2q2 12 -22 18" fill="#E0407B" ${S0} stroke-width="6"/><path d="M-22 22h44" stroke="#fff" stroke-width="6"/>`,
    pilav: `<ellipse cy="22" rx="50" ry="12" fill="#fff" ${S0} stroke-width="5"/><path d="M-36 18a36 34 0 0 1 72 0z" fill="#FFF6E0" ${S0} stroke-width="5"/><path d="M-14 0l6 4M4 -10l6 4M14 6l6 4M-6 10l6 4" ${S0} stroke-width="3"/><path d="M-8 -30q-8 -10 0 -18M10 -30q-8 -10 0 -18" fill="none" stroke="#999" stroke-width="5" stroke-linecap="round"/>`,
    kartol: `<path d="M-40 6q-6 -30 26 -34q40 -4 44 26q2 28 -34 30q-32 2 -36 -22z" fill="#D9A85B" ${S0} stroke-width="6"/><circle cx="-10" cy="-6" r="3" fill="${INKC}"/><circle cx="14" cy="8" r="3" fill="${INKC}"/><circle cx="-18" cy="12" r="3" fill="${INKC}"/>`,
    gur: `<path d="M-36 -40l12 26h48l12 -26l8 44q-6 34 -44 38q-38 -4 -44 -38z" fill="#90A4AE" ${S0} stroke-width="6"/><path d="M-22 -4l14 8M22 -4l-14 8" ${S0} stroke-width="5"/><path d="M-8 24h16l-8 8z" fill="${INKC}"/><path d="M-16 38l6 -8l6 8l4 -8l4 8l6 -8l6 8" fill="#fff" ${S0} stroke-width="3"/>`,
  };
  const art = (k, x, y, sc = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">${ART[k]}</g>`;

  // Ronî'nin üstündekiler: [parça, yer, başlangıç, bitiş]
  const WEAR = [
    ['kum', 'foot', ['bw', .55], ['c01', 0]],
    ['gore', 'hands', ['cw', .55], ['d01', 0]],
    ['kiras', 'legs', ['ew', .55], ['f01', 0]],
    ['bercavk', 'back', ['fw', .55], ['f05', .5]],
    ['bercavk', 'face', ['f05', .5], ['g01', 0]],
    ['qaput', 'body', ['g04', .6], ['i01', 0]],
    ['kum', 'foot', ['hw', .15], null], ['gore', 'hands', ['hw', .32], null], ['pelav', 'head', ['hw', .5], null], ['bercavk', 'back', ['hw', .68], null], ['kiras', 'legs', ['hw', .85], null],
  ];
  const REVIEW = [['i01', 'kum'], ['i03', 'gore'], ['i05', 'pelav'], ['i07', 'kiras'], ['i09', 'pantol'], ['i11', 'bercavk'], ['i13', 'qaput']];
  const ic = k => () => `<g transform="scale(.95)">${ART[k]}</g>`;

  window.EP = {
    title: 'CIL Û BERG',
    tag: 'Kurdî A1 · Dersa 12',
    noClock: true,
    table: () => ({}),
    vocabScale: .74,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'b01', f: .1, who: 'B', icon: 'kum', label: 'kum' },
      { line: 'b04', f: 0, who: 'R', icon: 'sw:#E53935', label: 'sor' },
      { line: 'b08', f: .3, who: 'B', icon: 'gore', label: 'gore' },
      { line: 'c01', f: .1, who: 'B', icon: 'gore', label: 'gore' },
      { line: 'c02', f: 0, who: 'R', icon: 'gur', label: 'gur?!' },
      { line: 'c03', f: .4, who: 'B', icon: 'gur+no', label: 'ne gur' },
      { line: 'c06', f: .3, who: 'R', icon: 'txt:2', label: 'du gore' },
      { line: 'c09', f: .55, who: 'B', icon: 'lepik', label: 'lepik' },
      { line: 'd01', f: .1, who: 'B', icon: 'pelav', label: 'pêlav' },
      { line: 'd02', f: 0, who: 'R', icon: 'pilav', label: 'pîlav?!' },
      { line: 'd03', f: .4, who: 'B', icon: 'pilav+no', label: 'ne pîlav' },
      { line: 'd06', f: .4, who: 'R', icon: 'pilav', label: 'birçî…' },
      { line: 'e01', f: .1, who: 'B', icon: 'kiras', label: 'kiras' },
      { line: 'e02', f: .4, who: 'R', icon: 'sw:#2F7DE1', label: 'şîn' },
      { line: 'e07', f: .05, who: 'B', icon: 'pantol', label: 'pantol' },
      { line: 'f01', f: .1, who: 'B', icon: 'bercavk', label: 'berçavk' },
      { line: 'f06', f: .4, who: 'B', icon: 'heart', label: 'bedew' },
      { line: 'g01', f: .45, who: 'B', icon: 'qaput', label: 'qapût' },
      { line: 'g02', f: 0, who: 'R', icon: 'kartol', label: 'kartol?!' },
      { line: 'g03', f: .6, who: 'B', icon: 'kartol+no', label: 'ne kartol' },
      ...REVIEW.map(([line, k]) => ({ line, f: line === 'i01' ? .55 : 0, who: 'B', icon: k, label: '?' })),
      { line: 'i14', f: 0, tf: .4, hold: 0, who: 'R', icon: 'kartol', label: 'kartol!' },
      { line: 'i14', f: .45, who: 'R', icon: 'qaput', label: 'qapût' },
      { line: 'i15', f: .4, who: 'B', icon: 'txt:100%', label: 'sed ji sedî' },
      { line: 'h11', f: .5, who: 'R', icon: 'pilav', label: 'pîlav?' },
      { line: 'h12', f: .4, who: 'B', icon: 'pilav', label: 'pîlav heye!' },
    ],
    icons: Object.fromEntries(Object.keys(ART).map(k => [k, ic(k)])),
    vocab: [
      ['cil û berg', 'kıyafetler'],
      ['kum', 'şapka'],
      ['gore', 'çorap'],
      ['lepik', 'eldiven'],
      ['pêlav', 'ayakkabı'],
      ['kiras', 'gömlek'],
      ['pantol', 'pantolon'],
      ['berçavk', 'gözlük'],
      ['qapût', 'mont · palto'],
      ['li xwe bike', 'giy'],
      ['şaş', 'yanlış'],
    ],
    sfx(H) {
      const T = H.T, out = [];
      for (const [, , a] of WEAR) out.push({ type: 'boing', at: T(...a) });
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const id of ['b04', 'c06', 'e02', 'i02', 'i04', 'i08', 'i10', 'i12']) out.push({ type: 'ding', at: T(id, .6) });
      out.push({ type: 'cross', at: T('i14', .4) }, { type: 'ding', at: T('i14', .95) }, { type: 'whoosh', at: T('h13', .9) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // giyinme telaşı
      for (const id of ['bw', 'cw', 'ew', 'fw', 'hw']) if (t > T(id, 0) && t < T(id, 1)) {
        const u = H.seg(t, T(id, 0), T(id, 1));
        if (u < .6 || id === 'hw') { Rr.dx = Math.sin(t * 30) * 6; Rr.la = [100 + Math.sin(t * 17) * 50, 150]; Rr.ra = [100 - Math.sin(t * 19) * 50, 150]; Rr.expr = 'happy'; }
        else { Rr.expr = 'smug'; Rr.la = [48, -44]; Rr.ra = [48, -44]; }
        Bb.expr = u < .6 ? 'normal' : 'wide';
      }
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
      // final: pilava koşu
      const a = T('h13', .9);
      if (t > a) { const u = H.seg(t, a, a + 1); Rr.x = H.lerp(H.RX, 1300, H.eio(u)); Rr.look = 1; Rr.walk = t * 3.4; if (u >= 1) Rr.show = false; Bb.expr = 'happy'; }
    },
    back(t, P, H) { // askılık
      const S = H.S;
      let s = `<path d="M430 470h440" ${S} stroke-width="10"/><path d="M450 470v-40M850 470v-40" ${S} stroke-width="8"/>`;
      [['kiras', 500], ['pantol', 600], ['qaput', 700], ['kum', 795]].forEach(([k, x]) => { s += `<path d="M${x} 470v16" ${S} stroke-width="5"/>` + art(k, x, 530, .8); });
      return s;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R;
      if (!Rr.show) return '';
      const x = Rr.x + (Rr.dx || 0), fy = H.FLOOR - 10 + (Rr.dy || 0), hy = fy - 394;
      let s = '';
      for (const [k, where, a, b] of WEAR) {
        const ta = T(...a), tb = b ? T(...b) : Infinity;
        if (t < ta || t >= tb) continue;
        const p = H.back(H.seg(t, ta, ta + .3));
        if (where === 'foot') s += art(k, x + 38, fy - 26, .85 * p, 14);
        if (where === 'hands') for (const sd of [-1, 1]) { const [hx, hyy] = H.hand(Rr, sd); s += art(k, hx, hyy - 6, .7 * p, sd * 20 + 180); }
        if (where === 'legs') s += art(k, x, fy - 96, 1.5 * p, 180);
        if (where === 'back') s += art(k, x + 46, hy - 4, .8 * p, 8);
        if (where === 'face') s += art(k, x - 12, hy + 6, .82 * p);
        if (where === 'body') s += art(k, x, fy - 244, 1.5 * p);
        if (where === 'head') s += art(k, x - 26, hy - 84, .75 * p, -8) + art(k, x + 34, hy - 88, .75 * p, 10);
      }
      // "hi hi hi"
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      return s;
    },
  };
})();
