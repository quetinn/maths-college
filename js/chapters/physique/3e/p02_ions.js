// =====================================================================
//  p02_ions.js — Physique-chimie 3ᵉ : les ions dans notre quotidien.
//  Formation des ions, charge, solutions ioniques (neutralité),
//  tests d'identification (soude, nitrate d'argent).
// =====================================================================

import { randInt, pick, melanger } from '../outils.js';
import { atome, laboIons, de } from '../figures.js';
import { tableau } from '../../commun.js';

/** Ions courants : [formule, nom, Z, charge]. */
const IONS = [
  ['Na⁺', 'sodium', 11, 1], ['K⁺', 'potassium', 19, 1], ['Li⁺', 'lithium', 3, 1], ['Mg²⁺', 'magnésium', 12, 2],
  ['Ca²⁺', 'calcium', 20, 2], ['Al³⁺', 'aluminium', 13, 3], ['Cu²⁺', 'cuivre', 29, 2], ['Fe²⁺', 'fer II', 26, 2],
  ['Fe³⁺', 'fer III', 26, 3], ['Zn²⁺', 'zinc', 30, 2], ['Cl⁻', 'chlorure', 17, -1], ['F⁻', 'fluorure', 9, -1], ['O²⁻', 'oxyde', 8, -2],
];
const EXPOSANT = { 1: '⁺', 2: '²⁺', 3: '³⁺', '-1': '⁻', '-2': '²⁻', '-3': '³⁻' };

/** Solutions ioniques : nom, formule (ions et proportions), nombre d'anions par cation. */
const SOLUTIONS_IONIQUES = [
  ['chlorure de sodium', '(Na⁺ + Cl⁻)', 'Na⁺', 'Cl⁻', 1], ['sulfate de cuivre', '(Cu²⁺ + SO₄²⁻)', 'Cu²⁺', 'SO₄²⁻', 1],
  ['chlorure de fer III', '(Fe³⁺ + 3 Cl⁻)', 'Fe³⁺', 'Cl⁻', 3], ['chlorure de cuivre', '(Cu²⁺ + 2 Cl⁻)', 'Cu²⁺', 'Cl⁻', 2],
  ['sulfate de fer II', '(Fe²⁺ + SO₄²⁻)', 'Fe²⁺', 'SO₄²⁻', 1], ['chlorure de zinc', '(Zn²⁺ + 2 Cl⁻)', 'Zn²⁺', 'Cl⁻', 2],
  ['chlorure de calcium', '(Ca²⁺ + 2 Cl⁻)', 'Ca²⁺', 'Cl⁻', 2],
];

const TESTS = [
  ['cuivre Cu²⁺', 'la soude', 'un précipité bleu'], ['fer II Fe²⁺', 'la soude', 'un précipité vert'],
  ['fer III Fe³⁺', 'la soude', 'un précipité rouille (orange-brun)'], ['zinc Zn²⁺', 'la soude', 'un précipité blanc'],
  ['chlorure Cl⁻', "le nitrate d'argent", 'un précipité blanc qui noircit à la lumière'],
];

