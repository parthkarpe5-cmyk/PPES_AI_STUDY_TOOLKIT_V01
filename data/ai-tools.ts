export interface AITool {
  id: string;
  name: string;
  badge: string;
  positioning: string;
  description: string;
  capabilities: string[];
  strengths: string[];
  suitableTasks: string[];
  limitations: string[];
  accessUrl: string;
  isFreeOrFreemium: string;
}

export const AI_TOOLS: Record<string, AITool> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    badge: 'General Assistant',
    positioning: 'General-purpose AI learning assistant.',
    description: 'A versatile conversational AI well suited for general explanations, breaking down concepts, brainstorming, and writing assistance.',
    capabilities: [
      'General learning & conceptual explanations',
      'Step-by-step problem reasoning',
      'Writing & language revision',
      'Introductory coding & logic',
      'Multimodal task support'
    ],
    strengths: [
      'Conversational dialogue that feels natural and patient',
      'Good at simplifying hard concepts using analogies',
      'Widely accessible on web and mobile apps'
    ],
    suitableTasks: [
      'study-understand',
      'revision',
      'practice-questions',
      'writing',
      'understand-image',
      'speaking-practice'
    ],
    limitations: [
      'Can occasionally hallucinate facts or formulas with high confidence',
      'May produce overly wordy answers unless explicitly guided with constraints',
      'Free tier might have usage limits during peak school hours'
    ],
    accessUrl: 'https://chatgpt.com',
    isFreeOrFreemium: 'Free & Plus tier available'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    badge: 'Research & Multimodal',
    positioning: 'General-purpose and multimodal AI assistant.',
    description: 'A powerful Google AI assistant strong for multimodal study tasks, image analysis, and research-oriented exploration.',
    capabilities: [
      'Multimodal reasoning (text, diagrams, photos)',
      'Research-oriented study & exploration',
      'Document and study material review',
      'Integration with Google workspace tools'
    ],
    strengths: [
      'Excels at analyzing textbook diagrams, charts, and science figures',
      'Good at citing web sources and giving recent educational context',
      'Generous free access with Google accounts'
    ],
    suitableTasks: [
      'research',
      'understand-image',
      'study-understand',
      'data-tables',
      'make-notes'
    ],
    limitations: [
      'Can sometimes be overly creative in open-ended historical or factual queries',
      'Always double check specific Indian board exam markings and syllabus points'
    ],
    accessUrl: 'https://gemini.google.com',
    isFreeOrFreemium: 'Free with Google account'
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    badge: 'Writing & Reasoning',
    positioning: 'Strong for detailed explanations, writing, and document work.',
    description: 'An AI assistant by Anthropic known for nuance, structured writing, thoughtful reasoning, and high readability.',
    capabilities: [
      'Nuanced, structured writing and essays',
      'In-depth conceptual reasoning',
      'Document and text analysis',
      'Clear structured coding logic'
    ],
    strengths: [
      'Produces clean, well-formatted notes with clear headings',
      'Less prone to unnecessary fluff or false cheerfulness',
      'Follows complex constraint instructions very closely'
    ],
    suitableTasks: [
      'make-notes',
      'writing',
      'study-understand',
      'analyze-docs',
      'revision'
    ],
    limitations: [
      'Free version has message rate limits within short timeframes',
      'Cannot generate images or browse real-time web directly in base mode'
    ],
    accessUrl: 'https://claude.ai',
    isFreeOrFreemium: 'Free & Pro tier available'
  },
  notebooklm: {
    id: 'notebooklm',
    name: 'NotebookLM',
    badge: 'Grounded in Your Material',
    positioning: 'Useful when the student’s own notes or documents are the primary source.',
    description: 'A specialized Google tool designed to interact strictly with your uploaded NCERT textbooks, class notes, and syllabus PDFs without hallucinating external facts.',
    capabilities: [
      'Uploaded textbook & PDF synthesis',
      'Source-grounded question answering',
      'Automatic study guide & FAQ generation',
      'Audio overview & discussion summaries'
    ],
    strengths: [
      'Answers are strictly grounded in your uploaded documents with inline citations',
      'Virtually eliminates hallucinations outside your syllabus',
      'Free to use with a Google account'
    ],
    suitableTasks: [
      'analyze-docs',
      'revision',
      'practice-questions',
      'make-notes'
    ],
    limitations: [
      'Requires you to upload source documents first (e.g., NCERT PDF or class notes)',
      'Not intended for open general web search or casual conversation'
    ],
    accessUrl: 'https://notebooklm.google.com',
    isFreeOrFreemium: 'Free with Google account'
  },
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot / Coding AI',
    badge: 'Programming & Logic',
    positioning: 'Coding-focused AI assistant.',
    description: 'Specialized for writing code, debugging syntax errors, explaining Python or HTML scripts, and algorithmic thinking.',
    capabilities: [
      'Code writing and real-time completion',
      'Syntax error debugging and explanation',
      'Algorithmic problem solving',
      'Understanding programming concepts (Python, Scratch, HTML)'
    ],
    strengths: [
      'Explains error messages in plain language',
      'Helps school students grasp logic without doing all the thinking for them',
      'Integrates directly into coding IDEs or accessible via web tools'
    ],
    suitableTasks: [
      'coding',
      'data-tables'
    ],
    limitations: [
      'Only suited for computational, programming, and algorithmic tasks',
      'Do not use for theory subjects like History, Geography, or Literature'
    ],
    accessUrl: 'https://github.com/features/copilot',
    isFreeOrFreemium: 'Free tier available for students / Web alternatives exist'
  }
};
