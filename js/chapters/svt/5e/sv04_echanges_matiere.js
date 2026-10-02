// =====================================================================
//  sv04_echanges_matiere.js — SVT 5ᵉ : les échanges de matière
//  indispensables à la vie. Nutrition des animaux, respiration et organes
//  respiratoires, échanges des végétaux verts.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 9.
//  Valeurs vérifiées (voir js/sources.js) : air à 21 % de dioxygène,
//  0,5 L d'air par inspiration et 12 à 20 mouvements par minute au repos.
//  Les mesures des exercices sont inventées pour l'entraînement.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre, dec } from '../outils.js';
import { tableau } from '../../commun.js';
import { echanges } from '../figures.js';

const DEFINITIONS = [
  ['la respiration', "Échange de gaz avec le milieu : un être vivant prélève du dioxygène et rejette du dioxyde de carbone."],
  ['un organe respiratoire', "Organe où se font les échanges de gaz entre le milieu et le sang : poumon, branchie, trachée."],
  ['une branchie', "Organe respiratoire des animaux qui respirent dans l'eau, comme les poissons."],
  ['une alvéole pulmonaire', "Minuscule sac du poumon, à paroi très fine, où le dioxygène passe de l'air dans le sang."],
  ['la matière organique', 'Matière fabriquée par les êtres vivants.'],
  ['un végétal chlorophyllien', "Végétal vert, capable de fabriquer sa matière organique à la lumière."],
  ['les sels minéraux', "Substances dissoutes dans l'eau du sol, puisées par les racines."],
];

