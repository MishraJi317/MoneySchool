import { Text, View } from 'react-native';

import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-3 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <View className="mr-2 mt-1 h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
          <Text className="text-base">👤</Text>
        </View>
      )}

      <View
        className={`max-w-[78%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'rounded-tr-md bg-emerald-500'
            : 'rounded-tl-md border border-gray-200 bg-white'
        }`}
      >
        <Text
          className={`text-sm leading-5 ${
            isUser ? 'font-medium text-white' : 'text-gray-800'
          }`}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
}