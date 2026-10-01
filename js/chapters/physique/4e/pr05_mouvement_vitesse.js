// =====================================================================
//  pr05_mouvement_vitesse.js — Physique-chimie 4ᵉ : mouvement et vitesse.
//  Référentiel et relativité du mouvement, trajectoire, vitesse moyenne,
//  conversions m/s ↔ km/h, mouvements uniformes et non uniformes.
// =====================================================================

import { pick, arrondi, dec, grandeur } from '../outils.js';
import { chronophoto } from '../figures.js';
import { referentiel } from '../figures_cycle.js';

const t = (x) => dec(x).replace(',', '{,}');

/** [situation, sujet, référentiel, en mouvement ?] */
const RELATIF = [
  ['Tom est assis dans un train qui roule.', 'Tom', 'le train', false], ['Tom est assis dans un train qui roule.', 'Tom', 'le quai', true],
  ['Un astronaute flotte, immobile, dans la station spatiale en orbite.', "l'astronaute", 'la station spatiale', false], ['Un astronaute flotte, immobile, dans la station spatiale en orbite.', "l'astronaute", 'la Terre', true],
  ['Un cycliste roule sur une route.', 'le cycliste', 'son vélo', false], ['Un cycliste roule sur une route.', 'le cycliste', 'la route', true],
  ['Une valise est posée sur un tapis roulant en marche.', 'la valise', 'le tapis roulant', false], ['Une valise est posée sur un tapis roulant en marche.', 'la valise', "le sol de l'aéroport", true],
];

const TRAJ = [
  ["la valve d'une roue de vélo", 'le cadre du vélo', 'circulaire'], ["la valve d'une roue de vélo", 'la route', 'curviligne'],
  ['la Terre', 'le Soleil', 'circulaire'], ['une balle lâchée par un passager dans un train qui roule', 'le train', 'rectiligne'],
  ['une balle lâchée par un passager dans un train qui roule', 'le quai', 'curviligne'], ['la Lune', 'la Terre', 'circulaire'],
];
const TYPES = ['rectiligne', 'circulaire', 'curviligne'];

