import { create } from 'zustand';
import type { MarketingFilters } from '../types';

interface MarketingUiState {
  filters: MarketingFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<MarketingFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as MarketingFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Marketing. */
export const useMarketingStore = create<MarketingUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
