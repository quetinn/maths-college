// =====================================================================
//  figures.js — Schémas et figures animées de technologie
//
//  Mêmes règles que les figures de physique-chimie et de SVT : une figure
//  est une fonction (host, options) ; les fonctions `schema…` renvoient une
//  chaîne SVG (visuels d'exercices), pour tourner aussi dans le banc de test.
// =====================================================================

import { cadre } from '../physique/figures.js';
import { segments, lierSegments } from '../physique/figures_cycle.js';

const $ = (w, s) => w.querySelector(s);
const r1 = (x) => Math.round(x * 10) / 10;

// ============================================================ SCHÉMA-BLOC

/**
 * Chaîne en schéma-bloc, lue de haut en bas.
 *   blocs : [{ nom, role }]  — le constituant et sa fonction ;
 *   flux  : étiquettes des flèches (une avant chaque bloc, une après le dernier) ;
 *   ordre : si donné, les noms sont remplacés par des repères numérotés
 *           (le repère k + 1 désigne ordre[k]) : schéma à légender.
 */
export function schemaBloc({ blocs, flux = [], ordre = null, label = 'Schéma-bloc' }) {
  const W = 300, LB = 190, HB = 40, PAS = 74, x0 = (W - LB) / 2;
  const H = blocs.length * PAS + 34;
  const fleche = (y, texte) => `
    <g class="tk-flux"><path d="M${W / 2} ${y} V${y + 24}"/><polygon points="${W / 2 - 5},${y + 22} ${W / 2 + 5},${y + 22} ${W / 2},${y + 30}"/>
      ${texte ? `<text x="${W / 2 + 10}" y="${y + 18}" style="text-anchor:start">${texte}</text>` : ''}</g>`;
  let s = '';
  blocs.forEach((b, i) => {
    const y = i * PAS + 34;
    s += fleche(y - 34, flux[i]);
    const num = ordre ? ordre.indexOf(b.nom) + 1 : 0;
    s += `<g class="tk-bloc ${b.fort ? 'tk-fort' : ''}"><rect x="${x0}" y="${y}" width="${LB}" height="${HB}" rx="6"/>
      ${ordre
    ? `<text x="${W / 2 + 12}" y="${y + 25}">${b.role}</text><g class="tk-repere"><circle cx="${x0 + 20}" cy="${y + HB / 2}" r="11"/><text x="${x0 + 20}" y="${y + HB / 2 + 4}">${num}</text></g>`
    : `<text x="${W / 2}" y="${y + 17}">${b.nom}</text><text class="tk-role" x="${W / 2}" y="${y + 31}">${b.role}</text>`}</g>`;
  });
  if (flux[blocs.length]) s += fleche(blocs.length * PAS, flux[blocs.length]);
  return `<svg viewBox="0 0 ${W} ${H + (flux[blocs.length] ? 4 : -30)}" class="svg-plot fig-chap tk-schema" role="img" aria-label="${label}">${s}</svg>`;
}

/** Chaîne d'énergie type d'un objet à moteur électrique. */
export const CHAINE_ENERGIE = [
  { nom: 'batterie', role: 'alimenter' },
  { nom: 'relais', role: 'distribuer' },
  { nom: 'moteur électrique', role: 'convertir' },
  { nom: 'engrenages', role: 'transmettre' },
];
export const FLUX_ENERGIE = ['recharge', 'énergie électrique', 'énergie électrique', 'énergie mécanique', 'énergie mécanique : action'];

/** Chaîne d'information type d'un objet programmé. */
export const CHAINE_INFORMATION = [
  { nom: 'capteur', role: 'acquérir' },
  { nom: 'microcontrôleur', role: 'traiter' },
  { nom: 'afficheur', role: 'communiquer' },
];
export const FLUX_INFORMATION = ['grandeur physique', 'signal électrique', 'ordres, données', "information pour l'utilisateur"];

// ============================================================ ENGRENAGES

function roueDentee(cx, cy, r, n) {
  const p = (2 * Math.PI) / n, pts = [];
  for (let k = 0; k < n; k++) {
    [[-0.25, r - 5], [-0.12, r + 5], [0.12, r + 5], [0.25, r - 5]].forEach(([t, d]) => pts.push(`${r1(cx + d * Math.cos(k * p + t * p))},${r1(cy + d * Math.sin(k * p + t * p))}`));
  }
  return pts.join(' ');
}

/** Vitesse de la roue menée (tr/min) : les dents passent une à une, donc N1 × Z1 = N2 × Z2. */
export const vitesseMenee = (n1, z1, z2) => (n1 * z1) / z2;

