// =====================================================================
//  programme.js — Registre des niveaux, thèmes et chapitres (5ᵉ → 3ᵉ)
//
//  - Les chapitres sont classés par NIVEAU puis par THÈME, dans un ordre
//    logique de progression (l'ordre du tableau fait foi).
//  - `module: null` = chapitre prévu mais pas encore rédigé (« Bientôt »).
//  - Les identifiants ne changent jamais (ils servent de clé à la progression
//    sauvegardée) : c = 3ᵉ, r = 4ᵉ (anciens « rappels »), v = 5ᵉ (V romain).
//  - Programmes : 3ᵉ et 4ᵉ suivent le programme de cycle 4 actuel ; la 5ᵉ suit
//    le nouveau programme (BO n°10 du 5 mars 2026, en vigueur en 5ᵉ depuis
//    la rentrée 2026).
// =====================================================================

export const NIVEAUX = [
  { id: '5e', label: '5ᵉ', long: 'Cinquième' },
  { id: '4e', label: '4ᵉ', long: 'Quatrième' },
  { id: '3e', label: '3ᵉ', long: 'Troisième' },
];

/**
 * Matières. `niveaux` : niveaux déjà rédigés (les autres s'affichent « bientôt »).
 * Identifiants de physique-chimie : p (3ᵉ), pr (4ᵉ), pv (5ᵉ).
 */
export const MATIERES = [
  { id: 'maths',    label: 'Maths',           niveaux: ['5e', '4e', '3e'] },
  { id: 'physique', label: 'Physique-chimie', niveaux: ['5e', '4e', '3e'] },
];

export const THEMES = [
  { id: 'nombres_calculs', matiere: 'maths', label: 'Nombres et calculs',             icone: '🔢' },
  { id: 'fonctions',       matiere: 'maths', label: 'Proportionnalité et fonctions',  icone: '📈' },
  { id: 'geometrie',       matiere: 'maths', label: 'Géométrie et grandeurs',         icone: '📐' },
  { id: 'donnees',         matiere: 'maths', label: 'Données et probabilités',        icone: '📊' },
  { id: 'algo',            matiere: 'maths', label: 'Algorithmique et programmation', icone: '💻' },
  // Physique-chimie : les quatre thèmes du programme de cycle 4
  { id: 'pc_matiere',   matiere: 'physique', label: 'Organisation et transformations de la matière', icone: '⚗️' },
  { id: 'pc_mouvement', matiere: 'physique', label: 'Mouvement et interactions',                     icone: '🚀' },
  { id: 'pc_energie',   matiere: 'physique', label: "L'énergie et ses conversions",                  icone: '⚡' },
  { id: 'pc_signaux',   matiere: 'physique', label: 'Des signaux pour observer et communiquer',      icone: '📡' },
];

const matiereDuTheme = (theme) => (THEMES.find((t) => t.id === theme) || {}).matiere || 'maths';

const ch = (niveau, id, titre, theme, icone, fichier) => ({
  id, niveau, titre, theme, icone, matiere: matiereDuTheme(theme),
  module: fichier ? `./chapters/${matiereDuTheme(theme) === 'maths' ? '' : 'physique/'}${niveau}/${fichier}` : null,
});

