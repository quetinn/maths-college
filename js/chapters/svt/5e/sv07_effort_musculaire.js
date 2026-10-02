// =====================================================================
//  sv07_effort_musculaire.js — SVT 5ᵉ : le fonctionnement de l'organisme
//  lors d'un effort musculaire. Besoins des muscles, rythmes cardiaque et
//  respiratoire, limites, entraînement, dopage.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 21.
//  Valeurs vérifiées (voir js/sources.js) : 50 à 80 battements par minute
//  au repos, fréquence maximale théorique = 220 − âge, 12 à 20 mouvements
//  respiratoires par minute au repos. Les mesures d'élèves sont inventées.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { effortPhysique } from '../figures.js';

const DEFINITIONS = [
  ['la fréquence cardiaque', 'Nombre de battements du cœur en une minute.'],
  ['la fréquence respiratoire', 'Nombre de mouvements respiratoires (inspiration et expiration) en une minute.'],
  ['un nutriment', "Petite molécule issue de la digestion, utilisée par les organes ; le glucose en est un."],
  ["l'entraînement", "Pratique régulière d'une activité physique, qui améliore les capacités de l'organisme."],
  ['le dopage', "Usage de substances interdites pour augmenter artificiellement ses performances, dangereux pour la santé."],
  ["l'échauffement", "Exercices progressifs qui préparent les muscles et le cœur avant un effort."],
];

