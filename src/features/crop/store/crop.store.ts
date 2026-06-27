import { create } from 'zustand';
import type { CropFilters } from '../types';

interface CropUiState {
  filters: CropFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<CropFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as CropFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Crop Management. */
export const useCropStore = create<CropUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
