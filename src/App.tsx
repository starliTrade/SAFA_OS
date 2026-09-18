/**
 * SAFA — Personal Life OS
 * Root Application Shell (Build 02.0)
 * Obsidian Dark & Crisp Matte Light Theme with iPhone-first ergonomics.
 */

import React from 'react';
import { AuthProvider, useAuth } from './core/context/AuthContext';
import { ObjectProvider } from './core/context/ObjectContext';
import { AppProvider, useApp } from './core/context/AppContext';
import { TopHeader } from './components/ui/TopHeader';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { ToastContainer } from './components/ui/Toast';
import { HomeView } from './components/views/HomeView';
import { LifeView } from './components/views/LifeView';
import { CreateView } from './components/views/CreateView';
import { MediaView } from './components/views/MediaView';
import { MoreView } from './components/views/MoreView';
import { InboxView } from './components/views/InboxView';
import { UniversalCaptureModal } from './components/shells/UniversalCaptureModal';
import { GlobalSearchModal } from './components/shells/GlobalSearchModal';
import { ObjectDetailModal } from './components/shells/ObjectDetailModal';
import { SettingsModal } from './components/shells/SettingsModal';

function MainShell() {
  const { currentTab, viewMode, themeMode } = useApp();
  const { isRTL } = useAuth();

  const renderActiveView = () => {
    switch (currentTab) {
      case 'HOME':
        return <HomeView />;
      case 'LIFE':
        return <LifeView />;
      case 'CREATE':
        return <CreateView />;
      case 'MEDIA':
        return <MediaView />;
      case 'MORE':
        return <MoreView />;
      case 'INBOX':
        return <InboxView />;
      default:
        return <HomeView />;
    }
  };

  const isDark = themeMode === 'dark';

  const content = (
    <div
      className={`min-h-screen ${isDark ? 'dark bg-[#06070A] text-[#EDEDEF] studio-dark-canvas' : 'light bg-[#F4F4F6] text-[#111113]'} flex flex-col font-sans transition-colors duration-200 relative overflow-x-hidden ${
        isRTL ? 'font-persian-luxury' : ''
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Unified Calm Ambient Canvas Lighting — Soft, neutral, zero color blotches */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDark ? (
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-white/[0.015] blur-[160px]" />
        ) : (
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-zinc-400/[0.04] blur-3xl" />
        )}
      </div>

      {/* Dedicated Universal Top Header */}
      <TopHeader />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-28 sm:pb-32">
        {renderActiveView()}
      </main>

      {/* Floating Glass Navigation Dock */}
      <BottomNavigation />

      {/* Modals, Mobile Sheets & Toasts */}
      <UniversalCaptureModal />
      <GlobalSearchModal />
      <ObjectDetailModal />
      <SettingsModal />
      <ToastContainer />
    </div>
  );

  // iPhone frame preview mode
  if (viewMode === 'iphone-frame') {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center p-3 sm:p-8">
        <div className={`relative w-full max-w-[414px] h-[870px] ${isDark ? 'bg-[#09090B]' : 'bg-[#F4F4F6]'} rounded-[54px] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden border-[10px] border-[#1E1E24] flex flex-col ring-1 ring-white/10`}>
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end px-2 select-none pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1A1816] ring-1 ring-zinc-800 mr-1" />
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">{content}</div>
        </div>
      </div>
    );
  }

  return content;
}

export function App() {
  return (
    <AuthProvider>
      <ObjectProvider>
        <AppProvider>
          <MainShell />
        </AppProvider>
      </ObjectProvider>
    </AuthProvider>
  );
}

export default App;
