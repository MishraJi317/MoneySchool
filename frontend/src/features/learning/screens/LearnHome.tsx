import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Href, router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/layout/Screen';
import { useOnboardingStore } from '@/features/onboarding/onboarding.store';
import { colors } from '@/theme';
import { LearningHeader } from '../components/LearningHeader';
import { LearningPath } from '../components/LearningPath';
import { useLearningStore } from '../store/learning.store';
import { Persona, TopicId } from '../types';

function normalizePersona(value: string | null): Persona {
  if (
    value === 'Student' ||
    value === 'Farmer' ||
    value === 'Salaried Employee' ||
    value === 'Gig Worker' ||
    value === 'Business Owner' ||
    value === 'Homemaker' ||
    value === 'Retired'
  ) {
    return value;
  }

  return 'Student';
}

export function LearnHome() {
  const occupation = useOnboardingStore((state) => state.occupation);
  const persona = normalizePersona(occupation);

  const {
    loading,
    topics,
    currentTopic,
    completedTopics,
    loadLearningPath,
    startTopic,
  } = useLearningStore();

  useEffect(() => {
    loadLearningPath(persona);
  }, [loadLearningPath, persona]);

  const activeTopic =
    currentTopic ?? topics.find((topic) => !completedTopics.includes(topic.id))?.id;

  const openTopic = (topicId: TopicId) => {
    startTopic(topicId);
    router.push({
      pathname: '/learning/[topic]',
      params: { topic: topicId },
    } as unknown as Href);
  };

  return (
    <Screen
      scroll
      edges={['top']}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <LearningHeader persona={persona} />

      {loading && (
        <View className="items-center justify-center py-20">
          <ActivityIndicator color={colors.primary} />
          <Text className="mt-3 text-sm font-medium text-gray-500">
            Building your learning path...
          </Text>
        </View>
      )}

      {!loading && topics.length > 0 && (
        <>
          <Card variant="flat" className="mb-5 bg-white/70">
            <Text className="text-sm font-semibold leading-6 text-gray-600">
              The topics are the same for everyone. Your path is personalized by
              reordering them around your goals, occupation, and current money
              context.
            </Text>
          </Card>

          <LearningPath
            topics={topics}
            currentTopic={currentTopic}
            completedTopics={completedTopics}
            onStartTopic={openTopic}
          />
        </>
      )}

      {!loading && activeTopic && (
        <View className="mt-2">
          <Button
            label="Start learning"
            size="lg"
            fullWidth
            onPress={() => openTopic(activeTopic)}
          />
        </View>
      )}
    </Screen>
  );
}
