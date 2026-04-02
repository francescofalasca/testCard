// ─────────────────────────────────────────────────────────────────────────────
//  tokens.ts  —  owned by the UI/Storybook team
//  All visual decisions live here. UX team never touches this file.
// ─────────────────────────────────────────────────────────────────────────────

export const Colors = {
  primary: '#1A1A2E',
  primaryLight: '#16213E',
  accent: '#E94560',
  accentLight: '#FF6B6B',

  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  textPrimary: '#1A1A2E',
  textSecondary: '#6C757D',
  textInverse: '#FFFFFF',
  textDisabled: '#ADB5BD',

  border: '#DEE2E6',
  borderLight: '#F1F3F5',

  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',

  starFilled: '#FFD700',
  starEmpty: '#DEE2E6',

  overlay: 'rgba(0,0,0,0.4)',
} as const;

export const Typography = {
  heading1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  heading2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  heading3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body:     { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption:  { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  price:    { fontSize: 20, fontWeight: '800' as const, lineHeight: 24 },
} as const;

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const;

export const Radii = {
  sm:   6,
  md:   12,
  lg:   20,
  full: 999,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;