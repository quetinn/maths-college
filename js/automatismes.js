// =====================================================================
//  automatismes.js — Partie 1 de l'épreuve de maths du brevet
//  Depuis la session 2027, l'épreuve commence par 20 minutes SANS
//  calculatrice : des questions à réponse courte, sans justification,
//  notées sur 6 points (9 questions dans les sujets de référence).
//
//  Chaque générateur suit un item de la « liste indicative d'automatismes »
//  publiée par éduscol (octobre 2025) et renvoie une question au format
//  des problèmes de brevet : { enonce, validation, reponse, corrige… }.
//  `saisie` donne une réponse type quand `reponse` n'est pas tapée telle
//  quelle (fraction, notation scientifique) : elle sert aux tests.
// =====================================================================

import { randInt, pick, gcd } from './engine.js';

const dec = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', '{,}');
const txt = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', ',');
const frac = (n, d) => `\\dfrac{${n}}{${d}}`;
/** Fraction n/d réduite, en LaTeX et en saisie clavier. */
function reduite(n, d) {
  const g = gcd(Math.abs(n), Math.abs(d)) || 1;
  const a = n / g, b = d / g;
  return b === 1 ? { tex: `${a}`, saisie: `${a}` } : { tex: (a < 0 ? '-' : '') + frac(Math.abs(a), b), saisie: `${a}/${b}` };
}

// --------------------------------------------------------------- Nombres et calculs
function fractions() {
  const b = pick([2, 3, 4, 5]);
  const d = pick([2, 3, 4, 5, 6].filter((x) => x !== b));
  const a = pick([1, 2, 3, 4].filter((x) => x < 2 * b && gcd(x, b) === 1));
  const c = pick([1, 2, 3, 5].filter((x) => x < 2 * d && gcd(x, d) === 1));
  const moins = a * d > c * b && Math.random() < 0.5;
  const num = moins ? a * d - c * b : a * d + c * b, den = b * d;
  const r = reduite(num, den);
  return {
    enonce: `<p>Calcule $A = ${frac(a, b)} ${moins ? '-' : '+'} ${frac(c, d)}$. Donne le résultat sous forme de fraction irréductible.</p>`,
    validation: 'fraction_irreductible', reponse: num / den, saisie: r.saisie, placeholder: 'ex : 7/20',
    corrige: `<p>On met au même dénominateur : $${frac(a, b)} ${moins ? '-' : '+'} ${frac(c, d)} = ${frac(a * d, den)} ${moins ? '-' : '+'} ${frac(c * b, den)} = ${frac(num, den)}${r.tex === frac(num, den) ? '' : ` = ${r.tex}`}$.</p>`,
  };
}

function puissancesDeDix() {
  const a = pick([2.4, 3.1, 1.5, 4.2]), b = pick([3, 5, 6, 7]), c = pick([1.2, 2.1, 3.5]);
  const rep = Math.round((a * 100 - b * 10 + c * 0.1) * 100) / 100;
  return {
    enonce: `<p>Calcule $B = ${dec(a)} \\times 10^{2} - ${b} \\times 10 + ${dec(c)} \\times 10^{-1}$.</p>`,
    validation: 'nombre', reponse: rep,
    corrige: `<p>$${dec(a)} \\times 10^{2} = ${dec(a * 100)}$, $${b} \\times 10 = ${b * 10}$ et $${dec(c)} \\times 10^{-1} = ${dec(c / 10)}$.</p>
      <p>Donc $B = ${dec(a * 100)} - ${b * 10} + ${dec(c / 10)} = ${dec(rep)}$.</p>`,
  };
}

function identiteRacine() {
  const a = pick([4, 5, 6, 7]), b = pick([1, 2, 3]), c = pick([2, 3, 5]);
  const rep = a * a - b * b * c;
  const br = b === 1 ? '' : b;
  return {
    enonce: `<p>Calcule $(${a} + ${br}\\sqrt{${c}})(${a} - ${br}\\sqrt{${c}})$.</p>`,
    validation: 'nombre', reponse: rep,
    corrige: `<p>C'est l'identité $(a + b)(a - b) = a^2 - b^2$ : $${a}^2 - (${br}\\sqrt{${c}})^2 = ${a * a} - ${b * b} \\times ${c} = ${rep}$.</p>`,
  };
}

