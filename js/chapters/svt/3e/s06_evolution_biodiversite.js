// =====================================================================
//  s06_evolution_biodiversite.js — SVT 3ᵉ : l'évolution de la biodiversité.
//  Variations entre individus, sélection naturelle, hasard, apparition de
//  nouvelles espèces, statut d'une théorie scientifique.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 20.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre, dec, arrondi } from '../outils.js';
import { tableau } from '../../commun.js';
import { selection, schemaCourbe, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['une population', "Ensemble des individus d'une même espèce qui vivent au même endroit."],
  ['la sélection naturelle', "Dans un milieu donné, les individus dont les caractères sont avantageux survivent et se reproduisent davantage : leurs allèles deviennent plus fréquents."],
  ['un caractère avantageux', "Caractère héréditaire qui augmente les chances de survivre et de se reproduire dans un milieu donné."],
  ['une espèce', "Ensemble d'individus capables de se reproduire entre eux et d'avoir des descendants eux-mêmes fertiles."],
  ['une théorie scientifique', "Explication d'un ensemble de faits, construite à partir d'observations et d'expériences, et que l'on peut mettre à l'épreuve."],
  ['une croyance', "Idée que l'on tient pour vraie sans chercher à la vérifier par des faits."],
];

/** Scénarios : une explication conforme à la sélection naturelle parmi des idées fausses courantes. */
const SCENARIOS = [
  ["Dans une région, les girafes ont aujourd'hui un cou plus long qu'il y a très longtemps. Quelle explication est correcte ?",
    'Les girafes nées avec un cou un peu plus long atteignaient plus de feuilles, survivaient mieux et ont eu plus de petits.',
    "Chaque girafe a allongé son cou à force de l'étirer, puis a transmis ce cou allongé à ses petits.", 'Les girafes ont décidé d\'avoir un cou plus long pour mieux se nourrir.'],
  ["Depuis l'usage massif d'un insecticide, les moustiques d'une région y résistent presque tous. Quelle explication est correcte ?",
    "Quelques moustiques possédaient déjà, par hasard, un allèle de résistance : ils ont survécu et se sont reproduits.",
    "L'insecticide a appris aux moustiques à se défendre.", 'Les moustiques ont fabriqué volontairement un allèle de résistance.'],
  ['Sur une île battue par les vents, la plupart des insectes d\'une espèce ont des ailes très courtes. Quelle explication est correcte ?',
    'Les insectes aux grandes ailes étaient plus souvent emportés en mer : ceux aux ailes courtes ont laissé plus de descendants.',
    'Le vent a raccourci les ailes de chaque insecte au cours de sa vie.', 'Les insectes ont compris que voler était dangereux et ont cessé d\'avoir des ailes.'],
  ["À l'hôpital, certaines bactéries résistent désormais à un antibiotique. Quelle explication est correcte ?",
    "Des bactéries portant par hasard une mutation de résistance ont survécu au traitement et se sont multipliées.",
    "L'antibiotique a transformé chaque bactérie en bactérie résistante.", 'Les bactéries se sont habituées au médicament en le rencontrant souvent.'],
];

