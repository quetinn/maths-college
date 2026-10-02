// =====================================================================
//  pv10_eau.js — Physique-chimie 5ᵉ : l'eau que nous buvons est-elle pure ?
//  Test de présence d'eau, eaux minérales et résidu sec, gaz dissous.
//  Plan : manuel LeLivreScolaire Physique-Chimie cycle 4, chapitre 1.
//  Valeurs vérifiées (voir js/sources.js) : couleurs du sulfate de cuivre
//  anhydre et hydraté ; résidus secs des eaux minérales de moins de 20 mg/L
//  à plus de 2 500 mg/L. Les étiquettes des exercices sont inventées.
// =====================================================================

import { pick, randInt, dec, grandeur } from '../outils.js';
import { testEau, LIQUIDES_TEST } from '../figures_cycle.js';
import { tableau } from '../../commun.js';
import { exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../../svt/outils.js';

const DEFINITIONS = [
  ['un corps pur', "Matière formée d'un seul constituant."],
  ['un mélange', 'Matière formée de plusieurs constituants.'],
  ['une eau minérale', "Eau d'origine souterraine qui contient des sels minéraux dissous."],
  ['le résidu sec', "Masse de sels minéraux qui reste quand on a fait évaporer un litre d'eau."],
  ['le sulfate de cuivre anhydre', "Poudre blanche qui devient bleue au contact de l'eau."],
  ['une eau potable', 'Eau que l\'on peut boire sans danger pour la santé.'],
  ['un gaz dissous', "Gaz mélangé à un liquide, invisible tant qu'il ne forme pas de bulles."],
];

export default {
  id: 'pv10',
  titre: "L'eau que nous buvons est-elle pure ?",
  theme: 'pc_matiere', niveau: '5e',
  icone: '🚰',

  intro:
    "L'eau du robinet et l'eau en bouteille sont limpides, et pourtant aucune n'est de l'eau pure. " +
    "On apprend à <strong>détecter la présence d'eau</strong> dans un liquide, à lire l'<strong>étiquette</strong> d'une eau minérale et à mettre en évidence le <strong>gaz</strong> des boissons pétillantes.",

  cours: [
    {
      type: 'definition', titre: "Détecter la présence d'eau",
      contenu: "Le <strong>sulfate de cuivre anhydre</strong> est une poudre blanche. Au contact de l'eau, il devient <strong>bleu</strong>. On dépose une goutte du liquide à tester sur la poudre : si elle bleuit, le liquide contient de l'eau.",
    },
    { type: 'figure', titre: 'Le test au sulfate de cuivre anhydre', contenu: 'Choisis un liquide et verse une goutte sur la poudre.', render: (host) => testEau(host) },
    {
      type: 'propriete', titre: "L'eau que l'on boit est un mélange",
      contenu: "Une eau limpide n'est pas forcément <strong>pure</strong>. L'eau du robinet et les eaux minérales contiennent des <strong>sels minéraux dissous</strong> (calcium, magnésium, sodium…) : ce sont des mélanges homogènes. L'eau pure, formée du seul constituant « eau », s'obtient par distillation.",
    },
    {
      type: 'definition', titre: "Lire une étiquette : le résidu sec",
      contenu: "L'étiquette d'une eau minérale indique la masse de chaque sel minéral dissous dans un litre, en milligrammes par litre (mg/L). Le <strong>résidu sec</strong> est la masse totale de sels minéraux qui reste après évaporation d'un litre d'eau. Selon les eaux, il va de moins de 20 mg/L à plus de 2 500 mg/L.",
    },
    {
      type: 'propriete', titre: 'Le gaz des boissons pétillantes',
      contenu: "Une eau gazeuse contient un <strong>gaz dissous</strong> : le dioxyde de carbone. En agitant ou en chauffant la boisson, le gaz s'échappe. On le recueille par <strong>déplacement d'eau</strong>, puis on l'identifie avec l'<strong>eau de chaux</strong>, qui se trouble en sa présence.",
    },
    {
      type: 'propriete', titre: 'Eau potable',
      contenu: "Une eau <strong>potable</strong> peut être bue sans danger. Elle n'est pas pure : elle contient des sels minéraux, mais ni microbes dangereux ni substances toxiques en quantité nuisible.",
    },
    {
      type: 'exemple', enonce: "L'étiquette d'une eau indique un résidu sec de 300 mg/L. Quelle masse de sels minéraux contient une bouteille de 1,5 L ?",
      solution_etapes: ['Dans 1 L, il y a 300 mg de sels minéraux.', 'Dans 1,5 L : 300 × 1,5 = 450 mg.', 'La bouteille contient 450 mg de sels minéraux, soit 0,45 g.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le résidu sec', explication: "Il est donné en mg/L : c'est la masse de sels minéraux dans un litre." },
    { etape: 2, titre: 'Repérer le volume', explication: "Exprime-le en litres : 50 cL = 0,5 L ; 33 cL = 0,33 L." },
    { etape: 3, titre: 'Multiplier', explication: "Masse = résidu sec × volume." },
    { etape: 4, titre: 'Donner l\'unité', explication: "Le résultat est en mg ; divise par 1 000 pour l'obtenir en g." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Pur : un seul constituant.', 'Le résidu sec est une masse de sels minéraux.', 'Le sulfate de cuivre anhydre est blanc.']),

    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Interprète le test :',
      generer() {
        const [nom, eau] = pick(LIQUIDES_TEST);
        return { enonce: `On dépose une goutte de ${nom} sur du sulfate de cuivre anhydre. La poudre ${eau ? 'devient bleue' : 'reste blanche'}. Que peut-on en conclure ?`, choix: ["ce liquide contient de l'eau", "ce liquide ne contient pas d'eau", 'ce liquide est de l\'eau pure'], correct: eau ? 0 : 1, ordre_fixe: true, _v: { nom, eau } };
      },
      indices: ['Blanc au départ.', 'Bleu : présence d\'eau.', 'Le test ne dit pas si l\'eau est pure.'],
      correction_etapes: (st) => [st._v.eau ? 'La poudre bleuit : le liquide <strong>contient de l\'eau</strong>.' : "La poudre reste blanche : le liquide <strong>ne contient pas d'eau</strong>.", "Ce test détecte la présence d'eau ; il ne prouve pas qu'elle est pure."],
    },

    exoVraiFaux('e03', 1, [
      ["L'eau du robinet est de l'eau pure.", false, 'Non : elle contient des sels minéraux dissous. C\'est un mélange.'],
      ['Le sulfate de cuivre anhydre est blanc.', true, 'Oui, et il bleuit au contact de l\'eau.'],
      ['Une eau limpide est forcément pure.', false, 'Non : les sels minéraux dissous sont invisibles.'],
      ['Le gaz des boissons pétillantes est le dioxyde de carbone.', true, 'Oui : il trouble l\'eau de chaux.'],
      ['Une eau potable ne contient aucun sel minéral.', false, 'Non : elle en contient, sans danger pour la santé.'],
      ['Le résidu sec s\'exprime en milligrammes par litre.', true, 'Oui : c\'est la masse de sels minéraux par litre d\'eau.'],
      ["Le lait contient de l'eau.", true, 'Oui : il fait bleuir le sulfate de cuivre anhydre.'],
    ], ['Limpide ne veut pas dire pur.', 'Blanc → bleu : il y a de l\'eau.', 'Eau de chaux troublée : dioxyde de carbone.']),

    exoOrdonner('e04', 1, [
      { consigne: "Remets dans l'ordre le test de présence d'eau :", etapes: ['Mettre ses lunettes de protection', 'Déposer un peu de sulfate de cuivre anhydre dans une coupelle', 'Verser une goutte du liquide à tester sur la poudre', 'Observer la couleur de la poudre', "Conclure : bleu, le liquide contient de l'eau"] },
      { consigne: "Remets dans l'ordre l'identification du gaz d'une boisson pétillante :", etapes: ['Agiter ou chauffer doucement la boisson', "Recueillir le gaz par déplacement d'eau", "Ajouter de l'eau de chaux dans le tube de gaz", 'Agiter et observer', "Conclure : l'eau de chaux se trouble, c'est du dioxyde de carbone"] },
    ], ['La sécurité d\'abord.', 'On observe avant de conclure.', 'Il faut recueillir le gaz avant de le tester.']),

    exoClasser('e05', 2, 'Corps pur ou mélange ?', [
      ["l'eau distillée", 'corps pur'], ['le dioxygène', 'corps pur'], ['le sucre', 'corps pur'],
      ["l'eau du robinet", 'mélange'], ['une eau minérale', 'mélange'], ["l'eau de mer", 'mélange'], ['un soda', 'mélange'], ["l'air", 'mélange'],
    ], ['corps pur', 'mélange'], { 'corps pur': 'Un seul constituant.', mélange: 'Plusieurs constituants, même s\'ils sont invisibles.' },
    ['L\'eau distillée ne contient que de l\'eau.', 'Une eau minérale contient des sels minéraux.', 'L\'air est un mélange de gaz.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule la masse de sels minéraux :',
      generer() {
        const rs = pick([40, 130, 300, 480, 1200]), v = pick([0.5, 1.5, 2]);
        return { enonce: `Étiquette inventée pour l'exercice. Une eau minérale a un résidu sec de ${rs} mg/L. Quelle masse de sels minéraux contient une bouteille de ${dec(v)} L ?`, ...grandeur(rs * v, 'mg', { pieges: [{ valeur: rs / v, message: 'Masse = résidu sec × volume : on multiplie.' }] }), _v: { rs, v } };
      },
      indices: ['Le résidu sec est la masse de sels minéraux dans 1 L.', 'Masse = résidu sec × volume.', 'Le volume est en litres, la masse en mg.'],
      correction_etapes: (st) => [`Dans 1 L : ${st._v.rs} mg de sels minéraux.`, `Dans ${dec(st._v.v)} L : ${st._v.rs} × ${dec(st._v.v)} = <strong>${dec(st._v.rs * st._v.v)} mg</strong>.`],
    },

    exoDocument('e07', 2, 'Compare deux étiquettes.', [
      () => {
        const a = pick([40, 60, 130]), b = pick([850, 1100, 2100]);
        return {
          enonce: "Étiquettes inventées pour l'exercice." + tableau([['', 'Eau A', 'Eau B'], ['Calcium (mg/L)', dec(a * 0.2), dec(b * 0.25)], ['Magnésium (mg/L)', dec(a * 0.1), dec(b * 0.05)], ['Résidu sec (mg/L)', a, b]]),
          questions: [
            choix('Quelle eau est la plus minéralisée ?', "l'eau B", "l'eau A", 'elles sont identiques'),
            nombre('Combien de mg de sels minéraux un litre d\'eau B contient-il de plus qu\'un litre d\'eau A ?', b - a, { unite: 'mg' }),
            choix('Ces deux eaux sont :', 'des mélanges', 'des corps purs', 'de l\'eau distillée'),
          ],
          correction: [`Résidu sec de ${b} mg/L contre ${a} mg/L : <strong>l'eau B</strong>.`, `${b} − ${a} = <strong>${b - a} mg</strong>.`, 'Elles contiennent de l\'eau et des sels minéraux dissous : ce sont des <strong>mélanges</strong>.'],
        };
      },
    ], ['Compare les résidus secs.', 'Une différence se calcule par une soustraction.', 'Plusieurs constituants : mélange.']),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Mesure la masse de gaz dissous :',
      generer() {
        const m1 = randInt(3400, 3600) / 10, dm = pick([1.2, 1.8, 2.4, 3]);
        return { enonce: `Mesures inventées pour l'exercice. Une bouteille de boisson pétillante ouverte pèse ${dec(m1)} g. On l'agite longuement jusqu'à ce qu'il n'y ait plus de bulles : elle pèse alors ${dec(m1 - dm)} g. Quelle masse de gaz s'est échappée ?`, ...grandeur(dm, 'g', { tolerance: 0.01 }), _v: { m1, dm } };
      },
      indices: ['Le gaz parti a une masse.', 'Masse de gaz = masse avant − masse après.', 'Donne le résultat en grammes.'],
      correction_etapes: (st) => [`Masse de gaz = ${dec(st._v.m1)} − ${dec(st._v.m1 - st._v.dm)}.`, `Soit <strong>${dec(st._v.dm)} g</strong> de dioxyde de carbone : un gaz a une masse.`],
    },

    exoDocument('e09', 3, 'Choisis une eau adaptée.', [
      () => {
        const eaux = [['A', pick([25, 35])], ['B', pick([310, 480])], ['C', pick([1100, 2100])]];
        return {
          enonce: "Étiquettes inventées pour l'exercice. Pour préparer un biberon, on conseille une eau faiblement minéralisée." + tableau([['Eau', ...eaux.map((e) => e[0])], ['Résidu sec (mg/L)', ...eaux.map((e) => e[1])]]),
          questions: [
            choix('Quelle eau convient le mieux pour le biberon ?', "l'eau A", "l'eau B", "l'eau C"),
            nombre(`Quelle masse de sels minéraux contient un biberon de 0,2 L préparé avec l'eau A, en mg ?`, eaux[0][1] * 0.2, { unite: 'mg', tolerance: 0.05 }),
            choix("L'eau A est-elle de l'eau pure ?", 'non : elle contient encore des sels minéraux', 'oui : elle est peu minéralisée', 'oui : elle est limpide'),
          ],
          correction: [`L'eau A a le plus petit résidu sec (${eaux[0][1]} mg/L) : c'est la <strong>moins minéralisée</strong>.`, `${eaux[0][1]} × 0,2 = <strong>${dec(eaux[0][1] * 0.2)} mg</strong>.`, 'Même faiblement minéralisée, elle reste un <strong>mélange</strong>.'],
        };
      },
    ], ['Faiblement minéralisée : petit résidu sec.', 'Masse = résidu sec × volume.', 'Pure : aucun autre constituant que l\'eau.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: "Au contact de l'eau, le sulfate de cuivre anhydre devient :", choix: ['bleu', 'blanc', 'rouge', 'noir'], correct: 0, explication: 'Il est blanc tant qu\'il est sec.' },
    { type: 'qcm', question: 'Une eau minérale est :', choix: ['un mélange homogène', 'un corps pur', 'un mélange hétérogène', 'un gaz'], correct: 0, explication: 'Elle contient des sels minéraux dissous, invisibles.' },
    { type: 'vrai_faux', question: 'Le gaz dissous dans une eau pétillante est le dioxyde de carbone.', reponse: true, explication: 'Il trouble l\'eau de chaux.' },
    {
      type: 'saisie', question: 'Résidu sec.',
      generer() { const rs = pick([100, 300, 500]); return { question: `Une eau a un résidu sec de ${rs} mg/L. Quelle masse de sels minéraux contient une bouteille de 2 L ?`, ...grandeur(rs * 2, 'mg'), explication: `${rs} × 2 = ${rs * 2} mg.` }; },
    },
    { type: 'qcm', question: "Pour identifier le dioxyde de carbone, on utilise :", choix: ["l'eau de chaux", 'le sulfate de cuivre anhydre', 'une balance', 'un thermomètre'], correct: 0, explication: 'Elle se trouble en présence de ce gaz.' },
    { type: 'vrai_faux', question: 'Une eau potable est une eau pure.', reponse: false, explication: 'Elle contient des sels minéraux.' },
  ],
};
