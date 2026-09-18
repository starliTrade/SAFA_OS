/**
 * SAFA — Unified Velvet Form Inputs (Build 02.1)
 * High-craft tactile inputs matching #131317, micro-hairlines, and calm focus rings.
 */

import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Search, X } from 'lucide-react';

// --- Input ---
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[#92929B] tracking-tight">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#71717A] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-[#131317] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-sm text-[#EDEDEF] placeholder-[#5C5C66] transition-all duration-150 focus:outline-none focus:border-white/[0.16] shadow-inner ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${error ? 'border-rose-500/50 focus:border-rose-500' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#71717A] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// --- Textarea ---
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', rows = 3, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[#92929B] tracking-tight">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full bg-[#131317] border border-white/[0.06] rounded-xl p-3.5 text-sm text-[#EDEDEF] placeholder-[#5C5C66] transition-all duration-150 focus:outline-none focus:border-white/[0.16] resize-y shadow-inner ${
            error ? 'border-rose-500/50 focus:border-rose-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// --- SearchBar ---
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search everything in SAFA...',
  onClear,
  autoFocus,
}: SearchBarProps) {
  return (
    <div className="relative w-full flex items-center">
      <Search className="absolute left-3.5 w-4 h-4 text-[#71717A] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-[#131317] border border-white/[0.06] rounded-full pl-10 pr-10 py-2.5 text-sm text-[#EDEDEF] placeholder-[#5C5C66] focus:outline-none focus:border-white/[0.16] transition-all shadow-inner tracking-tight"
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3.5 p-1 rounded-full text-[#71717A] hover:text-[#EDEDEF] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
