'use client';

import React, { useState } from 'react';
import { GeneratedPromptResult } from '@/lib/prompt-generator';
import { Copy, Check, ExternalLink, Sparkles, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PromptResultCardProps {
  result: GeneratedPromptResult;
  onEditAgain?: () => void;
}

export function PromptResultCard({ result }: PromptResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'why'>('prompt');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = result.fullPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const copyAndOpen = (url: string) => {
    handleCopy();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden transition-all duration-200 animate-in fade-in-50">
      {/* Header Banner - PPES Academic Deep Blue */}
      <div className="bg-gradient-to-r from-[#0d1f35] via-[#1f4e79] to-[#0d1f35] p-5 text-white border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center ring-1 ring-white/15">
              <Sparkles className="w-4 h-4 text-[#f0d074]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2fa8cc]">
                Generated High-Yield Prompt
              </span>
              <h2 className="text-lg font-bold text-white leading-tight font-display">
                {result.meta.topic} • Class {result.meta.classLevel} {result.meta.subjectName}
              </h2>
            </div>
          </div>

          {/* Copy CTA Button - PPES Saffron Action */}
          <button
            type="button"
            onClick={handleCopy}
            id="copy-prompt-btn"
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-700/20'
                : 'bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 hover:scale-105'
            }`}
            aria-label="Copy Generated Prompt"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white animate-bounce" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/15">
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prompt'
                ? 'bg-white text-[#1f4e79] shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            📄 Complete Prompt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('why')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'why'
                ? 'bg-white text-[#1f4e79] shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2fa8cc]" />
            <span>Why this prompt works ({result.breakdown.length} components)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Complete Prompt View */}
      {activeTab === 'prompt' && (
        <div className="p-5 sm:p-6 space-y-5">
          <div className="relative">
            <div className="bg-[#0d1f35] text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap border border-white/10 selection:bg-[#ff6b00] selection:text-white">
              {result.fullPrompt}
            </div>
            {copied && (
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 animate-in fade-in zoom-in duration-150 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Ready to paste in your AI tool!</span>
              </div>
            )}
          </div>

          {/* Quick Launch Recommendations */}
          <div className="bg-[#fafbfc] border border-[#e2e8f0] rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-[#1f4e79] uppercase tracking-wider flex items-center gap-1.5 font-display">
                <span>🚀</span> Ready to use? Open an AI tool & paste (Ctrl+V / Cmd+V)
              </span>
              <Link
                href="/which-ai"
                className="text-xs font-semibold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1"
              >
                Not sure which AI to open? Check guidance →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => copyAndOpen('https://chatgpt.com')}
                className="p-2.5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/50 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-[#1f4e79]">ChatGPT</span>
                  <span className="text-[10px] text-[#5a6b7b]">General Learning</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
              </button>

              <button
                type="button"
                onClick={() => copyAndOpen('https://gemini.google.com')}
                className="p-2.5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/50 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-[#1f4e79]">Gemini</span>
                  <span className="text-[10px] text-[#5a6b7b]">Research & Vision</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
              </button>

              <button
                type="button"
                onClick={() => copyAndOpen('https://claude.ai')}
                className="p-2.5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/50 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-[#1f4e79]">Claude</span>
                  <span className="text-[10px] text-[#5a6b7b]">Structured Notes</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
              </button>

              <button
                type="button"
                onClick={() => copyAndOpen('https://notebooklm.google.com')}
                className="p-2.5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/50 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-[#1f4e79]">NotebookLM</span>
                  <span className="text-[10px] text-[#5a6b7b]">From Your PDF</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
              </button>
            </div>
          </div>

          {/* Verification Reminder Bar */}
          <div className="bg-[#fff9f0] border border-[#ff6b00]/30 rounded-xl p-4 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Next Step: Never blindly copy AI answers!
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                After you receive the explanation from AI, use our 5-step verification checklist to cross-check formulas, definitions, and facts against your textbook.
              </p>
              <Link
                href="/verify"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#ff6b00] hover:underline pt-1"
              >
                Open Check My Answer Checklist <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Why This Prompt Works (Educational Breakdown) */}
      {activeTab === 'why' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="border-b border-[#e2e8f0] pb-3">
            <h3 className="text-base font-bold text-[#1f4e79] font-display">
              The Architecture of an Effective Prompt
            </h3>
            <p className="text-xs text-[#5a6b7b] mt-0.5">
              High-performing prompts aren&apos;t magic—they are structured instructions with 6 key ingredients.
            </p>
          </div>

          <div className="space-y-3">
            {result.breakdown.map((item) => {
              const isExpanded = expandedItem === item.key;
              return (
                <div
                  key={item.key}
                  className="border border-[#e2e8f0] rounded-xl overflow-hidden bg-[#fafbfc] transition-colors hover:bg-[#f5f8fa]"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedItem(isExpanded ? null : item.key)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 focus:outline-hidden cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#2fa8cc]/15 text-[#1f4e79] border border-[#2fa8cc]/30 uppercase">
                            {item.name}
                          </span>
                          <span className="text-xs font-bold text-[#1f4e79]">{item.title}</span>
                        </div>
                        <p className="text-xs text-[#5a6b7b] mt-1">{item.whyItWorks}</p>
                      </div>
                    </div>
                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-[#e2e8f0] bg-white space-y-2 text-xs">
                      <span className="font-semibold text-[#1a1a1a] block">
                        Included in your prompt as:
                      </span>
                      <div className="p-2.5 rounded-lg bg-[#fafbfc] font-mono text-[11px] text-[#1a1a1a] border border-[#e2e8f0]">
                        {item.extractedSnippet}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('prompt')}
              className="text-xs font-bold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1 cursor-pointer"
            >
              Back to complete prompt view <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
