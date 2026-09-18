/**
 * SAFA — Reusable Premium Surfaces & Materials
 * Replaces generic white cards with a sophisticated material hierarchy.
 */

import React, { ReactNode, HTMLAttributes } from 'react';

export type SurfaceVariant =
  | 'surface'         // Material 1: Soft warm surface
  | 'elevated'        // Material 2: Elevated clean surface with diffuse shadow
  | 'glass'           // Material 3: True translucent glass
  | 'hero'            // Material 4: Subtle blush/champagne luxury wash
  | 'timeline'        // Minimal timeline track surface
  | 'compact'         // High-density quiet surface
  | 'flat'            // Neutral subtle background
  | 'outline'         // Border only, no fill
  | 'roseWash'        // Delicate rose accent
  | 'goldWash';       // Delicate gold accent

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: SurfaceVariant;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  interactive?: boolean;
}

export function Surface({
  children,
  variant = 'surface',
  rounded = '2xl',
  padding = 'md',
  hoverable = false,
  interactive = false,
  className = '',
  ...props
}: SurfaceProps) {
  const roundMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }[rounded];

  const padMap = {
    none: 'p-0',
    xs: 'p-2 sm:p-2.5',
    sm: 'p-3 sm:p-3.5',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-7',
    xl: 'p-7 sm:p-9',
  }[padding];

  const variantMap = {
    surface: 'material-soft',
    elevated: 'material-elevated',
    glass: 'material-glass',
    hero: 'material-hero',
    timeline: 'bg-[#F9F6F1] border-l-2 border-[#C5A880] p-3',
    compact: 'bg-white/80 border border-black/[0.04] p-2.5',
    flat: 'bg-[#F5F1EB] border-transparent',
    outline: 'bg-transparent border border-black/[0.08]',
    roseWash: 'bg-[#FAF4F2] border border-[#E2CECB]/70',
    goldWash: 'bg-[#FAF7F0] border border-[#EDE3D3]/80',
  }[variant];

  const hoverStyle = hoverable || interactive
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-e2 cursor-pointer active:scale-[0.99]'
    : '';

  return (
    <div
      className={`${roundMap} ${padMap} ${variantMap} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Backward-compatible alias
export const Card = Surface;

export function GlassSurface({
  children,
  className = '',
  ...props
}: SurfaceProps) {
  return (
    <Surface variant="glass" rounded="2xl" padding="md" className={className} {...props}>
      {children}
    </Surface>
  );
}

export const GlassCard = GlassSurface;

export function ElevatedSurface({
  children,
  className = '',
  ...props
}: SurfaceProps) {
  return (
    <Surface variant="elevated" rounded="2xl" padding="md" className={className} {...props}>
      {children}
    </Surface>
  );
}

export function HeroSurface({
  children,
  className = '',
  ...props
}: SurfaceProps) {
  return (
    <Surface variant="hero" rounded="3xl" padding="lg" className={className} {...props}>
      {children}
    </Surface>
  );
}
