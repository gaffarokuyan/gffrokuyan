// "Demsal" — Dersa 19 pratiği (mevsimler): Berfîn anlatır, Ronî her mevsime yanlış giyinir (yazın mont, kışın deniz), Berfîn güler.
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
    B('a01', 'Ronî, îro dersa me *demsal* in! *Çar* demsal hene.', 'Ronî, bugünkü dersimiz mevsimler! Dört mevsim var.', '[cheerful] رۆنی، ئیرۆ دەرسا مە دەمسالن! چار دەمسال هەنە.', { s: { pose: 'wave', expr: 'happy' } }),
    R('a02', 'Çar? Ez tenê *yekê* dizanim: demsala *xwarinê*!', 'Dört mü? Ben sadece birini bilirim: yemek mevsimi!', '[proud] چار؟ ئەز تەنێ یەکێ دزانم: دەمسالا خوارنێ!', { s: { pose: 'hips', expr: 'smug' } }),
    HA('a03', 'Tu her tim *birçî* yî!', 'Sen hep açsın!', '[laughs] تو هەر تم برچی یی!'),
    R('s1', '♪ Lê lê, lê lê… demsala *xwarinê*, lê lê! ♪', '♪ Le le, le le… yemek mevsimi, le le! ♪', '[singing happily, folk melody] لێ لێ، لێ لێ… دەمسالا خوارنێ، لێ لێ!', { s: { pose: 'wave', expr: 'happy' } }),
    { id: 'sw1', wait: 1.6 },

    // ---------- bihar ----------
    B('b01', 'Ev *bihar* e. *Kulîlk* vedibin.', 'Bu ilkbahar. Çiçekler açar.', '[warmly] Ev bihar e. Kulîlk vedibin.' /* Latin: بهار "bahar" okunuyor */, { s: { pose: 'show', expr: 'happy' } }),
    R('b02', 'Bîhna kulîlkan *xweş* e…', 'Çiçeklerin kokusu güzel…', '[dreamy] بیهنا کولیلکان خوەشەه…', { s: { pose: 'face', expr: 'sleep' } }),
    { id: 'bw', wait: 1.4 },
    R('b03', 'HAPŞÛ!', 'HAPŞU!', '[sneezes loudly] Hapşûûû!', { gap: .05, s: { pose: 'up', expr: 'wide', shake: 1 } }),
    HA('b04', 'Hi hi! Tu ji kulîlkan *alerjîk* î!', 'Hi hi! Sen çiçeklere alerjiksin!', '[laughs] تو ژ کولیلکان ئالەرژیکی!'),
    R('b05', 'Na… kulîlk ji *min* alerjîk in!', 'Hayır… çiçekler bana alerjik!', '[sniffling] نا… کولیلک ژ من ئالەرژیکن!', { s: { pose: 'hips', expr: 'smug' } }),

    // ---------- baran ----------
    B('h01', 'Di biharê de *baran* jî dibare. *Sîwana* xwe bigire!', 'İlkbaharda yağmur da yağar. Şemsiyeni al!', '[warmly] Di biharê de baran jî dibare. Sîwana xwe bigire!', { s: { pose: 'show', expr: 'happy' } }),
    R('h02', 'Sîwan! Ez *amade* me!', 'Şemsiye! Hazırım!', '[proud] سیوان! ئەز ئامادە مە!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'hw', wait: 2.4 },
    HA('h03', 'Ronî! Sîwan *serobino* ye!', 'Ronî! Şemsiye ters!', '[laughing] رۆنی! سیوان سەرۆبنۆیە!', { gap: .1 }),
    R('h04', 'Lê niha *ava* min heye!', 'Ama şimdi suyum var!', '[proud, dripping] لێ نها ئاڤا من هەیە!', { s: { pose: 'hips', expr: 'smug', sweat: true } }),

    // ---------- Newroz ----------
    B('l01', 'Di meha *Adarê* de *Newroz* heye! Em *govendê* digirin!', 'Mart ayında Newroz var! Halay çekeriz!', '[excited] Di meha Adarê de Newroz heye! Em govendê digirin!', { s: { pose: 'cheer', expr: 'happy', hop: 24 } }),
    R('l02', 'Govend! Ez *serçopî* me!', 'Halay! Halay başı benim!', '[excited] گۆڤەند! ئەز سەرچۆپی مە!', { s: { pose: 'wave', expr: 'happy' } }),
    { id: 'lw', wait: 3.2 },
    HA('l03', 'Hi hi! Tu serçopiyê herî *gêj* î!', 'Hi hi! Sen en sersem halay başısın!', '[laughs] تو سەرچۆپیێ هەری گێژی!', { gap: .1 }),
    R('l04', 'Newroz *pîroz* be!', 'Newroz kutlu olsun!', '[joyful] نەورۆز پیرۆز بە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    B('l05', 'Newroz pîroz be!', 'Newroz kutlu olsun!', '[joyful] نەورۆز پیرۆز بە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 }, l: { pose: 'cheer', expr: 'happy' } }),

    // ---------- havîn ----------
    B('c01', 'Ev *havîn* e. Hewa pir *germ* e.', 'Bu yaz. Hava çok sıcak.', '[warmly] ئەڤ هاڤینەه. هەوا پر گەرمەه.', { s: { pose: 'show', expr: 'happy' } }),
    R('c02', 'Ez *qapûtê* xwe li xwe dikim!', 'Montumu giyiyorum!', '[confident] ئەز قاپووتێ خوە ل خوە دکم!', { s: { pose: 'hips', expr: 'smug' } }),
    { id: 'cw', wait: 1.6 },
    HA('c03', 'Ronî! Di havînê de *qapût*?!', 'Ronî! Yazın mont mu?!', '[laughing] رۆنی! د هاڤینێ دە قاپووت؟!', { gap: .1 }),
    R('c04', 'Ez… *dihelim*!', 'Ben… eriyorum!', '[melting, weak] ئەز… دهەلم!', { s: { pose: 'down', expr: 'sad', sweat: true } }),
    { id: 'cw2', wait: 1.4 },
    HA('c05', 'Hi hi! Ronî bû *av*!', 'Hi hi! Ronî su oldu!', '[giggles] رۆنی بوو ئاڤ!', { gap: .1 }),

    // ---------- payîz ----------
    B('d01', 'Ev *payîz* e. *Pel* dikevin.', 'Bu sonbahar. Yapraklar düşer.', '[warmly] ئەڤ پاییزەه. پەل دکەڤن.', { s: { pose: 'show', expr: 'happy' } }),
    R('d02', 'Ez pelan *digirim*!', 'Yaprakları yakalıyorum!', '[excited] ئەز پەلان دگرم!', { s: { pose: 'cheer', expr: 'happy' } }),
    { id: 'dw', wait: 2.4 },
    R('d03', 'Binêre! Ez bûm *dar*!', 'Bak! Ağaç oldum!', '[proud] بنێرە! ئەز بووم دار!', { gap: .1, s: { pose: 'up', expr: 'happy' } }),
    HA('d04', 'Tu dara herî *xweşik* î!', 'Sen en güzel ağaçsın!', '[laughs] تو دارا هەری خوەشکی!'),

    { id: 'mw0', wait: .1 },
    B('m01', 'Di payîzê de *ba* jî tê.', 'Sonbaharda rüzgâr da eser.', '[warmly] د پاییزێ دە با ژی تێ.', { s: { pose: 'show', expr: 'happy' } }),
    { id: 'mw', wait: 2.4 },
    R('m02', 'Kumê min! *Raweste*, kum!', 'Şapkam! Dur, şapka!', '[shouting] کومێ من! راوەستە، کوم!', { gap: .1, s: { pose: 'up', expr: 'wide' } }),
    HA('m03', 'Hi hi! Kum *guh* nade te!', 'Hi hi! Şapka seni dinlemiyor!', '[laughs] کوم گوه نادە تە!'),

    // ---------- zivistan ----------
    B('e01', 'Ev *zivistan* e. *Berf* dibare.', 'Bu kış. Kar yağıyor.', '[warmly] ئەڤ زڤستانەه. بەرف دبارە.', { s: { pose: 'show', expr: 'happy' } }),
    R('e02', 'Ez diçim *deryayê*!', 'Denize gidiyorum!', '[excited] ئەز دچم دەریایێ!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    HA('e03', 'Di zivistanê de *derya*?!', 'Kışın deniz mi?!', '[laughing] د زڤستانێ دە دەریا؟!'),
    { id: 'ew', wait: 1.8 },
    R('e04', 'Brrr… ez bûm *qeşa*!', 'Brrr… buz oldum!', '[shivering, frozen] برررر… ئەز بووم قەشا!', { gap: .1, s: { pose: 'idle', expr: 'wide', shake: 1 } }),
    HA('e05', 'Ay Ronî! Ez ê *çayeke germ* bînim!', 'Ay Ronî! Sıcak bir çay getireyim!', '[giggles] ئای رۆنی! ئەز ێ چایەکە گەرم بینم!'),
    R('e06', 'Çay! *Spas*!', 'Çay! Teşekkürler!', '[happy] چای! سپاس!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    R('s2', '♪ Lê lê! Berf dibare, *çay* germ e, lê lê! ♪', '♪ Le le! Kar yağıyor, çay sıcak, le le! ♪', '[singing joyfully, folk melody] لێ لێ! بەرف دبارە، چای گەرمە، لێ لێ!', { s: { pose: 'wave', expr: 'happy' } }),
    { id: 'sw2', wait: 1.4 },
    HA('sb1', 'Hi hi! Ronî dest bi *govendê* kir!', 'Hi hi! Ronî halaya başladı!', '[laughs] رۆنی دەست ب گۆڤەندێ کر!', { gap: .1 }),

    // ---------- mirovê berfê ----------
    B('f01', 'Were em mirovekî *berfê* çêkin!', 'Hadi bir kardan adam yapalım!', '[excited] وەرە ئەم مرۆڤەکی بەفرێ چێکن!', { s: { pose: 'cheer', expr: 'happy' } }),
    { id: 'fw', wait: 2.4 },
    R('f02', 'Binêre! Ev *Ronî* ye!', 'Bak! Bu Ronî!', '[proud] بنێرە! ئەڤ رۆنی یە!', { gap: .1, s: { pose: 'show', expr: 'smug' } }),
    HA('f03', 'Ew ji te *xweşiktir* e!', 'O senden daha yakışıklı!', '[teasing laugh] ئەو ژ تە خوەشکترەه!'),
    R('f04', 'Çi?!', 'Ne?!', '[offended] چ؟!', { s: { pose: 'up', expr: 'angry', red: .5 } }),

    // ---------- meh ----------
    B('g01', 'Salê *diwanzdeh* meh hene.', 'Yılda on iki ay var.', '[clearly] سالێ دوانزدەه مەه هەنە.', { s: { pose: 'show', expr: 'happy' } }),
    R('g02', 'Diwanzdeh? Û meha *xwarinê* kîjan e?', 'On iki mi? Peki yemek ayı hangisi?', '[curious] دوانزدەه؟ ئوو مەها خوارنێ کیژانە؟', { s: { pose: 'think', expr: 'happy' } }),
    HA('g03', 'Ji bo te *hemû* meh mehên xwarinê ne!', 'Senin için bütün aylar yemek ayı!', '[laughs] ژ بۆ تە هەموو مەه مەهێن خوارنێ نە!'),

    // ---------- rojbûn ----------
    B('k01', 'Ronî, *rojbûna* te di kîjan mehê de ye?', 'Ronî, doğum günün hangi ayda?', '[curious] رۆنی، رۆژبوونا تە د کیژان مەهێ دە یە؟', { s: { pose: 'think', expr: 'smug' } }),
    R('k02', 'Rojbûna min…? Min ji *bîr* kir!', 'Doğum günüm…? Unuttum!', '[confused] رۆژبوونا من…؟ من ژ بیر کر!', { s: { pose: 'shrug', expr: 'wide' } }),
    B('k03', '*Îro* ye! Rojbûna te *pîroz* be!', 'Bugün! Doğum günün kutlu olsun!', '[cheerful] ئیرۆیە! رۆژبوونا تە پیرۆز بە!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    { id: 'kw', wait: 2.2 },
    HA('k04', 'Ronî! Te hemû *pasta* xwar!', 'Ronî! Bütün pastayı yedin!', '[laughing] رۆنی! تە هەموو پاستا خوار!', { gap: .1 }),
    R('k05', 'Spas, Berfîn! Ev rojbûna *herî xweş* e!', 'Teşekkürler Berfîn! Bu en güzel doğum günü!', '[happy] سپاس، بەرفین! ئەڤ رۆژبوونا هەری خوەشەه!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    R('s3', '♪ Lê lê, Berfîn, lê lê! *Rojbûna* min e, lê lê! ♪', '♪ Le le, Berfîn, le le! Doğum günüm, le le! ♪', '[singing loudly, festive folk melody] لێ لێ، بەرفین، لێ لێ! رۆژبوونا منە، لێ لێ!', { s: { pose: 'wave', expr: 'happy' } }),
    HA('sb2', 'Ez jî *têm*!', 'Ben de geliyorum!', '[laughing, excited] ئەز ژی تێم!', { gap: .1 }),
    { id: 'sw3', wait: 2.6 },

    // ---------- oyun ----------
    B('i01', 'Niha *lîstik*! Ev kîjan demsal e?', 'Şimdi oyun! Bu hangi mevsim?', '[energetic] نها لیستک! ئەڤ کیژان دەمسالە؟'),
    R('i02', '*Zivistan*! Qapût!', 'Kış! Mont!', '[confident] زڤستان! قاپووت!', { ...G, s: OK }),
    B('i03', 'Û ev?', 'Ya bu?', '[curious] ئوو ئەڤ؟', G),
    R('i04', '*Havîn*! Qapût?… Na — zebeş!', 'Yaz! Mont mu?… Yok — karpuz!', '[confident] هاڤین! قاپووت؟… [happy] نا — زەبەش!', { ...G, s: { pose: 'think', expr: 'wide' }, then: [{ f: .55, s: OK }] }),
    B('i05', 'Û ev?', 'Ya bu?', '', G),
    R('i06', '*Payîz*! Pel!', 'Sonbahar! Yaprak!', '[confident] پاییز! پەل!', { ...G, s: OK }),
    B('i07', 'Û ev?', 'Ya bu?', '', G),
    R('i08', '*Bihar* e!… Hapşû!', 'İlkbahar!… Hapşu!', '[confident] Bihar e! [sneezes] Hapşû!', { ...G, s: { pose: 'up', expr: 'wide' } }),
    HA('i09', 'Aferîn! *Sed ji sedî*!', 'Aferin! Yüzde yüz!', '[giggles] ئافەرین! سەد ژ سەدی!', { l: { pose: 'cheer', expr: 'happy', hop: 24 } }),

    // ---------- final ----------
    B('j01', 'Demsala te ya *hezkirî* kîjan e?', 'En sevdiğin mevsim hangisi?', '[curious] دەمسالا تە یا هەزکری کیژانە؟', { s: { pose: 'show', expr: 'happy' } }),
    R('j02', 'Her *çar* demsal! Ji ber ku her demsalê *xwarin* heye!', 'Dört mevsimin hepsi! Çünkü her mevsim yemek var!', '[happy] هەر چار دەمسال! ژ بەر کو هەر دەمسالێ خوارن هەیە!', { s: { pose: 'cheer', expr: 'happy', hop: 36 } }),
    HA('j03', 'Ay Xwedê! Ev Ronî!', 'Aman Allahım! Bu Ronî!', '[laughing] ئای خوەدێ! ئەڤ رۆنی!', { l: { pose: 'hips', expr: 'smug' } }),
    R('j04', 'Û ya te, Berfîn?', 'Ya seninki, Berfîn?', '[curious] ئوو یا تە، بەرفین؟', { s: { pose: 'show', expr: 'happy' } }),
    HA('j05', 'Ya min *havîn* e! Ji ber ku tu di havînê de *qapût* li xwe dikî!', 'Benimki yaz! Çünkü sen yazın mont giyiyorsun!', '[teasing laugh] یا من هاڤینەه! ژ بەر کو تو د هاڤینێ دە قاپووت ل خوە دکی!'),
    R('j06', 'Ew *moda* ye!', 'O moda!', '[proud] ئەو مۆدا یە!', { s: { pose: 'hips', expr: 'smug' } }),
    R('z1', 'Berfîn… ev *ji bo te*!', 'Berfîn… bu senin için!', '[warmly] Berfîn… ev ji bo te!', { gap: .8, s: { pose: 'idle', expr: 'happy', look: -1 }, l: { pose: 'idle', expr: 'normal' } }),
    { id: 'zw', wait: 2.4 },
    B('z2', 'Ay… *Ronî*!', 'Ay… Ronî!', '[shy giggle] ئای… رۆنی!', { gap: .1, s: { pose: 'face', expr: 'happy', red: .75 } }),
  ];

  // ---------- mevsim zaman çizelgesi ----------
  const SEASON = [['a01', 'none'], ['b01', 'bihar'], ['h01', 'baran'], ['l01', 'bihar'], ['c01', 'havin'], ['d01', 'payiz'], ['e01', 'zivistan'], ['g01', 'none'], ['i01', 'zivistan'], ['i03', 'havin'], ['i05', 'payiz'], ['i07', 'bihar'], ['j01', 'none']];
  const season = (t, H) => { let s = 'none'; for (const [id, k] of SEASON) if (t >= H.T(id, 0)) s = k; return s; };

  // ---------- çizimler ----------
  const S0 = `stroke="${INKC}" stroke-linecap="round" stroke-linejoin="round"`;
  const flower = (c) => [0, 72, 144, 216, 288].map(a => `<ellipse cx="${Math.cos(a * Math.PI / 180) * 16}" cy="${Math.sin(a * Math.PI / 180) * 16}" rx="12" ry="9" transform="rotate(${a} ${Math.cos(a * Math.PI / 180) * 16} ${Math.sin(a * Math.PI / 180) * 16})" fill="${c}" ${S0} stroke-width="3"/>`).join('') + `<circle r="9" fill="#FFD23F" ${S0} stroke-width="3"/>`;
  const leaf = (c) => `<path d="M0 -20q20 10 0 40q-20 -30 0 -40z" fill="${c}" ${S0} stroke-width="3"/><path d="M0 -14v32" ${S0} stroke-width="2"/>`;
  const flake = `<path d="M0 -26v52M-22 -13l44 26M-22 13l44 -26" stroke="#2F7DE1" stroke-width="6" stroke-linecap="round"/>`;
  const ART = {
    bihar: `<g transform="translate(-22 -6) scale(1.2)">${flower('#F06A9B')}</g><g transform="translate(26 10)">${flower('#8E44AD')}</g><path d="M-22 14v26M26 28v14" stroke="#2EAD4B" stroke-width="5"/>`,
    havin: `<circle r="24" fill="#FFB300" ${S0} stroke-width="5"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path d="M${Math.cos(a) * 32} ${Math.sin(a) * 32}L${Math.cos(a) * 44} ${Math.sin(a) * 44}" stroke="#FFB300" stroke-width="7" stroke-linecap="round"/>`; }).join(''),
    payiz: `<g transform="translate(-16 0) rotate(-20) scale(1.3)">${leaf('#E67E22')}</g><g transform="translate(18 6) rotate(25) scale(1.1)">${leaf('#C0392B')}</g>`,
    zivistan: `<g transform="scale(1.4)">${flake}</g>`,
    baran: `<path d="M-40 -6a20 20 0 0 1 30 -22a28 28 0 0 1 52 8a18 18 0 0 1 -4 36h-66a18 18 0 0 1 -12 -22z" fill="#90A4AE" ${S0} stroke-width="5"/><path d="M-26 26l-8 18M-4 26l-8 18M18 26l-8 18" stroke="#2F7DE1" stroke-width="6" stroke-linecap="round"/>`,
    newroz: `<path d="M-30 30q-6 -30 14 -50q-2 20 10 26q2 -34 22 -46q-6 30 10 40q12 -10 10 -26q20 26 4 56z" fill="#FF9F43" ${S0} stroke-width="4"/><path d="M-14 30q0 -18 10 -26q4 14 10 14q4 -10 2 -20q14 18 4 32z" fill="#FFD23F"/><path d="M-40 34h80" stroke="#8D5A2B" stroke-width="8" stroke-linecap="round"/>`,
    pasta: `<rect x="-40" y="-4" width="80" height="40" rx="8" fill="#F8BBD0" ${S0} stroke-width="5"/><path d="M-40 12q13 12 26 0t26 0t28 0" fill="none" stroke="#fff" stroke-width="5"/><path d="M0 -4V-26" ${S0} stroke-width="5"/><path d="M0 -42q-9 10 0 16q9 -6 0 -16z" fill="#FF9F43" ${S0} stroke-width="3"/>`,
    mirov: `<circle cy="22" r="26" fill="#fff" ${S0} stroke-width="5"/><circle cy="-16" r="18" fill="#fff" ${S0} stroke-width="5"/><circle cx="-6" cy="-18" r="3" fill="${INKC}"/><circle cx="6" cy="-18" r="3" fill="${INKC}"/><path d="M0 -14l12 4l-12 2z" fill="#FF9F43"/><path d="M-18 -30a18 18 0 0 1 36 0z" fill="#2F7DE1" ${S0} stroke-width="4"/>`,
    meh: `<rect x="-40" y="-34" width="80" height="72" rx="8" fill="#fff" ${S0} stroke-width="5"/><rect x="-40" y="-34" width="80" height="20" rx="8" fill="#E53935" ${S0} stroke-width="5"/><text y="24" text-anchor="middle" font-size="34" font-weight="800" fill="${INKC}">12</text>`,
    qaput: `<path d="M-24 -44q24 12 48 0l32 22l-12 46l-16 -6v30h-56v-30l-16 6l-12 -46z" fill="#8D6E63" ${S0} stroke-width="5"/><path d="M0 -34v82" ${S0} stroke-width="4"/>`,
    zebes: `<ellipse rx="46" ry="32" fill="#2EAD4B" ${S0} stroke-width="5"/><path d="M-30 -22q-8 22 0 44M-10 -30q-6 30 0 60M10 -30q6 30 0 60M30 -22q8 22 0 44" fill="none" stroke="#1B7A33" stroke-width="5"/>`,
    tea: `<ellipse cy="30" rx="34" ry="8" fill="#fff" ${S0} stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" ${S0} stroke-width="5"/>`,
    food: `<ellipse cy="18" rx="50" ry="13" fill="#fff" ${S0} stroke-width="5"/><path d="M-34 14a34 28 0 0 1 68 0z" fill="#D9531E" ${S0} stroke-width="5"/>`,
  };
  const CARD = [['a01', null, '4'], ['b01', 'bihar', 'bihar'], ['h01', 'baran', 'baran'], ['l01', 'newroz', 'Newroz'], ['c01', 'havin', 'havîn'], ['d01', 'payiz', 'payîz'], ['e01', 'zivistan', 'zivistan'], ['f01', 'mirov', 'mirovê berfê'], ['g01', 'meh', 'meh'], ['k01', 'pasta', 'rojbûn'],
    ['i01', 'zivistan', '?'], ['i03', 'havin', '?'], ['i05', 'payiz', '?'], ['i07', 'bihar', '?'], ['j01', null, '♥']];
  const PX = LAND ? 1330 : 730, PY = LAND ? 720 : 455;
  const curCard = (t, H) => { let c = null; for (const x of CARD) if (t >= H.T(x[0], 0)) c = x; return c; };
  const SMX = 640; // kardan adam

  window.EP = {
    title: 'DEMSAL',
    tag: 'Kurdî A1 · Dersa 19',
    noClock: true,
    table: () => ({}),
    vocabScale: .84,
    seq: SEQ,
    tail: 2.2,
    bubbles: [
      { line: 'a02', f: .55, who: 'R', icon: 'food', label: 'demsala xwarinê' },
      { line: 'c03', f: .4, who: 'B', icon: 'havin', label: 'germ!' },
      { line: 'e03', f: .3, who: 'B', icon: 'zivistan', label: 'sar!' },
      { line: 'e05', f: .5, who: 'B', icon: 'tea', label: 'çaya germ' },
      { line: 'g01', f: .5, who: 'B', icon: 'meh', label: '12 meh' },
      { line: 'g02', f: .5, who: 'R', icon: 'food', label: 'meha xwarinê?' },
      { line: 'i04', f: .1, tf: .5, hold: 0, who: 'R', icon: 'qaput+no', label: 'qapût?' },
      { line: 'i04', f: .55, who: 'R', icon: 'zebes', label: 'zebeş!' },
    ],
    icons: Object.fromEntries(Object.keys(ART).map(k => [k, () => ART[k]])),
    vocab: [
      ['demsal', 'mevsim'],
      ['bihar', 'ilkbahar'],
      ['havîn', 'yaz'],
      ['payîz', 'sonbahar'],
      ['zivistan', 'kış'],
      ['germ · sar', 'sıcak · soğuk'],
      ['berf', 'kar'],
      ['kulîlk', 'çiçek'],
      ['pel', 'yaprak'],
      ['meh · sal', 'ay · yıl'],
      ['qeşa', 'buz'],
    ],
    vocabIcons: ['havin', 'bihar', 'sun', 'payiz', 'zivistan', 'thermo', 'zivistan', 'bihar', 'payiz', 'meh', 'zivistan'],
    vocabTts: {
      ku: ['دەمسال', 'Bihar', 'هاڤین', 'پاییز', 'زڤستان', 'گەرم، سار', 'بەرف', 'کولیلک', 'پەل', 'مەه، سال', 'قەشا'],
      tr: ['mevsim', 'ilkbahar', 'yaz', 'sonbahar', 'kış', 'sıcak, soğuk', 'kar', 'çiçek', 'yaprak', 'ay, yıl', 'buz'],
    },
    sfx(H) {
      const T = H.T, out = [];
      for (const l of SEQ) if (l.laugh) out.push({ type: 'rise', at: T(l.id, 0) });
      for (const x of CARD) out.push({ type: 'pop', at: T(x[0], 0) });
      out.push({ type: 'whoosh', at: T('b03', .1) }, { type: 'splash', at: T('cw2', .3) }, { type: 'sweep', at: T('dw', .1) }, { type: 'sweep', at: T('ew', .1) }, { type: 'ding', at: T('ew', .6) });
      for (let k = 0; k < 4; k++) out.push({ type: 'pop', at: T('fw', .1 + k * .2) });
      out.push({ type: 'cross', at: T('f04', .05) });
      for (const [a, b] of [[T('s1', 0), T('sw1', 1)], [T('s2', 0), T('sw2', 1)], [T('s3', 0), T('sw3', 1)]]) for (let x = a, k = 0; x < b; x += .22, k++) out.push({ type: k % 4 === 0 ? 'dum' : 'tek', at: x });
      out.push({ type: 'boing', at: T('z1', .7) }, { type: 'ding', at: T('zw', .3) }, { type: 'chime', at: T('z2', .2) });
      out.push({ type: 'splash', at: T('hw', .75) }, { type: 'whoosh', at: T('mw', .1) }, { type: 'pop', at: T('k03', .3) }, { type: 'boing', at: T('kw', .5) });
      for (let k = 0; k < 8; k++) out.push({ type: 'thud', at: T('lw', .05 + k * .12) });
      for (const id of ['i02', 'i04', 'i06', 'i08']) out.push({ type: 'ding', at: T(id, .8) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, Rr = P.R, Bb = P.B;
      // hapşırık
      if (t > T('bw', .5) && t < T('b03', .3)) { Rr.tilt = -16; Rr.expr = 'sleep'; }
      if (t > T('b03', 0) && t < T('b03', .4)) { Rr.tilt = 22; Rr.dx = -10; }
      // yazın mont: erir
      const m0 = T('cw', .2), m1 = T('cw2', .6), m2 = T('d01', 0), m3 = T('d01', .5);
      if (t > m0 && t < m3) { const u = t < m1 ? H.eio(H.seg(t, m0, m1)) : t < m2 ? 1 : 1 - H.eio(H.seg(t, m2, m3)); Rr.sc = 1 - .45 * u; Rr.sweat = true; Rr.expr = u > .5 ? 'dizzy' : 'sad'; Rr.red = .5 * u; }
      // yaprak yakalar: kolları dal gibi
      if (t > T('dw', 0) && t < T('d04', 1)) { Rr.la = [140 + Math.sin(t * 6) * 10, 150]; Rr.ra = [140 - Math.sin(t * 6) * 10, 150]; Rr.dx = Math.sin(t * 3) * 20 * (t < T('d03', 0) ? 1 : 0); }
      // kışın donar
      if (t > T('ew', .3) && t < T('e06', 0)) { Rr.expr = 'wide'; Rr.la = [20, 6]; Rr.ra = [20, 6]; Rr.dx = Math.sin(t * 50) * 3; }
      // kardan adam yapar
      if (t > T('fw', 0) && t < T('fw', 1)) { Rr.x = H.lerp(H.RX, SMX + 110, H.eio(H.seg(t, T('fw', 0), T('fw', .25)))); Rr.look = -1; Rr.la = [80 + Math.sin(t * 12) * 30, 60]; }
      if (t >= T('fw', 1) && t < T('f04', 1)) { Rr.x = SMX + 110; Rr.look = -1; }
      if (t >= T('f04', 1) && t < T('g01', .4)) { Rr.x = H.lerp(SMX + 110, H.RX, H.eio(H.seg(t, T('f04', 1), T('g01', .4)))); Rr.walk = t * 3; }
      // ters şemsiye: dolar, kafasına boşalır
      if (t > T('h02', .3) && t < T('h04', 1)) { Rr.la = [150, 176]; Rr.look = -1; }
      if (t > T('hw', .7) && t < T('h04', 1)) { Rr.expr = 'wide'; Rr.sweat = true; }
      // halay: el ele, adım; Ronî döner, başı döner
      const g0 = T('lw', 0), g1 = T('lw', 1);
      if (t > g0 && t < g1) { const u = (t - g0) / (g1 - g0), ph = t * 6; Bb.ra = [60, 20]; Rr.la = [60, 20]; Bb.dy = -Math.abs(Math.sin(ph)) * 16; Rr.dy = -Math.abs(Math.sin(ph + .5)) * 16; Bb.x = H.BX + Math.sin(ph / 2) * 30; Rr.x = H.RX - 120 + Math.sin(ph / 2) * 30; Bb.expr = 'happy'; Rr.expr = u > .6 ? 'dizzy' : 'happy'; if (u > .6) { Rr.look = Math.sin(t * 14) > 0 ? 1 : -1; Rr.rot = Math.sin(t * 8) * 12; } }
      if (t >= g1 && t < T('l05', 1)) { Rr.x = H.lerp(H.RX - 120, H.RX, H.seg(t, g1, g1 + .5)); }
      // rüzgâr: şapka uçar, peşinden koşar
      const w0 = T('mw', 0), w1 = T('mw', .45), w2 = T('m03', .2), w3 = T('m03', .9);
      if (t > T('mw', .1) && t < T('m03', 1)) Rr.noCap = true;
      if (t > w0 && t < w3) { const u = t < w1 ? H.eio(H.seg(t, T('mw', .2), w1)) : t < w2 ? 1 : 1 - H.eio(H.seg(t, w2, w3)); Rr.x = H.lerp(H.RX, 1300, u); if (u > 0 && u < 1) Rr.walk = t * 4.5; Rr.look = t < w2 ? 1 : -1; if (Rr.x > 1240) Rr.show = false; }
      // pastayı tek lokmada yer
      if (t > T('kw', .3) && t < T('kw', .7)) { Rr.mouth = 1; Rr.expr = 'happy'; }
      if (t > T('kw', .7) && t < T('k04', 1)) { Rr.expr = 'smug'; Rr.mouth = Math.abs(Math.sin(t * 14)) * .5; }
      // halay: omuz titretme, adım, elde mendil
      const dance = (O, a, b) => { if (t <= a || t >= b) return false; const ph = (t - a) * 7; O.dx = (O.dx || 0) + Math.sin(t * 46) * 4; O.dy = -Math.abs(Math.sin(ph)) * 16; O.walk = (t - a) * 1.6; O.la = [125, 100 + Math.sin(t * 14) * 18]; O.ra = [55, 25]; O.expr = 'happy'; O.mouth = O.mouth || (Math.sin(t * 9) > 0 ? .5 : .2); return true; };
      dance(Rr, T('s1', 0), T('sw1', 1)); dance(Rr, T('s2', 0), T('sw2', 1)); dance(Rr, T('s3', 0), T('sw3', 1));
      if (dance(Bb, T('sb2', .3), T('sw3', 1))) { Bb.la = [55, 25]; Bb.ra = [125, 100]; }
      // parmak kalbi
      if (t > T('z1', .4) && t < T('z2', 1) + 2) { Rr.la = [95, 120]; Rr.look = -1; Rr.expr = 'happy'; }
      if (t > T('zw', .2)) { Bb.red = Math.max(Bb.red || 0, .7 * H.seg(t, T('zw', .2), T('zw', .6))); if (t < T('z2', 0)) { Bb.expr = 'wide'; Bb.look = 1; } }
      // gülme
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) - .05 && t < T(l.id, .4));
      if (L) Bb.dy = -Math.abs(Math.sin((t - T(L.id, 0)) * 16)) * 12;
    },
    back(t, P, H) {
      const S = H.S, T = H.T, c = curCard(t, H), sn = season(t, H);
      let s = '';
      // pencere manzarası (mevsime göre)
      const sky = { none: null, baran: '#90A4AE', bihar: '#BDE7FF', havin: '#7FD3FF', payiz: '#FFD8A8', zivistan: '#CFD8DC' }[sn];
      if (sky) {
        s += `<clipPath id="win"><rect x="75" y="525" width="280" height="320"/></clipPath><g clip-path="url(#win)"><rect x="75" y="525" width="280" height="320" fill="${sky}"/>`;
        if (sn === 'bihar') { s += `<rect x="75" y="790" width="280" height="60" fill="#7CCB5B"/>`; for (let k = 0; k < 6; k++) s += `<g transform="translate(${95 + k * 46} ${800 + (k % 2) * 16}) scale(.6)">${flower(['#F06A9B', '#8E44AD', '#FFD23F'][k % 3])}</g>`; }
        if (sn === 'baran') for (let k = 0; k < 20; k++) { const p = ((t * 1.6 + k * .37) % 1); s += `<path d="M${80 + ((k * 53) % 270) - p * 30} ${520 + p * 330}l-8 22" stroke="#E3F2FD" stroke-width="4" stroke-linecap="round"/>`; }
        if (sn === 'havin') s += `<circle cx="290" cy="590" r="38" fill="#FFB300"/><rect x="75" y="800" width="280" height="50" fill="#FFE082"/>`;
        if (sn === 'payiz') { s += `<rect x="75" y="800" width="280" height="50" fill="#D7A86E"/>`; for (let k = 0; k < 7; k++) { const p = ((t * .35 + k / 7) % 1); s += `<g transform="translate(${95 + ((k * 61) % 260) + Math.sin(t * 2 + k) * 14} ${520 + p * 320}) rotate(${t * 80 + k * 50}) scale(.7)">${leaf(k % 2 ? '#E67E22' : '#C0392B')}</g>`; } }
        if (sn === 'zivistan') { s += `<rect x="75" y="790" width="280" height="60" fill="#fff"/>`; for (let k = 0; k < 18; k++) { const p = ((t * .25 + k / 18) % 1); s += `<circle cx="${85 + ((k * 47) % 270) + Math.sin(t + k) * 8}" cy="${520 + p * 320}" r="${3 + (k % 3)}" fill="#fff"/>`; } }
        s += `</g><path d="M215 520v330M70 685h290" ${S} stroke-width="7"/>`;
      }
      // kart
      s += `<g transform="translate(${PX} ${PY})"><path d="M-70 120l20 -40M70 120l-20 -40" ${S} stroke-width="8"/><rect x="-120" y="-130" width="240" height="220" rx="16" fill="#2E5E4E" ${S} stroke-width="7"/><rect x="-104" y="-114" width="208" height="188" rx="8" fill="#fff"/>`;
      if (c) { const a = T(c[0], 0), p = H.back(H.seg(t, a, a + .35)); s += c[1] ? `<g transform="translate(0 -26) scale(${1.5 * p})">${ART[c[1]]}</g>` : `<text y="20" text-anchor="middle" font-size="100" font-weight="800" fill="#E53935" transform="scale(${p})">${c[2]}</text>`; if (c[1]) s += `<text y="62" text-anchor="middle" font-size="${c[2].length > 9 ? 26 : 36}" font-weight="800" fill="${INKC}">${c[2]}</text>`; }
      s += `</g>`;
      // kardan adam (Ronî'ye benziyor)
      const f0 = T('fw', 0);
      if (t > f0 && t < T('g01', .4)) { const p = H.seg(t, f0, T('fw', .85)); s += `<g transform="translate(${SMX} ${H.FLOOR - 10})">`; if (p > .1) s += `<circle cy="-70" r="70" fill="#fff" ${S} stroke-width="6"/>`; if (p > .45) s += `<circle cy="-190" r="52" fill="#fff" ${S} stroke-width="6"/>`; if (p > .75) s += `<circle cy="-290" r="40" fill="#fff" ${S} stroke-width="6"/><circle cx="-12" cy="-296" r="5" fill="${INKC}"/><circle cx="12" cy="-296" r="5" fill="${INKC}"/><path d="M0 -288l26 8l-26 6z" fill="#FF9F43" ${S} stroke-width="2"/><path d="M-12 -276q12 8 24 0" fill="none" ${S} stroke-width="4"/>`; if (p > .95) s += `<path d="M-42 -312a42 42 0 0 1 84 0z" fill="${H.BLUE}" ${S} stroke-width="6"/><path d="M-20 -314L-90 -310" stroke="#1E5FBF" stroke-width="14" stroke-linecap="round"/><path d="M-50 -190l-60 -40M50 -190l60 -40" stroke="#8D5A2B" stroke-width="7" stroke-linecap="round"/>`; s += `</g>`; }
      return s;
    },
    front(t, P, H) {
      const T = H.T, Rr = P.R, S = H.S;
      let s = '';
      const L = SEQ.find(l => l.laugh && t >= T(l.id, 0) && t < T(l.id, 0) + 1);
      if (L) { const u = t - T(L.id, 0); s += `<text x="${H.BX - 190}" y="${H.FLOOR - 470 - u * 30}" font-size="50" font-weight="800" fill="#E0407B" opacity="${1 - u * .8}" transform="rotate(-8 ${H.BX - 190} ${H.FLOOR - 470})">hi hi hi!</text>`; }
      const sc = Rr.sc || 1, cx = Rr.x + (Rr.dx || 0), base = H.FLOOR - 10 + (Rr.dy || 0);
      // bahar: elindeki çiçek + hapşırınca yapraklar uçar
      if (t > T('b02', 0) && t < T('b04', 1)) { const [hx, hy] = H.hand(Rr, -1); s += `<g transform="translate(${hx} ${hy - 20}) scale(.8)"><path d="M0 0v40" stroke="#2EAD4B" stroke-width="6"/>${flower('#F06A9B')}</g>`; }
      if (t > T('b03', 0) && t < T('b03', 0) + 1.4) { const u = (t - T('b03', 0)) / 1.4; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k - 5) * .3; s += `<ellipse cx="${cx - 60 + Math.cos(a) * 320 * u}" cy="${base - 360 + Math.sin(a) * 200 * u + 260 * u * u}" rx="10" ry="7" fill="#F06A9B" opacity="${1 - u}"/>`; } s += `<text x="${cx - 260}" y="${base - 470}" font-size="64" font-weight="800" fill="#E53935" opacity="${1 - u}">HAPŞÛ!</text>`; }
      // ters şemsiye + su
      if (t > T('h02', .3) && t < T('h04', 1)) { const [hx, hy] = H.hand(Rr, -1), fill = H.seg(t, T('hw', 0), T('hw', .6)), tip = t > T('hw', .65) ? H.eio(H.seg(t, T('hw', .65), T('hw', .85))) : 0;
        s += `<g transform="translate(${hx} ${hy}) rotate(${180 + tip * 150})"><path d="M0 0v-60" stroke="${INKC}" stroke-width="6"/><path d="M-60 -60a60 46 0 0 1 120 0q-15 -12 -30 0q-15 -12 -30 0q-15 -12 -30 0q-15 -12 -30 0z" fill="#E53935" ${S} stroke-width="5"/>${fill > 0 && tip < .5 ? `<path d="M-50 -64q50 ${-34 * fill} 100 0z" fill="#6EC6FF" opacity=".85"/>` : ''}</g>`;
        if (t > T('hw', 0) && t < T('hw', .7)) for (let k = 0; k < 10; k++) { const p = ((t * 1.6 + k * .37) % 1); s += `<path d="M${hx - 70 + (k * 29) % 140} ${hy - 420 + p * 330}l-6 18" stroke="#6EC6FF" stroke-width="4" stroke-linecap="round"/>`; }
        if (tip > .3 && t < T('h03', .6)) { const u = H.seg(t, T('hw', .7), T('h03', .6)); for (let k = 0; k < 8; k++) s += `<circle cx="${cx - 40 + k * 12}" cy="${base - 470 + u * 400 + (k % 3) * 20}" r="10" fill="#6EC6FF" opacity="${1 - u * .6}"/>`; } }
      if (t > T('h03', .4) && t < T('l01', 0)) s += `<ellipse cx="${cx}" cy="${H.FLOOR}" rx="90" ry="14" fill="#6EC6FF" opacity=".8" ${S} stroke-width="4"/>`;
      // Newroz ateşi (pencere önünde)
      if (t > T('l01', 0) && t < T('c01', 0)) s += `<g transform="translate(200 ${H.FLOOR - 70}) scale(${1.8 + Math.sin(t * 12) * .08})">${ART.newroz}</g>`;
      // yazın mont + atkı, sonra su birikintisi
      if (t > T('c02', .4) && t < T('d01', .5)) { s += `<g transform="translate(${cx} ${base - 244 * sc}) scale(${1.5 * sc})">${ART.qaput}</g><path d="M${cx - 34 * sc} ${base - 326 * sc}h${68 * sc}" stroke="#E53935" stroke-width="${16 * sc}" stroke-linecap="round"/>`; }
      if (t > T('cw', .4) && t < T('d01', .5)) { const u = H.seg(t, T('cw', .4), T('cw2', .8)); s += `<ellipse cx="${cx}" cy="${H.FLOOR}" rx="${60 + 90 * u}" ry="${10 + 10 * u}" fill="#6EC6FF" opacity=".8" ${S} stroke-width="4"/>`; for (let k = 0; k < 5; k++) { const p = ((t * 1.4 + k / 5) % 1); s += `<path d="M${cx - 50 + k * 25} ${base - 380 * sc + p * 300 * sc}q-7 12 0 18q7 -6 0 -18z" fill="#6EC6FF" ${S} stroke-width="3" opacity="${1 - p}"/>`; } }
      // güz: kafada biriken yapraklar
      if (t > T('dw', 0) && t < T('e01', .3)) { const n = Math.min(14, Math.floor(H.seg(t, T('dw', 0), T('dw', .9)) * 14)); for (let k = 0; k < n; k++) s += `<g transform="translate(${cx - 60 + (k * 37) % 120} ${base - 470 - (k % 4) * 22}) rotate(${k * 67}) scale(.9)">${leaf(k % 2 ? '#E67E22' : '#C0392B')}</g>`; for (let k = 0; k < 4; k++) { const p = ((t * .6 + k / 4) % 1); s += `<g transform="translate(${cx - 120 + k * 80} ${base - 700 + p * 260}) rotate(${t * 90 + k * 40}) scale(.8)">${leaf('#E67E22')}</g>`; } }
      // kışın deniz kıyafeti: simit + güneş gözlüğü, sonra buz
      if (t > T('e02', .3) && t < T('f01', 0)) { s += `<ellipse cx="${cx}" cy="${base - 190}" rx="80" ry="26" fill="#FF7043" ${S} stroke-width="6"/><path d="M${cx - 60} ${base - 196}h20M${cx + 40} ${base - 196}h20" stroke="#fff" stroke-width="10"/>`; s += `<g transform="translate(${cx - 4} ${base - 392})"><circle cx="-22" r="15" fill="${INKC}"/><circle cx="22" r="15" fill="${INKC}"/><path d="M-8 0h16" ${S} stroke-width="5"/></g>`; }
      if (t > T('ew', .3) && t < T('e06', 0)) { const u = H.seg(t, T('ew', .3), T('ew', .9)); s += `<rect x="${cx - 110}" y="${base - 480}" width="220" height="480" rx="40" fill="#BFE6FF" opacity="${.55 * u}" stroke="#6EC6FF" stroke-width="6" stroke-opacity="${u}"/>`; for (let k = 0; k < 5; k++) s += `<path d="M${cx - 80 + k * 40} ${base - 480}l8 ${30 * u}l8 ${-30 * u}" fill="#fff" stroke="#6EC6FF" stroke-width="3"/>`; s += `<text x="${cx + 120}" y="${base - 450}" font-size="48" font-weight="800" fill="#2F7DE1" opacity="${u}">brrr!</text>`; }
      // halay mendilleri + notalar
      const kerchief = (O) => { const [hx, hy] = H.hand(O, -1); return `<path d="M${hx} ${hy}q${20 + Math.sin(t * 12) * 12} ${-30} ${46} ${-6 + Math.sin(t * 15) * 10}q-16 ${22} -46 ${6}z" fill="#E53935" ${S} stroke-width="4"/>`; };
      for (const [a, b] of [[T('s1', 0), T('sw1', 1)], [T('s2', 0), T('sw2', 1)], [T('s3', 0), T('sw3', 1)]]) if (t > a && t < b) { s += kerchief(Rr); for (let k = 0; k < 4; k++) { const p = ((t * .8 + k / 4) % 1), x = Rr.x - 40 + Math.sin(k * 3 + t * 2) * 110, y = H.FLOOR - 480 - p * 180; s += `<text x="${x}" y="${y}" font-size="${44 + k * 4}" font-weight="800" fill="${k % 2 ? '#8E44AD' : '#E53935'}" opacity="${1 - p}" transform="rotate(${Math.sin(t * 6 + k) * 25} ${x} ${y})">♪</text>`; } }
      if (t > T('sb2', .3) && t < T('sw3', 1)) s += kerchief(P.B);
      // parmak kalbi (Ronî → Berfîn)
      if (t > T('z1', .4) && t < T('z2', 1) + 2) {
        const [hx, hy] = H.hand(Rr, -1), p = H.back(H.seg(t, T('z1', .4), T('z1', .8)));
        s += `<g transform="translate(${hx - 4} ${hy - 14}) rotate(-12) scale(${1.15 * p})"><path d="M-20 10q-6 -26 8 -34q10 -6 14 6l6 -18q8 -14 16 -2l-2 18q14 2 14 16v20q0 22 -26 24q-30 0 -30 -30z" fill="#FFC1C1" stroke="#5B2BD6" stroke-width="5" stroke-linejoin="round"/><path d="M0 4q10 -6 22 -4M2 16q10 -4 20 -2M4 28q8 -2 16 0" fill="none" stroke="#5B2BD6" stroke-width="4" stroke-linecap="round"/></g>`;
        if (t > T('z1', .7)) { const q = H.back(H.seg(t, T('z1', .7), T('z1', 1))), b = 1 + Math.sin(t * 8) * .08; s += `<g transform="translate(${hx - 8} ${hy - 80}) scale(${q * b})"><path d="M0 18C-30 -4 -18 -28 0 -14C18 -28 30 -4 0 18Z" fill="#F0569B" stroke="#5B2BD6" stroke-width="5"/><path d="M-34 -24l-14 -6M-36 -6l-16 4M34 -24l14 -6M36 -6l16 4" stroke="#5B2BD6" stroke-width="6" stroke-linecap="round"/></g>`; }
        if (t > T('zw', 0)) for (let k = 0; k < 7; k++) { const pp = ((t * .45 + k / 7) % 1), x = H.lerp(hx, H.BX - 20, pp) + Math.sin(t * 3 + k) * 30, y = hy - 100 - pp * 200 - k * 6, r = 14 + (k % 3) * 6; s += `<path d="M${x} ${y + r * .55}C${x - r * 1.5} ${y - r * .2} ${x - r * .9} ${y - r * 1.4} ${x} ${y - r * .7}C${x + r * .9} ${y - r * 1.4} ${x + r * 1.5} ${y - r * .2} ${x} ${y + r * .55}Z" fill="${k % 2 ? '#F0569B' : '#E53935'}" opacity="${1 - pp * .7}"/>`; }
      }
      // rüzgâr çizgileri + uçan şapka
      if (t > T('m01', 0) && t < T('m03', 1)) for (let k = 0; k < 5; k++) { const p = ((t * 1.2 + k / 5) % 1); s += `<path d="M${-100 + p * 1300} ${400 + k * 90}q60 -20 120 0" fill="none" stroke="#bbb" stroke-width="6" stroke-linecap="round" opacity="${1 - p}"/>`; }
      if (t > T('mw', .1) && t < T('m03', 1)) { const u = H.seg(t, T('mw', .1), T('m03', .8)), x = H.lerp(H.RX, 1350, u), y = H.FLOOR - 470 - Math.sin(u * Math.PI * 3) * 60; s += `<g transform="translate(${x} ${y}) rotate(${u * 720})"><path d="M-40 0a40 34 0 0 1 80 0z" fill="${H.BLUE}" ${S} stroke-width="6"/><path d="M20 -2l60 4" stroke="#1E5FBF" stroke-width="14" stroke-linecap="round"/></g>`; }
      // doğum günü pastası
      if (t > T('k03', .3) && t < T('kw', .5)) { const p = H.back(H.seg(t, T('k03', .3), T('k03', .6))); s += `<g transform="translate(640 ${H.FLOOR - 140}) scale(${2.2 * p})">${ART.pasta}</g>`; }
      if (t > T('k03', .5) && t < T('kw', .4)) s += `<text x="640" y="${H.FLOOR - 270}" text-anchor="middle" font-size="40" font-weight="800" fill="#E0407B">🎉</text>`;
      if (t > T('kw', .5) && t < T('k04', 1)) s += `<text x="${H.RX + 70}" y="${H.FLOOR - 470}" font-size="44" font-weight="800" fill="#E0407B">nam!</text>`;
      // çay
      if (t > T('e06', 0) && t < T('f01', 0)) { const [hx, hy] = H.hand(Rr, -1); s += `<g transform="translate(${hx} ${hy - 30}) scale(.7)">${ART.tea}</g>`; }
      // kış dışarıda kar (pencere dışında da sahnede hafif kar)
      if (season(t, H) === 'zivistan' && t < T('g01', 0)) for (let k = 0; k < 24; k++) { const p = ((t * .2 + k / 24) % 1); s += `<circle cx="${(k * 97) % 1080 + Math.sin(t + k) * 12}" cy="${p * H.FLOOR}" r="${3 + (k % 3)}" fill="#fff" opacity=".85"/>`; }
      return s;
    },
  };
})();
