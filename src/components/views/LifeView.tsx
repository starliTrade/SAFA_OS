/**
 * SAFA — Life Shell
 * Calm productivity: Tasks, Calendar rhythm, Reminders, Goals, Habits, and Projects.
 */

import React, { useState } from 'react';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp, LifeSubview } from '../../core/context/AppContext';
import { ObjectType, ObjectStatus } from '../../core/types/objects';
import { SegmentedControl, SegmentOption } from '../ui/SegmentedControl';
import { ObjectCard } from '../ui/ObjectCard';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/Toast';
import {
  CheckSquare,
  Calendar as CalendarIcon,
  Bell,
  Target,
  Flame,
  FolderKanban,
  Plus,
} from 'lucide-react';

export function LifeView() {
  const { objects, setSelectedObject } = useObjects();
  const { lifeSubview, setLifeSubview, openCapture } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ACTIVE');

  const subviewOptions: SegmentOption<LifeSubview>[] = [
    { value: 'TASKS', label: 'Tasks', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { value: 'HABITS', label: 'Habits', icon: <Flame className="w-3.5 h-3.5" /> },
    { value: 'PROJECTS', label: 'Projects', icon: <FolderKanban className="w-3.5 h-3.5" /> },
    { value: 'GOALS', label: 'Goals', icon: <Target className="w-3.5 h-3.5" /> },
    { value: 'REMINDERS', label: 'Reminders', icon: <Bell className="w-3.5 h-3.5" /> },
    { value: 'CALENDAR', label: 'Schedule', icon: <CalendarIcon className="w-3.5 h-3.5" /> },
  ];

  const getTargetType = (): ObjectType => {
    switch (lifeSubview) {
      case 'TASKS':
        return ObjectType.TASK;
      case 'HABITS':
        return ObjectType.HABIT;
      case 'PROJECTS':
        return ObjectType.PROJECT;
      case 'GOALS':
        return ObjectType.GOAL;
      case 'REMINDERS':
        return ObjectType.REMINDER;
      case 'CALENDAR':
        return ObjectType.EVENT;
      default:
        return ObjectType.TASK;
    }
  };

  const currentType = getTargetType();

  const filteredObjects = objects.filter((o) => {
    if (o.type !== currentType) return false;
    if (filterStatus === 'ACTIVE') return o.status === ObjectStatus.ACTIVE;
    if (filterStatus === 'COMPLETED') return o.status === ObjectStatus.COMPLETED;
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Subviews Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif-luxury font-medium text-[#1C1917] tracking-tight">
            Life & Productivity
          </h2>
          <p className="text-xs text-[#78716C] mt-0.5">
            Organize tasks, habits, and long-term milestones with calm clarity.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => openCapture(currentType)}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          New {subviewOptions.find((o) => o.value === lifeSubview)?.label.slice(0, -1) || 'Item'}
        </Button>
      </div>

      {/* Subview Selector */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <SegmentedControl
          options={subviewOptions}
          value={lifeSubview}
          onChange={setLifeSubview}
          size="sm"
        />
      </div>

      {/* Status Filter for tasks/projects */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-[#F5F2EC] p-1 rounded-full border border-[#E7E2DC]/80">
          {(['ACTIVE', 'COMPLETED', 'ALL'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterStatus === s
                  ? 'bg-white text-[#1C1917] shadow-2xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#8C827D]">
          {filteredObjects.length} {filteredObjects.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Object List / Grid */}
      {filteredObjects.length === 0 ? (
        <EmptyState
          title={`No ${lifeSubview.toLowerCase()} found`}
          description={`Start capturing and tracking your ${lifeSubview.toLowerCase()} in SAFA.`}
          actionLabel={`Add ${subviewOptions.find((o) => o.value === lifeSubview)?.label || 'Item'}`}
          onAction={() => openCapture(currentType)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredObjects.map((obj) => (
            <ObjectCard
              key={obj.id}
              object={obj}
              onClick={() => setSelectedObject(obj)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
