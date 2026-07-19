import { create } from 'zustand';
import type { SettingFilters } from '../types';

interface SettingsUiState {
  filters: SettingFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<SettingFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as SettingFilters, page: 1, pageSize: 10 };

export const useSettingsStore = create<SettingsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
