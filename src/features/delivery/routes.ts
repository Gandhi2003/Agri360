import type { FeatureRoute } from '@common/types';
import { DELIVERY_PERMISSIONS } from './constants';

export const deliveryRoutes: FeatureRoute[] = [
  {
    path: 'delivery',
    title: 'Delivery',
    permission: DELIVERY_PERMISSIONS.VIEW,
    component: () => import('./pages/DeliveryListPage'),
  },
];
