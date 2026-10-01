// =====================================================================
//  pr03_combustions.js — Physique-chimie 4ᵉ : les combustions.
//  Triangle du feu, combustion du carbone et du méthane, produits et
//  tests, combustion incomplète et monoxyde de carbone, éteindre un feu.
// =====================================================================

import { pick, arrondi, dec, grandeur } from '../outils.js';
import { bougieCloche } from '../figures_chimie.js';

/** Triangle du feu (fixe) ; `manque` grise le côté supprimé. */
const triangleFeu = (manque = null) => `<svg viewBox="0 0 320 170" class="pc-svg pc-schema pc-schema-large" role="img" aria-label="Le triangle du feu">
  <path d="M160 20 L284 146 L36 146 Z" class="pc-triangle-feu"/>
  <path d="M160 70 C176 88 172 104 160 112 C148 104 144 88 160 70Z" class="pc-flamme"/>
  <text x="80" y="76" text-anchor="middle" class="pc-etiquette pc-etiquette-petite ${manque === 'combustible' ? 'pc-barre' : ''}">combustible</text><text x="80" y="92" text-anchor="middle" class="pc-petit">bois, gaz, bougie…</text>
  <text x="240" y="76" text-anchor="middle" class="pc-etiquette pc-etiquette-petite ${manque === 'comburant' ? 'pc-barre' : ''}">comburant</text><text x="240" y="92" text-anchor="middle" class="pc-petit">dioxygène de l'air</text>
  <text x="160" y="164" text-anchor="middle" class="pc-etiquette pc-etiquette-petite ${manque === 'chaleur' ? 'pc-barre' : ''}">source de chaleur</text>
</svg>`;

const COMBUSTIBLES = [['un feu de bois', 'le bois'], ['une gazinière', 'le gaz (méthane)'], ['une bougie', 'la cire (paraffine)'], ['un barbecue', 'le charbon de bois (carbone)'], ['un réchaud de camping', 'le butane']];

const EXTINCTIONS = [
  ["On pose un couvercle sur une poêle d'huile qui a pris feu.", 'le comburant', "le couvercle empêche le dioxygène d'arriver"],
  ["On ferme le robinet d'arrivée du gaz.", 'le combustible', 'il n\'y a plus de gaz à brûler'],
  ['Les pompiers arrosent les braises.', 'la source de chaleur', "l'eau refroidit les braises"],
  ['On étouffe les flammes avec une couverture anti-feu.', 'le comburant', "la couverture prive le feu de dioxygène"],
  ['En forêt, on débroussaille une bande de terrain (coupe-feu).', 'le combustible', "il n'y a plus de végétation à brûler"],
];
const COTES = ['le combustible', 'le comburant', 'la source de chaleur'];

