// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/Typography.tsx
//
//  PRIMA (React Native):
//    import { Text, StyleSheet } from 'react-native';
//    const styles = StyleSheet.create({ heading1: { fontSize: 28, ... } });
//    return <Text style={styles.heading1}>{children}</Text>;
//
//  ORA (React Strict DOM):
//    import { html, css } from 'react-strict-dom';
//    const styles = css.create({ heading1: { fontSize: 28, ... } });
//    return <html.span style={styles.heading1}>{children}</html.span>;
//
//  Differenza sostanziale: css.create() supporta pseudo-stati (:hover, :focus),
//  media queries e CSS custom properties — tutto in modo cross-platform.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { css, html } from 'react-strict-dom';
import { vars } from '../../tokens/tokens.stylex';
import type { TypographyVariant } from '../../types';

export interface TypographyProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  style?: ReturnType<typeof css.create>[string];
  children: React.ReactNode;
}

// css.create() al posto di StyleSheet.create()
// Usa vars (CSS custom properties) invece di valori hardcoded
const styles = css.create({
  base: {
    fontFamily: 'system-ui, sans-serif',
  },
  heading1: {
    fontSize: vars.fontSize3xl,
    fontWeight: '700',
    lineHeight: 1.2,
  },
  heading2: {
    fontSize: vars.fontSize2xl,
    fontWeight: '700',
    lineHeight: 1.27,
  },
  heading3: {
    fontSize: vars.fontSizeXl,
    fontWeight: '600',
    lineHeight: 1.33,
  },
  body: {
    fontSize: vars.fontSizeMd,
    fontWeight: '400',
    lineHeight: 1.43,
  },
  caption: {
    fontSize: vars.fontSizeXs,
    fontWeight: '400',
    lineHeight: 1.33,
  },
  price: {
    fontSize: vars.fontSizePrice,
    fontWeight: '800',
    lineHeight: 1.2,
  },
});

const alignStyles = css.create({
  left:   { textAlign: 'left' },
  center: { textAlign: 'center' },
  right:  { textAlign: 'right' },
});

export function Typography({
  variant = 'body',
  color,
  align = 'left',
  numberOfLines,
  style,
  children,
}: TypographyProps) {
  // html.span invece di <Text>
  // Su native RSD lo mappa su un Text-equivalente; su web è uno <span> semantico
  return (
    <html.span
      // numberOfLines non esiste in HTML — RSD lo gestisce con line-clamp su web
      // e numberOfLines su native attraverso la sua polyfill
      style={[
        styles.base,
        styles[variant],
        alignStyles[align],
        // Il colore dinamico è ancora possibile con css.create + funzione
        color ? dynamicColor(color) : null,
        style,
      ]}
    >
      {children}
    </html.span>
  );
}

// Stili dinamici: css.create accetta funzioni per valori runtime
const dynamicColor = (color: string) =>
  css.create({ root: { color } }).root;