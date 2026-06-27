import { create } from 'zustand';
import type { PurchaseFilters } from '../types';

interface PurchaseUiState {
  filters: PurchaseFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<PurchaseFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as PurchaseFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Purchase. */
export const usePurchaseStore = create<PurchaseUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
