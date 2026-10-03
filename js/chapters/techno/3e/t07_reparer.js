// =====================================================================
//  t07_reparer.js — Technologie 3ᵉ : diagnostiquer et réparer.
//  Repères de 3ᵉ du programme de 2024 : formuler des hypothèses expliquant
//  un dysfonctionnement, proposer un protocole de dépannage puis de
//  réparation, réaliser une pièce sur mesure ; justifier le choix d'un
//  matériau et de son procédé de mise en forme.
//  Les pannes, mesures et caractéristiques de matériaux des exercices sont
//  des données d'exercice.
// =====================================================================

import { pick, exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoSituation, choix, nombre } from '../outils.js';
import { tableau } from '../../commun.js';
import { depannage, schemaProcedes } from '../figures.js';

const DEFINITIONS = [
  ['un dysfonctionnement', "Écart entre ce qu'un objet devrait faire et ce qu'il fait réellement."],
  ['une hypothèse', "Explication possible d'une panne, qu'il faut vérifier par un test."],
  ['un protocole de dépannage', "Suite ordonnée de vérifications qui permet de trouver l'origine d'une panne."],
  ['la fiabilité', "Aptitude d'un objet à fonctionner sans panne pendant une durée donnée."],
  ['la durabilité', "Aptitude d'un objet à rester utilisable longtemps, grâce à sa solidité et à la possibilité de le réparer."],
  ['la fabrication additive', "Procédé qui construit une pièce en ajoutant de la matière couche par couche : c'est le principe de l'imprimante 3D."],
  ["l'usinage", "Procédé qui donne sa forme à une pièce en enlevant de la matière avec un outil coupant."],
  ['le thermoformage', "Procédé qui met en forme une plaque de plastique chauffée en la plaquant sur un moule."],
  ['un assemblage démontable', 'Liaison entre deux pièces que l\'on peut défaire sans les abîmer : vis, écrou, clip.'],
];

const PROCEDES = [
  ["l'impression 3D", 'ajout de matière'], ['le dépôt de fil fondu couche par couche', 'ajout de matière'],
  ['la découpe au laser', 'enlèvement de matière'], ['le perçage', 'enlèvement de matière'], ["l'usinage dans un centre d'usinage", 'enlèvement de matière'], ['le sciage', 'enlèvement de matière'],
  ['le pliage', 'mise en forme'], ['le thermoformage', 'mise en forme'],
];

const ASSEMBLAGES = [
  ['une vis et un écrou', 'démontable'], ['un clip', 'démontable'], ['un boulon', 'démontable'], ['un emboîtement serré à la main', 'démontable'],
  ['un collage', 'fixe'], ['une soudure', 'fixe'], ['un rivet', 'fixe'],
];

const MATERIAUX = tableau([['Matériau', 'aluminium', 'acier', 'plastique PLA', 'bois'], ['Conduit le courant', 'oui', 'oui', 'non', 'non'], ['Résistance à la flexion', 'bonne', 'très bonne', 'moyenne', 'moyenne'], ['Masse pour une même pièce', 'faible', 'élevée', 'très faible', 'faible'], ['Recyclable', 'oui', 'oui', 'oui, en filière adaptée', 'oui']]);

