import { useState } from 'react';
import { Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { SimulatorCard } from '../components/SimulatorCard';
import { useLearningStore } from '../store/learning.store';
import { LearningTopic } from '../types';

interface SimulatorScreenProps {
  topic: LearningTopic;
}

export function SimulatorScreen({ topic }: SimulatorScreenProps) {
  const { currentLesson, completeSimulator } = useLearningStore();
  const [selectedOptionIds, setSelectedOptionIds] = useState<
    Record<string, string>
  >({});

  return (
    <Screen scroll edges={['top']} contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="pb-5 pt-4">
        <Text className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          {topic.title}
        </Text>
        <Text className="mt-2 text-3xl font-bold text-gray-900">
          Practice sandbox
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-500">
          This is not just a question. Make a choice and see its consequence.
        </Text>
      </View>

      <ProgressIndicator currentStage={currentLesson} />

      <SimulatorCard
        simulator={topic.simulator}
        selectedOptionIds={selectedOptionIds}
        onSelectOption={(decisionId, optionId) => {
          setSelectedOptionIds((state) => ({
            ...state,
            [decisionId]: optionId,
          }));
        }}
        onComplete={completeSimulator}
      />
    </Screen>
  );
}
