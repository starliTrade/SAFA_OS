/**
 * SAFA — Unified Tactile Controls (Button, IconButton, Tag, Avatar)
 * High-craft, velvety cohesion, soft satin active states.
 */

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { X } from 'lucide-react';

// --- Button ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white-pill' | 'dark-pill' | 'ghost' | 'outline' | 'rose';
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.97]';

  const sizeStyles = {
    xs: 'text-[11px] px-2.5 py-1 rounded-full gap-1',
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full gap-2',
    lg: 'text-base px-6 py-3 rounded-full gap-2.5',
  }[size];

  const variantStyles = {
    // Soft satin white pill (harmonious contrast, not harsh glare)
    'white-pill':
      'bg-[#EBEBEF] text-[#0C0C0E] font-semibold hover:bg-[#F5F5F8] shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-white/20',
    // Velvety obsidian dark pill
    'dark-pill':
      'bg-[#16161B] text-[#D4D4D8] hover:bg-[#1C1C22] hover:text-white border border-white/[0.06] shadow-xs',
    primary:
      'bg-[#EBEBEF] text-[#0C0C0E] hover:bg-[#F5F5F8] shadow-xs border border-white/10 font-medium',
    secondary:
      'bg-[#16161B] text-[#D4D4D8] hover:bg-[#1C1C22] hover:text-white border border-white/[0.06] shadow-xs',
    ghost:
      'bg-transparent text-[#92929B] hover:bg-white/[0.04] hover:text-[#EDEDEF]',
    outline:
      'bg-transparent text-[#D4D4D8] border border-white/[0.08] hover:bg-white/[0.04]',
    rose:
      'bg-[#18181F] text-[#D4C5B9] hover:bg-[#20202A] border border-white/[0.07]',
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
  variant?: 'primary' | 'secondary' | 'white' | 'ghost' | 'rose';
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 sm:w-10 sm:h-10 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  const variantStyles = {
    white: 'bg-[#EBEBEF] text-[#0C0C0E] hover:bg-[#F5F5F8] shadow-sm',
    primary: 'bg-[#EBEBEF] text-[#0C0C0E] hover:bg-[#F5F5F8] shadow-sm',
    secondary: 'bg-[#16161B] text-[#D4D4D8] hover:bg-[#1E1E26] border border-white/[0.06]',
    ghost: 'bg-transparent text-[#92929B] hover:bg-white/[0.04] hover:text-[#EDEDEF]',
    rose: 'bg-[#18181F] text-[#D4C5B9] hover:bg-[#20202A] border border-white/[0.07]',
  }[variant];

  return (
    <button
      type="button"
      className={`rounded-full inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none active:scale-90 ${sizeStyles} ${variantStyles} ${className}`}
      title={label}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}

// --- Tag / Badge ---
interface TagProps {
  children?: ReactNode;
  label?: string;
  variant?: 'neutral' | 'amber' | 'purple' | 'green' | 'red' | 'rose';
  color?: 'neutral' | 'amber' | 'purple' | 'green' | 'red' | 'rose';
  size?: 'sm' | 'md';
  onRemove?: () => void;
  className?: string;
}

export function Tag({
  children,
  label,
  variant,
  color,
  size = 'sm',
  onRemove,
  className = '',
}: TagProps) {
  const effectiveVariant = variant || color || 'neutral';
  const sizeStyle = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';
  
  const variantStyle = {
    neutral: 'bg-white/[0.04] text-[#A1A1AA] border border-white/[0.06]',
    amber: 'bg-amber-400/[0.08] text-amber-300/90 border border-amber-400/20 font-medium',
    purple: 'bg-purple-400/[0.08] text-purple-300/90 border border-purple-400/20 font-medium',
    green: 'bg-emerald-400/[0.08] text-emerald-300/90 border border-emerald-400/20 font-medium',
    red: 'bg-rose-400/[0.08] text-rose-300/90 border border-rose-400/20 font-medium',
    rose: 'bg-white/[0.05] text-[#D4C5B9] border border-white/[0.07] font-medium',
  }[effectiveVariant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full tracking-tight whitespace-nowrap ${sizeStyle} ${variantStyle} ${className}`}
    >
      <span>{children || label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:text-white transition-colors p-0.5"
        >
          <X className="w-2.5 h-2.5" />
        </button>
      )}
    </span>
  );
}

// --- Avatar ---
interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline';
  className?: string;
}

export function Avatar({
  name = 'Safa',
  src,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  const sizeStyle = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base font-semibold',
  }[size];

  const initial = name ? name.charAt(0).toUpperCase() : 'S';

  return (
    <div className="relative inline-block shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`rounded-full object-cover ring-1 ring-white/10 ${sizeStyle} ${className}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={`rounded-full bg-[#1A1A20] text-[#D4D4D8] flex items-center justify-center font-medium ring-1 ring-white/10 ${sizeStyle} ${className}`}
        >
          {initial}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-[#0B0B0D] ${
            status === 'online' ? 'bg-emerald-400' : 'bg-zinc-500'
          } ${size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'}`}
        />
      )}
    </div>
  );
}
