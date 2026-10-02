// =====================================================================
//  s10_aliments_nutriments.js — SVT 3ᵉ : des aliments aux nutriments.
//  Digestion chimique, enzymes, conditions d'action, absorption.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 25. Le programme
//  réserve l'étude des mécanismes moléculaires de la digestion à la 3ᵉ.
//  Les résultats d'expériences des exercices sont ceux, classiques, de la
//  digestion de l'amidon par la salive.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { enzyme, echanges } from '../figures.js';

const DEFINITIONS = [
  ['une enzyme', "Molécule produite par l'organisme, qui accélère une transformation chimique précise ; les enzymes digestives découpent les grosses molécules des aliments."],
  ['un nutriment', 'Petite molécule issue de la digestion, capable de traverser la paroi de l\'intestin.'],
  ["l'amidon", 'Très grosse molécule, formée d\'une longue chaîne de molécules de glucose ; on la trouve dans le pain, les pâtes, les pommes de terre.'],
  ['le glucose', 'Petite molécule de sucre, nutriment utilisé par toutes les cellules.'],
  ["l'eau iodée", "Réactif jaune orangé qui devient bleu foncé en présence d'amidon."],
  ['un suc digestif', 'Liquide produit par une glande digestive, qui contient des enzymes.'],
];

const tubes = (resultats) => tableau([['Tube', '1', '2', '3', '4'], ['Contenu', 'amidon + salive', 'amidon + eau', 'amidon + salive', 'amidon + salive bouillie'], ['Température', '37 °C', '37 °C', '0 °C', '37 °C'], ["Test à l'eau iodée après 20 minutes", ...resultats]]);
const RESULTATS = ['jaune : plus d\'amidon', 'bleu foncé : amidon présent', 'bleu foncé : amidon présent', 'bleu foncé : amidon présent'];

