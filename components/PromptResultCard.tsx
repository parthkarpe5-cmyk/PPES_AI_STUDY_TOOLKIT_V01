'use client';

import React, { useState, useRef } from 'react';
import { GeneratedPromptResult } from '@/lib/prompt-generator';
import {
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  BookOpen,
  Brain,
  UserCheck
} from 'lucide-react';
import { StudyIcon } from '@/components/StudyIcon';

interface PromptResultCardProps {
  result: GeneratedPromptResult;
  onEditAgain?: () => void;
}

export function PromptResultCard({ result }: PromptResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false); // Optional, collapsed by default
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const promptTextRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    setCopyError(false);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(result.fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Fallback
      try {
        const textarea = document.createElement('textarea');
        textarea.value = result.fullPrompt;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } else {
          setCopyError(true);
        }
      } catch {
        setCopyError(true);
      }
    }
  };

  const handleSelectAllText = () => {
    if (promptTextRef.current) {
      const range = document.createRange();
      range.selectNodeContents(promptTextRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const copyAndOpen = (url: string) => {
    handleCopy();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const friendlyBreakdown = [
    {
      key: 'role',
      icon: '🎭',
      question: 'Who should AI act like?',
      label: 'Expert Teacher Persona',
      why: 'Instructs the AI to act as a supportive school teacher rather than an aloof answer machine.',
      snippet: `Act as an encouraging, patient, and highly experienced Class ${result.meta.classLevel} ${result.meta.subjectName} teacher.`
    },
    {
      key: 'studentLevel',
      icon: '🎓',
      question: 'What class and board am I in?',
      label: 'Grade Level & Syllabus Depth',
      why: 'Prevents the AI from using confusing college math or nursery explanations. Keeps it focused on Class ' + result.meta.classLevel + '.',
      snippet: `Class ${result.meta.classLevel} student level under standard curriculum.`
    },
    {
      key: 'context',
      icon: '📚',
      question: 'What am I studying?',
      label: 'Subject & Topic Context',
      why: 'Anchors the AI strictly to your chapter topic so it doesn’t wander into irrelevant areas.',
      snippet: `Topic: "${result.meta.topic}" in ${result.meta.subjectName}.`
    },
    {
      key: 'task',
      icon: '🎯',
      question: 'What is my goal?',
      label: 'Clear Learning Goal',
      why: 'Specifies whether you want concept intuition, short notes, problem-solving hints, or practice questions.',
      snippet: `${result.meta.goalLabel} (${result.meta.styleLabel} explanation style).`
    },
    {
      key: 'outputFormat',
      icon: '📋',
      question: 'How should the answer look?',
      label: 'Readable Structure',
      why: 'Demands clear bullet points, bold key terms, and organized sections instead of a messy wall of text.',
      snippet: `Clear headings, bullet points, and bold key terminology.`
    },
    {
      key: 'constraints',
      icon: '🛑',
      question: 'What should AI avoid?',
      label: 'Anti-Cheating Guardrails',
      why: 'Explicitly instructs the AI not to give away answers directly, requiring hints and verification reminders.',
      snippet: `Do not simply solve problems without showing the method; withhold practice answers until attempted.`
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm overflow-hidden transition-all duration-200 animate-in fade-in space-y-0">
      {/* ── 1. HEADER BANNER: Topic & Learning Goal Summary ── */}
      <div className="bg-gradient-to-r from-[#0d1f35] via-[#1f4e79] to-[#0d1f35] p-4 sm:p-6 text-white border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center ring-1 ring-white/15 shrink-0">
              <Sparkles className="w-5 h-5 text-[#f0d074]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#2fa8cc]">
                Prepared Study Prompt · {result.meta.goalLabel}
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white font-display leading-tight">
                {result.meta.topic} · Class {result.meta.classLevel} {result.meta.subjectName}
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
                : 'bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 hover:scale-102'
            }`}
            aria-label="Copy Generated Prompt"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Study Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Aria Live Announcement for accessibility */}
        <div aria-live="polite" className="sr-only">
          {copied ? 'Prompt successfully copied to clipboard. Ready to paste in your external AI tool.' : ''}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Copy Error Fallback Message */}
        {copyError && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
            <span>Clipboard permission was blocked. You can manually select and copy the text below.</span>
            <button
              type="button"
              onClick={handleSelectAllText}
              className="text-xs font-bold text-[#1f4e79] underline cursor-pointer shrink-0"
            >
              Select All Text
            </button>
          </div>
        )}

        {/* ── 2. EXPANDABLE PROMPT ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1f4e79] uppercase tracking-wider flex items-center gap-1.5 font-display">
              <span>📝</span> Prompt Preview
            </span>
            <button
              type="button"
              onClick={() => setPromptExpanded(v => !v)}
              className="text-xs font-semibold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1 cursor-pointer"
              aria-expanded={promptExpanded}
            >
              <span>{promptExpanded ? 'Collapse prompt' : 'Expand full prompt'}</span>
              {promptExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="relative">
            <div
              ref={promptTextRef}
              className={`bg-[#0d1f35] text-slate-100 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap border border-white/10 selection:bg-[#ff6b00] selection:text-white transition-all ${
                promptExpanded ? 'max-h-none' : 'max-h-48 overflow-y-hidden'
              }`}
            >
              {result.fullPrompt}
            </div>

            {!promptExpanded && (
              <div
                onClick={() => setPromptExpanded(true)}
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d1f35] to-transparent rounded-b-2xl flex items-end justify-center pb-2 cursor-pointer"
              >
                <span className="text-[11px] font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                  <span>Tap to expand full prompt</span>
                  <ChevronDown className="w-3 h-3" />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── 3. CHOOSE A SUITABLE AI TOOL: "Open the tool and paste your prompt" ── */}
        <div className="bg-[#fafbfc] border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-xs font-bold text-[#1f4e79] uppercase tracking-wider flex items-center gap-1.5 font-display">
              <span>🚀</span> Open a tool and paste your prompt:
            </span>
            <span className="text-[11px] text-[#5a6b7b]">
              Clicks automatically copy prompt &amp; open the official website
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => copyAndOpen('https://chatgpt.com')}
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer min-h-[44px]"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#1f4e79]">ChatGPT</span>
                <span className="text-[10px] text-[#5a6b7b]">General explanations</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
            </button>

            <button
              type="button"
              onClick={() => copyAndOpen('https://gemini.google.com')}
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer min-h-[44px]"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#1f4e79]">Gemini</span>
                <span className="text-[10px] text-[#5a6b7b]">Diagrams &amp; research</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
            </button>

            <button
              type="button"
              onClick={() => copyAndOpen('https://notebooklm.google.com')}
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer min-h-[44px]"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#1f4e79]">NotebookLM</span>
                <span className="text-[10px] text-[#5a6b7b]">From your textbook PDF</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
            </button>

            <button
              type="button"
              onClick={() => copyAndOpen('https://www.perplexity.ai')}
              className="p-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#2fa8cc] hover:bg-[#e8f6fa]/60 text-left transition-all text-xs font-medium text-[#1a1a1a] flex items-center justify-between group cursor-pointer min-h-[44px]"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#1f4e79]">Perplexity</span>
                <span className="text-[10px] text-[#5a6b7b]">Cited web sources</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2fa8cc]" />
            </button>
          </div>
        </div>

        {/* ── 4. THREE PRACTICAL CHECKING STEPS ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#fff9f0] border border-[#ff6b00]/25 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#8a3800] uppercase tracking-wide font-display">
                Three Practical Checking Steps Before You Trust the Answer
              </h3>
              <p className="text-[11px] text-[#a45214]">
                AI can make confident mistakes. Always run these three checks:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white border border-[#ff6b00]/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1f4e79]">
                <BookOpen className="w-3.5 h-3.5 text-[#ff6b00]" />
                <span>1. Check against textbook</span>
              </div>
              <p className="text-[11px] text-[#5a6b7b] leading-relaxed">
                Cross-check facts, formulas, and units against your official school book.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#ff6b00]/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1f4e79]">
                <Brain className="w-3.5 h-3.5 text-[#ff6b00]" />
                <span>2. In your own words</span>
              </div>
              <p className="text-[11px] text-[#5a6b7b] leading-relaxed">
                Explain the concept simply in your rough notebook without looking at the screen.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#ff6b00]/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1f4e79]">
                <UserCheck className="w-3.5 h-3.5 text-[#ff6b00]" />
                <span>3. Ask your teacher</span>
              </div>
              <p className="text-[11px] text-[#5a6b7b] leading-relaxed">
                Note down any unclear or contradictory points to ask your teacher in school.
              </p>
            </div>
          </div>
        </div>

        {/* ── 5. OPTIONAL: "Why this prompt works" ── */}
        <div className="border-t border-[#e2e8f0] pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs font-bold text-[#2fa8cc] hover:text-[#1f4e79] flex items-center gap-1.5 cursor-pointer"
              aria-expanded={showExplanation}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showExplanation ? 'Hide why this prompt works' : 'Why does this prompt work? (Optional)'}</span>
              {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <span className="text-[11px] text-[#5a6b7b]">Prompt Literacy</span>
          </div>

          {showExplanation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 animate-in fade-in duration-150">
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
                      {isExpanded ? 'Hide prompt snippet ▲' : 'View in prompt ▼'}
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

        {/* Student Privacy Callout */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#5a6b7b] flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
          <p className="leading-relaxed">
            <strong>Privacy reminder:</strong> When pasting into external tools, never share personal phone numbers, your address, or passwords.
          </p>
        </div>
      </div>
    </div>
  );
}
