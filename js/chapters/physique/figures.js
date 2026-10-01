// =====================================================================
//  figures.js — Figures animées et manipulables de physique-chimie
//
//  Chaque figure est une fonction (host, options) qui dessine dans `host`
//  (bloc de cours `{ type: 'figure', render }` ou visuel d'exercice).
//  Règles :
//   - l'animation explique un phénomène (électrons, gouttes, ondes…) ;
//   - boucle `animer` : démarre quand la figure est dans la page, s'arrête
//     quand elle la quitte, une seule image si « mouvement réduit » ;
//   - bouton lecture/pause sur chaque animation continue ;
//   - SVG en chaînes + setAttribute : fonctionne aussi dans le banc de test.
// =====================================================================

import { tex, arrondi } from '../commun.js';

// ------------------------------------------------------------ Outils

const mouvementReduit = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Boucle d'animation liée à une figure. `etape(dt, t)` reçoit le temps écoulé
 * (en secondes). Renvoie l'état { joue } que le bouton lecture/pause modifie.
 */
export function animer(host, etape) {
  const etat = { joue: !mouvementReduit(), t: 0 };
  etape(0, 0); // première image (aussi en mouvement réduit)
  if (typeof requestAnimationFrame !== 'function') return etat;
  let t0 = null, attente = 0, vue = false;
  const image = (now) => {
    if (!host.isConnected) {
      // La figure n'est pas encore insérée (quelques images) ou a quitté la page.
      if (vue || ++attente > 90) return;
      requestAnimationFrame(image); return;
    }
    vue = true;
    if (t0 == null) t0 = now;
    const dt = Math.min(now - t0, 50) / 1000; t0 = now;
    if (etat.joue) { etat.t += dt; etape(dt, etat.t); }
    requestAnimationFrame(image);
  };
  requestAnimationFrame(image);
  return etat;
}

const ICONE_PAUSE = '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="1.5" y="1" width="3.2" height="10" rx="1"/><rect x="7.3" y="1" width="3.2" height="10" rx="1"/></svg>';
const ICONE_LECTURE = '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2.5 1.2 11 6l-8.5 4.8z"/></svg>';
const boutonLecture = '<button type="button" class="pc-lecture" data-lecture aria-label="Mettre en pause l\'animation"></button>';

/** Relie le bouton lecture/pause d'une figure à l'état de son animation. */
function lierLecture(wrap, etat) {
  const b = wrap.querySelector('[data-lecture]');
  const maj = () => {
    b.innerHTML = etat.joue ? ICONE_PAUSE : ICONE_LECTURE;
    b.setAttribute('aria-label', etat.joue ? "Mettre en pause l'animation" : "Lancer l'animation");
  };
  b.addEventListener('click', () => { etat.joue = !etat.joue; maj(); });
  maj();
}

const nb = (x, d = 2) => String(arrondi(x, d)).replace('.', ',');
const $ = (wrap, sel) => wrap.querySelector(sel);

function cadre(host, contenu, classe = '') {
  const wrap = document.createElement('div');
  wrap.className = `fig-interactive pc-fig ${classe}`;
  wrap.innerHTML = contenu;
  host.appendChild(wrap);
  return wrap;
}

/** Écriture d'une charge en exposant : +2 → « 2+ », −1 → « − ». */
export const charge = (q) => (q === 0 ? '' : `${Math.abs(q) > 1 ? Math.abs(q) : ''}${q > 0 ? '+' : '−'}`);
/** Formule d'ion en HTML : ('Cu', 2) → « Cu<sup>2+</sup> ». */
export const ionHTML = (sym, q) => `${sym}<sup>${charge(q)}</sup>`;

// ================================================================ ATOME

/** Les 18 premiers éléments : symbole, nom, nombre de masse le plus courant. */
export const ELEMENTS = [
  null,
  ['H', 'hydrogène', 1], ['He', 'hélium', 4], ['Li', 'lithium', 7], ['Be', 'béryllium', 9], ['B', 'bore', 11],
  ['C', 'carbone', 12], ['N', 'azote', 14], ['O', 'oxygène', 16], ['F', 'fluor', 19], ['Ne', 'néon', 20],
  ['Na', 'sodium', 23], ['Mg', 'magnésium', 24], ['Al', 'aluminium', 27], ['Si', 'silicium', 28], ['P', 'phosphore', 31],
  ['S', 'soufre', 32], ['Cl', 'chlore', 35], ['Ar', 'argon', 40],
];

/** Élision : de('oxygène') → « d'oxygène », le('azote') → « l'azote ». */
const voyelle = (m) => /^[aeiouyéèêh]/i.test(m);
export const de = (m) => (voyelle(m) ? `d'${m}` : `de ${m}`);
export const le = (m) => (voyelle(m) ? `l'${m}` : `le ${m}`);
export const du = (m) => (voyelle(m) ? `de l'${m}` : `du ${m}`);

/** Charge de l'ion que forme réellement chaque élément (null : pas d'ion courant). */
const ION_USUEL = [null, 1, null, 1, 2, null, null, -3, -2, -1, null, 1, 2, 3, null, -3, -2, -1, null];

/** Positions compactes des nucléons (motif en spirale), protons et neutrons mêlés. */
function noyau(Z, N, cx, cy) {
  const n = Z + N, r = n > 20 ? 4 : 5;
  let s = '';
  for (let i = 0; i < n; i++) {
    const rayon = (r * 0.95) * Math.sqrt(i), a = i * 2.39996;
    const proton = Math.floor(((i + 1) * Z) / n) > Math.floor((i * Z) / n);
    s += `<circle cx="${arrondi(cx + rayon * Math.cos(a), 2)}" cy="${arrondi(cy + rayon * Math.sin(a), 2)}" r="${r}" class="${proton ? 'pc-proton' : 'pc-neutron'}"/>`;
  }
  return s;
}

/** Électrons répartis sur des couches (2, 8, 8) qui tournent. */
function couches(e, cx, cy) {
  const capacite = [2, 8, 8], rayons = [40, 62, 84];
  let reste = e, s = '';
  capacite.forEach((cap, k) => {
    const nE = Math.min(cap, reste); reste -= nE;
    s += `<circle cx="${cx}" cy="${cy}" r="${rayons[k]}" class="pc-orbite"/>`;
    if (!nE) return;
    s += `<g class="pc-couche pc-couche-${k + 1}" style="transform-origin:${cx}px ${cy}px">`;
    for (let i = 0; i < nE; i++) {
      const a = (i / nE) * 2 * Math.PI + k * 0.4;
      s += `<circle cx="${arrondi(cx + rayons[k] * Math.cos(a), 2)}" cy="${arrondi(cy + rayons[k] * Math.sin(a), 2)}" r="5" class="pc-electron"/>`;
    }
    s += '</g>';
  });
  return s;
}

/**
 * Modèle de l'atome : noyau (protons, neutrons) et électrons en mouvement.
 * options.ions : boutons pour arracher / ajouter des électrons (formation d'ions).
 */
