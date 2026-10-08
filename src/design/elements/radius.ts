// src/design/elements/radius.ts

/**
 * Border Radius Tokens
 *
 * Soft & gentle radius system matching MeritMoon atomic design system.
 * Cards: 24px, Buttons: 50px pill.
 */

export const radius = {
  xs: "4px",
  sm: "8px",
  md: "12px", // Default
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  card: "24px",
  pill: "50px",
  full: "999px",
} as const;

export type Radius = typeof radius;
export type RadiusKey = keyof typeof radius;
