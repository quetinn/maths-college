// =====================================================================
//  p06_forces.js — Physique-chimie 3ᵉ : les forces.
//  Actions de contact / à distance, diagramme objet-interactions,
//  modélisation par une force (4 caractéristiques, flèche à l'échelle),
//  effets d'une force, forces qui se compensent.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { flecheForce } from '../figures.js';

const ACTIONS = [
  ["Un aimant attire un trombone sans le toucher.", 'à distance'], ['Une main pousse une porte.', 'de contact'],
  ['La Terre attire une pomme qui tombe.', 'à distance'], ['Le vent gonfle la voile d\'un bateau.', 'de contact'],
  ['Une règle frottée attire des petits bouts de papier.', 'à distance'], ['Un pied frappe un ballon.', 'de contact'],
  ['La table soutient un livre posé dessus.', 'de contact'], ['Le Soleil attire la Terre.', 'à distance'],
];

export default {
  id: 'p06',
  titre: 'Les forces',
  theme: 'pc_mouvement', niveau: '3e',
  icone: '➡️',

  intro:
    "Pousser, tirer, attirer, soutenir : les objets agissent les uns sur les autres. Le physicien modélise chacune de ces actions par une <strong>force</strong>, " +
    "représentée par une <strong>flèche</strong> : où elle s'applique, dans quelle direction, dans quel sens et avec quelle intensité. " +
    "Ces flèches expliquent pourquoi un objet démarre, s'arrête, tourne… ou reste immobile.",

  cours: [
    {
      type: 'definition', titre: 'Actions mécaniques',
      contenu: "Un objet peut agir sur un autre <strong>par contact</strong> (une main pousse, une corde tire, le sol soutient) ou <strong>à distance</strong> (la Terre attire une pomme, un aimant attire un clou). " +
        "On représente les interactions par un <strong>diagramme objet-interactions</strong> : chaque objet dans une bulle, reliées par un trait plein (contact) ou pointillé (à distance).",
    },
    {
      type: 'definition', titre: 'Modéliser une action par une force',
      contenu: "Une action mécanique est modélisée par une <strong>force</strong>, notée par exemple $\\vec{F}$, qui a <strong>quatre caractéristiques</strong> : un <strong>point d'application</strong>, une <strong>direction</strong> (verticale, horizontale…), un <strong>sens</strong> (vers le haut, vers la droite…) et une <strong>valeur</strong> (intensité) en <strong>newtons</strong> (N), mesurée avec un <strong>dynamomètre</strong>.",
    },
    {
      type: 'propriete', titre: 'Représenter une force',
      contenu: "On la dessine par un <strong>segment fléché</strong> : il part du point d'application, suit la direction et le sens de la force, et sa longueur est proportionnelle à la valeur, selon une <strong>échelle</strong> choisie (par exemple $1$ cm pour $10$ N).",
      formule: '\\text{longueur (cm)} = \\dfrac{\\text{valeur (N)}}{\\text{échelle (N par cm)}}',
    },
    { type: 'figure', titre: 'Une force, quatre caractéristiques', contenu: 'Modifie la valeur et la direction de la force exercée sur la caisse.', render: (host) => flecheForce(host) },
    {
      type: 'propriete', titre: "Les effets d'une force",
      contenu: "Une force peut <strong>mettre en mouvement</strong> un objet, <strong>modifier sa vitesse</strong> (accélérer, freiner), <strong>modifier sa trajectoire</strong> ou le <strong>déformer</strong>.",
    },
    {
      type: 'propriete', titre: 'Forces qui se compensent',
      contenu: "Si un objet est <strong>immobile</strong> ou en <strong>mouvement rectiligne uniforme</strong>, les forces qui s'exercent sur lui <strong>se compensent</strong> : elles ont même direction, même valeur et des sens opposés (pour deux forces). Un livre posé sur une table : son poids (vers le bas) est compensé par l'action de la table (vers le haut).",
    },
    {
      type: 'exemple', enonce: 'Représente une force de $35$ N avec l\'échelle $1$ cm pour $10$ N.',
      solution_etapes: ['$35 \\div 10 = 3{,}5$.', 'On trace une flèche de $3{,}5$ cm à partir du point d\'application, dans la direction et le sens de la force.'],
    },
  ],

  methode: [
    { etape: 1, titre: "Identifier l'acteur et le receveur", explication: '« Qui agit sur qui ? » Par exemple : la Terre agit sur la balle.' },
    { etape: 2, titre: 'Point d\'application', explication: 'Contact : là où a lieu le contact. À distance (poids) : au centre de l\'objet.' },
    { etape: 3, titre: 'Direction et sens', explication: 'Verticale / horizontale / oblique, puis vers le haut, le bas, la droite, la gauche.' },
    { etape: 4, titre: 'Longueur à l\'échelle', explication: 'Longueur = valeur ÷ échelle. Trace la flèche.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Contact ou à distance ?',
      generer() {
        const [situation, rep] = pick(ACTIONS);
        return { enonce: `${situation} Il s'agit d'une action :`, choix: ['de contact', 'à distance'], correct: rep === 'de contact' ? 0 : 1, ordre_fixe: true, _v: { rep } };
      },
      indices: ['Les deux objets se touchent-ils ?', 'Attraction terrestre, aimants, électricité : à distance.', 'Pousser, tirer, frapper, soutenir : contact.'],
      correction_etapes: (st) => [`C'est une action <strong>${st._v.rep}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Longueur de la flèche (en cm) :',
      generer() {
        const ech = pick([2, 5, 10, 20, 50]), L = pick([1.5, 2, 2.5, 3, 3.5, 4, 5, 6]), F = ech * L;
        return {
          enonce: `Une force a une valeur de ${F} N. Échelle : 1 cm pour ${ech} N. Quelle est la longueur de la flèche ?`,
          ...grandeur(L, 'cm', { tolerance: 0.01, pieges: [{ valeur: F * ech, message: "Il faut diviser la valeur par l'échelle, pas multiplier." }] }), _v: { F, ech, L },
        };
      },
      indices: ["1 cm représente " + 'l\'échelle.', 'Combien de fois l\'échelle dans la valeur ?', 'Longueur = valeur ÷ échelle.'],
      correction_etapes: (st) => [`$${st._v.F} \\div ${st._v.ech} = ${dec(st._v.L).replace(',', '{,}')}$.`, `La flèche mesure <strong>${dec(st._v.L)} cm</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: 'Valeur de la force (en N) :',
      generer() {
        const ech = pick([5, 10, 20, 100]), L = pick([1.5, 2, 3, 4.5, 5, 6.5]);
        return {
          enonce: `Sur un schéma à l'échelle 1 cm pour ${ech} N, une force est représentée par une flèche de ${dec(L)} cm. Quelle est sa valeur ?`,
          ...grandeur(ech * L, 'N', { tolerance: 0.01, pieges: [{ valeur: arrondi(L / ech, 4), message: 'Chaque centimètre représente ' + ech + ' N : il faut multiplier.' }] }), _v: { ech, L },
        };
      },
      indices: [`1 cm ↔ l'échelle en N.`, 'Multiplie la longueur par l\'échelle.', 'Valeur en newtons (N).'],
      correction_etapes: (st) => [`$${dec(st._v.L).replace(',', '{,}')} \\times ${st._v.ech} = ${dec(st._v.L * st._v.ech).replace(',', '{,}')}$.`, `La force vaut <strong>${dec(st._v.L * st._v.ech)} N</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Direction et sens :',
      generer() {
        return pick([
          { enonce: 'Une lampe est suspendue à un fil. La force exercée par le fil sur la lampe est :', choix: ['verticale, vers le haut', 'verticale, vers le bas', 'horizontale, vers la droite', 'oblique'], correct: 0, _v: { e: 'Le fil tire la lampe vers le haut, le long du fil vertical.' } },
          { enonce: 'Le poids d\'une pomme (action de la Terre) est :', choix: ['vertical, vers le bas', 'vertical, vers le haut', 'horizontal', 'dirigé vers le pommier'], correct: 0, _v: { e: 'Le poids est toujours vertical, vers le bas (vers le centre de la Terre).' } },
          { enonce: 'Un enfant tire horizontalement une luge vers la droite. La force exercée par la corde sur la luge est :', choix: ['horizontale, vers la droite', 'horizontale, vers la gauche', 'verticale, vers le haut', 'verticale, vers le bas'], correct: 0, _v: { e: 'La corde tire la luge dans sa propre direction et vers l\'enfant.' } },
          { enonce: 'La table sur laquelle repose un vase exerce une force :', choix: ['verticale, vers le haut', 'verticale, vers le bas', 'horizontale', 'nulle'], correct: 0, _v: { e: 'Le support soutient le vase : force verticale vers le haut, qui compense le poids.' } },
        ]);
      },
      indices: ['La direction est une droite (verticale, horizontale…).', 'Le sens précise vers où (haut, bas, droite…).', "Imagine dans quel sens l'objet serait entraîné par cette action seule."],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Effet de la force :',
      generer() {
        return pick([
          { enonce: 'Un gardien de but arrête le ballon. La force exercée par ses mains :', choix: ['modifie la vitesse du ballon', 'déforme le but', 'met le ballon en mouvement', "n'a aucun effet"], correct: 0, _v: { e: 'Le ballon ralentit jusqu\'à s\'arrêter : sa vitesse est modifiée.' } },
          { enonce: 'Un aimant dévie une bille d\'acier qui roule. La force de l\'aimant :', choix: ['modifie la trajectoire de la bille', 'déforme la bille', 'arrête la bille', 'augmente la masse de la bille'], correct: 0, _v: { e: 'La bille change de direction : sa trajectoire est modifiée.' } },
          { enonce: 'On appuie sur une balle en mousse, elle s\'écrase. La force :', choix: ['déforme la balle', 'met la balle en mouvement', 'modifie la trajectoire', 'change la masse de la balle'], correct: 0, _v: { e: 'Effet de déformation.' } },
        ]);
      },
      indices: ['Démarrer, accélérer, ralentir : effet sur la vitesse.', 'Tourner, dévier : effet sur la trajectoire.', 'Écraser, étirer : déformation.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'La valeur d\'une force s\'exprime en kilogrammes.', reponse: false, _v: { e: 'Non : en newtons (N). Le kilogramme est l\'unité de masse.' } },
          { enonce: 'Une force peut s\'exercer sans contact.', reponse: true, _v: { e: "Oui : l'attraction de la Terre ou d'un aimant s'exerce à distance." } },
          { enonce: "On mesure la valeur d'une force avec un dynamomètre.", reponse: true, _v: { e: 'Oui : son ressort s\'étire proportionnellement à la force.' } },
          { enonce: 'Un objet immobile ne subit aucune force.', reponse: false, _v: { e: 'Non : il subit des forces qui se compensent (poids et action du support, par exemple).' } },
        ]);
      },
      indices: ['Unité de force : le newton.', 'Pense à la gravitation et aux aimants.', 'Immobile ne veut pas dire « sans force ».'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Forces qui se compensent :',
      generer() {
        const [objet, P] = pick([['un livre', randInt(5, 20)], ['un vase', randInt(8, 30)], ['un sac posé', randInt(20, 60)], ['une caisse', randInt(50, 150)]]);
        return {
          enonce: `${objet[0].toUpperCase() + objet.slice(1)} de poids ${P} N est immobile sur une table. Quelle est la valeur de la force exercée par la table sur cet objet ?`,
          ...grandeur(P, 'N', { tolerance: 0.01 }), _v: { P, objet },
        };
      },
      indices: ["L'objet est immobile : les forces se compensent.", 'Deux forces qui se compensent ont la même valeur.', 'Elles ont des sens opposés : poids vers le bas, action de la table vers le haut.'],
      correction_etapes: (st) => ['L\'objet est immobile : poids et action de la table se compensent.', `Même direction (verticale), sens opposés, même valeur : <strong>${st._v.P} N</strong>, vers le haut.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Diagramme objet-interactions :',
      generer() {
        return pick([
          { enonce: 'Une balle de tennis tombe dans l\'air (on néglige l\'air). Combien d\'actions s\'exercent sur elle ?', choix: ['1 : la Terre (à distance)', '2 : la Terre et la raquette', '0 : elle tombe toute seule', '3 : la Terre, l\'air et le sol'], correct: 0, _v: { e: 'Après avoir quitté la raquette, seule la Terre agit sur la balle (si on néglige l\'air).' } },
          { enonce: 'Une lampe est suspendue au plafond par un fil. Quels objets agissent sur la lampe ?', choix: ['la Terre (à distance) et le fil (contact)', 'le plafond seulement', 'le fil seulement', 'la Terre seulement'], correct: 0, _v: { e: 'Le fil touche la lampe (contact) ; la Terre l\'attire (à distance). Le plafond agit sur le fil, pas directement sur la lampe.' } },
          { enonce: 'Un livre est posé sur une table. Quels objets agissent sur le livre ?', choix: ['la Terre (à distance) et la table (contact)', 'la table seulement', 'la Terre seulement', 'aucun, il est immobile'], correct: 0, _v: { e: 'Deux actions qui se compensent : le poids et l\'action de la table.' } },
        ]);
      },
      indices: ['Liste tout ce qui touche l\'objet (contact).', "N'oublie pas la Terre (action à distance).", 'Un objet qui ne touche pas directement le système n\'agit pas par contact sur lui.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e09', niveau: 2, type: 'ordonner_etapes', consigne: "Remets dans l'ordre la représentation d'une force :",
      generer() {
        const F = pick([20, 30, 40, 60]), ech = pick([10, 20]);
        return { etapes: [`Identifier l'action : la corde tire le chariot`, "Placer le point d'application : là où la corde touche le chariot", 'Tracer la direction de la corde et choisir le sens (vers la corde)', `Calculer la longueur : ${F} ÷ ${ech} = ${dec(F / ech)} cm`, `Tracer la flèche de ${dec(F / ech)} cm et la nommer`] };
      },
      indices: ['On commence par identifier l\'action.', 'Le point d\'application avant la flèche.', 'La longueur se calcule avant de tracer.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'unité de la valeur d'une force est :", choix: ['le newton (N)', 'le kilogramme (kg)', 'le joule (J)', 'le watt (W)'], correct: 0, explication: 'Mesurée avec un dynamomètre.' },
    { type: 'qcm', question: "Laquelle n'est pas une caractéristique d'une force ?", choix: ['sa couleur', 'sa direction', 'son sens', 'sa valeur'], correct: 0, explication: 'Point d\'application, direction, sens, valeur.' },
    {
      type: 'saisie', question: 'Échelle.',
      generer() { const F = pick([30, 45, 60, 80]); return { question: `Échelle 1 cm pour 10 N : quelle longueur (en cm) pour une force de ${F} N ?`, ...grandeur(F / 10, 'cm', { tolerance: 0.01 }), explication: `${F} ÷ 10 = ${dec(F / 10)} cm.` }; },
    },
    { type: 'vrai_faux', question: "L'attraction d'un aimant sur un clou est une action à distance.", reponse: true, explication: 'Elle agit sans contact.' },
    { type: 'qcm', question: 'Un objet est immobile. Les forces qui s\'exercent sur lui :', choix: ['se compensent', "n'existent pas", 'sont toutes vers le bas', 'sont toutes vers le haut'], correct: 0, explication: 'Leurs effets s\'annulent.' },
  ],
};
