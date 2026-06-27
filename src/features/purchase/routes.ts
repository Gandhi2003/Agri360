import type { FeatureRoute } from '@common/types';
import { PURCHASE_PERMISSIONS } from './constants';

export const purchaseRoutes: FeatureRoute[] = [
  {
    path: 'purchase',
    title: 'Purchase',
    permission: PURCHASE_PERMISSIONS.VIEW,
    component: () => import('./pages/PurchaseListPage'),
  },
];
