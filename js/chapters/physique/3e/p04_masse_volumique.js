// =====================================================================
//  p04_masse_volumique.js — Physique-chimie 3ᵉ : la masse volumique.
//  ρ = m / V, unités et conversions, mesures (balance, éprouvette),
//  flotter ou couler, liquides superposés, identifier un matériau.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur, tolRel, melanger } from '../outils.js';
import { flotteCoule, MATERIAUX } from '../figures.js';
import { tableau } from '../../commun.js';

/** Masses volumiques de référence (g/cm³). */
const RHO = [
  ['liège', 0.24], ['bois de chêne', 0.7], ['glace', 0.92], ["huile d'olive", 0.92], ['eau', 1], ['eau de mer', 1.03],
  ['aluminium', 2.7], ['verre', 2.5], ['fer', 7.87], ['cuivre', 8.96], ['plomb', 11.3], ['or', 19.3],
];
const METAUX = [['aluminium', 2.7], ['fer', 7.87], ['cuivre', 8.96], ['plomb', 11.3], ['or', 19.3]];

export default {
  id: 'p04',
  titre: 'La masse volumique',
  theme: 'pc_matiere', niveau: '3e',
  icone: '🧊',

  intro:
    "Pourquoi un paquebot en acier flotte-t-il alors qu'un clou coule ? Pourquoi l'huile reste-t-elle au-dessus de l'eau ? " +
    "La réponse tient en une grandeur : la <strong>masse volumique</strong>, la masse d'un centimètre cube de matière. Elle permet aussi d'<strong>identifier</strong> un matériau, comme un détective.",

  cours: [
    {
      type: 'definition', titre: 'Masse volumique',
      contenu: "La <strong>masse volumique</strong> $\\rho$ (lettre grecque « rhô ») d'un matériau est le quotient de la masse $m$ d'un échantillon par son volume $V$. Elle ne dépend pas de la taille de l'échantillon : c'est une caractéristique du matériau.",
      formule: '\\rho = \\dfrac{m}{V} \\qquad m = \\rho \\times V \\qquad V = \\dfrac{m}{\\rho}',
    },
    {
      type: 'propriete', titre: 'Unités et conversions',
      contenu: "Avec $m$ en g et $V$ en cm³ (ou mL), $\\rho$ est en g/cm³. Avec $m$ en kg et $V$ en m³, $\\rho$ est en kg/m³. Rappels : $1$ mL $= 1$ cm³ ; $1$ L $= 1\\,000$ cm³ $= 1$ dm³ ; $1$ m³ $= 1\\,000$ L. L'eau a une masse volumique de $1$ g/cm³ $= 1$ kg/L $= 1\\,000$ kg/m³.",
      formule: '1 \\text{ g/cm}^3 = 1\\,000 \\text{ kg/m}^3',
    },
    {
      type: 'propriete', titre: 'Mesurer une masse volumique',
      contenu: "On mesure la masse avec une <strong>balance</strong> et le volume avec une <strong>éprouvette graduée</strong>. Pour un solide de forme quelconque, on le plonge dans l'éprouvette : le volume est l'augmentation du niveau d'eau (méthode par déplacement d'eau).",
    },
    {
      type: 'propriete', titre: 'Flotter ou couler',
      contenu: "Un objet <strong>flotte</strong> sur un liquide si sa masse volumique est <strong>plus petite</strong> que celle du liquide ; sinon il coule. Deux liquides qui ne se mélangent pas se superposent : le moins dense au-dessus (l'huile flotte sur l'eau).",
    },
    { type: 'figure', titre: 'Flotte ou coule ?', contenu: "Change l'objet ou le liquide, puis observe.", render: (host) => flotteCoule(host) },
    { type: 'definition', titre: 'Quelques valeurs (g/cm³)', contenu: tableau([['Matériau', ...RHO.slice(0, 6).map((r) => r[0])], ['ρ', ...RHO.slice(0, 6).map((r) => dec(r[1]))]]) + tableau([['Matériau', ...RHO.slice(6).map((r) => r[0])], ['ρ', ...RHO.slice(6).map((r) => dec(r[1]))]]) },
    {
      type: 'exemple', enonce: 'Un cube de métal de volume $10$ cm³ a une masse de $27$ g. De quel métal s\'agit-il ?',
      solution_etapes: ['$\\rho = \\dfrac{m}{V} = \\dfrac{27}{10} = 2{,}7$ g/cm³.', "D'après le tableau, c'est de l'aluminium."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Mesurer la masse', explication: 'Balance tarée, masse en g (ou kg).' },
    { etape: 2, titre: 'Mesurer le volume', explication: "Éprouvette : lecture en bas du ménisque. Solide : volume final − volume initial. Convertis si besoin (1 mL = 1 cm³)." },
    { etape: 3, titre: 'Calculer ρ = m ÷ V', explication: 'Masse divisée par volume, dans des unités cohérentes (g et cm³ → g/cm³).' },
    { etape: 4, titre: 'Conclure', explication: "Écris l'unité, puis compare : au tableau pour identifier, au liquide pour prévoir flotter / couler." },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: 'Calcule la masse volumique (en g/cm³) :',
      generer() {
        const [nom, r] = pick(RHO.filter((x) => x[1] >= 0.5 && x[1] !== 1)), V = pick([10, 20, 25, 40, 50, 100]), m = arrondi(r * V, 2);
        return {
          enonce: `Un échantillon de ${nom} a une masse de ${dec(m)} g et un volume de ${V} cm³. Calcule sa masse volumique.`,
          ...grandeur(r, 'g/cm3', { tolerance: 0.01, pieges: [{ valeur: arrondi(V / m, 4), message: 'Tu as divisé le volume par la masse : ρ = m ÷ V (la masse au numérateur).' }] }),
          _v: { m, V, r },
        };
      },
      indices: ['$\\rho = \\dfrac{m}{V}$.', 'Masse en g, volume en cm³ : ρ sera en g/cm³.', 'Écris l\'unité après le nombre, par exemple « 2,7 g/cm3 ».'],
      correction_etapes: (st) => [`$\\rho = \\dfrac{m}{V} = \\dfrac{${dec(st._v.m).replace(',', '{,}')}}{${st._v.V}}$.`, `$\\rho = ${dec(st._v.r).replace(',', '{,}')}$ g/cm³.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Flotte ou coule ?',
      generer() {
        const [nom, r] = pick(RHO), [liq, rl] = pick([['eau', 1], ["huile d'olive", 0.92], ['eau de mer', 1.03]]);
        if (Math.abs(r - rl) < 0.02) return this.generer();
        return { enonce: `Un objet en ${nom} (ρ = ${dec(r)} g/cm³) est déposé dans de l'${liq === "huile d'olive" ? "huile d'olive" : liq} (ρ = ${dec(rl)} g/cm³).`, choix: ['il flotte', 'il coule'], correct: r < rl ? 0 : 1, ordre_fixe: true, _v: { r, rl, nom, liq } };
      },
      indices: ['Compare les deux masses volumiques.', 'Plus petite que celle du liquide : il flotte.', 'Plus grande : il coule.'],
      correction_etapes: (st) => [`${dec(st._v.r)} g/cm³ ${st._v.r < st._v.rl ? '<' : '>'} ${dec(st._v.rl)} g/cm³.`, `L'objet <strong>${st._v.r < st._v.rl ? 'flotte' : 'coule'}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: 'Calcule la masse (en kg) :',
      generer() {
        const [nom, r] = pick([["huile d'olive", 0.92], ['eau de mer', 1.03], ['lait', 1.03], ['éthanol', 0.79], ['miel', 1.4]]), V = pick([1.5, 2, 5, 10, 20]);
        return {
          enonce: `Quelle est la masse de ${dec(V)} L de ${nom} ? Sa masse volumique est ${dec(r)} kg/L.`,
          ...grandeur(arrondi(r * V, 3), 'kg', { tolerance: 0.01, pieges: [{ valeur: arrondi(V / r, 3), message: 'Tu as divisé : la masse s\'obtient en multipliant, m = ρ × V.' }] }),
          _v: { r, V, nom },
        };
      },
      indices: ['$m = \\rho \\times V$.', 'ρ en kg/L et V en L : m sera en kg.', 'Multiplie les deux nombres.'],
      correction_etapes: (st) => [`$m = \\rho \\times V = ${dec(st._v.r).replace(',', '{,}')} \\times ${dec(st._v.V).replace(',', '{,}')}$.`, `$m = ${dec(arrondi(st._v.r * st._v.V, 3)).replace(',', '{,}')}$ kg.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule le volume (en cm³) :',
      generer() {
        const [nom, r] = pick(METAUX), m = pick([100, 250, 500, 1000]), V = m / r;
        return {
          enonce: `Un objet en ${nom} (ρ = ${dec(r)} g/cm³) a une masse de ${m} g. Quel est son volume ? (arrondi au dixième)`,
          ...grandeur(arrondi(V, 1), 'cm3', { tolerance: 0.15, pieges: [{ valeur: arrondi(m * r, 1), message: 'Tu as multiplié : V = m ÷ ρ.' }] }),
          _v: { r, m, V },
        };
      },
      indices: ['$V = \\dfrac{m}{\\rho}$.', 'm en g et ρ en g/cm³ : V en cm³.', 'Arrondis au dixième et écris « cm3 ».'],
      correction_etapes: (st) => [`$V = \\dfrac{m}{\\rho} = \\dfrac{${st._v.m}}{${dec(st._v.r).replace(',', '{,}')}}$.`, `$V \\approx ${dec(arrondi(st._v.V, 1)).replace(',', '{,}')}$ cm³.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Identifie le métal :',
      generer() {
        const [nom, r] = pick(METAUX), dV = pick([4, 5, 8, 10]), V0 = pick([40, 50, 60]), m = arrondi(r * dV, 1);
        return {
          enonce: `On pèse une bille de métal : ${dec(m)} g. On la plonge dans une éprouvette : le niveau de l'eau passe de ${V0} mL à ${V0 + dV} mL. De quel métal s'agit-il ?`,
          choix: melanger(METAUX).map((x) => x[0]).sort((a, b) => (a === nom ? -1 : b === nom ? 1 : 0)), correct: 0, _v: { nom, r, dV, V0, m },
        };
      },
      indices: ['Le volume de la bille est la montée du niveau d\'eau.', '1 mL = 1 cm³.', 'Calcule ρ = m ÷ V et compare au tableau du cours.'],
      correction_etapes: (st) => [`Volume : $${st._v.V0 + st._v.dV} - ${st._v.V0} = ${st._v.dV}$ mL $= ${st._v.dV}$ cm³.`, `$\\rho = \\dfrac{${dec(st._v.m).replace(',', '{,}')}}{${st._v.dV}} \\approx ${dec(arrondi(st._v.m / st._v.dV, 2)).replace(',', '{,}')}$ g/cm³ : c'est du <strong>${st._v.nom}</strong>.`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "Un gros morceau de fer a une masse volumique plus grande qu'un petit morceau de fer.", reponse: false, _v: { e: 'Non : la masse volumique caractérise le matériau, pas la taille de l\'objet.' } },
          { enonce: 'Un glaçon flotte dans l\'eau car la glace est moins dense que l\'eau liquide.', reponse: true, _v: { e: 'Oui : 0,92 g/cm³ < 1 g/cm³.' } },
          { enonce: '1 mL correspond à 1 cm³.', reponse: true, _v: { e: 'Oui, ce sont deux écritures du même volume.' } },
          { enonce: "L'huile coule au fond de l'eau.", reponse: false, _v: { e: "Non : l'huile, moins dense (0,92 g/cm³), reste au-dessus." } },
          { enonce: 'La masse volumique de l\'eau vaut 1 000 kg/m³.', reponse: true, _v: { e: 'Oui : 1 g/cm³ = 1 000 kg/m³.' } },
        ]);
      },
      indices: ['ρ dépend du matériau, pas de la quantité.', 'Compare à 1 g/cm³ pour l\'eau.', '1 L = 1 000 mL = 1 000 cm³.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'complete', consigne: 'Convertis les masses volumiques :',
      generer() {
        const a = pick([0.8, 1.2, 2.5, 2.7, 7.87, 8.96]), b = pick([240, 700, 920, 1030, 1400]);
        return {
          enonce_complete: `${dec(a)} g/cm³ = {0} kg/m³ $\\qquad$ ${b} kg/m³ = {1} g/cm³`,
          champs: [{ reponse: arrondi(a * 1000, 2), validation: 'nombre' }, { reponse: arrondi(b / 1000, 4), validation: 'nombre' }],
          _v: { a, b },
        };
      },
      indices: ['$1$ g/cm³ $= 1\\,000$ kg/m³.', 'g/cm³ → kg/m³ : on multiplie par 1 000.', 'kg/m³ → g/cm³ : on divise par 1 000.'],
      correction_etapes: (st) => [`${dec(st._v.a)} × 1 000 = ${dec(st._v.a * 1000)} kg/m³.`, `${st._v.b} ÷ 1 000 = ${dec(st._v.b / 1000)} g/cm³.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Liquides superposés :',
      generer() {
        const liquides = melanger([['huile', 0.92], ['eau', 1], ['sirop de sucre', 1.3], ['éthanol coloré', 0.79], ['glycérine', 1.26]]).slice(0, 3);
        const ordre = [...liquides].sort((x, y) => x[1] - y[1]).map((x) => x[0]);
        const texte = (o) => o.join(' au-dessus de ');
        const choix = [texte(ordre), texte([...ordre].reverse()), texte([ordre[1], ordre[0], ordre[2]]), texte([ordre[0], ordre[2], ordre[1]])];
        return { enonce: `On verse dans une éprouvette trois liquides qui ne se mélangent pas : ${liquides.map(([n, r]) => `${n} (${dec(r)} g/cm³)`).join(', ')}. Comment se rangent-ils, de haut en bas ?`, choix, correct: 0, _v: { ordre } };
      },
      indices: ['Le liquide le moins dense monte au-dessus.', 'Range les masses volumiques par ordre croissant.', 'Le plus dense est au fond.'],
      correction_etapes: (st) => [`Du moins dense au plus dense : ${st._v.ordre.join(', ')}.`, `De haut en bas : <strong>${st._v.ordre.join(', ')}</strong>.`],
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: "La partie immergée d'un iceberg :",
      generer() {
        const rg = pick([0.9, 0.91, 0.92]), rl = pick([1.02, 1.025, 1.03]), p = (rg / rl) * 100;
        return {
          enonce: `On admet que la fraction immergée d'un objet qui flotte vaut $\\dfrac{\\rho_{\\text{objet}}}{\\rho_{\\text{liquide}}}$. Un iceberg (glace : ${dec(rg)} g/cm³) flotte dans l'eau de mer (${dec(rl)} g/cm³). Quel pourcentage de son volume est immergé ? (arrondi à l'unité)`,
          reponse: Math.round(p), validation: 'nombre', tolerance: 1, _v: { rg, rl, p },
        };
      },
      indices: ['Calcule le quotient des deux masses volumiques.', 'Multiplie par 100 pour obtenir un pourcentage.', "C'est de là que vient l'expression « la partie cachée de l'iceberg »."],
      correction_etapes: (st) => [`$\\dfrac{${dec(st._v.rg).replace(',', '{,}')}}{${dec(st._v.rl).replace(',', '{,}')}} \\approx ${dec(arrondi(st._v.p / 100, 3)).replace(',', '{,}')}$.`, `Environ <strong>${Math.round(st._v.p)} %</strong> du volume est sous l'eau : seulement ${100 - Math.round(st._v.p)} % dépasse.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La masse volumique se calcule par :', choix: ['ρ = m ÷ V', 'ρ = V ÷ m', 'ρ = m × V', 'ρ = m + V'], correct: 0, explication: 'Masse divisée par volume.' },
    { type: 'qcm', question: 'Un objet flotte sur l\'eau si sa masse volumique est :', choix: ['inférieure à 1 g/cm³', 'supérieure à 1 g/cm³', 'égale à 0', "n'importe laquelle"], correct: 0, explication: "L'eau a une masse volumique de 1 g/cm³." },
    {
      type: 'saisie', question: 'Calcul.',
      generer() { const [nom, r] = pick(METAUX), V = pick([10, 20, 50]); return { question: `Un objet en ${nom} de volume ${V} cm³ a une masse de ${dec(arrondi(r * V, 1))} g. Calcule sa masse volumique en g/cm³.`, ...grandeur(r, 'g/cm3', { tolerance: 0.01 }), explication: `$\\rho = ${dec(arrondi(r * V, 1)).replace(',', '{,}')} \\div ${V} = ${dec(r).replace(',', '{,}')}$ g/cm³ : c'est du ${nom}.` }; },
    },
    { type: 'vrai_faux', question: '1 L d\'eau a une masse de 1 kg.', reponse: true, explication: "ρ(eau) = 1 kg/L." },
    { type: 'qcm', question: 'Pour mesurer le volume d\'un caillou, on utilise :', choix: ['une éprouvette graduée remplie d\'eau', 'une balance', 'un thermomètre', 'un dynamomètre'], correct: 0, explication: 'Le volume du caillou est la montée du niveau d\'eau.' },
  ],
};
