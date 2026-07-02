import {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useOnboardingStore } from '../onboarding.store';
import type { OnboardingStepHandle } from '../types';

const goalsSchema = z
  .array(z.string().trim().min(2))
  .min(1, 'Add at least one financial goal');

export const GoalsStep = forwardRef<OnboardingStepHandle>(
  function GoalsStep(_, ref) {
    const goals = useOnboardingStore((state) => state.goals);
    const addGoal = useOnboardingStore((state) => state.addGoal);
    const removeGoal = useOnboardingStore(
      (state) => state.removeGoal
    );

    const [goal, setGoal] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
      const value = goal.trim();

      if (value.length < 2) {
        setError('Enter a goal before adding it');
        return;
      }

      addGoal(value);
      setGoal('');
      setError('');
    };

    useImperativeHandle(
      ref,
      () => ({
        validate: async () => {
          const result = goalsSchema.safeParse(goals);

          if (!result.success) {
            setError(
              result.error.issues[0]?.message ?? 'Add a goal'
            );
            return false;
          }

          return true;
        },
      }),
      [goals]
    );

    return (
      <View>
        <Input
          label="Financial goal"
          placeholder="e.g. Buy Royal Enfield"
          value={goal}
          onChangeText={(value) => {
            setGoal(value);
            setError('');
          }}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          error={error}
        />

        <Button
          label="Add Goal"
          variant="outline"
          fullWidth
          onPress={handleAdd}
          className="mt-3"
        />

        <View className="mt-5 gap-3">
          {goals.map((item) => (
            <View
              key={item}
              className="flex-row items-center rounded-xl border border-gray-200 bg-white p-4"
            >
              <Text className="flex-1 text-base text-gray-900">
                {item}
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item}`}
                onPress={() => removeGoal(item)}
              >
                <Text className="font-semibold text-red-500">
                  Remove
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    );
  }
);