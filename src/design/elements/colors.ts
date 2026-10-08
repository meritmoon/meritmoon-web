// src/design/elements/colors.ts

export const colors = {
  // Brand (MeritMoon Forest Moonlit Night Palette)
  primary: "#2E8B57", // Deep forest emerald
  primaryLight: "#4DBF82", // Radiant emerald bright
  primaryDark: "#1A5235", // Deep forest shadow emerald
  secondary: "#C8D8C0", // Silver, moonlight through leaves
  secondaryLight: "#E8F0E0", // Silver bright
  secondaryDark: "#7A8C74", // Silver dim
  accent: "#D4A853", // Warm moonbeam gold
  accentLight: "#F0C870", // Gold bright
  accentDark: "#7A5A20", // Gold dim
  ruby: "#C24B5A", // Twilight bloom / warnings
  rubyLight: "#E87088", // Ruby bright
  rubyDark: "#7A2030", // Ruby dim

  // Moon Glow Colors
  glowWhite: "#FFFFFF",
  glowOuter: "#2E8B57",

  // Shadow color tokens
  shadows: {
    blackXs: "rgba(0, 0, 0, 0.25)",
    blackSm: "rgba(0, 0, 0, 0.30)",
    blackMd: "rgba(0, 0, 0, 0.35)",
    glow: "rgba(46, 139, 87, 0.45)",
    glassCard: "rgba(46, 139, 87, 0.20)",
    glassHover: "rgba(77, 191, 130, 0.35)",
    textDark: "rgba(2, 10, 5, 0.95)",
  },

  // Semantic (Unified across Light & Dark themes)
  semantic: {
    success: "#4DBF82", // Emerald bright
    warning: "#F0C870", // Gold bright
    error: "#E87088", // Ruby bright
    info: "#C8D8C0", // Silver
  },

  // Centralized Text Tokens (Single Source of Truth)
  text: {
    day: {
      primary: "#020A05", // Deep forest night
      primaryRgb: "2, 10, 5",
      secondary: "#1A5235", // Deep emerald
      muted: "#6D856B",
    },
    night: {
      primary: "#F4FAF0", // Pure luminous silver-white
      primaryRgb: "244, 250, 240",
      secondary: "#CADBC6", // Mid silver
      muted: "#8FA78C", // Dim silver
    },
  },

  // Day Theme (White / Light Mode - Crisp Lunar Silver-White & Forest Emerald)
  day: {
    primary: "#2E8B57",
    primaryRgb: "46, 139, 87",
    primaryLight: "#4DBF82",
    primaryDark: "#1A5235",
    background: "#F4FAF0",
    surface: "#FFFFFF",
    card: "#E8F0E0",
    border: "#CADBC6",
    divider: "#E0EBDC",
    textPrimary: "#020A05",
    textSecondary: "#1A5235",
    textMuted: "#6D856B",
    glowWhite: "#FFFFFF",
    glowOuter: "#2E8B57",
    glowOuterRgb: "46, 139, 87",
  },

  // Night Theme (Dark Mode - Forest Night, Deep Ancient Woods)
  night: {
    primary: "#2E8B57",
    primaryRgb: "46, 139, 87",
    primaryLight: "#4DBF82",
    primaryDark: "#1A5235",
    background: "#020A05", // Canvas scaffold / forest floor
    surface: "#071A0D", // Modals, elevated surfaces
    card: "#041209", // Mid-depth forest
    border: "rgba(200, 216, 192, 0.14)", // border-glass
    divider: "rgba(200, 216, 192, 0.10)", // border-moss
    textPrimary: "#F4FAF0", // Primary headings & copy
    textSecondary: "#CADBC6", // Body text
    textMuted: "#8FA78C", // Metadata & captions
    glowWhite: "#FFFFFF",
    glowOuter: "#2E8B57",
    glowOuterRgb: "46, 139, 87",
  },

  // MeritMoon Glassmorphism Tokens
  glass: {
    nav: "rgba(4, 16, 9, 0.65)",
    card: "rgba(6, 22, 13, 0.28)",
    cardHover: "rgba(10, 34, 19, 0.42)",
    form: "rgba(7, 26, 13, 0.55)",
    project: "rgba(6, 22, 13, 0.28)",
    projectHover: "rgba(10, 34, 19, 0.42)",
    border: "rgba(200, 216, 192, 0.14)",
    borderHover: "rgba(77, 191, 130, 0.48)",
    tag: "rgba(46, 139, 87, 0.85)",
    tagBg: "rgba(46, 139, 87, 0.12)",
    tagBgHover: "rgba(46, 139, 87, 0.25)",
  },

  // Centralized Glow & Text Shadow Effects
  effects: {
    heroSign:
      "0 0 14px rgba(46, 139, 87, 0.5), 0 0 28px rgba(26, 82, 53, 0.3)",
    headingGlow:
      "0 0 18px rgba(46, 139, 87, 0.5)",
    cardHeading:
      "0 0 10px rgba(200, 216, 192, 0.35)",
    navActive:
      "0 0 12px var(--color-primary), 0 0 24px rgba(46, 139, 87, 0.45)",
    flickerFull:
      "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px var(--color-primary), 0 0 40px var(--color-primary-dark)",
  },
} as const;

export const BrandColors = {
  PRIMARY: "primary",
  PRIMARY_LIGHT: "primaryLight",
  PRIMARY_DARK: "primaryDark",
  SECONDARY: "secondary",
  ACCENT: "accent",
} as const;

export type BrandColorKey = (typeof BrandColors)[keyof typeof BrandColors];
export type SemanticColorKey = keyof typeof colors.semantic;
export type GlassTokenKey = keyof typeof colors.glass;
export type EffectTokenKey = keyof typeof colors.effects;
