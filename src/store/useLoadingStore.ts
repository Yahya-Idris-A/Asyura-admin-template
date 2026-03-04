import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  text: string;
  progress: number | null; // Null kalau cuma muter-muter aja (indeterminate)
  showLoading: (text?: string, progress?: number | null) => void;
  updateProgress: (progress: number) => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  text: "Processing...",
  progress: null,
  showLoading: (text = "Processing...", progress = null) => 
    set({ isLoading: true, text, progress }),
  updateProgress: (progress) => set({ progress }),
  hideLoading: () => set({ isLoading: false, progress: null }),
}));