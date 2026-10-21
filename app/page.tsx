'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Compass,
  ExternalLink
} from 'lucide-react';
import { SinglePageBuilder } from '@/components/SinglePageBuilder';
import { AI_TOOLS } from '@/data/ai-tools';

export default function HomePage() {
  const builderRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Curated 3 featured tools for the compact homepage entry
  const featuredTools = [
    AI_TOOLS.chatgpt,
    AI_TOOLS.gemini,
    AI_TOOLS.notebooklm,
    AI_TOOLS.phet
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-0 pb-16">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Focused, educational, mobile-first
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d1f35] pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-white/10 text-white">
        {/* Subtle ambient background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/4 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#2fa8cc]/15 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] translate-x-1/2 translate-y-1/3 rounded-full bg-[#ff6b00]/10 blur-[90px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Grade Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-bold text-[#2fa8cc] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Study Toolkit · Class 8–10</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
            Ask better study questions.<br />
            <span className="text-[#2fa8cc]">Check what AI tells you.</span>
          </h1>

          {/* Core Philosophy Journey */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/8 border border-white/10 text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-1.5 text-[#2fa8cc] bg-[#2fa8cc]/15 px-3 py-1.5 rounded-xl">
              <span>🎯</span>
              <span>Choose</span>
            </span>
            <span className="text-white/30 text-xs">→</span>
            <span className="flex items-center gap-1.5 text-white bg-white/10 px-3 py-1.5 rounded-xl">
              <span>💬</span>
              <span>Ask</span>
            </span>
            <span className="text-white/30 text-xs">→</span>
            <span className="flex items-center gap-1.5 text-[#ff6b00] bg-[#ff6b00]/15 px-3 py-1.5 rounded-xl">
              <span>🔍</span>
              <span>Check</span>
            </span>
            <span className="text-white/30 text-xs">→</span>
            <span className="flex items-center gap-1.5 text-[#f0d074] bg-[#c9a227]/20 px-3 py-1.5 rounded-xl">
              <span>🧠</span>
              <span>Learn</span>
            </span>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToBuilder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#ff6b00] to-orange-600 shadow-xl shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 hover:scale-102 active:scale-98 transition-all cursor-pointer min-h-[48px]"
            >
              <span>Build My Study Prompt</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            <Link
              href="/which-ai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-white bg-white/10 border border-white/20 hover:bg-white/15 transition-all min-h-[48px]"
            >
              <span>Explore AI Tools</span>
              <Compass className="w-4 h-4 text-[#2fa8cc]" />
            </Link>
          </div>

          {/* Transparent disclaimer */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/50 pt-1">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#2fa8cc]" /> Free &amp; Anonymous</span>
            <span>•</span>
            <span>No account required</span>
            <span>•</span>
            <span>Prepares prompts for external tools</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EXPLAIN THE DIFFERENCE FROM CHATGPT — "How this helps"
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#e2e8f0] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Main "How this helps" card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#fafbfc] border border-[#2fa8cc]/30 shadow-xs space-y-4">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold text-[#2fa8cc] uppercase tracking-wider bg-[#e8f6fa] px-3 py-1 rounded-full">
                How this helps
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1f4e79] font-display">
                &ldquo;ChatGPT answers your questions. This toolkit helps you ask better study questions and check what AI tells you.&rdquo;
              </h2>
              <p className="text-xs sm:text-sm text-[#5a6b7b] leading-relaxed">
                Most students use AI as a fast answer-generator for homework, which does not help during exams. This toolkit trains you to use AI as an interactive study mentor through three benefits:
              </p>
            </div>

            {/* Three Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#e8f6fa] text-[#1f4e79] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-sm font-bold text-[#1f4e79] font-display">
                  Organise your study context
                </h3>
                <p className="text-xs text-[#5a6b7b] leading-relaxed">
                  Lock in your exact class (8, 9, or 10), board curriculum, and chapter topic so AI explains at the right depth instead of using confusing college math.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#e8f6fa] text-[#1f4e79] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-sm font-bold text-[#1f4e79] font-display">
                  Ask for explanations, hints, or practice
                </h3>
                <p className="text-xs text-[#5a6b7b] leading-relaxed">
                  Default problem solving to one hint at a time, and instruct external AI to withhold practice quiz answers until you try them first.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#e8f6fa] text-[#1f4e79] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-sm font-bold text-[#1f4e79] font-display">
                  Check answers against your textbook
                </h3>
                <p className="text-xs text-[#5a6b7b] leading-relaxed">
                  AI makes confident mistakes. Build the habit of cross-checking formulas, SI units, and definitions against your official textbook.
                </p>
              </div>
            </div>

            {/* Honest scope statement */}
            <div className="pt-2 border-t border-[#e2e8f0] text-[11px] text-[#5a6b7b] leading-relaxed">
              <strong>Honest product note:</strong> This toolkit prepares structured study prompts for external tools (ChatGPT, Gemini, etc.). It does not run an internal AI model or process private documents on our servers.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CANONICAL SINGLE-PAGE STUDY BUILDER
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        ref={builderRef}
        id="study-builder"
        className="bg-[#fafbfc] border-b border-[#e2e8f0] py-10 sm:py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-white uppercase tracking-wider bg-[#1f4e79] px-3 py-1 rounded-full">
              Canonical Study Builder
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e79] font-display">
              Build Your AI Study Prompt
            </h2>
            <p className="text-xs sm:text-sm text-[#5a6b7b] max-w-md mx-auto leading-relaxed">
              Choose your class, subject, topic, and goal. Your prompt will be formatted to promote active understanding.
            </p>
          </div>

          <SinglePageBuilder />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPACT HOMEPAGE ENTRY: "AI TOOLS FOR STUDENTS"
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2fa8cc] block">
                Reviewed &amp; Verified Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e79] font-display">
                AI Tools for Students
              </h2>
              <p className="text-xs sm:text-sm text-[#5a6b7b] max-w-xl">
                We review terms of service, pricing, and age requirements before recommending any AI tool.
              </p>
            </div>

            <Link
              href="/which-ai"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1f4e79] hover:bg-[#2fa8cc] text-white text-xs font-bold transition-all shrink-0 min-h-[44px]"
            >
              <span>Explore All Verified Tools ({Object.keys(AI_TOOLS).length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Curated 4 cards on homepage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredTools.map((tool) => (
              <div
                key={tool.id}
                className="p-4 rounded-2xl border border-[#e2e8f0] bg-[#fafbfc] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#1f4e79] font-display">
                      {tool.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {tool.freeAccessType}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a6b7b] line-clamp-2 leading-relaxed">
                    {tool.bestFor}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
                  <span className="text-[11px] text-[#1f4e79] font-medium block">
                    {tool.minimumAge}
                  </span>
                  <a
                    href={tool.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#1f4e79] hover:border-[#2fa8cc] hover:text-[#2fa8cc] transition-colors min-h-[40px]"
                  >
                    <span>Visit website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/which-ai"
              className="text-xs font-bold text-[#2fa8cc] hover:text-[#1f4e79] underline underline-offset-4"
            >
              Filter by student task: Math, Science, Quizzes, Coding, and Document review →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CHECK BEFORE YOU TRUST CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0d1f35] py-10 sm:py-14 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-2xl block" aria-hidden="true">🔍</span>
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Never blindly copy an AI answer
          </h2>
          <p className="text-xs sm:text-sm text-white/75 max-w-lg mx-auto leading-relaxed">
            AI can hallucinate dates, mix up formula units, and make confident mistakes. Always practice our 3-step checking habit before writing an answer in your school notebook.
          </p>
          <div className="pt-2">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white font-semibold text-xs sm:text-sm transition-all min-h-[44px]"
            >
              <span>Learn the 3-step checking habit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
