/**
 * SAFA — Unified Velvet Date Rail (Build 02.1)
 * Seamless dark depth (#111114) with soft satin selected token (#EBEBEF).
 */

import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../core/context/AuthContext';
import { Check } from 'lucide-react';

interface TodayRailProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function TodayRail({ selectedDate, onSelectDate }: TodayRailProps) {
  const { isRTL } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate 14 days around today (-4 past days, today, +9 future days)
  const days = React.useMemo(() => {
    const list: Date[] = [];
    const now = new Date();
    for (let i = -4; i <= 9; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      list.push(d);
    }
    return list;
  }, []);

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isPastDay = (d: Date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const check = new Date(d);
    check.setHours(0, 0, 0, 0);
    return check.getTime() < now.getTime();
  };

  const isToday = (d: Date) => {
    return isSameDay(d, new Date());
  };

  const getDayOfWeekName = (date: Date) => {
    if (isRTL) {
      const persianWeekdays = ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'];
      return persianWeekdays[date.getDay() === 0 ? 0 : date.getDay()];
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Auto-scroll selected/today into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDate]);

  return (
    <div className="w-full relative py-1 select-none">
      <div
        ref={scrollRef}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
      >
        {days.map((d) => {
          const selected = isSameDay(d, selectedDate);
          const today = isToday(d);
          const past = isPastDay(d);

          return (
            <button
              key={d.toISOString()}
              type="button"
              data-selected={selected ? 'true' : 'false'}
              onClick={() => onSelectDate(d)}
              className="group relative shrink-0 flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95"
            >
              {/* Day Label (e.g. Fri, Sat, Sun) */}
              <span
                className={`text-[11px] font-medium tracking-tight mb-1.5 transition-colors ${
                  selected
                    ? 'text-[#EDEDEF] font-semibold'
                    : 'text-[#686873] group-hover:text-[#A1A1AA]'
                }`}
              >
                {today ? (isRTL ? 'امروز' : 'Today') : getDayOfWeekName(d)}
              </span>

              {/* Circular Pill Token */}
              <div
                className={`relative w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-200 ${
                  selected
                    ? 'bg-[#EBEBEF] text-[#0C0C0E] shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-bold'
                    : 'bg-[#111114] text-[#92929B] border border-white/[0.035] hover:bg-[#151519] hover:border-white/[0.07] hover:text-[#EDEDEF]'
                }`}
              >
                <span
                  className={`text-base font-medium tracking-tight ${
                    selected ? 'font-bold text-lg' : ''
                  }`}
                >
                  {d.getDate()}
                </span>

                {/* Completed Checkmark Micro-badge for Past Days */}
                {past && !selected && (
                  <span className="absolute -bottom-1 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs bg-[#1A1A20] text-[#A1A1AA] border border-white/[0.08]">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                )}

                {/* Today tiny indicator dot if not selected */}
                {today && !selected && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#EDEDEF]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
