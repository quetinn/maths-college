// =====================================================================
//  t03_ia_numerique.js — Technologie 3ᵉ : l'intelligence artificielle et
//  le numérique dans la société.
//  Programme de 2024 : grands types d'apprentissage des intelligences
//  artificielles et leurs usages, étude du biais ; repère de 3ᵉ : exprimer
//  le rôle du numérique dans la société et les métiers. Les règles d'usage
//  raisonné (repères de 5ᵉ et 4ᵉ) sont rappelées car elles sont exigibles
//  en fin de cycle.
//  Les trois types d'apprentissage sont ceux de la page citée dans sources.js.
//  Les effectifs des exercices sont des données d'exercice.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { apprentissage, schemaDonnees } from '../figures.js';

const DEFINITIONS = [
  ['une intelligence artificielle', "Programme capable d'accomplir une tâche qui demande d'habitude de l'intelligence humaine : reconnaître une image, traduire un texte, répondre à une question."],
  ["l'apprentissage supervisé", "Apprentissage à partir d'exemples dont on connaît déjà la bonne réponse : chaque exemple porte une étiquette."],
  ["l'apprentissage non supervisé", "Apprentissage à partir de données sans étiquette : le programme cherche seul des groupes ou des ressemblances."],
  ["l'apprentissage par renforcement", "Apprentissage par essais et erreurs : le programme agit, reçoit une récompense ou une pénalité, et améliore sa stratégie."],
  ["les données d'entraînement", "Exemples fournis à un programme pour qu'il apprenne."],
  ['un biais', "Erreur systématique d'une intelligence artificielle, due à des données d'entraînement incomplètes ou déséquilibrées."],
  ['une donnée personnelle', "Information qui permet d'identifier une personne, directement ou indirectement."],
  ['un témoin de connexion', "Petit fichier déposé par un site sur l'appareil du visiteur pour le reconnaître et suivre sa navigation (cookie)."],
];

const APPRENTISSAGES = [
  ['reconnaître des chats sur des photos déjà classées « chat » ou « pas chat »', 'supervisé'],
  ['trier des courriels à partir de messages déjà marqués « indésirable »', 'supervisé'],
  ['lire une écriture manuscrite à partir de lettres dont on connaît la réponse', 'supervisé'],
  ['regrouper des clients qui ont des habitudes d\'achat proches, sans catégories fixées à l\'avance', 'non supervisé'],
  ['répartir des photos en groupes de photos ressemblantes, sans légende', 'non supervisé'],
  ['apprendre à un robot à marcher : il gagne des points quand il avance', 'par renforcement'],
  ['apprendre à un programme à jouer aux échecs en jouant contre lui-même', 'par renforcement'],
  ['apprendre à un aspirateur robot à éviter les obstacles par essais et erreurs', 'par renforcement'],
];

