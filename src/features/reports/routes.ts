import type { FeatureRoute } from '@common/types';
import { REPORTS_PERMISSIONS } from './constants';

export const reportsRoutes: FeatureRoute[] = [
  {
    path: 'reports',
    title: 'Reports',
    permission: REPORTS_PERMISSIONS.VIEW,
    component: () => import('./pages/ReportsListPage'),
  },
];
