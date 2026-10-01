// =====================================================================
//  unites.js — Grandeurs physiques : lire « 0,15 A », « 150 mA »,
//  « 43,2 km/h », « 3×10^8 m/s »… et comparer avec conversions.
//
//  Utilisé par le mode de validation 'grandeur' du moteur (engine.js) :
//    { reponse: 0.15, unite: 'A', validation: 'grandeur', tolerance?, pieges? }
//  Toute unité de la même famille est acceptée après conversion
//  (150 mA = 0,15 A), une unité d'une autre famille est refusée.
// =====================================================================

/** Familles de grandeurs : nom utilisé dans les messages à l'élève. */
export const FAMILLES = {
  I: 'une intensité', U: 'une tension', R: 'une résistance', P: 'une puissance', E: 'une énergie',
  F: 'une force', M: 'une masse', L: 'une longueur', T: 'une durée', V: 'une vitesse',
  G: 'une intensité de pesanteur', RHO: 'une masse volumique', FREQ: 'une fréquence', VOL: 'un volume',
  TEMP: 'une température', CONC: 'une concentration',
};

/** Symbole → [famille, facteur vers l'unité de base de la famille]. */
const TABLE = {
  // intensité, tension, résistance
  A: ['I', 1], mA: ['I', 1e-3],
  V: ['U', 1], mV: ['U', 1e-3], kV: ['U', 1e3],
  'Ω': ['R', 1], 'kΩ': ['R', 1e3], 'MΩ': ['R', 1e6],
  // puissance, énergie
  W: ['P', 1], mW: ['P', 1e-3], kW: ['P', 1e3], MW: ['P', 1e6], GW: ['P', 1e9],
  J: ['E', 1], kJ: ['E', 1e3], MJ: ['E', 1e6], Wh: ['E', 3600], kWh: ['E', 3.6e6], MWh: ['E', 3.6e9],
  // force, masse
  N: ['F', 1], kN: ['F', 1e3],
  kg: ['M', 1], g: ['M', 1e-3], mg: ['M', 1e-6], t: ['M', 1e3],
  // longueur, durée
  m: ['L', 1], km: ['L', 1e3], dm: ['L', 0.1], cm: ['L', 1e-2], mm: ['L', 1e-3], 'µm': ['L', 1e-6], nm: ['L', 1e-9],
  al: ['L', 9.46e15], UA: ['L', 1.5e11],
  s: ['T', 1], ms: ['T', 1e-3], min: ['T', 60], h: ['T', 3600], an: ['T', 3.15e7], ans: ['T', 3.15e7],
  // vitesse, pesanteur
  'm/s': ['V', 1], 'km/h': ['V', 1 / 3.6], 'km/s': ['V', 1e3],
  'N/kg': ['G', 1],
  // masse volumique (base : kg/m³)
  'kg/m3': ['RHO', 1], 'g/cm3': ['RHO', 1e3], 'g/mL': ['RHO', 1e3], 'kg/L': ['RHO', 1e3], 'g/L': ['RHO', 1], 'kg/dm3': ['RHO', 1e3],
  // concentration massique (g/L d'un soluté) : même écriture que g/L, famille choisie par l'exercice
  // fréquence, volume, température
  Hz: ['FREQ', 1], kHz: ['FREQ', 1e3], MHz: ['FREQ', 1e6],
  m3: ['VOL', 1], dm3: ['VOL', 1e-3], cm3: ['VOL', 1e-6], mm3: ['VOL', 1e-9], L: ['VOL', 1e-3], dL: ['VOL', 1e-4], cL: ['VOL', 1e-5], mL: ['VOL', 1e-6],
  '°C': ['TEMP', 1],
};

