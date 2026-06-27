import type { FeatureRoute } from '@common/types';
import { PERMISSIONS_PERMISSIONS } from './constants';

export const permissionsRoutes: FeatureRoute[] = [
  {
    path: 'permissions',
    title: 'Permission Management',
    permission: PERMISSIONS_PERMISSIONS.VIEW,
    component: () => import('./pages/PermissionsListPage'),
  },
];
