import { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/ui/Card';
import { useOnboardingStore } from '../onboarding.store';
import type { Occupation, OnboardingStepHandle } from '../types';

const occupations: Occupation[] = [
  'Student',
  'Salaried Employee',
  'Gig Worker',
  'Farmer',
  'Business Owner',
  'Homemaker',
  'Retired',
  'Other',
];

export const OccupationStep = forwardRef<OnboardingStepHandle>(
  function OccupationStep(_, ref) {
    const savedOccupation = useOnboardingStore(
      (state) => state.occupation
    );
    const updateData = useOnboardingStore((state) => state.updateData);

    const [selected, setSelected] = useState<Occupation | null>(
      savedOccupation
    );
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
      validate: async () => {
        if (!selected) {
          setError('Choose an occupation');
          return false;
        }

        updateData({ occupation: selected });
        return true;
      },
    }));

    return (
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {occupations.map((occupation) => (
          <Pressable
            key={occupation}
            className="w-[48%]"
            accessibilityRole="radio"
            accessibilityState={{
              selected: selected === occupation,
            }}
            onPress={() => {
              setSelected(occupation);
              setError('');
            }}
          >
            <Card
              className={
                selected === occupation
                  ? 'min-h-20 justify-center border-2 border-emerald-500 bg-emerald-50'
                  : 'min-h-20 justify-center'
              }
            >
              <Text className="text-center text-sm font-semibold text-gray-900">
                {occupation}
              </Text>
            </Card>
          </Pressable>
        ))}

        {error ? (
          <Text className="w-full text-sm text-red-500">{error}</Text>
        ) : null}
      </View>
    );
  }
);