export interface BudgetCategory {
  id: string;
  label: string;
  percentage: number;
  color: string;
}

export interface DailyQuestionOption {
  id: string;
  label: string;
}

export interface DashboardData {
  futureSelf: {
    message: string;
    aiTip: string;
  };
  goal: {
    title: string;
    progress: number;
    monthlyContribution: number;
  };
  budget: BudgetCategory[];
  budgetAiTip: string;
  nextLesson: {
    title: string;
    duration: string;
  };
  literacy: {
    score: number;
    label: string;
  };
  dailyQuestion: {
    prompt: string;
    options: DailyQuestionOption[];
    correctOptionId: string;
    explanation: string;
  };
}