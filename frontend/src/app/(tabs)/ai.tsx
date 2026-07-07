import { useEffect, useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { ChatBubble } from '@/features/ai/components/ChatBubble';
import { FutureSelfHeader } from '@/features/ai/components/FutureSelfHeader';
import { MessageInput } from '@/features/ai/components/MessageInput';
import { SuggestionChip } from '@/features/ai/components/SuggestionChip';
import { TypingIndicator } from '@/features/ai/components/TypingIndicator';
import { AI_SUGGESTIONS, AI_TOPICS, FUTURE_SELF_INTRO } from '@/features/ai/constants';
import { useChatStore } from '@/features/ai/store/chat.store';
import { useAuthStore } from '@/store/auth.store';

export default function AskAiScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  const user = useAuthStore((state) => state.user);
  const { messages, loading, sendMessage } = useChatStore();

  const firstName = useMemo(() => {
    return user?.name?.trim().split(/\s+/)[0] || 'Smit';
  }, [user?.name]);

  const handleSend = (message: string) => {
    sendMessage(message, {
      userName: firstName,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 80);

    return () => clearTimeout(timeout);
  }, [messages.length, loading]);

  return (
    <Screen padded={false} edges={['top']} className="bg-slate-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FutureSelfHeader />

          <Card variant="outlined" className="mb-5">
            <Text className="text-xl font-bold text-gray-900">
              Hi {firstName} 👋
            </Text>

            <Text className="mt-3 text-base leading-6 text-gray-700">
              {FUTURE_SELF_INTRO}
            </Text>

            <Text className="mt-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Ask me anything about
            </Text>

            <View className="mt-3 flex-row flex-wrap gap-2">
              {AI_TOPICS.map((topic) => (
                <View
                  key={topic}
                  className="rounded-full bg-gray-100 px-3 py-1.5"
                >
                  <Text className="text-xs font-semibold text-gray-700">
                    {topic}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          <View className="mb-5">
            <Text className="mb-3 text-base font-bold text-gray-900">
              Suggested Questions
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {AI_SUGGESTIONS.map((suggestion) => (
                <SuggestionChip
                  key={suggestion}
                  label={suggestion}
                  disabled={loading}
                  onPress={() => handleSend(suggestion)}
                />
              ))}
            </ScrollView>
          </View>

          <View>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {loading && <TypingIndicator />}

            {!messages.length && !loading && (
              <View className="rounded-2xl border border-dashed border-gray-300 bg-white/60 p-4">
                <Text className="text-center text-sm leading-5 text-gray-500">
                  Your conversation with Future You will appear here.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <MessageInput loading={loading} onSend={handleSend} />
      </KeyboardAvoidingView>
    </Screen>
  );
}