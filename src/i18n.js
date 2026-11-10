// English / Türkçe / Kurdî (Kurmancî)
const S = {
  en: {
    storeLive: 'Purchases are processed by Google Play.', storeOff: 'The store is not available right now.', purchaseFailed: 'The purchase could not be completed',
    mr: 'Magic resist', pingHelp: 'Allies are on their way!', ping: 'Call for help',
    ace: 'Team wiped out!', shutdown: 'Shut down!', emberBuff: 'Ember Brand: your attacks burn and slow', tideBuff: 'Tide Crest: mana and cooldowns restored faster', ward: 'Watchstone', ward_d: 'Plant a hidden watchstone that reveals the area for 90s.', mvp: 'MVP', dmgCol: 'Damage', vs: 'VS',
    talent: 'Talisman', tal_fury: 'Fury', tal_fury_d: '+8% attack', tal_guard: 'Guard', tal_guard_d: '+10% health', tal_haste: 'Haste', tal_haste_d: '+8% cooldown reduction, +0.3 speed', tal_leech: 'Leech', tal_leech_d: '+6% lifesteal',
    difficulty: 'Opponents', easy: 'Easy', normal: 'Normal', hard: 'Hard', rankPts: 'rank points', rank0: 'Stone', rank1: 'Iron', rank2: 'Silver', rank3: 'Gold', rank4: 'Diamond', rank5: 'Star',
    passive: 'Passive', p_third: 'Every third basic attack deals 60% more damage.', p_execute: 'Deals 25% more damage to enemies below 35% health.', p_regen: 'Out of combat for 5s: regenerates 2% max health per second.', p_spellheal: 'Heals for 12% of ability damage dealt.', p_healboost: 'Healing abilities are 25% stronger.', crit: 'crit', builds: 'Builds from', rotate: 'Turn your phone sideways for the best view',
    multi2: 'Double kill!', multi3: 'Triple kill!', multi4: 'Quadra kill!', multi5: 'Unstoppable!', spiritDown: 'The River Spirit yields — your team grows stronger for good!', spiritDownEnemy: 'The enemy claimed the River Spirit!',
    sp_blink: 'Starstep', sp_blink_d: 'Teleport a short distance.', sp_mend: 'Mend', sp_mend_d: 'Heal yourself and nearby allies.', board: 'Scoreboard', assists: 'Assists', rank: 'Rank', skillPoint: 'Skill point ready — tap + on an ability',
    tagline: 'Three lanes. One star. Yours to defend.',
    play: 'Battle', heroes: 'Heroes', store: 'Store', settings: 'Settings',
    start: 'Enter the arena', level: 'Level', lv: 'Lv',
    select: 'Select', selected: 'Selected', unlock: 'Unlock', owned: 'Owned', buy: 'Buy', equip: 'Equip', equipped: 'Equipped',
    notEnough: 'Not enough', coins: 'Gold', gems: 'Gems',
    language: 'Language', quality: 'Graphics', high: 'High', low: 'Low', sound: 'Sound', on: 'On', off: 'Off',
    resetData: 'Reset progress', resetDone: 'Progress reset',
    fighter: 'Fighter', mage: 'Mage', marksman: 'Marksman', tank: 'Tank', support: 'Support', assassin: 'Assassin',
    hp: 'Health', atk: 'Attack', def: 'Armor', spd: 'Speed', rangeS: 'Range',
    skins: 'Skins', gemPacks: 'Gem packs', skin_default: 'Classic', skin_crimson: 'Crimson', skin_frost: 'Frost', skin_azure: 'Azure', skin_jade: 'Jade', skin_dusk: 'Dusk', skin_gold: 'Golden', skin_obsidian: 'Obsidian', skin_rose: 'Rose',
    demoTitle: 'Demo purchase', demoBody: 'This is a demo store. No payment is taken. Add {n} gems for {p}?', demoBadge: 'DEMO', bonus: 'bonus',
    confirm: 'Confirm', cancel: 'Cancel', purchased: 'Added {n} gems', unlocked: 'Unlocked!',
    victory: 'Victory', defeat: 'Defeat', rewards: 'Rewards', continue: 'Continue', kills: 'Kills', deaths: 'Deaths', minions: 'Minions', xp: 'XP',
    levelUp: 'Level up!', accountLevelUp: 'Account level {n}',
    shop: 'Shop', shopHint: 'Items can be bought at your base or while defeated.', recall: 'Recall', recalling: 'Recalling…',
    respawn: 'Respawning in {n}', full: 'Inventory full',
    youSlain: 'You were slain', slew: '{a} defeated {b}', towerDown: 'A tower has fallen!', allyTowerDown: 'Your tower has fallen!',
    bossDown: 'The Ancient is slain — your team is empowered!', bossDownEnemy: 'The enemy slew the Ancient!',
    waveSpawn: 'Soldiers have marched out!', welcome: 'Destroy the enemy Star Core!',
    firstBlood: 'First blood!', coreExposed: 'The enemy core is exposed!', coreDanger: 'Your core is under attack!',
    d_proj: 'Fires a bolt in a line dealing {d} damage{x}.', d_projP: 'Fires a piercing bolt dealing {d} damage to all enemies hit{x}.',
    d_aoe: 'Strikes an area for {d} damage{x}.', d_aoeSelf: 'Strikes around you for {d} damage{x}.',
    d_dash: 'Dash forward and deal {d} damage on arrival{x}.', d_dashNo: 'Quickly reposition in the chosen direction.',
    d_blink: 'Teleport instantly, dealing {d} damage on arrival{x}.', d_blinkNo: 'Teleport instantly a short distance.',
    d_buff: 'Empower yourself for {t}s:{b}.', d_buffTeam: 'Empower nearby allies for {t}s:{b}.',
    d_heal: 'Heal nearby allies for {h}{s}.',
    x_slow: ' and slowing by {n}%', x_stun: ' and stunning for {n}s', b_shield: ' {n} shield', b_spd: ' +{n}% speed', b_as: ' +{n}% attack speed', b_atk: ' +{n} attack', b_def: ' +{n} armor', s_shield: ' and grant a {n} shield',
    cd: 'Cooldown', mana: 'Mana', unlockAt: 'Unlocks at level {n}',
    tipDesktop: 'Right-click: move / attack · Q W E R: abilities (Shift+key: rank up) · D F: spells · 4: watchstone · G: call for help · B: recall · P: shop · Tab: scoreboard · hold the minimap to look around',
    tipTouch: 'Left thumb moves · tap abilities to cast at the nearest enemy',
    pause: 'Paused', resume: 'Resume', surrender: 'Leave match', menu: 'Menu',
    loading: 'Raising the arena…', storeNote: 'All purchases here are simulated for the demo. Real billing will be wired in the Android release.',
    free: 'Free', ally: 'Ally', enemy: 'Enemy', attack: 'Attack',
  },
  tr: {
    storeLive: 'Satın almalar Google Play üzerinden yapılır.', storeOff: 'Mağaza şu an kullanılamıyor.', purchaseFailed: 'Satın alma tamamlanamadı',
    mr: 'Büyü direnci', pingHelp: 'Takım arkadaşların geliyor!', ping: 'Yardım çağır',
    ace: 'Takım silindi!', shutdown: 'Seri bozuldu!', emberBuff: 'Kor Damgası: saldırıların yakar ve yavaşlatır', tideBuff: 'Dalga Arması: mana ve beklemeler hızlı dolar', ward: 'Gözcü Taşı', ward_d: 'Bölgeyi 90 sn gösteren gizli bir gözcü taşı dik.', mvp: 'MVP', dmgCol: 'Hasar', vs: 'VS',
    talent: 'Tılsım', tal_fury: 'Öfke', tal_fury_d: '+%8 saldırı', tal_guard: 'Muhafız', tal_guard_d: '+%10 can', tal_haste: 'Çeviklik', tal_haste_d: '+%8 bekleme azaltma, +0.3 hız', tal_leech: 'Sülük', tal_leech_d: '+%6 can çalma',
    difficulty: 'Rakipler', easy: 'Kolay', normal: 'Normal', hard: 'Zor', rankPts: 'sıralama puanı', rank0: 'Taş', rank1: 'Demir', rank2: 'Gümüş', rank3: 'Altın', rank4: 'Elmas', rank5: 'Yıldız',
    passive: 'Pasif', p_third: 'Her üçüncü temel saldırı %60 fazla hasar verir.', p_execute: 'Canı %35 altındaki düşmanlara %25 fazla hasar verir.', p_regen: '5 sn savaş dışında: saniyede azami canın %2\'sini yeniler.', p_spellheal: 'Verdiği yetenek hasarının %12\'si kadar iyileşir.', p_healboost: 'İyileştirme yetenekleri %25 daha güçlüdür.', crit: 'kritik', builds: 'Bileşenler', rotate: 'En iyi görünüm için telefonu yan çevir',
    multi2: 'Çifte öldürme!', multi3: 'Üçlü öldürme!', multi4: 'Dörtlü öldürme!', multi5: 'Durdurulamıyor!', spiritDown: 'Nehir Ruhu boyun eğdi — takımın kalıcı olarak güçlendi!', spiritDownEnemy: 'Düşman Nehir Ruhunu aldı!',
    sp_blink: 'Yıldız Adımı', sp_blink_d: 'Kısa mesafeye ışınlan.', sp_mend: 'Onar', sp_mend_d: 'Kendini ve yakındaki dostları iyileştir.', board: 'Skor tablosu', assists: 'Asist', rank: 'Kademe', skillPoint: 'Yetenek puanın var — bir yeteneğin + düğmesine dokun',
    tagline: 'Üç koridor. Tek yıldız. Savunması sende.',
    play: 'Savaş', heroes: 'Kahramanlar', store: 'Mağaza', settings: 'Ayarlar',
    start: 'Arenaya gir', level: 'Seviye', lv: 'Sv',
    select: 'Seç', selected: 'Seçili', unlock: 'Kilidi aç', owned: 'Sahipsin', buy: 'Satın al', equip: 'Kuşan', equipped: 'Kuşanıldı',
    notEnough: 'Yetersiz', coins: 'Altın', gems: 'Elmas',
    language: 'Dil', quality: 'Grafik', high: 'Yüksek', low: 'Düşük', sound: 'Ses', on: 'Açık', off: 'Kapalı',
    resetData: 'İlerlemeyi sıfırla', resetDone: 'İlerleme sıfırlandı',
    fighter: 'Savaşçı', mage: 'Büyücü', marksman: 'Nişancı', tank: 'Tank', support: 'Destek', assassin: 'Suikastçı',
    hp: 'Can', atk: 'Saldırı', def: 'Zırh', spd: 'Hız', rangeS: 'Menzil',
    skins: 'Kostümler', gemPacks: 'Elmas paketleri', skin_default: 'Klasik', skin_crimson: 'Kızıl', skin_frost: 'Ayaz', skin_azure: 'Gök mavisi', skin_jade: 'Yeşim', skin_dusk: 'Alacakaranlık', skin_gold: 'Altın', skin_obsidian: 'Obsidyen', skin_rose: 'Gül',
    demoTitle: 'Demo satın alma', demoBody: 'Bu bir demo mağazadır. Ödeme alınmaz. {p} karşılığı {n} elmas eklensin mi?', demoBadge: 'DEMO', bonus: 'bonus',
    confirm: 'Onayla', cancel: 'Vazgeç', purchased: '{n} elmas eklendi', unlocked: 'Kilit açıldı!',
    victory: 'Zafer', defeat: 'Yenilgi', rewards: 'Ödüller', continue: 'Devam', kills: 'Öldürme', deaths: 'Ölüm', minions: 'Asker', xp: 'TP',
    levelUp: 'Seviye atladın!', accountLevelUp: 'Hesap seviyesi {n}',
    shop: 'Dükkân', shopHint: 'Eşyalar üssünde ya da yenilmişken alınabilir.', recall: 'Üsse dön', recalling: 'Üsse dönülüyor…',
    respawn: '{n} sn sonra canlanacaksın', full: 'Envanter dolu',
    youSlain: 'Yenildin', slew: '{a}, {b} adlı kahramanı yendi', towerDown: 'Bir kule yıkıldı!', allyTowerDown: 'Kulen yıkıldı!',
    bossDown: 'Kadim yenildi — takımın güçlendi!', bossDownEnemy: 'Düşman Kadim\'i yendi!',
    waveSpawn: 'Askerler yola çıktı!', welcome: 'Düşman Yıldız Çekirdeğini yok et!',
    firstBlood: 'İlk kan!', coreExposed: 'Düşman çekirdeği savunmasız!', coreDanger: 'Çekirdeğin saldırı altında!',
    d_proj: 'Düz bir hatta {d} hasar veren bir mermi fırlatır{x}.', d_projP: 'Önündeki tüm düşmanları delip {d} hasar veren bir mermi fırlatır{x}.',
    d_aoe: 'Seçilen alana {d} hasar verir{x}.', d_aoeSelf: 'Çevrendeki düşmanlara {d} hasar verir{x}.',
    d_dash: 'İleri atılır ve vardığı yerde {d} hasar verir{x}.', d_dashNo: 'Seçilen yöne hızla yer değiştirir.',
    d_blink: 'Anında ışınlanır ve vardığı yerde {d} hasar verir{x}.', d_blinkNo: 'Kısa mesafeye anında ışınlanır.',
    d_buff: '{t} sn boyunca güçlenirsin:{b}.', d_buffTeam: 'Yakındaki dostları {t} sn güçlendirir:{b}.',
    d_heal: 'Yakındaki dostları {h} iyileştirir{s}.',
    x_slow: ', %{n} yavaşlatır', x_stun: ', {n} sn sersemletir', b_shield: ' {n} kalkan', b_spd: ' +%{n} hız', b_as: ' +%{n} saldırı hızı', b_atk: ' +{n} saldırı', b_def: ' +{n} zırh', s_shield: ' ve {n} kalkan verir',
    cd: 'Bekleme', mana: 'Mana', unlockAt: '{n}. seviyede açılır',
    tipDesktop: 'Sağ tık: yürü / saldır · Q W E R: yetenekler (Shift+tuş: kademe artır) · D F: büyüler · 4: gözcü taşı · G: yardım çağır · B: üsse dön · P: dükkân · Tab: skor tablosu · etrafa bakmak için haritaya basılı tut',
    tipTouch: 'Sol başparmak yürütür · yeteneğe dokun, en yakın düşmana atılır',
    pause: 'Duraklatıldı', resume: 'Devam et', surrender: 'Maçtan çık', menu: 'Menü',
    loading: 'Arena kuruluyor…', storeNote: 'Buradaki tüm satın almalar demo amaçlı simüle edilir. Gerçek ödeme Android sürümünde bağlanacak.',
    free: 'Ücretsiz', ally: 'Dost', enemy: 'Düşman', attack: 'Saldır',
  },
  ku: {
    storeLive: 'Kirîn bi rêya Google Play tên kirin.', storeOff: 'Dikan niha nayê bikaranîn.', purchaseFailed: 'Kirîn temam nebû',
    mr: 'Berxwedana efsûnê', pingHelp: 'Hevalên te tên!', ping: 'Alîkarî bixwaze',
    ace: 'Tîm hat tunekirin!', shutdown: 'Rêz hat şikandin!', emberBuff: 'Nîşana Pêtê: êrîşên te dişewitînin û hêdî dikin', tideBuff: 'Nîşana Pêlê: mana û bendewarî zûtir tije dibin', ward: 'Kevirê Nobedar', ward_d: 'Kevirekî nobedar ê veşartî deyne ku 90 çirke herêmê nîşan dide.', mvp: 'MVP', dmgCol: 'Ziyan', vs: 'VS',
    talent: 'Nivişt', tal_fury: 'Hêrs', tal_fury_d: '+%8 êrîş', tal_guard: 'Parêzvan', tal_guard_d: '+%10 can', tal_haste: 'Lezgînî', tal_haste_d: '+%8 kêmkirina bendewariyê, +0.3 lez', tal_leech: 'Zûrî', tal_leech_d: '+%6 candizî',
    difficulty: 'Hevrik', easy: 'Hêsan', normal: 'Normal', hard: 'Dijwar', rankPts: 'xalên rêzê', rank0: 'Kevir', rank1: 'Hesin', rank2: 'Zîv', rank3: 'Zêr', rank4: 'Elmas', rank5: 'Stêrk',
    passive: 'Pasîf', p_third: 'Her êrîşa sêyemîn %60 zêdetir ziyan dide.', p_execute: 'Li dijminên ku cana wan di bin %35 de ye %25 zêdetir ziyan dide.', p_regen: '5 çirke li derveyî şer: her çirke %2 ê cana herî zêde nû dike.', p_spellheal: 'Bi qasî %12 ê ziyana şiyanan xwe derman dike.', p_healboost: 'Şiyanên dermankirinê %25 bihêztir in.', crit: 'krîtîk', builds: 'Pêkhate', rotate: 'Ji bo dîtina herî baş telefonê bizivirîne',
    multi2: 'Kuştina cot!', multi3: 'Kuştina sêcar!', multi4: 'Kuştina çarcar!', multi5: 'Nayê rawestandin!', spiritDown: 'Ruhê Çem serî danî — tîma te her û her bi hêz bû!', spiritDownEnemy: 'Dijmin Ruhê Çem bi dest xist!',
    sp_blink: 'Gava Stêrkê', sp_blink_d: 'Mesafeyeke kurt biguheze.', sp_mend: 'Derman', sp_mend_d: 'Xwe û hevalên nêzîk derman bike.', board: 'Tabloya encaman', assists: 'Alîkarî', rank: 'Pile', skillPoint: 'Xala şiyanê heye — li + ya şiyanekê bixe',
    tagline: 'Sê rê. Yek stêrk. Parastina wê li ser te ye.',
    play: 'Şer', heroes: 'Leheng', store: 'Dikan', settings: 'Mîheng',
    start: 'Bikeve qadê', level: 'Ast', lv: 'Ast',
    select: 'Hilbijêre', selected: 'Hilbijartî', unlock: 'Veke', owned: 'Ya te ye', buy: 'Bikire', equip: 'Li xwe bike', equipped: 'Li xwe kirî',
    notEnough: 'Têr nake', coins: 'Zêr', gems: 'Elmas',
    language: 'Ziman', quality: 'Grafîk', high: 'Bilind', low: 'Nizm', sound: 'Deng', on: 'Vekirî', off: 'Girtî',
    resetData: 'Pêşketinê sifir bike', resetDone: 'Pêşketin hat sifirkirin',
    fighter: 'Şervan', mage: 'Sêrbaz', marksman: 'Tîrvan', tank: 'Tank', support: 'Piştgir', assassin: 'Kujer',
    hp: 'Can', atk: 'Êrîş', def: 'Zirx', spd: 'Lez', rangeS: 'Mesafe',
    skins: 'Cil', gemPacks: 'Paketên elmasê', skin_default: 'Klasîk', skin_crimson: 'Sor', skin_frost: 'Qeşa', skin_azure: 'Şînê esmanî', skin_jade: 'Kesk', skin_dusk: 'Êvar', skin_gold: 'Zêrîn', skin_obsidian: 'Obsîdyen', skin_rose: 'Gul',
    demoTitle: 'Kirîna demo', demoBody: 'Ev dikaneke demo ye. Tu pere nayê standin. Bi {p} {n} elmas lê zêde bibin?', demoBadge: 'DEMO', bonus: 'zêde',
    confirm: 'Erê', cancel: 'Betal', purchased: '{n} elmas hatin zêdekirin', unlocked: 'Vebû!',
    victory: 'Serkeftin', defeat: 'Têkçûn', rewards: 'Xelat', continue: 'Bidomîne', kills: 'Kuştin', deaths: 'Mirin', minions: 'Leşker', xp: 'XP',
    levelUp: 'Asta te bilind bû!', accountLevelUp: 'Asta hesabê {n}',
    shop: 'Dikan', shopHint: 'Tişt li bingeha te an dema ku tu têk çûyî têne kirîn.', recall: 'Vegere bingehê', recalling: 'Vedigere bingehê…',
    respawn: 'Piştî {n} çirkeyan vedijî', full: 'Tûrik tije ye',
    youSlain: 'Tu hatî têkbirin', slew: '{a} {b} têk bir', towerDown: 'Bircek hilweşiya!', allyTowerDown: 'Birca te hilweşiya!',
    bossDown: 'Yê Kevnar hat kuştin — tîma te bi hêz bû!', bossDownEnemy: 'Dijmin Yê Kevnar kuşt!',
    waveSpawn: 'Leşker bi rê ketin!', welcome: 'Dilê Stêrkê yê dijmin hilweşîne!',
    firstBlood: 'Xwîna yekem!', coreExposed: 'Dilê dijmin bêparastin ma!', coreDanger: 'Dilê te di bin êrîşê de ye!',
    d_proj: 'Tîrekê di xeteke rast de diavêje û {d} ziyan dide{x}.', d_projP: 'Tîreke qulker diavêje, {d} ziyan dide hemû dijminên li ser rê{x}.',
    d_aoe: 'Li qada hilbijartî {d} ziyan dide{x}.', d_aoeSelf: 'Li dora te {d} ziyan dide dijminan{x}.',
    d_dash: 'Ber bi pêş ve dibeze û li cihê gihîştinê {d} ziyan dide{x}.', d_dashNo: 'Bi lez ber bi aliyê hilbijartî ve diçe.',
    d_blink: 'Di cih de diguheze û li wir {d} ziyan dide{x}.', d_blinkNo: 'Di cih de mesafeyeke kurt diguheze.',
    d_buff: 'Ji bo {t} çirkeyan bi hêz dibî:{b}.', d_buffTeam: 'Hevalên nêzîk ji bo {t} çirkeyan bi hêz dike:{b}.',
    d_heal: 'Hevalên nêzîk {h} derman dike{s}.',
    x_slow: ' û %{n} hêdî dike', x_stun: ' û {n} çirke gêj dike', b_shield: ' {n} mertal', b_spd: ' +%{n} lez', b_as: ' +%{n} leza êrîşê', b_atk: ' +{n} êrîş', b_def: ' +{n} zirx', s_shield: ' û {n} mertal dide',
    cd: 'Bendewarî', mana: 'Mana', unlockAt: 'Di asta {n} de vedibe',
    tipDesktop: 'Tikandina rastê: here / êrîş bike · Q W E R: şiyan (Shift+bişkok: pile zêde bike) · D F: efsûn · 4: kevirê nobedar · G: alîkarî bixwaze · B: vegere bingehê · P: dikan · Tab: tabloya encaman · ji bo nêrînê nexşeyê bigire',
    tipTouch: 'Tiliya çepê dimeşîne · li şiyanê bixe, ber bi dijminê herî nêzîk ve tê avêtin',
    pause: 'Hat rawestandin', resume: 'Bidomîne', surrender: 'Ji şer derkeve', menu: 'Menû',
    loading: 'Qad tê avakirin…', storeNote: 'Hemû kirînên li vir ji bo demoyê tên teqlîdkirin. Dayîna rastîn di guhertoya Androidê de tê girêdan.',
    free: 'Belaş', ally: 'Heval', enemy: 'Dijmin', attack: 'Êrîş',
  },
};

