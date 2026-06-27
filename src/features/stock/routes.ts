import type { FeatureRoute } from '@common/types';
import { STOCK_PERMISSIONS } from './constants';

export const stockRoutes: FeatureRoute[] = [
  {
    path: 'stock',
    title: 'Stock',
    permission: STOCK_PERMISSIONS.VIEW,
    component: () => import('./pages/StockListPage'),
  },
];
