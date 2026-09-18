/**
 * SAFA — Daily Timeline & Live Moment Indicator (Build 01.5)
 * Modern, calm daily schedule representation with real-time "NOW" marker.
 */

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Circle, Sparkles, MapPin } from 'lucide-react';
import { BaseObject, ObjectType, ObjectStatus } from '../../core/types/objects';
import { useAuth } from '../../core/context/AuthContext';

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
}

interface DailyTimelineProps {
  selectedDate: Date;
  isToday: boolean;
  objects: BaseObject[];
  onSelectObject?: (object: BaseObject) => void;
  onToggleTask?: (objectId: string) => void;
}

export function DailyTimeline({
  selectedDate,
  isToday,
  objects,
  onSelectObject,
  onToggleTask,
}: DailyTimelineProps) {
  const { isRTL } = useAuth();
  const [nowTime, setNowTime] = useState<Date>(new Date());

  // Update live clock every minute when viewing today
  useEffect(() => {
    if (!isToday) return;
    const interval = setInterval(() => {
      setNowTime(new Date());
    } , 30000);
    return () => clearInterval(interval);
  }, [isToday]);

  const currentHour = nowTime.getHours();
  const currentMinute = nowTime.getMinutes();
  const currentTimeFormatted = nowTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Pull active tasks with due dates or times if available, or assemble daily rhythm
  const timelineItems: TimelineItem[] = React.useMemo(() => {
    // Dynamic sample rhythm for Safa's day
    const baseItems: TimelineItem[] = [
      {
        id: 't-1',
        time: '09:00',
        hour: 9,
        minute: 0,
        title: isRTL ? 'مراقبه صبحگاهی و تنفس آرام' : 'Morning Meditation & Herbal Tea',
        category: 'RITUAL',
        description: isRTL ? '۱۰ دقیقه تمرکز و نوشتن دفترچه صفا' : '10 minutes stillness, journaling in SAFA',
        isCompleted: true,
      },
      {
        id: 't-2',
        time: '11:00',
        hour: 11,
        minute: 0,
        title: isRTL ? 'کارگاه طراحی پارچه و پالت رنگ' : 'Fashion Atelier: Silk Draping & Color Swatches',
        category: 'STUDIO',
        description: isRTL ? 'پروژه کلکسیون پاییزه' : 'Autumn Capsule Collection — Silk & Wool concepts',
      },
      {
        id: 't-3',
        time: '14:30',
        hour: 14,
        minute: 3,
        title: isRTL ? 'ناهار آرام و مطالعه رمان' : 'Lunch & Reading: The Forty Rules of Love',
        category: 'REST',
        description: isRTL ? 'فصل هفتم' : 'Chapter 7 — quiet reflective break',
      },
      {
        id: 't-4',
        time: '17:00',
        hour: 17,
        minute: 0,
        title: isRTL ? 'پیاده‌روی عصرگاهی و تمرین تمرکز' : 'Evening Walk & Pilates Rhythm',
        category: 'LIFE',
        description: isRTL ? 'روستای ونک یا پارک آرام' : '45 minutes restorative movement',
      },
      {
        id: 't-5',
        time: '20:30',
        hour: 20,
        minute: 3,
        title: isRTL ? 'مرور افکار روز و ثبت خاطرات' : 'Evening Reflections & Memory Capture',
        category: 'PERSONAL',
        description: isRTL ? 'ثبت ایده‌های نو' : 'Closing the day with calm thoughts in SAFA',
      },
    ];

    // If day is not today, adjust status
    if (!isToday) {
      return baseItems.map((item) => ({ ...item, isCompleted: false }));
    }
    return baseItems;
  }, [isToday, isRTL]);

  const getCategoryTag = (cat: TimelineItem['category']) => {
    switch (cat) {
      case 'STUDIO':
        return {
          label: isRTL ? 'آتلیه' : 'Atelier',
          bg: 'bg-[#FAF4F2] text-[#9E6859] border-[#E2CECB]/70',
        };
      case 'RITUAL':
        return {
          label: isRTL ? 'آیین' : 'Ritual',
          bg: 'bg-[#F2F7F4] text-[#4A7A57] border-[#CBE0D1]/80',
        };
      case 'REST':
        return {
          label: isRTL ? 'آرامش' : 'Rest',
          bg: 'bg-[#FAF7F0] text-[#917148] border-[#EDE3D3]/80',
        };
      default:
        return {
          label: isRTL ? 'روزمره' : 'Life',
          bg: 'bg-[#F5F1EB] text-[#57534E] border-black/[0.04]',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8A827C]">
          {isRTL ? 'برنامه و جریان روز' : 'Daily Rhythm & Timeline'}
        </h3>
        {isToday && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#9E6859] font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E6859] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9E6859]"></span>
            </span>
            <span>{currentTimeFormatted}</span>
          </div>
        )}
      </div>

      <div className="relative pl-2 sm:pl-4 space-y-3">
        {/* Subtle vertical spine */}
        <div className="absolute left-[31px] sm:left-[39px] top-3 bottom-3 w-[1px] bg-black/[0.05]" />

        {timelineItems.map((item, index) => {
          const itemTotalMinutes = item.hour * 60 + item.minute;
          const currentTotalMinutes = currentHour * 60 + currentMinute;
          const isPassed = isToday && currentTotalMinutes > itemTotalMinutes + 60;
          const isNext = isToday && currentTotalMinutes <= itemTotalMinutes;
          const tag = getCategoryTag(item.category);

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
                <div className="relative flex items-center gap-3 py-1 my-1 select-none">
                  <div className="w-12 text-right shrink-0">
                    <span className="text-[10px] font-semibold text-[#9E6859] uppercase tracking-wider">
                      NOW
                    </span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9E6859] ring-4 ring-[#FAF4F2] shrink-0 z-10" />
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#9E6859]/60 via-[#9E6859]/20 to-transparent" />
                  <span className="text-[10px] font-medium text-[#9E6859] pr-2">
                    {currentTimeFormatted}
                  </span>
                </div>
              )}

              {/* Timeline Item Card */}
              <div
                className={`relative flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-2xl transition-all duration-150 ${
                  item.isCompleted
                    ? 'opacity-60 bg-transparent'
                    : 'bg-white/80 hover:bg-white border border-black/[0.04] shadow-e1 hover:shadow-e2'
                }`}
              >
                {/* Time string */}
                <div className="w-11 sm:w-12 pt-0.5 text-right shrink-0">
                  <span className="text-xs font-mono font-medium text-[#736B66]">
                    {item.time}
                  </span>
                </div>

                {/* Node icon */}
                <div className="pt-0.5 z-10 shrink-0">
                  {item.isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-[#F2F7F4] text-[#4A7A57] flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-black/[0.1] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span
                      className={`text-[9.5px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full border ${tag.bg}`}
                    >
                      {tag.label}
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-medium text-[#1C1917] tracking-tight leading-snug ${
                      item.isCompleted ? 'line-through text-[#8A827C]' : ''
                    }`}
                  >
                    {item.title}
                  </h4>

                  {item.description && (
                    <p className="text-xs text-[#736B66] mt-0.5 leading-relaxed line-clamp-2">
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