export default {
  id: 'pr05',
  titre: 'Mouvement et vitesse',
  theme: 'pc_mouvement', niveau: '4e',
  icone: '🚄',

  intro:
    "« Je ne bouge pas », dit le passager assis dans le TGV lancé à 300 km/h. Il a raison… par rapport au train ! " +
    "Pour décrire un mouvement, il faut d'abord choisir un <strong>référentiel</strong>. On peut ensuite décrire la trajectoire et calculer la <strong>vitesse</strong>, en m/s ou en km/h.",

  cours: [
    {
      type: 'definition', titre: 'Le référentiel',
      contenu: "Un <strong>référentiel</strong> est l'objet de référence par rapport auquel on décrit un mouvement (le sol, un train, le Soleil…). Un même objet peut être <strong>immobile dans un référentiel et en mouvement dans un autre</strong> : c'est la <strong>relativité du mouvement</strong>. La trajectoire elle-même dépend du référentiel.",
    },
    { type: 'figure', titre: 'Le passager du train', contenu: 'Change de référentiel : observe les positions de Tom, toutes les secondes.', render: (host) => referentiel(host) },
    {
      type: 'definition', titre: 'La vitesse moyenne',
      contenu: "La vitesse moyenne est la distance parcourue $d$ divisée par la durée $t$. Dans le système international, $d$ est en mètres, $t$ en secondes, et $v$ en <strong>m/s</strong>. Dans la vie courante, on utilise les <strong>km/h</strong>.",
      formule: 'v = \\dfrac{d}{t}',
    },
    {
      type: 'propriete', titre: 'Convertir m/s et km/h',
      contenu: "$1$ m/s $= 3{,}6$ km/h (en une heure, il y a $3\\,600$ s, et $3\\,600$ m $= 3{,}6$ km). Pour passer des m/s aux km/h, on <strong>multiplie par 3,6</strong> ; des km/h aux m/s, on <strong>divise par 3,6</strong>.",
      formule: 'v_{\\text{km/h}} = v_{\\text{m/s}} \\times 3{,}6',
    },
    {
      type: 'propriete', titre: 'Uniforme, accéléré, ralenti',
      contenu: "Un mouvement est <strong>uniforme</strong> si la valeur de la vitesse est constante, <strong>accéléré</strong> si elle augmente, <strong>ralenti</strong> (décéléré) si elle diminue. Sur une chronophotographie, on compare les distances parcourues pendant des durées égales.",
    },
    { type: 'figure', titre: 'Chronophotographie', contenu: 'Compare les écarts entre positions successives.', render: (host) => chronophoto(host) },
    {
      type: 'exemple', enonce: 'Un guépard court à $30$ m/s. Quelle est sa vitesse en km/h ?',
      solution_etapes: ['$30 \\times 3{,}6 = 108$.', 'Le guépard court à $108$ km/h.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Choisir le référentiel', explication: 'Par rapport à quoi décrit-on le mouvement ?' },
    { etape: 2, titre: 'Relever d et t', explication: 'Distance et durée, dans des unités qui vont ensemble.' },
    { etape: 3, titre: 'Calculer', explication: '$v = d \\div t$ ; $d = v \\times t$ ; $t = d \\div v$.' },
    { etape: 4, titre: 'Convertir', explication: 'm/s → km/h : × 3,6. km/h → m/s : ÷ 3,6.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Relativité du mouvement :',
      generer() {
        const [texte, qui, ref, bouge] = pick(RELATIF);
        return { enonce: `${texte} Dans le référentiel « ${ref} », ${qui} est :`, choix: ['en mouvement', 'immobile'], correct: bouge ? 0 : 1, ordre_fixe: true, _v: { ref, bouge, qui } };
      },
      indices: ['Sa position change-t-elle par rapport à cet objet ?', 'Deux objets qui se déplacent ensemble sont immobiles l\'un par rapport à l\'autre.', 'Le sol, la route, le quai sont d\'autres référentiels.'],
      correction_etapes: (st) => [st._v.bouge ? `Sa position change par rapport à ${st._v.ref}.` : `Sa position ne change pas par rapport à ${st._v.ref}.`, `${st._v.qui[0].toUpperCase() + st._v.qui.slice(1)} est <strong>${st._v.bouge ? "en mouvement" : "immobile"}</strong> dans ce référentiel.`],
    },
    {
      id: 'e02', niveau: 2, type: 'qcm', consigne: 'La trajectoire dépend du référentiel :',
      generer() {
        const [obj, ref, type] = pick(TRAJ);
        return { enonce: `Dans le référentiel « ${ref} », la trajectoire de ${obj} est :`, choix: TYPES, correct: TYPES.indexOf(type), ordre_fixe: true, _v: { obj, ref, type } };
      },
      indices: ['Imagine ce que voit un observateur lié à ce référentiel.', 'Une valve tourne autour de l\'axe de la roue, qui avance avec le vélo.', 'Une balle lâchée tombe droit pour le passager, mais avance aussi avec le train.'],
      correction_etapes: (st) => [`Vue depuis ${st._v.ref}, ${st._v.obj} décrit ${st._v.type === 'rectiligne' ? 'une droite' : st._v.type === 'circulaire' ? 'un cercle' : 'une courbe'}.`, `Trajectoire <strong>${st._v.type}</strong>.`],
    },
    {
      id: 'e03', niveau: 1, type: 'saisie', consigne: 'Calcule la vitesse (en m/s) :',
      generer() {
        const [qui, d, s] = pick([['Un coureur de 400 m', 400, pick([50, 64, 80])], ['Une nageuse', 100, pick([50, 62.5])], ['Un drone', pick([150, 300]), pick([10, 20, 25])], ['Une tortue', 5, pick([20, 50])]]);
        const v = arrondi(d / s, 4);
        return {
          enonce: `${qui} parcourt ${d} m en ${dec(s)} s. Quelle est sa vitesse moyenne ?`,
          ...grandeur(v, 'm/s', { tolerance: v / 200, pieges: [{ valeur: arrondi(s / d, 4), message: 'v = d ÷ t : la distance au numérateur.' }] }),
          _v: { d, s, v },
        };
      },
      indices: ['$v = d \\div t$.', 'm et s donnent des m/s.', 'Écris « m/s ».'],
      correction_etapes: (st) => [`$v = \\dfrac{${st._v.d}}{${t(st._v.s)}}$.`, `$v = ${t(st._v.v)}$ m/s.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Convertis en m/s :',
      generer() {
        const kmh = pick([18, 36, 54, 72, 90, 108, 126, 144]);
        return {
          enonce: `Une voiture roule à ${kmh} km/h. Exprime sa vitesse en m/s.`,
          ...grandeur(kmh / 3.6, 'm/s', { uniteImposee: true, pieges: [{ valeur: arrondi(kmh * 3.6, 2), message: 'Des km/h aux m/s, on DIVISE par 3,6 (le nombre doit devenir plus petit).' }] }),
          _v: { kmh },
        };
      },
      indices: ['1 m/s = 3,6 km/h.', 'km/h → m/s : on divise par 3,6.', 'Le résultat est plus petit que le nombre de départ.'],
      correction_etapes: (st) => [`$${st._v.kmh} \\div 3{,}6 = ${t(st._v.kmh / 3.6)}$.`, `$v = ${t(st._v.kmh / 3.6)}$ m/s.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Convertis en km/h :',
      generer() {
        const [qui, ms] = pick([['Un guépard', 30], ['Usain Bolt (en pointe)', 12], ['Un TGV', 80], ['Une flèche', 50], ['Un escargot', 0.005]]);
        return {
          enonce: `${qui} se déplace à ${dec(ms)} m/s. Exprime cette vitesse en km/h.`,
          ...grandeur(arrondi(ms * 3.6, 4), 'km/h', { uniteImposee: true, pieges: [{ valeur: arrondi(ms / 3.6, 4), message: 'Des m/s aux km/h, on MULTIPLIE par 3,6.' }] }),
          _v: { ms },
        };
      },
      indices: ['1 m/s = 3,6 km/h.', 'm/s → km/h : on multiplie par 3,6.', 'Écris « km/h ».'],
      correction_etapes: (st) => [`$${t(st._v.ms)} \\times 3{,}6 = ${t(st._v.ms * 3.6)}$.`, `$v = ${t(st._v.ms * 3.6)}$ km/h.`],
    },
    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule la durée :',
      generer() {
        const [qui, v, d] = pick([['Un bus', 30, pick([10, 15, 5])], ['Un TER', 120, pick([40, 60, 30])], ['Une cycliste', 18, pick([6, 9, 3])]]);
        const min = (d / v) * 60;
        return {
          enonce: `${qui} roule à ${v} km/h de moyenne. Combien de minutes lui faut-il pour parcourir ${d} km ?`,
          ...grandeur(min, 'min', { tolerance: 0.1, pieges: [{ valeur: arrondi(d / v, 4), message: 'C\'est la durée en heures : multiplie par 60.' }] }),
          _v: { v, d, min },
        };
      },
      indices: ['$t = d \\div v$ (en heures).', '1 h = 60 min.', 'Multiplie par 60.'],
      correction_etapes: (st) => [`$t = ${st._v.d} \\div ${st._v.v} = ${t(st._v.d / st._v.v)}$ h.`, `$${t(st._v.d / st._v.v)} \\times 60 = ${t(st._v.min)}$ min.`],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Qui est le plus rapide ?',
      generer() {
        const ms = pick([20, 25, 30, 35]), kmh = pick([80, 100, 110, 130]);
        if (Math.abs(ms * 3.6 - kmh) < 1) return this.generer();
        return { enonce: `Un guépard court à ${ms} m/s ; une voiture roule à ${kmh} km/h. Qui va le plus vite ?`, choix: ['le guépard', 'la voiture'], correct: ms * 3.6 > kmh ? 0 : 1, ordre_fixe: true, _v: { ms, kmh } };
      },
      indices: ['On ne peut pas comparer des m/s et des km/h directement.', 'Convertis les m/s en km/h (× 3,6).', 'Compare ensuite.'],
      correction_etapes: (st) => [`Guépard : $${st._v.ms} \\times 3{,}6 = ${t(st._v.ms * 3.6)}$ km/h.`, `${t(st._v.ms * 3.6)} km/h ${st._v.ms * 3.6 > st._v.kmh ? '>' : '<'} ${st._v.kmh} km/h : <strong>${st._v.ms * 3.6 > st._v.kmh ? 'le guépard' : 'la voiture'}</strong> va le plus vite.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Attention aux unités :',
      generer() {
        const kmh = pick([18, 36, 54, 72]), s = pick([5, 10, 20, 30]), ms = kmh / 3.6;
        return {
          enonce: `Un scooter roule à ${kmh} km/h. Quelle distance parcourt-il en ${s} secondes ? (en mètres)`,
          ...grandeur(ms * s, 'm', { pieges: [{ valeur: kmh * s, message: 'Convertis d\'abord la vitesse en m/s (÷ 3,6) : les secondes vont avec des m/s.' }] }),
          _v: { kmh, s, ms },
        };
      },
      indices: ['Les unités doivent aller ensemble : m/s avec des secondes.', 'Convertis la vitesse : ÷ 3,6.', 'Puis $d = v \\times t$.'],
      correction_etapes: (st) => [`$v = ${st._v.kmh} \\div 3{,}6 = ${t(st._v.ms)}$ m/s.`, `$d = ${t(st._v.ms)} \\times ${st._v.s} = ${t(st._v.ms * st._v.s)}$ m.`],
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un objet peut être immobile dans un référentiel et en mouvement dans un autre.', reponse: true, _v: { e: 'Oui : c\'est la relativité du mouvement.' } },
          { enonce: '10 m/s est plus rapide que 30 km/h.', reponse: true, _v: { e: 'Oui : 10 m/s = 36 km/h.' } },
          { enonce: 'Pour passer des km/h aux m/s, on multiplie par 3,6.', reponse: false, _v: { e: 'Non : on divise par 3,6.' } },
          { enonce: "La trajectoire d'un objet est la même dans tous les référentiels.", reponse: false, _v: { e: 'Non : la valve d\'une roue décrit un cercle pour le cycliste, une courbe pour le piéton.' } },
          { enonce: 'Un mouvement dont la vitesse diminue est dit ralenti.', reponse: true, _v: { e: 'Oui (ou décéléré).' } },
        ]);
      },
      indices: ['Tout dépend du référentiel.', '1 m/s = 3,6 km/h.', 'Uniforme : vitesse constante.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un référentiel est :', choix: ['un objet de référence pour décrire un mouvement', 'un instrument de mesure de vitesse', 'une unité de vitesse', 'une trajectoire'], correct: 0, explication: 'Le sol, un train, le Soleil…' },
    { type: 'qcm', question: '1 m/s correspond à :', choix: ['3,6 km/h', '1 km/h', '60 km/h', '0,36 km/h'], correct: 0, explication: '3 600 m en une heure = 3,6 km/h.' },
    {
      type: 'saisie', question: 'Conversion.',
      generer() { const kmh = pick([36, 72, 108]); return { question: `Convertis ${kmh} km/h en m/s.`, ...grandeur(kmh / 3.6, 'm/s', { uniteImposee: true }), explication: `$${kmh} \\div 3{,}6 = ${kmh / 3.6}$ m/s.` }; },
    },
    { type: 'vrai_faux', question: 'Un passager assis dans un avion en vol est immobile dans le référentiel de l\'avion.', reponse: true, explication: 'Sa position ne change pas par rapport à l\'avion.' },
    { type: 'qcm', question: 'Un mouvement uniforme est un mouvement :', choix: ['à vitesse constante', 'qui accélère', 'qui ralentit', 'circulaire'], correct: 0, explication: 'La valeur de la vitesse ne change pas.' },
  ],
};
