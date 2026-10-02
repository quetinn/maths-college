// =====================================================================
//  sr07_diversite_especes_individus.js — SVT 4ᵉ : la diversité des
//  espèces et des individus. Caractères de l'espèce et variations
//  individuelles, localisation de l'information héréditaire.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 15.
// =====================================================================

import { pick, melanger, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, fleche, schemaCelluleADN, STRUCTURES } from '../figures.js';

const DEFINITIONS = [
  ['un caractère spécifique', "Caractère commun à tous les individus d'une espèce."],
  ['une variation individuelle', "Forme particulière d'un caractère, qui distingue un individu d'un autre de la même espèce."],
  ['un caractère héréditaire', 'Caractère transmis par les parents à leurs enfants.'],
  ["l'information héréditaire", "Ensemble des instructions, contenues dans le noyau des cellules, qui déterminent les caractères héréditaires."],
  ['le noyau', "Élément de la cellule qui contient les chromosomes."],
  ['un chromosome', "Élément du noyau, formé d'ADN, qui porte l'information héréditaire."],
];

const ovule = (x, c, noyau) => `<circle cx="${x}" cy="90" r="30" class="${c}"/>${noyau ? `<circle cx="${x}" cy="90" r="10" class="${noyau}"/>` : ''}`;
const SCENES = [
  ['Deux grenouilles', `${ovule(90, 'sv-plein-vert', 'sv-plein-gris')}${ovule(230, 'sv-plein-jaune', 'sv-plein-rose')}<text x="90" y="140" text-anchor="middle" class="pc-petit">ovule d'une grenouille verte</text><text x="230" y="140" text-anchor="middle" class="pc-petit">cellule d'une grenouille albinos</text>`,
    "On dispose d'un ovule de grenouille verte et d'une cellule de grenouille albinos (blanche)."],
  ['On retire le noyau', `${ovule(90, 'sv-plein-vert', '')}${ovule(230, 'sv-plein-jaune', 'sv-plein-rose')}<circle cx="90" cy="36" r="10" class="sv-plein-gris"/>${fleche(90, 76, 90, 50)}<text x="90" y="140" text-anchor="middle" class="pc-petit">ovule sans noyau</text>`,
    "On détruit le noyau de l'ovule de la grenouille verte : il ne contient plus que son cytoplasme."],
  ['On transfère un noyau', `${ovule(90, 'sv-plein-vert', 'sv-plein-rose')}${ovule(230, 'sv-plein-jaune', '')}${fleche(206, 90, 124, 90, 'sv-f-accent')}<text x="90" y="140" text-anchor="middle" class="pc-petit">ovule vert + noyau albinos</text>`,
    "On y place le noyau prélevé sur la cellule de la grenouille albinos."],
  ['Le résultat', `<ellipse cx="150" cy="90" rx="46" ry="26" class="sv-plein-jaune"/><path d="M196 90 q30 -16 46 4 q-16 18 -46 -4z" class="sv-plein-jaune"/><circle cx="128" cy="84" r="4" class="sv-plein-rose"/><text x="160" y="146" text-anchor="middle" class="pc-petit">un têtard albinos</text>`,
    "L'ovule se développe et donne un têtard <strong>albinos</strong>, comme la grenouille qui a fourni le noyau : l'information héréditaire se trouve dans le <strong>noyau</strong>."],
];

