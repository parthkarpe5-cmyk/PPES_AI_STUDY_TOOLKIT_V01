'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, ShieldAlert, Sparkles, BookOpen, Search, Brain, HelpCircle, UserCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface CheckItem {
  id: string;
  stepNumber: number;
  icon: string;
  lucideIcon: React.ElementType;
  title: string;
  coreQuestion: string;
  explanation: string;
  schoolExample: string;
  actionTip: string;
}

const VERIFICATION_STEPS: CheckItem[] = [
  {
    id: 'compare',
    stepNumber: 1,
    icon: '📖',
    lucideIcon: BookOpen,
    title: '1. Compare with Your Textbook',
    coreQuestion: 'Does the answer match your NCERT / State Board textbook or trusted source?',
    explanation: 'AI models are trained on global internet data, which may use conventions, units, or definitions that differ from your specific board syllabus (e.g. CBSE / State Board).',
    schoolExample: 'Example: An AI might use the American symbol for acceleration or define a term with college-level nuances not recognized in Class 10 board answer keys.',
    actionTip: 'Open your chapter index or reference notes. Ensure key definitions use the standard keywords expected by board examiners.'
  },
  {
    id: 'verify',
    stepNumber: 2,
    icon: '🔍',
    lucideIcon: Search,
    title: '2. Verify Facts, Formulas & Dates',
    coreQuestion: 'Have you checked specific dates, formulas, numbers, and scientific units?',
    explanation: 'AI can suffer from "hallucination"—generating plausible-sounding but completely incorrect numbers, historical treaty years, or chemical valencies.',
    schoolExample: 'Example: AI might write $P = V/I$ instead of $P = V \\times I$ or swap the year of the Treaty of Vienna.',
    actionTip: 'Never copy numerical constants, trigonometric identities, or historical years without double-checking them in your notebook.'
  },
  {
    id: 'understand',
    stepNumber: 3,
    icon: '🧠',
    lucideIcon: Brain,
    title: '3. Understand & Explain in Your Own Words',
    coreQuestion: 'Can you explain this concept to a classmate without looking at the screen?',
    explanation: 'If you only copy an AI explanation without understanding the underlying logic, you will struggle during unexpected oral questions, practicals, or exams.',
    schoolExample: 'Example: You copied an explanation of Faraday’s Law, but if asked why the needle deflects, you cannot explain it.',
    actionTip: 'Close the AI window and write a 2-line summary in your rough notebook. If you get stuck, re-read the explanation.'
  },
  {
    id: 'question',
    stepNumber: 4,
    icon: '⚠️',
    lucideIcon: AlertTriangle,
    title: '4. Question Contradictions & Assumptions',
    coreQuestion: 'Does anything look suspicious, contradictory, or unnecessarily complex?',
    explanation: 'AI often tries to give an answer even if the question is flawed or ambiguous. It might make unstated assumptions without alerting you.',
    schoolExample: 'Example: Asking AI for the magnetic field inside a solenoid and receiving an answer assuming an infinite solenoid with relativistic terms.',
    actionTip: 'If a step in a math or physics solution jumps mysteriously or feels like magic, ask: "Why did you use that step?".'
  },
  {
    id: 'ask',
    stepNumber: 5,
    icon: '👨‍🏫',
    lucideIcon: UserCheck,
    title: '5. Ask Your Teacher or Peers',
    coreQuestion: 'If you are still in doubt, have you noted it down to ask your teacher?',
    explanation: 'Your classroom teacher knows your syllabus, marking scheme, and school requirements best. AI is an assistant, not a replacement for your teacher.',
    schoolExample: 'Example: When two different AI tools give slightly different answers on an ambiguous diagram question, ask your subject teacher.',
    actionTip: 'Keep a small "Doubt Diary" to ask your teacher during revision sessions or doubt classes.'
  }
];

export function VerificationChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const checkAll = () => {
    if (checkedIds.length === VERIFICATION_STEPS.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(VERIFICATION_STEPS.map((s) => s.id));
    }
  };

  const progress = Math.round((checkedIds.length / VERIFICATION_STEPS.length) * 100);

  return (
    <div className="space-y-8">
      {/* Interactive Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Interactive Verification Checklist</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                {checkedIds.length} / {VERIFICATION_STEPS.length} Completed
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice reviewing an AI answer you received before writing it in your notebook.
            </p>
          </div>

          <button
            type="button"
            onClick={checkAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            {checkedIds.length === VERIFICATION_STEPS.length ? 'Reset Checklist' : 'Select All 5 Steps'}
          </button>
        </div>

        {/* Progress meter */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {progress === 100 && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Excellent habit! You are using AI as an active study partner, not an answer generator.</span>
          </div>
        )}
      </div>

      {/* 5 Step Cards */}
      <div className="space-y-4">
        {VERIFICATION_STEPS.map((step) => {
          const isChecked = checkedIds.includes(step.id);
          const Icon = step.lucideIcon;

          return (
            <div
              key={step.id}
              onClick={() => toggleCheck(step.id)}
              className={`cursor-pointer rounded-2xl border transition-all duration-200 p-5 sm:p-6 ${
                isChecked
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCheck(step.id);
                  }}
                  className="mt-0.5 text-slate-400 hover:text-indigo-600 focus:outline-hidden"
                  aria-label={`Toggle ${step.title}`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-300" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className={`text-base font-bold ${isChecked ? 'text-emerald-950 line-through decoration-emerald-500/50' : 'text-slate-900'}`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm font-semibold text-indigo-900 bg-indigo-50/80 p-2.5 rounded-lg border border-indigo-100/80">
                    ❓ {step.coreQuestion}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.explanation}
                  </p>

                  {/* School Example & Action Tip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="font-semibold text-slate-700 block mb-1">
                        🏫 Classroom Example:
                      </span>
                      <span className="text-slate-600">{step.schoolExample}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/80">
                      <span className="font-semibold text-amber-900 block mb-1">
                        💡 Student Action Tip:
                      </span>
                      <span className="text-amber-800">{step.actionTip}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Educational Callout */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-md text-center space-y-3">
        <span className="text-2xl">🌱</span>
        <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-white max-w-2xl mx-auto">
          &ldquo;AI should help you learn — not replace your thinking.&rdquo;
        </blockquote>
        <p className="text-xs text-indigo-200 max-w-xl mx-auto leading-relaxed">
          The best students use AI to test their understanding, ask questions, and explore ideas—then verify everything using their own intellect and textbook.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/prompt-builder"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-sm transition-all active:scale-95"
          >
            Build a Verified Prompt Now →
          </Link>
          <Link
            href="/which-ai"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-semibold text-xs text-white border border-white/20 transition-all"
          >
            Explore AI Capabilities →
          </Link>
        </div>
      </div>
    </div>
  );
}
