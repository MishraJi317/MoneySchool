import { create } from 'zustand';

import { DEFAULT_SETTINGS } from '../constants';
import { getSettings, saveSettings as persistSettings } from '../services/mockSettings';
import { AiResponseLength, AppLanguage, FutureSelfTone, SettingsData } from '../types';

interface SettingsStore extends SettingsData {
  loading: boolean;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
  toggleNotifications: () => Promise<void>;
  toggleVoiceOutput: () => Promise<void>;
  toggleVoiceInput: () => Promise<void>;
  setLanguage: (language: AppLanguage) => Promise<void>;
  setResponseLength: (responseLength: AiResponseLength) => Promise<void>;
  setFutureSelfTone: (futureSelfTone: FutureSelfTone) => Promise<void>;
}

async function saveCurrentSettings(get: () => SettingsStore) {
  const {
    language,
    notificationsEnabled,
    voiceOutputEnabled,
    voiceInputEnabled,
    responseLength,
    futureSelfTone,
  } = get();

  await persistSettings({
    language,
    notificationsEnabled,
    voiceOutputEnabled,
    voiceInputEnabled,
    responseLength,
    futureSelfTone,
  });
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...DEFAULT_SETTINGS,
  loading: false,

  loadSettings: async () => {
    set({ loading: true });

    const settings = await getSettings();

    set({
      ...settings,
      loading: false,
    });
  },

  saveSettings: async () => {
    await saveCurrentSettings(get);
  },

  toggleNotifications: async () => {
    set((state) => ({
      notificationsEnabled: !state.notificationsEnabled,
    }));

    await saveCurrentSettings(get);
  },

  toggleVoiceOutput: async () => {
    set((state) => ({
      voiceOutputEnabled: !state.voiceOutputEnabled,
    }));

    await saveCurrentSettings(get);
  },

  toggleVoiceInput: async () => {
    set((state) => ({
      voiceInputEnabled: !state.voiceInputEnabled,
    }));

    await saveCurrentSettings(get);
  },

  setLanguage: async (language) => {
    set({ language });
    await saveCurrentSettings(get);
  },

  setResponseLength: async (responseLength) => {
    set({ responseLength });
    await saveCurrentSettings(get);
  },

  setFutureSelfTone: async (futureSelfTone) => {
    set({ futureSelfTone });
    await saveCurrentSettings(get);
  },
}));