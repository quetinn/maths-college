// =====================================================================
//  figures_cycle.js — Figures animées de physique-chimie 5ᵉ et 4ᵉ
//
//  Mêmes règles que figures.js : l'animation explique un phénomène
//  (particules, électrons, flux d'énergie, lumière…), la boucle `animer`
//  s'arrête quand la figure quitte la page, bouton lecture/pause, SVG
//  écrit en chaînes pour tourner aussi dans le banc de test.
// =====================================================================

import { arrondi } from '../commun.js';
import { animer, cadre, lierLecture, boutonLecture, nb } from './figures.js';

const $ = (w, s) => w.querySelector(s);
const r1 = (x) => arrondi(x, 1);
const borne = (x, a, b) => Math.max(a, Math.min(b, x));

/** Chemin polygonal : longueur totale et point situé à l'abscisse curviligne d. */
function chemin(pts) {
  const segs = [];
  let L = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1);
    segs.push([x1, y1, x2, y2, l]); L += l;
  }
  return {
    L,
    at(d) {
      let r = ((d % L) + L) % L;
      for (const [x1, y1, x2, y2, l] of segs) {
        if (r <= l) { const u = l ? r / l : 0; return [x1 + (x2 - x1) * u, y1 + (y2 - y1) * u]; }
        r -= l;
      }
      return pts[0];
    },
  };
}

/**
 * Électrons régulièrement espacés sur un chemin, qui avancent à la vitesse v (px/s).
 * La densité est la même sur tous les chemins : seule la vitesse change avec l'intensité.
 */
