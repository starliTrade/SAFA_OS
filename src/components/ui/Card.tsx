/**
 * SAFA — Obsidian Liquid Glass (SOLG) Reusable Surfaces & Card Primitives
 * Authentic layered materials: Canvas -> Surface -> Elevated -> Liquid Glass
 */

import React, { ReactNode, HTMLAttributes } from 'react';

export type SurfaceVariant =
  | 'surface'            // Primary container surface (#0E0E13 / white)
  | 'surfaceSecondary'   // Secondary container surface (#0B0C11)
  | 'elevated'           // Elevated interactive surface (#131318)
  | 'glass'              // Translucent liquid glass with blur
  | 'compact'            // Ultra-compact quiet list container
  | 'flat'               // Clean minimal container without shadow
  | 'outline';           // Pure hairline container

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
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-[22px]',
    '2xl': 'rounded-[26px]',
    '3xl': 'rounded-[32px]',
    full: 'rounded-full',
  }[rounded];

  const padMap = {
    none: 'p-0',
    xs: 'p-2 sm:p-2.5',
    sm: 'p-3 sm:p-3.5',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6',
    xl: 'p-6 sm:p-8',
  }[padding];

  const variantMap = {
    surface:
      'bg-[#0E0E13] dark:bg-[#0E0E13] light:bg-white border border-white/[0.025] dark:border-white/[0.025] light:border-black/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_8px_24px_-4px_rgba(0,0,0,0.5)] light:shadow-[0_4px_16px_rgba(0,0,0,0.03)]',
    surfaceSecondary:
      'bg-[#0B0C11] dark:bg-[#0B0C11] light:bg-[#F8F8FA] border border-white/[0.02] dark:border-white/[0.02] light:border-black/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]',
    elevated:
      'bg-[#131318] dark:bg-[#131318] light:bg-white border border-white/[0.035] dark:border-white/[0.035] light:border-black/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_36px_-6px_rgba(0,0,0,0.65)] light:shadow-[0_8px_24px_rgba(0,0,0,0.05)]',
    glass:
      'bg-[#0E0E13]/55 dark:bg-[#0E0E13]/55 light:bg-white/70 backdrop-blur-2xl border border-white/[0.03] dark:border-white/[0.03] light:border-black/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_18px_40px_-10px_rgba(0,0,0,0.65)]',
    compact:
      'bg-[#0B0C11] dark:bg-[#0B0C11] light:bg-white/90 border border-white/[0.02] dark:border-white/[0.02] light:border-black/[0.03] shadow-sm',
    flat:
      'bg-[#0B0C11]/80 dark:bg-[#0B0C11]/80 light:bg-zinc-100/80 border-transparent',
    outline:
      'bg-transparent border border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.06]',
  }[variant];

  const hoverStyle =
    hoverable || interactive
      ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.7)] cursor-pointer active:scale-[0.99]'
      : '';

  return (
    <div
      className={`relative ${roundMap} ${padMap} ${variantMap} ${hoverStyle} ${className}`}
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

