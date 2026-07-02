import { Text, View } from 'react-native';

interface StepHeaderProps {
  title: string;
  subtitle: string;
}

export function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <View className="mb-6 mt-8">
      <Text className="text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </Text>

      <Text className="mt-2 text-base leading-6 text-gray-500">
        {subtitle}
      </Text>
    </View>
  );
}