export default {
  id: 'sv07',
  titre: "Le fonctionnement de l'organisme lors d'un effort musculaire",
  theme: 'svt_corps', niveau: '5e',
  icone: '🏃',

  intro:
    "Après un sprint, ton cœur cogne, tu es essoufflé et tu as chaud. Ces réactions ne sont pas un hasard : " +
    "elles permettent d'apporter aux <strong>muscles</strong> ce dont ils ont besoin. On étudie comment l'organisme s'ajuste à l'effort, jusqu'où il peut aller, et comment le préserver.",

  cours: [
    {
      type: 'definition', titre: 'Les besoins des muscles',
      contenu: "Pour se contracter, un muscle utilise du <strong>dioxygène</strong> et des <strong>nutriments</strong> (du glucose), apportés par le sang. Il rejette du <strong>dioxyde de carbone</strong> et produit de la chaleur. Pendant un effort, ces besoins augmentent fortement.",
    },
    {
      type: 'propriete', titre: "L'organisme s'ajuste",
      contenu: "Pendant l'effort, la <strong>fréquence respiratoire</strong> augmente : davantage de dioxygène entre dans le sang. La <strong>fréquence cardiaque</strong> augmente aussi : le sang circule plus vite et approvisionne mieux les muscles. " +
        "Au repos, le cœur d'un adulte bat de 50 à 80 fois par minute et l'on respire de 12 à 20 fois par minute.",
    },
    { type: 'figure', titre: "Du repos à l'effort intense", contenu: "Augmente l'intensité de l'effort et observe le cœur et la respiration.", render: (host) => effortPhysique(host) },
    {
      type: 'propriete', titre: 'Des limites',
      contenu: "Le cœur ne peut pas accélérer indéfiniment. Sa fréquence maximale théorique se calcule ainsi :",
      formule: '\\text{fréquence cardiaque maximale} = 220 - \\text{âge}',
    },
    {
      type: 'propriete', titre: 'Un contrôle nerveux',
      contenu: "Les rythmes cardiaque et respiratoire sont commandés par le <strong>système nerveux</strong> : des centres nerveux reçoivent des informations sur l'état de l'organisme et ajustent, par des nerfs, l'activité du cœur et des muscles respiratoires.",
    },
    {
      type: 'propriete', titre: "S'entraîner sans se mettre en danger",
      contenu: "Un <strong>entraînement</strong> régulier rend le cœur plus efficace : au repos, celui d'un sportif d'endurance peut battre seulement 50 fois par minute. L'<strong>échauffement</strong>, l'hydratation et la récupération évitent les blessures. Le <strong>dopage</strong> masque les signaux d'alerte du corps et abîme le cœur et d'autres organes.",
    },
    {
      type: 'exemple', enonce: "Quelle est la fréquence cardiaque maximale théorique d'un élève de 13 ans ? Il mesure 196 battements par minute en fin de course : doit-il continuer à accélérer ?",
      solution_etapes: ['220 − 13 = 207 battements par minute.', '196 est proche de 207 : il approche de sa limite.', "Il ne doit pas chercher à accélérer davantage : l'organisme a des limites."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Mesurer au repos', explication: "Compte les battements du cœur pendant 15 secondes, puis multiplie par 4 pour obtenir la fréquence par minute." },
    { etape: 2, titre: "Mesurer juste après l'effort", explication: "Refais la mesure dès l'arrêt de l'effort." },
    { etape: 3, titre: 'Comparer', explication: "Calcule l'écart, ou le nombre de fois où la valeur a été multipliée." },
    { etape: 4, titre: 'Expliquer', explication: "« Les muscles consomment plus de dioxygène et de nutriments : le cœur bat plus vite pour leur en apporter davantage. »" },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Fréquence : un nombre par minute.', 'Le glucose est un nutriment.', 'Le dopage est interdit et dangereux.']),

    {
      id: 'e02', niveau: 1, type: 'saisie', consigne: 'Calcule la fréquence cardiaque :',
      generer() {
        const b = randInt(16, 40);
        return { enonce: `Un élève compte ${b} battements de son cœur en 15 secondes. Quelle est sa fréquence cardiaque, en battements par minute ?`, reponse: b * 4, validation: 'nombre', _v: { b } };
      },
      indices: ['Une minute dure 60 secondes.', '15 secondes, c\'est un quart de minute.', 'Multiplie par 4.'],
      correction_etapes: (st) => ['60 ÷ 15 = 4 : il y a quatre fois 15 secondes dans une minute.', `${st._v.b} × 4 = <strong>${st._v.b * 4} battements par minute</strong>.`],
    },

    exoVraiFaux('e03', 1, [
      ['Pendant un effort, un muscle consomme plus de dioxygène qu\'au repos.', true, 'Oui, et plus de nutriments.'],
      ['Pendant un effort, la fréquence cardiaque diminue.', false, 'Non : elle augmente, pour apporter plus de sang aux muscles.'],
      ['Un muscle qui travaille rejette du dioxyde de carbone.', true, 'Oui, et il produit de la chaleur.'],
      ['Le cœur peut accélérer sans limite.', false, 'Non : il existe une fréquence cardiaque maximale.'],
      ["L'entraînement rend le cœur plus efficace.", true, 'Oui : au repos, le cœur d\'un sportif entraîné bat plus lentement.'],
      ['Le dopage est sans danger pour la santé.', false, 'Non : il abîme le cœur et d\'autres organes.'],
      ["Le rythme du cœur est commandé par le système nerveux.", true, 'Oui : des centres nerveux l\'ajustent en permanence.'],
    ], ['Plus d\'effort, plus de besoins.', 'L\'organisme a des limites.', 'Le système nerveux commande le cœur.']),

    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Calcule la fréquence cardiaque maximale théorique :',
      generer() {
        const age = pick([11, 12, 13, 14, 15, 20, 40, 60]);
        return { enonce: `Quelle est la fréquence cardiaque maximale théorique d'une personne de ${age} ans, en battements par minute ?`, reponse: 220 - age, validation: 'nombre', _v: { age } };
      },
      indices: ['Utilise la formule du cours.', 'Fréquence maximale = 220 − âge.', 'Plus on est âgé, plus elle est basse.'],
      correction_etapes: (st) => [`Fréquence cardiaque maximale = 220 − âge.`, `220 − ${st._v.age} = <strong>${220 - st._v.age} battements par minute</strong>.`],
    },

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre ce qui se passe quand tu te mets à courir :", etapes: ['Les muscles des jambes se contractent davantage', 'Ils consomment plus de dioxygène et de nutriments', 'Le système nerveux commande une accélération du cœur et de la respiration', 'Le sang circule plus vite et se charge de plus de dioxygène', 'Les muscles sont mieux approvisionnés'] },
    ], ['Tout part des muscles.', 'Le système nerveux réagit aux besoins.', 'Le résultat est un meilleur approvisionnement.']),

    exoDocument('e06', 2, "Compare le repos et l'effort.", [
      () => {
        const fcR = randInt(68, 80), fcE = fcR + randInt(60, 90), frR = randInt(14, 18), frE = frR * pick([2, 3]);
        return {
          enonce: "Mesures inventées pour l'exercice. Une élève mesure ses rythmes au repos, puis juste après trois minutes de course." +
            tableau([['', 'Au repos', 'Après la course'], ['Fréquence cardiaque (par minute)', fcR, fcE], ['Fréquence respiratoire (par minute)', frR, frE]]),
          questions: [
            nombre('De combien de battements par minute la fréquence cardiaque a-t-elle augmenté ?', fcE - fcR),
            nombre('Par combien la fréquence respiratoire a-t-elle été multipliée ?', frE / frR),
            choix('Ces deux augmentations permettent :', "d'apporter plus de dioxygène aux muscles", 'de refroidir les poumons', 'de ralentir les muscles'),
          ],
          correction: [`${fcE} − ${fcR} = <strong>${fcE - fcR} battements par minute</strong> de plus.`, `${frE} ÷ ${frR} = <strong>${frE / frR}</strong>.`, "Plus d'air dans les poumons et un sang qui circule plus vite : <strong>plus de dioxygène pour les muscles</strong>."],
        };
      },
    ], ['Une augmentation se calcule par une soustraction.', 'Pour « combien de fois », on divise.', 'Les muscles ont besoin de dioxygène.']),

    exoClasser('e07', 2, 'Bonne ou mauvaise pratique pour un sportif ?', [
      ["s'échauffer avant l'effort", 'bonne pratique'], ['boire de l\'eau régulièrement', 'bonne pratique'], ['dormir suffisamment', 'bonne pratique'], ['augmenter progressivement la durée des séances', 'bonne pratique'], ['manger équilibré', 'bonne pratique'],
      ['prendre un produit dopant', 'mauvaise pratique'], ['démarrer un sprint sans échauffement', 'mauvaise pratique'], ['continuer malgré une douleur vive', 'mauvaise pratique'], ['ne jamais se reposer entre les séances', 'mauvaise pratique'],
    ], ['bonne pratique', 'mauvaise pratique'], { 'bonne pratique': "Ces habitudes préparent l'organisme et lui laissent le temps de récupérer.", 'mauvaise pratique': 'Ces comportements exposent aux blessures ou abîment les organes.' },
    ['L\'organisme a besoin de préparation et de repos.', 'La douleur est un signal d\'alerte.', 'Le dopage masque les limites du corps.']),

    exoDocument('e08', 3, "Mesure l'effet de l'entraînement.", [
      () => {
        const avant = randInt(74, 82), apres = avant - randInt(8, 14);
        return {
          enonce: "Mesures inventées pour l'exercice. Un élève commence la course à pied, trois fois par semaine. Il mesure sa fréquence cardiaque au repos avant de commencer, puis six mois plus tard." +
            tableau([['', 'Avant', 'Six mois plus tard'], ['Fréquence cardiaque au repos (par minute)', avant, apres]]),
          questions: [
            nombre('De combien de battements par minute sa fréquence cardiaque de repos a-t-elle baissé ?', avant - apres),
            choix('Son cœur est devenu :', 'plus efficace : il propulse autant de sang avec moins de battements', 'moins efficace', 'plus petit'),
            nombre('Combien de battements son cœur économise-t-il en une heure de repos ?', (avant - apres) * 60),
          ],
          correction: [`${avant} − ${apres} = <strong>${avant - apres} battements par minute</strong> de moins.`, "Avec l'entraînement, le cœur propulse plus de sang à chaque battement : il est <strong>plus efficace</strong>.", `${avant - apres} × 60 = <strong>${(avant - apres) * 60} battements</strong> économisés en une heure.`],
        };
      },
    ], ['Soustrais les deux mesures.', 'Un cœur entraîné bat plus lentement au repos.', 'Une heure = 60 minutes.']),

    exoSituation('e09', 3, 'Prends la bonne décision.', [
      ["Avant un cross, un camarade te propose un médicament « pour courir plus vite ». Que réponds-tu ?", 'Non : un produit dopant est dangereux pour le cœur et interdit.', 'Oui, si la dose est faible.', 'Oui, une seule fois ne fait rien.'],
      ['En pleine course, tu ressens une douleur vive dans la cuisse. Que fais-tu ?', "Je m'arrête : la douleur est un signal d'alerte.", "J'accélère pour finir plus vite.", "Je continue en serrant les dents."],
      ["Il fait très chaud et tu vas courir une heure. Quelle précaution est la plus importante ?", 'Boire de l\'eau avant, pendant et après.', 'Ne rien boire pour ne pas être lourd.', 'Courir le plus vite possible dès le départ.'],
      ['Pourquoi commence-t-on une séance par un échauffement ?', 'Pour préparer progressivement les muscles et le cœur.', 'Pour fatiguer les muscles avant l\'effort.', 'Pour faire baisser la température du corps.'],
    ], ['Le corps envoie des signaux : il faut les écouter.', 'L\'organisme a besoin d\'eau.', 'Un produit qui masque la fatigue est dangereux.'], "Préserver son organisme, c'est respecter ses limites : échauffement, hydratation, repos, et jamais de dopage."),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Pendant un effort, la fréquence cardiaque :', choix: ['augmente', 'diminue', 'ne change pas', 's\'arrête'], correct: 0, explication: 'Le sang doit apporter plus de dioxygène et de nutriments aux muscles.' },
    { type: 'qcm', question: 'Pour se contracter, un muscle utilise :', choix: ['du dioxygène et des nutriments', 'du dioxyde de carbone', 'uniquement de l\'eau', 'de la lumière'], correct: 0, explication: 'Ils sont apportés par le sang.' },
    {
      type: 'saisie', question: 'Fréquence maximale.',
      generer() { const age = pick([12, 13, 14, 30, 50]); return { question: `Calcule la fréquence cardiaque maximale théorique d'une personne de ${age} ans.`, reponse: 220 - age, validation: 'nombre', explication: `220 − ${age} = ${220 - age} battements par minute.` }; },
    },
    { type: 'vrai_faux', question: "Au repos, le cœur d'un sportif entraîné bat plus lentement que celui d'une personne non entraînée.", reponse: true, explication: 'Son cœur est plus efficace.' },
    { type: 'qcm', question: 'Le rythme du cœur est ajusté par :', choix: ['le système nerveux', 'les os', 'l\'estomac', 'la peau'], correct: 0, explication: 'Des centres nerveux le commandent par des nerfs.' },
    { type: 'vrai_faux', question: 'Le dopage est dangereux pour la santé.', reponse: true, explication: 'Il abîme le cœur et masque les signaux d\'alerte.' },
  ],
};