function equation() {
  const a = pick([2, 3, 4, 5, 6]), x = randInt(-6, 9), b = randInt(1, 9), moins = Math.random() < 0.5;
  const c = a * x + (moins ? -b : b);
  return {
    enonce: `<p>Détermine la solution de l'équation $${a}x ${moins ? '-' : '+'} ${b} = ${c}$.</p>`,
    validation: 'nombre', reponse: x, placeholder: 'x = …',
    corrige: `<p>$${a}x = ${c} ${moins ? '+' : '-'} ${b} = ${a * x}$, donc $x = ${frac(a * x, a)} = ${x}$.</p>`,
  };
}

function reduire() {
  const b = randInt(1, 6), k = randInt(2, 5), c = randInt(2, 4), d = randInt(1, 5);
  const a = pick([2, 3, 4, 5, 6].filter((v) => v !== k * c));
  const p = a - k * c, q = -b - k * d;
  const rep = `${p}*x${q}`;
  const terme = p === 1 ? 'x' : p === -1 ? '-x' : `${p}x`;
  return {
    enonce: `<p>Réduis l'expression $${a}x - ${b} - ${k}(${c}x + ${d})$.</p>`,
    validation: 'expression', reponse: rep, placeholder: 'ex : -5x - 13',
    corrige: `<p>On distribue $-${k}$ : $${a}x - ${b} - ${k * c}x - ${k * d}$, puis on regroupe : $${terme} - ${-q}$.</p>`,
  };
}

function developper() {
  const k = pick([2, 3, 4, 5, -2, -3]), a = randInt(2, 5), b = randInt(1, 7);
  return {
    enonce: `<p>Développe $${k}(${a}x - ${b})$.</p>`,
    validation: 'expression', reponse: `${k * a}*x${-k * b < 0 ? '' : '+'}${-k * b}`, placeholder: 'ex : 6x - 9',
    corrige: `<p>$${k} \\times ${a}x = ${k * a}x$ et $${k} \\times (-${b}) = ${-k * b}$, donc $${k * a}x ${-k * b < 0 ? '-' : '+'} ${Math.abs(k * b)}$.</p>`,
  };
}

function pourcentageSimple() {
  const [p, mot] = pick([[50, 'la moitié'], [25, 'le quart'], [10, 'le dixième'], [1, 'le centième']]);
  const n = p === 25 ? pick([40, 60, 80, 120, 200]) : p === 50 ? pick([70, 90, 130, 250]) : pick([30, 80, 150, 240]) * (p === 1 ? 10 : 1);
  return {
    enonce: `<p>Calcule $${p}\\ \\%$ de $${n}$.</p>`,
    validation: 'nombre', reponse: n * p / 100,
    corrige: `<p>Prendre $${p}\\ \\%$ d'un nombre, c'est en prendre ${mot} : $${n} \\div ${100 / p} = ${dec(n * p / 100)}$.</p>`,
  };
}

function notationScientifique() {
  const m = pick([1.2, 2.5, 3.4, 4.7, 6.3, 7.5, 9.1]), e = pick([-4, -3, -2, 3, 4, 5]);
  const v = m * Math.pow(10, e);
  const ecrit = e < 0 ? '0{,}' + '0'.repeat(-e - 1) + String(m).replace('.', '') : String(Math.round(v)).replace(/\B(?=(\d{3})+$)/g, '\\,');
  return {
    enonce: `<p>Écris $${ecrit}$ en notation scientifique.</p>`,
    validation: 'notation_scientifique', reponse: v, saisie: `${String(m).replace('.', ',')}*10^${e}`, placeholder: 'ex : 3,4×10^5',
    corrige: `<p>On place la virgule après le premier chiffre non nul : $${dec(m)} \\times 10^{${e}}$ (la virgule se déplace de ${Math.abs(e)} rangs).</p>`,
  };
}

