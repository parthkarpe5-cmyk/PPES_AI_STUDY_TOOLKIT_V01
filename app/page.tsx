import React from 'react';
import Link from 'next/link';
import {
  Compass,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-16">
      {/* Hero Section — Inspired by PPES Signature Navy & Warm Accents */}
      <section className="relative overflow-hidden bg-[#0d1f35] pt-14 sm:pt-20 pb-16 sm:pb-20 border-b border-white/10 text-white">
        {/* Subtle Ambient Glows from PPES theme */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#2fa8cc]/15 blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/3 rounded-full bg-[#ff6b00]/10 blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          {/* Class 8-10 Dedicated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 text-[#f0d074] text-xs font-bold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
            <span>Prarambh Path Educational Initiative • Class 8–10</span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Learn to use <span className="text-[#2fa8cc]">AI</span> to{' '}
              <span className="text-[#f0d074] underline decoration-[#ff6b00] decoration-wavy decoration-2">
                learn better.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
              Prarambh Path’s AI Study Toolkit teaches secondary school students how to choose the right AI, ask structured questions, and verify every answer.
            </p>
          </div>

          {/* Core Philosophy Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xl mx-auto text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-1.5 text-[#2fa8cc] px-2.5 py-1 rounded-xl bg-white/10">
              <span>🎯</span> Choose
            </span>
            <span className="text-white/30">→</span>
            <span className="flex items-center gap-1.5 text-white px-2.5 py-1 rounded-xl bg-white/10">
              <span>💬</span> Ask
            </span>
            <span className="text-white/30">→</span>
            <span className="flex items-center gap-1.5 text-[#ff6b00] px-2.5 py-1 rounded-xl bg-[#ff6b00]/15">
              <span>🔍</span> Check
            </span>
            <span className="text-white/30">→</span>
            <span className="flex items-center gap-1.5 text-[#f0d074] px-2.5 py-1 rounded-xl bg-[#c9a227]/20">
              <span>🧠</span> Learn
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/prompt-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#ff6b00] to-orange-600 shadow-xl shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Build My Study Prompt</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/which-ai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all duration-200"
            >
              <Compass className="w-4 h-4 text-[#2fa8cc]" />
              <span>Which AI should I use?</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60 pt-3">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2fa8cc]" /> 100% Free & Open
            </span>
            <span className="text-white/25">•</span>
            <span>No Login or Signup Required</span>
            <span className="text-white/25">•</span>
            <span>Works Privately in Your Browser</span>
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards (Clean light background with high contrast) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2fa8cc]/10 text-[#1f4e79] text-xs font-bold">
            <span>The 3-Step Study Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e79] tracking-tight font-display">
            How Prarambh Path Works
          </h2>
          <p className="text-sm sm:text-base text-[#5a6b7b] max-w-xl mx-auto">
            Practical modules designed to build genuine AI literacy and deep conceptual mastery for school exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Which AI? */}
          <div className="group bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-xs hover:border-[#2fa8cc] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#e8f6fa] border border-[#2fa8cc]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2fa8cc]">
                  Step 1 • Choose
                </span>
                <h3 className="text-xl font-bold text-[#1f4e79] font-display">
                  Which AI?
                </h3>
                <p className="text-sm text-[#5a6b7b] leading-relaxed">
                  Different AI tools have distinct strengths. Find the exact capability suited for math calculations, revision summaries, or diagram analysis.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/which-ai"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2fa8cc] group-hover:text-[#1f4e79] group-hover:gap-2 transition-all"
              >
                <span>Find suitable AI tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Build My Prompt (Featured) */}
          <div className="group bg-white rounded-2xl border-2 border-[#2fa8cc] p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 right-6 bg-[#2fa8cc] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Featured Tool
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2fa8cc] text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                💬
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2fa8cc]">
                  Step 2 • Ask
                </span>
                <h3 className="text-xl font-bold text-[#1f4e79] font-display">
                  Build My Prompt
                </h3>
                <p className="text-sm text-[#5a6b7b] leading-relaxed">
                  Select your Class (8–10), Subject, and Goal. Generate structured, syllabus-grounded prompts that instruct AI to explain concepts step-by-step.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/prompt-builder"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ff6b00] group-hover:text-orange-700 group-hover:gap-2 transition-all"
              >
                <span>Launch Prompt Generator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Check My Answer */}
          <div className="group bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-xs hover:border-[#ff6b00] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ✅
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b00]">
                  Step 3 • Check
                </span>
                <h3 className="text-xl font-bold text-[#1f4e79] font-display">
                  Check & Verify
                </h3>
                <p className="text-sm text-[#5a6b7b] leading-relaxed">
                  Don’t blindly trust AI answers. Follow our 5-step verification checklist to cross-verify formulas, dates, and definitions with your official textbook.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/verify"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ff6b00] group-hover:text-orange-700 group-hover:gap-2 transition-all"
              >
                <span>View 5-Step Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy & Gurukul-Inspired Ethics */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0d1f35] rounded-3xl p-7 sm:p-12 text-white shadow-xl overflow-hidden relative">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 bg-[#2fa8cc]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a227]/15 text-[#f0d074] border border-[#c9a227]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Prarambh Path Educational Standard</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Not a homework cheat sheet. A learning accelerator.
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Prarambh Path is built on a clear conviction: <strong className="text-white">AI should strengthen your intellect, not bypass your thinking.</strong> We do not provide quick answer keys. We guide you to interact with AI as an inquisitive, thoughtful student.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="font-bold text-[#2fa8cc] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> What Prarambh Path Does
                </span>
                <p className="text-white/70 leading-relaxed">
                  Structures prompts to make AI act as a patient Socratic mentor, giving clues, analogies, and practice quizzes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="font-bold text-[#ff6b00] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> What We Strictly Avoid
                </span>
                <p className="text-white/70 leading-relaxed">
                  Blind copy-pasting, bypassing textbook reading, and unverified assumptions before school examinations.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/prompt-builder"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white font-bold text-sm shadow-lg shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Try the Guided Prompt Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
