// =====================================================================
//  sources.js — Sources et crédits du site (page #/sources)
//
//  Tout ce qui a servi à construire le contenu est recensé ICI : programmes
//  officiels, manuels utilisés pour le découpage en chapitres, valeurs
//  réelles citées dans les cours, outils.
//
//  RÈGLE : une valeur réelle (date, mesure, ordre de grandeur) n'est citée
//  dans un chapitre de SVT que si elle figure dans VALEURS ci-dessous, avec
//  la page où elle a été lue. Sinon, l'exercice précise que ses données
//  sont inventées pour l'entraînement.
// =====================================================================

const LLS = 'https://www.lelivrescolaire.fr/manuels/';
const WIKI = 'https://fr.wikipedia.org/wiki/';

/** Manuels de référence (éditions LeLivreScolaire, consultables librement en ligne). */
export const MANUELS = {
  pc4: { titre: 'Physique-Chimie Cycle 4', edition: 'LeLivreScolaire, 2017', url: LLS + 'physique-chimie-cycle4-2017' },
  pc3: { titre: 'Physique-Chimie 3ᵉ', edition: 'LeLivreScolaire, 2017', url: LLS + 'physique-chimie-3eme-2017' },
  svt4: { titre: 'SVT Cycle 4', edition: 'LeLivreScolaire, 2017', url: LLS + 'sciences-de-la-vie-et-de-la-terre-cycle4-2017' },
};

/** Programme de technologie : il donne des repères par classe, les chapitres les suivent. */
export const PROGRAMME_TECHNO = { titre: 'Programme de technologie du cycle 4', edition: 'Bulletin officiel n° 9 du 29 février 2024', url: 'https://www.education.gouv.fr/sites/default/files/document/Annexe%20%E2%80%94%20Programme%20de%20technologie%20du%20cycle%204-368016.pdf' };
const REPERES_TECHNO = {
  t01: "L'évolution des objets et des systèmes techniques", t02: "Le choix d'un objet dans un contexte de développement durable",
  t03: "L'évolution des objets (intelligence artificielle) ; usages et impacts sociétaux du numérique", t04: "Fonctions, solutions, constituants de la chaîne d'énergie",
  t05: "Chaîne d'information ; structuration et traitement des données", t06: "La circulation de l'information dans un réseau informatique",
  t07: 'Le dépannage et la réparation ; matériaux et procédés', t08: "La programmation d'une nouvelle fonctionnalité",
  t09: 'La gestion de projet technique ; la performance des objets ; la validation des solutions',
};

/**
 * Chapitre du site → [manuel, chapitre(s) correspondant(s) du manuel].
 * `suivi: true` : le chapitre a été construit en suivant le plan du manuel.
 * Sinon : rédigé à partir du programme officiel, la correspondance avec le
 * manuel est donnée pour s'y retrouver en classe.
 */
