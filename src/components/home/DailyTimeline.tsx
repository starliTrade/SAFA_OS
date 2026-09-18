/**
 * SAFA — Daily Timeline & Live Moment Indicator (Build 02.1)
 * Obsidian Liquid Glass (SOLG) Daily Schedule & Real-Time "NOW" Track
 */

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Circle, Sparkles, MapPin, Check } from 'lucide-react';
import { BaseObject, ObjectType, ObjectStatus } from '../../core/types/objects';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';

interface TimelineItem {
  id: string;
  time: string;
  hour: number;
  minute: number;
  title: string;
  category: 'STUDIO' | 'LIFE' | 'PERSONAL' | 'REST' | 'RITUAL';
  description?: string;
  isCompleted?: boolean;
  objectId?: string;
  location?: string;
}

interface DailyTimelineProps {
  selectedDate: Date;
  isToday: boolean;
  objects?: BaseObject[];
  onSelectObject?: (object: BaseObject) => void;
  onToggleTask?: (objectId: string) => void;
}

export function DailyTimeline({
  selectedDate,
  isToday,
  objects = [],
  onSelectObject,
  onToggleTask,
}: DailyTimelineProps) {
  const { isRTL } = useAuth();
  const { themeMode } = useApp();
  const isDark = themeMode === 'dark';
  const [nowTime, setNowTime] = useState<Date>(new Date());

  // Update live clock every 30 seconds when viewing today
  useEffect(() => {
    if (!isToday) return;
    const interval = setInterval(() => {
      setNowTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [isToday]);

  const currentHour = nowTime.getHours();
  const currentMinute = nowTime.getMinutes();
  const currentTimeFormatted = nowTime.toLocaleTimeString(isRTL ? 'fa-IR' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Pull active tasks with due dates or times if available, or assemble daily rhythm
  const timelineItems: TimelineItem[] = React.useMemo(() => {
    // Check if real objects can map to today
    const taskObjects = objects.filter((o) => o.type === ObjectType.TASK && o.status !== ObjectStatus.TRASHED);

    const baseItems: TimelineItem[] = [
      {
        id: 't-1',
        time: '08:30',
        hour: 8,
        minute: 30,
        title: isRTL ? 'مراقبه صبحگاهی و دم‌نوش آرامش' : 'Morning Meditation & Herbal Tea',
        category: 'RITUAL',
        description: isRTL ? '۱۰ دقیقه تنفس عمیق و ثبت حضور در صفا' : '10 minutes stillness, journaling in SAFA',
        isCompleted: isToday ? true : false,
      },
      {
        id: 't-2',
        time: '10:30',
        hour: 10,
        minute: 30,
        title: isRTL ? 'کارگاه طراحی پارچه و پالت رنگ' : 'Fashion Atelier: Silk Draping & Swatches',
        category: 'STUDIO',
        description: isRTL ? 'بررسی نمونه‌های پارچه ابریشم و کتان' : 'Autumn Capsule Collection — Silk & Wool concepts',
        objectId: taskObjects.find((t) => t.title.toLowerCase().includes('fabric'))?.id,
        isCompleted: isToday ? true : false,
      },
      {
        id: 't-3',
        time: '13:30',
        hour: 13,
        minute: 30,
        title: isRTL ? 'ناهار آرام و مطالعه رمان' : 'Lunch & Reading: In Praise of Shadows',
        category: 'REST',
        description: isRTL ? 'فصل سوم — زیبایی سایه‌ها و نور' : 'Quiet reflective break with Junichiro Tanizaki',
      },
      {
        id: 't-4',
        time: '17:00',
        hour: 17,
        minute: 0,
        title: isRTL ? 'پیاده‌روی عصرگاهی و تمرین تمرکز' : 'Evening Walk & Restorative Movement',
        category: 'LIFE',
        description: isRTL ? '۴۵ دقیقه پیاده‌روی در هوای پاییزی' : '45 minutes gentle walk, disconnected from devices',
      },
      {
        id: 't-5',
        time: '20:30',
        hour: 20,
        minute: 30,
        title: isRTL ? 'مرور افکار روز و ثبت خاطرات' : 'Evening Reflections & Memory Capture',
        category: 'PERSONAL',
        description: isRTL ? 'ثبت صفای درون و یادداشت‌های روز' : 'Closing the day with calm thoughts in SAFA',
      },
    ];

    return baseItems;
  }, [isToday, isRTL, objects]);

  const getCategoryBadge = (cat: TimelineItem['category']) => {
    switch (cat) {
      case 'STUDIO':
        return {
          label: isRTL ? 'آتلیه' : 'Atelier',
          className: isDark
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
            : 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'RITUAL':
        return {
          label: isRTL ? 'آیین' : 'Ritual',
          className: isDark
            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'REST':
        return {
          label: isRTL ? 'آرامش' : 'Rest',
          className: isDark
            ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
            : 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'PERSONAL':
        return {
          label: isRTL ? 'خاطره' : 'Personal',
          className: isDark
            ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
            : 'bg-purple-50 text-purple-700 border-purple-200',
        };
      default:
        return {
          label: isRTL ? 'روزمره' : 'Life',
          className: isDark
            ? 'bg-white/[0.05] text-zinc-300 border-white/[0.06]'
            : 'bg-zinc-100 text-zinc-700 border-zinc-200',
        };
    }
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between px-1">
        <h3 className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-[#8E8E98]' : 'text-zinc-500'}`}>
          {isRTL ? 'جریان و برنامه روز' : 'Daily Schedule & Rhythm'}
        </h3>
        {isToday && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
            </span>
            <span className="font-mono">{currentTimeFormatted}</span>
          </div>
        )}
      </div>

      <div className="relative space-y-2.5">
        {timelineItems.map((item, index) => {
          const itemTotalMinutes = item.hour * 60 + item.minute;
          const currentTotalMinutes = currentHour * 60 + currentMinute;
          const badge = getCategoryBadge(item.category);

          // Check if NOW indicator should be rendered just before this item
          const showNowBefore =
            isToday &&
            index > 0 &&
            currentTotalMinutes > (timelineItems[index - 1].hour * 60 + timelineItems[index - 1].minute) &&
            currentTotalMinutes <= itemTotalMinutes;

          return (
            <React.Fragment key={item.id}>
              {/* Refined NOW Indicator */}
              {showNowBefore && (
                <div className="relative flex items-center gap-3 py-1 my-1">
                  <div className="w-12 text-right rtl:text-left shrink-0">
                    <span className="text-[9.5px] font-bold text-rose-500 uppercase tracking-widest">
                      NOW
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] shrink-0 z-10" />
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-rose-500/40 via-rose-500/15 to-transparent rtl:bg-gradient-to-l" />
                </div>
              )}

              {/* Timeline Item Card */}
              <div
                className={`group relative flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-[20px] transition-all duration-200 ${
                  isDark
                    ? 'bg-[#0E0E13] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#131318]'
                    : 'bg-white border border-black/[0.035] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-black/[0.06]'
                } ${item.isCompleted ? 'opacity-60' : ''}`}
              >
                {/* Time string */}
                <div className="w-12 pt-0.5 text-right rtl:text-left shrink-0">
                  <span className={`text-xs font-mono font-medium ${isDark ? 'text-[#8E8E98]' : 'text-zinc-500'}`}>
                    {item.time}
                  </span>
                </div>

                {/* Node icon */}
                <div className="pt-0.5 z-10 shrink-0">
                  {item.isCompleted ? (
                    <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/25">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border ${isDark ? 'border-white/20 bg-white/[0.02]' : 'border-zinc-300 bg-zinc-50'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/40' : 'bg-zinc-400'}`} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className={`text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full border ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-semibold tracking-tight leading-snug ${
                      isDark ? 'text-[#EDEDEF]' : 'text-zinc-950'
                    } ${item.isCompleted ? 'line-through opacity-70' : ''}`}
                  >
                    {item.title}
                  </h4>

                  {item.description && (
                    <p className={`text-xs mt-0.5 leading-relaxed line-clamp-2 ${isDark ? 'text-[#8E8E98]' : 'text-zinc-500'}`}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

