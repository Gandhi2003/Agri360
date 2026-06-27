import type { FeatureRoute } from '@common/types';
import { USERS_PERMISSIONS } from './constants';

export const usersRoutes: FeatureRoute[] = [
  {
    path: 'users',
    title: 'User Management',
    permission: USERS_PERMISSIONS.VIEW,
    component: () => import('./pages/UsersListPage'),
  },
];
