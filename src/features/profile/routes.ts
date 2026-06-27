import type { FeatureRoute } from '@common/types';
import { PROFILE_PERMISSIONS } from './constants';

export const profileRoutes: FeatureRoute[] = [
  {
    path: 'profile',
    title: 'Profile',
    permission: PROFILE_PERMISSIONS.VIEW,
    component: () => import('./pages/ProfileListPage'),
  },
];
