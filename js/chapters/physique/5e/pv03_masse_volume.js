// =====================================================================
//  pv03_masse_volume.js — Physique-chimie 5ᵉ : masse et volume.
//  Balance et tare, éprouvette et ménisque, conversions de volumes,
//  volume d'un solide (calcul, déplacement d'eau), 1 L d'eau = 1 kg.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { eprouvette, schemaEprouvette } from '../figures_cycle.js';
import { tableau } from '../../commun.js';

const t = (x) => dec(x).replace(',', '{,}');

export default {
  id: 'pv03',
  titre: 'Masse et volume',
  theme: 'pc_matiere', niveau: '5e',
  icone: '⚖️',

  intro:
    "Combien pèse un litre d'eau ? Comment mesurer le volume d'un caillou, qui n'a pas une forme simple ? " +
    "Pour décrire un objet, le physicien mesure deux grandeurs différentes : sa <strong>masse</strong> (la quantité de matière) avec une balance, et son <strong>volume</strong> (la place qu'il occupe) avec une éprouvette graduée.",

  cours: [
    {
      type: 'definition', titre: 'La masse',
      contenu: "La <strong>masse</strong> d'un objet se mesure avec une <strong>balance</strong>. Son unité est le <strong>kilogramme</strong> (kg) ; on utilise aussi le gramme (g) : $1$ kg $= 1\\,000$ g. Pour peser un liquide, on pose le récipient vide sur la balance et on appuie sur « <strong>tare</strong> » (zéro) : la balance n'affiche ensuite que la masse du liquide.",
    },
    {
      type: 'definition', titre: 'Le volume',
      contenu: "Le <strong>volume</strong> est la place occupée par un objet. On le mesure en <strong>litres</strong> (L), en millilitres (mL) ou en cm³ et m³. Le volume d'un liquide se mesure avec une <strong>éprouvette graduée</strong> posée à plat : on lit la graduation au <strong>bas du ménisque</strong>, l'œil à la même hauteur.",
    },
    {
      type: 'propriete', titre: 'Conversions de volumes',
      contenu: tableau([['1 L', '= 1 000 mL', '= 1 dm³'], ['1 mL', '= 1 cm³', '= 0,001 L'], ['1 m³', '= 1 000 L', '= 1 000 dm³']]),
      formule: '1 \\text{ mL} = 1 \\text{ cm}^3',
    },
    { type: 'figure', titre: "L'éprouvette graduée", contenu: "Règle le volume d'eau, puis plonge un objet : le niveau monte d'autant que le volume de l'objet.", render: (host) => eprouvette(host) },
    {
      type: 'propriete', titre: "Volume d'un solide",
      contenu: "Pour un solide de forme simple, on <strong>calcule</strong> : un pavé a pour volume longueur × largeur × hauteur. Pour un solide de forme quelconque (caillou), on le plonge dans l'eau d'une éprouvette : son volume est l'<strong>augmentation du volume</strong> lu (méthode par déplacement d'eau).",
      formule: 'V_{\\text{objet}} = V_2 - V_1',
    },
    {
      type: 'propriete', titre: "Un litre d'eau pèse un kilogramme",
      contenu: "Pour l'eau : $1$ L a une masse de $1$ kg, et $1$ mL a une masse de $1$ g. Attention, masse et volume sont deux grandeurs <strong>différentes</strong> : un litre d'huile ne pèse que $0{,}92$ kg, un litre de miel $1{,}4$ kg.",
      formule: '1 \\text{ L d\'eau} \\leftrightarrow 1 \\text{ kg}',
    },
    {
      type: 'exemple', enonce: "On plonge une clé dans une éprouvette : le niveau passe de $35$ mL à $41$ mL. Quel est le volume de la clé ?",
      solution_etapes: ['$V = V_2 - V_1 = 41 - 35 = 6$ mL.', 'Soit $6$ cm³.'],
    },
  ],

  methode: [
    { etape: 1, titre: "Choisir l'instrument", explication: 'Masse : balance (tarée). Volume d\'un liquide : éprouvette graduée.' },
    { etape: 2, titre: 'Bien lire', explication: "Éprouvette à plat, œil à la hauteur du bas du ménisque. Repère la valeur d'une petite graduation." },
    { etape: 3, titre: 'Calculer si besoin', explication: 'Solide plongé : V₂ − V₁. Pavé : L × l × h.' },
    { etape: 4, titre: "Donner l'unité et convertir", explication: '1 L = 1 000 mL ; 1 mL = 1 cm³ ; 1 m³ = 1 000 L.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: "Lis le volume dans l'éprouvette :",
      generer() {
        const bas = pick([10, 20, 30, 40, 50, 60]), v = bas + randInt(2, 18);
        return {
          enonce: "Les graduations vont de 1 mL en 1 mL. Quel volume de liquide contient l'éprouvette ?",
          visuel: (h) => { h.innerHTML = schemaEprouvette(v, { bas, haut: bas + 20, pas: 1 }); },
          ...grandeur(v, 'mL', { pieges: [{ valeur: v + 1, message: 'Lis au BAS du ménisque (le creux de la surface), pas sur les bords.' }] }),
          _v: { v, bas },
        };
      },
      indices: ['Repère les graduations numérotées.', 'Compte les petites graduations : chacune vaut 1 mL.', 'Lis au bas du ménisque et écris « mL ».'],
      correction_etapes: (st) => [`Le bas du ménisque est ${st._v.v - Math.floor(st._v.v / 5) * 5 ? `à ${st._v.v - Math.floor(st._v.v / 5) * 5} graduation(s) au-dessus de ${Math.floor(st._v.v / 5) * 5}` : `sur la graduation ${st._v.v}`}.`, `Volume : <strong>${st._v.v} mL</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'complete', consigne: 'Convertis :',
      generer() {
        const a = pick([0.5, 1.5, 2, 0.25, 3, 0.75]), b = pick([250, 330, 750, 1500, 50]);
        return {
          enonce_complete: `${dec(a)} L = {0} mL $\\qquad$ ${b} mL = {1} L`,
          champs: [{ reponse: arrondi(a * 1000, 3), validation: 'nombre' }, { reponse: arrondi(b / 1000, 4), validation: 'nombre' }],
          _v: { a, b },
        };
      },
      indices: ['1 L = 1 000 mL.', 'L → mL : on multiplie par 1 000.', 'mL → L : on divise par 1 000.'],
      correction_etapes: (st) => [`${dec(st._v.a)} × 1 000 = ${dec(st._v.a * 1000)} mL.`, `${st._v.b} ÷ 1 000 = ${dec(st._v.b / 1000)} L.`],
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Quel instrument ?',
      generer() {
        const q = pick([
          ["mesurer la masse d'une pomme", 'une balance'],
          ["mesurer le volume d'un peu de lait", 'une éprouvette graduée'],
          ["mesurer le volume d'un caillou", 'une éprouvette graduée contenant de l\'eau'],
          ["mesurer la masse d'eau dans un verre", 'une balance, après avoir taré le verre vide'],
        ]);
        const tous = ['une balance', 'une éprouvette graduée', 'une éprouvette graduée contenant de l\'eau', 'une balance, après avoir taré le verre vide', 'un thermomètre', 'une règle graduée'];
        const choix = [q[1], ...tous.filter((x) => x !== q[1] && !(q[1].startsWith(x) || x.startsWith(q[1]))).slice(0, 3)];
        return { enonce: `Pour ${q[0]}, on utilise :`, choix, correct: 0, _v: { q } };
      },
      indices: ['La masse se mesure avec une balance.', 'Le volume d\'un liquide avec une éprouvette graduée.', 'Pour un solide quelconque : déplacement d\'eau.'],
      correction_etapes: (st) => [`Pour ${st._v.q[0]}, on utilise <strong>${st._v.q[1]}</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Volume par déplacement d\'eau :',
      generer() {
        const V1 = pick([30, 40, 45, 50, 60]), dV = randInt(3, 25), nom = pick(['un caillou', 'une figurine', 'une bille', 'un morceau de pâte à modeler', 'un dé en métal']);
        return {
          enonce: `Une éprouvette contient ${V1} mL d'eau. On y plonge ${nom} : le niveau monte à ${V1 + dV} mL. Quel est le volume de l'objet, en cm³ ?`,
          ...grandeur(dV, 'cm3', { pieges: [{ valeur: V1 + dV, message: "C'est le volume total (eau + objet) : soustrais le volume d'eau de départ." }] }),
          _v: { V1, dV },
        };
      },
      indices: ['Le niveau monte du volume de l\'objet.', '$V = V_2 - V_1$.', '1 mL = 1 cm³ : écris « cm3 ».'],
      correction_etapes: (st) => [`$V = ${st._v.V1 + st._v.dV} - ${st._v.V1} = ${st._v.dV}$ mL.`, `Soit <strong>${st._v.dV} cm³</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: "Volume d'une boîte :",
      generer() {
        const L = randInt(4, 12), l = randInt(2, 8), h = randInt(2, 6);
        return {
          enonce: `Une boîte en forme de pavé mesure ${L} cm de long, ${l} cm de large et ${h} cm de haut. Quel est son volume ?`,
          ...grandeur(L * l * h, 'cm3', { pieges: [{ valeur: L + l + h, message: 'On multiplie les trois dimensions, on ne les additionne pas.' }, { valeur: L * l, message: "C'est l'aire du fond : multiplie encore par la hauteur." }] }),
          _v: { L, l, h },
        };
      },
      indices: ['Volume d\'un pavé : longueur × largeur × hauteur.', 'Des cm multipliés trois fois donnent des cm³.', 'Écris « cm3 ».'],
      correction_etapes: (st) => [`$V = ${st._v.L} \\times ${st._v.l} \\times ${st._v.h}$.`, `$V = ${st._v.L * st._v.l * st._v.h}$ cm³.`],
    },
    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: "La masse de l'eau :",
      generer() {
        const V = pick([0.5, 1.5, 2, 5, 10, 0.25]);
        return {
          enonce: `Quelle est la masse de ${dec(V)} L d'eau, en kg ?`,
          ...grandeur(V, 'kg', { pieges: [{ valeur: V * 1000, message: '1 L d\'eau pèse 1 kg, pas 1 000 kg !' }] }),
          _v: { V },
        };
      },
      indices: ['1 L d\'eau pèse 1 kg.', 'Le nombre de kilogrammes est égal au nombre de litres.', 'Écris « kg » (ou convertis en g).'],
      correction_etapes: (st) => [`1 L d'eau pèse 1 kg, donc ${dec(st._v.V)} L pèsent <strong>${dec(st._v.V)} kg</strong>.`, `Soit ${dec(st._v.V * 1000)} g.`],
    },
    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Utiliser la tare :',
      generer() {
        const m1 = randInt(80, 150), s = randInt(25, 190), nom = pick(['de sable', 'de farine', "d'eau", 'de sel']);
        return {
          enonce: `Un bécher vide posé sur une balance affiche ${m1} g. On y verse ${nom} : la balance affiche ${m1 + s} g. Quelle est la masse ${nom} versée ?`,
          ...grandeur(s, 'g', { pieges: [{ valeur: m1 + s, message: "Cette masse contient aussi le bécher : soustrais sa masse (ou tare la balance avant)." }] }),
          _v: { m1, s },
        };
      },
      indices: ['La balance pèse le bécher ET son contenu.', 'Soustrais la masse du bécher vide.', 'Avec la touche « tare », la balance le ferait pour toi.'],
      correction_etapes: (st) => [`$m = ${st._v.m1 + st._v.s} - ${st._v.m1}$.`, `$m = ${st._v.s}$ g.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Grands volumes :',
      generer() {
        const [nom, V] = pick([['Une piscine', 50], ['Un aquarium géant', 2.5], ['Une citerne', 12], ['Une baignoire', 0.2], ['Un bassin', 30]]);
        return {
          enonce: `${nom} contient ${dec(V)} m³ d'eau. Combien de litres cela représente-t-il ?`,
          ...grandeur(arrondi(V * 1000, 3), 'L', { uniteImposee: true, pieges: [{ valeur: V, message: 'Convertis : 1 m³ = 1 000 L.' }, { valeur: V * 1e6, message: "C'est le volume en mL : 1 m³ = 1 000 L seulement." }] }),
          _v: { V, nom },
        };
      },
      indices: ['1 m³ = 1 000 L.', 'On multiplie par 1 000.', 'Donne la réponse en L.'],
      correction_etapes: (st) => [`$${t(st._v.V)} \\times 1\\,000 = ${t(st._v.V * 1000)}$.`, `Soit <strong>${dec(st._v.V * 1000)} L</strong> (et donc environ ${dec(st._v.V * 1000)} kg d'eau).`],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "1 L d'huile a une masse de 1 kg.", reponse: false, _v: { e: "Non : c'est vrai pour l'eau. Un litre d'huile ne pèse que 0,92 kg." } },
          { enonce: '1 mL correspond à 1 cm³.', reponse: true, _v: { e: 'Oui : ce sont deux écritures du même volume.' } },
          { enonce: "On lit le volume d'un liquide en haut du ménisque, sur les bords.", reponse: false, _v: { e: 'Non : au bas du ménisque, l\'œil à sa hauteur.' } },
          { enonce: 'Un gros objet a toujours une plus grande masse qu\'un petit.', reponse: false, _v: { e: 'Non : une grosse boule de polystyrène est plus légère qu\'une petite bille de plomb. Masse et volume sont différents.' } },
          { enonce: '1 m³ = 1 000 L.', reponse: true, _v: { e: 'Oui : un cube d\'un mètre de côté contient 1 000 litres.' } },
        ]);
      },
      indices: ['Masse et volume sont deux grandeurs différentes.', 'Seule l\'eau vérifie 1 L ↔ 1 kg.', 'Ménisque : on lit en bas.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La masse se mesure avec :', choix: ['une balance', 'une éprouvette graduée', 'un thermomètre', 'une règle'], correct: 0, explication: 'En kilogrammes ou en grammes.' },
    { type: 'qcm', question: '1 L est égal à :', choix: ['1 000 mL', '100 mL', '10 mL', '1 cm³'], correct: 0, explication: '1 L = 1 000 mL = 1 000 cm³.' },
    {
      type: 'saisie', question: 'Déplacement d\'eau.',
      generer() { const V1 = pick([20, 50, 70]), d = randInt(4, 15); return { question: `Le niveau d'une éprouvette passe de ${V1} mL à ${V1 + d} mL quand on y plonge un objet. Volume de l'objet ?`, ...grandeur(d, 'mL'), explication: `$${V1 + d} - ${V1} = ${d}$ mL.` }; },
    },
    { type: 'vrai_faux', question: 'Un litre d\'eau pèse environ un kilogramme.', reponse: true, explication: 'Et 1 mL d\'eau pèse 1 g.' },
    { type: 'qcm', question: 'On lit le volume d\'un liquide :', choix: ['au bas du ménisque', 'en haut du ménisque', 'au fond de l\'éprouvette', 'n\'importe où'], correct: 0, explication: "L'œil à la hauteur du bas du ménisque." },
  ],
};
