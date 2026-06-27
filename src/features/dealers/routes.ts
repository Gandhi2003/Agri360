import type { FeatureRoute } from '@common/types';
import { DEALERS_PERMISSIONS } from './constants';

export const dealersRoutes: FeatureRoute[] = [
  {
    path: 'dealers',
    title: 'Dealer Management',
    permission: DEALERS_PERMISSIONS.VIEW,
    component: () => import('./pages/DealersListPage'),
  },
];
