export interface TaskOption {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  requiredCapability: string;
  recommendedApproach: string;
  recommendedToolIds: string[];
  reason: string;
  caution: string;
  suggestedPromptGoal: string;
  exampleScenario: string;
}

export const STUDY_TASKS: TaskOption[] = [
  {
    id: 'study-understand',
    name: 'Study / Understand',
    icon: '📚',
    shortDesc: 'Break down complex concepts into simple, step-by-step explanations.',
    requiredCapability: 'Conversational conceptual explanation & analogies',
    recommendedApproach: 'Use a general conversational AI with a Socratic tutoring prompt.',
    recommendedToolIds: ['chatgpt', 'gemini', 'claude'],
    reason: 'These tools excel at breaking difficult school topics into intuitive everyday analogies suitable for Class 8–10 comprehension.',
    caution: 'Always verify scientific definitions and mathematical formulas against your official textbook.',
    suggestedPromptGoal: 'understand-topic',
    exampleScenario: 'e.g., Understanding Fleming’s Left-Hand Rule or Photosynthesis dark reactions.'
  },
  {
    id: 'make-notes',
    name: 'Make Notes',
    icon: '📝',
    shortDesc: 'Create structured chapter summaries, mind maps, and bulleted study notes.',
    requiredCapability: 'Structured formatting, bulleting & chapter summarization',
    recommendedApproach: 'Use an AI tool with strong formatting adherence or grounded source notes.',
    recommendedToolIds: ['claude', 'notebooklm', 'gemini'],
    reason: 'Claude and NotebookLM excel at organizing large volumes of information into neat, clear markdown bullet points and headings without fluff.',
    caution: 'Do not simply copy-paste AI notes into your school notebook without reading and understanding them first.',
    suggestedPromptGoal: 'make-short-notes',
    exampleScenario: 'e.g., Making a 1-page revision sheet for the French Revolution.'
  },
  {
    id: 'revision',
    name: 'Revision',
    icon: '🔄',
    shortDesc: 'Quickly recall key definitions, formulas, dates, and core points before exams.',
    requiredCapability: 'Rapid recall structuring & flashcard generation',
    recommendedApproach: 'Use a prompt focused on quick-fire bullet points and active recall.',
    recommendedToolIds: ['chatgpt', 'notebooklm', 'claude'],
    reason: 'These tools can quickly synthesize key definitions, common traps, and formulas in high-density revision format.',
    caution: 'Revision should test your memory; ask the AI to quiz you rather than just reading passively.',
    suggestedPromptGoal: 'revise',
    exampleScenario: 'e.g., 10-minute quick recap of Trigonometry identities before unit test.'
  },
  {
    id: 'practice-questions',
    name: 'Practice Questions',
    icon: '❓',
    shortDesc: 'Generate MCQ, short-answer, assertion-reason, or case-based practice tests.',
    requiredCapability: 'Assessment item creation & answer key generation',
    recommendedApproach: 'Request board-style questions with tiered difficulty (Easy, Medium, Hard).',
    recommendedToolIds: ['notebooklm', 'chatgpt', 'claude'],
    reason: 'NotebookLM can generate questions directly from your school chapters, while ChatGPT and Claude format questions with explanatory answer keys.',
    caution: 'Ensure the questions follow your specific board pattern (CBSE / ICSE / State Board).',
    suggestedPromptGoal: 'generate-questions',
    exampleScenario: 'e.g., 5 Case-study questions on Heredity and Evolution with answers.'
  },
  {
    id: 'math-solve',
    name: 'Math Problem Solving',
    icon: '📐',
    shortDesc: 'Work through numerical problems, algebra equations, and geometric proofs step-by-step.',
    requiredCapability: 'Step-by-step mathematical reasoning, equation solving & proof structure',
    recommendedApproach: 'Use an AI assistant with strict step-by-step working or specialized math solvers.',
    recommendedToolIds: ['photomath', 'chatgpt', 'claude'],
    reason: 'Photomath provides precise equation steps, while ChatGPT and Claude explain the underlying mathematical theorem.',
    caution: 'Never copy final numerical answers without understanding each algebraic transformation.',
    suggestedPromptGoal: 'solve-problem',
    exampleScenario: 'e.g., Solving Quadratic Equations by completing the square or proving Basic Proportionality Theorem.'
  },
  {
    id: 'research',
    name: 'Research',
    icon: '🔎',
    shortDesc: 'Explore background information, real-world examples, and project topics.',
    requiredCapability: 'Web-connected exploration & source synthesis',
    recommendedApproach: 'Use a web-enabled research AI with verified footnote citations.',
    recommendedToolIds: ['perplexity', 'gemini', 'chatgpt'],
    reason: 'Perplexity and Gemini cite clickable web sources directly, making it easier to fact-check school project material.',
    caution: 'Verify all statistics, historical dates, and scientific facts using recognized educational portals.',
    suggestedPromptGoal: 'understand-topic',
    exampleScenario: 'e.g., Finding real-life examples of renewable energy projects in India.'
  },
  {
    id: 'coding',
    name: 'Coding',
    icon: '💻',
    shortDesc: 'Learn Python, HTML/CSS, Scratch, and debug student programming errors.',
    requiredCapability: 'Code syntax explanation, debugging & step-by-step logic',
    recommendedApproach: 'Use a coding-optimized AI assistant to explain errors rather than just giving raw code.',
    recommendedToolIds: ['copilot', 'chatgpt', 'claude'],
    reason: 'These tools can pinpoint the exact line number of a syntax error and explain the logic in beginner-friendly terms.',
    caution: 'Try writing the code yourself first. Never submit code you cannot explain line-by-line.',
    suggestedPromptGoal: 'solve-problem',
    exampleScenario: 'e.g., Debugging a Python `for` loop or building a simple HTML portfolio page.'
  },
  {
    id: 'analyze-docs',
    name: 'Analyze PDF / Documents',
    icon: '📄',
    shortDesc: 'Ask questions directly from your uploaded textbook PDF or teacher notes.',
    requiredCapability: 'Document / source-grounded learning with zero hallucination',
    recommendedApproach: 'Use a source-grounded tool that cites page numbers and avoids outside speculation.',
    recommendedToolIds: ['notebooklm', 'claude', 'gemini'],
    reason: 'NotebookLM is built specifically to restrict its knowledge strictly to your uploaded document sources with verified citations.',
    caution: 'Ensure the document scan is clear and legible for the tool to read text accurately.',
    suggestedPromptGoal: 'make-detailed-notes',
    exampleScenario: 'e.g., Uploading Class 10 NCERT Chapter 12 and asking for formula lists.'
  },
  {
    id: 'understand-image',
    name: 'Understand an Image',
    icon: '🖼️',
    shortDesc: 'Explain diagrams, scientific apparatus charts, graphs, or historical maps.',
    requiredCapability: 'Multimodal computer vision & visual diagram interpretation',
    recommendedApproach: 'Upload the diagram or photo to a vision-capable AI model.',
    recommendedToolIds: ['gemini', 'chatgpt'],
    reason: 'Gemini and ChatGPT Vision can label anatomical diagrams, circuit diagrams, and interpret Cartesian graphs accurately.',
    caution: 'AI can sometimes misread subtle arrow directions or handwritten text in low-resolution photos.',
    suggestedPromptGoal: 'explain-concept',
    exampleScenario: 'e.g., Understanding the parts and flow of the Human Circulatory System diagram.'
  },
  {
    id: 'create-visuals',
    name: 'Create Visuals',
    icon: '🎨',
    shortDesc: 'Generate ideas for science poster charts, mind maps, and project presentations.',
    requiredCapability: 'Visual ideation, layout planning & infographic structuring',
    recommendedApproach: 'Ask the AI to generate structured layout prompts or diagram descriptions.',
    recommendedToolIds: ['chatgpt', 'gemini'],
    reason: 'Useful for structuring how a school science exhibition chart or history timeline poster should look.',
    caution: 'School projects evaluate your own creativity and effort. Use AI purely as a brainstorming helper.',
    suggestedPromptGoal: 'understand-topic',
    exampleScenario: 'e.g., Planning a chart layout for "Water Conservation Techniques" exhibition.'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '✍️',
    shortDesc: 'Draft essays, formal letters, debate arguments, and speech outlines.',
    requiredCapability: 'Structured prose writing, grammar refinement & rhetoric styling',
    recommendedApproach: 'Use an AI tool with strong literary nuance, asking for feedback and outlines.',
    recommendedToolIds: ['claude', 'chatgpt'],
    reason: 'Claude and ChatGPT offer strong vocabulary guidance and structured outlines for school essays and formal letters.',
    caution: 'Never ask AI to write your entire homework essay. Ask for an outline, write it yourself, and ask for feedback.',
    suggestedPromptGoal: 'improve-answer',
    exampleScenario: 'e.g., Drafting points for a debate on "Is Artificial Intelligence Beneficial for Education?".'
  },
  {
    id: 'data-tables',
    name: 'Data / Tables',
    icon: '📊',
    shortDesc: 'Organize comparative tables (e.g., Metals vs Non-metals, Mitosis vs Meiosis).',
    requiredCapability: 'Tabular structuring, comparative analysis & schema formatting',
    recommendedApproach: 'Request a clean Markdown comparison table with specific column parameters.',
    recommendedToolIds: ['claude', 'gemini', 'chatgpt'],
    reason: 'Markdown tables format cleanly across devices and make difference-based exam answers easy to memorize.',
    caution: 'Verify that every comparative row matches the specific points listed in your curriculum syllabus.',
    suggestedPromptGoal: 'make-short-notes',
    exampleScenario: 'e.g., Comparative table of Arteries vs Veins across 5 distinct biological parameters.'
  },
  {
    id: 'speaking-practice',
    name: 'Speaking Practice',
    icon: '🎤',
    shortDesc: 'Practice English conversation, ASL (Assessment of Speaking and Listening), and debates.',
    requiredCapability: 'Interactive voice/dialogue roleplay & conversational feedback',
    recommendedApproach: 'Use a voice-enabled mobile AI app for real-time conversational exchange.',
    recommendedToolIds: ['chatgpt', 'gemini'],
    reason: 'ChatGPT and Gemini mobile voice modes allow students to practice spoken English and receive pronunciation suggestions.',
    caution: 'Keep speaking sessions focused on study topics and language learning goals.',
    suggestedPromptGoal: 'understand-topic',
    exampleScenario: 'e.g., 5-minute mock interview for school house captain election or English ASL test.'
  }
];
