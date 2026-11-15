// "Heywan" — Dersa 14 pratiği (hayvanlar): Berfîn anlatır, Ronî karıştırır (pisîk↔kûçik sesi, masî→mast, mar→mal), Berfîn gülüp düzeltir.
// Sesler: ElevenLabs API (eleven_v4); Kürtçe metin sese ARAP HARFLİ yazımla verilir (tts alanı), hayvan sesleri Latin.
// Cümle sonundaki "…e" ەه ile yazılır. Her sahne + konuşmacı tek uzun kayıt, Scribe kelime zamanlarıyla bölünür.
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
    B('a01', 'Ronî, îro dersa me *heywan* in!', 'Ronî, bugünkü dersimiz hayvanlar!', '[cheerful] رۆنی، ئیرۆ دەرسا مە هەیوانن!', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Heywan? Ez ji heywanan pir *hez dikim*!', 'Hayvanlar mı? Hayvanları çok severim!', '[excited] هەیوان؟ ئەز ژ هەیوانان پر هەز دکم!', { s: OK }),
    B('a03', 'Baş e! Em *dest pê* bikin.', 'Tamam! Başlayalım.', '[warmly] باشە! ئەم دەست پێ بکن.'),

    // ---------- pisîk ----------
    B('b01', 'Ev *pisîk* e. Pisîk çi *dibêje*?', 'Bu kedi. Kedi ne der?', '[warmly] ئەڤ پسیکەه. پسیک چ دبێژە؟'),
    R('b02', 'Hew hew!', 'Hav hav!', '[confident] Hew, hew!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('b03', 'Na! Pisîk dibêje: *miyaw*!', 'Hayır! Kedi miyav der!', '[laughs] نا! پسیک دبێژە: Miyaw!'),
    R('b04', 'Ax, rast e. Miyaw! Miyaw!', 'Ah, doğru. Miyav! Miyav!', '[playful] ئاخ، راستە. Miyaw! Miyaw!', { s: { pose: 'think', expr: 'happy' } }),
    HA('b05', 'Tu pisîkeke pir *mezin* î!', 'Sen çok büyük bir kedisin!', '[giggles] تو پسیکەکە پر مەزنی!'),

    // ---------- kûçik ----------
    B('c01', 'Ev *kûçik* e. Kûçik çi dibêje?', 'Bu köpek. Köpek ne der?', '[warmly] ئەڤ کووچکەه. کووچک چ دبێژە؟'),
    R('c02', 'Miyaw!', 'Miyav!', '[confident] Miyaw!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('c03', 'Ronî, tu her tim *berevajî* dibêjî! Kûçik dibêje: hew hew!', 'Ronî, hep tersini söylüyorsun! Köpek hav hav der!', '[laughs] رۆنی، تو هەر تم بەرەڤاژی دبێژی! کووچک دبێژە: Hew, hew!'),
    R('c04', 'Hew hew! Ez kûçikekî *baş* im!', 'Hav hav! Ben iyi bir köpeğim!', '[playful] Hew, hew! ئەز کووچکەکی باشم!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),

    // ---------- masî ----------
    B('d01', 'Ev *masî* ye. Masî di *avê* de dijî.', 'Bu balık. Balık suda yaşar.', '[warmly] ئەڤ ماسی یە. ماسی د ئاڤێ دە دژی.'),
    R('d02', '*Mast*? Ez mast dixwazim, bi *xiyar*!', 'Yoğurt mu? Yoğurt isterim, salatalıkla!', '[excited] ماست؟ ئەز ماست دخوازم، ب خیار!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    HA('d03', 'Na! Ne mast — *masî*!', 'Hayır! Yoğurt değil — balık!', '[laughs] نا! نە ماست — ماسی!'),
    R('d04', 'Masî… di avê de… ez jî *avjeniyê* dizanim!', 'Balık… suda… ben de yüzmeyi bilirim!', '[proud] ماسی… د ئاڤێ دە… ئەز ژی ئاڤژەنیێ دزانم!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'dw', wait: 2.4 },
    HA('d05', 'Ronî! Li vir av *tune*!', 'Ronî! Burada su yok!', '[giggles] رۆنی! ل ڤر ئاڤ تونە!', { gap: .1 }),

    // ---------- mar ----------
    B('e01', 'Ev *mar* e. *Hişyar* be!', 'Bu yılan. Dikkat et!', '[nervous] ئەڤ مارەه. هشیار بە!', { s: { pose: 'point', expr: 'wide' } }),
    R('e02', '*Mal*? Mala min li ku ye?', 'Ev mi? Evim nerede?', '[confused] مال؟ مالا من ل کو یە؟', { s: { pose: 'shrug', expr: 'wide' } }),
    B('e03', 'Na, ne mal — *mar*! Ssss!', 'Hayır, ev değil — yılan! Ssss!', '[hissing] نا، نە مال — مار! Ssss!', { s: { pose: 'point', expr: 'smug' } }),
    { id: 'ew', wait: 2.2 },
    R('e04', 'MAR! *Alîkarî*!', 'YILAN! İmdat!', '[screaming] مار! ئالیکاری!', { gap: .05, s: { pose: 'up', expr: 'wide', shake: 1, sweat: true, hop: 60 } }),
    HA('e05', 'Hi hi! Ew marê *lîstikê* ye!', 'Hi hi! O oyuncak yılan!', '[laughs] ئەو مارێ لیستکێ یە!'),
    R('e06', 'Ez… ez *natirsim*.', 'Ben… ben korkmuyorum.', '[nervous] ئەز… ئەز ناترسم.', { s: { pose: 'hips', expr: 'wide', sweat: true } }),

    // ---------- mirîşk ----------
    B('f01', 'Ev *mirîşk* e. Mirîşk *hêkan* dike.', 'Bu tavuk. Tavuk yumurtlar.', '[warmly] ئەڤ مریشکەه. مریشک هێکان دکە.'),
    R('f02', 'Hêk! Ez *deh* hêkan dixwazim!', 'Yumurta! On yumurta istiyorum!', '[excited] هێک! ئەز دەه هێکان دخوازم!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    HA('f03', 'Tu *dîsa* birçî yî!', 'Yine açsın!', '[laughs] تو دیسا برچی یی!'),

    // ---------- çêlek ----------
    B('g01', 'Ev *çêlek* e. Çêlek *şîr* dide.', 'Bu inek. İnek süt verir.', '[warmly] ئەڤ چێلەکەه. چێلەک شیر ددە.'),
    R('g02', 'Şîr? Ez ji şîr hez nakim! Ez ji *çayê* hez dikim!', 'Süt mü? Süt sevmem! Ben çay severim!', '[disgusted] شیر؟ ئەز ژ شیر هەز ناکم! ئەز ژ چایێ هەز دکم!', { s: { pose: 'shrug', expr: 'sad' } }),
    HA('g03', 'Çêlek *çay* nade, Ronî!', 'İnek çay vermez Ronî!', '[giggles] چێلەک چای نادە، رۆنی!'),
    R('g04', '*Heyf*!', 'Yazık!', '[sad] هەیف!', { s: { pose: 'down', expr: 'sad' } }),

    // ---------- hesp ----------
    B('h01', 'Ev *hesp* e. Hesp *zû* direve.', 'Bu at. At hızlı koşar.', '[warmly] ئەڤ هەسپەه. هەسپ زوو درەڤە.'),
    R('h02', 'Ez jî hesp im! *Bibeze*!', 'Ben de atım! Koş!', '[excited] ئەز ژی هەسپم! ببەزە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    { id: 'hw', wait: 3.2 },
    HA('h03', 'Hi hi! Hespekî pir *westiyayî*!', 'Hi hi! Çok yorgun bir at!', '[laughing] هەسپەکی پر وەستیایی!', { gap: .1 }),
    R('h04', 'Erê… hesp *avê* dixwaze…', 'Evet… at su istiyor…', '[panting] ئەرێ… هەسپ ئاڤێ دخوازە…', { s: { pose: 'down', expr: 'sad', sweat: true, tilt: 10 } }),

    // ---------- mişk ----------
    B('i01', 'Ev *mişk* e. Mişk *piçûk* e.', 'Bu fare. Fare küçük.', '[warmly] ئەڤ مشکەه. مشک پچووکەه.'),
    { id: 'iw', wait: 1.6 },
    R('i02', 'Mişk! Mişk! Ez *ditirsim*!', 'Fare! Fare! Korkuyorum!', '[screaming] مشک! مشک! ئەز دترسم!', { gap: .05, s: { pose: 'up', expr: 'wide', shake: 1, sweat: true } }),
    HA('i03', 'Ronî, tu ji mişkekî *piçûk* ditirsî?!', 'Ronî, küçücük bir fareden mi korkuyorsun?!', '[laughs] رۆنی، تو ژ مشکەکی پچووک دترسی؟!', { l: { pose: 'up', expr: 'wide', sweat: true } }),
    R('i04', 'Na… ez tenê… *bilind* im.', 'Hayır… ben sadece… yüksekteyim.', '[nervous] نا… ئەز تەنێ… بلندم.', { s: { pose: 'hips', expr: 'wide', sweat: true } }),

    // ---------- pez ----------
    B('l01', 'Ev *pez* e. Pez *spî* ye.', 'Bu koyun. Koyun beyaz.', '[warmly] ئەڤ پەزەه. پەز سپی یە.'),
    R('l02', 'Pez! Ez pezan *dijmêrim*: yek pez, du pez, sê pez…', 'Koyun! Koyunları sayarım: bir koyun, iki koyun, üç koyun…', '[sleepy] Pez! Ez pezan dijmêrim: yek pez, du pez, sê pez…' /* Latin: Arap harfli پەز "paz" okunuyor */, { s: { pose: 'think', expr: 'sleep', tilt: 10 } }),
    { id: 'lw', wait: 2.2 },
    HA('l03', 'Ronî! *Hişyar* be! Tu di dersê de radizî!', 'Ronî! Uyan! Derste uyuyorsun!', '[laughs] رۆنی! هشیار بە! تو د دەرسێ دە رادزی!', { gap: .1, l: { pose: 'idle', expr: 'sleep', tilt: 14 } }),
    R('l04', 'Çi? Ez *şiyar* im! Ez… pez im. Mee!', 'Ne? Uyanığım! Ben… koyunum. Mee!', '[startled] چ؟ ئەز شیارم! ئەز… پەزم. Meee!', { s: { pose: 'up', expr: 'wide', shake: 1 }, then: [{ f: .6, s: { pose: 'hips', expr: 'smug' } }] }),
    HA('l05', 'Tu *hemû* heywan î!', 'Sen bütün hayvanlarsın!', '[giggles] تو هەموو هەیوانی!'),

    // ---------- çûk ----------
    B('m01', 'Ev *çûk* e. Çûk *difire*.', 'Bu kuş. Kuş uçar.', '[warmly] ئەڤ چووکەه. چووک دفرە.'),
    R('m02', 'Ez jî *difirim*! Binêre!', 'Ben de uçarım! Bak!', '[excited] ئەز ژی دفرم! بنێرە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    { id: 'mw', wait: 2.6 },
    HA('m03', 'Ronî, tu ne çûk î! Tu *nikarî* bifirî!', 'Ronî, sen kuş değilsin! Uçamazsın!', '[laughing] رۆنی، تو نە چووکی! تو نکاری بفری!', { gap: .1 }),
    R('m04', 'Ez dikarim… *sibê*!', 'Uçabilirim… yarın!', '[stubborn] ئەز دکارم… سبێ!', { s: { pose: 'hips', expr: 'smug', tilt: 8 } }),

    // ---------- oyun ----------
    B('j01', 'Niha *lîstik*! Ez dengê heywanan dikim, tu *bibêje*.', 'Şimdi oyun! Hayvan sesleri yapacağım, sen söyle.', '[energetic] نها لیستک! ئەز دەنگێ هەیوانان دکم، تو ببێژە.'),
    B('j02', 'Miyaw!', 'Miyav!', '[playful] Miyaw!', G),
    R('j03', '*Pisîk*!', 'Kedi!', '[confident] پسیک!', { ...G, s: OK }),
    B('j04', 'Hew hew!', 'Hav hav!', '[playful] Hew, hew!', G),
    R('j05', '*Kûçik*!', 'Köpek!', '[confident] کووچک!', { ...G, s: OK }),
    B('j06', 'Ssss!', 'Ssss!', '[hissing] Ssssss!', G),
    R('j07', '*Mar*… ne mal! Mar!', 'Yılan… ev değil! Yılan!', '[careful] مار… نە مال! مار!', { ...G, s: { pose: 'think', expr: 'normal' } }),
    B('j08', 'Qut qut qudaq!', 'Gıt gıt gıdak!', '[playful] Qut, qut, qudaq!', G),
    R('j09', '*Mirîşk*!', 'Tavuk!', '[confident] مریشک!', { ...G, s: OK }),
    B('j10', 'Mooo!', 'Möö!', '[playful] Mooooo!', G),
    R('j11', '*Çêlek*!… û çay *tune*.', 'İnek!… ve çay yok.', '[confident] چێلەک!… [sad] ئوو چای تونە.', { ...G, s: OK, then: [{ f: .5, s: { pose: 'down', expr: 'sad' } }] }),
    HA('j12', 'Aferîn! *Sed ji sedî*!', 'Aferin! Yüzde yüz!', '[giggles] ئافەرین! سەد ژ سەدی!', { l: { pose: 'cheer', expr: 'happy', hop: 24 } }),

    // ---------- final ----------
    R('k01', 'Berfîn, heywanê min ê *hezkirî* pisîk e. Ya te?', 'Berfîn, en sevdiğim hayvan kedi. Ya seninki?', '[warmly] بەرفین، هەیوانێ من ێ هەزکری پسیکەه. یا تە؟', { s: { pose: 'show', expr: 'happy' } }),
    B('k02', 'Heywanê min ê hezkirî… *tu* yî, Ronî!', 'En sevdiğim hayvan… sensin Ronî!', '[teasing] هەیوانێ من ێ هەزکری… تو یی، رۆنی!', { s: { pose: 'think', expr: 'smug' }, then: [{ f: .55, s: { pose: 'point', expr: 'happy' } }] }),
    R('k03', 'Ez? Ez ne heywan im!… *Miyaw*!', 'Ben mi? Ben hayvan değilim!… Miyav!', '[offended] ئەز؟ ئەز نە هەیوانم!… [playful] Miyaw!', { s: { pose: 'up', expr: 'angry', red: .4 }, then: [{ f: .7, s: { pose: 'cheer', expr: 'smug', hop: 30 } }] }),
    HA('k04', 'Ay Ronî! Tu pisîka herî *mezin* î!', 'Ay Ronî! En büyük kedi sensin!', '[laughs] ئای رۆنی! تو پسیکا هەری مەزنی!', { l: { pose: 'cheer', expr: 'happy' } }),
  ];

  // ---------- hayvan çizimleri (merkez 0,0, ~±50) ----------
  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="4" fill="${INKC}"/>`;
  const ART = {
    pisik: `<path d="M24 26q36 -2 30 -36" fill="none" ${S0} stroke-width="7"/><ellipse cy="18" rx="30" ry="22" fill="#FF9F43" ${S0} stroke-width="5"/><circle cy="-16" r="24" fill="#FF9F43" ${S0} stroke-width="5"/><path d="M-20 -30l-4 -24l16 12zM20 -30l4 -24l-16 12z" fill="#FF9F43" ${S0} stroke-width="5"/>${eye(-9, -18)}${eye(9, -18)}<path d="M-4 -9h8l-4 5z" fill="#FF8FB0"/><path d="M-14 -8h-20M14 -8h20" ${S0} stroke-width="2"/>`,
    kucik: `<path d="M28 16q20 -10 18 -28" fill="none" ${S0} stroke-width="7"/><ellipse cx="6" cy="20" rx="34" ry="20" fill="#C98B4E" ${S0} stroke-width="5"/><circle cx="-18" cy="-14" r="24" fill="#E0B07A" ${S0} stroke-width="5"/><path d="M-38 -28q-14 18 -2 30M2 -28q14 18 2 30" fill="#8D5A2B" ${S0} stroke-width="5"/>${eye(-26, -16)}${eye(-10, -16)}<ellipse cx="-18" cy="-4" rx="6" ry="4" fill="${INKC}"/><path d="M-22 6q4 6 8 0" fill="none" ${S0} stroke-width="3"/>`,
    masi: `<path d="M-44 0q30 -34 66 0q-36 34 -66 0z" fill="#2F7DE1" ${S0} stroke-width="5"/><path d="M22 0l24 -20v40z" fill="#2F7DE1" ${S0} stroke-width="5"/>${eye(-26, -4)}<path d="M-6 -14q8 14 0 28" fill="none" stroke="#fff" stroke-width="4"/>`,
    mar: `<path d="M-48 24q12 -24 28 0t28 0t28 -10q6 -16 -6 -26" fill="none" stroke="${INKC}" stroke-width="20" stroke-linecap="round"/><path d="M-48 24q12 -24 28 0t28 0t28 -10q6 -16 -6 -26" fill="none" stroke="#2EAD4B" stroke-width="12" stroke-linecap="round"/><ellipse cx="28" cy="-14" rx="16" ry="12" fill="#2EAD4B" ${S0} stroke-width="5"/>${eye(32, -18)}<path d="M42 -10l12 4l-4 4l6 2" fill="none" stroke="#E53935" stroke-width="3"/>`,
    mirisk: `<ellipse cy="14" rx="34" ry="26" fill="#fff" ${S0} stroke-width="5"/><circle cx="-24" cy="-14" r="18" fill="#fff" ${S0} stroke-width="5"/><path d="M-28 -32q4 -12 10 -2q4 -10 8 2" fill="#E53935" ${S0} stroke-width="4"/><path d="M-42 -14l-10 4l10 4z" fill="#FFC83D" ${S0} stroke-width="4"/>${eye(-28, -16)}<path d="M-30 -2q2 8 6 0" fill="#E53935" ${S0} stroke-width="3"/><path d="M30 6q14 -20 6 -30" fill="none" ${S0} stroke-width="5"/><path d="M-6 40v10M10 40v10" ${S0} stroke-width="5"/>`,
    celek: `<rect x="-30" y="-4" width="64" height="40" rx="14" fill="#fff" ${S0} stroke-width="5"/><circle cx="-6" cy="8" r="7" fill="${INKC}"/><circle cx="16" cy="20" r="6" fill="${INKC}"/><ellipse cx="-34" cy="-14" rx="18" ry="20" fill="#fff" ${S0} stroke-width="5"/><ellipse cx="-34" cy="-2" rx="12" ry="8" fill="#FF8FB0" ${S0} stroke-width="3"/>${eye(-40, -20)}${eye(-28, -20)}<path d="M-48 -30l-8 -8M-20 -30l8 -8" ${S0} stroke-width="5"/><path d="M-22 36v12M22 36v12" ${S0} stroke-width="6"/>`,
    hesp: `<path d="M-30 6q0 -20 26 -20h22q12 0 12 20v14h-60z" fill="#8D5A2B" ${S0} stroke-width="5"/><path d="M14 -10l12 -30q16 -2 18 14l-8 6l-10 -2z" fill="#8D5A2B" ${S0} stroke-width="5"/><path d="M18 -36q-10 6 -10 22" fill="none" stroke="${INKC}" stroke-width="8"/>${eye(32, -28)}<path d="M-22 20v26M-8 20v26M10 20v26M24 20v26" ${S0} stroke-width="6"/><path d="M-30 4q-16 4 -14 24" fill="none" ${S0} stroke-width="6"/>`,
    misk: `<path d="M24 16q30 6 30 -14" fill="none" ${S0} stroke-width="4"/><path d="M-36 20q0 -34 34 -34q30 0 30 34z" fill="#9E9E9E" ${S0} stroke-width="5"/><circle cx="-26" cy="-12" r="12" fill="#BDBDBD" ${S0} stroke-width="4"/>${eye(-34, 4)}<circle cx="-46" cy="12" r="4" fill="#FF8FB0"/>`,
    mast: `<path d="M-30 -10h60l-6 44h-48z" fill="#fff" ${S0} stroke-width="5"/><ellipse cy="-10" rx="30" ry="8" fill="#F5F5F5" ${S0} stroke-width="5"/><path d="M-24 6h48" stroke="#2F7DE1" stroke-width="5"/><text y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#2F7DE1">MAST</text>`,
    mal: `<rect x="-30" y="-6" width="60" height="44" fill="#FFE0B2" ${S0} stroke-width="5"/><path d="M-40 -6L0 -40L40 -6z" fill="#E53935" ${S0} stroke-width="5"/><rect x="-8" y="14" width="16" height="24" fill="#8D6E63" ${S0} stroke-width="4"/>`,
    pez: `<path d="M-34 10a16 16 0 0 1 8 -28a18 18 0 0 1 30 -8a18 18 0 0 1 30 10a16 16 0 0 1 0 30q-34 12 -68 -4z" fill="#fff" ${S0} stroke-width="5"/><ellipse cx="-36" cy="0" rx="13" ry="16" fill="${INKC}"/><circle cx="-40" cy="-4" r="3" fill="#fff"/><path d="M-14 26v8M16 26v8" ${S0} stroke-width="6"/>`,
    cuk: `<ellipse cy="6" rx="30" ry="22" fill="#FFD23F" ${S0} stroke-width="5"/><circle cx="-22" cy="-16" r="16" fill="#FFD23F" ${S0} stroke-width="5"/><path d="M-38 -16l-12 4l12 4z" fill="#FF9F43" ${S0} stroke-width="4"/>${eye(-24, -18)}<path d="M-4 0q22 -28 34 -8q-16 6 -34 8z" fill="#FFC107" ${S0} stroke-width="4"/><path d="M28 10l16 -6l-4 14z" fill="#FFD23F" ${S0} stroke-width="4"/>`,
    tea: `<ellipse cy="30" rx="34" ry="8" fill="#fff" ${S0} stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" ${S0} stroke-width="5"/>`,
    egg: `<ellipse cy="2" rx="24" ry="32" fill="#FFF6E0" ${S0} stroke-width="6"/>`,
    milk: `<path d="M-18 -30h36v64h-36z" fill="#fff" ${S0} stroke-width="5"/><path d="M-18 -30l8 -12h20l8 12" fill="#fff" ${S0} stroke-width="5"/><text y="12" text-anchor="middle" font-size="16" font-weight="800" fill="#2F7DE1">ŞÎR</text>`,
  };
  const art = (k, x, y, sc = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">${ART[k]}</g>`;

  // tahtadaki hayvan kartı
  const CARD = [['b01', 'pisik', 'pisîk'], ['c01', 'kucik', 'kûçik'], ['d01', 'masi', 'masî'], ['e01', 'mar', 'mar'], ['f01', 'mirisk', 'mirîşk'], ['g01', 'celek', 'çêlek'], ['h01', 'hesp', 'hesp'], ['i01', 'misk', 'mişk'], ['l01', 'pez', 'pez'], ['m01', 'cuk', 'çûk'], ['j01', null, '?'],
    ['j03', 'pisik', 'pisîk'], ['j05', 'kucik', 'kûçik'], ['j07', 'mar', 'mar'], ['j09', 'mirisk', 'mirîşk'], ['j11', 'celek', 'çêlek'], ['k01', 'pisik', 'pisîk']];
  const PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455;
  const curCard = (t, H) => { let c = null; for (const x of CARD) if (t >= H.T(x[0], 0)) c = x; return c; };

  window.EP = {
    title: 'HEYWAN',
    tag: 'Kurdî A1 · Dersa 14',
    noClock: true,
    table: () => ({}),
    vocabScale: .84,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'b02', f: 0, who: 'R', icon: 'kucik', label: 'hew hew?' },
      { line: 'b03', f: .4, who: 'B', icon: 'pisik', label: 'miyaw' },
      { line: 'c02', f: 0, who: 'R', icon: 'pisik', label: 'miyaw?' },
      { line: 'c03', f: .6, who: 'B', icon: 'kucik', label: 'hew hew' },
      { line: 'd02', f: 0, who: 'R', icon: 'mast', label: 'mast?!' },
      { line: 'd03', f: .3, who: 'B', icon: 'mast+no', label: 'ne mast' },
      { line: 'e02', f: 0, who: 'R', icon: 'mal', label: 'mal?' },
      { line: 'e03', f: .3, who: 'B', icon: 'mal+no', label: 'ne mal' },
      { line: 'f02', f: .3, who: 'R', icon: 'egg', label: 'deh hêk!' },
      { line: 'g01', f: .6, who: 'B', icon: 'milk', label: 'şîr' },
      { line: 'g02', f: .55, who: 'R', icon: 'tea', label: 'çay!' },
      { line: 'g03', f: .3, who: 'B', icon: 'tea+no', label: 'çay nade' },
      { line: 'h04', f: .3, who: 'R', icon: 'water', label: 'av…' },
      { line: 'j12', f: .4, who: 'B', icon: 'txt:100%', label: 'sed ji sedî' },
      { line: 'k02', f: .55, who: 'B', icon: 'heart', label: 'tu yî!' },
    ],
    icons: Object.assign(Object.fromEntries(Object.keys(ART).map(k => [k, () => ART[k]])), {
      water: H => `<path d="M-20 -34h40l-6 68h-28z" fill="#EAF6FF" ${H.S} stroke-width="6"/><path d="M-17 -8h34l-4 40h-26z" fill="#6EC6FF"/>`,
    }),
    vocab: [
      ['heywan', 'hayvan'],
      ['pisîk', 'kedi'],
      ['kûçik', 'köpek'],
      ['masî', 'balık'],
      ['mar', 'yılan'],
      ['mirîşk', 'tavuk'],
      ['çêlek', 'inek'],
      ['hesp', 'at'],
      ['mişk', 'fare'],
      ['pez', 'koyun'],
      ['çûk', 'kuş'],
    ],
    vocabTts: {
      ku: ['هەیوان', 'پسیک', 'کووچک', 'ماسی', 'مار', 'مریشک', 'چێلەک', 'هەسپ', 'مشک', 'پەز', 'چووک'],
      tr: ['hayvan', 'kedi', 'köpek', 'balık', 'yılan', 'tavuk', 'inek', 'at', 'fare', 'koyun', 'kuş'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const x of CARD) if (x[1]) out.push({ type: 'pop', at: T(x[0], 0) });
      for (const id of ['b02', 'c02']) out.push({ type: 'cross', at: T(id, .9) });
      for (const id of ['j03', 'j05', 'j07', 'j09', 'j11']) out.push({ type: 'ding', at: T(id, .6) });
      for (let k = 0; k < 4; k++) out.push({ type: 'splash', at: T('dw', .15 + k * .2) });
      out.push({ type: 'sweep', at: T('ew', .1) }, { type: 'boing', at: T('e04', .1) });
      for (let k = 0; k < 6; k++) out.push({ type: 'thud', at: T('hw', .08 + k * .14) });
      out.push({ type: 'sweep', at: T('iw', .2) }, { type: 'whoosh', at: T('i02', .2) }, { type: 'thud', at: T('i02', .55) });
      out.push({ type: 'rise', at: T('lw', .9) });
      for (let k = 0; k < 5; k++) out.push({ type: 'boing', at: T('mw', .08 + k * .16) });
      out.push({ type: 'thud', at: T('mw', .9) });
      out.push({ type: 'whoosh', at: T('l01', .05) }, { type: 'thud', at: T('l01', .35) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // havada yüzme
      if (t > T('dw', 0) && t < T('d05', .6)) { const p = t * 7; Rr.la = [100 + Math.sin(p) * 70, 120]; Rr.ra = [100 - Math.sin(p) * 70, 120]; Rr.dy = -Math.abs(Math.sin(p)) * 10; Rr.expr = 'happy'; Rr.tilt = Math.sin(p) * 8; Bb.expr = t < T('dw', .5) ? 'normal' : 'wide'; }
      // at gibi koşu: sağa sola dörtnala
      const h0 = T('hw', 0), h1 = T('hw', 1);
      if (t > h0 && t < h1) { const u = (t - h0) / (h1 - h0); Rr.x = H.RX + Math.sin(u * Math.PI * 2) * -160; Rr.look = Math.cos(u * Math.PI * 2) > 0 ? -1 : 1; Rr.walk = t * 4; Rr.dy = -Math.abs(Math.sin(t * 9)) * 30; Rr.la = [60, 100]; Rr.ra = [60, 100]; Rr.expr = 'happy'; }
      // fareden kaçıp masaya çıkar (oyun başına kadar)
      const j0 = T('i02', .2), j1 = T('i02', .55), b0 = T('l01', .05), b1 = T('l01', .4), TX = 250, TOP = 985 - (H.FLOOR - 10);
      if (t > j0 && t < b1) {
        let u = t < j1 ? H.eio(H.seg(t, j0, j1)) : t < b0 ? 1 : 1 - H.eio(H.seg(t, b0, b1));
        Rr.x = H.lerp(H.RX, TX, u); Rr.dy = H.lerp(0, TOP, u) - Math.sin(u * Math.PI) * 220 * ((t < j1 || t > b0) ? 1 : 0); Rr.look = t < b0 ? -1 : 1;
      }
      if (t > j1 && t < b0) Bb.look = -1;
      // koyun sayarken uyur
      if (t > T('l02', .6) && t < T('l04', 0)) { Rr.expr = 'sleep'; Rr.tilt = 14; Rr.dy = Math.sin(t * 2) * 4; }
      // kuş gibi uçmaya çalışır, düşer
      const w0 = T('mw', 0), w1 = T('mw', .85), w2 = T('m03', .6);
      if (t > w0 && t < w2) {
        if (t < w1) { const fl = Math.sin(t * 22); Rr.la = [90 + fl * 50, 90]; Rr.ra = [90 + fl * 50, 90]; Rr.dy = -Math.abs(Math.sin((t - w0) * 6)) * (40 + (t - w0) * 30); Rr.expr = 'happy'; Rr.walk = t * 5; }
        else { const u = H.eio(H.seg(t, w1, w1 + .25)); Rr.rot = -80 * u; Rr.dx = 200 * u; Rr.expr = 'dizzy'; Rr.la = [150, 176]; Rr.ra = [150, 176]; }
        Bb.expr = 'wide';
      }
      if (t >= w2 && t < T('m04', 0)) { const u = 1 - H.eio(H.seg(t, w2, w2 + .5)); Rr.rot = -80 * u; Rr.dx = 200 * u; }
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
      // oyuncak yılan gelirken
      if (t > T('ew', .3) && t < T('e04', 0)) { Rr.expr = 'wide'; Rr.look = 1; }
    },
    back(t, P, H) { // hayvan kartı tahtası
      const S = H.S, c = curCard(t, H);
      let s = `<g transform="translate(${PX} ${PY})"><path d="M-70 120l20 -40M70 120l-20 -40" ${S} stroke-width="8"/><rect x="-120" y="-130" width="240" height="220" rx="16" fill="#2E5E4E" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="188" rx="8" fill="#fff"/>`;
      if (c) {
        const a = H.T(c[0], 0), p = H.back(H.seg(t, a, a + .35));
        s += c[1] ? `<g transform="translate(0 -26) scale(${1.6 * p})">${ART[c[1]]}</g>` : `<text y="10" text-anchor="middle" font-size="110" font-weight="800" fill="#E53935" transform="scale(${p})">?</text>`;
        s += `<text y="60" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">${c[2]}</text>`;
      }
      return s + `</g>`;
    },
    front(t, P, H) {
      const T = H.T;
      let s = '';
      // "hi hi hi"
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // yüzerken kabarcıklar
      if (t > T('dw', 0) && t < T('d05', .6)) for (let k = 0; k < 4; k++) { const p = ((t * .9 + k / 4) % 1), x = P.R.x + 60 + Math.sin(k * 2 + t * 3) * 20, y = H.FLOOR - 420 - p * 160; s += `<circle cx="${x}" cy="${y}" r="${8 + k * 3}" fill="#BFE6FF" opacity="${1 - p}" ${H.S} stroke-width="3"/>`; }
      if (t > T('dw', .2) && t < T('dw', .9)) s += `<text x="${H.RX + 90}" y="${H.FLOOR - 330}" font-size="42" font-weight="800" fill="#2F7DE1">blub blub</text>`;
      // oyuncak yılan sürünerek gelir, sahnede kalır
      const e0 = T('ew', .2), e1 = T('ew', .9);
      if (t > e0 && t < T('f01', 0)) { const u = H.eout(H.seg(t, e0, e1)), x = H.lerp(1260, H.RX + 110, u); s += `<g transform="translate(${x} ${H.FLOOR - 24}) scale(-1.1 1.1) rotate(${Math.sin(t * 8) * 4})">${ART.mar}</g>`; if (t > T('e05', .5)) s += `<g transform="translate(${x} ${H.FLOOR - 120})"><rect x="-60" y="-22" width="120" height="44" rx="22" fill="#fff" ${H.S} stroke-width="5"/><text y="12" text-anchor="middle" font-size="28" font-weight="800" fill="${INKC}">lîstik</text></g>`; }
      // dörtnala toz bulutları
      if (t > T('hw', 0) && t < T('hw', 1)) for (let k = 0; k < 3; k++) { const p = ((t * 2 + k / 3) % 1); s += `<circle cx="${P.R.x - P.R.look * (40 + p * 80)}" cy="${H.FLOOR - 10 - p * 30}" r="${12 + p * 14}" fill="#E8D9BC" opacity="${1 - p}"/>`; }
      // koyun sayarken zzz
      if (t > T('l02', .6) && t < T('l04', 0)) for (let k = 0; k < 3; k++) { const p = ((t * .55 + k / 3) % 1); s += `<text x="${H.RX + 50 + p * 60}" y="${H.FLOOR - 470 - p * 110}" font-size="${34 + p * 34}" font-weight="800" fill="#5C6BC0" opacity="${1 - p}">z</text>`; }
      // uçma denemesinde tüyler
      if (t > T('mw', 0) && t < T('m03', .6)) for (let k = 0; k < 4; k++) { const p = ((t * 1.3 + k / 4) % 1); s += `<path d="M${P.R.x - 80 + k * 50} ${H.FLOOR - 300 + p * 200}q12 -10 24 0q-12 6 -24 0z" fill="#FFD23F" ${H.S} stroke-width="3" opacity="${1 - p}" transform="rotate(${p * 200} ${P.R.x - 68 + k * 50} ${H.FLOOR - 300 + p * 200})"/>`; }
      // fare koşar
      const m0 = T('iw', .1), m1 = T('i03', .5);
      if (t > m0 && t < m1) { const u = H.seg(t, m0, m1), x = H.lerp(1250, -300, u); s += `<g transform="translate(${x} ${H.FLOOR - 26}) scale(.9)">${ART.misk}</g>`; }
      return s;
    },
  };
})();
