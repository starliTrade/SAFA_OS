/**
 * SAFA — Unified Velvet Segmented Control (Build 02.1)
 * Seamless dark container matching #111114 with satin pill transitions.
 */

import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../core/context/AppContext';

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
  fullWidth?: boolean;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = true,
  className = '',
}: SegmentedControlProps<T>) {
  const { themeMode } = useApp();
  const isDark = themeMode === 'dark';
  const padMap = size === 'sm' ? 'p-1' : 'p-1.5';
  const itemPad = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm';

  return (
    <div
      className={`${
        fullWidth ? 'w-full flex' : 'inline-flex'
      } items-center rounded-full transition-all overflow-x-auto no-scrollbar ${
        isDark
          ? 'bg-[#0E0E14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.045),0_8px_20px_rgba(0,0,0,0.45)] border border-white/[0.025]'
          : 'bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_2px_10px_rgba(0,0,0,0.03)] border border-black/[0.035]'
      } ${padMap} ${className}`}
    >
      <div className={`flex items-center gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`relative ${itemPad} rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer select-none whitespace-nowrap ${
                fullWidth ? 'flex-1' : ''
              } ${
                isSelected
                  ? isDark
                    ? 'text-black font-semibold'
                    : 'text-white font-semibold'
                  : isDark
                  ? 'text-[#8E8E98] hover:text-white hover:bg-white/[0.03]'
                  : 'text-[#6E6E78] hover:text-[#111116] hover:bg-black/[0.02]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId={`segmented-pill-${options.map((o) => o.value).join('-')}`}
                  className={`absolute inset-0 rounded-full ${
                    isDark
                      ? 'bg-white shadow-[0_2px_10px_rgba(255,255,255,0.15),0_2px_6px_rgba(0,0,0,0.4)]'
                      : 'bg-[#111116] shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                  }`}
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                <span className="tracking-tight">{opt.label}</span>
                {opt.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded-full font-semibold ${
                      isSelected
                        ? isDark
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                        : isDark
                        ? 'bg-white/[0.08] text-[#92929B]'
                        : 'bg-black/[0.06] text-[#6E6E78]'
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
    </div>
  );
}