export function atome(host, { Z = 6, ions = false, choix = true } = {}) {
  let z = Z, e = Z;
  const wrap = cadre(host, `
    ${choix ? `<div class="fig-controls"><label>Élément <input type="range" min="1" max="18" step="1" value="${z}" data-z> <span class="fig-val" data-nom></span></label></div>` : ''}
    <svg viewBox="0 0 220 220" class="pc-svg pc-atome" role="img" aria-label="Modèle de l'atome" data-svg></svg>
    ${ions ? `<div class="pc-boutons"><button type="button" class="btn btn-ghost" data-moins>Arracher un électron</button><button type="button" class="btn btn-ghost" data-plus>Ajouter un électron</button></div>` : ''}
    <div class="fig-readout" data-lecture-txt></div>
    <p class="pc-legende"><span class="pc-pastille pc-proton"></span>proton (+) <span class="pc-pastille pc-neutron"></span>neutron <span class="pc-pastille pc-electron"></span>électron (−)</p>`, 'pc-fig-atome');
  const dessiner = () => {
    const [sym, nom, A] = ELEMENTS[z];
    const q = z - e;
    $(wrap, '[data-svg]').innerHTML = couches(e, 110, 110) + noyau(z, A - z, 110, 110)
      + (q ? `<text x="200" y="28" text-anchor="end" class="pc-charge">${q > 0 ? '+' : '−'}${Math.abs(q) > 1 ? Math.abs(q) : ''}</text>` : '');
    if (choix) $(wrap, '[data-nom]').textContent = `${nom} (${sym})`;
    $(wrap, '[data-lecture-txt]').innerHTML = q === 0
      ? `<strong>${z}</strong> proton${z > 1 ? 's' : ''}, <strong>${A - z}</strong> neutron${A - z > 1 ? 's' : ''}, <strong>${e}</strong> électron${e > 1 ? 's' : ''} : autant de charges + que de charges −, l'<strong>atome ${de(nom)}</strong> est électriquement neutre.`
      : `<strong>${z}</strong> protons mais <strong>${e}</strong> électrons : il y a ${q > 0 ? `${q} charge${q > 1 ? 's' : ''} + en trop` : `${-q} charge${q < -1 ? 's' : ''} − en trop`}. C'est l'<strong>ion ${ionHTML(sym, q)}</strong>${q > 0 ? ' (ion positif, un « cation »)' : ' (ion négatif, un « anion »)'}.`
        + (ION_USUEL[z] === q ? ` C'est bien l'ion que forme ${le(nom)} dans la nature.`
          : ION_USUEL[z] == null ? `<br><small>En réalité, ${le(nom)} ne forme pas d'ion courant.</small>`
          : `<br><small>En réalité, cet ion est instable : ${le(nom)} forme l'ion ${ionHTML(sym, ION_USUEL[z])}.</small>`);
  };
  if (choix) $(wrap, '[data-z]').addEventListener('input', (ev) => { z = +ev.target.value; e = z; dessiner(); });
  if (ions) {
    $(wrap, '[data-moins]').addEventListener('click', () => { if (e > Math.max(0, z - 3)) { e--; dessiner(); } });
    $(wrap, '[data-plus]').addEventListener('click', () => { if (e < z + 3) { e++; dessiner(); } });
  }
  dessiner();
}

// ============================================================ ÉCHELLES

const TAILLES = [
  [-15, "noyau d'un atome"], [-10, 'atome'], [-9, "molécule d'eau"], [-7, 'virus'], [-5, 'cellule'],
  [-3, 'fourmi'], [0, 'être humain'], [2, 'tour Eiffel (300 m)'], [7, 'Terre (12 700 km)'], [9, 'Soleil'],
  [11, 'distance Terre–Soleil'], [13, 'système solaire'], [16, 'une année-lumière'], [21, 'la Voie lactée'], [26, "l'Univers observable"],
];

/** Règle des puissances de 10, du noyau de l'atome à l'Univers. */
export function echelleTailles(host) {
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Taille <input type="range" min="0" max="${TAILLES.length - 1}" step="1" value="1" data-i></label></div>
    <svg viewBox="0 0 320 90" class="pc-svg" role="img" aria-label="Échelle des tailles en puissances de 10" data-svg></svg>
    <div class="fig-readout" data-txt></div>`);
  const x = (p) => 14 + ((p + 16) / 43) * 292;
  const dessiner = () => {
    const i = +$(wrap, '[data-i]').value, [p, nom] = TAILLES[i];
    let s = `<line x1="14" y1="54" x2="306" y2="54" class="pc-trait"/>`;
    for (let k = -15; k <= 25; k += 5) s += `<line x1="${x(k)}" y1="48" x2="${x(k)}" y2="60" class="pc-trait"/><text x="${x(k)}" y="76" text-anchor="middle" class="pc-petit">10<tspan dy="-5" font-size="8">${k}</tspan></text>`;
    TAILLES.forEach(([q], j) => { s += `<circle cx="${x(q)}" cy="54" r="${j === i ? 7 : 3.5}" class="${j === i ? 'pc-repere-actif' : 'pc-repere'}"/>`; });
    s += `<text x="${Math.min(290, Math.max(30, x(p)))}" y="30" text-anchor="middle" class="pc-etiquette">${nom}</text>`;
    $(wrap, '[data-svg]').innerHTML = s;
    const suivant = TAILLES[Math.min(i + 1, TAILLES.length - 1)];
    $(wrap, '[data-txt]').innerHTML = `Ordre de grandeur : <strong>10<sup>${p}</sup> m</strong> — ${nom}.`
      + (i < TAILLES.length - 1 ? `<br>Il faut ${suivant[0] - p === 1 ? '10' : `10<sup>${suivant[0] - p}</sup>`} fois plus grand pour atteindre : ${suivant[1]}.` : '');
  };
  $(wrap, '[data-i]').addEventListener('input', dessiner);
  dessiner();
}

// ======================================================= LABO DES IONS

/** Solutions testées : ions présents et résultat de chaque test. */
export const SOLUTIONS = {
  cuivre: { nom: 'sulfate de cuivre', ions: 'Cu²⁺ et SO₄²⁻', couleur: '#5aa9e6', soude: ['#2f6fd6', 'précipité bleu', 'ions cuivre Cu²⁺'], argent: null },
  fer2: { nom: 'sulfate de fer II', ions: 'Fe²⁺ et SO₄²⁻', couleur: '#cfe8c4', soude: ['#5f8f4e', 'précipité vert', 'ions fer II Fe²⁺'], argent: null },
  fer3: { nom: 'chlorure de fer III', ions: 'Fe³⁺ et Cl⁻', couleur: '#e9b44c', soude: ['#b5541c', 'précipité rouille', 'ions fer III Fe³⁺'], argent: ['#f4f4f4', 'précipité blanc qui noircit à la lumière', 'ions chlorure Cl⁻'] },
  zinc: { nom: 'sulfate de zinc', ions: 'Zn²⁺ et SO₄²⁻', couleur: '#eef3f7', soude: ['#ffffff', 'précipité blanc', 'ions zinc Zn²⁺'], argent: null },
  sel: { nom: 'eau salée (chlorure de sodium)', ions: 'Na⁺ et Cl⁻', couleur: '#eef3f7', soude: null, argent: ['#f4f4f4', 'précipité blanc qui noircit à la lumière', 'ions chlorure Cl⁻'] },
};

/**
 * Paillasse virtuelle : on choisit une solution et un réactif, on verse
 * quelques gouttes, un précipité coloré apparaît (ou rien).
 */
export function laboIons(host, { solution = 'cuivre' } = {}) {
  let sol = solution, reactif = 'soude', verse = false, minuterie = null;
  const wrap = cadre(host, `
    <div class="pc-choix">
      <label>Solution <select data-sol>${Object.entries(SOLUTIONS).map(([k, v]) => `<option value="${k}" ${k === sol ? 'selected' : ''}>${v.nom}</option>`).join('')}</select></label>
      <label>Réactif <select data-reactif><option value="soude">soude (hydroxyde de sodium)</option><option value="argent">nitrate d'argent</option></select></label>
    </div>
    <svg viewBox="0 0 220 200" class="pc-svg pc-labo" role="img" aria-label="Tube à essai et pipette" data-svg></svg>
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-verser>Verser quelques gouttes</button><button type="button" class="btn btn-ghost" data-vider>Nouveau tube</button></div>
    <div class="fig-readout" data-txt></div>`, 'pc-fig-labo');

  const dessiner = () => {
    const S = SOLUTIONS[sol], res = S[reactif];
    let flocons = '';
    if (verse && res) {
      for (let i = 0; i < 26; i++) {
        const fx = 92 + ((i * 37) % 36), fy = 160 - ((i * 53) % 34) * (i % 3 === 0 ? 1.4 : 1);
        flocons += `<circle cx="${fx}" cy="${fy}" r="${2.4 + (i % 3)}" fill="${res[0]}" class="pc-flocon" style="animation-delay:${0.9 + (i % 7) * 0.08}s"/>`;
      }
    }
    const gouttes = verse ? [0, 1, 2].map((k) => `<circle cx="110" cy="36" r="3.6" class="pc-goutte" style="animation-delay:${k * 0.25}s"/>`).join('') : '';
    $(wrap, '[data-svg]').innerHTML = `
      <path d="M100 4 h20 v18 l-5 10 h-10 l-5 -10z" class="pc-pipette"/>
      <text x="126" y="16" class="pc-petit">${reactif === 'soude' ? 'soude' : "nitrate d'argent"}</text>
      ${gouttes}
      <path d="M86 60 V168 a24 24 0 0 0 48 0 V60" class="pc-liquide" fill="${S.couleur}" clip-path="url(#tube-${sol})"/>
      <clipPath id="tube-${sol}"><rect x="80" y="96" width="60" height="100"/></clipPath>
      ${flocons}
      <path d="M86 50 V168 a24 24 0 0 0 48 0 V50" class="pc-verre"/>
      <line x1="80" y1="50" x2="140" y2="50" class="pc-verre"/>
      <text x="60" y="120" text-anchor="end" class="pc-petit">${S.ions}</text>`;
    $(wrap, '[data-txt]').innerHTML = !verse
      ? `Tube contenant du <strong>${S.nom}</strong>. Choisis un réactif puis verse quelques gouttes.`
      : res
        ? `<strong>${res[1][0].toUpperCase() + res[1].slice(1)}</strong> : le test révèle la présence d'<strong>${res[2]}</strong>.`
        : `<strong>Aucun précipité</strong> : ce test ne détecte aucun des ions présents (${S.ions}).`;
  };
  const vider = () => { verse = false; clearTimeout(minuterie); dessiner(); };
  $(wrap, '[data-sol]').addEventListener('change', (ev) => { sol = ev.target.value; vider(); });
  $(wrap, '[data-reactif]').addEventListener('change', (ev) => { reactif = ev.target.value; vider(); });
  $(wrap, '[data-verser]').addEventListener('click', () => { verse = true; dessiner(); });
  $(wrap, '[data-vider]').addEventListener('click', vider);
  dessiner();
}

