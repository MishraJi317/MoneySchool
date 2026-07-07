import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 ml-1 text-xs font-bold uppercase tracking-wider text-gray-400">
        {title}
      </Text>

      <Card variant="outlined" className="divide-y divide-gray-100">
        {children}
      </Card>
    </View>
  );
}