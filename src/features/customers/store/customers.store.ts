import { create } from 'zustand';
import type { CustomerFilters } from '../types';

interface CustomersUiState {
  filters: CustomerFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<CustomerFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as CustomerFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Customer Management. */
export const useCustomersStore = create<CustomersUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
