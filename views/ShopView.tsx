// ─────────────────────────────────────────────────────────────────────────────
//  views/ShopView.tsx
//
//  DIFFERENZA CHIAVE rispetto alla versione RN:
//
//  Il tema viene applicato al root con css.createTheme() + style prop.
//  Tutti i componenti figli ereditano automaticamente le CSS vars.
//  Per il dark mode basta swappare `defaultTheme` con `darkTheme`.
//
//  data-layoutconformance="strict" abilita il layout W3C-conforme su native.
//
//  Il resto della view è identico — hook e wiring non cambiano.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { css, html } from 'react-strict-dom';
import { Navbar } from '../components/molecules/Navbar';
import { ProductList } from '../components/organisms/ProductList';
import { useAddToCart } from '../hooks/useAddToCart';
import { useProductCatalog } from '../hooks/useProductCatalog';
import { darkTheme, defaultTheme, vars } from '../tokens/tokens.stylex';
import type { Product } from '../types';

const styles = css.create({
  root: {
    flex: 1,
    backgroundColor: vars.colorBackground,
    minHeight: '100vh',
  },
});

interface ShopViewProps {
  /** Passa darkTheme per il dark mode — zero altri cambiamenti necessari */
  colorScheme?: 'light' | 'dark';
}

export function ShopView({ colorScheme = 'light' }: ShopViewProps) {
  const catalog = useProductCatalog();
  const cart    = useAddToCart();

  const handleProductPress = (product: Product) => {
    console.log('Navigate to product:', product.id);
  };

  const theme = colorScheme === 'dark' ? darkTheme : defaultTheme;

  return (
    // Il tema viene applicato qui: tutti i css.create() figli usano le stesse vars
    // data-layoutconformance="strict" = layout W3C su native
    <html.div
        style={[theme as any, styles.root]}
    >
    <Navbar
        title="Shop"
        cartCount={cart.totalItems}
        onCartPress={() => console.log('Open cart')}
        onSearchPress={() => console.log('Open search')}
    />
    <ProductList
        products={catalog.products}
        loading={catalog.loading}
        error={catalog.error}
        categories={catalog.categories}
        activeCategory={catalog.activeCategory}
        onSelectCategory={catalog.selectCategory}
        onAddToCart={cart.addToCart}
        onToggleFavorite={catalog.toggleFavorite}
        onProductPress={handleProductPress}
        onRefresh={catalog.refresh}
        isAddedToCart={cart.isJustAdded}
    />
    </html.div>
  );
}