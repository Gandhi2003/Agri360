import { create } from 'zustand';
import type { NotificationFilters } from '../types';

interface NotificationsUiState {
  filters: NotificationFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<NotificationFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as NotificationFilters, page: 1, pageSize: 10 };

export const useNotificationsStore = create<NotificationsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