/** Deux roues dentées : on choisit le nombre de dents de la roue menée et on lit sa vitesse. */
export function engrenages(host) {
  const Z1 = 12, N1 = 60;
  let z2 = 24;
  const wrap = cadre(host, `
    ${segments('Dents de la roue menée', [['8', '8 dents'], ['12', '12 dents'], ['24', '24 dents'], ['36', '36 dents']])}
    <svg viewBox="0 0 320 190" class="pc-svg tk-engrenage" role="img" aria-label="Deux roues dentées engrenées"><g data-roues></g></svg>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const dessiner = () => {
    // Rayon proportionnel au nombre de dents ; l'échelle garde la plus grande roue dans le cadre.
    const k = Math.min(3, 68 / Math.max(Z1, z2), 135 / (Z1 + z2));
    const ra = Z1 * k, rb = z2 * k, xa = r1(160 - rb), xb = r1(xa + ra + rb), cy = 84;
    const n2 = vitesseMenee(N1, Z1, z2);
    // Durée d'un tour (ralentie pour rester lisible) : la petite roue tourne plus vite.
    const da = 6, db = (da * z2) / Z1;
    $(wrap, '[data-roues]').innerHTML = `
      <g style="transform-origin:${xa}px ${cy}px;animation:roue ${da}s linear infinite"><polygon class="tk-noeud-roue" points="${roueDentee(xa, cy, ra, Z1)}" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/><circle cx="${xa}" cy="${cy}" r="5" fill="var(--accent)"/><path d="M${xa} ${cy} h${ra - 8}" stroke="var(--accent)" stroke-width="2"/></g>
      <g style="transform-origin:${xb}px ${cy}px;animation:roue ${db}s linear infinite reverse"><g transform="rotate(${180 / z2 + 180} ${xb} ${cy})"><polygon points="${roueDentee(xb, cy, rb, z2)}" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><circle cx="${xb}" cy="${cy}" r="5" fill="var(--text)"/><path d="M${xb} ${cy} h${rb - 8}" stroke="var(--text)" stroke-width="2"/></g></g>
      <text x="80" y="184" text-anchor="middle" class="pc-petit">menante : ${Z1} dents</text><text x="240" y="184" text-anchor="middle" class="pc-petit">menée : ${z2} dents</text>`;
    $(wrap, '[data-txt]').innerHTML = `Roue menante : ${Z1} dents, ${N1} tr/min. Roue menée : ${z2} dents, <strong>${String(r1(n2)).replace('.', ',')} tr/min</strong>. ` +
      (z2 > Z1 ? 'Elle a plus de dents : elle tourne <strong>moins vite</strong>, en sens inverse.' : z2 < Z1 ? 'Elle a moins de dents : elle tourne <strong>plus vite</strong>, en sens inverse.' : 'Même nombre de dents : même vitesse, en sens inverse.');
  };
  lierSegments(wrap, String(z2), (v) => { z2 = +v; dessiner(); });
  dessiner();
}

// ============================================================ OCTET

/** Un octet : huit bits à basculer, sa valeur décimale et le caractère ASCII correspondant. */
export function octet(host, { depart = 65 } = {}) {
  let v = depart;
  const wrap = cadre(host, `
    <div class="pc-boutons tk-bits" role="group" aria-label="Les huit bits de l'octet">${[7, 6, 5, 4, 3, 2, 1, 0].map((k) => `<button type="button" class="pc-seg" data-bit="${k}" aria-label="bit de poids ${2 ** k}"></button>`).join('')}</div>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const maj = () => {
    wrap.querySelectorAll('[data-bit]').forEach((b) => { const un = (v >> +b.dataset.bit) & 1; b.textContent = un; b.setAttribute('aria-pressed', String(!!un)); });
    const poids = [7, 6, 5, 4, 3, 2, 1, 0].filter((k) => (v >> k) & 1).map((k) => 2 ** k);
    const car = v >= 33 && v <= 126 ? `Dans le code ASCII, ${v} est le caractère « <strong>${String.fromCharCode(v).replace('<', '&lt;').replace('&', '&amp;')}</strong> ».` : v === 32 ? 'Dans le code ASCII, 32 est l\'espace.' : '';
    $(wrap, '[data-txt]').innerHTML = `Poids des bits : 128, 64, 32, 16, 8, 4, 2, 1. Valeur : ${poids.length ? poids.join(' + ') + ' = ' : ''}<strong>${v}</strong>. ${car}`;
  };
  wrap.querySelectorAll('[data-bit]').forEach((b) => b.addEventListener('click', () => { v ^= 1 << +b.dataset.bit; maj(); }));
  maj();
}

// ============================================================ RÉSEAU

/** Éléments du trajet d'une requête, de l'ordinateur au serveur. */
export const TRAJET_INTERNET = ['terminal', 'commutateur', 'routeur de la maison (box)', "routeur d'Internet", 'serveur'];

/**
 * Trajet d'une requête sur Internet : un paquet parcourt le chemin. Si `ordre`
 * est donné, les noms sont remplacés par des repères (le repère k + 1 désigne ordre[k]).
 */
export function schemaReseau(ordre = null) {
  const X = [34, 104, 174, 244, 310], Y = [118, 118, 66, 66, 118];
  const rond = [false, false, true, true, false];
  const noms = [['terminal'], ['commutateur'], ['routeur', 'de la maison'], ['routeur', "d'Internet"], ['serveur']];
  const chemin = X.map((x, i) => `${i ? 'L' : 'M'}${x} ${Y[i]}`).join(' ');
  let s = `<rect x="6" y="88" width="134" height="${ordre ? 62 : 86}" rx="10" class="tk-zone"/>
    <text x="73" y="${ordre ? 164 : 188}" text-anchor="middle" class="pc-petit">réseau local</text>
    <text x="209" y="14" text-anchor="middle" class="pc-petit">Internet : des routeurs reliés entre eux</text>
    <path class="tk-fil tk-fil-autre" d="M174 66 L150 34 M244 66 L226 30 M244 66 L276 32 M174 66 L204 34"/>
    <path class="tk-fil" d="${chemin}"/>
    <circle r="5.5" class="tk-paquet" style="offset-path:path('${chemin}')"/>`;
  TRAJET_INTERNET.forEach((nom, i) => {
    const forme = rond[i] ? `<circle cx="${X[i]}" cy="${Y[i]}" r="16"/>` : `<rect x="${X[i] - 19}" y="${Y[i] - 14}" width="38" height="28" rx="6"/>`;
    // Le nom s'écrit sous le nœud (au-dessus pour les routeurs), jamais dedans : il ne déborde pas.
    const yTexte = rond[i] ? Y[i] + 30 : Y[i] + 28;
    const etiquette = noms[i].map((ligne, k) => `<text x="${X[i]}" y="${yTexte + k * 11}">${ligne}</text>`).join('');
    s += `<g class="tk-noeud ${rond[i] ? 'tk-fort' : ''}">${forme}${ordre
      ? `<g class="tk-repere"><circle cx="${X[i]}" cy="${Y[i]}" r="10"/><text x="${X[i]}" y="${Y[i] + 4}">${ordre.indexOf(nom) + 1}</text></g>`
      : etiquette}</g>`;
  });
  return `<svg viewBox="0 0 344 ${ordre ? 170 : 194}" class="svg-plot fig-chap tk-schema" role="img" aria-label="Trajet d'une requête sur Internet">${s}</svg>`;
}

/** Anatomie d'une adresse IP : quatre nombres d'un octet chacun. */
export function schemaAdresseIP(adresse = '192.168.1.20') {
  const n = adresse.split('.');
  let s = '';
  n.forEach((v, i) => {
    const x = 22 + i * 72;
    s += `<g class="tk-noeud ${i === 3 ? 'tk-fort' : ''}"><rect x="${x}" y="40" width="56" height="34" rx="6"/></g><text x="${x + 28}" y="63" text-anchor="middle" class="pc-etiquette">${v}</text>
      ${i < 3 ? `<text x="${x + 64}" y="66" text-anchor="middle" class="pc-etiquette">.</text>` : ''}
      <text x="${x + 28}" y="88" text-anchor="middle" class="pc-petit">1 octet</text>`;
  });
  s += `<path class="tk-fil" d="M22 30 V24 H222 V30"/><text x="122" y="17" text-anchor="middle" class="pc-petit">désignent le réseau</text>
    <path class="tk-fil" d="M238 30 V24 H294 V30"/><text x="266" y="17" text-anchor="middle" class="pc-petit">la machine</text>
    <text x="158" y="108" text-anchor="middle" class="pc-petit">chaque nombre va de 0 à 255</text>`;
  return `<svg viewBox="0 0 316 114" class="svg-plot fig-chap tk-schema" role="img" aria-label="Structure d'une adresse IP">${s}</svg>`;
}

// ============================================================ LIGNÉES ET CYCLE DE VIE

/**
 * Frise d'une famille d'objets : objets = [{ nom, principe }]. Chaque changement
 * de principe technique est signalé comme une rupture.
 */
export function schemaLignee(objets, { label = "Évolution d'une famille d'objets" } = {}) {
  const W = 330, M = 44, pas = (W - 2 * M) / (objets.length - 1);
  const principes = [...new Set(objets.map((q) => q.principe))];
  let s = `<path class="tk-fil" d="M10 74 H${W - 10}"/><polygon points="${W - 10},68 ${W - 2},74 ${W - 10},80" fill="var(--text)"/>`;
  objets.forEach((o, i) => {
    const x = M + i * pas, rupture = i > 0 && objets[i - 1].principe !== o.principe, haut = i % 2 === 0;
    // Le mot « rupture » s'écrit tout en bas, entre deux objets : il ne croise aucun nom.
    if (rupture) s += `<path d="M${r1(x - pas / 2)} 50 V134" class="tk-rupture"/><text x="${r1(x - pas / 2)}" y="146" text-anchor="middle" class="tk-rupture-txt">rupture</text>`;
    const lignes = o.nom.split('|');
    s += `<circle cx="${r1(x)}" cy="74" r="7" class="tk-jalon tk-jalon-${principes.indexOf(o.principe) % 3}"/>
      ${lignes.map((l, k) => `<text x="${r1(x)}" y="${(haut ? 30 - (lignes.length - 1) * 12 : 98) + k * 12}" text-anchor="middle" class="tk-nom">${l}</text>`).join('')}
      <text x="${r1(x)}" y="${haut ? 46 : 98 + lignes.length * 12 + 2}" text-anchor="middle" class="pc-petit">${o.principe}</text>`;
  });
  return `<svg viewBox="0 0 ${W} 150" class="svg-plot fig-chap tk-schema" role="img" aria-label="${label}">${s}</svg>`;
}

const CYCLE = [
  ['Extraction', "On prélève les matières premières : minerais, pétrole, bois. C'est souvent l'étape qui abîme le plus les milieux."],
  ['Traitement', 'Les matières premières deviennent des matériaux : métal, plastique, verre.'],
  ['Fabrication', 'Les matériaux sont mis en forme pour donner des pièces.'],
  ['Assemblage', "Les pièces sont réunies pour former l'objet."],
  ['Utilisation', "L'objet rend son service. Il consomme de l'énergie et peut être réparé pour durer."],
  ['Fin de vie', "L'objet est réemployé, recyclé, ou devient un déchet."],
];

/** Le cycle de vie d'un objet : six étapes en boucle, à parcourir une à une. */
export function cycleDeVie(host) {
  let k = 0;
  const C = [160, 96], R = 70;
  const pos = (i) => [C[0] + R * Math.cos((i / 6) * 2 * Math.PI - Math.PI / 2), C[1] + R * Math.sin((i / 6) * 2 * Math.PI - Math.PI / 2)];
  const wrap = cadre(host, `
    <svg viewBox="0 0 320 196" class="pc-svg tk-cycle" role="img" aria-label="Cycle de vie d'un objet"><g data-cycle></g></svg>
    <div class="pc-boutons"><button type="button" class="btn btn-ghost" data-prec>Étape précédente</button><button type="button" class="btn btn-primary" data-suiv>Étape suivante</button></div>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const dessiner = () => {
    let s = `<circle cx="${C[0]}" cy="${C[1]}" r="${R}" class="tk-anneau"/><text x="${C[0]}" y="${C[1] - 4}" text-anchor="middle" class="pc-petit">transport entre</text><text x="${C[0]}" y="${C[1] + 9}" text-anchor="middle" class="pc-petit">chaque étape</text>`;
    CYCLE.forEach(([nom], i) => {
      const [x, y] = pos(i), a = i === k;
      const tx = x + (x > C[0] + 5 ? 16 : x < C[0] - 5 ? -16 : 0), ty = y + (i === 0 ? -17 : i === 3 ? 26 : 4);
      s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${a ? 13 : 9}" class="tk-etape ${a ? 'tk-etape-on' : ''}"/><text x="${r1(x)}" y="${r1(y + 4)}" text-anchor="middle" class="tk-etape-num">${i + 1}</text>
        <text x="${r1(tx)}" y="${r1(ty)}" text-anchor="${x > C[0] + 5 ? 'start' : x < C[0] - 5 ? 'end' : 'middle'}" class="tk-nom ${a ? 'tk-nom-on' : ''}">${nom}</text>`;
    });
    $(wrap, '[data-cycle]').innerHTML = s;
    $(wrap, '[data-txt]').innerHTML = `<strong>${k + 1}. ${CYCLE[k][0]}</strong> — ${CYCLE[k][1]}`;
  };
  $(wrap, '[data-suiv]').addEventListener('click', () => { k = (k + 1) % 6; dessiner(); });
  $(wrap, '[data-prec]').addEventListener('click', () => { k = (k + 5) % 6; dessiner(); });
  dessiner();
}

