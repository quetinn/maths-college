// =====================================================================
//  p03_acides_bases.js — Physique-chimie 3ᵉ : quand les acides et les
//  bases réagissent. pH, ions H⁺ / HO⁻, dilution, sécurité, réaction
//  acide + métal (dihydrogène), acide + base, équation de réaction.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { echellePH, ferAcide, schemaPH, PRODUITS_PH } from '../figures.js';

const nature = (p) => (p < 7 ? 'acide' : p > 7 ? 'basique' : 'neutre');

/** Équations à compléter : [texte avec {0}, coefficient attendu, explication]. */
const EQUATIONS = [
  ['Fe + {0} H⁺ → Fe²⁺ + H₂', 2, "À droite : 2 atomes H (dans H₂) et 2 charges + (Fe²⁺). Il faut donc 2 ions H⁺ à gauche."],
  ['Zn + {0} H⁺ → Zn²⁺ + H₂', 2, "2 atomes H dans H₂ et 2 charges + portées par Zn²⁺ : il faut 2 H⁺."],
  ['Mg + {0} H⁺ → Mg²⁺ + H₂', 2, "2 atomes H et 2 charges + à droite : 2 H⁺ à gauche."],
  ['C + {0} O₂ → CO₂', 1, "Un O₂ apporte les 2 atomes O de CO₂ : le coefficient vaut 1."],
  ['2 H₂ + {0} O₂ → 2 H₂O', 1, "À droite : 2 × 1 = 2 atomes O. Un seul O₂ suffit."],
  ['CH₄ + {0} O₂ → CO₂ + 2 H₂O', 2, "À droite : 2 O dans CO₂ + 2 O dans 2 H₂O = 4 atomes O, soit 2 O₂."],
  ['H⁺ + HO⁻ → {0} H₂O', 1, "H⁺ + HO⁻ contient 2 H et 1 O : une molécule d'eau."],
];