function fluxElectrons(pts) {
  const c = chemin(pts), n = Math.max(2, Math.round(c.L / 17));
  let phase = 0;
  return {
    avancer(dt, v) { phase += dt * v; },
    svg() {
      let s = '';
      for (let k = 0; k < n; k++) { const [x, y] = c.at(phase + (k * c.L) / n); s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="3.6" class="pc-electron"/>`; }
      return s;
    },
  };
}

/** Boutons segmentés (choix exclusif) ; `choisir(valeur)` est appelé au clic. */
const segments = (nom, options) =>
  `<div class="pc-segment" role="group" aria-label="${nom}">${options.map(([v, l]) => `<button type="button" class="pc-seg" data-seg="${v}">${l}</button>`).join('')}</div>`;
function lierSegments(wrap, courant, choisir) {
  const bs = [...wrap.querySelectorAll('[data-seg]')];
  const maj = (v) => bs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.seg === v)));
  bs.forEach((b) => b.addEventListener('click', () => { maj(b.dataset.seg); choisir(b.dataset.seg); }));
  maj(courant);
}

/** Pastille oui / non pour les propriétés. */
const prop = (ok, libelle) => `<span class="pc-prop ${ok ? 'oui' : 'non'}">${libelle} : <b>${ok ? 'oui' : 'non'}</b></span>`;

// ===================================================== ÉTATS DE LA MATIÈRE

const ETATS = {
  solide: { f: true, v: true, c: false, t: 'Les particules sont <strong>serrées et rangées</strong> : elles vibrent sur place, sans se déplacer. Le solide garde sa forme.' },
  liquide: { f: false, v: true, c: false, t: 'Les particules sont <strong>serrées mais en désordre</strong> : elles glissent les unes sur les autres. Le liquide prend la forme du récipient ; au repos, sa surface libre est plane et horizontale.' },
  gaz: { f: false, v: false, c: true, t: "Les particules sont <strong>éloignées et en désordre</strong> : elles filent dans tout l'espace disponible. C'est pour cela qu'un gaz occupe tout le récipient et qu'on peut le comprimer." },
};

/** Modèle particulaire : solide (rangé, vibre), liquide (serré, glisse), gaz (dispersé, rapide). */
export function particules(host, { depart = 'solide' } = {}) {
  let mode = ETATS[depart] ? depart : 'solide';
  const R = 7, N = 24, BX0 = 70, BX1 = 250, BY0 = 24, BY1 = 150;
  const grille = Array.from({ length: N }, (_, i) => [160 - 37.5 + (i % 6) * 15, BY1 - R - 0.5 - Math.floor(i / 6) * 14.5]);
  const p = grille.map(([x, y]) => ({ x, y, vx: 0, vy: 0 }));
  const wrap = cadre(host, `
    ${segments('État de la matière', [['solide', 'Solide'], ['liquide', 'Liquide'], ['gaz', 'Gaz']])}
    <svg viewBox="0 0 320 160" class="pc-svg" role="img" aria-label="Modèle particulaire des trois états de la matière" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<span class="pc-legende"><span class="pc-pastille pc-p-molecule"></span>une particule (molécule)</span></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const lancer = () => p.forEach((q) => { const a = Math.random() * 2 * Math.PI; q.vx = 120 * Math.cos(a); q.vy = 120 * Math.sin(a); });
  const pas = (dt, t) => {
    if (mode === 'solide') {
      const k = Math.min(1, dt * 6);
      p.forEach((q, i) => {
        const [gx, gy] = grille[i];
        q.x += (gx + 1.3 * Math.sin(t * 31 + i * 1.7) - q.x) * k; q.y += (gy + 1.3 * Math.cos(t * 27 + i * 2.3) - q.y) * k; q.vx = q.vy = 0;
      });
      return;
    }
    const liq = mode === 'liquide';
    p.forEach((q) => {
      if (liq) {
        q.vy += 500 * dt; q.vx += (Math.random() - 0.5) * 900 * dt; q.vy += (Math.random() - 0.5) * 900 * dt;
        const amorti = 1 - Math.min(1, 2.5 * dt); q.vx *= amorti; q.vy *= amorti;
      } else {
        const v = Math.hypot(q.vx, q.vy) || 1, k = 1 + ((120 - v) / v) * Math.min(1, dt * 2); q.vx *= k; q.vy *= k;
      }
      q.x += q.vx * dt; q.y += q.vy * dt;
      if (q.x < BX0 + R) { q.x = BX0 + R; q.vx = Math.abs(q.vx); }
      if (q.x > BX1 - R) { q.x = BX1 - R; q.vx = -Math.abs(q.vx); }
      if (q.y < BY0 + R) { q.y = BY0 + R; q.vy = Math.abs(q.vy); }
      if (q.y > BY1 - R) { q.y = BY1 - R; q.vy = -Math.abs(q.vy) * (liq ? 0.2 : 1); }
    });
    // Contacts : les particules ne se traversent pas.
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = p[i], b = p[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
        if (!(d > 0 && d < 2 * R)) continue;
        const e = (2 * R - d) / 2, ux = dx / d, uy = dy / d;
        a.x -= ux * e; a.y -= uy * e; b.x += ux * e; b.y += uy * e;
        if (!liq) { const va = a.vx * ux + a.vy * uy, vb = b.vx * ux + b.vy * uy; a.vx += (vb - va) * ux; a.vy += (vb - va) * uy; b.vx += (va - vb) * ux; b.vy += (va - vb) * uy; }
      }
    }
  };
  const dessiner = () => {
    let s = `<path d="M${BX0} ${BY0 - 8} V${BY1} H${BX1} V${BY0 - 8}" class="pc-verre"/>`;
    if (mode === 'gaz') s += `<path d="M${BX0 - 8} ${BY0 - 2} H${BX1 + 8}" class="pc-verre pc-couvercle"/>`;
    s += p.map((q) => `<circle cx="${r1(q.x)}" cy="${r1(q.y)}" r="${R - 0.6}" class="pc-molecule"/>`).join('');
    s += `<text x="160" y="${BY0 - 12}" text-anchor="middle" class="pc-petit">${mode === 'gaz' ? 'récipient fermé' : 'récipient ouvert'}</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    const T = ETATS[mode];
    $(wrap, '[data-txt]').innerHTML = `<div class="pc-props">${prop(T.f, 'forme propre')}${prop(T.v, 'volume propre')}${prop(T.c, 'compressible')}</div>${T.t}`;
  };
  const etat = animer(wrap, (dt, t) => { pas(dt, t); dessiner(); });
  lierLecture(wrap, etat);
  const figer = () => { if (!etat.joue) { for (let k = 0; k < 80; k++) pas(0.03, k * 0.03); dessiner(); } };
  lierSegments(wrap, mode, (v) => {
    const avant = mode; mode = v;
    if (v === 'gaz') lancer(); else if (avant === 'gaz') p.forEach((q) => { q.vx *= 0.2; q.vy *= 0.2; });
    maj(); figer();
  });
  if (mode === 'gaz') lancer();
  maj(); figer(); dessiner();
}

/** Trois récipients étiquetés A, B, C, chacun dans un état (énoncés). */
export function schemaParticules(ordre) {
  const alea = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x) - 0.5; };
  const dessin = (etat, x0) => {
    let s = `<path d="M${x0} 12 V96 H${x0 + 84} V12" class="pc-verre"/>`;
    const rond = (x, y) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="5.2" class="pc-molecule"/>`;
    if (etat === 'solide') for (let i = 0; i < 16; i++) s += rond(x0 + 24 + (i % 4) * 12, 90 - Math.floor(i / 4) * 12);
    else if (etat === 'liquide') {
      [[7, 0], [6, 5.5], [3, 11]].forEach(([n, dx], row) => { for (let k = 0; k < n; k++) s += rond(x0 + 8 + dx + k * 11.4 + alea(row * 9 + k) * 3, 90 - row * 10.5 + alea(row * 7 + k + 50) * 2); });
    } else {
      s += `<path d="M${x0 - 4} 12 H${x0 + 88}" class="pc-verre"/>`;
      [[14, 24], [60, 20], [34, 46], [72, 58], [18, 74], [50, 84], [40, 22]].forEach(([x, y]) => { s += rond(x0 + x, y); });
    }
    return s;
  };
  let s = '<svg viewBox="0 0 320 124" class="pc-svg pc-schema" role="img" aria-label="Trois modèles de répartition des particules">';
  ordre.forEach((e, k) => { const x0 = 10 + k * 104; s += dessin(e, x0) + `<text x="${x0 + 42}" y="116" text-anchor="middle" class="pc-etiquette">${'ABC'[k]}</text>`; });
  return s + '</svg>';
}

// ================================================= CHANGEMENTS D'ÉTAT

const PROFILS = {
  eau: { pts: [[0, -20], [1, 0], [3.2, 0], [6.4, 100], [9, 100], [10, 118]], paliers: [[0, 'fusion : 0 °C'], [100, 'ébullition : 100 °C']] },
  sale: { pts: [[0, -20], [0.8, -7], [3, -1], [6.3, 101], [8.8, 105], [10, 120]], paliers: [] },
};
const ETAT_SEGMENT = ['solide', 'solide + liquide', 'liquide', 'liquide + gaz', 'gaz'];

/** Chauffage de la glace : la courbe se trace, avec ses paliers (corps pur) ou sans (mélange). */
export function chauffage(host) {
  let corps = 'eau', u = 0;
  const X0 = 52, X1 = 304, Y0 = 16, Y1 = 150;
  const tx = (t) => X0 + (t / 10) * (X1 - X0), ty = (T) => Y1 - ((T + 30) / 160) * (Y1 - Y0);
  const wrap = cadre(host, `
    ${segments('Corps chauffé', [['eau', 'Glace d\'eau pure'], ['sale', 'Glace d\'eau salée']])}
    <svg viewBox="0 0 320 178" class="pc-svg" role="img" aria-label="Courbe de chauffage : température en fonction du temps" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-rejouer>Rejouer</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const point = (t) => {
    const pts = PROFILS[corps].pts;
    for (let k = 0; k < pts.length - 1; k++) {
      const [ta, Ta] = pts[k], [tb, Tb] = pts[k + 1];
      if (t <= tb) return { T: Ta + ((Tb - Ta) * (t - ta)) / (tb - ta), k };
    }
    return { T: pts[pts.length - 1][1], k: pts.length - 2 };
  };
  const dessiner = () => {
    const P = PROFILS[corps], tf = Math.min(u, 10), cur = point(tf);
    let s = `<path d="M${X0} ${Y0 - 6} V${Y1} H${X1 + 6}" class="pc-axe"/>`;
    for (let T = -20; T <= 120; T += 20) s += `<line x1="${X0 - 4}" y1="${r1(ty(T))}" x2="${X0}" y2="${r1(ty(T))}" class="pc-axe"/><text x="${X0 - 7}" y="${r1(ty(T) + 4)}" text-anchor="end" class="pc-petit">${String(T).replace("-", "−")}</text>`;
    for (let t = 0; t <= 10; t += 2) s += `<text x="${r1(tx(t))}" y="${Y1 + 14}" text-anchor="middle" class="pc-petit">${t}</text>`;
    s += `<text x="${X0 + 4}" y="${Y0 - 6}" class="pc-petit">T (°C)</text><text x="${X1}" y="${Y1 + 26}" text-anchor="end" class="pc-petit">temps (min)</text>`;
    P.paliers.forEach(([T, l]) => { s += `<line x1="${X0}" y1="${r1(ty(T))}" x2="${X1}" y2="${r1(ty(T))}" class="pc-trajectoire"/><text x="${X1}" y="${r1(ty(T) - 5)}" text-anchor="end" class="pc-petit">${l}</text>`; });
    let d = '';
    for (let t = 0; t <= tf + 1e-9; t += 0.05) d += `${d ? 'L' : 'M'}${r1(tx(t))} ${r1(ty(point(t).T))} `;
    if (d) s += `<path d="${d}" class="pc-courbe-chauffe"/>`;
    const x = tx(tf), y = ty(cur.T);
    s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="6" class="pc-point-mesure"/>`;
    s += `<text x="${r1(Math.min(x + 9, X1 - 70))}" y="${r1(y + (cur.T > 60 ? 20 : -10))}" class="pc-etiquette pc-etiquette-petite">${ETAT_SEGMENT[cur.k]} · ${nb(cur.T, 0).replace("-", "−")} °C</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    $(wrap, '[data-txt]').innerHTML = corps === 'eau'
      ? "L'eau pure est un <strong>corps pur</strong> : pendant la fusion puis pendant l'ébullition, la température reste <strong>constante</strong> (on parle de <strong>palier</strong>), même si on continue de chauffer."
      : "L'eau salée est un <strong>mélange</strong> : pas de palier net, la température continue de varier pendant les changements d'état. Un palier permet donc de reconnaître un corps pur.";
  };
  const etat = animer(wrap, (dt) => { u += dt * 1.25; if (u > 12.5) u = 0; dessiner(); });
  lierLecture(wrap, etat);
  if (!etat.joue) u = 10;
  lierSegments(wrap, corps, (v) => { corps = PROFILS[v] ? v : 'eau'; u = etat.joue ? 0 : 10; maj(); dessiner(); });
  $(wrap, '[data-rejouer]').addEventListener('click', () => { u = etat.joue ? 0 : 10; dessiner(); });
  maj(); dessiner();
}

/** Les six changements d'état : [nom, de, vers]. */
export const CHANGEMENTS = [
  ['fusion', 'solide', 'liquide'], ['solidification', 'liquide', 'solide'],
  ['vaporisation', 'liquide', 'gaz'], ['liquéfaction', 'gaz', 'liquide'],
  ['sublimation', 'solide', 'gaz'], ['condensation', 'gaz', 'solide'],
];

/** Triangle des états et flèches des changements d'état ; `masque` remplace un nom par « ? ». */
export function schemaChangements({ masque = null, seulement = null } = {}) {
  const P = { solide: [52, 150], liquide: [268, 150], gaz: [160, 30] };
  let s = `<svg viewBox="0 0 320 180" class="pc-svg pc-schema pc-schema-large" role="img" aria-label="Les changements d'état">
    <defs><marker id="pointe-ce" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="currentColor"/></marker></defs>`;
  CHANGEMENTS.forEach(([nom, a, b]) => {
    if (seulement && !seulement.includes(nom)) return;
    const [x1, y1] = P[a], [x2, y2] = P[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const o = 9, e = 38, ax = x1 + (dx / L) * e + nx * o, ay = y1 + (dy / L) * e + ny * o, bx = x2 - (dx / L) * e + nx * o, by = y2 - (dy / L) * e + ny * o;
    const mx = (ax + bx) / 2 + nx * 13, my = (ay + by) / 2 + ny * 13 + 4;
    const cache = nom === masque;
    s += `<line x1="${r1(ax)}" y1="${r1(ay)}" x2="${r1(bx)}" y2="${r1(by)}" class="pc-fleche-ce ${cache ? 'pc-fleche-active' : ''}" marker-end="url(#pointe-ce)"/>`;
    s += `<text x="${r1(mx)}" y="${r1(my)}" text-anchor="middle" class="pc-petit ${cache ? 'pc-texte-actif' : ''}">${cache ? '?' : nom}</text>`;
  });
  Object.entries(P).forEach(([n, [x, y]]) => { s += `<rect x="${x - 34}" y="${y - 13}" width="68" height="26" rx="13" class="pc-etat-boite"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="pc-etiquette pc-etiquette-petite">${n}</text>`; });
  return s + '</svg>';
}

/**
 * Courbe fixe (énoncés) : refroidissement ou chauffage avec, ou non, un palier.
 * { debut, palier, fin, avecPalier, sens: 'chauffage' | 'refroidissement', tmax }
 */
export function schemaCourbe({ debut, palier, fin, avecPalier = true, tmax = 10 }) {
  const lo = Math.min(debut, fin, palier) - 10, hi = Math.max(debut, fin, palier) + 10;
  const X0 = 50, X1 = 300, Y0 = 14, Y1 = 130;
  const tx = (t) => X0 + (t / tmax) * (X1 - X0), ty = (T) => Y1 - ((T - lo) / (hi - lo)) * (Y1 - Y0);
  const pts = avecPalier ? [[0, debut], [tmax * 0.3, palier], [tmax * 0.7, palier], [tmax, fin]] : [[0, debut], [tmax * 0.3, palier + (debut > fin ? 3 : -3)], [tmax * 0.7, palier + (debut > fin ? -3 : 3)], [tmax, fin]];
  const pas = (hi - lo) > 120 ? 50 : (hi - lo) > 60 ? 20 : 10;
  let s = `<svg viewBox="0 0 320 156" class="pc-svg pc-schema" role="img" aria-label="Courbe de température en fonction du temps"><path d="M${X0} ${Y0 - 4} V${Y1} H${X1 + 6}" class="pc-axe"/>`;
  for (let T = Math.ceil(lo / pas) * pas; T <= hi; T += pas) s += `<line x1="${X0}" y1="${r1(ty(T))}" x2="${X1}" y2="${r1(ty(T))}" class="pc-grille-claire"/><text x="${X0 - 6}" y="${r1(ty(T) + 4)}" text-anchor="end" class="pc-petit">${String(T).replace("-", "−")}</text>`;
  for (let t = 0; t <= tmax; t += 2) s += `<text x="${r1(tx(t))}" y="${Y1 + 14}" text-anchor="middle" class="pc-petit">${t}</text>`;
  s += `<text x="${X0 + 4}" y="${Y0 - 2}" class="pc-petit">T (°C)</text><text x="${X1}" y="${Y1 + 26}" text-anchor="end" class="pc-petit">temps (min)</text>`;
  s += `<path d="${pts.map(([t, T], k) => `${k ? 'L' : 'M'}${r1(tx(t))} ${r1(ty(T))}`).join(' ')}" class="pc-courbe-chauffe"/>`;
  return s + '</svg>';
}

// =================================================== ÉPROUVETTE GRADUÉE

const OBJETS_PLONGES = [
  { nom: 'un caillou', V: 12, forme: 'caillou' },
  { nom: 'une bille en acier', V: 4, forme: 'bille' },
  { nom: 'un écrou', V: 6, forme: 'ecrou' },
];

function dessinObjet(forme, x, y, k = 1) {
  if (forme === 'bille') return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(7 * k)}" class="pc-objet-metal"/>`;
  if (forme === 'ecrou') {
    let d = '';
    for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; d += `${i ? 'L' : 'M'}${r1(x + 9 * k * Math.cos(a))} ${r1(y + 9 * k * Math.sin(a))}`; }
    return `<path d="${d}Z" class="pc-objet-metal"/><circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(3.5 * k)}" class="pc-cache"/>`;
  }
  return `<path d="M${r1(x - 12 * k)} ${r1(y + 2)} Q${r1(x - 10 * k)} ${r1(y - 9 * k)} ${r1(x)} ${r1(y - 9 * k)} Q${r1(x + 13 * k)} ${r1(y - 8 * k)} ${r1(x + 12 * k)} ${r1(y + 3)} Q${r1(x + 6 * k)} ${r1(y + 10 * k)} ${r1(x - 3 * k)} ${r1(y + 9 * k)} Q${r1(x - 12 * k)} ${r1(y + 8 * k)} ${r1(x - 12 * k)} ${r1(y + 2)}Z" class="pc-caillou"/>`;
}

/** Éprouvette : lire au bas du ménisque, puis mesurer le volume d'un solide par déplacement d'eau. */
export function eprouvette(host) {
  let V0 = 40, obj = 0, objY = null, niveau = V0, dedans = false;
  const XG = 136, XD = 184, YB = 164, YH = 34, px = (YB - YH) / 100, yV = (v) => YB - v * px;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Eau versée <input type="range" min="20" max="70" step="2" value="${V0}" data-v> <span class="fig-val" data-vv></span></label></div>
    <div class="pc-choix"><label>Objet <select data-o>${OBJETS_PLONGES.map((o, k) => `<option value="${k}">${o.nom}</option>`).join('')}</select></label></div>
    <svg viewBox="0 0 320 180" class="pc-svg" role="img" aria-label="Éprouvette graduée" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-plonger>Plonger l'objet</button><button type="button" class="btn btn-ghost" data-retirer>Retirer</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const O = () => OBJETS_PLONGES[obj] || OBJETS_PLONGES[0];
  const dessiner = () => {
    const y = yV(niveau);
    let s = `<path d="M${XG} ${y - 3} Q${(XG + XD) / 2} ${y + 3} ${XD} ${y - 3} V${YB} H${XG}Z" class="pc-eau"/>`;
    if (objY != null) s += dessinObjet(O().forme, (XG + XD) / 2, objY, 0.85);
    for (let v = 0; v <= 100; v += 2) {
      const yy = r1(yV(v)), long = v % 10 === 0;
      s += `<line x1="${XD}" y1="${yy}" x2="${XD - (long ? 13 : 6)}" y2="${yy}" class="pc-graduation"/>`;
      if (long) s += `<text x="${XD + 5}" y="${r1(yV(v) + 3.5)}" class="pc-petit">${v}</text>`;
    }
    s += `<path d="M${XG - 5} ${YH - 14} L${XG} ${YH - 8} V${YB + 4} H${XD} V${YH - 8} L${XD + 5} ${YH - 14}" class="pc-verre"/><path d="M${XG - 16} ${YB + 4} H${XD + 16}" class="pc-verre"/>`;
    s += `<text x="${XD + 5}" y="${YH - 14}" class="pc-petit">mL</text>`;
    // L'œil à la hauteur du bas du ménisque
    s += `<g class="pc-oeil"><path d="M60 ${r1(y)} q10 -8 20 0 q-10 8 -20 0z" class="pc-cache pc-contour-fin"/><circle cx="70" cy="${r1(y)}" r="3" class="pc-pupille"/></g><line x1="84" y1="${r1(y)}" x2="${XG - 4}" y2="${r1(y)}" class="pc-visee"/>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    $(wrap, '[data-vv]').textContent = `${V0} mL`;
    $(wrap, '[data-txt]').innerHTML = dedans
      ? `Avant : V₁ = <strong>${V0} mL</strong>. Après : V₂ = <strong>${V0 + O().V} mL</strong>. Volume de l'objet : V₂ − V₁ = ${V0 + O().V} − ${V0} = <strong>${O().V} mL</strong>, soit ${O().V} cm³.`
      : `Lecture : <strong>${V0} mL</strong>. On lit la graduation au <strong>bas du ménisque</strong> (la surface creusée de l'eau), l'œil à la même hauteur.`;
  };
  const etat = animer(wrap, (dt) => {
    if (objY != null && dedans) {
      const fond = YB - 9;
      if (objY < fond) objY = Math.min(fond, objY + dt * (objY < yV(niveau) ? 260 : 90));
      if (objY >= yV(niveau) - 6) niveau += (V0 + O().V - niveau) * Math.min(1, dt * 5);
    }
    dessiner();
  });
  lierLecture(wrap, etat);
  const poser = () => { objY = etat.joue ? 10 : YB - 9; dedans = true; if (!etat.joue) niveau = V0 + O().V; maj(); dessiner(); };
  const retirer = () => { objY = null; dedans = false; niveau = V0; maj(); dessiner(); };
  $(wrap, '[data-v]').addEventListener('input', (ev) => { V0 = +ev.target.value; retirer(); });
  $(wrap, '[data-o]').addEventListener('change', (ev) => { obj = +ev.target.value || 0; retirer(); });
  $(wrap, '[data-plonger]').addEventListener('click', poser);
  $(wrap, '[data-retirer]').addEventListener('click', retirer);
  maj(); dessiner();
}

/** Portion d'éprouvette (énoncés) : graduations de `bas` à `haut`, tous les `pas` mL, liquide au niveau v. */
export function schemaEprouvette(v, { bas = 0, haut = 20, pas = 1 } = {}) {
  const XG = 130, XD = 190, YB = 170, YH = 20, yV = (x) => YB - ((x - bas) / (haut - bas)) * (YB - YH);
  const y = yV(v);
  let s = `<svg viewBox="0 0 320 184" class="pc-svg pc-schema" role="img" aria-label="Éprouvette graduée à lire">
    <path d="M${XG} ${r1(y - 4)} Q${(XG + XD) / 2} ${r1(y + 4)} ${XD} ${r1(y - 4)} V${YB + 10} H${XG}Z" class="pc-eau"/>`;
  const n = Math.round((haut - bas) / pas);
  for (let k = 0; k <= n; k++) {
    const g = bas + k * pas, yy = r1(yV(g)), long = Math.abs(g % (pas * 5)) < 1e-9;
    s += `<line x1="${XD}" y1="${yy}" x2="${XD - (long ? 18 : 9)}" y2="${yy}" class="pc-graduation"/>`;
    if (long) s += `<text x="${XD + 6}" y="${r1(yV(g) + 4)}" class="pc-petit">${String(arrondi(g, 2)).replace('.', ',')}</text>`;
  }
  s += `<path d="M${XG} 6 V${YB + 10} M${XD} 6 V${YB + 10}" class="pc-verre"/><text x="${XD + 6}" y="10" class="pc-petit">mL</text></svg>`;
  return s;
}

// ======================================================== DISSOLUTION

export const SOLUTES = [
  { id: 'sel', nom: 'sel', max: 36, bleu: false },
  { id: 'cuivre', nom: 'sulfate de cuivre', max: 32, bleu: true },
  { id: 'sucre', nom: 'sucre', max: 200, bleu: false },
];

/** Dissolution dans 100 mL d'eau sur une balance : la masse se conserve, puis la solution sature. */
export function dissolution(host) {
  let s = 0, dissous = 0, depot = 0, grains = [], points = [];
  const YS = 64, XG = 112, XD = 208, YF = 132;
  const wrap = cadre(host, `
    ${segments('Soluté', SOLUTES.map((x) => [x.id, x.nom]))}
    <svg viewBox="0 0 320 170" class="pc-svg" role="img" aria-label="Dissolution d'un soluté dans l'eau, sur une balance" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-ajouter>Ajouter 10 g</button><button type="button" class="btn btn-ghost" data-vider>Recommencer</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const S = () => SOLUTES[s];
  const masseGrain = 10 / 6;
  const ajouter = () => {
    for (let k = 0; k < 6; k++) grains.push({ x: 150 + Math.random() * 20, y: 8 - k * 6, vy: 0 });
    if (!etat.joue) { while (grains.length) etape(0.05); }
    maj();
  };
  const etape = (dt) => {
    grains.forEach((g) => { g.vy += 500 * dt; g.y += g.vy * dt; });
    grains = grains.filter((g) => {
      if (g.y < YS) return true;
      if (dissous + masseGrain <= S().max + 1e-9) {
        dissous += masseGrain;
        for (let k = 0; k < 4; k++) points.push({ x: XG + 6 + Math.random() * (XD - XG - 12), y: YS + 6 + Math.random() * (YF - YS - 10) });
      } else depot += masseGrain;
      return false;
    });
    points.forEach((q) => { q.x = borne(q.x + (Math.random() - 0.5) * 30 * dt, XG + 4, XD - 4); q.y = borne(q.y + (Math.random() - 0.5) * 30 * dt, YS + 4, YF - 4); });
    maj();
  };
  const dessiner = () => {
    const bleu = S().bleu ? `style="fill:rgba(40,110,230,${arrondi(0.1 + 0.55 * (dissous / S().max), 2)})"` : '';
    let d = `<rect x="${XG}" y="${YS}" width="${XD - XG}" height="${YF - YS}" class="pc-eau" ${bleu}/>`;
    d += points.map((q) => `<circle cx="${r1(q.x)}" cy="${r1(q.y)}" r="1.4" class="pc-dissous"/>`).join('');
    if (depot > 0) { const h = Math.min(18, 3 + depot * 0.9); d += `<path d="M${XG + 8} ${YF} Q160 ${r1(YF - 2 * h)} ${XD - 8} ${YF}Z" class="pc-depot"/>`; }
    d += grains.map((g) => `<rect x="${r1(g.x)}" y="${r1(g.y)}" width="4" height="4" class="pc-grain"/>`).join('');
    d += `<path d="M${XG - 4} 38 L${XG} 42 V${YF} H${XD} V38" class="pc-verre"/>`;
    d += `<rect x="86" y="${YF + 2}" width="148" height="30" rx="6" class="pc-boitier"/><rect x="128" y="${YF + 8}" width="64" height="18" rx="3" class="pc-lcd-svg"/>`;
    d += `<text x="186" y="${YF + 22}" text-anchor="end" class="pc-lcd-texte">${nb(100 + dissous + depot, 1)} g</text>`;
    d += `<text x="${XD + 8}" y="${YS + 4}" class="pc-petit">100 mL d'eau</text>`;
    svg.innerHTML = d;
  };
  const maj = () => {
    const m = dissous + depot;
    const sature = depot > 0;
    $(wrap, '[data-txt]').innerHTML = `Eau : 100 g · ${S().nom} ajouté : ${nb(m, 1)} g · total sur la balance : <strong>${nb(100 + m, 1)} g</strong>. La masse se conserve : le soluté n'a pas disparu, il est dispersé dans l'eau.`
      + (sature ? `<br>La solution est <strong>saturée</strong> : 100 mL d'eau dissolvent au plus ${S().max} g de ${S().nom} (à 20 °C). Le surplus reste au fond.` : '');
  };
  const etat = animer(wrap, (dt) => { etape(dt); dessiner(); });
  lierLecture(wrap, etat);
  const vider = () => { dissous = 0; depot = 0; grains = []; points = []; maj(); dessiner(); };
  lierSegments(wrap, SOLUTES[s].id, (v) => { s = Math.max(0, SOLUTES.findIndex((x) => x.id === v)); vider(); });
  $(wrap, '[data-ajouter]').addEventListener('click', () => { ajouter(); dessiner(); });
  $(wrap, '[data-vider]').addEventListener('click', vider);
  maj(); dessiner();
}

// =================================================== CHAÎNE ÉNERGÉTIQUE

/** Formes d'énergie et leur couleur dans les schémas. */
export const FORMES = {
  electrique: ['électrique', 'elec'], lumineuse: ['lumineuse', 'lum'], thermique: ['thermique', 'therm'],
  cinetique: ['cinétique', 'meca'], mecanique: ['mécanique', 'meca'], chimique: ['chimique', 'chim'], position: ['de position', 'pos'],
};

/** Convertisseurs usuels : énergie reçue → utile + perdue, et part utile (ordre de grandeur). */
export const CONVERTISSEURS = [
  { nom: 'lampe à DEL', art: 'la ', source: 'le secteur', entree: 'electrique', utile: 'lumineuse', perdue: 'thermique', part: 0.4 },
  { nom: 'lampe à incandescence', art: 'la ', source: 'le secteur', entree: 'electrique', utile: 'lumineuse', perdue: 'thermique', part: 0.05 },
  { nom: 'moteur électrique', art: 'le ', source: 'une pile', entree: 'electrique', utile: 'mecanique', perdue: 'thermique', part: 0.8 },
  { nom: 'panneau solaire', art: 'le ', source: 'le Soleil', entree: 'lumineuse', utile: 'electrique', perdue: 'thermique', part: 0.2 },
  { nom: 'éolienne', art: "l'", source: 'le vent', entree: 'cinetique', utile: 'electrique', perdue: 'thermique', part: 0.4 },
  { nom: 'pile', art: 'la ', source: 'ses réactifs', entree: 'chimique', utile: 'electrique', perdue: 'thermique', part: 0.9 },
  { nom: 'dynamo de vélo', art: 'la ', source: 'la roue', entree: 'cinetique', utile: 'electrique', perdue: 'thermique', part: 0.6 },
  { nom: 'radiateur électrique', art: 'le ', source: 'le secteur', entree: 'electrique', utile: 'thermique', perdue: null, part: 1 },
  { nom: 'corps humain', art: 'le ', source: 'les aliments', entree: 'chimique', utile: 'mecanique', perdue: 'thermique', part: 0.25 },
  { nom: 'barrage hydraulique', art: 'le ', source: "l'eau du lac", entree: 'position', utile: 'electrique', perdue: 'thermique', part: 0.85 },
];
/** « la lampe à DEL », « L'éolienne »… */
export const leNom = (C, majuscule = false) => { const s = C.art + C.nom; return majuscule ? s[0].toUpperCase() + s.slice(1) : s; };

/**
 * Chaîne énergétique en diagramme de flux : la largeur de chaque bande est
 * proportionnelle à l'énergie transportée. options.bilan : curseur en joules.
 */
export function chaineEnergie(host, { bilan = false, depart = 0 } = {}) {
  let c = depart, E = 1000;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Convertisseur <select data-c>${CONVERTISSEURS.map((x, k) => `<option value="${k}">${x.nom}</option>`).join('')}</select></label></div>
    ${bilan ? `<div class="fig-controls"><label>Énergie reçue <input type="range" min="100" max="3000" step="100" value="${E}" data-e> <span class="fig-val" data-ev></span></label></div>` : ''}
    <svg viewBox="0 0 320 178" class="pc-svg pc-sankey" role="img" aria-label="Chaîne énergétique" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`);
  $(wrap, '[data-c]').value = String(c);
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    const C = CONVERTISSEURS[c] || CONVERTISSEURS[0], T = 36, yc = 92;
    const tu = Math.max(3, T * C.part), tp = C.perdue ? Math.max(3, T - tu) : 0;
    const [nIn, kIn] = FORMES[C.entree], [nU, kU] = FORMES[C.utile];
    const yu0 = yc - T / 2 + tu / 2, yp0 = yc + T / 2 - tp / 2;
    const bande = (d, k, w) => `<path d="${d}" class="pc-bande pc-f-${k}" stroke-width="${r1(w)}"/><path d="${d}" class="pc-flux" stroke-width="${r1(Math.min(w, 5))}"/>`;
    let s = bande(`M8 ${yc} H118`, kIn, T);
    s += bande(`M202 ${r1(yu0)} C244 ${r1(yu0)} 250 44 296 44`, kU, tu);
    if (C.perdue) s += bande(`M202 ${r1(yp0)} C244 ${r1(yp0)} 250 146 296 146`, FORMES[C.perdue][1], tp);
    s += `<rect x="118" y="${yc - 34}" width="84" height="68" rx="14" class="pc-convertisseur"/>`;
    const mots = C.nom.split(' ');
    const l1 = mots.length > 2 ? mots.slice(0, 2).join(' ') : mots[0], l2 = mots.length > 2 ? mots.slice(2).join(' ') : mots.slice(1).join(' ');
    s += `<text x="160" y="${l2 ? yc - 2 : yc + 5}" text-anchor="middle" class="pc-etiquette pc-etiquette-petite">${l1}</text>${l2 ? `<text x="160" y="${yc + 14}" text-anchor="middle" class="pc-etiquette pc-etiquette-petite">${l2}</text>` : ''}`;
    s += `<text x="8" y="${yc - T / 2 - 18}" class="pc-petit">reçue de ${C.source}</text><text x="8" y="${yc - T / 2 - 5}" class="pc-etiquette pc-etiquette-petite">énergie ${nIn}</text>`;
    s += `<text x="${bilan ? 206 : 214}" y="22" class="pc-etiquette pc-etiquette-petite">énergie ${nU}</text><text x="${bilan ? 206 : 214}" y="34" class="pc-petit">utile${bilan ? ` : ${nb(C.part * E, 0)} J` : ''}</text>`;
    if (C.perdue) s += `<text x="${bilan ? 206 : 214}" y="${bilan ? 166 : 172}" class="pc-etiquette pc-etiquette-petite">énergie ${FORMES[C.perdue][0]}</text><text x="${bilan ? 206 : 214}" y="${bilan ? 177 : 160}" class="pc-petit">perdue${bilan ? ` : ${nb(E - C.part * E, 0)} J` : ''}</text>`;
    svg.innerHTML = s;
    if (bilan) $(wrap, '[data-ev]').textContent = `${E} J`;
    const Eu = C.part * E;
    $(wrap, '[data-txt]').innerHTML = bilan
      ? `Énergie reçue = énergie utile + énergie perdue : <strong>${E} J = ${nb(Eu, 0)} J + ${nb(E - Eu, 0)} J</strong>.${C.perdue ? ` ${leNom(C, true)} chauffe : l'énergie « perdue » n'a pas disparu, elle part dans l'air ambiant sous forme thermique.` : ' Pour un radiateur, toute l\'énergie reçue devient de l\'énergie thermique : elle est entièrement utile.'}`
      : `${leNom(C, true)} <strong>convertit</strong> l'énergie ${nIn} en énergie ${nU}${C.perdue ? `, mais une partie devient de l'énergie ${FORMES[C.perdue][0]} : c'est l'énergie <strong>perdue</strong> (non utile)` : ''}. La largeur des bandes représente la quantité d'énergie : rien ne se crée, rien ne se perd.`;
  };
  const etat = { joue: true };
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) etat.joue = false;
  lierLecture(wrap, etat);
  const bouton = $(wrap, '[data-lecture]');
  const pause = () => wrap.classList.toggle('pc-en-pause', !etat.joue);
  bouton.addEventListener('click', pause); pause();
  $(wrap, '[data-c]').addEventListener('change', (ev) => { c = +ev.target.value || 0; dessiner(); });
  if (bilan) $(wrap, '[data-e]').addEventListener('input', (ev) => { E = +ev.target.value; dessiner(); });
  dessiner();
}

