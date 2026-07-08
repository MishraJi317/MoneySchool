import { Text, View } from 'react-native';

interface LearningHeaderProps {
  persona: string;
}

export function LearningHeader({ persona }: LearningHeaderProps) {
  return (
    <View className="pb-6 pt-4">
      <Text className="text-3xl font-bold text-gray-900">Learn</Text>
      <Text className="mt-2 text-base leading-6 text-gray-500">
        Master financial literacy one step at a time.
      </Text>

      <View className="mt-4 self-start rounded-full bg-emerald-50 px-4 py-2">
        <Text className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Personalized for {persona}
        </Text>
      </View>
    </View>
  );
}
