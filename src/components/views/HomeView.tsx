/**
 * SAFA — Home 2.0: SAFA TODAY (Build 02.1)
 * Obsidian Liquid Glass (SOLG) Unified Personal Life OS Today Space
 *
 * Hierarchy:
 * 1. Header & Time-Aware Greeting
 * 2. TodayRail (Temporal Projection Selector)
 * 3. Today's Focus (Single Prominent Priority)
 * 4. Daily Schedule & Real-Time Timeline
 * 5. Actions & Rituals (Tasks & Habit Streaks)
 * 6. Continue / In-Progress Projects
 * 7. Personal Memory & Reflection Space
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';
import { useObjects } from '../../core/context/ObjectContext';
import { TodayRail } from '../home/TodayRail';
import { DailyTimeline } from '../home/DailyTimeline';
import { BaseObject, ObjectType, ObjectStatus } from '../../core/types/objects';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Flame,
  ArrowUpRight,
  Bookmark,
  Layers,
  Calendar,
  Compass,
  Check,
  ChevronRight,
  BookOpen,
  Quote,
  Target,
} from 'lucide-react';

export function HomeView() {
  const { user, isRTL } = useAuth();
  const { openCapture, themeMode } = useApp();
  const { objects, updateObject, setSelectedObject } = useObjects();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const isDark = themeMode === 'dark';

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isToday = isSameDay(selectedDate, new Date());

  // Greeting & Date calculations
  const now = new Date();
  const currentHour = now.getHours();
  const timeGreeting =
    currentHour < 12
      ? isRTL ? 'صبح بخیر' : 'Good morning'
      : currentHour < 18
      ? isRTL ? 'عصر بخیر' : 'Good afternoon'
      : isRTL ? 'شب بخیر' : 'Good evening';

  const userName = user?.profile?.name || (isRTL ? 'صفا' : 'Safa');

  const selectedDateFormatted = selectedDate.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Filter objects from unified ObjectContext
  const activeTasks = objects.filter(
    (o) => o.type === ObjectType.TASK && o.status !== ObjectStatus.TRASHED
  );
  const activeHabits = objects.filter(
    (o) => o.type === ObjectType.HABIT && o.status !== ObjectStatus.TRASHED
  );
  const activeProjects = objects.filter(
    (o) => o.type === ObjectType.PROJECT && o.status !== ObjectStatus.TRASHED
  );
  const memories = objects.filter(
    (o) => (o.type === ObjectType.MEMORY || o.type === ObjectType.NOTE) && o.status !== ObjectStatus.TRASHED
  );

  // Today's Primary Focus: Pick high priority task or major active project
  const focusObject =
    activeProjects.find((p) => p.metadata?.priority === 'high') ||
    activeProjects[0] ||
    activeTasks.find((t) => t.metadata?.priority === 'high') ||
    activeTasks[0];

  // Continue section: Top in-progress item
  const continueItem =
    activeProjects[1] ||
    objects.find(
      (o) =>
        (o.type === ObjectType.NOTE || o.type === ObjectType.BOOK || o.type === ObjectType.PHOTO) &&
        o.status !== ObjectStatus.TRASHED
    ) ||
    activeTasks[1];

  // Reflection/Memory quote
  const memoryHighlight = memories[0];

  const handleToggleTask = async (task: BaseObject, e: React.MouseEvent) => {
    e.stopPropagation();
    const isDone = task.status === ObjectStatus.COMPLETED;
    try {
      await updateObject(task.id, {
        status: isDone ? ObjectStatus.ACTIVE : ObjectStatus.COMPLETED,
      });
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const handleIncrementStreak = async (habit: BaseObject, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentStreak = habit.metadata?.streak ?? 0;
    try {
      await updateObject(habit.id, {
        metadata: {
          ...habit.metadata,
          streak: currentStreak + 1,
          lastCheckedDate: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error('Failed to increment habit:', err);
    }
  };

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-2 sm:px-4 select-none">
      {/* 1. Header & Time-Aware Context */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-1 flex items-start justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-tight mb-1.5 text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-500">
            <span>{selectedDateFormatted}</span>
            {isToday && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            <span className="text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-500 font-medium">
              {timeGreeting},{' '}
            </span>
            <span className="text-white dark:text-white light:text-zinc-950 font-extrabold">
              {userName}
            </span>
          </h1>
        </div>

        {/* Quick Capture Button */}
        <button
          type="button"
          onClick={() => openCapture()}
          className={`p-3 rounded-full backdrop-blur-xl transition-all active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-[#0E0E13]/80 hover:bg-[#131318] text-zinc-200 border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_6px_20px_rgba(0,0,0,0.5)]'
              : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.05] shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
          }`}
          title={isRTL ? 'ثبت سریع' : 'Quick Capture'}
          aria-label="Universal Capture"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
        </button>
      </motion.section>

      {/* 2. TodayRail (Temporal Date Selector) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="w-full"
      >
        <TodayRail selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </motion.section>

      {/* 3. Today's Primary Focus Card */}
      {focusObject && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={() => setSelectedObject(focusObject)}
          className={`group relative p-5 sm:p-6 rounded-[26px] cursor-pointer overflow-hidden transition-all duration-300 ${
            isDark
              ? 'bg-[#0E0E13] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_18px_40px_-10px_rgba(0,0,0,0.65)] hover:border-white/[0.08] hover:shadow-[0_22px_48px_-10px_rgba(0,0,0,0.8)]'
              : 'bg-white border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-black/[0.08]'
          }`}
        >
          {/* Subtle ambient aura */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/[0.04] dark:bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-400">
                <Target className="w-3 h-3 stroke-[2.2]" />
              </span>
              <span className="text-[11px] uppercase font-bold tracking-wider text-amber-500">
                {isRTL ? 'تمرکز روز' : "Today's Focus"}
              </span>
            </div>

            {focusObject.metadata?.progress !== undefined && (
              <span className="text-xs font-mono font-bold text-amber-400">
                {focusObject.metadata.progress}%
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white dark:text-white light:text-zinc-950 leading-snug relative z-10 mb-1.5">
            {focusObject.title}
          </h2>

          {focusObject.description && (
            <p className="text-xs leading-relaxed text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-600 line-clamp-2 relative z-10 mb-4 font-normal">
              {focusObject.description}
            </p>
          )}

          {/* Progress bar if project */}
          {focusObject.metadata?.progress !== undefined && (
            <div className="w-full h-2 rounded-full overflow-hidden p-0.5 bg-black/40 dark:bg-black/40 light:bg-zinc-100 mb-4">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${focusObject.metadata.progress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04] relative z-10 text-xs">
            <div className="flex items-center gap-2">
              {focusObject.tags?.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-zinc-300 dark:text-zinc-300 light:text-zinc-700 border border-white/[0.04]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
              <span>{isRTL ? 'مشاهده جزئیات' : 'Open Object'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.section>
      )}

      {/* 4. Daily Schedule & Live Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <DailyTimeline
          selectedDate={selectedDate}
          isToday={isToday}
          objects={objects}
          onSelectObject={(obj) => setSelectedObject(obj)}
        />
      </motion.section>

      {/* 5. Today's Actions & Rituals */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-500">
            {isRTL ? 'کارهای امروز و آیین‌ها' : "Today's Actions & Rituals"}
          </h3>
          <span className="text-[10px] font-mono text-[#8E8E98]">
            {activeTasks.length + activeHabits.length} items
          </span>
        </div>

        <div className="space-y-2">
          {/* Active Tasks list */}
          {activeTasks.slice(0, 3).map((task) => {
            const isCompleted = task.status === ObjectStatus.COMPLETED;
            return (
              <div
                key={task.id}
                onClick={() => setSelectedObject(task)}
                className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-[20px] cursor-pointer transition-all duration-200 ${
                  isDark
                    ? 'bg-[#0E0E13] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#131318]'
                    : 'bg-white border border-black/[0.035] shadow-xs hover:border-black/[0.06]'
                } ${isCompleted ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleTask(task, e)}
                    className="p-0.5 text-zinc-500 hover:text-white transition-colors shrink-0 cursor-pointer"
                    aria-label="Toggle Complete"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-500 hover:text-white" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <h4
                      className={`text-sm font-semibold tracking-tight truncate ${
                        isDark ? 'text-zinc-100' : 'text-zinc-950'
                      } ${isCompleted ? 'line-through text-zinc-500' : ''}`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-500 truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {task.metadata?.priority === 'high' && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0 ml-2 rtl:mr-2 rtl:ml-0">
                    Priority
                  </span>
                )}
              </div>
            );
          })}

          {/* Active Habit ritual list */}
          {activeHabits.slice(0, 2).map((habit) => {
            const streak = habit.metadata?.streak ?? 0;
            return (
              <div
                key={habit.id}
                onClick={() => setSelectedObject(habit)}
                className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-[20px] cursor-pointer transition-all duration-200 ${
                  isDark
                    ? 'bg-[#0E0E13] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#131318]'
                    : 'bg-white border border-black/[0.035] shadow-xs hover:border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => handleIncrementStreak(habit, e)}
                    className="w-7 h-7 rounded-full bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 flex items-center justify-center shrink-0 transition-transform active:scale-90 border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.3)] cursor-pointer"
                    title="Check-in habit ritual"
                  >
                    <Flame className="w-4 h-4 fill-current" />
                  </button>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold tracking-tight text-zinc-100 dark:text-zinc-100 light:text-zinc-950 truncate">
                      {habit.title}
                    </h4>
                    <p className="text-xs text-[#8E8E98] truncate mt-0.5">
                      {habit.description || (isRTL ? 'آیین روزانه' : 'Daily ritual streak')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono font-bold text-orange-400 shrink-0 ml-2 rtl:mr-2 rtl:ml-0">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{streak} d</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 6. Continue / In-Progress */}
      {continueItem && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-500">
              {isRTL ? 'ادامه کار و پروژه‌ها' : 'Continue & In-Progress'}
            </h3>
          </div>

          <div
            onClick={() => setSelectedObject(continueItem)}
            className={`group relative p-4 sm:p-5 rounded-[22px] cursor-pointer flex items-center justify-between gap-4 transition-all duration-200 ${
              isDark
                ? 'bg-[#0E0E13] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#131318]'
                : 'bg-white border border-black/[0.035] shadow-xs hover:border-black/[0.06]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-white/[0.04] text-emerald-400 border border-white/[0.04]' : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <Layers className="w-5 h-5 stroke-[1.8]" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {continueItem.type}
                  </span>
                </div>
                <h4 className="text-sm font-semibold tracking-tight text-white dark:text-white light:text-zinc-950 truncate">
                  {continueItem.title}
                </h4>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform shrink-0" />
          </div>
        </motion.section>
      )}

      {/* 7. Personal Memory & Reflection Space */}
      {memoryHighlight && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={() => setSelectedObject(memoryHighlight)}
          className={`group relative p-5 sm:p-6 rounded-[26px] cursor-pointer overflow-hidden transition-all duration-300 ${
            isDark
              ? 'bg-[#0B0C11] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_12px_32px_rgba(0,0,0,0.6)] hover:border-white/[0.06]'
              : 'bg-zinc-50 border border-black/[0.04] shadow-xs hover:border-black/[0.08]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 text-rose-500">
            <Quote className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="text-[10.5px] uppercase font-bold tracking-wider">
              {isRTL ? 'ثبت صفای درون' : 'Personal Reflection & Memory'}
            </span>
          </div>

          <h3 className="text-base font-bold text-white dark:text-white light:text-zinc-950 tracking-tight leading-snug mb-1">
            "{memoryHighlight.title}"
          </h3>

          {memoryHighlight.description && (
            <p className="text-xs text-[#8E8E98] dark:text-[#8E8E98] light:text-zinc-600 leading-relaxed italic line-clamp-3 font-serif">
              {memoryHighlight.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between text-[10px] text-[#8E8E98] pt-2.5 border-t border-white/[0.03] dark:border-white/[0.03] light:border-black/[0.04]">
            <span>
              {new Date(memoryHighlight.createdAt).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="text-zinc-400 group-hover:text-white transition-colors">
              {isRTL ? 'مرور خاطره' : 'Read entry'} →
            </span>
          </div>
        </motion.section>
      )}
    </div>
  );
}

