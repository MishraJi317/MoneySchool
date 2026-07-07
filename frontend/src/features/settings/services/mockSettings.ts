import * as SecureStore from 'expo-secure-store';

import { DEFAULT_SETTINGS } from '../constants';
import { SettingsData } from '../types';

const SETTINGS_STORAGE_KEY = 'arthsaathi_settings';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSettings(): Promise<SettingsData> {
  await delay(300);

  try {
    const savedSettings = await SecureStore.getItemAsync(SETTINGS_STORAGE_KEY);

    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(savedSettings),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: SettingsData): Promise<SettingsData> {
  await delay(200);

  await SecureStore.setItemAsync(SETTINGS_STORAGE_KEY, JSON.stringify(settings));

  return settings;
}