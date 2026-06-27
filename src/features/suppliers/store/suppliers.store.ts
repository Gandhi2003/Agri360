import { create } from 'zustand';
import type { SupplierFilters } from '../types';

interface SuppliersUiState {
  filters: SupplierFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<SupplierFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as SupplierFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Supplier Management. */
export const useSuppliersStore = create<SuppliersUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
