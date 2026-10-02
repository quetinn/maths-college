// =====================================================================
//  s04_diversite_genetique.js — SVT 3ᵉ : de la diversité génétique à la
//  biodiversité. Cellules reproductrices, fécondation, brassage des
//  allèles, mutations, trois niveaux de biodiversité.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 17.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { brassage, croisement, tableCroisement, COMBINAISONS, GROUPES, groupe, enfants } from '../figures.js';

const DEFINITIONS = [
  ['une cellule reproductrice', "Spermatozoïde ou ovule : cellule qui ne contient qu'un seul chromosome de chaque paire."],
  ['la fécondation', "Union d'un spermatozoïde et d'un ovule, qui donne une cellule-œuf."],
  ['la cellule-œuf', "Première cellule d'un nouvel individu, issue de la fécondation."],
  ['une mutation', "Modification de l'ADN d'un gène, qui se produit au hasard et crée un nouvel allèle."],
  ['un agent mutagène', 'Facteur de l\'environnement qui augmente la fréquence des mutations : rayons ultraviolets, tabac, certains produits chimiques.'],
  ['la biodiversité génétique', "Diversité des allèles portés par les individus d'une même espèce."],
];

/** Nombre de chromosomes dans une cellule ordinaire de quelques espèces. */
const ESPECES = [["l'être humain", 46], ['le chat', 38], ['le porc', 38], ['la souris', 40], ['le chimpanzé', 48], ['la drosophile (une mouche)', 8], ['le lapin', 44], ['le pois', 14], ['le maïs', 20]];

const FRACTIONS = ['aucune chance', '1 chance sur 4', '2 chances sur 4', '3 chances sur 4', '4 chances sur 4'];

