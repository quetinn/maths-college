// =====================================================================
//  figures_chimie.js — Figures de chimie de 4ᵉ : molécules (modèles
//  moléculaires), réaction sur une balance, bougie sous une cloche,
//  ajustement des équations de réaction.
//  Mêmes règles que figures.js (boucle `animer`, lecture/pause, SVG
//  en chaînes pour le banc de test).
// =====================================================================

import { arrondi } from '../commun.js';
import { animer, cadre, lierLecture, boutonLecture, nb } from './figures.js';
import { segments, lierSegments } from './figures_cycle.js';

const $ = (w, s) => w.querySelector(s);
const r1 = (x) => arrondi(x, 1);

// ============================================================ MOLÉCULES

/** Rayon de dessin de chaque atome (modèle compact). */
const RAYON = { H: 7, C: 10, O: 10, N: 10.5, Cu: 11, Fe: 11 };

/** Modèles moléculaires : [symbole, x, y] (l'atome central en dernier : il est dessiné par-dessus). */
const MODELES = {
  H2O: [['H', -15, 11], ['H', 15, 11], ['O', 0, 0]],
  O2: [['O', -8, 0], ['O', 8, 0]],
  N2: [['N', -8.5, 0], ['N', 8.5, 0]],
  H2: [['H', -6, 0], ['H', 6, 0]],
  CO2: [['O', -17, 0], ['O', 17, 0], ['C', 0, 0]],
  CO: [['C', -8, 0], ['O', 9, 0]],
  CH4: [['H', -13, -11], ['H', 13, -11], ['H', -13, 11], ['H', 13, 11], ['C', 0, 0]],
  C: [['C', 0, 0]], Cu: [['Cu', 0, 0]], Fe: [['Fe', 0, 0]],
  CuO: [['Cu', -8, 0], ['O', 9, 0]],
  Fe3O4: [['O', -19, -9], ['O', 19, -9], ['O', -19, 10], ['O', 19, 10], ['Fe', -8, 3], ['Fe', 8, 3], ['Fe', 0, -12]],
};

/** Noms des espèces chimiques (avec article) et des éléments. */
export const NOMS_ESPECES = {
  H2O: "l'eau", O2: 'le dioxygène', N2: 'le diazote', H2: 'le dihydrogène', CO2: 'le dioxyde de carbone', CO: 'le monoxyde de carbone',
  CH4: 'le méthane', C: 'le carbone', Cu: 'le cuivre', Fe: 'le fer', CuO: "l'oxyde de cuivre", Fe3O4: "l'oxyde de fer",
};
export const NOMS_ELEMENTS = { H: 'hydrogène', C: 'carbone', O: 'oxygène', N: 'azote', Cu: 'cuivre', Fe: 'fer' };

/** Composition d'une formule : 'CH4' → { C: 1, H: 4 }. */
export function composition(f) {
  const c = {};
  for (const [, el, n] of String(f).matchAll(/([A-Z][a-z]?)(\d*)/g)) c[el] = (c[el] || 0) + (n ? +n : 1);
  return c;
}
/** Nombre total d'atomes d'une formule. */
export const nbAtomes = (f) => Object.values(composition(f)).reduce((a, b) => a + b, 0);
/** Formule en HTML : 'CO2' → « CO<sub>2</sub> ». */
export const formuleHTML = (f) => String(f).replace(/(\d+)/g, '<sub>$1</sub>');
/** Formule pour un choix de QCM (rendue par KaTeX) : 'CO2' → « $\mathrm{CO_{2}}$ ». */
export const formuleTex = (f) => `$\\mathrm{${String(f).replace(/(\d+)/g, '_{$1}')}}$`;

/** Dessin d'une molécule centrée en (x, y), à l'échelle k, tournée de `a` radians. */
export function dessinMolecule(f, x, y, k = 1, a = 0) {
  const modele = MODELES[f] || Object.entries(composition(f)).flatMap(([el, n]) => Array.from({ length: n }, () => [el, 0, 0])).map(([el], i, t) => [el, 14 * Math.cos((i / t.length) * 2 * Math.PI), 14 * Math.sin((i / t.length) * 2 * Math.PI)]);
  const c = Math.cos(a), s = Math.sin(a);
  return modele.map(([el, dx, dy]) => `<circle cx="${r1(x + k * (dx * c - dy * s))}" cy="${r1(y + k * (dx * s + dy * c))}" r="${r1(k * (RAYON[el] || 10))}" class="pc-at pc-at-${el}"/>`).join('');
}
/** Petite molécule isolée (énoncés). */
export const schemaMolecule = (f) => `<svg viewBox="-40 -30 80 60" class="pc-svg pc-schema pc-molecule-seule" role="img" aria-label="Modèle moléculaire">${dessinMolecule(f, 0, 0, 1.2)}</svg>`;

