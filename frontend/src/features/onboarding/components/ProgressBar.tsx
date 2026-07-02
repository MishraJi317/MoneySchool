import { Text, View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const width = `${(currentStep / totalSteps) * 100}%` as `${number}%`;

  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-gray-500">
        Step {currentStep} of {totalSteps}
      </Text>

      <View className="h-2 overflow-hidden rounded-full bg-emerald-100">
        <View
          className="h-full rounded-full bg-emerald-500"
          style={{ width }}
        />
      </View>
    </View>
  );
}