function valeurExpression() {
  const a = pick([2, 3, 4]), x = pick([-4, -3, -2, 2, 3, 5]), b = randInt(1, 9);
  return {
    enonce: `<p>Calcule la valeur de $${a}x^2 - ${b}$ pour $x = ${x}$.</p>`,
    validation: 'nombre', reponse: a * x * x - b,
    corrige: `<p>$${a} \\times ${x < 0 ? `(${x})` : x}^2 - ${b} = ${a} \\times ${x * x} - ${b} = ${a * x * x - b}$. Le carré d'un nombre est toujours positif.</p>`,
  };
}

function ecritureDecimale() {
  const [n, d] = pick([[3, 4], [1, 4], [3, 2], [5, 2], [7, 4], [1, 5], [3, 5], [7, 10], [9, 4], [1, 8]]);
  return {
    enonce: `<p>Donne l'écriture décimale de $${frac(n, d)}$.</p>`,
    validation: 'nombre', reponse: n / d,
    corrige: `<p>$${frac(n, d)} = ${n} \\div ${d} = ${dec(n / d)}$.</p>`,
  };
}

function plusGrand() {
  const serie = pick([
    [['1{,}25', 1.25], ['1 + \\dfrac{3}{100}', 1.03], ['1{,}3', 1.3], ['\\dfrac{7}{4}', 1.75]],
    [['0{,}6', 0.6], ['\\dfrac{2}{3}', 2 / 3], ['\\dfrac{5}{8}', 0.625], ['0{,}58', 0.58]],
    [['\\dfrac{3}{2}', 1.5], ['1{,}45', 1.45], ['\\dfrac{7}{5}', 1.4], ['1 + \\dfrac{35}{100}', 1.35]],
    [['-0{,}5', -0.5], ['-\\dfrac{3}{4}', -0.75], ['-0{,}45', -0.45], ['-\\dfrac{3}{5}', -0.6]],
  ]);
  const grand = Math.random() < 0.5;
  const tri = [...serie].sort((u, v) => u[1] - v[1]);
  const cible = grand ? tri[tri.length - 1] : tri[0];
  return {
    enonce: `<p>Parmi ces nombres, lequel est le plus ${grand ? 'grand' : 'petit'} ?</p>`,
    choix: serie.map((s) => `$${s[0]}$`), correct: serie.indexOf(cible),
    corrige: `<p>On passe en écriture décimale : ${tri.map((s) => `$${s[0]} ${/dfrac|\+/.test(s[0]) ? `= ${dec(Math.round(s[1] * 1000) / 1000)}` : ''}$`).join(' ; ')} (rangés du plus petit au plus grand).</p>`,
  };
}

function divisibilite() {
  const d = pick([3, 9]);
  const bons = d === 3 ? [342, 1017, 573, 2001] : [342, 1017, 738, 5103];
  const faux = d === 3 ? [512, 1040, 733, 2090] : [573, 2001, 1040, 739];
  const ok = pick(bons), autres = faux.sort(() => Math.random() - 0.5).slice(0, 3);
  const somme = String(ok).split('').reduce((s, c) => s + +c, 0);
  return {
    enonce: `<p>Lequel de ces nombres est divisible par $${d}$ ?</p>`,
    choix: [ok, ...autres].map((n) => `$${n}$`), correct: 0,
    corrige: `<p>Un nombre est divisible par ${d} quand la somme de ses chiffres l'est : pour $${ok}$, $${String(ok).split('').join(' + ')} = ${somme}$, qui est dans la table de ${d}.</p>`,
  };
}

// --------------------------------------------------------------- Espace et géométrie
function angleTriangle() {
  const a = pick([35, 40, 48, 52, 65, 70]), b = pick([25, 38, 45, 57, 60]);
  return {
    enonce: `<p>Dans un triangle, deux angles mesurent $${a}°$ et $${b}°$. Combien mesure le troisième, en degrés ?</p>`,
    validation: 'nombre', reponse: 180 - a - b, unite: '°',
    corrige: `<p>La somme des angles d'un triangle vaut $180°$ : $180 - ${a} - ${b} = ${180 - a - b}°$.</p>`,
  };
}

