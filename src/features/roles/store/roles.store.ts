import { create } from 'zustand';
import type { RoleFilters } from '../types';

interface RolesUiState {
  filters: RoleFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<RoleFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as RoleFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Role Management. */
export const useRolesStore = create<RolesUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
