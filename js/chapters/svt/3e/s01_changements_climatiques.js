// =====================================================================
//  s01_changements_climatiques.js — SVT 3ᵉ : les changements climatiques
//  actuels et passés. Météo et climat, climats du passé, effet de serre,
//  réchauffement actuel, conséquences, atténuation et adaptation.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 5.
//  Valeurs réelles vérifiées (voir js/sources.js) : NOAA (CO₂ à Mauna Loa),
//  GIEC via Wikipédia (réchauffement, niveau des mers, dernier maximum
//  glaciaire), Impact CO₂ de l'ADEME (transports).
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre, dec } from '../outils.js';
import { tableau } from '../../commun.js';
import { effetDeSerre, schemaCourbe } from '../figures.js';

const DEFINITIONS = [
  ['la météo', "Temps qu'il fait à un endroit précis, sur une courte durée (quelques heures à quelques jours)."],
  ['le climat', "Ensemble des conditions météorologiques moyennes d'une région, calculées sur au moins trente ans."],
  ["l'effet de serre", "Phénomène naturel par lequel certains gaz de l'atmosphère retiennent une partie de la chaleur émise par la surface de la Terre."],
  ['un gaz à effet de serre', "Gaz de l'atmosphère, comme le dioxyde de carbone ou le méthane, qui retient la chaleur."],
  ['une énergie fossile', "Charbon, pétrole ou gaz naturel : sa combustion rejette du dioxyde de carbone."],
  ["l'atténuation", 'Ensemble des actions qui réduisent les émissions de gaz à effet de serre.'],
  ["l'adaptation", 'Ensemble des actions qui limitent les dégâts causés par le changement climatique.'],
];

/** Teneur de l'air en CO₂ (ppm), moyennes annuelles mesurées à Mauna Loa (NOAA), arrondies à l'unité. */
const MESURES = [[1960, 317], [1980, 339], [2000, 370], [2020, 414]];

const DOCUMENTS_CO2 = [
  () => {
    const [an, ppm] = pick(MESURES);
    return {
      enonce: "Le graphique montre la teneur de l'air en dioxyde de carbone (CO₂), mesurée à l'observatoire de Mauna Loa (Hawaï). Par ailleurs, la décennie 2011-2020 a été plus chaude d'environ 1,1 °C que la période 1850-1900.",
      visuel: (host) => { host.innerHTML = schemaCourbe(MESURES.map((m) => [m[0], m[1]]), { xLabel: 'année', yLabel: 'CO₂ (ppm)', ymin: 300, ymax: 420 }); },
      questions: [
        nombre(`Quelle était la teneur en CO₂ en ${an}, en ppm ?`, ppm, { unite: 'ppm', tolerance: 3 }),
        nombre('De combien de ppm la teneur en CO₂ a-t-elle augmenté entre 1960 et 2020 ?', 97, { unite: 'ppm', tolerance: 4 }),
        choix('Le CO₂ est un gaz à effet de serre. Sa hausse contribue donc :', 'au réchauffement du climat', 'au refroidissement du climat', 'à la stabilité du climat'),
      ],
      correction: [`On lit sur le graphique : <strong>${ppm} ppm</strong> en ${an}.`, '414 − 317 = <strong>97 ppm</strong> de plus en soixante ans.', "Un gaz à effet de serre retient la chaleur émise par le sol : plus il y en a, plus le climat <strong>se réchauffe</strong>. C'est ce que l'on observe : environ +1,1 °C."],
    };
  },
];

