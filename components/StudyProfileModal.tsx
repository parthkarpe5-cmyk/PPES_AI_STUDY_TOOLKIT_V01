'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ClassLevel,
  BoardType,
  SyllabusSource,
  StudyProfile,
  getStoredProfile,
  saveStoredProfile,
  clearStoredProfile,
  BOARD_LABELS,
  CLASS_LABELS
} from '@/lib/study-profile';
import { GraduationCap, BookOpen, X, Check, ShieldCheck, Trash2, FileText } from 'lucide-react';

interface StudyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (profile: StudyProfile) => void;
}

export function StudyProfileModal({ isOpen, onClose, onSave }: StudyProfileModalProps) {
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [classLevel, setClassLevel] = useState<ClassLevel>('10');
  const [board, setBoard] = useState<BoardType>('cbse');
  const [syllabusSource, setSyllabusSource] = useState<SyllabusSource>('builtin');
  const [customSyllabusName, setCustomSyllabusName] = useState<string>('');
  const [pastedSyllabusText, setPastedSyllabusText] = useState<string>('');
  const [clearedNotice, setClearedNotice] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      const p = getStoredProfile();
      setClassLevel(p.classLevel);
      setBoard(p.board);
      setSyllabusSource(p.syllabusSource);
      setCustomSyllabusName(p.customSyllabusName || '');
      setPastedSyllabusText(p.pastedSyllabusText || '');
      setClearedNotice(false);
    }
  }

  // Keyboard accessibility: Escape key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = saveStoredProfile({
      classLevel,
      board,
      syllabusSource,
      customSyllabusName: syllabusSource === 'custom' ? (customSyllabusName || 'My School Syllabus') : undefined,
      pastedSyllabusText: syllabusSource === 'custom' && pastedSyllabusText.trim() ? pastedSyllabusText.trim() : undefined,
    });
    if (onSave) onSave(updated);
    onClose();
  };

  const handleClear = () => {
    clearStoredProfile();
    setClassLevel('10');
    setBoard('cbse');
    setSyllabusSource('builtin');
    setCustomSyllabusName('');
    setPastedSyllabusText('');
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0d1f35]/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e2e8f0] overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d1f35] via-[#1f4e79] to-[#0d1f35] p-5 sm:p-6 text-white relative shrink-0">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white"
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
                Study Context &amp; Privacy
              </span>
              <h2 id="profile-modal-title" className="text-xl font-bold text-white font-display">
                Your Study Space
              </h2>
            </div>
          </div>
          <p className="text-xs text-white/80 mt-2 leading-relaxed">
            Set your grade and board once. All details are saved strictly in your browser and used to format your prompts.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          {/* Cleared details banner */}
          {clearedNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Saved details cleared successfully from this browser.</span>
            </div>
          )}

          {/* Question 1: Class */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#2fa8cc]" />
              1. Which class are you in?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['8', '9', '10'] as ClassLevel[]).map((c) => {
                const isSelected = classLevel === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setClassLevel(c)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all text-center cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[#1f4e79] text-white border-[#1f4e79] shadow-xs ring-2 ring-[#1f4e79]/20'
                        : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] hover:border-[#2fa8cc]/50'
                    }`}
                  >
                    {CLASS_LABELS[c]}
                  </button>
                );
              })}
              <div
                className="py-2.5 px-2 rounded-xl font-semibold text-xs border border-dashed border-[#c9a227]/70 bg-[#fffdf5] text-[#7a5b0b] flex flex-col items-center justify-center cursor-not-allowed select-none min-h-[44px]"
                title="Class 11 support coming soon"
              >
                <span>Class 11</span>
                <span className="text-[9px] font-extrabold uppercase text-[#c9a227]">Soon</span>
              </div>
              <div
                className="py-2.5 px-2 rounded-xl font-semibold text-xs border border-dashed border-[#c9a227]/70 bg-[#fffdf5] text-[#7a5b0b] flex flex-col items-center justify-center cursor-not-allowed select-none min-h-[44px]"
                title="Class 12 support coming soon"
              >
                <span>Class 12</span>
                <span className="text-[9px] font-extrabold uppercase text-[#c9a227]">Soon</span>
              </div>
            </div>
          </div>

          {/* Question 2: Board */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#2fa8cc]" />
              2. Which board do you follow?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['cbse', 'icse', 'state', 'other'] as BoardType[]).map((b) => {
                const isSelected = board === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBoard(b)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all text-center cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[#2fa8cc] text-white border-[#2fa8cc] shadow-xs ring-2 ring-[#2fa8cc]/20'
                        : 'bg-[#fafbfc] text-[#1a1a1a] border-[#e2e8f0] hover:bg-[#e8f6fa] hover:border-[#2fa8cc]/50'
                    }`}
                  >
                    {BOARD_LABELS[b]}
                  </button>
                );
              })}
            </div>
            {board !== 'cbse' && (
              <p className="text-[11px] text-[#5a6b7b] italic">
                ℹ️ Standard NCERT benchmark curriculum is referenced. You can paste custom school syllabus text below.
              </p>
            )}
          </div>

          {/* Question 3: Optional Pasted Syllabus Reference */}
          <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f4e79] font-display flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#2fa8cc]" />
              3. Custom Syllabus Excerpt (Optional)
            </label>

            <div className="p-3.5 rounded-xl bg-[#fafbfc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#5a6b7b]">
                <span className="font-semibold text-[#1f4e79]">Paste syllabus text:</span>
                <span>{pastedSyllabusText.length} characters</span>
              </div>
              <textarea
                rows={3}
                value={pastedSyllabusText}
                onChange={e => {
                  setPastedSyllabusText(e.target.value);
                  if (e.target.value.trim()) setSyllabusSource('custom');
                }}
                placeholder="Paste chapter topics, formula list, or exam points here. This text is copied into your prompt as reference material."
                className="w-full p-2.5 rounded-lg border border-[#e2e8f0] bg-white text-xs font-mono text-[#1a1a1a] focus:ring-2 focus:ring-[#2fa8cc] focus:outline-hidden"
              />
              <p className="text-[10.5px] text-[#5a6b7b] leading-tight">
                💡 <strong>Reference only:</strong> This text is copied into your prompt to contextualize external AI. It does not replace teacher instructions.
              </p>
            </div>
          </div>

          {/* Privacy & Transparency Explanation */}
          <div className="p-3.5 rounded-2xl bg-[#e8f6fa] border border-[#2fa8cc]/30 space-y-2 text-xs text-[#0f3557]">
            <div className="flex items-center gap-1.5 font-bold text-[#1f4e79]">
              <ShieldCheck className="w-4 h-4 text-[#2fa8cc]" />
              <span>Privacy &amp; Data Transparency:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#0f3557]/90 leading-relaxed list-disc pl-4">
              <li><strong>Stored locally:</strong> Your chosen class, board, and pasted syllabus are saved exclusively in your browser&apos;s local storage.</li>
              <li><strong>No study text analytics:</strong> No study questions, topic names, or syllabus excerpts are sent in analytics or URLs.</li>
              <li><strong>External AI handoff:</strong> Clicking an AI tool copies your prompt to your clipboard and opens the official tool website in a new tab. This toolkit does not connect to external AI APIs.</li>
            </ul>
          </div>

          {/* Clear saved details button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1.5 cursor-pointer py-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear saved details from this device</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-[#e2e8f0] bg-[#fafbfc] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-[#5a6b7b] hover:text-[#1a1a1a] rounded-xl cursor-pointer min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#ff6b00] to-orange-600 rounded-xl shadow-md shadow-[#ff6b00]/25 hover:shadow-[#ff6b00]/40 transition-all hover:scale-102 cursor-pointer min-h-[44px]"
          >
            Save Study Space
          </button>
        </div>
      </div>
    </div>
  );
}
