import { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/ui/Card';
import { useOnboardingStore } from '../onboarding.store';
import type { IncomeType, OnboardingStepHandle } from '../types';

const options: Array<{
  value: IncomeType;
  label: string;
  detail: string;
}> = [
  {
    value: 'regular',
    label: 'Regular Income',
    detail: 'A predictable amount each month',
  },
  {
    value: 'irregular',
    label: 'Irregular Income',
    detail: 'Income changes from week to week',
  },
];

export const IncomeTypeStep = forwardRef<OnboardingStepHandle>(
  function IncomeTypeStep(_, ref) {
    const savedType = useOnboardingStore((state) => state.incomeType);
    const savedIncome = useOnboardingStore((state) => state.income);
    const updateData = useOnboardingStore((state) => state.updateData);

    const [selected, setSelected] = useState<IncomeType | null>(
      savedType
    );
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
      validate: async () => {
        if (!selected) {
          setError('Choose an income type');
          return false;
        }

        updateData({
          incomeType: selected,
          income: selected === savedType ? savedIncome : null,
        });

        return true;
      },
    }));

    return (
      <View className="gap-3">
        {options.map((option) => (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: selected === option.value }}
            onPress={() => {
              setSelected(option.value);
              setError('');
            }}
          >
            <Card
              className={
                selected === option.value
                  ? 'border-2 border-emerald-500 bg-emerald-50'
                  : undefined
              }
            >
              <Text className="text-base font-semibold text-gray-900">
                {option.label}
              </Text>
              <Text className="mt-1 text-sm text-gray-500">
                {option.detail}
              </Text>
            </Card>
          </Pressable>
        ))}

        {error ? (
          <Text className="text-sm text-red-500">{error}</Text>
        ) : null}
      </View>
    );
  }
);