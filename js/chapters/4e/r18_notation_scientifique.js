// =====================================================================
//  r18_notation_scientifique.js — 4ᵉ : puissances de 10 d'exposant
//  positif ou négatif, notation scientifique, préfixes (de nano à giga),
//  ordres de grandeur. Chapitre d'entraînement utile aussi en
//  physique-chimie et en SVT.
//  Grandeurs réelles citées (voir js/sources.js) : distance Terre-Lune,
//  distance Terre-Soleil, vitesse de la lumière, année-lumière, diamètres
//  de la Terre et du Soleil, taille d'un atome.
// =====================================================================

import { randInt, pick } from '../../engine.js';

const fr = (x) => String(x).replace('.', '{,}');
/** Écriture décimale sans notation « e » : 0.00042 → « 0,00042 », 42000 → « 42\,000 ». */
function decimal(mant, exp) {
  const chiffres = String(Math.round(mant * 10)).padStart(2, '0'); // deux chiffres significatifs
  let s;
  if (exp >= 1) s = chiffres + '0'.repeat(exp - 1);
  else if (exp === 0) s = chiffres[0] + (chiffres[1] !== '0' ? '{,}' + chiffres[1] : '');
  else s = '0{,}' + '0'.repeat(-exp - 1) + chiffres.replace(/0$/, '');
  if (exp >= 1) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  return s;
}
const sciTex = (mant, exp) => `${fr(mant)} \\times 10^{${exp}}`;
const valeur = (mant, exp) => Number(`${mant}e${exp}`);

const PREFIXES = [['giga', 'G', 9], ['méga', 'M', 6], ['kilo', 'k', 3], ['milli', 'm', -3], ['micro', 'µ', -6], ['nano', 'n', -9]];

/** Grandeurs réelles : [description, mantisse, exposant, unité]. */
const GRANDEURS = [
  ['La distance entre la Terre et la Lune est d\'environ 384 000 km', 3.84, 5, 'km'],
  ['La distance entre la Terre et le Soleil est d\'environ 150 000 000 km', 1.5, 8, 'km'],
  ['La lumière parcourt environ 300 000 km en une seconde', 3, 5, 'km'],
  ['Le diamètre du Soleil est d\'environ 1 400 000 km', 1.4, 6, 'km'],
  ['Une année-lumière vaut environ 9 460 000 000 000 km', 9.46, 12, 'km'],
  ['Un atome mesure environ 0,000 000 000 1 m', 1, -10, 'm'],
];

