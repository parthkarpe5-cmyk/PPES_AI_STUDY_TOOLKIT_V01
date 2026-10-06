import React from 'react';
import {
  Brain,
  BookOpen,
  Palette,
  CheckSquare,
  Search,
  Code2,
  Lightbulb,
  Repeat,
  Pin,
  ListOrdered,
  FileText,
  Star,
  Layers,
  FileCheck,
  Image as ImageIcon,
  BarChart3,
  GitBranch,
  Presentation,
  HelpCircle,
  Clock,
  Puzzle,
  Wrench,
  PenTool,
  Compass,
  Sparkles,
  FlaskConical,
  Calculator,
  Globe2,
  Languages,
  Laptop,
  Atom,
  TestTube2,
  Leaf,
  History,
  ShieldCheck,
  TrendingUp,
  Bot,
  UserCheck,
  GraduationCap,
  Scale,
  Zap,
  Bookmark
} from 'lucide-react';

export type StudyIconName =
  // Capabilities
  | 'understand'
  | 'revise'
  | 'create'
  | 'practise'
  | 'explore'
  | 'build'
  // Sub-capabilities
  | 'explain'
  | 'analogy'
  | 'examples'
  | 'step-by-step'
  | 'short-notes'
  | 'key-points'
  | 'flashcards'
  | 'detailed-notes'
  | 'poster'
  | 'chart'
  | 'diagram'
  | 'mindmap'
  | 'presentation'
  | 'questions'
  | 'mock-test'
  | 'solve'
  | 'curiosity'
  | 'history-discovery'
  | 'application'
  | 'code'
  | 'debug'
  | 'explain-code'
  | 'project-idea'
  | 'project-structure'
  // Subjects
  | 'science'
  | 'math'
  | 'mathematics'
  | 'social-science'
  | 'english'
  | 'computer'
  | 'computer-applications'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history'
  | 'civics'
  | 'geography'
  | 'economics'
  // Prompt Ingredients
  | 'role'
  | 'topic'
  | 'style'
  | 'output'
  | 'practice'
  | 'guardrail'
  | 'constraint'
  // AI Tools
  | 'chatgpt'
  | 'gemini'
  | 'claude'
  | 'notebooklm'
  | 'default';

interface StudyIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function StudyIcon({ name, className = 'w-5 h-5', size }: StudyIconProps) {
  const iconProps = { className, ...(size ? { size } : {}) };
  const normalized = name.toLowerCase().replace(/[^a-z0-9-]/g, '');

  switch (normalized) {
    // ─── Capabilities ────────────────────────────────────────────────────────
    case 'understand':
      return <Brain {...iconProps} />;
    case 'revise':
      return <BookOpen {...iconProps} />;
    case 'create':
      return <Palette {...iconProps} />;
    case 'practise':
    case 'practice':
      return <CheckSquare {...iconProps} />;
    case 'explore':
      return <Search {...iconProps} />;
    case 'build':
      return <Code2 {...iconProps} />;

    // ─── Sub-capabilities ───────────────────────────────────────────────────
    case 'explain':
      return <Lightbulb {...iconProps} />;
    case 'analogy':
      return <Repeat {...iconProps} />;
    case 'examples':
      return <Pin {...iconProps} />;
    case 'step-by-step':
      return <ListOrdered {...iconProps} />;
    case 'short-notes':
      return <FileText {...iconProps} />;
    case 'key-points':
      return <Star {...iconProps} />;
    case 'flashcards':
      return <Layers {...iconProps} />;
    case 'detailed-notes':
      return <FileCheck {...iconProps} />;
    case 'poster':
      return <ImageIcon {...iconProps} />;
    case 'chart':
      return <BarChart3 {...iconProps} />;
    case 'diagram':
      return <PenTool {...iconProps} />;
    case 'mindmap':
      return <GitBranch {...iconProps} />;
    case 'presentation':
      return <Presentation {...iconProps} />;
    case 'questions':
      return <HelpCircle {...iconProps} />;
    case 'mock-test':
      return <Clock {...iconProps} />;
    case 'solve':
      return <Puzzle {...iconProps} />;
    case 'curiosity':
      return <Compass {...iconProps} />;
    case 'history-discovery':
      return <History {...iconProps} />;
    case 'application':
      return <Zap {...iconProps} />;
    case 'code':
      return <Code2 {...iconProps} />;
    case 'debug':
      return <Wrench {...iconProps} />;
    case 'explain-code':
      return <Lightbulb {...iconProps} />;
    case 'project-idea':
      return <Sparkles {...iconProps} />;
    case 'project-structure':
      return <Layers {...iconProps} />;

    // ─── Subjects ────────────────────────────────────────────────────────────
    case 'science':
      return <FlaskConical {...iconProps} />;
    case 'math':
    case 'mathematics':
      return <Calculator {...iconProps} />;
    case 'social-science':
    case 'social science':
      return <Globe2 {...iconProps} />;
    case 'english':
      return <Languages {...iconProps} />;
    case 'computer':
    case 'computer-applications':
      return <Laptop {...iconProps} />;
    case 'physics':
      return <Atom {...iconProps} />;
    case 'chemistry':
      return <TestTube2 {...iconProps} />;
    case 'biology':
      return <Leaf {...iconProps} />;
    case 'history':
      return <History {...iconProps} />;
    case 'civics':
      return <Scale {...iconProps} />;
    case 'geography':
      return <Globe2 {...iconProps} />;
    case 'economics':
      return <TrendingUp {...iconProps} />;

    // ─── Prompt demo ingredients ─────────────────────────────────────────────
    case 'role':
      return <UserCheck {...iconProps} />;
    case 'topic':
      return <Bookmark {...iconProps} />;
    case 'style':
      return <Repeat {...iconProps} />;
    case 'output':
      return <FileText {...iconProps} />;
    case 'guardrail':
    case 'constraint':
      return <ShieldCheck {...iconProps} />;

    // ─── AI Tools ────────────────────────────────────────────────────────────
    case 'chatgpt':
    case 'gemini':
    case 'claude':
    case 'notebooklm':
      return <Bot {...iconProps} />;

    default:
      return <Sparkles {...iconProps} />;
  }
}
