/**
 * SAFA — Segmented Control & Tabs
 */

import React from 'react';
import { motion } from 'motion/react';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  className = '',
}: SegmentedControlProps<T>) {
  const padMap = size === 'sm' ? 'p-1' : 'p-1.5';
  const itemPad = size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm';

  return (
    <div
      className={`inline-flex items-center bg-[#F2EDE7] border border-[#E7E0D8]/80 rounded-full ${padMap} ${className}`}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative ${itemPad} rounded-full font-medium transition-colors duration-150 flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap ${
              isSelected ? 'text-[#1C1917]' : 'text-[#78716C] hover:text-[#292524]'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-pill"
                className="absolute inset-0 bg-white rounded-full shadow-xs"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
              {opt.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-semibold ${
                    isSelected ? 'bg-[#F5EBE6] text-[#8C5D50]' : 'bg-[#E7E0D8] text-[#57534E]'
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
