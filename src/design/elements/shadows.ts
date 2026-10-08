// src/design/elements/shadows.ts
import { colors } from "./colors";

/**
 * MeritMoon Design System - Shadow & Glow Tokens
 * Derived from forest moonlight and emerald light source
 */

export const shadows = {
  xs: `0px 1px 3px ${colors.shadows.blackXs}`,
  sm: `0px 2px 6px ${colors.shadows.blackSm}`,
  md: `0px 4px 12px ${colors.shadows.blackMd}`,
  glow: `0px 0px 24px ${colors.shadows.glow}`,
  neon: `0 0 24px rgba(46, 139, 87, 0.45), 0 0 60px rgba(46, 139, 87, 0.15)`,
  "neon-lg": `0 0 14px rgba(46, 139, 87, 0.5), 0 0 28px rgba(26, 82, 53, 0.3), 0 0 50px rgba(200, 216, 192, 0.15)`,
  "glass-card": `0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.16), inset 0 0 24px rgba(200, 216, 192, 0.03)`,
  "glass-hover": `0 20px 50px rgba(0, 0, 0, 0.45), 0 0 25px rgba(77, 191, 130, 0.20), inset 0 1px 1px rgba(255, 255, 255, 0.28)`,
  moonlight: `0 0 24px rgba(200, 216, 192, 0.35), 0 0 60px rgba(200, 216, 192, 0.12)`,
  emerald: `0 0 24px rgba(46, 139, 87, 0.45), 0 0 60px rgba(46, 139, 87, 0.15)`,
  ruby: `0 0 24px rgba(194, 75, 90, 0.55), 0 0 60px rgba(194, 75, 90, 0.2)`,
  gold: `0 0 24px rgba(212, 168, 83, 0.55), 0 0 60px rgba(212, 168, 83, 0.2)`,
} as const;

export const dropShadows = {
  neon: [
    "0 0 4px var(--color-glow-white)",
    "0 0 10px var(--color-primary)",
    "0 0 20px var(--color-primary-dark)",
  ],
  "neon-hover": [
    "0 0 6px var(--color-glow-white)",
    "0 0 14px var(--color-primary-light)",
    "0 0 26px var(--color-primary)",
    "0 0 38px var(--color-primary-dark)",
  ],
  moon: [
    "0 0 24px rgba(255, 255, 255, 0.45)",
    "0 0 60px rgba(200, 216, 192, 0.22)",
  ],
} as const;

export type Shadows = typeof shadows;
export type ShadowKey = keyof typeof shadows;
export type DropShadows = typeof dropShadows;
export type DropShadowKey = keyof typeof dropShadows;
