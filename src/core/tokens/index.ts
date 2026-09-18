/**
 * SAFA — Obsidian Liquid Glass (SOLG) Unified Design Tokens (Build 02.1)
 * The official and permanent design tokens for the SAFA Personal Life OS.
 * Zero-bloat, velvety obsidian depths, whisper-thin borders, specular rim highlights,
 * diffuse elevation hierarchy, and iPhone-first ergonomics.
 */

export const tokens = {
  // Obsidian Dark Theme Tokens (Primary & Default)
  dark: {
    canvas: {
      base: '#050507',                  // Deepest velvet obsidian backdrop
      surface: '#0E0E13',               // Primary container surface
      surfaceSecondary: '#0B0C11',      // Secondary surface / inset containers
      elevated: '#131318',              // Elevated interactive surface
      cardHover: '#15151B',             // Hover card state
      cardActive: '#1A1A22',            // Pressed card state
      glass: 'rgba(14, 14, 19, 0.52)',  // Frosted liquid glass
      glassSubtle: 'rgba(255, 255, 255, 0.035)', // Micro active cushion
      highlightInset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
    },
    text: {
      primary: '#EDEDEF',               // High-contrast refined silver white
      secondary: '#8E8E98',             // Clean silver neutral (#92929B equivalent)
      muted: '#5C5C68',                 // Subtle muted caption
      subtle: '#454550',                // Darkest caption
      accentCoral: '#F43F5E',           // Subtle live moment indicator dot
      accentEmerald: '#10B981',         // Gentle completion tick
      accentAmber: '#F59E0B',           // Warm focus / project mark
      accentPurple: '#A855F7',          // Insight / memory mark
    },
    border: {
      hairline: 'rgba(255, 255, 255, 0.025)',
      subtle: 'rgba(255, 255, 255, 0.04)',
      medium: 'rgba(255, 255, 255, 0.07)',
      focus: 'rgba(255, 255, 255, 0.25)',
      active: '#EDEDEF',
    },
    shadow: {
      e0: 'none',
      e1: '0 2px 8px -1px rgba(0, 0, 0, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
      e2: '0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
      e3: '0 16px 36px -6px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      e4: '0 24px 56px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
    },
  },

  // Pure Matte Light Theme Tokens (Calm porcelain companion)
  light: {
    canvas: {
      base: '#F5F5F8',
      surface: '#FFFFFF',
      surfaceSecondary: '#F8F8FA',
      elevated: '#FFFFFF',
      cardHover: '#F9F9FB',
      cardActive: '#F0F0F4',
      glass: 'rgba(255, 255, 255, 0.65)',
      glassSubtle: 'rgba(0, 0, 0, 0.03)',
      highlightInset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#111116',
      secondary: '#646470',
      muted: '#9494A0',
      subtle: '#B5B5BE',
      accentCoral: '#E11D48',
      accentEmerald: '#059669',
      accentAmber: '#D97706',
      accentPurple: '#7C3AED',
    },
    border: {
      hairline: 'rgba(0, 0, 0, 0.03)',
      subtle: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.08)',
      focus: 'rgba(0, 0, 0, 0.35)',
      active: '#111116',
    },
    shadow: {
      e0: 'none',
      e1: '0 2px 6px 0 rgba(0, 0, 0, 0.02), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
      e2: '0 6px 18px -4px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
      e3: '0 12px 28px -6px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 1)',
      e4: '0 20px 42px -8px rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 1)',
    },
  },

  // Geometry & Radii Tokens (iOS 18+ smooth curves)
  radius: {
    pill: '9999px',
    sheet: '32px',
    cardLg: '26px',
    cardMd: '20px',
    cardSm: '14px',
    button: '9999px',
    iconCircle: '9999px',
  },

  // Motion Transitions (Tactile, smooth spring-based)
  spring: {
    snappy: { type: 'spring', stiffness: 480, damping: 32 },
    gentle: { type: 'spring', stiffness: 380, damping: 28 },
    fluid: { type: 'spring', stiffness: 320, damping: 24 },
  },
};

