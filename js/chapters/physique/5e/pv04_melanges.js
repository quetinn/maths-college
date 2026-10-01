// =====================================================================
//  pv04_melanges.js — Physique-chimie 5ᵉ : mélanges et solutions.
//  Homogène / hétérogène, miscibilité, dissolution (soluté, solvant,
//  solution), conservation de la masse, saturation, techniques de
//  séparation (décantation, filtration, évaporation, distillation).
// =====================================================================

import { pick, arrondi, dec, grandeur, melanger } from '../outils.js';
import { dissolution } from '../figures_cycle.js';

const MELANGES = [
  ["l'eau sucrée", true], ["l'eau boueuse", false], ["le mélange d'huile et d'eau", false], ['le sirop de menthe dilué', true],
  ["le jus d'orange avec pulpe", false], ["l'eau salée", true], ["l'eau de mer filtrée", true], ['la vinaigrette', false],
  ["le mélange d'eau et de sable", false], ['le thé (sans les feuilles)', true],
];

/** [préparation, nom de la solution, soluté]. */
const SOLUTIONS = [["de l'eau sucrée", "l'eau sucrée", 'le sucre'], ["de l'eau salée", "l'eau salée", 'le sel'], ['du café', 'le café', 'la poudre de café soluble'], ['du sirop dilué', 'le sirop dilué', 'le sirop pur']];
const ROLE = { soluté: 'le soluté', solvant: 'le solvant', solution: 'la solution' };

const SEPARATIONS = [
  ["récupérer le sel dissous dans de l'eau de mer", "l'évaporation"],
  ["obtenir de l'eau limpide à partir d'eau boueuse", 'la filtration'],
  ["séparer l'huile et l'eau d'une vinaigrette", 'la décantation'],
  ["récupérer de l'eau pure à partir d'eau salée", 'la distillation'],
  ['retirer le marc de café du café', 'la filtration'],
];
const TECHNIQUES = ["l'évaporation", 'la filtration', 'la décantation', 'la distillation'];

