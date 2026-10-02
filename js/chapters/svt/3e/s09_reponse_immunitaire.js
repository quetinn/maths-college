// =====================================================================
//  s09_reponse_immunitaire.js — SVT 3ᵉ : la réponse immunitaire
//  adaptative. Antigènes, lymphocytes B et anticorps, lymphocytes T,
//  mémoire immunitaire, vaccination, sida.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 28.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre, arrondi } from '../outils.js';
import { tableau } from '../../commun.js';
import { vaccination, schemaCourbe } from '../figures.js';

const DEFINITIONS = [
  ['un antigène', "Élément étranger à l'organisme (molécule portée par un microbe, par exemple) qui déclenche une réponse immunitaire."],
  ['un anticorps', "Molécule fabriquée par des lymphocytes B, qui se fixe sur un antigène précis et le neutralise."],
  ['un lymphocyte B', 'Globule blanc qui, une fois activé, fabrique des anticorps.'],
  ['un lymphocyte T', 'Globule blanc qui détruit, par contact, les cellules infectées par un virus.'],
  ['une cellule mémoire', "Lymphocyte qui garde le souvenir d'un antigène et permet une réponse plus rapide lors d'un nouveau contact."],
  ['un vaccin', "Préparation contenant un antigène rendu inoffensif, qui fait fabriquer des cellules mémoire sans rendre malade."],
  ['être séropositif', 'Avoir dans le sang des anticorps dirigés contre un microbe donné.'],
];

const SITUATIONS = [
  ["Nour a eu la varicelle à 5 ans. À 12 ans, elle côtoie un camarade qui l'a. Que se passe-t-il le plus souvent ?", 'Ses cellules mémoire déclenchent une réponse rapide : elle ne tombe pas malade.', 'Elle retombe malade exactement comme la première fois.', 'Ses anticorps contre la grippe la protègent.'],
  ['Le vaccin contre le tétanos protège-t-il contre la rougeole ?', 'Non : la mémoire immunitaire est spécifique d\'un antigène.', 'Oui : un vaccin protège contre toutes les maladies.', 'Oui, mais seulement pendant un an.'],
  ["Pourquoi fait-on des rappels de vaccin ?", 'Pour entretenir le stock de cellules mémoire, qui diminue avec le temps.', 'Parce que le premier vaccin rend malade.', 'Pour détruire les anticorps restants.'],
  ['Tom est vacciné contre la rougeole. En quoi protège-t-il aussi un bébé trop jeune pour l\'être ?', 'Il ne peut pas lui transmettre le virus : la vaccination freine sa circulation.', 'Il lui donne ses anticorps en le touchant.', 'Il ne le protège en rien.'],
];

