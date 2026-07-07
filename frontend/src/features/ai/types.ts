export type ChatRole = 'user' | 'futureSelf';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
}

export interface AskAiRequest {
  question: string;
  userName?: string;
  goals?: string[];
}