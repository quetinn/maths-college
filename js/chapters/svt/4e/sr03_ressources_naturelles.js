// =====================================================================
//  sr03_ressources_naturelles.js — SVT 4ᵉ : les enjeux de l'exploitation
//  des ressources naturelles. Eau, sol, énergies, ressources minérales ;
//  ressources renouvelables ou non ; gestion durable.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 7.
//  Valeur vérifiée : durée de formation d'un sol, de cent ans (région
//  tropicale) à dix mille ans (zones froides), citée par le programme
//  officiel. Les relevés des exercices sont inventés pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, fleche, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['une ressource naturelle', "Élément de la nature utilisé par l'être humain : eau, sol, bois, pétrole, minerais."],
  ['une ressource renouvelable', "Ressource qui se reconstitue assez vite pour être utilisée sans s'épuiser, si on ne la prélève pas trop."],
  ['une ressource non renouvelable', "Ressource qui met des millions d'années à se former : une fois consommée, elle n'est pas remplacée à l'échelle humaine."],
  ['une énergie fossile', 'Charbon, pétrole ou gaz naturel, formés à partir de restes d\'êtres vivants enfouis.'],
  ['le sol', "Couche superficielle, formée de roche altérée et de matière issue des êtres vivants, où poussent les plantes."],
  ["l'érosion", "Arrachement et transport du sol par l'eau ou le vent."],
  ['la gestion durable', "Usage d'une ressource qui répond aux besoins actuels sans empêcher les générations futures de répondre aux leurs."],
];

const boite = (x, t, c = 'sv-plein-gris') => `<rect x="${x - 34}" y="70" width="68" height="40" rx="8" class="${c}"/><text x="${x}" y="94" text-anchor="middle" class="pc-petit">${t}</text>`;
const circuit = (n) => [['captage', 'sv-plein-bleu'], ['eau potable', 'sv-plein-bleu'], ['maison', 'sv-plein-gris'], ['épuration', 'sv-plein-vert']]
  .map(([t, c], i) => (i <= n ? boite(44 + i * 78, t, c) + (i < n ? fleche(80 + i * 78, 90, 86 + i * 78, 90) : '') : '')).join('');
const SCENES_EAU = [
  ['Captage', circuit(0), "L'eau est prélevée dans une rivière ou une nappe souterraine."],
  ['Traitement', circuit(1), "Dans une usine, elle est filtrée et désinfectée pour devenir <strong>potable</strong>."],
  ['Usages', circuit(2), 'Elle est distribuée aux habitations. Après usage, elle est salie : ce sont les eaux usées.'],
  ['Épuration', circuit(3), "Une <strong>station d'épuration</strong> nettoie les eaux usées avant de les rejeter dans la rivière."],
];

