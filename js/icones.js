// =====================================================================
//  icones.js — Pictogrammes SVG dessinés au trait (remplacent les émojis)
//
//  - Trait : `currentColor` (suit la couleur du texte).
//  - Aplat : `var(--plein)` (rose par défaut, jaune sur fond coloré).
//  - PICTOS_THEME : un dessin par thème du programme, utilisé sur les
//    tuiles de chapitre et en grand dans l'en-tête d'un chapitre.
//  - icone(nom) : petites icônes d'interface (barre du haut, raccourcis).
// =====================================================================

const trait = 'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
const plein = 'fill="var(--plein, #ff8fa3)"';

/** Pictogrammes de thème (viewBox 44 × 44). */
const PICTOS = {
  // Nombres et calculs : les quatre opérations
  nombres_calculs: `
    <rect ${plein} x="5" y="5" width="15" height="15" rx="4"/>
    <path ${trait} d="M12.5 8.5v8M8.5 12.5h8M28 12.5h10M27.5 28l8 8M35.5 28l-8 8M8 32h9"/>
    <circle cx="12.5" cy="28" r="1.6" fill="currentColor"/><circle cx="12.5" cy="36" r="1.6" fill="currentColor"/>`,
  // Proportionnalité et fonctions : repère et courbe
  fonctions: `
    <path ${plein} d="M8 36 C 16 34, 22 18, 38 9 V36Z" opacity=".9"/>
    <path ${trait} d="M8 4v32h32M8 36 C 16 34, 22 18, 38 9"/>
    <circle cx="24" cy="21.5" r="2.6" fill="currentColor"/>`,
  // Géométrie et grandeurs : triangle, arc de compas, angle droit
  geometrie: `
    <path ${plein} d="M8 37 L36 37 L8 9Z"/>
    <path ${trait} d="M8 37 L36 37 L8 9Z M8 31h6v6"/>
    <path ${trait} d="M22 9a17 17 0 0 1 15 15"/>`,
  // Données et probabilités : diagramme en barres et dé
  donnees: `
    <rect ${plein} x="24" y="22" width="15" height="15" rx="3.5"/>
    <path ${trait} d="M6 37V22M13 37V12M20 37V27"/>
    <rect ${trait} x="24" y="22" width="15" height="15" rx="3.5"/>
    <circle cx="28.5" cy="26.5" r="1.5" fill="currentColor"/><circle cx="34.5" cy="32.5" r="1.5" fill="currentColor"/>`,
  // Algorithmique : blocs emboîtés
  algo: `
    <path ${plein} d="M6 8h14l2 3h4l2-3h10v9H6z"/>
    <path ${trait} d="M6 8h14l2 3h4l2-3h10v9H6zM6 21h10v14h24M6 17v18"/>
    <path ${trait} d="M16 25h20"/>`,
};

// Physique-chimie : les quatre thèmes du programme
Object.assign(PICTOS, {
  // Matière : un erlenmeyer
  pc_matiere: `
    <path ${plein} d="M10 36 L16 24 H28 L34 36Z"/>
    <path ${trait} d="M17 4h10M19 4v12L7 38h30L25 16V4M13 26h18"/>`,
  // Mouvement et interactions : une balle lancée
  pc_mouvement: `
    <circle ${plein} cx="30" cy="16" r="8"/>
    <circle ${trait} cx="30" cy="16" r="8"/><path ${trait} d="M4 14h12M6 22h10M8 30h8M16 38 L38 38"/>`,
  // Énergie : un éclair
  pc_energie: `
    <path ${plein} d="M24 4L10 24h10l-2 16 14-20H22z"/><path ${trait} d="M24 4L10 24h10l-2 16 14-20H22z"/>`,
  // Signaux : un haut-parleur et ses ondes
  pc_signaux: `
    <path ${plein} d="M4 16h8l10-8v28l-10-8H4z"/>
    <path ${trait} d="M4 16h8l10-8v28l-10-8H4zM28 15a9 9 0 0 1 0 14M33 10a16 16 0 0 1 0 24"/>`,
});

// SVT : les trois thèmes du programme
Object.assign(PICTOS, {
  // La planète Terre : un globe et ses méridiens
  svt_terre: `
    <circle ${plein} cx="22" cy="22" r="16"/>
    <circle ${trait} cx="22" cy="22" r="16"/><path ${trait} d="M6 22h32M22 6c-8 9-8 23 0 32M22 6c8 9 8 23 0 32"/>`,
  // Le vivant : une feuille et ses nervures
  svt_vivant: `
    <path ${plein} d="M8 37C7 18 19 7 38 7c1 19-10 31-30 30z"/>
    <path ${trait} d="M8 37C7 18 19 7 38 7c1 19-10 31-30 30zM5 40 L29 16M17 28h9M17 28v-9"/>`,
  // Le corps humain : un cœur et son pouls
  svt_corps: `
    <path ${plein} d="M22 38S6 28 6 16a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 12-16 22-16 22z"/>
    <path ${trait} d="M22 38S6 28 6 16a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 12-16 22-16 22z"/>
    <path ${trait} d="M3 23h9l3-6 5 11 3-7 2 2h16"/>`,
});

