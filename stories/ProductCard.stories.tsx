// ─────────────────────────────────────────────────────────────────────────────
//  stories/molecules/ProductCard.stories.tsx
//  Owned by: UI / Storybook team
//
//  Key insight: the story passes static/mock props — no hooks are called here.
//  The UI team can style the card in isolation without any business logic.
// ─────────────────────────────────────────────────────────────────────────────

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ProductCard } from '../components/molecules/ProductCard';
import type { Product } from '../types/index';

// ── Shared mock data ──────────────────────────────────────────────────────────

const MOCK_PRODUCT: Product = {
  id: 'story-1',
  title: 'Wireless Noise-Cancelling Headphones',
  description: 'Premium sound with 30h battery and ANC.',
  price: 299.99,
  currency: 'EUR',
  imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  category: 'Electronics',
  rating: 4.7,
  isFavorite: false,
};

const MOCK_PRODUCT_FAVORITE: Product = { ...MOCK_PRODUCT, id: 'story-2', isFavorite: true };
const MOCK_PRODUCT_LONG_TITLE: Product = {
  ...MOCK_PRODUCT,
  id: 'story-3',
  title: 'Super Premium Extra Long Title That Should Be Truncated At Two Lines Maximum',
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  argTypes: {
    layout:        { control: 'radio', options: ['vertical', 'horizontal'] },
    showBadge:     { control: 'boolean' },
    showRating:    { control: 'boolean' },
    isAddedToCart: { control: 'boolean' },
  },
  args: {
    product: MOCK_PRODUCT,
    layout: 'vertical',
    showBadge: true,
    showRating: true,
    isAddedToCart: false,
    // Mock handlers — no real logic needed in Storybook
    onAddToCart: (p) => console.log('add to cart', p.id),
    onToggleFavorite: (id) => console.log('toggle favorite', id),
    onPress: (p) => console.log('press', p.id),
  },
  decorators: [
    Story => (
      <View style={{ padding: 16, maxWidth: 240 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const AddedToCart: Story = {
  args: { isAddedToCart: true },
};

export const WithFavorite: Story = {
  args: { product: MOCK_PRODUCT_FAVORITE },
};

export const HorizontalLayout: Story = {
  args: { layout: 'horizontal' },
  decorators: [
    Story => (
      <View style={{ padding: 16, width: 360 }}>
        <Story />
      </View>
    ),
  ],
};

export const LongTitle: Story = {
  args: { product: MOCK_PRODUCT_LONG_TITLE },
};

/** The full grid as it will appear in ProductList */
export const TwoColumnGrid: Story = {
  render: () => (
    <View style={{ padding: 16, flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
      {[MOCK_PRODUCT, MOCK_PRODUCT_FAVORITE, MOCK_PRODUCT_LONG_TITLE].map((p, i) => (
        <View key={i} style={{ width: 170 }}>
          <ProductCard
            product={p}
            onAddToCart={p => console.log('add', p.id)}
            onToggleFavorite={id => console.log('fav', id)}
            onPress={p => console.log('press', p.id)}
          />
        </View>
      ))}
    </View>
  ),
  decorators: [Story => <View style={{ width: 380 }}><Story /></View>],
};