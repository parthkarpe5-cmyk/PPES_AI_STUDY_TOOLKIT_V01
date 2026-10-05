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
  HelpCircle,
  RotateCcw,
  Check,
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Step 2: Ask with Precision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Guided Study Prompt Builder
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Select your class, subject, and learning goal. We will construct a high-yield, pedagogy-grounded prompt ready to paste into your AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Form Inputs (7 cols on Desktop) */}
        <div className="lg:col-span-6 space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Study Details</span>
              <span className="text-xs text-slate-400 font-normal">(No technical jargon needed)</span>
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors"
              title="Reset form to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* 1. Class Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
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
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-600/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
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
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium'
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
              <label htmlFor="topic-input" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              />

              {/* Sample Topic Chips */}
              {sampleTopics.length > 0 && (
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
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
                            ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200'
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
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
                          ? 'bg-indigo-50 border-indigo-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base shrink-0">{g.icon}</span>
                      <div className="min-w-0">
                        <span className={`text-xs font-bold block truncate ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                          {g.label}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
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
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Exam Focus Toggle & Optional note */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎯</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">
                      Exam & Scoring Focus
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Includes common marking traps, full-mark keywords, and exam weightage
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={examFocus}
                  onChange={(e) => setExamFocus(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500"
                />
              </label>

              {/* Optional focus notes */}
              <div>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Optional: Specific doubt or formula (e.g. Ohm's law graph, numericals only)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
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

            {/* Submit Button */}
            <button
              type="submit"
              id="generate-prompt-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
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
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">
                Ready to Generate
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Fill in the study details on the left and click &ldquo;Generate My High-Yield Prompt&rdquo;.
              </p>
            </div>
          )}

          {/* Quick Learning Tip */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <span>💡</span> Prompting Philosophy:
            </span>
            <p className="text-indigo-800 leading-relaxed">
              Never ask AI to simply do your homework. Giving it clear constraints (such as asking for steps, analogies, and quizzes) turns the AI into a 24/7 personal tutor.
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
          <div className="animate-pulse text-indigo-600 font-semibold">
            Loading Prompt Builder...
          </div>
        </div>
      }
    >
      <PromptBuilderContent />
    </Suspense>
  );
}
