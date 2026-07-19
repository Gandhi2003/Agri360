import { create } from 'zustand';
import type { FarmerFilters } from '../types';

interface FarmersUiState {
  filters: FarmerFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<FarmerFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as FarmerFilters, page: 1, pageSize: 10 };

export const useFarmersStore = create<FarmersUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