export default {
  id: 's04',
  titre: 'De la diversité génétique à la biodiversité',
  theme: 'svt_vivant', niveau: '3e',
  icone: '🎲',

  intro:
    "Deux frères ont les mêmes parents et pourtant ils ne se ressemblent pas trait pour trait. Seuls les vrais jumeaux ont la même information génétique. " +
    "On comprend ici pourquoi la <strong>reproduction sexuée</strong> fabrique des individus tous différents, et d'où viennent les <strong>nouveaux allèles</strong>. Cette diversité des individus est l'un des trois étages de la biodiversité.",

  cours: [
    {
      type: 'definition', titre: 'Les cellules reproductrices',
      contenu: "Un spermatozoïde ou un ovule ne contient que <strong>23 chromosomes</strong> : un seul de chaque paire, pris <strong>au hasard</strong>. Il ne porte donc qu'un allèle de chaque gène. " +
        "Un même individu fabrique ainsi des cellules reproductrices toutes différentes les unes des autres.",
    },
    {
      type: 'propriete', titre: 'La fécondation',
      contenu: "La <strong>fécondation</strong> réunit un spermatozoïde et un ovule : la <strong>cellule-œuf</strong> retrouve 23 paires, soit 46 chromosomes, la moitié venant du père et la moitié de la mère. " +
        "La rencontre se fait au hasard : chaque cellule-œuf reçoit une combinaison d'allèles unique.",
      formule: '23 + 23 = 46 \\text{ chromosomes}',
    },
    { type: 'figure', titre: 'Le hasard fait des enfants différents', contenu: "Les deux parents ont les mêmes allèles. Conçois plusieurs enfants et observe leurs combinaisons.", render: (host) => brassage(host) },
    {
      type: 'propriete', titre: 'Une diversité immense',
      contenu: "Avec 23 paires de chromosomes, un être humain peut fabriquer plus de 8 millions de cellules reproductrices différentes ($2^{23}$). Un couple peut donc concevoir des milliers de milliards d'enfants génétiquement différents : chaque individu est <strong>unique</strong>.",
    },
    { type: 'figure', titre: 'Prévoir les combinaisons', contenu: "Le tableau de croisement liste les quatre combinaisons possibles pour un gène, chacune ayant une chance sur quatre.", render: (host) => croisement(host) },
    {
      type: 'definition', titre: 'Les mutations',
      contenu: "Une <strong>mutation</strong> est une modification de l'ADN d'un gène. Elle se produit <strong>au hasard</strong> et crée un nouvel allèle. Les rayons ultraviolets, le tabac ou certains produits chimiques (les <strong>agents mutagènes</strong>) en augmentent la fréquence. " +
        "Une mutation n'est transmise aux enfants que si elle touche une cellule reproductrice.",
    },
    {
      type: 'propriete', titre: 'Les trois niveaux de la biodiversité',
      contenu: "Les mutations créent de nouveaux allèles ; la reproduction sexuée les mélange. Il en résulte une diversité des <strong>individus</strong> au sein de chaque espèce. " +
        "La biodiversité se décrit à trois niveaux : diversité des <strong>écosystèmes</strong>, des <strong>espèces</strong>, et diversité <strong>génétique</strong> des individus.",
    },
    {
      type: 'exemple', enonce: "Une cellule de chat contient 38 chromosomes. Combien en contient un ovule de chatte ? Et la cellule-œuf ?",
      solution_etapes: ['Une cellule reproductrice contient un chromosome de chaque paire : 38 ÷ 2 = 19 chromosomes.', 'La fécondation réunit 19 + 19 = 38 chromosomes dans la cellule-œuf.', "Le nombre de chromosomes de l'espèce est ainsi conservé de génération en génération."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Écrire les allèles des parents', explication: "Chaque parent possède deux allèles du gène étudié : par exemple A et O pour le père, B et O pour la mère." },
    { etape: 2, titre: 'Lister les cellules reproductrices', explication: "Chaque parent transmet un seul de ses deux allèles : le père peut donner A ou O, la mère B ou O." },
    { etape: 3, titre: 'Dresser le tableau de croisement', explication: "Allèles du père en lignes, de la mère en colonnes : chaque case est une cellule-œuf possible." },
    { etape: 4, titre: 'Compter', explication: "Chaque case a une chance sur quatre. Compte les cases qui donnent le caractère recherché." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Une cellule reproductrice : 23 chromosomes chez l\'être humain.', 'Fécondation = rencontre de deux cellules reproductrices.', 'Mutation : modification de l\'ADN.']),

    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Combien de chromosomes ?',
      generer() {
        const [nom, n] = pick(ESPECES), sens = pick(['gamete', 'oeuf']);
        return sens === 'gamete'
          ? { enonce: `Chez ${nom}, une cellule ordinaire contient ${n} chromosomes. Combien de chromosomes contient une cellule reproductrice de cette espèce ?`, reponse: n / 2, validation: 'nombre', pieges: [{ valeur: n, message: 'Une cellule reproductrice ne contient qu\'un chromosome de chaque paire.' }, { valeur: n * 2, message: 'On divise par deux, on ne multiplie pas.' }], _v: { n, sens } }
          : { enonce: `Chez ${nom}, un spermatozoïde contient ${n / 2} chromosomes. Combien de chromosomes contient la cellule-œuf de cette espèce ?`, reponse: n, validation: 'nombre', pieges: [{ valeur: n / 2, message: 'La cellule-œuf réunit les chromosomes du spermatozoïde et ceux de l\'ovule.' }], _v: { n, sens } };
      },
      indices: ['Les chromosomes vont par paires.', 'Une cellule reproductrice contient un chromosome de chaque paire.', 'La fécondation additionne les chromosomes des deux cellules reproductrices.'],
      correction_etapes: (st) => (st._v.sens === 'gamete'
        ? [`${st._v.n} chromosomes forment ${st._v.n / 2} paires.`, `Une cellule reproductrice reçoit un chromosome de chaque paire : <strong>${st._v.n / 2} chromosomes</strong>.`]
        : [`L'ovule contient lui aussi ${st._v.n / 2} chromosomes.`, `${st._v.n / 2} + ${st._v.n / 2} = <strong>${st._v.n} chromosomes</strong> dans la cellule-œuf.`]),
    },

    exoVraiFaux('e03', 1, [
      ['Un spermatozoïde humain contient 46 chromosomes.', false, 'Non : 23, un seul de chaque paire.'],
      ['La cellule-œuf reçoit autant de chromosomes de son père que de sa mère.', true, 'Oui : 23 de chacun.'],
      ['Deux enfants des mêmes parents reçoivent forcément les mêmes allèles.', false, 'Non : chaque cellule reproductrice reçoit au hasard un chromosome de chaque paire.'],
      ['Une mutation se produit au hasard.', true, 'Oui : elle n\'est ni voulue ni dirigée. Des agents mutagènes la rendent seulement plus fréquente.'],
      ['Les rayons ultraviolets sont un agent mutagène.', true, 'Oui : ils augmentent la fréquence des mutations dans les cellules de la peau.'],
      ['Toute mutation est transmise aux enfants.', false, 'Non : seulement si elle touche une cellule reproductrice.'],
      ['Les mutations sont à l\'origine des nouveaux allèles.', true, 'Oui : un allèle est une version d\'un gène apparue par mutation.'],
    ], ['23 dans une cellule reproductrice, 46 dans la cellule-œuf.', 'Le hasard intervient deux fois : cellules reproductrices, puis fécondation.', 'Une mutation dans une cellule de peau reste dans la peau.']),

    exoOrdonner('e04', 2, [
      { consigne: "Remets dans l'ordre : des parents à l'enfant.", etapes: ['Chaque parent fabrique des cellules reproductrices à 23 chromosomes', "Un spermatozoïde rencontre un ovule : c'est la fécondation", 'La cellule-œuf contient 46 chromosomes', 'La cellule-œuf se divise un très grand nombre de fois', "Toutes les cellules de l'enfant portent la même information génétique"] },
    ], ['Il faut d\'abord des cellules reproductrices.', 'La fécondation donne la cellule-œuf.', 'Les divisions viennent après.']),

    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Quelle chance pour cet enfant ?',
      generer() {
        let pere, mere, cible, k;
        do {
          pere = pick(COMBINAISONS); mere = pick(COMBINAISONS); cible = pick(GROUPES);
          k = enfants(pere, mere).filter(([a, b]) => groupe(a, b) === cible).length;
        } while (pere[0] === pere[1] && mere[0] === mere[1]);
        const dire = (c) => (c[0] === c[1] ? `deux fois l'allèle ${c[0]}` : `les allèles ${c[0]} et ${c[1]}`);
        return { enonce: `Le père possède ${dire(pere)}, la mère ${dire(mere)}. Quelle est la probabilité que leur enfant soit du groupe ${cible} ?`, choix: FRACTIONS, correct: k, ordre_fixe: true, _v: { pere, mere, cible, k } };
      },
      indices: ['Dresse le tableau de croisement.', 'Traduis chacune des quatre cases en groupe sanguin.', 'Compte les cases qui donnent le groupe demandé.'],
      correction_etapes: (st) => ['Tableau de croisement :' + tableCroisement(st._v.pere, st._v.mere), `${st._v.k} case${st._v.k > 1 ? 's' : ''} sur 4 ${st._v.k > 1 ? 'donnent' : 'donne'} le groupe ${st._v.cible} : <strong>${FRACTIONS[st._v.k]}</strong>.`],
    },

    exoClasser('e06', 2, 'Quel niveau de biodiversité ?', [
      ['un désert, une savane et une forêt tropicale', 'écosystèmes'], ['un lac, une tourbière et une rivière', 'écosystèmes'],
      ['lions, zèbres et girafes dans la savane', 'espèces'], ['truites, perches et brochets dans un lac', 'espèces'], ['pissenlits, trèfles et pâquerettes dans une pelouse', 'espèces'],
      ['des escargots des haies à coquille jaune, rose ou brune', 'individus'], ['des humains de groupes sanguins A, B, AB et O', 'individus'], ['des chiens de la même portée aux pelages différents', 'individus'],
    ], ['écosystèmes', 'espèces', 'individus'], { écosystèmes: 'Des milieux de vie différents.', espèces: 'Des espèces différentes dans un même milieu.', individus: "Des allèles différents au sein d'une seule espèce : c'est la diversité génétique." },
    ['Un écosystème est un milieu de vie avec ses habitants.', 'Des espèces différentes ne se reproduisent pas entre elles.', 'La diversité génétique concerne les individus d\'une même espèce.'], 4),

    exoDocument('e07', 2, 'Interprète cette expérience.', [
      () => {
        const base = pick([2, 3, 4]);
        const lignes = [[0, base], [10, base * 4], [20, base * 9], [30, base * 15]];
        return {
          enonce: "Des levures rouges forment des colonies rouges. Une mutation d'un gène donne des colonies blanches. On expose des boîtes de culture identiques à des rayons ultraviolets (UV), puis on compte les colonies blanches." +
            tableau([['Durée d\'exposition aux UV (s)', ...lignes.map((l) => l[0])], ['Colonies blanches', ...lignes.map((l) => l[1])]]),
          questions: [
            nombre('Combien de colonies blanches compte-t-on sans exposition aux UV ?', base),
            choix('Quand la durée d\'exposition augmente, le nombre de mutations :', 'augmente', 'diminue', 'ne change pas'),
            choix('Les UV sont donc :', 'un agent mutagène', 'la seule cause possible des mutations', 'sans effet sur l\'ADN'),
          ],
          correction: [`Sans UV, on compte déjà <strong>${base}</strong> colonies blanches : des mutations se produisent spontanément.`, `De ${base} à ${base * 15} colonies : le nombre de mutations <strong>augmente</strong> avec la durée d'exposition.`, 'Les UV rendent les mutations plus fréquentes : ce sont un <strong>agent mutagène</strong>. Ils n\'en sont pas la seule cause, puisqu\'il y en a aussi sans UV.'],
        };
      },
    ], ['Lis la première colonne : c\'est le témoin, sans UV.', 'Compare les colonnes de gauche à droite.', 'Un agent mutagène augmente la fréquence des mutations, il ne les crée pas toutes.']),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Compte les cellules reproductrices possibles :',
      generer() {
        const n = pick([2, 3, 4, 5]);
        return { enonce: `Chaque cellule reproductrice reçoit au hasard un chromosome de chaque paire. Un animal possède ${n} paires de chromosomes, toutes formées de deux chromosomes différents. Combien de cellules reproductrices différentes peut-il fabriquer ?`, reponse: 2 ** n, validation: 'nombre', pieges: [{ valeur: 2 * n, message: 'Les choix se multiplient : 2 × 2 × 2…, ils ne s\'additionnent pas.' }], _v: { n } };
      },
      indices: ['Pour chaque paire, il y a deux choix possibles.', 'Les choix des différentes paires se multiplient.', 'Avec 2 paires : 2 × 2 = 4.'],
      correction_etapes: (st) => ['Pour chaque paire : 2 chromosomes possibles.', `Avec ${st._v.n} paires : ${Array(st._v.n).fill(2).join(' × ')} = <strong>${2 ** st._v.n}</strong> cellules reproductrices différentes.`, 'Chez l\'être humain, avec 23 paires : plus de 8 millions.'],
    },

    exoClasser('e09', 3, 'Cette mutation peut-elle être transmise aux enfants ?', [
      ['une mutation dans une cellule de peau exposée au soleil', 'non transmise'], ['une mutation dans une cellule du poumon d\'un fumeur', 'non transmise'], ['une mutation dans une cellule du foie', 'non transmise'], ['une mutation dans une cellule de muscle', 'non transmise'],
      ['une mutation dans un spermatozoïde', 'transmise'], ['une mutation dans un ovule', 'transmise'], ['une mutation dans une cellule qui fabrique les spermatozoïdes', 'transmise'],
    ], ['transmise', 'non transmise'], { transmise: 'Elle touche une cellule reproductrice : elle se retrouvera dans la cellule-œuf.', 'non transmise': "Elle reste dans l'organe touché et disparaît avec l'individu." },
    ['Seules les cellules reproductrices participent à la fécondation.', 'Une cellule de peau ne donne que des cellules de peau.', 'Demande-toi si la cellule touchée peut se retrouver dans la cellule-œuf.'], 4),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un ovule humain contient :', choix: ['23 chromosomes', '46 chromosomes', '23 paires de chromosomes', '2 chromosomes'], correct: 0, explication: 'Un seul chromosome de chaque paire.' },
    { type: 'qcm', question: 'La fécondation est :', choix: ["l'union d'un spermatozoïde et d'un ovule", 'la division de la cellule-œuf', 'la fabrication des spermatozoïdes', 'une mutation'], correct: 0, explication: 'Elle donne la cellule-œuf, à 46 chromosomes.' },
    { type: 'vrai_faux', question: 'Une mutation crée un nouvel allèle.', reponse: true, explication: 'Oui : c\'est une modification de l\'ADN d\'un gène.' },
    {
      type: 'saisie', question: 'Chromosomes.',
      generer() { const [nom, n] = pick(ESPECES); return { question: `Chez ${nom}, une cellule ordinaire contient ${n} chromosomes. Combien en contient un spermatozoïde ?`, reponse: n / 2, validation: 'nombre', explication: `${n} ÷ 2 = ${n / 2} : un chromosome de chaque paire.` }; },
    },
    { type: 'vrai_faux', question: "Une mutation apparue dans une cellule de peau est transmise aux enfants.", reponse: false, explication: 'Non : seules les mutations des cellules reproductrices sont transmises.' },
    { type: 'qcm', question: 'La diversité des allèles au sein d\'une espèce est la biodiversité :', choix: ['génétique', 'des écosystèmes', 'des espèces', 'des paysages'], correct: 0, explication: 'Troisième niveau de la biodiversité, avec les espèces et les écosystèmes.' },
  ],
};
