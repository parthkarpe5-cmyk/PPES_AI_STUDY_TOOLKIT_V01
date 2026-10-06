'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles, ArrowRight, RotateCcw, Search,
  ChevronDown, ShieldAlert, Check, Copy, ExternalLink, Bot
} from 'lucide-react';
import { SUBJECTS, CLASS_LEVELS } from '@/data/subjects';
import { getStoredProfile, saveStoredProfile } from '@/lib/study-profile';
import type { ClassLevel, BoardType } from '@/lib/study-profile';
import { getCurriculumSubjects } from '@/data/curriculum';
import { CAPABILITY_CATEGORIES, type SubCapability } from '@/data/capabilities';
import { EXPLANATION_STYLES } from '@/data/prompt-templates';
import { generateStudyPrompt, type GeneratedPromptResult } from '@/lib/prompt-generator';
import { PromptResultCard } from '@/components/PromptResultCard';
import { StudyIcon } from '@/components/StudyIcon';

// ─── Local types ─────────────────────────────────────────────────────────────

interface BuilderState {
  classLevel: ClassLevel;
  board: BoardType;
  subjectId: string;
  chapterId: string;
  topic: string;
  capabilityId: string;
  subCapabilityId: string;
  goalId: string;
  styleId: string;
  examFocus: boolean;
}

const BOARDS: { id: BoardType; label: string; emoji: string }[] = [
  { id: 'cbse', label: 'CBSE', emoji: '🇮🇳' },
  { id: 'icse', label: 'ICSE', emoji: '📘' },
  { id: 'state', label: 'State Board', emoji: '🏫' },
  { id: 'other', label: 'My Syllabus', emoji: '📄' },
];

// ─── Small reusable chip ────────────────────────────────────────────────────

