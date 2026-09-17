/**
 * SAFA — Personal Life OS
 * Root Application Shell
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
  const { currentTab, viewMode } = useApp();
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

  const content = (
    <div
      className={`min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans transition-all duration-200 ${
        isRTL ? 'font-persian-luxury' : ''
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <TopHeader />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-24">
        {renderActiveView()}
      </main>

      <BottomNavigation />
      <UniversalCaptureModal />
      <GlobalSearchModal />
      <ObjectDetailModal />
      <SettingsModal />
      <ToastContainer />
    </div>
  );

  // If iPhone frame preview mode is active on larger screens
  if (viewMode === 'iphone-frame') {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-[420px] h-[860px] bg-[#FAF8F5] rounded-[52px] shadow-2xl overflow-hidden border-[10px] border-stone-800 flex flex-col ring-1 ring-white/20">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1C1917] ring-1 ring-stone-700/50 mr-1" />
          </div>

          <div className="flex-1 overflow-y-auto pt-2 no-scrollbar">{content}</div>
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
