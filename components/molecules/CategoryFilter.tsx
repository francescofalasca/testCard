// ─────────────────────────────────────────────────────────────────────────────
//  components/molecules/CategoryFilter.tsx
//
//  Horizontal scrollable pill-filter row.
//  UI: activeColor, inactiveColor, pill shape
//  UX: categories list, activeCategory, onSelect
//
//  ★ Visual spec: stories/molecules/CategoryFilter.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Colors, Radii, Spacing } from '../../tokens/tokens.stylex';
import { Typography } from '../atoms/Typography';

export interface CategoryFilterProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
  activeColor?: string;
  inactiveColor?: string;

  // ── UX ──────────────────────────────────────────────────────────────────────
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({
  activeColor = Colors.accent,
  inactiveColor = Colors.surface,
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map(cat => {
        const isActive = cat === activeCategory;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            style={[
              styles.pill,
              {
                backgroundColor: isActive ? activeColor : inactiveColor,
                borderColor: isActive ? activeColor : Colors.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Typography
              variant="caption"
              color={isActive ? Colors.textInverse : Colors.textSecondary}
              style={{ fontWeight: isActive ? '700' : '400' }}
            >
              {cat}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.full,
    borderWidth: 1.5,
  },
});