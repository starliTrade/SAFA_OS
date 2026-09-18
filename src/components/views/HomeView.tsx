/**
 * SAFA — Home 4.0: Living World & Home Composition Engine (Build 04)
 * SLE (SAFA Living Experience) + SOLG (SAFA Obsidian Liquid Glass).
 *
 * Architecture:
 * Universal Object Graph + Context Engine → Home Composition Engine → Composed Living Surfaces
 *
 * Visual & Emotional Flow:
 * 1. ATMOSPHERE (Living Hero & Celestial Depth Sculpture)
 * 2. EDITORIAL WHISPER (Daily Intention)
 * 3. TEMPORAL HORIZON (Today Rail)
 * 4. PERSONAL SPOTLIGHT (Hero Creative / Media / Archival Moment)
 * 5. LIVING MEDIA & MOVEMENT (Music & Mindful Rhythm)
 * 6. ATELIER & INSPIRATION (Editorial Fashion & Visual Moods)
 * 7. SANCTUARY WORLDS (Books, Memories & Wanderlust Dreams)
 * 8. DAILY FORTUNE (Playful Micro-Delight Whisper)
 * 9. YOUR DAY & FLOW (Execution: Focus, Real Schedule Timeline, Tasks & Habits)
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
import { TodayRail } from '../home/TodayRail';
import { DailyFortune } from '../home/DailyFortune';
import { AtelierMoment } from '../home/AtelierMoment';
import { MusicMoment } from '../home/MusicMoment';
import { InspirationRail } from '../home/InspirationRail';
import { MovementMoment } from '../home/MovementMoment';
import { MemoryMoment } from '../home/MemoryMoment';
import { ReadingMoment } from '../home/ReadingMoment';
import { TravelMoment } from '../home/TravelMoment';
import { ExecutionSection } from '../home/ExecutionSection';

// Composition Engine
import {
  composeHomeExperience,
  getTimeOfDay,
  HomeCompositionResult,
} from '../home/homeComposition';

export function HomeView() {
  const { user, isRTL } = useAuth();
  const { openCapture, themeMode } = useApp();
  const { objects, updateObject, setSelectedObject } = useObjects();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const now = new Date();
  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  // Run the Home Composition Engine over the Object Graph & context
  const composition: HomeCompositionResult = useMemo(() => {
    return composeHomeExperience({
      currentTime: now,
      selectedDate,
      isToday,
      dayOfWeek: selectedDate.getDay(),
      timeOfDay: getTimeOfDay(now),
      objects,
    });
  }, [objects, selectedDate, isToday]);

  // Quick Interactive Handlers
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
      {/* 1. Living Header & Atmospheric Celestial Depth Sculpture */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <LivingHero selectedDate={selectedDate} onOpenCapture={() => openCapture()} />
      </motion.div>

      {/* 2. Today's Emotional Intention (Editorial Typography & Breathing Space) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.04 }}
      >
        <DailyMoment />
      </motion.div>

      {/* 3. Temporal Horizon (Tactile Today Date Rail) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.08 }}
        className="pt-1 pb-1"
      >
        <TodayRail selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </motion.div>

      {/* 4. Primary Spotlight Moment (Driven by Composition Engine) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.12 }}
      >
        {composition.spotlightDomain === 'ATELIER' && (
          <AtelierMoment
            atelierProject={composition.atelierProject}
            sketchObject={composition.sketchObject}
            onSelectObject={(obj) => setSelectedObject(obj)}
            onNewDesign={() => openCapture()}
          />
        )}
        {composition.spotlightDomain === 'MUSIC' && (
          <MusicMoment
            songObject={composition.songObject}
            onSelectObject={(obj) => setSelectedObject(obj)}
            onCaptureMusic={() => openCapture()}
          />
        )}
        {composition.spotlightDomain === 'MOVEMENT' && (
          <MovementMoment
            movementHabit={composition.movementHabit}
            onSelectHabit={(obj) => setSelectedObject(obj)}
            onCheckIn={handleIncrementHabit}
            onAddMovement={() => openCapture()}
          />
        )}
        {composition.spotlightDomain === 'INSPIRATION' && (
          <InspirationRail
            items={composition.inspirationItems}
            onSelectItem={(obj) => setSelectedObject(obj)}
            onAddInspiration={() => openCapture()}
          />
        )}
        {composition.spotlightDomain === 'MEMORY' && (
          <MemoryMoment
            memoryObject={composition.memoryObject}
            onSelectMemory={(obj) => setSelectedObject(obj)}
            onCaptureMemory={() => openCapture()}
          />
        )}
        {composition.spotlightDomain === 'READING' && (
          <ReadingMoment
            bookObject={composition.bookObject}
            onSelectBook={(obj) => setSelectedObject(obj)}
            onAddBook={() => openCapture()}
          />
        )}
        {composition.spotlightDomain === 'TRAVEL' && (
          <TravelMoment
            tripObject={composition.tripObject}
            onSelectTrip={(obj) => setSelectedObject(obj)}
            onAddTrip={() => openCapture()}
          />
        )}
      </motion.div>

      {/* 5. Living Media & Movement Grid (Dynamic Visual Balance) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {composition.spotlightDomain !== 'MUSIC' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.16 }}
          >
            <MusicMoment
              songObject={composition.songObject}
              onSelectObject={(obj) => setSelectedObject(obj)}
              onCaptureMusic={() => openCapture()}
            />
          </motion.div>
        )}

        {composition.spotlightDomain !== 'MOVEMENT' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.18 }}
          >
            <MovementMoment
              movementHabit={composition.movementHabit}
              onSelectHabit={(obj) => setSelectedObject(obj)}
              onCheckIn={handleIncrementHabit}
              onAddMovement={() => openCapture()}
            />
          </motion.div>
        )}
      </div>

      {/* 6. Creative Atelier & Inspiration Visuals */}
      {composition.spotlightDomain !== 'ATELIER' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.2 }}
        >
          <AtelierMoment
            atelierProject={composition.atelierProject}
            sketchObject={composition.sketchObject}
            onSelectObject={(obj) => setSelectedObject(obj)}
            onNewDesign={() => openCapture()}
          />
        </motion.div>
      )}

      {composition.spotlightDomain !== 'INSPIRATION' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.22 }}
        >
          <InspirationRail
            items={composition.inspirationItems}
            onSelectItem={(obj) => setSelectedObject(obj)}
            onAddInspiration={() => openCapture()}
          />
        </motion.div>
      )}

      {/* 7. Daily Fortune / Fal (Delightful Interactive Micro-Whisper) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.24 }}
      >
        <DailyFortune />
      </motion.div>

      {/* 8. Sanctuary Layer (Reading, Memory, Travel Dreams) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {composition.spotlightDomain !== 'READING' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.26 }}
          >
            <ReadingMoment
              bookObject={composition.bookObject}
              onSelectBook={(obj) => setSelectedObject(obj)}
              onAddBook={() => openCapture()}
            />
          </motion.div>
        )}

        {composition.spotlightDomain !== 'TRAVEL' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.28 }}
          >
            <TravelMoment
              tripObject={composition.tripObject}
              onSelectTrip={(obj) => setSelectedObject(obj)}
              onAddTrip={() => openCapture()}
            />
          </motion.div>
        )}
      </div>

      {composition.spotlightDomain !== 'MEMORY' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.3 }}
        >
          <MemoryMoment
            memoryObject={composition.memoryObject}
            onSelectMemory={(obj) => setSelectedObject(obj)}
            onCaptureMemory={() => openCapture()}
          />
        </motion.div>
      )}

      {/* 9. Calm Execution Layer (Anchored Below Living Content) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.32 }}
      >
        <ExecutionSection
          selectedDate={selectedDate}
          objects={objects}
          timelineItems={composition.scheduledTimelineItems}
          focusObject={composition.focusObject}
          activeTasks={composition.activeTasks}
          activeHabits={composition.activeHabits}
          onSelectObject={(obj) => setSelectedObject(obj)}
          onToggleTask={handleToggleTask}
          onIncrementHabit={handleIncrementHabit}
          onOpenCapture={() => openCapture()}
        />
      </motion.div>
    </div>
  );
}
