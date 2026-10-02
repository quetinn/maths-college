// =====================================================================
//  sv05_nutrition_organes.js — SVT 5ᵉ : la nutrition des organes.
//  Le sang et sa circulation, le cœur, artères, veines et capillaires ;
//  la sève brute et la sève élaborée chez les végétaux.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 10.
//  Les mesures des exercices sont inventées pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre, dec } from '../outils.js';
import { tableau } from '../../commun.js';
import { circulation } from '../figures.js';

const DEFINITIONS = [
  ['le cœur', 'Muscle creux qui se contracte et propulse le sang dans les vaisseaux.'],
  ['une artère', 'Vaisseau sanguin qui conduit le sang du cœur vers les organes.'],
  ['une veine', 'Vaisseau sanguin qui ramène le sang des organes vers le cœur.'],
  ['un capillaire', "Vaisseau sanguin très fin, à paroi mince, où se font les échanges entre le sang et les organes."],
  ['un nutriment', "Petite molécule issue de la digestion, utilisée par les organes."],
  ['la sève brute', "Liquide formé d'eau et de sels minéraux, qui monte des racines vers les feuilles."],
  ['la sève élaborée', 'Liquide riche en matière organique, qui part des feuilles vers tous les organes de la plante.'],
];

export default {
  id: 'sv05',
  titre: 'La nutrition des organes',
  theme: 'svt_vivant', niveau: '5e',
  icone: '🫀',

  intro:
    "Tes muscles sont loin de tes poumons et de ton intestin. Pourtant, ils reçoivent à chaque instant du dioxygène et des nutriments. " +
    "On découvre comment le <strong>sang</strong>, mis en mouvement par le <strong>cœur</strong>, approvisionne tous les organes, et comment la <strong>sève</strong> joue un rôle comparable chez les plantes.",

  cours: [
    {
      type: 'definition', titre: 'Le rôle du sang',
      contenu: "Les organes ont besoin de <strong>dioxygène</strong> et de <strong>nutriments</strong>, et produisent du <strong>dioxyde de carbone</strong> et des déchets. Le sang transporte tout cela : il apporte aux organes ce dont ils ont besoin et emporte ce qu'ils rejettent.",
    },
    {
      type: 'definition', titre: 'Les vaisseaux sanguins',
      contenu: "Le sang circule dans un circuit fermé. Les <strong>artères</strong> le conduisent du cœur vers les organes. Dans les organes, des <strong>capillaires</strong> très fins permettent les échanges. Les <strong>veines</strong> le ramènent au cœur.",
    },
    {
      type: 'propriete', titre: 'Le cœur, une pompe',
      contenu: "Le <strong>cœur</strong> est un muscle creux. En se contractant, il propulse le sang dans les artères. Au repos, celui d'un adulte bat de 50 à 80 fois par minute. " +
        "Le sang passe par les poumons, où il se charge en dioxygène, revient au cœur, puis repart vers tous les organes.",
    },
    { type: 'figure', titre: 'La double circulation', contenu: "Suis les gouttes de sang : elles changent de couleur dans les poumons et dans les organes. Compare le repos et l'effort.", render: (host) => circulation(host) },
    {
      type: 'definition', titre: 'Chez les végétaux : les sèves',
      contenu: "La <strong>sève brute</strong> (eau et sels minéraux) monte des racines vers les feuilles. Les feuilles fabriquent de la matière organique, que la <strong>sève élaborée</strong> distribue à tous les organes : racines, bourgeons, fruits.",
    },
    {
      type: 'exemple', enonce: "On plonge une tige de céleri dans de l'eau colorée en bleu. Deux heures plus tard, les feuilles ont bleui. Que montre cette expérience ?",
      solution_etapes: ["L'eau colorée est entrée par le bas de la tige.", "Elle se retrouve dans les feuilles : elle est donc montée dans la tige.", "L'eau circule dans la plante, des parties basses vers les feuilles : c'est le trajet de la sève brute."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Partir du cœur', explication: "Le sang quitte le cœur par une artère." },
    { etape: 2, titre: "Passer par l'organe", explication: "Dans l'organe, le sang traverse des capillaires : c'est là que se font les échanges." },
    { etape: 3, titre: 'Revenir au cœur', explication: "Le sang revient au cœur par une veine." },
    { etape: 4, titre: 'Indiquer ce qui a changé', explication: "Après les poumons, le sang est riche en dioxygène ; après un muscle, il en est appauvri et s'est chargé en dioxyde de carbone." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Artère : du cœur vers les organes.', 'Veine : des organes vers le cœur.', 'La sève brute monte, la sève élaborée part des feuilles.']),

    exoClasser('e02', 1, 'Artère, veine ou capillaire ?', [
      ['conduit le sang du cœur vers les organes', 'artère'], ['part du cœur', 'artère'],
      ['ramène le sang des organes vers le cœur', 'veine'], ['arrive au cœur', 'veine'],
      ['a une paroi très fine', 'capillaire'], ['permet les échanges entre le sang et un organe', 'capillaire'], ['est le plus fin des vaisseaux', 'capillaire'],
    ], ['artère', 'veine', 'capillaire'], { artère: 'Les artères partent du cœur.', veine: 'Les veines reviennent au cœur.', capillaire: 'Leur paroi mince laisse passer gaz et nutriments.' },
    ['Artère : départ du cœur.', 'Veine : retour au cœur.', 'Les échanges se font dans les capillaires.'], 4),

    exoVraiFaux('e03', 1, [
      ['Le cœur est un muscle.', true, 'Oui : un muscle creux qui propulse le sang.'],
      ['Le sang circule dans un circuit fermé.', true, 'Oui : il reste dans les vaisseaux et repasse toujours par le cœur.'],
      ['Les veines conduisent le sang du cœur vers les organes.', false, 'Non : ce sont les artères. Les veines ramènent le sang au cœur.'],
      ['Le sang apporte du dioxygène aux organes.', true, 'Oui, ainsi que des nutriments.'],
      ['La sève brute contient surtout de la matière organique.', false, 'Non : de l\'eau et des sels minéraux. C\'est la sève élaborée qui est riche en matière organique.'],
      ['Les échanges entre le sang et un muscle se font dans les capillaires.', true, 'Oui, grâce à leur paroi très fine.'],
      ['En sortant des poumons, le sang est riche en dioxygène.', true, 'Oui : il vient de s\'en charger dans les alvéoles.'],
    ], ['Artère : du cœur. Veine : vers le cœur.', 'Le sang passe par les poumons pour se charger en dioxygène.', 'Sève brute : eau et sels minéraux.']),

    exoOrdonner('e04', 2, [
      { consigne: "Remets dans l'ordre le trajet d'une goutte de sang, du cœur à un muscle et retour :", etapes: ['le cœur', 'une artère', 'les capillaires du muscle', 'une veine', 'le cœur'].map((e, i) => (i === 4 ? 'retour au cœur' : e)) },
      { consigne: "Remets dans l'ordre le trajet du dioxygène, de l'air jusqu'au muscle :", etapes: ["l'air des alvéoles pulmonaires", 'le sang des poumons', 'le cœur', 'une artère', 'les capillaires du muscle', 'le muscle'] },
    ], ['Le sang quitte le cœur par une artère.', 'Les échanges se font dans les capillaires.', 'Le retour se fait par une veine.']),

    exoClasser('e05', 2, 'Apporté aux organes ou emporté par le sang ?', [
      ['le dioxygène', 'apporté'], ['le glucose, un nutriment', 'apporté'], ['les nutriments issus de la digestion', 'apporté'],
      ['le dioxyde de carbone', 'emporté'], ['les déchets produits par les organes', 'emporté'],
    ], ['apporté', 'emporté'], { apporté: 'Les organes en ont besoin pour fonctionner.', emporté: 'Les organes les produisent et doivent s\'en débarrasser.' },
    ['Un organe consomme du dioxygène.', 'Un organe produit du dioxyde de carbone.', 'Les nutriments viennent de la digestion.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule la fréquence cardiaque :',
      generer() {
        const n = randInt(15, 22), duree = pick([15, 30]);
        const b = duree === 15 ? n : n * 2;
        return { enonce: `En posant deux doigts sur son poignet, un élève compte ${b} battements en ${duree} secondes. Quelle est sa fréquence cardiaque, en battements par minute ?`, reponse: (b * 60) / duree, validation: 'nombre', _v: { b, duree } };
      },
      indices: ['Une minute dure 60 secondes.', 'Combien de fois la durée de la mesure tient-elle dans une minute ?', 'Multiplie le nombre de battements par ce nombre.'],
      correction_etapes: (st) => [`60 ÷ ${st._v.duree} = ${60 / st._v.duree} : la mesure tient ${60 / st._v.duree} fois dans une minute.`, `${st._v.b} × ${60 / st._v.duree} = <strong>${(st._v.b * 60) / st._v.duree} battements par minute</strong>.`],
    },

    exoDocument('e07', 2, 'Compare le repos et l\'effort.', [
      () => {
        const repos = pick([1, 1.2, 1.5]), k = pick([10, 12, 15]);
        return {
          enonce: "Mesures inventées pour l'exercice. On mesure le volume de sang qui traverse les muscles des jambes chaque minute." +
            tableau([['', 'Au repos', 'Pendant une course'], ['Sang reçu par les muscles (L par minute)', dec(repos), dec(repos * k)]]),
          questions: [
            nombre('Par combien le volume de sang reçu par les muscles est-il multiplié pendant la course ?', k),
            choix('Pendant la course, les muscles reçoivent donc :', 'plus de dioxygène et de nutriments', 'moins de dioxygène', 'autant de dioxygène qu\'au repos'),
            choix('Ce supplément de sang est possible car le cœur :', 'bat plus vite', 's\'arrête par moments', 'bat moins vite'),
          ],
          correction: [`${dec(repos * k)} ÷ ${dec(repos)} = <strong>${k}</strong> fois plus.`, "Plus de sang, c'est <strong>plus de dioxygène et de nutriments</strong> apportés aux muscles.", 'Le cœur <strong>accélère</strong> : il propulse davantage de sang chaque minute.'],
        };
      },
    ], ['Divise la valeur pendant la course par la valeur au repos.', 'Le sang transporte le dioxygène et les nutriments.', 'C\'est le cœur qui met le sang en mouvement.']),

    exoDocument('e08', 3, 'Interprète cette expérience sur une plante.', [
      () => ({
        enonce: "Sur une branche d'arbre, on retire un anneau d'écorce : on coupe ainsi les vaisseaux qui transportent la sève élaborée, mais pas ceux, plus profonds, qui transportent la sève brute. Quelques semaines plus tard, les feuilles situées au-dessus sont toujours vertes, et un bourrelet s'est formé juste au-dessus de l'anneau.",
        questions: [
          choix('Les feuilles restent vertes : la sève brute, elle,', 'continue de monter', 'ne circule plus', 'descend vers les racines'),
          choix('Le bourrelet au-dessus de l\'anneau est dû :', 'à la sève élaborée, qui s\'accumule sans pouvoir passer', 'à la sève brute, qui s\'accumule', 'à une maladie'),
          choix('La sève élaborée circule donc :', 'des feuilles vers les autres organes', 'des racines vers les feuilles', 'uniquement dans les racines'),
        ],
        correction: ["L'eau arrive toujours aux feuilles : la <strong>sève brute monte</strong> par les vaisseaux profonds.", "La matière organique fabriquée par les feuilles ne peut plus passer : la <strong>sève élaborée s'accumule</strong>.", 'Elle part donc <strong>des feuilles vers les autres organes</strong>.'],
      }),
    ], ['Deux types de vaisseaux : un seul est coupé.', 'Ce qui s\'accumule au-dessus venait du haut.', 'Les feuilles fabriquent la matière organique.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Calcule le volume de sang propulsé :',
      generer() {
        const fc = pick([60, 70, 75, 80]), ml = pick([60, 70, 80]);
        return { enonce: `Dans cet exercice, on suppose qu'à chaque battement le cœur propulse ${ml} mL de sang. Il bat ${fc} fois par minute. Quel volume de sang propulse-t-il en une minute, en litres ?`, reponse: (fc * ml) / 1000, validation: 'nombre', unite: 'L', pieges: [{ valeur: fc * ml, message: 'Ce résultat est en millilitres : 1 L = 1 000 mL.' }], _v: { fc, ml } };
      },
      indices: ['Volume par minute = volume d\'un battement × nombre de battements.', 'Le résultat est d\'abord en millilitres.', '1 L = 1 000 mL.'],
      correction_etapes: (st) => [`${st._v.ml} × ${st._v.fc} = ${st._v.ml * st._v.fc} mL par minute.`, `Soit <strong>${dec((st._v.ml * st._v.fc) / 1000)} L</strong> par minute.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le sang est mis en mouvement par :', choix: ['le cœur', 'les poumons', 'les muscles des jambes', 'les veines'], correct: 0, explication: 'Le cœur est une pompe.' },
    { type: 'qcm', question: 'Une artère conduit le sang :', choix: ['du cœur vers les organes', 'des organes vers le cœur', 'des poumons vers l\'air', 'de la bouche vers l\'estomac'], correct: 0, explication: 'Les veines font le trajet inverse.' },
    { type: 'qcm', question: 'Les échanges entre le sang et un organe se font dans :', choix: ['les capillaires', 'les artères', 'les veines', 'le cœur'], correct: 0, explication: 'Leur paroi est très fine.' },
    { type: 'vrai_faux', question: 'Le sang emporte le dioxyde de carbone produit par les organes.', reponse: true, explication: 'Il sera rejeté au niveau des poumons.' },
    { type: 'qcm', question: 'La sève brute est formée :', choix: ['d\'eau et de sels minéraux', 'de matière organique', 'de sang', 'de dioxygène'], correct: 0, explication: 'Elle monte des racines vers les feuilles.' },
    { type: 'vrai_faux', question: 'La sève élaborée distribue la matière organique fabriquée par les feuilles.', reponse: true, explication: 'Elle alimente racines, bourgeons et fruits.' },
  ],
};
