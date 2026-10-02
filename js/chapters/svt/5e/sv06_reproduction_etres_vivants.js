// =====================================================================
//  sv06_reproduction_etres_vivants.js — SVT 5ᵉ : la reproduction des
//  êtres vivants. Reproduction sexuée des animaux (fécondation externe
//  ou interne), des plantes à fleurs, et reproduction asexuée.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 12.
//  Les comptages des exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoLegender, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, fleche, schemaFleur, PARTIES_FLEUR } from '../figures.js';

const DEFINITIONS = [
  ['la reproduction sexuée', "Reproduction qui fait intervenir un mâle et une femelle, et l'union de deux cellules reproductrices."],
  ['la fécondation', "Union d'une cellule reproductrice mâle et d'une cellule reproductrice femelle."],
  ['un ovipare', 'Animal dont le petit se développe dans un œuf pondu par la femelle.'],
  ['un vivipare', 'Animal dont le petit se développe dans le corps de la femelle.'],
  ['la pollinisation', "Transport du pollen des étamines d'une fleur jusqu'au pistil d'une fleur."],
  ['une graine', "Organe issu d'un ovule fécondé, qui contient une future plante et ses réserves."],
  ['la reproduction asexuée', "Reproduction à partir d'un seul individu, sans fécondation ; les descendants lui sont identiques."],
];

const tige = '<path d="M160 180 V120" class="sv-trait"/>';
const fleurSimple = '<path d="M160 120 C130 120 104 96 96 56 C122 68 146 90 160 120Z M160 120 C190 120 216 96 224 56 C198 68 174 90 160 120Z" class="sv-plein-rose"/><path d="M160 120 C152 104 152 84 157 62 H163 C168 84 168 104 160 120Z" class="sv-plein-vert"/><path d="M152 116 L134 70 M168 116 L186 70" class="sv-trait"/><ellipse cx="132" cy="64" rx="6" ry="9" class="sv-plein-jaune"/><ellipse cx="188" cy="64" rx="6" ry="9" class="sv-plein-jaune"/>';
const SCENES_FLEUR = [
  ['Pollinisation', `${tige}${fleurSimple}<circle cx="246" cy="40" r="9" class="sv-plein-jaune"/><path d="M238 34 l-12 -8 M240 46 l-12 6" class="sv-trait"/>${fleche(236, 46, 168, 60, 'sv-f-accent')}<text x="262" y="66" text-anchor="middle" class="pc-petit">insecte</text>`,
    "Un insecte ou le vent transporte le <strong>pollen</strong> des étamines jusqu'au pistil : c'est la pollinisation."],
  ['Fécondation', `${tige}${fleurSimple}<circle cx="160" cy="62" r="3" class="sv-point-toxique"/><path d="M160 66 V104" class="sv-fleche-repere"/><circle cx="160" cy="108" r="5" class="sv-plein-jaune"/><text x="214" y="112" class="pc-petit">ovule</text>`,
    "Le grain de pollen libère une cellule reproductrice mâle, qui rejoint un <strong>ovule</strong> dans le pistil : c'est la fécondation."],
  ['Fruit et graines', `${tige}<ellipse cx="160" cy="92" rx="34" ry="30" class="sv-plein-rose"/><circle cx="150" cy="92" r="5" class="sv-plein-brun"/><circle cx="170" cy="92" r="5" class="sv-plein-brun"/><text x="214" y="96" class="pc-petit">graines</text>`,
    "Les pétales tombent. Chaque ovule fécondé devient une <strong>graine</strong> ; le pistil grossit et devient le <strong>fruit</strong>."],
  ['Germination', `<rect x="0" y="130" width="320" height="50" class="sv-plein-brun"/><circle cx="160" cy="142" r="7" class="sv-plein-jaune"/><path d="M160 136 V96 M160 108 C150 104 142 96 140 86 M160 100 C170 96 178 88 180 78 M160 148 V166 M160 156 l-10 8 M160 160 l9 8" class="sv-trait"/>`,
    "Tombée au sol, la graine <strong>germe</strong> : elle donne une nouvelle plante, différente de ses deux parents."],
];

