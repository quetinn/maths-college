// =====================================================================
//  sv01_terre_systeme_solaire.js — SVT 5ᵉ : la Terre dans le système
//  solaire. Planètes rocheuses et géantes, particularités de la Terre,
//  forme et mouvements (rotation, révolution, saisons).
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 1.
//  Valeurs vérifiées (voir js/sources.js) : Wikipédia, articles « Terre »
//  et « Système solaire ».
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { systemeSolaire } from '../figures.js';

const DEFINITIONS = [
  ['une étoile', 'Astre qui produit sa propre lumière, comme le Soleil.'],
  ['une planète', "Astre qui tourne autour d'une étoile et ne produit pas de lumière."],
  ['un satellite naturel', "Astre qui tourne autour d'une planète, comme la Lune autour de la Terre."],
  ['la rotation', "Mouvement d'un astre qui tourne sur lui-même."],
  ['la révolution', "Mouvement d'un astre qui tourne autour d'un autre astre."],
  ['une orbite', "Trajectoire d'un astre autour d'un autre."],
  ["l'atmosphère", "Enveloppe de gaz qui entoure une planète."],
];

/** Distance moyenne au Soleil, en unités astronomiques (1 UA = 150 millions de kilomètres). */
const DISTANCES = [['la Terre', 1], ['Jupiter', 5.2], ['Neptune', 30]];

