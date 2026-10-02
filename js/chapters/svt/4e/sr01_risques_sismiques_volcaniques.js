// =====================================================================
//  sr01_risques_sismiques_volcaniques.js — SVT 4ᵉ : les risques sismiques
//  et volcaniques. Séisme (foyer, épicentre, ondes, magnitude), éruptions
//  effusives et explosives, aléa, enjeux, risque, prévention.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 2.
//  Valeurs vérifiées (voir js/sources.js) : Wikipédia, article « Séisme ».
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoLegender, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { seisme, schemaSeisme, PARTIES_SEISME } from '../figures.js';

const DEFINITIONS = [
  ['un séisme', "Secousses du sol provoquées par une rupture brutale de roches en profondeur."],
  ['le foyer', "Lieu, en profondeur, où les roches se rompent lors d'un séisme."],
  ["l'épicentre", 'Point de la surface situé à la verticale du foyer.'],
  ['la magnitude', "Mesure de l'énergie libérée par un séisme."],
  ['le magma', 'Mélange de roche fondue et de gaz, qui remonte vers la surface lors d\'une éruption.'],
  ["l'aléa", "Probabilité qu'un phénomène naturel dangereux se produise à un endroit."],
  ['le risque', "Danger qui résulte de la rencontre entre un aléa et des enjeux : personnes, bâtiments, activités."],
];

