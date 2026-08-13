import { create } from 'zustand';

interface BreadcrumbState {
  labels: Record<string, string>;
  setLabel: (segment: string, label: string) => void;
  clearLabel: (segment: string) => void;
}

/** Lets pages override a raw path segment (eg. a dynamic `:id`) with a display label. */
export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  labels: {},

  setLabel: (segment, label) => set((state) => ({ labels: { ...state.labels, [segment]: label } })),

  clearLabel: (segment) =>
    set((state) => {
      const { [segment]: _removed, ...rest } = state.labels;
      return { labels: rest };
    }),
}));
