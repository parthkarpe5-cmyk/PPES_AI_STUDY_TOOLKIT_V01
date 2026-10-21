'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  RotateCcw,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Check,
  Copy,
  ExternalLink,
  Bot,
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { CLASS_LEVELS } from '@/data/subjects';
import { getStoredProfile, saveStoredProfile } from '@/lib/study-profile';
import type { ClassLevel, BoardType } from '@/lib/study-profile';
import { getCurriculumSubjects } from '@/data/curriculum';
import {
  EXPLANATION_STYLES,
  SOLVE_APPROACHES,
  type SolveApproach
} from '@/data/prompt-templates';
import { CAPABILITY_CATEGORIES } from '@/data/capabilities';
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
  customTopic: string;
  pastedSyllabus: string;
  goalId: string;
  solveApproach: SolveApproach;
  styleId: string;
  examFocus: boolean;
}

const BOARDS: { id: BoardType; label: string; emoji: string }[] = [
  { id: 'cbse', label: 'CBSE', emoji: '🇮🇳' },
  { id: 'icse', label: 'ICSE', emoji: '📘' },
  { id: 'state', label: 'State Board', emoji: '🏫' },
  { id: 'other', label: 'My Syllabus', emoji: '📄' },
];

// Four primary study goals required by V2 specification
const PRIMARY_GOALS: { id: string; label: string; icon: string; description: string }[] = [
  {
    id: 'understand-topic',
    label: 'Understand it',
    icon: '💡',
    description: 'Break down principles with intuitive analogies and clear concepts.'
  },
  {
    id: 'practice-questions',
    label: 'Practise questions',
    icon: '❓',
    description: 'Test your understanding. Answers withheld until you attempt.'
  },
  {
    id: 'revise',
    label: 'Revise',
    icon: '🔄',
    description: 'Fast active recall of formulas, key definitions, and differences.'
  },
  {
    id: 'solve-problem',
    label: 'Help me solve',
    icon: '🧩',
    description: 'Work through problems with hints first or step-by-step guidance.'
  }
];

// ─── Reusable Chip ────────────────────────────────────────────────────────────

