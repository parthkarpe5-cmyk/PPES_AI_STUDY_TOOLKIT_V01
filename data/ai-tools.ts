export type StudentTaskCategory =
  | 'understand-topic'
  | 'maths-and-science'
  | 'revision-and-quizzes'
  | 'research-and-sources'
  | 'writing-and-languages'
  | 'creative-and-presentations'
  | 'coding-and-logic'
  | 'notes-and-documents';

export interface StudentTaskCategoryInfo {
  id: StudentTaskCategory;
  name: string;
  icon: string;
  description: string;
}

export const STUDENT_TASK_CATEGORIES: StudentTaskCategoryInfo[] = [
  {
    id: 'understand-topic',
    name: 'Understand a topic',
    icon: '💡',
    description: 'Break down complex concepts with clear explanations and analogies.'
  },
  {
    id: 'maths-and-science',
    name: 'Maths and science',
    icon: '📐',
    description: 'Step-by-step problem reasoning, formulas, geometry, and simulations.'
  },
  {
    id: 'revision-and-quizzes',
    name: 'Revision and quizzes',
    icon: '🔄',
    description: 'Rapid recall summaries, flashcards, and practice self-tests.'
  },
  {
    id: 'research-and-sources',
    name: 'Research and sources',
    icon: '🔍',
    description: 'Explore factual background with verified links and citations.'
  },
  {
    id: 'writing-and-languages',
    name: 'Writing and languages',
    icon: '✍️',
    description: 'Essays, letter formats, grammar feedback, and language practice.'
  },
  {
    id: 'creative-and-presentations',
    name: 'Presentations and creative projects',
    icon: '🎨',
    description: 'Slide outlines, poster structures, and school exhibition ideas.'
  },
  {
    id: 'coding-and-logic',
    name: 'Coding and logic',
    icon: '💻',
    description: 'Python, HTML/CSS, Scratch, and beginner logic debugging.'
  },
  {
    id: 'notes-and-documents',
    name: 'Study from notes or documents',
    icon: '📄',
    description: 'Ask questions strictly grounded in your textbook or uploaded notes.'
  }
];

export interface EvidenceLink {
  label: string;
  url: string;
}

export interface AITool {
  id: string;
  name: string;
  officialUrl: string;
  categories: StudentTaskCategory[];
  bestFor: string;
  studentExamples: string[];
  freeAccessType: 'Free' | 'Limited free access';
  freeLimitations: string;
  cardRequired: boolean;
  accountRequired: boolean;
  mobileWebStatus: 'Verified mobile web' | 'Mobile web supported' | 'Unverified mobile usability';
  appAvailability: 'Free iOS & Android app' | 'Free Android app' | 'Web only' | 'Optional app';
  appRequired: boolean;
  minimumAge: string;
  supervisionNotes: string;
  regionNotes?: string;
  privacyNotes: string;
  evidenceUrls: EvidenceLink[];
  lastReviewedAt: string;
  status: 'recommended' | 'needs-review' | 'teacher-only';
  badge?: string; // backwards compatibility
  positioning?: string; // backwards compatibility
  description?: string; // backwards compatibility
  capabilities?: string[]; // backwards compatibility
  strengths?: string[]; // backwards compatibility
  suitableTasks?: string[]; // backwards compatibility
  limitations?: string[]; // backwards compatibility
  accessUrl?: string; // backwards compatibility
  isFreeOrFreemium?: string; // backwards compatibility
}