/** Pictogrammes propres à un chapitre. Les autres chapitres prennent celui de leur thème. */
const PICTOS_CHAP = {
  // ------------------------------------------------------------ SVT 3ᵉ
  // L'origine des caractères : la double hélice d'ADN
  s03: `<circle ${plein} cx="22" cy="22" r="10"/>
    <path ${trait} d="M13 4c0 12 18 12 18 18s-18 6-18 18M31 4c0 12-18 12-18 18s18 6 18 18M16 9h12M16 35h12M19 22h6"/>`,
  // ---------------------------------------------- Physique-chimie 5ᵉ
  // États de la matière : un cube, une goutte, des particules de gaz
  pv01: `<rect ${plein} x="4" y="24" width="14" height="14" rx="2"/><rect ${trait} x="4" y="24" width="14" height="14" rx="2"/>
    <path ${trait} d="M29 40a6.5 6.5 0 0 1-6.5-6.5C22.5 29 29 21 29 21s6.5 8 6.5 12.5A6.5 6.5 0 0 1 29 40z"/>
    <circle cx="26" cy="6" r="2.4" fill="currentColor"/><circle cx="37" cy="9" r="2.4" fill="currentColor"/><circle cx="31" cy="15" r="2.4" fill="currentColor"/><circle cx="16" cy="10" r="2.4" fill="currentColor"/>`,
  // Changements d'état : un thermomètre
  pv02: `<circle ${plein} cx="16" cy="33" r="7"/>
    <path ${trait} d="M12 27.5V8a4 4 0 0 1 8 0v19.5a7 7 0 1 1-8 0zM28 10h10M28 18h7M28 26h10"/>`,
  // Masse et volume : une éprouvette graduée
  pv03: `<path ${plein} d="M14 22h16v16a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z"/>
    <path ${trait} d="M11 4h22M14 4v34a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4M14 22h16M24 10h6M24 16h6M24 28h6M24 34h6"/>`,
  // Mélanges : un verre et sa cuillère
  pv04: `<path ${plein} d="M10 24h24l-1.6 14a2 2 0 0 1-2 2H13.600a2 2 0 0 1-2-2z"/>
    <path ${trait} d="M8 8h28l-3.600 30a2 2 0 0 1-2 2H13.600a2 2 0 0 1-2-2zM10 24h24M31 2 21 31"/>`,
  // Décrire un mouvement : une trajectoire courbe
  pv05: `<circle ${plein} cx="35" cy="10" r="5.500"/>
    <path ${trait} d="M4 37c7-20 17-28 26-27" stroke-dasharray="0.1 7"/><circle ${trait} cx="35" cy="10" r="5.500"/><path ${trait} d="M3 41h38"/>`,
  // Sources d'énergie : le Soleil
  pv06: `<circle ${plein} cx="22" cy="22" r="8"/><circle ${trait} cx="22" cy="22" r="8"/>
    <path ${trait} d="M22 3v6M22 35v6M3 22h6M35 22h6M8.500 8.500l4.200 4.200M31.300 31.300l4.200 4.200M35.500 8.500l-4.200 4.200M12.700 31.300l-4.200 4.200"/>`,
  // Circuit électrique : une ampoule
  pv07: `<path ${plein} d="M22 4a11 11 0 0 1 6 20.200V29H16v-4.800A11 11 0 0 1 22 4z"/>
    <path ${trait} d="M22 4a11 11 0 0 1 6 20.200V29H16v-4.800A11 11 0 0 1 22 4zM16 34h12M18.500 39h7"/>`,
  // Série et dérivation : deux lampes sur deux branches
  pv08: `<circle ${plein} cx="22" cy="12" r="6"/>
    <path ${trait} d="M3 22h6M35 22h6M9 12v20M35 12v20M9 12h7M28 12h7M9 32h7M28 32h7"/><circle ${trait} cx="22" cy="12" r="6"/><circle ${trait} cx="22" cy="32" r="6"/>`,
  // La lumière : une lampe torche et ses rayons
  pv09: `<path ${plein} d="M4 16h11l7-6v24l-7-6H4z"/>
    <path ${trait} d="M4 16h11l7-6v24l-7-6H4zM28 13l11-5M28 22h13M28 31l11 5"/>`,

  // ---------------------------------------------- Physique-chimie 4ᵉ
  // L'air et les molécules : une molécule d'eau
  pr01: `<circle ${plein} cx="22" cy="17" r="11"/><circle ${trait} cx="22" cy="17" r="11"/>
    <circle ${trait} cx="9" cy="33" r="6.500"/><circle ${trait} cx="35" cy="33" r="6.500"/>`,
  // Transformations chimiques : un erlenmeyer, puis autre chose
  pr02: `<path ${plein} d="M7 38l6-12h10l6 12z"/>
    <path ${trait} d="M14 4h8M16 4v12L5 38h26L20 16V4M33 13h8M37 9l4 4-4 4"/><circle ${trait} cx="18" cy="31" r="2"/>`,
  // Combustions : une flamme
  pr03: `<path ${plein} d="M22 41c-7 0-11-4.500-11-10.500 0-5.500 4-8.500 5.500-13.500 3 2 4 5 4 8 2.500-4 2.500-11-1-16 9 3.500 14 11.500 14 21 0 6.500-5 11-11.500 11z"/>
    <path ${trait} d="M22 41c-7 0-11-4.500-11-10.500 0-5.500 4-8.500 5.500-13.500 3 2 4 5 4 8 2.500-4 2.500-11-1-16 9 3.500 14 11.500 14 21 0 6.500-5 11-11.500 11z"/>`,
  // Équations de réaction : une balance à l'équilibre
  pr04: `<path ${plein} d="M3 26h14a7 7 0 0 1-14 0zM27 26h14a7 7 0 0 1-14 0z"/>
    <path ${trait} d="M22 5v33M13 40h18M8 10h28M10 10 3 26h14zM34 10l-7 16h14z"/>`,
  // Mouvement et vitesse : un compteur de vitesse
  pr05: `<path ${plein} d="M22 30 33 14l-6 17z"/>
    <path ${trait} d="M5 34a17 17 0 1 1 34 0M22 30l11-16M3 40h38M9 22l3 2M22 13v4"/>`,
  // Interactions : deux objets qui agissent l'un sur l'autre
  pr06: `<circle ${plein} cx="9" cy="22" r="7"/><circle ${trait} cx="9" cy="22" r="7"/><circle ${trait} cx="35" cy="22" r="7"/>
    <path ${trait} d="M18 17h8M23 14l3 3-3 3M26 27h-8M21 24l-3 3 3 3"/>`,
  // Intensité et tension : le cadran d'un appareil de mesure
  pr07: `<path ${plein} d="M8 31a14 14 0 0 1 28 0z"/>
    <rect ${trait} x="3" y="7" width="38" height="30" rx="5"/><path ${trait} d="M8 31a14 14 0 0 1 28 0M22 31l8-12"/>`,
  // Énergie et conversions : une forme d'énergie entre, deux sortent
  pr08: `<rect ${plein} x="15" y="12" width="14" height="20" rx="7"/><rect ${trait} x="15" y="12" width="14" height="20" rx="7"/>
    <path ${trait} d="M2 22h13M29 18l10-9M34 8h6v6M29 26l10 9M34 36h6v-6"/>`,
  // Le son : une note et ses ondes
  pr09: `<circle ${plein} cx="12" cy="33" r="6.500"/><circle ${trait} cx="12" cy="33" r="6.500"/>
    <path ${trait} d="M18.500 33V6l12-3v8l-12 3M30 23a7 7 0 0 1 0 11M35.500 19a13 13 0 0 1 0 19"/>`,
  // La lumière, vitesse et distances : une étoile et sa lumière en route
  pr10: `<path ${plein} d="M29 3l3.200 7.800 8.300.700-6.300 5.500 1.900 8.200L29 20.800l-7.100 4.400 1.900-8.200-6.300-5.500 8.300-.700z"/>
    <path ${trait} d="M29 3l3.200 7.800 8.300.700-6.300 5.500 1.900 8.200L29 20.800l-7.100 4.400 1.900-8.200-6.300-5.500 8.300-.700zM3 41l12-12M3 31l6-6M13 41l6-6"/>`,

  // ---------------------------------------------- Physique-chimie 3ᵉ
  // De l'Univers aux atomes : un atome
  p01: `<circle ${plein} cx="22" cy="22" r="5.5"/>
    <ellipse ${trait} cx="22" cy="22" rx="19" ry="7.5"/><ellipse ${trait} cx="22" cy="22" rx="19" ry="7.5" transform="rotate(60 22 22)"/>
    <ellipse ${trait} cx="22" cy="22" rx="19" ry="7.5" transform="rotate(-60 22 22)"/><circle cx="41" cy="22" r="2.4" fill="currentColor"/>`,
  // Les ions : un atome perd un électron
  p02: `<circle ${plein} cx="17" cy="25" r="12"/>
    <circle ${trait} cx="17" cy="25" r="12"/><path ${trait} d="M17 19v12M11 25h12"/>
    <circle ${trait} cx="36" cy="8" r="5"/><path ${trait} d="M33.5 8h5M27 16l4-4"/>`,
  // Acides et bases : un bécher qui bouillonne
  p03: `<path ${plein} d="M9 22h26v14a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4z"/>
    <path ${trait} d="M6 8h3v28a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V8h3M9 22h26"/>
    <circle ${trait} cx="17" cy="15" r="2"/><circle ${trait} cx="25" cy="10" r="2.6"/><circle ${trait} cx="22" cy="30" r="1.8"/>`,
  // Masse volumique : un cube qui flotte
  p04: `<path ${plein} d="M3 26h38v14H3z"/>
    <path ${trait} d="M3 26h38"/><rect ${trait} x="14" y="12" width="16" height="16" rx="2"/>
    <path ${trait} d="M6 33c3-2 5 2 8 0M28 34c3-2 5 2 8 0" stroke-width="1.8"/>`,
  // Vitesse et mouvement : une chronophotographie qui accélère
  p05: `<circle ${plein} cx="36" cy="22" r="5"/>
    <path ${trait} d="M3 32h38"/><circle ${trait} cx="5" cy="22" r="2.4"/><circle ${trait} cx="11" cy="22" r="3"/>
    <circle ${trait} cx="20" cy="22" r="4"/><circle ${trait} cx="36" cy="22" r="5"/>`,
  // Les forces : une caisse tirée
  p06: `<rect ${plein} x="4" y="18" width="18" height="18" rx="2"/>
    <rect ${trait} x="4" y="18" width="18" height="18" rx="2"/><path ${trait} d="M2 36h40M13 27h26M33 21l6 6-6 6"/>
    <circle cx="13" cy="27" r="2.4" fill="currentColor"/>`,
  // Le poids : une pomme attirée par la Terre
  p07: `<path ${plein} d="M2 44a30 14 0 0 1 40 0z"/>
    <path ${trait} d="M2 44a30 14 0 0 1 40 0"/>
    <path ${trait} d="M22 7c-5-3-11 1-9 8 1 4 5 6 9 4 4 2 8 0 9-4 2-7-4-11-9-8zM22 7c0-2 1-4 3-5M22 22v8M18.5 26.5 22 30l3.5-3.5"/>`,
  // Conservation de l'énergie : une bille sur un grand huit
  p08: `<circle ${plein} cx="10" cy="11" r="5"/>
    <path ${trait} d="M3 16c6 0 8 22 19 22s12-14 19-14"/><circle ${trait} cx="10" cy="11" r="5"/>
    <path ${trait} d="M16 18l3 5" stroke-width="1.8"/>`,
  // Loi d'Ohm : un circuit et sa résistance
  p09: `<rect ${plein} x="14" y="4" width="16" height="9" rx="1.5"/>
    <path ${trait} d="M6 8.5h8M30 8.5h8v28H6v-28"/><rect ${trait} x="14" y="4" width="16" height="9" rx="1.5"/>
    <circle cx="14" cy="36.5" r="2.2" fill="currentColor"/><circle cx="26" cy="36.5" r="2.2" fill="currentColor"/><circle cx="38" cy="24" r="2.2" fill="currentColor"/>`,
  // Puissance et énergie électriques : une prise
  p10: `<circle ${plein} cx="22" cy="22" r="15"/>
    <circle ${trait} cx="22" cy="22" r="15"/><circle cx="16" cy="22" r="2.6" fill="currentColor"/><circle cx="28" cy="22" r="2.6" fill="currentColor"/>
    <path ${trait} d="M22 7v3M22 34v3"/>`,
  // Signaux : un éclair et l'onde du tonnerre
  p11: `<path ${plein} d="M12 3 5 18h6l-3 12 11-16h-7l4-11z"/>
    <path ${trait} d="M12 3 5 18h6l-3 12 11-16h-7l4-11z"/>
    <path ${trait} d="M26 20a8 8 0 0 1 0 12M31 16a14 14 0 0 1 0 20M36 12a20 20 0 0 1 0 28"/>`,

  // Calcul littéral : une lettre entre parenthèses
  c01: `<circle ${plein} cx="22" cy="22" r="10"/>
    <path ${trait} d="M11 8c-5 8-5 20 0 28M33 8c5 8 5 20 0 28M17 16l10 12M27 16L17 28"/>`,
  // Identités remarquables : le carré (a + b)² découpé
  c02: `<rect ${plein} x="6" y="6" width="20" height="20"/>
    <path ${trait} d="M6 6h32v32H6zM26 6v32M6 26h32"/>`,
  // Équations : une balance
  c03: `<rect ${plein} x="5" y="22" width="12" height="7" rx="2"/>
    <path ${trait} d="M22 8v28M14 38h16M8 12h28M8 12l-4 10h13zM36 12l-4 10h9z"/>
    <circle cx="22" cy="8" r="2.2" fill="currentColor"/>`,
  // Équations-produit : deux solutions, là où la courbe coupe l'axe
  c04: `<path ${plein} d="M12 30 C 15 42, 29 42, 32 30Z"/>
    <path ${trait} d="M4 30h36M8 14 C 14 46, 30 46, 36 14"/>
    <circle cx="12" cy="30" r="2.6" fill="currentColor"/><circle cx="32" cy="30" r="2.6" fill="currentColor"/>`,
  // Arithmétique : un arbre de facteurs premiers
  c05: `<circle ${plein} cx="10" cy="36" r="5"/><circle ${plein} cx="34" cy="36" r="5"/>
    <path ${trait} d="M22 10l-12 12M22 10l12 12M10 22v9M34 22l-6 9M34 22l6 9"/>
    <circle ${trait} cx="22" cy="8" r="4"/><circle ${trait} cx="10" cy="36" r="5"/><circle ${trait} cx="34" cy="36" r="5"/>`,
  // Puissances et racines : le radical et un exposant
  c06: `<rect ${plein} x="30" y="4" width="10" height="10" rx="2"/>
    <path ${trait} d="M4 26l5-3 7 15 8-30h14"/><path ${trait} d="M22 22h12M22 30h12"/>`,
  // Notion de fonction : une machine qui transforme un nombre
  c07: `<rect ${plein} x="13" y="11" width="18" height="22" rx="4"/>
    <path ${trait} d="M2 22h9M33 22h9M38 18l4 4-4 4"/><rect ${trait} x="13" y="11" width="18" height="22" rx="4"/>
    <path ${trait} d="M19 22h6"/>`,
  // Fonctions linéaires et affines : une droite et son ordonnée à l'origine
  c08: `<path ${plein} d="M8 28 L38 10 V36 H8Z" opacity=".9"/>
    <path ${trait} d="M8 4v32h32M4 30.4L40 8.8"/><circle cx="8" cy="28" r="3" fill="currentColor"/>`,
  // Variations : une courbe qui monte puis descend
  c09: `<circle ${plein} cx="18" cy="12" r="6"/>
    <path ${trait} d="M4 36 C 10 36, 12 12, 18 12 S 28 30, 34 26 S 40 18, 42 16"/>
    <path ${trait} d="M4 40h36"/>`,
  // Théorème de Thalès (3ᵉ) : la configuration « papillon »
  c10: `<path ${plein} d="M8 8 L20 8 L18.3 18.2Z"/>
    <path ${trait} d="M8 8h12M6 38h32M8 8 L38 38M20 8 L6 38"/>`,
  // Trigonométrie : triangle rectangle et angle marqué
  c11: `<path ${plein} d="M6 38 L38 38 L38 10Z"/>
    <path ${trait} d="M6 38 L38 38 L38 10Z M32 38v-6h6"/><path ${trait} d="M16 38a10 10 0 0 0-1.6-5.4"/>`,
  // Transformations : une figure et son image par symétrie axiale
  c12: `<path ${plein} d="M6 34 L18 34 L18 12Z"/>
    <path ${trait} d="M6 34 L18 34 L18 12Z M38 34 L26 34 L26 12Z"/><path ${trait} d="M22 4v36" stroke-dasharray="3 4"/>`,
  // Homothétie : un centre, une figure et son agrandissement
  c13: `<path ${plein} d="M14 30 L22 30 L18 22Z"/>
    <path ${trait} d="M4 40 L22 30 M4 40 L18 22 M22 30 L40 20 M18 22 L32 4"/>
    <path ${trait} d="M14 30 L22 30 L18 22Z M24 20 L40 20 L32 4Z"/><circle cx="4" cy="40" r="2.6" fill="currentColor"/>`,
  // Géométrie dans l'espace : un cube en perspective
  c14: `<rect ${plein} x="6" y="16" width="22" height="22"/>
    <path ${trait} d="M6 16h22v22H6zM6 16l10-10h22L28 16M38 6v22L28 38"/>`,
  // Statistiques : des barres et la moyenne
  c15: `<rect ${plein} x="12" y="14" width="8" height="24"/>
    <path ${trait} d="M4 38h36M6 38V26h6v12M12 38V14h8v24M20 38V20h8v18M28 38V30h8v8"/>
    <path ${trait} d="M4 22h36" stroke-dasharray="3 3"/>`,
  // Probabilités : deux dés
  c16: `<rect ${plein} x="4" y="14" width="20" height="20" rx="4" transform="rotate(-12 14 24)"/>
    <rect ${trait} x="4" y="14" width="20" height="20" rx="4" transform="rotate(-12 14 24)"/>
    <rect ${trait} x="22" y="8" width="17" height="17" rx="3.5" transform="rotate(10 30 16)"/>
    <circle cx="10" cy="21" r="1.7" fill="currentColor"/><circle cx="18" cy="27" r="1.7" fill="currentColor"/>
    <circle cx="30.5" cy="16.5" r="1.7" fill="currentColor"/>`,
  // Algorithmique : des blocs qui s'emboîtent
  c17: PICTOS.algo,

  // ------------------------------------------------------------------ 4ᵉ
  // Nombres relatifs : un négatif et un positif
  r02: `<circle ${plein} cx="29" cy="27" r="11"/>
    <circle ${trait} cx="15" cy="17" r="11"/><circle ${trait} cx="29" cy="27" r="11"/>
    <path ${trait} d="M10 17h10M24 27h10M29 22v10"/>`,
  // Opérations sur les fractions : deux fractions et un signe ×
  r03: `<rect ${plein} x="4" y="7" width="12" height="10" rx="2"/>
    <path ${trait} d="M3 22h14M27 22h14M18.5 18.5l7 7M25.5 18.5l-7 7"/>
    <rect ${trait} x="4" y="7" width="12" height="10" rx="2"/><rect ${trait} x="4" y="27" width="12" height="10" rx="2"/>
    <rect ${trait} x="28" y="7" width="12" height="10" rx="2"/><rect ${trait} x="28" y="27" width="12" height="10" rx="2"/>`,
  // Puissances : des carrés qui doublent
  r08: `<rect ${plein} x="20" y="16" width="20" height="20"/>
    <path ${trait} d="M4 36h36M4 36v-5h5v5M10 36V26h10v10M20 36V16h20v20"/>`,
  // Calcul littéral : la distributivité, k(a + b)
  r06: `<circle ${plein} cx="6" cy="30" r="4.5"/>
    <path ${trait} d="M6 25 C 8 13, 18 13, 20 24M6 25 C 10 5, 32 5, 34 24"/>
    <path ${trait} d="M13 22c-3 5-3 11 0 16M41 22c3 5 3 11 0 16M24 30h6M27 27v6"/>
    <circle cx="19" cy="30" r="2.6" fill="currentColor"/><circle cx="35" cy="30" r="2.6" fill="currentColor"/>`,
  // Équations : une inconnue à trouver
  r07: `<rect ${plein} x="4" y="12" width="18" height="20" rx="4"/>
    <rect ${trait} x="4" y="12" width="18" height="20" rx="4"/><path ${trait} d="M28 18h12M28 26h12"/>
    <path ${trait} d="M9.5 18.5c0-3 7-3 7 0 0 2.5-3.5 2.5-3.5 5.5"/><circle cx="13" cy="28" r="1.6" fill="currentColor"/>`,
  // Divisibilité et nombres premiers : le crible
  r15: `<circle ${plein} cx="22" cy="8" r="4.5"/><circle ${plein} cx="8" cy="22" r="4.5"/><circle ${plein} cx="36" cy="36" r="4.5"/>
    <circle ${trait} cx="8" cy="8" r="4.5"/><circle ${trait} cx="22" cy="8" r="4.5"/><circle ${trait} cx="36" cy="8" r="4.5"/>
    <circle ${trait} cx="8" cy="22" r="4.5"/><circle ${trait} cx="22" cy="22" r="4.5"/><circle ${trait} cx="36" cy="22" r="4.5"/>
    <circle ${trait} cx="8" cy="36" r="4.5"/><circle ${trait} cx="22" cy="36" r="4.5"/><circle ${trait} cx="36" cy="36" r="4.5"/>
    <path ${trait} d="M5 11l6-6M33 11l6-6M19 25l6-6M5 39l6-6M19 39l6-6"/>`,
  // Proportionnalité : un tableau et son coefficient
  r04: `<rect ${plein} x="4" y="8" width="10" height="24"/>
    <path ${trait} d="M4 8h28v24H4zM4 20h28M14 8v24M23 8v24"/>
    <path ${trait} d="M39 10v18M36 25l3 3.5 3-3.5"/>`,
  // Vitesses : un compteur
  r16: `<path ${plein} d="M22 28 L10 16 A17 17 0 0 1 22 11Z"/>
    <path ${trait} d="M6 34a17 17 0 1 1 32 0M22 28l9-11M9 28h3M32 28h3M22 11v3"/>
    <circle cx="22" cy="28" r="3" fill="currentColor"/>`,
  // Théorème de Pythagore : les carrés construits sur les côtés
  r01: `<path ${plein} d="M12 19 L24 28 L33 16 L21 7Z"/>
    <path ${trait} d="M12 19 L24 28 L33 16 L21 7Z M12 28h12v12H12zM12 19H3v9h9M12 19v9"/>
    <path ${trait} d="M12 25h3v3" stroke-width="1.6"/>`,
  // Cosinus : le côté adjacent à l'angle
  r05: `<rect ${plein} x="6" y="34" width="32" height="6" rx="2"/>
    <path ${trait} d="M6 36 L38 36 L38 8Z M32 36v-6h6"/><path ${trait} d="M17 36a11 11 0 0 0-2.4-6.8"/>`,
  // Théorème de Thalès (4ᵉ) : deux triangles emboîtés
  r13: `<path ${plein} d="M6 38 L22 38 L6 18Z"/>
    <path ${trait} d="M6 38 L38 38 L6 6Z M22 38 L6 18"/>`,
  // Translation et symétries : une figure glisse le long d'un vecteur
  r11: `<path ${plein} d="M24 36 L38 36 L31 22Z"/>
    <path ${trait} d="M4 22 L18 22 L11 8Z M24 36 L38 36 L31 22Z M12 16 L28 30M22 30h6v-6"/>`,
  // Rotation : une figure tourne autour d'un centre
  r14: `<path ${plein} d="M10 22 L10 6 L18 14Z"/>
    <path ${trait} d="M10 22 L10 6 L18 14Z M22 34 L38 34 L30 26Z"/>
    <path ${trait} d="M29 22 A20 20 0 0 0 20 13.5M20 13.5l4.2-.4M20 13.5l1.4 3.8"/>
    <circle cx="10" cy="34" r="3" fill="currentColor"/>`,
  // Aires, périmètres et volumes : un cylindre
  r12: `<ellipse ${plein} cx="22" cy="10" rx="14" ry="5"/>
    <ellipse ${trait} cx="22" cy="10" rx="14" ry="5"/><path ${trait} d="M8 10v24c0 3 6 5 14 5s14-2 14-5V10"/>`,
  // Pyramides et cônes : un cône et sa hauteur
  r17: `<ellipse ${plein} cx="22" cy="35" rx="15" ry="5"/>
    <ellipse ${trait} cx="22" cy="35" rx="15" ry="5"/><path ${trait} d="M7 35 L22 5 L37 35"/>
    <path ${trait} d="M22 5v30" stroke-dasharray="3 3"/>`,
  // Statistiques : une série rangée et sa médiane
  r09: `<path ${plein} d="M22 30 L17 38 H27Z"/>
    <path ${trait} d="M3 24h38"/>
    <circle cx="6" cy="24" r="2.6" fill="currentColor"/><circle cx="13" cy="24" r="2.6" fill="currentColor"/>
    <circle cx="22" cy="24" r="3.4" fill="currentColor"/><circle cx="31" cy="24" r="2.6" fill="currentColor"/><circle cx="38" cy="24" r="2.6" fill="currentColor"/>
    <path ${trait} d="M22 8v10"/>`,
  // Probabilités : une urne et ses boules
  r10: `<circle ${plein} cx="17" cy="28" r="5"/>
    <path ${trait} d="M14 6h16M16 6v6C8 15 6 22 6 28c0 7 7 11 16 11s16-4 16-11c0-6-2-13-10-16V6"/>
    <circle ${trait} cx="17" cy="28" r="5"/><circle ${trait} cx="28" cy="30" r="4"/><circle ${trait} cx="24" cy="21" r="3.5"/>`,
  // Algorithmique (Scratch) : une boucle « répéter »
  r18: `<path ${plein} d="M6 6h32v8H16v10h22v8H6z"/>
    <path ${trait} d="M6 6h32v8H16v10h22v8H6z"/><path ${trait} d="M21 19h12M26 36h8"/>`,

  // ------------------------------------------------------------------ 5ᵉ
  // Priorités opératoires : ce qu'on calcule d'abord
  v01: `<rect ${plein} x="16" y="6" width="12" height="10" rx="2"/>
    <path ${trait} d="M12 6c-4 4-4 6 0 10M32 6c4 4 4 6 0 10"/><rect ${trait} x="16" y="6" width="12" height="10" rx="2"/>
    <path ${trait} d="M22 19v5M18 21l4 4 4-4"/><rect ${trait} x="8" y="28" width="28" height="10" rx="2"/>`,
  // Nombres relatifs : la droite graduée et le zéro
  v02: `<path ${plein} d="M8 34h14v5H8z"/>
    <path ${trait} d="M3 34h38M8 31v6M15 31v6M29 31v6M36 31v6M22 28v12"/>
    <path ${trait} d="M36 26 C 32 10, 14 10, 9 24M8 20l1 4 4-1.5"/>`,
  // Fractions : une part d'un disque
  v03: `<path ${plein} d="M22 22 L22 5 A17 17 0 0 1 38.2 27.3Z"/>
    <circle ${trait} cx="22" cy="22" r="17"/><path ${trait} d="M22 22V5M22 22l16.2 5.3M22 22 7.1 30.2"/>`,
  // Carrés et cubes
  v04: `<rect ${plein} x="4" y="20" width="16" height="16"/>
    <rect ${trait} x="4" y="20" width="16" height="16"/>
    <path ${trait} d="M24 18h14v14H24zM24 18l5-6h14l-5 6M43 12v14l-5 6"/>`,
  // Calcul littéral : on remplace la lettre par un nombre
  v05: `<rect ${plein} x="26" y="13" width="15" height="18" rx="3"/>
    <path ${trait} d="M4 14l10 14M14 14 4 28M17 22h6M20 18.5 23.5 22 20 25.5"/><rect ${trait} x="26" y="13" width="15" height="18" rx="3"/>`,
  // Proportionnalité et pourcentages
  v06: `<circle ${plein} cx="12" cy="12" r="6"/>
    <circle ${trait} cx="12" cy="12" r="6"/><circle ${trait} cx="32" cy="32" r="6"/><path ${trait} d="M36 6 8 38"/>`,
  // Dépendance entre deux grandeurs : un nuage de points qui monte
  v07: `<circle ${plein} cx="31" cy="14" r="4"/>
    <path ${trait} d="M6 4v32h34"/>
    <circle cx="13" cy="30" r="2.6" fill="currentColor"/><circle cx="19" cy="25" r="2.6" fill="currentColor"/>
    <circle cx="25" cy="20" r="2.6" fill="currentColor"/><circle ${trait} cx="31" cy="14" r="4"/>`,
  // Repérage : un point sur un quadrillage
  v08: `<path ${plein} d="M28 24c-5-6-7-9-7-12a7 7 0 0 1 14 0c0 3-2 6-7 12z"/>
    <path ${trait} d="M4 40V8M4 40h34M4 30h34M4 20h14M14 8v32M24 30v10M34 30v10"/>
    <path ${trait} d="M28 24c-5-6-7-9-7-12a7 7 0 0 1 14 0c0 3-2 6-7 12z"/><circle cx="28" cy="12" r="2" fill="currentColor"/>`,
  // Angles et parallélisme : deux parallèles et une sécante
  v09: `<path ${plein} d="M18 14 L26 14 A8 8 0 0 0 21.5 7Z"/>
    <path ${trait} d="M4 14h36M4 32h36M26 2 12 44"/><path ${trait} d="M20 32h8a8 8 0 0 0-4.5-7"/>`,
  // Triangles : côtés codés
  v10: `<path ${plein} d="M22 6 L38 36 L6 36Z" opacity=".9"/>
    <path ${trait} d="M22 6 L38 36 L6 36Z M11 20l5 2.5M28 22.5l5-2.5M22 32v8"/>`,
  // Parallélogrammes : les diagonales se coupent en leur milieu
  v11: `<path ${plein} d="M12 10 H40 L32 34 H4Z"/>
    <path ${trait} d="M12 10 H40 L32 34 H4Z M12 10 L32 34M40 10 L4 34"/><circle cx="22" cy="22" r="2.4" fill="currentColor"/>`,
  // Symétrie centrale : un demi-tour autour d'un point
  v12: `<path ${plein} d="M6 6 L18 6 L6 18Z"/>
    <path ${trait} d="M6 6 L18 6 L6 18Z M38 38 L26 38 L38 26Z"/>
    <path ${trait} d="M6 6 L38 38M18 6 L26 38M6 18 L38 26" stroke-width="1.6" stroke-dasharray="2.5 3"/>
    <circle cx="22" cy="22" r="3" fill="currentColor"/>`,
  // Solides : le patron d'un cube
  v13: `<rect ${plein} x="16" y="16" width="10" height="10"/>
    <path ${trait} d="M16 4h10v36H16zM6 16h30v10H6zM16 16h10M16 26h10M16 30h10"/>`,
  // Aires et volumes : compter les carreaux
  v14: `<path ${plein} d="M6 22h20v16H6z"/>
    <path ${trait} d="M6 6h32v32H6zM6 14h32M6 22h32M6 30h32M14 6v32M22 6v32M30 6v32"/>`,
  // Statistiques : des effectifs en barres
  v15: `<rect ${plein} x="6" y="16" width="26" height="7"/>
    <path ${trait} d="M6 4v36M6 7h16v6H6M6 16h26v7H6M6 26h32v6H6M6 35h10"/>`,
  // Premières probabilités : une roue de loterie
  v16: `<path ${plein} d="M22 24 L22 9 A15 15 0 0 1 35 31.5Z"/>
    <circle ${trait} cx="22" cy="24" r="15"/><path ${trait} d="M22 9v15l13 7.5M22 24 9 31.5"/>
    <path d="M18 1h8l-4 6z" fill="currentColor"/><circle cx="22" cy="24" r="2.6" fill="currentColor"/>`,
  // Programmation par blocs : le drapeau vert et un bloc
  v17: `<path ${plein} d="M10 6c6-3 10 3 16 0v12c-6 3-10-3-16 0z"/>
    <path ${trait} d="M10 26V4M10 6c6-3 10 3 16 0v12c-6 3-10-3-16 0"/>
    <path ${trait} d="M4 30h14l2 3h4l2-3h14v8H4z"/>`,
};

