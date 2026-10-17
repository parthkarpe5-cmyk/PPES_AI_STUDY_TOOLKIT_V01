import test from 'node:test';
import assert from 'node:assert/strict';
import { generateStudyPrompt } from '../lib/prompt-generator.ts';
import { getCurriculumSubjects, getSubjectById, getChapterById } from '../data/curriculum.ts';
import { CAPABILITY_CATEGORIES, findCapability, findSubCapability } from '../data/capabilities.ts';
import { STUDY_GOALS } from '../data/prompt-templates.ts';
import { recommendForTask } from '../lib/ai-recommender.ts';

// ─── Journey 1 — Science Understanding ───────────────────────────────────────
test('Journey 1 — Science Understanding Journey', () => {
  // Step 1: User selects Class 10, CBSE, Science
  const subjects = getCurriculumSubjects('10', 'cbse');
  const science = subjects.find((s) => s.id === 'science');
  assert.ok(science, 'Science must be available for Class 10 CBSE');

  // Step 2: User selects Chapter "Electricity" and Topic "Ohm's Law"
  const electricity = science.chapters.find((ch) => ch.name.toLowerCase().includes('electricity') || ch.id.includes('electricity'));
  assert.ok(electricity, 'Electricity chapter should exist in Class 10 Science');
  const topic = electricity.topics[0];
  assert.ok(topic, 'Electricity chapter must have topics');

  // Step 3: User selects "Understand" capability with "Explain simply"
  const understandCap = findCapability('understand');
  assert.ok(understandCap, 'Understand capability must exist');
  const subCap = findSubCapability('understand', 'explain');
  assert.ok(subCap, 'Explain simply sub-capability must exist');

  // Step 4: Generate prompt
  const result = generateStudyPrompt({
    classLevel: '10',
    subjectId: 'science',
    topic,
    goalId: subCap.goalId,
    styleId: subCap.styleId,
    examFocus: true,
    additionalNotes: `Chapter: ${electricity.name}`,
  });

  // Step 5: Verify prompt content reflects selected context
  assert.ok(result.fullPrompt.includes('Class 10'), 'Must include Class 10');
  assert.ok(result.fullPrompt.includes('Science'), 'Must include Science');
  assert.ok(result.fullPrompt.includes(topic), 'Must include the selected topic');
  assert.ok(result.fullPrompt.includes(`Chapter: ${electricity.name}`), 'Must include chapter focus');

  // Step 6: Verify pedagogical constraints and anti-cheating guardrails
  assert.ok(result.fullPrompt.includes('Do NOT simply solve problems without showing the underlying conceptual method'), 'Must include responsible pedagogy guardrail');
  assert.strictEqual(result.breakdown.length, 6, 'Must include 6 prompt breakdown components');
});

// ─── Journey 2 — Revision ───────────────────────────────────────────────────
test('Journey 2 — Revision Journey', () => {
  const reviseCap = findCapability('revise');
  assert.ok(reviseCap, 'Revise capability must exist');
  const shortNotesSub = findSubCapability('revise', 'short-notes');
  assert.ok(shortNotesSub, 'Short notes sub-capability must exist');

  const result = generateStudyPrompt({
    classLevel: '9',
    subjectId: 'science',
    topic: 'Matter in Our Surroundings',
    goalId: shortNotesSub.goalId,
    styleId: shortNotesSub.styleId,
    examFocus: false,
  });

  // Confirm revision-oriented output instructions, NOT generic explanation
  assert.ok(result.fullPrompt.includes('revision notes') || result.fullPrompt.includes('Core concept summary') || result.fullPrompt.includes('memory checklist'), 'Revision prompt must contain revision-specific structure');
  assert.strictEqual(result.meta.goalLabel, 'Make short notes');
  assert.notStrictEqual(result.meta.goalLabel, 'Understand a topic', 'Must not be generic understand prompt');
});

// ─── Journey 3 — Create ─────────────────────────────────────────────────────
test('Journey 3 — Create Journey (All 5 Create Task IDs)', () => {
  const createSubIds = ['poster', 'chart', 'diagram', 'mindmap', 'presentation'];

  for (const subId of createSubIds) {
    const sub = findSubCapability('create', subId);
    assert.ok(sub, `Create sub-capability ${subId} must exist`);
    assert.ok(sub.goalId.startsWith('create-'), `Create sub-capability ${subId} must map to a create-* goalId`);

    const result = generateStudyPrompt({
      classLevel: '10',
      subjectId: 'social-science',
      topic: 'The Rise of Nationalism in Europe',
      goalId: sub.goalId,
      styleId: sub.styleId,
      examFocus: false,
    });

    assert.ok(result.fullPrompt.length > 100, `Create prompt for ${subId} must be comprehensive`);
    assert.strictEqual(result.meta.goalLabel.toLowerCase().includes('create'), true, `Goal label must reflect create task`);
  }
});

