import { create } from 'zustand';
import type { DealerFilters } from '../types';

interface DealersUiState {
  filters: DealerFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<DealerFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as DealerFilters, page: 1, pageSize: 10 };

export const useDealersStore = create<DealersUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