export default {
  id: 't07',
  titre: 'Diagnostiquer et réparer',
  theme: 'tk_structure', niveau: '3e',
  icone: '🔧',

  intro:
    "Une trottinette qui ne démarre plus n'est pas forcément bonne à jeter. Encore faut-il trouver ce qui ne va pas. " +
    "En 3ᵉ, tu apprends à <strong>raisonner comme un dépanneur</strong> : formuler des hypothèses, les tester dans le bon ordre, puis réparer, parfois en fabriquant toi-même la pièce manquante.",

  cours: [
    {
      type: 'definition', titre: 'Du constat aux hypothèses',
      contenu: "Un <strong>dysfonctionnement</strong> est un écart entre le comportement attendu et le comportement observé. On commence par le décrire précisément, puis on liste des <strong>hypothèses</strong> : chaque constituant de la chaîne d'énergie ou de la chaîne d'information peut être en cause.",
    },
    {
      type: 'propriete', titre: 'Le protocole de dépannage',
      contenu: "On teste les hypothèses <strong>une par une</strong>, en commençant par la plus simple à vérifier et en suivant la chaîne d'énergie : la source, puis la distribution, puis le convertisseur, puis la transmission. Chaque test doit pouvoir répondre par oui ou par non : mesurer une tension, remplacer un élément par un autre qui fonctionne, observer un voyant. Avant toute intervention, on <strong>coupe l'alimentation</strong>.",
    },
    { type: 'figure', titre: 'Trouver la panne par des mesures', contenu: 'Choisis une panne et lis les tensions le long de la chaîne d\'énergie.', render: (host) => depannage(host) },
    {
      type: 'propriete', titre: 'Réparer, puis valider',
      contenu: "Une fois la cause trouvée, on remplace ou on refabrique la pièce, on remonte, puis on <strong>vérifie que l'objet fonctionne à nouveau</strong>. Réparer améliore la <strong>durabilité</strong> de l'objet : c'est ce que mesure l'indice de réparabilité.",
    },
    {
      type: 'definition', titre: 'Trois familles de procédés',
      contenu: "Pour obtenir une pièce, on peut <strong>ajouter de la matière</strong> (impression 3D), en <strong>enlever</strong> (découpe au laser, usinage, perçage) ou la <strong>mettre en forme</strong> (pliage, thermoformage). Les pièces sont ensuite reliées par un assemblage <strong>fixe</strong> (collage, soudure) ou <strong>démontable</strong> (vis, clip). Un assemblage démontable facilite les réparations.",
    },
    { type: 'figure', titre: 'Ajouter, enlever, déformer', contenu: 'Les trois familles de procédés.', render: (host) => { host.innerHTML = schemaProcedes(); } },
    {
      type: 'propriete', titre: 'Choisir le matériau',
      contenu: "Le matériau d'une pièce se choisit selon les efforts qu'elle subit (<strong>flexion</strong> quand elle plie, <strong>torsion</strong> quand elle vrille), selon qu'elle doit ou non <strong>conduire le courant ou la chaleur</strong>, et selon des critères environnementaux : disponibilité, recyclage. Le procédé dépend du matériau et de la forme : on imprime un plastique, on plie une tôle, on découpe une plaque.",
    },
    {
      type: 'propriete', titre: "La sécurité à l'atelier",
      contenu: "Avant d'utiliser une machine : cheveux attachés, vêtements près du corps, <strong>équipements de protection individuelle</strong> adaptés (lunettes, gants selon la machine), capot fermé, et jamais sans l'accord du professeur.",
    },
    {
      type: 'exemple', enonce: "Une lampe de bureau à LED ne s'allume plus. Propose un protocole de dépannage.",
      solution_etapes: ['Hypothèse 1 : la prise n\'est pas alimentée. Test : brancher un autre appareil sur la prise.', 'Hypothèse 2 : l\'interrupteur est défectueux. Test : mesurer la tension après l\'interrupteur, lampe allumée.', 'Hypothèse 3 : le module à LED est hors service. Test : le remplacer par un module identique.', "On s'arrête dès qu'un test révèle la cause, on répare, puis on vérifie que la lampe s'allume."],
    },
  ],

  methode: [
    { etape: 1, titre: 'Décrire la panne', explication: "Que devrait faire l'objet ? Que fait-il ? Dans quelles conditions ?" },
    { etape: 2, titre: 'Lister les hypothèses', explication: "Parcours la chaîne d'énergie puis la chaîne d'information : chaque constituant est un suspect." },
    { etape: 3, titre: 'Tester dans l\'ordre', explication: 'Du plus simple au plus complexe, un seul test à la fois, avec un résultat par oui ou par non.' },
    { etape: 4, titre: 'Réparer et valider', explication: 'Remplace ou fabrique la pièce, remonte, puis vérifie le fonctionnement.' },
  ],

  exercices: [
    exoDefinition('e01', 1, DEFINITIONS, ['Hypothèse : une explication à vérifier.', 'Additive : on ajoute de la matière.', 'Usinage : on en enlève.']),

    exoClasser('e02', 1, 'À quelle famille ce procédé appartient-il ?', PROCEDES, ['ajout de matière', 'enlèvement de matière', 'mise en forme'],
      { 'ajout de matière': 'La pièce se construit couche par couche.', 'enlèvement de matière': 'On part d\'un bloc ou d\'une plaque et on retire ce qui est en trop.', 'mise en forme': 'La quantité de matière ne change pas : on la déforme.' },
      ['La matière augmente, diminue ou reste la même ?', 'Imprimer en 3D : ajouter.', 'Plier : déformer sans enlever.'], 5),

    exoVraiFaux('e03', 1, [
      ["Avant de démonter un appareil électrique, on coupe son alimentation.", true, "Oui : c'est la première règle de sécurité."],
      ['On teste toutes les hypothèses en même temps pour gagner du temps.', false, 'Non : un seul test à la fois, sinon on ne sait pas lequel a révélé la cause.'],
      ["Une hypothèse doit être vérifiée par un test.", true, 'Oui : sans test, ce n\'est qu\'une supposition.'],
      ["L'impression 3D enlève de la matière.", false, "Non : elle en ajoute, couche par couche."],
      ['Un assemblage par vis est démontable.', true, 'Oui : on peut le défaire sans abîmer les pièces.'],
      ['Un assemblage collé facilite la réparation.', false, "Non : il est fixe ; le démontage risque d'abîmer les pièces."],
      ['Après une réparation, on vérifie que l\'objet fonctionne.', true, 'Oui : c\'est la validation.'],
      ["Une pièce qui plie sous une charge travaille en flexion.", true, 'Oui. Une pièce qui vrille travaille en torsion.'],
    ], ['Sécurité d\'abord.', 'Un test à la fois.', 'Ajouter, enlever ou déformer ?']),

    exoClasser('e04', 2, 'Assemblage fixe ou démontable ?', ASSEMBLAGES, ['démontable', 'fixe'],
      { démontable: 'On peut le défaire sans abîmer les pièces : la réparation est facile.', fixe: 'On ne peut pas le défaire sans abîmer les pièces.' },
      ['Peut-on le défaire sans rien casser ?', 'Une vis se dévisse.', 'Une colle ne se défait pas.'], 4),

    exoOrdonner('e05', 2, [
      { consigne: "Une trottinette électrique ne démarre plus. Remets le protocole de dépannage dans l'ordre.", etapes: ['Décrire la panne : le moteur ne tourne pas, les voyants sont éteints', 'Vérifier que la batterie est chargée', "Vérifier que l'interrupteur laisse passer le courant", 'Mesurer la tension aux bornes du moteur', 'Remplacer le constituant défectueux', 'Vérifier que la trottinette redémarre'], note: "On suit la chaîne d'énergie : source, distribution, convertisseur." },
      { consigne: "La charnière en plastique d'un boîtier est cassée. Remets les étapes de la réparation dans l'ordre.", etapes: ['Mesurer la pièce cassée au pied à coulisse', 'Modéliser la pièce dans un logiciel', "Fabriquer la pièce à l'imprimante 3D", 'Contrôler les dimensions de la pièce obtenue', 'Monter la pièce sur le boîtier', "Vérifier que le boîtier s'ouvre et se ferme"] },
    ], ['On commence par observer ou mesurer.', 'On répare après avoir trouvé la cause.', 'On termine par une vérification.']),

    exoSituation('e06', 2, 'Quelle hypothèse faut-il tester en premier ?', [
      ['Un ventilateur de bureau ne tourne plus. Aucun voyant ne s\'allume.', "la prise ou le câble d'alimentation", 'les pales', 'le programme'],
      ['Un robot avance, mais ne s\'arrête plus devant les obstacles.', 'le capteur de distance', 'la batterie', 'les roues'],
      ['Le moteur d\'un portail tourne, mais le battant ne bouge pas.', 'la transmission : engrenages ou courroie', 'la prise électrique', 'le capteur de présence'],
      ['Une lampe à détecteur reste allumée en plein jour.', 'le capteur de luminosité', 'le câble d\'alimentation', 'le support mural'],
      ['Un aspirateur robot s\'arrête au bout de deux minutes.', 'la batterie, qui ne tient plus la charge', 'la brosse', 'la couleur du capot'],
    ], ['Quel constituant est le plus proche du symptôme ?', 'Rien ne s\'allume : cherche du côté de l\'énergie.', 'Mauvaise décision : cherche du côté de l\'information.'], "Le symptôme oriente : pas d'énergie, on teste la source ; mauvais comportement, on teste les capteurs et le programme."),

    exoDocument('e07', 2, 'Interprète des mesures de dépannage.', [
      () => {
        const u = pick([12, 24]);
        const panne = pick(['relais', 'moteur']);
        const sortieRelais = panne === 'relais' ? 0 : u;
        return {
          enonce: `Le moteur d'un store ne tourne pas. On mesure des tensions le long de la chaîne d'énergie, store commandé (données d'exercice).` + tableau([['Point de mesure', 'bornes de la batterie', 'sortie du relais', 'bornes du moteur'], ['Tension (V)', u, sortieRelais, sortieRelais]]),
          questions: [
            choix('La batterie est-elle en cause ?', `non : elle fournit bien ${u} V`, 'oui : elle est déchargée', 'on ne peut pas le savoir'),
            choix('Quel constituant est défectueux ?', panne === 'relais' ? 'le relais' : 'le moteur', panne === 'relais' ? 'le moteur' : 'le relais', 'la batterie'),
            choix('Comment valider la réparation ?', 'remplacer le constituant et vérifier que le store se déplace', 'ranger le multimètre', 'recharger la batterie'),
          ],
          correction: [`La batterie fournit <strong>${u} V</strong> : elle fonctionne.`, panne === 'relais' ? "La tension disparaît après le relais : il ne laisse pas passer l'énergie. C'est le <strong>relais</strong>." : `Le moteur reçoit bien ${u} V et ne tourne pas : c'est le <strong>moteur</strong>.`, 'Une réparation se termine par un <strong>essai de fonctionnement</strong>.'],
        };
      },
    ], ['Suis la tension de la source vers le moteur.', 'Où la tension disparaît-elle ?', 'Si le moteur est alimenté et ne tourne pas, c\'est lui.']),

    exoDocument('e08', 3, 'Choisis un matériau et un procédé.', [
      () => ({
        enonce: "On doit refabriquer le boîtier qui protège une carte électronique. Il doit être léger et ne pas conduire le courant (données d'exercice)." + MATERIAUX,
        questions: [
          choix("Quels matériaux faut-il écarter d'emblée ?", "l'aluminium et l'acier, car ils conduisent le courant", 'le bois et le plastique', 'aucun'),
          choix('Quel matériau convient le mieux ?', 'le plastique PLA : isolant et très léger', "l'acier : très résistant", "l'aluminium : léger"),
          choix('Quel procédé permet de fabriquer cette pièce sur mesure ?', "l'impression 3D", 'le pliage', 'la soudure'),
          choix('Quel assemblage choisir pour pouvoir accéder à la carte plus tard ?', 'des vis', 'de la colle', 'une soudure'),
        ],
        correction: ['Un boîtier de carte électronique ne doit pas provoquer de court-circuit : on écarte les <strong>métaux</strong>.', 'Parmi les isolants, le <strong>PLA</strong> est le plus léger.', "Le PLA se met en forme par <strong>impression 3D</strong>.", 'Un assemblage <strong>démontable</strong> permet une réparation future.'],
      }),
      () => ({
        enonce: "On doit refabriquer la patte qui fixe un garde-boue de vélo. Elle travaille en flexion et doit résister longtemps à la pluie et aux chocs (données d'exercice)." + MATERIAUX,
        questions: [
          choix('Quelle caractéristique est la plus importante ici ?', 'la résistance à la flexion', 'la conduction du courant', 'la couleur'),
          choix('Quel matériau résiste le mieux à la flexion tout en restant léger ?', "l'aluminium", 'le plastique PLA', 'le bois'),
          choix('Quel procédé permet de donner un angle à une tôle ?', 'le pliage', "l'impression 3D", 'le thermoformage'),
          choix('En fin de vie, que devient cette pièce ?', 'elle peut être recyclée', 'elle doit être jetée avec les ordures ménagères', 'elle ne peut pas être démontée'),
        ],
        correction: ['La pièce plie sous l\'effort : c\'est la <strong>flexion</strong> qui compte.', "L'<strong>aluminium</strong> a une bonne résistance pour une faible masse ; l'acier résiste mieux mais il est lourd.", 'Une tôle se met en forme par <strong>pliage</strong>.', "L'aluminium est <strong>recyclable</strong>."],
      }),
    ], ['Élimine d\'abord les matériaux qui ne respectent pas une exigence.', 'Le procédé dépend du matériau.', 'Démontable : réparable.']),

    exoDocument('e09', 3, 'Contrôle une pièce fabriquée sur mesure.', [
      () => {
        const cote = pick([24, 30, 36]), tol = pick([0.2, 0.3]), ecart = pick([0.1, 0.4, -0.1, 0.5]);
        const mesure = Math.round((cote + ecart) * 10) / 10, ok = Math.abs(ecart) <= tol + 1e-9;
        const v = (x) => String(x).replace('.', ',');
        return {
          enonce: `Une pièce imprimée en 3D doit mesurer ${cote} mm, à ${v(tol)} mm près. On la mesure au pied à coulisse : ${v(mesure)} mm (données d'exercice).`,
          questions: [
            nombre("Quelle est la plus grande longueur acceptée, en mm ?", Math.round((cote + tol) * 10) / 10),
            nombre("Quelle est la plus petite longueur acceptée, en mm ?", Math.round((cote - tol) * 10) / 10),
            choix('La pièce est-elle conforme ?', ok ? 'oui' : 'non', ok ? 'non' : 'oui', 'on ne peut pas le savoir'),
            choix(ok ? 'Que fait-on ensuite ?' : 'Que fait-on ensuite ?', ok ? 'on monte la pièce et on vérifie le fonctionnement' : 'on corrige le modèle et on refabrique la pièce', ok ? 'on refabrique la pièce' : 'on monte la pièce quand même', 'on change de machine sans chercher'),
          ],
          correction: [`$${cote} + ${v(tol).replace(',', '{,}')} = ${v(Math.round((cote + tol) * 10) / 10).replace(',', '{,}')}$ mm.`, `$${cote} - ${v(tol).replace(',', '{,}')} = ${v(Math.round((cote - tol) * 10) / 10).replace(',', '{,}')}$ mm.`, `${v(mesure)} mm est ${ok ? 'dans' : 'hors de'} l'intervalle : la pièce est <strong>${ok ? 'conforme' : 'non conforme'}</strong>.`, ok ? 'On peut la monter, puis <strong>valider</strong> par un essai.' : 'On <strong>corrige</strong> le modèle, puis on recommence.'],
        };
      },
    ], ['Ajoute puis retire la tolérance.', 'La mesure doit être entre les deux valeurs.', 'Une pièce non conforme se refait.']),
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Dans un protocole de dépannage, on teste les hypothèses :', choix: ['une par une, de la plus simple à la plus complexe', 'toutes en même temps', 'au hasard', 'seulement après avoir tout démonté'], correct: 0, explication: 'Un test à la fois permet de savoir lequel révèle la cause.' },
    { type: 'qcm', question: "L'impression 3D est un procédé :", choix: ["d'ajout de matière", "d'enlèvement de matière", 'de pliage', "d'assemblage"], correct: 0, explication: 'La pièce est construite couche par couche.' },
    { type: 'vrai_faux', question: 'Un assemblage par vis facilite les réparations.', reponse: true, explication: 'Il est démontable.' },
    { type: 'qcm', question: 'Rien ne s\'allume sur un appareil. Que vérifie-t-on en premier ?', choix: ["l'alimentation", 'le programme', 'la transmission', 'la couleur du boîtier'], correct: 0, explication: 'On suit la chaîne d\'énergie depuis la source.' },
    { type: 'vrai_faux', question: 'Après une réparation, un essai de fonctionnement est inutile.', reponse: false, explication: 'La validation est la dernière étape du protocole.' },
    { type: 'qcm', question: 'Un boîtier doit isoler une carte électronique. Quel matériau choisir ?', choix: ['un plastique', "de l'aluminium", "de l'acier", 'du cuivre'], correct: 0, explication: 'Les métaux conduisent le courant.' },
  ],
};
