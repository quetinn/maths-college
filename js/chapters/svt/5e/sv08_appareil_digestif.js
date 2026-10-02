// =====================================================================
//  sv08_appareil_digestif.js — SVT 5ᵉ : le fonctionnement de l'appareil
//  digestif. Tube digestif, digestion mécanique et chimique, absorption
//  dans l'intestin grêle, devenir des nutriments.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 23.
//  Valeurs vérifiées (voir js/sources.js) : intestin grêle de 6 m en
//  moyenne, surface d'absorption d'environ 250 m².
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoLegender, choix, nombre, dec } from '../outils.js';
import { tableau } from '../../commun.js';
import { trajetDigestif, schemaTubeDigestif, PARTIES_TUBE } from '../figures.js';

const DEFINITIONS = [
  ['la digestion', 'Transformation des aliments en nutriments, dans le tube digestif.'],
  ['un nutriment', 'Petite molécule issue de la digestion, capable de passer dans le sang.'],
  ["l'absorption", "Passage des nutriments de l'intestin grêle vers le sang."],
  ['le tube digestif', "Ensemble des organes traversés par les aliments, de la bouche à l'anus."],
  ['un suc digestif', "Liquide produit par une glande digestive, qui transforme chimiquement les aliments."],
  ['une villosité', "Repli microscopique de la paroi de l'intestin grêle, qui augmente la surface d'absorption."],
];

