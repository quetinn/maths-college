// =====================================================================
//  sr06_peuplement_milieux.js — SVT 4ᵉ : la reproduction et le peuplement
//  des milieux. Dissémination des graines et des spores, reproduction
//  asexuée, influence du milieu, dynamique des populations.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 14.
//  Les comptages des exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, fleche, schemaCourbe } from '../figures.js';

const DEFINITIONS = [
  ['la dissémination', "Transport des graines ou des spores loin de la plante qui les a produites."],
  ['une spore', "Cellule très légère qui, en germant, donne un nouvel individu chez les fougères, les mousses ou les champignons."],
  ['une population', "Ensemble des individus d'une même espèce vivant au même endroit."],
  ['la reproduction asexuée', "Reproduction à partir d'un seul individu, sans fécondation."],
  ['un stolon', "Tige rampante qui s'enracine plus loin et donne un nouveau plant, comme chez le fraisier."],
  ['coloniser un milieu', "S'installer dans un milieu où l'espèce était absente."],
];

const sol = '<rect x="0" y="150" width="320" height="30" class="sv-plein-brun"/>';
const plante = '<path d="M50 150 V90 M50 110 l-16 -12 M50 120 l16 -14" class="sv-trait"/><circle cx="50" cy="82" r="10" class="sv-plein-jaune"/>';
const SCENES = [
  ['Par le vent', `${sol}${plante}${fleche(70, 76, 230, 60, 'sv-f-bleu')}<circle cx="250" cy="58" r="4" class="sv-plein-brun"/><path d="M250 54 v-10 M246 46 h8 M244 50 l12 -8" class="sv-trait"/>`, "Les graines du pissenlit portent une aigrette, celles de l'érable une aile : le <strong>vent</strong> les emporte loin."],
  ['Par les animaux', `${sol}${plante}<ellipse cx="200" cy="120" rx="34" ry="18" class="sv-plein-gris"/><circle cx="238" cy="108" r="11" class="sv-plein-gris"/><circle cx="196" cy="110" r="4" class="sv-plein-brun"/>${fleche(70, 100, 160, 112, 'sv-f-accent')}`, "Certains fruits s'accrochent au pelage ; d'autres sont mangés, et leurs graines rejetées plus loin dans les excréments : les <strong>animaux</strong> les transportent."],
  ["Par l'eau", `<rect x="0" y="110" width="320" height="70" class="sv-mer"/>${fleche(60, 96, 230, 96, 'sv-f-bleu')}<circle cx="250" cy="104" r="12" class="sv-plein-brun"/>`, "La noix de coco flotte : l'<strong>eau</strong> peut la porter d'un rivage à l'autre."],
  ['Sans graine', `${sol}<path d="M70 150 V100 M70 120 l-14 -10 M70 126 l14 -10" class="sv-trait"/><path d="M70 146 Q150 110 220 146" class="sv-trait"/><path d="M220 150 V112 M220 130 l-12 -8 M220 134 l12 -8" class="sv-trait"/>`, "Le fraisier émet des <strong>stolons</strong> qui s'enracinent : une reproduction asexuée permet d'occuper très vite le terrain proche."],
];

