import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ProfileCardProps {
  name: string;
  email: string;
  category: string;
  onEditProfile: () => void;
}

export function ProfileCard({
  name,
  email,
  category,
  onEditProfile,
}: ProfileCardProps) {
  return (
    <Card variant="elevated" className="mb-6">
      <View className="flex-row items-center">
        <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <Text className="text-3xl">👤</Text>
        </View>

        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900">{name}</Text>
          <Text className="mt-1 text-sm text-gray-500">{email}</Text>

          <View className="mt-2 self-start rounded-full bg-emerald-50 px-3 py-1">
            <Text className="text-xs font-bold text-emerald-700">
              {category}
            </Text>
          </View>
        </View>
      </View>

      <Button
        label="Edit Profile"
        variant="outline"
        fullWidth
        className="mt-5"
        onPress={onEditProfile}
      />
    </Card>
  );
}