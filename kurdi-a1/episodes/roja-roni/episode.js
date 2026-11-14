// "Roja Ronî" — A1 dubare (uzun bölüm, 5 sahne: sibeh · taştê · dikan · werziş · şev)
// Sesler: Kürtçe metin sese ARAP HARFLİ Kürtçe yazımla verilir (tts alanı); her sahne + konuşmacı tek uzun kayıt
// ([long pause] ile ayrılmış), sonra sessizliklerden bölünür → audio/<id>.mp3
(function () {
  const INKC = '#1f1b16', TY = 985;
  const B = (id, ku, tr, tts, o = {}) => ({ id, who: 'B', ku, tr, tts, ...o });
  const R = (id, ku, tr, tts, o = {}) => ({ id, who: 'R', ku, tr, tts, ...o });

  const SEQ = [
    // ---------- 1 · SIBEH ----------
    B('a01', '*Rojbaş*, Ronî! Rabe!', 'Günaydın Ronî! Kalk!', '[cheerful] ڕۆژباش، رۆنی! رابە!', { s: { pose: 'wave', expr: 'happy' }, l: { pose: 'idle', expr: 'sleep', tilt: 14 } }),
    R('a02', 'Pênc *deqîqe*…', 'Beş dakika…', '[sleepy] پێنج دەقیقە…', { s: { pose: 'idle', expr: 'sleep', tilt: 14 }, l: { pose: 'hips', expr: 'normal' } }),
    B('a03', 'Na! Saet *heft* e!', 'Hayır! Saat yedi!', '[frustrated] نا! سەعەت هەفتە!', { s: { pose: 'up', expr: 'angry', red: .3 }, l: { pose: 'face', expr: 'sleep', tilt: 6 } }),
    R('a14', 'Heft?! Pir *zû* ye!', 'Yedi mi?! Çok erken!', '[whining] هەفت؟! پر زوویە!', { s: { pose: 'face', expr: 'sad' }, l: { pose: 'hips', expr: 'angry' } }),
    R('a04', 'Îro çi *roj* e?', 'Bugün günlerden ne?', '[sleepy] ئیرۆ چ رۆژە؟', { s: { pose: 'think', expr: 'normal' }, l: { pose: 'hips', expr: 'normal' } }),
    B('a05', 'Îro *duşem* e. *Dibistan* heye!', 'Bugün pazartesi. Okul var!', '[mischievously] ئیرۆ دوشەمە. دبستان هەیە!', { s: { pose: 'point', expr: 'smug' }, l: { pose: 'idle', expr: 'wide' } }),
    R('a06', 'Dibistan?! Ez *dereng* im!', 'Okul mu?! Geç kaldım!', '[panicked] دبستان؟! ئەز دەرەنگم!', { s: { pose: 'up', expr: 'wide', shake: 1, sweat: true }, l: { pose: 'idle', expr: 'smug' } }),
    { id: 'ar', wait: 3 },
    R('a07', 'Berfîn… dibistan *girtî* ye.', 'Berfîn… okul kapalı.', '[tired] بەرفین… دبستان گرتییە.', { gap: .2, s: { pose: 'down', expr: 'sad' }, l: { pose: 'idle', expr: 'happy' } }),
    B('a08', 'Erê. Îro *yekşem* e!', 'Evet. Bugün pazar!', '[laughing] ئەرێ. ئیرۆ یەکشەمە!', { s: { pose: 'cheer', expr: 'happy', hop: 26 }, l: { pose: 'idle', expr: 'wide' } }),
    R('a09', 'Te *çima* got duşem?!', 'Neden pazartesi dedin?!', '[angry] تە چما گۆت دوشەم؟!', { s: { pose: 'up', expr: 'angry', red: .6, shake: 1 }, l: { pose: 'idle', expr: 'happy' } }),
    B('a10', '*Henek* bû!', 'Şakaydı!', '[giggling] هەنەک بوو!', { s: { pose: 'shrug', expr: 'happy' }, l: { pose: 'hips', expr: 'angry', red: .5 } }),
    R('a11', 'Ez dîsa *radizêm*.', 'Ben yine uyuyorum.', '[annoyed] ئەز دیسا رادزێم.', { s: { pose: 'idle', expr: 'sleep', tilt: 14 }, l: { pose: 'idle', expr: 'happy' } }),
    B('a12', 'Na! *Taştê* amade ye!', 'Hayır! Kahvaltı hazır!', '[cheerful] نا! تاشتێ ئامادەیە!', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'sleep', tilt: 14 } }),
    R('a13', 'Taştê?! Ez *hatim*!', 'Kahvaltı mı?! Geldim!', '[excited] تاشتێ؟! ئەز هاتم!', { s: { pose: 'cheer', expr: 'happy', hop: 40 }, l: { pose: 'face', expr: 'happy' } }),

    // ---------- 2 · TAŞTÊ ----------
    { id: 'k2', card: { ku: 'Taştê', tr: 'Kahvaltı' } },
    B('b01', 'Tu *birçî* yî?', 'Aç mısın?', '[curious] تو برچی یی؟', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } }),
    R('b02', 'Erê! Ez pir *birçî* me!', 'Evet! Çok açım!', '[excited] ئەرێ! ئەز پر برچی مە!', { s: { pose: 'cheer', expr: 'happy', hop: 26 } }),
    B('b03', 'Tu çi *dixwî*?', 'Ne yersin?', '[curious] تو چ دخوی؟', { s: { pose: 'point', expr: 'happy' } }),
    R('b04', '*Nan*, *penîr*, *hêk* û *zeytûn*!', 'Ekmek, peynir, yumurta ve zeytin!', '[happy] نان، پەنیر، هێک ئوو زەیتوون!', { s: { pose: 'point', expr: 'happy' } }),
    B('b13', 'Tu *şîr* dixwazî?', 'Süt ister misin?', '[curious] تو شیر دخوازی؟', { s: { pose: 'show', expr: 'happy' } }),
    R('b14', 'Na, spas. Ez ji şîr *hez nakim*.', 'Hayır, sağ ol. Süt sevmem.', '[disgusted] نا، سپاس. ئەز ژ شیر هەز ناکم.', { s: { pose: 'shrug', expr: 'sad' } }),
    B('b05', 'Tu *çend* hêkan dixwî?', 'Kaç yumurta yersin?', '[curious] تو چەند هێکان دخوی؟', { s: { pose: 'think', expr: 'normal' } }),
    R('b06', '*Deh* hêkan!', 'On yumurta!', '[confident] دەه هێکان!', { s: { pose: 'hips', expr: 'smug' } }),
    B('b07', 'Deh?! Ronî, ew *pir* e!', 'On mu?! Ronî, bu çok fazla!', '[shocked] دەه؟! رۆنی، ئەو پرە!', { s: { pose: 'up', expr: 'wide' }, l: { pose: 'hips', expr: 'smug' } }),
    R('b08', 'Baş e… *neh* hêkan.', 'Tamam… dokuz yumurta.', '[reluctant] باشە… نەه هێکان.', { s: { pose: 'shrug', expr: 'sad' }, l: { pose: 'face', expr: 'sleep' } }),
    { id: 'bw', wait: 3 },
    B('b09', 'Tu *çayê* vedixwî?', 'Çay içer misin?', '[curious] تو چایێ ڤەدخوی؟', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'hips', expr: 'happy' } }),
    R('b10', 'Erê! *Bîst* çay!', 'Evet! Yirmi çay!', '[excited] ئەرێ! بیست چای!', { s: { pose: 'cheer', expr: 'happy', hop: 20 } }),
    B('b11', 'Bîst?! Îşev *xew* tune!', 'Yirmi mi?! Bu gece uyku yok!', '[shocked] بیست؟! ئیشەڤ خەو تونە!', { s: { pose: 'up', expr: 'wide' } }),
    R('b12', 'Ne *xem* e!', 'Dert değil!', '[carefree] نە خەمە!', { s: { pose: 'shrug', expr: 'smug' }, l: { pose: 'face', expr: 'sleep' } }),

    // ---------- 3 · DIKAN ----------
    { id: 'k3', card: { ku: 'Nîvro', tr: 'Öğle' } },
    B('c01', 'Ronî, em *bilîzin*! Ev *dikana* min e.', 'Ronî, oynayalım! Bu benim dükkânım.', '[excited] رۆنی، ئەم بلیزن! ئەڤ دکانا منە.', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } }),
    R('c02', 'Baş e! Rojbaş, *xanim*!', 'Tamam! İyi günler hanımefendi!', '[playful] باشە! ڕۆژباش، خانم!', { s: { pose: 'wave', expr: 'happy' } }),
    B('c03', '*Bi xêr hatî*! Tu çi *dixwazî*?', 'Hoş geldin! Ne istiyorsun?', '[warmly] ب خێر هاتی! تو چ دخوازی؟', { s: { pose: 'show', expr: 'happy' } }),
    R('c04', 'Ev sêv *bi çiqas* e?', 'Bu elma ne kadar?', '[curious] ئەڤ سێڤ ب چقاسە؟', { s: { pose: 'point', expr: 'normal' } }),
    B('c05', 'Sêv bi *du lîreyan* e.', 'Elma iki lira.', '[confident] سێڤ ب دو لیرەیانە.', { s: { pose: 'hips', expr: 'happy' } }),
    R('c06', 'Pir *biha* ye! Yek lîre?', 'Çok pahalı! Bir lira?', '[shocked] پر بهایە! یەک لیرە؟', { s: { pose: 'up', expr: 'wide' }, then: [{ f: .55, s: { pose: 'point', expr: 'smug' } }] }),
    B('c07', 'Na! *Du* lîre!', 'Hayır! İki lira!', '[firm] نا! دو لیرە!', { s: { pose: 'hips', expr: 'angry' }, l: { pose: 'idle', expr: 'sad' } }),
    R('c08', 'Baş e… Û ev *pisîk* bi çiqas e?', 'Peki… Ya bu kedi ne kadar?', '[curious] باشە… ئوو ئەڤ پسیک ب چقاسە؟', { s: { pose: 'shrug', expr: 'sad' }, then: [{ f: .4, s: { pose: 'down', expr: 'happy' } }], l: { pose: 'hips', expr: 'happy' } }),
    B('c09', 'Pisîk *nayê firotin*!', 'Kedi satılık değil!', '[offended] پسیک نایێ فرۆتن!', { s: { pose: 'up', expr: 'angry', red: .3 }, l: { pose: 'idle', expr: 'smug' } }),
    R('c10', '*Deh* lîre?', 'On lira?', '[sly] دەه لیرە؟', { s: { pose: 'point', expr: 'smug' }, l: { pose: 'hips', expr: 'angry' } }),
    B('c11', 'Na, na!', 'Hayır, hayır!', '[firm] نا، نا!', { gap: .2, s: { pose: 'hips', expr: 'angry' } }),
    R('c12', '*Sed* lîre?', 'Yüz lira?', '[sly] سەد لیرە؟', { gap: .2, s: { pose: 'point', expr: 'smug' } }),
    B('c13', 'Na, na, na!', 'Hayır, hayır, hayır!', '[firm] نا، نا، نا!', { gap: .2, s: { pose: 'hips', expr: 'angry', shake: 1 } }),
    R('c14', '*Hezar* lîre?', 'Bin lira?', '[whispers] هەزار لیرە؟', { gap: .3, s: { pose: 'cheer', expr: 'smug' }, l: { pose: 'think', expr: 'wide' } }),
    B('c15', 'Hezar?… Baş e! Pisîk *a te* ye!', 'Bin mi?… Tamam! Kedi senin!', '[thoughtful] هەزار؟… [happy] باشە! پسیک یا تەیە!', { gap: .5, s: { pose: 'think', expr: 'wide' }, then: [{ f: .5, s: { pose: 'cheer', expr: 'happy' } }], l: { pose: 'idle', expr: 'happy' } }),
    { id: 'cw', wait: 2.2 },
    B('c16', 'Ay! *Bibore*, pisîkê! Henek bû!', 'Ay! Affet kedicik! Şakaydı!', '[panicked] ئای! ببۆرە، پسیکێ! هەنەک بوو!', { gap: .1, s: { pose: 'up', expr: 'sad', tear: true, shake: 1 }, l: { pose: 'idle', expr: 'wide' } }),
    R('c17', 'Pisîk pir *hêrs* e!', 'Kedi çok kızgın!', '[laughing] پسیک پر هێرسە!', { s: { pose: 'point', expr: 'happy' }, l: { pose: 'face', expr: 'sad', tear: true } }),
    B('c18', 'Ronî, *alîkarî* bike!', 'Ronî, yardım et!', '[pleading] رۆنی، ئالیکاری بکە!', { s: { pose: 'up', expr: 'sad', tear: true, shake: 1 }, l: { pose: 'idle', expr: 'happy' } }),
    R('c19', 'Na, spas! Ez ji pisîkan *ditirsim*!', 'Hayır, sağ ol! Ben kedilerden korkarım!', '[nervous] نا، سپاس! ئەز ژ پسیکان دترسم!', { s: { pose: 'shrug', expr: 'wide', sweat: true }, l: { pose: 'face', expr: 'sad', tear: true } }),

    // ---------- 4 · WERZIŞ ----------
    { id: 'k4', card: { ku: 'Piştî nîvro', tr: 'Öğleden sonra' } },
    B('d01', 'Ronî, em *werzişê* bikin!', 'Ronî, spor yapalım!', '[energetic] رۆنی، ئەم وەرزشێ بکن!', { s: { pose: 'cheer', expr: 'happy', hop: 26 }, l: { pose: 'idle', expr: 'normal' } }),
    R('d02', 'Werziş? Ez *westiyayî* me.', 'Spor mu? Ben yorgunum.', '[tired] وەرزش؟ ئەز وەستیایی مە.', { s: { pose: 'down', expr: 'sad' } }),
    B('d03', 'Tu tenê *dixwî* û *radizî*! Rabe!', 'Sen sadece yiyip uyuyorsun! Kalk!', '[scolding] تو تەنێ دخوی ئوو رادزی! رابە!', { s: { pose: 'hips', expr: 'angry', red: .3 }, l: { pose: 'down', expr: 'sad' } }),
    B('d04', '*Destên* xwe bilind bike!', 'Ellerini kaldır!', '[commanding] دەستێن خوە بلند بکە!', { s: { pose: 'up', expr: 'happy' }, l: { pose: 'down', expr: 'sad' } }),
    R('d05', 'Baş e, baş e…', 'Tamam, tamam…', '[tired] باشە، باشە…', { s: { pose: 'up', expr: 'sad' } }),
    B('d06', 'Yek, du, sê! *Bibeze*!', 'Bir, iki, üç! Koş!', '[energetic] یەک، دو، سێ! ببەزە!', { s: { pose: 'cheer', expr: 'happy', hop: 20 }, l: { pose: 'idle', expr: 'wide', sweat: true } }),
    R('d07', '*Lingên* min diêşin!', 'Bacaklarım ağrıyor!', '[whining] لنگێن من دئێشن!', { s: { pose: 'down', expr: 'sad', sweat: true } }),
    B('d08', '*Dîsa*! Yek, du, sê!', 'Bir daha! Bir, iki, üç!', '[energetic] دیسا! یەک، دو، سێ!', { s: { pose: 'cheer', expr: 'happy', hop: 20 }, l: { pose: 'idle', expr: 'wide', sweat: true } }),
    R('d09', '*Serê* min diêşe! *Pişta* min diêşe!', 'Başım ağrıyor! Sırtım ağrıyor!', '[whining] سەرێ من دئێشە! پشتا من دئێشە!', { s: { pose: 'face', expr: 'sad', sweat: true }, then: [{ f: .5, s: { pose: 'hips', expr: 'sad', sweat: true, tilt: 14 } }] }),
    B('d10', 'Ronî, tenê *du deqîqe* derbas bûn!', 'Ronî, sadece iki dakika geçti!', '[deadpan] رۆنی، تەنێ دو دەقیقە دەرباس بوون!', { s: { pose: 'face', expr: 'sleep' }, l: { pose: 'down', expr: 'sad', sweat: true } }),
    R('d11', 'Du deqîqe?! Ez *dimirim*!', 'İki dakika mı?! Ölüyorum!', '[dramatic] دو دەقیقە؟! ئەز دمرم!', { s: { pose: 'up', expr: 'wide', sweat: true }, then: [{ f: .55, s: { pose: 'down', expr: 'dizzy', tilt: 24 } }] }),
    B('d12', 'Baş e, *bes* e. Tu *avê* dixwazî?', 'Tamam, yeter. Su ister misin?', '[gently] باشە، بەسە. تو ئاڤێ دخوازی؟', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'down', expr: 'dizzy', tilt: 24 } }),
    R('d13', 'Na… *çay*!', 'Hayır… çay!', '[weakly] نا… چای!', { gap: .5, s: { pose: 'cheer', expr: 'dizzy', tilt: 24 }, l: { pose: 'face', expr: 'sleep' } }),

    // ---------- 5 · ŞÎV ----------
    { id: 'k5', card: { ku: 'Êvar', tr: 'Akşam' } },
    B('f01', 'Ronî, tu ji bo *şîvê* çi dixwazî?', 'Ronî, akşam yemeğinde ne istersin?', '[curious] رۆنی، تو ژ بۆ شیڤێ چ دخوازی؟', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } }),
    R('f02', '*Pîzza*!', 'Pizza!', '[excited] پیتزا!', { s: { pose: 'cheer', expr: 'happy', hop: 30 } }),
    B('f03', 'Pîzza *tune*. *Şorbe* heye.', 'Pizza yok. Çorba var.', '[deadpan] پیتزا تونە. شۆربە هەیە.', { s: { pose: 'hips', expr: 'normal' }, l: { pose: 'down', expr: 'sad' } }),
    R('f04', 'Ez ji şorbeyê *hez nakim*.', 'Ben çorba sevmem.', '[whining] ئەز ژ شۆربەیێ هەز ناکم.', { s: { pose: 'shrug', expr: 'sad' } }),
    B('f05', 'Şorbe pir *xweş* e! *Bixwe*!', 'Çorba çok lezzetli! Ye!', '[firm] شۆربە پر خوەشە! بخوە!', { s: { pose: 'point', expr: 'angry' }, l: { pose: 'down', expr: 'sad' } }),
    { id: 'fw', wait: 1.8 },
    R('f06', 'Ax! Pir *germ* e!', 'Ah! Çok sıcak!', '[shouting] ئاخ! پر گەرمە!', { gap: .05, s: { pose: 'up', expr: 'wide', red: .9, shake: 1, sweat: true }, l: { pose: 'idle', expr: 'wide' } }),
    B('f07', '*Hêdî* bixwe!', 'Yavaş ye!', '[scolding] هێدی بخوە!', { s: { pose: 'hips', expr: 'angry' }, l: { pose: 'up', expr: 'wide', red: .9, shake: 1 } }),
    R('f08', '*Av*! Av! *Zû*!', 'Su! Su! Çabuk!', '[panicked] ئاڤ! ئاڤ! زوو!', { s: { pose: 'up', expr: 'wide', red: .9, shake: 1, sweat: true } }),
    B('f09', '*Fermo*, av.', 'Buyur, su.', '[calm] فەرموو، ئاڤ.', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'wide', red: .5 } }),
    R('f10', 'Spas… *Niha* şorbe *sar* e.', 'Sağ ol… Şimdi de çorba soğuk.', '[disappointed] سپاس… نها شۆربە سارە.', { gap: .9, s: { pose: 'down', expr: 'sad' }, l: { pose: 'idle', expr: 'happy' } }),
    B('f11', 'Ronî! Bixwe û *bêdeng* be!', 'Ronî! Ye ve sus!', '[angry] رۆنی! بخوە ئوو بێدەنگ بە!', { s: { pose: 'up', expr: 'angry', red: .7, shake: 1 }, l: { pose: 'idle', expr: 'wide' } }),

    // ---------- 6 · FÎLM ----------
    { id: 'k6', card: { ku: 'Şeva fîlman', tr: 'Film gecesi' } },
    B('g01', 'Em li *fîlmekî* temaşe bikin?', 'Bir film izleyelim mi?', '[curious] ئەم ل فیلمەکی تەماشە بکن؟', { s: { pose: 'show', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } }),
    R('g02', 'Erê! Fîlmekî *tirsnak*!', 'Evet! Korku filmi!', '[excited] ئەرێ! فیلمەکی ترسناک!', { s: { pose: 'cheer', expr: 'smug', hop: 26 } }),
    B('g03', 'Tu *natirsî*?', 'Korkmaz mısın?', '[doubtful] تو ناترسی؟', { s: { pose: 'think', expr: 'normal' } }),
    R('g04', 'Na! Ez *wêrek* im!', 'Hayır! Ben cesurum!', '[confident] نا! ئەز وێرەکم!', { s: { pose: 'hips', expr: 'smug' }, l: { pose: 'idle', expr: 'smug' } }),
    { id: 'gw', wait: 2.6 },
    R('g05', '*Dayê*! Alîkarî!', 'Anne! İmdat!', '[screaming] دایێ! ئالیکاری!', { gap: .05, s: { pose: 'face', expr: 'wide', sweat: true, shake: 1 }, l: { pose: 'idle', expr: 'normal' } }),
    B('g06', 'Ronî… ew *tenê* pisîk e.', 'Ronî… o sadece bir kedi.', '[deadpan] رۆنی… ئەو تەنێ پسیکە.', { gap: .6, s: { pose: 'show', expr: 'sleep' }, l: { pose: 'face', expr: 'wide', sweat: true } }),
    R('g07', 'Ez *natirsim*! Ez tenê… westiyayî me. Şev baş!', 'Korkmuyorum! Sadece… yorgunum. İyi geceler!', '[nervous] ئەز ناترسم! ئەز تەنێ… وەستیایی مە. شەڤ باش!', { gap: .7, s: { pose: 'hips', expr: 'wide', sweat: true }, then: [{ f: .75, s: { pose: 'wave', expr: 'happy' } }], l: { pose: 'hips', expr: 'smug' } }),
    B('g08', 'Pir *wêrek*…', 'Çok cesur…', '[sarcastic] پر وێرەک…', { s: { pose: 'face', expr: 'smug' }, l: { pose: 'idle', expr: 'sad' } }),

    // ---------- 7 · ŞEV ----------
    { id: 'k7', card: { ku: 'Şev', tr: 'Gece' } },
    B('e01', '*Şev baş*, Ronî!', 'İyi geceler Ronî!', '[softly] شەڤ باش، رۆنی!', { s: { pose: 'wave', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } }),
    R('e02', 'Şev baş, Berfîn!', 'İyi geceler Berfîn!', '[softly] شەڤ باش، بەرفین!', { s: { pose: 'wave', expr: 'happy' }, l: { pose: 'idle', expr: 'sleep', tilt: -12 } }),
    { id: 'ew', wait: 2.6 },
    R('e03', 'Berfîn… tu *radizî*?', 'Berfîn… uyuyor musun?', '[whispers] بەرفین… تو رادزی؟', { gap: .1, s: { pose: 'think', expr: 'wide' }, l: { pose: 'idle', expr: 'sleep', tilt: -12 } }),
    B('e04', 'Erê…', 'Evet…', '[sleepy] ئەرێ…', { s: { pose: 'idle', expr: 'sleep', tilt: -12 }, l: { pose: 'think', expr: 'wide' } }),
    R('e05', 'Ez *nikarim* razêm!', 'Uyuyamıyorum!', '[whining] ئەز نکارم رازێم!', { s: { pose: 'up', expr: 'wide', shake: 1 }, l: { pose: 'idle', expr: 'sleep', tilt: -12 } }),
    B('e06', '*Çima*?', 'Neden?', '[sleepy] چما؟', { s: { pose: 'idle', expr: 'sleep', tilt: -12 }, l: { pose: 'idle', expr: 'wide' } }),
    R('e07', 'Bîst û yek *çay*!', 'Yirmi bir çay!', '[guilty] بیست و یەک چای!', { s: { pose: 'shrug', expr: 'wide' }, l: { pose: 'idle', expr: 'sleep', tilt: -12 } }),
    B('e08', 'Min ji te re *got*!', 'Sana söylemiştim!', '[annoyed] من ژ تە رە گۆت!', { s: { pose: 'hips', expr: 'angry' }, l: { pose: 'idle', expr: 'sad' } }),
    R('e09', 'Berfîn, em *bilîzin*?', 'Berfîn, oynayalım mı?', '[hopeful] بەرفین، ئەم بلیزن؟', { s: { pose: 'cheer', expr: 'happy' }, l: { pose: 'hips', expr: 'angry' } }),
    B('e10', 'Na! Saet *yanzdeh* e! *Razê*!', 'Hayır! Saat on bir! Uyu!', '[angry] نا! سەعەت یانزدەهە! رازێ!', { s: { pose: 'up', expr: 'angry', red: .6, shake: 1 }, l: { pose: 'idle', expr: 'wide' } }),
    R('e11', 'Baş e… Yek *pez*, du pez, sê pez…', 'Tamam… Bir koyun, iki koyun, üç koyun…', '[quietly] باشە… یەک پەز، دو پەز، سێ پەز…', { s: { pose: 'think', expr: 'normal' }, l: { pose: 'idle', expr: 'sleep', tilt: -12 } }),
    B('e12', 'Ronî! *Bêdeng* be!', 'Ronî! Sessiz ol!', '[shouting] رۆنی! بێدەنگ بە!', { s: { pose: 'up', expr: 'angry', red: .85, shake: 1 }, l: { pose: 'idle', expr: 'wide' } }),
    R('e13', '*Çar* pez…', 'Dört koyun…', '[whispers] چار پەز…', { gap: .7, s: { pose: 'think', expr: 'smug' }, l: { pose: 'face', expr: 'sleep' } }),
  ];

  for (const it of SEQ) if (it.who && it.gap == null) it.gap = .45;

  // Şîv (f) ve fîlm (g) sahnelerinin sesi henüz yok → FULL = true yapılınca bölüme eklenir
  const FULL = false;
  const USE = SEQ.filter(it => FULL || !/^(f|g|k5|k6)/.test(it.id));
  const has = id => USE.some(it => it.id === id);
  const CHS = [['k2', 1], ['k3', 2], ['k4', 3], ['k5', 4], ['k6', 5], ['k7', 6]].filter(([k]) => has(k));
  const ch = (t, H) => { let c = 0; for (const [k, n] of CHS) if (t >= H.T(k, .5)) c = n; return c; };
  const zz = (x, y, t) => { let s = ''; for (let k = 0; k < 3; k++) { const p = ((t * .55 + k / 3) % 1); s += `<text x="${x + p * 60}" y="${y - p * 110}" font-size="${34 + p * 34}" font-weight="800" fill="#5C6BC0" opacity="${1 - p}">z</text>`; } return s; };

  function cat(x, y, t, H, angry) {
    const S = H.S, f = '#fff';
    let s = `<g transform="translate(${x} ${y}) scale(.8)">`;
    s += `<path d="M34 -14q46 -6 40 -52q-2 -14 -12 -10" fill="none" stroke="${INKC}" stroke-width="20" stroke-linecap="round"/><path d="M34 -14q46 -6 40 -52q-2 -14 -12 -10" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round"/>`;
    s += `<ellipse cy="-38" rx="42" ry="40" fill="${f}" ${S} stroke-width="7"/><path d="M-30 -116L-34 -150L-8 -130ZM30 -116L34 -150L8 -130Z" fill="${f}" ${S} stroke-width="7"/><circle cy="-100" r="36" fill="${f}" ${S} stroke-width="7"/>`;
    if (angry) s += `<path d="M-24 -116L-8 -106M24 -116L8 -106" ${S} stroke-width="6"/><ellipse cx="-14" cy="-100" rx="5" ry="6" fill="#E53935"/><ellipse cx="14" cy="-100" rx="5" ry="6" fill="#E53935"/><path d="M-10 -82q10 -8 20 0" fill="none" ${S} stroke-width="4"/>`;
    else s += `<ellipse cx="-14" cy="-106" rx="5" ry="8" fill="${INKC}"/><ellipse cx="14" cy="-106" rx="5" ry="8" fill="${INKC}"/><path d="M-5 -93h10l-5 6z" fill="#FF8FB0" ${S} stroke-width="3"/><path d="M0 -87q-6 8 -12 2M0 -87q6 8 12 2" fill="none" ${S} stroke-width="4"/>`;
    s += `<path d="M-22 -92h-26M-22 -86l-24 6M22 -92h26M22 -86l24 6" ${S} stroke-width="3"/>`;
    return s + `</g>`;
  }
  const egg = (x, y, S) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="19" fill="#FFF6E0" ${S} stroke-width="5"/>`;
  const catPos = (t, H) => { // [x, y, havada mı, kızgın mı]
    const a = H.T('cw', .15), b = H.T('cw', .5), x0 = 650, y0 = H.FLOOR - 6, x1 = H.BX, y1 = H.FLOOR - 10 - 448;
    if (t < a) return [x0, y0, 0, t > H.T('c15', .5)];
    if (t < b) { const u = H.eio(H.seg(t, a, b)); return [H.lerp(x0, x1, u), H.lerp(y0, y1, u) - Math.sin(u * Math.PI) * 170, 1, true]; }
    return [x1, y1, 0, true];
  };

  window.EP = {
    title: 'ROJA RONÎ',
    tag: 'Kurdî A1 · Dubare',
    vocabScale: .7,
    seq: USE,
    tail: 1.6,
    mode: (t, H) => ['morning', 'morning', 'day', 'day', 'day', 'night', 'night'][ch(t, H)],
    clock: (t, H) => [7, 8.1, 12, 15.5, 19, 21, 23][ch(t, H)],
    table: (t, H) => (ch(t, H) === 1 ? { teapot: true, glass: 'hot' } : {}),
    bubbles: [].concat([
      { line: 'a02', f: 0, who: 'R', icon: 'zzz', label: '5 deqîqe' },
      { line: 'a05', f: .5, who: 'B', icon: 'school', label: 'dibistan' },
      { line: 'a08', f: .3, who: 'B', icon: 'txt:7/7', label: 'yekşem' },
      { line: 'a12', f: .3, who: 'B', icon: 'food', label: 'taştê' },
      { line: 'b02', f: .3, who: 'R', icon: 'food', label: 'birçî' },
      { line: 'b06', f: 0, who: 'R', icon: 'egg', label: 'deh hêk' },
      { line: 'b08', f: .5, who: 'R', icon: 'egg', label: 'neh hêk' },
      { line: 'b14', f: .3, who: 'R', icon: 'txt:şîr+no', label: 'hez nakim' },
      { line: 'b10', f: .3, who: 'R', icon: 'tea', label: 'bîst çay' },
      { line: 'b11', f: .5, who: 'B', icon: 'moon+no', label: 'xew tune' },
      { line: 'c04', f: .3, who: 'R', icon: 'apple+q', label: 'bi çiqas?' },
      { line: 'c05', f: .3, who: 'B', icon: 'txt:2 ₺', label: 'du lîre' },
      { line: 'c06', f: .55, who: 'R', icon: 'txt:1 ₺', label: 'yek lîre?' },
      { line: 'c10', f: 0, who: 'R', icon: 'txt:10 ₺', label: 'deh' },
      { line: 'c12', f: 0, who: 'R', icon: 'txt:100 ₺', label: 'sed' },
      { line: 'c14', f: 0, to: 'c15', tf: .45, who: 'R', icon: 'txt:1000 ₺', label: 'hezar!' },
      { line: 'd02', f: .5, who: 'R', icon: 'battery', label: 'westiyayî' },
      { line: 'd07', f: .1, who: 'R', icon: 'txt:ling', label: 'diêşin!' },
      { line: 'd09', f: .05, tf: .5, hold: 0, who: 'R', icon: 'txt:ser', label: 'diêşe!' },
      { line: 'd09', f: .55, who: 'R', icon: 'txt:pişt', label: 'diêşe!' },
      { line: 'd10', f: .4, who: 'B', icon: 'txt:2 dq', label: 'du deqîqe' },
      { line: 'd13', f: .4, who: 'R', icon: 'tea', label: 'çay!' },
      { line: 'f02', f: 0, who: 'R', icon: 'pizza', label: 'pîzza!' },
      { line: 'f03', f: .5, who: 'B', icon: 'soup', label: 'şorbe' },
      { line: 'f06', f: .2, who: 'R', icon: 'thermo', label: 'germ!' },
      { line: 'f09', f: .2, who: 'B', icon: 'water', label: 'av' },
      { line: 'f10', f: .5, who: 'R', icon: 'txt:❄', label: 'sar' },
      { line: 'g02', f: .4, who: 'R', icon: 'ghost', label: 'tirsnak' },
      { line: 'g04', f: .3, who: 'R', icon: 'txt:💪', label: 'wêrek' },
      { line: 'e07', f: .1, who: 'R', icon: 'tea', label: '21 çay' },
      { line: 'e10', f: .3, who: 'B', icon: 'txt:11', label: 'yanzdeh' },
      { line: 'e11', f: .3, tf: .55, hold: 0, who: 'R', icon: 'sheep', label: 'yek' },
      { line: 'e11', f: .58, tf: .8, hold: 0, who: 'R', icon: 'sheep', label: 'du' },
      { line: 'e11', f: .83, who: 'R', icon: 'sheep', label: 'sê' },
      { line: 'e13', f: .2, who: 'R', icon: 'sheep', label: 'çar…' },
    ]).filter(b => has(b.line)),
    icons: {
      food: H => `<ellipse cy="18" rx="50" ry="13" fill="#fff" ${H.S} stroke-width="5"/><path d="M-34 14a34 28 0 0 1 68 0z" fill="#D9531E" ${H.S} stroke-width="5"/><path d="M-10 -24q-8 -10 0 -20M10 -24q-8 -10 0 -20" fill="none" stroke="#999" stroke-width="5" stroke-linecap="round"/>`,
      egg: H => `<ellipse cy="2" rx="26" ry="34" fill="#FFF6E0" ${H.S} stroke-width="6"/>`,
      tea: H => `<ellipse cy="30" rx="34" ry="8" fill="#fff" ${H.S} stroke-width="5"/><path d="M-15 -24q8 22 -2 50h34q-10 -28 -2 -50z" fill="#D9531E"/><path d="M-17 -34q12 30 -3 62h40q-15 -32 -3 -62z" fill="none" ${H.S} stroke-width="5"/>`,
      apple: H => `<path d="M0 -18c-30 -18 -46 10 -34 34c10 22 24 22 34 14c10 8 24 8 34 -14c12 -24 -4 -52 -34 -34z" fill="#E53935" ${H.S} stroke-width="6"/><path d="M0 -18q2 -16 14 -22" fill="none" ${H.S} stroke-width="6"/>`,
      school: H => `<rect x="-40" y="-10" width="80" height="46" fill="#FFE0B2" ${H.S} stroke-width="5"/><path d="M-48 -10L0 -42L48 -10Z" fill="#E53935" ${H.S} stroke-width="5"/><rect x="-10" y="10" width="20" height="26" fill="#8D6E63" ${H.S} stroke-width="4"/>`,
      pizza: H => `<path d="M-44 -30L44 -30L0 40Z" fill="#FFC83D" ${H.S} stroke-width="6"/><path d="M-44 -30h88" stroke="#C98B4E" stroke-width="12" stroke-linecap="round"/><circle cx="-10" cy="-8" r="8" fill="#E53935"/><circle cx="14" cy="-6" r="7" fill="#E53935"/><circle cx="2" cy="14" r="6" fill="#E53935"/>`,
      soup: H => `<path d="M-42 -4h84q0 40 -42 40q-42 0 -42 -40z" fill="#fff" ${H.S} stroke-width="6"/><ellipse cy="-4" rx="42" ry="10" fill="#FF9F43" ${H.S} stroke-width="5"/><path d="M-12 -24q-8 -10 0 -20M12 -24q-8 -10 0 -20" fill="none" stroke="#999" stroke-width="5" stroke-linecap="round"/>`,
      water: H => `<path d="M-20 -34h40l-6 68h-28z" fill="#EAF6FF" ${H.S} stroke-width="6"/><path d="M-17 -8h34l-4 40h-26z" fill="#6EC6FF"/>`,
      ghost: H => `<path d="M-30 34v-40a30 30 0 0 1 60 0v40l-12 -10l-9 10l-9 -10l-9 10l-9 -10z" fill="#fff" ${H.S} stroke-width="6"/><circle cx="-11" cy="-8" r="6" fill="${INKC}"/><circle cx="11" cy="-8" r="6" fill="${INKC}"/><ellipse cy="10" rx="6" ry="8" fill="${INKC}"/>`,
      sheep: H => `<path d="M-34 6a16 16 0 0 1 8 -28a18 18 0 0 1 30 -8a18 18 0 0 1 30 10a16 16 0 0 1 0 30q-34 12 -68 -4z" fill="#fff" ${H.S} stroke-width="5"/><ellipse cx="-36" cy="-4" rx="13" ry="16" fill="${INKC}"/><path d="M-14 22v16M16 22v16" ${H.S} stroke-width="6"/>`,
    },
    vocab: [
      ['rojbaş', 'günaydın'],
      ['dibistan', 'okul'],
      ['taştê', 'kahvaltı'],
      ['birçî', 'aç'],
      ['bi çiqas e?', 'ne kadar?'],
      ['biha', 'pahalı'],
      ['werziş', 'spor'],
      ['westiyayî', 'yorgun'],
      ['diêşe', 'ağrıyor'],
      ...(FULL ? [['germ / sar', 'sıcak / soğuk']] : []),
      ['henek', 'şaka'],
      ['şev baş', 'iyi geceler'],
    ],
    sfx(H) {
      const T = H.T, out = [];
      out.push({ type: 'whoosh', at: T('ar', .02) }, { type: 'bonk', at: T('ar', .3) }, { type: 'sweep', at: T('ar', .62) });
      for (let i = 0; i < 9; i++) out.push({ type: 'pop', at: T('bw', .08 + i * .095) });
      out.push({ type: 'ding', at: T('bw', .96) });
      for (const id of ['c07', 'c11', 'c13']) out.push({ type: 'cross', at: T(id, .05) });
      out.push({ type: 'ding', at: T('c15', .5) }, { type: 'boing', at: T('cw', .15) }, { type: 'bonk', at: T('cw', .5) });
      for (const id of ['d06', 'd08']) for (let k = 0; k < 3; k++) out.push({ type: 'thud', at: T(id, .15 + k * .2) });
      if (has('fw')) out.push({ type: 'pop', at: T('fw', .45) }, { type: 'rise', at: T('fw', .7) }, { type: 'splash', at: T('f09', 1) + .35 }, { type: 'cross', at: T('f11', .05) });
      if (has('gw')) out.push({ type: 'sweep', at: T('gw', .1) }, { type: 'bonk', at: T('gw', .45) }, { type: 'whoosh', at: T('gw', .5) }, { type: 'ding', at: T('g06', .5) });
      out.push({ type: 'thud', at: T('d11', .6) }, { type: 'cross', at: T('e10', .05) }, { type: 'bonk', at: T('e12', .1) });
      return out;
    },
    tweak(t, P, H) {
      const T = H.T, c = ch(t, H), Rr = P.R, Bb = P.B;
      if (t < T('a01', 0)) { Rr.expr = 'sleep'; Rr.tilt = 14; }
      // okula koşup geri dönüş
      const a = T('ar', 0), d = T('ar', 1) - a;
      if (t >= a && t < a + d) {
        const u = (t - a) / d;
        if (u < .22) { const v = H.eio(u / .22); Rr.x = H.lerp(H.RX, 1280, v); Rr.look = 1; Rr.walk = t * 3.6; Rr.expr = 'wide'; }
        else if (u < .62) { Rr.show = false; Bb.expr = 'happy'; Bb.dy = -Math.abs(Math.sin(t * 11)) * 10; Bb.mouth = .5; }
        else { const v = H.seg(u, .62, .98); Rr.x = H.lerp(1280, H.RX, v); Rr.look = -1; if (v < 1) Rr.walk = t * 1.4; Rr.expr = 'sad'; Rr.tilt = 10; Bb.expr = 'happy'; }
      }
      // yumurta ziyafeti
      if (t >= T('bw', 0) && t < T('bw', .95)) { Rr.mouth = Math.abs(Math.sin(t * 15)) * .7; Rr.expr = 'happy'; Rr.la = [100, 200 + Math.sin(t * 15) * 30]; Bb.expr = 'wide'; }
      // kedi saldırısı
      if (c === 2 && t > T('cw', .5)) { if (t < T('c16', 0)) { Bb.expr = 'wide'; Bb.dx = Math.sin(t * 44) * 5; Rr.expr = 'wide'; } }
      if (c === 2 && t > T('c15', 1) && t < T('cw', .5)) { Bb.look = 1; Rr.expr = 'wide'; }
      // spor
      for (const id of ['d06', 'd08']) if (t > T(id, .1) && t < T(id, 1) + .35) { Rr.walk = t * 3.4; Rr.dy = -Math.abs(Math.sin(t * 3.4 * Math.PI * 2)) * 12; Rr.la = [60 + Math.sin(t * 21) * 40, 100]; Rr.ra = [60 - Math.sin(t * 21) * 40, 100]; }
      if (t > T('d05', .3) && t < T('d06', .1)) { Rr.la = [150, 176]; Rr.ra = [150, 176]; }
      // çorba
      if (c === 4) {
        if (t > T('fw', .15) && t < T('fw', .6)) { Rr.la = [100, 205]; Rr.expr = 'sad'; }
        if (t > T('fw', .6) && t < T('f06', 0)) { Rr.expr = 'wide'; Rr.red = H.seg(t, T('fw', .6), T('fw', 1)) * .9; Rr.dx = Math.sin(t * 50) * 5; }
        if (t > T('f09', 1) + .3 && t < T('f10', 0)) { Rr.red = 0; Rr.expr = 'happy'; }
      }
      // korku filmi
      if (c === 5) {
        const a = T('gw', .45), b = T('g07', 0) - .5, e = T('g07', 0) - .05;
        if (t > T('gw', .05) && t < a) { Rr.look = -1; Bb.look = -1; Rr.expr = 'smug'; }
        if (t >= a && t < e) {
          const u = t < b ? H.eout(H.seg(t, a, a + .3)) : 1 - H.eio(H.seg(t, b, e));
          Rr.x = H.lerp(H.RX, 405, u); Rr.look = u > .5 ? 1 : -1; if (u < 1 && u > 0) Rr.walk = t * 3.5;
          if (t < T('g05', 0)) { Rr.expr = 'wide'; Rr.dx = Math.sin(t * 50) * 4; Bb.expr = 'wide'; Bb.look = -1; }
          else if (u >= 1) { Rr.tilt = 8; Rr.dx = Math.sin(t * 40) * 3; }
        }
      }
      // gece
      if (c === 6 && t > T('ew', .25) && t < T('e03', 0)) { Bb.expr = 'sleep'; Bb.tilt = -12; Rr.expr = 'wide'; Rr.dx = Math.sin(t * 40) * 3; Rr.look = Math.sin(t * 2.4) > 0 ? 1 : -1; }
      if (t > T('e13', 1)) { Bb.expr = 'sleep'; Rr.expr = 'wide'; }
    },
    back(t, P, H) {
      const c = ch(t, H), S = H.S;
      let s = '';
      if (c === 3) s += `<g transform="translate(640 560) rotate(-3)"><rect x="-150" y="-36" width="300" height="72" rx="14" fill="#2EAD4B" ${S} stroke-width="7"/><text y="16" text-anchor="middle" font-size="46" font-weight="800" fill="#fff">WERZIŞ</text></g>`;
      return s;
    },
    mid(t, P, H) {
      const c = ch(t, H), S = H.S, T = H.T;
      let s = '';
      if (c === 1) { // kahvaltı sofrası: ekmek + yumurta tabağı
        s += `<path d="M300 ${TY}q0 -40 44 -40q44 0 44 40z" fill="#E0A45A" ${S} stroke-width="6"/><path d="M322 ${TY - 26}l10 -8M346 ${TY - 30}l10 -8" ${S} stroke-width="4"/>`;
        const a = T('b08', .6);
        if (t >= a) {
          const p = H.back(H.seg(t, a, a + .3));
          let e = `<ellipse cx="0" cy="-4" rx="78" ry="13" fill="#fff" ${S} stroke-width="5"/>`;
          const pos = [[-48, -22], [-16, -22], [16, -22], [48, -22], [-32, -48], [0, -48], [32, -48], [-16, -74], [16, -74]];
          pos.forEach(([x, y], i) => { if (t < T('bw', .08 + (8 - i) * .095)) e += egg(x, y, S); });
          s += `<g transform="translate(590 ${H.FLOOR - 6}) scale(${p})"><path d="M-60 0h120M-44 0v-70M44 0v-70" ${S} stroke-width="9"/><rect x="-84" y="-84" width="168" height="16" rx="6" fill="#C98B4E" ${S} stroke-width="6"/><g transform="translate(0 -84)">${e}</g></g>`;
        }
      }
      if (c === 4) { // çorba tabağı
        const cold = t > T('f09', 1) + .3, hot = !cold;
        s += `<g transform="translate(590 ${H.FLOOR - 6})"><path d="M-60 0h120M-44 0v-70M44 0v-70" ${S} stroke-width="9"/><rect x="-84" y="-84" width="168" height="16" rx="6" fill="#C98B4E" ${S} stroke-width="6"/><path d="M-50 -122h100q0 38 -50 38q-50 0 -50 -38z" fill="#fff" ${S} stroke-width="6"/><ellipse cy="-122" rx="50" ry="11" fill="${cold ? '#B3E5FC' : '#FF9F43'}" ${S} stroke-width="5"/></g>`;
        if (hot) for (let i = 0; i < 3; i++) { const p = ((t * .8 + i / 3) % 1), x = 570 + i * 20 + Math.sin(p * 6 + i) * 8; s += `<path d="M${x} ${H.FLOOR - 150 - p * 70}q10 -12 0 -24" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${(1 - p) * .95}"/>`; }
        else s += `<text x="590" y="${H.FLOOR - 160}" text-anchor="middle" font-size="46" fill="#2F7DE1">❄</text>`;
      }
      if (c === 5) { // televizyon
        const a = T('gw', .1), scare = t > T('gw', .42) && t < T('gw', .8), catOn = t >= T('gw', .8), on = t > a;
        const fl = scare && (Math.floor(t * 16) % 2);
        s += `<g transform="translate(245 ${TY})"><path d="M-40 0l14 -22M40 0l-14 -22" ${S} stroke-width="8"/><rect x="-130" y="-190" width="260" height="170" rx="16" fill="#37474F" ${S} stroke-width="8"/><rect x="-114" y="-176" width="228" height="142" rx="8" fill="${!on ? '#1b2530' : fl ? '#fff' : scare ? '#3a1030' : '#22324a'}" ${S} stroke-width="5"/>`;
        if (on && !scare && !catOn) s += `<path d="M-90 -60h180" stroke="#445" stroke-width="5"/><circle cx="60" cy="-130" r="16" fill="#FFF2B0"/><path d="M-70 -60v-50l24 -20l24 20v50z" fill="#111827"/>`;
        if (scare) s += `<g transform="translate(0 -104) scale(1.5)">${window.EP.icons.ghost(H)}</g>`;
        if (catOn) s += `<g transform="translate(0 -36) scale(.72)">${cat(0, 0, t, H, false)}</g>`;
        s += `</g>`;
        if (scare) s += `<text x="245" y="${TY - 220}" text-anchor="middle" font-size="64" font-weight="800" fill="#8E44AD" transform="rotate(-6 245 ${TY - 220})">BÛÛÛ!</text>`;
        if (catOn && t < T('g07', 0)) s += `<text x="330" y="${TY - 210}" font-size="40" font-weight="800" fill="#E0407B">miyaw</text>`;
      }
      if (c === 2) { // dükkân
        s += `<g transform="translate(150 ${TY})"><rect x="-84" y="-92" width="168" height="74" rx="10" fill="#E53935" ${S} stroke-width="7"/><text y="-38" text-anchor="middle" font-size="46" font-weight="800" fill="#fff">DIKAN</text><path d="M-50 -18v18M50 -18v18" ${S} stroke-width="7"/></g>`;
        for (const x of [290, 340, 390]) s += `<g transform="translate(${x} ${TY - 26}) scale(.62)">${window.EP.icons.apple(H)}</g>`;
        s += `<g transform="translate(340 ${TY - 96}) rotate(6)"><rect x="-44" y="-22" width="88" height="44" rx="8" fill="#FFD23F" ${S} stroke-width="5"/><text y="13" text-anchor="middle" font-size="34" font-weight="800" fill="${INKC}">2 ₺</text></g>`;
      }
      return s;
    },
    front(t, P, H) {
      const c = ch(t, H), S = H.S, T = H.T;
      let s = '';
      if (c === 0) {
        if (t < T('a02', 1)) s += zz(H.RX + 50, H.FLOOR - 470, t);
        if (t > T('a11', .3) && t < T('a13', 0)) s += zz(H.RX + 50, H.FLOOR - 470, t);
        const a = T('ar', 0), d = T('ar', 1) - a, u = (t - a) / d;
        if (u > .24 && u < .6) s += `<text x="${H.BX - 150}" y="${H.FLOOR - 500}" font-size="46" font-weight="800" fill="#E0407B" transform="rotate(-8 ${H.BX - 150} ${H.FLOOR - 500})">hi hi hi!</text>`;
        if (u > 0 && u < .3) for (let k = 0; k < 3; k++) s += `<path d="M${P.R.x - 90 - k * 26} ${H.FLOOR - 120 - k * 70}h-70" stroke="#bbb" stroke-width="8" stroke-linecap="round"/>`;
      }
      if (c === 1) { // şişen göbek
        const g = H.seg(t, T('bw', .1), T('bw', .95));
        if (g > 0) s += `<ellipse cx="${P.R.x - 6}" cy="${H.FLOOR - 10 - 232 + (P.R.dy || 0)}" rx="${30 + 34 * g}" ry="${44 + 22 * g}" fill="#FFD23F" ${S} stroke-width="8"/>`;
        if (t > T('bw', .96) && t < T('b09', 0)) s += `<text x="${H.RX + 70}" y="${H.FLOOR - 300}" font-size="44" font-weight="800" fill="#E0407B">bûrp!</text>`;
      }
      if (c === 2) {
        const [x, y, air, angry] = catPos(t, H);
        s += cat(x, y, t, H, angry);
        if (t > T('cw', .12) && t < T('cw', .6)) s += `<text x="${x + 50}" y="${y - 150}" font-size="50" font-weight="800" fill="#E53935" transform="rotate(8 ${x + 50} ${y - 150})">MIYAW!</text>`;
        if (t > T('cw', .5) && t < T('c16', .6)) { const k = Math.floor(t * 9) % 2; s += `<g transform="translate(${H.BX + (k ? 54 : -58)} ${H.FLOOR - 400})" stroke="#E53935" stroke-width="7" stroke-linecap="round"><path d="M-14 -22l10 44M2 -24l10 44M18 -22l10 44"/></g>`; }
      }
      if (c === 4 && t > T('fw', .7) && t < T('f09', 1) + .3) { // ağızdan alev
        for (let k = 0; k < 4; k++) { const p = ((t * 2.4 + k / 4) % 1), x = P.R.x - 60 - p * 110, y = H.FLOOR - 370 - Math.sin(p * 3 + k) * 20, r = 22 * (1 - p) + 6; s += `<path d="M${x} ${y - r}q${r} ${r * .6} ${r * .4} ${r}q-${r * .4} ${r * .5} -${r} 0q-${r * .5} -${r * .6} ${r * .6} -${r}z" fill="${k % 2 ? '#FF9F43' : '#E53935'}" ${S} stroke-width="3" opacity="${1 - p * .7}"/>`; }
      }
      if (c === 3) { // baş dönmesi yıldızları
        if (t > T('d11', .55)) for (let k = 0; k < 3; k++) { const a = t * 4 + k * 2.1, x = P.R.x + Math.cos(a) * 74 + 20, y = H.FLOOR - 490 + Math.sin(a) * 18, r = 13; s += `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#FFD23F" ${S} stroke-width="3"/>`; }
      }
      if (c === 6) {
        const sleeping = (t > T('ew', .25) && t < T('e08', 0)) || (t > T('e11', 0) && t < T('e12', 0)) || t > T('e13', .5);
        if (sleeping) s += zz(H.BX - 110, H.FLOOR - 470, t);
      }
      return s;
    },
  };
})();
