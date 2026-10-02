// =====================================================================
//  p13_rayonnement_effet_serre.js — Physique-chimie 3ᵉ : rayonnement,
//  effet de serre et gaz à effet de serre. Transfert d'énergie par
//  rayonnement, bilan Terre-atmosphère, gaz produits par les
//  transformations chimiques, empreinte carbone.
//  Notions ajoutées au programme du cycle 4 en 2020 (BO n° 31 du
//  30 juillet 2020) ; le manuel de 2017 ne leur consacre pas de chapitre.
//  Valeurs vérifiées (voir js/sources.js) : 30 % de l'énergie solaire
//  réfléchie, −18 °C et 15 °C, 280 ppm, mesures de Mauna Loa, méthane
//  25 fois plus réchauffant que le CO₂, émissions par secteur, 11 kg et
//  0,2 kg de CO₂ pour 100 km. Les autres données sont inventées.
// =====================================================================

import { pick, arrondi, dec, grandeur } from '../outils.js';
import { effetDeSerre, schemaCourbe } from '../../svt/figures.js';
import { tableau } from '../../commun.js';

const t = (x) => dec(x).replace(',', '{,}');

/** Teneur de l'air en CO₂ à Mauna Loa (ppm), moyennes annuelles de la NOAA. */
const MESURES = [[1960, 317], [1980, 339], [2000, 370], [2020, 414]];

/** [gaz, est-ce un gaz à effet de serre ?, remarque]. */
const GAZ = [
  ['le dioxyde de carbone (CO₂)', true, 'il absorbe le rayonnement infrarouge émis par le sol'],
  ['le méthane (CH₄)', true, 'il absorbe le rayonnement infrarouge émis par le sol'],
  ["le protoxyde d'azote (N₂O)", true, 'il absorbe le rayonnement infrarouge émis par le sol'],
  ["la vapeur d'eau (H₂O)", true, "c'est même le principal gaz à effet de serre naturel"],
  ['le diazote (N₂)', false, "c'est le gaz le plus abondant de l'air, mais il n'absorbe pas le rayonnement infrarouge"],
  ['le dioxygène (O₂)', false, "il n'absorbe pas le rayonnement infrarouge émis par le sol"],
];

/** [dispositif, émet-il du CO₂ en fonctionnant ?, explication]. */
const DISPOSITIFS = [
  ['une centrale électrique à charbon', true, 'elle brûle du charbon : la combustion du carbone produit du dioxyde de carbone'],
  ['une chaudière à gaz', true, 'elle brûle du méthane : la combustion produit du dioxyde de carbone et de l\'eau'],
  ['un moteur à essence', true, "il brûle de l'essence : la combustion produit du dioxyde de carbone et de l'eau"],
  ['une éolienne', false, "elle convertit l'énergie cinétique du vent, sans combustion"],
  ['un panneau solaire', false, 'il convertit l\'énergie lumineuse, sans combustion'],
  ['un barrage hydraulique', false, "il convertit l'énergie de position de l'eau, sans combustion"],
];

