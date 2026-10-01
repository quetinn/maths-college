// =====================================================================
//  pv07_circuit.js — Physique-chimie 5ᵉ : le circuit électrique.
//  Générateur, récepteurs, dipôles et symboles normalisés, circuit
//  ouvert / fermé, conducteurs et isolants, sens du courant, DEL,
//  sécurité électrique.
// =====================================================================

import { pick, melanger } from '../outils.js';
import { circuitSimple, schemaSymbole, SYMBOLES, MATERIAUX_TEST } from '../figures_cycle.js';

const ROLES = [
  ['une pile', 'générateur'], ['une batterie de téléphone', 'générateur'], ['une dynamo de vélo', 'générateur'], ['un panneau solaire', 'générateur'],
  ['une lampe', 'récepteur'], ['un moteur', 'récepteur'], ['une DEL', 'récepteur'], ['une sonnerie', 'récepteur'], ['un radiateur électrique', 'récepteur'],
];

export default {
  id: 'pv07',
  titre: 'Le circuit électrique',
  theme: 'pc_energie', niveau: '5e',
  icone: '💡',

  intro:
    "Une lampe de poche, un jouet à moteur, une guirlande : dans chacun, un courant électrique circule dans une boucle. " +
    "Ce chapitre explique ce qu'est un <strong>circuit électrique</strong>, comment le <strong>schématiser</strong> avec des symboles, et pourquoi certains matériaux laissent passer le courant et d'autres non.",

  cours: [
    {
      type: 'definition', titre: 'Les éléments du circuit',
      contenu: "Un circuit électrique comporte un <strong>générateur</strong> (pile, batterie, prise du secteur) qui fournit l'énergie électrique, des <strong>récepteurs</strong> (lampe, moteur, DEL, sonnerie) qui la convertissent, des <strong>fils de connexion</strong> et souvent un <strong>interrupteur</strong>. Chacun de ces éléments possède deux bornes : c'est un <strong>dipôle</strong>.",
    },
    {
      type: 'propriete', titre: 'Circuit ouvert, circuit fermé',
      contenu: "Le courant ne circule que si les dipôles forment une <strong>boucle fermée</strong> et ininterrompue, reliée aux deux bornes du générateur. Si la boucle est coupée (interrupteur ouvert, fil débranché, lampe dévissée), le circuit est <strong>ouvert</strong> : aucun courant ne circule.",
    },
    {
      type: 'definition', titre: 'Les symboles normalisés',
      contenu: "Pour schématiser un circuit, on utilise des <strong>symboles</strong> reconnus dans le monde entier, reliés par des traits droits (les fils) :<div class=\"pc-symboles\">" +
        ['pile', 'lampe', 'interrupteur ouvert', 'interrupteur fermé', 'moteur', 'DEL'].map((n) => `<figure>${schemaSymbole(n)}<figcaption>${n}</figcaption></figure>`).join('') + '</div>',
    },
    { type: 'figure', titre: 'Conducteur ou isolant ?', contenu: "Ferme l'interrupteur, puis place différents objets entre les pinces.", render: (host) => circuitSimple(host) },
    {
      type: 'propriete', titre: 'Conducteurs et isolants',
      contenu: "Un <strong>conducteur</strong> laisse passer le courant : les métaux (cuivre, fer, aluminium), le graphite, l'eau salée… et le <strong>corps humain</strong>. Un <strong>isolant</strong> ne le laisse pas passer : plastique, bois, verre, caoutchouc, air sec. Les fils électriques sont en cuivre (conducteur) entouré de plastique (isolant).",
    },
    {
      type: 'propriete', titre: 'Le sens du courant',
      contenu: "Par convention, à l'extérieur du générateur, le courant circule de la borne <strong>+</strong> vers la borne <strong>−</strong>. Une <strong>DEL</strong> (diode électroluminescente) ne laisse passer le courant que dans un sens : branchée à l'envers, elle ne s'allume pas.",
    },
    {
      type: 'propriete', titre: 'Danger : le secteur',
      contenu: "Les piles de collège (4,5 V) sont sans danger. Mais la tension du secteur (<strong>230 V</strong>) est <strong>mortelle</strong> : le corps humain est conducteur, surtout mouillé. Ne jamais toucher une prise, un fil dénudé, ni utiliser un appareil électrique près de l'eau.",
    },
  ],

  methode: [
    { etape: 1, titre: 'Suivre la boucle', explication: 'Pars de la borne + du générateur et suis les fils jusqu\'à la borne −.' },
    { etape: 2, titre: 'Chercher une coupure', explication: 'Interrupteur ouvert, isolant, lampe dévissée : le circuit est ouvert.' },
    { etape: 3, titre: 'Schématiser', explication: 'Symboles normalisés, fils en traits droits, circuit en forme de rectangle.' },
    { etape: 4, titre: 'Conclure', explication: 'Boucle fermée par des conducteurs : le courant circule.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Quel est ce symbole ?',
      generer() {
        const nom = pick(SYMBOLES.filter((s) => s !== 'voltmètre'));
        const autres = melanger(SYMBOLES.filter((s) => s !== nom && s !== 'voltmètre')).slice(0, 3);
        return { enonce: 'Quel dipôle ce symbole représente-t-il ?', visuel: (h) => { h.innerHTML = schemaSymbole(nom); }, choix: [nom, ...autres], correct: 0, _v: { nom } };
      },
      indices: ['Une lettre dans un cercle : un appareil (M pour moteur, A pour ampèremètre).', 'Un cercle barré d\'une croix : une lampe.', 'Deux traits parallèles inégaux : une pile.'],
      correction_etapes: (st) => [`C'est le symbole d'${/^[aeiouyé]/i.test(st._v.nom) ? 'un ' : st._v.nom === 'pile' || st._v.nom === 'lampe' || st._v.nom === 'DEL' || st._v.nom === 'résistance' ? 'une ' : 'un '}<strong>${st._v.nom}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Conducteur ou isolant ?',
      generer() {
        const [nom, cond] = pick(MATERIAUX_TEST.filter((m) => m[2] !== 'air'));
        return { enonce: `On place ${nom} entre les pinces d'un circuit fermé comportant une lampe. ${nom[0].toUpperCase() + nom.slice(1)} est :`, choix: ['un conducteur : la lampe brille', 'un isolant : la lampe reste éteinte'], correct: cond ? 0 : 1, ordre_fixe: true, _v: { nom, cond } };
      },
      indices: ['Les métaux sont conducteurs.', 'Le graphite (mine de crayon) aussi.', 'Plastique, bois, verre, caoutchouc sont isolants.'],
      correction_etapes: (st) => [`${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} est un <strong>${st._v.cond ? 'conducteur' : 'isolant'}</strong>.`, st._v.cond ? 'Le courant circule : la lampe brille.' : 'Le courant ne passe pas : la lampe reste éteinte.'],
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'La lampe brille-t-elle ?',
      generer() {
        const s = pick([
          ['Une pile, une lampe et un interrupteur fermé forment une boucle.', true, 'la boucle est fermée'],
          ['Une pile, une lampe et un interrupteur ouvert forment une boucle.', false, "l'interrupteur ouvert coupe la boucle"],
          ['Une lampe est reliée à une seule borne de la pile par deux fils.', false, 'la lampe doit être reliée aux deux bornes de la pile'],
          ['Une pile et une lampe forment une boucle, mais la lampe est dévissée.', false, 'la lampe dévissée ouvre le circuit'],
          ['Une pile et une lampe forment une boucle, avec une règle en plastique à la place d\'un fil.', false, 'le plastique est isolant'],
          ['Une pile et une lampe forment une boucle, avec un clou en fer à la place d\'un fil.', true, 'le fer est conducteur, la boucle reste fermée'],
        ]);
        return { enonce: s[0], choix: ['oui', 'non'], correct: s[1] ? 0 : 1, ordre_fixe: true, _v: { s } };
      },
      indices: ['Le courant a besoin d\'une boucle fermée.', 'La boucle doit passer par les deux bornes du générateur.', 'Un isolant coupe la boucle.'],
      correction_etapes: (st) => [`${st._v.s[1] ? 'Oui' : 'Non'} : ${st._v.s[2]}.`],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Générateur ou récepteur ?',
      generer() {
        const [nom, role] = pick(ROLES);
        return { enonce: `Dans un circuit, ${nom} joue le rôle :`, choix: ['de générateur', 'de récepteur'], correct: role === 'générateur' ? 0 : 1, ordre_fixe: true, _v: { nom, role } };
      },
      indices: ['Le générateur fournit l\'énergie électrique.', 'Le récepteur la reçoit et la convertit (lumière, mouvement, son…).', 'Une dynamo fabrique du courant quand on la fait tourner.'],
      correction_etapes: (st) => [st._v.role === 'générateur' ? `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} fournit de l'énergie électrique au circuit.` : `${st._v.nom[0].toUpperCase() + st._v.nom.slice(1)} reçoit de l'énergie électrique et la convertit.`, `C'est un <strong>${st._v.role}</strong>.`],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'La DEL :',
      generer() {
        const s = pick([
          ['Une DEL brille dans un circuit. On la retourne (on inverse ses bornes). Que se passe-t-il ?', 0],
          ['Une DEL ne brille pas dans un circuit fermé dont la pile est neuve. Quelle est l\'explication la plus probable ?', 1],
        ]);
        const choix = s[1] === 0 ? ["elle s'éteint : la DEL ne laisse passer le courant que dans un sens", 'elle brille davantage', 'elle brille pareil', 'la pile se décharge'] : ['elle est branchée dans le mauvais sens', 'la pile est trop puissante', 'le courant va trop vite', 'les fils sont trop courts'];
        return { enonce: s[0], choix, correct: 0, _v: { k: s[1] } };
      },
      indices: ['Une DEL est une diode.', 'Une diode ne laisse passer le courant que dans un sens.', 'On dit qu\'elle a un sens « passant » et un sens « bloquant ».'],
      correction_etapes: (st) => [st._v.k === 0 ? 'Branchée dans le sens bloquant, la DEL ne laisse pas passer le courant : elle s\'éteint.' : 'Si la DEL est branchée dans le sens bloquant, le courant ne passe pas : il faut la retourner.'],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'Le sens du courant :',
      generer() {
        return { enonce: "Par convention, à l'extérieur du générateur, le courant électrique circule :", choix: ['de la borne + vers la borne −', 'de la borne − vers la borne +', 'dans les deux sens à la fois', 'seulement dans la lampe'], correct: 0, _v: {} };
      },
      indices: ['C\'est une convention choisie au XIXᵉ siècle.', 'On part du + du générateur.', 'On arrive au − du générateur.'],
      correction_etapes: () => ['À l\'extérieur du générateur, le courant va de la borne <strong>+</strong> vers la borne <strong>−</strong>.', '(Les électrons, eux, circulent en sens inverse.)'],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: 'Sécurité électrique :',
      generer() {
        const q = pick([
          ["Pourquoi est-il dangereux de toucher une prise de courant avec les doigts mouillés ?", ['le corps humain est conducteur, et encore plus mouillé : le courant du secteur peut le traverser', "l'eau rouille la prise", 'la prise est trop chaude', 'le courant ne passe que dans l\'eau salée']],
          ['Pourquoi les fils électriques sont-ils entourés de plastique ?', ['le plastique est isolant : il empêche le courant de passer dans la personne qui touche le fil', 'pour que le courant aille plus vite', 'pour les décorer', 'le plastique est conducteur']],
          ['Avec quelle tension peut-on faire des expériences en classe sans danger ?', ['4,5 V (une pile plate)', '230 V (le secteur)', '400 V', '20 000 V']],
        ]);
        return { enonce: q[0], choix: q[1], correct: 0, _v: { q } };
      },
      indices: ['Le corps humain conduit le courant.', 'La tension du secteur (230 V) est mortelle.', 'Un isolant protège.'],
      correction_etapes: (st) => [`${st._v.q[1][0][0].toUpperCase() + st._v.q[1][0].slice(1)}.`],
    },
    {
      id: 'e08', niveau: 3, type: 'ordonner_etapes', consigne: 'Réaliser un circuit en sécurité :',
      generer() {
        return {
          etapes: [
            'Dessiner le schéma du circuit avec les symboles normalisés',
            "Vérifier que l'interrupteur est ouvert",
            "Relier la borne + de la pile à l'interrupteur",
            "Relier l'interrupteur à la lampe",
            'Relier la lampe à la borne − de la pile',
            "Fermer l'interrupteur pour allumer la lampe",
          ],
        };
      },
      indices: ['On commence par le schéma.', 'On câble circuit ouvert, par sécurité.', 'On suit la boucle depuis la borne +.'],
      correction_detaillee: (st) => `<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: "L'air est un conducteur.", reponse: false, _v: { e: "Non : l'air sec est isolant. C'est pour cela qu'un interrupteur ouvert coupe le courant." } },
          { enonce: 'Une lampe a deux bornes : c\'est un dipôle.', reponse: true, _v: { e: 'Oui, comme la pile, le moteur, l\'interrupteur…' } },
          { enonce: 'Le corps humain est isolant.', reponse: false, _v: { e: 'Non : il est conducteur. C\'est ce qui rend le secteur dangereux.' } },
          { enonce: "Si l'on dévisse la lampe d'un circuit en boucle, le courant ne circule plus.", reponse: true, _v: { e: 'Oui : la boucle est ouverte.' } },
          { enonce: 'La mine d\'un crayon (graphite) conduit le courant.', reponse: true, _v: { e: 'Oui : le graphite est un conducteur, même si ce n\'est pas un métal.' } },
        ]);
      },
      indices: ['Un dipôle a deux bornes.', 'Métaux et graphite conduisent ; plastique, bois, verre, air non.', 'Circuit ouvert : pas de courant.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Pour que le courant circule, il faut :', choix: ['une boucle fermée reliée aux deux bornes du générateur', 'un seul fil', 'un interrupteur ouvert', 'des fils en plastique'], correct: 0, explication: 'Toute coupure ouvre le circuit.' },
    { type: 'qcm', question: 'Lequel de ces matériaux est isolant ?', choix: ['le plastique', 'le cuivre', 'le fer', 'le graphite'], correct: 0, explication: 'Plastique, bois, verre, caoutchouc sont isolants.' },
    { type: 'qcm', question: 'Une pile est :', choix: ['un générateur', 'un récepteur', 'un isolant', 'un interrupteur'], correct: 0, explication: 'Elle fournit l\'énergie électrique.' },
    { type: 'vrai_faux', question: 'Une DEL branchée à l\'envers ne s\'allume pas.', reponse: true, explication: 'Elle ne laisse passer le courant que dans un sens.' },
    { type: 'qcm', question: 'Le symbole d\'une lampe est :', choix: ['un cercle barré d\'une croix', 'un cercle avec un M', 'deux traits parallèles', 'un rectangle'], correct: 0, explication: 'M : moteur ; deux traits : pile ; rectangle : résistance.' },
  ],
};
