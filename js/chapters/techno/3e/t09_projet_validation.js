// =====================================================================
//  t09_projet_validation.js — Technologie 3ᵉ : mener un projet et valider
//  une solution.
//  Repères de 3ᵉ du programme de 2024 : élaborer un processus de conception
//  et de réalisation dans une durée, avec des tâches identifiées ; définir
//  et mettre en œuvre un protocole pour mesurer une performance ; valider
//  une solution en comparant les résultats aux exigences (écarts, précision).
//  Les projets, durées et mesures sont des données d'exercice.
// =====================================================================

import { pick, dec, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { schemaPlanning, validation } from '../figures.js';

const DEFINITIONS = [
  ['un cahier des charges', "Document qui décrit le besoin et liste les exigences que la solution doit respecter."],
  ['une exigence', "Ce que la solution doit obligatoirement respecter, avec une valeur que l'on peut vérifier."],
  ['un diagramme de planification', 'Schéma qui représente les tâches d\'un projet par des barres placées sur un calendrier.'],
  ['une revue de projet', "Réunion où l'équipe présente l'avancement, vérifie le respect des exigences et décide de la suite."],
  ["l'écoconception", "Démarche qui cherche à réduire les incidences d'un objet sur l'environnement dès sa conception."],
  ['un prototype', "Premier exemplaire d'une solution, fabriqué pour la tester avant de la produire."],
  ['un protocole de test', "Description précise d'un essai : ce que l'on mesure, avec quel instrument, dans quelles conditions et combien de fois."],
  ["l'écart", 'Différence entre la valeur mesurée et la valeur attendue.'],
  ['une performance', "Grandeur mesurable qui dit ce qu'un objet réussit à faire : une vitesse, une autonomie, une précision."],
];

const INSTRUMENTS = [
  ['une longueur de pièce', 'le pied à coulisse'], ['une distance de plusieurs mètres', 'le mètre ruban'], ['une durée', 'le chronomètre'], ['une tension', 'le multimètre'], ['une masse', 'la balance'], ['une température', 'le thermomètre'],
];

const PROJET = [
  { nom: 'Cahier des charges', debut: 0, duree: 1 },
  { nom: 'Recherche de solutions', debut: 1, duree: 2 },
  { nom: 'Modélisation', debut: 3, duree: 2 },
  { nom: 'Programmation', debut: 3, duree: 3 },
  { nom: 'Fabrication', debut: 5, duree: 2 },
  { nom: 'Assemblage', debut: 7, duree: 1 },
  { nom: 'Tests et revue', debut: 8, duree: 1 },
];

export default {
  id: 't09',
  titre: 'Mener un projet et valider une solution',
  theme: 'tk_creation', niveau: '3e',
  icone: '📋',

  intro:
    "En 3ᵉ, le projet se mène en équipe, du besoin jusqu'au prototype. Deux savoir-faire comptent autant que la fabrication : <strong>organiser le travail dans le temps</strong>, et <strong>prouver par des mesures</strong> que la solution respecte ce qui était demandé. " +
    "Proposer un protocole de test est l'une des questions du sujet de référence du brevet.",

  cours: [
    {
      type: 'definition', titre: "Les étapes d'un projet",
      contenu: "Un projet part d'un <strong>besoin</strong>, traduit en <strong>exigences</strong> dans un <strong>cahier des charges</strong>. L'équipe recherche des solutions, en choisit une, la <strong>modélise</strong>, fabrique un <strong>prototype</strong>, puis le <strong>teste</strong>. À chaque étape importante, une <strong>revue de projet</strong> fait le point. L'<strong>écoconception</strong> consiste à réduire les incidences sur l'environnement dès ces choix de départ.",
    },
    {
      type: 'propriete', titre: 'Planifier les tâches',
      contenu: "Chaque <strong>tâche</strong> a une <strong>durée</strong>. Certaines doivent attendre la fin d'une autre : on ne fabrique pas avant d'avoir modélisé. D'autres peuvent être menées <strong>en même temps</strong> par des élèves différents. Le <strong>diagramme de planification</strong> montre tout cela d'un coup d'œil : une barre par tâche.",
    },
    {
      type: 'figure', titre: 'Un diagramme de planification',
      contenu: 'Projet de neuf séances : la modélisation et la programmation avancent en parallèle.',
      render: (host) => { host.innerHTML = schemaPlanning(PROJET); },
    },
    {
      type: 'definition', titre: 'Le protocole de test',
      contenu: "Pour valider une solution, on mesure une <strong>performance</strong> et on la compare à l'exigence. Un <strong>protocole de test</strong> précise : la <strong>grandeur</strong> mesurée, l'<strong>instrument</strong>, les <strong>conditions</strong> de l'essai, les <strong>étapes</strong> à suivre et le <strong>nombre de mesures</strong>. On répète la mesure plusieurs fois et on calcule la moyenne.",
    },
    {
      type: 'propriete', titre: 'Écart et validation',
      contenu: "L'<strong>écart</strong> est la différence entre la valeur mesurée et la valeur attendue. On l'exprime souvent en pourcentage de la valeur attendue : $\\dfrac{\\text{écart}}{\\text{valeur attendue}} \\times 100$. La solution est <strong>validée</strong> si l'écart reste dans la limite fixée par le cahier des charges. Sinon, on cherche la cause et on modifie la solution.",
    },
    { type: 'figure', titre: 'Conforme ou non ?', contenu: 'Un capteur placé à 200 cm d\'un mur doit être précis à 5 % près. Fais varier la valeur qu\'il indique.', render: (host) => validation(host, { attendu: 200, tolerance: 5 }) },
    {
      type: 'exemple', enonce: "Un capteur de distance doit être précis à 5 % près. Placé à 200 cm d'un mur, il indique 206 cm. Est-il conforme ?",
      solution_etapes: ['Écart : $206 - 200 = 6$ cm.', 'En pourcentage : $\\dfrac{6}{200} \\times 100 = 3\\ \\%$.', '$3\\ \\% < 5\\ \\%$ : le capteur respecte l\'exigence.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Nommer la grandeur et l\'instrument', explication: 'Que mesure-t-on, en quelle unité, avec quel appareil ?' },
    { etape: 2, titre: 'Décrire le montage', explication: 'Un schéma légendé : l\'objet, la référence (une règle, un mur), l\'instrument.' },
    { etape: 3, titre: 'Écrire les étapes', explication: 'Des phrases courtes, à l\'infinitif, dans l\'ordre. Préciser le nombre de mesures.' },
    { etape: 4, titre: 'Conclure', explication: "Calcule l'écart, compare à l'exigence, écris « conforme » ou « non conforme »." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Exigence : ce qu\'il faut respecter.', 'Prototype : un premier exemplaire.', 'Écart : mesuré moins attendu.']),

    exoOrdonner('e02', 1, [
      { consigne: "Remets dans l'ordre les étapes d'un projet.", etapes: ['Identifier le besoin', 'Rédiger le cahier des charges', 'Rechercher des solutions', 'Modéliser la solution retenue', 'Fabriquer le prototype', 'Tester et valider'] },
    ], ['On part toujours du besoin.', 'On modélise avant de fabriquer.', 'On teste à la fin.']),

    exoRelier('e03', 1, 'Associe chaque grandeur à l\'instrument qui la mesure.', INSTRUMENTS,
      ['Une tension se mesure avec un multimètre.', 'Le pied à coulisse mesure de petites longueurs avec précision.', 'Une durée : un chronomètre.'], 4),

    exoVraiFaux('e04', 1, [
      ['Dans un projet, toutes les tâches doivent se suivre une par une.', false, 'Non : certaines peuvent être menées en même temps.'],
      ['Une exigence doit pouvoir être vérifiée par une mesure ou une observation.', true, 'Oui : sinon on ne peut pas valider la solution.'],
      ['Un protocole de test précise l\'instrument de mesure utilisé.', true, 'Oui, ainsi que la grandeur, les conditions et les étapes.'],
      ['Une seule mesure suffit toujours pour valider une performance.', false, 'Non : on répète la mesure et on calcule une moyenne.'],
      ["L'écoconception consiste à penser à l'environnement dès la conception.", true, 'Oui : choix des matériaux, de l\'énergie, possibilité de réparer.'],
      ["Si l'écart dépasse la limite du cahier des charges, la solution est validée.", false, 'Non : elle est non conforme, il faut la modifier.'],
      ['Une revue de projet sert à faire le point sur l\'avancement.', true, 'Oui : l\'équipe présente, vérifie et décide de la suite.'],
    ], ['Certaines tâches se font en parallèle.', 'On répète les mesures.', 'Écart trop grand : non conforme.']),

    exoDocument('e05', 2, 'Lis un diagramme de planification.', [
      () => ({
        enonce: 'Voici le planning d\'un projet de 3ᵉ, en séances (données d\'exercice).',
        visuel: (host) => { host.innerHTML = schemaPlanning(PROJET); },
        questions: [
          nombre('Combien de séances le projet dure-t-il en tout ?', 9),
          nombre('Combien de séances la programmation dure-t-elle ?', 3),
          choix('Quelles tâches sont menées en même temps ?', 'la modélisation et la programmation', 'le cahier des charges et les tests', "l'assemblage et la recherche de solutions"),
          choix('Pourquoi la fabrication commence-t-elle à la séance 6 ?', 'elle doit attendre la fin de la modélisation', 'elle est la tâche la plus courte', "l'atelier est fermé avant"),
        ],
        correction: ['La dernière barre se termine à la <strong>séance 9</strong>.', 'La barre « Programmation » couvre <strong>3 séances</strong>.', 'Les barres de la <strong>modélisation</strong> et de la <strong>programmation</strong> se chevauchent.', 'On ne peut fabriquer qu\'une pièce déjà <strong>modélisée</strong>.'],
      }),
    ], ['Lis la fin de la dernière barre.', 'Deux barres l\'une sous l\'autre : tâches simultanées.', 'Une tâche attend parfois la fin d\'une autre.']),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule un écart en pourcentage :',
      generer() {
        const attendu = pick([50, 200, 250, 400]), p = pick([2, 4, 6, 8, 10]), signe = pick([1, -1]);
        const mesure = attendu + signe * attendu * p / 100;
        return {
          enonce: `Un capteur placé à ${attendu} cm d'un obstacle indique ${dec(mesure)} cm (données d'exercice). Quel est l'écart, en pourcentage de la valeur attendue ?`,
          reponse: p, validation: 'nombre', unite: '%',
          pieges: [{ valeur: Math.abs(mesure - attendu), message: 'Tu as l\'écart en centimètres : divise-le par la valeur attendue, puis multiplie par 100.' }],
          _v: { attendu, mesure, p },
        };
      },
      indices: ['Écart = valeur mesurée − valeur attendue (sans tenir compte du signe).', 'Divise l\'écart par la valeur attendue.', 'Multiplie par 100.'],
      correction_etapes: (st) => [`Écart : ${dec(Math.abs(st._v.mesure - st._v.attendu))} cm.`, `En pourcentage : $\\dfrac{${String(Math.abs(st._v.mesure - st._v.attendu)).replace('.', '{,}')}}{${st._v.attendu}} \\times 100 = ${st._v.p}\\ \\%$.`],
    },

    exoOrdonner('e07', 2, [
      { consigne: "Remets dans l'ordre le protocole qui vérifie la précision d'un capteur de distance.", etapes: ['Poser le capteur face à un mur', 'Mesurer la distance réelle au mètre ruban', 'Relever la distance indiquée par le capteur', 'Recommencer pour plusieurs distances', "Calculer l'écart entre les deux valeurs", "Comparer l'écart à l'exigence et conclure"] },
      { consigne: "Remets dans l'ordre le protocole qui mesure l'autonomie d'un robot.", etapes: ['Charger complètement la batterie', 'Lancer le robot et déclencher le chronomètre', "Laisser le robot rouler jusqu'à l'arrêt", 'Arrêter le chronomètre et noter la durée', 'Recommencer deux fois et calculer la moyenne', "Comparer la moyenne à l'exigence et conclure"] },
    ], ['On prépare avant de mesurer.', 'On répète la mesure.', 'On conclut en comparant à l\'exigence.']),

    exoDocument('e08', 3, 'Valide une performance à partir de mesures.', [
      () => {
        const exig = pick([40, 45, 50]), m = [exig + pick([-4, 2, 5]), exig + pick([-3, 1, 4]), exig + pick([-2, 3, 6])];
        const moy = (m[0] + m[1] + m[2]) / 3, moyA = Math.round(moy * 10) / 10, ok = moy >= exig;
        return {
          enonce: `Le cahier des charges d'un robot exige une autonomie d'au moins ${exig} minutes. Trois essais donnent (données d'exercice) :` + tableau([['Essai', 1, 2, 3], ['Autonomie (min)', ...m]]),
          questions: [
            nombre('Quelle est la somme des trois mesures, en minutes ?', m[0] + m[1] + m[2]),
            nombre('Quelle est l\'autonomie moyenne, en minutes (arrondie au dixième) ?', moyA, { tolerance: 0.05 }),
            choix("L'exigence est-elle respectée ?", ok ? 'oui' : 'non', ok ? 'non' : 'oui', 'on ne peut pas le savoir'),
            choix('Pourquoi réalise-t-on trois essais ?', 'pour limiter l\'effet d\'une mesure inhabituelle', 'pour user la batterie', 'pour changer d\'instrument'),
          ],
          correction: [`$${m.join(' + ')} = ${m[0] + m[1] + m[2]}$ min.`, `Moyenne : $${m[0] + m[1] + m[2]} \\div 3 \\approx ${dec(moyA).replace(',', '{,}')}$ min.`, `${dec(moyA)} min ${ok ? 'atteint' : "n'atteint pas"} ${exig} min : l'exigence ${ok ? 'est' : "n'est pas"} <strong>respectée</strong>.`, 'Répéter la mesure rend le résultat <strong>plus fiable</strong>.'],
        };
      },
    ], ['Additionne les trois mesures.', 'Divise par 3.', 'Compare la moyenne à l\'exigence.']),

    exoDocument('e09', 3, 'Juge un protocole de test.', [
      () => ({
        enonce: "Un élève veut vérifier que son véhicule roule à au moins 0,5 m/s. Il écrit : « Je lance le véhicule et je regarde s'il va vite. »",
        questions: [
          choix('Que manque-t-il d\'abord à ce protocole ?', 'une grandeur mesurée avec un instrument', 'une couleur de véhicule', 'un second élève'),
          choix('Quelles mesures permettent de calculer une vitesse ?', 'une distance au mètre ruban et une durée au chronomètre', 'une tension au multimètre', 'une masse à la balance'),
          choix('Le véhicule parcourt 3 m en 5 s. Sa vitesse est de :', '0,6 m/s', '15 m/s', '1,7 m/s'),
          choix('Quelle est la conclusion ?', "l'exigence est respectée, car 0,6 m/s dépasse 0,5 m/s", "l'exigence n'est pas respectée", 'on ne peut pas conclure'),
        ],
        correction: ['« Regarder » ne suffit pas : il faut <strong>mesurer</strong>.', 'Vitesse = distance ÷ durée : il faut un <strong>mètre ruban</strong> et un <strong>chronomètre</strong>.', '$3 \\div 5 = 0{,}6$ m/s.', '$0{,}6 > 0{,}5$ : le véhicule est <strong>conforme</strong>.'],
      }),
    ], ['Un test repose sur une mesure.', 'Vitesse = distance ÷ durée.', 'Compare à l\'exigence.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un cahier des charges contient :', choix: ['le besoin et les exigences à respecter', 'le programme de l\'objet', 'la liste des élèves', 'les notes du brevet'], correct: 0, explication: 'Il sert de référence pour valider la solution.' },
    { type: 'qcm', question: 'Sur un diagramme de planification, deux barres placées l\'une sous l\'autre aux mêmes séances indiquent :', choix: ['deux tâches menées en même temps', 'deux tâches inutiles', 'une erreur', 'la fin du projet'], correct: 0, explication: 'Elles sont réalisées en parallèle.' },
    { type: 'vrai_faux', question: 'Un protocole de test indique la grandeur mesurée et l\'instrument utilisé.', reponse: true, explication: 'Et aussi les conditions, les étapes et le nombre de mesures.' },
    { type: 'saisie', question: 'Valeur attendue : 100 cm. Valeur mesurée : 104 cm. Écart en pourcentage ?', reponse: 4, validation: 'nombre', explication: '$4 \\div 100 \\times 100 = 4\\ \\%$.' },
    { type: 'vrai_faux', question: 'On répète une mesure pour obtenir un résultat plus fiable.', reponse: true, explication: 'On calcule ensuite la moyenne.' },
    { type: 'qcm', question: "L'écart mesuré dépasse la limite du cahier des charges. Que fait-on ?", choix: ['on cherche la cause et on modifie la solution', 'on valide quand même', 'on change l\'exigence sans rien dire', 'on arrête le projet'], correct: 0, explication: 'La solution est non conforme : il faut l\'améliorer.' },
  ],
};
