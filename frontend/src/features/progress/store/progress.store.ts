import { create } from 'zustand';

import { getProgress } from '../services/mockProgress';
import { ProgressData } from '../types';

interface ProgressStore {
  progress: ProgressData | null;
  loading: boolean;
  loadProgress: () => Promise<void>;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: null,
  loading: false,

  loadProgress: async () => {
    set({ loading: true });

    try {
      const progress = await getProgress();
      set({ progress, loading: false });
    } catch {
      set({ progress: null, loading: false });
    }
  },
}));