# Prarambh Path — AI Study Toolkit (Class 8–10)

> **Philosophy**: *Choose. Ask. Check. Learn.*  
> A mobile-first, intelligent educational web application guiding students in Grades 8 to 10 to use AI responsibly, systematically, and effectively for their studies.

---

## 🌟 Overview

Students today have access to powerful AI tools, but often use them as simple answer-generators rather than interactive study coaches. **Prarambh Path — AI Study Toolkit** bridges this gap by training students to:
1. **Choose**: Identify their study goal and select the right AI tool (ChatGPT, Claude, Gemini, Perplexity, Photomath, Khanmigo, etc.).
2. **Ask**: Structure high-impact, curriculum-aligned prompts (Role, Task, Context, Constraints) tailored to CBSE/ICSE Class 8–10 subjects.
3. **Check**: Rigorously verify AI outputs using interactive 5-point verification checklists and hallucination detectors.
4. **Learn**: Understand concepts deeply instead of copying homework answers.

---

## 🚀 Key Features & Modules

### 1. 🧭 Which AI Tool Should I Use? (`/which-ai`)
- **Interactive Task Selector**: Select from 8 distinct study goals (Concept Explanation, Math Problem Solving, Essay Writing & Review, Revision Summaries, Quiz & Self-Testing, Coding & Logic, Exam Prep & Strategy, Language Learning).
- **Direct Recommendations**: Categorized recommendations highlighting *Best Free Options*, *Specialist Math/Science Tools*, and *Research/Fact-checking Engines*.
- **Tool Directory & Comparison**: Clear breakdown of tool strengths, limitations, free tier allowances, and student safety notes.

### 2. ⚡ AI Prompt Builder (`/prompt-builder`)
- **Structured 4-Part Prompt Engineering Framework**:
  - **Role**: Define AI persona (e.g., Patient High School Science Tutor, Friendly Math Mentor).
  - **Task**: Specify objective (Step-by-step breakdown, Practice quiz, Socratic hints).
  - **Context**: Grade level (Class 8, 9, 10), board (CBSE / ICSE / State), and current topic.
  - **Constraints**: "Do not give the final answer directly; guide me with hints", "Keep language simple", "Use NCERT examples".
- **Curated Subject Presets**: Preloaded templates across Science (Physics, Chemistry, Biology), Mathematics, Social Science (History, Civics, Geography), and English Literature/Grammar.
- **1-Click Copy & Direct AI Launch**: Copy formatted prompts or open them straight in ChatGPT, Gemini, or Claude.

### 3. 🔍 Verify AI Answers (`/verify`)
- **5-Step Verification Checklist**:
  1. *Factual Cross-Reference*: Checking against NCERT / board textbooks.
  2. *Calculation Check*: Recalculating mathematical steps independently.
  3. *Hallucination Red Flags*: Spotting phantom dates, invented citations, or contradictory reasoning.
  4. *Curriculum Alignment*: Checking if nomenclature matches CBSE/ICSE syllabus.
  5. *Tone & Bias*: Evaluating if the explanation simplifies or overcomplicates.
- **Confidence Rating Calculator**: Interactive score giving students a clear green/yellow/red readiness indicator before accepting an AI answer.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with custom design tokens, responsive mobile-first typography, micro-animations, glassmorphism, and accessible color contrasts
- **Icons**: Lucide React
- **Optimization**: Zero heavy runtime UI libraries; lightweight, fast, and SEO-optimized

---

## 🏃 Getting Started Locally

### Prerequisites
- Node.js (v18.17+ or v20+ recommended)
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ppptk.git

# Navigate to the project directory
cd PPPTK

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

---

## 📱 Mobile-First Design & Accessibility

- Optimized for smartphones and tablets (touch targets ≥ 48px).
- Clean typographic scale with clear visual hierarchy.
- Dark and light aesthetic contrasts respecting WCAG AA accessibility standards.

---

## 📜 License

Created for **Prarambh Path Educational Initiative**. All rights reserved.