export const LANGS = [['ku', 'Kurdî'], ['tr', 'Türkçe'], ['en', 'English']];
let cur = 'tr';
export function setLang(l) { if (S[l]) cur = l; }
export function getLang() { return cur; }
export function t(key, vars) {
  let s = S[cur][key] ?? S.en[key] ?? key;
  if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
  return s;
}
export function loc(obj) { return obj[cur] ?? obj.en; }

// Build an ability description from its data
export function abilDesc(a, lvl = 1, atk = 0) {
  const d = a.dmg ? Math.round(a.dmg[0] + a.dmg[1] * lvl + a.dmg[2] * atk) : 0;
  let x = '';
  if (a.slow) x += t('x_slow', { n: Math.round(a.slow * 100) });
  if (a.stun) x += t('x_stun', { n: a.stun });
  if (a.type === 'proj') return t(a.pierce ? 'd_projP' : 'd_proj', { d, x });
  if (a.type === 'aoe') return t(a.range ? 'd_aoe' : 'd_aoeSelf', { d, x });
  if (a.type === 'dash') {
    if (a.blink) return d ? t('d_blink', { d, x }) : t('d_blinkNo');
    return d ? t('d_dash', { d, x }) : t('d_dashNo');
  }
  if (a.type === 'buff') {
    const b = [];
    if (a.shield) b.push(t('b_shield', { n: Math.round(a.shield[0] + a.shield[1] * lvl) }));
    if (a.spd) b.push(t('b_spd', { n: Math.round((a.spd - 1) * 100) }));
    if (a.as) b.push(t('b_as', { n: Math.round((a.as - 1) * 100) }));
    if (a.atk) b.push(t('b_atk', { n: a.atk }));
    if (a.def) b.push(t('b_def', { n: a.def }));
    return t(a.team ? 'd_buffTeam' : 'd_buff', { t: a.dur, b: b.join(',') });
  }
  if (a.type === 'heal') {
    const h = Math.round(a.heal[0] + a.heal[1] * lvl);
    const s = a.shield ? t('s_shield', { n: Math.round(a.shield[0] + a.shield[1] * lvl) }) : '';
    return t('d_heal', { h, s });
  }
  return '';
}
