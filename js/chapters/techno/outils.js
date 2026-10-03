// =====================================================================
//  outils.js — Fabriques d'exercices de technologie
//
//  Comme en SVT, un exercice de technologie tire dans une banque de cas
//  (objets, constituants, documents techniques) : on reprend les mêmes
//  fabriques.
// =====================================================================

export {
  pick, randInt, melanger, tirer, arrondi, dec, majuscule, minuscule, liste,
  exoVraiFaux, exoDefinition, exoClasser, exoRelier, exoOrdonner, exoDocument, exoSituation, exoLegender, choix, nombre,
} from '../svt/outils.js';

/** Écriture binaire d'un entier sur `n` bits : binaire(5, 8) → « 00000101 ». */
export const binaire = (v, n = 8) => v.toString(2).padStart(n, '0');
