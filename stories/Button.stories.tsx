// ─────────────────────────────────────────────────────────────────────────────
//  stories/atoms/Button.stories.tsx
//
//  Owned by: UI / Storybook team
//  Purpose:  define ALL visual variants of Button.
//            The dev team never needs to touch this file.
//
//  Run with: npx storybook
// ─────────────────────────────────────────────────────────────────────────────

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from '../components/atoms/Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  // argTypes let Storybook render interactive controls in the UI panel
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  // Default args shared by all stories in this file
  args: {
    label: 'Add to cart',
    variant: 'primary',
    size: 'md',
  },
  decorators: [
    Story => (
      <View style={{ padding: 24, gap: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Stories ───────────────────────────────────────────────────────────────────

/** The default call-to-action button */
export const Primary: Story = {
  args: { variant: 'primary' },
};

/** Used alongside a primary action */
export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Save for later' },
};

/** Minimal — for tertiary actions */
export const Ghost: Story = {
  args: { variant: 'ghost', label: 'See details' },
};

/** Disabled state across all variants */
export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button label="Primary"   variant="primary"   disabled />
      <Button label="Secondary" variant="secondary" disabled />
      <Button label="Ghost"     variant="ghost"     disabled />
    </View>
  ),
};

/** Loading / async feedback */
export const Loading: Story = {
  args: { loading: true, label: 'Adding…' },
};

/** Size scale */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button label="Small"  size="sm" />
      <Button label="Medium" size="md" />
      <Button label="Large"  size="lg" />
    </View>
  ),
};