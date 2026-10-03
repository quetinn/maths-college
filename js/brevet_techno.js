// =====================================================================
//  brevet_techno.js — Problèmes type Brevet, partie technologie de
//  l'épreuve de sciences (10 points, 30 minutes au DNB depuis 2027).
//
//  Construits sur le modèle du sujet de référence publié par éduscol : un
//  objet technique, des documents, quatre temps (chaîne d'énergie ou
//  d'information, choix d'un constituant, protocole de test, programme).
//  Même schéma que brevet_sciences.js, avec une possibilité en plus :
//    - ouverte: true + modele : question à rédiger sur la feuille. Elle
//      n'est pas notée par le site ; à la correction, une réponse modèle
//      s'affiche pour comparer. Les questions guidées qui la précèdent
//      portent les points.
//  Les objets et toutes leurs caractéristiques sont des données d'exercice.
// =====================================================================

import { pick } from './engine.js';
import { tableau, scratch, dec } from './chapters/commun.js';
import { schemaBloc, schemaReseau, TRAJET_INTERNET } from './chapters/techno/figures.js';

const ouverte = (enonce, modele, corrige = '') => ({ enonce, ouverte: true, points: 0, modele, corrige });

// ---------------------------------------------------------------------
//  1. Le robot de désherbage — chaîne d'énergie, choix, protocole, programme
// ---------------------------------------------------------------------
const CHAINE_ROBOT = [
  { nom: 'batterie', role: 'alimenter' }, { nom: 'relais', role: 'distribuer' },
  { nom: 'moteur électrique', role: 'convertir' }, { nom: 'réducteur à engrenages', role: 'transmettre' },
];
const FLUX_ROBOT = ['énergie solaire (recharge)', 'énergie électrique', 'énergie électrique', 'énergie mécanique', 'énergie mécanique : roues'];

