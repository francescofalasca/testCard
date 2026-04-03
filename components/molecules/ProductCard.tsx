// ─────────────────────────────────────────────────────────────────────────────
//  components/molecules/ProductCard.tsx
//
//  Novità rispetto alla versione RN:
//
//  1. Layout responsive con media queries dichiarative in css.create()
//     — impossibile con StyleSheet di React Native.
//
//  2. Hover state sulla card senza nessun JS:
//     boxShadow: { default: ..., ':hover': ... }
//
//  3. html.img invece di <Image> con loading state gestito
//     tramite attributo HTML loading="lazy".
//
//  La struttura delle props (UI vs UX) rimane identica — il contratto
//  tra i due team non cambia.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { css, html } from 'react-strict-dom';
import { vars } from '../../tokens/tokens.stylex';
import type { Product } from '../../types';
import { Badge, StarRating } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface ProductCardProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
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

const styles = css.create({
  card: {
    backgroundColor: vars.colorSurface,
    borderRadius: vars.radiusMd,
    overflow: 'hidden',
    cursor: 'pointer',
    // ← Hover con box-shadow dichiarativo — zero JS, funziona su web
    boxShadow: {
      default: '0 2px 8px rgba(0,0,0,0.08)',
      ':hover': '0 8px 24px rgba(0,0,0,0.14)',
    },
    transitionDuration: '200ms',
  },
  cardHorizontal: {
    flexDirection: 'row',
  },

  // ← Media query dichiarativa in css.create() — non esiste in StyleSheet RN
  cardResponsive: {
    flexDirection: {
      default: 'column',
      '@media (min-width: 600px)': 'row',
    },
  },

  imageVertical: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',           // proprietà CSS standard — non esiste in RN
  },
  imageHorizontal: {
    width: '110px',
    height: '110px',
    objectFit: 'cover',
    borderRadius: vars.radiusMd,
    flexShrink: 0,
  },

  favoriteBtn: {
    position: 'absolute',
    top: vars.space2,
    right: vars.space2,
    backgroundColor: vars.colorSurface,
    borderRadius: vars.radiusFull,
    padding: vars.space1,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '20px',
    border: 'none',
  },

  body: {
    padding: vars.space3,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space1,
  },
  bodyHorizontal: {
    flex: 1,
    paddingLeft: vars.space2,
  },

  title: {
    fontSize: vars.fontSizeXl,
    fontWeight: '600',
    color: vars.colorTextPrimary,
    // Truncate con CSS — in RN richiedeva numberOfLines su <Text>
    display: '-webkit-box' as any,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as any,
    overflow: 'hidden',
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vars.space3,
  },

  price: {
    fontSize: vars.fontSizePrice,
    fontWeight: '800',
    color: vars.colorAccent,
  },

  // Wrapper relativo per posizionare il bottone favorito
  imageWrapper: {
    position: 'relative',
  },
});

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
    // html.article è semanticamente più corretto di <View> per una card prodotto
    <html.article
      onClick={() => onPress?.(product)}
      aria-label={`Prodotto: ${product.title}`}
      style={[styles.card, isHorizontal && styles.cardHorizontal]}
    >
      <html.div style={styles.imageWrapper}>
        {/* html.img invece di <Image> — loading="lazy" è gratis su web */}
        <html.img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          style={isHorizontal ? styles.imageHorizontal : styles.imageVertical}
        />
        <html.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product.id);
          }}
          aria-label={product.isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          style={styles.favoriteBtn}
        >
          {product.isFavorite ? '❤️' : '🤍'}
        </html.button>
      </html.div>

      <html.div style={[styles.body, isHorizontal && styles.bodyHorizontal]}>
        {showBadge && <Badge label={product.category} />}

        <html.span style={styles.title}>{product.title}</html.span>

        {showRating && <StarRating value={product.rating} />}

        <html.div style={styles.footer}>
          <html.span style={styles.price}>
            {product.currency} {product.price.toFixed(2)}
          </html.span>
          <Button
            label={isAddedToCart ? '✓ Aggiunto' : 'Aggiungi'}
            variant={isAddedToCart ? 'secondary' : 'primary'}
            size="sm"
            onPress={() => onAddToCart?.(product)}
          />
        </html.div>
      </html.div>
    </html.article>
  );
}