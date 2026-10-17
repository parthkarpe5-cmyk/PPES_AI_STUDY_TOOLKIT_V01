# Prarambh Path — AI Study Toolkit V3.0 Baseline Audit

**Date:** October 17, 2026  
**Auditor:** Senior Full-Stack Engineer, Accessibility Auditor & Mobile UX Specialist  
**Application:** Prarambh Path — AI Study Toolkit (PPES)  
**Version:** V3.0 Baseline Audit  

---

## 1. Executive Summary & Baseline Results

A comprehensive audit was performed across the codebase prior to making modifications.

### Baseline Validation Execution:
- **TypeScript (`npx tsc --noEmit`):** PASS (0 errors).
- **Next.js Production Build (`npm run build` with Next.js 16.3.8 Turbopack):** PASS (all 5 routes prerendered statically: `/`, `/_not-found`, `/prompt-builder`, `/study`, `/verify`, `/which-ai`).
- **ESLint (`npm run lint`):** FAILED with 13 problems (5 errors, 8 warnings).
  - 5 errors: `react-hooks/set-state-in-effect` (violating React 19 / Next 16 concurrency standards).
  - 8 warnings: Unused variables and unused eslint-disable directives.
- **Automated Tests:** FAILED / MISSING (zero test scripts or test files in the repository).

---

## 2. Confirmed Strengths

1. **Lightweight & Independent Architecture:** Zero backend dependencies, no database required, no external API keys, 100% client-side privacy-first design.
2. **Curriculum Depth:** Extensive NCERT / CBSE curriculum taxonomies covering Classes 8, 9, and 10 across Science, Mathematics, Social Science, English, and Computer Science.
3. **Sound Educational Philosophy:** The "Choose → Ask → Check → Learn" core journey is woven throughout the UX, preventing students from treating AI as an automated homework-copying engine.
4. **Structured Prompt Framework:** Role, Student Level, Topic Context, Task, Output Format, and Constraints are systematically constructed.
5. **Brand Identity:** Distinctive PPES visual palette (Midnight Navy `#0d1f35`, Academic Deep Blue `#1f4e79`, Sky Blue `#2fa8cc`, Gurukul Gold `#c9a227`, Saffron Orange `#ff6b00`).
6. **Active Verification Focus:** Interactive 5-step verification checklist and explicit hallucination warnings.

---

## 3. Confirmed Defects & Issues Breakdown

### Priority Classification:
- **P0:** Blocks usability, accessibility, correctness, or core journeys. Must fix in V3.0.
- **P1:** Meaningful improvement for user experience, mobile usability, or curriculum transparency.
- **P2:** Optional future enhancement or cleanup.

---

### A. Core Correctness & Prompt Generation (P0)

- **[P0] Build Sub-Capabilities Mapped to Generic Templates:**
  - *Observed Defect:* In `data/capabilities.ts`, all five `Build` sub-capabilities (`code`, `debug`, `explain-code`, `project-idea`, `project-structure`) mapped to generic non-coding goal IDs:
    - `code` mapped to `solve-problem` (math numerical step template).
    - `debug` mapped to `improve-answer` (text essay critique template).
    - `explain-code` mapped to `understand-topic` (general topic explanation).
    - `project-idea` mapped to `understand-topic` (general topic explanation).
    - `project-structure` mapped to `make-detailed-notes` (book chapter notes).
  - *Impact:* Selecting "Build → Write code" resulted in prompts demanding "Identification of given data, governing formula, step-by-step mathematical working with units", which is incorrect for programming.
  - *Required Fix:* Introduce distinct goals with tailored instructions and output structures in `STUDY_GOALS`:
    - `code` (`build-code`): Beginner-friendly code in Python/HTML/Scratch with logic breakdown.
    - `debug` (`build-debug`): Code bug diagnosis, root cause explanation, corrected snippet, and prevention tips.
    - `explain-code` (`build-explain-code`): Line-by-line student-level code explanation.
    - `project-idea` (`build-project-idea`): School-appropriate science/tech/coding project ideas with materials and feasibility.
    - `project-structure` (`build-project-structure`): Step-by-step project milestone blueprint and documentation guide.

- **[P0] ESLint Rule Failures in React 19 / Next 16:**
  - *Observed Defect:* Calling `setState` synchronously within `useEffect` hooks in `app/prompt-builder/page.tsx`, `app/which-ai/page.tsx`, `components/Navbar.tsx`, `components/SinglePageBuilder.tsx`, and `components/StudyProfileModal.tsx`.
  - *Impact:* Triggers cascading re-renders and causes `npm run lint` to exit with error code 1.
  - *Required Fix:* Initialize states lazily using callback initializers where appropriate or use event-driven updates.

