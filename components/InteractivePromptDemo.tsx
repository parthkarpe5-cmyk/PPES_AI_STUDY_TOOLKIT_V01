'use client';

import React, { useState } from 'react';
import { StudyIcon } from '@/components/StudyIcon';

/**
 * InteractivePromptDemo
 * Shows a real AI prompt with annotated, tappable segments.
 * Students tap a segment to discover what that part does.
 * Teaches prompting through interaction, not paragraphs.
 */

interface Segment {
  id: string;
  text: string;
  label: string;
  shortWhy: string;
  explanation: string;
  color: string;
  borderColor: string;
  textColor: string;
  tagBg: string;
}

const DEMO_SEGMENTS: Segment[] = [
  {
    id: 'role',
    text: 'Act as an experienced, encouraging Class 10 Science teacher.',
    label: 'ROLE',
    shortWhy: 'Tells AI who to pretend to be',
    explanation: 'A teacher persona means patient, step-by-step explanations with zero confusing jargon — instead of raw textbook facts.',
    color: 'bg-[#e8f6fa]',
    borderColor: 'border-[#2fa8cc]',
    textColor: 'text-[#0f3557]',
    tagBg: 'bg-[#2fa8cc]/20 text-[#0f3557]',
  },
  {
    id: 'topic',
    text: "I am studying Electricity — specifically Ohm's Law.",
    label: 'TOPIC',
    shortWhy: 'Exact concept & chapter',
    explanation: "Anchors AI strictly to your chapter so it doesn't wander off into college-level electromagnetic physics.",
    color: 'bg-amber-50',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-950',
    tagBg: 'bg-amber-200 text-amber-950',
  },
  {
    id: 'style',
    text: 'Explain using a simple water-flow analogy.',
    label: 'STYLE',
    shortWhy: 'How to explain it',
    explanation: 'An analogy makes abstract ideas click instantly: Voltage = water pressure, Current = water flow, Resistance = narrow pipe.',
    color: 'bg-indigo-50',
    borderColor: 'border-indigo-400',
    textColor: 'text-indigo-950',
    tagBg: 'bg-indigo-200 text-indigo-950',
  },
  {
    id: 'output',
    text: 'Create a labelled diagram description and a one-page revision chart.',
    label: 'OUTPUT FORMAT',
    shortWhy: 'Structure of the answer',
    explanation: 'Asks for clean sections, bullet points, and a diagram layout instead of an unreadable wall of text.',
    color: 'bg-emerald-50',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-950',
    tagBg: 'bg-emerald-200 text-emerald-950',
  },
  {
    id: 'practice',
    text: 'Then ask me 5 practice questions to test my understanding.',
    label: 'PRACTICE',
    shortWhy: 'Active learning check',
    explanation: "Turns passive reading into active test practice. When AI quizzes you, you discover what you haven't mastered yet.",
    color: 'bg-orange-50',
    borderColor: 'border-orange-400',
    textColor: 'text-orange-950',
    tagBg: 'bg-orange-200 text-orange-950',
  },
  {
    id: 'guardrail',
    text: 'Keep explanations appropriate for Class 10 CBSE level.',
    label: 'LEVEL GUARDRAIL',
    shortWhy: 'Grade-level boundary',
    explanation: 'Keeps the explanation strictly matched to your school syllabus and exam mark requirements.',
    color: 'bg-rose-50',
    borderColor: 'border-rose-400',
    textColor: 'text-rose-950',
    tagBg: 'bg-rose-200 text-rose-950',
  },
];

export function InteractivePromptDemo() {
  const [activeSegment, setActiveSegment] = useState<string>('role');

  const active = DEMO_SEGMENTS.find(s => s.id === activeSegment) || DEMO_SEGMENTS[0];

  const handleSegmentClick = (id: string) => {
    setActiveSegment(id);
  };

  return (
    <div className="space-y-4">
      {/* Instruction banner */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2fa8cc] uppercase tracking-wider">
          <span className="animate-ping inline-block w-2 h-2 rounded-full bg-[#2fa8cc]" aria-hidden="true" />
          <span>Tap any part of the prompt below:</span>
        </div>
        <span className="text-[11px] text-[#5a6b7b] font-medium hidden sm:inline">
          6 key ingredients of a master prompt
        </span>
      </div>

      {/* Prompt container */}
      <div
        className="bg-[#0d1f35] rounded-2xl p-3.5 sm:p-5 space-y-2 border border-white/15 shadow-xl"
        role="region"
        aria-label="Interactive prompt breakdown"
      >
        {DEMO_SEGMENTS.map((seg) => {
          const isActive = activeSegment === seg.id;
          return (
            <button
              key={seg.id}
              type="button"
              onClick={() => handleSegmentClick(seg.id)}
              aria-expanded={isActive}
              aria-label={`${seg.label}: ${seg.text}`}
              className={`
                w-full text-left p-2.5 sm:p-3 rounded-xl transition-all duration-150 cursor-pointer group
                font-mono text-xs sm:text-sm leading-relaxed border
                ${isActive
                  ? `${seg.color} ${seg.textColor} ${seg.borderColor} border-2 shadow-md font-semibold ring-2 ring-white/20`
                  : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${
                    isActive ? seg.tagBg : 'bg-white/10 text-slate-300'
                  }`}
                >
                  <StudyIcon name={seg.id} className="w-3 h-3" />
                  {seg.label}
                </span>
                <span className="flex-1">{seg.text}</span>
                <span className={`text-xs shrink-0 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100 text-slate-400'}`}>
                  {isActive ? '👈 active' : 'tap'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation Card */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="animate-in fade-in slide-in-from-top-1 duration-200"
      >
        <div className={`${active.color} border-2 ${active.borderColor} rounded-2xl p-4 sm:p-5 space-y-1.5 shadow-sm`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${active.tagBg}`}>
                <StudyIcon name={active.id} className="w-4 h-4" />
              </div>
              <span className={`text-xs font-extrabold uppercase tracking-wider ${active.textColor}`}>
                {active.label}: {active.shortWhy}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active.tagBg}`}>
              Ingredient #{DEMO_SEGMENTS.findIndex(s => s.id === active.id) + 1} of 6
            </span>
          </div>
          <p className={`text-sm sm:text-base font-semibold leading-relaxed ${active.textColor}`}>
            {active.explanation}
          </p>
        </div>
      </div>

      {/* Quick Tag Selector Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {DEMO_SEGMENTS.map((seg, idx) => (
          <button
            key={seg.id}
            type="button"
            onClick={() => handleSegmentClick(seg.id)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px]
              ${activeSegment === seg.id
                ? `${seg.color} ${seg.textColor} border-2 ${seg.borderColor} shadow-xs`
                : 'bg-white border border-[#e2e8f0] text-[#5a6b7b] hover:border-[#2fa8cc] hover:text-[#1f4e79]'
              }
            `}
            aria-pressed={activeSegment === seg.id}
          >
            <StudyIcon name={seg.id} className="w-3.5 h-3.5" />
            <span>{idx + 1}. {seg.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