export default {
  id: 'sr07',
  titre: 'La diversité des espèces et des individus',
  theme: 'svt_vivant', niveau: '4e',
  icone: '🧬',

  intro:
    "Tous les êtres humains ont deux yeux, mais pas de la même couleur. Chaque individu possède les caractères de son espèce, et ses propres variations. " +
    "On cherche <strong>où se trouve l'information</strong> qui détermine ces caractères et se transmet de génération en génération.",

  cours: [
    {
      type: 'definition', titre: 'Caractères de l\'espèce et variations individuelles',
      contenu: "Les <strong>caractères spécifiques</strong> sont communs à tous les individus d'une espèce : chez l'être humain, la station debout, cinq doigts par main. Chaque caractère peut prendre plusieurs formes, les <strong>variations individuelles</strong> : la couleur des yeux, le groupe sanguin. C'est ce qui rend chaque individu unique.",
    },
    {
      type: 'propriete', titre: 'Héréditaire ou non',
      contenu: "Les caractères de l'espèce et beaucoup de variations individuelles sont <strong>héréditaires</strong> : ils se transmettent des parents aux enfants. D'autres caractères sont acquis au cours de la vie (cicatrice, bronzage) et ne se transmettent pas.",
    },
    { type: 'figure', titre: "Où se trouve l'information héréditaire ?", contenu: "Suis cette expérience de transfert de noyau.", render: (host) => etapes(host, 'Étape', SCENES, { vb: '0 0 320 160' }) },
    {
      type: 'propriete', titre: "L'information héréditaire est dans le noyau",
      contenu: "Le têtard obtenu ressemble à l'individu qui a fourni le <strong>noyau</strong>, pas à celui qui a fourni l'ovule. L'<strong>information héréditaire</strong> est donc contenue dans le noyau de la cellule.",
    },
    {
      type: 'definition', titre: 'Les chromosomes',
      contenu: "Dans le noyau, l'information héréditaire est portée par les <strong>chromosomes</strong>, visibles au microscope quand la cellule se divise. Un chromosome est formé d'une longue molécule d'<strong>ADN</strong>. L'être humain possède 46 chromosomes dans chacune de ses cellules.",
    },
    {
      type: 'exemple', enonce: "Deux sœurs ont toutes les deux un nez, mais de formes différentes. Quel est le caractère spécifique ? Quelle est la variation individuelle ?",
      solution_etapes: ["Avoir un nez est commun à tous les êtres humains : c'est un caractère spécifique.", 'La forme du nez diffère d\'une personne à l\'autre : c\'est une variation individuelle.', 'Cette variation est héréditaire : elle vient des parents.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer qui donne quoi', explication: "Dans un transfert de noyau, note quel individu fournit le noyau et lequel fournit le reste de la cellule." },
    { etape: 2, titre: 'Observer le résultat', explication: "À quel individu le descendant ressemble-t-il ?" },
    { etape: 3, titre: 'Mettre en relation', explication: "Le descendant ressemble à celui qui a fourni le noyau." },
    { etape: 4, titre: 'Conclure', explication: "« L'information héréditaire est donc dans le noyau. »" },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Spécifique : de l\'espèce.', 'Variation : d\'un individu à l\'autre.', 'Les chromosomes sont dans le noyau.']),

    exoClasser('e02', 1, 'De quel type de caractère s\'agit-il ?', [
      ['avoir deux yeux', "caractère de l'espèce"], ['avoir cinq doigts par main', "caractère de l'espèce"], ['se tenir debout sur deux jambes', "caractère de l'espèce"],
      ['avoir les yeux verts', 'variation individuelle'], ['être du groupe sanguin B', 'variation individuelle'], ['avoir les cheveux frisés', 'variation individuelle'],
      ['avoir une cicatrice au menton', 'caractère acquis'], ['être bronzé après les vacances', 'caractère acquis'], ['avoir les oreilles percées', 'caractère acquis'],
    ], ["caractère de l'espèce", 'variation individuelle', 'caractère acquis'], { "caractère de l'espèce": "Tous les êtres humains le possèdent.", 'variation individuelle': "Il diffère d'un individu à l'autre et se transmet.", 'caractère acquis': "Il apparaît au cours de la vie et ne se transmet pas." },
    ['Commun à tous : espèce.', 'Différent selon les personnes et hérité : variation individuelle.', 'Apparu au cours de la vie : acquis.']),

    exoVraiFaux('e03', 1, [
      ["L'information héréditaire se trouve dans le noyau des cellules.", true, 'Oui : le transfert de noyau le montre.'],
      ['Tous les individus d\'une espèce sont identiques.', false, 'Non : ils partagent les caractères de l\'espèce, mais présentent des variations individuelles.'],
      ['Un chromosome est formé d\'ADN.', true, 'Oui : une très longue molécule d\'ADN.'],
      ['Une cicatrice se transmet aux enfants.', false, 'Non : c\'est un caractère acquis.'],
      ['Une cellule humaine contient 46 chromosomes.', true, 'Oui, dans son noyau.'],
      ['La couleur des yeux est un caractère de l\'espèce.', false, 'Non : avoir des yeux est un caractère de l\'espèce ; leur couleur est une variation individuelle.'],
      ['Les chromosomes se trouvent dans le cytoplasme.', false, 'Non : dans le noyau.'],
    ], ['Noyau : chromosomes.', 'Espèce : commun à tous.', 'Acquis : non transmis.']),

    {
      id: 'e04', niveau: 2, type: 'legender', consigne: 'Légende le schéma : de la cellule au gène.',
      generer() { const ordre = melanger([...STRUCTURES]); return { legendes: ordre, leurres: ['cytoplasme', 'membrane'], visuel: (host) => { host.innerHTML = schemaCelluleADN(ordre); } }; },
      indices: ['La cellule contient le noyau.', 'Le noyau contient les chromosomes.', 'Un chromosome déroulé est une molécule d\'ADN.'],
      correction_etapes: (st) => st.legendes.map((nom, k) => `Repère ${k + 1} : <strong>${nom}</strong>.`),
    },

    exoOrdonner('e05', 2, [
      { consigne: 'Range du plus grand au plus petit :', etapes: ['un organisme', 'un organe', 'une cellule', 'le noyau', 'un chromosome'] },
      { consigne: 'Range du plus petit au plus grand :', etapes: ['un chromosome', 'le noyau', 'une cellule', 'un organe', 'un organisme'] },
    ], ['Un organe est fait de cellules.', 'Le noyau est dans la cellule.', 'Les chromosomes sont dans le noyau.']),

    exoDocument('e06', 2, 'Interprète cette expérience.', [
      () => {
        const [a, b] = pick([['noire', 'blanche'], ['blanche', 'noire'], ['grise', 'blanche']]);
        return {
          enonce: `On prélève le noyau d'une cellule d'une souris ${b}. On le place dans l'ovule, privé de son propre noyau, d'une souris ${a}. L'ovule est ensuite implanté dans l'utérus d'une troisième souris, qui met bas un souriceau.`,
          questions: [
            { question: 'De quelle couleur est le souriceau ?', choix: [a, b].map((c) => c), correct: 1, ordre_fixe: true },
            choix('Il ressemble à la souris qui a fourni :', 'le noyau', "l'ovule", "l'utérus"),
            choix('Cette expérience montre que l\'information héréditaire se trouve dans :', 'le noyau', 'le cytoplasme', "la membrane"),
          ],
          correction: [`Le souriceau est de couleur <strong>${b}</strong>.`, 'Il ressemble à la souris qui a donné le <strong>noyau</strong>.', "L'information héréditaire est donc contenue dans le <strong>noyau</strong>."],
        };
      },
    ], ['Qui a fourni le noyau ?', 'Le descendant ressemble au donneur du noyau.', 'L\'information suit le noyau.']),

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Compte les paires :',
      generer() {
        const [nom, n] = pick([["l'être humain", 46], ['le chat', 38], ['la souris', 40], ['le chimpanzé', 48], ['le lapin', 44]]);
        return { enonce: `Chez ${nom}, une cellule contient ${n} chromosomes, regroupés par paires. Combien de paires compte-t-on ?`, reponse: n / 2, validation: 'nombre', _v: { n } };
      },
      indices: ['Une paire, c\'est deux chromosomes.', 'Divise le nombre de chromosomes par 2.', 'Chez l\'être humain : 23 paires.'],
      correction_etapes: (st) => [`Une paire = 2 chromosomes.`, `${st._v.n} ÷ 2 = <strong>${st._v.n / 2} paires</strong>.`],
    },

    exoClasser('e08', 3, 'Ce caractère est-il héréditaire ?', [
      ['le groupe sanguin', 'héréditaire'], ['la couleur naturelle des cheveux', 'héréditaire'], ['le nombre de doigts', 'héréditaire'], ["la forme du lobe de l'oreille", 'héréditaire'],
      ['une fracture du bras', 'non héréditaire'], ['un tatouage', 'non héréditaire'], ['des muscles développés par le sport', 'non héréditaire'], ['savoir jouer du piano', 'non héréditaire'],
    ], ['héréditaire', 'non héréditaire'], { héréditaire: 'Il dépend de l\'information contenue dans le noyau.', 'non héréditaire': 'Il est acquis au cours de la vie.' },
    ['Présent dès la naissance et venu des parents : héréditaire.', 'Dû à un accident, un choix, un apprentissage : acquis.', 'Un caractère acquis ne modifie pas le noyau.']),

    exoDocument('e09', 3, 'Raisonne sur des jumeaux.', [
      () => ({
        enonce: "De vrais jumeaux proviennent de la même cellule-œuf : ils ont exactement la même information héréditaire. À 40 ans, l'un vit au bord de la mer et l'autre en ville ; ils n'ont ni le même poids ni le même bronzage, mais ils ont le même groupe sanguin et la même couleur d'yeux.",
        questions: [
          choix('Le groupe sanguin et la couleur des yeux sont identiques car ils dépendent :', "de l'information héréditaire", 'du lieu de vie', 'de l\'alimentation'),
          choix('Le poids et le bronzage diffèrent car ils dépendent aussi :', 'du mode de vie et du milieu', "de l'information héréditaire uniquement", 'du hasard uniquement'),
          choix('Leurs différences sont-elles transmises à leurs enfants ?', 'non : elles sont acquises', 'oui, toutes', 'oui, mais seulement le bronzage'),
        ],
        correction: ["Même information héréditaire, mêmes caractères <strong>héréditaires</strong>.", 'Poids et bronzage dépendent du <strong>mode de vie</strong> : ce sont des caractères acquis.', 'Un caractère acquis ne modifie pas l\'information héréditaire : il <strong>n\'est pas transmis</strong>.'],
      }),
    ], ['Vrais jumeaux : même information héréditaire.', 'Ce qui diffère vient donc d\'ailleurs.', 'Acquis : non transmis.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'information héréditaire est contenue dans :", choix: ['le noyau', 'le cytoplasme', 'la membrane', 'le sang'], correct: 0, explication: 'Elle est portée par les chromosomes.' },
    { type: 'qcm', question: 'Avoir deux bras est :', choix: ["un caractère de l'espèce", 'une variation individuelle', 'un caractère acquis', 'une maladie'], correct: 0, explication: 'Tous les êtres humains le possèdent.' },
    { type: 'vrai_faux', question: 'La couleur des yeux est une variation individuelle héréditaire.', reponse: true, explication: 'Elle diffère selon les personnes et se transmet.' },
    { type: 'qcm', question: 'Un chromosome est formé :', choix: ["d'ADN", 'de sang', 'de cytoplasme', 'de membrane'], correct: 0, explication: 'Une très longue molécule d\'ADN.' },
    { type: 'vrai_faux', question: 'Un bronzage se transmet aux enfants.', reponse: false, explication: 'C\'est un caractère acquis.' },
    { type: 'qcm', question: 'Dans un transfert de noyau, le descendant ressemble :', choix: ['au donneur du noyau', "au donneur de l'ovule", 'à la mère porteuse', 'à aucun des trois'], correct: 0, explication: 'L\'information héréditaire est dans le noyau.' },
  ],
};
