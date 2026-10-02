// =====================================================================
//  figures.js — Figures animées et schémas de SVT
//
//  Mêmes règles que les figures de physique-chimie : une figure est une
//  fonction (host, options) ; l'animation montre un phénomène ; le SVG est
//  écrit en chaînes pour tourner aussi dans le banc de test.
//  Les fonctions `schema…` renvoient une chaîne SVG (visuels d'exercices).
// =====================================================================

import { arrondi } from '../commun.js';
import { animer, cadre, lierLecture, boutonLecture } from '../physique/figures.js';
import { segments, lierSegments } from '../physique/figures_cycle.js';

const $ = (w, s) => w.querySelector(s);
const r1 = (x) => arrondi(x, 1);

// ======================================================= DOUBLE HÉLICE

/**
 * Double hélice d'ADN vue de profil, entre x0 et x1. `phase` la fait tourner.
 * `gene: [xa, xb]` colore une portion (un gène).
 */
function helice({ x0 = 20, x1 = 300, cy = 95, amp = 26, periode = 70, phase = 0, gene = null } = {}) {
  const y = (x, signe) => cy + signe * amp * Math.sin((2 * Math.PI * (x - x0)) / periode + phase);
  const brin = (signe, a = x0, b = x1) => {
    let d = '';
    for (let x = a; x <= b; x += 4) d += `${d ? 'L' : 'M'}${r1(x)} ${r1(y(x, signe))}`;
    return d;
  };
  let barreaux = '';
  for (let x = x0 + 6, k = 0; x < x1; x += periode / 6, k++) {
    barreaux += `<line x1="${r1(x)}" y1="${r1(y(x, 1))}" x2="${r1(x)}" y2="${r1(y(x, -1))}" class="sv-base sv-base-${k % 4}"/>`;
  }
  return `${barreaux}
    <path d="${brin(1)}" class="sv-brin"/><path d="${brin(-1)}" class="sv-brin"/>
    ${gene ? `<path d="${brin(1, gene[0], gene[1])}" class="sv-brin sv-gene"/><path d="${brin(-1, gene[0], gene[1])}" class="sv-brin sv-gene"/>` : ''}`;
}

/** Un chromosome simple (bâtonnet à deux bras), de hauteur h, posé sur la ligne y. */
const batonnet = (x, y, h, classe = '') => {
  const haut = h * 0.42;
  return `<g class="sv-chr ${classe}"><line x1="${x}" y1="${r1(y - h)}" x2="${x}" y2="${r1(y - h + haut - 2)}"/><line x1="${x}" y1="${r1(y - h + haut + 2)}" x2="${x}" y2="${y}"/></g>`;
};

// ================================================ DU CORPS AU GÈNE (zoom)

const ECHELLES = [
  ['organisme', 'Organisme', "Un être humain est formé de dizaines de milliers de milliards de <strong>cellules</strong>."],
  ['cellule', 'Cellule', "Une cellule est invisible à l'œil nu. Elle est limitée par une membrane et contient un <strong>noyau</strong>."],
  ['noyau', 'Noyau', "Le noyau de chaque cellule renferme <strong>46 chromosomes</strong> : la même information génétique dans toutes les cellules du corps."],
  ['chromosome', 'Chromosome', "Un chromosome est fait d'une très longue molécule d'<strong>ADN</strong>, enroulée et compactée."],
  ['adn', 'ADN', "La molécule d'ADN a la forme d'une <strong>double hélice</strong>. Très fine et très longue, elle est pelotonnée dans le chromosome."],
  ['gene', 'Gène', "Un <strong>gène</strong> est une portion de la molécule d'ADN. Il détermine un caractère héréditaire. L'être humain en possède plus de 20 000."],
];

function sceneEchelle(niveau) {
  if (niveau === 'organisme') {
    return `
      <circle cx="160" cy="34" r="17" class="sv-corps"/>
      <path d="M135 62 Q160 52 185 62 L180 122 H140Z" class="sv-corps"/>
      <path d="M137 66 L112 112 M183 66 L208 112 M148 122 V176 M172 122 V176" class="sv-membre"/>
      <circle cx="208" cy="112" r="15" class="sv-loupe"/>
      <text x="232" y="108" class="pc-petit">peau de</text><text x="232" y="121" class="pc-petit">la main</text>`;
  }
  if (niveau === 'cellule') {
    return `
      <path d="M60 96 C56 40 120 22 176 30 C246 38 276 70 262 118 C250 160 190 172 130 162 C84 154 62 134 60 96Z" class="sv-cellule"/>
      <circle cx="176" cy="94" r="32" class="sv-noyau"/>
      <circle cx="104" cy="80" r="5" class="sv-organite"/><circle cx="118" cy="128" r="6" class="sv-organite"/><circle cx="228" cy="124" r="5" class="sv-organite"/><circle cx="222" cy="62" r="4" class="sv-organite"/>
      <text x="176" y="98" text-anchor="middle" class="pc-petit">noyau</text>
      <text x="96" y="106" class="pc-petit">cytoplasme</text>
      <text x="56" y="28" class="pc-petit">membrane</text><path d="M84 32 L96 46" class="pc-trait"/>`;
  }
  if (niveau === 'noyau') {
    let s = '<circle cx="160" cy="95" r="84" class="sv-noyau"/>';
    for (let i = 0; i < 23; i++) {
      const a = i * 2.39996, r = 13 * Math.sqrt(i + 0.6), x = 160 + r * Math.cos(a), y = 99 + r * Math.sin(a);
      s += `<g transform="rotate(${(i * 47) % 180} ${r1(x)} ${r1(y)})">${batonnet(r1(x - 3), r1(y + 8), 16 - (i % 5))}${batonnet(r1(x + 3), r1(y + 8), 16 - (i % 5))}</g>`;
    }
    return s;
  }
  if (niveau === 'chromosome') {
    return `
      <path d="M128 26 L186 164 M192 26 L134 164" class="sv-chr-grand"/>
      <circle cx="160" cy="95" r="9" class="sv-centromere"/>
      <text x="212" y="60" class="pc-petit">une longue molécule</text><text x="212" y="73" class="pc-petit">d'ADN enroulée</text>`;
  }
  return '<g data-helice></g>' + (niveau === 'gene'
    ? '<path d="M118 150 V158 H202 V150" class="pc-trait"/><text x="160" y="174" text-anchor="middle" class="pc-etiquette">un gène</text>' : '');
}

