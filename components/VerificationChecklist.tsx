'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, Sparkles, BookOpen, Search, Brain, AlertTriangle, UserCheck, ArrowRight } from 'lucide-react';
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
    schoolExample: 'Example: AI might write P = V/I instead of P = V × I or swap the year of the Treaty of Vienna.',
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
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-bold text-[#1f4e79] font-display flex items-center gap-2">
              <span>Interactive Verification Checklist</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2fa8cc]/15 text-[#1f4e79] font-bold border border-[#2fa8cc]/30">
                {checkedIds.length} / {VERIFICATION_STEPS.length} Completed
              </span>
            </h2>
            <p className="text-xs text-[#5a6b7b] mt-0.5">
              Practice reviewing an AI answer you received before writing it in your notebook.
            </p>
          </div>

          <button
            type="button"
            onClick={checkAll}
            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-[#e2e8f0] bg-[#fafbfc] hover:bg-[#e8f6fa] text-[#1f4e79] transition-colors cursor-pointer"
          >
            {checkedIds.length === VERIFICATION_STEPS.length ? 'Reset Checklist' : 'Select All 5 Steps'}
          </button>
        </div>

        {/* Progress meter */}
        <div className="w-full h-2.5 bg-[#f5f8fa] border border-[#e2e8f0] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              progress === 100
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-[#2fa8cc] to-[#1f4e79]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {progress === 100 && (
          <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Excellent habit! You are using AI as an active study mentor, not an answer generator.</span>
          </div>
        )}
      </div>

      {/* 5 Step Cards */}
      <div className="space-y-4">
        {VERIFICATION_STEPS.map((step) => {
          const isChecked = checkedIds.includes(step.id);

          return (
            <div
              key={step.id}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleCheck(step.id);
                }
              }}
              onClick={() => toggleCheck(step.id)}
              className={`cursor-pointer rounded-2xl border transition-all duration-200 p-5 sm:p-6 focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc] select-none ${
                isChecked
                  ? 'bg-[#e8f6fa]/60 border-[#2fa8cc] shadow-xs'
                  : 'bg-white border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Visual Checkbox Indicator (Non-nested) */}
                <span className="mt-0.5 text-slate-400" aria-hidden="true">
                  {isChecked ? (
                    <CheckSquare className="w-6 h-6 text-[#2fa8cc]" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-300" />
                  )}
                </span>

                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className={`text-base font-bold font-display ${isChecked ? 'text-[#1f4e79] line-through decoration-[#2fa8cc]/60' : 'text-[#1f4e79]'}`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm font-semibold text-[#1f4e79] bg-[#fafbfc] p-3 rounded-xl border border-[#e2e8f0]">
                    ❓ {step.coreQuestion}
                  </p>

                  <p className="text-xs text-[#5a6b7b] leading-relaxed">
                    {step.explanation}
                  </p>

                  {/* School Example & Action Tip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#fafbfc] border border-[#e2e8f0]">
                      <span className="font-bold text-[#1f4e79] block mb-1">
                        🏫 Classroom Example:
                      </span>
                      <span className="text-[#5a6b7b] leading-relaxed">{step.schoolExample}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#fff8ea] border border-[#c9a227]/30">
                      <span className="font-bold text-amber-950 block mb-1">
                        💡 Student Action Tip:
                      </span>
                      <span className="text-amber-900 leading-relaxed">{step.actionTip}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Educational Callout — PPES Navy Container */}
      <div className="rounded-2xl bg-[#0d1f35] p-7 sm:p-10 text-white shadow-xl text-center space-y-4 border border-white/10">
        <span className="text-3xl">🌱</span>
        <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-white max-w-2xl mx-auto font-display">
          &ldquo;Syllabus remained the same, learning pattern changed.&rdquo;
        </blockquote>
        <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
          The best students use AI to test their understanding, ask clarifying questions, and explore ideas—then verify everything using their own intellect and official textbook.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/prompt-builder"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 font-bold text-xs sm:text-sm text-white shadow-lg shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Build a Verified Prompt Now →</span>
          </Link>
          <Link
            href="/which-ai"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 font-semibold text-xs sm:text-sm text-white border border-white/20 transition-all"
          >
            <span>Explore AI Capabilities</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
