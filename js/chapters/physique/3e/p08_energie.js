// =====================================================================
//  p08_energie.js — Physique-chimie 3ᵉ : la conservation de l'énergie.
//  Formes et sources d'énergie, conversions (chaîne énergétique),
//  conservation, énergie cinétique Ec = ½ m v², énergie de position,
//  sécurité routière (distances de réaction, de freinage, d'arrêt).
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur, tolRel } from '../outils.js';
import { cuvetteEnergie, freinage } from '../figures.js';
import { tableau } from '../../commun.js';

const t = (x, n = 2) => dec(arrondi(x, n)).replace(',', '{,}');

const CONVERTISSEURS = [
  ['un panneau solaire photovoltaïque', 'lumineuse', 'électrique'], ['une éolienne', 'cinétique (du vent)', 'électrique'],
  ['une pile', 'chimique', 'électrique'], ['un moteur électrique', 'électrique', 'mécanique (cinétique)'],
  ['un radiateur électrique', 'électrique', 'thermique'], ['une lampe', 'électrique', 'lumineuse (et thermique)'],
  ['un barrage hydroélectrique', 'de position (de l\'eau)', 'électrique'], ['le corps humain', 'chimique (des aliments)', 'mécanique et thermique'],
];

export default {
  id: 'p08',
  titre: "La conservation de l'énergie",
  theme: 'pc_energie', niveau: '3e',
  icone: '🎢',

  intro:
    "Une voiture qui roule, un skateur en haut d'une rampe, une pile, un rayon de soleil : tous possèdent de l'<strong>énergie</strong>, sous des formes différentes. " +
    "L'énergie ne se crée pas et ne disparaît pas : elle se <strong>convertit</strong> d'une forme à une autre. " +
    "Comprendre l'énergie d'une voiture en mouvement explique aussi pourquoi la vitesse est si dangereuse au volant.",

  cours: [
    {
      type: 'definition', titre: "Formes et sources d'énergie",
      contenu: "L'énergie existe sous plusieurs <strong>formes</strong> : cinétique (liée au mouvement), de position (liée à la hauteur), thermique, électrique, chimique, lumineuse, nucléaire. Son unité est le <strong>joule</strong> (J). " +
        "Les <strong>sources</strong> sont <strong>renouvelables</strong> (Soleil, vent, eau, biomasse, géothermie) ou <strong>non renouvelables</strong> (pétrole, gaz, charbon, uranium), dont les réserves s'épuisent.",
    },
    {
      type: 'propriete', titre: 'Conversion et conservation',
      contenu: "Un <strong>convertisseur</strong> transforme une forme d'énergie en une autre. On le représente par une <strong>chaîne énergétique</strong>. L'énergie totale <strong>se conserve</strong> : l'énergie reçue est égale à la somme de l'énergie utile et de l'énergie « perdue » (le plus souvent de la chaleur). Plus la part utile est grande, meilleur est le <strong>rendement</strong>.",
      formule: 'E_{\\text{reçue}} = E_{\\text{utile}} + E_{\\text{perdue}}',
    },
    {
      type: 'definition', titre: 'Énergie cinétique',
      contenu: "Un objet de masse $m$ (en kg) qui se déplace à la vitesse $v$ (en m/s) possède une <strong>énergie cinétique</strong> $E_c$ (en J). Elle est proportionnelle à la masse et au <strong>carré</strong> de la vitesse : si la vitesse double, l'énergie cinétique est multipliée par 4.",
      formule: 'E_c = \\dfrac{1}{2} \\times m \\times v^2',
    },
    {
      type: 'propriete', titre: 'Énergie de position et chute',
      contenu: "Un objet en hauteur possède une <strong>énergie de position</strong>, d'autant plus grande qu'il est haut et lourd. En tombant, cette énergie se convertit en énergie cinétique : il accélère. Sans frottements, la somme des deux (<strong>énergie mécanique</strong>) reste constante ; avec frottements, une partie devient de l'énergie thermique.",
    },
    { type: 'figure', titre: 'La bille dans la cuvette', contenu: "Observe les barres : Ep (position), Ec (cinétique) et Q (thermique). Active les frottements.", render: (host) => cuvetteEnergie(host) },
    {
      type: 'propriete', titre: "Distance d'arrêt d'un véhicule",
      contenu: "Distance d'arrêt = distance de <strong>réaction</strong> (parcourue pendant le temps de réaction du conducteur, environ 1 s, à vitesse constante) + distance de <strong>freinage</strong> (pendant laquelle les freins dissipent l'énergie cinétique en chaleur). Comme $E_c$ dépend de $v^2$, la distance de freinage est multipliée par 4 quand la vitesse double. Elle augmente aussi sur route mouillée. Les distances de freinage utilisées ici sont celles de la Sécurité routière (décélération de 7 m/s par seconde sur route sèche).",
      formule: 'd_A = d_R + d_F \\qquad d_R = v \\times t_R',
    },
    { type: 'figure', titre: "Simulateur de freinage", contenu: "Règle la vitesse et l'état de la route.", render: (host) => freinage(host) },
    {
      type: 'exemple', enonce: 'Calcule l\'énergie cinétique d\'une voiture de $1\\,000$ kg roulant à $20$ m/s.',
      solution_etapes: ['$E_c = \\dfrac{1}{2} \\times m \\times v^2 = 0{,}5 \\times 1\\,000 \\times 20^2$.', '$E_c = 0{,}5 \\times 1\\,000 \\times 400 = 200\\,000$ J, soit $200$ kJ.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Unités du système international', explication: 'm en kg, v en m/s (km/h ÷ 3,6). Sinon le résultat n\'est pas en joules.' },
    { etape: 2, titre: 'Élever la vitesse au carré', explication: "$v^2 = v \\times v$ : c'est le piège le plus fréquent." },
    { etape: 3, titre: 'Multiplier', explication: '$E_c = 0{,}5 \\times m \\times v^2$.' },
    { etape: 4, titre: 'Conclure', explication: 'Résultat en J (ou kJ : ÷ 1 000). Interprète : plus d\'énergie cinétique = freinage plus long.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: "Calcule l'énergie cinétique (en J) :",
      generer() {
        const [objet, m, v] = pick([['un ballon', 0.4, pick([10, 15, 20])], ['un cycliste et son vélo', pick([70, 80, 90]), pick([5, 6, 8])], ['une balle de tennis', 0.06, pick([30, 40, 50])], ['un chat qui court', 4, pick([5, 8, 10])], ['un scooter', pick([120, 150]), pick([10, 12, 14])]]);
        const Ec = arrondi(0.5 * m * v * v, 3);
        return {
          enonce: `Calcule l'énergie cinétique d'${objet.replace(/^un /, 'un ').replace(/^une /, 'une ')} de masse ${dec(m)} kg qui se déplace à ${v} m/s.`,
          ...grandeur(Ec, 'J', { tolerance: tolRel(Ec, 0.5), pieges: [{ valeur: arrondi(0.5 * m * v, 3), message: "La vitesse doit être élevée au carré : v² = v × v." }, { valeur: arrondi(m * v * v, 3), message: 'N\'oublie pas le ½ dans la formule.' }] }),
          _v: { m, v, Ec },
        };
      },
      indices: ['$E_c = \\dfrac{1}{2} \\times m \\times v^2$.', 'Commence par calculer $v^2$.', 'Résultat en joules (J).'],
      correction_etapes: (st) => [`$v^2 = ${st._v.v}^2 = ${st._v.v * st._v.v}$.`, `$E_c = 0{,}5 \\times ${t(st._v.m)} \\times ${st._v.v * st._v.v} = ${t(st._v.Ec, 3)}$ J.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Conversion d\'énergie :',
      generer() {
        const [conv, entree, sortie] = pick(CONVERTISSEURS);
        const autres = CONVERTISSEURS.filter((c) => c[1] !== entree || c[2] !== sortie).map((c) => `${c[1]} → ${c[2]}`);
        return { enonce: `Quelle conversion d'énergie réalise ${conv} ?`, choix: [`${entree} → ${sortie}`, `${sortie} → ${entree}`, ...autres.filter((a) => a !== `${sortie} → ${entree}`).slice(0, 2)], correct: 0, _v: { conv, entree, sortie } };
      },
      indices: ["Quelle énergie l'appareil reçoit-il ?", "Quelle énergie fournit-il (l'énergie utile) ?", 'Énergie reçue → énergie utile.'],
      correction_etapes: (st) => [`${st._v.conv[0].toUpperCase() + st._v.conv.slice(1)} reçoit de l'énergie ${st._v.entree} et fournit de l'énergie ${st._v.sortie}.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: "Énergie cinétique d'un véhicule (en kJ) :",
      generer() {
        const m = pick([800, 1000, 1200, 1500]), kmh = pick([36, 54, 72, 90, 108]), v = kmh / 3.6, Ec = 0.5 * m * v * v;
        return {
          enonce: `Une voiture de ${m} kg roule à ${kmh} km/h. Calcule son énergie cinétique en kJ.`,
          ...grandeur(arrondi(Ec / 1000, 3), 'kJ', { tolerance: 0.5, pieges: [{ valeur: arrondi((0.5 * m * kmh * kmh) / 1000, 3), message: 'La vitesse doit être en m/s : divise les km/h par 3,6 avant de calculer.' }] }),
          _v: { m, kmh, v, Ec },
        };
      },
      indices: ['Convertis la vitesse en m/s : ÷ 3,6.', '$E_c = 0{,}5 \\times m \\times v^2$ donne des joules.', '1 kJ = 1 000 J.'],
      correction_etapes: (st) => [`$v = ${st._v.kmh} \\div 3{,}6 = ${t(st._v.v)}$ m/s.`, `$E_c = 0{,}5 \\times ${st._v.m} \\times ${t(st._v.v)}^2 = ${t(st._v.Ec, 0)}$ J.`, `Soit $${t(st._v.Ec / 1000, 1)}$ kJ.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Effet de la vitesse :',
      generer() {
        const k = pick([2, 3]);
        return { enonce: `Un véhicule roule ${k === 2 ? 'deux' : 'trois'} fois plus vite. Son énergie cinétique est :`, choix: [`multipliée par ${k * k}`, `multipliée par ${k}`, `divisée par ${k}`, 'inchangée'], correct: 0, _v: { k } };
      },
      indices: ["$E_c$ dépend de $v^2$.", `Si $v$ est multipliée par k, $v^2$ est multipliée par k².`, 'La masse ne change pas.'],
      correction_etapes: (st) => [`$v$ est multipliée par ${st._v.k}, donc $v^2$ par $${st._v.k}^2 = ${st._v.k * st._v.k}$.`, `L'énergie cinétique est <strong>multipliée par ${st._v.k * st._v.k}</strong> (et la distance de freinage aussi).`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Distance de réaction (en m) :',
      generer() {
        const kmh = pick([36, 54, 72, 90, 108, 126]), tr = pick([1, 1, 1.5, 2]), d = (kmh / 3.6) * tr;
        return {
          enonce: `Un conducteur roule à ${kmh} km/h. Son temps de réaction est ${dec(tr)} s${tr > 1 ? ' (il est fatigué ou distrait)' : ''}. Quelle distance parcourt-il avant de commencer à freiner ?`,
          ...grandeur(arrondi(d, 2), 'm', { tolerance: 0.5, pieges: [{ valeur: kmh * tr, message: 'Convertis d\'abord la vitesse en m/s (÷ 3,6).' }] }),
          _v: { kmh, tr, d },
        };
      },
      indices: ['Pendant la réaction, la vitesse est constante.', '$d_R = v \\times t_R$ avec $v$ en m/s.', 'km/h ÷ 3,6 = m/s.'],
      correction_etapes: (st) => [`$v = ${st._v.kmh} \\div 3{,}6 = ${t(st._v.kmh / 3.6)}$ m/s.`, `$d_R = ${t(st._v.kmh / 3.6)} \\times ${t(st._v.tr)} = ${t(st._v.d)}$ m.`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'énergie peut disparaître.", reponse: false, _v: { e: "Non : elle se conserve ; elle se convertit en d'autres formes (souvent de la chaleur)." } },
          { enonce: 'Le vent est une source d\'énergie renouvelable.', reponse: true, _v: { e: 'Oui, comme le Soleil ou l\'eau.' } },
          { enonce: "Le pétrole est une source d'énergie renouvelable.", reponse: false, _v: { e: "Non : ses réserves s'épuisent à l'échelle humaine." } },
          { enonce: 'Un objet immobile a une énergie cinétique nulle.', reponse: true, _v: { e: 'Oui : v = 0 donne Ec = 0.' } },
          { enonce: 'Sur route mouillée, la distance de freinage augmente.', reponse: true, _v: { e: 'Oui : les pneus adhèrent moins, le freinage est moins efficace.' } },
        ]);
      },
      indices: ["L'énergie se conserve.", 'Renouvelable : ne s\'épuise pas.', 'Ec dépend de la vitesse.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: "Distance d'arrêt (en m) :",
      generer() {
        const kmh = pick([50, 70, 90, 110, 130]), v = kmh / 3.6, dR = v, dF = Math.round((v * v) / 14), dA = dR + dF;
        return {
          enonce: `Un conducteur roule à ${kmh} km/h (temps de réaction : 1 s). Sa distance de freinage est de ${dF} m. Calcule sa distance d'arrêt.` + tableau([['Vitesse', `${kmh} km/h`], ['Temps de réaction', '1 s'], ['Distance de freinage', `${dF} m`]]),
          ...grandeur(arrondi(dA, 1), 'm', { tolerance: 1, pieges: [{ valeur: kmh + dF, message: 'La distance de réaction se calcule avec la vitesse en m/s (÷ 3,6).' }] }),
          _v: { kmh, v, dR, dF, dA },
        };
      },
      indices: ["$d_A = d_R + d_F$.", '$d_R = v \\times 1$ s, avec $v$ en m/s.', 'Additionne les deux distances.'],
      correction_etapes: (st) => [`$d_R = ${st._v.kmh} \\div 3{,}6 \\times 1 \\approx ${t(st._v.dR, 1)}$ m.`, `$d_A = ${t(st._v.dR, 1)} + ${st._v.dF} \\approx ${t(st._v.dA, 1)}$ m.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "Retrouve la vitesse (en m/s) :",
      generer() {
        const m = pick([2, 4, 8, 50, 100]), v = pick([2, 3, 4, 5, 6, 10]), Ec = 0.5 * m * v * v;
        return {
          enonce: `Un objet de ${m} kg a une énergie cinétique de ${dec(Ec)} J. Quelle est sa vitesse ?`,
          ...grandeur(v, 'm/s', { tolerance: 0.02, pieges: [{ valeur: (2 * Ec) / m, message: "Tu as trouvé v² : il reste à prendre la racine carrée." }] }),
          _v: { m, v, Ec },
        };
      },
      indices: ['$E_c = \\dfrac{1}{2} m v^2$, donc $v^2 = \\dfrac{2 E_c}{m}$.', 'Calcule $v^2$.', 'Puis $v = \\sqrt{v^2}$.'],
      correction_etapes: (st) => [`$v^2 = \\dfrac{2 \\times ${t(st._v.Ec)}}{${st._v.m}} = ${st._v.v * st._v.v}$.`, `$v = \\sqrt{${st._v.v * st._v.v}} = ${st._v.v}$ m/s.`],
    },
    {
      id: 'e09', niveau: 3, type: 'ordonner_etapes', consigne: "Remets dans l'ordre la chaîne énergétique d'un barrage :",
      generer() {
        return { etapes: ["L'eau retenue en hauteur possède de l'énergie de position", "En descendant dans la conduite, l'eau acquiert de l'énergie cinétique", "L'eau fait tourner la turbine (énergie mécanique)", "L'alternateur convertit l'énergie mécanique en énergie électrique", "L'électricité est transportée jusqu'aux habitations"] };
      },
      indices: ["Tout commence avec l'eau en hauteur.", 'Position → mouvement.', "L'alternateur produit l'électricité."],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'unité d'énergie est :", choix: ['le joule (J)', 'le watt (W)', 'le newton (N)', 'le volt (V)'], correct: 0, explication: 'Le kWh est aussi utilisé pour l\'électricité.' },
    { type: 'qcm', question: "L'énergie cinétique vaut :", choix: ['½ × m × v²', 'm × v', '½ × m × v', 'm × g'], correct: 0, explication: 'Avec m en kg et v en m/s.' },
    {
      type: 'saisie', question: 'Calcul.',
      generer() { const m = pick([2, 10, 50]), v = pick([2, 4, 10]); return { question: `Énergie cinétique d'un objet de ${m} kg à ${v} m/s ?`, ...grandeur(0.5 * m * v * v, 'J', { tolerance: 0.5 }), explication: `$0{,}5 \\times ${m} \\times ${v}^2 = ${0.5 * m * v * v}$ J.` }; },
    },
    { type: 'vrai_faux', question: 'Quand la vitesse double, la distance de freinage double.', reponse: false, explication: 'Elle est multipliée par 4, car elle dépend de v².' },
    { type: 'qcm', question: 'Une pile convertit de l\'énergie :', choix: ['chimique en électrique', 'électrique en chimique', 'lumineuse en électrique', 'thermique en électrique'], correct: 0, explication: 'Les réactifs chimiques de la pile fournissent l\'énergie électrique.' },
  ],
};
