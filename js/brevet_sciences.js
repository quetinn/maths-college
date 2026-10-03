// =====================================================================
//  brevet_sciences.js — Problèmes type Brevet, partie physique-chimie
//  de l'épreuve de sciences (10 points, 30 minutes au DNB depuis 2027).
//
//  Même schéma que brevet.js, avec deux possibilités en plus pour une
//  question :
//    - validation: 'grandeur' + unite (+ pieges, tolerance) : la réponse
//      s'écrit avec son unité, les conversions sont acceptées ;
//    - choix: [...] + correct : question à choix (cases à cocher).
//  Chaque problème est génératif : valeurs tirées au hasard, cohérentes.
// =====================================================================

import { pick } from './engine.js';
import { arrondi, dec } from './chapters/commun.js';
import { schemaCircuit, schemaChrono, schemaPH } from './chapters/physique/figures.js';
import { schemaMontage } from './chapters/physique/figures_cycle.js';
import { schemaMolecule } from './chapters/physique/figures_chimie.js';

const t = (x, n = 4) => dec(arrondi(x, n)).replace(',', '{,}');
const g = (reponse, unite, extra = {}) => ({ validation: 'grandeur', reponse, unite, placeholder: `valeur et unité (${unite})`, ...extra });

// ---------------------------------------------------------------------
//  1. Le trajet à vélo électrique — vitesse, énergie cinétique
// ---------------------------------------------------------------------
const P_VELO = {
  id: 'bs_velo', titre: 'Le vélo à assistance électrique', domaine: 'Mouvement et énergie', chapitres: ['p05', 'p08'], dureeMin: 12,
  generer() {
    const v = pick([18, 21.6, 25.2]), min = pick([10, 20, 30]), m = pick([80, 90, 100]);
    const d = arrondi((v * min) / 60, 2), vms = v / 3.6, Ec = 0.5 * m * vms * vms;
    return {
      contexte: `<p>Léa se rend au collège avec un vélo à assistance électrique. Elle roule à vitesse constante sur une route droite et parcourt <strong>${dec(d)} km en ${min} min</strong>. La masse de Léa et de son vélo est de <strong>${m} kg</strong>.</p>`,
      figure: (h) => { h.innerHTML = schemaChrono([0, 50, 100, 150, 200, 250, 300], { etiquette: false }); },
      questions: [
        { enonce: '<p><strong>1.</strong> La figure montre les positions du vélo à intervalles de temps égaux. Comment qualifier son mouvement ?</p>', points: 2, choix: ['rectiligne uniforme', 'rectiligne accéléré', 'rectiligne ralenti', 'circulaire uniforme'], correct: 0, corrige: '<p>Trajectoire droite et positions régulièrement espacées : mouvement <strong>rectiligne uniforme</strong>.</p>' },
        { enonce: '<p><strong>2.</strong> Calcule la vitesse moyenne de Léa en km/h.</p>', points: 3, ...g(v, 'km/h', { tolerance: 0.15, pieges: [{ valeur: arrondi(d / min, 3), message: 'Convertis la durée en heures avant de diviser.' }] }), indice: `${min} min = ${dec(min / 60, 3)} h.`, corrige: `<p>$t = ${min} \\div 60 = ${t(min / 60, 3)}$ h, donc $v = \\dfrac{d}{t} = \\dfrac{${t(d)}}{${t(min / 60, 3)}} = ${t(v)}$ km/h.</p>` },
        { enonce: '<p><strong>3.</strong> Convertis cette vitesse en m/s.</p>', points: 2, ...g(arrondi(vms, 2), 'm/s', { tolerance: 0.06, uniteImposee: true }), indice: 'On divise par 3,6.', corrige: `<p>$${t(v)} \\div 3{,}6 = ${t(vms, 2)}$ m/s.</p>` },
        { enonce: "<p><strong>4.</strong> Calcule l'énergie cinétique de Léa et de son vélo.</p>", points: 4, ...g(arrondi(Ec, 0), 'J', { tolerance: Ec * 0.03, pieges: [{ valeur: arrondi(0.5 * m * vms, 0), message: "N'oublie pas d'élever la vitesse au carré." }, { valeur: arrondi(0.5 * m * v * v, 0), message: 'La vitesse doit être en m/s, pas en km/h.' }] }), indice: '$E_c = \\dfrac{1}{2} \\times m \\times v^2$, avec $v$ en m/s.', corrige: `<p>$E_c = 0{,}5 \\times ${m} \\times ${t(vms, 2)}^2 \\approx ${t(Ec, 0)}$ J.</p>` },
        { enonce: '<p><strong>5.</strong> Léa freine jusqu\'à l\'arrêt. Que devient son énergie cinétique ?</p>', points: 2, choix: ["elle est convertie en énergie thermique dans les freins", 'elle disparaît', 'elle est convertie en énergie nucléaire', 'elle retourne dans la batterie en totalité'], correct: 0, corrige: "<p>L'énergie se conserve : elle est convertie en énergie <strong>thermique</strong> (les freins chauffent).</p>" },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  2. La bouilloire — puissance, énergie, coût, intensité
// ---------------------------------------------------------------------
const P_BOUILLOIRE = {
  id: 'bs_bouilloire', titre: 'La bouilloire électrique', domaine: 'Énergie électrique', chapitres: ['p10', 'p09'], dureeMin: 12,
  generer() {
    const P = pick([1800, 2000, 2200, 2400]), min = pick([3, 6]), j = pick([2, 4, 5]), prix = 0.2;
    const I = P / 230, EJ = P * min * 60, EkWh = (P / 1000) * (min / 60) * j * 365;
    return {
      contexte: `<p>La plaque signalétique d'une bouilloire indique : <strong>230 V – ${P} W</strong>. Elle met <strong>${min} min</strong> à faire bouillir un litre d'eau, et on l'utilise <strong>${j} fois par jour</strong>. Le kilowattheure est facturé <strong>${dec(prix)} €</strong>.</p>`,
      questions: [
        { enonce: `<p><strong>1.</strong> Que représente la valeur « ${P} W » ?</p>`, points: 1, choix: ['la puissance nominale', 'la tension nominale', "l'intensité", "l'énergie consommée"], correct: 0, corrige: '<p>Le watt est l\'unité de <strong>puissance</strong>.</p>' },
        { enonce: "<p><strong>2.</strong> Calcule l'intensité du courant qui traverse la bouilloire.</p>", points: 3, ...g(arrondi(I, 2), 'A', { tolerance: 0.1, pieges: [{ valeur: P * 230, message: 'P = U × I, donc I = P ÷ U.' }] }), indice: '$P = U \\times I$.', corrige: `<p>$I = \\dfrac{P}{U} = \\dfrac{${P}}{230} \\approx ${t(I, 2)}$ A.</p>` },
        { enonce: `<p><strong>3.</strong> Calcule l'énergie consommée pendant une utilisation de ${min} min, en joules.</p>`, points: 3, ...g(EJ, 'J', { tolerance: EJ * 0.01, pieges: [{ valeur: P * min, message: 'La durée doit être en secondes.' }] }), indice: `$E = P \\times t$ avec $t$ en secondes (${min} min = ${min * 60} s).`, corrige: `<p>$E = ${P} \\times ${min * 60} = ${dec(EJ)}$ J.</p>` },
        { enonce: "<p><strong>4.</strong> Calcule l'énergie consommée en une année (365 jours), en kWh.</p>", points: 3, ...g(arrondi(EkWh, 1), 'kWh', { tolerance: EkWh * 0.02 }), indice: `Puissance en kW (${dec(P / 1000)} kW), durée en heures (${min} min = ${dec(min / 60, 3)} h par utilisation).`, corrige: `<p>Durée annuelle : $${j} \\times 365 \\times ${t(min / 60, 3)} = ${t((j * 365 * min) / 60, 1)}$ h. $E = ${t(P / 1000)} \\times ${t((j * 365 * min) / 60, 1)} \\approx ${t(EkWh, 1)}$ kWh.</p>` },
        { enonce: '<p><strong>5.</strong> Quel est le coût annuel correspondant, en euros ?</p>', points: 2, validation: 'nombre', reponse: arrondi(EkWh * prix, 2), tolerance: EkWh * prix * 0.03, unite: '€', corrige: `<p>$${t(EkWh, 1)} \\times ${t(prix)} \\approx ${t(EkWh * prix, 2)}$ €.</p>` },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  3. Le rover sur Mars — poids et masse
// ---------------------------------------------------------------------
const P_MARS = {
  id: 'bs_mars', titre: 'Un rover sur Mars', domaine: 'Mouvement et interactions', chapitres: ['p07', 'p06'], dureeMin: 10,
  generer() {
    const m = pick([900, 1025, 1100]), gT = 9.8, gM = 3.7, ech = 2000;
    const PT = m * gT, PM = m * gM;
    return {
      contexte: `<p>Un rover d'exploration de masse <strong>${m} kg</strong> est envoyé sur Mars. Intensité de la pesanteur : <strong>${dec(gT)} N/kg sur Terre</strong>, <strong>${dec(gM)} N/kg sur Mars</strong>.</p>`,
      questions: [
        { enonce: '<p><strong>1.</strong> Quelle est la masse du rover sur Mars ?</p>', points: 2, ...g(m, 'kg', { pieges: [{ valeur: arrondi(m * gM / gT, 0), message: 'La masse ne dépend pas du lieu.' }] }), corrige: `<p>La masse ne change pas : <strong>${m} kg</strong>.</p>` },
        { enonce: '<p><strong>2.</strong> Calcule le poids du rover sur Terre.</p>', points: 3, ...g(arrondi(PT, 0), 'N', { tolerance: PT * 0.01, pieges: [{ valeur: arrondi(m / gT, 1), message: 'P = m × g : on multiplie.' }] }), indice: '$P = m \\times g$.', corrige: `<p>$P = ${m} \\times ${t(gT)} = ${t(PT, 0)}$ N.</p>` },
        { enonce: '<p><strong>3.</strong> Calcule son poids sur Mars.</p>', points: 3, ...g(arrondi(PM, 0), 'N', { tolerance: PM * 0.01 }), corrige: `<p>$P = ${m} \\times ${t(gM)} = ${t(PM, 0)}$ N.</p>` },
        { enonce: `<p><strong>4.</strong> On représente le poids sur Mars par une flèche, à l'échelle 1 cm ↔ ${ech} N. Quelle longueur doit-elle avoir ? (arrondi au dixième)</p>`, points: 2, ...g(arrondi(PM / ech, 1), 'cm', { tolerance: 0.1 }), corrige: `<p>$${t(PM, 0)} \\div ${ech} \\approx ${t(PM / ech, 1)}$ cm, verticale, vers le bas (vers le centre de Mars).</p>` },
        { enonce: '<p><strong>5.</strong> Le poids du rover sur Mars est une action :</p>', points: 2, choix: ['à distance, exercée par Mars', 'de contact, exercée par le sol', 'à distance, exercée par la Terre', 'de contact, exercée par l\'air'], correct: 0, corrige: '<p>Le poids est l\'action <strong>à distance</strong> exercée par l\'astre sur l\'objet.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  4. Le détartrant — acides, pH, ions
// ---------------------------------------------------------------------
const P_DETARTRANT = {
  id: 'bs_detartrant', titre: 'Un détartrant pour cafetière', domaine: 'Matière', chapitres: ['p03', 'p02'], dureeMin: 10,
  generer() {
    const pH = pick([1, 2, 3]), V = pick([50, 100, 200]), m0 = arrondi(pick([182.4, 205.8, 231.5]), 1), dm = arrondi(pick([0.6, 0.9, 1.3]), 1);
    return {
      contexte: `<p>Un détartrant contient de l'acide. On mesure son pH : <strong>${pH}</strong>. Pour l'étudier, on verse ${V} mL de détartrant sur un morceau de calcaire dans un bécher posé sur une balance : une effervescence apparaît. La balance indique <strong>${dec(m0)} g</strong> au début et <strong>${dec(arrondi(m0 - dm, 1))} g</strong> à la fin.</p>`,
      figure: (h) => { h.innerHTML = schemaPH(pH); },
      questions: [
        { enonce: '<p><strong>1.</strong> Le détartrant est une solution :</p>', points: 2, choix: ['acide', 'neutre', 'basique'], correct: 0, fixe: true, corrige: `<p>pH = ${pH} < 7 : solution <strong>acide</strong>.</p>` },
        { enonce: '<p><strong>2.</strong> Quel ion est responsable de l\'acidité ?</p>', points: 2, choix: ["l'ion hydrogène H⁺", "l'ion hydroxyde HO⁻", "l'ion chlorure Cl⁻", "l'ion sodium Na⁺"], correct: 0, corrige: '<p>Une solution acide contient plus d\'ions <strong>H⁺</strong> que d\'ions HO⁻.</p>' },
        { enonce: "<p><strong>3.</strong> Le gaz de l'effervescence trouble l'eau de chaux. De quel gaz s'agit-il ?</p>", points: 2, choix: ['le dioxyde de carbone', 'le dioxygène', 'le dihydrogène', "la vapeur d'eau"], correct: 0, corrige: "<p>L'eau de chaux se trouble en présence de <strong>dioxyde de carbone</strong>.</p>" },
        { enonce: '<p><strong>4.</strong> Quelle masse de gaz s\'est échappée ?</p>', points: 3, ...g(dm, 'g', { tolerance: 0.01 }), indice: 'La masse totale se conserve.', corrige: `<p>$${t(m0)} - ${t(m0 - dm)} = ${t(dm)}$ g : c'est la masse du gaz parti.</p>` },
        { enonce: '<p><strong>5.</strong> On dilue le détartrant dans beaucoup d\'eau. Son pH :</p>', points: 2, choix: ['augmente en restant inférieur à 7', 'diminue', 'devient supérieur à 7', 'ne change pas'], correct: 0, corrige: '<p>La dilution rapproche le pH de 7 sans le dépasser.</p>' },
        { enonce: '<p><strong>6.</strong> Quelle protection est indispensable pour manipuler ce produit ?</p>', points: 1, choix: ['des lunettes et des gants', 'un casque antibruit', 'aucune', 'un masque de plongée'], correct: 0, corrige: '<p>Un acide concentré est corrosif : lunettes et gants.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  5. Le skatepark — conservation de l'énergie
// ---------------------------------------------------------------------
const P_SKATE = {
  id: 'bs_skate', titre: 'Dans la rampe du skatepark', domaine: 'Énergie', chapitres: ['p08'], dureeMin: 10,
  generer() {
    const m = pick([50, 60, 70]), v = pick([4, 5, 6]), Ec = 0.5 * m * v * v, pertes = pick([10, 20]);
    return {
      contexte: `<p>Un skateur de masse <strong>${m} kg</strong> (avec sa planche) s'élance du haut d'une rampe, sans vitesse. En bas de la rampe, sa vitesse est de <strong>${v} m/s</strong>.</p>`,
      questions: [
        { enonce: "<p><strong>1.</strong> En haut de la rampe, immobile, le skateur possède surtout de l'énergie :</p>", points: 2, choix: ['de position', 'cinétique', 'électrique', 'lumineuse'], correct: 0, corrige: "<p>Il est en hauteur et immobile : énergie <strong>de position</strong>.</p>" },
        { enonce: '<p><strong>2.</strong> Calcule son énergie cinétique en bas de la rampe.</p>', points: 4, ...g(Ec, 'J', { tolerance: Ec * 0.01, pieges: [{ valeur: 0.5 * m * v, message: 'La vitesse doit être élevée au carré.' }, { valeur: m * v * v, message: "N'oublie pas le facteur 1/2." }] }), indice: '$E_c = \\dfrac{1}{2} m v^2$.', corrige: `<p>$E_c = 0{,}5 \\times ${m} \\times ${v}^2 = ${t(Ec)}$ J.</p>` },
        { enonce: '<p><strong>3.</strong> Pendant la descente :</p>', points: 2, choix: ["l'énergie de position est convertie en énergie cinétique", "l'énergie cinétique est convertie en énergie de position", "de l'énergie est créée", "l'énergie de position augmente"], correct: 0, corrige: "<p>L'altitude diminue, la vitesse augmente : énergie de position → énergie cinétique.</p>" },
        { enonce: `<p><strong>4.</strong> En réalité, ${pertes} % de l'énergie de position de départ a été perdue à cause des frottements. Sous quelle forme ?</p>`, points: 2, choix: ['thermique', 'chimique', 'nucléaire', 'électrique'], correct: 0, corrige: '<p>Les frottements échauffent les roues et l\'air : énergie <strong>thermique</strong>.</p>' },
        { enonce: `<p><strong>5.</strong> S'il arrivait en bas deux fois plus vite, son énergie cinétique serait multipliée par :</p>`, points: 2, choix: ['4', '2', '8', '1'], correct: 0, corrige: '<p>La vitesse est au carré : $2^2 = 4$.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  6. La guirlande — circuits, loi d'Ohm
// ---------------------------------------------------------------------
const P_GUIRLANDE = {
  id: 'bs_guirlande', titre: 'Le montage électrique', domaine: 'Électricité', chapitres: ['p09', 'pr07'], dureeMin: 12,
  generer() {
    const R = pick([100, 220, 330, 470]), U = pick([6, 9, 12]), I = U / R, U1 = pick([2, 2.5, 3]);
    return {
      contexte: `<p>On réalise un circuit en série avec un générateur de tension <strong>${U} V</strong>, un conducteur ohmique de résistance <strong>${R} Ω</strong> et un ampèremètre.</p>`,
      figure: (h) => { h.innerHTML = schemaCircuit({ U: `${U} V`, R: `${R} Ω`, I: 'I = ?' }); },
      questions: [
        { enonce: "<p><strong>1.</strong> Comment l'ampèremètre est-il branché ?</p>", points: 1, choix: ['en série', 'en dérivation', 'aux bornes du générateur'], correct: 0, fixe: true, corrige: '<p>Un ampèremètre se branche toujours <strong>en série</strong>.</p>' },
        { enonce: "<p><strong>2.</strong> Calcule l'intensité du courant, en mA (arrondi à l'unité).</p>", points: 4, ...g(arrondi(I * 1000, 0), 'mA', { tolerance: 1, pieges: [{ valeur: U * R * 1000, message: 'U = R × I, donc I = U ÷ R.' }] }), indice: "Loi d'Ohm : $U = R \\times I$.", corrige: `<p>$I = \\dfrac{U}{R} = \\dfrac{${U}}{${R}} \\approx ${t(I, 4)}$ A, soit ${t(I * 1000, 0)} mA.</p>` },
        { enonce: `<p><strong>3.</strong> On ajoute en série une lampe. La tension aux bornes du conducteur ohmique devient ${dec(U - U1)} V. Quelle est la tension aux bornes de la lampe ?</p>`, points: 3, ...g(U1, 'V', { tolerance: 0.01 }), indice: 'En série, les tensions s\'additionnent.', corrige: `<p>$U_{\\text{lampe}} = ${U} - ${t(U - U1)} = ${t(U1)}$ V.</p>` },
        { enonce: '<p><strong>4.</strong> Après avoir ajouté la lampe en série, l\'intensité dans le circuit :</p>', points: 2, choix: ['diminue', 'augmente', 'ne change pas'], correct: 0, fixe: true, corrige: '<p>Un dipôle de plus en série : le courant est plus faible.</p>' },
        { enonce: '<p><strong>5.</strong> Si l\'on dévisse la lampe :</p>', points: 2, choix: ['plus aucun courant ne circule', 'le courant augmente', 'le conducteur ohmique chauffe davantage'], correct: 0, corrige: '<p>Le circuit en série est ouvert : le courant ne circule plus.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  7. La couronne — masse volumique
// ---------------------------------------------------------------------
const P_COURONNE = {
  id: 'bs_couronne', titre: 'La couronne est-elle en or ?', domaine: 'Matière', chapitres: ['p04'], dureeMin: 10,
  generer() {
    const [metal, rho] = pick([['or', 19.3], ['laiton', 8.5], ['argent', 10.5]]), V = pick([20, 30, 40, 50]), V0 = pick([200, 250, 300]), m = arrondi(rho * V, 0);
    return {
      contexte: `<p>Un musée veut vérifier qu'une petite couronne est en or pur. On la pèse : <strong>${m} g</strong>. On la plonge dans une éprouvette contenant ${V0} mL d'eau : le niveau monte à <strong>${V0 + V} mL</strong>.</p>
        <p>Masses volumiques (g/cm³) : or 19,3 · argent 10,5 · laiton 8,5 · eau 1,0.</p>`,
      questions: [
        { enonce: '<p><strong>1.</strong> Quel est le volume de la couronne, en cm³ ?</p>', points: 2, ...g(V, 'cm3', { pieges: [{ valeur: V0 + V, message: 'Soustrais le volume d\'eau initial.' }] }), corrige: `<p>$${V0 + V} - ${V0} = ${V}$ mL $= ${V}$ cm³.</p>` },
        { enonce: '<p><strong>2.</strong> Calcule la masse volumique de la couronne.</p>', points: 4, ...g(rho, 'g/cm3', { tolerance: 0.15, pieges: [{ valeur: arrondi(V / m, 3), message: 'ρ = m ÷ V.' }] }), indice: '$\\rho = \\dfrac{m}{V}$.', corrige: `<p>$\\rho = \\dfrac{${m}}{${V}} \\approx ${t(m / V, 1)}$ g/cm³.</p>` },
        { enonce: '<p><strong>3.</strong> De quel métal la couronne est-elle faite ?</p>', points: 2, choix: ['or', 'argent', 'laiton'], correct: ['or', 'argent', 'laiton'].indexOf(metal), fixe: true, corrige: `<p>${t(rho)} g/cm³ correspond ${metal === 'or' ? "à l'or : la couronne est authentique" : metal === 'argent' ? "à l'argent : ce n'est pas de l'or" : "au laiton : ce n'est pas de l'or"}.</p>` },
        { enonce: '<p><strong>4.</strong> Quelle serait la masse d\'une couronne de même volume en or pur ?</p>', points: 3, ...g(arrondi(19.3 * V, 0), 'g', { tolerance: 1 }), indice: '$m = \\rho \\times V$.', corrige: `<p>$m = 19{,}3 \\times ${V} = ${t(19.3 * V, 0)}$ g.</p>` },
        { enonce: '<p><strong>5.</strong> La couronne flotte-t-elle dans l\'eau ?</p>', points: 1, choix: ["non : sa masse volumique est supérieure à celle de l'eau", "oui : elle est petite", "oui : sa masse volumique est supérieure à celle de l'eau"], correct: 0, corrige: '<p>Elle coule : sa masse volumique dépasse 1 g/cm³.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  8. La gazinière — combustion du méthane
// ---------------------------------------------------------------------
const P_GAZ = {
  id: 'bs_gaz', titre: 'La combustion du méthane', domaine: 'Matière', chapitres: ['pr03', 'pr04'], dureeMin: 10,
  generer() {
    const k = pick([1, 2, 5, 10]);
    return {
      contexte: `<p>Le gaz de ville est du méthane, de formule CH<sub>4</sub>. Sa combustion complète dans le dioxygène produit du dioxyde de carbone et de l'eau. On donne : <strong>${16 * k} g de méthane</strong> réagissent avec <strong>${64 * k} g de dioxygène</strong> et forment <strong>${44 * k} g de dioxyde de carbone</strong>.</p>`,
      figure: (h) => { h.innerHTML = schemaMolecule('CH4'); },
      questions: [
        { enonce: '<p><strong>1.</strong> Combien d\'atomes contient une molécule de méthane ?</p>', points: 1, validation: 'nombre', reponse: 5, corrige: '<p>1 atome de carbone + 4 atomes d\'hydrogène = 5 atomes.</p>' },
        { enonce: '<p><strong>2.</strong> Dans cette combustion, le dioxygène est :</p>', points: 2, choix: ['un réactif (le comburant)', 'un produit', 'le combustible'], correct: 0, corrige: '<p>Le dioxygène est consommé : c\'est un réactif, le <strong>comburant</strong>.</p>' },
        { enonce: "<p><strong>3.</strong> L'équation s'écrit : CH<sub>4</sub> + <em>a</em> O<sub>2</sub> → CO<sub>2</sub> + <em>b</em> H<sub>2</sub>O. Que vaut <em>b</em> ?</p>", points: 2, validation: 'nombre', reponse: 2, indice: 'Compte les atomes d\'hydrogène de chaque côté.', corrige: '<p>4 atomes H à gauche : il faut 2 H₂O à droite. Donc <em>b</em> = 2 (et <em>a</em> = 2).</p>' },
        { enonce: "<p><strong>4.</strong> Quelle masse d'eau se forme ?</p>", points: 4, ...g(36 * k, 'g', { pieges: [{ valeur: 80 * k, message: "C'est la masse totale des produits : retire celle du dioxyde de carbone." }] }), indice: 'La masse se conserve : masse des réactifs = masse des produits.', corrige: `<p>Réactifs : $${16 * k} + ${64 * k} = ${80 * k}$ g. Eau : $${80 * k} - ${44 * k} = ${36 * k}$ g.</p>` },
        { enonce: '<p><strong>5.</strong> La flamme devient jaune et noircit les casseroles. Quel gaz dangereux risque de se former ?</p>', points: 3, choix: ['le monoxyde de carbone', 'le dioxygène', 'le diazote', "la vapeur d'eau"], correct: 0, corrige: '<p>Combustion incomplète : <strong>monoxyde de carbone</strong>, incolore, inodore et mortel. Il faut aérer.</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  9. Le sonar — ondes sonores
// ---------------------------------------------------------------------
const P_SONAR = {
  id: 'bs_sonar', titre: 'Le sonar du bateau', domaine: 'Signaux', chapitres: ['p11', 'pr09'], dureeMin: 10,
  generer() {
    const f = pick([40000, 50000, 200000]), s = pick([0.2, 0.4, 0.6, 0.08]), d = (1500 * s) / 2;
    return {
      contexte: `<p>Le sonar d'un bateau émet vers le fond un signal de fréquence <strong>${dec(f)} Hz</strong>. Le signal se réfléchit sur le fond et revient au bateau <strong>${dec(s)} s</strong> après son émission. Vitesse du son dans l'eau : <strong>1 500 m/s</strong>.</p>`,
      questions: [
        { enonce: '<p><strong>1.</strong> Ce signal est :</p>', points: 2, choix: ['un ultrason', 'un infrason', 'un son audible'], correct: 0, fixe: true, corrige: `<p>${dec(f)} Hz > 20 000 Hz : c'est un <strong>ultrason</strong>.</p>` },
        { enonce: '<p><strong>2.</strong> Quelle distance totale le signal a-t-il parcourue ?</p>', points: 3, ...g(1500 * s, 'm'), indice: '$d = v \\times t$.', corrige: `<p>$d = 1\\,500 \\times ${t(s)} = ${t(1500 * s)}$ m.</p>` },
        { enonce: '<p><strong>3.</strong> Quelle est la profondeur de l\'eau sous le bateau ?</p>', points: 3, ...g(d, 'm', { pieges: [{ valeur: 1500 * s, message: "Le signal a fait l'aller ET le retour : divise par 2." }] }), corrige: `<p>Aller-retour : profondeur $= ${t(1500 * s)} \\div 2 = ${t(d)}$ m.</p>` },
        { enonce: '<p><strong>4.</strong> Ce sonar fonctionnerait-il dans le vide ?</p>', points: 2, choix: ['non : le son a besoin d\'un milieu matériel', 'oui : le son va partout', 'oui, mais plus lentement'], correct: 0, corrige: '<p>Le son ne se propage pas dans le vide.</p>' },
        { enonce: "<p><strong>5.</strong> Dans l'air, le même trajet prendrait :</p>", points: 2, choix: ['plus de temps', 'moins de temps', 'le même temps'], correct: 0, fixe: true, corrige: '<p>Le son est plus lent dans l\'air (340 m/s) que dans l\'eau (1 500 m/s).</p>' },
      ],
    };
  },
};

// ---------------------------------------------------------------------
//  10. L'installation de la cuisine — dérivation, puissance, sécurité
// ---------------------------------------------------------------------
const P_CUISINE = {
  id: 'bs_cuisine', titre: 'La multiprise de la cuisine', domaine: 'Électricité', chapitres: ['p10', 'pr07'], dureeMin: 10,
  generer() {
    const app = [['un grille-pain', pick([800, 1000])], ['une cafetière', pick([900, 1200])], ['un four à micro-ondes', pick([1150, 1500])]];
    const Pt = app.reduce((s, a) => s + a[1], 0), Imax = 16, Pmax = 230 * Imax, I = Pt / 230;
    return {
      contexte: `<p>Sur une multiprise (tension du secteur : <strong>230 V</strong>), on branche ${app.map(([n, p]) => `${n} (${p} W)`).join(', ')}. La multiprise supporte au maximum <strong>${Imax} A</strong>.</p>`,
      figure: (h) => { h.innerHTML = schemaMontage('derivation', { dipoles: ['résistance', 'résistance'] }); },
      questions: [
        { enonce: '<p><strong>1.</strong> Les appareils branchés sur une multiprise sont :</p>', points: 2, choix: ['en dérivation', 'en série'], correct: 0, fixe: true, corrige: '<p>En <strong>dérivation</strong> : chacun fonctionne indépendamment, sous 230 V.</p>' },
        { enonce: '<p><strong>2.</strong> Quelle est la puissance totale des trois appareils ?</p>', points: 2, ...g(Pt, 'W'), corrige: `<p>$${app.map((a) => a[1]).join(' + ')} = ${Pt}$ W.</p>` },
        { enonce: "<p><strong>3.</strong> Calcule l'intensité totale du courant dans la multiprise (arrondi au dixième).</p>", points: 4, ...g(arrondi(I, 1), 'A', { tolerance: 0.1 }), indice: '$I = P \\div U$.', corrige: `<p>$I = \\dfrac{${Pt}}{230} \\approx ${t(I, 1)}$ A.</p>` },
        { enonce: '<p><strong>4.</strong> Peut-on faire fonctionner les trois appareils en même temps ?</p>', points: 2, choix: ['oui', 'non : il y a surintensité'], correct: I <= Imax ? 0 : 1, fixe: true, corrige: `<p>${t(I, 1)} A ${I <= Imax ? '≤' : '>'} ${Imax} A : ${I <= Imax ? 'oui, sans danger' : 'non, la multiprise risque de surchauffer'} (puissance maximale : ${Pmax} W).</p>` },
        { enonce: '<p><strong>5.</strong> Quel dispositif coupe le courant en cas de surintensité ?</p>', points: 2, choix: ['le disjoncteur (ou un fusible)', "l'interrupteur de la lampe", 'le compteur', 'la prise de terre'], correct: 0, corrige: '<p>Le <strong>disjoncteur</strong> ou le fusible protège l\'installation contre les surintensités.</p>' },
      ],
    };
  },
};

export const PROBLEMES = [P_VELO, P_BOUILLOIRE, P_MARS, P_DETARTRANT, P_SKATE, P_GUIRLANDE, P_COURONNE, P_GAZ, P_SONAR, P_CUISINE];

/** Construit une instance d'un problème (ajoute le barème total). */
export function genererProbleme(pb) {
  const inst = pb.generer();
  inst.id = pb.id; inst.titre = pb.titre; inst.domaine = pb.domaine;
  inst.chapitres = pb.chapitres; inst.dureeMin = pb.dureeMin;
  inst.baremeTotal = inst.questions.reduce((s, q) => s + (q.points || 1), 0);
  return inst;
}