/** Écritures équivalentes tapées par les élèves → symbole de la table. */
function normaliserUnite(u) {
  let s = String(u || '').trim();
  if (!s) return '';
  s = s.replace(/\s+/g, '')
    .replace(/³/g, '3').replace(/²/g, '2').replace(/⁻/g, '-').replace(/¹/g, '1')
    .replace(/[·.*×]/g, '.')
    .replace(/^ohms?$/i, 'Ω').replace(/^kilo-?ohms?$/i, 'kΩ').replace(/^k-?ohms?$/i, 'kΩ').replace(/Ω|ω|Ω/g, 'Ω')
    .replace(/^um$/, 'µm').replace(/^μm$/, 'µm')
    .replace(/^(?:a\.l\.|années?-?lumières?)$/i, 'al')
    .replace(/^°c$/i, '°C')
    .replace(/^degrés?$/i, '°C')
    .replace(/^ampères?$/i, 'A').replace(/^volts?$/i, 'V').replace(/^watts?$/i, 'W').replace(/^joules?$/i, 'J')
    .replace(/^newtons?$/i, 'N').replace(/^hertz$/i, 'Hz').replace(/^secondes?$/i, 's').replace(/^mètres?$/i, 'm')
    .replace(/^kilogrammes?$/i, 'kg').replace(/^grammes?$/i, 'g').replace(/^heures?$/i, 'h').replace(/^minutes?$/i, 'min')
    .replace(/^litres?$/i, 'L').replace(/^l$/, 'L').replace(/^ml$/, 'mL').replace(/^cl$/, 'cL').replace(/^dl$/, 'dL')
    .replace(/^kwh$/i, 'kWh').replace(/^wh$/i, 'Wh').replace(/^hz$/i, 'Hz').replace(/^khz$/i, 'kHz');
  // « m.s-1 », « m.s^-1 », « km.h-1 », « kg.m-3 », « g.cm-3 », « N.kg-1 » → écriture avec « / »
  s = s.replace(/^([a-zA-Zµ]+)\.?([a-zA-Z]+)\^?-(\d)$/, (x, a, b, n) => `${a}/${b}${n === '1' ? '' : n}`);
  s = s.replace(/^(k?g)\/(c?m|dm|m)\^?(3)$/, '$1/$2$3').replace(/^([a-zA-Z]+)\/([a-zA-Z]+)\^(\d)$/, '$1/$2$3');
  if (/^g\/ml$/i.test(s)) s = 'g/mL';
  if (/^kg\/l$/i.test(s)) s = 'kg/L';
  if (/^g\/l$/i.test(s)) s = 'g/L';
  if (/^n\/kg$/i.test(s)) s = 'N/kg';
  if (/^km\/h$/i.test(s)) s = 'km/h';
  return s;
}

/** Infos d'une unité (après normalisation), ou null si inconnue. */
export function unite(sym) {
  const s = normaliserUnite(sym);
  const e = TABLE[s];
  return e ? { symbole: s, famille: e[0], facteur: e[1] } : null;
}

/** Lit un nombre écrit par un élève : « 0,15 », « 3,2×10^8 », « 3.2e8 », « 1 500 ». */
function lireNombre(txt) {
  const t = txt.replace(/\s+/g, '').replace(/,/g, '.').replace(/−/g, '-');
  const m = t.match(/^([-+]?\d*\.?\d+)(?:[x×*.]10\^?([-+]?\d+)|e([-+]?\d+))?$/i);
  if (!m) return NaN;
  const exp = m[2] ?? m[3];
  return parseFloat(m[1]) * (exp != null ? Math.pow(10, parseInt(exp, 10)) : 1);
}

/**
 * Découpe une saisie en valeur + unité.
 * « I = 0,15 A » → { valeur: 0.15, texteUnite: 'A', unite: {…} }.
 */
export function lireGrandeur(saisie) {
  let s = String(saisie ?? '').trim().replace(/^[A-Za-zΔρ]{1,3}\s*=\s*/, '');
  // partie numérique : chiffres, espaces de milliers, virgule, puissance de 10 éventuelle
  const m = s.match(/^([-+−]?\s*[\d\s]*[.,]?\d+(?:\s*[x×*·]\s*10\s*\^?\s*[-+−]?\d+|e[-+]?\d+)?)\s*(.*)$/i);
  if (!m) return { valeur: NaN, texteUnite: '', unite: null };
  const valeur = lireNombre(m[1]);
  const texteUnite = m[2].trim();
  return { valeur, texteUnite, unite: texteUnite ? unite(texteUnite) : null };
}