export default {
  id: 'p03',
  titre: 'Quand les acides et les bases réagissent',
  theme: 'pc_matiere', niveau: '3e',
  icone: '🧫',

  intro:
    "Le citron est acide, le savon est basique, l'eau pure est neutre. Le <strong>pH</strong> mesure cette acidité. " +
    "Les acides réagissent avec certains métaux en libérant un gaz qui « aboie » au contact d'une flamme, et avec les bases en chauffant. " +
    "On apprend à lire le pH, à diluer sans danger et à écrire l'<strong>équation</strong> d'une réaction en conservant les atomes.",

  cours: [
    {
      type: 'definition', titre: "Le pH d'une solution",
      contenu: "Le <strong>pH</strong> est un nombre entre 0 et 14 qui indique si une solution est <strong>acide</strong> (pH &lt; 7), <strong>neutre</strong> (pH = 7) ou <strong>basique</strong> (pH &gt; 7). On le mesure avec du papier pH ou un pH-mètre. Plus le pH est petit, plus la solution est acide.",
    },
    { type: 'figure', titre: 'Échelle de pH', contenu: 'Choisis un produit du quotidien, puis dilue-le.', render: (host) => echellePH(host) },
    {
      type: 'propriete', titre: 'Les ions H⁺ et HO⁻',
      contenu: "Une solution <strong>acide</strong> contient plus d'ions hydrogène H⁺ que d'ions hydroxyde HO⁻. Une solution <strong>basique</strong> contient plus d'ions HO⁻ que d'ions H⁺. Une solution neutre en contient autant.",
    },
    {
      type: 'propriete', titre: 'Diluer et manipuler sans danger',
      contenu: "Diluer (ajouter de l'eau) rapproche le pH de 7 : le pH d'une solution acide <strong>augmente</strong>, celui d'une solution basique <strong>diminue</strong>, sans jamais franchir 7. " +
        "Les acides et bases concentrés sont <strong>corrosifs</strong> : lunettes, gants, blouse. Pour diluer, on verse toujours <strong>l'acide dans l'eau</strong>, jamais l'inverse (projections).",
    },
    {
      type: 'definition', titre: 'Transformation chimique et équation',
      contenu: "Lors d'une transformation chimique, des <strong>réactifs</strong> disparaissent et des <strong>produits</strong> apparaissent. On l'écrit par une <strong>équation</strong> : réactifs → produits. " +
        "Les atomes se réarrangent mais <strong>se conservent</strong> : même nombre d'atomes de chaque élément (et mêmes charges) des deux côtés. C'est pourquoi la <strong>masse totale se conserve</strong>.",
    },
    {
      type: 'propriete', titre: 'Acide + métal',
      contenu: "L'acide chlorhydrique (H⁺ + Cl⁻) réagit avec le fer : le fer disparaît, un gaz se dégage. Ce gaz produit une petite détonation au contact d'une flamme : c'est le <strong>dihydrogène H₂</strong>. Il se forme aussi des ions fer II (précipité vert avec la soude).",
      formule: '\\text{Fe} + 2\\,\\text{H}^{+} \\rightarrow \\text{Fe}^{2+} + \\text{H}_2',
    },
    { type: 'figure', titre: 'Clou de fer dans l\'acide', contenu: 'Des bulles de gaz montent le long du clou. Approche une allumette pour tester le gaz.', render: (host) => ferAcide(host) },
    {
      type: 'propriete', titre: 'Acide + base',
      contenu: "Quand on mélange un acide et une base, les ions H⁺ et HO⁻ réagissent pour former de l'eau. La réaction dégage de la chaleur et le pH se rapproche de 7.",
      formule: '\\text{H}^{+} + \\text{HO}^{-} \\rightarrow \\text{H}_2\\text{O}',
    },
    {
      type: 'exemple', enonce: "Vérifie que l'équation $\\text{Fe} + 2\\,\\text{H}^{+} \\rightarrow \\text{Fe}^{2+} + \\text{H}_2$ est bien équilibrée.",
      solution_etapes: ['Fer : 1 atome à gauche, 1 à droite.', 'Hydrogène : 2 à gauche (2 H⁺), 2 à droite (H₂).', 'Charges : 2 × (+1) = +2 à gauche, +2 à droite (Fe²⁺). Tout est conservé.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Écrire réactifs et produits', explication: 'À gauche de la flèche ce qui disparaît, à droite ce qui apparaît.' },
    { etape: 2, titre: 'Compter les atomes', explication: 'Pour chaque élément, compte les atomes de chaque côté. Un chiffre en indice (H₂) compte les atomes dans la molécule ; un nombre devant (2 H₂O) multiplie toute la molécule.' },
    { etape: 3, titre: 'Ajuster les nombres', explication: "On ne change jamais les formules : on ajoute des nombres devant jusqu'à égalité." },
    { etape: 4, titre: 'Vérifier les charges', explication: 'Avec des ions, la charge totale doit aussi être la même des deux côtés.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Acide, neutre ou basique ?',
      generer() {
        const p = pick([1, 1.5, 2, 3, 4.5, 5, 6, 7, 8, 9, 10.5, 11, 12, 13]);
        return { enonce: `Une solution a un pH de ${dec(p)}. Elle est :`, visuel: (h) => { h.innerHTML = schemaPH(p); }, choix: ['acide', 'neutre', 'basique'], correct: p < 7 ? 0 : p > 7 ? 2 : 1, ordre_fixe: true, _v: { p } };
      },
      indices: ['Le seuil est 7.', 'pH < 7 : acide.', 'pH > 7 : basique.'],
      correction_etapes: (st) => [`${dec(st._v.p)} ${st._v.p < 7 ? '<' : st._v.p > 7 ? '>' : '='} 7 : la solution est <strong>${nature(st._v.p)}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Les ions de la solution :',
      generer() {
        const [nom, p] = pick(PRODUITS_PH);
        return { enonce: `Le pH de ${nom === 'eau pure' ? "l'eau pure" : `ce produit (${nom})`} vaut ${dec(p)}. Que peut-on dire de ses ions ?`, choix: ["plus d'ions H⁺ que d'ions HO⁻", "plus d'ions HO⁻ que d'ions H⁺", "autant d'ions H⁺ que d'ions HO⁻"], correct: p < 7 ? 0 : p > 7 ? 1 : 2, ordre_fixe: true, _v: { p } };
      },
      indices: ['Acide : les ions H⁺ dominent.', 'Basique : les ions HO⁻ dominent.', 'Neutre : autant des deux.'],
      correction_etapes: (st) => [`pH ${dec(st._v.p)} : solution ${nature(st._v.p)}.`, st._v.p < 7 ? "Elle contient <strong>plus d'ions H⁺ que d'ions HO⁻</strong>." : st._v.p > 7 ? "Elle contient <strong>plus d'ions HO⁻ que d'ions H⁺</strong>." : "Elle contient <strong>autant d'ions H⁺ que d'ions HO⁻</strong>."],
    },
    {
      id: 'e03', niveau: 2, type: 'qcm', consigne: 'Effet de la dilution :',
      generer() {
        const acide = Math.random() < 0.6, p = acide ? pick([1, 2, 3, 4]) : pick([10, 11, 12, 13]);
        return {
          enonce: `On dilue 10 fois une solution de pH ${p}. Son nouveau pH :`,
          choix: acide ? ['augmente et reste inférieur à 7', 'diminue', 'ne change pas', 'devient supérieur à 7'] : ['diminue et reste supérieur à 7', 'augmente', 'ne change pas', 'devient inférieur à 7'],
          correct: 0, _v: { p, acide },
        };
      },
      indices: ["Diluer rapproche le pH de 7.", 'Il ne franchit jamais 7.', `pH ${'<'} 7 : il monte vers 7 ; pH > 7 : il descend vers 7.`],
      correction_etapes: (st) => [`Diluer rapproche le pH de 7 sans le dépasser.`, st._v.acide ? `Parti de ${st._v.p}, le pH <strong>augmente</strong> (environ ${st._v.p + 1}) mais reste acide.` : `Parti de ${st._v.p}, le pH <strong>diminue</strong> (environ ${st._v.p - 1}) mais reste basique.`],
    },
    {
      id: 'e04', niveau: 2, type: 'complete', consigne: "Ajuste l'équation :",
      generer() {
        const [eq, n, e] = pick(EQUATIONS);
        return { enonce_complete: eq, champs: [{ reponse: n, validation: 'nombre' }], _v: { eq, n, e } };
      },
      indices: ['Compte les atomes de chaque élément des deux côtés.', 'Un nombre devant une formule multiplie tous ses atomes.', 'Avec des ions, vérifie aussi les charges.'],
      correction_etapes: (st) => [st._v.e, `Le nombre manquant est <strong>${st._v.n}</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Conservation de la masse :',
      generer() {
        const avant = arrondi(randInt(1400, 2200) / 10, 1), gaz = arrondi(randInt(2, 15) / 10, 1), apres = arrondi(avant - gaz, 1);
        return {
          enonce: `On place un bécher d'acide chlorhydrique et un morceau de zinc sur une balance : ${dec(avant)} g. La réaction dégage du dihydrogène qui s'échappe. À la fin, la balance indique ${dec(apres)} g. Quelle masse de gaz s'est échappée ?`,
          ...grandeur(gaz, 'g', { tolerance: 0.01 }), _v: { avant, apres, gaz },
        };
      },
      indices: ['La masse totale se conserve lors d\'une transformation chimique.', 'Ce qui manque sur la balance est parti sous forme de gaz.', 'Fais la différence entre les deux masses.'],
      correction_etapes: (st) => ["La masse se conserve : si la balance indique moins, c'est que du gaz est parti.", `$m_{\\text{gaz}} = ${dec(st._v.avant).replace(',', '{,}')} - ${dec(st._v.apres).replace(',', '{,}')} = ${dec(st._v.gaz).replace(',', '{,}')}$ g.`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "Pour diluer un acide, on verse l'eau dans l'acide.", reponse: false, _v: { e: "Non : on verse toujours l'acide dans l'eau, pour éviter les projections." } },
          { enonce: 'Le jus de citron est une solution acide.', reponse: true, _v: { e: 'Oui : son pH est proche de 2.' } },
          { enonce: "Le gaz formé par l'acide chlorhydrique sur le fer est du dioxygène.", reponse: false, _v: { e: 'Non : c\'est du dihydrogène H₂, qui détone au contact d\'une flamme.' } },
          { enonce: "Au cours d'une transformation chimique, les atomes se conservent.", reponse: true, _v: { e: 'Oui : ils se réarrangent, mais aucun ne disparaît ni n\'apparaît.' } },
          { enonce: 'En diluant une solution basique, son pH augmente.', reponse: false, _v: { e: 'Non : il diminue et se rapproche de 7.' } },
        ]);
      },
      indices: ['Pense aux règles de sécurité.', 'Rappelle-toi le test du dihydrogène.', "Diluer rapproche le pH de 7."],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Identifier les produits :',
      generer() {
        return pick([
          { enonce: "Après la réaction entre le fer et l'acide chlorhydrique, comment montrer que des ions fer II se sont formés ?", choix: ['ajouter de la soude : un précipité vert apparaît', "approcher une flamme : une détonation se produit", "ajouter du nitrate d'argent : un précipité blanc apparaît", 'mesurer le pH : il vaut 7'], correct: 0, _v: { e: 'Les ions Fe²⁺ donnent un précipité vert avec la soude.' } },
          { enonce: "Comment identifier le gaz dégagé par la réaction entre le zinc et l'acide chlorhydrique ?", choix: ["approcher une flamme : il détone (« pop »)", "le faire barboter dans l'eau de chaux", 'ajouter de la soude', 'mesurer sa masse'], correct: 0, _v: { e: 'Le dihydrogène produit une petite détonation au contact d\'une flamme.' } },
          { enonce: "Pendant la réaction fer + acide chlorhydrique, comment évolue le pH de la solution ?", choix: ['il augmente, car des ions H⁺ sont consommés', 'il diminue, car des ions H⁺ se forment', 'il reste constant', 'il devient 14'], correct: 0, _v: { e: 'Les ions H⁺ sont consommés (Fe + 2 H⁺ → Fe²⁺ + H₂) : la solution devient moins acide.' } },
        ]);
      },
      indices: ["Relis l'équation Fe + 2 H⁺ → Fe²⁺ + H₂.", 'Chaque produit a son test : soude pour les ions métalliques, flamme pour H₂.', 'Moins d\'ions H⁺ : moins acide.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'pH après dilution :',
      generer() {
        const p0 = randInt(1, 4), k = randInt(1, 3), f = 10 ** k;
        return { enonce: `On admet que diluer 10 fois une solution d'acide chlorhydrique augmente son pH d'une unité. Une solution de pH ${p0} est diluée ${f} fois. Quel est son nouveau pH ?`, reponse: Math.min(7, p0 + k), validation: 'nombre', _v: { p0, k, f } };
      },
      indices: [`${'Diluer 10 fois'} : +1.`, `Diluer 100 fois, c'est diluer 10 fois, puis encore 10 fois.`, 'Le pH ne dépasse jamais 7.'],
      correction_etapes: (st) => [`Diluer ${st._v.f} fois, c'est diluer ${st._v.k} fois de suite par 10 : le pH augmente de ${st._v.k}.`, `$${st._v.p0} + ${st._v.k} = ${st._v.p0 + st._v.k}$${st._v.p0 + st._v.k > 7 ? ', mais le pH reste limité à 7' : ''}.`],
    },
    {
      id: 'e09', niveau: 2, type: 'ordonner_etapes', consigne: "Remets dans l'ordre l'expérience du clou de fer :",
      generer() {
        return { etapes: ['Mettre lunettes, gants et blouse', "Verser de l'acide chlorhydrique dans un tube à essai", 'Ajouter un clou de fer : des bulles apparaissent', "Boucher le tube un instant puis approcher une flamme : une détonation identifie le dihydrogène", 'Prélever un peu de solution et ajouter de la soude : un précipité vert montre les ions Fe²⁺'] };
      },
      indices: ['La sécurité avant tout.', 'On observe la réaction avant de tester les produits.', 'Deux tests : un pour le gaz, un pour les ions.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Une solution de pH 3 est :', choix: ['acide', 'neutre', 'basique'], correct: 0, ordre_fixe: true, explication: '3 < 7.' },
    { type: 'qcm', question: "Une solution basique contient :", choix: ["plus d'ions HO⁻ que d'ions H⁺", "plus d'ions H⁺ que d'ions HO⁻", "autant d'ions H⁺ que d'ions HO⁻", "aucun ion"], correct: 0, explication: 'Les ions hydroxyde HO⁻ y sont majoritaires.' },
    { type: 'qcm', question: "Le gaz qui produit une détonation au contact d'une flamme est :", choix: ['le dihydrogène', 'le dioxygène', 'le dioxyde de carbone', 'le diazote'], correct: 0, explication: 'Test caractéristique du dihydrogène H₂.' },
    { type: 'vrai_faux', question: "Lors d'une transformation chimique, la masse totale se conserve.", reponse: true, explication: 'Les atomes se conservent, donc la masse aussi.' },
    {
      type: 'saisie', question: 'Coefficient.',
      generer() { const [eq, n] = pick(EQUATIONS.slice(0, 3)); return { question: `Quel nombre faut-il écrire à la place de ? : ${eq.replace('{0}', '?')}`, reponse: n, validation: 'nombre', explication: '2 atomes H dans H₂ et 2 charges + à droite : 2 H⁺.' }; },
    },
  ],
};
