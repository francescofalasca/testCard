// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/Badge.tsx  &  StarRating.tsx
//  Both are purely presentational — no UX logic.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Radii, Spacing } from '../../tokens/tokens';
import { Typography } from './Typography';

// ── Badge ─────────────────────────────────────────────────────────────────────

export interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
}

export function Badge({
  label,
  color = Colors.textInverse,
  backgroundColor = Colors.accent,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Typography variant="caption" color={color} style={{ fontWeight: '700' }}>
        {label}
      </Typography>
    </View>
  );
}

// ── StarRating ────────────────────────────────────────────────────────────────

export interface StarRatingProps {
  value: number;   // 0–5, supports decimals
  maxStars?: number;
  size?: number;
}

export function StarRating({ value, maxStars = 5, size = 14 }: StarRatingProps) {
  return (
    <View style={styles.stars}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <Typography
            key={i}
            style={{ fontSize: size, lineHeight: size + 2 }}
            color={filled ? Colors.starFilled : Colors.starEmpty}
          >
            ★
          </Typography>
        );
      })}
      <Typography variant="caption" color={Colors.textSecondary} style={{ marginLeft: Spacing.xs }}>
        {value.toFixed(1)}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
    alignSelf: 'flex-start',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});