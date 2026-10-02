// =====================================================================
//  pr11_systeme_solaire_univers.js — Physique-chimie 4ᵉ : la matière dans
//  l'espace et dans l'Univers. Système solaire, galaxies, Univers ;
//  unités de distance (kilomètre, unité astronomique, année-lumière).
//  Plan : manuel LeLivreScolaire Physique-Chimie cycle 4, chapitre 13.
//  Valeurs vérifiées (voir js/sources.js) : Wikipédia, articles « Système
//  solaire », « Voie lactée », « Univers » et « Année-lumière ».
// =====================================================================

import { pick, dec, grandeur } from '../outils.js';
import { tableau } from '../../commun.js';
import { systemeSolaire, etapes } from '../../svt/figures.js';
import { exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../../svt/outils.js';

const DEFINITIONS = [
  ['une étoile', 'Astre très chaud qui produit sa propre lumière, comme le Soleil.'],
  ['une planète', "Astre qui tourne autour d'une étoile et ne produit pas de lumière."],
  ['une galaxie', "Immense ensemble d'étoiles, de gaz et de poussières."],
  ['la Voie lactée', 'Galaxie à laquelle appartient le système solaire.'],
  ["l'unité astronomique", 'Distance entre la Terre et le Soleil : environ 150 millions de kilomètres.'],
  ["l'année-lumière", 'Distance parcourue par la lumière dans le vide en un an.'],
  ["l'Univers", "Ensemble de tout ce qui existe : matière, énergie, espace et temps."],
];

/** Distances au Soleil, en unités astronomiques. */
const PLANETES_UA = [['Jupiter', 5.2], ['Neptune', 30]];

const pt = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>`;
const etoiles = (n, cx, cy, rx, ry) => Array.from({ length: n }, (_, k) => pt(Math.round(cx + rx * Math.cos(k * 2.4) * ((k % 7) + 2) / 8), Math.round(cy + ry * Math.sin(k * 2.4) * ((k % 5) + 2) / 6), 1.4, 'sv-planete-1')).join('');
const fond = '<rect x="0" y="0" width="320" height="180" rx="12" class="sv-espace"/>';
const SCENES = [
  ['La Terre', `${fond}${pt(160, 90, 34, 'sv-planete-2')}<text x="160" y="150" text-anchor="middle" class="sv-txt-clair">environ 12 700 km de diamètre</text>`, 'La <strong>Terre</strong> est une planète rocheuse d\'environ 12 700 km de diamètre.'],
  ['Le système solaire', `${fond}${pt(60, 90, 16, 'sv-soleil')}${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<circle cx="60" cy="90" r="${30 + k * 30}" class="sv-orbite"/>`).join('')}${pt(150, 90, 4, 'sv-planete-2')}<text x="200" y="160" text-anchor="middle" class="sv-txt-clair">Neptune est à 30 UA du Soleil</text>`, 'Huit planètes tournent autour du <strong>Soleil</strong>. La Terre en est à 1 unité astronomique, Neptune à 30.'],
  ['La Voie lactée', `${fond}<ellipse cx="160" cy="90" rx="130" ry="34" class="sv-galaxie"/>${etoiles(60, 160, 90, 124, 30)}${pt(226, 96, 3, 'sv-soleil')}<text x="160" y="160" text-anchor="middle" class="sv-txt-clair">plus de 100 000 années-lumière de diamètre</text>`, 'Le Soleil est l\'une des 200 à 400 milliards d\'étoiles de notre galaxie, la <strong>Voie lactée</strong>.'],
  ["L'Univers", `${fond}${Array.from({ length: 16 }, (_, k) => `<ellipse cx="${30 + ((k * 67) % 260)}" cy="${24 + ((k * 43) % 130)}" rx="${8 + (k % 3) * 3}" ry="${3 + (k % 2) * 2}" class="sv-galaxie" transform="rotate(${k * 37} ${30 + ((k * 67) % 260)} ${24 + ((k * 43) % 130)})"/>`).join('')}`, "L'<strong>Univers</strong> observable contient environ 100 milliards de galaxies. Son âge est d'environ 13,8 milliards d'années."],
];

