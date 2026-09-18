/**
 * SAFA — Unified Velvet Modal & Mobile BottomSheet (Build 02.1)
 * Seamless dark depth matching #111114, micro-hairlines, and soft diffusion shadows.
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
          {/* Backdrop with deep blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal / Mobile Sheet Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className={`relative w-full ${maxWClass} bg-[#111114] text-[#EDEDEF] border border-white/[0.06] shadow-[0_24px_60px_-10px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:rounded-3xl rounded-t-[28px] overflow-hidden max-h-[92vh] flex flex-col z-10 pb-safe`}
          >
            {/* Tactile Sheet Drag Handle for Mobile */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center cursor-grab">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>

            {/* Header */}
            {(title || showClose) && (
              <div className="px-5 sm:px-6 pt-3 sm:pt-4 pb-3.5 border-b border-white/[0.05] flex items-center justify-between shrink-0">
                <div>
                  {title && (
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#EDEDEF]">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-xs text-[#92929B] mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
                {showClose && (
                  <IconButton
                    icon={<X className="w-4 h-4" />}
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    label="Close dialog"
                  />
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
