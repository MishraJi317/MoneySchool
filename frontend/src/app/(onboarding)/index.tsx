import { createElement, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { useAuthStore } from '../../store/auth.store';
import { OnboardingLayout } from '../../features/onboarding/components/OnboardingLayout';
import {
  ONBOARDING_STEPS,
  TOTAL_ONBOARDING_STEPS,
} from '../../features/onboarding/constants/onboardingSteps';
import { useOnboardingStore } from '../../features/onboarding/onboarding.store';
import { GoalsStep } from '../../features/onboarding/screens/GoalsStep';
import { IncomeStep } from '../../features/onboarding/screens/IncomeStep';
import { IncomeTypeStep } from '../../features/onboarding/screens/IncomeTypeStep';
import { LanguageStep } from '../../features/onboarding/screens/LanguageStep';
import { OccupationStep } from '../../features/onboarding/screens/OccupationStep';
import { PersonalStep } from '../../features/onboarding/screens/PersonalStep';
import { WelcomeStep } from '../../features/onboarding/screens/WelcomeStep';
import type { OnboardingStepHandle } from '../../features/onboarding/types';

const steps = [
  WelcomeStep,
  PersonalStep,
  LanguageStep,
  IncomeTypeStep,
  IncomeStep,
  OccupationStep,
  GoalsStep,
];

async function simulateProfileRequest() {
  await new Promise((resolve) => setTimeout(resolve, 900));
}

export default function OnboardingScreen() {
  const currentStep = useOnboardingStore(
    (state) => state.currentStep
  );
  const nextStep = useOnboardingStore((state) => state.nextStep);
  const previousStep = useOnboardingStore(
    (state) => state.previousStep
  );
  const reset = useOnboardingStore((state) => state.reset);

  const completeOnboarding = useAuthStore(
    (state) => state.completeOnboarding
  );

  const stepRef = useRef<OnboardingStepHandle>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const metadata = ONBOARDING_STEPS[currentStep];
  const StepComponent = steps[currentStep];

  const handleNext = async () => {
    const valid = await stepRef.current?.validate();

    if (!valid) {
      return;
    }

    if (currentStep < TOTAL_ONBOARDING_STEPS - 1) {
      nextStep();
      return;
    }

    setIsSubmitting(true);

    try {
      await simulateProfileRequest();
      await completeOnboarding();

      reset();
      router.replace('/(tabs)/dashboard');
    } catch {
      Alert.alert(
        'Couldn’t finish setup',
        'Please try again. Your answers are still here.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextLabel =
    currentStep === 0
      ? 'Let’s Begin'
      : currentStep === TOTAL_ONBOARDING_STEPS - 1
        ? 'Create My Financial Mentor'
        : 'Next';

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={TOTAL_ONBOARDING_STEPS}
      title={metadata.title}
      subtitle={metadata.subtitle}
      nextLabel={nextLabel}
      loading={isSubmitting}
      onBack={previousStep}
      onNext={handleNext}
    >
      {createElement(StepComponent, {
        ref: stepRef,
        key: currentStep,
      })}
    </OnboardingLayout>
  );
}