// =====================================================================
//  aide_memoire.js — Formulaire : toutes les formules clés, par thème.
//  Affiché sur la route #/formulaire (rendu KaTeX).
// =====================================================================

export default [
  {
    theme: 'nombres_calculs', titre: 'Nombres et calculs', icone: '🔢',
    fiches: [
      { titre: 'Développer / factoriser', formules: ['k(a+b) = ka + kb', '(a+b)(c+d) = ac+ad+bc+bd', 'ka + kb = k(a+b)'] },
      { titre: 'Identités remarquables', formules: ['(a+b)^2 = a^2 + 2ab + b^2', '(a-b)^2 = a^2 - 2ab + b^2', '(a+b)(a-b) = a^2 - b^2'] },
      { titre: 'Équations', formules: ['ax + b = 0 \\iff x = -\\dfrac{b}{a}', 'A \\times B = 0 \\iff A=0 \\text{ ou } B=0'] },
      { titre: 'Puissances', formules: ['a^m \\times a^n = a^{m+n}', '\\dfrac{a^m}{a^n} = a^{m-n}', '(a^m)^n = a^{mn}', 'a^0 = 1,\\quad a^{-n} = \\dfrac{1}{a^n}'] },
      { titre: 'Racines & notation scientifique', formules: ['\\sqrt{a}\\times\\sqrt{a} = a', '\\sqrt{a^2} = a\\ (a\\ge0)', 'a \\times 10^n \\ \\text{avec}\\ 1 \\le a < 10'] },
      { titre: 'Fractions & PGCD', formules: ['\\dfrac{a}{b} = \\dfrac{a\\div d}{b\\div d}\\ (d=\\text{PGCD})', '\\text{irréductible} \\iff \\text{PGCD}(a,b)=1'] },
      { titre: 'Opérations sur les fractions', formules: ['\\dfrac{a}{b}+\\dfrac{c}{b} = \\dfrac{a+c}{b}', '\\dfrac{a}{b}\\times\\dfrac{c}{d} = \\dfrac{a\\times c}{b\\times d}', '\\dfrac{a}{b}\\div\\dfrac{c}{d} = \\dfrac{a}{b}\\times\\dfrac{d}{c}'] },
      { titre: 'Priorités opératoires', formules: ['1)\\ \\text{parenthèses}', '2)\\ \\text{puissances}', '3)\\ \\times \\ \\text{et}\\ \\div', '4)\\ + \\ \\text{et}\\ -'] },
      { titre: 'Carrés et cubes (5ᵉ)', formules: ['a^2 = a \\times a, \\qquad a^3 = a \\times a \\times a', '1,\\ 4,\\ 9,\\ 16,\\ 25,\\ 36,\\ 49,\\ 64,\\ 81,\\ 100,\\ 121,\\ 144'] },
      { titre: 'Comparer / additionner des fractions (5ᵉ)', formules: ['\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k}', '\\dfrac{a}{d} + \\dfrac{c}{d} = \\dfrac{a+c}{d}', '\\text{même dénominateur} \\Rightarrow \\text{on compare les numérateurs}'] },
      { titre: 'Divisibilité (4ᵉ)', formules: ['\\text{par } 2 : \\text{chiffre des unités pair}', '\\text{par } 3 \\text{ ou } 9 : \\text{somme des chiffres divisible par } 3 \\text{ ou } 9', '\\text{par } 5 : \\text{se termine par } 0 \\text{ ou } 5'] },
      { titre: 'Règles des signes', formules: ['(+)\\times(+) = +,\\quad (-)\\times(-) = +', '(+)\\times(-) = -,\\quad (-)\\times(+) = -', '-(a+b) = -a-b,\\quad -(a-b) = -a+b'] },
    ],
  },
  {
    theme: 'fonctions', titre: 'Fonctions', icone: '📈',
    fiches: [
      { titre: 'Vocabulaire', formules: ['f(a) = b \\;:\\; b \\text{ image de } a,\\ a \\text{ antécédent de } b'] },
      { titre: 'Fonction linéaire', formules: ['f(x) = ax', '\\text{droite passant par l\'origine}', 'a = \\dfrac{f(x)}{x}'] },
      { titre: 'Fonction affine', formules: ['f(x) = ax + b', 'a = \\dfrac{y_B - y_A}{x_B - x_A}\\ \\text{(coef. directeur)}', 'b \\;:\\; \\text{ordonnée à l\'origine}'] },
      { titre: 'Proportionnalité et pourcentages', formules: ['y = a \\times x \\quad (a = \\text{coefficient})', 't\\% \\text{ de } N = \\dfrac{t}{100} \\times N', '\\text{part} \\to \\% : \\dfrac{\\text{part}}{\\text{total}} \\times 100'] },
      { titre: 'Vitesse et durées (4ᵉ)', formules: ['v = \\dfrac{d}{t}, \\qquad d = v \\times t, \\qquad t = \\dfrac{d}{v}', '1\\ \\text{m/s} = 3{,}6\\ \\text{km/h}', '15\\ \\text{min} = 0{,}25\\ \\text{h} ; \\quad 45\\ \\text{min} = 0{,}75\\ \\text{h}'] },
      { titre: 'Échelle', formules: ['\\dfrac{1}{25\\,000} \\;:\\; 1\\ \\text{cm sur la carte} = 25\\,000\\ \\text{cm} = 250\\ \\text{m}'] },
    ],
  },
  {
    theme: 'geometrie', titre: 'Géométrie', icone: '📐',
    fiches: [
      { titre: 'Thalès', formules: ['\\dfrac{OM}{OA} = \\dfrac{ON}{OB} = \\dfrac{MN}{AB}'] },
      { titre: 'Trigonométrie (triangle rectangle)', formules: ['\\cos\\alpha = \\dfrac{\\text{adj}}{\\text{hyp}}', '\\sin\\alpha = \\dfrac{\\text{opp}}{\\text{hyp}}', '\\tan\\alpha = \\dfrac{\\text{opp}}{\\text{adj}}'] },
      { titre: 'Pythagore (rappel)', formules: ['BC^2 = AB^2 + AC^2 \\ \\text{(rectangle en } A)'] },
      { titre: 'Homothétie (rapport k)', formules: ['\\text{longueurs} \\times k', '\\text{aires} \\times k^2', '\\text{volumes} \\times k^3'] },
      { titre: 'Volumes', formules: ['V_{cube} = a^3', 'V_{pavé} = L\\ell h', 'V_{prisme/cylindre} = \\mathcal{B} \\times h', 'V_{cylindre} = \\pi r^2 h', 'V_{pyramide/cône} = \\dfrac13 \\mathcal{B} h', 'V_{cône} = \\dfrac13 \\pi r^2 h', 'V_{boule} = \\dfrac43 \\pi r^3'] },
      { titre: 'Aires et périmètres (5ᵉ)', formules: ['\\mathcal{A}_{triangle} = \\dfrac{b \\times h}{2}', '\\mathcal{A}_{parallélogramme} = b \\times h', '\\mathcal{A}_{disque} = \\pi r^2, \\qquad P_{cercle} = 2\\pi r', '1\\ \\text{L} = 1\\ \\text{dm}^3 = 1\\,000\\ \\text{cm}^3'] },
      { titre: 'Angles (5ᵉ)', formules: ['\\text{complémentaires} : \\alpha + \\beta = 90°', '\\text{supplémentaires} : \\alpha + \\beta = 180°', '\\text{opposés par le sommet : même mesure}', '(d_1) \\parallel (d_2) \\Rightarrow \\text{alternes-internes et correspondants égaux}'] },
      { titre: 'Triangles et parallélogrammes (5ᵉ)', formules: ['\\widehat{A} + \\widehat{B} + \\widehat{C} = 180°', '\\text{inégalité triangulaire} : \\text{plus grand côté} < \\text{somme des deux autres}', '\\text{parallélogramme : côtés opposés égaux, diagonales de même milieu}'] },
      { titre: 'Repérage et transformations (5ᵉ/4ᵉ)', formules: ['M(x\\,;\\,y) \\to \\text{symétrie de centre } O : M\'(-x\\,;\\,-y)', '\\text{translation } \\vec u(a\\,;\\,b) : M\'(x+a\\,;\\,y+b)', '\\text{quart de tour (sens direct)} : (x\\,;\\,y) \\mapsto (-y\\,;\\,x)'] },
    ],
  },
  {
    theme: 'donnees', titre: 'Données et probabilités', icone: '📊',
    fiches: [
      { titre: 'Statistiques', formules: ['\\bar{x} = \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}', '\\text{étendue} = \\max - \\min', '\\text{médiane : valeur centrale (série ordonnée)}'] },
      { titre: 'Quartiles & box-plot', formules: ['Q_1 : \\text{au moins } 25\\% \\text{ des données} \\le Q_1', 'Q_3 : \\text{au moins } 75\\% \\text{ des données} \\le Q_3', '\\text{écart interquartile} = Q_3 - Q_1'] },
      { titre: 'Probabilités', formules: ['P = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}', '0 \\le P \\le 1', 'P(\\overline{A}) = 1 - P(A)'] },
      { titre: 'Effectifs et fréquences (5ᵉ)', formules: ['f = \\dfrac{\\text{effectif}}{\\text{effectif total}}', 'f\\,\\% = f \\times 100', '\\text{angle (diagramme circulaire)} = f \\times 360°', '\\bar{x} = \\dfrac{n_1 x_1 + n_2 x_2 + \\dots}{n_1 + n_2 + \\dots}'] },
    ],
  },
  {
    theme: 'algo', titre: 'Algorithmique', icone: '💻',
    fiches: [
      { titre: 'Variable et affectation', formules: ['x \\leftarrow 5 \\ \\ (x \\text{ reçoit } 5)', 'x \\leftarrow x + 1 \\ \\ (\\text{on augmente } x \\text{ de } 1)'] },
      { titre: 'Condition (si … sinon)', formules: ['\\text{si } test : \\ \\text{instructions A}', '\\text{sinon} : \\ \\text{instructions B}', '\\Rightarrow \\text{une seule branche s\'exécute}'] },
      { titre: 'Boucle « pour »', formules: ['\\text{pour } i \\text{ de } 1 \\text{ à } n : \\ \\dots', '\\Rightarrow \\text{le bloc est répété } n \\text{ fois}'] },
      { titre: 'Boucle « tant que »', formules: ['\\text{tant que } test : \\ \\dots', '\\Rightarrow \\text{répété tant que } test \\text{ est vrai}'] },
      { titre: 'Scratch : polygone régulier', formules: ['\\text{répéter } n \\text{ fois : avancer, tourner de } \\dfrac{360°}{n}', 'n = 3 \\to 120°, \\quad n = 4 \\to 90°, \\quad n = 6 \\to 60°'] },
    ],
  },
  // ---------------------------------------------------------- Physique-chimie
  {
    theme: 'pc_matiere', matiere: 'physique', titre: 'Matière', icone: '⚗️',
    fiches: [
      { titre: 'États de la matière', formules: ['\\text{solide : forme et volume propres}', '\\text{liquide : volume propre, prend la forme du récipient}', '\\text{gaz : occupe tout l\'espace, compressible}'] },
      { titre: "Changements d'état", formules: ['\\text{fusion / solidification : solide} \\leftrightarrow \\text{liquide}', '\\text{vaporisation / liquéfaction : liquide} \\leftrightarrow \\text{gaz}', '\\text{corps pur : palier de température ; la masse se conserve}'] },
      { titre: 'Masse, volume, mélanges', formules: ['1 \\text{ L} = 1\\,000 \\text{ mL}, \\quad 1 \\text{ mL} = 1 \\text{ cm}^3, \\quad 1 \\text{ m}^3 = 1\\,000 \\text{ L}', '1 \\text{ L d\'eau} \\leftrightarrow 1 \\text{ kg}', 'm_{\\text{solution}} = m_{\\text{solvant}} + m_{\\text{soluté}}'] },
      { titre: 'Air, molécules, réactions', formules: ['\\text{air : } 78\\,\\% \\ \\mathrm{N_2}, \\ 21\\,\\% \\ \\mathrm{O_2}', '\\mathrm{C + O_2 \\rightarrow CO_2}', '\\mathrm{CH_4 + 2\\,O_2 \\rightarrow CO_2 + 2\\,H_2O}', '\\text{eau de chaux troublée} \\Rightarrow \\mathrm{CO_2}'] },
      { titre: "L'atome", formules: ['\\text{protons} = Z, \\quad \\text{électrons} = Z \\ (\\text{atome neutre})', '\\text{neutrons} = A - Z', '\\text{atome} \\approx 10^{-10}\\text{ m}, \\quad \\text{noyau} \\approx 10^{-15}\\text{ m}'] },
      { titre: 'Les ions', formules: ['\\text{charge} = \\text{protons} - \\text{électrons}', '\\text{perte d\'électrons} \\to \\text{ion positif (Cu}^{2+})', '\\text{gain d\'électrons} \\to \\text{ion négatif (Cl}^{-})'] },
      { titre: 'Tests des ions', formules: ['\\text{soude : Cu}^{2+} \\text{ bleu, Fe}^{2+} \\text{ vert, Fe}^{3+} \\text{ rouille, Zn}^{2+} \\text{ blanc}', '\\text{nitrate d\'argent : Cl}^{-} \\text{ blanc qui noircit}'] },
      { titre: 'pH', formules: ['\\text{pH} < 7 : \\text{acide}, \\quad = 7 : \\text{neutre}, \\quad > 7 : \\text{basique}', '\\text{acide : H}^{+} \\text{ majoritaires ; basique : HO}^{-} \\text{ majoritaires}', '\\text{dilution : le pH se rapproche de } 7'] },
      { titre: 'Réactions', formules: ['\\text{Fe} + 2\\,\\text{H}^{+} \\rightarrow \\text{Fe}^{2+} + \\text{H}_2', '\\text{H}^{+} + \\text{HO}^{-} \\rightarrow \\text{H}_2\\text{O}', '\\text{atomes et masse se conservent}'] },
      { titre: 'Masse volumique', formules: ['\\rho = \\dfrac{m}{V}', '1 \\text{ g/cm}^3 = 1\\,000 \\text{ kg/m}^3, \\quad \\rho_{\\text{eau}} = 1 \\text{ g/cm}^3', '\\rho_{\\text{objet}} < \\rho_{\\text{liquide}} \\Rightarrow \\text{il flotte}'] },
    ],
  },
  {
    theme: 'pc_mouvement', matiere: 'physique', titre: 'Mouvement et interactions', icone: '🚀',
    fiches: [
      { titre: 'Vitesse', formules: ['v = \\dfrac{d}{t}, \\quad d = v \\times t, \\quad t = \\dfrac{d}{v}', '1 \\text{ m/s} = 3{,}6 \\text{ km/h}'] },
      { titre: 'Forces', formules: ['\\text{point d\'application, direction, sens, valeur (N)}', '\\text{longueur} = \\dfrac{\\text{valeur}}{\\text{échelle}}', '\\text{immobile ou uniforme} \\Rightarrow \\text{forces qui se compensent}'] },
      { titre: 'Poids', formules: ['P = m \\times g', 'g_{\\text{Terre}} \\approx 9{,}8 \\text{ N/kg}, \\quad g_{\\text{Lune}} \\approx 1{,}6 \\text{ N/kg}', 'F = G \\times \\dfrac{m_A \\times m_B}{d^2}'] },
    ],
  },
  {
    theme: 'pc_energie', matiere: 'physique', titre: 'Énergie', icone: '⚡',
    fiches: [
      { titre: 'Circuits : lois', formules: ['\\text{série : } I = I_1 = I_2, \\quad U = U_1 + U_2', '\\text{dérivation : } I = I_1 + I_2, \\quad U = U_1 = U_2', '\\text{ampèremètre en série, voltmètre en dérivation}'] },
      { titre: "Bilan d'énergie", formules: ['E_{\\text{reçue}} = E_{\\text{utile}} + E_{\\text{perdue}}', '1 \\text{ kJ} = 1\\,000 \\text{ J}'] },
      { titre: 'Énergie cinétique', formules: ['E_c = \\dfrac{1}{2} \\times m \\times v^2 \\quad (\\text{J, kg, m/s})', 'd_{\\text{arrêt}} = d_{\\text{réaction}} + d_{\\text{freinage}}'] },
      { titre: "Loi d'Ohm", formules: ['U = R \\times I \\quad (\\text{V}, \\Omega, \\text{A})', '1 \\text{ A} = 1\\,000 \\text{ mA}'] },
      { titre: 'Puissance et énergie électriques', formules: ['P = U \\times I', 'E = P \\times t \\quad (\\text{J : W et s ; kWh : kW et h})', '1 \\text{ kWh} = 3{,}6 \\times 10^{6} \\text{ J}'] },
    ],
  },
  {
    theme: 'pc_signaux', matiere: 'physique', titre: 'Signaux', icone: '📡',
    fiches: [
      { titre: 'Son', formules: ['v_{\\text{air}} \\approx 340 \\text{ m/s}, \\quad v_{\\text{eau}} \\approx 1\\,500 \\text{ m/s}', 'f = \\dfrac{1}{T}', '\\text{audible : de } 20 \\text{ Hz à } 20\\,000 \\text{ Hz}'] },
      { titre: 'Écho et lumière', formules: ['d = \\dfrac{v \\times t}{2} \\ (\\text{aller-retour})', 'c \\approx 3 \\times 10^{8} \\text{ m/s}'] },
    ],
  },
  // ---------------------------------------------------------------------- SVT
  // En SVT, une fiche liste des `points` à retenir (phrases) plutôt que des formules.
  {
    theme: 'svt_terre', matiere: 'svt', titre: 'La planète Terre et l\'action humaine', icone: '🌍',
    fiches: [
      { titre: 'La Terre dans le système solaire', points: ['Huit planètes : quatre rocheuses près du Soleil, quatre géantes plus loin.', 'Rotation de la Terre en 24 heures : jour et nuit. Révolution en un an.', 'Axe incliné : les saisons.', 'Eau liquide et atmosphère : une planète habitable.'] },
      { titre: 'Séismes, volcans et plaques', points: ['Foyer : en profondeur. Épicentre : en surface, à sa verticale.', 'Magnitude : énergie libérée. Intensité : dégâts observés.', 'Éruption effusive (lave fluide) ou explosive (lave visqueuse).', 'Les plaques s\'écartent (dorsale), se rapprochent (subduction) ou coulissent.', 'Risque = aléa et enjeux.'] },
      { titre: 'Vents et zones climatiques', points: ['Anticyclone : hautes pressions, beau temps. Dépression : basses pressions, pluie.', 'Le vent va des hautes vers les basses pressions.', 'Zones chaude, tempérées et froides.'] },
      { titre: 'Ressources et écosystèmes', points: ['Renouvelable : eau, bois, vent, Soleil. Non renouvelable : charbon, pétrole, gaz, minerais.', 'Chaîne alimentaire : producteur → consommateurs ; la flèche signifie « est mangé par ».', 'Un pesticide se concentre le long de la chaîne alimentaire.', 'Gestion durable : ne pas prélever plus que ce qui se renouvelle.'] },
      { titre: 'Météo et climat', points: ['Météo : le temps qu\'il fait, sur quelques heures ou quelques jours.', 'Climat : moyenne sur au moins trente ans.', 'Climats du passé : connus grâce aux pollens fossiles et aux bulles d\'air des glaces.'] },
      { titre: 'Effet de serre et réchauffement', points: ['Gaz à effet de serre : vapeur d\'eau, CO₂, méthane. Ils retiennent la chaleur émise par le sol.', 'Sans effet de serre : −18 °C. Avec : environ +15 °C.', 'Depuis 1850 : environ +1,1 °C, à cause de la combustion des énergies fossiles.', 'Atténuation : émettre moins. Adaptation : limiter les dégâts.'] },
      { titre: 'Impacts sur la biodiversité', points: ['Biodiversité : diversité des écosystèmes, des espèces et des individus.', 'Le réchauffement déplace les espèces vers les pôles et les sommets.', 'Espèce exotique envahissante : introduite par l\'être humain, elle prolifère.', 'Océans : acidification (CO₂ dissous), surpêche, plastiques.'] },
    ],
  },
  {
    theme: 'svt_corps', matiere: 'svt', titre: 'Le corps humain et la santé', icone: '🫀',
    fiches: [
      { titre: 'Effort, sang et respiration', points: ['Le muscle consomme dioxygène et nutriments, rejette du dioxyde de carbone.', 'À l\'effort, le cœur et la respiration accélèrent.', 'Fréquence cardiaque maximale théorique : 220 − âge.', 'Artère : du cœur vers les organes. Veine : retour au cœur. Capillaire : échanges.'] },
      { titre: 'Digestion et alimentation', points: ['Trajet : bouche, œsophage, estomac, intestin grêle, gros intestin.', 'Digestion : les enzymes découpent les aliments en nutriments.', 'Absorption : les nutriments passent dans le sang, dans l\'intestin grêle.', 'Énergie : 17 kJ par gramme de glucides ou de protides, 37 kJ par gramme de lipides.'] },
      { titre: 'Reproduction humaine', points: ['Spermatozoïdes : produits en continu par les testicules. Ovule : un par cycle.', 'Cycle de 28 jours environ ; ovulation vers le 14ᵉ jour ; règles au début du cycle.', 'Fécondation dans la trompe, nidation dans l\'utérus, échanges par le placenta.', 'Préservatif : seule méthode qui protège aussi des infections sexuellement transmissibles.'] },
      { titre: 'Système nerveux', points: ['Trajet : organe récepteur → nerf sensitif → centre nerveux → nerf moteur → muscle.', 'Neurone : corps cellulaire, dendrites, axone. Synapse : zone de contact entre deux neurones.', 'Alcool, drogues, bruit et manque de sommeil perturbent le système nerveux.'] },
      { titre: 'Face à une infection', points: ['Contamination : entrée du microbe. Infection : sa multiplication.', 'Phagocytose : rapide, contre tous les microbes (adhésion, ingestion, digestion, rejet).', 'Antibiotiques : contre les bactéries seulement, jamais contre les virus.', 'Asepsie : éviter la contamination. Antisepsie : détruire les microbes présents.'] },
      { titre: 'Réponse adaptative et vaccination', points: ['Lymphocytes B : fabriquent des anticorps, spécifiques d\'un antigène.', 'Lymphocytes T : détruisent les cellules infectées par un virus.', 'Cellules mémoire : second contact plus rapide et plus fort.', 'Vaccin : antigène inoffensif qui crée cette mémoire sans la maladie.'] },
    ],
  },
  {
    theme: 'svt_vivant', matiere: 'svt', titre: 'Le vivant et son évolution', icone: '🧬',
    fiches: [
      { titre: 'Nutrition des êtres vivants', points: ['Animal : aliments, eau, dioxygène ; rejette du dioxyde de carbone.', 'Végétal vert : eau, sels minéraux, dioxyde de carbone, lumière.', 'Photosynthèse : eau + dioxyde de carbone + lumière → glucides + dioxygène.', 'Sève brute : des racines aux feuilles. Sève élaborée : des feuilles aux autres organes.'] },
      { titre: 'Reproduction et espèces', points: ['Fécondation interne ou externe ; ovipare ou vivipare.', 'Fleur : pollinisation, fécondation, puis graine et fruit.', 'Reproduction asexuée : un seul individu, des copies identiques.', 'Même espèce : descendants fertiles ; même nombre de chromosomes.'] },
      { titre: 'Histoire de la vie', points: ['Fossile : reste ou trace d\'un être vivant du passé.', 'Crises il y a 252 et 66 millions d\'années.', 'Paléozoïque, Mésozoïque, Cénozoïque.'] },
      { titre: 'Reproduction sexuée et diversité', points: ['Cellule reproductrice : 23 chromosomes, un de chaque paire, au hasard.', 'Fécondation : 23 + 23 = 46 chromosomes dans la cellule-œuf.', 'Mutation : modification de l\'ADN, au hasard, qui crée un nouvel allèle.'] },
      { titre: 'Parenté et évolution', points: ['Caractère partagé = hérité d\'un ancêtre commun.', 'Sur un arbre, un nœud représente un ancêtre commun.', 'Sélection naturelle : les individus avantagés dans leur milieu laissent plus de descendants.', 'C\'est la population qui change, pas l\'individu.'] },
      { titre: "De la cellule au gène", points: ['Le noyau de chaque cellule contient les <strong>chromosomes</strong> : 46 chez l\'être humain, soit 23 paires.', "Un chromosome est une très longue molécule d'<strong>ADN</strong>.", "Un <strong>gène</strong> est une portion d'ADN qui détermine un caractère héréditaire.", 'Les <strong>allèles</strong> sont les différentes versions d\'un gène. Chaque cellule en possède deux par gène.'] },
      { titre: 'Caryotype', points: ['22 paires communes aux deux sexes + les chromosomes sexuels.', 'X et X : sexe féminin. X et Y : sexe masculin.', 'Trisomie 21 : trois chromosomes 21, soit 47 chromosomes.'] },
      { titre: 'Groupes sanguins', points: ['Un gène, trois allèles : A, B et O.', "A et B s'expriment toujours ; O seulement s'il est en deux exemplaires.", 'A et A, A et O → groupe A · B et B, B et O → groupe B · A et B → groupe AB · O et O → groupe O.'] },
      { titre: 'Phénotype', points: ["Phénotype = ensemble des caractères observables.", "Il dépend des gènes <strong>et</strong> de l'environnement (soleil, alimentation, sport…).", "Un caractère acquis au cours de la vie n'est pas héréditaire."] },
    ],
  },
  // ---------------------------------------------------------------------- Technologie
  {
    theme: 'tk_usages', matiere: 'techno', titre: 'Les objets, leurs usages et la société', icone: '🌐',
    fiches: [
      { titre: 'Innovation', points: ['Invention : création nouvelle. Innovation : nouveauté adoptée par les utilisateurs.', 'Rupture : nouveau principe technique. Amélioration : même principe, objet perfectionné.', 'Famille : même besoin. Lignée : même principe technique.', 'Contrainte sociétale : loi, norme, sécurité, environnement.'] },
      { titre: 'Argumentaire court', points: ['Affirmer, justifier par un fait, nuancer, conclure.', 'Citer un avantage et un inconvénient.'] },
      { titre: 'Choisir un objet', points: ['Cycle de vie : extraction, traitement, fabrication, assemblage, utilisation, fin de vie ; du transport entre chaque étape.', 'Trois piliers du développement durable : environnemental, social, économique.', 'Étiquette énergie : de A (le plus efficace) à G. Indice de réparabilité : note sur 10.', "Coût total = prix d'achat + coût de l'énergie sur la durée d'utilisation.", 'Bilan carbone : émissions de tout le cycle de vie, en kg équivalent CO₂.'] },
      { titre: 'Intelligence artificielle', points: ['Supervisé : exemples étiquetés. Non supervisé : recherche de groupes. Par renforcement : récompenses.', 'Biais : erreur due à des données d\'entraînement déséquilibrées.', 'Une réponse se vérifie ; la décision revient à une personne.'] },
      { titre: 'Usage raisonné du numérique', points: ['Donnée personnelle : identité, position, navigation.', 'Mot de passe long et différent pour chaque service.', "Propriété intellectuelle : pas de réutilisation d'une œuvre sans autorisation."] },
    ],
  },
  {
    theme: 'tk_structure', matiere: 'techno', titre: 'Structure et fonctionnement', icone: '⚙️',
    fiches: [
      { titre: "Chaîne d'énergie", points: ['Alimenter (batterie) → distribuer (relais) → convertir (moteur) → transmettre (engrenages).', 'Moteur : électrique → mécanique. Lampe : électrique → lumineuse. Radiateur : électrique → thermique. Génératrice : mécanique → électrique.', 'Schéma-bloc : un bloc par fonction, une forme d\'énergie par flèche.'] },
      { titre: 'Engrenages', formules: ['N_1 \\times Z_1 = N_2 \\times Z_2'], points: ['$N$ : vitesse en tr/min ; $Z$ : nombre de dents.', 'Plus de dents : moins vite. Deux roues engrenées tournent en sens inverses.'] },
      { titre: "Chaîne d'information", points: ['Acquérir (capteur) → traiter (microcontrôleur) → communiquer (afficheur).', 'Le traitement envoie des ordres à la chaîne d\'énergie.'] },
      { titre: 'Bit, octet, code ASCII', points: ['Bit : 0 ou 1. Avec $n$ bits : $2^n$ valeurs.', 'Octet : 8 bits, 256 valeurs (0 à 255). Poids : 128, 64, 32, 16, 8, 4, 2, 1.', 'Code ASCII : A = 65, B = 66… ; a = 97. Un caractère : un octet.', 'Types de données : nombre, mot (chaîne de caractères), booléen.'] },
      { titre: 'Réseau et Internet', points: ['Commutateur : relie les terminaux d\'un réseau local. Routeur : relie des réseaux.', 'Adresse IP : quatre nombres de 0 à 255.', 'Un message est découpé en paquets ; chaque routeur lit sa table de routage.', 'Durée de transfert = taille en bits ÷ débit ; 1 octet = 8 bits.'] },
      { titre: 'Dépanner et réparer', points: ['Décrire la panne, lister les hypothèses, tester une à une du plus simple au plus complexe, réparer, valider.', 'Couper l\'alimentation avant d\'intervenir.', 'Ajout de matière (impression 3D), enlèvement (découpe laser, usinage), mise en forme (pliage, thermoformage).', 'Assemblage démontable (vis, clip) : réparation facile.'] },
      { titre: 'Programmer', points: ['Entrées (capteurs, boutons) → traitement → sorties (actionneurs, affichages).', 'ET : les deux conditions vraies. OU : au moins une. NON : inverse.', 'Blocs → texte : si… sinon = <code>if… else</code> ; répéter indéfiniment = <code>while True</code>.', 'Tester avec une valeur de chaque côté du seuil.'] },
    ],
  },
  {
    theme: 'tk_creation', matiere: 'techno', titre: 'Projet et validation', icone: '🛠️',
    fiches: [
      { titre: 'Mener un projet', points: ['Besoin → cahier des charges → recherche de solutions → modélisation → prototype → tests.', 'Diagramme de planification : une barre par tâche ; certaines tâches se font en même temps.', 'Revue de projet : faire le point et décider de la suite.'] },
      { titre: 'Protocole de test', points: ['Grandeur mesurée, instrument, conditions, étapes, nombre de mesures.', 'On répète la mesure et on calcule la moyenne.'] },
      { titre: 'Écart', formules: ['\\dfrac{\\text{valeur mesurée} - \\text{valeur attendue}}{\\text{valeur attendue}} \\times 100'], points: ['Solution validée si l\'écart reste dans la limite du cahier des charges.'] },
    ],
  },
];
