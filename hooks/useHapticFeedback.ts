// ─────────────────────────────────────────────────────────────────────────────
//  hooks/useHapticFeedback.ts
//  Owned by: UX/dev team
//  Purpose:  wraps expo-haptics so any component can add haptic feedback
//            without coupling to the library directly.
// ─────────────────────────────────────────────────────────────────────────────

import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { Platform } from 'react-native';

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const styleMap: Record<HapticStyle, () => Promise<void>> = {
  light:   () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium:  () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy:   () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error:   () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};

export function useHapticFeedback() {
  const trigger = useCallback((style: HapticStyle = 'light') => {
    // Haptics only work on physical iOS/Android devices
    if (Platform.OS === 'web') return;
    styleMap[style]?.().catch(() => {
      // silently ignore — haptics are a UX enhancement, never block the UI
    });
  }, []);

  return { trigger };
}