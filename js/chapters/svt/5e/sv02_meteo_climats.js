// =====================================================================
//  sv02_meteo_climats.js — SVT 5ᵉ : météo et climats.
//  Grandeurs météorologiques, anticyclones et dépressions, origine des
//  vents et des courants, zones climatiques et répartition du vivant.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 4.
//  Les relevés des exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, fleche, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['la météo', "Temps qu'il fait à un endroit, sur une courte durée."],
  ['le climat', "Moyenne des conditions météorologiques d'une région sur au moins trente ans."],
  ['un anticyclone', "Zone de hautes pressions : l'air descend, le ciel est le plus souvent dégagé."],
  ['une dépression', "Zone de basses pressions : l'air monte, des nuages se forment, il pleut souvent."],
  ['le vent', "Déplacement d'air des hautes pressions vers les basses pressions."],
  ['un courant océanique', "Déplacement d'une grande masse d'eau dans l'océan."],
  ['les précipitations', "Eau qui tombe des nuages : pluie, neige, grêle."],
];

const sol = '<rect x="0" y="150" width="320" height="30" class="sv-plein-brun"/>';
const SCENES_VENT = [
  ['Le Soleil chauffe', `${sol}<circle cx="40" cy="30" r="18" class="sv-soleil"/>${fleche(60, 46, 110, 140, 'sv-f-accent')}${fleche(70, 36, 250, 140, 'sv-f-accent')}<text x="90" y="170" text-anchor="middle" class="sv-txt-clair">sol très chauffé</text><text x="246" y="170" text-anchor="middle" class="sv-txt-clair">sol peu chauffé</text>`,
    "Le Soleil ne chauffe pas toute la surface de la Terre de la même façon : certaines zones reçoivent plus d'énergie que d'autres."],
  ["L'air monte et descend", `${sol}${fleche(90, 140, 90, 50, 'sv-f-accent')}${fleche(246, 50, 246, 140, 'sv-f-bleu')}<text x="90" y="40" text-anchor="middle" class="pc-petit">air chaud qui monte</text><text x="246" y="40" text-anchor="middle" class="pc-petit">air froid qui descend</text><text x="90" y="170" text-anchor="middle" class="sv-txt-clair">basse pression</text><text x="246" y="170" text-anchor="middle" class="sv-txt-clair">haute pression</text>`,
    "Au-dessus d'un sol chaud, l'air chauffé s'élève : la pression baisse (dépression). Ailleurs, l'air plus froid descend : la pression est élevée (anticyclone)."],
  ['Le vent souffle', `${sol}${fleche(90, 140, 90, 50, 'sv-f-accent')}${fleche(246, 50, 246, 140, 'sv-f-bleu')}${fleche(226, 132, 112, 132)}${fleche(112, 58, 226, 58)}<text x="168" y="124" text-anchor="middle" class="pc-etiquette">vent</text><text x="90" y="170" text-anchor="middle" class="sv-txt-clair">basse pression</text><text x="246" y="170" text-anchor="middle" class="sv-txt-clair">haute pression</text>`,
    "Près du sol, l'air se déplace des <strong>hautes pressions vers les basses pressions</strong> : c'est le vent. Les masses d'air transportent ainsi de la chaleur."],
];