/** Dessin d'un thème, prêt à insérer. */
export function pictoTheme(themeId, classe = 'picto') {
  const d = PICTOS[themeId] || PICTOS.nombres_calculs;
  return `<svg class="${classe}" viewBox="0 0 44 44" aria-hidden="true">${d}</svg>`;
}

/** Dessin d'un chapitre (le sien s'il existe, sinon celui de son thème). */
export function pictoChapitre(c, classe = 'picto') {
  const d = PICTOS_CHAP[c.id];
  return d ? `<svg class="${classe}" viewBox="0 0 44 44" aria-hidden="true">${d}</svg>` : pictoTheme(c.theme, classe);
}

/** Icônes d'interface (viewBox 24 × 24, trait). */
const UI = {
  livre: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  tableau: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  compte: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  reglages: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  retour: '<path d="M15 5l-7 7 7 7"/>',
  fleche: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  revision: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>',
  examen: '<path d="M8 3h8l4 4v14H4V3zM8 11h8M8 15h8M8 7h3"/>',
  brevet: '<path d="M12 3 2 8l10 5 10-5zM6 10v5c0 2 3 4 6 4s6-2 6-4v-5M22 8v6"/>',
  fiche: '<path d="M6 9V3h12v6M6 17H4v-8h16v8h-2M6 14h12v7H6z"/>',
  signet: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  eclair: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  pile: '<path d="M4 5h16v4H4zM4 11h16v4H4zM4 17h16v4H4z"/>',
  son: '<path d="M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  ampoule: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.6.5-1 1.2-1 2.1H9.5c0-.9-.4-1.6-1-2.1A6 6 0 0 1 12 3z"/>',
  medaille: '<circle cx="12" cy="15" r="6"/><path d="M8.5 10 5 3h5l2 4 2-4h5l-3.5 7"/>',
  cadenas: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  flamme: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z"/>',
};

