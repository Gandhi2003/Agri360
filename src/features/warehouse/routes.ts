import type { FeatureRoute } from '@common/types';
import { WAREHOUSE_PERMISSIONS } from './constants';

export const warehouseRoutes: FeatureRoute[] = [
  {
    path: 'warehouse',
    title: 'Warehouse',
    permission: WAREHOUSE_PERMISSIONS.VIEW,
    component: () => import('./pages/WarehouseListPage'),
  },
];
