// =====================================================================
//  pr07_intensite_tension.js — Physique-chimie 4ᵉ : intensité et tension.
//  Ampèremètre (en série) et voltmètre (en dérivation), unités, lois
//  des circuits en série (unicité de I, additivité de U) et en
//  dérivation (loi des nœuds, égalité des tensions), valeurs nominales.
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur } from '../outils.js';
import { circuitLampes, schemaMontage } from '../figures_cycle.js';
import { tableau } from '../../commun.js';

const t = (x) => dec(x).replace(',', '{,}');

export default {
  id: 'pr07',
  titre: 'Intensité et tension',
  theme: 'pc_energie', niveau: '4e',
  icone: '🔋',

  intro:
    "Une pile « 4,5 V », un chargeur « 2 A », une ampoule « 6 V – 0,3 A » : ces nombres décrivent deux grandeurs électriques essentielles, la <strong>tension</strong> et l'<strong>intensité</strong>. " +
    "On apprend à les mesurer, puis à découvrir les lois qu'elles suivent dans un circuit en série et en dérivation.",

  cours: [
    {
      type: 'definition', titre: "L'intensité du courant",
      contenu: "L'<strong>intensité</strong> $I$ mesure le débit du courant électrique. Elle s'exprime en <strong>ampères</strong> (A) ; $1$ A $= 1\\,000$ mA. On la mesure avec un <strong>ampèremètre</strong> branché <strong>en série</strong> (le courant doit le traverser), le courant entrant par la borne A (ou mA) et sortant par la borne COM.",
    },
    {
      type: 'definition', titre: 'La tension électrique',
      contenu: "La <strong>tension</strong> $U$ entre deux points d'un circuit s'exprime en <strong>volts</strong> (V). On la mesure avec un <strong>voltmètre</strong> branché <strong>en dérivation</strong>, aux bornes du dipôle. Un générateur a une tension à ses bornes même quand il ne débite pas ; un fil de connexion a une tension quasi nulle.",
    },
    { type: 'figure', titre: 'Mesurer dans un circuit', contenu: "Lis les appareils de mesure en série, puis en dérivation. Essaie avec des lampes différentes.", render: (host) => circuitLampes(host, { mesures: true }) },
    {
      type: 'propriete', titre: 'Lois du circuit en série',
      contenu: "<strong>Unicité de l'intensité</strong> : l'intensité est la même en tout point. <strong>Additivité des tensions</strong> : la tension aux bornes du générateur est égale à la somme des tensions aux bornes des récepteurs.",
      formule: 'I = I_1 = I_2 \\qquad U = U_1 + U_2',
    },
    {
      type: 'propriete', titre: 'Lois du circuit en dérivation',
      contenu: "<strong>Loi des nœuds</strong> : l'intensité dans la branche principale est égale à la somme des intensités dans les branches dérivées. <strong>Égalité des tensions</strong> : les dipôles branchés en dérivation ont la même tension à leurs bornes.",
      formule: 'I = I_1 + I_2 \\qquad U = U_1 = U_2',
    },
    {
      type: 'propriete', titre: 'Valeurs nominales',
      contenu: "Une lampe marquée « 6 V – 0,3 A » fonctionne normalement sous une tension de $6$ V : c'est sa <strong>tension nominale</strong>. Sous une tension plus faible, elle brille peu (<strong>sous-tension</strong>) ; sous une tension plus grande, elle brille trop et risque de <strong>griller</strong> (surtension)." +
        tableau([['Grandeur', 'Symbole', 'Unité', 'Appareil', 'Branchement'], ['Intensité', 'I', 'ampère (A)', 'ampèremètre', 'en série'], ['Tension', 'U', 'volt (V)', 'voltmètre', 'en dérivation']]),
    },
  ],

  methode: [
    { etape: 1, titre: 'Série ou dérivation ?', explication: 'Une seule boucle : série. Des nœuds : dérivation.' },
    { etape: 2, titre: 'Choisir la loi', explication: 'Série : I partout pareil, U s\'additionnent. Dérivation : I s\'additionnent, U pareil.' },
    { etape: 3, titre: 'Écrire la relation', explication: 'Par exemple U = U₁ + U₂, puis isole l\'inconnue.' },
    { etape: 4, titre: 'Unités', explication: 'Même unité partout (mA ou A), résultat avec son unité.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Brancher un appareil de mesure :',
      generer() {
        const g = pick(['intensité', 'tension']);
        return { enonce: `Pour mesurer ${g === 'intensité' ? "l'intensité du courant qui traverse une lampe, on branche un ampèremètre" : 'la tension aux bornes d\'une lampe, on branche un voltmètre'} :`, choix: ['en série avec la lampe', 'en dérivation aux bornes de la lampe'], correct: g === 'intensité' ? 0 : 1, ordre_fixe: true, _v: { g } };
      },
      indices: ['Le courant doit traverser l\'ampèremètre.', 'Le voltmètre compare deux points : les deux bornes du dipôle.', 'Ampèremètre en série, voltmètre en dérivation.'],
      correction_etapes: (st) => [st._v.g === 'intensité' ? "L'ampèremètre se branche <strong>en série</strong> : le courant doit le traverser." : 'Le voltmètre se branche <strong>en dérivation</strong>, aux bornes du dipôle.'],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Les unités :',
      generer() {
        const q = pick([
          ["L'unité de l'intensité du courant est :", "l'ampère (A)"], ["L'unité de la tension électrique est :", 'le volt (V)'],
          ['Le symbole « mA » signifie :', 'milliampère'], ['Le symbole « V » désigne :', 'le volt'],
        ]);
        const pool = q[1].includes('ampère') || q[1] === 'milliampère' ? ["l'ampère (A)", 'le volt (V)', 'le watt (W)', 'le newton (N)', 'milliampère', 'millivolt', 'mégavolt'] : ["l'ampère (A)", 'le volt (V)', 'le watt (W)', 'le newton (N)', 'le volt', "l'ampère", 'le joule'];
        const choix = [q[1], ...pool.filter((x) => x !== q[1] && !x.startsWith(q[1]) && !q[1].startsWith(x)).slice(0, 3)];
        return { enonce: q[0], choix, correct: 0, _v: { q } };
      },
      indices: ['Intensité : A. Tension : V.', 'Le préfixe « m » signifie « milli » : un millième.', 'Les deux savants : Ampère et Volta.'],
      correction_etapes: (st) => [`${st._v.q[0]} <strong>${st._v.q[1]}</strong>.`],
    },
    {
      id: 'e03', niveau: 1, type: 'saisie', consigne: 'Convertis :',
      generer() {
        const versA = pick([true, false]), mA = pick([50, 120, 250, 300, 450, 800, 1500]);
        return versA
          ? { enonce: `Convertis ${mA} mA en ampères.`, ...grandeur(mA / 1000, 'A', { uniteImposee: true, pieges: [{ valeur: mA * 1000, message: 'mA → A : on divise par 1 000.' }] }), _v: { versA, mA } }
          : { enonce: `Convertis ${dec(mA / 1000)} A en milliampères.`, ...grandeur(mA, 'mA', { uniteImposee: true, pieges: [{ valeur: mA / 1e6, message: 'A → mA : on multiplie par 1 000.' }] }), _v: { versA, mA } };
      },
      indices: ['1 A = 1 000 mA.', 'mA → A : ÷ 1 000.', 'A → mA : × 1 000.'],
      correction_etapes: (st) => [st._v.versA ? `$${st._v.mA} \\div 1\\,000 = ${t(st._v.mA / 1000)}$ A.` : `$${t(st._v.mA / 1000)} \\times 1\\,000 = ${st._v.mA}$ mA.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Additivité des tensions (série) :',
      generer() {
        const U = pick([4.5, 6, 9, 12]), U1 = arrondi(randInt(10, U * 10 - 10) / 10, 1), U2 = arrondi(U - U1, 1);
        return {
          enonce: `Une pile de ${dec(U)} V alimente deux lampes L1 et L2 en série. Un voltmètre indique ${dec(U1)} V aux bornes de L1. Quelle est la tension aux bornes de L2 ?`,
          visuel: (h) => { h.innerHTML = schemaMontage('serie'); },
          ...grandeur(U2, 'V', { tolerance: 0.01, pieges: [{ valeur: U, message: 'En série, la tension de la pile se PARTAGE entre les lampes.' }, { valeur: U1, message: 'En série, les tensions ne sont pas forcément égales : U = U₁ + U₂.' }, { valeur: arrondi(U + U1, 1), message: 'U₂ = U − U₁ : on soustrait.' }].filter((p) => Math.abs(p.valeur - U2) > 1e-9) }),
          _v: { U, U1, U2 },
        };
      },
      indices: ['En série : $U = U_1 + U_2$.', 'Donc $U_2 = U - U_1$.', 'Réponse en V.'],
      correction_etapes: (st) => [`$U_2 = U - U_1 = ${t(st._v.U)} - ${t(st._v.U1)}$.`, `$U_2 = ${t(st._v.U2)}$ V.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: "Unicité de l'intensité (série) :",
      generer() {
        const I = pick([0.12, 0.2, 0.25, 0.3, 0.45]);
        return {
          enonce: `Dans un circuit en série (pile, lampe L1, lampe L2), un ampèremètre placé juste après L1 indique ${dec(I)} A. Quelle intensité mesure-t-on entre L2 et la pile ?`,
          visuel: (h) => { h.innerHTML = schemaMontage('serie'); },
          ...grandeur(I, 'A', { pieges: [{ valeur: I / 2, message: "En série, l'intensité ne se partage pas : elle est la même partout." }, { valeur: I * 2, message: "En série, l'intensité ne s'additionne pas : elle est la même partout." }] }),
          _v: { I },
        };
      },
      indices: ['Il n\'y a qu\'une boucle.', 'Le courant ne « s\'use » pas en traversant les lampes.', "Loi d'unicité de l'intensité."],
      correction_etapes: (st) => ["En série, l'intensité est la même en tout point du circuit.", `$I = ${t(st._v.I)}$ A (soit ${dec(st._v.I * 1000)} mA).`],
    },
    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Loi des nœuds (dérivation) :',
      generer() {
        const I1 = pick([120, 150, 200, 250, 300]), I2 = pick([80, 100, 150, 250, 400]), I = I1 + I2, cherche = pick(['I', 'I2']);
        return cherche === 'I'
          ? { enonce: `Deux lampes sont en dérivation. Il passe ${I1} mA dans L1 et ${I2} mA dans L2. Quelle est l'intensité dans la branche principale ?`, visuel: (h) => { h.innerHTML = schemaMontage('derivation'); }, ...grandeur(I, 'mA', { pieges: [{ valeur: Math.abs(I1 - I2), message: 'Au nœud, les intensités des branches s\'ADDITIONNENT.' }] }), _v: { I1, I2, I, cherche } }
          : { enonce: `Deux lampes sont en dérivation. L'intensité dans la branche principale est ${I} mA, et il passe ${I1} mA dans L1. Quelle intensité traverse L2 ?`, visuel: (h) => { h.innerHTML = schemaMontage('derivation'); }, ...grandeur(I2, 'mA', { pieges: [{ valeur: I + I1, message: 'I = I₁ + I₂, donc I₂ = I − I₁.' }, { valeur: I, message: 'Le courant principal se partage entre les deux branches.' }].filter((p) => p.valeur !== I2) }), _v: { I1, I2, I, cherche } };
      },
      indices: ['Loi des nœuds : $I = I_1 + I_2$.', "Le courant principal se partage entre les branches.", 'Isole l\'inconnue.'],
      correction_etapes: (st) => (st._v.cherche === 'I' ? [`$I = I_1 + I_2 = ${st._v.I1} + ${st._v.I2}$.`, `$I = ${st._v.I}$ mA.`] : [`$I_2 = I - I_1 = ${st._v.I} - ${st._v.I1}$.`, `$I_2 = ${st._v.I2}$ mA.`]),
    },
    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Tensions en dérivation :',
      generer() {
        const U = pick([4.5, 6, 9, 12]);
        return {
          enonce: `Une pile de ${dec(U)} V alimente deux lampes branchées en dérivation. Quelle est la tension aux bornes de la lampe L2 ?`,
          visuel: (h) => { h.innerHTML = schemaMontage('derivation'); },
          ...grandeur(U, 'V', { pieges: [{ valeur: U / 2, message: 'En dérivation, la tension ne se partage pas : chaque lampe a la tension du générateur.' }] }),
          _v: { U },
        };
      },
      indices: ['Chaque branche est reliée directement aux bornes de la pile.', 'En dérivation, les tensions sont égales.', '$U_2 = U$.'],
      correction_etapes: (st) => ['En dérivation, chaque dipôle a la même tension à ses bornes que le générateur.', `$U_2 = ${t(st._v.U)}$ V.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Valeurs nominales :',
      generer() {
        const Un = pick([3.5, 6, 12]), U = pick([Un / 2, Un, Un * 2]);
        return {
          enonce: `Une lampe porte l'inscription « ${dec(Un)} V – 0,3 A ». On la branche seule aux bornes d'un générateur de ${dec(U)} V. La lampe :`,
          choix: ['brille faiblement (sous-tension)', 'brille normalement', 'brille trop et risque de griller (surtension)'], correct: U < Un ? 0 : U === Un ? 1 : 2, ordre_fixe: true, _v: { Un, U },
        };
      },
      indices: ['La tension nominale est celle d\'un fonctionnement normal.', 'Compare la tension du générateur à la tension nominale.', 'Trop de tension abîme la lampe.'],
      correction_etapes: (st) => [`Tension nominale : ${dec(st._v.Un)} V ; tension appliquée : ${dec(st._v.U)} V.`, st._v.U < st._v.Un ? 'Tension trop faible : la lampe <strong>brille faiblement</strong>.' : st._v.U === st._v.Un ? 'Tension égale à la tension nominale : fonctionnement <strong>normal</strong>.' : 'Tension trop grande : la lampe <strong>risque de griller</strong>.'],
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Guirlande en série :',
      generer() {
        const n = pick([3, 4, 5, 6, 10, 20]), U = pick([6, 12, 24, 230].filter((x) => x / n >= 0.5));
        return {
          enonce: `Une guirlande comporte ${n} lampes identiques branchées en série sur une tension de ${U} V. Quelle est la tension aux bornes de chaque lampe ?`,
          ...grandeur(arrondi(U / n, 3), 'V', { tolerance: 0.01, pieges: [{ valeur: U, message: 'En série, la tension totale se partage entre les lampes.' }, { valeur: U * n, message: 'On partage la tension : on divise par le nombre de lampes.' }] }),
          _v: { n, U },
        };
      },
      indices: ['En série, les tensions s\'additionnent.', 'Les lampes sont identiques : elles ont toutes la même tension.', 'Divise la tension totale par le nombre de lampes.'],
      correction_etapes: (st) => [`$U = U_1 + U_2 + \\ldots$ avec ${st._v.n} tensions égales.`, `$U_{\\text{lampe}} = ${st._v.U} \\div ${st._v.n} = ${t(arrondi(st._v.U / st._v.n, 3))}$ V.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'ampèremètre se branche :", choix: ['en série', 'en dérivation', 'aux bornes du générateur seulement', "n'importe comment"], correct: 0, explication: 'Le courant doit le traverser.' },
    { type: 'qcm', question: 'Dans un circuit en série, l\'intensité :', choix: ['est la même partout', "s'additionne", 'diminue après chaque lampe', 'est nulle'], correct: 0, explication: "Loi d'unicité." },
    {
      type: 'saisie', question: 'Loi des nœuds.',
      generer() { const a = pick([0.2, 0.3]), b = pick([0.1, 0.4]); return { question: `En dérivation, I₁ = ${dec(a)} A et I₂ = ${dec(b)} A. Intensité dans la branche principale ?`, ...grandeur(arrondi(a + b, 2), 'A', { tolerance: 0.001 }), explication: `$I = ${t(a)} + ${t(b)} = ${t(a + b)}$ A.` }; },
    },
    { type: 'vrai_faux', question: 'Deux lampes en dérivation sur une pile de 4,5 V ont chacune 4,5 V à leurs bornes.', reponse: true, explication: 'Égalité des tensions en dérivation.' },
    { type: 'qcm', question: '350 mA =', choix: ['0,35 A', '3,5 A', '35 A', '350 000 A'], correct: 0, explication: '350 ÷ 1 000 = 0,35.' },
  ],
};