// ================================================ CIRCUIT ÉLECTRIQUE

export const MATERIAUX_TEST = [
  ['un fil de cuivre', true, 'metal'], ['un clou en fer', true, 'metal'], ['une pièce de monnaie', true, 'metal'],
  ['une mine de crayon (graphite)', true, 'graphite'], ['du papier aluminium', true, 'metal'],
  ['une gomme', false, 'isolant'], ['une règle en plastique', false, 'isolant'], ['un crayon en bois', false, 'bois'],
  ['un morceau de verre', false, 'verre'], ["rien (de l'air)", false, 'air'],
];

/** Pile dessinée verticalement : grande barre = borne +, petite barre épaisse = borne −. */
const pileSVG = (x, y) => `<rect x="${x - 15}" y="${y - 20}" width="30" height="36" class="pc-cache"/>
  <line x1="${x - 16}" y1="${y - 12}" x2="${x + 16}" y2="${y - 12}" class="pc-borne"/><line x1="${x - 8}" y1="${y}" x2="${x + 8}" y2="${y}" class="pc-borne pc-borne-epaisse"/>
  <text x="${x - 20}" y="${y - 8}" text-anchor="end" class="pc-etiquette">+</text><text x="${x - 20}" y="${y + 8}" text-anchor="end" class="pc-etiquette">−</text>`;
