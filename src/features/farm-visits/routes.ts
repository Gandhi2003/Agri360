import type { FeatureRoute } from '@common/types';
import { FARM_VISITS_PERMISSIONS } from './constants';

export const farmVisitsRoutes: FeatureRoute[] = [
  {
    path: 'farm-visits',
    title: 'Farm Visits',
    permission: FARM_VISITS_PERMISSIONS.VIEW,
    component: () => import('./pages/FarmVisitsListPage'),
  },
];
