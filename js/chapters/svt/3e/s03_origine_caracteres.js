// =====================================================================
//  s03_origine_caracteres.js — SVT 3ᵉ : l'origine des caractères.
//  Caractères héréditaires, chromosomes et ADN, caryotype, gènes et
//  allèles (groupes sanguins), influence de l'environnement sur le phénotype.
//  Découpage : manuel LeLivreScolaire SVT cycle 4, chapitre 16.
//
//  En SVT, les exercices reposent sur des banques de cas (documents,
//  expériences, exemples) tirés au hasard plutôt que sur des nombres.
// =====================================================================

import { pick, randInt, melanger, tirer } from '../../physique/outils.js';
import { tableau } from '../../commun.js';
import {
  echelles, caryotype, croisement, schemaCelluleADN, schemaCaryotype, schemaBarres, tableCroisement,
  STRUCTURES, COMBINAISONS, GROUPES, groupe, groupesPossibles,
} from '../figures.js';

/** Caractères à classer : [texte, héréditaire ?]. */
const CARACTERES = [
  ['le groupe sanguin', true], ['la couleur naturelle des yeux', true], ['la couleur naturelle des cheveux', true],
  ["la forme du lobe de l'oreille", true], ['le daltonisme', true], ["l'albinisme", true], ['la mucoviscidose', true],
  ['une cicatrice au genou', false], ['le bronzage après les vacances', false], ['des muscles développés par la musculation', false],
  ['des cheveux teints en bleu', false], ['un tatouage', false], ['des oreilles percées', false], ['parler espagnol', false],
];

/** Vocabulaire du chapitre : [mot, définition]. */
const DEFINITIONS = [
  ['un chromosome', "Élément du noyau de la cellule, constitué d'une très longue molécule d'ADN."],
  ['un gène', "Portion d'ADN qui détermine un caractère héréditaire."],
  ['un allèle', "Une des versions possibles d'un même gène."],
  ["l'ADN", "Molécule en double hélice qui porte l'information génétique."],
  ['un caryotype', "Classement, par paires et par taille, des chromosomes d'une cellule."],
  ['le phénotype', "Ensemble des caractères observables d'un individu."],
  ['un caractère héréditaire', 'Caractère transmis des parents à leurs enfants.'],
];

const PRENOMS = ['Léa', 'Malo', 'Inès', 'Sacha', 'Nour', 'Tom', 'Jade', 'Elias'];

/** Caryotypes proposés : description, sexe, trisomie 21. */
const CARYOTYPES = [
  { sexe: 'XX', tri21: false }, { sexe: 'XY', tri21: false }, { sexe: 'XX', tri21: true }, { sexe: 'XY', tri21: true },
];

/**
 * Documents d'expériences : l'environnement modifie-t-il le phénotype ?
 * Chaque cas renvoie { enonce, visuel?, questions, correction }.
 */
