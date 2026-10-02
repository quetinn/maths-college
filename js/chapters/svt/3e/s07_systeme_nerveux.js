// =====================================================================
//  s07_systeme_nerveux.js — SVT 3ᵉ : le fonctionnement du système nerveux.
//  Récepteurs, messages nerveux, centres nerveux, effecteurs, neurones et
//  synapses, effets des comportements (alcool, bruit, sommeil).
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 22.
// =====================================================================

import { pick, melanger, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre, dec, arrondi } from '../outils.js';
import { tableau } from '../../commun.js';
import { arcNerveux, schemaNeurone, PARTIES_NEURONE } from '../figures.js';

const DEFINITIONS = [
  ['un stimulus', "Modification de l'environnement captée par un organe récepteur : lumière, son, pression, odeur."],
  ['un organe récepteur', 'Organe qui capte un stimulus et le transforme en message nerveux : œil, oreille, peau.'],
  ['un centre nerveux', 'Organe qui reçoit, traite et émet des messages nerveux : cerveau, moelle épinière.'],
  ['un organe effecteur', 'Organe qui exécute la réponse commandée par un centre nerveux : un muscle, par exemple.'],
  ['un neurone', 'Cellule spécialisée du système nerveux, qui transmet les messages nerveux.'],
  ['une synapse', 'Zone de contact entre deux neurones, où le message est transmis par des substances chimiques.'],
  ['un nerf', "Ensemble de prolongements de neurones qui relie les organes aux centres nerveux."],
];

