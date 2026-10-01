// =====================================================================
//  pr08_energie_conversions.js — Physique-chimie 4ᵉ : l'énergie et ses
//  conversions. Réservoirs et convertisseurs, chaîne énergétique,
//  conservation (reçue = utile + perdue), production d'électricité
//  (alternateur, centrales).
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { chaineEnergie, CONVERTISSEURS, FORMES, leNom } from '../figures_cycle.js';

const nomForme = (k) => FORMES[k][0];
const ROLES = [
  ['une pile', 'réservoir'], ["le lac d'un barrage", 'réservoir'], ['une batterie de téléphone', 'réservoir'], ["le réservoir d'essence", 'réservoir'],
  ['une lampe', 'convertisseur'], ['un moteur électrique', 'convertisseur'], ['un alternateur', 'convertisseur'], ['un panneau solaire', 'convertisseur'], ['un sèche-cheveux', 'convertisseur'],
];

export default {
  id: 'pr08',
  titre: "L'énergie et ses conversions",
  theme: 'pc_energie', niveau: '4e',
  icone: '⚡',

  intro:
    "Quand ton téléphone se recharge, il chauffe un peu ; quand un moteur tourne, il chauffe aussi. Où va l'énergie ? " +
    "Ce chapitre suit l'énergie d'un <strong>réservoir</strong> à un <strong>convertisseur</strong>, fait le <strong>bilan</strong> de ce qui est utile et de ce qui est « perdu », et explique comment on produit l'électricité.",

  cours: [
    {
      type: 'definition', titre: 'Réservoirs et convertisseurs',
      contenu: "Un <strong>réservoir</strong> stocke de l'énergie (pile : énergie chimique ; lac de barrage : énergie de position ; réservoir d'essence : énergie chimique). Un <strong>convertisseur</strong> transforme une forme d'énergie en une autre (lampe, moteur, alternateur). L'unité d'énergie est le <strong>joule</strong> (J) ; $1$ kJ $= 1\\,000$ J.",
    },
    {
      type: 'propriete', titre: "Conservation de l'énergie",
      contenu: "L'énergie ne se crée pas et ne disparaît pas : elle se convertit. Pour un convertisseur, l'énergie reçue est égale à la somme de l'énergie <strong>utile</strong> et de l'énergie <strong>perdue</strong> (le plus souvent sous forme thermique, dans l'environnement).",
      formule: 'E_{\\text{reçue}} = E_{\\text{utile}} + E_{\\text{perdue}}',
    },
    { type: 'figure', titre: 'Le bilan énergétique', contenu: "Choisis un convertisseur et règle l'énergie reçue : la largeur des bandes suit les quantités d'énergie.", render: (host) => chaineEnergie(host, { bilan: true }) },
    {
      type: 'definition', titre: 'La chaîne énergétique',
      contenu: "Dans une chaîne énergétique, les réservoirs sont dans des rectangles, les convertisseurs dans des ovales, et chaque flèche porte le nom de la forme d'énergie transférée. Exemple : pile (énergie chimique) → énergie électrique → lampe → énergie lumineuse + énergie thermique.",
    },
    {
      type: 'propriete', titre: "Produire l'électricité",
      contenu: "Dans presque toutes les centrales, c'est un <strong>alternateur</strong> qui convertit de l'énergie mécanique (une turbine qui tourne) en énergie électrique. Ce qui change, c'est ce qui fait tourner la turbine : la vapeur d'eau chauffée par un combustible (centrale thermique) ou par la fission de l'uranium (centrale nucléaire), l'eau d'un barrage (hydraulique), le vent (éolienne). Seul le panneau solaire produit de l'électricité sans alternateur.",
    },
    {
      type: 'exemple', enonce: 'Un moteur reçoit $800$ J d\'énergie électrique et fournit $600$ J d\'énergie mécanique. Quelle énergie est perdue ?',
      solution_etapes: ['$E_{\\text{perdue}} = E_{\\text{reçue}} - E_{\\text{utile}} = 800 - 600$.', '$E_{\\text{perdue}} = 200$ J, sous forme thermique : le moteur chauffe.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le réservoir', explication: "Là où l'énergie est stockée au départ." },
    { etape: 2, titre: 'Repérer les convertisseurs', explication: "Les objets qui changent la forme de l'énergie." },
    { etape: 3, titre: 'Nommer les formes', explication: 'Sur chaque flèche : électrique, chimique, lumineuse, thermique, mécanique…' },
    { etape: 4, titre: 'Faire le bilan', explication: 'Reçue = utile + perdue ; tout en joules.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Énergie utile :',
      generer() {
        const C = pick(CONVERTISSEURS), liste = ['electrique', 'lumineuse', 'thermique', 'mecanique', 'chimique'];
        const choix = [C.utile, ...liste.filter((x) => x !== C.utile)].slice(0, 4).map((x) => `énergie ${nomForme(x)}`);
        return { enonce: `Quelle est l'énergie utile fournie par ${leNom(C)} ?`, choix, correct: 0, _v: { C } };
      },
      indices: ['À quoi sert cet appareil ?', "L'énergie utile est celle pour laquelle on l'utilise.", "L'énergie thermique est souvent perdue… sauf pour un radiateur."],
      correction_etapes: (st) => [`${leNom(st._v.C, true)} reçoit de l'énergie ${nomForme(st._v.C.entree)} et fournit de l'énergie <strong>${nomForme(st._v.C.utile)}</strong> (utile).`],
    },
    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: "L'énergie perdue :",
      generer() {
        const C = pick(CONVERTISSEURS.filter((c) => c.perdue)), E = pick([500, 1000, 2000, 4000]), Eu = arrondi(E * C.part, 0);
        return {
          enonce: `${leNom(C, true)} reçoit ${E} J et fournit ${Eu} J d'énergie ${nomForme(C.utile)}. Quelle énergie est perdue ?`,
          ...grandeur(E - Eu, 'J', { pieges: [{ valeur: E + Eu, message: 'Énergie perdue = énergie reçue − énergie utile.' }] }),
          _v: { E, Eu },
        };
      },
      indices: ['$E_{\\text{reçue}} = E_{\\text{utile}} + E_{\\text{perdue}}$.', 'Isole l\'énergie perdue.', 'Réponse en J.'],
      correction_etapes: (st) => [`$E_{\\text{perdue}} = ${st._v.E} - ${st._v.Eu}$.`, `$E_{\\text{perdue}} = ${st._v.E - st._v.Eu}$ J.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: "L'énergie utile :",
      generer() {
        const E = pick([1200, 1500, 2500, 3600]), Ep = randInt(2, 8) * 100;
        return {
          enonce: `Une perceuse reçoit ${E} J d'énergie électrique. Elle perd ${Ep} J sous forme thermique. Quelle énergie mécanique (utile) fournit-elle ?`,
          ...grandeur(E - Ep, 'J', { pieges: [{ valeur: E + Ep, message: 'Utile = reçue − perdue.' }] }),
          _v: { E, Ep },
        };
      },
      indices: ['Reçue = utile + perdue.', 'Utile = reçue − perdue.', 'Réponse en J.'],
      correction_etapes: (st) => [`$E_{\\text{utile}} = ${st._v.E} - ${st._v.Ep}$.`, `$E_{\\text{utile}} = ${st._v.E - st._v.Ep}$ J.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Convertis :',
      generer() {
        const versJ = pick([true, false]), kJ = pick([0.5, 1.2, 2, 3.6, 15, 250]);
        return versJ
          ? { enonce: `Convertis ${dec(kJ)} kJ en joules.`, ...grandeur(kJ * 1000, 'J', { uniteImposee: true, pieges: [{ valeur: kJ / 1000, message: 'kJ → J : on multiplie par 1 000.' }] }), _v: { versJ, kJ } }
          : { enonce: `Convertis ${dec(kJ * 1000)} J en kilojoules.`, ...grandeur(kJ, 'kJ', { uniteImposee: true, pieges: [{ valeur: kJ * 1e6, message: 'J → kJ : on divise par 1 000.' }] }), _v: { versJ, kJ } };
      },
      indices: ['1 kJ = 1 000 J.', 'kJ → J : × 1 000.', 'J → kJ : ÷ 1 000.'],
      correction_etapes: (st) => [st._v.versJ ? `$${dec(st._v.kJ).replace(',', '{,}')} \\times 1\\,000 = ${dec(st._v.kJ * 1000).replace(',', '{,}')}$ J.` : `$${dec(st._v.kJ * 1000).replace(',', '{,}')} \\div 1\\,000 = ${dec(st._v.kJ).replace(',', '{,}')}$ kJ.`],
    },
    {
      id: 'e05', niveau: 2, type: 'ordonner_etapes', consigne: 'Dans une centrale :',
      generer() {
        return pick([
          { etapes: ['Le combustible (gaz, charbon) libère de l\'énergie thermique en brûlant', "Cette énergie vaporise l'eau de la chaudière", 'La vapeur fait tourner la turbine (énergie mécanique)', "L'alternateur convertit l'énergie mécanique en énergie électrique", "L'électricité est transportée par les lignes à haute tension"], _v: { nom: 'thermique' } },
          { etapes: ["L'eau du lac, en hauteur, possède de l'énergie de position", "En descendant dans une conduite, elle prend de la vitesse (énergie cinétique)", "L'eau fait tourner la turbine", "L'alternateur convertit l'énergie mécanique en énergie électrique", "L'électricité est envoyée sur le réseau"], _v: { nom: 'hydraulique' } },
        ]);
      },
      indices: ['On part du réservoir d\'énergie.', 'La turbine tourne avant l\'alternateur.', "L'électricité sort à la fin."],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e06', niveau: 1, type: 'qcm', consigne: 'Réservoir ou convertisseur ?',
      generer() {
        const [nom, role] = pick(ROLES);
        return { enonce: `Dans une chaîne énergétique, ${nom} est :`, choix: ["un réservoir d'énergie", 'un convertisseur'], correct: role === 'réservoir' ? 0 : 1, ordre_fixe: true, _v: { nom, role } };
      },
      indices: ["Un réservoir stocke de l'énergie.", 'Un convertisseur la transforme.', 'Une pile stocke de l\'énergie chimique.'],
      correction_etapes: (st) => [st._v.role === 'réservoir' ? `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} stocke de l'énergie : c'est un <strong>réservoir</strong>.` : `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} transforme une forme d'énergie en une autre : c'est un <strong>convertisseur</strong>.`],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: "La part d'énergie utile :",
      generer() {
        const [nom, part] = pick([['Une lampe à DEL', 40], ['Une lampe à incandescence', 5], ['Un moteur électrique', 80], ['Un panneau solaire', 20], ['Une éolienne', 40]]);
        const E = pick([200, 500, 1000, 2000]), Eu = (E * part) / 100;
        return { enonce: `${nom} reçoit ${E} J et fournit ${dec(Eu)} J d'énergie utile. Quel pourcentage de l'énergie reçue est utile ?`, reponse: part, validation: 'nombre', tolerance: 0.5, _v: { E, Eu, part } };
      },
      indices: ['Divise l\'énergie utile par l\'énergie reçue.', 'Multiplie par 100 pour obtenir un pourcentage.', 'Le reste est perdu.'],
      correction_etapes: (st) => [`$\\dfrac{${dec(st._v.Eu).replace(',', '{,}')}}{${st._v.E}} \\times 100 = ${st._v.part}$.`, `<strong>${st._v.part} %</strong> de l'énergie reçue est utile ; ${100 - st._v.part} % est perdue.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Produire de l\'électricité :',
      generer() {
        return pick([
          { enonce: "Dans une centrale nucléaire, une centrale thermique et une éolienne, quel appareil produit l'énergie électrique ?", choix: ['un alternateur', 'une pile', 'un panneau solaire', 'un moteur'], correct: 0, _v: { e: "Dans toutes ces centrales, un alternateur convertit l'énergie mécanique de la turbine en énergie électrique." } },
          { enonce: "Quel moyen de production d'électricité n'utilise pas d'alternateur ?", choix: ['le panneau solaire photovoltaïque', "l'éolienne", 'la centrale nucléaire', 'le barrage hydraulique'], correct: 0, _v: { e: "Le panneau photovoltaïque convertit directement l'énergie lumineuse en énergie électrique." } },
          { enonce: 'Dans une centrale nucléaire, la réaction de fission de l\'uranium sert à :', choix: ["chauffer de l'eau pour produire de la vapeur", 'produire directement du courant', 'faire tourner les pales avec du vent', 'refroidir la turbine'], correct: 0, _v: { e: "La fission libère de l'énergie thermique qui vaporise de l'eau ; la vapeur fait tourner la turbine reliée à l'alternateur." } },
        ]);
      },
      indices: ['Turbine + alternateur : le cœur de presque toutes les centrales.', "Ce qui change, c'est ce qui fait tourner la turbine.", 'Une exception : le photovoltaïque.'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'énergie perdue par un appareil a disparu.", reponse: false, _v: { e: "Non : elle est transférée à l'environnement, surtout sous forme thermique." } },
          { enonce: 'Une pile est un réservoir d\'énergie chimique.', reponse: true, _v: { e: 'Oui : elle la convertit en énergie électrique quand le circuit est fermé.' } },
          { enonce: '1 kJ = 100 J.', reponse: false, _v: { e: 'Non : 1 kJ = 1 000 J.' } },
          { enonce: "Pour un radiateur électrique, l'énergie thermique est l'énergie utile.", reponse: true, _v: { e: "Oui : on l'utilise justement pour chauffer." } },
          { enonce: 'Un alternateur convertit de l\'énergie mécanique en énergie électrique.', reponse: true, _v: { e: 'Oui, comme la dynamo d\'un vélo.' } },
        ]);
      },
      indices: ["L'énergie se conserve.", 'Utile dépend de l\'usage.', 'kilo = 1 000.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Pour un convertisseur :', choix: ['énergie reçue = énergie utile + énergie perdue', 'énergie utile = énergie reçue + énergie perdue', "l'énergie perdue disparaît", "l'énergie utile est toujours thermique"], correct: 0, explication: "Conservation de l'énergie." },
    { type: 'qcm', question: "L'énergie perdue par une lampe l'est surtout sous forme :", choix: ['thermique', 'chimique', 'nucléaire', 'de position'], correct: 0, explication: 'La lampe chauffe.' },
    {
      type: 'saisie', question: 'Bilan.',
      generer() { const E = pick([1000, 3000]), Ep = pick([200, 600]); return { question: `Un appareil reçoit ${E} J et en perd ${Ep} J. Énergie utile ?`, ...grandeur(E - Ep, 'J'), explication: `$${E} - ${Ep} = ${E - Ep}$ J.` }; },
    },
    { type: 'qcm', question: "Dans une éolienne, l'énergie électrique est produite par :", choix: ['un alternateur', 'une pile', 'un panneau solaire', 'une batterie'], correct: 0, explication: 'Les pales font tourner l\'alternateur.' },
    { type: 'vrai_faux', question: '1 kJ = 1 000 J.', reponse: true, explication: 'kilo = mille.' },
  ],
};