const DOCUMENTS = [
  () => ({
    enonce: "Un jardinier coupe deux boutures sur le <strong>même hortensia</strong> : les deux plants ont donc exactement la même information génétique. Il les plante dans deux sols différents." +
      tableau([['', 'Plant 1', 'Plant 2'], ['Sol', 'acide', 'basique'], ['Couleur des fleurs', 'bleue', 'rose']]),
    questions: [
      { question: "Qu'est-ce qui diffère entre les deux plants ?", choix: ['le sol dans lequel ils poussent', 'leur information génétique', 'leur espèce'], correct: 0 },
      { question: 'La couleur des fleurs dépend donc ici :', choix: ["de l'environnement", 'uniquement des gènes', 'du hasard'], correct: 0 },
      { question: 'On sème en sol basique des graines du plant à fleurs bleues. Les fleurs obtenues seront :', choix: ['roses', 'bleues', 'moitié bleues, moitié roses'], correct: 0 },
    ],
    correction: ["Les deux plants ont la même information génétique : seul le <strong>sol</strong> change.", "Un seul facteur change et le caractère change : la couleur dépend de l'<strong>environnement</strong>.", "La couleur bleue, due au sol, n'est pas transmise : en sol basique, les fleurs seront <strong>roses</strong>."],
  }),
  () => ({
    enonce: "Dans un zoo, des flamants roses de la même espèce sont répartis en deux groupes pendant un an. Seule leur nourriture diffère." +
      tableau([['', 'Groupe 1', 'Groupe 2'], ['Nourriture', 'crevettes riches en pigments', 'granulés sans pigment'], ['Plumage après un an', 'rose vif', 'blanc']]),
    questions: [
      { question: 'Quel est le seul facteur qui diffère entre les deux groupes ?', choix: ["l'alimentation", "l'espèce", "l'âge des oiseaux"], correct: 0 },
      { question: 'La couleur rose du plumage est due :', choix: ["à des pigments apportés par l'alimentation", 'à un gène que le groupe 2 ne possède pas', 'à la lumière du soleil'], correct: 0 },
      { question: "Un poussin né de parents au plumage rose vif est nourri sans pigment. Son plumage d'adulte sera :", choix: ['blanc', 'rose vif', 'noir'], correct: 0 },
    ],
    correction: ["Les oiseaux sont de la même espèce : seule l'<strong>alimentation</strong> change.", "Sans pigments dans la nourriture, le plumage reste blanc : la couleur rose vient de l'<strong>alimentation</strong>.", "Ce caractère dépend de l'environnement, il n'est pas héréditaire : le poussin sera <strong>blanc</strong>."],
  }),
  () => ({
    enonce: "Le lapin himalayen a un pelage blanc, sauf aux extrémités (oreilles, museau, pattes), plus froides, où il est noir. On rase une zone blanche du dos, puis on laisse repousser le poil dans deux conditions." +
      tableau([['', 'Expérience 1', 'Expérience 2'], ['Zone rasée', 'laissée à 25 °C', 'refroidie par une poche de glace'], ['Poil qui repousse', 'blanc', 'noir']]),
    questions: [
      { question: 'Quel facteur change entre les deux expériences ?', choix: ['la température de la peau', 'les gènes du lapin', "l'alimentation du lapin"], correct: 0 },
      { question: 'Les cellules du dos possèdent-elles le gène qui permet de fabriquer le pigment noir ?', choix: ['oui, comme toutes les cellules du lapin', 'non, seules les oreilles le possèdent', 'seulement après refroidissement'], correct: 0 },
      { question: 'Conclusion : la couleur du pelage dépend', choix: ["des gènes et de l'environnement", 'uniquement des gènes', "uniquement de l'environnement"], correct: 0 },
    ],
    correction: ["C'est le même lapin : seule la <strong>température</strong> de la peau change.", "Toutes les cellules d'un individu contiennent la même information génétique : le gène est présent <strong>partout</strong>, y compris dans le dos.", "Le gène ne s'exprime qu'au froid : le phénotype dépend <strong>des gènes et de l'environnement</strong>."],
  }),
  () => {
    const sedentaire = randInt(27, 31), ecart = randInt(4, 8), heures = pick([6, 8, 10]);
    return {
      enonce: `Deux vrais jumeaux de 30 ans ont la même information génétique. L'un pratique l'aviron ${heures} heures par semaine depuis dix ans, l'autre ne fait pas de sport. On mesure leur masse musculaire.`,
      visuel: (host) => { host.innerHTML = schemaBarres([['jumeau sédentaire', sedentaire], ['jumeau sportif', sedentaire + ecart]], { unite: 'masse musculaire (kg)' }); },
      questions: [
        { question: 'De combien de kilogrammes la masse musculaire du jumeau sportif dépasse-t-elle celle de son frère ?', reponse: ecart, validation: 'nombre', unite: 'kg' },
        { question: "Cette différence s'explique par :", choix: ['leur mode de vie', 'leurs gènes', 'leur âge'], correct: 0 },
        { question: 'Les enfants du jumeau sportif naîtront-ils plus musclés que ceux de son frère ?', choix: ["non, ce caractère acquis n'est pas héréditaire", 'oui, il leur transmettra ses muscles', "oui, mais seulement à l'aîné"], correct: 0 },
      ],
      correction: [`${sedentaire + ecart} − ${sedentaire} = <strong>${ecart} kg</strong>.`, "Les jumeaux ont les mêmes gènes : la différence vient du <strong>mode de vie</strong> (le sport).", "Un caractère acquis au cours de la vie ne modifie pas l'information génétique : il <strong>n'est pas transmis</strong>."],
    };
  },
];