export const CHAPTERS = [
  // ------------------------------------------------------------------ 5ᵉ
  // Nouveau programme 2026.
  ch('5e', 'v01', 'Priorités opératoires et enchaînements de calculs', 'nombres_calculs', '🧮', 'v01_priorites.js'),
  ch('5e', 'v02', 'Nombres relatifs : repérage, addition, soustraction', 'nombres_calculs', '➕', 'v02_relatifs.js'),
  ch('5e', 'v03', 'Fractions : comparer, additionner, soustraire', 'nombres_calculs', '🍰', 'v03_fractions.js'),
  ch('5e', 'v04', 'Carrés et cubes', 'nombres_calculs', '²', 'v04_carres_cubes.js'),
  ch('5e', 'v05', 'Calcul littéral : formules, substitution, équations simples', 'nombres_calculs', '✏️', 'v05_calcul_litteral.js'),
  ch('5e', 'v06', 'Proportionnalité et pourcentages', 'fonctions', '⚖️', 'v06_proportionnalite.js'),
  ch('5e', 'v07', 'Dépendance entre deux grandeurs', 'fonctions', '📈', 'v07_grandeurs.js'),
  ch('5e', 'v08', 'Repérage sur une droite et dans le plan', 'geometrie', '📍', 'v08_reperage.js'),
  ch('5e', 'v09', 'Angles et parallélisme', 'geometrie', '📏', 'v09_angles.js'),
  ch('5e', 'v10', 'Triangles', 'geometrie', '🔺', 'v10_triangles.js'),
  ch('5e', 'v11', 'Parallélogrammes', 'geometrie', '▱', 'v11_parallelogrammes.js'),
  ch('5e', 'v12', 'Symétrie centrale', 'geometrie', '🔄', 'v12_symetrie_centrale.js'),
  ch('5e', 'v13', 'Solides : patrons et perspective', 'geometrie', '🧊', 'v13_solides.js'),
  ch('5e', 'v14', 'Aires et volumes', 'geometrie', '📦', 'v14_aires_volumes.js'),
  ch('5e', 'v15', 'Statistiques : effectifs, fréquences, moyenne', 'donnees', '📊', 'v15_statistiques.js'),
  ch('5e', 'v16', 'Premières probabilités', 'donnees', '🎲', 'v16_probabilites.js'),
  ch('5e', 'v17', 'Programmation par blocs', 'algo', '💻', 'v17_programmation.js'),

  // ------------------------------------------------------------------ 4ᵉ
  ch('4e', 'r02', 'Nombres relatifs', 'nombres_calculs', '➕', 'r02_nombres_relatifs.js'),
  ch('4e', 'r03', 'Opérations sur les fractions', 'nombres_calculs', '🍰', 'r03_fractions.js'),
  ch('4e', 'r08', 'Puissances', 'nombres_calculs', '²', 'r08_puissances.js'),
  ch('4e', 'r06', 'Calcul littéral', 'nombres_calculs', '✖️', 'r06_calcul_litteral.js'),
  ch('4e', 'r07', 'Équations', 'nombres_calculs', '⚖️', 'r07_equations.js'),
  ch('4e', 'r15', 'Divisibilité et nombres premiers', 'nombres_calculs', '🧮', 'r15_nombres_premiers.js'),
  ch('4e', 'r04', 'Proportionnalité', 'fonctions', '⚖️', 'r04_proportionnalite.js'),
  ch('4e', 'r16', 'Vitesses et grandeurs composées', 'fonctions', '🚲', 'r16_vitesses.js'),
  ch('4e', 'r01', 'Théorème de Pythagore', 'geometrie', '📐', 'r01_pythagore.js'),
  ch('4e', 'r05', 'Cosinus dans le triangle rectangle', 'geometrie', '📐', 'r05_cosinus.js'),
  ch('4e', 'r13', 'Théorème de Thalès (triangles emboîtés)', 'geometrie', '📐', 'r13_thales.js'),
  ch('4e', 'r11', 'Translation et symétries', 'geometrie', '🔄', 'r11_transformations.js'),
  ch('4e', 'r14', 'Rotation', 'geometrie', '🔃', 'r14_rotation.js'),
  ch('4e', 'r12', 'Aires, périmètres et volumes', 'geometrie', '📦', 'r12_aires_volumes.js'),
  ch('4e', 'r17', 'Pyramides et cônes', 'geometrie', '🔻', 'r17_pyramides_cones.js'),
  ch('4e', 'r09', 'Statistiques', 'donnees', '📊', 'r09_statistiques.js'),
  ch('4e', 'r10', 'Probabilités', 'donnees', '🎲', 'r10_probabilites.js'),
  ch('4e', 'r18', 'Algorithmique (Scratch)', 'algo', '💻', 'r18_scratch.js'),

  // ------------------------------------------------------------------ 3ᵉ
  ch('3e', 'c01', 'Calcul littéral', 'nombres_calculs', '🔢', 'c01_calcul_litteral.js'),
  ch('3e', 'c02', 'Identités remarquables', 'nombres_calculs', '🟰', 'c02_identites_remarquables.js'),
  ch('3e', 'c03', 'Équations du 1er degré', 'nombres_calculs', '⚖️', 'c03_equations_1er_degre.js'),
  ch('3e', 'c04', 'Équations-produit', 'nombres_calculs', '✖️', 'c04_equations_produit.js'),
  ch('3e', 'c05', 'Arithmétique', 'nombres_calculs', '🧮', 'c05_arithmetique.js'),
  ch('3e', 'c06', 'Puissances et racines', 'nombres_calculs', '√', 'c06_puissances_racines.js'),
  ch('3e', 'c07', 'Notion de fonction', 'fonctions', '📈', 'c07_notion_de_fonction.js'),
  ch('3e', 'c08', 'Fonctions linéaires & affines', 'fonctions', '📉', 'c08_fonctions_lineaires_affines.js'),
  ch('3e', 'c09', 'Sens de variation', 'fonctions', '〽️', 'c09_variations_lecture_graphique.js'),
  ch('3e', 'c10', 'Théorème de Thalès', 'geometrie', '📐', 'c10_thales.js'),
  ch('3e', 'c11', 'Trigonométrie', 'geometrie', '🔺', 'c11_trigonometrie.js'),
  ch('3e', 'c12', 'Transformations du plan', 'geometrie', '🔄', 'c12_transformations_plan.js'),
  ch('3e', 'c13', 'Homothétie', 'geometrie', '🔎', 'c13_homothetie.js'),
  ch('3e', 'c14', 'Géométrie dans l\'espace', 'geometrie', '🧊', 'c14_geometrie_espace.js'),
  ch('3e', 'c15', 'Statistiques', 'donnees', '📊', 'c15_statistiques.js'),
  ch('3e', 'c16', 'Probabilités', 'donnees', '🎲', 'c16_probabilites.js'),
  ch('3e', 'c17', 'Algorithmique', 'algo', '💻', 'c17_algorithmique.js'),

  // ====================================================== Physique-chimie
  // 5ᵉ (identifiants pv, comme le « v » des maths de 5ᵉ).
  ch('5e', 'pv01', 'Les états de la matière', 'pc_matiere', '🧊', 'pv01_etats_matiere.js'),
  ch('5e', 'pv02', "Les changements d'état", 'pc_matiere', '🌡️', 'pv02_changements_etat.js'),
  ch('5e', 'pv03', 'Masse et volume', 'pc_matiere', '⚖️', 'pv03_masse_volume.js'),
  ch('5e', 'pv04', 'Mélanges et solutions', 'pc_matiere', '🥤', 'pv04_melanges.js'),
  ch('5e', 'pv05', 'Décrire un mouvement', 'pc_mouvement', '🏃', 'pv05_mouvement.js'),
  ch('5e', 'pv06', "Les sources d'énergie", 'pc_energie', '🔋', 'pv06_energie.js'),
  ch('5e', 'pv07', 'Le circuit électrique', 'pc_energie', '💡', 'pv07_circuit.js'),
  ch('5e', 'pv08', 'Circuits en série et en dérivation', 'pc_energie', '🎄', 'pv08_serie_derivation.js'),
  ch('5e', 'pv09', 'La lumière', 'pc_signaux', '🔦', 'pv09_lumiere.js'),

  // 4ᵉ (identifiants pr, comme le « r » des maths de 4ᵉ).
  ch('4e', 'pr01', "L'air et les molécules", 'pc_matiere', '🫧', 'pr01_air_molecules.js'),
  ch('4e', 'pr02', 'Les transformations chimiques', 'pc_matiere', '⚗️', 'pr02_transformations.js'),
  ch('4e', 'pr03', 'Les combustions', 'pc_matiere', '🔥', 'pr03_combustions.js'),
  ch('4e', 'pr04', 'Atomes et équations de réaction', 'pc_matiere', '🧮', 'pr04_equations.js'),
  ch('4e', 'pr05', 'Mouvement et vitesse', 'pc_mouvement', '🚄', 'pr05_mouvement_vitesse.js'),
  ch('4e', 'pr06', 'Actions mécaniques et interactions', 'pc_mouvement', '🤝', 'pr06_interactions.js'),
  ch('4e', 'pr07', 'Intensité et tension', 'pc_energie', '🔋', 'pr07_intensite_tension.js'),
  ch('4e', 'pr08', "L'énergie et ses conversions", 'pc_energie', '⚡', 'pr08_energie_conversions.js'),
  ch('4e', 'pr09', 'Le son', 'pc_signaux', '🔊', 'pr09_son.js'),
  ch('4e', 'pr10', 'La lumière : vitesse et distances', 'pc_signaux', '🌠', 'pr10_lumiere_vitesse.js'),

  // 3ᵉ : programme de cycle 4 (BO n°31 du 30 juillet 2020), découpage calé
  // sur le manuel LeLivreScolaire utilisé en classe.
  ch('3e', 'p01', "De l'Univers aux atomes", 'pc_matiere', '⚛️', 'p01_univers_atomes.js'),
  ch('3e', 'p02', 'Les ions dans notre quotidien', 'pc_matiere', '🧪', 'p02_ions.js'),
  ch('3e', 'p03', 'Quand les acides et les bases réagissent', 'pc_matiere', '🧫', 'p03_acides_bases.js'),
  ch('3e', 'p04', 'La masse volumique', 'pc_matiere', '🧊', 'p04_masse_volumique.js'),
  ch('3e', 'p05', 'Vitesse et mouvement', 'pc_mouvement', '🏃', 'p05_vitesse_mouvement.js'),
  ch('3e', 'p06', 'Les forces', 'pc_mouvement', '➡️', 'p06_forces.js'),
  ch('3e', 'p07', 'Le poids', 'pc_mouvement', '🌍', 'p07_poids.js'),
  ch('3e', 'p08', "La conservation de l'énergie", 'pc_energie', '🎢', 'p08_energie.js'),
  ch('3e', 'p09', "Résistance et loi d'Ohm", 'pc_energie', '💡', 'p09_loi_ohm.js'),
  ch('3e', 'p10', 'Puissance et énergie électriques', 'pc_energie', '🔌', 'p10_puissance_energie.js'),
  ch('3e', 'p11', 'Signaux sonores et lumineux', 'pc_signaux', '🔊', 'p11_signaux.js'),
];

// Numérotation « Chapitre n » à l'intérieur de chaque niveau, matière par matière.
NIVEAUX.forEach((n) => MATIERES.forEach((m) => CHAPTERS.filter((c) => c.niveau === n.id && c.matiere === m.id).forEach((c, i) => { c.num = i + 1; })));

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id);
export const themeById = (id) => THEMES.find((t) => t.id === id);
export const niveauById = (id) => NIVEAUX.find((n) => n.id === id);
export const matiereById = (id) => MATIERES.find((m) => m.id === id) || MATIERES[0];
export const themesOf = (matiere) => THEMES.filter((t) => t.matiere === matiere);
/** Chapitres d'un niveau (d'un thème, ou d'une matière : les maths par défaut). */
export const chaptersOf = (niveau, theme, matiere = 'maths') =>
  CHAPTERS.filter((c) => c.niveau === niveau && (theme ? c.theme === theme : c.matiere === matiere));
