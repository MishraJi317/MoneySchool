import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { shadows } from '@/theme';

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  iconColor?: string;
  iconBackground?: string;
}

export function DashboardCard({
  title,
  icon: Icon,
  children,
  iconColor = '#047857',
  iconBackground = '#D1FAE5',
}: DashboardCardProps) {
  return (
    <Card variant="flat" className="mb-4 p-5" style={shadows.sm}>
      <View className="mb-4 flex-row items-center">
        <View
          className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBackground }}
        >
          <Icon color={iconColor} size={20} strokeWidth={2.2} />
        </View>

        <Text className="flex-1 text-base font-bold text-gray-900">
          {title}
        </Text>
      </View>

      {children}
    </Card>
  );
}