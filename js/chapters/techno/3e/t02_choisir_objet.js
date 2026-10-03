// =====================================================================
//  t02_choisir_objet.js — Technologie 3ᵉ : comparer et choisir un objet technique.
//  Repères de 3ᵉ du programme de 2024 : comparer plusieurs objets répondant
//  au même besoin (incidences environnementales, bilan carbone, efficacité
//  énergétique), choisir et argumenter en tenant compte du cycle de vie et
//  des trois piliers du développement durable.
//  Valeurs réelles (indice de réparabilité, étiquette énergie, piliers) :
//  voir sources.js. Les prix, masses de CO₂ et consommations des tableaux
//  sont des données d'exercice.
// =====================================================================

import { pick, dec, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { cycleDeVie, schemaEtiquette, coutTotal } from '../figures.js';

const DEFINITIONS = [
  ["le cycle de vie d'un objet", "Suite des étapes de l'existence d'un objet, de l'extraction des matières premières à sa fin de vie."],
  ['le développement durable', 'Développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs.'],
  ["l'indice de réparabilité", "Note sur 10 affichée sur certains appareils, qui indique s'ils sont faciles à réparer."],
  ["l'étiquette énergie", "Étiquette qui classe un appareil de A à G selon son efficacité énergétique."],
  ['le bilan carbone', "Masse de gaz à effet de serre émise pendant tout le cycle de vie d'un objet, exprimée en kilogrammes équivalent CO₂."],
  ['la recyclabilité', "Capacité des matériaux d'un objet à être récupérés et réutilisés en fin de vie."],
  ["l'efficacité énergétique", "Capacité d'un appareil à rendre le même service en consommant moins d'énergie."],
];

const ETAPES = ['Extraction des matières premières', 'Traitement des matières', 'Fabrication des pièces', 'Assemblage', 'Utilisation', 'Fin de vie : réemploi, recyclage ou déchet'];

const PILIERS = [
  ['un objet fabriqué avec des matériaux recyclés', 'environnemental'], ['un appareil qui consomme peu d\'électricité', 'environnemental'], ['un emballage réduit', 'environnemental'],
  ['un objet fabriqué dans des conditions de travail correctes', 'social'], ['un objet utilisable par une personne en situation de handicap', 'social'], ['un atelier de réparation qui crée des emplois locaux', 'social'],
  ['un prix accessible', 'économique'], ['un objet qui dure longtemps et évite un rachat', 'économique'], ['des pièces détachées peu coûteuses', 'économique'],
];

export default {
  id: 't02',
  titre: 'Comparer et choisir un objet technique',
  theme: 'tk_usages', niveau: '3e',
  icone: '♻️',

  intro:
    "Deux aspirateurs font le même travail, mais l'un consomme moins, se répare mieux et dure plus longtemps. Lequel choisir ? " +
    "En 3ᵉ, tu apprends à <strong>comparer des objets avec des critères</strong> et à <strong>justifier ton choix</strong> en pensant à tout leur cycle de vie.",

  cours: [
    {
      type: 'definition', titre: "Le cycle de vie d'un objet",
      contenu: "Un objet traverse plusieurs étapes : <strong>extraction</strong> des matières premières, <strong>traitement</strong>, <strong>fabrication</strong>, <strong>assemblage</strong>, <strong>utilisation</strong>, <strong>fin de vie</strong>. Entre chaque étape, il y a du <strong>transport</strong>. Chaque étape consomme des ressources et de l'énergie, et rejette des polluants dans l'air, l'eau ou le sol.",
    },
    { type: 'figure', titre: 'Le cycle de vie, étape par étape', contenu: 'Parcours les six étapes.', render: (host) => cycleDeVie(host) },
    {
      type: 'definition', titre: 'Les trois piliers du développement durable',
      contenu: "Un choix durable tient compte de trois piliers : le pilier <strong>environnemental</strong> (préserver les ressources et les milieux), le pilier <strong>social</strong> (répondre aux besoins de tous, dans de bonnes conditions) et le pilier <strong>économique</strong> (un coût supportable dans la durée).",
    },
    {
      type: 'propriete', titre: 'Des indicateurs pour comparer',
      contenu: "L'<strong>étiquette énergie</strong> classe les appareils de <strong>A</strong> (les plus efficaces) à <strong>G</strong>. L'<strong>indice de réparabilité</strong> est une note sur 10 : elle tient compte de la documentation, de la facilité de démontage, de la disponibilité et du prix des pièces détachées. Le <strong>bilan carbone</strong> additionne les émissions de gaz à effet de serre de tout le cycle de vie, en kilogrammes équivalent CO₂.",
    },
    {
      type: 'figure', titre: "L'étiquette énergie", contenu: 'Sept classes, de A à G. Ici, un appareil de classe B.',
      render: (host) => { host.innerHTML = schemaEtiquette('B'); },
    },
    {
      type: 'propriete', titre: 'Le coût sur toute la durée de vie',
      contenu: "Le prix d'achat ne suffit pas. Le <strong>coût total</strong> d'un appareil est son prix d'achat plus le coût de l'énergie qu'il consomme pendant toute sa durée d'utilisation. Un appareil plus cher à l'achat peut revenir moins cher s'il est sobre et s'il dure.",
    },
    { type: 'figure', titre: 'Quand le plus cher devient le moins cher', contenu: "Fais varier la durée d'utilisation (données d'exemple).", render: (host) => coutTotal(host) },
    {
      type: 'exemple', enonce: "Un lave-linge A coûte 400 € et consomme 30 € d'électricité par an. Un lave-linge B coûte 320 € et consomme 50 € par an. Lequel revient le moins cher sur 10 ans ?",
      solution_etapes: ['Coût de A : $400 + 10 \\times 30 = 700$ €.', 'Coût de B : $320 + 10 \\times 50 = 820$ €.', 'Sur 10 ans, A revient moins cher de 120 €, alors qu\'il était plus cher à l\'achat.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le besoin et les exigences', explication: "Que doit faire l'objet ? Quelles valeurs minimales ou maximales sont imposées ?" },
    { etape: 2, titre: 'Choisir les critères', explication: 'Performance, coût total, efficacité énergétique, réparabilité, bilan carbone, recyclabilité.' },
    { etape: 3, titre: 'Lire et calculer', explication: 'Relève les valeurs dans le tableau ; calcule un coût total ou un bilan sur la durée de vie.' },
    { etape: 4, titre: 'Trancher et justifier', explication: "Élimine les objets qui ne respectent pas une exigence, puis choisis en citant les valeurs et au moins un pilier du développement durable." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Réparabilité : une note sur 10.', 'Énergie : une lettre de A à G.', 'Carbone : des kilogrammes équivalent CO₂.']),

    exoOrdonner('e02', 1, [{ consigne: "Remets dans l'ordre les étapes du cycle de vie d'un objet.", etapes: ETAPES, note: 'Du transport a lieu entre chacune de ces étapes.' }],
      ['On commence par extraire les matières premières.', 'On fabrique les pièces avant de les assembler.', 'La fin de vie arrive après l\'utilisation.']),

    exoVraiFaux('e03', 1, [
      ["Sur l'étiquette énergie, la classe A désigne les appareils les plus efficaces.", true, "Oui : l'échelle va de A (le plus efficace) à G."],
      ["L'indice de réparabilité est une note sur 20.", false, 'Non : c\'est une note sur 10.'],
      ["Le cycle de vie d'un objet commence à sa fabrication.", false, "Non : il commence dès l'extraction des matières premières."],
      ['Le développement durable repose sur trois piliers.', true, 'Oui : environnemental, social et économique.'],
      ["Le prix d'achat suffit à comparer le coût de deux appareils.", false, "Non : il faut ajouter le coût de l'énergie consommée pendant l'utilisation."],
      ["Le bilan carbone ne compte que les émissions pendant l'utilisation.", false, "Non : il additionne les émissions de toutes les étapes du cycle de vie."],
      ['Réparer un appareil allonge sa durée de vie.', true, 'Oui : cela évite de fabriquer un appareil neuf.'],
      ['La disponibilité des pièces détachées compte dans l\'indice de réparabilité.', true, 'Oui : c\'est l\'un de ses critères.'],
    ], ['A : le meilleur. G : le moins bon.', 'Le cycle de vie commence avant l\'usine.', 'Coût total : achat et énergie.']),

    exoClasser('e04', 2, 'À quel pilier du développement durable chaque argument se rattache-t-il ?', PILIERS, ['environnemental', 'social', 'économique'],
      { environnemental: 'Il s\'agit de préserver les ressources et les milieux.', social: 'Il s\'agit des personnes : conditions de travail, accès, emploi.', économique: 'Il s\'agit du coût, à l\'achat et dans la durée.' },
      ['Ressources et pollution : environnemental.', 'Les personnes : social.', 'L\'argent : économique.'], 5),

    exoRelier('e05', 2, 'Associe chaque indicateur à ce qu\'il mesure.', [
      ["l'étiquette énergie", "l'efficacité énergétique, de A à G"], ["l'indice de réparabilité", 'la facilité à réparer, sur 10'], ['le bilan carbone', 'les gaz à effet de serre émis sur tout le cycle de vie'], ['le coût total', "le prix d'achat et le coût de l'énergie consommée"],
    ], ['Une lettre, une note, une masse, une somme.', 'Bilan carbone : kilogrammes équivalent CO₂.', 'Coût total : achat et usage.'], 4),

    {
      id: 'e06', niveau: 2, type: 'saisie', consigne: 'Calcule un coût total :',
      generer() {
        const achat = pick([180, 240, 320, 450]), conso = pick([20, 25, 35, 40]), duree = pick([8, 10, 12]);
        return {
          enonce: `Un appareil coûte ${achat} € à l'achat et consomme pour ${conso} € d'électricité par an (données d'exercice). Quel est son coût total sur ${duree} ans, en euros ?`,
          reponse: achat + conso * duree, validation: 'nombre', unite: '€',
          pieges: [{ valeur: conso * duree, message: "Tu as calculé le coût de l'énergie : ajoute le prix d'achat." }, { valeur: achat + conso, message: `L'appareil consomme ${conso} € chaque année, pendant ${duree} ans.` }],
          _v: { achat, conso, duree },
        };
      },
      indices: ["Coût total = prix d'achat + coût de l'énergie.", "Le coût de l'énergie se compte sur toute la durée.", 'Multiplie le coût annuel par le nombre d\'années.'],
      correction_etapes: (st) => [`Coût de l'énergie : $${st._v.duree} \\times ${st._v.conso} = ${st._v.duree * st._v.conso}$ €.`, `Coût total : $${st._v.achat} + ${st._v.duree * st._v.conso} = ${st._v.achat + st._v.duree * st._v.conso}$ €.`],
    },

    {
      id: 'e07', niveau: 2, type: 'saisie', consigne: 'Calcule un bilan carbone :',
      generer() {
        const fab = pick([40, 60, 80, 120]), an = pick([4, 6, 8, 10]), duree = pick([5, 8, 10]);
        return {
          enonce: `La fabrication et le transport d'un appareil émettent ${fab} kg équivalent CO₂. Son utilisation émet ${an} kg équivalent CO₂ par an (données d'exercice). Quel est son bilan carbone sur ${duree} ans d'utilisation, en kg équivalent CO₂ ?`,
          reponse: fab + an * duree, validation: 'nombre', unite: 'kg',
          pieges: [{ valeur: an * duree, message: 'Ajoute les émissions de la fabrication et du transport.' }],
          _v: { fab, an, duree },
        };
      },
      indices: ['Le bilan carbone couvre tout le cycle de vie.', "Calcule d'abord les émissions de l'utilisation.", 'Ajoute celles de la fabrication et du transport.'],
      correction_etapes: (st) => [`Utilisation : $${st._v.duree} \\times ${st._v.an} = ${st._v.duree * st._v.an}$ kg.`, `Bilan : $${st._v.fab} + ${st._v.duree * st._v.an} = ${st._v.fab + st._v.duree * st._v.an}$ kg équivalent CO₂.`],
    },

    exoDocument('e08', 3, 'Compare deux objets et choisis.', [
      () => {
        const pa = pick([90, 110]), pb = pa + pick([30, 50]), ca = pick([14, 16]), cb = ca - pick([6, 8]), duree = 10;
        const ta = pa + ca * duree, tb = pb + cb * duree;
        return {
          enonce: "Deux aspirateurs répondent au même besoin (données d'exercice)." +
            tableau([['Aspirateur', 'A', 'B'], ["Prix d'achat (€)", pa, pb], ["Coût annuel de l'électricité (€)", ca, cb], ['Classe énergétique', 'D', 'B'], ['Indice de réparabilité (sur 10)', dec(5.2), dec(8.4)]]),
          questions: [
            nombre(`Coût total de l'aspirateur A sur ${duree} ans, en euros ?`, ta),
            nombre(`Coût total de l'aspirateur B sur ${duree} ans, en euros ?`, tb),
            choix('Quel aspirateur est le plus facile à réparer ?', "l'aspirateur B", "l'aspirateur A", 'les deux sont équivalents'),
            choix('Quel choix est le mieux justifié ?', tb <= ta ? "B : il coûte moins cher sur 10 ans, consomme moins et se répare mieux" : "B : il coûte un peu plus cher sur 10 ans, mais il consomme moins et se répare mieux", "A : c'est le moins cher à l'achat, le reste ne compte pas", 'A : sa classe énergétique D est meilleure que B'),
          ],
          correction: [`A : $${pa} + ${duree} \\times ${ca} = ${ta}$ €.`, `B : $${pb} + ${duree} \\times ${cb} = ${tb}$ €.`, 'B a le meilleur indice de réparabilité : 8,4 contre 5,2.', "B est plus sobre (classe B contre D) et plus réparable : il respecte mieux le pilier environnemental" + (tb <= ta ? ', et il revient moins cher.' : ', pour un surcoût faible.')],
        };
      },
    ], ['Calcule le coût total de chacun.', 'Compare les indices et les classes.', 'Un bon choix cite plusieurs critères.']),

    exoDocument('e09', 3, 'Argumente avec le cycle de vie.', [
      () => ({
        enonce: "Un collège hésite entre deux gourdes pour ses élèves (données d'exercice). La gourde en plastique émet 1 kg équivalent CO₂ à la fabrication et dure 2 ans. La gourde en acier inoxydable émet 4 kg équivalent CO₂ à la fabrication et dure 10 ans. Les deux sont recyclables.",
        questions: [
          nombre('Combien de gourdes en plastique faut-il pour couvrir 10 ans ?', 5),
          nombre('Bilan carbone de fabrication des gourdes en plastique sur 10 ans, en kg équivalent CO₂ ?', 5),
          choix('Sur 10 ans, quelle gourde a le plus faible bilan carbone de fabrication ?', "la gourde en acier inoxydable", 'la gourde en plastique', 'elles sont à égalité'),
          choix("Quelle étape du cycle de vie explique ce résultat ?", "la durée d'utilisation : un objet qui dure évite d'en fabriquer d'autres", 'le transport seulement', "la couleur de l'objet"),
        ],
        correction: ['$10 \\div 2 = 5$ gourdes en plastique.', '$5 \\times 1 = 5$ kg équivalent CO₂.', "L'acier inoxydable : 4 kg contre 5 kg.", "La <strong>durabilité</strong> compte : allonger l'utilisation réduit le nombre d'objets à fabriquer."],
      }),
    ], ['Raisonne sur la même durée pour les deux objets.', 'Multiplie par le nombre d\'objets nécessaires.', 'Un objet durable se remplace moins souvent.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: "Quelle est la première étape du cycle de vie d'un objet ?", choix: ["l'extraction des matières premières", "l'assemblage", "l'utilisation", 'le recyclage'], correct: 0, explication: 'Le cycle de vie commence avant la fabrication.' },
    { type: 'qcm', question: 'Les trois piliers du développement durable sont :', choix: ['environnemental, social, économique', 'solide, liquide, gazeux', 'alimenter, distribuer, convertir', 'rapide, léger, bon marché'], correct: 0, explication: 'Un choix durable tient compte des trois.' },
    { type: 'vrai_faux', question: "Sur l'étiquette énergie, un appareil de classe G est plus efficace qu'un appareil de classe B.", reponse: false, explication: "L'échelle va de A, le plus efficace, à G." },
    { type: 'saisie', question: "Un appareil coûte 200 € et consomme 30 € d'électricité par an. Coût total sur 10 ans, en euros ?", reponse: 500, validation: 'nombre', explication: '$200 + 10 \\times 30 = 500$ €.' },
    { type: 'qcm', question: "L'indice de réparabilité est :", choix: ['une note sur 10', 'une lettre de A à G', 'une masse de CO₂', 'un prix'], correct: 0, explication: 'Plus la note est élevée, plus l\'appareil est facile à réparer.' },
    { type: 'vrai_faux', question: 'Un objet qui dure longtemps réduit son incidence sur l\'environnement.', reponse: true, explication: 'Il évite la fabrication de plusieurs objets de remplacement.' },
  ],
};
