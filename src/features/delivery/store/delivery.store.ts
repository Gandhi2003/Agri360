import { create } from 'zustand';
import type { DeliveryFilters } from '../types';

interface DeliveryUiState {
  filters: DeliveryFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<DeliveryFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as DeliveryFilters, page: 1, pageSize: 10 };

export const useDeliveryStore = create<DeliveryUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
