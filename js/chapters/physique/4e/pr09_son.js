// =====================================================================
//  pr09_son.js — Physique-chimie 4ᵉ : le son.
//  Émission (vibration), propagation dans un milieu matériel, vitesse
//  selon le milieu, fréquence et hauteur, domaine audible, niveau
//  sonore et protection de l'audition.
// =====================================================================

import { pick, arrondi, dec, grandeur } from '../outils.js';
import { ondeSonore } from '../figures.js';
import { courseDuSon, echelleDecibels } from '../figures_cycle.js';
import { tableau } from '../../commun.js';

const VITESSES = [['air', 340], ['eau', 1500], ['acier', 5000]];
const t = (x) => dec(x).replace(',', '{,}');

const FREQUENCES = [
  [5, 'un infrason'], [15, 'un infrason'], [100, 'un son audible'], [440, 'un son audible'], [3000, 'un son audible'],
  [15000, 'un son audible'], [25000, 'un ultrason'], [40000, 'un ultrason'], [100000, 'un ultrason'],
];
const DOMAINES = ['un infrason', 'un son audible', 'un ultrason'];

const NIVEAUX = [['une conversation', 60, false], ['un chuchotement', 30, false], ['un concert', 105, true], ['une tondeuse à gazon', 90, true], ['une bibliothèque', 40, false], ['un marteau-piqueur', 110, true], ['une rue calme', 50, false]];

