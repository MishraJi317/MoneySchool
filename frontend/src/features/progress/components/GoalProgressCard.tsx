import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/theme';
import { ProgressGoal } from '../types';

interface GoalProgressCardProps {
  goals: ProgressGoal[];
}

export function GoalProgressCard({ goals }: GoalProgressCardProps) {
  return (
    <Card variant="outlined" className="mb-4">
      <Text className="text-lg font-bold text-gray-900">Goal Progress</Text>

      <View className="mt-4 gap-4">
        {goals.map((goal) => (
          <View key={goal.id}>
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="mr-2 text-2xl">🎯</Text>
                <Text className="text-base font-bold text-gray-900">
                  {goal.title}
                </Text>
              </View>

              <Text className="text-xl font-bold text-emerald-600">
                {goal.progress}%
              </Text>
            </View>

            <View className="h-3 overflow-hidden rounded-full bg-gray-100">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${goal.progress}%`,
                  backgroundColor: colors.primary,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}