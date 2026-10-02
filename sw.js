// =====================================================================
//  sw.js — Service Worker (hors-ligne + installation PWA)
//  Stratégies :
//   - fichiers du site (même origine) : « réseau d'abord » → un élève en
//     ligne a toujours la dernière version (pas de mélange ancien app.js /
//     nouveau chapitre) ; hors-ligne, on sert la copie en cache.
//   - bibliothèques CDN (URL versionnées, immuables) : « cache d'abord ».
//   - tout le reste (API de sauvegarde en ligne…) : NON intercepté, pour ne
//     jamais servir une sauvegarde périmée depuis le cache.
//  Bumper VERSION purge les anciens caches.
// =====================================================================

const VERSION = 'v19';
const CACHE = 'maths-college-' + VERSION;

// Coquille de l'application (chemins relatifs à l'emplacement du SW = racine).
// Pré-cache « au mieux » : un fichier manquant n'empêche plus l'installation.
const CORE = [
  './', './index.html', './manifest.json',
  './css/style.css',
  './js/app.js', './js/programme.js', './js/stats.js', './js/cloud.js', './js/fusion.js', './js/config.js', './js/engine.js', './js/render.js', './js/aide_memoire.js', './js/brevet.js', './js/icones.js', './js/sources.js',
  './js/chapters/commun.js',
  './js/unites.js',
  './js/chapters/physique/outils.js',
  './js/chapters/physique/figures.js',
  './js/chapters/physique/figures_cycle.js',
  './js/chapters/physique/figures_chimie.js',
  './js/brevet_sciences.js',
  './js/brevet_svt.js',
  './js/chapters/svt/figures.js',
  './js/chapters/svt/outils.js',
  './js/chapters/physique/3e/p12_signaux_invisibles.js',
  './js/chapters/physique/3e/p13_rayonnement_effet_serre.js',
  './js/chapters/physique/4e/pr11_systeme_solaire_univers.js',
  './js/chapters/physique/5e/pv10_eau.js',
  './js/chapters/svt/3e/s10_aliments_nutriments.js',
  './js/chapters/svt/4e/sr01_risques_sismiques_volcaniques.js',
  './js/chapters/svt/4e/sr02_tectonique_plaques.js',
  './js/chapters/svt/4e/sr03_ressources_naturelles.js',
  './js/chapters/svt/4e/sr04_nutrition_cellulaire.js',
  './js/chapters/svt/4e/sr05_stabilite_especes.js',
  './js/chapters/svt/4e/sr06_peuplement_milieux.js',
  './js/chapters/svt/4e/sr07_diversite_especes_individus.js',
  './js/chapters/svt/4e/sr08_biodiversite_temps.js',
  './js/chapters/svt/4e/sr09_microorganismes.js',
  './js/chapters/svt/4e/sr10_cellules_reproductrices.js',
  './js/chapters/svt/4e/sr11_fecondation_grossesse.js',
  './js/chapters/svt/4e/sr12_controle_reproduction.js',
  './js/chapters/svt/5e/sv01_terre_systeme_solaire.js',
  './js/chapters/svt/5e/sv02_meteo_climats.js',
  './js/chapters/svt/5e/sv03_ecosystemes_locaux.js',
  './js/chapters/svt/5e/sv04_echanges_matiere.js',
  './js/chapters/svt/5e/sv05_nutrition_organes.js',
  './js/chapters/svt/5e/sv06_reproduction_etres_vivants.js',
  './js/chapters/svt/5e/sv07_effort_musculaire.js',
  './js/chapters/svt/5e/sv08_appareil_digestif.js',
  './js/chapters/svt/5e/sv09_equilibre_alimentaire.js',
  './js/chapters/svt/3e/s03_origine_caracteres.js',
  './js/chapters/svt/3e/s01_changements_climatiques.js',
  './js/chapters/svt/3e/s02_impacts_activites_humaines.js',
  './js/chapters/svt/3e/s04_diversite_genetique.js',
  './js/chapters/svt/3e/s05_liens_parente.js',
  './js/chapters/svt/3e/s06_evolution_biodiversite.js',
  './js/chapters/svt/3e/s07_systeme_nerveux.js',
  './js/chapters/svt/3e/s08_infection.js',
  './js/chapters/svt/3e/s09_reponse_immunitaire.js',
  './js/chapters/physique/5e/pv01_etats_matiere.js',
  './js/chapters/physique/5e/pv02_changements_etat.js',
  './js/chapters/physique/5e/pv03_masse_volume.js',
  './js/chapters/physique/5e/pv04_melanges.js',
  './js/chapters/physique/5e/pv05_mouvement.js',
  './js/chapters/physique/5e/pv06_energie.js',
  './js/chapters/physique/5e/pv07_circuit.js',
  './js/chapters/physique/5e/pv08_serie_derivation.js',
  './js/chapters/physique/5e/pv09_lumiere.js',
  './js/chapters/physique/4e/pr01_air_molecules.js',
  './js/chapters/physique/4e/pr02_transformations.js',
  './js/chapters/physique/4e/pr03_combustions.js',
  './js/chapters/physique/4e/pr04_equations.js',
  './js/chapters/physique/4e/pr05_mouvement_vitesse.js',
  './js/chapters/physique/4e/pr06_interactions.js',
  './js/chapters/physique/4e/pr07_intensite_tension.js',
  './js/chapters/physique/4e/pr08_energie_conversions.js',
  './js/chapters/physique/4e/pr09_son.js',
  './js/chapters/physique/4e/pr10_lumiere_vitesse.js',
  './js/chapters/physique/3e/p01_univers_atomes.js',
  './js/chapters/physique/3e/p02_ions.js',
  './js/chapters/physique/3e/p03_acides_bases.js',
  './js/chapters/physique/3e/p04_masse_volumique.js',
  './js/chapters/physique/3e/p05_vitesse_mouvement.js',
  './js/chapters/physique/3e/p06_forces.js',
  './js/chapters/physique/3e/p07_poids.js',
  './js/chapters/physique/3e/p08_energie.js',
  './js/chapters/physique/3e/p09_loi_ohm.js',
  './js/chapters/physique/3e/p10_puissance_energie.js',
  './js/chapters/physique/3e/p11_signaux.js',
  './js/chapters/3e/c01_calcul_litteral.js',
  './js/chapters/3e/c02_identites_remarquables.js',
  './js/chapters/3e/c03_equations_1er_degre.js',
  './js/chapters/3e/c04_equations_produit.js',
  './js/chapters/3e/c05_arithmetique.js',
  './js/chapters/3e/c06_puissances_racines.js',
  './js/chapters/3e/c07_notion_de_fonction.js',
  './js/chapters/3e/c08_fonctions_lineaires_affines.js',
  './js/chapters/3e/c09_variations_lecture_graphique.js',
  './js/chapters/3e/c10_thales.js',
  './js/chapters/3e/c11_trigonometrie.js',
  './js/chapters/3e/c12_transformations_plan.js',
  './js/chapters/3e/c13_homothetie.js',
  './js/chapters/3e/c14_geometrie_espace.js',
  './js/chapters/3e/c15_statistiques.js',
  './js/chapters/3e/c16_probabilites.js',
  './js/chapters/3e/c17_algorithmique.js',
  './js/chapters/4e/r01_pythagore.js',
  './js/chapters/4e/r02_nombres_relatifs.js',
  './js/chapters/4e/r03_fractions.js',
  './js/chapters/4e/r04_proportionnalite.js',
  './js/chapters/4e/r05_cosinus.js',
  './js/chapters/4e/r06_calcul_litteral.js',
  './js/chapters/4e/r07_equations.js',
  './js/chapters/4e/r08_puissances.js',
  './js/chapters/4e/r18_notation_scientifique.js',
  './js/chapters/4e/r09_statistiques.js',
  './js/chapters/4e/r10_probabilites.js',
  './js/chapters/4e/r11_transformations.js',
  './js/chapters/4e/r12_aires_volumes.js',
  './js/chapters/4e/r13_thales.js',
  './js/chapters/4e/r14_rotation.js',
  './js/chapters/4e/r15_nombres_premiers.js',
  './js/chapters/4e/r16_vitesses.js',
  './js/chapters/4e/r17_pyramides_cones.js',
  './js/chapters/4e/r18_scratch.js',
  './js/chapters/5e/v01_priorites.js',
  './js/chapters/5e/v02_relatifs.js',
  './js/chapters/5e/v03_fractions.js',
  './js/chapters/5e/v04_carres_cubes.js',
  './js/chapters/5e/v05_calcul_litteral.js',
  './js/chapters/5e/v06_proportionnalite.js',
  './js/chapters/5e/v07_grandeurs.js',
  './js/chapters/5e/v08_reperage.js',
  './js/chapters/5e/v09_angles.js',
  './js/chapters/5e/v10_triangles.js',
  './js/chapters/5e/v11_parallelogrammes.js',
  './js/chapters/5e/v12_symetrie_centrale.js',
  './js/chapters/5e/v13_solides.js',
  './js/chapters/5e/v14_aires_volumes.js',
  './js/chapters/5e/v15_statistiques.js',
  './js/chapters/5e/v16_probabilites.js',
  './js/chapters/5e/v17_programmation.js',
  './icons/icon-192.png', './icons/icon-512.png',
];

// Bibliothèques CDN (mises en cache au mieux, pour le hors-ligne)
const CDN = [
  'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
  'https://cdn.jsdelivr.net/npm/jsxgraph@1.10.1/distrib/jsxgraph.css',
  'https://cdn.jsdelivr.net/npm/jsxgraph@1.10.1/distrib/jsxgraphcore.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled([...CORE, ...CDN].map((u) => cache.add(u)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  // Polices Google : réponses opaques (sans CORS), mises en cache telles quelles.
  const isCdn = url.hostname === 'cdn.jsdelivr.net' || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isCdn) return; // API de sauvegarde, etc. : laissé au réseau

  if (isCdn) {
    e.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    })());
    return;
  }

  // Même origine : réseau d'abord, cache en secours (hors-ligne).
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      if (req.mode === 'navigate') return caches.match('./index.html');
      throw err;
    }
  })());
});
