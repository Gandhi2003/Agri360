import { create } from 'zustand';
import type { WarehouseFilters } from '../types';

interface WarehouseUiState {
  filters: WarehouseFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<WarehouseFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as WarehouseFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Warehouse. */
export const useWarehouseStore = create<WarehouseUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
