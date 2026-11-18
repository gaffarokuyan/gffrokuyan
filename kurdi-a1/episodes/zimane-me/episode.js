// "Zimanê Me" — SHORTS (dikey): Kürtçenin şeytanlaştırılması, direnişi, bugünkü tehlike, özeleştiri ve çağrı.
// Sinematik anlatım: kinetik yazı + sahne animasyonları. Anlatıcı Yunus C (tempolu), anne Ülgen, çocuk Yunus C (perdesi yükseltilmiş).
(function () {
  const INK = '#1f1b16';
  // anlatım satırları: txt = ekranda kelime kelime beliren yazı (*vurgu*), tts = seslendirme
  // anlatıcı: Yunus C (who 'R'), tempolu-dramatik belgesel tonu
  const N = (id, txt, tts, o = {}) => ({ id, who: 'R', ku: '', tr: '', txt, tts, gap: .18, ...o });
  const SEQ = [
    N('k1', 'Bir dil düşün…', 'Bir dil düşün.', { gap: .2 }),
    N('k2', 'Annesine *"dayê"* dediği için çocuğun *cezalandırıldığı* bir dil.', 'Annesine "Dayê!" dediği için, çocuğun cezalandırıldığı bir dil.'),

    N('s1', 'Kürtçeye önce *"yok"* dendi.', 'Kürtçeye önce yok dendi.', { gap: .5 }),
    N('s2', 'Sonra *"dağ dili"*.', 'Sonra dağ dili.'),
    N('s3', 'Konuşanı *"bölücü"* ilan edildi.', 'Konuşanı bölücü ilan edildi.'),
    N('s4', '*1983*\'te Kürtçe yayın *yasaklandı*.', 'Bin dokuz yüz seksen üçte, Kürtçe yayın yasaklandı.'),
    N('s5', '*Q, W, X* harfleri bile suç sayıldı.', 'Q, W, X harfleri bile suç sayıldı.'),

    N('i1', 'Bunu yapanlar, en çok *"din kardeşiyiz"* diyenlerdi.', 'Bunu yapanlar, en çok din kardeşiyiz diyenlerdi.', { gap: .5 }),

    N('w1', 'Oysa İsrail\'de *Arapça* okullarda eğitim dili.', 'Oysa İsrailde Arapça, okullarda eğitim dili.', { gap: .5 }),
    N('w2', 'Rusya\'da *Tatarca* ve *Çeçence* kendi cumhuriyetlerinde resmi dil.', 'Rusyada Tatarca ve Çeçence, kendi cumhuriyetlerinde resmi dil.'),
    N('w3', 'Irak\'ta bile *Kürtçe*, devletin resmi dili.', 'Irakta bile Kürtçe, devletin resmi dili.'),
    N('w4', 'Sorun dil değil; *"tek dil, tek millet"* korkusu.', 'Sorun dil değil; tek dil, tek millet korkusu.', { gap: .5 }),

    N('r1', '*Ehmedê Xanî*, *Mem û Zîn*, *Melayê Cizîrî*… Bu dil, onların dili. Kökleri *binlerce yıla* uzanan bir dil.', '[proud, warm, natural narration] ئەحمەدێ خانی، مەم و زین، مەلایێ جزیری… Bu dil, onların dili. Kökleri binlerce yıla uzanan bir dil.', { gap: .5 }),
    N('r2', 'Ve yok olmadı. *Dengbêjin* sesinde, *ninnide*, *düğünde*, *mutfakta* yaşadı.', 'Ve yok olmadı. Dengbêjin sesinde, ninnide, düğünde, mutfakta yaşadı.'),
    N('r3', 'Yasaklayanlar gitti… *Kürtçe kaldı.*', 'Yasaklayanlar gitti. Kürtçe kaldı.', { gap: .4 }),

    N('t1', 'Ama tehlike geçmedi. Kürtçe hâlâ *anadilinde eğitim* hakından yoksun.', 'Ama tehlike geçmedi. Kürtçe hâlâ anadilinde eğitim hakkından yoksun.', { gap: .5 }),
    { id: 't2', who: 'B', ku: '', tr: '', txt: '', tts: '[elderly mother, tender, soft] Tu birçî yî, delalê min?', gap: .5 },
    { id: 't3', who: 'R', ku: '', tr: '', txt: '', tts: '[confused young child] Anne, ne diyorsun? Anlamıyorum.', gap: .35 },
    N('t4', 'Annesini anlamayan çocuklar… *çocuğunu anlamayan anneler.*', 'Annesini anlamayan çocuklar. Çocuğunu anlamayan anneler.', { gap: .6 }),

    N('o1', 'Ama dürüst olalım: suç *sadece başkalarında* değil.', 'Ama dürüst olalım: suç sadece başkalarında değil.', { gap: .5 }),
    N('o2', 'Çocuğuna *Türkçe* konuşan anne-babalar da *bizdik*.', 'Çocuğuna Türkçe konuşan anne babalar da bizdik.'),
    N('o3', 'Kürtçeyi *"köylü dili"* sanıp *utananlar* da.', 'Kürtçeyi köylü dili sanıp utananlar da.'),

    N('c1', 'Kürtçeyi yok etmeye çalışanlar ne kadar çabalıyorsa, onu *yaşatmak* için biz *daha çok* çabalamalıyız.', 'Kürtçeyi yok etmeye çalışanlar ne kadar çabalıyorsa, onu yaşatmak için biz daha çok çabalamalıyız.', { gap: .5 }),
    N('c2', '*Evde*, *sokakta*, *çarşıda*, birbirimizle Kürtçe konuşalım.', 'Evde, sokakta, çarşıda, birbirimizle Kürtçe konuşalım.'),
    N('c3', '', '[joyful, strong, warm] لی مالێ، لی کۆلانێ، لی بازارێ: کوردی بئاخڤن!'),
    N('c4', 'Bütün zorluklara rağmen *dilimizi koruyalım.*', 'Bütün zorluklara rağmen dilimizi koruyalım.'),
    N('c5', '', 'Zimanê min, rûmeta min.', { gap: .5 }),
  ];

  // bölüm sınırları ve renkleri
  const SECT = [
    ['k1', '#0b0b10', '#1a1a24'], ['s1', '#2a0707', '#4a0d0d'], ['i1', '#101018', '#22222e'], ['w1', '#0a1c36', '#13335c'],
    ['r1', '#3a210c', '#7a4a16'], ['t1', '#2a2a2a', '#3d3d3d'], ['o1', '#16161d', '#2b2b38'], ['c1', '#145c38', '#f2b632'],
  ];
  const SAFE = H => (id, f = 0) => (H.TL.marks[id] ? H.T(id, f) : NaN);
  const secStart = (H, i) => SAFE(H)(SECT[i][0], 0) - .45;
  const secAt = (t, H) => { let k = 0; SECT.forEach((_, i) => { if (t >= secStart(H, i)) k = i; }); return k; };

  // kişi çizimi: ayak (X,Y), ölçek k
  const man = (H, t, o, X, Y, k = 1) => `<g transform="translate(${X} ${Y}) scale(${k}) translate(0 ${-H.FLOOR})">${H.person({ x: 0, expr: 'normal', la: [14, 6], ra: [14, 6], ...o }, t)}</g>`;
  const headOf = (X, Y, k = 1) => [X, Y - 380 * k];
  // başörtüsü: yüzü açık bırakan çerçeve (evenodd)
  const scarf = (hx, hy, k) => { const R = 50 * k, o = `M${hx - 1.95 * R} ${hy + .5 * R}C${hx - 2.1 * R} ${hy - 3.0 * R} ${hx + 2.1 * R} ${hy - 3.0 * R} ${hx + 1.95 * R} ${hy + .5 * R}L${hx + 2.1 * R} ${hy + 2.3 * R}Q${hx} ${hy + 1.8 * R} ${hx - 2.1 * R} ${hy + 2.3 * R}Z`, f = `M${hx} ${hy - .95 * R}a${.98 * R} ${1.05 * R} 0 1 0 .1 0Z`;
    return `<path d="${o} ${f}" fill="#7B4F9E" fill-rule="evenodd" stroke="#1f1b16" stroke-width="${5 * k}"/><path d="M${hx - 1.1 * R} ${hy - .7 * R}Q${hx} ${hy - 1.5 * R} ${hx + 1.1 * R} ${hy - .7 * R}" fill="none" stroke="#C9A0E8" stroke-width="${5 * k}"/>`; };
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  // kinetik yazı: kelime kelime belirir; *vurgu* renkli
  function kinetic(H, t, L, hl) {
    if (!L.txt) return '';
    const a = H.T(L.id, 0) - .05, b = H.T(L.id, 1), out = H.T(L.id, 1) + .35;
    if (t < a || t > out + .3) return '';
    const fade = 1 - H.seg(t, out, out + .3);
    const toks = []; let hi = false;
    for (const w of L.txt.split(' ')) { let x = w, on = hi; if (x.startsWith('*')) { on = true; x = x.slice(1); } let end = false; if (x.includes('*')) { end = true; x = x.replace(/\*/g, ''); } toks.push({ w: x, on }); hi = on && !end; }
    // satırlara böl
    const FS = toks.length > 14 ? 58 : toks.length > 9 ? 66 : 78, MAX = 940, cw = FS * .5;
    const lines = [[]]; let len = 0;
    toks.forEach((tk, i) => { const L2 = tk.w.length + 1; if (len + L2 > MAX / cw && lines[lines.length - 1].length) { lines.push([]); len = 0; } lines[lines.length - 1].push({ ...tk, i }); len += L2; });
    const n = toks.length, Y0 = 1500 - (lines.length - 1) * FS * .6;
    let s = `<g font-family="Baloo,sans-serif" font-weight="800" text-anchor="middle" opacity="${fade}">`;
    lines.forEach((ln, li) => {
      const y = Y0 + li * FS * 1.2;
      s += `<text x="540" y="${y}" font-size="${FS}" fill="#fff" stroke="#000" stroke-width="10" stroke-opacity=".55" paint-order="stroke" xml:space="preserve">`;
      ln.forEach((tk, j) => { const ta = a + (tk.i / n) * (b - a) * .82, op = H.seg(t, ta, ta + .14);
        s += `<tspan fill="${tk.on ? hl : '#fff'}" opacity="${op}">${esc(tk.w)}${j < ln.length - 1 ? ' ' : ''}</tspan>`; });
      s += `</text>`;
    });
    return s + `</g>`;
  }

  // damga
  const stamp = (H, t, at, x, y, rot, word, col = '#E53935', fs = 92) => {
    if (t < at) return ''; const u = H.seg(t, at, at + .16), sc = H.lerp(2.4, 1, H.eio(u));
    const w = word.length * fs * .62 + 70;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})" opacity="${Math.min(1, u * 3)}"><rect x="${-w / 2}" y="${-fs * .78}" width="${w}" height="${fs * 1.5}" rx="14" fill="none" stroke="${col}" stroke-width="12"/><rect x="${-w / 2 + 14}" y="${-fs * .78 + 14}" width="${w - 28}" height="${fs * 1.5 - 28}" rx="8" fill="none" stroke="${col}" stroke-width="4"/><text y="${fs * .34}" text-anchor="middle" font-family="Baloo,sans-serif" font-size="${fs}" font-weight="800" fill="${col}" letter-spacing="4">${word}</text></g>`;
  };
  const shakeAt = (H, t, ats, amp = 18) => { let d = 0; for (const a of ats) { const u = t - a; if (u > 0 && u < .35) d += Math.sin(u * 90) * amp * (1 - u / .35); } return d; };

  window.EP = {
    title: '', tag: '', noTitle: true, noClock: true, noTable: true, noVocab: true,
    intro: .3, tail: 1.6,
    seq: SEQ, bubbles: [], icons: {}, vocab: [], coverWords: [['Kurdî', 'Kürtçe'], ['ziman', 'dil'], ['rûmet', 'onur'], ['dayê', 'anne'], ['dengbêj', ''], ['Mem û Zîn', '1692']],

    sfx(H) {
      const T = SAFE(H), out = [];
      // ses dokuları (karanlık → umut)
      const pads = [['k1', 's1', 55, .035], ['s1', 'i1', 49, .04], ['i1', 'w1', 52, .03], ['w1', 'r1', 65, .028], ['r1', 't1', 73, .03], ['t1', 'o1', 46, .035], ['o1', 'c1', 55, .028], ['c1', null, 82, .032]];
      for (const [a, b, f, v] of pads) { const A = T(a, 0) - .4, B = b ? T(b, 0) : H.TL.dur; out.push({ type: 'pad', at: A, d: B - A + .6, f, v }); }
      // bölüm geçişleri
      SECT.forEach((_, i) => { if (i) out.push({ type: 'whoosh', at: secStart(H, i) }); });
      out.push({ type: 'stamp', at: T('k2', .78) });
      for (const [id, f] of [['s1', .45], ['s2', .35], ['s3', .45]]) out.push({ type: 'stamp', at: T(id, f) });
      out.push({ type: 'stamp', at: T('s4', .5) });
      for (let k = 0; k < 3; k++) out.push({ type: 'crack', at: T('s5', .1) + k * .4 });
      out.push({ type: 'pop', at: T('i1', .6) });
      for (const id of ['w1', 'w2', 'w3']) out.push({ type: 'ding', at: T(id, .25) });
      out.push({ type: 'stamp', at: T('w4', .45) });
      out.push({ type: 'rise', at: T('r1', .1) }, { type: 'chime', at: T('r3', .55) });
      for (let k = 0; k < 4; k++) out.push({ type: 'pop', at: T('r2', .22 + k * .17) });
      for (let k = 0; k < 4; k++) out.push({ type: 'thud', at: T('r3', .05) + k * .12 });
      out.push({ type: 'shatter', at: T('t3', 0) });
      for (let k = 0; k < 5; k++) out.push({ type: 'heart', at: T('t3', 1) + .2 + k * .9 });
      out.push({ type: 'crack', at: T('t4', .1) });
      out.push({ type: 'boing', at: T('c1', .6) });
      for (let k = 0; k < 3; k++) out.push({ type: 'pop', at: T('c2', .05 + k * .2) });
      for (let k = 0; k < 3; k++) out.push({ type: 'dum', at: T('c3', k * .26) });
      out.push({ type: 'chime', at: T('c3', .8) }, { type: 'chime', at: T('c5', .1) });
      return out;
    },

    tweak(t, P) { P.B.show = false; P.R.show = false; },

    back(t, P, H) {
      if (t >= 9000) return `<defs><radialGradient id="cv" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#5a1010"/><stop offset="1" stop-color="#1a0404"/></radialGradient></defs><rect x="-50" y="-50" width="1200" height="2050" fill="url(#cv)"/>`;
      const k = secAt(t, H), a = secStart(H, k), f = H.seg(t, a, a + .6);
      const g = (i, op) => `<defs><radialGradient id="bg${i}" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="${SECT[i][2]}"/><stop offset="1" stop-color="${SECT[i][1]}"/></radialGradient></defs><rect x="-50" y="-50" width="1200" height="2050" fill="url(#bg${i})" opacity="${op}"/>`;
      let s = k > 0 ? g(k - 1, 1) : '';
      s += g(k, k > 0 ? f : 1);
      // çağrı bölümünde gökyüzü + doğan güneş
      if (SECT[k][0] === 'c1') { const T = SAFE(H), sun = H.eio(H.seg(t, T('c4', 0), T('c5', .6)));
        s += `<rect x="-50" y="-50" width="1200" height="2050" fill="#0f5132" opacity="${.5 * (1 - sun)}"/>`;
        const sy = H.lerp(1500, 520, sun); for (let r = 0; r < 16; r++) { const an = r * Math.PI / 8 + t * .15; s += `<path d="M540 ${sy}L${540 + Math.cos(an) * 1400} ${sy + Math.sin(an) * 1400}L${540 + Math.cos(an + .12) * 1400} ${sy + Math.sin(an + .12) * 1400}Z" fill="#FFE27A" opacity="${.18 * sun}"/>`; }
        s += `<circle cx="540" cy="${sy}" r="${170}" fill="#FFD23F" opacity="${sun}"/>`; }
      // ince toz/parçacık
      for (let i = 0; i < 26; i++) { const h1 = Math.sin(i * 91.7) * 4375.5, r1 = h1 - Math.floor(h1); const x = r1 * 1080, y = (1900 - ((t * (14 + r1 * 20) + i * 97) % 1950)); s += `<circle cx="${x}" cy="${y}" r="${2 + r1 * 3}" fill="#fff" opacity="${.08 + r1 * .1}"/>`; }
      return s;
    },

    front(t, P, H) {
      if (t >= 9000) { // KAPAK
        let c = `<g font-family="Baloo,sans-serif" font-weight="800" text-anchor="middle"><text x="540" y="330" font-size="150" fill="#fff" stroke="#000" stroke-width="10" paint-order="stroke">ZIMANÊ ME</text><text x="540" y="430" font-size="58" fill="#FFD23F">Kürtçe neden şeytanlaştırıldı?</text></g>`;
        c += `<g transform="translate(540 930) rotate(-3)"><rect x="-420" y="-290" width="840" height="580" rx="12" fill="#F4EBD9"/><text y="50" text-anchor="middle" font-family="Baloo,sans-serif" font-size="200" font-weight="800" fill="#1F7A4C">KURDÎ</text></g>`;
        c += stamp(H, 1, 0, 350, 770, -14, 'YOK', '#E53935', 100) + stamp(H, 1, 0, 720, 950, 9, 'DAĞ DİLİ', '#E53935', 84) + stamp(H, 1, 0, 470, 1130, -6, 'BÖLÜCÜ', '#E53935', 92);
        c += `<g font-family="Baloo,sans-serif" font-weight="800" text-anchor="middle"><text x="540" y="1460" font-size="74" fill="#fff">Yasaklayanlar gitti…</text><text x="540" y="1600" font-size="120" fill="#FFD23F" stroke="#3a0a0a" stroke-width="10" paint-order="stroke">KÜRTÇE KALDI.</text><text x="540" y="1760" font-size="40" fill="#fff" opacity=".8">@Dirokkurdii</text></g>`;
        return c; }
      const T = SAFE(H), S = H.S, k = secAt(t, H), sec = SECT[k][0];
      let s = '';
      // ekran sarsıntısı (damgalar)
      const sh = shakeAt(H, t, [T('k2', .78), T('s1', .45), T('s2', .35), T('s3', .45), T('s4', .5), T('w4', .45), T('t3', 0)].filter(x => x === x));
      s += `<g transform="translate(${sh} ${sh * .4})">`;

      if (sec === 'k1') { // KANCA: çocuk, "Dayê!" balonu, kırmızı X
        const sp = H.eio(H.seg(t, T('k1', 0), T('k1', 1)));
        s += `<ellipse cx="540" cy="1190" rx="${260 * sp}" ry="${40 * sp}" fill="#fff" opacity=".12"/>`;
        const sad = t > T('k2', .8);
        s += man(H, t, { who: 'R', expr: sad ? 'sad' : 'happy', tear: sad, la: sad ? [40, 30] : [14, 6], ra: sad ? [40, 30] : [150, 170 + Math.sin(t * 10) * 15], mouth: 0 }, 540, 1180, 1.25);
        const [hx, hy] = headOf(540, 1180, 1.25);
        if (t > T('k2', .3)) { const p = H.back(H.seg(t, T('k2', .3), T('k2', .45)));
          s += `<g transform="translate(${hx - 170} ${hy - 170}) scale(${p})"><path d="M60 50L120 130L120 50Z" fill="#fff"/><rect x="-150" y="-70" width="300" height="130" rx="40" fill="#fff"/><text y="22" text-anchor="middle" font-family="Baloo,sans-serif" font-size="72" font-weight="800" fill="${INK}">Dayê!</text></g>`;
          if (t > T('k2', .78)) { const u = H.eio(H.seg(t, T('k2', .78), T('k2', .78) + .15)), sc = H.lerp(2.5, 1, u);
            s += `<g transform="translate(${hx - 170} ${hy - 170}) scale(${sc})" opacity="${u}"><path d="M-130 -90L130 90M130 -90L-130 90" stroke="#E53935" stroke-width="34" stroke-linecap="round"/></g>`; } }
      }

      if (sec === 's1') { // ŞEYTANLAŞTIRMA
        const pOut = H.eio(H.seg(t, T('s4', 0) - .3, T('s4', 0) + .2));
        if (pOut < 1) { const y = 700 - pOut * 1400;
          s += `<g transform="translate(540 ${y}) rotate(-2)"><rect x="-380" y="-260" width="760" height="520" rx="10" fill="#F4EBD9" stroke="#000" stroke-opacity=".3" stroke-width="4"/><text y="40" text-anchor="middle" font-family="Baloo,sans-serif" font-size="170" font-weight="800" fill="#1F7A4C" opacity=".85">KURDÎ</text></g>`;
          s += stamp(H, t, T('s1', .45), 380, y - 120, -14, 'YOK') + stamp(H, t, T('s2', .35), 700, y + 30, 9, 'DAĞ DİLİ', '#E53935', 76) + stamp(H, t, T('s3', .45), 470, y + 190, -5, 'BÖLÜCÜ', '#E53935', 84); }
        if (t > T('s4', 0) - .1 && t < T('s5', 0)) { const p = H.back(H.seg(t, T('s4', 0), T('s4', .25)));
          s += `<g transform="translate(540 760) scale(${p})"><text text-anchor="middle" font-family="Baloo,sans-serif" font-size="300" font-weight="800" fill="#fff" opacity=".95">1983</text></g>` + stamp(H, t, T('s4', .5), 540, 700, -10, 'YASAK', '#FF3B3B', 130); }
        if (t >= T('s5', 0) - .1) { ['Q', 'W', 'X'].forEach((L, i) => { const x = 270 + i * 270, p = H.back(H.seg(t, T('s5', 0) - .1 + i * .08, T('s5', 0) + .2 + i * .08)), cut = H.eio(H.seg(t, T('s5', .1) + i * .4, T('s5', .1) + i * .4 + .2));
          s += `<g transform="translate(${x} 760) scale(${p})"><text text-anchor="middle" y="90" font-family="Baloo,sans-serif" font-size="280" font-weight="800" fill="#fff">${L}</text><path d="M-120 ${-100}L${-120 + 240 * cut} ${-100 + 240 * cut}" stroke="#FF3B3B" stroke-width="30" stroke-linecap="round"/></g>`; }); }
      }

      if (sec === 'i1') { // İRONİ: "din kardeşiyiz" ve ağzı bantlanan kişi
        const p = H.eio(H.seg(t, T('i1', 0), T('i1', .3)));
        s += `<text x="540" y="${520 - (1 - p) * 60}" opacity="${p}" text-anchor="middle" font-family="Baloo,sans-serif" font-size="96" font-weight="800" font-style="italic" fill="#fff">“din kardeşiyiz”</text>`;
        s += man(H, t, { who: 'R', expr: t > T('i1', .6) ? 'wide' : 'normal', la: [14, 6], ra: [14, 6] }, 540, 1230, 1.35);
        const [hx, hy] = headOf(540, 1230, 1.35);
        if (t > T('i1', .6)) { const u = H.back(H.seg(t, T('i1', .6), T('i1', .6) + .2));
          s += `<g transform="translate(${hx} ${hy + 30}) scale(${u})"><rect x="-80" y="-24" width="160" height="48" rx="6" fill="#222" transform="rotate(-12)"/><rect x="-80" y="-24" width="160" height="48" rx="6" fill="#333" transform="rotate(14)"/></g>`; }
      }

      if (sec === 'w1') { // DÜNYA
        const fade = 1 - H.eio(H.seg(t, T('w4', 0) - .2, T('w4', 0) + .3));
        if (fade > 0) { const p = H.back(H.seg(t, T('w1', 0) - .4, T('w1', 0)));
          s += `<g opacity="${fade}"><g transform="translate(540 470) scale(${p})"><circle r="200" fill="#1E63B5" stroke="#9cc7ff" stroke-width="6"/>`;
          for (let i = -2; i <= 2; i++) s += `<ellipse rx="200" ry="${Math.abs(i) * 45 + 6}" cy="${i * 0}" fill="none" stroke="#9cc7ff" stroke-opacity=".35" stroke-width="3" transform="translate(0 ${i * 70}) scale(1 ${1 - Math.abs(i) * .15})"/>`;
          for (let i = 0; i < 6; i++) { const ph = ((t * .5 + i / 6) % 1) * Math.PI * 2; s += `<ellipse rx="${Math.abs(Math.cos(ph)) * 200}" ry="200" fill="none" stroke="#9cc7ff" stroke-opacity="${.15 + .25 * Math.max(0, Math.sin(ph))}" stroke-width="3"/>`; }
          s += `</g>`;
          [['w1', 'İsrail', 'Arapça · okulda eğitim dili'], ['w2', 'Rusya', 'Tatarca, Çeçence · resmi dil'], ['w3', 'Irak', 'Kurdî · devletin resmi dili']].forEach(([id, c, l], i) => {
            const u = H.eio(H.seg(t, T(id, 0), T(id, .2))); if (u <= 0) return; const x = 540 + (1 - u) * 1100, y = 800 + i * 140, irq = id === 'w3';
            s += `<g transform="translate(${x} ${y})"><rect x="-440" y="-56" width="880" height="112" rx="24" fill="${irq ? '#FFD23F' : '#fff'}"/><text x="-400" y="16" font-family="Baloo,sans-serif" font-size="50" font-weight="800" fill="${INK}">${c}</text><text x="-160" y="14" font-family="Baloo,sans-serif" font-size="36" font-weight="700" fill="#455">${l}</text><circle cx="385" r="34" fill="#2E7D32"/><path d="M368 0l12 13l22 -24" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>`; });
          s += `</g>`; }
        if (t > T('w4', 0) - .2) { const p = H.back(H.seg(t, T('w4', 0), T('w4', .2)));
          s += `<g transform="translate(540 640) scale(${p})"><text text-anchor="middle" font-family="Baloo,sans-serif" font-size="96" font-weight="800" fill="#fff">SORUN DİL DEĞİL</text></g>`;
          if (t > T('w4', .45)) { const q = H.back(H.seg(t, T('w4', .45), T('w4', .6)));
            s += `<g transform="translate(540 900) scale(${q})"><rect x="-90" y="-60" width="180" height="140" rx="20" fill="#E53935"/><path d="M-55 -60v-40a55 55 0 0 1 110 0v40" fill="none" stroke="#E53935" stroke-width="26"/><circle cy="0" r="18" fill="#fff"/><rect x="-6" y="0" width="12" height="40" fill="#fff"/></g><text x="540" y="1130" text-anchor="middle" font-family="Baloo,sans-serif" font-size="86" font-weight="800" fill="#FF5A5A" opacity="${q}">TEK DİL · TEK MİLLET</text>`; } }
      }

      if (sec === 'r1') { // KÖK VE DİRENİŞ
        if (t < T('r2', 0)) { // kitap + kökler
          const op = H.eio(H.seg(t, T('r1', 0) - .3, T('r1', .2)));
          s += `<g transform="translate(540 560)"><g transform="scale(${op} 1)"><path d="M0 -150Q-170 -190 -330 -150V160Q-170 120 0 160Z" fill="#F7E7C6" stroke="#5a3a12" stroke-width="8"/><path d="M0 -150Q170 -190 330 -150V160Q170 120 0 160Z" fill="#FBF0D8" stroke="#5a3a12" stroke-width="8"/>`;
          for (let i = 0; i < 6; i++) s += `<path d="M-290 ${-80 + i * 38}h240M50 ${-80 + i * 38}h240" stroke="#c7a46a" stroke-width="6" opacity=".7"/>`;
          s += `</g><text y="-200" text-anchor="middle" font-family="Baloo,sans-serif" font-size="78" font-weight="800" fill="#FFD23F" opacity="${op}">Mem û Zîn · 1692</text></g>`;
          const tg = (x, y, n, at) => { const u = H.back(H.seg(t, at, at + .3)); return `<g transform="translate(${x} ${y}) scale(${u})"><rect x="-200" y="-40" width="400" height="80" rx="40" fill="#fff"/><text y="16" text-anchor="middle" font-family="Baloo,sans-serif" font-size="44" font-weight="800" fill="#5a3a12">${n}</text></g>`; };
          s += tg(300, 820, 'Ehmedê Xanî', T('r1', .05)) + tg(780, 820, 'Melayê Cizîrî', T('r1', .35));
          const gr = H.eio(H.seg(t, T('r1', .55), T('r1', 1)));
          const roots = ['M540 900C540 1000 420 1050 300 1180', 'M540 900C560 1020 660 1060 790 1190', 'M540 900C530 1050 520 1120 540 1240', 'M420 1040C380 1090 330 1100 230 1100', 'M650 1060C720 1080 800 1080 860 1060'];
          s += `<path d="M540 760V900" stroke="#c78a3a" stroke-width="26" stroke-linecap="round" opacity="${gr > 0 ? 1 : 0}"/>`;
          roots.forEach((d, i) => { s += `<path d="${d}" fill="none" stroke="#c78a3a" stroke-width="${18 - i * 2}" stroke-linecap="round" stroke-dasharray="600" stroke-dashoffset="${600 * (1 - H.seg(gr, i * .1, .6 + i * .08))}"/>`; });
          if (gr > .6) s += `<text x="540" y="1300" text-anchor="middle" font-family="Baloo,sans-serif" font-size="56" font-weight="800" fill="#FFD23F" opacity="${H.seg(gr, .6, 1)}">binlerce yıl</text>`;
        } else if (t < T('r3', 0)) { // dengbêj, ninni, düğün, mutfak
          const ic = [
            ['dengbêj', `<circle cy="-20" r="34" fill="#fff"/><rect x="-10" y="14" width="20" height="60" fill="#fff"/><path d="M50 -60q20 -30 40 -10M70 -20q20 -30 40 -10" fill="none" stroke="#FFD23F" stroke-width="8" stroke-linecap="round"/><circle cx="90" cy="-10" r="10" fill="#FFD23F"/><circle cx="110" cy="30" r="10" fill="#FFD23F"/>`],
            ['ninni', `<path d="M-80 0Q0 90 80 0Z" fill="#fff"/><path d="M-90 -10Q-60 -60 0 -60" fill="none" stroke="#fff" stroke-width="10"/><path d="M-80 60q80 40 160 0" fill="none" stroke="#fff" stroke-width="8"/><text x="60" y="-40" font-size="40" fill="#FFD23F" font-weight="800">z</text>`],
            ['düğün', `<ellipse rx="70" ry="22" cy="-40" fill="#fff"/><rect x="-70" y="-40" width="140" height="90" fill="#fff"/><ellipse rx="70" ry="22" cy="50" fill="#e8d6b0"/><path d="M-50 -20l100 50M-50 30l100 -50" stroke="#c78a3a" stroke-width="6"/><path d="M90 -90l-50 60" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`],
            ['mutfak', `<path d="M-80 -10h160v50a30 30 0 0 1 -30 30h-100a30 30 0 0 1 -30 -30z" fill="#fff"/><rect x="-90" y="-26" width="180" height="20" rx="10" fill="#fff"/><path d="M-30 -50q10 -20 0 -40M10 -50q10 -20 0 -40M50 -50q10 -20 0 -40" fill="none" stroke="#FFD23F" stroke-width="7" stroke-linecap="round"/>`]];
          ic.forEach(([lab, svg], i) => { const at = T('r2', .22 + i * .17), u = H.back(H.seg(t, at, at + .3)), x = i % 2 ? 790 : 290, y = 520 + Math.floor(i / 2) * 400;
            s += `<g transform="translate(${x} ${y}) scale(${u})"><circle r="150" fill="#ffffff22" stroke="#FFD23F" stroke-width="6"/>${svg}<text y="215" text-anchor="middle" font-family="Baloo,sans-serif" font-size="54" font-weight="800" fill="#FFD23F">${lab}</text></g>`; });
        } else { // Yasaklayanlar gitti… Kürtçe kaldı
          ['YOK', 'DAĞ DİLİ', 'BÖLÜCÜ', 'YASAK'].forEach((w, i) => { const at = T('r3', .05) + i * .12, fall = Math.max(0, t - at); const y = 500 + i * 170 + fall * fall * 1600, rot = -10 + i * 7 + fall * 60;
            if (y < 2200) s += stamp(H, t, T('r3', 0) - 5, 540 + (i - 1.5) * 60, y, rot, w, '#E53935', 80); });
          if (t > T('r3', .5)) { const u = H.back(H.seg(t, T('r3', .5), T('r3', .7)));
            for (let r = 0; r < 14; r++) { const an = r * Math.PI / 7 + t * .3; s += `<path d="M540 760L${540 + Math.cos(an) * 900} ${760 + Math.sin(an) * 900}L${540 + Math.cos(an + .14) * 900} ${760 + Math.sin(an + .14) * 900}Z" fill="#FFD23F" opacity="${.16 * u}"/>`; }
            s += `<g transform="translate(540 760) scale(${u})"><text text-anchor="middle" y="-20" font-family="Baloo,sans-serif" font-size="150" font-weight="800" fill="#FFD23F" stroke="#5a3a12" stroke-width="10" paint-order="stroke">KÜRTÇE</text><text text-anchor="middle" y="140" font-family="Baloo,sans-serif" font-size="150" font-weight="800" fill="#fff" stroke="#5a3a12" stroke-width="10" paint-order="stroke">KALDI.</text></g>`; }
        }
      }

      if (sec === 't1') { // TEHLİKE: tek dilli okul, anne–çocuk
        if (t < T('t2', 0) - .2) { const u = H.eio(H.seg(t, T('t1', 0) - .2, T('t1', .2)));
          s += `<g opacity="${u}" transform="translate(540 620)"><rect x="-380" y="-200" width="760" height="380" rx="14" fill="#2f3b33" stroke="#6d5a42" stroke-width="22"/><text y="-30" text-anchor="middle" font-family="Baloo,sans-serif" font-size="110" font-weight="800" fill="#eee">TEK DİL</text><text y="90" text-anchor="middle" font-family="Baloo,sans-serif" font-size="56" font-weight="700" fill="#ccc">anadilinde eğitim: ✗</text></g>`; }
        else {
          const mx = 320, cx = 770, split = H.eio(H.seg(t, T('t4', .1), T('t4', .9)));
          const mo = { who: 'B', expr: t > T('t3', .3) ? 'sad' : 'happy', la: [14, 6], ra: t < T('t3', 0) ? [100, 110] : [14, 6], mouth: H.amp('t2', t) };
          s += man(H, t, mo, mx - split * 60, 1240, 1.25);
          const [mhx, mhy] = headOf(mx - split * 60, 1240, 1.25);
          // (başörtüsü kaldırıldı)
          const ch = { who: 'R', expr: t > T('t3', 0) ? 'wide' : 'normal', la: [14, 6], ra: [14, 6], mouth: H.amp('t3', t), noCap: false };
          s += man(H, t, ch, cx + split * 60, 1240, .8);
          const [chx, chy] = headOf(cx + split * 60, 1240, .8);
          // annenin balonu → kırılır
          if (t > T('t2', 0) && t < T('t3', 0) + .8) { const p = H.back(H.seg(t, T('t2', 0), T('t2', .2))), br = H.seg(t, T('t3', 0), T('t3', 0) + .8);
            if (br <= 0) s += `<g transform="translate(560 ${mhy - 300}) scale(${p})"><path d="M-180 70L-230 150L-110 80Z" fill="#fff"/><rect x="-300" y="-90" width="600" height="180" rx="50" fill="#fff"/><text y="0" text-anchor="middle" font-family="Baloo,sans-serif" font-size="54" font-weight="800" fill="${INK}">Tu birçî yî, delalê min?</text><text y="56" text-anchor="middle" font-family="Baloo,sans-serif" font-size="34" font-weight="700" fill="#7a6a3a">(Acıktın mı, canım?)</text></g>`;
            else for (let i = 0; i < 12; i++) { const an = i * .52, d = br * 300, x = 560 + Math.cos(an) * d * 1.4, y = mhy - 300 + Math.sin(an) * d + br * br * 500; s += `<path d="M${x} ${y}l40 -14l-14 44z" fill="#fff" opacity="${1 - br}" transform="rotate(${i * 30 + br * 200} ${x} ${y})"/>`; } }
          if (t > T('t3', 0)) { const p = H.back(H.seg(t, T('t3', 0), T('t3', .2)));
            s += `<g transform="translate(${chx + 40} ${chy - 230}) scale(${p})"><rect x="-260" y="-80" width="520" height="160" rx="44" fill="#fff"/><path d="M-60 76L-100 150L0 76Z" fill="#fff"/><text y="-8" text-anchor="middle" font-family="Baloo,sans-serif" font-size="44" font-weight="800" fill="${INK}">Anne… ne diyorsun?</text><text y="48" text-anchor="middle" font-family="Baloo,sans-serif" font-size="44" font-weight="800" fill="${INK}">Anlamıyorum.</text></g>`;
            s += `<text x="${chx + 120}" y="${chy - 20}" font-family="Baloo,sans-serif" font-size="120" font-weight="800" fill="#FFD23F" opacity="${p}">?</text>`; }
          if (split > 0) { let d = 'M545 300'; for (let i = 1; i <= 12; i++) d += `L${545 + (i % 2 ? 26 : -26) * (1 + split)} ${300 + i * 85}`; s += `<path d="${d}" fill="none" stroke="#111" stroke-width="${10 + split * 26}" stroke-linejoin="round" opacity=".9"/>`; }
        }
      }

      if (sec === 'o1') { // ÖZELEŞTİRİ: ayna
        const u = H.back(H.seg(t, T('o1', 0) - .3, T('o1', .15)));
        s += `<g transform="translate(540 820) scale(${u})"><ellipse rx="330" ry="470" fill="#9fb3c8"/><ellipse rx="300" ry="440" fill="#cfe0ee"/><path d="M-200 -300l90 -90M-150 -200l60 -60" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity=".7"/><ellipse rx="330" ry="470" fill="none" stroke="#c9a227" stroke-width="22"/></g>`;
        if (u > .9) {
          if (t < T('o2', 0)) s += man(H, t, { who: 'R', expr: 'normal' }, 540, 1180, 1.05) + `<text x="540" y="430" text-anchor="middle" font-family="Baloo,sans-serif" font-size="64" font-weight="800" fill="#2b2b38">biz?</text>`;
          else if (t < T('o3', 0)) { s += man(H, t, { who: 'B', expr: 'normal', ra: [100, 110] }, 430, 1180, .95) + man(H, t, { who: 'R', expr: 'sad' }, 680, 1180, .65);
            s += `<g transform="translate(470 520)"><rect x="-150" y="-60" width="300" height="110" rx="34" fill="#fff"/><text y="16" text-anchor="middle" font-family="Baloo,sans-serif" font-size="50" font-weight="800" fill="#c62828">Türkçe!</text></g>`; }
          else { s += man(H, t, { who: 'R', expr: 'sad', red: .8, la: [100, 160], ra: [100, 160] }, 540, 1180, 1.05);
            s += `<g transform="translate(540 470) rotate(-6)"><rect x="-200" y="-55" width="400" height="100" rx="20" fill="#fff"/><text y="16" text-anchor="middle" font-family="Baloo,sans-serif" font-size="52" font-weight="800" fill="#7a6a3a">"köylü dili"</text><path d="M-190 -10h380" stroke="#E53935" stroke-width="10" opacity="${H.seg(t, T('o3', .5), T('o3', .7))}"/></g>`; }
        }
      }

      if (sec === 'c1') { // ÇAĞRI
        if (t < T('c2', 0) - .1) { // terazi
          const tip = H.lerp(-14, 16, H.back(H.seg(t, T('c1', .55), T('c1', .8)))), a = tip * Math.PI / 180, cx = 540, cy = 640, L = 360;
          const lx = cx - Math.cos(a) * L, ly = cy - Math.sin(a) * L, rx = cx + Math.cos(a) * L, ry = cy + Math.sin(a) * L;
          s += `<path d="M${cx} ${cy}V1150M${cx - 160} 1150h320" stroke="#fff" stroke-width="18" stroke-linecap="round"/><path d="M${lx} ${ly}L${rx} ${ry}" stroke="#fff" stroke-width="16" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="22" fill="#FFD23F"/>`;
          const pan = (x, y, lab, col, w) => `<path d="M${x} ${y}l-110 170M${x} ${y}l110 170" stroke="#fff" stroke-width="5"/><path d="M${x - 140} ${y + 170}h280q-20 70 -140 70q-120 0 -140 -70z" fill="${col}"/><text x="${x}" y="${y + 320}" text-anchor="middle" font-family="Baloo,sans-serif" font-size="44" font-weight="800" fill="#fff">${lab}</text>${w}`;
          const hearts = t > T('c1', .5) ? [0, 1, 2].map(i => { const u = H.back(H.seg(t, T('c1', .5) + i * .08, T('c1', .5) + i * .08 + .2)); return `<path transform="translate(${rx + (i - 1) * 70} ${ry + 150}) scale(${u})" d="M0 18C-40 -10 -28 -40 0 -22C28 -40 40 -10 0 18Z" fill="#FFD23F"/>`; }).join('') : '';
          s += pan(lx, ly, 'YOK ETME', '#B71C1C', '') + pan(rx, ry, 'YAŞATMA', '#2E7D32', hearts);
        } else if (t < T('c3', 0) - .1) { // ev, sokak, çarşı
          [['Evde', `<path d="M-80 10L0 -70L80 10V90H-80Z" fill="#fff"/><rect x="-20" y="30" width="40" height="60" fill="#145c38"/>`], ['Sokakta', `<rect x="-8" y="-80" width="16" height="170" fill="#fff"/><path d="M-8 -80h60v24" fill="none" stroke="#fff" stroke-width="12"/><circle cx="52" cy="-40" r="20" fill="#FFD23F"/>`], ['Çarşıda', `<path d="M-90 -40h180l-20 -40h-140z" fill="#fff"/><path d="M-90 -40q22 30 45 0q22 30 45 0q22 30 45 0q22 30 45 0" fill="#FFD23F"/><rect x="-80" y="-10" width="160" height="90" fill="#fff"/>`]].forEach(([lab, ic], i) => {
            const at = T('c2', .05 + i * .2), u = H.back(H.seg(t, at, at + .3)), y = 430 + i * 300;
            s += `<g transform="translate(330 ${y}) scale(${u})"><circle r="120" fill="#ffffff22" stroke="#fff" stroke-width="5"/>${ic}</g><g transform="translate(720 ${y}) scale(${u})"><text text-anchor="middle" y="10" font-family="Baloo,sans-serif" font-size="70" font-weight="800" fill="#fff">${lab}</text><g transform="translate(0 70)"><rect x="-110" y="-30" width="220" height="56" rx="28" fill="#FFD23F"/><text y="12" text-anchor="middle" font-family="Baloo,sans-serif" font-size="36" font-weight="800" fill="#145c38">Kurdî!</text></g></g>`; });
        } else if (t < T('c4', 0) - .1) { // Li malê, li kolanê, li bazarê: Kurdî biaxivin!
          ['Li malê,', 'li kolanê,', 'li bazarê:'].forEach((w, i) => { const at = T('c3', i * .26), u = H.back(H.seg(t, at, at + .18));
            s += `<g transform="translate(540 ${440 + i * 150}) scale(${u})"><text text-anchor="middle" font-family="Baloo,sans-serif" font-size="96" font-weight="800" fill="#fff" stroke="#0f5132" stroke-width="10" paint-order="stroke">${w}</text></g>`; });
          if (t > T('c3', .78)) { const u = H.back(H.seg(t, T('c3', .78), T('c3', .78) + .22)), wob = Math.sin(t * 12) * 2;
            s += `<g transform="translate(540 1040) rotate(${-4 + wob}) scale(${u})"><text text-anchor="middle" font-family="Baloo,sans-serif" font-size="150" font-weight="800" fill="#FFD23F" stroke="#0f5132" stroke-width="14" paint-order="stroke">KURDÎ</text><text y="150" text-anchor="middle" font-family="Baloo,sans-serif" font-size="150" font-weight="800" fill="#FFD23F" stroke="#0f5132" stroke-width="14" paint-order="stroke">BIAXIVIN!</text></g>`; }
        } else { // anne–çocuk kucaklaşır, final
          const u = H.eio(H.seg(t, T('c4', 0) - .2, T('c4', .4)));
          s += man(H, t, { who: 'B', expr: 'happy', la: [14, 6], ra: [60, 30] }, H.lerp(300, 480, u), 1240, 1.2);
          const [mhx, mhy] = headOf(H.lerp(300, 480, u), 1240, 1.2);
          // (başörtüsü kaldırıldı)
          s += man(H, t, { who: 'R', expr: 'happy', la: [150, 170], ra: [150, 170] }, H.lerp(800, 610, u), 1240, .78);
          if (u >= 1) { const hp = H.back(H.seg(t, T('c4', .45), T('c4', .65))); s += `<path transform="translate(545 ${640 - Math.sin(t * 3) * 10}) scale(${hp * 2.2})" d="M0 18C-40 -10 -28 -40 0 -22C28 -40 40 -10 0 18Z" fill="#E53935" stroke="#fff" stroke-width="3"/>`; }
          if (t > T('c5', 0) - .1) { const q = H.back(H.seg(t, T('c5', 0), T('c5', .25)));
            s += `<g transform="translate(540 1500) scale(${q})" text-anchor="middle" font-family="Baloo,sans-serif" font-weight="800"><text font-size="96" fill="#fff" stroke="#0f5132" stroke-width="12" paint-order="stroke">Zimanê min,</text><text y="115" font-size="96" fill="#FFD23F" stroke="#0f5132" stroke-width="12" paint-order="stroke">rûmeta min.</text><text y="190" font-size="40" fill="#fff" opacity=".9">Dilim, onurumdur.</text><text y="300" font-size="38" fill="#fff" opacity="${H.seg(t, T('c5', 1), T('c5', 1) + .5)}">@Dirokkurdii</text></g>`; }
        }
      }

      // kinetik yazı (alt bölüm, okunurluk için koyu şerit)
      const L = SEQ.find(l => l.txt && t >= H.T(l.id, 0) - .1 && t < H.T(l.id, 1) + .6);
      if (L) { const hl = { k1: '#FF5A5A', s1: '#FF5A5A', i1: '#FFD23F', w1: '#7FD1FF', r1: '#FFD23F', t1: '#FFB0B0', o1: '#FFD23F', c1: '#FFD23F' }[sec];
        s += `<defs><linearGradient id="lb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".35" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></linearGradient></defs><rect x="-50" y="1300" width="1200" height="700" fill="url(#lb)"/>` + kinetic(H, t, L, hl); }

      s += `</g>`;
      // bölüm geçişi: çapraz perde
      SECT.forEach((_, i) => { if (!i) return; const a = secStart(H, i), u = (t - (a - .3)) / .6; if (u > 0 && u < 1) { const x = H.lerp(-1500, 1500, H.eio(u)); s += `<path d="M${x - 300} -100L${x + 900} -100L${x + 300} 2100L${x - 900} 2100Z" fill="#000" opacity=".92"/><path d="M${x + 900} -100L${x + 960} -100L${x + 360} 2100L${x + 300} 2100Z" fill="#FFD23F"/>`; } });
      // açılış/kapanış kararması
      s += `<rect x="-50" y="-50" width="1200" height="2050" fill="#000" opacity="${1 - H.seg(t, 0, .5)}"/>`;
      return s;
    },
  };
})();
