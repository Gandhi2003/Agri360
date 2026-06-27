import type { FeatureRoute } from '@common/types';
import { MARKETING_PERMISSIONS } from './constants';

export const marketingRoutes: FeatureRoute[] = [
  {
    path: 'marketing',
    title: 'Marketing',
    permission: MARKETING_PERMISSIONS.VIEW,
    component: () => import('./pages/MarketingListPage'),
  },
];
