// =====================================================================
//  pv02_changements_etat.js — Physique-chimie 5ᵉ : les changements d'état.
//  Noms des changements d'état, palier de température d'un corps pur,
//  conservation de la masse, variation du volume, évaporation/ébullition.
// =====================================================================

import { pick, arrondi, dec, grandeur, melanger } from '../outils.js';
import { chauffage, schemaChangements, schemaCourbe, CHANGEMENTS } from '../figures_cycle.js';
import { tableau } from '../../commun.js';

const NOMS = CHANGEMENTS.map((c) => c[0]);
const ETATS = ['solide', 'liquide', 'gaz'];

/** Situations de la vie courante : [description, changement d'état]. */
const SITUATIONS = [
  ['Le beurre fond dans la poêle.', 'fusion'],
  ["L'eau du bac à glaçons gèle au congélateur.", 'solidification'],
  ['Une flaque d\'eau sèche au soleil.', 'vaporisation'],
  ["De la buée se forme sur le miroir de la salle de bains.", 'liquéfaction'],
  ["L'eau bout dans la casserole.", 'vaporisation'],
  ['Le chocolat fondu durcit en refroidissant.', 'solidification'],
  ['Un glaçon fond dans un verre de jus.', 'fusion'],
  ["Des gouttes d'eau apparaissent sur une bouteille sortie du réfrigérateur.", 'liquéfaction'],
  ['La lave d\'un volcan refroidit et devient de la roche.', 'solidification'],
  ['Le linge sèche sur le fil.', 'vaporisation'],
];

/** Températures de fusion (= de solidification) de corps purs, en °C. */
const FUSION = [['eau', 0], ['cyclohexane', 6.5], ['acide stéarique', 69], ['naphtalène', 80], ['étain', 232], ['plomb', 327]];

