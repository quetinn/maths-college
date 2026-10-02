// =====================================================================
//  sr12_controle_reproduction.js — SVT 4ᵉ : le contrôle de la
//  reproduction. Contraception, aide à la procréation, infections
//  sexuellement transmissibles, comportements responsables.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 31.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix } from '../outils.js';
import { tableau } from '../../commun.js';
import { cycleMenstruel, etapes, fleche } from '../figures.js';

const DEFINITIONS = [
  ['la contraception', "Ensemble des méthodes qui permettent d'éviter une grossesse."],
  ['le préservatif', "Étui qui empêche les spermatozoïdes d'entrer dans le vagin ; il protège aussi des infections sexuellement transmissibles."],
  ['la pilule contraceptive', "Comprimé contenant des hormones de synthèse, qui bloque l'ovulation."],
  ['une infection sexuellement transmissible', "Infection due à un microorganisme transmis lors d'un rapport sexuel."],
  ['la procréation médicalement assistée', "Ensemble des techniques médicales qui aident un couple à avoir un enfant."],
  ['la fécondation in vitro', "Fécondation réalisée au laboratoire, hors du corps de la femme."],
  ['le consentement', "Accord libre et clair de chaque personne ; sans lui, aucune relation n'est acceptable."],
];

const tube = (x, t) => `<rect x="${x - 22}" y="60" width="44" height="60" rx="8" class="sv-plein-gris"/><text x="${x}" y="140" text-anchor="middle" class="pc-petit">${t}</text>`;
const SCENES_FIV = [
  ['Prélèvement', `${tube(90, 'ovules')}${tube(230, 'spermatozoïdes')}<circle cx="82" cy="94" r="6" class="sv-ovule"/><circle cx="98" cy="84" r="6" class="sv-ovule"/><path d="M222 82 l8 -6 M232 96 l8 -6 M224 104 l8 -6" class="sv-trait"/>`, 'Après un traitement hormonal, un médecin prélève plusieurs ovules dans les ovaires. Des spermatozoïdes sont recueillis.'],
  ['Fécondation au laboratoire', `${tube(160, 'boîte de culture')}<circle cx="160" cy="92" r="8" class="sv-ovule"/><path d="M172 84 l10 -6" class="sv-trait"/>${fleche(110, 90, 134, 90)}${fleche(210, 90, 186, 90)}`, "Ovules et spermatozoïdes sont mis en contact dans une boîte : la <strong>fécondation</strong> a lieu « in vitro », c'est-à-dire dans du verre."],
  ['Premières divisions', `${tube(160, 'embryon de quelques cellules')}<circle cx="154" cy="88" r="6" class="sv-ovule"/><circle cx="166" cy="88" r="6" class="sv-ovule"/><circle cx="154" cy="100" r="6" class="sv-ovule"/><circle cx="166" cy="100" r="6" class="sv-ovule"/>`, "La cellule-œuf se divise : en quelques jours, on obtient un embryon de quelques cellules."],
  ['Transfert', `<path d="M90 30 Q160 10 230 30 Q250 110 200 150 H120 Q70 110 90 30Z" class="sv-uterus"/><path d="M108 44 Q160 30 212 44 Q226 104 190 134 H130 Q94 104 108 44Z" class="sv-cavite"/><circle cx="130" cy="78" r="7" class="sv-ovule"/>${fleche(160, 176, 160, 140)}`, "L'embryon est déposé dans l'<strong>utérus</strong>. S'il s'implante, la grossesse se poursuit normalement."],
];

