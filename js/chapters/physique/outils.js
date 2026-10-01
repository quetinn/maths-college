// =====================================================================
//  outils.js — Petits outils partagés par les chapitres de physique-chimie
// =====================================================================

import { randInt, pick } from '../../engine.js';
import { arrondi, dec, tex, melanger } from '../commun.js';

export { randInt, pick, arrondi, dec, tex, melanger };

/** Valeur + unité en texte courant, à la française : q(0.15, 'A') → « 0,15 A » (espace insécable). */
export const q = (x, u, n = 4) => `${dec(x, n)} ${u}`;

/** Écriture scientifique lisible : 3.97e16 → « 3,97 × 10<sup>16</sup> ». */
export function sci(x, chiffres = 3) {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = arrondi(x / 10 ** e, chiffres - 1);
  return `${dec(m)} × 10<sup>${e}</sup>`;
}
/** Même chose en LaTeX : « 3{,}97 \times 10^{16} ». */
export function sciTex(x, chiffres = 3) {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = arrondi(x / 10 ** e, chiffres - 1);
  return `${tex(m)} \\times 10^{${e}}`;
}

/** Réponse attendue sous forme de grandeur (valeur + unité, conversions acceptées). */
export const grandeur = (reponse, unite, extra = {}) => ({ reponse, unite, validation: 'grandeur', ...extra });

/** Tolérance relative (en %), exprimée dans l'unité de la réponse. */
export const tolRel = (x, pct = 1) => Math.abs(x) * pct / 100;

/** Tire `n` éléments distincts d'une liste. */
export const tirer = (liste, n) => melanger([...liste]).slice(0, n);

/** Question tirée d'une banque { enonce, reponse | choix, correct, explication }. */
export const banque = (liste) => pick(liste);
