// "Bazar" — Dersa 18 pratiği (pazar, meyve-sebze, fiyat): Berfîn satıcı, Ronî müşteri; Ronî karıştırır (hirmî→hirç), her şeyi yer, Berfîn güler.
// Sesler: ElevenLabs API (eleven_v4); Kürtçe metin sese ARAP HARFLİ yazımla verilir (tts alanı). Cümle sonundaki "…e" ەه ile yazılır.
// Her sahne + konuşmacı tek uzun kayıt, Scribe kelime zamanlarıyla bölünür.
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
    B('a01', 'Ronî, îro em diçin *bazarê*! Em ê *fêkî* û *zebze* bikirin.', 'Ronî, bugün pazara gidiyoruz! Meyve ve sebze alacağız.', '[cheerful] رۆنی، ئیرۆ ئەم دچن بازارێ! ئەم ێ فێکی ئوو زەبزە بکڕن.', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Bazar! Ez ji *kirînê* pir hez dikim!', 'Pazar! Alışverişi çok severim!', '[excited] بازار! ئەز ژ کرینێ پر هەز دکم!', { s: OK }),
    B('a03', 'Ez *firoşkar* im, tu *kiryar* î.', 'Ben satıcıyım, sen müşterisin.', '[playful] ئەز فرۆشکارم، تو کریاری.', { s: { pose: 'show', expr: 'smug' } }),
    R('a04', 'Baş e! *Rojbaş*, firoşkar!', 'Tamam! Günaydın satıcı!', '[playful] باشە! ڕۆژباش، فرۆشکار!', { s: { pose: 'wave', expr: 'happy' } }),

    // ---------- sêv ----------
    R('b01', 'Ev *sêv* bi çiqas e?', 'Bu elma ne kadar?', '[curious] ئەڤ سێڤ ب چقاسە؟', { s: { pose: 'point', expr: 'normal', look: -1 } }),
    B('b02', 'Kîloyek bi *deh* lîreyan e.', 'Kilosu on lira.', '[confident] کیلۆیەک ب دەه لیرەیانەه.'),
    R('b03', 'Deh?! Pir *biha* ye! Ez du sêvan dixwazim… *belaş*!', 'On mu?! Çok pahalı! İki elma istiyorum… bedava!', '[shocked] دەه؟! پر بهایە! [sly] ئەز دو سێڤان دخوازم… بەلاش!', { s: { pose: 'up', expr: 'wide' }, then: [{ f: .55, s: { pose: 'hips', expr: 'smug' } }] }),
    HA('b04', 'Belaş *tune*, Ronî!', 'Bedava yok Ronî!', '[laughs] بەلاش تونە، رۆنی!'),

    // ---------- hirmî ----------
    B('c01', 'Ev *hirmî* ye.', 'Bu armut.', '[warmly] ئەڤ هرمی یە.', { s: { pose: 'show', expr: 'happy' } }),
    R('c02', '*Hirç*?! Hirç li ku ye?!', 'Ayı mı?! Ayı nerede?!', '[screaming] هرچ؟! هرچ ل کو یە؟!', { s: { pose: 'up', expr: 'wide', shake: 1, sweat: true } }),
    { id: 'cw', wait: 1.8 },
    HA('c03', 'Ne hirç — *hirmî*! Fêkî ye!', 'Ayı değil — armut! Meyve!', '[laughing] نە هرچ — هرمی! فێکی یە!', { gap: .1 }),
    R('c04', 'Ax… hirmî. Ez *natirsim*.', 'Ah… armut. Korkmuyorum.', '[embarrassed] ئاخ… هرمی. ئەز ناترسم.', { s: { pose: 'hips', expr: 'wide', sweat: true } }),

    // ---------- tirî ----------
    B('d01', 'Ev *tirî* ye. Tirî *şîrîn* e.', 'Bu üzüm. Üzüm tatlı.', '[warmly] ئەڤ تری یە. تری شیرینەه.'),
    R('d02', 'Ez tenê *tam* dikim…', 'Sadece tadına bakıyorum…', '[innocent] ئەز تەنێ تام دکم…', { s: { pose: 'point', expr: 'smug', look: -1 } }),
    { id: 'dw', wait: 2.6 },
    B('d03', 'Ronî! Tirî *qediya*!', 'Ronî! Üzüm bitti!', '[shocked] رۆنی! تری قەدیا!', { gap: .1, s: { pose: 'up', expr: 'wide' } }),
    R('d04', 'Erê… tama wê pir *xweş* bû.', 'Evet… tadı çok güzeldi.', '[satisfied] ئەرێ… تاما وێ پر خوەش بوو.', { s: { pose: 'hips', expr: 'happy' } }),
    HA('d05', 'Ay Ronî! Tu her tim *birçî* yî!', 'Ay Ronî! Sen hep açsın!', '[laughs] ئای رۆنی! تو هەر تم برچی یی!'),

    // ---------- terazû ----------
    B('e01', 'Ev *terazû* ye. Em fêkiyan *dikişînin*.', 'Bu terazi. Meyveleri tartarız.', '[warmly] ئەڤ تەرازوو یە. ئەم فێکیان دکێشن.'),
    { id: 'ew', wait: 1.8 },
    R('e02', 'Ez *çend* kîlo me?', 'Ben kaç kiloyum?', '[curious] ئەز چەند کیلۆ مە؟', { gap: .1, s: { pose: 'cheer', expr: 'happy' } }),
    HA('e03', 'Ronî! Tu ne *fêkî* yî!', 'Ronî! Sen meyve değilsin!', '[laughing] رۆنی! تو نە فێکی یی!'),
    R('e04', 'Ez fêkiyekî *şîrîn* im!', 'Ben tatlı bir meyveyim!', '[proud] ئەز فێکیەکی شیرینم!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('e05', 'Hi hi! Fêkiyekî *giran*!', 'Hi hi! Çok ağır bir meyve!', '[giggles] فێکیەکی گران!'),

    // ---------- pîvaz ----------
    B('f01', 'Ev *pîvaz* e.', 'Bu soğan.', '[warmly] ئەڤ پیڤازەه.', { s: { pose: 'show', expr: 'happy' } }),
    R('f02', 'Ez pîvazê *dibirim*!', 'Soğanı doğruyorum!', '[confident] ئەز پیڤازێ دبڕم!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'fw', wait: 2.2 },
    R('f03', 'Ez *nagirîm*! Pîvaz min digirîne!', 'Ağlamıyorum! Soğan beni ağlatıyor!', '[crying] ئەز ناگرم! پیڤاز من دگرینە!', { gap: .1, s: { pose: 'face', expr: 'sad', tear: true } }),
    HA('f04', 'Hi hi! Ronî *digirî*!', 'Hi hi! Ronî ağlıyor!', '[laughs] رۆنی دگری!', { l: { pose: 'face', expr: 'sad', tear: true } }),

    // ---------- kartol + firingî ----------
    B('g01', 'Ev *kartol* e, ev jî *firingî* ye.', 'Bu patates, bu da domates.', '[warmly] ئەڤ کارتۆلەه، ئەڤ ژی فرنگی یە.'),
    R('g02', 'Kartol… ne *qapût*! Kartol!', 'Patates… mont değil! Patates!', '[careful] کارتۆل… نە قاپووت! کارتۆل!', { s: { pose: 'think', expr: 'normal' }, then: [{ f: .6, s: OK }] }),
    HA('g03', 'Aferîn! Te ji *bîr* nekir!', 'Aferin! Unutmamışsın!', '[giggles] ئافەرین! تە ژ بیر نەکر!'),

    // ---------- pere ----------
    B('h01', 'Hemû bi hev re: *bîst* lîre.', 'Hepsi birlikte: yirmi lira.', '[businesslike] هەموو ب هەڤ رە: بیست لیرە.', { s: { pose: 'show', expr: 'happy' } }),
    R('h02', 'Bîst… Ez bi *çayê* didim!', 'Yirmi… Çayla ödüyorum!', '[sly] بیست… ئەز ب چایێ ددم!', { s: { pose: 'show', expr: 'smug' } }),
    HA('h03', 'Bi çayê *nabe*! Pere!', 'Çayla olmaz! Para!', '[laughs] ب چایێ نابە! پەرە!'),
    { id: 'hw', wait: 1.8 },
    R('h04', 'Pereyê min… li *malê* ye.', 'Param… evde.', '[embarrassed] پەرەیێ من… ل مالێ یە.', { gap: .1, s: { pose: 'shrug', expr: 'sad' } }),
    HA('h05', 'Wey Ronî! Kiryarê *herî xirab*!', 'Vay Ronî! En kötü müşteri!', '[laughing] وەی رۆنی! کریارێ هەری خراب!'),

    // ---------- Ronî satıcı ----------
    R('k01', 'Niha ez *firoşkar* im! Tu kiryar î.', 'Şimdi ben satıcıyım! Sen müşterisin.', '[proud] نها ئەز فرۆشکارم! تو کریاری.', { s: { pose: 'hips', expr: 'smug' } }),
    B('k02', 'Baş e. Tu çi *difiroşî*?', 'Tamam. Ne satıyorsun?', '[curious] باشە. تو چ دفرۆشی؟', { s: { pose: 'think', expr: 'happy' } }),
    R('k03', '*Çaya* min a taybet! Qedehek: *sed* lîre!', 'Özel çayım! Bir bardak: yüz lira!', '[salesman] چایا من یا تایبەت! قەدەهەک: سەد لیرە!', { s: { pose: 'show', expr: 'smug' } }),
    HA('k04', 'Sed lîre?! Pir *biha* ye!', 'Yüz lira mı?! Çok pahalı!', '[laughs] سەد لیرە؟! پر بهایە!'),
    R('k05', 'Ji bo te… *belaş*!', 'Senin için… bedava!', '[sweetly] ژ بۆ تە… بەلاش!', { s: { pose: 'show', expr: 'happy' } }),
    HA('k06', 'Aaa, spas! Tu pir *dilovan* î!', 'Aaa, teşekkürler! Çok iyi kalplisin!', '[touched, giggling] ئا، سپاس! تو پر دلۆڤانی!', { s: { pose: 'face', expr: 'happy', red: .5 } }),

    // ---------- zebeş ----------
    B('l01', 'Ev *zebeş* e. Zebeş pir *giran* e.', 'Bu karpuz. Karpuz çok ağır.', '[warmly] ئەڤ زەبەشەه. زەبەش پر گرانەه.'),
    R('l02', 'Giran? Ez pir *xurt* im! Ez sê zebeşan hildigirim!', 'Ağır mı? Ben çok güçlüyüm! Üç karpuz taşırım!', '[proud] گران؟ ئەز پر خورتم! ئەز سێ زەبەشان هلدگرم!', { s: { pose: 'cheer', expr: 'smug' } }),
    { id: 'lw', wait: 2.6 },
    R('l03', '*Alîkarî*! Zebeş li ser min in!', 'İmdat! Karpuzlar üstümde!', '[muffled, panicked] ئالیکاری! زەبەش ل سەر من ن!', { gap: .1 }),
    HA('l04', 'Hi hi! Tu pir *xurt* î, Ronî!', 'Hi hi! Çok güçlüsün Ronî!', '[laughing] تو پر خورتی، رۆنی!'),

    // ---------- erzan ----------
    B('m01', 'Ev sêv *erzan* e: tenê *yek* lîre!', 'Bu elma ucuz: sadece bir lira!', '[cheerful] ئەڤ سێڤ ئەرزانەه: تەنێ یەک لیرە!', { s: { pose: 'show', expr: 'happy' } }),
    R('m02', 'Yek lîre?! Pir *biha* ye!', 'Bir lira mı?! Çok pahalı!', '[shocked] یەک لیرە؟! پر بهایە!', { s: { pose: 'up', expr: 'wide' } }),
    HA('m03', 'Ronî! *Erzan* yanî ne biha!', 'Ronî! Ucuz demek pahalı değil demek!', '[laughs] رۆنی! ئەرزان یانی نە بها!'),
    R('m04', 'Ez dizanim… ez tenê *bazarê* dikim!', 'Biliyorum… sadece pazarlık yapıyorum!', '[sly] ئەز دزانم… ئەز تەنێ بازارێ دکم!', { s: { pose: 'hips', expr: 'smug' } }),

    // ---------- nan ----------
    B('n01', 'Bîhna *nan* tê! Nanê *germ*!', 'Ekmek kokusu geliyor! Sıcak ekmek!', '[delighted] بیهنا نان تێ! نانێ گەرم!', { s: { pose: 'face', expr: 'sleep' } }),
    R('n02', 'Nan! Ez *du* nanan dixwazim!', 'Ekmek! İki ekmek istiyorum!', '[excited] نان! ئەز دو نانان دخوازم!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    B('n03', 'Pereyê te *heye*?', 'Paran var mı?', '[suspicious] پەرەیێ تە هەیە؟', { s: { pose: 'hips', expr: 'smug' } }),
    R('n04', 'Na… lê *çaya* min heye!', 'Hayır… ama çayım var!', '[hopeful] نا… لێ چایا من هەیە!', { s: { pose: 'show', expr: 'happy' } }),
    HA('n05', 'Dîsa *çay*!', 'Yine çay!', '[laughs] دیسا چای!'),

    // ---------- oyun ----------
    B('i01', 'Niha *lîstik*! Ev çi ye?', 'Şimdi oyun! Bu ne?', '[energetic] نها لیستک! ئەڤ چ یە؟'),
    R('i02', '*Sêv*!', 'Elma!', '[confident] سێڤ!', { ...G, s: OK }),
    B('i03', 'Û ev?', 'Ya bu?', '[curious] ئوو ئەڤ؟', G),
    R('i04', 'Hirç… na — *hirmî*!', 'Ayı… yok — armut!', '[careful] هرچ… نا — هرمی!', { ...G, s: { pose: 'think', expr: 'wide' }, then: [{ f: .5, s: OK }] }),
    B('i05', 'Û ev?', 'Ya bu?', '', G),
    R('i06', '*Tirî*!… ku qediya.', 'Üzüm!… bitmişti.', '[confident] تری!… [sheepish] کو قەدیا.', { ...G, s: OK }),
    B('i07', 'Û ev?', 'Ya bu?', '', G),
    R('i08', '*Pîvaz*! Ez nagirîm!', 'Soğan! Ağlamıyorum!', '[sniffling] پیڤاز! ئەز ناگرم!', { ...G, s: { pose: 'face', expr: 'sad' } }),
    HA('i09', 'Aferîn! *Sed ji sedî*!', 'Aferin! Yüzde yüz!', '[giggles] ئافەرین! سەد ژ سەدی!', { l: { pose: 'cheer', expr: 'happy', hop: 24 } }),

    // ---------- final ----------
    R('j01', 'Berfîn, tu firoşkareke *baş* î!', 'Berfîn, sen iyi bir satıcısın!', '[warmly] بەرفین، تو فرۆشکارەکە باشی!', { s: { pose: 'show', expr: 'happy' } }),
    B('j02', 'Û tu kiryarekî… *xerîb* î!', 'Sen de… tuhaf bir müşterisin!', '[teasing] ئوو تو کریارەکی… خەریبی!', { s: { pose: 'think', expr: 'smug' } }),
    R('j03', 'Ez kiryarê *herî baş* im: ez her tiştî dixwim!', 'Ben en iyi müşteriyim: her şeyi yerim!', '[proud] ئەز کریارێ هەری باشم: ئەز هەر تشتی دخوم!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    HA('j04', 'Ha ha! Ew rast e!', 'Ha ha! O doğru!', '[laughs] Ha ha! Ew rast e!' /* Latin: راستەه "rasta" okunuyor */, { l: { pose: 'hips', expr: 'smug' } }),
  ];

  // ---------- çizimler ----------
  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const ART = {
    sev: `<path d="M0 -18c-30 -18 -46 10 -34 34c10 22 24 22 34 14c10 8 24 8 34 -14c12 -24 -4 -52 -34 -34z" fill="#E53935" ${S0} stroke-width="5"/><path d="M0 -18q2 -16 14 -22" fill="none" ${S0} stroke-width="5"/><path d="M4 -30q12 -12 22 -4q-10 10 -22 4z" fill="#2EAD4B" ${S0} stroke-width="3"/>`,
    hirmi: `<path d="M0 -40q-12 0 -12 22q-20 10 -20 34q0 26 32 26t32 -26q0 -24 -20 -34q0 -22 -12 -22z" fill="#C0CA33" ${S0} stroke-width="5"/><path d="M0 -40v-10" ${S0} stroke-width="5"/>`,
    hirc: `<circle cy="4" r="38" fill="#8D5A2B" ${S0} stroke-width="5"/><circle cx="-28" cy="-28" r="12" fill="#8D5A2B" ${S0} stroke-width="5"/><circle cx="28" cy="-28" r="12" fill="#8D5A2B" ${S0} stroke-width="5"/><ellipse cy="16" rx="16" ry="12" fill="#D7B48A" ${S0} stroke-width="4"/><circle cx="-12" cy="-6" r="4" fill="${INKC}"/><circle cx="12" cy="-6" r="4" fill="${INKC}"/><ellipse cy="10" rx="6" ry="4" fill="${INKC}"/>`,
    tiri: [[0, -28], [-14, -12], [14, -12], [-24, 6], [0, 6], [24, 6], [-12, 22], [12, 22], [0, 38]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="#8E44AD" ${S0} stroke-width="4"/>`).join('') + `<path d="M0 -40v-12l10 -6" fill="none" ${S0} stroke-width="5"/>`,
    terazu: `<rect x="-40" y="10" width="80" height="30" rx="6" fill="#ECEFF1" ${S0} stroke-width="5"/><rect x="-46" y="-6" width="92" height="14" rx="5" fill="#B0BEC5" ${S0} stroke-width="5"/><circle cy="25" r="10" fill="#fff" ${S0} stroke-width="3"/><path d="M0 25l6 -6" stroke="#E53935" stroke-width="3"/>`,
    pivaz: `<path d="M0 -36q-6 10 -18 18q-20 16 -10 40q10 18 28 18t28 -18q10 -24 -10 -40q-12 -8 -18 -18z" fill="#E8C3A6" ${S0} stroke-width="5"/><path d="M0 -36v-12M-6 -44l-6 -8M6 -44l6 -8" ${S0} stroke-width="4"/><path d="M-8 -10q-6 20 0 40M8 -10q6 20 0 40" fill="none" stroke="#B88A6A" stroke-width="3"/>`,
    kartol: `<path d="M-40 6q-6 -30 26 -34q40 -4 44 26q2 28 -34 30q-32 2 -36 -22z" fill="#D9A85B" ${S0} stroke-width="5"/><circle cx="-10" cy="-6" r="3" fill="${INKC}"/><circle cx="14" cy="8" r="3" fill="${INKC}"/>`,
    firingi: `<circle cy="6" r="34" fill="#E53935" ${S0} stroke-width="5"/><path d="M-16 -26l8 6l8 -10l8 10l8 -6l-6 10h-20z" fill="#2EAD4B" ${S0} stroke-width="3"/>`,
    pere: `<rect x="-46" y="-24" width="92" height="48" rx="6" fill="#A5D6A7" ${S0} stroke-width="5"/><circle r="14" fill="#fff" ${S0} stroke-width="4"/><text y="7" text-anchor="middle" font-size="18" font-weight="800" fill="${INKC}">₺</text>`,
    tea: `<ellipse cy="30" rx="34" ry="8" fill="#fff" ${S0} stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" ${S0} stroke-width="5"/>`,
    zebes: `<ellipse rx="46" ry="32" fill="#2EAD4B" ${S0} stroke-width="5"/><path d="M-30 -22q-8 22 0 44M-10 -30q-6 30 0 60M10 -30q6 30 0 60M30 -22q8 22 0 44" fill="none" stroke="#1B7A33" stroke-width="5"/>`,
    nan: `<path d="M-46 12q0 -36 46 -36t46 36q0 14 -46 14t-46 -14z" fill="#E0A45A" ${S0} stroke-width="5"/><path d="M-24 -10l10 -8M0 -14l10 -8M22 -10l10 -8" ${S0} stroke-width="4"/><path d="M-12 -34q-6 -10 0 -18M10 -34q-6 -10 0 -18" fill="none" stroke="#999" stroke-width="4" stroke-linecap="round"/>`,
    qaput: `<path d="M-24 -44q24 12 48 0l32 22l-12 46l-16 -6v30h-56v-30l-16 6l-12 -46z" fill="#8D6E63" ${S0} stroke-width="5"/>`,
  };
  const CARD = [['b01', 'sev', 'sêv'], ['c01', 'hirmi', 'hirmî'], ['d01', 'tiri', 'tirî'], ['e01', 'terazu', 'terazû'], ['f01', 'pivaz', 'pîvaz'], ['g01', 'kartol', 'kartol'], ['g01', 'kartol', 'kartol'],
    ['h01', 'pere', 'pere'], ['k03', 'tea', 'çay'], ['l01', 'zebes', 'zebeş'], ['m01', 'sev', 'erzan'], ['n01', 'nan', 'nan'], ['i01', 'sev', '?'], ['i03', 'hirmi', '?'], ['i05', 'tiri', '?'], ['i07', 'pivaz', '?'], ['j01', 'pere', 'bazar']];
  const PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455;
  const curCard = (t, H) => { let c = null; for (const x of CARD) if (t >= H.T(x[0], 0)) c = x; return c; };
  const SCX = 660; // terazi

  window.EP = {
    title: 'BAZAR',
    tag: 'Kurdî A1 · Dersa 18',
    noClock: true,
    table: () => ({}),
    vocabScale: .84,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'b02', f: .4, who: 'B', icon: 'txt:10 ₺', label: 'deh lîre' },
      { line: 'b03', f: .6, who: 'R', icon: 'txt:0 ₺', label: 'belaş!' },
      { line: 'c02', f: 0, who: 'R', icon: 'hirc', label: 'hirç?!' },
      { line: 'c03', f: .3, who: 'B', icon: 'hirc+no', label: 'ne hirç' },
      { line: 'e02', f: .3, who: 'R', icon: 'q', label: 'çend kîlo?' },
      { line: 'g02', f: .1, tf: .55, hold: 0, who: 'R', icon: 'qaput+no', label: 'ne qapût' },
      { line: 'h01', f: .4, who: 'B', icon: 'txt:20 ₺', label: 'bîst lîre' },
      { line: 'h02', f: .4, who: 'R', icon: 'tea', label: 'bi çayê?' },
      { line: 'm01', f: .5, who: 'B', icon: 'txt:1 ₺', label: 'erzan' },
      { line: 'n04', f: .4, who: 'R', icon: 'tea', label: 'çay?' },
    ],
    icons: Object.fromEntries(Object.keys(ART).map(k => [k, () => ART[k]])),
    vocab: [
      ['bazar', 'pazar'],
      ['fêkî · zebze', 'meyve · sebze'],
      ['sêv', 'elma'],
      ['hirmî', 'armut'],
      ['tirî', 'üzüm'],
      ['pîvaz', 'soğan'],
      ['kartol', 'patates'],
      ['firingî', 'domates'],
      ['pere', 'para'],
      ['biha · belaş', 'pahalı · bedava'],
      ['bi çiqas e?', 'ne kadar?'],
    ],
    vocabTts: {
      ku: ['بازار', 'فێکی، زەبزە', 'سێڤ', 'هرمی', 'تری', 'پیڤاز', 'کارتۆل', 'فرنگی', 'پەرە', 'بها، بەلاش', 'ب چقاسە؟'],
      tr: ['pazar', 'meyve, sebze', 'elma', 'armut', 'üzüm', 'soğan', 'patates', 'domates', 'para', 'pahalı, bedava', 'ne kadar?'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const x of CARD) out.push({ type: 'pop', at: T(x[0], 0) });
      out.push({ type: 'whoosh', at: T('cw', .05) }, { type: 'whoosh', at: T('cw', .6) });
      for (let k = 0; k < 6; k++) out.push({ type: 'pop', at: T('dw', .1 + k * .14) });
      out.push({ type: 'boing', at: T('ew', .5) }, { type: 'sweep', at: T('ew', .7) });
      for (let k = 0; k < 6; k++) out.push({ type: 'thud', at: T('fw', .1 + k * .12) });
      out.push({ type: 'sweep', at: T('hw', .2) }, { type: 'cross', at: T('h03', .05) });
      out.push({ type: 'boing', at: T('k05', .5) });
      for (let k = 0; k < 3; k++) out.push({ type: 'thud', at: T('lw', .66 + k * .08) });
      for (const id of ['i02', 'i04', 'i06', 'i08']) out.push({ type: 'ding', at: T(id, .7) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // ayıdan kaçar: kapıya koşup saklanır, geri gelir
      const a0 = T('c02', .4), a1 = T('cw', .4), a2 = T('c03', .7), a3 = T('c04', .5);
      if (t > a0 && t < a3) { const u = t < a1 ? H.eio(H.seg(t, a0, a1)) : t < a2 ? 1 : 1 - H.eio(H.seg(t, a2, a3)); Rr.x = H.lerp(H.RX, 1130, u); if (u > 0 && u < 1) Rr.walk = t * 4; Rr.look = t < a2 ? 1 : -1; if (t > a1 && t < a2) { Rr.expr = 'wide'; Rr.dx = Math.sin(t * 40) * 4; } }
      // üzümü yer
      const d0 = T('d02', .2), d1 = T('d02', .8), d2 = T('d04', 1), d3 = T('d05', .5);
      if (t > d0 && t < d3) { const u = t < d1 ? H.eio(H.seg(t, d0, d1)) : t < d2 ? 1 : 1 - H.eio(H.seg(t, d2, d3)); Rr.x = H.lerp(H.RX, 380, u); if (u > 0 && u < 1) Rr.walk = t * 3.4; Rr.look = -1; if (t > T('dw', 0) && t < T('dw', 1)) { Rr.mouth = Math.abs(Math.sin(t * 14)) * .7; Rr.la = [100, 200 + Math.sin(t * 14) * 30]; Rr.expr = 'happy'; } }
      // teraziye çıkar
      const w0 = T('ew', 0), w1 = T('ew', .4), w2 = T('e05', 1), w3 = T('f01', .3);
      if (t > w0 && t < w3) { const u = t < w1 ? H.eio(H.seg(t, w0, w1)) : t < w2 ? 1 : 1 - H.eio(H.seg(t, w2, w3)); Rr.x = H.lerp(H.RX, SCX, u); Rr.dy = -Math.sin(u * Math.PI) * 120 * ((t < w1 || t > w2) ? 1 : 0) - 34 * u; Rr.look = -1; }
      // soğan doğrarken ağlar
      const f0 = T('f02', .3), f1 = T('f02', .9), f2 = T('f04', 1), f3 = T('g01', .3);
      if (t > f0 && t < f3) { const u = t < f1 ? H.eio(H.seg(t, f0, f1)) : t < f2 ? 1 : 1 - H.eio(H.seg(t, f2, f3)); Rr.x = H.lerp(H.RX, 380, u); if (u > 0 && u < 1) Rr.walk = t * 3.4; Rr.look = -1; if (t > T('fw', 0) && t < T('f03', 0)) { Rr.la = [80 + Math.abs(Math.sin(t * 16)) * 30, 60]; Rr.tear = t > T('fw', .4); Rr.expr = t > T('fw', .4) ? 'sad' : 'smug'; } }
      // karpuzlar: sallanır, düşer, altında kalır
      const z0 = T('lw', 0), z1 = T('lw', .65), z2 = T('l04', 1), z3 = T('l04', 1) + .5;
      if (t > z0 && t < z1) { Rr.la = [150, 176]; Rr.ra = [150, 176]; Rr.rot = Math.sin(t * 9) * 8 * H.seg(t, z0, z1); Rr.dx = Math.sin(t * 5) * 30; Rr.expr = 'wide'; Rr.sweat = true; }
      if (t >= z1 && t < z3) { const u = t < z2 ? H.eio(H.seg(t, z1, z1 + .25)) : 1 - H.eio(H.seg(t, z2, z3)); Rr.rot = 88 * u; Rr.dx = -220 * u; Rr.expr = 'dizzy'; }
      // cepleri boş
      if (t > T('hw', 0) && t < T('h04', 1)) { Rr.la = [30, 60]; Rr.ra = [30, 60]; Rr.expr = 'wide'; }
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
      Bb.look = Rr.x < H.BX ? -1 : 1;
    },
    mid(t, P, H) { // pazar tezgâhı: masanın üstünde kasalar
      const S = H.S, T = H.T, TY = 985;
      let s = `<path d="M40 ${TY - 250}h410l-20 -60h-370z" fill="#E53935" ${S} stroke-width="6"/>`;
      for (let x = 60; x < 430; x += 60) s += `<path d="M${x} ${TY - 310}l-10 60" stroke="#fff" stroke-width="12" opacity=".7"/>`;
      s += `<path d="M60 ${TY - 250}v250M430 ${TY - 250}v250" ${S} stroke-width="8"/>`;
      const crate = (x, k, n = 3, sc = .42) => { let c = `<rect x="${x - 48}" y="${TY - 44}" width="96" height="44" rx="4" fill="#C98B4E" ${S} stroke-width="5"/>`; for (let i = 0; i < n; i++) c += `<g transform="translate(${x - 26 + i * 26} ${TY - 52}) scale(${sc})">${ART[k]}</g>`; return c; };
      const grapes = t < T('dw', 0) ? 3 : t < T('dw', 1) ? Math.max(0, 3 - Math.floor(H.seg(t, T('dw', 0), T('dw', .9)) * 4)) : 0;
      s += crate(120, 'sev') + crate(230, 'hirmi') + crate(340, 'tiri', grapes);
      // terazi (yerde)
      if (t > T('e01', 0) && t < T('f01', .5)) { s += `<g transform="translate(${SCX} ${H.FLOOR - 40}) scale(1.6)">${ART.terazu}</g>`; if (t > T('ew', .5)) { const kg = Math.round(H.seg(t, T('ew', .5), T('e02', .3)) * 99); s += `<g transform="translate(${SCX + 130} ${H.FLOOR - 90})"><rect x="-56" y="-26" width="112" height="52" rx="10" fill="${INKC}"/><text y="13" text-anchor="middle" font-size="34" font-weight="800" fill="#7CFC00">${kg} kg</text></g>`; } }
      return s;
    },
    back(t, P, H) {
      const S = H.S, T = H.T, c = curCard(t, H);
      let s = `<g transform="translate(${PX} ${PY})"><path d="M-70 120l20 -40M70 120l-20 -40" ${S} stroke-width="8"/><rect x="-120" y="-130" width="240" height="220" rx="16" fill="#2E5E4E" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="188" rx="8" fill="#fff"/>`;
      if (c) { const a = T(c[0], 0), p = H.back(H.seg(t, a, a + .35)); s += `<g transform="translate(${c[0] === 'g01' && t > T('g01', .45) ? 0 : 0} -26) scale(${1.5 * p})">${c[0] === 'g01' && t > T('g01', .45) ? ART.firingi : ART[c[1]]}</g><text y="62" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">${c[0] === 'g01' && t > T('g01', .45) ? 'firingî' : c[2]}</text>`; }
      return s + `</g>`;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // ayı korkusu: kapı kenarından bakar
      if (t > T('cw', .3) && t < T('c03', .7)) s += `<text x="1000" y="${H.FLOOR - 470}" text-anchor="middle" font-size="44" font-weight="800" fill="#E53935">HIRÇ!</text>`;
      // üzüm yerken "nam nam"
      if (t > T('dw', 0) && t < T('dw', 1)) s += `<text x="${Rr.x + 60}" y="${H.FLOOR - 470}" font-size="42" font-weight="800" fill="#8E44AD">nam nam…</text>`;
      // soğan + bıçak
      if (t > T('fw', 0) && t < T('f04', 1)) { s += `<g transform="translate(330 ${985 - 30}) scale(.8)">${ART.pivaz}</g>`; const [hx, hy] = H.hand(Rr, -1); s += `<g transform="translate(${hx} ${hy}) rotate(${-30 + Math.abs(Math.sin(t * 16)) * 30})"><path d="M0 0h-60l-6 10h66z" fill="#CFD8DC" ${H.S} stroke-width="4"/><rect x="0" y="-4" width="26" height="12" rx="4" fill="#5D4037" ${H.S} stroke-width="3"/></g>`; }
      // karpuz kulesi / yerdeki karpuzlar
      const y0 = T('lw', 0), y1 = T('lw', .65);
      if (t > T('l02', .6) && t < y1) { const [hx, hy] = H.hand(Rr, -1), hx2 = (hx + H.hand(Rr, 1)[0]) / 2; for (let k = 0; k < 3; k++) s += `<g transform="translate(${hx2 + Math.sin(t * 6 + k) * 10 * k} ${hy - 30 - k * 62}) scale(1.0)">${ART.zebes}</g>`; }
      if (t >= y1 && t < T('l04', 1) + .5) { const u = H.eout(H.seg(t, y1, y1 + .4)); [[H.RX - 120, 0], [H.RX + 20, 1], [H.RX - 260, 2]].forEach(([x, k]) => { s += `<g transform="translate(${x} ${H.lerp(H.FLOOR - 500 - k * 60, H.FLOOR - 40, u)}) rotate(${u * 180 * (k - 1)})">${ART.zebes}</g>`; }); }
      // ekmek kokusu
      if (t > T('n01', 0) && t < T('n02', 1)) for (let i = 0; i < 3; i++) { const p = ((t * 1.1 + i / 3) % 1); s += `<path d="M${120 + i * 60 + p * 200} ${985 - 60 - p * 200}q-14 -14 0 -28q14 -14 0 -28" fill="none" stroke="#E0A45A" stroke-width="6" stroke-linecap="round" opacity="${1 - p}"/>`; }
      // satıcı Ronî: çay
      if (t > T('k03', .1) && t < T('k06', 1)) { const [hx, hy] = H.hand(Rr, -1); s += `<g transform="translate(${hx} ${hy - 30}) scale(.7)">${ART.tea}</g>`; }
      if (t > T('k03', .4) && t < T('k04', 1)) s += `<g transform="translate(${H.RX + 90} ${H.FLOOR - 470}) rotate(6)"><rect x="-74" y="-30" width="148" height="60" rx="10" fill="#FFD23F" ${H.S} stroke-width="5"/><text y="12" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">100 ₺</text></g>`;
      if (t > T('k05', .4) && t < T('k06', 1)) s += `<g transform="translate(${H.RX + 90} ${H.FLOOR - 470}) rotate(-4)"><rect x="-74" y="-30" width="148" height="60" rx="10" fill="#2EAD4B" ${H.S} stroke-width="5"/><text y="12" text-anchor="middle" font-size="34" font-weight="800" fill="#fff">belaş ♥</text></g>`;
      // çay bardağı
      if (t > T('h02', .3) && t < T('h03', 1)) { const [hx, hy] = H.hand(Rr, -1); s += `<g transform="translate(${hx} ${hy - 30}) scale(.7)">${ART.tea}</g>`; }
      // boş cepler
      if (t > T('hw', .2) && t < T('h04', 1)) for (const sd of [-1, 1]) s += `<path d="M${Rr.x + sd * 30} ${H.FLOOR - 220}q${sd * 30} 4 ${sd * 22} 30q${-sd * 20} 2 ${-sd * 22} -30z" fill="#fff" ${H.S} stroke-width="4"/>`;
      if (t > T('hw', .4) && t < T('h04', 1)) s += `<text x="${Rr.x + 70}" y="${H.FLOOR - 480}" font-size="40" font-weight="800" fill="#7b746a">…0 ₺</text>`;
      return s;
    },
  };
})();
