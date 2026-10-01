// =====================================================================
//  pr04_equations.js — Physique-chimie 4ᵉ : atomes et équations de
//  réaction. Symboles des atomes, réarrangement des atomes, écrire et
//  ajuster une équation de réaction (conservation des atomes).
// =====================================================================

import { pick, melanger } from '../outils.js';
import { ajusteur, REACTIONS, equationHTML, bilanAtomes, composition, formuleHTML, formuleTex, NOMS_ELEMENTS } from '../figures_chimie.js';
import { tableau } from '../../commun.js';

const SYMBOLES = [['hydrogène', 'H'], ['carbone', 'C'], ['azote', 'N'], ['oxygène', 'O'], ['sodium', 'Na'], ['chlore', 'Cl'], ['cuivre', 'Cu'], ['fer', 'Fe'], ['soufre', 'S'], ['zinc', 'Zn'], ['aluminium', 'Al'], ['calcium', 'Ca']];
const de = (nom) => (/^[aeiouyh]/.test(nom) ? "d'" : 'de ') + nom;

/** Réactions dont un coefficient au moins vaut plus de 1 (pour les exercices d'ajustement). */
const A_AJUSTER = REACTIONS.filter((R) => [...R.r, ...R.p].some(([, n]) => n > 1));
const coefsDe = (R) => [...R.r, ...R.p].map(([, n]) => n);

/** Équation dont certains coefficients sont remplacés par des cases {0}, {1}… */
function equationATrous(R, trous) {
  const tous = [...R.r, ...R.p];
  let k = 0;
  const morceau = ([f, n], i) => `${trous.includes(i) ? `{${k++}} ` : n > 1 ? n + ' ' : ''}${formuleHTML(f)}`;
  return `${tous.slice(0, R.r.length).map(morceau).join(' + ')} → ${tous.slice(R.r.length).map((x, j) => morceau(x, j + R.r.length)).join(' + ')}`;
}

