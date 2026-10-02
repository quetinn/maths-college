// =====================================================================
//  sr04_nutrition_cellulaire.js — SVT 4ᵉ : la nutrition à l'échelle
//  cellulaire. Échanges entre le sang et les cellules, photosynthèse dans
//  les cellules chlorophylliennes, rôle des microorganismes.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 11.
//  Valeurs vérifiées (voir js/sources.js) : environ 1 kg de bactéries dans
//  l'intestin d'un adulte. Les comptages des exercices sont inventés.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoOrdonner, exoDocument, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { echanges, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['une cellule', "Unité de base de tous les êtres vivants, limitée par une membrane."],
  ['un capillaire sanguin', "Vaisseau très fin dont la paroi laisse passer les gaz et les nutriments."],
  ['la photosynthèse', "Fabrication de matière organique par une cellule chlorophyllienne, à partir d'eau, de dioxyde de carbone et de lumière."],
  ['un chloroplaste', 'Élément vert de la cellule végétale, où se déroule la photosynthèse.'],
  ['le microbiote', "Ensemble des microorganismes qui vivent dans un organisme, par exemple dans l'intestin."],
  ['une symbiose', "Association durable entre deux êtres vivants, dont chacun tire un bénéfice."],
];

export default {
  id: 'sr04',
  titre: "La nutrition à l'échelle cellulaire",
  theme: 'svt_vivant', niveau: '4e',
  icone: '🔬',

  intro:
    "Un muscle, une feuille : tout organe est fait de cellules. C'est à leur échelle que tout se joue. " +
    "On observe ce qui <strong>entre et sort d'une cellule</strong> animale, comment une cellule de feuille <strong>fabrique sa matière</strong> à la lumière, et le coup de main que donnent les microorganismes.",

  cours: [
    {
      type: 'definition', titre: 'Les besoins de la cellule animale',
      contenu: "Chaque cellule a besoin de <strong>dioxygène</strong> et de <strong>nutriments</strong> (glucose). Elle les utilise pour produire l'énergie nécessaire à son fonctionnement, et rejette du <strong>dioxyde de carbone</strong> et des déchets.",
    },
    {
      type: 'propriete', titre: 'Des échanges à travers les capillaires',
      contenu: "Dans un organe, le sang circule dans des <strong>capillaires</strong> très fins, au contact des cellules. Leur paroi mince laisse passer le dioxygène et les nutriments vers les cellules, le dioxyde de carbone et les déchets vers le sang.",
    },
    {
      type: 'figure', titre: 'Entre le sang et la cellule', contenu: 'Observe le sens de chaque échange.',
      render: (host) => echanges(host, { gauche: 'sang du capillaire', droite: 'cellule du muscle', flux: [{ nom: 'dioxygène', classe: 'sv-g-o2', sens: 1 }, { nom: 'glucose', classe: 'sv-g-nutriment', sens: 1 }, { nom: 'dioxyde de carbone', classe: 'sv-g-co2', sens: -1 }], texte: "La cellule prélève dans le sang ce dont elle a besoin et y rejette ce qu'elle produit.", label: 'Échanges entre le sang et une cellule' }),
    },
    {
      type: 'definition', titre: 'La photosynthèse',
      contenu: "Dans les cellules des feuilles, des <strong>chloroplastes</strong> captent la lumière. Grâce à cette énergie, la cellule fabrique de la <strong>matière organique</strong> (des glucides) à partir d'<strong>eau</strong> et de <strong>dioxyde de carbone</strong>, et rejette du <strong>dioxygène</strong>.",
      formule: '\\text{eau} + \\text{dioxyde de carbone} \\xrightarrow{\\text{lumière}} \\text{glucides} + \\text{dioxygène}',
    },
    {
      type: 'propriete', titre: 'Stocker et distribuer',
      contenu: "Les glucides fabriqués dans les feuilles sont distribués à toute la plante par la sève élaborée. Une partie est mise en réserve, souvent sous forme d'<strong>amidon</strong> : dans les graines, les tubercules de pomme de terre, les racines.",
    },
    {
      type: 'propriete', titre: 'L\'aide des microorganismes',
      contenu: "L'intestin d'un adulte abrite environ 1 kg de bactéries : ce <strong>microbiote</strong> aide à digérer les fibres et fabrique des vitamines. Chez les plantes, des champignons associés aux racines les aident à puiser l'eau et les sels minéraux. Ces associations à bénéfice réciproque sont des <strong>symbioses</strong>.",
    },
    {
      type: 'exemple', enonce: "On cache une partie d'une feuille avec du papier noir pendant deux jours, puis on teste la présence d'amidon. Seule la partie restée éclairée en contient. Conclus.",
      solution_etapes: ["La seule différence entre les deux parties est la lumière.", "L'amidon, une matière organique, n'apparaît que dans la partie éclairée.", "La lumière est donc indispensable à la fabrication de matière organique par la feuille."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le témoin', explication: "Quelle partie de l'expérience se déroule dans les conditions normales ?" },
    { etape: 2, titre: 'Trouver le facteur qui change', explication: "Lumière, dioxyde de carbone, eau : un seul doit varier." },
    { etape: 3, titre: 'Comparer les résultats', explication: "La matière organique apparaît-elle dans les deux cas ?" },
    { etape: 4, titre: 'Conclure', explication: "« Sans ce facteur, pas de matière organique : il est donc indispensable à la photosynthèse. »" },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['La photosynthèse a besoin de lumière.', 'Le chloroplaste est vert.', 'Symbiose : chacun y gagne.']),

    exoClasser('e02', 1, 'Dans quel sens se fait cet échange entre le sang et une cellule de muscle ?', [
      ['le dioxygène', 'du sang vers la cellule'], ['le glucose', 'du sang vers la cellule'], ['les nutriments', 'du sang vers la cellule'],
      ['le dioxyde de carbone', 'de la cellule vers le sang'], ['les déchets', 'de la cellule vers le sang'],
    ], ['du sang vers la cellule', 'de la cellule vers le sang'], { 'du sang vers la cellule': 'La cellule en a besoin.', 'de la cellule vers le sang': 'La cellule les produit et s\'en débarrasse.' },
    ['La cellule consomme du dioxygène.', 'Elle produit du dioxyde de carbone.', 'Les nutriments viennent du sang.'], 4),

    exoVraiFaux('e03', 1, [
      ['Une cellule animale produit du dioxyde de carbone.', true, 'Oui, en utilisant le dioxygène et le glucose.'],
      ['La photosynthèse se déroule dans les chloroplastes.', true, 'Oui : ce sont eux qui captent la lumière.'],
      ['La photosynthèse rejette du dioxyde de carbone.', false, 'Non : elle en consomme, et rejette du dioxygène.'],
      ['La paroi des capillaires est épaisse.', false, 'Non : elle est très fine, ce qui permet les échanges.'],
      ["L'amidon est une forme de réserve chez les plantes.", true, 'Oui : on en trouve dans les graines et les tubercules.'],
      ['Toutes les bactéries de l\'intestin sont dangereuses.', false, 'Non : le microbiote aide à digérer et fabrique des vitamines.'],
      ['Sans lumière, une feuille ne fabrique pas de matière organique.', true, 'Oui : la lumière fournit l\'énergie de la photosynthèse.'],
    ], ['Cellule animale : consomme du dioxygène.', 'Photosynthèse : consomme du dioxyde de carbone.', 'Le microbiote est utile.']),

    exoClasser('e04', 2, 'Pour la photosynthèse : nécessaire ou produit ?', [
      ["l'eau", 'nécessaire'], ['le dioxyde de carbone', 'nécessaire'], ['la lumière', 'nécessaire'],
      ['les glucides', 'produit'], ['le dioxygène', 'produit'], ['la matière organique', 'produit'],
    ], ['nécessaire', 'produit'], { nécessaire: 'La cellule chlorophyllienne les utilise.', produit: 'La cellule chlorophyllienne les fabrique ou les rejette.' },
    ['La plante puise l\'eau par ses racines.', 'Le dioxygène est rejeté.', 'Les glucides sont de la matière organique.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Remets dans l'ordre le trajet du dioxygène, de l'air à la cellule :", etapes: ["l'air des alvéoles pulmonaires", 'le sang', 'le cœur', "une artère", "un capillaire de l'organe", 'la cellule'] },
      { consigne: "Remets dans l'ordre le trajet du glucose, de l'aliment à la cellule :", etapes: ['un aliment dans le tube digestif', "le glucose libéré par la digestion", "le sang, au niveau de l'intestin grêle", "un capillaire de l'organe", 'la cellule'] },
    ], ['Le dioxygène entre par les poumons.', 'Le sang transporte.', 'Les échanges se font dans les capillaires.']),

    exoDocument('e06', 2, 'Interprète cette expérience.', [
      () => {
        const a = randInt(4, 8), b = a * pick([2, 3]);
        return {
          enonce: "Comptages inventés pour l'exercice. On place une plante aquatique dans une eau plus ou moins riche en dioxyde de carbone, sous le même éclairage, et on compte les bulles de dioxygène dégagées en une minute.",
          visuel: (host) => { host.innerHTML = schemaBarres([['eau sans CO₂', 0], ['eau pauvre en CO₂', a], ['eau riche en CO₂', b]], { unite: 'bulles de dioxygène par minute' }); },
          questions: [
            nombre("Par combien le nombre de bulles est-il multiplié entre l'eau pauvre et l'eau riche en dioxyde de carbone ?", b / a),
            choix('Sans dioxyde de carbone, la plante :', 'ne rejette pas de dioxygène', 'rejette beaucoup de dioxygène', 'meurt aussitôt'),
            choix('On en conclut que le dioxyde de carbone est :', 'indispensable à la photosynthèse', 'un déchet de la photosynthèse', 'sans rapport avec la photosynthèse'),
          ],
          correction: [`${b} ÷ ${a} = <strong>${b / a}</strong>.`, "Sans dioxyde de carbone, aucune bulle : <strong>pas de photosynthèse</strong>.", "Plus il y a de dioxyde de carbone, plus la plante rejette de dioxygène : il est <strong>indispensable</strong>."],
        };
      },
    ], ['Compare les trois barres.', 'Zéro bulle : pas de photosynthèse.', 'Le facteur qui change est le dioxyde de carbone.']),

    exoDocument('e07', 2, "Compare le sang qui entre et le sang qui sort d'un muscle.", [
      () => {
        const o1 = 20, o2 = pick([10, 12, 15]), c1 = 49, c2 = c1 + (o1 - o2);
        return {
          enonce: "Mesures inventées pour l'exercice. On analyse 100 mL de sang à l'entrée et à la sortie d'un muscle au repos." +
            tableau([['', 'Sang entrant', 'Sang sortant'], ['Dioxygène (mL)', o1, o2], ['Dioxyde de carbone (mL)', c1, c2]]),
          questions: [
            nombre('Combien de mL de dioxygène le muscle a-t-il prélevés dans 100 mL de sang ?', o1 - o2, { unite: 'mL' }),
            choix('Le sang sortant contient plus de dioxyde de carbone car :', 'les cellules du muscle en ont rejeté', 'le muscle en a prélevé', 'les poumons en ont ajouté'),
            choix('Pendant un effort, la quantité de dioxygène prélevée :', 'augmente', 'diminue', 'ne change pas'),
          ],
          correction: [`${o1} − ${o2} = <strong>${o1 - o2} mL</strong>.`, 'Les cellules <strong>rejettent du dioxyde de carbone</strong> dans le sang.', "À l'effort, les cellules consomment plus : le prélèvement <strong>augmente</strong>."],
        };
      },
    ], ['Soustrais les deux valeurs de dioxygène.', 'Ce qui apparaît dans le sang vient des cellules.', 'Un muscle qui travaille consomme plus.']),

    exoClasser('e08', 3, 'Qui rend service à qui ?', [
      ["les bactéries de l'intestin digèrent des fibres pour nous", "le microorganisme aide l'hôte"], ['des champignons aident les racines à puiser l\'eau', "le microorganisme aide l'hôte"], ['des bactéries fabriquent des vitamines dans notre intestin', "le microorganisme aide l'hôte"],
      ["l'intestin fournit abri et nourriture aux bactéries", "l'hôte aide le microorganisme"], ['la plante fournit des glucides au champignon de ses racines', "l'hôte aide le microorganisme"],
    ], ["le microorganisme aide l'hôte", "l'hôte aide le microorganisme"], { "le microorganisme aide l'hôte": "L'être vivant qui héberge en tire un bénéfice.", "l'hôte aide le microorganisme": 'Le microorganisme y trouve abri et nourriture : c\'est une symbiose.' },
    ['L\'hôte est celui qui héberge.', 'Dans une symbiose, les deux partenaires y gagnent.', 'Demande-toi qui reçoit le bénéfice.'], 4),

    exoDocument('e09', 3, 'Conçois une expérience.', [
      () => ({
        enonce: "On veut prouver que la lumière est indispensable à la fabrication d'amidon par une feuille. On dispose de deux plantes identiques, d'un placard et d'eau iodée, qui devient bleu foncé en présence d'amidon.",
        questions: [
          choix('Que fait-on des deux plantes ?', "l'une reste à la lumière, l'autre est placée au placard", 'les deux restent à la lumière', 'les deux sont placées au placard'),
          choix('Toutes les autres conditions (eau, air, température) doivent être :', 'identiques pour les deux plantes', 'différentes', 'sans importance'),
          choix("Quel résultat prouverait que la lumière est indispensable ?", "seule la feuille restée à la lumière bleuit avec l'eau iodée", 'les deux feuilles bleuissent', 'aucune feuille ne bleuit'),
        ],
        correction: ["On fait varier <strong>un seul facteur</strong> : la lumière. La plante éclairée est le témoin.", 'Tout le reste est <strong>identique</strong>, sinon on ne saurait pas d\'où vient la différence.', "De l'amidon <strong>seulement à la lumière</strong> : la lumière est indispensable."],
      }),
    ], ['Un seul facteur doit changer.', 'Il faut un témoin.', 'L\'eau iodée révèle l\'amidon.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Une cellule de muscle prélève dans le sang :', choix: ['du dioxygène et du glucose', 'du dioxyde de carbone', 'de la lumière', 'de l\'amidon'], correct: 0, explication: 'Elle rejette du dioxyde de carbone et des déchets.' },
    { type: 'qcm', question: 'La photosynthèse produit :', choix: ['des glucides et du dioxygène', 'du dioxyde de carbone', 'de l\'eau uniquement', 'des sels minéraux'], correct: 0, explication: 'À partir d\'eau, de dioxyde de carbone et de lumière.' },
    { type: 'qcm', question: 'La photosynthèse se déroule dans :', choix: ['les chloroplastes', 'le noyau', 'les capillaires', 'les racines uniquement'], correct: 0, explication: 'Ils captent la lumière.' },
    { type: 'vrai_faux', question: 'Les échanges entre le sang et les cellules se font au niveau des capillaires.', reponse: true, explication: 'Leur paroi est très fine.' },
    { type: 'qcm', question: 'Le microbiote intestinal :', choix: ['aide à digérer et fabrique des vitamines', 'rend toujours malade', 'n\'existe que chez les malades', 'se trouve dans le sang'], correct: 0, explication: 'C\'est une symbiose.' },
    { type: 'vrai_faux', question: 'La photosynthèse a besoin de lumière.', reponse: true, explication: 'La lumière en fournit l\'énergie.' },
  ],
};
