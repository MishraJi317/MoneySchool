import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  submitted: boolean;
  onSelect: (optionId: string) => void;
  onSubmit: () => void;
}

export function QuizCard({
  question,
  selectedOptionId,
  submitted,
  onSelect,
  onSubmit,
}: QuizCardProps) {
  const isCorrect = selectedOptionId === question.correctOptionId;

  return (
    <Card variant="elevated" className="mb-5">
      <Text className="text-lg font-bold leading-7 text-gray-900">
        {question.prompt}
      </Text>

      <View className="mt-5 gap-3">
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          const correct = submitted && option.id === question.correctOptionId;
          const incorrect = submitted && selected && !correct;

          return (
            <Button
              key={option.id}
              label={option.label}
              variant={selected ? 'primary' : 'outline'}
              disabled={submitted}
              onPress={() => onSelect(option.id)}
              className={
                correct
                  ? 'bg-emerald-500'
                  : incorrect
                    ? 'border-red-300 bg-red-50'
                    : undefined
              }
            />
          );
        })}
      </View>

      {submitted && (
        <View
          className={`mt-5 rounded-2xl p-4 ${
            isCorrect ? 'bg-emerald-50' : 'bg-red-50'
          }`}
        >
          <Text
            className={`font-bold ${
              isCorrect ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {isCorrect ? 'Correct!' : 'Not quite yet.'}
          </Text>
          <Text
            className={`mt-1 text-sm leading-6 ${
              isCorrect ? 'text-emerald-900' : 'text-red-900'
            }`}
          >
            {question.explanation}
          </Text>
        </View>
      )}

      {!submitted && (
        <Button
          label="Check answer"
          fullWidth
          className="mt-5"
          disabled={!selectedOptionId}
          onPress={onSubmit}
        />
      )}
    </Card>
  );
}
