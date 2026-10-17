import test from 'node:test';
import assert from 'node:assert/strict';
import { generateStudyPrompt } from '../lib/prompt-generator.ts';
import { STUDY_GOALS } from '../data/prompt-templates.ts';
import { CAPABILITY_CATEGORIES } from '../data/capabilities.ts';

test('Prompt Generator — Class, Subject, and Topic Context Inclusion', () => {
  const result = generateStudyPrompt({
    classLevel: '10',
    subjectId: 'science',
    topic: "Ohm's Law and Resistance",
    goalId: 'understand-topic',
    styleId: 'simple',
    examFocus: true,
  });

  assert.ok(result.fullPrompt.includes('Class 10'), 'Prompt should specify Class 10');
  assert.ok(result.fullPrompt.includes('Science'), 'Prompt should specify Science');
  assert.ok(result.fullPrompt.includes("Ohm's Law and Resistance"), 'Prompt should include the topic');
  assert.ok(result.fullPrompt.includes('board/term examinations'), 'Prompt should include exam focus');
  assert.strictEqual(result.meta.classLevel, '10');
  assert.strictEqual(result.meta.subjectName, 'Science');
  assert.strictEqual(result.meta.topic, "Ohm's Law and Resistance");
});

test('Prompt Generator — Fallbacks for Empty / Missing Inputs', () => {
  const result = generateStudyPrompt({
    classLevel: '',
    subjectId: 'non-existent-subject',
    topic: '   ',
    goalId: 'non-existent-goal',
    styleId: 'non-existent-style',
    examFocus: false,
  });

  assert.ok(result.fullPrompt.includes('Class 10'), 'Should fallback to default Class 10');
  assert.ok(result.fullPrompt.includes('Core Syllabus Concepts'), 'Should fallback to default topic');
  assert.ok(result.meta.subjectName.length > 0, 'Should have a valid fallback subject name');
  assert.ok(result.breakdown.length === 6, 'Breakdown should have all 6 prompt components');
});

test('Prompt Generator — Custom Topics Handling', () => {
  const customTopic = 'Derivation of Lens Formula for Concave Mirror';
  const result = generateStudyPrompt({
    classLevel: '10',
    subjectId: 'science',
    topic: customTopic,
    goalId: 'understand-topic',
    styleId: 'simple',
    examFocus: true,
  });

  assert.ok(result.fullPrompt.includes(customTopic), 'Prompt must preserve exact custom topic');
  assert.strictEqual(result.meta.topic, customTopic);
});

test('Prompt Generator — Distinct Create Tasks Produce Distinct Prompts', () => {
  const createTasks = [
    'create-poster',
    'create-chart',
    'create-diagram',
    'create-mindmap',
    'create-presentation',
  ];

  const generatedPrompts = new Map<string, string>();

  for (const taskId of createTasks) {
    const goal = STUDY_GOALS.find((g) => g.id === taskId);
    assert.ok(goal, `Goal for task ${taskId} must exist in STUDY_GOALS`);

    const result = generateStudyPrompt({
      classLevel: '9',
      subjectId: 'science',
      topic: 'Photosynthesis',
      goalId: taskId,
      styleId: 'simple',
      examFocus: false,
    });

    assert.ok(result.fullPrompt.length > 100, `Generated prompt for ${taskId} must not be empty`);
    generatedPrompts.set(taskId, result.fullPrompt);
  }

  // Ensure all 5 generated prompts are unique
  const promptTexts = Array.from(generatedPrompts.values());
  const uniquePrompts = new Set(promptTexts);
  assert.strictEqual(uniquePrompts.size, 5, 'Every Create task must produce a unique prompt');

  // Verify specific expected content for Create tasks
  assert.ok(generatedPrompts.get('create-poster')!.includes('poster'), 'Poster prompt must mention poster');
  assert.ok(generatedPrompts.get('create-chart')!.includes('comparison table'), 'Chart prompt must request comparison table');
  assert.ok(generatedPrompts.get('create-diagram')!.includes('diagram'), 'Diagram prompt must request diagram instructions');
  assert.ok(generatedPrompts.get('create-mindmap')!.includes('mind map'), 'Mindmap prompt must request mind map');
  assert.ok(generatedPrompts.get('create-presentation')!.includes('presentation outline'), 'Presentation prompt must request slide outline');
});

test('Prompt Generator — Distinct Build Tasks Produce Distinct Prompts', () => {
  const buildTaskIds = [
    'code',
    'debug',
    'explain-code',
    'project-idea',
    'project-structure',
  ];

  const generatedPrompts = new Map<string, string>();

  for (const taskId of buildTaskIds) {
    const goal = STUDY_GOALS.find((g) => g.id === taskId);
    assert.ok(goal, `Build goal ${taskId} must exist in STUDY_GOALS`);

    const result = generateStudyPrompt({
      classLevel: '10',
      subjectId: 'general',
      topic: 'Python Loops and Conditionals',
      goalId: taskId,
      styleId: 'detailed',
      examFocus: false,
    });

    assert.ok(result.fullPrompt.length > 100, `Generated prompt for ${taskId} must not be empty`);
    generatedPrompts.set(taskId, result.fullPrompt);
  }

  // Ensure all 5 build prompts are unique and NOT generic math or text prompts
  const promptTexts = Array.from(generatedPrompts.values());
  const uniquePrompts = new Set(promptTexts);
  assert.strictEqual(uniquePrompts.size, 5, 'Every Build task must produce a unique prompt');

  // Verify task-specific instructions
  assert.ok(generatedPrompts.get('code')!.includes('code'), 'code prompt must request code');
  assert.ok(generatedPrompts.get('debug')!.includes('debug'), 'debug prompt must request debugging help');
  assert.ok(generatedPrompts.get('explain-code')!.includes('student-friendly language'), 'explain-code prompt must request plain code explanation');
  assert.ok(generatedPrompts.get('project-idea')!.includes('project ideas'), 'project-idea prompt must request project ideas');
  assert.ok(generatedPrompts.get('project-structure')!.includes('roadmap'), 'project-structure prompt must request roadmap and framework');
});

test('Prompt Generator — Capability Gallery Mapping Integrity', () => {
  for (const category of CAPABILITY_CATEGORIES) {
    assert.ok(category.id, 'Category must have an id');
    assert.ok(category.label, 'Category must have a label');
    assert.ok(category.subs.length > 0, `Category ${category.id} must have sub-capabilities`);

    // Ensure defaultGoalId exists in STUDY_GOALS
    const defaultGoal = STUDY_GOALS.find((g) => g.id === category.defaultGoalId);
    assert.ok(defaultGoal, `Category ${category.id} defaultGoalId ${category.defaultGoalId} must exist in STUDY_GOALS`);

    for (const sub of category.subs) {
      assert.ok(sub.id, `Sub-capability in ${category.id} must have an id`);
      const subGoal = STUDY_GOALS.find((g) => g.id === sub.goalId);
      assert.ok(subGoal, `Sub-capability ${sub.id} in ${category.id} goalId ${sub.goalId} must exist in STUDY_GOALS`);
    }
  }
});
