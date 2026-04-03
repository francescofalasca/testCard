// ─────────────────────────────────────────────────────────────────────────────
//  components/atoms/ProductImage.tsx
//  UI props:  size, borderRadius, resizeMode
//  UX props:  uri, onLoad, onError
//  ★ Visual spec lives in stories/atoms/ProductImage.stories.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Colors, Radii } from '../../tokens/tokens.stylex';

export interface ProductImageProps {
  // ── UI ──────────────────────────────────────────────────────────────────────
  size?: number | { width: number; height: number };
  borderRadius?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch';

  // ── UX ──────────────────────────────────────────────────────────────────────
  uri: string;
  accessibilityLabel?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ProductImage({
  size = { width: '100%' as any, height: 200 },
  borderRadius = Radii.md,
  resizeMode = 'cover',
  uri,
  accessibilityLabel,
  onLoad,
  onError,
}: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  const dimensions =
    typeof size === 'number' ? { width: size, height: size } : size;

  return (
    <View style={[styles.container, dimensions, { borderRadius }]}>
      {loading && !errored && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color={Colors.accent}
        />
      )}
      {errored ? (
        <View style={[StyleSheet.absoluteFill, styles.placeholder]} />
      ) : (
        <Image
          source={{ uri }}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
          resizeMode={resizeMode}
          accessibilityLabel={accessibilityLabel}
          onLoad={() => { setLoading(false); onLoad?.(); }}
          onError={() => { setLoading(false); setErrored(true); onError?.(); }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.borderLight,
  },
  placeholder: {
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});