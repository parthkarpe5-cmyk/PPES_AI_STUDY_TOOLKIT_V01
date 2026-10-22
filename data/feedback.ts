export type FeedbackExperience = 'Good' | 'Okay' | 'Difficult';

export type FeedbackCategory =
  | 'Prompt builder'
  | 'AI tools'
  | 'Design'
  | 'Something not working'
  | 'A new idea';

export type FeedbackClass = '8' | '9' | '10' | 'Other' | '';

export interface FeedbackSubmission {
  experience: FeedbackExperience;
  category: FeedbackCategory;
  feedback: string;
  studentClass?: FeedbackClass;
  // Honeypot field for anti-bot spam prevention (should always be empty)
  websiteUrl?: string;
}

export const FEEDBACK_CATEGORIES: FeedbackCategory[] = [
  'Prompt builder',
  'AI tools',
  'Design',
  'Something not working',
  'A new idea',
];

export const FEEDBACK_EXPERIENCES: { value: FeedbackExperience; label: string; icon: string }[] = [
  { value: 'Good', label: 'Good', icon: '😊' },
  { value: 'Okay', label: 'Okay', icon: '😐' },
  { value: 'Difficult', label: 'Difficult', icon: '😕' },
];

export const FEEDBACK_CLASSES: { value: FeedbackClass; label: string }[] = [
  { value: '8', label: 'Class 8' },
  { value: '9', label: 'Class 9' },
  { value: '10', label: 'Class 10' },
  { value: 'Other', label: 'Other / Teacher' },
];
