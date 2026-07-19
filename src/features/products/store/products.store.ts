import { create } from 'zustand';
import type { ProductFilters } from '../types';

interface ProductsUiState {
  filters: ProductFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as ProductFilters, page: 1, pageSize: 10 };

export const useProductsStore = create<ProductsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
