/**
 * SAFA — Universal Capture Shell
 * "Put anything here" — Fast capture with server-side AI extraction & structured object validation.
 */

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Button';
import { ObjectType, ObjectStatus, ObjectSource } from '../../core/types/objects';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/services/apiClient';
import { AIExtractResult } from '../../core/types/ai';
import {
  Sparkles,
  CheckSquare,
  FileText,
  Lightbulb,
  Image as ImageIcon,
  Paperclip,
  Mic,
  Tag as TagIcon,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export function UniversalCaptureModal() {
  const { isCaptureOpen, setIsCaptureOpen, captureDefaultType, addToast } = useApp();
  const { createObject } = useObjects();

  const [rawText, setRawText] = useState('');
  const [selectedType, setSelectedType] = useState<ObjectType>(ObjectType.NOTE);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [aiResult, setAiResult] = useState<AIExtractResult | null>(null);
  const [destination, setDestination] = useState<'INBOX' | 'ACTIVE'>('INBOX');

  useEffect(() => {
    if (captureDefaultType) {
      setSelectedType(captureDefaultType);
    } else {
      setSelectedType(ObjectType.NOTE);
    }
    if (isCaptureOpen) {
      setRawText('');
      setTags([]);
      setAiResult(null);
      setDestination('INBOX');
    }
  }, [isCaptureOpen, captureDefaultType]);

  const handleAiUnderstand = async () => {
    if (!rawText.trim()) return;
    setIsExtracting(true);
    try {
      const res = await api.understandText(rawText);
      if (res.success && res.extraction) {
        setAiResult(res.extraction);
        if (res.extraction.suggestedType && ObjectType[res.extraction.suggestedType as keyof typeof ObjectType]) {
          setSelectedType(res.extraction.suggestedType as ObjectType);
        }
        if (res.extraction.suggestedTags?.length) {
          setTags(Array.from(new Set([...tags, ...res.extraction.suggestedTags])));
        }
        addToast('SAFA AI analyzed your capture', 'rose');
      }
    } catch (err: any) {
      addToast(err.message || 'AI analysis unavailable', 'warning');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, '');
      if (clean && !tags.includes(clean)) {
        setTags([...tags, clean]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleSave = async () => {
    if (!rawText.trim() && !aiResult?.cleanTitle) {
      addToast('Please enter something to capture', 'warning');
      return;
    }

    const title = aiResult?.cleanTitle || rawText.split('\n')[0].slice(0, 80);
    const description = aiResult?.cleanDescription || (rawText.includes('\n') ? rawText.slice(title.length).trim() : '');

    try {
      await createObject({
        type: selectedType,
        title,
        description: description || undefined,
        status: destination === 'INBOX' ? ObjectStatus.INBOX : ObjectStatus.ACTIVE,
        source: ObjectSource.QUICK_CAPTURE,
        tags,
        metadata: {
          capturedAt: new Date().toISOString(),
          aiExtracted: !!aiResult,
          priority: aiResult?.priority || 'medium',
          dueDate: aiResult?.dueDate,
        },
      });

      addToast(
        destination === 'INBOX' ? 'Saved to Inbox for organization' : 'Created successfully',
        'success'
      );
      setIsCaptureOpen(false);
    } catch (err: any) {
      addToast(err.message || 'Failed to capture', 'warning');
    }
  };

  const quickTypes = [
    { type: ObjectType.NOTE, label: 'Note', icon: <FileText className="w-3.5 h-3.5" /> },
    { type: ObjectType.TASK, label: 'Task', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { type: ObjectType.IDEA, label: 'Idea', icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { type: ObjectType.MEMORY, label: 'Memory', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <Modal
      isOpen={isCaptureOpen}
      onClose={() => setIsCaptureOpen(false)}
      title="Universal Capture"
      subtitle="Put anything here — thoughts, tasks, ideas, inspiration"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Main capture textarea */}
        <div className="relative">
          <textarea
            autoFocus
            rows={4}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="What's on your mind? (e.g. 'Review silk fabric swatches by tomorrow #design' or 'Idea: Ceramic vase collection')"
            className="w-full bg-white border border-[#E7E0D8] rounded-2xl p-4 text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/15 resize-none transition-all shadow-xs"
          />

          {/* AI Understand Trigger inside textarea box */}
          {rawText.trim().length > 5 && (
            <div className="absolute bottom-3 right-3">
              <Button
                variant="rose"
                size="sm"
                onClick={handleAiUnderstand}
                disabled={isExtracting}
                icon={
                  isExtracting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-[#8C5D50]" />
                  )
                }
              >
                {isExtracting ? 'Understanding...' : 'AI Understand'}
              </Button>
            </div>
          )}
        </div>

        {/* AI Extraction Preview Card if parsed */}
        {aiResult && (
          <div className="p-3.5 rounded-2xl bg-[#FAF6F3] border border-[#E8D5CE] text-xs space-y-2">
            <div className="flex items-center justify-between text-[#8C5D50] font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Suggested Classification
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#E8D5CE]">
                {Math.round(aiResult.confidence * 100)}% confidence
              </span>
            </div>
            <div className="text-stone-800">
              <span className="font-semibold">Title:</span> {aiResult.cleanTitle}
            </div>
            {aiResult.cleanDescription && (
              <div className="text-stone-600">
                <span className="font-semibold">Context:</span> {aiResult.cleanDescription}
              </div>
            )}
          </div>
        )}

        {/* Quick Type Selection */}
        <div>
          <label className="block text-[11px] font-medium text-[#78716C] uppercase tracking-wider mb-2">
            Object Type
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {quickTypes.map((t) => {
              const isSelected = selectedType === t.type;
              return (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => setSelectedType(t.type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                      : 'bg-[#F7F4EE] text-[#57534E] border-[#E7E0D8] hover:bg-[#EFEAE2]'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags input */}
        <div>
          <label className="block text-[11px] font-medium text-[#78716C] uppercase tracking-wider mb-2">
            Tags & Context
          </label>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {tags.map((t) => (
              <Tag key={t} label={t} color="rose" onRemove={() => handleRemoveTag(t)} />
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type tag and press Enter..."
            className="w-full bg-white border border-[#E7E0D8] rounded-xl px-3 py-2 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Destination Option */}
        <div className="pt-2 flex items-center justify-between border-t border-[#F0ECE8]">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span className="font-medium">Destination:</span>
            <button
              type="button"
              onClick={() => setDestination(destination === 'INBOX' ? 'ACTIVE' : 'INBOX')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                destination === 'INBOX'
                  ? 'bg-[#F5EBE6] text-[#8C5D50] border-[#E8D5CE]'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              {destination === 'INBOX' ? 'Raw Inbox (Triage Later)' : 'Direct to Active'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCaptureOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Capture
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
