export interface VerificationStepData {
  id: string;
  stepNumber: number;
  title: string;
  coreQuestion: string;
  explanation: string;
  schoolExample: string;
  actionTip: string;
}

export const THREE_VERIFICATION_STEPS_DATA: VerificationStepData[] = [
  {
    id: 'check-textbook',
    stepNumber: 1,
    title: '1. Check facts, formulas, and units against your textbook',
    coreQuestion: 'Does the AI answer match the definitions, formula symbols, and SI units in your official board textbook?',
    explanation: 'AI tools draw from general internet material. They can sound very confident while inventing dates, using non-standard symbols, or confusing formulas.',
    schoolExample: 'Example: An AI might use imperial units or write a physics equation without specifying standard SI units like Joules or Newtons expected in board exams.',
    actionTip: 'Open your chapter index or reference book. Verify every constant, date, chemical formula, and definition keyword.'
  },
  {
    id: 'explain-own-words',
    stepNumber: 2,
    title: '2. Explain the idea in your own words',
    coreQuestion: 'Can you summarize the concept to a friend or write it down without looking at the AI screen?',
    explanation: 'If you only copy an answer without understanding the logic, you will struggle during surprise tests, oral questions, or numerical variations in exams.',
    schoolExample: 'Example: You copied an explanation of Ohm\'s law, but if asked what happens to current when resistance doubles, you are unsure.',
    actionTip: 'Close the AI window. Write a two-line explanation in your rough notebook or try teaching it to a classmate.'
  },
  {
    id: 'ask-teacher',
    stepNumber: 3,
    title: '3. Ask your teacher about unclear points',
    coreQuestion: 'If anything seems contradictory or unfamiliar compared to what was taught in class, have you noted it down to ask your teacher?',
    explanation: 'Your classroom teacher understands your school syllabus, marking guidelines, and exam criteria best. AI is an assistant for asking questions, not a final authority.',
    schoolExample: 'Example: An AI gives an alternate derivation not accepted in your school marking scheme. Always verify with your teacher.',
    actionTip: 'Keep a small doubt notebook. Note any step that feels unclear or magic and ask your teacher during your next class.'
  }
];
