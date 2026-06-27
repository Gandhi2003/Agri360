import { create } from 'zustand';
import type { PermissionFilters } from '../types';

interface PermissionsUiState {
  filters: PermissionFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<PermissionFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as PermissionFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Permission Management. */
export const usePermissionsStore = create<PermissionsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