export default {
  id: 'pr03',
  titre: 'Les combustions',
  theme: 'pc_matiere', niveau: '4e',
  icone: '🔥',

  intro:
    "Gazinière, chaudière, moteur de voiture, bougie d'anniversaire : les combustions nous chauffent, nous éclairent et nous déplacent. " +
    "Mais une combustion mal réglée peut produire un gaz mortel. Ce chapitre explique ce qu'est une combustion, ce qu'elle produit, et comment éteindre un feu.",

  cours: [
    {
      type: 'definition', titre: 'Le triangle du feu',
      contenu: "Une <strong>combustion</strong> est une transformation chimique entre un <strong>combustible</strong> (bois, gaz, cire, carbone…) et un <strong>comburant</strong>, le <strong>dioxygène</strong> de l'air. Pour démarrer, elle a besoin d'une <strong>source de chaleur</strong> (flamme, étincelle). Une combustion libère de l'énergie thermique et lumineuse." + triangleFeu(),
    },
    {
      type: 'propriete', titre: 'Combustion du carbone',
      contenu: "Le charbon de bois est surtout du carbone. En brûlant, il consomme du dioxygène et produit du <strong>dioxyde de carbone</strong>, qui trouble l'eau de chaux.",
      formule: '\\text{carbone} + \\text{dioxygène} \\longrightarrow \\text{dioxyde de carbone}',
    },
    { type: 'figure', titre: 'La bougie sous la cloche', contenu: "Couvre la bougie, attends qu'elle s'éteigne, puis fais le test à l'eau de chaux. Essaie plusieurs cloches.", render: (host) => bougieCloche(host) },
    {
      type: 'propriete', titre: 'Combustion du méthane',
      contenu: "Le gaz de ville (méthane) brûle en produisant du <strong>dioxyde de carbone</strong> et de l'<strong>eau</strong> (de la buée apparaît sur un verre froid tenu au-dessus de la flamme ; elle bleuit le sulfate de cuivre anhydre).",
      formule: '\\text{méthane} + \\text{dioxygène} \\longrightarrow \\text{dioxyde de carbone} + \\text{eau}',
    },
    {
      type: 'propriete', titre: 'Combustion incomplète : danger',
      contenu: "Quand le dioxygène manque (appareil mal réglé, pièce mal aérée), la combustion est <strong>incomplète</strong> : la flamme devient <strong>jaune</strong> et produit de la suie (carbone) et du <strong>monoxyde de carbone</strong> (CO). Ce gaz est incolore, inodore et <strong>mortel</strong>. Il faut aérer, faire entretenir les chaudières et installer un détecteur de CO. Une flamme <strong>bleue</strong> indique une combustion complète.",
    },
    {
      type: 'propriete', titre: 'Éteindre un feu',
      contenu: "Pour éteindre un feu, on supprime <strong>un côté du triangle</strong> : le combustible (fermer le gaz), le comburant (couvercle, couverture anti-feu) ou la chaleur (refroidir avec de l'eau). Attention : jamais d'eau sur de l'huile en feu, elle projette l'huile enflammée.",
    },
  ],

  methode: [
    { etape: 1, titre: 'Identifier les trois éléments', explication: 'Combustible (ce qui brûle), comburant (dioxygène), source de chaleur.' },
    { etape: 2, titre: 'Nommer les produits', explication: 'Carbone → dioxyde de carbone. Méthane, butane, cire → dioxyde de carbone + eau.' },
    { etape: 3, titre: 'Prouver les produits', explication: "Eau de chaux troublée : dioxyde de carbone. Sulfate de cuivre anhydre bleui : eau." },
    { etape: 4, titre: 'Sécurité', explication: 'Flamme jaune = incomplète = monoxyde de carbone : aérer.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Le triangle du feu :',
      generer() {
        const [lieu, comb] = pick(COMBUSTIBLES), q = pick(['combustible', 'comburant']);
        const choix = q === 'combustible' ? [comb, 'le dioxygène de l\'air', 'la flamme de l\'allumette', 'la fumée'] : ["le dioxygène de l'air", comb, 'la flamme de l\'allumette', 'la fumée'];
        return { enonce: `Dans ${lieu}, quel est le ${q} ?`, choix, correct: 0, _v: { lieu, comb, q } };
      },
      indices: ['Le combustible est ce qui brûle.', 'Le comburant est toujours le même : le dioxygène.', "L'allumette fournit la chaleur de départ."],
      correction_etapes: (st) => [`Dans ${st._v.lieu}, le combustible est ${st._v.comb} et le comburant est le dioxygène de l'air.`, `Réponse : <strong>${st._v.q === 'combustible' ? st._v.comb : "le dioxygène de l'air"}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Les produits :',
      generer() {
        const [comb, prod] = pick([['du carbone (charbon de bois)', 'du dioxyde de carbone'], ['du méthane', "du dioxyde de carbone et de l'eau"], ['du butane', "du dioxyde de carbone et de l'eau"], ['de la cire de bougie', "du dioxyde de carbone et de l'eau"]]);
        return { enonce: `La combustion complète ${comb.replace(/^du /, 'du ').replace(/^de la /, 'de la ')} produit :`, choix: ['du dioxyde de carbone', "du dioxyde de carbone et de l'eau", 'du dioxygène', 'du monoxyde de carbone'], correct: prod === 'du dioxyde de carbone' ? 0 : 1, ordre_fixe: true, _v: { comb, prod } };
      },
      indices: ['Le carbone devient du dioxyde de carbone.', "Si le combustible contient de l'hydrogène (méthane, butane, cire), il se forme aussi de l'eau.", 'Le monoxyde de carbone vient des combustions incomplètes.'],
      correction_etapes: (st) => [`La combustion complète ${st._v.comb} produit <strong>${st._v.prod}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'qcm', consigne: 'Éteindre un feu :',
      generer() {
        const [texte, cote, raison] = pick(EXTINCTIONS);
        return { enonce: `${texte} Quel côté du triangle du feu supprime-t-on ?`, visuel: (h) => { h.innerHTML = triangleFeu(); }, choix: COTES, correct: COTES.indexOf(cote), ordre_fixe: true, _v: { cote, raison } };
      },
      indices: ['Combustible : ce qui brûle.', 'Comburant : le dioxygène de l\'air.', "Refroidir, c'est supprimer la chaleur."],
      correction_etapes: (st) => [`Ici, ${st._v.raison}.`, `On supprime <strong>${st._v.cote}</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'La couleur de la flamme :',
      generer() {
        const bleue = pick([true, false]);
        return { enonce: `La flamme d'une gazinière est ${bleue ? 'bleue' : 'jaune et laisse des traces noires sous la casserole'}. La combustion est :`, choix: ['complète', 'incomplète'], correct: bleue ? 0 : 1, ordre_fixe: true, _v: { bleue } };
      },
      indices: ['Une flamme bleue indique assez de dioxygène.', 'Une flamme jaune qui noircit indique un manque de dioxygène.', 'Les traces noires sont de la suie (carbone).'],
      correction_etapes: (st) => [st._v.bleue ? 'Flamme bleue : le dioxygène est en quantité suffisante.' : 'Flamme jaune et suie : le dioxygène manque.', `Combustion <strong>${st._v.bleue ? 'complète' : 'incomplète'}</strong>${st._v.bleue ? '.' : ' : risque de monoxyde de carbone, il faut régler l\'appareil et aérer.'}`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'La bougie sous la cloche :',
      generer() {
        return pick([
          { enonce: 'On couvre une bougie allumée avec une cloche. Au bout d\'un moment, elle s\'éteint. Pourquoi ?', choix: ['elle a consommé le dioxygène disponible', 'la cloche est trop froide', 'la cire est entièrement fondue', "il n'y a plus de lumière"], correct: 0, _v: { e: "Sous la cloche, la quantité de dioxygène est limitée : quand il n'en reste plus assez, la combustion s'arrête." } },
          { enonce: 'On recommence avec une cloche deux fois plus grande. La bougie :', choix: ['brûle plus longtemps', 'brûle moins longtemps', "s'éteint au même moment", 'ne s\'éteint jamais'], correct: 0, ordre_fixe: true, _v: { e: 'Une cloche plus grande contient plus d\'air, donc plus de dioxygène : la bougie brûle plus longtemps.' } },
          { enonce: "Après extinction, on verse de l'eau de chaux sous la cloche et on agite : elle se trouble. Que prouve ce test ?", choix: ['la combustion a produit du dioxyde de carbone', 'la combustion a produit de l\'eau', 'il reste du dioxygène', 'la cire est de l\'eau'], correct: 0, _v: { e: "L'eau de chaux se trouble en présence de dioxyde de carbone : c'est un produit de la combustion." } },
        ]);
      },
      indices: ['Le dioxygène est le comburant.', 'Sous la cloche, sa quantité est limitée.', "L'eau de chaux repère le dioxyde de carbone."],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e06', niveau: 3, type: 'saisie', consigne: 'Au barbecue :',
      generer() {
        const m = pick([3, 6, 24, 36, 60, 120]);
        return {
          enonce: `Quand 12 g de carbone brûlent complètement, il se forme 44 g de dioxyde de carbone. Quelle masse de dioxyde de carbone produit la combustion de ${m} g de charbon de bois (considéré comme du carbone pur) ?`,
          ...grandeur(arrondi((m * 44) / 12, 2), 'g', { tolerance: 0.05, pieges: [{ valeur: arrondi((m * 12) / 44, 2), message: 'Les masses sont proportionnelles : 12 g donnent 44 g, donc on multiplie par 44 ÷ 12.' }] }),
          _v: { m },
        };
      },
      indices: ['Les masses de carbone et de dioxyde de carbone sont proportionnelles.', `Combien de fois 12 g y a-t-il dans la masse de charbon ?`, 'Multiplie 44 g par ce nombre.'],
      correction_etapes: (st) => [`$${st._v.m} \\div 12 = ${dec(st._v.m / 12).replace(',', '{,}')}$ : il y a ${dec(st._v.m / 12)} fois plus de carbone.`, `$44 \\times ${dec(st._v.m / 12).replace(',', '{,}')} = ${dec((st._v.m * 44) / 12).replace(',', '{,}')}$ g de dioxyde de carbone.`],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Le gaz de la cuisinière :',
      generer() {
        const V = pick([2, 5, 10, 25, 50]);
        return {
          enonce: `Pour brûler complètement 1 L de méthane, il faut 2 L de dioxygène. Quel volume de dioxygène faut-il pour brûler ${V} L de méthane ?`,
          ...grandeur(2 * V, 'L', { pieges: [{ valeur: V / 2, message: 'Il faut DEUX fois plus de dioxygène que de méthane.' }] }),
          _v: { V },
        };
      },
      indices: ['1 L de méthane ↔ 2 L de dioxygène.', 'Situation de proportionnalité.', 'Multiplie par 2.'],
      correction_etapes: (st) => [`$${st._v.V} \\times 2 = ${2 * st._v.V}$ L de dioxygène.`, "C'est pour cela qu'une gazinière a besoin d'une bonne arrivée d'air."],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Le monoxyde de carbone :',
      generer() {
        return pick([
          { enonce: 'Pourquoi le monoxyde de carbone est-il particulièrement dangereux ?', choix: ['il est incolore et inodore : on ne le remarque pas', 'il sent très mauvais', 'il est rouge', 'il explose au contact de l\'eau'], correct: 0, _v: { e: "Incolore et inodore, il ne se remarque pas ; il empêche le sang de transporter le dioxygène. D'où l'intérêt d'un détecteur." } },
          { enonce: 'Dans quelle situation risque-t-on de produire du monoxyde de carbone ?', choix: ['une chaudière mal réglée dans une pièce mal aérée', 'une lampe à DEL allumée', 'un glaçon qui fond', 'un vélo qui roule'], correct: 0, _v: { e: 'Il se forme lors des combustions incomplètes, quand le dioxygène manque.' } },
        ]);
      },
      indices: ['Il vient des combustions incomplètes.', 'Nos sens ne le détectent pas.', 'Un détecteur peut sauver des vies.'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Le comburant d\'une combustion est le dioxygène.', reponse: true, _v: { e: 'Oui, celui de l\'air (21 %).' } },
          { enonce: "On peut éteindre de l'huile enflammée en jetant de l'eau dessus.", reponse: false, _v: { e: "Surtout pas : l'eau projette l'huile en feu. On couvre avec un couvercle." } },
          { enonce: 'La combustion du méthane produit de l\'eau.', reponse: true, _v: { e: "Oui : de la buée apparaît sur un verre froid au-dessus de la flamme." } },
          { enonce: 'Une combustion ne produit jamais de gaz dangereux.', reponse: false, _v: { e: 'Faux : une combustion incomplète produit du monoxyde de carbone, mortel.' } },
          { enonce: 'Une combustion libère de l\'énergie.', reponse: true, _v: { e: 'Oui : thermique et lumineuse.' } },
        ]);
      },
      indices: ['Triangle : combustible, comburant, chaleur.', 'Jamais d\'eau sur de l\'huile.', 'Produits : dioxyde de carbone, eau… ou monoxyde de carbone.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le comburant d\'une combustion est :', choix: ['le dioxygène', 'le bois', 'le diazote', 'le dioxyde de carbone'], correct: 0, explication: 'Le bois est un combustible.' },
    { type: 'qcm', question: 'La combustion du carbone produit :', choix: ['du dioxyde de carbone', "de l'eau", 'du dioxygène', 'du méthane'], correct: 0, explication: 'Il trouble l\'eau de chaux.' },
    { type: 'vrai_faux', question: 'Une flamme jaune qui noircit les casseroles indique une combustion incomplète.', reponse: true, explication: 'Le dioxygène manque : risque de monoxyde de carbone.' },
    { type: 'qcm', question: 'Poser un couvercle sur une poêle en feu supprime :', choix: ['le comburant', 'le combustible', 'la chaleur', 'la fumée'], correct: 0, explication: 'Le dioxygène ne peut plus arriver.' },
    {
      type: 'saisie', question: 'Proportionnalité.',
      generer() { const m = pick([6, 24]); return { question: `12 g de carbone donnent 44 g de dioxyde de carbone. Combien en donnent ${m} g ?`, ...grandeur((m * 44) / 12, 'g'), explication: `$44 \\times ${m} \\div 12 = ${(m * 44) / 12}$ g.` }; },
    },
  ],
};
