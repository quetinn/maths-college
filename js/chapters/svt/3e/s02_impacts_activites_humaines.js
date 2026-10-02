// =====================================================================
//  s02_impacts_activites_humaines.js — SVT 3ᵉ : les impacts des activités
//  humaines sur l'environnement. Biodiversité et réchauffement, espèces
//  introduites, océans (acidification, surpêche, déchets), solutions.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 8.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre, dec } from '../outils.js';
import { tableau } from '../../commun.js';
import { acidification, schemaCourbe } from '../figures.js';

const DEFINITIONS = [
  ['la biodiversité', "Diversité des êtres vivants : diversité des écosystèmes, des espèces et des individus au sein d'une espèce."],
  ['un écosystème', 'Ensemble formé par un milieu de vie et les êtres vivants qui le peuplent, en relation les uns avec les autres.'],
  ['une espèce exotique envahissante', "Espèce introduite par l'être humain hors de sa région d'origine, qui prolifère et nuit aux espèces locales."],
  ["l'aire de répartition", 'Zone géographique où vit une espèce.'],
  ["l'acidification des océans", "Baisse du pH de l'eau de mer, due au dioxyde de carbone qui s'y dissout."],
  ['la surpêche', "Pêche si intense que les poissons n'ont plus le temps de se reproduire assez pour renouveler leur population."],
  ['une aire protégée', 'Territoire où les activités humaines sont limitées pour préserver la biodiversité.'],
];

const DOCUMENTS = [
  () => {
    // Frelon asiatique : première observation en 2004 (Lot-et-Garonne), front d'invasion
    // progressant en moyenne de 78 km par an (valeurs vérifiées, voir js/sources.js).
    const ans = pick([3, 5, 8, 10]);
    return {
      enonce: "Le frelon asiatique, originaire d'Asie, a été observé pour la première fois en France en 2004, dans le Lot-et-Garonne. Il est probablement arrivé dans des conteneurs de poteries importées. Il chasse les abeilles devant les ruches. Depuis, la limite de la zone qu'il occupe avance en moyenne de <strong>78 km par an</strong>.",
      questions: [
        nombre(`À ce rythme, de combien de kilomètres la zone occupée s'étend-elle en ${ans} ans ?`, 78 * ans, { unite: 'km' }),
        choix('Comment cette espèce est-elle arrivée en France ?', 'transportée par les activités humaines', 'en volant depuis l\'Asie', 'elle a toujours vécu en France'),
        choix('Le frelon asiatique est donc :', 'une espèce exotique envahissante', 'une espèce protégée', 'une espèce menacée de disparition'),
      ],
      correction: [`${ans} × 78 = <strong>${78 * ans} km</strong>.`, "Il a voyagé dans une cargaison : c'est le <strong>commerce</strong>, une activité humaine, qui l'a introduit.", "Introduit par l'être humain, il prolifère et nuit aux abeilles : c'est une <strong>espèce exotique envahissante</strong>."],
    };
  },
  () => {
    const v = pick([15, 17, 20]), n = pick([30, 40, 50]);
    return {
      enonce: `Cas inventé pour l'exercice. On suit depuis des décennies les lieux où vit un papillon. La limite nord de son aire de répartition se déplace vers le nord d'environ <strong>${v} km tous les dix ans</strong>, à mesure que le climat se réchauffe.`,
      questions: [
        nombre(`De combien de kilomètres cette limite s'est-elle déplacée en ${n} ans ?`, (v * n) / 10, { unite: 'km' }),
        choix('Pourquoi le papillon gagne-t-il des régions plus au nord ?', 'elles deviennent assez chaudes pour lui', 'il fuit les prédateurs', 'il y est transporté par l\'être humain'),
        choix('Une plante de montagne qui a besoin de froid risque, elle :', 'de disparaître si elle ne peut pas monter plus haut', 'de s\'étendre vers les plaines', 'de ne subir aucun changement'),
      ],
      correction: [`${n} ans = ${n / 10} décennies : ${n / 10} × ${v} = <strong>${dec((v * n) / 10)} km</strong>.`, "Le réchauffement rend le nord <strong>favorable</strong> à l'espèce : son aire de répartition se déplace.", "Une espèce de montagne ne peut pas monter indéfiniment : au sommet, elle <strong>disparaît</strong>."],
    };
  },
];

