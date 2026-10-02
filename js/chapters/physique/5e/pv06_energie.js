// =====================================================================
//  pv06_energie.js — Physique-chimie 5ᵉ : les sources et formes d'énergie.
//  Formes d'énergie, sources renouvelables ou non, convertisseurs,
//  chaîne énergétique, énergie perdue (thermique), économies d'énergie.
// =====================================================================

import { pick, arrondi, dec, grandeur, melanger } from '../outils.js';
import { chaineEnergie, CONVERTISSEURS, FORMES, leNom } from '../figures_cycle.js';

const SOURCES = [
  ['le Soleil', true], ['le vent', true], ['le pétrole', false], ['le charbon', false], ['le gaz naturel', false],
  ["l'eau des rivières", true], ["l'uranium", false], ['le bois (biomasse)', true], ['la chaleur de la Terre (géothermie)', true], ['les marées', true],
];

const OBJETS = [
  ['Un ballon qui roule possède', 'cinetique'], ['Une pile neuve stocke', 'chimique'], ['Le Soleil nous envoie', 'lumineuse'],
  ['Une plaque de cuisson chaude cède', 'thermique'], ['Un rocher en haut d\'une falaise possède', 'position'],
  ['Le courant du secteur transporte', 'electrique'], ['Un plat de pâtes apporte à notre corps', 'chimique'], ['Une voiture lancée sur l\'autoroute possède', 'cinetique'],
];
const nomForme = (k) => FORMES[k][0];
const LISTE_FORMES = ['cinetique', 'chimique', 'lumineuse', 'thermique', 'position', 'electrique'];

