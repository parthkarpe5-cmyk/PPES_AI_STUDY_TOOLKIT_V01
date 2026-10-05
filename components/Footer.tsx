import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand and Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Prarambh <span className="text-indigo-400">Path</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An AI literacy & study toolkit dedicated to school students in Classes 8–10. We teach you how to choose the right AI, build structured prompts, and verify answers with confidence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-indigo-300 text-xs font-medium border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Philosophy: <strong>Choose. Ask. Check. Learn.</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Toolkit Modules
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link href="/which-ai" className="hover:text-white transition-colors">
                  🎯 Which AI for My Task?
                </Link>
              </li>
              <li>
                <Link href="/prompt-builder" className="hover:text-white transition-colors">
                  💬 Guided Prompt Builder
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white transition-colors">
                  ✅ Check & Verify Answers
                </Link>
              </li>
            </ul>
          </div>

          {/* Responsible AI Notice */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Responsible AI Promise
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This toolkit works 100% locally in your browser. No login, no personal data collection, and no homework shortcuts. AI is here to strengthen your understanding, not replace your thinking.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Prarambh Path. Built for Class 8–10 School Students.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with educational care</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for curious learners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
