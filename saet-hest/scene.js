// "Saet heşt!" — 2D çöp adam sahnesi. renderAt(t) verilen saniyedeki kareyi çizer (tamamen deterministik).
(function () {
  const TL = window.TL, ENV = window.ENV || {};
  const W = 1080, H = 1920, FLOOR = 1180;
  const INK = '#1f1b16', PINK = '#F48FB1', BLUE = '#2F7DE1';
  const BX = 500, RX = 800; // Berfîn ve Ronî'nin durduğu yerler

  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const eio = u => (u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
  const eout = u => 1 - Math.pow(1 - u, 3);
  const back = u => { const c = 1.9; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
  const rad = a => a * Math.PI / 180;
  const mixA = (p, q, u) => [lerp(p[0], q[0], u), lerp(p[1], q[1], u)];
  const line = id => TL.lines.find(l => l.id === id);
  const during = (id, t, pad = 0) => { const l = line(id); return t >= l.start - pad && t < l.start + l.dur + pad; };
  const amp = (id, t) => { const l = line(id), e = ENV[id]; if (!e) return 0; const i = Math.floor((t - l.start) * TL.fps); return i >= 0 && i < e.length ? e[i] : 0; };
  const S = `stroke="${INK}" stroke-linecap="round" stroke-linejoin="round"`;

  // ---------- Saat ----------
  function clockHours(t) {
    if (t < 10.8) return 17;
    if (t < 22.7) return 8 + 2 * eio(seg(t, 15.2, 16.4)) + 2 * eio(seg(t, 20.3, 21.5));
    return 20;
  }
  function clockFace(cx, cy, r, h, sw = 7) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" ${S} stroke-width="${sw}"/>`;
    for (let i = 0; i < 12; i++) {
      const a = rad(i * 30), r1 = r * (i % 3 ? .84 : .76), r2 = r * .92;
      s += `<path d="M${cx + Math.sin(a) * r1} ${cy - Math.cos(a) * r1}L${cx + Math.sin(a) * r2} ${cy - Math.cos(a) * r2}" ${S} stroke-width="${i % 3 ? 3 : 5}"/>`;
    }
    const ha = rad((h % 12) * 30), ma = rad((h % 1) * 360);
    s += `<path d="M${cx} ${cy}L${cx + Math.sin(ha) * r * .5} ${cy - Math.cos(ha) * r * .5}" ${S} stroke-width="${sw + 2}"/>`;
    s += `<path d="M${cx} ${cy}L${cx + Math.sin(ma) * r * .74} ${cy - Math.cos(ma) * r * .74}" ${S} stroke-width="${sw - 2}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r * .08}" fill="#E0407B"/>`;
    return s;
  }
  function wallClock(t) {
    const h = clockHours(t), cx = 640, cy = 420;
    const spin = (t > 15.2 && t < 16.4) || (t > 20.3 && t < 21.5);
    const wob = spin ? Math.sin(t * 60) * 2.5 : 0;
    let s = `<g transform="rotate(${wob} ${cx} ${cy})">` + clockFace(cx, cy, 78, h, 8) + `</g>`;
    if (t >= 10.8) {
      const hh = Math.floor(h + 1e-6), mm = Math.floor(((h + 1e-6) % 1) * 60);
      const txt = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
      const night = t >= 22.7;
      s += `<rect x="${cx + 98}" y="${cy - 30}" width="172" height="60" rx="18" fill="${night ? '#2b3566' : '#FFC83D'}" ${S} stroke-width="6"/>`;
      s += `<text x="${cx + 184}" y="${cy + 16}" text-anchor="middle" font-size="46" font-weight="800" fill="${night ? '#fff' : INK}">${txt}</text>`;
    }
    return s;
  }

  // ---------- Oda ----------
  function room(t) {
    const mode = t < 10.8 ? 'day' : t < 22.7 ? 'morning' : 'night';
    let s = '';
    s += `<rect width="${W}" height="${FLOOR}" fill="#F6ECD6"/>`;
    for (let y = 60; y < FLOOR; y += 90) for (let x = 45 + ((y / 90) % 2) * 45; x < W; x += 90) s += `<circle cx="${x}" cy="${y}" r="4" fill="#E9DCBF"/>`;
    // zemin
    s += `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#DDB680"/>`;
    for (let i = 0; i < 9; i++) s += `<path d="M0 ${FLOOR + 30 + i * 84}H${W}" stroke="#C99E66" stroke-width="4"/>`;
    for (let i = 0; i < 9; i++) for (let x = (i % 2) * 200 + 120; x < W; x += 400) s += `<path d="M${x} ${FLOOR + 30 + (i - 1) * 84}v84" stroke="#C99E66" stroke-width="4"/>`;
    s += `<rect y="${FLOOR - 26}" width="${W}" height="26" fill="#fff" ${S} stroke-width="6"/>`;
    // pencere
    const wx = 70, wy = 520, ww = 290, wh = 330;
    const sky = mode === 'day' ? '#9FD8FF' : mode === 'morning' ? '#FFE0B0' : '#1D2A52';
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="${sky}" ${S} stroke-width="9"/>`;
    if (mode === 'day') {
      s += `<circle cx="${wx + 215}" cy="${wy + 80}" r="36" fill="#FFD23F"/>`;
      s += `<path d="M${wx + 50} ${wy + 190}a26 26 0 0 1 44 -22a34 34 0 0 1 62 14a22 22 0 0 1 -6 44h-90a24 24 0 0 1 -10 -36z" fill="#fff"/>`;
    } else if (mode === 'morning') {
      const up = eout(seg(t, 10.8, 13));
      s += `<circle cx="${wx + 150}" cy="${wy + 300 - up * 130}" r="52" fill="#FF9F43"/>`;
      for (let i = 0; i < 8; i++) { const a = rad(i * 45 + t * 12); s += `<path d="M${wx + 150 + Math.cos(a) * 66} ${wy + 300 - up * 130 + Math.sin(a) * 66}L${wx + 150 + Math.cos(a) * 86} ${wy + 300 - up * 130 + Math.sin(a) * 86}" stroke="#FF9F43" stroke-width="8" stroke-linecap="round"/>`; }
    } else {
      s += `<circle cx="${wx + 200}" cy="${wy + 95}" r="44" fill="#FFF2B0"/><circle cx="${wx + 222}" cy="${wy + 80}" r="40" fill="${sky}"/>`;
      [[50, 60], [110, 150], [70, 240], [230, 230], [150, 50], [250, 170]].forEach(([a, b], i) => { const tw = .5 + .5 * Math.sin(t * 3 + i * 2); s += `<circle cx="${wx + a}" cy="${wy + b}" r="${3 + tw * 3}" fill="#fff" opacity="${.5 + tw * .5}"/>`; });
    }
    s += `<path d="M${wx + ww / 2} ${wy}v${wh}M${wx} ${wy + wh / 2}h${ww}" ${S} stroke-width="7"/>`;
    s += `<rect x="${wx - 14}" y="${wy + wh}" width="${ww + 28}" height="22" fill="#fff" ${S} stroke-width="6"/>`;
    s += `<path d="M${wx - 14} ${wy - 10}q70 30 80 150q-10 110 -70 200l-10 -10z" fill="${PINK}" ${S} stroke-width="7"/>`;
    s += `<path d="M${wx + ww + 14} ${wy - 10}q-70 30 -80 150q10 110 70 200l10 -10z" fill="${PINK}" ${S} stroke-width="7"/>`;
    s += `<path d="M${wx - 40} ${wy - 14}h${ww + 80}" ${S} stroke-width="12"/>`;
    // kapı
    s += `<rect x="905" y="600" width="230" height="${FLOOR - 600 - 26}" fill="#C98B4E" ${S} stroke-width="9"/>`;
    s += `<rect x="935" y="640" width="170" height="210" rx="8" fill="none" stroke="#A56F38" stroke-width="7"/><rect x="935" y="890" width="170" height="210" rx="8" fill="none" stroke="#A56F38" stroke-width="7"/>`;
    s += `<circle cx="938" cy="880" r="13" fill="#FFD23F" ${S} stroke-width="5"/>`;
    s += wallClock(t);
    if (mode === 'night') s += `<rect width="${W}" height="${H}" fill="#18204a" opacity=".2"/>`;
    return s;
  }

  // ---------- Masa ve üzerindekiler ----------
  function table(t) {
    let s = '';
    const ty = 985;
    s += `<path d="M105 ${ty + 26}V${FLOOR - 14}M385 ${ty + 26}V${FLOOR - 14}" ${S} stroke-width="14"/>`;
    s += `<rect x="60" y="${ty}" width="370" height="30" rx="8" fill="#C98B4E" ${S} stroke-width="8"/>`;
    // çaydanlık
    s += `<g transform="translate(140 ${ty})"><path d="M-48 -8q-10 -62 48 -62q58 0 48 62z" fill="#3FB8AF" ${S} stroke-width="7"/><path d="M48 -44q34 -6 38 -30" fill="none" ${S} stroke-width="7"/><path d="M-48 -52q-34 4 -30 26q4 16 30 10" fill="none" ${S} stroke-width="7"/><rect x="-20" y="-80" width="40" height="12" rx="5" fill="#2b8f88" ${S} stroke-width="6"/><circle cy="-88" r="8" fill="#FFD23F" ${S} stroke-width="5"/></g>`;
    const morning = t >= 10.8 && t < 22.7, night = t >= 22.7;
    // çay bardağı
    const cold = seg(t, 16.4, 17.2);
    const tea = night ? 'none' : (morning ? (cold > .5 ? '#B8875A' : '#D9531E') : '#D9531E');
    s += `<g transform="translate(248 ${ty})"><ellipse cy="-3" rx="34" ry="8" fill="#fff" ${S} stroke-width="5"/>`;
    if (tea !== 'none') s += `<path d="M-15 -52q8 22 -2 44h34q-10 -22 -2 -44z" fill="${tea}"/>`;
    s += `<path d="M-17 -64q12 30 -3 56h40q-15 -26 -3 -56z" fill="none" ${S} stroke-width="5"/></g>`;
    if (morning && cold < 1) {
      for (let i = 0; i < 3; i++) { const p = ((t * .7 + i / 3) % 1), x = 236 + i * 12 + Math.sin(p * 6 + i) * 8; s += `<path d="M${x} ${ty - 76 - p * 60}q10 -12 0 -24" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${(1 - p) * (1 - cold) * .95}"/>`; }
    }
    if (morning && cold >= 1 && t < 20.3) { // "sar" — soğuk işareti
      const cx = 248, cy = ty - 112, p = back(seg(t, 18.6, 19.0));
      if (p > 0) { let f = ''; for (let i = 0; i < 3; i++) { const a = rad(i * 60); f += `<path d="M${-Math.cos(a) * 22} ${-Math.sin(a) * 22}L${Math.cos(a) * 22} ${Math.sin(a) * 22}"/>`; } s += `<g transform="translate(${cx} ${cy}) scale(${p}) rotate(${t * 40})" stroke="#4FB3F6" stroke-width="7" stroke-linecap="round">${f}</g>`; }
    }
    // kahvaltı tabağı
    if (morning || night) {
      s += `<g transform="translate(345 ${ty})"><ellipse cy="-6" rx="66" ry="14" fill="#fff" ${S} stroke-width="6"/>`;
      if (morning) {
        s += `<path d="M-44 -12a26 20 0 0 1 52 0z" fill="#E8B15C" ${S} stroke-width="5"/>`;
        s += `<path d="M8 -12l16 -30l22 30z" fill="#FFE27A" ${S} stroke-width="5"/>`;
        s += `<circle cx="-14" cy="-36" r="9" fill="#3d5a2a" ${S} stroke-width="4"/><circle cx="48" cy="-18" r="8" fill="#3d5a2a" ${S} stroke-width="4"/>`;
      } else {
        s += `<circle cx="-20" cy="-8" r="3" fill="#C99E66"/><circle cx="6" cy="-5" r="3" fill="#C99E66"/><circle cx="26" cy="-9" r="2.5" fill="#C99E66"/>`;
      }
      s += `</g>`;
    }
    return s;
  }

  // ---------- Karakter ----------
  function armPts(side, a, shY) {
    const L = 84, ex = side * Math.sin(rad(a[0])) * L, ey = shY + Math.cos(rad(a[0])) * L;
    return [ex, ey, ex + side * Math.sin(rad(a[1])) * L, ey + Math.cos(rad(a[1])) * L];
  }
  function person(o, t) {
    const who = o.who, look = o.look ?? (who === 'B' ? 1 : -1);
    const { x, expr = 'normal', mouth = 0, tilt = 0, rot = 0, dy = 0, dx = 0, la = [14, 6], ra = [14, 6], walk = null, red = 0 } = o;
    const hipY = -172, shY = -314, neckY = -334, hY = -394, R = 62;
    let s = `<g transform="translate(${x + dx} ${FLOOR - 10 + dy}) rotate(${rot})">`;
    s += `<ellipse cx="0" cy="6" rx="${70 - Math.abs(dy) * .6}" ry="12" fill="#000" opacity=".12"/>`;
    let lf = [-36, 0], rf = [36, 0];
    if (walk != null) { const p = walk * Math.PI * 2; lf = [Math.sin(p) * 48, -Math.max(0, Math.cos(p)) * 26]; rf = [-Math.sin(p) * 48, -Math.max(0, -Math.cos(p)) * 26]; }
    s += `<path d="M0 ${hipY}L${lf[0]} ${lf[1]}M0 ${hipY}L${rf[0]} ${rf[1]}" fill="none" ${S} stroke-width="10"/>`;
    s += `<path d="M0 ${hipY}L0 ${neckY}" fill="none" ${S} stroke-width="10"/>`;
    if (who === 'B') {
      s += `<path d="M-20 ${shY - 6}L20 ${shY - 6}L82 ${hipY + 58}Q0 ${hipY + 80} -82 ${hipY + 58}Z" fill="${PINK}" ${S} stroke-width="8"/>`;
      s += `<path d="M-50 ${hipY + 20}Q0 ${hipY + 36} 50 ${hipY + 20}" fill="none" stroke="#E0407B" stroke-width="6" stroke-linecap="round"/>`;
    } else {
      s += `<path d="M-30 ${shY - 6}L30 ${shY - 6}L34 ${hipY + 4}L-34 ${hipY + 4}Z" fill="#FFD23F" ${S} stroke-width="8"/>`;
    }
    const A = armPts(-1, la, shY), B = armPts(1, ra, shY);
    s += `<path d="M0 ${shY}L${A[0]} ${A[1]}L${A[2]} ${A[3]}M0 ${shY}L${B[0]} ${B[1]}L${B[2]} ${B[3]}" fill="none" ${S} stroke-width="10"/>`;
    // kafa
    const mixc = (c1, c2, u) => c1.map((v, i) => Math.round(lerp(v, c2[i], u)));
    const face = `rgb(${mixc([255, 255, 255], [255, 150, 130], red).join(',')})`;
    s += `<g transform="translate(0 ${hY}) rotate(${tilt})">`;
    if (who === 'B') s += `<g transform="scale(${look >= 0 ? 1 : -1} 1)"><path d="M-48 -34C-112 -30 -122 56 -86 86C-82 46 -66 22 -48 8Z" fill="${INK}"/></g>`;
    s += `<circle r="${R}" fill="${face}" ${S} stroke-width="8"/>`;
    const ey = who === 'B' ? 2 : 6, ex0 = look * 12;
    if (who === 'B') {
      s += `<path d="M-${R} -6A${R} ${R} 0 0 1 ${R} -6Q34 -36 0 -28Q-34 -36 -${R} -6Z" fill="${INK}" ${S} stroke-width="4"/>`;
      s += `<g transform="translate(${-look * 26} -62) rotate(${-look * 14})"><path d="M0 0L-30 -18L-30 18ZM0 0L30 -18L30 18Z" fill="#E0407B" ${S} stroke-width="5"/><circle r="8" fill="#E0407B" ${S} stroke-width="5"/></g>`;
      s += `<circle cx="${ex0 - 36}" cy="22" r="11" fill="#FF8FB0" opacity=".55"/><circle cx="${ex0 + 36}" cy="22" r="11" fill="#FF8FB0" opacity=".55"/>`;
    } else {
      s += `<path d="M${look * 26} -12L${look * 112} -8" stroke="#1E5FBF" stroke-width="18" stroke-linecap="round"/>`;
      s += `<path d="M-${R + 2} -12A${R + 2} ${R + 2} 0 0 1 ${R + 2} -12Z" fill="${BLUE}" ${S} stroke-width="7"/><circle cy="-76" r="8" fill="#1E5FBF" ${S} stroke-width="4"/>`;
    }
    const blink = ((t + (who === 'B' ? 0 : 1.3)) % 3.4) < 0.12;
    const E = blink && !['sleep', 'wide', 'dizzy'].includes(expr) ? 'sleep' : expr;
    for (const sd of [-1, 1]) {
      const cx = ex0 + sd * 23;
      let e = '';
      if (E === 'happy' || E === 'smug') e = `<path d="M-10 4Q0 -10 10 4" fill="none" ${S} stroke-width="6"/>`;
      else if (E === 'sleep') e = `<path d="M-10 -1Q0 8 10 -1" fill="none" ${S} stroke-width="6"/>`;
      else if (E === 'wide') e = `<circle r="15" fill="#fff" ${S} stroke-width="5"/><circle cx="${look * 3}" r="6" fill="${INK}"/>`;
      else if (E === 'dizzy') e = `<path d="M-10 -10L10 10M10 -10L-10 10" fill="none" ${S} stroke-width="6"/>`;
      else e = `<ellipse rx="7" ry="10" fill="${INK}"/>`;
      if (E === 'angry') e += `<path d="M${sd * 14} -26L${-sd * 12} -13" fill="none" ${S} stroke-width="7"/>`;
      if (E === 'sad') e += `<path d="M${sd * 14} -14L${-sd * 10} -24" fill="none" ${S} stroke-width="6"/>`;
      s += `<g transform="translate(${cx} ${ey})">${e}</g>`;
    }
    const mx = look * 10, my = 32;
    if (mouth > 0.1) {
      const rx = 11 + 5 * mouth, ry = 5 + 17 * mouth;
      s += `<ellipse cx="${mx}" cy="${my}" rx="${rx}" ry="${ry}" fill="#6b1d1d" ${S} stroke-width="5"/>`;
      if (mouth > .45) s += `<ellipse cx="${mx}" cy="${my + ry * .45}" rx="${rx * .6}" ry="${ry * .35}" fill="#E76A6A"/>`;
    } else {
      let m;
      if (E === 'angry' || E === 'sad') m = `<path d="M-14 8Q0 -6 14 8" fill="none" ${S} stroke-width="6"/>`;
      else if (expr === 'sleep') m = `<circle r="6" fill="#6b1d1d" ${S} stroke-width="4"/>`;
      else if (E === 'wide') m = `<ellipse rx="8" ry="10" fill="#6b1d1d" ${S} stroke-width="4"/>`;
      else if (E === 'dizzy') m = `<path d="M-18 2q6 -9 12 0t12 0t12 0" fill="none" ${S} stroke-width="5"/>`;
      else if (E === 'smug') m = `<path d="M-14 0Q4 12 16 -6" fill="none" ${S} stroke-width="6"/>`;
      else m = `<path d="M-14 -3Q0 12 14 -3" fill="none" ${S} stroke-width="6"/>`;
      s += `<g transform="translate(${mx} ${my})">${m}</g>`;
    }
    if (expr === 'angry' && red > .5) s += `<g transform="translate(${look * 46} -70) rotate(${Math.sin(t * 20) * 6})" stroke="#E53935" stroke-width="7" stroke-linecap="round" fill="none"><path d="M-14 -4q10 0 10 -10M4 -14q0 10 10 10M14 4q-10 0 -10 10M-4 14q0 -10 -10 -10"/></g>`;
    if (o.tear) s += `<path d="M${ex0 - 23} 16q-8 14 0 20q8 -6 0 -20z" fill="#6EC6FF" transform="translate(0 ${((t * 40) % 30)})" opacity="${1 - ((t * 40) % 30) / 30}"/>`;
    if (o.sweat) s += `<path d="M${-look * 50} -30q-10 16 0 24q10 -8 0 -24z" fill="#6EC6FF" ${S} stroke-width="3" transform="translate(0 ${((t * 30) % 24)})"/>`;
    s += `</g></g>`;
    return s;
  }

  // ---------- Pozlar ----------
  function poses(t) {
    const idle = Math.sin(t * 2.2) * 2;
    const B = { who: 'B', x: BX, dy: idle, expr: 'normal' };
    const R = { who: 'R', x: RX, dy: Math.sin(t * 2.2 + 1) * 2, expr: 'normal', show: true };
    const hop = (t0, hgt = 34, d = .45) => { const u = seg(t, t0, t0 + d); return u > 0 && u < 1 ? -Math.sin(u * Math.PI) * hgt : 0; };

    if (t < 10.8) { // 1. sahne: davet
      B.dy += hop(.5) + hop(1.6, 20); R.dy += hop(.75);
      if (during('l01', t, .1)) { B.mouth = amp('l01', t); B.expr = 'happy'; B.ra = [84 + Math.sin(t * 9) * 6, 96 + Math.sin(t * 9) * 10]; B.la = [30, -20]; }
      else { B.expr = 'happy'; }
      if (during('l02', t, .1)) {
        R.mouth = amp('l02', t);
        const u = eio(seg(t, 7.5, 7.8));
        R.la = mixA([112, 214], [150, 176], u); R.expr = u > .5 ? 'happy' : 'normal'; R.tilt = lerp(-8, 0, u);
        R.dy += hop(7.7, 44) + hop(8.5, 30);
      } else if (t > 9.6) { R.expr = 'happy'; R.la = [150, 176]; }
    } else if (t < 22.7) { // 2. sahne: sabah, bekleyiş
      R.show = false;
      B.look = .6; B.tilt = -6; B.la = [48, -44];
      if (during('l03', t, .1)) { B.mouth = amp('l03', t); B.ra = t > 13.6 ? [70, 150] : [14, 6]; B.la = t > 13.6 ? [70, 150] : [48, -44]; }
      const tap = t > 15.05 && t < 16.5;
      if (tap) { B.expr = 'wide'; B.tilt = -12; }
      if (t >= 16.4 && t < 20.3) {
        const up = t < 18.5;
        B.expr = up ? 'angry' : 'sad'; B.red = up ? .75 : .15; B.tilt = up ? -4 : 8;
        if (up) { const sh = Math.sin(t * 26) * 6; B.la = [140 + sh, 172]; B.ra = [140 - sh, 172]; B.dx = Math.sin(t * 40) * 3; } else { B.la = [18, 4]; B.ra = [18, 4]; B.look = -.6; B.tear = t > 19; }
        B.mouth = amp('l04', t);
      }
      if (t >= 20.3) { const u = eio(seg(t, 20.5, 21.3)); B.expr = u > .4 ? 'sleep' : 'wide'; B.tilt = lerp(-12, 16, u); B.la = [14, 6]; B.rot = -3 * u; }
    } else { // 3. sahne: akşam
      const wake = 25.55;
      // Ronî içeri yürür
      const w = seg(t, 23.6, 24.8);
      R.x = lerp(1230, RX, eio(w)); if (w < 1) { R.walk = t * 2.6; R.dy = -Math.abs(Math.sin(t * 2.6 * Math.PI * 2)) * 8; }
      R.expr = 'happy';
      if (t < wake) { B.expr = 'sleep'; B.tilt = 16; B.rot = -3; B.look = .6; }
      else if (t < 29) { B.expr = t < 27.6 ? 'wide' : 'angry'; B.dy += hop(wake, 60, .4); B.red = seg(t, 27.4, 29) * .7; B.la = [48, -44]; B.ra = [48, -44]; }
      if (during('l05', t, .1)) { R.mouth = amp('l05', t); R.ra = [150, 176 + Math.sin(t * 12) * 22]; R.dy += hop(27.6, 30); }
      if (t >= 29 && t < 33.1) { // l06
        B.expr = 'angry'; B.red = .85; B.mouth = amp('l06', t); B.dx = Math.sin(t * 44) * 4; B.ra = [86 + Math.sin(t * 18) * 5, 92 + Math.sin(t * 18) * 8]; B.la = [48, -44];
        R.expr = 'wide'; R.rot = 6; R.sweat = true; R.la = [30, 10]; R.ra = [30, 10];
      }
      if (t >= 33.1 && t < 37.7) { // l07
        B.expr = 'angry'; B.red = .6; B.la = [48, -44]; B.ra = [48, -44];
        const u = eio(seg(t, 35.3, 35.7));
        R.mouth = amp('l07', t); R.expr = u > .5 ? 'smug' : 'sad'; R.sweat = u < .5;
        R.la = mixA([20, 10], [62, 150], u); R.ra = mixA([20, 10], [62, 150], u); R.dy += -u * 6 + (u >= 1 ? Math.sin(t * 6) * 3 : 0);
      }
      if (t >= 37.7 && t < 39.7) { // l08
        B.expr = 'sad'; B.tear = true; B.red = .2; B.look = -.7; B.mouth = amp('l08', t); B.la = [78, 100]; B.ra = [20, 6]; B.tilt = -6;
        R.expr = 'smug'; R.la = [62, 150]; R.ra = [62, 150];
      }
      if (t >= 39.7 && t < 42.4) { // l09
        B.expr = 'sad'; B.red = .2; B.tear = t < 40.4;
        R.expr = 'happy'; R.mouth = amp('l09', t); const u = eio(seg(t, 40.5, 40.8)); R.ra = mixA([20, 10], [158, 178], u); R.dy += hop(40.6, 36);
      }
      if (t >= 42.4 && t < 47.7) { // l10
        const sigh = t < 44.3; const u = eio(seg(t, 44.3, 44.7));
        B.mouth = amp('l10', t); B.expr = sigh ? 'sleep' : 'normal';
        B.la = [14, 6]; B.ra = sigh ? mixA([20, 10], [116, 206], eio(seg(t, 42.5, 42.9))) : mixA([116, 206], [86, 94], u);
        B.tilt = sigh ? 10 : 0;
        R.expr = 'happy'; R.ra = [20, 10];
      }
      if (t >= 47.7 && t < 51.05) { // l11
        R.mouth = amp('l11', t); R.expr = 'normal'; R.tilt = -10; R.look = -.4; R.la = [112, 212]; R.ra = [30, 10];
        const g = seg(t, 48.4, 51); B.expr = g > .25 ? 'angry' : 'wide'; B.red = g * .9; B.dx = g > .4 ? Math.sin(t * 50) * 4 * g : 0; B.la = [48, -44]; B.ra = [48, -44];
      }
      if (t >= 51.05) { // l12 + terlik
        const hit = TL.hitAt;
        if (t < 52.4) {
          B.expr = 'angry'; B.red = 1; B.mouth = during('l12', t, .05) ? Math.max(.75, amp('l12', t)) : 0;
          const u = eout(seg(t, 51.48, 51.62)); B.ra = mixA([150, 172], [84, 88], u); B.la = [48, -44]; B.rot = lerp(-5, 6, u);
        } else { B.expr = 'smug'; B.la = [48, -44]; B.ra = [48, -44]; B.red = lerp(1, 0, seg(t, 52.4, 53)); }
        if (t < hit) { R.expr = 'wide'; R.la = [112, 212]; R.tilt = -6; }
        else { const d = t - hit; R.expr = 'dizzy'; R.rot = 14 * Math.exp(-d * 1.6) * Math.cos(d * 9) + 5; R.tilt = 10; R.la = [26, 8]; R.ra = [40, 14]; R.dx = 16 * (1 - Math.exp(-d * 6)); }
      }
    }
    return { B, R };
  }

  // ---------- İkonlar / balonlar ----------
  const ICON = {
    sun: `<circle r="20" fill="#FFB300" ${S} stroke-width="5"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = rad(i * 45); return `<path d="M${Math.cos(a) * 29} ${Math.sin(a) * 29}L${Math.cos(a) * 40} ${Math.sin(a) * 40}" ${S} stroke="#FFB300" stroke-width="7"/>`; }).join(''),
    moon: `<path d="M10 -32a32 32 0 1 0 22 44a26 26 0 0 1 -22 -44z" fill="#5C6BC0" ${S} stroke-width="5"/>`,
    ok: `<path d="M-22 2l16 18l30 -38" fill="none" stroke="#2EAD4B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`,
    no: `<path d="M-20 -20L20 20M20 -20L-20 20" fill="none" stroke="#E53935" stroke-width="13" stroke-linecap="round"/>`,
    q: `<text y="26" text-anchor="middle" font-size="76" font-weight="800" fill="#E53935">?</text>`,
    plate: `<ellipse cy="14" rx="46" ry="12" fill="#fff" ${S} stroke-width="5"/>`,
  };
  function iconArt(name) {
    const at = (x, y, sc, inner) => `<g transform="translate(${x} ${y}) scale(${sc})">${inner}</g>`;
    switch (name) {
      case 'clock8': return clockFace(0, 0, 44, 8, 6);
      case 'clock7': return clockFace(0, 0, 44, 7, 6);
      case 'breakfast': return at(0, 4, 1, ICON.plate + `<path d="M-34 10a20 16 0 0 1 40 0z" fill="#E8B15C" ${S} stroke-width="4"/><path d="M6 10l13 -26l18 26z" fill="#FFE27A" ${S} stroke-width="4"/><circle cx="-8" cy="-14" r="7" fill="#3d5a2a"/>`) + at(-40, -30, .7, ICON.sun);
      case 'dinner': return at(0, 4, 1, ICON.plate + `<path d="M-30 10a30 24 0 0 1 60 0z" fill="#D9531E" ${S} stroke-width="4"/><path d="M-8 -22q-8 -10 0 -20M10 -22q-8 -10 0 -20" fill="none" stroke="#999" stroke-width="5" stroke-linecap="round"/>`) + at(-42, -30, .55, ICON.moon);
      case 'emptyPlate': return at(0, -6, 1, ICON.plate + `<circle cx="-12" cy="12" r="3" fill="#C99E66"/><circle cx="10" cy="15" r="3" fill="#C99E66"/>`) + at(34, -26, .6, ICON.no);
      case 'ok': return at(-26, 0, .75, clockFace(0, 0, 44, 8, 6)) + at(34, 0, .8, ICON.ok);
      case 'sunOk': return at(-26, 0, .9, ICON.sun) + at(36, 2, .75, ICON.ok);
      case 'moonNo': return at(-28, 0, .9, ICON.moon) + at(36, 2, .7, ICON.no);
      case 'sunQ': return at(-26, 0, .9, ICON.sun) + at(36, 0, .8, ICON.q);
      case 'moonQ': return at(-28, 0, .9, ICON.moon) + at(36, 0, .8, ICON.q);
      case 'eq': return `<text y="24" text-anchor="middle" font-size="70" font-weight="800" fill="${INK}">8 = 8</text>`;
    }
    return '';
  }
  function bubbles(t) {
    let s = '';
    for (const b of TL.bubbles) {
      if (t < b.a || t > b.b) continue;
      const p = back(seg(t, b.a, b.a + .28)) * (1 - eio(seg(t, b.b - .18, b.b)));
      const base = b.who === 'B' ? BX : RX;
      const dir = b.who === 'B' ? -1 : 1;
      // iki balon varsa yan yana, tek balon varsa konuşanın üstünde
      const pair = TL.bubbles.some(o => o !== b && o.who === b.who && o.slot !== b.slot && Math.abs(o.b - b.b) < .01);
      let cx = pair ? base + (b.slot === 0 ? -92 : 92) + dir * 20 : base + dir * 10;
      cx = clamp(cx, 110, W - 110);
      const cy = 640 + Math.sin(t * 3 + b.slot) * 4;
      s += `<g transform="translate(${cx} ${cy}) scale(${p})">`;
      if (b.slot === 0) s += `<path d="M${(base - cx) * .5 - 16} 66L${(base - cx) * .7} 104L${(base - cx) * .5 + 18} 66Z" fill="#fff" ${S} stroke-width="6"/>`;
      s += `<rect x="-86" y="-88" width="172" height="160" rx="24" fill="#fff" ${S} stroke-width="7"/>`;
      if (b.slot === 0) s += `<path d="M${(base - cx) * .5 - 12} 68L${(base - cx) * .5 + 14} 68" stroke="#fff" stroke-width="9"/>`;
      s += `<g transform="translate(0 -26)">${iconArt(b.icon)}</g>`;
      s += `<text y="56" text-anchor="middle" font-size="${b.label.length > 9 ? 27 : 34}" font-weight="800" fill="${INK}">${b.label}</text>`;
      s += `</g>`;
    }
    return s;
  }

  // ---------- Efektler ----------
  function fx(t, P) {
    let s = '';
    // Zzz
    if ((t > 20.9 && t < 22.7) || (t >= 22.7 && t < 25.55)) {
      for (let i = 0; i < 3; i++) { const p = ((t * .55 + i / 3) % 1); s += `<text x="${BX + 70 + p * 70 + Math.sin(p * 8) * 8}" y="${760 - p * 130}" font-size="${34 + p * 40}" font-weight="800" fill="#5C6BC0" opacity="${1 - p}">Z</text>`; }
    }
    // uyanma ünlemi
    if (t > 25.55 && t < 26.5) { const p = back(seg(t, 25.55, 25.8)); s += `<text x="${BX + 80}" y="700" font-size="110" font-weight="800" fill="#E53935" stroke="${INK}" stroke-width="5" paint-order="stroke" transform="rotate(12 ${BX + 80} 700) translate(0 ${(1 - p) * 30})" opacity="${1 - seg(t, 26.2, 26.5)}">!</text>`; }
    // saate bakarken soru işareti
    if (t > 13.7 && t < 15.1) { const p = back(seg(t, 13.7, 13.95)); s += `<text x="${BX + 86}" y="712" font-size="${96 * p}" font-weight="800" fill="#2468D8" stroke="${INK}" stroke-width="5" paint-order="stroke" transform="rotate(10 ${BX + 86} 712)">?</text>`; }
    // terlik
    const hit = TL.hitAt, t0 = 51.5;
    const hx = BX + 55, hy = FLOOR - 470, tx = RX - 30, ty = FLOOR - 400;
    const slipper = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="46" ry="19" fill="#F06A9B" ${S} stroke-width="6"/><path d="M-6 -18q22 -14 38 6q-14 14 -38 12z" fill="#E0407B" ${S} stroke-width="5"/></g>`;
    if (t >= 51.15 && t < t0) s += slipper(hx - 20, hy - 6, -30);
    else if (t >= t0 && t < hit) { const u = seg(t, t0, hit); s += slipper(lerp(hx, tx, u), lerp(hy, ty, u) - Math.sin(u * Math.PI) * 70, -30 + u * 720); for (let i = 1; i < 4; i++) { const v = clamp(u - i * .06); s += `<circle cx="${lerp(hx, tx, v)}" cy="${lerp(hy, ty, v) - Math.sin(v * Math.PI) * 70}" r="${10 - i * 2}" fill="#fff" opacity=".7"/>`; } }
    else if (t >= hit) {
      const d = t - hit, fall = Math.max(0, d - .35);
      const sy = Math.min(FLOOR - 24, ty + 10 + fall * fall * 900), sx = tx + 30 + (P.R.dx || 0) - Math.min(60, fall * 80);
      s += slipper(sx, sy, sy >= FLOOR - 24 ? 0 : 80 + fall * 200);
      if (d < .4) { const p = eout(seg(d, 0, .22)); let st = ''; for (let i = 0; i < 10; i++) { const a = rad(i * 36), r = i % 2 ? 60 : 120; st += `${i ? 'L' : 'M'}${Math.cos(a) * r} ${Math.sin(a) * r}`; } s += `<g transform="translate(${tx} ${ty}) scale(${p * 1.1}) rotate(${d * 60})" opacity="${1 - seg(d, .25, .4)}"><path d="${st}Z" fill="#FFD23F" ${S} stroke-width="7"/><text y="20" text-anchor="middle" font-size="54" font-weight="800" fill="#E53935">ŞEQ!</text></g>`; }
      // dönen yıldızlar
      for (let i = 0; i < 3; i++) { const a = t * 5 + i * 2.094, x = RX + 16 + Math.cos(a) * 82, y = FLOOR - 494 + Math.sin(a) * 20; let st = ''; for (let k = 0; k < 10; k++) { const b = rad(k * 36 - 90), r = k % 2 ? 8 : 19; st += `${k ? 'L' : 'M'}${x + Math.cos(b) * r} ${y + Math.sin(b) * r}`; } s += `<path d="${st}Z" fill="#FFD23F" ${S} stroke-width="4" opacity="${Math.min(1, d * 4)}"/>`; }
    }
    // l11 soru işaretleri
    if (t > 48.0 && t < 51) { for (let i = 0; i < 2; i++) { const p = back(seg(t, 48.2 + i * .5, 48.5 + i * .5)); s += `<text x="${RX + 84 + i * 46}" y="${740 - i * 44 + Math.sin(t * 4 + i) * 6}" font-size="${(70 - i * 14) * p}" font-weight="800" fill="#2468D8" stroke="${INK}" stroke-width="4" paint-order="stroke">?</text>`; } }
    return s;
  }

  // ---------- HTML katmanları ----------
  const hl = s => s.replace(/\*(.+?)\*/g, '<b>$1</b>');
  function overlays(t) {
    let h = '';
    const pop = back(seg(t, .1, .7));
    h += `<div class="title" style="transform:rotate(-3deg) scale(${pop})">SAET HEŞT!</div>`;
    h += `<div class="tag" style="opacity:${seg(t, .6, 1)}"><span>Kurdî A1 · Saet çend e?</span></div>`;
    const card = TL.cards.find(c => t >= c.a && t < c.b);
    const end = t >= TL.endAt;
    if (!card && !end) {
      const L = TL.lines.find(l => t >= l.start - .08 && t < l.start + l.dur + .3);
      if (L) { const p = eout(seg(t, L.start - .08, L.start + .12)); h += `<div class="sub ${L.who}" style="transform:translateY(${(1 - p) * 24}px);opacity:${p}"><span class="who">${L.who === 'B' ? 'BERFÎN' : 'RONÎ'}</span><div class="ku">${hl(L.ku)}</div><div class="tr">${L.tr}</div></div>`; }
    }
    if (card) {
      const f = Math.min(seg(t, card.a, card.a + .25), 1 - seg(t, card.b - .25, card.b));
      h += `<div style="position:absolute;inset:0;background:#15131c;opacity:${f * .82}"></div>`;
      h += `<div class="card" style="opacity:${f};transform:rotate(-4deg) scale(${.6 + .4 * back(seg(t, card.a + .05, card.a + .4))})"><div><div class="ku">${card.ku}</div><div class="tr">${card.tr}</div></div></div>`;
    }
    if (end) {
      const f = eout(seg(t, TL.endAt, TL.endAt + .45));
      h += `<div style="position:absolute;inset:0;background:#15131c;opacity:${f * .7}"></div>`;
      let rows = '';
      TL.vocab.forEach(([k, v], i) => { const p = back(seg(t, TL.endAt + .5 + i * .4, TL.endAt + .78 + i * .4)); rows += `<div class="row" style="opacity:${Math.min(1, p * 1.5)};transform:translateX(${(1 - p) * -40}px)"><span class="k">${k}</span><span class="t">${v}</span></div>`; });
      h += `<div class="end" style="transform:translateY(${(1 - f) * 900}px)"><h2>Peyvên îro</h2><h3>Bugünün kelimeleri</h3>${rows}</div>`;
    }
    return h;
  }

  // ---------- Kare ----------
  window.renderAt = function (t) {
    const P = poses(t);
    let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
    s += room(t) + table(t);
    if (P.R.show) s += person(P.R, t);
    s += person(P.B, t);
    s += bubbles(t) + fx(t, P);
    s += `</svg>` + overlays(t);
    document.getElementById('stage').innerHTML = s;
  };

  // Tarayıcıda açılırsa önizleme olarak oynat (ses dosyalarıyla birlikte)
  if (!navigator.webdriver) {
    const st = document.getElementById('stage');
    const fit = () => { const k = Math.min(innerWidth / W, innerHeight / H); st.style.transform = `scale(${k})`; };
    fit(); addEventListener('resize', fit);
    const t0 = performance.now(), played = new Set();
    (function loop() {
      const t = ((performance.now() - t0) / 1000) % TL.dur;
      if (t < .1) played.clear();
      for (const l of TL.lines) if (t >= l.start && !played.has(l.id)) { played.add(l.id); new Audio(`audio/${l.id}.mp3`).play().catch(() => { }); }
      window.renderAt(t); requestAnimationFrame(loop);
    })();
  } else window.renderAt(0);
})();