export default {
  id: 'sv02',
  titre: 'Météo et climats',
  theme: 'svt_terre', niveau: '5e',
  icone: '⛅',

  intro:
    "Pourquoi le vent souffle-t-il ? Pourquoi fait-il toujours chaud à l'équateur et froid aux pôles ? " +
    "On apprend à lire les grandeurs d'un bulletin météo, à expliquer le <strong>vent</strong> par les différences de pression, et à relier les <strong>grandes zones climatiques</strong> aux animaux et aux plantes qui y vivent.",

  cours: [
    {
      type: 'definition', titre: 'Les grandeurs de la météo',
      contenu: "Pour décrire le temps qu'il fait, on mesure la <strong>température</strong> (thermomètre, en °C), la <strong>pression</strong> de l'air (baromètre, en hectopascals), les <strong>précipitations</strong> (pluviomètre, en millimètres), la vitesse du <strong>vent</strong> (anémomètre) et sa direction (girouette).",
    },
    {
      type: 'definition', titre: 'Anticyclone et dépression',
      contenu: "Un <strong>anticyclone</strong> est une zone de hautes pressions : l'air y descend, le ciel est généralement dégagé. Une <strong>dépression</strong> est une zone de basses pressions : l'air y monte, se refroidit, des nuages se forment et il pleut souvent.",
    },
    { type: 'figure', titre: "D'où vient le vent ?", contenu: 'Parcours les trois étapes.', render: (host) => etapes(host, 'Étape', SCENES_VENT) },
    {
      type: 'propriete', titre: 'Vents et courants transportent la chaleur',
      contenu: "La région de l'équateur reçoit plus d'énergie solaire que les pôles. Les <strong>vents</strong> (masses d'air) et les <strong>courants océaniques</strong> (masses d'eau) se mettent en mouvement et transportent de la chaleur des régions chaudes vers les régions froides.",
    },
    {
      type: 'definition', titre: 'Météo ou climat ?',
      contenu: "La <strong>météo</strong> change d'un jour à l'autre. Le <strong>climat</strong> est la moyenne des conditions météorologiques d'une région sur au moins trente ans.",
    },
    {
      type: 'propriete', titre: 'Les grandes zones climatiques',
      contenu: "On distingue une <strong>zone chaude</strong> de part et d'autre de l'équateur, deux <strong>zones tempérées</strong> et deux <strong>zones froides</strong> autour des pôles. " +
        "Chaque zone abrite des animaux et des plantes adaptés à ses conditions : ours polaire et lichens dans la zone froide, chênes et renards dans la zone tempérée, baobabs et girafes dans la zone chaude.",
    },
    {
      type: 'exemple', enonce: "Une carte météo montre un anticyclone sur la France et une dépression sur l'Irlande. Quel temps fait-il en France ? D'où à où le vent souffle-t-il ?",
      solution_etapes: ["Anticyclone : hautes pressions, l'air descend, le ciel est dégagé en France.", "Dépression : basses pressions sur l'Irlande, temps nuageux et pluvieux.", "Le vent souffle des hautes pressions vers les basses pressions : de la France vers l'Irlande."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer les pressions', explication: "Sur une carte ou un tableau, cherche la zone de haute pression (anticyclone) et la zone de basse pression (dépression)." },
    { etape: 2, titre: 'En déduire le temps', explication: "Haute pression : beau temps. Basse pression : nuages et pluie." },
    { etape: 3, titre: 'Trouver le sens du vent', explication: "Le vent va de la haute pression vers la basse pression." },
    { etape: 4, titre: 'Distinguer météo et climat', explication: "Un relevé d'un jour décrit la météo ; une moyenne sur trente ans décrit le climat." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Anticyclone : hautes pressions. Dépression : basses pressions.', 'Le climat est une moyenne sur trente ans.', 'Le vent est de l\'air qui se déplace.']),

    exoRelier('e02', 1, "Associe chaque instrument à ce qu'il mesure.", [
      ['le thermomètre', 'la température'], ['le baromètre', "la pression de l'air"], ['le pluviomètre', 'la hauteur des précipitations'], ["l'anémomètre", 'la vitesse du vent'], ['la girouette', 'la direction du vent'],
    ], ['« Thermo » évoque la chaleur.', '« Pluvio » évoque la pluie.', 'Le baromètre mesure la pression.']),

    exoClasser('e03', 1, 'Anticyclone ou dépression ?', [
      ['hautes pressions', 'anticyclone'], ["l'air descend", 'anticyclone'], ['ciel dégagé', 'anticyclone'], ['temps sec et calme', 'anticyclone'],
      ['basses pressions', 'dépression'], ["l'air monte", 'dépression'], ['ciel nuageux', 'dépression'], ['pluie fréquente', 'dépression'],
    ], ['anticyclone', 'dépression'], { anticyclone: "L'air qui descend empêche les nuages de se former.", dépression: "L'air qui monte se refroidit : sa vapeur d'eau forme des nuages." },
    ['Hautes pressions : beau temps.', 'L\'air qui monte forme des nuages.', 'Dépression : basses pressions.']),

    exoVraiFaux('e04', 1, [
      ['Le vent souffle des hautes pressions vers les basses pressions.', true, "Oui : l'air se déplace de l'anticyclone vers la dépression."],
      ["L'équateur reçoit moins d'énergie solaire que les pôles.", false, "Non : c'est l'inverse, ce qui explique la zone chaude autour de l'équateur."],
      ['Le climat se définit à partir des relevés d\'une seule journée.', false, 'Non : il faut une moyenne sur au moins trente ans.'],
      ['Les courants océaniques transportent de la chaleur.', true, 'Oui, comme les vents.'],
      ["Dans une dépression, l'air monte et des nuages se forment.", true, "Oui : en s'élevant, l'air se refroidit."],
      ["L'ours polaire vit dans la zone climatique chaude.", false, 'Non : dans la zone froide, autour du pôle Nord.'],
      ['Un pluviomètre mesure la hauteur d\'eau tombée.', true, 'Oui, en millimètres.'],
    ], ['Haute pression vers basse pression.', 'L\'équateur est la région la plus chauffée.', 'Météo : court terme. Climat : trente ans.']),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre la formation du vent :", etapes: ['Le Soleil chauffe davantage certaines régions', "L'air chaud s'élève : la pression baisse", "Ailleurs, l'air plus froid descend : la pression est élevée", "Près du sol, l'air se déplace de la haute vers la basse pression", "Ce déplacement d'air est le vent"] },
      { consigne: "Remets dans l'ordre la formation de la pluie dans une dépression :", etapes: ["L'air chaud et humide s'élève", "En montant, l'air se refroidit", "La vapeur d'eau se transforme en gouttelettes", 'Un nuage se forme', 'Les gouttes grossissent et tombent'] },
    ], ['Tout commence par le chauffage du sol.', 'L\'air chaud monte.', 'Le phénomène visible vient en dernier.']),

    exoDocument('e06', 2, 'Lis ce relevé météo.', [
      () => {
        const pA = randInt(1020, 1032), pB = randInt(990, 1004);
        const inverse = pick([true, false]);
        const [nomHaut, nomBas] = inverse ? ['B', 'A'] : ['A', 'B'];
        return {
          enonce: "Relevé inventé pour l'exercice. On mesure la pression de l'air dans deux villes le même jour." +
            tableau([['Ville', 'A', 'B'], ['Pression (hPa)', inverse ? pB : pA, inverse ? pA : pB]]),
          questions: [
            { question: 'Dans quelle ville la pression est-elle la plus élevée ?', choix: ['la ville A', 'la ville B'], correct: inverse ? 1 : 0, ordre_fixe: true },
            { question: 'Dans quelle ville le temps est-il probablement nuageux et pluvieux ?', choix: ['la ville A', 'la ville B'], correct: inverse ? 0 : 1, ordre_fixe: true },
            nombre('Quel est l\'écart de pression entre les deux villes, en hPa ?', pA - pB, { unite: 'hPa' }),
            { question: 'Le vent souffle :', choix: ['de A vers B', 'de B vers A'], correct: inverse ? 1 : 0, ordre_fixe: true },
          ],
          correction: [`La pression la plus élevée (${pA} hPa) est dans la ville <strong>${nomHaut}</strong> : anticyclone.`, `La pression la plus basse (${pB} hPa) est dans la ville <strong>${nomBas}</strong> : dépression, temps nuageux.`, `${pA} − ${pB} = <strong>${pA - pB} hPa</strong>.`, `Le vent va de la haute vers la basse pression : <strong>de ${nomHaut} vers ${nomBas}</strong>.`],
        };
      },
    ], ['Compare les deux pressions.', 'Basse pression : dépression, donc nuages.', 'Le vent va de la haute vers la basse pression.']),

    exoClasser('e07', 2, 'Dans quelle zone climatique vit cet être vivant ?', [
      ["l'ours polaire", 'zone froide'], ['le manchot empereur', 'zone froide'], ['les lichens de la toundra', 'zone froide'],
      ['le chêne', 'zone tempérée'], ['le renard roux', 'zone tempérée'], ['le hêtre', 'zone tempérée'],
      ['la girafe', 'zone chaude'], ['le baobab', 'zone chaude'], ['le perroquet ara', 'zone chaude'],
    ], ['zone froide', 'zone tempérée', 'zone chaude'], { 'zone froide': 'Ces êtres vivants supportent le froid des régions polaires.', 'zone tempérée': 'Ces êtres vivants connaissent quatre saisons marquées.', 'zone chaude': "Ces êtres vivants vivent de part et d'autre de l'équateur." },
    ['La zone chaude entoure l\'équateur.', 'Les zones froides entourent les pôles.', 'La France est en zone tempérée.'], 4),

    exoDocument('e08', 2, 'Compare deux climats.', [
      () => {
        const t1 = randInt(24, 27), t2 = randInt(10, 13), p1 = randInt(18, 24) * 100, p2 = randInt(6, 9) * 100;
        return {
          enonce: "Données inventées pour l'exercice. On compare les moyennes annuelles, calculées sur trente ans, de deux villes : l'une proche de l'équateur, l'autre en zone tempérée.",
          visuel: (host) => { host.innerHTML = schemaBarres([['ville 1', p1], ['ville 2', p2]], { unite: 'précipitations (mm par an)' }); },
          questions: [
            nombre('Combien de millimètres de précipitations la ville 1 reçoit-elle de plus que la ville 2 par an ?', p1 - p2, { unite: 'mm' }),
            choix(`La ville 1 a une température moyenne de ${t1} °C, la ville 2 de ${t2} °C. Laquelle est proche de l'équateur ?`, 'la ville 1', 'la ville 2', 'on ne peut pas le savoir'),
            choix('Ces données décrivent :', 'le climat', 'la météo du jour', 'la météo de la semaine'),
          ],
          correction: [`${p1} − ${p2} = <strong>${p1 - p2} mm</strong>.`, `La ville 1 est la plus chaude (${t1} °C) : elle est en <strong>zone chaude</strong>, près de l'équateur.`, 'Des moyennes sur trente ans décrivent le <strong>climat</strong>.'],
        };
      },
    ], ['Lis la hauteur des deux barres.', 'La zone chaude entoure l\'équateur.', 'Moyenne sur trente ans : climat.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: "Calcule l'amplitude thermique :",
      generer() {
        const min = randInt(-6, 8), max = min + randInt(12, 24);
        return { enonce: `Relevé inventé pour l'exercice. Dans une ville, la température moyenne du mois le plus froid est de ${String(min).replace('-', '−')} °C et celle du mois le plus chaud de ${max} °C. Calcule l'amplitude thermique annuelle, c'est-à-dire l'écart entre ces deux températures.`, reponse: max - min, validation: 'nombre', unite: '°C', _v: { min, max } };
      },
      indices: ['Un écart se calcule par une soustraction.', 'Plus grande valeur moins plus petite valeur.', 'Soustraire un nombre négatif revient à ajouter son opposé.'],
      correction_etapes: (st) => [`Amplitude = température la plus haute − température la plus basse.`, `${st._v.max} − (${String(st._v.min).replace('-', '−')}) = <strong>${st._v.max - st._v.min} °C</strong>.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un anticyclone est une zone de :', choix: ['hautes pressions', 'basses pressions', 'fortes pluies', 'vents violents'], correct: 0, explication: "L'air y descend : le ciel est généralement dégagé." },
    { type: 'qcm', question: 'Le vent souffle :', choix: ['des hautes pressions vers les basses pressions', 'des basses pressions vers les hautes pressions', 'toujours du nord vers le sud', 'de la mer vers la terre uniquement'], correct: 0, explication: "L'air se déplace de l'anticyclone vers la dépression." },
    { type: 'qcm', question: 'La pression de l\'air se mesure avec :', choix: ['un baromètre', 'un thermomètre', 'un pluviomètre', 'une girouette'], correct: 0, explication: 'En hectopascals.' },
    { type: 'vrai_faux', question: "La région de l'équateur reçoit plus d'énergie solaire que les pôles.", reponse: true, explication: "C'est l'origine des grandes zones climatiques." },
    { type: 'qcm', question: 'Le climat se définit sur une durée d\'au moins :', choix: ['trente ans', 'un jour', 'un mois', 'un an'], correct: 0, explication: 'C\'est une moyenne de longue durée.' },
    { type: 'vrai_faux', question: 'La girafe vit dans la zone climatique froide.', reponse: false, explication: 'Elle vit dans la zone chaude.' },
  ],
};
