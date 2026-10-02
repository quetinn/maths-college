// =====================================================================
//  p10_puissance_energie.js — Physique-chimie 3ᵉ : puissance et énergie
//  électriques. P = U × I, E = P × t (J et kWh), facture d'électricité,
//  sécurité (intensités qui s'additionnent, disjoncteur, fusible).
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur, tolRel } from '../outils.js';
import { compteur } from '../figures.js';

const t = (x, n = 3) => dec(arrondi(x, n)).replace(',', '{,}');
const PRIX = 0.2; // € par kWh : tarif réglementé, option base, août 2026 (0,2001 €), arrondi

export default {
  id: 'p10',
  titre: 'Puissance et énergie électriques',
  theme: 'pc_energie', niveau: '3e',
  icone: '🔌',

  intro:
    "Sur chaque appareil électrique est inscrite une <strong>puissance</strong> en watts : 10 W pour une ampoule LED, 2 000 W pour une bouilloire. " +
    "Plus un appareil est puissant et plus il fonctionne longtemps, plus il consomme d'<strong>énergie</strong>, et plus la facture grimpe. " +
    "On apprend à calculer puissance, énergie et coût, et à comprendre pourquoi on ne branche pas tout sur la même multiprise.",

  cours: [
    {
      type: 'definition', titre: 'Puissance nominale',
      contenu: "La <strong>puissance nominale</strong> d'un appareil, inscrite sur son étiquette, est la puissance qu'il reçoit en fonctionnement normal. Elle s'exprime en <strong>watts</strong> (W) ; $1$ kW $= 1\\,000$ W. En France, les prises délivrent une tension de $230$ V.",
    },
    {
      type: 'propriete', titre: 'Puissance, tension et intensité',
      contenu: "La puissance reçue par un appareil est égale au produit de la tension à ses bornes par l'intensité du courant qui le traverse.",
      formule: 'P = U \\times I \\qquad (P \\text{ en W},\\ U \\text{ en V},\\ I \\text{ en A})',
    },
    {
      type: 'propriete', titre: "L'énergie électrique",
      contenu: "L'énergie consommée dépend de la puissance et de la durée de fonctionnement. En joules avec $P$ en W et $t$ en s ; en <strong>kilowattheures</strong> (kWh) avec $P$ en kW et $t$ en h — c'est l'unité de la facture.",
      formule: 'E = P \\times t \\qquad 1 \\text{ kWh} = 3{,}6 \\times 10^{6} \\text{ J}',
    },
    { type: 'figure', titre: 'Le compteur électrique', contenu: "Allume des appareils : les puissances s'additionnent et le disque tourne plus vite. Règle la durée pour voir l'énergie et le coût.", render: (host) => compteur(host) },
    {
      type: 'propriete', titre: 'Sécurité électrique',
      contenu: "Les appareils d'une maison sont branchés en <strong>dérivation</strong> : leurs intensités <strong>s'additionnent</strong> dans le fil principal. Si l'intensité dépasse la valeur maximale (16 A pour une prise classique), les fils chauffent (effet Joule) : risque d'incendie. Le <strong>disjoncteur</strong> ou le <strong>fusible</strong> coupe alors le courant. La <strong>prise de terre</strong> protège contre l'électrocution.",
    },
    {
      type: 'exemple', enonce: 'Une bouilloire de $2\\,000$ W fonctionne $6$ min. Quelle énergie consomme-t-elle ?',
      solution_etapes: ['$P = 2$ kW et $t = 6$ min $= 0{,}1$ h.', '$E = P \\times t = 2 \\times 0{,}1 = 0{,}2$ kWh.', 'En joules : $2\\,000 \\times 360 = 720\\,000$ J.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Choisir le système d\'unités', explication: 'Joules : W et s. kWh : kW et h. Ne mélange jamais les deux.' },
    { etape: 2, titre: 'Convertir', explication: 'W → kW : ÷ 1 000. min → h : ÷ 60. min → s : × 60.' },
    { etape: 3, titre: 'Calculer', explication: '$P = U \\times I$, $I = P \\div U$, $E = P \\times t$.' },
    { etape: 4, titre: 'Interpréter', explication: 'Coût = énergie (kWh) × prix du kWh. Sécurité : additionne les intensités et compare à la limite.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: 'Calcule la puissance (en W) :',
      generer() {
        const [U, I] = pick([[230, pick([0.5, 2, 4, 5, 8])], [12, pick([2, 3, 5])], [6, pick([0.5, 1.5, 2])], [4.5, pick([0.2, 0.4])]]);
        return {
          enonce: `Un appareil fonctionne sous une tension de ${dec(U)} V et est traversé par un courant de ${dec(I)} A. Quelle puissance reçoit-il ?`,
          ...grandeur(arrondi(U * I, 3), 'W', { tolerance: 0.01, pieges: [{ valeur: arrondi(U / I, 4), message: 'La puissance est un produit : P = U × I.' }] }),
          _v: { U, I },
        };
      },
      indices: ['$P = U \\times I$.', 'U en V et I en A : P en W.', 'Multiplie.'],
      correction_etapes: (st) => [`$P = U \\times I = ${t(st._v.U)} \\times ${t(st._v.I)} = ${t(st._v.U * st._v.I)}$ W.`],
    },
    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: "Calcule l'énergie consommée (en kWh) :",
      generer() {
        const [nom, P, pr] = pick([['Un ordinateur portable', 60, 'il'], ['Une télévision', 100, 'elle'], ['Un réfrigérateur', 150, 'il'], ['Un aspirateur', 800, 'il'], ['Un sèche-cheveux', 1500, 'il'], ['Une bouilloire', 2000, 'elle'], ['Un four', 2500, 'il']]), h = pick([0.5, 1, 2, 3, 4, 5]);
        return {
          enonce: `${nom} de ${P} W fonctionne pendant ${dec(h)} h. Quelle énergie consomme-t-${pr} ?`,
          ...grandeur(arrondi((P / 1000) * h, 4), 'kWh', { tolerance: 0.001, pieges: [{ valeur: P * h, message: 'Pour obtenir des kWh, la puissance doit être en kW (÷ 1 000).' }] }),
          _v: { P, h, nom },
        };
      },
      indices: ['$E = P \\times t$.', 'En kWh : P en kW (÷ 1 000) et t en h.', 'Écris « kWh » après le nombre.'],
      correction_etapes: (st) => [`$P = ${st._v.P}$ W $= ${t(st._v.P / 1000)}$ kW.`, `$E = ${t(st._v.P / 1000)} \\times ${t(st._v.h)} = ${t((st._v.P / 1000) * st._v.h, 4)}$ kWh.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: "Calcule l'intensité (en A) :",
      generer() {
        const [nom, P] = pick([['bouilloire', 2300], ['radiateur', 1150], ['four', 2760], ['lave-linge', 1840], ['aspirateur', 690], ['fer à repasser', 1610]]);
        return {
          enonce: `Un${nom === 'bouilloire' ? 'e' : ''} ${nom} de ${P} W est branché${nom === 'bouilloire' ? 'e' : ''} sur une prise de 230 V. Quelle est l'intensité du courant qui ${nom === 'bouilloire' ? 'la' : 'le'} traverse ?`,
          ...grandeur(P / 230, 'A', { tolerance: 0.01, pieges: [{ valeur: P * 230, message: 'On cherche I : I = P ÷ U.' }] }),
          _v: { P, nom },
        };
      },
      indices: ['$P = U \\times I$, donc $I = \\dfrac{P}{U}$.', 'U = 230 V.', 'Résultat en ampères.'],
      correction_etapes: (st) => [`$I = \\dfrac{P}{U} = \\dfrac{${st._v.P}}{230} = ${t(st._v.P / 230)}$ A.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: "Coût d'utilisation (en €) :",
      generer() {
        const [nom, P] = pick([['un four', 2500], ['un radiateur', 2000], ['une console de jeux', 200], ['une télévision', 100], ['un sèche-linge', 3000]]), h = pick([2, 3, 4, 5, 10, 20]);
        const E = (P / 1000) * h, cout = arrondi(E * PRIX, 2);
        return { enonce: `${nom[0].toUpperCase() + nom.slice(1)} de ${P} W fonctionne ${h} h. Le kWh coûte 0,20 €. Combien coûte cette utilisation ? (en €, au centime)`, reponse: cout, validation: 'nombre', tolerance: 0.011, pieges: [{ valeur: arrondi(P * h * PRIX, 2), message: 'Calcule d\'abord l\'énergie en kWh (P en kW), puis multiplie par le prix.' }], _v: { P, h, E, cout } };
      },
      indices: ['Calcule l\'énergie en kWh : $E = P \\times t$ avec P en kW.', 'Coût = E × prix du kWh.', 'Arrondis au centime.'],
      correction_etapes: (st) => [`$E = ${t(st._v.P / 1000)} \\times ${st._v.h} = ${t(st._v.E)}$ kWh.`, `Coût : $${t(st._v.E)} \\times 0{,}20 \\approx ${t(st._v.cout, 2)}$ €.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: "Énergie en joules :",
      generer() {
        const P = pick([60, 100, 500, 1000, 1500, 2000]), min = pick([1, 2, 5, 10, 15]);
        return {
          enonce: `Un appareil de ${P} W fonctionne pendant ${min} min. Calcule l'énergie consommée en joules.`,
          ...grandeur(P * min * 60, 'J', { tolerance: 1, pieges: [{ valeur: P * min, message: 'En joules, la durée doit être en secondes (× 60).' }] }),
          _v: { P, min },
        };
      },
      indices: ['$E = P \\times t$ en J : P en W, t en s.', '1 min = 60 s.', 'Le résultat peut être grand : c\'est normal, le joule est une petite unité.'],
      correction_etapes: (st) => [`$t = ${st._v.min} \\times 60 = ${st._v.min * 60}$ s.`, `$E = ${st._v.P} \\times ${st._v.min * 60} = ${st._v.P * st._v.min * 60}$ J.`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Le kilowattheure (kWh) est une unité de puissance.', reponse: false, _v: { e: "Non : c'est une unité d'énergie (puissance × durée)." } },
          { enonce: "Les intensités des appareils branchés sur une multiprise s'additionnent.", reponse: true, _v: { e: 'Oui : ils sont en dérivation, le fil de la multiprise transporte la somme des intensités.' } },
          { enonce: 'Le disjoncteur coupe le courant si l\'intensité est trop grande.', reponse: true, _v: { e: 'Oui : il protège les fils contre la surchauffe.' } },
          { enonce: '1 kW = 100 W.', reponse: false, _v: { e: 'Non : 1 kW = 1 000 W.' } },
          { enonce: 'Plus un appareil fonctionne longtemps, plus il consomme d\'énergie.', reponse: true, _v: { e: 'Oui : E = P × t.' } },
        ]);
      },
      indices: ['kWh = kW × h.', 'Dérivation : les intensités s\'additionnent.', '1 kW = 1 000 W.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Sécurité de la multiprise :',
      generer() {
        const choix = pick([[['bouilloire', 2000], ['four', 2500]], [['radiateur', 2000], ['sèche-cheveux', 1500]], [['télévision', 100], ['console', 200], ['box', 15]], [['lave-linge', 2200], ['sèche-linge', 2500]], [['ordinateur', 60], ['lampe', 10], ['imprimante', 30]]]);
        const P = choix.reduce((s, a) => s + a[1], 0), I = P / 230;
        return {
          enonce: `Sur une multiprise de 230 V qui supporte 16 A au maximum, on branche en même temps : ${choix.map(([n, p]) => `${n} (${p} W)`).join(', ')}. Est-ce sans danger ?`,
          choix: ['oui, l\'intensité totale reste inférieure à 16 A', 'non, l\'intensité totale dépasse 16 A'], correct: I <= 16 ? 0 : 1, ordre_fixe: true, _v: { P, I },
        };
      },
      indices: ['Additionne les puissances.', '$I = \\dfrac{P}{U}$ avec U = 230 V.', 'Compare à 16 A.'],
      correction_etapes: (st) => [`Puissance totale : ${st._v.P} W.`, `$I = ${st._v.P} \\div 230 \\approx ${t(st._v.I, 1)}$ A.`, st._v.I <= 16 ? 'Inférieur à 16 A : pas de danger.' : '<strong>Supérieur à 16 A</strong> : les fils surchauffent, le disjoncteur doit couper.'],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Les appareils en veille :',
      generer() {
        const P = pick([2, 3, 5, 8, 10]), n = pick([3, 4, 5, 6]);
        const E = (P * n * 24 * 365) / 1000;
        return {
          enonce: `Dans une maison, ${n} appareils restent en veille toute l'année, chacun consommant ${P} W. Quelle énergie (en kWh) cela représente-t-il sur un an (365 jours) ?`,
          ...grandeur(arrondi(E, 2), 'kWh', { tolerance: tolRel(E, 0.5) }), _v: { P, n, E },
        };
      },
      indices: ['Puissance totale : nombre d\'appareils × puissance.', 'Durée : 24 h × 365 jours.', 'En kWh : P en kW.'],
      correction_etapes: (st) => [`$P = ${st._v.n} \\times ${st._v.P} = ${st._v.n * st._v.P}$ W $= ${t((st._v.n * st._v.P) / 1000)}$ kW.`, `$t = 24 \\times 365 = 8\\,760$ h.`, `$E = ${t((st._v.n * st._v.P) / 1000)} \\times 8\\,760 \\approx ${t(st._v.E, 1)}$ kWh, soit environ ${dec(arrondi(st._v.E * PRIX, 0))} € par an.`],
    },
    {
      id: 'e09', niveau: 3, type: 'complete', consigne: 'Conversions :',
      generer() {
        const kwh = pick([1, 2, 5, 0.5]), W = pick([1500, 2500, 800, 60]);
        return {
          enonce_complete: `${dec(kwh)} kWh = {0} J $\\qquad$ ${W} W = {1} kW`,
          champs: [{ reponse: kwh * 3.6e6, validation: 'nombre' }, { reponse: W / 1000, validation: 'nombre' }],
          _v: { kwh, W },
        };
      },
      indices: ['1 kWh = 1 000 W × 3 600 s.', '1 kWh = 3 600 000 J.', 'W → kW : ÷ 1 000.'],
      correction_etapes: (st) => [`${dec(st._v.kwh)} × 3 600 000 = ${dec(st._v.kwh * 3.6e6)} J.`, `${st._v.W} ÷ 1 000 = ${dec(st._v.W / 1000)} kW.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La puissance électrique vaut :', choix: ['P = U × I', 'P = U ÷ I', 'P = R × I', 'P = E × t'], correct: 0, explication: 'En W, avec U en V et I en A.' },
    { type: 'qcm', question: "L'unité d'énergie utilisée sur les factures est :", choix: ['le kilowattheure (kWh)', 'le watt (W)', "l'ampère (A)", 'le volt (V)'], correct: 0, explication: '1 kWh = 3,6 × 10⁶ J.' },
    {
      type: 'saisie', question: 'Énergie.',
      generer() { const P = pick([1, 2]), h = pick([2, 3]); return { question: `Énergie consommée par un appareil de ${P} kW pendant ${h} h ?`, ...grandeur(P * h, 'kWh', { tolerance: 0.001 }), explication: `${P} × ${h} = ${P * h} kWh.` }; },
    },
    { type: 'vrai_faux', question: "Sur une multiprise, les intensités des appareils s'additionnent.", reponse: true, explication: 'Ils sont branchés en dérivation.' },
    { type: 'qcm', question: 'Le rôle du disjoncteur est de :', choix: ['couper le courant si l\'intensité est trop grande', 'augmenter la tension', 'mesurer l\'énergie', 'refroidir les fils'], correct: 0, explication: 'Il protège l\'installation contre les surintensités.' },
  ],
};
