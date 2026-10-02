// =====================================================================
//  sv09_equilibre_alimentaire.js — SVT 5ᵉ : régimes et équilibre
//  alimentaire. Besoins de l'organisme, groupes d'aliments, apports
//  énergétiques, conséquences des excès et des carences.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 24.
//  Valeurs vérifiées (voir js/sources.js) : 17 kJ par gramme de glucides
//  ou de protides, 37 kJ par gramme de lipides. Les étiquettes et les
//  repas des exercices sont inventés.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { assiette } from '../figures.js';

const DEFINITIONS = [
  ['un besoin nutritionnel', "Quantité d'énergie et de nutriments nécessaire au bon fonctionnement de l'organisme."],
  ['les glucides', 'Famille de nutriments qui apporte surtout de l\'énergie : sucres, amidon du pain et des pâtes.'],
  ['les lipides', "Famille de nutriments présente dans les matières grasses ; très riche en énergie."],
  ['les protides', "Famille de nutriments qui sert surtout à construire et à réparer l'organisme : viande, poisson, œuf, légumes secs."],
  ['une carence', "Manque d'un élément indispensable dans l'alimentation."],
  ["l'équilibre alimentaire", "Situation où les apports de l'alimentation couvrent les besoins, sans excès ni manque."],
];

export default {
  id: 'sv09',
  titre: 'Régimes et équilibre alimentaire',
  theme: 'svt_corps', niveau: '5e',
  icone: '🥗',

  intro:
    "On ne mange pas la même chose à Tokyo, à Dakar ou à Paris, et pourtant chaque régime peut couvrir les besoins du corps. " +
    "On apprend ce dont l'organisme a besoin, à lire une <strong>étiquette</strong>, à calculer un <strong>apport d'énergie</strong> et à repérer ce qui déséquilibre un repas.",

  cours: [
    {
      type: 'definition', titre: "Les besoins de l'organisme",
      contenu: "L'organisme a besoin d'<strong>énergie</strong> pour fonctionner, de matière pour grandir et se réparer, d'eau, de vitamines et de sels minéraux. Les besoins en énergie dépendent de l'âge, du sexe et surtout de l'<strong>activité physique</strong>.",
    },
    {
      type: 'definition', titre: 'Trois familles de nutriments',
      contenu: "Les <strong>glucides</strong> (pain, pâtes, sucre) et les <strong>lipides</strong> (huile, beurre) apportent surtout de l'énergie. Les <strong>protides</strong> (viande, poisson, œuf, légumes secs) servent surtout à construire l'organisme.",
    },
    {
      type: 'propriete', titre: "L'énergie des nutriments",
      contenu: "L'énergie se mesure en kilojoules (kJ). Un gramme de glucides ou de protides apporte 17 kJ ; un gramme de lipides en apporte 37, soit plus du double.",
      formule: '\\text{énergie (kJ)} = 17 \\times m_{\\text{glucides}} + 17 \\times m_{\\text{protides}} + 37 \\times m_{\\text{lipides}}',
    },
    {
      type: 'propriete', titre: 'Les groupes d\'aliments',
      contenu: "Un repas équilibré associe des <strong>féculents</strong>, des <strong>fruits et légumes</strong>, un <strong>produit laitier</strong>, une part de <strong>viande, poisson ou œuf</strong> (ou de légumes secs) et de l'<strong>eau</strong>. Les matières grasses et les produits sucrés sont à limiter.",
    },
    { type: 'figure', titre: 'Compose ton repas', contenu: "Choisis des aliments : la figure t'indique les groupes qui manquent.", render: (host) => assiette(host) },
    {
      type: 'propriete', titre: 'Trop, ou pas assez',
      contenu: "Si les apports en énergie dépassent durablement les besoins, l'organisme stocke l'excédent sous forme de graisse : le risque de surpoids, de diabète et de maladies du cœur augmente. À l'inverse, une <strong>carence</strong> (en fer, en vitamines, en protides) provoque fatigue et maladies.",
    },
    {
      type: 'exemple', enonce: "Une barre de céréales contient 20 g de glucides, 2 g de protides et 5 g de lipides. Quelle énergie apporte-t-elle ?",
      solution_etapes: ['Glucides : 17 × 20 = 340 kJ.', 'Protides : 17 × 2 = 34 kJ. Lipides : 37 × 5 = 185 kJ.', 'Total : 340 + 34 + 185 = 559 kJ.'],
    },
  ],

  methode: [
    { etape: 1, titre: "Lire l'étiquette", explication: "Relève les masses de glucides, de lipides et de protides, pour la quantité indiquée (souvent 100 g)." },
    { etape: 2, titre: 'Calculer chaque apport', explication: "Glucides et protides : × 17. Lipides : × 37." },
    { etape: 3, titre: 'Additionner', explication: "L'énergie totale est la somme des trois apports." },
    { etape: 4, titre: 'Adapter à la portion', explication: "Pour 50 g au lieu de 100 g, divise par 2." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Glucides et lipides : surtout de l\'énergie.', 'Protides : construire l\'organisme.', 'Une carence est un manque.']),

    exoClasser('e02', 1, 'À quel groupe cet aliment appartient-il ?', [
      ['le pain', 'féculents'], ['les pâtes', 'féculents'], ['le riz', 'féculents'], ['les pommes de terre', 'féculents'],
      ['la pomme', 'fruits et légumes'], ['les haricots verts', 'fruits et légumes'], ['la tomate', 'fruits et légumes'],
      ['le yaourt', 'produits laitiers'], ['le fromage', 'produits laitiers'], ['le lait', 'produits laitiers'],
    ], ['féculents', 'fruits et légumes', 'produits laitiers'], { féculents: 'Riches en glucides, ils apportent de l\'énergie.', 'fruits et légumes': 'Ils apportent vitamines, fibres et eau.', 'produits laitiers': 'Ils apportent du calcium et des protides.' },
    ['Les féculents sont riches en amidon.', 'Les produits laitiers viennent du lait.', 'La pomme de terre est un féculent.'], 5),

    exoVraiFaux('e03', 1, [
      ['Un gramme de lipides apporte plus d\'énergie qu\'un gramme de glucides.', true, 'Oui : 37 kJ contre 17 kJ.'],
      ['Les besoins en énergie sont les mêmes pour tout le monde.', false, 'Non : ils dépendent de l\'âge, du sexe et de l\'activité physique.'],
      ["L'eau est la seule boisson indispensable.", true, 'Oui : l\'organisme en a besoin en permanence.'],
      ['Les protides servent surtout à construire et à réparer l\'organisme.', true, 'Oui.'],
      ['Manger trop gras et trop sucré augmente le risque de maladies.', true, 'Oui : surpoids, diabète, maladies du cœur.'],
      ['Une carence est un excès d\'un nutriment.', false, 'Non : c\'est un manque.'],
      ['Un sportif a besoin de plus d\'énergie qu\'une personne peu active.', true, 'Oui : ses muscles en dépensent davantage.'],
    ], ['Lipides : 37 kJ par gramme.', 'Les besoins dépendent de l\'activité.', 'Carence = manque.']),

    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: "Calcule l'énergie apportée :",
      generer() {
        const nut = pick([['glucides', 17], ['protides', 17], ['lipides', 37]]), m = pick([5, 10, 20, 30, 50]);
        return { enonce: `Un aliment contient ${m} g de ${nut[0]}. Quelle énergie ces ${nut[0]} apportent-ils, en kilojoules ?`, reponse: nut[1] * m, validation: 'nombre', unite: 'kJ', _v: { nut, m } };
      },
      indices: ['Glucides et protides : 17 kJ par gramme.', 'Lipides : 37 kJ par gramme.', 'Multiplie par la masse en grammes.'],
      correction_etapes: (st) => [`Un gramme de ${st._v.nut[0]} apporte ${st._v.nut[1]} kJ.`, `${st._v.nut[1]} × ${st._v.m} = <strong>${st._v.nut[1] * st._v.m} kJ</strong>.`],
    },

    exoDocument('e05', 2, 'Lis cette étiquette.', [
      () => {
        const g = pick([40, 50, 60]), l = pick([10, 20, 25]), p = pick([5, 10]);
        const e = 17 * g + 17 * p + 37 * l;
        return {
          enonce: "Étiquette inventée pour l'exercice. Valeurs pour 100 g de biscuits :" + tableau([['Glucides', `${g} g`], ['Lipides', `${l} g`], ['Protides', `${p} g`]]),
          questions: [
            nombre('Quelle énergie les glucides apportent-ils, en kJ ?', 17 * g, { unite: 'kJ' }),
            nombre('Quelle énergie les lipides apportent-ils, en kJ ?', 37 * l, { unite: 'kJ' }),
            nombre('Quelle est l\'énergie totale apportée par 100 g de ces biscuits, en kJ ?', e, { unite: 'kJ' }),
          ],
          correction: [`Glucides : 17 × ${g} = <strong>${17 * g} kJ</strong>.`, `Lipides : 37 × ${l} = <strong>${37 * l} kJ</strong>.`, `Protides : 17 × ${p} = ${17 * p} kJ. Total : ${17 * g} + ${37 * l} + ${17 * p} = <strong>${e} kJ</strong>.`],
        };
      },
    ], ['17 kJ par gramme de glucides et de protides.', '37 kJ par gramme de lipides.', 'N\'oublie pas les protides dans le total.']),

    exoClasser('e06', 2, 'Cet aliment apporte surtout…', [
      ['le sucre', 'des glucides'], ['le pain', 'des glucides'], ['les pâtes', 'des glucides'],
      ["l'huile", 'des lipides'], ['le beurre', 'des lipides'], ['la crème fraîche', 'des lipides'],
      ['le blanc de poulet', 'des protides'], ["le blanc d'œuf", 'des protides'], ['le poisson', 'des protides'],
    ], ['des glucides', 'des lipides', 'des protides'], { 'des glucides': 'Sucres et féculents.', 'des lipides': 'Matières grasses.', 'des protides': 'Viande, poisson, œuf.' },
    ['Les matières grasses sont des lipides.', 'Féculents et sucre : glucides.', 'Viande, poisson, œuf : protides.'], 4),

    exoDocument('e07', 2, 'Fais le bilan de la journée.', [
      () => {
        const besoin = pick([9000, 10000, 11000]), ecart = pick([-2000, -1000, 2000, 3000]), apport = besoin + ecart;
        const repas = [0.2, 0.35, 0.15, 0.3].map((k) => Math.round(apport * k));
        return {
          enonce: `Situation inventée pour l'exercice. Les besoins d'un collégien sont estimés à ${besoin} kJ par jour. Voici ce qu'il a mangé.` +
            tableau([['Repas', 'petit-déjeuner', 'déjeuner', 'goûter', 'dîner'], ['Énergie (kJ)', ...repas]]),
          questions: [
            nombre('Quelle énergie totale a-t-il absorbée dans la journée, en kJ ?', apport, { unite: 'kJ' }),
            { question: 'Ses apports sont :', choix: ['supérieurs à ses besoins', 'inférieurs à ses besoins'], correct: ecart > 0 ? 0 : 1, ordre_fixe: true },
            choix('Si cette situation se répète chaque jour, il risque :', ecart > 0 ? 'de prendre du poids' : 'de manquer d\'énergie et de maigrir', ecart > 0 ? 'de manquer d\'énergie et de maigrir' : 'de prendre du poids', 'rien du tout'),
          ],
          correction: [`${repas.join(' + ')} = <strong>${apport} kJ</strong>.`, `${apport} kJ pour un besoin de ${besoin} kJ : apports <strong>${ecart > 0 ? 'supérieurs' : 'inférieurs'}</strong> aux besoins.`, ecart > 0 ? "L'excédent d'énergie est stocké sous forme de graisse : <strong>prise de poids</strong>." : "L'organisme manque d'énergie et puise dans ses réserves : <strong>fatigue, amaigrissement</strong>."],
        };
      },
    ], ['Additionne les quatre repas.', 'Compare le total aux besoins.', 'Un excédent est stocké ; un manque épuise les réserves.']),

    exoSituation('e08', 2, 'Quel conseil donner ?', [
      ['Lina saute le petit-déjeuner et grignote des biscuits à 10 heures.', 'Prendre un petit-déjeuner : il évite le grignotage.', 'Continuer ainsi : cela fait un repas de moins.', 'Remplacer les biscuits par des bonbons.'],
      ['Noé boit un litre de soda par jour.', "Remplacer le soda par de l'eau : il apporte beaucoup de sucre.", 'Continuer : le soda hydrate aussi bien.', 'Passer à deux litres pour mieux s\'hydrater.'],
      ['Jade ne mange jamais de fruits ni de légumes.', 'En manger chaque jour : ils apportent vitamines et fibres.', 'Les remplacer par des pâtes.', 'Ne rien changer : ce n\'est pas utile.'],
      ['Tom, très sportif, mange autant que son frère sédentaire et se sent fatigué.', 'Manger davantage : ses besoins en énergie sont plus élevés.', 'Manger moins pour être plus léger.', 'Arrêter de boire pendant l\'effort.'],
    ], ['Les besoins dépendent de l\'activité.', 'L\'eau est la seule boisson indispensable.', 'Fruits et légumes : vitamines et fibres.'], 'Un bon régime couvre les besoins sans excès : varié, régulier, adapté à l\'activité.'),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: "Calcule l'énergie d'une portion :",
      generer() {
        const g = pick([20, 40, 60]), l = pick([10, 20]), p = pick([10, 20]), portion = pick([50, 200]);
        const e100 = 17 * g + 17 * p + 37 * l;
        return { enonce: `Étiquette inventée pour l'exercice. Pour 100 g, un aliment contient ${g} g de glucides, ${p} g de protides et ${l} g de lipides. Quelle énergie apporte une portion de ${portion} g, en kilojoules ?`, reponse: (e100 * portion) / 100, validation: 'nombre', unite: 'kJ', pieges: [{ valeur: e100, message: 'C\'est l\'énergie de 100 g : adapte à la portion demandée.' }], _v: { g, l, p, portion, e100 } };
      },
      indices: ['Calcule d\'abord l\'énergie pour 100 g.', 'Glucides et protides × 17, lipides × 37.', 'Puis adapte à la portion : 50 g est la moitié de 100 g, 200 g le double.'],
      correction_etapes: (st) => [`Pour 100 g : 17 × ${st._v.g} + 17 × ${st._v.p} + 37 × ${st._v.l} = ${st._v.e100} kJ.`, `Pour ${st._v.portion} g : ${st._v.e100} ${st._v.portion === 50 ? '÷ 2' : '× 2'} = <strong>${(st._v.e100 * st._v.portion) / 100} kJ</strong>.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Quel nutriment apporte le plus d\'énergie par gramme ?', choix: ['les lipides', 'les glucides', 'les protides', 'l\'eau'], correct: 0, explication: '37 kJ par gramme, contre 17 pour les glucides et les protides.' },
    { type: 'qcm', question: 'Les protides servent surtout à :', choix: ["construire et réparer l'organisme", 'hydrater', 'apporter des vitamines', 'donner du goût'], correct: 0, explication: 'On les trouve dans la viande, le poisson, les œufs, les légumes secs.' },
    {
      type: 'saisie', question: 'Énergie.',
      generer() { const m = pick([10, 20, 30]); return { question: `Quelle énergie, en kJ, apportent ${m} g de lipides ?`, reponse: 37 * m, validation: 'nombre', explication: `37 × ${m} = ${37 * m} kJ.` }; },
    },
    { type: 'vrai_faux', question: 'Les besoins en énergie dépendent de l\'activité physique.', reponse: true, explication: 'Un sportif dépense plus d\'énergie.' },
    { type: 'qcm', question: 'Des apports supérieurs aux besoins, jour après jour, entraînent :', choix: ['une prise de poids', 'une carence', 'un amaigrissement', 'aucun effet'], correct: 0, explication: 'L\'excédent d\'énergie est stocké sous forme de graisse.' },
    { type: 'vrai_faux', question: 'Les pâtes sont des féculents.', reponse: true, explication: 'Elles sont riches en amidon, un glucide.' },
  ],
};