/** Lampe : cercle barré, halo selon l'éclat k (0 à 1). */
const lampeSVG = (x, y, k, { devissee = false, nom = '', id = '' } = {}) => {
  const dx = devissee ? 7 : 0, dy = devissee ? -7 : 0;
  return `<g class="pc-lampe ${devissee ? 'pc-lampe-devissee' : ''}" ${id ? `data-lampe="${id}" role="button" tabindex="0" aria-label="${devissee ? 'Revisser' : 'Dévisser'} la lampe ${nom}"` : ''}>
    <circle cx="${x}" cy="${y}" r="${r1(13 + 26 * k)}" class="pc-lueur" opacity="${arrondi(k > 0.01 ? 0.15 + 0.75 * Math.min(1, k) : 0, 2)}"/>
    <circle cx="${x + dx}" cy="${y + dy}" r="13" class="pc-cache pc-contour"/><path d="M${x + dx - 9} ${y + dy - 9} l18 18 M${x + dx + 9} ${y + dy - 9} l-18 18" class="pc-fil"/>
    ${nom ? `<text x="${x + dx}" y="${y + dy - 19}" text-anchor="middle" class="pc-petit">${nom}${devissee ? ' (dévissée)' : ''}</text>` : ''}</g>`;
};

/**
 * Circuit simple : pile, lampe, interrupteur et deux pinces entre lesquelles on
 * place un objet. Le courant ne circule que si la boucle est fermée par des conducteurs.
 */
