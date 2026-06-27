import type { FeatureRoute } from '@common/types';

export const dashboardRoutes: FeatureRoute[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: () => import('./pages/DashboardPage'),
  },
];