function conversion() {
  const [val, de, vers, k, pourquoi] = pick([
    [pick([2.5, 0.4, 3]), 'm²', 'cm²', 10000, '$1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$'],
    [pick([1.5, 2.25, 0.75]), 'h', 'min', 60, '$1\\ \\text{h} = 60\\ \\text{min}$'],
    [pick([3, 0.5, 12]), 'm³', 'L', 1000, '$1\\ \\text{m}^3 = 1\\,000\\ \\text{L}$'],
    [pick([750, 2500, 40]), 'mL', 'L', 0.001, '$1\\ \\text{L} = 1\\,000\\ \\text{mL}$'],
    [pick([3.2, 0.85, 12.5]), 'km', 'm', 1000, '$1\\ \\text{km} = 1\\,000\\ \\text{m}$'],
    [pick([45, 250, 8]), 'cm', 'm', 0.01, '$1\\ \\text{m} = 100\\ \\text{cm}$'],
  ]);
  const rep = Math.round(val * k * 1e6) / 1e6;
  return {
    enonce: `<p>Convertis ${txt(val)} ${de} en ${vers}.</p>`,
    validation: 'nombre', reponse: rep, unite: vers,
    corrige: `<p>${pourquoi}, donc ${txt(val)} ${de} = <strong>${txt(rep)} ${vers}</strong>.</p>`,
  };
}

function aireOuVolume() {
  if (Math.random() < 0.5) {
    const b = pick([6, 8, 10, 12]), h = pick([3, 5, 7, 9]);
    return {
      enonce: `<p>Un triangle a une base de ${b} cm et une hauteur associée de ${h} cm. Quelle est son aire, en cm² ?</p>`,
      validation: 'nombre', reponse: b * h / 2, unite: 'cm²',
      corrige: `<p>Aire du triangle : $${frac('\\text{base} \\times \\text{hauteur}', 2)} = ${frac(`${b} \\times ${h}`, 2)} = ${b * h / 2}\\ \\text{cm}^2$.</p>`,
    };
  }
  const l = pick([4, 5, 6]), p = pick([2, 3, 5]), h = pick([2, 3, 10]);
  return {
    enonce: `<p>Un pavé droit mesure ${l} cm de long, ${p} cm de large et ${h} cm de haut. Quel est son volume, en cm³ ?</p>`,
    validation: 'nombre', reponse: l * p * h, unite: 'cm³',
    corrige: `<p>Volume du pavé : $L \\times l \\times h = ${l} \\times ${p} \\times ${h} = ${l * p * h}\\ \\text{cm}^3$.</p>`,
  };
}

function pythagore() {
  const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
  const hyp = Math.random() < 0.6;
  return {
    enonce: hyp
      ? `<p>Le triangle ABC est rectangle en A, avec AB = ${a} cm et AC = ${b} cm. Calcule BC, en cm.</p>`
      : `<p>Le triangle ABC est rectangle en A, avec BC = ${c} cm et AB = ${a} cm. Calcule AC, en cm.</p>`,
    validation: 'nombre', reponse: hyp ? c : b, unite: 'cm',
    corrige: hyp
      ? `<p>Égalité de Pythagore : $BC^2 = AB^2 + AC^2 = ${a * a} + ${b * b} = ${c * c}$, donc $BC = \\sqrt{${c * c}} = ${c}$ cm.</p>`
      : `<p>Égalité de Pythagore : $AC^2 = BC^2 - AB^2 = ${c * c} - ${a * a} = ${b * b}$, donc $AC = \\sqrt{${b * b}} = ${b}$ cm.</p>`,
  };
}

