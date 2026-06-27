import type { FeatureRoute } from '@common/types';
import { INVENTORY_PERMISSIONS } from './constants';

export const inventoryRoutes: FeatureRoute[] = [
  {
    path: 'inventory',
    title: 'Inventory',
    permission: INVENTORY_PERMISSIONS.VIEW,
    component: () => import('./pages/InventoryListPage'),
  },
];
