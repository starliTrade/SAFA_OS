/**
 * SAFA — Settings, Profile, SLO & Data Ownership Modal
 */

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAuth } from '../../core/context/AuthContext';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/services/apiClient';
import {
  User,
  Globe,
  HeartHandshake,
  Download,
  ShieldCheck,
  Sparkles,
  LogOut,
  Palette,
  Check,
} from 'lucide-react';

export function SettingsModal() {
  const { user, updateProfile, logout, isRTL, toggleRTL, language, setLanguage } = useAuth();
  const { isSettingsOpen, setIsSettingsOpen, addToast } = useApp();

  const [name, setName] = useState('');
  const [persianName, setPersianName] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('warm-paper');
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'SLO' | 'DATA' | 'AI'>('PROFILE');
  const [sloConfig, setSloConfig] = useState<any>(null);

  useEffect(() => {
    if (user?.profile) {
      setName(user.profile.name || '');
      setPersianName(user.profile.persianName || '');
      setBio(user.profile.bio || '');
      setTheme(user.profile.themePreference || 'warm-paper');
    }
    if (isSettingsOpen) {
      api.getSLO().then((res) => setSloConfig(res.slo)).catch(() => {});
    }
  }, [user, isSettingsOpen]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        name,
        persianName,
        bio,
        themePreference: theme as any,
      });
      addToast('Profile preferences saved', 'success');
      setIsSettingsOpen(false);
    } catch (err: any) {
      addToast(err.message || 'Failed to save', 'warning');
    }
  };

  const handleExportData = () => {
    window.open('/api/export', '_blank');
    addToast('Data backup downloaded', 'success');
  };

  const handleToggleSLOAccess = async () => {
    if (!sloConfig) return;
    const nextAccess = sloConfig.defaultAccess === 'NO_ACCESS' ? 'SELECTIVE' : 'NO_ACCESS';
    try {
      const res = await api.updateSLO({ defaultAccess: nextAccess });
      setSloConfig(res.slo);
      addToast(`SLO Access updated: ${nextAccess}`, 'rose');
    } catch (err) {}
  };

  return (
    <Modal
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
      title="Settings & Personal OS"
      subtitle="Private by default • Data ownership • Intelligent foundation"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Sub-tabs */}
        <div className="flex items-center gap-1 border-b border-[#F0ECE8] pb-2 overflow-x-auto">
          {[
            { id: 'PROFILE', label: 'Profile & Look', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'SLO', label: 'SLO Connection', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
            { id: 'DATA', label: 'Data & Ownership', icon: <Download className="w-3.5 h-3.5" /> },
            { id: 'AI', label: 'AI Intelligence', icon: <Sparkles className="w-3.5 h-3.5" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#1C1917] text-white'
                  : 'text-[#78716C] hover:bg-[#F5F2EC] hover:text-[#1C1917]'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'PROFILE' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[#78716C] font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#E7E0D8] rounded-xl px-3 py-2 text-sm text-[#1C1917]"
              />
            </div>

            <div>
              <label className="block text-[#78716C] font-medium mb-1">Persian Name (نام به فارسی)</label>
              <input
                type="text"
                dir="rtl"
                value={persianName}
                onChange={(e) => setPersianName(e.target.value)}
                className="w-full bg-white border border-[#E7E0D8] rounded-xl px-3 py-2 text-sm text-[#1C1917] font-persian-luxury"
                placeholder="صفا"
              />
            </div>

            <div>
              <label className="block text-[#78716C] font-medium mb-1">Personal Intent / Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white border border-[#E7E0D8] rounded-xl p-3 text-xs text-[#1C1917]"
              />
            </div>

            {/* Language and RTL */}
            <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#EAE3D6] flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-800 block">Layout Direction & Language</span>
                <span className="text-[#8C827D]">English LTR / فارسی راست‌به‌چپ</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    language === 'en' ? 'bg-[#1C1917] text-white' : 'bg-white text-stone-700'
                  }`}
                >
                  EN (LTR)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('fa')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border font-persian-luxury ${
                    language === 'fa' ? 'bg-[#1C1917] text-white' : 'bg-white text-stone-700'
                  }`}
                >
                  فارسی (RTL)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLO TAB */}
        {activeTab === 'SLO' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#FAF6F3] rounded-2xl border border-[#E8D5CE] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#E8D5CE] flex items-center justify-center text-[#6E4B3E]">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800">Special Connection (SLO)</h4>
                    <p className="text-[11px] text-[#8C827D]">
                      Private by default. SLO has NO access unless you explicitly grant it per object.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8D5CE]/60 flex items-center justify-between">
                <span className="text-stone-700 font-medium">Default Permission:</span>
                <button
                  type="button"
                  onClick={handleToggleSLOAccess}
                  className={`px-3 py-1 rounded-full font-semibold ${
                    sloConfig?.defaultAccess === 'NO_ACCESS'
                      ? 'bg-stone-200 text-stone-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {sloConfig?.defaultAccess || 'NO_ACCESS'}
                </button>
              </div>
            </div>

            <p className="text-[#8C827D] leading-relaxed">
              When viewing any Photo, Memory, or Project, you can toggle "Allow SLO Access" to share that specific moment with complete authorization control.
            </p>
          </div>
        )}

        {/* DATA OWNERSHIP TAB */}
        {activeTab === 'DATA' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-[#E7E0D8] space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900">Total Data Sovereignty</h4>
                  <p className="text-[#78716C] mt-0.5 leading-relaxed">
                    All your thoughts, tasks, memories, and graph connections belong exclusively to you. You can export a full, unencrypted JSON backup of the universal object database at any time.
                  </p>
                </div>
              </div>

              <Button
                variant="rose"
                size="sm"
                onClick={handleExportData}
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Export Full SAFA Archive (.json)
              </Button>
            </div>
          </div>
        )}

        {/* AI TAB */}
        {activeTab === 'AI' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#F8F5EE] rounded-2xl border border-[#EAE3D6] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-stone-900">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>SAFA Intelligence Architecture</span>
              </div>
              <p className="text-[#78716C] leading-relaxed">
                • Model: <span className="font-mono text-stone-800">gemini-3.8-flash</span> via server-side abstraction.
                <br />• Principle: AI suggests; user controls. No silent mutations.
                <br />• Capabilities: Multilingual understanding (English & Persian), entity classification, tag generation, relationship suggestions.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#F0ECE8] flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:bg-red-50">
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Sign Out
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(false)}>
              Close
            </Button>
            {activeTab === 'PROFILE' && (
              <Button variant="primary" size="sm" onClick={handleSaveProfile}>
                Save Preferences
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