/** Zoom en six étapes : organisme → cellule → noyau → chromosome → ADN → gène. */
export function echelles(host) {
  let i = 0, sens = 'avant';
  const wrap = cadre(host, `
    ${segments('Échelle', ECHELLES.map(([v, l]) => [v, l]))}
    <svg viewBox="0 0 320 190" class="pc-svg sv-echelles" role="img" aria-label="Du corps humain au gène" data-svg></svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    const [niveau, , texte] = ECHELLES[i];
    svg.innerHTML = `<g class="sv-scene sv-scene-${sens}">${sceneEchelle(niveau)}</g>`;
    $(wrap, '[data-txt]').innerHTML = texte;
    tourner(0); // première image de l'hélice, même si l'animation est coupée
  };
  const tourner = (t) => {
    const niveau = ECHELLES[i][0];
    if (niveau !== 'adn' && niveau !== 'gene') return;
    const g = svg.querySelector('[data-helice]');
    if (g) g.innerHTML = helice({ phase: t * 1.2, gene: niveau === 'gene' ? [118, 202] : null });
  };
  lierSegments(wrap, ECHELLES[0][0], (v) => {
    const j = ECHELLES.findIndex((e) => e[0] === v);
    sens = j >= i ? 'avant' : 'arriere'; i = j; dessiner();
  });
  dessiner();
  // L'hélice tourne lentement sur elle-même.
  animer(wrap, (dt, t) => tourner(t));
}

/**
 * Schéma à légender : une cellule, son noyau, un chromosome, la molécule d'ADN
 * et un gène. `ordre[k]` = structure qui porte le repère k + 1.
 */
export const STRUCTURES = ['cellule', 'noyau', 'chromosome', "molécule d'ADN", 'gène'];
export function schemaCelluleADN(ordre = STRUCTURES) {
  const num = (nom) => ordre.indexOf(nom) + 1;
  const repere = (nom, x, y, x2, y2) => `<path d="M${x} ${y} L${x2} ${y2}" class="sv-fleche-repere"/><circle cx="${x}" cy="${y}" r="10" class="sv-repere"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="sv-repere-num">${num(nom)}</text>`;
  return `<svg viewBox="0 0 340 190" class="pc-svg sv-schema" role="img" aria-label="Schéma à légender : de la cellule au gène">
    <path d="M14 96 C12 50 52 34 88 40 C128 46 142 72 134 108 C126 142 92 150 58 144 C30 138 16 124 14 96Z" class="sv-cellule"/>
    <circle cx="84" cy="92" r="24" class="sv-noyau"/>
    <path d="M100 76 L150 40 M104 104 L150 132" class="sv-zoom-trait"/>
    <path d="M160 44 L186 128 M190 44 L164 128" class="sv-chr-grand sv-chr-moyen"/><circle cx="175" cy="86" r="5" class="sv-centromere"/>
    <path d="M192 70 L222 60 M192 100 L222 112" class="sv-zoom-trait"/>
    <g>${helice({ x0: 226, x1: 330, cy: 86, amp: 15, periode: 44, gene: [262, 300] })}</g>
    ${repere('cellule', 26, 166, 44, 138)}
    ${repere('noyau', 84, 176, 84, 112)}
    ${repere('chromosome', 175, 164, 175, 132)}
    ${repere("molécule d'ADN", 240, 24, 240, 68)}
    ${repere('gène', 281, 146, 281, 108)}
  </svg>`;
}

// ============================================================ CARYOTYPE

/**
 * Caryotype humain : 22 paires numérotées et les chromosomes sexuels.
 * sexe : 'XX' ou 'XY' ; tri21 : un troisième chromosome 21.
 */
export function schemaCaryotype({ sexe = 'XX', tri21 = false, anime = false } = {}) {
  const L = 52, H = 46;
  let s = '', n = 0;
  const groupe = (k, etiquette, hauteurs, classe = '') => {
    const col = k % 6, lig = Math.floor(k / 6), cx = 34 + col * L, y = 34 + lig * H;
    const ecart = 9, x0 = cx - ((hauteurs.length - 1) * ecart) / 2;
    const delai = anime ? ` style="animation-delay:${k * 35}ms"` : '';
    s += `<g class="sv-paire ${anime ? 'sv-paire-anime' : ''}"${delai}>${hauteurs.map((h, j) => batonnet(r1(x0 + j * ecart), y, h, classe)).join('')}<text x="${cx}" y="${y + 11}" text-anchor="middle" class="sv-num-paire">${etiquette}</text></g>`;
    n += hauteurs.length;
  };
  for (let p = 1; p <= 22; p++) {
    const h = 30 - (p - 1) * 0.85;
    groupe(p - 1, p, p === 21 && tri21 ? [h, h, h] : [h, h], p === 21 && tri21 ? 'sv-chr-extra' : '');
  }
  groupe(23, sexe === 'XX' ? 'X X' : 'X Y', sexe === 'XX' ? [22, 22] : [22, 11], 'sv-chr-sexe');
  return { svg: `<svg viewBox="0 0 330 190" class="pc-svg sv-caryotype" role="img" aria-label="Caryotype humain">${s}</svg>`, nombre: n };
}

/** Caryotype manipulable : femme / homme, avec ou sans trisomie 21. */
export function caryotype(host) {
  let sexe = 'XX', tri21 = false;
  const wrap = cadre(host, `
    ${segments('Sexe', [['XX', 'Femme'], ['XY', 'Homme']])}
    <label class="pc-case"><input type="checkbox" data-tri> Trisomie 21</label>
    <div data-caryo></div>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const dessiner = () => {
    const c = schemaCaryotype({ sexe, tri21, anime: true });
    $(wrap, '[data-caryo]').innerHTML = c.svg;
    $(wrap, '[data-txt]').innerHTML = `<strong>${c.nombre} chromosomes</strong> : 22 paires communes aux deux sexes et les chromosomes sexuels <strong>${sexe === 'XX' ? 'X et X' : 'X et Y'}</strong>.`
      + (tri21 ? ' Il y a <strong>trois chromosomes 21</strong> au lieu de deux : un chromosome en trop modifie plusieurs caractères.' : '');
  };
  lierSegments(wrap, sexe, (v) => { sexe = v; dessiner(); });
  $(wrap, '[data-tri]').addEventListener('change', (e) => { tri21 = !!e.target.checked; dessiner(); });
  dessiner();
}

// ============================================== ALLÈLES ET GROUPES SANGUINS

/** Les six combinaisons d'allèles du gène des groupes sanguins. */
export const COMBINAISONS = [['A', 'A'], ['A', 'O'], ['B', 'B'], ['B', 'O'], ['A', 'B'], ['O', 'O']];
export const GROUPES = ['A', 'B', 'AB', 'O'];

/** Groupe sanguin obtenu avec deux allèles : A et B s'expriment tous les deux, O seulement s'il est seul. */
export function groupe(a, b) {
  const s = new Set([a, b]);
  if (s.has('A') && s.has('B')) return 'AB';
  if (s.has('A')) return 'A';
  if (s.has('B')) return 'B';
  return 'O';
}

/** Les quatre combinaisons possibles pour un enfant (un allèle de chaque parent). */
export const enfants = (pere, mere) => pere.flatMap((a) => mere.map((b) => [a, b]));
export const groupesPossibles = (pere, mere) => GROUPES.filter((g) => enfants(pere, mere).some(([a, b]) => groupe(a, b) === g));

const allele = (a) => `<span class="sv-allele sv-allele-${a}">${a}</span>`;

/** Tableau de croisement : en ligne les allèles du père, en colonne ceux de la mère. */
export function tableCroisement(pere, mere, { anime = false } = {}) {
  const cellule = (a, b, k) => `<td class="${anime ? 'sv-case-anime' : ''}"${anime ? ` style="animation-delay:${k * 110}ms"` : ''}>${allele(a)}${allele(b)}<small>groupe ${groupe(a, b)}</small></td>`;
  return `<div class="tab-wrap"><table class="sv-croisement"><tbody>
    <tr><th></th>${mere.map((b) => `<th scope="col">mère : ${allele(b)}</th>`).join('')}</tr>
    ${pere.map((a, i) => `<tr><th scope="row">père : ${allele(a)}</th>${mere.map((b, j) => cellule(a, b, i * 2 + j)).join('')}</tr>`).join('')}
  </tbody></table></div>`;
}

/** Croisement manipulable : on choisit les allèles des parents, le tableau donne les enfants possibles. */
export function croisement(host, { pere = ['A', 'O'], mere = ['B', 'O'] } = {}) {
  let p = pere, m = mere;
  const options = (sel) => COMBINAISONS.map((c, i) => `<option value="${i}" ${c.join() === sel.join() ? 'selected' : ''}>${c[0]} et ${c[1]} (groupe ${groupe(c[0], c[1])})</option>`).join('');
  const wrap = cadre(host, `
    <div class="pc-choix">
      <label>Allèles du père <select data-p>${options(p)}</select></label>
      <label>Allèles de la mère <select data-m>${options(m)}</select></label>
    </div>
    <div data-table></div>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const dessiner = () => {
    $(wrap, '[data-table]').innerHTML = tableCroisement(p, m, { anime: true });
    const g = groupesPossibles(p, m);
    $(wrap, '[data-txt]').innerHTML = `Chaque parent transmet au hasard <strong>un seul</strong> de ses deux allèles. Groupe${g.length > 1 ? 's' : ''} possible${g.length > 1 ? 's' : ''} pour un enfant : <strong>${g.join(', ')}</strong>.`;
  };
  $(wrap, '[data-p]').addEventListener('change', (e) => { p = COMBINAISONS[+e.target.value] || p; dessiner(); });
  $(wrap, '[data-m]').addEventListener('change', (e) => { m = COMBINAISONS[+e.target.value] || m; dessiner(); });
  dessiner();
}

// ============================================================ DIAGRAMME

/** Diagramme en barres (document d'exercice) : donnees = [[nom, valeur], …]. */
export function schemaBarres(donnees, { unite = '', titre = '' } = {}) {
  const max = Math.max(...donnees.map((d) => d[1])) * 1.15, W = 300, H = 170, bas = 132, haut = 22;
  const l = Math.min(64, (W - 60) / donnees.length - 18);
  const barres = donnees.map(([nom, v], i) => {
    const x = 50 + (i + 0.5) * ((W - 60) / donnees.length), h = ((bas - haut) * v) / max;
    return `<rect x="${r1(x - l / 2)}" y="${r1(bas - h)}" width="${r1(l)}" height="${r1(h)}" rx="5" class="sv-barre sv-barre-${i % 2}"/>
      <text x="${r1(x)}" y="${r1(bas - h - 6)}" text-anchor="middle" class="pc-etiquette">${String(v).replace('.', ',')}</text>
      <text x="${r1(x)}" y="${bas + 16}" text-anchor="middle" class="pc-petit">${nom}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="pc-svg sv-barres" role="img" aria-label="${titre || 'Diagramme en barres'}">
    <path d="M44 ${haut - 8} V${bas} H${W - 6}" class="pc-trait"/>
    ${unite ? `<text x="6" y="${haut - 10}" class="pc-petit">${unite}</text>` : ''}
    ${barres}
    ${titre ? `<text x="${W / 2}" y="${H - 4}" text-anchor="middle" class="pc-petit">${titre}</text>` : ''}
  </svg>`;
}

// ============================================================== COURBE

/**
 * Courbe (document d'exercice) : points = [[x, y], …]. Les abscisses sont
 * écrites sous l'axe, quatre graduations sur l'axe vertical.
 * series : plusieurs courbes [{ points, classe }] sur les mêmes axes.
 */
export function schemaCourbe(points, { xLabel = '', yLabel = '', ymin = null, ymax = null, series = null, etiquettes = true } = {}) {
  const toutes = series || [{ points, classe: '' }];
  const xs = toutes.flatMap((s) => s.points.map((p) => p[0])), ys = toutes.flatMap((s) => s.points.map((p) => p[1]));
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  const y0 = ymin ?? Math.min(...ys), y1 = ymax ?? Math.max(...ys);
  const W = 320, H = 196, g = 46, d = 12, h = 22, b = 150;
  const X = (x) => r1(g + ((x - x0) / (x1 - x0 || 1)) * (W - g - d)), Y = (y) => r1(b - ((y - y0) / (y1 - y0 || 1)) * (b - h));
  let s = `<path d="M${g} ${h - 8} V${b} H${W - 4}" class="pc-trait"/>`;
  for (let k = 0; k <= 4; k++) {
    const v = y0 + ((y1 - y0) * k) / 4;
    s += `<line x1="${g}" y1="${Y(v)}" x2="${W - d}" y2="${Y(v)}" class="sv-grille"/><text x="${g - 5}" y="${Y(v) + 4}" text-anchor="end" class="pc-petit">${String(arrondi(v, 1)).replace('.', ',')}</text>`;
  }
  toutes[0].points.forEach(([x]) => { s += `<text x="${X(x)}" y="${b + 14}" text-anchor="middle" class="pc-petit">${x}</text>`; });
  toutes.forEach(({ points: pts, classe }) => {
    s += `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${X(x)} ${Y(y)}`).join('')}" class="sv-courbe ${classe}" pathLength="100"/>`;
    if (etiquettes) pts.forEach(([x, y]) => { s += `<circle cx="${X(x)}" cy="${Y(y)}" r="3.5" class="sv-point ${classe}"/>`; });
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="pc-svg sv-graphe" role="img" aria-label="Graphique : ${yLabel} en fonction de ${xLabel}">
    ${s}<text x="4" y="11" class="pc-petit">${yLabel}</text><text x="${W - 4}" y="${H - 6}" text-anchor="end" class="pc-petit">${xLabel}</text></svg>`;
}

// ======================================================= EFFET DE SERRE

/** Température moyenne du globe (modèle très simplifié) pour une teneur en CO₂ donnée, en ppm. */
export const temperatureGlobe = (ppm) => arrondi(14 + 3 * Math.log2(ppm / 280), 1);

/** Effet de serre : le sol chauffé par le Soleil émet un rayonnement que les gaz à effet de serre retiennent en partie. */
export function effetDeSerre(host) {
  let ppm = 280;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>CO₂ dans l'air <input type="range" min="180" max="800" step="20" value="${ppm}" data-c> <span class="fig-val" data-cv></span></label>${boutonLecture}</div>
    <svg viewBox="0 0 320 200" class="pc-svg sv-serre" role="img" aria-label="Schéma de l'effet de serre">
      <rect x="0" y="0" width="320" height="200" class="sv-espace"/>
      <rect x="0" y="54" width="320" height="34" class="sv-atmosphere" data-atm/>
      <text x="314" y="50" text-anchor="end" class="sv-txt-clair">gaz à effet de serre</text>
      <circle cx="30" cy="26" r="17" class="sv-soleil"/>
      <path d="M44 38 L118 168 M56 30 L170 168" class="sv-rayon-soleil"/>
      <rect x="0" y="170" width="320" height="30" class="sv-sol"/>
      <g data-ir></g>
    </svg>
    <div class="fig-readout" data-txt></div>
    <p class="pc-legende"><span class="pc-pastille sv-p-soleil"></span>lumière du Soleil <span class="pc-pastille sv-p-ir"></span>chaleur émise par le sol</p>`, 'sv-fig');
  const retenue = () => Math.max(0.15, Math.min(0.85, 0.45 + 0.22 * Math.log2(ppm / 280)));
  const grains = Array.from({ length: 16 }, (_, k) => ({ x: 96 + k * 13, y: 168 - k * 9, sens: -1, rebond: k % 2 === 0 }));
  const maj = () => {
    $(wrap, '[data-cv]').textContent = `${ppm} ppm`;
    $(wrap, '[data-atm]').setAttribute('style', `opacity:${r1(0.15 + 0.7 * retenue())}`);
    const T = temperatureGlobe(ppm);
    $(wrap, '[data-txt]').innerHTML = `Température moyenne à la surface (modèle simplifié) : <strong>${String(T).replace('.', ',')} °C</strong>. `
      + (ppm < 280 ? 'Moins de CO₂ : la chaleur s\'échappe davantage, le climat se refroidit.' : ppm === 280 ? 'C\'est la teneur d\'avant l\'ère industrielle. Sans aucun effet de serre, il ferait −18 °C.' : ppm <= 430 ? 'Proche de la teneur actuelle (environ 420 ppm) : le climat s\'est déjà réchauffé.' : 'Plus de CO₂ : davantage de chaleur est renvoyée vers le sol.');
  };
  $(wrap, '[data-c]').addEventListener('input', (e) => { ppm = +e.target.value || 280; maj(); });
  maj();
  const etat = animer(wrap, (dt) => {
    grains.forEach((p) => {
      p.y += p.sens * dt * 46;
      if (p.sens < 0 && p.y < 72 && p.rebond) p.sens = 1;      // renvoyé vers le sol
      if (p.y < -6 || (p.sens > 0 && p.y > 168)) { p.y = 168; p.sens = -1; p.rebond = Math.random() < retenue(); }
    });
    $(wrap, '[data-ir]').innerHTML = grains.map((p) => `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="4" class="sv-ir ${p.sens > 0 ? 'sv-ir-retour' : ''}"/>`).join('');
  });
  lierLecture(wrap, etat);
}

// ============================================ ACIDIFICATION DES OCÉANS

/** pH moyen de l'océan de surface pour une teneur en CO₂ de l'air (ppm). */
export const phOcean = (ppm) => arrondi(8.25 - 0.3 * Math.log2(ppm / 280), 2);

/** Le CO₂ de l'air se dissout dans l'océan : le pH baisse, les coquilles calcaires se fragilisent. */
export function acidification(host) {
  let ppm = 280;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>CO₂ dans l'air <input type="range" min="280" max="900" step="20" value="${ppm}" data-c> <span class="fig-val" data-cv></span></label>${boutonLecture}</div>
    <svg viewBox="0 0 320 190" class="pc-svg sv-ocean" role="img" aria-label="Dissolution du dioxyde de carbone dans l'océan">
      <rect x="0" y="70" width="320" height="120" class="sv-mer"/>
      <path d="M0 70 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" class="sv-vague"/>
      <text x="8" y="18" class="pc-petit">air</text><text x="8" y="90" class="sv-txt-clair">océan</text>
      <g data-bulles></g>
      <path d="M190 172 q-34 -4 -30 -34 q4 -30 40 -30 q36 0 40 30 q4 30 -30 34 z" class="sv-coquille" data-coq/>
      <path d="M200 110 v60 M182 116 l10 54 M218 116 l-10 54 M168 132 l18 38 M232 132 l-18 38" class="sv-coquille-stries" data-stries/>
    </svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const bulles = Array.from({ length: 14 }, (_, k) => ({ x: 20 + ((k * 53) % 290), y: (k * 37) % 150 }));
  const maj = () => {
    const ph = phOcean(ppm), k = (ppm - 280) / 620;
    $(wrap, '[data-cv]').textContent = `${ppm} ppm`;
    $(wrap, '[data-coq]').setAttribute('style', `stroke-width:${r1(6 - 4.5 * k)};opacity:${r1(1 - 0.45 * k)}`);
    $(wrap, '[data-stries]').setAttribute('style', `opacity:${r1(1 - 0.8 * k)}`);
    $(wrap, '[data-txt]').innerHTML = `pH moyen de l'océan (modèle simplifié) : <strong>${String(ph).replace('.', ',')}</strong>. `
      + (ppm <= 300 ? 'C\'est la situation d\'avant l\'ère industrielle.' : ppm <= 440 ? 'C\'est à peu près la situation actuelle : l\'océan est déjà plus acide.' : 'L\'eau devient plus acide : coraux, moules et huîtres fabriquent plus difficilement leur calcaire.');
  };
  $(wrap, '[data-c]').addEventListener('input', (e) => { ppm = +e.target.value || 280; maj(); });
  maj();
  const etat = animer(wrap, (dt) => {
    const n = Math.round(4 + 10 * ((ppm - 280) / 620));
    bulles.forEach((b) => { b.y += dt * 34; if (b.y > 150) { b.y = 0; b.x = 20 + Math.random() * 280; } });
    $(wrap, '[data-bulles]').innerHTML = bulles.slice(0, n).map((b) => `<g class="sv-co2" transform="translate(${r1(b.x)} ${r1(20 + b.y)})"><circle r="5.5"/><text y="3" text-anchor="middle">CO₂</text></g>`).join('');
  });
  lierLecture(wrap, etat);
}

// ================================================ BRASSAGE DES ALLÈLES

const pastille = (a) => `<span class="sv-allele ${a === a.toUpperCase() ? 'sv-allele-A' : 'sv-allele-B'}">${a}</span>`;

/**
 * Reproduction sexuée : chaque parent donne au hasard un chromosome de chaque
 * paire. Deux gènes (allèles A/a et B/b) suffisent à produire neuf combinaisons.
 */
export function brassage(host) {
  const vues = new Set();
  let n = 0;
  const wrap = cadre(host, `
    <div class="sv-brassage">
      <div class="sv-parent"><b>Père</b><span>${pastille('A')}${pastille('a')}</span><span>${pastille('B')}${pastille('b')}</span></div>
      <div class="sv-parent"><b>Mère</b><span>${pastille('A')}${pastille('a')}</span><span>${pastille('B')}${pastille('b')}</span></div>
    </div>
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-enfant>Concevoir un enfant</button></div>
    <div class="sv-enfants" data-enfants></div>
    <div class="fig-readout" data-txt>Chaque parent possède deux allèles de chaque gène : A et a pour le premier gène, B et b pour le second.</div>`, 'sv-fig');
  $(wrap, '[data-enfant]').addEventListener('click', () => {
    const g = () => [Math.random() < 0.5 ? 'A' : 'a', Math.random() < 0.5 ? 'B' : 'b'];
    const sp = g(), ov = g();
    const paire = (x, y) => [x, y].sort().join('');
    const cle = paire(sp[0], ov[0]) + ' ' + paire(sp[1], ov[1]);
    vues.add(cle); n++;
    const zone = $(wrap, '[data-enfants]');
    zone.innerHTML = `<div class="sv-enfant sv-case-anime"><small>spermatozoïde</small><span>${sp.map(pastille).join('')}</span><small>+ ovule</small><span>${ov.map(pastille).join('')}</span><small>= enfant n° ${n}</small><span>${pastille(sp[0])}${pastille(ov[0])} ${pastille(sp[1])}${pastille(ov[1])}</span></div>`;
    $(wrap, '[data-txt]').innerHTML = `<strong>${vues.size}</strong> combinaison${vues.size > 1 ? 's' : ''} différente${vues.size > 1 ? 's' : ''} obtenue${vues.size > 1 ? 's' : ''} sur 9 possibles, en ${n} enfant${n > 1 ? 's' : ''}. Avec 23 paires de chromosomes, un seul couple peut concevoir des milliards d'enfants différents.`;
  });
}

// ====================================================== ARBRE DE PARENTÉ

/** Espèces de l'arbre, de la plus éloignée à la plus proche de l'être humain. */
export const ESPECES = ['sardine', 'grenouille', 'pigeon', 'chat', 'chimpanzé', 'être humain'];
/** Innovations : [caractère, groupe, rang de la première espèce qui le possède]. */
export const INNOVATIONS = [
  ['vertèbres', 'vertébrés', 0], ['quatre membres', 'tétrapodes', 1], ['amnios', 'amniotes', 2], ['poils et mamelles', 'mammifères', 3], ['pouce opposable', 'primates', 4],
];
/** Vrai si l'espèce de rang i possède l'innovation de rang k. */
export const possede = (i, k) => i >= INNOVATIONS[k][2];
/** Rang du dernier ancêtre commun de deux espèces (plus il est grand, plus elles sont proches). */
export const parente = (i, j) => Math.min(i, j, 4);

/** Arbre de parenté. surligne : rang d'une innovation (le groupe correspondant est coloré). */
export function schemaArbre({ surligne = null, masque = false } = {}) {
  const xf = (i) => 26 + i * 56, k = 0.9, XH = xf(5);
  const noeud = (i) => [(xf(i) + XH) / 2, 40 + ((XH - xf(i)) / 2) * k];
  const dans = (i) => surligne != null && possede(i, surligne);
  let s = '';
  const [rx, ry] = noeud(0);
  s += `<path d="M${rx} ${ry + 24} V${ry}" class="sv-branche ${surligne === 0 ? 'sv-branche-on' : ''}"/>`;
  for (let i = 0; i < 5; i++) {
    const [x, y] = noeud(i), suiv = i < 4 ? noeud(i + 1) : [XH, 40];
    s += `<path d="M${r1(x)} ${r1(y)} L${xf(i)} 40" class="sv-branche ${dans(i) ? 'sv-branche-on' : ''}"/>`;
    s += `<path d="M${r1(x)} ${r1(y)} L${r1(suiv[0])} ${r1(suiv[1])}" class="sv-branche ${surligne != null && surligne <= i + 1 ? 'sv-branche-on' : ''}"/>`;
  }
  INNOVATIONS.forEach(([nom], q) => {
    const [x, y] = q === 0 ? [rx, ry + 14] : [(noeud(q - 1)[0] + noeud(q)[0]) / 2, (noeud(q - 1)[1] + noeud(q)[1]) / 2];
    s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="6" class="sv-innovation ${surligne === q ? 'sv-innovation-on' : ''}"/>`;
    s += `<text x="${r1(x + 11)}" y="${r1(y + 10)}" class="pc-petit">${masque ? `caractère ${q + 1}` : nom}</text>`;
  });
  ESPECES.forEach((e, i) => { s += `<text x="${xf(i)}" y="${i % 2 ? 16 : 30}" text-anchor="middle" class="sv-espece ${dans(i) ? 'sv-espece-on' : ''}">${e}</text>`; });
  return `<svg viewBox="0 0 340 200" class="pc-svg sv-arbre" role="img" aria-label="Arbre de parenté de six espèces">${s}</svg>`;
}

/** Arbre manipulable : on choisit un caractère, le groupe qui le partage s'allume. */
export function arbreParente(host) {
  let q = 1;
  const wrap = cadre(host, `
    ${segments('Caractère', INNOVATIONS.map(([nom], i) => [String(i), nom]))}
    <div data-arbre></div>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const dessiner = () => {
    $(wrap, '[data-arbre]').innerHTML = schemaArbre({ surligne: q });
    const [nom, grp, rang] = INNOVATIONS[q];
    $(wrap, '[data-txt]').innerHTML = `Caractère « ${nom} » : partagé par ${ESPECES.slice(rang).join(', ')}. Ces espèces l'ont hérité d'un <strong>ancêtre commun</strong> : elles forment le groupe des <strong>${grp}</strong>.`;
  };
  lierSegments(wrap, String(q), (v) => { q = +v; dessiner(); });
  dessiner();
}

// =================================================== SÉLECTION NATURELLE

/**
 * Phalènes du bouleau : sur un tronc clair, les papillons sombres sont repérés
 * et mangés ; sur un tronc noirci, ce sont les clairs. La population change.
 */
export function selection(host) {
  const N = 24;
  let tronc = 'clair', pop = [], gen = 0, hist = [];
  const wrap = cadre(host, `
    ${segments('Tronc', [['clair', 'Tronc clair (lichens)'], ['sombre', 'Tronc noirci (pollution)']])}
    <svg viewBox="0 0 320 150" class="pc-svg sv-selection" role="img" aria-label="Papillons clairs et sombres sur un tronc" data-svg></svg>
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-suiv>Génération suivante</button><button type="button" class="btn btn-ghost" data-raz>Recommencer</button></div>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const init = () => { pop = Array.from({ length: N }, (_, i) => i % 2 === 0); gen = 0; hist = [50]; };
  const dessiner = (manges = []) => {
    const papillon = (sombre, i, mange) => {
      const x = 22 + (i % 8) * 38 + ((i * 7) % 5), y = 26 + Math.floor(i / 8) * 42 + ((i * 11) % 9);
      return `<g transform="translate(${x} ${y})" class="sv-papillon ${sombre ? 'sv-pap-sombre' : 'sv-pap-clair'} ${mange ? 'sv-pap-mange' : ''}"><path d="M0 0 L-11 -8 L-9 7 Z M0 0 L11 -8 L9 7 Z"/></g>`;
    };
    $(wrap, '[data-svg]').innerHTML = `<rect x="0" y="0" width="320" height="150" rx="10" class="sv-tronc sv-tronc-${tronc}"/>${pop.map((s, i) => papillon(s, i, manges.includes(i))).join('')}`;
    const sombres = pop.filter(Boolean).length;
    $(wrap, '[data-txt]').innerHTML = `Génération ${gen} : <strong>${sombres}</strong> papillons sombres, <strong>${N - sombres}</strong> clairs. `
      + (gen === 0 ? 'Les oiseaux mangent surtout les papillons qu\'ils repèrent facilement.' : `Part des sombres au fil des générations : ${hist.map((h) => h + ' %').join(' → ')}.`);
  };
  const suivante = () => {
    // Un papillon visible a deux fois plus de risques d'être mangé qu'un papillon camouflé.
    const survivants = pop.filter((sombre) => Math.random() < ((sombre === (tronc === 'sombre')) ? 0.8 : 0.4));
    if (!survivants.length) survivants.push(tronc === 'sombre');
    pop = Array.from({ length: N }, () => survivants[Math.floor(Math.random() * survivants.length)]).sort((a, b) => a - b);
    gen++; hist.push(Math.round((pop.filter(Boolean).length / N) * 100)); if (hist.length > 7) hist.shift();
    dessiner();
  };
  lierSegments(wrap, tronc, (v) => { tronc = v; dessiner(); });
  $(wrap, '[data-suiv]').addEventListener('click', suivante);
  $(wrap, '[data-raz]').addEventListener('click', () => { init(); dessiner(); });
  init(); dessiner();
}

// ====================================================== SYSTÈME NERVEUX

/** Trajet du message nerveux : œil → cerveau → moelle épinière → muscle. */
const TRAJET = [[52, 60], [96, 52], [150, 44], [176, 78], [182, 150], [228, 162], [276, 142]];
const ETAPES_NERF = [
  [0, "L'<strong>organe récepteur</strong> (l'œil) capte le stimulus et fabrique un message nerveux."],
  [1, 'Le message <strong>sensitif</strong> gagne le cerveau par le nerf optique.'],
  [2, 'Le <strong>cerveau</strong> (centre nerveux) analyse le message et élabore la réponse.'],
  [3, 'Le message <strong>moteur</strong> descend par la moelle épinière…'],
  [5, '… puis par un nerf moteur, jusqu\'au muscle.'],
  [6, "Le <strong>muscle</strong> (organe effecteur) se contracte : la main attrape l'objet."],
];

/** De l'œil au muscle : le message nerveux, avec ou sans fatigue. */
export function arcNerveux(host) {
  let lent = false, d = -1; // d : abscisse du message sur le trajet (−1 : au repos)
  const longueurs = TRAJET.slice(1).map((p, i) => Math.hypot(p[0] - TRAJET[i][0], p[1] - TRAJET[i][1]));
  const total = longueurs.reduce((a, b) => a + b, 0);
  const position = (s) => {
    let r = s;
    for (let i = 0; i < longueurs.length; i++) { if (r <= longueurs[i]) { const u = r / longueurs[i]; return [TRAJET[i][0] + (TRAJET[i + 1][0] - TRAJET[i][0]) * u, TRAJET[i][1] + (TRAJET[i + 1][1] - TRAJET[i][1]) * u, i]; } r -= longueurs[i]; }
    return [...TRAJET[TRAJET.length - 1], TRAJET.length - 1];
  };
  const wrap = cadre(host, `
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-go>Un objet tombe : attrape-le !</button>
      <label class="pc-case"><input type="checkbox" data-lent> Fatigue, alcool ou écran</label></div>
    <svg viewBox="0 0 320 190" class="pc-svg sv-nerf" role="img" aria-label="Trajet du message nerveux de l'œil au muscle">
      <path d="M118 70 C104 20 196 4 204 52 C208 78 190 84 176 80 C160 92 130 92 118 70Z" class="sv-cerveau"/>
      <path d="M176 80 L182 150" class="sv-moelle"/>
      <path d="M${TRAJET.slice(0, 3).map((p) => p.join(' ')).join(' L')}" class="sv-voie sv-voie-sensitive"/>
      <path d="M${TRAJET.slice(3).map((p) => p.join(' ')).join(' L')}" class="sv-voie sv-voie-motrice"/>
      <ellipse cx="40" cy="60" rx="18" ry="12" class="sv-oeil"/><circle cx="44" cy="60" r="6" class="sv-pupille"/>
      <ellipse cx="284" cy="146" rx="24" ry="13" class="sv-muscle" data-muscle/>
      <text x="40" y="92" text-anchor="middle" class="pc-petit">œil</text><text x="160" y="16" text-anchor="middle" class="pc-petit">cerveau</text>
      <text x="150" y="128" text-anchor="end" class="pc-petit">moelle épinière</text><text x="282" y="182" text-anchor="middle" class="pc-petit">muscle</text>
      <circle r="7" class="sv-message" data-msg style="opacity:0"/>
    </svg>
    <div class="fig-readout" data-txt>Le message nerveux parcourt toujours le même chemin : récepteur, centre nerveux, effecteur.</div>`, 'sv-fig');
  $(wrap, '[data-lent]').addEventListener('change', (e) => { lent = !!e.target.checked; });
  $(wrap, '[data-go]').addEventListener('click', () => { d = 0; });
  animer(wrap, (dt) => {
    if (d < 0) return;
    const [x, y, i] = position(d);
    // Dans le cerveau, le traitement prend du temps (plus encore si l'on est fatigué).
    d += dt * (i === 2 ? (lent ? 14 : 34) : (lent ? 70 : 110));
    const msg = $(wrap, '[data-msg]');
    msg.setAttribute('cx', r1(x)); msg.setAttribute('cy', r1(y));
    msg.setAttribute('style', `opacity:1`);
    msg.setAttribute('class', `sv-message ${i >= 3 ? 'sv-message-moteur' : ''}`);
    const etape = [...ETAPES_NERF].reverse().find((e) => i >= e[0]);
    $(wrap, '[data-txt]').innerHTML = etape[1];
    if (d >= total) {
      d = -1;
      $(wrap, '[data-muscle]').setAttribute('class', 'sv-muscle sv-muscle-contracte');
      $(wrap, '[data-txt]').innerHTML = `Le muscle se contracte. ${lent ? 'Le temps de réaction est <strong>nettement plus long</strong>.' : 'Tout le trajet a pris une fraction de seconde.'}` + (lent ? ' La fatigue, l\'alcool et les distractions ralentissent le traitement par le cerveau.' : '');
    } else $(wrap, '[data-muscle]').setAttribute('class', 'sv-muscle');
  });
}

/** Neurone à légender. `ordre[k]` = partie qui porte le repère k + 1. */
export const PARTIES_NEURONE = ['corps cellulaire', 'noyau', 'dendrite', 'axone', 'synapse'];
export function schemaNeurone(ordre = PARTIES_NEURONE) {
  const num = (nom) => ordre.indexOf(nom) + 1;
  const repere = (nom, x, y, x2, y2) => `<path d="M${x} ${y} L${x2} ${y2}" class="sv-fleche-repere"/><circle cx="${x}" cy="${y}" r="10" class="sv-repere"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="sv-repere-num">${num(nom)}</text>`;
  return `<svg viewBox="0 0 340 170" class="pc-svg sv-schema" role="img" aria-label="Schéma d'un neurone à légender">
    <path d="M62 84 L22 40 M62 84 L16 86 M62 84 L26 132 M62 84 L56 28 M62 84 L60 140 M30 50 L14 46 M34 122 L18 128" class="sv-dendrite"/>
    <path d="M84 84 H252" class="sv-axone"/>
    <path d="M252 84 L282 60 M252 84 L288 84 M252 84 L282 110" class="sv-dendrite"/>
    <circle cx="286" cy="58" r="5" class="sv-bouton"/><circle cx="293" cy="84" r="5" class="sv-bouton"/><circle cx="286" cy="112" r="5" class="sv-bouton"/>
    <circle cx="66" cy="84" r="24" class="sv-cellule"/><circle cx="66" cy="84" r="9" class="sv-noyau"/>
    <path d="M304 66 q16 18 0 36" class="sv-cellule-voisine"/>
    ${repere('corps cellulaire', 104, 30, 82, 66)}
    ${repere('noyau', 110, 138, 72, 90)}
    ${repere('dendrite', 18, 160, 24, 134)}
    ${repere('axone', 176, 44, 176, 82)}
    ${repere('synapse', 316, 150, 298, 100)}
  </svg>`;
}

// =========================================================== IMMUNITÉ

const ETAPES_PHAGO = [
  ['adhesion', 'Adhésion', "Le phagocyte reconnaît la bactérie et sa membrane s'y accroche."],
  ['ingestion', 'Ingestion', "La membrane du phagocyte se déforme et enveloppe la bactérie, qui se retrouve enfermée dans une poche."],
  ['digestion', 'Digestion', 'Des substances déversées dans la poche détruisent la bactérie.'],
  ['rejet', 'Rejet', "Les débris sont rejetés à l'extérieur. Le phagocyte peut recommencer."],
];

/** Les quatre étapes de la phagocytose. */
export function phagocytose(host) {
  let i = 0;
  const wrap = cadre(host, `
    ${segments('Étape', ETAPES_PHAGO.map(([v, l]) => [v, l]))}
    <svg viewBox="0 0 320 170" class="pc-svg sv-phago" role="img" aria-label="Phagocytose d'une bactérie" data-svg></svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const bacterie = (x, y, classe = '') => `<rect x="${x - 15}" y="${y - 7}" width="30" height="14" rx="7" class="sv-bacterie ${classe}"/>`;
  const scenes = {
    adhesion: `<path d="M70 86 C66 36 128 22 176 30 C230 38 250 60 232 76 C224 84 224 92 232 100 C250 116 222 146 170 144 C112 144 72 128 70 86Z" class="sv-phagocyte"/><circle cx="130" cy="88" r="24" class="sv-noyau"/>${bacterie(254, 88)}`,
    ingestion: `<path d="M70 86 C66 36 128 22 176 30 C236 34 282 52 284 66 C268 62 250 66 240 74 C226 84 226 94 240 102 C252 110 268 112 284 110 C280 130 222 146 170 144 C112 144 72 128 70 86Z" class="sv-phagocyte"/><circle cx="130" cy="88" r="24" class="sv-noyau"/>${bacterie(256, 88)}`,
    digestion: `<path d="M70 86 C66 36 128 22 186 30 C250 36 280 60 278 88 C278 120 240 146 180 144 C112 144 72 128 70 86Z" class="sv-phagocyte"/><circle cx="126" cy="88" r="24" class="sv-noyau"/><circle cx="224" cy="88" r="27" class="sv-vacuole"/>${bacterie(224, 88, 'sv-bacterie-digeree')}`,
    rejet: `<path d="M70 86 C66 36 128 22 186 30 C250 36 268 60 266 88 C266 120 240 146 180 144 C112 144 72 128 70 86Z" class="sv-phagocyte"/><circle cx="130" cy="88" r="24" class="sv-noyau"/><circle cx="284" cy="70" r="3.5" class="sv-debris"/><circle cx="296" cy="88" r="3" class="sv-debris"/><circle cx="286" cy="106" r="4" class="sv-debris"/><circle cx="304" cy="74" r="2.5" class="sv-debris"/>`,
  };
  const dessiner = () => {
    const [v, , texte] = ETAPES_PHAGO[i];
    $(wrap, '[data-svg]').innerHTML = `<g class="sv-fondu">${scenes[v]}</g>`;
    $(wrap, '[data-txt]').innerHTML = `<strong>${i + 1}.</strong> ${texte}`;
  };
  lierSegments(wrap, ETAPES_PHAGO[0][0], (v) => { i = ETAPES_PHAGO.findIndex((e) => e[0] === v); dessiner(); });
  dessiner();
}

/** Antibiogramme : pastilles d'antibiotiques sur une culture de bactéries. zones = [[nom, diamètre en mm], …]. */
export function schemaAntibiogramme(zones) {
  const places = [[112, 62], [208, 62], [112, 138], [208, 138]];
  return `<svg viewBox="0 0 320 200" class="pc-svg sv-antibio" role="img" aria-label="Antibiogramme">
    <circle cx="160" cy="100" r="96" class="sv-boite"/><circle cx="160" cy="100" r="88" class="sv-culture"/>
    ${zones.map(([nom, mm], k) => `<circle cx="${places[k][0]}" cy="${places[k][1]}" r="${r1(7 + mm * 1.1)}" class="sv-zone-claire"/><circle cx="${places[k][0]}" cy="${places[k][1]}" r="7" class="sv-pastille"/><text x="${places[k][0]}" y="${places[k][1] + 4}" text-anchor="middle" class="sv-pastille-nom">${nom}</text>`).join('')}
  </svg>`;
}

/**
 * Réponse à une infection : quantité d'anticorps et de microbes au cours du
 * temps, chez une personne vaccinée ou non.
 */
export function vaccination(host) {
  let cas = 'non';
  const wrap = cadre(host, `
    ${segments('Personne', [['non', 'Non vaccinée'], ['oui', 'Vaccinée']])}
    <div data-graphe></div>
    <p class="pc-legende"><span class="pc-pastille sv-p-anticorps"></span>anticorps <span class="pc-pastille sv-p-microbes"></span>microbes</p>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const dessiner = () => {
    const non = cas === 'non';
    const anticorps = non ? [[0, 0], [5, 0], [10, 8], [15, 22], [20, 30], [25, 26], [30, 20]] : [[0, 60], [3, 85], [6, 100], [10, 96], [15, 88], [20, 80], [30, 70]];
    const microbes = non ? [[0, 5], [5, 45], [10, 80], [15, 60], [20, 25], [25, 5], [30, 0]] : [[0, 5], [3, 12], [6, 4], [10, 0], [15, 0], [20, 0], [30, 0]];
    $(wrap, '[data-graphe]').innerHTML = schemaCourbe(null, { series: [{ points: anticorps, classe: 'sv-trace sv-c-anticorps' }, { points: microbes, classe: 'sv-trace sv-c-microbes' }], xLabel: 'jours après la contamination', yLabel: 'quantité (unité arbitraire)', ymin: 0, ymax: 100, etiquettes: false });
    $(wrap, '[data-txt]').innerHTML = non
      ? "Premier contact avec le microbe : les anticorps n'apparaissent qu'au bout d'<strong>une semaine</strong>, en faible quantité. Le microbe a le temps de se multiplier : la personne est malade."
      : "Le vaccin a déjà fait fabriquer des <strong>cellules mémoire</strong>. À la contamination, les anticorps sont produits <strong>tout de suite et en grande quantité</strong> : le microbe est éliminé avant la maladie.";
  };
  lierSegments(wrap, cas, (v) => { cas = v; dessiner(); });
  dessiner();
}

// =====================================================================
//  Figures génériques (SVT 5ᵉ / 4ᵉ) : étapes, échanges, flèches
// =====================================================================

/** Flèche (trait + pointe) de (x1, y1) vers (x2, y2). */
export function fleche(x1, y1, x2, y2, classe = '') {
  const a = Math.atan2(y2 - y1, x2 - x1), p = (da, l) => `${r1(x2 - l * Math.cos(a + da))} ${r1(y2 - l * Math.sin(a + da))}`;
  return `<g class="sv-fleche ${classe}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><path d="M${x2} ${y2} L${p(0.45, 9)} L${p(-0.45, 9)}Z"/></g>`;
}
const etiq = (x, y, t, ancre = 'middle', classe = 'pc-petit') => `<text x="${x}" y="${y}" text-anchor="${ancre}" class="${classe}">${t}</text>`;

/**
 * Figure à étapes : une rangée de boutons, un dessin et un texte par étape.
 * liste = [[libellé du bouton, contenu SVG, texte], …].
 */
export function etapes(host, nom, liste, { vb = '0 0 320 180', classe = '' } = {}) {
  let i = 0;
  const wrap = cadre(host, `
    ${segments(nom, liste.map((e, k) => [String(k), e[0]]))}
    <svg viewBox="${vb}" class="pc-svg sv-etapes ${classe}" role="img" aria-label="${nom}" data-svg></svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const dessiner = () => {
    $(wrap, '[data-svg]').innerHTML = `<g class="sv-fondu">${liste[i][1]}</g>`;
    $(wrap, '[data-txt]').innerHTML = liste[i][2];
  };
  lierSegments(wrap, '0', (v) => { i = +v; dessiner(); });
  dessiner();
}

/**
 * Échanges entre deux compartiments séparés par une paroi : des molécules
 * la traversent. flux = [{ nom, classe, sens: 1 (gauche → droite) ou -1 }].
 */
export function echanges(host, { gauche, droite, flux, texte, label = 'Échanges à travers une paroi' }) {
  const wrap = cadre(host, `
    <svg viewBox="0 0 320 170" class="pc-svg sv-echanges" role="img" aria-label="${label}">
      <rect x="4" y="18" width="150" height="130" rx="14" class="sv-comp-g"/><rect x="166" y="18" width="150" height="130" rx="14" class="sv-comp-d"/>
      <rect x="154" y="18" width="12" height="130" class="sv-paroi"/>
      ${etiq(79, 14, gauche)}${etiq(241, 14, droite)}
      <g data-grains></g>
    </svg>
    <p class="pc-legende">${flux.map((f) => `<span><span class="pc-pastille ${f.classe}"></span>${f.nom}</span>`).join(' ')} ${boutonLecture}</p>
    <div class="fig-readout">${texte}</div>`, 'sv-fig');
  const grains = flux.flatMap((f, k) => Array.from({ length: 6 }, (_, j) => ({ f, x: (f.sens > 0 ? 20 : 300) + f.sens * j * 46, y: 40 + ((k * 37 + j * 23) % 96) })));
  const etat = animer(wrap, (dt) => {
    grains.forEach((g) => { g.x += g.f.sens * dt * 32; if (g.x > 306) g.x = 14; if (g.x < 14) g.x = 306; });
    $(wrap, '[data-grains]').innerHTML = grains.map((g) => `<circle cx="${r1(g.x)}" cy="${g.y}" r="5.5" class="sv-grain ${g.f.classe}"/>`).join('');
  });
  lierLecture(wrap, etat);
}

// ======================================================= SYSTÈME SOLAIRE

/** Planètes : nom, type, rayon du dessin, période relative (Terre = 1), classe de couleur. */
export const PLANETES = [
  ['Mercure', 'tellurique', 3, 0.24], ['Vénus', 'tellurique', 4.5, 0.62], ['Terre', 'tellurique', 4.8, 1], ['Mars', 'tellurique', 3.6, 1.9],
  ['Jupiter', 'géante', 10, 11.9], ['Saturne', 'géante', 8.5, 29.5], ['Uranus', 'géante', 6.5, 84], ['Neptune', 'géante', 6.3, 165],
];

/** Le système solaire vu de dessus (ni les tailles ni les distances ne sont à l'échelle). */
export function systemeSolaire(host) {
  let filtre = 'toutes';
  const cx = 170, cy = 122, rayon = (k) => 24 + k * 13.5;
  const wrap = cadre(host, `
    ${segments('Planètes', [['toutes', 'Les 8 planètes'], ['tellurique', 'Planètes rocheuses'], ['géante', 'Planètes géantes']])}
    <svg viewBox="0 0 340 244" class="pc-svg sv-solaire" role="img" aria-label="Le système solaire">
      <rect x="0" y="0" width="340" height="244" rx="12" class="sv-espace"/>
      ${PLANETES.map((p, k) => `<circle cx="${cx}" cy="${cy}" r="${rayon(k)}" class="sv-orbite"/>`).join('')}
      <circle cx="${cx}" cy="${cy}" r="12" class="sv-soleil"/>
      <g data-planetes></g>
    </svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const textes = {
    toutes: "Huit planètes tournent autour du Soleil, une étoile. La Terre est la troisième. Plus une planète est loin du Soleil, plus elle met de temps à en faire le tour. Schéma sans échelle.",
    tellurique: "Mercure, Vénus, la Terre et Mars sont des planètes <strong>rocheuses</strong> (telluriques), petites et proches du Soleil. Seule la Terre possède de l'eau liquide en surface.",
    géante: "Jupiter, Saturne, Uranus et Neptune sont des planètes <strong>géantes</strong>, faites surtout de gaz. Elles sont loin du Soleil et très froides.",
  };
  const dessiner = (t) => {
    $(wrap, '[data-planetes]').innerHTML = PLANETES.map(([nom, type, r, periode], k) => {
      const a = 0.6 + k * 1.7 + (t * 0.9) / Math.sqrt(periode), x = cx + rayon(k) * Math.cos(a), y = cy + rayon(k) * Math.sin(a);
      const eteint = filtre !== 'toutes' && filtre !== type;
      return `<g class="${eteint ? 'sv-eteint' : ''}"><circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" class="sv-planete sv-planete-${k}"/><text x="${r1(x)}" y="${r1(y - r - 3)}" text-anchor="middle" class="sv-txt-clair sv-nom-planete">${nom}</text></g>`;
    }).join('');
  };
  lierSegments(wrap, filtre, (v) => { filtre = v; $(wrap, '[data-txt]').innerHTML = textes[v]; dessiner(etat.t); });
  $(wrap, '[data-txt]').innerHTML = textes.toutes;
  const etat = animer(wrap, (dt, t) => dessiner(t));
  lierLecture(wrap, etat);
}

// ========================================================= CIRCULATION

/**
 * La double circulation du sang : cœur → poumons → cœur → organes → cœur.
 * Le sang riche en dioxygène est rouge, le sang appauvri est bleu.
 */
export function circulation(host) {
  let effort = false;
  // Petite boucle (poumons) et grande boucle (organes), parcourues dans le sens des tableaux.
  const petite = [[146, 96], [118, 70], [118, 24], [202, 24], [202, 70], [174, 96]];
  const grande = [[174, 104], [202, 126], [202, 170], [118, 170], [118, 126], [146, 104]];
  const longueur = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  const point = (pts, d) => {
    let r = ((d % longueur(pts)) + longueur(pts)) % longueur(pts);
    for (let i = 0; i < pts.length - 1; i++) { const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); if (r <= l) return [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * r) / l, pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * r) / l, i]; r -= l; }
    return [...pts[0], 0];
  };
  const trace = (pts) => `M${pts.map((p) => p.join(' ')).join(' L')}`;
  const wrap = cadre(host, `
    ${segments('Activité', [['repos', 'Au repos'], ['effort', "Pendant l'effort"]])}
    <svg viewBox="0 0 320 192" class="pc-svg sv-circulation" role="img" aria-label="La double circulation du sang">
      <path d="${trace(petite)}" class="sv-vaisseau"/><path d="${trace(grande)}" class="sv-vaisseau"/>
      <g data-sang></g>
      <rect x="96" y="6" width="128" height="34" rx="14" class="sv-organe"/>${etiq(160, 28, 'poumons', 'middle', 'pc-etiquette')}
      <rect x="96" y="152" width="128" height="34" rx="14" class="sv-organe"/>${etiq(160, 174, 'organes', 'middle', 'pc-etiquette')}
      <g class="sv-coeur" data-coeur><path d="M160 122 C134 102 132 80 147 80 C155 80 160 88 160 93 C160 88 165 80 173 80 C188 80 186 102 160 122Z"/></g>
      ${etiq(200, 104, 'cœur', 'start', 'pc-etiquette')}
    </svg>
    <p class="pc-legende"><span class="pc-pastille sv-p-rouge"></span>sang riche en dioxygène <span class="pc-pastille sv-p-bleu"></span>sang appauvri en dioxygène ${boutonLecture}</p>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  let d = 0;
  const maj = () => { $(wrap, '[data-txt]').innerHTML = effort ? "Pendant l'effort, le cœur bat plus vite : le sang apporte davantage de dioxygène et de nutriments aux muscles." : 'Le cœur est une pompe : il envoie le sang vers les poumons, où il se charge en dioxygène, puis vers tous les organes.'; };
  lierSegments(wrap, 'repos', (v) => { effort = v === 'effort'; maj(); });
  maj();
  const etat = animer(wrap, (dt, t) => {
    d += dt * (effort ? 95 : 42);
    const n = 9, Lp = longueur(petite), Lg = longueur(grande);
    let s = '';
    for (let k = 0; k < n; k++) {
      const [x, y, i] = point(petite, d + (k * Lp) / n); s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="4" class="sv-globule ${i >= 2 ? 'sv-rouge' : 'sv-bleu'}"/>`;
      const [u, v, j] = point(grande, d + (k * Lg) / n); s += `<circle cx="${r1(u)}" cy="${r1(v)}" r="4" class="sv-globule ${j >= 2 ? 'sv-bleu' : 'sv-rouge'}"/>`;
    }
    $(wrap, '[data-sang]').innerHTML = s;
    const battement = 1 + 0.12 * Math.max(0, Math.sin(t * (effort ? 16 : 7)));
    $(wrap, '[data-coeur]').setAttribute('style', `transform:scale(${r1(battement * 100) / 100})`);
  });
  lierLecture(wrap, etat);
}

// ============================================================== EFFORT

/** Fréquence cardiaque maximale théorique : 220 − âge. */
export const fcMax = (age) => 220 - age;

/** Effort physique : plus l'effort est intense, plus le cœur et la respiration s'accélèrent (modèle simplifié). */
export function effortPhysique(host) {
  let k = 0; // intensité de 0 à 100
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Intensité de l'effort <input type="range" min="0" max="100" step="10" value="0" data-k> <span class="fig-val" data-kv></span></label></div>
    <svg viewBox="0 0 320 150" class="pc-svg sv-effort" role="img" aria-label="Fréquence cardiaque et fréquence respiratoire selon l'effort">
      <g class="sv-coeur" data-coeur style="transform-origin:60px 70px"><path d="M60 104 C26 78 22 48 44 48 C54 48 60 58 60 64 C60 58 66 48 76 48 C98 48 94 78 60 104Z"/></g>
      ${etiq(120, 44, 'cœur (battements par minute)', 'start')}<rect x="120" y="50" width="180" height="16" rx="8" class="sv-jauge"/><rect x="120" y="50" width="0" height="16" rx="8" class="sv-jauge-on sv-j-coeur" data-jc/>
      ${etiq(120, 98, 'respiration (mouvements par minute)', 'start')}<rect x="120" y="104" width="180" height="16" rx="8" class="sv-jauge"/><rect x="120" y="104" width="0" height="16" rx="8" class="sv-jauge-on sv-j-resp" data-jr/>
    </svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const fc = () => Math.round(70 + 1.2 * k), fr = () => Math.round(16 + 0.24 * k);
  const maj = () => {
    $(wrap, '[data-kv]').textContent = k === 0 ? 'repos' : `${k} %`;
    $(wrap, '[data-jc]').setAttribute('width', r1((180 * fc()) / 200));
    $(wrap, '[data-jr]').setAttribute('width', r1((180 * fr()) / 45));
    $(wrap, '[data-txt]').innerHTML = `Cœur : <strong>${fc()} battements par minute</strong> · respiration : <strong>${fr()} mouvements par minute</strong> (modèle simplifié). ` + (k === 0 ? 'Au repos, les besoins des muscles sont faibles.' : k < 100 ? 'Les muscles consomment plus de dioxygène et de nutriments : le cœur et la respiration accélèrent.' : "L'organisme approche de ses limites : il ne peut pas accélérer indéfiniment.");
  };
  $(wrap, '[data-k]').addEventListener('input', (e) => { k = +e.target.value || 0; maj(); });
  maj();
  animer(wrap, (dt, t) => {
    const s = 1 + 0.1 * Math.max(0, Math.sin((t * fc() * 2 * Math.PI) / 60));
    $(wrap, '[data-coeur]').setAttribute('style', `transform-origin:60px 70px;transform:scale(${r1(s * 100) / 100})`);
  });
}

// ============================================================ DIGESTION

const TUBE = [[150, 16], [150, 58], [128, 74], [150, 96], [186, 108], [128, 120], [190, 132], [128, 144], [200, 156], [224, 120], [224, 86], [246, 86], [246, 170]];
const ORGANES_TUBE = [
  [0, 'la bouche', 'Les dents broient les aliments, la salive commence à les transformer.'],
  [1, "l'œsophage", "Il conduit les aliments vers l'estomac."],
  [2, "l'estomac", 'Les aliments y sont brassés et transformés par le suc gastrique.'],
  [4, "l'intestin grêle", 'La digestion se termine. Les nutriments traversent la paroi et passent dans le sang : c\'est l\'absorption.'],
  [9, 'le gros intestin', "L'eau est récupérée ; ce qui n'a pas été digéré forme les excréments."],
];

/** Trajet d'une bouchée dans le tube digestif. */
export function trajetDigestif(host) {
  let d = -1;
  const lg = TUBE.slice(1).map((p, i) => Math.hypot(p[0] - TUBE[i][0], p[1] - TUBE[i][1])), total = lg.reduce((a, b) => a + b, 0);
  const wrap = cadre(host, `
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-go>Avaler une bouchée</button></div>
    <svg viewBox="0 0 320 184" class="pc-svg sv-digestif" role="img" aria-label="Trajet des aliments dans le tube digestif">
      <path d="M${TUBE.map((p) => p.join(' ')).join(' L')}" class="sv-tube"/>
      <ellipse cx="136" cy="80" rx="26" ry="18" class="sv-estomac"/>
      ${etiq(170, 20, 'bouche', 'start')}${etiq(164, 46, 'œsophage', 'start')}${etiq(100, 78, 'estomac', 'end')}${etiq(112, 134, 'intestin grêle', 'end')}${etiq(256, 130, 'gros intestin', 'start')}
      <circle r="7" class="sv-bol" data-bol style="opacity:0"/>
    </svg>
    <div class="fig-readout" data-txt>Les aliments parcourent le tube digestif dans un seul sens. Ils y sont transformés en nutriments.</div>`, 'sv-fig');
  $(wrap, '[data-go]').addEventListener('click', () => { d = 0; });
  animer(wrap, (dt) => {
    if (d < 0) return;
    d += dt * 38;
    let r = Math.min(d, total - 0.01), i = 0;
    while (r > lg[i]) { r -= lg[i]; i++; }
    const x = TUBE[i][0] + ((TUBE[i + 1][0] - TUBE[i][0]) * r) / lg[i], y = TUBE[i][1] + ((TUBE[i + 1][1] - TUBE[i][1]) * r) / lg[i];
    const bol = $(wrap, '[data-bol]');
    bol.setAttribute('cx', r1(x)); bol.setAttribute('cy', r1(y));
    bol.setAttribute('r', r1(7 - 4 * (d / total)));
    bol.setAttribute('style', 'opacity:1');
    const o = [...ORGANES_TUBE].reverse().find((e) => i >= e[0]);
    $(wrap, '[data-txt]').innerHTML = `Dans <strong>${o[1]}</strong>. ${o[2]}`;
    if (d >= total) d = -1;
  });
}

/** Groupes d'aliments d'un repas : [aliment, groupe]. */
export const ALIMENTS = [
  ['des pâtes', 'féculents'], ['du pain', 'féculents'], ['du riz', 'féculents'], ['des haricots verts', 'fruits et légumes'], ['une pomme', 'fruits et légumes'], ['des carottes râpées', 'fruits et légumes'],
  ['un yaourt', 'produits laitiers'], ['du fromage', 'produits laitiers'], ['du poisson', 'viande, poisson, œuf'], ['un œuf', 'viande, poisson, œuf'], ['du poulet', 'viande, poisson, œuf'],
  ["de l'huile d'olive", 'matières grasses'], ['du beurre', 'matières grasses'], ['un soda', 'produits sucrés'], ['des bonbons', 'produits sucrés'], ["de l'eau", 'boisson'],
];
const GROUPES_REPAS = ['féculents', 'fruits et légumes', 'produits laitiers', 'viande, poisson, œuf', 'boisson'];

/** Composer un repas : la figure indique les groupes d'aliments présents et ceux qui manquent. */
export function assiette(host) {
  const choisis = new Set();
  const wrap = cadre(host, `
    <div class="sv-aliments">${ALIMENTS.map(([nom], i) => `<button type="button" class="assoc-opt" data-al="${i}" aria-pressed="false">${nom}</button>`).join('')}</div>
    <div class="fig-readout" data-txt>Compose ton repas en choisissant des aliments.</div>`, 'sv-fig');
  wrap.querySelectorAll('[data-al]').forEach((b) => b.addEventListener('click', () => {
    const i = +b.dataset.al;
    if (choisis.has(i)) choisis.delete(i); else choisis.add(i);
    b.setAttribute('aria-pressed', String(choisis.has(i)));
    const groupes = new Set([...choisis].map((k) => ALIMENTS[k][1]));
    const manque = GROUPES_REPAS.filter((g) => !groupes.has(g));
    const sucre = groupes.has('produits sucrés');
    $(wrap, '[data-txt]').innerHTML = !choisis.size ? 'Compose ton repas en choisissant des aliments.'
      : (manque.length ? `Il manque : <strong>${manque.join(', ')}</strong>.` : '<strong>Repas équilibré</strong> : tous les groupes utiles sont présents.')
        + (sucre ? ' Les produits sucrés sont à limiter : ils apportent beaucoup d\'énergie et peu d\'éléments utiles.' : '');
  }));
}

/** Digestion chimique : une enzyme découpe une grosse molécule (amidon) en petites molécules (glucose), qui passent dans le sang. */
export function enzyme(host) {
  let t0 = -1;
  const N = 12;
  const wrap = cadre(host, `
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-go>Ajouter l'enzyme</button><button type="button" class="btn btn-ghost" data-raz>Recommencer</button></div>
    <svg viewBox="0 0 320 170" class="pc-svg sv-enzyme" role="img" aria-label="Une enzyme découpe l'amidon en glucose">
      <rect x="0" y="0" width="320" height="96" class="sv-lumiere-intestin"/>${etiq(8, 14, "intérieur de l'intestin", 'start')}
      <rect x="0" y="96" width="320" height="14" class="sv-paroi"/>${etiq(312, 107, "paroi de l'intestin", 'end', 'sv-txt-clair')}
      <rect x="0" y="110" width="320" height="60" class="sv-sang-fond"/>${etiq(8, 164, 'sang', 'start', 'sv-txt-clair')}
      <g data-perles></g>
    </svg>
    <div class="fig-readout" data-txt>L'amidon est une très grosse molécule, formée d'une chaîne de molécules de glucose : elle ne peut pas traverser la paroi de l'intestin.</div>`, 'sv-fig');
  const dessiner = (t) => {
    // t : temps écoulé depuis l'ajout de l'enzyme. Coupe progressive (0 à 3 s), puis absorption (3 à 6 s).
    const coupe = t < 0 ? 0 : Math.min(1, t / 3), abs = t < 3 ? 0 : Math.min(1, (t - 3) / 3);
    let s = '';
    for (let i = 0; i < N; i++) {
      const ecart = coupe * (((i * 7) % 5) - 2) * 9, x = 44 + i * 21 + ecart * 0.4, y = 52 + ecart + abs * (88 + (i % 3) * 8);
      if (i < N - 1 && coupe < (i + 1) / N) s += `<line x1="${r1(x)}" y1="52" x2="${r1(x + 21)}" y2="52" class="sv-liaison"/>`;
      s += `<circle cx="${r1(x)}" cy="${r1(Math.min(y, 160))}" r="8" class="sv-glucose"/>`;
    }
    if (t >= 0 && t < 3) s += `<path d="M${r1(44 + coupe * 231)} 30 l-9 -12 h18z" class="sv-enzyme-outil"/>`;
    $(wrap, '[data-perles]').innerHTML = s;
    if (t >= 0) $(wrap, '[data-txt]').innerHTML = t < 3 ? "L'<strong>enzyme</strong> coupe les liaisons une à une : l'amidon est transformé en glucose." : 'Le <strong>glucose</strong>, petite molécule, traverse la paroi et passe dans le sang : c\'est un <strong>nutriment</strong>.';
  };
  $(wrap, '[data-go]').addEventListener('click', () => { if (t0 < 0) t0 = 0; });
  $(wrap, '[data-raz]').addEventListener('click', () => { t0 = -1; dessiner(-1); $(wrap, '[data-txt]').innerHTML = "L'amidon est une très grosse molécule, formée d'une chaîne de molécules de glucose : elle ne peut pas traverser la paroi de l'intestin."; });
  dessiner(-1);
  animer(wrap, (dt) => { if (t0 < 0) return; t0 = Math.min(t0 + dt, 6); dessiner(t0); });
}

// ======================================================= SÉISMES, PLAQUES

/** Un séisme en coupe : rupture au foyer, ondes dans toutes les directions, épicentre en surface. */
export function seisme(host) {
  let t0 = -1;
  const wrap = cadre(host, `
    <div class="pc-boutons"><button type="button" class="btn btn-primary" data-go>Déclencher le séisme</button></div>
    <svg viewBox="0 0 320 180" class="pc-svg sv-seisme" role="img" aria-label="Coupe d'un séisme : foyer, épicentre et ondes sismiques">
      <rect x="0" y="0" width="320" height="50" class="sv-ciel"/><rect x="0" y="50" width="320" height="130" class="sv-roche"/>
      <path d="M96 180 L186 50" class="sv-faille"/>${etiq(104, 172, 'faille', 'start', 'sv-txt-clair')}
      <g data-ondes></g>
      <path d="M150 112 l4 -9 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6z" class="sv-foyer"/>${etiq(176, 124, 'foyer', 'start', 'sv-txt-clair')}
      <circle cx="158" cy="50" r="5" class="sv-epicentre"/>${etiq(158, 40, 'épicentre')}
      <g data-maisons><rect x="60" y="34" width="16" height="16" class="sv-maison"/><rect x="196" y="34" width="16" height="16" class="sv-maison"/><rect x="262" y="34" width="16" height="16" class="sv-maison"/></g>
    </svg>
    <div class="fig-readout" data-txt>Les roches, soumises à des contraintes, accumulent de l'énergie pendant des années.</div>`, 'sv-fig');
  $(wrap, '[data-go]').addEventListener('click', () => { t0 = 0; });
  animer(wrap, (dt) => {
    if (t0 < 0) return;
    t0 += dt;
    $(wrap, '[data-ondes]').innerHTML = [0, 0.6, 1.2].map((dec) => { const r = (t0 - dec) * 46; return r > 0 && r < 190 ? `<circle cx="158" cy="118" r="${r1(r)}" class="sv-onde-sismique" style="opacity:${r1(1 - r / 190)}"/>` : ''; }).join('');
    const sec = t0 > 1.4 && t0 < 4.4;
    $(wrap, '[data-maisons]').setAttribute('class', sec ? 'sv-tremble' : '');
    $(wrap, '[data-txt]').innerHTML = t0 < 1.4 ? 'Les roches cassent brutalement au <strong>foyer</strong>, en profondeur. Des <strong>ondes sismiques</strong> partent dans toutes les directions.' : "Les ondes atteignent la surface : les secousses sont les plus fortes à l'<strong>épicentre</strong>, à la verticale du foyer, et s'atténuent en s'éloignant.";
    if (t0 > 6) t0 = -1;
  });
}

/** Les trois mouvements aux limites de plaques. */
export function plaques(host) {
  let mode = 'divergence';
  const textes = {
    divergence: "Les deux plaques <strong>s'écartent</strong>. Du magma remonte et forme une nouvelle croûte au fond de l'océan : c'est une <strong>dorsale océanique</strong>.",
    convergence: "Les deux plaques <strong>se rapprochent</strong>. La plaque océanique plonge sous l'autre : c'est une <strong>zone de subduction</strong>, avec de forts séismes et des volcans explosifs.",
    coulissage: "Les deux plaques <strong>coulissent</strong> l'une contre l'autre le long d'une faille. Elles se bloquent, puis lâchent d'un coup : séisme.",
  };
  const wrap = cadre(host, `
    ${segments('Mouvement', [['divergence', 'Écartement'], ['convergence', 'Rapprochement'], ['coulissage', 'Coulissage']])}
    <svg viewBox="0 0 320 160" class="pc-svg sv-plaques" role="img" aria-label="Mouvement de deux plaques lithosphériques" data-svg></svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const dessiner = (t) => {
    const u = (t % 3) / 3, e = u * 16; // déplacement cyclique
    let s = '<rect x="0" y="92" width="320" height="68" class="sv-manteau"/>';
    if (mode === 'divergence') {
      s += `<path d="M160 150 L150 96 L160 ${r1(84 - u * 6)} L170 96Z" class="sv-magma"/>`
        + `<rect x="${r1(-e)}" y="70" width="152" height="24" class="sv-plaque"/><rect x="${r1(168 + e)}" y="70" width="152" height="24" class="sv-plaque"/>`
        + fleche(110, 56, 70, 56, 'sv-f-plaque') + fleche(210, 56, 250, 56, 'sv-f-plaque') + etiq(160, 40, 'dorsale');
    } else if (mode === 'convergence') {
      s += `<path d="M${r1(-20 + e)} 70 H${r1(150 + e)} L${r1(230 + e * 0.6)} 150 L${r1(214 + e * 0.6)} 158 L${r1(140 + e)} 94 H${r1(-20 + e)}Z" class="sv-plaque sv-plaque-oceanique"/>`
        + `<path d="M172 94 L180 62 H320 V94Z" class="sv-plaque"/><path d="M226 62 l12 -26 l12 26z" class="sv-volcan"/><circle cx="238" cy="${r1(30 - u * 10)}" r="${r1(2 + u * 3)}" class="sv-fumee"/>`
        + fleche(60, 56, 100, 56, 'sv-f-plaque') + etiq(86, 46, 'plaque océanique') + etiq(276, 84, 'plaque continentale', 'middle', 'sv-txt-clair');
    } else {
      s = `<rect x="0" y="0" width="320" height="160" class="sv-mer"/><rect x="${r1(-16 + e)}" y="14" width="352" height="62" class="sv-plaque"/><rect x="${r1(-e)}" y="84" width="352" height="62" class="sv-plaque sv-plaque-oceanique"/>`
        + '<line x1="0" y1="80" x2="320" y2="80" class="sv-faille"/>' + fleche(130, 46, 180, 46, 'sv-f-plaque') + fleche(190, 114, 140, 114, 'sv-f-plaque') + etiq(160, 22, 'vue de dessus');
    }
    $(wrap, '[data-svg]').innerHTML = s;
  };
  lierSegments(wrap, mode, (v) => { mode = v; $(wrap, '[data-txt]').innerHTML = textes[v]; });
  $(wrap, '[data-txt]').innerHTML = textes[mode];
  animer(wrap, (dt, t) => dessiner(t));
}

// ========================================================= TEMPS GÉOLOGIQUES

/** Repères de l'histoire de la Terre et de la vie : [nom, date lisible, position sur la frise (0 à 1), texte]. */
export const REPERES_TEMPS = [
  ['Formation de la Terre', 'il y a 4,54 milliards d\'années', 0.02, "La Terre se forme en même temps que le reste du système solaire."],
  ['Premières cellules', 'il y a environ 3,8 milliards d\'années', 0.2, "Les plus anciennes traces de vie sont celles d'êtres vivants faits d'une seule cellule."],
  ['Début du Paléozoïque', 'il y a 539 millions d\'années', 0.5, "Les fossiles d'animaux deviennent abondants. La vie, d'abord marine, gagne ensuite les continents."],
  ['Grande crise', 'il y a 252 millions d\'années', 0.68, 'La plus grande extinction connue marque la fin du Paléozoïque et le début du Mésozoïque, l\'ère des dinosaures.'],
  ['Disparition des dinosaures', 'il y a 66 millions d\'années', 0.84, 'Une nouvelle crise marque la fin du Mésozoïque. Au Cénozoïque, les mammifères se diversifient.'],
  ['Homo sapiens', 'il y a 300 000 ans', 0.98, "Notre espèce apparaît tout à la fin de la frise : à l'échelle de la Terre, c'est très récent."],
];
const friseTemps = (k) => {
  const x = (p) => r1(14 + p * 292);
  const eres = [['Précambrien', 0, 0.5, 'sv-ere-0'], ['Paléozoïque', 0.5, 0.68, 'sv-ere-1'], ['Mésozoïque', 0.68, 0.84, 'sv-ere-2'], ['Cénozoïque', 0.84, 1, 'sv-ere-3']];
  return eres.map(([nom, a, b, c], k) => `<rect x="${x(a)}" y="70" width="${r1((b - a) * 292)}" height="30" class="${c}"/>${etiq(r1((x(a) + x(b)) / 2), k % 2 ? 132 : 118, nom)}`).join('')
    + REPERES_TEMPS.map((r, i) => `<circle cx="${x(r[2])}" cy="85" r="${i === k ? 9 : 5}" class="sv-repere-temps ${i === k ? 'sv-repere-temps-on' : ''}"/>`).join('')
    + `<path d="M${x(REPERES_TEMPS[k][2])} 66 v-22" class="sv-fleche-repere"/>` + etiq(Math.max(70, Math.min(250, x(REPERES_TEMPS[k][2]))), 34, REPERES_TEMPS[k][1], 'middle', 'pc-etiquette')
    + etiq(160, 154, 'frise non proportionnelle');
};
/** Frise des temps géologiques. */
export function frise(host) {
  etapes(host, 'Repère', REPERES_TEMPS.map((r, k) => [r[0], friseTemps(k), `<strong>${r[0]}</strong>, ${r[1]}. ${r[3]}`]), { vb: '0 0 320 160', classe: 'sv-frise' });
}

// ========================================================= CYCLE MENSTRUEL

/** Cycle de 28 jours : épaisseur de la paroi de l'utérus et ovulation. options.pilule : case « pilule ». */
export function cycleMenstruel(host, { pilule = false } = {}) {
  let j = 1, sous = false;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Jour du cycle <input type="range" min="1" max="28" step="1" value="1" data-j> <span class="fig-val" data-jv></span></label></div>
    ${pilule ? '<label class="pc-case"><input type="checkbox" data-pil> Pilule contraceptive</label>' : ''}
    <svg viewBox="0 0 320 170" class="pc-svg sv-cycle" role="img" aria-label="Le cycle de l'utérus et de l'ovaire" data-svg></svg>
    <div class="fig-readout" data-txt></div>`, 'sv-fig');
  const epaisseur = (d) => (d <= 5 ? 14 - 2 * d : 4 + ((d - 5) * 22) / 23);
  const maj = () => {
    const e = epaisseur(j), ovulation = !sous && j === 14;
    let cal = '';
    for (let d = 1; d <= 28; d++) cal += `<rect x="${r1(10 + (d - 1) * 10.7)}" y="146" width="9" height="14" rx="2" class="sv-jour ${d <= 5 ? 'sv-jour-regles' : ''} ${d === 14 && !sous ? 'sv-jour-ovulation' : ''} ${d === j ? 'sv-jour-on' : ''}"/>`;
    $(wrap, '[data-svg]').innerHTML = `
      ${etiq(70, 14, 'paroi de l\'utérus')}<rect x="20" y="22" width="100" height="100" rx="14" class="sv-uterus"/>
      <rect x="${r1(20 + e)}" y="${r1(22 + e)}" width="${r1(100 - 2 * e)}" height="${r1(100 - 2 * e)}" rx="10" class="sv-cavite"/>
      ${j <= 5 ? '<path d="M70 122 v14 M62 122 v9 M78 122 v9" class="sv-regles"/>' : ''}
      ${etiq(232, 14, 'ovaire')}<ellipse cx="232" cy="72" rx="56" ry="40" class="sv-ovaire"/>
      ${sous ? etiq(232, 76, 'au repos') : `<circle cx="${ovulation ? 296 : 232}" cy="${ovulation ? 60 : 72}" r="${j < 14 ? r1(4 + j * 0.8) : j === 14 ? 7 : 5}" class="${j <= 14 ? 'sv-ovule' : 'sv-ovule-vide'}"/>`}
      ${ovulation ? etiq(296, 46, 'ovule') : ''}
      ${cal}${etiq(15, 142, '1', 'middle')}${etiq(154, 142, '14', 'middle')}${etiq(304, 142, '28', 'middle')}`;
    $(wrap, '[data-jv]').textContent = `jour ${j}`;
    $(wrap, '[data-txt]').innerHTML = sous ? "Avec la pilule, les hormones de synthèse bloquent l'<strong>ovulation</strong> : aucun ovule n'est libéré, la fécondation est impossible."
      : j <= 5 ? "<strong>Règles</strong> : la couche superficielle de la paroi de l'utérus est éliminée avec un peu de sang. C'est le début du cycle."
      : j < 14 ? "La paroi de l'utérus <strong>s'épaissit</strong> à nouveau. Dans l'ovaire, un ovule se prépare."
      : j === 14 ? "<strong>Ovulation</strong> : l'ovaire libère un ovule. C'est la période où une fécondation est possible."
      : "La paroi de l'utérus, épaisse et riche en vaisseaux sanguins, est prête à accueillir un embryon. Sans fécondation, elle sera éliminée : un nouveau cycle commencera.";
  };
  $(wrap, '[data-j]').addEventListener('input', (e) => { j = +e.target.value || 1; maj(); });
  if (pilule) $(wrap, '[data-pil]').addEventListener('change', (e) => { sous = !!e.target.checked; maj(); });
  maj();
}

// ===================================================== SCHÉMAS À LÉGENDER

const reperes = (ordre, places) => places.map(([nom, x, y, x2, y2]) => `<path d="M${x} ${y} L${x2} ${y2}" class="sv-fleche-repere"/><circle cx="${x}" cy="${y}" r="10" class="sv-repere"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="sv-repere-num">${ordre.indexOf(nom) + 1}</text>`).join('');

/** Fleur en coupe : sépale, pétale, étamine, pistil. */
export const PARTIES_FLEUR = ['pétale', 'sépale', 'étamine', 'pistil'];
export function schemaFleur(ordre = PARTIES_FLEUR) {
  return `<svg viewBox="0 0 320 190" class="pc-svg sv-schema" role="img" aria-label="Coupe d'une fleur à légender">
    <path d="M160 190 V150" class="sv-trait"/>
    <path d="M160 150 C120 150 84 120 70 60 C104 76 136 104 160 150Z M160 150 C200 150 236 120 250 60 C216 76 184 104 160 150Z" class="sv-plein-rose"/>
    <path d="M160 152 C140 152 118 146 104 126 C126 128 146 136 160 152Z M160 152 C180 152 202 146 216 126 C194 128 174 136 160 152Z" class="sv-plein-vert"/>
    <path d="M160 150 C150 130 150 100 156 70 H164 C170 100 170 130 160 150Z" class="sv-plein-vert"/><circle cx="160" cy="66" r="7" class="sv-plein-vert"/>
    <path d="M150 146 L128 84 M170 146 L192 84" class="sv-trait"/><ellipse cx="126" cy="78" rx="7" ry="11" class="sv-plein-jaune"/><ellipse cx="194" cy="78" rx="7" ry="11" class="sv-plein-jaune"/>
    ${reperes(ordre, [['pétale', 44, 40, 82, 76], ['sépale', 50, 150, 110, 132], ['étamine', 258, 30, 198, 72], ['pistil', 160, 22, 160, 58]])}
  </svg>`;
}

/** Tube digestif : bouche, œsophage, estomac, intestin grêle, gros intestin. */
export const PARTIES_TUBE = ['bouche', 'œsophage', 'estomac', 'intestin grêle', 'gros intestin'];
export function schemaTubeDigestif(ordre = PARTIES_TUBE) {
  return `<svg viewBox="0 0 320 184" class="pc-svg sv-schema sv-digestif" role="img" aria-label="Tube digestif à légender">
    <path d="M${TUBE.map((p) => p.join(' ')).join(' L')}" class="sv-tube"/><ellipse cx="136" cy="80" rx="26" ry="18" class="sv-estomac"/>
    ${reperes(ordre, [['bouche', 196, 16, 158, 16], ['œsophage', 196, 44, 156, 40], ['estomac', 70, 80, 110, 80], ['intestin grêle', 70, 140, 124, 134], ['gros intestin', 286, 120, 252, 120]])}
  </svg>`;
}

/** Coupe d'un séisme : foyer, épicentre, faille, ondes sismiques. */
export const PARTIES_SEISME = ['foyer', 'épicentre', 'faille', 'ondes sismiques'];
export function schemaSeisme(ordre = PARTIES_SEISME) {
  return `<svg viewBox="0 0 320 180" class="pc-svg sv-schema sv-seisme" role="img" aria-label="Coupe d'un séisme à légender">
    <rect x="0" y="0" width="320" height="50" class="sv-ciel"/><rect x="0" y="50" width="320" height="130" class="sv-roche"/>
    <path d="M96 180 L186 50" class="sv-faille"/>
    <circle cx="158" cy="118" r="30" class="sv-onde-sismique"/><circle cx="158" cy="118" r="54" class="sv-onde-sismique" style="opacity:.6"/>
    <path d="M150 112 l4 -9 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6z" class="sv-foyer"/><circle cx="158" cy="50" r="5" class="sv-epicentre"/>
    ${reperes(ordre, [['foyer', 256, 150, 172, 122], ['épicentre', 230, 22, 164, 46], ['faille', 50, 150, 110, 156], ['ondes sismiques', 60, 90, 106, 100]])}
  </svg>`;
}
