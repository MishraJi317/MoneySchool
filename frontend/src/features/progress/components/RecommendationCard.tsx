import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

export function RecommendationCard({ recommendations }: RecommendationCardProps) {
  const continueRecommendation = (title: string) => {
    Alert.alert('Coming soon', `${title} will open in the Learn module later.`);
  };

  return (
    <Card variant="outlined" className="mb-4">
      <Text className="text-lg font-bold text-gray-900">
        Recommended Next Steps
      </Text>

      <View className="mt-4 gap-3">
        {recommendations.map((recommendation) => (
          <View
            key={recommendation.id}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
          >
            <Text className="text-base font-bold text-gray-900">
              {recommendation.title}
            </Text>

            <Text className="mt-1 text-sm leading-5 text-gray-500">
              {recommendation.description}
            </Text>

            <View className="mt-3 items-start">
              <Button
                label="Continue"
                size="sm"
                variant="outline"
                onPress={() => continueRecommendation(recommendation.title)}
              />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}