export default {
  id: 'pv04',
  titre: 'Mélanges et solutions',
  theme: 'pc_matiere', niveau: '5e',
  icone: '🥤',

  intro:
    "L'eau du robinet, le jus d'orange, la vinaigrette, l'eau de mer : presque tous les liquides du quotidien sont des <strong>mélanges</strong>. " +
    "On apprend ici à les reconnaître, à comprendre ce qui se passe quand le sucre « disparaît » dans l'eau, et à <strong>séparer</strong> les constituants d'un mélange.",

  cours: [
    {
      type: 'definition', titre: 'Mélange homogène, mélange hétérogène',
      contenu: "Un mélange est <strong>homogène</strong> si l'on ne peut pas distinguer ses constituants à l'œil nu (eau sucrée, sirop dilué). Il est <strong>hétérogène</strong> si l'on distingue au moins deux constituants (eau boueuse, jus avec pulpe). Deux liquides qui se mélangent sont <strong>miscibles</strong> (eau et sirop) ; sinon ils sont <strong>non miscibles</strong> et forment deux couches (eau et huile).",
    },
    {
      type: 'definition', titre: 'La dissolution',
      contenu: "Quand on dissout du sucre dans l'eau, le sucre est le <strong>soluté</strong>, l'eau est le <strong>solvant</strong>, et le mélange homogène obtenu est une <strong>solution</strong>. Un corps qui se dissout est <strong>soluble</strong> (sel, sucre) ; sinon il est <strong>insoluble</strong> (sable, huile dans l'eau).",
      formule: '\\text{soluté} + \\text{solvant} \\longrightarrow \\text{solution}',
    },
    { type: 'figure', titre: 'Dissoudre sur une balance', contenu: "Ajoute du soluté 10 g par 10 g. Observe la balance, puis continue jusqu'à la saturation.", render: (host) => dissolution(host) },
    {
      type: 'propriete', titre: 'Masse conservée, saturation',
      contenu: "Lors d'une dissolution, la <strong>masse se conserve</strong> : masse de la solution = masse du solvant + masse du soluté. Le soluté n'a pas disparu : ses particules se sont dispersées entre celles de l'eau. Mais on ne peut pas dissoudre une quantité illimitée : au-delà d'une masse maximale (la <strong>solubilité</strong>), la solution est <strong>saturée</strong> et le surplus reste au fond. Exemple : au plus environ $360$ g de sel par litre d'eau à 20 °C.",
      formule: 'm_{\\text{solution}} = m_{\\text{solvant}} + m_{\\text{soluté}}',
    },
    {
      type: 'propriete', titre: 'Séparer les constituants',
      contenu: "<strong>Décantation</strong> : on laisse reposer, les particules solides (ou le liquide le plus dense) tombent au fond. <strong>Filtration</strong> : un filtre retient les particules solides ; le liquide qui passe s'appelle le <strong>filtrat</strong>. Ces deux techniques ne séparent pas un soluté dissous. <strong>Évaporation</strong> : on chauffe pour faire partir l'eau et récupérer le soluté (marais salants). <strong>Distillation</strong> : on vaporise puis on liquéfie l'eau pour la récupérer pure.",
    },
    {
      type: 'definition', titre: 'Corps pur ou mélange ?',
      contenu: "Un <strong>corps pur</strong> ne contient qu'une seule espèce chimique (eau distillée). L'eau du robinet ou l'eau minérale sont des <strong>mélanges</strong> : l'étiquette indique les sels minéraux dissous. On le vérifie en évaporant l'eau : il reste un dépôt.",
    },
    {
      type: 'exemple', enonce: 'On dissout $25$ g de sucre dans $200$ g d\'eau. Quelle est la masse de l\'eau sucrée obtenue ?',
      solution_etapes: ['La masse se conserve lors de la dissolution.', '$200 + 25 = 225$ g.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Observer', explication: 'Distingue-t-on plusieurs constituants ? Oui : hétérogène. Non : homogène.' },
    { etape: 2, titre: 'Nommer', explication: 'Soluté (ce qu\'on dissout), solvant (l\'eau), solution (le mélange obtenu).' },
    { etape: 3, titre: 'Calculer une masse', explication: 'Masse de la solution = masse du solvant + masse du soluté.' },
    { etape: 4, titre: 'Choisir la séparation', explication: 'Solide non dissous : décantation, filtration. Soluté dissous : évaporation. Eau pure : distillation.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Homogène ou hétérogène ?',
      generer() {
        const [nom, homogene] = pick(MELANGES);
        return { enonce: `${nom[0].toUpperCase() + nom.slice(1)} est un mélange :`, choix: ['homogène', 'hétérogène'], correct: homogene ? 0 : 1, ordre_fixe: true, _v: { nom, homogene } };
      },
      indices: ['Peut-on distinguer plusieurs constituants à l\'œil nu ?', 'Si oui : hétérogène.', 'Si non : homogène.'],
      correction_etapes: (st) => [st._v.homogene ? `Dans ${st._v.nom}, on ne distingue pas les constituants à l'œil nu.` : `Dans ${st._v.nom}, on distingue plusieurs constituants.`, `C'est un mélange <strong>${st._v.homogene ? 'homogène' : 'hétérogène'}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Le vocabulaire :',
      generer() {
        const [prep, sol, soluté] = pick(SOLUTIONS), role = pick(['soluté', 'solvant', 'solution']);
        const quoi = role === 'soluté' ? soluté : role === 'solvant' ? "l'eau" : sol;
        return { enonce: `On prépare ${prep} en dissolvant ${soluté} dans l'eau. Dans cette préparation, ${quoi} est :`, choix: ['le soluté', 'le solvant', 'la solution'], correct: ['soluté', 'solvant', 'solution'].indexOf(role), ordre_fixe: true, _v: { sol, soluté, role, quoi } };
      },
      indices: ['Le soluté est ce que l\'on dissout.', 'Le solvant est le liquide qui dissout (souvent l\'eau).', 'La solution est le mélange obtenu.'],
      correction_etapes: (st) => [`Soluté : ${st._v.soluté} ; solvant : l'eau ; solution : ${st._v.sol}.`, `Donc ${st._v.quoi} est <strong>${ROLE[st._v.role]}</strong>.`],
    },
    {
      id: 'e03', niveau: 1, type: 'saisie', consigne: 'Masse de la solution :',
      generer() {
        const e = pick([100, 150, 200, 250, 500]), s = pick([5, 10, 12, 20, 25, 30]), nom = pick(['sucre', 'sel']);
        return {
          enonce: `On dissout ${s} g de ${nom} dans ${e} g d'eau. Quelle est la masse de la solution obtenue ?`,
          ...grandeur(e + s, 'g', { pieges: [{ valeur: e, message: `Le ${nom} n'a pas disparu : sa masse s'ajoute à celle de l'eau.` }] }),
          _v: { e, s, nom },
        };
      },
      indices: ['La masse se conserve lors d\'une dissolution.', 'Masse de la solution = masse d\'eau + masse du soluté.', 'Réponse en g.'],
      correction_etapes: (st) => [`$m = ${st._v.e} + ${st._v.s}$.`, `$m = ${st._v.e + st._v.s}$ g.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Quelle technique ?',
      generer() {
        const [but, tech] = pick(SEPARATIONS);
        return { enonce: `Pour ${but}, on utilise :`, choix: TECHNIQUES, correct: TECHNIQUES.indexOf(tech), ordre_fixe: true, _v: { but, tech } };
      },
      indices: ['Un soluté dissous ne s\'arrête pas dans un filtre.', "Évaporer : on récupère ce qui était dissous. Distiller : on récupère l'eau.", 'Deux liquides non miscibles : on laisse reposer.'],
      correction_etapes: (st) => [`Pour ${st._v.but} : <strong>${st._v.tech}</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Jusqu\'à saturation :',
      generer() {
        const V = pick([0.25, 0.5, 2, 1.5, 3]);
        return {
          enonce: `À 20 °C, on peut dissoudre au plus 360 g de sel dans 1 L d'eau. Quelle masse maximale de sel peut-on dissoudre dans ${dec(V)} L d'eau ?`,
          ...grandeur(arrondi(360 * V, 2), 'g', { tolerance: 0.5, pieges: [{ valeur: 360, message: `C'est pour 1 L : ici il y a ${dec(V)} L.` }, { valeur: arrondi(360 / V, 2), message: 'Pour plus d\'eau, on peut dissoudre plus de sel : multiplie.' }] }),
          _v: { V },
        };
      },
      indices: ['C\'est une situation de proportionnalité.', `Multiplie 360 g par le nombre de litres.`, 'Réponse en g.'],
      correction_etapes: (st) => [`$360 \\times ${dec(st._v.V).replace(',', '{,}')}$.`, `$= ${dec(360 * st._v.V).replace(',', '{,}')}$ g au maximum.`],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'Saturée ou non ?',
      generer() {
        const V = pick([0.5, 1, 2]), m = pick([100, 150, 200, 300, 400, 500, 800]);
        const max = 360 * V;
        if (Math.abs(max - m) < 1) return this.generer();
        return {
          enonce: `On verse ${m} g de sel dans ${dec(V)} L d'eau et on agite longtemps (au plus 360 g de sel par litre d'eau). Que observe-t-on ?`.replace('Que observe', "Qu'observe"),
          choix: ['tout le sel se dissout : la solution est homogène', 'il reste du sel au fond : la solution est saturée'], correct: m <= max ? 0 : 1, ordre_fixe: true, _v: { V, m, max },
        };
      },
      indices: ['Calcule la masse maximale pour ce volume d\'eau.', 'Compare-la à la masse versée.', 'Au-delà, le surplus reste au fond.'],
      correction_etapes: (st) => [`Maximum : $360 \\times ${dec(st._v.V).replace(',', '{,}')} = ${st._v.max}$ g.`, st._v.m <= st._v.max ? `${st._v.m} g ≤ ${st._v.max} g : <strong>tout se dissout</strong>.` : `${st._v.m} g > ${st._v.max} g : <strong>la solution est saturée</strong>, il reste ${st._v.m - st._v.max} g de sel au fond.`],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Les marais salants :',
      generer() {
        const V = pick([2, 5, 10, 20, 100]);
        return {
          enonce: `L'eau de mer contient environ 35 g de sel par litre. Quelle masse de sel récupère-t-on en faisant évaporer ${V} L d'eau de mer ? (réponse en g)`,
          ...grandeur(35 * V, 'g', { pieges: [{ valeur: 35, message: `35 g, c'est pour un seul litre : il y en a ${V}.` }] }),
          _v: { V },
        };
      },
      indices: ["L'évaporation fait partir l'eau ; le sel reste.", '35 g par litre.', `Multiplie par le nombre de litres.`],
      correction_etapes: (st) => [`$35 \\times ${st._v.V} = ${35 * st._v.V}$ g.`, `Soit ${dec(35 * st._v.V / 1000)} kg de sel.`],
    },
    {
      id: 'e08', niveau: 3, type: 'ordonner_etapes', consigne: "Rendre limpide de l'eau boueuse :",
      generer() {
        return {
          etapes: [
            "Laisser reposer l'eau boueuse : la terre se dépose au fond (décantation)",
            'Verser doucement le liquide du dessus dans un autre récipient',
            'Placer un filtre dans un entonnoir au-dessus d\'un bécher',
            'Verser le liquide dans le filtre (filtration)',
            'Récupérer le filtrat limpide dans le bécher',
          ],
        };
      },
      indices: ["On commence par la technique la plus simple : attendre.", 'On filtre ce qui reste de trouble.', 'Le filtrat est le liquide qui a traversé le filtre.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol><p>Attention : l'eau obtenue est limpide, mais pas forcément potable !</p>`,
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "Quand le sucre se dissout dans l'eau, il disparaît.", reponse: false, _v: { e: "Non : ses particules se dispersent dans l'eau ; la masse se conserve (et l'eau a un goût sucré)." } },
          { enonce: 'Une filtration permet de récupérer le sel dissous dans l\'eau.', reponse: false, _v: { e: 'Non : le sel dissous traverse le filtre. Il faut une évaporation.' } },
          { enonce: "L'eau minérale est un corps pur.", reponse: false, _v: { e: "Non : elle contient des sels minéraux dissous ; c'est un mélange homogène." } },
          { enonce: "L'huile et l'eau sont non miscibles.", reponse: true, _v: { e: 'Oui : elles forment deux couches, l\'huile au-dessus.' } },
          { enonce: 'Une solution saturée ne peut plus dissoudre de soluté.', reponse: true, _v: { e: 'Oui : le soluté ajouté reste au fond.' } },
        ]);
      },
      indices: ['La masse se conserve.', 'Un filtre ne retient que les particules non dissoutes.', 'Une étiquette d\'eau minérale liste des constituants.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "Dans l'eau salée, le sel est :", choix: ['le soluté', 'le solvant', 'la solution', 'un mélange hétérogène'], correct: 0, explication: "L'eau est le solvant, l'eau salée la solution." },
    { type: 'qcm', question: 'Un mélange dont on distingue les constituants est :', choix: ['hétérogène', 'homogène', 'un corps pur', 'une solution'], correct: 0, explication: 'Par exemple l\'eau boueuse.' },
    {
      type: 'saisie', question: 'Dissolution.',
      generer() { const e = pick([100, 300, 400]), s = pick([15, 40, 50]); return { question: `On dissout ${s} g de sucre dans ${e} g d'eau. Masse de la solution ?`, ...grandeur(e + s, 'g'), explication: `$${e} + ${s} = ${e + s}$ g : la masse se conserve.` }; },
    },
    { type: 'qcm', question: "Pour récupérer le sel de l'eau de mer, on utilise :", choix: ["l'évaporation", 'la filtration', 'la décantation', 'un aimant'], correct: 0, explication: 'L\'eau s\'évapore, le sel reste.' },
    { type: 'vrai_faux', question: "Le filtre retient les particules solides non dissoutes.", reponse: true, explication: 'Le liquide qui passe est le filtrat.' },
  ],
};
