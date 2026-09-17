/**
 * SAFA — Form & Search Inputs
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
          <label className="block text-xs font-medium text-[#57534E] tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#8C827D] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-[#FFFFFF] border border-[#E7E2DC] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] placeholder-[#A8A29E] transition-all duration-150 focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/15 ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${error ? 'border-red-400 focus:border-red-500' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#8C827D] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
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
          <label className="block text-xs font-medium text-[#57534E] tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full bg-[#FFFFFF] border border-[#E7E2DC] rounded-xl p-3.5 text-sm text-[#1C1917] placeholder-[#A8A29E] transition-all duration-150 focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/15 resize-y ${
            error ? 'border-red-400 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
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
      <Search className="absolute left-3.5 w-4 h-4 text-[#8C827D] pointer-events-none" />
      <input
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#FFFFFF] border border-[#E7E2DC] rounded-full pl-10 pr-10 py-2.5 text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/15 transition-all shadow-xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-3.5 w-5 h-5 rounded-full bg-[#F5F2EC] text-[#57534E] hover:bg-[#EBE6DE] flex items-center justify-center cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
