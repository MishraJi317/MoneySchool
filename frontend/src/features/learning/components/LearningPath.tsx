import { View } from 'react-native';

import { LearningTopic, TopicId } from '../types';
import { JourneyNode } from './JourneyNode';

interface LearningPathProps {
  topics: LearningTopic[];
  currentTopic: TopicId | null;
  completedTopics: TopicId[];
  onStartTopic: (topicId: TopicId) => void;
}

export function LearningPath({
  topics,
  currentTopic,
  completedTopics,
  onStartTopic,
}: LearningPathProps) {
  const activeTopic =
    currentTopic ?? topics.find((topic) => !completedTopics.includes(topic.id))?.id ?? null;

  return (
    <View>
      {topics.map((topic, index) => {
        const completed = completedTopics.includes(topic.id);
        const active = topic.id === activeTopic && !completed;
        const locked = !completed && !active;
        const progress = completed ? 100 : active ? 40 : 0;

        return (
          <JourneyNode
            key={topic.id}
            topic={topic}
            progress={progress}
            locked={locked}
            completed={completed}
            active={active}
            startHere={active}
            isLast={index === topics.length - 1}
            onPress={() => {
              if (active) onStartTopic(topic.id);
            }}
          />
        );
      })}
    </View>
  );
}
