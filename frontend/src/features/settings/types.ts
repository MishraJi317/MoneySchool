export type AppLanguage = 'English' | 'Hindi' | 'Marathi';

export type AiResponseLength = 'Short' | 'Balanced' | 'Detailed';

export type FutureSelfTone = 'Calm Mentor' | 'Motivational Coach' | 'Friendly Guide';

export interface SettingsData {
  language: AppLanguage;
  notificationsEnabled: boolean;
  voiceOutputEnabled: boolean;
  voiceInputEnabled: boolean;
  responseLength: AiResponseLength;
  futureSelfTone: FutureSelfTone;
}