export default {
  id: 's09',
  titre: 'La réponse immunitaire adaptative',
  theme: 'svt_corps', niveau: '3e',
  icone: '💉',

  intro:
    "Quand la phagocytose ne suffit pas, l'organisme lance une seconde défense, plus lente mais <strong>ciblée</strong> : des globules blancs spécialisés, les <strong>lymphocytes</strong>, reconnaissent précisément l'intrus. " +
    "Mieux : ils s'en souviennent. C'est sur cette <strong>mémoire</strong> que repose la vaccination.",

  cours: [
    {
      type: 'definition', titre: 'Antigène et réponse adaptative',
      contenu: "Un <strong>antigène</strong> est un élément reconnu comme étranger par l'organisme : une molécule à la surface d'une bactérie ou d'un virus, par exemple. " +
        "Dans les ganglions lymphatiques, des <strong>lymphocytes</strong> reconnaissent cet antigène et se multiplient. Cette réponse met plusieurs jours à se mettre en place et ne vise que cet antigène : elle est <strong>spécifique</strong>.",
    },
    {
      type: 'propriete', titre: 'Les lymphocytes B et les anticorps',
      contenu: "Les <strong>lymphocytes B</strong> activés fabriquent des <strong>anticorps</strong>, des molécules qui circulent dans le sang et se fixent sur l'antigène qui a déclenché leur production. Les microbes ainsi neutralisés sont ensuite éliminés par phagocytose. " +
        "Une personne <strong>séropositive</strong> pour un microbe possède des anticorps contre lui : elle a été en contact avec ce microbe, ou vaccinée.",
    },
    {
      type: 'propriete', titre: 'Les lymphocytes T',
      contenu: "Un virus se cache à l'intérieur des cellules, hors de portée des anticorps. Des <strong>lymphocytes T</strong> reconnaissent les cellules infectées et les détruisent par contact, ce qui stoppe la multiplication du virus.",
    },
    {
      type: 'definition', titre: 'La mémoire immunitaire',
      contenu: "Après une première infection, des <strong>cellules mémoire</strong> persistent pendant des années. Lors d'un second contact avec le même antigène, la réponse est <strong>plus rapide et plus intense</strong> : le microbe est éliminé avant que la maladie se déclare.",
    },
    { type: 'figure', titre: 'Vacciné ou non : deux réponses', contenu: "Compare la quantité d'anticorps et de microbes dans les jours qui suivent une contamination.", render: (host) => vaccination(host) },
    {
      type: 'propriete', titre: 'La vaccination',
      contenu: "Un <strong>vaccin</strong> contient un antigène rendu inoffensif. Il déclenche une première réponse et la formation de cellules mémoire, <strong>sans provoquer la maladie</strong>. Des rappels entretiennent cette mémoire. " +
        "La vaccination protège la personne vaccinée et, en freinant la circulation du microbe, celles qui ne peuvent pas l'être : une couverture vaccinale élevée est indispensable pour interrompre la circulation d'un virus comme celui de la rougeole.",
    },
    {
      type: 'propriete', titre: 'Le sida',
      contenu: "Le <strong>VIH</strong> infecte et détruit certains lymphocytes T, indispensables au déclenchement des réponses immunitaires. Sans traitement, les défenses s'effondrent : c'est le sida, et des infections habituellement bénignes deviennent graves. " +
        "On s'en protège par le préservatif ; des traitements bloquent aujourd'hui la multiplication du virus.",
    },
    {
      type: 'exemple', enonce: "Un test sanguin montre que Malo possède des anticorps contre le virus de l'hépatite B, alors qu'il n'a jamais été malade. Comment l'expliquer ?",
      solution_etapes: ['Des anticorps contre un microbe prouvent que l\'organisme a rencontré son antigène.', "Malo n'a pas eu la maladie : il a rencontré l'antigène sous une forme inoffensive.", 'Il a été vacciné contre l\'hépatite B.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer les moments de contact', explication: "Sur un graphique d'anticorps, repère la date du premier et du second contact avec l'antigène." },
    { etape: 2, titre: 'Mesurer le délai', explication: "Combien de jours s'écoulent avant que les anticorps apparaissent ?" },
    { etape: 3, titre: 'Mesurer la quantité maximale', explication: "Lis la hauteur du sommet de la courbe après chaque contact." },
    { etape: 4, titre: 'Comparer et conclure', explication: "Second contact : délai plus court, quantité plus grande. C'est la preuve d'une mémoire immunitaire." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Antigène : ce qui déclenche. Anticorps : ce qui répond.', 'Les lymphocytes B fabriquent les anticorps.', 'Séropositif : qui possède des anticorps contre un microbe.']),

    exoVraiFaux('e02', 1, [
      ['Un anticorps se fixe sur n\'importe quel antigène.', false, 'Non : un anticorps est spécifique d\'un seul antigène.'],
      ['Les anticorps sont fabriqués par des lymphocytes B.', true, 'Oui, une fois que ceux-ci ont reconnu l\'antigène.'],
      ['Un vaccin rend malade pour apprendre à l\'organisme à se défendre.', false, 'Non : l\'antigène du vaccin est rendu inoffensif. Il déclenche la réponse sans la maladie.'],
      ['Lors d\'un second contact avec un antigène, la réponse est plus rapide.', true, 'Oui, grâce aux cellules mémoire.'],
      ['Les lymphocytes T détruisent les cellules infectées par un virus.', true, 'Oui, par contact direct.'],
      ['Le virus du sida détruit des lymphocytes.', true, 'Oui : il s\'attaque à des lymphocytes T, ce qui affaiblit toutes les défenses.'],
      ['La réponse adaptative est plus rapide que la phagocytose.', false, 'Non : la phagocytose démarre en quelques heures, la réponse adaptative en plusieurs jours.'],
      ['Se faire vacciner protège aussi les autres.', true, 'Oui : moins de personnes peuvent transmettre le microbe.'],
    ], ['Spécifique : un anticorps pour un antigène.', 'La mémoire accélère la seconde réponse.', 'Vaccin : antigène inoffensif.']),

    exoClasser('e03', 2, 'Quelle cellule réalise cette action ?', [
      ['ingère et digère les microbes', 'phagocyte'], ['agit en quelques heures, contre tous les microbes', 'phagocyte'], ['élimine les microbes recouverts d\'anticorps', 'phagocyte'],
      ['fabrique des anticorps', 'lymphocyte B'], ['produit des molécules qui circulent dans le sang', 'lymphocyte B'],
      ['détruit par contact les cellules infectées par un virus', 'lymphocyte T'], ['est la cible du virus du sida', 'lymphocyte T'],
    ], ['phagocyte', 'lymphocyte B', 'lymphocyte T'], { phagocyte: 'Défense rapide et non spécifique.', 'lymphocyte B': 'Défense spécifique, à distance, par les anticorps.', 'lymphocyte T': 'Défense spécifique, par contact avec les cellules infectées.' },
    ['La phagocytose n\'est pas spécifique.', 'B comme… anticorps dans le sang.', 'Les lymphocytes T agissent par contact.'], 4),

    exoOrdonner('e04', 2, [
      { consigne: "Remets dans l'ordre la réponse de l'organisme à un microbe inconnu :", etapes: ["Le microbe entre et se multiplie", "Des lymphocytes B reconnaissent son antigène", 'Ces lymphocytes B se multiplient', 'Ils fabriquent des anticorps spécifiques', "Les anticorps se fixent sur les microbes", 'Les microbes neutralisés sont éliminés par phagocytose'] },
      { consigne: "Remets dans l'ordre le principe de la vaccination :", etapes: ['On injecte un antigène rendu inoffensif', "L'organisme fabrique lentement des anticorps", 'Des cellules mémoire se forment et persistent', 'Plus tard, le vrai microbe entre dans l\'organisme', 'Les cellules mémoire déclenchent une réponse rapide et forte', 'Le microbe est éliminé avant la maladie'] },
    ], ['La reconnaissance vient avant la fabrication.', 'Les anticorps neutralisent, les phagocytes éliminent.', 'La mémoire sert lors du second contact.']),

    exoDocument('e05', 2, 'Compare les deux réponses.', [
      () => {
        const m1 = pick([8, 10, 12]), k = pick([5, 8, 10]), m2 = m1 * k;
        const pts = [[0, 0], [7, 0], [14, m1], [28, m1 / 2], [30, m1 / 2], [33, m2 * 0.6], [36, m2], [50, m2 * 0.8]];
        return {
          enonce: "On injecte un même antigène à une souris au jour 0, puis à nouveau au jour 30. On mesure la quantité d'anticorps dirigés contre cet antigène dans son sang (unité arbitraire).",
          visuel: (host) => { host.innerHTML = schemaCourbe(pts, { xLabel: 'jours', yLabel: "quantité d'anticorps", ymin: 0, ymax: m2 }); },
          questions: [
            nombre('Quelle quantité maximale d\'anticorps atteint-on après la première injection ?', m1, { tolerance: m2 * 0.03 }),
            nombre('Par combien cette quantité maximale est-elle multipliée après la seconde injection ?', k, { tolerance: 0.3 }),
            choix('La seconde réponse est aussi :', 'plus rapide', 'plus lente', 'de même délai'),
          ],
          correction: [`Après la première injection, le sommet de la courbe atteint <strong>${m1}</strong>.`, `Après la seconde, il atteint ${m2} : ${m2} ÷ ${m1} = <strong>${k} fois plus</strong>.`, 'Les anticorps apparaissent en 3 jours au lieu de 7 : la réponse est <strong>plus rapide</strong>. C\'est la mémoire immunitaire.'],
        };
      },
    ], ['Repère le sommet de chaque bosse de la courbe.', 'Divise le second maximum par le premier.', 'Compare le temps qui sépare chaque injection de la montée des anticorps.']),

    exoDocument('e06', 2, 'Interprète ces analyses de sang.', [
      () => {
        const noms = ['Léa', 'Malo', 'Inès', 'Sacha'];
        const etats = [['oui', 'non'], ['non', 'non'], ['oui', 'oui'], ['non', 'oui']];
        const i = pick([0, 1, 2, 3]);
        return {
          enonce: "On recherche dans le sang de quatre personnes des anticorps dirigés contre deux virus." +
            tableau([['', ...noms], ['Anticorps contre le virus de la rougeole', ...etats.map((e) => e[0])], ['Anticorps contre le virus de l\'hépatite B', ...etats.map((e) => e[1])]]),
          questions: [
            { question: `${noms[i]} est-${i % 2 ? 'il séropositif' : 'elle séropositive'} pour le virus de la rougeole ?`, choix: ['oui', 'non'], correct: etats[i][0] === 'oui' ? 0 : 1, ordre_fixe: true },
            choix('Qui n\'a rencontré aucun des deux virus et n\'est vacciné contre aucun ?', 'Malo', 'Léa', 'Inès', 'Sacha'),
            choix('Sacha n\'a jamais eu l\'hépatite B. Ses anticorps s\'expliquent par :', 'une vaccination contre l\'hépatite B', 'une rougeole ancienne', 'le hasard'),
          ],
          correction: [`Dans la colonne de ${noms[i]}, la ligne « rougeole » indique <strong>${etats[i][0]}</strong> : la présence d'anticorps définit la séropositivité.`, '<strong>Malo</strong> ne possède aucun des deux anticorps.', "Des anticorps sans maladie : l'antigène a été rencontré sous forme de <strong>vaccin</strong>."],
        };
      },
    ], ['Séropositif : qui possède les anticorps recherchés.', 'Lis le tableau colonne par colonne.', 'On fabrique des anticorps après une infection ou après un vaccin.']),

    {
      id: 'e07', niveau: 2, type: 'qcm', consigne: 'Raisonne sur cette situation.',
      generer() { const [enonce, bonne, f1, f2] = pick(SITUATIONS); return { enonce, choix: [bonne, f1, f2], correct: 0, _v: { bonne } }; },
      indices: ['La mémoire immunitaire est spécifique.', 'Les cellules mémoire permettent une réponse rapide.', 'Une personne protégée ne transmet pas le microbe.'],
      correction_etapes: (st) => [`Réponse : « ${st._v.bonne} »`, "À retenir : la mémoire immunitaire est spécifique d'un antigène, durable, et entretenue par les rappels."],
    },

    {
      id: 'e08', niveau: 3, type: 'document', consigne: 'Étudie la couverture vaccinale.',
      generer() {
        const total = pick([200, 400, 500]), pct = pick([84, 88, 90, 92, 96, 97]), vaccines = (total * pct) / 100;
        return {
          enonce: `Pour empêcher le virus de la rougeole de circuler, il faut qu'une très grande partie de la population soit vaccinée. Dans un collège de ${total} élèves, ${vaccines} sont vaccinés contre la rougeole.`,
          questions: [
            nombre('Quel est le pourcentage d\'élèves vaccinés ?', pct, { unite: '%' }),
            nombre("Combien d'élèves de ce collège ne sont pas vaccinés ?", total - vaccines),
            choix('Plus la part d\'élèves vaccinés est élevée :', 'moins le virus trouve de personnes à contaminer', 'plus le virus circule vite', 'plus les vaccinés tombent malades'),
          ],
          _v: { total, pct, vaccines },
        };
      },
      indices: ['Pourcentage = nombre de vaccinés ÷ nombre total × 100.', 'Les non-vaccinés sont ceux qui restent.', 'Un virus a besoin de personnes non protégées pour se transmettre.'],
      correction_etapes: (st) => [`${st._v.vaccines} ÷ ${st._v.total} × 100 = <strong>${st._v.pct} %</strong>.`, `${st._v.total} − ${st._v.vaccines} = <strong>${st._v.total - st._v.vaccines} élèves</strong> non vaccinés.`, 'Chaque personne vaccinée est un obstacle : le virus <strong>trouve moins de personnes à contaminer</strong> et circule moins.'],
    },

    exoDocument('e09', 3, 'Interprète cette expérience historique.', [
      () => ({
        enonce: "La toxine tétanique est un poison fabriqué par la bactérie du tétanos. L'anatoxine tétanique est cette toxine rendue inoffensive. On réalise trois expériences sur des cobayes." +
          tableau([['Cobaye', 'Jour 0', 'Jour 15', 'Résultat'], ['1', 'rien', 'toxine tétanique', 'meurt'], ['2', 'anatoxine tétanique', 'toxine tétanique', 'survit'], ['3', 'anatoxine tétanique', 'toxine diphtérique', 'meurt']]),
        questions: [
          choix('À quoi sert le cobaye 1 ?', 'de témoin : il montre que la toxine est mortelle', 'à tester un médicament', 'à rien'),
          choix('Le cobaye 2 survit car :', "l'anatoxine a fait fabriquer des cellules mémoire et des anticorps contre la toxine tétanique", "l'anatoxine a détruit la toxine dans la seringue", 'la toxine tétanique est inoffensive au jour 15'),
          choix('Le cobaye 3 montre que la protection est :', 'spécifique : elle ne vaut que contre la toxine tétanique', 'valable contre toutes les toxines', 'inefficace dans tous les cas'),
        ],
        correction: ['Sans protection, la toxine tue : le cobaye 1 est le <strong>témoin</strong>.', "L'anatoxine joue le rôle d'un <strong>vaccin</strong> : l'organisme a appris à neutraliser la toxine tétanique.", 'Protégé contre le tétanos, le cobaye 3 ne l\'est pas contre la diphtérie : l\'immunité est <strong>spécifique</strong>.'],
      }),
    ], ['Compare les cobayes 1 et 2 : une seule chose change.', "L'anatoxine est un antigène inoffensif.", 'Compare les cobayes 2 et 3 : la toxine du jour 15 n\'est pas la même.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Les anticorps sont fabriqués par :', choix: ['les lymphocytes B', 'les lymphocytes T', 'les phagocytes', 'les globules rouges'], correct: 0, explication: 'Les lymphocytes B activés produisent les anticorps.' },
    { type: 'qcm', question: 'Un vaccin contient :', choix: ['un antigène rendu inoffensif', 'des antibiotiques', 'des lymphocytes', 'le microbe dans sa forme la plus dangereuse'], correct: 0, explication: 'Il déclenche la réponse sans provoquer la maladie.' },
    { type: 'vrai_faux', question: 'Un anticorps est spécifique d\'un antigène.', reponse: true, explication: 'Il ne se fixe que sur l\'antigène qui a déclenché sa fabrication.' },
    { type: 'qcm', question: 'Lors d\'un second contact avec le même antigène, la réponse est :', choix: ['plus rapide et plus forte', 'plus lente', 'identique', 'absente'], correct: 0, explication: 'Grâce aux cellules mémoire.' },
    { type: 'qcm', question: 'Le VIH affaiblit les défenses car il détruit :', choix: ['des lymphocytes T', 'les anticorps', 'les globules rouges', 'les antigènes'], correct: 0, explication: 'Ces lymphocytes sont indispensables au déclenchement des réponses immunitaires.' },
    { type: 'vrai_faux', question: 'Les lymphocytes T détruisent les cellules infectées par un virus.', reponse: true, explication: 'Ils agissent par contact avec la cellule infectée.' },
  ],
};
