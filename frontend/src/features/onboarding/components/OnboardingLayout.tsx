import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

import { Screen } from '../../../components/layout/Screen';
import { NavigationButtons } from './NavigationButtons';
import { ProgressBar } from './ProgressBar';
import { StepHeader } from './StepHeader';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  nextLabel: string;
  loading?: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  nextLabel,
  loading,
  onBack,
  onNext,
}: OnboardingLayoutProps) {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen
        scroll
        padded
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <View className="flex-1 pt-4">
          <ProgressBar
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />

          <StepHeader title={title} subtitle={subtitle} />

          <View className="flex-1 pb-8">{children}</View>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            backDisabled={currentStep === 0}
            nextLabel={nextLabel}
            loading={loading}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}