export default {
  id: 'pv06',
  titre: "Les sources d'énergie",
  theme: 'pc_energie', niveau: '5e',
  icone: '🔋',

  intro:
    "Pour éclairer une pièce, faire avancer un vélo ou chauffer de l'eau, il faut de l'<strong>énergie</strong>. " +
    "D'où vient-elle ? Sous quelles <strong>formes</strong> existe-t-elle ? Et que devient-elle quand on l'utilise ? Ce chapitre suit l'énergie de sa source jusqu'à son utilisation.",

  cours: [
    {
      type: 'definition', titre: "Les formes d'énergie",
      contenu: "L'énergie permet de mettre en mouvement, de chauffer, d'éclairer… Elle existe sous plusieurs <strong>formes</strong> : <strong>cinétique</strong> (liée au mouvement), <strong>de position</strong> (liée à la hauteur), <strong>thermique</strong> (liée à la température), <strong>lumineuse</strong> (transportée par la lumière), <strong>électrique</strong> (transportée par le courant), <strong>chimique</strong> (stockée dans les aliments, les carburants, les piles) et <strong>nucléaire</strong> (stockée dans les noyaux d'atomes). Son unité est le <strong>joule</strong> (J).",
    },
    {
      type: 'propriete', titre: "Sources renouvelables ou non",
      contenu: "Une source d'énergie est <strong>renouvelable</strong> si elle se reconstitue rapidement à l'échelle humaine : Soleil, vent, eau des rivières, marées, bois, géothermie. Elle est <strong>non renouvelable</strong> si ses réserves s'épuisent : pétrole, gaz naturel et charbon (énergies <strong>fossiles</strong>, formées en des millions d'années), uranium (nucléaire). Brûler des combustibles fossiles rejette du dioxyde de carbone, qui renforce l'effet de serre.",
    },
    {
      type: 'definition', titre: 'Convertisseur et chaîne énergétique',
      contenu: "Un <strong>convertisseur</strong> transforme une forme d'énergie en une autre : une lampe convertit l'énergie électrique en énergie lumineuse, un panneau solaire l'énergie lumineuse en énergie électrique. On représente ces conversions par une <strong>chaîne énergétique</strong> : réservoir (source) → convertisseur → énergie utile.",
    },
    { type: 'figure', titre: 'Une chaîne énergétique', contenu: "Choisis un convertisseur : la largeur des bandes représente la quantité d'énergie.", render: (host) => chaineEnergie(host) },
    {
      type: 'propriete', titre: "Rien ne se perd…",
      contenu: "L'énergie ne disparaît jamais et ne se crée pas : elle se <strong>convertit</strong>. Mais une partie n'est pas utile : elle part presque toujours sous forme <strong>thermique</strong> (une ampoule, un moteur, un chargeur chauffent). On parle d'énergie « perdue ». Une lampe à DEL chauffe bien moins qu'une ampoule à incandescence : elle gaspille moins.",
    },
    {
      type: 'exemple', enonce: "Quelle est la chaîne énergétique d'une éolienne qui alimente une lampe ?",
      solution_etapes: ['Le vent fournit de l\'énergie cinétique à l\'éolienne.', "L'éolienne la convertit en énergie électrique, que la lampe convertit en énergie lumineuse (et un peu thermique)."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Trouver la source', explication: 'D\'où vient l\'énergie : Soleil, vent, pile, secteur, aliments… ?' },
    { etape: 2, titre: 'Nommer les formes', explication: 'Mouvement : cinétique. Hauteur : de position. Chaleur : thermique. Lumière : lumineuse.' },
    { etape: 3, titre: 'Identifier le convertisseur', explication: "L'objet qui transforme une forme d'énergie en une autre." },
    { etape: 4, titre: 'Tracer la chaîne', explication: 'Source → énergie reçue → convertisseur → énergie utile (+ énergie perdue, souvent thermique).' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Renouvelable ou non ?',
      generer() {
        const [nom, renouv] = pick(SOURCES);
        return { enonce: `${nom[0].toUpperCase() + nom.slice(1)} est une source d'énergie :`, choix: ['renouvelable', 'non renouvelable'], correct: renouv ? 0 : 1, ordre_fixe: true, _v: { nom, renouv } };
      },
      indices: ['Se reconstitue-t-elle rapidement ?', 'Le pétrole a mis des millions d\'années à se former.', 'Le Soleil et le vent sont inépuisables à notre échelle.'],
      correction_etapes: (st) => [st._v.renouv ? `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} se renouvelle rapidement.` : `Les réserves de ${st._v.nom.replace(/^le |^l'|^la /, '')} s'épuisent.`, `C'est une source <strong>${st._v.renouv ? 'renouvelable' : 'non renouvelable'}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: "Quelle forme d'énergie ?",
      generer() {
        const [phrase, k] = pick(OBJETS);
        const choix = [k, ...melanger(LISTE_FORMES.filter((x) => x !== k)).slice(0, 3)].map((x) => `de l'énergie ${nomForme(x)}`);
        return { enonce: `${phrase} :`, choix, correct: 0, _v: { phrase, k } };
      },
      indices: ['Mouvement : énergie cinétique.', 'Hauteur : énergie de position.', 'Aliments, piles, carburants : énergie chimique.'],
      correction_etapes: (st) => [`${st._v.phrase} <strong>de l'énergie ${nomForme(st._v.k)}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'qcm', consigne: 'Le convertisseur :',
      generer() {
        const C = pick(CONVERTISSEURS);
        const choix = [C.utile, ...melanger(LISTE_FORMES.filter((x) => x !== C.utile && x !== C.entree && !(C.utile === 'mecanique' && x === 'cinetique'))).slice(0, 3)].map((x) => `énergie ${nomForme(x)}`);
        return { enonce: `${leNom(C, true)} convertit l'énergie ${nomForme(C.entree)} principalement en :`, choix, correct: 0, _v: { C } };
      },
      indices: ['Que produit cet objet d\'utile ?', 'Lumière, mouvement, chaleur, courant ?', "L'énergie perdue n'est pas l'énergie utile."],
      correction_etapes: (st) => [`Énergie reçue : ${nomForme(st._v.C.entree)} (de ${st._v.C.source}).`, `Énergie utile : <strong>${nomForme(st._v.C.utile)}</strong>${st._v.C.perdue ? ` ; énergie perdue : ${nomForme(st._v.C.perdue)}` : ''}.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: "L'énergie perdue :",
      generer() {
        const C = pick(CONVERTISSEURS.filter((c) => c.perdue));
        return { enonce: `Quand il fonctionne, un appareil de type « ${C.nom} » perd une partie de l'énergie reçue. Sous quelle forme, principalement ?`, choix: ['thermique', 'lumineuse', 'chimique', 'nucléaire'], correct: 0, ordre_fixe: true, _v: { C } };
      },
      indices: ['L\'appareil chauffe-t-il quand il fonctionne ?', 'L\'énergie perdue part dans l\'air ambiant.', 'C\'est presque toujours la même forme.'],
      correction_etapes: (st) => [`${leNom(st._v.C, true)} s'échauffe : une partie de l'énergie reçue devient de l'énergie <strong>thermique</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'ordonner_etapes', consigne: "Remets dans l'ordre la chaîne énergétique :",
      generer() {
        return pick([
          { etapes: ['Le vent possède de l\'énergie cinétique', "L'éolienne convertit cette énergie", 'Elle fournit de l\'énergie électrique', 'La lampe convertit l\'énergie électrique', 'On obtient de l\'énergie lumineuse'], _v: { nom: "de l'éolienne" } },
          { etapes: ['Le Soleil envoie de l\'énergie lumineuse', 'Le panneau solaire convertit cette énergie', 'Il fournit de l\'énergie électrique', 'Le moteur du ventilateur convertit l\'énergie électrique', 'Les pales ont de l\'énergie cinétique'], _v: { nom: 'du panneau solaire' } },
          { etapes: ['Les aliments contiennent de l\'énergie chimique', 'Les muscles du cycliste la convertissent', 'Le vélo avance : énergie cinétique', 'La dynamo convertit une partie de cette énergie', 'Le phare du vélo reçoit de l\'énergie électrique et éclaire'], _v: { nom: 'du cycliste' } },
        ]);
      },
      indices: ['Commence par la source.', 'Chaque convertisseur reçoit l\'énergie produite par le précédent.', 'Termine par l\'énergie utile finale.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e06', niveau: 3, type: 'saisie', consigne: "Rien ne se perd :",
      generer() {
        const C = pick(CONVERTISSEURS.filter((c) => c.perdue && c.part < 1)), E = pick([200, 500, 800, 1000, 1500]), Eu = arrondi(E * C.part, 0);
        return {
          enonce: `${leNom(C, true)} reçoit ${E} J d'énergie ${nomForme(C.entree)} et fournit ${Eu} J d'énergie ${nomForme(C.utile)}. Quelle quantité d'énergie est perdue sous forme thermique ?`,
          ...grandeur(E - Eu, 'J', { pieges: [{ valeur: E + Eu, message: "L'énergie perdue est ce qui manque : énergie reçue − énergie utile." }] }),
          _v: { E, Eu },
        };
      },
      indices: ["L'énergie ne disparaît pas : reçue = utile + perdue.", 'Donc perdue = reçue − utile.', 'Réponse en J.'],
      correction_etapes: (st) => [`$E_{\\text{perdue}} = ${st._v.E} - ${st._v.Eu}$.`, `$E_{\\text{perdue}} = ${st._v.E - st._v.Eu}$ J.`],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Les énergies fossiles :',
      generer() {
        return { enonce: 'Le pétrole, le gaz naturel et le charbon sont appelés « énergies fossiles » car :', choix: ["ils se sont formés en des millions d'années à partir d'êtres vivants", 'ils se trouvent sous la mer', "ils se renouvellent chaque année", 'ils produisent de la lumière'], correct: 0, _v: {} };
      },
      indices: ['Un fossile est un reste d\'être vivant très ancien.', 'Leur formation est très lente.', "C'est pour cela qu'ils sont non renouvelables."],
      correction_etapes: () => ["Ils proviennent de la décomposition très lente d'êtres vivants (plancton, plantes) enfouis il y a des millions d'années.", "Leur formation est si lente qu'on les considère comme <strong>non renouvelables</strong>."],
    },
    {
      id: 'e08', niveau: 2, type: 'saisie', consigne: 'La facture :',
      generer() {
        const kwh = pick([40, 150, 200, 320, 500]), prix = 0.2;
        return {
          enonce: `L'énergie électrique est facturée en kilowattheures (kWh). On suppose qu'un kWh coûte 0,20 €. Combien coûtent ${kwh} kWh ? (en €)`,
          reponse: arrondi(kwh * prix, 2), validation: 'nombre', tolerance: 0.001, _v: { kwh },
        };
      },
      indices: ['C\'est une situation de proportionnalité.', 'Multiplie le nombre de kWh par le prix d\'un kWh.', 'Réponse en euros.'],
      correction_etapes: (st) => [`$${st._v.kwh} \\times 0{,}20$.`, `$= ${dec(st._v.kwh * 0.2).replace(',', '{,}')}$ €.`],
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'énergie peut disparaître.", reponse: false, _v: { e: "Non : elle se convertit d'une forme à une autre." } },
          { enonce: "L'énergie se mesure en joules.", reponse: true, _v: { e: 'Oui, symbole J. Sur les factures, on utilise le kWh.' } },
          { enonce: 'Le vent est une source d\'énergie renouvelable.', reponse: true, _v: { e: 'Oui : il se renouvelle en permanence.' } },
          { enonce: 'Une lampe convertit toute l\'énergie électrique en lumière.', reponse: false, _v: { e: 'Non : une partie devient de l\'énergie thermique (elle chauffe).' } },
          { enonce: 'Les aliments contiennent de l\'énergie chimique.', reponse: true, _v: { e: 'Oui : nos muscles la convertissent en mouvement et en chaleur.' } },
        ]);
      },
      indices: ['Rien ne se perd, rien ne se crée.', 'Toute conversion produit un peu de chaleur.', 'Renouvelable : qui se reconstitue vite.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Laquelle de ces sources est renouvelable ?', choix: ['le Soleil', 'le pétrole', 'le charbon', "l'uranium"], correct: 0, explication: 'Le Soleil, le vent, l\'eau… se renouvellent.' },
    { type: 'qcm', question: 'Un panneau solaire convertit l\'énergie lumineuse en énergie :', choix: ['électrique', 'chimique', 'nucléaire', 'de position'], correct: 0, explication: 'Il produit du courant électrique.' },
    { type: 'vrai_faux', question: "L'énergie perdue par un moteur est surtout de l'énergie thermique.", reponse: true, explication: 'Le moteur chauffe.' },
    {
      type: 'saisie', question: 'Bilan.',
      generer() { const E = pick([100, 600]), u = pick([20, 45, 80]); const Eu = E * u / 100; return { question: `Un appareil reçoit ${E} J et en utilise ${Eu} J. Quelle énergie est perdue ?`, ...grandeur(E - Eu, 'J'), explication: `$${E} - ${Eu} = ${E - Eu}$ J.` }; },
    },
    { type: 'qcm', question: "L'unité d'énergie est :", choix: ['le joule', 'le volt', "l'ampère", 'le newton'], correct: 0, explication: 'Symbole J.' },
  ],
};