export default {
  id: 'sv08',
  titre: "Le fonctionnement de l'appareil digestif",
  theme: 'svt_corps', niveau: '5e',
  icone: '🍽️',

  intro:
    "Un morceau de pain ne peut pas entrer tel quel dans ton sang. Il doit d'abord être transformé en éléments minuscules. " +
    "On suit le <strong>trajet des aliments</strong>, on distingue les deux façons de les transformer, et on voit comment les <strong>nutriments</strong> rejoignent le sang.",

  cours: [
    {
      type: 'definition', titre: 'Le tube digestif',
      contenu: "Les aliments parcourent le <strong>tube digestif</strong> dans un seul sens : bouche, œsophage, estomac, intestin grêle, gros intestin, anus. Des <strong>glandes digestives</strong> (glandes salivaires, foie, pancréas, paroi de l'estomac et de l'intestin) y déversent des <strong>sucs digestifs</strong>.",
    },
    { type: 'figure', titre: "Le trajet d'une bouchée", contenu: 'Avale une bouchée et suis-la, organe après organe.', render: (host) => trajetDigestif(host) },
    {
      type: 'definition', titre: 'La digestion',
      contenu: "La <strong>digestion</strong> transforme les aliments en <strong>nutriments</strong>. Elle est <strong>mécanique</strong> : les dents broient, l'estomac brasse. Elle est aussi <strong>chimique</strong> : les sucs digestifs découpent les aliments en molécules de plus en plus petites.",
    },
    {
      type: 'propriete', titre: "L'absorption",
      contenu: "Dans l'<strong>intestin grêle</strong>, long de 6 m en moyenne, les nutriments traversent la paroi et passent dans le sang : c'est l'<strong>absorption</strong>. Les replis de la paroi et leurs <strong>villosités</strong> offrent une surface d'environ 250 m², riche en vaisseaux sanguins.",
    },
    {
      type: 'propriete', titre: 'Et ensuite ?',
      contenu: "Le sang distribue les nutriments à tous les organes. Ce qui n'a pas été digéré passe dans le <strong>gros intestin</strong>, où l'eau est récupérée ; le reste forme les excréments.",
    },
    {
      type: 'exemple', enonce: "Après un repas, le sang qui sort de l'intestin grêle contient plus de glucose que celui qui y entre. Explique.",
      solution_etapes: ['Pendant la digestion, les aliments sont transformés en nutriments, dont le glucose.', "Dans l'intestin grêle, ces nutriments traversent la paroi et passent dans le sang.", "Le sang qui quitte l'intestin s'est donc enrichi en glucose : c'est l'absorption."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Situer l\'organe', explication: "Dans quel organe du tube digestif se trouve-t-on ?" },
    { etape: 2, titre: 'Identifier la transformation', explication: "Mécanique (broyage, brassage) ou chimique (action d'un suc digestif) ?" },
    { etape: 3, titre: 'Suivre les nutriments', explication: "Dans l'intestin grêle, ils passent dans le sang." },
    { etape: 4, titre: 'Suivre le reste', explication: "Ce qui n'est pas digéré continue vers le gros intestin." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Digestion : transformation. Absorption : passage dans le sang.', 'Un nutriment est une petite molécule.', 'Les villosités augmentent la surface d\'échange.']),

    exoOrdonner('e02', 1, [
      { consigne: "Remets dans l'ordre les organes traversés par les aliments :", etapes: ['la bouche', "l'œsophage", "l'estomac", "l'intestin grêle", 'le gros intestin'] },
    ], ['Les aliments entrent par la bouche.', 'L\'estomac vient avant l\'intestin.', 'L\'intestin grêle précède le gros intestin.']),

    exoLegender('e03', 1, 'Légende le tube digestif.', PARTIES_TUBE, schemaTubeDigestif, ['foie', 'poumon'],
      ['Les aliments descendent de la bouche vers l\'estomac par l\'œsophage.', 'L\'intestin grêle est le long tube replié.', 'Le gros intestin est la dernière partie.'],
      { bouche: 'entrée des aliments', œsophage: "tube qui conduit à l'estomac", estomac: 'poche où les aliments sont brassés', 'intestin grêle': "lieu de l'absorption", 'gros intestin': "récupération de l'eau" }),

    exoVraiFaux('e04', 1, [
      ['Les aliments passent par le foie au cours de leur trajet.', false, 'Non : le foie est une glande digestive, il déverse un suc dans le tube digestif mais les aliments n\'y passent pas.'],
      ["L'absorption des nutriments se fait dans l'intestin grêle.", true, 'Oui : ils traversent sa paroi et passent dans le sang.'],
      ['La digestion transforme les aliments en nutriments.', true, 'Oui, par des actions mécaniques et chimiques.'],
      ['Les dents réalisent une digestion chimique.', false, 'Non : elles broient, c\'est une action mécanique.'],
      ["L'intestin grêle mesure environ 6 mètres.", true, 'Oui, en moyenne.'],
      ['Les nutriments sont distribués aux organes par le sang.', true, 'Oui.'],
      ['Tout ce que l\'on mange passe dans le sang.', false, 'Non : ce qui n\'est pas digéré est éliminé dans les excréments.'],
    ], ['Tube digestif : trajet des aliments. Glandes : à côté.', 'Mécanique : on broie. Chimique : un suc agit.', 'Absorption : intestin grêle.']),

    exoClasser('e05', 2, 'Action mécanique ou chimique ?', [
      ['les dents broient les aliments', 'mécanique'], ["l'estomac brasse les aliments", 'mécanique'], ['la langue malaxe la bouchée', 'mécanique'],
      ['la salive transforme une partie du pain', 'chimique'], ["le suc gastrique agit dans l'estomac", 'chimique'], ['le suc pancréatique découpe les grosses molécules', 'chimique'],
    ], ['mécanique', 'chimique'], { mécanique: 'Les aliments sont réduits en morceaux, sans changer de nature.', chimique: 'Un suc digestif transforme les aliments en molécules plus petites.' },
    ['Broyer, brasser, malaxer : mécanique.', 'Un suc digestif : chimique.', 'La salive est un suc digestif.'], 4),

    exoRelier('e06', 2, 'Associe chaque organe à son rôle.', [
      ['la bouche', 'broyer les aliments et les imprégner de salive'], ["l'œsophage", "conduire les aliments vers l'estomac"], ["l'estomac", 'brasser les aliments avec le suc gastrique'], ["l'intestin grêle", 'absorber les nutriments'], ['le gros intestin', "récupérer l'eau"],
    ], ['L\'absorption a lieu dans l\'intestin grêle.', 'L\'estomac brasse.', 'Le gros intestin récupère l\'eau.']),

    exoDocument('e07', 2, 'Interprète ces mesures.', [
      () => {
        const entree = randInt(8, 10) / 10, gain = randInt(4, 9) / 10;
        return {
          enonce: "Mesures inventées pour l'exercice. Une heure après un repas, on compare la quantité de glucose dans le sang qui entre dans l'intestin grêle et dans celui qui en sort." +
            tableau([['', "Sang entrant dans l'intestin", "Sang sortant de l'intestin"], ['Glucose (g par litre)', dec(entree), dec(entree + gain)]]),
          questions: [
            nombre('De combien de grammes par litre le sang s\'est-il enrichi en glucose ?', Math.round(gain * 10) / 10, { tolerance: 0.01 }),
            choix('D\'où vient ce glucose ?', 'de la digestion des aliments', 'des poumons', 'des muscles'),
            choix('Ce passage du glucose dans le sang s\'appelle :', "l'absorption", 'la respiration', 'la mastication'),
          ],
          correction: [`${dec(entree + gain)} − ${dec(entree)} = <strong>${dec(gain)} g par litre</strong>.`, 'Le glucose est un nutriment issu de la <strong>digestion</strong>.', "Les nutriments traversent la paroi de l'intestin grêle : c'est l'<strong>absorption</strong>."],
        };
      },
    ], ['Compare les deux valeurs.', 'Un nutriment vient des aliments digérés.', 'Passage dans le sang : absorption.']),

    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "Compare des surfaces :",
      generer() {
        const s = pick([2, 5, 10, 25]);
        return { enonce: `La surface d'absorption de l'intestin grêle est d'environ 250 m². Combien de fois est-elle plus grande qu'une surface de ${s} m² ?`, reponse: 250 / s, validation: 'nombre', _v: { s } };
      },
      indices: ['« Combien de fois plus grand » : on divise.', 'Divise 250 par la surface donnée.', 'Vérifie en multipliant ton résultat par cette surface.'],
      correction_etapes: (st) => [`250 ÷ ${st._v.s} = <strong>${dec(250 / st._v.s)}</strong>.`, `La surface d'absorption est ${dec(250 / st._v.s)} fois plus grande : les villosités la multiplient énormément.`],
    },

    exoDocument('e09', 3, 'Raisonne sur un cas médical.', [
      () => ({
        enonce: "Dans une maladie, les villosités de l'intestin grêle sont détruites : sa paroi devient lisse. Le malade mange normalement, mais il maigrit et se sent très fatigué.",
        questions: [
          choix('Quand les villosités disparaissent, la surface d\'absorption :', 'diminue fortement', 'augmente', 'ne change pas'),
          choix('Les nutriments passent alors dans le sang :', 'en moins grande quantité', 'en plus grande quantité', 'comme d\'habitude'),
          choix('Le malade maigrit parce que :', 'ses organes reçoivent moins de nutriments', 'il ne mâche pas assez', 'son estomac ne brasse plus'),
        ],
        correction: ['Les villosités offraient une immense surface : sans elles, la surface <strong>diminue</strong>.', "Moins de surface d'échange : <strong>moins de nutriments absorbés</strong>.", "Le sang apporte <strong>moins de nutriments aux organes</strong>, malgré une alimentation normale."],
      }),
    ], ['À quoi servent les villosités ?', 'Moins de surface, moins d\'échanges.', 'Les organes dépendent des nutriments apportés par le sang.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Quel organe vient juste après l\'estomac ?', choix: ["l'intestin grêle", "l'œsophage", 'le gros intestin', 'la bouche'], correct: 0, explication: 'Bouche, œsophage, estomac, intestin grêle, gros intestin.' },
    { type: 'qcm', question: 'La digestion transforme les aliments en :', choix: ['nutriments', 'excréments uniquement', 'sang', 'dioxygène'], correct: 0, explication: 'Des molécules assez petites pour passer dans le sang.' },
    { type: 'qcm', question: "L'absorption a lieu dans :", choix: ["l'intestin grêle", "l'estomac", 'la bouche', "l'œsophage"], correct: 0, explication: 'Sa paroi, très repliée, est riche en vaisseaux sanguins.' },
    { type: 'vrai_faux', question: 'Les dents réalisent une action mécanique.', reponse: true, explication: 'Elles broient les aliments.' },
    { type: 'qcm', question: 'Les villosités de l\'intestin grêle servent à :', choix: ["augmenter la surface d'absorption", 'broyer les aliments', 'produire la salive', 'stocker l\'eau'], correct: 0, explication: 'Environ 250 m² de surface d\'échange.' },
    { type: 'vrai_faux', question: 'Les nutriments sont transportés vers les organes par le sang.', reponse: true, explication: 'Le sang les distribue à tout l\'organisme.' },
  ],
};