export default {
  id: 's10',
  titre: 'Des aliments aux nutriments',
  theme: 'svt_corps', niveau: '3e',
  icone: '🧪',

  intro:
    "Un morceau de pain longtemps mâché finit par prendre un goût sucré. C'est le signe qu'une transformation chimique a commencé dans ta bouche. " +
    "On descend à l'échelle des molécules pour comprendre comment les <strong>enzymes</strong> découpent les aliments en <strong>nutriments</strong> assez petits pour passer dans le sang.",

  cours: [
    {
      type: 'definition', titre: 'De grosses molécules',
      contenu: "Les aliments sont faits de grosses molécules : l'<strong>amidon</strong> (une longue chaîne de molécules de glucose), les protéines, les lipides. Elles sont trop grosses pour traverser la paroi de l'intestin.",
    },
    {
      type: 'definition', titre: 'Les enzymes',
      contenu: "Les sucs digestifs contiennent des <strong>enzymes</strong>. Chaque enzyme découpe un type précis de grosse molécule : une enzyme de la salive transforme l'amidon en sucres plus petits. À la fin de la digestion, l'amidon a donné du <strong>glucose</strong>, les protéines des acides aminés, les lipides des acides gras.",
    },
    { type: 'figure', titre: "Une enzyme à l'œuvre", contenu: "Ajoute l'enzyme et observe ce que devient la chaîne d'amidon.", render: (host) => enzyme(host) },
    {
      type: 'propriete', titre: "Les conditions d'action d'une enzyme",
      contenu: "Une enzyme agit à la <strong>température du corps</strong>, 37 °C. Le froid la ralentit fortement ; une forte chaleur la détruit. Une enzyme n'agit que sur un type de molécule : elle est <strong>spécifique</strong>.",
    },
    {
      type: 'propriete', titre: 'Mettre une digestion en évidence',
      contenu: "L'<strong>eau iodée</strong> devient bleu foncé en présence d'amidon. Si, après un moment, un mélange d'amidon et de salive ne bleuit plus, c'est que l'amidon a été digéré. Un tube sans salive sert de <strong>témoin</strong>.",
    },
    {
      type: 'figure', titre: "L'absorption des nutriments", contenu: "Les nutriments traversent la paroi de l'intestin grêle et passent dans le sang.",
      render: (host) => echanges(host, { gauche: "intérieur de l'intestin grêle", droite: 'sang', flux: [{ nom: 'glucose', classe: 'sv-g-nutriment', sens: 1 }, { nom: 'acides aminés', classe: 'sv-g-dechet', sens: 1 }], texte: 'Seules les petites molécules, les nutriments, traversent la paroi : c\'est l\'absorption.', label: "Absorption des nutriments dans l'intestin grêle" }),
    },
    {
      type: 'exemple', enonce: "On mélange de l'amidon et de la salive dans un tube placé à 37 °C. Vingt minutes plus tard, l'eau iodée reste jaune. Interprète.",
      solution_etapes: ["L'eau iodée ne bleuit pas : le tube ne contient plus d'amidon.", "Au départ, il en contenait : l'amidon a donc été transformé.", "La salive contient une enzyme qui digère l'amidon à 37 °C."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le témoin', explication: "Le tube sans enzyme montre ce qui se passe sans digestion." },
    { etape: 2, titre: 'Comparer deux tubes qui ne diffèrent que par un facteur', explication: "Présence de salive, température : un seul facteur doit changer." },
    { etape: 3, titre: 'Lire le test', explication: "Eau iodée bleu foncé : amidon présent. Eau iodée jaune : amidon disparu." },
    { etape: 4, titre: 'Conclure', explication: "« L'amidon a disparu seulement en présence de salive à 37 °C : la salive contient une enzyme qui agit à cette température. »" },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Une enzyme découpe une grosse molécule.', 'L\'amidon est une chaîne de glucose.', 'L\'eau iodée révèle l\'amidon.']),

    exoRelier('e02', 1, 'Associe chaque grosse molécule aux nutriments qu\'elle donne.', [
      ["l'amidon", 'du glucose'], ['une protéine', 'des acides aminés'], ['un lipide', 'des acides gras'],
    ], ['L\'amidon est une chaîne de glucose.', 'Les protéines sont faites d\'acides aminés.', 'Lipides : acides gras.'], 3),

    exoVraiFaux('e03', 1, [
      ["L'amidon peut traverser directement la paroi de l'intestin.", false, 'Non : c\'est une molécule trop grosse. Elle doit d\'abord être découpée en glucose.'],
      ['Une enzyme digestive découpe les grosses molécules des aliments.', true, 'Oui.'],
      ['Une enzyme agit sur toutes les molécules.', false, 'Non : elle est spécifique d\'un type de molécule.'],
      ["L'eau iodée bleuit en présence d'amidon.", true, 'Oui : c\'est le test de l\'amidon.'],
      ['Les enzymes agissent à la température du corps.', true, 'Oui : 37 °C.'],
      ['Une enzyme chauffée à ébullition reste active.', false, 'Non : une forte chaleur la détruit.'],
      ['Le glucose est un nutriment.', true, 'Oui : il passe dans le sang et alimente les cellules.'],
    ], ['Grosse molécule : ne passe pas.', 'Enzyme : spécifique, active à 37 °C.', 'Eau iodée : amidon.']),

    exoClasser('e04', 2, 'Grosse molécule des aliments ou nutriment ?', [
      ["l'amidon", 'grosse molécule'], ['une protéine', 'grosse molécule'], ['un lipide', 'grosse molécule'],
      ['le glucose', 'nutriment'], ['un acide aminé', 'nutriment'], ['un acide gras', 'nutriment'],
    ], ['grosse molécule', 'nutriment'], { 'grosse molécule': "Elle ne traverse pas la paroi de l'intestin : elle doit être découpée.", nutriment: 'Assez petit pour passer dans le sang.' },
    ['Un nutriment passe dans le sang.', 'Les enzymes découpent les grosses molécules.', 'Glucose, acides aminés, acides gras : nutriments.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre le devenir de l'amidon d'un morceau de pain :", etapes: ['Le pain est mâché et imprégné de salive', "Une enzyme de la salive commence à découper l'amidon", "D'autres enzymes poursuivent la digestion dans l'intestin grêle", "L'amidon est entièrement transformé en glucose", "Le glucose traverse la paroi de l'intestin", 'Le sang distribue le glucose aux organes'] },
    ], ['La digestion commence dans la bouche.', 'Elle se termine dans l\'intestin grêle.', 'L\'absorption vient après la digestion.']),

    exoDocument('e06', 2, 'Interprète cette expérience.', [
      () => ({
        enonce: "Dans quatre tubes, on place de l'amidon dans différentes conditions, puis on teste la présence d'amidon avec de l'eau iodée." + tubes(RESULTATS),
        questions: [
          choix('Dans quel tube l\'amidon a-t-il été digéré ?', 'le tube 1', 'le tube 2', 'le tube 3'),
          choix('La comparaison des tubes 1 et 2 montre que la digestion nécessite :', 'la salive', 'le froid', "l'eau iodée"),
          choix('Le tube 2 sert de :', 'témoin', 'réactif', 'enzyme'),
        ],
        correction: ["Seul le tube 1 ne contient plus d'amidon : il y a été <strong>digéré</strong>.", 'Sans salive (tube 2), l\'amidon reste : la <strong>salive</strong> est nécessaire.', 'Le tube sans salive est le <strong>témoin</strong>.'],
      }),
      () => ({
        enonce: "Dans quatre tubes, on place de l'amidon dans différentes conditions, puis on teste la présence d'amidon avec de l'eau iodée." + tubes(RESULTATS),
        questions: [
          choix('La comparaison des tubes 1 et 3 montre que l\'enzyme :', 'agit à 37 °C mais pas à 0 °C', 'agit mieux à 0 °C', 'agit à toutes les températures'),
          choix('La comparaison des tubes 1 et 4 montre que :', "une enzyme bouillie n'agit plus", 'la salive bouillie agit mieux', "l'eau iodée est détruite par la chaleur"),
          choix('Dans le corps, cette enzyme agit bien car la température y est de :', '37 °C', '0 °C', '100 °C'),
        ],
        correction: ["À 0 °C, l'amidon reste : le froid <strong>empêche</strong> l'enzyme d'agir.", "La salive bouillie ne digère plus l'amidon : la forte chaleur a <strong>détruit l'enzyme</strong>.", 'La température du corps, <strong>37 °C</strong>, convient à l\'enzyme.'],
      }),
    ], ['Compare deux tubes qui ne diffèrent que par un facteur.', 'Jaune : plus d\'amidon. Bleu foncé : amidon présent.', 'Un tube sans enzyme est un témoin.']),

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Compte les liaisons à couper :',
      generer() {
        const n = pick([6, 8, 10, 12, 20]);
        return { enonce: `Un fragment d'amidon est une chaîne de ${n} molécules de glucose reliées les unes aux autres. Combien de liaisons l'enzyme doit-elle couper pour libérer toutes les molécules de glucose ?`, reponse: n - 1, validation: 'nombre', pieges: [{ valeur: n, message: 'Entre deux molécules voisines, il y a une liaison : compte les liaisons, pas les molécules.' }], _v: { n } };
      },
      indices: ['Dessine une petite chaîne de 3 molécules.', 'Entre 3 molécules, il y a 2 liaisons.', 'Il y a toujours une liaison de moins que de molécules.'],
      correction_etapes: (st) => [`Dans une chaîne, chaque liaison relie deux molécules voisines.`, `Pour ${st._v.n} molécules : ${st._v.n} − 1 = <strong>${st._v.n - 1} liaisons</strong> à couper.`],
    },

    exoDocument('e08', 3, "Explique l'absorption.", [
      () => ({
        enonce: "On remplit un sac dont la paroi ressemble à celle de l'intestin avec un mélange d'amidon et de glucose. On le plonge dans un bécher d'eau. Une heure plus tard, on teste l'eau du bécher : elle contient du glucose, mais pas d'amidon.",
        questions: [
          choix('Quelle molécule a traversé la paroi du sac ?', 'le glucose', "l'amidon", 'les deux'),
          choix("L'amidon n'a pas traversé car :", 'ses molécules sont trop grosses', 'il est trop sucré', 'il est détruit par l\'eau'),
          choix('Dans l\'organisme, l\'amidon doit donc d\'abord être :', 'découpé en glucose par des enzymes', 'avalé plus vite', 'réchauffé'),
        ],
        correction: ['On retrouve du <strong>glucose</strong> à l\'extérieur du sac : il a traversé.', "L'amidon est une <strong>très grosse molécule</strong> : il reste à l'intérieur.", 'La digestion le <strong>découpe en glucose</strong>, capable de passer dans le sang.'],
      }),
    ], ['Que trouve-t-on à l\'extérieur du sac ?', 'Compare la taille des deux molécules.', 'La digestion fabrique de petites molécules.']),

    exoDocument('e09', 3, 'Conçois une expérience.', [
      () => ({
        enonce: "On veut prouver qu'une enzyme de l'estomac digère les protéines du blanc d'œuf, mais pas l'amidon. On dispose de cette enzyme, de blanc d'œuf cuit, d'amidon, de tubes et d'un bain d'eau à 37 °C.",
        questions: [
          choix('Quels tubes faut-il préparer ?', "un tube blanc d'œuf + enzyme et un tube amidon + enzyme, avec leurs témoins sans enzyme", "un seul tube contenant le blanc d'œuf et l'amidon", 'deux tubes sans enzyme'),
          choix('À quelle température place-t-on les tubes ?', '37 °C', '0 °C', '100 °C'),
          choix('Quel résultat prouverait que l\'enzyme est spécifique ?', "le blanc d'œuf disparaît, l'amidon reste", 'les deux disparaissent', 'aucun ne disparaît'),
        ],
        correction: ['On teste <strong>chaque molécule séparément</strong>, avec un témoin sans enzyme pour chacune.', 'Une enzyme digestive agit à <strong>37 °C</strong>.', "Si seul le blanc d'œuf est digéré, l'enzyme n'agit que sur les protéines : elle est <strong>spécifique</strong>."],
      }),
    ], ['Un seul facteur doit changer entre deux tubes.', 'Il faut un témoin sans enzyme.', 'Spécifique : une enzyme, un type de molécule.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Une enzyme digestive :', choix: ['découpe une grosse molécule en molécules plus petites', 'fabrique de l\'amidon', 'transporte le sang', 'broie les aliments'], correct: 0, explication: 'C\'est la digestion chimique.' },
    { type: 'qcm', question: "La digestion de l'amidon donne :", choix: ['du glucose', 'des acides aminés', 'des acides gras', 'de l\'eau iodée'], correct: 0, explication: 'L\'amidon est une chaîne de molécules de glucose.' },
    { type: 'qcm', question: "L'eau iodée met en évidence :", choix: ["l'amidon", 'le glucose', 'les protéines', 'le dioxygène'], correct: 0, explication: 'Elle devient bleu foncé.' },
    { type: 'vrai_faux', question: 'Une enzyme agit à la température du corps, 37 °C.', reponse: true, explication: 'Le froid la ralentit, une forte chaleur la détruit.' },
    { type: 'qcm', question: 'Un nutriment est :', choix: ["une petite molécule capable de passer dans le sang", 'un aliment entier', 'une enzyme', 'un suc digestif'], correct: 0, explication: 'Il traverse la paroi de l\'intestin grêle.' },
    { type: 'vrai_faux', question: 'Une enzyme est spécifique : elle n\'agit que sur un type de molécule.', reponse: true, explication: 'Une enzyme qui digère l\'amidon ne digère pas les protéines.' },
  ],
};
