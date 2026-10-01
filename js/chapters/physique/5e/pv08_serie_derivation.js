// =====================================================================
//  pv08_serie_derivation.js — Physique-chimie 5ᵉ : circuits en série et
//  en dérivation. Boucles, nœuds, branches ; lampe dévissée ; place de
//  l'interrupteur ; court-circuit d'un dipôle et du générateur.
// =====================================================================

import { pick } from '../outils.js';
import { circuitLampes, schemaMontage } from '../figures_cycle.js';

const MONTAGES = [['serie', 'en série'], ['derivation', 'en dérivation']];

export default {
  id: 'pv08',
  titre: 'Circuits en série et en dérivation',
  theme: 'pc_energie', niveau: '5e',
  icone: '🎄',

  intro:
    "Dans une vieille guirlande, une seule ampoule grillée éteint tout ; à la maison, la lampe du salon peut griller sans couper le réfrigérateur. " +
    "La différence ? La façon dont les dipôles sont branchés : <strong>en série</strong> ou <strong>en dérivation</strong>.",

  cours: [
    {
      type: 'definition', titre: 'Deux façons de brancher',
      contenu: "Des dipôles sont <strong>en série</strong> s'ils forment une <strong>seule boucle</strong> avec le générateur : le courant les traverse l'un après l'autre. Un circuit est <strong>en dérivation</strong> s'il comporte <strong>plusieurs boucles</strong>. Un <strong>nœud</strong> est un point où se rejoignent au moins trois fils. La <strong>branche principale</strong> contient le générateur ; les autres sont les <strong>branches dérivées</strong>.<br>" +
        `<div class="pc-duo"><figure>${schemaMontage('serie')}<figcaption>deux lampes en série</figcaption></figure><figure>${schemaMontage('derivation')}<figcaption>deux lampes en dérivation</figcaption></figure></div>`,
    },
    { type: 'figure', titre: 'Série ou dérivation ?', contenu: 'Change de montage, dévisse une lampe (clique dessus) ou relie ses bornes par un fil.', render: (host) => circuitLampes(host) },
    {
      type: 'propriete', titre: 'En série',
      contenu: "Si un dipôle est enlevé ou grillé, la boucle est ouverte : <strong>plus aucun dipôle ne fonctionne</strong>. L'ordre des dipôles n'a pas d'importance. Plus on ajoute de lampes en série, <strong>moins elles brillent</strong>.",
    },
    {
      type: 'propriete', titre: 'En dérivation',
      contenu: "Chaque branche forme une boucle avec le générateur : si une lampe grille, <strong>les autres continuent de fonctionner</strong>, et chaque lampe brille comme si elle était seule. Un interrupteur placé dans une branche dérivée ne commande que cette branche ; dans la branche principale, il commande tout. Les prises et les lampes d'une maison sont branchées en dérivation.",
    },
    {
      type: 'propriete', titre: 'Le court-circuit',
      contenu: "Un dipôle est <strong>court-circuité</strong> quand ses deux bornes sont reliées par un fil : le courant passe par le fil et le dipôle ne fonctionne plus. Si ce sont les bornes du <strong>générateur</strong> qui sont reliées, le courant devient très intense : les fils et le générateur chauffent, il y a un <strong>risque d'incendie</strong>. Les fusibles et disjoncteurs coupent alors le courant.",
    },
    {
      type: 'exemple', enonce: 'Dans un circuit en série (pile, lampe L1, lampe L2), on dévisse L1. Que se passe-t-il ?',
      solution_etapes: ['Le circuit n\'a qu\'une boucle ; dévisser L1 l\'ouvre.', 'Le courant ne circule plus : <strong>L2 s\'éteint aussi</strong>.'],
    },
  ],

  methode: [
    { etape: 1, titre: 'Compter les boucles', explication: 'Une seule boucle : série. Plusieurs boucles (des nœuds) : dérivation.' },
    { etape: 2, titre: 'Suivre le courant', explication: 'Depuis la borne + jusqu\'à la borne −, par chaque chemin possible.' },
    { etape: 3, titre: 'Couper un chemin', explication: 'Quels dipôles sont encore dans une boucle fermée ? Eux seuls fonctionnent.' },
    { etape: 4, titre: 'Repérer les courts-circuits', explication: 'Un fil entre les deux bornes d\'un dipôle le court-circuite.' },
  ],

  exercices: [
    {
      id: 'e01', niveau: 1, type: 'qcm', consigne: 'Quel montage ?',
      generer() {
        const [m, nom] = pick(MONTAGES), dip = pick([['lampe', 'lampe'], ['lampe', 'moteur'], ['moteur', 'lampe'], ['lampe', 'DEL']]);
        return { enonce: 'Les deux récepteurs de ce circuit sont branchés :', visuel: (h) => { h.innerHTML = schemaMontage(m, { dipoles: dip }); }, choix: ['en série', 'en dérivation'], correct: m === 'serie' ? 0 : 1, ordre_fixe: true, _v: { m, nom } };
      },
      indices: ['Cherche des nœuds (points où se rejoignent trois fils).', 'Pas de nœud : une seule boucle.', 'Des nœuds : plusieurs boucles.'],
      correction_etapes: (st) => [st._v.m === 'serie' ? 'Il n\'y a qu\'une seule boucle, sans nœud.' : 'Il y a deux nœuds et deux boucles.', `Les récepteurs sont <strong>${st._v.nom}</strong>.`],
    },
    {
      id: 'e02', niveau: 1, type: 'qcm', consigne: 'Une ampoule grille :',
      generer() {
        const [m, nom] = pick(MONTAGES);
        return { enonce: `Une guirlande comporte des ampoules branchées ${nom}. Une ampoule grille. Les autres :`, choix: ["s'éteignent toutes", 'restent allumées'], correct: m === 'serie' ? 0 : 1, ordre_fixe: true, _v: { m, nom } };
      },
      indices: ['Une ampoule grillée ne laisse plus passer le courant.', 'En série, il n\'y a qu\'une boucle.', 'En dérivation, chaque ampoule a sa propre boucle.'],
      correction_etapes: (st) => [st._v.m === 'serie' ? "La seule boucle est ouverte : le courant ne circule plus." : 'Les autres branches forment toujours une boucle avec le générateur.', st._v.m === 'serie' ? "Les autres ampoules <strong>s'éteignent</strong>." : 'Les autres ampoules <strong>restent allumées</strong>.'],
    },
    {
      id: 'e03', niveau: 1, type: 'qcm', consigne: 'Compte les boucles :',
      generer() {
        const [m] = pick(MONTAGES);
        return { enonce: 'Combien de boucles contenant le générateur ce circuit comporte-t-il ?', visuel: (h) => { h.innerHTML = schemaMontage(m); }, choix: ['1', '2', '3'], correct: m === 'serie' ? 0 : 1, ordre_fixe: true, _v: { m } };
      },
      indices: ['Pars de la pile et fais le tour.', 'À chaque nœud, le chemin peut se séparer.', 'Compte les chemins différents qui reviennent à la pile.'],
      correction_etapes: (st) => [st._v.m === 'serie' ? 'Un seul chemin : <strong>1 boucle</strong> (circuit en série).' : 'Au nœud, deux chemins sont possibles : <strong>2 boucles</strong> (circuit en dérivation).'],
    },
    {
      id: 'e04', niveau: 2, type: 'qcm', consigne: 'Un fil de trop :',
      generer() {
        return { enonce: 'Dans un circuit en série (pile, lampe L1, lampe L2), on relie les deux bornes de L2 par un fil. Que se passe-t-il ?', choix: ["L2 s'éteint et L1 brille davantage", "les deux lampes s'éteignent", 'rien ne change', 'L2 brille davantage'], correct: 0, _v: {} };
      },
      indices: ['Le fil offre un chemin plus facile que la lampe.', 'L2 est court-circuitée.', 'Il ne reste plus qu\'une lampe dans la boucle.'],
      correction_etapes: () => ['L2 est <strong>court-circuitée</strong> : le courant passe par le fil, L2 s\'éteint.', 'L1 est seule dans la boucle : elle brille davantage.'],
    },
    {
      id: 'e05', niveau: 2, type: 'qcm', consigne: 'Court-circuit du générateur :',
      generer() {
        return { enonce: 'On relie directement les deux bornes d\'une pile par un fil. Pourquoi est-ce dangereux ?', choix: ['le courant devient très intense : la pile et le fil chauffent, risque d\'incendie', 'la pile se recharge trop', 'le courant s\'arrête brusquement', 'ce n\'est pas dangereux'], correct: 0, _v: {} };
      },
      indices: ['Il n\'y a plus aucun récepteur dans la boucle.', 'Rien ne limite le courant.', 'Un courant intense fait chauffer les fils.'],
      correction_etapes: () => ['C\'est un <strong>court-circuit du générateur</strong>.', 'Le courant devient très intense, les fils et la pile chauffent : risque de brûlure ou d\'incendie.'],
    },
    {
      id: 'e06', niveau: 2, type: 'qcm', consigne: 'Allumer séparément :',
      generer() {
        return { enonce: 'On veut pouvoir allumer la lampe du bureau sans allumer celle du plafond, avec une seule pile. Comment brancher les lampes ?', choix: ['en dérivation, avec un interrupteur dans chaque branche', 'en série, avec un seul interrupteur', 'en série, avec deux interrupteurs', 'en dérivation, avec un interrupteur dans la branche principale'], correct: 0, _v: {} };
      },
      indices: ['En série, une coupure éteint tout.', 'En dérivation, chaque branche a sa boucle.', 'L\'interrupteur doit être dans la branche qu\'il commande.'],
      correction_etapes: () => ['En <strong>dérivation</strong>, chaque lampe a sa propre boucle.', 'Un interrupteur dans chaque branche commande sa lampe seulement.'],
    },
    {
      id: 'e07', niveau: 3, type: 'qcm', consigne: "La place de l'interrupteur :",
      generer() {
        const ou = pick(['principale', 'L1']);
        return {
          enonce: `Deux lampes L1 et L2 sont en dérivation. L'interrupteur est placé dans ${ou === 'principale' ? 'la branche principale (celle de la pile)' : 'la branche de L1'}. On l'ouvre :`,
          choix: ["L1 et L2 s'éteignent", "seule L1 s'éteint", "seule L2 s'éteint", 'rien ne change'], correct: ou === 'principale' ? 0 : 1, ordre_fixe: true, _v: { ou },
        };
      },
      indices: ['Quelles boucles passent par l\'interrupteur ?', 'La branche principale fait partie de toutes les boucles.', 'Une branche dérivée ne concerne que sa lampe.'],
      correction_etapes: (st) => [st._v.ou === 'principale' ? 'La branche principale fait partie des deux boucles : les deux sont ouvertes.' : 'Seule la boucle de L1 est ouverte ; celle de L2 reste fermée.', st._v.ou === 'principale' ? "<strong>L1 et L2 s'éteignent.</strong>" : "<strong>Seule L1 s'éteint.</strong>"],
    },
    {
      id: 'e08', niveau: 3, type: 'qcm', consigne: 'Plus de lampes en série :',
      generer() {
        const n = pick([3, 4]);
        return { enonce: `On passe de 2 à ${n} lampes identiques branchées en série sur la même pile. Les lampes :`, choix: ['brillent moins', 'brillent davantage', 'brillent pareil', "s'éteignent toutes"], correct: 0, ordre_fixe: true, _v: { n } };
      },
      indices: ['Le même courant traverse toutes les lampes.', 'Chaque lampe ajoutée « freine » un peu plus le courant.', 'En dérivation, ce serait différent.'],
      correction_etapes: (st) => [`Avec ${st._v.n} lampes en série, le courant est plus faible dans toute la boucle.`, 'Les lampes <strong>brillent moins</strong>.'],
    },
    {
      id: 'e09', niveau: 3, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
      generer() {
        return pick([
          { enonce: 'Dans une maison, les appareils électriques sont branchés en série.', reponse: false, _v: { e: 'Non : en dérivation, pour qu\'ils fonctionnent indépendamment.' } },
          { enonce: "Dans un circuit en série, l'ordre des dipôles n'a pas d'importance.", reponse: true, _v: { e: 'Oui : le même courant les traverse tous.' } },
          { enonce: 'Un nœud relie au moins trois fils.', reponse: true, _v: { e: 'Oui : c\'est là que le courant se partage ou se rejoint.' } },
          { enonce: "Un circuit en série comporte plusieurs boucles.", reponse: false, _v: { e: 'Non : une seule boucle. Plusieurs boucles : dérivation.' } },
          { enonce: 'Un disjoncteur protège une installation contre les courts-circuits.', reponse: true, _v: { e: 'Oui : il coupe le courant quand il devient trop intense.' } },
        ]);
      },
      indices: ['Série : une boucle. Dérivation : plusieurs.', 'À la maison, chaque appareil fonctionne seul.', 'Court-circuit : courant très intense.'],
      correction_detaillee: (st) => `<p>${st._v.e}</p>`,
    },
  ],

  quiz_bilan: [
    { type: 'qcm', question: 'Un circuit à une seule boucle est un circuit :', choix: ['en série', 'en dérivation', 'ouvert', 'en court-circuit'], correct: 0, explication: 'Plusieurs boucles : dérivation.' },
    { type: 'qcm', question: 'Dans un circuit en dérivation, si une lampe grille, les autres :', choix: ['restent allumées', "s'éteignent", 'grillent aussi', 'clignotent'], correct: 0, explication: 'Chacune a sa propre boucle.' },
    { type: 'vrai_faux', question: 'Relier les deux bornes d\'une pile par un fil est dangereux.', reponse: true, explication: "C'est un court-circuit du générateur : risque d'échauffement." },
    { type: 'qcm', question: 'Un dipôle court-circuité :', choix: ['ne fonctionne plus', 'fonctionne mieux', 'explose toujours', 'devient un générateur'], correct: 0, explication: 'Le courant passe par le fil au lieu de le traverser.' },
    { type: 'qcm', question: 'Les prises d\'une maison sont branchées :', choix: ['en dérivation', 'en série', 'en court-circuit', 'sans fil'], correct: 0, explication: 'Chaque appareil fonctionne indépendamment.' },
  ],
};
