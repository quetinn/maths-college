// =====================================================================
//  pv01_etats_matiere.js — Physique-chimie 5ᵉ : les états de la matière.
//  Solide, liquide, gaz : propriétés (forme, volume, compressibilité),
//  modèle particulaire, l'eau sur Terre, l'air a une masse.
// =====================================================================

import { pick, arrondi, dec, grandeur, melanger } from '../outils.js';
import { particules, schemaParticules } from '../figures_cycle.js';
import { tableau } from '../../commun.js';

const ETATS = ['solide', 'liquide', 'gaz'];

/** Corps usuels à température ambiante : [nom, état, raison]. */
const CORPS = [
  ['le lait', 'liquide', 'il coule et prend la forme du verre'],
  ['un glaçon', 'solide', 'il garde sa forme'],
  ["l'air", 'gaz', "il occupe tout l'espace disponible"],
  ["l'huile", 'liquide', 'elle coule et prend la forme de la bouteille'],
  ['la vapeur d\'eau', 'gaz', "c'est de l'eau à l'état gazeux, invisible"],
  ['le dioxygène', 'gaz', "c'est un des gaz de l'air"],
  ['un clou en fer', 'solide', 'il garde sa forme'],
  ["le jus d'orange", 'liquide', 'il coule et prend la forme du récipient'],
  ['le sable', 'solide', 'chaque grain garde sa forme : c\'est un solide en grains (divisé)'],
  ['le sucre en poudre', 'solide', 'chaque grain garde sa forme : c\'est un solide divisé'],
  ['le dioxyde de carbone', 'gaz', "c'est un gaz (celui des bulles de soda)"],
  ['le vinaigre', 'liquide', 'il coule et prend la forme du récipient'],
];

const PROPRIETES = {
  solide: { forme: true, volume: true, comp: false },
  liquide: { forme: false, volume: true, comp: false },
  gaz: { forme: false, volume: false, comp: true },
};

