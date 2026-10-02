// =====================================================================
//  p12_signaux_invisibles.js — Physique-chimie 3ᵉ : des signaux au-delà de
//  la perception humaine. Infrasons et ultrasons, infrarouge, ultraviolet,
//  ondes radio ; signal et information.
//  Plan : manuel LeLivreScolaire Physique-Chimie cycle 4, chapitre 32.
//  Valeurs vérifiées (voir js/sources.js) : lumière visible de 380 à
//  780 nm, ordre des domaines (Wikipédia, « Spectre électromagnétique »).
//  Les situations des exercices sont inventées pour l'entraînement.
// =====================================================================

import { pick, dec, arrondi, grandeur } from '../outils.js';
import { spectre } from '../figures_cycle.js';
import { tableau } from '../../commun.js';
import { exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../../svt/outils.js';

const DEFINITIONS = [
  ['un ultrason', "Son de fréquence supérieure à 20 000 Hz, trop aigu pour être entendu par l'être humain."],
  ['un infrason', "Son de fréquence inférieure à 20 Hz, trop grave pour être entendu par l'être humain."],
  ["l'infrarouge", "Rayonnement invisible, voisin du rouge, émis par tout corps chaud."],
  ["l'ultraviolet", 'Rayonnement invisible, voisin du violet, émis notamment par le Soleil.'],
  ['une onde radio', "Onde invisible utilisée pour transmettre des informations à distance : radio, télévision, téléphone."],
  ['un signal', "Grandeur qui varie et transporte une information d'un émetteur vers un récepteur."],
];

const C = 300000; // km/s

export default {
  id: 'p12',
  titre: 'Des signaux au-delà de la perception humaine',
  theme: 'pc_signaux', niveau: '3e',
  icone: '📡',

  intro:
    "Une télécommande, un téléphone, une échographie : tous utilisent des signaux que nous ne pouvons ni voir ni entendre. " +
    "On explore ce qui se trouve <strong>au-delà du son audible et de la lumière visible</strong>, et on comprend comment un signal transporte une information.",

  cours: [
    {
      type: 'definition', titre: 'Des sons que l\'on n\'entend pas',
      contenu: "L'oreille humaine perçoit les sons dont la fréquence est comprise entre 20 Hz et 20 000 Hz. En dessous, ce sont les <strong>infrasons</strong> ; au-dessus, les <strong>ultrasons</strong>. Certains animaux les perçoivent : les chauves-souris et les dauphins utilisent les ultrasons pour se repérer.",
    },
    {
      type: 'propriete', titre: 'Les ultrasons au service de l\'être humain',
      contenu: "Les ultrasons se réfléchissent sur les obstacles. L'<strong>échographie</strong>, le <strong>sonar</strong> et le radar de recul mesurent la durée de leur aller-retour pour en déduire une distance.",
      formule: 'd = \\dfrac{v \\times t}{2}',
    },
    {
      type: 'definition', titre: 'Des lumières que l\'on ne voit pas',
      contenu: "L'œil ne perçoit qu'une petite partie des rayonnements : la <strong>lumière visible</strong>, dont la longueur d'onde va de 380 à 780 nanomètres, du violet au rouge. Au-delà du rouge se trouve l'<strong>infrarouge</strong> ; au-delà du violet, l'<strong>ultraviolet</strong>.",
    },
    { type: 'figure', titre: 'Les domaines des ondes', contenu: 'Parcours les domaines : un seul est visible.', render: (host) => spectre(host) },
    {
      type: 'propriete', titre: 'Une même famille',
      contenu: "Ondes radio, micro-ondes, infrarouge, lumière visible, ultraviolet et rayons X sont de même nature : ce sont des <strong>ondes électromagnétiques</strong>. Dans le vide, elles se propagent toutes à la vitesse de la lumière, environ 300 000 km/s. Contrairement au son, elles n'ont pas besoin de matière pour se propager.",
    },
    {
      type: 'definition', titre: 'Signal et information',
      contenu: "Pour communiquer, un <strong>émetteur</strong> produit un signal, qui se propage dans un <strong>milieu de transmission</strong> (l'air, le vide, une fibre optique), jusqu'à un <strong>récepteur</strong>. L'information est <strong>codée</strong> dans le signal : par exemple une suite d'éclairs infrarouges pour une télécommande.",
    },
    {
      type: 'propriete', titre: 'Se protéger',
      contenu: "Les <strong>ultraviolets</strong> du Soleil abîment la peau et les yeux : on s'en protège avec de la crème solaire et des lunettes adaptées. Les <strong>rayons X</strong> ne sont utilisés en médecine qu'à faible dose. Un son trop intense, même inaudible, peut endommager l'oreille.",
    },
    {
      type: 'exemple', enonce: "Le radar de recul d'une voiture émet des ultrasons, qui reviennent 0,006 s plus tard. À quelle distance se trouve l'obstacle ? (vitesse du son dans l'air : 340 m/s)",
      solution_etapes: ['Le signal fait un aller-retour : $d = \\dfrac{v \\times t}{2}$.', '$d = \\dfrac{340 \\times 0{,}006}{2} = 1{,}02$ m.', "L'obstacle est à environ 1 m."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Identifier le signal', explication: "Sonore (il lui faut de la matière) ou électromagnétique (il se propage aussi dans le vide) ?" },
    { etape: 2, titre: 'Choisir la vitesse', explication: "Son dans l'air : 340 m/s. Ondes électromagnétiques : 300 000 km/s." },
    { etape: 3, titre: 'Aller simple ou aller-retour ?', explication: "Écho, sonar, radar de recul : aller-retour, on divise par 2." },
    { etape: 4, titre: 'Calculer', explication: "$d = v \\times t$ ou $t = d \\div v$, avec des unités cohérentes." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Infra : en dessous. Ultra : au-dessus.', 'L\'infrarouge est voisin du rouge.', 'Un signal transporte une information.']),

    exoClasser('e02', 1, "L'être humain perçoit-il ce signal ?", [
      ['un son de 440 Hz', 'perçu'], ['une lumière verte', 'perçu'], ['un son de 5 000 Hz', 'perçu'], ['une lumière rouge', 'perçu'],
      ['un son de 40 000 Hz', 'non perçu'], ['un son de 10 Hz', 'non perçu'], ["le signal infrarouge d'une télécommande", 'non perçu'], ['les ondes du Wi-Fi', 'non perçu'], ['les ultraviolets du Soleil', 'non perçu'],
    ], ['perçu', 'non perçu'], { perçu: 'Son entre 20 Hz et 20 000 Hz, ou lumière visible.', 'non perçu': "Hors du domaine audible, ou hors de la lumière visible." },
    ['Audible : de 20 Hz à 20 000 Hz.', 'Infrarouge et ultraviolet sont invisibles.', 'Les ondes radio sont invisibles.']),

    exoVraiFaux('e03', 1, [
      ["Un ultrason a une fréquence supérieure à 20 000 Hz.", true, "Oui : il est trop aigu pour l'oreille humaine."],
      ["L'infrarouge est visible à l'œil nu.", false, 'Non : il est invisible, mais une caméra thermique le détecte.'],
      ['Les ondes radio peuvent se propager dans le vide.', true, 'Oui, comme toutes les ondes électromagnétiques.'],
      ['Le son peut se propager dans le vide.', false, 'Non : il lui faut de la matière.'],
      ['Les ultraviolets du Soleil sont sans danger pour la peau.', false, 'Non : ils l\'abîment, d\'où l\'usage de crème solaire.'],
      ["Une télécommande émet un signal infrarouge.", true, 'Oui : une suite d\'éclairs invisibles codant l\'information.'],
      ['Dans le vide, les ondes radio vont à la même vitesse que la lumière.', true, 'Oui : environ 300 000 km/s.'],
    ], ['Ultra : au-dessus du domaine perçu.', 'Le son a besoin de matière.', 'Toutes les ondes électromagnétiques vont à 300 000 km/s dans le vide.']),

    exoRelier('e04', 2, 'Associe chaque appareil au signal qu\'il utilise.', [
      ['la télécommande du téléviseur', "l'infrarouge"], ["l'échographe", 'les ultrasons'], ['la box Wi-Fi', 'les micro-ondes'], ['la radiographie', 'les rayons X'], ['le poste de radio', 'les ondes radio'],
    ], ['Écho-graphie : un écho, donc un son.', 'La radiographie traverse le corps.', 'La télécommande utilise un rayonnement voisin du rouge.']),

    exoOrdonner('e05', 2, [
      { consigne: 'Range ces domaines des plus grandes aux plus petites longueurs d\'onde :', etapes: ['ondes radio', 'micro-ondes', 'infrarouge', 'lumière visible', 'ultraviolet', 'rayons X'] },
    ], ['Les ondes radio ont les plus grandes longueurs d\'onde.', 'L\'infrarouge est juste avant le visible, l\'ultraviolet juste après.', 'Les rayons X ont les plus petites.']),

    exoClasser('e06', 2, 'Sonore ou électromagnétique ?', [
      ['un ultrason', 'sonore'], ['un infrason', 'sonore'], ['le signal d\'un sonar', 'sonore'],
      ["l'infrarouge", 'électromagnétique'], ['les ondes radio', 'électromagnétique'], ['les rayons X', 'électromagnétique'], ["l'ultraviolet", 'électromagnétique'], ['la lumière visible', 'électromagnétique'],
    ], ['sonore', 'électromagnétique'], { sonore: 'Il a besoin de matière pour se propager.', électromagnétique: 'Il se propage aussi dans le vide, à 300 000 km/s.' },
    ['Infrason, ultrason : des sons.', 'La lumière est une onde électromagnétique.', 'Le son ne se propage pas dans le vide.']),

    {
      id: 'e07', niveau: 2, type: 'qcm', consigne: 'Dans quel domaine se trouve ce rayonnement ?',
      generer() {
        const nm = pick([250, 320, 450, 550, 650, 900, 1500]);
        const bon = nm < 380 ? 0 : nm <= 780 ? 1 : 2;
        return { enonce: `La lumière visible a une longueur d'onde comprise entre 380 nm et 780 nm. En dessous se trouve l'ultraviolet, au-dessus l'infrarouge. Un rayonnement a une longueur d'onde de ${nm} nm. Il appartient :`, choix: ["à l'ultraviolet", 'à la lumière visible', "à l'infrarouge"], correct: bon, ordre_fixe: true, _v: { nm, bon } };
      },
      indices: ['Compare la valeur à 380 et à 780.', 'Moins de 380 nm : ultraviolet.', 'Plus de 780 nm : infrarouge.'],
      correction_etapes: (st) => [st._v.bon === 0 ? `${st._v.nm} nm est inférieur à 380 nm : <strong>ultraviolet</strong>.` : st._v.bon === 1 ? `${st._v.nm} nm est compris entre 380 et 780 nm : <strong>lumière visible</strong>.` : `${st._v.nm} nm est supérieur à 780 nm : <strong>infrarouge</strong>.`],
    },

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Calcule la durée de transmission :',
      generer() {
        const d = pick([600, 1500, 6000, 36000]);
        return { enonce: `Situation inventée pour l'exercice. Un satellite se trouve à ${d} km d'une antenne. Combien de temps une onde radio met-elle pour aller de l'antenne au satellite ? (vitesse : 300 000 km/s)`, ...grandeur(d / C, 's', { tolerance: (d / C) * 0.02, pieges: [{ valeur: d * C, message: 't = d ÷ v : on divise.' }] }), _v: { d } };
      },
      indices: ['$t = d \\div v$.', 'La distance est en km, la vitesse en km/s.', 'Le résultat est bien inférieur à une seconde.'],
      correction_etapes: (st) => [`$t = \\dfrac{d}{v} = \\dfrac{${st._v.d}}{300\\,000}$.`, `$t = ${String(arrondi(st._v.d / C, 4)).replace('.', '{,}')}$ s.`],
    },

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: "Calcule la distance mesurée par ultrasons :",
      generer() {
        const ms = pick([4, 6, 10, 20]), t = ms / 1000;
        return { enonce: `Un radar de recul émet des ultrasons. L'écho revient ${ms} ms après l'émission. À quelle distance se trouve l'obstacle ? (vitesse du son dans l'air : 340 m/s)`, ...grandeur(arrondi((340 * t) / 2, 2), 'm', { tolerance: 0.02, pieges: [{ valeur: arrondi(340 * t, 2), message: 'Le signal fait un aller-retour : divise par 2.' }] }), _v: { ms, t } };
      },
      indices: ['Convertis la durée en secondes : 1 ms = 0,001 s.', 'Le signal fait un aller-retour.', '$d = \\dfrac{v \\times t}{2}$.'],
      correction_etapes: (st) => [`${st._v.ms} ms = ${dec(st._v.t)} s.`, `$d = \\dfrac{340 \\times ${String(st._v.t).replace('.', '{,}')}}{2} = ${String(arrondi((340 * st._v.t) / 2, 2)).replace('.', '{,}')}$ m.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un son de 30 000 Hz est :', choix: ['un ultrason', 'un infrason', 'un son audible', 'une onde radio'], correct: 0, explication: 'Au-dessus de 20 000 Hz.' },
    { type: 'qcm', question: 'Le signal d\'une télécommande est :', choix: ['infrarouge', 'ultraviolet', 'sonore', 'un rayon X'], correct: 0, explication: 'Invisible, voisin du rouge.' },
    { type: 'vrai_faux', question: 'Les ondes radio se propagent dans le vide.', reponse: true, explication: 'Comme toutes les ondes électromagnétiques.' },
    { type: 'qcm', question: 'La lumière visible correspond aux longueurs d\'onde comprises entre :', choix: ['380 et 780 nm', '20 et 20 000 nm', '1 et 10 nm', '1 et 100 m'], correct: 0, explication: 'Du violet au rouge.' },
    { type: 'qcm', question: 'Dans une chaîne de communication, le signal va :', choix: ["de l'émetteur au récepteur", 'du récepteur à l\'émetteur', "d'un récepteur à un autre", 'nulle part'], correct: 0, explication: 'Il traverse un milieu de transmission.' },
    { type: 'vrai_faux', question: 'Les ultraviolets peuvent abîmer la peau.', reponse: true, explication: 'D\'où l\'usage de crème solaire.' },
  ],
};