export default {
  id: 'p02',
  titre: 'Les ions dans notre quotidien',
  theme: 'pc_matiere', niveau: '3e',
  icone: '🧪',

  intro:
    "L'étiquette d'une eau minérale liste du calcium Ca²⁺, du magnésium Mg²⁺, des chlorures Cl⁻… Ce sont des <strong>ions</strong> : des atomes qui ont perdu ou gagné des électrons. " +
    "On les retrouve dans l'eau, dans notre corps, dans les piles. On apprend à les écrire, à comprendre leur charge et à les <strong>reconnaître grâce à des tests chimiques</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Un ion',
      contenu: "Un <strong>ion</strong> est un atome (ou un groupe d'atomes) qui a <strong>perdu ou gagné un ou plusieurs électrons</strong>. Le noyau, lui, ne change pas. " +
        "Un atome qui perd des électrons devient un <strong>ion positif</strong> (Na⁺, Cu²⁺). Un atome qui gagne des électrons devient un <strong>ion négatif</strong> (Cl⁻). " +
        "Certains ions sont formés de plusieurs atomes : l'ion sulfate SO₄²⁻, l'ion hydroxyde HO⁻.",
    },
    { type: 'figure', titre: "Fabrique un ion", contenu: "Arrache ou ajoute des électrons à l'atome : le nombre de protons ne change pas, la charge apparaît.", render: (host) => atome(host, { Z: 11, ions: true, choix: true }) },
    {
      type: 'propriete', titre: "La charge d'un ion",
      contenu: "La charge s'écrit en haut à droite du symbole : le nombre de charges, puis le signe. Cu²⁺ a perdu 2 électrons ; Cl⁻ en a gagné 1.",
      formule: '\\text{charge} = \\text{nombre de protons} - \\text{nombre d\'électrons}',
    },
    {
      type: 'definition', titre: 'Solution ionique',
      contenu: "Une <strong>solution ionique</strong> contient des ions positifs et des ions négatifs dispersés dans l'eau. Elle est <strong>électriquement neutre</strong> : les charges + et − se compensent. " +
        "On l'écrit entre parenthèses : la solution de sulfate de cuivre est (Cu²⁺ + SO₄²⁻), celle de chlorure de fer III est (Fe³⁺ + 3 Cl⁻) — trois ions chlorure pour compenser les trois charges + de chaque ion fer III. Les solutions ioniques conduisent le courant électrique.",
    },
    {
      type: 'propriete', titre: "Reconnaître les ions : les tests",
      contenu: "On verse quelques gouttes d'un réactif dans un peu de solution. Un <strong>précipité</strong> (solide qui apparaît) de couleur caractéristique révèle un ion :" +
        tableau([['Ion recherché', 'Réactif', 'Observation'], ...TESTS.map(([i, r, o]) => [i, r, o])]),
    },
    { type: 'figure', titre: 'Paillasse virtuelle', contenu: "Choisis une solution et un réactif, puis verse quelques gouttes.", render: (host) => laboIons(host) },
    {
      type: 'exemple', enonce: "Dans une solution inconnue, la soude donne un précipité rouille et le nitrate d'argent un précipité blanc qui noircit. Quelle est cette solution ?",
      solution_etapes: ['Précipité rouille avec la soude : la solution contient des ions fer III Fe³⁺.', "Précipité blanc qui noircit avec le nitrate d'argent : elle contient des ions chlorure Cl⁻.", "C'est une solution de chlorure de fer III (Fe³⁺ + 3 Cl⁻)."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Prélever', explication: "Verse un peu de la solution à tester dans un tube à essai propre (un tube par test)." },
    { etape: 2, titre: 'Ajouter le réactif', explication: "Quelques gouttes de soude (pour les ions métalliques) ou de nitrate d'argent (pour les ions chlorure). Lunettes et gants !" },
    { etape: 3, titre: 'Observer', explication: "Un précipité apparaît-il ? De quelle couleur ?" },
    { etape: 4, titre: 'Conclure', explication: "Utilise le tableau des tests. Pas de précipité : l'ion recherché est absent." },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: "Nombre d'électrons d'un ion :",
      generer() {
        const [f, nom, Z, c] = pick(IONS);
        return { enonce: `L'ion ${nom} a pour formule ${f}. Le numéro atomique de l'élément est $Z = ${Z}$. Combien d'électrons possède cet ion ?`, reponse: Z - c, validation: 'nombre', pieges: [{ valeur: Z + c, message: c > 0 ? "Un ion positif a PERDU des électrons : il en a moins que de protons." : "Un ion négatif a GAGNÉ des électrons : il en a plus que de protons." }], _v: { f, Z, c } };
      },
      indices: ['$Z$ = nombre de protons.', 'Charge positive : électrons perdus. Charge négative : électrons gagnés.', 'Électrons = protons − charge.'],
      correction_etapes: (st) => [`L'atome neutre aurait ${st._v.Z} électrons.`, st._v.c > 0 ? `L'ion ${st._v.f} en a perdu ${st._v.c} : ${st._v.Z} − ${st._v.c} = <strong>${st._v.Z - st._v.c} électrons</strong>.` : `L'ion ${st._v.f} en a gagné ${-st._v.c} : ${st._v.Z} + ${-st._v.c} = <strong>${st._v.Z - st._v.c} électrons</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: "Écris la formule de l'ion :",
      generer() {
        const [f, nom, , c] = pick(IONS.filter((i) => i[0] !== 'Fe²⁺' && i[0] !== 'Fe³⁺'));
        const sym = f.replace(/[⁺⁻²³]/g, '');
        const verbe = c > 0 ? `a perdu ${c} électron${c > 1 ? 's' : ''}` : `a gagné ${-c} électron${c < -1 ? 's' : ''}`;
        const choix = [...new Set([f, sym + EXPOSANT[-c], sym + EXPOSANT[c > 0 ? Math.min(3, c + 1) : Math.max(-3, c - 1)], sym])];
        return { enonce: `Un atome ${de(nom === 'chlorure' ? 'chlore' : nom === 'fluorure' ? 'fluor' : nom === 'oxyde' ? 'oxygène' : nom)} (symbole ${sym}) ${verbe}. Quelle est la formule de l'ion obtenu ?`, choix, correct: 0, _v: { f, c } };
      },
      indices: ['Perte d\'électrons → charge positive.', 'Gain d\'électrons → charge négative.', 'Le nombre de charges égale le nombre d\'électrons échangés.'],
      correction_etapes: (st) => [st._v.c > 0 ? `Perdre ${st._v.c} électron(s) (charges −) laisse ${st._v.c} charge(s) + en excès.` : `Gagner ${-st._v.c} électron(s) apporte ${-st._v.c} charge(s) − en excès.`, `L'ion s'écrit <strong>${st._v.f}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'qcm', consigne: 'Interprète le test :',
      generer() {
        const [ion, reactif, obs] = pick(TESTS);
        return { enonce: `On ajoute ${reactif} à une solution : on observe ${obs}. Quel ion contient la solution ?`, choix: ['ions ' + ion, ...TESTS.filter((t) => t[0] !== ion).slice(0, 3).map((t) => 'ions ' + t[0])], correct: 0, _v: { ion, reactif, obs } };
      },
      indices: ['Le réactif oriente : la soude détecte les ions métalliques.', "Le nitrate d'argent détecte les ions chlorure.", 'La couleur du précipité identifie l\'ion : bleu, vert, rouille ou blanc.'],
      correction_etapes: (st) => [`Avec ${st._v.reactif}, ${st._v.obs} caractérise les <strong>ions ${st._v.ion}</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'complete', consigne: "Protons et électrons d'un ion :",
      generer() {
        const [f, nom, Z, c] = pick(IONS);
        return {
          enonce_complete: `L'ion ${f} (élément de numéro atomique $Z = ${Z}$) contient {0} protons et {1} électrons.`,
          champs: [{ reponse: Z, validation: 'nombre' }, { reponse: Z - c, validation: 'nombre' }],
          _v: { f, Z, c },
        };
      },
      indices: ['Le noyau ne change pas quand l\'atome devient un ion.', 'Protons = $Z$.', 'Électrons = protons − charge.'],
      correction_etapes: (st) => [`Protons : $Z = ${st._v.Z}$ (le noyau est inchangé).`, `Électrons : $${st._v.Z} - (${st._v.c}) = ${st._v.Z - st._v.c}$.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Formule de la solution ionique :',
      generer() {
        const [nom, formule, cat, an, n] = pick(SOLUTIONS_IONIQUES);
        const fausses = new Set([formule]);
        fausses.add(`(${cat} + ${n === 1 ? 2 : 1} ${an})`.replace('(' + cat + ' + 1 ', '(' + cat + ' + '));
        fausses.add(`(${cat.replace(/[⁺²³]+/g, '⁻')} + ${an.replace(/[⁻²]+$/, '⁺')})`);
        for (const s of melanger(SOLUTIONS_IONIQUES)) { if (fausses.size >= 4) break; fausses.add(s[1]); }
        return { enonce: `Quelle est la formule de la solution de ${nom} ?`, choix: [...fausses].slice(0, 4), correct: 0, _v: { nom, formule, cat, an, n } };
      },
      indices: ["Le nom donne l'anion d'abord (chlorure Cl⁻, sulfate SO₄²⁻) puis le cation.", 'La solution est électriquement neutre.', 'Ajuste le nombre d\'anions pour compenser les charges du cation.'],
      correction_etapes: (st) => [`Ions présents : ${st._v.cat} et ${st._v.an}.`, `Neutralité : il faut ${st._v.n} ion(s) ${st._v.an} pour chaque ion ${st._v.cat}.`, `Formule : <strong>${st._v.formule}</strong>.`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un ion positif a gagné des électrons.', reponse: false, _v: { e: 'Non : il en a perdu. Les électrons sont négatifs ; en perdre fait apparaître une charge positive.' } },
          { enonce: "Quand un atome devient un ion, son noyau ne change pas.", reponse: true, _v: { e: 'Oui : seul le nombre d\'électrons change.' } },
          { enonce: 'Une solution ionique est électriquement neutre.', reponse: true, _v: { e: 'Oui : les charges des ions positifs et négatifs se compensent.' } },
          { enonce: 'La soude permet de détecter les ions chlorure.', reponse: false, _v: { e: "Non : on utilise le nitrate d'argent. La soude détecte les ions métalliques (cuivre, fer, zinc)." } },
          { enonce: "L'ion SO₄²⁻ est formé de plusieurs atomes.", reponse: true, _v: { e: "Oui : un atome de soufre et quatre atomes d'oxygène ; c'est un ion polyatomique." } },
        ]);
      },
      indices: ['Électron = charge négative.', 'Le noyau reste intact.', 'Relis le tableau des tests.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Enquête : identifie la solution.',
      generer() {
        const cas = pick([
          ['un précipité rouille', "un précipité blanc qui noircit", 'chlorure de fer III'],
          ['un précipité bleu', "un précipité blanc qui noircit", 'chlorure de cuivre'],
          ['un précipité bleu', 'rien', 'sulfate de cuivre'],
          ['un précipité vert', 'rien', 'sulfate de fer II'],
          ['un précipité blanc', "un précipité blanc qui noircit", 'chlorure de zinc'],
          ['rien', "un précipité blanc qui noircit", 'chlorure de sodium'],
        ]);
        const noms = ['chlorure de fer III', 'chlorure de cuivre', 'sulfate de cuivre', 'sulfate de fer II', 'chlorure de zinc', 'chlorure de sodium'];
        return {
          enonce: `Deux tests sur une solution inconnue :<br>• avec la soude : ${cas[0]} ;<br>• avec le nitrate d'argent : ${cas[1]}.<br>Quelle est cette solution ?`,
          choix: [cas[2], ...melanger(noms.filter((n) => n !== cas[2])).slice(0, 3)], correct: 0, _v: { cas },
        };
      },
      indices: ['Traite les deux tests séparément.', 'Soude : identifie le cation (ou son absence).', "Nitrate d'argent : présence ou non d'ions chlorure."],
      correction_etapes: (st) => [`Soude : ${st._v.cas[0]}${st._v.cas[0] === 'rien' ? ' → pas d\'ion cuivre, fer ou zinc' : ''}.`, `Nitrate d'argent : ${st._v.cas[1]}${st._v.cas[1] === 'rien' ? ' → pas d\'ions chlorure' : ' → ions chlorure présents'}.`, `C'est la solution de <strong>${st._v.cas[2]}</strong>.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Neutralité électrique :',
      generer() {
        const [nom, formule, cat, an, n] = pick(SOLUTIONS_IONIQUES.filter((s) => s[4] > 1));
        const N = randInt(2, 12) * 100;
        return { enonce: `Un échantillon de solution de ${nom} ${formule} contient ${N} ions ${cat}. Combien contient-il d'ions ${an} ?`, reponse: N * n, validation: 'nombre', _v: { N, n, cat, an } };
      },
      indices: ['La solution est électriquement neutre.', `Compte les charges + apportées par un cation.`, 'Chaque anion Cl⁻ apporte une seule charge −.'],
      correction_etapes: (st) => [`Chaque ion ${st._v.cat} porte ${st._v.n} charges +, compensées par ${st._v.n} ions ${st._v.an}.`, `${st._v.N} × ${st._v.n} = <strong>${st._v.N * st._v.n}</strong> ions ${st._v.an}.`],
    },
    {
      id: 'e09', niveau: 2, type: 'ordonner_etapes', consigne: "Remets dans l'ordre le test des ions cuivre :",
      generer() {
        return { etapes: ['Mettre ses lunettes et ses gants de protection', 'Verser un peu de solution à tester dans un tube à essai', 'Ajouter quelques gouttes de soude avec une pipette', 'Observer la couleur du précipité', 'Conclure : un précipité bleu indique des ions cuivre Cu²⁺'] };
      },
      indices: ['La sécurité passe en premier.', 'On prélève avant d\'ajouter le réactif.', 'On conclut après avoir observé.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'ion Mg²⁺ :", choix: ['a perdu 2 électrons', 'a gagné 2 électrons', 'a perdu 2 protons', 'a gagné 2 protons'], correct: 0, explication: 'Charge positive : des électrons ont été perdus ; le noyau ne change pas.' },
    { type: 'qcm', question: "Pour détecter des ions chlorure, on utilise :", choix: ["le nitrate d'argent", 'la soude', "l'eau de chaux", 'le papier pH'], correct: 0, explication: "Précipité blanc qui noircit à la lumière." },
    { type: 'qcm', question: 'Avec la soude, les ions cuivre Cu²⁺ donnent un précipité :', choix: ['bleu', 'vert', 'rouille', 'blanc'], correct: 0, explication: 'Bleu pour Cu²⁺, vert pour Fe²⁺, rouille pour Fe³⁺, blanc pour Zn²⁺.' },
    {
      type: 'saisie', question: 'Électrons.',
      generer() { const [f, , Z, c] = pick(IONS); return { question: `Combien d'électrons possède l'ion ${f} ($Z = ${Z}$) ?`, reponse: Z - c, validation: 'nombre', explication: `$${Z} - (${c}) = ${Z - c}$ électrons.` }; },
    },
    { type: 'vrai_faux', question: "La solution (Fe³⁺ + 3 Cl⁻) contient trois fois plus d'ions chlorure que d'ions fer III.", reponse: true, explication: 'Il faut 3 charges − pour compenser les 3 charges + de chaque ion Fe³⁺.' },
  ],
};
