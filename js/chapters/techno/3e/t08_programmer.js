// =====================================================================
//  t08_programmer.js — Technologie 3ᵉ : programmer une nouvelle fonctionnalité.
//  Repères de 3ᵉ du programme de 2024 : déterminer les données utilisées
//  et produites par un programme, programmer un algorithme lié à une
//  nouvelle fonctionnalité, le modifier et le tester ; lien entre la
//  programmation par blocs et la programmation textuelle (fin de 3ᵉ).
//  Les objets, seuils et mesures sont des données d'exercice. Le texte des
//  programmes suit la syntaxe de Python.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { scratch, code, tableau } from '../../commun.js';
import { simulateurAlerte } from '../figures.js';

const DEFINITIONS = [
  ['un algorithme', "Suite d'instructions, écrite en langage courant, qui décrit comment résoudre un problème."],
  ['une variable', "Case mémoire qui porte un nom et contient une valeur que le programme peut lire et modifier."],
  ['une affectation', 'Instruction qui range une valeur dans une variable.'],
  ['une instruction conditionnelle', "Instruction qui n'exécute un bloc que si une condition est vraie : « si… alors… sinon »."],
  ['une boucle', "Instruction qui répète un bloc, un nombre de fois donné ou tant qu'une condition est vraie."],
  ['un événement', "Ce qui déclenche l'exécution d'une séquence : un appui sur un bouton, un seuil franchi, le démarrage."],
  ['une liste', 'Structure qui range plusieurs valeurs sous un seul nom, les unes à la suite des autres.'],
  ['un sous-programme', "Séquence d'instructions qui porte un nom et que l'on peut appeler plusieurs fois : on dit aussi une fonction."],
  ['une entrée', 'Donnée que le programme reçoit, par exemple la mesure d\'un capteur ou l\'état d\'un bouton.'],
  ['une sortie', "Ce que le programme produit : un ordre à un actionneur, un affichage."],
];

const ES = [
  ['la mesure d\'un capteur de distance', 'entrée'], ["l'état d'un bouton poussoir", 'entrée'], ['la température relevée', 'entrée'], ["l'heure donnée par l'horloge", 'entrée'],
  ['la mise en marche d\'un moteur', 'sortie'], ["l'allumage d'une LED", 'sortie'], ["l'affichage d'un message", 'sortie'], ['le déclenchement d\'un avertisseur sonore', 'sortie'],
];

const progAlarme = (seuil) => scratch([
  'evt:quand le programme démarre',
  ['ctl:répéter indéfiniment', [
    ['ctl:si distance < [' + seuil + '] alors', ['app:allumer la LED rouge', 'app:activer le signal sonore'], 'sinon', ['app:éteindre la LED rouge']],
  ]],
]);

const texteAlarme = (seuil) => code([
  'while True:',
  `    if distance() < ${seuil}:`,
  '        led_rouge.allumer()',
  '        signal_sonore()',
  '    else:',
  '        led_rouge.eteindre()',
]);

