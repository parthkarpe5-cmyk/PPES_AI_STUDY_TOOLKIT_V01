export interface GoalOption {
  id: string;
  label: string;
  icon: string;
  description: string;
  taskInstruction: string;
  outputStructure: string[];
  sampleQuestionClosing?: string;
}

export const STUDY_GOALS: GoalOption[] = [
  {
    id: 'understand-topic',
    label: 'Understand a topic',
    icon: '💡',
    description: 'Break down the core concept from first principles with clarity.',
    taskInstruction: 'Explain the core principles and concepts from scratch, making sure every fundamental idea is crystal clear.',
    outputStructure: [
      'Intuitive overview & why this concept matters',
      'Step-by-step breakdown of core concepts',
      'Key definitions and terminology explained simply',
      'Real-world analogies and illustrations',
      'Summary recap'
    ],
    sampleQuestionClosing: 'End with 3 check-for-understanding questions to test if I grasp the basics.'
  },
  {
    id: 'make-short-notes',
    label: 'Make short notes',
    icon: '📝',
    description: 'Crisp 1-page summary with headings, key terms, and bullet points.',
    taskInstruction: 'Create ultra-concise, high-yield revision notes suitable for quick 5-minute reference.',
    outputStructure: [
      'One-sentence core concept summary',
      'Key definitions and formulas / dates in bullet points',
      'High-priority diagrams or flowcharts described textually',
      'Common pitfalls and mistakes to avoid',
      'Top 5 memory triggers / mnemonics'
    ],
    sampleQuestionClosing: 'Include a 3-point quick memory checklist at the end.'
  },
  {
    id: 'make-detailed-notes',
    label: 'Make detailed notes',
    icon: '📖',
    description: 'Comprehensive chapter guide covering all sub-topics, derivations, and examples.',
    taskInstruction: 'Produce comprehensive, well-structured study notes covering all subtopics thoroughly according to the school syllabus.',
    outputStructure: [
      'Comprehensive topic background and scope',
      'Detailed sub-topic explanations with clear headings',
      'Step-by-step derivations / timelines / biological mechanisms',
      'Standard textbook formulas, SI units, and conditions',
      'Practice examples with full working'
    ],
    sampleQuestionClosing: 'End with 5 comprehensive review questions covering each subtopic.'
  },
  {
    id: 'prepare-exam',
    label: 'Prepare for exam',
    icon: '🎯',
    description: 'High-yield exam points, expected board questions, and mark-scoring tips.',
    taskInstruction: 'Focus specifically on high-yield exam concepts, standard marking scheme requirements, and recurring board questions.',
    outputStructure: [
      'Most frequently asked exam sub-topics and weightage trends',
      'Exact definition wording needed for full marks',
      'Common examiner traps and where students lose marks',
      'Model 2-mark, 3-mark, and 5-mark question structures with ideal answers',
      'Key keywords examiners look for when grading'
    ],
    sampleQuestionClosing: 'Provide 3 high-probability exam questions with ideal bulleted answer structures.'
  },
  {
    id: 'revise',
    label: 'Revise',
    icon: '🔄',
    description: 'Fast active-recall recap for quick revision before a class test.',
    taskInstruction: 'Conduct a rapid active recall revision summary designed to refresh memory quickly.',
    outputStructure: [
      'Rapid fire bullet summary of must-know facts',
      'Formula / concept cheat sheet table',
      'Difference between easily confused terms',
      'Quick true/false and fill-in-the-blank self-check items'
    ],
    sampleQuestionClosing: 'End with 5 rapid-fire flashcard-style quiz questions with hidden answers.'
  },
  {
    id: 'generate-questions',
    label: 'Generate practice questions',
    icon: '❓',
    description: 'Diverse practice questions (MCQ, Short, Long, Case-based) with solutions.',
    taskInstruction: 'Create a balanced set of practice questions matching the school exam pattern, graded from easy to challenging.',
    outputStructure: [
      '3 Multiple Choice Questions (MCQs) with options',
      '2 Short Answer (2 marks) conceptual questions',
      '1 Long Answer / Application / Case-based question',
      'Complete step-by-step answer key with explanations for each question'
    ],
    sampleQuestionClosing: 'Provide complete solutions and explain why the incorrect MCQ options are wrong.'
  },
  {
    id: 'take-mock-test',
    label: 'Take a mock test',
    icon: '⏱️',
    description: 'Interactive timed quiz simulation where AI tests you step-by-step.',
    taskInstruction: 'Act as an interactive exam invigilator and tutor. Present questions one at a time and wait for my answer before giving feedback.',
    outputStructure: [
      'Present Question 1 first with specified marks',
      'Wait for the student to submit their answer',
      'Grade the answer out of full marks, highlight strengths and gaps',
      'Provide the model answer and move to the next question'
    ],
    sampleQuestionClosing: 'Start immediately by asking me Question 1 only.'
  },
  {
    id: 'solve-problem',
    label: 'Solve a problem',
    icon: '🧩',
    description: 'Step-by-step problem-solving guide teaching the underlying method.',
    taskInstruction: 'Guide me through solving numerical or conceptual problems step-by-step without skipping intermediate steps.',
    outputStructure: [
      'Identification of given data and required result',
      'Underlying concept and governing formula/rule',
      'Step-by-step mathematical working with units at each stage',
      'Alternative or cross-check verification method',
      'One similar practice problem for me to try on my own'
    ],
    sampleQuestionClosing: 'End with a similar practice problem for me to solve independently.'
  },
  {
    id: 'improve-answer',
    label: 'Improve an answer',
    icon: '✍️',
    description: 'Critique and refine an existing student answer for better clarity and marks.',
    taskInstruction: 'Review my draft answer, point out conceptual errors or missing keywords, and show how to upgrade it for maximum marks.',
    outputStructure: [
      'Evaluation of the draft answer (Strengths vs Gaps)',
      'Missing scientific/literary keywords required by marking schemes',
      'Upgraded model answer rewritten cleanly',
      'Explanation of why the upgraded version scores higher'
    ],
    sampleQuestionClosing: 'Ask me to provide my draft answer so you can critique it constructively.'
  },
  {
    id: 'explain-concept',
    label: 'Explain a difficult concept',
    icon: '🧠',
    description: 'Demystify challenging ideas using simple analogies and visual mental models.',
    taskInstruction: 'Deconstruct this notoriously tricky concept using simple relatable analogies and visual mental models.',
    outputStructure: [
      'Why this concept usually confuses students and the intuition behind it',
      'The "In Plain English" real-life analogy (e.g. water pipes for electric circuits)',
      'Scientific/Formal explanation connecting back to the analogy',
      'Key takeaway rule of thumb to never forget it'
    ],
    sampleQuestionClosing: 'Ask me a simple scenario question to verify if the analogy clicked for me.'
  }
];

