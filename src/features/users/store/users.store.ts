import { create } from 'zustand';
import type { UserFilters } from '../types';

interface UsersUiState {
  filters: UserFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<UserFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as UserFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for User Management. */
export const useUsersStore = create<UsersUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
