import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/theme';
import { WeeklyActivity } from '../types';

interface WeeklyActivityCardProps {
  activity: WeeklyActivity[];
}

export function WeeklyActivityCard({ activity }: WeeklyActivityCardProps) {
  const maxValue = Math.max(...activity.map((item) => item.value), 1);

  return (
    <Card variant="outlined" className="mb-4">
      <Text className="text-lg font-bold text-gray-900">Weekly Activity</Text>

      <View className="mt-5 flex-row items-end justify-between">
        {activity.map((item) => {
          const height = Math.max(16, (item.value / maxValue) * 88);

          return (
            <View key={item.day} className="items-center">
              <View className="h-24 justify-end">
                <View
                  className="w-7 rounded-full"
                  style={{
                    height,
                    backgroundColor:
                      item.value > 0 ? colors.primary : '#E5E7EB',
                  }}
                />
              </View>

              <Text className="mt-2 text-xs font-semibold text-gray-500">
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}