export function circuitSimple(host) {
  let ferme = false, mat = 0, sens = false;
  const X0 = 40, X1 = 280, Y0 = 40, Y1 = 160;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Entre les pinces <select data-m>${MATERIAUX_TEST.map((m, k) => `<option value="${k}">${m[0]}</option>`).join('')}</select></label></div>
    <label class="pc-case"><input type="checkbox" data-sens> montrer le sens conventionnel du courant</label>
    <svg viewBox="0 0 320 196" class="pc-svg pc-circuit" role="img" aria-label="Circuit électrique simple" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-inter>Fermer l'interrupteur</button><span class="pc-legende"><span class="pc-pastille pc-electron"></span>électrons</span></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const flux = fluxElectrons([[X0, 108], [X0, Y1], [X1, Y1], [X1, Y0], [X0, Y0], [X0, 88]]);
  const M = () => MATERIAUX_TEST[mat] || MATERIAUX_TEST[0];
  const passe = () => ferme && M()[1];
  const dessiner = () => {
    let s = `<path d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z" class="pc-fil"/>`;
    if (passe()) s += `<g>${flux.svg()}</g>`;
    s += pileSVG(X0, 100);
    s += lampeSVG(160, Y0, passe() ? 0.8 : 0);
    // interrupteur K, vertical, sur le côté droit (cliquable)
    s += `<rect x="${X1 - 12}" y="78" width="24" height="44" class="pc-cache"/><circle cx="${X1}" cy="80" r="3" fill="currentColor"/><circle cx="${X1}" cy="120" r="3" fill="currentColor"/>
      <line x1="${X1}" y1="120" x2="${ferme ? X1 : X1 + 14}" y2="${ferme ? 80 : 86}" class="pc-fil pc-interrupteur" data-clic-inter/>
      <text x="${X1 + 20}" y="104" class="pc-petit">K</text>`;
    // pinces et objet testé
    const [nom, , aspect] = M();
    s += `<rect x="126" y="${Y1 - 14}" width="68" height="28" class="pc-cache"/><path d="M126 ${Y1} h8 m52 0 h8" class="pc-fil"/>
      <path d="M134 ${Y1 - 5} l6 5 -6 5 M186 ${Y1 - 5} l-6 5 6 5" class="pc-pince"/>`;
    if (aspect !== 'air') s += `<rect x="140" y="${Y1 - 4}" width="40" height="8" rx="3" class="pc-objet-${aspect}"/>`;
    s += `<text x="160" y="${Y1 + 26}" text-anchor="middle" class="pc-petit">${nom}</text>`;
    if (sens && passe()) {
      s += `<path d="M${X0 + 50} ${Y0 - 12} h30 m-8 -5 l8 5 -8 5" class="pc-sens"/><path d="M${X1 + 14} ${Y0 + 16} v26 m-5 -8 l5 8 5 -8" class="pc-sens"/>
        <path d="M${X1 - 60} ${Y1 + 12} h-30 m8 -5 l-8 5 8 5" class="pc-sens"/><text x="${X0 + 86}" y="${Y0 - 8}" class="pc-sens-texte">I</text>`;
    }
    svg.innerHTML = s;
  };
  const maj = () => {
    const [nom, cond] = M();
    $(wrap, '[data-inter]').textContent = ferme ? "Ouvrir l'interrupteur" : "Fermer l'interrupteur";
    $(wrap, '[data-txt]').innerHTML = !ferme
      ? "L'interrupteur est <strong>ouvert</strong> : la boucle est coupée, le courant ne circule pas. La lampe est éteinte."
      : cond ? `La boucle est fermée et ${nom} est un <strong>conducteur</strong> : le courant circule, la lampe brille.${sens ? ' Par convention, le courant sort par la borne + du générateur et rentre par la borne − (les électrons vont dans l\'autre sens).' : ''}`
        : `L'interrupteur est fermé, mais ${nom} est un <strong>isolant</strong> : le courant ne passe pas, la lampe reste éteinte.`;
  };
  const etat = animer(wrap, (dt) => { if (passe()) flux.avancer(dt, 70); dessiner(); });
  lierLecture(wrap, etat);
  const basculer = () => { ferme = !ferme; maj(); dessiner(); };
  $(wrap, '[data-inter]').addEventListener('click', basculer);
  svg.addEventListener('click', (ev) => { if (ev.target && ev.target.closest && ev.target.closest('[data-clic-inter]')) basculer(); });
  $(wrap, '[data-m]').addEventListener('change', (ev) => { mat = +ev.target.value || 0; maj(); dessiner(); });
  $(wrap, '[data-sens]').addEventListener('change', (ev) => { sens = ev.target.checked; maj(); dessiner(); });
  maj(); dessiner();
}

/**
 * Deux lampes en série ou en dérivation. On peut dévisser une lampe (clic),
 * court-circuiter L2 et, avec `mesures`, lire intensités et tensions.
 * Modèle : pile idéale de 6 V, lampes assimilées à des résistances.
 */
