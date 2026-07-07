export type LiteracyLevel =
  | 'Beginner'
  | 'Learner'
  | 'Improving'
  | 'Intermediate'
  | 'Financial Mentor';

export interface LearningProgressItem {
  id: 'theory' | 'quiz' | 'simulator';
  label: string;
  completed: number;
  total: number;
}

export interface ProgressGoal {
  id: string;
  title: string;
  progress: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WeeklyActivity {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  value: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
}

export interface ProgressData {
  literacyScore: number;
  literacyImprovementPercentage: number;
  streak: number;
  longestStreak: number;
  completedTheory: number;
  totalTheory: number;
  completedQuiz: number;
  totalQuiz: number;
  completedSimulator: number;
  totalSimulator: number;
  primaryGoal: ProgressGoal;
  achievements: Achievement[];
  weeklyActivity: WeeklyActivity[];
  recommendations: Recommendation[];
}