/** Étiquette énergie : sept classes, de A à G ; `classe` est mise en avant. */
export function schemaEtiquette(classe = 'B') {
  const L = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const s = L.map((l, i) => {
    const y = 8 + i * 21, w = 70 + i * 22;
    return `<path d="M10 ${y} H${w} l10 8.5 l-10 8.5 H10z" class="tk-classe tk-classe-${i}"/><text x="18" y="${y + 13}" class="tk-classe-txt">${l}</text>
      ${l === classe ? `<path d="M300 ${y} H262 l-10 8.5 l10 8.5 H300z" class="tk-classe-choix"/><text x="281" y="${y + 13}" text-anchor="middle" class="tk-classe-txt">${l}</text>` : ''}`;
  }).join('');
  return `<svg viewBox="0 0 310 160" class="svg-plot fig-chap tk-schema" role="img" aria-label="Étiquette énergie : classes de A à G, appareil de classe ${classe}">${s}</svg>`;
}

/** Coût total de deux appareils selon la durée d'utilisation (données d'exemple). */
export function coutTotal(host) {
  const A = { achat: 320, an: 50 }, B = { achat: 400, an: 30 };
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Durée d'utilisation <input type="range" min="0" max="12" step="1" value="2" data-n> <span class="fig-val" data-nv></span></label></div>
    <svg viewBox="0 0 320 150" class="pc-svg" role="img" aria-label="Coût total de deux appareils"><g data-barres></g></svg>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const dessiner = () => {
    const n = +$(wrap, '[data-n]').value, max = 1000;
    const barre = (o, y, nom, classe) => {
      const total = o.achat + o.an * n, wa = (o.achat / max) * 220, we = ((o.an * n) / max) * 220;
      return `<text x="8" y="${y + 17}" class="pc-petit">${nom}</text><rect x="70" y="${y}" width="${r1(wa)}" height="26" class="tk-cout-achat"/><rect x="${r1(70 + wa)}" y="${y}" width="${r1(we)}" height="26" class="${classe}"/>
        <text x="${r1(76 + wa + we)}" y="${y + 18}" class="pc-etiquette pc-etiquette-petite">${total} €</text>`;
    };
    $(wrap, '[data-barres]').innerHTML = barre(A, 22, 'Appareil A', 'tk-cout-energie') + barre(B, 76, 'Appareil B', 'tk-cout-energie') +
      `<rect x="70" y="128" width="12" height="12" class="tk-cout-achat"/><text x="88" y="138" class="pc-petit">achat</text><rect x="150" y="128" width="12" height="12" class="tk-cout-energie"/><text x="168" y="138" class="pc-petit">électricité</text>`;
    $(wrap, '[data-nv]').textContent = `${n} an${n > 1 ? 's' : ''}`;
    const ta = A.achat + A.an * n, tb = B.achat + B.an * n;
    $(wrap, '[data-txt]').innerHTML = `A : 320 € à l'achat, 50 € d'électricité par an. B : 400 € à l'achat, 30 € par an. ` +
      (ta < tb ? `Après ${n} an${n > 1 ? 's' : ''}, <strong>A</strong> reste le moins cher.` : ta === tb ? 'Après 4 ans, les deux appareils ont coûté <strong>autant</strong>.' : `Après ${n} ans, <strong>B</strong> est devenu le moins cher : il consomme moins.`);
  };
  $(wrap, '[data-n]').addEventListener('input', dessiner);
  dessiner();
}

