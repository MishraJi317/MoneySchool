import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { LessonContent } from '../types';

interface LessonCardProps {
  lesson: LessonContent;
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <View className="mb-5">
      <Card variant="elevated" className="mb-4">
        <View className="mb-4 h-36 items-center justify-center rounded-2xl bg-emerald-50">
          <Text className="text-5xl">📘</Text>
          <Text className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            AI Theory Lesson
          </Text>
        </View>

        <Text className="text-2xl font-bold text-gray-900">{lesson.title}</Text>
        <Text className="mt-1 text-sm font-semibold text-gray-400">
          {lesson.durationMinutes} min teaching module
        </Text>

        <Text className="mt-4 text-base leading-7 text-gray-700">
          {lesson.intro}
        </Text>

        <Text className="mt-4 text-base leading-7 text-gray-700">
          {lesson.body}
        </Text>
      </Card>

      {lesson.sections.map((section, index) => (
        <Card key={section.id} variant="outlined" className="mb-4">
          <View className="mb-3 h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
            <Text className="font-bold text-emerald-700">{index + 1}</Text>
          </View>

          <Text className="text-lg font-bold text-gray-900">
            {section.heading}
          </Text>

          <Text className="mt-3 text-base leading-7 text-gray-700">
            {section.content}
          </Text>
        </Card>
      ))}

      <Card variant="outlined" className="mb-4">
        <Text className="text-lg font-bold text-gray-900">Key ideas</Text>

        <View className="mt-3 gap-3">
          {lesson.keyIdeas.map((idea) => (
            <View key={idea} className="flex-row">
              <Text className="mr-2 text-emerald-600">✓</Text>
              <Text className="flex-1 text-base leading-6 text-gray-700">
                {idea}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card variant="outlined" className="mb-4 bg-red-50">
        <Text className="text-lg font-bold text-red-700">
          Common mistakes to avoid
        </Text>

        <View className="mt-3 gap-3">
          {lesson.commonMistakes.map((mistake) => (
            <View key={mistake} className="flex-row">
              <Text className="mr-2 text-red-500">•</Text>
              <Text className="flex-1 text-base leading-6 text-red-900">
                {mistake}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card variant="outlined" className="mb-4 bg-blue-50">
        <Text className="text-sm font-bold uppercase tracking-wider text-blue-700">
          Real-life example
        </Text>
        <Text className="mt-2 text-base leading-7 text-blue-950">
          {lesson.example}
        </Text>
      </Card>

      <Card variant="outlined" className="mb-4 bg-amber-50">
        <Text className="text-sm font-bold uppercase tracking-wider text-amber-700">
          Important note
        </Text>
        <Text className="mt-2 text-base leading-7 text-amber-950">
          {lesson.note}
        </Text>
      </Card>

      <Card variant="outlined" className="mb-4">
        <Text className="text-lg font-bold text-gray-900">Quick check</Text>
        <Text className="mt-3 text-base font-semibold leading-7 text-gray-700">
          {lesson.quickCheck.prompt}
        </Text>
        <View className="mt-3 rounded-2xl bg-gray-50 p-4">
          <Text className="text-sm font-bold text-gray-500">
            Future You says
          </Text>
          <Text className="mt-1 text-base leading-7 text-gray-700">
            {lesson.quickCheck.answer}
          </Text>
        </View>
      </Card>

      <Card variant="elevated" className="bg-emerald-50">
        <Text className="text-lg font-bold text-emerald-900">
          Before the simulator
        </Text>
        <Text className="mt-2 text-base leading-7 text-emerald-950">
          {lesson.simulatorPrep}
        </Text>
      </Card>
    </View>
  );
}
