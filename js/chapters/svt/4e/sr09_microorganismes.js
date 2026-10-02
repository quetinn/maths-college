// =====================================================================
//  sr09_microorganismes.js — SVT 4ᵉ : les microorganismes dans
//  l'environnement. Ubiquité et diversité du monde microbien, microbiote,
//  microorganismes utiles et pathogènes, hygiène.
//  Plan : manuel LeLivreScolaire SVT cycle 4, chapitre 26.
//  Valeurs vérifiées (voir js/sources.js) : microbiote intestinal (environ
//  1 kg de bactéries, à peu près autant de bactéries que de cellules
//  humaines), division d'une bactérie toutes les vingt minutes en
//  conditions favorables. Les comptages des exercices sont inventés.
// =====================================================================

import { pick, randInt, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { etapes, schemaBarres } from '../figures.js';

const DEFINITIONS = [
  ['un microorganisme', "Être vivant visible seulement au microscope : bactérie, virus, champignon microscopique."],
  ['une bactérie', "Microorganisme formé d'une seule cellule, sans noyau."],
  ['un virus', "Microorganisme beaucoup plus petit qu'une bactérie, qui ne peut se multiplier qu'à l'intérieur d'une cellule."],
  ['le microbiote', "Ensemble des microorganismes qui vivent sur ou dans notre corps sans nous rendre malades."],
  ['un microorganisme pathogène', 'Microorganisme capable de provoquer une maladie.'],
  ["l'hygiène", "Ensemble des gestes qui limitent la transmission des microorganismes pathogènes."],
];

const corps = '<circle cx="160" cy="34" r="16" class="sv-plein-doux"/><path d="M134 60 Q160 50 186 60 L182 126 H138Z" class="sv-plein-doux"/><path d="M136 64 L112 112 M184 64 L208 112 M148 126 V172 M172 126 V172" class="sv-trait"/>';
const zone = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" class="sv-zone-microbe"/>`;
const SCENES = [
  ['La peau', corps + zone(112, 112, 12) + zone(208, 112, 12), "La <strong>peau</strong> est couverte de bactéries. La plupart sont inoffensives et occupent la place : elles gênent l'installation de microorganismes dangereux."],
  ['La bouche', corps + zone(160, 42, 9), "La <strong>bouche</strong> abrite de nombreuses bactéries. Certaines, nourries par le sucre, attaquent les dents : d'où l'intérêt du brossage."],
  ["L'intestin", corps + zone(160, 104, 20), "L'<strong>intestin</strong> héberge environ 1 kg de bactéries. Elles aident à digérer, fabriquent des vitamines et protègent contre des microorganismes pathogènes."],
];

export default {
  id: 'sr09',
  titre: "Les microorganismes dans l'environnement",
  theme: 'svt_corps', niveau: '4e',
  icone: '🦠',

  intro:
    "Tu héberges à peu près autant de bactéries que tu as de cellules. Loin d'être des ennemies, la plupart te rendent service. " +
    "On découvre où vivent les <strong>microorganismes</strong>, lesquels sont utiles ou dangereux, et les gestes qui limitent la transmission des seconds.",

  cours: [
    {
      type: 'definition', titre: 'Des êtres vivants partout',
      contenu: "Les <strong>microorganismes</strong> ne sont visibles qu'au microscope. Ils sont présents partout : dans l'air, l'eau, le sol, sur les objets, sur notre peau et dans notre tube digestif. On distingue notamment les <strong>bactéries</strong>, les <strong>virus</strong>, bien plus petits, et des champignons microscopiques comme les levures.",
    },
    {
      type: 'propriete', titre: 'Une multiplication très rapide',
      contenu: "Dans de bonnes conditions (chaleur, humidité, nourriture), une bactérie se divise en deux toutes les vingt minutes. Un virus, lui, ne se multiplie qu'à l'intérieur d'une cellule qu'il infecte.",
    },
    { type: 'figure', titre: 'Notre microbiote', contenu: 'Explore trois zones du corps.', render: (host) => etapes(host, 'Zone', SCENES, { vb: '0 0 320 180' }) },
    {
      type: 'propriete', titre: 'Des microorganismes utiles',
      contenu: "Notre <strong>microbiote</strong> participe à la digestion, fabrique des vitamines et nous protège. D'autres microorganismes servent à fabriquer des aliments : les levures font lever le pain, des bactéries transforment le lait en yaourt, des moisissures affinent certains fromages.",
    },
    {
      type: 'definition', titre: 'Des microorganismes pathogènes',
      contenu: "Certains microorganismes provoquent des maladies : ils sont <strong>pathogènes</strong>. Ils se transmettent par l'air (toux, éternuements), par les mains, par l'eau ou les aliments, par le sang ou lors de rapports sexuels.",
    },
    {
      type: 'propriete', titre: "Se protéger : l'hygiène",
      contenu: "Se laver les mains au savon, tousser dans son coude, conserver les aliments au froid, désinfecter une plaie : ces gestes limitent la transmission. Il ne s'agit pas d'éliminer tous les microorganismes, mais d'empêcher les pathogènes d'entrer dans l'organisme.",
    },
    {
      type: 'exemple', enonce: "Un plat cuisiné est oublié trois heures sur la table en été. Pourquoi vaut-il mieux ne pas le manger ?",
      solution_etapes: ['La chaleur et la nourriture sont des conditions favorables aux bactéries.', 'Elles peuvent se diviser toutes les vingt minutes : en trois heures, cela fait neuf divisions.', "Quelques bactéries sont devenues plusieurs centaines pour chacune : le risque d'intoxication augmente."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Observer les boîtes de culture', explication: "Chaque tache, appelée colonie, provient d'un microorganisme déposé au départ." },
    { etape: 2, titre: 'Compter', explication: "Compte les colonies dans chaque boîte." },
    { etape: 3, titre: 'Comparer au témoin', explication: "La boîte témoin n'a subi aucun traitement : elle sert de référence." },
    { etape: 4, titre: 'Conclure', explication: "Moins de colonies après un geste d'hygiène : ce geste est efficace." },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Un virus est plus petit qu\'une bactérie.', 'Pathogène : qui rend malade.', 'Le microbiote vit avec nous.']),

    exoClasser('e02', 1, 'Ce microorganisme nous est-il utile ou est-il pathogène ?', [
      ['les bactéries de l\'intestin qui aident à digérer', 'utile'], ['les levures qui font lever le pain', 'utile'], ['les bactéries qui transforment le lait en yaourt', 'utile'], ['les bactéries de la peau qui occupent le terrain', 'utile'],
      ['le virus de la grippe', 'pathogène'], ['la bactérie du tétanos', 'pathogène'], ['le virus de la varicelle', 'pathogène'], ['la bactérie de la tuberculose', 'pathogène'],
    ], ['utile', 'pathogène'], { utile: 'Ces microorganismes nous rendent service.', pathogène: 'Ces microorganismes provoquent une maladie.' },
    ['La plupart des microorganismes ne rendent pas malade.', 'Pain, yaourt, fromage : merci les microorganismes.', 'Grippe et varicelle sont des maladies.']),

    exoVraiFaux('e03', 1, [
      ['Tous les microorganismes rendent malade.', false, 'Non : la plupart sont inoffensifs et beaucoup sont utiles.'],
      ['On trouve des microorganismes dans l\'air, l\'eau et le sol.', true, 'Oui : ils sont présents partout.'],
      ['Un virus peut se multiplier seul, hors d\'une cellule.', false, 'Non : il a besoin d\'une cellule à infecter.'],
      ["Notre intestin héberge environ 1 kg de bactéries.", true, 'Oui : c\'est le microbiote intestinal.'],
      ['Se laver les mains limite la transmission des microorganismes pathogènes.', true, 'Oui : les mains en transportent beaucoup.'],
      ['Les levures servent à fabriquer le pain.', true, 'Oui : ce sont des champignons microscopiques.'],
      ['Le froid favorise la multiplication des bactéries.', false, 'Non : il la ralentit, d\'où l\'usage du réfrigérateur.'],
    ], ['Utiles ou pathogènes : il y a les deux.', 'Un virus dépend d\'une cellule.', 'Chaleur et humidité favorisent les bactéries.']),

    exoRelier('e04', 2, "Associe chaque aliment au microorganisme qui sert à le fabriquer.", [
      ['le pain', 'des levures'], ['le yaourt', 'des bactéries lactiques'], ['le roquefort', 'une moisissure'],
    ], ['Les levures font gonfler la pâte.', 'Le yaourt vient du lait transformé par des bactéries.', 'Les veines bleues du roquefort sont une moisissure.'], 3),

    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Compte les bactéries :',
      generer() {
        const n = pick([3, 4, 5, 6]), min = n * 20;
        const duree = min % 60 === 0 ? `${min / 60} h` : `${Math.floor(min / 60) ? Math.floor(min / 60) + ' h ' : ''}${min % 60} min`;
        return { enonce: `Dans de bonnes conditions, une bactérie se divise en deux toutes les 20 minutes. On dépose une bactérie sur un aliment laissé à température ambiante. Combien y en a-t-il après ${duree} ?`, reponse: 2 ** n, validation: 'nombre', pieges: [{ valeur: 2 * n, message: 'Le nombre double à chaque division : 2, 4, 8, 16…' }], _v: { n, duree } };
      },
      indices: ['Compte le nombre de divisions de 20 minutes.', 'Le nombre double à chaque division.', '1 → 2 → 4 → 8…'],
      correction_etapes: (st) => [`${st._v.duree} = ${st._v.n} divisions de 20 minutes.`, `${Array.from({ length: st._v.n + 1 }, (_, k) => 2 ** k).join(' → ')} : <strong>${2 ** st._v.n} bactéries</strong>.`],
    },

    exoDocument('e06', 2, "Évalue l'efficacité du lavage des mains.", [
      () => {
        const sale = randInt(60, 90), eau = randInt(30, 45), savon = randInt(3, 9);
        return {
          enonce: "Comptages inventés pour l'exercice. Trois élèves posent leurs doigts sur une boîte de culture : le premier sans se laver les mains, le deuxième après un rinçage à l'eau, le troisième après un lavage au savon. Deux jours plus tard, on compte les colonies de microorganismes.",
          visuel: (host) => { host.innerHTML = schemaBarres([['sans lavage', sale], ["à l'eau", eau], ['au savon', savon]], { unite: 'colonies' }); },
          questions: [
            nombre('Combien de colonies le lavage au savon a-t-il évitées par rapport à l\'absence de lavage ?', sale - savon),
            choix('Quelle boîte sert de témoin ?', 'celle des mains non lavées', 'celle du lavage au savon', "celle du rinçage à l'eau"),
            choix('Le geste le plus efficace est :', 'le lavage au savon', "le rinçage à l'eau", "l'absence de lavage"),
          ],
          correction: [`${sale} − ${savon} = <strong>${sale - savon} colonies</strong> de moins.`, 'La boîte « sans lavage » est le <strong>témoin</strong> : elle montre ce qui se passe sans traitement.', `Avec ${savon} colonies seulement, le <strong>savon</strong> est le plus efficace.`],
        };
      },
    ], ['Compare les trois barres.', 'Le témoin n\'a subi aucun traitement.', 'Moins de colonies : geste plus efficace.']),

    exoClasser('e07', 2, 'Par quelle voie ce microorganisme se transmet-il ?', [
      ['on éternue sans se couvrir', "par l'air"], ['on tousse près de quelqu\'un', "par l'air"],
      ['on mange sans s\'être lavé les mains', 'par les mains'], ['on se frotte les yeux après avoir touché une poignée de porte', 'par les mains'],
      ['on boit une eau non potable', "par l'eau ou les aliments"], ['on mange un plat resté des heures hors du réfrigérateur', "par l'eau ou les aliments"],
    ], ["par l'air", 'par les mains', "par l'eau ou les aliments"], { "par l'air": 'Les gouttelettes projetées contiennent des microorganismes.', 'par les mains': 'Les mains transportent les microorganismes des objets vers la bouche, le nez, les yeux.', "par l'eau ou les aliments": 'Les microorganismes sont avalés.' },
    ['Toux et éternuements : l\'air.', 'Poignées, objets : les mains.', 'Ce qu\'on avale : eau et aliments.'], 4),

    exoSituation('e08', 2, 'Quel geste est le bon ?', [
      ['Tu rentres du collège et tu vas goûter.', 'Je me lave les mains au savon avant de manger.', 'Je me rince les mains sous l\'eau deux secondes.', 'Je ne fais rien : mes mains ont l\'air propres.'],
      ['Tu es enrhumé et tu vas éternuer en classe.', 'J\'éternue dans mon coude ou dans un mouchoir.', 'J\'éternue dans ma main.', 'J\'éternue devant moi.'],
      ['Il reste du poulet cuit après le repas.', 'Je le range rapidement au réfrigérateur.', 'Je le laisse sur la table jusqu\'au lendemain.', 'Je le pose près du radiateur.'],
      ['Tu t\'es écorché le genou dans la cour.', 'Je nettoie la plaie puis je la désinfecte.', 'Je la recouvre de terre.', 'Je la laisse telle quelle.'],
    ], ['Les mains transportent les microorganismes.', 'Le froid ralentit leur multiplication.', 'Une plaie est une porte d\'entrée.'], "L'hygiène vise à empêcher les microorganismes pathogènes d'entrer dans l'organisme."),

    exoDocument('e09', 3, 'Explique le rôle protecteur du microbiote.', [
      () => ({
        enonce: "Après un traitement antibiotique, qui détruit une grande partie des bactéries de l'intestin, certaines personnes ont des diarrhées dues à une bactérie pathogène. Avant le traitement, cette bactérie était déjà présente dans leur intestin, en très petit nombre, sans les rendre malades.",
        questions: [
          choix('Avant le traitement, la bactérie pathogène restait rare car :', 'les bactéries du microbiote occupaient la place et la nourriture', 'elle était morte', "l'intestin était stérile"),
          choix("Après le traitement, elle se multiplie car :", 'la place et la nourriture sont devenues disponibles', "l'antibiotique la nourrit", 'elle est devenue un virus'),
          choix('Cet exemple montre que le microbiote :', 'nous protège de certains microorganismes pathogènes', 'est toujours dangereux', 'ne sert à rien'),
        ],
        correction: ['Un microbiote abondant <strong>occupe le terrain</strong> : la bactérie pathogène ne peut pas se développer.', "Le microbiote est en partie détruit : la bactérie pathogène, résistante, <strong>prend la place</strong>.", 'Le microbiote joue un rôle de <strong>protection</strong>.'],
      }),
    ], ['Le microbiote occupe la place.', 'Qu\'est-ce que l\'antibiotique a détruit ?', 'Une place libre est vite occupée.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Les microorganismes se trouvent :', choix: ['partout : air, eau, sol, corps', 'uniquement chez les malades', 'uniquement dans l\'eau sale', 'uniquement à l\'hôpital'], correct: 0, explication: 'Ils sont présents partout.' },
    { type: 'qcm', question: 'Le microbiote est :', choix: ['l\'ensemble des microorganismes qui vivent avec nous', 'une maladie', 'un médicament', 'un organe'], correct: 0, explication: 'Il nous rend de nombreux services.' },
    { type: 'vrai_faux', question: 'Un virus ne se multiplie qu\'à l\'intérieur d\'une cellule.', reponse: true, explication: 'Il a besoin d\'une cellule à infecter.' },
    {
      type: 'saisie', question: 'Bactéries.',
      generer() { const n = pick([2, 3, 4]); return { question: `Une bactérie se divise en deux toutes les 20 minutes. En partant d'une seule, combien y en a-t-il après ${n * 20} minutes ?`, reponse: 2 ** n, validation: 'nombre', explication: `${n} divisions : ${2 ** n} bactéries.` }; },
    },
    { type: 'qcm', question: 'Le geste le plus efficace pour limiter la transmission par les mains est :', choix: ['le lavage au savon', 'le rinçage rapide à l\'eau', 'l\'essuyage sur le pantalon', 'le port de gants toute la journée'], correct: 0, explication: 'Le savon élimine la plupart des microorganismes.' },
    { type: 'vrai_faux', question: 'Les levures utilisées pour le pain sont des microorganismes.', reponse: true, explication: 'Ce sont des champignons microscopiques.' },
  ],
};
