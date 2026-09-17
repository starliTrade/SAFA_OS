/**
 * SAFA — More Shell
 * Memories, Journal Reflection, Connected Graph Map, SLO Hub, and Data Sovereignty.
 */

import React, { useState } from 'react';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import { useAuth } from '../../core/context/AuthContext';
import { ObjectType, ObjectStatus } from '../../core/types/objects';
import { ObjectCard } from '../ui/ObjectCard';
import { Button } from '../ui/Button';
import { SegmentedControl } from '../ui/SegmentedControl';
import {
  Heart,
  BookHeart,
  Network,
  HeartHandshake,
  Download,
  ShieldCheck,
  Sparkles,
  Link2,
} from 'lucide-react';

export function MoreView() {
  const { objects, setSelectedObject, getRelatedObjects } = useObjects();
  const { openCapture, setIsSettingsOpen, addToast } = useApp();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'MEMORIES' | 'JOURNAL' | 'GRAPH' | 'SLO'>('MEMORIES');

  const memories = objects.filter((o) => o.type === ObjectType.MEMORY);
  const journals = objects.filter((o) => o.type === ObjectType.JOURNAL_ENTRY);
  const sloSharedObjects = objects.filter((o) => o.permissions?.allowSLOAccess);

  const sections = [
    { value: 'MEMORIES', label: 'Memories', icon: <Heart className="w-3.5 h-3.5" /> },
    { value: 'JOURNAL', label: 'Journal', icon: <BookHeart className="w-3.5 h-3.5" /> },
    { value: 'GRAPH', label: 'Graph Map', icon: <Network className="w-3.5 h-3.5" /> },
    { value: 'SLO', label: 'SLO Hub', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif-luxury font-medium text-[#1C1917] tracking-tight">
            Memories, Connections & Insights
          </h2>
          <p className="text-xs text-[#78716C] mt-0.5">
            Cherished moments, personal reflections, graph relationships, and SLO access.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (activeSection === 'MEMORIES') openCapture(ObjectType.MEMORY);
            else if (activeSection === 'JOURNAL') openCapture(ObjectType.JOURNAL_ENTRY);
            else openCapture();
          }}
        >
          {activeSection === 'MEMORIES' ? 'Capture Memory' : activeSection === 'JOURNAL' ? 'Write Entry' : 'New Capture'}
        </Button>
      </div>

      {/* Segmented control */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <SegmentedControl
          options={sections as any}
          value={activeSection}
          onChange={setActiveSection as any}
          size="sm"
        />
      </div>

      {/* 1. MEMORIES SECTION */}
      {activeSection === 'MEMORIES' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FAF5F2] border border-[#E8D5CE] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#8C5D50]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Moments & Memories
              </span>
            </div>
            <span className="text-xs text-[#8C5D50]">{memories.length} saved</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {memories.map((m) => (
              <ObjectCard key={m.id} object={m} onClick={() => setSelectedObject(m)} />
            ))}
          </div>
        </div>
      )}

      {/* 2. JOURNAL SECTION */}
      {activeSection === 'JOURNAL' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EDE5D6] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#8C7350]">
              <BookHeart className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Personal Reflections & Log
              </span>
            </div>
            <span className="text-xs text-[#8C7350]">{journals.length} reflections</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {journals.map((j) => (
              <ObjectCard key={j.id} object={j} onClick={() => setSelectedObject(j)} />
            ))}
          </div>
        </div>
      )}

      {/* 3. GRAPH MAP SECTION */}
      {activeSection === 'GRAPH' && (
        <div className="p-6 rounded-3xl bg-white border border-[#F0ECE8] subtle-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#C5A880]" />
              <h4 className="text-sm font-medium text-stone-900">Universal Object Connected Graph</h4>
            </div>
            <span className="text-xs text-[#8C827D]">{objects.length} connected entities</span>
          </div>

          <p className="text-xs text-[#78716C] leading-relaxed">
            In SAFA, everything is connected. Ideas inspire projects, tasks belong to goals, books generate notes, and memories link to people.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {objects.slice(0, 6).map((obj) => {
              const rels = getRelatedObjects(obj.id);
              return (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObject(obj)}
                  className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE3DA] hover:border-[#C5A880] transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-semibold text-[#8C5D50] block uppercase tracking-wider">
                      {obj.type}
                    </span>
                    <span className="font-medium text-stone-900 truncate block">{obj.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#8C827D] shrink-0 bg-white px-2 py-0.5 rounded-full border border-[#E5DDD2]">
                    <Link2 className="w-3 h-3 text-[#C5A880]" />
                    <span>{rels.length} links</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SLO HUB SECTION */}
      {activeSection === 'SLO' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-[#FAF6F3] border border-[#E8D5CE] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8D5CE] flex items-center justify-center text-[#6E4B3E]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900">Special Connection (SLO)</h4>
                <p className="text-xs text-[#8C827D]">
                  Strict authorization boundary. Only objects explicitly enabled with "Allow SLO Access" are visible.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8D5CE]/60 flex items-center justify-between text-xs">
              <span className="text-stone-700 font-medium">Currently Shared Items:</span>
              <span className="font-semibold bg-white px-2.5 py-0.5 rounded-full border border-[#E8D5CE] text-[#8C5D50]">
                {sloSharedObjects.length} objects
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Shared Objects with SLO
            </h4>
            {sloSharedObjects.length === 0 ? (
              <p className="text-xs text-[#8C827D] p-4 bg-white rounded-2xl border border-[#F0ECE8] text-center">
                No objects are currently shared with SLO. You maintain 100% private custody.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sloSharedObjects.map((o) => (
                  <ObjectCard key={o.id} object={o} onClick={() => setSelectedObject(o)} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