const minuscule = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const liste = (mots) => (mots.length > 1 ? `${mots.slice(0, -1).join(', ')} et ${mots[mots.length - 1]}` : mots[0]);

export default {
  id: 's03',
  titre: "L'origine des caractères",
  theme: 'svt_vivant', niveau: '3e',
  icone: '🧬',

  intro:
    "Tu as peut-être les yeux de ta mère et le groupe sanguin de ton père, mais ta cicatrice au genou n'appartient qu'à toi. " +
    "D'où viennent nos caractères ? On descend ici au cœur de la cellule : <strong>chromosomes, ADN, gènes et allèles</strong>. " +
    "On verra aussi que les gènes ne décident pas de tout : l'<strong>environnement</strong> modifie certains caractères.",

  cours: [
    {
      type: 'definition', titre: 'Caractères héréditaires',
      contenu: "Un <strong>caractère héréditaire</strong> est un caractère transmis des parents à leurs enfants : groupe sanguin, couleur naturelle des yeux, forme du lobe de l'oreille… " +
        "Certains sont communs à toute l'espèce (deux yeux, cinq doigts par main), d'autres varient d'un individu à l'autre. " +
        "Un caractère <strong>acquis</strong> au cours de la vie (cicatrice, bronzage, muscles développés par le sport) ne se transmet pas.",
    },
    { type: 'figure', titre: 'Du corps au gène', contenu: "Zoome étape par étape : où se cache l'information qui détermine nos caractères héréditaires ?", render: (host) => echelles(host) },
    {
      type: 'definition', titre: 'Chromosomes et ADN',
      contenu: "Le <strong>noyau</strong> de chaque cellule contient des <strong>chromosomes</strong> : 46 chez l'être humain, rangés en 23 paires. " +
        "Chaque chromosome est constitué d'une très longue molécule d'<strong>ADN</strong>. Les chromosomes sont le support de l'<strong>information génétique</strong>, identique dans toutes les cellules d'un individu.",
    },
    { type: 'figure', titre: 'Le caryotype', contenu: "Un caryotype est une photographie des chromosomes d'une cellule, classés par paires et par taille. Compare celui d'une femme et celui d'un homme.", render: (host) => caryotype(host) },
    {
      type: 'propriete', titre: 'Ce que montre un caryotype',
      contenu: "Les 22 premières paires sont les mêmes chez tous. La 23ᵉ paire est celle des <strong>chromosomes sexuels</strong> : X et X chez la femme, X et Y chez l'homme. " +
        "Un chromosome en trop (trois chromosomes 21 : la trisomie 21) modifie plusieurs caractères : c'est une preuve que les chromosomes portent l'information génétique.",
    },
    {
      type: 'definition', titre: 'Gène et allèles',
      contenu: "Un <strong>gène</strong> est une portion d'ADN, située à un endroit précis d'un chromosome, qui détermine un caractère héréditaire. " +
        "Un même gène peut exister en plusieurs versions : les <strong>allèles</strong>. Comme les chromosomes vont par paires, chaque cellule possède <strong>deux allèles</strong> de chaque gène, identiques ou différents.",
    },
    {
      type: 'propriete', titre: 'Des allèles au caractère : les groupes sanguins',
      contenu: "Le gène du groupe sanguin, porté par le chromosome 9, existe en trois allèles : A, B et O. Les allèles A et B s'expriment toujours ; l'allèle O ne s'exprime que s'il est présent en deux exemplaires." +
        tableau([['Allèles', 'A et A', 'A et O', 'B et B', 'B et O', 'A et B', 'O et O'], ['Groupe', 'A', 'A', 'B', 'B', 'AB', 'O']]),
    },
    { type: 'figure', titre: "D'où viennent tes deux allèles ?", contenu: "Un allèle vient du père, l'autre de la mère. Choisis les allèles des parents et observe les groupes possibles pour leurs enfants.", render: (host) => croisement(host) },
    {
      type: 'propriete', titre: 'Plusieurs gènes pour un seul caractère',
      contenu: "Beaucoup de caractères dépendent de <strong>plusieurs gènes</strong> à la fois : la couleur de la peau, celle des yeux, la taille. Les combinaisons d'allèles sont alors très nombreuses, ce qui explique toutes les nuances observées entre les individus.",
    },
    {
      type: 'definition', titre: 'Phénotype et environnement',
      contenu: "Le <strong>phénotype</strong> est l'ensemble des caractères observables d'un individu. Il résulte de l'expression de ses gènes, mais aussi de l'<strong>environnement</strong> et du mode de vie : " +
        "le soleil fait bronzer la peau, l'alimentation et le sport modifient la masse musculaire. Ces modifications ne changent pas l'information génétique : elles ne sont pas héréditaires.",
    },
    {
      type: 'exemple', enonce: "Deux boutures d'un même hortensia donnent des fleurs bleues en sol acide et roses en sol basique. Que peut-on en conclure ?",
      solution_etapes: ["Je vois que les deux plants ont la même information génétique (boutures du même pied) : seul le sol change.", "Je vois que la couleur des fleurs change avec le sol.", "J'en conclus que ce caractère dépend aussi de l'environnement."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer ce qui change', explication: "Dans une expérience bien menée, un seul facteur diffère entre les deux situations (le sol, la température, l'alimentation…). Tout le reste est identique." },
    { etape: 2, titre: 'Comparer les résultats', explication: "Décris ce que tu observes, sans encore expliquer : « je vois que les fleurs sont bleues en sol acide et roses en sol basique »." },
    { etape: 3, titre: 'Relier au cours', explication: "Mobilise ce que tu sais : « or, les deux plants ont la même information génétique »." },
    { etape: 4, titre: 'Conclure', explication: "Réponds à la question posée par une phrase : « donc la couleur des fleurs dépend de l'environnement »." },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'associer', consigne: 'Héréditaire ou non ? Classe chaque caractère.',
      generer() {
        const oui = tirer(CARACTERES.filter((c) => c[1]), pick([2, 3]));
        const non = tirer(CARACTERES.filter((c) => !c[1]), 5 - oui.length);
        return { elements: [...oui, ...non].map(([texte, h]) => ({ texte: texte.charAt(0).toUpperCase() + texte.slice(1), reponse: h ? 'héréditaire' : 'non héréditaire' })), options: ['héréditaire', 'non héréditaire'] };
      },
      indices: ['Un caractère héréditaire est transmis par les parents.', "Demande-toi : ce caractère est-il apparu au cours de la vie, à cause de l'environnement ou d'un choix ?", "Ce qui est acquis (accident, soleil, sport, apprentissage) ne se transmet pas."],
      correction_etapes: (st) => [
        `Transmis par les parents, inscrits dans l'information génétique : ${liste(st.elements.filter((e) => e.reponse === 'héréditaire').map((e) => minuscule(e.texte)))}.`,
        `Acquis au cours de la vie (environnement, mode de vie, choix), donc non transmis : ${liste(st.elements.filter((e) => e.reponse !== 'héréditaire').map((e) => minuscule(e.texte)))}.`,
      ],
    },
    {
      id: 'e02', niveau: 1, type: 'legender', consigne: 'Légende le schéma : de la cellule au gène.',
      generer() {
        const ordre = melanger([...STRUCTURES]);
        return { legendes: ordre, leurres: ['allèle', 'caryotype'], visuel: (host) => { host.innerHTML = schemaCelluleADN(ordre); } };
      },
      indices: ['Va du plus grand au plus petit : la cellule contient le noyau, qui contient les chromosomes.', "Un chromosome déroulé est une longue molécule d'ADN, en double hélice.", "Le gène n'est qu'une portion de la molécule d'ADN."],
      correction_etapes: (st) => {
        const n = (nom) => st.legendes.indexOf(nom) + 1;
        return [
          `La <strong>cellule</strong> (repère ${n('cellule')}) est limitée par une membrane ; son <strong>noyau</strong> (repère ${n('noyau')}) est la zone arrondie à l'intérieur.`,
          `Le <strong>chromosome</strong> (repère ${n('chromosome')}), en forme de X, se trouve dans le noyau.`,
          `Déroulé, il forme la <strong>molécule d'ADN</strong> en double hélice (repère ${n("molécule d'ADN")}) ; la portion colorée est un <strong>gène</strong> (repère ${n('gène')}).`,
        ];
      },
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Quel mot correspond à cette définition ?',
      generer() {
        const [mot, def] = pick(DEFINITIONS);
        return { enonce: `« ${def} »`, choix: [mot, ...tirer(DEFINITIONS.filter((d) => d[0] !== mot), 3).map((d) => d[0])], correct: 0, _v: { mot, def } };
      },
      indices: ['Range les mots du plus grand au plus petit : chromosome, ADN, gène.', "L'allèle est une version d'un gène ; le caryotype est un classement de chromosomes.", 'Le phénotype, c\'est ce qu\'on observe.'],
      correction_etapes: (st) => [`Cette définition est celle de : <strong>${st._v.mot}</strong>.`, `À retenir : ${st._v.mot} — ${st._v.def.charAt(0).toLowerCase()}${st._v.def.slice(1)}`],
    },
    {
      id: 'e04', niveau: 2, type: 'document', consigne: 'Analyse ce caryotype humain.',
      generer() {
        const c = pick(CARYOTYPES);
        const k = schemaCaryotype(c);
        return {
          visuel: (host) => { host.innerHTML = k.svg; },
          questions: [
            { question: 'Combien de chromosomes compte ce caryotype ?', reponse: k.nombre, validation: 'nombre' },
            { question: 'La personne est :', choix: ['de sexe féminin', 'de sexe masculin'], correct: c.sexe === 'XX' ? 0 : 1, ordre_fixe: true },
            { question: 'Ce caryotype :', choix: ['compte 23 paires, sans anomalie', 'présente un chromosome 21 en trop', 'présente un chromosome en moins'], correct: c.tri21 ? 1 : 0, ordre_fixe: true },
          ],
          _v: { c, n: k.nombre },
        };
      },
      indices: ['Compte les paires : il y en a 23 dans un caryotype habituel, soit 46 chromosomes.', 'Regarde la dernière case : X et X, ou X et Y ?', 'Vérifie chaque paire : y a-t-il partout deux chromosomes ?'],
      correction_etapes: (st) => [
        st._v.c.tri21 ? `22 paires + 1 chromosome 21 supplémentaire + 2 chromosomes sexuels : <strong>${st._v.n} chromosomes</strong>.` : `23 paires : 23 × 2 = <strong>${st._v.n} chromosomes</strong>.`,
        st._v.c.sexe === 'XX' ? 'Chromosomes sexuels X et X : la personne est de <strong>sexe féminin</strong>.' : 'Chromosomes sexuels X et Y : la personne est de <strong>sexe masculin</strong>.',
        st._v.c.tri21 ? 'Il y a trois chromosomes 21 au lieu de deux : c\'est une <strong>trisomie 21</strong>.' : 'Chaque paire compte bien deux chromosomes : <strong>pas d\'anomalie</strong>.',
      ],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Des allèles au groupe sanguin :',
      generer() {
        const [a, b] = pick(COMBINAISONS), prenom = pick(PRENOMS);
        return {
          enonce: `Sur ses deux chromosomes 9, ${prenom} possède ${a === b ? `deux fois l'allèle ${a}` : `l'allèle ${a} et l'allèle ${b}`}. Quel est son groupe sanguin ?`,
          choix: GROUPES.map((g) => `groupe ${g}`), correct: GROUPES.indexOf(groupe(a, b)), ordre_fixe: true, _v: { a, b, prenom },
        };
      },
      indices: ["Les allèles A et B s'expriment toujours.", "L'allèle O ne s'exprime que s'il est présent en deux exemplaires.", 'A et B ensemble donnent le groupe AB.'],
      correction_etapes: (st) => {
        const { a, b } = st._v, g = groupe(a, b);
        const raison = a === b ? `Les deux allèles sont identiques (${a}) : c'est lui qui s'exprime.`
          : g === 'AB' ? "Les allèles A et B s'expriment tous les deux."
          : `L'allèle O ne s'exprime pas en présence de l'allèle ${g} : seul ${g} s'exprime.`;
        return [raison, `${st._v.prenom} est du <strong>groupe ${g}</strong>.`];
      },
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "Toutes les cellules d'un individu contiennent la même information génétique.", reponse: true, _v: { e: "Oui : elles possèdent toutes les mêmes 46 chromosomes." } },
          { enonce: 'Un être humain possède 23 chromosomes dans chacune de ses cellules.', reponse: false, _v: { e: 'Non : 23 <strong>paires</strong>, soit 46 chromosomes.' } },
          { enonce: 'Le bronzage des parents se transmet à leurs enfants.', reponse: false, _v: { e: "Non : le bronzage est dû au soleil. Il ne modifie pas l'information génétique." } },
          { enonce: "Un gène est une portion d'ADN.", reponse: true, _v: { e: "Oui : chaque gène occupe un endroit précis d'un chromosome, donc de la molécule d'ADN." } },
          { enonce: "Deux allèles d'un même gène sont toujours identiques.", reponse: false, _v: { e: "Non : ce sont des versions du gène, qui peuvent être identiques (A et A) ou différentes (A et O)." } },
          { enonce: 'Chez un homme, la 23ᵉ paire est formée des chromosomes X et Y.', reponse: true, _v: { e: 'Oui : X et Y chez un homme, X et X chez une femme.' } },
          { enonce: "Le phénotype d'un individu dépend uniquement de ses gènes.", reponse: false, _v: { e: "Non : il dépend aussi de l'environnement et du mode de vie." } },
          { enonce: 'La couleur de la peau dépend de plusieurs gènes.', reponse: true, _v: { e: "Oui : c'est ce qui explique les nombreuses nuances de couleur de peau." } },
        ]);
      },
      indices: ['46 chromosomes = 23 paires.', 'Héréditaire : inscrit dans les gènes. Acquis : dû à la vie.', 'Phénotype = gènes + environnement.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 2, type: 'ordonner_etapes', consigne: '',
      generer() {
        const grandVersPetit = ['organisme', 'organe (la peau)', 'cellule', 'noyau', 'chromosome', 'gène'];
        const croissant = pick([true, false]);
        return { consigne: croissant ? 'Range du plus petit au plus grand :' : 'Range du plus grand au plus petit :', etapes: croissant ? [...grandVersPetit].reverse() : grandVersPetit, _v: { croissant } };
      },
      indices: ['La cellule contient un noyau.', 'Le noyau contient les chromosomes.', "Un gène n'est qu'une portion d'un chromosome."],
      correction_detaillee: (st) => `<p>${st._v.croissant ? 'Chaque élément est contenu dans le suivant' : 'Chaque élément contient le suivant'} :</p><ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e08', niveau: 3, type: 'document', consigne: 'Interprète cette expérience.',
      generer() {
        const d = pick(DOCUMENTS)();
        return { enonce: d.enonce, visuel: d.visuel, questions: d.questions, _v: { correction: d.correction } };
      },
      indices: ['Cherche le seul facteur qui change entre les deux situations.', "Si l'information génétique est la même et que le caractère change, c'est l'environnement qui agit.", "Un caractère dû à l'environnement n'est pas transmis aux descendants."],
      correction_etapes: (st) => st._v.correction,
    },
    {
      id: 'e09', niveau: 3, type: 'associer', consigne: 'Quels groupes sanguins sont possibles pour leur enfant ?',
      generer() {
        let pere, mere, possibles;
        do { pere = pick(COMBINAISONS); mere = pick(COMBINAISONS); possibles = groupesPossibles(pere, mere); } while (possibles.length === 4);
        const dire = (c) => (c[0] === c[1] ? `deux fois l'allèle ${c[0]}` : `les allèles ${c[0]} et ${c[1]}`);
        return {
          enonce: `Le père possède ${dire(pere)} ; la mère possède ${dire(mere)}. Chaque parent transmet au hasard un seul de ses deux allèles.`,
          elements: GROUPES.map((g) => ({ texte: `Groupe ${g}`, reponse: possibles.includes(g) ? 'possible' : 'impossible' })),
          options: ['possible', 'impossible'], ordre_fixe: true, _v: { pere, mere, possibles },
        };
      },
      indices: ["Dresse un tableau : les allèles du père en lignes, ceux de la mère en colonnes.", "Chaque case donne les deux allèles d'un enfant possible.", "Traduis chaque case en groupe : A et B s'expriment toujours, O seulement s'il est seul."],
      correction_etapes: (st) => [
        'On croise les allèles que chaque parent peut transmettre :' + tableCroisement(st._v.pere, st._v.mere),
        `Groupe${st._v.possibles.length > 1 ? 's' : ''} possible${st._v.possibles.length > 1 ? 's' : ''} : <strong>${st._v.possibles.join(', ')}</strong>. Les autres groupes sont impossibles.`,
      ],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "Combien de chromosomes contient une cellule de peau humaine ?", choix: ['46', '23', '92', '2'], correct: 0, explication: '23 paires, soit 46 chromosomes.' },
    { type: 'qcm', question: 'Un gène est :', choix: ["une portion d'ADN qui détermine un caractère", 'une cellule reproductrice', "une version d'un chromosome", 'un caractère visible'], correct: 0, explication: "Le gène est une portion d'ADN ; ses différentes versions sont les allèles." },
    { type: 'vrai_faux', question: 'Une cicatrice est un caractère héréditaire.', reponse: false, explication: "Non : elle est acquise au cours de la vie et ne modifie pas l'information génétique." },
    {
      type: 'qcm', question: 'Groupe sanguin.',
      generer() {
        const [a, b] = pick(COMBINAISONS.filter((c) => c[0] !== c[1]));
        return { question: `Une personne possède les allèles ${a} et ${b}. Elle est du :`, choix: GROUPES.map((g) => `groupe ${g}`), correct: GROUPES.indexOf(groupe(a, b)), ordre_fixe: true, explication: `${groupe(a, b) === 'AB' ? "A et B s'expriment tous les deux" : "L'allèle O ne s'exprime pas en présence d'un autre allèle"} : groupe ${groupe(a, b)}.` };
      },
    },
    { type: 'qcm', question: 'Sur un caryotype, on voit un chromosome X et un chromosome Y. La personne est :', choix: ['un homme', 'une femme', 'atteinte de trisomie 21', 'impossible à déterminer'], correct: 0, explication: 'X et Y : sexe masculin. X et X : sexe féminin.' },
    { type: 'vrai_faux', question: "Deux vrais jumeaux, qui ont les mêmes gènes, peuvent avoir des phénotypes différents.", reponse: true, explication: "Oui : l'environnement et le mode de vie (soleil, sport, alimentation) modifient certains caractères." },
  ],
};
