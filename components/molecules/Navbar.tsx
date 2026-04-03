// ─────────────────────────────────────────────────────────────────────────────
//  components/molecules/Navbar.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { css, html } from 'react-strict-dom';
import { vars } from '../../tokens/tokens.stylex';

export interface NavbarProps {
  title?: string;
  backgroundColor?: string;
  cartCount?: number;
  onCartPress?: () => void;
  onSearchPress?: () => void;
}

const styles = css.create({
  wrapper: {
    backgroundColor: vars.colorPrimary,
    // position: sticky è CSS standard — in RN non esiste, richiedeva workaround
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  container: {
    height: '56px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: vars.space3,
    paddingRight: vars.space3,
  },
  title: {
    fontSize: vars.fontSize2xl,
    fontWeight: '700',
    color: vars.colorTextInverse,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vars.space2,
  },
  iconBtn: {
    position: 'relative',
    padding: vars.space1,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '22px',
    color: vars.colorTextInverse,
    // Hover dichiarativo — no JS
    opacity: {
      default: 1,
      ':hover': 0.75,
    },
  },
  badge: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: vars.colorAccent,
    borderRadius: vars.radiusFull,
    minWidth: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  badgeText: {
    fontSize: '10px',
    fontWeight: '700',
    color: vars.colorTextInverse,
  },
});

export function Navbar({
  title = 'Shop',
  cartCount = 0,
  onCartPress,
  onSearchPress,
}: NavbarProps) {
  return (
    // html.header è l'elemento semantico corretto per una navbar
    <html.header style={styles.wrapper}>
      <html.div style={styles.container}>
        <html.span style={styles.title}>{title}</html.span>
        <html.div style={styles.actions}>
          <html.button
            onClick={onSearchPress}
            aria-label="Cerca"
            style={styles.iconBtn}
          >
            🔍
          </html.button>
          <html.button
            onClick={onCartPress}
            aria-label={`Carrello, ${cartCount} articoli`}
            style={styles.iconBtn}
          >
            🛒
            {cartCount > 0 && (
              <html.div style={styles.badge} aria-hidden={true}>
                <html.span style={styles.badgeText}>
                  {cartCount > 99 ? '99+' : cartCount}
                </html.span>
              </html.div>
            )}
          </html.button>
        </html.div>
      </html.div>
    </html.header>
  );
}