// =====================================================================
//  s08_infection.js — SVT 3ᵉ : l'organisme face à une infection.
//  Microorganismes pathogènes, contamination et infection, barrières,
//  réaction inflammatoire, phagocytose, antibiotiques et résistances.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 27.
// =====================================================================

import { pick, melanger, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { phagocytose, schemaAntibiogramme } from '../figures.js';

const DEFINITIONS = [
  ['un microorganisme pathogène', 'Être vivant microscopique (bactérie, virus) capable de provoquer une maladie.'],
  ['la contamination', "Entrée d'un microorganisme dans l'organisme."],
  ["l'infection", "Multiplication d'un microorganisme à l'intérieur de l'organisme."],
  ['la phagocytose', 'Ingestion puis digestion d\'un microorganisme par une cellule de défense, le phagocyte.'],
  ['un antibiotique', 'Médicament qui tue les bactéries ou empêche leur multiplication ; il est sans effet sur les virus.'],
  ["l'asepsie", "Ensemble des gestes qui empêchent la contamination : se laver les mains, stériliser le matériel."],
  ["l'antisepsie", 'Destruction des microorganismes déjà présents sur une plaie, à l\'aide d\'un produit antiseptique.'],
  ['la réaction inflammatoire', "Première réaction de l'organisme à une contamination : rougeur, chaleur, gonflement, douleur."],
];

const SITUATIONS = [
  ['Léo a une grippe, causée par un virus. Un antibiotique le soignera-t-il ?', 'Non : un antibiotique est sans effet sur un virus.', 'Oui : un antibiotique soigne toutes les infections.', 'Oui, à condition d\'en prendre une forte dose.'],
  ["Le médecin prescrit à Inès un antibiotique pendant 7 jours. Elle se sent guérie au bout de 3 jours. Que doit-elle faire ?", 'Terminer le traitement : des bactéries survivantes pourraient se multiplier à nouveau.', 'Arrêter : le traitement est devenu inutile.', 'Garder les comprimés restants pour sa prochaine maladie.'],
  ["Sacha s'est coupé le doigt en jardinant. Quel est le bon réflexe ?", 'Laver la plaie puis la désinfecter avec un antiseptique.', 'Prendre un antibiotique sans attendre.', 'Laisser la plaie telle quelle pour qu\'elle sèche.'],
  ["Pourquoi limite-t-on l'usage des antibiotiques aux cas où ils sont utiles ?", 'Parce que leur usage répété sélectionne des bactéries résistantes.', 'Parce qu\'ils rendent le corps humain résistant aux médicaments.', 'Parce qu\'ils transforment les virus en bactéries.'],
];

export default {
  id: 's08',
  titre: "L'organisme face à une infection",
  theme: 'svt_corps', niveau: '3e',
  icone: '🦠',

  intro:
    "Nous vivons entourés de microorganismes. La plupart sont inoffensifs ou utiles, mais certains provoquent des maladies. " +
    "On découvre comment ils entrent dans le corps, comment l'organisme réagit <strong>en quelques heures</strong> grâce à la phagocytose, et pourquoi les <strong>antibiotiques</strong> doivent être utilisés à bon escient.",

  cours: [
    {
      type: 'definition', titre: 'Contamination et infection',
      contenu: "Les <strong>microorganismes pathogènes</strong> (certaines bactéries, les virus) provoquent des maladies. La <strong>contamination</strong> est leur entrée dans l'organisme, par une plaie, par l'air respiré, par les aliments ou lors de rapports sexuels. " +
        "L'<strong>infection</strong> est leur multiplication : une bactérie peut se diviser toutes les vingt minutes, un virus se multiplie à l'intérieur de nos cellules.",
    },
    {
      type: 'propriete', titre: 'Limiter les risques',
      contenu: "La peau et les muqueuses forment une <strong>barrière naturelle</strong>. L'<strong>asepsie</strong> empêche la contamination (se laver les mains, stériliser les instruments, porter un masque). " +
        "L'<strong>antisepsie</strong> détruit les microorganismes déjà présents sur une plaie (désinfectant). Le préservatif protège des infections sexuellement transmissibles.",
    },
    {
      type: 'definition', titre: 'La réaction inflammatoire',
      contenu: "Quand des microorganismes franchissent la barrière, la zone devient <strong>rouge, chaude, gonflée et douloureuse</strong> : c'est la réaction inflammatoire. Les vaisseaux sanguins se dilatent et des <strong>phagocytes</strong>, une catégorie de globules blancs, sortent du sang pour gagner la plaie.",
    },
    { type: 'figure', titre: 'La phagocytose en quatre étapes', contenu: "Le phagocyte ingère et digère les microorganismes, quels qu'ils soient. Parcours les étapes.", render: (host) => phagocytose(host) },
    {
      type: 'propriete', titre: 'Une défense rapide, mais pas toujours suffisante',
      contenu: "La phagocytose commence <strong>en quelques heures</strong> et agit contre tous les microorganismes : elle n'est pas spécifique. Souvent, elle suffit à stopper l'infection. " +
        "Sinon, l'infection s'étend et l'organisme met en place une seconde réponse, plus lente et ciblée (chapitre suivant).",
    },
    {
      type: 'propriete', titre: 'Les antibiotiques',
      contenu: "Un <strong>antibiotique</strong> tue les bactéries ou bloque leur multiplication. Il n'a <strong>aucun effet sur les virus</strong>. " +
        "Utilisés trop souvent ou mal (traitement interrompu), les antibiotiques sélectionnent des <strong>bactéries résistantes</strong>, contre lesquelles ils ne fonctionnent plus. Un <strong>antibiogramme</strong> permet de choisir l'antibiotique efficace contre une bactérie donnée.",
    },
    {
      type: 'exemple', enonce: "Une bactérie se divise en deux toutes les 20 minutes. Combien y en a-t-il au bout d'une heure, en partant d'une seule ?",
      solution_etapes: ['Une heure = 3 divisions de 20 minutes.', 'À chaque division, le nombre de bactéries double : 1 → 2 → 4 → 8.', 'Au bout d\'une heure, il y a 8 bactéries ; au bout de sept heures, plus de deux millions.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Observer la boîte', explication: "Sur un antibiogramme, les bactéries forment un tapis coloré. Chaque pastille contient un antibiotique différent." },
    { etape: 2, titre: 'Repérer les zones claires', explication: "Autour d'une pastille, une zone claire signifie que les bactéries n'ont pas pu se développer." },
    { etape: 3, titre: 'Comparer les diamètres', explication: "Plus la zone claire est large, plus l'antibiotique est efficace contre cette bactérie. Pas de zone : la bactérie est résistante." },
    { etape: 4, titre: 'Conclure', explication: "Le médecin choisit l'antibiotique dont la zone claire est la plus large." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Contamination : entrée. Infection : multiplication.', 'Asepsie : empêcher d\'entrer. Antisepsie : détruire ce qui est là.', 'Un antibiotique agit sur les bactéries seulement.']),

    exoClasser('e02', 1, 'Cette maladie est-elle due à une bactérie ou à un virus ?', [
      ['la grippe', 'virus'], ['la rougeole', 'virus'], ['la varicelle', 'virus'], ['le Covid-19', 'virus'], ['le sida', 'virus'],
      ['le tétanos', 'bactérie'], ['la tuberculose', 'bactérie'], ['la coqueluche', 'bactérie'], ['la salmonellose', 'bactérie'],
    ], ['bactérie', 'virus'], { bactérie: 'Un antibiotique peut être efficace contre ces maladies.', virus: 'Les antibiotiques sont sans effet sur ces maladies.' },
    ['Le sida est dû au VIH, le V signifiant « virus ».', 'La grippe et la rougeole sont des maladies virales.', 'Le tétanos et la tuberculose sont dus à des bactéries.']),

    exoOrdonner('e03', 1, [
      { consigne: "Remets dans l'ordre les étapes de la phagocytose :", etapes: ['Le phagocyte adhère à la bactérie', 'Sa membrane enveloppe la bactérie', 'La bactérie est enfermée dans une poche', 'Des substances digèrent la bactérie', 'Les débris sont rejetés'] },
      { consigne: "Remets dans l'ordre ce qui suit une coupure :", etapes: ['Des bactéries entrent par la plaie : contamination', 'Elles se multiplient : infection', 'La zone rougit, chauffe et gonfle', 'Des phagocytes sortent des vaisseaux sanguins', 'Ils ingèrent et digèrent les bactéries'] },
    ], ['Il faut d\'abord un contact.', 'On ingère avant de digérer.', 'Le rejet des débris vient à la fin.']),

    exoVraiFaux('e04', 1, [
      ['Les antibiotiques sont efficaces contre les virus.', false, 'Non : ils n\'agissent que sur les bactéries.'],
      ['La phagocytose agit contre tous les types de microorganismes.', true, 'Oui : c\'est une défense non spécifique.'],
      ['La peau est une barrière naturelle contre les microorganismes.', true, 'Oui, tant qu\'elle n\'est pas blessée.'],
      ['Tous les microorganismes provoquent des maladies.', false, 'Non : la plupart sont inoffensifs, et beaucoup nous sont utiles (digestion, fabrication du yaourt).'],
      ['Se laver les mains est un geste d\'asepsie.', true, 'Oui : il évite la contamination.'],
      ['La rougeur autour d\'une plaie est un signe de réaction inflammatoire.', true, 'Oui, avec la chaleur, le gonflement et la douleur.'],
      ['Arrêter un antibiotique dès qu\'on se sent mieux évite les résistances.', false, 'Non : c\'est l\'inverse. Il faut suivre le traitement jusqu\'au bout.'],
    ], ['Antibiotique : bactéries uniquement.', 'La phagocytose est rapide et non spécifique.', 'Quatre signes de l\'inflammation : rougeur, chaleur, gonflement, douleur.']),

    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Compte les bactéries :',
      generer() {
        const n = pick([3, 4, 5, 6, 7]), min = n * 20;
        const duree = min % 60 === 0 ? `${min / 60} h` : `${Math.floor(min / 60) ? Math.floor(min / 60) + ' h ' : ''}${min % 60} min`;
        return { enonce: `Dans de bonnes conditions, une bactérie se divise en deux toutes les 20 minutes. Une seule bactérie entre dans une plaie. Combien y en a-t-il au bout de ${duree} ?`, reponse: 2 ** n, validation: 'nombre', pieges: [{ valeur: 2 * n, message: 'Le nombre double à chaque division : 1, 2, 4, 8… et non 2, 4, 6, 8.' }], _v: { n, duree } };
      },
      indices: ['Compte le nombre de divisions de 20 minutes.', 'À chaque division, le nombre de bactéries est multiplié par 2.', '1 → 2 → 4 → 8 → 16…'],
      correction_etapes: (st) => [`${st._v.duree} correspond à ${st._v.n} divisions de 20 minutes.`, `Le nombre double ${st._v.n} fois : ${Array.from({ length: st._v.n + 1 }, (_, k) => 2 ** k).join(' → ')}.`, `Il y a <strong>${2 ** st._v.n} bactéries</strong>.`],
    },

    exoClasser('e06', 2, 'Asepsie ou antisepsie ?', [
      ['se laver les mains avant de cuisiner', 'asepsie'], ['stériliser les instruments du chirurgien', 'asepsie'], ['porter un masque quand on est enrhumé', 'asepsie'], ['utiliser une seringue neuve pour chaque patient', 'asepsie'],
      ['désinfecter une écorchure avec un produit antiseptique', 'antisepsie'], ['nettoyer une plaie à l\'alcool', 'antisepsie'], ['appliquer un désinfectant sur la peau avant une piqûre', 'antisepsie'],
    ], ['asepsie', 'antisepsie'], { asepsie: 'On empêche les microorganismes d\'arriver.', antisepsie: 'On détruit les microorganismes déjà présents.' },
    ['Asepsie : éviter la contamination.', 'Antisepsie : agir sur une zone déjà contaminée.', 'Un antiseptique s\'applique sur la peau ou sur une plaie.'], 4),

    {
      id: 'e07', niveau: 2, type: 'document', consigne: "Lis l'antibiogramme.",
      generer() {
        const diam = melanger([0, pick([6, 8]), pick([12, 14]), pick([20, 24])]);
        const zones = ['A', 'B', 'C', 'D'].map((nom, k) => [nom, diam[k]]);
        const meilleur = zones.reduce((a, b) => (b[1] > a[1] ? b : a))[0], nul = zones.find((z) => z[1] === 0)[0];
        const lettres = ['A', 'B', 'C', 'D'].map((l) => `antibiotique ${l}`);
        return {
          enonce: "On étale la bactérie responsable de l'infection d'un patient sur une boîte de culture, puis on dépose quatre pastilles imprégnées d'antibiotiques différents. Après 24 heures, les bactéries ont formé un tapis vert, sauf dans les zones claires.",
          visuel: (host) => { host.innerHTML = schemaAntibiogramme(zones); },
          questions: [
            { question: 'Quel antibiotique est le plus efficace contre cette bactérie ?', choix: lettres, correct: 'ABCD'.indexOf(meilleur), ordre_fixe: true },
            { question: 'À quel antibiotique cette bactérie est-elle résistante ?', choix: lettres, correct: 'ABCD'.indexOf(nul), ordre_fixe: true },
            choix('Ce test serait-il utile pour une maladie due à un virus ?', 'non : aucun antibiotique n\'agit sur un virus', 'oui : il indiquerait le bon antibiotique', 'oui, mais avec d\'autres pastilles'),
          ],
          _v: { meilleur, nul },
        };
      },
      indices: ['Une zone claire : les bactéries n\'ont pas poussé.', 'Compare la largeur des zones claires.', 'Pas de zone claire : l\'antibiotique est inefficace.'],
      correction_etapes: (st) => [`La zone claire la plus large entoure la pastille <strong>${st._v.meilleur}</strong> : c'est l'antibiotique le plus efficace.`, `Autour de la pastille <strong>${st._v.nul}</strong>, les bactéries poussent : elles y sont résistantes.`, "Un antibiotique n'agit que sur les bactéries : ce test n'a <strong>pas de sens pour un virus</strong>."],
    },

    exoDocument('e08', 3, 'Mets ces données en relation.', [
      () => {
        const pays = [['Pays A', 10, 4], ['Pays B', 18, 12], ['Pays C', 26, 25], ['Pays D', 32, 38]];
        return {
          enonce: "Dans quatre pays, on compare la consommation d'antibiotiques (en doses pour 1 000 habitants et par jour) et la part des bactéries d'une espèce qui résistent à un antibiotique courant (données inventées pour l'exercice)." +
            tableau([['', ...pays.map((p) => p[0])], ['Consommation', ...pays.map((p) => p[1])], ['Bactéries résistantes', ...pays.map((p) => p[2] + ' %')]]),
          questions: [
            choix('Dans quel pays les bactéries résistantes sont-elles les plus fréquentes ?', 'le pays D', 'le pays A', 'le pays B'),
            choix('Plus on consomme d\'antibiotiques :', 'plus les bactéries résistantes sont fréquentes', 'moins il y a de bactéries résistantes', 'sans que cela change la résistance'),
            choix('Comment l\'expliquer ?', 'l\'antibiotique élimine les bactéries sensibles : les résistantes prennent la place', 'l\'antibiotique rend chaque bactérie résistante', 'les habitants deviennent résistants aux antibiotiques'),
          ],
          correction: ['Le pays D atteint 38 % de bactéries résistantes.', 'Consommation et résistance <strong>augmentent ensemble</strong>, du pays A au pays D.', "C'est une <strong>sélection</strong> : les bactéries sensibles meurent, les rares résistantes survivent et se multiplient."],
        };
      },
    ], ['Lis la dernière ligne du tableau.', 'Compare les deux lignes, de gauche à droite.', 'Ce n\'est pas la personne qui devient résistante, ce sont les bactéries.']),

    {
      id: 'e09', niveau: 3, type: 'qcm', consigne: 'Quelle est la bonne décision ?',
      generer() { const [enonce, bonne, f1, f2] = pick(SITUATIONS); return { enonce, choix: [bonne, f1, f2], correct: 0, _v: { bonne } }; },
      indices: ['Virus ou bactérie ?', 'Un traitement antibiotique se suit jusqu\'au bout.', 'Un antiseptique se met sur une plaie, un antibiotique se prend sur prescription.'],
      correction_etapes: (st) => [`Réponse : « ${st._v.bonne} »`, 'À retenir : les antibiotiques n\'agissent que sur les bactéries, se prennent sur prescription et jusqu\'au bout du traitement.'],
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un antibiotique agit sur :', choix: ['les bactéries', 'les virus', 'les bactéries et les virus', 'les phagocytes'], correct: 0, explication: 'Il est sans effet sur les virus.' },
    { type: 'qcm', question: "L'infection correspond à :", choix: ['la multiplication des microorganismes dans l\'organisme', "l'entrée des microorganismes", 'la destruction des microorganismes', 'la cicatrisation'], correct: 0, explication: 'L\'entrée, c\'est la contamination.' },
    { type: 'qcm', question: 'La phagocytose est réalisée par :', choix: ['des globules blancs', 'des globules rouges', 'des bactéries', 'des neurones'], correct: 0, explication: 'Les phagocytes sont une catégorie de globules blancs.' },
    { type: 'vrai_faux', question: 'Désinfecter une plaie est un geste d\'antisepsie.', reponse: true, explication: 'On détruit les microorganismes déjà présents.' },
    {
      type: 'saisie', question: 'Bactéries.',
      generer() { const n = pick([2, 3, 4, 5]); return { question: `Une bactérie se divise en deux toutes les 20 minutes. En partant d'une seule, combien y en a-t-il après ${n} divisions ?`, reponse: 2 ** n, validation: 'nombre', explication: `Le nombre double ${n} fois : ${2 ** n}.` }; },
    },
    { type: 'vrai_faux', question: "L'usage répété des antibiotiques favorise les bactéries résistantes.", reponse: true, explication: 'Les bactéries sensibles sont éliminées, les résistantes se multiplient.' },
  ],
};
