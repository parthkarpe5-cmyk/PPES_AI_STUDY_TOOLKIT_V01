export type ClassLevel = '8' | '9' | '10';
export type BoardType = 'cbse' | 'icse' | 'state' | 'other';
export type SyllabusSource = 'builtin' | 'custom';

export interface StudyProfile {
  classLevel: ClassLevel;
  board: BoardType;
  syllabusSource: SyllabusSource;
  customSyllabusName?: string;
  pastedSyllabusText?: string;
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
    const validClasses: ClassLevel[] = ['8', '9', '10'];
    const validBoards: BoardType[] = ['cbse', 'icse', 'state', 'other'];

    return {
      classLevel: validClasses.includes(parsed.classLevel) ? parsed.classLevel : '10',
      board: validBoards.includes(parsed.board) ? parsed.board : 'cbse',
      syllabusSource: parsed.syllabusSource === 'custom' ? 'custom' : 'builtin',
      customSyllabusName: typeof parsed.customSyllabusName === 'string' ? parsed.customSyllabusName : undefined,
      pastedSyllabusText: typeof parsed.pastedSyllabusText === 'string' ? parsed.pastedSyllabusText : undefined,
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

export function clearStoredProfile(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('ppptk_profile_changed'));
  } catch {
    // Graceful ignore
  }
}
