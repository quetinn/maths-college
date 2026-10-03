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
 * Matières. Ajouter une matière = ajouter une ligne ici, ses thèmes, ses
 * chapitres (dossier js/chapters/<dossier>) et sa couleur dans style.css
 * ([data-matiere="<id>"]). Les maths gardent les adresses historiques
 * (#/niveau/3e) ; les autres matières ont les leurs (#/svt/niveau/3e).
 *  - `nom`     : le nom dans une phrase (« examen blanc de … ») ;
 *  - `dossier` : sous-dossier de js/chapters/ ;
 *  - `couleur` : barre du navigateur [mode clair, mode sombre] ;
 *  - `niveaux` : niveaux déjà rédigés (les autres s'affichent « bientôt ») ;
 *  - `brevet`  : épreuve proposée ('maths', 'sciences') ou null.
 * Identifiants des chapitres : c/r/v (maths 3ᵉ/4ᵉ/5ᵉ), p/pr/pv (physique-chimie),
 * s/sr/sv (SVT), t (technologie 3ᵉ).
 */
export const MATIERES = [
  { id: 'maths',    label: 'Maths',           nom: 'maths',           dossier: '',          couleur: ['#0f7b5a', '#0b3d2e'], niveaux: ['5e', '4e', '3e'], brevet: 'maths' },
  { id: 'physique', label: 'Physique-chimie', nom: 'physique-chimie', dossier: 'physique/', couleur: ['#2238d6', '#1a2690'], niveaux: ['5e', '4e', '3e'], brevet: 'sciences' },
  { id: 'svt',      label: 'SVT',             nom: 'SVT',             dossier: 'svt/',      couleur: ['#b5432b', '#7d2a19'], niveaux: ['5e', '4e', '3e'], brevet: 'sciences' },
  { id: 'techno',   label: 'Technologie',     nom: 'technologie',     dossier: 'techno/',   couleur: ['#6b3fa0', '#3f2466'], niveaux: ['3e'], brevet: 'sciences' },
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
  // SVT : les trois thèmes du programme de cycle 4
  { id: 'svt_terre',  matiere: 'svt', label: "La planète Terre, l'environnement et l'action humaine", icone: '🌍' },
  { id: 'svt_vivant', matiere: 'svt', label: 'Le vivant et son évolution',                           icone: '🧬' },
  { id: 'svt_corps',  matiere: 'svt', label: 'Le corps humain et la santé',                          icone: '🫀' },
  // Technologie : les trois thèmes du programme de cycle 4 (BO n° 9 du 29 février 2024)
  { id: 'tk_usages',    matiere: 'techno', label: 'Les objets techniques, leurs usages et la société', icone: '🌐' },
  { id: 'tk_structure', matiere: 'techno', label: 'Structure, fonctionnement, comportement',           icone: '⚙️' },
  { id: 'tk_creation',  matiere: 'techno', label: 'Création, conception, réalisation',                 icone: '🛠️' },
];

const matiereDuTheme = (theme) => (THEMES.find((t) => t.id === theme) || {}).matiere || 'maths';

const ch = (niveau, id, titre, theme, icone, fichier) => ({
  id, niveau, titre, theme, icone, matiere: matiereDuTheme(theme),
  module: fichier ? `./chapters/${MATIERES.find((m) => m.id === matiereDuTheme(theme)).dossier}${niveau}/${fichier}` : null,
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
  ch('4e', 'r18', 'Puissances de 10 et notation scientifique', 'nombres_calculs', '🔟', 'r18_notation_scientifique.js'),
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
  ch('5e', 'pv10', "L'eau que nous buvons est-elle pure ?", 'pc_matiere', '🚰', 'pv10_eau.js'),
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
  ch('4e', 'pr11', "La matière dans l'espace et dans l'Univers", 'pc_matiere', '🌌', 'pr11_systeme_solaire_univers.js'),
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
  ch('3e', 'p13', 'Rayonnement et effet de serre', 'pc_energie', '🌡️', 'p13_rayonnement_effet_serre.js'),
  ch('3e', 'p11', 'Signaux sonores et lumineux', 'pc_signaux', '🔊', 'p11_signaux.js'),
  ch('3e', 'p12', 'Des signaux au-delà de la perception humaine', 'pc_signaux', '📡', 'p12_signaux_invisibles.js'),

  // ================================================================== SVT
  // 3ᵉ : chapitres du manuel LeLivreScolaire (SVT cycle 4) habituellement
  // traités en troisième. Le programme de SVT est écrit pour tout le cycle :
  // la répartition par niveau varie d'un collège à l'autre.
  // 5ᵉ (identifiants sv). Le programme de SVT est écrit pour tout le cycle 4 : la
  // répartition par niveau ci-dessous est indicative et varie d'un collège à l'autre.
  ch('5e', 'sv01', 'La Terre dans le système solaire', 'svt_terre', '🌍', 'sv01_terre_systeme_solaire.js'),
  ch('5e', 'sv02', 'Météo et climats', 'svt_terre', '⛅', 'sv02_meteo_climats.js'),
  ch('5e', 'sv03', 'Les activités humaines et les écosystèmes locaux', 'svt_terre', '🌾', 'sv03_ecosystemes_locaux.js'),
  ch('5e', 'sv04', 'Les échanges de matière indispensables à la vie', 'svt_vivant', '🫁', 'sv04_echanges_matiere.js'),
  ch('5e', 'sv05', 'La nutrition des organes', 'svt_vivant', '🫀', 'sv05_nutrition_organes.js'),
  ch('5e', 'sv06', 'La reproduction des êtres vivants', 'svt_vivant', '🌸', 'sv06_reproduction_etres_vivants.js'),
  ch('5e', 'sv07', "Le fonctionnement de l'organisme lors d'un effort musculaire", 'svt_corps', '🏃', 'sv07_effort_musculaire.js'),
  ch('5e', 'sv08', "Le fonctionnement de l'appareil digestif", 'svt_corps', '🍽️', 'sv08_appareil_digestif.js'),
  ch('5e', 'sv09', 'Régimes et équilibre alimentaire', 'svt_corps', '🥗', 'sv09_equilibre_alimentaire.js'),

  // 4ᵉ (identifiants sr).
  ch('4e', 'sr01', 'Les risques sismiques et volcaniques', 'svt_terre', '🌋', 'sr01_risques_sismiques_volcaniques.js'),
  ch('4e', 'sr02', "L'origine des séismes et des éruptions volcaniques", 'svt_terre', '🗺️', 'sr02_tectonique_plaques.js'),
  ch('4e', 'sr03', "Les enjeux de l'exploitation de ressources naturelles", 'svt_terre', '⛏️', 'sr03_ressources_naturelles.js'),
  ch('4e', 'sr04', "La nutrition à l'échelle cellulaire", 'svt_vivant', '🔬', 'sr04_nutrition_cellulaire.js'),
  ch('4e', 'sr05', 'La reproduction et la stabilité des espèces', 'svt_vivant', '🧫', 'sr05_stabilite_especes.js'),
  ch('4e', 'sr06', 'La reproduction et le peuplement des milieux', 'svt_vivant', '🌬️', 'sr06_peuplement_milieux.js'),
  ch('4e', 'sr07', 'La diversité des espèces et des individus', 'svt_vivant', '🧬', 'sr07_diversite_especes_individus.js'),
  ch('4e', 'sr08', 'La modification de la biodiversité au cours du temps', 'svt_vivant', '🦴', 'sr08_biodiversite_temps.js'),
  ch('4e', 'sr09', "Les microorganismes dans l'environnement", 'svt_corps', '🦠', 'sr09_microorganismes.js'),
  ch('4e', 'sr10', 'La production des cellules reproductrices', 'svt_corps', '🧑‍🤝‍🧑', 'sr10_cellules_reproductrices.js'),
  ch('4e', 'sr11', 'Des cellules reproductrices au nouveau-né', 'svt_corps', '👶', 'sr11_fecondation_grossesse.js'),
  ch('4e', 'sr12', 'Le contrôle de la reproduction', 'svt_corps', '🛡️', 'sr12_controle_reproduction.js'),

  ch('3e', 's01', 'Les changements climatiques actuels et passés', 'svt_terre', '🌡️', 's01_changements_climatiques.js'),
  ch('3e', 's02', "Les impacts des activités humaines sur l'environnement", 'svt_terre', '🏭', 's02_impacts_activites_humaines.js'),
  ch('3e', 's03', "L'origine des caractères", 'svt_vivant', '🧬', 's03_origine_caracteres.js'),
  ch('3e', 's04', 'De la diversité génétique à la biodiversité', 'svt_vivant', '🎲', 's04_diversite_genetique.js'),
  ch('3e', 's05', 'Les liens de parenté entre les êtres vivants', 'svt_vivant', '🌳', 's05_liens_parente.js'),
  ch('3e', 's06', "L'évolution de la biodiversité", 'svt_vivant', '🦕', 's06_evolution_biodiversite.js'),
  ch('3e', 's07', 'Le fonctionnement du système nerveux', 'svt_corps', '🧠', 's07_systeme_nerveux.js'),
  ch('3e', 's08', "L'organisme face à une infection", 'svt_corps', '🦠', 's08_infection.js'),
  ch('3e', 's09', 'La réponse immunitaire adaptative', 'svt_corps', '💉', 's09_reponse_immunitaire.js'),
  ch('3e', 's10', 'Des aliments aux nutriments', 'svt_corps', '🧪', 's10_aliments_nutriments.js'),

  // ================================================================== Technologie
  // 3ᵉ : chapitres construits sur les repères de progressivité de la classe de 3ᵉ
  // du programme de 2024 (aucun manuel de référence en accès libre).
  ch('3e', 't01', 'Sciences, innovations et société', 'tk_usages', '💡', 't01_innovations_societe.js'),
  ch('3e', 't02', 'Comparer et choisir un objet technique', 'tk_usages', '♻️', 't02_choisir_objet.js'),
  ch('3e', 't03', "L'intelligence artificielle et le numérique dans la société", 'tk_usages', '🤖', 't03_ia_numerique.js'),
  ch('3e', 't04', "La chaîne d'énergie en schéma-bloc", 'tk_structure', '🔋', 't04_chaine_energie.js'),
  ch('3e', 't05', "La chaîne d'information et la numérisation", 'tk_structure', '🔢', 't05_chaine_information.js'),
  ch('3e', 't06', 'Internet : adresses, routage, débit', 'tk_structure', '🛰️', 't06_internet.js'),
  ch('3e', 't07', 'Diagnostiquer et réparer', 'tk_structure', '🔧', 't07_reparer.js'),
  ch('3e', 't08', 'Programmer une nouvelle fonctionnalité', 'tk_structure', '🧩', 't08_programmer.js'),
  ch('3e', 't09', 'Mener un projet et valider une solution', 'tk_creation', '📋', 't09_projet_validation.js'),
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
