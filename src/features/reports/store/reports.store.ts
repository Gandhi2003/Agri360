import { create } from 'zustand';
import type { ReportFilters } from '../types';

interface ReportsUiState {
  filters: ReportFilters;
  page: number;
  pageSize: number;
  setFilters: (filters: Partial<ReportFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

const initial = { filters: {} as ReportFilters, page: 1, pageSize: 10 };

/** Feature-scoped UI state (filters/pagination) for Reports. */
export const useReportsStore = create<ReportsUiState>((set) => ({
  ...initial,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  reset: () => set(initial),
}));
