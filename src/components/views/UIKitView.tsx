/**
 * SAFA — World-Class UI KIT & Linear-Grade Design System Showcase (Build 02.1)
 * 
 * Standards & Policy:
 * - Strict Obsidian Dark theme (#06070A base, #0E0E14 surface, #131318 elevated)
 * - Ultra-soft diffused shadows and 1px specular top rim highlights (inset 0 1px 0 0 rgba(255,255,255,0.05))
 * - Linear.app-grade disciplined UI/UX: issue rows, status badges, priority matrix, command inputs, hotkeys
 * - Tactile 44px+ touch targets, smooth spring motion with motion/react, interactive state benches
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  Type,
  Palette,
  Check,
  Copy,
  Sliders,
  SlidersHorizontal,
  Terminal,
  Command,
  Flame,
  SignalHigh,
  SignalMedium,
  SignalLow,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Tag as TagIcon,
  User,
  Folder,
  Calendar,
  ChevronRight,
  Info,
  Eye,
  Code,
  Circle,
  CheckCircle2,
  MinusCircle,
  AlertTriangle,
  Search,
  Moon,
  Sun,
  RefreshCw,
  Play,
  Send,
  Share2,
  MoreHorizontal,
  Filter,
  Square,
  CheckSquare,
  Compass,
  LayoutGrid,
  SquarePen,
  Waves,
  Inbox,
  X,
  Volume2,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { useApp } from '../../core/context/AppContext';
import { useAuth } from '../../core/context/AuthContext';
import { tokens } from '../../core/tokens';
import { Button, IconButton, Tag, Avatar } from '../ui/Button';
import { Surface, Card, GlassSurface } from '../ui/Card';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Input, Textarea, SearchBar } from '../ui/Input';
import { SafaBrandLogo } from '../ui/SafaBrandLogo';
import { RhythmSparklineCard } from '../widgets/RhythmSparklineCard';
import { StreakHabitCard } from '../widgets/StreakHabitCard';

type SectionTab = 'ALL' | 'FOUNDATIONS' | 'LINEAR_PATTERNS' | 'COMPONENTS' | 'SURFACES' | 'PLAYGROUND';

interface IssueItem {
  id: string;
  code: string;
  title: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done' | 'canceled';
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'none';
  label: string;
  labelColor: 'neutral' | 'amber' | 'purple' | 'green' | 'red' | 'rose';
  assignee: string;
  date: string;
  completed?: boolean;
}

export function UIKitView() {
  const { themeMode, addToast } = useApp();
  const { isRTL } = useAuth();
  const isDark = themeMode === 'dark';

  const [activeSection, setActiveSection] = useState<SectionTab>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Playground state
  const [interactiveSearch, setInteractiveSearch] = useState('');
  const [sliderVal, setSliderVal] = useState(64);
  const [toggleActive, setToggleActive] = useState(true);
  const [toggleNotifications, setToggleNotifications] = useState(false);
  const [demoInputVal, setDemoInputVal] = useState('Personal Life Operating System');
  const [selectedPriority, setSelectedPriority] = useState<'urgent' | 'high' | 'medium' | 'low' | 'none'>('high');
  const [selectedStatus, setSelectedStatus] = useState<'todo' | 'in_progress' | 'review' | 'done'>('in_progress');
  const [activeDemoSegment, setActiveDemoSegment] = useState<'overview' | 'activity' | 'metrics'>('overview');

  // Interactive Linear issue rows state
  const [issues, setIssues] = useState<IssueItem[]>([
    {
      id: '1',
      code: 'SAF-104',
      title: 'Architect liquid-glass bottom navigation dock with sub-pixel rim highlights',
      status: 'done',
      priority: 'high',
      label: 'Design System',
      labelColor: 'purple',
      assignee: 'Safa',
      date: 'Today',
      completed: true,
    },
    {
      id: '2',
      code: 'SAF-105',
      title: 'Implement Linear-style keyboard hotkey event bus (⌘K, C, G+H)',
      status: 'in_progress',
      priority: 'urgent',
      label: 'Productivity',
      labelColor: 'red',
      assignee: 'AI Engine',
      date: 'In 2h',
      completed: false,
    },
    {
      id: '3',
      code: 'SAF-106',
      title: 'Obsidian #06070A velvet surface elevation layer calibration',
      status: 'review',
      priority: 'medium',
      label: 'Obsidian Theme',
      labelColor: 'neutral',
      assignee: 'Safa',
      date: 'Tomorrow',
      completed: false,
    },
    {
      id: '4',
      code: 'SAF-107',
      title: 'Real-time gesture feedback and tactile spring physics on touch release',
      status: 'todo',
      priority: 'low',
      label: 'Motion',
      labelColor: 'green',
      assignee: 'Safa',
      date: 'Sep 22',
      completed: false,
    },
    {
      id: '5',
      code: 'SAF-108',
      title: 'Persian luxury Vazirmatn typography optical baseline alignment',
      status: 'backlog',
      priority: 'none',
      label: 'Typography',
      labelColor: 'amber',
      assignee: 'Studio',
      date: 'Next week',
      completed: false,
    },
  ]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    addToast(`Copied ${label} to clipboard`, 'success');
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const toggleIssueComplete = (id: string) => {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              status: !item.completed ? 'done' : 'in_progress',
            }
          : item
      )
    );
  };

  // Section navigation tabs
  const sectionOptions = [
    { value: 'ALL', label: isRTL ? 'همه موارد' : 'All Overview', icon: <Layers className="w-3.5 h-3.5" /> },
    { value: 'FOUNDATIONS', label: isRTL ? 'پایه‌ها و رنگ‌ها' : 'Foundations', icon: <Palette className="w-3.5 h-3.5" /> },
    { value: 'LINEAR_PATTERNS', label: isRTL ? 'الگوهای لینیار' : 'Linear Patterns', icon: <Terminal className="w-3.5 h-3.5" /> },
    { value: 'COMPONENTS', label: isRTL ? 'کامپوننت‌ها' : 'Components', icon: <Sliders className="w-3.5 h-3.5" /> },
    { value: 'SURFACES', label: isRTL ? 'سطوح و متریال' : 'Surfaces & Glass', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { value: 'PLAYGROUND', label: isRTL ? 'سندباکس تعاملی' : 'Playground', icon: <Play className="w-3.5 h-3.5" /> },
  ];

  // Helper for priority icons
  const renderPriorityIcon = (priority: IssueItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case 'high':
        return <SignalHigh className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'medium':
        return <SignalMedium className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />;
      case 'low':
        return <SignalLow className="w-3.5 h-3.5 text-[#71717A] shrink-0" />;
      case 'none':
      default:
        return <MinusCircle className="w-3.5 h-3.5 text-[#52525B] shrink-0" />;
    }
  };

  // Helper for status icons
  const renderStatusIcon = (status: IssueItem['status'], completed?: boolean) => {
    if (completed || status === 'done') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
    }
    switch (status) {
      case 'in_progress':
        return <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />;
      case 'review':
        return <Eye className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case 'backlog':
        return <Circle className="w-3.5 h-3.5 text-[#71717A] stroke-dashed shrink-0" />;
      case 'canceled':
        return <MinusCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'todo':
      default:
        return <Circle className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />;
    }
  };

  return (
    <div className="space-y-10 pb-28 pt-2">
      {/* 1. HERO SYSTEM BANNER (Linear Craft & SAFA Identity) */}
      <section className="relative rounded-[32px] p-6 sm:p-9 overflow-hidden bg-[#0A0B10] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_24px_60px_-12px_rgba(0,0,0,0.85)]">
        {/* Soft Ambient Radial Light - pure obsidian luxury */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.018] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-500/[0.025] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.035] border border-white/[0.05] text-[11px] font-mono tracking-tight text-[#92929B]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SAFA DESIGN SYSTEM v02.1</span>
              <span className="text-white/20">•</span>
              <span className="text-white/70">LINEAR-GRADE SPECIFICATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDEF]">
              {isRTL ? 'کیت طراحی و دیزاین سیستم در سطح جهانی' : 'World-Class UI Kit & Design System'}
            </h1>

            <p className="text-sm text-[#92929B] leading-relaxed max-w-xl">
              {isRTL
                ? 'مهندسی دقیق بر پایه استانداردهای linear.app: دارک‌مود عمیق ابسیدین (#06070A)، هایلایت‌های نوری لب‌به‌لب ۱ پیکسلی، سایه‌های انتشار ملایم، سطوح مایع شیشه‌ای و ردیف‌های تعاملی ساختاریافته.'
                : 'Architected with linear.app precision: true obsidian black depths (#06070A), sub-pixel specular rim lighting, ultra-soft diffused shadows, tactile keyboard ergonomics, and modular connected object components.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-[#71717A]">
              <span className="px-2 py-0.5 rounded-md bg-[#131318] border border-white/[0.04] text-zinc-300">
                #06070A Canvas
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#131318] border border-white/[0.04] text-zinc-300">
                #0E0E14 Surface
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#131318] border border-white/[0.04] text-zinc-300">
                #131318 Elevated
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#131318] border border-white/[0.04] text-emerald-400">
                WCAG AAA Specular
              </span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <Button
              variant="white-pill"
              size="sm"
              icon={<Copy className="w-3.5 h-3.5" />}
              onClick={() => copyToClipboard(JSON.stringify(tokens, null, 2), 'All Design Tokens JSON')}
            >
              {copiedCode === 'All Design Tokens JSON' ? 'Tokens Copied!' : 'Copy Tokens JSON'}
            </Button>

            <Button
              variant="dark-pill"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => addToast('Linear-grade haptic feedback enabled across all controls', 'success')}
            >
              Simulate Haptic Sound
            </Button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR (Linear-Style Sticky Filter Rail) */}
      <div className="sticky top-16 z-30 py-2 backdrop-blur-xl bg-[#06070A]/80 border-y border-white/[0.02]">
        <SegmentedControl
          options={sectionOptions as any}
          value={activeSection}
          onChange={setActiveSection as any}
          size="sm"
          fullWidth
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. FOUNDATIONS SECTION: Colors, Surfaces, Lighting, Typography */}
      {/* ========================================================================= */}
      {(activeSection === 'ALL' || activeSection === 'FOUNDATIONS') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#EDEDEF]">
                  01. Foundations & Token Architecture
                </h2>
                <p className="text-xs text-[#8E8E98]">
                  Zero-blue obsidian color space, 4-tier elevation hierarchy, and sub-pixel lighting tokens.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-[#8E8E98]">
              CORE TOKENS
            </span>
          </div>

          {/* Color Palette Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Swatch 1: Canvas Base */}
            <div
              onClick={() => copyToClipboard('#06070A', '#06070A')}
              className="group p-4 rounded-2xl bg-[#0B0C11] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] cursor-pointer transition-all hover:border-white/[0.09] active:scale-[0.98]"
            >
              <div className="h-16 rounded-xl bg-[#06070A] border border-white/[0.05] flex items-end p-2.5 mb-3 shadow-inner">
                <span className="text-[10px] font-mono text-zinc-500">CANVAS ROOT</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#EDEDEF]">Velvet Obsidian</h4>
                  <p className="text-[11px] font-mono text-[#8E8E98]">#06070A</p>
                </div>
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5 leading-snug">
                Deepest backdrop canvas. Strictly zero blue tint.
              </p>
            </div>

            {/* Swatch 2: Surface Layer 1 */}
            <div
              onClick={() => copyToClipboard('#0E0E14', '#0E0E14')}
              className="group p-4 rounded-2xl bg-[#0B0C11] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] cursor-pointer transition-all hover:border-white/[0.09] active:scale-[0.98]"
            >
              <div className="h-16 rounded-xl bg-[#0E0E14] border border-white/[0.05] flex items-end p-2.5 mb-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <span className="text-[10px] font-mono text-zinc-400">SURFACE L1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#EDEDEF]">Surface Container</h4>
                  <p className="text-[11px] font-mono text-[#8E8E98]">#0E0E14</p>
                </div>
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5 leading-snug">
                Standard cards, lists, and segmented rails.
              </p>
            </div>

            {/* Swatch 3: Surface Layer 2 (Elevated) */}
            <div
              onClick={() => copyToClipboard('#131318', '#131318')}
              className="group p-4 rounded-2xl bg-[#0B0C11] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] cursor-pointer transition-all hover:border-white/[0.09] active:scale-[0.98]"
            >
              <div className="h-16 rounded-xl bg-[#131318] border border-white/[0.06] flex items-end p-2.5 mb-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <span className="text-[10px] font-mono text-zinc-300">ELEVATED L2</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#EDEDEF]">Elevated Modal</h4>
                  <p className="text-[11px] font-mono text-[#8E8E98]">#131318</p>
                </div>
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5 leading-snug">
                Command palette, sheets, popovers, and active cards.
              </p>
            </div>

            {/* Swatch 4: Primary Text Silver White */}
            <div
              onClick={() => copyToClipboard('#EDEDEF', '#EDEDEF')}
              className="group p-4 rounded-2xl bg-[#0B0C11] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] cursor-pointer transition-all hover:border-white/[0.09] active:scale-[0.98]"
            >
              <div className="h-16 rounded-xl bg-[#EDEDEF] flex items-end p-2.5 mb-3">
                <span className="text-[10px] font-mono text-black font-semibold">PRIMARY TEXT</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#EDEDEF]">Refined Silver White</h4>
                  <p className="text-[11px] font-mono text-[#8E8E98]">#EDEDEF</p>
                </div>
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5 leading-snug">
                Anti-glare high contrast text. WCAG AAA compliance.
              </p>
            </div>
          </div>

          {/* Accent Color Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: 'Emerald Done', hex: '#10B981', bg: 'bg-[#10B981]', desc: 'Completed / Active states' },
              { name: 'Amber Focus', hex: '#F59E0B', bg: 'bg-[#F59E0B]', desc: 'In progress / High priority' },
              { name: 'Rose Urgent', hex: '#F43F5E', bg: 'bg-[#F43F5E]', desc: 'Urgent / Live indicators' },
              { name: 'Sapphire Sync', hex: '#3B82F6', bg: 'bg-[#3B82F6]', desc: 'Ethereum / Connected graph' },
              { name: 'Violet Insight', hex: '#A855F7', bg: 'bg-[#A855F7]', desc: 'AI reflections / Studio' },
            ].map((acc) => (
              <div
                key={acc.hex}
                onClick={() => copyToClipboard(acc.hex, acc.name)}
                className="p-3 rounded-xl bg-[#0E0E14] border border-white/[0.03] hover:border-white/[0.08] cursor-pointer transition-all active:scale-95"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${acc.bg} shadow-sm`} />
                  <span className="text-xs font-semibold text-zinc-200">{acc.name}</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-400">{acc.hex}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{acc.desc}</p>
              </div>
            ))}
          </div>

          {/* Typography Scale Demonstration */}
          <div className="p-6 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Typography Hierarchy & Dual-Script Pairings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="border-b border-white/[0.04] pb-2">
                  <span className="text-[10px] font-mono text-zinc-500">DISPLAY HEADLINE (28px - Cormorant/Jakarta)</span>
                  <p className="text-2xl font-serif italic text-white tracking-tight">
                    Quiet Luxury & Intelligent Sovereignty
                  </p>
                </div>
                <div className="border-b border-white/[0.04] pb-2">
                  <span className="text-[10px] font-mono text-zinc-500">UI HEADING MEDIUM (18px - Plus Jakarta)</span>
                  <p className="text-lg font-semibold text-[#EDEDEF] tracking-tight">
                    Connected Objects & Universal Knowledge Graph
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500">MONOSPACE SYSTEM ACCENTS (12px - JetBrains)</span>
                  <p className="text-xs font-mono text-zinc-400">
                    OBJ-8492 // 16.4ms // SHA-256: 0x9f2a4e...
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="border-b border-white/[0.04] pb-2 font-persian-luxury">
                  <span className="text-[10px] font-mono text-zinc-500">PERSIAN LUXURY TITLE (24px - Vazirmatn)</span>
                  <p className="text-xl font-bold text-white tracking-tight" dir="rtl">
                    سیستم‌عامل اختصاصی و هوشمند زندگی صفا
                  </p>
                </div>
                <div className="border-b border-white/[0.04] pb-2 font-persian-luxury">
                  <span className="text-[10px] font-mono text-zinc-500">PERSIAN SUBTITLE (14px - Vazirmatn)</span>
                  <p className="text-sm font-medium text-[#92929B]" dir="rtl">
                    طراحی مینیمال، متریال مخملین ابسیدین و شیشه‌های سیال فوق پیشرفته.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500">READABILITY METRICS</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Baseline grid step ratio: 1.25. Body line-height: 1.6. Constrained character measure: 68ch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. LINEAR PATTERNS: Interactive Issue Rows, Priority, Status, Hotkeys */}
      {/* ========================================================================= */}
      {(activeSection === 'ALL' || activeSection === 'LINEAR_PATTERNS') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#EDEDEF]">
                  02. Linear-Style Patterns & Issue Mechanics
                </h2>
                <p className="text-xs text-[#8E8E98]">
                  Signature Linear ergonomics: structured object rows, priority indicators, and keyboard-first accelerators.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-400/[0.08] text-amber-300 border border-amber-400/20">
              SIGNATURE UX
            </span>
          </div>

          {/* Interactive Issue Rows Table */}
          <div className="rounded-2xl bg-[#0B0C11] border border-white/[0.03] overflow-hidden shadow-[0_18px_40px_-10px_rgba(0,0,0,0.7)]">
            {/* Table Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0E0E14] border-b border-white/[0.035] text-[11px] font-mono text-[#71717A] select-none">
              <div className="flex items-center gap-3">
                <span className="w-5 text-center">ST</span>
                <span>IDENTIFIER & TITLE</span>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <span>PRIORITY</span>
                <span>LABEL</span>
                <span>ASSIGNEE</span>
                <span>DUE</span>
              </div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-white/[0.02]">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => toggleIssueComplete(issue.id)}
                  className={`group flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-150 select-none ${
                    issue.completed
                      ? 'bg-[#0B0C11]/50 text-zinc-500'
                      : 'hover:bg-[#131319] text-[#EDEDEF]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Status Toggle Circle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleIssueComplete(issue.id);
                      }}
                      className="p-1 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer"
                      title={`Status: ${issue.status}`}
                    >
                      {renderStatusIcon(issue.status, issue.completed)}
                    </button>

                    {/* Monospace Issue Code */}
                    <span className="text-xs font-mono text-[#8E8E98] group-hover:text-white transition-colors shrink-0">
                      {issue.code}
                    </span>

                    {/* Issue Title */}
                    <p
                      className={`text-xs font-medium tracking-tight truncate ${
                        issue.completed ? 'line-through text-zinc-500' : 'text-[#EDEDEF]'
                      }`}
                    >
                      {issue.title}
                    </p>
                  </div>

                  {/* Right Metadata Strip */}
                  <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs">
                    {/* Priority Glyph */}
                    <div className="flex items-center gap-1" title={`Priority: ${issue.priority}`}>
                      {renderPriorityIcon(issue.priority)}
                      <span className="hidden md:inline text-[11px] font-mono capitalize text-[#8E8E98]">
                        {issue.priority}
                      </span>
                    </div>

                    {/* Tag Chip */}
                    <Tag variant={issue.labelColor} size="sm" className="hidden sm:inline-flex">
                      {issue.label}
                    </Tag>

                    {/* Assignee Avatar */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      <Avatar name={issue.assignee} size="xs" />
                      <span className="hidden lg:inline text-[11px] text-[#8E8E98]">{issue.assignee}</span>
                    </div>

                    {/* Due Date */}
                    <span className="text-[11px] font-mono text-[#71717A] w-14 text-right">
                      {issue.date}
                    </span>

                    {/* Keyboard Hint Pill */}
                    <kbd className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500 group-hover:text-zinc-300 group-hover:bg-white/[0.08]">
                      SPACE
                    </kbd>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority & Status Matrix Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority Matrix */}
            <div className="p-4 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Linear Priority Signal Hierarchy
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span className="font-semibold text-white">Urgent</span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-auto">P1</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <SignalHigh className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white">High</span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-auto">P2</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <SignalMedium className="w-4 h-4 text-[#A1A1AA]" />
                  <span className="font-semibold text-zinc-300">Medium</span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-auto">P3</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <SignalLow className="w-4 h-4 text-[#71717A]" />
                  <span className="font-semibold text-zinc-400">Low</span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-auto">P4</span>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts Palette */}
            <div className="p-4 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Global Hotkey Ergonomics (Linear Protocol)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <span className="text-zinc-300">Command Palette</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] font-mono text-white">⌘K</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <span className="text-zinc-300">Universal Capture</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] font-mono text-white">C</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <span className="text-zinc-300">Quick Search</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] font-mono text-white">/</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#0E0E14] border border-white/[0.02]">
                  <span className="text-zinc-300">Toggle Theme</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] font-mono text-white">T</kbd>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. COMPONENTS SECTION: Buttons, Inputs, Segmented Controls, Toggles */}
      {/* ========================================================================= */}
      {(activeSection === 'ALL' || activeSection === 'COMPONENTS') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#EDEDEF]">
                  03. Tactile Components & Controls
                </h2>
                <p className="text-xs text-[#8E8E98]">
                  High-craft buttons, command inputs, segmented controls, switches, and sliders.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-400/[0.08] text-purple-300 border border-purple-400/20">
              INTERACTIVE CONTROLS
            </span>
          </div>

          {/* Button Matrix */}
          <div className="p-6 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Button Archetypes & Satin Pill Finishes
              </h3>
              <span className="text-[11px] font-mono text-zinc-500">44px TOUCH COMPLIANT</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="white-pill" size="md">
                Primary Satin Pill
              </Button>
              <Button variant="dark-pill" size="md">
                Obsidian Velvet Pill
              </Button>
              <Button variant="ghost" size="md">
                Ghost Action
              </Button>
              <Button variant="outline" size="md">
                Hairline Outline
              </Button>
              <Button variant="rose" size="md" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
                Danger / Destructive
              </Button>
            </div>

            <div className="pt-2 border-t border-white/[0.03] flex flex-wrap items-center gap-3">
              <span className="text-xs text-[#71717A] mr-2">Sizes:</span>
              <Button variant="white-pill" size="xs">Extra Small (xs)</Button>
              <Button variant="white-pill" size="sm">Small (sm)</Button>
              <Button variant="white-pill" size="md">Medium (md)</Button>
              <Button variant="white-pill" size="lg">Large (lg)</Button>
            </div>

            <div className="pt-2 border-t border-white/[0.03] flex flex-wrap items-center gap-3">
              <span className="text-xs text-[#71717A] mr-2">Icon Buttons:</span>
              <IconButton icon={<Sparkles className="w-4 h-4" />} variant="white" size="md" />
              <IconButton icon={<Terminal className="w-4 h-4" />} variant="secondary" size="md" />
              <IconButton icon={<Share2 className="w-4 h-4" />} variant="ghost" size="md" />
              <IconButton icon={<MoreHorizontal className="w-4 h-4" />} variant="ghost" size="sm" />
            </div>
          </div>

          {/* Command Search & Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Linear Command Input (with ⌘K indicator)
              </h3>
              <SearchBar
                value={interactiveSearch}
                onChange={setInteractiveSearch}
                placeholder="Search issues, objects, ideas (⌘K)..."
                onClear={() => setInteractiveSearch('')}
              />
              <p className="text-[11px] text-zinc-500">
                Type query above. Notice instant clear button and micro-hairline border.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Velvet Text Input with Validation
              </h3>
              <Input
                label="Object Title"
                value={demoInputVal}
                onChange={(e) => setDemoInputVal(e.target.value)}
                placeholder="Enter title..."
                rightIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
              />
              <p className="text-[11px] text-zinc-500">
                Smooth focus highlight with velvet #131317 container.
              </p>
            </div>
          </div>

          {/* Toggles, Sliders & Switches */}
          <div className="p-6 rounded-2xl bg-[#0B0C11] border border-white/[0.03] space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Tactile Switches, Range Sliders & Segmented Selectors
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Velvet Toggle 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E0E14] border border-white/[0.025]">
                <div>
                  <h5 className="text-xs font-semibold text-[#EDEDEF]">Haptic Spring Physics</h5>
                  <p className="text-[10px] text-zinc-500">Enable spring damping: 32</p>
                </div>
                <button
                  type="button"
                  onClick={() => setToggleActive(!toggleActive)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer p-0.5 ${
                    toggleActive ? 'bg-emerald-500' : 'bg-white/[0.1]'
                  }`}
                >
                  <motion.div
                    animate={{ x: toggleActive ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>

              {/* Velvet Toggle 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E0E14] border border-white/[0.025]">
                <div>
                  <h5 className="text-xs font-semibold text-[#EDEDEF]">Sub-Pixel Specular</h5>
                  <p className="text-[10px] text-zinc-500">1px top edge rim highlight</p>
                </div>
                <button
                  type="button"
                  onClick={() => setToggleNotifications(!toggleNotifications)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer p-0.5 ${
                    toggleNotifications ? 'bg-white' : 'bg-white/[0.1]'
                  }`}
                >
                  <motion.div
                    animate={{ x: toggleNotifications ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`w-5 h-5 rounded-full ${toggleNotifications ? 'bg-black' : 'bg-white'} shadow-sm`}
                  />
                </button>
              </div>

              {/* Velvet Range Slider */}
              <div className="p-3.5 rounded-xl bg-[#0E0E14] border border-white/[0.025] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#EDEDEF]">Backdrop Saturation</span>
                  <span className="font-mono text-zinc-400">{sliderVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            {/* Segmented Control Demo */}
            <div className="pt-2">
              <SegmentedControl
                options={[
                  { value: 'overview', label: 'Overview', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                  { value: 'activity', label: 'Activity Logs', badge: 14, icon: <Clock className="w-3.5 h-3.5" /> },
                  { value: 'metrics', label: 'System Metrics', icon: <SignalHigh className="w-3.5 h-3.5" /> },
                ]}
                value={activeDemoSegment}
                onChange={setActiveDemoSegment as any}
                size="md"
              />
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. SURFACES SECTION: Obsidian Cards, Liquid Glass, Specular Highlights */}
      {/* ========================================================================= */}
      {(activeSection === 'ALL' || activeSection === 'SURFACES') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#EDEDEF]">
                  04. Surfaces, Ambient Auras & Glass Docks
                </h2>
                <p className="text-xs text-[#8E8E98]">
                  Authentic Obsidian Liquid Glass (SOLG) layers, rim lighting, and diffuse shadows.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/[0.08] text-emerald-300 border border-emerald-400/20">
              LIGHTING & GLASS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card Archetype 1: Standard Surface Card */}
            <div className="p-5 rounded-[26px] bg-[#0E0E14] border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.045),0_16px_40px_-10px_rgba(0,0,0,0.65)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">SURFACE LAYER 1</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <h4 className="text-sm font-semibold text-[#EDEDEF]">Standard Obsidian Surface</h4>
              <p className="text-xs text-[#8E8E98] leading-relaxed">
                Rendered with 1px white/[0.025] hairline border and inset 0 1px 0 0 white/0.045 top rim highlight.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-500">
                #0E0E14 // 26px Radius
              </div>
            </div>

            {/* Card Archetype 2: Elevated Interactive Card */}
            <div className="p-5 rounded-[26px] bg-[#131318] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_22px_48px_-10px_rgba(0,0,0,0.8)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-300">ELEVATED LAYER 2</span>
                <span className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
              <h4 className="text-sm font-semibold text-[#EDEDEF]">Elevated Interactive Card</h4>
              <p className="text-xs text-[#8E8E98] leading-relaxed">
                Higher Z-elevation for modals, popups, and hovered components with deeper diffused shadow.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-500">
                #131318 // 26px Radius
              </div>
            </div>

            {/* Card Archetype 3: Liquid Glass Capsule */}
            <div className="p-5 rounded-[26px] liquid-glass-dark-dock space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-300">LIQUID GLASS DOCK</span>
                <span className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <h4 className="text-sm font-semibold text-[#EDEDEF]">Frosted Liquid Glass Dock</h4>
              <p className="text-xs text-[#8E8E98] leading-relaxed">
                rgba(14, 14, 19, 0.52) with blur(18px) saturate(170%) for the iconic bottom navigation dock.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-500">
                Glass Dock // Full Pill
              </div>
            </div>
          </div>

          {/* Living Aura Accents Preview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Living Aura Accents (Subtle Radial Lighting)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-[22px] bg-[#0B0C11] card-aura-emerald border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Aura Emerald</span>
                <h5 className="text-xs font-semibold text-white mt-1">Health & Habit Rhythms</h5>
              </div>
              <div className="p-4 rounded-[22px] bg-[#0B0C11] card-aura-sapphire border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <span className="text-[10px] font-mono text-blue-400 uppercase">Aura Sapphire</span>
                <h5 className="text-xs font-semibold text-white mt-1">Ethereum & Liquidity</h5>
              </div>
              <div className="p-4 rounded-[22px] bg-[#0B0C11] card-aura-sunset border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <span className="text-[10px] font-mono text-amber-400 uppercase">Aura Sunset</span>
                <h5 className="text-xs font-semibold text-white mt-1">Focus & Project Velocity</h5>
              </div>
              <div className="p-4 rounded-[22px] bg-[#0B0C11] card-aura-ruby border border-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <span className="text-[10px] font-mono text-rose-400 uppercase">Aura Ruby</span>
                <h5 className="text-xs font-semibold text-white mt-1">Live Moments & Urgent</h5>
              </div>
            </div>
          </div>

          {/* Living Widget Integration Demo */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-3">
              Production Widget: Live Ethereum Sparkline
            </h4>
            <div className="max-w-md">
              <RhythmSparklineCard />
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 7. PLAYGROUND: Live Interactive Sandbox & Notification HUD */}
      {/* ========================================================================= */}
      {(activeSection === 'ALL' || activeSection === 'PLAYGROUND') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <div className="flex items-center gap-2.5">
              <Play className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#EDEDEF]">
                  05. Interactive Playground & Toast Dispatcher
                </h2>
                <p className="text-xs text-[#8E8E98]">
                  Live test bench for triggering real toasts, simulating Linear states, and inspecting generated tokens.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/[0.08] text-emerald-300 border border-emerald-400/20">
              LIVE SANDBOX
            </span>
          </div>

          <div className="p-6 rounded-[28px] bg-[#0A0B10] border border-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button
                variant="white-pill"
                size="sm"
                fullWidth
                icon={<Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                onClick={() => addToast('Linear Issue SAF-109 created and synced to graph', 'success')}
              >
                Trigger Success Toast
              </Button>

              <Button
                variant="dark-pill"
                size="sm"
                fullWidth
                icon={<Info className="w-3.5 h-3.5 text-blue-400" />}
                onClick={() => addToast('Command palette shortcut: ⌘K or / to search', 'info')}
              >
                Trigger Info HUD
              </Button>

              <Button
                variant="dark-pill"
                size="sm"
                fullWidth
                icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                onClick={() => addToast('Weekly sprint cycle: 72% velocity target reached', 'warning')}
              >
                Trigger Warning HUD
              </Button>

              <Button
                variant="rose"
                size="sm"
                fullWidth
                icon={<AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                onClick={() => addToast('Urgent priority blocker flagged on SAF-105', 'rose')}
              >
                Trigger Rose Alert
              </Button>
            </div>

            {/* Live Interactive State Inspection */}
            <div className="p-4 rounded-2xl bg-[#0E0E14] border border-white/[0.025] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300">Live Component State Inspector</span>
                <span className="text-[10px] font-mono text-zinc-500">REACT 19 • DYNAMIC BINDING</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-zinc-400">
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="text-zinc-500 block text-[10px]">THEME</span>
                  <span className="text-white font-semibold">Obsidian Dark</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="text-zinc-500 block text-[10px]">HAPTICS</span>
                  <span className={toggleActive ? 'text-emerald-400' : 'text-zinc-500'}>
                    {toggleActive ? 'Active (32)' : 'Disabled'}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="text-zinc-500 block text-[10px]">SATURATION</span>
                  <span className="text-white font-semibold">{sliderVal}%</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="text-zinc-500 block text-[10px]">ISSUES COUNT</span>
                  <span className="text-amber-400 font-semibold">{issues.length} active</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
