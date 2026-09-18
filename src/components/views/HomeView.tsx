/**
 * SAFA — Home 3.0: Living Home Experience (Build 03)
 * From Productivity Dashboard → Safa's Personal Living World
 *
 * Core Concept:
 * LIFE + SELF + CREATION + MEMORY + INSPIRATION + CONTEXT + EXECUTION
 *
 * Visual Rhythm:
 * GREETING & 3D LIVING HERO (Atmosphere)
 * → DAILY INTENTION (Emotional Typography)
 * → ATELIER & CREATIVE WORLD (Visual & Tactile)
 * → DAILY FORTUNE / FAL (Interactive Delight)
 * → NOW IN MUSIC (Media Atmosphere)
 * → INSPIRATION RAIL (Horizontal Visuals)
 * → EXECUTION LAYER (Date Rail, Focus, Daily Timeline, Actions)
 * → MOVEMENT & VITALITY (Wellness)
 * → MEMORY & TRAVEL DREAMS (Sanctuary)
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';
import { useObjects } from '../../core/context/ObjectContext';
import { BaseObject, ObjectType, ObjectStatus } from '../../core/types/objects';

// Modular Home Components
import { LivingHero } from '../home/LivingHero';
import { DailyMoment } from '../home/DailyMoment';
import { DailyFortune } from '../home/DailyFortune';
import { AtelierMoment } from '../home/AtelierMoment';
import { MusicMoment } from '../home/MusicMoment';
import { InspirationRail } from '../home/InspirationRail';
import { MovementMoment } from '../home/MovementMoment';
import { MemoryMoment } from '../home/MemoryMoment';
import { ReadingMoment } from '../home/ReadingMoment';
import { TravelMoment } from '../home/TravelMoment';
import { ExecutionSection } from '../home/ExecutionSection';
import { getDailySpotlightTheme } from '../home/homeSpotlight';

export function HomeView() {
  const { user, isRTL } = useAuth();
  const { openCapture, themeMode } = useApp();
  const { objects, updateObject, setSelectedObject } = useObjects();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const isDark = themeMode === 'dark';

  // Dynamic Day-of-Week Spotlight theme
  const spotlightTheme = useMemo(() => getDailySpotlightTheme(selectedDate), [selectedDate]);

  // Specific Object Graph Selectors
  const songObject = useMemo(
    () => objects.find((o) => o.type === ObjectType.SONG && o.status !== ObjectStatus.TRASHED),
    [objects]
  );

  const atelierProject = useMemo(
    () =>
      objects.find(
        (o) =>
          (o.type === ObjectType.FASHION_PROJECT ||
            (o.type === ObjectType.PROJECT &&
              (o.tags.includes('fashion') || o.tags.includes('atelier')))) &&
          o.status !== ObjectStatus.TRASHED
      ),
    [objects]
  );

  const sketchObject = useMemo(
    () => objects.find((o) => o.type === ObjectType.SKETCH && o.status !== ObjectStatus.TRASHED),
    [objects]
  );

  const movementHabit = useMemo(
    () =>
      objects.find(
        (o) =>
          o.type === ObjectType.HABIT &&
          (o.tags.includes('movement') || o.tags.includes('wellness') || o.tags.includes('pilates')) &&
          o.status !== ObjectStatus.TRASHED
      ) || objects.find((o) => o.type === ObjectType.HABIT && o.status !== ObjectStatus.TRASHED),
    [objects]
  );

  const inspirationItems = useMemo(
    () =>
      objects.filter(
        (o) =>
          (o.type === ObjectType.PHOTO ||
            o.type === ObjectType.SKETCH ||
            o.tags.includes('inspiration') ||
            o.tags.includes('aesthetic')) &&
          o.status !== ObjectStatus.TRASHED
      ),
    [objects]
  );

  const memoryObject = useMemo(
    () =>
      objects.find(
        (o) =>
          (o.type === ObjectType.MEMORY || o.type === ObjectType.JOURNAL_ENTRY) &&
          o.status !== ObjectStatus.TRASHED
      ),
    [objects]
  );

  const bookObject = useMemo(
    () => objects.find((o) => o.type === ObjectType.BOOK && o.status !== ObjectStatus.TRASHED),
    [objects]
  );

  const tripObject = useMemo(
    () => objects.find((o) => o.type === ObjectType.TRIP && o.status !== ObjectStatus.TRASHED),
    [objects]
  );

  // Quick Action Handlers
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

  const handleIncrementHabit = async (habit: BaseObject, e: React.MouseEvent) => {
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
      {/* 1. Living Header & Atmospheric 3D Depth Sculpture */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LivingHero selectedDate={selectedDate} onOpenCapture={() => openCapture()} />
      </motion.div>

      {/* 2. Today's Emotional Intention (Editorial Typography) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <DailyMoment />
      </motion.div>

      {/* 3. Creative & Fashion Atelier Moment */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AtelierMoment
          atelierProject={atelierProject}
          sketchObject={sketchObject}
          onSelectObject={(obj) => setSelectedObject(obj)}
          onNewDesign={() => openCapture()}
        />
      </motion.div>

      {/* 4. Daily Fortune / Fal (Interactive Poetic Whispers) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <DailyFortune />
      </motion.div>

      {/* 5. Music Moment (Now / Today in Music) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <MusicMoment
          songObject={songObject}
          onSelectObject={(obj) => setSelectedObject(obj)}
          onCaptureMusic={() => openCapture()}
        />
      </motion.div>

      {/* 6. Inspiration Moment (Horizontal Visual Rail) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <InspirationRail
          items={inspirationItems}
          onSelectItem={(obj) => setSelectedObject(obj)}
          onAddInspiration={() => openCapture()}
        />
      </motion.div>

      {/* 7. Calm Execution Layer (Timeline, Focus, Schedule, Tasks & Habits) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <ExecutionSection
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          objects={objects}
          onSelectObject={(obj) => setSelectedObject(obj)}
          onToggleTask={handleToggleTask}
          onIncrementHabit={handleIncrementHabit}
          onOpenCapture={() => openCapture()}
        />
      </motion.div>

      {/* 8. Movement & Vitality Moment */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        <MovementMoment
          movementHabit={movementHabit}
          onSelectHabit={(obj) => setSelectedObject(obj)}
          onCheckIn={handleIncrementHabit}
          onAddMovement={() => openCapture()}
        />
      </motion.div>

      {/* 9. Reading & Book Moment */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <ReadingMoment
          bookObject={bookObject}
          onSelectBook={(obj) => setSelectedObject(obj)}
          onAddBook={() => openCapture()}
        />
      </motion.div>

      {/* 10. Travel & Dream Moment */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.45 }}
      >
        <TravelMoment
          tripObject={tripObject}
          onSelectTrip={(obj) => setSelectedObject(obj)}
          onAddTrip={() => openCapture()}
        />
      </motion.div>

      {/* 11. Personal Memory Moment */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <MemoryMoment
          memoryObject={memoryObject}
          onSelectMemory={(obj) => setSelectedObject(obj)}
          onCaptureMemory={() => openCapture()}
        />
      </motion.div>
    </div>
  );
}
