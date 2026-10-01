// =====================================================================
//  p07_poids.js — Physique-chimie 3ᵉ : le poids.
//  Gravitation universelle, poids et masse, P = m × g (Terre, Lune,
//  autres astres), proportionnalité entre poids et masse.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur, tolRel } from '../outils.js';
import { poidsAstres, ASTRES } from '../figures.js';
import { tableau } from '../../commun.js';

const t = (x, n = 2) => dec(arrondi(x, n)).replace(',', '{,}');
const sur = (nom) => (nom === 'Terre' ? 'la Terre' : nom === 'Lune' ? 'la Lune' : nom);

export default {
  id: 'p07',
  titre: 'Le poids',
  theme: 'pc_mouvement', niveau: '3e',
  icone: '🌍',

  intro:
    "Sur la Lune, les astronautes font des bonds de plusieurs mètres. Ont-ils perdu de la masse ? Non : c'est leur <strong>poids</strong> qui a diminué. " +
    "Le poids est l'attraction exercée par un astre sur un objet ; il dépend de l'astre, contrairement à la <strong>masse</strong>. " +
    "Une seule formule relie les deux : $P = m \\times g$.",

  cours: [
    {
      type: 'definition', titre: 'La gravitation universelle',
      contenu: "Deux objets qui ont une masse s'<strong>attirent</strong> mutuellement : c'est la <strong>gravitation</strong>, une action à distance. Elle est d'autant plus forte que les masses sont grandes et que les objets sont proches. C'est elle qui maintient la Lune autour de la Terre et les planètes autour du Soleil.",
      formule: 'F = G \\times \\dfrac{m_A \\times m_B}{d^2}',
    },
    {
      type: 'definition', titre: 'Le poids',
      contenu: "Le <strong>poids</strong> $\\vec{P}$ d'un objet est la force d'attraction exercée par la Terre (ou un autre astre) sur cet objet. Direction : <strong>verticale</strong> ; sens : <strong>vers le bas</strong> (vers le centre de l'astre) ; point d'application : le centre de gravité de l'objet ; valeur en <strong>newtons</strong>.",
    },
    {
      type: 'propriete', titre: 'Poids et masse',
      contenu: "La <strong>masse</strong> $m$ mesure la quantité de matière : elle s'exprime en kg, se mesure avec une <strong>balance</strong> et est la même partout. Le <strong>poids</strong> $P$ est une force en N, se mesure avec un <strong>dynamomètre</strong> et dépend de l'astre. Le poids est proportionnel à la masse :",
      formule: 'P = m \\times g \\qquad (P \\text{ en N},\\ m \\text{ en kg},\\ g \\text{ en N/kg})',
    },
    {
      type: 'propriete', titre: "L'intensité de pesanteur g",
      contenu: "$g$ dépend de l'astre : " + tableau([['Astre', ...ASTRES.map((a) => a[0])], ['g (N/kg)', ...ASTRES.map((a) => dec(a[1]))]]) + " Sur la Lune, un objet pèse environ 6 fois moins que sur Terre.",
    },
    { type: 'figure', titre: 'Même masse, poids différent', contenu: "Change d'astre : le dynamomètre indique le poids, et la balle rebondit plus haut là où $g$ est faible.", render: (host) => poidsAstres(host) },
    {
      type: 'exemple', enonce: 'Quel est le poids, sur Terre, d\'un sac de $5$ kg ? Et sur la Lune ?',
      solution_etapes: ['Sur Terre : $P = m \\times g = 5 \\times 9{,}8 = 49$ N.', 'Sur la Lune : $P = 5 \\times 1{,}6 = 8$ N. La masse reste $5$ kg.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Masse ou poids ?', explication: 'kg → masse (balance). N → poids (dynamomètre).' },
    { etape: 2, titre: 'Masse en kg', explication: 'Convertis les grammes : $500$ g $= 0{,}5$ kg.' },
    { etape: 3, titre: 'Choisir g', explication: "9,8 N/kg sur Terre (parfois arrondi à 10), 1,6 N/kg sur la Lune…" },
    { etape: 4, titre: 'Appliquer P = m × g', explication: 'Ou $m = P \\div g$, ou $g = P \\div m$. Résultat avec son unité.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: 'Calcule le poids sur Terre (g = 9,8 N/kg) :',
      generer() {
        const [objet, m] = pick([['un cartable', pick([4, 5, 6, 7])], ['un élève', pick([45, 50, 55, 60])], ['un chat', pick([3, 4, 5])], ['un vélo', pick([10, 12, 15])], ['une pomme', pick([0.1, 0.15, 0.2])]]);
        const P = arrondi(m * 9.8, 3);
        return { enonce: `Quel est le poids d'${objet.startsWith('une') ? objet : objet} de masse ${dec(m)} kg ?`, ...grandeur(P, 'N', { tolerance: tolRel(P, 0.5) + 0.001, pieges: [{ valeur: arrondi(m / 9.8, 4), message: 'Le poids s\'obtient en multipliant : P = m × g.' }] }), _v: { m, P } };
      },
      indices: ['$P = m \\times g$.', 'Masse en kg, g = 9,8 N/kg.', 'Le résultat est en newtons (N).'],
      correction_etapes: (st) => [`$P = m \\times g = ${t(st._v.m)} \\times 9{,}8$.`, `$P = ${t(st._v.P, 3)}$ N.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Masse ou poids ?',
      generer() {
        return pick([
          { enonce: 'Avec une balance, on mesure :', choix: ['une masse, en kg', 'un poids, en N', 'une masse, en N', 'un poids, en kg'], correct: 0, _v: { e: 'La balance mesure la masse, en kilogrammes.' } },
          { enonce: 'Avec un dynamomètre, on mesure :', choix: ['un poids (une force), en N', 'une masse, en kg', 'un volume, en L', 'une vitesse'], correct: 0, _v: { e: 'Le dynamomètre mesure des forces, dont le poids, en newtons.' } },
          { enonce: 'Un astronaute part de la Terre vers la Lune. Sur la Lune :', choix: ['sa masse est la même, son poids diminue', 'sa masse et son poids diminuent', 'sa masse diminue, son poids ne change pas', "rien ne change"], correct: 0, _v: { e: 'La masse ne dépend pas du lieu ; le poids dépend de g, plus faible sur la Lune.' } },
          { enonce: "« Ce sac fait 3 kg » : on parle de sa…", choix: ['masse', 'poids', 'force', 'vitesse'], correct: 0, _v: { e: 'Le kilogramme est l\'unité de masse.' } },
        ]);
      },
      indices: ['kg : masse ; N : poids.', 'Balance ↔ masse ; dynamomètre ↔ force.', 'La masse ne change pas d\'un astre à l\'autre.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: 'Retrouve la masse (g = 9,8 N/kg) :',
      generer() {
        const m = pick([2, 5, 8, 10, 20, 25, 50]), P = arrondi(m * 9.8, 2);
        return { enonce: `Un dynamomètre indique qu'un objet a un poids de ${dec(P)} N sur Terre. Quelle est sa masse ?`, ...grandeur(m, 'kg', { tolerance: 0.02, pieges: [{ valeur: arrondi(P * 9.8, 2), message: 'Pour retrouver la masse, on divise : m = P ÷ g.' }] }), _v: { m, P } };
      },
      indices: ['$P = m \\times g$, donc $m = \\dfrac{P}{g}$.', 'Divise le poids par 9,8.', 'La masse est en kg.'],
      correction_etapes: (st) => [`$m = \\dfrac{P}{g} = \\dfrac{${t(st._v.P)}}{9{,}8}$.`, `$m = ${st._v.m}$ kg.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Poids sur un autre astre :',
      generer() {
        const [nom, g] = pick(ASTRES.slice(1)), m = pick([10, 20, 40, 60, 75, 80]);
        return { enonce: `Un robot d'exploration a une masse de ${m} kg. Quel est son poids sur ${sur(nom)} (g = ${dec(g)} N/kg) ?`, ...grandeur(arrondi(m * g, 2), 'N', { tolerance: 0.1, pieges: [{ valeur: arrondi(m * 9.8, 2), message: `Attention : on est sur ${sur(nom)}, pas sur Terre. Utilise g = ${dec(g)} N/kg.` }] }), _v: { m, g, nom } };
      },
      indices: ['La masse ne change pas.', `Utilise le g de l'astre.`, '$P = m \\times g$.'],
      correction_etapes: (st) => [`$P = ${st._v.m} \\times ${t(st._v.g)} = ${t(st._v.m * st._v.g)}$ N.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Calcule l\'intensité de pesanteur :',
      generer() {
        const [nom, g] = pick(ASTRES), m = pick([2, 4, 5, 10]);
        return { enonce: `Sur ${sur(nom)}, un objet de ${m} kg a un poids de ${dec(arrondi(m * g, 2))} N. Calcule l'intensité de pesanteur g.`, ...grandeur(g, 'N/kg', { tolerance: 0.02, pieges: [{ valeur: arrondi(m / (m * g), 4), message: 'g = P ÷ m (le poids divisé par la masse).' }] }), _v: { m, g, nom } };
      },
      indices: ['$g = \\dfrac{P}{m}$.', 'P en N, m en kg : g en N/kg.', 'Écris « N/kg ».'],
      correction_etapes: (st) => [`$g = \\dfrac{P}{m} = \\dfrac{${t(st._v.m * st._v.g)}}{${st._v.m}} = ${t(st._v.g)}$ N/kg.`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Le poids est une force verticale, dirigée vers le bas.', reponse: true, _v: { e: 'Oui, vers le centre de la Terre.' } },
          { enonce: 'Sur la Lune, la masse d\'un astronaute est 6 fois plus petite.', reponse: false, _v: { e: 'Non : c\'est son poids qui est environ 6 fois plus petit ; sa masse ne change pas.' } },
          { enonce: 'La gravitation est une action à distance.', reponse: true, _v: { e: "Oui : les objets s'attirent sans se toucher." } },
          { enonce: 'Plus deux objets sont éloignés, plus ils s\'attirent.', reponse: false, _v: { e: "Non : l'attraction diminue quand la distance augmente." } },
          { enonce: 'Le poids est proportionnel à la masse.', reponse: true, _v: { e: 'Oui : P = m × g, avec g le coefficient de proportionnalité.' } },
        ]);
      },
      indices: ['Masse : kg, invariable.', 'Poids : N, dépend de l\'astre.', 'La gravitation diminue avec la distance.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'De la Terre à un autre astre :',
      generer() {
        const [nom, g] = pick(ASTRES.slice(1)), m = pick([50, 60, 70, 80, 100]), PT = arrondi(m * 9.8, 1);
        return { enonce: `Sur Terre (g = 9,8 N/kg), le poids d'un astronaute équipé est ${dec(PT)} N. Quel serait son poids sur ${sur(nom)} (g = ${dec(g)} N/kg) ?`, ...grandeur(arrondi(m * g, 1), 'N', { tolerance: 0.2 }), _v: { m, g, PT, nom } };
      },
      indices: ["Commence par calculer la masse, qui ne change pas.", '$m = P_{\\text{Terre}} \\div 9{,}8$.', `Puis $P = m \\times g$ avec le g de l'astre.`],
      correction_etapes: (st) => [`Masse : $m = \\dfrac{${t(st._v.PT, 1)}}{9{,}8} = ${st._v.m}$ kg.`, `Sur ${sur(st._v.nom)} : $P = ${st._v.m} \\times ${t(st._v.g)} = ${t(st._v.m * st._v.g, 1)}$ N.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'La gravitation :',
      generer() {
        return pick([
          { enonce: "Si la distance entre deux astres double, la force de gravitation entre eux :", choix: ['est divisée par 4', 'est divisée par 2', 'double', 'ne change pas'], correct: 0, _v: { e: 'La distance intervient au carré : 2² = 4.' } },
          { enonce: "Si la masse d'un des deux objets double, la force de gravitation :", choix: ['double', 'est divisée par 2', 'est multipliée par 4', 'ne change pas'], correct: 0, _v: { e: 'La force est proportionnelle à chacune des masses.' } },
          { enonce: 'Pourquoi g est-il plus faible sur la Lune que sur la Terre ?', choix: ['la Lune a une masse beaucoup plus petite', "il n'y a pas d'air sur la Lune", 'la Lune est plus froide', 'la Lune tourne autour de la Terre'], correct: 0, _v: { e: "L'attraction dépend de la masse de l'astre ; la Lune est environ 80 fois moins massive que la Terre." } },
        ]);
      },
      indices: ['$F = G \\times \\dfrac{m_A \\times m_B}{d^2}$.', 'Les masses sont au numérateur.', 'La distance est au carré, au dénominateur.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Exploite les mesures :',
      generer() {
        const [nom, g] = pick(ASTRES), ms = [0.2, 0.4, 0.6, 0.8];
        return {
          enonce: `Un robot mesure le poids de plusieurs objets sur ${sur(nom)} :` + tableau([['m (kg)', ...ms.map((x) => dec(x))], ['P (N)', ...ms.map((x) => dec(arrondi(x * g, 2)))]]) + 'Le poids est-il proportionnel à la masse ? Calcule le coefficient g.',
          ...grandeur(g, 'N/kg', { tolerance: 0.05 }), _v: { g, nom },
        };
      },
      indices: ['Calcule P ÷ m pour chaque colonne.', 'Si le quotient est toujours le même : proportionnalité.', 'Ce quotient est g, en N/kg.'],
      correction_etapes: (st) => [`$\\dfrac{P}{m}$ vaut ${dec(st._v.g)} pour chaque mesure : P est proportionnel à m.`, `$g = ${t(st._v.g)}$ N/kg : on est sur ${sur(st._v.nom)}.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le poids se mesure en :', choix: ['newtons (N)', 'kilogrammes (kg)', 'N/kg', 'grammes'], correct: 0, explication: "C'est une force." },
    { type: 'qcm', question: 'La relation entre poids et masse est :', choix: ['P = m × g', 'P = m ÷ g', 'P = m + g', 'm = P × g'], correct: 0, explication: 'Avec g en N/kg.' },
    {
      type: 'saisie', question: 'Calcul.',
      generer() { const m = pick([2, 3, 5, 10]); return { question: `Poids sur Terre (g = 9,8 N/kg) d'un objet de ${m} kg ?`, ...grandeur(arrondi(m * 9.8, 2), 'N', { tolerance: 0.05 }), explication: `${m} × 9,8 = ${dec(arrondi(m * 9.8, 2))} N.` }; },
    },
    { type: 'vrai_faux', question: "La masse d'un objet est la même sur la Terre et sur la Lune.", reponse: true, explication: 'Seul son poids change.' },
    { type: 'qcm', question: "L'intensité de pesanteur sur la Lune est environ :", choix: ['1,6 N/kg', '9,8 N/kg', '24,8 N/kg', '0 N/kg'], correct: 0, explication: 'Environ 6 fois moins que sur Terre.' },
  ],
};
