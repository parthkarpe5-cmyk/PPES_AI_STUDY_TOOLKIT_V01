'use client';

import React, { useState } from 'react';
import {
  X,
  MessageSquareHeart,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  RotateCcw
} from 'lucide-react';
import { useFeedback } from '@/components/FeedbackContext';
import {
  FeedbackExperience,
  FeedbackCategory,
  FeedbackClass,
  FEEDBACK_CATEGORIES,
  FEEDBACK_EXPERIENCES,
  FEEDBACK_CLASSES,
} from '@/data/feedback';

export function FeedbackModal() {
  const { isOpen, closeFeedback } = useFeedback();

  // Form State
  const [experience, setExperience] = useState<FeedbackExperience>('Good');
  const [category, setCategory] = useState<FeedbackCategory>('Prompt builder');
  const [feedback, setFeedback] = useState('');
  const [studentClass, setStudentClass] = useState<FeedbackClass>('');
  const [websiteUrl, setWebsiteUrl] = useState(''); // Honeypot field for anti-bot spam

  // Stable request ID per submit attempt — regenerated on every new form fill
  // This is forwarded server-side only; never used for auth or tracking students
  const generateRequestId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const [requestId, setRequestId] = useState<string>(generateRequestId);

  // Submission Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setExperience('Good');
    setCategory('Prompt builder');
    setFeedback('');
    setStudentClass('');
    setWebsiteUrl('');
    setIsSuccess(false);
    setErrorMessage(null);
    // Fresh request ID for next submission
    setRequestId(generateRequestId());
  };

  const handleClose = () => {
    resetForm();
    closeFeedback();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = feedback.trim();
    if (!trimmed || trimmed.length < 5) {
      setErrorMessage('Please write at least a few words describing your feedback or suggestion.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experience,
          category,
          feedback: trimmed,
          studentClass: studentClass || undefined,
          websiteUrl, // honeypot
          requestId,  // forwarded server-side for dedup; not sent to Apps Script by the browser
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || data.saved !== true) {
        setErrorMessage(
          data.error || 'Something went wrong while saving your feedback. Please try again.'
        );
        setIsSubmitting(false);
        return;
      }

      // Success confirmed by server (saved:true in upstream response)
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err: unknown) {
      console.error('Feedback submit error:', err);
      setErrorMessage('Network error: Unable to send feedback. Please check your internet connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0d1f35]/70 backdrop-blur-sm transition-opacity"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-[#0d1f35] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2fa8cc]/20 text-[#2fa8cc] flex items-center justify-center">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
            <div>
              <h2 id="feedback-dialog-title" className="text-sm sm:text-base font-bold font-display leading-tight">
                Help us make your study toolkit better!
              </h2>
              <p className="text-[11px] text-white/60">
                Prarambha Path Evening School
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close feedback panel"
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Notice Banner */}
        <div className="px-5 py-2.5 bg-amber-50/80 border-b border-amber-200/60 flex items-start gap-2 text-xs text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Safe &amp; Anonymous:</strong> Please don&apos;t share personal details (names, phone numbers, school IDs). Your feedback will be read by the PPES team. This form is for toolkit suggestions, not urgent help.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            /* Submission Success State */
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#1f4e79] font-display">
                  Thank you!
                </h3>
                <p className="text-sm text-[#5a6b7b] max-w-md mx-auto leading-relaxed">
                  Your feedback helps PPES improve the toolkit for every learner in Savardhat and beyond.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Send another suggestion</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1f4e79] text-white text-xs font-bold hover:bg-[#2fa8cc] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam Honeypot Field (invisible to students, visible to bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="websiteUrl">Do not fill this field</label>
                <input
                  type="text"
                  id="websiteUrl"
                  name="websiteUrl"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>

              {/* 1. Experience Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] block">
                  1. How was your experience? <span className="text-[#ff6b00]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {FEEDBACK_EXPERIENCES.map((item) => {
                    const isSelected = experience === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setExperience(item.value)}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[48px] ${
                          isSelected
                            ? 'bg-[#e8f6fa] border-[#2fa8cc] text-[#1f4e79] shadow-sm ring-2 ring-[#2fa8cc]/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xl" role="img" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Feedback Category */}
              <div className="space-y-2">
                <label htmlFor="feedback-category" className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] block">
                  2. What is your feedback about? <span className="text-[#ff6b00]">*</span>
                </label>
                <select
                  id="feedback-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2fa8cc] focus:border-transparent cursor-pointer"
                >
                  {FEEDBACK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Feedback Textarea (Required) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="feedback-text" className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] block">
                    3. Your feedback or suggestion <span className="text-[#ff6b00]">*</span>
                  </label>
                  <span className="text-[11px] text-[#5a6b7b]">
                    {feedback.length}/2000
                  </span>
                </div>
                <textarea
                  id="feedback-text"
                  required
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us what you liked, what felt confusing, or an idea to make studying easier..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-[#1a1a1a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2fa8cc] focus:border-transparent resize-y min-h-[100px]"
                />
              </div>

              {/* 4. Optional Class Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] block">
                  4. Your Class <span className="text-[#5a6b7b] font-normal lowercase">(optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FEEDBACK_CLASSES.map((cls) => {
                    const isSelected = studentClass === cls.value;
                    return (
                      <button
                        key={cls.value}
                        type="button"
                        onClick={() => setStudentClass(isSelected ? '' : cls.value)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0d1f35] text-white border-[#0d1f35] shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {cls.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || feedback.trim().length < 5}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#ff6b00] hover:bg-orange-600 shadow-md shadow-[#ff6b00]/20 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit feedback</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
