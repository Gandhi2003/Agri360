import type { FeatureRoute } from '@common/types';
import { PAYMENTS_PERMISSIONS } from './constants';

export const paymentsRoutes: FeatureRoute[] = [
  {
    path: 'payments',
    title: 'Payments',
    permission: PAYMENTS_PERMISSIONS.VIEW,
    component: () => import('./pages/PaymentsListPage'),
  },
];
