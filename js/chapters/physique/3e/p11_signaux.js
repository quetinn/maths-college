// =====================================================================
//  p11_signaux.js — Physique-chimie 3ᵉ : signaux sonores et lumineux.
//  Propagation du son (milieu matériel, vitesse), fréquence et période,
//  domaine audible, ultrasons (écho, sonar), niveau sonore,
//  propagation de la lumière (vide, 3 × 10⁸ m/s).
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur, tolRel, sci, sciTex } from '../outils.js';
import { ondeSonore, orage } from '../figures.js';
import { tableau } from '../../commun.js';

const t = (x, n = 3) => dec(arrondi(x, n)).replace(',', '{,}');

export default {
  id: 'p11',
  titre: 'Signaux sonores et lumineux',
  theme: 'pc_signaux', niveau: '3e',
  icone: '🔊',

  intro:
    "Pendant un orage, on voit l'éclair avant d'entendre le tonnerre : la lumière va près d'un million de fois plus vite que le son. " +
    "Le son est une <strong>vibration</strong> qui a besoin de matière pour se propager ; la lumière, elle, traverse le vide de l'espace. " +
    "Ces signaux servent à observer (échographie, sonar) et à communiquer (fibre optique).",

  cours: [
    {
      type: 'definition', titre: 'Le son, une vibration',
      contenu: "Un son est produit par un objet qui <strong>vibre</strong> (corde, membrane de haut-parleur, cordes vocales). La vibration se transmet de proche en proche aux particules du milieu : le son a besoin d'un <strong>milieu matériel</strong> (air, eau, solide) et <strong>ne se propage pas dans le vide</strong>.",
    },
    {
      type: 'propriete', titre: 'Vitesse du son',
      contenu: "La vitesse du son dépend du milieu : " + tableau([['Milieu', 'air (15 °C)', 'eau', 'fer'], ['Vitesse', '340 m/s', '1 500 m/s', 'près de 6 000 m/s']]) + " Pour une distance $d$ parcourue en une durée $t$ :",
      formule: 'd = v \\times t',
    },
    {
      type: 'definition', titre: 'Fréquence et période',
      contenu: "La <strong>fréquence</strong> $f$ est le nombre de vibrations par seconde, en <strong>hertz</strong> (Hz). La <strong>période</strong> $T$ est la durée d'une vibration, en secondes. Un son grave a une petite fréquence, un son aigu une grande fréquence.",
      formule: 'f = \\dfrac{1}{T}',
    },
    { type: 'figure', titre: "L'onde sonore", contenu: "Les particules d'air se serrent et s'écartent. Change la fréquence, écoute le son, puis fais le vide.", render: (host) => ondeSonore(host) },
    {
      type: 'propriete', titre: 'Domaine audible, infrasons, ultrasons',
      contenu: "L'oreille humaine perçoit les sons de <strong>20 Hz à 20 000 Hz</strong>. En dessous : les <strong>infrasons</strong> (éléphants, séismes) ; au-dessus : les <strong>ultrasons</strong> (chauves-souris, dauphins, échographie, sonar). " +
        "Le <strong>niveau sonore</strong> se mesure en décibels (dB) avec un sonomètre ; au-delà de 85 dB, une exposition prolongée abîme l'audition.",
    },
    {
      type: 'propriete', titre: "L'écho : mesurer une distance",
      contenu: "Un sonar ou un échographe envoie un signal qui se réfléchit sur un obstacle et revient. Le signal fait l'<strong>aller-retour</strong> : la distance à l'obstacle est la moitié de la distance parcourue.",
      formule: 'd = \\dfrac{v \\times t}{2}',
    },
    {
      type: 'propriete', titre: 'La lumière',
      contenu: "La lumière se propage en <strong>ligne droite</strong> dans un milieu homogène, et <strong>aussi dans le vide</strong>. Sa vitesse dans le vide (et presque dans l'air) vaut environ $300\\,000$ km/s. Elle transporte des informations : fibres optiques, signaux des étoiles…",
      formule: 'c \\approx 3 \\times 10^{8} \\text{ m/s}',
    },
    { type: 'figure', titre: "L'éclair et le tonnerre", contenu: "Règle la distance de l'orage : la lumière arrive tout de suite, le son met plusieurs secondes.", render: (host) => orage(host) },
    {
      type: 'exemple', enonce: "On entend le tonnerre $6$ s après avoir vu l'éclair. À quelle distance est l'orage ?",
      solution_etapes: ["La lumière arrive presque instantanément : $6$ s est la durée de trajet du son.", '$d = v \\times t = 340 \\times 6 = 2\\,040$ m, soit environ $2$ km.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Quel signal ?', explication: 'Son : 340 m/s dans l\'air (1 500 m/s dans l\'eau). Lumière : 3 × 10⁸ m/s.' },
    { etape: 2, titre: 'Aller simple ou aller-retour ?', explication: 'Écho, sonar, échographie : aller-retour, on divise par 2.' },
    { etape: 3, titre: 'Unités', explication: 'Durées en s (ms ÷ 1 000), distances en m.' },
    { etape: 4, titre: 'Calculer', explication: '$d = v \\times t$, $t = d \\div v$, $f = 1 \\div T$.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: "Distance de l'orage (en m) :",
      generer() {
        const s = pick([2, 3, 4, 5, 6, 8, 10, 12]);
        return {
          enonce: `On entend le tonnerre ${s} s après avoir vu l'éclair. Le son se propage à 340 m/s dans l'air. À quelle distance est tombée la foudre ?`,
          ...grandeur(340 * s, 'm', { tolerance: 1, pieges: [{ valeur: arrondi(340 / s, 3), message: 'La distance est un produit : d = v × t.' }] }), _v: { s },
        };
      },
      indices: ["La lumière de l'éclair arrive presque instantanément.", 'Le son met la durée indiquée.', '$d = v \\times t$.'],
      correction_etapes: (st) => [`$d = 340 \\times ${st._v.s} = ${340 * st._v.s}$ m, soit environ ${dec(arrondi((340 * st._v.s) / 1000, 1))} km.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Audible ou non ?',
      generer() {
        const f = pick([5, 10, 15, 50, 440, 1000, 8000, 15000, 25000, 40000, 100000]);
        return { enonce: `Un son a une fréquence de ${f.toLocaleString('fr-FR')} Hz. C'est :`, choix: ['un infrason', 'un son audible', 'un ultrason'], correct: f < 20 ? 0 : f <= 20000 ? 1 : 2, ordre_fixe: true, _v: { f } };
      },
      indices: ["L'oreille humaine entend de 20 Hz à 20 000 Hz.", 'En dessous : infrasons.', 'Au-dessus : ultrasons.'],
      correction_etapes: (st) => [`${st._v.f.toLocaleString('fr-FR')} Hz ${st._v.f < 20 ? '< 20 Hz : <strong>infrason</strong>' : st._v.f <= 20000 ? 'est entre 20 Hz et 20 000 Hz : <strong>son audible</strong>' : '> 20 000 Hz : <strong>ultrason</strong>'}.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: 'Calcule la fréquence (en Hz) :',
      generer() {
        const T = pick([1, 2, 2.5, 4, 5, 10, 20]); // en ms
        return {
          enonce: `La période d'un son est T = ${dec(T)} ms. Quelle est sa fréquence ?`,
          ...grandeur(1000 / T, 'Hz', { tolerance: 0.5, pieges: [{ valeur: 1 / T, message: 'Convertis la période en secondes : ' + dec(T) + ' ms = ' + dec(T / 1000) + ' s.' }] }), _v: { T },
        };
      },
      indices: ['$f = \\dfrac{1}{T}$ avec T en secondes.', '1 ms = 0,001 s.', 'Le résultat est en hertz (Hz).'],
      correction_etapes: (st) => [`$T = ${t(st._v.T)}$ ms $= ${t(st._v.T / 1000, 4)}$ s.`, `$f = \\dfrac{1}{${t(st._v.T / 1000, 4)}} = ${t(1000 / st._v.T, 1)}$ Hz.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Le sonar (profondeur en m) :',
      generer() {
        const tt = pick([0.2, 0.4, 0.6, 0.8, 1, 1.2, 2]);
        return {
          enonce: `Le sonar d'un bateau émet des ultrasons vers le fond. L'écho revient ${dec(tt)} s plus tard. Les ultrasons se propagent à 1 500 m/s dans l'eau. Quelle est la profondeur ?`,
          ...grandeur(750 * tt, 'm', { tolerance: 0.5, pieges: [{ valeur: 1500 * tt, message: "Le signal fait l'aller-retour : il faut diviser par 2." }] }), _v: { tt },
        };
      },
      indices: ['Distance parcourue : $v \\times t$.', "C'est un aller-retour.", 'Profondeur = distance ÷ 2.'],
      correction_etapes: (st) => [`Distance aller-retour : $1\\,500 \\times ${t(st._v.tt)} = ${1500 * st._v.tt}$ m.`, `Profondeur : $${1500 * st._v.tt} \\div 2 = ${750 * st._v.tt}$ m.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Propagation :',
      generer() {
        return pick([
          { enonce: 'Sur la Lune (sans atmosphère), deux astronautes sans radio peuvent-ils s\'entendre parler ?', choix: ["non, le son ne se propage pas dans le vide", 'oui, mais moins fort', 'oui, normalement', 'oui, mais plus aigu'], correct: 0, _v: { e: "Il n'y a pas d'air pour transmettre la vibration. En collant leurs casques, ils s'entendraient à travers la matière !" } },
          { enonce: 'Dans quel milieu le son est-il le plus rapide ?', choix: ['le fer', "l'eau", "l'air", 'le vide'], correct: 0, _v: { e: 'Près de 6 000 m/s dans le fer, 1 500 m/s dans l\'eau, 340 m/s dans l\'air, et pas du tout dans le vide.' } },
          { enonce: 'La lumière du Soleil nous parvient à travers le vide spatial. Cela montre que la lumière :', choix: ['peut se propager dans le vide', 'a besoin d\'air', 'est un son', 'va moins vite que le son'], correct: 0, _v: { e: 'Contrairement au son, la lumière n\'a pas besoin de matière pour se propager.' } },
        ]);
      },
      indices: ['Le son a besoin de matière.', 'Plus le milieu est dense et rigide, plus le son va vite.', 'La lumière traverse le vide.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un son de 100 Hz est plus aigu qu\'un son de 1 000 Hz.', reponse: false, _v: { e: 'Non : plus la fréquence est grande, plus le son est aigu.' } },
          { enonce: 'La lumière va plus vite que le son.', reponse: true, _v: { e: 'Environ 300 000 km/s contre 0,34 km/s dans l\'air.' } },
          { enonce: 'Les chauves-souris utilisent les ultrasons pour se repérer.', reponse: true, _v: { e: "Oui : elles analysent l'écho des ultrasons qu'elles émettent." } },
          { enonce: 'Écouter longtemps de la musique à 100 dB est sans danger.', reponse: false, _v: { e: 'Non : au-delà de 85 dB, une exposition prolongée abîme l\'audition.' } },
          { enonce: 'Le son se propage dans l\'eau.', reponse: true, _v: { e: 'Oui, et même plus vite que dans l\'air (1 500 m/s).' } },
        ]);
      },
      indices: ['Aigu = grande fréquence.', 'Comparer 340 m/s et 300 000 km/s.', 'Le son a besoin de matière.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'La lumière dans l\'espace :',
      generer() {
        const [nom, d] = pick([['la Lune', 3.84e8], ['le Soleil', 1.5e11], ['Mars (au plus près)', 5.6e10], ['un satellite géostationnaire', 3.6e7]]);
        const s = d / 3e8;
        return {
          enonce: `La distance entre la Terre et ${nom} est d'environ ${sci(d)} m. Combien de temps met la lumière (3 × 10<sup>8</sup> m/s) pour la parcourir ?`,
          ...grandeur(arrondi(s, 3), 's', { tolerance: tolRel(s, 1) }), _v: { nom, d, s },
        };
      },
      indices: ['$t = \\dfrac{d}{v}$.', 'Divise la distance par $3 \\times 10^8$.', 'Le résultat est en secondes.'],
      correction_etapes: (st) => [`$t = \\dfrac{${sciTex(st._v.d)}}{3 \\times 10^{8}}$.`, `$t \\approx ${t(st._v.s, 3)}$ s${st._v.s > 120 ? `, soit environ ${dec(arrondi(st._v.s / 60, 1))} min` : ''}.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "L'écho d'une chauve-souris (en m) :",
      generer() {
        const ms = pick([10, 20, 30, 40, 50]);
        const d = (340 * ms) / 1000 / 2;
        return {
          enonce: `Une chauve-souris émet un ultrason qui revient après s'être réfléchi sur un insecte, ${ms} ms plus tard. Dans l'air, le son va à 340 m/s. À quelle distance se trouve l'insecte ?`,
          ...grandeur(arrondi(d, 3), 'm', { tolerance: 0.01, pieges: [{ valeur: arrondi(2 * d, 3), message: "C'est un aller-retour : divise par 2." }, { valeur: arrondi((340 * ms) / 2, 3), message: 'Convertis les ms en s (÷ 1 000).' }] }), _v: { ms, d },
        };
      },
      indices: ['Convertis la durée en secondes.', "Distance parcourue par l'ultrason : v × t.", 'Aller-retour : divise par 2.'],
      correction_etapes: (st) => [`$t = ${st._v.ms}$ ms $= ${t(st._v.ms / 1000)}$ s.`, `Aller-retour : $340 \\times ${t(st._v.ms / 1000)} = ${t(2 * st._v.d)}$ m.`, `Distance : $${t(2 * st._v.d)} \\div 2 = ${t(st._v.d)}$ m.`],
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: "Lecture d'un oscillogramme :",
      generer() {
        const n = pick([2, 4, 5]), T = pick([0.5, 1, 2, 2.5, 5]); // ms
        return {
          enonce: `Sur l'écran d'un oscilloscope, ${n} périodes d'un son occupent ${dec(n * T)} ms. Quelle est la fréquence de ce son ?`,
          ...grandeur(1000 / T, 'Hz', { tolerance: 0.5, pieges: [{ valeur: 1000 / (n * T), message: `${dec(n * T)} ms correspondent à ${n} périodes : divise d'abord par ${n} pour obtenir T.` }] }), _v: { n, T },
        };
      },
      indices: [`Une période : durée totale ÷ nombre de périodes.`, 'Convertis T en secondes.', '$f = \\dfrac{1}{T}$.'],
      correction_etapes: (st) => [`$T = ${t(st._v.n * st._v.T)} \\div ${st._v.n} = ${t(st._v.T)}$ ms $= ${t(st._v.T / 1000, 4)}$ s.`, `$f = \\dfrac{1}{${t(st._v.T / 1000, 4)}} = ${t(1000 / st._v.T, 1)}$ Hz.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le son ne se propage pas :', choix: ['dans le vide', "dans l'eau", "dans l'air", "dans l'acier"], correct: 0, explication: 'Il a besoin d\'un milieu matériel.' },
    { type: 'qcm', question: "Domaine des sons audibles par l'être humain :", choix: ['de 20 Hz à 20 000 Hz', 'de 0 Hz à 100 Hz', 'de 20 000 Hz à 100 000 Hz', 'toutes les fréquences'], correct: 0, explication: 'En dessous : infrasons ; au-dessus : ultrasons.' },
    {
      type: 'saisie', question: 'Orage.',
      generer() { const s = pick([3, 5, 9]); return { question: `Tonnerre entendu ${s} s après l'éclair (son : 340 m/s). Distance de l'orage ?`, ...grandeur(340 * s, 'm', { tolerance: 1 }), explication: `$340 \\times ${s} = ${340 * s}$ m.` }; },
    },
    { type: 'vrai_faux', question: 'La lumière se propage dans le vide.', reponse: true, explication: 'C\'est ainsi que la lumière des étoiles nous parvient.' },
    { type: 'qcm', question: 'La relation entre fréquence et période est :', choix: ['f = 1 ÷ T', 'f = T', 'f = 2 × T', 'f = T ÷ 2'], correct: 0, explication: 'Avec T en secondes et f en hertz.' },
  ],
};
