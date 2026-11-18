// "Pîşe" — Dersa 16 pratiği (meslekler): Berfîn anlatır, Ronî her mesleği dener ve beceremez, Berfîn gülüp düzeltir.
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
    B('a01', 'Ronî, îro dersa me *pîşe* ne!', 'Ronî, bugünkü dersimiz meslekler!', '[cheerful] رۆنی، ئیرۆ دەرسا مە پیشە نە!', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Pîşe? *Pisîk*?', 'Meslek mi? Kedi mi?', '[confused] پیشە؟ پسیک؟', { s: { pose: 'shrug', expr: 'wide' } }),
    HA('a03', 'Ne pisîk — *pîşe*! *Kar*!', 'Kedi değil — meslek! İş!', '[laughs] نە پسیک — پیشە! کار!'),
    R('a04', 'Kar? Ez ji kar hez nakim. Ez ji *xewê* hez dikim!', 'İş mi? Ben işi sevmem. Uykuyu severim!', '[lazy] کار؟ ئەز ژ کار هەز ناکم. ئەز ژ خەوێ هەز دکم!', { s: { pose: 'idle', expr: 'sleep', tilt: 10 } }),
    HA('a05', 'Tu her tim *westiyayî* yî!', 'Sen hep yorgunsun!', '[giggles] تو هەر تم وەستیایی یی!'),

    // ---------- mamoste ----------
    B('b01', 'Ez *mamoste* me. Mamoste li *dibistanê* ders dide.', 'Ben öğretmenim. Öğretmen okulda ders verir.', '[proud] ئەز مامۆستا مە. مامۆستا ل دبستانێ دەرس ددە.'),
    R('b02', 'Ez jî mamoste me! Dersa îro: *xew*!', 'Ben de öğretmenim! Bugünkü ders: uyku!', '[proud] ئەز ژی مامۆستا مە! دەرسا ئیرۆ: خەو!', { s: { pose: 'point', expr: 'smug' } }),
    HA('b03', 'Ev ne *ders* e, Ronî!', 'Bu ders değil Ronî!', '[laughs] ئەڤ نە دەرسەه، رۆنی!'),

    // ---------- doktor ----------
    B('c01', 'Ev *doktor* e. Doktor *nexweşan* derman dike.', 'Bu doktor. Doktor hastaları tedavi eder.', '[warmly] ئەڤ دۆکتۆرەه. دۆکتۆر نەخوەشان دەرمان دکە.'),
    R('c02', 'Berfîn, tu *nexweş* î? Devê xwe veke.', 'Berfîn, hasta mısın? Ağzını aç.', '[serious] بەرفین، تو نەخوەشی؟ دەڤێ خوە ڤەکە.', { s: { pose: 'point', expr: 'normal' } }),
    B('c03', 'Aaa…', 'Aaa…', '[mouth open] Aaaaaa…', { s: { pose: 'idle', expr: 'wide' } }),
    R('c04', '*Dermanê* te: çay!', 'İlacın: çay!', '[confident] دەرمانێ تە: چای!', { s: { pose: 'show', expr: 'smug' } }),
    HA('c05', 'Çay ne *derman* e!', 'Çay ilaç değil!', '[laughs] چای نە دەرمانەه!'),
    R('c06', 'Ji bo *min* derman e!', 'Benim için ilaç!', '[happy] ژ بۆ من دەرمانەه!', { s: { pose: 'cheer', expr: 'happy', hop: 26 } }),

    // ---------- aşpêj ----------
    B('d01', 'Ev *aşpêj* e. Aşpêj xwarinê *çêdike*.', 'Bu aşçı. Aşçı yemek yapar.', '[warmly] ئەڤ ئاشپێژەه. ئاشپێژ خوارنێ چێدکە.'),
    R('d02', 'Ez aşpêjê *herî baş* im! Binêre!', 'Ben en iyi aşçıyım! Bak!', '[proud] ئەز ئاشپێژێ هەری باشم! بنێرە!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'dw', wait: 2.8 },
    HA('d03', 'Ronî! Xwarin *şewitî*!', 'Ronî! Yemek yandı!', '[laughing] رۆنی! خوارن شەوتی!', { gap: .1, s: { pose: 'face', expr: 'wide' } }),
    R('d04', 'Na… ev xwarina *reş* e. Ew *taybet* e!', 'Hayır… bu siyah yemek. Özel bir yemek!', '[nervous] نا… ئەڤ خوارنا رەشەه. ئەو تایبەتەه!', { s: { pose: 'show', expr: 'smug', sweat: true } }),

    B('d05', '*Agirkuj*! Agirkuj!', 'İtfaiyeci! İtfaiyeci!', '[panicked] ئاگرکوژ! ئاگرکوژ!', { s: { pose: 'up', expr: 'wide', shake: 1 } }),
    R('d06', 'Ez agirkuj im! *Av*!', 'Ben itfaiyeciyim! Su!', '[heroic] ئەز ئاگرکوژم! ئاڤ!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    { id: 'dw2', wait: 2 },
    B('d07', 'Ronî! Ez *şil* bûm!', 'Ronî! Sırılsıklam oldum!', '[laughing angrily] رۆنی! ئەز شل بووم!', { gap: .1, s: { pose: 'up', expr: 'angry', red: .4, shake: 1 } }),
    R('d08', 'Lê agir *vemirî*!', 'Ama yangın söndü!', '[proud] لێ ئاگر ڤەمری!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('d09', 'Hi hi! Baş e, *spas*… agirkujê min.', 'Hi hi! Peki, teşekkürler… benim itfaiyecim.', '[giggles] باشە، سپاس… ئاگرکوژێ من.'),

    // ---------- ajovan ----------
    B('e01', 'Ev *ajovan* e. Ajovan erebeyê *dajo*.', 'Bu şoför. Şoför araba sürer.', '[warmly] ئەڤ ئاجۆڤانەه. ئاجۆڤان ئەرەبەیێ داجۆ.'),
    R('e02', 'Ez *dikarim*! Vrrrm!', 'Ben yapabilirim! Vrrrm!', '[excited] ئەز دکارم! Vrrrrrm!', { s: { pose: 'cheer', expr: 'happy', hop: 26 } }),
    { id: 'ew', wait: 2.2 },
    HA('e03', 'Ronî, *hêdî* bajo!', 'Ronî, yavaş sür!', '[laughs] رۆنی، هێدی باجۆ!', { gap: .1, s: { pose: 'face', expr: 'wide' } }),
    R('e04', 'Ez nizanim çawa *bisekinim*!', 'Nasıl durulur bilmiyorum!', '[panicked] ئەز نزانم چاوا بسەکنم!', { gap: .1, s: { pose: 'up', expr: 'wide', sweat: true } }),
    { id: 'ew2', wait: 1.4 },
    HA('e05', 'Hi hi! Tu ajovanê herî *xirab* î!', 'Hi hi! Sen en kötü şoförsün!', '[giggles] تو ئاجۆڤانێ هەری خراب ی!', { gap: .1 }),

    // ---------- polîs ----------
    B('f01', 'Ev *polîs* e. Polîs *alîkariya* mirovan dike.', 'Bu polis. Polis insanlara yardım eder.', '[warmly] ئەڤ پۆلیسەه. پۆلیس ئالیکاریا مرۆڤان دکە.'),
    R('f02', '*Raweste*! Tu girtî yî!', 'Dur! Tutuklusun!', '[commanding] راوەستە! تو گرتی یی!', { s: { pose: 'point', expr: 'angry' } }),
    B('f03', '*Çima*?', 'Neden?', '[surprised] چما؟', { s: { pose: 'shrug', expr: 'wide' } }),
    R('f04', 'Ji ber ku tu pir *xweşik* î!', 'Çünkü çok güzelsin!', '[charming] ژ بەر کو تو پر خوەشکی!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('f05', 'Ay Ronî!', 'Ay Ronî!', '[giggles] ئای رۆنی!', { s: { pose: 'face', expr: 'happy', red: .6 } }),

    // ---------- cotkar ----------
    B('g01', 'Ev *cotkar* e. Cotkar li *zeviyê* dixebite.', 'Bu çiftçi. Çiftçi tarlada çalışır.', '[warmly] ئەڤ جۆتکارەه. جۆتکار ل زەڤیێ دخەبتە.'),
    R('g02', '*Dixebite*? Kar? …Ez westiyayî me.', 'Çalışır mı? İş mi? …Ben yorgunum.', '[tired] دخەبتە؟ کار؟… ئەز وەستیایی مە.', { s: { pose: 'down', expr: 'sad' } }),
    { id: 'gw', wait: 1.6 },
    HA('g03', 'Hi hi! Dîsa *xew*!', 'Hi hi! Yine uyku!', '[laughs] دیسا خەو!', { gap: .1 }),

    // ---------- stranbêj ----------
    B('h01', 'Ev *stranbêj* e. Stranbêj *stranan* dibêje.', 'Bu şarkıcı. Şarkıcı şarkı söyler.', '[warmly] ئەڤ سترانبێژەه. سترانبێژ ستران دبێژە.'),
    R('h02', 'Ez stranbêjê herî baş im! *Guhdarî* bike!', 'Ben en iyi şarkıcıyım! Dinle!', '[proud] ئەز سترانبێژێ هەری باشم! گوهداری بکە!', { s: { pose: 'hips', expr: 'smug' } }),
    R('h03', 'Laaa laaa… Berfîîîn… *çaaay*…', 'Laaa laaa… Berfîîîn… çaaay…', '[singing badly, off-key] Laaa, laaa… Berfîîîîn… çaaaay…', { gap: .3, s: { pose: 'up', expr: 'sleep' } }),
    HA('h04', 'Bes e, bes e! *Guhên* min diêşin!', 'Yeter, yeter! Kulaklarım ağrıyor!', '[laughing] بەسە، بەسە! گوهێن من دئێشن!', { gap: .1, s: { pose: 'face', expr: 'sleep' }, then: [] }),
    R('h05', 'Tu ji *muzîkê* fêm nakî!', 'Sen müzikten anlamıyorsun!', '[offended] تو ژ موزیکێ فێم ناکی!', { s: { pose: 'hips', expr: 'angry', red: .3 } }),

    // ---------- pîlot ----------
    B('k01', 'Ev *pîlot* e. Pîlot *balafirê* dajo.', 'Bu pilot. Pilot uçak kullanır.', '[warmly] ئەڤ پیلۆتەه. پیلۆت بالافرێ داجۆ.'),
    R('k02', 'Pîlot? Ez dikarim *bifirim*! Binêre!', 'Pilot mu? Ben uçabilirim! Bak!', '[excited] پیلۆت؟ ئەز دکارم بفرم! بنێرە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    { id: 'kw', wait: 2.6 },
    HA('k03', 'Ronî! Pîlot bi *balafirê* difire, ne bi destan!', 'Ronî! Pilot uçakla uçar, kollarıyla değil!', '[laughing] رۆنی! پیلۆت ب بالافرێ دفرە، نە ب دەستان!', { gap: .1 }),
    R('k04', 'Ez dizanim… *sibê*!', 'Biliyorum… yarın!', '[stubborn] ئەز دزانم… سبێ!', { s: { pose: 'hips', expr: 'smug', tilt: 8 } }),

    // ---------- berber ----------
    B('l01', 'Ev *berber* e. Berber *por* jê dike.', 'Bu berber. Berber saç keser.', '[warmly] ئەڤ بەربەرەه. بەربەر پۆر ژێ دکە.'),
    R('l02', 'Ez berber im! Ez porê *xwe* jê dikim!', 'Ben berberim! Kendi saçımı keserim!', '[confident] ئەز بەربەرم! ئەز پۆرێ خوە ژێ دکم!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'lw', wait: 2.2 },
    HA('l03', 'Ronî! Serê te dîsa *keçel* e!', 'Ronî! Kafan yine kel!', '[bursts out laughing] رۆنی! سەرێ تە دیسا کەچەلە!', { gap: .1 }),
    R('l04', 'Na! Porê min heye… *yek*!', 'Hayır! Saçım var… bir tane!', '[proud] نا! پۆرێ من هەیە… یەک!', { s: { pose: 'hips', expr: 'angry', red: .3 } }),
    HA('l05', 'Tu berberê herî *xirab* î!', 'Sen en kötü berbersin!', '[giggles] تو بەربەرێ هەری خرابی!'),

    // ---------- oyun ----------
    B('i01', 'Niha *lîstik*! Ev kumê *kê* ye?', 'Şimdi oyun! Bu kimin şapkası?', '[energetic] نها لیستک! ئەڤ کومێ کێ یە؟'),
    R('i02', '*Aşpêj*!', 'Aşçı!', '[confident] ئاشپێژ!', { ...G, s: OK }),
    B('i03', 'Û ev?', 'Ya bu?', '[curious] ئوو ئەڤ؟', G),
    R('i04', '*Polîs*!', 'Polis!', '[confident] پۆلیس!', { ...G, s: OK }),
    B('i05', 'Û ev?', 'Ya bu?', '', G),
    R('i06', '*Cotkar*!', 'Çiftçi!', '[confident] جۆتکار!', { ...G, s: OK }),
    B('i07', 'Û ev?', 'Ya bu?', '', G),
    R('i08', '*Doktor*! Dermanê te: çay!', 'Doktor! İlacın: çay!', '[playful] دۆکتۆر! دەرمانێ تە: چای!', { ...G, s: { pose: 'show', expr: 'smug' } }),
    HA('i09', 'Aferîn! Lê ne çay!', 'Aferin! Ama çay değil!', '[giggles] ئافەرین! لێ نە چای!'),

    // ---------- final ----------
    B('j01', 'Ronî, tu dixwazî bibî *çi*?', 'Ronî, ne olmak istersin?', '[curious] رۆنی، تو دخوازی ببی چ؟', { s: { pose: 'show', expr: 'happy' } }),
    R('j02', 'Ez dixwazim bibim *aşpêj*! Lê ez tenê *dixwim*, çênakim!', 'Aşçı olmak istiyorum! Ama sadece yerim, pişirmem!', '[happy] ئەز دخوازم ببم ئاشپێژ! لێ ئەز تەنێ دخوم، چێناکم!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    HA('j03', 'Ew ne *pîşe* ye!', 'Bu meslek değil!', '[laughs] ئەو نە پیشە یە!'),
    R('j04', 'Ji bo min pîşe ye!', 'Benim için meslek!', '[proud] ژ بۆ من پیشە یە!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('j05', 'Ay Xwedê! Ev Ronî!', 'Aman Allahım! Bu Ronî!', '[laughing] ئای خوەدێ! ئەڤ رۆنی!', { l: { pose: 'cheer', expr: 'happy' } }),
  ];

  // ---------- çizimler ----------
  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const ART = {
    mamoste: `<rect x="-46" y="-36" width="92" height="60" rx="4" fill="#2E5E4E" ${S0} stroke-width="5"/><path d="M-30 -18h40M-30 -4h24" stroke="#fff" stroke-width="4" stroke-linecap="round"/><text x="22" y="2" font-size="18" font-weight="800" fill="#fff">A B</text><path d="M-30 24v16M30 24v16" ${S0} stroke-width="5"/>`,
    doktor: `<rect x="-40" y="-20" width="80" height="54" rx="10" fill="#fff" ${S0} stroke-width="5"/><path d="M-14 -20v-10h28v10" fill="none" ${S0} stroke-width="5"/><path d="M-6 -6h12v10h10v12h-10v10h-12v-10h-10v-12h10z" fill="#E53935"/>`,
    aspej: `<path d="M-26 20v-16q-22 -6 -12 -26q8 -14 22 -6q8 -18 24 -4q20 -8 22 10q10 18 -12 26v16z" fill="#fff" ${S0} stroke-width="5"/><rect x="-26" y="16" width="52" height="16" fill="#fff" ${S0} stroke-width="5"/>`,
    ajovan: `<path d="M-46 14v-14q4 -10 16 -12l10 -18h40l14 18q14 2 12 12v14z" fill="#E53935" ${S0} stroke-width="5"/><path d="M-16 -10l6 -12h14v12zM10 -10v-12h10l8 12z" fill="#9FD8FF" ${S0} stroke-width="3"/><circle cx="-26" cy="16" r="10" fill="#37474F" ${S0} stroke-width="4"/><circle cx="26" cy="16" r="10" fill="#37474F" ${S0} stroke-width="4"/>`,
    polis: `<path d="M-40 -6q40 -30 80 0l-8 14h-64z" fill="#1A237E" ${S0} stroke-width="5"/><path d="M-36 8h72q4 10 -6 14h-60q-10 -4 -6 -14z" fill="#283593" ${S0} stroke-width="4"/><path d="M0 -20l6 6l-6 8l-6 -8z" fill="#FFD23F" ${S0} stroke-width="3"/>`,
    cotkar: `<ellipse cy="10" rx="48" ry="10" fill="#E8C268" ${S0} stroke-width="5"/><path d="M-24 8q0 -32 24 -32t24 32" fill="#E8C268" ${S0} stroke-width="5"/><path d="M-24 2h48" stroke="#E53935" stroke-width="6"/>`,
    agirkuj: `<path d="M-40 10q0 -40 40 -40t40 40z" fill="#E53935" ${S0} stroke-width="5"/><path d="M-50 10h100l-6 10h-88z" fill="#C62828" ${S0} stroke-width="5"/><path d="M0 -30v40" stroke="#FFD23F" stroke-width="6"/><circle cy="-6" r="10" fill="#FFD23F" ${S0} stroke-width="3"/>`,
    stranbej: `<circle cx="0" cy="-22" r="18" fill="#90A4AE" ${S0} stroke-width="5"/><path d="M-6 -4l-6 44h24l-6 -44" fill="#37474F" ${S0} stroke-width="5"/><path d="M26 -34q10 -6 10 8M36 -30q12 -10 12 6" fill="none" ${S0} stroke-width="4"/><circle cx="26" cy="-24" r="5" fill="${INKC}"/>`,
    pilot: `<path d="M-50 4l40 -6l14 -26h10l-6 26l40 -4l4 10l-44 10l6 26h-10l-14 -24l-40 4z" fill="#ECEFF1" ${S0} stroke-width="5"/>`,
    berber: `<circle cx="-18" cy="20" r="12" fill="none" ${S0} stroke-width="6"/><circle cx="18" cy="20" r="12" fill="none" ${S0} stroke-width="6"/><path d="M-10 10l34 -50M10 10l-34 -50" ${S0} stroke-width="6"/>`,
    tea: `<ellipse cy="30" rx="34" ry="8" fill="#fff" ${S0} stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" ${S0} stroke-width="5"/>`,
    pisik: `<ellipse cy="18" rx="30" ry="22" fill="#FF9F43" ${S0} stroke-width="5"/><circle cy="-16" r="24" fill="#FF9F43" ${S0} stroke-width="5"/><path d="M-20 -30l-4 -24l16 12zM20 -30l4 -24l-16 12z" fill="#FF9F43" ${S0} stroke-width="5"/><circle cx="-9" cy="-18" r="4" fill="${INKC}"/><circle cx="9" cy="-18" r="4" fill="${INKC}"/>`,
  };
  // Ronî'nin kostümü: [şapka, başlangıç, bitiş]
  const HAT = [['mamoste', 'b02', 'c01'], ['doktor', 'c02', 'd01'], ['aspej', 'd02', 'd05'], ['agirkuj', 'd06', 'e01'], ['polis', 'f02', 'g01'], ['cotkar', 'g02', 'h01'], ['pilot', 'k02', 'l01']];
  const CARD = [['a03', null, 'pîşe'], ['b01', 'mamoste', 'mamoste'], ['c01', 'doktor', 'doktor'], ['d01', 'aspej', 'aşpêj'], ['d05', 'agirkuj', 'agirkuj'], ['e01', 'ajovan', 'ajovan'], ['f01', 'polis', 'polîs'], ['g01', 'cotkar', 'cotkar'], ['h01', 'stranbej', 'stranbêj'], ['k01', 'pilot', 'pîlot'], ['l01', 'berber', 'berber'],
    ['i01', 'aspej', '?'], ['i03', 'polis', '?'], ['i05', 'cotkar', '?'], ['i07', 'doktor', '?'], ['j01', null, '?']];
  const PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455;
  const curCard = (t, H) => { let c = null; for (const x of CARD) if (t >= H.T(x[0], 0)) c = x; return c; };
  const hatArt = {
    mamoste: H => `<circle cx="-20" cy="2" r="14" fill="none" ${H.S} stroke-width="5"/><circle cx="20" cy="2" r="14" fill="none" ${H.S} stroke-width="5"/><path d="M-6 2h12" ${H.S} stroke-width="5"/>`,
    doktor: H => `<path d="M-30 70q0 40 30 46q30 -6 30 -46" fill="none" stroke="#546E7A" stroke-width="7"/><circle cy="118" r="10" fill="#B0BEC5" ${H.S} stroke-width="4"/>`,
    aspej: H => `<g transform="translate(0 -60) scale(1.4)">${ART.aspej}</g>`,
    polis: H => `<g transform="translate(0 -52) scale(1.45)">${ART.polis}</g>`,
    cotkar: H => `<g transform="translate(0 -46) scale(1.6)">${ART.cotkar}</g>`,
    agirkuj: H => `<g transform="translate(0 -52) scale(1.45)">${ART.agirkuj}</g>`,
    pilot: H => `<g transform="translate(0 -52) scale(1.45)"><path d="M-40 -6q40 -30 80 0l-8 14h-64z" fill="#37474F" ${H.S} stroke-width="5"/><path d="M-36 8h72q4 10 -6 14h-60q-10 -4 -6 -14z" fill="#263238" ${H.S} stroke-width="4"/><path d="M-14 -14h28l-4 6h-20z" fill="#FFD23F"/></g>`,
  };

  window.EP = {
    title: 'PÎŞE',
    tag: 'Kurdî A1 · Dersa 16',
    noClock: true,
    table: () => ({}),
    vocabScale: .78,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'a02', f: .4, who: 'R', icon: 'pisik', label: 'pisîk?' },
      { line: 'a04', f: .5, who: 'R', icon: 'zzz', label: 'xew' },
      { line: 'b02', f: .55, who: 'R', icon: 'zzz', label: 'dersa xewê' },
      { line: 'c04', f: .3, who: 'R', icon: 'tea', label: 'derman: çay' },
      { line: 'c05', f: .2, who: 'B', icon: 'tea+no', label: 'ne derman' },
      { line: 'f04', f: .4, who: 'R', icon: 'heart', label: 'xweşik' },
      { line: 'j02', f: .5, who: 'R', icon: 'aspej', label: 'aşpêj' },
    ],
    icons: Object.fromEntries(Object.keys(ART).map(k => [k, () => ART[k]])),
    vocab: [
      ['pîşe', 'meslek'],
      ['kar', 'iş'],
      ['mamoste', 'öğretmen'],
      ['doktor', 'doktor'],
      ['derman', 'ilaç'],
      ['aşpêj', 'aşçı'],
      ['agirkuj', 'itfaiyeci'],
      ['ajovan', 'şoför'],
      ['polîs', 'polis'],
      ['cotkar', 'çiftçi'],
      ['stranbêj', 'şarkıcı'],
      ['pîlot', 'pilot'],
    ],
    vocabTts: {
      ku: ['پیشە', 'کار', 'مامۆستا', 'دۆکتۆر', 'دەرمان', 'ئاشپێژ', 'ئاگرکوژ', 'ئاجۆڤان', 'پۆلیس', 'جۆتکار', 'سترانبێژ', 'پیلۆت'],
      tr: ['meslek', 'iş', 'öğretmen', 'doktor', 'ilaç', 'aşçı', 'itfaiyeci', 'şoför', 'polis', 'çiftçi', 'şarkıcı', 'pilot'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const x of CARD) if (x[1]) out.push({ type: 'pop', at: T(x[0], 0) });
      for (const [, a] of HAT) out.push({ type: 'boing', at: T(a, 0) });
      for (let k = 0; k < 4; k++) out.push({ type: 'pop', at: T('dw', .1 + k * .12) });
      out.push({ type: 'whoosh', at: T('dw', .6) }, { type: 'cross', at: T('d03', .05) });
      out.push({ type: 'whoosh', at: T('dw2', .05) }, { type: 'splash', at: T('dw2', .45) });
      for (let k = 0; k < 5; k++) out.push({ type: 'boing', at: T('kw', .08 + k * .16) });
      out.push({ type: 'thud', at: T('kw', .9) });
      for (let k = 0; k < 5; k++) out.push({ type: 'pop', at: T('lw', .05 + k * .12) });
      out.push({ type: 'boing', at: T('lw', .6) });
      out.push({ type: 'whoosh', at: T('ew', .05) }, { type: 'bonk', at: T('ew2', .15) }, { type: 'thud', at: T('ew2', .3) });
      out.push({ type: 'ding', at: T('f05', .1) }, { type: 'thud', at: T('gw', .4) });
      for (const id of ['i02', 'i04', 'i06', 'i08']) out.push({ type: 'ding', at: T(id, .6) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      for (const [k, a, b] of HAT) if (t >= T(a, 0) && t < T(b, 0) && k !== 'mamoste' && k !== 'doktor') Rr.noCap = true;
      // yemek pişirir: masaya gider, karıştırır
      const d0 = T('dw', 0), d1 = T('dw', .25), d2 = T('d09', 1), d3 = T('e01', .3);
      if (t > d0 && t < d3) { const u = t < d1 ? H.eio(H.seg(t, d0, d1)) : t < d2 ? 1 : 1 - H.eio(H.seg(t, d2, d3)); Rr.x = H.lerp(H.RX, 360, u); Rr.look = t < d2 ? -1 : 1; if (u > 0 && u < 1) Rr.walk = t * 3.4; if (t > d1 && t < T('d03', 0)) { Rr.la = [80 + Math.sin(t * 14) * 20, 60]; Rr.expr = 'happy'; } Bb.look = -1; }
      // araba: kapıya doğru sürer, çarpar, geri seker
      const e0 = T('ew', 0), e1 = T('ew2', .15), e2 = T('ew2', .6);
      if (t > e0 && t < T('e05', 1)) {
        let x;
        if (t < e1) { const u = H.seg(t, e0, e1); x = H.lerp(H.RX, 1000, u * u); Rr.look = 1; Rr.walk = t * 5; Rr.dx = Math.sin(t * 40) * 2; }
        else { const u = H.eout(H.seg(t, e1, e2)); x = H.lerp(1000, 880, u); Rr.expr = 'dizzy'; Rr.rot = -10 * (1 - u) + Math.sin(t * 3) * 3; }
        Rr.x = x; Rr.la = [70, 60]; Rr.ra = [70, 60]; Bb.look = 1;
      }
      if (t >= T('e05', 1) && t < T('f01', .5)) { const u = H.eio(H.seg(t, T('e05', 1), T('f01', .5))); Rr.x = H.lerp(880, H.RX, u); Rr.walk = t * 3; Rr.look = -1; }
      // çiftçi: yorulup yatar
      const g0 = T('gw', .1), g1 = T('gw', .4), g2 = T('g03', 1), g3 = T('h01', .25);
      if (t > g0 && t < g3) { const u = t < g1 ? H.eio(H.seg(t, g0, g1)) : t < g2 ? 1 : 1 - H.eio(H.seg(t, g2, g3)); Rr.rot = 90 * u; Rr.dx = -200 * u; Rr.dy = 12 * u; Rr.expr = 'sleep'; Rr.la = [20, 6]; Rr.ra = [20, 6]; }
      // doktor: Berfîn ağzını açar
      if (t > T('c03', 0) && t < T('c03', 1)) Bb.mouth = .9;
      // polis: Berfîn kızarır
      if (t > T('f04', .7) && t < T('g01', 0)) Bb.red = .55;
      // su atar: Berfîn ıslanır
      if (t > T('dw2', 0) && t < T('dw2', .5)) { Rr.la = [150, 176]; Rr.ra = [150, 176]; Rr.look = 1; }
      // şarkı: Berfîn kulaklarını kapatır
      if (t > T('h03', .1) && t < T('h04', 1)) { Bb.la = [112, 212]; Bb.ra = [112, 212]; Bb.expr = 'sleep'; Bb.dx = Math.sin(t * 30) * 3; }
      if (t > T('h03', 0) && t < T('h03', 1)) { Rr.tilt = Math.sin(t * 4) * 10; }
      // pilot gibi uçmaya çalışır, düşer
      const w0 = T('kw', 0), w1 = T('kw', .85), w2 = T('k03', .6);
      if (t > w0 && t < w2) {
        if (t < w1) { const fl = Math.sin(t * 22); Rr.la = [90 + fl * 50, 90]; Rr.ra = [90 + fl * 50, 90]; Rr.dy = -Math.abs(Math.sin((t - w0) * 6)) * (40 + (t - w0) * 30); Rr.expr = 'happy'; Rr.walk = t * 5; }
        else { const u = H.eio(H.seg(t, w1, w1 + .25)); Rr.rot = -80 * u; Rr.dx = 200 * u; Rr.expr = 'dizzy'; Rr.la = [150, 176]; Rr.ra = [150, 176]; }
        Bb.expr = 'wide';
      }
      if (t >= w2 && t < T('k04', 0)) { const u = 1 - H.eio(H.seg(t, w2, w2 + .5)); Rr.rot = -80 * u; Rr.dx = 200 * u; }
      // kendi saçını keser → kel
      if (t > T('lw', 0) && t < T('lw', .7)) { Rr.la = [150, 200]; Rr.ra = [150, 200]; Rr.expr = 'happy'; Rr.dx = Math.sin(t * 30) * 3; }
      if (t > T('lw', .55) && t < T('i01', 0)) Rr.noCap = true;
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
    },
    back(t, P, H) {
      const S = H.S, T = H.T, c = curCard(t, H);
      let s = `<g transform="translate(${PX} ${PY})"><path d="M-70 120l20 -40M70 120l-20 -40" ${S} stroke-width="8"/><rect x="-120" y="-130" width="240" height="220" rx="16" fill="#2E5E4E" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="188" rx="8" fill="#fff"/>`;
      if (c) {
        const a = T(c[0], 0), p = H.back(H.seg(t, a, a + .35));
        s += c[1] ? `<g transform="translate(0 -26) scale(${1.6 * p})">${ART[c[1]]}</g>` : `<text y="10" text-anchor="middle" font-size="${c[2] === '?' ? 110 : 64}" font-weight="800" fill="${c[2] === '?' ? '#E53935' : '#2E5E4E'}" transform="scale(${p})">${c[2] === '?' ? '?' : 'KAR'}</text>`;
        s += `<text y="62" text-anchor="middle" font-size="36" font-weight="800" fill="${INKC}">${c[2]}</text>`;
      }
      s += `</g>`;
      // yemek: tencere + duman
      if (t > T('dw', .2) && t < T('e01', .3)) {
        const burn = H.seg(t, T('dw', .5), T('d03', .2)), out = t > T('dw2', .5);
        s += `<g transform="translate(250 ${985 - 6})"><path d="M-46 -60h92v50q0 10 -10 10h-72q-10 0 -10 -10z" fill="#90A4AE" ${S} stroke-width="6"/><path d="M-58 -50h12M46 -50h12" ${S} stroke-width="7"/><ellipse cy="-60" rx="46" ry="9" fill="${burn > .5 ? '#2b2b2b' : '#FF9F43'}" ${S} stroke-width="5"/></g>`;
        for (let k = 0; k < 6; k++) { const p = ((t * .7 + k / 6) % 1), x = 240 + Math.sin(k * 2 + t * 2) * 20, r = 16 + p * 40 * (1 + burn); s += `<circle cx="${x}" cy="${985 - 80 - p * 260}" r="${r}" fill="${burn > .3 ? '#444' : '#ddd'}" opacity="${(1 - p) * (.5 + burn * .4)}"/>`; }
        if (burn > .4 && !out) for (let k = 0; k < 3; k++) { const f = Math.sin(t * 20 + k) * 6; s += `<path d="M${226 + k * 20} ${985 - 66}q${-10 + f} -30 0 -50q${10 + f} 20 0 50z" fill="${k % 2 ? '#FF9F43' : '#E53935'}"/>`; }
      }
      return s;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // kostüm (başın üstünde)
      if (Rr.show !== false) for (const [k, a, b] of HAT) if (t >= T(a, 0) && t < T(b, 0)) {
        const p = H.back(H.seg(t, T(a, 0), T(a, 0) + .3)), hx = Rr.x + (Rr.dx || 0), hy = H.FLOOR - 10 + (Rr.dy || 0) - 394;
        s += `<g transform="rotate(${Rr.rot || 0} ${hx} ${H.FLOOR - 10 + (Rr.dy || 0)}) translate(${hx} ${hy}) rotate(${Rr.tilt || 0}) scale(${p})">${hatArt[k](H)}</g>`;
      }
      // direksiyon
      if (t > T('e02', .3) && t < T('e05', 1)) { const hx = Rr.x + (Rr.dx || 0) + 40, hy = H.FLOOR - 270; s += `<g transform="translate(${hx} ${hy}) rotate(${Math.sin(t * 9) * 30})"><circle r="38" fill="none" stroke="${INKC}" stroke-width="10"/><path d="M-38 0h76M0 0v38" stroke="${INKC}" stroke-width="7"/></g>`; }
      if (t > T('ew', .1) && t < T('ew2', .1)) s += `<text x="${Rr.x - 220}" y="${H.FLOOR - 430}" font-size="48" font-weight="800" fill="#E53935">VRRRM!</text>`;
      // çarpma yıldızları
      if (t > T('ew2', .15) && t < T('e05', 1)) for (let k = 0; k < 3; k++) { const b = t * 4 + k * 2.1, x = Rr.x + Math.cos(b) * 70, y = H.FLOOR - 470 + Math.sin(b) * 16, r = 13; s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${H.S} stroke-width="3"/>`; }
      // çiftçi uyuyor
      if (t > T('gw', .4) && t < T('g03', 1)) for (let k = 0; k < 3; k++) { const p = ((t * .55 + k / 3) % 1); s += `<text x="${H.RX + 170 + p * 60}" y="${H.FLOOR - 80 - p * 110}" font-size="${34 + p * 34}" font-weight="800" fill="#5C6BC0" opacity="${1 - p}">z</text>`; }
      // su kovası, Berfîn'e su
      const s0 = T('dw2', 0), s1 = T('dw2', .5);
      if (t > s0 && t < s1) { const u = H.seg(t, s0, s1); for (let k = 0; k < 14; k++) { const v = (u * 1.4 - k * .05); if (v < 0 || v > 1) continue; const x = H.lerp(Rr.x + 40, H.BX + 20, v), y = H.FLOOR - 420 - Math.sin(v * Math.PI) * 160 + k * 4; s += `<circle cx="${x}" cy="${y}" r="${12 - k * .4}" fill="#6EC6FF" opacity=".9"/>`; } }
      if (t > s1 && t < T('d09', 1)) for (let k = 0; k < 6; k++) { const p = ((t * 1.4 + k / 6) % 1); s += `<path d="M${H.BX - 50 + k * 20} ${H.FLOOR - 420 + p * 300}q-7 12 0 18q7 -6 0 -18z" fill="#6EC6FF" ${H.S} stroke-width="3" opacity="${1 - p}"/>`; }
      // mikrofon + notalar
      if (t > T('h02', .3) && t < T('h05', 1)) { const [hx, hy] = H.hand(Rr, -1); s += `<g transform="translate(${hx} ${hy}) rotate(-30)"><rect x="-6" y="0" width="12" height="44" rx="5" fill="#37474F" ${H.S} stroke-width="3"/><circle r="14" fill="#90A4AE" ${H.S} stroke-width="4"/></g>`; }
      if (t > T('h03', 0) && t < T('h04', .6)) for (let k = 0; k < 5; k++) { const p = ((t * .8 + k / 5) % 1), x = Rr.x - 40 + Math.sin(k * 3 + t * 2) * 120, y = H.FLOOR - 480 - p * 200; s += `<text x="${x}" y="${y}" font-size="${44 + k * 4}" font-weight="800" fill="${k % 2 ? '#8E44AD' : '#E53935'}" opacity="${1 - p}" transform="rotate(${Math.sin(t * 6 + k) * 25} ${x} ${y})">♪</text>`; }
      // pilot tüyleri yerine rüzgâr çizgileri
      if (t > T('kw', 0) && t < T('kw', .85)) for (let k = 0; k < 3; k++) s += `<path d="M${Rr.x - 120 - k * 20} ${H.FLOOR - 300 + k * 50}h-70" stroke="#bbb" stroke-width="7" stroke-linecap="round"/>`;
      if (t > T('kw', .85) && t < T('k04', 0)) for (let k = 0; k < 3; k++) { const b = t * 4 + k * 2.1, x = H.RX - 150 + Math.cos(b) * 60, y = H.FLOOR - 60 + Math.sin(b) * 14, r = 13; s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${H.S} stroke-width="3"/>`; }
      // makas + dökülen saçlar
      if (t > T('lw', 0) && t < T('lw', .7)) { const hx = Rr.x + 30, hy = H.FLOOR - 470; s += `<g transform="translate(${hx} ${hy}) rotate(${Math.sin(t * 25) * 20}) scale(1.1)">${ART.berber}</g><text x="${hx + 60}" y="${hy - 40}" font-size="40" font-weight="800" fill="#E53935">çik çik!</text>`; }
      if (t > T('lw', .1) && t < T('l03', .5)) for (let k = 0; k < 8; k++) { const p = ((t * .9 + k / 8) % 1); s += `<path d="M${Rr.x - 50 + k * 14} ${H.FLOOR - 430 + p * 400}q8 -6 14 2" fill="none" stroke="${INKC}" stroke-width="4" opacity="${1 - p}"/>`; }
      // polis düdüğü
      if (t > T('f02', 0) && t < T('f02', .4)) s += `<text x="${H.RX + 70}" y="${H.FLOOR - 460}" font-size="46" font-weight="800" fill="#1A237E">FÎÎÎT!</text>`;
      return s;
    },
  };
})();
