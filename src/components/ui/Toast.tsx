/**
 * SAFA — UX Feedback States: Toast, EmptyState, LoadingState
 */

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { Button } from './Button';

// --- Toast Container ---
export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence>
        {toasts.map((t) => {
          const typeMap = {
            rose: 'bg-[#FAF6F3] border-[#E8D5CE] text-[#6E4B3E]',
            success: 'bg-[#F4F7F4] border-[#C8DAC9] text-[#2F5739]',
            warning: 'bg-[#FDF9F3] border-[#EED7B8] text-[#8C6228]',
            info: 'bg-[#F3F6F8] border-[#CAD6DF] text-[#3B5A70]',
          }[t.type || 'rose'];

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              onClick={() => removeToast(t.id)}
              className={`pointer-events-auto px-4 py-2.5 rounded-full border subtle-shadow flex items-center gap-2 text-xs font-medium cursor-pointer ${typeMap}`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// --- EmptyState ---
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  persianTitle?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  persianTitle,
}: EmptyStateProps) {
  return (
    <div className="py-12 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-3xl bg-[#F5EBE6]/60 border border-[#E8D5CE]/60 flex items-center justify-center text-[#8C5D50] mb-4 shadow-xs">
        {icon || <Sparkles className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-medium text-[#1C1917] tracking-tight">
        {title}
        {persianTitle && <span className="block text-sm font-persian-luxury text-[#8C827D] mt-0.5">{persianTitle}</span>}
      </h3>
      <p className="text-xs text-[#78716C] mt-1.5 leading-relaxed max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="rose" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

// --- LoadingState Skeleton ---
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="w-full space-y-3 p-4 animate-pulse">
      <div className="h-4 bg-[#EDE8E1] rounded-full w-2/5" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 bg-[#F2EDE6] rounded-full w-full" />
        ))}
      </div>
    </div>
  );
}
