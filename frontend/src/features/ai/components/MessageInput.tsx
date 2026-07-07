import { useState } from 'react';
import { View } from 'react-native';
import { Send } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface MessageInputProps {
  loading?: boolean;
  onSend: (message: string) => void;
}

export function MessageInput({ loading = false, onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const send = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    onSend(trimmedMessage);
    setMessage('');
  };

  return (
    <View className="border-t border-gray-200 bg-slate-50 px-4 pb-3 pt-3">
      <View className="flex-row items-end gap-2">
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Type your question..."
          multiline
          maxLength={400}
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={send}
          containerClassName="flex-1"
          className="max-h-28"
          editable={!loading}
        />

        <Button
          label=""
          size="md"
          loading={loading}
          disabled={!message.trim()}
          onPress={send}
          accessibilityLabel="Send question"
          rightIcon={<Send size={18} color="#FFFFFF" />}
          className="h-12 w-12 rounded-xl px-0"
        />
      </View>
    </View>
  );
}