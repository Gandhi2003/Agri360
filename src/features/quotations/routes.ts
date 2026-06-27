import type { FeatureRoute } from '@common/types';
import { QUOTATIONS_PERMISSIONS } from './constants';

export const quotationsRoutes: FeatureRoute[] = [
  {
    path: 'quotations',
    title: 'Quotations',
    permission: QUOTATIONS_PERMISSIONS.VIEW,
    component: () => import('./pages/QuotationsListPage'),
  },
];