// ============================================================ INTELLIGENCE ARTIFICIELLE

// Nuage de points fixe (deux groupes), pour les trois scènes.
const NUAGE = [[52, 48, 0], [70, 70, 0], [88, 44, 0], [64, 96, 0], [98, 78, 0], [112, 56, 0], [80, 112, 0], [196, 92, 1], [214, 116, 1], [232, 84, 1], [250, 108, 1], [222, 60, 1], [262, 74, 1], [240, 132, 1]];

/** Les trois grands types d'apprentissage, en trois scènes. */
export function apprentissage(host) {
  let mode = 'sup';
  const TXT = {
    sup: "<strong>Supervisé</strong> : chaque exemple porte une étiquette (rond ou carré). Le programme apprend la frontière qui les sépare, puis classe un exemple nouveau, marqué « ? ».",
    non: "<strong>Non supervisé</strong> : aucun exemple n'est étiqueté. Le programme repère seul deux groupes de points proches.",
    renf: "<strong>Par renforcement</strong> : le robot essaie des trajets. Il reçoit +1 quand il atteint la cible, −1 quand il heurte un mur, et retient ce qui rapporte le plus.",
  };
  const wrap = cadre(host, `
    ${segments("Type d'apprentissage", [['sup', 'Supervisé'], ['non', 'Non supervisé'], ['renf', 'Par renforcement']])}
    <svg viewBox="0 0 320 170" class="pc-svg tk-ia" role="img" aria-label="Types d'apprentissage"><g data-scene></g></svg>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const dessiner = () => {
    let s = '';
    if (mode === 'renf') {
      s = `<rect x="20" y="20" width="280" height="130" rx="8" class="tk-zone"/><rect x="130" y="20" width="14" height="80" class="tk-mur"/><rect x="200" y="70" width="14" height="80" class="tk-mur"/>
        <path d="M48 124 H112 V118" class="tk-essai tk-essai-ko"/><text x="118" y="112" class="tk-rupture-txt">−1</text>
        <path d="M48 124 V132 H172 V44 H262" class="tk-essai tk-essai-ok"/><text x="270" y="34" class="tk-gain">+1</text>
        <circle cx="48" cy="124" r="9" class="tk-etape-on tk-etape"/><text x="48" y="146" text-anchor="middle" class="pc-petit">robot</text>
        <path d="M262 36 l8 8 l-8 8 l-8 -8z" class="tk-cible"/><text x="262" y="66" text-anchor="middle" class="pc-petit">cible</text>`;
    } else {
      NUAGE.forEach(([x, y, g]) => {
        s += mode === 'sup' && g === 1 ? `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" class="tk-pt tk-pt-1"/>` : `<circle cx="${x}" cy="${y}" r="6.5" class="tk-pt ${mode === 'sup' ? 'tk-pt-0' : 'tk-pt-neutre'}"/>`;
      });
      s += mode === 'sup'
        ? '<path d="M160 14 L150 158" class="tk-frontiere"/><text x="166" y="24" class="pc-petit">frontière apprise</text><circle cx="182" cy="140" r="9" class="tk-pt tk-pt-neutre"/><text x="182" y="144" text-anchor="middle" class="tk-etape-num" style="fill:var(--text)">?</text>'
        : '<ellipse cx="82" cy="78" rx="52" ry="50" class="tk-groupe"/><ellipse cx="230" cy="98" rx="50" ry="50" class="tk-groupe"/><text x="82" y="150" text-anchor="middle" class="pc-petit">groupe 1</text><text x="230" y="164" text-anchor="middle" class="pc-petit">groupe 2</text>';
    }
    $(wrap, '[data-scene]').innerHTML = s;
    $(wrap, '[data-txt]').innerHTML = TXT[mode];
  };
  lierSegments(wrap, mode, (v) => { mode = v; dessiner(); });
  dessiner();
}

