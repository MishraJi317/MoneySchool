import { Text, View } from 'react-native';
import { Href, router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/layout/Screen';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useLearningStore } from '../store/learning.store';
import { LearningTopic } from '../types';

interface ResultScreenProps {
  topic: LearningTopic;
  mode: 'analysis' | 'completion';
}

export function ResultScreen({ topic, mode }: ResultScreenProps) {
  const {
    currentLesson,
    quizScore,
    xp,
    stars,
    lastSimulatorChoiceId,
    completeLesson,
    unlockNextTopic,
    orderedTopicIds,
  } = useLearningStore();

  const simulatorScore = lastSimulatorChoiceId
    ? Number(lastSimulatorChoiceId.split('-')[0])
    : null;
  const simulatorOutcome = lastSimulatorChoiceId
    ? lastSimulatorChoiceId.replace(`${simulatorScore}-`, '')
    : null;
  const currentIndex = orderedTopicIds.indexOf(topic.id);
  const nextTopicId = orderedTopicIds[currentIndex + 1];

  if (mode === 'analysis') {
    return (
      <Screen scroll edges={['top']} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="pb-5 pt-4">
          <Text className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            {topic.title}
          </Text>
          <Text className="mt-2 text-3xl font-bold text-gray-900">
            Performance Analysis
          </Text>
          <Text className="mt-2 text-base leading-6 text-gray-500">
            Your simulator choices shape the next quiz.
          </Text>
        </View>

        <ProgressIndicator currentStage={currentLesson} />

        <Card variant="elevated" className="mb-5">
          <Text className="text-4xl">🧠</Text>
          <Text className="mt-4 text-xl font-bold text-gray-900">
            Future You noticed this
          </Text>
          <Text className="mt-3 text-base leading-7 text-gray-600">
            {simulatorScore !== null
              ? `Your practical simulator score was ${simulatorScore}/100. Result: ${simulatorOutcome}.`
              : 'You completed the simulator. The adaptive quiz will now check whether the concept really clicked.'}
          </Text>

          <Text className="mt-3 text-base leading-7 text-gray-600">
            The next quiz focuses on whether you understood the trade-offs behind
            your practical choices, not just whether you memorized the lesson.
          </Text>

          <View className="mt-5 rounded-2xl bg-emerald-50 p-4">
            <Text className="text-sm font-bold text-emerald-800">
              Next up
            </Text>
            <Text className="mt-1 text-sm leading-6 text-emerald-900">
              A short adaptive quiz based on what happened in your simulator.
            </Text>
          </View>
        </Card>

        <Button
          label="Start adaptive quiz"
          size="lg"
          fullWidth
          onPress={completeLesson}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top']} contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="pb-5 pt-4">
        <Text className="text-4xl">🎉</Text>
        <Text className="mt-3 text-3xl font-bold text-gray-900">
          Topic Completed
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-500">
          You completed {topic.title}. Future you is quietly impressed.
        </Text>
      </View>

      <ProgressIndicator currentStage={currentLesson} />

      <Card variant="elevated" className="mb-5">
        <View className="flex-row justify-between">
          <Metric label="XP Earned" value={`+${xp}`} />
          <Metric label="Stars" value={`${stars} ⭐`} />
        </View>

        <View className="mt-5 flex-row justify-between">
          <Metric label="Accuracy" value={`${quizScore}%`} />
          <Metric label="Time" value="8 min" />
        </View>

        <View className="mt-5 rounded-2xl bg-emerald-50 p-4">
          <Text className="text-sm font-bold text-emerald-800">
            Next topic unlocked
          </Text>
          <Text className="mt-1 text-base font-bold text-emerald-950">
            {nextTopicId ? 'Your next step is ready.' : 'You finished the roadmap!'}
          </Text>
        </View>
      </Card>

      <Button
        label={nextTopicId ? 'Unlock next topic' : 'Back to learning path'}
        size="lg"
        fullWidth
        onPress={() => {
          unlockNextTopic();
          router.replace('/(tabs)/learn' as Href);
        }}
      />
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View className="w-[48%] rounded-2xl bg-gray-50 p-4">
      <Text className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </Text>
      <Text className="mt-2 text-2xl font-bold text-gray-900">{value}</Text>
    </View>
  );
}
