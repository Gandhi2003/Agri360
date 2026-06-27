import { create } from 'zustand';
import type { FarmVisitFilters } from '../types';

interface FarmVisitsUiState {
  filters: FarmVisitFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<FarmVisitFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as FarmVisitFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Farm Visits. */
export const useFarmVisitsStore = create<FarmVisitsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
