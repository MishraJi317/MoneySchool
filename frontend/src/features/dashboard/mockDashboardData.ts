import type { DashboardData } from './types';

export const dashboardData: DashboardData = {
  futureSelf: {
    message:
      "You're 12% closer to buying your bike. Keep saving ₹3,000 every month.",
    aiTip:
      'Automate your ₹3,000 transfer on salary day so saving happens before spending.',
  },

  goal: {
    title: 'Buy Bike',
    progress: 12,
    monthlyContribution: 3000,
  },

  budget: [
    { id: 'needs', label: 'Needs', percentage: 60, color: '#10B981' },
    { id: 'savings', label: 'Savings', percentage: 20, color: '#2563EB' },
    {
      id: 'emergency',
      label: 'Emergency Fund',
      percentage: 10,
      color: '#F59E0B',
    },
    { id: 'others', label: 'Others', percentage: 10, color: '#8B5CF6' },
  ],

  budgetAiTip:
    'Start with this split, then review it after one month using your actual expenses.',

  nextLesson: {
    title: 'Emergency Fund',
    duration: '5 min lesson',
  },

  literacy: {
    score: 42,
    label: 'Beginner',
  },

  dailyQuestion: {
    prompt:
      'How many months of essential expenses should an emergency fund ideally cover?',
    options: [
      { id: 'one', label: '1 month' },
      { id: 'three-six', label: '3–6 months' },
      { id: 'twelve', label: '12 months' },
    ],
    correctOptionId: 'three-six',
    explanation:
      'Three to six months provides a practical cushion for job loss or unexpected expenses.',
  },
};