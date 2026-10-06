'use client';

import React, { useState, useEffect } from 'react';
import {
  ClassLevel,
  BoardType,
  SyllabusSource,
  StudyProfile,
  getStoredProfile,
  saveStoredProfile,
  BOARD_LABELS,
  CLASS_LABELS
} from '@/lib/study-profile';
import { GraduationCap, BookOpen, Sparkles, X, Check, FileUp, ShieldCheck } from 'lucide-react';

interface StudyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (profile: StudyProfile) => void;
}

export function StudyProfileModal({ isOpen, onClose, onSave }: StudyProfileModalProps) {
  const [classLevel, setClassLevel] = useState<ClassLevel>('10');
  const [board, setBoard] = useState<BoardType>('cbse');
  const [syllabusSource, setSyllabusSource] = useState<SyllabusSource>('builtin');
  const [customSyllabusName, setCustomSyllabusName] = useState<string>('');
  const [uploadFileName, setUploadFileName] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const p = getStoredProfile();
      setClassLevel(p.classLevel);
      setBoard(p.board);
      setSyllabusSource(p.syllabusSource);
      setCustomSyllabusName(p.customSyllabusName || '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = saveStoredProfile({
      classLevel,
      board,
      syllabusSource,
      customSyllabusName: syllabusSource === 'custom' ? (customSyllabusName || uploadFileName || 'My School Syllabus') : undefined,
    });
    if (onSave) onSave(updated);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      setCustomSyllabusName(file.name.replace(/\.[^/.]+$/, ''));
      setSyllabusSource('custom');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1f35]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e2e8f0] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d1f35] via-[#1f4e79] to-[#0d1f35] p-5 sm:p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white ring-1 ring-white/15">
              <GraduationCap className="w-5 h-5 text-[#2fa8cc]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f0d074]">
                Personalize Your Learning
              </span>
              <h2 className="text-xl font-bold text-white font-display">
                Your Study Space
              </h2>
            </div>
          </div>
          <p className="text-xs text-white/80 mt-2 leading-relaxed">
            Set your grade and board once. Prarambh Path will tailor syllabus chapters and prompts automatically without needing an account.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Question 1: Class */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#2fa8cc]" />
              1. Which class are you in?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['8', '9', '10'] as ClassLevel[]).map((c) => {
                const isSelected = classLevel === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setClassLevel(c)}
                    className={`py-3 px-3 rounded-xl font-bold text-sm border transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-sm ring-2 ring-[#1f4e79]/20'
                        : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] hover:border-[#2fa8cc]/50'
                    }`}
                  >
                    {CLASS_LABELS[c]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Board */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#2fa8cc]" />
              2. Which board do you follow?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(['cbse', 'icse', 'state', 'other'] as BoardType[]).map((b) => {
                const isSelected = board === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBoard(b)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#2fa8cc] text-white border-[#2fa8cc] shadow-sm ring-2 ring-[#2fa8cc]/20'
                        : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] hover:border-[#2fa8cc]/50'
                    }`}
                  >
                    {BOARD_LABELS[b]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Syllabus Choice */}
          <div className="space-y-2.5 pt-2 border-t border-[#e2e8f0]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2fa8cc]" />
              3. Curriculum Context
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSyllabusSource('builtin')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  syllabusSource === 'builtin'
                    ? 'bg-[#e8f6fa] border-[#2fa8cc] ring-2 ring-[#2fa8cc]/20'
                    : 'bg-[#fafbfc] border-[#e2e8f0] hover:bg-[#e8f6fa]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1f4e79]">Standard Syllabus</span>
                  {syllabusSource === 'builtin' && <Check className="w-4 h-4 text-[#2fa8cc]" />}
                </div>
                <p className="text-[11px] text-[#5a6b7b] mt-1">
                  Built-in NCERT / Board chapter breakdown. Recommended.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSyllabusSource('custom')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  syllabusSource === 'custom'
                    ? 'bg-[#e8f6fa] border-[#2fa8cc] ring-2 ring-[#2fa8cc]/20'
                    : 'bg-[#fafbfc] border-[#e2e8f0] hover:bg-[#e8f6fa]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1f4e79]">Use My Syllabus</span>
                  {syllabusSource === 'custom' && <Check className="w-4 h-4 text-[#2fa8cc]" />}
                </div>
                <p className="text-[11px] text-[#5a6b7b] mt-1">
                  Upload school syllabus PDF or custom chapter list.
                </p>
              </button>
            </div>

            {/* Custom Syllabus Upload / Entry boundary */}
            {syllabusSource === 'custom' && (
              <div className="p-3.5 rounded-xl bg-[#fafbfc] border border-[#2fa8cc]/30 space-y-2.5 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1f4e79]">
                  <FileUp className="w-4 h-4 text-[#2fa8cc]" />
                  <span>Attach School Syllabus (PDF or text)</span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2fa8cc] file:text-white hover:file:bg-[#2fa8cc]/90 cursor-pointer"
                />
                {uploadFileName && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Attached: {uploadFileName} (Will be used to contextualize your study prompts)
                  </p>
                )}
                <div className="pt-1">
                  <input
                    type="text"
                    value={customSyllabusName}
                    onChange={(e) => setCustomSyllabusName(e.target.value)}
                    placeholder="Or enter syllabus title (e.g. Goa Board Mid-Term 2026)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e2e8f0] bg-white text-[#1a1a1a]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-[#5a6b7b] bg-[#fafbfc] p-2.5 rounded-xl border border-[#e2e8f0]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Saved securely in your browser. No sign-up or tracking needed.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5a6b7b] hover:text-[#1a1a1a] rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#ff6b00] to-orange-600 rounded-xl shadow-md shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Save Study Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
