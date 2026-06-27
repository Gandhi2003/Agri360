import { create } from 'zustand';
import { STORAGE_KEYS } from '@common/constants';
import { storage } from '@common/helpers';

interface UiState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: storage.get<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED) ?? false,
  mobileSidebarOpen: false,

  toggleSidebar: () =>
    set((state) => {
      const next = !state.sidebarCollapsed;
      storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, next);
      return { sidebarCollapsed: next };
    }),

  setSidebarCollapsed: (collapsed) => {
    storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed);
    set({ sidebarCollapsed: collapsed });
  },

  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
}));
