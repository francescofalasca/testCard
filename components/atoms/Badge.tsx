// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/Badge.tsx  (include StarRating)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { css, html } from 'react-strict-dom';
import { vars } from '../../tokens/tokens.stylex';

// ── Badge ─────────────────────────────────────────────────────────────────────

export interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
}

const badgeStyles = css.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingLeft: vars.space2,
    paddingRight: vars.space2,
    borderRadius: vars.radiusFull,
    backgroundColor: vars.colorAccent,  // default, overridden via style prop
  },
  label: {
    fontSize: vars.fontSizeXs,
    fontWeight: '700',
    color: vars.colorTextInverse,
  },
});

export function Badge({ label, color, backgroundColor }: BadgeProps) {
  return (
    <html.div
      style={[
        badgeStyles.root,
        backgroundColor ? css.create({ bg: { backgroundColor } }).bg : null,
      ]}
    >
      <html.span
        style={[
          badgeStyles.label,
          color ? css.create({ c: { color } }).c : null,
        ]}
      >
        {label}
      </html.span>
    </html.div>
  );
}

// ── StarRating ────────────────────────────────────────────────────────────────

export interface StarRatingProps {
  value: number;
  maxStars?: number;
  size?: number;
}

const starStyles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vars.space1,
  },
  starFilled: {
    color: vars.colorStarFilled,
  },
  starEmpty: {
    color: vars.colorStarEmpty,
  },
  rating: {
    fontSize: vars.fontSizeXs,
    color: vars.colorTextSecondary,
    marginLeft: vars.space1,
  },
});

export function StarRating({ value, maxStars = 5 }: StarRatingProps) {
  return (
    <html.div style={starStyles.container}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <html.span
          key={i}
          style={i < Math.round(value) ? starStyles.starFilled : starStyles.starEmpty}
        >
          ★
        </html.span>
      ))}
      <html.span style={starStyles.rating}>{value.toFixed(1)}</html.span>
    </html.div>
  );
}