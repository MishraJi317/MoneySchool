export type Language = 'English' | 'Hindi' | 'Marathi';
export type IncomeType = 'regular' | 'irregular';

export type Occupation =
  | 'Student'
  | 'Salaried Employee'
  | 'Gig Worker'
  | 'Farmer'
  | 'Business Owner'
  | 'Homemaker'
  | 'Retired'
  | 'Other';

export interface OnboardingData {
  name: string;
  age: number | null;
  language: Language | null;
  incomeType: IncomeType | null;
  income: number | null;
  occupation: Occupation | null;
  goals: string[];
}

export interface OnboardingStepHandle {
  validate: () => Promise<boolean>;
}