---

### B. Mobile UX Problems (P0 & P1)

- **[P0] Mobile Sticky Action Bar Conflicts:**
  - *Observed Defect:* In `SinglePageBuilder.tsx`, a sticky generate button (`sticky bottom-3 z-20`) conflicts with the mobile fixed action bar (`fixed bottom-3 inset-x-3 z-30`) after prompt generation, causing element overlap, obscuring the verification card and reset buttons.
  - *Required Fix:* Harmonize sticky elements; ensure adequate bottom padding (`pb-24`) when bottom action bar is active, and ensure buttons do not obscure input controls.

- **[P1] Touch Target Heights Below 44px:**
  - *Observed Defect:* Several topic selector buttons, chapter filter chips, and sub-capability items had heights of 36px (`min-h-[36px]`).
  - *Required Fix:* Enforce minimum 44×44px touch targets across all interactive chips and buttons.

- **[P1] Mobile Progressive Disclosure Polish:**
  - *Observed Defect:* On small screens (360px, 390px), initial page scrolling was required before the builder controls became visible.
  - *Required Fix:* Add a quick start direct CTA in the hero to immediately jump or focus into the builder, keep hero concise on mobile, and ensure previous steps remain easily editable via compact summary chips.

- **[P1] Topic Search Feedback on Touch Devices:**
  - *Observed Defect:* When entering a custom topic, no instant visual indicator confirmed that the custom input superseded the selected chapter topic.
  - *Required Fix:* Add visual status indicator confirming custom topic takes priority without overwriting curriculum definitions.

---

### C. Accessibility Problems (P0 & P1)

- **[P0] Icon-Only Buttons Missing Accessible Names:**
  - *Observed Defect:* Reset button and modal dismiss buttons had title attributes but lacked consistent `aria-label` attributes for screen readers.
  - *Required Fix:* Add explicit `aria-label` attributes to all icon-only interactive controls.

- **[P1] Missing Reduced Motion Support:**
  - *Observed Defect:* CSS animations (`animate-bounce`, `animate-in`, `fade-in`, `slide-in-from-top`) ran unconditionally without respecting `prefers-reduced-motion`.
  - *Required Fix:* Add `@media (prefers-reduced-motion: reduce)` in `app/globals.css` to disable heavy animations for sensitive users.

- **[P1] Focus Rings Visibility and Contrast:**
  - *Observed Defect:* Some interactive cards relied on subtle border color changes (`hover:border-[#2fa8cc]/50`) without a high-contrast focus ring for keyboard navigation.
  - *Required Fix:* Enforce `focus-visible:outline-2 focus-visible:outline-[#2fa8cc] focus-visible:outline-offset-2`.

---

### D. Curriculum Transparency & Data Integrity (P1)

- **[P1] Unsupported Board Fallback Transparency:**
  - *Observed Defect:* When a student selects "ICSE" or "State Board", the builder silently returns CBSE/NCERT curriculum subjects.
  - *Required Fix:* Add a helpful note: "Using NCERT benchmark curriculum. You can also type your custom chapter or topic below." Ensure custom topics never mutate core curriculum objects.

---

### E. Test Coverage Gaps (P0)

- **[P0] Total Lack of Automated Regression Tests:**
  - *Observed Defect:* No test directory, no test runner script in `package.json`.
  - *Required Fix:* Implement a comprehensive test suite utilizing Node.js 24 native test runner (`node --test --experimental-strip-types`), covering:
    - Unit tests for all prompt generation tasks (Understand, Revise, Practise, Create, Build, Explore).
    - Unit tests for curriculum and AI recommender helpers.
    - End-to-end user journey tests for Journeys 1 through 8.

---

## 4. Issues That Do NOT Need Fixing

1. **Do not replace Next.js 16 or Tailwind CSS:** Architecture is fast and stable.
2. **Do not add database or user accounts:** The tool must remain free, anonymous, and instant for school students.
3. **Do not connect live AI API keys:** Prarambh Path is a client-side prompt engineering literacy toolkit, not a metered API wrapper.
4. **Do not fabricate official ICSE syllabi:** Document the NCERT benchmark clearly rather than hallucinating unofficial board mappings.

---