const DOCUMENTS_PASSE = [
  () => ({
    enonce: "Cas simplifié. Dans une tourbière, on prélève une carotte de sédiments. Les grains de pollen fossiles qu'elle contient renseignent sur la végétation du passé. Les herbes de steppe poussent sous un climat froid et sec, les chênes et les noisetiers sous un climat tempéré." +
      tableau([['Âge du niveau', 'il y a 18 000 ans', 'il y a 8 000 ans'], ["Pollens d'herbes de steppe", '85 %', '10 %'], ['Pollens de chêne et de noisetier', '5 %', '75 %']]),
    questions: [
      choix('Quelle végétation dominait il y a 18 000 ans ?', 'une steppe', 'une forêt de chênes', 'une forêt tropicale'),
      choix('Le climat de la région était alors :', 'plus froid et plus sec qu\'aujourd\'hui', 'le même qu\'aujourd\'hui', 'plus chaud qu\'aujourd\'hui'),
      choix('Entre 18 000 ans et 8 000 ans, le climat :', "s'est réchauffé", "s'est refroidi", "n'a pas changé"),
    ],
    correction: ['Il y a 18 000 ans, 85 % des pollens viennent d\'herbes de <strong>steppe</strong>.', 'Ces plantes poussent sous un climat <strong>froid et sec</strong> : c\'était une période glaciaire.', 'Il y a 8 000 ans, les arbres de climat tempéré dominent : le climat <strong>s\'est réchauffé</strong>, naturellement et sur des milliers d\'années.'],
  }),
  () => ({
    enonce: "En Antarctique, la glace emprisonne des bulles d'air très anciennes. Leur analyse donne la teneur de l'air en CO₂ et la température à différentes époques." +
      tableau([['Époque', 'dernière glaciation (il y a 21 000 ans)', "avant l'ère industrielle", 'en 2020'], ['CO₂ (ppm)', 'environ 190', '280', '414'], ['Température mondiale', "3 à 6 °C de moins qu'aujourd'hui", 'référence', 'environ +1,1 °C']]),
    questions: [
      choix('Quand la teneur en CO₂ était de 190 ppm, le climat était :', 'beaucoup plus froid', 'plus chaud', "identique à celui d'aujourd'hui"),
      nombre("De combien de ppm le CO₂ a-t-il augmenté entre l'époque préindustrielle et 2020 ?", 134, { unite: 'ppm' }),
      choix('Cette dernière hausse se distingue des variations passées car elle est :', 'très rapide et due aux activités humaines', 'très lente et naturelle', 'sans effet sur la température'),
    ],
    correction: ['À 190 ppm, la température était plus basse de 3 à 6 °C : une <strong>période glaciaire</strong>.', '414 − 280 = <strong>134 ppm</strong> en moins de deux siècles.', "Il avait fallu des milliers d'années pour passer de 190 à 280 ppm ; cette hausse-ci est <strong>bien plus rapide</strong> et vient des activités humaines."],
  }),
];

