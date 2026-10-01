// =====================================================================
//  pv09_lumiere.js — Physique-chimie 5ᵉ : la lumière.
//  Sources primaires et objets diffusants, condition de visibilité,
//  propagation rectiligne, rayon lumineux, ombre propre / portée,
//  éclipses, vitesse de la lumière.
// =====================================================================

import { pick, arrondi, dec, grandeur, melanger } from '../outils.js';
import { ombre } from '../figures_cycle.js';

const OBJETS = [
  ['le Soleil', true], ['une lampe allumée', true], ["la flamme d'une bougie", true], ['une étoile', true], ["l'écran allumé d'un téléphone", true],
  ['la Lune', false], ['un livre', false], ['un mur blanc', false], ['un vélo', false], ['la planète Mars', false], ['une lampe éteinte', false],
];

const MATERIAUX = [
  ['une vitre', 'transparent'], ['une plaque de carton', 'opaque'], ['une feuille de papier calque', 'translucide'], ['du verre dépoli (salle de bains)', 'translucide'],
  ["l'eau claire", 'transparent'], ['une planche de bois', 'opaque'], ['une main', 'opaque'], ['un sac plastique blanc fin', 'translucide'], ["l'air", 'transparent'],
];
const TYPES = ['transparent', 'translucide', 'opaque'];

const C_KMS = 300000;

