// =====================================================================
//  pr06_interactions.js — Physique-chimie 4ᵉ : actions mécaniques et
//  interactions. Acteur et receveur, effets d'une action, contact ou
//  distance, réciprocité, diagramme objet-interactions, première
//  modélisation par une force.
// =====================================================================

import { pick, dec, grandeur, melanger } from '../outils.js';
import { interactions, schemaDOI, SITUATIONS_DOI } from '../figures_cycle.js';

const ACTIONS = [
  ["L'aimant attire le clou.", "l'aimant", 'le clou', 'distance'], ['La main pousse la porte.', 'la main', 'la porte', 'contact'],
  ['La Terre attire la pomme.', 'la Terre', 'la pomme', 'distance'], ['Le vent pousse la voile du bateau.', 'le vent', 'la voile', 'contact'],
  ['La raquette frappe la balle.', 'la raquette', 'la balle', 'contact'], ['Une règle frottée attire des petits bouts de papier.', 'la règle', 'les bouts de papier', 'distance'],
  ['Le Soleil attire la Terre.', 'le Soleil', 'la Terre', 'distance'], ['La table soutient le livre.', 'la table', 'le livre', 'contact'],
  ["L'eau porte le bateau.", "l'eau", 'le bateau', 'contact'], ['Le pied frappe le ballon.', 'le pied', 'le ballon', 'contact'],
];

const EFFETS = [
  ['On pousse un chariot à l\'arrêt : il se met à rouler.', 'le mettre en mouvement'],
  ['Le gardien arrête le ballon.', 'modifier sa vitesse'],
  ['Le joueur de tennis renvoie la balle dans une autre direction.', 'modifier sa trajectoire'],
  ['On écrase une balle en mousse dans la main.', 'le déformer'],
  ['Le vent gonfle la voile.', 'le déformer'],
  ['Le frein ralentit le vélo.', 'modifier sa vitesse'],
];
const TYPES_EFFETS = ['le mettre en mouvement', 'modifier sa vitesse', 'modifier sa trajectoire', 'le déformer'];

const cap = (s) => s[0].toUpperCase() + s.slice(1);

