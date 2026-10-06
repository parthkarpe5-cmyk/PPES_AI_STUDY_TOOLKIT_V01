'use client';

import React, { useState } from 'react';
import { GeneratedPromptResult } from '@/lib/prompt-generator';
import { Copy, Check, ExternalLink, Sparkles, ChevronDown, ChevronUp, ArrowRight, ShieldAlert } from 'lucide-react';
import { StudyIcon } from '@/components/StudyIcon';
import Link from 'next/link';

interface PromptResultCardProps {
  result: GeneratedPromptResult;
  onEditAgain?: () => void;
}

export function PromptResultCard({ result }: PromptResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
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

  // Friendly 6 prompt ingredients
  const friendlyBreakdown = [
    {
      key: 'role',
      icon: '🎭',
      question: 'Who should AI act like?',
      label: 'Expert Teacher Persona',
      why: 'Instructs the AI to act as a supportive school teacher rather than an aloof calculator or casual chatbot.',
      snippet: `Act as an encouraging, highly experienced Class ${result.meta.classLevel} ${result.meta.subjectName} teacher.`
    },
    {
      key: 'studentLevel',
      icon: '🎓',
      question: 'What class am I in?',
      label: 'Grade Level & Syllabus Depth',
      why: 'Prevents the AI from using confusing college math or babyish nursery explanations. Keeps it focused on Class ' + result.meta.classLevel + '.',
      snippet: `Class ${result.meta.classLevel} student level under standard curriculum.`
    },
    {
      key: 'context',
      icon: '📚',
      question: 'What am I studying?',
      label: 'Subject & Topic Context',
      why: 'Anchors the AI strictly to your chapter topic so it doesn’t wander into irrelevant syllabus areas.',
      snippet: `Topic: "${result.meta.topic}" in ${result.meta.subjectName}.`
    },
    {
      key: 'task',
      icon: '🎯',
      question: 'What do I want?',
      label: 'Clear Learning Goal',
      why: 'Specifies whether you want concept intuition, short notes, or practice tests.',
      snippet: `${result.meta.goalLabel} (${result.meta.styleLabel} explanation style).`
    },
    {
      key: 'outputFormat',
      icon: '📋',
      question: 'How should the answer look?',
      label: 'Readable Structure',
      why: 'Demands clear bullet points, bold keywords, and organized sections instead of a messy wall of text.',
      snippet: `Clear headings, bullet points, and bold key terminology.`
    },
    {
      key: 'constraints',
      icon: '🛑',
      question: 'What should AI avoid?',
      label: 'Anti-Cheating Guardrails',
      why: 'Crucial: Explicitly orders the AI NOT to do your homework for you, requiring step-by-step Socratic hints instead.',
      snippet: `Help me understand concepts rather than simply giving me an answer to copy.`
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm overflow-hidden transition-all duration-200 animate-in fade-in-50 space-y-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1f35] via-[#1f4e79] to-[#0d1f35] p-4 sm:p-6 text-white border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center ring-1 ring-white/15 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0d074]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#2fa8cc]">
                Curriculum-Grounded Study Prompt
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white font-display leading-tight">
                {result.meta.topic} • Class {result.meta.classLevel} {result.meta.subjectName}
              </h2>
            </div>
          </div>

          {/* Primary 1-Click Copy CTA */}
          <button
            type="button"
            onClick={handleCopy}
            id="copy-prompt-btn"
            className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer shrink-0 min-h-[44px] ${
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

        {/* Aria Live Announcement for accessibility */}
        <div aria-live="polite" className="sr-only">
          {copied ? 'Prompt successfully copied to clipboard. Ready to paste in your AI tool.' : ''}
        </div>
      </div>

      {/* Main Prompt Box */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="relative">
          <div className="bg-[#0d1f35] text-slate-100 rounded-2xl p-3.5 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap border border-white/10 selection:bg-[#ff6b00] selection:text-white max-h-80 sm:max-h-96">
            {result.fullPrompt}
          </div>
          {copied && (
            <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[11px] sm:text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 animate-in fade-in zoom-in duration-150 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Copied! Ready to paste</span>
            </div>
          )}
        </div>

        {/* Step 2: Open External AI Buttons */}
        <div className="bg-[#fafbfc] border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-xs font-bold text-[#1f4e79] uppercase tracking-wider flex items-center gap-1.5 font-display">
              <span>🚀</span> Ready to use? Open an AI tool & paste your prompt:
            </span>
            <span className="text-[11px] text-[#5a6b7b]">
              Clicks automatically copy prompt & open the tool
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => copyAndOpen('https://chatgpt.com')}
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
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
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#1f4e79]">Gemini</span>
                <span className="text-[10px] text-[#5a6b7b]">Research & Diagrams</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
            </button>

            <button
              type="button"
              onClick={() => copyAndOpen('https://claude.ai')}
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
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
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#1f4e79]">NotebookLM</span>
                <span className="text-[10px] text-[#5a6b7b]">From Uploaded PDF</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
            </button>
          </div>
        </div>

        {/* Student Privacy Callout */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="leading-relaxed">
            <strong>🔒 Stay safe:</strong> When using external AI tools, never share personal phone numbers, your address, passwords, or private photos.
          </p>
        </div>

        {/* TEACH PROMPTING: Prominently teach WHY this prompt works */}
        <div className="border-t border-[#e2e8f0] pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2fa8cc] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#2fa8cc]" />
                <span>The Learning Advantage</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1f4e79] font-display">
                💡 Why does this prompt work so well?
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs font-bold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1 cursor-pointer"
            >
              <span>{showExplanation ? 'Hide details' : 'Show details'}</span>
              {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="text-xs text-[#5a6b7b] leading-relaxed">
            Good prompts give AI clear instructions. Here is how your prompt was built so you can do this yourself next time:
          </p>

          {showExplanation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {friendlyBreakdown.map((item) => {
                const isExpanded = expandedItem === item.key;
                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl border border-[#e2e8f0] bg-[#fafbfc] hover:bg-white hover:border-[#2fa8cc]/50 transition-all space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#e8f6fa] text-[#1f4e79] flex items-center justify-center shrink-0">
                          <StudyIcon name={item.key} className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-[#1f4e79] font-display">
                          {item.question}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2fa8cc]/10 text-[#1f4e79]">
                        {item.label}
                      </span>
                    </div>

                    <p className="text-[#5a6b7b] leading-relaxed">
                      {item.why}
                    </p>

                    <button
                      type="button"
                      onClick={() => setExpandedItem(isExpanded ? null : item.key)}
                      className="text-[11px] font-semibold text-[#2fa8cc] hover:underline pt-0.5 inline-block cursor-pointer"
                    >
                      {isExpanded ? 'Hide prompt text ▲' : 'View in prompt ▼'}
                    </button>

                    {isExpanded && (
                      <div className="p-2 rounded-lg bg-white border border-[#e2e8f0] font-mono text-[11px] text-[#1a1a1a] mt-1.5">
                        {item.snippet}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Verification Check Callout */}
        <div className="bg-[#fff9f0] border border-[#ff6b00]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Next Step: Never blindly copy the AI answer
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                When you get your answer, cross-check formulas and definitions against your textbook before putting them in your school notebook.
              </p>
            </div>
          </div>

          <Link
            href="/verify"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#ff6b00]/40 text-[#ff6b00] font-bold text-xs hover:bg-[#ff6b00] hover:text-white transition-all shadow-xs shrink-0"
          >
            <span>Verify Answer Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
