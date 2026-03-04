import { create } from 'zustand';

export type ModalVariant = 'danger' | 'warning' | 'info';

interface ModalConfig {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
  onConfirm: () => void;
}

interface ModalState {
  isOpen: boolean;
  config: ModalConfig | null;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  config: null,
  openModal: (config) => set({ isOpen: true, config }),
  closeModal: () => set({ isOpen: false, config: null }),
}));