// =====================================================================
//  s05_liens_parente.js — SVT 3ᵉ : les liens de parenté entre les êtres
//  vivants. Caractères partagés, groupes emboîtés, arbre de parenté,
//  apport des fossiles, place de l'être humain.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 19.
// =====================================================================

import { pick, tirer, exoVraiFaux, exoDefinition, exoOrdonner, exoDocument, choix, nombre, majuscule, liste } from '../outils.js';
import { tableau } from '../../commun.js';
import { arbreParente, schemaArbre, ESPECES, INNOVATIONS, possede, parente } from '../figures.js';

const DEFINITIONS = [
  ['un ancêtre commun', 'Espèce du passé dont descendent plusieurs espèces, qui en ont hérité des caractères.'],
  ['un caractère partagé', "Caractère présent chez plusieurs espèces parce qu'elles l'ont hérité d'un même ancêtre."],
  ['un arbre de parenté', 'Schéma qui montre quelles espèces sont les plus proches parentes, d\'après les caractères qu\'elles partagent.'],
  ['un fossile', "Reste ou trace d'un être vivant du passé, conservé dans une roche."],
  ['un groupe emboîté', 'Groupe d\'espèces contenu dans un groupe plus large : les mammifères dans les vertébrés.'],
  ["l'évolution", 'Transformation des espèces au cours du temps, à partir d\'ancêtres communs.'],
];

/** Tableau des caractères pour une liste d'espèces (rangs dans ESPECES). */
const tableauCaracteres = (rangs) => tableau([
  ['', ...rangs.map((i) => majuscule(ESPECES[i]))],
  ...INNOVATIONS.map(([nom], k) => [majuscule(nom), ...rangs.map((i) => (possede(i, k) ? 'oui' : 'non'))]),
]);
/** Nom de chaque espèce avec son article, pour les phrases. */
const NOMS = ['la sardine', 'la grenouille', 'le pigeon', 'le chat', 'le chimpanzé', "l'être humain"];
const nbCommuns = (i, j) => INNOVATIONS.filter((_, k) => possede(i, k) && possede(j, k)).length;

