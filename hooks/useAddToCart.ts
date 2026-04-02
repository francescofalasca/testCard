// ─────────────────────────────────────────────────────────────────────────────
//  hooks/useAddToCart.ts
//  Owned by: UX/dev team
//  Purpose:  cart logic fully decoupled from the Button/Card UI.
//            The ProductCard molecule calls this hook; it doesn't need to know
//            how cart state works.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useState } from 'react';
import type { Product } from '../types';
import { useHapticFeedback } from './useHapticFeedback';

interface CartItem extends Product {
  quantity: number;
}

// In a real app this would be a global store (Zustand, Redux, Context…).
// Here we keep it local to demonstrate the hook pattern in isolation.
export function useAddToCart() {
  const [cart, setCart]     = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const { trigger } = useHapticFeedback();

  const addToCart = useCallback((product: Product) => {
    trigger('success');
    setLastAdded(product.id);

    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Reset "just added" indicator after 1.5 s
    setTimeout(() => setLastAdded(null), 1500);
  }, [trigger]);

  const removeFromCart = useCallback((productId: string) => {
    trigger('light');
    setCart(prev => prev.filter(i => i.id !== productId));
  }, [trigger]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const isJustAdded = useCallback(
    (productId: string) => lastAdded === productId,
    [lastAdded],
  );

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    isJustAdded,
  };
}