const DOCUMENTS_OCEAN = [
  () => ({
    enonce: "Le graphique montre l'évolution du pH moyen de l'eau de mer en surface. La valeur de 2100 est une projection si les émissions de CO₂ restent élevées. Plus le pH est bas, plus l'eau est acide.",
    visuel: (host) => { host.innerHTML = schemaCourbe([[1750, 8.25], [1950, 8.15], [2020, 8.05], [2100, 7.8]], { xLabel: 'année', yLabel: 'pH de l\'océan', ymin: 7.7, ymax: 8.3 }); },
    questions: [
      choix('Entre 1750 et 2020, le pH de l\'océan :', 'a diminué', 'a augmenté', 'est resté constant'),
      choix('L\'eau de mer est donc devenue :', 'plus acide', 'plus basique', 'plus salée'),
      choix('Quels êtres vivants sont les premiers menacés ?', 'ceux qui fabriquent une coquille ou un squelette calcaire', 'les mammifères marins', 'les algues vertes'),
    ],
    correction: ['Le pH passe de 8,25 à 8,05 : il <strong>diminue</strong>.', 'Un pH qui baisse signifie une eau <strong>plus acide</strong>.', 'Le calcaire se forme mal dans une eau acide : <strong>coraux, moules, huîtres</strong> sont fragilisés.'],
  }),
  () => {
    const stock = [[1960, 1600], [1975, 1100], [1985, 700], [1992, 100]];
    return {
      enonce: "Cas inventé pour l'exercice. Dans une zone de pêche, un poisson a été pêché de plus en plus intensément pendant trente ans. Le graphique donne la masse de poissons adultes présents dans la zone, en milliers de tonnes. En 1992, la pêche y a été interdite.",
      visuel: (host) => { host.innerHTML = schemaCourbe(stock, { xLabel: 'année', yLabel: 'poissons adultes (milliers de tonnes)', ymin: 0, ymax: 1600 }); },
      questions: [
        nombre('De combien de milliers de tonnes la population a-t-elle diminué entre 1960 et 1992 ?', 1500, { tolerance: 40 }),
        choix('Cette chute s\'explique par :', 'une pêche plus rapide que la reproduction des poissons', 'une maladie des poissons', 'le réchauffement de l\'eau uniquement'),
        choix('Pour éviter cela, on peut :', 'fixer des quotas de pêche', 'pêcher des poissons plus jeunes', 'augmenter le nombre de bateaux'),
      ],
      correction: ['1 600 − 100 = <strong>1 500 milliers de tonnes</strong> de moins.', "On a prélevé plus de poissons qu'il n'en naissait : c'est la <strong>surpêche</strong>.", 'Des <strong>quotas</strong> (quantités maximales autorisées) laissent à la population le temps de se renouveler.'],
    };
  },
];

