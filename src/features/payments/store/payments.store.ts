import { create } from 'zustand';
import type { PaymentFilters } from '../types';

interface PaymentsUiState {
  filters: PaymentFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<PaymentFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as PaymentFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Payments. */
export const usePaymentsStore = create<PaymentsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
