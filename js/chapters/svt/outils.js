// =====================================================================
//  outils.js — Fabriques d'exercices de SVT
//
//  En SVT, un exercice tire dans une BANQUE de cas (définitions, phrases,
//  documents) plutôt que dans des nombres. Ces fabriques évitent de
//  réécrire la même mécanique dans chaque chapitre.
// =====================================================================

import { pick, randInt, melanger, tirer, arrondi, dec } from '../physique/outils.js';

export { pick, randInt, melanger, tirer, arrondi, dec };

export const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const minuscule = (s) => s.charAt(0).toLowerCase() + s.slice(1);
/** « a, b et c ». */
export const liste = (mots) => (mots.length > 1 ? `${mots.slice(0, -1).join(', ')} et ${mots[mots.length - 1]}` : mots[0] || '');

/** Vrai ou faux : banque = [[affirmation, vrai ?, explication], …]. */
export const exoVraiFaux = (id, niveau, banque, indices) => ({
  id, niveau, type: 'vrai_faux', consigne: 'Vrai ou faux ?',
  generer() { const [enonce, reponse, e] = pick(banque); return { enonce, reponse, _v: { e } }; },
  indices,
  correction_detaillee: (st) => `<p>${st._v.e}</p>`,
});

/** Vocabulaire : banque = [[mot, définition], …] ; on donne la définition, il faut le mot. */
export const exoDefinition = (id, niveau, banque, indices) => ({
  id, niveau, type: 'qcm', consigne: 'Quel mot correspond à cette définition ?',
  generer() {
    const [mot, def] = pick(banque);
    return { enonce: `« ${def} »`, choix: [mot, ...tirer(banque.filter((d) => d[0] !== mot), 3).map((d) => d[0])], correct: 0, _v: { mot, def } };
  },
  indices,
  correction_etapes: (st) => [`Cette définition est celle de : <strong>${st._v.mot}</strong>.`, `À retenir : ${st._v.mot} — ${minuscule(st._v.def)}`],
});

/**
 * Classer : banque = [[texte, catégorie], …], options = catégories (2 ou 3),
 * raisons = { catégorie: phrase d'explication }. `n` lignes par tirage, avec
 * au moins une ligne de chaque catégorie.
 */
export const exoClasser = (id, niveau, consigne, banque, options, raisons, indices, n = 5) => ({
  id, niveau, type: 'associer', consigne,
  generer() {
    let lignes;
    do { lignes = tirer(banque, n); } while (options.some((o) => !lignes.some((l) => l[1] === o)));
    return { elements: lignes.map(([texte, reponse]) => ({ texte: majuscule(texte), reponse })), options };
  },
  indices,
  correction_etapes: (st) => options
    .filter((o) => st.elements.some((e) => e.reponse === o))
    .map((o) => `<strong>${majuscule(o)}</strong> : ${liste(st.elements.filter((e) => e.reponse === o).map((e) => minuscule(e.texte)))}. ${raisons[o] || ''}`),
});

/** Relier : banque = [[élément, réponse], …] ; `n` paires par tirage, liste déroulante. */
export const exoRelier = (id, niveau, consigne, banque, indices, n = 4) => ({
  id, niveau, type: 'associer', consigne,
  generer() {
    const paires = tirer(banque, n);
    return { elements: paires.map(([texte, reponse]) => ({ texte: majuscule(texte), reponse })), _v: { paires } };
  },
  indices,
  correction_etapes: (st) => st._v.paires.map(([a, b]) => `${majuscule(a)} : <strong>${b}</strong>.`),
});

/** Remettre dans l'ordre : variantes = [{ consigne, etapes, note }, …]. */
export const exoOrdonner = (id, niveau, variantes, indices) => ({
  id, niveau, type: 'ordonner_etapes', consigne: '',
  generer() { const v = pick(variantes); return { consigne: v.consigne, etapes: v.etapes, _v: { note: v.note || '' } }; },
  indices,
  correction_detaillee: (st) => `${st._v.note ? `<p>${st._v.note}</p>` : ''}<ol>${st.etapes.map((e) => `<li>${e}</li>`).join('')}</ol>`,
});

/**
 * Étude de document : documents = [() => ({ enonce, visuel?, questions, correction }), …].
 * Chaque document est une fonction (ses valeurs peuvent être tirées au hasard).
 */
export const exoDocument = (id, niveau, consigne, documents, indices) => ({
  id, niveau, type: 'document', consigne,
  generer() { const d = pick(documents)(); return { enonce: d.enonce, visuel: d.visuel, questions: d.questions, _v: { correction: d.correction } }; },
  indices,
  correction_etapes: (st) => st._v.correction,
});

/** Question à choix dont la bonne réponse est la première. */
export const choix = (question, bonne, ...autres) => ({ question, choix: [bonne, ...autres], correct: 0 });
/** Question à réponse numérique. */
export const nombre = (question, reponse, extra = {}) => ({ question, reponse, validation: 'nombre', ...extra });

/** Situation à choix : banque = [[énoncé, bonne réponse, fausse, fausse], …] ; `retenir` clôt la correction. */
export const exoSituation = (id, niveau, consigne, banque, indices, retenir = '') => ({
  id, niveau, type: 'qcm', consigne,
  generer() { const [enonce, bonne, ...fausses] = pick(banque); return { enonce, choix: [bonne, ...fausses], correct: 0, _v: { bonne } }; },
  indices,
  correction_etapes: (st) => [`Réponse : « ${st._v.bonne} »`, ...(retenir ? [retenir] : [])],
});

/**
 * Schéma à légender : `parties` = légendes possibles, `schema(ordre)` renvoie le SVG
 * dont le repère k + 1 désigne ordre[k]. `explications` = { partie: phrase }.
 */
export const exoLegender = (id, niveau, consigne, parties, schema, leurres, indices, explications = {}) => ({
  id, niveau, type: 'legender', consigne,
  generer() { const ordre = melanger([...parties]); return { legendes: ordre, leurres, visuel: (host) => { host.innerHTML = schema(ordre); } }; },
  indices,
  correction_etapes: (st) => st.legendes.map((nom, k) => `Repère ${k + 1} : <strong>${nom}</strong>${explications[nom] ? ` — ${explications[nom]}` : ''}.`),
});
