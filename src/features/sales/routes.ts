import type { FeatureRoute } from '@common/types';
import { SALES_PERMISSIONS } from './constants';

export const salesRoutes: FeatureRoute[] = [
  {
    path: 'sales',
    title: 'Sales',
    permission: SALES_PERMISSIONS.VIEW,
    component: () => import('./pages/SalesListPage'),
  },
];
