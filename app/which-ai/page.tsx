'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AI_TOOLS,
  STUDENT_TASK_CATEGORIES,
  EXTERNAL_AI_DIRECTORY,
  type StudentTaskCategory,
  type AITool
} from '@/data/ai-tools';
import {
  Compass,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Sparkles,
  Smartphone,
  CreditCard,
  UserCheck,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function AIToolsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<StudentTaskCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const allTools = Object.values(AI_TOOLS);

  // Filter tools
  const filteredTools = allTools.filter(tool => {
    // Category match
    if (selectedCategory !== 'all' && !tool.categories.includes(selectedCategory)) {
      return false;
    }
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tool.name.toLowerCase().includes(q);
      const matchBestFor = tool.bestFor.toLowerCase().includes(q);
      const matchExamples = tool.studentExamples.some(ex => ex.toLowerCase().includes(q));
      return matchName || matchBestFor || matchExamples;
    }
    return true;
  });

  // Separate recommended student tools from teacher-only / supervised tools
  const recommendedTools = filteredTools.filter(t => t.status === 'recommended');
  const teacherSupervisedTools = filteredTools.filter(t => t.status === 'teacher-only');

  const displayedRecommended = recommendedTools.slice(0, visibleCount);
  const hasMore = visibleCount < recommendedTools.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ── HEADER ── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2fa8cc]/10 text-[#1f4e79] border border-[#2fa8cc]/30 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-[#2fa8cc]" />
          <span>AI Tools for Students</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1f4e79] tracking-tight font-display">
          Verified AI Study Tools
        </h1>
        <p className="text-sm sm:text-base text-[#5a6b7b] leading-relaxed">
          Every tool below has been reviewed against its official terms of service, pricing, and age requirements. We verify that useful free functionality exists without requiring a credit card.
        </p>

        {/* Verification Standards Callout */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs text-[#5a6b7b] pt-1">
          <span className="flex items-center gap-1">✓ No credit card required</span>
          <span>•</span>
          <span className="flex items-center gap-1">✓ Verified mobile browser/app</span>
          <span>•</span>
          <span className="flex items-center gap-1">✓ Clear age &amp; privacy policies</span>
        </div>
      </div>

      {/* ── SAFETY REMINDER ── */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="leading-relaxed">
          <strong>🔒 Student safety rule:</strong> When using any external AI tool, never share your real phone number, passwords, home address, school ID, or private family photos.
        </p>
      </div>

      {/* ── SEARCH & TASK CATEGORY FILTERS ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by task or tool (e.g. math, diagrams, quiz, code)…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e2e8f0] bg-white text-[#1a1a1a] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc]"
            />
          </div>

          <div className="text-xs font-semibold text-[#5a6b7b]">
            Showing {filteredTools.length} verified {filteredTools.length === 1 ? 'tool' : 'tools'}
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setVisibleCount(6);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#1f4e79] text-white shadow-xs'
                : 'bg-white border border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa]'
            }`}
          >
            All Tasks
          </button>
          {STUDENT_TASK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(6);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1f4e79] text-white shadow-xs'
                  : 'bg-white border border-[#e2e8f0] text-[#1a1a1a] hover:bg-[#e8f6fa]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── RECOMMENDED STUDENT TOOLS GRID ── */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2fa8cc]" />
          <span>Recommended Student Tools ({recommendedTools.length})</span>
        </h2>

        {displayedRecommended.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#e2e8f0] text-sm text-[#5a6b7b]">
            No recommended tools found matching your current filter. Try selecting &ldquo;All Tasks&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedRecommended.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isExpanded={expandedToolId === tool.id}
                onToggleExpand={() =>
                  setExpandedToolId(prev => (prev === tool.id ? null : tool.id))
                }
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-6 py-2.5 rounded-xl border border-[#e2e8f0] bg-white hover:bg-[#e8f6fa] text-xs font-bold text-[#1f4e79] transition-all min-h-[44px] cursor-pointer"
            >
              Show More Tools ({recommendedTools.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* ── TEACHER & SUPERVISED ADULT TOOLS SECTION ── */}
      {teacherSupervisedTools.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#e2e8f0]">
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#8a3800] font-display flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#ff6b00]" />
              <span>Teacher &amp; Supervised Tools ({teacherSupervisedTools.length})</span>
            </h2>
            <p className="text-xs text-[#5a6b7b]">
              Services requiring accounts registered by adults (18+) or educator supervision under provider terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacherSupervisedTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isExpanded={expandedToolId === tool.id}
                onToggleExpand={() =>
                  setExpandedToolId(prev => (prev === tool.id ? null : tool.id))
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* ── "THERE'S AN AI FOR THAT" EXTERNAL DIRECTORY SECTION ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#fafbfc] border border-[#e2e8f0] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2fa8cc] block">
              External Tool Discovery
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1f4e79] font-display">
              {EXTERNAL_AI_DIRECTORY.label}
            </h3>
            <p className="text-xs text-[#5a6b7b] max-w-2xl leading-relaxed">
              {EXTERNAL_AI_DIRECTORY.description}
            </p>
          </div>

          <a
            href={EXTERNAL_AI_DIRECTORY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#e2e8f0] text-xs font-bold text-[#1f4e79] hover:border-[#2fa8cc] hover:text-[#2fa8cc] transition-all shrink-0 min-h-[44px]"
          >
            <span>Visit There’s An AI For That</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── BOTTOM STUDY CTA ── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0d1f35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-display">Ready to prepare your study prompt?</h3>
          <p className="text-xs text-white/70">
            Use the canonical builder to organize your class, chapter, and goal before opening your AI tool.
          </p>
        </div>
        <Link
          href="/#study-builder"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 font-bold text-xs sm:text-sm text-white shadow-md hover:scale-102 transition-all min-h-[44px]"
        >
          <span>Open Study Prompt Builder</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// ─── Sub-Component: Simple Tool Card with Expandable Details ─────────────────

function ToolCard({
  tool,
  isExpanded,
  onToggleExpand
}: {
  tool: AITool;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden flex flex-col transition-all hover:border-[#2fa8cc]/50">
      <div className="p-4 sm:p-5 flex-1 space-y-3">
        {/* Badges & Name */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1f4e79] font-display">
              {tool.name}
            </h3>
            <p className="text-xs text-[#5a6b7b] mt-0.5 leading-snug">
              <strong>Best for:</strong> {tool.bestFor}
            </p>
          </div>

          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
              tool.freeAccessType === 'Free'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {tool.freeAccessType}
          </span>
        </div>

        {/* Visible card attributes */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#5a6b7b]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fafbfc] border border-[#e2e8f0]">
            <Smartphone className="w-3 h-3 text-[#2fa8cc]" />
            <span>{tool.mobileWebStatus}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fafbfc] border border-[#e2e8f0]">
            <CreditCard className="w-3 h-3 text-[#2fa8cc]" />
            <span>Card required: {tool.cardRequired ? 'Yes' : 'No'}</span>
          </span>
        </div>

        {/* Important eligibility note */}
        <div className="p-2.5 rounded-lg bg-[#fafbfc] border border-[#f0f4f8] text-[11px] text-[#1f4e79] leading-snug">
          <strong>Eligibility:</strong> {tool.minimumAge}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1f4e79] text-white text-xs font-bold hover:bg-[#2fa8cc] transition-colors min-h-[44px]"
          >
            <span>Visit official website</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={onToggleExpand}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2fa8cc] hover:text-[#1f4e79] p-2 min-h-[44px] cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide details' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Details Accordion */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-[#fafbfc] border-t border-[#e2e8f0] text-xs space-y-3 animate-in fade-in duration-150">
          {/* Examples of how to use it */}
          <div>
            <span className="font-bold text-[#1f4e79] block mb-1">
              Useful student tasks &amp; examples:
            </span>
            <ul className="list-disc pl-4 space-y-1 text-[#5a6b7b]">
              {tool.studentExamples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>

          {/* Main limitations & Free-tier restrictions */}
          <div>
            <span className="font-bold text-[#1f4e79] block mb-1">
              Free-tier limits &amp; paywalls:
            </span>
            <p className="text-[#5a6b7b] leading-relaxed">
              {tool.freeLimitations}
            </p>
          </div>

          {/* Account / app requirements */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5a6b7b]">
            <div>
              <strong>Account required:</strong> {tool.accountRequired ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>App required:</strong> {tool.appRequired ? 'Yes' : 'No (works on web)'}
            </div>
            <div>
              <strong>App availability:</strong> {tool.appAvailability}
            </div>
            <div>
              <strong>Supervision:</strong> {tool.supervisionNotes}
            </div>
          </div>

          {/* Privacy reminder */}
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <strong>Privacy notice:</strong> {tool.privacyNotes}
          </div>

          {/* Official Evidence Links & Review Date */}
          <div className="pt-2 border-t border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#5a6b7b]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#1f4e79]">Official evidence:</span>
              {tool.evidenceUrls.map((ev, i) => (
                <a
                  key={i}
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2fa8cc] hover:underline flex items-center gap-0.5"
                >
                  <span>{ev.label}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1 shrink-0 text-slate-400">
              <Calendar className="w-3 h-3" />
              <span>Reviewed: {tool.lastReviewedAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
