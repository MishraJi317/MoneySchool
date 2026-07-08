export type Persona =
  | 'Student'
  | 'Farmer'
  | 'Salaried Employee'
  | 'Gig Worker'
  | 'Business Owner'
  | 'Homemaker'
  | 'Retired'
  | 'Other';

export type LearningStage =
  | 'theory'
  | 'quiz'
  | 'simulator'
  | 'analysis'
  | 'adaptiveQuiz'
  | 'result';

export type TopicId =
  | 'budgeting'
  | 'saving-money'
  | 'emergency-fund'
  | 'banking'
  | 'upi-digital-payments'
  | 'government-schemes'
  | 'insurance'
  | 'credit-score'
  | 'loans'
  | 'taxes'
  | 'investing'
  | 'mutual-funds'
  | 'stock-market'
  | 'retirement-planning'
  | 'fraud-awareness'
  | 'financial-planning';

export interface LessonContent {
  title: string;
  durationMinutes: number;
  intro: string;
  body: string;
  sections: Array<{
    id: string;
    heading: string;
    content: string;
  }>;
  keyIdeas: string[];
  commonMistakes: string[];
  note: string;
  example: string;
  quickCheck: {
    prompt: string;
    answer: string;
  };
  simulatorPrep: string;
}

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface SimulatorChoiceImpact {
  score: number;
  money: number;
  safety: number;
  growth: number;
}

export interface SimulatorOption {
  id: string;
  label: string;
  description: string;
  feedback: string;
  impact: SimulatorChoiceImpact;
  isRecommended: boolean;
}

export interface SimulatorDecision {
  id: string;
  title: string;
  prompt: string;
  options: SimulatorOption[];
}

export interface SimulatorOutcome {
  minScore: number;
  title: string;
  description: string;
}

export interface SimulatorContent {
  title: string;
  scenario: string;
  objective: string;
  decisions: SimulatorDecision[];
  outcomes: SimulatorOutcome[];
}

export interface LearningTopic {
  id: TopicId;
  title: string;
  icon: string;
  subtitle: string;
  lessonCount: number;
  lesson: LessonContent;
  quiz: QuizQuestion[];
  adaptiveQuiz: QuizQuestion[];
  simulator: SimulatorContent;
}

export interface LearningProgressSummary {
  percentage: number;
  currentLessonLabel: string;
}

export interface LearningPathResponse {
  persona: Persona;
  orderedTopicIds: TopicId[];
  topics: LearningTopic[];
}