export default {
  id: 'pv01',
  titre: 'Les états de la matière',
  theme: 'pc_matiere', niveau: '5e',
  icone: '🧊',

  intro:
    "Un glaçon, l'eau du robinet, la buée qui s'échappe d'une casserole : c'est toujours de l'eau, mais dans des <strong>états</strong> différents. " +
    "Dans ce chapitre, on apprend à reconnaître un solide, un liquide et un gaz, et à expliquer leurs différences grâce aux <strong>particules</strong> qui composent la matière.",

  cours: [
    {
      type: 'definition', titre: 'Trois états physiques',
      contenu: "La matière existe sous trois <strong>états physiques</strong> : <strong>solide</strong> (glace, bois, fer), <strong>liquide</strong> (eau, huile, lait) et <strong>gaz</strong> (air, vapeur d'eau, dioxygène). Sur Terre, l'eau existe dans les trois états : glace des pôles, eau liquide des océans, vapeur d'eau de l'air.",
    },
    {
      type: 'propriete', titre: 'Les propriétés de chaque état',
      contenu: tableau([
        ['', 'Solide', 'Liquide', 'Gaz'],
        ['Forme propre', 'oui', 'non : prend la forme du récipient', 'non'],
        ['Volume propre', 'oui', 'oui', "non : occupe tout l'espace"],
        ['Compressible', 'non', 'non', 'oui'],
      ]) + "La surface libre d'un liquide au repos est <strong>plane et horizontale</strong>. Un solide peut être <strong>divisé</strong> (sable, farine) : il coule, mais chaque grain garde sa forme.",
    },
    {
      type: 'definition', titre: 'Le modèle particulaire',
      contenu: "Toute matière est faite de minuscules <strong>particules</strong> (des molécules), invisibles même au microscope ordinaire. Ce qui change d'un état à l'autre, c'est leur <strong>arrangement</strong> et leur <strong>mouvement</strong> : serrées et ordonnées dans un solide, serrées et désordonnées dans un liquide, éloignées et désordonnées dans un gaz.",
    },
    { type: 'figure', titre: 'Les particules en mouvement', contenu: "Choisis un état et observe comment bougent les particules.", render: (host) => particules(host) },
    {
      type: 'propriete', titre: "La vapeur d'eau est invisible",
      contenu: "Le « nuage blanc » au-dessus d'une casserole ou d'une bouilloire n'est pas de la vapeur : ce sont de fines <strong>gouttelettes d'eau liquide</strong>. La vapeur d'eau, elle, est un gaz <strong>invisible</strong>, comme l'air.",
    },
    {
      type: 'propriete', titre: "L'air a une masse",
      contenu: "Un gaz est de la matière : il a une masse. Un litre d'air a une masse d'environ $1{,}2$ g. Un ballon qu'on gonfle devient donc (un peu) plus lourd. Comme l'air est compressible, on peut en faire entrer beaucoup dans un petit volume (pneu, bouteille de plongée).",
      formule: '1 \\text{ L d\'air} \\approx 1{,}2 \\text{ g}',
    },
    {
      type: 'exemple', enonce: 'On bouche une seringue pleine d\'air et on appuie sur le piston. Que se passe-t-il ? Et avec une seringue pleine d\'eau ?',
      solution_etapes: ["Avec de l'air, le piston s'enfonce : un gaz est <strong>compressible</strong>, ses particules se rapprochent.", "Avec de l'eau, le piston ne bouge presque pas : un liquide est <strong>incompressible</strong>, ses particules sont déjà serrées."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Observer la forme', explication: 'Garde-t-il sa forme quand on le change de récipient ? Oui : solide.' },
    { etape: 2, titre: 'Observer le volume', explication: "Occupe-t-il tout le récipient, même fermé et grand ? Oui : gaz. Sinon : liquide." },
    { etape: 3, titre: 'Tester la compression', explication: 'Seringue bouchée : seul un gaz se comprime.' },
    { etape: 4, titre: 'Expliquer avec les particules', explication: 'Serrées et rangées / serrées en désordre / éloignées en désordre.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Quel est son état ?',
      generer() {
        const [nom, etat, raison] = pick(CORPS);
        return { enonce: `À température ambiante, ${nom} est :`, choix: ETATS, correct: ETATS.indexOf(etat), ordre_fixe: true, _v: { nom, etat, raison } };
      },
      indices: ['Garde-t-il sa forme ?', "Occupe-t-il tout l'espace disponible ?", 'Un solide en grains (sable) reste un solide.'],
      correction_etapes: (st) => [`${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} est à l'état <strong>${st._v.etat}</strong> : ${st._v.raison}.`],
    },
    {
      id: 'e02', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un liquide prend la forme du récipient qui le contient.', reponse: true, _v: { e: 'Oui : il n\'a pas de forme propre, mais il a un volume propre.' } },
          { enonce: 'Un gaz a un volume propre.', reponse: false, _v: { e: "Non : un gaz occupe tout l'espace qui lui est offert." } },
          { enonce: 'On peut comprimer un solide dans une seringue.', reponse: false, _v: { e: 'Non : seuls les gaz sont compressibles.' } },
          { enonce: 'La buée blanche au-dessus d\'une casserole est de la vapeur d\'eau.', reponse: false, _v: { e: "Non : ce sont des gouttelettes d'eau liquide. La vapeur d'eau est invisible." } },
          { enonce: "L'air a une masse.", reponse: true, _v: { e: "Oui : environ 1,2 g par litre. Un gaz est de la matière." } },
          { enonce: 'Le sable coule : c\'est donc un liquide.', reponse: false, _v: { e: "Non : c'est un solide divisé ; chaque grain garde sa forme." } },
          { enonce: "La surface libre d'un liquide au repos est horizontale.", reponse: true, _v: { e: 'Oui, même si on penche le récipient.' } },
        ]);
      },
      indices: ['Rappelle-toi le tableau des propriétés.', 'Pense à la seringue bouchée.', "Ce qui est invisible n'est pas forcément « rien »."],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Lis le modèle :',
      generer() {
        const ordre = melanger([...ETATS]), cible = pick(ETATS);
        return {
          enonce: `Chaque récipient contient la même substance dans un état différent. Lequel représente l'état <strong>${cible}</strong> ?`,
          visuel: (h) => { h.innerHTML = schemaParticules(ordre); },
          choix: ['A', 'B', 'C'], correct: ordre.indexOf(cible), ordre_fixe: true, _v: { ordre, cible },
        };
      },
      indices: ['Solide : particules serrées et rangées.', 'Liquide : serrées mais en désordre, au fond du récipient.', 'Gaz : particules éloignées, partout dans le récipient fermé.'],
      correction_etapes: (st) => [`Le récipient <strong>${'ABC'[st._v.ordre.indexOf(st._v.cible)]}</strong> montre des particules ${{ solide: 'serrées et rangées', liquide: 'serrées mais en désordre', gaz: 'éloignées et dispersées' }[st._v.cible]} : c'est l'état ${st._v.cible}.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Quel état ?',
      generer() {
        const q = pick([
          ['a un volume propre mais pas de forme propre', 'liquide'],
          ['a une forme propre et un volume propre', 'solide'],
          ["n'a ni forme propre ni volume propre", 'gaz'],
          ['peut être comprimé', 'gaz'],
          ['a des particules serrées et désordonnées', 'liquide'],
          ['a des particules qui vibrent sur place, sans se déplacer', 'solide'],
        ]);
        return { enonce: `Quel état de la matière ${q[0]} ?`, choix: ETATS, correct: ETATS.indexOf(q[1]), ordre_fixe: true, _v: { q } };
      },
      indices: ['Forme propre : seul le solide.', 'Volume propre : solide et liquide.', 'Compressible : seul le gaz.'],
      correction_etapes: (st) => [`C'est l'état <strong>${st._v.q[1]}</strong> : il ${st._v.q[0]}.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: "La masse de l'air :",
      generer() {
        const V = pick([2, 3, 5, 10, 20, 50]);
        return {
          enonce: `Un litre d'air a une masse de 1,2 g. Quelle est la masse de ${V} L d'air ?`,
          ...grandeur(arrondi(1.2 * V, 2), 'g', { tolerance: 0.01, pieges: [{ valeur: 0, message: "L'air est de la matière : il a une masse !" }, { valeur: arrondi(V / 1.2, 2), message: 'Tu as divisé : pour V litres, on multiplie la masse d\'un litre par V.' }] }),
          _v: { V },
        };
      },
      indices: ['1 L pèse 1,2 g.', `Pour plusieurs litres, on multiplie.`, 'Écris l\'unité : « g ».'],
      correction_etapes: (st) => [`$m = 1{,}2 \\times ${st._v.V}$.`, `$m = ${dec(arrondi(1.2 * st._v.V, 2)).replace(',', '{,}')}$ g.`],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'La seringue bouchée :',
      generer() {
        const [contenu, etat] = pick([["de l'air", 'gaz'], ["de l'eau", 'liquide'], ["de l'huile", 'liquide'], ['du dioxyde de carbone', 'gaz']]);
        return {
          enonce: `On remplit une seringue ${contenu}, on bouche l'extrémité et on appuie sur le piston. Que se passe-t-il ?`,
          choix: ["le piston s'enfonce", 'le piston ne bouge presque pas'], correct: etat === 'gaz' ? 0 : 1, ordre_fixe: true, _v: { contenu, etat },
        };
      },
      indices: ['Quel est l\'état du contenu ?', 'Seul un gaz est compressible.', 'Dans un liquide, les particules sont déjà serrées.'],
      correction_etapes: (st) => [`La seringue contient ${st._v.contenu}, à l'état ${st._v.etat}.`, st._v.etat === 'gaz' ? "Un gaz est <strong>compressible</strong> : ses particules se rapprochent, le piston s'enfonce." : 'Un liquide est <strong>incompressible</strong> : le piston ne bouge presque pas.'],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Le ballon gonflé :',
      generer() {
        const m0 = pick([250, 310, 420, 435]), V = pick([2, 3, 4, 5]), m = arrondi(m0 + 1.2 * V, 1);
        return {
          enonce: `Un ballon de basket dégonflé a une masse de ${m0} g. On y fait entrer ${V} L d'air avec une pompe (1 L d'air pèse 1,2 g). Quelle masse indique la balance ensuite ?`,
          ...grandeur(m, 'g', { tolerance: 0.05, pieges: [{ valeur: m0, message: "L'air ajouté a une masse : le ballon devient plus lourd." }, { valeur: arrondi(1.2 * V, 1), message: "C'est la masse de l'air seul ; ajoute la masse du ballon." }] }),
          _v: { m0, V, m },
        };
      },
      indices: ["Calcule d'abord la masse de l'air ajouté.", 'Ajoute-la à la masse du ballon dégonflé.', 'Réponse en g.'],
      correction_etapes: (st) => [`Masse d'air : $1{,}2 \\times ${st._v.V} = ${dec(1.2 * st._v.V).replace(',', '{,}')}$ g.`, `Balance : $${st._v.m0} + ${dec(1.2 * st._v.V).replace(',', '{,}')} = ${dec(st._v.m).replace(',', '{,}')}$ g.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Au-dessus de la casserole :',
      generer() {
        return {
          enonce: "L'eau bout dans une casserole. On voit un nuage blanc un peu au-dessus. Juste au-dessus de l'eau, on ne voit rien. Qu'y a-t-il juste au-dessus de l'eau ?",
          choix: ["de la vapeur d'eau, invisible", 'de la fumée', "de l'eau liquide en gouttelettes", 'rien du tout'], correct: 0, _v: {},
        };
      },
      indices: ['La vapeur d\'eau est un gaz.', 'Un gaz comme la vapeur d\'eau est invisible.', 'Le nuage blanc, plus haut, apparaît quand la vapeur refroidit.'],
      correction_etapes: () => ["Juste au-dessus de l'eau : de la <strong>vapeur d'eau</strong>, invisible.", "En refroidissant dans l'air, elle redevient liquide sous forme de fines gouttelettes : c'est le nuage blanc que l'on voit."],
    },
    {
      id: 'e09', niveau: 3, type: 'ordonner_etapes', consigne: 'Du plus serré au moins serré :',
      generer() {
        return { etapes: ['Solide : particules serrées et rangées', 'Liquide : particules serrées mais désordonnées', 'Gaz : particules éloignées et désordonnées'] };
      },
      indices: ['Dans quel état les particules sont-elles rangées ?', 'Liquide et solide : particules serrées.', 'Le gaz a les particules les plus éloignées.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'eau liquide a :", choix: ['un volume propre mais pas de forme propre', 'une forme propre', 'ni forme ni volume propres', 'une forme propre mais pas de volume propre'], correct: 0, explication: 'Un liquide prend la forme du récipient mais garde son volume.' },
    { type: 'qcm', question: 'Quel état est compressible ?', choix: ['le gaz', 'le liquide', 'le solide', 'aucun'], correct: 0, explication: 'Ses particules sont éloignées : on peut les rapprocher.' },
    { type: 'vrai_faux', question: 'La vapeur d\'eau est visible.', reponse: false, explication: "Elle est invisible ; le nuage blanc est fait de gouttelettes d'eau liquide." },
    { type: 'qcm', question: 'Dans un solide, les particules sont :', choix: ['serrées et rangées', 'serrées et désordonnées', 'éloignées et désordonnées', 'immobiles et éloignées'], correct: 0, explication: 'Elles vibrent sur place, sans se déplacer.' },
    {
      type: 'saisie', question: "Masse d'air.",
      generer() { const V = pick([4, 6, 8, 15]); return { question: `Un litre d'air pèse 1,2 g. Quelle est la masse de ${V} L d'air ?`, ...grandeur(arrondi(1.2 * V, 2), 'g', { tolerance: 0.01 }), explication: `$1{,}2 \\times ${V} = ${dec(1.2 * V).replace(',', '{,}')}$ g.` }; },
    },
    { type: 'qcm', question: 'Le sable qui s\'écoule d\'un sablier est :', choix: ['un solide divisé', 'un liquide', 'un gaz', 'un mélange de liquide et de gaz'], correct: 0, explication: 'Chaque grain garde sa forme.' },
  ],
};
