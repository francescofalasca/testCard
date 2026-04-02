// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/Typography.tsx
//  UI props: variant, color, align, numberOfLines
//  UX props: (none — purely presentational atom)
//  ★ Visual spec lives in stories/atoms/Typography.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { Colors, Typography as TypographyTokens } from '../../tokens/tokens';
import type { TypographyVariant } from '../../types';

export interface TypographyProps {
  /** Visual variant — maps to design tokens */
  variant?: TypographyVariant;
  /** Override token color */
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  style?: TextStyle;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  color,
  align = 'left',
  numberOfLines,
  style,
  children,
}: TypographyProps) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        TypographyTokens[variant],
        styles.base,
        { color: color ?? Colors.textPrimary, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: undefined, // swap with custom font (e.g. Inter) here
  },
});