'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { STUDY_TASKS } from '@/data/tasks';
import { recommendForTask } from '@/lib/ai-recommender';
import { getStoredProfile, StudyProfile, DEFAULT_PROFILE, CLASS_LABELS, BOARD_LABELS } from '@/lib/study-profile';
import {
  Compass,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lightbulb,
  Search,
  ShieldAlert
} from 'lucide-react';
import { StudyIcon } from '@/components/StudyIcon';

export default function WhichAIPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('study-understand');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [profile, setProfile] = useState<StudyProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const rec = recommendForTask(selectedTaskId) || recommendForTask('study-understand')!;
  const selectedTask = rec.task;
  const recommendedTools = rec.tools;

  const filteredTasks = STUDY_TASKS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.requiredCapability.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2fa8cc]/10 text-[#1f4e79] border border-[#2fa8cc]/30 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-[#2fa8cc]" />
          <span>Step 1: Choose Your AI Superpower</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1f4e79] tracking-tight font-display">
          Which AI Tool Fits Your Task?
        </h1>
        <p className="text-sm sm:text-base text-[#5a6b7b] leading-relaxed">
          No single AI is universally &ldquo;the best&rdquo;. Different AI assistants excel at different learning capabilities. Select what you are trying to accomplish below.
        </p>

        {/* Current Study Context Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e2e8f0] text-xs font-semibold text-[#1f4e79] shadow-xs">
          <span>Your Study Context: <strong>{CLASS_LABELS[profile.classLevel]} · {BOARD_LABELS[profile.board]}</strong></span>
        </div>
      </div>

      {/* Student Safety Callout */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="leading-relaxed">
          <strong>🔒 Stay safe when using AI:</strong> Never share your real name, phone number, home address, school ID, or private personal photos in any external AI tool.
        </p>
      </div>

      {/* Task Selector & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a6b7b] font-display">
            Select Your Study Task ({STUDY_TASKS.length} tasks)
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search task (e.g. Math, Coding, Notes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#e2e8f0] bg-white text-[#1a1a1a] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc] focus:border-[#2fa8cc] transition-all"
            />
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredTasks.map((task) => {
            const isSelected = selectedTaskId === task.id;
            return (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between gap-2.5 relative cursor-pointer ${
                  isSelected
                    ? 'bg-[#e8f6fa] border-[#2fa8cc] shadow-xs ring-2 ring-[#2fa8cc]/30'
                    : 'bg-white border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:bg-[#fafbfc]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white text-[#1f4e79] shadow-xs' : 'bg-[#eef2f6] text-[#5a6b7b]'}`}>
                    <StudyIcon name={task.id} className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2fa8cc]" />
                  )}
                </div>
                <div>
                  <h3 className={`text-sm font-bold font-display ${isSelected ? 'text-[#1f4e79]' : 'text-[#1a1a1a]'}`}>
                    {task.name}
                  </h3>
                  <p className="text-[11px] text-[#5a6b7b] line-clamp-2 mt-0.5 leading-snug">
                    {task.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Task Capability & Recommendation Box */}
      <div className="bg-white rounded-2xl border-2 border-[#2fa8cc] shadow-md overflow-hidden animate-in fade-in-50 duration-200">
        {/* Header Ribbon with PPES Academic Theme */}
        <div className="bg-gradient-to-r from-[#0d1f35] via-[#1f4e79] to-[#0d1f35] p-5 sm:p-6 text-white border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white ring-1 ring-white/15">
                <StudyIcon name={selectedTask.id} className="w-6 h-6 text-[#f0d074]" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2fa8cc]">
                  Recommended AI Capability
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {selectedTask.name}
                </h2>
              </div>
            </div>

            {/* Jump to Prompt Builder or Study Workflow */}
            <Link
              href={`/prompt-builder?goal=${rec.suggestedPromptGoal}&class=${profile.classLevel}&board=${profile.board}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Build Prompt for this Task</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Breakdown Content */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Capability & Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#fafbfc] border border-[#e2e8f0] space-y-1.5">
              <span className="text-[11px] font-bold text-[#5a6b7b] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#2fa8cc]" />
                1. Required AI Capability
              </span>
              <p className="text-sm font-bold text-[#1f4e79]">
                {rec.requiredCapability}
              </p>
              <p className="text-xs text-[#5a6b7b] leading-relaxed">
                {selectedTask.exampleScenario}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#e8f6fa]/60 border border-[#2fa8cc]/30 space-y-1.5">
              <span className="text-[11px] font-bold text-[#1f4e79] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2fa8cc]" />
                2. Recommended AI Approach
              </span>
              <p className="text-sm font-bold text-[#1f4e79]">
                {rec.recommendedApproach}
              </p>
              <p className="text-xs text-[#1f4e79]/80 leading-relaxed">
                Capability-focused rather than brand-dependent.
              </p>
            </div>
          </div>

          {/* Suitable AI Tools */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-sm font-bold text-[#1f4e79] uppercase tracking-wider font-display flex items-center gap-2">
                <span>🛠️</span> 3. Suitable AI Tools for this Task
              </h3>
              <span className="text-xs text-[#5a6b7b]">
                Rankings change over time — choose based on capability
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-xl border border-[#e2e8f0] p-4 bg-white hover:border-[#2fa8cc] hover:shadow-md transition-all flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#1f4e79] text-base font-display">{tool.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#c9a227]/15 text-[#967414] border border-[#c9a227]/25">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#5a6b7b] leading-relaxed">
                      {tool.positioning}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#5a6b7b]">Key Strengths:</span>
                      <ul className="text-[11px] text-[#1a1a1a] space-y-0.5">
                        {tool.strengths.slice(0, 2).map((st, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-[#2fa8cc] font-bold shrink-0">✓</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={tool.accessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-[#fafbfc] hover:bg-[#e8f6fa] text-[#1f4e79] hover:text-[#1f4e79] text-xs font-semibold transition-colors border border-[#e2e8f0] hover:border-[#2fa8cc]/50 group"
                  >
                    <span>Visit {tool.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#2fa8cc] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Why this Recommendation & Caution Notice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Why */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                4. Why this Recommendation
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {rec.reason}
              </p>
            </div>

            {/* Caution */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                5. Important Limitation & Caution
              </span>
              <p className="text-xs text-amber-950 leading-relaxed">
                {rec.caution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA: Build Prompt with context passed from this page */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1f4e79] to-[#2fa8cc] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white/80" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">Next Step</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold font-display">
            Ready to Ask AI the Right Way?
          </h3>
          <p className="text-xs text-white/75 leading-relaxed max-w-md">
            Use the Prompt Builder to create a high-quality, curriculum-grounded prompt for <strong>{selectedTask.name}</strong> — ready to paste into {recommendedTools[0]?.name || 'your AI tool'}.
          </p>
        </div>
        <Link
          href={`/study?goal=${encodeURIComponent(selectedTask.id)}`}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#1f4e79] text-sm font-bold shadow-sm hover:bg-[#e8f6fa] transition-all"
        >
          <span>Build My Study Prompt</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Educational Note about AI tools */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e2e8f0] text-xs text-[#5a6b7b] flex items-start gap-3.5 shadow-xs">
        <Lightbulb className="w-5 h-5 text-[#2fa8cc] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#1f4e79] font-display text-sm">
            Guiding Principle: Capability over Brand
          </span>
          <p className="leading-relaxed">
            AI tools change every few months. Instead of memorizing which brand is &ldquo;the best&rdquo;, learn the underlying capability (e.g. document grounding, vision reasoning, or step-by-step logic) and match your study goal accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