// ============================================================== LE pH

export const PRODUITS_PH = [
  ['jus de citron', 2.4], ['vinaigre', 3], ['soda au cola', 2.5], ['jus de tomate', 4.2], ['lait', 6.7],
  ['eau pure', 7], ['sang', 7.4], ["eau de mer", 8.2], ['savon', 10], ['eau de Javel', 12], ['déboucheur (soude)', 13.5],
];
const couleurPH = (p) => `hsl(${Math.round(Math.max(0, Math.min(14, p)) * 20)}, 75%, 55%)`;

/** Échelle de pH interactive, avec dilution d'une solution. */
export function echellePH(host) {
  let i = 1, dilution = 0;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Produit <select data-p>${PRODUITS_PH.map(([n, p], k) => `<option value="${k}" ${k === i ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
    <div class="fig-controls"><label>Dilution <input type="range" min="0" max="5" step="1" value="0" data-d> <span class="fig-val" data-dv></span></label></div>
    <svg viewBox="0 0 320 96" class="pc-svg" role="img" aria-label="Échelle de pH de 0 à 14" data-svg></svg>
    <div class="fig-readout" data-txt></div>`);
  const x = (p) => 14 + (p / 14) * 292;
  let degrade = '<defs><linearGradient id="ph-grad">';
  for (let p = 0; p <= 14; p += 2) degrade += `<stop offset="${p / 14}" stop-color="${couleurPH(p)}"/>`;
  degrade += '</linearGradient></defs>';
  const dessiner = () => {
    const [nom, p0] = PRODUITS_PH[i];
    // Diluer 10 fois rapproche le pH de 7 d'environ une unité (sans jamais dépasser 7).
    const p = p0 < 7 ? Math.min(7, p0 + dilution) : Math.max(7, p0 - dilution);
    let s = degrade + `<rect x="14" y="40" width="292" height="18" rx="9" fill="url(#ph-grad)"/>`;
    for (let k = 0; k <= 14; k++) s += `<text x="${x(k)}" y="74" text-anchor="middle" class="pc-petit">${k}</text>`;
    s += `<text x="14" y="92" class="pc-petit">acide</text><text x="${x(7)}" y="92" text-anchor="middle" class="pc-petit">neutre</text><text x="306" y="92" text-anchor="end" class="pc-petit">basique</text>`;
    s += `<g class="pc-curseur-ph" style="transform:translateX(${arrondi(x(p) - x(0), 2)}px)"><path d="M${x(0)} 36 l-7 -12 h14z" class="pc-repere-actif"/><text x="${x(0)}" y="18" text-anchor="middle" class="pc-etiquette">pH ${nb(p, 1)}</text></g>`;
    $(wrap, '[data-svg]').innerHTML = s;
    $(wrap, '[data-dv]').textContent = dilution ? `× ${10 ** dilution}` : 'aucune';
    const nature = p < 7 ? 'acide : elle contient plus d\'ions hydrogène H⁺ que d\'ions hydroxyde HO⁻' : p > 7 ? 'basique : elle contient plus d\'ions hydroxyde HO⁻ que d\'ions H⁺' : 'neutre : autant d\'ions H⁺ que d\'ions HO⁻';
    $(wrap, '[data-txt]').innerHTML = `<strong>${nom[0].toUpperCase() + nom.slice(1)}${dilution ? ` dilué ${10 ** dilution} fois` : ''}</strong> : pH ${nb(p, 1)}. La solution est ${nature}.`
      + (dilution && p0 !== 7 ? '<br>En diluant, le pH se rapproche de 7 sans le dépasser.' : '');
  };
  $(wrap, '[data-p]').addEventListener('change', (ev) => { i = +ev.target.value; dessiner(); });
  $(wrap, '[data-d]').addEventListener('input', (ev) => { dilution = +ev.target.value; dessiner(); });
  dessiner();
}

// ==================================================== FER + ACIDE (H₂)

/** Un clou de fer dans l'acide chlorhydrique : des bulles de dihydrogène montent ; test à la flamme. */
export function ferAcide(host) {
  const bulles = Array.from({ length: 14 }, (_, k) => ({ x: 100 + ((k * 13) % 22), y: 170 - ((k * 29) % 90), v: 22 + (k % 5) * 7, r: 1.8 + (k % 3) }));
  const wrap = cadre(host, `
    <svg viewBox="0 0 220 200" class="pc-svg pc-labo" role="img" aria-label="Clou de fer dans l'acide chlorhydrique" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-flamme>Approcher une allumette</button></div>
    <div class="fig-readout" data-txt>Le fer réagit avec l'acide chlorhydrique : un gaz se dégage.</div>`);
  const svg = $(wrap, '[data-svg]');
  svg.innerHTML = `
    <path d="M86 70 V168 a24 24 0 0 0 48 0 V70z" fill="#e6f2ea" class="pc-liquide"/>
    <rect x="104" y="96" width="8" height="84" rx="2" class="pc-clou"/><rect x="99" y="92" width="18" height="6" rx="2" class="pc-clou"/>
    <g data-bulles></g>
    <g data-pop class="pc-pop" opacity="0"><path d="M110 22 l8 14 l12 -6 l-6 12 l14 4 l-14 4 l6 12 l-12 -6 l-8 14 l-8 -14 l-12 6 l6 -12 l-14 -4 l14 -4 l-6 -12 l12 6z"/><text x="110" y="46" text-anchor="middle" class="pc-etiquette">POP !</text></g>
    <path d="M86 50 V168 a24 24 0 0 0 48 0 V50" class="pc-verre"/>`;
  const gB = $(wrap, '[data-bulles]');
  const etat = animer(wrap, (dt) => {
    bulles.forEach((b) => { b.y -= b.v * dt; if (b.y < 74) { b.y = 170; } });
    gB.innerHTML = bulles.map((b) => `<circle cx="${arrondi(b.x + Math.sin(b.y / 9) * 2, 1)}" cy="${arrondi(b.y, 1)}" r="${b.r}" class="pc-bulle"/>`).join('');
  });
  lierLecture(wrap, etat);
  $(wrap, '[data-flamme]').addEventListener('click', () => {
    const pop = $(wrap, '[data-pop]');
    pop.classList.remove('pc-pop-joue'); void pop.offsetWidth; pop.classList.add('pc-pop-joue');
    $(wrap, '[data-txt]').innerHTML = "Une petite détonation (« pop ») : le gaz est du <strong>dihydrogène H₂</strong>.";
  });
}

// ============================================== FLOTTE OU COULE (ρ)

export const MATERIAUX = [
  ['liège', 0.24], ['bois de pin', 0.5], ['glace', 0.92], ['plastique (PVC)', 1.4], ['aluminium', 2.7], ['fer', 7.87], ['or', 19.3],
];
export const LIQUIDES = [['eau', 1], ["huile d'olive", 0.92], ['eau très salée', 1.2], ['mercure', 13.5]];

/** Un cube tombe dans un liquide : il flotte si sa masse volumique est plus petite. */
export function flotteCoule(host) {
  let mat = 2, liq = 0, y = 0, cible = 0, v = 0;
  const wrap = cadre(host, `
    <div class="pc-choix">
      <label>Objet en <select data-mat>${MATERIAUX.map(([n], k) => `<option value="${k}" ${k === mat ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label>Liquide <select data-liq>${LIQUIDES.map(([n], k) => `<option value="${k}">${n}</option>`).join('')}</select></label>
    </div>
    <svg viewBox="0 0 220 180" class="pc-svg" role="img" aria-label="Cube plongé dans un liquide" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-lacher>Lâcher à nouveau</button></div>
    <div class="fig-readout" data-txt></div>`);
  const SURFACE = 70, FOND = 164, COTE = 34;
  const calculer = () => {
    const r = MATERIAUX[mat][1] / LIQUIDES[liq][1];
    // Position d'équilibre : immergé à la fraction r si r < 1, sinon au fond.
    cible = r < 1 ? SURFACE - COTE + r * COTE : FOND - COTE;
    $(wrap, '[data-txt]').innerHTML = `ρ<sub>objet</sub> = <strong>${nb(MATERIAUX[mat][1])} g/cm³</strong>, ρ<sub>liquide</sub> = <strong>${nb(LIQUIDES[liq][1])} g/cm³</strong>.<br>`
      + (r < 1 ? `ρ<sub>objet</sub> &lt; ρ<sub>liquide</sub> : l'objet en ${MATERIAUX[mat][0]} <strong>flotte</strong> (${Math.round(r * 100)} % de son volume est immergé).` : `ρ<sub>objet</sub> &gt; ρ<sub>liquide</sub> : l'objet en ${MATERIAUX[mat][0]} <strong>coule</strong>.`);
  };
  const lacher = () => { y = 6; v = 0; calculer(); };
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    svg.innerHTML = `<rect x="30" y="${SURFACE}" width="160" height="${FOND - SURFACE + 8}" class="pc-bac-liquide" fill="${liq === 3 ? '#b9bec9' : liq === 1 ? '#e8d77a' : '#9fd0f0'}"/>
      <path d="M30 20 V172 H190 V20" class="pc-verre"/>
      <rect x="93" y="${arrondi(y, 1)}" width="${COTE}" height="${COTE}" rx="3" class="pc-cube"/>
      <line x1="30" y1="${SURFACE}" x2="190" y2="${SURFACE}" class="pc-surface"/>`;
  };
  const etat = animer(wrap, (dt) => {
    // Chute amortie vers la position d'équilibre (ressort + frottement)
    const a = (cible - y) * 18 - v * 5.5;
    v += a * dt; y += v * dt;
    dessiner();
  });
  lierLecture(wrap, etat);
  $(wrap, '[data-mat]').addEventListener('change', (ev) => { mat = +ev.target.value; lacher(); });
  $(wrap, '[data-liq]').addEventListener('change', (ev) => { liq = +ev.target.value; lacher(); });
  $(wrap, '[data-lacher]').addEventListener('click', lacher);
  lacher(); if (!etat.joue) { y = cible; } dessiner();
}

// ==================================================== CHRONOPHOTOGRAPHIE

/** Positions d'un mobile à intervalles de temps égaux : uniforme, accéléré, ralenti. */
export function chronophoto(host, { type = 'uniforme' } = {}) {
  let mode = type;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Mouvement <select data-m>
      <option value="uniforme">rectiligne uniforme</option><option value="accelere">rectiligne accéléré</option>
      <option value="ralenti">rectiligne ralenti</option><option value="circulaire">circulaire uniforme</option></select></label></div>
    <svg viewBox="0 0 320 140" class="pc-svg" role="img" aria-label="Chronophotographie" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-rejouer>Rejouer</button></div>
    <div class="fig-readout" data-txt></div>`);
  $(wrap, '[data-m]').value = mode;
  const positions = () => {
    const n = 9, pts = [];
    for (let k = 0; k < n; k++) {
      const u = k / (n - 1);
      if (mode === 'circulaire') { const a = -Math.PI / 2 + u * 1.75 * Math.PI; pts.push([160 + 52 * Math.cos(a), 70 + 52 * Math.sin(a)]); }
      else pts.push([22 + 276 * (mode === 'uniforme' ? u : mode === 'accelere' ? u * u : 1 - (1 - u) * (1 - u)), 70]);
    }
    return pts;
  };
  const TEXTES = {
    uniforme: 'Les positions sont <strong>également espacées</strong> : le mobile parcourt la même distance pendant chaque intervalle de temps. La vitesse est constante.',
    accelere: "L'écart entre deux positions <strong>augmente</strong> : la vitesse augmente, le mouvement est accéléré.",
    ralenti: "L'écart entre deux positions <strong>diminue</strong> : la vitesse diminue, le mouvement est ralenti.",
    circulaire: 'La trajectoire est un <strong>cercle</strong> et les positions sont également espacées : mouvement circulaire uniforme (la direction de la vitesse change sans cesse).',
  };
  const svg = $(wrap, '[data-svg]');
  const dessiner = (t) => {
    const pts = positions(), vus = Math.min(pts.length, 1 + Math.floor(t / 0.35));
    let s = mode === 'circulaire' ? '<circle cx="160" cy="70" r="52" class="pc-trajectoire"/>' : '<line x1="14" y1="70" x2="306" y2="70" class="pc-trajectoire"/>';
    pts.slice(0, vus).forEach(([px, py], k) => {
      s += `<circle cx="${arrondi(px, 1)}" cy="${arrondi(py, 1)}" r="7" class="pc-position ${k === vus - 1 ? 'pc-position-derniere' : ''}"/>`;
      s += `<text x="${arrondi(px, 1)}" y="${arrondi(mode === 'circulaire' ? py + (py < 70 ? -12 : 20) : 98, 1)}" text-anchor="middle" class="pc-petit">t${k}</text>`;
    });
    svg.innerHTML = s;
  };
  let tAffiche = 0;
  const etat = animer(wrap, (dt) => { tAffiche += dt; if (tAffiche > 5) tAffiche = 0; dessiner(tAffiche); });
  if (!etat.joue) dessiner(99);
  lierLecture(wrap, etat);
  const maj = () => { tAffiche = 0; $(wrap, '[data-txt]').innerHTML = TEXTES[mode] + '<br><small>Intervalle de temps constant entre deux positions.</small>'; if (!etat.joue) dessiner(99); };
  $(wrap, '[data-m]').addEventListener('change', (ev) => { mode = ev.target.value; maj(); });
  $(wrap, '[data-rejouer]').addEventListener('click', maj);
  maj();
}

// ================================================================ FORCES

/** Une force modélisée par une flèche : point d'application, direction, sens, valeur (échelle réglable). */
export function flecheForce(host) {
  const wrap = cadre(host, `
    <div class="fig-controls">
      <label>Valeur <input type="range" min="10" max="60" step="5" value="30" data-f> <span class="fig-val" data-fv></span></label>
      <label>Direction <input type="range" min="-90" max="90" step="15" value="0" data-a> <span class="fig-val" data-av></span></label>
    </div>
    <svg viewBox="0 0 320 170" class="pc-svg" role="img" aria-label="Force représentée par une flèche" data-svg></svg>
    <div class="fig-readout" data-txt></div>`);
  const dessiner = () => {
    const F = +$(wrap, '[data-f]').value, a = +$(wrap, '[data-a]').value;
    const L = F * 3, rad = (-a * Math.PI) / 180, x2 = 110 + L * Math.cos(rad), y2 = 95 + L * Math.sin(rad);
    $(wrap, '[data-fv]').textContent = `${F} N`;
    $(wrap, '[data-av]').textContent = a === 0 ? 'horizontale' : a === 90 ? 'verticale, vers le haut' : a === -90 ? 'verticale, vers le bas' : `${Math.abs(a)}° ${a > 0 ? 'au-dessus' : 'en dessous'}`;
    $(wrap, '[data-svg]').innerHTML = `
      <defs><marker id="pointe-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="pc-pointe"/></marker></defs>
      <line x1="0" y1="130" x2="320" y2="130" class="pc-sol"/>
      <rect x="70" y="70" width="80" height="60" rx="6" class="pc-caisse"/>
      <line x1="110" y1="95" x2="${arrondi(x2, 1)}" y2="${arrondi(y2, 1)}" class="pc-force" marker-end="url(#pointe-f)"/>
      <circle cx="110" cy="95" r="4.5" class="pc-point-app"/>
      <text x="${arrondi(x2 + 8, 1)}" y="${arrondi(y2 - 8, 1)}" class="pc-etiquette">F⃗</text>
      <line x1="200" y1="158" x2="230" y2="158" class="pc-echelle"/><text x="236" y="162" class="pc-petit">1 cm ↔ 10 N</text>`;
    $(wrap, '[data-txt]').innerHTML = `Point d'application : le point rouge · direction : ${$(wrap, '[data-av]').textContent} · valeur : <strong>${F} N</strong>, soit une flèche de <strong>${nb(F / 10, 1)} cm</strong> à l'échelle.`;
  };
  $(wrap, '[data-f]').addEventListener('input', dessiner);
  $(wrap, '[data-a]').addEventListener('input', dessiner);
  dessiner();
}

// ================================================================ POIDS

export const ASTRES = [['Terre', 9.8], ['Lune', 1.6], ['Mars', 3.7], ['Jupiter', 24.8]];

/** Même masse, poids différent selon l'astre : dynamomètre et saut. */
export function poidsAstres(host) {
  let astre = 0, m = 60, hauteur = 0, vitesse = 0;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Astre <select data-astre>${ASTRES.map(([n], k) => `<option value="${k}">${n}</option>`).join('')}</select></label></div>
    <div class="fig-controls"><label>Masse <input type="range" min="10" max="100" step="5" value="${m}" data-m> <span class="fig-val" data-mv></span></label></div>
    <svg viewBox="0 0 320 170" class="pc-svg" role="img" aria-label="Poids selon l'astre" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    const g = ASTRES[astre][1], P = m * g, etire = Math.min(96, 14 + P / 12);
    let ressort = 'M80 22';
    for (let k = 1; k <= 10; k++) ressort += ` L${k % 2 ? 90 : 70} ${arrondi(22 + (k * etire) / 10, 1)}`;
    svg.innerHTML = `
      <rect x="62" y="10" width="36" height="10" rx="2" class="pc-caisse"/>
      <path d="${ressort}" class="pc-ressort"/>
      <rect x="62" y="${arrondi(26 + etire, 1)}" width="36" height="26" rx="4" class="pc-masse"/>
      <text x="80" y="${arrondi(44 + etire, 1)}" text-anchor="middle" class="pc-etiquette-claire">${m} kg</text>
      <text x="110" y="${arrondi(30 + etire / 2, 1)}" class="pc-etiquette">${nb(P, 0)} N</text>
      <line x1="170" y1="160" x2="310" y2="160" class="pc-sol"/>
      <circle cx="240" cy="${arrondi(148 - hauteur, 1)}" r="12" class="pc-balle"/>
      <text x="240" y="176" text-anchor="middle" class="pc-petit">sur ${ASTRES[astre][0] === 'Terre' ? 'la Terre' : ASTRES[astre][0] === 'Lune' ? 'la Lune' : ASTRES[astre][0]}</text>`;
  };
  const maj = () => {
    const [nom, g] = ASTRES[astre];
    $(wrap, '[data-mv]').textContent = `${m} kg`;
    $(wrap, '[data-txt]').innerHTML = `Sur ${nom === 'Terre' ? 'la Terre' : nom === 'Lune' ? 'la Lune' : nom}, g = <strong>${nb(g, 1)} N/kg</strong>. P = m × g = ${m} × ${nb(g, 1)} = <strong>${nb(m * g, 1)} N</strong>.<br>La masse (${m} kg) est la même partout ; le poids change avec l'astre.`;
    dessiner();
  };
  // Saut : même élan, la balle monte plus haut là où g est faible
  const etat = animer(wrap, (dt) => {
    const g = ASTRES[astre][1];
    vitesse -= g * 9 * dt; hauteur += vitesse * dt;
    if (hauteur <= 0) { hauteur = 0; vitesse = 60; }
    if (hauteur > 125) { hauteur = 125; vitesse = Math.min(vitesse, 0); }
    dessiner();
  });
  lierLecture(wrap, etat);
  $(wrap, '[data-astre]').addEventListener('change', (ev) => { astre = +ev.target.value; hauteur = 0; vitesse = 60; maj(); });
  $(wrap, '[data-m]').addEventListener('input', (ev) => { m = +ev.target.value; maj(); });
  maj();
}

// =============================================== CONSERVATION DE L'ÉNERGIE

/** Une bille dans une cuvette : l'énergie de position se change en énergie cinétique, et inversement. */
export function cuvetteEnergie(host) {
  let frottements = false, Em = 1, x = -1, v = 0;
  const wrap = cadre(host, `
    <label class="pc-case"><input type="checkbox" data-fr> avec frottements</label>
    <svg viewBox="0 0 320 180" class="pc-svg" role="img" aria-label="Bille dans une cuvette et barres d'énergie" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-lacher>Lâcher la bille</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const piste = (u) => [30 + (u + 1) * 100, 30 + 100 * (1 - u * u)]; // u ∈ [-1, 1] ; hauteur 100 aux bords
  let chemin = '';
  for (let k = 0; k <= 40; k++) { const [px, py] = piste(-1 + k / 20); chemin += `${k ? 'L' : 'M'}${arrondi(px, 1)} ${arrondi(py, 1)} `; }
  const dessiner = () => {
    const Ep = x * x, Ec = Math.max(0, Em - Ep), th = 1 - Em;
    const [bx, by] = piste(x);
    const barre = (i, val, cls, lab) => `<rect x="${250 + i * 22}" y="${arrondi(160 - val * 120, 1)}" width="16" height="${arrondi(val * 120, 1)}" class="${cls}"/><text x="${258 + i * 22}" y="174" text-anchor="middle" class="pc-petit">${lab}</text>`;
    svg.innerHTML = `<path d="${chemin}" class="pc-piste"/>
      <circle cx="${arrondi(bx, 1)}" cy="${arrondi(by - 9, 1)}" r="9" class="pc-balle"/>
      <line x1="244" y1="160" x2="318" y2="160" class="pc-trait"/>
      ${barre(0, Ep, 'pc-e-pos', 'Ep')}${barre(1, Ec, 'pc-e-cin', 'Ec')}${barre(2, th, 'pc-e-th', 'Q')}`;
  };
  const etat = animer(wrap, (dt) => {
    // Oscillateur : l'accélération ramène la bille vers le fond.
    const pas = 1 / 120;
    for (let t = 0; t < dt; t += pas) {
      v += -2.2 * x * pas;
      if (frottements) v *= 1 - 0.25 * pas;
      x += v * pas;
    }
    x = Math.max(-1, Math.min(1, x));
    if (frottements) Em = Math.min(Em, x * x + (v * v) / 2.2);
    dessiner();
  });
  const texte = () => {
    $(wrap, '[data-txt]').innerHTML = frottements
      ? "Avec frottements, une partie de l'énergie devient de l'<strong>énergie thermique</strong> (Q) : la bille monte de moins en moins haut. L'énergie totale se conserve toujours."
      : "Sans frottements : en descendant, l'énergie de position (Ep) devient de l'énergie cinétique (Ec), puis l'inverse en remontant. Leur somme reste constante.";
  };
  const lacher = () => { x = -1; v = 0; Em = 1; texte(); dessiner(); };
  lierLecture(wrap, etat);
  $(wrap, '[data-fr]').addEventListener('change', (ev) => { frottements = ev.target.checked; lacher(); });
  $(wrap, '[data-lacher]').addEventListener('click', lacher);
  lacher();
}

// ================================================== DISTANCE D'ARRÊT

/** Distances de réaction et de freinage selon la vitesse et l'état de la route. */
export function freinage(host) {
  let kmh = 50, mouille = false, pos = 0;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Vitesse <input type="range" min="30" max="130" step="10" value="${kmh}" data-v> <span class="fig-val" data-vv></span></label></div>
    <label class="pc-case"><input type="checkbox" data-mouille> route mouillée</label>
    <svg viewBox="0 0 320 110" class="pc-svg" role="img" aria-label="Distance d'arrêt d'une voiture" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const distances = () => {
    const v = kmh / 3.6, dr = v * 1, df = (v * v) / (2 * (mouille ? 5 : 8));
    return { v, dr, df, da: dr + df };
  };
  const dessiner = () => {
    const { dr, df } = distances(), echelle = 280 / 190, xr = 20 + dr * echelle, xa = xr + df * echelle;
    const xVoiture = 20 + Math.min(pos, dr + df) * echelle;
    svg.innerHTML = `<rect x="0" y="40" width="320" height="34" class="pc-route"/>
      <line x1="0" y1="57" x2="320" y2="57" class="pc-ligne-route"/>
      <rect x="20" y="82" width="${arrondi(xr - 20, 1)}" height="10" class="pc-d-reaction"/>
      <rect x="${arrondi(xr, 1)}" y="82" width="${arrondi(xa - xr, 1)}" height="10" class="pc-d-freinage"/>
      <line x1="20" y1="30" x2="20" y2="96" class="pc-obstacle-depart"/>
      <g style="transform:translateX(${arrondi(xVoiture - 20, 1)}px)"><rect x="0" y="45" width="30" height="16" rx="5" class="pc-voiture"/><circle cx="7" cy="62" r="4" class="pc-roue"/><circle cx="23" cy="62" r="4" class="pc-roue"/></g>
      <text x="20" y="22" class="pc-petit">danger vu</text>`;
  };
  const maj = () => {
    const { dr, df, da } = distances();
    $(wrap, '[data-vv]').textContent = `${kmh} km/h`;
    $(wrap, '[data-txt]').innerHTML = `<span class="pc-pastille pc-d-reaction"></span>Réaction (1 s) : <strong>${nb(dr, 0)} m</strong> · <span class="pc-pastille pc-d-freinage"></span>freinage : <strong>${nb(df, 0)} m</strong> · arrêt : <strong>${nb(da, 0)} m</strong>.<br>Quand la vitesse double, la distance de freinage est multipliée par 4 (elle dépend de v²).`;
    pos = 0; dessiner();
  };
  const etat = animer(wrap, (dt) => {
    const { v, dr, da } = distances();
    // Pendant la réaction, la voiture garde sa vitesse, puis elle décélère.
    const a = mouille ? 5 : 8;
    if (pos < dr) pos += v * dt * 0.6;
    else if (pos < da) { const vr = Math.sqrt(Math.max(0, 2 * a * (da - pos))); pos += Math.max(0.5, vr) * dt * 0.6; }
    else pos += dt * 12; // pause avant de recommencer
    if (pos > da + 20) pos = 0;
    dessiner();
  });
  lierLecture(wrap, etat);
  $(wrap, '[data-v]').addEventListener('input', (ev) => { kmh = +ev.target.value; maj(); });
  $(wrap, '[data-mouille]').addEventListener('change', (ev) => { mouille = ev.target.checked; maj(); });
  maj();
}

// ============================================ CIRCUIT : ÉLECTRONS EN MOUVEMENT

/**
 * Circuit en série (pile, conducteur ohmique, ampèremètre, voltmètre) :
 * les électrons circulent du pôle − vers le pôle +, d'autant plus vite que
 * l'intensité est grande. options.lampe : ajoute une lampe dont l'éclat suit I.
 */
export function circuit(host, { U = 6, R = 40, lampe = false, reglerU = false } = {}) {
  let u = U, r = R;
  const wrap = cadre(host, `
    <div class="fig-controls">
      <label>Résistance <input type="range" min="10" max="120" step="10" value="${r}" data-r> <span class="fig-val" data-rv></span></label>
      ${reglerU ? `<label>Tension <input type="range" min="1.5" max="12" step="1.5" value="${u}" data-u> <span class="fig-val" data-uv></span></label>` : ''}
    </div>
    <svg viewBox="0 0 320 190" class="pc-svg pc-circuit" role="img" aria-label="Circuit électrique en série" data-svg></svg>
    <div class="pc-mesures">
      <div class="pc-lcd"><small>U (V)</small><span data-lu></span></div>
      <div class="pc-lcd"><small>R (Ω)</small><span data-lr></span></div>
      <div class="pc-lcd"><small>I (A)</small><span data-li></span></div>
    </div>
    <div class="pc-boutons">${boutonLecture}<span class="pc-legende"><span class="pc-pastille pc-electron"></span>électrons : du pôle − vers le pôle +</span></div>`);
  const svg = $(wrap, '[data-svg]');
  // Boucle rectangulaire parcourue dans le sens des électrons (depuis le pôle −, en bas de la pile).
  const X0 = 40, X1 = 280, Y0 = 40, Y1 = 160;
  const L = 2 * (X1 - X0) + 2 * (Y1 - Y0);
  const H = Y1 - Y0, W = X1 - X0, POLE = 100;
  // Segments : pôle − → bas gauche → bas droite → haut droite → haut gauche → pôle +
  const SEGMENTS = [[X0, POLE, 0, 1, Y1 - POLE], [X0, Y1, 1, 0, W], [X1, Y1, 0, -1, H], [X1, Y0, -1, 0, W], [X0, Y0, 0, 1, POLE - Y0]];
  const surBoucle = (d) => {
    let reste = ((d % L) + L) % L;
    for (const [sx, sy, dx, dy, len] of SEGMENTS) { if (reste <= len) return [sx + dx * reste, sy + dy * reste]; reste -= len; }
    return [X0, POLE];
  };
  const N = 28, electrons = Array.from({ length: N }, (_, k) => (k * L) / N);
  const fixe = `
    <path d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z" class="pc-fil"/>
    <g data-e></g>
    <rect x="${X0 - 14}" y="80" width="28" height="36" class="pc-cache"/>
    <line x1="${X0 - 16}" y1="88" x2="${X0 + 16}" y2="88" class="pc-borne"/><line x1="${X0 - 8}" y1="100" x2="${X0 + 8}" y2="100" class="pc-borne pc-borne-epaisse"/>
    <text x="${X0 - 20}" y="92" text-anchor="end" class="pc-etiquette">+</text><text x="${X0 - 20}" y="108" text-anchor="end" class="pc-etiquette">−</text>
    <rect x="120" y="${Y0 - 11}" width="60" height="22" rx="3" class="pc-resistance"/><text x="150" y="${Y0 - 18}" text-anchor="middle" class="pc-petit">R</text>
    ${lampe ? `<circle cx="230" cy="${Y0}" r="30" class="pc-lueur" data-lueur/><circle cx="230" cy="${Y0}" r="13" class="pc-cache pc-contour"/><path d="M221 ${Y0 - 9} l18 18 M239 ${Y0 - 9} l-18 18" class="pc-fil"/>` : ''}
    <circle cx="${X1}" cy="100" r="16" class="pc-cache pc-contour"/><text x="${X1}" y="106" text-anchor="middle" class="pc-appareil">A</text>
    <path d="M125 ${Y0} V${Y0 + 45} H175 V${Y0}" class="pc-fil-mesure"/><circle cx="150" cy="${Y0 + 45}" r="14" class="pc-cache pc-contour"/><text x="150" y="${Y0 + 51}" text-anchor="middle" class="pc-appareil">V</text>`;
  svg.innerHTML = fixe;
  const gE = $(wrap, '[data-e]');
  const maj = () => {
    const I = u / r;
    $(wrap, '[data-rv]').textContent = `${r} Ω`;
    if (reglerU) $(wrap, '[data-uv]').textContent = `${nb(u, 1)} V`;
    $(wrap, '[data-lu]').textContent = nb(u, 2);
    $(wrap, '[data-lr]').textContent = String(r);
    $(wrap, '[data-li]').textContent = nb(I, 3);
    if (lampe) {
      const k = Math.max(0, Math.min(1, (I - 0.03) / 0.5));
      const l = $(wrap, '[data-lueur]');
      l.setAttribute('r', arrondi(14 + 34 * k, 1)); l.setAttribute('opacity', arrondi(0.1 + 0.8 * k, 2));
    }
  };
  const etat = animer(wrap, (dt) => {
    const I = u / r;
    for (let k = 0; k < N; k++) electrons[k] += dt * I * 260;
    gE.innerHTML = electrons.map((d) => { const [ex, ey] = surBoucle(d); return `<circle cx="${arrondi(ex, 1)}" cy="${arrondi(ey, 1)}" r="4" class="pc-electron"/>`; }).join('');
  });
  lierLecture(wrap, etat);
  $(wrap, '[data-r]').addEventListener('input', (ev) => { r = +ev.target.value; maj(); });
  if (reglerU) $(wrap, '[data-u]').addEventListener('input', (ev) => { u = +ev.target.value; maj(); });
  maj();
}

/** Caractéristique U = f(I) d'un conducteur ohmique : une droite passant par l'origine. */
export function caracteristique(host, { R = 50 } = {}) {
  let r = R;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Résistance <input type="range" min="10" max="100" step="10" value="${r}" data-r> <span class="fig-val" data-rv></span></label></div>
    <svg viewBox="0 0 300 200" class="pc-svg" role="img" aria-label="Caractéristique tension-intensité" data-svg></svg>
    <div class="fig-readout" data-txt></div>`);
  const dessiner = () => {
    const X = (i) => 40 + (i / 0.3) * 240, Y = (u) => 170 - (u / 12) * 150;
    let s = `<line x1="40" y1="170" x2="290" y2="170" class="pc-trait"/><line x1="40" y1="170" x2="40" y2="12" class="pc-trait"/>
      <text x="290" y="190" text-anchor="end" class="pc-petit">I (A)</text><text x="46" y="16" class="pc-petit">U (V)</text>`;
    for (let k = 1; k <= 3; k++) s += `<line x1="${X(k * 0.1)}" y1="170" x2="${X(k * 0.1)}" y2="174" class="pc-trait"/><text x="${X(k * 0.1)}" y="186" text-anchor="middle" class="pc-petit">${nb(k * 0.1, 1)}</text>`;
    for (let k = 3; k <= 12; k += 3) s += `<line x1="36" y1="${Y(k)}" x2="40" y2="${Y(k)}" class="pc-trait"/><text x="32" y="${Y(k) + 4}" text-anchor="end" class="pc-petit">${k}</text>`;
    const imax = Math.min(0.3, 12 / r);
    s += `<line x1="${X(0)}" y1="${Y(0)}" x2="${arrondi(X(imax), 1)}" y2="${arrondi(Y(r * imax), 1)}" class="pc-courbe"/>`;
    for (let k = 1; k <= 5; k++) { const i = (imax * k) / 5; s += `<circle cx="${arrondi(X(i), 1)}" cy="${arrondi(Y(r * i), 1)}" r="4" class="pc-point-mesure"/>`; }
    $(wrap, '[data-svg]').innerHTML = s;
    $(wrap, '[data-rv]').textContent = `${r} Ω`;
    $(wrap, '[data-txt]').innerHTML = `Les points sont alignés avec l'origine : U est proportionnelle à I. Le coefficient de proportionnalité est la résistance : U = <strong>${r}</strong> × I.`;
  };
  $(wrap, '[data-r]').addEventListener('input', (ev) => { r = +ev.target.value; dessiner(); });
  dessiner();
}

// ================================================ COMPTEUR ÉLECTRIQUE

export const APPAREILS = [
  ['lampe LED', 10], ['box internet', 15], ['ordinateur portable', 60], ['télévision', 100],
  ['réfrigérateur', 150], ['aspirateur', 800], ['sèche-cheveux', 1500], ['bouilloire', 2000], ['four', 2500],
];

/** On allume des appareils : la puissance s'additionne, le disque du compteur tourne plus vite. */
export function compteur(host) {
  const allumes = new Set([0, 3]);
  let heures = 2, angle = 0;
  const wrap = cadre(host, `
    <div class="pc-appareils">${APPAREILS.map(([n, p], k) => `<label class="pc-case"><input type="checkbox" data-app="${k}" ${allumes.has(k) ? 'checked' : ''}> ${n} <small>${p} W</small></label>`).join('')}</div>
    <div class="fig-controls"><label>Durée <input type="range" min="0.5" max="10" step="0.5" value="${heures}" data-h> <span class="fig-val" data-hv></span></label></div>
    <svg viewBox="0 0 320 120" class="pc-svg" role="img" aria-label="Compteur électrique" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const puissance = () => [...allumes].reduce((s, k) => s + APPAREILS[k][1], 0);
  const dessiner = () => {
    const P = puissance();
    svg.innerHTML = `<rect x="20" y="10" width="140" height="100" rx="12" class="pc-boitier"/>
      <rect x="36" y="22" width="108" height="30" rx="4" class="pc-lcd-svg"/><text x="136" y="43" text-anchor="end" class="pc-lcd-texte">${String(P).padStart(4, '0')} W</text>
      <g style="transform:rotate(${arrondi(angle, 1)}deg);transform-origin:90px 82px"><ellipse cx="90" cy="82" rx="30" ry="9" class="pc-disque"/><rect x="86" y="74" width="8" height="5" class="pc-marque"/></g>
      <text x="180" y="40" class="pc-etiquette">P = ${P} W</text><text x="180" y="62" class="pc-petit">soit ${nb(P / 1000, 3)} kW</text>`;
  };
  const maj = () => {
    const P = puissance(), E = (P / 1000) * heures;
    $(wrap, '[data-hv]').textContent = `${nb(heures, 1)} h`;
    $(wrap, '[data-txt]').innerHTML = `E = P × t = ${nb(P / 1000, 3)} kW × ${nb(heures, 1)} h = <strong>${nb(E, 3)} kWh</strong> (soit ${nb(E * 3.6e6 / 1e6, 2)} MJ).<br>À 0,25 € le kWh, cela coûte environ <strong>${nb(E * 0.25, 2)} €</strong>.`;
    dessiner();
  };
  const etat = animer(wrap, (dt) => { angle = (angle + dt * puissance() * 0.12) % 360; dessiner(); });
  lierLecture(wrap, etat);
  wrap.querySelectorAll('[data-app]').forEach((c) => c.addEventListener('change', () => {
    const k = +c.dataset.app; if (c.checked) allumes.add(k); else allumes.delete(k); maj();
  }));
  $(wrap, '[data-h]').addEventListener('input', (ev) => { heures = +ev.target.value; maj(); });
  maj();
}

// ================================================================ SON

/**
 * Onde sonore : les particules de l'air se serrent et s'écartent (compressions),
 * l'oscillogramme montre la période ; on peut écouter le son.
 */
export function ondeSonore(host) {
  let f = 440, vide = false, contexte = null;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Fréquence <input type="range" min="100" max="2000" step="20" value="${f}" data-f> <span class="fig-val" data-fv></span></label></div>
    <label class="pc-case"><input type="checkbox" data-vide> faire le vide (plus d'air)</label>
    <svg viewBox="0 0 320 200" class="pc-svg" role="img" aria-label="Propagation d'une onde sonore et oscillogramme" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-ecouter>Écouter 1 seconde</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const dessiner = (t) => {
    // Longueur d'onde affichée : plus la fréquence est grande, plus les compressions sont rapprochées.
    const lambda = 20 + 3800 / f, omega = 5;
    let s = `<rect x="6" y="18" width="20" height="54" rx="4" class="pc-haut-parleur"/><path d="M26 26 L40 12 V78 L26 64z" class="pc-haut-parleur"/>`;
    if (!vide) {
      for (let col = 0; col < 26; col++) {
        const x0 = 48 + col * 10.5, dx = 4 * Math.sin(omega * t - (2 * Math.PI * (x0 - 48)) / lambda);
        for (let lig = 0; lig < 5; lig++) s += `<circle cx="${arrondi(x0 + dx + (lig % 2) * 3, 1)}" cy="${22 + lig * 11}" r="2.2" class="pc-particule"/>`;
      }
    } else s += `<text x="180" y="50" text-anchor="middle" class="pc-petit">vide : aucune particule à mettre en mouvement</text>`;
    // Oscillogramme (période lisible)
    s += `<rect x="40" y="100" width="270" height="90" rx="6" class="pc-ecran"/>`;
    for (let k = 1; k < 10; k++) s += `<line x1="${40 + k * 27}" y1="100" x2="${40 + k * 27}" y2="190" class="pc-grille"/>`;
    let d = '';
    const periodePx = (27 * 5 * 100) / f; // base de temps fixe : 5 carreaux = 10 ms à 100 Hz
    for (let px = 0; px <= 270; px += 2) d += `${px ? 'L' : 'M'}${40 + px} ${arrondi(145 - (vide ? 0 : 30 * Math.sin((2 * Math.PI * px) / periodePx - omega * t)), 1)} `;
    s += `<path d="${d}" class="pc-signal"/>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    $(wrap, '[data-fv]').textContent = `${f} Hz`;
    const T = 1000 / f;
    $(wrap, '[data-txt]').innerHTML = vide
      ? "Dans le vide, le son ne se propage pas : il a besoin d'un <strong>milieu matériel</strong> (air, eau, solide)."
      : `f = <strong>${f} Hz</strong> : ${f} vibrations par seconde, période T = 1/f ≈ <strong>${nb(T, 2)} ms</strong>. ${f < 300 ? 'Son grave.' : f > 1000 ? 'Son aigu.' : 'Son médium.'} Domaine audible de l'être humain : de 20 Hz à 20 000 Hz.`;
  };
  const etat = animer(wrap, (dt, t) => dessiner(t));
  lierLecture(wrap, etat);
  $(wrap, '[data-f]').addEventListener('input', (ev) => { f = +ev.target.value; maj(); });
  $(wrap, '[data-vide]').addEventListener('change', (ev) => { vide = ev.target.checked; maj(); dessiner(etat.t); });
  $(wrap, '[data-ecouter]').addEventListener('click', () => {
    if (vide) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    contexte = contexte || new AC();
    const o = contexte.createOscillator(), g = contexte.createGain(), t0 = contexte.currentTime;
    o.frequency.value = f; o.type = 'sine';
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.12, t0 + 0.05); g.gain.linearRampToValueAtTime(0, t0 + 1);
    o.connect(g).connect(contexte.destination); o.start(t0); o.stop(t0 + 1.05);
  });
  maj(); dessiner(0);
}

