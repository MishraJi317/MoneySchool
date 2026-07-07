import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  CircleHelp,
  LogOut,
  Sparkles,
  Target,
  Trophy,
  WalletCards,
  XCircle,
} from 'lucide-react-native';

import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { DashboardCard } from '@/features/dashboard/components/DashboardCard';
import { dashboardData } from '@/features/dashboard/mockDashboardData';
import { useAuthStore } from '@/store/auth.store';
import { colors } from '@/theme';

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const { user, clearAuth } = useAuthStore();

  const [futureTipVisible, setFutureTipVisible] = useState(false);
  const [budgetTipVisible, setBudgetTipVisible] = useState(false);
  const [lessonStarted, setLessonStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);

  const greeting = useMemo(
    () => getGreeting(new Date().getHours()),
    []
  );

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there';
  const question = dashboardData.dailyQuestion;
  const isCorrect = submittedAnswer === question.correctOptionId;

  const logout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await clearAuth();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <Screen
      scroll
      edges={['top']}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="pb-6 pt-4">
        <View className="flex-row items-center">
          <Text className="mr-2 text-2xl">☀️</Text>
          <Text className="flex-1 text-2xl font-bold text-gray-900">
            {greeting}, {firstName}
          </Text>
        </View>

        <Text className="ml-9 mt-1 text-sm font-medium text-gray-500">
          Your Future Self
        </Text>
      </View>

      <DashboardCard title="Future Self" icon={Sparkles}>
        <Text className="text-base leading-6 text-gray-700">
          {dashboardData.futureSelf.message}
        </Text>

        {futureTipVisible && (
          <Tip
            text={dashboardData.futureSelf.aiTip}
            color="#065F46"
            background="#ECFDF5"
          />
        )}

        <View className="mt-4 items-end">
          <Button
            label={futureTipVisible ? 'Hide tip' : 'Ask AI'}
            size="sm"
            variant={futureTipVisible ? 'ghost' : 'primary'}
            leftIcon={
              <Bot
                size={16}
                color={futureTipVisible ? colors.text.primary : '#FFFFFF'}
              />
            }
            onPress={() => setFutureTipVisible((value) => !value)}
            accessibilityLabel="Ask AI about your bike goal"
          />
        </View>
      </DashboardCard>

      <DashboardCard
        title="Goal Progress"
        icon={Target}
        iconColor="#1D4ED8"
        iconBackground="#DBEAFE"
      >
        <View className="mb-3 flex-row items-center justify-between">
          <View>
            <Text className="text-base font-semibold text-gray-900">
              {dashboardData.goal.title}
            </Text>
            <Text className="mt-1 text-xs text-gray-500">
              ₹
              {dashboardData.goal.monthlyContribution.toLocaleString('en-IN')}{' '}
              per month
            </Text>
          </View>

          <Text className="text-xl font-bold text-blue-600">
            {dashboardData.goal.progress}%
          </Text>
        </View>

        <View
          className="h-3 overflow-hidden rounded-full bg-blue-100"
          accessibilityRole="progressbar"
          accessibilityLabel="Buy Bike progress"
          accessibilityValue={{
            min: 0,
            max: 100,
            now: dashboardData.goal.progress,
          }}
        >
          <View
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${dashboardData.goal.progress}%` }}
          />
        </View>
      </DashboardCard>

      <DashboardCard
        title="Budget Recommendation"
        icon={WalletCards}
        iconColor="#B45309"
        iconBackground="#FEF3C7"
      >
        <View className="gap-4">
          {dashboardData.budget.map((category) => (
            <View key={category.id}>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-700">
                  {category.label}
                </Text>
                <Text className="text-sm font-bold text-gray-900">
                  {category.percentage}%
                </Text>
              </View>

              <View className="h-2 overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {budgetTipVisible && (
          <Tip
            text={dashboardData.budgetAiTip}
            color="#92400E"
            background="#FFFBEB"
          />
        )}

        <View className="mt-4 items-end">
          <Button
            label={budgetTipVisible ? 'Hide tip' : 'Ask AI'}
            size="sm"
            variant={budgetTipVisible ? 'ghost' : 'outline'}
            leftIcon={<Bot size={16} color={colors.text.primary} />}
            onPress={() => setBudgetTipVisible((value) => !value)}
            accessibilityLabel="Ask AI about your recommended budget"
          />
        </View>
      </DashboardCard>

      <DashboardCard
        title="Continue Learning"
        icon={BookOpen}
        iconColor="#6D28D9"
        iconBackground="#EDE9FE"
      >
        <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Next topic
        </Text>
        <Text className="mt-2 text-lg font-bold text-gray-900">
          {dashboardData.nextLesson.title}
        </Text>
        <Text className="mt-1 text-sm text-gray-500">
          {dashboardData.nextLesson.duration}
        </Text>

        {lessonStarted && (
          <View className="mt-4 flex-row items-center rounded-xl bg-violet-50 p-3">
            <CheckCircle2 size={18} color="#6D28D9" />
            <Text className="ml-2 flex-1 text-sm text-violet-900">
              Lesson added to today’s learning queue.
            </Text>
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue Emergency Fund lesson"
          onPress={() => setLessonStarted(true)}
          className="mt-4 min-h-12 flex-row items-center justify-center rounded-xl bg-violet-600 px-4 active:bg-violet-700"
        >
          <Text className="mr-2 font-semibold text-white">
            {lessonStarted ? 'Ready to learn' : 'Continue'}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </Pressable>
      </DashboardCard>

      <DashboardCard
        title="Financial Literacy Score"
        icon={Trophy}
        iconColor="#B45309"
        iconBackground="#FEF3C7"
      >
        <View className="items-center py-2">
          <View className="h-32 w-32 items-center justify-center rounded-full border-8 border-amber-100 bg-amber-50">
            <Text className="text-3xl font-bold text-gray-900">
              {dashboardData.literacy.score}
            </Text>
            <Text className="text-sm font-medium text-gray-500">/ 100</Text>
          </View>

          <View className="mt-4 rounded-full bg-amber-100 px-4 py-2">
            <Text className="text-sm font-bold text-amber-800">
              {dashboardData.literacy.label}
            </Text>
          </View>
        </View>
      </DashboardCard>

      <DashboardCard title="Daily Question" icon={CircleHelp}>
        <Text className="mb-4 text-base font-semibold leading-6 text-gray-900">
          {question.prompt}
        </Text>

        <View className="gap-3">
          {question.options.map((option) => {
            const selected = selectedAnswer === option.id;
            const correct =
              submittedAnswer !== null &&
              option.id === question.correctOptionId;
            const incorrect =
              submittedAnswer === option.id &&
              option.id !== question.correctOptionId;

            return (
              <Pressable
                key={option.id}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={option.label}
                onPress={() => {
                  setSelectedAnswer(option.id);
                  setSubmittedAnswer(null);
                }}
                className="min-h-12 flex-row items-center rounded-xl border px-4 py-3"
                style={{
                  borderColor: correct
                    ? colors.success
                    : incorrect
                      ? colors.error
                      : selected
                        ? colors.primary
                        : colors.border,
                  backgroundColor: correct
                    ? '#ECFDF5'
                    : incorrect
                      ? '#FEF2F2'
                      : selected
                        ? '#F0FDF4'
                        : '#FFFFFF',
                }}
              >
                <View
                  className="mr-3 h-5 w-5 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor:
                      selected || correct ? colors.primary : '#9CA3AF',
                  }}
                >
                  {(selected || correct) && (
                    <View className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  )}
                </View>

                <Text className="flex-1 text-sm font-medium text-gray-800">
                  {option.label}
                </Text>

                {correct && (
                  <CheckCircle2 size={19} color={colors.success} />
                )}
                {incorrect && <XCircle size={19} color={colors.error} />}
              </Pressable>
            );
          })}
        </View>

        {submittedAnswer && (
          <View
            className="mt-4 rounded-xl p-3"
            style={{
              backgroundColor: isCorrect ? '#ECFDF5' : '#FEF2F2',
            }}
          >
            <Text
              className="font-bold"
              style={{ color: isCorrect ? '#065F46' : '#B91C1C' }}
            >
              {isCorrect ? 'That’s right!' : 'Not quite—try once more.'}
            </Text>

            <Text
              className="mt-1 text-sm leading-5"
              style={{ color: isCorrect ? '#065F46' : '#B91C1C' }}
            >
              {question.explanation}
            </Text>
          </View>
        )}

        <Button
          label="Check answer"
          fullWidth
          className="mt-4"
          disabled={!selectedAnswer}
          onPress={() => {
            if (selectedAnswer) setSubmittedAnswer(selectedAnswer);
          }}
          accessibilityLabel="Check daily question answer"
        />
      </DashboardCard>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Log out"
        onPress={logout}
        className="mt-2 min-h-12 flex-row items-center justify-center rounded-xl active:bg-gray-100"
      >
        <LogOut size={17} color={colors.text.secondary} />
        <Text className="ml-2 text-sm font-semibold text-gray-500">
          Log out
        </Text>
      </Pressable>
    </Screen>
  );
}

function Tip({
  text,
  color,
  background,
}: {
  text: string;
  color: string;
  background: string;
}) {
  return (
    <View
      className="mt-4 flex-row rounded-xl p-3"
      style={{ backgroundColor: background }}
    >
      <Bot size={18} color={color} />
      <Text className="ml-2 flex-1 text-sm leading-5" style={{ color }}>
        {text}
      </Text>
    </View>
  );
}