import type { ProgressData } from "@/features/progress/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProgress(): Promise<ProgressData | null> {
  await delay(700);

  return {
    literacyScore: 78,
    literacyImprovementPercentage: 12,

    streak: 12,
    longestStreak: 21,

    completedTheory: 18,
    totalTheory: 25,

    completedQuiz: 12,
    totalQuiz: 20,

    completedSimulator: 5,
    totalSimulator: 10,

    primaryGoal: {
      id: 'buy-bike',
      title: 'Buy Bike',
      progress: 32,
    },

    achievements: [
      {
        id: 'first-goal',
        icon: '🎯',
        title: 'First Goal Created',
        description: 'You started with a clear financial target.',
      },
      {
        id: 'first-lesson',
        icon: '📚',
        title: 'First Lesson Completed',
        description: 'You took your first learning step.',
      },
      {
        id: 'seven-day-streak',
        icon: '🔥',
        title: '7 Day Streak',
        description: 'You showed up consistently.',
      },
      {
        id: 'budget-master',
        icon: '💰',
        title: 'Budget Master',
        description: 'You practiced smarter money planning.',
      },
    ],

    weeklyActivity: [
      { day: 'Mon', value: 3 },
      { day: 'Tue', value: 5 },
      { day: 'Wed', value: 2 },
      { day: 'Thu', value: 6 },
      { day: 'Fri', value: 4 },
      { day: 'Sat', value: 7 },
      { day: 'Sun', value: 3 },
    ],

    recommendations: [
      {
        id: 'insurance-basics',
        title: 'Learn Insurance Basics',
        description: 'Understand how protection helps your future self.',
      },
      {
        id: 'credit-score-quiz',
        title: 'Complete Credit Score Quiz',
        description: 'Test how well you understand credit health.',
      },
      {
        id: 'fd-simulator',
        title: 'Try FD Simulator',
        description: 'See how guaranteed interest can grow savings.',
      },
    ],
  };
}