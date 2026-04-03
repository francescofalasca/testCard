// ─────────────────────────────────────────────────────────────────────────────
//  tokens.ts  —  owned by the UI/Storybook team
//
//  DIFFERENZA CHIAVE rispetto alla versione React Native:
//
//  Prima:  StyleSheet.create() accettava valori JS (numeri, stringhe RN)
//          I tokens erano oggetti JS importati nei componenti.
//
//  Ora:    css.create() accetta proprietà CSS standard.
//          I tokens diventano CSS Custom Properties (variabili CSS).
//          Su web vengono iniettate nel :root e usate con var().
//          Su native, RSD le risolve staticamente a build time tramite Babel.
//
//  Vantaggio: theming e dark mode diventano banali (basta cambiare le vars).
// ─────────────────────────────────────────────────────────────────────────────

import * as stylex from '@stylexjs/stylex';

const baseValues = {
  colorPrimary:       '#1A1A2E',
  colorPrimaryLight:  '#16213E',
  colorAccent:        '#E94560',
  colorAccentLight:   '#FF6B6B',
  colorBackground:    '#F8F9FA',
  colorSurface:       '#FFFFFF',
  colorTextPrimary:   '#1A1A2E',
  colorTextSecondary: '#6C757D',
  colorTextInverse:   '#FFFFFF',
  colorTextDisabled:  '#ADB5BD',
  colorBorder:        '#DEE2E6',
  colorBorderLight:   '#F1F3F5',
  colorSuccess:       '#28A745',
  colorWarning:       '#FFC107',
  colorError:         '#DC3545',
  colorStarFilled:    '#FFD700',
  colorStarEmpty:     '#DEE2E6',
  space1: '4px',
  space2: '8px',
  space3: '16px',
  space4: '24px',
  space5: '32px',
  space6: '48px',
  radiusSm:   '6px',
  radiusMd:   '12px',
  radiusLg:   '20px',
  radiusFull: '9999px',
  fontSizeXs:    '12px',
  fontSizeSm:    '13px',
  fontSizeMd:    '14px',
  fontSizeLg:    '16px',
  fontSizeXl:    '18px',
  fontSize2xl:   '22px',
  fontSize3xl:   '28px',
  fontSizePrice: '20px',
};

// ── CSS Custom Properties (design tokens) ────────────────────────────────────
// Definite tramite css.defineVars — RSD le gestisce cross-platform.

export const vars = stylex.defineVars(baseValues);

export const defaultTheme = stylex.createTheme(vars, baseValues);

// ── Dark theme (bonus — gratis con RSD) ──────────────────────────────────────
export const darkTheme = stylex.createTheme(vars, {
  ...baseValues,  // eredita tutto
  colorBackground:    '#0D0D1A',
  colorSurface:       '#1A1A2E',
  colorTextPrimary:   '#F8F9FA',
  colorTextSecondary: '#ADB5BD',
  colorBorder:        '#2D2D4E',
  colorBorderLight:   '#1E1E3A',
});