function Chip({
  selected,
  onClick,
  children,
  id,
  disabled
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

// ─── Step Header ─────────────────────────────────────────────────────────────

function StepLabel({ n, label, done }: { n: number; label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-2 sm:mb-3">
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
          done ? 'bg-[#2fa8cc] text-white' : 'bg-[#e2e8f0] text-[#5a6b7b]'
        }`}
      >
        {done ? <Check className="w-3.5 h-3.5" /> : n}
      </span>
      <span className="text-xs sm:text-sm font-bold text-[#1f4e79] uppercase tracking-wider font-display">
        {label}
      </span>
    </div>
  );
}

// ─── Mobile Step Indicator ───────────────────────────────────────────────────

function MobileStepIndicator({
  currentStep,
  totalSteps = 5,
  label
}: {
  currentStep: number;
  totalSteps?: number;
  label: string;
}) {
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

// ─── Main Canonical Builder Component ────────────────────────────────────────

interface SinglePageBuilderProps {
  initialCapabilityId?: string;
  initialSubCapabilityId?: string;
  initialGoalId?: string;
}

export function SinglePageBuilder({
  initialCapabilityId,
  initialSubCapabilityId,
  initialGoalId
}: SinglePageBuilderProps) {
  const resultRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<BuilderState>(() => {
    const profile = typeof window !== 'undefined'
      ? getStoredProfile()
      : { classLevel: '10' as ClassLevel, board: 'cbse' as BoardType };

    // Resolve initial goal if passed
    let initGoal = initialGoalId || 'understand-topic';
    if (!initialGoalId && initialCapabilityId) {
      const cat = CAPABILITY_CATEGORIES.find(c => c.id === initialCapabilityId);
      const sub = cat && initialSubCapabilityId ? cat.subs.find(s => s.id === initialSubCapabilityId) : undefined;
      initGoal = sub?.goalId || cat?.defaultGoalId || 'understand-topic';
    }

    return {
      classLevel: profile.classLevel || '10',
      board: profile.board || 'cbse',
      subjectId: '',
      chapterId: '',
      topic: '',
      customTopic: '',
      pastedSyllabus: '',
      goalId: initGoal,
      solveApproach: 'hints-first',
      styleId: 'simple',
      examFocus: true
    };
  });

  const [chapterSearch, setChapterSearch] = useState('');
  const [topicSearch, setTopicSearch] = useState('');
  const [showPastedSyllabus, setShowPastedSyllabus] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [result, setResult] = useState<GeneratedPromptResult | null>(null);
  const [copiedSticky, setCopiedSticky] = useState(false);

  // Sync when initial props change
  const currentCapKey = `${initialCapabilityId || ''}:${initialSubCapabilityId || ''}:${initialGoalId || ''}`;
  const [prevCapKey, setPrevCapKey] = useState(currentCapKey);

  if (currentCapKey !== prevCapKey) {
    setPrevCapKey(currentCapKey);
    let resolvedGoal = initialGoalId;
    if (!resolvedGoal && initialCapabilityId) {
      const cat = CAPABILITY_CATEGORIES.find(c => c.id === initialCapabilityId);
      const sub = cat && initialSubCapabilityId ? cat.subs.find(s => s.id === initialSubCapabilityId) : undefined;
      resolvedGoal = sub?.goalId || cat?.defaultGoalId;
    }
    if (resolvedGoal) {
      setState(prev => ({ ...prev, goalId: resolvedGoal! }));
      setResult(null);
    }
  }

  // Sync profile when updated from modal
  useEffect(() => {
    const handleProfileChange = () => {
      const p = getStoredProfile();
      setState(prev => ({
        ...prev,
        classLevel: p.classLevel,
        board: p.board,
        pastedSyllabus: p.pastedSyllabusText || prev.pastedSyllabus
      }));
    };
    window.addEventListener('ppptk_profile_changed', handleProfileChange);
    return () => window.removeEventListener('ppptk_profile_changed', handleProfileChange);
  }, []);

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
  const hasSubject = Boolean(state.subjectId);
  const hasTopic = Boolean(state.topic || state.customTopic.trim());
  const hasGoal = Boolean(state.goalId);
  const isReady = Boolean(hasSubject && hasTopic && hasGoal);

  // Step numbering for mobile
  const currentStepNumber = !hasSubject ? 2 : !hasTopic ? 3 : !hasGoal ? 4 : 5;
  const currentStepLabel = !hasSubject ? 'Subject' : !hasTopic ? 'Topic' : !hasGoal ? 'Goal' : 'Generate';

  // Dependent field resets
  const handleClassChange = (newClass: ClassLevel) => {
    setState(prev => ({
      ...prev,
      classLevel: newClass,
      subjectId: '',
      chapterId: '',
      topic: '',
      customTopic: ''
    }));
    setResult(null);
  };

  const handleBoardChange = (newBoard: BoardType) => {
    setState(prev => ({
      ...prev,
      board: newBoard,
      subjectId: '',
      chapterId: '',
      topic: '',
      customTopic: ''
    }));
    setResult(null);
  };

  const handleSubjectChange = (newSubId: string) => {
    setState(prev => ({
      ...prev,
      subjectId: newSubId,
      chapterId: '',
      topic: '',
      customTopic: ''
    }));
    setResult(null);
  };

  const handleGoalSelect = (goalId: string) => {
    setState(prev => ({ ...prev, goalId }));
    setResult(null);
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      subjectId: '',
      chapterId: '',
      topic: '',
      customTopic: '',
      pastedSyllabus: '',
      goalId: 'understand-topic',
      solveApproach: 'hints-first',
      styleId: 'simple',
      examFocus: true
    }));
    setChapterSearch('');
    setTopicSearch('');
    setShowPastedSyllabus(false);
    setShowMoreOptions(false);
    setResult(null);
  };

  const handleGenerate = () => {
    const finalTopic = state.customTopic.trim() || state.topic;
    if (!finalTopic || !state.subjectId || !state.goalId) return;

    const chapterName = selectedChapter ? selectedChapter.name : undefined;

    const generated = generateStudyPrompt({
      classLevel: state.classLevel,
      board: state.board,
      subjectId: state.subjectId,
      topic: finalTopic,
      chapterName,
      goalId: state.goalId,
      solveApproach: state.solveApproach,
      pastedSyllabus: state.pastedSyllabus,
      styleId: state.styleId,
      examFocus: state.examFocus
    });

    saveStoredProfile({ classLevel: state.classLevel, board: state.board });
    setResult(generated);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStickyCopy = async () => {
    if (!result) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(result.fullPrompt);
        setCopiedSticky(true);
        setTimeout(() => setCopiedSticky(false), 2500);
      }
    } catch {
      setCopiedSticky(true);
      setTimeout(() => setCopiedSticky(false), 2500);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ── MOBILE PROGRESS INDICATOR ──────────────────────────────────────── */}
      <MobileStepIndicator currentStep={currentStepNumber} label={currentStepLabel} />

      {/* ── STEP 1: CLASS AND BOARD ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Class selection */}
          <div>
            <StepLabel n={1} label="Class" done={Boolean(state.classLevel)} />
            <div className="flex flex-wrap gap-2">
              {CLASS_LEVELS.map(cl => (
                <Chip
                  key={cl.value}
                  id={`class-${cl.value}`}
                  selected={state.classLevel === cl.value}
                  onClick={() => handleClassChange(cl.value as ClassLevel)}
                >
                  {cl.label}
                </Chip>
              ))}
              <div
                id="class-11-coming-soon"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-dashed border-[#c9a227]/70 bg-[#fffdf5] text-[#7a5b0b] cursor-not-allowed select-none min-h-[44px]"
                title="Class 11 syllabus support is coming in a future release"
                aria-disabled="true"
              >
                <span>Class 11</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#c9a227]/20 text-[#7a5b0b]">
                  Soon
                </span>
              </div>
              <div
                id="class-12-coming-soon"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-dashed border-[#c9a227]/70 bg-[#fffdf5] text-[#7a5b0b] cursor-not-allowed select-none min-h-[44px]"
                title="Class 12 syllabus support is coming in a future release"
                aria-disabled="true"
              >
                <span>Class 12</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#c9a227]/20 text-[#7a5b0b]">
                  Soon
                </span>
              </div>
            </div>
          </div>

          {/* Board selection */}
          <div>
            <StepLabel n={1} label="Board" done={Boolean(state.board)} />
            <div className="flex flex-wrap gap-2">
              {BOARDS.map(b => (
                <Chip
                  key={b.id}
                  id={`board-${b.id}`}
                  selected={state.board === b.id}
                  onClick={() => handleBoardChange(b.id)}
                >
                  <span aria-hidden="true">{b.emoji}</span>
                  {b.label}
                </Chip>
              ))}
            </div>

            {/* Board transparent curriculum note */}
            {state.board === 'icse' && (
              <p className="text-[11px] text-[#5a6b7b] mt-2 italic">
                📘 Showing NCERT benchmark curriculum reference for Class {state.classLevel}. You can also type your custom chapter or paste syllabus text below.
              </p>
            )}
            {state.board === 'state' && (
              <p className="text-[11px] text-[#5a6b7b] mt-2 italic">
                🏫 Showing NCERT benchmark curriculum reference. You can pick any chapter below or enter your exact state textbook topic.
              </p>
            )}
            {state.board === 'other' && (
              <p className="text-[11px] text-[#5a6b7b] mt-2 italic">
                📄 Using custom syllabus mode. Pick a core subject below and paste your exact chapter or topic text.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── STEP 2: SUBJECT ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs">
        <StepLabel n={2} label="Subject" done={hasSubject} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {currSubjects.map(sub => {
            const isSelected = state.subjectId === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSubjectChange(sub.id)}
                className={`
                  p-3 sm:p-3.5 rounded-xl border text-center flex flex-col items-center gap-2
                  transition-all duration-150 cursor-pointer min-h-[48px] focus-visible:outline-2
                  focus-visible:outline-[#2fa8cc] focus-visible:outline-offset-2
                  ${isSelected
                    ? 'bg-[#e8f6fa] border-[#2fa8cc] ring-2 ring-[#2fa8cc]/25 shadow-xs'
                    : 'bg-[#fafbfc] border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:bg-[#e8f6fa]/40'
                  }
                `}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-white text-[#1f4e79] shadow-xs' : 'bg-[#eef2f6] text-[#5a6b7b]'
                  }`}
                >
                  <StudyIcon name={sub.id} className="w-4 h-4" />
                </div>
                <span
                  className={`text-xs font-bold font-display leading-tight ${
                    isSelected ? 'text-[#1f4e79]' : 'text-[#1a1a1a]'
                  }`}
                >
                  {sub.name}
                </span>
                {isSelected && <Check className="w-3 h-3 text-[#2fa8cc]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 3: CHAPTER OR CUSTOM TOPIC (Revealed after subject) ────────── */}
      {hasSubject && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <StepLabel
              n={3}
              label={`${selectedCurrSubject?.name || 'Subject'} — Chapter or Topic`}
              done={hasTopic}
            />
            {filteredChapters.length > 4 && (
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Filter chapters…"
                  value={chapterSearch}
                  onChange={e => setChapterSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#e2e8f0] bg-white text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-hidden"
                  aria-label="Filter chapters"
                />
              </div>
            )}
          </div>

          {/* Chapter selector */}
          {filteredChapters.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a6b7b] block mb-2">
                1. Select Chapter:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {filteredChapters.map(ch => {
                  const isSelected = state.chapterId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setState(prev => ({
                          ...prev,
                          chapterId: ch.id,
                          topic: ch.topics[0] || ch.name,
                          customTopic: ''
                        }));
                        setResult(null);
                      }}
                      className={`
                        px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between gap-2
                        transition-all cursor-pointer text-xs sm:text-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#2fa8cc]
                        ${isSelected
                          ? 'bg-[#e8f6fa] border-[#2fa8cc] text-[#1f4e79] font-bold'
                          : 'border-[#e2e8f0] bg-[#fafbfc] text-[#1a1a1a] hover:border-[#2fa8cc]/50 hover:bg-[#e8f6fa]/30'
                        }
                      `}
                    >
                      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                        <span className={`text-[10px] font-bold shrink-0 ${isSelected ? 'text-[#2fa8cc]' : 'text-[#5a6b7b]'}`}>
                          {ch.chapterNumber}.
                        </span>
                        <span className="font-semibold leading-snug line-clamp-1">{ch.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#2fa8cc] shrink-0" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Specific Topic Chips */}
          {filteredTopics.length > 0 && (
            <div className="pt-2 border-t border-[#f0f4f8]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a6b7b] block mb-2">
                2. Sub-topics in {selectedChapter?.name}:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {filteredTopics.map((t, idx) => {
                  const isSelected = state.topic === t && !state.customTopic.trim();
                  return (
                    <button
                      key={idx}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setState(prev => ({ ...prev, topic: t, customTopic: '' }));
                        setResult(null);
                      }}
                      className={`
                        px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer min-h-[44px] flex items-center
                        focus-visible:outline-2 focus-visible:outline-[#2fa8cc]
                        ${isSelected
                          ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-xs'
                          : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:border-[#2fa8cc] hover:bg-[#e8f6fa]'
                        }
                      `}
                    >
                      {isSelected && <Check className="w-3 h-3 mr-1 text-white" />}
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom topic input */}
          <div className="space-y-1.5 pt-2 border-t border-[#f0f4f8]">
            <label htmlFor="custom-topic-input" className="text-xs font-bold text-[#1f4e79] flex items-center gap-1.5">
              <span>✍️</span>
              <span>Or type a specific doubt, question, or concept:</span>
            </label>
            <input
              id="custom-topic-input"
              type="text"
              value={state.customTopic}
              onChange={e => {
                setState(prev => ({
                  ...prev,
                  customTopic: e.target.value,
                  topic: e.target.value.trim() ? '' : prev.topic
                }));
                setResult(null);
              }}
              placeholder="e.g. Balancing redox equations, Fleming's left hand rule, Quadratic formula derivation…"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-white text-xs sm:text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-hidden"
            />
            {state.customTopic.trim() && (
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ Using your custom topic: &ldquo;{state.customTopic.trim()}&rdquo;
              </p>
            )}
          </div>

          {/* Optional: Paste syllabus or chapter text */}
          <div className="pt-2 border-t border-[#f0f4f8]">
            <button
              type="button"
              onClick={() => setShowPastedSyllabus(v => !v)}
              className="text-xs font-bold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              aria-expanded={showPastedSyllabus}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showPastedSyllabus ? 'Hide pasted syllabus text' : '+ Optional: Paste syllabus or chapter text'}</span>
              {showPastedSyllabus ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showPastedSyllabus && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-[#fafbfc] border border-[#2fa8cc]/30 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs text-[#5a6b7b]">
                  <span className="font-semibold text-[#1f4e79]">Paste your syllabus bullet points:</span>
                  <span>{state.pastedSyllabus.length} characters</span>
                </div>
                <textarea
                  rows={4}
                  value={state.pastedSyllabus}
                  onChange={e => {
                    setState(prev => ({ ...prev, pastedSyllabus: e.target.value }));
                    setResult(null);
                  }}
                  placeholder="Paste excerpt from your textbook, school worksheet, or chapter syllabus here. This text will be included in the prompt as reference content for the external AI."
                  className="w-full p-2.5 rounded-lg border border-[#e2e8f0] bg-white text-xs font-mono text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-hidden"
                />
                <p className="text-[11px] text-[#5a6b7b] leading-relaxed">
                  ℹ️ <strong>How this works:</strong> This text is copied directly into the prompt as reference material to anchor the AI to your school&apos;s exact wording. It is stored only in your browser.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 4: LEARNING GOAL (Revealed after topic) ───────────────────── */}
      {hasTopic && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <StepLabel n={4} label="Learning Goal" done={hasGoal} />

          {/* 4 PRIMARY GOALS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRIMARY_GOALS.map(goal => {
              const isSelected = state.goalId === goal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`
                    p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer min-h-[52px]
                    focus-visible:outline-2 focus-visible:outline-[#2fa8cc]
                    ${isSelected
                      ? 'bg-[#e8f6fa] border-[#2fa8cc] ring-2 ring-[#2fa8cc]/30 shadow-xs'
                      : 'bg-[#fafbfc] border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:bg-[#e8f6fa]/30'
                    }
                  `}
                >
                  <span className="text-xl sm:text-2xl shrink-0 mt-0.5" aria-hidden="true">
                    {goal.icon}
                  </span>
                  <div className="space-y-0.5 min-w-0">
                    <span className={`text-sm font-bold block ${isSelected ? 'text-[#1f4e79]' : 'text-[#1a1a1a]'}`}>
                      {goal.label}
                    </span>
                    <span className="text-xs text-[#5a6b7b] leading-snug block">
                      {goal.description}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#2fa8cc] shrink-0 ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* If "Help me solve" selected: show 3 problem-solving options with Hints First default */}
          {state.goalId === 'solve-problem' && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#e8f6fa] border border-[#2fa8cc]/30 space-y-2.5 animate-in fade-in duration-150">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] block">
                Choose Problem Solving Approach:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SOLVE_APPROACHES.map(app => {
                  const isSelected = state.solveApproach === app.id;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setState(prev => ({ ...prev, solveApproach: app.id }));
                        setResult(null);
                      }}
                      className={`
                        p-2.5 rounded-lg border text-left transition-all cursor-pointer min-h-[44px]
                        ${isSelected
                          ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-xs'
                          : 'bg-white border-[#e2e8f0] text-[#1a1a1a] hover:border-[#2fa8cc]'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{app.label}</span>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-[10px] block mt-0.5 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#5a6b7b]'}`}>
                        {app.tagline}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── "MORE OPTIONS" ACCORDION ── */}
          <div className="pt-2 border-t border-[#f0f4f8]">
            <button
              type="button"
              onClick={() => setShowMoreOptions(v => !v)}
              className="text-xs font-bold text-[#1f4e79] hover:text-[#2fa8cc] flex items-center justify-between w-full py-2 cursor-pointer min-h-[44px]"
              aria-expanded={showMoreOptions}
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2fa8cc]" />
                <span>More options (creative tasks, coding, explanation style)</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMoreOptions ? 'rotate-180' : ''}`} />
            </button>

            {showMoreOptions && (
              <div className="space-y-4 pt-3 animate-in fade-in duration-150">
                {/* Advanced Goals: Creative & Presentations */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a6b7b] block">
                    Creative &amp; Visual Tasks:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      { id: 'create-poster', label: 'Poster layout', icon: '🖼️' },
                      { id: 'create-chart', label: 'Comparison chart', icon: '📊' },
                      { id: 'create-diagram', label: 'Diagram description', icon: '📐' },
                      { id: 'create-mindmap', label: 'Mind map', icon: '🗺️' },
                      { id: 'create-presentation', label: 'Presentation outline', icon: '🎤' }
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleGoalSelect(g.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5 ${
                          state.goalId === g.id
                            ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-xs'
                            : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa]'
                        }`}
                      >
                        <span>{g.icon}</span>
                        <span>{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Goals: Coding & Logic */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a6b7b] block">
                    Coding &amp; Practical Projects:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      { id: 'code', label: 'Write code', icon: '⌨️' },
                      { id: 'debug', label: 'Debug code', icon: '🐛' },
                      { id: 'explain-code', label: 'Explain code', icon: '📖' },
                      { id: 'project-idea', label: 'Science project idea', icon: '💡' },
                      { id: 'project-structure', label: 'Project roadmap', icon: '📁' }
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleGoalSelect(g.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5 ${
                          state.goalId === g.id
                            ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-xs'
                            : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa]'
                        }`}
                      >
                        <span>{g.icon}</span>
                        <span>{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanation Style Selector */}
                <div className="space-y-2 pt-2 border-t border-[#f0f4f8]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a6b7b] block">
                    Explanation Style:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {EXPLANATION_STYLES.map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setState(prev => ({ ...prev, styleId: st.id }));
                          setResult(null);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer min-h-[44px] ${
                          state.styleId === st.id
                            ? 'bg-[#2fa8cc] text-white border-[#2fa8cc] shadow-xs'
                            : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa]'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exam focus toggle */}
                <div className="pt-2 border-t border-[#f0f4f8]">
                  <label htmlFor="exam-focus-toggle" className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1f4e79] min-h-[44px]">
                    <input
                      id="exam-focus-toggle"
                      type="checkbox"
                      checked={state.examFocus}
                      onChange={e => {
                        setState(prev => ({ ...prev, examFocus: e.target.checked }));
                        setResult(null);
                      }}
                      className="w-4 h-4 accent-[#ff6b00] rounded"
                    />
                    <span>🎯 Include school term/board exam scoring focus</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PRIVACY NOTE ───────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#5a6b7b]">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong>Privacy reminder:</strong> This toolkit prepares your prompt locally in your browser. When you copy it into external AI tools, never share your real phone number, passwords, or home address.
        </p>
      </div>

      {/* ── PRIMARY ACTION: PREPARE STUDY PROMPT ─────────────────────────────── */}
      <div className="sticky bottom-3 sm:bottom-4 z-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!isReady}
            id="prepare-study-prompt-btn"
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
              {!hasSubject
                ? 'Select a subject first'
                : !hasTopic
                ? 'Pick or type a topic'
                : !hasGoal
                ? 'Choose your learning goal'
                : '✨ Prepare Study Prompt'}
            </span>
          </button>

          {(hasSubject || hasTopic) && (
            <button
              type="button"
              onClick={handleReset}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e2e8f0] text-[#5a6b7b] hover:text-[#1f4e79] hover:border-[#2fa8cc] transition-all cursor-pointer min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#2fa8cc]"
              aria-label="Reset all selections and start over"
              title="Reset selections"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {!isReady && (hasSubject || hasTopic) && (
          <p className="text-center text-[11px] text-[#5a6b7b] mt-1.5" aria-live="polite">
            {!hasTopic ? '→ Pick or type a topic in Step 3' : !hasGoal ? '→ Choose one of the 4 primary goals in Step 4' : ''}
          </p>
        )}
      </div>

      {/* ── PROMPT RESULT SCREEN ───────────────────────────────────────────── */}
      {result && (
        <div ref={resultRef} className="animate-in fade-in duration-300 space-y-4 pt-2 pb-24 sm:pb-0">
          <PromptResultCard result={result} />

          {/* Mobile Sticky Quick Action Bar when prompt is ready */}
          <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex items-center gap-2 p-2 rounded-2xl bg-[#0d1f35]/95 backdrop-blur-md border border-white/20 shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
            <button
              type="button"
              onClick={handleStickyCopy}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px] ${
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
              className="flex-1 py-3 px-3 rounded-xl font-bold text-xs bg-white text-[#1f4e79] flex items-center justify-center gap-1.5 shadow-md min-h-[44px]"
            >
              <Bot className="w-3.5 h-3.5 text-[#2fa8cc]" />
              <span>Paste in ChatGPT</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Verification CTA Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1f35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2fa8cc]">
                Step 3: Check &amp; Verify
              </span>
              <p className="text-sm font-bold">Got your answer? Cross-check it against your textbook.</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Remember: AI answers questions, but you must verify facts, formulas, and units.
              </p>
            </div>
            <Link
              href="/verify"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#ff6b00] hover:bg-orange-600 text-white text-xs sm:text-sm font-bold transition-all min-h-[44px]"
            >
              <span>View Verification Guide →</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
