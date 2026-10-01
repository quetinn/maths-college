// =====================================================================
//  p09_loi_ohm.js — Physique-chimie 3ᵉ : résistance et loi d'Ohm.
//  Résistance (Ω), mesures (ampèremètre en série, voltmètre en
//  dérivation, ohmmètre), loi d'Ohm U = R × I, caractéristique.
//  Figure phare : les électrons circulent dans le circuit.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { circuit, caracteristique, schemaCircuit } from '../figures.js';
import { tableau } from '../../commun.js';

const t = (x, n = 3) => dec(arrondi(x, n)).replace(',', '{,}');
const RS = [10, 15, 22, 33, 47, 50, 68, 100, 150, 220, 330, 470, 1000];

export default {
  id: 'p09',
  titre: "Résistance et loi d'Ohm",
  theme: 'pc_energie', niveau: '3e',
  icone: '💡',

  intro:
    "Pourquoi une lampe brille-t-elle moins quand on ajoute une résistance dans le circuit ? Parce qu'une <strong>résistance</strong> s'oppose au passage du courant. " +
    "Pour un conducteur ohmique, la tension et l'intensité sont liées par une loi toute simple, la <strong>loi d'Ohm</strong> : $U = R \\times I$. " +
    "Regarde les électrons ralentir quand la résistance augmente.",

  cours: [
    {
      type: 'definition', titre: 'La résistance',
      contenu: "Un <strong>conducteur ohmique</strong> (appelé couramment « résistance ») est un dipôle qui s'oppose plus ou moins au passage du courant. Cette opposition est mesurée par sa <strong>résistance</strong> $R$, en <strong>ohms</strong> (Ω), avec un <strong>ohmmètre</strong> (hors circuit). Dans un circuit en série, plus la résistance est grande, plus l'<strong>intensité</strong> du courant est faible.",
    },
    {
      type: 'propriete', titre: 'Mesurer U et I',
      contenu: "L'<strong>intensité</strong> $I$ (en ampères, A) se mesure avec un <strong>ampèremètre branché en série</strong>. La <strong>tension</strong> $U$ (en volts, V) se mesure avec un <strong>voltmètre branché en dérivation</strong> aux bornes du dipôle. Rappel : $1$ A $= 1\\,000$ mA.",
    },
    { type: 'figure', titre: 'Les électrons dans le circuit', contenu: "Les électrons partent du pôle − de la pile et reviennent au pôle +. Augmente la résistance : ils ralentissent, l'intensité diminue.", render: (host) => circuit(host, { U: 6, R: 40, lampe: true, reglerU: true }) },
    {
      type: 'propriete', titre: "La loi d'Ohm",
      contenu: "La tension $U$ aux bornes d'un conducteur ohmique est <strong>proportionnelle</strong> à l'intensité $I$ du courant qui le traverse. Le coefficient de proportionnalité est sa résistance $R$.",
      formule: 'U = R \\times I \\qquad I = \\dfrac{U}{R} \\qquad R = \\dfrac{U}{I}',
    },
    {
      type: 'propriete', titre: 'Unités obligatoires',
      contenu: "Dans $U = R \\times I$ : $U$ en <strong>volts</strong>, $R$ en <strong>ohms</strong>, $I$ en <strong>ampères</strong>. Une intensité en mA doit d'abord être convertie : $150$ mA $= 0{,}15$ A.",
    },
    { type: 'figure', titre: 'Caractéristique U = f(I)', contenu: 'Pour un conducteur ohmique, les points de mesure sont alignés avec l\'origine : c\'est une situation de proportionnalité.', render: (host) => caracteristique(host) },
    {
      type: 'exemple', enonce: 'Un conducteur ohmique de $40$ Ω est branché aux bornes d\'une pile de $6$ V. Quelle est l\'intensité du courant ?',
      solution_etapes: ['$I = \\dfrac{U}{R} = \\dfrac{6}{40}$.', '$I = 0{,}15$ A, soit $150$ mA.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer les données', explication: 'Note U, R, I avec leurs unités.' },
    { etape: 2, titre: 'Convertir', explication: 'mA → A (÷ 1 000), kΩ → Ω (× 1 000).' },
    { etape: 3, titre: 'Choisir la formule', explication: '$U = R \\times I$ ; $I = U \\div R$ ; $R = U \\div I$. Astuce : cache la grandeur cherchée dans le triangle U / (R · I).' },
    { etape: 4, titre: "Calculer et écrire l'unité", explication: 'V, A ou Ω. Vérifie l\'ordre de grandeur : quelques volts, quelques dixièmes d\'ampère…' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: 'Calcule la tension (en V) :',
      generer() {
        const R = pick([10, 20, 50, 100, 200]), I = pick([0.02, 0.05, 0.1, 0.12, 0.2, 0.3]), U = arrondi(R * I, 4);
        return {
          enonce: `Un conducteur ohmique de résistance ${R} Ω est traversé par un courant d'intensité ${dec(I)} A. Quelle est la tension à ses bornes ?`,
          visuel: (h) => { h.innerHTML = schemaCircuit({ U: 'U = ?', R: `${R} Ω`, I: `${dec(I)} A` }); },
          ...grandeur(U, 'V', { tolerance: 0.001, pieges: [{ valeur: arrondi(R / I, 4), message: 'Tu as divisé R par I. La loi d\'Ohm : U = R × I.' }] }),
          _v: { R, I, U },
        };
      },
      indices: ["Loi d'Ohm : $U = R \\times I$.", 'R en Ω et I en A : U en V.', 'Multiplie.'],
      correction_etapes: (st) => [`$U = R \\times I = ${st._v.R} \\times ${t(st._v.I)}$.`, `$U = ${t(st._v.U)}$ V.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Mesures électriques :',
      generer() {
        return pick([
          { enonce: "Pour mesurer l'intensité du courant, on branche :", choix: ['un ampèremètre en série', 'un ampèremètre en dérivation', 'un voltmètre en série', 'un ohmmètre en série'], correct: 0, _v: { e: "L'ampèremètre est traversé par le courant : il est en série." } },
          { enonce: 'Pour mesurer la tension aux bornes d\'une lampe, on branche :', choix: ['un voltmètre en dérivation', 'un voltmètre en série', 'un ampèremètre en dérivation', 'un ohmmètre'], correct: 0, _v: { e: 'Le voltmètre se branche aux deux bornes du dipôle : en dérivation.' } },
          { enonce: "L'unité de la résistance est :", choix: ["l'ohm (Ω)", "l'ampère (A)", 'le volt (V)', 'le watt (W)'], correct: 0, _v: { e: 'La résistance se mesure en ohms, avec un ohmmètre.' } },
          { enonce: "L'intensité du courant s'exprime en :", choix: ['ampères (A)', 'volts (V)', 'ohms (Ω)', 'joules (J)'], correct: 0, _v: { e: 'On utilise aussi le milliampère : 1 A = 1 000 mA.' } },
        ]);
      },
      indices: ['Ampèremètre : en série. Voltmètre : en dérivation.', 'I en A, U en V, R en Ω.', 'L\'ohmmètre mesure R hors du circuit.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: "Calcule l'intensité du courant :",
      generer() {
        let U, R, I;
        do { U = pick([1.5, 3, 4.5, 6, 9, 12]); R = pick(RS.slice(0, 9)); I = U / R; } while (Math.abs(Math.round(I * 1e4) - I * 1e4) > 1e-6);
        return {
          enonce: `Un conducteur ohmique de ${R} Ω est branché aux bornes d'une pile de ${dec(U)} V. Quelle est l'intensité du courant ? (en A ou en mA)`,
          visuel: (h) => { h.innerHTML = schemaCircuit({ U: `${dec(U)} V`, R: `${R} Ω`, I: 'I = ?' }); },
          ...grandeur(I, 'A', { tolerance: 0.0001, pieges: [{ valeur: U * R, message: 'Tu as calculé R × U. On cherche I : I = U ÷ R.' }, { valeur: R / U, message: 'Inversé : I = U ÷ R (la tension au numérateur).' }] }),
          _v: { U, R, I },
        };
      },
      indices: ['$I = \\dfrac{U}{R}$.', 'U en V, R en Ω : I en A.', 'Tu peux aussi répondre en mA (× 1 000).'],
      correction_etapes: (st) => [`$I = \\dfrac{U}{R} = \\dfrac{${t(st._v.U)}}{${st._v.R}}$.`, `$I = ${t(st._v.I, 4)}$ A, soit ${dec(arrondi(st._v.I * 1000, 1))} mA.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule la résistance (en Ω) :',
      generer() {
        const R = pick(RS), mA = pick([5, 10, 20, 25, 40, 50]), U = arrondi((R * mA) / 1000, 4);
        return {
          enonce: `Aux bornes d'un conducteur ohmique, la tension vaut ${dec(U)} V quand il est traversé par ${mA} mA. Quelle est sa résistance ?`,
          ...grandeur(R, 'Ω', { tolerance: 0.5, pieges: [{ valeur: arrondi(U / mA, 6), message: "L'intensité doit être en ampères : " + mA + ' mA = ' + dec(mA / 1000) + ' A.' }] }),
          _v: { R, mA, U },
        };
      },
      indices: ['$R = \\dfrac{U}{I}$.', 'Convertis les mA en A : ÷ 1 000.', 'Résultat en ohms (Ω) — au clavier, tu peux écrire « ohm ».'],
      correction_etapes: (st) => [`$I = ${st._v.mA}$ mA $= ${t(st._v.mA / 1000)}$ A.`, `$R = \\dfrac{U}{I} = \\dfrac{${t(st._v.U)}}{${t(st._v.mA / 1000)}} = ${st._v.R}$ Ω.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Effet de la résistance :',
      generer() {
        const plus = Math.random() < 0.5;
        return { enonce: `Dans un circuit en série avec une pile et une lampe, on remplace le conducteur ohmique par un autre de résistance ${plus ? 'plus grande' : 'plus petite'}. La lampe :`, choix: plus ? ['brille moins, car l\'intensité diminue', 'brille plus, car l\'intensité augmente', 'brille pareil', "s'éteint forcément"] : ['brille plus, car l\'intensité augmente', 'brille moins, car l\'intensité diminue', 'brille pareil', "s'éteint forcément"], correct: 0, _v: { plus } };
      },
      indices: ['La résistance s\'oppose au passage du courant.', 'Plus R est grande, plus I est petite.', "L'éclat de la lampe dépend de l'intensité."],
      correction_etapes: (st) => [st._v.plus ? 'Une résistance plus grande s\'oppose davantage au courant : l\'intensité diminue et la lampe <strong>brille moins</strong>.' : 'Une résistance plus petite laisse passer plus de courant : l\'intensité augmente et la lampe <strong>brille plus</strong>.'],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "Un ampèremètre se branche en série.", reponse: true, _v: { e: 'Oui : le courant doit le traverser.' } },
          { enonce: "La loi d'Ohm s'applique à tous les dipôles, y compris les lampes.", reponse: false, _v: { e: "Non : seulement aux conducteurs ohmiques. La caractéristique d'une lampe n'est pas une droite." } },
          { enonce: '250 mA = 0,25 A.', reponse: true, _v: { e: '250 ÷ 1 000 = 0,25.' } },
          { enonce: "Plus la résistance est grande, plus l'intensité est grande (tension fixée).", reponse: false, _v: { e: 'Non : I = U ÷ R diminue quand R augmente.' } },
          { enonce: "La caractéristique d'un conducteur ohmique est une droite passant par l'origine.", reponse: true, _v: { e: 'Oui : U est proportionnelle à I.' } },
        ]);
      },
      indices: ['I = U ÷ R.', '1 A = 1 000 mA.', 'Loi d\'Ohm : conducteurs ohmiques seulement.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Exploite la caractéristique :',
      generer() {
        const R = pick([20, 25, 40, 50, 100, 200]), Is = [0.01, 0.02, 0.04, 0.06];
        return {
          enonce: "Voici des mesures effectuées sur un dipôle :" + tableau([['I (A)', ...Is.map((x) => dec(x))], ['U (V)', ...Is.map((x) => dec(arrondi(R * x, 3)))]]) + 'Montre qu\'il s\'agit d\'un conducteur ohmique et donne sa résistance.',
          ...grandeur(R, 'Ω', { tolerance: 0.5 }), _v: { R, Is },
        };
      },
      indices: ['Calcule U ÷ I pour chaque colonne.', 'Même quotient partout : proportionnalité, donc loi d\'Ohm.', 'Ce quotient est R, en ohms.'],
      correction_etapes: (st) => [`$\\dfrac{U}{I}$ vaut ${st._v.R} pour chaque mesure : U est proportionnelle à I, c'est un conducteur ohmique.`, `$R = ${st._v.R}$ Ω.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Conducteur ohmique ou non ?',
      generer() {
        const ohmique = Math.random() < 0.5, Is = [0.05, 0.1, 0.15, 0.2];
        const Us = ohmique ? Is.map((i) => arrondi(40 * i, 2)) : [0.8, 1.9, 3.6, 6];
        return {
          enonce: "Mesures sur un dipôle :" + tableau([['I (A)', ...Is.map((x) => dec(x))], ['U (V)', ...Us.map((x) => dec(x))]]) + 'Ce dipôle est-il un conducteur ohmique ?',
          choix: ['oui : U ÷ I est constant', 'non : U ÷ I change'], correct: ohmique ? 0 : 1, ordre_fixe: true, _v: { ohmique, Us, Is },
        };
      },
      indices: ['Calcule U ÷ I pour chaque colonne.', 'Constant : proportionnalité.', 'Une lampe, par exemple, ne suit pas la loi d\'Ohm.'],
      correction_etapes: (st) => [`Quotients U ÷ I : ${st._v.Us.map((u, k) => dec(arrondi(u / st._v.Is[k], 1))).join(' ; ')}.`, st._v.ohmique ? 'Toujours 40 : c\'est un conducteur ohmique (R = 40 Ω).' : "Le quotient change : ce n'est <strong>pas</strong> un conducteur ohmique (c'est peut-être une lampe)."],
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Tension maximale :',
      generer() {
        const R = pick([100, 150, 220, 330, 470]), mA = pick([20, 30, 50, 100]), U = (R * mA) / 1000;
        return {
          enonce: `Un conducteur ohmique de ${R} Ω supporte au maximum ${mA} mA sans chauffer dangereusement. Quelle tension maximale peut-on appliquer à ses bornes ?`,
          ...grandeur(arrondi(U, 3), 'V', { tolerance: 0.01, pieges: [{ valeur: R * mA, message: 'Convertis les mA en A avant d\'appliquer U = R × I.' }] }),
          _v: { R, mA, U },
        };
      },
      indices: ['$U = R \\times I$.', `${'mA'} → A : ÷ 1 000.`, 'Le résultat est en volts.'],
      correction_etapes: (st) => [`$I_{\\max} = ${st._v.mA}$ mA $= ${t(st._v.mA / 1000)}$ A.`, `$U_{\\max} = ${st._v.R} \\times ${t(st._v.mA / 1000)} = ${t(st._v.U)}$ V.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "La loi d'Ohm s'écrit :", choix: ['U = R × I', 'U = R ÷ I', 'I = R × U', 'R = U × I'], correct: 0, explication: 'Avec U en V, R en Ω, I en A.' },
    { type: 'qcm', question: 'Un voltmètre se branche :', choix: ['en dérivation', 'en série', 'hors du circuit', "à la place de la pile"], correct: 0, explication: 'Aux bornes du dipôle étudié.' },
    {
      type: 'saisie', question: 'Intensité.',
      generer() { const U = pick([6, 12]), R = pick([20, 60, 120]); return { question: `Quelle intensité traverse une résistance de ${R} Ω soumise à ${U} V ?`, ...grandeur(U / R, 'A', { tolerance: 0.001 }), explication: `$I = ${U} \\div ${R} = ${t(U / R, 3)}$ A.` }; },
    },
    { type: 'vrai_faux', question: '0,05 A = 50 mA.', reponse: true, explication: '0,05 × 1 000 = 50.' },
    { type: 'qcm', question: "Quand on augmente la résistance d'un circuit (même pile), l'intensité :", choix: ['diminue', 'augmente', 'ne change pas', 'devient nulle'], correct: 0, explication: 'I = U ÷ R.' },
  ],
};
