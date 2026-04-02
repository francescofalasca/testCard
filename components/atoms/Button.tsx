// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/Button.tsx
//  UI props:  variant, size, fullWidth, leftIcon, rightIcon
//  UX props:  onPress, disabled, loading, accessibilityLabel
//  ★ Visual spec lives in stories/atoms/Button.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radii, Spacing } from '../../tokens/tokens';
import type { ButtonSize, ButtonVariant } from '../../types';

// ─── Re-export Typography under a cleaner alias for internal atom use ─────────
// (avoids naming collision since this file also imports the token map)
import { Typography as TypographyAtom } from './Typography';

export interface ButtonProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // ── UX ──────────────────────────────────────────────────────────────────────
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;

  // ── Shared ──────────────────────────────────────────────────────────────────
  label: string;
}

const sizeMap: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { paddingVertical: Spacing.xs,  paddingHorizontal: Spacing.sm, fontSize: 13 },
  md: { paddingVertical: Spacing.sm,  paddingHorizontal: Spacing.md, fontSize: 15 },
  lg: { paddingVertical: Spacing.md,  paddingHorizontal: Spacing.lg, fontSize: 16 },
};

const variantMap: Record<ButtonVariant, { bg: string; text: string; borderColor?: string }> = {
  primary:   { bg: Colors.accent,     text: Colors.textInverse },
  secondary: { bg: Colors.surface,    text: Colors.accent, borderColor: Colors.accent },
  ghost:     { bg: 'transparent',     text: Colors.accent },
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  onPress,
  disabled = false,
  loading = false,
  accessibilityLabel,
  label,
}: ButtonProps) {
  const sizeStyle   = sizeMap[size];
  const variantStyle = variantMap[variant];

  const containerStyle: ViewStyle = {
    backgroundColor: disabled ? Colors.textDisabled : variantStyle.bg,
    paddingVertical: sizeStyle.paddingVertical,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    borderRadius: Radii.full,
    borderWidth: variantStyle.borderColor ? 1.5 : 0,
    borderColor: variantStyle.borderColor,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        containerStyle,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text} size="small" />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <TypographyAtom
            variant="body"
            color={variantStyle.text}
            style={{ fontWeight: '700', fontSize: sizeStyle.fontSize }}
          >
            {label}
          </TypographyAtom>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft:  { marginRight: Spacing.xs },
  iconRight: { marginLeft:  Spacing.xs },
});