export const CORRESPONDANCES = {
  // Physique-chimie 5ᵉ et 4ᵉ : rédigés à partir du programme
  pv01: ['pc4', 'ch. 2'], pv02: ['pc4', 'ch. 3'], pv03: ['pc4', 'ch. 2'], pv04: ['pc4', 'ch. 4'], pv05: ['pc4', 'ch. 15'],
  pv06: ['pc4', 'ch. 21'], pv07: ['pc4', 'ch. 24'], pv08: ['pc4', 'ch. 24'], pv09: ['pc4', 'ch. 30'], pv10: ['pc4', 'ch. 1', true],
  pr01: ['pc4', 'ch. 5 et 6'], pr02: ['pc4', 'ch. 7'], pr03: ['pc4', 'ch. 7'], pr04: ['pc4', 'ch. 8'], pr05: ['pc4', 'ch. 16'],
  pr06: ['pc4', 'ch. 18'], pr07: ['pc4', 'ch. 25 et 26'], pr08: ['pc4', 'ch. 22'], pr09: ['pc4', 'ch. 29'], pr10: ['pc4', 'ch. 31'], pr11: ['pc4', 'ch. 13', true],
  // Physique-chimie 3ᵉ : plan du manuel
  p01: ['pc4', 'ch. 14', true], p02: ['pc4', 'ch. 9', true], p03: ['pc4', 'ch. 10', true], p04: ['pc4', 'ch. 12', true],
  p05: ['pc4', 'ch. 17', true], p06: ['pc4', 'ch. 19', true], p07: ['pc4', 'ch. 20', true], p08: ['pc4', 'ch. 23', true],
  p09: ['pc4', 'ch. 27', true], p10: ['pc4', 'ch. 28', true], p11: ['pc4', 'ch. 29 à 31', true], p12: ['pc4', 'ch. 32', true],
  // SVT : plan du manuel (31 chapitres, tous traités)
  sv01: ['svt4', 'ch. 1', true], sv02: ['svt4', 'ch. 4', true], sv03: ['svt4', 'ch. 6', true], sv04: ['svt4', 'ch. 9', true], sv05: ['svt4', 'ch. 10', true],
  sv06: ['svt4', 'ch. 12', true], sv07: ['svt4', 'ch. 21', true], sv08: ['svt4', 'ch. 23', true], sv09: ['svt4', 'ch. 24', true],
  sr01: ['svt4', 'ch. 2', true], sr02: ['svt4', 'ch. 3', true], sr03: ['svt4', 'ch. 7', true], sr04: ['svt4', 'ch. 11', true], sr05: ['svt4', 'ch. 13', true], sr06: ['svt4', 'ch. 14', true],
  sr07: ['svt4', 'ch. 15', true], sr08: ['svt4', 'ch. 18', true], sr09: ['svt4', 'ch. 26', true], sr10: ['svt4', 'ch. 29', true], sr11: ['svt4', 'ch. 30', true], sr12: ['svt4', 'ch. 31', true],
  s01: ['svt4', 'ch. 5', true], s02: ['svt4', 'ch. 8', true], s03: ['svt4', 'ch. 16', true], s04: ['svt4', 'ch. 17', true],
  s05: ['svt4', 'ch. 19', true], s06: ['svt4', 'ch. 20', true], s07: ['svt4', 'ch. 22', true], s08: ['svt4', 'ch. 27', true], s09: ['svt4', 'ch. 28', true], s10: ['svt4', 'ch. 25', true],
};

/** Ligne « source » affichée en bas d'un chapitre (ou '' s'il n'y en a pas). */
export function sourceChapitre(id) {
  if (REPERES_TECHNO[id]) return `Repères de la classe de 3ᵉ suivis : « ${REPERES_TECHNO[id]} », <a href="${PROGRAMME_TECHNO.url}" target="_blank" rel="noopener">${PROGRAMME_TECHNO.titre}</a> (${PROGRAMME_TECHNO.edition}).`;
  const c = CORRESPONDANCES[id];
  if (!c) return '';
  const m = MANUELS[c[0]];
  return `${c[2] ? 'Plan du chapitre' : 'Chapitre correspondant'} : manuel <a href="${m.url}" target="_blank" rel="noopener">${m.titre}</a> (${m.edition}), ${c[1]}.`;
}

/**
 * Valeurs réelles citées dans les chapitres : [ce qui est cité, source, adresse].
 * Chacune a été relue sur la page indiquée avant d'être écrite dans un chapitre.
 */
