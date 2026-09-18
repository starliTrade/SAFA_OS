/**
 * SAFA — Today's Emotional Moment (Build 03)
 * Daily personal intention, reflection, and quiet inspiration in refined editorial typography.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw, Feather } from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { DAILY_INTENTIONS } from './homeSpotlight';

export function DailyMoment() {
  const { isRTL } = useAuth();
  const [index, setIndex] = useState(0);

  const current = DAILY_INTENTIONS[index % DAILY_INTENTIONS.length];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % DAILY_INTENTIONS.length);
  };

  return (
    <div className="relative p-5 sm:p-6 rounded-[26px] bg-[#0C0D13] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_16px_36px_-10px_rgba(0,0,0,0.6)] select-none group transition-all duration-300">
      {/* Header with quiet accent */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2 text-rose-400">
          <Feather className="w-3.5 h-3.5 stroke-[2.2]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#EDEDEF]">
            {isRTL ? 'نیت و صفای امروز' : "Today's Intention"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors cursor-pointer"
          title={isRTL ? 'ورق زدن نیت' : 'Next intention'}
          aria-label="Next intention"
        >
          <RefreshCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
        </button>
      </div>

      {/* Editorial typography body */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm sm:text-base text-[#EDEDEF] leading-relaxed font-serif tracking-wide italic">
          "{isRTL ? current.textFa : current.textEn}"
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] text-[#92929B] pt-2.5 border-t border-white/[0.025]">
          <span className="font-medium tracking-tight">
            {isRTL ? current.author : 'SAFA Daily Reflection'}
          </span>
          <span className="text-[10px] text-zinc-600 font-mono">
            {index + 1} / {DAILY_INTENTIONS.length}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
