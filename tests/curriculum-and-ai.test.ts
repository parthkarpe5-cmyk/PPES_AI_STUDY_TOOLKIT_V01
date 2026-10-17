import test from 'node:test';
import assert from 'node:assert/strict';
import { getCurriculumSubjects, getSubjectById, getChapterById } from '../data/curriculum.ts';
import { recommendForTask, getAllTasks, getAllTools } from '../lib/ai-recommender.ts';
import { STUDY_TASKS } from '../data/tasks.ts';
import { DEFAULT_PROFILE, BOARD_LABELS, CLASS_LABELS } from '../lib/study-profile.ts';

test('Curriculum — Class 8, 9, 10 Retrieval and Chapter Integrity', () => {
  const classes = ['8', '9', '10'] as const;

  for (const cl of classes) {
    const subjects = getCurriculumSubjects(cl, 'cbse');
    assert.ok(subjects.length >= 4, `Class ${cl} should have at least 4 core subjects`);

    // Verify Science and Mathematics exist
    const science = subjects.find((s) => s.id === 'science');
    const math = subjects.find((s) => s.id === 'mathematics');
    assert.ok(science, `Class ${cl} must include Science`);
    assert.ok(math, `Class ${cl} must include Mathematics`);

    assert.ok(science.chapters.length > 0, `Class ${cl} Science must have chapters`);
    assert.ok(math.chapters.length > 0, `Class ${cl} Mathematics must have chapters`);

    // Check that each chapter has valid topics
    for (const ch of science.chapters) {
      assert.ok(ch.id, 'Chapter must have an id');
      assert.ok(ch.name, 'Chapter must have a name');
      assert.ok(Array.isArray(ch.topics) && ch.topics.length > 0, `Chapter ${ch.name} must have topics`);
    }
  }
});

test('Curriculum — Subject and Chapter by ID Lookup', () => {
  const science = getSubjectById('10', 'science', 'cbse');
  assert.ok(science, 'Should find Class 10 Science');
  assert.strictEqual(science.name, 'Science');

  const chemicalReactions = getChapterById('10', 'science', 'chemical-reactions', 'cbse');
  assert.ok(chemicalReactions, 'Should find Chemical Reactions chapter');
  assert.strictEqual(chemicalReactions.chapterNumber, 1);

  // Non-existent lookups
  const nonExistentSubject = getSubjectById('10', 'non-existent-subject', 'cbse');
  assert.strictEqual(nonExistentSubject, undefined, 'Invalid subject should return undefined');

  const nonExistentChapter = getChapterById('10', 'science', 'non-existent-chapter', 'cbse');
  assert.strictEqual(nonExistentChapter, undefined, 'Invalid chapter should return undefined');
});

test('AI Recommender — All Study Tasks Have Valid Tool Recommendations', () => {
  const tasks = getAllTasks();
  assert.strictEqual(tasks.length, STUDY_TASKS.length, 'All study tasks should be retrieved');

  for (const task of tasks) {
    const rec = recommendForTask(task.id);
    assert.ok(rec, `Recommendation must exist for task ${task.id}`);
    assert.strictEqual(rec.task.id, task.id);
    assert.ok(rec.tools.length > 0, `Task ${task.id} must recommend at least 1 tool`);

    for (const tool of rec.tools) {
      assert.ok(tool.id, 'Tool must have an id');
      assert.ok(tool.name, 'Tool must have a name');
      assert.ok(tool.accessUrl.startsWith('https://'), 'Tool must have a secure accessUrl');
      assert.ok(tool.capabilities.length > 0, 'Tool must list capabilities');
    }
  }
});

test('AI Recommender — Fallback Handling for Unknown Task', () => {
  const result = recommendForTask('unknown-task-id');
  assert.strictEqual(result, null, 'Unknown task should return null');

  const allTools = getAllTools();
  assert.ok(allTools.length >= 4, 'Should have multiple registered AI tools');
});

test('Study Profile — Default State and Label Mapping', () => {
  assert.strictEqual(DEFAULT_PROFILE.classLevel, '10');
  assert.strictEqual(DEFAULT_PROFILE.board, 'cbse');
  assert.strictEqual(DEFAULT_PROFILE.hasSetup, false);

  assert.strictEqual(BOARD_LABELS.cbse, 'CBSE');
  assert.strictEqual(BOARD_LABELS.icse, 'ICSE');
  assert.strictEqual(CLASS_LABELS['10'], 'Class 10');
});
