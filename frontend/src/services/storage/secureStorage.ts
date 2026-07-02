import * as SecureStore from 'expo-secure-store';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  ONBOARDING_COMPLETE: 'onboarding_complete',   // ← added
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const secureStorage = {
  async get(key: StorageKey): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  async set(key: StorageKey, value: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch {
      return false;
    }
  },

  async remove(key: StorageKey): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch {
      return false;
    }
  },

  async clearAuth(): Promise<void> {
    await Promise.all(
      Object.values(STORAGE_KEYS).map((k) => SecureStore.deleteItemAsync(k))
    );
  },
};