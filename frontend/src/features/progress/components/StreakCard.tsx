import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';

interface StreakCardProps {
  streak: number;
  longestStreak: number;
}

export function StreakCard({ streak, longestStreak }: StreakCardProps) {
  return (
    <Card variant="outlined" className="mb-4">
      <View className="flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Text className="text-2xl">🔥</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900">
            Current Streak
          </Text>
          <Text className="mt-1 text-3xl font-bold text-orange-500">
            {streak} Days
          </Text>
        </View>

        <View className="rounded-2xl bg-gray-100 px-3 py-2">
          <Text className="text-xs font-semibold text-gray-500">
            Longest Streak
          </Text>
          <Text className="mt-1 text-center text-lg font-bold text-gray-900">
            {longestStreak}
          </Text>
        </View>
      </View>
    </Card>
  );
}