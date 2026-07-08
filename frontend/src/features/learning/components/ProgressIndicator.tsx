import { Text, View } from 'react-native';

import { colors } from '@/theme';
import { LEARNING_STAGES } from '../constants';
import { LearningStage } from '../types';

interface ProgressIndicatorProps {
  currentStage: LearningStage;
}

export function ProgressIndicator({ currentStage }: ProgressIndicatorProps) {
  const currentIndex = LEARNING_STAGES.findIndex((stage) => stage.id === currentStage);

  return (
    <View className="mb-5">
      <View className="mb-2 flex-row justify-between">
        {LEARNING_STAGES.map((stage, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <View
              key={stage.id}
              className="h-2 flex-1 rounded-full"
              style={{
                marginRight: index === LEARNING_STAGES.length - 1 ? 0 : 6,
                backgroundColor: isDone || isActive ? colors.primary : '#E5E7EB',
                opacity: isActive ? 1 : 0.8,
              }}
            />
          );
        })}
      </View>

      <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {LEARNING_STAGES[currentIndex]?.label ?? 'Learning'}
      </Text>
    </View>
  );
}
