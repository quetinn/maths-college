// =====================================================================
//  t05_chaine_information.js — Technologie 3ᵉ : la chaîne d'information
//  et la numérisation.
//  Repères de 3ᵉ du programme de 2024 : décrire un objet en caractérisant
//  sa chaîne d'information, associer des grandeurs analogiques à des données
//  exploitables, représenter sous forme de données des informations de
//  diverses natures (bit, booléen, code ASCII, entiers).
//  Valeurs réelles (octet, code ASCII) : voir sources.js.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoLegender, exoDocument, choix, nombre, binaire } from '../outils.js';
import { tableau } from '../../commun.js';
import { schemaBloc, CHAINE_INFORMATION, FLUX_INFORMATION, octet } from '../figures.js';

const DEFINITIONS = [
  ["la chaîne d'information", "Ensemble des constituants qui acquièrent une information, la traitent et la communiquent."],
  ['un capteur', 'Constituant qui mesure une grandeur physique (température, distance, présence) et la transforme en signal électrique.'],
  ['un microcontrôleur', "Constituant programmable qui traite les informations reçues des capteurs et envoie des ordres."],
  ['une interface humain-machine', "Ensemble des boutons, écrans et voyants qui permettent à l'utilisateur de dialoguer avec l'objet."],
  ['un bit', "Plus petite unité d'information : il ne peut valoir que 0 ou 1."],
  ['un octet', 'Groupe de 8 bits, qui peut prendre 256 valeurs, de 0 à 255.'],
  ['une grandeur analogique', 'Grandeur qui varie de façon continue et peut prendre une infinité de valeurs, comme une température.'],
  ['un booléen', 'Donnée qui ne peut prendre que deux valeurs : vrai ou faux.'],
  ['le code ASCII', 'Table qui associe un nombre à chaque caractère : la lettre A porte le numéro 65.'],
];

const TYPES = [
  ['le prénom d\'un utilisateur', 'mot (chaîne de caractères)'], ['le message « PORTE OUVERTE »', 'mot (chaîne de caractères)'], ['le nom d\'une ville', 'mot (chaîne de caractères)'],
  ['une température de 21 °C', 'nombre'], ['une distance de 150 cm', 'nombre'], ['le niveau d\'une batterie, en pourcentage', 'nombre'],
  ['un bouton appuyé ou relâché', 'booléen'], ['une porte ouverte ou fermée', 'booléen'], ['une présence détectée ou non', 'booléen'],
];

