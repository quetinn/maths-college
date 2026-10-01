// =====================================================================
//  pv05_mouvement.js — Physique-chimie 5ᵉ : décrire un mouvement.
//  Mouvement relatif à un objet de référence, trajectoire (rectiligne,
//  circulaire, curviligne), vitesse constante / qui augmente / qui
//  diminue, vitesse moyenne v = d ÷ t.
// =====================================================================

import { pick, arrondi, dec, grandeur } from '../outils.js';
import { chronophoto, schemaChrono } from '../figures.js';

const TRAJECTOIRES = [
  ["la pointe de l'aiguille d'une horloge", 'circulaire'], ['une balle lâchée sans vitesse', 'rectiligne'],
  ['un ballon de basket lancé vers le panier', 'curviligne'], ["une nacelle de grande roue (vue du sol)", 'circulaire'],
  ['un ascenseur', 'rectiligne'], ['une voiture qui prend un virage', 'curviligne'],
  ['un skieur sur une piste sinueuse', 'curviligne'], ['un TGV sur une longue ligne droite', 'rectiligne'],
  ['la valve d\'une roue de vélo (vue depuis le cadre du vélo)', 'circulaire'], ['un papillon qui volette', 'curviligne'],
];
const TYPES = ['rectiligne', 'circulaire', 'curviligne'];

/** Situations de mouvement relatif : [personne, véhicule, référence, en mouvement ?]. */
const RELATIF = [
  ['Léa, assise dans un bus qui roule', 'son siège', false], ['Léa, assise dans un bus qui roule', 'la route', true],
  ['Léa, assise dans un bus qui roule', 'le conducteur du bus', false], ['Léa, assise dans un bus qui roule', 'un arbre au bord de la route', true],
  ['Tom, debout sur un tapis roulant en marche', 'le tapis', false], ['Tom, debout sur un tapis roulant en marche', 'le sol de l\'aéroport', true],
  ['un passager assis dans un avion en vol', 'son voisin de siège', false], ['un passager assis dans un avion en vol', 'la piste de décollage', true],
];