/** Orage : l'éclair se voit aussitôt, le tonnerre arrive plus tard (d = 340 × t). */
export function orage(host) {
  let d = 1700, t = 0, flash = 0;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Distance de l'orage <input type="range" min="340" max="5100" step="340" value="${d}" data-d> <span class="fig-val" data-dv></span></label></div>
    <svg viewBox="0 0 320 130" class="pc-svg" role="img" aria-label="Éclair et tonnerre" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    const echelle = 250 / 5100, xObs = 290, xOrage = xObs - d * echelle;
    const duree = d / 340, rOnde = Math.max(0, t) * 340 * echelle;
    svg.innerHTML = `<rect x="0" y="0" width="320" height="130" class="pc-ciel" opacity="${arrondi(0.15 + flash * 0.6, 2)}"/>
      <path d="M${arrondi(xOrage - 18, 1)} 20 h36 a14 14 0 0 0 -8 -14 a18 18 0 0 0 -30 4 a12 12 0 0 0 2 10z" class="pc-nuage"/>
      <path d="M${arrondi(xOrage, 1)} 24 l-8 26 h9 l-7 28" class="pc-eclair" opacity="${arrondi(flash, 2)}"/>
      ${t > 0 && t < duree ? `<circle cx="${arrondi(xOrage, 1)}" cy="90" r="${arrondi(rOnde, 1)}" class="pc-onde-son"/>` : ''}
      <line x1="0" y1="110" x2="320" y2="110" class="pc-sol"/>
      <circle cx="${xObs}" cy="96" r="6" class="pc-balle"/><rect x="${xObs - 4}" y="102" width="8" height="8" class="pc-balle"/>
      <text x="${xObs}" y="126" text-anchor="middle" class="pc-petit">toi</text>
      ${t >= duree && t < duree + 1 ? `<text x="${xObs - 10}" y="80" text-anchor="end" class="pc-etiquette">BOUM !</text>` : ''}
      <text x="8" y="126" class="pc-petit">${t > 0 ? `${nb(Math.min(t, duree), 1)} s` : ''}</text>`;
  };
  const maj = () => {
    const duree = d / 340;
    $(wrap, '[data-dv]').textContent = `${nb(d / 1000, 2)} km`;
    $(wrap, '[data-txt]').innerHTML = `La lumière (300 000 km/s) arrive quasi instantanément. Le son (340 m/s) met <strong>${nb(duree, 1)} s</strong> : d = 340 × ${nb(duree, 1)} = <strong>${d} m</strong>.<br>Astuce : compte les secondes entre l'éclair et le tonnerre, divise par 3 : tu as la distance en km.`;
    t = -0.5;
  };
  const etat = animer(wrap, (dt) => {
    t += dt; flash = t >= 0 && t < 0.25 ? 1 : Math.max(0, flash - dt * 4);
    if (t > d / 340 + 2) t = -0.5;
    dessiner();
  });
  lierLecture(wrap, etat);
  $(wrap, '[data-d]').addEventListener('input', (ev) => { d = +ev.target.value; maj(); });
  maj(); dessiner();
}