/** Légende « 2 atomes d'hydrogène, 1 atome d'oxygène ». */
export function detailAtomes(f) {
  return Object.entries(composition(f)).map(([el, n]) => `${n} atome${n > 1 ? 's' : ''} ${/^[aeiouyh]/.test(NOMS_ELEMENTS[el]) ? "d'" : 'de '}${NOMS_ELEMENTS[el]}`).join(', ');
}

const pastillesAtomes = (f) => Object.keys(composition(f)).map((el) => `<span class="pc-pastille pc-at-${el}"></span>${NOMS_ELEMENTS[el]} (${el})`).join(' ');

/** Modèles moléculaires qui tournent, et une « photo » de l'air. */
export function molecules(host, { depart = 'H2O' } = {}) {
  const CHOIX = [['H2O', 'Eau'], ['O2', 'Dioxygène'], ['N2', 'Diazote'], ['CO2', 'Dioxyde de carbone'], ['CH4', 'Méthane'], ['air', "L'air"]];
  let f = CHOIX.some((c) => c[0] === depart) ? depart : 'H2O';
  const air = Array.from({ length: 20 }, (_, i) => ({ f: i < 16 ? 'N2' : 'O2', x: 30 + Math.random() * 260, y: 20 + Math.random() * 120, vx: (Math.random() - 0.5) * 90, vy: (Math.random() - 0.5) * 90, a: Math.random() * 6, w: (Math.random() - 0.5) * 3 }));
  const wrap = cadre(host, `
    ${segments('Molécule', CHOIX)}
    <svg viewBox="0 0 320 160" class="pc-svg" role="img" aria-label="Modèle moléculaire" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<span class="pc-legende" data-leg></span></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const dessiner = (t) => {
    if (f === 'air') {
      svg.innerHTML = `<rect x="14" y="6" width="292" height="148" rx="12" class="pc-boite-air"/>` + air.map((m) => dessinMolecule(m.f, m.x, m.y, 0.8, m.a)).join('');
      return;
    }
    svg.innerHTML = dessinMolecule(f, 160, 80, 2.6, Math.sin(t * 0.6) * 0.5) + `<text x="160" y="154" text-anchor="middle" class="pc-etiquette">${f.replace(/(\d)/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d])}</text>`;
  };
  const maj = () => {
    const leg = f === 'air' ? pastillesAtomes('NO') : pastillesAtomes(f);
    $(wrap, '[data-leg]').innerHTML = leg;
    $(wrap, '[data-txt]').innerHTML = f === 'air'
      ? "L'air est un <strong>mélange</strong> de gaz : environ <strong>78 % de diazote</strong> (N₂) et <strong>21 % de dioxygène</strong> (O₂), soit à peu près 4 molécules sur 5 de diazote. Le 1 % restant : argon, dioxyde de carbone, vapeur d'eau…"
      : `<strong>${formuleHTML(f)}</strong> : une molécule ${NOMS_ESPECES[f].replace(/^le |^la /, 'de ').replace(/^l'/, "d'")}, formée de ${detailAtomes(f)}, soit <strong>${nbAtomes(f)} atomes</strong>.`;
  };
  const etat = animer(wrap, (dt, t) => {
    if (f === 'air') {
      air.forEach((m) => {
        m.x += m.vx * dt; m.y += m.vy * dt; m.a += m.w * dt;
        if (m.x < 30 || m.x > 290) { m.vx = -m.vx; m.x = Math.max(30, Math.min(290, m.x)); }
        if (m.y < 20 || m.y > 140) { m.vy = -m.vy; m.y = Math.max(20, Math.min(140, m.y)); }
      });
    }
    dessiner(t);
  });
  lierLecture(wrap, etat);
  lierSegments(wrap, f, (v) => { f = v; maj(); dessiner(etat.t); });
  maj(); dessiner(0);
}

// ============================================ RÉACTION SUR UNE BALANCE

/** Vinaigre + bicarbonate dans un flacon sur une balance : fermé, la masse se conserve ; ouvert, le gaz s'échappe. */
export function balanceReaction(host) {
  let ferme = true, p = 0, lance = false, bulles = [], fuite = [];
  const M0 = 312.4, DM = 2.2;
  const wrap = cadre(host, `
    ${segments('Flacon', [['ferme', 'Flacon fermé par un ballon'], ['ouvert', 'Flacon ouvert']])}
    <svg viewBox="0 0 320 196" class="pc-svg" role="img" aria-label="Réaction chimique dans un flacon posé sur une balance" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-go>Lancer la réaction</button><button type="button" class="btn btn-ghost" data-raz>Recommencer</button></div>
    <div class="fig-readout" data-txt></div>`);
  const svg = $(wrap, '[data-svg]');
  const masse = () => M0 - (ferme ? 0 : DM * p);
  const dessiner = () => {
    const rb = ferme ? 9 + 22 * p : 0;
    let s = `<path d="M126 118 L112 146 Q110 152 116 152 H204 Q210 152 208 146 L194 118 Z" class="pc-vinaigre"/>`;
    s += bulles.map((b) => `<circle cx="${r1(b.x)}" cy="${r1(b.y)}" r="${r1(b.r)}" class="pc-bulle"/>`).join('');
    s += `<path d="M150 26 V70 L112 146 Q110 152 116 152 H204 Q210 152 208 146 L170 70 V26" class="pc-verre"/>`;
    if (ferme) {
      s += `<ellipse cx="160" cy="${r1(22 - rb * 0.9)}" rx="${r1(rb * 0.9 + 3)}" ry="${r1(rb + 4)}" class="pc-ballon"/><rect x="148" y="18" width="24" height="10" rx="3" class="pc-ballon"/>`;
      if (!lance) s += `<circle cx="156" cy="10" r="2.2" class="pc-poudre"/><circle cx="162" cy="7" r="2.2" class="pc-poudre"/><circle cx="165" cy="12" r="2.2" class="pc-poudre"/>`;
    } else if (!lance) s += `<path d="M186 12 l20 -8 v6z" class="pc-cuillere"/><circle cx="196" cy="8" r="2.2" class="pc-poudre"/>`;
    s += fuite.map((b) => `<circle cx="${r1(b.x)}" cy="${r1(b.y)}" r="2.6" class="pc-gaz" opacity="${arrondi(Math.max(0, b.o), 2)}"/>`).join('');
    s += `<rect x="80" y="156" width="160" height="32" rx="7" class="pc-boitier"/><rect x="118" y="162" width="84" height="20" rx="3" class="pc-lcd-svg"/>`;
    s += `<text x="196" y="177" text-anchor="end" class="pc-lcd-texte">${nb(masse(), 1)} g</text>`;
    s += `<text x="236" y="112" class="pc-petit">vinaigre</text><line x1="234" y1="110" x2="200" y2="128" class="pc-trait"/>`;
    if (ferme) s += `<text x="206" y="30" class="pc-petit">ballon (bicarbonate)</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    const t = !lance
      ? `Masse du système : <strong>${nb(M0, 1)} g</strong>. ${ferme ? 'Le bicarbonate est dans le ballon, qui bouche le flacon.' : 'On va verser le bicarbonate dans le flacon ouvert.'}`
      : ferme
        ? `Des bulles de <strong>dioxyde de carbone</strong> se forment et gonflent le ballon : le gaz reste dans le système. La balance indique toujours <strong>${nb(masse(), 1)} g</strong> : la masse totale <strong>se conserve</strong>.`
        : `Le gaz formé <strong>s'échappe</strong> dans l'air : la balance passe de ${nb(M0, 1)} g à <strong>${nb(masse(), 1)} g</strong>. La masse n'a pas disparu : il manque la masse du gaz parti (${nb(M0 - masse(), 1)} g).`;
    $(wrap, '[data-txt]').innerHTML = t;
  };
  const etape = (dt) => {
    if (lance && p < 1) p = Math.min(1, p + dt / 4);
    const intensite = lance ? 1 - p * 0.8 : 0;
    if (Math.random() < intensite * dt * 40) bulles.push({ x: 124 + Math.random() * 72, y: 150, r: 1.5 + Math.random() * 2.5 });
    bulles.forEach((b) => { b.y -= dt * 60; });
    bulles = bulles.filter((b) => b.y > 120);
    if (!ferme && lance && Math.random() < intensite * dt * 25) fuite.push({ x: 160 + (Math.random() - 0.5) * 10, y: 40, o: 1 });
    fuite.forEach((b) => { b.y -= dt * 40; b.x += (Math.random() - 0.5) * 20 * dt; b.o -= dt * 0.6; });
    fuite = fuite.filter((b) => b.o > 0);
  };
  const etat = animer(wrap, (dt) => { etape(dt); dessiner(); if (lance) maj(); });
  lierLecture(wrap, etat);
  const raz = () => { p = 0; lance = false; bulles = []; fuite = []; maj(); dessiner(); };
  lierSegments(wrap, 'ferme', (v) => { ferme = v !== 'ouvert'; raz(); });
  $(wrap, '[data-go]').addEventListener('click', () => { lance = true; if (!etat.joue) p = 1; maj(); dessiner(); });
  $(wrap, '[data-raz]').addEventListener('click', raz);
  maj(); dessiner();
}

// ============================================== BOUGIE SOUS UNE CLOCHE

const CLOCHES = [[0.5, 64, 76], [1, 84, 96], [2, 108, 120]]; // volume (L), largeur, hauteur

/** Une bougie sous une cloche s'éteint quand elle a consommé une partie du dioxygène ; test à l'eau de chaux. */
export function bougieCloche(host) {
  let c = 1, couvert = false, descente = 0, brule = 0, eteinte = false, test = 0, testLance = false;
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Volume de la cloche <select data-v>${CLOCHES.map(([v], k) => `<option value="${k}">${String(v).replace('.', ',')} L</option>`).join('')}</select></label></div>
    <svg viewBox="0 0 320 196" class="pc-svg" role="img" aria-label="Bougie sous une cloche" data-svg></svg>
    <div class="pc-boutons">${boutonLecture}<button type="button" class="btn btn-ghost" data-couvrir>Couvrir la bougie</button><button type="button" class="btn btn-ghost" data-test>Test à l'eau de chaux</button><button type="button" class="btn btn-ghost" data-raz>Recommencer</button></div>
    <div class="fig-readout" data-txt></div>`);
  $(wrap, '[data-v]').value = String(c);
  const svg = $(wrap, '[data-svg]');
  const duree = () => 4 * CLOCHES[c][0];
  const dessiner = (t) => {
    const [, w, h] = CLOCHES[c], yBas = 168, dy = (1 - descente) * -140;
    const reste = eteinte ? 0 : couvert ? Math.max(0, 1 - Math.max(0, brule - duree() * 0.6) / (duree() * 0.4)) : 1;
    const fl = reste * (1 + 0.08 * Math.sin(t * 23) + 0.05 * Math.sin(t * 37));
    let s = `<line x1="10" y1="${yBas}" x2="310" y2="${yBas}" class="pc-sol"/>`;
    s += `<rect x="130" y="118" width="20" height="${yBas - 118}" rx="2" class="pc-cire"/><line x1="140" y1="118" x2="140" y2="110" class="pc-meche"/>`;
    if (fl > 0.02) s += `<path d="M140 ${r1(110 - 24 * fl)} C${r1(140 + 9 * fl)} ${r1(110 - 10 * fl)} ${r1(140 + 7 * fl)} 110 140 110 C${r1(140 - 7 * fl)} 110 ${r1(140 - 9 * fl)} ${r1(110 - 10 * fl)} 140 ${r1(110 - 24 * fl)}Z" class="pc-flamme"/>`;
    else if (eteinte) s += `<path d="M140 108 q-4 -8 2 -14 q6 -8 -1 -18" class="pc-fumee"/>`;
    s += `<path d="M${140 - w / 2} ${r1(yBas + dy)} V${r1(yBas - h + 16 + dy)} Q${140 - w / 2} ${r1(yBas - h + dy)} ${140 - w / 2 + 16} ${r1(yBas - h + dy)} H${140 + w / 2 - 16} Q${140 + w / 2} ${r1(yBas - h + dy)} ${140 + w / 2} ${r1(yBas - h + 16 + dy)} V${r1(yBas + dy)}" class="pc-cloche"/>`;
    const o2 = couvert ? 21 - 5 * Math.min(1, brule / duree()) : 21;
    s += `<text x="232" y="30" class="pc-petit">dioxygène sous la cloche</text><rect x="232" y="38" width="76" height="10" rx="5" class="pc-jauge"/><rect x="232" y="38" width="${r1((76 * o2) / 21)}" height="10" rx="5" class="pc-jauge-o2"/><text x="308" y="62" text-anchor="end" class="pc-etiquette pc-etiquette-petite">${nb(o2, 0)} %</text>`;
    if (testLance) s += `<rect x="248" y="96" width="30" height="60" rx="4" class="pc-tube"/><rect x="250" y="${r1(118)}" width="26" height="36" rx="3" class="pc-eau-chaux" opacity="${arrondi(0.35 + 0.6 * test, 2)}"/><text x="263" y="182" text-anchor="middle" class="pc-petit">eau de chaux</text>`;
    svg.innerHTML = s;
  };
  const maj = () => {
    $(wrap, '[data-txt]').innerHTML = !couvert ? "À l'air libre, la bougie brûle : elle trouve en permanence du <strong>dioxygène</strong>, le comburant."
      : !eteinte ? 'Sous la cloche, la bougie consomme le dioxygène de l\'air enfermé…'
        : `La bougie s'éteint au bout d'environ <strong>${nb(duree(), 0)} s</strong> : il ne reste plus assez de dioxygène. Plus la cloche est grande, plus elle brûle longtemps.${testLance ? " L'eau de chaux <strong>se trouble</strong> : la combustion a produit du <strong>dioxyde de carbone</strong>." : ''}`;
  };
  const etat = animer(wrap, (dt, t) => {
    if (couvert && descente < 1) descente = Math.min(1, descente + dt * 2);
    if (couvert && descente >= 1 && !eteinte) { brule += dt; if (brule >= duree()) { eteinte = true; maj(); } }
    if (testLance && test < 1) test = Math.min(1, test + dt / 1.5);
    dessiner(t);
  });
  lierLecture(wrap, etat);
  const raz = () => { couvert = false; descente = 0; brule = 0; eteinte = false; test = 0; testLance = false; maj(); dessiner(etat.t); };
  $(wrap, '[data-v]').addEventListener('change', (ev) => { c = +ev.target.value || 0; raz(); });
  $(wrap, '[data-couvrir]').addEventListener('click', () => { couvert = true; if (!etat.joue) { descente = 1; brule = duree(); eteinte = true; } maj(); dessiner(etat.t); });
  $(wrap, '[data-test]').addEventListener('click', () => { if (!eteinte) return; testLance = true; if (!etat.joue) test = 1; maj(); dessiner(etat.t); });
  $(wrap, '[data-raz]').addEventListener('click', raz);
  maj(); dessiner(0);
}

// ================================================ ÉQUATIONS DE RÉACTION

export const REACTIONS = [
  { nom: 'Combustion du carbone', r: [['C', 1], ['O2', 1]], p: [['CO2', 1]] },
  { nom: "Formation de l'eau", r: [['H2', 2], ['O2', 1]], p: [['H2O', 2]] },
  { nom: 'Combustion du méthane', r: [['CH4', 1], ['O2', 2]], p: [['CO2', 1], ['H2O', 2]] },
  { nom: 'Combustion incomplète du carbone', r: [['C', 2], ['O2', 1]], p: [['CO', 2]] },
  { nom: 'Oxydation du cuivre', r: [['Cu', 2], ['O2', 1]], p: [['CuO', 2]] },
  { nom: 'Combustion du fer', r: [['Fe', 3], ['O2', 2]], p: [['Fe3O4', 1]] },
];

/** Équation écrite avec des coefficients (1 non écrit) : « CH4 + 2 O2 → CO2 + 2 H2O ». */
export function equationHTML(R, coefs = null) {
  const liste = [...R.r, ...R.p].map(([f, n], i) => [f, coefs ? coefs[i] : n]);
  const cote = (a, b) => liste.slice(a, b).map(([f, n]) => `${n > 1 ? n + ' ' : ''}${formuleHTML(f)}`).join(' + ');
  return `${cote(0, R.r.length)} → ${cote(R.r.length)}`;
}

/** Nombre d'atomes de chaque élément de chaque côté. */
export function bilanAtomes(R, coefs) {
  const g = {}, d = {};
  [...R.r, ...R.p].forEach(([f], i) => {
    const cible = i < R.r.length ? g : d;
    Object.entries(composition(f)).forEach(([el, n]) => { cible[el] = (cible[el] || 0) + n * coefs[i]; });
  });
  const elements = [...new Set([...Object.keys(g), ...Object.keys(d)])];
  return elements.map((el) => [el, g[el] || 0, d[el] || 0]);
}

/** Ajuster une équation : on règle les coefficients, les atomes sont comptés de chaque côté. */
export function ajusteur(host, { depart = 2 } = {}) {
  let R = REACTIONS[depart] || REACTIONS[0], coefs = [];
  const wrap = cadre(host, `
    <div class="pc-choix"><label>Réaction <select data-r>${REACTIONS.map((x, k) => `<option value="${k}">${x.nom}</option>`).join('')}</select></label></div>
    <div class="pc-equation" data-eq></div>
    <div class="pc-bilan" data-bilan></div>
    <div class="pc-boutons"><button type="button" class="btn btn-ghost" data-raz>Remettre tous les nombres à 1</button></div>
    <div class="fig-readout" data-txt></div>`, 'pc-ajusteur');
  $(wrap, '[data-r]').value = String(REACTIONS.indexOf(R));
  const empile = (f, n) => {
    let s = '';
    for (let k = 0; k < n; k++) s += dessinMolecule(f, 20 + (k % 2) * 40, 20 + Math.floor(k / 2) * 34, 0.72);
    return `<svg viewBox="-2 0 84 ${20 + Math.ceil(Math.max(n, 2) / 2) * 34}" class="pc-pile-molecules" aria-hidden="true">${s}</svg>`;
  };
  const dessiner = () => {
    const tous = [...R.r, ...R.p];
    let eq = '';
    tous.forEach(([f], i) => {
      if (i === R.r.length) eq += '<span class="pc-signe pc-fleche-eq">→</span>';
      else if (i > 0) eq += '<span class="pc-signe">+</span>';
      eq += `<div class="pc-espece">
        <div class="pc-coef"><button type="button" class="pc-coef-btn" data-moins="${i}" aria-label="Diminuer le nombre devant ${f}">−</button><span class="pc-coef-n">${coefs[i]}</span><button type="button" class="pc-coef-btn" data-plus="${i}" aria-label="Augmenter le nombre devant ${f}">+</button></div>
        ${empile(f, coefs[i])}
        <div class="pc-formule">${coefs[i] > 1 ? coefs[i] + ' ' : ''}${formuleHTML(f)}</div></div>`;
    });
    $(wrap, '[data-eq]').innerHTML = eq;
    const bilan = bilanAtomes(R, coefs), ok = bilan.every(([, a, b]) => a === b);
    $(wrap, '[data-bilan]').innerHTML = `<table class="pc-bilan-table"><thead><tr><th>Atome</th><th>réactifs</th><th>produits</th></tr></thead><tbody>${bilan.map(([el, a, b]) => `<tr class="${a === b ? 'egal' : 'different'}"><td><span class="pc-pastille pc-at-${el}"></span>${el}</td><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>${ok ? '<span class="pc-tampon">Ajustée !</span>' : ''}`;
    const manque = bilan.find(([, a, b]) => a !== b);
    $(wrap, '[data-txt]').innerHTML = ok
      ? `<strong>${equationHTML(R, coefs)}</strong><br>Chaque sorte d'atome est présente en même nombre des deux côtés : les atomes se sont <strong>réarrangés</strong>, aucun n'a disparu ni n'est apparu.`
        + (coefs.some((n) => n > 1) && coefs.every((n) => n % 2 === 0) ? ' (On peut simplifier : tous les nombres sont pairs.)' : '')
      : `Atomes ${manque[0]} (${NOMS_ELEMENTS[manque[0]]}) : ${manque[1]} du côté des réactifs, ${manque[2]} du côté des produits. Change les nombres devant les formules (jamais les petits chiffres des formules !).`;
  };
  const raz = () => { coefs = [...R.r, ...R.p].map(() => 1); dessiner(); };
  wrap.addEventListener('click', (ev) => {
    const b = ev.target && ev.target.closest ? ev.target.closest('[data-plus],[data-moins]') : null;
    if (!b) return;
    const i = +(b.getAttribute('data-plus') ?? b.getAttribute('data-moins'));
    coefs[i] = Math.max(1, Math.min(6, coefs[i] + (b.hasAttribute('data-plus') ? 1 : -1)));
    dessiner();
  });
  $(wrap, '[data-r]').addEventListener('change', (ev) => { R = REACTIONS[+ev.target.value] || REACTIONS[0]; raz(); });
  $(wrap, '[data-raz]').addEventListener('click', raz);
  raz();
}
