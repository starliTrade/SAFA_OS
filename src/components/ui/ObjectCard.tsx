/**
 * SAFA — Universal Object Card
 * Polymorphic card rendering any Universal Object with relation badges and quick status toggles.
 */

import React from 'react';
import { BaseObject, ObjectStatus, ObjectType } from '../../core/types/objects';
import { useObjects } from '../../core/context/ObjectContext';
import { Card } from './Card';
import { Tag } from './Button';
import { CheckCircle2, Circle, Link2, Sparkles, BookOpen, Heart, Flame, Calendar, Clock } from 'lucide-react';

interface ObjectCardProps {
  object: BaseObject;
  onClick?: () => void;
  showRelations?: boolean;
}

export function ObjectCard({ object, onClick, showRelations = true }: ObjectCardProps) {
  const { updateObject, getRelatedObjects } = useObjects();
  const related = getRelatedObjects(object.id);

  const isTask = object.type === ObjectType.TASK;
  const isHabit = object.type === ObjectType.HABIT;
  const isMemory = object.type === ObjectType.MEMORY;
  const isBook = object.type === ObjectType.BOOK;
  const isJournal = object.type === ObjectType.JOURNAL_ENTRY;
  const isProject = object.type === ObjectType.PROJECT;
  const isCompleted = object.status === ObjectStatus.COMPLETED;

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateObject(object.id, {
      status: isCompleted ? ObjectStatus.ACTIVE : ObjectStatus.COMPLETED,
    });
  };

  const getTypeBadgeColor = (type: ObjectType) => {
    switch (type) {
      case ObjectType.TASK:
        return 'bg-amber-50 text-amber-800 border-amber-200/60';
      case ObjectType.IDEA:
        return 'bg-purple-50 text-purple-800 border-purple-200/60';
      case ObjectType.NOTE:
        return 'bg-stone-100 text-stone-700 border-stone-200/80';
      case ObjectType.PROJECT:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/60';
      case ObjectType.HABIT:
        return 'bg-teal-50 text-teal-800 border-teal-200/60';
      case ObjectType.MEMORY:
        return 'bg-rose-50 text-rose-800 border-rose-200/60';
      case ObjectType.JOURNAL_ENTRY:
        return 'bg-orange-50 text-orange-800 border-orange-200/60';
      case ObjectType.BOOK:
        return 'bg-blue-50 text-blue-800 border-blue-200/60';
      default:
        return 'bg-stone-50 text-stone-600 border-stone-200/60';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative p-4 rounded-2xl bg-white border border-[#F0ECE8] subtle-shadow hover:shadow-md transition-all duration-200 cursor-pointer ${
        isCompleted ? 'opacity-60 bg-[#FAF9F7]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left icon or checkbox */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {isTask && (
            <button
              type="button"
              onClick={handleToggleComplete}
              className="mt-0.5 text-[#8C827D] hover:text-[#1C1917] transition-colors cursor-pointer shrink-0"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
          )}

          {isHabit && (
            <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
          )}

          {isMemory && (
            <div className="mt-0.5 w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-3.5 h-3.5 fill-rose-100" />
            </div>
          )}

          {isBook && (
            <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Title & Type Badge */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${getTypeBadgeColor(
                  object.type
                )}`}
              >
                {object.type.replace('_', ' ')}
              </span>

              {object.status === ObjectStatus.INBOX && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5EBE6] text-[#8C5D50] border border-[#E8D5CE]">
                  Inbox
                </span>
              )}

              {object.metadata?.priority === 'high' && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Priority
                </span>
              )}
            </div>

            <h4
              className={`text-sm font-medium text-[#1C1917] tracking-tight leading-snug break-words ${
                isCompleted ? 'line-through text-[#8C827D]' : ''
              }`}
            >
              {object.title}
            </h4>

            {object.description && (
              <p className="text-xs text-[#78716C] mt-1 line-clamp-2 leading-relaxed">
                {object.description}
              </p>
            )}

            {/* Special metadata view for Books, Habits, Projects */}
            {isProject && object.metadata?.progress !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#EDE8E1] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1C1917] rounded-full transition-all"
                    style={{ width: `${object.metadata.progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#8C827D] font-medium">
                  {object.metadata.progress}%
                </span>
              </div>
            )}

            {isHabit && object.metadata?.streak !== undefined && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-teal-700 font-medium">
                <Flame className="w-3.5 h-3.5 fill-teal-100" />
                <span>{object.metadata.streak} day streak</span>
              </div>
            )}

            {/* Tags & Relationship count */}
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {object.tags?.map((t) => (
                <Tag key={t} label={t} color="neutral" />
              ))}

              {showRelations && related.length > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[#8C827D] bg-[#F5F2EC] px-2 py-0.5 rounded-full border border-[#E7E2DC]">
                  <Link2 className="w-3 h-3" />
                  <span>{related.length}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