export const VALEURS = [
  ['CO₂ à Mauna Loa : 317 ppm en 1960, 339 en 1980, 370 en 2000, 414 en 2020', 'NOAA, Global Monitoring Laboratory (moyennes annuelles)', 'https://gml.noaa.gov/ccgg/trends/'],
  ['Effet de serre : −18 °C sans, environ 15 °C avec ; CO₂ préindustriel de 280 ppm ; vapeur d\'eau, CO₂ et méthane parmi les gaz à effet de serre', 'Wikipédia, « Effet de serre »', WIKI + 'Effet_de_serre'],
  ['Décennie 2011-2020 plus chaude de 0,95 à 1,2 °C que 1850-1900', 'Wikipédia, « Réchauffement climatique » (d\'après le GIEC)', WIKI + 'R%C3%A9chauffement_climatique'],
  ['Niveau des mers : +20 cm entre 1901 et 2018 ; 3,7 mm par an entre 2006 et 2018', 'Wikipédia, « Élévation du niveau de la mer » (d\'après le GIEC)', WIKI + '%C3%89l%C3%A9vation_du_niveau_de_la_mer'],
  ['Dernier maximum glaciaire : il y a 21 000 ans, 3 à 6 °C de moins, mers 125 m plus bas', 'Wikipédia, « Dernier maximum glaciaire »', WIKI + 'Dernier_maximum_glaciaire'],
  ['CO₂ de 180 à 210 ppm pendant les périodes glaciaires (carottes de glace)', 'Wikipedia, « Carbon dioxide in Earth\'s atmosphere »', 'https://en.wikipedia.org/wiki/Carbon_dioxide_in_Earth%27s_atmosphere'],
  ['pH de l\'océan : 8,25 vers 1750, 8,15 en 1950, 8,05 en 2021, 7,8 projeté pour 2100', 'Wikipédia, « Acidification des océans »', WIKI + 'Acidification_des_oc%C3%A9ans'],
  ['Émissions pour 100 km : environ 11 kg de CO₂ en voiture thermique, 0,2 kg en TGV', 'ADEME, Impact CO₂', 'https://impactco2.fr/'],
  ['Frelon asiatique : première observation en 2004 dans le Lot-et-Garonne, front avançant de 78 km par an', 'Wikipédia, « Frelon asiatique »', WIKI + 'Frelon_asiatique'],
  ['Phalène du bouleau : forme sombre observée en 1848 près de Manchester, plus de 98 % en 1954', 'Wikipédia, « Phalène du bouleau »', WIKI + 'Phal%C3%A8ne_du_bouleau'],
  ['L\'Origine des espèces, Charles Darwin, 1859', 'Wikipédia, « L\'Origine des espèces »', WIKI + 'L%27Origine_des_esp%C3%A8ces'],
  ['Archéoptéryx : environ 150 millions d\'années ; plumes, dents, longue queue osseuse, doigts griffus', 'Wikipédia, « Archaeopteryx »', WIKI + 'Archaeopteryx'],
  ['Tiktaalik : environ 380 millions d\'années, nord du Canada ; écailles, nageoires, cou, poumons, os du poignet', 'Wikipédia, « Tiktaalik »', WIKI + 'Tiktaalik'],
  ['Lignée humaine : divergence avec le chimpanzé il y a 7 à 9 millions d\'années, Homo sapiens il y a 300 000 ans', 'Wikipédia, « Histoire évolutive de la lignée humaine »', WIKI + 'Histoire_%C3%A9volutive_de_la_lign%C3%A9e_humaine'],
  ['Capacité crânienne : 380 à 430 cm³ (Australopithecus afarensis), 900 à 1 200 cm³ (Homo erectus) ; cerveau humain de 1 130 à 1 290 cm³, 86 milliards de neurones', 'Wikipédia, « Australopithecus afarensis », « Homo erectus », « Cerveau humain »', WIKI + 'Cerveau_humain'],
  ['Génome humain : 23 paires de chromosomes, plus de 20 000 gènes, près de 99 % de similitude avec le chimpanzé', 'Wikipédia, « Génome humain »', WIKI + 'G%C3%A9nome_humain'],
  ['Gène des groupes sanguins sur le chromosome 9 ; allèles A, B et O', 'Wikipédia, « Système ABO »', WIKI + 'Syst%C3%A8me_ABO'],
  ['Trisomie 21 : 47 chromosomes au lieu de 46', 'Wikipédia, « Trisomie 21 »', WIKI + 'Trisomie_21'],
  ['Nombres de chromosomes : chat 38, souris 40, chimpanzé 48, drosophile 8, lapin 44, porc 38, pois 14, maïs 20, riz 24, blé 42, pomme de terre 48', 'Wikipedia, « List of organisms by chromosome count »', 'https://en.wikipedia.org/wiki/List_of_organisms_by_chromosome_count'],
  ['Bactérie Escherichia coli : une division toutes les vingt minutes en conditions favorables', 'Wikipédia, « Escherichia coli »', WIKI + 'Escherichia_coli'],
  ['Microbiote intestinal : environ 1 kg de bactéries, à peu près autant de bactéries que de cellules humaines', 'Wikipédia, « Microbiote intestinal humain »', WIKI + 'Microbiote_intestinal_humain'],
  ['Couverture vaccinale élevée indispensable pour interrompre la circulation du virus de la rougeole', 'Santé publique France', 'https://www.santepubliquefrance.fr/rougeole'],
  ['Terre : 12 742 km de diamètre, rotation en 23 h 56 min, révolution en 365,256 jours, axe incliné d\'environ 23°, 71 % d\'eau en surface, 78 % de diazote et 21 % de dioxygène, 15 °C en moyenne, formée il y a 4,54 milliards d\'années', 'Wikipédia, « Terre »', WIKI + 'Terre'],
  ['Système solaire : huit planètes, âge d\'un peu moins de 4,6 milliards d\'années, Soleil de 1,4 million de km de diamètre, Jupiter à 5,2 UA, Neptune à 30 UA, Proxima du Centaure à 4,22 années-lumière', 'Wikipédia, « Système solaire »', WIKI + 'Syst%C3%A8me_solaire'],
  ['Voie lactée : 200 à 400 milliards d\'étoiles, 100 000 à 120 000 années-lumière de diamètre', 'Wikipédia, « Voie lactée »', WIKI + 'Voie_lact%C3%A9e'],
  ['Univers : environ 13,8 milliards d\'années, environ 100 milliards de galaxies', 'Wikipédia, « Univers »', WIKI + 'Univers'],
  ['Année-lumière : 9 460 milliards de kilomètres ; la Terre à 8,32 minutes-lumière du Soleil', 'Wikipédia, « Année-lumière »', WIKI + 'Ann%C3%A9e-lumi%C3%A8re'],
  ['Lumière visible de 380 à 780 nm ; ordre des domaines, usages (infrarouge, Wi-Fi, radio)', 'Wikipédia, « Spectre électromagnétique »', WIKI + 'Spectre_%C3%A9lectromagn%C3%A9tique'],
  ['Séismes : foyer, épicentre, magnitude (amplitude × 10 par unité), environ cent mille séismes par an', 'Wikipédia, « Séisme »', WIKI + 'S%C3%A9isme'],
  ['Plaques : déplacements de l\'ordre de 1 à 13 cm par an ; Alfred Wegener, 1912', 'Wikipédia, « Tectonique des plaques »', WIKI + 'Tectonique_des_plaques'],
  ['Ères : Paléozoïque de 539 à 252 millions d\'années, Mésozoïque de 252 à 66, Cénozoïque depuis 66', 'Wikipédia, « Échelle des temps géologiques »', WIKI + '%C3%89chelle_des_temps_g%C3%A9ologiques'],
  ['Premières cellules il y a environ 3,8 milliards d\'années ; extinctions il y a 252 et 66 millions d\'années', 'Wikipédia, « Histoire évolutive du vivant »', WIKI + 'Histoire_%C3%A9volutive_du_vivant'],
  ['Formation d\'un sol : de cent ans (région tropicale) à dix mille ans (zones froides)', 'Programme officiel du cycle 4, SVT', 'https://eduscol.education.gouv.fr/sites/default/files/document/programme-d-enseignement-du-cycle-4-67722.pdf'],
  ['Respiration : air à 21 % de dioxygène, 12 à 20 mouvements par minute au repos, 0,5 L par inspiration, 80 à 100 m² de surface alvéolaire', 'Wikipédia, « Ventilation pulmonaire »', WIKI + 'Respiration_humaine'],
  ['Fréquence cardiaque : 50 à 80 battements par minute au repos ; maximale théorique = 220 − âge', 'Wikipédia, « Fréquence cardiaque »', WIKI + 'Fr%C3%A9quence_cardiaque'],
  ['Intestin grêle : 6 m en moyenne, environ 250 m² de surface d\'absorption', 'Wikipédia, « Intestin grêle »', WIKI + 'Intestin_gr%C3%AAle'],
  ['Énergie des nutriments : 17 kJ par gramme de glucides ou de protides, 37 kJ par gramme de lipides', 'Wikipédia, « Valeur énergétique »', WIKI + 'Valeur_%C3%A9nerg%C3%A9tique'],
  ['Photosynthèse : eau, dioxyde de carbone et lumière donnent glucides et dioxygène, dans les chloroplastes', 'Wikipédia, « Photosynthèse »', WIKI + 'Photosynth%C3%A8se'],
  ['Cycle menstruel : 28 jours de référence, à 4 jours près ; ovulation vers le 14ᵉ jour ; règles de 3 à 5 jours', 'Wikipédia, « Cycle menstruel »', WIKI + 'Cycle_menstruel'],
  ['Grossesse : fécondation dans la trompe, environ 38 semaines après la fécondation', 'Wikipédia, « Grossesse »', WIKI + 'Grossesse'],
  ['Sulfate de cuivre anhydre blanc, bleu une fois hydraté ; test de présence d\'eau', 'Wikipédia, « Sulfate de cuivre »', WIKI + 'Sulfate_de_cuivre'],
  ['Eaux minérales : résidu sec de 18 mg/L à 2 590 mg/L', 'Wikipédia, « Eau minérale naturelle »', WIKI + 'Eau_min%C3%A9rale_naturelle'],
  ['Octet : 8 bits, 256 valeurs de 0 à 255 ; kilooctet 1 000 octets, mégaoctet 1 million, gigaoctet 1 milliard', 'Wikipédia, « Octet »', WIKI + 'Octet'],
  ['Code ASCII : 128 caractères sur 7 bits ; A = 65, Z = 90, a = 97, 0 = 48, espace = 32 ; extensions à 8 bits (256 caractères) pour les lettres accentuées', 'Wikipédia, « American Standard Code for Information Interchange »', WIKI + 'American_Standard_Code_for_Information_Interchange'],
  ['Adresse IPv4 : 32 bits, quatre nombres de 0 à 255 séparés par des points ; adresses privées 192.168.x.x non routées sur Internet ; IPv6 sur 128 bits', 'Wikipédia, « Adresse IP »', WIKI + 'Adresse_IP'],
  ['Apprentissage automatique : supervisé (exemples étiquetés), non supervisé (recherche de structure), par renforcement (récompenses)', 'Wikipédia, « Apprentissage automatique »', WIKI + 'Apprentissage_automatique'],
  ['Indice de réparabilité : note sur 10, affichée depuis le 1ᵉʳ janvier 2021 ; critères : documentation, démontabilité, disponibilité et prix des pièces détachées, critères propres au produit ; remplacé par l\'indice de durabilité pour les téléviseurs et les lave-linge en 2025', 'ministère de la Transition écologique', 'https://www.ecologie.gouv.fr/politiques-publiques/indice-reparabilite'],
  ['Étiquette énergie : classes de A (le plus efficace) à G depuis le 1ᵉʳ mars 2021, sans A+, A++ ni A+++', 'Wikipédia, « Étiquette-énergie »', WIKI + '%C3%89tiquette-%C3%A9nergie'],
  ['Développement durable : définition du rapport Brundtland (1987) ; trois piliers : environnemental, social, économique', 'Wikipédia, « Développement durable »', WIKI + 'D%C3%A9veloppement_durable'],
  ['Effet photovoltaïque : découvert par Edmond Becquerel, présenté à l\'Académie des sciences en 1839', 'Wikipédia, « Effet photovoltaïque »', WIKI + 'Effet_photovolta%C3%AFque'],
  ['Première cellule photovoltaïque au silicium de rendement notable : laboratoires Bell, 1954, soit plus d\'un siècle après la découverte', 'Wikipédia, « Cellule photovoltaïque »', WIKI + 'Cellule_photovolta%C3%AFque'],
  ['Chargeur universel : connecteur USB-C imposé dans l\'Union européenne aux téléphones depuis fin 2024, pour réduire les déchets', 'Wikipédia, « Chargeur universel »', WIKI + 'Chargeur_universel'],
  ['Lampes à incandescence : retirées de la vente dans l\'Union européenne entre 2009 et 2012, pour réduire la consommation d\'énergie', 'Wikipédia, « Lampe à incandescence classique »', WIKI + 'Lampe_%C3%A0_incandescence_classique'],
  ['Vitesse de la lumière dans le vide : 299 792 458 m/s, arrondie à 300 000 km/s', 'Wikipédia, « Vitesse de la lumière »', WIKI + 'Vitesse_de_la_lumi%C3%A8re'],
  ['Pesanteur terrestre : 9,81 N/kg en valeur normale, arrondie à 9,8 N/kg', 'Wikipédia, « Pesanteur »', WIKI + 'Pesanteur'],
  ['Air : 78 % de diazote, 21 % de dioxygène ; 1,2 g par litre à 20 °C ; pression atmosphérique normale de 1 013 hPa', 'Wikipédia, « Air »', WIKI + 'Air'],
  ['Vitesse du son : environ 340 m/s dans l\'air à 15 °C, environ 1 500 m/s dans l\'eau, près de 6 000 m/s dans le fer', 'Wikipédia, « Vitesse du son »', WIKI + 'Vitesse_du_son'],
  ['Sons audibles de 20 Hz à 20 000 Hz ; ultrasons au-delà (chauves-souris, cétacés, échographie, sonar) ; infrasons en dessous (éléphants)', 'Wikipédia, « Ultrason » et « Infrason »', WIKI + 'Ultrason'],
  ['Niveaux sonores : chambre calme 30 dB, bibliothèque 45 dB, conversation 60 dB, aspirateur 70 dB, circulation dense 80 dB, seuil de risque 85 dB, marteau-piqueur 100 dB, douleur 120 dB', 'Wikipédia, « Décibel »', WIKI + 'D%C3%A9cibel'],
  ['Lieux diffusant des sons amplifiés : 102 dB en moyenne au maximum', 'ministère de la Transition écologique', 'https://www.ecologie.gouv.fr/politiques-publiques/bruit-nuisances-sonores-pollution-sonore'],
  ['Lune : à 384 400 km de la Terre, pesanteur de 1,6 N/kg, masse 81 fois plus petite que celle de la Terre', 'Wikipédia, « Lune »', WIKI + 'Lune'],
  ['Mars : pesanteur de 3,7 N/kg, à 228 millions de km du Soleil, à 56 millions de km de la Terre au plus près (2003)', 'Wikipédia, « Mars (planète) »', WIKI + 'Mars_(plan%C3%A8te)'],
  ['Jupiter : pesanteur de 24,8 N/kg, à 778 millions de km du Soleil (donc environ 630 millions de km de la Terre au plus près)', 'Wikipédia, « Jupiter (planète) »', WIKI + 'Jupiter_(plan%C3%A8te)'],
  ['Distances au Soleil : Mercure 58 millions de km, Vénus 108 millions, Saturne 1,43 milliard', 'Wikipédia, « Mercure », « Vénus » et « Saturne »', WIKI + 'Saturne_(plan%C3%A8te)'],
  ['Étoiles : Sirius à 8,6 années-lumière, Véga à 25, l\'étoile Polaire à environ 430, Bételgeuse à environ 640 (distances encore discutées pour les deux dernières)', 'Wikipédia, « Sirius », « Véga », « Alpha Ursae Minoris », « Bételgeuse »', WIKI + 'B%C3%A9telgeuse'],
  ['Satellites : GPS à 20 200 km d\'altitude, orbite géostationnaire à 35 786 km, station spatiale vers 400 km', 'Wikipédia, « Global Positioning System », « Orbite géostationnaire », « Station spatiale internationale »', WIKI + 'Orbite_g%C3%A9ostationnaire'],
  ['Températures de fusion : cyclohexane 6,5 °C, acide stéarique 69 °C, naphtalène 80 °C, étain 232 °C, plomb 327 °C', 'Wikipédia, « Point de fusion » et pages des espèces', WIKI + 'Point_de_fusion'],
  ['Masses volumiques (g/cm³) : liège 0,24, pin 0,5, chêne 0,6 à 1, glace 0,92, huile d\'olive 0,92, essence 0,75, éthanol 0,79, lait 1,03, eau de mer 1,03, glycérine 1,26, PVC 1,4, verre 2,5, aluminium 2,7, fer 7,87, laiton 7,3 à 8,8, cuivre 8,96, argent 10,5, plomb 11,3, mercure 13,5, or 19,3', 'Wikipédia, « Masse volumique »', WIKI + 'Masse_volumique'],
  ['Sel : au plus 358,5 g par litre d\'eau à 20 °C ; eau de mer : 35 g de sels par litre en moyenne ; sucre : environ 2 000 g par litre', 'Wikipédia, « Chlorure de sodium », « Eau de mer », « Saccharose »', WIKI + 'Chlorure_de_sodium'],
  ['Glace : 917 kg/m³, soit un volume environ 9 % plus grand que celui de l\'eau liquide', 'Wikipédia, « Glace »', WIKI + 'Glace'],
  ['pH : jus de citron 2,4, cola 2,5, vinaigre 2,5 à 2,9, lait 6,5, sang 7,4, savon 9 à 10, eau de Javel 11,5, soude concentrée 14', 'Wikipédia, « Potentiel hydrogène »', WIKI + 'Potentiel_hydrog%C3%A8ne'],
  ['Tests à la soude : précipité bleu (cuivre), vert (fer II), rouille (fer III), blanc (zinc)', 'Wikipédia, « Hydroxyde de sodium »', WIKI + 'Hydroxyde_de_sodium'],
  ['Monoxyde de carbone : incolore, inodore, très toxique, produit par les combustions incomplètes', 'Wikipédia, « Monoxyde de carbone »', WIKI + 'Monoxyde_de_carbone'],
  ['Atome : de l\'ordre de 10⁻¹⁰ m, noyau de l\'ordre de 10⁻¹⁵ m ; proton et neutron 1,67 × 10⁻²⁷ kg, proton 1 836 fois plus lourd que l\'électron', 'Wikipédia, « Atome »', WIKI + 'Atome'],
  ['Hydrogène : 75 % de la masse de la matière ordinaire de l\'Univers', 'Wikipédia, « Hydrogène »', WIKI + 'Hydrog%C3%A8ne'],
  ['Électricité : prises de 230 V et 16 A en France ; pile plate de 4,5 V ; une lampe à incandescence convertit 5 % de l\'énergie en lumière', 'Wikipédia, « Prise électrique », « Pile électrique », « Lampe à incandescence classique »', WIKI + 'Prise_%C3%A9lectrique'],
  ['Prix du kilowattheure : 0,2001 € au tarif réglementé (option base) en août 2026, arrondi à 0,20 €', 'Selectra, d\'après le tarif réglementé', 'https://selectra.info/energie/electricite/prix'],
  ['Freinage : temps de réaction de 1 seconde ; décélération de 7 m/s par seconde ; 14 m de freinage à 50 km/h, 93 m à 130 km/h', 'Sécurité routière, dépliant « La vitesse » (2023)', 'https://www.securite-routiere.gouv.fr/sites/default/files/2024-01/sr_vitesse_depliant_2023_bd.pdf'],
  ['Vitesses : guépard jusqu\'à 112 km/h, Usain Bolt 44,7 km/h en pointe (100 m en 9,58 s), faucon pèlerin 389 km/h en piqué, TGV de 270 à 320 km/h, avion de ligne de 810 à 920 km/h, cheval de course plus de 60 km/h, escargot 1 mm/s', 'Wikipédia, pages « Guépard », « Usain Bolt », « Faucon pèlerin », « TGV », « Avion de ligne », « Galop », « Escargot »', WIKI + 'TGV'],
  ['Gaz à effet de serre : ils absorbent le rayonnement infrarouge émis par le sol ; méthane 25 fois plus réchauffant que le CO₂ sur cent ans ; émissions par secteur (énergie 35 %, agriculture et forêt 24 %, industrie 21 %, transports 14 %, bâtiments 6 %)', 'Wikipédia, « Gaz à effet de serre » (d\'après le GIEC)', WIKI + 'Gaz_%C3%A0_effet_de_serre'],
  ['Environ 30 % de l\'énergie solaire reçue par la Terre est réfléchie ; énergie absorbée et énergie réémise s\'équilibrent', 'Wikipédia, « Bilan radiatif de la Terre »', WIKI + 'Bilan_radiatif_de_la_Terre'],
  ['Montée des mers : dilatation de l\'eau pour environ un tiers, fonte des glaces continentales pour environ la moitié', 'Wikipédia, « Élévation du niveau de la mer »', WIKI + '%C3%89l%C3%A9vation_du_niveau_de_la_mer'],
  ['Impesanteur : chute libre de la station et de ses occupants, la pesanteur restant proche de celle du sol', 'Wikipédia, « Impesanteur »', WIKI + 'Impesanteur'],
  ['Rouille : oxydes de fer formés par corrosion en présence de dioxygène et d\'eau ; protection par galvanisation ou peinture', 'Wikipédia, « Rouille (oxyde) »', WIKI + 'Rouille_(oxyde)'],
  ['Préfixes : giga 10⁹, méga 10⁶, kilo 10³, milli 10⁻³, micro 10⁻⁶, nano 10⁻⁹', 'Wikipédia, « Préfixes du Système international d\'unités »', WIKI + 'Pr%C3%A9fixes_du_Syst%C3%A8me_international_d%27unit%C3%A9s'],
];

