import { View } from 'react-native';

import { LearningTopic } from '../types';
import { TopicCard } from './TopicCard';

interface JourneyNodeProps {
  topic: LearningTopic;
  progress: number;
  locked: boolean;
  completed: boolean;
  active: boolean;
  startHere: boolean;
  isLast: boolean;
  onPress: () => void;
}

export function JourneyNode({
  topic,
  progress,
  locked,
  completed,
  active,
  startHere,
  isLast,
  onPress,
}: JourneyNodeProps) {
  return (
    <View className="relative">
      {!isLast && (
        <View className="absolute bottom-0 left-1/2 top-20 w-px -translate-x-1/2 bg-gray-200" />
      )}

      <View className={`${active ? 'px-0' : 'px-2'} pb-4`}>
        <TopicCard
          topic={topic}
          progress={progress}
          locked={locked}
          completed={completed}
          active={active}
          startHere={startHere}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
