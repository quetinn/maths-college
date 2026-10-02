// =====================================================================
//  p05_vitesse_mouvement.js — Physique-chimie 3ᵉ : vitesse et mouvement.
//  Référentiel, trajectoire, vitesse moyenne v = d / t, conversions
//  m/s ↔ km/h, nature du mouvement (uniforme, accéléré, ralenti).
// =====================================================================

import { randInt, pick, arrondi, dec, grandeur, tolRel } from '../outils.js';
import { chronophoto, schemaChrono } from '../figures.js';

const t2 = (x) => dec(arrondi(x, 2)).replace(',', '{,}');

export default {
  id: 'p05',
  titre: 'Vitesse et mouvement',
  theme: 'pc_mouvement', niveau: '3e',
  icone: '🏃',

  intro:
    "Assis dans un train, es-tu immobile ou en mouvement ? Les deux, selon ce que l'on prend comme repère ! " +
    "Pour décrire un mouvement, on choisit un <strong>référentiel</strong>, on observe la <strong>trajectoire</strong> et on mesure la <strong>vitesse</strong>. " +
    "La chronophotographie, qui photographie un objet à intervalles réguliers, permet de voir si la vitesse change.",

  cours: [
    {
      type: 'definition', titre: 'Référentiel',
      contenu: "Un mouvement se décrit toujours <strong>par rapport à un objet de référence</strong>, le <strong>référentiel</strong>. Un passager assis dans un train est immobile par rapport au wagon, mais en mouvement par rapport au quai. Le référentiel le plus utilisé est le sol : c'est le <strong>référentiel terrestre</strong>.",
    },
    {
      type: 'definition', titre: 'Trajectoire',
      contenu: "La <strong>trajectoire</strong> est l'ensemble des positions occupées successivement par un point de l'objet. Elle peut être <strong>rectiligne</strong> (une droite), <strong>circulaire</strong> (un cercle) ou <strong>curviligne</strong> (une courbe quelconque).",
    },
    {
      type: 'definition', titre: 'Vitesse moyenne',
      contenu: "La vitesse moyenne est le quotient de la distance parcourue $d$ par la durée du parcours $t$. En m/s si $d$ est en m et $t$ en s ; en km/h si $d$ est en km et $t$ en h. La vitesse est aussi caractérisée par une <strong>direction</strong> et un <strong>sens</strong>.",
      formule: 'v = \\dfrac{d}{t} \\qquad d = v \\times t \\qquad t = \\dfrac{d}{v}',
    },
    {
      type: 'propriete', titre: 'Convertir m/s et km/h',
      contenu: "$1$ m/s $= 3{,}6$ km/h (car $1$ h $= 3\\,600$ s et $1$ km $= 1\\,000$ m). Des m/s vers les km/h : on multiplie par $3{,}6$ ; des km/h vers les m/s : on divise par $3{,}6$.",
      formule: '10 \\text{ m/s} = 36 \\text{ km/h}',
    },
    {
      type: 'propriete', titre: 'Nature du mouvement',
      contenu: "Sur une chronophotographie (intervalles de temps égaux) : positions <strong>également espacées</strong> → vitesse constante, mouvement <strong>uniforme</strong> ; écarts qui <strong>augmentent</strong> → mouvement <strong>accéléré</strong> ; écarts qui <strong>diminuent</strong> → mouvement <strong>ralenti</strong>.",
    },
    { type: 'figure', titre: 'Chronophotographie', contenu: 'Choisis un mouvement : les positions apparaissent une à une, à intervalles de temps égaux.', render: (host) => chronophoto(host) },
    {
      type: 'exemple', enonce: 'Un sprinteur court le $100$ m en $10$ s. Calcule sa vitesse moyenne en m/s puis en km/h.',
      solution_etapes: ['$v = \\dfrac{d}{t} = \\dfrac{100}{10} = 10$ m/s.', '$10 \\times 3{,}6 = 36$ km/h.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Identifier d et t', explication: 'Repère la distance et la durée dans l\'énoncé.' },
    { etape: 2, titre: 'Accorder les unités', explication: 'm et s → m/s. km et h → km/h. Convertis les minutes en heures (÷ 60) si besoin.' },
    { etape: 3, titre: 'Appliquer la formule', explication: '$v = d \\div t$, ou $d = v \\times t$, ou $t = d \\div v$.' },
    { etape: 4, titre: 'Donner le résultat avec son unité', explication: 'Et convertis si on te le demande (× 3,6 ou ÷ 3,6).' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: 'Calcule la vitesse moyenne (en m/s) :',
      generer() {
        const [qui, d] = pick([['Un sprinteur', 100], ['Une nageuse', 50], ['Un cycliste', 400], ['Un cheval', 200]]);
        const v = pick([2, 2.5, 4, 5, 8, 10, 12.5]), t = d / v;
        return {
          enonce: `${qui} parcourt ${d} m en ${dec(t)} s. Quelle est sa vitesse moyenne ?`,
          ...grandeur(v, 'm/s', { tolerance: 0.01, pieges: [{ valeur: arrondi(t / d, 4), message: 'Tu as divisé la durée par la distance : v = d ÷ t.' }, { valeur: d * t, message: 'Tu as multiplié : la vitesse est un quotient, v = d ÷ t.' }] }),
          _v: { d, t, v },
        };
      },
      indices: ['$v = \\dfrac{d}{t}$.', 'd en m et t en s : v en m/s.', 'Écris l\'unité : « m/s ».'],
      correction_etapes: (st) => [`$v = \\dfrac{d}{t} = \\dfrac{${st._v.d}}{${t2(st._v.t)}}$.`, `$v = ${t2(st._v.v)}$ m/s.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Nature du mouvement :',
      generer() {
        const mode = pick(['uniforme', 'accéléré', 'ralenti']), n = 7;
        const xs = Array.from({ length: n }, (_, k) => { const u = k / (n - 1); return 280 * (mode === 'uniforme' ? u : mode === 'accéléré' ? u * u : 1 - (1 - u) * (1 - u)); });
        return { enonce: 'Voici la chronophotographie d\'une balle (intervalles de temps égaux). Son mouvement est :', visuel: (h) => { h.innerHTML = schemaChrono(xs); }, choix: ['rectiligne uniforme', 'rectiligne accéléré', 'rectiligne ralenti'], correct: ['uniforme', 'accéléré', 'ralenti'].indexOf(mode), ordre_fixe: true, _v: { mode } };
      },
      indices: ['Observe l\'écart entre deux positions successives.', 'Écarts égaux : vitesse constante.', 'Écarts croissants : accéléré ; décroissants : ralenti.'],
      correction_etapes: (st) => [st._v.mode === 'uniforme' ? 'Les écarts sont égaux : la vitesse est constante.' : st._v.mode === 'accéléré' ? 'Les écarts augmentent : la vitesse augmente.' : 'Les écarts diminuent : la vitesse diminue.', `Mouvement <strong>rectiligne ${st._v.mode}</strong>.`],
    },
    {
      id: 'e03', niveau: 2, type: 'saisie', consigne: 'Convertis la vitesse :',
      generer() {
        if (Math.random() < 0.5) {
          const v = pick([5, 10, 15, 20, 25, 30, 12.5]);
          return { enonce: `Convertis ${dec(v)} m/s en km/h.`, ...grandeur(arrondi(v * 3.6, 2), 'km/h', { uniteImposee: true, tolerance: 0.01, pieges: [{ valeur: arrondi(v / 3.6, 4), message: 'Des m/s vers les km/h, on MULTIPLIE par 3,6.' }] }), _v: { v, sens: 'kmh' } };
        }
        const k = pick([36, 54, 72, 90, 108, 126, 18]);
        return { enonce: `Convertis ${k} km/h en m/s.`, ...grandeur(arrondi(k / 3.6, 2), 'm/s', { uniteImposee: true, tolerance: 0.01, pieges: [{ valeur: arrondi(k * 3.6, 2), message: 'Des km/h vers les m/s, on DIVISE par 3,6.' }] }), _v: { v: k, sens: 'ms' } };
      },
      indices: ['$1$ m/s $= 3{,}6$ km/h.', 'm/s → km/h : × 3,6.', 'km/h → m/s : ÷ 3,6.'],
      correction_etapes: (st) => (st._v.sens === 'kmh'
        ? [`${dec(st._v.v)} × 3,6 = <strong>${dec(arrondi(st._v.v * 3.6, 2))} km/h</strong>.`]
        : [`${st._v.v} ÷ 3,6 = <strong>${dec(arrondi(st._v.v / 3.6, 2))} m/s</strong>.`]),
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule la distance parcourue (en km) :',
      generer() {
        const v = pick([30, 45, 60, 80, 90, 120, 130]), min = pick([10, 15, 20, 30, 40, 45, 90]), d = (v * min) / 60;
        return {
          enonce: `Une voiture roule à ${v} km/h pendant ${min} min. Quelle distance parcourt-elle ?`,
          ...grandeur(arrondi(d, 2), 'km', { tolerance: 0.02, pieges: [{ valeur: v * min, message: 'Les minutes doivent être converties en heures (÷ 60) avant de multiplier.' }] }),
          _v: { v, min, d },
        };
      },
      indices: ['$d = v \\times t$.', 'La vitesse est en km/h : la durée doit être en heures.', `${'Minutes'} ÷ 60 = heures.`],
      correction_etapes: (st) => [`$t = ${st._v.min} \\div 60 = ${t2(st._v.min / 60)}$ h.`, `$d = ${st._v.v} \\times ${t2(st._v.min / 60)} = ${t2(st._v.d)}$ km.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Choix du référentiel :',
      generer() {
        return pick([
          { enonce: 'Un passager est assis dans un train qui roule. Il est immobile par rapport :', choix: ['à son siège', 'au quai de la gare', 'aux arbres le long de la voie', 'à une voiture sur la route'], correct: 0, _v: { e: 'Il ne bouge pas par rapport au train et à son siège ; il se déplace par rapport au sol.' } },
          { enonce: "Un cycliste roule sur une route. Par rapport à son vélo, la valve de la roue a une trajectoire :", choix: ['circulaire', 'rectiligne', 'immobile', 'en zigzag'], correct: 0, _v: { e: "Par rapport au vélo, la valve tourne autour de l'axe de la roue : cercle." } },
          { enonce: "Un enfant dans un manège qui tourne est en mouvement par rapport :", choix: ['au sol', 'à son cheval de bois', 'à la barre qu\'il tient', 'à son siège'], correct: 0, _v: { e: 'Par rapport au sol, il décrit un cercle. Par rapport au manège, il est immobile.' } },
        ]);
      },
      indices: ['Un objet est immobile par rapport à ce qui bouge avec lui.', 'Change de point de vue : que verrait un observateur assis dans le train ?', 'Le référentiel terrestre, c\'est le sol.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Un mouvement est toujours décrit par rapport à un référentiel.', reponse: true, _v: { e: 'Oui : sans objet de référence, on ne peut pas dire si un objet bouge.' } },
          { enonce: '36 km/h correspondent à 10 m/s.', reponse: true, _v: { e: '36 ÷ 3,6 = 10.' } },
          { enonce: 'Dans un mouvement uniforme, la vitesse augmente régulièrement.', reponse: false, _v: { e: 'Non : « uniforme » signifie que la vitesse est constante.' } },
          { enonce: 'La trajectoire de la Lune autour de la Terre est à peu près circulaire.', reponse: true, _v: { e: 'Oui, dans le référentiel terrestre (géocentrique).' } },
          { enonce: '1 m/s est plus rapide que 1 km/h.', reponse: true, _v: { e: 'Oui : 1 m/s = 3,6 km/h.' } },
        ]);
      },
      indices: ['Uniforme = constant.', '× 3,6 ou ÷ 3,6.', 'Pense au référentiel.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Vitesse sur une chronophotographie :',
      generer() {
        let dt, ecart;
        do { dt = pick([0.04, 0.1, 0.2, 0.5]); ecart = pick([0.2, 0.3, 0.5, 0.8, 1.2]); } while (dt === ecart);
        const v = ecart / dt;
        return {
          enonce: `Sur une chronophotographie, les positions d'un palet sont séparées de ${dec(ecart)} m, et les photos prises toutes les ${dec(dt)} s. Quelle est la vitesse du palet ?`,
          visuel: (h) => { h.innerHTML = schemaChrono([0, 46, 92, 138, 184, 230, 276]); },
          ...grandeur(arrondi(v, 2), 'm/s', { tolerance: 0.02, pieges: [{ valeur: arrondi(dt / ecart, 4), message: 'Distance divisée par durée : v = d ÷ t.' }] }),
          _v: { dt, ecart, v },
        };
      },
      indices: ['Les écarts sont égaux : le mouvement est uniforme.', 'Entre deux photos : distance = écart, durée = intervalle.', '$v = \\dfrac{d}{t}$.'],
      correction_etapes: (st) => [`Entre deux positions : $d = ${t2(st._v.ecart)}$ m en $t = ${t2(st._v.dt)}$ s.`, `$v = \\dfrac{${t2(st._v.ecart)}}{${t2(st._v.dt)}} = ${t2(st._v.v)}$ m/s.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Le plus rapide :',
      generer() {
        const a = pick([['un guépard', 30], ['un TGV', 88], ['un faucon pèlerin en piqué (record mesuré)', 108], ['Usain Bolt', 10.4]]);
        let b;
        do { b = pick([['une voiture sur autoroute', 130], ['un cheval de course au galop', 60], ['un avion de ligne', 900], ['un scooter', 45]]); } while (Math.abs(a[1] * 3.6 - b[1]) < 5);
        return { enonce: `${a[0][0].toUpperCase() + a[0].slice(1)} atteint ${dec(a[1])} m/s ; ${b[0]} atteint ${b[1]} km/h. Lequel est le plus rapide ?`, choix: [a[0], b[0]], correct: a[1] * 3.6 > b[1] ? 0 : 1, ordre_fixe: true, _v: { a, b } };
      },
      indices: ['On ne compare que dans la même unité.', 'Convertis les m/s en km/h.', '× 3,6.'],
      correction_etapes: (st) => [`${dec(st._v.a[1])} m/s = ${dec(arrondi(st._v.a[1] * 3.6, 1))} km/h.`, `On compare à ${st._v.b[1]} km/h : <strong>${st._v.a[1] * 3.6 > st._v.b[1] ? st._v.a[0] : st._v.b[0]}</strong> est le plus rapide.`],
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Durée du trajet (en minutes) :',
      generer() {
        const v = pick([15, 20, 30, 40, 60, 80]), min = pick([6, 9, 12, 15, 24, 36, 45]), d = (v * min) / 60;
        return {
          enonce: `Combien de temps faut-il pour parcourir ${dec(d)} km à ${v} km/h ? Donne la durée en minutes.`,
          ...grandeur(min, 'min', { tolerance: 0.1, pieges: [{ valeur: d * v, message: 'La durée s\'obtient en divisant : t = d ÷ v.' }] }),
          _v: { v, min, d },
        };
      },
      indices: ['$t = \\dfrac{d}{v}$ : le résultat est en heures.', 'Convertis en minutes : × 60.', 'Écris « min » après le nombre.'],
      correction_etapes: (st) => [`$t = \\dfrac{${t2(st._v.d)}}{${st._v.v}} = ${t2(st._v.min / 60)}$ h.`, `$${t2(st._v.min / 60)} \\times 60 = ${st._v.min}$ min.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La formule de la vitesse moyenne est :', choix: ['v = d ÷ t', 'v = t ÷ d', 'v = d × t', 'v = d − t'], correct: 0, explication: 'Distance divisée par durée.' },
    { type: 'qcm', question: 'Des positions également espacées sur une chronophotographie indiquent un mouvement :', choix: ['uniforme', 'accéléré', 'ralenti', 'circulaire'], correct: 0, explication: 'Même distance pendant chaque intervalle : vitesse constante.' },
    {
      type: 'saisie', question: 'Conversion.',
      generer() { const v = pick([10, 20, 25]); return { question: `Convertis ${v} m/s en km/h.`, ...grandeur(v * 3.6, 'km/h', { uniteImposee: true, tolerance: 0.01 }), explication: `${v} × 3,6 = ${dec(v * 3.6)} km/h.` }; },
    },
    { type: 'vrai_faux', question: 'Un objet peut être immobile dans un référentiel et en mouvement dans un autre.', reponse: true, explication: 'Le passager est immobile par rapport au train, en mouvement par rapport au quai.' },
    { type: 'qcm', question: 'La trajectoire d\'une balle lâchée sans vitesse est :', choix: ['rectiligne (verticale)', 'circulaire', 'courbe', 'en zigzag'], correct: 0, explication: 'Elle tombe verticalement : trajectoire rectiligne, mouvement accéléré.' },
  ],
};
