import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/layout/Screen';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { QuizCard } from '../components/QuizCard';
import { useLearningStore } from '../store/learning.store';
import { LearningTopic } from '../types';

interface QuizScreenProps {
  topic: LearningTopic;
  adaptive?: boolean;
}

export function QuizScreen({ topic, adaptive = false }: QuizScreenProps) {
  const questions = adaptive ? topic.adaptiveQuiz : topic.quiz;
  const { currentLesson, completeQuiz } = useLearningStore();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const score = useMemo(() => {
    const totalAnswered = submitted ? questionIndex + 1 : questionIndex;
    if (totalAnswered === 0) return 0;
    return Math.round((correctAnswers / totalAnswered) * 100);
  }, [correctAnswers, questionIndex, submitted]);

  const submitAnswer = () => {
    if (!selectedOptionId) return;

    if (selectedOptionId === currentQuestion.correctOptionId) {
      setCorrectAnswers((value) => value + 1);
    }

    setSubmitted(true);
  };

  const goNext = () => {
    if (!isLastQuestion) {
      setQuestionIndex((value) => value + 1);
      setSelectedOptionId(null);
      setSubmitted(false);
      return;
    }

    const finalCorrectAnswers =
      selectedOptionId === currentQuestion.correctOptionId
        ? correctAnswers + 1
        : correctAnswers;
    const finalScore = Math.round((finalCorrectAnswers / questions.length) * 100);

    completeQuiz(finalScore);
  };

  return (
    <Screen scroll edges={['top']} contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="pb-5 pt-4">
        <Text className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          {topic.title}
        </Text>
        <Text className="mt-2 text-3xl font-bold text-gray-900">
          {adaptive ? 'Adaptive Quiz' : 'Quick Quiz'}
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-500">
          One question at a time. Learn immediately from the feedback.
        </Text>
      </View>

      <ProgressIndicator currentStage={currentLesson} />

      <Card variant="outlined" className="mb-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-500">
            Question {questionIndex + 1} of {questions.length}
          </Text>
          <Text className="text-sm font-bold text-emerald-600">
            Score {score}%
          </Text>
        </View>
      </Card>

      <QuizCard
        question={currentQuestion}
        selectedOptionId={selectedOptionId}
        submitted={submitted}
        onSelect={setSelectedOptionId}
        onSubmit={submitAnswer}
      />

      {submitted && (
        <Button
          label={isLastQuestion ? 'Continue' : 'Next question'}
          size="lg"
          fullWidth
          onPress={goNext}
        />
      )}
    </Screen>
  );
}
