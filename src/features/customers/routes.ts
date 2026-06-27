import type { FeatureRoute } from '@common/types';
import { CUSTOMERS_PERMISSIONS } from './constants';

export const customersRoutes: FeatureRoute[] = [
  {
    path: 'customers',
    title: 'Customer Management',
    permission: CUSTOMERS_PERMISSIONS.VIEW,
    component: () => import('./pages/CustomersListPage'),
  },
];
