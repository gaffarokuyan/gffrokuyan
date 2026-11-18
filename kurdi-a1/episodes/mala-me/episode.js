// "Mala me" — Dersa 15 pratiği (ev, odalar, eşyalar): Berfîn anlatır, Ronî karıştırır (mal→mar, mase→masî, sandalye yerine masa), Berfîn gülüp düzeltir.
// Sesler: ElevenLabs API (eleven_v4); Kürtçe metin sese ARAP HARFLİ yazımla verilir (tts alanı). Cümle sonundaki "…e" ەه ile yazılır.
// Listede 'mase' (v06k), Berfîn'in d04 repliğinden kesildi. Her sahne + konuşmacı tek uzun kayıt, Scribe kelime zamanlarıyla bölünür.
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
    B('a01', 'Ronî, îro dersa me *mal* e!', 'Ronî, bugünkü dersimiz ev!', '[cheerful] رۆنی، ئیرۆ دەرسا مە مالەه!', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Mal? Ne *mar*? Ez ji maran ditirsim!', 'Ev mi? Yılan değil mi? Ben yılanlardan korkarım!', '[nervous] مال؟ نە مار؟ ئەز ژ ماران دترسم!', { s: { pose: 'up', expr: 'wide', sweat: true } }),
    HA('a03', 'Na, ne mar — *mal*! Mala me!', 'Hayır, yılan değil — ev! Bizim evimiz!', '[laughs] نا، نە مار — مال! مالا مە!'),

    // ---------- derî ----------
    B('b01', 'Ev *derî* ye. Derî *veke*!', 'Bu kapı. Kapıyı aç!', '[warmly] ئەڤ دەری یە. دەری ڤەکە!'),
    { id: 'bw', wait: 2.2 },
    HA('b02', 'Derî *bigire*! Pir sar e!', 'Kapıyı kapat! Çok soğuk!', '[laughing] دەری بگرە! پر سارەه!', { gap: .1, s: { pose: 'face', expr: 'wide' } }),
    R('b03', 'Baş e, ez derî *digirim*.', 'Tamam, kapıyı kapatıyorum.', '[shivering] باشە، ئەز دەری دگرم.', { s: { pose: 'point', expr: 'sad', sweat: true } }),

    // ---------- pencere ----------
    B('c01', 'Ev *pencere* ye.', 'Bu pencere.', '[warmly] ئەڤ پەنجەرە یە.', { s: { pose: 'point', expr: 'happy' } }),
    R('c02', 'Pencere… an *wêne*?', 'Pencere mi… yoksa resim mi?', '[suspicious] Pencere… an wêne?' /* Latin: پەنجەرە Ronî'de "pancara" okunuyor */, { s: { pose: 'think', expr: 'smug' } }),
    HA('c03', 'Pencere ye, Ronî! Ne wêne!', 'Pencere Ronî! Resim değil!', '[laughs] پەنجەرە یە، رۆنی! نە وێنە!'),
    R('c04', 'Ez dixwazim *bizanim*.', 'Emin olmak istiyorum.', '[determined] ئەز دخوازم بزانم.', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'cw', wait: 2.6 },
    R('c05', 'Tak tak… Erê, pencere ye!', 'Tık tık… Evet, pencereymiş!', '[surprised] Tak, tak… Erê, pencere ye!', { gap: .1, s: { pose: 'cheer', expr: 'happy' } }),
    HA('c06', 'Ay Ronî!', 'Ay Ronî!', '[giggles] ئای رۆنی!'),

    // ---------- kursî + mase ----------
    B('d01', 'Ev *kursî* ye. Li ser kursiyê *rûne*.', 'Bu sandalye. Sandalyeye otur.', '[warmly] ئەڤ کورسی یە. ل سەر کورسیێ روونە.'),
    { id: 'dw', wait: 2.2 },
    HA('d02', 'Ronî! Ew *mase* ye, ne kursî!', 'Ronî! O masa, sandalye değil!', '[laughing] رۆنی! ئەو ماسە یە، نە کورسی!', { gap: .1, l: { pose: 'hips', expr: 'smug' } }),
    R('d03', 'Mase? *Masî*?', 'Masa mı? Balık mı?', '[confused] ماسە؟ ماسی؟', { s: { pose: 'shrug', expr: 'wide' } }),
    HA('d04', 'Ne masî — *mase*! Em li ser masê *dixwin*.', 'Balık değil — masa! Masada yemek yeriz.', '[giggles] نە ماسی — ماسە! ئەم ل سەر ماسێ دخون.'),
    R('d05', 'Dixwin? *Xwarin* heye?!', 'Yeriz mi? Yemek var mı?!', '[excited] دخون؟ خوارن هەیە؟!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),

    // ---------- metbex + sarinc ----------
    B('e01', 'Ev *metbex* e. Li vir *sarinc* heye.', 'Burası mutfak. Burada buzdolabı var.', '[warmly] ئەڤ مەتبەخەه. ل ڤر سارنج هەیە.'),
    R('e02', 'Sarinc!', 'Buzdolabı!', '[excited] سارنج!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    { id: 'ew', wait: 2.4 },
    R('e03', 'Brrr! Sarinc pir *sar* e! Lê *penîr* heye!', 'Brrr! Buzdolabı çok soğuk! Ama peynir var!', '[shivering] برررر! سارنج پر سارە! [happy] لێ پەنیر هەیە!', { gap: .1, s: { pose: 'show', expr: 'wide', shake: 1 }, then: [{ f: .6, s: { pose: 'cheer', expr: 'happy' } }] }),
    HA('e04', 'Tu *dîsa* birçî yî!', 'Yine açsın!', '[laughs] تو دیسا برچی یی!'),

    // ---------- nivîn ----------
    B('f01', 'Ev *odeya razanê* ye. Ev *nivîn* e.', 'Bu yatak odası. Bu yatak.', '[warmly] ئەڤ ئۆدەیا رازانێ یە. ئەڤ نڤینەه.'),
    R('f02', 'Nivîn! *Şev baş*!', 'Yatak! İyi geceler!', '[sleepy] نڤین! شەڤ باش!', { s: { pose: 'wave', expr: 'sleep' } }),
    { id: 'fw', wait: 2 },
    B('f03', 'Ronî! Hîn ne şev e! Saet *deh* e!', 'Ronî! Daha gece değil! Saat on!', '[frustrated] Ronî! Hîn ne şev e! Saet deh e!' /* Latin: Arap harfli "şeva, deha" okunuyor */, { gap: .1, s: { pose: 'up', expr: 'angry', red: .4 } }),
    R('f04', 'Pênc *deqîqe*…', 'Beş dakika…', '[sleepy] پێنج دەقیقە…', { s: { pose: 'idle', expr: 'sleep' } }),
    HA('f05', 'Ay Xwedê! Ev Ronî!', 'Aman Allahım! Bu Ronî!', '[laughs] ئای خوەدێ! ئەڤ رۆنی!'),

    // ---------- serşok ----------
    B('g01', 'Ev *serşok* e. Em li vir xwe *dişon*.', 'Bu banyo. Burada yıkanırız.', '[warmly] ئەڤ سەرشۆکەه. ئەم ل ڤر خوە دشۆن.'),
    R('g02', 'Ez *hefteyê carekê* xwe dişom!', 'Ben haftada bir yıkanırım!', '[proud] ئەز هەفتەیێ جارەکێ خوە دشۆم!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('g03', 'Hefteyê carekê?! Ronî, divê *her roj*!', 'Haftada bir mi?! Ronî, her gün olmalı!', '[shocked laugh] هەفتەیێ جارەکێ؟! رۆنی، دڤێ هەر رۆژ!', { s: { pose: 'face', expr: 'wide' } }),
    R('g04', 'Her roj? Pir *zêde* ye!', 'Her gün mü? Çok fazla!', '[shocked] هەر رۆژ؟ پر زێدە یە!', { s: { pose: 'up', expr: 'wide' } }),
    HA('g05', 'Ji ber vê yekê *pisîk* ji te direve!', 'Kedi bu yüzden senden kaçıyor!', '[giggles] ژ بەر ڤێ یەکێ پسیک ژ تە درەڤە!'),

    // ---------- televizyon ----------
    B('h01', 'Ev *televizyon* e.', 'Bu televizyon.', '[warmly] ئەڤ تەلەڤیزیۆنەه.'),
    R('h02', 'Ez her roj *deh saetan* li televizyonê temaşe dikim!', 'Her gün on saat televizyon izlerim!', '[proud] ئەز هەر رۆژ دەه سەعەتان ل تەلەڤیزیۆنێ تەماشە دکم!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('h03', 'Deh saet?! Ronî, *çavên* te dê biêşin!', 'On saat mi?! Ronî, gözlerin ağrır!', '[laughs] دەه سەعەت؟! رۆنی، چاڤێن تە دێ بئێشن!'),
    R('h04', 'Çavên min? *Çay*? Çay heye?', 'Gözlerim mi? Çay mı? Çay var mı?', '[excited] چاڤێن من؟ چای؟ چای هەیە؟', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    HA('h05', 'Ne çay — *çav*! Te dîsa dest pê kir!', 'Çay değil — göz! Yine başladın!', '[giggles] نە چای — چاڤ! تە دیسا دەست پێ کر!'),

    // ---------- qulf ----------
    B('k01', 'Ev *qulf* e. Bi qulfê em derî *digirin*.', 'Bu kilit. Kilitle kapıyı kilitleriz.', '[warmly] ئەڤ قولفەه. ب قولفێ ئەم دەری دگرن.'),
    R('k02', 'Ez *dizanim*! Binêre!', 'Biliyorum! Bak!', '[confident] ئەز دزانم! بنێرە!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'kw', wait: 2.4 },
    R('k03', 'Berfîn! Derî veke! Derî *qulf* bû!', 'Berfîn! Kapıyı aç! Kapı kilitlendi!', '[shouting] بەرفین! دەری ڤەکە! دەری قولف بوو!', { gap: .1 }),
    HA('k04', 'Hi hi! Derî *bi xwe* qulf bû!', 'Hi hi! Kapı kendi kendine kilitlendi!', '[laughs] دەری ب خوە قولف بوو!', { l: {} }),
    B('k05', 'Baş e, baş e. Ez *qulfê* vedikim.', 'Tamam, tamam. Kilidi açıyorum.', '[giggling] باشە، باشە. ئەز قولفێ ڤەدکم.', { s: { pose: 'point', expr: 'happy', look: 1 } }),
    { id: 'kw2', wait: 1.6 },
    R('k06', 'Spas! Derve pir *sar* bû!', 'Sağ ol! Dışarısı çok soğuktu!', '[shivering] سپاس! دەرڤە پر سار بوو!', { gap: .1, s: { pose: 'face', expr: 'sad', shake: 1 } }),

    // ---------- paqijî ----------
    B('l01', 'Niha em odeyê *paqij* bikin!', 'Şimdi odayı temizleyelim!', '[energetic] نها ئەم ئۆدەیێ پاقژ بکن!', { s: { pose: 'cheer', expr: 'happy' } }),
    R('l02', 'Paqij? Ez… *westiyayî* me.', 'Temizlik mi? Ben… yorgunum.', '[tired] پاقژ؟ ئەز… وەستیایی مە.', { s: { pose: 'down', expr: 'sad' } }),
    HA('l03', 'Tu her tim westiyayî yî! *Gezî* bigire!', 'Hep yorgunsun! Süpürgeyi al!', '[laughs] تو هەر تم وەستیایی یی! گەزی بگرە!'),
    { id: 'lw', wait: 2.4 },
    B('l04', 'Ehe ehe! Ronî, *hêdî*!', 'Öhö öhö! Ronî, yavaş!', '[coughing] رۆنی، هێدی!', { gap: .1, s: { pose: 'face', expr: 'sleep' } }),
    R('l05', 'Ez *zû* paqij dikim!', 'Ben hızlı temizlerim!', '[proud] ئەز زوو پاقژ دکم!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('l06', 'Hi hi! Niha mal ji berê *qirêjtir* e!', 'Hi hi! Ev şimdi öncekinden daha kirli!', '[laughing] نها مال ژ بەرێ قرێژترەه!'),

    // ---------- oyun ----------
    B('i01', 'Niha *lîstik*! Ez dibêjim, tu *nîşan* bide.', 'Şimdi oyun! Ben söylerim, sen göster.', '[energetic] نها لیستک! ئەز دبێژم، تو نیشان بدە.'),
    B('i02', '*Derî*!', 'Kapı!', '[energetic] دەری!', G),
    R('i03', 'Derî!', 'Kapı!', '[confident] دەری!', { ...G, s: OK }),
    B('i04', '*Pencere*!', 'Pencere!', '[energetic] پەنجەرە!', G),
    R('i05', 'Pencere… ne wêne!', 'Pencere… resim değil!', '[confident] Pencere… ne wêne!', { ...G, s: { pose: 'point', expr: 'smug', look: -1 } }),
    B('i06', '*Kursî*!', 'Sandalye!', '[energetic] کورسی!', G),
    R('i07', 'Ev mase ye… na — *kursî*!', 'Bu masa… yok — sandalye!', '[careful] ئەڤ ماسە یە… نا — کورسی!', { ...G, s: { pose: 'think', expr: 'normal' }, then: [{ f: .6, s: OK }] }),
    B('i08', '*Sarinc*!', 'Buzdolabı!', '[energetic] سارنج!', G),
    R('i09', '*Penîr*!', 'Peynir!', '[excited] پەنیر!', { ...G, s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    B('i10', '*Nivîn*!', 'Yatak!', '[energetic] نڤین!', G),
    R('i11', 'Şev baş…', 'İyi geceler…', '[sleepy] شەڤ باش…', { ...G, s: { pose: 'idle', expr: 'sleep' } }),
    HA('i12', 'Ronî! Lîstik *neqediya*!', 'Ronî! Oyun bitmedi!', '[laughs] رۆنی! لیستک نەقەدیا!', { gap: .6 }),

    // ---------- final ----------
    R('j01', 'Berfîn, mala te *çend* ode ye?', 'Berfîn, evin kaç oda?', '[curious] بەرفین، مالا تە چەند ئۆدە یە؟', { s: { pose: 'show', expr: 'happy' } }),
    B('j02', '*Sê* ode.', 'Üç oda.', '[warmly] سێ ئۆدە.', { s: { pose: 'show', expr: 'happy' } }),
    R('j03', 'Mala min jî sê ode ye: *metbex*, metbex û metbex!', 'Benim evim de üç oda: mutfak, mutfak ve mutfak!', '[proud] مالا من ژی سێ ئۆدە یە: مەتبەخ، مەتبەخ ئوو مەتبەخ!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('j04', 'Tu *tenê* metbexê dixwazî!', 'Sen sadece mutfak istiyorsun!', '[laughs] تو تەنێ مەتبەخێ دخوازی!'),
    R('j05', 'Erê! Metbex odeya *herî xweş* e!', 'Evet! Mutfak en güzel oda!', '[happy] ئەرێ! مەتبەخ ئۆدەیا هەری خوەشەه!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
  ];

  // ---------- çizimler ----------
  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const ART = {
    mal: `<rect x="-34" y="-6" width="68" height="46" fill="#FFE0B2" ${S0} stroke-width="5"/><path d="M-44 -6L0 -44L44 -6z" fill="#E53935" ${S0} stroke-width="5"/><rect x="-8" y="16" width="16" height="24" fill="#8D6E63" ${S0} stroke-width="4"/><rect x="-26" y="4" width="12" height="12" fill="#9FD8FF" ${S0} stroke-width="3"/><rect x="14" y="4" width="12" height="12" fill="#9FD8FF" ${S0} stroke-width="3"/>`,
    mar: `<path d="M-48 24q12 -24 28 0t28 0t28 -10q6 -16 -6 -26" fill="none" stroke="${INKC}" stroke-width="20" stroke-linecap="round"/><path d="M-48 24q12 -24 28 0t28 0t28 -10q6 -16 -6 -26" fill="none" stroke="#2EAD4B" stroke-width="12" stroke-linecap="round"/><ellipse cx="28" cy="-14" rx="16" ry="12" fill="#2EAD4B" ${S0} stroke-width="5"/><circle cx="32" cy="-18" r="4" fill="${INKC}"/>`,
    masi: `<path d="M-44 0q30 -34 66 0q-36 34 -66 0z" fill="#2F7DE1" ${S0} stroke-width="5"/><path d="M22 0l24 -20v40z" fill="#2F7DE1" ${S0} stroke-width="5"/><circle cx="-26" cy="-4" r="4" fill="${INKC}"/>`,
    kursi: `<path d="M-24 -44v84M24 0v40M-24 0h48" ${S0} stroke-width="7"/><rect x="-30" y="-6" width="60" height="12" rx="4" fill="#C98B4E" ${S0} stroke-width="5"/><rect x="-30" y="-50" width="14" height="50" rx="4" fill="#C98B4E" ${S0} stroke-width="5"/>`,
    mase: `<rect x="-46" y="-14" width="92" height="14" rx="5" fill="#C98B4E" ${S0} stroke-width="5"/><path d="M-36 0v36M36 0v36" ${S0} stroke-width="7"/>`,
    metbex: `<rect x="-40" y="-20" width="80" height="60" rx="6" fill="#ECEFF1" ${S0} stroke-width="5"/><rect x="-28" y="4" width="56" height="28" rx="4" fill="#37474F" ${S0} stroke-width="4"/><circle cx="-18" cy="-8" r="6" fill="#E53935" ${S0} stroke-width="3"/><circle cx="18" cy="-8" r="6" fill="#E53935" ${S0} stroke-width="3"/><path d="M-26 -20q-2 -14 14 -14h24q16 0 14 14" fill="#90A4AE" ${S0} stroke-width="4"/>`,
    sarinc: `<rect x="-28" y="-46" width="56" height="92" rx="8" fill="#E3F2FD" ${S0} stroke-width="5"/><path d="M-28 -10h56" ${S0} stroke-width="4"/><path d="M18 -36v14M18 0v20" ${S0} stroke-width="5"/><path d="M-14 -30l6 6M-16 -20l8 0" stroke="#6EC6FF" stroke-width="3"/>`,
    nivin: `<rect x="-46" y="0" width="92" height="22" rx="6" fill="#2F7DE1" ${S0} stroke-width="5"/><rect x="-46" y="-10" width="30" height="16" rx="8" fill="#fff" ${S0} stroke-width="4"/><path d="M-46 -26v62M46 4v32" ${S0} stroke-width="6"/>`,
    sersok: `<path d="M-44 0h88v10q0 26 -26 26h-36q-26 0 -26 -26z" fill="#fff" ${S0} stroke-width="5"/><path d="M30 0v-34q0 -10 -10 -10h-8" fill="none" ${S0} stroke-width="5"/><circle cx="8" cy="-44" r="6" fill="#B0BEC5" ${S0} stroke-width="3"/><path d="M8 -36l-4 10M14 -36l2 10M2 -36l-8 8" stroke="#6EC6FF" stroke-width="3" stroke-linecap="round"/><circle cx="-14" cy="-4" r="7" fill="#fff" stroke="#6EC6FF" stroke-width="3"/><circle cx="2" cy="-8" r="5" fill="#fff" stroke="#6EC6FF" stroke-width="3"/>`,
    penir: `<path d="M-36 14l36 -30l36 22v22h-72z" fill="#FFE082" ${S0} stroke-width="5"/><circle cx="-10" cy="16" r="5" fill="#FFC107"/><circle cx="14" cy="22" r="4" fill="#FFC107"/>`,
    tv: `<rect x="-46" y="-34" width="92" height="62" rx="8" fill="#37474F" ${S0} stroke-width="5"/><rect x="-38" y="-26" width="76" height="46" rx="4" fill="#6EC6FF"/><path d="M-14 28l-10 14M14 28l10 14" ${S0} stroke-width="5"/><path d="M-10 -34l-14 -14M10 -34l14 -14" ${S0} stroke-width="4"/>`,
    qulf: `<g transform="translate(0 -6) scale(.72)"><path d="M-22 -6v-16a22 22 0 0 1 44 0v16" fill="none" ${S0} stroke-width="8"/><rect x="-34" y="-8" width="68" height="52" rx="8" fill="#FFD23F" ${S0} stroke-width="5"/><circle cy="12" r="7" fill="${INKC}"/><path d="M0 14v14" ${S0} stroke-width="6"/></g>`,
    kilid: `<circle cx="-24" r="18" fill="#FFD23F" ${S0} stroke-width="5"/><circle cx="-24" r="6" fill="#fff" ${S0} stroke-width="3"/><path d="M-6 0h50v12M30 0v10" fill="none" ${S0} stroke-width="7"/>`,
    gezi: `<path d="M-30 -44l36 56" ${S0} stroke-width="7"/><path d="M-6 6l34 -10l14 44q-26 8 -44 -2z" fill="#FFC107" ${S0} stroke-width="5"/><path d="M8 10l8 28M20 6l10 28" stroke="${INKC}" stroke-width="3"/>`,
    ode: `<rect x="-40" y="-34" width="80" height="68" fill="#FFF3E0" ${S0} stroke-width="5"/><path d="M0 -34v68M-40 0h80" ${S0} stroke-width="4"/>`,
  };
  const CARD = [['a01', 'mal', 'mal'], ['b01', null, 'derî'], ['c01', null, 'pencere'], ['d01', 'kursi', 'kursî'], ['d02', 'mase', 'mase'], ['e01', 'metbex', 'metbex'], ['e02', 'sarinc', 'sarinc'], ['f01', 'nivin', 'nivîn'], ['g01', 'sersok', 'serşok'], ['h01', 'tv', 'televizyon'], ['k01', 'qulf', 'qulf'], ['l01', 'gezi', 'gezî'], ['i01', null, '?'], ['j01', 'ode', 'ode'], ['j03', 'metbex', 'metbex']];
  const PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455;
  const curCard = (t, H) => { let c = null; for (const x of CARD) if (t >= H.T(x[0], 0)) c = x; return c; };
  const CHX = 650; // sandalye konumu

  window.EP = {
    title: 'MALA ME',
    tag: 'Kurdî A1 · Dersa 15',
    noClock: true,
    table: () => ({}),
    vocabScale: .84,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'a02', f: .2, who: 'R', icon: 'mar', label: 'mar?' },
      { line: 'a03', f: .3, who: 'B', icon: 'mal', label: 'mal' },
      { line: 'c02', f: .5, who: 'R', icon: 'q', label: 'wêne?' },
      { line: 'd03', f: .4, who: 'R', icon: 'masi', label: 'masî?' },
      { line: 'd04', f: .3, who: 'B', icon: 'masi+no', label: 'ne masî' },
      { line: 'e03', f: .6, who: 'R', icon: 'penir', label: 'penîr!' },
      { line: 'f03', f: .6, who: 'B', icon: 'txt:10', label: 'saet deh' },
      { line: 'g02', f: .3, who: 'R', icon: 'txt:1/7', label: 'hefteyê carekê' },
      { line: 'g03', f: .55, who: 'B', icon: 'txt:7/7', label: 'her roj!' },
      { line: 'j02', f: .2, who: 'B', icon: 'txt:3', label: 'sê ode' },
      { line: 'j03', f: .45, who: 'R', icon: 'metbex', label: 'metbex ×3' },
    ],
    icons: Object.fromEntries(Object.keys(ART).map(k => [k, () => ART[k]])),
    vocab: [
      ['mal', 'ev'],
      ['ode', 'oda'],
      ['derî', 'kapı'],
      ['pencere', 'pencere'],
      ['kursî', 'sandalye'],
      ['mase', 'masa'],
      ['metbex', 'mutfak'],
      ['sarinc', 'buzdolabı'],
      ['nivîn', 'yatak'],
      ['serşok', 'banyo'],
      ['rûne', 'otur'],
    ],
    vocabTts: {
      ku: ['مال', 'ئۆدە', 'دەری', 'پەنجەرە', 'کورسی', 'ماسە', 'مەتبەخ', 'سارنج', 'نڤین', 'سەرشۆک', 'روونە'],
      tr: ['ev', 'oda', 'kapı', 'pencere', 'sandalye', 'masa', 'mutfak', 'buzdolabı', 'yatak', 'banyo', 'otur'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const x of CARD) if (x[1]) out.push({ type: 'pop', at: T(x[0], 0) });
      out.push({ type: 'whoosh', at: T('bw', .3) }, { type: 'sweep', at: T('bw', .4) }, { type: 'thud', at: T('b03', 1) + .2 });
      out.push({ type: 'pop', at: T('cw', .55) }, { type: 'pop', at: T('cw', .7) });
      out.push({ type: 'whoosh', at: T('dw', .25) }, { type: 'thud', at: T('dw', .55) }, { type: 'cross', at: T('d02', .1) });
      out.push({ type: 'pop', at: T('ew', .3) }, { type: 'sweep', at: T('ew', .5) });
      out.push({ type: 'thud', at: T('fw', .35) }, { type: 'boing', at: T('g02', .9) });
      out.push({ type: 'whoosh', at: T('kw', .4) }, { type: 'thud', at: T('kw', .5) }, { type: 'bonk', at: T('k03', .1) }, { type: 'sweep', at: T('kw2', .2) });
      for (let k = 0; k < 6; k++) out.push({ type: 'sweep', at: T('lw', .05 + k * .15) });
      for (const id of ['i03', 'i05', 'i07', 'i09']) out.push({ type: 'ding', at: T(id, .8) });
      out.push({ type: 'thud', at: T('i11', .6) }, { type: 'whoosh', at: T('j05', .9) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // kapıyı açar: soğuk rüzgâr
      if (t > T('bw', .1) && t < T('b03', 1)) { Rr.look = 1; Rr.ra = [80, 70]; if (t > T('bw', .35)) { Rr.expr = 'wide'; Rr.dx = Math.sin(t * 40) * 4; Rr.tilt = -10; Bb.expr = 'wide'; } }
      // pencereye gidip tıklatır
      const c0 = T('cw', 0), c1 = T('cw', .4), c2 = T('c05', 1), c3 = T('c06', 1);
      if (t > c0 && t < c3) { const u = t < c1 ? H.eio(H.seg(t, c0, c1)) : t < c2 ? 1 : 1 - H.eio(H.seg(t, c2, c3)); Rr.x = H.lerp(H.RX, 300, u); Rr.look = t < c2 ? -1 : 1; if (u > 0 && u < 1) Rr.walk = t * 3.4; if (t > c1 && t < c2) { Rr.la = [110, 150 + Math.sin(t * 20) * 14]; } Bb.look = -1; }
      // sandalye yerine masaya çıkar
      const d0 = T('dw', .1), d1 = T('dw', .55), d2 = T('d05', .2), d3 = T('d05', .8), TX = 250, TOP = 985 - (H.FLOOR - 10);
      if (t > d0 && t < d3) { const u = t < d1 ? H.eio(H.seg(t, d0, d1)) : t < d2 ? 1 : 1 - H.eio(H.seg(t, d2, d3)); Rr.x = H.lerp(H.RX, TX, u); Rr.dy = H.lerp(0, TOP, u) - Math.sin(u * Math.PI) * 200 * ((t < d1 || t > d2) ? 1 : 0); Rr.look = t < d2 ? -1 : 1; if (t > d1 && t < d2) Bb.look = -1; }
      // buzdolabından donmuş çıkar
      if (t > T('ew', .45) && t < T('e03', .6)) { Rr.expr = 'wide'; Rr.dx = Math.sin(t * 50) * 5; Rr.la = [20, 6]; Rr.ra = [20, 6]; }
      // yatağı görünce yere yatıp uyur
      const f0 = T('fw', .05), f1 = T('fw', .4), f2 = T('f04', 1), f3 = T('f05', .4);
      const lie = (u) => { Rr.rot = 90 * u; Rr.dx = -200 * u; Rr.dy = 12 * u; Rr.expr = 'sleep'; Rr.la = [20, 6]; Rr.ra = [20, 6]; };
      if (t > f0 && t < f3) lie(t < f1 ? H.eio(H.seg(t, f0, f1)) : t < f2 ? 1 : 1 - H.eio(H.seg(t, f2, f3)));
      // oyunda "nivîn" deyince yine yatar
      const g0 = T('i11', .1), g1 = T('i11', .5), g2 = T('i12', .7), g3 = T('j01', 0);
      if (t > g0 && t < g3) lie(t < g1 ? H.eio(H.seg(t, g0, g1)) : t < g2 ? 1 : 1 - H.eio(H.seg(t, g2, g3)));
      // oyunda kapıya / pencereye bakar
      if (t > T('i03', 0) && t < T('i04', 0)) { Rr.look = 1; Rr.ra = [90, 90]; }
      // kapıdan çıkar, dışarıda kalır, geri gelir
      const k0 = T('kw', .05), k1 = T('kw', .45), k2 = T('kw2', .3), k3 = T('kw2', .9);
      if (t > k0 && t < k3) { const u = t < k1 ? H.eio(H.seg(t, k0, k1)) : t < k2 ? 1 : 1 - H.eio(H.seg(t, k2, k3)); Rr.x = H.lerp(H.RX, 1020, u); Rr.look = t < k2 ? 1 : -1; if (u > 0 && u < 1) Rr.walk = t * 3.4; if (t > k1 + .1 && t < k2) Rr.show = false; Bb.look = 1; }
      // süpürür, toz kalkar
      if (t > T('lw', 0) && t < T('l06', 1)) { const p = t * 12; Rr.la = [60 + Math.sin(p) * 30, 40]; Rr.ra = [70 + Math.sin(p) * 30, 30]; Rr.dx = Math.sin(t * 6) * 40; Rr.look = -1; if (t < T('l04', 0)) Rr.expr = 'happy'; }
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
      // banyo: Berfîn burnunu tutar
      if (t > T('g02', .6) && t < T('g04', 1)) { Bb.ra = [116, 206]; }
    },
    back(t, P, H) {
      const S = H.S, T = H.T, c = curCard(t, H);
      // açık kapı (soğuk rüzgâr, kar)
      let s = '';
      const o0 = T('bw', .3), o1 = T('b03', .8);
      if (t > o0 && t < o1 + .3) {
        const op = t < o1 ? H.eout(H.seg(t, o0, o0 + .2)) : 1 - H.seg(t, o1, o1 + .3), DX = 912, DY = 608, DW = 168, hgt = H.FLOOR - 26 - DY;
        s += `<clipPath id="dc"><rect x="${DX}" y="${DY}" width="${DW * op}" height="${hgt}"/></clipPath><g clip-path="url(#dc)"><rect x="${DX}" y="${DY}" width="${DW}" height="${hgt}" fill="#B3D7F2"/>`;
        for (let k = 0; k < 22; k++) { const p = ((t * 1.4 + k * .37) % 1), x = DX + ((k * 53) % (DW + 60)) - p * 90, y = DY + p * hgt; s += `<circle cx="${x}" cy="${y}" r="${4 + (k % 3) * 2}" fill="#fff"/>`; }
        s += `</g><path d="M${DX + DW * op} ${DY}v${hgt}" ${S} stroke-width="9"/>`;
      }
      // sandalye (masa sahnesinde)
      if (t > T('d01', 0) && t < T('e01', 0)) { const p = H.back(H.seg(t, T('d01', 0), T('d01', 0) + .35)); s += `<g transform="translate(${CHX} ${H.FLOOR - 106}) scale(${2.4 * p})">${ART.kursi}</g>`; }
      // nesne kartı
      s += `<g transform="translate(${PX} ${PY})"><path d="M-70 120l20 -40M70 120l-20 -40" ${S} stroke-width="8"/><rect x="-120" y="-130" width="240" height="220" rx="16" fill="#2E5E4E" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="188" rx="8" fill="#fff"/>`;
      if (c) {
        const a = T(c[0], 0), p = H.back(H.seg(t, a, a + .35));
        s += c[1] ? `<g transform="translate(0 -26) scale(${1.6 * p})">${ART[c[1]]}</g>` : `<text y="10" text-anchor="middle" font-size="${c[2] === '?' ? 110 : 60}" font-weight="800" fill="${c[2] === '?' ? '#E53935' : '#2E5E4E'}" transform="scale(${p})">${c[2] === '?' ? '?' : '→'}</text>`;
        s += `<text y="62" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">${c[2]}</text>`;
      }
      s += `</g>`;
      // kapı / pencere / masa etiketleri (öğretildiği an)
      const tagAt = (x, y, txt, a, b) => { if (t < a || t > b) return ''; const p = H.back(H.seg(t, a, a + .3)); return `<g transform="translate(${x} ${y}) scale(${p})"><rect x="-80" y="-26" width="160" height="52" rx="26" fill="${INKC}"/><text y="13" text-anchor="middle" font-size="34" font-weight="800" fill="#FFD23F">${txt}</text></g>`; };
      s += tagAt(1020, 580, 'derî', T('b01', 0), T('c01', 0)) + tagAt(215, 490, 'pencere', T('c01', 0), T('d01', 0)) + tagAt(245, 935, 'mase', T('d02', 0), T('e01', 0)) + tagAt(CHX, H.FLOOR - 270, 'kursî', T('d01', 0), T('e01', 0));
      s += tagAt(1020, 580, 'derî', T('i02', 0), T('i04', 0)) + tagAt(215, 490, 'pencere', T('i04', 0), T('i06', 0));
      return s;
    },
    front(t, P, H) {
      const T = H.T;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // pencereye tık tık
      if (t > T('cw', .45) && t < T('cw', .95)) s += `<text x="330" y="${H.FLOOR - 470}" font-size="46" font-weight="800" fill="#2F7DE1">tak tak!</text>`;
      // buzdolabı: Ronî'nin önünde açık dolap, sonra buz kristalleri
      const e0 = T('ew', .05), e1 = T('ew', .45);
      if (t > e0 && t < e1) { const p = H.back(H.seg(t, e0, e0 + .25)); s += `<g transform="translate(${H.RX} ${H.FLOOR - 250}) scale(${3.4 * p})">${ART.sarinc}</g><text x="${H.RX}" y="${H.FLOOR - 120}" text-anchor="middle" font-size="40" font-weight="800" fill="#2F7DE1">nam nam…</text>`; }
      if (t > e1 && t < T('e03', .6)) { for (let k = 0; k < 7; k++) { const a = k * .9 + t, x = P.R.x + Math.cos(a) * 90, y = H.FLOOR - 400 + Math.sin(a * 1.3) * 120; s += `<path d="M${x} ${y - 12}v24M${x - 10} ${y - 6}l20 12M${x - 10} ${y + 6}l20 -12" stroke="#6EC6FF" stroke-width="4" stroke-linecap="round"/>`; } s += `<text x="${H.RX + 70}" y="${H.FLOOR - 470}" font-size="48" font-weight="800" fill="#2F7DE1">brrr!</text>`; }
      // yatarken zzz + yorgan
      const z = (t > T('fw', .4) && t < T('f05', .3)) || (t > T('i11', .5) && t < T('i12', .7));
      if (z) { for (let k = 0; k < 3; k++) { const p = ((t * .55 + k / 3) % 1); s += `<text x="${H.RX + 170 + p * 60}" y="${H.FLOOR - 80 - p * 110}" font-size="${34 + p * 34}" font-weight="800" fill="#5C6BC0" opacity="${1 - p}">z</text>`; } }
      // kapı çarpar: dışarıdan bağırır
      if (t > T('k03', 0) && t < T('k03', 1)) s += `<text x="1010" y="${H.FLOOR - 420}" text-anchor="middle" font-size="44" font-weight="800" fill="#E53935" transform="rotate(${Math.sin(t * 30) * 4} 1010 ${H.FLOOR - 420})">TAK TAK!</text>`;
      // süpürge + toz bulutu
      if (t > T('lw', 0) && t < T('l06', 1)) {
        const hx = P.R.x + (P.R.dx || 0) - 60; s += `<g transform="translate(${hx} ${H.FLOOR - 40}) rotate(${-20 + Math.sin(t * 12) * 18}) scale(1.6)">${ART.gezi}</g>`;
        const d = H.seg(t, T('lw', .1), T('l04', 0));
        for (let k = 0; k < 10; k++) { const a = k * 2.3 + t * .8, r = 40 + k * 18 * d; s += `<circle cx="${640 + Math.cos(a) * r * 2.2}" cy="${H.FLOOR - 160 + Math.sin(a) * r}" r="${30 + k * 4 * d}" fill="#C8B79A" opacity="${.55 * d}"/>`; }
      }
      // banyo: koku dalgaları
      if (t > T('g02', .6) && t < T('g05', 1)) for (let i = 0; i < 3; i++) { const p = ((t * 1.2 + i / 3) % 1); s += `<path d="M${P.R.x - 50 + i * 50} ${H.FLOOR - 200 - p * 160}q-12 -12 0 -24q12 -12 0 -24" fill="none" stroke="#8BC34A" stroke-width="6" stroke-linecap="round" opacity="${1 - p}"/>`; }
      return s;
    },
  };
})();