export default {
  id: 's01',
  titre: 'Les changements climatiques actuels et passés',
  theme: 'svt_terre', niveau: '3e',
  icone: '🌡️',

  intro:
    "Il y a 21 000 ans, au plus fort de la dernière glaciation, le niveau des mers était 125 m plus bas qu'aujourd'hui. Le climat de la Terre a toujours changé, mais lentement. " +
    "Depuis 150 ans, il se réchauffe à une vitesse inédite. On apprend à lire les <strong>indices des climats passés</strong>, à comprendre l'<strong>effet de serre</strong> et à distinguer ce qu'on peut faire pour limiter le réchauffement et s'y préparer.",

  cours: [
    {
      type: 'definition', titre: 'Météo et climat',
      contenu: "La <strong>météo</strong> décrit le temps qu'il fait à un endroit, pour quelques heures ou quelques jours. Le <strong>climat</strong> est la moyenne des conditions météorologiques d'une région sur au moins <strong>trente ans</strong>. " +
        "Un hiver très froid est un événement météo ; il ne dit rien, à lui seul, de l'évolution du climat.",
    },
    {
      type: 'propriete', titre: 'Le climat a changé dans le passé',
      contenu: "La Terre a connu des <strong>périodes glaciaires</strong> et des périodes plus chaudes. Il y a environ 21 000 ans, la température moyenne était plus basse de 3 à 6 °C et le niveau des mers 125 m plus bas. " +
        "On le sait grâce à des indices : les <strong>pollens fossiles</strong> (quelle végétation poussait), les <strong>bulles d'air</strong> piégées dans les glaces, les fossiles.",
    },
    {
      type: 'definition', titre: "L'effet de serre",
      contenu: "Le Soleil chauffe la surface de la Terre, qui renvoie de la chaleur vers l'espace. Des gaz de l'atmosphère en retiennent une partie : ce sont les <strong>gaz à effet de serre</strong> (vapeur d'eau, dioxyde de carbone CO₂, méthane CH₄). " +
        "Ce phénomène est naturel et indispensable : sans lui, il ferait −18 °C en moyenne au lieu de +15 °C environ.",
    },
    { type: 'figure', titre: 'Plus de CO₂, plus de chaleur retenue', contenu: "Fais varier la teneur de l'air en CO₂ : la part de chaleur renvoyée vers le sol change, la température aussi.", render: (host) => effetDeSerre(host) },
    {
      type: 'propriete', titre: 'Le réchauffement actuel',
      contenu: "Depuis la fin du XIXᵉ siècle, la température moyenne mondiale a augmenté d'environ <strong>1,1 °C</strong>. La teneur de l'air en CO₂ est passée de 280 ppm à plus de 420 ppm. " +
        "Cette hausse vient des <strong>activités humaines</strong> : combustion du charbon, du pétrole et du gaz, déforestation, élevage (qui émet du méthane). Elle est beaucoup plus rapide que les changements naturels du passé.",
    },
    {
      type: 'propriete', titre: 'Les conséquences',
      contenu: "Fonte des glaciers et de la banquise, montée du niveau des mers (environ 20 cm depuis 1900), vagues de chaleur et sécheresses plus fréquentes, pluies plus intenses, déplacement ou disparition d'espèces.",
    },
    {
      type: 'definition', titre: 'Atténuer et s\'adapter',
      contenu: "L'<strong>atténuation</strong> s'attaque à la cause : réduire les émissions de gaz à effet de serre (moins d'énergies fossiles, transports sobres, isolation des bâtiments, protection des forêts). " +
        "L'<strong>adaptation</strong> limite les dégâts : digues, villes plus végétalisées, cultures résistantes à la sécheresse, plans canicule.",
    },
    {
      type: 'exemple', enonce: "Février a été plus froid que la normale en France. Peut-on dire que le climat ne se réchauffe pas ?",
      solution_etapes: ["Un mois froid dans un pays est un événement <strong>météo</strong> : court et local.", "Le climat se mesure sur trente ans au moins et, ici, à l'échelle du globe.", "Sur cette durée, la température moyenne mondiale augmente : le climat se réchauffe bien."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lire les axes', explication: "Sur un graphique, repère la grandeur portée sur chaque axe et son unité (année, ppm, °C)." },
    { etape: 2, titre: 'Relever des valeurs', explication: "Lis une valeur de départ et une valeur d'arrivée, puis calcule l'écart : « de 317 à 414 ppm, soit 97 ppm de plus »." },
    { etape: 3, titre: 'Décrire la tendance', explication: "La grandeur augmente, diminue ou reste stable ? Lentement ou rapidement ?" },
    { etape: 4, titre: 'Mettre en relation', explication: "Compare deux documents : si le CO₂ et la température augmentent ensemble, et que l'on sait que le CO₂ retient la chaleur, on peut expliquer le lien." },
  ],

  exercices: [
    exoClasser('e01', 1, 'Météo ou climat ?', [
      ['il pleuvra demain après-midi à Lyon', 'météo'], ['un orage a éclaté hier soir', 'météo'], ['il a gelé cette nuit', 'météo'], ['le vent soufflera à 60 km/h ce week-end', 'météo'],
      ['en moyenne, il pleut plus souvent à Brest qu\'à Marseille', 'climat'], ['les hivers sont doux et humides en Bretagne', 'climat'], ['la température moyenne mondiale a gagné 1,1 °C en 150 ans', 'climat'], ['les étés sont chauds et secs autour de la Méditerranée', 'climat'],
    ], ['météo', 'climat'], { météo: 'Courte durée, lieu précis.', climat: 'Moyenne sur au moins trente ans.' },
    ['La météo change d\'un jour à l\'autre.', 'Le climat est une moyenne sur une longue durée.', 'Cherche les mots « demain », « hier », « en moyenne », « les hivers ».']),

    exoDefinition('e02', 1, DEFINITIONS, ['Météo : court terme. Climat : trente ans.', 'Atténuer = agir sur la cause. S\'adapter = limiter les dégâts.', 'Le CO₂ et le méthane sont des gaz à effet de serre.']),

    exoVraiFaux('e03', 1, [
      ["L'effet de serre est un phénomène naturel.", true, 'Oui : sans lui, la température moyenne serait de −18 °C. Ce sont les activités humaines qui le renforcent.'],
      ['Le climat de la Terre n\'avait jamais changé avant le XXᵉ siècle.', false, 'Non : la Terre a connu des périodes glaciaires et des périodes chaudes. C\'est la rapidité du changement actuel qui est inédite.'],
      ['Un été très chaud suffit à prouver le réchauffement climatique.', false, 'Non : c\'est un événement météo. Le climat s\'étudie sur trente ans au moins.'],
      ['Le dioxyde de carbone est un gaz à effet de serre.', true, 'Oui, comme le méthane et la vapeur d\'eau.'],
      ['La combustion du pétrole rejette du dioxyde de carbone.', true, 'Oui : charbon, pétrole et gaz sont des énergies fossiles, riches en carbone.'],
      ['Les pollens fossiles renseignent sur les climats du passé.', true, 'Oui : ils indiquent quelles plantes poussaient, donc quel climat régnait.'],
      ['Le niveau des mers baisse depuis un siècle.', false, 'Non : il monte, d\'environ 20 cm depuis 1900 (fonte des glaces, dilatation de l\'eau qui se réchauffe).'],
    ], ['Naturel ne veut pas dire sans danger quand on le renforce.', 'Distingue météo et climat.', 'Relis les conséquences du réchauffement.']),

    exoOrdonner('e04', 2, [
      { consigne: "Remets dans l'ordre le mécanisme de l'effet de serre :", etapes: ['Le Soleil éclaire la Terre', 'La surface de la Terre se réchauffe', "La surface renvoie de la chaleur vers l'espace", 'Les gaz à effet de serre retiennent une partie de cette chaleur', "La température de l'air près du sol augmente"] },
      { consigne: 'Remets dans l\'ordre cette chaîne de conséquences :', etapes: ['Les activités humaines brûlent du charbon, du pétrole et du gaz', "La teneur de l'air en CO₂ augmente", "L'effet de serre se renforce", 'La température moyenne mondiale augmente', 'Les glaciers fondent et le niveau des mers monte'] },
    ], ['Tout commence par le Soleil, ou par une activité humaine.', 'Les gaz à effet de serre agissent sur la chaleur renvoyée par le sol.', 'La conséquence visible vient en dernier.']),

    exoDocument('e05', 2, 'Exploite ces mesures.', DOCUMENTS_CO2, ['Repère l\'année sur l\'axe horizontal, puis lis la hauteur du point.', 'Un écart se calcule par une soustraction.', 'Compare l\'évolution du CO₂ et celle de la température.']),

    exoClasser('e06', 2, 'Quel gaz à effet de serre cette activité émet-elle surtout ?', [
      ['rouler en voiture à essence', 'dioxyde de carbone'], ['produire de l\'électricité dans une centrale à charbon', 'dioxyde de carbone'], ['se chauffer au fioul', 'dioxyde de carbone'], ['prendre l\'avion', 'dioxyde de carbone'], ['brûler une forêt pour la défricher', 'dioxyde de carbone'],
      ['élever des vaches', 'méthane'], ['cultiver du riz en rizière inondée', 'méthane'], ['laisser fermenter des déchets en décharge', 'méthane'],
    ], ['dioxyde de carbone', 'méthane'], { 'dioxyde de carbone': 'Toute combustion de matière riche en carbone rejette du CO₂.', méthane: 'Le méthane vient de la fermentation (digestion des ruminants, milieux sans air).' },
    ['Une combustion produit du dioxyde de carbone.', 'Le méthane se forme là où de la matière se décompose sans air.', 'Les ruminants rejettent du méthane en digérant.'], 4),

    exoDocument('e07', 2, 'Reconstitue un climat du passé.', DOCUMENTS_PASSE, ['Chaque plante a ses exigences : elle renseigne sur le climat.', 'Compare les deux époques ligne par ligne.', 'Un changement naturel s\'étale sur des milliers d\'années.']),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Calcule :',
      generer() {
        if (pick([true, false])) {
          const d = pick([300, 400, 500, 800]);
          return { enonce: `D'après l'ADEME, parcourir 100 km émet environ 11 kg de CO₂ en voiture thermique et environ 0,2 kg en TGV. Pour un trajet de ${d} km, combien de kilogrammes de CO₂ évite-t-on en prenant le train plutôt que la voiture ?`, reponse: (d * 10.8) / 100, validation: 'nombre', unite: 'kg', tolerance: 0.3, _v: { cas: 'trajet', d } };
        }
        const n = pick([10, 20, 50]);
        return { enonce: `Le niveau moyen des mers monte actuellement d'environ 3,7 mm par an. À ce rythme, de combien de centimètres aura-t-il monté dans ${n} ans ?`, reponse: (n * 3.7) / 10, validation: 'nombre', unite: 'cm', tolerance: 0.06, _v: { cas: 'mer', n } };
      },
      indices: ['Commence par la différence pour 100 km, ou par la hausse en millimètres.', '1 cm = 10 mm.', 'Multiplie, puis convertis si besoin.'],
      correction_etapes: (st) => (st._v.cas === 'trajet'
        ? ['Pour 100 km, le train évite 11 − 0,2 = 10,8 kg de CO₂.', `${st._v.d} km = ${st._v.d / 100} × 100 km.`, `${st._v.d / 100} × 10,8 = <strong>${dec((st._v.d * 10.8) / 100)} kg</strong> de CO₂ évités.`]
        : [`${st._v.n} × 3,7 = ${dec(st._v.n * 3.7)} mm.`, `Soit <strong>${dec((st._v.n * 3.7) / 10)} cm</strong>.`]),
    },

    exoClasser('e09', 3, 'Atténuation ou adaptation ?', [
      ['remplacer une chaudière au fioul par une pompe à chaleur', 'atténuation'], ['prendre le train plutôt que l\'avion', 'atténuation'], ['isoler les logements', 'atténuation'], ['installer des panneaux solaires', 'atténuation'], ['replanter des forêts', 'atténuation'],
      ['construire une digue contre la montée de la mer', 'adaptation'], ['planter des arbres en ville pour rafraîchir les rues', 'adaptation'], ['cultiver des variétés résistantes à la sécheresse', 'adaptation'], ['organiser un plan canicule', 'adaptation'], ['déplacer des habitations menacées par l\'érosion du littoral', 'adaptation'],
    ], ['atténuation', 'adaptation'], { atténuation: 'Ces actions réduisent les émissions ou captent du CO₂ : elles agissent sur la cause.', adaptation: 'Ces actions protègent des effets déjà là : elles limitent les dégâts.' },
    ['Atténuer : émettre moins de gaz à effet de serre.', 'S\'adapter : se protéger des conséquences.', 'Demande-toi : la teneur en CO₂ de l\'air en est-elle changée ?']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le climat se définit sur une durée d\'au moins :', choix: ['trente ans', 'une semaine', 'un an', 'trois mois'], correct: 0, explication: 'Le climat est une moyenne sur trente ans au moins.' },
    { type: 'qcm', question: 'Lequel de ces gaz est un gaz à effet de serre ?', choix: ['le dioxyde de carbone', 'le diazote', 'le dioxygène', "l'argon"], correct: 0, explication: 'Le CO₂ retient la chaleur ; diazote et dioxygène, les deux gaz principaux de l\'air, non.' },
    { type: 'vrai_faux', question: 'Sans effet de serre, la Terre serait plus chaude.', reponse: false, explication: 'Elle serait bien plus froide : −18 °C en moyenne.' },
    { type: 'qcm', question: 'Le réchauffement actuel est dû principalement :', choix: ['aux activités humaines', 'aux volcans', 'à la Lune', 'aux marées'], correct: 0, explication: 'Combustion des énergies fossiles, déforestation, élevage.' },
    { type: 'qcm', question: 'Un indice des climats passés :', choix: ['les pollens fossiles', 'le bulletin météo', 'la couleur du ciel', 'les marées'], correct: 0, explication: 'Les pollens indiquent la végétation, donc le climat de l\'époque.' },
    { type: 'vrai_faux', question: 'Construire une digue est une action d\'adaptation.', reponse: true, explication: 'Elle protège des effets (montée des mers) sans réduire les émissions.' },
  ],
};
