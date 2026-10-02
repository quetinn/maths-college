// =====================================================================
//  sr08_biodiversite_temps.js — SVT 4ᵉ : la modification de la
//  biodiversité au cours du temps. Fossiles, apparition et disparition
//  d'espèces, crises, ères géologiques.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 18.
//  Dates vérifiées (voir js/sources.js) : échelle des temps géologiques
//  et histoire évolutive du vivant (Wikipédia). Les comptages des
//  exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { frise, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['un fossile', "Reste ou trace d'un être vivant du passé, conservé dans une roche sédimentaire."],
  ['une roche sédimentaire', 'Roche formée par l\'accumulation de dépôts, en couches superposées.'],
  ['une crise biologique', "Période assez brève, à l'échelle géologique, pendant laquelle de très nombreuses espèces disparaissent."],
  ['une ère géologique', "Grande division de l'histoire de la Terre, délimitée par des crises biologiques."],
  ['une extinction', "Disparition définitive d'une espèce."],
  ['la biodiversité', 'Diversité des êtres vivants.'],
];

/** Ères : nom, début et fin en millions d'années. */
const ERES = [['le Paléozoïque', 539, 252], ['le Mésozoïque', 252, 66], ['le Cénozoïque', 66, 0]];

export default {
  id: 'sr08',
  titre: 'La modification de la biodiversité au cours du temps',
  theme: 'svt_vivant', niveau: '4e',
  icone: '🦴',

  intro:
    "Les dinosaures ont régné sur les continents, puis ils ont disparu. Les roches gardent la mémoire de ces mondes disparus sous forme de <strong>fossiles</strong>. " +
    "On apprend à lire cette mémoire, à situer les grandes étapes de l'histoire de la vie et à comprendre ce qu'est une <strong>crise biologique</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Les fossiles',
      contenu: "Un <strong>fossile</strong> est un reste (os, coquille, dent) ou une trace (empreinte) d'un être vivant du passé, conservé dans une <strong>roche sédimentaire</strong>. Les couches de roches se déposent les unes sur les autres : en général, plus une couche est profonde, plus elle est ancienne.",
    },
    {
      type: 'propriete', titre: 'La biodiversité change',
      contenu: "Les fossiles montrent que les espèces du passé étaient différentes de celles d'aujourd'hui. Au cours du temps, des espèces <strong>apparaissent</strong> et d'autres <strong>disparaissent</strong> : la biodiversité se renouvelle sans cesse.",
    },
    { type: 'figure', titre: "Les grandes dates de l'histoire de la vie", contenu: 'Choisis un repère sur la frise.', render: (host) => frise(host) },
    {
      type: 'definition', titre: 'Les crises biologiques',
      contenu: "À certaines périodes, un très grand nombre d'espèces disparaissent en un temps bref à l'échelle géologique : c'est une <strong>crise biologique</strong>. Il y a 252 millions d'années, la plus grande crise connue marque la fin du Paléozoïque. Il y a 66 millions d'années, une autre voit disparaître les dinosaures.",
    },
    {
      type: 'propriete', titre: 'Les ères géologiques',
      contenu: "Les crises servent de repères pour découper l'histoire de la Terre en <strong>ères</strong> : le Paléozoïque (de 539 à 252 millions d'années), le Mésozoïque (de 252 à 66 millions d'années) et le Cénozoïque (de 66 millions d'années à aujourd'hui). " +
        "Après chaque crise, les groupes survivants se diversifient : les mammifères après la disparition des dinosaures.",
    },
    {
      type: 'propriete', titre: 'Les causes des crises',
      contenu: "Les crises sont liées à de grands bouleversements du milieu : éruptions volcaniques de très grande ampleur, chute d'une météorite, changements du climat et du niveau des mers. Aujourd'hui, les activités humaines font disparaître des espèces à un rythme élevé.",
    },
    {
      type: 'exemple', enonce: "Combien de temps a duré le Mésozoïque, l'ère des dinosaures ?",
      solution_etapes: ['Il commence il y a 252 millions d\'années.', 'Il se termine il y a 66 millions d\'années.', '252 − 66 = 186 millions d\'années.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lire les couches de bas en haut', explication: "La couche la plus profonde est la plus ancienne." },
    { etape: 2, titre: 'Relever les fossiles de chaque couche', explication: "Quelles espèces sont présentes ? Lesquelles n'y sont plus ?" },
    { etape: 3, titre: 'Repérer les changements', explication: "Une espèce absente des couches récentes a disparu ; une espèce absente des couches anciennes est apparue plus tard." },
    { etape: 4, titre: 'Dater et conclure', explication: "Situe ces changements sur l'échelle des temps géologiques." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Un fossile est conservé dans une roche.', 'Crise : beaucoup d\'espèces disparaissent.', 'Les ères sont délimitées par des crises.']),

    exoOrdonner('e02', 1, [
      { consigne: 'Range ces événements du plus ancien au plus récent :', etapes: ['Formation de la Terre', 'Premières cellules', 'Début du Paléozoïque', 'Disparition des dinosaures', 'Apparition d\'Homo sapiens'] },
      { consigne: 'Range ces ères de la plus ancienne à la plus récente :', etapes: ['Paléozoïque', 'Mésozoïque', 'Cénozoïque'] },
    ], ['La Terre s\'est formée avant la vie.', 'Les dinosaures ont disparu bien avant l\'apparition de notre espèce.', 'Paléo : ancien. Céno : récent.']),

    exoVraiFaux('e03', 1, [
      ['Les dinosaures ont disparu il y a 66 millions d\'années.', true, 'Oui : c\'est la fin du Mésozoïque.'],
      ['Les espèces du passé étaient les mêmes qu\'aujourd\'hui.', false, 'Non : les fossiles montrent des espèces différentes.'],
      ['Dans un empilement de couches, la plus profonde est en général la plus ancienne.', true, 'Oui : les dépôts s\'accumulent les uns sur les autres.'],
      ['Notre espèce existait déjà au temps des dinosaures.', false, 'Non : Homo sapiens est apparu il y a 300 000 ans, bien après leur disparition.'],
      ['Une crise biologique fait disparaître de très nombreuses espèces.', true, 'Oui, en un temps bref à l\'échelle géologique.'],
      ['Après une crise, les groupes survivants se diversifient.', true, 'Oui : les mammifères après la disparition des dinosaures.'],
      ['La Terre s\'est formée il y a 4,54 milliards d\'années.', true, 'Oui.'],
    ], ['66 millions d\'années : fin des dinosaures.', 'Homo sapiens : 300 000 ans.', 'Plus profond : plus ancien.']),

    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: "Calcule la durée d'une ère :",
      generer() {
        const [nom, debut, fin] = pick(ERES);
        return { enonce: `${nom.charAt(0).toUpperCase() + nom.slice(1)} commence il y a ${debut} millions d'années et se termine ${fin === 0 ? "aujourd'hui" : `il y a ${fin} millions d'années`}. Combien de millions d'années dure cette ère ?`, reponse: debut - fin, validation: 'nombre', _v: { debut, fin } };
      },
      indices: ['Une durée se calcule par une soustraction.', 'Date de début moins date de fin.', '« Aujourd\'hui » correspond à 0.'],
      correction_etapes: (st) => [`Durée = ${st._v.debut} − ${st._v.fin} = <strong>${st._v.debut - st._v.fin} millions d'années</strong>.`],
    },

    exoClasser('e05', 2, 'À quelle ère cet événement appartient-il ?', [
      ['les fossiles d\'animaux deviennent abondants, il y a 539 millions d\'années', 'Paléozoïque'], ['la vie gagne les continents', 'Paléozoïque'],
      ["l'ère des dinosaures", 'Mésozoïque'], ['un événement daté de 150 millions d\'années', 'Mésozoïque'],
      ['les mammifères se diversifient', 'Cénozoïque'], ["l'apparition d'Homo sapiens, il y a 300 000 ans", 'Cénozoïque'], ['un événement daté de 10 millions d\'années', 'Cénozoïque'],
    ], ['Paléozoïque', 'Mésozoïque', 'Cénozoïque'], { Paléozoïque: 'De 539 à 252 millions d\'années.', Mésozoïque: 'De 252 à 66 millions d\'années.', Cénozoïque: 'De 66 millions d\'années à aujourd\'hui.' },
    ['Mésozoïque : entre 252 et 66 millions d\'années.', 'Cénozoïque : les 66 derniers millions d\'années.', 'Les dinosaures vivaient au Mésozoïque.'], 4),

    exoDocument('e06', 2, 'Lis cette coupe de terrain.', [
      () => ({
        enonce: "Coupe inventée pour l'exercice. Dans une falaise, on relève les fossiles de trois couches de roches." +
          tableau([['Couche', 'Fossiles'], ['3 (en haut)', 'dents de mammifères'], ['2 (au milieu)', 'os de dinosaures, ammonites'], ['1 (en bas)', 'trilobites']]),
        questions: [
          choix('Quelle couche est la plus ancienne ?', 'la couche 1', 'la couche 3', 'la couche 2'),
          choix('Les trilobites sont absents des couches 2 et 3 : ils ont', 'disparu', 'migré', 'grandi'),
          choix('Entre la couche 2 et la couche 3, quel groupe a disparu ?', 'les dinosaures', 'les mammifères', 'les trilobites'),
        ],
        correction: ['La couche du bas, déposée en premier, est la <strong>plus ancienne</strong>.', 'Un groupe absent des couches récentes a <strong>disparu</strong>.', 'Les <strong>dinosaures</strong> sont présents dans la couche 2, absents de la couche 3.'],
      }),
    ], ['Le bas est le plus ancien.', 'Compare les fossiles d\'une couche à l\'autre.', 'Absent des couches du dessus : disparu.']),

    exoDocument('e07', 2, "Mesure l'ampleur d'une crise.", [
      () => {
        const avant = pick([200, 400, 500]), pct = pick([50, 60, 80]), apres = (avant * (100 - pct)) / 100;
        return {
          enonce: "Comptages inventés pour l'exercice. Des chercheurs comptent les espèces d'animaux marins fossiles dans des roches situées juste avant et juste après une crise biologique.",
          visuel: (host) => { host.innerHTML = schemaBarres([['avant la crise', avant], ['après la crise', apres]], { unite: "nombre d'espèces" }); },
          questions: [
            nombre('Combien d\'espèces ont disparu pendant la crise ?', avant - apres),
            nombre('Quel pourcentage des espèces a disparu ?', pct, { unite: '%' }),
            choix('Après la crise, la biodiversité :', 'augmente de nouveau, avec de nouvelles espèces', 'reste définitivement faible', 'revient exactement aux mêmes espèces'),
          ],
          correction: [`${avant} − ${apres} = <strong>${avant - apres} espèces</strong> disparues.`, `${avant - apres} ÷ ${avant} × 100 = <strong>${pct} %</strong>.`, 'Les survivants se diversifient : de <strong>nouvelles espèces</strong> apparaissent.'],
        };
      },
    ], ['Soustrais les deux comptages.', 'Pourcentage = disparues ÷ total × 100.', 'Une crise est suivie d\'une diversification.']),

    exoClasser('e08', 3, 'Cet événement peut-il provoquer une crise biologique ?', [
      ['des éruptions volcaniques gigantesques pendant des milliers d\'années', 'oui'], ['la chute d\'une très grosse météorite', 'oui'], ['un changement rapide du climat de toute la planète', 'oui'], ['une forte variation du niveau des mers', 'oui'],
      ['un orage violent sur une région', 'non'], ['une année plus froide que la moyenne', 'non'], ['la disparition d\'un arbre dans une forêt', 'non'],
    ], ['oui', 'non'], { oui: 'Ces événements bouleversent les milieux de vie à l\'échelle de la planète.', non: 'Ces événements sont trop locaux ou trop brefs.' },
    ['Une crise touche toute la planète.', 'Elle demande un bouleversement durable.', 'Un événement local n\'y suffit pas.'], 4),

    exoDocument('e09', 3, 'Situe-toi dans le temps.', [
      () => {
        const [a, b] = pick([[66, 300000], [252, 66], [539, 252]]);
        return {
          enonce: "Quelques repères : début du Paléozoïque il y a 539 millions d'années ; grande crise il y a 252 millions d'années ; disparition des dinosaures il y a 66 millions d'années ; apparition d'Homo sapiens il y a 300 000 ans (soit 0,3 million d'années).",
          questions: [
            nombre(b === 300000 ? "Combien de millions d'années séparent la disparition des dinosaures de l'apparition d'Homo sapiens ?" : `Combien de millions d'années séparent les repères datés de ${a} et de ${b} millions d'années ?`, b === 300000 ? 65.7 : a - b, { tolerance: 0.05 }),
            choix('Les premiers êtres humains ont-ils pu rencontrer des dinosaures ?', 'non : des dizaines de millions d\'années les séparent', 'oui, pendant quelques siècles', 'oui, au Paléozoïque'),
            choix("À l'échelle de l'histoire de la Terre, l'apparition de notre espèce est :", 'très récente', 'très ancienne', 'située au milieu'),
          ],
          correction: [b === 300000 ? '66 − 0,3 = <strong>65,7 millions d\'années</strong>.' : `${a} − ${b} = <strong>${a - b} millions d'années</strong>.`, "Les dinosaures ont disparu il y a 66 millions d'années, notre espèce est apparue il y a 0,3 million d'années : <strong>aucune rencontre possible</strong>.", "300 000 ans sur 4,54 milliards d'années : c'est <strong>très récent</strong>."],
        };
      },
    ], ['Mets les deux dates dans la même unité.', '300 000 ans = 0,3 million d\'années.', 'Soustrais.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un fossile est :', choix: ["un reste ou une trace d'un être vivant du passé", 'une roche volcanique', 'un animal actuel', 'un outil préhistorique'], correct: 0, explication: 'Il est conservé dans une roche sédimentaire.' },
    { type: 'qcm', question: 'Les dinosaures ont disparu il y a :', choix: ["66 millions d'années", '252 millions d\'années', '300 000 ans', '4,54 milliards d\'années'], correct: 0, explication: 'C\'est la limite entre le Mésozoïque et le Cénozoïque.' },
    { type: 'vrai_faux', question: 'Une crise biologique est une disparition massive d\'espèces.', reponse: true, explication: 'Elle sert de limite entre deux ères.' },
    { type: 'qcm', question: 'Dans un empilement de couches, la plus ancienne est en général :', choix: ['la plus profonde', 'la plus haute', 'la plus épaisse', 'la plus claire'], correct: 0, explication: 'Les dépôts s\'accumulent du bas vers le haut.' },
    { type: 'qcm', question: 'Nous vivons au :', choix: ['Cénozoïque', 'Mésozoïque', 'Paléozoïque', 'Précambrien'], correct: 0, explication: 'Depuis 66 millions d\'années.' },
    { type: 'vrai_faux', question: 'Homo sapiens est apparu avant la disparition des dinosaures.', reponse: false, explication: 'Il est apparu il y a 300 000 ans.' },
  ],
};
