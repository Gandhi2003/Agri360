import type { FeatureRoute } from '@common/types';
import { CATEGORIES_PERMISSIONS } from './constants';

export const categoriesRoutes: FeatureRoute[] = [
  {
    path: 'categories',
    title: 'Categories',
    permission: CATEGORIES_PERMISSIONS.VIEW,
    component: () => import('./pages/CategoriesListPage'),
  },
];
