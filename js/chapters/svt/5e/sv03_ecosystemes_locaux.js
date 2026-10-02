// =====================================================================
//  sv03_ecosystemes_locaux.js — SVT 5ᵉ : les activités humaines et les
//  écosystèmes locaux. Chaînes alimentaires, pesticides, prélèvement
//  d'une ressource, solutions.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 6.
//  Les comptages des exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['un écosystème', 'Ensemble formé par un milieu de vie et les êtres vivants qui le peuplent, en relation les uns avec les autres.'],
  ['une chaîne alimentaire', "Suite d'êtres vivants dans laquelle chacun est mangé par le suivant."],
  ['un producteur', "Être vivant qui fabrique sa matière à partir d'eau, de sels minéraux, de dioxyde de carbone et de lumière : un végétal vert."],
  ['un consommateur', "Être vivant qui se nourrit d'autres êtres vivants."],
  ['un décomposeur', 'Être vivant du sol qui transforme les restes des êtres vivants en matière minérale.'],
  ['un pesticide', 'Produit qui tue des êtres vivants jugés nuisibles aux cultures : insectes, herbes, champignons.'],
  ['la lutte biologique', "Méthode qui protège les cultures en utilisant un être vivant, ennemi naturel du ravageur."],
];

/** Un maillon de la chaîne : silhouette simple et points de pesticide accumulés. */
const maillon = (x, nom, taille, points) => {
  let s = `<ellipse cx="${x}" cy="96" rx="${taille}" ry="${Math.max(16, taille * 0.7)}" class="sv-plein-doux"/><text x="${x}" y="150" text-anchor="middle" class="pc-petit">${nom}</text>`;
  for (let k = 0; k < points; k++) s += `<circle cx="${Math.round(x - taille * 0.6 + ((k * 11) % Math.round(taille * 1.2)))}" cy="${84 + ((k * 7) % 24)}" r="2.2" class="sv-point-toxique"/>`;
  return s;
};
const chaine = (n) => [['algues', 14, 1], ['petits crustacés', 18, 3], ['poissons', 26, 8], ['héron', 34, 20]]
  .map(([nom, t, p], i) => (i <= n ? maillon(40 + i * 82, nom, t, p) + (i < n ? `<path d="M${62 + i * 82} 96 h30" class="sv-trait"/><path d="M${98 + i * 82} 96 l-9 -5 v10z" class="sv-plein-accent"/>` : '') : '')).join('');
const SCENES_PESTICIDE = [
  ['Les algues', chaine(0), "Un pesticide arrive dans l'étang avec l'eau de pluie. Les algues en absorbent un peu."],
  ['Les crustacés', chaine(1), "Chaque petit crustacé mange beaucoup d'algues : le pesticide de toutes ces algues se retrouve dans son corps."],
  ['Les poissons', chaine(2), 'Chaque poisson mange beaucoup de crustacés : le pesticide se concentre encore.'],
  ['Le héron', chaine(3), "Au bout de la chaîne, le héron accumule le pesticide de tous les poissons qu'il a mangés : c'est lui le plus contaminé."],
];

const CHAINES = [
  ['feuilles de chêne', 'chenille', 'mésange', 'épervier'],
  ['herbe', 'criquet', 'grenouille', 'couleuvre'],
  ['algues', 'petits crustacés', 'gardon', 'brochet'],
  ['blé', 'campagnol', 'renard'],
];

