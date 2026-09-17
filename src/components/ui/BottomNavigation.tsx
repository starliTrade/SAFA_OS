/**
 * SAFA — iPhone-First Bottom Navigation
 * High-end tactile navigation with center Universal Capture (+) action.
 */

import React from 'react';
import { Home, Compass, Plus, Sparkles, FolderHeart, MoreHorizontal, Layers } from 'lucide-react';
import { useApp, NavTab } from '../../core/context/AppContext';
import { useAuth } from '../../core/context/AuthContext';
import { motion } from 'motion/react';

export function BottomNavigation() {
  const { currentTab, setCurrentTab, openCapture } = useApp();
  const { isRTL } = useAuth();

  const navItems: { tab: NavTab; label: string; faLabel: string; icon: React.ReactNode }[] = [
    {
      tab: 'HOME',
      label: 'Home',
      faLabel: 'خانه',
      icon: <Home className="w-5 h-5 stroke-[1.75]" />,
    },
    {
      tab: 'LIFE',
      label: 'Life',
      faLabel: 'زندگی',
      icon: <Layers className="w-5 h-5 stroke-[1.75]" />,
    },
    {
      tab: 'CREATE',
      label: 'Create',
      faLabel: 'خلق',
      icon: <Sparkles className="w-5 h-5 stroke-[1.75]" />,
    },
    {
      tab: 'MEDIA',
      label: 'Media',
      faLabel: 'رسانه',
      icon: <FolderHeart className="w-5 h-5 stroke-[1.75]" />,
    },
    {
      tab: 'MORE',
      label: 'More',
      faLabel: 'بیشتر',
      icon: <MoreHorizontal className="w-5 h-5 stroke-[1.75]" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe-offset-2 pt-2 pointer-events-none flex justify-center">
      <div className="pointer-events-auto luxury-glass rounded-full border border-[#E7E0D8]/90 subtle-shadow px-3 py-2 flex items-center gap-1 sm:gap-2 max-w-md w-full justify-between backdrop-blur-xl">
        {/* Left items */}
        <div className="flex items-center gap-1">
          {navItems.slice(0, 2).map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => setCurrentTab(item.tab)}
                className={`relative px-3 py-1.5 rounded-full flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 cursor-pointer ${
                  isActive ? 'text-[#1C1917]' : 'text-[#8C827D] hover:text-[#44403C]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-[#F5EBE6]/80 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-[10px] font-medium tracking-tight">
                  {isRTL ? item.faLabel : item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center Universal Capture Button */}
        <div className="relative -my-4 px-1">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => openCapture()}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#1C1917] to-[#38332F] text-[#FAF8F5] flex items-center justify-center shadow-lg border-2 border-white cursor-pointer group"
            title="Universal Capture (+)"
            aria-label="Universal Capture"
          >
            <Plus className="w-6 h-6 stroke-[2.2] group-hover:rotate-90 transition-transform duration-200 text-[#F5EBE6]" />
          </motion.button>
        </div>

        {/* Right items */}
        <div className="flex items-center gap-1">
          {navItems.slice(2).map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => setCurrentTab(item.tab)}
                className={`relative px-3 py-1.5 rounded-full flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 cursor-pointer ${
                  isActive ? 'text-[#1C1917]' : 'text-[#8C827D] hover:text-[#44403C]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-[#F5EBE6]/80 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-[10px] font-medium tracking-tight">
                  {isRTL ? item.faLabel : item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
