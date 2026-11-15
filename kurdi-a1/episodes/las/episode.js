// "Laş" — Dersa 13 pratiği (vücut): Berfîn anlatır, Ronî komik hatalar yapar (çav→çay, dev→dew, poz→pez), Berfîn gülüp düzeltir.
// Sesler: ElevenLabs API (eleven_v4); Kürtçe metin sese ARAP HARFLİ yazımla verilir (tts alanı).
// Cümle sonundaki "…e" bitişik ve e ile okunsun diye ەه yazılır (ör. سەرەه). Her sahne + konuşmacı tek uzun kayıt,
// ElevenLabs Scribe kelime zamanlarıyla bölünür → audio/<id>.mp3. Kelime listesi: audio/vNNk (Berfîn), vNNt (Ronî).
(function () {
  const INKC = '#1f1b16';
  const TEACH = { pose: 'show', expr: 'happy' }, OK = { pose: 'cheer', expr: 'happy', hop: 24 }, LAUGH = { pose: 'face', expr: 'happy' };
  const B = (id, ku, tr, tts, o = {}) => ({ id, who: 'B', ku, tr, tts, gap: .5, s: TEACH, ...o });
  const R = (id, ku, tr, tts, o = {}) => ({ id, who: 'R', ku, tr, tts, gap: .5, s: { pose: 'point', expr: 'happy' }, ...o });
  const HA = (id, ku, tr, tts, o = {}) => B(id, ku, tr, tts, { laugh: true, s: LAUGH, then: [{ f: .35, s: { pose: 'point', expr: 'happy' } }], l: { pose: 'idle', expr: 'wide' }, ...o });
  const G = { gap: .3 }; // oyun temposu

  const SEQ = [
    // ---------- giriş ----------
    B('a01', 'Ronî, îro dersa me *laş* e!', 'Ronî, bugünkü dersimiz vücut!', '[cheerful] رۆنی، ئیرۆ دەرسا مە لاشەه!', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Laş? Ez laşê xwe *baş* nas dikim!', 'Vücut mu? Ben vücudumu çok iyi tanırım!', '[confident] لاش؟ ئەز لاشێ خوە باش ناس دکم!', { s: { pose: 'hips', expr: 'smug' } }),
    B('a03', 'Em ê *bibînin*! Em dest pê bikin.', 'Göreceğiz! Başlayalım.', '[giggles] ئەم ێ ببینن! ئەم دەست پێ بکن.'),

    // ---------- ser ----------
    B('b01', 'Ev *ser* e. Dubare bike: ser.', 'Bu baş. Tekrar et: ser.', '[warmly] ئەڤ سەرەه. دوبارە بکە: سەر.'),
    R('b02', 'Ser! Ev *serê* min e!', 'Baş! Bu benim başım!', '[happy] سەر! ئەڤ سەرێ منەه!', { s: { pose: 'think', expr: 'happy' } }),
    B('b03', 'Aferîn! Destê xwe *deyne* ser serê xwe.', 'Aferin! Elini başının üstüne koy.', '[happy] ئافەرین! دەستێ خوە دەینە سەر سەرێ خوە.'),
    { id: 'bw', wait: 2.2 },
    HA('b04', 'Hi hi! Ronî, ew *zik* e, ne ser!', 'Hi hi! Ronî, o karın, baş değil!', '[giggles] رۆنی، ئەو زکە، نە سەر!', { gap: .1 }),
    R('b05', 'Zik? Zikê min *birçî* ye!', 'Karın mı? Karnım aç!', '[whining] زک؟ زکێ من برچی یە!', { s: { pose: 'down', expr: 'sad' } }),
    HA('b06', 'Tu *her tim* birçî yî!', 'Sen hep açsın!', '[laughs] تو هەر تم برچی یی!'),

    // ---------- çav ----------
    B('c01', 'Ev *çav* in. Dubare bike: çav.', 'Bunlar göz. Tekrar et: çav.', '[warmly] ئەڤ چاڤن. دوبارە بکە: چاڤ.'),
    R('c02', '*Çay*?! Erê, ez çayê dixwazim!', 'Çay mı?! Evet, çay istiyorum!', '[excited] چای؟! ئەرێ، ئەز چایێ دخوازم!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    HA('c03', 'Na! Ne çay — *çav*! Em bi çavan *dibînin*.', 'Hayır! Çay değil — göz! Gözlerle görürüz.', '[laughs] نا! نە چای — چاڤ! ئەم ب چاڤان دبینن.'),
    R('c04', 'Aaa, çav! *Du* çavên min hene.', 'Haa, göz! İki gözüm var.', '[realizing] ئا، چاڤ! دو چاڤێن من هەنە.', { s: { pose: 'face', expr: 'wide' } }),
    B('c05', 'Pir baş! Çavên xwe *bigire*.', 'Çok iyi! Gözlerini kapat.', '[happy] پر باش! چاڤێن خوە بگرە.'),
    { id: 'cw', wait: 2.2 },
    HA('c06', 'Ronî! Te *devê* xwe girt, ne çavên xwe!', 'Ronî! Ağzını kapattın, gözlerini değil!', '[giggles] رۆنی! تە دەڤێ خوە گرت، نە چاڤێن خوە!', { gap: .1 }),
    R('c07', 'Dev? Dev *çi* ye?', 'Ağız mı? Ağız ne?', '[confused] دەڤ؟ دەڤ چ یە؟', { s: { pose: 'shrug', expr: 'wide' } }),

    // ---------- dev ----------
    B('d01', 'Ev *dev* e. Dubare bike: dev.', 'Bu ağız. Tekrar et: dev.', '[warmly] ئەڤ دەڤەه. دوبارە بکە: دەڤ.'),
    R('d02', '*Dew*?! Ez dew jî dixwazim!', 'Ayran mı?! Ayran da isterim!', '[excited] دێو؟! ئەز دێو ژی دخوازم!' /* dew: دێو yazımı "de-u" okutuyor, دەو "daw" oluyor */, { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    HA('d03', 'Ne dew — *dev*! Em bi devê xwe *dixwin*.', 'Ayran değil — ağız! Ağzımızla yeriz.', '[laughs] نە دێو — دەڤ! ئەم ب دەڤێ خوە دخون.'),
    R('d04', 'Baş e! Ez bi devê xwe *dewê* vedixwim!', 'Tamam! Ağzımla ayran içerim!', '[proud] باشە! ئەز ب دەڤێ خوە دێوێ ڤەدخوم!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('d05', 'Rast e! Aferîn!', 'Doğru! Aferin!', '[giggles] راستە! ئافەرین!', { l: { pose: 'cheer', expr: 'happy' } }),

    // ---------- poz ----------
    B('e01', 'Ev *poz* e. Dubare bike: poz.', 'Bu burun. Tekrar et: poz.', '[warmly] ئەڤ پۆزەه. دوبارە بکە: پۆز.'),
    R('e02', '*Pez*?! Yek pez, du pez, sê pez…', 'Koyun mu?! Bir koyun, iki koyun, üç koyun…', '[sleepy] پەز؟! یەک پەز، دو پەز، سێ پەز…', { s: { pose: 'think', expr: 'sleep', tilt: 12 } }),
    HA('e03', 'Na, na! Ne pez — *poz*! Em bi pozê *bîhn* dikin.', 'Hayır, hayır! Koyun değil — burun! Burunla koklarız.', '[laughs] نا، نا! نە پەز — پۆز! ئەم ب پۆزێ بیهن دکن.', { l: { pose: 'idle', expr: 'sleep', tilt: 12 } }),
    R('e04', 'Poz… Pozê min *mezin* e?', 'Burun… Burnum büyük mü?', '[worried] پۆز… پۆزێ من مەزنە؟', { s: { pose: 'face', expr: 'sad' } }),
    B('e05', 'Na, pozê te *piçûk* e.', 'Hayır, burnun küçük.', '[warmly] نا، پۆزێ تە پچووکەه.', { s: { pose: 'shrug', expr: 'happy' } }),

    // ---------- guh ----------
    B('f01', 'Ev *guh* in. Em bi guhan *dibihîzin*.', 'Bunlar kulak. Kulaklarla duyarız.', '[warmly] ئەڤ گوهن. ئەم ب گوهان دبهیزن.'),
    R('f02', 'Çi? Ez *nabihîzim*!', 'Ne? Duyamıyorum!', '[shouting] چ؟ ئەز نابهیزم!', { s: { pose: 'idle', expr: 'smug' } }),
    B('f03', '*GUH*! Em bi guhan dibihîzin!', 'KULAK! Kulaklarla duyarız!', '[shouting] گوه! ئەم ب گوهان دبهیزن!', { s: { pose: 'up', expr: 'angry', red: .4, shake: 1 } }),
    R('f04', '*Henek* bû! Ez dibihîzim!', 'Şakaydı! Duyuyorum!', '[mischievously] هەنەک بوو! ئەز دبهیزم!', { s: { pose: 'cheer', expr: 'smug', hop: 24 }, l: { pose: 'hips', expr: 'angry' } }),
    HA('f05', 'Ay Ronî! Tu her tim *henekan* dikî!', 'Ay Ronî! Hep şaka yapıyorsun!', '[laughs] ئای رۆنی! تو هەر تم هەنەکان دکی!', { l: { pose: 'idle', expr: 'smug' } }),

    // ---------- dest + ling ----------
    B('g01', 'Ev *dest* in, ev jî *ling* in.', 'Bunlar el, bunlar da bacak.', '[warmly] ئەڤ دەستن، ئەڤ ژی لنگن.'),
    B('g02', 'Destê xwe *bilind* bike!', 'Elini kaldır!', '[energetic] دەستێ خوە بلند بکە!', { gap: .35, s: { pose: 'up', expr: 'happy' } }),
    { id: 'gw', wait: 2.4 },
    HA('g03', 'Ronî! Ew *ling* e! Destê xwe bilind bike, ne lingê xwe!', 'Ronî! O bacak! Elini kaldır, bacağını değil!', '[laughing] رۆنی! ئەو لنگەه! دەستێ خوە بلند بکە، نە لنگێ خوە!', { gap: .1 }),
    R('g04', 'Ay ay! Ez *dikevim*!', 'Ay ay! Düşüyorum!', '[panicked] ئای ئای! ئەز دکەڤم!', { s: { pose: 'up', expr: 'wide', sweat: true } }),
    B('g05', 'Tu *baş* î?', 'İyi misin?', '[worried] تو باشی؟', { s: { pose: 'face', expr: 'wide' } }),
    R('g06', 'Erê… lê serê min *diêşe*.', 'Evet… ama başım ağrıyor.', '[dizzy] ئەرێ… لێ سەرێ من دئێشە.', { s: { pose: 'think', expr: 'dizzy' } }),

    // ---------- por ----------
    B('h01', 'Ev *por* e. Porê min *dirêj* e.', 'Bu saç. Saçım uzun.', '[proud] ئەڤ پۆرەه. پۆرێ من درێژەه.', { s: { pose: 'think', expr: 'happy' } }),
    R('h02', 'Porê min jî *dirêj* e!', 'Benim saçım da uzun!', '[confident] پۆرێ من ژی درێژەه!', { s: { pose: 'hips', expr: 'smug' } }),
    B('h03', 'Baş e. *Kumê* xwe rake!', 'Peki. Şapkanı çıkar!', '[suspicious] باشە. کومێ خوە راکە!', { s: { pose: 'point', expr: 'smug' } }),
    { id: 'hw', wait: 2 },
    HA('h04', 'Ronî! Serê te *keçel* e!', 'Ronî! Kafan kel!', '[bursts out laughing] رۆنی! سەرێ تە کەچەلە!', { gap: .1 }),
    R('h05', 'Na! Porê min heye… *yek*!', 'Hayır! Saçım var… bir tane!', '[offended] نا! پۆرێ من هەیە… یەک!', { s: { pose: 'hips', expr: 'angry', red: .4 } }),
    HA('h06', 'Yek por! Pir *dirêj*!', 'Bir tel saç! Çok uzun!', '[laughing] یەک پۆر! پر درێژ!'),

    // ---------- tilî ----------
    B('k01', 'Ev *tilî* ne. *Çend* tiliyên te hene?', 'Bunlar parmak. Kaç parmağın var?', '[curious] ئەڤ تلی نە. چەند تلیێن تە هەنە؟'),
    R('k02', 'Yek, du, sê, çar, şeş, heft… *neh*!', 'Bir, iki, üç, dört, altı, yedi… dokuz!', '[confident] یەک، دو، سێ، چار، شەش، هەفت… نەه!', { s: { pose: 'show', expr: 'happy' } }),
    HA('k03', 'Hi hi! Te *pênc* ji bîr kir! Dîsa *bijmêre*.', 'Hi hi! Beşi unuttun! Tekrar say.', '[giggles] تە پێنج ژ بیر کر! دیسا بژمێرە.'),
    R('k04', 'Yek, du, sê, çar, pênc… *deh*! Deh tiliyên min hene!', 'Bir, iki, üç, dört, beş… on! On parmağım var!', '[careful] یەک، دو، سێ، چار، پێنج… دەه! دەه تلیێن من هەنە!', { s: { pose: 'up', expr: 'happy' } }),
    B('k05', 'Aferîn! Û tiliyên *lingan*?', 'Aferin! Ya ayak parmakları?', '[happy] ئافەرین! ئوو تلیێن لنگان؟', { s: { pose: 'point', expr: 'happy' } }),
    R('k06', 'Deh jî! Bi hev re *bîst*!', 'On tane de! Toplam yirmi!', '[proud] دەه ژی! ب هەڤ رە بیست!', { s: { pose: 'cheer', expr: 'smug', hop: 26 } }),
    HA('k07', 'Tu pir *jîr* î!', 'Çok zekisin!', '[laughs] تو پر ژیری!', { l: { pose: 'hips', expr: 'smug' } }),
    R('k08', 'Ez *dizanim*!', 'Biliyorum!', '[smug] ئەز دزانم!', { s: { pose: 'hips', expr: 'smug' } }),

    // ---------- oyun ----------
    B('i01', 'Niha em *bilîzin*! Ez dibêjim, tu *nîşan* bide.', 'Şimdi oynayalım! Ben söylerim, sen göster.', '[energetic] نها ئەم بلیزن! ئەز دبێژم، تو نیشان بدە.'),
    B('i02', '*Ser*!', 'Baş!', '[energetic] سەر!', G),
    R('i03', 'Ser!', 'Baş!', '[confident] سەر!', { ...G, s: { pose: 'think', expr: 'happy' } }),
    B('i04', '*Çav*!', 'Göz!', '[energetic] چاڤ!', G),
    R('i05', 'Çav!', 'Göz!', '[confident] چاڤ!', { ...G, s: { pose: 'face', expr: 'wide' } }),
    B('i06', '*Dev*!', 'Ağız!', '[energetic] دەڤ!', G),
    R('i07', 'Dew… na, *dev*!', 'Ayran… yok, ağız!', '[excited] دەو… [nervous] نا، دەڤ!', { ...G, s: { pose: 'cheer', expr: 'happy' }, then: [{ f: .45, s: { pose: 'face', expr: 'wide' } }] }),
    B('i08', '*Poz*!', 'Burun!', '[energetic] پۆز!', G),
    R('i09', 'Poz!', 'Burun!', '[confident] پۆز!', { ...G, s: { pose: 'face', expr: 'happy' } }),
    B('i10', '*Guh*!', 'Kulak!', '[energetic] گوه!', G),
    R('i11', 'Çi?… *Guh*!', 'Ne?… Kulak!', '[mischievously] چ؟… گوه!', { ...G, s: { pose: 'think', expr: 'smug' } }),
    B('i12', '*Ling*!', 'Bacak!', '[energetic] لنگ!', G),
    R('i13', 'Ling!', 'Bacak!', '[confident] لنگ!', { ...G, s: { pose: 'down', expr: 'happy' } }),
    HA('i14', 'Aferîn, Ronî! *Sed ji sedî*!', 'Aferin Ronî! Yüzde yüz!', '[giggles] ئافەرین، رۆنی! سەد ژ سەدی!', { l: { pose: 'cheer', expr: 'happy', hop: 24 } }),

    // ---------- final ----------
    R('j01', 'Berfîn, niha ez *dipirsim*. Ev çi ye?', 'Berfîn, şimdi ben soruyorum. Bu ne?', '[playful] بەرفین، نها ئەز دپرسم. ئەڤ چ یە؟', { s: { pose: 'down', expr: 'smug' } }),
    B('j02', '*Zik* e!', 'Karın!', '[confident] زکەه!', { s: { pose: 'point', expr: 'happy' } }),
    R('j03', 'Rast e! Û zikê min çi *dibêje*?', 'Doğru! Peki karnım ne diyor?', '[playful] راستە! ئوو زکێ من چ دبێژە؟', { s: { pose: 'down', expr: 'smug' } }),
    { id: 'jw', wait: 1.8 },
    HA('j04', 'Zikê te dibêje: ez *birçî* me!', 'Karnın diyor ki: açım!', '[laughs] زکێ تە دبێژە: ئەز برچی مە!', { gap: .1 }),
    R('j05', 'Erê! Em herin *xwarinê*!', 'Evet! Yemeğe gidelim!', '[excited] ئەرێ! ئەم هەرن خوارنێ!', { s: { pose: 'cheer', expr: 'happy', hop: 40 } }),
    B('j06', '*Were*, em herin!', 'Gel, gidelim!', '[giggles] وەرە، ئەم هەرن!', { s: { pose: 'wave', expr: 'happy' } }),
  ];

  // ---------- duvardaki vücut posteri: öğretilen parça yanıp söner ----------
  const PART = [['b01', 'ser'], ['bw', 'zik'], ['c01', 'cav'], ['cw', 'dev'], ['d01', 'dev'], ['e01', 'poz'], ['f01', 'guh'], ['g01', 'dest'], ['gw', 'ling'], ['h01', 'por'], ['k01', 'dest'], ['i01', null],
    ['i02', 'ser'], ['i04', 'cav'], ['i06', 'dev'], ['i08', 'poz'], ['i10', 'guh'], ['i12', 'ling'], ['i14', null], ['j01', 'zik'], ['j06', null]];
  const LABEL = { ser: 'ser', zik: 'zik', cav: 'çav', dev: 'dev', poz: 'poz', guh: 'guh', dest: 'dest', ling: 'ling', por: 'por' };
  const LAND = /[?&]land=1/.test(location.search), PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455; // poster merkezi (yatayda kapının sağında)
  const SPOT = { ser: [0, -66, 34], por: [0, -98, 22], cav: [0, -72, 16], poz: [0, -60, 10], dev: [0, -48, 12], guh: [-30, -64, 12], dest: [-62, 10, 14], zik: [0, 8, 20], ling: [-18, 66, 18] };
  const curPart = (t, H) => { let p = null; for (const [id, k] of PART) if (t >= H.T(id, 0)) p = k; return p; };

  // ---------- simgeler ----------
  const ICONS = {
    head: H => `<circle r="34" fill="#fff" ${H.S} stroke-width="6"/><circle cx="-12" cy="-4" r="4" fill="${INKC}"/><circle cx="12" cy="-4" r="4" fill="${INKC}"/><path d="M-10 12q10 8 20 0" fill="none" ${H.S} stroke-width="5"/>`,
    eye: H => `<path d="M-42 0q42 -36 84 0q-42 36 -84 0z" fill="#fff" ${H.S} stroke-width="6"/><circle r="15" fill="#2F7DE1" ${H.S} stroke-width="4"/><circle r="6" fill="${INKC}"/>`,
    mouth: H => `<path d="M-40 -6q40 -14 80 0q-10 34 -40 34q-30 0 -40 -34z" fill="#C2185B" ${H.S} stroke-width="6"/><path d="M-30 -2h60" stroke="#fff" stroke-width="8"/>`,
    nose: H => `<path d="M-4 -36q-6 30 -22 44q4 16 26 12q22 4 26 -12q-16 -14 -22 -44z" fill="#FFD8C2" ${H.S} stroke-width="6"/>`,
    ear: H => `<path d="M-10 -38q38 -6 36 30q-2 22 -20 34q-12 8 -18 -4" fill="#FFD8C2" ${H.S} stroke-width="6"/><path d="M-2 -20q20 0 16 18q-4 10 -12 8" fill="none" ${H.S} stroke-width="4"/>`,
    hand: H => `<path d="M-24 34v-34l-8 -26q0 -8 8 -4l8 20v-34q0 -8 7 -8t7 8v30v-36q0 -8 7 -8t7 8v36v-28q0 -8 7 -8t7 8v48q0 20 -22 28z" fill="#FFD8C2" ${H.S} stroke-width="5"/>`,
    leg: H => `<path d="M-10 -40v58h-24q-12 0 -12 12h52v-70z" fill="#FFD8C2" ${H.S} stroke-width="6"/>`,
    hair: H => `<path d="M-34 20q-8 -56 34 -58q42 2 34 58q-10 -28 -34 -34q-24 6 -34 34z" fill="#5D4037" ${H.S} stroke-width="6"/>`,
    belly: H => `<circle r="34" fill="#FFD23F" ${H.S} stroke-width="6"/><circle cy="4" r="4" fill="${INKC}"/>`,
    tea: H => `<ellipse cy="30" rx="34" ry="8" fill="#fff" ${H.S} stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" ${H.S} stroke-width="5"/>`,
    dew: H => `<path d="M-22 -34h44l-6 68h-32z" fill="#fff" ${H.S} stroke-width="6"/><path d="M-20 -14h40" stroke="#E6E6E6" stroke-width="6"/><circle cx="-6" cy="-24" r="4" fill="#E6E6E6"/><circle cx="8" cy="-26" r="3" fill="#E6E6E6"/>`,
    sheep: H => `<path d="M-34 6a16 16 0 0 1 8 -28a18 18 0 0 1 30 -8a18 18 0 0 1 30 10a16 16 0 0 1 0 30q-34 12 -68 -4z" fill="#fff" ${H.S} stroke-width="5"/><ellipse cx="-36" cy="-4" rx="13" ry="16" fill="${INKC}"/><path d="M-14 22v16M16 22v16" ${H.S} stroke-width="6"/>`,
    bald: H => `<circle r="34" fill="#fff" ${H.S} stroke-width="6"/><path d="M2 -34q-4 -22 14 -24" fill="none" ${H.S} stroke-width="5"/><circle cx="-12" cy="0" r="4" fill="${INKC}"/><circle cx="12" cy="0" r="4" fill="${INKC}"/>`,
  };

  window.EP = {
    title: 'LAŞÊ MIN',
    tag: 'Kurdî A1 · Dersa 13',
    noClock: true,
    table: () => ({}),
    vocabScale: .84,
    seq: SEQ,
    tail: 1.6,
    bubbles: [
      { line: 'b01', f: .1, who: 'B', icon: 'head', label: 'ser' },
      { line: 'b04', f: .3, who: 'B', icon: 'belly', label: 'zik' },
      { line: 'c01', f: .1, who: 'B', icon: 'eye', label: 'çav' },
      { line: 'c02', f: 0, who: 'R', icon: 'tea', label: 'çay?!' },
      { line: 'c03', f: .3, who: 'B', icon: 'tea+no', label: 'ne çay' },
      { line: 'c04', f: .4, who: 'R', icon: 'txt:2', label: 'du çav' },
      { line: 'd01', f: .1, who: 'B', icon: 'mouth', label: 'dev' },
      { line: 'd02', f: 0, who: 'R', icon: 'dew', label: 'dew?!' },
      { line: 'd03', f: .3, who: 'B', icon: 'dew+no', label: 'ne dew' },
      { line: 'e01', f: .1, who: 'B', icon: 'nose', label: 'poz' },
      { line: 'e02', f: 0, who: 'R', icon: 'sheep', label: 'pez?!' },
      { line: 'e03', f: .3, who: 'B', icon: 'sheep+no', label: 'ne pez' },
      { line: 'f01', f: .1, who: 'B', icon: 'ear', label: 'guh' },
      { line: 'f02', f: 0, who: 'R', icon: 'q', label: 'çi?' },
      { line: 'g01', f: 0, tf: .5, hold: 0, who: 'B', icon: 'hand', label: 'dest' },
      { line: 'g01', f: .5, who: 'B', icon: 'leg', label: 'ling' },
      { line: 'h01', f: .1, who: 'B', icon: 'hair', label: 'por' },
      { line: 'h04', f: .3, who: 'B', icon: 'bald', label: 'keçel' },
      { line: 'h05', f: .6, who: 'R', icon: 'txt:1', label: 'yek por' },
      { line: 'k01', f: .4, who: 'B', icon: 'hand', label: 'tilî' },
      { line: 'k02', f: .8, who: 'R', icon: 'txt:9?', label: 'neh?' },
      { line: 'k04', f: .5, who: 'R', icon: 'txt:10', label: 'deh' },
      { line: 'k06', f: .4, who: 'R', icon: 'txt:20', label: 'bîst' },
      { line: 'j02', f: 0, who: 'B', icon: 'belly', label: 'zik' },
      { line: 'j04', f: .3, who: 'B', icon: 'belly', label: 'birçî!' },
    ],
    icons: ICONS,
    vocab: [
      ['laş', 'vücut'],
      ['ser', 'baş'],
      ['por', 'saç'],
      ['çav', 'göz'],
      ['guh', 'kulak'],
      ['poz', 'burun'],
      ['dev', 'ağız'],
      ['dest', 'el'],
      ['ling', 'bacak · ayak'],
      ['zik', 'karın'],
      ['tilî', 'parmak'],
    ],
    // kelime listesi seslendirmesi (vNNk Berfîn Arap harfli Kürtçe, vNNt Ronî Türkçe)
    vocabTts: {
      ku: ['لاش', 'سەر', 'پۆر', 'چاڤ', 'گوه', 'پۆز', 'دەڤ', 'دەست', 'لنگ', 'زک', 'تلی'],
      tr: ['vücut', 'baş', 'saç', 'göz', 'kulak', 'burun', 'ağız', 'el', 'bacak, ayak', 'karın', 'parmak'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const id of ['b02', 'c04', 'i03', 'i05', 'i09', 'i13']) out.push({ type: 'ding', at: T(id, .7) });
      out.push({ type: 'boing', at: T('bw', .3) }, { type: 'pop', at: T('cw', .3) }, { type: 'boing', at: T('gw', .2) });
      out.push({ type: 'whoosh', at: T('g04', .5) }, { type: 'thud', at: T('g04', 1) + .15 });
      out.push({ type: 'whoosh', at: T('hw', .3) }, { type: 'boing', at: T('hw', .45) });
      out.push({ type: 'cross', at: T('k03', .05) }, { type: 'ding', at: T('k04', .85) });
      out.push({ type: 'cross', at: T('i07', .05) }, { type: 'ding', at: T('i07', .9) });
      out.push({ type: 'thud', at: T('jw', .1) }, { type: 'thud', at: T('jw', .45) });
      out.push({ type: 'whoosh', at: T('j06', .9) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // el karnında (ser yerine)
      if (t > T('bw', .1) && t < T('b05', .2)) { Rr.la = [40, -80]; Rr.ra = [40, -80]; Rr.expr = 'smug'; Bb.expr = t < T('bw', .7) ? 'normal' : 'wide'; }
      // ağzını kapatır (gözler kocaman)
      if (t > T('cw', .1) && t < T('c06', 1)) { Rr.la = [116, 206]; Rr.expr = 'wide'; Rr.mouth = 0; Bb.expr = t < T('cw', .7) ? 'normal' : 'wide'; }
      // kulaklarını kapatır
      if (t > T('f02', 0) && t < T('f04', 0)) { Rr.la = [112, 212]; Rr.ra = [112, 212]; Rr.expr = 'smug'; }
      // bacağını kaldırır, sallanır, düşer
      const g0 = T('gw', .05), g1 = T('gw', .35), f0 = T('g04', .35), f1 = T('g04', .7), up1 = T('g06', .2);
      if (t > g0 && t < f0) { Rr.legUp = H.eout(H.seg(t, g0, g1)); Rr.rot = Math.sin(t * 7) * 6 * Rr.legUp; Rr.la = [80, 60]; Rr.ra = [80, 60]; Rr.expr = t < T('gw', .7) ? 'smug' : 'wide'; }
      if (t >= f0 && t < up1) { const u = H.eio(H.seg(t, f0, f1)); Rr.rot = 84 * u; Rr.dx = -230 * u; Rr.dy = 20 * u; Rr.legUp = 1 - u; Rr.expr = u > .9 ? 'dizzy' : 'wide'; Rr.la = [150, 176]; Rr.ra = [150, 176]; }
      if (t >= up1 && t < T('g06', 1)) { const u = 1 - H.eio(H.seg(t, up1, up1 + .5)); Rr.rot = 84 * u; Rr.dx = -230 * u; Rr.dy = 20 * u; }
      // şapka çıkar → kel
      if (t > T('hw', .35) && t < T('i01', 0)) { Rr.noCap = true; if (t < T('h04', 0)) { Rr.expr = 'smug'; Bb.expr = 'wide'; } }
      // gülme: omuzlar hoplar
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
      // karın guruldar
      if (t > T('jw', 0) && t < T('j04', 0)) { Rr.expr = 'wide'; Rr.dx = Math.sin(t * 40) * 4; }
      // final: yemeğe koşu
      const a = T('j06', .8);
      if (t > a) { const u = H.seg(t, a, a + 1.1); for (const [O, X, d] of [[Rr, H.RX, 0], [Bb, H.BX, .25]]) { const v = H.eio(H.seg(u, d, 1)); O.x = H.lerp(X, 1320 + (O === Bb ? 0 : 160), v); O.look = 1; if (v > 0 && v < 1) O.walk = t * 3.4; if (v >= 1) O.show = false; O.expr = 'happy'; } }
    },
    back(t, P, H) { // vücut posteri
      const S = H.S, k = curPart(t, H);
      let s = `<g transform="translate(${PX} ${PY})"><rect x="-120" y="-130" width="240" height="250" rx="16" fill="#fff" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="218" rx="8" fill="#EAF6FF"/>`;
      s += `<text y="-90" text-anchor="middle" font-size="28" font-weight="800" fill="${INKC}">LAŞ</text>`;
      s += `<path d="M0 -36v66M0 30l-20 44M0 30l20 44M0 -20l-34 26M0 -20l34 26" fill="none" ${S} stroke-width="6"/>`;
      s += `<path d="M-24 -66a24 24 0 0 1 48 0q-8 -10 -24 -10t-24 10z" fill="#5D4037"/>`;
      s += `<circle cy="-60" r="24" fill="#FFD8C2" ${S} stroke-width="5"/><circle cx="-26" cy="-60" r="5" fill="#FFD8C2" ${S} stroke-width="3"/><circle cx="26" cy="-60" r="5" fill="#FFD8C2" ${S} stroke-width="3"/>`;
      s += `<path d="M-24 -72a24 24 0 0 1 48 0q-12 -6 -24 -6t-24 6z" fill="#5D4037" ${S} stroke-width="3"/>`;
      s += `<circle cx="-8" cy="-64" r="3" fill="${INKC}"/><circle cx="8" cy="-64" r="3" fill="${INKC}"/><path d="M0 -60v6" ${S} stroke-width="3"/><path d="M-7 -48q7 5 14 0" fill="none" ${S} stroke-width="3"/>`;
      if (k && SPOT[k]) {
        const [x, y, r] = SPOT[k], pu = 1 + Math.sin(t * 8) * .12;
        s += `<circle cx="${x}" cy="${y}" r="${r * pu}" fill="none" stroke="#E53935" stroke-width="6"/>`;
        s += `<g transform="translate(0 150)"><rect x="-62" y="-26" width="124" height="52" rx="26" fill="${INKC}"/><text y="13" text-anchor="middle" font-size="36" font-weight="800" fill="#FFD23F">${LABEL[k]}</text></g>`;
      }
      return s + `</g>`;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R;
      let s = '';
      // "hi hi hi"
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      // şapka uçar
      const a = T('hw', .3);
      if (t > a && t < a + 1.2) { const u = (t - a) / 1.2, x = H.RX + 40 + u * 360, y = H.FLOOR - 470 - Math.sin(u * Math.PI) * 220; s += `<g transform="translate(${x} ${y}) rotate(${u * 540})"><path d="M-40 0a40 34 0 0 1 80 0z" fill="${H.BLUE}" ${H.S} stroke-width="6"/><path d="M20 -2l60 4" stroke="#1E5FBF" stroke-width="14" stroke-linecap="round"/></g>`; }
      // düşerken yıldızlar
      if (t > T('g04', .7) && t < T('g06', 1)) for (let k = 0; k < 3; k++) { const b = t * 4 + k * 2.1, x = H.RX + 160 + Math.cos(b) * 70, y = H.FLOOR - 70 + Math.sin(b) * 16, r = 13; s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${H.S} stroke-width="3"/>`; }
      // karın gurultusu
      const g0 = T('jw', 0), g1 = T('j04', .3);
      if (t > g0 && t < g1) { for (let i = 0; i < 3; i++) { const p = ((t - g0) * 1.6 + i / 3) % 1; s += `<path d="M${H.RX + 70 + p * 50} ${H.FLOOR - 250 + i * 26}q10 -10 0 -18q-10 -8 0 -18" fill="none" stroke="#E0407B" stroke-width="6" stroke-linecap="round" opacity="${1 - p}"/>`; } s += `<text x="${H.RX + 90}" y="${H.FLOOR - 300}" font-size="44" font-weight="800" fill="#E0407B" transform="rotate(10 ${H.RX + 90} ${H.FLOOR - 300})">gurrr…</text>`; }
      return s;
    },
  };
})();
