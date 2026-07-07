import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/theme';
import { getLiteracyLevel } from '../constants';

interface LiteracyScoreCardProps {
  score: number;
  improvementPercentage: number;
}

export function LiteracyScoreCard({
  score,
  improvementPercentage,
}: LiteracyScoreCardProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const level = getLiteracyLevel(score);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, score]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <Card variant="elevated" className="mb-4">
      <Text className="text-lg font-bold text-gray-900">Literacy Score</Text>

      <View className="mt-5 items-center">
        <View
          className="h-36 w-36 items-center justify-center rounded-full border-[10px] bg-emerald-50"
          style={{ borderColor: '#D1FAE5' }}
        >
          <Text className="text-4xl font-bold text-gray-900">{score}</Text>
          <Text className="text-sm font-semibold text-gray-500">/ 100</Text>
        </View>

        <View className="mt-4 rounded-full bg-emerald-100 px-4 py-2">
          <Text className="text-sm font-bold text-emerald-700">{level}</Text>
        </View>
      </View>

      <View className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
        <Animated.View
          className="h-full rounded-full"
          style={{ width, backgroundColor: colors.primary }}
        />
      </View>

      <Text className="mt-4 text-center text-sm leading-5 text-gray-600">
        Your financial literacy has improved by{' '}
        <Text className="font-bold text-emerald-600">
          {improvementPercentage}%
        </Text>{' '}
        since last month.
      </Text>
    </Card>
  );
}