const proche = (a, b, tol) => (tol != null ? Math.abs(a - b) <= tol + 1e-9 : Math.abs(a - b) <= 1e-6 * (1 + Math.abs(b)));

/**
 * Compare une saisie à la grandeur attendue.
 * @returns {{ ok: boolean, message?: string }}
 */
export function comparerGrandeur(saisie, data) {
  const attendu = unite(data.unite);
  if (!attendu) return { ok: false, message: `Unité de référence inconnue (${data.unite}).` };
  const g = lireGrandeur(saisie);
  if (!Number.isFinite(g.valeur)) return { ok: false, message: `Écris une valeur suivie de son unité, par exemple « ${exemple(data)} ».` };
  // Valeur saisie ramenée dans l'unité attendue (si l'élève a donné une unité compatible)
  const tol = data.tolerance;
  if (!g.texteUnite) {
    if (data.uniteFacultative) return { ok: proche(g.valeur, data.reponse, tol) };
    if (proche(g.valeur, data.reponse, tol)) return { ok: false, message: `Le nombre est juste, mais il manque l'unité : ${data.reponse.toString().replace('.', ',')} quoi ?` };
    const piege = (data.pieges || []).find((p) => proche(g.valeur, p.valeur, tol));
    if (piege) return { ok: false, message: piege.message };
    return { ok: false, message: `N'oublie pas l'unité (${attendu.symbole}), et vérifie ton calcul.` };
  }
  if (!g.unite) return { ok: false, message: `Unité « ${g.texteUnite} » non reconnue. Écris par exemple « ${exemple(data)} ».` };
  if (g.unite.famille !== attendu.famille) return { ok: false, message: `« ${g.unite.symbole} » ne convient pas : on attend ${FAMILLES[attendu.famille]}, en ${attendu.symbole}.` };
  // Exercice de conversion : la réponse doit être donnée dans l'unité demandée.
  if (data.uniteImposee && g.unite.symbole !== attendu.symbole) return { ok: false, message: `Donne le résultat en ${attendu.symbole}.` };
  const converti = (g.valeur * g.unite.facteur) / attendu.facteur;
  // La tolérance est exprimée dans l'unité attendue.
  if (proche(converti, data.reponse, tol)) return { ok: true };
  if (g.unite.symbole !== attendu.symbole && proche(g.valeur, data.reponse, tol)) {
    return { ok: false, message: `Le nombre correspond à des ${attendu.symbole}, pas à des ${g.unite.symbole} : attention à la conversion.` };
  }
  const piege = (data.pieges || []).find((p) => proche(converti, p.valeur, tol));
  if (piege) return { ok: false, message: piege.message };
  // Bon nombre, mauvaise unité de la même famille (150 A au lieu de 150 mA)
  const autre = Object.entries(TABLE).find(([sym, [fam, f]]) => fam === attendu.famille && sym !== g.unite.symbole && proche((g.valeur * f) / attendu.facteur, data.reponse, tol));
  if (autre) return { ok: false, message: `Presque : avec ce nombre, l'unité serait « ${autre[0]} ». Vérifie ta conversion.` };
  return { ok: false };
}

function exemple(data) {
  const e = { I: '0,5 A', U: '4,5 V', R: '220 Ω', P: '60 W', E: '1,2 kWh', F: '12 N', M: '2,5 kg', L: '3,5 m', T: '12 s', V: '25 m/s', G: '9,8 N/kg', RHO: '1,2 g/cm3', FREQ: '440 Hz', VOL: '25 mL', TEMP: '20 °C' };
  const u = unite(data.unite);
  return (u && e[u.famille]) || `2 ${data.unite}`;
}
