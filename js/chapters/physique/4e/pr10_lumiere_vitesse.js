// =====================================================================
//  pr10_lumiere_vitesse.js — Physique-chimie 4ᵉ : la lumière, vitesse
//  et distances. Modèle du rayon, vitesse de la lumière, durée d'un
//  trajet, année-lumière, « voir loin, c'est voir dans le passé ».
// =====================================================================

import { pick, arrondi, dec, grandeur, sci, sciTex } from '../outils.js';
import { voyageLumiere, ombre } from '../figures_cycle.js';

const C = 300000; // km/s
const AL = 9.46e12; // km
const t = (x) => dec(x).replace(',', '{,}');

const ASTRES = [['la Lune', 384000], ['le Soleil', 150000000], ['Mars (au plus près)', 56000000], ['Jupiter (au plus près)', 630000000]];
const ETOILES = [['Proxima du Centaure', 4.2], ['Sirius', 8.6], ['Véga', 25], ["l'étoile Polaire", 430], ['Bételgeuse', 640]];

export default {
  id: 'pr10',
  titre: 'La lumière : vitesse et distances',
  theme: 'pc_signaux', niveau: '4e',
  icone: '🌠',

  intro:
    "La lumière du Soleil que tu reçois en ce moment est partie il y a plus de 8 minutes ; celle des étoiles, il y a des années, parfois des siècles. " +
    "La lumière est le signal le plus rapide de l'Univers, mais elle n'est pas instantanée : ce chapitre apprend à calculer ses durées de trajet et à utiliser l'<strong>année-lumière</strong>.",

  cours: [
    {
      type: 'propriete', titre: 'Propagation de la lumière',
      contenu: "La lumière se propage en <strong>ligne droite</strong> dans un milieu transparent et homogène, et aussi dans le <strong>vide</strong> (contrairement au son). On la modélise par des <strong>rayons lumineux</strong> : des droites fléchées, de la source vers l'objet éclairé ou vers l'œil.",
    },
    { type: 'figure', titre: 'Rayons et ombres', contenu: 'Les rayons qui frôlent la balle délimitent son ombre.', render: (host) => ombre(host) },
    {
      type: 'definition', titre: 'La vitesse de la lumière',
      contenu: "Dans le vide (et pratiquement dans l'air), la lumière se propage à environ <strong>300 000 km/s</strong>, soit $3 \\times 10^8$ m/s. C'est une vitesse limite : rien ne va plus vite. Dans l'eau ou le verre, elle est un peu plus lente.",
      formule: 'c \\approx 300\\,000 \\text{ km/s} = 3 \\times 10^{8} \\text{ m/s}',
    },
    {
      type: 'propriete', titre: 'Durée d\'un trajet',
      contenu: "Comme pour tout mouvement à vitesse constante : $d = c \\times t$ et $t = d \\div c$. La lumière met environ $1{,}3$ s pour venir de la Lune et $500$ s (8 min 20 s) pour venir du Soleil.",
      formule: 't = \\dfrac{d}{c}',
    },
    { type: 'figure', titre: 'Le voyage de la lumière', contenu: 'Choisis une destination : le compteur indique la durée réelle du trajet.', render: (host) => voyageLumiere(host) },
    {
      type: 'definition', titre: "L'année-lumière",
      contenu: "Les distances entre étoiles sont immenses. On utilise l'<strong>année-lumière</strong> (al) : la <strong>distance</strong> parcourue par la lumière en une année, soit environ $9{,}46 \\times 10^{12}$ km. Une étoile située à 4,2 al est vue telle qu'elle était il y a 4,2 ans : <strong>regarder loin, c'est regarder dans le passé</strong>.",
      formule: '1 \\text{ al} \\approx 9{,}46 \\times 10^{12} \\text{ km}',
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer ce qu\'on cherche', explication: 'Une distance (d = c × t) ou une durée (t = d ÷ c).' },
    { etape: 2, titre: 'Accorder les unités', explication: 'km avec km/s, ou m avec m/s ; durées en secondes.' },
    { etape: 3, titre: 'Calculer', explication: 'Avec c = 300 000 km/s.' },
    { etape: 4, titre: 'Interpréter', explication: "Une distance en années-lumière donne directement l'âge de la lumière reçue." },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Son ou lumière ?',
      generer() {
        return pick([
          { enonce: 'Lequel de ces signaux peut se propager dans le vide ?', choix: ['la lumière', 'le son', 'les deux', 'aucun'], correct: 0, ordre_fixe: true, _v: { e: "La lumière n'a pas besoin de matière ; le son, si." } },
          { enonce: "Pendant un orage, pourquoi voit-on l'éclair avant d'entendre le tonnerre ?", choix: ['la lumière va beaucoup plus vite que le son', 'le son part plus tard', "l'éclair est plus proche", 'les yeux sont plus rapides que les oreilles'], correct: 0, _v: { e: '300 000 km/s pour la lumière contre 340 m/s pour le son.' } },
          { enonce: 'La vitesse de la lumière dans le vide est d\'environ :', choix: ['300 000 km/s', '340 m/s', '300 000 km/h', '1 500 m/s'], correct: 0, _v: { e: 'Soit 3 × 10⁸ m/s.' } },
        ]);
      },
      indices: ['La lumière du Soleil traverse le vide de l\'espace.', '300 000 km/s : presque un million de fois plus rapide que le son.', 'Le son, lui, a besoin d\'un milieu matériel.'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: "L'année-lumière :",
      generer() {
        return { enonce: "L'année-lumière est une unité de :", choix: ['distance', 'durée', 'vitesse', 'luminosité'], correct: 0, _v: {} };
      },
      indices: ['Malgré son nom, ce n\'est pas une durée.', "C'est ce que parcourt la lumière en un an.", 'On l\'utilise pour les étoiles.'],
      correction_etapes: () => ["C'est la <strong>distance</strong> parcourue par la lumière en une année : environ 9,46 × 10¹² km."],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: 'Calcule la distance :',
      generer() {
        const s = pick([2, 4, 10, 60, 0.1]);
        return {
          enonce: `Quelle distance la lumière parcourt-elle en ${dec(s)} s ? (c = 300 000 km/s)`,
          ...grandeur(C * s, 'km', { pieges: [{ valeur: arrondi(C / s, 2), message: 'd = c × t : on multiplie.' }] }),
          _v: { s },
        };
      },
      indices: ['$d = c \\times t$.', 'km/s × s donne des km.', 'Écris « km ».'],
      correction_etapes: (st) => [`$d = 300\\,000 \\times ${t(st._v.s)}$.`, `$d = ${dec(C * st._v.s)}$ km.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule la durée :',
      generer() {
        const [nom, d] = pick(ASTRES), s = d / C;
        return {
          enonce: `La distance entre la Terre et ${nom} est d'environ ${sci(d)} km. Combien de temps la lumière met-elle pour parcourir cette distance ? (c = 300 000 km/s, réponse en s)`,
          ...grandeur(arrondi(s, 2), 's', { tolerance: s * 0.02, pieges: [{ valeur: d * C, message: 't = d ÷ c : on divise.' }] }),
          _v: { d, s, nom },
        };
      },
      indices: ['$t = d \\div c$.', 'km ÷ (km/s) donne des secondes.', 'Tu peux ensuite convertir en minutes (÷ 60).'],
      correction_etapes: (st) => [`$t = \\dfrac{${sciTex(st._v.d)}}{3 \\times 10^{5}}$.`, `$t \\approx ${t(arrondi(st._v.s, 2))}$ s${st._v.s > 120 ? `, soit environ ${t(arrondi(st._v.s / 60, 1))} min` : ''}.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Regarder dans le passé :',
      generer() {
        const [nom, al] = pick(ETOILES);
        return {
          enonce: `${nom[0].toUpperCase() + nom.slice(1)} est située à ${dec(al)} années-lumière de la Terre. Depuis combien d'années la lumière que nous en recevons aujourd'hui est-elle partie ?`,
          reponse: al, validation: 'nombre', tolerance: 0.01, _v: { nom, al },
        };
      },
      indices: ["Une année-lumière est la distance parcourue par la lumière en un an.", 'À 1 al, la lumière met 1 an.', 'Le nombre d\'années-lumière donne directement la durée en années.'],
      correction_etapes: (st) => [`La lumière parcourt 1 al en 1 an, donc ${dec(st._v.al)} al en <strong>${dec(st._v.al)} ans</strong>.`, `On voit ${st._v.nom} telle qu'elle était il y a ${dec(st._v.al)} ans.`],
    },
    {
      id: 'e06', niveau: 3, type: 'saisie', consigne: 'En kilomètres :',
      generer() {
        const [nom, al] = pick(ETOILES.slice(0, 3)), d = al * AL;
        return {
          enonce: `${nom[0].toUpperCase() + nom.slice(1)} est à ${dec(al)} al. Sachant que 1 al ≈ 9,46 × 10<sup>12</sup> km, exprime cette distance en km (écriture scientifique, par exemple « 4×10^13 km »).`,
          ...grandeur(d, 'km', { tolerance: d * 0.02 }),
          _v: { nom, al, d },
        };
      },
      indices: ['Multiplie le nombre d\'années-lumière par 9,46 × 10¹².', 'Écris le résultat avec « ×10^ ».', 'N\'oublie pas l\'unité km.'],
      correction_etapes: (st) => [`$d = ${t(st._v.al)} \\times 9{,}46 \\times 10^{12}$.`, `$d \\approx ${sciTex(st._v.d)}$ km.`],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Le laser-Lune :',
      generer() {
        const s = pick([2.5, 2.56, 2.6, 2.52]);
        return {
          enonce: `On envoie une impulsion laser vers un réflecteur posé sur la Lune. Elle revient au bout de ${dec(s)} s. Quelle est la distance Terre-Lune ? (c = 300 000 km/s)`,
          ...grandeur((C * s) / 2, 'km', { tolerance: 100, pieges: [{ valeur: C * s, message: "La lumière a fait l'aller ET le retour : divise par 2." }] }),
          _v: { s },
        };
      },
      indices: ['La lumière fait un aller-retour.', 'Distance parcourue : c × t.', 'Distance Terre-Lune : la moitié.'],
      correction_etapes: (st) => [`Aller-retour : $300\\,000 \\times ${t(st._v.s)} = ${dec(C * st._v.s)}$ km.`, `Distance Terre-Lune : $${dec(C * st._v.s)} \\div 2 = ${dec((C * st._v.s) / 2)}$ km.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Interpréter :',
      generer() {
        return { enonce: "Une étoile située à 1 000 années-lumière explose aujourd'hui. Quand verra-t-on l'explosion depuis la Terre ?", choix: ['dans 1 000 ans', "aujourd'hui", 'dans 8 minutes', 'on ne la verra jamais'], correct: 0, _v: {} };
      },
      indices: ['La lumière de l\'explosion doit voyager jusqu\'à nous.', 'Elle parcourt 1 année-lumière par an.', '1 000 al : 1 000 ans.'],
      correction_etapes: () => ["La lumière de l'explosion met 1 000 ans à parcourir 1 000 années-lumière.", 'On la verra <strong>dans 1 000 ans</strong>.'],
    },
    {
      id: 'e09', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'année-lumière est une durée.", reponse: false, _v: { e: "Non : c'est une distance." } },
          { enonce: 'La lumière du Soleil met environ 8 minutes pour nous parvenir.', reponse: true, _v: { e: 'Oui : 150 millions de km à 300 000 km/s, soit 500 s.' } },
          { enonce: 'La lumière se propage instantanément.', reponse: false, _v: { e: 'Non : très vite (300 000 km/s), mais pas instantanément.' } },
          { enonce: 'Dans un milieu homogène, la lumière se propage en ligne droite.', reponse: true, _v: { e: 'Oui : on la modélise par des rayons.' } },
          { enonce: 'Le son va plus vite que la lumière.', reponse: false, _v: { e: 'Non : 340 m/s contre 300 000 km/s.' } },
        ]);
      },
      indices: ['c = 300 000 km/s.', 'al = distance.', 'Ligne droite dans un milieu homogène.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La vitesse de la lumière dans le vide vaut environ :', choix: ['300 000 km/s', '340 m/s', '1 500 m/s', '3 000 km/h'], correct: 0, explication: '3 × 10⁸ m/s.' },
    { type: 'qcm', question: "L'année-lumière est :", choix: ['une distance', 'une durée', 'une vitesse', 'une énergie'], correct: 0, explication: 'La distance parcourue par la lumière en un an.' },
    {
      type: 'saisie', question: 'Distance.',
      generer() { const s = pick([3, 5]); return { question: `Quelle distance parcourt la lumière en ${s} s (c = 300 000 km/s) ?`, ...grandeur(C * s, 'km'), explication: `$300\\,000 \\times ${s}$ km.` }; },
    },
    { type: 'vrai_faux', question: 'La lumière peut se propager dans le vide.', reponse: true, explication: 'Contrairement au son.' },
    { type: 'qcm', question: 'On observe une étoile située à 50 al. On la voit telle qu\'elle était :', choix: ['il y a 50 ans', "aujourd'hui", 'il y a 50 secondes', 'dans 50 ans'], correct: 0, explication: 'Sa lumière a voyagé 50 ans.' },
  ],
};
