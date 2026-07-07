import { Text, View } from 'react-native';

export function TypingIndicator() {
  return (
    <View className="mb-3 flex-row justify-start">
      <View className="mr-2 mt-1 h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
        <Text className="text-base">👤</Text>
      </View>

      <View className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3">
        <Text className="text-sm font-medium text-gray-500">
          Future You is thinking...
        </Text>
      </View>
    </View>
  );
}