export const AI_TOOLS: Record<string, AITool> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    officialUrl: 'https://chatgpt.com',
    categories: ['understand-topic', 'revision-and-quizzes', 'writing-and-languages', 'coding-and-logic'],
    bestFor: 'General conceptual explanations, practice quizzes, and essay feedback.',
    studentExamples: [
      'Break down Photosynthesis dark reaction using a kitchen factory analogy.',
      'Generate 5 multiple-choice questions on Class 9 Gravitation with explanations.',
      'Critique a draft English speech on environmental protection.'
    ],
    freeAccessType: 'Limited free access',
    freeLimitations: 'Free tier gives access to GPT-4o-mini and limited GPT-4o usage; message caps during peak hours.',
    cardRequired: false,
    accountRequired: false,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Free iOS & Android app',
    appRequired: false,
    minimumAge: '13+ (13–18 requires parental consent)',
    supervisionNotes: 'Students under 18 must have parent or legal guardian permission per OpenAI Terms of Use.',
    regionNotes: 'Available globally in India and worldwide.',
    privacyNotes: 'Never enter personal phone numbers, school IDs, passwords, or private family details.',
    evidenceUrls: [
      { label: 'OpenAI Terms of Use (Age Policy)', url: 'https://openai.com/policies/terms-of-use/' },
      { label: 'ChatGPT Free Tier Details', url: 'https://openai.com/chatgpt/pricing/' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    // Backwards compatibility mappings
    badge: 'General Assistant',
    positioning: 'General-purpose conversational AI study assistant.',
    description: 'Versatile conversational AI well suited for general explanations, practice quizzes, and writing assistance.',
    capabilities: ['General explanations', 'Step-by-step reasoning', 'Writing revision', 'Introductory coding'],
    strengths: ['Conversational and patient', 'Explains using simple analogies', 'Accessible on phone browser'],
    suitableTasks: ['study-understand', 'revision', 'practice-questions', 'writing', 'math-solve', 'coding'],
    limitations: ['Can make confident calculation errors; cross-check numbers with your textbook', 'Usage limits during peak hours'],
    accessUrl: 'https://chatgpt.com',
    isFreeOrFreemium: 'Limited free access'
  },

  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    officialUrl: 'https://gemini.google.com',
    categories: ['understand-topic', 'research-and-sources', 'creative-and-presentations', 'writing-and-languages'],
    bestFor: 'Visual textbook diagram questions, science explanations, and research exploration.',
    studentExamples: [
      'Explain the parts of the human heart diagram from Class 10 Biology.',
      'Provide current background on renewable energy projects in India for a school project.',
      'Outline a 5-slide presentation for a Class 8 history seminar.'
    ],
    freeAccessType: 'Free',
    freeLimitations: 'Free access with standard Google account; standard rate quotas apply.',
    cardRequired: false,
    accountRequired: true,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Free iOS & Android app',
    appRequired: false,
    minimumAge: '13+ (under 13 requires Google Family Link supervision)',
    supervisionNotes: 'Under-13 requires parent-managed Google account via Family Link; 13–18 accounts have teen safety protections.',
    regionNotes: 'Available in India across English, Hindi, and regional languages.',
    privacyNotes: 'Google Account required. Avoid uploading private photos or personal school information.',
    evidenceUrls: [
      { label: 'Google Gemini Age Requirements', url: 'https://support.google.com/gemini/answer/13594961' },
      { label: 'Gemini Terms of Service', url: 'https://policies.google.com/terms' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    badge: 'Research & Multimodal',
    positioning: 'Multimodal AI assistant for diagrams and research.',
    description: 'Strong for diagrams, visual questions, and school project research.',
    capabilities: ['Diagram explanation', 'Research background', 'Project structuring'],
    strengths: ['Handles textbook diagrams well', 'Connects with Google search context', 'Free with Google account'],
    suitableTasks: ['study-understand', 'research', 'understand-image', 'create-visuals'],
    limitations: ['Verify facts and dates against your NCERT book', 'Requires Google login'],
    accessUrl: 'https://gemini.google.com',
    isFreeOrFreemium: 'Free with Google account'
  },

  notebooklm: {
    id: 'notebooklm',
    name: 'NotebookLM',
    officialUrl: 'https://notebooklm.google.com',
    categories: ['notes-and-documents', 'revision-and-quizzes', 'understand-topic'],
    bestFor: 'Studying strictly from your uploaded NCERT textbook PDFs and class notes.',
    studentExamples: [
      'Upload NCERT Class 10 Science Chapter 12 and ask for a complete formula list with SI units.',
      'Generate a 10-question practice quiz based solely on uploaded teacher notes.',
      'Create an active-recall study guide from your school history PDF.'
    ],
    freeAccessType: 'Free',
    freeLimitations: 'Completely free with a Google Account; up to 50 source documents per notebook.',
    cardRequired: false,
    accountRequired: true,
    mobileWebStatus: 'Mobile web supported',
    appAvailability: 'Web only',
    appRequired: false,
    minimumAge: '13+ for personal Google accounts (available to all ages through Google Workspace for Education)',
    supervisionNotes: 'Requires a standard Google account (13+) or school-managed Google Workspace for Education account.',
    regionNotes: 'Available in India and 200+ countries.',
    privacyNotes: 'Uploaded documents are not used to train public AI models. Answers cite exact source pages.',
    evidenceUrls: [
      { label: 'Google NotebookLM Overview & Privacy', url: 'https://notebooklm.google.com' },
      { label: 'NotebookLM Help & Eligibility', url: 'https://support.google.com/notebooklm' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    badge: 'Grounded in Your Material',
    positioning: 'Useful when your own notes or textbook are the primary source.',
    description: 'Answers strictly from your uploaded textbook PDFs and class notes with citations.',
    capabilities: ['Uploaded textbook synthesis', 'Source-grounded Q&A', 'Study guide generation'],
    strengths: ['Inline source citations', 'Does not wander outside uploaded syllabus', 'Completely free'],
    suitableTasks: ['analyze-docs', 'revision', 'practice-questions', 'make-notes'],
    limitations: ['You must provide the PDF or notes first', 'Not intended for live open-web search'],
    accessUrl: 'https://notebooklm.google.com',
    isFreeOrFreemium: 'Free with Google account'
  },

  photomath: {
    id: 'photomath',
    name: 'Photomath',
    officialUrl: 'https://photomath.com',
    categories: ['maths-and-science'],
    bestFor: 'Self-checking algebra, arithmetic, quadratic equations, and step-by-step math calculations.',
    studentExamples: [
      'Scan or type a quadratic equation to check your factorization steps.',
      'Verify steps for solving linear equations in two variables.',
      'Check arithmetic fractions and algebraic polynomial division.'
    ],
    freeAccessType: 'Free',
    freeLimitations: 'Step-by-step equation solving and arithmetic verification is free; optional Photomath Plus has extra animated tutorials.',
    cardRequired: false,
    accountRequired: false,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Free iOS & Android app',
    appRequired: false,
    minimumAge: '13+ (or with parental consent for younger learners)',
    supervisionNotes: 'Designed for student homework self-checking; does not require account for basic calculations.',
    regionNotes: 'Available worldwide and fully functional in India.',
    privacyNotes: 'Camera permission required only when scanning handwritten equations; no personal data required.',
    evidenceUrls: [
      { label: 'Photomath Official Website & Features', url: 'https://photomath.com' },
      { label: 'Photomath Terms of Service', url: 'https://photomath.com/terms-of-use/' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    badge: 'Step-by-Step Math',
    positioning: 'Specialized for checking arithmetic, equations, and algebra.',
    description: 'Math application that breaks down equations and arithmetic into step-by-step working.',
    capabilities: ['Equation solving', 'Arithmetic verification', 'Step-by-step working'],
    strengths: ['Shows exact arithmetic steps', 'Great for checking calculations', 'Free mobile app'],
    suitableTasks: ['solve-problem', 'math-solve'],
    limitations: ['Only works for mathematical equations', 'Does not teach word problems conceptually'],
    accessUrl: 'https://photomath.com',
    isFreeOrFreemium: 'Free app available'
  },

  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    officialUrl: 'https://www.perplexity.ai',
    categories: ['research-and-sources', 'understand-topic'],
    bestFor: 'School project research with direct clickable source citations and footnotes.',
    studentExamples: [
      'Find the discovery year, scientist, and historical context of the Periodic Table with citations.',
      'Research recent wildlife conservation initiatives in India for a Class 8 science project.',
      'Look up verified definitions and historical timelines for the Indian Independence Movement.'
    ],
    freeAccessType: 'Limited free access',
    freeLimitations: 'Free search queries with web sources are unlimited; Pro search queries are limited to 5 every 4 hours.',
    cardRequired: false,
    accountRequired: false,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Free iOS & Android app',
    appRequired: false,
    minimumAge: '13+ (minors under 18 require parental consent per Section 1.2 Eligibility)',
    supervisionNotes: 'Students aged 13–17 require parent/guardian consent; web search is open without login.',
    regionNotes: 'Accessible in India and worldwide.',
    privacyNotes: 'Can be used without creating an account for standard search queries.',
    evidenceUrls: [
      { label: 'Perplexity Terms of Service (Eligibility 1.2)', url: 'https://www.perplexity.ai/hub/legal/terms-of-service' },
      { label: 'Perplexity Free Access Details', url: 'https://www.perplexity.ai/pro' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    badge: 'Cited Research',
    positioning: 'Search-grounded answer engine with direct source citations.',
    description: 'AI search assistant that answers questions with clickable footnote citations.',
    capabilities: ['Web-connected search', 'Footnote citations', 'Current context'],
    strengths: ['Shows source citations for every claim', 'Easy to fact-check', 'No login required for quick search'],
    suitableTasks: ['research', 'study-understand'],
    limitations: ['May cite international sources; compare with your Indian board curriculum', 'Pro queries are limited'],
    accessUrl: 'https://www.perplexity.ai',
    isFreeOrFreemium: 'Limited free access'
  },

  phet: {
    id: 'phet',
    name: 'PhET Interactive Simulations',
    officialUrl: 'https://phet.colorado.edu',
    categories: ['maths-and-science', 'understand-topic'],
    bestFor: 'Visualising physics, chemistry, biology, and maths concepts through interactive experiments.',
    studentExamples: [
      'Interact with circuit components (batteries, resistors, switches) to see Ohm’s Law live.',
      'Visualize balancing chemical equations with molecular models.',
      'Explore projectile motion, gravity, and waves with sliders.'
    ],
    freeAccessType: 'Free',
    freeLimitations: 'Completely free open educational resource funded by University of Colorado Boulder; no paywalls or limits.',
    cardRequired: false,
    accountRequired: false,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Optional app',
    appRequired: false,
    minimumAge: 'All ages (Student-safe, non-profit academic resource)',
    supervisionNotes: 'Safe for all school grades. No ads, tracking, or user accounts required.',
    regionNotes: 'Available globally and translated into Hindi, Marathi, and many Indian languages.',
    privacyNotes: 'No personal data collected; runs locally in your web browser via HTML5.',
    evidenceUrls: [
      { label: 'PhET About & Licensing', url: 'https://phet.colorado.edu/en/about' },
      { label: 'PhET Terms of Use', url: 'https://phet.colorado.edu/en/about/terms-of-use' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    badge: 'Interactive Simulations',
    positioning: 'Interactive science and math simulations for intuitive understanding.',
    description: '100% free interactive science and math simulations created by University of Colorado Boulder.',
    capabilities: ['Interactive physics lab', 'Chemical reactions visualization', 'Math graph sliders'],
    strengths: ['Zero cost, zero ads', 'Works directly in phone browser', 'Aligned with Class 8–10 science'],
    suitableTasks: ['study-understand', 'math-solve', 'understand-image'],
    limitations: ['Focused on concept simulations, does not answer conversational text questions directly'],
    accessUrl: 'https://phet.colorado.edu',
    isFreeOrFreemium: '100% Free'
  },

  geogebra: {
    id: 'geogebra',
    name: 'GeoGebra',
    officialUrl: 'https://www.geogebra.org',
    categories: ['maths-and-science'],
    bestFor: 'Interactive graphing, coordinate geometry, quadratic parabolas, and geometric proofs.',
    studentExamples: [
      'Plot linear equations and find their intersection points on a Cartesian plane.',
      'Visualise tangent properties of circles for Class 10 Geometry.',
      'Observe how changing coefficients alters a quadratic parabola graph.'
    ],
    freeAccessType: 'Free',
    freeLimitations: 'Full online graphing calculator and geometry tool is completely free for non-commercial student use.',
    cardRequired: false,
    accountRequired: false,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Free iOS & Android app',
    appRequired: false,
    minimumAge: 'All ages (Student-safe, non-commercial education platform)',
    supervisionNotes: 'Widely used in CBSE/ICSE schools; no account needed to graph or solve.',
    regionNotes: 'Global availability; works smoothly on mobile web in India.',
    privacyNotes: 'No account needed for basic calculations and graphing.',
    evidenceUrls: [
      { label: 'GeoGebra Terms of Service', url: 'https://www.geogebra.org/terms' },
      { label: 'GeoGebra Calculator Suite', url: 'https://www.geogebra.org/calculator' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'recommended',
    badge: 'Math & Geometry',
    positioning: 'Graphing and geometric visualization tool for secondary school math.',
    description: 'Free dynamic mathematics software for learning geometry, algebra, and graphing.',
    capabilities: ['Cartesian graphing', 'Geometric constructions', 'Algebra visualization'],
    strengths: ['Visual proof of math formulas', 'Free mobile app and browser version', 'No sign-up required'],
    suitableTasks: ['math-solve', 'study-understand'],
    limitations: ['Specialized for mathematics and geometry; not a conversational text tutor'],
    accessUrl: 'https://www.geogebra.org',
    isFreeOrFreemium: 'Free educational tool'
  },

  claude: {
    id: 'claude',
    name: 'Claude',
    officialUrl: 'https://claude.ai',
    categories: ['writing-and-languages', 'notes-and-documents', 'coding-and-logic'],
    bestFor: 'Nuanced writing feedback, structured chapter notes, and clear code explanations.',
    studentExamples: [
      'Refine a Class 10 English essay for coherence, active voice, and strong vocabulary.',
      'Explain a Python function step-by-step with clear logic breakdown.',
      'Structure balanced arguments for a school debate on climate action.'
    ],
    freeAccessType: 'Limited free access',
    freeLimitations: 'Free tier has daily message rate limits that reset every few hours.',
    cardRequired: false,
    accountRequired: true,
    mobileWebStatus: 'Verified mobile web',
    appAvailability: 'Free iOS & Android app',
    appRequired: false,
    minimumAge: '18+ for direct consumer accounts (Requires teacher/parent supervision for under-18)',
    supervisionNotes: 'Anthropic Consumer Terms require direct account holders to be at least 18. Students under 18 should use with a teacher or parent.',
    regionNotes: 'Available in India and globally.',
    privacyNotes: 'Requires email or Google login. Avoid sharing sensitive personal information.',
    evidenceUrls: [
      { label: 'Anthropic Consumer Terms of Service (Age 18+)', url: 'https://www.anthropic.com/legal/consumer-terms' },
      { label: 'Claude Pricing & Free Tier Limits', url: 'https://claude.ai/pricing' }
    ],
    lastReviewedAt: 'October 2026',
    status: 'teacher-only',
    badge: 'Writing & Reasoning (18+ / Teacher Supervised)',
    positioning: 'Strong for structured notes, writing, and logic under adult guidance.',
    description: 'Conversational assistant by Anthropic known for nuance, structured writing, and code logic.',
    capabilities: ['Structured writing', 'Conceptual nuance', 'Code logic breakdown'],
    strengths: ['Clean bulleted formatting', 'Less prone to excessive cheerfulness', 'Follows instructions closely'],
    suitableTasks: ['make-notes', 'writing', 'study-understand', 'coding'],
    limitations: ['Direct consumer accounts are 18+; requires adult or teacher supervision for minors', 'Message limits on free tier'],
    accessUrl: 'https://claude.ai',
    isFreeOrFreemium: 'Limited free access (18+)'
  }
};

/**
 * Secondary discovery resource linking to "There's An AI For That"
 */
export const EXTERNAL_AI_DIRECTORY = {
  name: "There’s An AI For That",
  url: "https://theresanaiforthat.com/",
  label: "Explore more AI tools — There’s An AI For That",
  description: "An external directory for discovering AI tools. Listings may include paid tools or services unsuitable for your age. Check pricing, age requirements, and privacy before using them."
};
