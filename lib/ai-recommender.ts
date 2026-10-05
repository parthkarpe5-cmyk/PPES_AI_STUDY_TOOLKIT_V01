import { AI_TOOLS, AITool } from '@/data/ai-tools';
import { STUDY_TASKS, TaskOption } from '@/data/tasks';

export interface RecommendationResult {
  task: TaskOption;
  requiredCapability: string;
  recommendedApproach: string;
  tools: AITool[];
  reason: string;
  caution: string;
  suggestedPromptGoal: string;
}

/**
 * Deterministic rule-based AI capability recommender.
 * Matches student study task to required capability and suitable tools without black-box ML.
 */
export function recommendForTask(taskId: string): RecommendationResult | null {
  const task = STUDY_TASKS.find((t) => t.id === taskId);
  if (!task) return null;

  const tools = task.recommendedToolIds
    .map((id) => AI_TOOLS[id])
    .filter((tool): tool is AITool => Boolean(tool));

  return {
    task,
    requiredCapability: task.requiredCapability,
    recommendedApproach: task.recommendedApproach,
    tools,
    reason: task.reason,
    caution: task.caution,
    suggestedPromptGoal: task.suggestedPromptGoal
  };
}

export function getAllTasks(): TaskOption[] {
  return STUDY_TASKS;
}

export function getAllTools(): AITool[] {
  return Object.values(AI_TOOLS);
}
