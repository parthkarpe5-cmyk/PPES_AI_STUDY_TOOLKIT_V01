import { SUBJECTS } from '@/data/subjects';
import { STUDY_GOALS, EXPLANATION_STYLES, PROMPT_COMPONENTS, PromptComponentExplanation } from '@/data/prompt-templates';

export interface PromptInput {
  classLevel: string; // '8' | '9' | '10'
  subjectId: string;
  topic: string;
  goalId: string;
  styleId: string;
  examFocus: boolean;
  additionalNotes?: string;
}

export interface PromptBreakdownItem {
  key: string;
  name: string;
  icon: string;
  title: string;
  whyItWorks: string;
  extractedSnippet: string;
}

export interface GeneratedPromptResult {
  fullPrompt: string;
  summary: string;
  breakdown: PromptBreakdownItem[];
  meta: {
    classLevel: string;
    subjectName: string;
    topic: string;
    goalLabel: string;
    styleLabel: string;
    examFocus: boolean;
  };
}

export function generateStudyPrompt(input: PromptInput): GeneratedPromptResult {
  const subjectObj = SUBJECTS.find((s) => s.id === input.subjectId) || SUBJECTS[0];
  const goalObj = STUDY_GOALS.find((g) => g.id === input.goalId) || STUDY_GOALS[0];
  const styleObj = EXPLANATION_STYLES.find((s) => s.id === input.styleId) || EXPLANATION_STYLES[1];
  
  const cleanTopic = input.topic.trim() || 'Core Syllabus Concepts';
  const cleanClass = input.classLevel || '10';
  const subjectName = subjectObj.name;

  // 1. ROLE
  const roleText = `Act as an encouraging, highly experienced Class ${cleanClass} ${subjectName} teacher.`;

  // 2. STUDENT LEVEL & TOPIC CONTEXT
  const contextLines = [
    `I am a Class ${cleanClass} student studying the subject "${subjectName}".`,
    `The specific topic I want to learn is: "${cleanTopic}".`
  ];
  if (input.examFocus) {
    contextLines.push(`This is for my upcoming school board/term examinations.`);
  }

  // 3. TASK & INSTRUCTION
  const taskLines = [
    goalObj.taskInstruction,
    styleObj.instruction
  ];
  if (input.additionalNotes && input.additionalNotes.trim().length > 0) {
    taskLines.push(`Specific focus area: "${input.additionalNotes.trim()}".`);
  }

  // 4. OUTPUT FORMAT & STRUCTURE
  const outputFormatLines = [
    `Please structure your response with:`,
    ...goalObj.outputStructure.map((item) => `- ${item}`),
    `- Clear section headings and readable bullet points`,
    `- Bold key scientific/academic terminology and important formulas`
  ];

  // 5. CONSTRAINTS & RESPONSIBLE PEDAGOGY
  const constraintLines = [
    `Guidelines & Constraints:`,
    `- Keep explanations strictly appropriate for Class ${cleanClass} syllabus depth.`,
    `- Avoid overly complex college-level jargon; prioritize intuitive clarity.`,
    `- Do NOT simply solve problems without showing the underlying conceptual method.`,
    `- Help me truly understand the concepts rather than encouraging blind memorization or copying.`
  ];

  if (goalObj.sampleQuestionClosing) {
    constraintLines.push(`- ${goalObj.sampleQuestionClosing}`);
  }

  // Combine full prompt
  const fullPrompt = [
    roleText,
    '',
    ...contextLines,
    '',
    ...taskLines,
    '',
    ...outputFormatLines,
    '',
    ...constraintLines
  ].join('\n');

  // Educational breakdown items
  const breakdown: PromptBreakdownItem[] = [
    {
      key: 'role',
      name: PROMPT_COMPONENTS.role.name,
      icon: PROMPT_COMPONENTS.role.icon,
      title: PROMPT_COMPONENTS.role.title,
      whyItWorks: PROMPT_COMPONENTS.role.whyItWorks,
      extractedSnippet: roleText
    },
    {
      key: 'studentLevel',
      name: PROMPT_COMPONENTS.studentLevel.name,
      icon: PROMPT_COMPONENTS.studentLevel.icon,
      title: PROMPT_COMPONENTS.studentLevel.title,
      whyItWorks: PROMPT_COMPONENTS.studentLevel.whyItWorks,
      extractedSnippet: `Class ${cleanClass} student level (${subjectName})`
    },
    {
      key: 'context',
      name: PROMPT_COMPONENTS.context.name,
      icon: PROMPT_COMPONENTS.context.icon,
      title: PROMPT_COMPONENTS.context.title,
      whyItWorks: PROMPT_COMPONENTS.context.whyItWorks,
      extractedSnippet: `Topic: "${cleanTopic}" under ${subjectName}`
    },
    {
      key: 'task',
      name: PROMPT_COMPONENTS.task.name,
      icon: PROMPT_COMPONENTS.task.icon,
      title: PROMPT_COMPONENTS.task.title,
      whyItWorks: PROMPT_COMPONENTS.task.whyItWorks,
      extractedSnippet: `${goalObj.label} (${styleObj.label} style)`
    },
    {
      key: 'outputFormat',
      name: PROMPT_COMPONENTS.outputFormat.name,
      icon: PROMPT_COMPONENTS.outputFormat.icon,
      title: PROMPT_COMPONENTS.outputFormat.title,
      whyItWorks: PROMPT_COMPONENTS.outputFormat.whyItWorks,
      extractedSnippet: `Structured headings, ${goalObj.outputStructure.length} key sections, bullet points, highlighted formulas.`
    },
    {
      key: 'constraints',
      name: PROMPT_COMPONENTS.constraints.name,
      icon: PROMPT_COMPONENTS.constraints.icon,
      title: PROMPT_COMPONENTS.constraints.title,
      whyItWorks: PROMPT_COMPONENTS.constraints.whyItWorks,
      extractedSnippet: `Syllabus-aligned limits, no direct cheating, step-by-step reasoning.`
    }
  ];

  return {
    fullPrompt,
    summary: `${goalObj.label} for Class ${cleanClass} ${subjectName} — ${cleanTopic}`,
    breakdown,
    meta: {
      classLevel: cleanClass,
      subjectName,
      topic: cleanTopic,
      goalLabel: goalObj.label,
      styleLabel: styleObj.label,
      examFocus: input.examFocus
    }
  };
}
