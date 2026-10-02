// =====================================================================
//  pr02_transformations.js — Physique-chimie 4ᵉ : les transformations
//  chimiques. Transformation physique ou chimique, réactifs et produits,
//  tests d'identification, conservation de la masse.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { balanceReaction } from '../figures_chimie.js';
import { tableau } from '../../commun.js';

const SITUATIONS = [
  ['Un glaçon fond.', false, "l'eau reste de l'eau (changement d'état)"],
  ['Une bûche brûle dans la cheminée.', true, 'le bois disparaît, de la fumée et des cendres apparaissent'],
  ['Du sucre se dissout dans le thé.', false, 'les molécules de sucre restent des molécules de sucre (dissolution)'],
  ['Un clou en fer rouille sous la pluie.', true, 'de la rouille, une nouvelle espèce, apparaît'],
  ['On fait cuire un gâteau.', true, 'la pâte se transforme en de nouvelles espèces (odeur, couleur)'],
  ["L'eau bout dans la casserole.", false, "l'eau liquide devient de la vapeur d'eau (changement d'état)"],
  ['Le lait tourne au soleil.', true, 'de nouvelles espèces se forment (goût acide, grumeaux)'],
  ['On verse du vinaigre sur du bicarbonate : ça mousse.', true, 'un gaz nouveau, le dioxyde de carbone, se forme'],
  ['Un comprimé effervescent est plongé dans l\'eau.', true, 'des bulles de dioxyde de carbone apparaissent'],
  ['On râpe une carotte.', false, 'la carotte est découpée, mais sa matière ne change pas'],
];

const TESTS = [
  ["L'eau de chaux se trouble.", 'du dioxyde de carbone'],
  ['Le sulfate de cuivre anhydre passe du blanc au bleu.', "de l'eau"],
  ['Une bûchette incandescente (braise) se rallume.', 'du dioxygène'],
  ['Une flamme approchée provoque une petite détonation (« pop »).', 'du dihydrogène'],
];
const GAZ = TESTS.map((t) => t[1]);

const BILANS = [
  { texte: 'carbone + dioxygène → dioxyde de carbone', reactifs: ['le carbone', 'le dioxygène'], produits: ['le dioxyde de carbone'] },
  { texte: 'méthane + dioxygène → dioxyde de carbone + eau', reactifs: ['le méthane', 'le dioxygène'], produits: ['le dioxyde de carbone', "l'eau"] },
  { texte: 'fer + dioxygène → oxyde de fer', reactifs: ['le fer', 'le dioxygène'], produits: ["l'oxyde de fer"] },
  { texte: 'acide chlorhydrique + fer → dihydrogène + chlorure de fer', reactifs: ["l'acide chlorhydrique", 'le fer'], produits: ['le dihydrogène', 'le chlorure de fer'] },
];

