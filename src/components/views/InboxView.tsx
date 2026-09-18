/**
 * SAFA — Universal Inbox Shell (Build 02.0)
 * Triage raw thoughts, quick captures, and unorganized inputs with AI assistance.
 */

import React, { useState } from 'react';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import { ObjectType, ObjectStatus } from '../../core/types/objects';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/Toast';
import { api } from '../../core/services/apiClient';
import {
  Inbox,
  Sparkles,
  Loader2,
} from 'lucide-react';

export function InboxView() {
  const { objects, updateObject, setSelectedObject } = useObjects();
  const { openCapture, addToast, themeMode } = useApp();
  const isDark = themeMode === 'dark';
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
      addToast(`AI successfully triaged and organized ${triagedCount} items`, 'purple');
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
            <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-[#F2F2F5]' : 'text-[#111116]'}`}>
              Universal Inbox
            </h2>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                isDark
                  ? 'bg-white/[0.06] text-white/90 border-white/[0.06]'
                  : 'bg-black/[0.05] text-[#111116] border-black/[0.05]'
              }`}
            >
              {inboxObjects.length}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#8E8E98]' : 'text-[#6E6E78]'}`}>
            Everything captured on the fly lands here. Review, connect, and file when ready.
          </p>
        </div>

        {inboxObjects.length > 0 && (
          <Button
            variant={isDark ? 'white-pill' : 'primary'}
            size="sm"
            onClick={handleTriageWithAI}
            disabled={isAutoTriaging}
            icon={
              isAutoTriaging ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
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
        <div className="space-y-3.5">
          {inboxObjects.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-[26px] space-y-3 transition-all ${
                isDark
                  ? 'bg-[#0E0F14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(255,255,255,0.035),0_16px_40px_-10px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_20px_40px_rgba(0,0,0,0.8)]'
                  : 'bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_8px_24px_rgba(0,0,0,0.04)] border border-black/[0.045] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]'
              }`}
            >
              <div
                onClick={() => setSelectedObject(item)}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    Raw Capture
                  </span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-[#5C5C68]' : 'text-[#8E8E98]'}`}>
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className={`text-base font-semibold tracking-tight ${isDark ? 'text-white' : 'text-[#111116]'}`}>{item.title}</h4>
                {item.description && (
                  <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDark ? 'text-[#9E9EA8]' : 'text-[#6E6E78]'}`}>{item.description}</p>
                )}
              </div>

              {/* Quick triage actions bar */}
              <div className={`pt-3 border-t flex items-center justify-between flex-wrap gap-2 text-xs ${isDark ? 'border-white/[0.04]' : 'border-black/[0.05]'}`}>
                <span className={`text-xs font-medium ${isDark ? 'text-[#8E8E98]' : 'text-[#6E6E78]'}`}>Convert to:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button
                    variant={isDark ? 'dark-pill' : 'outline'}
                    size="xs"
                    onClick={() => handleTriageItem(item.id, ObjectType.TASK)}
                  >
                    Task
                  </Button>
                  <Button
                    variant={isDark ? 'dark-pill' : 'outline'}
                    size="xs"
                    onClick={() => handleTriageItem(item.id, ObjectType.IDEA)}
                  >
                    Idea
                  </Button>
                  <Button
                    variant={isDark ? 'dark-pill' : 'outline'}
                    size="xs"
                    onClick={() => handleTriageItem(item.id, ObjectType.NOTE)}
                  >
                    Note
                  </Button>
                  <Button
                    variant={isDark ? 'dark-pill' : 'outline'}
                    size="xs"
                    onClick={() => handleTriageItem(item.id, ObjectType.PROJECT)}
                  >
                    Project
                  </Button>
                  <Button
                    variant={isDark ? 'white-pill' : 'primary'}
                    size="xs"
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
