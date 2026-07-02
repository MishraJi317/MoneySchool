import { create } from 'zustand';

import { TOTAL_ONBOARDING_STEPS } from './constants/onboardingSteps';
import type { OnboardingData } from './types';

interface OnboardingState extends OnboardingData {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  addGoal: (goal: string) => void;
  removeGoal: (goal: string) => void;
  reset: () => void;
}

const initialData: OnboardingData = {
  name: '',
  age: null,
  language: null,
  incomeType: null,
  income: null,
  occupation: null,
  goals: [],
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialData,
  currentStep: 0,

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(
        state.currentStep + 1,
        TOTAL_ONBOARDING_STEPS - 1
      ),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  updateData: (data) => set(data),

  addGoal: (goal) =>
    set((state) => {
      const value = goal.trim();

      if (!value || state.goals.includes(value)) {
        return state;
      }

      return { goals: [...state.goals, value] };
    }),

  removeGoal: (goal) =>
    set((state) => ({
      goals: state.goals.filter((item) => item !== goal),
    })),

  reset: () => set({ ...initialData, currentStep: 0 }),
}));