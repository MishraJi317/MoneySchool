import { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/ui/Card';
import { useOnboardingStore } from '../onboarding.store';
import type { Language, OnboardingStepHandle } from '../types';

const languages: Language[] = ['English', 'Hindi', 'Marathi'];

export const LanguageStep = forwardRef<OnboardingStepHandle>(
  function LanguageStep(_, ref) {
    const savedLanguage = useOnboardingStore((state) => state.language);
    const updateData = useOnboardingStore((state) => state.updateData);

    const [selected, setSelected] = useState<Language | null>(
      savedLanguage
    );
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
      validate: async () => {
        if (!selected) {
          setError('Choose a language');
          return false;
        }

        updateData({ language: selected });
        return true;
      },
    }));

    return (
      <View className="gap-3">
        {languages.map((language) => (
          <Pressable
            key={language}
            accessibilityRole="radio"
            accessibilityState={{ selected: selected === language }}
            onPress={() => {
              setSelected(language);
              setError('');
            }}
          >
            <Card
              className={
                selected === language
                  ? 'border-2 border-emerald-500 bg-emerald-50'
                  : undefined
              }
            >
              <Text className="text-base font-semibold text-gray-900">
                {language}
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