export interface SubjectConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  sampleTopicsByClass: {
    '8': string[];
    '9': string[];
    '10': string[];
  };
}

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'emerald',
    sampleTopicsByClass: {
      '8': ['Force and Pressure', 'Sound', 'Cell Structure & Functions', 'Microorganisms: Friend and Foe', 'Light and Vision', 'Combustion and Flame'],
      '9': ['Matter in Our Surroundings', 'Force and Laws of Motion', 'Gravitation', 'Tissues', 'Work and Energy', 'Structure of the Atom'],
      '10': ['Electricity', 'Light: Reflection & Refraction', 'Chemical Reactions and Equations', 'Life Processes', 'Metals and Non-metals', 'Magnetic Effects of Electric Current', 'Heredity and Evolution']
    }
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'blue',
    sampleTopicsByClass: {
      '8': ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Algebraic Expressions', 'Mensuration', 'Exponents and Powers'],
      '9': ['Number Systems', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in Two Variables', 'Lines and Angles', 'Triangles', 'Surface Areas and Volumes'],
      '10': ['Quadratic Equations', 'Arithmetic Progressions', 'Triangles & Similarity', 'Introduction to Trigonometry', 'Coordinate Geometry', 'Surface Areas and Volumes', 'Statistics and Probability']
    }
  },
  {
    id: 'social-science',
    name: 'Social Science',
    icon: '🌍',
    color: 'amber',
    sampleTopicsByClass: {
      '8': ['Resources and Development', 'Indian Constitution', 'The Indian National Movement', 'Judiciary', 'Industries', 'Agriculture'],
      '9': ['The French Revolution', 'Socialism in Europe & Russian Revolution', 'India: Size and Location', 'Physical Features of India', 'What is Democracy? Why Democracy?', 'Poverty as a Challenge'],
      '10': ['The Rise of Nationalism in Europe', 'Nationalism in India', 'Resources and Development', 'Power Sharing & Federalism', 'Sectors of the Indian Economy', 'Money and Credit', 'Globalization']
    }
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'purple',
    sampleTopicsByClass: {
      '8': ['Formal & Informal Letter Writing', 'Active and Passive Voice', 'Direct and Indirect Speech', 'Story Writing with Moral', 'Notice Writing', 'Tenses and Modals'],
      '9': ['Analytical Paragraph Writing', 'Diary Entry', 'Subject-Verb Concord', 'Determiners and Modals', 'Reported Speech', 'Theme Analysis of Prose/Poem'],
      '10': ['Analytical Paragraph Writing', 'Formal Letter to the Editor', 'Reported Speech: Commands & Requests', 'Tenses & Modals Editing Exercises', 'Character Sketch Writing', 'Theme & Literary Devices Analysis']
    }
  },
  {
    id: 'general',
    name: 'General / Other',
    icon: '💡',
    color: 'indigo',
    sampleTopicsByClass: {
      '8': ['Basics of Computer Logic', 'Time Management for Students', 'Healthy Study Habits', 'Environmental Awareness'],
      '9': ['Python Programming Fundamentals', 'Effective Note Taking Techniques', 'Public Speaking & ASL Prep', 'Cyber Safety Basics'],
      '10': ['Board Exam Strategy & Timetable', 'Python Basics & Flowcharts', 'Career Streams after Class 10', 'Effective Revision Techniques']
    }
  }
];

export const CLASS_LEVELS = [
  { value: '8', label: 'Class 8', description: 'Foundation level concepts and intuitive explanations' },
  { value: '9', label: 'Class 9', description: 'Intermediate concepts, conceptual depth and initial board prep' },
  { value: '10', label: 'Class 10', description: 'Board examination focus, precise definitions and scoring points' }
];