export default {
  id: 'sr03',
  titre: "Les enjeux de l'exploitation de ressources naturelles",
  theme: 'svt_terre', niveau: '4e',
  icone: '⛏️',

  intro:
    "Boire, manger, se chauffer, fabriquer un téléphone : chacune de ces actions puise dans une ressource de la planète. " +
    "Certaines se renouvellent, d'autres non. On apprend à les distinguer et à comprendre ce que signifie les <strong>gérer durablement</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Renouvelable ou non',
      contenu: "Une ressource est <strong>renouvelable</strong> si elle se reconstitue à l'échelle d'une vie humaine : l'eau, le bois, le vent, la lumière du Soleil. " +
        "Elle est <strong>non renouvelable</strong> si sa formation demande des millions d'années : le charbon, le pétrole, le gaz naturel, les minerais.",
    },
    {
      type: 'propriete', titre: "L'eau douce",
      contenu: "L'eau douce disponible est inégalement répartie sur la planète. Elle sert à boire, à irriguer les cultures et à l'industrie. Avant d'être bue, elle est rendue potable ; après usage, elle doit être <strong>épurée</strong> pour ne pas polluer les rivières.",
    },
    { type: 'figure', titre: "Le circuit de l'eau du robinet", contenu: 'Parcours les quatre étapes.', render: (host) => etapes(host, 'Étape', SCENES_EAU) },
    {
      type: 'propriete', titre: 'Le sol',
      contenu: "Le <strong>sol</strong> nourrit les plantes cultivées. Il se forme très lentement : il faut entre cent ans, en région tropicale, et dix mille ans, dans les zones froides. L'<strong>érosion</strong>, les constructions et certaines pratiques agricoles peuvent le détruire bien plus vite.",
    },
    {
      type: 'propriete', titre: 'Les énergies',
      contenu: "Les <strong>énergies fossiles</strong> (charbon, pétrole, gaz) sont non renouvelables et leur combustion rejette du dioxyde de carbone. Les <strong>énergies renouvelables</strong> (solaire, éolienne, hydraulique, bois, géothermie) ne s'épuisent pas, mais chacune a ses contraintes.",
    },
    {
      type: 'propriete', titre: 'Les ressources minérales',
      contenu: "Le fer, le cuivre, l'aluminium, le sable, le calcaire sont extraits de mines et de carrières. Ils ne se renouvellent pas : économiser, réparer et <strong>recycler</strong> prolonge leur disponibilité.",
    },
    {
      type: 'definition', titre: 'Gérer durablement',
      contenu: "Une <strong>gestion durable</strong> répond aux besoins d'aujourd'hui sans priver les générations futures : ne pas prélever plus que ce qui se renouvelle, limiter le gaspillage, recycler, restaurer ce qui a été dégradé.",
    },
    {
      type: 'exemple', enonce: "Un robinet qui goutte perd 4 litres d'eau par heure. Combien d'eau est gaspillée en une journée ?",
      solution_etapes: ['Une journée compte 24 heures.', '4 × 24 = 96 litres.', 'Près de 100 litres gaspillés par jour : une petite fuite coûte cher à la ressource.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Identifier la ressource', explication: "De quelle ressource s'agit-il, et à quoi sert-elle ?" },
    { etape: 2, titre: 'Se demander si elle se renouvelle', explication: "En combien de temps se reconstitue-t-elle ? Quelques années, ou des millions d'années ?" },
    { etape: 3, titre: 'Comparer prélèvement et renouvellement', explication: "Si l'on prélève plus vite que la ressource ne se reconstitue, elle s'épuise." },
    { etape: 4, titre: 'Proposer une gestion', explication: "Économiser, recycler, remplacer par une ressource renouvelable, protéger." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Renouvelable : se reconstitue vite.', 'Fossile : charbon, pétrole, gaz.', 'Durable : penser aux générations futures.']),

    exoClasser('e02', 1, 'Renouvelable ou non renouvelable ?', [
      ['le vent', 'renouvelable'], ['la lumière du Soleil', 'renouvelable'], ['le bois d\'une forêt replantée', 'renouvelable'], ['l\'eau d\'une rivière', 'renouvelable'],
      ['le pétrole', 'non renouvelable'], ['le charbon', 'non renouvelable'], ['le gaz naturel', 'non renouvelable'], ['le minerai de cuivre', 'non renouvelable'],
    ], ['renouvelable', 'non renouvelable'], { renouvelable: 'Ces ressources se reconstituent à l\'échelle d\'une vie humaine.', 'non renouvelable': 'Leur formation demande des millions d\'années.' },
    ['Les énergies fossiles ne se renouvellent pas.', 'Le vent et le Soleil ne s\'épuisent pas.', 'Les minerais ne se reforment pas à notre échelle.']),

    exoVraiFaux('e03', 1, [
      ['Le pétrole est une ressource renouvelable.', false, 'Non : il lui faut des millions d\'années pour se former.'],
      ['Un sol met au moins cent ans à se former.', true, 'Oui : de cent ans à dix mille ans selon le climat.'],
      ["L'eau usée doit être épurée avant d'être rejetée dans la rivière.", true, 'Oui : c\'est le rôle des stations d\'épuration.'],
      ['Recycler les métaux permet d\'économiser les ressources minérales.', true, 'Oui : on extrait moins de minerai.'],
      ['Brûler du charbon ne rejette aucun gaz.', false, 'Non : la combustion rejette du dioxyde de carbone.'],
      ["L'eau douce est répartie également sur toute la planète.", false, 'Non : certaines régions en manquent fortement.'],
      ["Le bois est renouvelable si l'on replante autant d'arbres qu'on en coupe.", true, 'Oui : c\'est le principe d\'une gestion durable.'],
    ], ['Fossile = non renouvelable.', 'Un sol se forme très lentement.', 'Recycler économise la ressource.']),

    exoOrdonner('e04', 1, [
      { consigne: "Remets dans l'ordre le circuit de l'eau du robinet :", etapes: ['Captage dans une rivière ou une nappe', 'Traitement pour la rendre potable', 'Distribution dans les habitations', 'Utilisation : l\'eau devient une eau usée', "Nettoyage dans une station d'épuration", 'Rejet dans la rivière'] },
    ], ['On prélève avant de traiter.', 'L\'eau est salie par l\'usage.', 'L\'épuration précède le rejet.']),

    exoClasser('e05', 2, 'À quelle ressource cet usage fait-il appel ?', [
      ['irriguer un champ', "l'eau"], ['remplir une piscine', "l'eau"], ['refroidir une usine', "l'eau"],
      ['faire pousser du blé', 'le sol'], ['planter une vigne', 'le sol'], ['cultiver des légumes', 'le sol'],
      ['fabriquer des fils électriques en cuivre', 'un minerai'], ['fabriquer une canette en aluminium', 'un minerai'], ['fabriquer de l\'acier', 'un minerai'],
    ], ["l'eau", 'le sol', 'un minerai'], { "l'eau": 'L\'agriculture et l\'industrie en consomment beaucoup.', 'le sol': 'Les cultures y puisent eau et sels minéraux.', 'un minerai': 'Les métaux sont extraits de roches.' },
    ['Les cultures poussent dans le sol.', 'Les métaux viennent de minerais.', 'Irriguer, c\'est arroser.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule le gaspillage :',
      generer() {
        const l = pick([2, 3, 5]), j = pick([1, 7, 30]);
        return { enonce: `Situation inventée pour l'exercice. Un robinet qui fuit perd ${l} litres d'eau par heure. Quel volume d'eau est gaspillé en ${j === 1 ? 'une journée' : `${j} jours`}, en litres ?`, reponse: l * 24 * j, validation: 'nombre', unite: 'L', pieges: [{ valeur: l * j, message: 'Une journée compte 24 heures.' }], _v: { l, j } };
      },
      indices: ['Une journée compte 24 heures.', 'Calcule le volume perdu en une journée.', 'Multiplie par le nombre de jours.'],
      correction_etapes: (st) => [`En une journée : ${st._v.l} × 24 = ${st._v.l * 24} L.`, st._v.j > 1 ? `En ${st._v.j} jours : ${st._v.l * 24} × ${st._v.j} = <strong>${st._v.l * 24 * st._v.j} L</strong>.` : `Soit <strong>${st._v.l * 24} L</strong>.`],
    },

    exoDocument('e07', 2, 'Analyse ce bilan énergétique.', [
      () => {
        const fossile = pick([60, 70, 80]), renouv = 100 - fossile;
        return {
          enonce: "Données inventées pour l'exercice. Le diagramme indique l'origine de l'énergie consommée par un pays.",
          visuel: (host) => { host.innerHTML = schemaBarres([['énergies fossiles', fossile], ['énergies renouvelables', renouv]], { unite: "part de l'énergie consommée (%)" }); },
          questions: [
            nombre('Quelle part de l\'énergie provient de sources renouvelables, en pourcentage ?', renouv, { unite: '%' }),
            choix('La plus grande partie de cette énergie vient de ressources :', 'non renouvelables', 'renouvelables', 'inépuisables'),
            choix('Pour une gestion plus durable, ce pays peut :', 'développer le solaire et l\'éolien et économiser l\'énergie', 'brûler davantage de charbon', 'consommer plus de pétrole'),
          ],
          correction: [`La seconde barre indique <strong>${renouv} %</strong>.`, `${fossile} % viennent des énergies fossiles, <strong>non renouvelables</strong>.`, 'Remplacer une partie des énergies fossiles par des <strong>énergies renouvelables</strong> et <strong>consommer moins</strong>.'],
        };
      },
    ], ['Lis la valeur au-dessus de chaque barre.', 'Fossile : non renouvelable.', 'Durable : économiser et remplacer.']),

    exoSituation('e08', 2, 'Quelle est la solution la plus durable ?', [
      ['Une commune manque d\'eau en été. Que peut-elle décider ?', "Réparer les fuites du réseau et limiter l'arrosage en plein soleil.", 'Laisser couler les fontaines en permanence.', 'Remplir davantage de piscines.'],
      ['Un champ en pente perd sa terre à chaque orage. Que faire ?', 'Planter des haies et garder le sol couvert de végétation.', 'Labourer dans le sens de la pente.', 'Arracher toute la végétation.'],
      ['Ton téléphone fonctionne encore, mais un nouveau modèle sort. Quel choix économise le plus de ressources minérales ?', 'Garder le téléphone actuel, puis le faire recycler.', 'En acheter un neuf chaque année.', 'Jeter l\'ancien à la poubelle.'],
      ['Une forêt fournit le bois de chauffage d\'un village. Comment la gérer ?', 'Couper chaque année moins de bois qu\'il n\'en pousse.', 'Couper tous les arbres en une fois.', 'Interdire toute plantation.'],
    ], ['Durable : la ressource doit pouvoir se renouveler.', 'Économiser avant de prélever davantage.', 'Un sol couvert résiste mieux à l\'érosion.'], 'Gérer durablement, c\'est économiser, protéger et recycler.'),

    exoDocument('e09', 3, 'Raisonne sur la durée de formation d\'un sol.', [
      () => {
        const cm = pick([10, 20, 30]), ans = pick([500, 1000, 2000]);
        return {
          enonce: `Situation inventée pour l'exercice. Dans une région, il faut environ ${ans} ans pour que se forme 1 cm de sol. Un orage violent emporte ${cm} cm de sol sur un champ laissé nu.`,
          questions: [
            nombre(`Combien d'années faudra-t-il pour que ces ${cm} cm de sol se reforment ?`, cm * ans, { unite: 'ans' }),
            choix('À l\'échelle d\'une vie humaine, ce sol perdu est donc :', 'une ressource qui ne se renouvelle pas', 'vite remplacé', 'sans importance'),
            choix('Pour protéger ce sol, l\'agriculteur peut :', 'le garder couvert de végétation entre deux cultures', 'le laisser nu tout l\'hiver', 'retirer les haies'),
          ],
          correction: [`${cm} × ${ans} = <strong>${cm * ans} ans</strong>.`, "Un sol détruit en quelques heures met des milliers d'années à se reformer : il <strong>ne se renouvelle pas</strong> à notre échelle.", 'Des racines et un couvert végétal <strong>retiennent la terre</strong>.'],
        };
      },
    ], ['Multiplie l\'épaisseur par la durée nécessaire pour 1 cm.', 'Compare cette durée à une vie humaine.', 'La végétation protège le sol.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Laquelle de ces ressources est renouvelable ?', choix: ['le vent', 'le pétrole', 'le charbon', 'le minerai de fer'], correct: 0, explication: 'Le vent ne s\'épuise pas.' },
    { type: 'qcm', question: 'Les énergies fossiles sont :', choix: ['le charbon, le pétrole et le gaz', 'le vent et le Soleil', 'le bois et l\'eau', 'le sable et le calcaire'], correct: 0, explication: 'Elles se sont formées en des millions d\'années.' },
    { type: 'vrai_faux', question: 'Un sol se forme en quelques années.', reponse: false, explication: 'Il lui faut de cent ans à dix mille ans.' },
    { type: 'qcm', question: 'Une station d\'épuration sert à :', choix: ['nettoyer les eaux usées', 'rendre l\'eau potable', 'produire de l\'électricité', 'stocker l\'eau de pluie'], correct: 0, explication: 'Elle traite l\'eau avant son rejet dans la rivière.' },
    { type: 'qcm', question: 'Gérer durablement une ressource, c\'est :', choix: ['ne pas prélever plus que ce qui se renouvelle', 'la consommer le plus vite possible', 'ne jamais l\'utiliser', 'la vendre à l\'étranger'], correct: 0, explication: 'Pour que les générations futures en disposent aussi.' },
    { type: 'vrai_faux', question: 'Recycler un métal économise une ressource non renouvelable.', reponse: true, explication: 'On extrait moins de minerai.' },
  ],
};