export interface StyleOption {
  id: string;
  label: string;
  instruction: string;
  tone: string;
}

export const EXPLANATION_STYLES: StyleOption[] = [
  {
    id: 'very-simple',
    label: 'Very simple',
    instruction: 'Use extremely simple vocabulary, short sentences, and everyday language without jargon.',
    tone: 'Elementary and super clear'
  },
  {
    id: 'simple',
    label: 'Simple',
    instruction: 'Keep language accessible, clear, and easy to read while maintaining correct standard terms.',
    tone: 'Student-friendly and balanced'
  },
  {
    id: 'detailed',
    label: 'Detailed',
    instruction: 'Provide thorough, academically precise explanations with deep conceptual rigor and clear structure.',
    tone: 'Comprehensive and thorough'
  },
  {
    id: 'with-examples',
    label: 'With examples',
    instruction: 'Illustrate every single sub-concept with clear textbook and numerical examples.',
    tone: 'Example-driven and illustrative'
  },
  {
    id: 'with-real-life-examples',
    label: 'With real-life examples',
    instruction: 'Anchor every concept to everyday real-world phenomena (e.g., sports, cooking, vehicles, daily technology).',
    tone: 'Relatable and real-world grounded'
  }
];

export interface PromptComponentExplanation {
  name: string;
  icon: string;
  title: string;
  whyItWorks: string;
  exampleInPrompt: string;
}

export const PROMPT_COMPONENTS: Record<string, PromptComponentExplanation> = {
  role: {
    name: 'ROLE',
    icon: '🎯',
    title: 'Expert Persona & Role',
    whyItWorks: 'Tells the AI how it should approach the task, setting the tone of an encouraging, experienced school teacher.',
    exampleInPrompt: 'Act as an experienced Class {CLASS} {SUBJECT} teacher.'
  },
  studentLevel: {
    name: 'STUDENT LEVEL',
    icon: '📚',
    title: 'Grade & Target Level',
    whyItWorks: 'Helps the AI keep the explanation strictly appropriate for your class level—preventing overly simple nursery answers or overwhelming college math.',
    exampleInPrompt: 'Explain for a Class {CLASS} student following standard curriculum.'
  },
  context: {
    name: 'CONTEXT & TOPIC',
    icon: '📖',
    title: 'Subject & Topic Context',
    whyItWorks: 'Focuses the AI on the exact chapter boundaries so it doesn’t wander off into unrelated topics.',
    exampleInPrompt: 'Topic: {TOPIC} under {SUBJECT}.'
  },
  task: {
    name: 'TASK & GOAL',
    icon: '📝',
    title: 'Clear Goal & Purpose',
    whyItWorks: 'Defines the exact learning goal (notes, questions, conceptual intuition) so the response is purposeful.',
    exampleInPrompt: '{TASK_INSTRUCTION}'
  },
  outputFormat: {
    name: 'OUTPUT FORMAT',
    icon: '📋',
    title: 'Structured Organization',
    whyItWorks: 'Controls how the answer is organized with headings, bullet points, and tables rather than an unreadable wall of text.',
    exampleInPrompt: 'Use clear headings, bullet points, and highlight key terms in bold.'
  },
  constraints: {
    name: 'CONSTRAINTS',
    icon: '⚠️',
    title: 'Guardrails & Safety Rules',
    whyItWorks: 'Stops the AI from giving away answers without explanation, keeps language student-friendly, and prompts active learning.',
    exampleInPrompt: 'Help me understand the topic rather than simply giving me an answer to copy.'
  }
};
