// =====================================================================
//  sr11_fecondation_grossesse.js — SVT 4ᵉ : des cellules reproductrices
//  au nouveau-né. Fécondation, nidation, embryon et fœtus, placenta,
//  naissance.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 30.
//  Valeurs vérifiées (voir js/sources.js) : fécondation dans la trompe,
//  grossesse d'environ 38 semaines après la fécondation (Wikipédia,
//  « Grossesse »).
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { etapes, echanges } from '../figures.js';

const DEFINITIONS = [
  ['la fécondation', "Union d'un spermatozoïde et d'un ovule, qui donne une cellule-œuf."],
  ['la cellule-œuf', "Première cellule d'un nouvel être humain."],
  ['la nidation', "Fixation de l'embryon dans la paroi de l'utérus."],
  ['un embryon', "Être humain au début de son développement, quand ses organes se mettent en place."],
  ['un fœtus', "Être humain en développement dans l'utérus, une fois ses organes formés."],
  ['le placenta', "Organe qui permet les échanges entre le sang de la mère et celui du fœtus, sans que les deux sangs se mélangent."],
  ['le cordon ombilical', 'Cordon qui relie le fœtus au placenta.'],
];

const uterus = '<path d="M90 30 Q160 10 230 30 Q250 110 200 150 H120 Q70 110 90 30Z" class="sv-uterus"/><path d="M108 44 Q160 30 212 44 Q226 104 190 134 H130 Q94 104 108 44Z" class="sv-cavite"/>';
const trompe = '<path d="M92 34 Q50 18 34 50" class="sv-trait"/><circle cx="30" cy="62" r="12" class="sv-ovaire"/>';
const SCENES = [
  ['Fécondation', `${uterus}${trompe}<circle cx="62" cy="26" r="6" class="sv-ovule"/><path d="M76 20 l10 -6" class="sv-trait"/><text x="70" y="12" class="pc-petit">dans la trompe</text>`, "Un spermatozoïde rencontre l'ovule dans une <strong>trompe</strong> : c'est la fécondation. Elle donne une cellule-œuf."],
  ['Divisions', `${uterus}${trompe}<circle cx="86" cy="32" r="6" class="sv-ovule"/><circle cx="94" cy="36" r="6" class="sv-ovule"/><circle cx="90" cy="26" r="6" class="sv-ovule"/>`, "En descendant vers l'utérus, la cellule-œuf se divise : deux cellules, puis quatre, puis huit… C'est le début de l'<strong>embryon</strong>."],
  ['Nidation', `${uterus}${trompe}<circle cx="124" cy="74" r="8" class="sv-ovule"/><text x="160" y="170" text-anchor="middle" class="pc-petit">l'embryon se fixe dans la paroi</text>`, "L'embryon s'implante dans la paroi épaissie de l'utérus : c'est la <strong>nidation</strong>. Les règles n'ont pas lieu."],
  ['Embryon et placenta', `${uterus}<ellipse cx="160" cy="92" rx="16" ry="22" class="sv-plein-rose"/><rect x="112" y="60" width="12" height="44" rx="5" class="sv-plein-accent"/><path d="M124 84 Q136 92 146 90" class="sv-trait"/>`, "Les organes se mettent en place. Le <strong>placenta</strong>, relié à l'embryon par le cordon ombilical, assure les échanges avec la mère."],
  ['Fœtus', `${uterus}<ellipse cx="164" cy="96" rx="26" ry="34" class="sv-plein-rose"/><circle cx="164" cy="62" r="14" class="sv-plein-rose"/><rect x="112" y="60" width="12" height="56" rx="5" class="sv-plein-accent"/><path d="M124 92 Q134 100 140 96" class="sv-trait"/>`, "Tous les organes sont formés : on parle de <strong>fœtus</strong>. Il grandit et ses organes deviennent capables de fonctionner."],
  ['Naissance', `<path d="M90 30 Q160 10 230 30 Q250 110 200 150 H120 Q70 110 90 30Z" class="sv-uterus"/><ellipse cx="160" cy="150" rx="22" ry="26" class="sv-plein-rose"/><circle cx="160" cy="176" r="12" class="sv-plein-rose"/>`, "Environ 38 semaines après la fécondation, les contractions de l'utérus expulsent l'enfant : c'est l'accouchement."],
];

