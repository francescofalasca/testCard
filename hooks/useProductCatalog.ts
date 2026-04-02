// ─────────────────────────────────────────────────────────────────────────────
//  hooks/useProductCatalog.ts
//  Owned by: UX/dev team
//  Purpose:  all business logic for the product list — fetching, filtering,
//            favorites toggle. Components stay dumb; only this hook knows
//            how data works.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';

// ── Simulated API call ────────────────────────────────────────────────────────

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium sound with 30h battery life and active noise cancellation.',
    price: 299.99,
    currency: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    rating: 4.7,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Minimalist Leather Watch',
    description: 'Handcrafted Italian leather strap with sapphire crystal glass.',
    price: 189.00,
    currency: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Accessories',
    rating: 4.5,
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Mechanical Keyboard TKL',
    description: 'Tenkeyless layout with Cherry MX switches and RGB backlight.',
    price: 149.00,
    currency: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    category: 'Electronics',
    rating: 4.3,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Bamboo Yoga Mat',
    description: 'Eco-friendly non-slip mat with alignment lines, 6mm cushioning.',
    price: 64.90,
    currency: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'Sport',
    rating: 4.8,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Ceramic Pour-Over Coffee Set',
    description: 'Handmade dripper with carafe and filters. Barista quality at home.',
    price: 78.00,
    currency: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    category: 'Kitchen',
    rating: 4.6,
    isFavorite: true,
  },
];

async function fetchProducts(_category?: string): Promise<Product[]> {
  // Simulates network delay
  await new Promise(r => setTimeout(r, 800));
  if (_category && _category !== 'All') {
    return MOCK_PRODUCTS.filter(p => p.category === _category);
  }
  return MOCK_PRODUCTS;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useProductCatalog() {
  const [products, setProducts]           = useState<Product[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery]     = useState('');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))],
    [],
  );

  const load = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(category);
      setProducts(data);
    } catch {
      setError('Could not load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(activeCategory); }, [activeCategory, load]);

  const selectCategory = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  return {
    // state
    products: filteredProducts,
    loading,
    error,
    activeCategory,
    categories,
    searchQuery,
    // actions
    selectCategory,
    toggleFavorite,
    setSearchQuery,
    refresh: () => load(activeCategory),
  };
}