export default {
  id: 'p13',
  titre: 'Rayonnement et effet de serre',
  theme: 'pc_energie', niveau: '3e',
  icone: '🌡️',

  intro:
    "Le Soleil chauffe la Terre à travers le vide de l'espace : l'énergie voyage sous forme de <strong>rayonnement</strong>. " +
    "La Terre, à son tour, émet un rayonnement que certains gaz de l'air retiennent : c'est l'<strong>effet de serre</strong>. " +
    "Ce chapitre relie ce bilan d'énergie aux <strong>transformations chimiques</strong> qui produisent ces gaz, et apprend à calculer une empreinte carbone.",

  cours: [
    {
      type: 'definition', titre: "Le rayonnement transporte de l'énergie",
      contenu: "Un objet <strong>émet</strong> un rayonnement : le Soleil émet surtout de la lumière visible, un objet moins chaud (le sol, un radiateur, notre corps) émet un rayonnement <strong>infrarouge</strong>, invisible. Un objet qui <strong>absorbe</strong> un rayonnement reçoit de l'énergie : il s'échauffe. C'est un <strong>transfert d'énergie par rayonnement</strong>, le seul qui traverse le vide.",
    },
    {
      type: 'propriete', titre: 'Le bilan de la Terre',
      contenu: "Environ <strong>30 %</strong> de l'énergie solaire reçue par la Terre est renvoyée vers l'espace sans être absorbée (nuages, glaces, sols clairs). Le reste est absorbé et chauffe la planète. La Terre émet à son tour un rayonnement infrarouge. Quand elle émet autant d'énergie qu'elle en absorbe, sa température reste stable.",
      formule: 'E_{\\text{absorbée}} = E_{\\text{reçue}} - E_{\\text{réfléchie}}',
    },
    {
      type: 'definition', titre: "L'effet de serre",
      contenu: "Les <strong>gaz à effet de serre</strong> absorbent une partie du rayonnement infrarouge émis par le sol et en renvoient une partie vers lui. Les principaux sont la <strong>vapeur d'eau</strong>, le <strong>dioxyde de carbone</strong> CO₂, le <strong>méthane</strong> CH₄ et le <strong>protoxyde d'azote</strong> N₂O. Cet effet est naturel : sans lui, la température moyenne de la Terre serait d'environ −18 °C au lieu d'environ 15 °C.",
    },
    { type: 'figure', titre: "Plus de gaz à effet de serre, plus d'énergie retenue", contenu: "Fais varier la teneur de l'air en CO₂ : la part du rayonnement renvoyée vers le sol change (modèle simplifié).", render: (host) => effetDeSerre(host) },
    {
      type: 'propriete', titre: 'Des transformations chimiques qui produisent ces gaz',
      contenu: "La <strong>combustion</strong> du charbon, du pétrole et du gaz produit du dioxyde de carbone : " + tableau([['Combustion du carbone', 'C + O₂ → CO₂'], ['Combustion du méthane', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O']]) +
        "La masse se conserve : 12 g de carbone donnent 44 g de dioxyde de carbone. Avant l'ère industrielle, l'air contenait 280 ppm de CO₂ (280 molécules sur un million) ; on en mesurait 414 ppm en 2020. Le méthane, lui, réchauffe 25 fois plus que la même masse de CO₂ sur cent ans.",
      formule: '\\mathrm{C} + \\mathrm{O_2} \\longrightarrow \\mathrm{CO_2}',
    },
    {
      type: 'definition', titre: "L'empreinte carbone",
      contenu: "L'<strong>empreinte carbone</strong> (ou bilan carbone) d'une activité est la masse de gaz à effet de serre qu'elle fait émettre, exprimée en kilogrammes de CO₂. Exemple : parcourir 100 km émet environ 11 kg de CO₂ en voiture thermique, et environ 0,2 kg en TGV. Dans le monde, la production d'énergie est le premier secteur émetteur (35 %), devant l'agriculture et la forêt (24 %), l'industrie (21 %), les transports (14 %) et les bâtiments (6 %).",
    },
    {
      type: 'exemple', enonce: "Sur 200 J d'énergie solaire reçus, combien sont absorbés par la Terre ?",
      solution_etapes: ['30 % sont réfléchis : $200 \\times 30 \\div 100 = 60$ J.', 'Énergie absorbée : $200 - 60 = 140$ J.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Repérer le transfert', explication: "Qui émet le rayonnement ? Qui l'absorbe ? Celui qui absorbe reçoit de l'énergie." },
    { etape: 2, titre: 'Faire le bilan', explication: 'Énergie absorbée = énergie reçue − énergie réfléchie.' },
    { etape: 3, titre: 'Relier au gaz produit', explication: 'Une combustion de charbon, de pétrole ou de gaz produit du dioxyde de carbone.' },
    { etape: 4, titre: 'Calculer une émission', explication: 'Proportionnalité : masse de CO₂ pour 100 km, ou 44 g de CO₂ pour 12 g de carbone.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Émettre ou absorber :',
      generer() {
        return pick([
          { enonce: "Au soleil, un tee-shirt noir devient chaud. Que fait-il du rayonnement solaire ?", choix: ['il en absorbe une grande partie', 'il le réfléchit entièrement', 'il le crée', 'il le transforme en son'], correct: 0, _v: { e: "Il absorbe le rayonnement : il reçoit de l'énergie et s'échauffe." } },
          { enonce: "La nuit, une caméra thermique permet de voir une personne. Quel rayonnement cette personne émet-elle ?", choix: ['un rayonnement infrarouge', 'de la lumière visible', 'des ultrasons', 'des rayons X'], correct: 0, _v: { e: 'Tout corps chaud émet un rayonnement infrarouge, invisible pour l\'œil.' } },
          { enonce: "Comment l'énergie du Soleil arrive-t-elle jusqu'à la Terre, à travers le vide ?", choix: ['par rayonnement', 'par contact', 'par le son', 'par un courant électrique'], correct: 0, _v: { e: 'Le rayonnement est le seul transfert d\'énergie qui traverse le vide.' } },
          { enonce: 'La neige fraîche reste froide au soleil. Pourquoi ?', choix: ['elle réfléchit la plus grande partie du rayonnement', 'elle absorbe tout le rayonnement', "elle n'en reçoit pas", 'elle émet de la lumière visible'], correct: 0, _v: { e: 'Une surface claire réfléchit le rayonnement : elle en absorbe peu.' } },
        ]);
      },
      indices: ['Absorber un rayonnement, c\'est recevoir de l\'énergie.', 'Un corps chaud émet un rayonnement infrarouge.', 'Une surface claire réfléchit, une surface sombre absorbe.'],
      correction_etapes: (st) => [st._v.e],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Gaz à effet de serre ou non ?',
      generer() {
        const [nom, ges, pourquoi] = pick(GAZ);
        return { enonce: `${nom[0].toUpperCase() + nom.slice(1)} est-il un gaz à effet de serre ?`.replace('La vapeur d\'eau (H₂O) est-il', 'La vapeur d\'eau (H₂O) est-elle'), choix: ['oui', 'non'], correct: ges ? 0 : 1, ordre_fixe: true, _v: { nom, ges, pourquoi } };
      },
      indices: ['Un gaz à effet de serre absorbe le rayonnement infrarouge émis par le sol.', "Les deux gaz les plus abondants de l'air n'en sont pas.", "CO₂, méthane, protoxyde d'azote, vapeur d'eau : oui."],
      correction_etapes: (st) => [`<strong>${st._v.ges ? 'Oui' : 'Non'}</strong> : ${st._v.pourquoi}.`],
    },
    {
      id: 'e03', niveau: 1, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'effet de serre est un phénomène naturel.", reponse: true, _v: { e: 'Oui : sans lui, la température moyenne serait d\'environ −18 °C. Ce sont les émissions humaines qui le renforcent.' } },
          { enonce: 'La Terre absorbe toute l\'énergie solaire qu\'elle reçoit.', reponse: false, _v: { e: 'Non : environ 30 % sont réfléchis vers l\'espace.' } },
          { enonce: 'La combustion du méthane produit du dioxyde de carbone.', reponse: true, _v: { e: 'Oui : CH₄ + 2 O₂ → CO₂ + 2 H₂O.' } },
          { enonce: 'Le sol terrestre émet un rayonnement infrarouge.', reponse: true, _v: { e: 'Oui : c\'est ce rayonnement que les gaz à effet de serre absorbent en partie.' } },
          { enonce: 'À masse égale, le méthane réchauffe moins que le dioxyde de carbone.', reponse: false, _v: { e: 'Non : sur cent ans, il réchauffe 25 fois plus que la même masse de CO₂.' } },
        ]);
      },
      indices: ['Naturel ne veut pas dire inchangé.', 'Une partie du rayonnement solaire est réfléchie.', 'Pense aux équations de combustion.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
    {
      id: 'e04', niveau: 2, type: 'saisie', consigne: 'Le bilan de la Terre :',
      generer() {
        const E = pick([100, 200, 340, 500, 1000]);
        return {
          enonce: `La Terre réfléchit environ 30 % de l'énergie solaire qu'elle reçoit. Sur ${E} J reçus, quelle énergie est absorbée ?`,
          ...grandeur(arrondi(E * 0.7, 1), 'J', { tolerance: 0.5, pieges: [{ valeur: arrondi(E * 0.3, 1), message: "C'est l'énergie réfléchie : soustrais-la de l'énergie reçue." }] }),
          _v: { E },
        };
      },
      indices: ['Calcule 30 % de l\'énergie reçue.', 'Énergie absorbée = énergie reçue − énergie réfléchie.', 'On peut aussi prendre 70 % directement.'],
      correction_etapes: (st) => [`Réfléchie : $${st._v.E} \\times 30 \\div 100 = ${t(arrondi(st._v.E * 0.3, 1))}$ J.`, `Absorbée : $${st._v.E} - ${t(arrondi(st._v.E * 0.3, 1))} = ${t(arrondi(st._v.E * 0.7, 1))}$ J.`],
    },
    {
      id: 'e05', niveau: 2, type: 'saisie', consigne: 'Lis le graphique :',
      generer() {
        const i = pick([0, 1, 2]), j = pick([1, 2, 3].filter((k) => k > i)), [a1, p1] = MESURES[i], [a2, p2] = MESURES[j];
        return {
          enonce: `Le graphique montre la teneur de l'air en dioxyde de carbone mesurée à l'observatoire de Mauna Loa (Hawaï) : ${MESURES.map(([a, p]) => `${p} ppm en ${a}`).join(', ')}. De combien de ppm a-t-elle augmenté entre ${a1} et ${a2} ?`,
          visuel: (host) => { host.innerHTML = schemaCourbe(MESURES, { xLabel: 'année', yLabel: 'CO₂ (ppm)', ymin: 300, ymax: 420 }); },
          reponse: p2 - p1, validation: 'nombre', _v: { a1, a2, p1, p2 },
        };
      },
      indices: ['Lis les deux valeurs sur le graphique.', 'Une augmentation est une différence.', 'Valeur finale − valeur initiale.'],
      correction_etapes: (st) => [`$${st._v.p2} - ${st._v.p1} = ${st._v.p2 - st._v.p1}$.`, `La teneur a augmenté de <strong>${st._v.p2 - st._v.p1} ppm</strong> entre ${st._v.a1} et ${st._v.a2}.`],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'Avec ou sans dioxyde de carbone ?',
      generer() {
        const [nom, emet, pourquoi] = pick(DISPOSITIFS);
        return { enonce: `Le fonctionnement d'${nom.replace(/^une? /, (m) => m)} s'accompagne-t-il d'une émission de dioxyde de carbone ?`.replace("d'une ", "d'une ").replace("d'un ", "d'un "), choix: ['oui', 'non'], correct: emet ? 0 : 1, ordre_fixe: true, _v: { nom, emet, pourquoi } };
      },
      indices: ['Y a-t-il une combustion ?', 'Charbon, pétrole et gaz contiennent du carbone.', 'Vent, Soleil, eau : pas de combustion.'],
      correction_etapes: (st) => [`<strong>${st._v.emet ? 'Oui' : 'Non'}</strong> : ${st._v.pourquoi}.`],
    },
    {
      id: 'e07', niveau: 3, type: 'saisie', consigne: 'Du carbone au dioxyde de carbone :',
      generer() {
        const m = pick([3, 6, 24, 36, 60, 120]);
        return {
          enonce: `La combustion complète de 12 g de carbone produit 44 g de dioxyde de carbone. Quelle masse de dioxyde de carbone produit la combustion de ${m} kg de carbone ? (données d'exercice)`,
          ...grandeur(arrondi((m * 44) / 12, 2), 'kg', { tolerance: 0.05, pieges: [{ valeur: arrondi((m * 12) / 44, 2), message: 'Le dioxyde de carbone contient aussi de l\'oxygène : sa masse est plus grande que celle du carbone brûlé.' }] }),
          _v: { m },
        };
      },
      indices: ['Les masses sont proportionnelles.', '12 kg de carbone donneraient 44 kg de dioxyde de carbone.', 'Multiplie par 44 ÷ 12.'],
      correction_etapes: (st) => [`$${st._v.m} \\div 12 = ${t(st._v.m / 12)}$.`, `$44 \\times ${t(st._v.m / 12)} = ${t(arrondi((st._v.m * 44) / 12, 2))}$ kg de dioxyde de carbone.`],
    },
    {
      id: 'e08', niveau: 3, type: 'saisie', consigne: "L'empreinte carbone d'un trajet :",
      generer() {
        const d = pick([200, 300, 400, 500, 800]), mode = pick(['voiture', 'ecart']);
        const voiture = arrondi((11 * d) / 100, 1), train = arrondi((0.2 * d) / 100, 1);
        return mode === 'voiture'
          ? { enonce: `D'après l'ADEME, parcourir 100 km en voiture thermique émet environ 11 kg de CO₂. Quelle masse de CO₂ émet un trajet de ${d} km ?`, ...grandeur(voiture, 'kg', { tolerance: 0.1 }), _v: { d, mode, voiture, train } }
          : { enonce: `D'après l'ADEME, parcourir 100 km émet environ 11 kg de CO₂ en voiture thermique et environ 0,2 kg en TGV. Pour un trajet de ${d} km, quelle masse de CO₂ évite-t-on en prenant le train ?`, ...grandeur(arrondi(voiture - train, 1), 'kg', { tolerance: 0.1, pieges: [{ valeur: voiture, message: "C'est l'émission de la voiture : retire celle du train." }] }), _v: { d, mode, voiture, train } };
      },
      indices: ['Situation de proportionnalité.', 'Combien de fois 100 km dans le trajet ?', 'Pour comparer, calcule les deux émissions puis fais la différence.'],
      correction_etapes: (st) => (st._v.mode === 'voiture'
        ? [`$11 \\times ${st._v.d} \\div 100 = ${t(st._v.voiture)}$ kg de CO₂.`]
        : [`Voiture : $11 \\times ${st._v.d} \\div 100 = ${t(st._v.voiture)}$ kg. Train : $0{,}2 \\times ${st._v.d} \\div 100 = ${t(st._v.train)}$ kg.`, `Écart : $${t(st._v.voiture)} - ${t(st._v.train)} = ${t(arrondi(st._v.voiture - st._v.train, 1))}$ kg de CO₂ évités.`]),
    },
    {
      id: 'e09', niveau: 2, type: 'ordonner_etapes', consigne: "Remets dans l'ordre le mécanisme de l'effet de serre :",
      generer() {
        return {
          etapes: [
            'Le Soleil émet un rayonnement qui arrive sur la Terre',
            'Une partie est réfléchie vers l\'espace, le reste est absorbé par le sol',
            'Le sol, chauffé, émet un rayonnement infrarouge',
            'Les gaz à effet de serre absorbent une partie de ce rayonnement',
            'Ils en renvoient une partie vers le sol, qui reste plus chaud',
          ],
        };
      },
      indices: ['Tout part du Soleil.', 'Le sol doit absorber avant d\'émettre.', 'Les gaz interviennent sur le rayonnement du sol, pas sur celui du Soleil.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Le seul transfert d\'énergie qui traverse le vide est :', choix: ['le rayonnement', 'le contact', 'le son', 'le courant électrique'], correct: 0, explication: "C'est ainsi que l'énergie du Soleil nous parvient." },
    { type: 'qcm', question: 'Lequel de ces gaz est un gaz à effet de serre ?', choix: ['le méthane', 'le diazote', 'le dioxygène', "l'argon"], correct: 0, explication: "Avec la vapeur d'eau, le dioxyde de carbone et le protoxyde d'azote." },
    { type: 'vrai_faux', question: 'Sans effet de serre, la Terre serait plus froide.', reponse: true, explication: 'Environ −18 °C en moyenne, au lieu d\'environ 15 °C.' },
    {
      type: 'saisie', question: 'Bilan.',
      generer() { const E = pick([300, 400, 600]); return { question: `La Terre réfléchit 30 % de l'énergie reçue. Sur ${E} J reçus, combien sont absorbés ?`, ...grandeur(E * 0.7, 'J', { tolerance: 0.5 }), explication: `$${E} \\times 70 \\div 100 = ${E * 0.7}$ J.` }; },
    },
    { type: 'qcm', question: 'La combustion du carbone produit :', choix: ['du dioxyde de carbone', 'du dioxygène', 'du diazote', 'du méthane'], correct: 0, explication: 'C + O₂ → CO₂.' },
    { type: 'qcm', question: "L'empreinte carbone d'une activité s'exprime en :", choix: ['kilogrammes de CO₂', 'degrés Celsius', 'watts', 'newtons'], correct: 0, explication: "C'est une masse de gaz à effet de serre émise." },
  ],
};
