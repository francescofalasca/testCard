// ─────────────────────────────────────────────────────────────────────────────
//  components/molecules/ProductCard.tsx
//
//  This molecule composes atoms (ProductImage, Typography, Badge, StarRating,
//  Button) into a card layout.
//
//  ┌─────────────────────────────────┐
//  │  UI props  → shape / style      │  owned by UI team
//  │  UX props  → callbacks / state  │  owned by dev team, injected via hooks
//  └─────────────────────────────────┘
//
//  The component itself knows nothing about *how* cart/favorites work —
//  that lives in useProductCatalog & useAddToCart.
//
//  ★ Visual spec: stories/molecules/ProductCard.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, Radii, Shadows, Spacing } from '../../tokens/tokens';
import type { Product } from '../../types';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { ProductImage } from '../atoms/ProductImage';
import { Typography } from '../atoms/Typography';

export interface ProductCardProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
  /** 'vertical' = tall card (default); 'horizontal' = wide row card */
  layout?: 'vertical' | 'horizontal';
  showBadge?: boolean;
  showRating?: boolean;

  // ── UX ──────────────────────────────────────────────────────────────────────
  product: Product;
  isAddedToCart?: boolean;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  onPress?: (product: Product) => void;
}

export function ProductCard({
  layout = 'vertical',
  showBadge = true,
  showRating = true,
  product,
  isAddedToCart = false,
  onAddToCart,
  onToggleFavorite,
  onPress,
}: ProductCardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <Pressable
      onPress={() => onPress?.(product)}
      style={({ pressed }) => [
        styles.card,
        isHorizontal && styles.cardHorizontal,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.title}`}
    >
      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <ProductImage
        uri={product.imageUrl}
        size={isHorizontal ? { width: 110, height: 110 } : { width: '100%' as any, height: 180 }}
        borderRadius={isHorizontal ? Radii.md : 0}
        accessibilityLabel={product.title}
      />

      {/* ── Favorite button ─────────────────────────────────────────────────── */}
      <Pressable
        onPress={() => onToggleFavorite?.(product.id)}
        style={styles.favoriteBtn}
        hitSlop={8}
        accessibilityLabel={product.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Typography style={styles.heartIcon}>
          {product.isFavorite ? '❤️' : '🤍'}
        </Typography>
      </Pressable>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <View style={[styles.body, isHorizontal && styles.bodyHorizontal]}>
        {showBadge && <Badge label={product.category} />}

        <Typography variant="heading3" numberOfLines={2} style={{ marginTop: Spacing.xs }}>
          {product.title}
        </Typography>

        {/* {showRating && <StarRating value={product.rating} style={{ marginTop: Spacing.xs }} />} */}

        <View style={styles.footer}>
          <Typography variant="price" color={Colors.accent}>
            {product.currency} {product.price.toFixed(2)}
          </Typography>
          <Button
            label={isAddedToCart ? '✓ Added' : 'Add to cart'}
            variant={isAddedToCart ? 'secondary' : 'primary'}
            size="sm"
            onPress={() => onAddToCart?.(product)}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    overflow: 'hidden',
    ...Shadows.card,
  },
  cardHorizontal: {
    flexDirection: 'row',
  },
  cardPressed: {
    opacity: 0.93,
  },
  favoriteBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radii.full,
    padding: Spacing.xs,
    ...Shadows.card,
  },
  heartIcon: {
    fontSize: 16,
    lineHeight: 20,
  },
  body: {
    padding: Spacing.md,
  },
  bodyHorizontal: {
    flex: 1,
    paddingLeft: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
});