export default {
  id: 'pr04',
  titre: 'Atomes et équations de réaction',
  theme: 'pc_matiere', niveau: '4e',
  icone: '🧮',

  intro:
    "Lors d'une transformation chimique, la matière ne disparaît pas : les atomes des réactifs se séparent puis se réassemblent autrement. " +
    "L'<strong>équation de réaction</strong> raconte ce réarrangement en une ligne. Ce chapitre apprend à l'écrire et à l'<strong>ajuster</strong>, comme on équilibre une balance.",

  cours: [
    {
      type: 'definition', titre: 'Les atomes et leurs symboles',
      contenu: "Il existe une centaine de sortes d'atomes (les <strong>éléments</strong>). Chacun a un <strong>symbole</strong> : une majuscule, parfois suivie d'une minuscule." + tableau([['Élément', ...SYMBOLES.slice(0, 6).map((s) => s[0])], ['Symbole', ...SYMBOLES.slice(0, 6).map((s) => s[1])]]) + tableau([['Élément', ...SYMBOLES.slice(6).map((s) => s[0])], ['Symbole', ...SYMBOLES.slice(6).map((s) => s[1])]]),
    },
    {
      type: 'propriete', titre: 'Les atomes se réarrangent',
      contenu: "Au cours d'une transformation chimique, les molécules des réactifs sont « cassées » et leurs atomes se <strong>réarrangent</strong> pour former les molécules des produits. Les atomes sont <strong>conservés</strong> : même nature, même nombre avant et après. C'est ce qui explique la conservation de la masse.",
    },
    {
      type: 'definition', titre: "L'équation de réaction",
      contenu: "On écrit les <strong>formules</strong> des réactifs à gauche d'une flèche, celles des produits à droite. Puis on l'<strong>ajuste</strong> : on place devant les formules des nombres (les <strong>coefficients</strong>) pour qu'il y ait le même nombre d'atomes de chaque sorte des deux côtés. Le coefficient 1 ne s'écrit pas. On ne touche <strong>jamais</strong> aux petits chiffres des formules : ce serait changer de molécule.",
      formule: '\\mathrm{CH_4} + 2\\,\\mathrm{O_2} \\longrightarrow \\mathrm{CO_2} + 2\\,\\mathrm{H_2O}',
    },
    { type: 'figure', titre: 'Ajuster une équation', contenu: 'Choisis une réaction, puis change les nombres devant les formules jusqu\'à équilibrer les atomes.', render: (host) => ajusteur(host) },
    {
      type: 'exemple', enonce: "Ajuster l'équation de formation de l'eau : H₂ + O₂ → H₂O.",
      solution_etapes: ["Oxygène : 2 atomes à gauche, 1 à droite. On met un 2 devant H₂O : H₂ + O₂ → 2 H₂O.", 'Hydrogène : maintenant 2 à gauche et 4 à droite. On met un 2 devant H₂ : <strong>2 H₂ + O₂ → 2 H₂O</strong>. Tout est équilibré.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Écrire les formules', explication: 'Réactifs → produits, sans modifier les formules.' },
    { etape: 2, titre: 'Compter les atomes', explication: 'Pour chaque élément : combien à gauche, combien à droite ?' },
    { etape: 3, titre: 'Ajouter des coefficients', explication: 'Un coefficient multiplie tous les atomes de la formule. Ajuste un élément à la fois.' },
    { etape: 4, titre: 'Vérifier', explication: 'Recompte tout : chaque élément doit être en même nombre des deux côtés.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Symbole chimique :',
      generer() {
        const [nom, sym] = pick(SYMBOLES), autres = melanger(SYMBOLES.filter((s) => s[1] !== sym)).slice(0, 3).map((s) => s[1]);
        return { enonce: `Quel est le symbole de l'atome ${de(nom)} ?`, choix: [sym, ...autres].map(formuleTex), correct: 0, _v: { nom, sym } };
      },
      indices: ['Un symbole commence par une majuscule.', 'Il vient souvent du nom (parfois latin).', 'Cu : cuprum (cuivre), Fe : ferrum (fer), Na : natrium (sodium).'],
      correction_etapes: (st) => [`Le symbole de l'atome ${de(st._v.nom)} est <strong>${st._v.sym}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Compte les atomes :',
      generer() {
        const f = pick(['H2O', 'CO2', 'O2', 'CH4', 'H2', 'CuO']), n = pick([2, 3, 4]), els = Object.keys(composition(f)), el = pick(els);
        return { enonce: `Combien d'atomes ${de(NOMS_ELEMENTS[el])} (${el}) y a-t-il dans « ${n} ${formuleHTML(f)} » ?`, reponse: n * composition(f)[el], validation: 'nombre', _v: { f, n, el } };
      },
      indices: ["Le petit chiffre (indice) compte les atomes dans UNE molécule.", 'Le grand nombre devant compte les molécules.', 'Multiplie les deux.'],
      correction_etapes: (st) => [`Une molécule ${formuleHTML(st._v.f)} contient ${composition(st._v.f)[st._v.el]} atome(s) ${st._v.el}.`, `$${st._v.n} \\times ${composition(st._v.f)[st._v.el]} = ${st._v.n * composition(st._v.f)[st._v.el]}$ atomes ${st._v.el}.`],
    },
    {
      id: 'e03', niveau: 2, type: 'complete', consigne: "Complète l'ajustement :",
      generer() {
        const R = pick(A_AJUSTER), c = coefsDe(R), i = pick(c.map((n, k) => (n > 1 ? k : -1)).filter((k) => k >= 0));
        return { enonce_complete: equationATrous(R, [i]), champs: [{ reponse: c[i], validation: 'nombre' }], _v: { R, i } };
      },
      indices: ['Compte les atomes de chaque élément à gauche et à droite.', 'Repère l\'élément qui n\'est pas équilibré.', 'Le nombre manquant multiplie tous les atomes de sa formule.'],
      correction_etapes: (st) => [`Équation ajustée : ${equationHTML(st._v.R)}.`, `Bilan : ${bilanAtomes(st._v.R, coefsDe(st._v.R)).map(([el, a]) => `${a} ${el}`).join(', ')} de chaque côté.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Est-elle ajustée ?',
      generer() {
        const R = pick(REACTIONS), c = coefsDe(R), juste = pick([true, false]);
        const coefs = [...c];
        if (!juste) { const k = pick(coefs.map((_, i) => i)); coefs[k] = coefs[k] > 1 ? 1 : 2; }
        const bil = bilanAtomes(R, coefs), ok = bil.every(([, a, b]) => a === b);
        return { enonce: `L'équation « ${equationHTML(R, coefs)} » est-elle correctement ajustée ?`, choix: ['oui', 'non'], correct: ok ? 0 : 1, ordre_fixe: true, _v: { R, coefs, bil, ok } };
      },
      indices: ['Compte chaque sorte d\'atome à gauche.', 'Compte-les à droite.', 'Il faut l\'égalité pour TOUS les éléments.'],
      correction_etapes: (st) => [st._v.bil.map(([el, a, b]) => `${el} : ${a} à gauche, ${b} à droite`).join(' ; ') + '.', st._v.ok ? "Tout est équilibré : l'équation est <strong>ajustée</strong>." : `Elle n'est <strong>pas ajustée</strong>. Équation correcte : ${equationHTML(st._v.R)}.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Lire une équation :',
      generer() {
        const R = pick(REACTIONS), cote = pick(['réactifs', 'produits']);
        const liste = (L) => L.map(([f]) => formuleTex(f)).join(' et ');
        const bonne = liste(cote === 'réactifs' ? R.r : R.p), mauvaise = liste(cote === 'réactifs' ? R.p : R.r);
        return { enonce: `Quels sont les ${cote} de la réaction « ${equationHTML(R)} » ?`, choix: [bonne, mauvaise], correct: 0, _v: { R, cote, bonne } };
      },
      indices: ['Les réactifs sont à gauche de la flèche.', 'Les produits sont à droite.', 'Ne tiens pas compte des coefficients.'],
      correction_etapes: (st) => [`Les ${st._v.cote} sont écrits ${st._v.cote === 'réactifs' ? 'à gauche' : 'à droite'} de la flèche : <strong>${st._v.bonne}</strong>.`],
    },
    {
      id: 'e06', niveau: 3, type: 'complete', consigne: 'Ajuste entièrement :',
      generer() {
        const R = pick(A_AJUSTER.filter((x) => coefsDe(x).filter((n) => n > 1).length >= 2)), c = coefsDe(R);
        const trous = c.map((n, k) => (n > 1 ? k : -1)).filter((k) => k >= 0);
        return { enonce_complete: equationATrous(R, trous), champs: trous.map((k) => ({ reponse: c[k], validation: 'nombre' })), _v: { R } };
      },
      indices: ['Commence par l\'élément qui apparaît dans le moins de formules.', 'Mets un coefficient, puis recompte tout.', 'Garde les plus petits nombres entiers possibles.'],
      correction_etapes: (st) => [`<strong>${equationHTML(st._v.R)}</strong>`, `Vérification : ${bilanAtomes(st._v.R, coefsDe(st._v.R)).map(([el, a, b]) => `${el} : ${a} = ${b}`).join(' ; ')}.`],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Une erreur fréquente :',
      generer() {
        return { enonce: "Pour ajuster H₂ + O₂ → H₂O, un élève écrit H₂ + O₂ → H₂O₂. Pourquoi est-ce faux ?", choix: ["il a changé la formule du produit : H₂O₂ n'est plus de l'eau", "il manque un atome d'azote", "on ne peut jamais ajuster cette équation", 'il fallait écrire H₄O'], correct: 0, _v: {} };
      },
      indices: ['Les indices font partie de la formule.', 'H₂O₂ est une autre molécule (l\'eau oxygénée).', 'On ajuste avec des coefficients devant les formules.'],
      correction_etapes: () => ["Modifier un indice change la molécule : H₂O₂ est l'eau oxygénée, pas l'eau.", 'La bonne méthode : ajouter des coefficients, <strong>2 H₂ + O₂ → 2 H₂O</strong>.'],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Recompter :',
      generer() {
        const R = pick(REACTIONS), bil = bilanAtomes(R, coefsDe(R)), [el, a] = pick(bil), cote = pick(['réactifs', 'produits']);
        return { enonce: `Dans l'équation ajustée « ${equationHTML(R)} », combien y a-t-il d'atomes ${el} du côté des ${cote} ?`, reponse: a, validation: 'nombre', _v: { R, el, a, cote } };
      },
      indices: ['Pour chaque formule, multiplie le coefficient par l\'indice de l\'élément.', 'Additionne sur toutes les formules de ce côté.', 'Dans une équation ajustée, tu dois trouver le même nombre de l\'autre côté.'],
      correction_etapes: (st) => { const L = st._v.cote === 'réactifs' ? st._v.R.r : st._v.R.p; return [L.filter(([f]) => composition(f)[st._v.el]).map(([f, n]) => `${n} × ${composition(f)[st._v.el]} (dans ${formuleHTML(f)})`).join(' + ') + '.', `Total : <strong>${st._v.a}</strong> atomes ${st._v.el}.`]; },
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Au cours d\'une réaction chimique, les atomes se conservent.', reponse: true, _v: { e: 'Oui : même nature et même nombre avant et après.' } },
          { enonce: 'Pour ajuster une équation, on peut modifier les indices des formules.', reponse: false, _v: { e: 'Non : on ajoute seulement des coefficients devant les formules.' } },
          { enonce: 'Le symbole du fer est F.', reponse: false, _v: { e: 'Non : Fe (du latin ferrum). F est le fluor.' } },
          { enonce: 'Dans « 3 O₂ », il y a 6 atomes d\'oxygène.', reponse: true, _v: { e: 'Oui : 3 molécules de 2 atomes.' } },
          { enonce: "Le coefficient 1 s'écrit devant les formules.", reponse: false, _v: { e: 'Non : on ne l\'écrit pas.' } },
        ]);
      },
      indices: ['Coefficient × indice.', 'On ne change jamais une formule.', 'Fe, Cu, Na… viennent du latin.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Au cours d\'une transformation chimique, les atomes :', choix: ['se réarrangent', 'disparaissent', 'se multiplient', 'changent de nature'], correct: 0, explication: 'Ils sont conservés.' },
    { type: 'qcm', question: "L'équation ajustée de la combustion du carbone est :", choix: ['C + O₂ → CO₂', '2 C + O₂ → CO₂', 'C + 2 O₂ → CO₂', 'C + O → CO₂'], correct: 0, explication: '1 C et 2 O de chaque côté.' },
    {
      type: 'saisie', question: 'Coefficient.',
      generer() { const R = pick(A_AJUSTER), c = coefsDe(R), i = c.findIndex((n) => n > 1); return { question: `Quel nombre faut-il placer devant ${formuleHTML([...R.r, ...R.p][i][0])} pour ajuster l'équation de la réaction « ${R.nom.toLowerCase()} » ? (${equationHTML(R).replace(new RegExp(`${c[i]} ${formuleHTML([...R.r, ...R.p][i][0])}`), `? ${formuleHTML([...R.r, ...R.p][i][0])}`)})`, reponse: c[i], validation: 'nombre', explication: `Équation ajustée : ${equationHTML(R)}.` }; },
    },
    { type: 'vrai_faux', question: 'Dans « 2 H₂O », il y a 4 atomes d\'hydrogène.', reponse: true, explication: '2 × 2 = 4.' },
    { type: 'qcm', question: 'Le symbole du cuivre est :', choix: ['Cu', 'C', 'Cr', 'Co'].map(formuleTex), correct: 0, explication: 'Du latin cuprum.' },
  ],
};
