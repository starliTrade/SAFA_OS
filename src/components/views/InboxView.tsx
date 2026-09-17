/**
 * SAFA — Universal Inbox Shell
 * Triage raw thoughts, quick captures, and unorganized inputs with AI assistance.
 */

import React, { useState } from 'react';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import { ObjectType, ObjectStatus } from '../../core/types/objects';
import { ObjectCard } from '../ui/ObjectCard';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/Toast';
import { api } from '../../core/services/apiClient';
import {
  Inbox,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Archive,
  Loader2,
} from 'lucide-react';

export function InboxView() {
  const { objects, updateObject, setSelectedObject } = useObjects();
  const { openCapture, addToast } = useApp();
  const [isAutoTriaging, setIsAutoTriaging] = useState(false);

  const inboxObjects = objects.filter((o) => o.status === ObjectStatus.INBOX);

  const handleTriageItem = async (id: string, nextType: ObjectType) => {
    try {
      await updateObject(id, {
        type: nextType,
        status: ObjectStatus.ACTIVE,
      });
      addToast(`Converted to ${nextType} and moved to Active`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to triage', 'warning');
    }
  };

  const handleTriageWithAI = async () => {
    if (inboxObjects.length === 0) return;
    setIsAutoTriaging(true);
    let triagedCount = 0;
    try {
      for (const item of inboxObjects) {
        const textToAnalyze = `${item.title}\n${item.description || ''}`;
        const res = await api.understandText(textToAnalyze);
        if (res.success && res.extraction) {
          const suggested = res.extraction.suggestedType as ObjectType;
          await updateObject(item.id, {
            type: ObjectType[suggested as keyof typeof ObjectType] ? suggested : item.type,
            status: ObjectStatus.ACTIVE,
            tags: Array.from(new Set([...(item.tags || []), ...(res.extraction.suggestedTags || [])])),
            metadata: {
              ...item.metadata,
              aiTriaged: true,
            },
          });
          triagedCount++;
        }
      }
      addToast(`AI successfully triaged and organized ${triagedCount} items`, 'rose');
    } catch (err: any) {
      addToast(err.message || 'AI Triage partially failed', 'warning');
    } finally {
      setIsAutoTriaging(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif-luxury font-medium text-[#1C1917] tracking-tight">
              Universal Inbox
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5EBE6] text-[#8C5D50] font-semibold border border-[#E8D5CE]">
              {inboxObjects.length}
            </span>
          </div>
          <p className="text-xs text-[#78716C] mt-0.5">
            Everything captured on the fly lands here. Review, connect, and file when ready.
          </p>
        </div>

        {inboxObjects.length > 0 && (
          <Button
            variant="rose"
            size="sm"
            onClick={handleTriageWithAI}
            disabled={isAutoTriaging}
            icon={
              isAutoTriaging ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )
            }
          >
            {isAutoTriaging ? 'Triaging with AI...' : 'Triage All with AI'}
          </Button>
        )}
      </div>

      {/* Inbox Items */}
      {inboxObjects.length === 0 ? (
        <EmptyState
          title="Inbox Zero • Calm Achieved"
          persianTitle="صندوق ورودی شما خالی و آرام است"
          description="You have triaged all quick captures into their proper places."
          actionLabel="Quick Capture"
          onAction={() => openCapture()}
        />
      ) : (
        <div className="space-y-3">
          {inboxObjects.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-[#F0ECE8] subtle-shadow space-y-3"
            >
              <div
                onClick={() => setSelectedObject(item)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C827D]">
                    Raw Capture
                  </span>
                  <span className="text-[10px] text-[#A8A29E]">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-[#1C1917]">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-[#78716C] mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>

              {/* Quick triage actions bar */}
              <div className="pt-2 border-t border-[#F5F2EC] flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-[11px] text-[#8C827D] font-medium">Convert to:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTriageItem(item.id, ObjectType.TASK)}
                  >
                    Task
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTriageItem(item.id, ObjectType.IDEA)}
                  >
                    Idea
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTriageItem(item.id, ObjectType.NOTE)}
                  >
                    Note
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTriageItem(item.id, ObjectType.PROJECT)}
                  >
                    Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      updateObject(item.id, { status: ObjectStatus.ACTIVE }).then(() =>
                        addToast('Marked as Active', 'success')
                      )
                    }
                  >
                    Keep as Note
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
