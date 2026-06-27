import { create } from 'zustand';
import type { ProfileFilters } from '../types';

interface ProfileUiState {
  filters: ProfileFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<ProfileFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as ProfileFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Profile. */
export const useProfileStore = create<ProfileUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
