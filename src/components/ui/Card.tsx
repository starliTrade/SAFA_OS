/**
 * SAFA — Cards & Glass Surfaces
 */

import React, { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'elevated' | 'flat' | 'glass' | 'roseWash' | 'goldWash' | 'outline';
  rounded?: 'xl' | '2xl' | '3xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export function Card({
  children,
  variant = 'elevated',
  rounded = '2xl',
  padding = 'md',
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  const roundMap = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  }[rounded];

  const padMap = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  }[padding];

  const variantStyles = {
    elevated: 'bg-white border border-[#F0ECE8] subtle-shadow',
    flat: 'bg-[#F7F4EE] border border-[#ECE6DE]/80',
    glass: 'luxury-glass shadow-xs',
    roseWash: 'bg-[#FBF6F3] border border-[#F0E4DE]/90',
    goldWash: 'bg-[#FAF8F2] border border-[#EDE5D6]/90',
    outline: 'bg-transparent border border-[#E7E2DC]',
  }[variant];

  const hoverStyle = hoverable
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer'
    : '';

  return (
    <div className={`${roundMap} ${padMap} ${variantStyles} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function GlassCard({
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <Card variant="glass" rounded="2xl" padding="md" className={className} {...props}>
      {children}
    </Card>
  );
}
