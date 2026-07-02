import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Card } from '../../../components/ui/Card';

export function AgentCard({ children }: { children: ReactNode }) {
  return (
    <Card
      variant="elevated"
      className="border border-emerald-100 bg-emerald-50"
    >
      <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
        <Text className="font-bold text-white">YOU</Text>
      </View>

      {children}
    </Card>
  );
}