function thales() {
  const k = pick([2, 3, 4]), ab = pick([2, 3, 5]), ac = pick([4, 6, 7]);
  const figure = `<svg viewBox="0 0 240 150" class="svg-plot fig-brevet" role="img" aria-label="Triangle AED, avec B sur [AE] et C sur [AD]">
    <g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 130 L220 130 L170 20 Z"/><path d="M100 130 L80 86"/></g>
    <g font-size="14" font-weight="700" fill="currentColor"><text x="8" y="145">A</text><text x="96" y="147">B</text><text x="218" y="147">E</text><text x="66" y="82">C</text><text x="174" y="16">D</text></g></svg>`;
  return {
    enonce: `<p>Dans le triangle AED, B est sur [AE], C est sur [AD], et les droites (BC) et (DE) sont parallèles.
      On donne AB = ${ab} cm, AC = ${ac} cm et AD = ${ac * k} cm. Détermine la longueur AE, en cm.</p>${figure}`,
    validation: 'nombre', reponse: ab * k, unite: 'cm',
    corrige: `<p>D'après le théorème de Thalès, $${frac('AB', 'AE')} = ${frac('AC', 'AD')} = ${frac(ac, ac * k)} = ${frac(1, k)}$. Donc $AE = ${k} \\times AB = ${ab * k}$ cm.</p>`,
  };
}

// --------------------------------------------------------------- Données et probabilités
function probabilite() {
  const r = randInt(2, 6), b = randInt(2, 6), v = randInt(1, 4), tot = r + b + v;
  const [nom, n] = pick([['rouge', r], ['bleue', b], ['verte', v]]);
  const red = reduite(n, tot);
  return {
    enonce: `<p>Une urne contient ${r} boules rouges, ${b} boules bleues et ${v} boule${v > 1 ? 's' : ''} verte${v > 1 ? 's' : ''}, indiscernables au toucher. On tire une boule au hasard.
      Quelle est la probabilité qu'elle soit ${nom} ? Réponds par une fraction irréductible.</p>`,
    validation: 'fraction_irreductible', reponse: n / tot, saisie: red.saisie, placeholder: 'ex : 2/5',
    corrige: `<p>Il y a ${tot} boules, dont ${n} ${nom}${n > 1 ? 's' : ''} : $p = ${frac(n, tot)}${red.tex === frac(n, tot) ? '' : ` = ${red.tex}`}$.</p>`,
  };
}

function mediane() {
  const n = pick([5, 7]);
  const vals = Array.from({ length: n }, () => randInt(3, 19));
  const tri = [...vals].sort((a, b) => a - b);
  return {
    enonce: `<p>Détermine la médiane de la série : ${vals.join(' ; ')}.</p>`,
    validation: 'nombre', reponse: tri[(n - 1) / 2],
    corrige: `<p>On range les ${n} valeurs dans l'ordre croissant : ${tri.join(' ; ')}. La médiane est la valeur du milieu, la ${(n + 1) / 2}ᵉ : <strong>${tri[(n - 1) / 2]}</strong>.</p>`,
  };
}

function moyenne() {
  const m = randInt(8, 15), ecarts = pick([[-3, -1, 1, 3], [-2, 0, 0, 2], [-4, 1, 1, 2], [-1, -1, 0, 2]]);
  const vals = ecarts.map((e) => m + e).sort(() => Math.random() - 0.5);
  const somme = vals.reduce((s, v) => s + v, 0);
  return {
    enonce: `<p>Calcule la moyenne des notes : ${vals.join(' ; ')}.</p>`,
    validation: 'nombre', reponse: m,
    corrige: `<p>$${frac(vals.join(' + '), 4)} = ${frac(somme, 4)} = ${m}$.</p>`,
  };
}

// --------------------------------------------------------------- Proportionnalité, fonctions
function evolution() {
  const hausse = Math.random() < 0.5;
  const p = pick([10, 20, 25, 50]), prix = p === 25 ? pick([12, 40, 80]) : pick([15, 30, 45, 60]);
  const rep = Math.round(prix * (1 + (hausse ? p : -p) / 100) * 100) / 100;
  return {
    enonce: `<p>Un objet coûte ${prix} €. Quel est son prix après une ${hausse ? 'augmentation' : 'réduction'} de $${p}\\ \\%$ ?</p>`,
    validation: 'nombre', reponse: rep, unite: '€',
    corrige: `<p>$${p}\\ \\%$ de ${prix} € font $${dec(prix * p / 100)}$ €. Nouveau prix : $${prix} ${hausse ? '+' : '-'} ${dec(prix * p / 100)} = ${dec(rep)}$ €.</p>`,
  };
}