export function circuitLampes(host, { mode = 'serie', mesures = false, choixMontage = true } = {}) {
  let montage = mode === 'derivation' ? 'derivation' : 'serie', dev = [false, false], court = false, diff = false;
  const U = 6, X0 = 40, X1 = 280, XM = 160, Y0 = 40, Y1 = 160;
  const wrap = cadre(host, `
    ${choixMontage ? segments('Montage', [['serie', 'En série'], ['derivation', 'En dérivation']]) : ''}
    <div class="pc-cases">
      <label class="pc-case"><input type="checkbox" data-d1> dévisser L1</label>
      <label class="pc-case"><input type="checkbox" data-d2> dévisser L2</label>
      <label class="pc-case"><input type="checkbox" data-court> relier les bornes de L2 par un fil</label>
      ${mesures ? '<label class="pc-case"><input type="checkbox" data-diff> lampes différentes</label>' : ''}
    </div>
    <svg viewBox="0 0 320 196" class="pc-svg pc-circuit" role="img" aria-label="Deux lampes et une pile" data-svg></svg>
    ${mesures ? '<div class="pc-mesures pc-mesures-4" data-lcd></div>' : ''}
    <div class="pc-boutons">${boutonLecture}<span class="pc-legende"><span class="pc-pastille pc-electron"></span>électrons (plus ils vont vite, plus l'intensité est grande)</span></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const R = () => [12, diff ? 24 : 12];
  let chemins = {};
  const construire = () => {
    const pont = court ? [[X1, 72], [X1 + 24, 72], [X1 + 24, 128], [X1, 128]] : null;
    if (montage === 'serie') {
      chemins = { tout: fluxElectrons([[X0, 108], [X0, Y1], [X1, Y1], ...(pont ? [...pont].reverse() : []), [X1, Y0], [X0, Y0], [X0, 88]]) };
    } else {
      chemins = {
        m1: fluxElectrons([[X0, 108], [X0, Y1], [XM, Y1]]),
        m2: fluxElectrons([[XM, Y0], [X0, Y0], [X0, 88]]),
        b1: fluxElectrons([[XM, Y1], [XM, Y0]]),
        b2: fluxElectrons([[XM, Y1], [X1, Y1], ...(pont ? [...pont].reverse() : []), [X1, Y0], [XM, Y0]]),
      };
    }
  };
  construire();
  /** Intensités (A) et tensions (V) du montage. */
  const calcul = () => {
    const [R1, R2] = R();
    if (montage === 'serie') {
      if (dev[0] || (dev[1] && !court)) return { I: 0, I1: 0, I2: 0, U1: dev[0] ? U : 0, U2: dev[0] ? 0 : U, ouvert: true };
      const Rt = R1 + (court ? 0 : R2), I = U / Rt;
      return { I, I1: I, I2: court ? 0 : I, U1: R1 * I, U2: court ? 0 : R2 * I };
    }
    if (court) return { I: Infinity, I1: 0, I2: 0, U1: 0, U2: 0, danger: true };
    const I1 = dev[0] ? 0 : U / R1, I2 = dev[1] ? 0 : U / R2;
    return { I: I1 + I2, I1, I2, U1: U, U2: U };
  };
  const eclat = (Ilampe, Rl) => (Rl * Ilampe * Ilampe) / 3; // 3 W : lampe seule sous 6 V
  const dessiner = () => {
    const c = calcul(), [R1, R2] = R();
    let s = '';
    if (montage === 'serie') s += `<path d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z" class="pc-fil"/>`;
    else s += `<path d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z M${XM} ${Y0} V${Y1}" class="pc-fil"/><circle cx="${XM}" cy="${Y0}" r="4" fill="currentColor"/><circle cx="${XM}" cy="${Y1}" r="4" fill="currentColor"/>`;
    if (court) s += `<path d="M${X1} 72 H${X1 + 24} V128 H${X1}" class="pc-fil pc-fil-court"/>`;
    Object.values(chemins).forEach((f) => { s += f.svg(); });
    s += pileSVG(X0, 100);
    if (montage === 'serie') {
      s += lampeSVG(XM, Y0, dev[0] ? 0 : eclat(c.I1, R1), { devissee: dev[0], nom: 'L1', id: '0' });
      s += lampeSVG(X1, 100, dev[1] ? 0 : eclat(c.I2, R2), { devissee: dev[1], nom: 'L2', id: '1' });
    } else {
      s += lampeSVG(XM, 100, dev[0] || c.danger ? 0 : eclat(c.I1, R1), { devissee: dev[0], nom: 'L1', id: '0' });
      s += lampeSVG(X1, 100, dev[1] || c.danger ? 0 : eclat(c.I2, R2), { devissee: dev[1], nom: 'L2', id: '1' });
      s += `<text x="${XM + 6}" y="${Y0 - 8}" class="pc-petit">nœud</text><text x="${XM + 6}" y="${Y1 + 16}" class="pc-petit">nœud</text>`;
    }
    if (c.danger) s += `<text x="160" y="${Y1 + 30}" text-anchor="middle" class="pc-danger">Court-circuit du générateur !</text>`;
    svg.innerHTML = s;
  };
  const f2 = (x) => (Number.isFinite(x) ? nb(x, 2) : '∞');
  const maj = () => {
    const c = calcul();
    if (mesures) {
      const cases = montage === 'serie'
        ? [['U pile (V)', nb(U, 2)], ['U1 (V)', f2(c.U1)], ['U2 (V)', f2(c.U2)], ['I (A)', f2(c.I)]]
        : [['I (A)', c.danger ? 'ERR' : f2(c.I)], ['I1 (A)', f2(c.I1)], ['I2 (A)', f2(c.I2)], ['U1 = U2 (V)', f2(c.U1)]];
      $(wrap, '[data-lcd]').innerHTML = cases.map(([l, v]) => `<div class="pc-lcd"><small>${l}</small><span>${v}</span></div>`).join('');
    }
    let t;
    if (montage === 'serie') {
      t = c.ouvert ? `Une lampe est dévissée : la <strong>boucle unique</strong> est ouverte, plus aucun courant ne circule. <strong>Toutes les lampes s'éteignent.</strong>`
        : court ? 'L2 est <strong>court-circuitée</strong> : le courant passe par le fil plutôt que par L2, qui s\'éteint. L1 brille davantage.'
          : 'Les lampes sont en <strong>série</strong> : une seule boucle, le même courant traverse L1 puis L2. Elles brillent moins qu\'une lampe seule.';
      if (mesures && !c.ouvert) t += `<br>Loi d'unicité : <strong>I est la même partout</strong> (${f2(c.I)} A). Loi d'additivité : <strong>U = U1 + U2</strong> (${nb(U, 2)} = ${f2(c.U1)} + ${f2(c.U2)}).`;
    } else {
      t = c.danger ? "Le fil relie directement les deux bornes de la pile : c'est un <strong>court-circuit du générateur</strong>. L'intensité devient très grande, la pile chauffe : <strong>danger</strong> (risque d'incendie). Les lampes s'éteignent."
        : `Les lampes sont en <strong>dérivation</strong> : chacune est sur sa propre boucle. ${dev[0] || dev[1] ? "Dévisser une lampe n'éteint pas l'autre." : 'Chacune brille comme si elle était seule.'}`;
      if (mesures && !c.danger) t += `<br>Loi des nœuds : <strong>I = I1 + I2</strong> (${f2(c.I)} = ${f2(c.I1)} + ${f2(c.I2)}). Tensions : <strong>U1 = U2 = U</strong> = ${nb(U, 2)} V.`;
    }
    $(wrap, '[data-txt]').innerHTML = t;
  };
  const vitesse = (I) => Math.min(420, (Number.isFinite(I) ? I : 5) * 140);
  const etat = animer(wrap, (dt) => {
    const c = calcul();
    if (montage === 'serie') chemins.tout.avancer(dt, vitesse(c.I));
    else {
      chemins.m1.avancer(dt, vitesse(c.I)); chemins.m2.avancer(dt, vitesse(c.I));
      chemins.b1.avancer(dt, vitesse(c.danger ? 0 : c.I1)); chemins.b2.avancer(dt, vitesse(c.danger ? Infinity : c.I2));
    }
    dessiner();
  });
  lierLecture(wrap, etat);
  const toutMaj = () => { construire(); maj(); dessiner(); };
  const cocher = (sel, v) => { const e = $(wrap, sel); if (e) e.checked = v; };
  const basculer = (k) => { dev[k] = !dev[k]; cocher(`[data-d${k + 1}]`, dev[k]); maj(); dessiner(); };
  lierSegments(wrap, montage, (v) => { montage = v === 'derivation' ? 'derivation' : 'serie'; toutMaj(); });
  $(wrap, '[data-d1]').addEventListener('change', (ev) => { dev[0] = ev.target.checked; maj(); dessiner(); });
  $(wrap, '[data-d2]').addEventListener('change', (ev) => { dev[1] = ev.target.checked; maj(); dessiner(); });
  $(wrap, '[data-court]').addEventListener('change', (ev) => { court = ev.target.checked; toutMaj(); });
  if (mesures) $(wrap, '[data-diff]').addEventListener('change', (ev) => { diff = ev.target.checked; maj(); dessiner(); });
  svg.addEventListener('click', (ev) => { const g = ev.target && ev.target.closest ? ev.target.closest('[data-lampe]') : null; if (g) basculer(+g.getAttribute('data-lampe')); });
  svg.addEventListener('keydown', (ev) => { const g = ev.target && ev.target.closest ? ev.target.closest('[data-lampe]') : null; if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); basculer(+g.getAttribute('data-lampe')); } });
  toutMaj();
}

// -------------------------------------------- Schémas fixes (énoncés)

/** Symboles normalisés des dipôles (dessin centré dans 90 × 44). */
const SYMBOLES_DESSIN = {
  pile: '<path d="M4 22H38M52 22H86" class="pc-fil"/><line x1="38" y1="8" x2="38" y2="36" class="pc-borne"/><line x1="48" y1="14" x2="48" y2="30" class="pc-borne pc-borne-epaisse"/>',
  lampe: '<path d="M4 22H32M58 22H86" class="pc-fil"/><circle cx="45" cy="22" r="13" class="pc-cache pc-contour"/><path d="M36 13l18 18M54 13 36 31" class="pc-fil"/>',
  'interrupteur ouvert': '<path d="M4 22H30M60 22H86" class="pc-fil"/><circle cx="30" cy="22" r="2.5" fill="currentColor"/><circle cx="60" cy="22" r="2.5" fill="currentColor"/><line x1="30" y1="22" x2="56" y2="8" class="pc-fil"/>',
  'interrupteur fermé': '<path d="M4 22H86" class="pc-fil"/><circle cx="30" cy="22" r="2.5" fill="currentColor"/><circle cx="60" cy="22" r="2.5" fill="currentColor"/>',
  moteur: '<path d="M4 22H32M58 22H86" class="pc-fil"/><circle cx="45" cy="22" r="13" class="pc-cache pc-contour"/><text x="45" y="28" text-anchor="middle" class="pc-appareil">M</text>',
  DEL: '<path d="M4 22H34M56 22H86" class="pc-fil"/><path d="M34 10V34L54 22Z" class="pc-cache pc-contour"/><line x1="56" y1="10" x2="56" y2="34" class="pc-borne"/><path d="M50 8l7-6M56 11l7-6" class="pc-fil-mesure"/>',
  résistance: '<path d="M4 22H26M64 22H86" class="pc-fil"/><rect x="26" y="14" width="38" height="16" class="pc-resistance"/>',
  ampèremètre: '<path d="M4 22H32M58 22H86" class="pc-fil"/><circle cx="45" cy="22" r="13" class="pc-cache pc-contour"/><text x="45" y="28" text-anchor="middle" class="pc-appareil">A</text>',
  voltmètre: '<path d="M4 22H32M58 22H86" class="pc-fil"/><circle cx="45" cy="22" r="13" class="pc-cache pc-contour"/><text x="45" y="28" text-anchor="middle" class="pc-appareil">V</text>',
};
export const SYMBOLES = Object.keys(SYMBOLES_DESSIN);
export const schemaSymbole = (nom) => `<svg viewBox="0 0 90 44" class="pc-svg pc-schema pc-symbole" role="img" aria-label="Symbole d'un dipôle">${SYMBOLES_DESSIN[nom] || ''}</svg>`;

/** Montage fixe avec deux dipôles (lampes par défaut), en série ou en dérivation. */
export function schemaMontage(mode, { dipoles = ['lampe', 'lampe'], ampere = null } = {}) {
  const X0 = 30, X1 = 230, XM = 130, Y0 = 26, Y1 = 116;
  const petit = (nom, x, y, vertical) => `<g transform="translate(${x - 45} ${y - 22})${vertical ? ` rotate(90 45 22)` : ''}">${SYMBOLES_DESSIN[nom].replace(/<path d="M4 22H\d+M\d+ 22H86" class="pc-fil"\/>|<path d="M4 22H86" class="pc-fil"\/>/, '')}</g>`;
  let s = `<svg viewBox="0 0 260 150" class="pc-svg pc-schema" role="img" aria-label="Schéma d'un circuit ${mode === 'serie' ? 'en série' : 'en dérivation'}">`;
  s += mode === 'serie' ? `<path d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z" class="pc-fil"/>` : `<path d="M${X0} ${Y0} H${X1} V${Y1} H${X0} Z M${XM} ${Y0} V${Y1}" class="pc-fil"/><circle cx="${XM}" cy="${Y0}" r="3.5" fill="currentColor"/><circle cx="${XM}" cy="${Y1}" r="3.5" fill="currentColor"/>`;
  s += `<rect x="${X0 - 16}" y="52" width="32" height="40" class="pc-cache"/><line x1="${X0 - 15}" y1="64" x2="${X0 + 15}" y2="64" class="pc-borne"/><line x1="${X0 - 8}" y1="76" x2="${X0 + 8}" y2="76" class="pc-borne pc-borne-epaisse"/>`;
  if (mode === 'serie') s += petit(dipoles[0], XM, Y0, false) + petit(dipoles[1], X1, (Y0 + Y1) / 2, true);
  else s += petit(dipoles[0], XM, (Y0 + Y1) / 2, true) + petit(dipoles[1], X1, (Y0 + Y1) / 2, true);
  if (ampere) s += `<g transform="translate(${ampere[0] - 45} ${ampere[1] - 22})${ampere[2] ? ' rotate(90 45 22)' : ''}">${SYMBOLES_DESSIN.ampèremètre.replace(/<path d="M4 22H32M58 22H86" class="pc-fil"\/>/, '')}</g>`;
  return s + '</svg>';
}

