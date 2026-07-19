import { create } from 'zustand';
import type { InvoiceFilters } from '../types';

interface InvoicesUiState {
  filters: InvoiceFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<InvoiceFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as InvoiceFilters, page: 1, pageSize: 10 };

export const useInvoicesStore = create<InvoicesUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
