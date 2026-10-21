'use client';

import React, { useState } from 'react';
import { BookOpen, Brain, UserCheck, Check, Info } from 'lucide-react';
import { THREE_VERIFICATION_STEPS_DATA } from '@/data/verification';

const STEP_ICONS: Record<string, { icon: string; lucideIcon: React.ElementType }> = {
  'check-textbook': { icon: '📖', lucideIcon: BookOpen },
  'explain-own-words': { icon: '🧠', lucideIcon: Brain },
  'ask-teacher': { icon: '👨‍🏫', lucideIcon: UserCheck }
};

export const THREE_VERIFICATION_STEPS = THREE_VERIFICATION_STEPS_DATA.map(step => ({
  ...step,
  icon: STEP_ICONS[step.id]?.icon || '🔍',
  lucideIcon: STEP_ICONS[step.id]?.lucideIcon || BookOpen
}));

export function VerificationChecklist() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStepCompleted = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Educational Notice Banner (No score / No certification) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#2fa8cc]" aria-hidden="true" />
          <h2 className="text-sm sm:text-base font-bold text-[#1f4e79] font-display">
            Three Practical Checking Habits
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5a6b7b] leading-relaxed">
          Ticking boxes does not automatically certify that an AI answer is accurate. Real verification requires actively cross-checking with your trusted textbook and teachers.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="space-y-4">
        {THREE_VERIFICATION_STEPS.map((step) => {
          const isDone = Boolean(completedSteps[step.id]);
          const Icon = step.lucideIcon;

          return (
            <div
              key={step.id}
              className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                isDone ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-[#e2e8f0]'
              }`}
            >
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-[#e8f6fa] text-[#1f4e79]'
                  }`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#1f4e79] font-display">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#5a6b7b] leading-relaxed">
                      {step.coreQuestion}
                    </p>
                  </div>
                </div>

                {/* Habit toggle button */}
                <button
                  type="button"
                  onClick={() => toggleStepCompleted(step.id)}
                  aria-pressed={isDone}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors min-h-[44px] cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#fafbfc] border border-[#e2e8f0] text-[#5a6b7b] hover:border-[#2fa8cc] hover:text-[#1f4e79]'
                  }`}
                  aria-label={`Mark step "${step.title}" as completed`}
                >
                  <Check className={`w-3.5 h-3.5 ${isDone ? 'text-white' : 'opacity-40'}`} aria-hidden="true" />
                  <span className="hidden sm:inline">{isDone ? 'Checked' : 'Mark done'}</span>
                </button>
              </div>

              {/* Expandable school details */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-[#f0f4f8] mt-2 pt-3 space-y-2 bg-[#fafbfc]">
                <p className="text-xs text-[#5a6b7b] leading-relaxed">
                  <strong className="text-[#1a1a1a]">Why it matters:</strong> {step.explanation}
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-[#e2e8f0] text-[11px] text-[#5a6b7b]">
                  <strong className="text-[#1f4e79]">Classroom example:</strong> {step.schoolExample}
                </div>
                <p className="text-[11px] text-[#ff6b00] font-semibold">
                  👉 <strong>Tip:</strong> {step.actionTip}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reminder Callout */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        <strong>Remember:</strong> AI is a study partner for questioning and clarifying concepts. Your textbook and teacher remain the official authorities for exams.
      </div>
    </div>
  );
}
