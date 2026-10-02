// =====================================================================
//  sr10_cellules_reproductrices.js — SVT 4ᵉ : la production des cellules
//  reproductrices. Puberté, appareils reproducteurs, cycle de l'utérus et
//  de l'ovaire, production des spermatozoïdes.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 29.
//  Valeurs vérifiées (voir js/sources.js) : cycle de référence de 28 jours
//  (plus ou moins 4 jours), ovulation vers le 14ᵉ jour, règles de 3 à
//  5 jours (Wikipédia, « Cycle menstruel »).
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { cycleMenstruel } from '../figures.js';

const DEFINITIONS = [
  ['la puberté', "Période de l'adolescence pendant laquelle le corps se transforme et devient capable de se reproduire."],
  ['un spermatozoïde', "Cellule reproductrice de l'homme, produite par les testicules."],
  ['un ovule', "Cellule reproductrice de la femme, libérée par un ovaire."],
  ["l'ovulation", "Libération d'un ovule par un ovaire, une fois par cycle."],
  ['les règles', "Écoulement de sang dû à l'élimination de la couche superficielle de la paroi de l'utérus, au début de chaque cycle."],
  ["l'utérus", "Organe musculaire creux de la femme, dans lequel se développe l'embryon."],
  ['une hormone', "Substance fabriquée par un organe, transportée par le sang, qui agit sur d'autres organes."],
];

