// Dîrok Kurdî ders videoları (yatay 1920×1080, yeşil/altın tarz).
// Ders verisi window.LESSON, ses süreleri window.DUR. renderAt(t) deterministik kare çizer.
(function () {
  const L = window.LESSON, DUR = window.DUR || {};
  const W = 1920, H = 1080;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const eout = u => 1 - Math.pow(1 - u, 3);
  const back = u => { const c = 1.7; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
  const d = (id, def = 2) => DUR[id] ?? def;
  const hl = s => s.replace(/\*(.+?)\*/g, '<b>$1</b>');
  const INK = '#10241a';

  // ---------- Zaman çizelgesi ----------
  const TL = { fps: 30, clips: [], items: [], chimes: [] };
  let t = .5;
  const words = L.seq.filter(s => s.type === 'word');
  for (const it of L.seq) {
    const o = { ...it, a: t };
    if (it.type === 'intro') { TL.clips.push({ id: it.id, at: t + .6 }); t += .6 + d(it.id, 4) + .7; }
    else if (it.type === 'section') { TL.clips.push({ id: it.id, at: t + .35 }); TL.chimes.push(t + .05); t += .35 + Math.max(d(it.id), 1.6) + .55; }
    else if (it.type === 'word') {
      o.ta = t + .3; o.tb = o.ta + d(it.id + 'a') + .45; o.n = words.indexOf(it);
      TL.clips.push({ id: it.id + 'a', at: o.ta }, { id: it.id + 'b', at: o.tb }); TL.chimes.push(t + .05);
      t = o.tb + d(it.id + 'b') + .95;
    } else if (it.type === 'phrases') {
      t += .9; o.at = [];
      for (const p of it.items) { o.at.push(t); TL.clips.push({ id: p.id, at: t }); t += d(p.id, 2.5) + .55; }
      t += .5;
    } else if (it.type === 'recap') { TL.clips.push({ id: it.id, at: t + 1.6 }); t += 1.6 + Math.max(d(it.id, 3), 3) + 2.2; }
    o.b = t; TL.items.push(o);
  }
  TL.dur = Math.ceil(t * 2) / 2;
  window.TL = TL;

  // ---------- Çizimler ----------
  const S = `stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
  const glass = (fill, extra = '') => `<path d="M-70 -120h140l-18 240h-104z" fill="#e8f4f1" opacity=".35"/><path d="M-62 -60h124l-14 172h-96z" fill="${fill}"/>${extra}<path d="M-70 -120h140l-18 240h-104z" fill="none" ${S}/><path d="M-40 -96l8 150" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".6"/>`;
  const ICON = {
    bread: `<path d="M-150 20q0 -110 150 -110q150 0 150 110q0 80 -150 80q-150 0 -150 -80z" fill="#D9A05B" ${S}/><path d="M-80 -40l36 70M-10 -58l36 76M60 -44l32 66" stroke="#8B5A2B" stroke-width="12" stroke-linecap="round"/><path d="M-120 44q120 44 240 0" fill="none" stroke="#B8793A" stroke-width="8" stroke-linecap="round"/>`,
    cheese: `<path d="M-150 60L110 -100L150 60Z" fill="#FFD95A" ${S}/><path d="M-150 60h300v54h-300z" fill="#F4B93B" ${S}/><circle cx="20" cy="10" r="20" fill="#F4B93B"/><circle cx="84" cy="-28" r="13" fill="#F4B93B"/><circle cx="-50" cy="34" r="12" fill="#F4B93B"/><circle cx="60" cy="88" r="12" fill="#D99A22"/><circle cx="-70" cy="90" r="9" fill="#D99A22"/>`,
    egg: `<path d="M-150 10q-20 -90 70 -100q60 -50 130 0q100 20 90 100q-10 90 -110 90q-60 40 -120 0q-50 -10 -60 -90z" fill="#fff" ${S}/><circle cx="10" cy="6" r="56" fill="#FFB52E" ${S}/><circle cx="-10" cy="-14" r="14" fill="#FFE08A"/>`,
    meat: `<path d="M-140 -10q10 -100 130 -90q130 10 140 90q10 90 -110 100q-150 10 -160 -100z" fill="#C0392B" ${S}/><path d="M-90 -6q10 -50 80 -46q70 6 80 44q6 44 -64 50q-90 4 -96 -48z" fill="#E15B4C"/><circle cx="-20" cy="6" r="26" fill="#fff" ${S}/><circle cx="-20" cy="6" r="9" fill="#E8D5B5"/>`,
    rice: `<path d="M-120 -20q10 -90 120 -90q110 0 120 90z" fill="#fff" ${S}/>${[[-60, -50], [-20, -74], [30, -66], [70, -40], [0, -40], [-84, -30], [44, -30]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="5" fill="#d9d2c0" transform="rotate(${x} ${x} ${y})"/>`).join('')}<path d="M-150 -20h300q-10 130 -150 130q-140 0 -150 -130z" fill="#3FB8AF" ${S}/><path d="M-60 110h120v20h-120z" fill="#2b8f88" ${S}/>`,
    apple: `<path d="M0 -70q-110 -60 -130 40q-10 130 70 150q40 10 60 -10q20 20 60 10q80 -20 70 -150q-20 -100 -130 -40z" fill="#D8362B" ${S}/><path d="M0 -70q0 -40 20 -60" fill="none" ${S}/><path d="M22 -112q50 -30 80 10q-50 26 -80 -10z" fill="#4CAF50" ${S}/><path d="M-84 -10q-10 50 20 90" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".5"/>`,
    water: glass('#6EC6FF'),
    tea: `<ellipse cy="118" rx="120" ry="24" fill="#fff" ${S}/><path d="M-44 -70q30 80 -6 170h100q-36 -90 -6 -170z" fill="#C8491E"/><path d="M-50 -120q40 110 -8 224h116q-48 -114 -8 -224z" fill="none" ${S}/><path d="M-20 -150q-14 -18 0 -36M20 -150q-14 -18 0 -36" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>`,
    milk: glass('#fff', `<path d="M-62 -60q62 22 124 0" fill="none" stroke="#dfe7e4" stroke-width="8"/>`),
    dew: glass('#F7F3E8', `<circle cx="-30" cy="-58" r="14" fill="#fff"/><circle cx="0" cy="-66" r="18" fill="#fff"/><circle cx="34" cy="-58" r="14" fill="#fff"/><circle cx="-14" cy="20" r="6" fill="#7BC47F"/><circle cx="24" cy="60" r="5" fill="#7BC47F"/><circle cx="-30" cy="80" r="4" fill="#7BC47F"/>`),
  };
  function sun(cx, cy, r, t, o = 1) {
    let s = `<g opacity="${o}" transform="translate(${cx} ${cy}) rotate(${t * 2})">`;
    for (let i = 0; i < 24; i++) { const a = i * 15, len = i % 2 ? r * .42 : r * .7; s += `<path d="M0 ${-r * 1.08}L${r * .07} ${-r * 1.08 - len}L${-r * .07} ${-r * 1.08 - len}Z" fill="#E9C46A" transform="rotate(${a})"/>`; }
    return s + `</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sg)" opacity="${o}"/>`;
  }
  function bg(t, sunO, sunPos) {
    let s = `<svg class="bg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><radialGradient id="sg"><stop offset="0" stop-color="#FFF3C4"/><stop offset=".55" stop-color="#F1CF73"/><stop offset="1" stop-color="#C9973A"/></radialGradient></defs>`;
    s += `<path d="M0 ${H}V820L260 700L480 800L760 640L1020 790L1300 660L1560 780L1760 700L1920 770V${H}Z" fill="#17301f" opacity=".9"/><path d="M0 ${H}V900L340 800L640 890L980 780L1340 880L1640 800L1920 870V${H}Z" fill="#0d1f15"/>`;
    if (sunO > 0) s += sun(sunPos[0], sunPos[1], sunPos[2], t, sunO);
    return s + `</svg>`;
  }
  const iconSvg = (name, size) => `<svg width="${size}" height="${size}" viewBox="-200 -200 400 400">${ICON[name] || ''}</svg>`;
  const chrome = () => `<div class="tags"><span class="tag tr">TR</span><span class="tag">A1 · DERS ${L.no}</span></div><div class="foot"><span class="pill">${L.pill}</span><span class="sub">${L.sub}</span></div><div class="brand">DÎROK KURDÎ</div>`;

  function titleCard(p) {
    return `<div class="layer" style="opacity:${p}"><div style="position:absolute;left:120px;top:240px"><div class="serif gold" style="font-size:${Math.min(190, Math.round(1500 / Math.max(...L.title.map(x => x.length))))}px;transform:translateY(${(1 - p) * 30}px)">${L.title.join('<br>')}</div><div style="font-size:66px;font-weight:800;margin-top:34px"><span style="color:#e9c46a">=</span> ${L.titleTr}</div></div></div>`;
  }

  // ---------- Kare ----------
  window.renderAt = function (t) {
    const it = TL.items.find(x => t >= x.a && t < x.b) || TL.items[TL.items.length - 1];
    const fin = eout(seg(t, it.a, it.a + .35)), fout = 1 - seg(t, it.b - .25, it.b), f = Math.min(fin, it === TL.items[TL.items.length - 1] ? 1 : fout);
    let h = '';
    if (it.type === 'intro') {
      h = bg(t, 1, [1560, 460, 170]) + titleCard(f);
    } else if (it.type === 'section') {
      h = bg(t, .22, [960, 500, 300]) + `<div class="center" style="opacity:${f}"><div class="serif gold" style="font-size:230px;transform:scale(${.85 + .15 * back(fin)})">${it.ku}</div><div style="font-size:72px;font-weight:800;margin-top:30px"><span style="color:#e9c46a">=</span> ${it.tr}</div></div>`;
    } else if (it.type === 'word') {
      const pm = eout(seg(t, it.ta + d(it.id + 'a') * .5, it.ta + d(it.id + 'a') * .5 + .3)), ps = eout(seg(t, it.tb - .15, it.tb + .2));
      const pop = back(seg(t, it.a + .05, it.a + .5));
      h = bg(t, .9 * f, [1480, 470, 250]);
      h += `<div class="layer" style="opacity:${f}"><div style="position:absolute;left:1260px;top:250px;width:440px;height:440px;border-radius:50%;background:rgba(13,31,21,.82);border:6px solid #e9c46a;transform:scale(${pop})"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:translateY(${Math.sin(t * 2) * 6}px)">${iconSvg(it.icon, 340)}</div></div>`;
      h += `<div class="word"><div class="serif gold ku" style="font-size:${it.ku.length > 5 ? 170 : 210}px;transform:translateX(${(1 - fin) * -40}px)">${it.ku}</div><div class="tr" style="opacity:${pm}"><b>=</b> ${it.tr}</div><div class="sent" style="opacity:${ps};transform:translateY(${(1 - ps) * 20}px)"><div class="s1">${hl(it.sku)}</div><div class="s2">${it.str}</div></div></div>`;
      h += `<div class="dots">${words.map((_, i) => `<i class="${i <= it.n ? 'on' : ''}"></i>`).join('')}</div></div>`;
    } else if (it.type === 'phrases') {
      h = bg(t, .2, [1560, 300, 220]) + `<div class="layer" style="opacity:${f}"><div style="position:absolute;left:200px;top:150px"><span class="serif gold" style="font-size:96px">${it.title}</span><span style="font-size:50px;font-weight:700;margin-left:26px;color:#cfe0d2">= ${it.titleTr}</span></div><div class="phr">`;
      it.items.forEach((p, i) => { const pp = eout(seg(t, it.at[i] - .1, it.at[i] + .3)); h += `<div class="row" style="opacity:${pp};transform:translateX(${(1 - pp) * -30}px)"><span class="k">${hl(p.ku)}</span><span class="t">${p.tr}</span></div>`; });
      h += `</div></div>`;
    } else if (it.type === 'recap') {
      h = bg(t, .15, [960, 520, 330]) + `<div class="layer" style="opacity:${fin}"><div style="position:absolute;left:0;right:0;top:120px;text-align:center"><span class="serif gold" style="font-size:88px">${L.title.join(' ')}</span></div><div class="grid">`;
      words.forEach((w, i) => { const pp = back(seg(t, it.a + .25 + i * .12, it.a + .6 + i * .12)); h += `<div class="cell" style="transform:scale(${pp});opacity:${Math.min(1, pp * 2)}">${iconSvg(w.icon, 150)}<div class="k gold">${w.ku}</div><div class="t">${w.tr}</div></div>`; });
      h += `</div></div>`;
    }
    document.getElementById('stage').innerHTML = h + chrome();
  };
  // Kapak (küçük resim) — kanaldaki kapak düzeni
  window.renderCover = function () {
    document.getElementById('stage').innerHTML = bg(0, 1, [1560, 460, 170]) + titleCard(1) + chrome();
  };

  if (!navigator.webdriver) {
    const st = document.getElementById('stage');
    const fit = () => { st.style.transform = `scale(${Math.min(innerWidth / W, innerHeight / H)})`; };
    fit(); addEventListener('resize', fit);
    const t0 = performance.now(), played = new Set();
    (function loop() {
      const tt = ((performance.now() - t0) / 1000) % TL.dur;
      if (tt < .1) played.clear();
      for (const c of TL.clips) if (tt >= c.at && !played.has(c.id)) { played.add(c.id); new Audio(`lessons/${window.LNAME}/audio/${c.id}.mp3`).play().catch(() => { }); }
      window.renderAt(tt); requestAnimationFrame(loop);
    })();
  } else window.renderAt(0);
})();
