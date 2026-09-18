/**
 * SAFA — Living Hero & Atmospheric Depth Scene (Build 03)
 * A quiet luxury, living visual centerpiece for Safa's personal world.
 * Dimensional layered glass, organic light breathing, and contextual presence.
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Moon, Sun, Wind } from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';
import { getLivingAtmosphere } from './homeSpotlight';

interface LivingHeroProps {
  selectedDate: Date;
  onOpenCapture: () => void;
}

export function LivingHero({ selectedDate, onOpenCapture }: LivingHeroProps) {
  const { user, isRTL } = useAuth();
  const { themeMode } = useApp();
  const isDark = themeMode === 'dark';

  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = selectedDate.getDay();

  const atmosphere = useMemo(() => getLivingAtmosphere(hour, dayOfWeek), [hour, dayOfWeek]);

  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  const dateFormatted = selectedDate.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const userName = user?.profile?.persianName && isRTL ? user.profile.persianName : user?.profile?.name || (isRTL ? 'صفا' : 'Safa');

  return (
    <section className="relative w-full pt-1 pb-2 select-none overflow-hidden">
      {/* 1. Contextual Header Bar & Universal Capture Trigger */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          {/* Subtle Temporal Badge */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-tight mb-1 text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-500">
            <span>{dateFormatted}</span>
            {isToday && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]"></span>
              </span>
            )}
          </div>

          {/* Emotional Living Greeting */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white dark:text-white light:text-zinc-950">
            <span className="font-normal text-[#92929B] dark:text-[#92929B] light:text-zinc-500">
              {isRTL ? atmosphere.greetingFa : atmosphere.greetingEn}
            </span>
          </h1>

          <p className="text-xs sm:text-[13px] text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-600 mt-1 font-normal leading-relaxed">
            {isRTL ? atmosphere.subtitleFa : atmosphere.subtitleEn}
          </p>
        </div>

        {/* Quick Capture Pill Action */}
        <button
          type="button"
          onClick={onOpenCapture}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-xl transition-all active:scale-95 cursor-pointer shrink-0 ${
            isDark
              ? 'bg-[#0E0E14]/80 hover:bg-[#15151C] text-zinc-200 border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_6px_20px_rgba(0,0,0,0.5)]'
              : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
          }`}
          title={isRTL ? 'ثبت سریع اندیشه و کار' : 'Quick Capture'}
          aria-label="Universal Capture"
        >
          <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline text-[#EDEDEF]">
            {isRTL ? 'ثبت صفا' : 'Capture'}
          </span>
        </button>
      </div>

      {/* 2. Living Depth Sculpture (SOLG Dimensional Centerpiece) */}
      <div className="relative w-full h-36 sm:h-44 rounded-[28px] overflow-hidden p-6 flex items-center justify-between transition-all duration-500 bg-[#0A0B10] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_18px_40px_-10px_rgba(0,0,0,0.7)]">
        {/* Ethereal Ambient Radial Auras */}
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-1000"
          style={{ background: atmosphere.accentColor }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-1000"
          style={{ background: '#3B82F6' }}
        />

        {/* Ambient Floating Glass Orb & Petal Forms */}
        <div className="relative z-10 max-w-[65%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/[0.04] border border-white/[0.04] text-[#EDEDEF] mb-2 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: atmosphere.accentColor }} />
            <span>{atmosphere.themeTag}</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#EDEDEF] leading-snug">
            {isRTL ? 'دنیای زنده و آرام صفا' : "Safa's Living Sanctuary"}
          </h2>
          <p className="text-xs text-[#92929B] mt-0.5 line-clamp-2 leading-relaxed">
            {isRTL
              ? 'ترکیب آفرینش، زیبایی، موسیقی و آرامش در یک فضای یکپارچه.'
              : 'Where creation, memory, sound, and intention breathe together.'}
          </p>
        </div>

        {/* 3D-like Layered Glass Sculpture / Organic Bloom Orb */}
        <div className="relative w-28 sm:w-36 h-28 sm:h-36 shrink-0 flex items-center justify-center">
          {/* Outer Breathing Halo */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.35, 0.55, 0.35],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full border border-white/[0.08] shadow-[0_0_30px_rgba(244,63,94,0.2)]"
            style={{
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06), transparent 70%)`,
            }}
          />

          {/* Mid Layer Crystal Flower / Organic Geometry */}
          <motion.div
            animate={{
              rotate: [0, -180, -360],
              scale: [1.02, 0.96, 1.02],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-20 sm:w-24 h-20 sm:h-24 rounded-[38%] backdrop-blur-xl border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(20,20,30,0.4) 100%)',
            }}
          />

          {/* Inner Specular Core Orb */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/[0.2] overflow-hidden"
            style={{
              background: `linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(244,63,94,0.25) 50%, rgba(14,14,20,0.9) 100%)`,
            }}
          >
            {/* Specular Glint */}
            <div className="absolute top-1.5 left-2 w-3.5 h-2 rounded-full bg-white/40 blur-[0.6px] transform -rotate-45" />
            <span className="text-sm select-none font-serif text-white/90">صفا</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
