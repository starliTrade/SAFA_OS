/**
 * SAFA — Home Shell
 * Calm, deeply personal landing view for Safa with daily rhythm, focus items, and inspiration.
 */

import React from 'react';
import { useAuth } from '../../core/context/AuthContext';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import { ObjectType, ObjectStatus } from '../../core/types/objects';
import { ObjectCard } from '../ui/ObjectCard';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/Toast';
import {
  Sparkles,
  Plus,
  CheckCircle2,
  Flame,
  BookOpen,
  ArrowRight,
  Sun,
  Moon,
  CloudSun,
  Layers,
  Inbox,
  PenTool,
} from 'lucide-react';

export function HomeView() {
  const { user, isRTL } = useAuth();
  const { objects, setSelectedObject, inboxCount } = useObjects();
  const { openCapture, setCurrentTab, setLifeSubview, setCreateSubview } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { en: 'Good morning', fa: 'صبح بخیر', icon: <Sun className="w-4 h-4 text-amber-500" /> };
    if (hour < 18) return { en: 'Good afternoon', fa: 'عصر بخیر', icon: <CloudSun className="w-4 h-4 text-amber-600" /> };
    return { en: 'Good evening', fa: 'شب بخیر', icon: <Moon className="w-4 h-4 text-indigo-400" /> };
  };

  const greeting = getGreeting();
  const userName = user?.profile?.name || 'Safa';
  const persianName = user?.profile?.persianName || 'صفا';

  // Filter Focus items for today (Tasks + Habits)
  const activeTasks = objects.filter(
    (o) => o.type === ObjectType.TASK && o.status === ObjectStatus.ACTIVE
  );
  const activeHabits = objects.filter(
    (o) => o.type === ObjectType.HABIT && o.status !== ObjectStatus.ARCHIVED
  );
  const activeProjects = objects.filter(
    (o) => o.type === ObjectType.PROJECT && o.status === ObjectStatus.ACTIVE
  );
  const recentMemories = objects.filter(
    (o) => o.type === ObjectType.MEMORY || o.type === ObjectType.JOURNAL_ENTRY
  );

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Warm Greeting & Calm Sanctuary Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF5F0] via-[#FAF8F5] to-[#F5EBE6] p-6 sm:p-8 border border-[#EBE3DA] shadow-xs">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#8C827D] mb-1">
              {greeting.icon}
              <span>{greeting.en}</span>
              <span className="font-persian-luxury text-stone-500">• {greeting.fa}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#1C1917] tracking-tight">
              {userName}
              <span className="font-persian-luxury text-xl sm:text-2xl font-normal text-[#8C827D] ml-2">
                {persianName}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1.5 max-w-md leading-relaxed">
              Welcome to your calm space. Everything you capture is safe, organized, and connected.
            </p>
          </div>

          {/* Quick Capture trigger */}
          <div className="shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => openCapture()}
              icon={<Plus className="w-4 h-4" />}
            >
              Quick Capture
            </Button>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute -right-6 -bottom-8 pointer-events-none opacity-[0.04] font-serif-luxury text-9xl text-stone-900 select-none">
          صفا
        </div>
      </section>

      {/* 2. Today's Rhythm & Glance Statistics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => {
            setCurrentTab('LIFE');
            setLifeSubview('TASKS');
          }}
          className="p-4 rounded-2xl bg-white border border-[#F0ECE8] subtle-shadow hover:border-[#C5A880]/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8C827D] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif-luxury font-medium text-[#1C1917]">
            {activeTasks.length}
          </div>
          <span className="text-[11px] text-[#8C827D]">Pending today</span>
        </div>

        <div
          onClick={() => {
            setCurrentTab('LIFE');
            setLifeSubview('HABITS');
          }}
          className="p-4 rounded-2xl bg-white border border-[#F0ECE8] subtle-shadow hover:border-[#C5A880]/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8C827D] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Habits</span>
            <Flame className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-serif-luxury font-medium text-[#1C1917]">
            {activeHabits.length}
          </div>
          <span className="text-[11px] text-[#8C827D]">Active rituals</span>
        </div>

        <div
          onClick={() => {
            setCurrentTab('LIFE');
            setLifeSubview('PROJECTS');
          }}
          className="p-4 rounded-2xl bg-white border border-[#F0ECE8] subtle-shadow hover:border-[#C5A880]/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8C827D] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Projects</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-serif-luxury font-medium text-[#1C1917]">
            {activeProjects.length}
          </div>
          <span className="text-[11px] text-[#8C827D]">In progress</span>
        </div>

        <div
          onClick={() => setCurrentTab('INBOX')}
          className="p-4 rounded-2xl bg-white border border-[#F0ECE8] subtle-shadow hover:border-[#C5A880]/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#8C827D] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Inbox</span>
            <Inbox className="w-4 h-4 text-[#8C5D50]" />
          </div>
          <div className="text-2xl font-serif-luxury font-medium text-[#1C1917]">
            {inboxCount}
          </div>
          <span className="text-[11px] text-[#8C827D]">Needs triage</span>
        </div>
      </section>

      {/* 3. Focus For Today (Actionable Tasks) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-base font-medium text-[#1C1917] tracking-tight">
              Focus For Today
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setCurrentTab('LIFE');
              setLifeSubview('TASKS');
            }}
            className="text-xs font-medium text-[#8C5D50] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all in Life</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {activeTasks.length === 0 ? (
          <EmptyState
            title="Your day is clear"
            persianTitle="امروز کارهای شما انجام شده است"
            description="Enjoy the peace or capture a new task whenever you're ready."
            actionLabel="Add Task"
            onAction={() => openCapture(ObjectType.TASK)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeTasks.slice(0, 4).map((task) => (
              <ObjectCard
                key={task.id}
                object={task}
                onClick={() => setSelectedObject(task)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Creative Inspiration & Active Projects */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <h3 className="text-base font-medium text-[#1C1917] tracking-tight">
              Creative Atelier & Projects
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setCurrentTab('CREATE');
              setCreateSubview('STUDIO');
            }}
            className="text-xs font-medium text-[#8C5D50] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeProjects.map((proj) => (
            <ObjectCard
              key={proj.id}
              object={proj}
              onClick={() => setSelectedObject(proj)}
            />
          ))}
        </div>
      </section>

      {/* 5. Serene Quote & Aesthetic Memory */}
      <section className="p-6 rounded-3xl bg-[#FAF8F2] border border-[#EFE8DC] subtle-shadow">
        <div className="max-w-md mx-auto text-center space-y-2">
          <p className="font-serif-luxury italic text-sm text-[#443E3A] leading-relaxed">
            "Simplicity is the ultimate sophistication. In clarity, creativity flourishes."
          </p>
          <span className="block text-[11px] font-medium tracking-wider uppercase text-[#8C827D]">
            SAFA Philosophy • صفا
          </span>
        </div>
      </section>
    </div>
  );
}
