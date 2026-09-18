/**
 * SAFA — Unified Velvet UX Feedback States: Toast, EmptyState, LoadingState (Build 02.1)
 */

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { Button } from './Button';

// --- Toast Container ---
export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence>
        {toasts.map((t) => {
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              onClick={() => removeToast(t.id)}
              className="pointer-events-auto px-4 py-2.5 rounded-full border border-white/[0.08] bg-[#141418]/95 backdrop-blur-2xl text-[#EDEDEF] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.05)] flex items-center gap-2 text-xs font-medium cursor-pointer select-none active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
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
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#111114] border border-white/[0.055] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)]">
      {icon && (
        <div className="w-12 h-12 rounded-full bg-[#16161B] border border-white/[0.06] text-[#92929B] flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-[#EDEDEF] tracking-tight">
        {title}
      </h3>
      {persianTitle && (
        <p className="font-persian-luxury text-xs text-[#5C5C66] mt-0.5">
          {persianTitle}
        </p>
      )}
      <p className="text-xs text-[#92929B] mt-1 max-w-xs leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="white-pill" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

// --- LoadingState ---
export function LoadingState({ message = 'Accessing Safa Space...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="w-6 h-6 text-[#92929B] animate-spin mb-3" />
      <p className="text-xs text-[#92929B] tracking-tight font-medium">{message}</p>
    </div>
  );
}
