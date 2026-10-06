/**
 * Prarambh Path — AI Capability Categories
 * Maps student-facing capability intents to internal goal/task IDs.
 *
 * IMPORTANT ARCHITECTURE NOTE:
 * - CREATE sub-capabilities each have their OWN explicit goalId (create-poster, etc.)
 * - BUILD is not just coding; it covers project/compute/logic tasks
 * - All goalIds must have matching entries in data/prompt-templates.ts STUDY_GOALS
 */

export interface SubCapability {
  id: string;
  label: string;
  icon: string;
  goalId: string; // Must match a STUDY_GOALS entry id
  styleId: string; // Must match an EXPLANATION_STYLES entry id
  taskHint?: string; // Short tip shown in the builder
  recommendedTool?: string; // Optional tool name shown in builder tip
}

export interface CapabilityCategory {
  id: string;
  icon: string;
  label: string;
  tagline: string;
  colorBg: string;    // Tailwind bg for highlighted state
  colorBorder: string; // Tailwind border for highlighted state
  colorText: string;   // Tailwind text for highlighted state
  defaultGoalId: string;
  subs: SubCapability[];
}

export const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  {
    id: 'understand',
    icon: '🧠',
    label: 'Understand',
    tagline: 'Break down a tricky concept',
    colorBg: 'bg-[#e8f6fa]',
    colorBorder: 'border-[#2fa8cc]',
    colorText: 'text-[#1f4e79]',
    defaultGoalId: 'understand-topic',
    subs: [
      {
        id: 'explain',
        label: 'Explain simply',
        icon: '💡',
        goalId: 'understand-topic',
        styleId: 'simple',
      },
      {
        id: 'analogy',
        label: 'With an analogy',
        icon: '🔁',
        goalId: 'explain-concept',
        styleId: 'with-real-life-examples',
        taskHint: 'AI will anchor the explanation to everyday analogies (water pipes, traffic, etc.)',
      },
      {
        id: 'examples',
        label: 'With examples',
        icon: '📌',
        goalId: 'understand-topic',
        styleId: 'with-examples',
      },
      {
        id: 'step-by-step',
        label: 'Step-by-step',
        icon: '🪜',
        goalId: 'understand-topic',
        styleId: 'detailed',
      },
    ],
  },

  {
    id: 'revise',
    icon: '📖',
    label: 'Revise',
    tagline: 'Quickly recall before a test',
    colorBg: 'bg-orange-50',
    colorBorder: 'border-[#ff6b00]',
    colorText: 'text-orange-900',
    defaultGoalId: 'revise',
    subs: [
      {
        id: 'short-notes',
        label: 'Short notes',
        icon: '📝',
        goalId: 'make-short-notes',
        styleId: 'simple',
      },
      {
        id: 'key-points',
        label: 'Key points only',
        icon: '⭐',
        goalId: 'revise',
        styleId: 'simple',
      },
      {
        id: 'flashcards',
        label: 'Flashcards',
        icon: '🃏',
        goalId: 'revise',
        styleId: 'very-simple',
        taskHint: 'Ask AI to create Q&A style flashcard pairs.',
      },
      {
        id: 'detailed-notes',
        label: 'Detailed notes',
        icon: '📗',
        goalId: 'make-detailed-notes',
        styleId: 'detailed',
      },
    ],
  },

  {
    id: 'create',
    icon: '🎨',
    label: 'Create',
    tagline: 'Posters, charts, diagrams & more',
    colorBg: 'bg-purple-50',
    colorBorder: 'border-purple-300',
    colorText: 'text-purple-900',
    defaultGoalId: 'create-poster',
    subs: [
      {
        id: 'poster',
        label: 'Poster layout',
        icon: '🖼️',
        goalId: 'create-poster',
        styleId: 'simple',
        taskHint: 'AI will describe a structured science/social-studies poster with sections, headings, and visual tips.',
        recommendedTool: 'ChatGPT or Gemini',
      },
      {
        id: 'chart',
        label: 'Comparison chart',
        icon: '📊',
        goalId: 'create-chart',
        styleId: 'simple',
        taskHint: 'AI will create a markdown comparison table you can copy into your notes.',
        recommendedTool: 'Claude or ChatGPT',
      },
      {
        id: 'diagram',
        label: 'Diagram description',
        icon: '📐',
        goalId: 'create-diagram',
        styleId: 'detailed',
        taskHint: 'AI will describe a step-by-step labelled diagram (e.g. a circuit, plant cell, or water cycle).',
        recommendedTool: 'Gemini (can also draw)',
      },
      {
        id: 'mindmap',
        label: 'Mind map',
        icon: '🗺️',
        goalId: 'create-mindmap',
        styleId: 'simple',
        taskHint: 'AI will produce a hierarchical mind-map structure with the main concept at the centre.',
        recommendedTool: 'ChatGPT or Claude',
      },
      {
        id: 'presentation',
        label: 'Presentation outline',
        icon: '🎤',
        goalId: 'create-presentation',
        styleId: 'simple',
        taskHint: 'AI will produce a slide-by-slide outline with talking points for each slide.',
        recommendedTool: 'ChatGPT or Gemini',
      },
    ],
  },

  {
    id: 'practise',
    icon: '📝',
    label: 'Practise',
    tagline: 'Quiz yourself & prep for exams',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-400',
    colorText: 'text-emerald-900',
    defaultGoalId: 'generate-questions',
    subs: [
      {
        id: 'mcq',
        label: 'MCQ quiz',
        icon: '🔘',
        goalId: 'generate-questions',
        styleId: 'simple',
      },
      {
        id: 'exam-questions',
        label: 'Exam questions',
        icon: '📋',
        goalId: 'prepare-exam',
        styleId: 'detailed',
        taskHint: 'Includes 2-mark, 3-mark and 5-mark board-style questions.',
      },
      {
        id: 'mock-test',
        label: 'Mock test',
        icon: '⏱️',
        goalId: 'take-mock-test',
        styleId: 'simple',
        taskHint: 'AI presents one question at a time, waits for your answer, then grades it.',
      },
      {
        id: 'problem-solving',
        label: 'Solve problems',
        icon: '🧩',
        goalId: 'solve-problem',
        styleId: 'detailed',
        recommendedTool: 'Photomath (maths) / ChatGPT',
      },
    ],
  },

  {
    id: 'explore',
    icon: '🔎',
    label: 'Explore',
    tagline: 'Research & go deeper',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-400',
    colorText: 'text-amber-900',
    defaultGoalId: 'understand-topic',
    subs: [
      {
        id: 'research',
        label: 'Research a topic',
        icon: '🌐',
        goalId: 'understand-topic',
        styleId: 'with-real-life-examples',
        taskHint: 'Ask AI to explore background, real-world context, and multiple perspectives.',
        recommendedTool: 'Perplexity or Gemini (web-connected)',
      },
      {
        id: 'real-world',
        label: 'Real-world examples',
        icon: '🌍',
        goalId: 'explain-concept',
        styleId: 'with-real-life-examples',
      },
      {
        id: 'compare',
        label: 'Compare concepts',
        icon: '⚖️',
        goalId: 'make-short-notes',
        styleId: 'simple',
        taskHint: 'AI will compare two related concepts side-by-side (e.g. Arteries vs Veins).',
      },
      {
        id: 'improve-answer',
        label: 'Improve my answer',
        icon: '✍️',
        goalId: 'improve-answer',
        styleId: 'detailed',
        taskHint: 'Paste your draft answer. AI will critique it and show you how to score higher.',
      },
    ],
  },

  {
    id: 'build',
    icon: '💻',
    label: 'Build',
    tagline: 'Projects, code & creative work',
    colorBg: 'bg-slate-50',
    colorBorder: 'border-slate-400',
    colorText: 'text-slate-800',
    defaultGoalId: 'solve-problem',
    subs: [
      {
        id: 'code',
        label: 'Write code',
        icon: '⌨️',
        goalId: 'solve-problem',
        styleId: 'detailed',
        taskHint: 'Specify the language (Python / HTML / Scratch) and what you want to build.',
        recommendedTool: 'ChatGPT or Claude',
      },
      {
        id: 'debug',
        label: 'Debug my code',
        icon: '🐛',
        goalId: 'improve-answer',
        styleId: 'detailed',
        taskHint: 'Paste your code and the error message. Ask AI to explain the bug and the fix.',
        recommendedTool: 'ChatGPT or Claude',
      },
      {
        id: 'explain-code',
        label: 'Explain code',
        icon: '📖',
        goalId: 'understand-topic',
        styleId: 'simple',
        taskHint: 'Ask AI to explain each line of code in student-friendly terms.',
      },
      {
        id: 'project-idea',
        label: 'Project idea',
        icon: '💡',
        goalId: 'understand-topic',
        styleId: 'with-examples',
        taskHint: 'Ask AI to suggest a feasible school science/tech project idea with steps.',
      },
      {
        id: 'project-structure',
        label: 'Project structure',
        icon: '📁',
        goalId: 'make-detailed-notes',
        styleId: 'detailed',
        taskHint: 'Ask AI to create a step-by-step structure for completing a school project.',
      },
    ],
  },
];

/** Find a category by id */
export function findCapability(catId: string): CapabilityCategory | undefined {
  return CAPABILITY_CATEGORIES.find(c => c.id === catId);
}

/** Find a specific sub-capability by category + sub id */
export function findSubCapability(categoryId: string, subId: string): SubCapability | undefined {
  const cat = CAPABILITY_CATEGORIES.find(c => c.id === categoryId);
  return cat?.subs.find(s => s.id === subId);
}
