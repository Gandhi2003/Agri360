import type { FeatureRoute } from '@common/types';
import { PRODUCTS_PERMISSIONS } from './constants';

export const productsRoutes: FeatureRoute[] = [
  {
    path: 'products',
    title: 'Products',
    permission: PRODUCTS_PERMISSIONS.VIEW,
    component: () => import('./pages/ProductsListPage'),
  },
];