export default {
  id: 's02',
  titre: "Les impacts des activités humaines sur l'environnement",
  theme: 'svt_terre', niveau: '3e',
  icone: '🏭',

  intro:
    "Transporter, pêcher, cultiver, brûler du pétrole : nos activités modifient les milieux de vie bien au-delà de l'endroit où elles ont lieu. " +
    "On étudie trois exemples : le <strong>réchauffement</strong> qui déplace les espèces, les <strong>espèces introduites</strong> qui deviennent envahissantes, et les <strong>océans</strong> qui s'acidifient et se vident. On verra aussi ce qui permet de limiter ces impacts.",

  cours: [
    {
      type: 'definition', titre: 'Biodiversité et écosystème',
      contenu: "Un <strong>écosystème</strong> est formé d'un milieu de vie et des êtres vivants qui le peuplent. La <strong>biodiversité</strong> est la diversité du vivant, à trois niveaux : les écosystèmes, les espèces, les individus d'une même espèce. " +
        "Les espèces d'un écosystème dépendent les unes des autres : en toucher une a des conséquences sur les autres.",
    },
    {
      type: 'propriete', titre: 'Le réchauffement déplace les espèces',
      contenu: "Quand le climat se réchauffe, l'<strong>aire de répartition</strong> de nombreuses espèces se décale vers les pôles ou vers les sommets. Les dates de floraison et de migration avancent. " +
        "Les espèces qui ne peuvent pas se déplacer assez vite (plantes de montagne, coraux qui blanchissent dans une eau trop chaude) sont menacées.",
    },
    {
      type: 'definition', titre: 'Les espèces exotiques envahissantes',
      contenu: "Le commerce et les voyages transportent des espèces loin de leur région d'origine. Certaines, sans prédateur dans leur nouveau milieu, prolifèrent et concurrencent ou mangent les espèces locales : " +
        "le frelon asiatique, le moustique tigre, l'écrevisse de Louisiane, la jussie (une plante qui étouffe les étangs).",
    },
    {
      type: 'propriete', titre: 'Les océans sous pression',
      contenu: "L'océan absorbe une partie du CO₂ que nous émettons : l'eau devient <strong>plus acide</strong>, ce qui gêne la fabrication du calcaire des coquilles et des coraux. " +
        "S'y ajoutent la <strong>surpêche</strong>, qui vide les populations de poissons, et les <strong>déchets plastiques</strong>, avalés par les tortues, les oiseaux et les poissons.",
    },
    { type: 'figure', titre: "Quand l'océan devient plus acide", contenu: "Augmente la teneur de l'air en CO₂ : il se dissout dans l'eau, le pH baisse et la coquille se fragilise.", render: (host) => acidification(host) },
    {
      type: 'propriete', titre: 'Limiter les impacts',
      contenu: "Les connaissances scientifiques permettent d'agir : <strong>aires protégées</strong> (parcs, réserves), <strong>quotas de pêche</strong>, contrôle des espèces introduites, réduction des déchets et des émissions de CO₂, restauration de milieux (haies, zones humides). " +
        "Chaque décision met en balance les besoins humains et la préservation des écosystèmes.",
    },
    {
      type: 'exemple', enonce: "Dans un étang, on introduit l'écrevisse de Louisiane. Quelques années plus tard, les écrevisses locales et plusieurs plantes aquatiques ont disparu. Explique.",
      solution_etapes: ["L'écrevisse de Louisiane a été introduite par l'être humain : elle n'a pas de prédateur dans l'étang.", "Elle prolifère, mange les plantes et concurrence les écrevisses locales.", "C'est une espèce exotique envahissante : la biodiversité de l'étang diminue."],
    },
  ],

  methode: [
    { etape: 1, titre: "Identifier l'activité humaine", explication: "Quelle activité est en cause : transport, pêche, combustion, construction ?" },
    { etape: 2, titre: 'Décrire la modification du milieu', explication: "Qu'est-ce qui change dans le milieu de vie : la température, le pH, la présence d'une nouvelle espèce, la quantité de poissons ?" },
    { etape: 3, titre: 'En déduire la conséquence pour les êtres vivants', explication: "Qui est touché, et comment : déplacement, diminution, disparition ?" },
    { etape: 4, titre: 'Proposer une solution argumentée', explication: "Une solution agit soit sur la cause (émettre moins, pêcher moins), soit sur les effets (protéger une zone)." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['La biodiversité a trois niveaux.', 'Exotique : venue d\'ailleurs. Envahissante : qui prolifère.', 'Plus le pH est bas, plus l\'eau est acide.']),

    exoClasser('e02', 1, 'Cette action menace-t-elle ou protège-t-elle la biodiversité ?', [
      ['raser une forêt pour construire un parking', 'menace'], ['rejeter des déchets plastiques en mer', 'menace'], ['relâcher dans la nature une tortue de Floride achetée en animalerie', 'menace'], ['pêcher des poissons trop jeunes pour s\'être reproduits', 'menace'], ['assécher une zone humide', 'menace'],
      ['créer une réserve naturelle', 'protection'], ['replanter des haies entre les champs', 'protection'], ['fixer des quotas de pêche', 'protection'], ['installer un passage à faune au-dessus d\'une autoroute', 'protection'], ['ramasser les déchets sur une plage', 'protection'],
    ], ['menace', 'protection'], { menace: 'Ces actions détruisent un milieu de vie ou perturbent ses habitants.', protection: 'Ces actions préservent ou restaurent un milieu de vie.' },
    ['Un être vivant a besoin d\'un milieu de vie intact.', 'Relâcher une espèce venue d\'ailleurs peut créer une espèce envahissante.', 'Une haie, une mare, une réserve sont des refuges.']),

    exoVraiFaux('e03', 1, [
      ['Une espèce exotique envahissante a été introduite par l\'être humain.', true, 'Oui, volontairement ou non : commerce, transports, animaux relâchés.'],
      ["L'océan absorbe une partie du CO₂ émis par les activités humaines.", true, 'Oui, et c\'est ce qui le rend plus acide.'],
      ['Quand le pH de l\'eau diminue, elle devient moins acide.', false, 'Non : un pH plus bas correspond à une eau plus acide.'],
      ['Avec le réchauffement, beaucoup d\'espèces se déplacent vers le nord ou en altitude.', true, 'Oui : elles suivent les températures qui leur conviennent.'],
      ['La surpêche n\'a aucun effet sur le reste de l\'écosystème.', false, 'Non : les prédateurs et les proies des poissons pêchés sont touchés à leur tour.'],
      ['Toutes les espèces introduites deviennent envahissantes.', false, 'Non : seules certaines prolifèrent, souvent faute de prédateur.'],
      ['La biodiversité comprend la diversité des individus d\'une même espèce.', true, 'Oui : c\'est la diversité génétique, avec celle des espèces et des écosystèmes.'],
    ], ['Relis la définition d\'espèce exotique envahissante.', 'Acide : pH bas.', 'Dans un écosystème, tout est lié.']),

    exoDocument('e04', 2, 'Analyse cette situation.', DOCUMENTS, ['Lis le tableau ou la phrase qui donne les nombres.', 'Demande-toi quelle activité humaine est en cause.', 'Relie le changement du milieu à ses conséquences sur l\'espèce.']),

    exoDocument('e05', 2, "Étudie l'état de l'océan.", DOCUMENTS_OCEAN, ['Lis la première et la dernière valeur de la courbe.', 'Une courbe qui descend : la grandeur diminue.', 'Relie la cause (CO₂, pêche) à la conséquence.']),

    exoOrdonner('e06', 2, [
      { consigne: "Remets dans l'ordre : du pot d'échappement à la coquille de l'huître.", etapes: ['Les activités humaines brûlent des énergies fossiles', "La teneur de l'air en CO₂ augmente", "Davantage de CO₂ se dissout dans l'océan", "Le pH de l'eau de mer diminue", 'Les coquilles calcaires se forment moins bien'] },
      { consigne: "Remets dans l'ordre l'histoire d'une espèce envahissante :", etapes: ["L'espèce vit dans sa région d'origine, limitée par ses prédateurs", 'Elle est transportée par un bateau de commerce', 'Elle arrive dans un milieu sans prédateur', 'Elle se multiplie très vite', 'Les espèces locales reculent'] },
    ], ['Commence par l\'activité humaine ou par la situation de départ.', 'Chaque étape est la cause de la suivante.', 'La conséquence sur les êtres vivants vient à la fin.']),

    exoClasser('e07', 2, 'Quel niveau de biodiversité est concerné ?', [
      ['une forêt, une mare et une prairie dans la même commune', 'écosystèmes'], ['récifs coralliens, mangroves et herbiers marins', 'écosystèmes'],
      ['mésanges, merles et rouges-gorges dans un jardin', 'espèces'], ['chênes, hêtres et charmes dans une forêt', 'espèces'], ['trois sortes de papillons dans un pré', 'espèces'],
      ['des chats au pelage noir, roux ou tigré', 'individus'], ['des coccinelles à deux points rouges ou noires', 'individus'], ['des élèves de tailles et de groupes sanguins différents', 'individus'],
    ], ['écosystèmes', 'espèces', 'individus'], { écosystèmes: 'Ce sont des milieux de vie différents.', espèces: 'Ce sont des espèces différentes dans un même milieu.', individus: "Ce sont des différences entre individus d'une seule espèce." },
    ['Un écosystème est un milieu de vie.', 'Deux espèces ne se reproduisent pas entre elles.', 'Au sein d\'une espèce, les individus diffèrent par leurs allèles.'], 4),

    exoClasser('e08', 3, 'Quelle est la cause principale de cette menace ?', [
      ['des coraux blanchissent dans une eau trop chaude', 'réchauffement'], ["la banquise où chasse l'ours polaire fond", 'réchauffement'], ['une plante de montagne ne trouve plus de zone assez froide', 'réchauffement'],
      ['le frelon asiatique décime les abeilles', 'espèce introduite'], ["l'écrevisse de Louisiane remplace les écrevisses locales", 'espèce introduite'], ['la jussie recouvre et étouffe des étangs', 'espèce introduite'],
      ['des tortues avalent des sacs plastiques', 'pollution ou pêche'], ['les populations de thon rouge chutent', 'pollution ou pêche'], ['une marée noire englue les oiseaux marins', 'pollution ou pêche'],
    ], ['réchauffement', 'espèce introduite', 'pollution ou pêche'], { réchauffement: 'La hausse des températures modifie leur milieu de vie.', 'espèce introduite': "Une espèce venue d'ailleurs prolifère à leurs dépens.", 'pollution ou pêche': 'Des rejets ou des prélèvements excessifs les touchent directement.' },
    ['Cherche ce qui a changé dans le milieu.', 'Une espèce introduite vient d\'une autre région du monde.', 'Pêche et pollution agissent directement sur les individus.']),

    exoDocument('e09', 3, 'Argumente une décision.', [
      () => {
        const avant = pick([120, 150, 180]), apres = avant * pick([3, 4]);
        return {
          enonce: "Une commune littorale a créé une réserve marine où la pêche est interdite. Des plongeurs comptent les poissons sur un même parcours, dans la réserve." +
            tableau([['', 'Avant la réserve', 'Dix ans après'], ['Poissons comptés', avant, apres], ['Espèces observées', 14, 31]]),
          questions: [
            nombre('Par combien le nombre de poissons a-t-il été multiplié ?', apres / avant),
            choix('Le nombre d\'espèces observées :', 'a plus que doublé', 'a diminué', 'est resté le même'),
            choix('Les pêcheurs voisins y gagnent aussi, car :', 'les poissons nés dans la réserve en sortent et repeuplent les alentours', 'ils peuvent pêcher dans la réserve', 'les poissons deviennent plus faciles à attraper'),
          ],
          correction: [`${apres} ÷ ${avant} = <strong>${apres / avant}</strong> : il y a ${apres / avant} fois plus de poissons.`, '14 espèces puis 31 : la biodiversité a <strong>plus que doublé</strong>.', 'Une réserve sert de <strong>réservoir</strong> : les poissons s\'y reproduisent puis colonisent les zones voisines.'],
        };
      },
    ], ['Divise la valeur finale par la valeur de départ.', 'Compare les deux colonnes du tableau.', 'Une zone protégée profite aussi à ses alentours.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La biodiversité, c\'est la diversité :', choix: ['des écosystèmes, des espèces et des individus', 'des paysages uniquement', 'des animaux uniquement', 'des climats'], correct: 0, explication: 'Trois niveaux : écosystèmes, espèces, individus.' },
    { type: 'qcm', question: 'Le frelon asiatique en France est :', choix: ['une espèce exotique envahissante', 'une espèce locale', 'une espèce protégée', 'une espèce disparue'], correct: 0, explication: 'Introduit par le commerce, il prolifère et nuit aux abeilles.' },
    { type: 'vrai_faux', question: "L'acidification des océans est due au dioxyde de carbone qui se dissout dans l'eau.", reponse: true, explication: 'Oui : plus de CO₂ dans l\'air, plus de CO₂ dissous, pH plus bas.' },
    { type: 'qcm', question: 'Avec le réchauffement, l\'aire de répartition de nombreuses espèces se déplace :', choix: ['vers les pôles et en altitude', 'vers l\'équateur', 'vers les villes', 'vers le fond des océans'], correct: 0, explication: 'Elles suivent les températures qui leur conviennent.' },
    { type: 'qcm', question: 'Pour lutter contre la surpêche, on peut :', choix: ['fixer des quotas', 'utiliser des filets plus fins', 'pêcher toute l\'année', 'introduire de nouvelles espèces'], correct: 0, explication: 'Les quotas laissent aux populations le temps de se renouveler.' },
    { type: 'vrai_faux', question: 'Une réserve naturelle est une aire protégée.', reponse: true, explication: 'Les activités humaines y sont limitées pour préserver la biodiversité.' },
  ],
};
