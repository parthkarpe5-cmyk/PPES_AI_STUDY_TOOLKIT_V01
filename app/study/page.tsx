'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SinglePageBuilder } from '@/components/SinglePageBuilder';
import { Sparkles, ArrowLeft, ShieldAlert } from 'lucide-react';

function StudyPageContent() {
  const searchParams = useSearchParams();
  const initialCapabilityId = searchParams.get('capability') || searchParams.get('cap') || '';
  const initialSubCapabilityId = searchParams.get('sub') || '';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2fa8cc]/10 text-[#1f4e79] border border-[#2fa8cc]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#2fa8cc]" />
          <span>Step 2: Guided Study Builder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1f4e79] tracking-tight font-display">
          Build Your AI Study Prompt
        </h1>
        <p className="text-sm sm:text-base text-[#5a6b7b] max-w-md mx-auto leading-relaxed">
          Select your class, subject, topic, and goal. Your prompt builds automatically with expert teacher instructions.
        </p>
      </div>

      {/* Single Page Builder */}
      <SinglePageBuilder
        initialCapabilityId={initialCapabilityId}
        initialSubCapabilityId={initialSubCapabilityId}
      />
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-sm font-semibold text-[#5a6b7b]">
        Loading Study Builder…
      </div>
    }>
      <StudyPageContent />
    </Suspense>
  );
}
