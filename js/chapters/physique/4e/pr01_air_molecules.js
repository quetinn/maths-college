// =====================================================================
//  pr01_air_molecules.js — Physique-chimie 4ᵉ : l'air et les molécules.
//  Composition de l'air, atomes et molécules, modèles moléculaires,
//  formules chimiques, corps pur / mélange, pression d'un gaz.
// =====================================================================

import { pick, arrondi, dec, grandeur, melanger } from '../outils.js';
import { molecules, schemaMolecule, composition, nbAtomes, formuleHTML, formuleTex, NOMS_ELEMENTS } from '../figures_chimie.js';
import { tableau } from '../../commun.js';

/** Formules à compter : [formule, nom]. */
const FORMULES = [
  ['H2O', "l'eau"], ['CO2', 'le dioxyde de carbone'], ['CH4', 'le méthane'], ['O2', 'le dioxygène'], ['NH3', "l'ammoniac"],
  ['C2H6O', "l'éthanol"], ['C3H8', 'le propane'], ['C4H10', 'le butane'], ['C6H12O6', 'le glucose'], ['H2O2', "l'eau oxygénée"],
];
const HYDROCARBURES = [['CH4', 'méthane'], ['C3H8', 'propane'], ['C4H10', 'butane'], ['C2H6O', 'éthanol'], ['C6H12O6', 'glucose'], ['C8H18', 'octane (essence)']];
const DESSINABLES = [['H2O', "d'eau"], ['O2', 'de dioxygène'], ['N2', 'de diazote'], ['CO2', 'de dioxyde de carbone'], ['CH4', 'de méthane'], ['H2', 'de dihydrogène']];
const PURS = [
  ['un flacon ne contenant que des molécules de dioxygène', true], ["l'air", false], ["l'eau distillée", true], ["l'eau salée", false],
  ['le gaz naturel (méthane et un peu d\'éthane)', false], ["le dioxyde de carbone d'une bouteille de gaz", true], ['une eau minérale', false],
];
const de = (el) => (/^[aeiouyh]/.test(NOMS_ELEMENTS[el] || '') ? "d'" : 'de ') + (NOMS_ELEMENTS[el] || el);

