import { LiteracyLevel } from './types';

export function getLiteracyLevel(score: number): LiteracyLevel {
  if (score <= 20) return 'Beginner';
  if (score <= 40) return 'Learner';
  if (score <= 60) return 'Improving';
  if (score <= 80) return 'Intermediate';
  return 'Financial Mentor';
}