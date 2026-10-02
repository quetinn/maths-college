// =====================================================================
//  sr05_stabilite_especes.js — SVT 4ᵉ : la reproduction et la stabilité
//  des espèces. Notion d'espèce, caryotype, cellules reproductrices et
//  fécondation, multiplication des cellules.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 13.
//  Nombres de chromosomes vérifiés (voir js/sources.js).
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes } from '../figures.js';

const DEFINITIONS = [
  ['une espèce', "Ensemble d'individus qui peuvent se reproduire entre eux et avoir des descendants eux-mêmes fertiles."],
  ['un caryotype', "Ensemble des chromosomes d'une cellule, classés par paires ; leur nombre est le même pour tous les individus d'une espèce."],
  ['une cellule reproductrice', "Spermatozoïde ou ovule : cellule qui contient un seul chromosome de chaque paire."],
  ['la fécondation', "Union d'un spermatozoïde et d'un ovule, qui rétablit le nombre de chromosomes de l'espèce."],
  ['la multiplication cellulaire', "Division d'une cellule en deux cellules identiques, après copie de ses chromosomes."],
  ['un individu fertile', 'Individu capable d\'avoir des descendants.'],
];

/** Nombre de chromosomes dans une cellule ordinaire. */
const ESPECES = [["l'être humain", 46], ['le chat', 38], ['la souris', 40], ['le chimpanzé', 48], ['le lapin', 44], ['le porc', 38], ['le pois', 14], ['le maïs', 20], ['le riz', 24], ['le blé tendre', 42], ['la pomme de terre', 48]];

