/**
 * SAFA — Cutting-Edge Obsidian & Tactile Design Tokens (Build 02.0)
 * Inspired by Rituraj Design, Lumina Journey, and Next-Gen iOS 18+ Aesthetics.
 * Pixel-perfect obsidian depths, illuminated progress meters, micro-hairlines,
 * and high-contrast tactile elements.
 */

export const tokens = {
  // Obsidian Dark Theme Tokens (Default & Primary)
  dark: {
    canvas: {
      base: '#09090B',            // Deepest obsidian backdrop
      surface: '#111113',         // Primary container surface
      card: '#161619',            // Elevated interactive card
      cardHover: '#1B1B1F',       // Hover card state
      cardActive: '#222227',      // Pressed card state
      glass: 'rgba(18, 18, 22, 0.82)', // Translucent frosted dock
      insightBg: 'linear-gradient(135deg, rgba(38, 18, 54, 0.85) 0%, rgba(22, 16, 32, 0.95) 100%)', // Lumina purple
      insightBorder: 'rgba(168, 85, 247, 0.28)',
      highlightInset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
    },
    text: {
      primary: '#F4F4F5',         // Crisp bright white
      secondary: '#A1A1AA',       // Clean silver neutral
      muted: '#71717A',           // Subtle zinc
      subtle: '#52525B',          // Dark caption
      accentYellow: '#FACC15',    // Rituraj 79% complete amber/gold
      accentPurple: '#C084FC',    // Lumina insight violet
      accentGreen: '#4ADE80',     // Emerald completion tick
      accentRed: '#F87171',       // Red dot accent
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      medium: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.16)',
      active: '#FFFFFF',
    },
  },

  // Pure Matte Light Theme Tokens (From IMG_7865)
  light: {
    canvas: {
      base: '#F4F4F6',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      cardHover: '#F9F9FB',
      cardActive: '#ECECEF',
      glass: 'rgba(255, 255, 255, 0.88)',
      insightBg: 'linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%)',
      insightBorder: 'rgba(168, 85, 247, 0.25)',
      highlightInset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#111113',
      secondary: '#52525B',
      muted: '#8A8A93',
      subtle: '#A1A1AA',
      accentYellow: '#CA8A04',
      accentPurple: '#9333EA',
      accentGreen: '#16A34A',
      accentRed: '#EF4444',
    },
    border: {
      subtle: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.08)',
      strong: 'rgba(0, 0, 0, 0.14)',
      active: '#111113',
    },
  },

  // Radius Tokens (Consistent iOS 18+ mathematical curves)
  radius: {
    pill: '9999px',
    sheet: '32px',
    cardLg: '24px',
    cardMd: '20px',
    cardSm: '16px',
    button: '9999px',
    iconCircle: '9999px',
  },

  // Motion Transitions
  spring: {
    snappy: { type: 'spring', stiffness: 450, damping: 30 },
    gentle: { type: 'spring', stiffness: 300, damping: 25 },
  },
};
