import { Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/theme';

export function FutureSelfHeader() {
  return (
    <Card variant="elevated" className="mb-4">
      <View className="flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Text className="text-2xl">👤</Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-gray-900">Future You</Text>
            <Sparkles size={16} color={colors.primary} className="ml-1" />
          </View>

          <Text className="mt-0.5 text-sm leading-5 text-gray-500">
            Always here to guide your financial future.
          </Text>
        </View>
      </View>
    </Card>
  );
}