export default {
  id: 'sr10',
  titre: 'La production des cellules reproductrices',
  theme: 'svt_corps', niveau: '4e',
  icone: '🧑‍🤝‍🧑',

  intro:
    "À la puberté, le corps change, et ces changements ont un sens : l'organisme devient capable de transmettre la vie. " +
    "On décrit le fonctionnement des <strong>appareils reproducteurs</strong> : une production continue chez l'homme, <strong>cyclique</strong> chez la femme.",

  cours: [
    {
      type: 'definition', titre: 'La puberté',
      contenu: "À la <strong>puberté</strong>, sous l'effet d'<strong>hormones</strong>, le corps se transforme : apparition des poils, mue de la voix et développement des muscles chez les garçons, développement des seins et élargissement du bassin chez les filles. Les organes reproducteurs se mettent à fonctionner. L'âge de la puberté varie beaucoup d'une personne à l'autre.",
    },
    {
      type: 'definition', titre: "Chez l'homme",
      contenu: "Les <strong>testicules</strong> produisent des <strong>spermatozoïdes</strong> en permanence, de la puberté à la fin de la vie. Mélangés à des liquides produits par des glandes, ils forment le sperme, émis par le pénis.",
    },
    {
      type: 'definition', titre: 'Chez la femme',
      contenu: "Les <strong>ovaires</strong> libèrent en général un <strong>ovule</strong> par cycle : c'est l'<strong>ovulation</strong>. L'ovule est recueilli par une trompe, qui le conduit vers l'<strong>utérus</strong>. Ce fonctionnement dure de la puberté à la ménopause.",
    },
    { type: 'figure', titre: 'Un cycle de 28 jours', contenu: 'Fais défiler les jours du cycle.', render: (host) => cycleMenstruel(host) },
    {
      type: 'propriete', titre: 'Le cycle de l\'utérus',
      contenu: "La durée de référence d'un cycle est de <strong>28 jours</strong>, à quatre jours près. Il commence par les <strong>règles</strong>, qui durent de 3 à 5 jours. Puis la paroi de l'utérus s'épaissit et se charge de vaisseaux sanguins : elle se prépare à accueillir un embryon. L'<strong>ovulation</strong> a lieu vers le 14ᵉ jour. Sans fécondation, la paroi est éliminée et un nouveau cycle commence.",
    },
    {
      type: 'exemple', enonce: "Les règles d'une jeune femme commencent le 3 du mois. Son cycle dure 28 jours. Vers quelle date l'ovulation a-t-elle lieu ? Quand commenceront les règles suivantes ?",
      solution_etapes: ['Le premier jour des règles est le jour 1 du cycle.', "L'ovulation a lieu vers le 14ᵉ jour : 3 + 13 = le 16 du mois.", 'Le cycle suivant débute 28 jours après le premier jour des règles : 3 + 28 = 31, soit le 31 du mois.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le jour 1', explication: "Le cycle commence le premier jour des règles." },
    { etape: 2, titre: "Trouver l'ovulation", explication: "Vers le 14ᵉ jour : ajoute 13 jours à la date du jour 1." },
    { etape: 3, titre: 'Trouver le cycle suivant', explication: "Ajoute la durée du cycle (28 jours) à la date du jour 1." },
    { etape: 4, titre: 'Garder en tête les variations', explication: "La durée d'un cycle varie d'une femme à l'autre et d'un cycle à l'autre : ces dates sont des repères." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Spermatozoïde : homme. Ovule : femme.', 'Ovulation : libération d\'un ovule.', 'Les règles marquent le début du cycle.']),

    exoClasser('e02', 1, "Cet organe appartient-il à l'appareil reproducteur de l'homme ou de la femme ?", [
      ['le testicule', 'homme'], ['le pénis', 'homme'], ['la prostate', 'homme'],
      ["l'ovaire", 'femme'], ["l'utérus", 'femme'], ['la trompe', 'femme'], ['le vagin', 'femme'],
    ], ['homme', 'femme'], { homme: 'Les testicules produisent les spermatozoïdes.', femme: 'Les ovaires libèrent les ovules ; l\'utérus accueille l\'embryon.' },
    ['Les testicules produisent les spermatozoïdes.', 'Les ovaires libèrent les ovules.', 'L\'utérus accueille l\'embryon.'], 4),

    exoVraiFaux('e03', 1, [
      ['Les spermatozoïdes sont produits en permanence à partir de la puberté.', true, 'Oui, jusqu\'à la fin de la vie.'],
      ["Un ovaire libère un ovule chaque jour.", false, 'Non : en général un ovule par cycle.'],
      ['Les règles marquent le début d\'un cycle.', true, 'Oui : leur premier jour est le jour 1.'],
      ["L'ovulation a lieu vers le 14ᵉ jour d'un cycle de 28 jours.", true, 'Oui.'],
      ['La puberté commence au même âge pour tout le monde.', false, 'Non : l\'âge varie beaucoup d\'une personne à l\'autre.'],
      ['Les transformations de la puberté sont déclenchées par des hormones.', true, 'Oui : elles sont transportées par le sang.'],
      ["La paroi de l'utérus s'épaissit au cours du cycle.", true, 'Oui : elle se prépare à accueillir un embryon.'],
    ], ['Homme : en continu. Femme : par cycles.', 'Jour 1 : premier jour des règles.', 'Les hormones déclenchent la puberté.']),

    exoClasser('e04', 2, 'Fonctionnement continu ou cyclique ?', [
      ['la production des spermatozoïdes', 'continu'], ['le fonctionnement des testicules', 'continu'],
      ["la libération des ovules", 'cyclique'], ["l'épaississement de la paroi de l'utérus", 'cyclique'], ['les règles', 'cyclique'],
    ], ['continu', 'cyclique'], { continu: "Chez l'homme, la production ne s'interrompt pas.", cyclique: 'Chez la femme, les mêmes événements se répètent environ tous les 28 jours.' },
    ['Cyclique : qui se répète régulièrement.', 'Les règles reviennent à chaque cycle.', 'Les testicules fonctionnent sans interruption.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre les événements d'un cycle sans fécondation :", etapes: ['Les règles : la paroi de l\'utérus est en partie éliminée', "La paroi de l'utérus s'épaissit de nouveau", "L'ovaire libère un ovule : c'est l'ovulation", "L'ovule, non fécondé, dégénère", 'La paroi épaissie est éliminée : nouvelles règles'] },
      { consigne: "Remets dans l'ordre le trajet d'un ovule :", etapes: ["l'ovaire", 'la trompe', "l'utérus", 'le vagin'] },
    ], ['Le cycle commence par les règles.', 'L\'ovulation a lieu au milieu du cycle.', 'Sans fécondation, un nouveau cycle commence.']),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: "Calcule la date de l'ovulation :",
      generer() {
        const j = randInt(1, 15);
        return { enonce: `Les règles d'une femme commencent le ${j} du mois. Son cycle dure 28 jours. Vers quel jour du mois l'ovulation aura-t-elle lieu ?`, reponse: j + 13, validation: 'nombre', pieges: [{ valeur: j + 14, message: 'Le jour des règles est le jour 1 : le 14ᵉ jour se trouve 13 jours plus tard.' }], _v: { j } };
      },
      indices: ['Le premier jour des règles est le jour 1.', "L'ovulation a lieu vers le 14ᵉ jour.", 'Du jour 1 au jour 14, il s\'écoule 13 jours.'],
      correction_etapes: (st) => [`Jour 1 : le ${st._v.j} du mois.`, `Jour 14 : ${st._v.j} + 13 = <strong>le ${st._v.j + 13} du mois</strong>.`],
    },

    exoDocument('e07', 2, 'Lis ce calendrier.', [
      () => {
        const a = randInt(2, 6), cycle = pick([26, 28, 30]);
        return {
          enonce: `Calendrier inventé pour l'exercice. Une jeune femme note les dates de début de ses règles : le ${a} mars, puis le ${a + cycle - 31 > 0 ? `${a + cycle - 31} avril` : `${a + cycle} mars`}. Le mois de mars compte 31 jours.`,
          questions: [
            nombre('Combien de jours ce cycle a-t-il duré ?', cycle, { unite: 'jours' }),
            choix('Cette durée est-elle habituelle ?', 'oui : un cycle dure 28 jours, à quatre jours près', 'non : un cycle dure toujours exactement 28 jours', 'non : un cycle dure 14 jours'),
            choix('Pendant ce cycle, combien d\'ovules ont été libérés, en général ?', 'un seul', 'un par jour', 'aucun'),
          ],
          correction: [`Du ${a} mars à la date suivante, il s'écoule <strong>${cycle} jours</strong>.`, 'Entre 24 et 32 jours, la durée est <strong>habituelle</strong>.', "Il y a en général <strong>une ovulation</strong> par cycle."],
        };
      },
    ], ['Compte les jours entre les deux dates.', 'Mars compte 31 jours.', 'Un cycle dure 28 jours, à quatre jours près.']),

    exoDocument('e08', 3, "Interprète l'évolution de la paroi de l'utérus.", [
      () => ({
        enonce: "Mesures inventées pour l'exercice. On suit l'épaisseur de la paroi de l'utérus au cours d'un cycle de 28 jours." +
          tableau([['Jour du cycle', 1, 5, 14, 21, 28], ['Épaisseur de la paroi (mm)', 5, 1, 4, 6, 7]]),
        questions: [
          choix('Entre le jour 1 et le jour 5, l\'épaisseur diminue. Cela correspond :', 'aux règles', "à l'ovulation", 'à une grossesse'),
          nombre('De combien de millimètres la paroi s\'épaissit-elle entre le jour 5 et le jour 28 ?', 6, { unite: 'mm' }),
          choix('Cet épaississement prépare :', "l'accueil d'un embryon", 'les règles suivantes uniquement', "l'ovulation"),
        ],
        correction: ["La couche superficielle est éliminée : ce sont les <strong>règles</strong>.", '7 − 1 = <strong>6 mm</strong>.', "Une paroi épaisse et riche en vaisseaux sanguins peut <strong>accueillir un embryon</strong>."],
      }),
    ], ['Les règles ont lieu au début du cycle.', 'Soustrais les deux épaisseurs.', 'L\'utérus se prépare à une éventuelle grossesse.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Compte les cycles :',
      generer() {
        const debut = pick([11, 12, 13, 14]), fin = pick([48, 50, 52]);
        return { enonce: `Situation inventée pour l'exercice. Une femme a ses premières règles à ${debut} ans et sa ménopause à ${fin} ans. On suppose 13 cycles par an et aucune grossesse. Combien de cycles connaît-elle au total ?`, reponse: (fin - debut) * 13, validation: 'nombre', _v: { debut, fin } };
      },
      indices: ['Calcule d\'abord le nombre d\'années.', 'Âge de fin moins âge de début.', 'Multiplie par 13.'],
      correction_etapes: (st) => [`${st._v.fin} − ${st._v.debut} = ${st._v.fin - st._v.debut} années.`, `${st._v.fin - st._v.debut} × 13 = <strong>${(st._v.fin - st._v.debut) * 13} cycles</strong>, soit autant d'ovules libérés.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Les spermatozoïdes sont produits par :', choix: ['les testicules', 'la prostate', 'le pénis', 'les ovaires'], correct: 0, explication: 'En permanence, à partir de la puberté.' },
    { type: 'qcm', question: "L'ovulation est :", choix: ["la libération d'un ovule par un ovaire", 'le début des règles', 'la fécondation', 'la naissance'], correct: 0, explication: 'Elle a lieu vers le 14ᵉ jour du cycle.' },
    { type: 'qcm', question: 'La durée de référence d\'un cycle est de :', choix: ['28 jours', '14 jours', '7 jours', '9 mois'], correct: 0, explication: 'À quatre jours près.' },
    { type: 'vrai_faux', question: 'Les règles correspondent à l\'élimination d\'une partie de la paroi de l\'utérus.', reponse: true, explication: 'Elles marquent le début d\'un nouveau cycle.' },
    { type: 'qcm', question: "Chez l'homme, la production de cellules reproductrices est :", choix: ['continue', 'cyclique', 'limitée à la puberté', 'absente'], correct: 0, explication: 'De la puberté à la fin de la vie.' },
    { type: 'vrai_faux', question: 'Les transformations de la puberté sont dues à des hormones.', reponse: true, explication: 'Elles sont transportées par le sang.' },
  ],
};
