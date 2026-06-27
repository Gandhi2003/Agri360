import { create } from 'zustand';
import type { CategoryFilters } from '../types';

interface CategoriesUiState {
  filters: CategoryFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<CategoryFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as CategoryFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Categories. */
export const useCategoriesStore = create<CategoriesUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