function proportionnalite() {
  const u = pick([1.5, 2.5, 3, 4.5]), n1 = pick([2, 4]), n2 = pick([3, 5, 6, 10]);
  return {
    enonce: `<p>${n1} kg de pommes coûtent ${txt(u * n1)} €. Combien coûtent ${n2} kg de ces pommes, en euros ?</p>`,
    validation: 'nombre', reponse: u * n2, unite: '€',
    corrige: `<p>Un kilogramme coûte $${dec(u * n1)} \\div ${n1} = ${dec(u)}$ €, donc ${n2} kg coûtent $${n2} \\times ${dec(u)} = ${dec(u * n2)}$ €.</p>`,
  };
}

function fonctionAffine() {
  const a = pick([2, 3, 5, -2, -4]), b = randInt(1, 9), x = pick([-3, -2, 4, 6, 10]);
  return {
    enonce: `<p>La fonction $f$ est définie par $f(x) = ${a}x + ${b}$. Calcule l'image de $${x}$ par $f$.</p>`,
    validation: 'nombre', reponse: a * x + b,
    corrige: `<p>$f(${x}) = ${a} \\times ${x < 0 ? `(${x})` : x} + ${b} = ${a * x} + ${b} = ${a * x + b}$.</p>`,
  };
}

// --------------------------------------------------------------- Algorithmique
function programmeDeCalcul() {
  const n = pick([-3, -2, 2, 4, 5]), a = pick([2, 3, 4]), b = randInt(1, 6);
  const etape1 = a * n, etape2 = etape1 + b;
  return {
    enonce: `<p>Programme de calcul : choisir un nombre ; le multiplier par ${a} ; ajouter ${b} ; élever le résultat au carré.
      Quel résultat obtient-on en choisissant $${n}$ ?</p>`,
    validation: 'nombre', reponse: etape2 * etape2,
    corrige: `<p>$${n} \\times ${a} = ${etape1}$, puis $${etape1} + ${b} = ${etape2}$, puis $${etape2 < 0 ? `(${etape2})` : etape2}^2 = ${etape2 * etape2}$.</p>`,
  };
}

// ---------------------------------------------------------------------
//  Registre, par domaine de la liste officielle
// ---------------------------------------------------------------------
export const AUTOMATISMES = {
  nombres: [fractions, puissancesDeDix, identiteRacine, equation, reduire, developper, pourcentageSimple,
    notationScientifique, valeurExpression, ecritureDecimale, plusGrand, divisibilite],
  geometrie: [angleTriangle, conversion, aireOuVolume, pythagore, thales],
  donnees: [probabilite, mediane, moyenne, programmeDeCalcul],
  fonctions: [evolution, proportionnalite, fonctionAffine],
};

/** Répartition d'un sujet : 9 questions, comme dans les sujets de référence. */
const REPARTITION = [['nombres', 5], ['geometrie', 2], ['donnees', 1], ['fonctions', 1]];

function tirer(liste, n) {
  const m = [...liste];
  for (let i = m.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [m[i], m[j]] = [m[j], m[i]]; }
  return m.slice(0, n);
}

/** Construit la partie 1 d'un sujet : une instance au format des problèmes de brevet. */
export function genererAutomatismes() {
  const questions = REPARTITION.flatMap(([domaine, n]) => tirer(AUTOMATISMES[domaine], n)).map((g, i) => {
    const q = g();
    q.points = 1;
    q.enonce = q.enonce.replace('<p>', `<p><strong>${i + 1}.</strong> `);
    return q;
  });
  return {
    id: 'automatismes', titre: 'Automatismes et applications directes', domaine: 'Sans calculatrice',
    chapitres: [], dureeMin: 20, sansBareme: true,
    contexte: '<p>Pour chaque question, donne seulement le résultat : aucune justification n\'est demandée.</p>',
    questions, baremeTotal: questions.length,
  };
}