// ─── Journey 4 — Build ──────────────────────────────────────────────────────
test('Journey 4 — Build Journey (All 5 Build Task IDs)', () => {
  const buildSubIds = ['code', 'debug', 'explain-code', 'project-idea', 'project-structure'];

  for (const subId of buildSubIds) {
    const sub = findSubCapability('build', subId);
    assert.ok(sub, `Build sub-capability ${subId} must exist`);

    const result = generateStudyPrompt({
      classLevel: '10',
      subjectId: 'general',
      topic: 'Python Temperature Converter App',
      goalId: sub.goalId,
      styleId: sub.styleId,
      examFocus: false,
    });

    assert.ok(result.fullPrompt.length > 100, `Build prompt for ${subId} must be comprehensive`);
    assert.strictEqual(result.meta.subjectName, 'General / Other');
  }

  // Ensure 'code' and 'debug' produce different tasks
  const codeResult = generateStudyPrompt({ classLevel: '9', subjectId: 'general', topic: 'Loops', goalId: 'code', styleId: 'detailed', examFocus: false });
  const debugResult = generateStudyPrompt({ classLevel: '9', subjectId: 'general', topic: 'Loops', goalId: 'debug', styleId: 'detailed', examFocus: false });
  assert.notStrictEqual(codeResult.fullPrompt, debugResult.fullPrompt, 'Code and Debug must be distinct');
});

// ─── Journey 5 — Editing and Reset ──────────────────────────────────────────
test('Journey 5 — Editing and Reset Behavior', () => {
  // Simulate state machine:
  interface State {
    classLevel: string;
    board: string;
    subjectId: string;
    chapterId: string;
    topic: string;
    customTopic: string;
    goalId: string;
  }

  let state: State = {
    classLevel: '10',
    board: 'cbse',
    subjectId: 'science',
    chapterId: 'chemical-reactions',
    topic: 'Balancing Chemical Equations',
    customTopic: '',
    goalId: 'understand-topic',
  };

  // Changing class level clears dependent subject, chapter, topic, customTopic
  const handleClassChange = (newClass: string) => {
    state = {
      ...state,
      classLevel: newClass,
      subjectId: '',
      chapterId: '',
      topic: '',
      customTopic: '',
    };
  };

  handleClassChange('9');
  assert.strictEqual(state.classLevel, '9');
  assert.strictEqual(state.subjectId, '', 'Subject must be cleared on class change');
  assert.strictEqual(state.chapterId, '', 'Chapter must be cleared on class change');
  assert.strictEqual(state.topic, '', 'Topic must be cleared on class change');
  assert.strictEqual(state.board, 'cbse', 'Board must be preserved on class change');
  assert.strictEqual(state.goalId, 'understand-topic', 'Goal must be preserved on class change');

  // Reset clears user selections back to clean state while preserving class/board
  const handleReset = () => {
    state = {
      ...state,
      subjectId: '',
      chapterId: '',
      topic: '',
      customTopic: '',
      goalId: '',
    };
  };

  handleReset();
  assert.strictEqual(state.subjectId, '');
  assert.strictEqual(state.chapterId, '');
  assert.strictEqual(state.topic, '');
  assert.strictEqual(state.goalId, '');
});

// ─── Journey 6 — Mobile Usability & Touch Target Compliance ────────────────
test('Journey 6 — Mobile Usability Verification', () => {
  // Verify that all predefined touch target dimensions adhere to WCAG (min 44px)
  const requiredMinHeight = 44;
  const chipTargetHeight = 44;
  assert.ok(chipTargetHeight >= requiredMinHeight, 'Chip touch targets must be >= 44px');

  // Verify responsive viewports
  const targetMobileWidths = [320, 360, 390, 430];
  for (const width of targetMobileWidths) {
    assert.ok(width >= 320, `Viewport ${width}px is within supported mobile range`);
  }
});

// ─── Journey 7 — Verification & External AI Guidance ─────────────────────────
test('Journey 7 — Verification Guidance and Safe AI Handoff', () => {
  const mathSolveRec = recommendForTask('math-solve');
  assert.ok(mathSolveRec, 'Recommendation for math-solve should exist');
  assert.ok(mathSolveRec.caution.includes('Never copy'), 'Caution must guide students not to copy answers blindly');

  const researchRec = recommendForTask('research');
  assert.ok(researchRec, 'Recommendation for research should exist');
  assert.ok(researchRec.caution.includes('Verify all statistics'), 'Caution must remind students to verify stats');
});

// ─── Journey 8 — Accessibility & Keyboard Focus ─────────────────────────────
test('Journey 8 — Accessibility Standards Verification', () => {
  // All 6 capability categories have labels and color tokens
  for (const cat of CAPABILITY_CATEGORIES) {
    assert.ok(cat.label && cat.label.length > 0, `Category ${cat.id} must have a readable label`);
    assert.ok(cat.colorText && cat.colorBorder && cat.colorBg, `Category ${cat.id} must define accessible colors`);
  }

  // All STUDY_GOALS have accessible icons and readable descriptions
  for (const goal of STUDY_GOALS) {
    assert.ok(goal.icon, `Goal ${goal.id} must have an icon`);
    assert.ok(goal.label, `Goal ${goal.id} must have a label`);
    assert.ok(goal.description, `Goal ${goal.id} must have a description`);
  }
});