/** Deux barres : des données d'entraînement équilibrées ou non. */
export function schemaDonnees(a, b, nomA = 'pommes', nomB = 'poires') {
  const max = Math.max(a, b), h = (v) => r1((v / max) * 96);
  return `<svg viewBox="0 0 300 150" class="svg-plot fig-chap tk-schema" role="img" aria-label="Répartition des données d'entraînement">
    <path class="tk-fil" d="M40 12 V122 H280"/>
    <g class="tk-barre"><rect x="80" y="${122 - h(a)}" width="56" height="${h(a)}" rx="4"/><rect x="176" y="${122 - h(b)}" width="56" height="${h(b)}" rx="4"/>
    <text x="108" y="${116 - h(a)}" text-anchor="middle">${a} photos</text><text x="204" y="${116 - h(b)}" text-anchor="middle">${b} photos</text>
    <text x="108" y="138" text-anchor="middle">${nomA}</text><text x="204" y="138" text-anchor="middle">${nomB}</text></g></svg>`;
}

// ============================================================ DÉPANNAGE ET PROCÉDÉS

/** Dépannage : on choisit une panne et on lit les tensions le long de la chaîne d'énergie. */
export function depannage(host) {
  let panne = 'relais';
  const U = 12, noms = ['batterie', 'relais', 'moteur'];
  const TXT = {
    batterie: 'La tension est nulle dès la batterie : elle est <strong>déchargée ou hors service</strong>. Inutile de chercher plus loin.',
    relais: "La batterie fournit 12 V, mais la tension disparaît après le relais : le <strong>relais</strong> ne laisse pas passer l'énergie.",
    moteur: "Le moteur reçoit bien 12 V et ne tourne pas : c'est le <strong>moteur</strong> qui est en cause.",
  };
  const wrap = cadre(host, `
    ${segments('Constituant en panne', [['batterie', 'Panne 1'], ['relais', 'Panne 2'], ['moteur', 'Panne 3']])}
    <svg viewBox="0 0 320 132" class="pc-svg" role="img" aria-label="Mesures de tension le long de la chaîne d'énergie"><g data-chaine></g></svg>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const dessiner = () => {
    const mesures = panne === 'batterie' ? [0, 0, 0] : panne === 'relais' ? [U, 0, 0] : [U, U, U];
    const points = ['bornes de la batterie', 'sortie du relais', 'bornes du moteur'];
    let s = '<path class="tk-fil" d="M60 44 H260"/>';
    noms.forEach((nom, i) => {
      const x = 60 + i * 100;
      s += `<g class="tk-noeud ${nom === panne ? 'tk-panne' : ''}"><rect x="${x - 36}" y="28" width="72" height="32" rx="6"/><text x="${x}" y="48">${nom}</text></g>
        <path class="tk-sonde" d="M${x + (i < 2 ? 36 : 0)} ${i < 2 ? 44 : 60} V82"/>
        <g class="tk-mesure ${mesures[i] ? 'tk-mesure-ok' : 'tk-mesure-ko'}"><rect x="${x + (i < 2 ? 36 : 0) - 24}" y="82" width="48" height="24" rx="5"/><text x="${x + (i < 2 ? 36 : 0)}" y="99">${mesures[i]} V</text></g>
        <text x="${x + (i < 2 ? 36 : 0)}" y="122" text-anchor="middle" class="pc-petit">${points[i].replace('bornes de la ', '').replace('bornes du ', '').replace('sortie du ', 'après le ')}</text>`;
    });
    $(wrap, '[data-chaine]').innerHTML = s;
    $(wrap, '[data-txt]').innerHTML = `Le moteur ne tourne pas. ${TXT[panne]}`;
  };
  lierSegments(wrap, panne, (v) => { panne = v; dessiner(); });
  dessiner();
}

/** Les trois familles de procédés, en trois pictogrammes. */
export function schemaProcedes() {
  return `<svg viewBox="0 0 330 124" class="svg-plot fig-chap tk-schema" role="img" aria-label="Ajout de matière, enlèvement de matière, mise en forme">
    <g class="tk-piece">${[0, 1, 2, 3].map((k) => `<rect x="${28 + k * 3}" y="${70 - k * 9}" width="${54 - k * 6}" height="8" rx="2"/>`).join('')}</g>
    <path class="tk-outil" d="M56 14 v20 l-5 8 M56 34 l5 8"/>
    <text x="55" y="98" text-anchor="middle" class="tk-nom">ajout de matière</text><text x="55" y="112" text-anchor="middle" class="pc-petit">impression 3D</text>
    <g class="tk-piece"><path d="M132 40 H198 V78 H132z"/></g><circle cx="165" cy="59" r="9" class="tk-trou"/><path class="tk-outil" d="M165 10 V50"/>
    <path class="tk-copeau" d="M180 44 q8 -8 14 -2 M150 46 q-8 -8 -14 -1"/>
    <text x="165" y="98" text-anchor="middle" class="tk-nom">enlèvement</text><text x="165" y="112" text-anchor="middle" class="pc-petit">perçage, découpe</text>
    <g class="tk-piece"><path d="M244 74 H282 L306 40 l5 4 L286 80 H244z"/></g><path class="tk-outil" d="M296 24 a26 26 0 0 1 14 12"/><polygon points="310,36 312,28 304,31" class="tk-outil-plein"/>
    <text x="276" y="98" text-anchor="middle" class="tk-nom">mise en forme</text><text x="276" y="112" text-anchor="middle" class="pc-petit">pliage</text></svg>`;
}

// ============================================================ PROGRAMME ET VALIDATION

/** Alerte de proximité : on déplace l'obstacle et on voit quelle branche du programme s'exécute. */
export function simulateurAlerte(host, { seuil = 30 } = {}) {
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Distance de l'obstacle <input type="range" min="5" max="80" step="5" value="55" data-d> <span class="fig-val" data-dv></span></label></div>
    <svg viewBox="0 0 320 96" class="pc-svg" role="img" aria-label="Capteur de distance et obstacle"><g data-scene></g></svg>
    <div class="tk-branches"><div data-si><b>si</b> distance &lt; ${seuil} <b>alors</b> allumer la LED, activer le signal sonore</div><div data-sinon><b>sinon</b> éteindre la LED</div></div>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const dessiner = () => {
    const d = +$(wrap, '[data-d]').value, vrai = d < seuil, x = 60 + d * 3;
    $(wrap, '[data-scene]').innerHTML = `<rect x="14" y="34" width="40" height="30" rx="6" class="tk-capteur"/><text x="34" y="80" text-anchor="middle" class="pc-petit">capteur</text>
      <path d="M58 49 H${x - 4}" class="tk-onde"/><text x="${r1((58 + x) / 2)}" y="40" text-anchor="middle" class="pc-petit">${d} cm</text>
      <path d="M${60 + seuil * 3} 14 V84" class="tk-rupture"/><text x="${60 + seuil * 3}" y="94" text-anchor="middle" class="tk-rupture-txt">seuil : ${seuil} cm</text>
      <rect x="${x}" y="20" width="10" height="58" rx="2" class="tk-mur"/>
      <circle cx="34" cy="18" r="8" class="${vrai ? 'tk-led-on' : 'tk-led-off'}"/>`;
    $(wrap, '[data-dv]').textContent = `${d} cm`;
    $(wrap, '[data-si]').className = vrai ? 'tk-branche-on' : '';
    $(wrap, '[data-sinon]').className = vrai ? '' : 'tk-branche-on';
    $(wrap, '[data-txt]').innerHTML = `${d} ${vrai ? '&lt;' : '≥'} ${seuil} : la condition est <strong>${vrai ? 'vraie' : 'fausse'}</strong>. Le programme exécute la branche « ${vrai ? 'alors' : 'sinon'} » : la LED est <strong>${vrai ? 'allumée' : 'éteinte'}</strong>.`;
  };
  $(wrap, '[data-d]').addEventListener('input', dessiner);
  dessiner();
}

/** Valider une mesure : valeur attendue, tolérance, valeur mesurée réglable. */
export function validation(host, { attendu = 200, tolerance = 5 } = {}) {
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Valeur mesurée <input type="range" min="${attendu - 30}" max="${attendu + 30}" step="2" value="${attendu + 6}" data-m> <span class="fig-val" data-mv></span></label></div>
    <svg viewBox="0 0 320 84" class="pc-svg" role="img" aria-label="Valeur mesurée et intervalle de tolérance"><g data-axe></g></svg>
    <div class="fig-readout" data-txt></div>`, 'tk-fig');
  const X = (v) => r1(160 + (v - attendu) * 4.6);
  const dessiner = () => {
    const m = +$(wrap, '[data-m]').value, ecart = Math.abs(m - attendu), p = Math.round((ecart / attendu) * 1000) / 10, ok = p <= tolerance;
    const lim = (attendu * tolerance) / 100;
    $(wrap, '[data-axe]').innerHTML = `<rect x="${X(attendu - lim)}" y="26" width="${r1(lim * 9.2)}" height="22" class="tk-tolerance"/>
      <path class="tk-fil" d="M14 37 H306"/><path class="tk-fil" d="M160 22 V52"/>
      <text x="160" y="16" text-anchor="middle" class="pc-petit">attendu : ${attendu} cm</text><text x="160" y="66" text-anchor="middle" class="pc-petit">zone acceptée : ± ${tolerance} %</text>
      <circle cx="${X(m)}" cy="37" r="7" class="${ok ? 'tk-led-ok' : 'tk-led-on'}"/><text x="${X(m)}" y="80" text-anchor="middle" class="tk-nom">${m} cm</text>`;
    $(wrap, '[data-mv]').textContent = `${m} cm`;
    $(wrap, '[data-txt]').innerHTML = `Écart : ${ecart} cm, soit ${String(p).replace('.', ',')} % de la valeur attendue. La mesure est <strong>${ok ? 'conforme' : 'non conforme'}</strong>.`;
  };
  $(wrap, '[data-m]').addEventListener('input', dessiner);
  dessiner();
}

