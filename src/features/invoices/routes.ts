import type { FeatureRoute } from '@common/types';
import { INVOICES_PERMISSIONS } from './constants';

export const invoicesRoutes: FeatureRoute[] = [
  {
    path: 'invoices',
    title: 'Invoices',
    permission: INVOICES_PERMISSIONS.VIEW,
    component: () => import('./pages/InvoicesListPage'),
  },
];
