import { Text, View } from 'react-native';

export function LockedOverlay() {
  return (
    <View className="absolute inset-0 items-end justify-center rounded-2xl bg-white/60 pr-4">
      <Text className="text-lg">🔒</Text>
    </View>
  );
}
