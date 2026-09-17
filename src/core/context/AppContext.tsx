/**
 * SAFA — App Context
 * Global UI navigation, modals, device frame preview, and toasts.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ObjectType } from '../types/objects';

export type NavTab = 'HOME' | 'LIFE' | 'CREATE' | 'MEDIA' | 'MORE' | 'INBOX';
export type LifeSubview = 'TASKS' | 'CALENDAR' | 'REMINDERS' | 'GOALS' | 'HABITS' | 'PROJECTS';
export type CreateSubview = 'NOTES' | 'IDEAS' | 'WRITING' | 'DRAWING' | 'STUDIO';
export type MediaSubview = 'PHOTOS' | 'VIDEOS' | 'MUSIC' | 'BOOKS' | 'MOVIES';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'rose';
  durationMs?: number;
}

interface AppContextType {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  lifeSubview: LifeSubview;
  setLifeSubview: (subview: LifeSubview) => void;
  createSubview: CreateSubview;
  setCreateSubview: (subview: CreateSubview) => void;
  mediaSubview: MediaSubview;
  setMediaSubview: (subview: MediaSubview) => void;
  isCaptureOpen: boolean;
  setIsCaptureOpen: (open: boolean) => void;
  captureDefaultType: ObjectType | null;
  openCapture: (type?: ObjectType) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  viewMode: 'fluid' | 'iphone-frame';
  setViewMode: (mode: 'fluid' | 'iphone-frame') => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'rose') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<NavTab>('HOME');
  const [lifeSubview, setLifeSubview] = useState<LifeSubview>('TASKS');
  const [createSubview, setCreateSubview] = useState<CreateSubview>('NOTES');
  const [mediaSubview, setMediaSubview] = useState<MediaSubview>('PHOTOS');
  const [isCaptureOpen, setIsCaptureOpen] = useState<boolean>(false);
  const [captureDefaultType, setCaptureDefaultType] = useState<ObjectType | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'fluid' | 'iphone-frame'>('fluid');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const openCapture = (type?: ObjectType) => {
    setCaptureDefaultType(type || null);
    setIsCaptureOpen(true);
  };

  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'rose' = 'rose') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: ToastItem = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        lifeSubview,
        setLifeSubview,
        createSubview,
        setCreateSubview,
        mediaSubview,
        setMediaSubview,
        isCaptureOpen,
        setIsCaptureOpen,
        captureDefaultType,
        openCapture,
        isSearchOpen,
        setIsSearchOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        viewMode,
        setViewMode,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
