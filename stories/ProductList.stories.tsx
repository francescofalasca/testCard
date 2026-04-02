// ─────────────────────────────────────────────────────────────────────────────
//  stories/organisms/ProductList.stories.tsx
//  Owned by: UI / Storybook team
//
//  Stories for the full ProductList organism.
//  All UX callbacks are replaced with action loggers — no hooks here.
// ─────────────────────────────────────────────────────────────────────────────

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ProductList } from '../components/organisms/ProductList';
import type { Product } from '../types/index';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', title: 'Wireless Headphones', description: '', price: 299.99,
    currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics', rating: 4.7, isFavorite: false,
  },
  {
    id: '2', title: 'Leather Watch', description: '', price: 189.00,
    currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Accessories', rating: 4.5, isFavorite: true,
  },
  {
    id: '3', title: 'Mechanical Keyboard', description: '', price: 149.00,
    currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    category: 'Electronics', rating: 4.3, isFavorite: false,
  },
  {
    id: '4', title: 'Bamboo Yoga Mat', description: '', price: 64.90,
    currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'Sport', rating: 4.8, isFavorite: false,
  },
];

const noop = () => {};

const meta: Meta<typeof ProductList> = {
  title: 'Organisms/ProductList',
  component: ProductList,
  args: {
    products: MOCK_PRODUCTS,
    loading: false,
    error: null,
    categories: ['All', 'Electronics', 'Accessories', 'Sport'],
    activeCategory: 'All',
    onSelectCategory: noop,
    onAddToCart: noop,
    onToggleFavorite: noop,
    onProductPress: noop,
    onRefresh: noop,
    isAddedToCart: () => false,
    numColumns: 2,
  },
  decorators: [
    Story => <View style={{ height: 700 }}><Story /></View>,
  ],
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const Default: Story = {};

export const SingleColumn: Story = {
  args: { numColumns: 1 },
};

export const LoadingState: Story = {
  args: { products: [], loading: true },
};

export const ErrorState: Story = {
  args: {
    products: [],
    loading: false,
    error: 'Could not load products. Please try again.',
  },
};

export const EmptyResults: Story = {
  args: { products: [], loading: false },
};

/** Shows "Added" state on first item */
export const WithCartFeedback: Story = {
  args: { isAddedToCart: (id: string) => id === '1' },
};