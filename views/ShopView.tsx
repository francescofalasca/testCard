// ─────────────────────────────────────────────────────────────────────────────
//  views/ShopView.tsx
//
//  ★ THE WIRING LAYER ★
//
//  This is the only place where hooks are called and their output is connected
//  to UI components. Neither atoms/molecules/organisms know about hooks;
//  neither hooks know about the component tree.
//
//  Responsibilities of a view:
//    1. Call hooks (data + actions)
//    2. Pass results down as props to organisms / molecules
//    3. Handle navigation (if needed)
//    4. No business logic of its own
//
//  Think of it as a "controller" in classic MVC — thin, declarative, boring.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Navbar } from '../components/molecules/Navbar';
import { ProductList } from '../components/organisms/ProductList';
import { useAddToCart } from '../hooks/useAddToCart';
import { useProductCatalog } from '../hooks/useProductCatalog';
import { Colors } from '../tokens/tokens';
import type { Product } from '../types';

export function ShopView() {
  // ── UX hooks ─────────────────────────────────────────────────────────────
  const catalog = useProductCatalog();
  const cart    = useAddToCart();

  // ── Event handlers (thin glue, no logic) ────────────────────────────────
  const handleProductPress = (product: Product) => {
    // In a real app: navigation.navigate('ProductDetail', { id: product.id })
    console.log('Navigate to product:', product.id);
  };

  const handleCartPress = () => {
    // navigation.navigate('Cart')
    console.log('Open cart', cart.totalItems, 'items');
  };

  const handleSearchPress = () => {
    // navigation.navigate('Search')
    console.log('Open search');
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root}>
      {/* Organism: Navbar — wired to cart state */}
      <Navbar
        title="Shop"
        cartCount={cart.totalItems}
        onCartPress={handleCartPress}
        onSearchPress={handleSearchPress}
      />

      {/* Organism: ProductList — wired to catalog + cart state */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});