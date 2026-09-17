/**
 * SAFA — UI Components (Button, IconButton, Chip, Tag, Avatar)
 */

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

// --- Button ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'rose' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-6 py-3.5 rounded-full gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] shadow-sm',
    secondary: 'bg-[#F5F2EC] text-[#1C1917] hover:bg-[#EBE6DE] border border-[#E7E2DC]/60',
    rose: 'bg-[#F5EBE6] text-[#6E4B3E] hover:bg-[#EEDFD8] border border-[#E8D5CE]/80',
    ghost: 'bg-transparent text-[#57534E] hover:bg-[#F5F2EC] hover:text-[#1C1917]',
    outline: 'bg-transparent text-[#1C1917] border border-[#D6CEC6] hover:bg-[#FAF8F5]',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}

// --- IconButton ---
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 rounded-full text-xs',
    md: 'w-10 h-10 rounded-full text-sm',
    lg: 'w-12 h-12 rounded-full text-base',
  }[size];

  const variantStyles = {
    primary: 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524]',
    secondary: 'bg-[#F5F2EC] text-[#1C1917] hover:bg-[#EBE6DE] border border-[#E7E2DC]',
    ghost: 'bg-transparent text-[#57534E] hover:bg-[#F5F2EC] hover:text-[#1C1917]',
    rose: 'bg-[#F5EBE6] text-[#6E4B3E] hover:bg-[#EEDFD8]',
  }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center transition-transform active:scale-95 duration-150 cursor-pointer ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}

// --- Chip / Tag ---
export function Tag({
  label,
  color = 'neutral',
  onRemove,
}: {
  label: string;
  color?: 'neutral' | 'rose' | 'gold' | 'sage';
  onRemove?: () => void;
}) {
  const colorStyles = {
    neutral: 'bg-[#F5F2EC] text-[#57534E] border-[#E7E2DC]/80',
    rose: 'bg-[#FBF5F2] text-[#8C5D50] border-[#E8D5CE]',
    gold: 'bg-[#FDFBF7] text-[#8C7350] border-[#E2D5C3]',
    sage: 'bg-[#F4F7F4] text-[#4A6E53] border-[#D0DDD1]',
  }[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded-full border tracking-wide whitespace-nowrap font-normal ${colorStyles}`}
    >
      <span>#{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:text-red-500 ml-0.5 text-xs cursor-pointer"
        >
          ×
        </button>
      )}
    </span>
  );
}

// --- Avatar ---
export function Avatar({
  name = 'Safa',
  size = 'md',
  showStatus = false,
}: {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
}) {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base font-medium',
    xl: 'w-16 h-16 text-lg font-serif-luxury font-medium',
  }[size];

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`${sizeMap} rounded-full bg-gradient-to-br from-[#F5EBE6] to-[#E8D5CE] text-[#5A3A30] flex items-center justify-center font-medium border border-[#FFFFFF] shadow-sm select-none`}
      >
        <span>{initials}</span>
      </div>
      {showStatus && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}
