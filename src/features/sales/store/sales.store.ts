import { create } from 'zustand';
import type { SaleFilters } from '../types';

interface SalesUiState {
  filters: SaleFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<SaleFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as SaleFilters, page: 1, pageSize: 10 };

export const useSalesStore = create<SalesUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
