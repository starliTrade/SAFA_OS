/**
 * SAFA — Dedicated Universal Top Header (Minimalist, Quiet & Chic)
 * - Left: "SAFA" brand title in sleek display typography
 * - Right: Floating Settings Dropdown with Dark/Light theme toggle, Language/RTL switch & Preferences
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { useAuth } from '../../core/context/AuthContext';
import { SafaBrandLogo } from './SafaBrandLogo';
import {
  Moon,
  Sun,
  Globe,
  SlidersHorizontal,
  Search,
  Check,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TopHeader() {
  const {
    setCurrentTab,
    themeMode,
    setThemeMode,
    setIsSearchOpen,
    setIsSettingsOpen,
  } = useApp();
  const { user, isRTL, toggleRTL } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDark = themeMode === 'dark';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 py-3 transition-colors select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Official SAFA Atelier Brand Logo */}
        <button
          type="button"
          onClick={() => setCurrentTab('HOME')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none transition-transform active:scale-95"
          title="SAFA — Home"
          aria-label="SAFA صفا Home"
        >
          <SafaBrandLogo size="md" />
        </button>

        {/* Right: Chic Settings Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 ${
              isDark
                ? 'bg-[#0E0E14]/75 hover:bg-[#14141A]/90 text-zinc-300 hover:text-white backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.035),0_8px_20px_rgba(0,0,0,0.4)] border border-white/[0.025]'
                : 'bg-white/75 hover:bg-white/95 text-zinc-700 hover:text-zinc-950 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_4px_16px_rgba(0,0,0,0.03)] border border-black/[0.03]'
            }`}
            aria-expanded={isDropdownOpen}
            aria-label="Settings and Preferences"
          >
            <span className={`text-xs font-semibold tracking-tight ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
              {user?.profile?.name || 'Studio'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              } ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
            />
          </button>

          {/* Floating Glass Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className={`absolute right-0 rtl:right-auto rtl:left-0 mt-2.5 w-64 rounded-3xl p-2 z-50 backdrop-blur-2xl ${
                  isDark
                    ? 'bg-[#0E0E14]/90 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_24px_48px_rgba(0,0,0,0.8)] border border-white/[0.03]'
                    : 'bg-white/90 text-[#111116] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_20px_44px_rgba(0,0,0,0.07)] border border-black/[0.035]'
                }`}
              >
                {/* Theme Selector Toggle */}
                <div className="p-2 mb-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#787885] mb-2 px-1">
                    {isRTL ? 'پالت و تم' : 'Theme Mode'}
                  </span>
                  <div
                    className={`grid grid-cols-2 p-1 rounded-2xl ${
                      isDark ? 'bg-[#060608]' : 'bg-[#F2F2F6]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setThemeMode('dark')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        isDark
                          ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                          : 'text-[#787885] hover:text-[#111116]'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>{isRTL ? 'تاریک' : 'Dark'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setThemeMode('light')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        !isDark
                          ? 'bg-white text-[#111116] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                          : 'text-[#787885] hover:text-white'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isRTL ? 'روشن' : 'Light'}</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`h-[1px] my-1 ${
                    isDark ? 'bg-white/[0.05]' : 'bg-black/[0.05]'
                  }`}
                />

                {/* Language / RTL Switcher */}
                <button
                  type="button"
                  onClick={() => {
                    toggleRTL();
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-medium cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-white/[0.06] text-[#D8D8E0]' : 'hover:bg-black/[0.04] text-[#333338]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#8E8E98]" />
                    <span>{isRTL ? 'تغییر زبان به انگلیسی (EN)' : 'زبان فارسی / Persian (FA)'}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#787885]">
                    {isRTL ? 'FA' : 'EN'}
                  </span>
                </button>

                {/* Quick Search */}
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-medium cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-white/[0.06] text-[#D8D8E0]' : 'hover:bg-black/[0.04] text-[#333338]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-[#8E8E98]" />
                    <span>{isRTL ? 'جستجوی هوشمند' : 'Spotlight Search'}</span>
                  </div>
                  <kbd
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-lg ${
                      isDark ? 'bg-white/[0.08] text-[#8E8E98]' : 'bg-black/[0.05] text-[#6E6E78]'
                    }`}
                  >
                    ⌘K
                  </kbd>
                </button>

                {/* Preferences Modal */}
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsSettingsOpen(true);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-medium cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-white/[0.06] text-[#D8D8E0]' : 'hover:bg-black/[0.04] text-[#333338]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#8E8E98]" />
                    <span>{isRTL ? 'تنظیمات و ترجیحات' : 'Preferences & Profile'}</span>
                  </div>
                  <Check className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