// ============================================================ OMBRES

/** Source ponctuelle, balle opaque et écran : rayons, ombre propre, ombre portée. */
export function ombre(host) {
  let xo = 120, rayons = true;
  const XS = 30, YS = 92, XE = 300, RB = 16;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Position de la balle <input type="range" min="70" max="250" step="5" value="${xo}" data-x> <span class="fig-val" data-xv></span></label></div>
    <label class="pc-case"><input type="checkbox" data-r checked> montrer les rayons lumineux</label>
    <svg viewBox="0 0 320 184" class="pc-svg" role="img" aria-label="Ombre propre et ombre portée" data-svg></svg>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    const k = (XE - XS) / (xo - XS), yh = YS - RB * k, yb = YS + RB * k;
    const yhC = borne(yh, 4, 180), ybC = borne(yb, 4, 180);
    let s = `<path d="M${XS} ${YS} L${XE} 4 V180 Z" class="pc-lumiere"/>`;
    s += `<path d="M${xo} ${YS - RB} L${XE} ${r1(yhC)} V${r1(ybC)} L${xo} ${YS + RB}Z" class="pc-cone-ombre"/>`;
    if (rayons) {
      s += `<line x1="${XS}" y1="${YS}" x2="${XE}" y2="${r1(yh)}" class="pc-rayon"/><line x1="${XS}" y1="${YS}" x2="${XE}" y2="${r1(yb)}" class="pc-rayon"/>`;
      [-0.85, -0.45, 0.45, 0.85].forEach((a) => { s += `<line x1="${XS}" y1="${YS}" x2="${XE}" y2="${r1(YS + a * 88)}" class="pc-rayon pc-rayon-fin"/>`; });
    }
    s += `<rect x="${XE}" y="4" width="10" height="176" class="pc-ecran-ombre"/><rect x="${XE}" y="${r1(yhC)}" width="10" height="${r1(Math.max(0, ybC - yhC))}" class="pc-ombre-portee"/>`;
    s += `<circle cx="${xo}" cy="${YS}" r="${RB}" class="pc-balle-eclairee"/><path d="M${xo} ${YS - RB} A${RB} ${RB} 0 0 1 ${xo} ${YS + RB}Z" class="pc-ombre-propre"/>`;
    s += `<circle cx="${XS}" cy="${YS}" r="9" class="pc-source"/>`;
    s += `<text x="${XS}" y="${YS + 26}" text-anchor="middle" class="pc-petit">source</text><text x="${xo}" y="${YS + RB + 16}" text-anchor="middle" class="pc-petit">ombre propre</text><text x="${XE - 4}" y="${r1(Math.min(172, ybC + 14))}" text-anchor="end" class="pc-petit">ombre portée</text>`;
    svg.innerHTML = s;
    const h = (2 * RB * k) / 10;
    $(wrap, '[data-xv]').textContent = `${nb((xo - XS) / 10, 1)} cm de la source`;
    $(wrap, '[data-txt]').innerHTML = `La lumière se propage <strong>en ligne droite</strong> : les rayons qui frôlent la balle délimitent l'ombre. Balle de 3,2 cm → ombre portée de <strong>${nb(h, 1)} cm</strong>${h > 17.6 ? ' (plus grande que l\'écran)' : ''}. Plus la balle est proche de la source, plus son ombre portée est grande.`;
  };
  $(wrap, '[data-x]').addEventListener('input', (ev) => { xo = +ev.target.value; dessiner(); });
  $(wrap, '[data-r]').addEventListener('change', (ev) => { rayons = ev.target.checked; dessiner(); });
  dessiner();
}

export { segments, lierSegments, chemin, prop };

// ======================================================== RÉFÉRENTIEL

/** Un passager dans un train : en mouvement par rapport au quai, immobile par rapport au train. */
export function referentiel(host) {
  let ref = 'quai', t = 0, traces = [];
  const V = 38; // px/s
  const wrap = cadre(host, `
    ${segments('Référentiel', [['quai', 'Vu depuis le quai'], ['train', 'Vu depuis le train']])}
    <svg viewBox="0 0 320 170" class="pc-svg" role="img" aria-label="Relativité du mouvement : un passager dans un train" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-raz>Rejouer</button><span class="pc-legende"><span class="pc-pastille pc-passager"></span>positions du passager, toutes les secondes</span></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const arbre = (x) => `<line x1="${r1(x)}" y1="132" x2="${r1(x)}" y2="112" class="pc-tronc"/><circle cx="${r1(x)}" cy="104" r="12" class="pc-feuillage"/>`;
  const dessiner = () => {
    const dep = V * t; // déplacement du train par rapport au quai
    const xTrain = ref === 'quai' ? 20 + dep : 110, decor = ref === 'quai' ? 0 : -dep;
    let s = `<line x1="0" y1="140" x2="320" y2="140" class="pc-sol"/>`;
    for (let k = -1; k < 12; k++) { const x = (((k * 60 + decor) % 720) + 720) % 720 - 60; if (x > -20 && x < 340) s += arbre(x + 10); }
    const xObs = ((((250 + decor) % 720) + 720) % 720) - 60;
    if (xObs > -20 && xObs < 340) s += `<circle cx="${r1(xObs)}" cy="112" r="5" class="pc-personne"/><line x1="${r1(xObs)}" y1="117" x2="${r1(xObs)}" y2="131" class="pc-personne-trait"/><text x="${r1(xObs)}" y="156" text-anchor="middle" class="pc-petit">Lina (sur le quai)</text>`;
    s += traces.map(([xq]) => { const x = ref === 'quai' ? xq : 110 + (xq - (20 + dep)); return `<circle cx="${r1(x + 50)}" cy="94" r="3.5" class="pc-trace-passager"/>`; }).join('');
    s += `<rect x="${r1(xTrain)}" y="66" width="110" height="62" rx="10" class="pc-train"/><rect x="${r1(xTrain + 12)}" y="76" width="30" height="22" rx="3" class="pc-vitre"/><rect x="${r1(xTrain + 62)}" y="76" width="30" height="22" rx="3" class="pc-vitre"/>`;
    s += `<circle cx="${r1(xTrain + 25)}" cy="136" r="6" class="pc-roue"/><circle cx="${r1(xTrain + 85)}" cy="136" r="6" class="pc-roue"/>`;
    s += `<circle cx="${r1(xTrain + 50)}" cy="94" r="6" class="pc-passager"/><text x="${r1(xTrain + 55)}" y="60" text-anchor="middle" class="pc-petit">Tom (passager)</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    $(wrap, '[data-txt]').innerHTML = ref === 'quai'
      ? "Pour Lina, immobile sur le quai, Tom est <strong>en mouvement</strong> : ses positions successives forment une droite, sa trajectoire est <strong>rectiligne</strong>."
      : "Pour un voyageur assis dans le train, Tom est <strong>immobile</strong> : sa position ne change pas. C'est le paysage et Lina qui semblent défiler. Le mouvement dépend du <strong>référentiel</strong> choisi.";
  };
  let dernier = -1;
  const etat = animer(wrap, (dt) => {
    t += dt;
    if (V * t > 190) { t = 0; traces = []; dernier = -1; }
    if (Math.floor(t) !== dernier) { dernier = Math.floor(t); traces.push([20 + V * t]); }
    dessiner();
  });
  lierLecture(wrap, etat);
  if (!etat.joue) { for (let k = 0; k <= 4; k++) traces.push([20 + V * k]); t = 4; dessiner(); }
  lierSegments(wrap, ref, (v) => { ref = v === 'train' ? 'train' : 'quai'; maj(); dessiner(); });
  $(wrap, '[data-raz]').addEventListener('click', () => { t = 0; traces = []; dernier = -1; dessiner(); });
  maj();
}

// ========================================== DIAGRAMME OBJET-INTERACTIONS

export const SITUATIONS_DOI = [
  { titre: 'Un livre posé sur une table', systeme: 'livre', acteurs: [['Terre', 'distance'], ['table', 'contact']] },
  { titre: 'Un trombone attiré par un aimant, suspendu à un fil', systeme: 'trombone', acteurs: [['aimant', 'distance'], ['fil', 'contact'], ['Terre', 'distance']] },
  { titre: 'Un ballon frappé par un pied', systeme: 'ballon', acteurs: [['pied', 'contact'], ['Terre', 'distance'], ['air', 'contact']] },
  { titre: 'Un parachutiste qui descend', systeme: 'parachutiste', acteurs: [['parachute', 'contact'], ['Terre', 'distance'], ['air', 'contact']] },
  { titre: 'La Lune en orbite', systeme: 'Lune', acteurs: [['Terre', 'distance'], ['Soleil', 'distance']] },
  { titre: 'Un skieur tiré par un téléski', systeme: 'skieur', acteurs: [['perche du téléski', 'contact'], ['neige', 'contact'], ['Terre', 'distance']] },
];

/** Diagramme objet-interactions (fixe) : trait plein = contact, pointillés = à distance. */
export function schemaDOI(S, { anime = false } = {}) {
  const P = [[70, 38], [250, 38], [160, 150], [60, 150]];
  let s = `<svg viewBox="0 0 320 180" class="pc-svg pc-schema pc-doi ${anime ? 'pc-doi-anime' : ''}" role="img" aria-label="Diagramme objet-interactions : ${S.titre}">`;
  S.acteurs.forEach(([nom, type], k) => {
    const [x, y] = P[k];
    s += `<line x1="160" y1="92" x2="${x}" y2="${y}" class="pc-doi-lien pc-doi-${type}" style="animation-delay:${0.15 + k * 0.25}s"/>`;
  });
  S.acteurs.forEach(([nom], k) => {
    const [x, y] = P[k], w = Math.max(56, nom.length * 7.4 + 18);
    s += `<g class="pc-doi-acteur" style="animation-delay:${0.1 + k * 0.25}s"><rect x="${r1(x - w / 2)}" y="${y - 14}" width="${r1(w)}" height="28" rx="14" class="pc-doi-boite"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="pc-doi-texte">${nom}</text></g>`;
  });
  const w = Math.max(76, S.systeme.length * 8.5 + 24);
  s += `<rect x="${r1(160 - w / 2)}" y="74" width="${r1(w)}" height="36" rx="8" class="pc-doi-systeme"/><text x="160" y="97" text-anchor="middle" class="pc-doi-texte pc-doi-texte-fort">${S.systeme}</text>`;
  return s + '</svg>';
}