export default {
  id: 'sr11',
  titre: 'Des cellules reproductrices au nouveau-né',
  theme: 'svt_corps', niveau: '4e',
  icone: '👶',

  intro:
    "Chacun de nous a commencé par une seule cellule, plus petite qu'un grain de sable. " +
    "On retrace ce parcours : la <strong>fécondation</strong>, l'installation dans l'utérus, puis les neuf mois pendant lesquels le <strong>placenta</strong> relie la mère et l'enfant à naître.",

  cours: [
    {
      type: 'definition', titre: 'La fécondation',
      contenu: "Lors d'un rapport sexuel, des spermatozoïdes sont déposés dans le vagin. Ils remontent l'utérus jusqu'aux trompes. Si un ovule s'y trouve, un seul spermatozoïde y pénètre : c'est la <strong>fécondation</strong>. Elle a lieu dans la trompe et donne une <strong>cellule-œuf</strong>.",
    },
    {
      type: 'propriete', titre: 'La nidation',
      contenu: "La cellule-œuf se divise tout en descendant vers l'utérus : elle devient un <strong>embryon</strong>. Celui-ci s'implante dans la paroi de l'utérus : c'est la <strong>nidation</strong>. La paroi n'est alors pas éliminée : l'absence de règles est le premier signe d'une grossesse.",
    },
    { type: 'figure', titre: 'De la fécondation à la naissance', contenu: 'Parcours les six étapes.', render: (host) => etapes(host, 'Étape', SCENES, { vb: '0 0 320 190' }) },
    {
      type: 'definition', titre: 'Embryon, puis fœtus',
      contenu: "Pendant les premières semaines, les organes se mettent en place : c'est la période <strong>embryonnaire</strong>. Ensuite, le <strong>fœtus</strong> grandit et ses organes mûrissent. La grossesse dure environ 38 semaines après la fécondation, soit près de neuf mois.",
    },
    {
      type: 'definition', titre: 'Le placenta',
      contenu: "Le <strong>placenta</strong> est le lieu des échanges entre la mère et le fœtus, auquel il est relié par le <strong>cordon ombilical</strong>. Le sang de la mère apporte dioxygène et nutriments ; le sang du fœtus rejette dioxyde de carbone et déchets. Les deux sangs ne se mélangent pas.",
    },
    {
      type: 'figure', titre: 'Au niveau du placenta', contenu: 'Observe le sens de chaque échange.',
      render: (host) => echanges(host, { gauche: 'sang de la mère', droite: 'sang du fœtus', flux: [{ nom: 'dioxygène', classe: 'sv-g-o2', sens: 1 }, { nom: 'nutriments', classe: 'sv-g-nutriment', sens: 1 }, { nom: 'dioxyde de carbone et déchets', classe: 'sv-g-co2', sens: -1 }], texte: "L'alcool, la nicotine et beaucoup de médicaments traversent aussi le placenta : ils atteignent le fœtus.", label: 'Échanges entre la mère et le fœtus au niveau du placenta' }),
    },
    {
      type: 'propriete', titre: 'Protéger l\'enfant à naître',
      contenu: "Tout ce que la mère absorbe peut passer dans le sang du fœtus. L'<strong>alcool</strong> et le <strong>tabac</strong> perturbent son développement : pendant la grossesse, il est recommandé de n'en consommer aucun. Un suivi médical régulier (échographies, analyses) permet de vérifier que tout se passe bien.",
    },
    {
      type: 'exemple', enonce: "Pourquoi une femme enceinte ne doit-elle pas boire d'alcool ?",
      solution_etapes: ["L'alcool bu passe dans le sang de la mère.", 'Il traverse le placenta et atteint le sang du fœtus.', "Il perturbe la formation et le fonctionnement de ses organes : il faut donc l'éviter totalement."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Situer le lieu', explication: "Trompe (fécondation), utérus (nidation et développement), vagin (naissance)." },
    { etape: 2, titre: 'Nommer le stade', explication: "Cellule-œuf, embryon (organes en formation), fœtus (organes formés)." },
    { etape: 3, titre: 'Décrire les échanges', explication: "Du sang de la mère vers le fœtus : dioxygène, nutriments. En sens inverse : dioxyde de carbone, déchets." },
    { etape: 4, titre: 'Relier aux comportements', explication: "Une substance qui traverse le placenta atteint le fœtus." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Fécondation : dans la trompe.', 'Nidation : dans la paroi de l\'utérus.', 'Embryon d\'abord, fœtus ensuite.']),

    exoOrdonner('e02', 1, [
      { consigne: "Remets dans l'ordre : de la fécondation à la naissance.", etapes: ['Fécondation dans une trompe', "La cellule-œuf se divise en descendant vers l'utérus", "Nidation dans la paroi de l'utérus", 'Les organes de l\'embryon se mettent en place', 'Le fœtus grandit', 'Accouchement'] },
    ], ['Tout commence par la fécondation.', 'La nidation précède le développement des organes.', 'Embryon, puis fœtus.']),

    exoVraiFaux('e03', 1, [
      ["La fécondation a lieu dans l'utérus.", false, 'Non : elle a lieu dans une trompe.'],
      ['La nidation est la fixation de l\'embryon dans la paroi de l\'utérus.', true, 'Oui.'],
      ['Le sang de la mère et celui du fœtus se mélangent.', false, 'Non : les échanges se font à travers le placenta, sans mélange des sangs.'],
      ["L'alcool bu par la mère peut atteindre le fœtus.", true, 'Oui : il traverse le placenta.'],
      ['Un seul spermatozoïde féconde l\'ovule.', true, 'Oui.'],
      ['Une grossesse dure environ neuf mois.', true, 'Oui : environ 38 semaines après la fécondation.'],
      ['Le fœtus respire de l\'air dans l\'utérus.', false, 'Non : le dioxygène lui vient du sang de sa mère, par le placenta.'],
    ], ['Fécondation : trompe.', 'Le placenta filtre mais ne bloque pas tout.', 'Les deux sangs restent séparés.']),

    exoClasser('e04', 2, 'Dans quel sens cette substance traverse-t-elle le placenta ?', [
      ['le dioxygène', 'de la mère vers le fœtus'], ['les nutriments', 'de la mère vers le fœtus'], ["l'alcool", 'de la mère vers le fœtus'], ['la nicotine', 'de la mère vers le fœtus'],
      ['le dioxyde de carbone', 'du fœtus vers la mère'], ['les déchets produits par le fœtus', 'du fœtus vers la mère'],
    ], ['de la mère vers le fœtus', 'du fœtus vers la mère'], { 'de la mère vers le fœtus': 'Le fœtus reçoit tout ce qui circule dans le sang maternel et traverse le placenta.', 'du fœtus vers la mère': "Le fœtus se débarrasse de ce qu'il produit." },
    ['Le fœtus a besoin de dioxygène et de nutriments.', 'Il produit du dioxyde de carbone.', 'Les substances toxiques viennent de la mère.'], 4),

    exoClasser('e05', 2, 'Embryon ou fœtus ?', [
      ['les organes se mettent en place', 'embryon'], ['il vient de s\'implanter dans l\'utérus', 'embryon'], ['il est formé de quelques cellules', 'embryon'],
      ['tous ses organes sont formés', 'fœtus'], ['il grandit et ses organes mûrissent', 'fœtus'], ['il bouge et la mère le sent', 'fœtus'],
    ], ['embryon', 'fœtus'], { embryon: 'Début du développement : les organes se forment.', fœtus: 'Suite du développement : les organes sont en place et se perfectionnent.' },
    ['L\'embryon vient en premier.', 'Fœtus : organes déjà formés.', 'La nidation concerne l\'embryon.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Convertis une durée :',
      generer() {
        const s = pick([8, 12, 20, 30, 38]);
        return { enonce: `Une grossesse en est à ${s} semaines après la fécondation. Combien de jours cela représente-t-il ?`, reponse: s * 7, validation: 'nombre', unite: 'jours', _v: { s } };
      },
      indices: ['Une semaine compte 7 jours.', 'Multiplie le nombre de semaines par 7.', '38 semaines : 266 jours.'],
      correction_etapes: (st) => [`${st._v.s} × 7 = <strong>${st._v.s * 7} jours</strong>.`],
    },

    exoSituation('e07', 2, 'Quel conseil donner à une femme enceinte ?', [
      ['Elle se demande si elle peut boire un verre de vin à un repas de fête.', "Non : l'alcool traverse le placenta et atteint le fœtus.", 'Oui : un verre ne passe pas dans le sang.', 'Oui, à condition de manger en même temps.'],
      ['Elle fume quelques cigarettes par jour.', "Arrêter : les substances du tabac passent dans le sang du fœtus.", 'Continuer : la fumée reste dans les poumons.', 'Fumer seulement le soir.'],
      ['Elle veut prendre un médicament contre le mal de tête.', 'Demander l\'avis d\'un médecin ou d\'un pharmacien : certains médicaments traversent le placenta.', 'Le prendre sans se poser de question.', 'Doubler la dose pour être tranquille.'],
      ['Elle hésite à se rendre aux échographies prévues.', 'Y aller : elles permettent de vérifier le bon développement du fœtus.', 'Ne pas y aller : elles sont inutiles.', 'Y aller seulement à la fin de la grossesse.'],
    ], ['Ce que la mère absorbe peut atteindre le fœtus.', 'Le placenta laisse passer de nombreuses substances.', 'Le suivi médical protège la mère et l\'enfant.'], 'Pendant la grossesse : ni alcool ni tabac, et un suivi médical régulier.'),

    exoDocument('e08', 3, 'Raisonne sur le placenta.', [
      () => ({
        enonce: "On analyse le sang d'une artère et d'une veine du cordon ombilical. Dans le cordon, la veine apporte au fœtus le sang qui vient du placenta ; les artères ramènent au placenta le sang qui vient du fœtus. Le sang de la veine est plus riche en dioxygène et en nutriments que celui des artères.",
        questions: [
          choix('Le sang qui arrive au fœtus est riche en dioxygène car il s\'en est chargé :', 'dans le placenta, au contact du sang de la mère', 'dans les poumons du fœtus', 'dans le cordon lui-même'),
          choix('Le sang qui repart du fœtus est plus pauvre en dioxygène car :', 'les organes du fœtus en ont consommé', 'le placenta l\'a retiré', 'il s\'est mélangé au sang de la mère'),
          choix('Le placenta joue donc, pour le fœtus, un rôle comparable à celui :', 'des poumons et de l\'intestin', 'du cœur uniquement', 'du cerveau'),
        ],
        correction: ['Le sang du fœtus reçoit le dioxygène du <strong>sang maternel</strong>, à travers le placenta.', 'Les organes du fœtus <strong>consomment</strong> dioxygène et nutriments.', 'Le placenta apporte dioxygène et nutriments : il joue le rôle des <strong>poumons</strong> et de l\'<strong>intestin</strong>.'],
      }),
    ], ['Le fœtus ne respire pas d\'air.', 'Ses organes consomment du dioxygène.', 'Le placenta fournit ce que poumons et intestin fourniront après la naissance.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Compte les cellules de l\'embryon :',
      generer() {
        const n = pick([3, 4, 5, 6]);
        return { enonce: `Après la fécondation, la cellule-œuf se divise en deux, puis chaque cellule se divise à son tour, et ainsi de suite. Combien de cellules l'embryon compte-t-il après ${n} séries de divisions ?`, reponse: 2 ** n, validation: 'nombre', pieges: [{ valeur: 2 * n, message: 'Le nombre de cellules double à chaque série de divisions.' }], _v: { n } };
      },
      indices: ['Après une série : 2 cellules.', 'Après deux séries : 4 cellules.', 'Le nombre double à chaque fois.'],
      correction_etapes: (st) => [`${Array.from({ length: st._v.n + 1 }, (_, k) => 2 ** k).join(' → ')}.`, `Après ${st._v.n} séries de divisions : <strong>${2 ** st._v.n} cellules</strong>.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La fécondation a lieu dans :', choix: ['une trompe', "l'utérus", 'le vagin', "l'ovaire"], correct: 0, explication: 'La cellule-œuf descend ensuite vers l\'utérus.' },
    { type: 'qcm', question: 'La nidation est :', choix: ["la fixation de l'embryon dans la paroi de l'utérus", 'la rencontre des cellules reproductrices', 'la naissance', "la libération d'un ovule"], correct: 0, explication: 'Elle empêche l\'élimination de la paroi : les règles s\'arrêtent.' },
    { type: 'qcm', question: 'Les échanges entre la mère et le fœtus se font au niveau :', choix: ['du placenta', 'des trompes', 'des ovaires', 'du vagin'], correct: 0, explication: 'Sans mélange des deux sangs.' },
    { type: 'vrai_faux', question: "L'alcool consommé par la mère atteint le fœtus.", reponse: true, explication: 'Il traverse le placenta.' },
    { type: 'qcm', question: 'Quand tous ses organes sont formés, l\'enfant à naître est appelé :', choix: ['fœtus', 'embryon', 'cellule-œuf', 'ovule'], correct: 0, explication: 'Avant, on parle d\'embryon.' },
    { type: 'vrai_faux', question: 'Une grossesse dure environ 38 semaines après la fécondation.', reponse: true, explication: 'Soit près de neuf mois.' },
  ],
};
