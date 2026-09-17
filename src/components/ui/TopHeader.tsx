/**
 * SAFA — Top Context Header
 * Minimalist luxury bar with search trigger, inbox badge, SLO indicator, and settings.
 */

import React from 'react';
import { Search, Inbox, HeartHandshake, Settings, Globe, Smartphone, Monitor } from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { useAuth } from '../../core/context/AuthContext';
import { useObjects } from '../../core/context/ObjectContext';
import { Avatar, IconButton } from './Button';

export function TopHeader() {
  const { isSearchOpen, setIsSearchOpen, setIsSettingsOpen, currentTab, setCurrentTab, viewMode, setViewMode } = useApp();
  const { user, isRTL, toggleRTL, language, setLanguage } = useAuth();
  const { inboxCount } = useObjects();

  return (
    <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#F0ECE8]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setCurrentTab('HOME')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1C1917] to-[#443E3A] text-[#FAF8F5] flex items-center justify-center font-serif-luxury font-medium text-base shadow-xs group-hover:scale-105 transition-transform">
              ص
            </div>
            <div>
              <span className="font-serif-luxury text-lg tracking-wide font-medium text-[#1C1917]">
                SAFA
              </span>
              <span className="text-xs font-persian-luxury text-[#8C827D] ml-1.5 opacity-80">
                صفا
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Global Systems Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Global Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F2EC] text-[#57534E] hover:bg-[#EBE6DE] hover:text-[#1C1917] text-xs font-medium border border-[#E7E2DC]/80 transition-all cursor-pointer shadow-2xs"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#8C827D]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white text-[#8C827D] border border-[#E0D8CE]">
              ⌘K
            </kbd>
          </button>

          {/* Inbox Button */}
          <button
            type="button"
            onClick={() => setCurrentTab('INBOX')}
            className={`relative p-2 rounded-full border transition-all cursor-pointer ${
              currentTab === 'INBOX'
                ? 'bg-[#F5EBE6] text-[#6E4B3E] border-[#E8D5CE]'
                : 'bg-transparent text-[#78716C] hover:bg-[#F5F2EC] border-transparent'
            }`}
            title="Universal Inbox"
          >
            <Inbox className="w-4 h-4" />
            {inboxCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#B28779] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Language / RTL Switcher */}
          <button
            type="button"
            onClick={toggleRTL}
            className="px-2.5 py-1 rounded-full text-xs font-medium text-[#78716C] hover:bg-[#F5F2EC] hover:text-[#1C1917] transition-all cursor-pointer select-none"
            title="Switch LTR/RTL Layout"
          >
            {isRTL ? 'LTR (En)' : 'RTL (فا)'}
          </button>

          {/* Frame Preview Toggle for Responsive testing */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'fluid' ? 'iphone-frame' : 'fluid')}
            className="hidden md:flex items-center justify-center p-2 rounded-full text-[#78716C] hover:bg-[#F5F2EC] hover:text-[#1C1917] transition-all cursor-pointer"
            title={viewMode === 'fluid' ? 'Preview in iPhone Frame' : 'Preview in Full Fluid Layout'}
          >
            {viewMode === 'fluid' ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
          </button>

          {/* Settings Trigger */}
          <IconButton
            icon={<Settings className="w-4 h-4" />}
            onClick={() => setIsSettingsOpen(true)}
            size="sm"
            label="Settings & Profile"
          />

          {/* User Profile Avatar */}
          <div
            onClick={() => setIsSettingsOpen(true)}
            className="cursor-pointer ml-1"
            title={user?.name || 'Safa'}
          >
            <Avatar name={user?.name || 'Safa'} size="sm" showStatus />
          </div>
        </div>
      </div>
    </header>
  );
}
