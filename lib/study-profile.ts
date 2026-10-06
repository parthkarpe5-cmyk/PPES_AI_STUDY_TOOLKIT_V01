export type ClassLevel = '8' | '9' | '10';
export type BoardType = 'cbse' | 'icse' | 'state' | 'other';
export type SyllabusSource = 'builtin' | 'custom';

export interface StudyProfile {
  classLevel: ClassLevel;
  board: BoardType;
  syllabusSource: SyllabusSource;
  customSyllabusName?: string;
  hasSetup: boolean;
}

export const BOARD_LABELS: Record<BoardType, string> = {
  cbse: 'CBSE',
  icse: 'ICSE',
  state: 'State Board',
  other: 'Other Board'
};

export const CLASS_LABELS: Record<ClassLevel, string> = {
  '8': 'Class 8',
  '9': 'Class 9',
  '10': 'Class 10'
};

const STORAGE_KEY = 'ppptk_study_profile_v1';

export const DEFAULT_PROFILE: StudyProfile = {
  classLevel: '10',
  board: 'cbse',
  syllabusSource: 'builtin',
  hasSetup: false
};

export function getStoredProfile(): StudyProfile {
  if (typeof window === 'undefined') {
    return DEFAULT_PROFILE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      classLevel: parsed.classLevel || '10',
      board: parsed.board || 'cbse',
      syllabusSource: parsed.syllabusSource || 'builtin',
      customSyllabusName: parsed.customSyllabusName,
      hasSetup: Boolean(parsed.hasSetup)
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: Partial<StudyProfile>): StudyProfile {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_PROFILE, ...profile, hasSetup: true };
  }

  try {
    const current = getStoredProfile();
    const updated: StudyProfile = {
      ...current,
      ...profile,
      hasSetup: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event so listeners in navbar/components can update in real-time
    window.dispatchEvent(new Event('ppptk_profile_changed'));
    return updated;
  } catch {
    return { ...DEFAULT_PROFILE, ...profile, hasSetup: true };
  }
}