export function icone(nom, taille = 20) {
  return `<svg class="ico" width="${taille}" height="${taille}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${UI[nom] || ''}</svg>`;
}

/** Vague qui ferme les en-têtes colorés (« affiches »). */
export const VAGUE = `<svg class="vague" viewBox="0 0 390 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 C 60 0, 120 34, 195 18 S 330 4, 390 22 V34 H0Z"/></svg>`;

/** Illustration animée de l'accueil de maths : un compas trace un cercle autour d'un triangle. */
export const ILLU_MATHS = `
<svg class="illu" viewBox="0 0 220 220" aria-hidden="true">
  <circle class="illu-trace" cx="110" cy="110" r="84" pathLength="100" transform="rotate(-90 110 110)"/>
  <path class="illu-tri" d="M110 26 L183 152 L37 152 Z"/>
  <circle class="illu-point" cx="110" cy="26" r="7"/>
  <circle class="illu-point" cx="183" cy="152" r="7"/>
  <circle class="illu-point" cx="37" cy="152" r="7"/>
  <circle class="illu-centre" cx="110" cy="110" r="10"/>
  <g class="illu-compas"><path d="M110 110 L110 26"/><circle cx="110" cy="26" r="4"/></g>
</svg>`;

/** Illustration animée de l'accueil de physique-chimie : un atome, ses électrons en orbite. */
export const ILLU_PHYSIQUE = `
<svg class="illu illu-atome" viewBox="0 0 220 220" aria-hidden="true">
  <g class="illu-orbite-g illu-o1"><ellipse class="illu-orbite" cx="110" cy="110" rx="96" ry="34"/><circle class="illu-e" cx="206" cy="110" r="7"/></g>
  <g class="illu-orbite-g illu-o2"><ellipse class="illu-orbite" cx="110" cy="110" rx="96" ry="34" transform="rotate(60 110 110)"/><circle class="illu-e" cx="62" cy="193" r="7"/></g>
  <g class="illu-orbite-g illu-o3"><ellipse class="illu-orbite" cx="110" cy="110" rx="96" ry="34" transform="rotate(-60 110 110)"/><circle class="illu-e" cx="62" cy="27" r="7"/></g>
  <circle class="illu-noyau" cx="104" cy="106" r="9"/><circle class="illu-noyau illu-noyau-b" cx="116" cy="106" r="9"/><circle class="illu-noyau" cx="110" cy="116" r="9"/>
</svg>`;

/** Illustration animée de l'accueil de SVT : une double hélice d'ADN qui tourne sur elle-même. */
export const ILLU_SVT = `
<svg class="illu illu-adn" viewBox="0 0 220 220" aria-hidden="true">${Array.from({ length: 12 }, (_, k) => {
  const y = 22 + k * 16, c = Math.round(Math.cos((k * Math.PI) / 5.5) * 100) / 100;
  // La position au repos (transform) sert d'image fixe quand les animations sont coupées.
  return `<g class="illu-barreau" style="transform:scaleX(${c});animation-delay:${(-((k / 11) % 1) * 3.6).toFixed(2)}s"><line x1="60" y1="${y}" x2="160" y2="${y}"/><circle class="illu-b1" cx="60" cy="${y}" r="6.5"/><circle class="illu-b2" cx="160" cy="${y}" r="6.5"/></g>`;
}).join('')}
</svg>`;

/** Illustration de l'accueil de chaque matière. */
export const ILLUS = { maths: ILLU_MATHS, physique: ILLU_PHYSIQUE, svt: ILLU_SVT };
