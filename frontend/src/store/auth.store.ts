import { create } from 'zustand';
import { secureStorage, STORAGE_KEYS } from "@/services/storage/secureStorage";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isOnboardingComplete: boolean;
  isLoading: boolean;

  // Called on app start — rehydrates token from SecureStore
  initialize: () => Promise<'dashboard' | 'onboarding' | 'login'>;

  // Called after signup or login — backend always returns both token + flag
  setAuth: (params: {
    token: string;
    user: User;
    isOnboardingComplete: boolean;
  }) => Promise<void>;

  // Called by onboarding agent when all questions are answered
  completeOnboarding: () => Promise<void>;

  // Called on logout
  clearAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isOnboardingComplete: false,
  isLoading: true,

  initialize: async () => {
    const token = await secureStorage.get(STORAGE_KEYS.AUTH_TOKEN);
    const onboardingDone = await secureStorage.get(STORAGE_KEYS.ONBOARDING_COMPLETE);

    if (!token) {
      set({ isLoading: false });
      return 'login';
    }

    set({
      token,
      isOnboardingComplete: onboardingDone === 'true',
      isLoading: false,
    });

    return onboardingDone === 'true' ? 'dashboard' : 'onboarding';
  },

  setAuth: async ({ token, user, isOnboardingComplete }) => {
    await secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    await secureStorage.set(STORAGE_KEYS.USER_ID, user.id);
    await secureStorage.set(
      STORAGE_KEYS.ONBOARDING_COMPLETE,
      String(isOnboardingComplete)
    );
    set({ token, user, isOnboardingComplete });
  },

  completeOnboarding: async () => {
    await secureStorage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    set({ isOnboardingComplete: true });
  },

  clearAuth: async () => {
    await secureStorage.clearAuth();
    set({ token: null, user: null, isOnboardingComplete: false });
  },
}));