export default {
  id: 'sv03',
  titre: 'Les activités humaines et les écosystèmes locaux',
  theme: 'svt_terre', niveau: '5e',
  icone: '🌾',

  intro:
    "Un champ, une haie, une mare : autour de nous, chaque milieu abrite des êtres vivants qui dépendent les uns des autres. " +
    "Quand on traite un champ ou qu'on coupe une forêt, on touche à tout cet ensemble. On apprend à <strong>prévoir ces effets</strong> et à connaître des solutions qui les limitent.",

  cours: [
    {
      type: 'definition', titre: 'Un écosystème',
      contenu: "Un <strong>écosystème</strong> réunit un milieu de vie (sol, eau, lumière, température) et tous les êtres vivants qui le peuplent. Ces êtres vivants sont liés, notamment par leur alimentation.",
    },
    {
      type: 'definition', titre: 'Les chaînes alimentaires',
      contenu: "Une <strong>chaîne alimentaire</strong> commence toujours par un végétal vert, le <strong>producteur</strong>. Viennent ensuite des <strong>consommateurs</strong> : un animal végétarien, puis des carnivores. Dans le sol, les <strong>décomposeurs</strong> (vers de terre, champignons, bactéries) transforment les restes en matière minérale, réutilisée par les végétaux. " +
        "Dans une chaîne, la flèche signifie « est mangé par ».",
    },
    {
      type: 'propriete', titre: "L'effet des pesticides",
      contenu: "Un <strong>pesticide</strong> ne tue pas que le ravageur visé : il touche aussi des insectes utiles, comme les abeilles qui pollinisent les fleurs. De plus, il passe d'un maillon à l'autre de la chaîne alimentaire et s'y <strong>concentre</strong> : les derniers consommateurs sont les plus contaminés.",
    },
    { type: 'figure', titre: 'Un pesticide le long de la chaîne', contenu: 'Suis le pesticide (points rouges) de maillon en maillon.', render: (host) => etapes(host, 'Maillon', SCENES_PESTICIDE, { vb: '0 0 320 170' }) },
    {
      type: 'propriete', titre: 'Prélever une ressource',
      contenu: "Couper du bois, pêcher, pomper de l'eau : tout prélèvement modifie l'écosystème. S'il est plus rapide que le renouvellement de la ressource, celle-ci s'épuise et les espèces qui en dépendent reculent.",
    },
    {
      type: 'propriete', titre: 'Des solutions',
      contenu: "La <strong>lutte biologique</strong> remplace un pesticide par un ennemi naturel du ravageur (des coccinelles contre les pucerons). Les <strong>haies</strong> et les bandes fleuries abritent ces animaux utiles. Une <strong>gestion durable</strong> consiste à ne pas prélever plus que ce qui se renouvelle.",
    },
    {
      type: 'exemple', enonce: "Dans un champ : blé → campagnol → renard. On élimine les renards. Que devient le champ ?",
      solution_etapes: ['Sans renards, les campagnols ne sont plus mangés : ils deviennent plus nombreux.', 'Plus nombreux, ils mangent davantage de blé.', "La récolte diminue : supprimer un maillon a des conséquences sur toute la chaîne."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Écrire la chaîne alimentaire', explication: "Commence par le végétal ; la flèche signifie « est mangé par »." },
    { etape: 2, titre: 'Repérer le maillon touché', explication: "Quel être vivant est supprimé, ajouté ou contaminé ?" },
    { etape: 3, titre: 'Remonter et descendre la chaîne', explication: "Ses proies deviennent plus nombreuses ; ses prédateurs manquent de nourriture." },
    { etape: 4, titre: 'Conclure', explication: "Explique l'effet sur l'ensemble de l'écosystème, puis propose une solution." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Un producteur est un végétal vert.', 'Un consommateur mange d\'autres êtres vivants.', 'Les décomposeurs vivent surtout dans le sol.']),

    {
      id: 'e02', niveau: 1, type: 'ordonner_etapes', consigne: 'Reconstitue la chaîne alimentaire, du premier au dernier maillon :',
      generer() { return { etapes: pick(CHAINES) }; },
      indices: ['Une chaîne commence par un végétal.', 'Puis vient l\'animal qui mange ce végétal.', 'Le dernier maillon n\'est mangé par personne dans cette chaîne.'],
      correction_detaillee: (st) => `<p>${st.etapes.join(' → ')}</p><p>La flèche signifie « est mangé par ». Le premier maillon, <strong>${st.etapes[0]}</strong>, est le producteur.</p>`,
    },

    exoClasser('e03', 1, 'Producteur, consommateur ou décomposeur ?', [
      ['le chêne', 'producteur'], ["l'herbe", 'producteur'], ['les algues vertes', 'producteur'],
      ['la chenille', 'consommateur'], ['la mésange', 'consommateur'], ['le renard', 'consommateur'], ['le brochet', 'consommateur'],
      ['le ver de terre', 'décomposeur'], ['les champignons du sol', 'décomposeur'], ['les bactéries du sol', 'décomposeur'],
    ], ['producteur', 'consommateur', 'décomposeur'], { producteur: 'Les végétaux verts fabriquent leur propre matière.', consommateur: "Ces animaux se nourrissent d'autres êtres vivants.", décomposeur: 'Ces êtres vivants transforment les restes en matière minérale.' },
    ['Tous les végétaux verts sont des producteurs.', 'Un animal qui mange est un consommateur.', 'Les décomposeurs recyclent les feuilles mortes et les cadavres.']),

    exoVraiFaux('e04', 1, [
      ['Une chaîne alimentaire commence par un végétal vert.', true, 'Oui : lui seul fabrique sa matière à partir de matière minérale.'],
      ['Un pesticide ne tue que l\'espèce visée.', false, 'Non : il touche aussi des espèces utiles, comme les abeilles.'],
      ['Dans une chaîne alimentaire, la flèche signifie « mange ».', false, 'Non : elle signifie « est mangé par ».'],
      ['Les derniers consommateurs d\'une chaîne sont les plus contaminés par un pesticide.', true, 'Oui : le produit se concentre de maillon en maillon.'],
      ['Supprimer une espèce n\'a d\'effet que sur cette espèce.', false, 'Non : ses proies et ses prédateurs sont touchés à leur tour.'],
      ['Les coccinelles peuvent protéger une culture des pucerons.', true, 'Oui : c\'est un exemple de lutte biologique.'],
      ['Les vers de terre participent à la décomposition des feuilles mortes.', true, 'Oui : ce sont des décomposeurs.'],
    ], ['Tout commence par un producteur.', 'Les êtres vivants d\'un écosystème sont liés.', 'Le pesticide suit la chaîne alimentaire.']),

    exoDocument('e05', 2, 'Analyse ces mesures.', [
      () => {
        const base = pick([2, 3, 5]), k = 10;
        const v = [base, base * k, base * k * k];
        return {
          enonce: "Mesures inventées pour l'exercice. Dans un lac proche de champs traités, on mesure la quantité d'un pesticide dans un kilogramme d'êtres vivants." +
            tableau([['Être vivant', 'algues', 'petits poissons', 'oiseaux pêcheurs'], ['Pesticide (unités par kg)', ...v]]),
          questions: [
            nombre('Par combien la quantité de pesticide est-elle multipliée entre les algues et les petits poissons ?', k),
            choix('Quel être vivant est le plus contaminé ?', 'les oiseaux pêcheurs', 'les algues', 'les petits poissons'),
            choix('Comment l\'expliquer ?', 'le pesticide se concentre à chaque maillon de la chaîne alimentaire', 'les oiseaux boivent plus d\'eau', 'les algues éliminent le pesticide'),
          ],
          correction: [`${v[1]} ÷ ${v[0]} = <strong>${k}</strong> fois plus.`, `Les <strong>oiseaux pêcheurs</strong> : ${v[2]} unités par kilogramme.`, "Chaque consommateur mange beaucoup d'êtres vivants du maillon précédent : le pesticide <strong>se concentre</strong> le long de la chaîne."],
        };
      },
    ], ['Divise la deuxième valeur par la première.', 'Compare les trois valeurs.', 'Qui mange qui ?']),

    exoDocument('e06', 2, 'Compare deux méthodes.', [
      () => {
        const avant = randInt(8, 12) * 100, apres = randInt(1, 3) * 100;
        return {
          enonce: "Comptages inventés pour l'exercice. Dans une serre, des pucerons attaquent des rosiers. On y lâche des larves de coccinelles, qui se nourrissent de pucerons." +
            tableau([['', 'Avant le lâcher', 'Trois semaines après'], ['Pucerons comptés sur dix rosiers', avant, apres]]),
          visuel: (host) => { host.innerHTML = schemaBarres([['avant', avant], ['après', apres]], { unite: 'pucerons' }); },
          questions: [
            nombre('De combien le nombre de pucerons a-t-il diminué ?', avant - apres),
            choix('Cette méthode s\'appelle :', 'la lutte biologique', 'un traitement par pesticide', 'la gestion durable de la forêt'),
            choix('Son avantage est qu\'elle :', 'ne contamine pas la chaîne alimentaire', 'tue tous les insectes de la serre', 'agit en une heure'),
          ],
          correction: [`${avant} − ${apres} = <strong>${avant - apres} pucerons</strong> de moins.`, "On utilise un ennemi naturel du ravageur : c'est la <strong>lutte biologique</strong>.", "Aucun produit toxique n'est répandu : les autres êtres vivants <strong>ne sont pas contaminés</strong>."],
        };
      },
    ], ['Soustrais les deux comptages.', 'La coccinelle est un être vivant.', 'Un pesticide se retrouve dans la chaîne alimentaire, pas une coccinelle.']),

    exoClasser('e07', 2, 'Cette pratique est-elle favorable ou défavorable à la biodiversité locale ?', [
      ['planter une haie entre deux champs', 'favorable'], ['semer une bande de fleurs au bord du champ', 'favorable'], ['lâcher des coccinelles contre les pucerons', 'favorable'], ['laisser un tas de bois mort au fond du jardin', 'favorable'], ['replanter un arbre pour chaque arbre coupé', 'favorable'],
      ['pulvériser un insecticide sur des arbres en fleurs', 'défavorable'], ['arracher toutes les haies', 'défavorable'], ['combler une mare', 'défavorable'], ['couper une forêt sans replanter', 'défavorable'],
    ], ['favorable', 'défavorable'], { favorable: 'Ces pratiques offrent abri et nourriture aux êtres vivants.', défavorable: 'Ces pratiques détruisent un milieu de vie ou ses habitants.' },
    ['Une haie abrite des oiseaux et des insectes utiles.', 'Les abeilles butinent les fleurs.', 'Un milieu détruit, ce sont des habitants en moins.']),

    exoSituation('e08', 2, 'Prévois la conséquence.', [
      ["Chaîne : herbe → criquet → grenouille → couleuvre. Un insecticide élimine presque tous les criquets. Que deviennent les grenouilles ?", 'Elles manquent de nourriture : leur nombre diminue.', 'Elles deviennent plus nombreuses.', 'Rien ne change pour elles.'],
      ["Chaîne : feuilles de chêne → chenille → mésange. Les mésanges disparaissent d'un bois. Que deviennent les chenilles ?", "Elles ne sont plus mangées : elles deviennent plus nombreuses.", 'Elles disparaissent aussi.', 'Elles changent de nourriture.'],
      ["Chaîne : algues → petits crustacés → gardon → brochet. On pêche tous les brochets d'un étang. Que deviennent les gardons, dans un premier temps ?", 'Ils deviennent plus nombreux.', 'Ils disparaissent.', 'Ils mangent les brochets restants.'],
      ["Des abeilles meurent à cause d'un insecticide répandu sur un verger en fleurs. Quelle conséquence pour le verger ?", 'Moins de fleurs sont pollinisées : il y aura moins de fruits.', 'Les arbres donneront plus de fruits.', 'Les fleurs deviendront plus grandes.'],
    ], ['Écris la chaîne et repère le maillon touché.', 'Moins de prédateurs : plus de proies.', 'Moins de proies : les prédateurs manquent de nourriture.'], 'Dans un écosystème, toucher un maillon se répercute sur les autres.'),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Cette forêt est-elle gérée durablement ? Calcule :',
      generer() {
        const arbres = pick([3000, 6000, 9000]), coupe = pick([150, 200, 300]), pousse = pick([50, 100]);
        return { enonce: `Situation inventée pour l'exercice. Une forêt compte ${arbres} arbres. Chaque année, on en coupe ${coupe} et il en pousse ${pousse} nouveaux. À ce rythme, au bout de combien d'années n'y aura-t-il plus d'arbres ?`, reponse: arbres / (coupe - pousse), validation: 'nombre', unite: 'ans', _v: { arbres, coupe, pousse } };
      },
      indices: ['Calcule d\'abord combien d\'arbres la forêt perd chaque année.', 'Perte annuelle = arbres coupés − arbres qui poussent.', 'Divise le nombre d\'arbres par cette perte annuelle.'],
      correction_etapes: (st) => [`Chaque année, la forêt perd ${st._v.coupe} − ${st._v.pousse} = ${st._v.coupe - st._v.pousse} arbres.`, `${st._v.arbres} ÷ ${st._v.coupe - st._v.pousse} = <strong>${st._v.arbres / (st._v.coupe - st._v.pousse)} ans</strong>.`, 'On prélève plus que ce qui se renouvelle : ce n\'est pas une gestion durable.'],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le premier maillon d\'une chaîne alimentaire est toujours :', choix: ['un végétal vert', 'un carnivore', 'un décomposeur', 'un insecte'], correct: 0, explication: 'Le producteur fabrique sa propre matière.' },
    { type: 'qcm', question: 'Dans « herbe → criquet → grenouille », la flèche signifie :', choix: ['est mangé par', 'mange', 'vit avec', 'ressemble à'], correct: 0, explication: 'L\'herbe est mangée par le criquet.' },
    { type: 'vrai_faux', question: 'Un pesticide peut tuer des insectes utiles comme les abeilles.', reponse: true, explication: 'Il n\'agit pas seulement sur le ravageur visé.' },
    { type: 'qcm', question: 'Le pesticide est le plus concentré chez :', choix: ['le dernier consommateur de la chaîne', 'le producteur', 'le premier consommateur', 'les décomposeurs uniquement'], correct: 0, explication: 'Il se concentre de maillon en maillon.' },
    { type: 'qcm', question: 'Utiliser des coccinelles contre les pucerons, c\'est :', choix: ['de la lutte biologique', 'un traitement chimique', 'de la surpêche', 'une pollution'], correct: 0, explication: 'On emploie un ennemi naturel du ravageur.' },
    { type: 'vrai_faux', question: 'Gérer durablement une forêt, c\'est ne pas couper plus d\'arbres qu\'il n\'en pousse.', reponse: true, explication: 'Le prélèvement ne doit pas dépasser le renouvellement.' },
  ],
};