export default {
  id: 'pr06',
  titre: 'Actions mécaniques et interactions',
  theme: 'pc_mouvement', niveau: '4e',
  icone: '🤝',

  intro:
    "Un pied frappe un ballon, un aimant attire un clou, la Terre retient la Lune : partout, des objets <strong>agissent</strong> les uns sur les autres, parfois sans se toucher. " +
    "Ce chapitre apprend à décrire ces actions, à les classer et à les représenter par un <strong>diagramme objet-interactions</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Action mécanique',
      contenu: "Un objet (l'<strong>acteur</strong>) exerce une <strong>action mécanique</strong> sur un autre objet (le <strong>receveur</strong>) s'il peut le <strong>mettre en mouvement</strong>, <strong>modifier sa vitesse</strong> ou <strong>sa trajectoire</strong>, ou le <strong>déformer</strong>.",
    },
    {
      type: 'propriete', titre: 'De contact ou à distance',
      contenu: "Une action est <strong>de contact</strong> si l'acteur touche le receveur (main qui pousse, sol qui soutient, air qui freine). Elle est <strong>à distance</strong> si elle s'exerce sans contact : attraction de la Terre (gravitation), action d'un aimant (magnétique), d'une règle frottée (électrique).",
    },
    {
      type: 'propriete', titre: 'Toute action est une interaction',
      contenu: "Si un objet A agit sur un objet B, alors B agit aussi sur A : c'est une <strong>interaction</strong>. La Terre attire la Lune et la Lune attire la Terre (d'où les marées) ; le pied frappe le ballon et le ballon « frappe » le pied.",
    },
    {
      type: 'definition', titre: 'Le diagramme objet-interactions',
      contenu: "On entoure l'objet étudié (le <strong>système</strong>) et les objets qui interagissent avec lui. Chaque interaction est un trait : <strong>plein</strong> pour une action de contact, en <strong>pointillés</strong> pour une action à distance.",
    },
    { type: 'figure', titre: 'Construire un diagramme', contenu: 'Choisis une situation : le diagramme se construit.', render: (host) => interactions(host) },
    {
      type: 'propriete', titre: 'Modéliser par une force',
      contenu: "Une action mécanique est modélisée par une <strong>force</strong>, représentée par une flèche : son <strong>point d'application</strong>, sa <strong>direction</strong>, son <strong>sens</strong> et sa <strong>valeur</strong> (en newtons, N), mesurée avec un <strong>dynamomètre</strong>. La longueur de la flèche est proportionnelle à la valeur (échelle).",
    },
  ],

  methode: [
    { etape: 1, titre: 'Choisir le système', explication: "L'objet dont on étudie le mouvement." },
    { etape: 2, titre: 'Lister les acteurs', explication: 'Tout ce qui le touche (contact), plus la Terre et les aimants (distance).' },
    { etape: 3, titre: 'Dessiner le diagramme', explication: 'Système au centre, acteurs autour ; trait plein = contact, pointillés = distance.' },
    { etape: 4, titre: 'Décrire les effets', explication: 'Mise en mouvement, vitesse ou trajectoire modifiée, déformation.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Contact ou distance ?',
      generer() {
        const [texte, a, r, type] = pick(ACTIONS);
        return { enonce: `${texte} Cette action est :`, choix: ['de contact', 'à distance'], correct: type === 'contact' ? 0 : 1, ordre_fixe: true, _v: { a, r, type } };
      },
      indices: ["L'acteur touche-t-il le receveur ?", 'Attraction de la Terre, aimant, objet électrisé : à distance.', 'Pousser, frapper, soutenir, porter : contact.'],
      correction_etapes: (st) => [st._v.type === 'contact' ? `${cap(st._v.a)} touche ${st._v.r}.` : `${cap(st._v.a)} agit sur ${st._v.r} sans le toucher.`, `Action <strong>${st._v.type === 'contact' ? 'de contact' : 'à distance'}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Acteur ou receveur ?',
      generer() {
        const [texte, a, r] = pick(ACTIONS), q = pick(['acteur', 'receveur']);
        return { enonce: `« ${texte} » Quel est le ${q} ?`, choix: [q === 'acteur' ? a : r, q === 'acteur' ? r : a], correct: 0, _v: { a, r, q } };
      },
      indices: ["L'acteur est celui qui agit.", 'Le receveur subit l\'action.', 'Dans « A attire B », A est l\'acteur.'],
      correction_etapes: (st) => [`Acteur : ${st._v.a} ; receveur : ${st._v.r}.`, `Le ${st._v.q} est <strong>${st._v.q === 'acteur' ? st._v.a : st._v.r}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'qcm', consigne: "Effet de l'action :",
      generer() {
        const [texte, effet] = pick(EFFETS);
        return { enonce: `${texte} Quel est l'effet principal de l'action exercée sur l'objet ?`, choix: TYPES_EFFETS, correct: TYPES_EFFETS.indexOf(effet), ordre_fixe: true, _v: { effet } };
      },
      indices: ["L'objet était-il immobile avant ?", 'Va-t-il plus vite, moins vite, ou dans une autre direction ?', 'Change-t-il de forme ?'],
      correction_etapes: (st) => [`L'action a pour effet de <strong>${st._v.effet}</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Lis le diagramme :',
      generer() {
        const S = pick(SITUATIONS_DOI), type = pick(['contact', 'distance']);
        const n = S.acteurs.filter((a) => a[1] === type).length;
        return { enonce: `Voici le diagramme objet-interactions de la situation « ${S.titre.toLowerCase()} ». Combien d'actions ${type === 'contact' ? 'de contact' : 'à distance'} s'exercent sur le système (${S.systeme}) ?`, visuel: (h) => { h.innerHTML = schemaDOI(S); }, reponse: n, validation: 'nombre', _v: { S, type, n } };
      },
      indices: ['Trait plein : action de contact.', 'Pointillés : action à distance.', 'Compte les traits reliés au système.'],
      correction_etapes: (st) => [`${st._v.type === 'contact' ? 'Traits pleins' : 'Traits en pointillés'} : ${st._v.S.acteurs.filter((a) => a[1] === st._v.type).map((a) => a[0]).join(', ') || 'aucun'}.`, `Il y a <strong>${st._v.n}</strong> action(s) ${st._v.type === 'contact' ? 'de contact' : 'à distance'}.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Construis le diagramme :',
      generer() {
        const S = pick(SITUATIONS_DOI), [acteur, type] = pick(S.acteurs);
        return { enonce: `Situation : ${S.titre.toLowerCase()}. Dans le diagramme objet-interactions du système « ${S.systeme} », le trait qui relie le système à « ${acteur} » est :`, choix: ['un trait plein (contact)', 'un trait en pointillés (à distance)'], correct: type === 'contact' ? 0 : 1, ordre_fixe: true, _v: { S, acteur, type } };
      },
      indices: ["L'acteur touche-t-il le système ?", 'La Terre agit toujours à distance (pesanteur).', "L'air, le sol, une main, un fil agissent par contact."],
      correction_etapes: (st) => [`L'action de ${st._v.acteur} sur ${st._v.S.systeme} est ${st._v.type === 'contact' ? 'de contact' : 'à distance'}.`, `On trace <strong>${st._v.type === 'contact' ? 'un trait plein' : 'un trait en pointillés'}</strong>.`],
    },
    {
      id: 'e06', niveau: 3, type: 'saisie', consigne: 'Lire une flèche à l\'échelle :',
      generer() {
        const ech = pick([5, 10, 20, 50]), L = pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5]);
        return {
          enonce: `Une force est représentée par une flèche de ${dec(L)} cm, avec l'échelle 1 cm ↔ ${ech} N. Quelle est la valeur de cette force ?`,
          ...grandeur(L * ech, 'N', { pieges: [{ valeur: ech / L, message: 'Chaque centimètre représente la valeur de l\'échelle : multiplie.' }] }),
          _v: { ech, L },
        };
      },
      indices: [`1 cm représente l'échelle en N.`, 'Multiplie la longueur par la valeur de 1 cm.', 'Réponse en newtons (N).'],
      correction_etapes: (st) => [`$${dec(st._v.L).replace(',', '{,}')} \\times ${st._v.ech}$.`, `$F = ${dec(st._v.L * st._v.ech).replace(',', '{,}')}$ N.`],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Interaction :',
      generer() {
        const [A, a, b] = pick([['La Terre', 'la Terre', 'la Lune'], ['Le pied', 'le pied', 'le ballon'], ["L'aimant", "l'aimant", 'le trombone'], ['Le Soleil', 'le Soleil', 'la Terre']]);
        return { enonce: `${A} agit sur ${b}. Que peut-on dire ?`, choix: [`${cap(b)} agit aussi sur ${a}.`, `${cap(b)} n'agit pas sur ${a}.`, `${cap(b)} agit sur ${a} seulement s'il y a contact.`], correct: 0, _v: { a, b } };
      },
      indices: ['Une action ne va jamais dans un seul sens.', 'On parle d\'interaction.', 'Exemple : la Lune attire les océans de la Terre (marées).'],
      correction_etapes: (st) => [`Toute action est une <strong>interaction</strong> : si ${st._v.a} agit sur ${st._v.b}, alors ${st._v.b} agit aussi sur ${st._v.a}.`],
    },
    {
      id: 'e08', niveau: 2, type: 'ordonner_etapes', consigne: 'Construire un diagramme objet-interactions :',
      generer() {
        return {
          etapes: [
            'Choisir le système étudié',
            'Écrire le système au centre et l\'entourer',
            'Écrire autour tous les objets qui agissent sur lui',
            'Relier chacun au système par un trait plein (contact) ou en pointillés (à distance)',
            'Vérifier qu\'on n\'a pas oublié la Terre',
          ],
        };
      },
      indices: ['On part du système.', 'On cherche ensuite les acteurs.', 'Le type de trait vient en dernier.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un aimant peut agir sur un clou sans le toucher.', reponse: true, _v: { e: 'Oui : c\'est une action à distance (magnétique).' } },
          { enonce: 'La valeur d\'une force s\'exprime en kilogrammes.', reponse: false, _v: { e: 'Non : en newtons (N). Le kilogramme est l\'unité de masse.' } },
          { enonce: 'Si A agit sur B, alors B agit sur A.', reponse: true, _v: { e: 'Oui : c\'est une interaction.' } },
          { enonce: "Dans un diagramme objet-interactions, une action à distance est représentée par un trait plein.", reponse: false, _v: { e: 'Non : par des pointillés. Le trait plein est réservé au contact.' } },
          { enonce: 'Déformer un objet est un effet possible d\'une action mécanique.', reponse: true, _v: { e: 'Oui, comme le mettre en mouvement ou modifier sa trajectoire.' } },
        ]);
      },
      indices: ['Newton pour les forces.', 'Interaction = réciproque.', 'Pointillés = à distance.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'attraction de la Terre sur un objet est une action :", choix: ['à distance', 'de contact', 'magnétique', 'inexistante'], correct: 0, explication: 'La gravitation agit sans contact.' },
    { type: 'qcm', question: 'Dans un diagramme objet-interactions, une action de contact se représente par :', choix: ['un trait plein', 'des pointillés', 'une flèche', 'un cercle'], correct: 0, explication: 'Pointillés pour les actions à distance.' },
    { type: 'vrai_faux', question: 'La Lune attire la Terre.', reponse: true, explication: 'Interaction : la Terre attire la Lune et réciproquement (marées).' },
    { type: 'qcm', question: 'La valeur d\'une force se mesure avec :', choix: ['un dynamomètre', 'une balance', 'un chronomètre', 'un thermomètre'], correct: 0, explication: 'En newtons.' },
    {
      type: 'saisie', question: 'Échelle.',
      generer() { const L = pick([2, 3, 5]); return { question: `Une flèche de ${L} cm représente une force, avec 1 cm ↔ 10 N. Valeur de la force ?`, ...grandeur(L * 10, 'N'), explication: `$${L} \\times 10 = ${L * 10}$ N.` }; },
    },
  ],
};