export default {
  id: 'pv02',
  titre: "Les changements d'état",
  theme: 'pc_matiere', niveau: '5e',
  icone: '🌡️',

  intro:
    "Un glaçon qui fond, une flaque qui sèche, la buée sur un miroir : la matière change d'état sans changer de nature. " +
    "Ce chapitre donne un nom à chaque changement d'état, montre que la <strong>masse se conserve</strong> et qu'un <strong>corps pur</strong> change d'état à température constante.",

  cours: [
    {
      type: 'definition', titre: "Nommer les changements d'état",
      contenu: "<strong>Fusion</strong> : solide → liquide. <strong>Solidification</strong> : liquide → solide. <strong>Vaporisation</strong> : liquide → gaz. <strong>Liquéfaction</strong> : gaz → liquide. Plus rares : la <strong>sublimation</strong> (solide → gaz) et la <strong>condensation</strong> (gaz → solide, comme le givre).<br>" + schemaChangements(),
    },
    {
      type: 'propriete', titre: 'Évaporation et ébullition',
      contenu: "La vaporisation se fait de deux façons : l'<strong>évaporation</strong>, lente, à la surface du liquide et à toute température (le linge qui sèche) ; l'<strong>ébullition</strong>, rapide, avec des bulles dans tout le liquide, à une température précise (100 °C pour l'eau pure, au niveau de la mer).",
    },
    {
      type: 'propriete', titre: 'Le palier de température',
      contenu: "Pendant le changement d'état d'un <strong>corps pur</strong>, la température reste <strong>constante</strong> : sur la courbe, on voit un <strong>palier</strong>. L'eau pure fond à $0$ °C et bout à $100$ °C. Un <strong>mélange</strong> (eau salée) n'a pas de palier net : c'est un moyen de reconnaître un corps pur.",
    },
    { type: 'figure', titre: 'Chauffer de la glace', contenu: "Observe la température pendant que la glace fond puis que l'eau bout. Compare avec de l'eau salée.", render: (host) => chauffage(host) },
    {
      type: 'propriete', titre: 'La masse se conserve, pas le volume',
      contenu: "Lors d'un changement d'état, la <strong>masse se conserve</strong> : 20 g de glace donnent 20 g d'eau liquide. Les particules sont les mêmes, seul leur arrangement change. En revanche le <strong>volume varie</strong> : l'eau est une exception, son volume <strong>augmente</strong> d'environ 9 % quand elle gèle (une bouteille pleine éclate au congélateur).",
    },
    {
      type: 'definition', titre: 'Températures de fusion de quelques corps purs',
      contenu: tableau([['Corps pur', ...FUSION.map((f) => f[0])], ['Fusion (°C)', ...FUSION.map((f) => dec(f[1]))]]) + "La température de fusion est la même que la température de solidification.",
    },
    {
      type: 'exemple', enonce: 'On fait geler 500 g d\'eau liquide. Quelle est la masse de glace obtenue ? Son volume est-il le même ?',
      solution_etapes: ['La masse se conserve : on obtient <strong>500 g de glace</strong>.', "Le volume, lui, augmente : la glace prend plus de place que l'eau liquide."],
    },
  ],

  methode: [
    { etape: 1, titre: "Repérer l'état de départ et d'arrivée", explication: 'Par exemple : liquide → gaz.' },
    { etape: 2, titre: 'Nommer le changement', explication: 'Fusion, solidification, vaporisation, liquéfaction.' },
    { etape: 3, titre: 'Lire une courbe', explication: "Un palier (partie horizontale) = changement d'état d'un corps pur ; sa hauteur donne la température." },
    { etape: 4, titre: 'Masse et volume', explication: 'La masse ne change pas ; le volume, si.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Nomme le changement d\'état :',
      generer() {
        const [nom, a, b] = pick(CHANGEMENTS.slice(0, 4));
        const autres = melanger(NOMS.filter((n) => n !== nom)).slice(0, 3);
        return { enonce: `Comment s'appelle le passage de l'état ${a} à l'état ${b} ?`, visuel: (h) => { h.innerHTML = schemaChangements({ masque: nom, seulement: NOMS.slice(0, 4) }); }, choix: [nom, ...autres], correct: 0, _v: { nom, a, b } };
      },
      indices: ['Fusion et solidification relient solide et liquide.', 'Vaporisation et liquéfaction relient liquide et gaz.', "Regarde le sens de la flèche."],
      correction_etapes: (st) => [`${st._v.a[0].toUpperCase() + st._v.a.slice(1)} → ${st._v.b} : c'est la <strong>${st._v.nom}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Dans la vie courante :',
      generer() {
        const [texte, nom] = pick(SITUATIONS);
        return { enonce: texte + " Quel changement d'état se produit ?", choix: NOMS.slice(0, 4), correct: NOMS.indexOf(nom), ordre_fixe: true, _v: { texte, nom } };
      },
      indices: ["Quel est l'état au départ ?", "Quel est l'état à l'arrivée ?", 'La buée est de l\'eau liquide qui vient de la vapeur de l\'air.'],
      correction_etapes: (st) => { const c = CHANGEMENTS.find((x) => x[0] === st._v.nom); return [`${c[1][0].toUpperCase() + c[1].slice(1)} → ${c[2]}.`, `C'est une <strong>${st._v.nom}</strong>.`]; },
    },
    {
      id: 'e03', niveau: 1, type: 'saisie', consigne: 'La masse se conserve :',
      generer() {
        const g = pick([20, 25, 30, 40, 50]), e = pick([150, 180, 200, 250]);
        return {
          enonce: `Un verre contient ${e} g d'eau. On y ajoute un glaçon de ${g} g. Quelle est la masse du contenu du verre quand le glaçon a entièrement fondu ?`,
          ...grandeur(e + g, 'g', { pieges: [{ valeur: e, message: "Le glaçon n'a pas disparu : il est devenu de l'eau liquide, sa masse compte toujours." }] }),
          _v: { e, g },
        };
      },
      indices: ['Lors de la fusion, la masse se conserve.', 'Le glaçon devient de l\'eau liquide de même masse.', 'Additionne les deux masses.'],
      correction_etapes: (st) => [`Le glaçon de ${st._v.g} g donne ${st._v.g} g d'eau liquide.`, `Masse totale : $${st._v.e} + ${st._v.g} = ${st._v.e + st._v.g}$ g.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Lis la courbe :',
      generer() {
        const palier = pick([0, 20, 40, 60, 80]), refroid = pick([true, false]);
        const debut = refroid ? palier + 30 : palier - 30, fin = refroid ? palier - 30 : palier + 30;
        return {
          enonce: `Voici la courbe de ${refroid ? 'refroidissement' : 'chauffage'} d'un corps pur. À quelle température se produit son changement d'état ?`,
          visuel: (h) => { h.innerHTML = schemaCourbe({ debut, palier, fin }); },
          ...grandeur(palier, '°C', { tolerance: 1, pieges: [{ valeur: debut, message: "C'est la température au départ : cherche la partie horizontale (le palier)." }, { valeur: fin, message: 'C\'est la température finale : cherche le palier.' }] }),
          _v: { palier, refroid },
        };
      },
      indices: ["Pendant le changement d'état d'un corps pur, la température ne varie pas.", 'Cherche la partie horizontale de la courbe.', 'Lis sa hauteur sur l\'axe des températures et écris « °C ».'],
      correction_etapes: (st) => ['Le palier (partie horizontale) correspond au changement d\'état.', `Il se situe à <strong>${st._v.palier} °C</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Corps pur ou mélange ?',
      generer() {
        const pur = pick([true, false]), palier = pick([10, 30, 50]);
        return {
          enonce: 'On refroidit un liquide et on relève sa température. Ce liquide est-il un corps pur ?',
          visuel: (h) => { h.innerHTML = schemaCourbe({ debut: palier + 30, palier, fin: palier - 30, avecPalier: pur }); },
          choix: ['oui : la courbe présente un palier', 'non : la courbe ne présente pas de palier'], correct: pur ? 0 : 1, ordre_fixe: true, _v: { pur },
        };
      },
      indices: ['Un corps pur change d\'état à température constante.', 'Cherche une partie parfaitement horizontale.', 'Un mélange n\'a pas de palier net.'],
      correction_etapes: (st) => [st._v.pur ? 'La courbe présente un palier : la température est constante pendant la solidification.' : 'La température ne cesse de baisser, même pendant la solidification : pas de palier.', st._v.pur ? "C'est un <strong>corps pur</strong>." : "C'est un <strong>mélange</strong>."],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: "L'état de l'eau :",
      generer() {
        const T = pick([-18, -5, 4, 20, 37, 80, 105, 120]);
        return { enonce: `À ${T} °C (au niveau de la mer), l'eau pure est à l'état :`, choix: ETATS, correct: T < 0 ? 0 : T < 100 ? 1 : 2, ordre_fixe: true, _v: { T } };
      },
      indices: ["L'eau pure fond à 0 °C.", 'Elle bout à 100 °C.', 'Entre les deux, elle est liquide.'],
      correction_etapes: (st) => [st._v.T < 0 ? `${st._v.T} °C < 0 °C : l'eau est <strong>solide</strong> (glace).` : st._v.T < 100 ? `Entre 0 °C et 100 °C : l'eau est <strong>liquide</strong>.` : `${st._v.T} °C > 100 °C : l'eau est à l'état de <strong>gaz</strong> (vapeur).`],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Identifie le corps pur :',
      generer() {
        const [nom, T] = pick(FUSION);
        return {
          enonce: `On refroidit un liquide inconnu. Voici sa courbe. À l'aide du tableau du cours, identifie ce corps pur.`,
          visuel: (h) => { h.innerHTML = schemaCourbe({ debut: T + 40, palier: T, fin: T - 25 }); },
          choix: melanger(FUSION.map((f) => f[0])).slice(0, 4).concat([nom]).filter((x, i, a) => a.indexOf(x) === i).sort((a, b) => (a === nom ? -1 : b === nom ? 1 : 0)).slice(0, 4),
          correct: 0, _v: { nom, T },
        };
      },
      indices: ['Repère le palier.', 'Lis sa température.', 'Compare aux températures de fusion du tableau.'],
      correction_etapes: (st) => [`Le palier est à environ ${dec(st._v.T)} °C.`, `C'est la température de fusion (et de solidification) du <strong>${st._v.nom}</strong>.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "Quand l'eau gèle :",
      generer() {
        const V = pick([100, 200, 300, 500, 1000]);
        return {
          enonce: `En gelant, le volume de l'eau augmente d'environ 9 %. Quel volume occupe la glace obtenue à partir de ${V} mL d'eau liquide ?`,
          ...grandeur(arrondi(V * 1.09, 1), 'mL', { tolerance: 0.6, pieges: [{ valeur: V, message: "Le volume change lors de la solidification : il augmente de 9 %." }, { valeur: arrondi(V * 0.09, 1), message: "C'est l'augmentation seule : ajoute-la au volume de départ." }] }),
          _v: { V },
        };
      },
      indices: ['9 % de V, c\'est V × 9 ÷ 100.', 'Ajoute cette augmentation au volume de départ.', 'Réponse en mL.'],
      correction_etapes: (st) => [`Augmentation : $${st._v.V} \\times 9 \\div 100 = ${dec(st._v.V * 0.09).replace(',', '{,}')}$ mL.`, `Volume de glace : $${st._v.V} + ${dec(st._v.V * 0.09).replace(',', '{,}')} = ${dec(st._v.V * 1.09).replace(',', '{,}')}$ mL.`],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Pendant que la glace fond, sa température augmente.', reponse: false, _v: { e: "Non : pendant la fusion d'un corps pur, la température reste constante (0 °C pour la glace)." } },
          { enonce: "L'évaporation peut se produire à température ambiante.", reponse: true, _v: { e: 'Oui : le linge sèche sans bouillir.' } },
          { enonce: 'Quand de l\'eau gèle, sa masse augmente.', reponse: false, _v: { e: "Non : la masse se conserve. C'est le volume qui augmente." } },
          { enonce: 'Un mélange comme l\'eau salée présente un palier bien net.', reponse: false, _v: { e: 'Non : le palier est la signature d\'un corps pur.' } },
          { enonce: 'La température de fusion de l\'eau pure est égale à sa température de solidification.', reponse: true, _v: { e: 'Oui : 0 °C dans les deux sens.' } },
        ]);
      },
      indices: ['Pense au palier.', 'Masse et volume ne se comportent pas pareil.', 'Évaporation ≠ ébullition.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le passage de l\'état liquide à l\'état solide s\'appelle :', choix: ['la solidification', 'la fusion', 'la liquéfaction', 'la vaporisation'], correct: 0, explication: 'Comme l\'eau qui gèle.' },
    { type: 'qcm', question: 'La buée sur une vitre froide est due à :', choix: ['la liquéfaction de la vapeur d\'eau', 'la fusion de la glace', 'la vaporisation de l\'eau', 'la solidification de l\'air'], correct: 0, explication: 'La vapeur d\'eau de l\'air redevient liquide au contact de la vitre froide.' },
    { type: 'vrai_faux', question: 'La masse se conserve lors d\'un changement d\'état.', reponse: true, explication: 'Les particules sont les mêmes, seul leur arrangement change.' },
    { type: 'qcm', question: "Sur la courbe de chauffage d'un corps pur, le palier indique :", choix: ["un changement d'état", 'que le chauffage est coupé', 'que la masse diminue', 'un mélange'], correct: 0, explication: 'La température reste constante pendant le changement d\'état.' },
    {
      type: 'saisie', question: 'Fusion.',
      generer() { const m = pick([15, 35, 60, 120]); return { question: `On fait fondre ${m} g de chocolat. Quelle est la masse de chocolat fondu ?`, ...grandeur(m, 'g'), explication: `La masse se conserve : ${m} g.` }; },
    },
    { type: 'qcm', question: "L'eau pure bout (au niveau de la mer) à :", choix: ['100 °C', '0 °C', '50 °C', '37 °C'], correct: 0, explication: 'Et elle fond à 0 °C.' },
  ],
};