export default {
  id: 's06',
  titre: "L'évolution de la biodiversité",
  theme: 'svt_vivant', niveau: '3e',
  icone: '🦕',

  intro:
    "Les espèces d'aujourd'hui ne sont pas celles d'hier : les dinosaures ont disparu il y a 66 millions d'années, et de nouvelles espèces sont apparues depuis. " +
    "On explique ici <strong>comment une population change</strong> au fil des générations, par le hasard et par la <strong>sélection naturelle</strong>. On verra aussi ce qui distingue une théorie scientifique d'une simple opinion.",

  cours: [
    {
      type: 'definition', titre: 'Des individus tous différents',
      contenu: "Dans une <strong>population</strong>, les individus diffèrent par leurs allèles, apparus par mutation et mélangés par la reproduction sexuée. Ces différences sont <strong>héréditaires</strong> : elles se transmettent aux descendants.",
    },
    {
      type: 'definition', titre: 'La sélection naturelle',
      contenu: "Dans un milieu donné, certains caractères augmentent les chances de survivre et de se reproduire. Les individus qui les possèdent laissent <strong>plus de descendants</strong> : génération après génération, leurs allèles deviennent plus fréquents dans la population. " +
        "C'est la <strong>sélection naturelle</strong>. Le milieu ne crée pas les caractères : il trie ceux qui existent déjà.",
    },
    { type: 'figure', titre: 'Les phalènes du bouleau', contenu: "Ces papillons de nuit se posent le jour sur les troncs. Fais passer les générations, puis change la couleur du tronc.", render: (host) => selection(host) },
    {
      type: 'propriete', titre: 'Trois idées à ne pas confondre',
      contenu: "<strong>Un individu ne se transforme pas</strong> pour s'adapter : c'est la population qui change, parce que certains individus se reproduisent plus que d'autres. " +
        "<strong>Les mutations se font au hasard</strong>, sans but. Et un caractère n'est avantageux que <strong>dans un milieu donné</strong> : si le milieu change, l'avantage peut disparaître.",
    },
    {
      type: 'propriete', titre: 'Le hasard joue aussi',
      contenu: "Dans une petite population, la fréquence d'un allèle peut changer simplement par hasard : quels individus se rencontrent, lesquels survivent à une tempête. Sélection naturelle et hasard modifient ensemble les populations.",
    },
    {
      type: 'propriete', titre: "De nouvelles espèces",
      contenu: "Quand deux populations sont séparées longtemps (par une mer, une montagne), elles évoluent chacune de leur côté. Au bout de très nombreuses générations, leurs individus ne peuvent plus se reproduire ensemble : deux <strong>espèces</strong> se sont formées. " +
        "À l'inverse, une espèce disparaît quand ses individus ne parviennent plus à survivre aux changements de leur milieu.",
    },
    {
      type: 'definition', titre: "Qu'est-ce qu'une théorie scientifique ?",
      contenu: "L'évolution est une <strong>théorie scientifique</strong> : une explication cohérente, appuyée sur un très grand nombre de <strong>faits</strong> (fossiles, comparaison des espèces, ADN, évolution observée chez les bactéries), et que de nouvelles observations peuvent mettre à l'épreuve. " +
        "Elle se distingue d'une <strong>croyance</strong> ou d'une opinion, que l'on ne cherche pas à vérifier. Charles Darwin a proposé la sélection naturelle en 1859.",
    },
    {
      type: 'exemple', enonce: "Dans une forêt polluée aux troncs noircis, les phalènes sombres deviennent majoritaires en quelques dizaines d'années. Explique.",
      solution_etapes: ["Dans la population, il existe au départ des papillons clairs et quelques papillons sombres : cette différence est héréditaire.", "Sur un tronc noirci, les oiseaux repèrent et mangent surtout les papillons clairs.", "Les sombres survivent et se reproduisent davantage : leur allèle devient plus fréquent. C'est la sélection naturelle."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Constater la diversité de départ', explication: "Quels caractères différents existent dans la population, et sont-ils héréditaires ?" },
    { etape: 2, titre: 'Identifier la contrainte du milieu', explication: "Qu'est-ce qui rend la survie difficile : un prédateur, la sécheresse, un insecticide, un antibiotique ?" },
    { etape: 3, titre: 'Dire qui est avantagé', explication: "Quel caractère permet de mieux survivre ou de mieux se reproduire face à cette contrainte ?" },
    { etape: 4, titre: 'Conclure sur la population', explication: "Les individus avantagés laissent plus de descendants : leur caractère devient plus fréquent. Ne jamais écrire qu'un individu « s'est adapté »." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Une population : une seule espèce, un seul lieu.', 'La sélection naturelle trie des caractères déjà présents.', 'Une théorie scientifique s\'appuie sur des faits et peut être testée.']),

    exoVraiFaux('e02', 1, [
      ["Un individu modifie ses gènes pour s'adapter à son milieu.", false, "Non : c'est la population qui change au fil des générations. Un individu garde ses allèles toute sa vie."],
      ['Les mutations se produisent au hasard.', true, 'Oui : elles ne sont pas dirigées vers un besoin.'],
      ['La sélection naturelle agit sur des différences héréditaires.', true, 'Oui : un caractère non transmis ne peut pas devenir plus fréquent dans la population.'],
      ['Un caractère avantageux l\'est dans tous les milieux.', false, 'Non : la couleur sombre avantage la phalène sur un tronc noirci, pas sur un tronc clair.'],
      ["L'évolution a pour but de fabriquer des espèces de plus en plus perfectionnées.", false, "Non : l'évolution n'a pas de but. Elle résulte du hasard et de la sélection naturelle."],
      ['Une théorie scientifique est une simple opinion.', false, 'Non : elle s\'appuie sur de nombreux faits et peut être mise à l\'épreuve.'],
      ['Des espèces ont disparu au cours de l\'histoire de la Terre.', true, 'Oui : les fossiles montrent que la biodiversité se renouvelle sans cesse.'],
    ], ['Distingue l\'individu et la population.', 'Le milieu trie, il ne fabrique pas les caractères.', 'Une théorie scientifique n\'est pas une supposition.']),

    exoOrdonner('e03', 1, [
      { consigne: "Remets dans l'ordre les étapes de la sélection naturelle :", etapes: ["Des individus d'une population présentent des caractères différents, héréditaires", 'Dans leur milieu, certains caractères aident à survivre', 'Les individus avantagés se reproduisent davantage', 'Ils transmettent leurs allèles à leurs descendants', 'Le caractère avantageux devient plus fréquent dans la population'] },
    ], ['Il faut d\'abord des différences entre individus.', 'Survivre permet de se reproduire.', 'Le changement de la population est le résultat final.']),

    exoDocument('e04', 2, 'Analyse ces relevés.', [
      () => {
        const a = randInt(2, 6), b = randInt(90, 97), c = randInt(6, 12);
        return {
          enonce: "Dans la région de Manchester, en Angleterre, la forme sombre de la phalène a été observée pour la première fois en 1848 ; en 1954, elle représentait plus de 98 % de la population. Entre-temps, la fumée des usines avait noirci les troncs. Depuis la fin des années 1960, l'air est moins pollué et la forme claire redevient fréquente. Le diagramme reprend cette histoire avec des valeurs inventées pour l'exercice.",
          visuel: (host) => { host.innerHTML = schemaBarres([['avant la pollution', a], ['troncs noircis', b], ['air dépollué', c]], { unite: 'phalènes sombres (%)' }); },
          questions: [
            nombre('Quel pourcentage de phalènes sombres le diagramme indique-t-il quand les troncs sont noircis ?', b, { unite: '%' }),
            choix('Sur les troncs noircis, les oiseaux mangeaient surtout :', 'les phalènes claires, bien visibles', 'les phalènes sombres', 'autant les unes que les autres'),
            choix("Une fois l'air dépollué, la part des sombres a chuté parce que :", 'sur les troncs redevenus clairs, ce sont elles que les oiseaux repèrent', 'les phalènes sombres ont changé de couleur', 'les oiseaux ont disparu'),
          ],
          correction: [`La barre « troncs noircis » indique <strong>${b} %</strong>.`, 'Sur un tronc sombre, les <strong>claires</strong> sont visibles : elles sont davantage mangées, les sombres se reproduisent plus.', "Le milieu a changé : l'avantage est passé aux claires. Aucun papillon n'a changé de couleur ; c'est la <strong>population</strong> qui a changé."],
        };
      },
    ], ['Lis la valeur au-dessus de chaque barre.', 'Un papillon de la couleur du tronc est camouflé.', 'Quand le milieu change, le caractère avantageux change aussi.']),

    exoDocument('e05', 2, 'Interprète cette expérience.', [
      () => {
        const pts = [[0, 1], [2, 8], [4, 30], [6, 65], [8, 92]];
        return {
          enonce: "Dans une région, on traite les champs chaque année avec le même insecticide. On mesure le pourcentage de pucerons qui résistent à ce produit.",
          visuel: (host) => { host.innerHTML = schemaCourbe(pts, { xLabel: 'années de traitement', yLabel: 'pucerons résistants (%)', ymin: 0, ymax: 100 }); },
          questions: [
            choix('Au début du traitement, des pucerons résistants :', 'existaient déjà, en très petit nombre', "n'existaient pas du tout", 'étaient majoritaires'),
            choix("L'insecticide :", 'tue les pucerons sensibles et laisse les résistants se reproduire', 'transforme les pucerons sensibles en résistants', 'attire des pucerons venus d\'ailleurs'),
            choix('Pour ralentir ce phénomène, on peut :', "alterner les méthodes de lutte au lieu d'utiliser toujours le même produit", 'doubler la dose chaque année', 'traiter plus souvent avec le même produit'),
          ],
          correction: ['À l\'année 0, il y a déjà <strong>1 %</strong> de résistants : la résistance vient d\'une mutation apparue par hasard, avant le traitement.', "L'insecticide <strong>trie</strong> : les sensibles meurent, les résistants transmettent leur allèle.", "Utiliser toujours le même produit sélectionne toujours les mêmes individus ; <strong>varier</strong> les méthodes limite cette sélection."],
        };
      },
    ], ['Regarde le tout premier point de la courbe.', 'Le produit ne fabrique pas la résistance, il sélectionne.', 'Une sélection toujours identique favorise toujours les mêmes individus.']),

    exoClasser('e06', 2, 'Fait, théorie scientifique ou croyance ?', [
      ['on a trouvé des fossiles de dinosaures à plumes', 'fait'], ["l'ADN du chimpanzé ressemble à près de 99 % à celui de l'être humain", 'fait'], ['des bactéries sont devenues résistantes à un antibiotique', 'fait'], ['près de Manchester, plus de 98 % des phalènes étaient sombres en 1954', 'fait'],
      ["les espèces se transforment au cours du temps par mutation et sélection naturelle", 'théorie'], ['toutes les espèces actuelles descendent d\'ancêtres communs', 'théorie'],
      ['le chat noir porte malheur', 'croyance'], ['les espèces n\'ont jamais changé depuis leur apparition', 'croyance'], ['les êtres vivants évoluent parce qu\'ils le veulent', 'croyance'],
    ], ['fait', 'théorie', 'croyance'], { fait: 'Une observation ou une mesure, que chacun peut vérifier.', théorie: 'Une explication qui relie ces faits et que l\'on peut mettre à l\'épreuve.', croyance: "Une idée tenue pour vraie sans s'appuyer sur des faits vérifiés." },
    ['Un fait s\'observe ou se mesure.', 'Une théorie explique un ensemble de faits.', 'Une croyance ne cherche pas à être vérifiée.']),

    {
      id: 'e07', niveau: 2, type: 'qcm', consigne: "Choisis l'explication scientifique.",
      generer() { const [enonce, bonne, f1, f2] = pick(SCENARIOS); return { enonce, choix: [bonne, f1, f2], correct: 0, _v: { bonne } }; },
      indices: ['Un individu ne change pas ses gènes au cours de sa vie.', 'Les caractères existent avant d\'être triés par le milieu.', 'Cherche l\'explication qui parle de survie et de descendants.'],
      correction_etapes: (st) => [`Bonne explication : « ${st._v.bonne} »`, "Les autres propositions supposent qu'un individu se transforme ou qu'il agit dans un but : ce n'est pas ainsi que les populations évoluent."],
    },

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Calcule une fréquence :',
      generer() {
        const total = pick([40, 50, 80, 200, 250]), pct = pick([10, 20, 30, 40, 60, 80]), n = (total * pct) / 100;
        return { enonce: `Dans un bois, on capture ${total} phalènes : ${n} sont sombres. Quel pourcentage de la population les phalènes sombres représentent-elles ?`, reponse: pct, validation: 'nombre', unite: '%', pieges: [{ valeur: n, message: 'C\'est le nombre de papillons sombres, pas leur pourcentage.' }], _v: { total, n, pct } };
      },
      indices: ['Un pourcentage est une proportion sur 100.', 'Divise le nombre de sombres par le nombre total.', 'Multiplie le résultat par 100.'],
      correction_etapes: (st) => [`Proportion : $\\dfrac{${st._v.n}}{${st._v.total}} = ${String(arrondi(st._v.n / st._v.total, 2)).replace('.', '{,}')}$.`, `En pourcentage : <strong>${st._v.pct} %</strong>.`],
    },

    exoDocument('e09', 3, 'Explique ce changement.', [
      () => {
        const avant = pick([9.2, 9.4, 9.6]), gain = pick([0.5, 0.6, 0.8]);
        return {
          enonce: "Sur une île des Galápagos, des pinsons mangent des graines. Lors d'une grande sécheresse, les petites graines tendres disparaissent : il ne reste que de grosses graines dures, que seuls les becs épais peuvent casser. Beaucoup de pinsons meurent. On mesure l'épaisseur moyenne du bec (valeurs inventées pour l'exercice)." +
            tableau([['', 'Avant la sécheresse', 'Génération suivante'], ['Épaisseur moyenne du bec', `${dec(avant)} mm`, `${dec(arrondi(avant + gain, 1))} mm`]]),
          questions: [
            nombre("De combien de millimètres l'épaisseur moyenne du bec a-t-elle augmenté ?", gain, { unite: 'mm', tolerance: 0.01 }),
            choix('Pendant la sécheresse, quels pinsons ont le mieux survécu ?', 'ceux qui avaient déjà un bec épais', 'ceux qui avaient un bec fin', 'les plus jeunes'),
            choix('Le bec moyen a augmenté parce que :', 'les survivants à bec épais ont transmis ce caractère à leurs petits', 'chaque pinson a fait grossir son bec', 'les graines dures font pousser le bec'),
          ],
          correction: [`${dec(arrondi(avant + gain, 1))} − ${dec(avant)} = <strong>${dec(gain)} mm</strong>.`, 'Seuls les <strong>becs épais</strong> cassaient les graines restantes : ces pinsons ont survécu.', "L'épaisseur du bec est héréditaire : les survivants l'ont <strong>transmise</strong>. La population a changé, pas les individus."],
        };
      },
    ], ['Soustrais les deux valeurs.', 'Quel bec permet de manger les graines qui restent ?', 'Un individu ne change pas de bec : c\'est la génération suivante qui est différente.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La sélection naturelle agit sur :', choix: ['des différences héréditaires entre individus', 'la volonté des individus', 'des caractères acquis pendant la vie', 'les fossiles'], correct: 0, explication: 'Seul un caractère transmis peut devenir plus fréquent dans la population.' },
    { type: 'vrai_faux', question: "Au cours de sa vie, un individu modifie ses gènes pour s'adapter.", reponse: false, explication: 'Non : c\'est la population qui change, de génération en génération.' },
    { type: 'qcm', question: 'Sur un tronc noirci par la pollution, les oiseaux mangent surtout :', choix: ['les phalènes claires', 'les phalènes sombres', 'aucune phalène', 'les deux également'], correct: 0, explication: 'Les claires sont visibles ; les sombres, camouflées, se reproduisent davantage.' },
    { type: 'qcm', question: 'Les mutations se produisent :', choix: ['au hasard', 'quand l\'individu en a besoin', 'uniquement chez les bactéries', 'sur ordre du milieu'], correct: 0, explication: 'Elles ne sont dirigées vers aucun but.' },
    { type: 'qcm', question: 'Une théorie scientifique :', choix: ['explique des faits et peut être mise à l\'épreuve', 'est une opinion personnelle', 'ne peut jamais être discutée', 'ne s\'appuie sur aucune observation'], correct: 0, explication: 'Elle relie de nombreux faits et reste testable.' },
    { type: 'vrai_faux', question: "Deux populations séparées très longtemps peuvent donner deux espèces différentes.", reponse: true, explication: 'Oui : elles évoluent séparément jusqu\'à ne plus pouvoir se reproduire entre elles.' },
  ],
};
