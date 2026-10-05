'use client';

import React, { useState } from 'react';
import { GeneratedPromptResult } from '@/lib/prompt-generator';
import { Copy, Check, ExternalLink, Sparkles, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PromptResultCardProps {
  result: GeneratedPromptResult;
  onEditAgain?: () => void;
}

export function PromptResultCard({ result, onEditAgain }: PromptResultCardProps) {
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 animate-in fade-in-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 p-5 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                Generated High-Quality Prompt
              </span>
              <h2 className="text-lg font-bold text-white leading-tight">
                {result.meta.topic} • Class {result.meta.classLevel} {result.meta.subjectName}
              </h2>
            </div>
          </div>

          {/* Copy CTA Button */}
          <button
            type="button"
            onClick={handleCopy}
            id="copy-prompt-btn"
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm active:scale-95 ${
              copied
                ? 'bg-emerald-500 text-white shadow-emerald-700/20'
                : 'bg-white text-indigo-700 hover:bg-indigo-50 hover:shadow-md'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'prompt'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-indigo-100 hover:bg-white/10'
            }`}
          >
            📄 Complete Prompt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('why')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'why'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-indigo-100 hover:bg-white/10'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why this prompt works ({result.breakdown.length} components)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Complete Prompt View */}
      {activeTab === 'prompt' && (
        <div className="p-5 sm:p-6 space-y-5">
          <div className="relative">
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800 selection:bg-indigo-500 selection:text-white">
              {result.fullPrompt}
            </div>
            {copied && (
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5 animate-in fade-in zoom-in duration-150">
                <Check className="w-3.5 h-3.5" />
                <span>Ready to paste in your AI tool!</span>
              </div>
            )}
          </div>

          {/* Quick Launch Recommendations */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚀</span> Ready to use? Open an AI tool & paste (Ctrl+V or Cmd+V)
              </span>
              <Link
                href="/which-ai"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Not sure which AI to open? Check guidance →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => copyAndOpen('https://chatgpt.com')}
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs font-medium text-slate-800 flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">ChatGPT</span>
                  <span className="text-[10px] text-slate-500">General Learning</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                type="button"
                onClick={() => copyAndOpen('https://gemini.google.com')}
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs font-medium text-slate-800 flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Gemini</span>
                  <span className="text-[10px] text-slate-500">Research & Vision</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                type="button"
                onClick={() => copyAndOpen('https://claude.ai')}
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs font-medium text-slate-800 flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Claude</span>
                  <span className="text-[10px] text-slate-500">Structured Notes</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                type="button"
                onClick={() => copyAndOpen('https://notebooklm.google.com')}
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs font-medium text-slate-800 flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">NotebookLM</span>
                  <span className="text-[10px] text-slate-500">From Your PDF</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </button>
            </div>
          </div>

          {/* Verification Reminder Bar */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Next Step: Never blindly copy AI answers!
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                After you get the answer from AI, use our 5-step verification checklist to cross-check formulas, definitions, and facts against your textbook.
              </p>
              <Link
                href="/verify"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:underline pt-1"
              >
                Open Check My Answer Checklist <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Why This Prompt Works (Educational Breakdown) */}
      {activeTab === 'why' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              The Architecture of an Effective Prompt
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              High-performing prompts aren&apos;t magic—they are structured instructions with 6 key ingredients.
            </p>
          </div>

          <div className="space-y-3">
            {result.breakdown.map((item) => {
              const isExpanded = expandedItem === item.key;
              return (
                <div
                  key={item.key}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/60 transition-colors hover:bg-slate-50"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedItem(isExpanded ? null : item.key)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 focus:outline-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase">
                            {item.name}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{item.whyItWorks}</p>
                      </div>
                    </div>
                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-200/80 bg-white space-y-2 text-xs">
                      <span className="font-semibold text-slate-700 block">
                        Included in your prompt as:
                      </span>
                      <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-[11px] text-slate-800 border border-slate-200">
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
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Back to complete prompt view <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
