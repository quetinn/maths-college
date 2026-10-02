// =====================================================================
//  sr02_tectonique_plaques.js — SVT 4ᵉ : l'origine des séismes et des
//  éruptions volcaniques. Répartition, plaques lithosphériques, limites
//  de plaques (écartement, rapprochement, coulissage), moteur.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 3.
//  Valeurs vérifiées (voir js/sources.js) : déplacements de l'ordre de 1 à
//  13 cm par an, Wegener en 1912 (Wikipédia, « Tectonique des plaques »).
//  Les tableaux des exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { plaques } from '../figures.js';

const DEFINITIONS = [
  ['une plaque lithosphérique', "Grande portion rigide de la surface de la Terre, qui se déplace lentement."],
  ['la lithosphère', 'Enveloppe externe et rigide de la Terre, découpée en plaques.'],
  ['une dorsale océanique', "Chaîne de volcans sous-marins où deux plaques s'écartent."],
  ['une zone de subduction', "Zone où une plaque plonge sous une autre."],
  ['une faille', 'Cassure le long de laquelle des blocs de roche se déplacent.'],
  ['la tectonique des plaques', 'Théorie qui explique les séismes, les volcans et les reliefs par le mouvement des plaques.'],
];

export default {
  id: 'sr02',
  titre: "L'origine des séismes et des éruptions volcaniques",
  theme: 'svt_terre', niveau: '4e',
  icone: '🗺️',

  intro:
    "Les séismes et les volcans ne sont pas répartis au hasard : ils dessinent des lignes à la surface du globe. " +
    "Ces lignes sont les frontières de grandes <strong>plaques</strong> qui se déplacent de quelques centimètres par an. On découvre ce qui se passe à leurs limites.",

  cours: [
    {
      type: 'propriete', titre: 'Une répartition qui n\'est pas due au hasard',
      contenu: "Sur une carte du monde, la plupart des séismes et des volcans sont <strong>alignés</strong> : au milieu des océans, sur le pourtour du Pacifique, le long de grandes chaînes de montagnes. Entre ces alignements s'étendent de vastes zones calmes.",
    },
    {
      type: 'definition', titre: 'Les plaques lithosphériques',
      contenu: "La surface de la Terre est découpée en <strong>plaques lithosphériques</strong> rigides. Les zones calmes sont l'intérieur des plaques ; les alignements de séismes et de volcans en marquent les <strong>limites</strong>. " +
        "Les plaques se déplacent les unes par rapport aux autres, à une vitesse de l'ordre de 1 à 13 cm par an.",
    },
    { type: 'figure', titre: 'Trois mouvements aux limites des plaques', contenu: 'Choisis un mouvement et observe ce qu\'il provoque.', render: (host) => plaques(host) },
    {
      type: 'propriete', titre: "Quand deux plaques s'écartent",
      contenu: "Au niveau d'une <strong>dorsale océanique</strong>, deux plaques s'écartent. Du magma remonte et fabrique un nouveau plancher océanique. Les éruptions y sont <strong>effusives</strong> et les séismes peu profonds.",
    },
    {
      type: 'propriete', titre: 'Quand deux plaques se rapprochent',
      contenu: "Dans une <strong>zone de subduction</strong>, une plaque plonge sous une autre. Les séismes y sont nombreux, parfois très profonds et très violents ; les volcans y sont <strong>explosifs</strong>. Quand deux continents se rencontrent, une chaîne de montagnes se forme.",
    },
    {
      type: 'propriete', titre: 'Le moteur',
      contenu: "La Terre est chaude en profondeur. Cette énergie interne met en mouvement la matière située sous les plaques, et la plaque qui plonge dans une zone de subduction tire le reste de la plaque derrière elle.",
    },
    {
      type: 'propriete', titre: 'Une idée qui a mis du temps à s\'imposer',
      contenu: "En 1912, Alfred Wegener propose que les continents se déplacent : il remarque que les côtes de l'Afrique et de l'Amérique du Sud s'emboîtent et que l'on y trouve les mêmes fossiles. Sa « dérive des continents » n'est acceptée que des décennies plus tard, quand l'exploration des fonds océaniques apporte de nouvelles preuves.",
    },
    {
      type: 'exemple', enonce: "Deux plaques s'écartent de 4 cm par an. De combien se sont-elles éloignées en 1 million d'années ?",
      solution_etapes: ['Distance = vitesse × durée : 4 × 1 000 000 = 4 000 000 cm.', '4 000 000 cm = 40 000 m.', 'Soit 40 km en un million d\'années : c\'est lent à notre échelle, immense à l\'échelle de la Terre.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Relever la vitesse et la durée', explication: "La vitesse est en centimètres par an, la durée souvent en millions d'années." },
    { etape: 2, titre: 'Calculer la distance en centimètres', explication: "Distance = vitesse × durée." },
    { etape: 3, titre: 'Convertir', explication: "100 cm = 1 m ; 100 000 cm = 1 km. Divise par 100 000 pour obtenir des kilomètres." },
    { etape: 4, titre: 'Vérifier l\'ordre de grandeur', explication: "Quelques centimètres par an donnent quelques dizaines de kilomètres par million d'années." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Les plaques sont rigides et mobiles.', 'Dorsale : les plaques s\'écartent.', 'Subduction : une plaque plonge.']),

    exoVraiFaux('e02', 1, [
      ['Les séismes sont répartis au hasard à la surface de la Terre.', false, 'Non : ils sont alignés le long des limites de plaques.'],
      ['Les plaques lithosphériques se déplacent de quelques centimètres par an.', true, 'Oui : de l\'ordre de 1 à 13 cm par an.'],
      ["Au niveau d'une dorsale, deux plaques s'écartent.", true, 'Oui : du plancher océanique s\'y forme.'],
      ['Dans une zone de subduction, les volcans sont effusifs.', false, 'Non : ils sont explosifs.'],
      ["L'intérieur d'une plaque est une zone plutôt calme.", true, 'Oui : séismes et volcans se concentrent à ses limites.'],
      ['Wegener a proposé la dérive des continents en 1912.', true, 'Oui, à partir de la forme des côtes et des fossiles.'],
      ['La chaleur interne de la Terre est à l\'origine du mouvement des plaques.', true, 'Oui.'],
    ], ['Regarde une carte : séismes et volcans forment des lignes.', 'Dorsale : écartement. Subduction : rapprochement.', 'Subduction : volcans explosifs.']),

    exoClasser('e03', 1, 'Dorsale ou zone de subduction ?', [
      ["deux plaques s'écartent", 'dorsale'], ['du plancher océanique se forme', 'dorsale'], ['éruptions effusives sous la mer', 'dorsale'],
      ['une plaque plonge sous une autre', 'subduction'], ['volcans explosifs', 'subduction'], ['séismes très profonds', 'subduction'], ['deux plaques se rapprochent', 'subduction'],
    ], ['dorsale', 'subduction'], { dorsale: 'Écartement : le magma remonte et fabrique du plancher océanique.', subduction: 'Rapprochement : une plaque s\'enfonce, avec séismes profonds et volcans explosifs.' },
    ['Dorsale : au milieu des océans.', 'Subduction : une plaque descend.', 'Explosif rime avec subduction.'], 4),

    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule le déplacement :',
      generer() {
        const v = pick([2, 3, 5, 8, 10]), ma = pick([1, 2, 5, 10]);
        return { enonce: `Deux plaques s'écartent de ${v} cm par an. De combien de kilomètres se sont-elles éloignées en ${ma} million${ma > 1 ? 's' : ''} d'années ?`, reponse: v * ma * 10, validation: 'nombre', unite: 'km', pieges: [{ valeur: v * ma * 1000000, message: 'Ce résultat est en centimètres : convertis en kilomètres (1 km = 100 000 cm).' }], _v: { v, ma } };
      },
      indices: ['Distance = vitesse × durée.', 'Un million s\'écrit 1 000 000.', '1 km = 100 000 cm.'],
      correction_etapes: (st) => [`${st._v.v} × ${st._v.ma} 000 000 = ${st._v.v * st._v.ma} 000 000 cm.`, `1 km = 100 000 cm : ${st._v.v * st._v.ma} 000 000 ÷ 100 000 = <strong>${st._v.v * st._v.ma * 10} km</strong>.`],
    },

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre ce qui se passe au niveau d'une dorsale :", etapes: ["Deux plaques s'écartent", 'Du magma remonte entre elles', 'Le magma arrive au fond de l\'océan', 'Il refroidit et forme une roche volcanique', "Un nouveau plancher océanique s'ajoute de chaque côté"] },
      { consigne: "Remets dans l'ordre ce qui se passe dans une zone de subduction :", etapes: ['Deux plaques se rapprochent', "La plaque océanique plonge sous l'autre", 'Les roches frottent et cassent : séismes', 'Du magma se forme en profondeur', 'Des volcans explosifs apparaissent en surface'] },
    ], ['Commence par le mouvement des plaques.', 'Le magma remonte ensuite.', 'La conséquence en surface vient à la fin.']),

    exoDocument('e06', 2, 'Exploite cette carte de données.', [
      () => {
        const v = pick([2, 4, 5]);
        const lignes = [50, 100, 200].map((d) => [d, d / (v * 10)]);
        return {
          enonce: "Données inventées pour l'exercice. On prélève des roches au fond de l'océan, de plus en plus loin d'une dorsale, et on mesure leur âge." +
            tableau([['Distance à la dorsale (km)', ...lignes.map((l) => l[0])], ["Âge de la roche (millions d'années)", ...lignes.map((l) => String(l[1]).replace('.', ','))]]),
          questions: [
            choix('Plus on s\'éloigne de la dorsale, plus les roches sont :', 'âgées', 'jeunes', 'du même âge'),
            choix('Les roches les plus jeunes se trouvent :', 'au niveau de la dorsale', 'loin de la dorsale', 'partout'),
            nombre(`En combien de millions d'années la roche prélevée à ${lignes[2][0]} km s'est-elle éloignée de la dorsale ?`, lignes[2][1]),
          ],
          correction: ["L'âge augmente avec la distance : les roches sont de plus en plus <strong>âgées</strong>.", 'Le plancher océanique se forme <strong>à la dorsale</strong>, puis s\'en éloigne.', `Son âge l'indique : <strong>${String(lignes[2][1]).replace('.', ',')} millions d'années</strong>.`],
        };
      },
    ], ['Lis le tableau de gauche à droite.', 'Une roche se forme à la dorsale, puis s\'en éloigne.', 'L\'âge de la roche est le temps écoulé depuis sa formation.']),

    exoSituation('e07', 2, 'Quel argument Wegener utilisait-il ?', [
      ["Les côtes de l'Afrique et de l'Amérique du Sud ont des formes qui s'emboîtent. Qu'en concluait Wegener ?", 'Ces deux continents étaient autrefois réunis.', 'L\'océan Atlantique a toujours existé.', 'Les continents ne bougent pas.'],
      ["On trouve les mêmes fossiles d'un petit reptile en Afrique et en Amérique du Sud, alors qu'il ne pouvait pas traverser un océan. Quelle explication propose Wegener ?", 'Les deux continents étaient réunis quand cet animal vivait.', 'L\'animal a traversé l\'Atlantique à la nage.', 'Ce sont deux espèces sans rapport.'],
      ["Pourquoi la théorie de Wegener a-t-elle été rejetée au début ?", 'Il ne pouvait pas expliquer ce qui faisait bouger les continents.', 'Il n\'avait aucun argument.', 'Personne ne connaissait les continents.'],
    ], ['Wegener observe des ressemblances de part et d\'autre de l\'océan.', 'Des fossiles identiques sur deux continents séparés.', 'Une théorie doit aussi expliquer le mécanisme.'], 'Une théorie scientifique s\'impose quand des faits nouveaux viennent la confirmer.'),

    exoClasser('e08', 3, 'Quel mouvement de plaques explique ce phénomène ?', [
      ['une chaîne de volcans sous-marins au milieu de l\'Atlantique', 'écartement'], ['du plancher océanique tout neuf', 'écartement'],
      ['les volcans explosifs qui entourent le Pacifique', 'rapprochement'], ['la formation d\'une chaîne de montagnes', 'rapprochement'], ['des séismes à plusieurs centaines de kilomètres de profondeur', 'rapprochement'],
      ['une grande faille le long de laquelle deux plaques glissent', 'coulissage'], ['des séismes sans volcan le long d\'une faille', 'coulissage'],
    ], ['écartement', 'rapprochement', 'coulissage'], { écartement: 'Les plaques s\'éloignent : dorsale.', rapprochement: 'Les plaques convergent : subduction ou montagnes.', coulissage: 'Les plaques glissent côte à côte.' },
    ['Dorsale : écartement.', 'Subduction et montagnes : rapprochement.', 'Glissement latéral : coulissage.'], 4),

    exoDocument('e09', 3, 'Calcule une vitesse.', [
      () => {
        const v = pick([2, 4, 5, 8]), ma = pick([5, 10, 20]), km = v * ma * 10;
        return {
          enonce: `Données inventées pour l'exercice. Une roche du plancher océanique, âgée de ${ma} millions d'années, se trouve aujourd'hui à ${km} km de la dorsale où elle s'est formée.`,
          questions: [
            nombre('Quelle distance a-t-elle parcourue, en centimètres ? Donne ta réponse en millions de centimètres.', km / 10),
            nombre("À quelle vitesse la plaque s'éloigne-t-elle de la dorsale, en centimètres par an ?", v, { unite: 'cm' }),
            choix('Cette vitesse est :', 'conforme aux vitesses habituelles des plaques', 'impossible pour une plaque', 'celle d\'une coulée de lave'),
          ],
          correction: [`${km} km = ${km} × 100 000 cm = <strong>${km / 10} millions de centimètres</strong>.`, `Vitesse = distance ÷ durée = ${km / 10} millions ÷ ${ma} millions = <strong>${v} cm par an</strong>.`, 'Les plaques se déplacent de <strong>1 à 13 cm par an</strong> : cette valeur est conforme.'],
        };
      },
    ], ['1 km = 100 000 cm.', 'Vitesse = distance ÷ durée.', 'Compare aux valeurs du cours.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Les séismes et les volcans sont surtout situés :', choix: ['aux limites des plaques', "à l'intérieur des plaques", 'aux pôles', 'au hasard'], correct: 0, explication: 'Ils dessinent les frontières des plaques.' },
    { type: 'qcm', question: 'Au niveau d\'une dorsale, les plaques :', choix: ["s'écartent", 'se rapprochent', 'ne bougent pas', 'plongent'], correct: 0, explication: 'Du plancher océanique s\'y forme.' },
    { type: 'qcm', question: 'Les plaques se déplacent de quelques :', choix: ['centimètres par an', 'mètres par jour', 'kilomètres par an', 'millimètres par siècle'], correct: 0, explication: 'De l\'ordre de 1 à 13 cm par an.' },
    { type: 'vrai_faux', question: 'Dans une zone de subduction, une plaque plonge sous une autre.', reponse: true, explication: 'D\'où des séismes profonds et des volcans explosifs.' },
    {
      type: 'saisie', question: 'Déplacement.',
      generer() { const v = pick([2, 5]), ma = pick([1, 2]); return { question: `Une plaque se déplace de ${v} cm par an. Quelle distance parcourt-elle en ${ma} million${ma > 1 ? 's' : ''} d'années, en kilomètres ?`, reponse: v * ma * 10, validation: 'nombre', explication: `${v} × ${ma} 000 000 cm = ${v * ma * 10} km.` }; },
    },
    { type: 'vrai_faux', question: 'Le mouvement des plaques est lié à la chaleur interne de la Terre.', reponse: true, explication: 'Cette énergie met la matière en mouvement en profondeur.' },
  ],
};
