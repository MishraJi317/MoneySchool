import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/layout/Screen';
import { LessonCard } from '../components/LessonCard';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useLearningStore } from '../store/learning.store';
import { LearningTopic } from '../types';

interface LessonScreenProps {
  topic: LearningTopic;
}

export function LessonScreen({ topic }: LessonScreenProps) {
  const { currentLesson, completeLesson } = useLearningStore();

  return (
    <Screen scroll edges={['top']} contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="pb-5 pt-4">
        <Text className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          {topic.title}
        </Text>
        <Text className="mt-2 text-3xl font-bold text-gray-900">
          Bite-sized theory
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-500">
          Learn the core idea first. Then you will prove it with a quiz and a
          simulator.
        </Text>
      </View>

      <ProgressIndicator currentStage={currentLesson} />
      <LessonCard lesson={topic.lesson} />

      <Button label="Next: Quiz" size="lg" fullWidth onPress={completeLesson} />
    </Screen>
  );
}
