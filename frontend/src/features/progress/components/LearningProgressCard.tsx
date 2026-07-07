import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/theme';
import { LearningProgressItem } from '../types';

interface LearningProgressCardProps {
  items: LearningProgressItem[];
}

export function LearningProgressCard({ items }: LearningProgressCardProps) {
  return (
    <Card variant="outlined" className="mb-4">
      <Text className="text-lg font-bold text-gray-900">Learning Progress</Text>

      <View className="mt-4 gap-4">
        {items.map((item) => {
          const percentage = item.total > 0 ? (item.completed / item.total) * 100 : 0;

          return (
            <View key={item.id}>
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-800">
                  {item.label}
                </Text>

                <Text className="text-sm font-bold text-gray-500">
                  {item.completed} / {item.total}
                </Text>
              </View>

              <View className="h-3 overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: colors.secondary,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}