export default {
  id: 'pr09',
  titre: 'Le son',
  theme: 'pc_signaux', niveau: '4e',
  icone: '🔊',

  intro:
    "Dans l'espace, personne ne vous entend crier : sans air, pas de son. " +
    "Ce chapitre explique comment un son est <strong>émis</strong>, comment il se <strong>propage</strong>, à quelle vitesse, ce qui distingue un son grave d'un son aigu, et à partir de quel niveau il devient <strong>dangereux</strong> pour l'oreille.",

  cours: [
    {
      type: 'definition', titre: 'Émission et propagation',
      contenu: "Un son est émis par un objet qui <strong>vibre</strong> (corde de guitare, membrane de haut-parleur, cordes vocales). La vibration se transmet de proche en proche aux particules du milieu. Le son a donc besoin d'un <strong>milieu matériel</strong> (gaz, liquide, solide) : il <strong>ne se propage pas dans le vide</strong>.",
    },
    {
      type: 'propriete', titre: 'La vitesse du son',
      contenu: "La vitesse du son dépend du milieu : il va plus vite dans les liquides et les solides que dans l'air." + tableau([['Milieu', ...VITESSES.map((v) => v[0])], ['Vitesse', ...VITESSES.map((v) => `${v[1]} m/s`)]]),
      formule: 'd = v \\times t',
    },
    { type: 'figure', titre: 'La course du son', contenu: 'Un même son part en même temps dans quatre milieux. Règle la distance.', render: (host) => courseDuSon(host) },
    {
      type: 'definition', titre: 'La fréquence',
      contenu: "La <strong>fréquence</strong> d'un son est le nombre de vibrations par seconde ; elle s'exprime en <strong>hertz</strong> (Hz). Plus la fréquence est grande, plus le son est <strong>aigu</strong> ; plus elle est petite, plus il est <strong>grave</strong>. L'oreille humaine entend les sons de <strong>20 Hz à 20 000 Hz</strong>. En dessous : les <strong>infrasons</strong> ; au-dessus : les <strong>ultrasons</strong> (chauves-souris, échographie).",
    },
    { type: 'figure', titre: 'Voir et entendre une fréquence', contenu: 'Change la fréquence, écoute, puis fais le vide.', render: (host) => ondeSonore(host) },
    {
      type: 'propriete', titre: 'Le niveau sonore',
      contenu: "Le <strong>niveau sonore</strong> se mesure en <strong>décibels</strong> (dB) avec un <strong>sonomètre</strong>. À partir de <strong>85 dB</strong>, une exposition prolongée abîme l'oreille de façon <strong>irréversible</strong> ; à 120 dB, c'est la douleur. Pour se protéger : s'éloigner de la source, réduire la durée d'écoute, porter des bouchons.",
    },
    { type: 'figure', titre: "L'échelle des décibels", contenu: 'Au-dessus de 85 dB, danger pour l\'audition.', render: (host) => echelleDecibels(host) },
  ],

  methode: [
    { etape: 1, titre: 'Identifier le milieu', explication: 'Air : 340 m/s. Eau : 1 500 m/s. Acier : 5 000 m/s. Vide : pas de son.' },
    { etape: 2, titre: 'Calculer', explication: '$d = v \\times t$ ou $t = d \\div v$, en mètres et en secondes.' },
    { etape: 3, titre: 'Lire une fréquence', explication: 'Entre 20 Hz et 20 000 Hz : audible. Grande fréquence : son aigu.' },
    { etape: 4, titre: 'Évaluer le risque', explication: 'Au-delà de 85 dB : se protéger.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Le son se propage-t-il ?',
      generer() {
        const [milieu, oui] = pick([["l'air", true], ["l'eau d'une piscine", true], ['un rail en acier', true], ["le vide de l'espace", false], ['un mur en béton', true], ['une cloche dont on a aspiré tout l\'air', false]]);
        return { enonce: `Un son peut-il se propager dans ${milieu} ?`, choix: ['oui', 'non'], correct: oui ? 0 : 1, ordre_fixe: true, _v: { milieu, oui } };
      },
      indices: ['Le son a besoin de matière pour se propager.', 'Gaz, liquides et solides conviennent.', 'Dans le vide, il n\'y a rien à faire vibrer.'],
      correction_etapes: (st) => [st._v.oui ? `Oui : ${st._v.milieu} est un milieu matériel, ses particules transmettent la vibration.` : `Non : il n'y a pas de matière, donc rien pour transmettre la vibration.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Grave ou aigu ?',
      generer() {
        const f1 = pick([110, 220, 262, 440]), f2 = pick([523, 880, 1760, 3520]), inv = pick([true, false]);
        const [a, b] = inv ? [f2, f1] : [f1, f2];
        return { enonce: `Le son A a une fréquence de ${a} Hz, le son B de ${b} Hz. Lequel est le plus aigu ?`, choix: ['le son A', 'le son B'], correct: a > b ? 0 : 1, ordre_fixe: true, _v: { a, b } };
      },
      indices: ['La fréquence compte les vibrations par seconde.', 'Plus la fréquence est grande, plus le son est aigu.', 'Compare les deux nombres.'],
      correction_etapes: (st) => [`${Math.max(st._v.a, st._v.b)} Hz > ${Math.min(st._v.a, st._v.b)} Hz.`, `Le son <strong>${st._v.a > st._v.b ? 'A' : 'B'}</strong> est le plus aigu.`],
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Audible ou non ?',
      generer() {
        const [f, d] = pick(FREQUENCES);
        return { enonce: `Un signal sonore a une fréquence de ${dec(f)} Hz. Pour un être humain, c'est :`, choix: DOMAINES, correct: DOMAINES.indexOf(d), ordre_fixe: true, _v: { f, d } };
      },
      indices: ['L\'oreille humaine entend de 20 Hz à 20 000 Hz.', 'En dessous de 20 Hz : infrasons.', 'Au-dessus de 20 000 Hz : ultrasons.'],
      correction_etapes: (st) => [st._v.f < 20 ? `${st._v.f} Hz < 20 Hz.` : st._v.f > 20000 ? `${dec(st._v.f)} Hz > 20 000 Hz.` : `${dec(st._v.f)} Hz est compris entre 20 Hz et 20 000 Hz.`, `C'est <strong>${st._v.d}</strong>.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule la distance :',
      generer() {
        const [milieu, v] = pick(VITESSES), s = pick([2, 3, 4, 0.5, 5]);
        return {
          enonce: `Dans ${milieu === 'air' ? "l'air" : milieu === 'eau' ? "l'eau" : "l'acier"}, le son se propage à ${v} m/s. Quelle distance parcourt-il en ${dec(s)} s ?`,
          ...grandeur(v * s, 'm', { pieges: [{ valeur: arrondi(v / s, 3), message: 'd = v × t : on multiplie.' }] }),
          _v: { v, s },
        };
      },
      indices: ['$d = v \\times t$.', 'm/s × s donne des mètres.', 'Écris « m » (ou convertis en km).'],
      correction_etapes: (st) => [`$d = ${st._v.v} \\times ${t(st._v.s)}$.`, `$d = ${t(st._v.v * st._v.s)}$ m.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Calcule la durée :',
      generer() {
        const [quoi, d, v, milieu] = pick([['Le coup de sifflet de l\'arbitre', 170, 340, "l'air"], ['Le bruit d\'un feu d\'artifice', 1020, 340, "l'air"], ["Le chant d'une baleine", 4500, 1500, "l'eau"], ['Un choc sur un rail', 2500, 5000, "l'acier"], ['Un cri dans la montagne', 680, 340, "l'air"]]);
        const s = d / v;
        return {
          enonce: `${quoi} parcourt ${d} m dans ${milieu} (${v} m/s). Combien de temps met le son ?`,
          ...grandeur(arrondi(s, 3), 's', { tolerance: 0.01, pieges: [{ valeur: d * v, message: 't = d ÷ v : on divise.' }, { valeur: arrondi(v / d, 3), message: 't = d ÷ v : la distance au numérateur.' }].filter((p) => Math.abs(p.valeur - s) > 0.02) }),
          _v: { d, v, s },
        };
      },
      indices: ['$t = d \\div v$.', 'm ÷ (m/s) donne des secondes.', 'Écris « s ».'],
      correction_etapes: (st) => [`$t = \\dfrac{${st._v.d}}{${st._v.v}}$.`, `$t = ${t(arrondi(st._v.s, 3))}$ s.`],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'Danger pour l\'oreille ?',
      generer() {
        const [nom, dB, danger] = pick(NIVEAUX);
        return { enonce: `Le niveau sonore pendant ${nom} est d'environ ${dB} dB. Une exposition prolongée est-elle dangereuse pour l'audition ?`, choix: ['oui', 'non'], correct: danger ? 0 : 1, ordre_fixe: true, _v: { dB, danger } };
      },
      indices: ['Le seuil de danger est à 85 dB.', 'Compare le niveau à 85 dB.', 'Au-delà, l\'oreille s\'abîme définitivement.'],
      correction_etapes: (st) => [`${st._v.dB} dB ${st._v.danger ? '>' : '<'} 85 dB.`, st._v.danger ? '<strong>Oui</strong> : il faut se protéger (bouchons, distance, durée réduite).' : '<strong>Non</strong> : ce niveau est sans danger.'],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: "L'oreille collée au rail :",
      generer() {
        return { enonce: "Un cheminot tape sur un rail en acier. Un collègue, à 1 km, a l'oreille collée au rail. Il entend deux fois le coup. Lequel arrive en premier ?", choix: ['le son passé par le rail', "le son passé par l'air", 'les deux arrivent en même temps'], correct: 0, ordre_fixe: true, _v: {} };
      },
      indices: ['Compare les vitesses dans l\'acier et dans l\'air.', '5 000 m/s contre 340 m/s.', 'Le son le plus rapide arrive le premier.'],
      correction_etapes: () => ['Dans l\'acier : $1\\,000 \\div 5\\,000 = 0{,}2$ s. Dans l\'air : $1\\,000 \\div 340 \\approx 2{,}9$ s.', 'Le son passé par <strong>le rail</strong> arrive bien avant.'],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "L'orage :",
      generer() {
        const s = pick([3, 5, 6, 8, 10]);
        return {
          enonce: `On voit un éclair, puis on entend le tonnerre ${s} s plus tard. La lumière arrive presque instantanément ; le son va à 340 m/s. À quelle distance est tombée la foudre ? (en km)`,
          ...grandeur(arrondi((340 * s) / 1000, 3), 'km', { tolerance: 0.02, pieges: [{ valeur: 340 * s, message: 'C\'est la distance en mètres : convertis en km (÷ 1 000).' }] }),
          _v: { s },
        };
      },
      indices: ['$d = v \\times t$ donne des mètres.', '1 km = 1 000 m.', 'Divise par 1 000 et écris « km ».'],
      correction_etapes: (st) => [`$d = 340 \\times ${st._v.s} = ${340 * st._v.s}$ m.`, `Soit $${t((340 * st._v.s) / 1000)}$ km.`],
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Le son se propage dans le vide.', reponse: false, _v: { e: 'Non : il lui faut un milieu matériel.' } },
          { enonce: 'Le son va plus vite dans l\'eau que dans l\'air.', reponse: true, _v: { e: 'Oui : 1 500 m/s contre 340 m/s.' } },
          { enonce: 'Les dégâts causés à l\'oreille par un bruit trop fort se réparent tout seuls.', reponse: false, _v: { e: 'Non : ils sont irréversibles.' } },
          { enonce: 'Un son de 30 000 Hz est un ultrason.', reponse: true, _v: { e: 'Oui : au-dessus de 20 000 Hz.' } },
          { enonce: 'Un son grave a une grande fréquence.', reponse: false, _v: { e: 'Non : un son grave a une petite fréquence.' } },
        ]);
      },
      indices: ['Milieu matériel obligatoire.', 'Audible : 20 Hz à 20 000 Hz.', 'Danger : 85 dB.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le son ne se propage pas dans :', choix: ['le vide', "l'eau", "l'acier", "l'air"], correct: 0, explication: 'Il faut un milieu matériel.' },
    { type: 'qcm', question: 'La vitesse du son dans l\'air est d\'environ :', choix: ['340 m/s', '3 m/s', '300 000 km/s', '1 500 m/s'], correct: 0, explication: '1 500 m/s : dans l\'eau ; 300 000 km/s : la lumière.' },
    {
      type: 'saisie', question: 'Distance.',
      generer() { const s = pick([2, 4]); return { question: `À 340 m/s, quelle distance parcourt le son en ${s} s ?`, ...grandeur(340 * s, 'm'), explication: `$340 \\times ${s} = ${340 * s}$ m.` }; },
    },
    { type: 'qcm', question: "L'oreille humaine entend les sons de :", choix: ['20 Hz à 20 000 Hz', '0 Hz à 100 Hz', '20 000 Hz à 100 000 Hz', '85 dB à 120 dB'], correct: 0, explication: 'En dehors : infrasons et ultrasons.' },
    { type: 'vrai_faux', question: 'Au-delà de 85 dB, une exposition prolongée est dangereuse.', reponse: true, explication: 'C\'est le seuil de danger.' },
  ],
};
