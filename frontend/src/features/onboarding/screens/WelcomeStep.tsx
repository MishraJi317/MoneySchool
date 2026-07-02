import { forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';

import { AgentCard } from '../components/AgentCard';
import type { OnboardingStepHandle } from '../types';

export const WelcomeStep = forwardRef<OnboardingStepHandle>(
  function WelcomeStep(_, ref) {
    useImperativeHandle(ref, () => ({
      validate: async () => true,
    }));

    return (
      <AgentCard>
        <Text className="text-xl font-bold text-gray-900">
          Hi! I’m your future self.
        </Text>

        <Text className="mt-3 text-base leading-7 text-gray-700">
          The financial decisions you make today shape the life I’ll
          live tomorrow.
        </Text>

        <Text className="mt-3 text-base leading-7 text-gray-700">
          Before I can guide you, I need to understand where you’re
          starting from.
        </Text>
      </AgentCard>
    );
  }
);