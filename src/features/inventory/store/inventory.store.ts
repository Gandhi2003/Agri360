import { create } from 'zustand';
import type { InventoryFilters } from '../types';

interface InventoryUiState {
  filters: InventoryFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<InventoryFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as InventoryFilters, page: 1, pageSize: 10 };

export const useInventoryStore = create<InventoryUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