export default {
  id: 'r18',
  titre: 'Puissances de 10 et notation scientifique',
  theme: 'nombres_calculs', niveau: '4e',
  icone: '🔟',

  intro:
    "La distance de la Terre au Soleil, la taille d'un atome : les sciences manipulent des nombres immenses ou minuscules, pénibles à écrire avec tous leurs zéros. " +
    "Les <strong>puissances de 10</strong> et la <strong>notation scientifique</strong> permettent de les écrire en quelques caractères, de les comparer et de calculer sans se tromper de rang.",

  cours: [
    { type: 'definition', titre: 'Puissances de 10 d\'exposant positif', contenu: "Pour $n$ entier positif, $10^n$ est le produit de $n$ facteurs égaux à 10 : c'est un 1 suivi de $n$ zéros.", formule: '10^3 = 1\\,000 \\qquad 10^6 = 1\\,000\\,000' },
    { type: 'definition', titre: 'Puissances de 10 d\'exposant négatif', contenu: "$10^{-n}$ est l'inverse de $10^n$ : c'est un nombre décimal dont le chiffre 1 est au $n$-ième rang après la virgule.", formule: '10^{-n} = \\dfrac{1}{10^n} \\qquad 10^{-3} = 0{,}001' },
    { type: 'propriete', titre: 'Calculer avec les puissances de 10', contenu: "Pour multiplier, on additionne les exposants ; pour diviser, on les soustrait.", formule: '10^m \\times 10^p = 10^{m+p} \\qquad \\dfrac{10^m}{10^p} = 10^{m-p}' },
    { type: 'propriete', titre: 'Multiplier un nombre par une puissance de 10', contenu: "Multiplier par $10^n$ déplace la virgule de $n$ rangs vers la droite ; multiplier par $10^{-n}$ la déplace de $n$ rangs vers la gauche.", formule: '3{,}2 \\times 10^4 = 32\\,000 \\qquad 3{,}2 \\times 10^{-4} = 0{,}000\\,32' },
    { type: 'definition', titre: 'La notation scientifique', contenu: "Tout nombre décimal positif s'écrit d'une seule façon sous la forme $a \\times 10^n$, où $a$ a <strong>un seul chiffre non nul avant la virgule</strong> ($1 \\leq a < 10$) et $n$ est un entier relatif. Un grand nombre a un exposant positif, un petit nombre (entre 0 et 1) un exposant négatif.", formule: '45\\,000 = 4{,}5 \\times 10^{4} \\qquad 0{,}007 = 7 \\times 10^{-3}' },
    { type: 'propriete', titre: 'Les préfixes des unités', contenu: "Les préfixes des unités sont des puissances de 10 : giga (G) $10^9$, méga (M) $10^6$, kilo (k) $10^3$, milli (m) $10^{-3}$, micro (µ) $10^{-6}$, nano (n) $10^{-9}$. Ainsi 1 km $= 10^3$ m et 1 mm $= 10^{-3}$ m.", formule: '1 \\text{ nm} = 10^{-9} \\text{ m} \\qquad 1 \\text{ GW} = 10^{9} \\text{ W}' },
    { type: 'exemple', enonce: 'Écris $0{,}000\\,56$ en notation scientifique.', solution_etapes: ['On place la virgule après le premier chiffre non nul : $5{,}6$.', 'La virgule a été déplacée de 4 rangs vers la droite : l\'exposant est $-4$.', '$0{,}000\\,56 = 5{,}6 \\times 10^{-4}$.'] },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le premier chiffre non nul', explication: "C'est lui qui restera seul avant la virgule." },
    { etape: 2, titre: 'Écrire le nombre a', explication: 'Place la virgule juste après ce chiffre : $1 \\leq a < 10$.' },
    { etape: 3, titre: 'Compter les rangs', explication: 'De combien de rangs la virgule a-t-elle bougé ? C\'est la valeur de l\'exposant.' },
    { etape: 4, titre: 'Choisir le signe', explication: 'Grand nombre : exposant positif. Nombre plus petit que 1 : exposant négatif.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Écriture décimale d\'une puissance de 10 :',
      generer() {
        const n = pick([-4, -3, -2, -1, 2, 3, 4, 5]);
        const ecr = (k) => (k >= 0 ? decimal(1, k) : decimal(1, k));
        const autres = [n + 1, n - 1, -n].filter((k) => k !== n && k !== 0);
        const choix = [...new Set([ecr(n), ...autres.map(ecr)])].map((s) => `$${s}$`);
        return { enonce: `Quelle est l'écriture décimale de $10^{${n}}$ ?`, choix, correct: 0, _v: { n } };
      },
      indices: ['Exposant positif : un 1 suivi de zéros.', 'Exposant négatif : un nombre plus petit que 1.', "$10^{-n}$ : le 1 est au n-ième rang après la virgule."],
      correction_etapes: (st) => [st._v.n > 0 ? `$10^{${st._v.n}}$ est un 1 suivi de ${st._v.n} zéros : $${decimal(1, st._v.n)}$.` : `$10^{${st._v.n}}$ : le 1 est au rang ${-st._v.n} après la virgule : $${decimal(1, st._v.n)}$.`],
    },
    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Calcule l\'exposant :',
      generer() {
        const m = randInt(-6, 8), p = randInt(-5, 6), quotient = pick([true, false]);
        return quotient
          ? { enonce: `$\\dfrac{10^{${m}}}{10^{${p}}} = 10^{n}$. Que vaut $n$ ?`, reponse: m - p, validation: 'nombre', _v: { m, p, quotient } }
          : { enonce: `$10^{${m}} \\times 10^{${p}} = 10^{n}$. Que vaut $n$ ?`, reponse: m + p, validation: 'nombre', _v: { m, p, quotient } };
      },
      indices: ['Produit : on additionne les exposants.', 'Quotient : on soustrait les exposants.', 'Attention aux signes : soustraire un négatif, c\'est ajouter.'],
      correction_etapes: (st) => (st._v.quotient
        ? [`Quotient : on soustrait les exposants. $${st._v.m} - (${st._v.p}) = ${st._v.m - st._v.p}$.`, `$n = ${st._v.m - st._v.p}$.`]
        : [`Produit : on additionne les exposants. $${st._v.m} + (${st._v.p}) = ${st._v.m + st._v.p}$.`, `$n = ${st._v.m + st._v.p}$.`]),
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Est-ce une notation scientifique ?',
      generer() {
        const [ecriture, ok, pourquoi] = pick([
          ['3{,}2 \\times 10^{5}', true, 'un seul chiffre non nul avant la virgule'],
          ['7 \\times 10^{-4}', true, 'un seul chiffre non nul avant la virgule'],
          ['32 \\times 10^{4}', false, '32 a deux chiffres avant la virgule : il faudrait $3{,}2 \\times 10^{5}$'],
          ['0{,}45 \\times 10^{3}', false, '0,45 est plus petit que 1 : il faudrait $4{,}5 \\times 10^{2}$'],
          ['9{,}99 \\times 10^{-2}', true, 'un seul chiffre non nul avant la virgule'],
          ['12{,}5 \\times 10^{-6}', false, '12,5 a deux chiffres avant la virgule : il faudrait $1{,}25 \\times 10^{-5}$'],
        ]);
        return { enonce: `$${ecriture}$ est-elle une notation scientifique ?`, choix: ['oui', 'non'], correct: ok ? 0 : 1, ordre_fixe: true, _v: { ok, pourquoi } };
      },
      indices: ['La forme est $a \\times 10^n$.', 'Il faut $1 \\leq a < 10$.', 'Un seul chiffre, non nul, avant la virgule.'],
      correction_etapes: (st) => [`<strong>${st._v.ok ? 'Oui' : 'Non'}</strong> : ${st._v.pourquoi}.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Écris en notation scientifique (ex. 3.2*10^4) :',
      generer() {
        const mant = randInt(11, 99) / 10, exp = randInt(2, 7);
        return { enonce: `Écris $${decimal(mant, exp)}$ en notation scientifique.`, reponse: valeur(mant, exp), validation: 'notation_scientifique', _v: { mant, exp } };
      },
      indices: ['Place la virgule après le premier chiffre.', 'Compte de combien de rangs elle a bougé.', 'Grand nombre : exposant positif.'],
      correction_etapes: (st) => [`On place la virgule après le premier chiffre : $${fr(st._v.mant)}$.`, `Elle a bougé de ${st._v.exp} rangs : $${decimal(st._v.mant, st._v.exp)} = ${sciTex(st._v.mant, st._v.exp)}$.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Écris ce petit nombre en notation scientifique (ex. 4.2*10^-3) :',
      generer() {
        const mant = randInt(11, 99) / 10, exp = -randInt(1, 6);
        return { enonce: `Écris $${decimal(mant, exp)}$ en notation scientifique.`, reponse: valeur(mant, exp), validation: 'notation_scientifique', _v: { mant, exp } };
      },
      indices: ['Place la virgule après le premier chiffre non nul.', 'Compte de combien de rangs elle a bougé.', 'Nombre plus petit que 1 : exposant négatif.'],
      correction_etapes: (st) => [`Premier chiffre non nul, puis la virgule : $${fr(st._v.mant)}$.`, `La virgule a bougé de ${-st._v.exp} rangs vers la droite : $${decimal(st._v.mant, st._v.exp)} = ${sciTex(st._v.mant, st._v.exp)}$.`],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'Retrouve l\'écriture décimale :',
      generer() {
        const mant = randInt(11, 99) / 10, exp = pick([-4, -3, -2, 2, 3, 4, 5]);
        const choix = [...new Set([exp, exp + 1, exp - 1, -exp].filter((k) => k !== 0).map((k) => `$${decimal(mant, k)}$`))];
        return { enonce: `Quelle est l'écriture décimale de $${sciTex(mant, exp)}$ ?`, choix, correct: 0, _v: { mant, exp } };
      },
      indices: ['Exposant positif : la virgule va vers la droite.', 'Exposant négatif : la virgule va vers la gauche.', 'Le nombre de rangs est la valeur de l\'exposant.'],
      correction_etapes: (st) => [`La virgule se déplace de ${Math.abs(st._v.exp)} rangs vers la ${st._v.exp > 0 ? 'droite' : 'gauche'}.`, `$${sciTex(st._v.mant, st._v.exp)} = ${decimal(st._v.mant, st._v.exp)}$.`],
    },
    {
      id: 'e07', niveau: 2, type: 'qcm', consigne: 'Les préfixes :',
      generer() {
        const [nom, sym, n] = pick(PREFIXES);
        const autres = PREFIXES.filter((p) => p[2] !== n).sort(() => Math.random() - 0.5).slice(0, 3).map((p) => p[2]);
        return { enonce: `Le préfixe « ${nom} » (symbole ${sym}) correspond à :`, choix: [n, ...autres].map((k) => `$10^{${k}}$`), correct: 0, _v: { nom, n } };
      },
      indices: ['kilo : mille ; milli : un millième.', 'méga : un million ; micro : un millionième.', 'giga : un milliard ; nano : un milliardième.'],
      correction_etapes: (st) => [`« ${st._v.nom} » correspond à $10^{${st._v.n}}$.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'En sciences (réponds en notation scientifique, ex. 1.5*10^8) :',
      generer() {
        const [texte, mant, exp, unite] = pick(GRANDEURS);
        return { enonce: `${texte}. Écris ce nombre de ${unite === 'km' ? 'kilomètres' : 'mètres'} en notation scientifique.`, reponse: valeur(mant, exp), validation: 'notation_scientifique', _v: { mant, exp, unite } };
      },
      indices: ['Repère le premier chiffre non nul.', 'Compte les rangs entre l\'ancienne et la nouvelle place de la virgule.', 'Très grand : exposant positif. Très petit : exposant négatif.'],
      correction_etapes: (st) => [`On obtient $${sciTex(st._v.mant, st._v.exp)}$ ${st._v.unite}.`],
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Calcule et donne le résultat en notation scientifique :',
      generer() {
        const a = pick([2, 3, 4]), b = pick([2, 3]), p = randInt(-5, 6), q = randInt(-4, 5);
        const prod = a * b, mant = prod >= 10 ? prod / 10 : prod, exp = p + q + (prod >= 10 ? 1 : 0);
        return { enonce: `$(${a} \\times 10^{${p}}) \\times (${b} \\times 10^{${q}})$`, reponse: valeur(mant, exp), validation: 'notation_scientifique', _v: { a, b, p, q, prod, mant, exp } };
      },
      indices: ['Multiplie les nombres entre eux, et les puissances de 10 entre elles.', '$10^p \\times 10^q = 10^{p+q}$.', 'Si le nombre obtenu atteint 10, ajuste : $12 \\times 10^n = 1{,}2 \\times 10^{n+1}$.'],
      correction_etapes: (st) => {
        const { a, b, p, q, prod, mant, exp } = st._v;
        const etapes = [`$${a} \\times ${b} = ${prod}$ et $10^{${p}} \\times 10^{${q}} = 10^{${p + q}}$.`];
        etapes.push(prod >= 10 ? `$${prod} \\times 10^{${p + q}} = ${fr(mant)} \\times 10^{${exp}}$ (il faut un seul chiffre avant la virgule).` : `Résultat : $${prod} \\times 10^{${p + q}}$.`);
        return etapes;
      },
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: '$10^{-3}$ est égal à :', choix: ['$0{,}001$', '$-1\\,000$', '$0{,}003$', '$-30$'], correct: 0, explication: "C'est l'inverse de $10^3$ : un millième." },
    { type: 'qcm', question: 'La notation scientifique de $52\\,000$ est :', choix: ['$5{,}2 \\times 10^{4}$', '$52 \\times 10^{3}$', '$0{,}52 \\times 10^{5}$', '$5{,}2 \\times 10^{-4}$'], correct: 0, explication: 'Un seul chiffre non nul avant la virgule, et la virgule a bougé de 4 rangs.' },
    {
      type: 'saisie', question: 'Exposant.',
      generer() { const m = randInt(2, 6), p = randInt(-4, -1); return { question: `$10^{${m}} \\times 10^{${p}} = 10^{n}$. Que vaut $n$ ?`, reponse: m + p, validation: 'nombre', explication: `$${m} + (${p}) = ${m + p}$.` }; },
    },
    { type: 'vrai_faux', question: '$0{,}3 \\times 10^{5}$ est une notation scientifique.', reponse: false, explication: '$0{,}3$ est plus petit que 1 : on écrit $3 \\times 10^{4}$.' },
    { type: 'qcm', question: 'Le préfixe « méga » correspond à :', choix: ['$10^{6}$', '$10^{3}$', '$10^{9}$', '$10^{-6}$'], correct: 0, explication: 'Un mégawatt vaut un million de watts.' },
    {
      type: 'saisie', question: 'Petit nombre.',
      generer() { const mant = randInt(2, 9), exp = -randInt(2, 5); return { question: `Écris $${decimal(mant, exp)}$ en notation scientifique (ex. 4*10^-3).`, reponse: valeur(mant, exp), validation: 'notation_scientifique', explication: `$${decimal(mant, exp)} = ${mant} \\times 10^{${exp}}$.` }; },
    },
  ],
};