export default {
  id: 'sr06',
  titre: 'La reproduction et le peuplement des milieux',
  theme: 'svt_vivant', niveau: '4e',
  icone: '🌬️',

  intro:
    "Une plante ne se déplace pas, et pourtant un terrain nu se couvre de végétation en quelques années. " +
    "On étudie comment les êtres vivants <strong>colonisent un milieu</strong>, et pourquoi le nombre d'individus d'une <strong>population</strong> augmente ou diminue selon les conditions.",

  cours: [
    {
      type: 'definition', titre: 'La dissémination',
      contenu: "Les plantes à fleurs produisent des graines, enfermées dans des fruits. Leur <strong>dissémination</strong> se fait par le vent, par les animaux ou par l'eau. Les fougères, les mousses et les champignons, eux, libèrent des <strong>spores</strong>, très légères.",
    },
    { type: 'figure', titre: 'Quatre façons de gagner du terrain', contenu: 'Parcours les modes de dissémination.', render: (host) => etapes(host, 'Mode', SCENES) },
    {
      type: 'propriete', titre: 'Deux stratégies',
      contenu: "La <strong>reproduction sexuée</strong> produit des descendants tous différents : certains pourront survivre si le milieu change. La <strong>reproduction asexuée</strong> produit rapidement de nombreux descendants identiques : elle permet d'envahir un milieu favorable. Beaucoup d'espèces utilisent les deux.",
    },
    {
      type: 'propriete', titre: "L'influence du milieu",
      contenu: "La reproduction dépend des conditions du milieu : température, lumière, eau, nourriture disponible. Beaucoup d'animaux ne se reproduisent qu'à la saison où leurs petits trouveront de quoi manger.",
    },
    {
      type: 'definition', titre: 'La dynamique des populations',
      contenu: "L'effectif d'une <strong>population</strong> augmente avec les naissances et diminue avec les morts. Il dépend de la nourriture, de la place, des prédateurs, des maladies et des activités humaines. Quand les ressources manquent, la population cesse de croître.",
    },
    {
      type: 'exemple', enonce: "Après un printemps très pluvieux, les campagnols d'une prairie trouvent beaucoup d'herbe. Comment évolue leur population ? Et celle des renards l'année suivante ?",
      solution_etapes: ['Nourriture abondante : les campagnols ont plus de petits, qui survivent mieux.', 'Leur population augmente.', 'Les renards, mieux nourris, élèvent à leur tour plus de petits : leur population augmente ensuite.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Décrire la courbe', explication: "L'effectif augmente, diminue ou se stabilise ? Sur quelle période ?" },
    { etape: 2, titre: 'Chercher la cause dans le milieu', explication: "Nourriture, prédateurs, climat, place disponible, action humaine." },
    { etape: 3, titre: 'Relier', explication: "Plus de nourriture : plus de naissances. Plus de prédateurs : plus de morts." },
    { etape: 4, titre: 'Conclure', explication: "« La population augmente parce que les naissances dépassent les morts. »" },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Disséminer : transporter au loin.', 'Une population : une espèce, un lieu.', 'Stolon : tige rampante.']),

    exoClasser('e02', 1, 'Comment cette graine ou ce fruit est-il transporté ?', [
      ['la graine à aigrette du pissenlit', 'par le vent'], ["le fruit ailé de l'érable", 'par le vent'], ['la graine très légère du peuplier', 'par le vent'],
      ['le fruit à crochets de la bardane', 'par les animaux'], ['la cerise, mangée par un merle', 'par les animaux'], ["le gland, enterré par un écureuil", 'par les animaux'],
      ['la noix de coco, qui flotte', "par l'eau"], ["la graine du nénuphar, qui flotte", "par l'eau"],
    ], ['par le vent', 'par les animaux', "par l'eau"], { 'par le vent': 'Ces graines sont légères ou munies d\'ailes.', 'par les animaux': 'Elles s\'accrochent au pelage ou sont mangées puis rejetées.', "par l'eau": 'Elles flottent.' },
    ['Une aile ou une aigrette : le vent.', 'Des crochets ou un fruit charnu : les animaux.', 'Ce qui flotte voyage par l\'eau.'], 4),

    exoVraiFaux('e03', 1, [
      ['Les fougères se reproduisent grâce à des spores.', true, 'Oui : elles n\'ont ni fleurs ni graines.'],
      ['La reproduction asexuée donne des descendants tous différents.', false, 'Non : ils sont identiques au parent.'],
      ['Une population est formée d\'individus d\'espèces différentes.', false, 'Non : d\'une seule espèce, dans un même lieu.'],
      ['Le manque de nourriture peut faire diminuer une population.', true, 'Oui : moins de naissances et plus de morts.'],
      ['Le vent peut transporter des graines.', true, 'Oui, quand elles sont légères ou ailées.'],
      ['La reproduction des êtres vivants ne dépend pas du milieu.', false, 'Si : température, lumière et nourriture l\'influencent.'],
      ['Un stolon permet au fraisier de se multiplier sans graine.', true, 'Oui : c\'est une reproduction asexuée.'],
    ], ['Spores : fougères, mousses, champignons.', 'Asexuée : copies identiques.', 'Une population : une seule espèce.']),

    exoClasser('e04', 2, 'Avantage de la reproduction sexuée ou asexuée ?', [
      ['des descendants tous différents', 'sexuée'], ['certains descendants résisteront à un changement du milieu', 'sexuée'], ['la diversité des individus augmente', 'sexuée'],
      ['un seul individu suffit', 'asexuée'], ['un milieu favorable est envahi très vite', 'asexuée'], ['les descendants sont identiques au parent', 'asexuée'],
    ], ['sexuée', 'asexuée'], { sexuée: 'La diversité aide l\'espèce à faire face aux changements.', asexuée: 'La rapidité permet d\'occuper un milieu favorable.' },
    ['Sexuée : diversité.', 'Asexuée : rapidité.', 'Un seul parent : asexuée.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre la colonisation d'un terrain nu par le pissenlit :", etapes: ['Un pissenlit fleurit dans un pré voisin', 'Ses graines à aigrette se forment', 'Le vent emporte les graines', 'Une graine tombe sur le terrain nu', 'Elle germe et donne un nouveau pissenlit'] },
    ], ['Il faut d\'abord des graines.', 'Le vent transporte.', 'La germination vient en dernier.']),

    exoDocument('e06', 2, "Décris l'évolution d'une population.", [
      () => {
        const p = [randInt(18, 24), randInt(40, 50), randInt(85, 95), randInt(96, 104), randInt(96, 104)];
        return {
          enonce: "Comptages inventés pour l'exercice. On introduit des lapins sur une petite île sans prédateur et on les compte chaque année.",
          visuel: (host) => { host.innerHTML = schemaCourbe(p.map((v, i) => [i, v]), { xLabel: 'années', yLabel: 'nombre de lapins', ymin: 0, ymax: 120 }); },
          questions: [
            nombre('Combien de lapins compte-t-on de plus à la fin de la deuxième année qu\'au départ ?', p[2] - p[0]),
            choix('Pendant les deux premières années, la population :', 'augmente rapidement', 'diminue', 'reste stable'),
            choix('Ensuite, elle se stabilise car :', "la nourriture et la place de l'île sont limitées", 'les lapins cessent de se reproduire par choix', 'un prédateur est arrivé'),
          ],
          correction: [`${p[2]} − ${p[0]} = <strong>${p[2] - p[0]} lapins</strong> de plus.`, 'Sans prédateur et avec de la nourriture, les naissances dépassent largement les morts : la population <strong>augmente</strong>.', "L'île ne peut pas nourrir plus de lapins : les <strong>ressources limitent</strong> la population."],
        };
      },
    ], ['Lis les points de la courbe.', 'Une courbe qui monte : la population augmente.', 'Un milieu ne peut nourrir qu\'un nombre limité d\'individus.']),

    exoSituation('e07', 2, 'Prévois l\'évolution de la population.', [
      ['Dans une forêt, un hiver très doux laisse beaucoup de glands au sol. Que devient la population de mulots au printemps ?', 'Elle augmente : la nourriture est abondante.', 'Elle diminue.', 'Elle ne change pas.'],
      ['On introduit des truites, qui mangent les têtards, dans une mare peuplée de grenouilles. Que devient la population de grenouilles ?', 'Elle diminue : plus de têtards sont mangés.', 'Elle augmente.', 'Elle ne change pas.'],
      ['Une sécheresse assèche la mare où pondent des libellules. Que devient leur population l\'année suivante ?', 'Elle diminue : il y a eu moins de pontes réussies.', 'Elle augmente.', 'Elle double.'],
      ['On replante des haies dans une plaine agricole. Que devient la population de mésanges, qui y nichent ?', 'Elle augmente : elles trouvent plus d\'endroits où nicher.', 'Elle diminue.', 'Elle disparaît.'],
    ], ['Plus de nourriture ou d\'abris : plus de naissances.', 'Plus de prédateurs : plus de morts.', 'Compare naissances et morts.'], "L'effectif d'une population dépend des ressources, des prédateurs et des conditions du milieu."),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Calcule une colonisation rapide :',
      generer() {
        const depart = pick([1, 2, 5]), n = pick([3, 4, 5]);
        return { enonce: `Situation inventée pour l'exercice. Sur une mare, des lentilles d'eau se multiplient sans graine : leur nombre double chaque semaine. On dépose ${depart} lentille${depart > 1 ? 's' : ''}. Combien y en a-t-il au bout de ${n} semaines ?`, reponse: depart * 2 ** n, validation: 'nombre', pieges: [{ valeur: depart * 2 * n, message: 'Le nombre double chaque semaine : on multiplie par 2 à chaque fois.' }], _v: { depart, n } };
      },
      indices: ['Doubler, c\'est multiplier par 2.', 'Recommence chaque semaine.', 'Écris la suite : départ, après 1 semaine, après 2 semaines…'],
      correction_etapes: (st) => [`${Array.from({ length: st._v.n + 1 }, (_, k) => st._v.depart * 2 ** k).join(' → ')}.`, `Au bout de ${st._v.n} semaines : <strong>${st._v.depart * 2 ** st._v.n} lentilles</strong>. La reproduction asexuée colonise très vite un milieu favorable.`],
    },

    exoDocument('e09', 3, 'Relie le milieu à la reproduction.', [
      () => {
        const t = [[8, 0], [12, randInt(2, 4)], [16, randInt(8, 10)], [20, randInt(11, 14)]];
        return {
          enonce: "Comptages inventés pour l'exercice. Au printemps, on relève dans des nichoirs le nombre moyen d'œufs pondus par des mésanges selon la température moyenne de la semaine." +
            tableau([['Température (°C)', ...t.map((x) => x[0])], ['Œufs pondus par couple', ...t.map((x) => x[1])]]),
          questions: [
            choix('Quand la température augmente, le nombre d\'œufs pondus :', 'augmente', 'diminue', 'ne change pas'),
            nombre('Combien d\'œufs de plus sont pondus à 20 °C qu\'à 12 °C ?', t[3][1] - t[1][1]),
            choix('Cet ajustement est utile car, quand il fait plus doux :', 'les chenilles qui nourrissent les oisillons sont plus nombreuses', 'les œufs gèlent plus facilement', 'les parents mangent moins'),
          ],
          correction: ["De 0 à plus de 10 œufs : la ponte <strong>augmente</strong> avec la température.", `${t[3][1]} − ${t[1][1]} = <strong>${t[3][1] - t[1][1]} œufs</strong> de plus.`, 'Les petits naissent quand la <strong>nourriture</strong> est abondante : le milieu influence la reproduction.'],
        };
      },
    ], ['Lis le tableau de gauche à droite.', 'Soustrais deux colonnes.', 'Les parents nourrissent leurs petits de chenilles.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La graine à aigrette du pissenlit est transportée par :', choix: ['le vent', "l'eau", 'les animaux', 'la plante elle-même'], correct: 0, explication: 'Son aigrette la rend très légère.' },
    { type: 'qcm', question: 'Une population est :', choix: ["un ensemble d'individus d'une même espèce vivant au même endroit", 'un ensemble d\'espèces différentes', 'un seul individu', 'un milieu de vie'], correct: 0, explication: 'Une espèce, un lieu.' },
    { type: 'vrai_faux', question: 'La reproduction asexuée permet de coloniser rapidement un milieu.', reponse: true, explication: 'Un seul individu produit vite de nombreuses copies.' },
    { type: 'qcm', question: 'La reproduction sexuée a l\'avantage de :', choix: ['produire des descendants tous différents', 'ne nécessiter qu\'un individu', 'donner des copies identiques', 'être toujours plus rapide'], correct: 0, explication: 'Cette diversité aide l\'espèce si le milieu change.' },
    { type: 'qcm', question: 'Une population augmente quand :', choix: ['les naissances dépassent les morts', 'les morts dépassent les naissances', 'la nourriture manque', 'les prédateurs sont nombreux'], correct: 0, explication: 'L\'effectif résulte du bilan entre naissances et morts.' },
    { type: 'vrai_faux', question: 'Les champignons se disséminent grâce à des spores.', reponse: true, explication: 'Comme les fougères et les mousses.' },
  ],
};