export default {
  id: 'pv05',
  titre: 'Décrire un mouvement',
  theme: 'pc_mouvement', niveau: '5e',
  icone: '🏃',

  intro:
    "Assis dans un train, tu es immobile pour ton voisin… mais tu fonces à 300 km/h pour la vache qui te regarde passer ! " +
    "Pour décrire un mouvement, il faut préciser <strong>par rapport à quoi</strong>, puis décrire la <strong>trajectoire</strong> et l'évolution de la <strong>vitesse</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Un mouvement se décrit par rapport à un objet',
      contenu: "Un objet est <strong>en mouvement</strong> par rapport à un autre objet si sa position change par rapport à lui ; sinon il est <strong>immobile</strong> par rapport à lui. Le mouvement dépend donc de l'objet de référence choisi : un passager assis est immobile par rapport au bus, mais en mouvement par rapport à la route.",
    },
    {
      type: 'definition', titre: 'La trajectoire',
      contenu: "La <strong>trajectoire</strong> est la ligne formée par les positions successives de l'objet. Elle est <strong>rectiligne</strong> (une droite), <strong>circulaire</strong> (un cercle) ou <strong>curviligne</strong> (une courbe quelconque).",
    },
    {
      type: 'propriete', titre: 'La vitesse change-t-elle ?',
      contenu: "Sur une <strong>chronophotographie</strong>, les positions sont photographiées à intervalles de temps égaux. Positions également espacées : vitesse <strong>constante</strong> (mouvement uniforme). Écart qui augmente : la vitesse <strong>augmente</strong> (accéléré). Écart qui diminue : la vitesse <strong>diminue</strong> (ralenti).",
    },
    { type: 'figure', titre: 'Chronophotographie', contenu: 'Choisis un mouvement : les positions apparaissent une à une, à intervalles de temps égaux.', render: (host) => chronophoto(host) },
    {
      type: 'definition', titre: 'La vitesse moyenne',
      contenu: "La vitesse moyenne $v$ est la distance parcourue $d$ divisée par la durée $t$ du parcours. Avec $d$ en km et $t$ en h, $v$ est en <strong>km/h</strong> ; avec $d$ en m et $t$ en s, $v$ est en <strong>m/s</strong>.",
      formule: 'v = \\dfrac{d}{t} \\qquad d = v \\times t',
    },
    {
      type: 'exemple', enonce: 'Une randonneuse parcourt $12$ km en $3$ h. Quelle est sa vitesse moyenne ?',
      solution_etapes: ['$v = \\dfrac{d}{t} = \\dfrac{12}{3}$.', '$v = 4$ km/h.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Par rapport à quoi ?', explication: 'Choisis l\'objet de référence (le sol, le bus…).' },
    { etape: 2, titre: 'La trajectoire', explication: 'Droite : rectiligne. Cercle : circulaire. Autre courbe : curviligne.' },
    { etape: 3, titre: 'La vitesse', explication: 'Chronophotographie : compare les écarts entre positions successives.' },
    { etape: 4, titre: 'Calculer', explication: '$v = d \\div t$, avec les unités accordées (km et h, ou m et s).' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Quelle trajectoire ?',
      generer() {
        const [nom, type] = pick(TRAJECTOIRES);
        return { enonce: `La trajectoire de ${nom} est :`, choix: TYPES, correct: TYPES.indexOf(type), ordre_fixe: true, _v: { nom, type } };
      },
      indices: ['Imagine les positions successives de l\'objet.', 'Forment-elles une droite, un cercle, ou une autre courbe ?', 'Un objet lancé vers le haut et en avant décrit une courbe.'],
      correction_etapes: (st) => [`Les positions de ${st._v.nom} forment ${st._v.type === 'rectiligne' ? 'une droite' : st._v.type === 'circulaire' ? 'un cercle' : 'une courbe'}.`, `Trajectoire <strong>${st._v.type}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Lis la chronophotographie :',
      generer() {
        const mode = pick(['constante', 'augmente', 'diminue']), n = 7;
        const xs = Array.from({ length: n }, (_, k) => { const u = k / (n - 1); return 290 * (mode === 'constante' ? u : mode === 'augmente' ? u * u : 1 - (1 - u) * (1 - u)); });
        return {
          enonce: 'Voici les positions successives d\'un palet, photographiées à intervalles de temps égaux. Sa vitesse :',
          visuel: (h) => { h.innerHTML = schemaChrono(xs); },
          choix: ['est constante', 'augmente', 'diminue'], correct: ['constante', 'augmente', 'diminue'].indexOf(mode), ordre_fixe: true, _v: { mode },
        };
      },
      indices: ['Entre deux photos, il s\'écoule toujours la même durée.', 'Compare les écarts entre deux positions voisines.', 'Plus l\'écart est grand, plus le palet va vite.'],
      correction_etapes: (st) => [st._v.mode === 'constante' ? 'Les positions sont également espacées.' : st._v.mode === 'augmente' ? "L'écart entre deux positions augmente." : "L'écart entre deux positions diminue.", `La vitesse <strong>${st._v.mode === 'constante' ? 'est constante' : st._v.mode}</strong>.`],
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'En mouvement ou immobile ?',
      generer() {
        const [qui, ref, bouge] = pick(RELATIF);
        return { enonce: `${qui[0].toUpperCase() + qui.slice(1)}. Par rapport à ${ref}, cette personne est :`, choix: ['en mouvement', 'immobile'], correct: bouge ? 0 : 1, ordre_fixe: true, _v: { qui, ref, bouge } };
      },
      indices: ['Sa position change-t-elle par rapport à cet objet ?', 'Deux objets qui avancent ensemble sont immobiles l\'un par rapport à l\'autre.', 'Le sol, la route, les arbres ne bougent pas avec le véhicule.'],
      correction_etapes: (st) => [st._v.bouge ? `Sa position change par rapport à ${st._v.ref}.` : `Sa position ne change pas par rapport à ${st._v.ref} : ils se déplacent ensemble.`, `Elle est <strong>${st._v.bouge ? 'en mouvement' : 'immobile'}</strong> par rapport à ${st._v.ref}.`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule la vitesse moyenne (en km/h) :',
      generer() {
        const [qui, v] = pick([['Un cycliste', pick([15, 18, 20, 24])], ['Une voiture', pick([60, 80, 90])], ['Un marcheur', pick([4, 5])], ['Un train', pick([120, 150, 200])]]);
        const t = pick([2, 3, 4]), d = v * t;
        return {
          enonce: `${qui} parcourt ${d} km en ${t} h. Quelle est sa vitesse moyenne ?`,
          ...grandeur(v, 'km/h', { pieges: [{ valeur: arrondi(t / d, 4), message: 'Tu as divisé la durée par la distance : v = d ÷ t.' }, { valeur: d * t, message: 'On divise la distance par la durée, on ne multiplie pas.' }] }),
          _v: { d, t, v },
        };
      },
      indices: ['$v = d \\div t$.', 'Distance en km, durée en h : la vitesse est en km/h.', 'Écris « km/h » après le nombre.'],
      correction_etapes: (st) => [`$v = \\dfrac{${st._v.d}}{${st._v.t}}$.`, `$v = ${st._v.v}$ km/h.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Calcule la vitesse moyenne (en m/s) :',
      generer() {
        const [qui, d, t] = pick([['Une sprinteuse', 100, pick([10, 12.5, 20])], ['Un nageur', 50, pick([25, 40])], ['Un escargot', 1, pick([500, 1000])], ['Une trottinette', 300, pick([60, 75, 100])]]);
        const v = arrondi(d / t, 4);
        return {
          enonce: `${qui} parcourt ${d} m en ${dec(t)} s. Quelle est sa vitesse moyenne ?`,
          ...grandeur(v, 'm/s', { tolerance: v / 200, pieges: [{ valeur: arrondi(t / d, 4), message: 'Tu as divisé la durée par la distance : v = d ÷ t.' }] }),
          _v: { d, t, v },
        };
      },
      indices: ['$v = d \\div t$.', 'Distance en m, durée en s : la vitesse est en m/s.', 'Écris « m/s ».'],
      correction_etapes: (st) => [`$v = \\dfrac{${st._v.d}}{${dec(st._v.t).replace(',', '{,}')}}$.`, `$v = ${dec(st._v.v).replace(',', '{,}')}$ m/s.`],
    },
    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule la distance :',
      generer() {
        const [qui, v] = pick([['Un cycliste', 16], ['Un bateau', 25], ['Une voiture', 70], ['Un coureur', 12]]), t = pick([2, 3, 5]);
        return {
          enonce: `${qui} avance à la vitesse constante de ${v} km/h pendant ${t} h. Quelle distance parcourt-il ?`,
          ...grandeur(v * t, 'km', { pieges: [{ valeur: arrondi(v / t, 4), message: 'Pour une distance, on multiplie : d = v × t.' }] }),
          _v: { v, t },
        };
      },
      indices: ['$d = v \\times t$.', 'km/h × h donne des km.', 'Écris « km ».'],
      correction_etapes: (st) => [`$d = ${st._v.v} \\times ${st._v.t}$.`, `$d = ${st._v.v * st._v.t}$ km.`],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Qui va le plus vite ?',
      generer() {
        const vA = pick([4, 5, 6, 8]), vB = pick([4, 5, 6, 8]), tA = pick([10, 20, 25]), tB = pick([10, 20, 30, 40]);
        const dA = vA * tA, dB = vB * tB;
        return {
          enonce: `Alice parcourt ${dA} m en ${tA} s. Bruno parcourt ${dB} m en ${tB} s. Qui a la plus grande vitesse moyenne ?`,
          choix: ['Alice', 'Bruno', 'ils ont la même vitesse'], correct: vA > vB ? 0 : vB > vA ? 1 : 2, ordre_fixe: true, _v: { vA, vB, dA, dB, tA, tB },
        };
      },
      indices: ['Calcule la vitesse de chacun.', '$v = d \\div t$ pour Alice, puis pour Bruno.', 'Celui qui parcourt le plus de mètres en une seconde va le plus vite.'],
      correction_etapes: (st) => [`Alice : $${st._v.dA} \\div ${st._v.tA} = ${st._v.vA}$ m/s. Bruno : $${st._v.dB} \\div ${st._v.tB} = ${st._v.vB}$ m/s.`, st._v.vA === st._v.vB ? 'Ils ont <strong>la même vitesse</strong>.' : `<strong>${st._v.vA > st._v.vB ? 'Alice' : 'Bruno'}</strong> va le plus vite.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: 'Calcule la durée :',
      generer() {
        const [qui, v, d] = pick([['Un TGV', 300, pick([150, 75, 450])], ['Un cycliste', 20, pick([5, 10, 30])], ['Une voiture', 90, pick([45, 30, 135])], ['Un marcheur', 6, pick([3, 2, 9])]]);
        const tMin = (d / v) * 60;
        return {
          enonce: `${qui} roule à ${v} km/h (vitesse constante). Combien de temps met-il pour parcourir ${d} km ? Donne la réponse en minutes.`,
          ...grandeur(arrondi(tMin, 2), 'min', { tolerance: 0.1, pieges: [{ valeur: arrondi(d / v, 4), message: 'C\'est la durée en heures : convertis en minutes (× 60).' }, { valeur: arrondi(v / d, 4), message: 'La durée se calcule avec t = d ÷ v.' }] }),
          _v: { v, d, tMin },
        };
      },
      indices: ['$t = d \\div v$ donne une durée en heures.', 'Une heure = 60 minutes.', 'Multiplie par 60, puis écris « min ».'],
      correction_etapes: (st) => [`$t = \\dfrac{${st._v.d}}{${st._v.v}} = ${dec(st._v.d / st._v.v, 4).replace(',', '{,}')}$ h.`, `$${dec(st._v.d / st._v.v, 4).replace(',', '{,}')} \\times 60 = ${dec(st._v.tMin, 2).replace(',', '{,}')}$ min.`],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un objet peut être à la fois immobile et en mouvement.', reponse: true, _v: { e: 'Oui : immobile par rapport à un objet, en mouvement par rapport à un autre (le passager et le bus, le passager et la route).' } },
          { enonce: 'Sur une chronophotographie, des positions de plus en plus espacées indiquent que la vitesse diminue.', reponse: false, _v: { e: 'Non : l\'objet parcourt plus de distance à chaque intervalle, sa vitesse augmente.' } },
          { enonce: 'La trajectoire de la Lune autour de la Terre est à peu près circulaire.', reponse: true, _v: { e: 'Oui, vue depuis la Terre.' } },
          { enonce: 'Une vitesse en km/h s\'obtient en divisant des km par des heures.', reponse: true, _v: { e: 'Oui : v = d ÷ t.' } },
          { enonce: 'Un ascenseur a une trajectoire circulaire.', reponse: false, _v: { e: 'Non : il se déplace en ligne droite, verticalement : trajectoire rectiligne.' } },
        ]);
      },
      indices: ['Toujours préciser « par rapport à quoi ».', 'Écart qui augmente = plus rapide.', 'v = d ÷ t.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La trajectoire d\'une nacelle de grande roue est :', choix: ['circulaire', 'rectiligne', 'curviligne quelconque', 'immobile'], correct: 0, explication: 'Elle décrit un cercle.' },
    { type: 'qcm', question: 'Un passager assis dans un train qui roule est immobile par rapport :', choix: ['à son siège', 'aux rails', 'à la gare', 'aux arbres'], correct: 0, explication: 'Il se déplace avec son siège.' },
    {
      type: 'saisie', question: 'Vitesse.',
      generer() { const v = pick([5, 10, 30, 50]), t = pick([2, 4]); return { question: `On parcourt ${v * t} km en ${t} h. Vitesse moyenne ?`, ...grandeur(v, 'km/h'), explication: `$${v * t} \\div ${t} = ${v}$ km/h.` }; },
    },
    { type: 'vrai_faux', question: 'Des positions régulièrement espacées (même durée entre deux photos) indiquent une vitesse constante.', reponse: true, explication: 'Le mouvement est uniforme.' },
    { type: 'qcm', question: 'La formule de la vitesse moyenne est :', choix: ['v = d ÷ t', 'v = t ÷ d', 'v = d × t', 'v = d + t'], correct: 0, explication: 'Distance divisée par durée.' },
  ],
};
