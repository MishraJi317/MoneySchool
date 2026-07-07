import { AiResponseLength, AppLanguage, FutureSelfTone } from './types';

export const APP_VERSION = 'v1.0.0';

export const LANGUAGE_OPTIONS: AppLanguage[] = ['English', 'Hindi', 'Marathi'];

export const RESPONSE_LENGTH_OPTIONS: AiResponseLength[] = [
  'Short',
  'Balanced',
  'Detailed',
];

export const FUTURE_SELF_TONE_OPTIONS: FutureSelfTone[] = [
  'Calm Mentor',
  'Motivational Coach',
  'Friendly Guide',
];

export const DEFAULT_SETTINGS = {
  language: 'English',
  notificationsEnabled: true,
  voiceOutputEnabled: false,
  voiceInputEnabled: false,
  responseLength: 'Balanced',
  futureSelfTone: 'Calm Mentor',
} as const;