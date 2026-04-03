// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/Button.tsx
//
//  Il guadagno più evidente del refactor:
//
//  PRIMA: lo stato "pressed" era gestito con Pressable + callback JS:
//    <Pressable style={({ pressed }) => pressed && styles.pressed}>
//
//  ORA: è puramente dichiarativo in css.create():
//    backgroundColor: {
//      default: vars.colorAccent,
//      ':hover': vars.colorAccentLight,   // gratis su web
//      ':active': '#c73650',              // gratis su web + native
//    }
//
//  Su native, RSD intercetta gli eventi touch e applica gli stili ':active'.
//  Su web, sono veri pseudo-classi CSS — zero JavaScript.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { css, html } from 'react-strict-dom';
import { vars } from '../../tokens/tokens.stylex';
import type { ButtonSize, ButtonVariant } from '../../types';

export interface ButtonProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;

  // ── UX ──────────────────────────────────────────────────────────────────────
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  label: string;
}

// Stili statici — ottimizzati a build time da Babel
const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',            // ← ignorato su native, fondamentale su web
    userSelect: 'none',
    transitionDuration: '150ms',  // ← solo web, ignorato su native
  },

  // ── Variants ─────────────────────────────────────────────────────────────
  primary: {
    backgroundColor: {
      default: vars.colorAccent,
      ':hover':  vars.colorAccentLight,   // dichiarativo — no JS su web!
      ':active': '#c73650',
    },
    color: vars.colorTextInverse,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: {
      default: vars.colorSurface,
      ':hover': vars.colorBorderLight,
      ':active': vars.colorBorder,
    },
    color: vars.colorAccent,
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: vars.colorAccent,
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': vars.colorBorderLight,
      ':active': vars.colorBorder,
    },
    color: vars.colorAccent,
    borderWidth: 0,
  },

  // ── Sizes ────────────────────────────────────────────────────────────────
  sm: {
    paddingTop: vars.space1,
    paddingBottom: vars.space1,
    paddingLeft: vars.space2,
    paddingRight: vars.space2,
    fontSize: vars.fontSizeSm,
    borderRadius: vars.radiusFull,
  },
  md: {
    paddingTop: vars.space2,
    paddingBottom: vars.space2,
    paddingLeft: vars.space3,
    paddingRight: vars.space3,
    fontSize: vars.fontSizeLg,
    borderRadius: vars.radiusFull,
  },
  lg: {
    paddingTop: vars.space3,
    paddingBottom: vars.space3,
    paddingLeft: vars.space4,
    paddingRight: vars.space4,
    fontSize: vars.fontSizeLg,
    borderRadius: vars.radiusFull,
  },

  // ── States ───────────────────────────────────────────────────────────────
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '700',
    color: 'inherit',
  },
});

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onPress,
  disabled = false,
  loading = false,
  accessibilityLabel,
  label,
}: ButtonProps) {
  // html.button invece di Pressable
  // accessibilityRole="button" è implicito in html.button
  return (
    <html.button
      onClick={onPress}                    // onClick invece di onPress
      disabled={disabled || loading}
      aria-label={accessibilityLabel ?? label}
      aria-busy={loading}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
      ]}
    >
      <html.span style={styles.label}>
        {loading ? '…' : label}
      </html.span>
    </html.button>
  );
}