import { create } from 'zustand';
import type { StockFilters } from '../types';

interface StockUiState {
  filters: StockFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<StockFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as StockFilters, page: 1, pageSize: 10 };

export const useStockStore = create<StockUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