export default {
  id: 'sv04',
  titre: 'Les échanges de matière indispensables à la vie',
  theme: 'svt_vivant', niveau: '5e',
  icone: '🫁',

  intro:
    "Manger, boire, respirer : un animal échange sans cesse de la matière avec son milieu. Une plante aussi, mais pas de la même façon. " +
    "On compare ce que <strong>prélèvent et rejettent</strong> les animaux et les végétaux verts, et on découvre les organes qui permettent de respirer dans l'air ou dans l'eau.",

  cours: [
    {
      type: 'definition', titre: 'Les besoins des animaux',
      contenu: "Un animal prélève dans son milieu des <strong>aliments</strong> (de la matière organique, provenant d'autres êtres vivants), de l'<strong>eau</strong> et du <strong>dioxygène</strong>. Il rejette du <strong>dioxyde de carbone</strong> et des déchets (urine, excréments).",
    },
    {
      type: 'definition', titre: 'La respiration',
      contenu: "Respirer, c'est <strong>prélever du dioxygène et rejeter du dioxyde de carbone</strong>. L'air contient 21 % de dioxygène ; l'eau en contient aussi, sous forme dissoute. " +
        "L'air expiré est plus pauvre en dioxygène et plus riche en dioxyde de carbone que l'air inspiré.",
    },
    {
      type: 'propriete', titre: 'Des organes adaptés au milieu',
      contenu: "Dans l'air, les mammifères, les oiseaux et les reptiles respirent avec des <strong>poumons</strong> ; les insectes avec des <strong>trachées</strong>, de fins tubes qui conduisent l'air jusqu'aux organes. Dans l'eau, les poissons respirent avec des <strong>branchies</strong>. " +
        "Dans tous les cas, la surface d'échange est très grande, très fine et riche en vaisseaux sanguins.",
    },
    {
      type: 'figure', titre: "Dans l'alvéole pulmonaire", contenu: "Le dioxygène passe de l'air dans le sang ; le dioxyde de carbone fait le trajet inverse.",
      render: (host) => echanges(host, { gauche: "air de l'alvéole", droite: 'sang', flux: [{ nom: 'dioxygène', classe: 'sv-g-o2', sens: 1 }, { nom: 'dioxyde de carbone', classe: 'sv-g-co2', sens: -1 }], texte: "La paroi de l'alvéole est très fine : les gaz la traversent. Les poumons d'un adulte offrent une surface d'échange de 80 à 100 m².", label: "Échanges de gaz dans l'alvéole pulmonaire" }),
    },
    {
      type: 'definition', titre: 'Les besoins des végétaux verts',
      contenu: "Un <strong>végétal chlorophyllien</strong> ne mange pas. Il prélève de l'<strong>eau</strong> et des <strong>sels minéraux</strong> par ses racines, du <strong>dioxyde de carbone</strong> par ses feuilles, et il a besoin de <strong>lumière</strong>. Il fabrique ainsi sa propre matière organique.",
    },
    {
      type: 'propriete', titre: 'Les échanges de gaz des végétaux',
      contenu: "À la lumière, un végétal vert absorbe du dioxyde de carbone et <strong>rejette du dioxygène</strong>. Comme tout être vivant, il respire aussi, de jour comme de nuit : il prélève du dioxygène et rejette du dioxyde de carbone.",
    },
    {
      type: 'exemple', enonce: "On place un poisson rouge dans un bocal fermé. La quantité de dioxygène dissous dans l'eau diminue. Explique.",
      solution_etapes: ["Le poisson respire : il prélève le dioxygène dissous dans l'eau grâce à ses branchies.", "Le bocal est fermé : le dioxygène prélevé n'est pas remplacé.", "La quantité de dioxygène de l'eau diminue donc au cours du temps."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer ce que l\'on mesure', explication: "Dioxygène ou dioxyde de carbone ? Dans l'air ou dans l'eau ?" },
    { etape: 2, titre: 'Comparer le début et la fin', explication: "La quantité augmente-t-elle ou diminue-t-elle ?" },
    { etape: 3, titre: 'Comparer au témoin', explication: "Une enceinte sans être vivant sert de témoin : si rien n'y change, la variation vient bien de l'être vivant." },
    { etape: 4, titre: 'Conclure', explication: "« Le dioxygène diminue, donc l'être vivant en prélève : il respire. »" },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Respirer : prélever du dioxygène, rejeter du dioxyde de carbone.', 'Les branchies servent dans l\'eau.', 'La matière organique vient des êtres vivants.']),

    exoClasser('e02', 1, 'Avec quel organe cet animal respire-t-il ?', [
      ['la truite', 'branchies'], ['le requin', 'branchies'], ['la sardine', 'branchies'],
      ['le chat', 'poumons'], ['le pigeon', 'poumons'], ['le dauphin', 'poumons'], ['le lézard', 'poumons'],
      ['le criquet', 'trachées'], ['la fourmi', 'trachées'], ['le papillon', 'trachées'],
    ], ['branchies', 'poumons', 'trachées'], { branchies: 'Les poissons prélèvent le dioxygène dissous dans l\'eau.', poumons: "Mammifères, oiseaux et reptiles respirent dans l'air avec des poumons — y compris le dauphin, qui remonte à la surface.", trachées: "Chez les insectes, de fins tubes conduisent l'air aux organes." },
    ['Les poissons ont des branchies.', 'Le dauphin est un mammifère.', 'Les insectes ont des trachées.']),

    exoVraiFaux('e03', 1, [
      ["L'air expiré contient moins de dioxygène que l'air inspiré.", true, 'Oui : une partie du dioxygène est passée dans le sang.'],
      ["Les poissons ne respirent pas car ils vivent dans l'eau.", false, 'Si : ils prélèvent le dioxygène dissous dans l\'eau avec leurs branchies.'],
      ['Un végétal vert a besoin de lumière pour fabriquer sa matière.', true, 'Oui, ainsi que d\'eau, de sels minéraux et de dioxyde de carbone.'],
      ['Les plantes ne respirent pas.', false, 'Si : comme tous les êtres vivants, de jour comme de nuit.'],
      ["Les racines d'une plante puisent l'eau et les sels minéraux du sol.", true, 'Oui.'],
      ["Un animal fabrique sa matière organique à partir de lumière.", false, 'Non : il doit manger d\'autres êtres vivants.'],
      ["L'air contient 21 % de dioxygène.", true, 'Oui.'],
      ['À la lumière, un végétal vert rejette du dioxygène.', true, 'Oui, tout en absorbant du dioxyde de carbone.'],
    ], ['Compare air inspiré et air expiré.', 'Tous les êtres vivants respirent.', 'Seuls les végétaux verts utilisent la lumière.']),

    exoClasser('e04', 2, 'Qui en a besoin ?', [
      ["de la lumière pour fabriquer sa matière", 'un végétal vert'], ['des sels minéraux puisés dans le sol', 'un végétal vert'], ['du dioxyde de carbone pour fabriquer sa matière', 'un végétal vert'],
      ["des aliments provenant d'autres êtres vivants", 'un animal'], ['de la matière organique déjà fabriquée', 'un animal'],
      ['du dioxygène pour respirer', 'les deux'], ["de l'eau", 'les deux'],
    ], ['un animal', 'un végétal vert', 'les deux'], { 'un animal': 'Un animal ne peut pas fabriquer sa matière organique : il la prend à d\'autres êtres vivants.', 'un végétal vert': 'Un végétal vert fabrique sa matière organique à partir de matière minérale et de lumière.', 'les deux': 'Tous les êtres vivants respirent et ont besoin d\'eau.' },
    ['Un animal mange, une plante ne mange pas.', 'Tous les êtres vivants respirent.', 'La lumière ne sert qu\'aux végétaux verts.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre le trajet du dioxygène, de l'air jusqu'au sang :", etapes: ['le nez ou la bouche', 'la trachée', 'les bronches', 'les bronchioles', 'les alvéoles pulmonaires', 'le sang'] },
    ], ['L\'air entre par le nez ou la bouche.', 'La trachée se divise en deux bronches.', 'Les échanges avec le sang se font dans les alvéoles.']),

    exoDocument('e06', 2, 'Interprète cette expérience.', [
      () => {
        const debut = randInt(80, 90) / 10, baisse = randInt(15, 30) / 10;
        return {
          enonce: "Mesures inventées pour l'exercice. On place un poisson dans une enceinte fermée remplie d'eau et on mesure le dioxygène dissous. Une enceinte identique, sans poisson, sert de témoin." +
            tableau([['', 'Au début', 'Après 20 minutes'], ['Avec le poisson (mg/L)', dec(debut), dec(debut - baisse)], ['Sans poisson (mg/L)', dec(debut), dec(debut)]]),
          questions: [
            nombre("De combien de mg/L le dioxygène a-t-il diminué dans l'enceinte du poisson ?", Math.round(baisse * 10) / 10, { tolerance: 0.01 }),
            choix("À quoi sert l'enceinte sans poisson ?", 'à vérifier que la baisse vient bien du poisson', 'à nourrir le poisson', 'à réchauffer l\'eau'),
            choix('On en conclut que le poisson :', 'prélève du dioxygène dans l\'eau', 'rejette du dioxygène', 'n\'échange rien avec l\'eau'),
          ],
          correction: [`${dec(debut)} − ${dec(debut - baisse)} = <strong>${dec(baisse)} mg/L</strong>.`, "Sans poisson, rien ne change : c'est le <strong>témoin</strong>. La baisse vient donc du poisson.", 'Le poisson <strong>prélève du dioxygène</strong> : il respire.'],
        };
      },
      () => {
        const a = randInt(4, 8), b = a + randInt(6, 12);
        return {
          enonce: "Comptages inventés pour l'exercice. Une plante aquatique, l'élodée, est placée dans l'eau. À la lumière, elle dégage des bulles de gaz : on les compte pendant une minute." +
            tableau([['Éclairage', 'obscurité', 'lumière faible', 'lumière forte'], ['Bulles par minute', 0, a, b]]),
          questions: [
            nombre('Combien de bulles de plus compte-t-on en lumière forte qu\'en lumière faible ?', b - a),
            choix('Le gaz dégagé à la lumière par un végétal vert est :', 'du dioxygène', 'du dioxyde de carbone', 'de la vapeur d\'eau'),
            choix('Plus la lumière est forte :', 'plus le végétal rejette de dioxygène', 'moins il rejette de dioxygène', 'sans effet sur le dégagement'),
          ],
          correction: [`${b} − ${a} = <strong>${b - a} bulles</strong> de plus.`, 'À la lumière, un végétal vert rejette du <strong>dioxygène</strong>.', "Sans lumière, aucune bulle ; avec plus de lumière, davantage de bulles : le dégagement <strong>augmente avec l'éclairage</strong>."],
        };
      },
    ], ['Compare le début et la fin, ou les colonnes entre elles.', 'Le témoin permet de savoir d\'où vient la variation.', 'Animal : il prélève du dioxygène. Végétal vert à la lumière : il en rejette.']),

    exoClasser('e07', 2, 'Prélevé ou rejeté par un animal ?', [
      ['le dioxygène', 'prélevé'], ['les aliments', 'prélevé'], ["l'eau de boisson", 'prélevé'],
      ['le dioxyde de carbone', 'rejeté'], ["l'urine", 'rejeté'], ['les excréments', 'rejeté'],
    ], ['prélevé', 'rejeté'], { prélevé: 'Ces éléments entrent dans l\'organisme.', rejeté: 'Ces éléments sortent de l\'organisme.' },
    ['On inspire du dioxygène.', 'On expire du dioxyde de carbone.', 'Les déchets sont rejetés.'], 4),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "Calcule le volume d'air inspiré :",
      generer() {
        const f = pick([12, 14, 16, 18, 20]), min = pick([1, 5, 10]);
        return { enonce: `Au repos, une personne inspire environ 0,5 L d'air à chaque mouvement respiratoire. Elle effectue ${f} mouvements par minute. Quel volume d'air inspire-t-elle en ${min} minute${min > 1 ? 's' : ''}, en litres ?`, reponse: 0.5 * f * min, validation: 'nombre', unite: 'L', _v: { f, min } };
      },
      indices: ['Calcule d\'abord le volume inspiré en une minute.', 'Volume par minute = volume d\'une inspiration × nombre de mouvements.', 'Multiplie ensuite par le nombre de minutes.'],
      correction_etapes: (st) => [`En une minute : 0,5 × ${st._v.f} = ${dec(0.5 * st._v.f)} L.`, st._v.min > 1 ? `En ${st._v.min} minutes : ${dec(0.5 * st._v.f)} × ${st._v.min} = <strong>${dec(0.5 * st._v.f * st._v.min)} L</strong>.` : `Soit <strong>${dec(0.5 * st._v.f)} L</strong> en une minute.`],
    },

    exoDocument('e09', 3, 'Mets en relation deux expériences.', [
      () => ({
        enonce: "On enferme une souris sous une cloche de verre : elle montre vite des signes de malaise. On recommence en plaçant sous la cloche, à la lumière, une souris et une plante verte : la souris reste en bonne santé bien plus longtemps.",
        questions: [
          choix('Dans la première expérience, sous la cloche, le dioxygène :', 'diminue, car la souris en prélève', 'augmente', 'reste constant'),
          choix('Dans la seconde expérience, la plante à la lumière :', 'rejette du dioxygène, que la souris utilise', 'mange la souris', 'absorbe le dioxygène de la souris'),
          choix('Et que devient le dioxyde de carbone rejeté par la souris ?', 'il est absorbé par la plante', 'il s\'accumule indéfiniment', 'il se transforme en eau'),
        ],
        correction: ["La souris respire : elle <strong>prélève le dioxygène</strong> de la cloche, qui finit par manquer.", 'À la lumière, la plante <strong>rejette du dioxygène</strong>.', 'La plante <strong>absorbe le dioxyde de carbone</strong> pour fabriquer sa matière : les échanges de l\'une complètent ceux de l\'autre.'],
      }),
    ], ['La souris respire.', 'À la lumière, un végétal vert rejette du dioxygène.', 'Ce que l\'un rejette, l\'autre l\'utilise.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Respirer, c\'est :', choix: ['prélever du dioxygène et rejeter du dioxyde de carbone', 'prélever du dioxyde de carbone et rejeter du dioxygène', 'avaler de l\'air', 'boire de l\'eau'], correct: 0, explication: 'C\'est vrai pour les animaux comme pour les végétaux.' },
    { type: 'qcm', question: 'Un poisson respire grâce à :', choix: ['des branchies', 'des poumons', 'des trachées', 'sa peau uniquement'], correct: 0, explication: 'Les branchies prélèvent le dioxygène dissous dans l\'eau.' },
    { type: 'vrai_faux', question: 'Un végétal vert a besoin de manger d\'autres êtres vivants.', reponse: false, explication: 'Il fabrique sa matière avec de l\'eau, des sels minéraux, du dioxyde de carbone et de la lumière.' },
    { type: 'qcm', question: 'À la lumière, un végétal vert rejette :', choix: ['du dioxygène', 'du dioxyde de carbone uniquement', 'des sels minéraux', 'de la lumière'], correct: 0, explication: 'Il absorbe du dioxyde de carbone et rejette du dioxygène.' },
    { type: 'qcm', question: 'Dans les poumons, le dioxygène passe dans le sang au niveau :', choix: ['des alvéoles', 'de la trachée', 'du nez', 'de l\'estomac'], correct: 0, explication: 'Leur paroi est très fine et la surface d\'échange est immense.' },
    { type: 'vrai_faux', question: "L'air expiré est plus riche en dioxyde de carbone que l'air inspiré.", reponse: true, explication: 'Le sang y a rejeté du dioxyde de carbone.' },
  ],
};
