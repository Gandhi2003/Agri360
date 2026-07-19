import { create } from 'zustand';
import type { QuotationFilters } from '../types';

interface QuotationsUiState {
  filters: QuotationFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<QuotationFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as QuotationFilters, page: 1, pageSize: 10 };

export const useQuotationsStore = create<QuotationsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