export default {
  id: 't03',
  titre: "L'intelligence artificielle et le numérique dans la société",
  theme: 'tk_usages', niveau: '3e',
  icone: '🤖',

  intro:
    "Un téléphone qui reconnaît un visage, une application qui traduit, un service qui propose la vidéo suivante : derrière ces usages, il y a des programmes qui ont <strong>appris à partir de données</strong>. " +
    "Comprendre comment ils apprennent permet de savoir quand leur faire confiance, et quand rester prudent.",

  cours: [
    {
      type: 'definition', titre: 'Apprendre à partir de données',
      contenu: "Une <strong>intelligence artificielle</strong> n'applique pas une règle écrite à l'avance : elle ajuste son fonctionnement à partir d'un grand nombre d'exemples, les <strong>données d'entraînement</strong>. Une fois entraînée, elle traite des cas qu'elle n'a jamais vus.",
    },
    {
      type: 'propriete', titre: "Trois grands types d'apprentissage",
      contenu: "<strong>Supervisé</strong> : les exemples sont étiquetés, on donne la bonne réponse (reconnaître un objet sur une image). <strong>Non supervisé</strong> : aucune étiquette, le programme cherche des groupes (regrouper des données ressemblantes). <strong>Par renforcement</strong> : le programme agit, reçoit une récompense ou une pénalité, et améliore sa stratégie (un robot qui apprend à se déplacer).",
    },
    { type: 'figure', titre: 'Trois façons d\'apprendre', contenu: 'Passe d\'un type à l\'autre.', render: (host) => apprentissage(host) },
    {
      type: 'propriete', titre: 'Des usages variés',
      contenu: "Les intelligences artificielles servent à <strong>identifier</strong> (un visage, une plante, une tumeur sur une radio), à <strong>se repérer</strong> (calcul d'itinéraire), à <strong>traduire</strong>, à <strong>calculer</strong> et prévoir (météo, consommation d'énergie), à <strong>générer</strong> du texte ou des images.",
    },
    {
      type: 'propriete', titre: 'Le biais',
      contenu: "Une intelligence artificielle ne vaut que ce que valent ses données. Si les exemples sont <strong>déséquilibrés</strong> ou incomplets, elle se trompe plus souvent sur ce qu'elle a peu vu : c'est un <strong>biais</strong>. Ses réponses peuvent aussi être fausses tout en ayant l'air sûres. Elles doivent être vérifiées, et la décision finale revient à une personne.",
    },
    {
      type: 'figure', titre: 'Des données déséquilibrées', contenu: "Avec ces données d'entraînement, le programme reconnaîtra mal les poires (données d'exemple).",
      render: (host) => { host.innerHTML = schemaDonnees(900, 100); },
    },
    {
      type: 'propriete', titre: 'Un usage raisonné du numérique',
      contenu: "Les services numériques collectent des <strong>données personnelles</strong> : identité, position (<strong>géolocalisation</strong>), navigation (<strong>témoins de connexion</strong>). L'ensemble des traces laissées forme l'<strong>identité numérique</strong>. Les règles de base : un mot de passe long et différent pour chaque service, des paramètres de confidentialité réglés, le respect de la <strong>propriété intellectuelle</strong> (on ne réutilise pas une œuvre sans autorisation), et aucune usurpation d'identité ni cyberviolence, qui sont punies par la loi.",
    },
    {
      type: 'exemple', enonce: "Un programme reconnaît des fruits. Il a été entraîné avec 900 photos de pommes et 100 photos de poires. Que peut-on craindre ?",
      solution_etapes: ['Les données sont déséquilibrées : 9 photos sur 10 montrent une pomme.', 'Le programme a peu vu de poires : il les reconnaîtra moins bien.', "C'est un biais. Pour le corriger, on rééquilibre les données d'entraînement."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer les données', explication: "D'où viennent les exemples ? Sont-ils étiquetés ? Sont-ils équilibrés ?" },
    { etape: 2, titre: "Nommer le type d'apprentissage", explication: 'Étiquettes : supervisé. Pas d\'étiquettes : non supervisé. Récompenses : par renforcement.' },
    { etape: 3, titre: 'Chercher un biais possible', explication: 'Quelle catégorie est peu représentée ? Le programme risque de se tromper sur celle-là.' },
    { etape: 4, titre: 'Conclure sur la confiance', explication: "Une réponse d'intelligence artificielle se vérifie ; la décision appartient à une personne." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Étiquettes : supervisé.', 'Récompenses : renforcement.', 'Biais : une erreur qui se répète.']),

    exoClasser('e02', 1, "Quel type d'apprentissage est utilisé ?", APPRENTISSAGES, ['supervisé', 'non supervisé', 'par renforcement'],
      { supervisé: 'Les exemples portent une étiquette : la bonne réponse est connue.', 'non supervisé': 'Aucune étiquette : le programme cherche lui-même des groupes.', 'par renforcement': 'Le programme apprend par essais, récompenses et pénalités.' },
      ['Y a-t-il des étiquettes ?', 'Y a-t-il des récompenses ?', 'Sinon, le programme cherche des groupes.'], 5),

    exoVraiFaux('e03', 1, [
      ['Une intelligence artificielle apprend à partir de données.', true, "Oui : ce sont les données d'entraînement."],
      ["Une intelligence artificielle ne se trompe jamais.", false, 'Non : elle peut donner une réponse fausse, même avec assurance.'],
      ["Des données d'entraînement déséquilibrées peuvent créer un biais.", true, 'Oui : le programme se trompe plus souvent sur ce qu\'il a peu vu.'],
      ["En apprentissage supervisé, les exemples sont étiquetés.", true, 'Oui : la bonne réponse est fournie avec chaque exemple.'],
      ['Un mot de passe identique pour tous les services est une bonne pratique.', false, "Non : si un service est piraté, tous les comptes sont exposés."],
      ["On peut réutiliser librement n'importe quelle image trouvée sur Internet.", false, "Non : la propriété intellectuelle protège les œuvres ; il faut une autorisation ou une licence qui le permet."],
      ['La géolocalisation est une donnée personnelle.', true, "Oui : elle renseigne sur les déplacements d'une personne."],
      ["Se faire passer pour quelqu'un d'autre en ligne est puni par la loi.", true, "Oui : c'est une usurpation d'identité."],
    ], ['Pense aux données d\'entraînement.', 'Une réponse se vérifie.', 'Une donnée personnelle identifie une personne.']),

    exoRelier('e04', 2, 'Associe chaque usage à ce que fait l\'intelligence artificielle.', [
      ['déverrouiller un téléphone avec le visage', 'identifier'], ['proposer le trajet le plus rapide', 'se repérer et calculer un itinéraire'], ['passer un texte du français à l\'anglais', 'traduire'], ['prévoir la consommation d\'électricité de demain', 'calculer et prévoir'], ['rédiger un résumé à partir d\'une consigne', 'générer du texte'],
    ], ['Que produit le programme ?', 'Reconnaître, c\'est identifier.', 'Prévoir repose sur des calculs.'], 4),

    exoSituation('e05', 2, 'Quelle règle faut-il appliquer ?', [
      ['Un site propose « tout accepter » ou « paramétrer » les témoins de connexion.', "paramétrer et refuser ceux qui ne sont pas nécessaires", 'tout accepter sans lire', 'fermer la fenêtre en donnant son mot de passe'],
      ['Tu veux illustrer un exposé avec une photo trouvée en ligne.', "vérifier qu'elle est libre de droits et citer son auteur", 'la copier sans rien vérifier', 'effacer le nom de l\'auteur'],
      ['Une application de lampe torche demande l\'accès à ta position et à tes contacts.', "refuser : ces accès sont inutiles pour éclairer", 'accepter, toutes les applications le font', 'donner aussi ton mot de passe'],
      ['Un camarade crée un faux compte au nom d\'un autre élève.', "c'est une usurpation d'identité : il faut le signaler à un adulte", "c'est une blague sans conséquence", 'il faut partager le compte'],
      ['Tu reçois un message qui te demande ton mot de passe pour « vérifier ton compte ».', 'ne pas répondre : un service ne demande jamais un mot de passe par message', 'répondre vite', 'transférer le message à tes contacts'],
    ], ['Quelle donnée est en jeu ?', 'Le service en a-t-il vraiment besoin ?', 'En cas de doute, on refuse et on en parle à un adulte.'], 'Un usage raisonné : ne donner que les données nécessaires, respecter les œuvres et les personnes.'),

    exoDocument('e06', 2, "Repère un biais dans des données d'entraînement.", [
      () => {
        const total = 1000, a = pick([850, 900, 950]), b = total - a;
        return {
          enonce: "Un programme doit reconnaître deux panneaux routiers. Voici ses données d'entraînement (données d'exercice)." + tableau([['Panneau', 'Stop', 'Cédez le passage'], ["Nombre de photos", a, b]]),
          questions: [
            nombre('Combien de photos le programme a-t-il reçues en tout ?', total),
            nombre('Quel pourcentage des photos montre un panneau « Stop » ?', a / 10),
            choix('Sur quel panneau le programme risque-t-il de se tromper le plus ?', 'Cédez le passage', 'Stop', 'aucun des deux'),
            choix('Comment corriger ce défaut ?', 'ajouter des photos de « Cédez le passage »', 'retirer toutes les photos', 'changer la couleur des panneaux'),
          ],
          correction: [`$${a} + ${b} = ${total}$ photos.`, `$${a} \\div ${total} = ${a / 10}\\ \\%$ de panneaux « Stop ».`, 'Le panneau <strong>le moins représenté</strong> est le moins bien appris.', 'On <strong>rééquilibre</strong> les données d\'entraînement.'],
        };
      },
    ], ['Additionne les deux effectifs.', 'Une catégorie rare est mal apprise.', 'On corrige un biais en complétant les données.']),

    exoOrdonner('e07', 2, [
      { consigne: "Remets dans l'ordre les étapes de la mise au point d'une intelligence artificielle qui reconnaît des déchets à trier.", etapes: ['Rassembler des photos de déchets', 'Étiqueter chaque photo : verre, papier, plastique', 'Entraîner le programme avec ces exemples', 'Tester le programme sur des photos nouvelles', 'Corriger les données si une catégorie est mal reconnue'] },
    ], ['Il faut des données avant d\'entraîner.', 'On teste sur des exemples jamais vus.', 'On corrige à la fin.']),

    exoDocument('e08', 3, "Évalue une intelligence artificielle à partir d'un test.", [
      () => {
        const n = 200, ok = pick([170, 180, 190]);
        return {
          enonce: `Un programme qui reconnaît des plantes est testé sur ${n} photos qu'il n'a jamais vues. Il donne ${ok} bonnes réponses (données d'exercice).`,
          questions: [
            nombre('Combien de réponses fausses a-t-il données ?', n - ok),
            nombre('Quel est son pourcentage de bonnes réponses ?', ok / 2),
            choix('Pourquoi le teste-t-on sur des photos nouvelles ?', "pour vérifier qu'il sait traiter des cas qu'il n'a pas appris par cœur", 'pour gagner du temps', 'pour effacer ses données'),
            choix("Un promeneur veut savoir si un champignon est comestible. Que doit-il faire de la réponse du programme ?", 'la faire vérifier par une personne compétente', 'la suivre sans réfléchir', 'la partager comme une certitude'),
          ],
          correction: [`$${n} - ${ok} = ${n - ok}$ erreurs.`, `$${ok} \\div ${n} = ${ok / 2}\\ \\%$ de bonnes réponses.`, 'Un test honnête utilise des exemples <strong>jamais vus</strong>.', "Le programme se trompe parfois : quand l'erreur est grave, <strong>une personne vérifie et décide</strong>."],
        };
      },
    ], ['Erreurs = total moins bonnes réponses.', 'Un pourcentage se calcule sur 100.', 'Plus l\'erreur est grave, plus il faut vérifier.']),

    exoDocument('e09', 3, 'Argumente sur la place du numérique.', [
      () => ({
        enonce: "Sujet : « Montre que le numérique est devenu indispensable dans les métiers, tout en posant des questions. » Voici quatre phrases : (a) Il faut donc former chacun à protéger ses données et à vérifier les réponses des machines. (b) Le numérique a transformé la plupart des métiers. (c) Un médecin s'appuie sur un logiciel pour repérer une anomalie sur une radio, un agriculteur pilote l'arrosage avec des capteurs. (d) Mais ces outils consomment de l'énergie, collectent des données et peuvent se tromper.",
        questions: [
          choix("Quelle phrase sert d'affirmation de départ ?", 'la phrase (b)', 'la phrase (d)', 'la phrase (a)'),
          choix('Quelle phrase donne des exemples ?', 'la phrase (c)', 'la phrase (a)', 'la phrase (b)'),
          choix('Quelle phrase apporte la nuance ?', 'la phrase (d)', 'la phrase (c)', 'la phrase (b)'),
          choix('Dans quel ordre faut-il les écrire ?', '(b), (c), (d), (a)', '(a), (b), (c), (d)', '(d), (a), (b), (c)'),
        ],
        correction: ['On <strong>affirme</strong> : (b).', 'On <strong>justifie</strong> par des exemples : (c).', 'On <strong>nuance</strong> : (d), qui commence par « mais ».', 'On <strong>conclut</strong> : (a), qui contient « donc ».'],
      }),
    ], ['Repère les mots « mais » et « donc ».', 'Les exemples viennent après l\'affirmation.', 'Affirmer, justifier, nuancer, conclure.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: "En apprentissage supervisé, les données d'entraînement sont :", choix: ['étiquetées : la bonne réponse est fournie', 'sans aucune étiquette', 'effacées après chaque exemple', 'toujours des images'], correct: 0, explication: 'Le programme apprend à partir d\'exemples dont on connaît la réponse.' },
    { type: 'qcm', question: "Un programme qui apprend à jouer en recevant des points quand il gagne utilise un apprentissage :", choix: ['par renforcement', 'supervisé', 'non supervisé', 'par copie'], correct: 0, explication: 'Il s\'améliore par essais, récompenses et pénalités.' },
    { type: 'vrai_faux', question: "Un biais peut venir de données d'entraînement déséquilibrées.", reponse: true, explication: 'Ce qui est peu représenté est mal appris.' },
    { type: 'qcm', question: 'Laquelle de ces informations est une donnée personnelle ?', choix: ['ta position géographique', 'la température extérieure', 'le nombre π', 'la date du jour'], correct: 0, explication: 'Elle renseigne sur une personne identifiable.' },
    { type: 'vrai_faux', question: "La réponse d'une intelligence artificielle doit être vérifiée avant une décision importante.", reponse: true, explication: 'Elle peut être fausse tout en paraissant sûre.' },
    { type: 'qcm', question: 'Un témoin de connexion (cookie) sert à :', choix: ['reconnaître un visiteur et suivre sa navigation', 'accélérer le processeur', 'protéger contre les virus', 'recharger la batterie'], correct: 0, explication: "C'est une trace numérique, que l'on peut refuser quand elle n'est pas nécessaire." },
  ],
};
