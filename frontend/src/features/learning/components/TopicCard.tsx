import { Pressable, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/theme';
import { LockedOverlay } from './LockedOverlay';
import { LearningTopic } from '../types';

interface TopicCardProps {
  topic: LearningTopic;
  progress: number;
  locked?: boolean;
  completed?: boolean;
  active?: boolean;
  startHere?: boolean;
  onPress?: () => void;
}

export function TopicCard({
  topic,
  progress,
  locked = false,
  completed = false,
  active = false,
  startHere = false,
  onPress,
}: TopicCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: locked }}
      disabled={locked}
      onPress={onPress}
      className="flex-1"
    >
      <View>
        {startHere && (
          <View className="absolute -top-3 left-4 z-10 rounded-full bg-gray-900 px-3 py-1">
            <Text className="text-[10px] font-bold uppercase tracking-wider text-white">
              Start Here
            </Text>
          </View>
        )}

        <Card
          variant={active ? 'elevated' : 'outlined'}
          className={`min-h-24 overflow-hidden ${
            locked ? 'opacity-45' : ''
          } ${active ? 'border-emerald-200 bg-emerald-50' : ''}`}
          style={active ? { shadowColor: colors.primary, shadowOpacity: 0.22 } : undefined}
        >
          <View className="flex-row items-center">
            <View
              className={`mr-3 h-12 w-12 items-center justify-center rounded-2xl ${
                active ? 'bg-white' : completed ? 'bg-emerald-100' : 'bg-gray-100'
              }`}
            >
              <Text className="text-2xl">{completed ? '✓' : topic.icon}</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="flex-1 text-base font-bold text-gray-900">
                  {topic.title}
                </Text>

                <Text className="ml-2 text-sm font-bold text-gray-500">
                  {progress}%
                </Text>
              </View>

              <Text className="mt-1 text-sm text-gray-500">
                {topic.lessonCount} Lessons • {topic.subtitle}
              </Text>

              <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: completed ? colors.success : colors.primary,
                  }}
                />
              </View>

              {active && (
                <Text className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Current lesson: Theory
                </Text>
              )}
            </View>
          </View>

          {locked && <LockedOverlay />}
        </Card>
      </View>
    </Pressable>
  );
}
