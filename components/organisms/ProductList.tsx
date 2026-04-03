// ─────────────────────────────────────────────────────────────────────────────
//  components/organisms/ProductList.tsx
//
//  Organism: combines CategoryFilter + ProductCard grid.
//  This is where the "smart" UX props (from hooks) meet the "dumb" UI atoms.
//
//  The organism receives everything as props — it never calls hooks itself.
//  Hooks live in the view layer (views/ShopView.tsx).
//
//  ★ Visual spec: stories/organisms/ProductList.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Colors, Spacing } from '../../tokens/tokens.stylex';
import type { Product } from '../../types';
import { Typography } from '../atoms/Typography';
import { CategoryFilter } from '../molecules/CategoryFilter';
import { ProductCard } from '../molecules/ProductCard';

export interface ProductListProps {
  // ── Data (from UX hooks) ─────────────────────────────────────────────────
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  activeCategory: string;

  // ── Actions (from UX hooks) ──────────────────────────────────────────────
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onProductPress: (product: Product) => void;
  onRefresh: () => void;
  isAddedToCart: (productId: string) => boolean;

  // ── UI config ────────────────────────────────────────────────────────────
  numColumns?: 1 | 2;
}

export function ProductList({
  products,
  loading,
  error,
  categories,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onToggleFavorite,
  onProductPress,
  onRefresh,
  isAddedToCart,
  numColumns = 2,
}: ProductListProps) {
  if (error) {
    return (
      <View style={styles.centered}>
        <Typography variant="heading3" color={Colors.error}>😕 {error}</Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      // Force re-mount when column count changes (RN limitation)
      key={numColumns}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={Colors.accent}
        />
      }
      ListHeaderComponent={
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={onSelectCategory}
        />
      }
      ListEmptyComponent={
        loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={Colors.accent} size="large" />
          </View>
        ) : (
          <View style={styles.centered}>
            <Typography color={Colors.textSecondary}>No products found.</Typography>
          </View>
        )
      }
      renderItem={({ item }) => (
        <View style={[styles.cardWrapper, numColumns === 2 && styles.cardWrapperHalf]}>
          <ProductCard
            product={item}
            layout="vertical"
            isAddedToCart={isAddedToCart(item.id)}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            onPress={onProductPress}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Spacing.xl,
  },
  row: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  cardWrapper: {
    marginBottom: Spacing.md,
  },
  cardWrapperHalf: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    marginTop: Spacing.xxl,
  },
});