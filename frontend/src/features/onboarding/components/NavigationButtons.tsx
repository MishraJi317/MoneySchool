import { View } from 'react-native';

import { Button } from '../../../components/ui/Button';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  backDisabled: boolean;
  nextLabel: string;
  loading?: boolean;
}

export function NavigationButtons({
  onBack,
  onNext,
  backDisabled,
  nextLabel,
  loading = false,
}: NavigationButtonsProps) {
  return (
    <View className="flex-row gap-3 border-t border-gray-100 pt-4">
      <Button
        label="Back"
        variant="outline"
        size="lg"
        disabled={backDisabled || loading}
        onPress={onBack}
        className="flex-1"
      />

      <Button
        label={nextLabel}
        size="lg"
        loading={loading}
        onPress={onNext}
        className="flex-[2]"
      />
    </View>
  );
}