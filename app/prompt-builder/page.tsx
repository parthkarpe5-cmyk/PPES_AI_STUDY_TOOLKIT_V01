'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SUBJECTS, CLASS_LEVELS } from '@/data/subjects';
import { STUDY_GOALS, EXPLANATION_STYLES } from '@/data/prompt-templates';
import { generateStudyPrompt, GeneratedPromptResult } from '@/lib/prompt-generator';
import { PromptResultCard } from '@/components/PromptResultCard';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Target,
  Layers,
  Wand2,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

function PromptBuilderContent() {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get('goal') || 'understand-topic';

  // Form State
  const [classLevel, setClassLevel] = useState<string>('10');
  const [subjectId, setSubjectId] = useState<string>('science');
  const [topic, setTopic] = useState<string>('Electricity');
  const [goalId, setGoalId] = useState<string>(initialGoal);
  const [styleId, setStyleId] = useState<string>('simple');
  const [examFocus, setExamFocus] = useState<boolean>(true);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Result state
  const [result, setResult] = useState<GeneratedPromptResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected subject helper
  const currentSubject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
  const sampleTopics =
    currentSubject.sampleTopicsByClass[classLevel as '8' | '9' | '10'] || [];

  // Generate prompt automatically on first load or when user clicks
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!topic.trim()) {
      setErrorMessage('Please enter what topic or chapter you want to study.');
      return;
    }

    setErrorMessage(null);
    const generated = generateStudyPrompt({
      classLevel,
      subjectId,
      topic,
      goalId,
      styleId,
      examFocus,
      additionalNotes
    });

    setResult(generated);
  };

  const handleTopicChipClick = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
    setErrorMessage(null);
    const generated = generateStudyPrompt({
      classLevel,
      subjectId,
      topic: suggestedTopic,
      goalId,
      styleId,
      examFocus,
      additionalNotes
    });
    setResult(generated);
  };

  const handleReset = () => {
    setClassLevel('10');
    setSubjectId('science');
    setTopic('Electricity');
    setGoalId('understand-topic');
    setStyleId('simple');
    setExamFocus(true);
    setAdditionalNotes('');
    setErrorMessage(null);

    const generated = generateStudyPrompt({
      classLevel: '10',
      subjectId: 'science',
      topic: 'Electricity',
      goalId: 'understand-topic',
      styleId: 'simple',
      examFocus: true
    });
    setResult(generated);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2fa8cc]/10 text-[#1f4e79] border border-[#2fa8cc]/30 text-xs font-bold uppercase tracking-wider">
          <Wand2 className="w-3.5 h-3.5 text-[#2fa8cc]" />
          <span>Step 2: Ask with Precision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1f4e79] tracking-tight font-display">
          Guided Study Prompt Builder
        </h1>
        <p className="text-sm sm:text-base text-[#5a6b7b] leading-relaxed">
          Select your class, subject, and learning goal. We will construct a high-yield, pedagogy-grounded prompt ready to paste into your AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Form Inputs (6 cols on Desktop) */}
        <div className="lg:col-span-6 space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <h2 className="text-base font-bold text-[#1f4e79] font-display flex items-center gap-2">
              <span>Study Details</span>
              <span className="text-xs text-[#5a6b7b] font-normal">(Curriculum-grounded)</span>
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#5a6b7b] hover:text-[#1f4e79] flex items-center gap-1 font-medium transition-colors"
              title="Reset form to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* 1. Class Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#2fa8cc]" />
                1. Select Your Class
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CLASS_LEVELS.map((c) => {
                  const isSelected = classLevel === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setClassLevel(c.value)}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all text-center ${
                        isSelected
                          ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-xs ring-2 ring-[#1f4e79]/20'
                          : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] hover:border-[#2fa8cc]/50'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Subject Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#2fa8cc]" />
                2. Select Subject
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUBJECTS.map((s) => {
                  const isSelected = subjectId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSubjectId(s.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#e8f6fa] border-[#2fa8cc] text-[#1f4e79] font-bold shadow-xs ring-1 ring-[#2fa8cc]'
                          : 'bg-[#fafbfc] border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa] hover:border-[#2fa8cc]/40 text-xs font-medium'
                      }`}
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-xs truncate">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Topic Input & Suggestions */}
            <div className="space-y-2">
              <label htmlFor="topic-input" className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#2fa8cc]" />
                3. Topic / Chapter Name
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="e.g. Electricity, French Revolution, Quadratic Equations..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-medium text-[#1a1a1a] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc] focus:border-[#2fa8cc] shadow-xs"
              />

              {/* Sample Topic Chips */}
              {sampleTopics.length > 0 && (
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-[#5a6b7b] block mb-1">
                    Quick suggestions for Class {classLevel} {currentSubject.name}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleTopics.slice(0, 5).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTopicChipClick(t)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                          topic === t
                            ? 'bg-[#1f4e79] text-white border-[#1f4e79] font-semibold shadow-xs'
                            : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] hover:text-[#1f4e79] hover:border-[#2fa8cc]/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Goal Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#2fa8cc]" />
                4. What is your Study Goal?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {STUDY_GOALS.map((g) => {
                  const isSelected = goalId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoalId(g.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-[#e8f6fa] border-[#2fa8cc] shadow-xs'
                          : 'bg-[#fafbfc] border-[#e2e8f0] hover:bg-[#e8f6fa]'
                      }`}
                    >
                      <span className="text-base shrink-0">{g.icon}</span>
                      <div className="min-w-0">
                        <span className={`text-xs font-bold block truncate ${isSelected ? 'text-[#1f4e79]' : 'text-[#1a1a1a]'}`}>
                          {g.label}
                        </span>
                        <span className="text-[10px] text-[#5a6b7b] line-clamp-1">
                          {g.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Explanation Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2fa8cc]" />
                5. Explanation Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EXPLANATION_STYLES.map((s) => {
                  const isSelected = styleId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyleId(s.id)}
                      className={`py-2 px-2.5 rounded-xl text-center border transition-all text-xs ${
                        isSelected
                          ? 'bg-[#2fa8cc] text-white border-[#2fa8cc] font-bold shadow-xs'
                          : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] font-medium'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Exam Focus Toggle & Optional note */}
            <div className="pt-2 border-t border-[#e2e8f0] space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#fafbfc] border border-[#e2e8f0] cursor-pointer hover:bg-[#e8f6fa]/60 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🎯</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1f4e79]">
                      Exam & Scoring Focus
                    </span>
                    <span className="text-[11px] text-[#5a6b7b]">
                      Includes common marking traps, full-mark keywords, and exam weightage
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={examFocus}
                  onChange={(e) => setExamFocus(e.target.checked)}
                  className="w-4 h-4 text-[#ff6b00] rounded-sm border-slate-300 focus:ring-[#ff6b00]"
                />
              </label>

              {/* Optional focus notes */}
              <div>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Optional: Specific doubt or formula (e.g. Ohm's law graph, numericals only)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2e8f0] bg-[#fafbfc] text-[#1a1a1a] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc]"
                />
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button with PPES Saffron Brand Gradient */}
            <button
              type="submit"
              id="generate-prompt-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 hover:shadow-lg shadow-md shadow-[#ff6b00]/25 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate My High-Yield Prompt</span>
            </button>
          </form>
        </div>

        {/* Right Output: Generated Prompt & Breakdown Card (6 cols on Desktop) */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            <PromptResultCard result={result} />
          ) : (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#1f4e79] font-display">
                Ready to Generate
              </h3>
              <p className="text-xs text-[#5a6b7b] max-w-sm mx-auto">
                Fill in the study details on the left and click &ldquo;Generate My High-Yield Prompt&rdquo;.
              </p>
            </div>
          )}

          {/* Quick Learning Tip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#e8f6fa]/70 border border-[#2fa8cc]/30 text-xs text-[#1f4e79] space-y-1.5">
            <span className="font-bold font-display flex items-center gap-1.5 text-sm text-[#1f4e79]">
              <span>💡</span> Prarambh Path Philosophy:
            </span>
            <p className="text-[#1f4e79]/90 leading-relaxed text-xs">
              Never ask AI to simply do your homework. Giving it clear constraints (such as asking for steps, analogies, and quizzes) turns the AI into a patient 24/7 personal tutor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromptBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <div className="animate-pulse text-[#2fa8cc] font-semibold">
            Loading Prompt Builder...
          </div>
        </div>
      }
    >
      <PromptBuilderContent />
    </Suspense>
  );
}
