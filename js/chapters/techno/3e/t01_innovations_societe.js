// =====================================================================
//  t01_innovations_societe.js — Technologie 3ᵉ : sciences, innovations et société.
//  Repères de 3ᵉ du programme de 2024 : identifier les innovations de
//  rupture, relier une découverte scientifique à ses développements
//  technologiques, exprimer dans un argumentaire court l'incidence d'un
//  objet sur la société et celle des contraintes sociétales sur les objets.
//  Valeur réelle citée : la découverte de l'effet photovoltaïque (sources.js).
//  Les tableaux chiffrés sont des données d'exercice.
// =====================================================================

import { exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { schemaLignee, schemaBloc } from '../figures.js';

const ECLAIRAGE = [{ nom: 'bougie', principe: 'flamme' }, { nom: 'lampe|à pétrole', principe: 'flamme' }, { nom: 'lampe à|incandescence', principe: 'filament' }, { nom: 'lampe|à LED', principe: 'diode' }];

const DEFINITIONS = [
  ['une invention', "Création d'un objet ou d'un procédé qui n'existait pas auparavant."],
  ['une innovation', "Nouveauté qui se diffuse : elle est adoptée par les utilisateurs et change leurs habitudes."],
  ['une innovation de rupture', "Innovation qui repose sur un principe technique nouveau et bouleverse les usages, au point de remplacer les solutions précédentes."],
  ["une innovation d'amélioration", "Innovation qui perfectionne un objet existant sans changer son principe technique."],
  ["une famille d'objets", 'Ensemble des objets qui répondent au même besoin.'],
  ["une lignée d'objets", "Suite d'objets d'une même famille qui reposent sur le même principe technique et se perfectionnent au fil du temps."],
  ['un principe technique', "Phénomène ou solution sur lequel un objet s'appuie pour assurer une fonction technique."],
  ['une contrainte sociétale', "Exigence imposée à un objet par la société : loi, norme, sécurité, protection de l'environnement, attentes des utilisateurs."],
];

const lampes = tableau([['Lampe', 'à incandescence', 'fluocompacte', 'à LED'], ['Principe technique', 'filament chauffé', 'gaz excité', 'semi-conducteur'], ['Puissance pour le même éclairage (W)', 60, 15, 8], ['Durée de vie (heures)', '1 000', '8 000', '20 000']]);

export default {
  id: 't01',
  titre: 'Sciences, innovations et société',
  theme: 'tk_usages', niveau: '3e',
  icone: '💡',

  intro:
    "Un objet technique n'apparaît jamais par hasard. Il naît d'un <strong>besoin</strong>, s'appuie sur des <strong>découvertes scientifiques</strong> et se transforme sous la pression de la société. " +
    "En 3ᵉ, tu apprends à expliquer ces liens en quelques phrases construites : c'est un argumentaire.",

  cours: [
    {
      type: 'definition', titre: 'Invention et innovation',
      contenu: "Une <strong>invention</strong> est une création nouvelle. Elle devient une <strong>innovation</strong> quand elle se diffuse et qu'elle est adoptée. Une <strong>innovation de rupture</strong> introduit un principe technique nouveau et bouleverse les usages. Une <strong>innovation d'amélioration</strong> perfectionne un objet sans changer son principe.",
    },
    {
      type: 'definition', titre: 'Famille et lignée',
      contenu: "Les objets qui répondent au même besoin forment une <strong>famille</strong> : la bougie, la lampe à incandescence et la lampe à LED sont de la famille « s'éclairer ». Dans une famille, les objets qui partagent le même <strong>principe technique</strong> forment une <strong>lignée</strong>. Changer de principe, c'est ouvrir une nouvelle lignée : c'est souvent une innovation de rupture.",
    },
    {
      type: 'figure', titre: "La famille « s'éclairer »",
      contenu: 'Une couleur par principe technique, donc par lignée. Chaque changement de principe est une rupture.',
      render: (host) => { host.innerHTML = schemaLignee(ECLAIRAGE, { label: "Évolution des objets d'éclairage" }); },
    },
    {
      type: 'propriete', titre: 'De la découverte scientifique à l\'objet',
      contenu: "Une découverte scientifique décrit un phénomène ; la technologie en fait un objet utile. L'<strong>effet photovoltaïque</strong>, la production d'un courant électrique par un matériau éclairé, a été découvert par Edmond Becquerel en 1839. Il a fallu plus d'un siècle de recherches pour qu'il donne les panneaux solaires. Le développement technologique transforme ensuite la société : ici, la façon de produire l'électricité.",
    },
    {
      type: 'figure', titre: 'De la science à la société',
      contenu: "L'exemple de l'effet photovoltaïque, de la découverte aux usages.",
      render: (host) => { host.innerHTML = schemaBloc({ blocs: [{ nom: 'effet photovoltaïque', role: 'découverte scientifique' }, { nom: 'cellule puis panneau solaire', role: 'développement technologique' }, { nom: 'électricité produite sur place', role: 'effet sur la société' }], flux: ['', 'un phénomène compris', 'un objet fabriqué'], label: 'De la découverte scientifique aux usages' }); },
    },
    {
      type: 'propriete', titre: 'La société transforme aussi les objets',
      contenu: "Les objets évoluent sous l'effet de <strong>contraintes sociétales</strong> : une loi, une norme de sécurité, la protection de l'environnement, le prix de l'énergie, les attentes des utilisateurs. Ces contraintes expliquent beaucoup d'évolutions : des appareils plus sobres, plus sûrs, plus faciles à réparer.",
    },
    {
      type: 'propriete', titre: 'Avantages et inconvénients',
      contenu: "Une évolution technologique apporte des <strong>avantages</strong> (gain de temps, de confort, de sécurité) et des <strong>inconvénients</strong> (consommation de ressources, déchets, dépendance, atteinte à la vie privée). Un argumentaire honnête présente les deux.",
    },
    {
      type: 'exemple', enonce: "Rédige un argumentaire court sur l'incidence du smartphone sur la société.",
      solution_etapes: ["<strong>J'affirme</strong> : le smartphone a transformé la façon de communiquer et de s'informer.", "<strong>Je justifie</strong> : il réunit dans un seul objet le téléphone, l'appareil photo, le plan et l'accès à Internet.", "<strong>Je nuance</strong> : sa fabrication consomme des métaux rares, et il collecte des données personnelles.", '<strong>Je conclus</strong> : son usage doit donc être raisonné et sa durée de vie allongée.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Affirmer', explication: "Commence par une phrase qui répond à la question : « Cet objet a modifié… »." },
    { etape: 2, titre: 'Justifier par un fait', explication: 'Appuie-toi sur un document ou sur une connaissance : une fonction nouvelle, une valeur, un usage.' },
    { etape: 3, titre: 'Nuancer', explication: 'Donne un inconvénient ou une limite : ressources, déchets, coût, vie privée.' },
    { etape: 4, titre: 'Conclure', explication: 'Termine par une phrase qui relie les deux : un choix, une précaution, une évolution souhaitable.' },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Invention : création. Innovation : diffusion.', 'Famille : même besoin.', 'Lignée : même principe technique.']),

    exoVraiFaux('e02', 1, [
      ['Toute invention devient une innovation.', false, "Non : une invention ne devient une innovation que si elle se diffuse et qu'elle est adoptée."],
      ["Une innovation de rupture change le principe technique d'un objet.", true, 'Oui : elle ouvre une nouvelle lignée.'],
      ['La bougie et la lampe à LED appartiennent à la même famille.', true, "Oui : elles répondent au même besoin, s'éclairer."],
      ['La bougie et la lampe à LED appartiennent à la même lignée.', false, 'Non : leur principe technique est différent (une flamme, un semi-conducteur).'],
      ["L'effet photovoltaïque a été découvert bien avant l'apparition des panneaux solaires.", true, 'Oui : il a été découvert en 1839 par Edmond Becquerel.'],
      ["Une loi peut obliger les fabricants à faire évoluer un objet.", true, "Oui : c'est une contrainte sociétale."],
      ["Une évolution technologique n'a que des avantages.", false, 'Non : elle a aussi des inconvénients (ressources, déchets, dépendance).'],
    ], ['Invention ou innovation ?', 'Famille : le besoin. Lignée : le principe.', 'Pense aux avantages et aux inconvénients.']),

    exoClasser('e03', 1, "Innovation de rupture ou innovation d'amélioration ?", [
      ['le passage de la bougie à la lampe électrique', 'rupture'], ['le passage du téléphone fixe au téléphone mobile', 'rupture'], ["le passage de l'appareil photo à pellicule à l'appareil photo numérique", 'rupture'], ['le passage du cheval à la locomotive', 'rupture'],
      ["un smartphone dont l'écran est plus grand que le modèle précédent", 'amélioration'], ['une batterie de vélo électrique de plus grande autonomie', 'amélioration'], ['une lampe à LED qui consomme un peu moins que la précédente', 'amélioration'], ['une voiture dont les freins sont plus efficaces', 'amélioration'],
    ], ['rupture', 'amélioration'], { rupture: 'Le principe technique change et les usages sont bouleversés.', amélioration: 'Le principe technique reste le même : l\'objet est perfectionné.' },
    ['Le principe technique change-t-il ?', 'Même objet, en mieux : amélioration.', 'Nouveau principe : rupture.'], 4),

    exoRelier('e04', 2, 'Associe chaque découverte scientifique à un développement technologique.', [
      ["l'effet photovoltaïque", 'le panneau solaire'], ['les ondes radio', 'la radio et le Wi-Fi'], ['les rayons X', 'la radiographie'], ["l'induction électromagnétique", "l'alternateur et la génératrice"], ['la lumière laser', 'la fibre optique et le lecteur de code-barres'],
    ], ['Quel phénomène l\'objet utilise-t-il ?', 'Photovoltaïque : lumière et électricité.', 'Induction : un aimant qui tourne près d\'une bobine.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Écouter de la musique : classe ces objets du plus ancien au plus récent.", etapes: ['Disque vinyle', 'Cassette audio', 'Disque compact (CD)', 'Baladeur MP3', 'Écoute en ligne sur smartphone'], note: 'Le passage au numérique (CD), puis à la musique sans support (MP3, écoute en ligne), sont des ruptures.' },
      { consigne: 'Téléphoner : classe ces objets du plus ancien au plus récent.', etapes: ['Téléphone fixe à cadran', 'Téléphone fixe à touches', 'Téléphone mobile à clavier', 'Smartphone à écran tactile'], note: 'Le téléphone mobile, sans fil, est une innovation de rupture.' },
      { consigne: "S'éclairer : classe ces objets du plus ancien au plus récent.", etapes: ['Bougie', 'Lampe à pétrole', 'Lampe à incandescence', 'Lampe fluocompacte', 'Lampe à LED'], note: 'Chaque changement de principe technique ouvre une nouvelle lignée.' },
    ], ['Pense à ce que tes grands-parents utilisaient.', 'Le numérique arrive après l\'analogique.', 'Le plus récent est souvent le plus sobre.']),

    exoSituation('e06', 2, 'Quelle contrainte sociétale explique cette évolution ?', [
      ['Les chargeurs de téléphone doivent désormais utiliser le même connecteur.', 'une réglementation, pour réduire les déchets', 'une mode', 'une découverte scientifique'],
      ['Les trottinettes électriques sont équipées de feux et d\'un avertisseur sonore.', 'la sécurité des usagers', 'le prix de l\'énergie', 'la propriété intellectuelle'],
      ['Les fabricants affichent une note de réparabilité sur certains appareils.', "la protection de l'environnement, par l'allongement de la durée de vie", 'la vitesse de calcul', 'le confort visuel'],
      ["Les lampes à incandescence ont été retirées de la vente.", "la réduction de la consommation d'énergie", 'la sécurité routière', 'le respect de la vie privée'],
      ['Les jouets portent un marquage qui atteste qu\'ils respectent des exigences de sécurité.', 'une norme de sécurité', 'une innovation de rupture', 'une lignée d\'objets'],
    ], ['Qui impose cette évolution : la loi, la sécurité, l\'environnement ?', 'Une contrainte vient de la société, pas de la technique.', 'Cherche ce que l\'on veut protéger.'], 'Une contrainte sociétale vient de la société : loi, norme, sécurité, environnement, attentes des utilisateurs.'),

    exoDocument('e07', 2, "Étudie l'évolution d'une famille d'objets.", [
      () => ({
        enonce: "Trois lampes fournissent le même éclairage (données d'exercice)." + lampes,
        questions: [
          nombre('Combien de principes techniques différents ce tableau présente-t-il ?', 3),
          nombre('Combien de fois la lampe à LED dure-t-elle plus longtemps que la lampe à incandescence ?', 20),
          choix('La lampe à LED consomme, pour le même éclairage :', 'environ 7 fois moins que la lampe à incandescence', 'autant que la lampe à incandescence', '2 fois plus que la lampe fluocompacte'),
          choix('Le passage de la lampe à incandescence à la lampe à LED est :', 'une innovation de rupture', "une innovation d'amélioration", 'une invention sans innovation'),
        ],
        correction: ['Filament chauffé, gaz excité, semi-conducteur : <strong>trois principes</strong>, donc trois lignées.', '$20\\,000 \\div 1\\,000 = 20$ : elle dure <strong>20 fois plus longtemps</strong>.', '$60 \\div 8 = 7{,}5$ : elle consomme environ <strong>7 fois moins</strong>.', 'Le principe technique change : c\'est une <strong>rupture</strong>.'],
      }),
    ], ['Lis la ligne « principe technique ».', 'Divise les durées de vie.', 'Nouveau principe : nouvelle lignée.']),

    exoDocument('e08', 3, 'Construis un argumentaire.', [
      () => ({
        enonce: "Sujet : « Montre en quelques phrases que le vélo à assistance électrique a une incidence sur la société. » Voici quatre phrases : (a) Sa batterie contient des métaux dont l'extraction pollue. (b) Le vélo à assistance électrique modifie les déplacements du quotidien. (c) Il faut donc allonger la durée de vie des batteries et les recycler. (d) Il permet de parcourir sans fatigue des trajets que l'on faisait en voiture.",
        questions: [
          choix("Quelle phrase sert d'affirmation de départ ?", 'la phrase (b)', 'la phrase (a)', 'la phrase (c)'),
          choix('Quelle phrase justifie cette affirmation par un fait ?', 'la phrase (d)', 'la phrase (c)', 'la phrase (b)'),
          choix('Quelle phrase apporte une nuance ?', 'la phrase (a)', 'la phrase (d)', 'la phrase (b)'),
          choix('Dans quel ordre faut-il les écrire ?', '(b), (d), (a), (c)', '(a), (b), (c), (d)', '(c), (a), (d), (b)'),
        ],
        correction: ["On commence par <strong>affirmer</strong> : (b).", 'On <strong>justifie</strong> par un fait : (d).', 'On <strong>nuance</strong> avec un inconvénient : (a).', 'On <strong>conclut</strong> : (c). L\'ordre est (b), (d), (a), (c).'],
      }),
    ], ['Un argumentaire commence par une affirmation.', 'La conclusion contient souvent « donc ».', 'Affirmer, justifier, nuancer, conclure.']),

    exoDocument('e09', 3, 'Relie science, technologie et société.', [
      () => ({
        enonce: "Edmond Becquerel découvre l'effet photovoltaïque en 1839 : un matériau éclairé peut produire un courant électrique. Plus d'un siècle plus tard, les ingénieurs savent fabriquer des cellules en silicium. Aujourd'hui, des panneaux solaires équipent des toits, des calculatrices et des satellites.",
        questions: [
          choix('Dans ce texte, la découverte scientifique est :', "l'effet photovoltaïque", 'le panneau solaire', 'le satellite'),
          choix('Le développement technologique est :', 'la fabrication de cellules puis de panneaux solaires', "la lumière du Soleil", 'le courant électrique'),
          choix('Quel effet sur la société peut-on citer ?', "produire de l'électricité sans combustible, là où on en a besoin", 'supprimer tout besoin en électricité', 'rendre la lumière du Soleil plus intense'),
          choix('Ce texte montre que :', 'une découverte peut mettre longtemps avant de devenir un objet courant', 'une découverte devient un objet en quelques jours', "la science et la technologie n'ont aucun lien"),
        ],
        correction: ["La <strong>découverte</strong> décrit un phénomène : l'effet photovoltaïque.", 'Le <strong>développement technologique</strong> en fait un objet : la cellule, puis le panneau.', "L'<strong>effet sur la société</strong> : une électricité produite sur place, sans combustible.", 'Entre la découverte (1839) et les panneaux courants, il s\'écoule <strong>plus d\'un siècle</strong>.'],
      }),
    ], ['La science décrit un phénomène.', 'La technologie fabrique un objet.', 'La société change ses usages.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Une innovation est :', choix: ['une nouveauté adoptée par les utilisateurs', 'une découverte scientifique', "un objet que personne n'utilise", 'une loi'], correct: 0, explication: "Une invention devient une innovation quand elle se diffuse." },
    { type: 'qcm', question: 'Deux objets de la même lignée ont :', choix: ['le même principe technique', 'le même prix', 'la même couleur', 'le même fabricant'], correct: 0, explication: 'Une lignée regroupe les objets d\'une famille qui partagent un principe technique.' },
    { type: 'vrai_faux', question: 'Une innovation de rupture bouleverse les usages.', reponse: true, explication: 'Elle introduit un principe technique nouveau.' },
    { type: 'qcm', question: 'Laquelle de ces propositions est une contrainte sociétale ?', choix: ['une norme de sécurité', 'la couleur d\'un bouton', "le nombre de dents d'un engrenage", 'la tension d\'une pile'], correct: 0, explication: 'Elle est imposée à l\'objet par la société.' },
    { type: 'qcm', question: 'Dans quel ordre construit-on un argumentaire court ?', choix: ['affirmer, justifier, nuancer, conclure', 'conclure, nuancer, affirmer, justifier', 'justifier, conclure, affirmer, nuancer', 'nuancer, affirmer, conclure, justifier'], correct: 0, explication: 'On affirme, puis on prouve, on nuance et on conclut.' },
    { type: 'vrai_faux', question: "L'effet photovoltaïque est à l'origine des panneaux solaires.", reponse: true, explication: 'Découvert en 1839, il a donné les cellules photovoltaïques.' },
  ],
};
