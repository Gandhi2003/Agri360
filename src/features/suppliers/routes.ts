import type { FeatureRoute } from '@common/types';
import { SUPPLIERS_PERMISSIONS } from './constants';

export const suppliersRoutes: FeatureRoute[] = [
  {
    path: 'suppliers',
    title: 'Supplier Management',
    permission: SUPPLIERS_PERMISSIONS.VIEW,
    component: () => import('./pages/SuppliersListPage'),
  },
];
