import type { FeatureRoute } from '@common/types';
import { ROLES_PERMISSIONS } from './constants';

export const rolesRoutes: FeatureRoute[] = [
  {
    path: 'roles',
    title: 'Role Management',
    permission: ROLES_PERMISSIONS.VIEW,
    component: () => import('./pages/RolesListPage'),
  },
  {
    path: 'roles/:id/permissions',
    title: 'Roles & Permissions List',
    permission: ROLES_PERMISSIONS.VIEW,
    component: () => import('./pages/PermissionMatrixPage'),
  },
];
