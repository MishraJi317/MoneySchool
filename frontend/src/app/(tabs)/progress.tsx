import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { AchievementCard } from '@/features/progress/components/AchievementCard';
import { GoalProgressCard } from '@/features/progress/components/GoalProgressCard';
import { LearningProgressCard } from '@/features/progress/components/LearningProgressCard';
import { LiteracyScoreCard } from '@/features/progress/components/LiteracyScoreCard';
import { RecommendationCard } from '@/features/progress/components/RecommendationCard';
import { StreakCard } from '@/features/progress/components/StreakCard';
import { WeeklyActivityCard } from '@/features/progress/components/WeeklyActivityCard';
import { useProgressStore } from '@/features/progress/store/progress.store';
import { colors } from '@/theme';

export default function ProgressScreen() {
  const { progress, loading, loadProgress } = useProgressStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const learningItems = progress
    ? [
        {
          id: 'theory' as const,
          label: 'Theory',
          completed: progress.completedTheory,
          total: progress.totalTheory,
        },
        {
          id: 'quiz' as const,
          label: 'Quiz',
          completed: progress.completedQuiz,
          total: progress.totalQuiz,
        },
        {
          id: 'simulator' as const,
          label: 'Simulator',
          completed: progress.completedSimulator,
          total: progress.totalSimulator,
        },
      ]
    : [];

  return (
    <Screen
      scroll
      edges={['top']}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="pb-6 pt-4">
        <Text className="text-3xl">📈</Text>

        <Text className="mt-3 text-3xl font-bold text-gray-900">
          Your Financial Journey
        </Text>

        <Text className="mt-3 text-base leading-6 text-gray-600">
          Keep learning. Keep growing. Every small step today builds a stronger
          financial future.
        </Text>
      </View>

      {loading && (
        <View className="flex-1 items-center justify-center py-16">
          <ActivityIndicator color={colors.primary} />
          <Text className="mt-3 text-sm font-medium text-gray-500">
            Loading your journey...
          </Text>
        </View>
      )}

      {!loading && !progress && (
        <Card variant="outlined" className="items-center py-10">
          <Text className="text-4xl">🌱</Text>

          <Text className="mt-4 text-center text-xl font-bold text-gray-900">
            Your financial journey has just begun.
          </Text>

          <Text className="mt-3 text-center text-base leading-6 text-gray-500">
            Complete lessons,{'\n'}
            answer quizzes,{'\n'}
            and practice simulations{'\n'}
            to improve your financial literacy.
          </Text>
        </Card>
      )}

      {!loading && progress && (
        <>
          <LiteracyScoreCard
            score={progress.literacyScore}
            improvementPercentage={progress.literacyImprovementPercentage}
          />

          <StreakCard
            streak={progress.streak}
            longestStreak={progress.longestStreak}
          />

          <LearningProgressCard items={learningItems} />

          <GoalProgressCard goals={[progress.primaryGoal]} />

          <AchievementCard achievements={progress.achievements} />

          <WeeklyActivityCard activity={progress.weeklyActivity} />

          <RecommendationCard recommendations={progress.recommendations} />
        </>
      )}
    </Screen>
  );
}