/**
 * SAFA — Minimal Quiet Luxury Header (Build 03.3)
 * Ultra-sleek, compact, high-contrast obsidian greeting.
 * Pure minimalist elegance, maximum screen space efficiency,
 * zero clutter, perfectly aligned with SAFA Dark Obsidian aesthetics.
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Plus, Sun, Moon, Sunrise, Sunset, Sparkles } from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';

interface LivingHeroProps {
  selectedDate: Date;
  onOpenCapture: () => void;
}

export function LivingHero({ selectedDate, onOpenCapture }: LivingHeroProps) {
  const { user, isRTL } = useAuth();
  const { themeMode } = useApp();

  const now = new Date();
  const hour = now.getHours();

  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  const dateFormatted = selectedDate.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  // Quiet greetings based on time
  const greeting = useMemo(() => {
    if (hour >= 5 && hour < 12) {
      return {
        fa: 'صبح به‌خیر، صفای عزیز',
        en: 'Good morning, Safa',
        icon: Sunrise,
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        fa: 'عصر به‌خیر، صفا جان',
        en: 'Good afternoon, Safa',
        icon: Sun,
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        fa: 'غروب به‌خیر، صفای عزیز',
        en: 'Good evening, Safa',
        icon: Sunset,
      };
    } else {
      return {
        fa: 'شب آرام، صفای جان',
        en: 'Peaceful night, Safa',
        icon: Moon,
      };
    }
  }, [hour]);

  const TimeIcon = greeting.icon;

  return (
    <section className="relative w-full pt-1 pb-1 select-none">
      {/* Sleek Minimalist Greeting Bar */}
      <div className="flex items-center justify-between gap-4 px-1 py-1">
        {/* Left: Typography & Context */}
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#EDEDEF] truncate">
              {isRTL ? greeting.fa : greeting.en}
            </h1>
            {isToday && (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#92929B] font-medium">
            <span className="flex items-center gap-1.5">
              <TimeIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>{dateFormatted}</span>
            </span>
            <span>•</span>
            <span className="text-zinc-400 font-normal">
              {isRTL ? 'آتلیه و خلوت شخصی' : 'Personal Atelier'}
            </span>
          </div>
        </div>

        {/* Right: Refined Quick Capture Capsule */}
        <button
          type="button"
          onClick={onOpenCapture}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E0E14]/90 hover:bg-[#15151F] text-[#EDEDEF] border border-white/[0.035] hover:border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all active:scale-95 cursor-pointer shrink-0"
          title={isRTL ? 'ثبت سریع ایده، یادداشت یا کار' : 'Quick Capture'}
          aria-label="Universal Capture"
        >
          <Plus className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-90 transition-transform duration-200" />
          <span className="text-xs font-semibold tracking-wide">
            {isRTL ? 'ثبت سریع' : 'Capture'}
          </span>
        </button>
      </div>
    </section>
  );
}
