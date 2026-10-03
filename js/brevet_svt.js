// =====================================================================
//  brevet_svt.js — Problèmes type Brevet, partie SVT de l'épreuve de
//  sciences (10 points, 30 minutes au DNB depuis 2027).
//
//  Même schéma que brevet_sciences.js : une situation, un document, des
//  questions qui s'enchaînent (à choix, ou à réponse numérique).
//  Les situations et les mesures sont inventées pour l'entraînement.
// =====================================================================

import { pick, randInt } from './engine.js';
import { arrondi, dec, melanger, tableau } from './chapters/commun.js';
import { schemaCaryotype, tableCroisement, COMBINAISONS, GROUPES, groupe, enfants, schemaCourbe, schemaBarres, schemaAntibiogramme } from './chapters/svt/figures.js';

const n = (reponse, extra = {}) => ({ validation: 'nombre', reponse, ...extra });
const dire = (c) => (c[0] === c[1] ? `deux fois l'allèle ${c[0]}` : `les allèles ${c[0]} et ${c[1]}`);
const FRACTIONS = ['aucune chance', '1 chance sur 4', '2 chances sur 4', '3 chances sur 4', '4 chances sur 4'];

// ---------------------------------------------------------------------
//  1. Une famille et ses groupes sanguins — gènes, allèles, croisement
// ---------------------------------------------------------------------
const P_GROUPES = {
  id: 'bv_groupes', titre: 'Les groupes sanguins de la famille', domaine: 'Génétique', chapitres: ['s03', 's04'], dureeMin: 12,
  generer() {
    let pere, mere, cible, k;
    do {
      pere = pick(COMBINAISONS.filter((c) => c[0] !== c[1])); mere = pick(COMBINAISONS); cible = pick(GROUPES);
      k = enfants(pere, mere).filter(([a, b]) => groupe(a, b) === cible).length;
    } while (k === 0 || k === 4);
    return {
      contexte: `<p>Le groupe sanguin dépend d'un gène porté par le chromosome 9, qui existe en trois allèles : A, B et O. Les allèles A et B s'expriment toujours ; l'allèle O ne s'exprime que s'il est présent en deux exemplaires. Dans une famille, le père possède <strong>${dire(pere)}</strong> et la mère <strong>${dire(mere)}</strong>.</p>`,
      questions: [
        { enonce: '<p><strong>1.</strong> Un allèle est :</p>', points: 2, choix: ["une version d'un gène", 'un chromosome', 'une cellule reproductrice', 'un caractère acquis'], correct: 0, corrige: '<p>Un allèle est une <strong>version d\'un gène</strong>.</p>' },
        { enonce: '<p><strong>2.</strong> Quel est le groupe sanguin du père ?</p>', points: 2, choix: GROUPES.map((g) => `groupe ${g}`), correct: GROUPES.indexOf(groupe(...pere)), fixe: true, corrige: `<p>Avec ${dire(pere)}, le père est du <strong>groupe ${groupe(...pere)}</strong>.</p>` },
        { enonce: '<p><strong>3.</strong> Combien d\'allèles de ce gène un spermatozoïde du père contient-il ?</p>', points: 2, ...n(1), corrige: '<p>Une cellule reproductrice ne contient qu\'un chromosome de chaque paire, donc <strong>un seul allèle</strong> du gène.</p>' },
        { enonce: `<p><strong>4.</strong> Quelle est la probabilité que leur enfant soit du groupe ${cible} ?</p>`, points: 4, choix: FRACTIONS, correct: k, fixe: true, indice: 'Dresse le tableau de croisement : allèles du père en lignes, de la mère en colonnes.', corrige: `${tableCroisement(pere, mere)}<p>${k} case${k > 1 ? 's' : ''} sur 4 : <strong>${FRACTIONS[k]}</strong>.</p>` },
        { enonce: '<p><strong>5.</strong> Deux enfants de ce couple peuvent avoir des groupes différents parce que :</p>', points: 2, choix: ['chaque parent transmet au hasard un seul de ses deux allèles', 'le groupe sanguin dépend de l\'alimentation', 'les allèles changent au cours de la vie', 'le groupe sanguin n\'est pas héréditaire'], correct: 0, corrige: '<p>Le <strong>hasard</strong> de la formation des cellules reproductrices et de la fécondation donne des combinaisons différentes.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  2. Un caryotype à analyser — chromosomes, sexe, anomalie
// ---------------------------------------------------------------------
const P_CARYOTYPE = {
  id: 'bv_caryotype', titre: "L'analyse d'un caryotype", domaine: 'Génétique', chapitres: ['s03'], dureeMin: 10,
  generer() {
    const sexe = pick(['XX', 'XY']), tri21 = pick([true, false]);
    const c = schemaCaryotype({ sexe, tri21 });
    return {
      contexte: "<p>Au cours d'une grossesse, un médecin fait réaliser le caryotype d'une cellule du futur enfant : les chromosomes sont photographiés puis classés par paires et par taille.</p>",
      figure: (h) => { h.innerHTML = c.svg; },
      questions: [
        { enonce: '<p><strong>1.</strong> Où se trouvent les chromosomes dans une cellule ?</p>', points: 2, choix: ['dans le noyau', 'dans la membrane', 'dans le cytoplasme', "à l'extérieur de la cellule"], correct: 0, corrige: '<p>Les chromosomes sont dans le <strong>noyau</strong>.</p>' },
        { enonce: '<p><strong>2.</strong> Combien de chromosomes compte ce caryotype ?</p>', points: 3, ...n(c.nombre), corrige: `<p>${tri21 ? '22 paires, un chromosome 21 supplémentaire et 2 chromosomes sexuels' : '23 paires'} : <strong>${c.nombre} chromosomes</strong>.</p>` },
        { enonce: '<p><strong>3.</strong> Le futur enfant est :</p>', points: 2, choix: ['une fille', 'un garçon'], correct: sexe === 'XX' ? 0 : 1, fixe: true, corrige: `<p>Chromosomes sexuels ${sexe === 'XX' ? 'X et X : <strong>une fille</strong>' : 'X et Y : <strong>un garçon</strong>'}.</p>` },
        { enonce: '<p><strong>4.</strong> Ce caryotype :</p>', points: 3, choix: ['ne présente pas d\'anomalie', 'présente une trisomie 21', 'présente un chromosome en moins'], correct: tri21 ? 1 : 0, fixe: true, corrige: tri21 ? '<p>Il y a trois chromosomes 21 : c\'est une <strong>trisomie 21</strong>.</p>' : '<p>Chaque paire compte deux chromosomes : <strong>pas d\'anomalie</strong>.</p>' },
        { enonce: '<p><strong>5.</strong> Le fait qu\'un chromosome en trop modifie plusieurs caractères montre que :</p>', points: 2, choix: ["les chromosomes portent l'information génétique", 'les chromosomes sont inutiles', "l'environnement détermine tous les caractères", 'les caractères ne sont pas héréditaires'], correct: 0, corrige: "<p>Les chromosomes sont le support de l'<strong>information génétique</strong>.</p>" },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  3. Le climat qui change — CO₂, température, effet de serre
// ---------------------------------------------------------------------
const P_CLIMAT = {
  id: 'bv_climat', titre: 'Le CO₂ et le climat', domaine: 'Planète Terre', chapitres: ['s01'], dureeMin: 12,
  generer() {
    const mesures = [[1960, 317, 0.3], [1980, 339, 0.4], [2000, 370, 0.7], [2020, 414, 1.2]];
    const [an, ppm] = pick(mesures.slice(1)), d = pick([300, 500, 800]);
    return {
      contexte: `<p>Le graphique donne la teneur de l'air en dioxyde de carbone (CO₂), en ppm, mesurée à Mauna Loa. Sur la même période, la température moyenne mondiale a augmenté : la décennie 2011-2020 a été plus chaude d'environ 1,1 °C que la période 1850-1900.</p>`,
      figure: (h) => { h.innerHTML = schemaCourbe(mesures.map((m) => [m[0], m[1]]), { xLabel: 'année', yLabel: 'CO₂ (ppm)', ymin: 300, ymax: 420 }); },
      questions: [
        { enonce: `<p><strong>1.</strong> Quelle était la teneur en CO₂ en ${an} ?</p>`, points: 2, ...n(ppm, { tolerance: 3, unite: 'ppm' }), corrige: `<p>On lit <strong>${ppm} ppm</strong>.</p>` },
        { enonce: '<p><strong>2.</strong> De combien de ppm cette teneur a-t-elle augmenté entre 1960 et 2020 ?</p>', points: 3, ...n(97, { tolerance: 4, unite: 'ppm' }), corrige: '<p>414 − 317 = <strong>97 ppm</strong>.</p>' },
        { enonce: '<p><strong>3.</strong> Le CO₂ est un gaz à effet de serre, c\'est-à-dire qu\'il :</p>', points: 2, choix: ['retient une partie de la chaleur émise par la surface de la Terre', 'arrête la lumière du Soleil', 'détruit la couche d\'ozone', 'refroidit l\'atmosphère'], correct: 0, corrige: '<p>Il <strong>retient la chaleur</strong> renvoyée par le sol.</p>' },
        { enonce: '<p><strong>4.</strong> La hausse du CO₂ depuis 1960 vient principalement :</p>', points: 2, choix: ['de la combustion du charbon, du pétrole et du gaz', 'des éruptions volcaniques', 'de la respiration des animaux', 'de la fonte des glaces'], correct: 0, corrige: '<p>Elle vient de la combustion des <strong>énergies fossiles</strong>.</p>' },
        { enonce: `<p><strong>5.</strong> D'après l'ADEME, parcourir 100 km en voiture thermique émet environ 11 kg de CO₂. Quelle masse de CO₂ émet un trajet de ${d} km ?</p>`, points: 3, ...n((d * 11) / 100, { unite: 'kg' }), indice: `${d} km = ${d / 100} × 100 km.`, corrige: `<p>${d / 100} × 11 = <strong>${dec((d * 11) / 100)} kg</strong>.</p>` },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  4. Les phalènes du bouleau — sélection naturelle
// ---------------------------------------------------------------------
const P_PHALENES = {
  id: 'bv_phalenes', titre: 'Les phalènes du bouleau', domaine: 'Évolution', chapitres: ['s06'], dureeMin: 12,
  generer() {
    const total = pick([200, 250, 400]), pct = pick([80, 90]), sombres = (total * pct) / 100, avant = randInt(2, 6);
    return {
      contexte: `<p>La phalène du bouleau est un papillon de nuit qui se pose le jour sur les troncs, où les oiseaux la chassent. Il en existe une forme claire et une forme sombre ; la couleur est héréditaire. Dans une forêt (cas inventé pour l'exercice), les troncs étaient clairs avant l'installation d'usines ; leur fumée les a ensuite noircis. On capture alors <strong>${total} phalènes</strong>, dont <strong>${sombres} sombres</strong>.</p>`,
      figure: (h) => { h.innerHTML = schemaBarres([['troncs clairs', avant], ['troncs noircis', pct]], { unite: 'phalènes sombres (%)' }); },
      questions: [
        { enonce: '<p><strong>1.</strong> Calcule le pourcentage de phalènes sombres une fois les troncs noircis.</p>', points: 3, ...n(pct, { unite: '%' }), indice: 'Nombre de sombres ÷ nombre total × 100.', corrige: `<p>${sombres} ÷ ${total} × 100 = <strong>${pct} %</strong>.</p>` },
        { enonce: '<p><strong>2.</strong> Sur les troncs noircis, quels papillons les oiseaux repèrent-ils le plus facilement ?</p>', points: 2, choix: ['les clairs, sur les troncs noircis', 'les sombres, sur les troncs noircis', 'ni les uns ni les autres'], correct: 0, corrige: '<p>Sur un tronc noirci, les <strong>clairs</strong> se voient.</p>' },
        { enonce: '<p><strong>3.</strong> La forme sombre existait-elle déjà quand les troncs étaient clairs ?</p>', points: 2, choix: ['oui, en faible proportion', 'non, elle est apparue à cause de la fumée', 'oui, elle était majoritaire'], correct: 0, corrige: `<p>Oui : elle représentait déjà ${avant} % de la population. La pollution ne l'a pas créée.</p>` },
        { enonce: '<p><strong>4.</strong> Pourquoi la forme sombre est-elle devenue majoritaire ?</p>', points: 4, choix: ['les sombres, moins mangées, ont eu plus de descendants', 'les claires ont foncé au contact de la fumée', 'les papillons ont choisi de devenir sombres', 'les oiseaux ont disparu'], correct: 0, corrige: '<p>Mieux camouflées, les sombres <strong>survivent et se reproduisent davantage</strong> : leur allèle devient plus fréquent.</p>' },
        { enonce: '<p><strong>5.</strong> Ce mécanisme s\'appelle :</p>', points: 1, choix: ['la sélection naturelle', 'la mutation', 'la fécondation', 'la phagocytose'], correct: 0, corrige: '<p>C\'est la <strong>sélection naturelle</strong>.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  5. Le rappel de vaccin — anticorps, mémoire immunitaire
// ---------------------------------------------------------------------
const P_VACCIN = {
  id: 'bv_vaccin', titre: 'Le rappel de vaccin', domaine: 'Corps humain et santé', chapitres: ['s09'], dureeMin: 12,
  generer() {
    const m1 = pick([8, 10, 12]), k = pick([5, 8, 10]), m2 = m1 * k;
    const pts = [[0, 0], [7, 0], [14, m1], [28, m1 / 2], [30, m1 / 2], [33, m2 * 0.6], [36, m2], [50, m2 * 0.8]];
    return {
      contexte: "<p>Lors d'un essai, on injecte un vaccin contre le tétanos au jour 0, puis un rappel au jour 30. On suit la quantité d'anticorps antitétaniques dans le sang (unité arbitraire).</p>",
      figure: (h) => { h.innerHTML = schemaCourbe(pts, { xLabel: 'jours', yLabel: "quantité d'anticorps", ymin: 0, ymax: m2 }); },
      questions: [
        { enonce: '<p><strong>1.</strong> Quelles cellules fabriquent les anticorps ?</p>', points: 2, choix: ['les lymphocytes B', 'les lymphocytes T', 'les phagocytes', 'les globules rouges'], correct: 0, corrige: '<p>Les <strong>lymphocytes B</strong>.</p>' },
        { enonce: '<p><strong>2.</strong> Combien de jours après la première injection les anticorps commencent-ils à apparaître ?</p>', points: 2, ...n(7, { tolerance: 1 }), corrige: '<p>La courbe décolle au <strong>jour 7</strong>.</p>' },
        { enonce: '<p><strong>3.</strong> Par combien la quantité maximale d\'anticorps est-elle multipliée après le rappel ?</p>', points: 3, ...n(k, { tolerance: 0.4 }), indice: 'Lis le sommet de chaque bosse, puis divise.', corrige: `<p>${m2} ÷ ${m1} = <strong>${k}</strong> fois plus.</p>` },
        { enonce: '<p><strong>4.</strong> La seconde réponse est plus rapide et plus forte grâce :</p>', points: 3, choix: ['aux cellules mémoire formées après la première injection', 'à la phagocytose', 'aux antibiotiques', 'au hasard'], correct: 0, corrige: '<p>Les <strong>cellules mémoire</strong> reconnaissent tout de suite l\'antigène.</p>' },
        { enonce: '<p><strong>5.</strong> Ce vaccin protège-t-il aussi contre la grippe ?</p>', points: 2, choix: ['non : la mémoire immunitaire est spécifique d\'un antigène', 'oui : un vaccin protège de toutes les maladies', 'oui, pendant un mois'], correct: 0, corrige: '<p>Non : les anticorps antitétaniques ne reconnaissent que l\'antigène du tétanos.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  6. Une plaie infectée — multiplication des bactéries, antibiogramme
// ---------------------------------------------------------------------
const P_ANTIBIO = {
  id: 'bv_antibio', titre: 'Une plaie infectée', domaine: 'Corps humain et santé', chapitres: ['s08'], dureeMin: 12,
  generer() {
    const div = pick([4, 5, 6]), diam = melanger([0, pick([6, 8]), pick([12, 14]), pick([20, 24])]);
    const zones = ['A', 'B', 'C', 'D'].map((nom, i) => [nom, diam[i]]);
    const meilleur = zones.reduce((a, b) => (b[1] > a[1] ? b : a))[0], lettres = ['A', 'B', 'C', 'D'].map((l) => `antibiotique ${l}`);
    return {
      contexte: `<p>En tombant, Elias s'est ouvert le genou. Deux jours plus tard, la plaie est rouge, chaude, gonflée et douloureuse. Le médecin fait analyser la bactérie en cause et demande un antibiogramme : quatre pastilles d'antibiotiques sont déposées sur une culture de cette bactérie.</p>`,
      figure: (h) => { h.innerHTML = schemaAntibiogramme(zones); },
      questions: [
        { enonce: '<p><strong>1.</strong> Rougeur, chaleur, gonflement et douleur sont les signes :</p>', points: 2, choix: ['de la réaction inflammatoire', 'de la vaccination', 'd\'une mutation', 'de la cicatrisation'], correct: 0, corrige: '<p>Ce sont les quatre signes de la <strong>réaction inflammatoire</strong>.</p>' },
        { enonce: `<p><strong>2.</strong> Cette bactérie se divise en deux toutes les 20 minutes. En partant d'une seule bactérie, combien y en a-t-il après ${div} divisions ?</p>`, points: 3, ...n(2 ** div), indice: 'Le nombre double à chaque division.', corrige: `<p>${Array.from({ length: div + 1 }, (_, i) => 2 ** i).join(' → ')} : <strong>${2 ** div} bactéries</strong>.</p>` },
        { enonce: '<p><strong>3.</strong> Quelles cellules ingèrent et digèrent les bactéries dans la plaie ?</p>', points: 2, choix: ['les phagocytes', 'les lymphocytes B', 'les globules rouges', 'les neurones'], correct: 0, corrige: '<p>Les <strong>phagocytes</strong>, par phagocytose.</p>' },
        { enonce: "<p><strong>4.</strong> D'après l'antibiogramme, quel antibiotique le médecin doit-il prescrire ?</p>", points: 3, choix: lettres, correct: 'ABCD'.indexOf(meilleur), fixe: true, corrige: `<p>La zone claire la plus large entoure la pastille <strong>${meilleur}</strong>.</p>` },
        { enonce: '<p><strong>5.</strong> Elias doit suivre son traitement jusqu\'au bout pour :</p>', points: 2, choix: ['éviter que des bactéries survivantes, plus résistantes, se multiplient', 'devenir lui-même résistant aux antibiotiques', 'fabriquer des cellules mémoire', 'détruire les virus'], correct: 0, corrige: '<p>Un traitement interrompu laisse survivre les bactéries les plus <strong>résistantes</strong>.</p>' },
      ],
    };
  },
};

export const PROBLEMES = [P_GROUPES, P_CARYOTYPE, P_CLIMAT, P_PHALENES, P_VACCIN, P_ANTIBIO];

/** Construit une instance d'un problème (ajoute le barème total). */
export function genererProbleme(pb) {
  const inst = pb.generer();
  inst.id = pb.id; inst.titre = pb.titre; inst.domaine = pb.domaine;
  inst.chapitres = pb.chapitres; inst.dureeMin = pb.dureeMin;
  inst.baremeTotal = inst.questions.reduce((s, q) => s + (q.points || 1), 0);
  return inst;
}
