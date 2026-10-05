import React from 'react';
import { VerificationChecklist } from '@/components/VerificationChecklist';
import { ShieldAlert, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Check My Answer — 5-Step Verification Guide | Prarambh Path',
  description:
    'Don’t blindly trust AI. Learn the 5-step verification checklist to verify formulas, dates, and concepts against your official textbook.',
};

export default function VerifyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Step 3: Check & Verify</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Don&apos;t blindly trust AI.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          AI can make mistakes, hallucinate fake dates, and generate incorrect formulas. Always check important information before using it in class or exams.
        </p>
      </div>

      {/* Verification checklist component */}
      <VerificationChecklist />
    </div>
  );
}
