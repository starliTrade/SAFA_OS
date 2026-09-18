/**
 * SAFA — Home View (Clean, Refined 5 Core Cards)
 * 1. Income Velocity
 * 2. Ethereum Sparkline
 * 3. Today Spending
 * 4. Project Progress
 * 5. Streak & Habit
 */

import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';
import { VelocityBarCard } from '../widgets/VelocityBarCard';
import { RhythmSparklineCard } from '../widgets/RhythmSparklineCard';
import { SpendingSpectrumCard } from '../widgets/SpendingSpectrumCard';
import { ProjectProgressCard } from '../widgets/ProjectProgressCard';
import { StreakHabitCard } from '../widgets/StreakHabitCard';
import {
  Search,
  Mic,
  LayoutGrid,
  Bell,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export function HomeView() {
  const { user, isRTL } = useAuth();
  const {
    openCapture,
    setIsSearchOpen,
    activeChip,
    setActiveChip,
    prioritySearch,
    setPrioritySearch,
    themeMode,
  } = useApp();

  const isDark = themeMode === 'dark';

  const now = new Date();
  const dayName = now.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', { weekday: 'long' });
  const dayNum = now.getDate();
  const monthName = now.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', { month: 'long' });

  const hour = now.getHours();
  const timeGreeting = hour < 12 ? (isRTL ? 'صبح بخیر' : 'Good morning') : hour < 18 ? (isRTL ? 'عصر بخیر' : 'Good afternoon') : (isRTL ? 'شب بخیر' : 'Good evening');
  const userName = user?.profile?.name || (isRTL ? 'کاربر گرامی' : 'Louis Bloom');

  return (
    <div className="space-y-6 pb-28 max-w-4xl mx-auto px-1 sm:px-3">
      {/* 1. Header Greeting & Date */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-1 flex items-start justify-between gap-4"
      >
        <div>
          {/* Date with glowing coral dot */}
          <div className={`flex items-center gap-1.5 text-xs font-medium tracking-tight mb-1.5 ${isDark ? 'text-[#8E8E98]' : 'text-zinc-500'}`}>
            <span>{dayName} {dayNum}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse" />
            <span>{monthName}</span>
          </div>

          {/* Greeting Typography with crisp light & dark colors */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            <span className={isDark ? 'text-[#8E8E98]' : 'text-zinc-500'}>{timeGreeting},</span>
            <br />
            <span className={isDark ? 'text-white drop-shadow-sm' : 'text-zinc-950 font-extrabold'}>{userName}!</span>
          </h1>
        </div>

        {/* Ambient decorative icon button */}
        <button
          type="button"
          onClick={() => openCapture()}
          className={`p-2.5 rounded-2xl backdrop-blur-xl transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
              : 'bg-white/80 hover:bg-white text-zinc-700 border border-black/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
          }`}
          title="New Capture"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
        </button>
      </motion.section>

      {/* 2. Priority Search Capsule */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div
          className={`relative flex items-center w-full rounded-full px-5 py-3.5 transition-all duration-300 ${
            isDark
              ? 'bg-[#0B0C11] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.02),0_8px_24px_rgba(0,0,0,0.45)] focus-within:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.65)]'
              : 'bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.035] focus-within:border-black/[0.08] focus-within:shadow-[0_8px_28px_rgba(0,0,0,0.05)]'
          }`}
        >
          <input
            type="text"
            value={prioritySearch}
            onChange={(e) => setPrioritySearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && prioritySearch.trim()) {
                openCapture();
              }
            }}
            placeholder={isRTL ? 'اولویت بعدی شما چیست؟' : "What's your next priority?"}
            className={`w-full bg-transparent text-sm font-medium focus:outline-none tracking-tight ${
              isDark ? 'text-white placeholder-[#5C5C68]' : 'text-zinc-900 placeholder-zinc-400'
            }`}
          />
          <div className="flex items-center gap-3 shrink-0 ml-3 rtl:mr-3 rtl:ml-0">
            <button
              type="button"
              onClick={() => openCapture()}
              className={`transition-colors cursor-pointer p-1 rounded-full ${
                isDark ? 'text-[#8E8E98] hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Voice memo / Audio capture"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors cursor-pointer p-1 rounded-full ${
                isDark ? 'text-[#8E8E98] hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* 3. Category Chips Row */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {[
          {
            id: 'DASHBOARD',
            label: isRTL ? 'داشبورد' : 'Dashboard',
            icon: (
              <span className="w-3.5 h-3.5 flex items-center justify-center text-rose-500">
                <LayoutGrid className="w-3.5 h-3.5" />
              </span>
            ),
          },
          {
            id: 'REMINDERS',
            label: isRTL ? 'یادآورها' : 'Reminders',
            icon: (
              <span className="w-3.5 h-3.5 flex items-center justify-center text-purple-500">
                <Bell className="w-3.5 h-3.5" />
              </span>
            ),
          },
          {
            id: 'PROGRESS',
            label: isRTL ? 'پیشرفت' : 'Progress',
            icon: (
              <span className="w-3.5 h-3.5 flex items-center justify-center text-amber-500">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
            ),
          },
        ].map((chip) => {
          const isActive = activeChip === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveChip(chip.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight cursor-pointer transition-all active:scale-95 ${
                isActive
                  ? isDark
                    ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_4px_16px_rgba(0,0,0,0.4)] border border-white/[0.08]'
                    : 'bg-zinc-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)]'
                  : isDark
                  ? 'bg-[#0E0E13] text-[#8E8E98] hover:text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                  : 'bg-white/80 text-zinc-600 hover:text-zinc-950 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-black/[0.04]'
              }`}
            >
              {chip.icon}
              <span>{chip.label}</span>
            </button>
          );
        })}
      </section>

      {/* 4. Side-by-Side: Card 1 (Income Velocity) & Card 2 (Ethereum Sparkline) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VelocityBarCard
          title={isRTL ? 'درآمد' : 'Income'}
          metric="+ $6,593.00"
          trend="0.23%"
          bars={[
            { label: 'Mar', heightPercent: 35 },
            { label: 'Apr', heightPercent: 55 },
            { label: 'May', heightPercent: 28 },
            { label: 'June', heightPercent: 65 },
            { label: 'July', heightPercent: 22 },
            { label: 'Aug', heightPercent: 92, isHighlighted: true },
          ]}
        />

        <RhythmSparklineCard
          title="Ethereum"
          subtitle="ETH"
          value="$2,593.16"
          trend="0.23%"
          tooltipValue="$68.22"
          tooltipDate="16 Sep, 2024"
        />
      </section>

      {/* 5. Card 3: Daily Spending Widget with Glowing Ambient Halo */}
      <section className="pt-1">
        <SpendingSpectrumCard
          title={isRTL ? 'مخارج امروز' : 'TODAY SPENDING'}
          totalAmount="$192"
          cents=".45"
          percentage="78%"
        />
      </section>

      {/* 6. Card 4: Project Progress */}
      <section>
        <ProjectProgressCard
          title={isRTL ? 'پیشرفت پروژه' : 'Project Progress'}
          category={isRTL ? 'طراحی اولیه نسخه دوم' : 'Onboarding prototype'}
          progress={65}
          dueDate={isRTL ? 'مهلت: ۷ مرداد' : 'Due July 28'}
          collaboratorsCount={3}
        />
      </section>

      {/* 7. Card 5: Streak & Habit Widget */}
      <section>
        <StreakHabitCard
          streakDays={32}
          currentValue={6825}
          targetValue={10000}
          metricLabel={isRTL ? 'قدم‌ها' : 'STEPS'}
          completedDays={[0, 1, 2]}
          currentDayIndex={3}
        />
      </section>
    </div>
  );
}