export default {
  id: 't05',
  titre: "La chaîne d'information et la numérisation",
  theme: 'tk_structure', niveau: '3e',
  icone: '🔢',

  intro:
    "Un thermostat mesure la température, décide s'il faut chauffer et affiche la valeur. Pour cela, il transforme une <strong>grandeur du monde réel</strong> en <strong>nombres</strong>, les seuls objets qu'un programme sait manipuler. " +
    "Ce chapitre suit l'information, du capteur jusqu'à l'écran, et montre comment elle s'écrit avec des 0 et des 1.",

  cours: [
    {
      type: 'definition', titre: 'Trois fonctions',
      contenu: "La <strong>chaîne d'information</strong> enchaîne trois fonctions : <strong>acquérir</strong> (capteurs, boutons), <strong>traiter</strong> (microcontrôleur et son programme), <strong>communiquer</strong> (afficheur, voyant, liaison sans fil). Le traitement envoie aussi des <strong>ordres</strong> à la chaîne d'énergie, par exemple à un relais.",
    },
    {
      type: 'figure', titre: "La chaîne d'information d'un objet programmé",
      contenu: 'Un rectangle par constituant, sa fonction dessous, et sur chaque flèche ce qui circule.',
      render: (host) => { host.innerHTML = schemaBloc({ blocs: CHAINE_INFORMATION, flux: FLUX_INFORMATION, label: "Chaîne d'information en schéma-bloc" }); },
    },
    {
      type: 'propriete', titre: 'De la grandeur analogique à la donnée',
      contenu: "Une température, une distance, une luminosité sont des <strong>grandeurs analogiques</strong> : elles varient de façon continue. Le capteur les transforme en signal électrique, puis le microcontrôleur les convertit en <strong>nombre</strong> : c'est la <strong>numérisation</strong>. Un bouton ou un capteur de présence donne une information à deux états, un <strong>booléen</strong>.",
    },
    {
      type: 'definition', titre: 'Bit et octet',
      contenu: "Un <strong>bit</strong> vaut 0 ou 1. Avec $n$ bits, on peut écrire $2^n$ valeurs différentes. Un <strong>octet</strong> est un groupe de 8 bits : il code $2^8 = 256$ valeurs, de 0 à 255. Les bits ont pour poids, de gauche à droite : 128, 64, 32, 16, 8, 4, 2, 1.",
    },
    {
      type: 'figure', titre: 'Un octet à la loupe',
      contenu: 'Bascule les bits et lis la valeur obtenue.',
      render: (host) => octet(host),
    },
    {
      type: 'propriete', titre: 'Coder des nombres et des caractères',
      contenu: "Pour lire un nombre binaire, on additionne les poids des bits à 1 : $0100\\,0001 = 64 + 1 = 65$. Pour coder un caractère, on utilise une table : dans le <strong>code ASCII</strong>, A vaut 65, B vaut 66, et ainsi de suite ; a vaut 97. Un texte simple occupe donc <strong>un octet par caractère</strong>.",
    },
    {
      type: 'exemple', enonce: 'Écris le nombre 13 en binaire, sur 4 bits.',
      solution_etapes: ['Les poids sur 4 bits sont 8, 4, 2, 1.', '$13 = 8 + 4 + 1$ : on met 1 aux poids 8, 4 et 1, et 0 au poids 2.', '13 s\'écrit $1101$.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Écrire les poids', explication: 'Sur 8 bits : 128, 64, 32, 16, 8, 4, 2, 1.' },
    { etape: 2, titre: 'Du binaire au décimal', explication: 'Additionne les poids des bits à 1.' },
    { etape: 3, titre: 'Du décimal au binaire', explication: 'Retire le plus grand poids possible, mets 1, puis recommence avec le reste.' },
    { etape: 4, titre: 'Vérifier', explication: 'Refais le calcul dans l\'autre sens.' },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Bit : 0 ou 1.', 'Octet : 8 bits.', 'Acquérir, traiter, communiquer.']),

    exoRelier('e02', 1, "Associe chaque constituant à sa fonction dans la chaîne d'information.", [
      ['un capteur de température', 'acquérir'], ['un bouton poussoir', 'acquérir'], ['un capteur de distance', 'acquérir'],
      ['un microcontrôleur', 'traiter'],
      ['un afficheur', 'communiquer'], ['un voyant lumineux', 'communiquer'], ['un module Bluetooth', 'communiquer'],
    ], ['Qui mesure ? Qui calcule ? Qui informe ?', 'Un bouton fournit une information.', 'Un écran communique.'], 4),

    exoVraiFaux('e03', 1, [
      ['Un bit peut prendre trois valeurs.', false, 'Non : deux seulement, 0 ou 1.'],
      ['Un octet contient 8 bits.', true, 'Oui.'],
      ['Un octet peut coder 256 valeurs différentes.', true, 'Oui : $2^8 = 256$, de 0 à 255.'],
      ['Dans le code ASCII, la lettre A porte le numéro 65.', true, 'Oui, et B porte le numéro 66.'],
      ['Une température est une grandeur analogique.', true, 'Oui : elle varie de façon continue.'],
      ['Le microcontrôleur assure la fonction « acquérir ».', false, 'Non : il traite. Ce sont les capteurs qui acquièrent.'],
      ["L'état d'un bouton, appuyé ou relâché, est un booléen.", true, 'Oui : deux états, vrai ou faux.'],
      ['Avec 3 bits, on peut écrire 6 valeurs différentes.', false, 'Non : $2^3 = 8$ valeurs, de 0 à 7.'],
    ], ['Un bit : deux valeurs.', 'Avec n bits : 2 puissance n valeurs.', 'Capteur : acquérir. Microcontrôleur : traiter.']),

    exoLegender('e04', 2, "Retrouve le constituant de chaque bloc de cette chaîne d'information.", CHAINE_INFORMATION.map((b) => b.nom),
      (ordre) => schemaBloc({ blocs: CHAINE_INFORMATION, flux: FLUX_INFORMATION, ordre, label: "Chaîne d'information à légender" }),
      ['moteur', 'batterie'], ['La fonction est écrite dans chaque bloc.', 'Acquérir : le capteur.', 'Moteur et batterie sont dans la chaîne d\'énergie.'],
      { capteur: 'il acquiert la grandeur physique', microcontrôleur: 'il traite les informations', afficheur: "il communique l'information à l'utilisateur" }),

    exoClasser('e05', 2, 'Quel type de donnée faut-il pour représenter cette information ?', TYPES, ['mot (chaîne de caractères)', 'nombre', 'booléen'],
      { 'mot (chaîne de caractères)': 'Un texte se stocke comme une suite de caractères.', nombre: 'Une mesure se stocke comme un nombre.', booléen: 'Deux états seulement : vrai ou faux.' },
      ['Deux états seulement ? C\'est un booléen.', 'Une mesure est un nombre.', 'Un texte est une chaîne de caractères.'], 5),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Convertis ce nombre binaire en décimal :',
      generer() {
        const v = randInt(9, 255), b = binaire(v);
        const poids = [128, 64, 32, 16, 8, 4, 2, 1].filter((p, i) => b[i] === '1');
        return { enonce: `Quelle est la valeur décimale de l'octet $${b.slice(0, 4)}\\,${b.slice(4)}$ ?`, reponse: v, validation: 'nombre', _v: { poids, v } };
      },
      indices: ['Écris les poids : 128, 64, 32, 16, 8, 4, 2, 1.', 'Garde seulement les poids des bits à 1.', 'Additionne-les.'],
      correction_etapes: (st) => ['Poids des bits : 128, 64, 32, 16, 8, 4, 2, 1.', `On additionne les poids des bits à 1 : $${st._v.poids.join(' + ')} = ${st._v.v}$.`],
    },

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Convertis ce nombre en binaire :',
      generer() {
        const v = randInt(5, 15);
        return { enonce: `Écris le nombre ${v} en binaire, sur 4 bits.`, reponse: binaire(v, 4), validation: 'texte', _v: { v, poids: [8, 4, 2, 1].filter((p) => v & p) } };
      },
      indices: ['Les poids sur 4 bits sont 8, 4, 2, 1.', 'Décompose le nombre en somme de ces poids.', 'Mets 1 pour un poids utilisé, 0 sinon.'],
      correction_etapes: (st) => [`$${st._v.v} = ${st._v.poids.join(' + ')}$.`, `On met 1 aux poids utilisés, 0 aux autres : <strong>${binaire(st._v.v, 4)}</strong>.`],
    },

    exoDocument('e08', 3, 'Code un mot en ASCII.', [
      () => {
        const mot = pick(['BAC', 'FACE', 'CAFE', 'FADE', 'DECA']);
        const lettre = pick(mot.split('')), code = lettre.charCodeAt(0);
        return {
          enonce: 'Extrait de la table ASCII :' + tableau([['Caractère', 'A', 'B', 'C', 'D', 'E', 'F'], ['Code', 65, 66, 67, 68, 69, 70]]) + `<p>Un objet connecté envoie le mot <strong>${mot}</strong>.</p>`,
          questions: [
            nombre(`Quel est le code ASCII de la lettre ${lettre} ?`, code),
            nombre(`Combien d'octets faut-il pour envoyer le mot ${mot} ?`, mot.length),
            nombre('Combien de bits cela représente-t-il ?', mot.length * 8),
            choix(`En binaire, sur 8 bits, le code de ${lettre} s'écrit :`, binaire(code), binaire(code + 2), binaire(code - 64 + 128)),
          ],
          correction: [`Dans la table, ${lettre} porte le numéro <strong>${code}</strong>.`, `Un caractère occupe un octet : <strong>${mot.length} octets</strong>.`, `$${mot.length} \\times 8 = ${mot.length * 8}$ bits.`, `$${code} = 64 + ${code - 64}$, soit <strong>${binaire(code)}</strong>.`],
        };
      },
    ], ['Lis le code dans la table.', 'Un caractère : un octet.', 'Un octet : 8 bits.']),

    exoDocument('e09', 3, "Décris la chaîne d'information d'un objet.", [
      () => {
        const seuil = pick([18, 19, 20]), mesure = seuil - pick([1, 2, 3]);
        return {
          enonce: `Un thermostat connecté est équipé d'un capteur de température, d'un microcontrôleur, d'un écran et d'un module Wi-Fi. Son programme met le chauffage en marche quand la température mesurée est inférieure à ${seuil} °C. Le capteur mesure ${mesure} °C (données d'exercice).`,
          questions: [
            choix('Quel constituant assure la fonction « acquérir » ?', 'le capteur de température', "l'écran", 'le module Wi-Fi'),
            choix('La température mesurée est stockée sous la forme :', "d'un nombre", "d'un booléen", "d'une chaîne de caractères"),
            choix(`La condition « température inférieure à ${seuil} » est ici :`, 'vraie', 'fausse', 'impossible à évaluer'),
            choix("Quel ordre le microcontrôleur envoie-t-il à la chaîne d'énergie ?", 'fermer le relais du chauffage', 'éteindre le capteur', 'effacer le programme'),
          ],
          correction: ['Le <strong>capteur</strong> acquiert la grandeur physique.', 'Une mesure est un <strong>nombre</strong>.', `$${mesure} < ${seuil}$ : la condition est <strong>vraie</strong> ; c'est un booléen.`, "Le microcontrôleur ordonne au <strong>relais</strong> de laisser passer l'énergie vers le chauffage."],
        };
      },
    ], ['Acquérir : mesurer.', 'Une condition est vraie ou fausse.', 'Le traitement envoie des ordres à la chaîne d\'énergie.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: "Quelles sont les trois fonctions de la chaîne d'information ?", choix: ['acquérir, traiter, communiquer', 'alimenter, distribuer, convertir', 'extraire, fabriquer, recycler', 'lire, écrire, effacer'], correct: 0, explication: 'Alimenter, distribuer, convertir appartiennent à la chaîne d\'énergie.' },
    { type: 'saisie', question: 'Combien de valeurs différentes peut-on coder avec un octet ?', reponse: 256, validation: 'nombre', explication: '$2^8 = 256$ valeurs, de 0 à 255.' },
    { type: 'saisie', question: "Quelle est la valeur décimale de l'octet 0000 1010 ?", reponse: 10, validation: 'nombre', explication: 'Les bits de poids 8 et 2 sont à 1 : $8 + 2 = 10$.' },
    { type: 'vrai_faux', question: 'Un capteur de présence fournit une information de type booléen.', reponse: true, explication: 'Présence détectée ou non : deux états.' },
    { type: 'qcm', question: 'Dans le code ASCII, si A vaut 65, alors C vaut :', choix: ['67', '63', '66', '97'], correct: 0, explication: 'Les lettres se suivent : A 65, B 66, C 67.' },
    { type: 'vrai_faux', question: 'Numériser une grandeur, c\'est la transformer en nombre.', reponse: true, explication: 'Le microcontrôleur ne manipule que des nombres.' },
  ],
};