export default {
  id: 's07',
  titre: 'Le fonctionnement du système nerveux',
  theme: 'svt_corps', niveau: '3e',
  icone: '🧠',

  intro:
    "Un ballon arrive vers toi : en une fraction de seconde, tu le vois, tu décides et ta main bouge. " +
    "Derrière ce geste, il y a un trajet précis : <strong>récepteur, centre nerveux, effecteur</strong>, reliés par des nerfs. On suit ce trajet jusqu'à l'échelle des <strong>neurones</strong>, et on comprend pourquoi l'alcool, la fatigue ou le bruit le perturbent.",

  cours: [
    {
      type: 'definition', titre: 'Capter : les organes récepteurs',
      contenu: "Un <strong>stimulus</strong> est une modification de l'environnement : lumière, son, pression, chaleur, substance odorante. Chaque <strong>organe récepteur</strong> (œil, oreille, peau, nez, langue) est sensible à un type de stimulus et le transforme en <strong>message nerveux</strong>.",
    },
    {
      type: 'propriete', titre: 'Transmettre et traiter',
      contenu: "Le message nerveux <strong>sensitif</strong> gagne un <strong>centre nerveux</strong> (cerveau ou moelle épinière) par un nerf. Le cerveau traite l'information dans des zones spécialisées qui communiquent entre elles : aire visuelle à l'arrière, aire auditive sur le côté, aire motrice sur le dessus. " +
        "Il élabore un message nerveux <strong>moteur</strong>, conduit par la moelle épinière et les nerfs jusqu'aux <strong>muscles</strong>, les organes effecteurs.",
    },
    { type: 'figure', titre: "De l'œil à la main", contenu: "Lance le stimulus et suis le message. Coche la case pour voir l'effet de la fatigue ou de l'alcool sur le temps de réaction.", render: (host) => arcNerveux(host) },
    {
      type: 'definition', titre: 'Les neurones',
      contenu: "Les centres nerveux et les nerfs sont formés de <strong>neurones</strong> : des cellules dotées d'un corps cellulaire (avec le noyau), de courts prolongements ramifiés (les dendrites) et d'un long prolongement (l'axone). " +
        "Le message nerveux, de nature électrique, parcourt le neurone. Le cerveau humain compte environ 86 milliards de neurones.",
    },
    {
      type: 'definition', titre: 'Les synapses',
      contenu: "Deux neurones ne se touchent pas. À leur zone de contact, la <strong>synapse</strong>, le premier neurone libère des <strong>substances chimiques</strong> qui déclenchent un nouveau message dans le neurone suivant. " +
        "Chaque neurone est relié à des milliers d'autres : ces réseaux se modifient quand on apprend.",
    },
    {
      type: 'propriete', titre: 'Préserver son système nerveux',
      contenu: "L'<strong>alcool</strong> et les <strong>drogues</strong> perturbent les synapses : les messages passent mal, le temps de réaction s'allonge, la perception est faussée. " +
        "Un <strong>bruit</strong> trop fort détruit des cellules de l'oreille qui ne se remplacent pas. Le <strong>manque de sommeil</strong> gêne la mémoire et l'attention, car le cerveau consolide les apprentissages pendant la nuit.",
    },
    {
      type: 'exemple', enonce: "Une personne voit, mais ne reconnaît plus ce qu'elle voit après un accident qui a touché l'arrière de son cerveau. Ses yeux sont intacts. Explique.",
      solution_etapes: ["Les yeux captent la lumière et envoient un message nerveux : ils fonctionnent.", "L'arrière du cerveau contient l'aire visuelle, qui traite ce message.", "L'aire visuelle étant endommagée, le message n'est plus traité : voir demande des yeux et un cerveau."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Nommer le stimulus et le récepteur', explication: "Qu'est-ce qui a déclenché la réaction, et quel organe l'a capté ?" },
    { etape: 2, titre: 'Suivre le message sensitif', explication: "Par quel nerf rejoint-il le centre nerveux ?" },
    { etape: 3, titre: 'Indiquer le centre nerveux', explication: "Cerveau ou moelle épinière : c'est là que l'information est traitée et la réponse élaborée." },
    { etape: 4, titre: "Suivre le message moteur jusqu'à l'effecteur", explication: "Quel muscle se contracte ? Présente le tout par un schéma fléché : récepteur → centre nerveux → effecteur." },
  ],

  exercices: [
    exoRelier('e01', 1, 'Associe chaque stimulus à son organe récepteur.', [
      ['la lumière', "l'œil"], ['un son', "l'oreille"], ['une pression sur le bras', 'la peau'], ['une odeur de fumée', 'le nez'], ['le goût sucré', 'la langue'],
    ], ['Chaque organe des sens est sensible à un type de stimulus.', 'Le toucher passe par la peau.', 'Les substances dissoutes dans la salive sont captées par la langue.']),

    {
      id: 'e02', niveau: 1, type: 'legender', consigne: 'Légende ce neurone.',
      generer() {
        const ordre = melanger([...PARTIES_NEURONE]);
        return { legendes: ordre, leurres: ['nerf', 'muscle'], visuel: (host) => { host.innerHTML = schemaNeurone(ordre); } };
      },
      indices: ['Le noyau se trouve dans le corps cellulaire.', "L'axone est le long prolongement unique ; les dendrites sont courtes et ramifiées.", 'La synapse est la zone de contact avec la cellule suivante.'],
      correction_etapes: (st) => {
        const n = (nom) => st.legendes.indexOf(nom) + 1;
        return [`Le <strong>corps cellulaire</strong> (repère ${n('corps cellulaire')}) contient le <strong>noyau</strong> (repère ${n('noyau')}).`, `Les prolongements courts et ramifiés sont les <strong>dendrites</strong> (repère ${n('dendrite')}) ; le long prolongement est l'<strong>axone</strong> (repère ${n('axone')}).`, `Au bout de l'axone, la zone de contact avec la cellule suivante est la <strong>synapse</strong> (repère ${n('synapse')}).`];
      },
    },

    exoVraiFaux('e03', 1, [
      ['Le cerveau est un centre nerveux.', true, 'Oui, comme la moelle épinière.'],
      ['Un muscle est un organe récepteur.', false, 'Non : c\'est un organe effecteur, il exécute la réponse.'],
      ['Deux neurones voisins se touchent directement.', false, 'Non : ils sont séparés par un minuscule espace, la synapse, que franchissent des substances chimiques.'],
      ['Le message nerveux moteur va du cerveau vers les muscles.', true, 'Oui : le message sensitif fait le trajet inverse, du récepteur vers le cerveau.'],
      ["L'alcool raccourcit le temps de réaction.", false, 'Non : il l\'allonge, en perturbant les synapses.'],
      ["Les cellules de l'oreille détruites par un bruit trop fort repoussent.", false, 'Non : la perte d\'audition est définitive.'],
      ['On voit avec ses yeux et avec son cerveau.', true, 'Oui : les yeux captent, l\'aire visuelle du cerveau traite.'],
      ['Le sommeil aide à mémoriser.', true, 'Oui : le cerveau consolide les apprentissages pendant la nuit.'],
    ], ['Récepteur : capte. Effecteur : agit.', 'Sensitif : vers le cerveau. Moteur : vers les muscles.', 'Alcool et drogues agissent sur les synapses.']),

    exoOrdonner('e04', 2, [
      { consigne: "Tu vois un ballon arriver et tu l'attrapes. Remets le trajet dans l'ordre :", etapes: ["L'œil capte la lumière renvoyée par le ballon", 'Un message nerveux sensitif parcourt le nerf optique', "Le cerveau traite l'information et élabore une réponse", 'Un message nerveux moteur descend par la moelle épinière', 'Un nerf moteur conduit le message au muscle du bras', 'Le muscle se contracte : la main attrape le ballon'] },
      { consigne: "Le réveil sonne et tu l'éteins. Remets le trajet dans l'ordre :", etapes: ["L'oreille capte le son du réveil", 'Un message nerveux sensitif parcourt le nerf auditif', "Le cerveau traite l'information et élabore une réponse", 'Un message nerveux moteur descend par la moelle épinière', 'Un nerf moteur conduit le message au muscle du bras', 'Le muscle se contracte : la main appuie sur le bouton'] },
    ], ['Tout commence par un organe récepteur.', 'Le message sensitif arrive au cerveau avant que le message moteur n\'en parte.', 'Le muscle agit en dernier.']),

    exoClasser('e05', 2, 'Récepteur, centre nerveux ou effecteur ?', [
      ["l'œil", 'récepteur'], ["l'oreille", 'récepteur'], ['la peau', 'récepteur'], ['la langue', 'récepteur'],
      ['le cerveau', 'centre nerveux'], ['la moelle épinière', 'centre nerveux'],
      ['le muscle du bras', 'effecteur'], ['le muscle de la jambe', 'effecteur'], ['le muscle qui ferme la paupière', 'effecteur'],
    ], ['récepteur', 'centre nerveux', 'effecteur'], { récepteur: 'Il capte un stimulus.', 'centre nerveux': 'Il traite les messages et élabore la réponse.', effecteur: 'Il exécute la réponse.' },
    ['Un organe des sens est un récepteur.', 'Le cerveau et la moelle épinière traitent l\'information.', 'Un muscle exécute le mouvement.'], 4),

    exoDocument('e06', 2, 'Exploite ces mesures.', [
      () => {
        const v = pick([10, 14, 20, 25]), t1 = 1, t2 = pick([1.5, 2]);
        return {
          enonce: `Dans cet exercice, on suppose que le temps de réaction d'un conducteur attentif est de ${t1} seconde et qu'il passe à ${dec(t2)} secondes avec de l'alcool dans le sang ou un téléphone en main. Pendant ce temps, la voiture continue de rouler à sa vitesse : ici <strong>${v} m/s</strong>.`,
          questions: [
            nombre(`Quelle distance la voiture parcourt-elle pendant le temps de réaction du conducteur attentif ?`, v * t1, { unite: 'm' }),
            nombre('Et pendant celui du conducteur qui a bu ou qui téléphone ?', v * t2, { unite: 'm' }),
            choix("L'alcool allonge le temps de réaction car il :", 'perturbe la transmission des messages aux synapses', 'affaiblit les muscles', 'abîme les yeux'),
          ],
          correction: [`Distance = vitesse × durée = ${v} × ${t1} = <strong>${v * t1} m</strong>.`, `${v} × ${dec(t2)} = <strong>${dec(v * t2)} m</strong>, soit ${dec(v * t2 - v * t1)} m de plus avant même de commencer à freiner.`, "L'alcool agit sur les <strong>synapses</strong> du cerveau : l'information est traitée plus lentement."],
        };
      },
    ], ['Distance = vitesse × durée.', 'La durée est en secondes, la vitesse en mètres par seconde.', 'Les drogues et l\'alcool agissent au niveau des synapses.']),

    exoDocument('e07', 3, 'Raisonne à partir de ces observations médicales.', [
      () => ({
        enonce: "On observe trois patients dont les yeux et les muscles sont intacts." +
          tableau([['Patient', 'Zone endommagée', 'Conséquence'], ['A', 'nerf optique sectionné', 'ne voit plus'], ['B', "aire visuelle, à l'arrière du cerveau", 'ne voit plus'], ['C', 'moelle épinière sectionnée au milieu du dos', 'ne bouge plus les jambes, bouge les bras']]),
        questions: [
          choix('Chez le patient A, le message nerveux sensitif :', "n'arrive plus au cerveau", "n'est plus fabriqué par l'œil", 'arrive au cerveau mais n\'est pas traité'),
          choix('Le patient B montre que, pour voir, il faut :', 'que le cerveau traite le message venu des yeux', 'seulement des yeux en bon état', 'des muscles en bon état'),
          choix('Chez le patient C, les jambes ne bougent plus car :', 'le message moteur ne peut plus descendre jusqu\'aux muscles des jambes', 'les muscles des jambes sont détruits', 'le cerveau ne fabrique plus de message moteur'),
        ],
        correction: ["L'œil fonctionne, mais le nerf est coupé : le message <strong>n'arrive plus</strong> au cerveau.", "Le message arrive, mais l'aire visuelle ne peut pas le <strong>traiter</strong> : voir demande aussi le cerveau.", "Le message moteur passe par la moelle épinière : sous la section, il <strong>ne passe plus</strong>. Les bras, commandés plus haut, bougent encore."],
      }),
      () => ({
        enonce: "Par imagerie médicale, on repère les zones du cerveau qui s'activent pendant différentes tâches." +
          tableau([['Tâche', 'Zone la plus active'], ['regarder une image', "arrière du cerveau"], ['écouter de la musique', 'côté du cerveau'], ['bouger la main', 'dessus du cerveau'], ['lire un mot à voix haute', "arrière, puis côté, puis dessus"]]),
        questions: [
          choix('Quelle zone traite les messages venus des yeux ?', "l'arrière du cerveau", 'le côté du cerveau', 'le dessus du cerveau'),
          choix('Ces observations montrent que le cerveau :', 'possède des zones spécialisées', 'travaille de la même façon partout', 'ne sert qu\'à commander les muscles'),
          choix('Lire à voix haute active plusieurs zones, car elles :', 'communiquent entre elles pour réaliser la tâche', 'fonctionnent au hasard', 'sont toutes des aires visuelles'),
        ],
        correction: ["Regarder active l'<strong>arrière</strong> du cerveau : c'est l'aire visuelle.", 'Chaque tâche active une zone différente : le cerveau a des <strong>zones spécialisées</strong>.', 'Voir le mot, le reconnaître, puis commander la parole : les zones <strong>communiquent</strong>.'],
      }),
    ], ['Retrouve le trajet : récepteur, nerf, centre nerveux, nerf, effecteur.', 'Demande-toi à quel endroit le trajet est interrompu.', 'Un message qui arrive doit encore être traité.']),

    exoClasser('e08', 2, 'Ce comportement protège-t-il ou met-il en danger le système nerveux ?', [
      ['dormir neuf heures par nuit', 'protège'], ['porter des bouchons d\'oreille à un concert', 'protège'], ['baisser le volume de ses écouteurs', 'protège'], ['éteindre les écrans une heure avant de dormir', 'protège'],
      ['écouter de la musique à plein volume pendant des heures', 'met en danger'], ['boire de l\'alcool', 'met en danger'], ['consommer du cannabis', 'met en danger'], ['regarder des vidéos jusqu\'à deux heures du matin', 'met en danger'],
    ], ['protège', 'met en danger'], { protège: 'Sommeil suffisant et protection des oreilles préservent neurones et cellules sensorielles.', 'met en danger': 'Bruit, drogues, alcool et manque de sommeil perturbent ou détruisent des cellules nerveuses.' },
    ['Le cerveau a besoin de sommeil.', 'Les cellules de l\'oreille ne se remplacent pas.', 'Alcool et drogues perturbent les synapses.']),

    {
      id: 'e09', niveau: 3, type: 'saisie', consigne: 'Calcule la durée du trajet du message nerveux :',
      generer() {
        const d = pick([0.8, 1, 1.2, 1.5]), v = pick([50, 100]);
        return { enonce: `Tu marches sur un caillou pointu. Le message nerveux sensitif parcourt ${dec(d)} m du pied à la moelle épinière, à une vitesse que l'on suppose égale à ${v} m/s. Combien de temps met-il, en seconde ?`, reponse: arrondi(d / v, 3), validation: 'nombre', unite: 's', tolerance: 0.0006, pieges: [{ valeur: d * v, message: 'Durée = distance ÷ vitesse : on divise.' }], _v: { d, v } };
      },
      indices: ['Vitesse = distance ÷ durée.', 'Donc durée = distance ÷ vitesse.', 'Le résultat est bien plus petit qu\'une seconde.'],
      correction_etapes: (st) => [`$t = \\dfrac{d}{v} = \\dfrac{${String(st._v.d).replace('.', '{,}')}}{${st._v.v}}$.`, `$t = ${String(arrondi(st._v.d / st._v.v, 3)).replace('.', '{,}')}$ s : le message nerveux est très rapide.`],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: "L'œil est :", choix: ['un organe récepteur', 'un centre nerveux', 'un organe effecteur', 'un nerf'], correct: 0, explication: 'Il capte la lumière et fabrique un message nerveux.' },
    { type: 'qcm', question: 'Le message nerveux moteur va :', choix: ['du centre nerveux vers le muscle', 'du muscle vers le cerveau', "de l'œil vers le cerveau", "d'un muscle à un autre"], correct: 0, explication: 'Le message sensitif fait le trajet inverse.' },
    { type: 'qcm', question: 'La zone de contact entre deux neurones s\'appelle :', choix: ['une synapse', 'un axone', 'un nerf', 'un noyau'], correct: 0, explication: 'Le message y est transmis par des substances chimiques.' },
    { type: 'vrai_faux', question: "L'alcool allonge le temps de réaction.", reponse: true, explication: 'Il perturbe la transmission des messages aux synapses.' },
    { type: 'qcm', question: 'Le cerveau et la moelle épinière sont :', choix: ['des centres nerveux', 'des organes récepteurs', 'des organes effecteurs', 'des nerfs'], correct: 0, explication: 'Ils reçoivent, traitent et émettent des messages nerveux.' },
    { type: 'vrai_faux', question: "Une personne dont les yeux sont intacts voit forcément.", reponse: false, explication: 'Non : il faut aussi que le nerf optique et l\'aire visuelle du cerveau fonctionnent.' },
  ],
};