// ============================================================ PLANNING

/**
 * Diagramme de planification : taches = [{ nom, debut, duree }] (en séances).
 * Chaque barre commence à `debut` et dure `duree`.
 */
export function schemaPlanning(taches, { unite = 'séance' } = {}) {
  const fin = Math.max(...taches.map((t) => t.debut + t.duree));
  const X0 = 118, W = 320, pas = (W - X0 - 10) / fin, H = taches.length * 24 + 34;
  let s = '<g class="tk-grille">';
  for (let k = 0; k <= fin; k++) s += `<line x1="${r1(X0 + k * pas)}" y1="18" x2="${r1(X0 + k * pas)}" y2="${H - 12}"/>`;
  s += '</g><g class="tk-barre">';
  for (let k = 1; k <= fin; k++) s += `<text x="${r1(X0 + (k - 0.5) * pas)}" y="13" text-anchor="middle">${k}</text>`;
  taches.forEach((t, i) => {
    const y = 22 + i * 24;
    s += `<text x="${X0 - 6}" y="${y + 13}" text-anchor="end">${t.nom}</text><rect x="${r1(X0 + t.debut * pas)}" y="${y}" width="${r1(t.duree * pas)}" height="16" rx="3"/>`;
  });
  s += `<text x="${X0}" y="${H - 1}">${unite}s</text></g>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="svg-plot fig-chap tk-schema" role="img" aria-label="Diagramme de planification des tâches">${s}</svg>`;
}
