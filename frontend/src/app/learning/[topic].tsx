import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Href, router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { LessonScreen } from '@/features/learning/screens/LessonScreen';
import { QuizScreen } from '@/features/learning/screens/QuizScreen';
import { ResultScreen } from '@/features/learning/screens/ResultScreen';
import { SimulatorScreen } from '@/features/learning/screens/SimulatorScreen';
import { useLearningStore } from '@/features/learning/store/learning.store';
import { TopicId } from '@/features/learning/types';

export default function TopicLearningRoute() {
  const params = useLocalSearchParams<{ topic: TopicId }>();
  const topicId = params.topic;

  const {
    topics,
    loading,
    currentLesson,
    currentTopic,
    loadLearningPath,
    startTopic,
  } = useLearningStore();

  useEffect(() => {
    if (!topics.length) {
      loadLearningPath();
    }
  }, [loadLearningPath, topics.length]);

  useEffect(() => {
    if (topicId && currentTopic !== topicId) {
      startTopic(topicId);
    }
  }, [currentTopic, startTopic, topicId]);

  const topic = topics.find((item) => item.id === topicId);

  if (loading || !topics.length) {
    return (
      <Screen edges={['top']}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#10B981" />
          <Text className="mt-3 text-sm font-medium text-gray-500">
            Opening lesson...
          </Text>
        </View>
      </Screen>
    );
  }

  if (!topic) {
    return (
      <Screen edges={['top']}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-xl font-bold text-gray-900">
            Topic not found
          </Text>
          <Text className="mt-2 text-center text-sm leading-6 text-gray-500">
            This lesson path is not available yet.
          </Text>
          <Button
            label="Back to Learn"
            className="mt-5"
            onPress={() => router.replace('/(tabs)/learn' as Href)}
          />
        </View>
      </Screen>
    );
  }

  if (currentLesson === 'theory') {
    return <LessonScreen topic={topic} />;
  }

  if (currentLesson === 'quiz') {
    return <QuizScreen topic={topic} />;
  }

  if (currentLesson === 'simulator') {
    return <SimulatorScreen topic={topic} />;
  }

  if (currentLesson === 'analysis') {
    return <ResultScreen topic={topic} mode="analysis" />;
  }

  if (currentLesson === 'adaptiveQuiz') {
    return <QuizScreen topic={topic} adaptive />;
  }

  return <ResultScreen topic={topic} mode="completion" />;
}
