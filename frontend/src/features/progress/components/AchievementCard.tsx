import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Achievement } from '../types';

interface AchievementCardProps {
  achievements: Achievement[];
}

export function AchievementCard({ achievements }: AchievementCardProps) {
  return (
    <View className="mb-4">
      <Text className="mb-3 text-lg font-bold text-gray-900">
        Achievements
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            variant="elevated"
            className="mr-3 w-44"
          >
            <Text className="text-3xl">{achievement.icon}</Text>

            <Text className="mt-3 text-base font-bold text-gray-900">
              {achievement.title}
            </Text>

            <Text className="mt-2 text-xs leading-5 text-gray-500">
              {achievement.description}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}