/**
 * SAFA — Centralized Design Token System
 * Minimal Luxury, Soft Rose & Warm Gold Accents, Refined Neutrality.
 */

export const tokens = {
  colors: {
    canvas: {
      primary: '#FAF8F5',      // Warm white / fine ivory
      secondary: '#F5F2EC',    // Soft warm secondary surface
      card: '#FFFFFF',         // Pure clean card
      glass: 'rgba(255, 255, 255, 0.72)',
      glassBorder: 'rgba(235, 226, 220, 0.8)',
      dark: '#1C1917',
    },
    text: {
      primary: '#1C1917',      // Deep charcoal / stone-900
      secondary: '#57534E',    // Warm stone-600
      muted: '#8C827D',        // Soft stone-400
      subtle: '#A8A29E',       // Light stone-400
      inverted: '#FAF8F5',
    },
    accent: {
      rose: '#E8D5CE',         // Soft feminine rose
      roseLight: '#F7EFEA',    // Very subtle blush
      roseDark: '#B28779',     // Deep antique rose
      gold: '#C5A880',         // Refined subtle warm gold
      goldLight: '#F9F6F0',    // Pale gold wash
      charcoal: '#292524',     // Dark accent
      success: '#4A7C59',      // Calm sage green
      warning: '#C88D3D',      // Warm amber
      info: '#647D8F',         // Slate blue
    },
    border: {
      subtle: '#F0ECE8',
      light: '#E7E2DC',
      medium: '#D6CEC6',
      focus: '#C5A880',
    },
  },
  typography: {
    fontFamily: {
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      serif: "'Cormorant Garamond', Georgia, serif",
      persian: "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 4px 20px -2px rgba(44, 38, 35, 0.04), 0 2px 6px -1px rgba(44, 38, 35, 0.02)',
    elevated: '0 12px 32px -4px rgba(44, 38, 35, 0.07), 0 4px 12px -2px rgba(44, 38, 35, 0.03)',
    floating: '0 20px 45px -8px rgba(44, 38, 35, 0.12), 0 6px 16px -3px rgba(44, 38, 35, 0.04)',
  },
  motion: {
    springFast: { type: 'spring', stiffness: 400, damping: 30 },
    springSmooth: { type: 'spring', stiffness: 300, damping: 25 },
    easeOut: [0.16, 1, 0.3, 1],
  },
};

export default tokens;