// ================================================== PETITS SCHÉMAS FIXES

/** Schéma d'un circuit simple (pour les énoncés) : pile, résistance, ampèremètre. */
export const schemaCircuit = ({ U, R, I } = {}) => `<svg viewBox="0 0 260 140" class="pc-svg pc-schema" role="img" aria-label="Schéma d'un circuit en série">
  <path d="M30 30 H230 V110 H30 Z" class="pc-fil"/>
  <rect x="16" y="56" width="28" height="30" class="pc-cache"/>
  <line x1="14" y1="62" x2="46" y2="62" class="pc-borne"/><line x1="22" y1="74" x2="38" y2="74" class="pc-borne pc-borne-epaisse"/>
  <rect x="100" y="20" width="60" height="20" rx="3" class="pc-resistance"/>
  <circle cx="230" cy="70" r="15" class="pc-cache pc-contour"/><text x="230" y="76" text-anchor="middle" class="pc-appareil">A</text>
  ${U != null ? `<text x="52" y="72" class="pc-etiquette">${U}</text>` : ''}${R != null ? `<text x="130" y="14" text-anchor="middle" class="pc-etiquette">${R}</text>` : ''}
  ${I != null ? `<text x="222" y="102" text-anchor="end" class="pc-etiquette">${I}</text>` : ''}
</svg>`;

