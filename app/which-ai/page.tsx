'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { STUDY_TASKS, TaskOption } from '@/data/tasks';
import { AI_TOOLS, AITool } from '@/data/ai-tools';
import {
  Compass,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Layers,
  HelpCircle,
  Lightbulb,
  Search
} from 'lucide-react';

export default function WhichAIPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('study-understand');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedTask = STUDY_TASKS.find((t) => t.id === selectedTaskId) || STUDY_TASKS[0];

  const recommendedTools: AITool[] = selectedTask.recommendedToolIds
    .map((id) => AI_TOOLS[id])
    .filter((t): t is AITool => Boolean(t));

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Step 1: Choose Your AI Superpower</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Which AI Tool Fits Your Task?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          No single AI is universally &ldquo;the best&rdquo;. Different AI assistants excel at different learning capabilities. Select what you are trying to accomplish below.
        </p>
      </div>

      {/* Task Selector & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Select Your Study Task ({STUDY_TASKS.length} tasks)
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search task (e.g. PDF, Coding, Notes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all duration-150 flex flex-col justify-between gap-2 relative ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-600 shadow-xs ring-2 ring-indigo-600/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{task.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                    {task.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                    {task.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Task Capability & Recommendation Box */}
      <div className="bg-white rounded-2xl border-2 border-indigo-500/80 shadow-md overflow-hidden animate-in fade-in-50 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 p-5 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-3xl">
                {selectedTask.icon}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                  Task Recommendation Breakdown
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedTask.name}
                </h2>
              </div>
            </div>

            {/* Jump to Prompt Builder */}
            <Link
              href={`/prompt-builder?goal=${selectedTask.suggestedPromptGoal}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs sm:text-sm hover:bg-indigo-50 shadow-xs transition-all active:scale-95"
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
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                1. Required AI Capability
              </span>
              <p className="text-sm font-bold text-slate-900">
                {selectedTask.requiredCapability}
              </p>
              <p className="text-xs text-slate-500">
                {selectedTask.exampleScenario}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                2. Recommended AI Approach
              </span>
              <p className="text-sm font-bold text-indigo-950">
                {selectedTask.recommendedApproach}
              </p>
              <p className="text-xs text-indigo-700">
                Capability-focused rather than brand-dependent.
              </p>
            </div>
          </div>

          {/* Suitable AI Tools */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>🛠️</span> 3. Suitable AI Tools for this Task
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Rankings change over time — choose based on capability
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-xl border border-slate-200 p-4 bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base">{tool.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tool.positioning}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Key Strengths:</span>
                      <ul className="text-[11px] text-slate-600 space-y-0.5">
                        {tool.strengths.slice(0, 2).map((st, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-emerald-500 shrink-0">✓</span>
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
                    className="inline-flex items-center justify-center gap-1 w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 text-xs font-semibold transition-colors group"
                  >
                    <span>Visit {tool.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Why this Recommendation & Caution Notice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Why */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                4. Why this Recommendation
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {selectedTask.reason}
              </p>
            </div>

            {/* Caution */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                5. Important Limitation & Caution
              </span>
              <p className="text-xs text-amber-950 leading-relaxed">
                {selectedTask.caution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Note about AI tools */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-800">
            Guiding Principle: Capability over Brand
          </span>
          <p className="leading-relaxed">
            AI tools change every few months. Instead of memorizing which brand is &ldquo;the best&rdquo;, learn the underlying capability (e.g. document grounding, vision reasoning, or code debugging) and match your task accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
