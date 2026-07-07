import { create } from 'zustand';

import { askFutureSelf } from '@/services/ai/mockAskAiService';
import { ChatMessage } from '../types';

interface ChatStore {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (question: string, context?: { userName?: string; goals?: string[] }) => Promise<void>;
  clearChat: () => void;
}

function createMessage(role: ChatMessage['role'], text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    text,
    createdAt: Date.now(),
  };
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  loading: false,

  sendMessage: async (question, context) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || get().loading) {
      return;
    }

    const userMessage = createMessage('user', trimmedQuestion);

    set((state) => ({
      messages: [...state.messages, userMessage],
      loading: true,
    }));

    try {
      const response = await askFutureSelf({
        question: trimmedQuestion,
        userName: context?.userName,
        goals: context?.goals,
      });

      const futureSelfMessage = createMessage('futureSelf', response);

      set((state) => ({
        messages: [...state.messages, futureSelfMessage],
        loading: false,
      }));
    } catch {
      const errorMessage = createMessage(
        'futureSelf',
        'I had trouble thinking through that. Try asking me again in a moment.'
      );

      set((state) => ({
        messages: [...state.messages, errorMessage],
        loading: false,
      }));
    }
  },

  clearChat: () => {
    set({
      messages: [],
      loading: false,
    });
  },
}));