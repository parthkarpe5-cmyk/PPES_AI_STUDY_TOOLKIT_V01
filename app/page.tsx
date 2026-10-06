'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { InteractivePromptDemo } from '@/components/InteractivePromptDemo';
import { SinglePageBuilder } from '@/components/SinglePageBuilder';
import { StudyIcon } from '@/components/StudyIcon';
import { CAPABILITY_CATEGORIES } from '@/data/capabilities';

export default function HomePage() {
  const builderRef = useRef<HTMLDivElement>(null);
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string>('');
  const [selectedSubCapId, setSelectedSubCapId] = useState<string>('');

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCapabilityClick = (catId: string, subId?: string) => {
    setSelectedCapabilityId(catId);
    setSelectedSubCapId(subId || '');
    scrollToBuilder();
  };

  return (
    <div className="flex flex-col gap-0 pb-16">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — compact, punchy
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d1f35] pt-10 sm:pt-14 pb-14 sm:pb-18 border-b border-white/10 text-white">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#2fa8cc]/15 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] translate-x-1/2 translate-y-1/3 rounded-full bg-[#ff6b00]/8 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* AI Literacy badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-xs font-bold text-[#2fa8cc] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Literacy &amp; Study Toolkit · Class 8–10</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
            AI can do a lot.<br />
            <span className="text-[#2fa8cc]">Let&apos;s see how one good prompt works.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/75 max-w-xl mx-auto leading-relaxed">
            Prarambh Path teaches you <em>how</em> to use AI — not just that it exists.
            Choose what you need, ask smartly, check the answer, and actually learn.
          </p>

          {/* CHOOSE → ASK → CHECK → LEARN */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2 rounded-2xl bg-white/8 border border-white/10 text-xs sm:text-sm font-bold">
            {[
              { icon: '🎯', label: 'Choose', color: 'text-[#2fa8cc]', bg: 'bg-[#2fa8cc]/15' },
              { icon: '💬', label: 'Ask', color: 'text-white', bg: 'bg-white/10' },
              { icon: '🔍', label: 'Check', color: 'text-[#ff6b00]', bg: 'bg-[#ff6b00]/15' },
              { icon: '🧠', label: 'Learn', color: 'text-[#f0d074]', bg: 'bg-[#c9a227]/20' },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <span className={`flex items-center gap-1.5 ${step.color} ${step.bg} px-2.5 py-1.5 rounded-xl`}>
                  <span>{step.icon}</span>
                  <span>{step.label}</span>
                </span>
                {i < arr.length - 1 && <span className="text-white/25 text-xs">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToBuilder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#ff6b00] to-orange-600 shadow-xl shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Build My Study Prompt</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            <Link
              href="/verify"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-white bg-white/8 border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-200"
            >
              <span>🔍 How to Verify AI Answers</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50 pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#2fa8cc]" /> Free &amp; Anonymous</span>
            <span className="text-white/20">•</span>
            <span>No Signup Required</span>
            <span className="text-white/20">•</span>
            <span>No AI API Used</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE PROMPT DEMO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#0d1f35] to-[#fafbfc] pt-10 sm:pt-14 pb-14 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block text-xs font-bold text-[#2fa8cc] uppercase tracking-wider bg-[#e8f6fa] px-3 py-1 rounded-full">
              Step 1 — See how a prompt works
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e79] font-display">
              What&apos;s inside a good AI prompt?
            </h2>
            <p className="text-sm text-[#5a6b7b] max-w-md mx-auto">
              Tap each highlighted part below to discover what it does. You&apos;ll understand prompting in 60 seconds.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm p-5 sm:p-8">
            <InteractivePromptDemo />
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={scrollToBuilder}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1f4e79] text-white text-sm font-bold hover:bg-[#2fa8cc] transition-colors cursor-pointer"
            >
              <span>Now build your own prompt ↓</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CAPABILITY GALLERY — "What can AI help you do?"
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-[#e2e8f0] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block text-xs font-bold text-[#ff6b00] uppercase tracking-wider bg-[#fff9f0] px-3 py-1 rounded-full">
              Step 2 — Discover what AI can do
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e79] font-display">
              What do you want AI to help you with?
            </h2>
            <p className="text-sm text-[#5a6b7b] max-w-lg mx-auto">
              AI isn&apos;t just for answers. Tap a category to see what it can actually create for you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {CAPABILITY_CATEGORIES.map(cat => {
              const isSelected = selectedCapabilityId === cat.id;
              return (
                <div key={cat.id} className="space-y-2">
                  <button
                    type="button"
                    aria-expanded={isSelected}
                    onClick={() => {
                      setSelectedCapabilityId(prev => prev === cat.id ? '' : cat.id);
                      setSelectedSubCapId('');
                    }}
                    className={`
                      w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer group
                      ${isSelected
                        ? `${cat.colorBg} ${cat.colorBorder} border-2 shadow-md`
                        : 'bg-[#fafbfc] border-[#e2e8f0] hover:border-[#2fa8cc]/50 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected ? 'bg-white shadow-xs' : 'bg-[#f0f4f8] text-[#1f4e79]'
                    }`}>
                      <StudyIcon name={cat.id} className={`w-5 h-5 ${isSelected ? cat.colorText : 'text-[#1f4e79]'}`} />
                    </div>
                    <span className={`text-base font-extrabold font-display block ${isSelected ? cat.colorText : 'text-[#1a1a1a]'}`}>
                      {cat.label}
                    </span>
                    <span className={`text-xs block mt-0.5 leading-snug ${isSelected ? cat.colorText + ' opacity-75' : 'text-[#5a6b7b]'}`}>
                      {cat.tagline}
                    </span>
                  </button>

                  {/* Sub-capabilities — reveal inline */}
                  {isSelected && (
                    <div className={`${cat.colorBg} rounded-xl p-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150 border ${cat.colorBorder}`}>
                      {cat.subs.map(sub => (
                        <button
                          key={sub.id}
                          type="button"
                          aria-pressed={selectedSubCapId === sub.id}
                          onClick={() => handleCapabilityClick(cat.id, sub.id)}
                          className={`
                            w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer
                            focus-visible:outline-2 focus-visible:outline-[#1f4e79] focus-visible:outline-offset-1
                            ${selectedSubCapId === sub.id
                              ? 'bg-[#1f4e79] text-white'
                              : `bg-white/80 ${cat.colorText} hover:bg-white`
                            }
                          `}
                        >
                          <StudyIcon name={sub.id} className="w-3.5 h-3.5 shrink-0" />
                          <span className="flex-1">{sub.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-50" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedCapabilityId && (
            <div className="mt-6 text-center animate-in fade-in duration-200">
              <button
                type="button"
                onClick={scrollToBuilder}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build prompt for this →</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SINGLE-PAGE STUDY BUILDER
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        ref={builderRef}
        id="study-builder"
        className="bg-[#fafbfc] border-t border-[#e2e8f0] py-12 sm:py-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block text-xs font-bold text-white uppercase tracking-wider bg-[#1f4e79] px-3 py-1 rounded-full">
              Step 3 — Build your own
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e79] font-display">
              Build Your AI Study Prompt
            </h2>
            <p className="text-sm text-[#5a6b7b] max-w-md mx-auto">
              Select your class, subject, topic, and what you want. Your prompt builds automatically.
            </p>
          </div>

          <SinglePageBuilder
            initialCapabilityId={selectedCapabilityId}
            initialSubCapabilityId={selectedSubCapId}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EDUCATIONAL PHILOSOPHY — compact
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0d1f35] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              {
                icon: '💬',
                title: 'Teach yourself to ask',
                desc: 'A well-made prompt gets a useful answer. A vague question gets a confusing wall of text.'
              },
              {
                icon: '🔍',
                title: 'Always verify',
                desc: 'AI makes confident mistakes. Cross-check formulas, dates and facts against your textbook every time.'
              },
              {
                icon: '🧠',
                title: 'Learn, don\'t copy',
                desc: 'Prarambh Path teaches AI literacy — not how to cheat. The goal is your understanding, not the answer.'
              },
            ].map(item => (
              <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-3xl block">{item.icon}</span>
                <h3 className="text-sm font-bold text-white font-display">{item.title}</h3>
                <p className="text-xs text-white/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-sm font-semibold transition-all"
            >
              <span>Learn the 5-step verification checklist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