export default {
  id: 'pr02',
  titre: 'Les transformations chimiques',
  theme: 'pc_matiere', niveau: '4e',
  icone: '⚗️',

  intro:
    "Un glaçon qui fond reste de l'eau ; une bûche qui brûle devient fumée et cendres. Dans le premier cas, la matière change de forme ; dans le second, de <strong>nature</strong>. " +
    "Ce chapitre apprend à reconnaître une <strong>transformation chimique</strong>, à nommer ses réactifs et ses produits, et montre que la <strong>masse se conserve</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Physique ou chimique ?',
      contenu: "Lors d'une <strong>transformation physique</strong> (changement d'état, dissolution, broyage), les espèces chimiques restent les mêmes : l'eau reste de l'eau. Lors d'une <strong>transformation chimique</strong>, des espèces <strong>disparaissent</strong> et de <strong>nouvelles espèces apparaissent</strong> (dégagement gazeux, changement de couleur, nouvelle odeur, dépôt…).",
    },
    {
      type: 'definition', titre: 'Réactifs et produits',
      contenu: "Les espèces qui disparaissent (au moins en partie) sont les <strong>réactifs</strong> ; celles qui apparaissent sont les <strong>produits</strong>. On résume la transformation par un <strong>bilan</strong> : réactifs → produits. Exemple : carbone + dioxygène → dioxyde de carbone.",
      formule: '\\text{réactifs} \\longrightarrow \\text{produits}',
    },
    {
      type: 'propriete', titre: "Les tests d'identification",
      contenu: tableau([
        ['Espèce recherchée', 'Test', 'Résultat si présente'],
        ['dioxyde de carbone', "barboter dans l'eau de chaux", "l'eau de chaux se trouble"],
        ['eau', 'sulfate de cuivre anhydre (blanc)', 'il devient bleu'],
        ['dioxygène', 'bûchette incandescente', 'elle se rallume'],
        ['dihydrogène', 'flamme', 'petite détonation (« pop »)'],
      ]),
    },
    {
      type: 'propriete', titre: 'Un exemple : la corrosion du fer',
      contenu: "À l'air humide, le fer se couvre de <strong>rouille</strong>, une substance brun-rouge faite d'oxydes de fer. C'est une transformation chimique lente, la <strong>corrosion</strong> : le fer réagit avec le dioxygène, en présence d'eau. On protège le fer avec une peinture ou une couche de zinc (galvanisation).",
    },
    { type: 'figure', titre: 'Une réaction sur une balance', contenu: 'Lance la réaction dans le flacon fermé par un ballon, puis dans le flacon ouvert : compare les masses.', render: (host) => balanceReaction(host) },
    {
      type: 'propriete', titre: 'La masse se conserve',
      contenu: "Au cours d'une transformation chimique, la <strong>masse totale se conserve</strong> : la masse des réactifs qui ont réagi est égale à la masse des produits formés. Si la masse semble diminuer, c'est qu'un gaz s'est échappé. Explication : les atomes des réactifs ne disparaissent pas, ils se <strong>réarrangent</strong> pour former les produits.",
      formule: 'm_{\\text{réactifs}} = m_{\\text{produits}}',
    },
    {
      type: 'exemple', enonce: '$12$ g de carbone brûlent complètement dans $32$ g de dioxygène. Quelle masse de dioxyde de carbone se forme ?',
      solution_etapes: ['La masse se conserve : masse des produits = masse des réactifs.', '$12 + 32 = 44$ g de dioxyde de carbone.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Observer', explication: 'Bulles d\'un gaz nouveau, couleur, odeur, dépôt : indices d\'une transformation chimique.' },
    { etape: 2, titre: 'Identifier', explication: "Réaliser le test adapté (eau de chaux, sulfate de cuivre anhydre, bûchette, flamme)." },
    { etape: 3, titre: 'Écrire le bilan', explication: 'Réactifs à gauche de la flèche, produits à droite.' },
    { etape: 4, titre: 'Utiliser la conservation', explication: 'Masse des réactifs consommés = masse des produits formés.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Physique ou chimique ?',
      generer() {
        const [texte, chim, raison] = pick(SITUATIONS);
        return { enonce: `${texte} C'est une transformation :`, choix: ['physique', 'chimique'], correct: chim ? 1 : 0, ordre_fixe: true, _v: { chim, raison } };
      },
      indices: ['Des espèces nouvelles apparaissent-elles ?', 'Changement d\'état, dissolution, découpage : transformation physique.', 'Gaz nouveau, rouille, cuisson, combustion : transformation chimique.'],
      correction_etapes: (st) => [`Ici, ${st._v.raison}.`, `C'est une transformation <strong>${st._v.chim ? 'chimique' : 'physique'}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: "Test d'identification :",
      generer() {
        const [obs, gaz] = pick(TESTS);
        return { enonce: `${obs} Cela prouve qu'il y a :`, choix: GAZ, correct: GAZ.indexOf(gaz), ordre_fixe: true, _v: { obs, gaz } };
      },
      indices: ["L'eau de chaux sert à repérer un gaz de la respiration.", 'Le sulfate de cuivre anhydre repère l\'eau.', 'Une braise se ravive grâce au comburant.'],
      correction_etapes: (st) => [st._v.obs, `C'est le test caractéristique : il y a <strong>${st._v.gaz}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'qcm', consigne: 'Réactif ou produit ?',
      generer() {
        const B = pick(BILANS), estReactif = pick([true, false]), espece = pick(estReactif ? B.reactifs : B.produits);
        return { enonce: `Bilan : ${B.texte}. Dans cette transformation, ${espece} est :`, choix: ['un réactif', 'un produit'], correct: estReactif ? 0 : 1, ordre_fixe: true, _v: { B, espece, estReactif } };
      },
      indices: ['Les réactifs sont écrits avant la flèche.', 'Les produits sont écrits après la flèche.', 'Les réactifs disparaissent, les produits apparaissent.'],
      correction_etapes: (st) => [`${st._v.espece[0].toUpperCase() + st._v.espece.slice(1)} est écrit ${st._v.estReactif ? 'avant' : 'après'} la flèche.`, `C'est un <strong>${st._v.estReactif ? 'réactif' : 'produit'}</strong>.`],
    },
    {
      id: 'e04', niveau: 1, type: 'saisie', consigne: 'Flacon fermé :',
      generer() {
        const m = arrondi(randInt(1800, 3500) / 10, 1);
        return {
          enonce: `On réalise une transformation chimique qui produit un gaz, dans un flacon fermé par un ballon posé sur une balance. Avant la réaction, la balance indique ${dec(m)} g. Qu'indique-t-elle à la fin ?`,
          ...grandeur(m, 'g', { tolerance: 0.01 }),
          _v: { m },
        };
      },
      indices: ['Le flacon est fermé : rien n\'entre, rien ne sort.', 'Les atomes se réarrangent, ils ne disparaissent pas.', 'La masse totale se conserve.'],
      correction_etapes: (st) => ['Le système est fermé : le gaz produit reste dans le ballon.', `La masse se conserve : <strong>${dec(st._v.m)} g</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Flacon ouvert :',
      generer() {
        const m1 = arrondi(randInt(1800, 3500) / 10, 1), gaz = arrondi(randInt(8, 40) / 10, 1), m2 = arrondi(m1 - gaz, 1);
        return {
          enonce: `Même expérience, mais dans un flacon ouvert. Au début : ${dec(m1)} g. À la fin : ${dec(m2)} g. Quelle masse de gaz s'est échappée ?`,
          ...grandeur(gaz, 'g', { tolerance: 0.01, pieges: [{ valeur: arrondi(m1 + m2, 1), message: 'La masse de gaz est la DIFFÉRENCE entre les deux masses.' }] }),
          _v: { m1, m2, gaz },
        };
      },
      indices: ['La masse totale se conserve, mais le gaz est sorti du flacon.', 'La masse « perdue » est celle du gaz.', 'Calcule masse au début − masse à la fin.'],
      correction_etapes: (st) => [`$m_{\\text{gaz}} = ${dec(st._v.m1).replace(',', '{,}')} - ${dec(st._v.m2).replace(',', '{,}')}$.`, `$m_{\\text{gaz}} = ${dec(st._v.gaz).replace(',', '{,}')}$ g.`],
    },
    {
      id: 'e06', niveau: 3, type: 'saisie', consigne: 'Masse de produit formé :',
      generer() {
        // [réactif 1, masse, réactif 2, masse, [« du produit », « de produit »], autre produit éventuel]
        const [R1, m1, R2, m2, P, autre] = pick([
          ['carbone', 12, 'dioxygène', 32, ['du dioxyde de carbone', 'de dioxyde de carbone'], null],
          ['méthane', 16, 'dioxygène', 64, ["de l'eau", "d'eau"], ['dioxyde de carbone', 44]],
          ['fer', 56, 'soufre', 32, ['du sulfure de fer', 'de sulfure de fer'], null],
          ['cuivre', 127, 'dioxygène', 32, ["de l'oxyde de cuivre", "d'oxyde de cuivre"], null],
        ]);
        const k = pick([1, 2, 3, 0.5]), a = arrondi(m1 * k, 2), b = arrondi(m2 * k, 2), c = autre ? arrondi(autre[1] * k, 2) : 0, total = arrondi(a + b - c, 2);
        return {
          enonce: `${dec(a)} g de ${R1} réagissent entièrement avec ${dec(b)} g de ${R2}.${autre ? ` Il se forme ${dec(c)} g de ${autre[0]} et ${P[0]}.` : ` Il se forme uniquement ${P[0]}.`} Quelle masse ${P[1]} se forme ?`,
          ...grandeur(total, 'g', { tolerance: 0.01, pieges: autre ? [{ valeur: arrondi(a + b, 2), message: `C'est la masse de TOUS les produits : retire celle du ${autre[0]}.` }] : [] }),
          _v: { a, b, c, total, autre },
        };
      },
      indices: ['Masse des réactifs = masse des produits.', 'Additionne les masses des réactifs.', "S'il y a deux produits, retire la masse de l'autre produit."],
      correction_etapes: (st) => [`Réactifs : $${dec(st._v.a).replace(',', '{,}')} + ${dec(st._v.b).replace(',', '{,}')} = ${dec(st._v.a + st._v.b).replace(',', '{,}')}$ g.`, st._v.autre ? `Produit cherché : $${dec(st._v.a + st._v.b).replace(',', '{,}')} - ${dec(st._v.c).replace(',', '{,}')} = ${dec(st._v.total).replace(',', '{,}')}$ g.` : `Il se forme <strong>${dec(st._v.total)} g</strong> de produit.`],
    },
    {
      id: 'e07', niveau: 2, type: 'ordonner_etapes', consigne: 'Identifier le gaz produit :',
      generer() {
        return {
          etapes: [
            'Mélanger les réactifs dans un tube à essais',
            'Boucher le tube avec un bouchon muni d\'un tube à dégagement',
            "Faire barboter le gaz dans de l'eau de chaux",
            "Observer : l'eau de chaux se trouble",
            'Conclure : le gaz produit est du dioxyde de carbone',
          ],
        };
      },
      indices: ["On fait d'abord la réaction.", 'On dirige le gaz vers le réactif de test.', 'On observe avant de conclure.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Expliquer :',
      generer() {
        return pick([
          { enonce: "Dans un flacon ouvert, la masse diminue pendant la réaction entre le vinaigre et le bicarbonate. Pourquoi ?", choix: ["un gaz produit s'échappe dans l'air", 'de la matière disparaît', 'la balance est mal réglée', 'les réactifs deviennent plus légers'], correct: 0, _v: { e: "Le dioxyde de carbone formé s'échappe : sa masse n'est plus sur la balance. La masse totale, elle, se conserve." } },
          { enonce: 'Pourquoi la masse se conserve-t-elle lors d\'une transformation chimique ?', choix: ['les atomes se réarrangent sans disparaître ni apparaître', 'les molécules restent les mêmes', 'les réactifs ne réagissent pas', 'les produits sont des gaz'], correct: 0, _v: { e: 'Les molécules changent, mais ce sont les mêmes atomes, en même nombre : la masse totale ne change pas.' } },
        ]);
      },
      indices: ['Que deviennent les atomes ?', 'Un gaz a une masse.', 'Rien ne se perd, rien ne se crée, tout se transforme (Lavoisier).'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Lors d\'une transformation chimique, de nouvelles espèces chimiques apparaissent.', reponse: true, _v: { e: 'Oui : ce sont les produits.' } },
          { enonce: 'La dissolution du sel dans l\'eau est une transformation chimique.', reponse: false, _v: { e: 'Non : le sel est toujours là (on peut le récupérer par évaporation). C\'est une transformation physique.' } },
          { enonce: "L'eau de chaux permet d'identifier le dioxygène.", reponse: false, _v: { e: "Non : elle identifie le dioxyde de carbone. Le dioxygène ravive une bûchette incandescente." } },
          { enonce: 'Les réactifs sont écrits à gauche de la flèche.', reponse: true, _v: { e: 'Oui : réactifs → produits.' } },
          { enonce: 'Au cours d\'une transformation chimique, des atomes disparaissent.', reponse: false, _v: { e: 'Non : ils se réarrangent ; c\'est pourquoi la masse se conserve.' } },
        ]);
      },
      indices: ['Physique : mêmes espèces. Chimique : nouvelles espèces.', 'Chaque test identifie une espèce précise.', 'Les atomes se conservent.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Laquelle est une transformation chimique ?', choix: ['la combustion du bois', 'la fonte de la glace', 'la dissolution du sucre', "l'ébullition de l'eau"], correct: 0, explication: 'Des espèces nouvelles apparaissent (fumées, cendres).' },
    { type: 'qcm', question: "L'eau de chaux se trouble en présence de :", choix: ['dioxyde de carbone', 'dioxygène', 'eau', 'dihydrogène'], correct: 0, explication: 'C\'est le test du dioxyde de carbone.' },
    { type: 'vrai_faux', question: 'Au cours d\'une transformation chimique, la masse totale se conserve.', reponse: true, explication: 'Les atomes se réarrangent.' },
    {
      type: 'saisie', question: 'Conservation.',
      generer() { const a = pick([6, 12, 24]), b = (a * 8) / 3; return { question: `${a} g de carbone réagissent avec ${dec(b)} g de dioxygène et forment uniquement du dioxyde de carbone. Masse de dioxyde de carbone ?`, ...grandeur(arrondi(a + b, 2), 'g', { tolerance: 0.01 }), explication: `$${a} + ${dec(b).replace(',', '{,}')} = ${dec(a + b).replace(',', '{,}')}$ g.` }; },
    },
    { type: 'qcm', question: 'Dans « carbone + dioxygène → dioxyde de carbone », le dioxygène est :', choix: ['un réactif', 'un produit', 'un catalyseur', 'une molécule d\'eau'], correct: 0, explication: 'Il est écrit avant la flèche.' },
  ],
};
