// =====================================================================
//  t04_chaine_energie.js — Technologie 3ᵉ : la chaîne d'énergie en schéma-bloc.
//  Repère de 3ᵉ du programme de 2024 : « Élaborer, à l'aide d'un schéma
//  bloc, la chaîne d'énergie d'un OST ». Les objets et leurs caractéristiques
//  (tensions, vitesses, nombres de dents) sont des données d'exercice.
// =====================================================================

import { pick, dec, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoLegender, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { schemaBloc, CHAINE_ENERGIE, FLUX_ENERGIE, engrenages, vitesseMenee } from '../figures.js';

const DEFINITIONS = [
  ["la chaîne d'énergie", "Ensemble des constituants qui apportent à un objet l'énergie dont il a besoin et la transforment en action."],
  ['alimenter', "Fonction qui consiste à fournir ou à stocker l'énergie : c'est le rôle d'une batterie, d'une pile ou d'une prise."],
  ['distribuer', "Fonction qui consiste à laisser passer ou à couper l'énergie, sur ordre : c'est le rôle d'un relais ou d'un interrupteur."],
  ['convertir', "Fonction qui consiste à changer la forme de l'énergie : c'est le rôle d'un moteur, d'une lampe ou d'un radiateur."],
  ['transmettre', "Fonction qui consiste à amener l'énergie mécanique jusqu'à l'endroit où elle agit, en adaptant le mouvement : c'est le rôle des engrenages, des courroies et des chaînes."],
  ['un schéma-bloc', "Représentation d'une chaîne par des rectangles reliés par des flèches : un rectangle par fonction, une flèche par flux."],
];

const FONCTIONS = [
  ['une batterie', 'alimenter'], ['une pile', 'alimenter'], ['un panneau solaire', 'alimenter'],
  ['un relais', 'distribuer'], ['un interrupteur', 'distribuer'],
  // Trois constituants au plus par fonction : un tirage de quatre en mêle toujours au moins deux.
  ['un moteur électrique', 'convertir'], ['un radiateur', 'convertir'], ['un vérin', 'convertir'],
  ['un engrenage', 'transmettre'], ['une courroie', 'transmettre'], ['une chaîne de vélo', 'transmettre'],
];

// Moteurs proposés dans l'étude de document (données d'exercice).
const MOTEURS = [['A', 6, 120, 9], ['B', 12, 80, 14], ['C', 12, 200, 22], ['D', 24, 150, 31]];

export default {
  id: 't04',
  titre: "La chaîne d'énergie en schéma-bloc",
  theme: 'tk_structure', niveau: '3e',
  icone: '🔋',

  intro:
    "Une trottinette électrique, un portail automatique, un drone : tous reçoivent de l'énergie et la transforment en mouvement. " +
    "En 3ᵉ, tu dois savoir <strong>dessiner toi-même</strong> le chemin suivi par cette énergie, sous la forme d'un schéma-bloc. C'est la première question du sujet de référence du brevet.",

  cours: [
    {
      type: 'definition', titre: 'Quatre fonctions, dans cet ordre',
      contenu: "La <strong>chaîne d'énergie</strong> d'un objet enchaîne quatre fonctions : <strong>alimenter</strong> (fournir ou stocker l'énergie), <strong>distribuer</strong> (la laisser passer ou la couper), <strong>convertir</strong> (changer sa forme), <strong>transmettre</strong> (l'amener là où elle agit). Chaque fonction est assurée par un constituant.",
    },
    {
      type: 'figure', titre: "La chaîne d'énergie d'un objet à moteur",
      contenu: 'Un rectangle par constituant, sa fonction écrite dessous, et sur chaque flèche la forme d\'énergie qui circule.',
      render: (host) => { host.innerHTML = schemaBloc({ blocs: CHAINE_ENERGIE, flux: FLUX_ENERGIE, label: "Chaîne d'énergie en schéma-bloc" }); },
    },
    {
      type: 'propriete', titre: "Les formes d'énergie et les conversions",
      contenu: "L'énergie existe sous plusieurs formes : <strong>électrique</strong>, <strong>cinétique</strong> (mouvement), <strong>potentielle</strong>, <strong>thermique</strong>, <strong>lumineuse</strong>. Un convertisseur reçoit une forme et en fournit une autre : le <strong>moteur électrique</strong> donne de l'énergie mécanique, la <strong>lampe</strong> de l'énergie lumineuse, le <strong>radiateur</strong> de l'énergie thermique. La <strong>génératrice</strong> fait l'inverse du moteur : elle reçoit un mouvement et fournit de l'énergie électrique. Une partie de l'énergie est toujours perdue sous forme de chaleur.",
    },
    {
      type: 'propriete', titre: 'Le relais reçoit un ordre',
      contenu: "Le <strong>relais</strong> est un interrupteur commandé : c'est la chaîne d'information (le microcontrôleur) qui lui ordonne de laisser passer l'énergie. Sur un schéma-bloc, cet ordre arrive par une flèche venue de la chaîne d'information.",
    },
    {
      type: 'figure', titre: 'Transmettre : les engrenages',
      contenu: 'Change le nombre de dents de la roue menée et observe sa vitesse.',
      render: (host) => engrenages(host),
    },
    {
      type: 'propriete', titre: 'Vitesse et nombre de dents',
      contenu: "Deux roues dentées qui engrènent tournent en <strong>sens inverses</strong>. Les dents passent une à une : $N_1 \\times Z_1 = N_2 \\times Z_2$, où $N$ est la vitesse de rotation (en tours par minute) et $Z$ le nombre de dents. La roue qui a <strong>le plus de dents tourne le moins vite</strong>. Une courroie ou une chaîne transmet aussi une rotation, mais sans changer le sens.",
    },
    {
      type: 'exemple', enonce: 'Une roue de 10 dents tourne à 300 tr/min et entraîne une roue de 30 dents. À quelle vitesse tourne la seconde ?',
      solution_etapes: ['$N_1 \\times Z_1 = N_2 \\times Z_2$, donc $300 \\times 10 = N_2 \\times 30$.', '$N_2 = \\dfrac{300 \\times 10}{30} = 100$ tr/min.', 'La roue menée a trois fois plus de dents : elle tourne trois fois moins vite.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lister les constituants', explication: "Relève dans les documents tout ce qui stocke, coupe, transforme ou transmet l'énergie. Écarte les capteurs et le microcontrôleur : ils appartiennent à la chaîne d'information." },
    { etape: 2, titre: 'Donner sa fonction à chacun', explication: 'Batterie : alimenter. Relais ou interrupteur : distribuer. Moteur, lampe, radiateur : convertir. Engrenages, courroie, chaîne : transmettre.' },
    { etape: 3, titre: "Dessiner les blocs dans l'ordre", explication: 'Alimenter, distribuer, convertir, transmettre : un rectangle par constituant, reliés par des flèches.' },
    { etape: 4, titre: 'Nommer chaque flux', explication: "Sur chaque flèche, écris la forme d'énergie : électrique jusqu'au moteur, mécanique ensuite." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Alimenter : fournir. Distribuer : laisser passer.', 'Convertir : changer de forme.', 'Transmettre : amener le mouvement.']),

    exoRelier('e02', 1, 'Associe chaque constituant à sa fonction.', FONCTIONS,
      ['Qui stocke l\'énergie ? Qui la coupe ?', 'Un moteur change la forme de l\'énergie.', 'Engrenages, courroies, chaînes : transmettre.'], 4),

    exoVraiFaux('e03', 1, [
      ["Dans une chaîne d'énergie, la batterie assure la fonction « alimenter ».", true, "Oui : elle stocke l'énergie et la fournit au reste de la chaîne."],
      ['Un moteur électrique convertit de l\'énergie électrique en énergie mécanique.', true, 'Oui : il reçoit un courant et fournit un mouvement de rotation.'],
      ['Un relais convertit l\'énergie électrique en énergie lumineuse.', false, 'Non : le relais distribue l\'énergie, il la laisse passer ou la coupe. C\'est la lampe qui produit de la lumière.'],
      ['Deux roues dentées qui engrènent tournent dans le même sens.', false, 'Non : elles tournent en sens inverses.'],
      ['La roue qui a le plus de dents tourne le plus vite.', false, 'Non : elle tourne le moins vite, puisque $N_1 \\times Z_1 = N_2 \\times Z_2$.'],
      ["Un capteur de distance fait partie de la chaîne d'énergie.", false, "Non : il acquiert une information, il appartient à la chaîne d'information."],
      ['Une génératrice convertit de l\'énergie mécanique en énergie électrique.', true, "Oui : c'est l'inverse d'un moteur."],
      ["Un convertisseur d'énergie perd toujours une partie de l'énergie sous forme de chaleur.", true, 'Oui : un moteur qui tourne chauffe.'],
    ], ['Reprends les quatre fonctions.', 'Moteur : électrique vers mécanique.', 'Plus de dents : moins vite.']),

    exoClasser('e04', 2, "Chaîne d'énergie ou chaîne d'information ?", [
      ['une batterie', "chaîne d'énergie"], ['un moteur électrique', "chaîne d'énergie"], ['un relais', "chaîne d'énergie"], ['des engrenages', "chaîne d'énergie"], ['une courroie', "chaîne d'énergie"],
      ['un capteur de température', "chaîne d'information"], ['un microcontrôleur', "chaîne d'information"], ['un bouton', "chaîne d'information"], ['un afficheur', "chaîne d'information"], ['un capteur de présence', "chaîne d'information"],
    ], ["chaîne d'énergie", "chaîne d'information"], { "chaîne d'énergie": "Ces constituants fournissent, coupent, transforment ou transmettent l'énergie.", "chaîne d'information": 'Ces constituants acquièrent, traitent ou communiquent une information.' },
    ['Ce constituant manipule-t-il de l\'énergie ou une information ?', 'Un capteur mesure, un moteur agit.', 'Le relais laisse passer l\'énergie : chaîne d\'énergie.'], 5),

    exoLegender('e05', 2, 'Retrouve le constituant de chaque bloc de cette chaîne d\'énergie.', CHAINE_ENERGIE.map((b) => b.nom),
      (ordre) => schemaBloc({ blocs: CHAINE_ENERGIE, flux: FLUX_ENERGIE, ordre, label: "Chaîne d'énergie à légender" }),
      ['capteur', 'microcontrôleur'], ['La fonction est écrite dans chaque bloc.', 'Alimenter : la batterie.', 'Capteur et microcontrôleur ne sont pas dans cette chaîne.'],
      { batterie: 'elle alimente la chaîne', relais: "il distribue l'énergie sur ordre", 'moteur électrique': "il convertit l'énergie électrique en énergie mécanique", engrenages: 'ils transmettent le mouvement' }),

    exoOrdonner('e06', 2, [
      { consigne: "Trottinette électrique : remets les constituants dans l'ordre de la chaîne d'énergie.", etapes: ['Batterie', 'Relais commandé par la carte électronique', 'Moteur électrique', 'Courroie', 'Roue arrière'] },
      { consigne: "Portail automatique : remets les constituants dans l'ordre de la chaîne d'énergie.", etapes: ['Prise du secteur', 'Relais', 'Moteur électrique', 'Engrenages', 'Battant du portail'] },
      { consigne: "Drone : remets les constituants dans l'ordre de la chaîne d'énergie.", etapes: ['Batterie', 'Variateur commandé par le microcontrôleur', 'Moteur électrique', 'Hélice'] },
    ], ['Alimenter vient en premier.', 'Distribuer avant convertir.', 'Transmettre en dernier, juste avant l\'action.']),

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Calcule la vitesse de la roue menée :',
      generer() {
        const z1 = pick([10, 12, 15, 20]), k = pick([2, 3, 4, 5]), n1 = pick([120, 240, 300, 600]);
        const z2 = z1 * k, n2 = vitesseMenee(n1, z1, z2);
        return {
          enonce: `Une roue de ${z1} dents tourne à ${n1} tr/min. Elle entraîne une roue de ${z2} dents. À quelle vitesse tourne la roue menée, en tr/min ?`,
          reponse: n2, validation: 'nombre',
          pieges: [{ valeur: n1 * k, message: 'La roue menée a plus de dents : elle tourne moins vite, pas plus vite.' }],
          _v: { z1, z2, n1, n2 },
        };
      },
      indices: ['Utilise $N_1 \\times Z_1 = N_2 \\times Z_2$.', 'Isole $N_2$ : divise par $Z_2$.', 'Plus de dents : moins vite.'],
      correction_etapes: (st) => [`$N_1 \\times Z_1 = N_2 \\times Z_2$, donc $N_2 = \\dfrac{${st._v.n1} \\times ${st._v.z1}}{${st._v.z2}}$.`, `$N_2 = ${dec(st._v.n2)}$ tr/min : la roue menée a ${st._v.z2 / st._v.z1} fois plus de dents, elle tourne ${st._v.z2 / st._v.z1} fois moins vite.`],
    },

    exoDocument('e08', 3, 'Choisis un moteur à partir d\'un tableau.', [
      () => {
        const tension = pick([12, 24]), vmin = pick([100, 140]);
        const ok = MOTEURS.filter((m) => m[1] === tension && m[2] >= vmin);
        const choisi = ok.sort((a, b) => a[3] - b[3])[0];
        return {
          enonce: `Un robot tondeuse est alimenté par une batterie de <strong>${tension} V</strong>. Son moteur de coupe doit tourner à au moins <strong>${vmin} tr/min</strong> (données d'exercice).` +
            tableau([['Moteur', ...MOTEURS.map((m) => m[0])], ['Tension (V)', ...MOTEURS.map((m) => m[1])], ['Vitesse (tr/min)', ...MOTEURS.map((m) => m[2])], ['Prix (€)', ...MOTEURS.map((m) => m[3])]]),
          questions: [
            nombre(`Combien de moteurs fonctionnent avec la batterie de ${tension} V ?`, MOTEURS.filter((m) => m[1] === tension).length),
            choix('Quel moteur respecte les deux exigences ?', `le moteur ${choisi[0]}`, ...MOTEURS.filter((m) => m !== choisi).slice(0, 2).map((m) => `le moteur ${m[0]}`)),
            choix('Pour justifier ce choix, il faut citer :', 'les deux exigences et les valeurs lues dans le tableau', 'seulement le prix', 'la couleur du moteur'),
          ],
          correction: [`La tension du moteur doit être celle de la batterie : ${tension} V.`, `Parmi eux, seul le <strong>moteur ${choisi[0]}</strong> atteint ${vmin} tr/min (${choisi[2]} tr/min).`, 'Au brevet, un choix se justifie en citant les exigences et les valeurs du document.'],
        };
      },
    ], ['Élimine d\'abord les moteurs dont la tension ne convient pas.', 'Compare ensuite les vitesses à l\'exigence.', 'Cite les valeurs lues.']),

    exoDocument('e09', 3, 'Analyse la chaîne d\'énergie d\'un objet.', [
      () => ({
        enonce: "Un volet roulant solaire est équipé d'un panneau solaire, d'une batterie, d'un relais commandé par une carte électronique, d'un moteur électrique et d'un réducteur à engrenages qui enroule le tablier. Un capteur de luminosité informe la carte.",
        questions: [
          choix('Quel constituant ne fait pas partie de la chaîne d\'énergie ?', 'le capteur de luminosité', 'la batterie', 'le réducteur à engrenages'),
          choix('Quelle forme d\'énergie circule entre le relais et le moteur ?', 'énergie électrique', 'énergie mécanique', 'énergie lumineuse'),
          choix('Quelle forme d\'énergie sort du réducteur ?', 'énergie mécanique', 'énergie électrique', 'énergie thermique'),
          choix('Le réducteur fait tourner le tablier moins vite que le moteur. Sa roue de sortie a donc :', 'plus de dents que la roue d\'entrée', 'moins de dents que la roue d\'entrée', 'autant de dents'),
        ],
        correction: ["Le capteur acquiert une information : il appartient à la <strong>chaîne d'information</strong>.", "Jusqu'au moteur, l'énergie est <strong>électrique</strong>.", 'Le moteur la convertit en énergie <strong>mécanique</strong>, que le réducteur transmet.', 'Moins vite : la roue menée a <strong>plus de dents</strong>.'],
      }),
    ], ['Sépare ce qui mesure de ce qui agit.', 'Le moteur est la frontière entre électrique et mécanique.', 'Plus de dents : moins vite.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: "Dans quel ordre s'enchaînent les fonctions de la chaîne d'énergie ?", choix: ['alimenter, distribuer, convertir, transmettre', 'convertir, alimenter, transmettre, distribuer', 'distribuer, transmettre, alimenter, convertir', 'acquérir, traiter, communiquer'], correct: 0, explication: 'Acquérir, traiter, communiquer sont les fonctions de la chaîne d\'information.' },
    { type: 'qcm', question: 'Quel constituant assure la fonction « distribuer » ?', choix: ['le relais', 'la batterie', 'le moteur', 'la courroie'], correct: 0, explication: 'Le relais laisse passer ou coupe l\'énergie, sur ordre.' },
    { type: 'qcm', question: 'Un moteur électrique convertit :', choix: ["l'énergie électrique en énergie mécanique", "l'énergie mécanique en énergie électrique", "l'énergie électrique en énergie lumineuse", "l'énergie thermique en énergie électrique"], correct: 0, explication: 'La conversion inverse est celle de la génératrice.' },
    { type: 'vrai_faux', question: 'Sur un schéma-bloc, chaque flèche porte le nom de la forme d\'énergie qui circule.', reponse: true, explication: 'Un bloc par fonction, une flèche par flux.' },
    { type: 'saisie', question: 'Une roue de 20 dents tourne à 150 tr/min et entraîne une roue de 60 dents. Vitesse de la roue menée, en tr/min ?', reponse: 50, validation: 'nombre', explication: '$150 \\times 20 \\div 60 = 50$ tr/min.' },
    { type: 'vrai_faux', question: 'Une courroie inverse le sens de rotation, comme un engrenage.', reponse: false, explication: 'Les deux poulies reliées par une courroie tournent dans le même sens.' },
  ],
};