/** Sections de la page « Sources et crédits ». */
export const SOURCES = [
  {
    titre: 'Comment ce site est écrit',
    texte: [
      "Les cours, les méthodes, les exercices, leurs corrections et les figures ont été <strong>rédigés pour ce site</strong>, avec l'aide d'un assistant d'intelligence artificielle (Claude, d'Anthropic), sous la direction du tuteur.",
      "Aucun texte, exercice ni illustration n'est recopié d'un manuel. Les manuels servent à suivre le <strong>même ordre et le même découpage</strong> qu'en classe.",
      "Dans les exercices, les situations et les mesures sont <strong>inventées pour l'entraînement</strong> (l'énoncé le précise), sauf les valeurs réelles listées plus bas.",
      "Une erreur est toujours possible : si une réponse te semble fausse, signale-la à ton tuteur.",
    ],
  },
  {
    titre: 'Programmes officiels',
    texte: ["Les chapitres de SVT couvrent les trois thèmes du programme du cycle 4. Ce programme est écrit pour l'ensemble du cycle : la répartition des chapitres entre la 5ᵉ, la 4ᵉ et la 3ᵉ proposée ici est indicative et varie d'un collège à l'autre."],
    liens: [
      ['Programme d\'enseignement du cycle 4 (toutes disciplines)', 'ministère de l\'Éducation nationale, en vigueur depuis la rentrée 2020 (BO n° 31 du 30 juillet 2020)', 'https://eduscol.education.gouv.fr/sites/default/files/document/programme-d-enseignement-du-cycle-4-67722.pdf'],
      ['Programmes du collège', 'ministère de l\'Éducation nationale', 'https://www.education.gouv.fr/les-programmes-du-college-470408'],
      [PROGRAMME_TECHNO.titre, PROGRAMME_TECHNO.edition + ' ; en vigueur en 3ᵉ depuis la rentrée 2026', PROGRAMME_TECHNO.url],
      ['Sujet de référence de technologie n° 1 pour le brevet', 'éduscol, septembre 2026', 'https://eduscol.education.gouv.fr/sites/default/files/document/dnb-sujet-de-reference-technologie-serie-generale-n01-129676.pdf'],
      ['Programme de mathématiques de 5ᵉ (rentrée 2026)', 'Bulletin officiel n° 10 du 5 mars 2026', 'https://www.education.gouv.fr/bo/2026/Hebdo10/MENE2602912A'],
      ['Les épreuves du diplôme national du brevet à compter de la session 2027 : durées, parties et barèmes', 'éduscol, d\'après la note de service du 11 septembre 2026', 'https://eduscol.education.gouv.fr/5607/les-epreuves-du-dnb'],
      ['Liste indicative d\'automatismes pour l\'épreuve de mathématiques du brevet', 'éduscol, octobre 2025', 'https://eduscol.education.gouv.fr/sites/default/files/document/liste-indicative-dautomatismes-pour-le-dnbpdf-116340.pdf'],
    ],
  },
  {
    titre: 'Manuels de référence',
    texte: ["Sommaires consultés pour le découpage en chapitres. Chaque chapitre de physique-chimie et de SVT indique, en bas de page, le chapitre du manuel auquel il correspond. La technologie n'a pas de manuel en accès libre : ses chapitres suivent les repères par classe du programme officiel, cités en bas de page."],
    liens: Object.values(MANUELS).map((m) => [m.titre, m.edition, m.url]),
  },
  {
    titre: 'Valeurs réelles citées',
    texte: ["Chaque valeur réelle citée dans un chapitre de physique-chimie, de SVT ou de technologie a été relue sur la page indiquée. Les valeurs sont arrondies comme en classe (340 m/s pour le son, 300 000 km/s pour la lumière, 9,8 N/kg pour la pesanteur terrestre). Les rendements et les puissances des appareils donnés dans les exercices sont des ordres de grandeur choisis pour l'entraînement."],
    liens: VALEURS,
  },
  {
    titre: 'Outils',
    liens: [
      ['KaTeX', 'affichage des formules', 'https://katex.org/'],
      ['JSXGraph', 'figures de géométrie', 'https://jsxgraph.org/'],
      ['Chart.js', 'graphiques du tableau de bord', 'https://www.chartjs.org/'],
      ['Big Shoulders Display et Figtree', 'polices, Google Fonts', 'https://fonts.google.com/'],
    ],
  },
];
