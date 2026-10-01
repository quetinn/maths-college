// =====================================================================
//  p01_univers_atomes.js — Physique-chimie 3ᵉ : de l'Univers aux atomes.
//  Échelles de l'Univers, année-lumière, formation des éléments,
//  structure de l'atome (noyau, protons, neutrons, électrons), élément.
// =====================================================================

import { randInt, pick, arrondi, dec, q, sci, sciTex, grandeur, tolRel, tex } from '../outils.js';
import { atome, echelleTailles, ELEMENTS, de, du, le } from '../figures.js';

const C_LUMIERE = 3e8; // m/s
const PLANETES = [['Mercure', 5.8e10], ['Vénus', 1.08e11], ['la Terre', 1.5e11], ['Mars', 2.28e11], ['Jupiter', 7.78e11], ['Saturne', 1.43e12]];
const MASSE_NUCLEON = 1.67e-27; // kg

export default {
  id: 'p01',
  titre: "De l'Univers aux atomes",
  theme: 'pc_matiere', niveau: '3e',
  icone: '⚛️',

  intro:
    "D'où viennent les atomes qui nous composent ? Le carbone de nos cellules, le fer de notre sang ont été fabriqués au cœur d'étoiles disparues. " +
    "Ce chapitre fait le grand écart des échelles : des galaxies, séparées par des millions d'<strong>années-lumière</strong>, jusqu'au <strong>noyau de l'atome</strong>, cent mille fois plus petit que l'atome lui-même.",

  cours: [
    {
      type: 'definition', titre: "L'Univers et l'année-lumière",
      contenu: "L'Univers contient des milliards de <strong>galaxies</strong> (comme la Voie lactée), formées de milliards d'<strong>étoiles</strong>. Le Soleil est une étoile ; autour de lui tournent les planètes du système solaire. " +
        "Les distances sont si grandes qu'on les mesure en <strong>année-lumière</strong> (al) : la distance parcourue par la lumière en un an. La lumière va à environ $300\\,000$ km/s.",
      formule: '1 \\text{ al} \\approx 9{,}46 \\times 10^{15} \\text{ m} \\qquad c \\approx 3 \\times 10^{8} \\text{ m/s}',
    },
    { type: 'figure', titre: 'Du noyau à l\'Univers', contenu: "Déplace le curseur : chaque graduation multiplie la taille par $10^5$ (cent mille).", render: (host) => echelleTailles(host) },
    {
      type: 'propriete', titre: 'La formation des éléments chimiques',
      contenu: "L'Univers est né il y a environ <strong>13,8 milliards d'années</strong> (Big Bang). Les premiers noyaux formés sont ceux d'<strong>hydrogène</strong> et d'<strong>hélium</strong>, encore aujourd'hui les éléments les plus abondants de l'Univers. " +
        "Les éléments plus lourds (carbone, oxygène, fer…) sont fabriqués au cœur des <strong>étoiles</strong> par fusion nucléaire, puis dispersés quand les étoiles massives explosent. Notre planète et notre corps sont faits de cette « poussière d'étoiles ».",
    },
    {
      type: 'definition', titre: "La structure de l'atome",
      contenu: "Un atome est formé d'un <strong>noyau</strong> central et d'<strong>électrons</strong> (charge négative) en mouvement autour. Le noyau contient des <strong>protons</strong> (charge positive) et des <strong>neutrons</strong> (sans charge). " +
        "Le nombre de protons est le <strong>numéro atomique</strong> $Z$. Un atome est <strong>électriquement neutre</strong> : il a autant d'électrons que de protons.",
      formule: '\\text{électrons} = \\text{protons} = Z \\qquad \\text{neutrons} = A - Z',
    },
    { type: 'figure', titre: "Modèle de l'atome", contenu: "Change d'élément : le nombre de protons (Z) fixe le nombre d'électrons de l'atome neutre. $A$ est le nombre total de particules du noyau (nucléons).", render: (host) => atome(host, { Z: 6 }) },
    {
      type: 'propriete', titre: "Un atome presque vide",
      contenu: "Un atome mesure environ $10^{-10}$ m, son noyau environ $10^{-15}$ m : le noyau est <strong>100 000 fois plus petit</strong> que l'atome. Pourtant, presque toute la masse de l'atome est dans le noyau (un électron est environ 2 000 fois plus léger qu'un proton). Entre le noyau et les électrons : du vide. On dit que la matière a une structure <strong>lacunaire</strong>.",
    },
    {
      type: 'definition', titre: 'Élément chimique',
      contenu: "Un <strong>élément chimique</strong> regroupe tous les atomes (et ions) qui ont le même numéro atomique $Z$. Il a un <strong>symbole</strong> : une majuscule, parfois suivie d'une minuscule (H, C, O, Fe, Cu, Cl…). La classification périodique range les éléments par $Z$ croissant. Lors d'une transformation chimique, les éléments se conservent.",
    },
    {
      type: 'exemple', enonce: "L'atome d'oxygène a pour numéro atomique $Z = 8$ et contient $A = 16$ nucléons. Décris sa composition.",
      solution_etapes: ["$Z = 8$ : le noyau contient $8$ protons.", "L'atome est neutre : il a $8$ électrons.", "Neutrons : $A - Z = 16 - 8 = 8$ neutrons."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lire le numéro atomique Z', explication: "$Z$ = nombre de protons du noyau. C'est lui qui identifie l'élément (Z = 6 : carbone, Z = 8 : oxygène…)." },
    { etape: 2, titre: 'En déduire les électrons', explication: "Un atome est neutre : autant d'électrons que de protons, donc $Z$ électrons." },
    { etape: 3, titre: 'Calculer les neutrons', explication: "Le noyau contient $A$ nucléons (protons + neutrons) : neutrons $= A - Z$." },
    { etape: 4, titre: 'Contrôler les charges', explication: "Protons (+) et électrons (−) doivent se compenser. Sinon, ce n'est pas un atome mais un ion (chapitre suivant)." },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'saisie', consigne: "Nombre d'électrons d'un atome :",
      generer() {
        const Z = randInt(1, 18), [sym, nom] = ELEMENTS[Z];
        return { enonce: `Le numéro atomique ${du(nom)} (${sym}) est $Z = ${Z}$. Combien d'électrons possède un atome ${de(nom)} ?`, reponse: Z, validation: 'nombre', _v: { Z, nom } };
      },
      indices: ['$Z$ est le nombre de protons.', "Un atome est électriquement neutre.", "Autant d'électrons (−) que de protons (+)."],
      correction_etapes: (st) => [`$Z = ${st._v.Z}$ : le noyau contient ${st._v.Z} protons.`, `L'atome est neutre, il a donc autant d'électrons : <strong>${st._v.Z} électrons</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: "Les particules de l'atome :",
      generer() {
        return pick([
          { enonce: 'Quelle particule porte une charge électrique négative ?', choix: ["l'électron", 'le proton', 'le neutron', 'le noyau'], correct: 0, _v: { e: "L'électron est chargé négativement ; le proton positivement ; le neutron n'est pas chargé." } },
          { enonce: "Où est concentrée presque toute la masse d'un atome ?", choix: ['dans le noyau', 'dans les électrons', "répartie uniformément dans l'atome", 'dans le vide entre noyau et électrons'], correct: 0, _v: { e: 'Protons et neutrons sont environ 2 000 fois plus lourds que les électrons : la masse est dans le noyau.' } },
          { enonce: "Quelle particule n'a pas de charge électrique ?", choix: ['le neutron', 'le proton', "l'électron", "l'ion"], correct: 0, _v: { e: 'Le neutron est neutre, comme son nom l\'indique.' } },
          { enonce: 'Que contient le noyau d\'un atome ?', choix: ['des protons et des neutrons', 'des protons et des électrons', 'uniquement des électrons', 'des neutrons et des électrons'], correct: 0, _v: { e: 'Le noyau contient les nucléons : protons et neutrons. Les électrons sont autour.' } },
        ]);
      },
      indices: ['Noyau = protons + neutrons.', 'Électrons autour du noyau, charge négative.', 'Le proton est positif, le neutron neutre.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e03', niveau: 2, type: 'complete', consigne: "Complète la composition de l'atome :",
      generer() {
        const Z = randInt(2, 18), [sym, nom, A] = ELEMENTS[Z];
        return {
          enonce_complete: `Atome ${de(nom)} (${sym}) : $Z = ${Z}$, $A = ${A}$.<br>Protons : {0} · neutrons : {1} · électrons : {2}`,
          champs: [{ reponse: Z, validation: 'nombre' }, { reponse: A - Z, validation: 'nombre' }, { reponse: Z, validation: 'nombre' }],
          _v: { Z, A, nom },
        };
      },
      indices: ['Protons : $Z$.', 'Neutrons : $A - Z$.', 'Électrons : autant que de protons (atome neutre).'],
      correction_etapes: (st) => [`Protons : $Z = ${st._v.Z}$.`, `Neutrons : $A - Z = ${st._v.A} - ${st._v.Z} = ${st._v.A - st._v.Z}$.`, `Électrons : ${st._v.Z} (l'atome est neutre).`],
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'La lumière du Soleil voyage jusqu\'aux planètes :',
      generer() {
        const [nom, d] = pick(PLANETES), t = d / C_LUMIERE;
        return {
          enonce: `Le Soleil est à environ ${sci(d)} m de ${nom}. La lumière va à ${sci(C_LUMIERE, 1)} m/s. Combien de temps met-elle pour arriver ? (en secondes, arrondi à l'unité)`,
          ...grandeur(Math.round(t), 's', { tolerance: Math.max(2, tolRel(t, 1)), pieges: [{ valeur: d * C_LUMIERE, message: "Tu as multiplié : la durée s'obtient en divisant la distance par la vitesse, t = d ÷ v." }] }),
          _v: { nom, d, t },
        };
      },
      indices: ['$v = \\dfrac{d}{t}$, donc $t = \\dfrac{d}{v}$.', 'Divise la distance (en m) par la vitesse (en m/s).', "Le résultat est en secondes : n'oublie pas l'unité."],
      correction_etapes: (st) => [`$t = \\dfrac{d}{c} = \\dfrac{${sciTex(st._v.d)}}{3 \\times 10^{8}}$.`, `$t \\approx ${Math.round(st._v.t)}$ s, soit environ ${dec(arrondi(st._v.t / 60, 1))} min.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: "Un atome à notre échelle :",
      generer() {
        const bille = pick([0.5, 1, 2, 3]); // en cm
        return {
          enonce: `Le noyau est environ $100\\,000$ fois plus petit que l'atome. Si le noyau avait la taille d'une bille de ${dec(bille)} cm, quelle serait la taille de l'atome ? (donne le résultat avec une unité : m ou km)`,
          ...grandeur(bille * 1000, 'm', { pieges: [{ valeur: bille / 100 / 100000, message: "L'atome est plus GRAND que son noyau : il faut multiplier par 100 000, pas diviser." }] }),
          _v: { bille },
        };
      },
      indices: ["L'atome est 100 000 fois plus grand que son noyau.", `Multiplie la taille de la bille par 100 000.`, '100 000 cm = 1 000 m = 1 km.'],
      correction_etapes: (st) => [`${dec(st._v.bille)} cm × 100 000 = ${dec(st._v.bille * 100000)} cm.`, `${dec(st._v.bille * 100000)} cm = <strong>${dec(st._v.bille * 1000)} m</strong>, soit ${dec(st._v.bille)} km : un stade entier autour d'une bille !`],
    },
    {
      id: 'e06', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'hydrogène est l'élément le plus abondant de l'Univers.", reponse: true, _v: { e: "Oui : formé dès les premières minutes de l'Univers, il en représente environ les trois quarts de la masse." } },
          { enonce: 'Le fer de notre sang a été fabriqué dans une étoile.', reponse: true, _v: { e: 'Oui : les éléments plus lourds que l\'hélium sont fabriqués dans les étoiles.' } },
          { enonce: "Le noyau d'un atome contient des électrons.", reponse: false, _v: { e: 'Non : les électrons sont autour du noyau ; le noyau contient protons et neutrons.' } },
          { enonce: 'Une année-lumière est une durée.', reponse: false, _v: { e: "Non : c'est une distance, celle parcourue par la lumière en un an." } },
          { enonce: "Un atome est électriquement neutre.", reponse: true, _v: { e: "Oui : il a autant d'électrons (−) que de protons (+)." } },
          { enonce: 'Le noyau est à peu près aussi grand que l\'atome.', reponse: false, _v: { e: 'Non : il est environ 100 000 fois plus petit.' } },
        ]);
      },
      indices: ["Relis les propriétés de l'atome.", "L'année-lumière est une unité de…", 'Les éléments lourds viennent des étoiles.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: "Identifie l'élément :",
      generer() {
        const Z = randInt(3, 18), [, nom, A] = ELEMENTS[Z];
        const autres = new Set([nom]);
        while (autres.size < 4) autres.add(ELEMENTS[randInt(1, 18)][1]);
        const choix = [...autres];
        return { enonce: `Un atome possède $${A}$ nucléons dont $${A - Z}$ neutrons. De quel élément s'agit-il ?`, choix, correct: 0, _v: { Z, A, nom } };
      },
      indices: ["Ce qui identifie l'élément, c'est le nombre de protons Z.", 'Protons = nucléons − neutrons.', 'Utilise le tableau des éléments du cours (ou le modèle interactif).'],
      correction_etapes: (st) => [`Protons : $${st._v.A} - ${st._v.A - st._v.Z} = ${st._v.Z}$, donc $Z = ${st._v.Z}$.`, `L'élément de numéro atomique ${st._v.Z} est <strong>${le(st._v.nom)}</strong>.`],
    },
    {
      id: 'e08', niveau: 3, type: 'ordonner_etapes', consigne: "Remets dans l'ordre l'histoire de la matière :",
      generer() {
        return {
          etapes: [
            'Big Bang : naissance de l\'Univers, il y a environ 13,8 milliards d\'années',
            "Formation des premiers noyaux : hydrogène et hélium",
            'Allumage des premières étoiles',
            'Fabrication des éléments lourds (carbone, oxygène, fer…) au cœur des étoiles',
            'Explosion des étoiles massives : ces éléments sont dispersés dans l\'espace',
            'Formation du système solaire et de la Terre, il y a 4,6 milliards d\'années',
          ],
        };
      },
      indices: ["Tout commence avec le Big Bang.", 'Les étoiles fabriquent les éléments lourds avant de les disperser.', 'La Terre est récente à l\'échelle de l\'Univers.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: "Masse d'un atome :",
      generer() {
        const Z = pick([1, 2, 6, 7, 8, 11, 13, 16]), [sym, nom, A] = ELEMENTS[Z], m = A * MASSE_NUCLEON;
        return {
          enonce: `Un nucléon (proton ou neutron) a une masse d'environ ${sci(MASSE_NUCLEON)} kg ; la masse des électrons est négligeable. Calcule la masse d'un atome ${de(nom)} (${sym}, $A = ${A}$).`,
          ...grandeur(m, 'kg', { tolerance: tolRel(m, 2) }),
          _v: { A, nom, m },
        };
      },
      indices: ["La masse de l'atome est presque celle de son noyau.", 'Le noyau contient $A$ nucléons.', 'Multiplie $A$ par la masse d\'un nucléon ; écris le résultat avec « ×10^ » et l\'unité kg.'],
      correction_etapes: (st) => [`$m \\approx A \\times m_{\\text{nucléon}} = ${st._v.A} \\times 1{,}67 \\times 10^{-27}$.`, `$m \\approx ${sciTex(st._v.m)}$ kg.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'année-lumière est :", choix: ['une distance', 'une durée', 'une vitesse', 'une énergie'], correct: 0, explication: 'La distance parcourue par la lumière en un an (environ $9{,}46 \\times 10^{15}$ m).' },
    { type: 'qcm', question: 'Où ont été fabriqués les atomes de carbone et d\'oxygène ?', choix: ['au cœur des étoiles', 'sur la Terre', 'dans les océans', 'au moment exact du Big Bang'], correct: 0, explication: 'Seuls hydrogène et hélium datent des débuts de l\'Univers ; les autres éléments viennent des étoiles.' },
    {
      type: 'saisie', question: 'Neutrons.',
      generer() { const Z = randInt(3, 18), [, nom, A] = ELEMENTS[Z]; return { question: `Combien de neutrons contient un atome ${de(nom)} ($Z = ${Z}$, $A = ${A}$) ?`, reponse: A - Z, validation: 'nombre', explication: `$A - Z = ${A} - ${Z} = ${A - Z}$.` }; },
    },
    { type: 'vrai_faux', question: 'Un atome a autant de protons que d\'électrons.', reponse: true, explication: "C'est pour cela qu'il est électriquement neutre." },
    { type: 'qcm', question: "Ordre de grandeur de la taille d'un atome :", choix: ['10⁻¹⁰ m', '10⁻¹⁵ m', '10⁻³ m', '10⁻⁵ m'], correct: 0, explication: 'Environ $10^{-10}$ m ; le noyau, lui, mesure environ $10^{-15}$ m.' },
    { type: 'qcm', question: "Ce qui caractérise un élément chimique, c'est :", choix: ['son nombre de protons Z', 'son nombre de neutrons', 'sa masse', 'sa couleur'], correct: 0, explication: 'Tous les atomes d\'un même élément ont le même numéro atomique $Z$.' },
  ],
};