export default {
  id: 't08',
  titre: 'Programmer une nouvelle fonctionnalité',
  theme: 'tk_structure', niveau: '3e',
  icone: '🧩',

  intro:
    "Ajouter une alerte à un vélo, un mode nuit à une lampe, un arrêt automatique à un robot : dans un objet programmé, une nouvelle fonctionnalité est d'abord un <strong>nouveau morceau de programme</strong>. " +
    "En 3ᵉ, tu pars du besoin, tu écris l'algorithme, tu le programmes, puis tu le testes. La dernière question du sujet de référence du brevet porte sur un programme à compléter.",

  cours: [
    {
      type: 'definition', titre: 'Entrées, traitement, sorties',
      contenu: "Un programme reçoit des <strong>entrées</strong> (mesures des capteurs, état des boutons), les <strong>traite</strong>, et produit des <strong>sorties</strong> (ordres aux actionneurs, affichages). Avant de programmer, on dresse la liste des entrées et des sorties : c'est ce que l'on appelle déterminer les données du programme.",
    },
    {
      type: 'definition', titre: 'Variables et types',
      contenu: "Une <strong>variable</strong> garde une valeur en mémoire. Elle a un <strong>type</strong> : <strong>nombre</strong> (une distance), <strong>mot</strong> (un message), <strong>booléen</strong> (vrai ou faux). L'<strong>affectation</strong> lui donne une valeur : « mettre compteur à 0 ». Une <strong>liste</strong> range plusieurs valeurs, par exemple les dix dernières mesures.",
    },
    {
      type: 'propriete', titre: 'Conditions et opérateurs logiques',
      contenu: "Une <strong>condition</strong> est vraie ou fausse. On en combine plusieurs avec les opérateurs logiques : <strong>ET</strong> (vrai si les deux sont vraies), <strong>OU</strong> (vrai si au moins une est vraie), <strong>NON</strong> (inverse la valeur). Exemple : « s'il fait nuit ET qu'une présence est détectée, allumer ».",
    },
    {
      type: 'propriete', titre: 'Boucles et événements',
      contenu: "Le programme d'un objet tourne en général dans une boucle <strong>« répéter indéfiniment »</strong> : il relit sans cesse ses capteurs. Une boucle <strong>« répéter n fois »</strong> sert à recommencer une action un nombre de fois connu. Un <strong>événement</strong> (appui sur un bouton, démarrage) déclenche une séquence.",
    },
    {
      type: 'figure', titre: 'Le même programme, en blocs puis en texte',
      contenu: 'Une alerte de proximité : la LED et le signal sonore s\'activent quand un obstacle est à moins de 30 cm.',
      render: (host) => { host.innerHTML = progAlarme(30) + texteAlarme(30); },
    },
    { type: 'figure', titre: 'Le programme en action', contenu: "Déplace l'obstacle : la branche exécutée s'éclaire.", render: (host) => simulateurAlerte(host, { seuil: 30 }) },
    {
      type: 'propriete', titre: 'Des blocs au texte',
      contenu: "En programmation textuelle, chaque bloc devient une ligne. Le bloc « si… alors… sinon » s'écrit <code>if</code>… <code>else</code>, la boucle infinie <code>while True</code>, et le contenu d'un bloc est <strong>décalé vers la droite</strong> (indentation). Un <strong>sous-programme</strong> regroupe une séquence sous un nom : on l'appelle au lieu de la recopier, et le programme devient plus lisible.",
    },
    {
      type: 'exemple', enonce: "On veut qu'une lampe s'allume s'il fait sombre et qu'une personne est présente. Écris l'algorithme.",
      solution_etapes: ['Entrées : luminosité (nombre), présence (booléen). Sortie : la lampe.', 'Répéter indéfiniment :', 'si luminosité < seuil ET présence est vraie, alors allumer la lampe ;', 'sinon, éteindre la lampe.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Lister les entrées et les sorties', explication: 'Quels capteurs et quels boutons ? Quels actionneurs et quels affichages ?' },
    { etape: 2, titre: "Écrire l'algorithme en langage courant", explication: '« Répéter indéfiniment : si… alors… sinon… ». Une phrase par action.' },
    { etape: 3, titre: 'Traduire en programme', explication: 'En blocs ou en texte, en respectant l\'emboîtement des blocs (ou l\'indentation).' },
    { etape: 4, titre: 'Tester', explication: 'Choisis des valeurs d\'entrée de chaque côté du seuil et vérifie les sorties obtenues.' },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Variable : une case mémoire nommée.', 'Boucle : répéter.', 'Événement : ce qui déclenche.']),

    exoClasser('e02', 1, 'Entrée ou sortie du programme ?', ES, ['entrée', 'sortie'],
      { entrée: 'Le programme la reçoit.', sortie: 'Le programme la produit.' },
      ['Le programme la reçoit-il ou la produit-il ?', 'Un capteur fournit une entrée.', 'Un actionneur reçoit une sortie.'], 5),

    exoVraiFaux('e03', 1, [
      ['Une variable peut changer de valeur pendant l\'exécution du programme.', true, 'Oui : c\'est ce qui la distingue d\'une constante.'],
      ['« A ET B » est vrai dès que l\'une des deux conditions est vraie.', false, 'Non : il faut que les deux soient vraies. C\'est « OU » qui se contente d\'une seule.'],
      ['« A OU B » est faux seulement si les deux conditions sont fausses.', true, 'Oui.'],
      ['« NON A » est vrai quand A est faux.', true, 'Oui : NON inverse la valeur.'],
      ['Une boucle « répéter indéfiniment » permet de relire les capteurs en permanence.', true, 'Oui : c\'est la structure habituelle du programme d\'un objet.'],
      ['Un sous-programme ne peut être appelé qu\'une seule fois.', false, 'Non : son intérêt est d\'être appelé autant de fois que nécessaire.'],
      ['En programmation textuelle, l\'indentation indique ce qui appartient à un bloc.', true, 'Oui : les lignes décalées sont à l\'intérieur du bloc.'],
      ["L'état d'un bouton est une donnée de type booléen.", true, 'Oui : appuyé ou relâché.'],
    ], ['ET : les deux. OU : au moins une.', 'NON inverse.', 'L\'indentation remplace l\'emboîtement des blocs.']),

    {
      id: 'e04', niveau: 2, type: 'vrai_faux', consigne: 'Évalue cette condition :',
      generer() {
        const d = randInt(5, 60), seuil = pick([20, 30, 40]), nuit = pick([true, false]), op = pick(['ET', 'OU']);
        const a = d < seuil, r = op === 'ET' ? a && nuit : a || nuit;
        return { enonce: `La distance mesurée vaut ${d} cm et il fait ${nuit ? 'nuit' : 'jour'}. La condition « distance < ${seuil} ${op} il fait nuit » est vraie.`, reponse: r, _v: { a, nuit, op, d, seuil, r } };
      },
      indices: ['Évalue chaque condition séparément.', 'ET : les deux doivent être vraies.', 'OU : une seule suffit.'],
      correction_detaillee: (st) => `<p>« distance < ${st._v.seuil} » est <strong>${st._v.a ? 'vraie' : 'fausse'}</strong> (${st._v.d} cm) ; « il fait nuit » est <strong>${st._v.nuit ? 'vraie' : 'fausse'}</strong>.</p><p>Avec l'opérateur ${st._v.op}, la condition est <strong>${st._v.r ? 'vraie' : 'fausse'}</strong>.</p>`,
    },

    exoRelier('e05', 2, 'Associe chaque bloc à son écriture en texte.', [
      ['répéter indéfiniment', 'while True:'], ['si distance < 30 alors', 'if distance < 30:'], ['sinon', 'else:'], ['mettre compteur à 0', 'compteur = 0'], ['ajouter 1 à compteur', 'compteur = compteur + 1'], ['répéter 5 fois', 'for i in range(5):'],
    ], ['« si » se dit if.', 'Le signe = range une valeur dans une variable.', 'while : tant que.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Suis le programme pas à pas :',
      generer() {
        const depart = randInt(0, 5), pas = pick([2, 3, 5]), n = pick([3, 4, 5]);
        return {
          enonce: 'Quelle est la valeur de <strong>compteur</strong> à la fin de ce programme ?',
          visuel: (host) => { host.innerHTML = scratch(['evt:quand le programme démarre', `var:mettre compteur à [${depart}]`, [`ctl:répéter [${n}] fois`, [`var:ajouter [${pas}] à compteur`]]]); },
          reponse: depart + pas * n, validation: 'nombre',
          pieges: [{ valeur: depart + pas, message: `La boucle s'exécute ${n} fois, pas une seule.` }, { valeur: pas * n, message: `Le compteur ne part pas de 0 : il vaut ${depart} au départ.` }],
          _v: { depart, pas, n },
        };
      },
      indices: ['Note la valeur de départ.', 'Compte le nombre de tours de boucle.', 'À chaque tour, la variable augmente du même pas.'],
      correction_etapes: (st) => [`Au départ, compteur vaut ${st._v.depart}.`, `La boucle ajoute ${st._v.pas}, ${st._v.n} fois : $${st._v.n} \\times ${st._v.pas} = ${st._v.n * st._v.pas}$.`, `À la fin : $${st._v.depart} + ${st._v.n * st._v.pas} = ${st._v.depart + st._v.n * st._v.pas}$.`],
    },

    exoOrdonner('e07', 2, [
      { consigne: "Un portail doit s'ouvrir quand on appuie sur le bouton, puis se refermer après 10 secondes. Remets l'algorithme dans l'ordre.", etapes: ['Attendre que le bouton soit appuyé', 'Mettre le moteur en marche dans le sens « ouvrir »', "Arrêter le moteur quand le capteur de fin de course est atteint", 'Attendre 10 secondes', 'Mettre le moteur en marche dans le sens « fermer »', 'Arrêter le moteur quand le portail est fermé'] },
      { consigne: "Remets dans l'ordre les étapes de l'ajout d'une fonctionnalité à un objet programmé.", etapes: ['Décrire le besoin', 'Lister les entrées et les sorties', "Écrire l'algorithme en langage courant", 'Programmer', 'Tester avec plusieurs valeurs', 'Corriger si un test échoue'] },
    ], ['Tout commence par un événement ou un besoin.', 'On arrête un moteur après l\'avoir mis en marche.', 'Le test vient après la programmation.']),

    exoDocument('e08', 3, 'Complète un programme à partir d\'un tableau de comportement.', [
      () => {
        const seuil = pick([20, 25, 30]), bas = seuil - pick([5, 8]);
        return {
          enonce: `Un ventilateur connecté doit respecter ce comportement (données d'exercice) :` +
            tableau([['Température', `inférieure à ${bas} °C`, `de ${bas} °C à ${seuil} °C`, `supérieure à ${seuil} °C`], ['Ventilateur', 'arrêté', 'vitesse lente', 'vitesse rapide']]) +
            scratch(['evt:quand le programme démarre', ['ctl:répéter indéfiniment', [['ctl:si température > [ A ] alors', ['app:régler le ventilateur sur [ B ]'], 'sinon', [['ctl:si température < [ C ] alors', ['app:arrêter le ventilateur'], 'sinon', ['app:régler le ventilateur sur [lent]']]]]]]]),
          questions: [
            nombre('Quelle valeur faut-il écrire à la place de A ?', seuil),
            choix('Que faut-il écrire à la place de B ?', 'rapide', 'lent', 'arrêté'),
            nombre('Quelle valeur faut-il écrire à la place de C ?', bas),
            choix(`Pour tester le programme, quelles températures faut-il essayer ?`, `${bas - 3} °C, ${bas + 2} °C et ${seuil + 4} °C : une dans chaque zone`, `seulement ${seuil + 4} °C`, `trois valeurs supérieures à ${seuil} °C`),
          ],
          correction: [`Au-dessus de <strong>${seuil} °C</strong>, le ventilateur tourne vite : A = ${seuil}.`, 'Dans ce cas, la vitesse est <strong>rapide</strong>.', `En dessous de <strong>${bas} °C</strong>, il s'arrête : C = ${bas}.`, 'Un bon test essaie <strong>une valeur dans chaque zone</strong> du tableau.'],
        };
      },
    ], ['Chaque colonne du tableau correspond à une branche du programme.', 'La première condition traite la zone la plus chaude.', 'Un test par zone.']),

    exoDocument('e09', 3, 'Passe des blocs au texte.', [
      () => {
        const seuil = pick([15, 30, 50]), mesure = pick([seuil - 5, seuil + 10]);
        return {
          enonce: `Voici le programme d'une alerte de proximité, puis sa traduction en texte.` + progAlarme(seuil) + texteAlarme(seuil),
          questions: [
            choix('Quelle ligne du texte correspond au bloc « répéter indéfiniment » ?', 'while True:', `if distance() < ${seuil}:`, 'else:'),
            choix('Comment le texte indique-t-il que deux lignes sont dans le bloc « si » ?', 'elles sont décalées vers la droite', 'elles sont écrites en majuscules', 'elles se terminent par un point'),
            choix(`Le capteur mesure ${mesure} cm. Que fait le programme ?`, mesure < seuil ? 'il allume la LED et active le signal sonore' : 'il éteint la LED', mesure < seuil ? 'il éteint la LED' : 'il allume la LED et active le signal sonore', "il s'arrête"),
            choix('On veut réutiliser « allumer la LED puis activer le signal » à plusieurs endroits. Que crée-t-on ?', 'un sous-programme', 'une liste', 'un événement'),
          ],
          correction: ['La boucle infinie s\'écrit <strong>while True</strong>.', "L'<strong>indentation</strong> remplace l'emboîtement des blocs.", `$${mesure} ${mesure < seuil ? '<' : '>'} ${seuil}$ : la condition est ${mesure < seuil ? 'vraie, la LED s\'allume' : 'fausse, la LED s\'éteint'}.`, 'Un <strong>sous-programme</strong> évite de recopier une séquence.'],
        };
      },
    ], ['Compare les deux écritures ligne par ligne.', 'Regarde le décalage des lignes.', 'Compare la mesure au seuil.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'La mesure d\'un capteur est, pour le programme :', choix: ['une entrée', 'une sortie', 'un sous-programme', 'une boucle'], correct: 0, explication: 'Le programme la reçoit.' },
    { type: 'vrai_faux', question: '« A ET B » est vrai seulement si A et B sont vraies toutes les deux.', reponse: true, explication: 'Avec OU, une seule suffit.' },
    { type: 'saisie', question: 'Une variable vaut 4. On lui ajoute 3, cinq fois de suite. Quelle est sa valeur finale ?', reponse: 19, validation: 'nombre', explication: '$4 + 5 \\times 3 = 19$.' },
    { type: 'qcm', question: 'En programmation textuelle, « si… alors… sinon » s\'écrit :', choix: ['if … else', 'while … True', 'for … range', 'print … input'], correct: 0, explication: 'if : si ; else : sinon.' },
    { type: 'qcm', question: 'Pour tester un programme qui compare une mesure à un seuil, on essaie :', choix: ['une valeur au-dessous et une valeur au-dessus du seuil', 'une seule valeur', 'uniquement la valeur du seuil', 'aucune valeur'], correct: 0, explication: 'Il faut vérifier chaque branche de la condition.' },
    { type: 'vrai_faux', question: 'Un sous-programme rend un programme plus lisible.', reponse: true, explication: 'Il donne un nom à une séquence et évite les répétitions.' },
  ],
};