## 5. Action Plan & Completion Status

| File | Changes Applied | Priority | Status |
| :--- | :--- | :---: | :---: |
| `data/capabilities.ts` | Mapped Build tasks (`code`, `debug`, `explain-code`, `project-idea`, `project-structure`) to distinct goal IDs | **P0** | ✅ Done |
| `data/prompt-templates.ts` | Added 5 distinct `STUDY_GOALS` for Build tasks with tailored task instructions and output structures | **P0** | ✅ Done |
| `components/SinglePageBuilder.tsx` | Fixed React 19 setState-in-effect (replaced `useEffect` sync with lazy initializer + render-phase key comparison), touch targets ≥44px, mobile sticky bar spacing (`pb-24`), non-CBSE board note, focus-visible outlines | **P0** | ✅ Done |
| `components/Navbar.tsx` | Fixed setState-in-effect (lazy initializer), removed unused imports (`GraduationCap`) | **P0** | ✅ Done |
| `app/prompt-builder/page.tsx` | Fixed setState-in-effect, removed unused imports | **P0** | ✅ Done |
| `app/which-ai/page.tsx` | Fixed setState-in-effect, removed unused imports | **P0** | ✅ Done |
| `components/StudyProfileModal.tsx` | Fixed setState-in-effect, improved accessibility | **P0** | ✅ Done |
| `components/VerificationChecklist.tsx` | Removed unused imports, verified keyboard accessibility | **P1** | ✅ Done |
| `app/globals.css` | Added `prefers-reduced-motion: reduce` media query disabling animations for sensitive users | **P1** | ✅ Done |
| `package.json` | Added `"test"` script (Node.js native test runner), scoped `"lint"` to source directories | **P0** | ✅ Done |
| `tests/prompt-generator.test.ts` | 6 unit tests covering prompt generation, fallbacks, custom topics, Build and Create task uniqueness, capability-goal mapping integrity | **P0** | ✅ Done |
| `tests/curriculum-and-ai.test.ts` | 5 unit tests covering curriculum retrieval (Classes 8/9/10), subject/chapter lookups, AI recommender, study profile defaults | **P0** | ✅ Done |
| `tests/journeys.test.ts` | 8 journey tests covering all 8 user journeys (Science Understanding, Revision, Create, Build, Edit/Reset, Mobile, Verification, Accessibility) | **P0** | ✅ Done |
| `tsconfig.json` | Added `allowImportingTsExtensions: true` to support `.ts` imports for both Node test runner and Next.js bundler | **P0** | ✅ Done |
| `eslint.config.mjs` | Added `argsIgnorePattern: "^_"` for intentional placeholder parameters | **P1** | ✅ Done |

---

## 6. Final Validation Results (V3.0)

| Check | Command | Result |
| :--- | :--- | :---: |
| **Production Build** | `npm run build` | ✅ Pass — 6 routes prerendered (Turbopack) |
| **TypeScript** | `next build` (includes `tsc`) | ✅ 0 errors |
| **ESLint** | `npm run lint` | ✅ 0 errors, 0 warnings |
| **Automated Tests** | `npm test` | ✅ **19/19 pass**, 0 fail |

### Test Suite Summary

```
✔ Prompt Generator — Class, Subject, and Topic Context Inclusion
✔ Prompt Generator — Fallbacks for Empty / Missing Inputs
✔ Prompt Generator — Custom Topics Handling
✔ Prompt Generator — Distinct Create Tasks Produce Distinct Prompts
✔ Prompt Generator — Distinct Build Tasks Produce Distinct Prompts
✔ Prompt Generator — Capability Gallery Mapping Integrity
✔ Curriculum — Class 8, 9, 10 Retrieval and Chapter Integrity
✔ Curriculum — Subject and Chapter by ID Lookup
✔ AI Recommender — All Study Tasks Have Valid Tool Recommendations
✔ AI Recommender — Fallback Handling for Unknown Task
✔ Study Profile — Default State and Label Mapping
✔ Journey 1 — Science Understanding Journey
✔ Journey 2 — Revision Journey
✔ Journey 3 — Create Journey (All 5 Create Task IDs)
✔ Journey 4 — Build Journey (All 5 Build Task IDs)
✔ Journey 5 — Editing and Reset Behavior
✔ Journey 6 — Mobile Usability Verification
✔ Journey 7 — Verification Guidance and Safe AI Handoff
✔ Journey 8 — Accessibility Standards Verification
```