export default {
  id: 'pr11',
  titre: "La matière dans l'espace et dans l'Univers",
  theme: 'pc_matiere', niveau: '4e',
  icone: '🌌',

  intro:
    "La Terre tourne autour d'une étoile, parmi des centaines de milliards d'autres, dans une galaxie parmi des dizaines de milliards. " +
    "On apprend à <strong>emboîter ces échelles</strong> et à choisir la bonne unité pour chaque distance : le kilomètre, l'unité astronomique ou l'année-lumière.",

  cours: [
    {
      type: 'definition', titre: 'Le système solaire',
      contenu: "Le <strong>Soleil</strong> est une étoile d'environ 1,4 million de kilomètres de diamètre. Huit <strong>planètes</strong> tournent autour de lui. Le système solaire s'est formé il y a un peu moins de 4,6 milliards d'années, à partir d'un nuage de gaz et de poussières.",
    },
    { type: 'figure', titre: 'Huit planètes autour du Soleil', contenu: 'Affiche les planètes rocheuses, puis les géantes.', render: (host) => systemeSolaire(host) },
    {
      type: 'propriete', titre: 'Rocheuses près du Soleil, géantes plus loin',
      contenu: "Près du Soleil, il faisait trop chaud pour que les gaz et les glaces se rassemblent : seules des planètes <strong>rocheuses</strong> s'y sont formées (Mercure, Vénus, la Terre, Mars). Plus loin, dans le froid, les planètes ont pu capter beaucoup de gaz et devenir <strong>géantes</strong> (Jupiter, Saturne, Uranus, Neptune).",
    },
    {
      type: 'definition', titre: 'Deux unités pour les grandes distances',
      contenu: "L'<strong>unité astronomique</strong> (UA) est la distance Terre-Soleil : environ 150 millions de kilomètres. Elle sert dans le système solaire. " +
        "L'<strong>année-lumière</strong> (al) est la distance parcourue par la lumière en un an : environ 9 460 milliards de kilomètres. Elle sert pour les étoiles et les galaxies.",
      formule: '1 \\text{ UA} \\approx 150 \\text{ millions de km} \\qquad 1 \\text{ al} \\approx 9\\,460 \\text{ milliards de km}',
    },
    { type: 'figure', titre: "De la Terre à l'Univers", contenu: 'Change d\'échelle, de la plus petite à la plus grande.', render: (host) => etapes(host, 'Échelle', SCENES) },
    {
      type: 'propriete', titre: 'Galaxies et Univers',
      contenu: "Le Soleil appartient à une <strong>galaxie</strong>, la Voie lactée, qui rassemble de 200 à 400 milliards d'étoiles et mesure plus de 100 000 années-lumière de diamètre. L'étoile la plus proche du Soleil, Proxima du Centaure, est à 4,22 années-lumière. L'Univers observable contient environ 100 milliards de galaxies ; son âge est d'environ 13,8 milliards d'années.",
    },
    {
      type: 'exemple', enonce: "Jupiter est à 5,2 UA du Soleil. Exprime cette distance en millions de kilomètres.",
      solution_etapes: ['1 UA = 150 millions de kilomètres.', '5,2 × 150 = 780.', 'Jupiter est à 780 millions de kilomètres du Soleil.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Choisir l\'unité adaptée', explication: "Sur Terre : le kilomètre. Dans le système solaire : l'unité astronomique. Entre les étoiles : l'année-lumière." },
    { etape: 2, titre: 'Rappeler la valeur de l\'unité', explication: "1 UA = 150 millions de km ; 1 al = 9 460 milliards de km." },
    { etape: 3, titre: 'Convertir', explication: "Pour passer en kilomètres, on multiplie par la valeur de l'unité." },
    { etape: 4, titre: 'Vérifier l\'ordre de grandeur', explication: "Une distance entre étoiles se compte en milliers de milliards de kilomètres." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Une étoile produit sa lumière.', 'Une galaxie contient des milliards d\'étoiles.', 'L\'année-lumière est une distance.']),

    exoClasser('e02', 1, 'De quel type d\'astre s\'agit-il ?', [
      ['le Soleil', 'étoile'], ['Proxima du Centaure', 'étoile'],
      ['la Terre', 'planète'], ['Jupiter', 'planète'], ['Mars', 'planète'], ['Neptune', 'planète'],
      ['la Voie lactée', 'galaxie'],
    ], ['étoile', 'planète', 'galaxie'], { étoile: 'Elle produit sa propre lumière.', planète: 'Elle tourne autour d\'une étoile.', galaxie: 'Elle rassemble des milliards d\'étoiles.' },
    ['Le Soleil est une étoile.', 'Une planète tourne autour d\'une étoile.', 'La Voie lactée est notre galaxie.'], 4),

    exoVraiFaux('e03', 1, [
      ['Le Soleil est une planète.', false, 'Non : c\'est une étoile, il produit sa propre lumière.'],
      ["L'année-lumière est une unité de durée.", false, 'Non : c\'est une distance, celle que parcourt la lumière en un an.'],
      ['La Voie lactée contient des centaines de milliards d\'étoiles.', true, 'Oui : de 200 à 400 milliards.'],
      ["L'unité astronomique est la distance entre la Terre et le Soleil.", true, 'Oui : environ 150 millions de kilomètres.'],
      ['Les planètes géantes sont les plus proches du Soleil.', false, 'Non : ce sont les plus éloignées.'],
      ["L'Univers a environ 13,8 milliards d'années.", true, 'Oui.'],
      ['Le système solaire fait partie de la Voie lactée.', true, 'Oui : le Soleil est l\'une de ses étoiles.'],
    ], ['Étoile : produit de la lumière.', 'Année-lumière : distance.', 'Géantes : loin du Soleil.']),

    exoOrdonner('e04', 1, [
      { consigne: 'Range du plus petit au plus grand :', etapes: ['la Terre', 'le Soleil', 'le système solaire', 'la Voie lactée', "l'Univers"] },
      { consigne: 'Range du plus grand au plus petit :', etapes: ["l'Univers", 'la Voie lactée', 'le système solaire', 'le Soleil', 'la Terre'] },
    ], ['Le Soleil est bien plus gros que la Terre.', 'Le système solaire est dans la Voie lactée.', 'L\'Univers contient tout.']),

    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Convertis en kilomètres :',
      generer() {
        const [nom, ua] = pick(PLANETES_UA);
        return { enonce: `${nom} se trouve à ${dec(ua)} UA du Soleil. Exprime cette distance en millions de kilomètres. (1 UA = 150 millions de km)`, reponse: Math.round(ua * 150), validation: 'nombre', _v: { nom, ua } };
      },
      indices: ['1 UA = 150 millions de km.', 'Multiplie par 150.', 'Le résultat est en millions de kilomètres.'],
      correction_etapes: (st) => [`${dec(st._v.ua)} × 150 = <strong>${Math.round(st._v.ua * 150)} millions de kilomètres</strong>.`],
    },

    exoClasser('e06', 2, 'Quelle unité est la mieux adaptée ?', [
      ['la distance Paris-Marseille', 'kilomètre'], ['le diamètre de la Terre', 'kilomètre'], ['la distance Terre-Lune', 'kilomètre'],
      ['la distance Soleil-Jupiter', 'unité astronomique'], ['la distance Soleil-Neptune', 'unité astronomique'],
      ['la distance du Soleil à Proxima du Centaure', 'année-lumière'], ['le diamètre de la Voie lactée', 'année-lumière'], ['la distance entre deux galaxies', 'année-lumière'],
    ], ['kilomètre', 'unité astronomique', 'année-lumière'], { kilomètre: 'À l\'échelle de la Terre et de son voisinage.', 'unité astronomique': 'À l\'échelle du système solaire.', 'année-lumière': 'À l\'échelle des étoiles et des galaxies.' },
    ['L\'UA sert dans le système solaire.', 'L\'année-lumière sert entre les étoiles.', 'Sur Terre, on utilise le kilomètre.'], 4),

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Calcule en milliards de kilomètres :',
      generer() {
        const n = pick([2, 3, 5, 10]);
        return { enonce: `Une étoile se trouve à ${n} années-lumière de la Terre. Exprime cette distance en milliards de kilomètres. (1 al = 9 460 milliards de km)`, reponse: 9460 * n, validation: 'nombre', _v: { n } };
      },
      indices: ['1 al = 9 460 milliards de km.', 'Multiplie par le nombre d\'années-lumière.', 'Le résultat est en milliards de kilomètres.'],
      correction_etapes: (st) => [`${st._v.n} × 9 460 = <strong>${9460 * st._v.n} milliards de kilomètres</strong>.`],
    },

    exoDocument('e08', 2, 'Exploite ce tableau.', [
      () => ({
        enonce: tableau([['Planète', 'la Terre', 'Jupiter', 'Neptune'], ['Distance au Soleil (UA)', '1', '5,2', '30'], ['Type', 'rocheuse', 'géante', 'géante']]),
        questions: [
          nombre('Combien de fois Neptune est-elle plus éloignée du Soleil que la Terre ?', 30),
          choix('Les planètes géantes de ce tableau sont :', 'plus loin du Soleil que la Terre', 'plus près du Soleil que la Terre', 'à la même distance'),
          choix('Loin du Soleil, les planètes ont pu devenir géantes car :', 'il y faisait assez froid pour capter beaucoup de gaz', 'il y faisait plus chaud', 'elles tournaient plus vite'),
        ],
        correction: ['30 ÷ 1 = <strong>30</strong> fois plus loin.', 'À 5,2 et 30 UA, elles sont <strong>plus loin</strong> que la Terre.', 'Dans le <strong>froid</strong>, gaz et glaces ont pu se rassembler.'],
      }),
    ], ['Compare les distances en UA.', 'La Terre est à 1 UA.', 'Près du Soleil, il faisait trop chaud pour retenir les gaz.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Construis une maquette :',
      generer() {
        const d = pick([7, 14, 28]);
        return { enonce: `Le Soleil a un diamètre de 1,4 million de kilomètres et la Terre en est à 150 millions de kilomètres. Dans une maquette, le Soleil est une boule de ${d} cm de diamètre. À quelle distance, en mètres, faut-il placer la Terre ?`, ...grandeur((d / 1.4) * 150 / 100, 'm', { tolerance: 0.05 }), _v: { d } };
      },
      indices: ['Cherche combien de kilomètres réels représente 1 cm de la maquette.', 'Divise le diamètre réel du Soleil par celui de la maquette.', 'Applique la même échelle à la distance Terre-Soleil, puis convertis en mètres.'],
      correction_etapes: (st) => [`1,4 million de km sont représentés par ${st._v.d} cm : 1 cm représente ${dec(1.4 / st._v.d)} million de km.`, `150 ÷ ${dec(1.4 / st._v.d)} = ${dec((st._v.d / 1.4) * 150)} cm.`, `Soit <strong>${dec((st._v.d / 1.4) * 150 / 100)} m</strong> : l'espace est surtout fait de vide.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le Soleil est :', choix: ['une étoile', 'une planète', 'une galaxie', 'un satellite'], correct: 0, explication: 'Il produit sa propre lumière.' },
    { type: 'qcm', question: "L'unité astronomique vaut environ :", choix: ['150 millions de km', '300 000 km', '9 460 milliards de km', '12 700 km'], correct: 0, explication: 'C\'est la distance Terre-Soleil.' },
    { type: 'qcm', question: "L'année-lumière est une unité de :", choix: ['distance', 'durée', 'vitesse', 'masse'], correct: 0, explication: 'La distance parcourue par la lumière en un an.' },
    { type: 'vrai_faux', question: 'La Voie lactée est la galaxie qui contient le système solaire.', reponse: true, explication: 'Elle rassemble de 200 à 400 milliards d\'étoiles.' },
    {
      type: 'saisie', question: 'Conversion.',
      generer() { const n = pick([2, 4, 10]); return { question: `Convertis ${n} UA en millions de kilomètres.`, reponse: n * 150, validation: 'nombre', explication: `${n} × 150 = ${n * 150} millions de km.` }; },
    },
    { type: 'vrai_faux', question: 'Les planètes rocheuses sont les plus proches du Soleil.', reponse: true, explication: 'Mercure, Vénus, la Terre et Mars.' },
  ],
};
