import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  BookOpen,
  Cpu
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-slate-50/50 pt-12 sm:pt-16 pb-12 border-b border-slate-200/70">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-200/30 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Class 8-10 Audience Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold shadow-xs">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Dedicated for Class 8, 9 & 10 Students</span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Learn to use <span className="text-indigo-600">AI</span> to{' '}
              <span className="underline decoration-indigo-300 decoration-wavy decoration-2">
                learn better.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Prarambh Path’s AI Study Toolkit teaches you how to choose the right AI, ask smart questions, and verify your answers.
            </p>
          </div>

          {/* Core Philosophy Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs max-w-xl mx-auto text-xs sm:text-sm font-bold text-slate-800">
            <span className="flex items-center gap-1.5 text-indigo-600 px-2 py-1 rounded-lg bg-indigo-50">
              <span>🎯</span> Choose
            </span>
            <span className="text-slate-300">→</span>
            <span className="flex items-center gap-1.5 text-blue-600 px-2 py-1 rounded-lg bg-blue-50">
              <span>💬</span> Ask
            </span>
            <span className="text-slate-300">→</span>
            <span className="flex items-center gap-1.5 text-amber-600 px-2 py-1 rounded-lg bg-amber-50">
              <span>🔍</span> Check
            </span>
            <span className="text-slate-300">→</span>
            <span className="flex items-center gap-1.5 text-emerald-600 px-2 py-1 rounded-lg bg-emerald-50">
              <span>🧠</span> Learn
            </span>
          </div>

          {/* Primary CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/prompt-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95"
            >
              <span>Build My Study Prompt</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/which-ai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:border-slate-400 transition-all duration-200"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              <span>Which AI should I use?</span>
            </Link>
          </div>

          {/* No Login / No Tracking Guarantee */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free & Anonymous
            </span>
            <span className="text-slate-300">•</span>
            <span>No Login Required</span>
            <span className="text-slate-300">•</span>
            <span>Runs locally in browser</span>
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How Prarambh Path Works
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Three simple steps designed to build real AI literacy and deeper conceptual understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Which AI? */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step 1 • Choose
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Which AI?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Different AI tools have different superpowers. Find the exact capability suited for revision, notes, PDFs, or diagram analysis.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/which-ai"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 group-hover:text-indigo-700 group-hover:gap-2 transition-all"
              >
                <span>Find suitable AI tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Build My Prompt */}
          <div className="group bg-white rounded-2xl border-2 border-indigo-500/80 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-5 bg-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Primary Feature
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-xs">
                💬
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step 2 • Ask
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Build My Prompt
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Select your Class (8–10), Subject, and Goal. Generate structured, syllabus-grounded prompts that guide AI to teach rather than give lazy answers.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/prompt-builder"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 group-hover:text-indigo-700 group-hover:gap-2 transition-all"
              >
                <span>Launch Prompt Generator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Check My Answer */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ✅
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Step 3 • Check
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Check My Answer
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Don’t blindly trust AI output. Follow our 5-step verification checklist to cross-verify formulas, dates, and definitions with your textbook.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/verify"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 group-hover:text-emerald-700 group-hover:gap-2 transition-all"
              >
                <span>View 5-Step Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Positioning & Responsible AI Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden relative">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Responsible AI for School Education</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Not a chatbot. Not a homework cheat sheet.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Prarambh Path is built on a clear conviction: <strong className="text-white">AI should help you understand concepts, not replace your own intellect.</strong> We do not give you direct AI answers. We teach you how to interact with AI tools thoughtfully and critically.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  ✓ What Prarambh Path Does
                </span>
                <p className="text-slate-300">
                  Guides you to craft structured prompts that instruct AI to act like a patient tutor and quiz you.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  ✗ What We Avoid
                </span>
                <p className="text-slate-300">
                  Copy-paste homework answers, blind reliance, and bypassing your own textbook reading.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/prompt-builder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all active:scale-95"
              >
                <span>Try the Prompt Builder Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
