import { Pressable, Text } from 'react-native';

interface SuggestionChipProps {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

export function SuggestionChip({ label, disabled = false, onPress }: SuggestionChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      className={`mr-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 active:bg-emerald-100 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <Text className="text-sm font-semibold text-emerald-700">{label}</Text>
    </Pressable>
  );
}