// tailwind.config.js
import { colors, font, radius, shadows, dropShadows, keyframes, animations } from './src/design/elements';
import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    daisyui,
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--font-primary': font.fontFamily.primary,
          '--font-display': font.fontFamily.display,
          '--font-handwritten': font.fontFamily.handwritten,
          '--font-mono': font.fontFamily.mono,

          // 🏛️ MeritMoon / RexOne Brand Tokens (Single Source of Truth: src/design/elements/colors.ts)
          '--silver': colors.secondary,
          '--emerald': colors.primary,
          '--ruby': colors.ruby,
          '--gold': colors.accent,

          '--silver-bright': colors.secondaryLight,
          '--emerald-bright': colors.primaryLight,
          '--ruby-bright': colors.rubyLight,
          '--gold-bright': colors.accentLight,

          '--silver-dim': colors.secondaryDark,
          '--emerald-dim': colors.primaryDark,
          '--ruby-dim': colors.rubyDark,
          '--gold-dim': colors.accentDark,

          // Gradients
          '--grad-base': `linear-gradient(90deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
          '--grad-base-135': `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
          '--grad-base-diag': `linear-gradient(135deg, ${colors.secondaryLight} 0%, ${colors.secondary} 40%, ${colors.primary} 100%)`,
          '--grad-glow': `linear-gradient(90deg, ${colors.ruby} 0%, ${colors.accent} 100%)`,
          '--grad-glow-135': `linear-gradient(135deg, ${colors.ruby} 0%, ${colors.accent} 100%)`,

          // Backgrounds & Surfaces (derived from colors.night in colors.ts)
          '--bg-deep': colors.night.background,
          '--bg-mid': colors.night.card,
          '--bg-surface': colors.night.surface,

          // Glassmorphism Tokens
          '--bg-glass-card': colors.glass.card,
          '--bg-glass-card-hover': colors.glass.cardHover,
          '--bg-glass-card-lit': 'rgba(12, 32, 56, 0.32)',
          '--bg-glass-nav': colors.glass.nav,
          '--border-glass': colors.glass.border,
          '--border-glass-hover': colors.glass.borderHover,

          // High Contrast Text
          '--text-light': colors.text.night.primary,
          '--text-mid': colors.text.night.secondary,
          '--text-dim': colors.text.night.muted,
          '--text-dimmer': colors.text.day.muted,

          // Borders
          '--border-moss': colors.night.divider,
          '--border-glow': 'rgba(77, 191, 130, 0.35)',
          '--border-emerald': 'rgba(46, 139, 87, 0.35)',

          // Glows
          '--glow-silver': '0 0 24px rgba(200, 216, 192, 0.35), 0 0 60px rgba(200, 216, 192, 0.12)',
          '--glow-emerald': '0 0 24px rgba(46, 139, 87, 0.45), 0 0 60px rgba(46, 139, 87, 0.15)',
          '--glow-ruby': '0 0 24px rgba(194, 75, 90, 0.55), 0 0 60px rgba(194, 75, 90, 0.2)',
          '--glow-gold': '0 0 24px rgba(212, 168, 83, 0.55), 0 0 60px rgba(212, 168, 83, 0.2)',
          '--glow-forest': '0 0 80px rgba(46, 139, 87, 0.2), 0 0 200px rgba(200, 216, 192, 0.06)',

          // Button Glow Tokens
          '--glow-btn-primary': '0 0 14px rgba(46, 139, 87, 0.5), 0 0 28px rgba(26, 82, 53, 0.3)',
          '--glow-btn-primary-hover': `0 0 9px ${colors.primaryLight}, 0 0 20px ${colors.primary}, 0 0 38px rgba(26, 82, 53, 0.8), inset 0 0 11px rgba(255, 255, 255, 0.35)`,
          '--glow-btn-gold': '0 0 14px rgba(212, 168, 83, 0.5), 0 0 28px rgba(122, 90, 32, 0.3)',
          '--glow-btn-gold-hover': `0 0 9px ${colors.accentLight}, 0 0 20px ${colors.accent}, 0 0 38px rgba(122, 90, 32, 0.8), inset 0 0 11px rgba(255, 255, 255, 0.35)`,
          '--glow-btn-ghost-hover': `0 0 10px ${colors.primaryLight}, 0 0 24px rgba(46, 139, 87, 0.45), 0 0 45px rgba(26, 82, 53, 0.25)`,
        },
        ':root, [data-theme="day"]': {
          '--color-primary': colors.day.primary,
          '--color-primary-rgb': colors.day.primaryRgb,
          '--color-primary-light': colors.day.primaryLight,
          '--color-primary-dark': colors.day.primaryDark,
          '--color-glow-white': colors.day.glowWhite,
          '--color-glow-outer': colors.day.glowOuter,
          '--color-glow-outer-rgb': colors.day.glowOuterRgb,
          '--color-primary-content': colors.text.night.primary,
          '--color-secondary': colors.secondary,
          '--color-secondary-content': colors.text.night.primary,
          '--color-accent': colors.accent,
          '--color-accent-content': colors.text.night.primary,
          '--color-base-100': colors.day.background,
          '--color-base-200': colors.day.surface,
          '--color-base-300': colors.day.card,
          '--color-base-content': colors.text.day.primary,
          '--color-base-content-rgb': colors.text.day.primaryRgb,
          '--color-neutral': colors.day.card,
          '--color-neutral-content': colors.text.day.primary,
          '--color-border': colors.day.border,
          '--color-divider': colors.day.divider,
          '--color-info': colors.semantic.info,
          '--color-info-content': colors.text.night.primary,
          '--color-success': colors.semantic.success,
          '--color-success-content': colors.text.night.primary,
          '--color-warning': colors.semantic.warning,
          '--color-warning-content': colors.text.night.primary,
          '--color-error': colors.semantic.error,
          '--color-error-content': colors.text.night.primary,
        },
        '[data-theme="night"]': {
          '--color-primary': colors.night.primary,
          '--color-primary-rgb': colors.night.primaryRgb,
          '--color-primary-light': colors.night.primaryLight,
          '--color-primary-dark': colors.night.primaryDark,
          '--color-glow-white': colors.night.glowWhite,
          '--color-glow-outer': colors.night.glowOuter,
          '--color-glow-outer-rgb': colors.night.glowOuterRgb,
          '--color-primary-content': colors.text.night.primary,
          '--color-secondary': colors.night.primaryLight,
          '--color-secondary-content': colors.text.night.primary,
          '--color-accent': colors.night.primary,
          '--color-accent-content': colors.text.night.primary,
          '--color-base-100': colors.night.background,
          '--color-base-200': colors.night.surface,
          '--color-base-300': colors.night.card,
          '--color-base-content': colors.text.night.primary,
          '--color-base-content-rgb': colors.text.night.primaryRgb,
          '--color-neutral': colors.night.card,
          '--color-neutral-content': colors.text.night.primary,
          '--color-border': colors.night.border,
          '--color-divider': colors.night.divider,
          '--color-info': colors.semantic.info,
          '--color-info-content': colors.text.night.primary,
          '--color-success': colors.semantic.success,
          '--color-success-content': colors.text.night.primary,
          '--color-warning': colors.semantic.warning,
          '--color-warning-content': colors.text.night.primary,
          '--color-error': colors.semantic.error,
          '--color-error-content': colors.text.night.primary,
        },
      });
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
          content: 'var(--color-primary-content)',
        },
        glow: {
          white: 'var(--color-glow-white)',
          outer: 'var(--color-glow-outer)',
        },
        glass: {
          nav: colors.glass.nav,
          card: colors.glass.card,
          'card-hover': colors.glass.cardHover,
          form: colors.glass.form,
          project: colors.glass.project,
          'project-hover': colors.glass.projectHover,
          border: colors.glass.border,
          'border-hover': colors.glass.borderHover,
          tag: colors.glass.tag,
          'tag-bg': colors.glass.tagBg,
          'tag-bg-hover': colors.glass.tagBgHover,
        },
      },
      fontFamily: {
        ...font.fontFamily,
        sans: [font.fontFamily.primary],
        mono: [font.fontFamily.mono],
      },
      fontWeight: font.fontWeight,
      fontSize: font.fontSize,
      borderRadius: radius,
      boxShadow: shadows,
      dropShadow: dropShadows,
      keyframes: keyframes,
      animation: animations,
    },
  },
  daisyui: {
    themes: [
      "day --default",
      "night --prefersdark",
    ],
    base: true,
    styled: true,
    utils: true,
  },
};