export default {
  id: 'sv06',
  titre: 'La reproduction des êtres vivants',
  theme: 'svt_vivant', niveau: '5e',
  icone: '🌸',

  intro:
    "Une truite pond des milliers d'œufs dans la rivière, une mésange en couve une dizaine, un fraisier lance des tiges qui s'enracinent plus loin. " +
    "Derrière cette diversité, on retrouve deux grandes façons de se reproduire : la <strong>reproduction sexuée</strong>, avec fécondation, et la <strong>reproduction asexuée</strong>, à partir d'un seul individu.",

  cours: [
    {
      type: 'definition', titre: 'La reproduction sexuée',
      contenu: "Elle fait intervenir un mâle et une femelle. Le mâle produit des <strong>spermatozoïdes</strong>, la femelle des <strong>ovules</strong>. La <strong>fécondation</strong> est l'union d'un spermatozoïde et d'un ovule : elle donne une cellule-œuf, à l'origine d'un nouvel individu.",
    },
    {
      type: 'propriete', titre: 'Fécondation externe ou interne',
      contenu: "Dans l'eau, beaucoup d'animaux (poissons, grenouilles) libèrent leurs cellules reproductrices dans le milieu : la fécondation est <strong>externe</strong>. Chez les animaux terrestres (mammifères, oiseaux, insectes), elle se fait dans le corps de la femelle après un accouplement : elle est <strong>interne</strong>.",
    },
    {
      type: 'definition', titre: 'Ovipare ou vivipare',
      contenu: "Chez un <strong>ovipare</strong>, le petit se développe dans un œuf pondu par la femelle (oiseaux, poissons, insectes). Chez un <strong>vivipare</strong>, il se développe dans le corps de sa mère (la plupart des mammifères).",
    },
    {
      type: 'definition', titre: 'La fleur',
      contenu: "Chez les plantes à fleurs, les organes reproducteurs sont dans la fleur. Les <strong>étamines</strong> produisent le pollen, qui contient les cellules reproductrices mâles. Le <strong>pistil</strong> contient les ovules. Pétales et sépales les protègent et attirent les insectes.",
    },
    { type: 'figure', titre: 'De la fleur à la nouvelle plante', contenu: 'Parcours les quatre étapes.', render: (host) => etapes(host, 'Étape', SCENES_FLEUR) },
    {
      type: 'definition', titre: 'La reproduction asexuée',
      contenu: "Un seul individu donne des descendants <strong>identiques à lui-même</strong>, sans fécondation : les stolons du fraisier, les tubercules de la pomme de terre, les bulbes de la tulipe, une bouture de géranium. Ce mode permet d'occuper rapidement un milieu.",
    },
    {
      type: 'exemple', enonce: "Une grenouille pond ses œufs dans une mare ; le mâle les arrose de spermatozoïdes. De quel type de fécondation s'agit-il ? La grenouille est-elle ovipare ou vivipare ?",
      solution_etapes: ["La rencontre des cellules reproductrices a lieu dans l'eau, hors du corps de la femelle : la fécondation est externe.", 'Les petits se développent dans des œufs pondus.', 'La grenouille est donc ovipare.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Chercher la fécondation', explication: "Y a-t-il union de deux cellules reproductrices ? Oui : reproduction sexuée. Non : asexuée." },
    { etape: 2, titre: 'Localiser la fécondation', explication: "Dans le milieu (souvent l'eau) : externe. Dans le corps de la femelle : interne." },
    { etape: 3, titre: 'Localiser le développement', explication: "Dans un œuf pondu : ovipare. Dans le corps de la mère : vivipare." },
    { etape: 4, titre: 'Pour une plante', explication: "Pollinisation, fécondation, puis graine et fruit. Sans fleur ni graine : reproduction asexuée." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Sexuée : deux parents, une fécondation.', 'Ovipare : œuf pondu. Vivipare : dans le corps de la mère.', 'Asexuée : un seul individu.']),

    exoClasser('e02', 1, 'Fécondation interne ou externe ?', [
      ['la truite, qui libère ses ovules dans la rivière', 'externe'], ['la grenouille, dont les œufs sont arrosés de spermatozoïdes dans la mare', 'externe'], ["l'oursin, qui libère ses cellules reproductrices dans la mer", 'externe'],
      ['le chat, après un accouplement', 'interne'], ['la mésange, après un accouplement', 'interne'], ['le papillon, après un accouplement', 'interne'], ['le cheval, après un accouplement', 'interne'],
    ], ['interne', 'externe'], { interne: 'La rencontre a lieu dans le corps de la femelle : un accouplement est nécessaire.', externe: "La rencontre a lieu dans l'eau, hors du corps de la femelle." },
    ['Un accouplement : fécondation interne.', 'Cellules reproductrices libérées dans l\'eau : externe.', 'Sur terre, les cellules reproductrices se dessécheraient.'], 4),

    exoLegender('e03', 1, 'Légende cette fleur en coupe.', PARTIES_FLEUR, schemaFleur, ['graine', 'racine'],
      ['Le pistil est au centre de la fleur.', 'Les étamines portent un petit sac de pollen.', 'Les sépales sont sous les pétales.'],
      { pétale: 'pièce colorée qui attire les insectes', sépale: 'petite pièce verte, sous les pétales', étamine: 'elle produit le pollen', pistil: 'au centre, il contient les ovules' }),

    exoVraiFaux('e04', 1, [
      ["La fécondation est l'union d'un spermatozoïde et d'un ovule.", true, 'Oui : elle donne une cellule-œuf.'],
      ['Tous les animaux sont ovipares.', false, 'Non : la plupart des mammifères sont vivipares.'],
      ['Le pollen contient les cellules reproductrices mâles de la plante.', true, 'Oui : il est produit par les étamines.'],
      ['Après la fécondation, l\'ovule de la fleur devient une graine.', true, 'Oui, et le pistil devient le fruit.'],
      ['La reproduction asexuée nécessite deux parents.', false, 'Non : un seul individu suffit.'],
      ['Les descendants issus d\'une reproduction asexuée sont identiques à leur parent.', true, 'Oui : il n\'y a pas de fécondation, donc pas de mélange.'],
      ['Chez les poissons, la fécondation est le plus souvent externe.', true, 'Oui : elle a lieu dans l\'eau.'],
    ], ['Deux cellules reproductrices pour une fécondation.', 'Mammifères : vivipares pour la plupart.', 'Asexuée : un seul individu, des copies.']),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre : de la fleur à la nouvelle plante.", etapes: ["Un insecte transporte du pollen jusqu'au pistil", "Une cellule reproductrice mâle rejoint un ovule", "L'ovule fécondé devient une graine", 'Le pistil devient un fruit', 'La graine tombe au sol et germe'] },
      { consigne: "Remets dans l'ordre la reproduction de la mésange :", etapes: ['Le mâle et la femelle s\'accouplent', 'La fécondation a lieu dans le corps de la femelle', 'La femelle pond ses œufs dans le nid', 'Les parents couvent les œufs', 'Les oisillons éclosent'] },
    ], ['La pollinisation précède la fécondation.', 'La graine vient de l\'ovule fécondé.', 'Chez l\'oiseau, la fécondation précède la ponte.']),

    exoClasser('e06', 2, 'Reproduction sexuée ou asexuée ?', [
      ['un pommier donne des pépins après la pollinisation de ses fleurs', 'sexuée'], ['une chatte met bas quatre chatons', 'sexuée'], ['une truite pond des œufs fécondés par un mâle', 'sexuée'], ['un chêne produit des glands', 'sexuée'],
      ['un fraisier émet un stolon qui s\'enracine', 'asexuée'], ['une pomme de terre germe et donne un nouveau plant', 'asexuée'], ['une bouture de géranium prend racine', 'asexuée'], ['un bulbe de tulipe se divise', 'asexuée'],
    ], ['sexuée', 'asexuée'], { sexuée: 'Il y a fécondation : le descendant diffère de ses deux parents.', asexuée: 'Un seul individu, pas de fécondation : les descendants sont identiques au parent.' },
    ['Une graine vient d\'une fécondation.', 'Stolon, bouture, bulbe, tubercule : pas de fécondation.', 'Deux parents : reproduction sexuée.']),

    exoClasser('e07', 2, 'Ovipare ou vivipare ?', [
      ['la poule', 'ovipare'], ['la truite', 'ovipare'], ['la tortue', 'ovipare'], ['le papillon', 'ovipare'],
      ['la vache', 'vivipare'], ['le chat', 'vivipare'], ["l'être humain", 'vivipare'], ['le dauphin', 'vivipare'],
    ], ['ovipare', 'vivipare'], { ovipare: 'Le petit se développe dans un œuf pondu.', vivipare: 'Le petit se développe dans le corps de sa mère.' },
    ['Les oiseaux pondent des œufs.', 'La plupart des mammifères sont vivipares.', 'Le dauphin est un mammifère.'], 4),

    exoDocument('e08', 2, 'Compare deux stratégies.', [
      () => {
        const oeufs = pick([2000, 3000, 5000]), survie = pick([10, 20]);
        return {
          enonce: "Données inventées pour l'exercice. On compare deux animaux." +
            tableau([['', 'Truite', 'Mésange'], ['Fécondation', 'externe, dans la rivière', 'interne'], ['Œufs pondus chaque année', oeufs, 10], ['Soins des parents', 'aucun', 'couvaison, nourrissage'], ["Jeunes qui atteignent l'âge adulte", survie, 2]]),
          questions: [
            nombre("Combien d'œufs de truite n'aboutissent pas à un adulte ?", oeufs - survie),
            choix('La truite pond beaucoup d\'œufs car :', 'la plupart sont mangés ou ne sont pas fécondés', 'elle en a besoin pour se nourrir', 'ses œufs sont très gros'),
            choix('La mésange pond peu d\'œufs, mais :', 'les parents protègent et nourrissent leurs petits', 'ses œufs éclosent dans l\'eau', 'elle ne s\'en occupe pas'),
          ],
          correction: [`${oeufs} − ${survie} = <strong>${oeufs - survie} œufs</strong> perdus.`, "Dans l'eau, sans protection, la <strong>plupart des œufs sont perdus</strong> : en pondre beaucoup compense ces pertes.", 'Les <strong>soins des parents</strong> augmentent les chances de survie de chaque petit.'],
        };
      },
    ], ['Soustrais les survivants du nombre d\'œufs.', 'Sans protection, peu d\'œufs survivent.', 'Peu de petits, mais bien protégés.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Calcule le nombre de survivants :',
      generer() {
        const oeufs = pick([500, 2000, 4000]), pct = pick([1, 2, 5]);
        return { enonce: `Situation inventée pour l'exercice. Une grenouille pond ${oeufs} œufs. Seuls ${pct} % donnent une grenouille adulte. Combien de grenouilles adultes obtient-on ?`, reponse: (oeufs * pct) / 100, validation: 'nombre', _v: { oeufs, pct } };
      },
      indices: ['Un pourcentage est une proportion sur 100.', `Prendre 1 % d'un nombre, c'est le diviser par 100.`, 'Multiplie le résultat par le pourcentage.'],
      correction_etapes: (st) => [`1 % de ${st._v.oeufs}, c'est ${st._v.oeufs} ÷ 100 = ${st._v.oeufs / 100}.`, `${st._v.pct} % : ${st._v.oeufs / 100} × ${st._v.pct} = <strong>${(st._v.oeufs * st._v.pct) / 100} grenouilles</strong>.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La fécondation est :', choix: ["l'union d'un spermatozoïde et d'un ovule", 'la ponte des œufs', 'la naissance du petit', "l'accouplement"], correct: 0, explication: 'Elle donne une cellule-œuf.' },
    { type: 'qcm', question: 'Chez les poissons, la fécondation est le plus souvent :', choix: ['externe', 'interne', 'absente', 'asexuée'], correct: 0, explication: 'Elle a lieu dans l\'eau.' },
    { type: 'qcm', question: 'Dans une fleur, le pollen est produit par :', choix: ['les étamines', 'le pistil', 'les pétales', 'les sépales'], correct: 0, explication: 'Le pistil, lui, contient les ovules.' },
    { type: 'vrai_faux', question: 'Après la fécondation, le pistil se transforme en fruit.', reponse: true, explication: 'Et chaque ovule fécondé devient une graine.' },
    { type: 'qcm', question: 'Un fraisier qui se multiplie par ses stolons pratique une reproduction :', choix: ['asexuée', 'sexuée', 'externe', 'vivipare'], correct: 0, explication: 'Un seul individu, pas de fécondation.' },
    { type: 'vrai_faux', question: 'Un animal vivipare pond des œufs.', reponse: false, explication: 'Son petit se développe dans le corps de la mère.' },
  ],
};
