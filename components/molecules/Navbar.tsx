// ─────────────────────────────────────────────────────────────────────────────
//  components/molecules/Navbar.tsx
//
//  Composes Typography + Badge atoms into a top navigation bar.
//  UI: title style, background, height
//  UX: cartCount, onCartPress, onSearchPress
//
//  ★ Visual spec: stories/molecules/Navbar.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Platform, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../tokens/tokens';
import { Typography } from '../atoms/Typography';

export interface NavbarProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
  title?: string;
  backgroundColor?: string;

  // ── UX ──────────────────────────────────────────────────────────────────────
  cartCount?: number;
  onCartPress?: () => void;
  onSearchPress?: () => void;
}

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 44;

export function Navbar({
  title = 'Shop',
  backgroundColor = Colors.primary,
  cartCount = 0,
  onCartPress,
  onSearchPress,
}: NavbarProps) {
  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <View style={styles.container}>
        {/* Logo / title */}
        <Typography variant="heading2" color={Colors.textInverse}>
          {title}
        </Typography>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            onPress={onSearchPress}
            hitSlop={8}
            style={styles.iconBtn}
            accessibilityLabel="Search"
          >
            <Typography style={styles.icon}>🔍</Typography>
          </Pressable>

          <Pressable
            onPress={onCartPress}
            hitSlop={8}
            style={styles.iconBtn}
            accessibilityLabel={`Cart, ${cartCount} items`}
          >
            <Typography style={styles.icon}>🛒</Typography>
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Typography variant="caption" color={Colors.textInverse} style={{ fontWeight: '700', fontSize: 10 }}>
                  {cartCount > 99 ? '99+' : cartCount}
                </Typography>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: STATUS_BAR_HEIGHT,
    ...Shadows.elevated,
    zIndex: 10,
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBtn: {
    position: 'relative',
    padding: Spacing.xs,
  },
  icon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.accent,
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
});