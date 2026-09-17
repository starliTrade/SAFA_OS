/**
 * SAFA — Modal & Mobile BottomSheet
 * Fluid mobile sheet transitions, backdrop blur, swipe-ready handle.
 */

import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { IconButton } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showClose?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
  showClose = true,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const maxWClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
          />

          {/* Modal / Sheet Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`relative w-full ${maxWClass} bg-[#FAF8F5] sm:rounded-3xl rounded-t-3xl border border-[#EAE3DC] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10`}
          >
            {/* Sheet drag indicator on mobile */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-[#D6CEC6]" />
            </div>

            {/* Header */}
            {(title || showClose) && (
              <div className="px-6 pt-4 pb-3 border-b border-[#F0ECE8] flex items-center justify-between shrink-0">
                <div>
                  {title && <h2 className="text-lg font-medium text-[#1C1917] tracking-tight">{title}</h2>}
                  {subtitle && <p className="text-xs text-[#8C827D] mt-0.5">{subtitle}</p>}
                </div>
                {showClose && (
                  <IconButton
                    icon={<X className="w-4 h-4" />}
                    onClick={onClose}
                    size="sm"
                    variant="ghost"
                    label="Close"
                  />
                )}
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
