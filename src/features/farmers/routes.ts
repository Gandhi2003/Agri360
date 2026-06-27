import type { FeatureRoute } from '@common/types';
import { FARMERS_PERMISSIONS } from './constants';

export const farmersRoutes: FeatureRoute[] = [
  {
    path: 'farmers',
    title: 'Farmer Management',
    permission: FARMERS_PERMISSIONS.VIEW,
    component: () => import('./pages/FarmersListPage'),
  },
];