/** Choisir une situation : le diagramme objet-interactions se construit. */
export function interactions(host) {
  let k = 0;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Situation <select data-s>${SITUATIONS_DOI.map((S, i) => `<option value="${i}">${S.titre}</option>`).join('')}</select></label></div>
    <div data-doi></div>
    <div class="pc-legende pc-legende-doi"><span><svg width="34" height="10" aria-hidden="true"><line x1="0" y1="5" x2="34" y2="5" class="pc-doi-lien pc-doi-contact"/></svg> action de contact</span><span><svg width="34" height="10" aria-hidden="true"><line x1="0" y1="5" x2="34" y2="5" class="pc-doi-lien pc-doi-distance"/></svg> action à distance</span></div>
    <div class="fig-readout" data-txt></div>`);
  const maj = () => {
    const S = SITUATIONS_DOI[k] || SITUATIONS_DOI[0];
    $(wrap, '[data-doi]').innerHTML = schemaDOI(S, { anime: true });
    const c = S.acteurs.filter((a) => a[1] === 'contact').map((a) => a[0]), d = S.acteurs.filter((a) => a[1] === 'distance').map((a) => a[0]);
    $(wrap, '[data-txt]').innerHTML = `Système étudié : <strong>${S.systeme}</strong>. ${c.length ? `Actions de contact : ${c.join(', ')}. ` : ''}${d.length ? `Actions à distance : ${d.join(', ')}.` : ''}<br>Chaque trait représente une <strong>interaction</strong> : si A agit sur B, alors B agit aussi sur A.`;
  };
  $(wrap, '[data-s]').addEventListener('change', (ev) => { k = +ev.target.value || 0; maj(); });
  maj();
}

// ====================================================== LE SON : COURSE

const MILIEUX_SON = [['air', 340], ['eau', 1500], ['acier', 5000], ['vide', 0]];

/** Un même son parcourt 1 km dans l'air, l'eau, l'acier… et pas dans le vide. */
export function courseDuSon(host) {
  let d = 1020, t = 0;
  const wrap = cadre(host, `
    <div class="fig-controls"><label>Distance <input type="range" min="340" max="3400" step="340" value="${d}" data-d> <span class="fig-val" data-dv></span></label></div>
    <svg viewBox="0 0 320 176" class="pc-svg" role="img" aria-label="Vitesse du son dans différents milieux" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-raz>Relancer</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const tAir = () => d / 340;
  const acceleration = () => Math.max(1, tAir() / 4); // l'animation dure au plus ~4 s
  const dessiner = () => {
    const tr = t; // temps réel simulé
    let s = '';
    MILIEUX_SON.forEach(([nom, v], k) => {
      const y = 22 + k * 40, x0 = 58, x1 = 300;
      s += `<rect x="${x0}" y="${y - 12}" width="${x1 - x0}" height="24" rx="12" class="pc-piste-son pc-piste-${nom}"/>`;
      s += `<text x="${x0 - 8}" y="${y + 4}" text-anchor="end" class="pc-etiquette pc-etiquette-petite">${nom}</text>`;
      if (!v) { s += `<text x="${(x0 + x1) / 2}" y="${y + 4}" text-anchor="middle" class="pc-petit">le son ne se propage pas</text>`; return; }
      const duree = d / v, u = Math.min(1, tr / duree), x = x0 + 10 + u * (x1 - x0 - 20);
      for (let a = 0; a < 3; a++) { const xa = x - a * 7; if (xa > x0 + 6) s += `<path d="M${r1(xa)} ${y - 8} q5 8 0 16" class="pc-front-son" opacity="${1 - a * 0.3}"/>`; }
      s += `<text x="${x1 - 6}" y="${y + 4}" text-anchor="end" class="pc-petit pc-temps-son">${u >= 1 ? `${nb(duree, 2)} s` : ''}</text>`;
    });
    s += `<text x="58" y="172" class="pc-petit">temps écoulé : ${nb(Math.min(tr, tAir()), 2)} s${acceleration() > 1 ? ` (accéléré ×${nb(acceleration(), 1)})` : ''}</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    $(wrap, '[data-dv]').textContent = `${nb(d / 1000, 2)} km`;
    $(wrap, '[data-txt]').innerHTML = `Durée pour parcourir ${d} m : air <strong>${nb(d / 340, 2)} s</strong>, eau <strong>${nb(d / 1500, 2)} s</strong>, acier <strong>${nb(d / 5000, 2)} s</strong>. Le son va plus vite dans les solides et les liquides que dans l'air ; dans le vide, il ne se propage pas.`;
  };
  const etat = animer(wrap, (dt) => { t += dt * acceleration(); if (t > tAir() + 1.5 * acceleration()) t = 0; dessiner(); });
  lierLecture(wrap, etat);
  if (!etat.joue) t = tAir();
  $(wrap, '[data-d]').addEventListener('input', (ev) => { d = +ev.target.value; t = etat.joue ? 0 : tAir(); maj(); dessiner(); });
  $(wrap, '[data-raz]').addEventListener('click', () => { t = 0; dessiner(); });
  maj(); dessiner();
}

/** Échelle des niveaux sonores (fixe). */
export function echelleDecibels(host) {
  const NIVEAUX = [[0, "seuil d'audibilité"], [30, 'chuchotement'], [60, 'conversation'], [85, 'seuil de danger'], [100, 'concert, baladeur à fond'], [120, 'seuil de douleur'], [140, 'avion au décollage']];
  const y = (L) => 186 - L * 1.25;
  let s = `<svg viewBox="0 0 320 200" class="pc-svg" role="img" aria-label="Échelle des niveaux sonores en décibels"><defs><linearGradient id="db-g" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#3fbf6a"/><stop offset="0.55" stop-color="#ffcf33"/><stop offset="0.62" stop-color="#ff8f3f"/><stop offset="1" stop-color="#e2294f"/></linearGradient></defs>`;
  s += `<rect x="60" y="${y(140)}" width="22" height="${186 - y(140)}" rx="11" fill="url(#db-g)"/>`;
  NIVEAUX.forEach(([L, nom]) => { s += `<line x1="84" y1="${r1(y(L))}" x2="100" y2="${r1(y(L))}" class="pc-axe"/><text x="52" y="${r1(y(L) + 4)}" text-anchor="end" class="pc-petit">${L} dB</text><text x="106" y="${r1(y(L) + 4)}" class="pc-etiquette pc-etiquette-petite ${L >= 85 ? 'pc-danger-texte' : ''}">${nom}</text>`; });
  host.innerHTML = s + '</svg>';
}

// ================================================ VOYAGE DE LA LUMIÈRE

const DESTINATIONS = [
  ['la Lune', 3.84e8, 'Lune'], ['Mars (au plus près)', 5.6e10, 'Mars'], ['le Soleil', 1.5e11, 'Soleil'], ['Proxima du Centaure', 4.0e16, 'Proxima'],
];
/** Durée lisible : 1,28 s ; 8 min 20 s ; 4,2 ans. */
export function dureeLisible(s) {
  if (s < 60) return `${nb(s, 2)} s`;
  if (s < 3600) { const m = Math.floor(s / 60); return `${m} min ${Math.round(s - 60 * m)} s`; }
  if (s < 86400 * 365) return `${nb(s / 3600, 1)} h`;
  return `${nb(s / 3.156e7, 1)} ans`;
}

/** La lumière part de la Terre vers un astre : durée réelle du trajet, animation accélérée. */
export function voyageLumiere(host) {
  let k = 0, u = 0;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Destination <select data-d>${DESTINATIONS.map((x, i) => `<option value="${i}">${x[0]}</option>`).join('')}</select></label></div>
    <svg viewBox="0 0 320 120" class="pc-svg" role="img" aria-label="Trajet de la lumière entre la Terre et un astre" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}</div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const dessiner = () => {
    const [, dist, court] = DESTINATIONS[k] || DESTINATIONS[0], T = dist / 3e8, x = 44 + u * 232;
    let s = `<line x1="44" y1="56" x2="276" y2="56" class="pc-trajectoire"/>`;
    s += `<circle cx="30" cy="56" r="16" class="pc-terre"/><text x="30" y="92" text-anchor="middle" class="pc-petit">Terre</text>`;
    s += `<circle cx="292" cy="56" r="${court === 'Soleil' ? 20 : court === 'Proxima' ? 10 : 12}" class="pc-astre pc-astre-${court}"/><text x="292" y="92" text-anchor="middle" class="pc-petit">${court}</text>`;
    s += `<line x1="${r1(Math.max(44, x - 26))}" y1="56" x2="${r1(x)}" y2="56" class="pc-photon-trainee"/><circle cx="${r1(x)}" cy="56" r="5" class="pc-photon"/>`;
    s += `<text x="160" y="112" text-anchor="middle" class="pc-etiquette pc-etiquette-petite">${dureeLisible(T * u)}</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    const [nom, dist] = DESTINATIONS[k] || DESTINATIONS[0], T = dist / 3e8;
    const p = Math.floor(Math.log10(dist)), m = String(arrondi(dist / 10 ** p, 2)).replace('.', ',');
    $(wrap, '[data-txt]').innerHTML = `Distance Terre – ${nom} : ${m} × 10<sup>${p}</sup> m. Durée du trajet : t = d ÷ c = ${m} × 10<sup>${p}</sup> ÷ (3 × 10<sup>8</sup>) ≈ <strong>${dureeLisible(T)}</strong>.${k === 3 ? " C'est 4,2 années-lumière : on voit cette étoile telle qu'elle était il y a 4,2 ans." : ''}`;
  };
  const etat = animer(wrap, (dt) => { u += dt / 3; if (u > 1.4) u = 0; dessiner(); });
  lierLecture(wrap, etat);
  if (!etat.joue) u = 1;
  $(wrap, '[data-d]').addEventListener('change', (ev) => { k = +ev.target.value || 0; u = etat.joue ? 0 : 1; maj(); dessiner(); });
  maj(); dessiner();
}
