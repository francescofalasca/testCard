// ─────────────────────────────────────────────────────────────────────────────
//  stories/atoms/Typography.stories.tsx
//  Owned by: UI / Storybook team
// ─────────────────────────────────────────────────────────────────────────────

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Typography } from '../components/atoms/Typography';
import { Colors } from '../tokens/tokens';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: ['heading1', 'heading2', 'heading3', 'body', 'caption', 'price'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    color: { control: 'color' },
  },
  args: {
    children: 'The quick brown fox',
    variant: 'body',
  },
  decorators: [
    Story => <View style={{ padding: 24 }}><Story /></View>,
  ],
};

export default meta;
type Story = StoryObj<typeof Typography>;

/** Interactive playground — use Storybook controls panel */
export const Playground: Story = {};

/** Full type scale at a glance */
export const TypeScale: Story = {
  render: () => (
    <View style={{ padding: 24, gap: 12 }}>
      <Typography variant="heading1">Heading 1 — 28/700</Typography>
      <Typography variant="heading2">Heading 2 — 22/700</Typography>
      <Typography variant="heading3">Heading 3 — 18/600</Typography>
      <Typography variant="body">Body — 14/400  Lorem ipsum dolor sit amet.</Typography>
      <Typography variant="caption" color={Colors.textSecondary}>Caption — 12/400</Typography>
      <Typography variant="price" color={Colors.accent}>€ 299.99</Typography>
    </View>
  ),
};

/** Color variants */
export const Colors_: Story = {
  name: 'Colors',
  render: () => (
    <View style={{ padding: 24, gap: 8 }}>
      <Typography color={Colors.textPrimary}>Primary text</Typography>
      <Typography color={Colors.textSecondary}>Secondary text</Typography>
      <Typography color={Colors.accent}>Accent text</Typography>
      <Typography color={Colors.error}>Error text</Typography>
      <Typography color={Colors.success}>Success text</Typography>
    </View>
  ),
};