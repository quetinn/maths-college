// =====================================================================
//  t06_internet.js — Technologie 3ᵉ : Internet, adresses, routage, débit.
//  Repères de 3ᵉ du programme de 2024 : identifier et représenter la
//  circulation d'une information dans le réseau Internet, justifier la
//  nécessité d'un protocole de routage (table de routage donnée).
//  Valeurs réelles (structure d'une adresse IPv4, octet) : voir sources.js.
//  Les adresses, débits et tailles de fichiers sont des données d'exercice ;
//  dans les réseaux locaux étudiés, les trois premiers nombres de l'adresse
//  désignent le réseau.
// =====================================================================

import { pick, randInt, dec, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoLegender, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { schemaReseau, schemaAdresseIP, TRAJET_INTERNET } from '../figures.js';

const DEFINITIONS = [
  ['un réseau local', "Ensemble de terminaux reliés entre eux dans un même lieu : une maison, un collège."],
  ['Internet', 'Réseau mondial formé de très nombreux réseaux reliés entre eux par des routeurs.'],
  ['un terminal', "Appareil placé au bout du réseau, qui envoie ou reçoit des données : ordinateur, téléphone, objet connecté."],
  ['un commutateur', "Appareil qui relie les terminaux d'un même réseau local et transmet les données au bon destinataire."],
  ['un routeur', 'Appareil qui relie plusieurs réseaux et choisit le chemin que suivent les données.'],
  ['un serveur', "Ordinateur qui fournit un service à d'autres machines : pages d'un site, messagerie, vidéos."],
  ['une adresse IP', "Numéro qui identifie une machine sur un réseau : quatre nombres de 0 à 255 séparés par des points."],
  ['une table de routage', "Liste qui indique à un routeur vers quel voisin envoyer les données, selon le réseau de destination."],
  ['le débit', "Quantité de données transmises chaque seconde, exprimée en bits par seconde."],
  ['un paquet', "Petit bloc de données : un message est découpé en paquets qui voyagent séparément."],
];

/** Une adresse (données d'exercice) et sa validité. */
function adresse() {
  const cas = pick(['ok', 'ok', 'grand', 'court', 'long']);
  const n = () => randInt(0, 255);
  if (cas === 'ok') return [`192.168.${randInt(0, 9)}.${n()}`, true, 'Quatre nombres, tous compris entre 0 et 255.'];
  if (cas === 'grand') return [`192.168.${randInt(0, 9)}.${randInt(256, 420)}`, false, 'Un des nombres dépasse 255.'];
  if (cas === 'court') return [`10.${n()}.${n()}`, false, 'Il n\'y a que trois nombres : il en faut quatre.'];
  return [`172.${randInt(16, 31)}.${n()}.${n()}.${n()}`, false, 'Il y a cinq nombres : il en faut quatre.'];
}

export default {
  id: 't06',
  titre: 'Internet : adresses, routage, débit',
  theme: 'tk_structure', niveau: '3e',
  icone: '🛰️',

  intro:
    "Tu demandes une page, et une seconde plus tard elle s'affiche, envoyée par une machine située parfois à des milliers de kilomètres. " +
    "Entre les deux, tes données ont traversé plusieurs réseaux. Ce chapitre explique comment elles trouvent leur chemin.",

  cours: [
    {
      type: 'definition', titre: 'Du réseau local à Internet',
      contenu: "Dans un <strong>réseau local</strong>, les <strong>terminaux</strong> sont reliés par un <strong>commutateur</strong>, par câble ou en Wi-Fi. Un <strong>routeur</strong> (la box, à la maison) relie ce réseau aux autres. <strong>Internet</strong> est l'ensemble de ces réseaux, reliés par des routeurs. Les services sont fournis par des <strong>serveurs</strong>.",
    },
    {
      type: 'figure', titre: "Le trajet d'une requête",
      contenu: 'La demande part du terminal, traverse le réseau local, puis passe de routeur en routeur jusqu\'au serveur. La réponse fait le chemin inverse.',
      render: (host) => { host.innerHTML = schemaReseau(); },
    },
    {
      type: 'definition', titre: "L'adresse IP",
      contenu: "Pour communiquer, chaque machine doit être identifiée par une <strong>adresse IP</strong> : quatre nombres de <strong>0 à 255</strong> séparés par des points, par exemple 192.168.1.20. Chaque nombre tient sur un octet. Deux machines d'un même réseau ne peuvent pas avoir la même adresse.",
    },
    {
      type: 'figure', titre: "Lire une adresse IP", contenu: "Dans les réseaux locaux étudiés ici, les trois premiers nombres désignent le réseau et le dernier la machine.",
      render: (host) => { host.innerHTML = schemaAdresseIP(); },
    },
    {
      type: 'propriete', titre: 'Paquets et routage',
      contenu: "Un message est découpé en <strong>paquets</strong>. Chaque paquet porte l'adresse de l'expéditeur et celle du destinataire. À chaque routeur, une <strong>table de routage</strong> indique vers quel voisin l'envoyer. Les routeurs appliquent tous les mêmes règles, un <strong>protocole</strong> : sans lui, des réseaux différents ne pourraient pas se comprendre. Si une liaison tombe en panne, les paquets passent par un autre chemin.",
    },
    {
      type: 'propriete', titre: 'Le débit',
      contenu: "Le <strong>débit</strong> est la quantité de données transmises par seconde, en bits par seconde (bit/s). On utilise le mégabit par seconde : 1 Mbit/s = 1 000 000 bit/s. Attention aux unités : la taille d'un fichier est en <strong>octets</strong>, et 1 octet = 8 bits. Durée de transfert = taille en bits ÷ débit.",
    },
    {
      type: 'exemple', enonce: 'Combien de temps faut-il pour télécharger un fichier de 50 Mo avec un débit de 100 Mbit/s ?',
      solution_etapes: ['On convertit la taille en mégabits : $50 \\times 8 = 400$ Mbit.', 'Durée : $400 \\div 100 = 4$ s.', 'Le téléchargement dure 4 secondes.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer les deux extrémités', explication: 'Quel terminal envoie ? Quel serveur répond ? Note leurs adresses IP.' },
    { etape: 2, titre: 'Suivre le chemin', explication: 'Terminal, commutateur, routeur du réseau local, routeurs d\'Internet, serveur.' },
    { etape: 3, titre: 'Lire la table de routage', explication: 'Cherche la ligne du réseau de destination : elle donne le routeur suivant.' },
    { etape: 4, titre: 'Calculer une durée', explication: 'Convertis la taille en bits (× 8), puis divise par le débit.' },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Commutateur : dans un réseau.', 'Routeur : entre des réseaux.', 'Serveur : il fournit un service.']),

    exoRelier('e02', 1, 'Associe chaque appareil à son rôle.', [
      ['un terminal', 'envoyer ou recevoir des données'], ['un commutateur', "relier les terminaux d'un même réseau local"], ['un routeur', 'relier des réseaux et choisir un chemin'], ['un serveur', 'fournir un service à d\'autres machines'], ['une carte réseau', 'connecter un terminal au réseau'],
    ], ['Le routeur route : il choisit une route.', 'Le commutateur reste dans le réseau local.', 'Le serveur sert.'], 4),

    exoVraiFaux('e03', 1, [
      ['Une adresse IP comporte quatre nombres.', true, 'Oui : quatre nombres séparés par des points.'],
      ['Dans une adresse IP, un nombre peut valoir 300.', false, 'Non : chaque nombre va de 0 à 255, car il tient sur un octet.'],
      ['Deux machines du même réseau peuvent avoir la même adresse IP.', false, "Non : l'adresse doit identifier une seule machine."],
      ['Un routeur relie plusieurs réseaux entre eux.', true, 'Oui : c\'est son rôle.'],
      ['Un message voyage en un seul bloc sur Internet.', false, 'Non : il est découpé en paquets.'],
      ['Tous les paquets d\'un message suivent forcément le même chemin.', false, 'Non : chaque routeur choisit le chemin, qui peut changer si une liaison est en panne.'],
      ['Le débit se mesure en bits par seconde.', true, 'Oui, et on utilise souvent le mégabit par seconde.'],
      ['Un octet vaut 8 bits.', true, 'Oui : il faut en tenir compte dans un calcul de durée.'],
    ], ['Chaque nombre d\'une adresse tient sur un octet.', 'Un message est découpé en paquets.', 'Débit : des bits par seconde.']),

    {
      id: 'e04', niveau: 2, type: 'vrai_faux', consigne: 'Cette adresse IP est-elle valide ?',
      generer() { const [a, ok, pourquoi] = adresse(); return { enonce: `L'adresse <strong>${a}</strong> est une adresse IP valide.`, reponse: ok, _v: { pourquoi } }; },
      indices: ['Compte les nombres : il en faut quatre.', 'Chaque nombre doit être compris entre 0 et 255.', 'Les nombres sont séparés par des points.'],
      correction_detaillee: (st) => `<p>${st._v.pourquoi} L'adresse est donc <strong>${st.reponse ? 'valide' : 'invalide'}</strong>.</p>`,
    },

    exoLegender('e05', 2, "Retrouve chaque élément du trajet d'une requête.", TRAJET_INTERNET, (ordre) => schemaReseau(ordre),
      ['table de routage'], ['La requête part de la gauche.', 'Le réseau local est encadré en pointillés.', 'Les routeurs sont dessinés par des cercles.'],
      { terminal: 'il envoie la requête', commutateur: 'il relie les terminaux du réseau local', 'routeur de la maison (box)': 'il relie le réseau local à Internet', "routeur d'Internet": 'il choisit le chemin suivant', serveur: 'il fournit la page demandée' }),

    exoOrdonner('e06', 2, [
      { consigne: "Tu demandes une page web. Remets les étapes dans l'ordre.", etapes: ['Le navigateur envoie une requête', 'Le commutateur la transmet à la box', 'La box l\'envoie vers Internet', 'Les routeurs la font suivre de proche en proche', 'Le serveur reçoit la requête et renvoie la page', 'Le navigateur affiche la page'] },
    ], ['Tout part du terminal.', 'On sort du réseau local par la box.', 'Le serveur répond en dernier.']),

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Calcule une durée de transfert :',
      generer() {
        const debit = pick([8, 16, 40, 80]), duree = pick([5, 10, 20, 30]);
        const taille = debit * duree / 8;
        return {
          enonce: `Un fichier de ${taille} Mo est téléchargé avec un débit de ${debit} Mbit/s (données d'exercice). Combien de secondes le téléchargement dure-t-il ?`,
          reponse: duree, validation: 'nombre', unite: 's',
          pieges: [{ valeur: taille / debit, message: 'La taille est en mégaoctets et le débit en mégabits : multiplie d\'abord la taille par 8.' }],
          _v: { debit, duree, taille },
        };
      },
      indices: ['1 octet = 8 bits.', 'Convertis la taille en mégabits.', 'Durée = taille en mégabits ÷ débit.'],
      correction_etapes: (st) => [`Taille en mégabits : $${dec(st._v.taille)} \\times 8 = ${st._v.taille * 8}$ Mbit.`, `Durée : $${st._v.taille * 8} \\div ${st._v.debit} = ${st._v.duree}$ s.`],
    },

    exoDocument('e08', 3, 'Utilise une table de routage.', [
      () => {
        const dest = pick([['192.168.2.0', 'R2'], ['192.168.3.0', 'R3'], ['192.168.4.0', 'R3']]);
        const machine = dest[0].replace(/0$/, String(randInt(10, 99)));
        return {
          enonce: "Le routeur R1 relie trois réseaux. Dans ces réseaux, les trois premiers nombres de l'adresse désignent le réseau (données d'exercice). Table de routage de R1 :" +
            tableau([['Réseau de destination', '192.168.1.0', '192.168.2.0', '192.168.3.0', '192.168.4.0'], ['Envoyer vers', 'réseau local', 'R2', 'R3', 'R3']]) +
            `<p>R1 reçoit un paquet destiné à la machine <strong>${machine}</strong>.</p>`,
          questions: [
            choix('À quel réseau cette machine appartient-elle ?', dest[0], '192.168.1.0', dest[0] === '192.168.2.0' ? '192.168.3.0' : '192.168.2.0'),
            choix('Vers quel routeur R1 envoie-t-il le paquet ?', dest[1], dest[1] === 'R2' ? 'R3' : 'R2', 'aucun : il le garde'),
            choix("Qu'arrive-t-il à un paquet destiné à 192.168.1.7 ?", 'il est remis directement dans le réseau local', 'il est envoyé à R2', 'il est détruit'),
            choix('Pourquoi tous les routeurs doivent-ils suivre le même protocole ?', 'pour que des réseaux différents puissent se transmettre les paquets', 'pour consommer moins de câbles', 'pour afficher les pages plus joliment'),
          ],
          correction: [`Les trois premiers nombres de ${machine} désignent le réseau <strong>${dest[0]}</strong>.`, `La table indique <strong>${dest[1]}</strong> pour ce réseau.`, '192.168.1.0 est le <strong>réseau local</strong> de R1.', 'Un <strong>protocole</strong> commun permet à tous les réseaux de se comprendre.'],
        };
      },
    ], ['Compare les trois premiers nombres.', 'Lis la colonne du réseau trouvé.', 'Un protocole est un ensemble de règles communes.']),

    exoDocument('e09', 3, 'Compare deux connexions.', [
      () => {
        const taille = pick([100, 200, 400]), d1 = pick([8, 16]), d2 = pick([200, 400, 800]);
        const t1 = taille * 8 / d1, t2 = taille * 8 / d2;
        return {
          enonce: `Une famille veut télécharger une vidéo de ${taille} Mo. Elle compare deux abonnements (données d'exercice).` + tableau([['Abonnement', 'A', 'B'], ['Débit (Mbit/s)', d1, d2]]),
          questions: [
            nombre('Quelle est la taille de la vidéo en mégabits ?', taille * 8),
            nombre("Durée du téléchargement avec l'abonnement A, en secondes ?", t1),
            nombre("Durée du téléchargement avec l'abonnement B, en secondes ?", t2),
            choix("Avec l'abonnement B, le téléchargement est :", `${dec(d2 / d1)} fois plus rapide`, `${dec(d2 / d1)} fois plus lent`, 'aussi long'),
          ],
          correction: [`$${taille} \\times 8 = ${taille * 8}$ Mbit.`, `A : $${taille * 8} \\div ${d1} = ${dec(t1)}$ s.`, `B : $${taille * 8} \\div ${d2} = ${dec(t2)}$ s.`, `Le débit est ${dec(d2 / d1)} fois plus grand : la durée est <strong>${dec(d2 / d1)} fois plus courte</strong>.`],
        };
      },
    ], ['Convertis d\'abord en mégabits.', 'Durée = taille ÷ débit.', 'Débit multiplié : durée divisée.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Quel appareil relie plusieurs réseaux entre eux ?', choix: ['le routeur', 'le commutateur', 'le terminal', "l'écran"], correct: 0, explication: 'Le commutateur, lui, relie les terminaux d\'un même réseau.' },
    { type: 'qcm', question: 'Laquelle de ces adresses IP est valide ?', choix: ['192.168.1.25', '192.168.1.325', '192.168.1', '192.168.1.2.5'], correct: 0, explication: 'Quatre nombres, chacun compris entre 0 et 255.' },
    { type: 'vrai_faux', question: 'Un message est découpé en paquets pour voyager sur Internet.', reponse: true, explication: 'Chaque paquet porte les adresses de l\'expéditeur et du destinataire.' },
    { type: 'qcm', question: 'Une table de routage indique :', choix: ['vers quel routeur envoyer un paquet selon sa destination', 'le prix de l\'abonnement', 'le mot de passe du Wi-Fi', 'la liste des sites visités'], correct: 0, explication: 'Chaque routeur consulte la sienne.' },
    { type: 'saisie', question: 'Un fichier de 25 Mo est téléchargé à 100 Mbit/s. Durée, en secondes ?', reponse: 2, validation: 'nombre', explication: '$25 \\times 8 = 200$ Mbit, puis $200 \\div 100 = 2$ s.' },
    { type: 'vrai_faux', question: 'Si une liaison tombe en panne, les paquets peuvent passer par un autre chemin.', reponse: true, explication: 'Les routeurs choisissent un autre voisin.' },
  ],
};