export default {
  id: 'sv01',
  titre: 'La Terre dans le système solaire',
  theme: 'svt_terre', niveau: '5e',
  icone: '🌍',

  intro:
    "Huit planètes tournent autour du Soleil, mais une seule abrite la vie telle que nous la connaissons. " +
    "On situe la Terre parmi ses voisines, on cherche ce qui la rend <strong>habitable</strong>, et on explique par ses mouvements l'alternance du jour et de la nuit, puis celle des saisons.",

  cours: [
    {
      type: 'definition', titre: 'Le système solaire',
      contenu: "Le <strong>Soleil</strong> est une étoile. Huit <strong>planètes</strong> tournent autour de lui : Mercure, Vénus, la Terre, Mars, Jupiter, Saturne, Uranus et Neptune. " +
        "Le système solaire s'est formé il y a un peu moins de 4,6 milliards d'années.",
    },
    { type: 'figure', titre: 'Huit planètes autour du Soleil', contenu: "Observe les planètes sur leurs orbites, puis affiche seulement les planètes rocheuses ou les géantes.", render: (host) => systemeSolaire(host) },
    {
      type: 'propriete', titre: 'Deux familles de planètes',
      contenu: "Les quatre planètes les plus proches du Soleil (Mercure, Vénus, la Terre, Mars) sont <strong>rocheuses</strong> : petites, avec une surface solide. " +
        "Les quatre plus éloignées (Jupiter, Saturne, Uranus, Neptune) sont des <strong>géantes</strong>, formées surtout de gaz.",
    },
    {
      type: 'propriete', titre: 'Une planète habitable',
      contenu: "La Terre est à environ 150 millions de kilomètres du Soleil. À cette distance, et grâce à son <strong>atmosphère</strong>, sa température moyenne en surface est de 15 °C : l'<strong>eau y est liquide</strong>. " +
        "L'eau couvre environ 71 % de sa surface. L'atmosphère contient 78 % de diazote et 21 % de dioxygène.",
    },
    {
      type: 'definition', titre: 'Forme et mouvements de la Terre',
      contenu: "La Terre est une sphère d'environ 12 700 km de diamètre. Elle effectue une <strong>rotation</strong> sur elle-même en près de 24 heures : c'est l'alternance du jour et de la nuit. " +
        "Elle effectue une <strong>révolution</strong> autour du Soleil en un an (365 jours et un quart).",
    },
    {
      type: 'propriete', titre: "L'origine des saisons",
      contenu: "L'axe de rotation de la Terre est <strong>incliné</strong> d'environ 23°. Selon le moment de l'année, c'est l'hémisphère nord ou l'hémisphère sud qui est penché vers le Soleil et reçoit le plus d'énergie : c'est l'été dans cet hémisphère, l'hiver dans l'autre. " +
        "Les saisons ne sont pas dues à la distance entre la Terre et le Soleil.",
    },
    {
      type: 'exemple', enonce: "En juillet, c'est l'été en France. Quelle saison est-ce en Australie, dans l'hémisphère sud ? Pourquoi ?",
      solution_etapes: ["En juillet, l'hémisphère nord est penché vers le Soleil : il reçoit plus d'énergie, c'est l'été.", "Au même moment, l'hémisphère sud est penché à l'opposé du Soleil.", "En Australie, c'est donc l'hiver."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lire les grandeurs du tableau', explication: "Repère ce que donne chaque ligne (distance, type de planète) et dans quelle unité." },
    { etape: 2, titre: 'Comparer', explication: "Classe les planètes : la plus proche, la plus éloignée, les rocheuses, les géantes." },
    { etape: 3, titre: 'Convertir si besoin', explication: "1 UA (unité astronomique) vaut 150 millions de kilomètres : c'est la distance Terre-Soleil." },
    { etape: 4, titre: 'Conclure par une phrase', explication: "Relie la donnée à sa conséquence : « plus la planète est loin du Soleil, plus sa révolution est longue »." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Une étoile brille par elle-même.', 'Rotation : sur soi-même. Révolution : autour d\'un autre astre.', 'La Lune est un satellite de la Terre.']),

    exoClasser('e02', 1, 'Planète rocheuse ou planète géante ?', [
      ['Mercure', 'rocheuse'], ['Vénus', 'rocheuse'], ['la Terre', 'rocheuse'], ['Mars', 'rocheuse'],
      ['Jupiter', 'géante'], ['Saturne', 'géante'], ['Uranus', 'géante'], ['Neptune', 'géante'],
    ], ['rocheuse', 'géante'], { rocheuse: 'Les quatre planètes les plus proches du Soleil ont une surface solide.', géante: 'Les quatre plus éloignées sont formées surtout de gaz.' },
    ['Les planètes rocheuses sont les plus proches du Soleil.', 'Les géantes sont les plus éloignées.', 'La Terre et Mars sont voisines.']),

    exoVraiFaux('e03', 1, [
      ['Le Soleil est une étoile.', true, 'Oui : il produit sa propre lumière.'],
      ['La Terre est la planète la plus proche du Soleil.', false, 'Non : c\'est Mercure. La Terre est la troisième.'],
      ['La Terre tourne sur elle-même en un an.', false, 'Non : en près de 24 heures. C\'est sa révolution autour du Soleil qui dure un an.'],
      ["L'eau couvre la plus grande partie de la surface de la Terre.", true, 'Oui : environ 71 %.'],
      ["Les saisons sont dues à l'inclinaison de l'axe de la Terre.", true, 'Oui : chaque hémisphère est tour à tour penché vers le Soleil.'],
      ["En été, la Terre est plus proche du Soleil qu'en hiver : c'est la cause des saisons.", false, "Non : les saisons viennent de l'inclinaison de l'axe. D'ailleurs, c'est l'été dans un hémisphère quand c'est l'hiver dans l'autre."],
      ['Le système solaire compte huit planètes.', true, 'Oui : quatre rocheuses et quatre géantes.'],
      ["L'air contient 21 % de dioxygène.", true, 'Oui, et 78 % de diazote.'],
    ], ['Mercure est la première planète.', 'Rotation : 24 heures. Révolution : un an.', 'Pense à l\'hémisphère sud.']),

    exoOrdonner('e04', 2, [
      { consigne: 'Range les planètes rocheuses de la plus proche à la plus éloignée du Soleil :', etapes: ['Mercure', 'Vénus', 'la Terre', 'Mars'] },
      { consigne: 'Range les planètes géantes de la plus proche à la plus éloignée du Soleil :', etapes: ['Jupiter', 'Saturne', 'Uranus', 'Neptune'] },
      { consigne: 'Range ces planètes de la plus proche à la plus éloignée du Soleil :', etapes: ['Mercure', 'la Terre', 'Mars', 'Jupiter', 'Neptune'] },
    ], ['Mercure est la plus proche du Soleil.', 'La Terre est la troisième planète.', 'Neptune est la plus éloignée.']),

    exoRelier('e05', 2, 'Associe chaque mouvement à sa conséquence.', [
      ['la rotation de la Terre sur elle-même', "l'alternance du jour et de la nuit"], ['la révolution de la Terre autour du Soleil', "la durée de l'année"], ["l'inclinaison de l'axe de la Terre", 'les saisons'], ['la révolution de la Lune autour de la Terre', 'le mois lunaire'],
    ], ['Rotation : un tour sur soi-même en 24 heures.', 'Révolution : un tour autour du Soleil en un an.', 'Les saisons viennent de l\'axe incliné.']),

    exoDocument('e06', 2, 'Exploite ce tableau.', [
      () => {
        const [nom, ua] = pick(DISTANCES.slice(1));
        return {
          enonce: "L'unité astronomique (UA) est la distance entre la Terre et le Soleil : 1 UA = 150 millions de kilomètres." +
            tableau([['Planète', 'la Terre', 'Jupiter', 'Neptune'], ['Distance au Soleil (UA)', '1', '5,2', '30'], ['Type', 'rocheuse', 'géante', 'géante']]),
          questions: [
            nombre(`À combien de millions de kilomètres du Soleil se trouve ${nom} ?`, Math.round(ua * 150)),
            choix('Laquelle de ces trois planètes met le plus de temps à faire le tour du Soleil ?', 'Neptune', 'Jupiter', 'la Terre'),
            choix('Les planètes géantes sont :', 'plus éloignées du Soleil que la Terre', 'plus proches du Soleil que la Terre', 'à la même distance que la Terre'),
          ],
          correction: [`${String(ua).replace('.', ',')} × 150 = <strong>${Math.round(ua * 150)} millions de kilomètres</strong>.`, 'La plus éloignée, <strong>Neptune</strong>, a la plus longue orbite à parcourir.', 'Jupiter et Neptune sont à 5,2 et 30 UA : <strong>plus loin</strong> que la Terre (1 UA).'],
        };
      },
    ], ['1 UA = 150 millions de kilomètres.', 'Multiplie la distance en UA par 150.', 'Plus une planète est loin, plus son tour est long.']),

    exoClasser('e07', 2, 'La Terre ou une autre planète ?', [
      ['de l\'eau liquide couvre 71 % de sa surface', 'la Terre'], ['son atmosphère contient 21 % de dioxygène', 'la Terre'], ['sa température moyenne en surface est de 15 °C', 'la Terre'], ['c\'est la troisième planète à partir du Soleil', 'la Terre'],
      ['c\'est une planète géante formée surtout de gaz', 'une autre planète'], ['c\'est la planète la plus proche du Soleil', 'une autre planète'], ['c\'est la huitième planète à partir du Soleil', 'une autre planète'], ['elle se trouve à 30 UA du Soleil', 'une autre planète'],
    ], ['la Terre', 'une autre planète'], { 'la Terre': "Ces caractéristiques font de la Terre une planète habitable.", 'une autre planète': 'Ces caractéristiques ne correspondent pas à la Terre, planète rocheuse située à 1 UA du Soleil.' },
    ['La Terre est une planète rocheuse.', 'Elle est la troisième à partir du Soleil.', 'Elle seule possède de l\'eau liquide en surface.'], 4),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Calcule la durée du trajet de la lumière :',
      generer() {
        const [nom, ua] = pick(DISTANCES);
        const d = Math.round(ua * 150);
        return { enonce: `La lumière parcourt 300 000 km chaque seconde. ${nom === 'la Terre' ? 'La Terre' : nom} se trouve à ${d} millions de kilomètres du Soleil. Combien de secondes la lumière du Soleil met-elle pour l'atteindre ?`, reponse: (d * 1000) / 300 * 1, validation: 'nombre', unite: 's', _v: { nom, d } };
      },
      indices: ['Durée = distance ÷ vitesse.', 'Écris la distance en kilomètres : 150 millions = 150 000 000.', 'Divise par 300 000.'],
      correction_etapes: (st) => [`Distance : ${st._v.d} millions de kilomètres = ${st._v.d} 000 000 km.`, `Durée : ${st._v.d} 000 000 ÷ 300 000 = <strong>${(st._v.d * 1000) / 300} s</strong>${st._v.nom === 'la Terre' ? ', soit un peu plus de 8 minutes.' : '.'}`],
    },

    exoDocument('e09', 3, 'Explique les saisons.', [
      () => ({
        enonce: "L'axe de rotation de la Terre est incliné et garde toujours la même direction pendant sa révolution autour du Soleil. En juin, l'hémisphère nord est penché vers le Soleil. En décembre, c'est l'hémisphère sud.",
        questions: [
          choix('En juin, quelle saison débute dans l\'hémisphère nord ?', "l'été", "l'hiver", 'la même saison que dans l\'hémisphère sud'),
          choix('Au même moment, dans l\'hémisphère sud, c\'est :', "l'hiver", "l'été", 'le printemps'),
          choix('Si l\'axe de la Terre n\'était pas incliné :', "il n'y aurait pas de saisons marquées", 'les saisons seraient plus fortes', 'il ferait nuit en permanence'),
        ],
        correction: ["L'hémisphère penché vers le Soleil reçoit plus d'énergie : c'est l'<strong>été</strong> au nord.", "L'hémisphère sud est alors penché à l'opposé : c'est l'<strong>hiver</strong>.", "Sans inclinaison, chaque hémisphère recevrait la même énergie toute l'année : <strong>pas de saisons</strong>."],
      }),
    ], ['L\'hémisphère penché vers le Soleil reçoit plus d\'énergie.', 'Les deux hémisphères ont des saisons opposées.', 'La cause est l\'inclinaison de l\'axe.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Combien de planètes compte le système solaire ?', choix: ['8', '7', '9', '12'], correct: 0, explication: 'Quatre planètes rocheuses et quatre géantes.' },
    { type: 'qcm', question: 'La Terre est une planète :', choix: ['rocheuse', 'géante', 'gazeuse', 'sans atmosphère'], correct: 0, explication: 'Comme Mercure, Vénus et Mars.' },
    { type: 'qcm', question: "L'alternance du jour et de la nuit est due :", choix: ['à la rotation de la Terre sur elle-même', 'à la révolution de la Terre', 'à la Lune', 'aux saisons'], correct: 0, explication: 'La Terre fait un tour sur elle-même en près de 24 heures.' },
    { type: 'vrai_faux', question: "Les saisons s'expliquent par l'inclinaison de l'axe de la Terre.", reponse: true, explication: 'Chaque hémisphère est tour à tour penché vers le Soleil.' },
    { type: 'qcm', question: 'Ce qui rend la Terre habitable, c\'est notamment :', choix: ["la présence d'eau liquide", 'sa très grande taille', "l'absence d'atmosphère", 'sa proximité avec Jupiter'], correct: 0, explication: 'Sa distance au Soleil et son atmosphère permettent à l\'eau de rester liquide.' },
    { type: 'vrai_faux', question: 'Jupiter est plus proche du Soleil que la Terre.', reponse: false, explication: 'Jupiter est à 5,2 UA du Soleil, la Terre à 1 UA.' },
  ],
};