/** Chronophotographie fixe (pour les énoncés) : positions données. */
export const schemaChrono = (xs, { etiquette = true } = {}) => `<svg viewBox="0 0 320 70" class="pc-svg pc-schema" role="img" aria-label="Positions successives d'un mobile">
  <line x1="10" y1="34" x2="310" y2="34" class="pc-trajectoire"/>
  ${xs.map((x, k) => `<circle cx="${arrondi(10 + x, 1)}" cy="34" r="6" class="pc-position"/>${etiquette ? `<text x="${arrondi(10 + x, 1)}" y="60" text-anchor="middle" class="pc-petit">t${k}</text>` : ''}`).join('')}
</svg>`;

/** Barre d'échelle de pH (fixe) avec un repère. */
export const schemaPH = (p) => {
  let s = `<svg viewBox="0 0 320 70" class="pc-svg pc-schema" role="img" aria-label="Échelle de pH"><defs><linearGradient id="ph-s">`;
  for (let k = 0; k <= 14; k += 2) s += `<stop offset="${k / 14}" stop-color="${couleurPH(k)}"/>`;
  s += `</linearGradient></defs><rect x="14" y="26" width="292" height="14" rx="7" fill="url(#ph-s)"/>`;
  for (let k = 0; k <= 14; k += 2) s += `<text x="${14 + (k / 14) * 292}" y="58" text-anchor="middle" class="pc-petit">${k}</text>`;
  if (p != null) s += `<path d="M${arrondi(14 + (p / 14) * 292, 1)} 22 l-6 -10 h12z" class="pc-repere-actif"/>`;
  return s + '</svg>';
};

export { tex, cadre, lierLecture, boutonLecture, nb };