export default {
  id: 'pv09',
  titre: 'La lumière',
  theme: 'pc_signaux', niveau: '5e',
  icone: '🔦',

  intro:
    "Pourquoi voit-on la Lune alors qu'elle ne brille pas par elle-même ? Pourquoi ton ombre s'allonge-t-elle le soir ? " +
    "Tout s'explique avec deux idées simples : pour voir un objet, sa lumière doit entrer dans notre œil ; et la lumière se propage <strong>en ligne droite</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Sources de lumière et objets diffusants',
      contenu: "Une <strong>source primaire</strong> produit sa propre lumière : le Soleil, une étoile, une lampe allumée, une flamme. Un <strong>objet diffusant</strong> ne produit pas de lumière : il renvoie dans toutes les directions une partie de la lumière qu'il reçoit (la Lune, un livre, un mur). On voit un objet si de la lumière venant de cet objet <strong>entre dans notre œil</strong>.",
    },
    {
      type: 'propriete', titre: 'La propagation rectiligne',
      contenu: "Dans un milieu <strong>transparent et homogène</strong> (air, eau, verre, vide), la lumière se propage <strong>en ligne droite</strong>. On la représente par un <strong>rayon lumineux</strong> : une droite munie d'une flèche qui indique le sens de propagation. Un faisceau laser dans la fumée montre ce trajet rectiligne.",
    },
    {
      type: 'definition', titre: 'Transparent, translucide, opaque',
      contenu: "Un objet <strong>transparent</strong> laisse passer la lumière et on voit nettement à travers (vitre). Un objet <strong>translucide</strong> laisse passer la lumière mais on ne voit pas nettement à travers (papier calque). Un objet <strong>opaque</strong> ne laisse pas passer la lumière (carton, bois).",
    },
    { type: 'figure', titre: "L'ombre d'une balle", contenu: 'Déplace la balle entre la source et l\'écran : observe l\'ombre propre et l\'ombre portée.', render: (host) => ombre(host) },
    {
      type: 'propriete', titre: 'Ombre propre et ombre portée',
      contenu: "Un objet opaque éclairé présente une partie non éclairée : son <strong>ombre propre</strong>. Derrière lui, la zone que la lumière n'atteint pas est l'<strong>ombre portée</strong> (sur le sol, un écran). Les limites de l'ombre sont données par les rayons qui frôlent l'objet. Les <strong>éclipses</strong> sont des ombres géantes : éclipse de Soleil quand la Lune passe entre le Soleil et la Terre, éclipse de Lune quand la Terre passe entre le Soleil et la Lune.",
    },
    {
      type: 'propriete', titre: 'La vitesse de la lumière',
      contenu: "La lumière se propage extrêmement vite : environ <strong>300 000 km/s</strong> dans le vide (et presque autant dans l'air). Elle met environ 1,3 s pour venir de la Lune et 8 minutes pour venir du Soleil.",
      formule: 'c \\approx 300\\,000 \\text{ km/s}',
    },
  ],

  methode: [
    { etape: 1, titre: 'Trouver la source', explication: 'Qui produit la lumière ? Soleil, lampe, flamme…' },
    { etape: 2, titre: 'Tracer le trajet', explication: "Source → (objet diffusant) → œil, en lignes droites, avec des flèches." },
    { etape: 3, titre: 'Délimiter les ombres', explication: 'Trace les rayons qui frôlent les bords de l\'objet opaque.' },
    { etape: 4, titre: 'Calculer', explication: 'd = 300 000 × t (d en km, t en s).' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Source ou objet diffusant ?',
      generer() {
        const [nom, source] = pick(OBJETS);
        return { enonce: `${nom[0].toUpperCase() + nom.slice(1)} est :`, choix: ['une source primaire de lumière', 'un objet diffusant'], correct: source ? 0 : 1, ordre_fixe: true, _v: { nom, source } };
      },
      indices: ['Produit-il sa propre lumière ?', 'La Lune renvoie la lumière du Soleil.', 'Une lampe éteinte ne produit rien.'],
      correction_etapes: (st) => [st._v.source ? `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} produit sa propre lumière.` : `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} ne produit pas de lumière : il renvoie celle qu'il reçoit.`, `C'est ${st._v.source ? 'une <strong>source primaire</strong>' : 'un <strong>objet diffusant</strong>'}.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Laisse-t-il passer la lumière ?',
      generer() {
        const [nom, type] = pick(MATERIAUX);
        return { enonce: `${nom[0].toUpperCase() + nom.slice(1)} est un objet ou un milieu :`, choix: TYPES, correct: TYPES.indexOf(type), ordre_fixe: true, _v: { nom, type } };
      },
      indices: ['Voit-on nettement à travers ? Transparent.', 'La lumière passe mais on ne voit pas net ? Translucide.', 'Aucune lumière ne passe ? Opaque.'],
      correction_etapes: (st) => [`${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} est <strong>${st._v.type}</strong>.`],
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Voir la Lune :',
      generer() {
        return { enonce: 'Pourquoi voit-on la Lune la nuit ?', choix: ['elle diffuse la lumière du Soleil, qui arrive ensuite dans notre œil', 'elle produit sa propre lumière', 'nos yeux envoient de la lumière vers elle', 'elle reflète la lumière des lampadaires'], correct: 0, _v: {} };
      },
      indices: ['La Lune est-elle une source primaire ?', 'Qui l\'éclaire ?', 'Pour voir, la lumière doit entrer dans l\'œil.'],
      correction_etapes: () => ['La Lune est un <strong>objet diffusant</strong> : elle est éclairée par le Soleil.', "Elle renvoie une partie de cette lumière, qui arrive jusqu'à notre œil."],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Le trajet de la lumière :',
      generer() {
        const [src, obj] = pick([['la lampe de bureau', 'le cahier'], ['le Soleil', "l'arbre"], ['le plafonnier', 'la pomme']]);
        const choix = melanger([`${src} → ${obj} → œil`, `œil → ${obj}`, `œil → ${obj} → ${src}`, `${obj} → ${src} → œil`]);
        return { enonce: `Tu regardes ${obj}, éclairé par ${src}. Quel est le trajet de la lumière ?`, choix, correct: choix.indexOf(`${src} → ${obj} → œil`), _v: { src, obj } };
      },
      indices: ['La lumière part toujours d\'une source.', "L'œil reçoit la lumière, il n'en envoie pas.", "L'objet diffusant renvoie la lumière reçue."],
      correction_etapes: (st) => [`La lumière part de ${st._v.src} (source), éclaire ${st._v.obj} qui la diffuse, et une partie entre dans l'œil.`, `Trajet : <strong>${st._v.src} → ${st._v.obj} → œil</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'La lumière est rapide :',
      generer() {
        const t = pick([2, 3, 5, 10, 0.5]);
        return {
          enonce: `La lumière parcourt 300 000 km en une seconde. Quelle distance parcourt-elle en ${dec(t)} s ?`,
          ...grandeur(C_KMS * t, 'km', { pieges: [{ valeur: arrondi(C_KMS / t, 3), message: 'En plus de temps, elle va plus loin : multiplie.' }] }),
          _v: { t },
        };
      },
      indices: ['Situation de proportionnalité.', '$d = 300\\,000 \\times t$.', 'Réponse en km.'],
      correction_etapes: (st) => [`$d = 300\\,000 \\times ${dec(st._v.t).replace(',', '{,}')}$.`, `$d = ${dec(C_KMS * st._v.t).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\\,')}$ km.`],
    },
    {
      id: 'e06', niveau: 3, type: 'saisie', consigne: 'Un message de la Lune :',
      generer() {
        const [nom, d] = pick([['la Lune', 384000], ['un satellite GPS', 20000], ['la station spatiale (ISS), quand elle est à la verticale', 400], ['un satellite de télévision', 36000]]);
        const t = arrondi(d / C_KMS, 4);
        return {
          enonce: `Un signal lumineux (ou radio, même vitesse : 300 000 km/s) part de ${nom}, à ${dec(d)} km de nous. Combien de temps met-il pour nous parvenir ? (en s)`,
          ...grandeur(t, 's', { tolerance: t * 0.03, pieges: [{ valeur: d * C_KMS, message: 'Pour une durée, on divise la distance par la vitesse : t = d ÷ v.' }] }),
          _v: { d, t, nom },
        };
      },
      indices: ['$t = d \\div v$.', 'd en km et v en km/s : t en secondes.', 'La lumière est si rapide que la durée est très courte.'],
      correction_etapes: (st) => [`$t = \\dfrac{${st._v.d}}{300\\,000}$.`, `$t \\approx ${dec(st._v.t).replace(',', '{,}')}$ s.`],
    },
    {
      id: 'e07', niveau: 2, type: 'qcm', consigne: 'Les éclipses :',
      generer() {
        const type = pick(['Soleil', 'Lune']);
        return { enonce: `Lors d'une éclipse de ${type}, les trois astres sont alignés dans quel ordre ?`, choix: ['Soleil, Lune, Terre', 'Soleil, Terre, Lune', 'Lune, Soleil, Terre'], correct: type === 'Soleil' ? 0 : 1, ordre_fixe: true, _v: { type } };
      },
      indices: ['Une éclipse est une ombre.', "L'astre caché est dans l'ombre d'un autre (ou masqué par lui).", 'Éclipse de Lune : la Lune est dans l\'ombre de la Terre.'],
      correction_etapes: (st) => [st._v.type === 'Soleil' ? 'La Lune passe devant le Soleil et projette son ombre sur la Terre.' : 'La Lune passe dans l\'ombre portée de la Terre.', `Ordre : <strong>${st._v.type === 'Soleil' ? 'Soleil, Lune, Terre' : 'Soleil, Terre, Lune'}</strong>.`],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: "La taille de l'ombre :",
      generer() {
        const sens = pick(['rapproche de la lampe', "éloigne de la lampe (vers l'écran)"]);
        return { enonce: `Une balle opaque est placée entre une petite lampe et un écran. On la ${sens}. Son ombre portée sur l'écran devient :`, choix: ['plus grande', 'plus petite', 'identique'], correct: sens.startsWith('rapproche') ? 0 : 1, ordre_fixe: true, _v: { sens } };
      },
      indices: ['Trace les deux rayons qui frôlent la balle.', 'Ces rayons partent tous du même point : la lampe.', 'Plus la balle est près de la lampe, plus ils s\'écartent vite.'],
      correction_etapes: (st) => [st._v.sens.startsWith('rapproche') ? 'Près de la lampe, les rayons qui frôlent la balle sont très écartés en arrivant sur l\'écran.' : 'Près de l\'écran, l\'ombre a presque la taille de la balle.', `L'ombre portée devient <strong>${st._v.sens.startsWith('rapproche') ? 'plus grande' : 'plus petite'}</strong>.`],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Dans le noir complet, on voit quand même un livre blanc.', reponse: false, _v: { e: "Non : sans source de lumière, le livre ne renvoie rien vers l'œil." } },
          { enonce: 'La lumière peut se propager dans le vide.', reponse: true, _v: { e: "Oui : c'est ainsi que la lumière du Soleil nous parvient." } },
          { enonce: "L'œil envoie de la lumière vers les objets pour les voir.", reponse: false, _v: { e: "Non : l'œil reçoit la lumière, il n'en émet pas." } },
          { enonce: 'Dans l\'air, la lumière se propage en ligne droite.', reponse: true, _v: { e: 'Oui : l\'air est un milieu transparent et homogène.' } },
          { enonce: 'La Lune est une source primaire de lumière.', reponse: false, _v: { e: 'Non : c\'est un objet diffusant, éclairé par le Soleil.' } },
        ]);
      },
      indices: ['L\'œil est un récepteur de lumière.', 'La lumière n\'a pas besoin de matière.', 'Une source produit sa lumière.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Laquelle est une source primaire de lumière ?', choix: ['une bougie allumée', 'la Lune', 'un miroir', 'une feuille blanche'], correct: 0, explication: 'Elle produit sa propre lumière.' },
    { type: 'qcm', question: 'Dans un milieu transparent et homogène, la lumière se propage :', choix: ['en ligne droite', 'en zigzag', 'en cercle', 'au hasard'], correct: 0, explication: 'C\'est la propagation rectiligne.' },
    { type: 'vrai_faux', question: 'Pour voir un objet, il faut que de la lumière venant de lui entre dans l\'œil.', reponse: true, explication: 'C\'est la condition de visibilité.' },
    { type: 'qcm', question: 'La zone sombre derrière un objet éclairé, sur le sol, est :', choix: ["l'ombre portée", "l'ombre propre", 'un rayon', 'une source'], correct: 0, explication: "L'ombre propre est la partie non éclairée de l'objet lui-même." },
    {
      type: 'saisie', question: 'Vitesse de la lumière.',
      generer() { const t = pick([4, 6]); return { question: `À 300 000 km/s, quelle distance la lumière parcourt-elle en ${t} s ?`, ...grandeur(C_KMS * t, 'km'), explication: `$300\\,000 \\times ${t}$ km.` }; },
    },
  ],
};
