import {
  Beef,
  Bird,
  Bug,
  Droplets,
  Fish,
  FlaskConical,
  Hammer,
  Leaf,
  Milk,
  Package,
  PawPrint,
  Layers,
  SprayCan,
  Sprout,
  Tag,
  Tractor,
  Truck,
  Warehouse,
  Wheat,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '../types';

interface CategoryAccentColor {
  icon: string;
  bar: string;
}

const CATEGORY_ICON_KEYWORDS: Array<{ keyword: string; icon: LucideIcon }> = [
  { keyword: 'seed', icon: Leaf },
  { keyword: 'fertiliz', icon: Sprout },
  { keyword: 'insecticide', icon: Bug },
  { keyword: 'fungicide', icon: SprayCan },
  { keyword: 'herbicide', icon: SprayCan },
  { keyword: 'pesticide', icon: SprayCan },
  { keyword: 'cide', icon: SprayCan },
  { keyword: 'chemical', icon: FlaskConical },
  { keyword: 'tractor', icon: Tractor },
  { keyword: 'machin', icon: Tractor },
  { keyword: 'vehicle', icon: Truck },
  { keyword: 'irrigation', icon: Droplets },
  { keyword: 'water', icon: Droplets },
  { keyword: 'tool', icon: Wrench },
  { keyword: 'equipment', icon: Wrench },
  { keyword: 'hardware', icon: Hammer },
  { keyword: 'feed', icon: Wheat },
  { keyword: 'grain', icon: Wheat },
  { keyword: 'livestock', icon: Beef },
  { keyword: 'dairy', icon: Milk },
  { keyword: 'poultry', icon: Bird },
  { keyword: 'fish', icon: Fish },
  { keyword: 'animal', icon: PawPrint },
  { keyword: 'pack', icon: Package },
  { keyword: 'storage', icon: Warehouse },
  { keyword: 'soil', icon: Layers },
];

/** Maps a category name to a representative icon, falling back to a generic tag. */
export const getCategoryIcon = (category: Category): LucideIcon => {
  const name = category.name.toLowerCase();
  return CATEGORY_ICON_KEYWORDS.find(({ keyword }) => name.includes(keyword))?.icon ?? Tag;
};

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