const P_ROBOT = {
  id: 'bt_robot', titre: 'Le robot de désherbage', domaine: "Chaîne d'énergie et programme", chapitres: ['t04', 't08', 't09'], dureeMin: 15,
  generer() {
    const tension = pick([12, 24]), vmin = pick([60, 90]), seuil = pick([20, 30]);
    const MOTEURS = [['M1', 12, 50, 18], ['M2', 12, 120, 24], ['M3', 24, 100, 27], ['M4', 24, 40, 15]];
    const choisi = MOTEURS.find((m) => m[1] === tension && m[2] >= vmin);
    const ordre = ['moteur électrique', 'batterie', 'réducteur à engrenages', 'relais'];
    const num = (nom) => ordre.indexOf(nom) + 1;
    return {
      contexte: `<p>Un maraîcher utilise un robot qui désherbe seul entre les rangs de légumes. Le robot possède un panneau solaire, une <strong>batterie de ${tension} V</strong>, un relais commandé par un microcontrôleur, un moteur électrique, un réducteur à engrenages qui entraîne les roues, et un capteur de distance à ultrasons.</p>
        <p>Schéma-bloc de sa chaîne d'énergie, à compléter :</p>${schemaBloc({ blocs: CHAINE_ROBOT, flux: FLUX_ROBOT, ordre, label: "Chaîne d'énergie du robot, à compléter" })}`,
      questions: [
        { enonce: `<p><strong>1. a.</strong> Quel constituant occupe le bloc repéré ${num('batterie')} (fonction « alimenter ») ?</p>`, points: 1, choix: ['la batterie', 'le relais', 'le capteur de distance', 'le moteur électrique'], correct: 0, corrige: '<p>La batterie stocke l\'énergie et la fournit : elle <strong>alimente</strong> la chaîne.</p>' },
        { enonce: `<p><strong>1. b.</strong> Quel constituant occupe le bloc repéré ${num('moteur électrique')} (fonction « convertir ») ?</p>`, points: 1, choix: ['le moteur électrique', 'le réducteur à engrenages', 'le relais', 'le microcontrôleur'], correct: 0, corrige: '<p>Le moteur <strong>convertit</strong> l\'énergie électrique en énergie mécanique.</p>' },
        { enonce: '<p><strong>1. c.</strong> Quel constituant du robot ne doit <em>pas</em> figurer dans la chaîne d\'énergie ?</p>', points: 1, choix: ['le capteur de distance', 'la batterie', 'le réducteur à engrenages', 'le relais'], correct: 0, corrige: '<p>Le capteur acquiert une information : il appartient à la <strong>chaîne d\'information</strong>.</p>' },
        ouverte('<p><strong>1. d.</strong> Sur ta feuille, dessine la chaîne d\'énergie complète du robot en schéma-bloc : un bloc par constituant, sa fonction, et la forme d\'énergie sur chaque flèche.</p>',
          schemaBloc({ blocs: CHAINE_ROBOT, flux: FLUX_ROBOT, label: "Chaîne d'énergie du robot" }),
          '<p>Vérifie trois points : l\'ordre des quatre fonctions, un constituant par bloc, une forme d\'énergie sur chaque flèche (électrique jusqu\'au moteur, mécanique après).</p>'),
        { enonce: `<p><strong>2.</strong> Le moteur doit fonctionner avec la batterie et faire tourner les roues à au moins <strong>${vmin} tr/min</strong>.</p>${tableau([['Moteur', ...MOTEURS.map((m) => m[0])], ['Tension (V)', ...MOTEURS.map((m) => m[1])], ['Vitesse en sortie de réducteur (tr/min)', ...MOTEURS.map((m) => m[2])], ['Prix (€)', ...MOTEURS.map((m) => m[3])]])}<p>Quel moteur faut-il choisir ?</p>`, points: 2, choix: MOTEURS.map((m) => `le moteur ${m[0]}`), correct: MOTEURS.indexOf(choisi), fixe: true, corrige: `<p>Deux moteurs fonctionnent en ${tension} V. Seul le <strong>moteur ${choisi[0]}</strong> atteint ${vmin} tr/min (${choisi[2]} tr/min).</p>` },
        ouverte('<p><strong>3.</strong> Le capteur de distance doit être précis à 5 % près. Sur ta feuille, propose un protocole pour le vérifier : matériel, schéma, étapes.</p>',
          `<p><strong>Matériel</strong> : le robot, un obstacle plat (une planche), un mètre ruban.</p>
           <p><strong>Étapes</strong> : 1. Placer l'obstacle face au capteur. 2. Mesurer la distance réelle au mètre ruban. 3. Relever la distance indiquée par le capteur. 4. Recommencer pour au moins trois distances. 5. Pour chaque distance, calculer l'écart en pourcentage. 6. Conclure : le capteur est conforme si tous les écarts sont inférieurs à 5 %.</p>`,
          '<p>Un protocole complet nomme la grandeur, l\'instrument, les étapes dans l\'ordre, le nombre de mesures et le critère de conclusion.</p>'),
        { enonce: `<p><strong>4. a.</strong> Le robot doit s'arrêter quand un obstacle est à moins de ${seuil} cm, et avancer sinon.</p>${scratch(['evt:quand le programme démarre', ['ctl:répéter indéfiniment', [['ctl:si distance < [ A ] alors', ['app:[ B ] le moteur'], 'sinon', ['app:mettre le moteur en marche']]]]])}<p>Quelle valeur faut-il écrire à la place de A ?</p>`, points: 2, validation: 'nombre', reponse: seuil, corrige: `<p>La condition compare la distance au seuil : A = <strong>${seuil}</strong>.</p>` },
        { enonce: '<p><strong>4. b.</strong> Que faut-il écrire à la place de B ?</p>', points: 1, choix: ['arrêter', 'mettre en marche', 'accélérer'], correct: 0, corrige: '<p>Quand l\'obstacle est trop proche, on <strong>arrête</strong> le moteur.</p>' },
        { enonce: `<p><strong>4. c.</strong> Le capteur mesure ${seuil + 15} cm. Que fait le robot ?</p>`, points: 2, choix: ['il avance', "il s'arrête", 'il recule'], correct: 0, corrige: `<p>$${seuil + 15} > ${seuil}$ : la condition est fausse, le programme exécute la branche « sinon » : le robot <strong>avance</strong>.</p>` },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  2. La serre connectée — chaîne d'information, données, programme
// ---------------------------------------------------------------------
const P_SERRE = {
  id: 'bt_serre', titre: 'La serre connectée du collège', domaine: "Chaîne d'information et données", chapitres: ['t05', 't08'], dureeMin: 15,
  generer() {
    const seuilT = pick([26, 28, 30]), seuilH = pick([30, 40]);
    const temp = seuilT + pick([-4, 3]), hum = seuilH + pick([-8, 12]);
    const ouvre = temp > seuilT, arrose = hum < seuilH;
    const releves = [seuilT - 5, seuilT - 1, seuilT + 2, seuilT + 4];
    return {
      contexte: `<p>La serre du club jardin est équipée d'un capteur de température, d'un capteur d'humidité du sol, d'un microcontrôleur, d'un écran, d'un moteur qui ouvre la fenêtre et d'une pompe d'arrosage.</p>
        <p>Comportement attendu : la fenêtre s'ouvre si la température dépasse <strong>${seuilT} °C</strong> ; la pompe arrose si l'humidité du sol est inférieure à <strong>${seuilH} %</strong>.</p>`,
      questions: [
        { enonce: '<p><strong>1. a.</strong> Quels constituants assurent la fonction « acquérir » ?</p>', points: 1, choix: ['les deux capteurs', "l'écran et la pompe", 'le microcontrôleur', 'le moteur de la fenêtre'], correct: 0, corrige: '<p>Les <strong>capteurs</strong> acquièrent les grandeurs physiques.</p>' },
        { enonce: '<p><strong>1. b.</strong> Quel constituant assure la fonction « traiter » ?</p>', points: 1, choix: ['le microcontrôleur', "l'écran", 'la pompe', 'le capteur de température'], correct: 0, corrige: '<p>Le <strong>microcontrôleur</strong> exécute le programme.</p>' },
        ouverte("<p><strong>1. c.</strong> Sur ta feuille, dessine la chaîne d'information de la serre en schéma-bloc.</p>",
          schemaBloc({ blocs: [{ nom: 'capteurs', role: 'acquérir' }, { nom: 'microcontrôleur', role: 'traiter' }, { nom: 'écran', role: 'communiquer' }], flux: ['température, humidité', 'signaux électriques', 'données à afficher', "information pour l'utilisateur"], label: "Chaîne d'information de la serre" }),
          '<p>Le microcontrôleur envoie aussi des <strong>ordres</strong> à la chaîne d\'énergie : au moteur de la fenêtre et à la pompe.</p>'),
        { enonce: `<p><strong>2. a.</strong> Le microcontrôleur enregistre ces relevés dans une table de données :</p>${tableau([['Heure', '8 h', '11 h', '14 h', '17 h'], ['Température (°C)', ...releves]])}<p>Combien de relevés dépassent le seuil de ${seuilT} °C ?</p>`, points: 1, validation: 'nombre', reponse: 2, corrige: `<p>${releves[2]} °C et ${releves[3]} °C dépassent ${seuilT} °C : <strong>2 relevés</strong>.</p>` },
        { enonce: '<p><strong>2. b.</strong> La donnée « fenêtre ouverte ou fermée » est de quel type ?</p>', points: 1, choix: ['booléen', 'nombre', 'chaîne de caractères'], correct: 0, corrige: '<p>Deux états seulement : c\'est un <strong>booléen</strong>.</p>' },
        { enonce: '<p><strong>2. c.</strong> La température est stockée sur un octet. Combien de valeurs différentes un octet peut-il coder ?</p>', points: 1, validation: 'nombre', reponse: 256, corrige: '<p>$2^8 = 256$ valeurs, de 0 à 255.</p>' },
        { enonce: `<p><strong>3. a.</strong> Le capteur mesure <strong>${temp} °C</strong> et une humidité de <strong>${hum} %</strong>. La fenêtre s'ouvre-t-elle ?</p>`, points: 1, choix: ['oui', 'non'], correct: ouvre ? 0 : 1, fixe: true, corrige: `<p>$${temp} ${ouvre ? '>' : '<'} ${seuilT}$ : la fenêtre ${ouvre ? "<strong>s'ouvre</strong>" : '<strong>reste fermée</strong>'}.</p>` },
        { enonce: '<p><strong>3. b.</strong> Avec ces mêmes mesures, la pompe arrose-t-elle ?</p>', points: 1, choix: ['oui', 'non'], correct: arrose ? 0 : 1, fixe: true, corrige: `<p>$${hum} ${arrose ? '<' : '>'} ${seuilH}$ : la pompe ${arrose ? '<strong>arrose</strong>' : "<strong>n'arrose pas</strong>"}.</p>` },
        { enonce: `<p><strong>3. c.</strong> On veut ajouter une alerte : un voyant s'allume s'il fait trop chaud <em>et</em> que le sol est trop sec. Quelle condition faut-il programmer ?</p>`, points: 2, choix: [`température > ${seuilT} ET humidité < ${seuilH}`, `température > ${seuilT} OU humidité < ${seuilH}`, `NON (température > ${seuilT})`], correct: 0, corrige: '<p>Les deux conditions doivent être vraies en même temps : on utilise l\'opérateur <strong>ET</strong>.</p>' },
        ouverte("<p><strong>4.</strong> Sur ta feuille, écris en langage courant l'algorithme complet de la serre (fenêtre, pompe et alerte).</p>",
          `<p>Répéter indéfiniment :</p><p>— lire la température et l'humidité ;</p><p>— si température > ${seuilT}, ouvrir la fenêtre, sinon la fermer ;</p><p>— si humidité < ${seuilH}, mettre la pompe en marche, sinon l'arrêter ;</p><p>— si température > ${seuilT} ET humidité < ${seuilH}, allumer le voyant, sinon l'éteindre.</p>`,
          '<p>Vérifie que ton algorithme relit les capteurs en boucle et qu\'il prévoit un « sinon » pour chaque action.</p>'),
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  3. La station météo connectée — réseau, adresses, débit
// ---------------------------------------------------------------------
const P_METEO = {
  id: 'bt_meteo', titre: 'La station météo connectée', domaine: 'Réseaux et Internet', chapitres: ['t06', 't03'], dureeMin: 15,
  generer() {
    const dernier = pick([34, 47, 58]), debit = pick([2, 4, 8]), taille = pick([1, 2, 4]);
    const duree = (taille * 8) / debit;
    const ordre = ['serveur', 'terminal', "routeur d'Internet", 'commutateur', 'routeur de la maison (box)'];
    const num = (nom) => ordre.indexOf(nom) + 1;
    return {
      contexte: `<p>Une station météo installée dans la cour du collège envoie ses mesures à un serveur. Les élèves consultent ensuite les relevés sur une page web. Dans le réseau local du collège, les adresses commencent par <strong>192.168.5</strong>.</p>
        <p>Trajet des données, de la station au serveur :</p>${schemaReseau(ordre)}`,
      questions: [
        { enonce: `<p><strong>1. a.</strong> La station météo est le terminal, repéré ${num('terminal')}. Quel appareil porte le repère ${num('commutateur')} ?</p>`, points: 1, choix: ['le commutateur', 'un routeur', 'le serveur'], correct: 0, corrige: '<p>Dans le réseau local, le terminal est relié au <strong>commutateur</strong>.</p>' },
        { enonce: `<p><strong>1. b.</strong> Quel est le rôle de l'appareil repéré ${num('routeur de la maison (box)')} ?</p>`, points: 1, choix: ['relier le réseau local du collège à Internet', 'stocker les pages du site', 'mesurer la température'], correct: 0, corrige: '<p>C\'est le <strong>routeur</strong> du collège : il relie le réseau local aux autres réseaux.</p>' },
        { enonce: '<p><strong>2. a.</strong> Laquelle de ces adresses IP peut être attribuée à la station ?</p>', points: 2, choix: [`192.168.5.${dernier}`, `192.168.5.${dernier + 250}`, '192.168.5', `192.168.9.${dernier}`], correct: 0, corrige: `<p>L'adresse doit comporter quatre nombres de 0 à 255 et commencer par 192.168.5 : <strong>192.168.5.${dernier}</strong>.</p>` },
        { enonce: `<p><strong>2. b.</strong> Un ordinateur du collège a déjà l'adresse 192.168.5.${dernier}. Que se passe-t-il si l'on donne la même à la station ?</p>`, points: 1, choix: ['les deux machines ne peuvent plus être distinguées : la communication échoue', 'la station fonctionne deux fois plus vite', 'rien de particulier'], correct: 0, corrige: '<p>Une adresse IP doit identifier <strong>une seule machine</strong> du réseau.</p>' },
        { enonce: `<p><strong>3. a.</strong> La station envoie chaque jour un fichier de <strong>${taille} Mo</strong>. Quelle est sa taille en mégabits ?</p>`, points: 1, validation: 'nombre', reponse: taille * 8, corrige: `<p>1 octet = 8 bits : $${taille} \\times 8 = ${taille * 8}$ Mbit.</p>` },
        { enonce: `<p><strong>3. b.</strong> La liaison a un débit de <strong>${debit} Mbit/s</strong>. Combien de secondes l'envoi dure-t-il ?</p>`, points: 2, validation: 'nombre', reponse: duree, unite: 's', corrige: `<p>Durée : $${taille * 8} \\div ${debit} = ${String(duree).replace('.', '{,}')}$ s.</p>` },
        { enonce: '<p><strong>4. a.</strong> Le site demande un compte pour consulter les relevés. Quel mot de passe est le plus sûr ?</p>', points: 1, choix: ['une phrase longue, utilisée pour ce seul site', 'le nom du collège', '123456', 'le même mot de passe que pour la messagerie'], correct: 0, corrige: '<p>Un mot de passe sûr est <strong>long</strong> et <strong>différent pour chaque service</strong>.</p>' },
        { enonce: '<p><strong>4. b.</strong> La station publie sa position précise. De quel type de donnée s\'agit-il ?</p>', points: 1, choix: ['une donnée de géolocalisation', 'un témoin de connexion', 'un mot de passe'], correct: 0, corrige: '<p>La position est une donnée de <strong>géolocalisation</strong> ; pour une personne, c\'est une donnée personnelle.</p>' },
        ouverte("<p><strong>5.</strong> Sur ta feuille, explique en trois ou quatre phrases comment les mesures voyagent de la station jusqu'au serveur.</p>",
          `<p>La station, qui est un terminal, envoie ses mesures découpées en paquets. Le commutateur du réseau local les transmet au routeur du collège. Celui-ci les envoie sur Internet, où chaque routeur consulte sa table de routage pour choisir le routeur suivant. De proche en proche, les paquets atteignent le serveur, qui les enregistre.</p>`,
          `<p>Mots attendus : ${TRAJET_INTERNET.slice(0, 2).join(', ')}, routeur, paquets, table de routage, serveur.</p>`),
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  4. La trottinette du collège — choisir, réparer, valider
// ---------------------------------------------------------------------
const P_TROTTINETTE = {
  id: 'bt_trottinette', titre: 'Choisir et réparer une trottinette électrique', domaine: 'Choix, réparation, validation', chapitres: ['t02', 't07', 't09'], dureeMin: 15,
  generer() {
    const pa = pick([280, 320]), pb = pa + pick([60, 80]), da = 3, db = 6;
    const u = pick([24, 36]), attendu = pick([20, 25]), ecartP = pick([4, 8, 12]);
    const mesure = attendu * (1 - ecartP / 100), ok = ecartP <= 10;
    const v = (x) => String(Math.round(x * 100) / 100).replace('.', ',');
    return {
      contexte: `<p>Un collège veut acheter des trottinettes électriques pour ses agents. Il compare deux modèles :</p>
        ${tableau([['Modèle', 'A', 'B'], ["Prix d'achat (€)", pa, pb], ['Durée de vie estimée (ans)', da, db], ['Indice de réparabilité (sur 10)', dec(4.8), dec(8.1)], ['Batterie', 'collée', 'démontable, fixée par vis']])}`,
      questions: [
        { enonce: `<p><strong>1. a.</strong> Le collège veut s'équiper pour ${db} ans. Combien dépense-t-il avec le modèle A, qu'il faut racheter quand il est hors d'usage ?</p>`, points: 2, validation: 'nombre', reponse: pa * (db / da), unite: '€', corrige: `<p>Il faut $${db} \\div ${da} = ${db / da}$ trottinettes A : $${db / da} \\times ${pa} = ${pa * (db / da)}$ €.</p>` },
        { enonce: `<p><strong>1. b.</strong> Sur ${db} ans, quel modèle revient le moins cher ?</p>`, points: 1, choix: ['le modèle B', 'le modèle A', 'les deux coûtent autant'], correct: 0, corrige: `<p>B coûte ${pb} €, contre ${pa * (db / da)} € pour deux modèles A : <strong>B</strong> revient moins cher.</p>` },
        { enonce: '<p><strong>1. c.</strong> Quel modèle sera le plus facile à réparer ?</p>', points: 1, choix: ['le modèle B : meilleur indice et batterie démontable', 'le modèle A : il est moins cher', 'les deux se valent'], correct: 0, corrige: '<p>Indice de 8,1 contre 4,8, et une batterie fixée par vis : un assemblage <strong>démontable</strong> facilite la réparation.</p>' },
        ouverte('<p><strong>1. d.</strong> Sur ta feuille, justifie le choix du modèle B en t\'appuyant sur le cycle de vie et sur au moins deux piliers du développement durable.</p>',
          `<p>Le modèle B dure deux fois plus longtemps et se répare mieux : il faut fabriquer une seule trottinette au lieu de deux, ce qui économise des matières premières et réduit les déchets (pilier environnemental). Sur ${db} ans, il coûte ${pb} € contre ${pa * (db / da)} € pour deux modèles A (pilier économique). Sa batterie démontable peut être remplacée par un atelier local (pilier social).</p>`),
        { enonce: `<p><strong>2. a.</strong> Une trottinette ne démarre plus. On mesure, trottinette en marche :</p>${tableau([['Point de mesure', 'bornes de la batterie', 'sortie du relais', 'bornes du moteur'], ['Tension (V)', u, u, u]])}<p>Quel constituant est défectueux ?</p>`, points: 2, choix: ['le moteur', 'la batterie', 'le relais'], correct: 0, corrige: `<p>Le moteur reçoit bien ${u} V et ne tourne pas : c'est le <strong>moteur</strong> qui est en cause.</p>` },
        { enonce: '<p><strong>2. b.</strong> Avant de démonter le moteur, que faut-il faire ?</p>', points: 1, choix: ["couper l'alimentation en débranchant la batterie", 'accélérer à fond', 'mouiller les contacts'], correct: 0, corrige: '<p>Première règle de sécurité : <strong>couper l\'alimentation</strong>.</p>' },
        { enonce: `<p><strong>3. a.</strong> Après réparation, le cahier des charges exige une vitesse de ${attendu} km/h, à 10 % près. On mesure ${v(mesure)} km/h. Quel est l'écart, en pourcentage de la valeur attendue ?</p>`, points: 2, validation: 'nombre', reponse: ecartP, unite: '%', tolerance: 0.05, corrige: `<p>Écart : $${attendu} - ${v(mesure).replace(',', '{,}')} = ${v(attendu - mesure).replace(',', '{,}')}$ km/h, soit $${v(attendu - mesure).replace(',', '{,}')} \\div ${attendu} \\times 100 = ${ecartP}\\ \\%$.</p>` },
        { enonce: '<p><strong>3. b.</strong> La réparation est-elle validée ?</p>', points: 1, choix: ['oui', 'non'], correct: ok ? 0 : 1, fixe: true, corrige: `<p>${ecartP} % est ${ok ? 'inférieur' : 'supérieur'} à 10 % : la réparation ${ok ? 'est <strong>validée</strong>' : "<strong>n'est pas validée</strong>, il faut chercher une autre cause"}.</p>` },
        ouverte('<p><strong>4.</strong> Sur ta feuille, propose un protocole pour mesurer la vitesse de la trottinette dans la cour.</p>',
          '<p><strong>Matériel</strong> : un mètre ruban ou un décamètre, deux plots, un chronomètre.</p><p><strong>Étapes</strong> : 1. Placer deux plots à 20 m l\'un de l\'autre. 2. Lancer la trottinette avant le premier plot pour qu\'elle ait atteint sa vitesse. 3. Déclencher le chronomètre au premier plot, l\'arrêter au second. 4. Recommencer trois fois et calculer la durée moyenne. 5. Calculer la vitesse : distance ÷ durée, puis convertir en km/h (× 3,6). 6. Comparer à l\'exigence et conclure.</p>'),
      ],
    };
  },
};

export const PROBLEMES = [P_ROBOT, P_SERRE, P_METEO, P_TROTTINETTE];

/** Construit une instance d'un problème (ajoute le barème total : les questions ouvertes ne comptent pas). */
export function genererProbleme(pb) {
  const inst = pb.generer();
  inst.id = pb.id; inst.titre = pb.titre; inst.domaine = pb.domaine;
  inst.chapitres = pb.chapitres; inst.dureeMin = pb.dureeMin;
  inst.baremeTotal = inst.questions.reduce((s, q) => s + (q.ouverte ? 0 : (q.points || 1)), 0);
  return inst;
}
