/**
 * SAFA — Execution Section (Productivity Layer) (Build 03)
 * The calm, focused execution foundation for Today: Date Rail, Focus, Schedule & Actions.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Clock,
  CheckCircle2,
  Circle,
  Flame,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BaseObject, ObjectType, ObjectStatus } from '../../core/types/objects';
import { useAuth } from '../../core/context/AuthContext';
import { TodayRail } from './TodayRail';
import { DailyTimeline } from './DailyTimeline';

interface ExecutionSectionProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  objects: BaseObject[];
  onSelectObject: (obj: BaseObject) => void;
  onToggleTask: (task: BaseObject, e: React.MouseEvent) => void;
  onIncrementHabit: (habit: BaseObject, e: React.MouseEvent) => void;
  onOpenCapture: () => void;
}

export function ExecutionSection({
  selectedDate,
  onSelectDate,
  objects,
  onSelectObject,
  onToggleTask,
  onIncrementHabit,
  onOpenCapture,
}: ExecutionSectionProps) {
  const { isRTL } = useAuth();
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(true);

  const now = new Date();
  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  // Filter tasks & habits
  const activeTasks = objects.filter(
    (o) => o.type === ObjectType.TASK && o.status !== ObjectStatus.TRASHED
  );
  const activeHabits = objects.filter(
    (o) => o.type === ObjectType.HABIT && o.status !== ObjectStatus.TRASHED
  );
  const activeProjects = objects.filter(
    (o) => o.type === ObjectType.PROJECT && o.status !== ObjectStatus.TRASHED
  );

  // Focus object
  const focusObject =
    activeProjects.find((p) => p.metadata?.priority === 'high') ||
    activeProjects[0] ||
    activeTasks.find((t) => t.metadata?.priority === 'high') ||
    activeTasks[0];

  return (
    <section className="space-y-5 select-none pt-2">
      {/* 1. Temporal Date Rail */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#92929B]">
              {isRTL ? 'انتخاب زمان و روز' : 'Timeline & Rhythm'}
            </h3>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">
            {isToday ? (isRTL ? 'امروز' : 'Today') : selectedDate.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <TodayRail selectedDate={selectedDate} onSelectDate={onSelectDate} />
      </div>

      {/* 2. Today's Primary Focus Card */}
      {focusObject && (
        <div
          onClick={() => onSelectObject(focusObject)}
          className="group relative p-5 sm:p-6 rounded-[28px] cursor-pointer overflow-hidden transition-all duration-300 bg-[#0A0B10] border border-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_18px_40px_-10px_rgba(0,0,0,0.7)] hover:border-white/[0.07]"
        >
          {/* Subtle amber aura */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-400">
                <Target className="w-3 h-3 stroke-[2.2]" />
              </span>
              <span className="text-[10.5px] uppercase font-bold tracking-widest text-amber-400">
                {isRTL ? 'تمرکز اصلی روز' : "Today's Core Focus"}
              </span>
            </div>

            {focusObject.metadata?.progress !== undefined && (
              <span className="text-xs font-mono font-bold text-amber-400">
                {focusObject.metadata.progress}%
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#EDEDEF] tracking-tight leading-snug mb-1">
            {focusObject.title}
          </h3>

          {focusObject.description && (
            <p className="text-xs text-[#92929B] leading-relaxed line-clamp-2 mb-3 font-normal">
              {focusObject.description}
            </p>
          )}

          {/* Progress bar if project */}
          {focusObject.metadata?.progress !== undefined && (
            <div className="w-full h-1.5 rounded-full overflow-hidden p-0.5 bg-black/50 mb-3.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${focusObject.metadata.progress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.025] text-xs text-[#92929B] relative z-10">
            <div className="flex items-center gap-1.5">
              {focusObject.tags?.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-[9.5px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.04]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
              <span>{isRTL ? 'مشاهده' : 'Details'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* 3. Daily Schedule & Live Timeline */}
      <div className="space-y-3">
        <DailyTimeline
          selectedDate={selectedDate}
          isToday={isToday}
          objects={objects}
          onSelectObject={onSelectObject}
        />
      </div>

      {/* 4. Action Items & Rituals List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#92929B]">
            {isRTL ? 'کارهای امروز و آیین‌ها' : "Today's Actions & Rituals"}
          </h4>
          <span className="text-[10px] font-mono text-zinc-500">
            {activeTasks.length + activeHabits.length} {isRTL ? 'مورد' : 'items'}
          </span>
        </div>

        <div className="space-y-2">
          {/* Active Tasks list */}
          {activeTasks.slice(0, 3).map((task) => {
            const isCompleted = task.status === ObjectStatus.COMPLETED;
            return (
              <div
                key={task.id}
                onClick={() => onSelectObject(task)}
                className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-[22px] cursor-pointer transition-all duration-200 bg-[#0B0C11] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#12131A] ${
                  isCompleted ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => onToggleTask(task, e)}
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
                      className={`text-xs sm:text-sm font-semibold tracking-tight truncate text-[#EDEDEF] ${
                        isCompleted ? 'line-through text-zinc-500' : ''
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-[11px] text-[#92929B] truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {task.metadata?.priority === 'high' && (
                  <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0 ml-2 rtl:mr-2 rtl:ml-0">
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
                onClick={() => onSelectObject(habit)}
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-[22px] cursor-pointer transition-all duration-200 bg-[#0B0C11] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#12131A]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => onIncrementHabit(habit, e)}
                    className="w-7 h-7 rounded-full bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 flex items-center justify-center shrink-0 transition-transform active:scale-90 border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.3)] cursor-pointer"
                    title="Check-in habit ritual"
                  >
                    <Flame className="w-4 h-4 fill-current" />
                  </button>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-[#EDEDEF] truncate">
                      {habit.title}
                    </h4>
                    <p className="text-[11px] text-[#92929B] truncate mt-0.5">
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
      </div>
    </section>
  );
}
