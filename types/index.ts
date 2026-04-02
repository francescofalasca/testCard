// ─── Domain types ────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  rating: number;
  isFavorite: boolean;
}

// ─── Design tokens (owned by UI/Storybook team) ──────────────────────────────

export type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'caption'
  | 'price';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';