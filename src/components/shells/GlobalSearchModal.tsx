/**
 * SAFA — Global Search & Command Foundation
 * Fast multi-type search across the Universal Object Graph.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { SearchBar } from '../ui/Input';
import { ObjectType, BaseObject } from '../../core/types/objects';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/services/apiClient';
import { Tag } from '../ui/Button';
import {
  Search,
  ArrowRight,
  FileText,
  CheckSquare,
  Lightbulb,
  Sparkles,
  BookOpen,
  Folder,
} from 'lucide-react';

export function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const { objects, setSelectedObject } = useObjects();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    return objects.filter((obj) => {
      if (selectedType !== 'ALL' && obj.type !== selectedType) return false;
      if (!q) return true;
      const titleMatch = obj.title.toLowerCase().includes(q);
      const descMatch = (obj.description || '').toLowerCase().includes(q);
      const tagMatch = obj.tags?.some((t) => t.toLowerCase().includes(q));
      return titleMatch || descMatch || tagMatch;
    });
  }, [objects, query, selectedType]);

  const typeFilters = [
    { value: 'ALL', label: 'All' },
    { value: ObjectType.TASK, label: 'Tasks' },
    { value: ObjectType.NOTE, label: 'Notes' },
    { value: ObjectType.IDEA, label: 'Ideas' },
    { value: ObjectType.PROJECT, label: 'Projects' },
    { value: ObjectType.BOOK, label: 'Books' },
    { value: ObjectType.MEMORY, label: 'Memories' },
  ];

  const handleSelectObject = (obj: BaseObject) => {
    setSelectedObject(obj);
    setIsSearchOpen(false);
  };

  return (
    <Modal
      isOpen={isSearchOpen}
      onClose={() => setIsSearchOpen(false)}
      title="Search Everything"
      subtitle="Find connected objects, thoughts, tasks, and media"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search input */}
        <SearchBar
          autoFocus
          value={query}
          onChange={setQuery}
          placeholder="Search by title, description, #tags..."
        />

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {typeFilters.map((f) => {
            const isSelected = selectedType === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setSelectedType(f.value)}
                className={`px-3 py-1 text-xs rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                    : 'bg-[#F7F4EE] text-[#78716C] border-[#E7E0D8] hover:bg-[#EFEAE2]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto space-y-2 pt-2 border-t border-[#F0ECE8]">
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8C827D]">
              No objects found matching "{query}"
            </div>
          ) : (
            filteredResults.map((obj) => (
              <div
                key={obj.id}
                onClick={() => handleSelectObject(obj)}
                className="p-3 rounded-xl bg-white border border-[#F0ECE8] hover:border-[#C5A880]/60 hover:bg-[#FAF8F5] transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C827D]">
                      {obj.type}
                    </span>
                    {obj.tags?.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] text-[#A8A29E]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-sm font-medium text-[#1C1917] truncate">{obj.title}</h4>
                  {obj.description && (
                    <p className="text-xs text-[#78716C] truncate mt-0.5">{obj.description}</p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C827D] group-hover:text-[#1C1917] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