export default {
  id: 's05',
  titre: 'Les liens de parenté entre les êtres vivants',
  theme: 'svt_vivant', niveau: '3e',
  icone: '🌳',

  intro:
    "Un chat, une chauve-souris et une baleine ont des poils et allaitent leurs petits. Hasard ? Non : ils ont hérité ces caractères d'un <strong>ancêtre commun</strong>. " +
    "En comparant les caractères des espèces, actuelles et fossiles, on reconstitue leurs <strong>liens de parenté</strong> et on les représente par un arbre. On y trouve aussi notre propre place.",

  cours: [
    {
      type: 'definition', titre: 'Caractères partagés et ancêtre commun',
      contenu: "Quand plusieurs espèces possèdent un même caractère (des vertèbres, quatre membres, des poils), c'est qu'elles l'ont hérité d'un <strong>ancêtre commun</strong> qui le possédait déjà. " +
        "Plus deux espèces partagent de caractères, plus leur ancêtre commun est récent : elles sont <strong>proches parentes</strong>.",
    },
    {
      type: 'propriete', titre: 'Des groupes emboîtés',
      contenu: "Chaque caractère partagé définit un groupe. Ces groupes s'emboîtent : les <strong>primates</strong> (pouce opposable) sont des <strong>mammifères</strong> (poils, mamelles), qui sont des <strong>amniotes</strong> (embryon protégé par une poche, l'amnios), " +
        "qui sont des <strong>tétrapodes</strong> (quatre membres), qui sont des <strong>vertébrés</strong> (vertèbres).",
    },
    { type: 'figure', titre: "Lire un arbre de parenté", contenu: "Choisis un caractère : les espèces qui le partagent s'allument. Elles descendent toutes de l'ancêtre chez qui ce caractère est apparu.", render: (host) => arbreParente(host) },
    {
      type: 'propriete', titre: 'Comment lire un arbre',
      contenu: "Chaque embranchement (nœud) représente un <strong>ancêtre commun</strong>. Pour comparer deux espèces, on descend de chacune jusqu'au nœud où leurs branches se rejoignent : plus ce nœud est haut dans l'arbre, plus elles sont proches parentes. " +
        "Un arbre ne dit pas qu'une espèce actuelle descend d'une autre espèce actuelle.",
    },
    {
      type: 'propriete', titre: "L'apport des fossiles",
      contenu: "Les fossiles se placent dans les arbres comme les espèces actuelles, d'après leurs caractères. L'<strong>Archéoptéryx</strong>, vieux de 150 millions d'années, avait des plumes comme les oiseaux, mais aussi des dents et une longue queue osseuse comme les petits dinosaures : il montre que les oiseaux sont apparentés aux dinosaures.",
    },
    {
      type: 'propriete', titre: "La place de l'être humain",
      contenu: "L'être humain est un primate. Son plus proche parent actuel est le <strong>chimpanzé</strong> : leur dernier ancêtre commun vivait il y a 7 à 9 millions d'années. " +
        "L'être humain ne descend donc pas du chimpanzé : les deux espèces ont évolué, chacune de son côté, à partir de cet ancêtre.",
    },
    {
      type: 'propriete', titre: 'Une origine commune',
      contenu: "Tous les êtres vivants sont faits de cellules et utilisent l'ADN comme support de leur information génétique. Ces caractères partagés par tous indiquent une <strong>origine commune</strong> de l'ensemble du vivant, il y a plus de 3,5 milliards d'années.",
    },
    {
      type: 'exemple', enonce: "D'après l'arbre, qui est le plus proche parent du chat : le pigeon ou le chimpanzé ?",
      solution_etapes: ['Le chat et le chimpanzé partagent quatre caractères : vertèbres, quatre membres, amnios, poils et mamelles.', 'Le chat et le pigeon n\'en partagent que trois.', 'Le chimpanzé est donc le plus proche parent du chat : leur ancêtre commun est plus récent.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer les deux espèces', explication: "Trouve-les au bout des branches de l'arbre." },
    { etape: 2, titre: 'Descendre jusqu\'au nœud commun', explication: "Suis chaque branche vers le bas jusqu'à l'endroit où elles se rejoignent : c'est leur dernier ancêtre commun." },
    { etape: 3, titre: 'Lister les caractères hérités', explication: "Tous les caractères placés sous ce nœud sont partagés par les deux espèces." },
    { etape: 4, titre: 'Comparer', explication: "Entre deux candidats, le plus proche parent est celui dont le nœud commun est le plus haut (le plus récent)." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Un ancêtre commun est une espèce du passé.', 'Un fossile est conservé dans une roche.', 'Un groupe emboîté est contenu dans un groupe plus large.']),

    {
      id: 'e02', niveau: 1, type: 'document', consigne: 'Lis le tableau de caractères.',
      generer() {
        const rangs = tirer([0, 1, 2, 3, 4, 5], 3).sort((a, b) => a - b);
        const [i, j] = pick([[0, 1], [1, 2], [0, 2]]).map((k) => rangs[k]);
        const q = pick([1, 2, 3, 4]);
        return {
          enonce: tableauCaracteres(rangs),
          questions: [
            nombre(`Combien de caractères ${NOMS[i]} et ${NOMS[j]} ont-ils en commun ?`, nbCommuns(i, j)),
            { question: `Le caractère « ${INNOVATIONS[q][0]} » est-il présent chez ${NOMS[rangs[1]]} ?`, choix: ['oui', 'non'], correct: possede(rangs[1], q) ? 0 : 1, ordre_fixe: true },
          ],
          _v: { i, j, q, milieu: rangs[1] },
        };
      },
      indices: ['Chaque colonne correspond à une espèce.', 'Un caractère est commun si les deux colonnes indiquent « oui ».', 'Compte les lignes où les deux espèces ont « oui ».'],
      correction_etapes: (st) => {
        const { i, j, q, milieu } = st._v;
        const communs = INNOVATIONS.filter((_, k) => possede(i, k) && possede(j, k)).map((c) => c[0]);
        return [`Caractères présents chez les deux espèces : ${liste(communs)}. Cela fait <strong>${communs.length}</strong>.`, `À la ligne « ${INNOVATIONS[q][0] } », la colonne « ${ESPECES[milieu]} » indique <strong>${possede(milieu, q) ? 'oui' : 'non'}</strong>.`];
      },
    },

    exoVraiFaux('e03', 1, [
      ['Deux espèces qui partagent beaucoup de caractères sont proches parentes.', true, 'Oui : elles les ont hérités d\'un ancêtre commun récent.'],
      ["L'être humain descend du chimpanzé.", false, 'Non : ils ont un ancêtre commun, qui vivait il y a 7 à 9 millions d\'années et n\'était ni l\'un ni l\'autre.'],
      ['Sur un arbre de parenté, un nœud représente un ancêtre commun.', true, 'Oui : c\'est l\'espèce dont descendent toutes les branches situées au-dessus.'],
      ['Les fossiles ne peuvent pas être placés dans un arbre de parenté.', false, 'Si : on les classe d\'après leurs caractères, comme les espèces actuelles.'],
      ['Tous les mammifères sont des vertébrés.', true, 'Oui : le groupe des mammifères est emboîté dans celui des vertébrés.'],
      ['Tous les vertébrés sont des mammifères.', false, 'Non : la sardine ou le pigeon ont des vertèbres mais ni poils ni mamelles.'],
      ['Tous les êtres vivants sont constitués de cellules.', true, 'Oui : c\'est un argument en faveur d\'une origine commune du vivant.'],
    ], ['Caractère partagé = hérité d\'un ancêtre commun.', 'Un arbre ne relie pas une espèce actuelle à une autre par descendance.', 'Pense aux groupes emboîtés.']),

    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Qui est le plus proche parent ?',
      generer() {
        let x, y, z;
        do { [x, y, z] = tirer([0, 1, 2, 3, 4, 5], 3); } while (parente(x, y) === parente(x, z));
        const proche = parente(x, y) > parente(x, z) ? y : z;
        return {
          enonce: `D'après cet arbre, quel est le plus proche parent de l'espèce « ${ESPECES[x]} » ?`,
          visuel: (host) => { host.innerHTML = schemaArbre(); },
          choix: [ESPECES[y], ESPECES[z]].map(majuscule), correct: proche === y ? 0 : 1, ordre_fixe: true, _v: { x, y, z, proche },
        };
      },
      indices: ['Repère les trois espèces en haut de l\'arbre.', 'Descends jusqu\'au nœud où deux branches se rejoignent.', 'Le plus proche parent est celui dont le nœud commun est le plus haut.'],
      correction_etapes: (st) => {
        const { x, y, z, proche } = st._v, autre = proche === y ? z : y;
        const nb = (a) => nbCommuns(x, a);
        return [`${majuscule(NOMS[x])} et ${NOMS[proche]} partagent ${nb(proche)} caractère${nb(proche) > 1 ? 's' : ''} de l'arbre ; ${NOMS[x]} et ${NOMS[autre]} en partagent ${nb(autre)}.`, `Le nœud commun avec ${NOMS[proche]} est plus haut dans l'arbre : <strong>${NOMS[proche]}</strong> est le plus proche parent.`];
      },
    },

    {
      id: 'e05', niveau: 2, type: 'legender', consigne: "Replace chaque caractère sur l'arbre.",
      generer() {
        return {
          enonce: 'Utilise le tableau pour retrouver quel caractère est apparu à chaque repère.' + tableauCaracteres([0, 1, 2, 3, 4, 5]),
          legendes: INNOVATIONS.map((c) => c[0]), leurres: ['plumes'],
          visuel: (host) => { host.innerHTML = schemaArbre({ masque: true }); },
        };
      },
      indices: ['Le caractère 1, tout en bas, est partagé par toutes les espèces.', 'Plus on monte, moins il y a d\'espèces concernées.', 'Compte les « oui » de chaque ligne du tableau.'],
      correction_etapes: (st) => st.legendes.map((nom, k) => `Caractère ${k + 1} : <strong>${nom}</strong>, présent chez ${6 - k} espèce${6 - k > 1 ? 's' : ''} (${liste(NOMS.slice(k))}).`),
    },

    {
      id: 'e06', niveau: 2, type: 'associer', consigne: '',
      generer() {
        const q = pick([1, 2, 3, 4]), [, grp] = INNOVATIONS[q];
        return {
          consigne: `Quelles espèces appartiennent au groupe des ${grp} ?`,
          enonce: `Les ${grp} sont les espèces qui possèdent le caractère « ${INNOVATIONS[q][0]} ».`,
          visuel: (host) => { host.innerHTML = schemaArbre(); },
          elements: ESPECES.map((e, i) => ({ texte: majuscule(e), reponse: possede(i, q) ? 'dans le groupe' : 'hors du groupe' })),
          options: ['dans le groupe', 'hors du groupe'], ordre_fixe: true, _v: { q, grp },
        };
      },
      indices: ['Repère le caractère sur l\'arbre.', 'Toutes les branches situées au-dessus du caractère le possèdent.', 'Les branches qui partent avant ne le possèdent pas.'],
      correction_etapes: (st) => [`Le caractère « ${INNOVATIONS[st._v.q][0]} » est apparu chez un ancêtre commun de : ${liste(NOMS.slice(st._v.q))}.`, `Ces espèces forment le groupe des <strong>${st._v.grp}</strong> ; ${liste(NOMS.slice(0, st._v.q))} n'en ${st._v.q > 1 ? 'font' : 'fait'} pas partie.`],
    },

    exoOrdonner('e07', 2, [
      { consigne: 'Range ces groupes du plus large au plus restreint :', etapes: ['êtres vivants', 'vertébrés', 'tétrapodes', 'amniotes', 'mammifères', 'primates'], note: 'Chaque groupe est emboîté dans le précédent.' },
      { consigne: 'Range ces groupes du plus restreint au plus large :', etapes: ['primates', 'mammifères', 'amniotes', 'tétrapodes', 'vertébrés', 'êtres vivants'], note: 'Chaque groupe est contenu dans le suivant.' },
    ], ['Les primates sont des mammifères.', 'Les mammifères ont quatre membres : ce sont des tétrapodes.', 'Le groupe le plus large contient tous les autres.']),

    exoDocument('e08', 3, 'Place un fossile.', [
      () => ({
        enonce: "L'Archéoptéryx est un fossile de 150 millions d'années. On compare ses caractères à ceux d'un petit dinosaure, le Compsognathus, et d'un oiseau actuel, le pigeon." +
          tableau([['', 'Compsognathus', 'Archéoptéryx', 'Pigeon'], ['Dents', 'oui', 'oui', 'non'], ['Longue queue osseuse', 'oui', 'oui', 'non'], ['Doigts griffus aux membres avant', 'oui', 'oui', 'non'], ['Plumes', 'non', 'oui', 'oui'], ['Ailes', 'non', 'oui', 'oui']]),
        questions: [
          nombre("Combien de caractères du tableau l'Archéoptéryx partage-t-il avec le Compsognathus ?", 3),
          nombre('Combien en partage-t-il avec le pigeon ?', 2),
          choix('Ce fossile montre que :', 'les oiseaux sont apparentés aux dinosaures', 'les oiseaux descendent du pigeon', 'les dinosaures avaient tous des plumes'),
        ],
        correction: ['Dents, longue queue osseuse, doigts griffus : <strong>3</strong> caractères communs avec le dinosaure.', 'Plumes et ailes : <strong>2</strong> caractères communs avec le pigeon.', "Il réunit des caractères des deux groupes : oiseaux et dinosaures ont un <strong>ancêtre commun</strong>."],
      }),
      () => ({
        enonce: "Le Tiktaalik est un fossile d'environ 380 millions d'années, trouvé dans le nord du Canada. On le compare à un poisson et à un tétrapode." +
          tableau([['', 'Poisson', 'Tiktaalik', 'Tétrapode'], ['Écailles', 'oui', 'oui', 'non'], ['Nageoires à rayons', 'oui', 'oui', 'non'], ['Cou mobile', 'non', 'oui', 'oui'], ['Os du membre (bras, poignet)', 'non', 'oui', 'oui'], ['Poumons', 'non', 'oui', 'oui']]),
        questions: [
          nombre('Combien de caractères du tableau le Tiktaalik partage-t-il avec le tétrapode ?', 3),
          choix('Le Tiktaalik possède :', 'des caractères de poisson et des caractères de tétrapode', 'uniquement des caractères de poisson', 'uniquement des caractères de tétrapode'),
          choix('Il renseigne donc sur :', "l'origine des vertébrés à quatre membres", "l'origine des oiseaux", "l'origine des mammifères"),
        ],
        correction: ['Cou mobile, os du membre, poumons : <strong>3</strong> caractères communs avec les tétrapodes.', 'Il a aussi des écailles et des nageoires : il réunit des caractères des <strong>deux groupes</strong>.', "Il éclaire le passage de la vie dans l'eau à la vie sur terre : l'<strong>origine des tétrapodes</strong>."],
      }),
    ], ['Compare les colonnes deux à deux.', 'Compte les lignes où les deux colonnes disent « oui ».', 'Un fossile qui réunit des caractères de deux groupes indique leur parenté.']),

    exoDocument('e09', 3, "Retrace l'histoire de la lignée humaine.", [
      () => ({
        enonce: "On compare trois espèces de la lignée humaine d'après leurs fossiles (ordres de grandeur)." +
          tableau([['', 'Australopithèque (Lucy)', 'Homo erectus', 'Homo sapiens'], ['Ancienneté', "environ 3 millions d'années", "jusqu'à 2 millions d'années", 'actuel'], ['Volume du cerveau', 'environ 400 cm³', 'environ 1 000 cm³', 'environ 1 200 cm³'], ['Marche sur deux jambes', 'oui', 'oui', 'oui']]),
        questions: [
          nombre("De combien de cm³ le volume du cerveau d'Homo sapiens dépasse-t-il celui de l'Australopithèque ?", 800, { unite: 'cm³' }),
          choix('Quel caractère les trois espèces partagent-elles ?', 'la marche sur deux jambes', 'un cerveau de 1 200 cm³', 'la même ancienneté'),
          choix("L'être humain et le chimpanzé :", 'ont un ancêtre commun', 'descendent l\'un de l\'autre', "n'ont aucun lien de parenté"),
        ],
        correction: ['1 200 − 400 = <strong>800 cm³</strong>.', 'Toutes marchent sur deux jambes : ce <strong>caractère partagé</strong> les réunit dans la lignée humaine.', "Chimpanzé et être humain ont évolué séparément à partir d'un <strong>ancêtre commun</strong>, il y a 7 à 9 millions d'années."],
      }),
    ], ['Une différence se calcule par une soustraction.', 'Cherche la ligne où les trois colonnes sont identiques.', 'Un arbre de parenté relie les espèces par des ancêtres communs.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Deux espèces sont proches parentes si elles :', choix: ['partagent de nombreux caractères hérités d\'un ancêtre commun', 'vivent dans le même milieu', 'ont la même taille', 'mangent la même chose'], correct: 0, explication: 'La parenté se lit dans les caractères partagés.' },
    { type: 'qcm', question: 'Sur un arbre de parenté, un nœud représente :', choix: ['un ancêtre commun', 'une espèce actuelle', 'un fossile précis', 'un milieu de vie'], correct: 0, explication: 'C\'est l\'espèce dont descendent les branches situées au-dessus.' },
    { type: 'vrai_faux', question: "L'être humain descend du chimpanzé.", reponse: false, explication: 'Non : ils partagent un ancêtre commun.' },
    {
      type: 'qcm', question: 'Groupe.',
      generer() { const q = pick([1, 3, 4]); return { question: `Quel caractère définit le groupe des ${INNOVATIONS[q][1]} ?`, choix: INNOVATIONS.map((c) => c[0]), correct: q, explication: `Les ${INNOVATIONS[q][1]} partagent le caractère « ${INNOVATIONS[q][0]} ».` }; },
    },
    { type: 'qcm', question: "L'Archéoptéryx, qui a des plumes et des dents, montre que :", choix: ['les oiseaux sont apparentés aux dinosaures', 'les oiseaux ont toujours existé', 'les fossiles sont inclassables', 'les dinosaures volaient tous'], correct: 0, explication: 'Il réunit des caractères des deux groupes.' },
    { type: 'vrai_faux', question: 'Tous les êtres vivants sont faits de cellules, ce qui indique une origine commune.', reponse: true, explication: 'Oui : cellule et ADN sont partagés par tout le vivant.' },
  ],
};