function Chip({
  selected, onClick, children, id, disabled
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
  disabled?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold
        transition-all duration-150 cursor-pointer select-none min-h-[44px] focus-visible:outline-2
        focus-visible:outline-[#2fa8cc] focus-visible:outline-offset-2
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${selected
          ? 'bg-[#1f4e79] text-white shadow-md shadow-[#1f4e79]/20 ring-2 ring-[#1f4e79]/30'
          : 'bg-white border border-[#e2e8f0] text-[#1a1a1a] hover:border-[#2fa8cc] hover:bg-[#e8f6fa]'
        }
      `}
    >
      {selected && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </button>
  );
}

// ─── Step header ────────────────────────────────────────────────────────────

function StepLabel({ n, label, done }: { n: number; label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-2 sm:mb-3">
      <span className={`
        w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-extrabold shrink-0 transition-colors
        ${done ? 'bg-[#2fa8cc] text-white' : 'bg-[#e2e8f0] text-[#5a6b7b]'}
      `}>
        {done ? <Check className="w-3 h-3" /> : n}
      </span>
      <span className="text-[11px] sm:text-xs font-bold text-[#5a6b7b] uppercase tracking-wider">{label}</span>
    </div>
  );
}

// ─── Compact Mobile Step Indicator ──────────────────────────────────────────

function MobileStepIndicator({ currentStep, totalSteps = 6, label }: { currentStep: number; totalSteps?: number; label: string }) {
  return (
    <div className="sm:hidden flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs text-xs font-semibold text-[#1f4e79]">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-[#ff6b00]">Step {currentStep} of {totalSteps}:</span>
        <span className="text-[#1a1a1a] truncate max-w-[170px]">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i + 1 === currentStep
                ? 'w-3 bg-[#ff6b00]'
                : i + 1 < currentStep
                ? 'bg-[#2fa8cc]'
                : 'bg-[#e2e8f0]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Prompt preview (before full result) ────────────────────────────────────

function PromptPreview({ state, customTopic }: { state: BuilderState; customTopic: string }) {
  const topic = customTopic.trim() || state.topic;
  const cap = CAPABILITY_CATEGORIES.find(c => c.id === state.capabilityId);
  const sub = cap?.subs.find(s => s.id === state.subCapabilityId);
  const subjectData = SUBJECTS.find(s => s.id === state.subjectId);

  const parts: { label: string; value: string; color: string }[] = [];
  parts.push({ label: 'Class', value: `Class ${state.classLevel}`, color: 'bg-[#e8f6fa] text-[#1f4e79]' });
  if (state.subjectId) parts.push({ label: 'Subject', value: subjectData?.name || state.subjectId, color: 'bg-amber-50 text-amber-900' });
  if (topic) parts.push({ label: 'Topic', value: topic, color: 'bg-purple-50 text-purple-900' });
  if (cap) parts.push({ label: 'Goal', value: sub?.label || cap.label, color: 'bg-emerald-50 text-emerald-900' });

  return (
    <div className="rounded-2xl border border-dashed border-[#2fa8cc]/40 bg-[#fafbfc] p-3.5 sm:p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#2fa8cc]" aria-hidden="true" />
        <span className="text-[11px] sm:text-xs font-bold text-[#2fa8cc] uppercase tracking-wide">
          {parts.length < 3 ? 'Your prompt is taking shape…' : 'Almost ready — choose a goal to generate'}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {parts.map(p => (
          <span key={p.label} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${p.color}`}>
            <span className="opacity-60 font-normal">{p.label}:</span>
            <span>{p.value}</span>
          </span>
        ))}
        {parts.length < 4 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-[#e2e8f0] text-[#5a6b7b] border border-dashed border-[#c0c8d4]">
            + more…
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

interface SinglePageBuilderProps {
  initialCapabilityId?: string;
  initialSubCapabilityId?: string;
}

export function SinglePageBuilder({ initialCapabilityId, initialSubCapabilityId }: SinglePageBuilderProps) {
  const resultRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<BuilderState>(() => {
    const profile = typeof window !== 'undefined' ? getStoredProfile() : { classLevel: '10' as ClassLevel, board: 'cbse' as BoardType };
    return {
      classLevel: profile.classLevel,
      board: profile.board,
      subjectId: '',
      chapterId: '',
      topic: '',
      capabilityId: '',
      subCapabilityId: '',
      goalId: '',
      styleId: 'simple',
      examFocus: true,
    };
  });

  const [chapterSearch, setChapterSearch] = useState('');
  const [topicSearch, setTopicSearch] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [result, setResult] = useState<GeneratedPromptResult | null>(null);
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const [copiedSticky, setCopiedSticky] = useState(false);

  // Sync from homepage capability gallery
  useEffect(() => {
    if (!initialCapabilityId) return;
    const cat = CAPABILITY_CATEGORIES.find(c => c.id === initialCapabilityId);
    if (!cat) return;
    const sub = initialSubCapabilityId
      ? cat.subs.find(s => s.id === initialSubCapabilityId)
      : undefined;
    setState(prev => ({
      ...prev,
      capabilityId: initialCapabilityId,
      subCapabilityId: sub?.id || '',
      goalId: sub?.goalId || cat.defaultGoalId,
      styleId: sub?.styleId || 'simple',
    }));
    setResult(null);
  }, [initialCapabilityId, initialSubCapabilityId]);

  // Derived values
  const currSubjects = getCurriculumSubjects(state.classLevel, state.board);
  const selectedCurrSubject = currSubjects.find(s => s.id === state.subjectId);
  const filteredChapters = (selectedCurrSubject?.chapters || []).filter(ch =>
    ch.name.toLowerCase().includes(chapterSearch.toLowerCase())
  );
  const selectedChapter = selectedCurrSubject?.chapters.find(ch => ch.id === state.chapterId);
  const availableTopics = selectedChapter?.topics || [];
  const filteredTopics = availableTopics.filter(t =>
    t.toLowerCase().includes(topicSearch.toLowerCase())
  );
  const selectedCap = CAPABILITY_CATEGORIES.find(c => c.id === state.capabilityId);
  const selectedSubCap: SubCapability | undefined = selectedCap?.subs.find(s => s.id === state.subCapabilityId);
  const sampleTopics = SUBJECTS.find(s => s.id === state.subjectId)?.sampleTopicsByClass[state.classLevel] || [];

  // Progress flags
  const hasClass = !!state.classLevel;
  const hasBoard = !!state.board;
  const hasSubject = !!state.subjectId;
  const hasTopic = !!(state.topic || customTopic.trim());
  const hasGoal = !!state.goalId;
  const isReady = !!(hasSubject && hasTopic && hasGoal);

  // Progressive step logic
  const showChapters = hasSubject;
  const showTopics = hasSubject;
  const showGoal = hasSubject && hasTopic;
  const showStyleAndGenerate = hasGoal;
  const showPromptPreview = !!(hasSubject || hasTopic || hasGoal);

  // Calculate current active step (1 to 6)
  const currentStepNumber = !hasClass ? 1 : !hasBoard ? 2 : !hasSubject ? 3 : !state.chapterId ? 4 : !hasTopic ? 5 : !hasGoal ? 6 : 6;
  const currentStepLabel = !hasClass ? 'Class' : !hasBoard ? 'Board' : !hasSubject ? 'Subject' : !state.chapterId ? 'Chapter' : !hasTopic ? 'Topic' : 'Goal';

  const update = useCallback(<K extends keyof BuilderState>(key: K, val: BuilderState[K]) => {
    setState(prev => ({ ...prev, [key]: val }));
    setResult(null);
  }, []);

  const selectCapability = (catId: string) => {
    const cat = CAPABILITY_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    if (state.capabilityId === catId) {
      setState(prev => ({ ...prev, capabilityId: '', subCapabilityId: '', goalId: '' }));
      setResult(null);
      return;
    }
    setState(prev => ({
      ...prev,
      capabilityId: catId,
      subCapabilityId: '',
      goalId: cat.defaultGoalId,
      styleId: 'simple',
    }));
    setResult(null);
  };

  const selectSubCapability = (sub: SubCapability) => {
    setState(prev => ({
      ...prev,
      subCapabilityId: sub.id,
      goalId: sub.goalId,
      styleId: sub.styleId,
    }));
    setResult(null);
  };

  const handleGenerate = () => {
    const finalTopic = customTopic.trim() || state.topic;
    if (!finalTopic || !state.subjectId || !state.goalId) return;

    const chapterNote = selectedChapter ? `Chapter: ${selectedChapter.name}` : '';
    const subCapNote = selectedSubCap?.taskHint ? `Format note: ${selectedSubCap.taskHint}` : '';
    const toolNote = selectedSubCap?.recommendedTool ? `Recommended tool: ${selectedSubCap.recommendedTool}` : '';
    const additionalNotes = [chapterNote, subCapNote, toolNote].filter(Boolean).join(' | ');

    const generated = generateStudyPrompt({
      classLevel: state.classLevel,
      subjectId: state.subjectId,
      topic: finalTopic,
      goalId: state.goalId,
      styleId: state.styleId,
      examFocus: state.examFocus,
      additionalNotes,
    });

    saveStoredProfile({ classLevel: state.classLevel, board: state.board });
    setResult(generated);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      subjectId: '',
      chapterId: '',
      topic: '',
      capabilityId: '',
      subCapabilityId: '',
      goalId: '',
      styleId: 'simple',
      examFocus: true,
    }));
    setCustomTopic('');
    setChapterSearch('');
    setTopicSearch('');
    setResult(null);
    setShowStyleOptions(false);
  };

  const handleStickyCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.fullPrompt);
      setCopiedSticky(true);
      setTimeout(() => setCopiedSticky(false), 2500);
    } catch {
      setCopiedSticky(true);
      setTimeout(() => setCopiedSticky(false), 2500);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* ── MOBILE PROGRESS INDICATOR ────────────────────────────────────── */}
      <MobileStepIndicator currentStep={currentStepNumber} label={currentStepLabel} />

      {/* ── STEP 1 + 2: Class & Board ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <StepLabel n={1} label="Who are you?" done={hasClass} />
            <div className="flex flex-wrap gap-2">
              {CLASS_LEVELS.map(cl => (
                <Chip
                  key={cl.value}
                  id={`class-${cl.value}`}
                  selected={state.classLevel === cl.value}
                  onClick={() => {
                    update('classLevel', cl.value as ClassLevel);
                    setState(prev => ({ ...prev, subjectId: '', chapterId: '', topic: '' }));
                    setCustomTopic('');
                  }}
                >
                  {cl.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <StepLabel n={2} label="Which board?" done={hasBoard} />
            <div className="flex flex-wrap gap-2">
              {BOARDS.map(b => (
                <Chip
                  key={b.id}
                  id={`board-${b.id}`}
                  selected={state.board === b.id}
                  onClick={() => {
                    update('board', b.id);
                    setState(prev => ({ ...prev, subjectId: '', chapterId: '', topic: '' }));
                    setCustomTopic('');
                  }}
                >
                  <span aria-hidden="true">{b.emoji}</span>
                  {b.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STEP 3: Subject ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-2xs">
        <StepLabel n={3} label="What are you studying?" done={hasSubject} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {currSubjects.map(sub => {
            const sel = state.subjectId === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                aria-pressed={sel}
                onClick={() => {
                  setState(prev => ({ ...prev, subjectId: sub.id, chapterId: '', topic: '' }));
                  setCustomTopic('');
                  setResult(null);
                }}
                className={`
                  p-3 sm:p-3.5 rounded-xl border text-center flex flex-col items-center gap-1.5 sm:gap-2
                  transition-all duration-150 cursor-pointer group min-h-[48px] focus-visible:outline-2
                  focus-visible:outline-[#2fa8cc] focus-visible:outline-offset-2
                  ${sel
                    ? 'bg-[#e8f6fa] border-[#2fa8cc] ring-2 ring-[#2fa8cc]/25 shadow-xs'
                    : 'bg-[#fafbfc] border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:bg-[#e8f6fa]/40'
                  }
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sel ? 'bg-white text-[#1f4e79] shadow-xs' : 'bg-[#eef2f6] text-[#5a6b7b]'}`}>
                  <StudyIcon name={sub.id} className="w-4 h-4" />
                </div>
                <span className={`text-xs font-bold font-display leading-tight ${sel ? 'text-[#1f4e79]' : 'text-[#1a1a1a] group-hover:text-[#1f4e79]'}`}>
                  {sub.name}
                </span>
                {sel && <Check className="w-3 h-3 text-[#2fa8cc]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 4: Chapter (progressive — revealed after subject) ───────── */}
      {showChapters && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <StepLabel n={4} label={`${selectedCurrSubject?.name || 'Subject'} — Chapter`} done={!!state.chapterId} />
            {filteredChapters.length > 4 && (
              <div className="relative w-full sm:w-52">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search chapters…"
                  value={chapterSearch}
                  onChange={e => setChapterSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#e2e8f0] bg-white text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-none"
                  aria-label="Search chapters"
                />
              </div>
            )}
          </div>

          {/* Chapters grid on desktop, scrollable chips on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
            {filteredChapters.map(ch => {
              const sel = state.chapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  aria-pressed={sel}
                  onClick={() => {
                    setState(prev => ({ ...prev, chapterId: ch.id, topic: '' }));
                    setCustomTopic('');
                    setResult(null);
                  }}
                  className={`
                    px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between gap-2
                    transition-all cursor-pointer text-xs sm:text-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#2fa8cc]
                    ${sel
                      ? 'bg-[#e8f6fa] border-[#2fa8cc] text-[#1f4e79] font-bold'
                      : 'border-[#e2e8f0] bg-[#fafbfc] text-[#1a1a1a] hover:border-[#2fa8cc]/50 hover:bg-[#e8f6fa]/30'
                    }
                  `}
                >
                  <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                    <span className={`text-[10px] font-bold shrink-0 ${sel ? 'text-[#2fa8cc]' : 'text-[#5a6b7b]'}`}>
                      {ch.chapterNumber}.
                    </span>
                    <span className="font-semibold leading-snug line-clamp-1">{ch.name}</span>
                  </div>
                  {sel && <Check className="w-3.5 h-3.5 text-[#2fa8cc] shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {!state.chapterId && (
            <button
              type="button"
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  chapterId: 'general',
                  topic: `${selectedCurrSubject?.name} — Key Concepts`,
                }));
                setResult(null);
              }}
              className="mt-2.5 text-xs font-semibold text-[#2fa8cc] hover:text-[#1f4e79] underline underline-offset-2 cursor-pointer inline-block"
            >
              Not sure which chapter? → Study the full subject overview
            </button>
          )}
        </div>
      )}

      {/* ── STEP 5: Topic ──────────────────────────────────────────────────── */}
      {showTopics && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <StepLabel n={5} label="Pick or type a topic" done={hasTopic} />
            {availableTopics.length > 5 && (
              <div className="relative w-full sm:w-52">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Filter topics…"
                  value={topicSearch}
                  onChange={e => setTopicSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#e2e8f0] bg-white text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-none"
                  aria-label="Search topics"
                />
              </div>
            )}
          </div>

          {/* Chapter topics */}
          {filteredTopics.length > 0 && (
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5a6b7b] block mb-1.5">
                Topics in {selectedChapter?.name}:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {filteredTopics.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={state.topic === t && !customTopic.trim()}
                    onClick={() => { update('topic', t); setCustomTopic(''); }}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[36px]
                      ${state.topic === t && !customTopic.trim()
                        ? 'bg-[#1f4e79] text-white border-[#1f4e79]'
                        : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:border-[#2fa8cc] hover:bg-[#e8f6fa]'
                      }
                    `}
                  >
                    {state.topic === t && !customTopic.trim() && <span className="mr-1">✓</span>}
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fallback sample topics */}
          {!selectedChapter && sampleTopics.length > 0 && (
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5a6b7b] block mb-1.5">
                Popular topics for Class {state.classLevel}:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {sampleTopics.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={state.topic === t && !customTopic.trim()}
                    onClick={() => { update('topic', t); setCustomTopic(''); }}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[36px]
                      ${state.topic === t && !customTopic.trim()
                        ? 'bg-[#1f4e79] text-white border-[#1f4e79]'
                        : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:border-[#2fa8cc] hover:bg-[#e8f6fa]'
                      }
                    `}
                  >
                    {state.topic === t && !customTopic.trim() && <span className="mr-1">✓</span>}
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom topic input */}
          <div className="space-y-1">
            <label htmlFor="custom-topic" className="text-[10px] font-bold uppercase tracking-wider text-[#5a6b7b]">
              Or type a specific question / concept:
            </label>
            <input
              id="custom-topic"
              type="text"
              value={customTopic}
              onChange={e => {
                setCustomTopic(e.target.value);
                if (e.target.value.trim()) update('topic', '');
                setResult(null);
              }}
              placeholder="e.g. Ohm's Law formula derivation, Photosynthesis light reaction…"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-white text-xs sm:text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      {/* ── STEP 6: Capability + Sub-capability ─────────────────────────── */}
      {showGoal && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-200">
          <StepLabel n={6} label="What do you want AI to help you do?" done={hasGoal} />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-3">
            {CAPABILITY_CATEGORIES.map(cat => {
              const sel = state.capabilityId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={sel}
                  aria-expanded={sel}
                  onClick={() => selectCapability(cat.id)}
                  className={`
                    p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer min-h-[50px]
                    focus-visible:outline-2 focus-visible:outline-[#2fa8cc] focus-visible:outline-offset-2
                    ${sel
                      ? `${cat.colorBg} ${cat.colorBorder} border-2 shadow-sm`
                      : 'bg-[#fafbfc] border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:bg-[#f0f7fc]'
                    }
                  `}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2 ${
                    sel ? 'bg-white shadow-xs' : 'bg-[#eef2f6] text-[#1f4e79]'
                  }`}>
                    <StudyIcon name={cat.id} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sel ? cat.colorText : 'text-[#1f4e79]'}`} />
                  </div>
                  <span className={`text-xs sm:text-sm font-bold font-display block ${sel ? cat.colorText : 'text-[#1a1a1a]'}`}>
                    {cat.label}
                  </span>
                  <span className={`text-[10px] sm:text-[11px] leading-snug mt-0.5 block line-clamp-1 sm:line-clamp-none ${sel ? cat.colorText + ' opacity-75' : 'text-[#5a6b7b]'}`}>
                    {cat.tagline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-capabilities — revealed when category selected */}
          {selectedCap && (
            <div className={`${selectedCap.colorBg} rounded-xl p-3 sm:p-3.5 space-y-2 animate-in fade-in duration-150 border ${selectedCap.colorBorder}`}>
              <div className="flex items-center gap-1.5">
                <StudyIcon name={selectedCap.id} className={`w-3.5 h-3.5 ${selectedCap.colorText}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedCap.colorText}`}>
                  Choose a specific output:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedCap.subs.map(sub => {
                  const sel = state.subCapabilityId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => selectSubCapability(sub)}
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold
                        border transition-all cursor-pointer min-h-[40px]
                        ${sel
                          ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-sm'
                          : 'bg-white border-[#e2e8f0] text-[#1a1a1a] hover:border-[#1f4e79] hover:bg-white/80'
                        }
                      `}
                    >
                      <StudyIcon name={sub.id} className="w-3.5 h-3.5" />
                      {sub.label}
                      {sel && <Check className="w-3 h-3" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              {selectedSubCap?.taskHint && (
                <p className={`text-[11px] sm:text-xs leading-relaxed italic ${selectedCap.colorText} opacity-80 pt-0.5`}>
                  💡 {selectedSubCap.taskHint}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── STEP 7: Style (optional, progressive) ────────────────────────── */}
      {showStyleAndGenerate && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <StepLabel n={7} label="Style (optional)" done={false} />
            <button
              type="button"
              onClick={() => setShowStyleOptions(v => !v)}
              className="text-xs font-semibold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1 cursor-pointer"
              aria-expanded={showStyleOptions}
            >
              {showStyleOptions ? 'Hide' : 'Customise'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showStyleOptions ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
            <span className="text-xs text-[#5a6b7b] hidden sm:inline">Explanation style:</span>
            {(showStyleOptions ? EXPLANATION_STYLES : EXPLANATION_STYLES.slice(0, 3)).map(st => (
              <button
                key={st.id}
                type="button"
                aria-pressed={state.styleId === st.id}
                onClick={() => update('styleId', st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[36px] ${
                  state.styleId === st.id
                    ? 'bg-[#2fa8cc] text-white border-[#2fa8cc]'
                    : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {showStyleOptions && (
            <label htmlFor="exam-focus" className="mt-2.5 flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1f4e79]">
              <input
                id="exam-focus"
                type="checkbox"
                checked={state.examFocus}
                onChange={e => update('examFocus', e.target.checked)}
                className="w-4 h-4 accent-[#ff6b00] rounded"
              />
              🎯 Add board exam &amp; scoring focus (Class 10)
            </label>
          )}
        </div>
      )}

      {/* ── PROMPT PREVIEW (compact preview before generate) ────────────── */}
      {showPromptPreview && !result && (
        <div className="animate-in fade-in duration-200">
          <PromptPreview state={state} customTopic={customTopic} />
        </div>
      )}

      {/* ── PRIVACY WARNING ──────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong>🔒 Stay safe:</strong> Never share your real name, phone number, address, passwords, or private photos in any AI tool.
        </p>
      </div>

      {/* ── GENERATE BUTTON (sticky) ─────────────────────────────────────── */}
      <div className="sticky bottom-3 sm:bottom-4 z-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!isReady}
            className={`
              flex-1 py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-lg min-h-[48px]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b00]
              ${isReady
                ? 'bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40'
                : 'bg-[#e2e8f0] text-[#5a6b7b] cursor-not-allowed'
              }
            `}
            aria-disabled={!isReady}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span>
              {!hasSubject ? 'Pick a subject first' :
               !hasTopic ? 'Pick or type a topic' :
               !hasGoal ? 'Pick what AI should do' :
               '✨ Generate My Study Prompt'}
            </span>
          </button>

          {(hasSubject || hasTopic || hasGoal) && (
            <button
              type="button"
              onClick={handleReset}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e2e8f0] text-[#5a6b7b] hover:text-[#1f4e79] hover:border-[#2fa8cc] transition-all cursor-pointer min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#2fa8cc]"
              aria-label="Reset all selections and start over"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {!isReady && (hasSubject || hasTopic) && (
          <p className="text-center text-[11px] text-[#5a6b7b] mt-1.5" aria-live="polite">
            {!hasTopic ? '→ Pick or type a topic above' : !hasGoal ? '→ Choose a goal (🧠 Understand, 🎨 Create, etc.)' : ''}
          </p>
        )}
      </div>

      {/* ── PROMPT RESULT ─────────────────────────────────────────────────── */}
      {result && (
        <div ref={resultRef} className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e2e8f0]" aria-hidden="true" />
            <span className="text-xs font-bold text-[#2fa8cc] uppercase tracking-wider px-3 py-1 rounded-full bg-[#e8f6fa]">
              ✨ Your AI Study Prompt
            </span>
            <div className="h-px flex-1 bg-[#e2e8f0]" aria-hidden="true" />
          </div>

          <PromptResultCard result={result} />

          {/* Mobile Sticky Quick Action Bar when prompt is ready */}
          <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex items-center gap-2 p-2 rounded-2xl bg-[#0d1f35]/95 backdrop-blur-md border border-white/20 shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
            <button
              type="button"
              onClick={handleStickyCopy}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                copiedSticky ? 'bg-emerald-600 text-white' : 'bg-[#ff6b00] text-white shadow-md'
              }`}
            >
              {copiedSticky ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSticky ? 'Copied!' : 'Copy Prompt'}</span>
            </button>
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleStickyCopy}
              className="flex-1 py-3 px-3 rounded-xl font-bold text-xs bg-white text-[#1f4e79] flex items-center justify-center gap-1.5 shadow-md"
            >
              <Bot className="w-3.5 h-3.5 text-[#2fa8cc]" />
              <span>Use in ChatGPT</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Step 3 — Verify CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1f35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2fa8cc]">Step 3: Check &amp; Verify</span>
              <p className="text-sm font-bold">Got your answer? Cross-check it.</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Always verify dates, facts, and formulas against your official textbook.
              </p>
            </div>
            <Link
              href="/verify"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#ff6b00] hover:bg-orange-600 text-white text-xs sm:text-sm font-bold transition-all min-h-[44px]"
            >
              <span>Check Before You Trust AI →</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