const chr = (x, y, c) => `<line x1="${x}" y1="${y - 12}" x2="${x}" y2="${y + 12}" class="sv-chromo ${c}"/>`;
const cellule = (cx, cy, r, contenu, nom = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" class="sv-plein-gris"/>${contenu}${nom ? `<text x="${cx}" y="${cy + r + 14}" text-anchor="middle" class="pc-petit">${nom}</text>` : ''}`;
const quatre = (cx, cy) => chr(cx - 18, cy, 'sv-chr-a') + chr(cx - 8, cy, 'sv-chr-a') + chr(cx + 8, cy, 'sv-chr-b') + chr(cx + 18, cy, 'sv-chr-b');
const SCENES = [
  ['Cellule de départ', cellule(160, 84, 46, quatre(160, 84), '4 chromosomes, soit 2 paires'), "Cette cellule possède 2 paires de chromosomes. Le nombre de chromosomes est le même dans toutes les cellules de l'individu."],
  ['Multiplication', cellule(90, 84, 42, quatre(90, 84), '4 chromosomes') + cellule(230, 84, 42, quatre(230, 84), '4 chromosomes'), "Avant de se diviser, la cellule <strong>copie</strong> ses chromosomes. Les deux cellules obtenues sont identiques à la cellule de départ."],
  ['Cellules reproductrices', cellule(90, 84, 34, chr(84, 84, 'sv-chr-a') + chr(96, 84, 'sv-chr-b'), '2 chromosomes') + cellule(230, 84, 34, chr(224, 84, 'sv-chr-a') + chr(236, 84, 'sv-chr-b'), '2 chromosomes'), "Une cellule reproductrice ne reçoit qu'<strong>un chromosome de chaque paire</strong> : elle en contient deux fois moins."],
  ['Fécondation', cellule(160, 84, 46, quatre(160, 84), 'cellule-œuf : 4 chromosomes'), "La fécondation réunit les chromosomes du spermatozoïde et ceux de l'ovule : la cellule-œuf retrouve le <strong>nombre de chromosomes de l'espèce</strong>."],
];

export default {
  id: 'sr05',
  titre: 'La reproduction et la stabilité des espèces',
  theme: 'svt_vivant', niveau: '4e',
  icone: '🧫',

  intro:
    "Un chat donne toujours des chatons, jamais des chiots. De génération en génération, une espèce garde ses caractères et son <strong>nombre de chromosomes</strong>. " +
    "On cherche comment la reproduction sexuée maintient cette stabilité, et comment un individu se construit à partir d'une seule cellule.",

  cours: [
    {
      type: 'definition', titre: "Qu'est-ce qu'une espèce ?",
      contenu: "Deux individus appartiennent à la même <strong>espèce</strong> s'ils peuvent se reproduire ensemble et si leurs descendants sont eux-mêmes <strong>fertiles</strong>. Le cheval et l'âne peuvent avoir un petit, le mulet, mais celui-ci est stérile : ce sont deux espèces différentes.",
    },
    {
      type: 'propriete', titre: 'Un caryotype par espèce',
      contenu: "Toutes les cellules des individus d'une espèce contiennent le même nombre de chromosomes : 46 chez l'être humain, 38 chez le chat, 14 chez le pois. Ce <strong>caryotype</strong> est caractéristique de l'espèce.",
    },
    { type: 'figure', titre: 'Garder le bon nombre de chromosomes', contenu: 'Suis le nombre de chromosomes d\'une espèce imaginaire à 4 chromosomes.', render: (host) => etapes(host, 'Étape', SCENES, { vb: '0 0 320 160' }) },
    {
      type: 'propriete', titre: 'Des cellules reproductrices à la fécondation',
      contenu: "Une cellule reproductrice ne contient qu'<strong>un chromosome de chaque paire</strong>, soit la moitié du nombre de l'espèce. La <strong>fécondation</strong> réunit les chromosomes d'un spermatozoïde et d'un ovule : la cellule-œuf retrouve le nombre de chromosomes de l'espèce.",
    },
    {
      type: 'propriete', titre: 'De la cellule-œuf à l\'individu',
      contenu: "La cellule-œuf se divise un très grand nombre de fois. Avant chaque division, les chromosomes sont <strong>copiés</strong> : les deux cellules obtenues reçoivent les mêmes chromosomes. Toutes les cellules de l'individu ont donc le même caryotype.",
    },
    {
      type: 'exemple', enonce: "Une cellule de pois contient 14 chromosomes. Combien en contient un grain de pollen (cellule reproductrice) ? Et la cellule-œuf ?",
      solution_etapes: ['14 chromosomes forment 7 paires.', 'Une cellule reproductrice reçoit un chromosome de chaque paire : 7 chromosomes.', 'La fécondation en réunit 7 + 7 = 14 : le nombre de l\'espèce est conservé.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Partir du caryotype', explication: "Note le nombre de chromosomes d'une cellule ordinaire de l'espèce." },
    { etape: 2, titre: 'Cellule reproductrice', explication: "Divise par 2 : un seul chromosome de chaque paire." },
    { etape: 3, titre: 'Fécondation', explication: "Additionne les chromosomes des deux cellules reproductrices : on retrouve le nombre de départ." },
    { etape: 4, titre: 'Multiplication des cellules', explication: "Chaque division conserve le nombre de chromosomes : la cellule les copie avant de se diviser." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Même espèce : descendants fertiles.', 'Le caryotype est propre à l\'espèce.', 'Une cellule reproductrice a deux fois moins de chromosomes.']),

    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Combien de chromosomes ?',
      generer() {
        const [nom, n] = pick(ESPECES);
        return { enonce: `Chez ${nom}, une cellule ordinaire contient ${n} chromosomes. Combien de chromosomes contient une cellule reproductrice ?`, reponse: n / 2, validation: 'nombre', pieges: [{ valeur: n, message: 'Une cellule reproductrice ne reçoit qu\'un chromosome de chaque paire.' }], _v: { n } };
      },
      indices: ['Les chromosomes vont par paires.', 'Un seul chromosome de chaque paire.', 'Divise par 2.'],
      correction_etapes: (st) => [`${st._v.n} chromosomes = ${st._v.n / 2} paires.`, `Une cellule reproductrice en reçoit un de chaque paire : <strong>${st._v.n / 2} chromosomes</strong>.`],
    },

    exoVraiFaux('e03', 1, [
      ['Tous les individus d\'une espèce ont le même nombre de chromosomes.', true, 'Oui : c\'est le caryotype de l\'espèce.'],
      ['Le mulet, né d\'un âne et d\'une jument, est fertile.', false, 'Non : il est stérile, ce qui montre que l\'âne et le cheval sont deux espèces.'],
      ['La fécondation divise par deux le nombre de chromosomes.', false, 'Non : elle réunit les chromosomes de deux cellules reproductrices.'],
      ['Avant de se diviser, une cellule copie ses chromosomes.', true, 'Oui : les deux cellules obtenues ont ainsi les mêmes chromosomes.'],
      ['Une cellule de peau et une cellule de muscle du même individu ont le même caryotype.', true, 'Oui : elles descendent toutes de la cellule-œuf.'],
      ['Deux individus qui se ressemblent appartiennent forcément à la même espèce.', false, 'Non : le critère est d\'avoir ensemble des descendants fertiles.'],
      ['Un ovule humain contient 23 chromosomes.', true, 'Oui : un de chaque paire.'],
    ], ['Espèce : descendants fertiles.', 'Cellule reproductrice : la moitié.', 'Fécondation : on retrouve le total.']),

    exoOrdonner('e04', 2, [
      { consigne: "Remets dans l'ordre la multiplication d'une cellule :", etapes: ['La cellule possède tous les chromosomes de l\'espèce', 'Elle copie chacun de ses chromosomes', 'Les copies se répartissent en deux lots identiques', 'La cellule se divise en deux', 'Chaque cellule obtenue a le même caryotype que la cellule de départ'] },
      { consigne: "Remets dans l'ordre : d'une génération à la suivante.", etapes: ['Chaque parent fabrique des cellules reproductrices', 'Elles contiennent la moitié des chromosomes', 'La fécondation réunit un spermatozoïde et un ovule', "La cellule-œuf retrouve le nombre de chromosomes de l'espèce", 'Elle se multiplie pour former un nouvel individu'] },
    ], ['La copie des chromosomes précède la division.', 'Les cellules reproductrices se forment avant la fécondation.', 'La cellule-œuf se multiplie ensuite.']),

    exoSituation('e05', 2, 'Même espèce ou espèces différentes ?', [
      ['Un labrador et un caniche ont des chiots, qui auront eux-mêmes des chiots.', 'Même espèce : leurs descendants sont fertiles.', 'Espèces différentes : ils ne se ressemblent pas.', 'On ne peut pas savoir.'],
      ["Un âne et une jument ont un mulet, qui ne peut pas avoir de petits.", 'Espèces différentes : leur descendant est stérile.', 'Même espèce : ils ont eu un petit.', 'Même espèce : ils se ressemblent.'],
      ['Deux papillons très semblables vivent dans le même pré mais ne se reproduisent jamais ensemble.', 'Espèces différentes : ils ne se reproduisent pas entre eux.', 'Même espèce : ils se ressemblent.', 'Même espèce : ils vivent au même endroit.'],
      ["Un chat roux et une chatte noire ont des chatons de couleurs variées, tous fertiles.", 'Même espèce : leurs descendants sont fertiles.', 'Espèces différentes : leurs couleurs diffèrent.', 'Espèces différentes : les chatons sont variés.'],
    ], ['Le critère n\'est pas la ressemblance.', 'Peuvent-ils avoir des descendants ?', 'Ces descendants sont-ils fertiles ?'], 'Même espèce : reproduction possible et descendants fertiles.'),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Du spermatozoïde à la cellule-œuf :',
      generer() {
        const [nom, n] = pick(ESPECES);
        return { enonce: `Chez ${nom}, une cellule reproductrice contient ${n / 2} chromosomes. Combien de chromosomes contient la cellule-œuf ?`, reponse: n, validation: 'nombre', pieges: [{ valeur: n / 2, message: 'La cellule-œuf réunit les chromosomes de deux cellules reproductrices.' }], _v: { n } };
      },
      indices: ['La cellule-œuf naît de la fécondation.', 'Elle réunit un spermatozoïde et un ovule.', 'Additionne leurs chromosomes.'],
      correction_etapes: (st) => [`Le spermatozoïde et l'ovule contiennent chacun ${st._v.n / 2} chromosomes.`, `${st._v.n / 2} + ${st._v.n / 2} = <strong>${st._v.n} chromosomes</strong> dans la cellule-œuf.`],
    },

    exoDocument('e07', 2, 'Compare ces caryotypes.', [
      () => ({
        enonce: "On compte les chromosomes dans des cellules de quatre animaux." + tableau([['Animal', 'A', 'B', 'C', 'D'], ['Chromosomes par cellule', 38, 46, 38, 40]]),
        questions: [
          choix('Quels animaux pourraient appartenir à la même espèce ?', 'A et C', 'A et B', 'B et D'),
          choix('Le chat possède 38 chromosomes. L\'animal D peut-il être un chat ?', 'non : son nombre de chromosomes est différent', 'oui : 40 est proche de 38', 'oui : tous les mammifères ont le même caryotype'),
          nombre("Combien de chromosomes contient une cellule reproductrice de l'animal B ?", 23),
        ],
        correction: ['Seuls A et C ont le <strong>même nombre</strong> de chromosomes.', "Le caryotype est propre à l'espèce : 40 chromosomes, ce n'est <strong>pas un chat</strong>.", '46 ÷ 2 = <strong>23</strong>.'],
      }),
    ], ['Même espèce : même nombre de chromosomes.', 'Le caryotype est une carte d\'identité de l\'espèce.', 'Cellule reproductrice : la moitié.']),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Compte les cellules :',
      generer() {
        const n = pick([3, 4, 5, 6]);
        return { enonce: `Une cellule-œuf se divise en deux cellules, qui se divisent à leur tour, et ainsi de suite. Combien de cellules obtient-on après ${n} divisions successives ?`, reponse: 2 ** n, validation: 'nombre', pieges: [{ valeur: 2 * n, message: 'Le nombre double à chaque division : 2, 4, 8…' }], _v: { n } };
      },
      indices: ['Après une division : 2 cellules.', 'Après deux divisions : 4 cellules.', 'Le nombre double à chaque fois.'],
      correction_etapes: (st) => [`Le nombre de cellules double à chaque division : ${Array.from({ length: st._v.n + 1 }, (_, k) => 2 ** k).join(' → ')}.`, `Après ${st._v.n} divisions : <strong>${2 ** st._v.n} cellules</strong>, toutes avec le même caryotype.`],
    },

    exoDocument('e09', 3, 'Explique la stabilité du caryotype.', [
      () => {
        const [nom, n] = pick(ESPECES.filter((e) => e[1] !== 46));
        return {
          enonce: `Chez ${nom}, toutes les cellules ordinaires contiennent ${n} chromosomes, génération après génération.`,
          questions: [
            nombre('Si les cellules reproductrices gardaient tous leurs chromosomes, combien la cellule-œuf en contiendrait-elle ?', n * 2),
            nombre('En réalité, combien de chromosomes chaque cellule reproductrice contient-elle ?', n / 2),
            choix('Le nombre de chromosomes reste stable grâce à :', 'la division par deux dans les cellules reproductrices, puis la fécondation', 'la seule fécondation', 'la multiplication des cellules de la peau'),
          ],
          correction: [`${n} + ${n} = <strong>${n * 2}</strong> : le nombre doublerait à chaque génération.`, `${n} ÷ 2 = <strong>${n / 2}</strong>.`, `La moitié dans chaque cellule reproductrice, puis ${n / 2} + ${n / 2} = ${n} à la fécondation : le caryotype est <strong>conservé</strong>.`],
        };
      },
    ], ['Que se passerait-il sans réduction du nombre de chromosomes ?', 'Une cellule reproductrice : la moitié.', 'Les deux étapes se compensent.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Deux individus sont de la même espèce s\'ils :', choix: ['ont ensemble des descendants fertiles', 'se ressemblent', 'vivent au même endroit', 'mangent la même chose'], correct: 0, explication: 'C\'est le critère de l\'espèce.' },
    {
      type: 'saisie', question: 'Chromosomes.',
      generer() { const [nom, n] = pick(ESPECES); return { question: `Chez ${nom}, une cellule ordinaire contient ${n} chromosomes. Combien en contient une cellule reproductrice ?`, reponse: n / 2, validation: 'nombre', explication: `${n} ÷ 2 = ${n / 2}.` }; },
    },
    { type: 'qcm', question: 'La fécondation :', choix: ["rétablit le nombre de chromosomes de l'espèce", 'divise par deux le nombre de chromosomes', 'copie les chromosomes', 'détruit les chromosomes'], correct: 0, explication: 'Elle réunit deux lots de chromosomes.' },
    { type: 'vrai_faux', question: 'Avant de se diviser, une cellule copie ses chromosomes.', reponse: true, explication: 'Les deux cellules obtenues sont identiques.' },
    { type: 'qcm', question: 'Le mulet est stérile. Cela montre que l\'âne et le cheval :', choix: ['sont deux espèces différentes', 'sont de la même espèce', 'n\'ont pas de chromosomes', 'ne peuvent pas se reproduire'], correct: 0, explication: 'Leur descendant n\'est pas fertile.' },
    { type: 'vrai_faux', question: 'Toutes les cellules d\'un individu ont le même caryotype.', reponse: true, explication: 'Elles descendent toutes de la cellule-œuf.' },
  ],
};