export default {
  id: 'pr01',
  titre: "L'air et les molécules",
  theme: 'pc_matiere', niveau: '4e',
  icone: '🫧',

  intro:
    "Nous respirons de l'air sans le voir. De quoi est-il fait ? Pour répondre, les chimistes utilisent un modèle : la matière est faite de <strong>molécules</strong>, elles-mêmes formées d'<strong>atomes</strong>. " +
    "Ce chapitre apprend à lire une formule chimique et à représenter les molécules avec des boules colorées.",

  cours: [
    {
      type: 'definition', titre: "L'air, un mélange de gaz",
      contenu: "L'air est un <strong>mélange</strong> de gaz. En volume, il contient environ <strong>78 % de diazote</strong>, <strong>21 % de dioxygène</strong> et 1 % d'autres gaz (argon, dioxyde de carbone, vapeur d'eau). Le dioxygène est indispensable à la respiration et aux combustions.",
    },
    {
      type: 'definition', titre: 'Atomes et molécules',
      contenu: "Toute matière est faite d'<strong>atomes</strong>, représentés par des <strong>symboles</strong> : H (hydrogène), C (carbone), O (oxygène), N (azote). Une <strong>molécule</strong> est un assemblage d'atomes liés entre eux. Dans le <strong>modèle moléculaire</strong>, chaque atome est une boule de couleur conventionnelle : " +
        '<span class="pc-pastille pc-at-H"></span>H blanc, <span class="pc-pastille pc-at-C"></span>C noir, <span class="pc-pastille pc-at-O"></span>O rouge, <span class="pc-pastille pc-at-N"></span>N bleu.',
    },
    { type: 'figure', titre: 'Des modèles moléculaires', contenu: "Choisis une molécule, ou regarde l'air « au microscope »." , render: (host) => molecules(host) },
    {
      type: 'propriete', titre: 'La formule chimique',
      contenu: "La <strong>formule</strong> d'une molécule indique la nature et le nombre de ses atomes : un symbole par sorte d'atome, suivi d'un petit chiffre en bas (l'<strong>indice</strong>) quand il y en a plusieurs. L'indice 1 ne s'écrit pas." +
        tableau([['Molécule', 'eau', 'dioxygène', 'dioxyde de carbone', 'méthane'], ['Formule', 'H₂O', 'O₂', 'CO₂', 'CH₄'], ['Atomes', '2 H, 1 O', '2 O', '1 C, 2 O', '1 C, 4 H']]),
    },
    {
      type: 'definition', titre: 'Corps pur ou mélange ?',
      contenu: "Un <strong>corps pur</strong> est formé d'une seule sorte de molécules (eau distillée : uniquement des molécules H₂O). Un <strong>mélange</strong> contient plusieurs sortes de molécules (l'air : N₂, O₂…).",
    },
    {
      type: 'propriete', titre: "La pression d'un gaz",
      contenu: "Les molécules d'un gaz s'agitent et frappent les parois du récipient : le gaz exerce une <strong>pression</strong>, mesurée avec un <strong>manomètre</strong> en pascals (Pa) ou hectopascals (hPa). La pression atmosphérique vaut environ $1\\,013$ hPa. Si on comprime un gaz (même quantité dans un volume plus petit), sa pression <strong>augmente</strong>.",
    },
    {
      type: 'exemple', enonce: 'Combien d\'atomes contient une molécule d\'éthanol, de formule C₂H₆O ?',
      solution_etapes: ['2 atomes de carbone, 6 atomes d\'hydrogène, 1 atome d\'oxygène (l\'indice 1 n\'est pas écrit).', '$2 + 6 + 1 = 9$ atomes.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lire les symboles', explication: 'Chaque majuscule commence un nouveau symbole : C, H, O, N, Cu…' },
    { etape: 2, titre: 'Lire les indices', explication: "Le petit chiffre après un symbole compte ses atomes. Pas de chiffre : 1 atome." },
    { etape: 3, titre: 'Compter', explication: 'Additionne les atomes de chaque sorte pour le total.' },
    { etape: 4, titre: 'Dessiner le modèle', explication: 'Une boule par atome, avec la couleur de son élément.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: "La composition de l'air :",
      generer() {
        return pick([
          { enonce: "Quel est le gaz le plus abondant dans l'air ?", choix: ['le diazote', 'le dioxygène', 'le dioxyde de carbone', "la vapeur d'eau"], correct: 0, _v: { e: "Le diazote représente environ 78 % de l'air." } },
          { enonce: "Quelle proportion de dioxygène l'air contient-il ?", choix: ['environ 21 %', 'environ 78 %', 'environ 50 %', 'environ 1 %'], correct: 0, _v: { e: "Environ 21 % de dioxygène, en volume." } },
          { enonce: "Quel gaz de l'air est indispensable aux combustions ?", choix: ['le dioxygène', 'le diazote', "l'argon", 'le dioxyde de carbone'], correct: 0, _v: { e: "Le dioxygène est le comburant des combustions (et le gaz de la respiration)." } },
        ]);
      },
      indices: ["L'air contient surtout deux gaz.", 'Environ 4/5 de diazote.', 'Environ 1/5 de dioxygène.'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Compte les atomes :',
      generer() {
        const [f, nom] = pick(FORMULES);
        return { enonce: `La formule de ${nom} est ${formuleHTML(f)}. Combien d'atomes contient une molécule ${nom.replace(/^le |^la /, 'de ').replace(/^l'/, "d'")} ?`, reponse: nbAtomes(f), validation: 'nombre', _v: { f } };
      },
      indices: ['Repère chaque symbole (une majuscule).', 'Le petit chiffre après un symbole indique le nombre de ces atomes ; pas de chiffre = 1.', 'Additionne.'],
      correction_etapes: (st) => { const c = composition(st._v.f); return [Object.entries(c).map(([el, n]) => `${n} ${el}`).join(' + ') + '.', `$${Object.values(c).join(' + ')} = ${nbAtomes(st._v.f)}$ atomes.`]; },
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Reconnais la molécule :',
      generer() {
        const [f, nom] = pick(DESSINABLES);
        const autres = melanger(DESSINABLES.filter((x) => x[0] !== f)).slice(0, 3).map((x) => x[0]);
        return { enonce: "Voici un modèle moléculaire (H blanc, C noir, O rouge, N bleu). Quelle est sa formule ?", visuel: (h) => { h.innerHTML = schemaMolecule(f); }, choix: [f, ...autres].map(formuleTex), correct: 0, _v: { f, nom } };
      },
      indices: ['Compte les boules de chaque couleur.', 'Rouge : oxygène ; noir : carbone ; blanc : hydrogène ; bleu : azote.', 'Écris les symboles avec leurs indices.'],
      correction_etapes: (st) => [`On compte ${Object.entries(composition(st._v.f)).map(([el, n]) => `${n} atome${n > 1 ? 's' : ''} ${de(el)}`).join(' et ')}.`, `C'est une molécule ${st._v.nom} : <strong>${formuleHTML(st._v.f)}</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'complete', consigne: 'Lis la formule :',
      generer() {
        const [f, nom] = pick(HYDROCARBURES), c = composition(f);
        return { enonce_complete: `Une molécule de ${nom} (${formuleHTML(f)}) contient {0} atome(s) de carbone et {1} atome(s) d'hydrogène.`, champs: [{ reponse: c.C, validation: 'nombre' }, { reponse: c.H, validation: 'nombre' }], _v: { f, nom } };
      },
      indices: ['C est le symbole du carbone, H celui de l\'hydrogène.', "Le chiffre qui suit le symbole compte ses atomes.", 'Pas de chiffre : un seul atome.'],
      correction_etapes: (st) => { const c = composition(st._v.f); return [`${formuleHTML(st._v.f)} : ${c.C} C et ${c.H} H${c.O ? ` (et ${c.O} O)` : ''}.`]; },
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Corps pur ou mélange ?',
      generer() {
        const [nom, pur] = pick(PURS);
        return { enonce: `Au niveau des molécules, ${nom} est :`, choix: ['un corps pur', 'un mélange'], correct: pur ? 0 : 1, ordre_fixe: true, _v: { nom, pur } };
      },
      indices: ['Combien de sortes de molécules différentes ?', 'Une seule sorte : corps pur.', 'Plusieurs sortes : mélange.'],
      correction_etapes: (st) => [st._v.pur ? 'Il ne contient qu\'une seule sorte de molécules.' : 'Il contient plusieurs sortes de molécules.', `C'est ${st._v.pur ? 'un <strong>corps pur</strong>' : 'un <strong>mélange</strong>'}.`],
    },
    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: "Du dioxygène dans l'air :",
      generer() {
        const [lieu, V] = pick([['une salle de classe', 150], ['une chambre', 30], ['un ballon de baudruche', 0.005], ['une voiture', 3], ['un gymnase', 2000]]);
        const u = V < 1 ? 'L' : 'm3', Vu = V < 1 ? V * 1000 : V;
        return {
          enonce: `L'air contient 21 % de dioxygène (en volume). Quel volume de dioxygène contient ${lieu} rempli(e) de ${dec(Vu)} ${u === 'L' ? 'L' : 'm³'} d'air ?`,
          ...grandeur(arrondi(Vu * 0.21, 4), u, { tolerance: Vu * 0.002, pieges: [{ valeur: arrondi(Vu * 0.78, 4), message: 'Ça, c\'est le volume de diazote (78 %).' }, { valeur: arrondi(Vu * 21, 4), message: '21 % = 21 ÷ 100 : n\'oublie pas de diviser par 100.' }] }),
          _v: { Vu, u },
        };
      },
      indices: ['21 % de V, c\'est V × 21 ÷ 100.', 'Garde la même unité de volume.', `Écris l'unité (m3 ou L).`],
      correction_etapes: (st) => [`$${dec(st._v.Vu).replace(',', '{,}')} \\times \\dfrac{21}{100}$.`, `$= ${dec(st._v.Vu * 0.21).replace(',', '{,}')}$ ${st._v.u === 'L' ? 'L' : 'm³'} de dioxygène.`],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Un échantillon d\'air :',
      generer() {
        const N = pick([100, 200, 500, 1000]), gaz = pick([['diazote', 78], ['dioxygène', 21]]);
        return { enonce: `Un échantillon d'air contient ${N} molécules. Environ combien sont des molécules de ${gaz[0]} ? (${gaz[1]} %)`, reponse: (N * gaz[1]) / 100, validation: 'nombre', tolerance: N / 100, _v: { N, gaz } };
      },
      indices: ['Il faut calculer un pourcentage de N.', 'Multiplie N par le pourcentage, puis divise par 100.', "C'est une estimation : environ."],
      correction_etapes: (st) => [`$${st._v.N} \\times \\dfrac{${st._v.gaz[1]}}{100} = ${(st._v.N * st._v.gaz[1]) / 100}$.`, `Environ <strong>${(st._v.N * st._v.gaz[1]) / 100}</strong> molécules de ${st._v.gaz[0]}.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: "La pression d'un gaz :",
      generer() {
        return pick([
          { enonce: "On bouche une seringue pleine d'air et on enfonce le piston. Que devient la pression de l'air enfermé ?", choix: ['elle augmente', 'elle diminue', 'elle ne change pas'], correct: 0, ordre_fixe: true, _v: { e: 'Même quantité de gaz dans un volume plus petit : les molécules frappent plus souvent les parois, la pression augmente.' } },
          { enonce: 'On gonfle un pneu de vélo avec une pompe. La pression dans le pneu :', choix: ['augmente', 'diminue', 'ne change pas'], correct: 0, ordre_fixe: true, _v: { e: 'On ajoute des molécules d\'air dans le même volume : la pression augmente.' } },
          { enonce: "Avec quel instrument mesure-t-on la pression d'un gaz ?", choix: ['un manomètre', 'un thermomètre', 'une balance', 'un ampèremètre'], correct: 0, _v: { e: 'Le manomètre mesure une pression, en pascals (Pa) ou hectopascals (hPa).' } },
        ]);
      },
      indices: ['Les molécules d\'un gaz frappent les parois.', 'Plus de chocs sur les parois : pression plus grande.', 'Moins de place ou plus de molécules : plus de chocs.'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'La molécule de dioxyde de carbone, CO₂, contient deux atomes de carbone.', reponse: false, _v: { e: "Non : 1 atome de carbone et 2 atomes d'oxygène. L'indice 2 porte sur O." } },
          { enonce: "L'air est un corps pur.", reponse: false, _v: { e: "Non : c'est un mélange de plusieurs gaz (N₂, O₂, Ar, CO₂…)." } },
          { enonce: 'Une molécule est un assemblage d\'atomes.', reponse: true, _v: { e: 'Oui : par exemple H₂O = 2 atomes H + 1 atome O.' } },
          { enonce: 'Le symbole de l\'azote est A.', reponse: false, _v: { e: "Non : c'est N (de son nom latin nitrogenium)." } },
          { enonce: 'Dans le modèle moléculaire, les atomes d\'oxygène sont représentés en rouge.', reponse: true, _v: { e: 'Oui, c\'est la convention : O rouge, C noir, H blanc, N bleu.' } },
        ]);
      },
      indices: ['L\'indice suit le symbole qu\'il compte.', 'Mélange = plusieurs sortes de molécules.', 'Symboles : H, C, O, N.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'air contient environ :", choix: ['78 % de diazote et 21 % de dioxygène', '78 % de dioxygène et 21 % de diazote', '50 % de chaque', '100 % de dioxygène'], correct: 0, explication: 'Environ 4/5 de diazote, 1/5 de dioxygène.' },
    { type: 'qcm', question: 'La formule de la molécule d\'eau est :', choix: ['H2O', 'HO2', 'H2O2', 'OH'].map(formuleTex), correct: 0, explication: '2 atomes d\'hydrogène, 1 atome d\'oxygène.' },
    {
      type: 'saisie', question: 'Atomes.',
      generer() { const [f, nom] = pick(FORMULES.slice(0, 6)); return { question: `Combien d'atomes dans une molécule de formule ${formuleHTML(f)} (${nom}) ?`, reponse: nbAtomes(f), validation: 'nombre', explication: `${Object.entries(composition(f)).map(([el, n]) => `${n} ${el}`).join(' + ')} = ${nbAtomes(f)}.` }; },
    },
    { type: 'vrai_faux', question: 'Comprimer un gaz augmente sa pression.', reponse: true, explication: 'Les molécules frappent plus souvent les parois.' },
    { type: 'qcm', question: 'Le symbole C représente l\'atome de :', choix: ['carbone', 'cuivre', 'chlore', 'calcium'], correct: 0, explication: 'Cu : cuivre ; Cl : chlore ; Ca : calcium.' },
  ],
};