export default {
  id: 'sr12',
  titre: 'Le contrôle de la reproduction',
  theme: 'svt_corps', niveau: '4e',
  icone: '🛡️',

  intro:
    "Avoir un enfant quand on le souhaite, ou ne pas en avoir quand on ne le souhaite pas : les connaissances sur la reproduction permettent ce choix. " +
    "On étudie les <strong>méthodes de contraception</strong>, l'aide médicale à la procréation, et ce qu'implique une sexualité <strong>responsable</strong>.",

  cours: [
    {
      type: 'definition', titre: 'La contraception',
      contenu: "La <strong>contraception</strong> permet d'éviter une grossesse. Certaines méthodes empêchent la rencontre des cellules reproductrices : le <strong>préservatif</strong> retient les spermatozoïdes. D'autres agissent par des hormones : la <strong>pilule</strong>, l'implant ou le patch bloquent l'ovulation. Le stérilet, placé dans l'utérus par un médecin, empêche la fécondation ou la nidation.",
    },
    { type: 'figure', titre: 'Avec ou sans pilule', contenu: 'Fais défiler les jours du cycle, puis coche la case « pilule ».', render: (host) => cycleMenstruel(host, { pilule: true }) },
    {
      type: 'propriete', titre: 'La contraception d\'urgence',
      contenu: "Après un rapport non ou mal protégé, une <strong>contraception d'urgence</strong> peut éviter une grossesse si elle est prise très rapidement. Elle est disponible en pharmacie et auprès de l'infirmière scolaire. Ce n'est pas une méthode de contraception régulière.",
    },
    {
      type: 'definition', titre: 'Les infections sexuellement transmissibles',
      contenu: "Les <strong>IST</strong> sont dues à des virus (VIH responsable du sida, hépatite B, papillomavirus) ou à des bactéries (chlamydia, syphilis). Certaines passent inaperçues tout en restant transmissibles. Le <strong>préservatif</strong> est la seule méthode de contraception qui en protège. Des vaccins existent contre l'hépatite B et les papillomavirus ; un <strong>dépistage</strong> permet de savoir si l'on est porteur.",
    },
    {
      type: 'definition', titre: "L'aide médicale à la procréation",
      contenu: "Quand un couple ne parvient pas à avoir d'enfant, la médecine peut l'aider. Dans une <strong>fécondation in vitro</strong>, la rencontre de l'ovule et du spermatozoïde est réalisée au laboratoire, puis l'embryon est placé dans l'utérus.",
    },
    { type: 'figure', titre: 'La fécondation in vitro', contenu: 'Parcours les quatre étapes.', render: (host) => etapes(host, 'Étape', SCENES_FIV, { vb: '0 0 320 180' }) },
    {
      type: 'propriete', titre: 'Une sexualité responsable',
      contenu: "Reproduction et sexualité sont deux choses distinctes. Une relation suppose le <strong>respect</strong> de l'autre et le <strong>consentement</strong> de chacun, qui peut être retiré à tout moment. Se protéger et protéger l'autre, s'informer auprès d'un professionnel de santé ou d'un centre de santé sexuelle, c'est faire des choix éclairés.",
    },
    {
      type: 'exemple', enonce: "Un couple utilise la pilule. Est-il protégé d'une grossesse ? Des infections sexuellement transmissibles ?",
      solution_etapes: ["La pilule bloque l'ovulation : sans ovule, pas de fécondation. Le couple est protégé d'une grossesse.", "La pilule n'empêche pas le contact entre les partenaires : elle ne protège d'aucune IST.", 'Seul le préservatif protège des deux à la fois.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Identifier le mode d\'action', explication: "La méthode empêche-t-elle la rencontre des cellules reproductrices, l'ovulation ou la nidation ?" },
    { etape: 2, titre: 'Se demander si elle protège des IST', explication: "Seul le préservatif le fait." },
    { etape: 3, titre: 'Repérer qui la prescrit', explication: "Pilule, implant, stérilet : un médecin ou une sage-femme. Préservatif : en vente libre." },
    { etape: 4, titre: 'Conclure', explication: "Une méthode se choisit selon la situation, et peut se combiner au préservatif." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Contraception : éviter une grossesse.', 'IST : transmise lors d\'un rapport sexuel.', 'In vitro : au laboratoire.']),

    exoClasser('e02', 1, 'Cette méthode protège-t-elle des infections sexuellement transmissibles ?', [
      ['le préservatif masculin', 'oui'], ['le préservatif féminin', 'oui'],
      ['la pilule', 'non'], ["l'implant", 'non'], ['le stérilet', 'non'], ['le patch', 'non'],
    ], ['oui', 'non'], { oui: 'Le préservatif fait barrière entre les partenaires.', non: 'Ces méthodes évitent une grossesse mais n\'empêchent aucun contact.' },
    ['Seule une barrière empêche le contact.', 'Les hormones n\'agissent pas sur les microorganismes.', 'Le préservatif est la seule méthode qui protège des deux.'], 4),

    exoVraiFaux('e03', 1, [
      ['La pilule protège des infections sexuellement transmissibles.', false, 'Non : seul le préservatif en protège.'],
      ["La pilule contraceptive bloque l'ovulation.", true, 'Oui, grâce à des hormones de synthèse.'],
      ['Une infection sexuellement transmissible se voit toujours.', false, 'Non : certaines passent inaperçues mais restent transmissibles, d\'où l\'intérêt du dépistage.'],
      ['Il existe un vaccin contre les papillomavirus.', true, 'Oui, ainsi que contre l\'hépatite B.'],
      ['Dans une fécondation in vitro, la fécondation a lieu au laboratoire.', true, 'Oui : l\'embryon est ensuite placé dans l\'utérus.'],
      ['Le consentement donné une fois est valable pour toujours.', false, 'Non : il peut être retiré à tout moment.'],
      ['Le préservatif empêche les spermatozoïdes d\'atteindre l\'ovule.', true, 'Oui : c\'est une barrière.'],
    ], ['Préservatif : grossesse et IST.', 'Pilule : grossesse seulement.', 'Le consentement se redonne à chaque fois.']),

    exoClasser('e04', 2, 'Comment cette méthode agit-elle ?', [
      ['le préservatif', 'fait barrière'], ['le préservatif féminin', 'fait barrière'],
      ['la pilule', "bloque l'ovulation"], ["l'implant", "bloque l'ovulation"], ['le patch', "bloque l'ovulation"],
    ], ['fait barrière', "bloque l'ovulation"], { 'fait barrière': 'Les spermatozoïdes ne peuvent pas rejoindre l\'ovule.', "bloque l'ovulation": 'Des hormones de synthèse empêchent la libération d\'un ovule.' },
    ['Hormones : action sur l\'ovaire.', 'Barrière : action sur les spermatozoïdes.', 'Pilule, implant et patch contiennent des hormones.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre les étapes d'une fécondation in vitro :", etapes: ['Prélèvement des ovules et recueil des spermatozoïdes', 'Mise en contact au laboratoire', 'Fécondation : formation de cellules-œufs', "Premières divisions de l'embryon", "Transfert de l'embryon dans l'utérus"] },
    ], ['Il faut d\'abord les cellules reproductrices.', 'La fécondation précède les divisions.', 'Le transfert vient en dernier.']),

    exoClasser('e06', 2, 'Virus ou bactérie ?', [
      ['le VIH, responsable du sida', 'virus'], ["le virus de l'hépatite B", 'virus'], ['les papillomavirus', 'virus'],
      ['la chlamydia', 'bactérie'], ["l'agent de la syphilis", 'bactérie'],
    ], ['virus', 'bactérie'], { virus: 'Les antibiotiques sont sans effet ; des vaccins existent contre certains.', bactérie: 'Un traitement antibiotique est possible : d\'où l\'importance du dépistage.' },
    ['VIH : le V signifie virus.', 'Papillomavirus : c\'est dans le nom.', 'Chlamydia et syphilis sont dues à des bactéries.'], 4),

    exoSituation('e07', 2, 'Quel est le bon réflexe ?', [
      ['Deux personnes commencent une relation et veulent éviter à la fois une grossesse et les IST.', 'Utiliser un préservatif.', 'Utiliser seulement la pilule.', 'Ne rien utiliser.'],
      ["Après un rapport sans protection, une jeune femme craint une grossesse.", "Se rendre rapidement en pharmacie ou à l'infirmerie pour une contraception d'urgence.", 'Attendre le mois suivant.', 'Prendre un antibiotique.'],
      ["Une personne se demande si elle est porteuse d'une infection sexuellement transmissible.", 'Faire un dépistage.', 'Attendre de voir si des symptômes apparaissent.', 'Ne rien faire : cela se saurait.'],
      ['Une personne dit non au cours d\'un moment intime.', "On s'arrête : le consentement peut être retiré à tout moment.", 'On insiste un peu.', 'On considère qu\'elle avait dit oui avant.'],
    ], ['Le préservatif protège des deux.', 'La contraception d\'urgence est efficace si elle est prise vite.', 'Sans consentement, on s\'arrête.'], 'Se protéger, protéger l\'autre et respecter son consentement.'),

    exoDocument('e08', 3, 'Explique le mode d\'action de la pilule.', [
      () => ({
        enonce: "On suit deux femmes pendant un cycle. La première ne prend aucun contraceptif ; la seconde prend la pilule." +
          tableau([['', 'Sans pilule', 'Avec pilule'], ['Ovulation', 'oui, vers le 14ᵉ jour', 'non'], ['Paroi de l\'utérus', "s'épaissit fortement", 'reste mince']]),
        questions: [
          choix('Avec la pilule, une fécondation est impossible car :', "aucun ovule n'est libéré", 'les spermatozoïdes sont détruits', "l'utérus disparaît"),
          choix('La pilule agit grâce à :', 'des hormones de synthèse', 'un antibiotique', 'une barrière'),
          choix('Si cette femme oublie sa pilule plusieurs jours :', "l'ovulation peut reprendre : elle n'est plus protégée", 'rien ne change', 'elle est mieux protégée'),
        ],
        correction: ["Sans ovulation, <strong>pas d'ovule</strong> à féconder.", 'La pilule contient des <strong>hormones de synthèse</strong> qui bloquent le fonctionnement des ovaires.', "Sans ces hormones, l'<strong>ovulation reprend</strong> : la prise doit être régulière."],
      }),
    ], ['Compare les deux colonnes.', 'Pas d\'ovule, pas de fécondation.', 'La pilule doit être prise régulièrement.']),

    exoDocument('e09', 3, 'Choisis une méthode adaptée.', [
      () => ({
        enonce: "Tableau comparatif de trois méthodes." +
          tableau([['', 'Préservatif', 'Pilule', 'Implant'], ['Mode d\'action', 'barrière', "bloque l'ovulation", "bloque l'ovulation"], ['Protège des IST', 'oui', 'non', 'non'], ['Prescription médicale', 'non', 'oui', 'oui'], ['Utilisation', 'à chaque rapport', 'un comprimé par jour', 'posé pour plusieurs années']]),
        questions: [
          choix('Quelle méthode protège à la fois d\'une grossesse et des IST ?', 'le préservatif', 'la pilule', "l'implant"),
          choix("Quelle méthode convient à une personne qui craint d'oublier un comprimé quotidien ?", "l'implant", 'la pilule', 'aucune'),
          choix('Un couple qui utilise la pilule et veut aussi se protéger des IST doit :', 'ajouter le préservatif', 'doubler la pilule', "passer à l'implant"),
        ],
        correction: ['Seul le <strong>préservatif</strong> protège des IST.', "L'<strong>implant</strong> agit plusieurs années sans prise quotidienne.", "Il faut <strong>ajouter le préservatif</strong> : les méthodes hormonales ne protègent pas des IST."],
      }),
    ], ['Lis la ligne « Protège des IST ».', 'Lis la ligne « Utilisation ».', 'Deux méthodes peuvent se combiner.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La seule méthode qui protège des infections sexuellement transmissibles est :', choix: ['le préservatif', 'la pilule', "l'implant", 'le stérilet'], correct: 0, explication: 'Il fait barrière entre les partenaires.' },
    { type: 'qcm', question: 'La pilule contraceptive agit en :', choix: ["bloquant l'ovulation", 'détruisant les spermatozoïdes', 'faisant barrière', 'tuant les microorganismes'], correct: 0, explication: 'Grâce à des hormones de synthèse.' },
    { type: 'vrai_faux', question: 'Une infection sexuellement transmissible peut passer inaperçue.', reponse: true, explication: 'D\'où l\'intérêt du dépistage.' },
    { type: 'qcm', question: 'Dans une fécondation in vitro, la fécondation a lieu :', choix: ['au laboratoire', 'dans une trompe', "dans l'utérus", "dans l'ovaire"], correct: 0, explication: 'L\'embryon est ensuite placé dans l\'utérus.' },
    { type: 'qcm', question: 'Le VIH est :', choix: ['un virus', 'une bactérie', 'un champignon', 'un médicament'], correct: 0, explication: 'Il est responsable du sida.' },
    { type: 'vrai_faux', question: 'Le consentement peut être retiré à tout moment.', reponse: true, explication: 'Une relation suppose l\'accord libre de chacun.' },
  ],
};
