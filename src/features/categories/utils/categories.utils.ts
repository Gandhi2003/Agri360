import type { Category } from '../types';

interface CategoryAccentColor {
  icon: string;
  bar: string;
}

const CATEGORY_ACCENT_COLORS: CategoryAccentColor[] = [
  { icon: 'bg-blue-600', bar: 'bg-blue-600' },
  { icon: 'bg-emerald-600', bar: 'bg-emerald-600' },
  { icon: 'bg-amber-500', bar: 'bg-amber-500' },
  { icon: 'bg-slate-800', bar: 'bg-slate-800' },
  { icon: 'bg-violet-600', bar: 'bg-violet-600' },
  { icon: 'bg-rose-600', bar: 'bg-rose-600' },
  { icon: 'bg-cyan-600', bar: 'bg-cyan-600' },
  { icon: 'bg-orange-600', bar: 'bg-orange-600' },
];

/** Deterministic per-category color so a given category always renders the same accent. */
export const getCategoryAccentColor = (category: Category): CategoryAccentColor => {
  const key = category.name || String(category.id);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % CATEGORY_ACCENT_COLORS.length;
  return CATEGORY_ACCENT_COLORS[index];
};