export default {
  id: 'sr01',
  titre: 'Les risques sismiques et volcaniques',
  theme: 'svt_terre', niveau: '4e',
  icone: '🌋',

  intro:
    "On enregistre environ cent mille séismes par an dans le monde ; la plupart passent inaperçus. Quelques-uns, et certaines éruptions volcaniques, provoquent des catastrophes. " +
    "On apprend à <strong>décrire ces phénomènes</strong>, puis à distinguer l'<strong>aléa</strong> du <strong>risque</strong> pour comprendre comment se protéger.",

  cours: [
    {
      type: 'definition', titre: 'Un séisme',
      contenu: "En profondeur, des roches soumises à des contraintes finissent par se rompre brutalement le long d'une <strong>faille</strong>. Le lieu de la rupture est le <strong>foyer</strong>. Des <strong>ondes sismiques</strong> en partent dans toutes les directions et font trembler le sol. " +
        "L'<strong>épicentre</strong> est le point de la surface situé à la verticale du foyer : les secousses y sont les plus fortes.",
    },
    { type: 'figure', titre: 'Un séisme en coupe', contenu: 'Déclenche le séisme et observe la propagation des ondes.', render: (host) => seisme(host) },
    {
      type: 'propriete', titre: 'Mesurer un séisme',
      contenu: "La <strong>magnitude</strong> mesure l'énergie libérée au foyer ; elle se calcule à partir des enregistrements des sismomètres. Quand la magnitude augmente d'une unité, l'amplitude des ondes est multipliée par 10. " +
        "L'<strong>intensité</strong>, elle, décrit les effets observés en surface (dégâts aux bâtiments) : elle diminue quand on s'éloigne de l'épicentre.",
    },
    {
      type: 'definition', titre: 'Deux types d\'éruptions',
      contenu: "Lors d'une éruption, du <strong>magma</strong> remonte et arrive en surface. Si la lave est fluide, elle s'écoule en coulées : l'éruption est <strong>effusive</strong>. Si la lave est visqueuse, les gaz restent piégés puis s'échappent violemment, avec des projections de cendres et des nuées ardentes : l'éruption est <strong>explosive</strong>, beaucoup plus dangereuse.",
    },
    {
      type: 'definition', titre: 'Aléa, enjeux, risque',
      contenu: "L'<strong>aléa</strong> est la probabilité qu'un phénomène se produise à un endroit. Les <strong>enjeux</strong> sont les personnes et les biens exposés. Le <strong>risque</strong> naît de leur rencontre : un séisme en plein désert présente un aléa fort mais un risque faible.",
    },
    {
      type: 'propriete', titre: 'Prévenir',
      contenu: "On ne sait pas prévoir la date d'un séisme. On réduit le risque par des <strong>constructions parasismiques</strong>, des exercices d'évacuation et l'information de la population. Les volcans, eux, sont <strong>surveillés</strong> (petits séismes, gaz, déformation du sol), ce qui permet souvent d'évacuer à temps.",
    },
    {
      type: 'exemple', enonce: "Deux séismes de même magnitude frappent une région inhabitée et une grande ville. Où le risque est-il le plus élevé ?",
      solution_etapes: ["Même magnitude : l'aléa est comparable.", 'Dans la région inhabitée, il n\'y a presque pas d\'enjeux.', 'Dans la ville, de nombreuses personnes et constructions sont exposées : le risque y est bien plus élevé.'],
    },
  ],

  methode: [
    { etape: 1, titre: "Évaluer l'aléa", explication: "Le phénomène est-il probable à cet endroit ? Fréquent ? Violent ?" },
    { etape: 2, titre: 'Recenser les enjeux', explication: "Combien de personnes, quels bâtiments, quelles activités sont exposés ?" },
    { etape: 3, titre: 'En déduire le risque', explication: "Aléa fort et enjeux forts : risque élevé. Si l'un des deux est faible, le risque l'est aussi." },
    { etape: 4, titre: 'Proposer des mesures', explication: "On ne peut pas supprimer l'aléa : on agit sur les enjeux (construire mieux, informer, évacuer)." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Foyer : en profondeur. Épicentre : en surface.', 'La magnitude mesure l\'énergie.', 'Risque = aléa et enjeux.']),

    exoLegender('e02', 1, 'Légende cette coupe.', PARTIES_SEISME, schemaSeisme, ['volcan', 'magma'],
      ['Le foyer est en profondeur, là où la roche casse.', 'L\'épicentre est en surface, juste au-dessus.', 'Les ondes forment des cercles autour du foyer.'],
      { foyer: 'lieu de la rupture, en profondeur', épicentre: 'point de la surface à la verticale du foyer', faille: 'cassure le long de laquelle les roches se déplacent', 'ondes sismiques': 'vibrations qui se propagent dans toutes les directions' }),

    exoVraiFaux('e03', 1, [
      ["L'épicentre se trouve en profondeur.", false, 'Non : c\'est le foyer qui est en profondeur. L\'épicentre est en surface, à sa verticale.'],
      ['Les ondes sismiques se propagent dans toutes les directions.', true, 'Oui, à partir du foyer.'],
      ['On sait prévoir la date exacte d\'un séisme.', false, 'Non : on ne peut que réduire ses conséquences.'],
      ['Une éruption explosive est plus dangereuse qu\'une éruption effusive.', true, 'Oui : cendres et nuées ardentes se déplacent vite et loin.'],
      ['Un aléa fort entraîne toujours un risque fort.', false, 'Non : sans enjeux exposés, le risque reste faible.'],
      ['Les secousses sont les plus fortes à l\'épicentre.', true, 'Oui : c\'est le point de la surface le plus proche du foyer.'],
      ['Les volcans actifs sont surveillés par des instruments.', true, 'Oui : séismes, gaz et déformations annoncent souvent une éruption.'],
      ['La plupart des séismes ne sont pas ressentis.', true, 'Oui : on en enregistre environ cent mille par an.'],
    ], ['Foyer en profondeur, épicentre en surface.', 'Le risque dépend aussi des enjeux.', 'Une lave visqueuse piège les gaz.']),

    exoClasser('e04', 2, 'Éruption effusive ou explosive ?', [
      ['lave fluide', 'effusive'], ['longues coulées de lave', 'effusive'], ['les gaz s\'échappent facilement', 'effusive'],
      ['lave visqueuse', 'explosive'], ['nuées ardentes', 'explosive'], ['projections de cendres à haute altitude', 'explosive'], ['les gaz restent piégés puis s\'échappent violemment', 'explosive'],
    ], ['effusive', 'explosive'], { effusive: 'La lave fluide laisse partir les gaz : elle s\'écoule.', explosive: 'La lave visqueuse retient les gaz : la pression monte jusqu\'à l\'explosion.' },
    ['Fluide : ça coule.', 'Visqueuse : les gaz sont piégés.', 'Les nuées ardentes accompagnent les explosions.'], 4),

    exoClasser('e05', 2, 'Aléa ou enjeu ?', [
      ['une faille active passe sous la région', 'aléa'], ['un volcan actif domine la vallée', 'aléa'], ['des séismes s\'y produisent souvent', 'aléa'],
      ['une ville de 200 000 habitants', 'enjeu'], ['un hôpital', 'enjeu'], ['une école', 'enjeu'], ['une autoroute', 'enjeu'],
    ], ['aléa', 'enjeu'], { aléa: 'Ce sont des phénomènes naturels susceptibles de se produire.', enjeu: 'Ce sont les personnes et les biens exposés.' },
    ['L\'aléa est le phénomène naturel.', 'L\'enjeu est ce qui peut être touché.', 'Une faille, un volcan : aléa.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Compare deux séismes :',
      generer() {
        const m = pick([4, 5, 6]), k = pick([1, 2, 3]);
        return { enonce: `Quand la magnitude augmente d'une unité, l'amplitude des ondes est multipliée par 10. Par combien l'amplitude des ondes est-elle multipliée entre un séisme de magnitude ${m} et un séisme de magnitude ${m + k} ?`, reponse: 10 ** k, validation: 'nombre', pieges: [{ valeur: 10 * k, message: 'Chaque unité multiplie par 10 : les effets se multiplient, ils ne s\'additionnent pas.' }], _v: { m, k } };
      },
      indices: ['Compte le nombre d\'unités d\'écart.', 'Chaque unité multiplie par 10.', 'Deux unités : 10 × 10.'],
      correction_etapes: (st) => [`Écart : ${st._v.m + st._v.k} − ${st._v.m} = ${st._v.k} unité${st._v.k > 1 ? 's' : ''}.`, `${Array(st._v.k).fill(10).join(' × ')} = <strong>${10 ** st._v.k}</strong>.`],
    },

    exoSituation('e07', 2, 'Où le risque est-il le plus élevé ?', [
      ["Zone A : séismes fréquents, région désertique. Zone B : séismes fréquents, grande ville aux immeubles anciens. Zone C : aucun séisme connu, grande ville.", 'Dans la zone B : aléa fort et enjeux forts.', "Dans la zone A : c'est là que la terre tremble.", 'Dans la zone C : c\'est la plus peuplée.'],
      ["Volcan A : éruptions effusives, village à 30 km. Volcan B : éruptions explosives, ville au pied du volcan. Volcan C : éteint depuis très longtemps, ville au pied.", 'Près du volcan B : aléa fort et nombreux habitants exposés.', 'Près du volcan C : il y a une ville.', 'Près du volcan A : la lave coule loin.'],
      ["Deux villes subissent le même séisme. Dans la première, les bâtiments sont parasismiques ; dans la seconde, non.", 'Dans la seconde : ses bâtiments sont plus vulnérables.', 'Dans la première : elle est mieux équipée.', 'Le risque est identique.'],
    ], ['Le risque combine l\'aléa et les enjeux.', 'Pas d\'habitants : peu d\'enjeux.', 'Des bâtiments fragiles augmentent les dégâts.'], 'Risque élevé = aléa fort et enjeux nombreux ou vulnérables.'),

    exoOrdonner('e08', 2, [
      { consigne: "Remets dans l'ordre le déroulement d'un séisme :", etapes: ['Des contraintes s\'accumulent dans les roches en profondeur', 'Les roches cassent brutalement au foyer', 'Des ondes sismiques partent dans toutes les directions', "Les ondes atteignent la surface à l'épicentre", 'Le sol tremble et les constructions vibrent'] },
      { consigne: "Remets dans l'ordre le déroulement d'une éruption :", etapes: ['Du magma se forme en profondeur', 'Le magma remonte vers la surface', 'Les gaz se séparent de la roche fondue', 'La lave et les gaz sortent par le cratère', 'En refroidissant, la lave devient une roche volcanique'] },
    ], ['Tout commence en profondeur.', 'Les ondes partent du foyer.', 'Ce qu\'on observe en surface vient en dernier.']),

    exoDocument('e09', 3, 'Analyse ces relevés.', [
      () => {
        const d = [[10, 8], [50, 6], [150, 4], [300, 2]];
        return {
          enonce: "Relevés inventés pour l'exercice. Après un séisme, on note l'intensité des dégâts dans quatre villes, sur une échelle de 1 (non ressenti) à 12 (destruction totale)." +
            tableau([['Ville', 'A', 'B', 'C', 'D'], ["Distance à l'épicentre (km)", ...d.map((x) => x[0])], ['Intensité', ...d.map((x) => x[1])]]),
          questions: [
            choix("Quand on s'éloigne de l'épicentre, l'intensité :", 'diminue', 'augmente', 'reste la même'),
            nombre('Quelle est la différence d\'intensité entre la ville A et la ville D ?', 6),
            choix('La magnitude du séisme, elle :', 'est la même pour les quatre villes', 'est plus forte à l\'épicentre', 'dépend de la ville'),
          ],
          correction: ["De 8 à 2 : l'intensité <strong>diminue</strong> avec la distance.", '8 − 2 = <strong>6</strong>.', "La magnitude mesure l'énergie libérée au foyer : il n'y en a <strong>qu'une par séisme</strong>."],
        };
      },
    ], ['Lis la ligne « intensité » de gauche à droite.', 'L\'intensité décrit les dégâts en un lieu.', 'La magnitude caractérise le séisme lui-même.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le foyer d\'un séisme est :', choix: ['le lieu de la rupture, en profondeur', 'le point de la surface le plus touché', 'un type de volcan', 'un instrument de mesure'], correct: 0, explication: 'L\'épicentre est à sa verticale, en surface.' },
    { type: 'qcm', question: 'La magnitude mesure :', choix: ["l'énergie libérée par le séisme", 'les dégâts dans une ville', 'la profondeur du foyer', 'la durée du séisme'], correct: 0, explication: 'Les dégâts, eux, sont décrits par l\'intensité.' },
    { type: 'qcm', question: 'Une éruption explosive est liée à une lave :', choix: ['visqueuse', 'fluide', 'froide', 'absente'], correct: 0, explication: 'Elle retient les gaz jusqu\'à l\'explosion.' },
    { type: 'vrai_faux', question: 'Le risque dépend à la fois de l\'aléa et des enjeux.', reponse: true, explication: 'Sans enjeux exposés, pas de risque.' },
    { type: 'qcm', question: 'Pour réduire le risque sismique, on peut :', choix: ['construire des bâtiments parasismiques', 'empêcher les séismes', 'boucher les failles', 'prévoir leur date'], correct: 0, explication: 'On agit sur les enjeux, pas sur l\'aléa.' },
    { type: 'vrai_faux', question: "L'épicentre est le point de la surface situé à la verticale du foyer.", reponse: true, explication: 'Les secousses y sont les plus fortes.' },
  ],
};
